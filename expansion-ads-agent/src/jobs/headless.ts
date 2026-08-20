#!/usr/bin/env node
import { createContext, type AgentContext } from '../context.js';
import { getConfig } from '../config/env.js';
import { auditarCampanha } from '../cli/commands/audit.js';
import { OptimizationEngine } from '../optimization/engine.js';
import {
  fieldsForObjective,
  resolvePeriod,
  rowsToObjectInsights,
} from '../reports/insights.js';
import { renderReport, saveReport } from '../reports/render.js';
import { newId } from '../shared/ids.js';
import { AppError, toAppError } from '../shared/errors.js';

/**
 * Modo headless — execucao programatica, sem operador na frente.
 *
 * Desligado por padrao (HEADLESS_ENABLED=false). Mesmo ligado, ele so faz o que
 * NAO exige julgamento: le briefings aprovados, consulta campanhas ativas, gera
 * relatorio e produz recomendacoes. Nunca ativa campanha, nunca aprova, nunca
 * mexe em orcamento — essas acoes exigem aprovacao humana pelo terminal.
 *
 * Este arquivo tambem e o ponto de integracao para o Claude Agent SDK ou para o
 * Claude Code em modo nao interativo: chame `runHeadless` de dentro do seu
 * runner e trate `JobSummary` como o resultado estruturado da execucao.
 */

export type HeadlessTask = 'briefings' | 'campanhas' | 'relatorio' | 'recomendacoes' | 'auditoria';

export const HEADLESS_TASKS: readonly HeadlessTask[] = [
  'briefings',
  'campanhas',
  'relatorio',
  'recomendacoes',
  'auditoria',
];

export interface JobSummary {
  readonly executadoEm: string;
  readonly habilitado: boolean;
  readonly dryRun: boolean;
  readonly tarefas: Record<string, unknown>;
  readonly avisos: string[];
}

export interface HeadlessOptions {
  readonly tarefas?: readonly HeadlessTask[];
  readonly clientes?: readonly string[];
  readonly periodo?: string;
  readonly trigger?: string;
  readonly ctx?: AgentContext;
}

