import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { OptimizationEngine } from '../../src/optimization/engine.js';
import { loadPolicies } from '../../src/policies/loader.js';
import { PROJECT_ROOT } from '../../src/config/env.js';
import type { NormalizedMetrics } from '../../src/reports/insights.js';

const policy = loadPolicies(path.join(PROJECT_ROOT, 'policies'), false).optimization;

const desligado = { autoPauseEnabled: false, autoScaleEnabled: false, autoReactivateEnabled: false };
const ligado = { autoPauseEnabled: true, autoScaleEnabled: true, autoReactivateEnabled: true };

function metrics(patch: Partial<NormalizedMetrics> = {}): NormalizedMetrics {
  return {
    periodo: { inicio: '2026-09-01', fim: '2026-09-03' },
    investimento: 150,
    alcance: 5_000,
    impressoes: 8_000,
    frequencia: 1.6,
    cpm: 18.75,
    cliques: 200,
    cliquesNoLink: 150,
    ctr: 2.5,
    cpc: 0.75,
    conversas: 10,
    leads: 10,
    compras: null,
    visualizacoesDaPagina: null,
    cpl: 22,
    cpa: 22,
    receita: null,
    roas: null,
    indisponiveis: [],
    ...patch,
  };
}

function input(patch: Record<string, unknown> = {}) {
  return {
    objetoId: '120210000000000123',
    objetoTipo: 'adset' as const,
    objetivo: 'OUTCOME_LEADS',
    metrics: metrics(),
    moeda: 'BRL',
    metaTipo: 'CPL' as const,
    metaValor: 25,
    horasDesdeAtivacao: 72,
    orcamentoDiarioAtualCents: 5_000,
    alteracoesNasUltimas24h: 0,
    ultimaAlteracaoIso: null,
    ...patch,
  };
}

describe('motor de otimizacao', () => {
  const engine = new OptimizationEngine(policy, desligado);

  it('recomenda MANTER quando o CPL esta dentro da meta', () => {
    expect(engine.avaliar(input()).acao).toBe('MANTER');
  });

  it('recomenda PAUSAR quando o CPA passa muito da meta', () => {
    const reco = engine.avaliar(
      input({ metrics: metrics({ cpl: 40, cpa: 40 }) }),
    );
    expect(reco.acao).toBe('PAUSAR');
    expect(reco.motivos.join(' ')).toMatch(/acima da meta/i);
  });

  it('recomenda REDUZIR quando o CPA esta acima mas recuperavel', () => {
    expect(engine.avaliar(input({ metrics: metrics({ cpl: 32, cpa: 32 }) })).acao).toBe(
      'REDUZIR',
    );
  });

  it('recomenda ESCALAR quando o CPA esta bem abaixo da meta com volume', () => {
    const reco = engine.avaliar(
      input({ metrics: metrics({ cpl: 15, cpa: 15, leads: 20, conversas: 20 }) }),
    );
    expect(reco.acao).toBe('ESCALAR');
    expect(reco.sugestaoOrcamentoCents).not.toBeNull();
  });

  it('a sugestao de escala respeita o limite percentual da politica', () => {
    const reco = engine.avaliar(
      input({ metrics: metrics({ cpl: 12, cpa: 12, leads: 30, conversas: 30 }) }),
    );
    const teto = 5_000 * (1 + policy.guardas.limiteAlteracaoPercentual / 100);
    expect(reco.sugestaoOrcamentoCents!).toBeLessThanOrEqual(Math.round(teto));
  });

  it('recomenda REVISAR_CRIATIVO quando ha entrega zero depois de 24h', () => {
    const reco = engine.avaliar(
      input({
        metrics: metrics({ impressoes: 0, investimento: 0, leads: 0, conversas: 0, cpl: null, cpa: null }),
        horasDesdeAtivacao: 30,
      }),
    );
    expect(reco.acao).toBe('REVISAR_CRIATIVO');
  });

  it('recomenda NOVA_VARIACAO quando a frequencia esta alta e nao ha volume para julgar custo', () => {
    const reco = engine.avaliar(
      input({ metrics: metrics({ frequencia: 4.2, leads: 1, conversas: 1 }) }),
    );
    expect(reco.acao).toBe('NOVA_VARIACAO');
    expect(reco.motivos.join(' ')).toMatch(/desgaste/i);
  });

  it('a comparacao com a meta prevalece sobre a frequencia, mas o alerta e preservado', () => {
    const reco = engine.avaliar(input({ metrics: metrics({ frequencia: 4.2 }) }));
    expect(reco.acao).toBe('MANTER');
    expect(reco.motivos.join(' ')).toMatch(/desgaste/i);
  });

  it('nunca marca automatizavel com as flags desligadas', () => {
    for (const patch of [
      { metrics: metrics({ cpl: 60, cpa: 60 }) },
      { metrics: metrics({ cpl: 10, cpa: 10, leads: 40, conversas: 40 }) },
    ]) {
      expect(engine.avaliar(input(patch)).automatizavel).toBe(false);
    }
  });

  it('bloqueia por investimento insuficiente', () => {
    const reco = engine.avaliar(
      input({ metrics: metrics({ investimento: 1, leads: 0, conversas: 0 }) }),
    );
    expect(reco.bloqueadoPor.join(' ')).toMatch(/investimento/i);
  });

  it('bloqueia por poucos resultados', () => {
    const reco = engine.avaliar(input({ metrics: metrics({ leads: 1, conversas: 1 }) }));
    expect(reco.bloqueadoPor.join(' ')).toMatch(/resultado/i);
  });

  it('bloqueia por campanha jovem demais', () => {
    const reco = engine.avaliar(input({ horasDesdeAtivacao: 2 }));
    expect(reco.bloqueadoPor.join(' ')).toMatch(/h de vida/i);
  });

  it('bloqueia por alteracao recente de orcamento', () => {
    const reco = engine.avaliar(input({ alteracoesNasUltimas24h: 1 }));
    expect(reco.bloqueadoPor.length).toBeGreaterThan(0);
  });

  it('bloqueia quando faltam dados que a Meta nao devolveu', () => {
    const reco = engine.avaliar(
      input({ metrics: metrics({ indisponiveis: ['leads', 'cpl'] }) }),
    );
    expect(reco.bloqueadoPor.join(' ')).toMatch(/Metricas ausentes/i);
  });

  it('mesmo com flags ligadas, guarda pendente impede automatizar', () => {
    const comFlags = new OptimizationEngine(policy, ligado);
    const reco = comFlags.avaliar(
      input({ metrics: metrics({ cpl: 60, cpa: 60, leads: 1, conversas: 1 }) }),
    );
    expect(reco.bloqueadoPor.length).toBeGreaterThan(0);
    expect(reco.automatizavel).toBe(false);
  });

  it('a politica de otimizacao nasce com toda acao automatica desligada', () => {
    expect(policy.acoesAutomaticas).toEqual({ pausar: false, escalar: false, reativar: false });
    expect(policy.guardas.exigirAprovacao).toBe(true);
  });
});
