import { describe, expect, it } from 'vitest';
import {
  fieldsForObjective,
  metricaPrincipal,
  normalizeInsightRow,
  resolvePeriod,
} from '../../src/reports/insights.js';

describe('periodo do relatorio', () => {
  it('traduz os apelidos do CLI para date_preset oficial', () => {
    expect(resolvePeriod('today')).toBe('today');
    expect(resolvePeriod('last-7-days')).toBe('last_7d');
    expect(resolvePeriod('ultimos-30-dias')).toBe('last_30d');
    expect(resolvePeriod('ontem')).toBe('yesterday');
  });

  it('recusa periodo desconhecido em vez de inventar', () => {
    expect(() => resolvePeriod('semana-que-vem')).toThrow();
  });
});

describe('campos por objetivo', () => {
  it('pede ROAS apenas para vendas', () => {
    expect(fieldsForObjective('OUTCOME_SALES', 'campaign').join(',')).toMatch(/roas/);
    expect(fieldsForObjective('OUTCOME_LEADS', 'campaign').join(',')).not.toMatch(/roas/);
  });

  it('sempre inclui as metricas basicas', () => {
    for (const objetivo of ['OUTCOME_LEADS', 'OUTCOME_SALES', 'OUTCOME_TRAFFIC']) {
      const campos = fieldsForObjective(objetivo, 'campaign');
      for (const basico of ['spend', 'impressions', 'reach', 'cpm', 'ctr', 'clicks']) {
        expect(campos).toContain(basico);
      }
    }
  });
});

describe('normalizacao das metricas', () => {
  it('converte os numeros que a Meta manda como string', () => {
    const m = normalizeInsightRow({
      date_start: '2026-09-01',
      date_stop: '2026-09-07',
      spend: '123.45',
      impressions: '10000',
      reach: '8000',
      frequency: '1.25',
      cpm: '12.34',
      clicks: '300',
      ctr: '3.0',
      cpc: '0.41',
    });

    expect(m.investimento).toBeCloseTo(123.45);
    expect(m.impressoes).toBe(10_000);
    expect(m.frequencia).toBeCloseTo(1.25);
  });

  it('extrai conversas de WhatsApp de actions', () => {
    const m = normalizeInsightRow({
      spend: '100',
      actions: [
        { action_type: 'onsite_conversion.total_messaging_connection', value: '12' },
        { action_type: 'link_click', value: '80' },
      ],
    });
    expect(m.conversas).toBe(12);
    expect(m.cliquesNoLink).toBe(80);
  });

  it('extrai compras e receita e calcula ROAS quando ha dados', () => {
    const m = normalizeInsightRow({
      spend: '100',
      actions: [{ action_type: 'purchase', value: '5' }],
      action_values: [{ action_type: 'purchase', value: '450' }],
      purchase_roas: [{ action_type: 'omni_purchase', value: '4.5' }],
    });
    expect(m.compras).toBe(5);
    expect(m.receita).toBeCloseTo(450);
    expect(m.roas).toBeCloseTo(4.5);
  });

  it('NAO presume zero: metrica ausente vira null e entra em indisponiveis', () => {
    const m = normalizeInsightRow({ spend: '50', impressions: '1000' });

    expect(m.compras).toBeNull();
    expect(m.leads).toBeNull();
    expect(m.roas).toBeNull();
    expect(m.indisponiveis.length).toBeGreaterThan(0);
  });

  it('distingue zero real de ausencia', () => {
    const m = normalizeInsightRow({
      spend: '50',
      impressions: '1000',
      actions: [{ action_type: 'lead', value: '0' }],
    });
    expect(m.leads).toBe(0);
    expect(m.indisponiveis).not.toContain('leads');
  });

  it('nao divide por zero ao calcular custo por resultado', () => {
    const m = normalizeInsightRow({
      spend: '50',
      actions: [{ action_type: 'lead', value: '0' }],
    });
    expect(m.cpl === null || Number.isFinite(m.cpl)).toBe(true);
  });
});

describe('metrica principal por objetivo', () => {
  it('escolhe a metrica que importa para cada objetivo', () => {
    expect(metricaPrincipal('OUTCOME_LEADS').chave).toMatch(/lead|conversa/i);
    expect(metricaPrincipal('OUTCOME_SALES').chave).toMatch(/compra|roas/i);
  });
});
