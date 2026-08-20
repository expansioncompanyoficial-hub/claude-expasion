import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import path from 'node:path';
import type { AgentContext } from '../../context.js';
import { readCreativeBytes, readCreativeFile } from '../../creatives/files.js';
import { validarCriativos } from '../../creatives/validate.js';
import { assertAdAccountAllowed } from '../../security/allowlist.js';
import { criarCampanha, confirmarNaMeta } from '../../campaigns/service.js';
import { getCampaignOrThrow } from '../../approvals/service.js';
import { PolicyViolationError } from '../../shared/errors.js';
import { newId } from '../../shared/ids.js';
import { adAccountField, campaignIdField, clientIdField, registerTool } from '../helpers.js';

function resolverBriefing(ctx: AgentContext, caminho: string): string {
  return path.isAbsolute(caminho) ? caminho : path.resolve(ctx.config.paths.root, caminho);
}

/**
 * Guarda-costas das ferramentas de criacao.
 *
 * Fora do dry-run, criar exige que a cliente seja real (nao a de exemplo) e que
 * exista credencial. Em dry-run, tudo e simulado e nada sai do processo.
 */
function assertPodeCriar(ctx: AgentContext, clientId: string): void {
  const client = ctx.clients.loadActive(clientId);
  if (!ctx.meta.dryRun && client.isExample) {
    throw new PolicyViolationError(
      'client-config',
      'cliente_de_exemplo',
      `A cliente "${clientId}" veio de config.example.json e nao pode criar nada de verdade.`,
      { clientId },
      [`Crie clients/${clientId}/config.json com os dados reais.`],
    );
  }
}

