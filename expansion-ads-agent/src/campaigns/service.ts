import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  consumirAprovacao,
  getCampaignOrThrow,
  revogarAprovacoes,
  verificarAprovacao,
} from '../approvals/service.js';
import type { ClientRecord } from '../clients/schema.js';
import type { AgentContext } from '../context.js';
import type { MetaCallRecord } from '../meta/client.js';
import { isRealMetaId } from '../meta/simulator.js';
import type { CampaignRow } from '../database/types.js';
import {
  ApprovalError,
  DuplicateError,
  PolicyViolationError,
  ValidationError,
} from '../shared/errors.js';
import { newId } from '../shared/ids.js';
import { loadBriefFile, peekClientId, type BriefLoadResult } from './brief-parser.js';
import type { CampaignBrief } from './brief-schema.js';
import { executarCriacao, type CreationResult, type CreationStepLog } from './creation.js';
import { assertTransition, STATES_WITH_META_OBJECTS, type CampaignState } from './state-machine.js';
import { validarCampanha, type ValidationResult } from './validation.js';

export interface BriefContext {
  readonly client: ClientRecord;
  readonly brief: CampaignBrief;
  readonly briefHash: string;
  readonly sourcePath: string | null;
}

/** Le o briefing ja com a cliente carregada e o cadastro conferido. */
export function carregarBriefing(ctx: AgentContext, briefPath: string): BriefContext {
  // O campo "cliente" e lido primeiro porque a moeda do cadastro e o que define
  // como o orcamento do briefing vira centavos. Sem isso, converteriamos errado.
  const clienteId = peekClientId(briefPath);
  if (!clienteId) {
    throw new ValidationError(
      `Nao foi possivel ler o campo "cliente" do briefing ${briefPath}.`,
      { arquivo: briefPath },
      ['Confira se existe a secao "## Dados" com a linha "- cliente: <id>".'],
    );
  }

  const client = ctx.clients.loadActive(clienteId);
  const carregado: BriefLoadResult = loadBriefFile(briefPath, client.config.moeda);

  return {
    client,
    brief: carregado.brief,
    briefHash: carregado.briefHash,
    sourcePath: carregado.sourcePath,
  };
}

export async function validarBriefing(
  ctx: AgentContext,
  briefPath: string,
  options: { consultarMeta?: boolean } = {},
): Promise<{ contexto: BriefContext; resultado: ValidationResult }> {
  const contexto = carregarBriefing(ctx, briefPath);
  const resultado = await validarCampanha(
    ctx,
    contexto.client,
    contexto.brief,
    contexto.briefHash,
    options,
  );
  return { contexto, resultado };
}

/** Grava (ou reaproveita) o briefing e a campanha no banco, em estado VALIDATED. */
export function persistirPlano(
  ctx: AgentContext,
  contexto: BriefContext,
  resultado: ValidationResult,
): CampaignRow {
  const agora = ctx.clock().toISOString();
  const { client, brief } = contexto;

  const clienteRow = ctx.db.clients.findById(client.config.id);
  const clienteDados = {
    name: client.config.nome,
    ad_account_id: client.config.meta.adAccountId,
    business_id: client.config.meta.businessId ?? null,
    page_id: client.config.meta.pageId,
    instagram_id: client.config.meta.instagramId ?? null,
    pixel_id: client.config.meta.pixelId ?? client.config.meta.datasetId ?? null,
    currency: client.config.moeda,
    timezone: client.config.fusoHorario,
    status: client.config.status,
    config_json: JSON.stringify(client.config),
    config_hash: client.configHash,
    updated_at: agora,
  };

  if (clienteRow) {
    ctx.db.clients.update(client.config.id, clienteDados);
  } else {
    ctx.db.clients.insert({ id: client.config.id, ...clienteDados, created_at: agora });
  }

  let briefRow = ctx.db.briefs.findOne({
    client_id: client.config.id,
    brief_hash: resultado.briefHash,
  });
  if (!briefRow) {
    const briefId = newId('brief', ctx.clock());
    ctx.db.briefs.insert({
      id: briefId,
      client_id: client.config.id,
      source_path: contexto.sourcePath,
      campaign_name: resultado.plano.campanha.name,
      template: brief.modelo,
      brief_json: JSON.stringify(brief),
      brief_hash: resultado.briefHash,
      created_at: agora,
    });
    briefRow = ctx.db.briefs.findById(briefId)!;
  }

  const existente = ctx.db.campaigns.findOne({ idempotency_key: resultado.idempotencyKey });
  if (existente) {
    // Plano igual: reaproveita a linha. Plano diferente na mesma chave nao ocorre
    // porque o hash do plano entra na propria chave de idempotencia.
    return existente;
  }

  const campaignId = newId('cmp', ctx.clock());
  ctx.db.campaigns.insert({
    id: campaignId,
    client_id: client.config.id,
    brief_id: briefRow.id,
    internal_name: resultado.plano.campanha.name,
    template: brief.modelo,
    objective: resultado.plano.campanha.objective,
    ad_account_id: resultado.adAccountId,
    state: 'VALIDATED',
    meta_campaign_id: null,
    meta_status: null,
    daily_budget_cents: brief.orcamentoDiarioCents,
    lifetime_budget_cents: brief.orcamentoTotalCents,
    currency: client.config.moeda,
    start_time: brief.dataInicio,
    stop_time: brief.dataEncerramento,
    idempotency_key: resultado.idempotencyKey,
    spec_hash: resultado.specHash,
    creatives_hash: resultado.creativesHash,
    brief_hash: resultado.briefHash,
    plan_json: JSON.stringify(resultado.plano),
    dry_run: ctx.meta.dryRun ? 1 : 0,
    last_error: null,
    created_at: agora,
    updated_at: agora,
  });

  return ctx.db.campaigns.findById(campaignId)!;
}

