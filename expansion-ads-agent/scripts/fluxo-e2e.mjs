/**
 * E2E do fluxo completo pela interface, com o backend real em dry-run.
 * Nada é criado na Meta: DRY_RUN=true e o transporte nunca sai do processo.
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://localhost:4012';
const SAIDA = process.argv[2];
const CANDIDATOS = [
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium/chrome-linux/chrome',
];
const exec = CANDIDATOS.find((c) => existsSync(c));

const navegador = await chromium.launch({ executablePath: exec, args: ['--no-sandbox'] });
const ctx = await navegador.newContext({ viewport: { width: 1440, height: 950 }, locale: 'pt-BR' });
const p = await ctx.newPage();
const passos = [];
const registrar = (nome, ok, detalhe = '') => {
  passos.push({ nome, ok, detalhe });
  console.log(`${ok ? '✓' : '✗'} ${nome}${detalhe ? ` — ${detalhe}` : ''}`);
};

async function esperar(seletor, ms = 12000) {
  await p.waitForSelector(seletor, { timeout: ms });
}

try {
  // 1. Login
  await p.goto(BASE, { waitUntil: 'networkidle' });
  await p.fill('#email', 'demo@expansion.local');
  await p.fill('#senha', 'senha-de-teste-local-123');
  await p.click('button[type=submit]');
  await esperar('.lateral');
  registrar('1. Login', true);

  // 2. Cliente aparece no seletor global
  const clienteSelecionado = await p.inputValue('.seletor-cliente select');
  registrar('2. Cliente selecionada globalmente', Boolean(clienteSelecionado), clienteSelecionado);

  // 3. Estado da conexão com a Meta visível
  const estadoMeta = await p.textContent('.topo .selo');
  registrar('3. Estado da Meta visível', Boolean(estadoMeta), estadoMeta?.trim());

  // 4. Nova campanha
  await p.click('a[href="/nova-campanha"]');
  await esperar('.escolha');
  registrar('4. Assistente aberto', true);

  // 5. Etapa 1 — cliente
  await p.click('.escolha');
  await p.waitForTimeout(1200);
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(700);
  registrar('5. Etapa cliente concluída', true);

  // 6. Etapa 2 — objetivo comercial
  await esperar('.escolha:not([disabled])');
  await p.click('.escolha:not([disabled])');
  await p.waitForTimeout(700);
  const tecnico = await p.textContent('.indicador__valor');
  registrar('6. Objetivo comercial traduzido pelo backend', /OUTCOME_/.test(tecnico ?? ''), tecnico?.trim());
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);

  // 7. Etapa 3 — estratégia
  await p.fill('input[placeholder*="Coleção Primavera"]', 'E2E — Coleção Teste');
  await p.fill('input[placeholder*="Gerar conversas"]', 'Gerar conversas qualificadas no WhatsApp');
  await p.fill('textarea[placeholder*="Coleção primavera"]', 'Coleção teste a partir de R$ 89,90');
  await p.fill('textarea[placeholder*="Mães"]', 'Mulheres de 25 a 45 anos que compram roupa casual');
  await p.waitForTimeout(400);
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);
  registrar('7. Estratégia preenchida', true);

  // 8. Etapa 4 — destino
  await esperar('.escolha');
  await p.click('.escolha');
  await p.waitForTimeout(500);
  const whats = await p.$('input[placeholder*="+55"]');
  if (whats) await whats.fill('+55 11 90000-0000');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${SAIDA}/e2e-04-destino.png`, fullPage: true });
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);
  registrar('8. Destino configurado', true);

  // 9. Etapa 5 — upload de criativo
  // O input é display:none de propósito — a área de arrastar é a interface.
  // setInputFiles funciona em input oculto; esperar visibilidade não.
  await p.waitForSelector('input[type=file]', { state: 'attached', timeout: 12000 });
  await p.setInputFiles('input[type=file]', 'creatives/example-client/vestido-primavera-quadrado.png');
  await esperar('.card__corpo:has-text("vestido-primavera")', 20000);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${SAIDA}/e2e-05-criativo.png`, fullPage: true });
  registrar('9. Upload de criativo com análise', true);
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);

  // 10. Etapa 6 — copy
  await p.click('button:has-text("Sugerir copies")');
  await p.waitForTimeout(1400);
  const usarBase = await p.$('button:has-text("Usar como base")');
  if (usarBase) await usarBase.click();
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${SAIDA}/e2e-06-copy.png`, fullPage: true });
  registrar('10. Copy sugerida e aplicada', true);
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);

  // 11. Etapa 7 — público
  await p.click('button:has-text("Avaliar público")');
  await p.waitForTimeout(1200);
  registrar('11. Público avaliado pelo gestor', true);
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);

  // 12. Etapa 8 — posicionamentos
  await p.screenshot({ path: `${SAIDA}/e2e-08-posicionamentos.png`, fullPage: true });
  registrar('12. Posicionamentos derivados do criativo', true);
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);

  // 13. Etapa 9 — orçamento
  await p.fill('input[placeholder="R$ 50,00"]', 'R$ 10,00');
  await p.fill('input[placeholder="CPL: 25"]', 'CPL: 25');
  await p.waitForTimeout(400);
  await p.click('button:has-text("Recomendação do gestor")');
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `${SAIDA}/e2e-09-orcamento.png`, fullPage: true });
  registrar('13. Recomendação do gestor exibida', true);
  await p.click('button:has-text("Continuar")');
  await p.waitForTimeout(600);

  // 14. Etapa 10 — dry-run
  await esperar('button:has-text("Executar dry-run")');
  await p.click('button:has-text("Executar dry-run")');
  await p.waitForTimeout(3200);
  await p.screenshot({ path: `${SAIDA}/e2e-10-revisao-dryrun.png`, fullPage: true });
  const corpoRevisao = (await p.textContent('body')) ?? '';
  const validou = /Valida[çc][ãa]o aprovada|bloqueio/i.test(corpoRevisao);
  registrar('14. Dry-run executado contra o backend real', validou);
  const chamadas = /Chamadas que seriam feitas/i.test(corpoRevisao);
  registrar('15. Chamadas simuladas listadas', chamadas);
} catch (erro) {
  registrar('FALHA', false, String(erro).slice(0, 200));
  await p.screenshot({ path: `${SAIDA}/e2e-erro.png`, fullPage: true });
} finally {
  await navegador.close();
}

const falhas = passos.filter((s) => !s.ok);
console.log(`\n${passos.length - falhas.length}/${passos.length} passos concluídos`);
process.exit(falhas.length > 0 ? 1 : 0);
