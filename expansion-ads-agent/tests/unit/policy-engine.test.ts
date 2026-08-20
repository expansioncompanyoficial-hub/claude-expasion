import { describe, expect, it } from 'vitest';
import { PolicyEngine, blocking } from '../../src/policies/engine.js';
import { loadPolicies } from '../../src/policies/loader.js';
import { ClientRegistry } from '../../src/clients/registry.js';
import { PROJECT_ROOT } from '../../src/config/env.js';
import { PolicyViolationError } from '../../src/shared/errors.js';
import path from 'node:path';

const policies = loadPolicies(path.join(PROJECT_ROOT, 'policies'), false);
const engine = new PolicyEngine(policies);
const client = new ClientRegistry(path.join(PROJECT_ROOT, 'clients')).load('example-client');

const baseBudget = {
  currency: 'BRL',
  dailyBudgetCents: 5_000,
  lifetimeBudgetCents: null,
  startTime: '2026-09-01T00:00:00Z',
  stopTime: null,
};

describe('politica de orcamento', () => {
  it('aprova orcamento dentro do limite da cliente', () => {
    expect(blocking(engine.evaluateBudget(client, baseBudget))).toHaveLength(0);
  });

  it('bloqueia orcamento diario acima do limite da cliente', () => {
    const findings = engine.evaluateBudget(client, {
      ...baseBudget,
      dailyBudgetCents: client.config.limites.diarioCents + 1,
    });
    const bloqueios = blocking(findings);
    expect(bloqueios.map((f) => f.rule)).toContain('acima_do_limite_do_cliente');
  });

  it('assertBudget lanca PolicyViolationError quando estoura o limite', () => {
    expect(() =>
      engine.assertBudget(client, { ...baseBudget, dailyBudgetCents: 10_000_000 }),
    ).toThrow(PolicyViolationError);
  });

  it('bloqueia orcamento abaixo do minimo da moeda', () => {
    const bloqueios = blocking(
      engine.evaluateBudget(client, { ...baseBudget, dailyBudgetCents: 100 }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('abaixo_do_minimo');
  });

  it('bloqueia campanha sem nenhum orcamento', () => {
    const bloqueios = blocking(
      engine.evaluateBudget(client, {
        ...baseBudget,
        dailyBudgetCents: null,
        lifetimeBudgetCents: null,
      }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('orcamento_ausente');
  });

  it('bloqueia orcamento diario e total no mesmo nivel', () => {
    const bloqueios = blocking(
      engine.evaluateBudget(client, { ...baseBudget, lifetimeBudgetCents: 100_000 }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('orcamento_duplo');
  });

  it('bloqueia orcamento total sem data de encerramento', () => {
    const bloqueios = blocking(
      engine.evaluateBudget(client, {
        ...baseBudget,
        dailyBudgetCents: null,
        lifetimeBudgetCents: 100_000,
        stopTime: null,
      }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('total_sem_data_fim');
  });

  it('bloqueia moeda diferente da cadastrada para a cliente', () => {
    const bloqueios = blocking(engine.evaluateBudget(client, { ...baseBudget, currency: 'USD' }));
    expect(bloqueios.map((f) => f.rule)).toContain('moeda_divergente');
  });

  it('bloqueia quando a soma diaria com outras campanhas estoura o teto', () => {
    const bloqueios = blocking(
      engine.evaluateBudget(client, {
        ...baseBudget,
        dailyBudgetCents: 15_000,
        orcamentoDiarioJaComprometidoCents: 15_000,
      }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('soma_diaria_estourada');
  });
});

describe('politica de estrutura', () => {
  it('aprova estrutura pequena', () => {
    const findings = engine.evaluateStructure({
      adsets: 1,
      adsPerAdset: [2],
      totalAds: 2,
      campanhasCriadasHoje: 0,
    });
    expect(findings).toHaveLength(0);
  });

  it('bloqueia mais conjuntos do que a politica permite', () => {
    const findings = engine.evaluateStructure({
      adsets: 99,
      adsPerAdset: [1],
      totalAds: 1,
      campanhasCriadasHoje: 0,
    });
    expect(findings.map((f) => f.rule)).toContain('max_conjuntos');
  });

  it('bloqueia quando a cliente ja atingiu o limite diario de campanhas', () => {
    const findings = engine.evaluateStructure({
      adsets: 1,
      adsPerAdset: [1],
      totalAds: 1,
      campanhasCriadasHoje: policies.global.criacao.maxCampanhasPorClientePorDia,
    });
    expect(findings.map((f) => f.rule)).toContain('max_campanhas_dia');
  });
});

describe('politica de objetivo e modelo', () => {
  it('aprova objetivo e modelo autorizados para a cliente', () => {
    expect(engine.evaluateObjective(client, 'OUTCOME_LEADS', 'whatsapp_conversas')).toHaveLength(0);
  });

  it('bloqueia objetivo legado (nome pre-ODAX)', () => {
    const findings = engine.evaluateObjective(client, 'MESSAGES', 'whatsapp_conversas');
    expect(findings.map((f) => f.rule)).toContain('objetivo_nao_permitido');
  });

  it('bloqueia modelo nao implementado', () => {
    const findings = engine.evaluateObjective(client, 'OUTCOME_LEADS', 'modelo_inventado');
    expect(findings.map((f) => f.rule)).toContain('modelo_nao_permitido');
  });
});

describe('politica de alteracao de orcamento', () => {
  const base = {
    currentDailyCents: 5_000,
    nextDailyCents: 5_500,
    ultimaAlteracaoIso: null,
    alteracoesNasUltimas24h: 0,
    aprovado: true,
  };

  it('aprova aumento de 10% com aprovacao valida', () => {
    expect(blocking(engine.evaluateBudgetChange(client, base))).toHaveLength(0);
  });

  it('bloqueia aumento acima do percentual maximo', () => {
    const bloqueios = blocking(
      engine.evaluateBudgetChange(client, { ...base, nextDailyCents: 10_000 }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('variacao_acima_do_limite');
  });

  it('bloqueia aumento sem aprovacao', () => {
    const bloqueios = blocking(engine.evaluateBudgetChange(client, { ...base, aprovado: false }));
    expect(bloqueios.map((f) => f.rule)).toContain('aumento_sem_aprovacao');
  });

  it('bloqueia quando ja houve alteracao nas ultimas 24h', () => {
    const bloqueios = blocking(
      engine.evaluateBudgetChange(client, { ...base, alteracoesNasUltimas24h: 1 }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('max_mudancas_dia');
  });

  it('bloqueia novo orcamento acima do limite da cliente', () => {
    const bloqueios = blocking(
      engine.evaluateBudgetChange(client, {
        ...base,
        currentDailyCents: 19_000,
        nextDailyCents: 21_000,
      }),
    );
    expect(bloqueios.map((f) => f.rule)).toContain('acima_do_limite_do_cliente');
  });
});
