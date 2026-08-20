import {
  ACTION_INSIGHT_FIELDS,
  ACTION_TYPES,
  BASE_INSIGHT_FIELDS,
  PERIOD_ALIASES,
  PURCHASE_INSIGHT_FIELDS,
  type DatePreset,
} from '../meta/constants.js';
import type { InsightRow } from '../meta/gateway.js';
import { ValidationError } from '../shared/errors.js';

export interface NormalizedMetrics {
  readonly periodo: { inicio: string | null; fim: string | null };
  readonly investimento: number | null;
  readonly alcance: number | null;
  readonly impressoes: number | null;
  readonly frequencia: number | null;
  readonly cpm: number | null;
  readonly cliques: number | null;
  readonly cliquesNoLink: number | null;
  readonly ctr: number | null;
  readonly cpc: number | null;
  readonly conversas: number | null;
  readonly leads: number | null;
  readonly compras: number | null;
  readonly visualizacoesDaPagina: number | null;
  readonly cpl: number | null;
  readonly cpa: number | null;
  readonly receita: number | null;
  readonly roas: number | null;
  /** Metricas que a Meta nao devolveu para este objeto/periodo. */
  readonly indisponiveis: string[];
}

export interface ObjectInsights extends NormalizedMetrics {
  readonly objetoId: string;
  readonly objetoTipo: 'account' | 'campaign' | 'adset' | 'ad';
  readonly nome: string | null;
}

export function resolvePeriod(periodo: string): DatePreset {
  const normalizado = periodo.trim().toLowerCase();
  const alias = PERIOD_ALIASES[normalizado];
  if (alias) return alias;
  throw new ValidationError(
    `Periodo desconhecido: "${periodo}".`,
    { periodosValidos: Object.keys(PERIOD_ALIASES) },
    [`Use um destes: ${Object.keys(PERIOD_ALIASES).join(', ')}.`],
  );
}

/**
 * Campos de insights compativeis com o objetivo.
 * ROAS so faz sentido em campanha de vendas — pedir sempre gera ruido.
 */
export function fieldsForObjective(objective: string, level: string): string[] {
  const fields: string[] = [...BASE_INSIGHT_FIELDS, ...ACTION_INSIGHT_FIELDS];
  if (objective === 'OUTCOME_SALES') fields.push(...PURCHASE_INSIGHT_FIELDS);

  if (level === 'campaign') fields.push('campaign_id', 'campaign_name');
  if (level === 'adset') fields.push('campaign_id', 'adset_id', 'adset_name');
  if (level === 'ad') fields.push('campaign_id', 'adset_id', 'ad_id', 'ad_name');

  return [...new Set(fields)];
}

function toNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function somaAcoes(
  lista: ReadonlyArray<{ action_type: string; value: string }> | undefined,
  tipos: readonly string[],
): number | null {
  if (!lista || lista.length === 0) return null;
  const encontrados = lista.filter((item) => tipos.includes(item.action_type));
  if (encontrados.length === 0) return null;
  // Varios action_types podem representar o mesmo resultado (ex.: purchase e
  // offsite_conversion.fb_pixel_purchase). Usamos o MAIOR, nao a soma, para nao
  // contar a mesma conversao duas vezes.
  return Math.max(...encontrados.map((item) => Number(item.value) || 0));
}

/**
 * Converte uma linha da Ads Insights API em metricas normalizadas.
 *
 * Nada e presumido: quando a Meta nao devolve o campo, o valor fica `null` e o
 * nome entra em `indisponiveis`. Zero e um resultado; ausencia nao e zero.
 */
