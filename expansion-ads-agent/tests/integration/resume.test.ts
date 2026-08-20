import { describe, expect, it } from 'vitest';
import { criarCampanha } from '../../src/campaigns/service.js';
import { MockTransport } from '../helpers/meta-mock.js';
import {
  briefWhatsApp,
  makeContext,
  realClient,
  sandboxDirs,
  writeBrief,
} from '../helpers/context.js';
import type { AgentContext } from '../../src/context.js';

const CAMPANHA = '120210000000000001';
const CONJUNTO = '120210000000000002';

function base(): Array<Record<string, unknown>> {
  return [
    { match: '/campaigns', method: 'POST', body: { id: CAMPANHA } },
    { match: '/adsets', method: 'POST', body: { id: CONJUNTO } },
    {
      match: '/adimages',
      method: 'POST',
      body: { images: { a: { hash: 'hash-imagem-1', url: 'https://cdn/1.png' } } },
      times: 1,
    },
    {
      match: '/adimages',
      method: 'POST',
      body: { images: { a: { hash: 'hash-imagem-2', url: 'https://cdn/2.png' } } },
    },
    { match: '/adcreatives', method: 'POST', body: { id: '120210000000000003' }, times: 1 },
    { match: '/adcreatives', method: 'POST', body: { id: '120210000000000004' } },
    { match: '/ads', method: 'POST', body: { id: '120210000000000005' }, times: 1 },
    { match: '/ads', method: 'POST', body: { id: '120210000000000006' } },
  ];
}

function cenario(rules: Array<Record<string, unknown>>): {
  ctx: AgentContext;
  transport: MockTransport;
  brief: string;
  sandbox: ReturnType<typeof sandboxDirs>;
} {
  const sandbox = sandboxDirs();
  const clientId = realClient(sandbox.clients, 'cliente-real', sandbox.creatives);
  const brief = writeBrief(sandbox.briefs, 'resume.md', briefWhatsApp({ cliente: clientId }));
  const transport = new MockTransport(rules as never);
  const ctx = makeContext(
    { ...sandbox.overrides, DRY_RUN: 'false', META_ACCESS_TOKEN: 'EAAtoken-de-teste-1234567890' },
    { transport, dryRunOverride: false },
  );
  return { ctx, transport, brief, sandbox };
}

describe('retomada depois de falha parcial', () => {
  it('a falha no criativo nao apaga o que ja foi criado e a campanha vai para CREATION_FAILED', async () => {
    const regras = base().filter((r) => r.match !== '/adcreatives');
    regras.push({
      match: '/adcreatives',
      method: 'POST',
      body: { error: { message: 'imagem invalida', code: 100 } },
      status: 400,
      times: 1,
    });
    const c = cenario(regras);

    const resultado = await criarCampanha(c.ctx, c.brief);

    expect(resultado.criacao.sucesso).toBe(false);
    expect(resultado.criacao.falha?.etapa).toMatch(/criativo/i);
    // Campanha e conjunto sobreviveram com IDs reais.
    expect(resultado.criacao.metaIds.campanha).toBe(CAMPANHA);
    const row = c.ctx.db.campaigns.findById(resultado.campaignId)!;
    expect(row.state).toBe('CREATION_FAILED');
    expect(row.meta_campaign_id).toBe(CAMPANHA);
    expect(c.ctx.db.adsets.findMany({ campaign_id: row.id })[0]!.meta_adset_id).toBe(CONJUNTO);
    c.ctx.close();
  });

  it('retomar continua do ponto certo, sem recriar campanha nem conjunto', async () => {
    const regrasComFalha = base().filter((r) => r.match !== '/adcreatives');
    regrasComFalha.push({
      match: '/adcreatives',
      method: 'POST',
      body: { error: { message: 'falha temporaria', code: 100 } },
      status: 400,
      times: 1,
    });
    const c = cenario(regrasComFalha);

    const primeira = await criarCampanha(c.ctx, c.brief);
    expect(primeira.criacao.sucesso).toBe(false);

    const criacoesCampanha = () =>
      c.transport.requests.filter((r) => r.method === 'POST' && r.url.endsWith('/campaigns')).length;
    const criacoesConjunto = () =>
      c.transport.requests.filter((r) => r.method === 'POST' && r.url.endsWith('/adsets')).length;

    expect(criacoesCampanha()).toBe(1);
    expect(criacoesConjunto()).toBe(1);

    // A Meta volta a funcionar: agora os criativos e anuncios passam.
    c.transport
      .on({ match: '/adcreatives', method: 'POST', body: { id: '120210000000000003' }, times: 1 })
      .on({ match: '/adcreatives', method: 'POST', body: { id: '120210000000000004' } })
      .on({ match: '/ads', method: 'POST', body: { id: '120210000000000005' }, times: 1 })
      .on({ match: '/ads', method: 'POST', body: { id: '120210000000000006' } });

    const segunda = await criarCampanha(c.ctx, c.brief, { confirmarDuplicidade: true });

    expect(segunda.campaignId).toBe(primeira.campaignId);
    expect(segunda.criacao.sucesso).toBe(true);
    // Nao recriou o que ja existia.
    expect(criacoesCampanha()).toBe(1);
    expect(criacoesConjunto()).toBe(1);
    expect(segunda.criacao.passos.filter((p) => p.acao === 'reaproveitado').length).toBeGreaterThan(0);
    expect(c.ctx.db.campaigns.findById(segunda.campaignId)!.state).toBe('CREATED_PAUSED');
    c.ctx.close();
  });

  it('nunca exclui nada na Meta: nenhuma chamada DELETE em nenhum cenario', async () => {
    const regras = base().filter((r) => r.match !== '/ads');
    regras.push({
      match: '/ads',
      method: 'POST',
      body: { error: { message: 'erro', code: 100 } },
      status: 400,
      times: 1,
    });
    const c = cenario(regras);

    await criarCampanha(c.ctx, c.brief);

    expect(c.transport.requests.some((r) => r.method === 'DELETE')).toBe(false);
    c.ctx.close();
  });

  it('a falha fica registrada na campanha para diagnostico', async () => {
    const regras = base().filter((r) => r.match !== '/adsets');
    regras.push({
      match: '/adsets',
      method: 'POST',
      body: { error: { message: 'orcamento abaixo do minimo da conta', code: 100 } },
      status: 400,
      times: 1,
    });
    const c = cenario(regras);

    const resultado = await criarCampanha(c.ctx, c.brief);
    const row = c.ctx.db.campaigns.findById(resultado.campaignId)!;

    expect(row.last_error).toBeTruthy();
    expect(row.last_error!).toContain('orcamento abaixo do minimo');
    c.ctx.close();
  });
});
