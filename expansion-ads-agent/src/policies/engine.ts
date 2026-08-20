import type { ClientRecord } from '../clients/schema.js';
import { PolicyViolationError } from '../shared/errors.js';
import { formatMoney } from '../shared/money.js';
import { daysBetween } from '../shared/time.js';
import type { PolicyBundle } from './schema.js';

export type Severity = 'block' | 'warn';

export interface PolicyFinding {
  readonly severidade: Severity;
  readonly policy: string;
  readonly rule: string;
  readonly mensagem: string;
  readonly detalhes?: Record<string, unknown>;
}

export interface BudgetInput {
  readonly currency: string;
  readonly dailyBudgetCents: number | null;
  readonly lifetimeBudgetCents: number | null;
  readonly startTime: string | null;
  readonly stopTime: string | null;
  /** Soma dos orcamentos diarios ja comprometidos com outras campanhas ativas. */
  readonly orcamentoDiarioJaComprometidoCents?: number;
}

export interface StructureInput {
  readonly adsets: number;
  readonly adsPerAdset: readonly number[];
  readonly totalAds: number;
  readonly campanhasCriadasHoje: number;
}

export interface BudgetChangeInput {
  readonly currentDailyCents: number;
  readonly nextDailyCents: number;
  readonly ultimaAlteracaoIso: string | null;
  readonly alteracoesNasUltimas24h: number;
  readonly aprovado: boolean;
}

export function blocking(findings: readonly PolicyFinding[]): PolicyFinding[] {
  return findings.filter((finding) => finding.severidade === 'block');
}

/**
 * Motor de politicas. E deterministico e nao consulta o modelo: qualquer decisao
 * do Claude que conflite com o que sai daqui e simplesmente recusada.
 */
export class PolicyEngine {
  constructor(readonly policies: PolicyBundle) {}

  // ---------------------------------------------------------------- orcamento

