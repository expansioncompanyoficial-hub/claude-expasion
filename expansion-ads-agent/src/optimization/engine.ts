import type { OptimizationPolicy } from '../policies/schema.js';
import type { NormalizedMetrics } from '../reports/insights.js';

export type OptimizationAction =
  | 'MANTER'
  | 'PAUSAR'
  | 'REDUZIR'
  | 'ESCALAR'
  | 'NOVA_VARIACAO'
  | 'REVISAR_CRIATIVO'
  | 'REVISAR_PUBLICO';

export type Confidence = 'alta' | 'media' | 'baixa';

export interface OptimizationInput {
  readonly objetoId: string;
  readonly objetoTipo: 'campaign' | 'adset' | 'ad';
  readonly objetivo: string;
  readonly metrics: NormalizedMetrics;
  readonly moeda: string;
  readonly metaTipo: 'CPL' | 'CPA' | 'ROAS' | 'VENDAS' | 'CONVERSAS' | null;
  readonly metaValor: number | null;
  readonly horasDesdeAtivacao: number;
  readonly orcamentoDiarioAtualCents: number | null;
  readonly alteracoesNasUltimas24h: number;
  readonly ultimaAlteracaoIso: string | null;
}

export interface Recommendation {
  readonly objetoId: string;
  readonly objetoTipo: string;
  readonly acao: OptimizationAction;
  readonly confianca: Confidence;
  readonly motivos: string[];
  /** Guardas que impedem aplicar isso automaticamente. Vazio nao significa "pode": ver `automatizavel`. */
  readonly bloqueadoPor: string[];
  readonly automatizavel: boolean;
  readonly sugestaoOrcamentoCents: number | null;
}

/**
 * Motor de recomendacao.
 *
 * Ele NUNCA aplica nada. Devolve recomendacao + a lista de guardas que ainda
 * impedem a aplicacao automatica. Quem aplica e o operador, com aprovacao.
 */
export class OptimizationEngine {
  constructor(
    private readonly policy: OptimizationPolicy,
    private readonly flags: {
      autoPauseEnabled: boolean;
      autoScaleEnabled: boolean;
      autoReactivateEnabled: boolean;
    },
  ) {}