export async function runHeadless(options: HeadlessOptions = {}): Promise<JobSummary> {
  const config = getConfig();
  const ctx =
    options.ctx ?? createContext({ config, logStream: 'stderr', actorKind: 'job', actor: 'headless' });
  const avisos: string[] = [];

  if (!config.automation.headlessEnabled) {
    return {
      executadoEm: ctx.clock().toISOString(),
      habilitado: false,
      dryRun: ctx.meta.dryRun,
      tarefas: {},
      avisos: [
        'Modo headless desativado. Ligue HEADLESS_ENABLED=true no .env para habilitar.',
        'Mesmo habilitado, o headless nao ativa campanha nem altera orcamento.',
      ],
    };
  }

  const jobId = ctx.audit.startJob('headless', options.trigger ?? 'manual');
  const tarefas = options.tarefas ?? HEADLESS_TASKS;
  const clientes = options.clientes ?? ctx.clients.listIds();
  const periodo = options.periodo ?? 'yesterday';
  const resultado: Record<string, unknown> = {};

  try {
    if (tarefas.includes('briefings')) {
      resultado.briefings = ctx.db.campaigns
        .findMany({ state: 'APPROVED' })
        .map((row) => ({ id: row.id, cliente: row.client_id, nome: row.internal_name }));
      if ((resultado.briefings as unknown[]).length > 0) {
        avisos.push(
          'Existem campanhas APROVADAS aguardando ativacao. A ativacao NAO e feita pelo headless: rode campaign:activate no terminal.',
        );
      }
    }

    if (tarefas.includes('campanhas')) {
      const ativas: unknown[] = [];
      for (const clienteId of clientes) {
        const client = ctx.clients.load(clienteId);
        if (client.config.status !== 'active') continue;
        const campanhas = await ctx.meta.listCampaigns(client.config.meta.adAccountId, {
          effectiveStatus: ['ACTIVE'],
          limit: 100,
        });
        ativas.push({ cliente: clienteId, quantidade: campanhas.length, campanhas });
      }
      resultado.campanhasAtivas = ativas;
    }

    if (tarefas.includes('relatorio')) {
      const gerados: string[] = [];
      for (const clienteId of clientes) {
        const client = ctx.clients.load(clienteId);
        if (client.config.status !== 'active') continue;

        const rows = await ctx.meta.getInsights(client.config.meta.adAccountId, {
          level: 'campaign',
          datePreset: resolvePeriod(periodo),
          fields: fieldsForObjective('OUTCOME_LEADS', 'campaign'),
        });
        const linhas = rowsToObjectInsights(rows, 'campaign', client.config.meta.adAccountId);

        const conteudo = renderReport({
          titulo: `Relatorio headless — ${client.config.nome}`,
          cliente: client.config.nome,
          conta: client.config.meta.adAccountId,
          periodo,
          moeda: client.config.moeda,
          geradoEm: ctx.clock().toISOString(),
          linhas,
        });

        gerados.push(
          saveReport(
            ctx.config.paths.reports,
            `${ctx.clock().toISOString().slice(0, 10)}-${clienteId}-headless.md`,
            conteudo,
          ),
        );
      }
      resultado.relatorios = gerados;
    }

    if (tarefas.includes('recomendacoes')) {
      const engine = new OptimizationEngine(ctx.policies.optimization, {
        autoPauseEnabled: config.automation.autoPauseEnabled,
        autoScaleEnabled: config.automation.autoScaleEnabled,
        autoReactivateEnabled: config.automation.autoReactivateEnabled,
      });
      const recomendacoes: unknown[] = [];

      for (const row of ctx.db.campaigns.findMany({ state: 'ACTIVE' })) {
        if (!row.meta_campaign_id) continue;
        const rows = await ctx.meta.getInsights(row.meta_campaign_id, {
          level: 'campaign',
          datePreset: resolvePeriod(periodo),
          fields: fieldsForObjective(row.objective, 'campaign'),
        });
        const metricas = rowsToObjectInsights(rows, 'campaign', row.meta_campaign_id);
        if (metricas.length === 0) continue;

        const brief = row.brief_id ? ctx.db.briefs.findById(row.brief_id) : null;
        const dados = brief
          ? (JSON.parse(brief.brief_json) as { metaTipo?: string; metaValor?: number })
          : null;

        const recomendacao = engine.avaliar({
          objetoId: row.meta_campaign_id,
          objetoTipo: 'campaign',
          objetivo: row.objective,
          metrics: metricas[0]!,
          moeda: row.currency,
          metaTipo: (dados?.metaTipo ?? null) as never,
          metaValor: dados?.metaValor ?? null,
          horasDesdeAtivacao:
            (ctx.clock().getTime() - new Date(row.updated_at).getTime()) / 3_600_000,
          orcamentoDiarioAtualCents: row.daily_budget_cents,
          alteracoesNasUltimas24h: 0,
          ultimaAlteracaoIso: null,
        });

        ctx.db.recommendations.insert({
          id: newId('reco', ctx.clock()),
          client_id: row.client_id,
          campaign_id: row.id,
          meta_object_type: 'campaign',
          meta_object_id: row.meta_campaign_id,
          action: recomendacao.acao,
          confidence: recomendacao.confianca,
          rationale_json: JSON.stringify(recomendacao.motivos),
          blocked_by_json: JSON.stringify(recomendacao.bloqueadoPor),
          applied: 0,
          applied_at: null,
          created_at: ctx.clock().toISOString(),
        });

        recomendacoes.push({ campanha: row.id, ...recomendacao });

        if (recomendacao.automatizavel) {
          avisos.push(
            `A campanha ${row.id} tem recomendacao "${recomendacao.acao}" elegivel a automacao, mas o headless nao aplica nada. Rode no terminal.`,
          );
        }
      }
      resultado.recomendacoes = recomendacoes;
    }

    if (tarefas.includes('auditoria')) {
      const auditorias: unknown[] = [];
      for (const row of ctx.db.campaigns.findMany({ state: 'CREATED_PAUSED' })) {
        const { achados, aprovado } = await auditarCampanha(ctx, row.id);
        auditorias.push({ campanha: row.id, aprovado, reprovacoes: achados.filter((a) => a.resultado === 'falha') });
      }
      resultado.auditorias = auditorias;
    }

    const resumo: JobSummary = {
      executadoEm: ctx.clock().toISOString(),
      habilitado: true,
      dryRun: ctx.meta.dryRun,
      tarefas: resultado,
      avisos,
    };

    ctx.audit.finishJob(jobId, 'success', resumo);
    return resumo;
  } catch (error) {
    const appError = toAppError(error);
    ctx.audit.finishJob(jobId, 'error', undefined, appError);
    throw appError;
  } finally {
    if (!options.ctx) ctx.close();
  }
}

const executadoDiretamente =
  process.argv[1] !== undefined && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (executadoDiretamente) {
  runHeadless({ trigger: 'cli' })
    .then((resumo) => {
      process.stdout.write(`${JSON.stringify(resumo, null, 2)}\n`);
      process.exit(0);
    })
    .catch((error: AppError) => {
      process.stderr.write(`${JSON.stringify(error.toJSON(), null, 2)}\n`);
      process.exit(1);
    });
}