  evaluateBudget(client: ClientRecord, input: BudgetInput): PolicyFinding[] {
    const findings: PolicyFinding[] = [];
    const budget = this.policies.budget;
    const currency = input.currency.toUpperCase();
    const limiteDiarioCliente = client.config.limites.diarioCents;
    const limiteMensalCliente = client.config.limites.mensalCents;

    const push = (severidade: Severity, rule: string, mensagem: string, detalhes?: Record<string, unknown>) =>
      findings.push({ severidade, policy: 'budget-policy', rule, mensagem, detalhes });

    if (input.dailyBudgetCents === null && input.lifetimeBudgetCents === null) {
      push('block', 'orcamento_ausente', 'A campanha precisa de orcamento diario ou total.');
      return findings;
    }

    if (input.dailyBudgetCents !== null && input.lifetimeBudgetCents !== null) {
      push(
        'block',
        'orcamento_duplo',
        'Informe orcamento diario OU total, nunca os dois no mesmo nivel — a Meta rejeita.',
      );
    }

    if (currency !== client.config.moeda) {
      push('block', 'moeda_divergente', `A moeda ${currency} nao e a da cliente (${client.config.moeda}).`, {
        moedaCliente: client.config.moeda,
        moedaSolicitada: currency,
      });
    }

    if (input.dailyBudgetCents !== null) {
      const daily = input.dailyBudgetCents;
      const minimo = budget.minimoDiarioPorMoedaCents[currency];

      if (minimo === undefined) {
        push('warn', 'minimo_desconhecido', `Nao ha minimo diario cadastrado para ${currency}.`);
      } else if (daily < minimo) {
        push(
          'block',
          'abaixo_do_minimo',
          `Orcamento diario ${formatMoney(daily, currency)} esta abaixo do minimo de ${formatMoney(minimo, currency)}.`,
          { minimoCents: minimo, solicitadoCents: daily },
        );
      }

      if (daily > limiteDiarioCliente) {
        push(
          'block',
          'acima_do_limite_do_cliente',
          `Orcamento diario ${formatMoney(daily, currency)} excede o limite diario da cliente (${formatMoney(limiteDiarioCliente, currency)}).`,
          { limiteCents: limiteDiarioCliente, solicitadoCents: daily },
        );
      }

      if (daily > budget.tetoDiarioAbsolutoCents) {
        push(
          'block',
          'acima_do_teto_absoluto',
          `Orcamento diario excede o teto absoluto do sistema (${formatMoney(budget.tetoDiarioAbsolutoCents, currency)}).`,
          { tetoCents: budget.tetoDiarioAbsolutoCents, solicitadoCents: daily },
        );
      }

      const comprometido = input.orcamentoDiarioJaComprometidoCents ?? 0;
      const somaMaxima = budget.somaDiariaMaximaPorClienteCents ?? limiteDiarioCliente;
      if (comprometido + daily > somaMaxima) {
        push(
          'block',
          'soma_diaria_estourada',
          `A soma dos orcamentos diarios ativos (${formatMoney(comprometido + daily, currency)}) ultrapassa o teto de ${formatMoney(somaMaxima, currency)}.`,
          { comprometidoCents: comprometido, solicitadoCents: daily, tetoCents: somaMaxima },
        );
      }

      const projecaoMensal = daily * 30;
      if (projecaoMensal > limiteMensalCliente) {
        push(
          'block',
          'projecao_mensal_estourada',
          `Projecao de 30 dias (${formatMoney(projecaoMensal, currency)}) ultrapassa o limite mensal da cliente (${formatMoney(limiteMensalCliente, currency)}).`,
          { projecaoCents: projecaoMensal, limiteCents: limiteMensalCliente },
        );
      }
    }

    if (input.lifetimeBudgetCents !== null) {
      const lifetime = input.lifetimeBudgetCents;

      if (!input.stopTime) {
        push(
          'block',
          'total_sem_data_fim',
          'Orcamento total exige data de encerramento — regra da Meta.',
        );
      }

      if (lifetime > limiteMensalCliente) {
        push(
          'block',
          'total_acima_do_limite_mensal',
          `Orcamento total ${formatMoney(lifetime, currency)} excede o limite mensal da cliente (${formatMoney(limiteMensalCliente, currency)}).`,
          { limiteCents: limiteMensalCliente, solicitadoCents: lifetime },
        );
      }

      if (lifetime > budget.tetoMensalAbsolutoCents) {
        push('block', 'total_acima_do_teto_absoluto', 'Orcamento total excede o teto absoluto do sistema.', {
          tetoCents: budget.tetoMensalAbsolutoCents,
          solicitadoCents: lifetime,
        });
      }

      if (input.startTime && input.stopTime) {
        const dias = Math.max(1, Math.ceil(daysBetween(input.startTime, input.stopTime)));
        const mediaDiaria = Math.round(lifetime / dias);
        if (mediaDiaria > limiteDiarioCliente) {
          push(
            'block',
            'media_diaria_do_total_estourada',
            `O total distribuido em ${dias} dia(s) da ${formatMoney(mediaDiaria, currency)}/dia, acima do limite diario da cliente.`,
            { diasDeVeiculacao: dias, mediaDiariaCents: mediaDiaria, limiteCents: limiteDiarioCliente },
          );
        }
      }
    }

    if (
      budget.exigirOrcamentoTotalQuandoHaDataDeEncerramento &&
      input.stopTime &&
      input.lifetimeBudgetCents === null &&
      input.dailyBudgetCents !== null &&
      input.startTime
    ) {
      const dias = Math.max(1, Math.ceil(daysBetween(input.startTime, input.stopTime)));
      const total = input.dailyBudgetCents * dias;
      findings.push({
        severidade: 'warn',
        policy: 'budget-policy',
        rule: 'total_estimado',
        mensagem: `Com data de encerramento, o gasto estimado e ${formatMoney(total, currency)} em ${dias} dia(s).`,
        detalhes: { totalEstimadoCents: total, dias },
      });
    }

    return findings;
  }

  assertBudget(client: ClientRecord, input: BudgetInput): PolicyFinding[] {
    const findings = this.evaluateBudget(client, input);
    const blockers = blocking(findings);
    if (blockers.length > 0) {
      const first = blockers[0]!;
      throw new PolicyViolationError(
        first.policy,
        first.rule,
        `Orcamento reprovado pela politica: ${first.mensagem}`,
        { bloqueios: blockers, avisos: findings.filter((f) => f.severidade === 'warn') },
        blockers.map((finding) => finding.mensagem),
      );
    }
    return findings;
  }

  // --------------------------------------------------------------- estrutura

  evaluateStructure(input: StructureInput): PolicyFinding[] {
    const findings: PolicyFinding[] = [];
    const limites = this.policies.global.criacao;
    const push = (rule: string, mensagem: string, detalhes?: Record<string, unknown>) =>
      findings.push({ severidade: 'block', policy: 'global-policy', rule, mensagem, detalhes });

    if (input.adsets > limites.maxConjuntosPorCampanha) {
      push('max_conjuntos', `Maximo de ${limites.maxConjuntosPorCampanha} conjuntos por campanha.`, {
        solicitado: input.adsets,
      });
    }
    if (input.adsets < 1) {
      push('sem_conjunto', 'A campanha precisa de pelo menos um conjunto.');
    }
    input.adsPerAdset.forEach((count, index) => {
      if (count > limites.maxAnunciosPorConjunto) {
        push('max_anuncios_conjunto', `Conjunto ${index + 1} tem ${count} anuncios; o maximo e ${limites.maxAnunciosPorConjunto}.`);
      }
      if (count < 1) {
        push('conjunto_sem_anuncio', `Conjunto ${index + 1} nao tem nenhum anuncio.`);
      }
    });
    if (input.totalAds > limites.maxAnunciosPorCampanha) {
      push('max_anuncios_campanha', `Maximo de ${limites.maxAnunciosPorCampanha} anuncios por campanha.`, {
        solicitado: input.totalAds,
      });
    }
    if (input.campanhasCriadasHoje >= limites.maxCampanhasPorClientePorDia) {
      push(
        'max_campanhas_dia',
        `A cliente ja atingiu o limite de ${limites.maxCampanhasPorClientePorDia} campanhas criadas hoje.`,
        { criadasHoje: input.campanhasCriadasHoje },
      );
    }
    return findings;
  }

