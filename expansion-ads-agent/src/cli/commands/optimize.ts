import type { AgentContext } from '../../context.js';
import { getCampaignOrThrow } from '../../approvals/service.js';
import { OptimizationEngine, type OptimizationInput } from '../../optimization/engine.js';
import {
  fieldsForObjective,
  resolvePeriod,
  rowsToObjectInsights,
} from '../../reports/insights.js';
import { newId } from '../../shared/ids.js';
import { flagBool, flagOptional, flagString, type ParsedCli } from '../args.js';
import { aviso, EXIT, item, json, linha, ok, titulo } from '../output.js';

export async function comandoRecomendar(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const clientId = flagString(cli, 'client');
  const campaignId = flagOptional(cli, 'campaign-id');
  const periodo = flagOptional(cli, 'period') ?? 'last-7-days';

  const client = ctx.clients.loadActive(clientId);
  const engine = new OptimizationEngine(ctx.policies.optimization, {
    autoPauseEnabled: ctx.config.automation.autoPauseEnabled,
    autoScaleEnabled: ctx.config.automation.autoScaleEnabled,
    autoReactivateEnabled: ctx.config.automation.autoReactivateEnabled,
  });

  const campanhas = campaignId
    ? [getCampaignOrThrow(ctx, campaignId)]
    : ctx.db.campaigns
        .findMany({ client_id: client.config.id })
        .filter((row) => row.meta_campaign_id && ['ACTIVE', 'PAUSED'].includes(row.state));

  titulo(`RECOMENDACOES — ${client.config.nome}`);
  item(`Periodo de analise: ${periodo}`);
  item(
    `Acoes automaticas: pausar=${ctx.config.automation.autoPauseEnabled} · escalar=${ctx.config.automation.autoScaleEnabled} · reativar=${ctx.config.automation.autoReactivateEnabled}`,
  );

  if (campanhas.length === 0) {
    linha('');
    aviso('Nenhuma campanha ativa ou pausada com ID na Meta para analisar.');
    linha('');
    return EXIT.OK;
  }

  const recomendacoes = [];

  for (const row of campanhas) {
    const rows = await ctx.meta.getInsights(row.meta_campaign_id!, {
      level: 'campaign',
      datePreset: resolvePeriod(periodo),
      fields: fieldsForObjective(row.objective, 'campaign'),
    });
    const metricas = rowsToObjectInsights(rows, 'campaign', row.meta_campaign_id!);

    if (metricas.length === 0) {
      linha('');
      aviso(`${row.internal_name}: sem dados no periodo. Nenhuma recomendacao.`);
      continue;
    }

    const brief = row.brief_id ? ctx.db.briefs.findById(row.brief_id) : null;
    const dadosBrief = brief ? (JSON.parse(brief.brief_json) as { metaTipo?: string; metaValor?: number }) : null;

    const horasDesdeAtivacao =
      (ctx.clock().getTime() - new Date(row.updated_at).getTime()) / 3_600_000;

    const desde = ctx.clock().getTime() - 86_400_000;
    const alteracoes24h = ctx.db.actionLogs
      .findMany({ campaign_id: row.id, tool: 'meta_update_budget_within_policy' })
      .filter((log) => new Date(log.ts).getTime() >= desde).length;

    const entrada: OptimizationInput = {
      objetoId: row.meta_campaign_id!,
      objetoTipo: 'campaign',
      objetivo: row.objective,
      metrics: metricas[0]!,
      moeda: row.currency,
      metaTipo: (dadosBrief?.metaTipo ?? null) as OptimizationInput['metaTipo'],
      metaValor: dadosBrief?.metaValor ?? null,
      horasDesdeAtivacao,
      orcamentoDiarioAtualCents: row.daily_budget_cents,
      alteracoesNasUltimas24h: alteracoes24h,
      ultimaAlteracaoIso: null,
    };

    const recomendacao = engine.avaliar(entrada);
    recomendacoes.push({ campanha: row.internal_name, ...recomendacao });

    ctx.db.recommendations.insert({
      id: newId('reco', ctx.clock()),
      client_id: client.config.id,
      campaign_id: row.id,
      meta_object_type: 'campaign',
      meta_object_id: row.meta_campaign_id!,
      action: recomendacao.acao,
      confidence: recomendacao.confianca,
      rationale_json: JSON.stringify(recomendacao.motivos),
      blocked_by_json: JSON.stringify(recomendacao.bloqueadoPor),
      applied: 0,
      applied_at: null,
      created_at: ctx.clock().toISOString(),
    });

    linha('');
    linha(`  ${row.internal_name}`);
    ok(`Recomendacao: ${recomendacao.acao} (confianca ${recomendacao.confianca})`);
    for (const motivo of recomendacao.motivos) item(motivo);
    if (recomendacao.sugestaoOrcamentoCents !== null) {
      item(`Orcamento sugerido: ${recomendacao.sugestaoOrcamentoCents} centavos`);
    }
    if (recomendacao.bloqueadoPor.length > 0) {
      linha('    Impede aplicacao automatica:');
      for (const bloqueio of recomendacao.bloqueadoPor) linha(`      - ${bloqueio}`);
    }
    item(`Aplicavel automaticamente: ${recomendacao.automatizavel ? 'sim' : 'nao'}`);
  }

  if (flagBool(cli, 'json')) {
    json(recomendacoes);
  }

  linha('');
  linha('  Nenhuma alteracao foi aplicada. Este comando so recomenda.');
  linha('');
  return EXIT.OK;
}