export interface DryRunResult {
  readonly campaignId: string;
  readonly validacao: ValidationResult;
  readonly criacaoSimulada: CreationResult;
  readonly chamadas: MetaCallRecord[];
  readonly arquivoPlano: string;
}

/**
 * Dry-run: valida tudo, monta a estrutura completa, simula os objetos da Meta,
 * registra as chamadas que seriam feitas (sem segredos) e salva o planejamento.
 * Nada sai do processo.
 */
export async function executarDryRun(ctx: AgentContext, briefPath: string): Promise<DryRunResult> {
  if (!ctx.meta.dryRun) {
    throw new PolicyViolationError(
      'global-policy',
      'dry_run',
      'executarDryRun exige um contexto em dry-run.',
    );
  }

  const { contexto, resultado } = await validarBriefing(ctx, briefPath);

  if (!resultado.ok) {
    registrarValidacaoReprovada(ctx, contexto, resultado);
    throw new PolicyViolationError(
      resultado.bloqueios[0]!.policy,
      resultado.bloqueios[0]!.rule,
      `Validacao reprovada: ${resultado.bloqueios.length} bloqueio(s).`,
      { bloqueios: resultado.bloqueios, avisos: resultado.avisos },
      resultado.bloqueios.map((finding) => finding.mensagem),
    );
  }

  const campaignRow = persistirPlano(ctx, contexto, resultado);
  ctx.metaClient.clearCallLog();

  const criacao = await executarCriacao(
    ctx,
    contexto.client,
    campaignRow,
    resultado.plano,
    resultado.arquivos,
  );

  const arquivoPlano = salvarPlano(ctx, campaignRow.id, {
    geradoEm: ctx.clock().toISOString(),
    dryRun: true,
    cliente: contexto.client.config.id,
    conta: resultado.adAccountId,
    resumo: resultado.resumo,
    plano: resultado.plano,
    criativos: resultado.criativos,
    avisos: resultado.avisos,
    duplicidades: resultado.duplicidades,
    idsSimulados: criacao.metaIds,
    chamadasQueSeriamFeitas: ctx.metaClient.callLog,
  });

  ctx.audit.record({
    actor: ctx.actor,
    actorKind: ctx.actorKind,
    tool: 'campaign:dry-run',
    clientId: contexto.client.config.id,
    adAccountId: resultado.adAccountId,
    campaignId: campaignRow.id,
    params: { briefing: briefPath, modelo: contexto.brief.modelo },
    outcome: 'dry_run',
    createdIds: criacao.metaIds as unknown as Record<string, unknown>,
    stateBefore: campaignRow.state,
    stateAfter: 'VALIDATED',
    dryRun: true,
  });

  // O dry-run nao deixa a campanha marcada como criada de verdade.
  ctx.db.campaigns.update(campaignRow.id, {
    state: 'VALIDATED',
    meta_campaign_id: null,
    meta_status: null,
    updated_at: ctx.clock().toISOString(),
  });

  return {
    campaignId: campaignRow.id,
    validacao: resultado,
    criacaoSimulada: criacao,
    chamadas: [...ctx.metaClient.callLog],
    arquivoPlano,
  };
}

