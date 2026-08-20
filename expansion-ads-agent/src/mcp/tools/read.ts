import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AgentContext } from '../../context.js';
import { assertAdAccountAllowed } from '../../security/allowlist.js';
import { describeConfig } from '../../config/env.js';
import { fieldsForObjective, resolvePeriod, rowsToObjectInsights } from '../../reports/insights.js';
import { getCampaignOrThrow, snapshotCampanha } from '../../approvals/service.js';
import { STATE_LABELS, type CampaignState } from '../../campaigns/state-machine.js';
import { AD_EFFECTIVE_STATUSES_COM_PROBLEMA } from '../../meta/constants.js';
import { adAccountField, campaignIdField, clientIdField, registerTool } from '../helpers.js';

const aviso = (ctx: AgentContext): string | null =>
  ctx.meta.hasCredentials
    ? null
    : 'Sem META_ACCESS_TOKEN configurado: a leitura foi simulada e devolveu lista vazia. Configure o .env para consultar a conta real.';

export function registerReadTools(server: McpServer, ctx: AgentContext): void {
  registerTool(server, ctx, {
    name: 'meta_list_ad_accounts',
    title: 'Listar contas de anuncios',
    description:
      'Lista as contas de anuncios que o token enxerga e marca quais estao cadastradas no sistema. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: { limite: z.number().int().min(1).max(200).default(50) },
    async handler(args, context) {
      const contas = await context.meta.listAdAccounts(args.limite);
      const cadastradas = new Map(
        context.clients.list().map((client) => [client.config.meta.adAccountId, client.config.id]),
      );
      return {
        aviso: aviso(context),
        ambiente: describeConfig(context.config),
        contas: contas.map((conta) => ({
          ...conta,
          cadastradaPara: cadastradas.get(conta.id) ?? null,
          autorizada: cadastradas.has(conta.id),
        })),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_get_account_details',
    title: 'Detalhes da conta de anuncios',
    description:
      'Detalhes da conta de anuncios de uma cliente cadastrada: moeda, fuso, status, limite de gasto. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: { clientId: clientIdField, adAccountId: adAccountField },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      const adAccountId = assertAdAccountAllowed(client, args.adAccountId);
      const conta = await context.meta.getAdAccount(adAccountId);
      return {
        aviso: aviso(context),
        cadastro: {
          moeda: client.config.moeda,
          fusoHorario: client.config.fusoHorario,
          limiteDiarioCents: client.config.limites.diarioCents,
          limiteMensalCents: client.config.limites.mensalCents,
        },
        conta,
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_list_pages',
    title: 'Listar Paginas',
    description: 'Lista as Paginas do Facebook acessiveis pelo token. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: { limite: z.number().int().min(1).max(200).default(50) },
    async handler(args, context) {
      const paginas = await context.meta.listPages(args.limite);
      const cadastradas = new Set(
        context.clients.list().map((client) => client.config.meta.pageId),
      );
      return {
        aviso: aviso(context),
        paginas: paginas.map((pagina) => ({
          ...pagina,
          cadastrada: cadastradas.has(pagina.id),
        })),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_list_instagram_accounts',
    title: 'Listar contas do Instagram',
    description:
      'Lista as contas do Instagram vinculadas a Pagina cadastrada da cliente. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: { clientId: clientIdField },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      const contas = await context.meta.listInstagramAccounts(client.config.meta.pageId);
      return {
        aviso: aviso(context),
        paginaConsultada: client.config.meta.pageId,
        instagramCadastrado: client.config.meta.instagramId ?? null,
        contas,
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_list_pixels_or_datasets',
    title: 'Listar pixels e datasets',
    description:
      'Lista os pixels/datasets da conta de anuncios da cliente, com o horario do ultimo evento. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: { clientId: clientIdField },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      const pixels = await context.meta.listPixels(client.config.meta.adAccountId);
      const cadastrado = client.config.meta.pixelId ?? client.config.meta.datasetId ?? null;
      return {
        aviso: aviso(context),
        pixelCadastrado: cadastrado,
        pixels: pixels.map((pixel) => ({ ...pixel, cadastrado: pixel.id === cadastrado })),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_list_campaigns',
    title: 'Listar campanhas',
    description:
      'Lista campanhas da conta da cliente na Meta e cruza com o que o sistema tem no banco local. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: {
      clientId: clientIdField,
      apenasAtivas: z.boolean().default(false),
      limite: z.number().int().min(1).max(200).default(50),
    },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      const campanhas = await context.meta.listCampaigns(client.config.meta.adAccountId, {
        limit: args.limite,
        ...(args.apenasAtivas ? { effectiveStatus: ['ACTIVE'] } : {}),
      });
      const locais = new Map(
        context.db.campaigns
          .findMany({ client_id: client.config.id })
          .filter((row) => row.meta_campaign_id)
          .map((row) => [row.meta_campaign_id!, row]),
      );
      return {
        aviso: aviso(context),
        campanhas: campanhas.map((campanha) => {
          const local = locais.get(campanha.id);
          return {
            ...campanha,
            campanhaInterna: local?.id ?? null,
            estadoInterno: local?.state ?? null,
          };
        }),
        campanhasLocaisSemIdNaMeta: context.db.campaigns
          .findMany({ client_id: client.config.id })
          .filter((row) => !row.meta_campaign_id)
          .map((row) => ({ id: row.id, nome: row.internal_name, estado: row.state })),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_list_adsets',
    title: 'Listar conjuntos',
    description: 'Lista os conjuntos de uma campanha na Meta. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: {
      clientId: clientIdField,
      metaCampaignId: z.string().trim().min(1).describe('ID da campanha na Meta.'),
      limite: z.number().int().min(1).max(200).default(50),
    },
    async handler(args, context) {
      context.clients.loadActive(args.clientId);
      return { aviso: aviso(context), conjuntos: await context.meta.listAdSets(args.metaCampaignId, args.limite) };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_list_ads',
    title: 'Listar anuncios',
    description: 'Lista os anuncios de uma campanha ou conjunto na Meta. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: {
      clientId: clientIdField,
      metaParentId: z.string().trim().min(1).describe('ID da campanha ou do conjunto na Meta.'),
      limite: z.number().int().min(1).max(200).default(100),
    },
    async handler(args, context) {
      context.clients.loadActive(args.clientId);
      const anuncios = await context.meta.listAds(args.metaParentId, args.limite);
      return {
        aviso: aviso(context),
        anuncios,
        comProblema: anuncios
          .filter(
            (anuncio) =>
              (anuncio.issues_info?.length ?? 0) > 0 ||
              (anuncio.effective_status &&
                (AD_EFFECTIVE_STATUSES_COM_PROBLEMA as readonly string[]).includes(
                  anuncio.effective_status,
                )),
          )
          .map((anuncio) => ({
            id: anuncio.id,
            nome: anuncio.name ?? null,
            status: anuncio.effective_status ?? null,
            problemas: anuncio.issues_info?.map((issue) => issue.error_summary ?? issue.error_message) ?? [],
          })),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_get_campaign_preview',
    title: 'Previa completa da campanha',
    description:
      'Previa integral de uma campanha do banco local: plano, estrutura, IDs na Meta, criativos, copies e estado. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: { campaignId: campaignIdField },
    async handler(args, context) {
      const row = getCampaignOrThrow(context, args.campaignId);
      const snapshot = snapshotCampanha(context, row);
      const plano = JSON.parse(row.plan_json) as Record<string, unknown>;
      const criativos = context.db.creatives.findMany({ campaign_id: row.id });
      const aprovacoes = context.db.approvals.findMany(
        { campaign_id: row.id },
        { orderBy: 'approved_at DESC', limit: 5 },
      );

      return {
        campanha: {
          id: row.id,
          nome: row.internal_name,
          cliente: row.client_id,
          conta: row.ad_account_id,
          modelo: row.template,
          objetivo: row.objective,
          estado: row.state,
          estadoLegivel: STATE_LABELS[row.state as CampaignState],
          statusNaMeta: row.meta_status,
          metaCampaignId: row.meta_campaign_id,
          orcamentoDiarioCents: row.daily_budget_cents,
          orcamentoTotalCents: row.lifetime_budget_cents,
          moeda: row.currency,
          inicio: row.start_time,
          fim: row.stop_time,
          dryRun: row.dry_run === 1,
          ultimoErro: row.last_error ? JSON.parse(row.last_error) : null,
        },
        plano,
        idsNaMeta: {
          campanha: row.meta_campaign_id,
          conjuntos: snapshot.adsetMetaIds,
          criativos: snapshot.creativeMetaIds,
          anuncios: snapshot.adMetaIds,
        },
        criativos: criativos.map((criativo) => ({
          arquivo: criativo.file_path,
          tipo: criativo.kind,
          hash: criativo.file_hash,
          dimensoes: criativo.width && criativo.height ? `${criativo.width}x${criativo.height}` : null,
          metaImageHash: criativo.meta_image_hash,
          metaVideoId: criativo.meta_video_id,
          metaCreativeId: criativo.meta_creative_id,
          copy: criativo.copy_json ? JSON.parse(criativo.copy_json) : null,
        })),
        aprovacoes: aprovacoes.map((aprovacao) => ({
          id: aprovacao.id,
          status: aprovacao.status,
          aprovadoPor: aprovacao.approved_by,
          aprovadoEm: aprovacao.approved_at,
          venceEm: aprovacao.expires_at,
          orcamentoAprovadoCents: aprovacao.approved_budget_cents,
        })),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_get_insights',
    title: 'Consultar desempenho',
    description:
      'Consulta a Ads Insights API e devolve metricas normalizadas. Metrica que a Meta nao retorna vem como null e aparece em "indisponiveis" — ausencia nao e zero.',
    category: 'leitura',
    readOnly: true,
    inputSchema: {
      clientId: clientIdField,
      objetoId: z
        .string()
        .trim()
        .min(1)
        .describe('ID na Meta do objeto a consultar (conta act_..., campanha, conjunto ou anuncio).'),
      nivel: z.enum(['account', 'campaign', 'adset', 'ad']).default('campaign'),
      periodo: z
        .string()
        .trim()
        .default('last-7-days')
        .describe('today, yesterday, last-7-days, last-30-days, this-month, last-month, maximum...'),
      objetivo: z
        .string()
        .trim()
        .default('OUTCOME_LEADS')
        .describe('Objetivo da campanha — define quais campos de insights fazem sentido pedir.'),
    },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      if (args.objetoId.startsWith('act_')) {
        assertAdAccountAllowed(client, args.objetoId);
      }
      const datePreset = resolvePeriod(args.periodo);
      const campos = fieldsForObjective(args.objetivo, args.nivel);
      const linhas = await context.meta.getInsights(args.objetoId, {
        level: args.nivel,
        datePreset,
        fields: campos,
      });
      return {
        aviso: aviso(context),
        periodo: datePreset,
        moeda: client.config.moeda,
        camposPedidos: campos,
        resultados: rowsToObjectInsights(linhas, args.nivel, args.objetoId),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_check_campaign_status',
    title: 'Conferir status na Meta',
    description:
      'Consulta a Meta e compara com o banco local: confere se tudo esta PAUSED, se a contagem de objetos bate e lista anuncios com erro. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: { campaignId: campaignIdField },
    async handler(args, context) {
      const row = getCampaignOrThrow(context, args.campaignId);

      if (!row.meta_campaign_id) {
        return {
          campanha: row.id,
          estadoInterno: row.state,
          statusNaMeta: null,
          observacao: 'A campanha ainda nao existe na Meta. Nenhum objeto foi criado de verdade.',
        };
      }
      if (!context.meta.hasCredentials) {
        return {
          campanha: row.id,
          estadoInterno: row.state,
          statusNaMeta: null,
          observacao: aviso(context),
        };
      }

      const campanha = await context.meta.getCampaign(row.meta_campaign_id);
      const conjuntos = await context.meta.listAdSets(row.meta_campaign_id);
      const anuncios = await context.meta.listAds(row.meta_campaign_id);

      const divergencias: string[] = [];
      const esperadoConjuntos = context.db.adsets.count({ campaign_id: row.id });
      const esperadoAnuncios = context.db.ads.count({ campaign_id: row.id });
      if (conjuntos.length !== esperadoConjuntos) {
        divergencias.push(`Meta: ${conjuntos.length} conjunto(s); banco: ${esperadoConjuntos}.`);
      }
      if (anuncios.length !== esperadoAnuncios) {
        divergencias.push(`Meta: ${anuncios.length} anuncio(s); banco: ${esperadoAnuncios}.`);
      }

      return {
        campanha: row.id,
        estadoInterno: row.state,
        statusNaMeta: campanha?.status ?? campanha?.effective_status ?? null,
        tudoPausado:
          campanha?.status === 'PAUSED' &&
          conjuntos.every((conjunto) => conjunto.status === 'PAUSED') &&
          anuncios.every((anuncio) => anuncio.status === 'PAUSED'),
        conjuntos: conjuntos.map((conjunto) => ({
          id: conjunto.id,
          nome: conjunto.name ?? null,
          status: conjunto.status ?? null,
        })),
        anuncios: anuncios.map((anuncio) => ({
          id: anuncio.id,
          nome: anuncio.name ?? null,
          status: anuncio.status ?? null,
          statusEfetivo: anuncio.effective_status ?? null,
          problemas: anuncio.issues_info?.map((issue) => issue.error_summary ?? issue.error_message) ?? [],
        })),
        divergencias,
      };
    },
  });
}
