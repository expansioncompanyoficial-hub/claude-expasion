/**
 * Contrato do GESTOR IA.
 *
 * Toda saida e rotulada pela ORIGEM. Essa distincao e o centro do desenho: o
 * operador precisa saber, sem esforco, o que e numero vindo da Meta, o que e
 * conta que o sistema fez, o que e regra de gestor e o que e palpite.
 */
export type Origem =
  /** Numero que veio da Meta ou do cadastro. Nao foi inventado nem estimado. */
  | 'dado_real'
  /** Conta deterministica sobre dados reais. Reproduzivel. */
  | 'calculo'
  /** Regra de gestor de trafego aplicada ao contexto. */
  | 'recomendacao'
  /** Palpite a partir de contexto incompleto. O mais fraco de todos. */
  | 'inferencia';

export type Severidade = 'info' | 'recomendacao' | 'alerta' | 'bloqueio';

export interface Achado {
  readonly origem: Origem;
  readonly severidade: Severidade;
  readonly titulo: string;
  readonly detalhe: string;
  /** Dados que sustentam o achado. Vazio quando e regra pura. */
  readonly suporte?: Record<string, unknown>;
}

export interface EstruturaRecomendada {
  readonly conjuntos: number;
  readonly anunciosPorConjunto: number;
  readonly justificativa: string;
  readonly distribuicaoVerba: string;
}

export interface StrategyAdvice {
  readonly estrutura: EstruturaRecomendada;
  readonly metricaPrincipal: string;
  readonly metricasSecundarias: readonly string[];
  readonly oQueObservar: readonly string[];
  readonly achados: readonly Achado[];
  /** `pronta` · `atencao` · `bloqueada` */
  readonly veredito: 'pronta' | 'atencao' | 'bloqueada';
}

export interface AudienceAdvice {
  readonly achados: readonly Achado[];
  readonly sugestao: {
    readonly faixaEtaria: string;
    readonly generos: string;
    readonly interesses: readonly string[];
    readonly justificativa: string;
  };
}

export interface CopySuggestion {
  readonly ref: string;
  readonly titulo: string;
  readonly descricao: string;
  readonly texto: string;
  readonly modelo: string;
  readonly origem: Origem;
}

export interface CopyAdvice {
  readonly sugestoes: readonly CopySuggestion[];
  readonly achados: readonly Achado[];
  /** true quando veio de modelo de linguagem; false quando e template local. */
  readonly geradoPorModelo: boolean;
}

export interface CreativeAdvice {
  readonly arquivo: string;
  readonly achados: readonly Achado[];
  readonly compatibilidade: {
    readonly feed: boolean;
    readonly stories: boolean;
    readonly reels: boolean;
    readonly quadrado: boolean;
  };
  /** Analise que exigiria um modelo visual — declarada, nunca simulada. */
  readonly naoAvaliado: readonly string[];
}

/**
 * Porta do conselheiro. A implementacao deterministica cobre estrutura,
 * orcamento, publico e compatibilidade de criativo. Um adaptador de modelo
 * pode ser plugado depois sem que nenhuma tela mude.
 */
export interface CampaignAdvisor {
  readonly nome: string;
  readonly usaModelo: boolean;
}
