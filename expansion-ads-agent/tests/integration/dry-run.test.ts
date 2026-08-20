import { describe, expect, it } from 'vitest';
import { executarDryRun, criarCampanha } from '../../src/campaigns/service.js';
import { briefWhatsApp, makeContext, sandboxDirs, writeBrief } from '../helpers/context.js';
import { MockTransport } from '../helpers/meta-mock.js';
import { PolicyViolationError, AppError } from '../../src/shared/errors.js';

describe('dry-run', () => {
  it('esta ligado por padrao no .env.example do projeto', async () => {
    const ctx = makeContext();
    expect(ctx.config.dryRun).toBe(true);
    ctx.close();
  });

  it('roda o fluxo inteiro sem fazer nenhuma chamada de rede', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'ok.md', briefWhatsApp());
    const transport = new MockTransport();
    const ctx = makeContext(sandbox.overrides, { transport });

    const resultado = await executarDryRun(ctx, brief);

    expect(transport.requests).toHaveLength(0);
    expect(resultado.criacaoSimulada.sucesso).toBe(true);
    expect(resultado.criacaoSimulada.simulado).toBe(true);
    ctx.close();
  });

  it('registra as chamadas que SERIAM feitas, na ordem oficial da Meta', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'ordem.md', briefWhatsApp());
    const ctx = makeContext(sandbox.overrides, { transport: new MockTransport() });

    const { chamadas } = await executarDryRun(ctx, brief);
    const caminhos = chamadas.map((c) => c.path.split('/').pop());

    expect(caminhos[0]).toBe('campaigns');
    expect(caminhos[1]).toBe('adsets');
    expect(caminhos).toContain('adimages');
    expect(caminhos.indexOf('adcreatives')).toBeGreaterThan(caminhos.indexOf('adimages'));
    expect(caminhos.lastIndexOf('ads')).toBeGreaterThan(caminhos.indexOf('adcreatives'));
    expect(chamadas.every((c) => c.simulado)).toBe(true);
    ctx.close();
  });

  it('todo objeto simulado nasce PAUSED', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'paused.md', briefWhatsApp());
    const ctx = makeContext(sandbox.overrides, { transport: new MockTransport() });

    const { chamadas } = await executarDryRun(ctx, brief);
    const criacoes = chamadas.filter((c) =>
      ['campaigns', 'adsets', 'ads'].includes(c.path.split('/').pop() ?? ''),
    );

    expect(criacoes.length).toBeGreaterThan(0);
    for (const chamada of criacoes) {
      expect((chamada.params as Record<string, unknown>).status).toBe('PAUSED');
    }
    ctx.close();
  });

  it('nenhum registro de chamada contem token', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'sem-token.md', briefWhatsApp());
    const ctx = makeContext(
      { ...sandbox.overrides, META_ACCESS_TOKEN: 'EAAsegredo-de-teste-1234567890' },
      { transport: new MockTransport() },
    );

    const { chamadas } = await executarDryRun(ctx, brief);
    expect(JSON.stringify(chamadas)).not.toContain('EAAsegredo-de-teste-1234567890');
    ctx.close();
  });

  it('salva o plano em arquivo para revisao', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'plano.md', briefWhatsApp());
    const ctx = makeContext(sandbox.overrides, { transport: new MockTransport() });

    const resultado = await executarDryRun(ctx, brief);
    expect(resultado.arquivoPlano).toMatch(/\.json$/);
    ctx.close();
  });

  it('gera os mesmos IDs simulados para o mesmo briefing (reproduzivel)', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'repro.md', briefWhatsApp());

    const ctx1 = makeContext(sandbox.overrides, { transport: new MockTransport() });
    const a = await executarDryRun(ctx1, brief);
    ctx1.close();

    const ctx2 = makeContext(sandbox.overrides, { transport: new MockTransport() });
    const b = await executarDryRun(ctx2, brief);
    ctx2.close();

    expect(a.criacaoSimulada.metaIds.campanha).toBe(b.criacaoSimulada.metaIds.campanha);
  });

  it('a campanha nao fica marcada como criada depois do dry-run', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'estado.md', briefWhatsApp());
    const ctx = makeContext(sandbox.overrides, { transport: new MockTransport() });

    const { campaignId } = await executarDryRun(ctx, brief);
    const row = ctx.db.campaigns.findById(campaignId)!;

    expect(row.state).toBe('VALIDATED');
    expect(row.meta_campaign_id).toBeNull();
    ctx.close();
  });
});

describe('bloqueios de validacao antes de qualquer criacao', () => {
  it('bloqueia orcamento acima do limite da cliente', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(
      sandbox.briefs,
      'caro.md',
      briefWhatsApp({ orcamento_diario: 'R$ 5.000,00' }),
    );
    const transport = new MockTransport();
    const ctx = makeContext(sandbox.overrides, { transport });

    await expect(executarDryRun(ctx, brief)).rejects.toBeInstanceOf(PolicyViolationError);
    expect(transport.requests).toHaveLength(0);
    ctx.close();
  });

  it('bloqueia destino fora da allowlist da cliente', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(
      sandbox.briefs,
      'url-ruim.md',
      briefWhatsApp({
        modelo: 'vendas_site',
        destino: 'site',
        url: 'https://site-invasor.com/promo',
        pixel_id: '500000000000005',
        evento: 'PURCHASE',
        whatsapp: '',
        mensagem_whatsapp: '',
      }),
    );
    const ctx = makeContext(sandbox.overrides, { transport: new MockTransport() });
    const erro = await executarDryRun(ctx, brief).catch((e) => e as PolicyViolationError);
    expect(erro).toBeInstanceOf(PolicyViolationError);
    expect(JSON.stringify((erro as PolicyViolationError).toJSON())).toMatch(/allowlist|autorizad/i);
    ctx.close();
  });

  it('bloqueia modelo nao autorizado para a cliente', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'modelo.md', briefWhatsApp({ modelo: 'modelo_inventado' }));
    const ctx = makeContext(sandbox.overrides, { transport: new MockTransport() });
    await expect(executarDryRun(ctx, brief)).rejects.toThrow();
    ctx.close();
  });

  it('a criacao real recusa cliente de exemplo mesmo com DRY_RUN=false', async () => {
    const sandbox = sandboxDirs();
    const brief = writeBrief(sandbox.briefs, 'real.md', briefWhatsApp());
    const transport = new MockTransport();
    const ctx = makeContext(
      { ...sandbox.overrides, DRY_RUN: 'false', META_ACCESS_TOKEN: 'EAAtoken-teste-1234567890' },
      { transport, dryRunOverride: false },
    );

    await expect(criarCampanha(ctx, brief)).rejects.toBeInstanceOf(AppError);
    expect(transport.requests).toHaveLength(0);
    ctx.close();
  });
});
