import path from 'node:path';
import type { AgentContext } from '../../context.js';
import { getCampaignOrThrow } from '../../approvals/service.js';
import {
  fieldsForObjective,
  resolvePeriod,
  rowsToObjectInsights,
  type ObjectInsights,
} from '../../reports/insights.js';
import { renderReport, saveReport } from '../../reports/render.js';
import { newId } from '../../shared/ids.js';
import { AD_EFFECTIVE_STATUSES_COM_PROBLEMA } from '../../meta/constants.js';
import { flagBool, flagOptional, flagString, type ParsedCli } from '../args.js';
import { aviso, EXIT, item, json, linha, ok, titulo } from '../output.js';

interface ColetaResult {
  readonly linhas: ObjectInsights[];
  readonly anunciosComProblema: Array<{
    id: string;
    nome: string | null;
    status: string | null;
    problema: string;
  }>;
  readonly periodo: string;
}

async function coletar(
  ctx: AgentContext,
  clientId: string,
  periodo: string,
  nivel: 'account' | 'campaign' | 'adset' | 'ad',
  campaignId: string | null,
): Promise<ColetaResult> {
  const client = ctx.clients.loadActive(clientId);
  const datePreset = resolvePeriod(periodo);

  const objetoId = campaignId
    ? (getCampaignOrThrow(ctx, campaignId).meta_campaign_id ?? client.config.meta.adAccountId)
    : client.config.meta.adAccountId;

  const objetivo = campaignId ? getCampaignOrThrow(ctx, campaignId).objective : 'OUTCOME_LEADS';

  const rows = await ctx.meta.getInsights(objetoId, {
    level: nivel,
    datePreset,
    fields: fieldsForObjective(objetivo, nivel),
  });

  const linhas = rowsToObjectInsights(rows, nivel, objetoId);

  const anunciosComProblema: ColetaResult['anunciosComProblema'] = [];
  if (ctx.meta.hasCredentials && campaignId) {
    const metaCampaignId = getCampaignOrThrow(ctx, campaignId).meta_campaign_id;
    if (metaCampaignId) {
      const anuncios = await ctx.meta.listAds(metaCampaignId);
      for (const anuncio of anuncios) {
        const problemas = anuncio.issues_info?.map((issue) => issue.error_summary ?? issue.error_message ?? '') ?? [];
        const statusRuim =
          anuncio.effective_status &&
          (AD_EFFECTIVE_STATUSES_COM_PROBLEMA as readonly string[]).includes(anuncio.effective_status);
        if (problemas.length > 0 || statusRuim) {
          anunciosComProblema.push({
            id: anuncio.id,
            nome: anuncio.name ?? null,
            status: anuncio.effective_status ?? null,
            problema: problemas.filter(Boolean).join(' | ') || `status ${anuncio.effective_status}`,
          });
        }
      }
    }
  }

  // Guarda o retrato para o motor de otimizacao comparar depois.
  for (const linhaResultado of linhas) {
    ctx.db.snapshots.insert({
      id: newId('snap', ctx.clock()),
      client_id: client.config.id,
      campaign_id: campaignId,
      meta_object_type: nivel,
      meta_object_id: linhaResultado.objetoId,
      date_start: linhaResultado.periodo.inicio ?? datePreset,
      date_stop: linhaResultado.periodo.fim ?? datePreset,
      metrics_json: JSON.stringify(linhaResultado),
      collected_at: ctx.clock().toISOString(),
    });
  }

  return { linhas, anunciosComProblema, periodo: datePreset };
}

export async function comandoInsights(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const clientId = flagString(cli, 'client');
  const periodo = flagOptional(cli, 'period') ?? 'last-7-days';
  const nivel = (flagOptional(cli, 'level') ?? 'campaign') as 'account' | 'campaign' | 'adset' | 'ad';
  const campaignId = flagOptional(cli, 'campaign-id');

  const client = ctx.clients.loadActive(clientId);
  const resultado = await coletar(ctx, clientId, periodo, nivel, campaignId);

  if (flagBool(cli, 'json')) {
    json(resultado);
    return EXIT.OK;
  }

  titulo(`DESEMPENHO — ${client.config.nome}`);
  item(`Periodo: ${resultado.periodo}`);
  item(`Nivel: ${nivel}`);
  item(`Conta: ${client.config.meta.adAccountId}`);

  if (!ctx.meta.hasCredentials) {
    linha('');
    aviso('Sem META_ACCESS_TOKEN: nenhuma metrica real foi consultada.');
    linha('');
    return EXIT.OK;
  }

  if (resultado.linhas.length === 0) {
    linha('');
    aviso('A Meta nao retornou dados para este periodo.');
    linha('');
    return EXIT.OK;
  }

  linha('');
  for (const linhaResultado of resultado.linhas) {
    linha(`  ${linhaResultado.nome ?? linhaResultado.objetoId}`);
    item(`investimento: ${linhaResultado.investimento ?? '—'}`);
    item(`impressoes: ${linhaResultado.impressoes ?? '—'} · alcance: ${linhaResultado.alcance ?? '—'} · freq: ${linhaResultado.frequencia?.toFixed(2) ?? '—'}`);
    item(`cliques: ${linhaResultado.cliques ?? '—'} · CTR: ${linhaResultado.ctr ?? '—'} · CPC: ${linhaResultado.cpc ?? '—'}`);
    item(`conversas: ${linhaResultado.conversas ?? '—'} · leads: ${linhaResultado.leads ?? '—'} · compras: ${linhaResultado.compras ?? '—'}`);
    item(`CPL: ${linhaResultado.cpl?.toFixed(2) ?? '—'} · CPA: ${linhaResultado.cpa?.toFixed(2) ?? '—'} · ROAS: ${linhaResultado.roas?.toFixed(2) ?? '—'}`);
    if (linhaResultado.indisponiveis.length > 0) {
      item(`nao retornado pela Meta: ${linhaResultado.indisponiveis.join(', ')}`);
    }
    linha('');
  }

  return EXIT.OK;
}

export async function comandoRelatorioDiario(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const clientId = flagString(cli, 'client');
  const periodo = flagOptional(cli, 'period') ?? 'yesterday';
  const campaignId = flagOptional(cli, 'campaign-id');
  const client = ctx.clients.loadActive(clientId);

  const resultado = await coletar(ctx, clientId, periodo, 'campaign', campaignId);

  const conteudo = renderReport({
    titulo: `Relatorio de desempenho — ${client.config.nome}`,
    cliente: client.config.nome,
    conta: client.config.meta.adAccountId,
    periodo: resultado.periodo,
    moeda: client.config.moeda,
    geradoEm: ctx.clock().toISOString(),
    linhas: resultado.linhas,
    anunciosComProblema: resultado.anunciosComProblema,
    observacoes: ctx.meta.hasCredentials
      ? undefined
      : ['Sem credencial configurada: este relatorio nao consultou a Meta.'],
  });

  const nomeArquivo = `${ctx.clock().toISOString().slice(0, 10)}-${client.config.id}-${resultado.periodo}.md`;
  const destino = saveReport(ctx.config.paths.reports, nomeArquivo, conteudo);

  titulo('RELATORIO GERADO');
  ok(path.relative(ctx.config.paths.root, destino));
  item(`Objetos: ${resultado.linhas.length}`);
  item(`Anuncios com problema: ${resultado.anunciosComProblema.length}`);
  linha('');
  return EXIT.OK;
}
