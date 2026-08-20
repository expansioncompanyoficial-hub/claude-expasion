import type { AgentContext } from '../context.js';
import type { ApprovalRow, CampaignRow } from '../database/types.js';
import { ApprovalError, NotFoundError } from '../shared/errors.js';
import { newApprovalToken, newId, safeEquals } from '../shared/ids.js';
import { formatMoney } from '../shared/money.js';
import { addHours, isExpired } from '../shared/time.js';
import { assertTransition } from '../campaigns/state-machine.js';
import { fingerprintFromSnapshot, type CampaignSnapshot } from './fingerprint.js';

export type ApprovalStatus = 'valid' | 'consumed' | 'expired' | 'revoked';

export interface ApprovalCheck {
  readonly ok: boolean;
  readonly aprovacao: ApprovalRow | null;
  readonly problemas: string[];
}

/** Reconstroi o estado atual da campanha a partir do banco. */
export function snapshotCampanha(ctx: AgentContext, campaignRow: CampaignRow): CampaignSnapshot {
  const adsets = ctx.db.adsets.findMany({ campaign_id: campaignRow.id });
  const creatives = ctx.db.creatives.findMany({ campaign_id: campaignRow.id });
  const ads = ctx.db.ads.findMany({ campaign_id: campaignRow.id });

  const plano = JSON.parse(campaignRow.plan_json) as {
    destino?: { tipo: string; valor: string };
    conjuntos?: Array<{ targeting?: unknown }>;
  };

  return {
    row: campaignRow,
    adsetMetaIds: adsets.map((row) => row.meta_adset_id).filter((id): id is string => Boolean(id)),
    creativeMetaIds: creatives
      .map((row) => row.meta_creative_id)
      .filter((id): id is string => Boolean(id)),
    adMetaIds: ads.map((row) => row.meta_ad_id).filter((id): id is string => Boolean(id)),
    creativeFileHashes: creatives
      .map((row) => row.file_hash)
      .filter((hash): hash is string => Boolean(hash)),
    targeting: plano.conjuntos?.map((conjunto) => conjunto.targeting) ?? [],
    destination: plano.destino ?? { tipo: 'desconhecido', valor: '' },
  };
}

export function getCampaignOrThrow(ctx: AgentContext, campaignId: string): CampaignRow {
  const row =
    ctx.db.campaigns.findById(campaignId) ??
    ctx.db.campaigns.findOne({ meta_campaign_id: campaignId });
  if (!row) {
    throw new NotFoundError(`Campanha "${campaignId}" nao encontrada no banco local.`, {
      campaignId,
    });
  }
  return row;
}

export interface ApprovalRequestResult {
  readonly campaignId: string;
  readonly fingerprint: string;
  readonly resumo: string[];
  readonly metaIds: {
    campanha: string | null;
    conjuntos: string[];
    criativos: string[];
    anuncios: string[];
  };
}

/** Move a campanha para WAITING_APPROVAL e devolve o que precisa ser aprovado. */
export function solicitarAprovacao(
  ctx: AgentContext,
  campaignId: string,
): ApprovalRequestResult {
  const row = getCampaignOrThrow(ctx, campaignId);
  const snapshot = snapshotCampanha(ctx, row);
  const policy = ctx.policies.approval;

  if (policy.exigirIdsMetaConfirmados) {
    const faltando: string[] = [];
    if (!row.meta_campaign_id) faltando.push('campanha');
    if (snapshot.adsetMetaIds.length === 0) faltando.push('conjunto');
    if (snapshot.creativeMetaIds.length === 0) faltando.push('criativo');
    if (snapshot.adMetaIds.length === 0) faltando.push('anuncio');
    if (faltando.length > 0) {
      throw new ApprovalError(
        'APROVACAO_SEM_IDS',
        `Nao da para pedir aprovacao: faltam IDs confirmados na Meta (${faltando.join(', ')}).`,
        { campaignId: row.id, faltando },
        ['Rode a criacao (campaign:create) e confirme os objetos antes de pedir aprovacao.'],
      );
    }
  }

  assertTransition(row.state as never, 'WAITING_APPROVAL');
  ctx.db.campaigns.update(row.id, {
    state: 'WAITING_APPROVAL',
    updated_at: ctx.clock().toISOString(),
  });

  const fingerprint = fingerprintFromSnapshot(snapshot);

  return {
    campaignId: row.id,
    fingerprint,
    resumo: montarResumoAprovacao(row, snapshot),
    metaIds: {
      campanha: row.meta_campaign_id,
      conjuntos: snapshot.adsetMetaIds,
      criativos: snapshot.creativeMetaIds,
      anuncios: snapshot.adMetaIds,
    },
  };
}