export interface CreateOptions {
  readonly confirmarDuplicidade?: boolean;
}

/** Criacao real: exige contexto fora do dry-run e cria tudo PAUSED. */
/**
 * Monta o resultado de criacao a partir do que ja esta gravado, sem chamar a
 * Meta. Usado quando o comando de criacao e repetido numa campanha ja criada.
 */
function reconstruirCriacao(ctx: AgentContext, campaignRow: CampaignRow): CreationResult {
  const conjuntos: Record<string, string> = {};
  const criativos: Record<string, string> = {};
  const anuncios: Record<string, string> = {};
  const passos: CreationStepLog[] = [
    { etapa: 'campanha', acao: 'reaproveitado', metaId: campaignRow.meta_campaign_id ?? undefined },
  ];

  for (const adset of ctx.db.adsets.findMany({ campaign_id: campaignRow.id })) {
    if (!isRealMetaId(adset.meta_adset_id)) continue;
    conjuntos[adset.name] = adset.meta_adset_id;
    passos.push({ etapa: 'conjunto', acao: 'reaproveitado', ref: adset.name, metaId: adset.meta_adset_id });
  }
  for (const criativo of ctx.db.creatives.findMany({ campaign_id: campaignRow.id })) {
    if (!isRealMetaId(criativo.meta_creative_id)) continue;
    criativos[criativo.id] = criativo.meta_creative_id;
  }
  for (const anuncio of ctx.db.ads.findMany({ campaign_id: campaignRow.id })) {
    if (!isRealMetaId(anuncio.meta_ad_id)) continue;
    anuncios[anuncio.name] = anuncio.meta_ad_id;
    passos.push({ etapa: 'anuncio', acao: 'reaproveitado', ref: anuncio.name, metaId: anuncio.meta_ad_id });
  }

  return {
    campaignId: campaignRow.id,
    sucesso: true,
    simulado: false,
    metaIds: { campanha: campaignRow.meta_campaign_id, conjuntos, criativos, anuncios, uploads: {} },
    passos,
    falha: null,
  };
}

