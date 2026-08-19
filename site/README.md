# site/ — expansionassessoria.com

Pasta pública. É **só isto aqui** que vai para o ar quando o domínio estiver ligado.

---

## 🚨 A regra que não pode ser quebrada

> **Nunca aponte a hospedagem para a raiz do repositório.**

Este repositório guarda material confidencial: dossiês de cliente, transcrições de
WhatsApp, estratégia comercial, valor de contrato. Publicar a raiz colocaria tudo isso
na internet aberta.

Na configuração do host, o **Root Directory / Publish directory tem que ser `site`**.
Nada fora desta pasta é publicado.

Antes de subir qualquer arquivo aqui, a pergunta é uma só: **isso pode ser lido por
qualquer pessoa que descubra a URL?** Se a resposta tiver um "depende", não sobe.

Link de documento não é senha. Quem tem o link, lê.

---

## O que tem aqui

```
site/
├── CNAME                      expansionassessoria.com
├── index.html                 índice dos documentos
└── jane/
    └── plano-30-dias.html     plano de 30 dias da Jane — 04/08/2026
```

---

## Como ligar o domínio

O repositório é privado, então GitHub Pages sairia pago. **Vercel ou Cloudflare Pages
resolvem de graça, mesmo com repositório privado.** Passo a passo pela Vercel:

1. **vercel.com** → *Add New* → *Project* → importar `expansioncompanyoficial-hub/claude-expasion`
2. Em *Configure Project*:
   - **Framework Preset:** `Other`
   - **Root Directory:** `site` ← 🚨 **o passo que protege o resto do repositório**
   - Build Command e Install Command: deixar em branco
3. *Deploy*
4. *Settings → Domains* → adicionar `expansionassessoria.com`
5. No painel do registrador do domínio, criar os registros que a Vercel indicar:
   - `A` do apex `@` → `76.76.21.21`
   - `CNAME` de `www` → `cname.vercel-dns.com`
   - *(a Vercel mostra os valores atualizados na tela — usar os de lá, não estes)*
6. Esperar a propagação. Costuma levar de minutos a algumas horas.

O `CNAME` desta pasta serve ao GitHub Pages. A Vercel ignora — não atrapalha, e deixa a
porta aberta caso o repositório vire público um dia.

---

## Como publicar um documento novo

1. Salvar o HTML aqui dentro, em pasta por cliente: `site/<cliente>/<documento>.html`
2. Adicionar a linha correspondente no `index.html`
3. Commit e push — o deploy é automático a cada push

**O arquivo tem que ser um HTML completo**, com `<!doctype html>`, `<html>` e `<head>`.
Os documentos publicados como Artifact da Claude são *fragmentos*: eles ganham esse
esqueleto na hora da publicação. Ao trazer um para cá, embrulhe:

```bash
{ echo '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width,initial-scale=1">'
  cat fragmento.html
  echo '</head></html>'
} > site/<cliente>/<documento>.html
```

Tudo tem que ser **autocontido** — CSS embutido, imagem em `data:` URI. Sem CDN, sem
fonte externa, sem script de terceiro.

---

## Gerar o PDF de um documento

Para mandar no WhatsApp, PDF costuma abrir melhor no celular do cliente que link:

```bash
CHR=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
"$CHR" --headless --disable-gpu --no-sandbox --force-color-profile=srgb \
  --print-to-pdf=saida.pdf --no-pdf-header-footer --virtual-time-budget=4000 \
  "file:///caminho/do/documento.html"
```

Os documentos já trazem um bloco `@media print` que força o tema claro e evita que
tabela, card ou citação quebrem no meio da página.