export function normalizeInsightRow(row: InsightRow): NormalizedMetrics {
  const indisponiveis: string[] = [];

  const investimento = toNumber(row.spend);
  const alcance = toNumber(row.reach);
  const impressoes = toNumber(row.impressions);
  const frequencia = toNumber(row.frequency);
  const cpm = toNumber(row.cpm);
  const cliques = toNumber(row.clicks);
  // A Meta devolve cliques no link de duas formas conforme a consulta:
  // o campo `inline_link_clicks` ou a acao `link_click`. Aceita as duas.
  const cliquesNoLink =
    toNumber(row.inline_link_clicks) ?? somaAcoes(row.actions, ACTION_TYPES.cliquesNoLink);
  const ctr = toNumber(row.ctr);
  const cpc = toNumber(row.cpc);

  const conversas = somaAcoes(row.actions, ACTION_TYPES.conversasWhatsapp);
  const leads = somaAcoes(row.actions, ACTION_TYPES.leads);
  const compras = somaAcoes(row.actions, ACTION_TYPES.compras);
  const visualizacoesDaPagina = somaAcoes(row.actions, ACTION_TYPES.visualizacoesDaPagina);

  const receita = somaAcoes(row.action_values, ACTION_TYPES.compras);
  const roasBruto =
    row.purchase_roas?.[0]?.value ?? row.website_purchase_roas?.[0]?.value ?? undefined;
  let roas = toNumber(roasBruto);
  if (roas === null && receita !== null && investimento !== null && investimento > 0) {
    roas = receita / investimento;
  }

  const resultadoLead = leads ?? conversas;
  const cpl =
    resultadoLead !== null && resultadoLead > 0 && investimento !== null
      ? investimento / resultadoLead
      : null;
  const cpa =
    compras !== null && compras > 0 && investimento !== null ? investimento / compras : null;

  const registrar = (nome: string, valor: unknown): void => {
    if (valor === null) indisponiveis.push(nome);
  };
  registrar('conversas', conversas);
  registrar('leads', leads);
  registrar('compras', compras);
  registrar('receita', receita);
  registrar('roas', roas);
  registrar('cpl', cpl);
  registrar('cpa', cpa);

  return {
    periodo: { inicio: row.date_start ?? null, fim: row.date_stop ?? null },
    investimento,
    alcance,
    impressoes,
    frequencia,
    cpm,
    cliques,
    cliquesNoLink,
    ctr,
    cpc,
    conversas,
    leads,
    compras,
    visualizacoesDaPagina,
    cpl,
    cpa,
    receita,
    roas,
    indisponiveis,
  };
}

export function rowsToObjectInsights(
  rows: readonly InsightRow[],
  level: 'account' | 'campaign' | 'adset' | 'ad',
  fallbackId: string,
): ObjectInsights[] {
  if (rows.length === 0) return [];

  return rows.map((row) => {
    const id =
      level === 'ad'
        ? (row.ad_id ?? fallbackId)
        : level === 'adset'
          ? (row.adset_id ?? fallbackId)
          : level === 'campaign'
            ? (row.campaign_id ?? fallbackId)
            : fallbackId;

    const nome =
      level === 'ad'
        ? (row.ad_name ?? null)
        : level === 'adset'
          ? (row.adset_name ?? null)
          : level === 'campaign'
            ? (row.campaign_name ?? null)
            : null;

    return { objetoId: id, objetoTipo: level, nome, ...normalizeInsightRow(row) };
  });
}

/** Metrica principal conforme o objetivo — usada nos relatorios e no motor de regras. */
export function metricaPrincipal(objective: string): {
  chave: keyof NormalizedMetrics;
  custoChave: keyof NormalizedMetrics;
  rotulo: string;
} {
  switch (objective) {
    case 'OUTCOME_SALES':
      return { chave: 'compras', custoChave: 'cpa', rotulo: 'compras' };
    case 'OUTCOME_LEADS':
      return { chave: 'leads', custoChave: 'cpl', rotulo: 'leads' };
    case 'OUTCOME_TRAFFIC':
      return { chave: 'cliquesNoLink', custoChave: 'cpc', rotulo: 'cliques no link' };
    default:
      return { chave: 'impressoes', custoChave: 'cpm', rotulo: 'impressoes' };
  }
}