export async function criarCampanha(
  ctx: AgentContext,
  briefPath: string,
  options: CreateOptions = {},
): Promise<{ campaignId: string; validacao: ValidationResult; criacao: CreationResult }> {
  const { contexto, resultado } = await validarBriefing(ctx, briefPath);

  if (!resultado.ok) {
    registrarValidacaoReprovada(ctx, contexto, resultado);
    throw new PolicyViolationError(
      resultado.bloqueios[0]!.policy,
      resultado.bloqueios[0]!.rule,
      `Validacao reprovada: ${resultado.bloqueios.length} bloqueio(s). Nada foi criado.`,
      { bloqueios: resultado.bloqueios },
      resultado.bloqueios.map((finding) => finding.mensagem),
    );
  }

  const duplicidadesRelevantes = resultado.duplicidades.filter(
    (item) => item.estado !== 'VALIDATED' && item.estado !== 'DRAFT',
  );
  if (duplicidadesRelevantes.length > 0 && !options.confirmarDuplicidade) {
    throw new DuplicateError(
      `Possivel duplicidade detectada (${duplicidadesRelevantes.length}). Criacao interrompida.`,
      { duplicidades: duplicidadesRelevantes },
      [
        ...duplicidadesRelevantes.map(
          (item) => `${item.origem}: ${item.motivo} (${item.referencia}${item.estado ? `, ${item.estado}` : ''})`,
        ),
        'Se for intencional, repita o comando com --confirmar-duplicidade.',
      ],
    );
  }

  const campaignRow = persistirPlano(ctx, contexto, resultado);
  const estadoAnterior = campaignRow.state as CampaignState;

  // Idempotencia de verdade: se esta campanha ja existe na Meta, repetir o
  // comando nao recria nada nem quebra — devolve o que ja esta la.
  if (STATES_WITH_META_OBJECTS.includes(estadoAnterior) && isRealMetaId(campaignRow.meta_campaign_id)) {
    const criacao = reconstruirCriacao(ctx, campaignRow);
    ctx.audit.record({
      actor: ctx.actor,
      actorKind: ctx.actorKind,
      tool: 'campaign:create',
      clientId: campaignRow.client_id,
      adAccountId: campaignRow.ad_account_id,
      campaignId: campaignRow.id,
      params: { briefing: briefPath },
      outcome: 'noop',
      createdIds: criacao.metaIds as unknown as Record<string, unknown>,
      stateBefore: estadoAnterior,
      stateAfter: estadoAnterior,
      dryRun: false,
    });
    return { campaignId: campaignRow.id, validacao: resultado, criacao };
  }

  assertTransition(estadoAnterior, 'CREATING');
  ctx.db.campaigns.update(campaignRow.id, {
    state: 'CREATING',
    dry_run: 0,
    updated_at: ctx.clock().toISOString(),
  });

  const atual = ctx.db.campaigns.findById(campaignRow.id)!;
  const criacao = await executarCriacao(
    ctx,
    contexto.client,
    atual,
    resultado.plano,
    resultado.arquivos,
  );

  ctx.audit.record({
    actor: ctx.actor,
    actorKind: ctx.actorKind,
    tool: 'campaign:create',
    clientId: contexto.client.config.id,
    adAccountId: resultado.adAccountId,
    campaignId: campaignRow.id,
    params: { briefing: briefPath },
    outcome: criacao.sucesso ? 'success' : 'error',
    createdIds: criacao.metaIds as unknown as Record<string, unknown>,
    error: criacao.falha ?? undefined,
    stateBefore: estadoAnterior,
    stateAfter: criacao.sucesso ? 'CREATED_PAUSED' : 'CREATION_FAILED',
    dryRun: false,
  });

  if (!criacao.sucesso) {
    salvarPlano(ctx, campaignRow.id, {
      geradoEm: ctx.clock().toISOString(),
      tipo: 'relatorio-de-falha',
      falha: criacao.falha,
      passos: criacao.passos,
      idsJaCriados: criacao.metaIds,
      comoRetomar:
        'Corrija a causa e rode novamente campaign:create com o mesmo briefing. Os objetos ja criados sao reaproveitados; nada e duplicado nem apagado.',
    });
  }

  return { campaignId: campaignRow.id, validacao: resultado, criacao };
}

export interface ConfirmResult {
  readonly campaignId: string;
  readonly campanha: Record<string, unknown> | null;
  readonly conjuntos: unknown[];
  readonly anuncios: unknown[];
  readonly tudoPausado: boolean;
  readonly divergencias: string[];
}

/** Consulta a Meta depois da criacao e confirma o que existe de fato. */
export async function confirmarNaMeta(
  ctx: AgentContext,
  campaignId: string,
): Promise<ConfirmResult> {
  const row = getCampaignOrThrow(ctx, campaignId);
  const divergencias: string[] = [];

  if (!row.meta_campaign_id) {
    return {
      campaignId: row.id,
      campanha: null,
      conjuntos: [],
      anuncios: [],
      tudoPausado: true,
      divergencias: ['A campanha ainda nao tem ID na Meta (nada foi criado de verdade).'],
    };
  }

  if (!ctx.meta.hasCredentials) {
    return {
      campaignId: row.id,
      campanha: null,
      conjuntos: [],
      anuncios: [],
      tudoPausado: true,
      divergencias: ['Sem credencial configurada: nao da para confirmar na Meta.'],
    };
  }

  const campanha = await ctx.meta.getCampaign(row.meta_campaign_id);
  const conjuntos = await ctx.meta.listAdSets(row.meta_campaign_id);
  const anuncios = await ctx.meta.listAds(row.meta_campaign_id);

  const esperadoConjuntos = ctx.db.adsets.count({ campaign_id: row.id });
  const esperadoAnuncios = ctx.db.ads.count({ campaign_id: row.id });

  if (conjuntos.length !== esperadoConjuntos) {
    divergencias.push(
      `A Meta reporta ${conjuntos.length} conjunto(s); o banco esperava ${esperadoConjuntos}.`,
    );
  }
  if (anuncios.length !== esperadoAnuncios) {
    divergencias.push(
      `A Meta reporta ${anuncios.length} anuncio(s); o banco esperava ${esperadoAnuncios}.`,
    );
  }

  const statusCampanha = campanha?.status ?? campanha?.effective_status ?? null;
  const tudoPausado =
    statusCampanha === 'PAUSED' &&
    conjuntos.every((conjunto) => conjunto.status === 'PAUSED') &&
    anuncios.every((anuncio) => anuncio.status === 'PAUSED');

  if (statusCampanha && statusCampanha !== 'PAUSED' && row.state === 'CREATED_PAUSED') {
    divergencias.push(`A campanha deveria estar PAUSED na Meta, mas esta ${statusCampanha}.`);
  }

  ctx.db.campaigns.update(row.id, {
    meta_status: statusCampanha,
    updated_at: ctx.clock().toISOString(),
  });

  return {
    campaignId: row.id,
    campanha: campanha as unknown as Record<string, unknown> | null,
    conjuntos,
    anuncios,
    tudoPausado,
    divergencias,
  };
}

