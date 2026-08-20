import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

const BASE = 'http://localhost:4012';
const SAIDA = process.argv[2];
const CANDIDATOS = [
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium/chrome-linux/chrome',
];
const exec = CANDIDATOS.find((c) => existsSync(c));
if (!exec) throw new Error('Chromium nao encontrado em /opt/pw-browsers.');

const navegador = await chromium.launch({ executablePath: exec, args: ['--no-sandbox'] });
const erros = [];
const falhasRede = [];

async function novaPagina(largura, altura) {
  const ctx = await navegador.newContext({ viewport: { width: largura, height: altura }, locale: 'pt-BR' });
  const pagina = await ctx.newPage();
  pagina.on('console', (m) => { if (m.type() === 'error') erros.push(`[${largura}px] ${m.text()}`); });
  pagina.on('requestfailed', (r) => falhasRede.push(`[${largura}px] ${r.url()} — ${r.failure()?.errorText}`));
  pagina.on('response', (r) => { if (r.status() >= 400) falhasRede.push(`[${largura}px] ${r.status()} ${r.url()}`); });
  return { ctx, pagina };
}

async function entrar(pagina) {
  await pagina.goto(BASE, { waitUntil: 'networkidle' });
  await pagina.fill('#email', 'demo@expansion.local');
  await pagina.fill('#senha', 'senha-de-teste-local-123');
  await pagina.click('button[type=submit]');
  await pagina.waitForSelector('.lateral', { timeout: 15000 });
}

async function medirOverflow(pagina) {
  return pagina.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
}

const relatorio = [];

// ---------- desktop ----------
{
  const { ctx, pagina } = await novaPagina(1440, 900);
  await pagina.goto(BASE, { waitUntil: 'networkidle' });
  await pagina.screenshot({ path: `${SAIDA}/01-login-desktop.png` });

  await entrar(pagina);
  await pagina.waitForTimeout(1200);
  await pagina.screenshot({ path: `${SAIDA}/02-visao-geral.png`, fullPage: true });
  relatorio.push(['visao-geral 1440', await medirOverflow(pagina)]);

  await pagina.click('a[href="/clientes"]');
  await pagina.waitForTimeout(900);
  await pagina.screenshot({ path: `${SAIDA}/03-clientes.png`, fullPage: true });

  await pagina.click('.card');
  await pagina.waitForTimeout(1400);
  await pagina.screenshot({ path: `${SAIDA}/04-cliente-detalhe.png`, fullPage: true });

  await pagina.click('a[href="/nova-campanha"]');
  await pagina.waitForTimeout(900);
  await pagina.screenshot({ path: `${SAIDA}/05-assistente-etapa1.png`, fullPage: true });
  relatorio.push(['assistente 1440', await medirOverflow(pagina)]);

  // seleciona cliente e avança
  const escolhas = await pagina.$$('.escolha');
  if (escolhas.length) await escolhas[0].click();
  await pagina.waitForTimeout(1200);
  const continuar = await pagina.$('button:has-text("Continuar")');
  if (continuar) { await continuar.click(); await pagina.waitForTimeout(900); }
  await pagina.screenshot({ path: `${SAIDA}/06-assistente-objetivo.png`, fullPage: true });

  // escolhe WhatsApp
  const objetivos = await pagina.$$('.escolha:not([disabled])');
  if (objetivos.length) { await objetivos[0].click(); await pagina.waitForTimeout(700); }
  await pagina.screenshot({ path: `${SAIDA}/07-assistente-objetivo-tecnico.png`, fullPage: true });

  await pagina.click('a[href="/campanhas"]');
  await pagina.waitForTimeout(900);
  await pagina.screenshot({ path: `${SAIDA}/08-campanhas.png`, fullPage: true });

  await pagina.click('a[href="/aprovacoes"]');
  await pagina.waitForTimeout(800);
  await pagina.screenshot({ path: `${SAIDA}/09-aprovacoes.png`, fullPage: true });

  await pagina.click('a[href="/auditoria"]');
  await pagina.waitForTimeout(900);
  await pagina.screenshot({ path: `${SAIDA}/10-auditoria.png`, fullPage: true });

  await pagina.click('a[href="/criativos"]');
  await pagina.waitForTimeout(900);
  await pagina.screenshot({ path: `${SAIDA}/11-criativos.png`, fullPage: true });

  await pagina.click('a[href="/configuracoes"]');
  await pagina.waitForTimeout(900);
  await pagina.screenshot({ path: `${SAIDA}/12-configuracoes.png`, fullPage: true });

  await ctx.close();
}

// ---------- larguras ----------
for (const largura of [320, 375, 390, 430, 768, 1024]) {
  const { ctx, pagina } = await novaPagina(largura, 860);
  await entrar(pagina);
  await pagina.waitForTimeout(1100);
  await pagina.screenshot({ path: `${SAIDA}/w-${largura}-visao-geral.png`, fullPage: true });
  relatorio.push([`visao-geral ${largura}`, await medirOverflow(pagina)]);

  await pagina.goto(`${BASE}/campanhas`, { waitUntil: 'networkidle' });
  await pagina.waitForTimeout(700);
  relatorio.push([`campanhas ${largura}`, await medirOverflow(pagina)]);
  if (largura === 390) await pagina.screenshot({ path: `${SAIDA}/w-390-campanhas.png`, fullPage: true });

  await pagina.goto(`${BASE}/nova-campanha`, { waitUntil: 'networkidle' });
  await pagina.waitForTimeout(700);
  relatorio.push([`assistente ${largura}`, await medirOverflow(pagina)]);
  if (largura === 390) await pagina.screenshot({ path: `${SAIDA}/w-390-assistente.png`, fullPage: true });

  await ctx.close();
}

await navegador.close();

console.log('=== OVERFLOW HORIZONTAL ===');
for (const [nome, m] of relatorio) {
  const excesso = m.scrollW - m.clientW;
  console.log(`${excesso > 0 ? '✗' : '✓'} ${nome.padEnd(24)} scroll=${m.scrollW} client=${m.clientW}${excesso > 0 ? ` EXCESSO ${excesso}px` : ''}`);
}
console.log('\n=== ERROS DE CONSOLE ===');
console.log(erros.length ? [...new Set(erros)].join('\n') : '(nenhum)');
console.log('\n=== REQUISIÇÕES COM FALHA ===');
console.log(falhasRede.length ? [...new Set(falhasRede)].join('\n') : '(nenhuma)');
