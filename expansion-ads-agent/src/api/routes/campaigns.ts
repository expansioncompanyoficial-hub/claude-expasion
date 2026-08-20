import { z } from 'zod';
import type { ApiContexto } from '../contexto.js';
import { HttpError, type Rota } from '../http.js';
import {
  briefFormSchema,
  gravarBriefing,
  validarFormulario,
} from '../../campaigns/brief-composer.js';
import {
  ativarCampanha,
  confirmarNaMeta,
  criarCampanha,
  executarDryRun,
  pausarCampanha,
  validarBriefing,
} from '../../campaigns/service.js';
import { STATE_LABELS, type CampaignState } from '../../campaigns/state-machine.js';
import { createContext } from '../../context.js';
import {
  registrarAprovacao,
  solicitarAprovacao,
  verificarAprovacao,
} from '../../approvals/service.js';

function estadoLegivel(estado: string): string {
  return STATE_LABELS[estado as CampaignState] ?? estado;
}

function linhaParaCampanha(linha: {
  id: string;
  client_id: string;
  internal_name: string;
  template: string;
  objective: string;
  state: string;
  meta_campaign_id: string | null;
  meta_status: string | null;
  daily_budget_cents: number | null;
  lifetime_budget_cents: number | null;
  currency: string;
  start_time: string | null;
  stop_time: string | null;
  dry_run: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}) {
  return {
    id: linha.id,
    cliente: linha.client_id,
    nome: linha.internal_name,
    modelo: linha.template,
    objetivo: linha.objective,
    estado: linha.state,
    estadoLegivel: estadoLegivel(linha.state),
    metaCampaignId: linha.meta_campaign_id,
    metaStatus: linha.meta_status,
    orcamentoDiarioCents: linha.daily_budget_cents,
    orcamentoTotalCents: linha.lifetime_budget_cents,
    moeda: linha.currency,
    inicio: linha.start_time,
    fim: linha.stop_time,
    dryRun: linha.dry_run === 1,
    ultimoErro: linha.last_error,
    criadaEm: linha.created_at,
    atualizadaEm: linha.updated_at,
  };
}

