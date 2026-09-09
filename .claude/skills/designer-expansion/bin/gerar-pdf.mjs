#!/usr/bin/env node
/**
 * Renderiza um material HTML da EXPANSION em PDF, conferindo o layout antes.
 *
 *   node .claude/skills/designer-expansion/bin/gerar-pdf.mjs entrada.html
 *   node ... entrada.html -o PROPOSTA.pdf --html
 *
 * O que ele faz, nesta ordem:
 *
 *   1. troca {{RAIZ}} pelo caminho absoluto do repositório (é assim que o
 *      HTML acha o CSS da identidade e os arquivos da marca);
 *   2. abre a página no Chromium e MEDE cada .pagina / .slide — conteúdo
 *      estourando a caixa, elemento fora da margem e imagem quebrada viram
 *      erro, não surpresa na hora de mandar para o cliente;
 *   3. só então imprime o PDF, com o tamanho de página que o CSS declara.
 *
 * Com --html gera também uma versão de arquivo único (fontes, CSS e imagens
 * embutidos), que abre em qualquer navegador e é a versão editável.
 *
 * Sai com código 1 se a conferência reprovar. --forcar imprime assim mesmo.
 */

import { readFile, writeFile, unlink, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, "../../../..");

/**
 * O Playwright normalmente está instalado global (npm i -g playwright), e
 * import de ESM não enxerga instalação global. Então tenta na ordem: pacote
 * normal, node_modules do repositório, node_modules global do npm.
 */
async function carregarPlaywright() {
  const tentativas = ["playwright"];
  tentativas.push(pathToFileURL(path.join(RAIZ, "node_modules/playwright/index.mjs")).href);
  try {
    const global = execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim();
    tentativas.push(pathToFileURL(path.join(global, "playwright/index.mjs")).href);
  } catch { /* npm ausente: segue com o que tem */ }

  for (const alvo of tentativas) {
    try {
      return (await import(alvo)).chromium;
    } catch { /* tenta o próximo */ }
  }
  throw new Error(
    "Playwright não encontrado. Instale com: npm install -g playwright\n" +
    "(o Chromium já vem no ambiente do Claude Code na web, em /opt/pw-browsers)"
  );
}

// Estouro menor que isto é arredondamento de subpixel, não erro de layout.
const TOLERANCIA_PX = 1.5;

function lerArgumentos(argv) {
  const opcoes = { entrada: null, saida: null, html: false, forcar: false, soConferir: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-o" || a === "--saida") opcoes.saida = argv[++i];
    else if (a === "--html") opcoes.html = true;
    else if (a === "--forcar") opcoes.forcar = true;
    else if (a === "--conferir") opcoes.soConferir = true;
    else if (a === "--previa") opcoes.previa = true;
    else if (a === "-h" || a === "--ajuda") opcoes.ajuda = true;
    else if (!opcoes.entrada) opcoes.entrada = a;
  }
  return opcoes;
}

/** Resolve os caminhos de assets e devolve o HTML pronto para renderizar. */
function resolverRaiz(html) {
  return html.replaceAll("{{RAIZ}}", pathToFileURL(RAIZ).href);
}