  // ------------------------------------------------------------- objetivos

  evaluateObjective(client: ClientRecord, objective: string, template: string): PolicyFinding[] {
    const findings: PolicyFinding[] = [];
    if (!this.policies.global.objetivosPermitidos.includes(objective)) {
      findings.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'objetivo_nao_permitido',
        mensagem: `Objetivo "${objective}" nao esta na lista permitida do sistema.`,
        detalhes: { permitidos: this.policies.global.objetivosPermitidos },
      });
    }
    if (!client.config.objetivosPermitidos.includes(objective)) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'objetivo_nao_permitido_para_cliente',
        mensagem: `Objetivo "${objective}" nao esta autorizado para a cliente "${client.config.id}".`,
        detalhes: { permitidos: client.config.objetivosPermitidos },
      });
    }
    if (!this.policies.global.modelosPermitidos.includes(template)) {
      findings.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'modelo_nao_permitido',
        mensagem: `Modelo de campanha "${template}" nao esta implementado ou nao e permitido.`,
        detalhes: { permitidos: this.policies.global.modelosPermitidos },
      });
    }
    if (!client.config.modelosPermitidos.includes(template)) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'modelo_nao_permitido_para_cliente',
        mensagem: `Modelo "${template}" nao esta autorizado para a cliente "${client.config.id}".`,
        detalhes: { permitidos: client.config.modelosPermitidos },
      });
    }
    return findings;
  }

  // ------------------------------------------------------- mudanca de budget

  evaluateBudgetChange(client: ClientRecord, input: BudgetChangeInput): PolicyFinding[] {
    const findings: PolicyFinding[] = [];
    const rules = this.policies.budget.alteracao;
    const currency = client.config.moeda;
    const push = (severidade: Severity, rule: string, mensagem: string, detalhes?: Record<string, unknown>) =>
      findings.push({ severidade, policy: 'budget-policy', rule, mensagem, detalhes });

    const delta = input.nextDailyCents - input.currentDailyCents;
    const percentual =
      input.currentDailyCents > 0 ? (Math.abs(delta) / input.currentDailyCents) * 100 : 100;

    if (delta === 0) {
      push('warn', 'sem_mudanca', 'O orcamento solicitado e igual ao atual.');
      return findings;
    }

    if (percentual > rules.percentualMaximoPorMudanca) {
      push(
        'block',
        'variacao_acima_do_limite',
        `Variacao de ${percentual.toFixed(1)}% excede o maximo de ${rules.percentualMaximoPorMudanca}% por alteracao.`,
        { percentual, maximo: rules.percentualMaximoPorMudanca },
      );
    }

    if (input.nextDailyCents > client.config.limites.diarioCents) {
      push(
        'block',
        'acima_do_limite_do_cliente',
        `Novo orcamento ${formatMoney(input.nextDailyCents, currency)} excede o limite diario da cliente.`,
        { limiteCents: client.config.limites.diarioCents },
      );
    }

    if (input.alteracoesNasUltimas24h >= rules.maxMudancasPorDia) {
      push(
        'block',
        'max_mudancas_dia',
        `Ja houve ${input.alteracoesNasUltimas24h} alteracao(oes) de orcamento nas ultimas 24h; o maximo e ${rules.maxMudancasPorDia}.`,
      );
    }

    if (input.ultimaAlteracaoIso) {
      const horas = (Date.now() - new Date(input.ultimaAlteracaoIso).getTime()) / 3_600_000;
      if (horas < rules.esperaMinimaEntreMudancasHoras) {
        push(
          'block',
          'espera_minima',
          `Faltam ${(rules.esperaMinimaEntreMudancasHoras - horas).toFixed(1)}h para a proxima alteracao permitida.`,
          { horasDesdeUltima: horas, esperaMinimaHoras: rules.esperaMinimaEntreMudancasHoras },
        );
      }
    }

    if (delta > 0 && rules.exigirAprovacaoParaAumento && !input.aprovado) {
      push('block', 'aumento_sem_aprovacao', 'Aumento de orcamento exige aprovacao valida registrada.');
    }

    if (delta < 0 && !rules.permitirReducaoSemAprovacao && !input.aprovado) {
      push('block', 'reducao_sem_aprovacao', 'Reducao de orcamento exige aprovacao valida registrada.');
    }

    return findings;
  }
}