export function registerCreationTools(server: McpServer, ctx: AgentContext): void {
  registerTool(server, ctx, {
    name: 'meta_upload_image',
    title: 'Enviar imagem para a Meta',
    description:
      'Envia uma imagem de creatives/<cliente>/ para a biblioteca da conta e devolve o image_hash. Em dry-run devolve hash simulado. Reaproveita upload anterior do mesmo arquivo.',
    category: 'criacao',
    readOnly: false,
    inputSchema: {
      clientId: clientIdField,
      adAccountId: adAccountField,
      arquivo: z.string().trim().min(1).describe('Nome do arquivo dentro de creatives/<cliente>/.'),
    },
    async handler(args, context) {
      assertPodeCriar(context, args.clientId);
      const client = context.clients.loadActive(args.clientId);
      const adAccountId = assertAdAccountAllowed(client, args.adAccountId);
      const arquivo = readCreativeFile(context.config.paths.creatives, client.config.id, args.arquivo);

      if (arquivo.kind !== 'image') {
        throw new PolicyViolationError(
          'global-policy',
          'tipo_incorreto',
          `"${args.arquivo}" nao e imagem. Use meta_upload_video.`,
        );
      }

      const validacao = validarCriativos([arquivo], context.policies.global);
      if (!validacao.relatorios[0]?.ok) {
        throw new PolicyViolationError(
          'global-policy',
          'criativo_invalido',
          `Imagem reprovada: ${validacao.relatorios[0]?.problemas.join(' ')}`,
          { relatorio: validacao.relatorios[0] },
          validacao.relatorios[0]?.problemas ?? [],
        );
      }

      const jaEnviado = context.db.creatives
        .findMany({ client_id: client.config.id, file_hash: arquivo.hash })
        .find((row) => row.meta_image_hash);

      if (jaEnviado?.meta_image_hash) {
        return {
          imageHash: jaEnviado.meta_image_hash,
          reaproveitado: true,
          arquivo: arquivo.arquivo,
          hashDoArquivo: arquivo.hash,
        };
      }

      const enviado = await context.meta.uploadImage(adAccountId, {
        filename: arquivo.arquivo,
        contentType: arquivo.mimeType,
        data: readCreativeBytes(arquivo),
        fileHash: arquivo.hash,
      });

      const agora = context.clock().toISOString();
      context.db.creatives.insert({
        id: newId('cre', context.clock()),
        client_id: client.config.id,
        campaign_id: null,
        kind: 'image',
        file_path: arquivo.caminhoRelativo,
        file_hash: arquivo.hash,
        file_bytes: arquivo.bytes,
        mime_type: arquivo.mimeType,
        width: arquivo.largura,
        height: arquivo.altura,
        meta_image_hash: enviado.hash,
        meta_video_id: null,
        meta_creative_id: null,
        copy_json: null,
        spec_json: null,
        idempotency_key: `upload:image:${client.config.id}:${arquivo.hash}`,
        created_at: agora,
        updated_at: agora,
      });

      return {
        imageHash: enviado.hash,
        url: enviado.url ?? null,
        simulado: enviado.simulado,
        arquivo: arquivo.arquivo,
        dimensoes: `${arquivo.largura}x${arquivo.altura}`,
        hashDoArquivo: arquivo.hash,
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_upload_video',
    title: 'Enviar video para a Meta',
    description:
      'Envia um video de creatives/<cliente>/ e devolve o video_id. Em dry-run devolve id simulado. Reaproveita upload anterior do mesmo arquivo.',
    category: 'criacao',
    readOnly: false,
    inputSchema: {
      clientId: clientIdField,
      adAccountId: adAccountField,
      arquivo: z.string().trim().min(1),
    },
    async handler(args, context) {
      assertPodeCriar(context, args.clientId);
      const client = context.clients.loadActive(args.clientId);
      const adAccountId = assertAdAccountAllowed(client, args.adAccountId);
      const arquivo = readCreativeFile(context.config.paths.creatives, client.config.id, args.arquivo);

      if (arquivo.kind !== 'video') {
        throw new PolicyViolationError(
          'global-policy',
          'tipo_incorreto',
          `"${args.arquivo}" nao e video. Use meta_upload_image.`,
        );
      }

      const validacao = validarCriativos([arquivo], context.policies.global);
      if (!validacao.relatorios[0]?.ok) {
        throw new PolicyViolationError(
          'global-policy',
          'criativo_invalido',
          `Video reprovado: ${validacao.relatorios[0]?.problemas.join(' ')}`,
          { relatorio: validacao.relatorios[0] },
          validacao.relatorios[0]?.problemas ?? [],
        );
      }

      const jaEnviado = context.db.creatives
        .findMany({ client_id: client.config.id, file_hash: arquivo.hash })
        .find((row) => row.meta_video_id);

      if (jaEnviado?.meta_video_id) {
        return { videoId: jaEnviado.meta_video_id, reaproveitado: true, arquivo: arquivo.arquivo };
      }

      const enviado = await context.meta.uploadVideo(adAccountId, {
        filename: arquivo.arquivo,
        contentType: arquivo.mimeType,
        data: readCreativeBytes(arquivo),
        fileHash: arquivo.hash,
      });

      const agora = context.clock().toISOString();
      context.db.creatives.insert({
        id: newId('cre', context.clock()),
        client_id: client.config.id,
        campaign_id: null,
        kind: 'video',
        file_path: arquivo.caminhoRelativo,
        file_hash: arquivo.hash,
        file_bytes: arquivo.bytes,
        mime_type: arquivo.mimeType,
        width: null,
        height: null,
        meta_image_hash: null,
        meta_video_id: enviado.id,
        meta_creative_id: null,
        copy_json: null,
        spec_json: null,
        idempotency_key: `upload:video:${client.config.id}:${arquivo.hash}`,
        created_at: agora,
        updated_at: agora,
      });

      return {
        videoId: enviado.id,
        simulado: enviado.simulado,
        arquivo: arquivo.arquivo,
        observacao:
          'Video recem-enviado fica em processamento na Meta por alguns minutos antes de poder virar anuncio.',
      };
    },
  });

  const criarPipeline = {
    name: 'meta_create_campaign_paused',
    title: 'Criar campanha PAUSADA (pipeline completo)',
    description:
      'Executa o pipeline oficial a partir do briefing: campanha -> conjunto -> upload -> criativo -> anuncio, tudo com status PAUSED, e confirma na Meta. Idempotente: reexecutar reaproveita o que ja existe.',
    category: 'criacao' as const,
    readOnly: false,
    inputSchema: {
      briefingPath: z.string().trim().min(1).describe('Caminho do briefing validado.'),
      confirmarDuplicidade: z
        .boolean()
        .default(false)
        .describe('Marque true apenas depois de o operador confirmar que a duplicidade e intencional.'),
    },
    async handler(args: { briefingPath: string; confirmarDuplicidade: boolean }, context: AgentContext) {
      const caminho = resolverBriefing(context, args.briefingPath);
      const resultado = await criarCampanha(context, caminho, {
        confirmarDuplicidade: args.confirmarDuplicidade,
      });

      const confirmacao = resultado.criacao.sucesso
        ? await confirmarNaMeta(context, resultado.campaignId)
        : null;

      return {
        campaignId: resultado.campaignId,
        sucesso: resultado.criacao.sucesso,
        simulado: resultado.criacao.simulado,
        statusInicial: 'PAUSED',
        idsNaMeta: resultado.criacao.metaIds,
        passos: resultado.criacao.passos,
        falha: resultado.criacao.falha,
        confirmacaoNaMeta: confirmacao,
        proximoPasso: resultado.criacao.sucesso
          ? 'Chame meta_request_campaign_approval e apresente a previa ao operador. Sem aprovacao, nao ha ativacao.'
          : 'Corrija a causa da falha e rode a mesma ferramenta de novo: o que ja foi criado sera reaproveitado.',
      };
    },
  };

  registerTool(server, ctx, criarPipeline);

  registerTool(server, ctx, {
    name: 'meta_create_adset_paused',
    title: 'Criar conjunto PAUSADO',
    description:
      'Cria um conjunto avulso PAUSED em uma campanha ja existente. Use quando precisar acrescentar um conjunto fora do pipeline do briefing.',
    category: 'criacao',
    readOnly: false,
    inputSchema: {
      campaignId: campaignIdField,
      nome: z.string().trim().min(3).max(180),
      orcamentoDiarioCents: z.number().int().positive(),
      dataInicio: z.string().trim().min(4),
      dataEncerramento: z.string().trim().nullable().default(null),
    },
    async handler(args, context) {
      const row = getCampaignOrThrow(context, args.campaignId);
      const client = context.clients.loadActive(row.client_id);
      assertPodeCriar(context, row.client_id);

      if (!row.meta_campaign_id) {
        throw new PolicyViolationError(
          'global-policy',
          'campanha_inexistente_na_meta',
          'A campanha ainda nao existe na Meta. Rode meta_create_campaign_paused antes.',
        );
      }

      context.policyEngine.assertBudget(client, {
        currency: client.config.moeda,
        dailyBudgetCents: args.orcamentoDiarioCents,
        lifetimeBudgetCents: null,
        startTime: args.dataInicio,
        stopTime: args.dataEncerramento,
      });

      const modelo = JSON.parse(row.plan_json) as {
        conjuntos: Array<Record<string, unknown>>;
      };
      const base = modelo.conjuntos[0];
      if (!base) {
        throw new PolicyViolationError(
          'global-policy',
          'plano_sem_conjunto',
          'O plano salvo nao tem conjunto de referencia para clonar a configuracao.',
        );
      }

      const conjuntos = context.db.adsets.count({ campaign_id: row.id });
      context.policyEngine.evaluateStructure({
        adsets: conjuntos + 1,
        adsPerAdset: [1],
        totalAds: context.db.ads.count({ campaign_id: row.id }) + 1,
        campanhasCriadasHoje: 0,
      });

      const payload: Record<string, unknown> = {
        name: args.nome,
        campaign_id: row.meta_campaign_id,
        status: 'PAUSED',
        optimization_goal: base.optimization_goal,
        billing_event: base.billing_event,
        destination_type: base.destination_type,
        bid_strategy: base.bid_strategy,
        daily_budget: args.orcamentoDiarioCents,
        start_time: args.dataInicio,
        targeting: JSON.stringify(base.targeting),
        promoted_object: JSON.stringify(base.promoted_object),
      };
      if (args.dataEncerramento) payload.end_time = args.dataEncerramento;

      const criado = await context.meta.createAdSet(row.ad_account_id, payload);
      const agora = context.clock().toISOString();

      context.db.adsets.insert({
        id: newId('adset', context.clock()),
        campaign_id: row.id,
        name: args.nome,
        meta_adset_id: criado.id,
        meta_status: 'PAUSED',
        optimization_goal: String(base.optimization_goal),
        billing_event: String(base.billing_event),
        destination_type: String(base.destination_type ?? ''),
        daily_budget_cents: args.orcamentoDiarioCents,
        lifetime_budget_cents: null,
        targeting_json: JSON.stringify(base.targeting),
        promoted_object_json: JSON.stringify(base.promoted_object),
        spec_json: JSON.stringify(payload),
        idempotency_key: `adset:avulso:${row.id}:${args.nome}`,
        created_at: agora,
        updated_at: agora,
      });

      return { adsetId: criado.id, simulado: criado.simulado, status: 'PAUSED' };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_create_creative',
    title: 'Criar criativo',
    description:
      'Cria um AdCreative a partir de um ativo ja enviado (image_hash ou video_id) e das copies. Nao cria anuncio.',
    category: 'criacao',
    readOnly: false,
    inputSchema: {
      clientId: clientIdField,
      adAccountId: adAccountField,
      nome: z.string().trim().min(3).max(180),
      imageHash: z.string().trim().nullable().default(null),
      videoId: z.string().trim().nullable().default(null),
      titulo: z.string().trim().min(1).max(255),
      descricao: z.string().trim().min(1).max(255),
      texto: z.string().trim().min(1).max(2200),
      link: z.string().trim().url(),
      callToAction: z.string().trim().min(2),
    },
    async handler(args, context) {
      assertPodeCriar(context, args.clientId);
      const client = context.clients.loadActive(args.clientId);
      const adAccountId = assertAdAccountAllowed(client, args.adAccountId);

      if (!args.imageHash && !args.videoId) {
        throw new PolicyViolationError(
          'global-policy',
          'ativo_ausente',
          'Informe imageHash ou videoId. Envie o arquivo com meta_upload_image / meta_upload_video antes.',
        );
      }

      const dados: Record<string, unknown> = {
        message: args.texto,
        name: args.titulo,
        description: args.descricao,
        link: args.link,
        call_to_action: { type: args.callToAction, value: { link: args.link } },
      };
      if (args.imageHash) dados.image_hash = args.imageHash;
      if (args.videoId) dados.video_id = args.videoId;

      const storySpec: Record<string, unknown> = {
        page_id: client.config.meta.pageId,
        ...(args.videoId ? { video_data: dados } : { link_data: dados }),
      };
      if (client.config.meta.instagramId) {
        storySpec.instagram_user_id = client.config.meta.instagramId;
      }

      const criado = await context.meta.createAdCreative(adAccountId, {
        name: args.nome,
        object_story_spec: JSON.stringify(storySpec),
      });

      return { creativeId: criado.id, simulado: criado.simulado };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_create_ad_paused',
    title: 'Criar anuncio PAUSADO',
    description: 'Cria um anuncio PAUSED ligando um conjunto a um criativo ja existentes.',
    category: 'criacao',
    readOnly: false,
    inputSchema: {
      clientId: clientIdField,
      adAccountId: adAccountField,
      nome: z.string().trim().min(3).max(180),
      metaAdsetId: z.string().trim().min(1),
      metaCreativeId: z.string().trim().min(1),
    },
    async handler(args, context) {
      assertPodeCriar(context, args.clientId);
      const client = context.clients.loadActive(args.clientId);
      const adAccountId = assertAdAccountAllowed(client, args.adAccountId);

      const criado = await context.meta.createAd(adAccountId, {
        name: args.nome,
        adset_id: args.metaAdsetId,
        creative: JSON.stringify({ creative_id: args.metaCreativeId }),
        status: 'PAUSED',
      });

      return { adId: criado.id, simulado: criado.simulado, status: 'PAUSED' };
    },
  });
}