/** Confere, dentro do navegador, se algo estourou a caixa da página. */
async function conferirLayout(page) {
  return page.evaluate((tolerancia) => {
    const problemas = [];
    const paginas = [...document.querySelectorAll(".pagina, .slide")];

    if (paginas.length === 0) {
      problemas.push({ pagina: 0, tipo: "estrutura", detalhe: "nenhuma .pagina ou .slide encontrada" });
      return { problemas, total: 0 };
    }

    paginas.forEach((pagina, indice) => {
      const n = indice + 1;
      const caixa = pagina.getBoundingClientRect();

      const estouroV = pagina.scrollHeight - pagina.clientHeight;
      if (estouroV > tolerancia) {
        problemas.push({
          pagina: n, tipo: "estouro vertical",
          detalhe: `conteúdo passa ${Math.round(estouroV)}px do fim da página`,
        });
      }
      const estouroH = pagina.scrollWidth - pagina.clientWidth;
      if (estouroH > tolerancia) {
        problemas.push({
          pagina: n, tipo: "estouro horizontal",
          detalhe: `conteúdo passa ${Math.round(estouroH)}px da largura`,
        });
      }

      // Margem útil: o padding da própria página.
      const estilo = getComputedStyle(pagina);
      const limite = {
        topo: caixa.top + parseFloat(estilo.paddingTop),
        base: caixa.bottom - parseFloat(estilo.paddingBottom),
        esq: caixa.left + parseFloat(estilo.paddingLeft),
        dir: caixa.right - parseFloat(estilo.paddingRight),
      };

      for (const el of pagina.querySelectorAll("*")) {
        const posicao = getComputedStyle(el).position;
        // Cabeçalho, rodapé e ornamento vivem de propósito fora da margem útil.
        if (posicao === "absolute" || posicao === "fixed") continue;
        if (el.closest(".aneis, .cabecalho, .rodape")) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;

        if (r.bottom > limite.base + tolerancia) {
          problemas.push({
            pagina: n, tipo: "fora da margem inferior",
            detalhe: `${descrever(el)} passa ${Math.round(r.bottom - limite.base)}px`,
          });
          break; // o primeiro que vaza já explica a página
        }
        if (r.right > limite.dir + tolerancia || r.left < limite.esq - tolerancia) {
          problemas.push({
            pagina: n, tipo: "fora da margem lateral",
            detalhe: descrever(el),
          });
          break;
        }
      }

      for (const img of pagina.querySelectorAll("img")) {
        if (!img.complete || img.naturalWidth === 0) {
          problemas.push({
            pagina: n, tipo: "imagem não carregou",
            detalhe: img.getAttribute("src") || "(sem src)",
          });
          continue;
        }
        // Proporção esticada é deformação de marca — o erro mais caro que
        // um material pode ter, e o mais fácil de passar batido no olho.
        const r = img.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          const original = img.naturalWidth / img.naturalHeight;
          const aplicada = r.width / r.height;
          const desvio = Math.abs(aplicada - original) / original;
          if (desvio > 0.01) {
            problemas.push({
              pagina: n, tipo: "imagem deformada",
              detalhe: `${img.getAttribute("alt") || img.getAttribute("src")} — `
                + `proporção ${aplicada.toFixed(2)}:1 contra ${original.toFixed(2)}:1 `
                + `do arquivo (${(desvio * 100).toFixed(0)}% de distorção)`,
            });
          }
        }
      }
    });

    function descrever(el) {
      const classe = typeof el.className === "string" && el.className
        ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
        : "";
      const texto = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
      return `<${el.tagName.toLowerCase()}${classe}>${texto ? ` "${texto}…"` : ""}`;
    }

    return { problemas, total: paginas.length };
  }, TOLERANCIA_PX);
}

/** Junta CSS, fontes e imagens num HTML de arquivo único. */
async function embutirTudo(html, baseDir) {
  let saida = html;

  // <link rel="stylesheet"> -> <style>, com os @import resolvidos por dentro
  const links = [...saida.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)];
  for (const [tag] of links) {
    const href = tag.match(/href=["']([^"']+)["']/)?.[1];
    if (!href) continue;
    const arquivo = caminhoLocal(href, baseDir);
    if (!arquivo || !existsSync(arquivo)) continue;
    let css = await readFile(arquivo, "utf8");
    css = await resolverImports(css, path.dirname(arquivo));
    saida = saida.replace(tag, `<style>\n${css}\n</style>`);
  }

  // <img src> -> data URI
  const imagens = [...saida.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  for (const [, src] of imagens) {
    if (src.startsWith("data:")) continue;
    const arquivo = caminhoLocal(src, baseDir);
    if (!arquivo || !existsSync(arquivo)) continue;
    const dados = await readFile(arquivo);
    const tipo = src.endsWith(".svg") ? "image/svg+xml"
      : src.endsWith(".jpg") || src.endsWith(".jpeg") ? "image/jpeg"
      : "image/png";
    saida = saida.replaceAll(src, `data:${tipo};base64,${dados.toString("base64")}`);
  }

  return saida;
}

async function resolverImports(css, baseDir) {
  const imports = [...css.matchAll(/@import\s+url\(["']?([^"')]+)["']?\);?/g)];
  for (const [tag, ref] of imports) {
    const arquivo = caminhoLocal(ref, baseDir);
    if (!arquivo || !existsSync(arquivo)) continue;
    const interno = await readFile(arquivo, "utf8");
    css = css.replace(tag, await resolverImports(interno, path.dirname(arquivo)));
  }
  return css;
}

