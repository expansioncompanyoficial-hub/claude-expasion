import { describe, expect, it } from 'vitest';
import {
  ativarCampanha,
  confirmarNaMeta,
  criarCampanha,
  pausarCampanha,
} from '../../src/campaigns/service.js';
import {
  registrarAprovacao,
  solicitarAprovacao,
  verificarAprovacao,
} from '../../src/approvals/service.js';
import { ApprovalError } from '../../src/shared/errors.js';
import { MockTransport } from '../helpers/meta-mock.js';
import {
  briefWhatsApp,
  fakeClock,
  makeContext,
  realClient,
  sandboxDirs,
  writeBrief,
} from '../helpers/context.js';
import type { AgentContext } from '../../src/context.js';

const CAMPANHA = '120210000000000001';
const CONJUNTO = '120210000000000002';
const CRIATIVO_A = '120210000000000003';
const CRIATIVO_B = '120210000000000004';
const ANUNCIO_A = '120210000000000005';
const ANUNCIO_B = '120210000000000006';

/** Mock com a conta inteira roteirizada. A ordem importa: /adsets antes de /ads. */
function metaMock(): MockTransport {
  return new MockTransport([
    { match: '/campaigns', method: 'POST', body: { id: CAMPANHA } },
    { match: '/adsets', method: 'POST', body: { id: CONJUNTO } },
    {
      match: '/adimages',
      method: 'POST',
      body: { images: { arquivo: { hash: 'hash-imagem-1', url: 'https://cdn/1.png' } } },
      times: 1,
    },
    {
      match: '/adimages',
      method: 'POST',
      body: { images: { arquivo: { hash: 'hash-imagem-2', url: 'https://cdn/2.png' } } },
    },
    { match: '/adcreatives', method: 'POST', body: { id: CRIATIVO_A }, times: 1 },
    { match: '/adcreatives', method: 'POST', body: { id: CRIATIVO_B } },
    { match: '/ads', method: 'POST', body: { id: ANUNCIO_A }, times: 1 },
    { match: '/ads', method: 'POST', body: { id: ANUNCIO_B } },

    // Confirmacao na Meta depois da criacao.
    {
      match: `${CAMPANHA}?`,
      method: 'GET',
      body: {
        id: CAMPANHA,
        name: 'Campanha de Teste WhatsApp',
        objective: 'OUTCOME_LEADS',
        status: 'PAUSED',
        effective_status: 'PAUSED',
      },
    },
    {
      match: '/adsets',
      method: 'GET',
      body: {
        data: [
          { id: CONJUNTO, campaign_id: CAMPANHA, status: 'PAUSED', effective_status: 'PAUSED' },
        ],
      },
    },
    {
      match: '/ads',
      method: 'GET',
      body: {
        data: [
          { id: ANUNCIO_A, adset_id: CONJUNTO, status: 'PAUSED', effective_status: 'PAUSED' },
          { id: ANUNCIO_B, adset_id: CONJUNTO, status: 'PAUSED', effective_status: 'PAUSED' },
        ],
      },
    },

    // Mudancas de status (ativar / pausar).
    { match: ANUNCIO_A, method: 'POST', body: { success: true } },
    { match: ANUNCIO_B, method: 'POST', body: { success: true } },
    { match: CONJUNTO, method: 'POST', body: { success: true } },
    { match: CAMPANHA, method: 'POST', body: { success: true } },
  ]);
}

interface Cenario {
  ctx: AgentContext;
  transport: MockTransport;
  brief: string;
  clientId: string;
  advanceHours: (h: number) => void;
}

function cenario(): Cenario {
  const sandbox = sandboxDirs();
  const clientId = realClient(sandbox.clients, 'cliente-real', sandbox.creatives);
  const brief = writeBrief(sandbox.briefs, 'real.md', briefWhatsApp({ cliente: clientId }));
  const transport = metaMock();
  const { clock, advanceHours } = fakeClock('2026-09-01T10:00:00Z');
  const ctx = makeContext(
    { ...sandbox.overrides, DRY_RUN: 'false', META_ACCESS_TOKEN: 'EAAtoken-de-teste-1234567890' },
    { transport, dryRunOverride: false, clock },
  );
  return { ctx, transport, brief, clientId, advanceHours };
}