  avaliar(input: OptimizationInput): Recommendation {
    const guardas = this.policy.guardas;
    const bloqueadoPor = this.checarGuardas(input);
    const motivos: string[] = [];
    const { metrics } = input;

    const resultados = this.resultadoPrincipal(input);
    const custoPorResultado = this.custoPorResultado(input);
    const metaCusto = this.metaEmMoeda(input);

    let acao: OptimizationAction = 'MANTER';
    let confianca: Confidence = 'baixa';
    let sugestaoOrcamentoCents: number | null = null;

    // Regra 1 — sem entrega.
    if ((metrics.impressoes ?? 0) === 0 && input.horasDesdeAtivacao >= 24) {
      return {
        objetoId: input.objetoId,
        objetoTipo: input.objetoTipo,
        acao: 'REVISAR_CRIATIVO',
        confianca: 'alta',
        motivos: [
          'Ativo ha mais de 24h sem nenhuma impressao.',
          'Verifique reprovacao de anuncio, publico pequeno demais ou lance insuficiente.',
        ],
        bloqueadoPor,
        automatizavel: false,
        sugestaoOrcamentoCents: null,
      };
    }

    // Regra 2 — entrega sem resultado.
    if ((metrics.impressoes ?? 0) >= guardas.impressoesMinimas && (resultados ?? 0) === 0) {
      return {
        objetoId: input.objetoId,
        objetoTipo: input.objetoTipo,
        acao: 'REVISAR_PUBLICO',
        confianca: 'media',
        motivos: [
          `${Math.round(metrics.impressoes ?? 0)} impressoes sem nenhum resultado.`,
          'Sugere desalinhamento entre publico, oferta e destino.',
        ],
        bloqueadoPor,
        automatizavel: false,
        sugestaoOrcamentoCents: null,
      };
    }

    // Regra 3 — CTR baixo com volume.
    if ((metrics.impressoes ?? 0) >= guardas.impressoesMinimas && (metrics.ctr ?? 100) < 0.5) {
      motivos.push(`CTR de ${(metrics.ctr ?? 0).toFixed(2)}% com volume de impressoes suficiente.`);
      acao = 'REVISAR_CRIATIVO';
      confianca = 'media';
    }

    // Regra 4 — frequencia alta.
    if ((metrics.frequencia ?? 0) >= 3) {
      motivos.push(`Frequencia em ${(metrics.frequencia ?? 0).toFixed(2)}: sinal de desgaste do criativo.`);
      acao = 'NOVA_VARIACAO';
      confianca = 'media';
    }

    // Regras 5-7 — comparacao com a meta, so com volume suficiente.
    if (metaCusto !== null && custoPorResultado !== null && (resultados ?? 0) >= guardas.resultadosMinimos) {
      if (input.metaTipo === 'ROAS') {
        const roas = metrics.roas;
        if (roas !== null && roas < metaCusto) {
          acao = 'REDUZIR';
          confianca = 'alta';
          motivos.push(`ROAS ${roas.toFixed(2)} abaixo da meta ${metaCusto.toFixed(2)}.`);
          sugestaoOrcamentoCents = this.ajustar(input, -guardas.limiteAlteracaoPercentual);
        } else if (roas !== null && roas >= metaCusto * 1.3) {
          acao = 'ESCALAR';
          confianca = 'alta';
          motivos.push(`ROAS ${roas.toFixed(2)} acima da meta com folga.`);
          sugestaoOrcamentoCents = this.ajustar(input, guardas.limiteAlteracaoPercentual);
        } else {
          acao = 'MANTER';
          confianca = 'media';
          motivos.push('ROAS dentro da faixa da meta.');
        }
      } else if (custoPorResultado > metaCusto * 1.5) {
        acao = 'PAUSAR';
        confianca = 'alta';
        motivos.push(
          `Custo por resultado ${custoPorResultado.toFixed(2)} esta 50%+ acima da meta ${metaCusto.toFixed(2)}.`,
        );
      } else if (custoPorResultado > metaCusto * 1.2) {
        acao = 'REDUZIR';
        confianca = 'media';
        motivos.push(
          `Custo por resultado ${custoPorResultado.toFixed(2)} acima da meta ${metaCusto.toFixed(2)}.`,
        );
        sugestaoOrcamentoCents = this.ajustar(input, -guardas.limiteAlteracaoPercentual);
      } else if (
        custoPorResultado <= metaCusto * 0.7 &&
        (resultados ?? 0) >= guardas.resultadosMinimos * 2
      ) {
        acao = 'ESCALAR';
        confianca = 'alta';
        motivos.push(
          `Custo por resultado ${custoPorResultado.toFixed(2)} bem abaixo da meta, com volume consistente.`,
        );
        sugestaoOrcamentoCents = this.ajustar(input, guardas.limiteAlteracaoPercentual);
      } else if (custoPorResultado <= metaCusto) {
        acao = 'MANTER';
        confianca = 'alta';
        motivos.push('Desempenho dentro da meta. Nao mexer.');
      }
    } else if (motivos.length === 0) {
      motivos.push(
        `Dados insuficientes para julgar desempenho (${resultados ?? 0} resultado(s), minimo ${guardas.resultadosMinimos}).`,
      );
      acao = 'MANTER';
      confianca = 'baixa';
    }

    return {
      objetoId: input.objetoId,
      objetoTipo: input.objetoTipo,
      acao,
      confianca,
      motivos,
      bloqueadoPor,
      automatizavel: this.podeAutomatizar(acao, bloqueadoPor),
      sugestaoOrcamentoCents,
    };
  }