function caminhoLocal(ref, baseDir) {
  if (ref.startsWith("file://")) return fileURLToPath(ref);
  if (/^https?:/.test(ref)) return null;
  return path.resolve(baseDir, ref);
}

async function main() {
  const opcoes = lerArgumentos(process.argv.slice(2));

  if (opcoes.ajuda || !opcoes.entrada) {
    console.log(`uso: node gerar-pdf.mjs <entrada.html> [-o saida.pdf] [--html] [--conferir] [--forcar]

  -o, --saida   caminho do PDF (padrão: mesmo nome da entrada)
  --html        gera também a versão de arquivo único, editável
  --previa      salva um PNG por página, para conferir no olho
  --conferir    só confere o layout, não imprime
  --forcar      imprime mesmo com problema de layout`);
    return opcoes.entrada ? 0 : 1;
  }

  const entrada = path.resolve(opcoes.entrada);
  if (!existsSync(entrada)) {
    console.error(`erro: não encontrei ${entrada}`);
    return 1;
  }
  const baseDir = path.dirname(entrada);
  const saida = path.resolve(opcoes.saida || entrada.replace(/\.html?$/i, ".pdf"));

  const original = await readFile(entrada, "utf8");
  const resolvido = resolverRaiz(original);

  // Renderiza a partir da mesma pasta da entrada, para que caminhos
  // relativos do material (a logo do cliente, por exemplo) continuem valendo.
  const temporario = path.join(baseDir, `.render-${path.basename(entrada)}`);
  await writeFile(temporario, resolvido, "utf8");

  const chromium = await carregarPlaywright();
  const navegador = await chromium.launch();
  let codigo = 0;
  try {
    const page = await navegador.newPage();
    const erros = [];
    page.on("pageerror", (e) => erros.push(String(e)));
    await page.goto(pathToFileURL(temporario).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const { problemas, total } = await conferirLayout(page);

    console.log(`\n${path.basename(entrada)} — ${total} página(s)`);
    if (erros.length) {
      console.log("\n  erros de página:");
      erros.forEach((e) => console.log(`    ${e}`));
    }
    if (problemas.length) {
      console.log("\n  PROBLEMAS DE LAYOUT:");
      for (const p of problemas) {
        console.log(`    pág ${String(p.pagina).padStart(2)} · ${p.tipo}: ${p.detalhe}`);
      }
      codigo = 1;
    } else {
      console.log("  layout conferido: nada estourando, nada fora da margem, imagens ok");
    }

    if (opcoes.previa) {
      const pasta = path.join(path.dirname(saida), "previa");
      await mkdir(pasta, { recursive: true });
      const base = path.basename(saida, ".pdf");
      const paginas = await page.$$(".pagina, .slide");
      for (const [i, pagina] of paginas.entries()) {
        const arquivo = path.join(pasta, `${base}-${String(i + 1).padStart(2, "0")}.png`);
        await pagina.screenshot({ path: arquivo });
      }
      console.log(`  prévia: ${path.relative(process.cwd(), pasta)}/ (${paginas.length} PNG)`);
    }

    if (opcoes.soConferir) return codigo;
    if (codigo === 1 && !opcoes.forcar) {
      console.log("\n  PDF não gerado. Corrija o layout ou rode com --forcar.\n");
      return codigo;
    }

    await mkdir(path.dirname(saida), { recursive: true });
    await page.pdf({
      path: saida,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    console.log(`  PDF:  ${path.relative(process.cwd(), saida)}`);

    if (opcoes.html) {
      let arquivoUnico = saida.replace(/\.pdf$/i, ".html");
      // Sem -o, o nome bate com o da entrada: nunca sobrescrever o fonte.
      if (path.resolve(arquivoUnico) === entrada) {
        arquivoUnico = saida.replace(/\.pdf$/i, "-embutido.html");
      }
      await writeFile(arquivoUnico, await embutirTudo(resolvido, baseDir), "utf8");
      console.log(`  HTML: ${path.relative(process.cwd(), arquivoUnico)} (arquivo único, editável)`);
    }
    console.log("");
  } finally {
    await navegador.close();
    await unlink(temporario).catch(() => {});
  }
  return codigo;
}

process.exit(await main());