async function criarEConfirmar(c: Cenario): Promise<string> {
  const { campaignId } = await criarCampanha(c.ctx, c.brief);
  await confirmarNaMeta(c.ctx, campaignId);
  return campaignId;
}

describe('criacao real: tudo nasce PAUSED', () => {
  it('cria campanha, conjunto, criativos e anuncios, todos pausados', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);

    const criacoes = c.transport.requests
      .map((r, i) => ({ r, body: c.transport.bodies()[i]! }))
      .filter(
        ({ r }) => r.method === 'POST' && /\/(campaigns|adsets|ads)$/.test(new URL(r.url).pathname),
      );

    expect(criacoes.length).toBeGreaterThanOrEqual(4);
    for (const { body } of criacoes) {
      expect(body.status).toBe('PAUSED');
    }

    const row = c.ctx.db.campaigns.findById(campaignId)!;
    expect(row.state).toBe('CREATED_PAUSED');
    expect(row.meta_campaign_id).toBe(CAMPANHA);
    c.ctx.close();
  });

  it('nenhuma chamada de criacao manda status ACTIVE', async () => {
    const c = cenario();
    await criarEConfirmar(c);
    for (const body of c.transport.bodies()) {
      expect(body.status).not.toBe('ACTIVE');
    }
    c.ctx.close();
  });

  it('confirma na Meta que tudo esta pausado', async () => {
    const c = cenario();
    const { campaignId } = await criarCampanha(c.ctx, c.brief);
    const confirmacao = await confirmarNaMeta(c.ctx, campaignId);

    expect(confirmacao.tudoPausado).toBe(true);
    expect(confirmacao.divergencias).toHaveLength(0);
    c.ctx.close();
  });

  it('idempotencia: rodar de novo o mesmo briefing nao cria nada novo', async () => {
    const c = cenario();
    const primeira = await criarEConfirmar(c);
    const postsAntes = c.transport.requests.filter((r) => r.method === 'POST').length;

    const segunda = await criarCampanha(c.ctx, c.brief, { confirmarDuplicidade: true });
    const postsDepois = c.transport.requests.filter((r) => r.method === 'POST').length;

    expect(segunda.campaignId).toBe(primeira);
    expect(postsDepois).toBe(postsAntes);
    c.ctx.close();
  });
});