export function rotasCampaigns(api: ApiContexto): Rota[] {
  const { agent } = api;

  /**
   * Criacao real precisa de contexto FORA do dry-run. Em vez de mexer no
   * AgentContext global (que serve a leitura o tempo todo), monta-se um
   * contexto proprio, explicito, so para esta requisicao.
   */
  const contextoDeEscrita = (actor: string) =>
    createContext({
      config: agent.config,
      db: agent.db,
      dryRunOverride: false,
      logStream: 'stderr',
      actor,
      actorKind: 'human',
    });

  return [
    {
      metodo: 'GET',
      caminho: '/api/campaigns',
      papel: 'visualizador',
      handler: (req) => {
        const filtros: Record<string, string> = {};
        const cliente = req.query.get('cliente');
        const estado = req.query.get('estado');
        if (cliente) filtros.client_id = cliente;
        if (estado) filtros.state = estado;

        const linhas = agent.db.campaigns.findMany(filtros, {
          orderBy: 'created_at DESC',
          limit: 200,
        });
        return { status: 200, corpo: { ok: true, campanhas: linhas.map(linhaParaCampanha) } };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/campaigns/:id',
      papel: 'visualizador',
      handler: (req) => {
        const linha = agent.db.campaigns.findById(req.params.id!);
        if (!linha) throw new HttpError(404, 'CAMPANHA_NAO_ENCONTRADA', 'Campanha nao encontrada.');

        const conjuntos = agent.db.adsets.findMany({ campaign_id: linha.id });
        const anuncios = agent.db.ads.findMany({ campaign_id: linha.id });
        const criativos = agent.db.creatives.findMany({ campaign_id: linha.id });
        const aprovacoes = agent.db.approvals.findMany(
          { campaign_id: linha.id },
          { orderBy: 'approved_at DESC' },
        );
        const logs = agent.db.actionLogs.findMany(
          { campaign_id: linha.id },
          { orderBy: 'ts DESC', limit: 100 },
        );

        return {
          status: 200,
          corpo: {
            ok: true,
            campanha: linhaParaCampanha(linha),
            plano: JSON.parse(linha.plan_json) as unknown,
            conjuntos: conjuntos.map((c) => ({
              id: c.id,
              nome: c.name,
              metaId: c.meta_adset_id,
              metaStatus: c.meta_status,
              optimizationGoal: c.optimization_goal,
              destino: c.destination_type,
              orcamentoDiarioCents: c.daily_budget_cents,
            })),
            anuncios: anuncios.map((a) => ({
              id: a.id,
              nome: a.name,
              metaId: a.meta_ad_id,
              metaStatus: a.meta_status,
              conjunto: a.adset_id,
              criativo: a.creative_id,
            })),
            criativos: criativos.map((c) => ({
              id: c.id,
              arquivo: c.file_path,
              tipo: c.kind,
              hash: c.file_hash,
              metaImageHash: c.meta_image_hash,
              metaVideoId: c.meta_video_id,
              metaCreativeId: c.meta_creative_id,
              copy: c.copy_json ? (JSON.parse(c.copy_json) as unknown) : null,
            })),
            aprovacoes: aprovacoes.map((a) => ({
              id: a.id,
              status: a.status,
              por: a.approved_by,
              em: a.approved_at,
              expiraEm: a.expires_at,
              orcamentoCents: a.approved_budget_cents,
              consumidaEm: a.consumed_at,
              revogadaEm: a.revoked_at,
            })),
            auditoria: logs.map((l) => ({
              id: l.id,
              ts: l.ts,
              ator: l.actor,
              ferramenta: l.tool,
              resultado: l.outcome,
              estadoAntes: l.state_before,
              estadoDepois: l.state_after,
              dryRun: l.dry_run === 1,
            })),
          },
        };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns/validate',
      papel: 'operador',
      handler: async (req) => {
        const form = briefFormSchema.parse(req.corpo);
        const cliente = agent.clients.loadActive(form.cliente);
        // Valida pelo caminho canonico, sem gravar arquivo nenhum.
        validarFormulario(form, cliente.config.moeda);

        const { caminho } = gravarBriefing(form, api.draftsDir, agent.clock());
        const { resultado } = await validarBriefing(agent, caminho, { consultarMeta: true });

        return {
          status: 200,
          corpo: {
            ok: resultado.bloqueios.length === 0,
            briefing: caminho,
            bloqueios: resultado.bloqueios,
            avisos: resultado.avisos,
            duplicidades: resultado.duplicidades,
            plano: resultado.plano,
            resumo: resultado.resumo,
          },
        };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns/dry-run',
      papel: 'operador',
      handler: async (req) => {
        const form = briefFormSchema.parse(req.corpo);
        const cliente = agent.clients.loadActive(form.cliente);
        validarFormulario(form, cliente.config.moeda);
        const { caminho } = gravarBriefing(form, api.draftsDir, agent.clock());

        const resultado = await executarDryRun(agent, caminho);
        return {
          status: 200,
          corpo: {
            ok: true,
            briefing: caminho,
            campaignId: resultado.campaignId,
            validacao: resultado.validacao,
            criacaoSimulada: resultado.criacaoSimulada,
            chamadas: resultado.chamadas,
            arquivoPlano: resultado.arquivoPlano,
          },
        };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns',
      papel: 'operador',
      handler: async (req) => {
        const corpo = z
          .object({
            form: briefFormSchema,
            confirmarDuplicidade: z.boolean().default(false),
            confirmacao: z.literal(true, {
              errorMap: () => ({
                message: 'A criacao exige confirmacao consciente do operador.',
              }),
            }),
          })
          .parse(req.corpo);

        const cliente = agent.clients.loadActive(corpo.form.cliente);
        if (cliente.isExample) {
          throw new HttpError(
            422,
            'CLIENTE_DE_EXEMPLO',
            `A cliente "${cliente.config.id}" veio de config.example.json e nao pode criar campanha real.`,
          );
        }

        validarFormulario(corpo.form, cliente.config.moeda);
        const { caminho } = gravarBriefing(corpo.form, api.draftsDir, agent.clock());

        const escrita = contextoDeEscrita(req.sessao!.email);
        try {
          const resultado = await criarCampanha(escrita, caminho, {
            confirmarDuplicidade: corpo.confirmarDuplicidade,
          });
          const confirmacao = await confirmarNaMeta(escrita, resultado.campaignId);
          return {
            status: 201,
            corpo: {
              ok: true,
              campaignId: resultado.campaignId,
              criacao: resultado.criacao,
              confirmacao,
            },
          };
        } finally {
          escrita.close();
        }
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns/:id/refresh',
      papel: 'visualizador',
      handler: async (req) => {
        const confirmacao = await confirmarNaMeta(agent, req.params.id!);
        return { status: 200, corpo: { ok: true, confirmacao } };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns/:id/request-approval',
      papel: 'operador',
      handler: (req) => {
        const resultado = solicitarAprovacao(agent, req.params.id!);
        return { status: 200, corpo: { ok: true, solicitacao: resultado } };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns/:id/approve',
      papel: 'gestor',
      handler: (req) => {
        const corpo = z
          .object({
            resumo: z.string().trim().min(1).optional(),
            horas: z.number().int().positive().optional(),
          })
          .parse(req.corpo ?? {});

        const aprovacao = registrarAprovacao(agent, {
          campaignId: req.params.id!,
          approvedBy: `${req.sessao!.nome} <${req.sessao!.email}>`,
          ...(corpo.resumo ? { observacao: corpo.resumo } : {}),
          ...(corpo.horas ? { ttlHours: corpo.horas } : {}),
        });

        return {
          status: 200,
          corpo: {
            ok: true,
            aprovacao: {
              id: aprovacao.id,
              codigo: aprovacao.approval_token,
              expiraEm: aprovacao.expires_at,
              orcamentoCents: aprovacao.approved_budget_cents,
              por: aprovacao.approved_by,
            },
          },
        };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/campaigns/:id/approval-check',
      papel: 'visualizador',
      handler: (req) => {
        const check = verificarAprovacao(agent, req.params.id!);
        return { status: 200, corpo: { ok: check.ok, problemas: check.problemas } };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns/:id/activate',
      papel: 'gestor',
      handler: async (req) => {
        const corpo = z
          .object({
            codigo: z.string().trim().min(1, 'Informe o codigo da aprovacao.'),
            confirmacaoDeCobranca: z.literal(true, {
              errorMap: () => ({
                message:
                  'A ativacao exige confirmacao explicita de que a campanha podera gerar cobranca real.',
              }),
            }),
          })
          .parse(req.corpo);

        const escrita = contextoDeEscrita(req.sessao!.email);
        try {
          const resultado = await ativarCampanha(escrita, req.params.id!, corpo.codigo);
          return { status: 200, corpo: { ok: true, ativacao: resultado } };
        } finally {
          escrita.close();
        }
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/campaigns/:id/pause',
      papel: 'gestor',
      handler: async (req) => {
        const corpo = z.object({ motivo: z.string().trim().min(3) }).parse(req.corpo);
        const escrita = contextoDeEscrita(req.sessao!.email);
        try {
          const resultado = await pausarCampanha(escrita, req.params.id!, corpo.motivo);
          return { status: 200, corpo: { ok: true, pausa: resultado } };
        } finally {
          escrita.close();
        }
      },
    },
  ];
}