  /** Guardas de dados e de ritmo. Enquanto houver item aqui, nada e automatico. */
  private checarGuardas(input: OptimizationInput): string[] {
    const guardas = this.policy.guardas;
    const bloqueios: string[] = [];
    const investimentoCents = Math.round((input.metrics.investimento ?? 0) * 100);

    if (investimentoCents < guardas.investimentoMinimoCents) {
      bloqueios.push(
        `Investimento acumulado abaixo do minimo de analise (${guardas.investimentoMinimoCents} centavos).`,
      );
    }
    if ((this.resultadoPrincipal(input) ?? 0) < guardas.resultadosMinimos) {
      bloqueios.push(`Menos de ${guardas.resultadosMinimos} resultado(s) na janela.`);
    }
    if (input.horasDesdeAtivacao < guardas.idadeMinimaDaCampanhaHoras) {
      bloqueios.push(
        `Campanha com ${input.horasDesdeAtivacao.toFixed(0)}h de vida; minimo ${guardas.idadeMinimaDaCampanhaHoras}h.`,
      );
    }
    if (input.alteracoesNasUltimas24h >= guardas.maxAlteracoesDiarias) {
      bloqueios.push(`Limite de ${guardas.maxAlteracoesDiarias} alteracao(oes) por dia ja atingido.`);
    }
    if (input.ultimaAlteracaoIso) {
      const horas = (Date.now() - new Date(input.ultimaAlteracaoIso).getTime()) / 3_600_000;
      if (horas < guardas.esperaMinimaEntreAlteracoesHoras) {
        bloqueios.push(
          `Faltam ${(guardas.esperaMinimaEntreAlteracoesHoras - horas).toFixed(1)}h de espera desde a ultima alteracao.`,
        );
      }
    }
    if (guardas.exigirDadosCompletos && input.metrics.indisponiveis.length > 0) {
      bloqueios.push(
        `Metricas ausentes no periodo: ${input.metrics.indisponiveis.join(', ')}.`,
      );
    }
    if (guardas.exigirAprovacao) {
      bloqueios.push('A politica exige aprovacao humana para qualquer alteracao.');
    }
    return bloqueios;
  }

  private podeAutomatizar(acao: OptimizationAction, bloqueios: readonly string[]): boolean {
    if (bloqueios.length > 0) return false;
    if (acao === 'PAUSAR') return this.policy.acoesAutomaticas.pausar && this.flags.autoPauseEnabled;
    if (acao === 'ESCALAR') return this.policy.acoesAutomaticas.escalar && this.flags.autoScaleEnabled;
    return false;
  }

  private ajustar(input: OptimizationInput, percentual: number): number | null {
    if (input.orcamentoDiarioAtualCents === null) return null;
    const guardas = this.policy.guardas;
    const alvo = Math.round(input.orcamentoDiarioAtualCents * (1 + percentual / 100));
    if (guardas.orcamentoDiarioMaximoCents !== null) {
      return Math.min(alvo, guardas.orcamentoDiarioMaximoCents);
    }
    return alvo;
  }

  private resultadoPrincipal(input: OptimizationInput): number | null {
    const { metrics, objetivo } = input;
    if (objetivo === 'OUTCOME_SALES') return metrics.compras;
    if (objetivo === 'OUTCOME_LEADS') return metrics.leads ?? metrics.conversas;
    if (objetivo === 'OUTCOME_TRAFFIC') return metrics.cliquesNoLink;
    return metrics.impressoes;
  }

  private custoPorResultado(input: OptimizationInput): number | null {
    const { metrics, objetivo } = input;
    if (objetivo === 'OUTCOME_SALES') return metrics.cpa;
    if (objetivo === 'OUTCOME_LEADS') return metrics.cpl;
    if (objetivo === 'OUTCOME_TRAFFIC') return metrics.cpc;
    return metrics.cpm;
  }

  private metaEmMoeda(input: OptimizationInput): number | null {
    if (input.metaValor === null || input.metaTipo === null) return null;
    if (input.metaTipo === 'VENDAS' || input.metaTipo === 'CONVERSAS') return null;
    return input.metaValor;
  }
}