export interface ActivationResult {
  readonly campaignId: string;
  readonly ativados: { anuncios: number; conjuntos: number; campanha: boolean };
  readonly aprovacao: string;
  readonly simulado: boolean;
}

/** Ativacao: so acontece com aprovacao valida. Sem excecao. */
export async function ativarCampanha(
  ctx: AgentContext,
  campaignId: string,
  token?: string,
): Promise<ActivationResult> {
  const row = getCampaignOrThrow(ctx, campaignId);
  const check = verificarAprovacao(ctx, row.id, token);

  if (!check.ok || !check.aprovacao) {
    ctx.audit.record({
      actor: ctx.actor,
      actorKind: ctx.actorKind,
      tool: 'campaign:activate',
      clientId: row.client_id,
      adAccountId: row.ad_account_id,
      campaignId: row.id,
      params: { token: token ? '[REDIGIDO]' : null },
      outcome: 'blocked',
      error: { problemas: check.problemas },
      stateBefore: row.state,
      stateAfter: row.state,
      dryRun: ctx.meta.dryRun,
    });
    ctx.audit.violation({
      clientId: row.client_id,
      campaignId: row.id,
      tool: 'campaign:activate',
      policy: 'approval-policy',
      rule: 'ativacao_sem_aprovacao_valida',
      severity: 'block',
      message: check.problemas.join(' | '),
    });
    throw new ApprovalError(
      'APROVACAO_INVALIDA',
      'Ativacao bloqueada: nao ha aprovacao valida para esta campanha.',
      { campaignId: row.id, problemas: check.problemas },
      check.problemas,
    );
  }

  if (ctx.policies.approval.exigirCampanhaPausadaNaMeta && ctx.meta.hasCredentials) {
    const confirmacao = await confirmarNaMeta(ctx, row.id);
    if (!confirmacao.tudoPausado) {
      throw new ApprovalError(
        'CAMPANHA_NAO_ESTA_PAUSADA',
        'A campanha nao esta integralmente PAUSED na Meta. Ativacao abortada.',
        { divergencias: confirmacao.divergencias },
      );
    }
  }

  assertTransition(row.state as CampaignState, 'ACTIVATING');
  ctx.db.campaigns.update(row.id, {
    state: 'ACTIVATING',
    updated_at: ctx.clock().toISOString(),
  });

  const anuncios = ctx.db.ads.findMany({ campaign_id: row.id });
  const conjuntos = ctx.db.adsets.findMany({ campaign_id: row.id });

  try {
    // Ordem: anuncio -> conjunto -> campanha. A campanha por ultimo garante que
    // nada entrega antes de a estrutura inteira estar pronta.
    for (const anuncio of anuncios) {
      if (!anuncio.meta_ad_id) continue;
      await ctx.meta.updateStatus(anuncio.meta_ad_id, 'ACTIVE');
      ctx.db.ads.update(anuncio.id, { meta_status: 'ACTIVE', updated_at: ctx.clock().toISOString() });
    }
    for (const conjunto of conjuntos) {
      if (!conjunto.meta_adset_id) continue;
      await ctx.meta.updateStatus(conjunto.meta_adset_id, 'ACTIVE');
      ctx.db.adsets.update(conjunto.id, {
        meta_status: 'ACTIVE',
        updated_at: ctx.clock().toISOString(),
      });
    }
    await ctx.meta.updateStatus(row.meta_campaign_id!, 'ACTIVE');
  } catch (error) {
    ctx.db.campaigns.update(row.id, {
      state: 'ACTIVATION_FAILED',
      last_error: JSON.stringify({ mensagem: (error as Error).message }),
      updated_at: ctx.clock().toISOString(),
    });
    throw error;
  }

  consumirAprovacao(ctx, check.aprovacao.id);
  ctx.db.campaigns.update(row.id, {
    state: 'ACTIVE',
    meta_status: 'ACTIVE',
    updated_at: ctx.clock().toISOString(),
  });

  ctx.audit.record({
    actor: ctx.actor,
    actorKind: ctx.actorKind,
    tool: 'campaign:activate',
    clientId: row.client_id,
    adAccountId: row.ad_account_id,
    campaignId: row.id,
    params: { aprovacao: check.aprovacao.id, aprovadoPor: check.aprovacao.approved_by },
    outcome: 'success',
    createdIds: { campanha: row.meta_campaign_id },
    stateBefore: 'ACTIVATING',
    stateAfter: 'ACTIVE',
    dryRun: ctx.meta.dryRun,
  });

  return {
    campaignId: row.id,
    ativados: {
      anuncios: anuncios.filter((item) => item.meta_ad_id).length,
      conjuntos: conjuntos.filter((item) => item.meta_adset_id).length,
      campanha: true,
    },
    aprovacao: check.aprovacao.id,
    simulado: ctx.meta.dryRun,
  };
}