describe('ativacao exige aprovacao valida', () => {
  it('bloqueia ativacao sem nenhuma aprovacao', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);

    await expect(ativarCampanha(c.ctx, campaignId)).rejects.toBeInstanceOf(ApprovalError);
    const row = c.ctx.db.campaigns.findById(campaignId)!;
    expect(row.state).toBe('CREATED_PAUSED');
    c.ctx.close();
  });

  it('registra a tentativa bloqueada como violacao de politica', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);
    await ativarCampanha(c.ctx, campaignId).catch(() => undefined);

    const violacoes = c.ctx.db.policyViolations.findMany({ campaign_id: campaignId });
    expect(violacoes.some((v) => v.rule === 'ativacao_sem_aprovacao_valida')).toBe(true);
    c.ctx.close();
  });

  it('ativa quando ha aprovacao valida e so entao manda ACTIVE', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);

    solicitarAprovacao(c.ctx, campaignId);
    const aprovacao = registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas' });
    const resultado = await ativarCampanha(c.ctx, campaignId, aprovacao.approval_token);

    expect(resultado.ativados.campanha).toBe(true);
    expect(c.ctx.db.campaigns.findById(campaignId)!.state).toBe('ACTIVE');
    expect(c.transport.bodies().some((b) => b.status === 'ACTIVE')).toBe(true);
    c.ctx.close();
  });

  it('recusa aprovacao vencida', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);

    solicitarAprovacao(c.ctx, campaignId);
    const aprovacao = registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas', ttlHours: 2 });
    c.advanceHours(3);

    const check = verificarAprovacao(c.ctx, campaignId, aprovacao.approval_token);
    expect(check.ok).toBe(false);
    expect(check.problemas.join(' ')).toMatch(/vencida/i);
    await expect(
      ativarCampanha(c.ctx, campaignId, aprovacao.approval_token),
    ).rejects.toBeInstanceOf(ApprovalError);
    c.ctx.close();
  });

  it('recusa aprovacao ja utilizada: cada aprovacao vale uma ativacao', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);

    solicitarAprovacao(c.ctx, campaignId);
    const aprovacao = registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas' });
    await ativarCampanha(c.ctx, campaignId, aprovacao.approval_token);
    await pausarCampanha(c.ctx, campaignId, 'teste');

    const erro = await ativarCampanha(c.ctx, campaignId, aprovacao.approval_token).catch(
      (e) => e as ApprovalError,
    );
    expect(erro).toBeInstanceOf(ApprovalError);
    expect(JSON.stringify((erro as ApprovalError).toJSON())).toMatch(/ja utilizada/i);
    c.ctx.close();
  });

  it('recusa quando a campanha muda depois da aprovacao (fingerprint)', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);

    solicitarAprovacao(c.ctx, campaignId);
    const aprovacao = registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas' });

    // Alguem mexeu no orcamento depois de aprovado.
    c.ctx.db.campaigns.update(campaignId, { daily_budget_cents: 9_900 });

    const check = verificarAprovacao(c.ctx, campaignId, aprovacao.approval_token);
    expect(check.ok).toBe(false);
    expect(check.problemas.join(' ')).toMatch(/mudou depois da aprovacao|difere do aprovado/i);
    c.ctx.close();
  });

  it('recusa quando os criativos mudam depois da aprovacao', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);

    solicitarAprovacao(c.ctx, campaignId);
    const aprovacao = registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas' });

    const criativo = c.ctx.db.creatives.findOne({ campaign_id: campaignId })!;
    c.ctx.db.creatives.update(criativo.id, { meta_creative_id: '120210000000000999' });

    const check = verificarAprovacao(c.ctx, campaignId, aprovacao.approval_token);
    expect(check.ok).toBe(false);
    c.ctx.close();
  });

  it('recusa token de aprovacao inexistente', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);
    solicitarAprovacao(c.ctx, campaignId);
    registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas' });

    const check = verificarAprovacao(c.ctx, campaignId, 'APV-XXXXX-XXXXX-XXXXX-XXXXX');
    expect(check.ok).toBe(false);
    c.ctx.close();
  });

  it('nao deixa aprovar campanha que ainda nao foi criada na Meta', async () => {
    const c = cenario();
    const { campaignId } = await criarCampanha(c.ctx, c.brief);
    c.ctx.db.campaigns.update(campaignId, { meta_campaign_id: null, state: 'CREATED_PAUSED' });

    expect(() => solicitarAprovacao(c.ctx, campaignId)).toThrow(ApprovalError);
    c.ctx.close();
  });

  it('a aprovacao guarda quem aprovou, quando, validade e orcamento aprovado', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);
    solicitarAprovacao(c.ctx, campaignId);
    const aprovacao = registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas' });

    expect(aprovacao.approved_by).toBe('nicolas');
    expect(aprovacao.approved_at).toBe('2026-09-01T10:00:00.000Z');
    expect(new Date(aprovacao.expires_at).getTime()).toBeGreaterThan(
      new Date(aprovacao.approved_at).getTime(),
    );
    expect(aprovacao.approved_budget_cents).toBe(5_000);
    expect(aprovacao.approval_token).toMatch(/^APV-/);
    expect(aprovacao.fingerprint).toMatch(/^[a-f0-9]{16,}$/);
    c.ctx.close();
  });

  it('a trilha de auditoria registra a ativacao com estado antes e depois', async () => {
    const c = cenario();
    const campaignId = await criarEConfirmar(c);
    solicitarAprovacao(c.ctx, campaignId);
    const aprovacao = registrarAprovacao(c.ctx, { campaignId, approvedBy: 'nicolas' });
    await ativarCampanha(c.ctx, campaignId, aprovacao.approval_token);

    const log = c.ctx.db.actionLogs
      .findMany({ campaign_id: campaignId, tool: 'campaign:activate' })
      .at(-1)!;

    expect(log.outcome).toBe('success');
    expect(log.state_after).toBe('ACTIVE');
    expect(log.actor).toBeTruthy();
    expect(JSON.stringify(log)).not.toContain('EAAtoken-de-teste-1234567890');
    c.ctx.close();
  });
});