export interface ApproveInput {
  readonly campaignId: string;
  readonly approvedBy: string;
  readonly ttlHours?: number;
  readonly observacao?: string;
}

export function registrarAprovacao(ctx: AgentContext, input: ApproveInput): ApprovalRow {
  const row = getCampaignOrThrow(ctx, input.campaignId);
  const policy = ctx.policies.approval;

  if (row.state !== 'WAITING_APPROVAL') {
    throw new ApprovalError(
      'APROVACAO_ESTADO_INVALIDO',
      `So da para aprovar uma campanha em WAITING_APPROVAL. Estado atual: ${row.state}.`,
      { campaignId: row.id, estado: row.state },
      ['Rode "npm run campaign:status" e, se preciso, solicite a aprovacao antes.'],
    );
  }

  if (policy.exigirAprovadorRegistrado && !input.approvedBy.trim()) {
    throw new ApprovalError('APROVADOR_AUSENTE', 'Informe quem esta aprovando (--by).');
  }

  if (
    policy.aprovadoresPermitidos.length > 0 &&
    !policy.aprovadoresPermitidos.includes(input.approvedBy.trim())
  ) {
    throw new ApprovalError(
      'APROVADOR_NAO_AUTORIZADO',
      `"${input.approvedBy}" nao esta na lista de aprovadores permitidos.`,
      { permitidos: policy.aprovadoresPermitidos },
    );
  }

  const ttlHours = Math.min(input.ttlHours ?? policy.validadeHorasPadrao, policy.validadeHorasMaxima);
  const snapshot = snapshotCampanha(ctx, row);
  const agora = ctx.clock();

  // Aprovacao anterior ainda de pe vira revogada: so uma pode valer por vez.
  for (const anterior of ctx.db.approvals.findMany({ campaign_id: row.id, status: 'valid' })) {
    ctx.db.approvals.update(anterior.id, {
      status: 'revoked',
      revoked_at: agora.toISOString(),
      revoke_reason: 'substituida por uma aprovacao mais recente',
    });
  }

  const orcamento = row.daily_budget_cents ?? row.lifetime_budget_cents ?? 0;
  const approval: ApprovalRow = {
    id: newId('apv', agora),
    campaign_id: row.id,
    client_id: row.client_id,
    approval_token: newApprovalToken(),
    approved_by: input.approvedBy.trim(),
    approved_at: agora.toISOString(),
    expires_at: addHours(agora, ttlHours).toISOString(),
    status: 'valid',
    approved_budget_cents: orcamento,
    budget_kind: row.daily_budget_cents !== null ? 'daily' : 'lifetime',
    approved_summary: montarResumoAprovacao(row, snapshot).join('\n'),
    meta_ids_json: JSON.stringify({
      campanha: row.meta_campaign_id,
      conjuntos: snapshot.adsetMetaIds,
      criativos: snapshot.creativeMetaIds,
      anuncios: snapshot.adMetaIds,
    }),
    fingerprint: fingerprintFromSnapshot(snapshot),
    consumed_at: null,
    revoked_at: null,
    revoke_reason: null,
  };

  ctx.db.approvals.insert({ ...approval });
  assertTransition(row.state as never, 'APPROVED');
  ctx.db.campaigns.update(row.id, { state: 'APPROVED', updated_at: agora.toISOString() });

  return approval;
}

/**
 * Verifica se existe aprovacao valida para ativar AGORA.
 * Recusa: vencida, ja usada, revogada, orcamento diferente, campanha alterada,
 * conta diferente, criativos diferentes e ausencia de IDs confirmados.
 */
