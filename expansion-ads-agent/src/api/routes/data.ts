import { z } from 'zod';
import type { ApiContexto } from '../contexto.js';
import { HttpError, type Rota } from '../http.js';
import {
  fieldsForObjective,
  metricaPrincipal,
  resolvePeriod,
  rowsToObjectInsights,
} from '../../reports/insights.js';
import { OptimizationEngine } from '../../optimization/engine.js';
import { briefFormSchema } from '../../campaigns/brief-composer.js';

export function rotasData(api: ApiContexto): Rota[] {
  const { agent } = api;

  /**
   * Insights de uma cliente. Sem credencial, devolve lista vazia com o motivo
   * explicito — nunca numero inventado para preencher a tela.
   */
  const insightsDaCliente = async (clienteId: string, periodo: string, nivel: string) => {
    const cliente = agent.clients.load(clienteId);
    if (!agent.config.meta.hasCredentials) {
      return {
        disponivel: false,
        motivo: 'Sem META_ACCESS_TOKEN configurado no servidor: metricas da Meta indisponiveis.',
        linhas: [],
      };
    }

    const campanhas = agent.db.campaigns.findMany({ client_id: clienteId });
    const objetivo = campanhas[0]?.objective ?? 'OUTCOME_LEADS';
    const nivelValido = (['account', 'campaign', 'adset', 'ad'] as const).includes(
      nivel as 'account',
    )
      ? (nivel as 'account' | 'campaign' | 'adset' | 'ad')
      : 'campaign';

    try {
      const linhas = await agent.meta.getInsights(cliente.config.meta.adAccountId, {
        level: nivelValido,
        datePreset: resolvePeriod(periodo),
        fields: fieldsForObjective(objetivo, nivelValido),
      });
      return {
        disponivel: true,
        motivo: null,
        linhas: rowsToObjectInsights(linhas, nivelValido, cliente.config.meta.adAccountId),
      };
    } catch (erro) {
      return {
        disponivel: false,
        motivo: `A Meta recusou a consulta: ${(erro as Error).message}`,
        linhas: [],
      };
    }
  };

  return [
    {
      metodo: 'GET',
      caminho: '/api/insights',
      papel: 'visualizador',
      handler: async (req) => {
        const cliente = req.query.get('cliente');
        if (!cliente) throw new HttpError(422, 'CLIENTE_OBRIGATORIO', 'Informe a cliente.');
        const resultado = await insightsDaCliente(
          cliente,
          req.query.get('periodo') ?? 'last-7-days',
          req.query.get('nivel') ?? 'campaign',
        );
        return { status: 200, corpo: { ok: true, ...resultado } };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/overview',
      papel: 'visualizador',
      handler: async (req) => {
        const clienteFiltro = req.query.get('cliente');
        const periodo = req.query.get('periodo') ?? 'last-7-days';

        const clientes = agent.clients.list();
        const alvo = clienteFiltro
          ? clientes.filter((c) => c.config.id === clienteFiltro)
          : clientes;

        const campanhas = clienteFiltro
          ? agent.db.campaigns.findMany({ client_id: clienteFiltro })
          : agent.db.campaigns.findMany();

        const porEstado = campanhas.reduce<Record<string, number>>((acc, c) => {
          acc[c.state] = (acc[c.state] ?? 0) + 1;
          return acc;
        }, {});

        const aguardandoAprovacao = campanhas.filter((c) => c.state === 'WAITING_APPROVAL');
        const comErro = campanhas.filter((c) =>
          ['VALIDATION_FAILED', 'CREATION_FAILED', 'ACTIVATION_FAILED'].includes(c.state),
        );

        // Metricas so quando ha credencial. Caso contrario a tela mostra o
        // motivo, e nao um zero que parece resultado.
        const porCliente = await Promise.all(
          alvo.map(async (c) => {
            const dados = await insightsDaCliente(c.config.id, periodo, 'account');
            const linha = dados.linhas[0] ?? null;
            return {
              cliente: c.config.id,
              nome: c.config.nome,
              moeda: c.config.moeda,
              disponivel: dados.disponivel,
              motivo: dados.motivo,
              metricas: linha,
            };
          }),
        );

        const recomendacoes = agent.db.recommendations.findMany(
          clienteFiltro ? { client_id: clienteFiltro, applied: 0 } : { applied: 0 },
          { orderBy: 'created_at DESC', limit: 20 },
        );

        const logs = agent.db.actionLogs.findMany(
          clienteFiltro ? { client_id: clienteFiltro } : {},
          { orderBy: 'ts DESC', limit: 15 },
        );

        return {
          status: 200,
          corpo: {
            ok: true,
            periodo,
            credencialConfigurada: agent.config.meta.hasCredentials,
            dryRun: agent.config.dryRun,
            campanhas: {
              total: campanhas.length,
              porEstado,
              ativas: porEstado.ACTIVE ?? 0,
              pausadas: (porEstado.PAUSED ?? 0) + (porEstado.CREATED_PAUSED ?? 0),
              comErro: comErro.length,
            },
            aguardandoAprovacao: aguardandoAprovacao.map((c) => ({
              id: c.id,
              nome: c.internal_name,
              cliente: c.client_id,
              orcamentoCents: c.daily_budget_cents,
              moeda: c.currency,
            })),
            emAtencao: comErro.map((c) => ({
              id: c.id,
              nome: c.internal_name,
              cliente: c.client_id,
              estado: c.state,
              erro: c.last_error,
            })),
            porCliente,
            recomendacoes: recomendacoes.map((r) => ({
              id: r.id,
              cliente: r.client_id,
              campanha: r.campaign_id,
              acao: r.action,
              confianca: r.confidence,
              criadaEm: r.created_at,
            })),
            ultimasAcoes: logs.map((l) => ({
              id: l.id,
              ts: l.ts,
              ator: l.actor,
              ferramenta: l.tool,
              cliente: l.client_id,
              resultado: l.outcome,
              dryRun: l.dry_run === 1,
            })),
          },
        };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/recommendations',
      papel: 'visualizador',
      handler: (req) => {
        const cliente = req.query.get('cliente');
        const linhas = agent.db.recommendations.findMany(cliente ? { client_id: cliente } : {}, {
          orderBy: 'created_at DESC',
          limit: 100,
        });
        return {
          status: 200,
          corpo: {
            ok: true,
            automacaoLigada: agent.config.automation,
            recomendacoes: linhas.map((r) => ({
              id: r.id,
              cliente: r.client_id,
              campanha: r.campaign_id,
              objetoTipo: r.meta_object_type,
              objetoId: r.meta_object_id,
              acao: r.action,
              confianca: r.confidence,
              justificativa: JSON.parse(r.rationale_json) as unknown,
              bloqueadoPor: r.blocked_by_json ? (JSON.parse(r.blocked_by_json) as unknown) : null,
              aplicada: r.applied === 1,
              criadaEm: r.created_at,
            })),
          },
        };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/recommendations/generate',
      papel: 'operador',
      handler: async (req) => {
        const corpo = z
          .object({
            cliente: z.string().trim().min(1),
            periodo: z.string().trim().default('last-7-days'),
          })
          .parse(req.corpo);

        const cliente = agent.clients.load(corpo.cliente);
        const dados = await insightsDaCliente(corpo.cliente, corpo.periodo, 'campaign');
        if (!dados.disponivel) {
          throw new HttpError(503, 'SEM_DADOS', dados.motivo ?? 'Metricas indisponiveis.', {
            cliente: corpo.cliente,
          });
        }

        const motor = new OptimizationEngine(agent.policies.optimization, {
          autoPauseEnabled: agent.config.automation.autoPauseEnabled,
          autoScaleEnabled: agent.config.automation.autoScaleEnabled,
          autoReactivateEnabled: agent.config.automation.autoReactivateEnabled,
        });

        const campanhas = agent.db.campaigns.findMany({ client_id: corpo.cliente });
        const geradas = dados.linhas.map((linha) => {
          const campanha = campanhas.find((c) => c.meta_campaign_id === linha.objetoId);
          const objetivo = campanha?.objective ?? 'OUTCOME_LEADS';
          // A meta vem do cadastro da cliente, na ordem em que faz sentido
          // para o objetivo: ROAS para venda, CPL para lead, CPA como geral.
          const metas = cliente.config.metas ?? null;
          const metaTipo = metas?.roas
            ? 'ROAS'
            : metas?.cplCents
              ? 'CPL'
              : metas?.cpaCents
                ? 'CPA'
                : null;
          const metaValor =
            metaTipo === 'ROAS'
              ? (metas?.roas ?? null)
              : metaTipo === 'CPL'
                ? (metas?.cplCents ?? null)
                : metaTipo === 'CPA'
                  ? (metas?.cpaCents ?? null)
                  : null;

          return motor.avaliar({
            objetoId: linha.objetoId,
            objetoTipo: 'campaign',
            objetivo,
            metrics: linha,
            moeda: cliente.config.moeda,
            metaTipo,
            metaValor,
            orcamentoDiarioAtualCents: campanha?.daily_budget_cents ?? null,
            horasDesdeAtivacao: 72,
            alteracoesNasUltimas24h: 0,
            ultimaAlteracaoIso: null,
          });
        });

        return { status: 200, corpo: { ok: true, recomendacoes: geradas } };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/audit',
      papel: 'gestor',
      handler: (req) => {
        const filtros: Record<string, string> = {};
        const cliente = req.query.get('cliente');
        const campanha = req.query.get('campanha');
        const ferramenta = req.query.get('ferramenta');
        if (cliente) filtros.client_id = cliente;
        if (campanha) filtros.campaign_id = campanha;
        if (ferramenta) filtros.tool = ferramenta;

        const limite = Math.min(Number(req.query.get('limite') ?? 200), 500);
        const linhas = agent.db.actionLogs.findMany(filtros, { orderBy: 'ts DESC', limit: limite });

        return {
          status: 200,
          corpo: {
            ok: true,
            registros: linhas.map((l) => ({
              id: l.id,
              ts: l.ts,
              ator: l.actor,
              tipoAtor: l.actor_kind,
              ferramenta: l.tool,
              cliente: l.client_id,
              conta: l.ad_account_id,
              campanha: l.campaign_id,
              // params_json ja passou por redact() ao ser gravado.
              parametros: l.params_json ? (JSON.parse(l.params_json) as unknown) : null,
              resultado: l.outcome,
              idsCriados: l.created_ids_json ? (JSON.parse(l.created_ids_json) as unknown) : null,
              erro: l.error_json ? (JSON.parse(l.error_json) as unknown) : null,
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
      caminho: '/api/advisor/strategy',
      papel: 'operador',
      handler: (req) => {
        const corpo = z
          .object({
            form: briefFormSchema.partial().required({ cliente: true, modelo: true }),
            remarketing: z.boolean().default(false),
          })
          .parse(req.corpo);

        const cliente = agent.clients.load(corpo.form.cliente!);
        const conselho = api.advisor.strategy({
          client: cliente,
          modelo: corpo.form.modelo!,
          objetivo: corpo.form.objetivo_comercial ?? '',
          destino: corpo.form.destino ?? '',
          dailyBudgetCents: parseMoedaParaCents(corpo.form.orcamento_diario),
          lifetimeBudgetCents: parseMoedaParaCents(corpo.form.orcamento_total),
          startTime: corpo.form.data_inicio ?? null,
          stopTime: corpo.form.data_encerramento ?? null,
          criativos: corpo.form.criativos?.length ?? 0,
          publicoDescrito: corpo.form.publico ?? '',
          remarketing: corpo.remarketing,
          temProva: (corpo.form.provas?.length ?? 0) > 0,
        });
        return { status: 200, corpo: { ok: true, conselho } };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/advisor/audience',
      papel: 'operador',
      handler: (req) => {
        const corpo = z
          .object({
            cliente: z.string().trim().min(1),
            faixaEtaria: z.string().trim().default('25-45'),
            generos: z.string().trim().default('todos'),
            interesses: z.array(z.string().trim()).default([]),
            regioes: z.array(z.string().trim()).default([]),
            remarketing: z.boolean().default(false),
          })
          .parse(req.corpo);

        const cliente = agent.clients.load(corpo.cliente);
        return {
          status: 200,
          corpo: { ok: true, conselho: api.advisor.audience({ client: cliente, ...corpo }) },
        };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/advisor/copy',
      papel: 'operador',
      handler: (req) => {
        const corpo = z
          .object({
            cliente: z.string().trim().min(1),
            modelo: z.string().trim().min(1),
            produto: z.string().trim().min(1),
            diferenciais: z.array(z.string().trim()).default([]),
            provas: z.array(z.string().trim()).default([]),
            criativos: z.array(z.string().trim()).default([]),
          })
          .parse(req.corpo);

        const cliente = agent.clients.load(corpo.cliente);
        return {
          status: 200,
          corpo: {
            ok: true,
            conselho: api.advisor.copy({ ...corpo, nomeCliente: cliente.config.nome }),
          },
        };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/metrics/principal',
      papel: 'visualizador',
      handler: (req) => {
        const objetivo = req.query.get('objetivo') ?? 'OUTCOME_LEADS';
        return { status: 200, corpo: { ok: true, metrica: metricaPrincipal(objetivo) } };
      },
    },
  ];
}

/** "R$ 50,00" -> 5000. Devolve null quando nao ha valor. */
function parseMoedaParaCents(valor: string | undefined): number | null {
  if (!valor) return null;
  const limpo = valor
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}\b)/g, '')
    .replace(',', '.');
  const numero = Number(limpo);
  return Number.isFinite(numero) ? Math.round(numero * 100) : null;
}
