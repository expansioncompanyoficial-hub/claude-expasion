import type { AgentContext } from '../context.js';
import type { ClientRecord } from '../clients/schema.js';
import { readCreativeBytes, type CreativeFile } from '../creatives/files.js';
import { childIdempotencyKey } from '../security/idempotency.js';
import { AppError, toAppError } from '../shared/errors.js';
import { newId } from '../shared/ids.js';
import type { CampaignRow } from '../database/types.js';
import { isRealMetaId } from '../meta/simulator.js';
import type { CampaignPlan } from './templates/types.js';

export interface CreationStepLog {
  readonly etapa: string;
  readonly acao: 'criado' | 'reaproveitado' | 'falhou';
  readonly ref?: string;
  readonly metaId?: string;
  readonly erro?: string;
}

export interface CreationResult {
  readonly campaignId: string;
  readonly sucesso: boolean;
  readonly simulado: boolean;
  readonly metaIds: {
    campanha: string | null;
    conjuntos: Record<string, string>;
    criativos: Record<string, string>;
    anuncios: Record<string, string>;
    uploads: Record<string, { imageHash?: string; videoId?: string }>;
  };
  readonly passos: CreationStepLog[];
  readonly falha: { etapa: string; erro: Record<string, unknown> } | null;
}

/**
 * Cria a estrutura na ordem oficial da Meta:
 * campanha -> conjunto -> upload dos ativos -> criativo -> anuncio.
 *
 * Tudo nasce PAUSED. Cada objeto criado e gravado no banco antes do proximo
 * passo, entao uma falha no meio nunca duplica: a proxima execucao reaproveita
 * o que ja existe e continua exatamente de onde parou.
 */