export function verificarAprovacao(
  ctx: AgentContext,
  campaignId: string,
  token?: string,
): ApprovalCheck {
  const problemas: string[] = [];
  const row = getCampaignOrThrow(ctx, campaignId);
  const policy = ctx.policies.approval;

  const candidatas = ctx.db.approvals.findMany(
    { campaign_id: row.id },
    { orderBy: 'approved_at DESC' },
  );

  const aprovacao = token
    ? candidatas.find((item) => safeEquals(item.approval_token, token)) ?? null
    : candidatas.find((item) => item.status === 'valid') ?? null;

  if (!aprovacao) {
    return {
      ok: false,
      aprovacao: null,
      problemas: [
        token
          ? 'Nenhuma aprovacao com este codigo foi encontrada para a campanha.'
          : 'Nao existe aprovacao registrada para esta campanha.',
      ],
    };
  }

  if (aprovacao.status === 'consumed') {
    problemas.push(
      `Aprovacao ja utilizada em ${aprovacao.consumed_at}. Cada aprovacao vale uma unica ativacao.`,
    );
  }
  if (aprovacao.status === 'revoked') {
    problemas.push(`Aprovacao revogada: ${aprovacao.revoke_reason ?? 'sem motivo registrado'}.`);
  }
  if (isExpired(aprovacao.expires_at, ctx.clock)) {
    problemas.push(`Aprovacao vencida em ${aprovacao.expires_at}. Peca uma nova aprovacao.`);
  }

  const snapshot = snapshotCampanha(ctx, row);

  if (policy.exigirFingerprintIgual) {
    const atual = fingerprintFromSnapshot(snapshot);
    if (atual !== aprovacao.fingerprint) {
      problemas.push(
        'A campanha mudou depois da aprovacao (orcamento, publico, datas, destino, criativos ou IDs). Aprovacao invalidada.',
      );
    }
  }

  const orcamentoAtual = row.daily_budget_cents ?? row.lifetime_budget_cents ?? 0;
  if (orcamentoAtual !== aprovacao.approved_budget_cents) {
    problemas.push(
      `Orcamento atual (${formatMoney(orcamentoAtual, row.currency)}) difere do aprovado (${formatMoney(aprovacao.approved_budget_cents, row.currency)}).`,
    );
  }

  if (aprovacao.client_id !== row.client_id) {
    problemas.push('A aprovacao pertence a outra cliente.');
  }

  const idsAprovados = JSON.parse(aprovacao.meta_ids_json) as {
    campanha: string | null;
    conjuntos: string[];
    criativos: string[];
    anuncios: string[];
  };

  if (policy.exigirIdsMetaConfirmados) {
    if (!row.meta_campaign_id) problemas.push('A campanha nao tem ID confirmado na Meta.');
    if (idsAprovados.campanha !== row.meta_campaign_id) {
      problemas.push('O ID da campanha na Meta mudou depois da aprovacao.');
    }
    if (!mesmosIds(idsAprovados.criativos, snapshot.creativeMetaIds)) {
      problemas.push('Os criativos mudaram depois da aprovacao.');
    }
    if (!mesmosIds(idsAprovados.anuncios, snapshot.adMetaIds)) {
      problemas.push('Os anuncios mudaram depois da aprovacao.');
    }
  }

  return { ok: problemas.length === 0, aprovacao, problemas };
}

export function consumirAprovacao(ctx: AgentContext, approvalId: string): void {
  ctx.db.approvals.update(approvalId, {
    status: 'consumed',
    consumed_at: ctx.clock().toISOString(),
  });
}

export function revogarAprovacoes(ctx: AgentContext, campaignId: string, motivo: string): number {
  let total = 0;
  for (const aprovacao of ctx.db.approvals.findMany({ campaign_id: campaignId, status: 'valid' })) {
    ctx.db.approvals.update(aprovacao.id, {
      status: 'revoked',
      revoked_at: ctx.clock().toISOString(),
      revoke_reason: motivo,
    });
    total += 1;
  }
  return total;
}

function mesmosIds(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const ordenadoA = [...a].sort();
  const ordenadoB = [...b].sort();
  return ordenadoA.every((value, index) => value === ordenadoB[index]);
}

function montarResumoAprovacao(row: CampaignRow, snapshot: CampaignSnapshot): string[] {
  const orcamento =
    row.daily_budget_cents !== null
      ? `${formatMoney(row.daily_budget_cents, row.currency)}/dia`
      : `${formatMoney(row.lifetime_budget_cents ?? 0, row.currency)} no total`;

  return [
    `Campanha interna: ${row.id}`,
    `Cliente: ${row.client_id} · conta ${row.ad_account_id}`,
    `Nome: ${row.internal_name}`,
    `Modelo: ${row.template} · objetivo ${row.objective}`,
    `Orcamento: ${orcamento}`,
    `Periodo: ${row.start_time ?? '-'}${row.stop_time ? ` ate ${row.stop_time}` : ''}`,
    `Destino: ${snapshot.destination.tipo} -> ${snapshot.destination.valor}`,
    `IDs na Meta: campanha ${row.meta_campaign_id ?? '-'} · ${snapshot.adsetMetaIds.length} conjunto(s) · ${snapshot.creativeMetaIds.length} criativo(s) · ${snapshot.adMetaIds.length} anuncio(s)`,
    `Status na Meta no momento da aprovacao: ${row.meta_status ?? 'PAUSED'}`,
  ];
}