/** Pausa e sempre permitida: e a acao segura. */
export async function pausarCampanha(
  ctx: AgentContext,
  campaignId: string,
  motivo: string,
): Promise<{ campaignId: string; pausados: number; simulado: boolean }> {
  const row = getCampaignOrThrow(ctx, campaignId);
  let pausados = 0;

  if (row.meta_campaign_id) {
    await ctx.meta.updateStatus(row.meta_campaign_id, 'PAUSED');
    pausados += 1;
  }

  const estadoAnterior = row.state as CampaignState;
  const proximo: CampaignState = estadoAnterior === 'ACTIVE' ? 'PAUSED' : estadoAnterior;
  if (proximo !== estadoAnterior) {
    assertTransition(estadoAnterior, proximo);
    ctx.db.campaigns.update(row.id, {
      state: proximo,
      meta_status: 'PAUSED',
      updated_at: ctx.clock().toISOString(),
    });
  } else {
    ctx.db.campaigns.update(row.id, {
      meta_status: 'PAUSED',
      updated_at: ctx.clock().toISOString(),
    });
  }

  const revogadas = revogarAprovacoes(ctx, row.id, `campanha pausada: ${motivo}`);

  ctx.audit.record({
    actor: ctx.actor,
    actorKind: ctx.actorKind,
    tool: 'campaign:pause',
    clientId: row.client_id,
    adAccountId: row.ad_account_id,
    campaignId: row.id,
    params: { motivo, aprovacoesRevogadas: revogadas },
    outcome: 'success',
    stateBefore: estadoAnterior,
    stateAfter: proximo,
    dryRun: ctx.meta.dryRun,
  });

  return { campaignId: row.id, pausados, simulado: ctx.meta.dryRun };
}

function registrarValidacaoReprovada(
  ctx: AgentContext,
  contexto: BriefContext,
  resultado: ValidationResult,
): void {
  for (const bloqueio of resultado.bloqueios) {
    ctx.audit.violation({
      clientId: contexto.client.config.id,
      tool: 'campaign:validate',
      policy: bloqueio.policy,
      rule: bloqueio.rule,
      severity: 'block',
      message: bloqueio.mensagem,
      context: bloqueio.detalhes,
    });
  }
}

export function salvarPlano(ctx: AgentContext, campaignId: string, conteudo: unknown): string {
  const dir = path.join(ctx.config.paths.reports, 'planos');
  mkdirSync(dir, { recursive: true });
  const arquivo = path.join(dir, `${campaignId}.json`);
  writeFileSync(arquivo, `${JSON.stringify(conteudo, null, 2)}\n`, 'utf8');
  return arquivo;
}