export async function executarCriacao(
  ctx: AgentContext,
  client: ClientRecord,
  campaignRow: CampaignRow,
  plano: CampaignPlan,
  arquivos: readonly CreativeFile[],
): Promise<CreationResult> {
  const passos: CreationStepLog[] = [];
  const adAccountId = client.config.meta.adAccountId;
  const agora = () => ctx.clock().toISOString();

  const metaIds: CreationResult['metaIds'] = {
    campanha: isRealMetaId(campaignRow.meta_campaign_id) ? campaignRow.meta_campaign_id : null,
    conjuntos: {},
    criativos: {},
    anuncios: {},
    uploads: {},
  };

  const arquivoPorNome = new Map(arquivos.map((arquivo) => [arquivo.arquivo, arquivo]));

  const registrarMetaObject = (
    objectType: string,
    metaId: string,
    idempotencyKey: string | null,
    payload: unknown,
  ): void => {
    const existente = ctx.db.metaObjects.findOne({
      object_type: objectType,
      meta_id: metaId,
      ad_account_id: adAccountId,
    });
    if (existente) return;
    ctx.db.metaObjects.insert({
      id: newId('mo', ctx.clock()),
      client_id: client.config.id,
      campaign_id: campaignRow.id,
      object_type: objectType,
      meta_id: metaId,
      ad_account_id: adAccountId,
      status: 'PAUSED',
      payload_json: JSON.stringify(payload),
      idempotency_key: idempotencyKey,
      dry_run: ctx.meta.dryRun ? 1 : 0,
      created_at: agora(),
    });
  };

  const falhar = (etapa: string, error: unknown): CreationResult => {
    const appError = toAppError(error);
    passos.push({ etapa, acao: 'falhou', erro: appError.message });
    ctx.db.campaigns.update(campaignRow.id, {
      state: 'CREATION_FAILED',
      last_error: JSON.stringify(appError.toJSON()),
      updated_at: agora(),
    });
    return {
      campaignId: campaignRow.id,
      sucesso: false,
      simulado: ctx.meta.dryRun,
      metaIds,
      passos,
      falha: { etapa, erro: appError.toJSON() },
    };
  };

  // ------------------------------------------------------------- 1. campanha
  if (!metaIds.campanha) {
    try {
      const payload = {
        ...plano.campanha,
        special_ad_categories: JSON.stringify(plano.campanha.special_ad_categories),
      };
      const criada = await ctx.meta.createCampaign(adAccountId, payload);
      metaIds.campanha = criada.id;
      ctx.db.campaigns.update(campaignRow.id, {
        meta_campaign_id: criada.id,
        meta_status: 'PAUSED',
        updated_at: agora(),
      });
      registrarMetaObject('campaign', criada.id, campaignRow.idempotency_key, plano.campanha);
      passos.push({ etapa: 'campanha', acao: 'criado', metaId: criada.id });
    } catch (error) {
      return falhar('campanha', error);
    }
  } else {
    passos.push({ etapa: 'campanha', acao: 'reaproveitado', metaId: metaIds.campanha });
  }

  // -------------------------------------------------------------- 2. conjuntos
  for (const conjunto of plano.conjuntos) {
    const idempotencyKey = childIdempotencyKey(
      campaignRow.idempotency_key,
      'adset',
      conjunto.ref,
      conjunto,
    );
    const existente = ctx.db.adsets.findOne({ idempotency_key: idempotencyKey });

    if (isRealMetaId(existente?.meta_adset_id)) {
      metaIds.conjuntos[conjunto.ref] = existente.meta_adset_id;
      passos.push({
        etapa: 'conjunto',
        acao: 'reaproveitado',
        ref: conjunto.ref,
        metaId: existente.meta_adset_id,
      });
      continue;
    }

    const rowId = existente?.id ?? newId('adset', ctx.clock());
    if (!existente) {
      ctx.db.adsets.insert({
        id: rowId,
        campaign_id: campaignRow.id,
        name: conjunto.name,
        meta_adset_id: null,
        meta_status: null,
        optimization_goal: conjunto.optimization_goal,
        billing_event: conjunto.billing_event,
        destination_type: conjunto.destination_type,
        daily_budget_cents: conjunto.daily_budget ?? null,
        lifetime_budget_cents: conjunto.lifetime_budget ?? null,
        targeting_json: JSON.stringify(conjunto.targeting),
        promoted_object_json: JSON.stringify(conjunto.promoted_object),
        spec_json: JSON.stringify(conjunto),
        idempotency_key: idempotencyKey,
        created_at: agora(),
        updated_at: agora(),
      });
    }

    try {
      const payload: Record<string, unknown> = {
        name: conjunto.name,
        campaign_id: metaIds.campanha,
        status: 'PAUSED',
        optimization_goal: conjunto.optimization_goal,
        billing_event: conjunto.billing_event,
        destination_type: conjunto.destination_type,
        bid_strategy: conjunto.bid_strategy,
        start_time: conjunto.start_time,
        targeting: JSON.stringify(conjunto.targeting),
        promoted_object: JSON.stringify(conjunto.promoted_object),
      };
      if (conjunto.end_time) payload.end_time = conjunto.end_time;
      if (conjunto.daily_budget !== undefined) payload.daily_budget = conjunto.daily_budget;
      if (conjunto.lifetime_budget !== undefined) payload.lifetime_budget = conjunto.lifetime_budget;

      const criado = await ctx.meta.createAdSet(adAccountId, payload);
      metaIds.conjuntos[conjunto.ref] = criado.id;
      ctx.db.adsets.update(rowId, {
        meta_adset_id: criado.id,
        meta_status: 'PAUSED',
        updated_at: agora(),
      });
      registrarMetaObject('adset', criado.id, idempotencyKey, payload);
      passos.push({ etapa: 'conjunto', acao: 'criado', ref: conjunto.ref, metaId: criado.id });
    } catch (error) {
      return falhar(`conjunto:${conjunto.ref}`, error);
    }
  }

  // --------------------------------------------- 3. upload dos ativos + criativos
  for (const criativo of plano.criativos) {
    const arquivo = arquivoPorNome.get(criativo.arquivo);
    if (!arquivo) {
      return falhar(
        `criativo:${criativo.ref}`,
        new AppError({
          code: 'CRIATIVO_AUSENTE',
          category: 'validation',
          message: `Arquivo "${criativo.arquivo}" nao foi carregado na validacao.`,
        }),
      );
    }

    const idempotencyKey = childIdempotencyKey(
      campaignRow.idempotency_key,
      'creative',
      criativo.ref,
      { spec: criativo, hash: arquivo.hash },
    );
    const existente = ctx.db.creatives.findOne({ idempotency_key: idempotencyKey });

    if (isRealMetaId(existente?.meta_creative_id)) {
      metaIds.criativos[criativo.ref] = existente.meta_creative_id;
      metaIds.uploads[criativo.arquivo] = {
        ...(existente.meta_image_hash ? { imageHash: existente.meta_image_hash } : {}),
        ...(existente.meta_video_id ? { videoId: existente.meta_video_id } : {}),
      };
      passos.push({
        etapa: 'criativo',
        acao: 'reaproveitado',
        ref: criativo.ref,
        metaId: existente.meta_creative_id,
      });
      continue;
    }

    const rowId = existente?.id ?? newId('cre', ctx.clock());
    if (!existente) {
      ctx.db.creatives.insert({
        id: rowId,
        client_id: client.config.id,
        campaign_id: campaignRow.id,
        kind: criativo.kind,
        file_path: arquivo.caminhoRelativo,
        file_hash: arquivo.hash,
        file_bytes: arquivo.bytes,
        mime_type: arquivo.mimeType,
        width: arquivo.largura,
        height: arquivo.altura,
        meta_image_hash: null,
        meta_video_id: null,
        meta_creative_id: null,
        copy_json: JSON.stringify(criativo.copy),
        spec_json: JSON.stringify(criativo),
        idempotency_key: idempotencyKey,
        created_at: agora(),
        updated_at: agora(),
      });
    }

    // Upload: reaproveita o ativo se o MESMO arquivo ja foi enviado para a
    // mesma cliente antes. Isso evita duplicar midia na biblioteca da conta.
    let imageHash: string | undefined;
    let videoId: string | undefined;

    try {
      const jaEnviado = ctx.db.creatives
        .findMany({ client_id: client.config.id, file_hash: arquivo.hash })
        .find((row) => isRealMetaId(row.meta_image_hash) || isRealMetaId(row.meta_video_id));

      if (isRealMetaId(jaEnviado?.meta_image_hash)) {
        imageHash = jaEnviado.meta_image_hash;
        passos.push({ etapa: 'upload', acao: 'reaproveitado', ref: criativo.arquivo, metaId: imageHash });
      } else if (isRealMetaId(jaEnviado?.meta_video_id)) {
        videoId = jaEnviado.meta_video_id;
        passos.push({ etapa: 'upload', acao: 'reaproveitado', ref: criativo.arquivo, metaId: videoId });
      } else if (criativo.kind === 'image') {
        const enviado = await ctx.meta.uploadImage(adAccountId, {
          filename: arquivo.arquivo,
          contentType: arquivo.mimeType,
          data: readCreativeBytes(arquivo),
          fileHash: arquivo.hash,
        });
        imageHash = enviado.hash;
        passos.push({ etapa: 'upload', acao: 'criado', ref: criativo.arquivo, metaId: enviado.hash });
      } else {
        const enviado = await ctx.meta.uploadVideo(adAccountId, {
          filename: arquivo.arquivo,
          contentType: arquivo.mimeType,
          data: readCreativeBytes(arquivo),
          fileHash: arquivo.hash,
        });
        videoId = enviado.id;
        passos.push({ etapa: 'upload', acao: 'criado', ref: criativo.arquivo, metaId: enviado.id });
      }

      metaIds.uploads[criativo.arquivo] = {
        ...(imageHash ? { imageHash } : {}),
        ...(videoId ? { videoId } : {}),
      };
      ctx.db.creatives.update(rowId, {
        meta_image_hash: imageHash ?? null,
        meta_video_id: videoId ?? null,
        updated_at: agora(),
      });
    } catch (error) {
      return falhar(`upload:${criativo.arquivo}`, error);
    }

    try {
      const storySpec = structuredClone(criativo.object_story_spec) as Record<string, unknown>;
      const dados = (storySpec.link_data ?? storySpec.video_data) as Record<string, unknown>;
      if (imageHash) dados.image_hash = imageHash;
      if (videoId) dados.video_id = videoId;

      const payload = {
        name: criativo.name,
        object_story_spec: JSON.stringify(storySpec),
        degrees_of_freedom_spec: JSON.stringify({
          creative_features_spec: { standard_enhancements: { enroll_status: 'OPT_OUT' } },
        }),
      };

      const criado = await ctx.meta.createAdCreative(adAccountId, payload);
      metaIds.criativos[criativo.ref] = criado.id;
      ctx.db.creatives.update(rowId, { meta_creative_id: criado.id, updated_at: agora() });
      registrarMetaObject('adcreative', criado.id, idempotencyKey, payload);
      passos.push({ etapa: 'criativo', acao: 'criado', ref: criativo.ref, metaId: criado.id });
    } catch (error) {
      return falhar(`criativo:${criativo.ref}`, error);
    }
  }

  // --------------------------------------------------------------- 4. anuncios
  for (const anuncio of plano.anuncios) {
    const idempotencyKey = childIdempotencyKey(
      campaignRow.idempotency_key,
      'ad',
      anuncio.ref,
      anuncio,
    );
    const existente = ctx.db.ads.findOne({ idempotency_key: idempotencyKey });

    if (isRealMetaId(existente?.meta_ad_id)) {
      metaIds.anuncios[anuncio.ref] = existente.meta_ad_id;
      passos.push({
        etapa: 'anuncio',
        acao: 'reaproveitado',
        ref: anuncio.ref,
        metaId: existente.meta_ad_id,
      });
      continue;
    }

    const adsetMetaId = metaIds.conjuntos[anuncio.adsetRef];
    const creativeMetaId = metaIds.criativos[anuncio.creativeRef];
    if (!adsetMetaId || !creativeMetaId) {
      return falhar(
        `anuncio:${anuncio.ref}`,
        new AppError({
          code: 'DEPENDENCIA_AUSENTE',
          category: 'internal',
          message: `Anuncio "${anuncio.ref}" depende de conjunto/criativo que nao foi criado.`,
          details: { adsetRef: anuncio.adsetRef, creativeRef: anuncio.creativeRef },
        }),
      );
    }

    const adsetRow = ctx.db.adsets.findOne({ meta_adset_id: adsetMetaId });
    const creativeRow = ctx.db.creatives.findOne({ meta_creative_id: creativeMetaId });
    const rowId = existente?.id ?? newId('ad', ctx.clock());

    if (!existente) {
      ctx.db.ads.insert({
        id: rowId,
        campaign_id: campaignRow.id,
        adset_id: adsetRow?.id ?? '',
        creative_id: creativeRow?.id ?? '',
        name: anuncio.name,
        meta_ad_id: null,
        meta_status: null,
        spec_json: JSON.stringify(anuncio),
        idempotency_key: idempotencyKey,
        created_at: agora(),
        updated_at: agora(),
      });
    }

    try {
      const payload = {
        name: anuncio.name,
        adset_id: adsetMetaId,
        creative: JSON.stringify({ creative_id: creativeMetaId }),
        status: 'PAUSED',
      };
      const criado = await ctx.meta.createAd(adAccountId, payload);
      metaIds.anuncios[anuncio.ref] = criado.id;
      ctx.db.ads.update(rowId, {
        meta_ad_id: criado.id,
        meta_status: 'PAUSED',
        updated_at: agora(),
      });
      registrarMetaObject('ad', criado.id, idempotencyKey, payload);
      passos.push({ etapa: 'anuncio', acao: 'criado', ref: anuncio.ref, metaId: criado.id });
    } catch (error) {
      return falhar(`anuncio:${anuncio.ref}`, error);
    }
  }

  ctx.db.campaigns.update(campaignRow.id, {
    state: 'CREATED_PAUSED',
    meta_status: 'PAUSED',
    last_error: null,
    updated_at: agora(),
  });

  return {
    campaignId: campaignRow.id,
    sucesso: true,
    simulado: ctx.meta.dryRun,
    metaIds,
    passos,
    falha: null,
  };
}
