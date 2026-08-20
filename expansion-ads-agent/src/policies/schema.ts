import { z } from 'zod';

export const globalPolicySchema = z.object({
  version: z.string(),
  descricao: z.string().optional(),
  criacao: z.object({
    statusInicialObrigatorio: z.literal('PAUSED'),
    exigirDryRunAntesDeCriar: z.boolean(),
    exigirConfirmacaoNaMetaDepoisDeCriar: z.boolean(),
    maxConjuntosPorCampanha: z.number().int().positive(),
    maxAnunciosPorConjunto: z.number().int().positive(),
    maxAnunciosPorCampanha: z.number().int().positive(),
    maxCampanhasPorClientePorDia: z.number().int().positive(),
  }),
  objetivosPermitidos: z.array(z.string()).min(1),
  modelosPermitidos: z.array(z.string()).min(1),
  destinos: z.object({
    exigirUrlNaAllowlistDoCliente: z.boolean(),
    exigirHttps: z.boolean(),
    bloquearEncurtadores: z.boolean(),
    encurtadoresBloqueados: z.array(z.string()),
  }),
  criativos: z.object({
    extensoesImagemPermitidas: z.array(z.string()).min(1),
    extensoesVideoPermitidas: z.array(z.string()).min(1),
    tamanhoMaximoImagemBytes: z.number().int().positive(),
    tamanhoMaximoVideoBytes: z.number().int().positive(),
    larguraMinimaImagem: z.number().int().positive(),
    alturaMinimaImagem: z.number().int().positive(),
    exigirHashUnicoPorCliente: z.boolean(),
    alterarArquivosAutomaticamente: z.literal(false),
  }),
  copy: z.object({
    maxCaracteresTitulo: z.number().int().positive(),
    maxCaracteresDescricao: z.number().int().positive(),
    maxCaracteresTextoPrincipal: z.number().int().positive(),
    titulosRecomendadosMaxCaracteres: z.number().int().positive(),
    proibirEmojiNoTitulo: z.boolean(),
  }),
  operacoesProibidas: z.array(z.string()),
  seguranca: z.object({
    exigirContaNaAllowlistDoCliente: z.boolean(),
    bloquearClienteInativo: z.boolean(),
    exigirTokenApenasEmVariavelDeAmbiente: z.boolean(),
  }),
});

export const budgetPolicySchema = z.object({
  version: z.string(),
  descricao: z.string().optional(),
  minimoDiarioPorMoedaCents: z.record(z.string(), z.number().int().nonnegative()),
  tetoDiarioAbsolutoCents: z.number().int().positive(),
  tetoMensalAbsolutoCents: z.number().int().positive(),
  exigirLimiteDiarioNoCliente: z.boolean(),
  exigirOrcamentoTotalQuandoHaDataDeEncerramento: z.boolean(),
  toleranciaPercentualEntreAprovadoEExecutado: z.number().min(0).max(100),
  alteracao: z.object({
    percentualMaximoPorMudanca: z.number().min(0).max(100),
    esperaMinimaEntreMudancasHoras: z.number().min(0),
    maxMudancasPorDia: z.number().int().min(0),
    exigirAprovacaoParaAumento: z.boolean(),
    permitirReducaoSemAprovacao: z.boolean(),
  }),
  somaDiariaMaximaPorClienteCents: z.number().int().positive().nullable(),
});

export const approvalPolicySchema = z.object({
  version: z.string(),
  descricao: z.string().optional(),
  validadeHorasPadrao: z.number().int().positive(),
  validadeHorasMaxima: z.number().int().positive(),
  usoUnico: z.boolean(),
  exigirIdsMetaConfirmados: z.boolean(),
  exigirFingerprintIgual: z.boolean(),
  exigirCampanhaPausadaNaMeta: z.boolean(),
  aprovadoresPermitidos: z.array(z.string()),
  exigirAprovadorRegistrado: z.boolean(),
  camposDoFingerprint: z.array(z.string()).min(1),
});

export const optimizationPolicySchema = z.object({
  version: z.string(),
  descricao: z.string().optional(),
  acoesAutomaticas: z.object({
    pausar: z.boolean(),
    escalar: z.boolean(),
    reativar: z.boolean(),
  }),
  guardas: z.object({
    janelaAnaliseDias: z.number().int().positive(),
    investimentoMinimoCents: z.number().int().nonnegative(),
    resultadosMinimos: z.number().int().nonnegative(),
    impressoesMinimas: z.number().int().nonnegative(),
    idadeMinimaDaCampanhaHoras: z.number().int().nonnegative(),
    limiteAlteracaoPercentual: z.number().min(0).max(100),
    esperaMinimaEntreAlteracoesHoras: z.number().min(0),
    maxAlteracoesDiarias: z.number().int().min(0),
    orcamentoDiarioMaximoCents: z.number().int().positive().nullable(),
    exigirAprovacao: z.boolean(),
    exigirDadosCompletos: z.boolean(),
  }),
  regras: z
    .array(
      z.object({
        id: z.string(),
        quando: z.string(),
        acao: z.enum([
          'MANTER',
          'PAUSAR',
          'REDUZIR',
          'ESCALAR',
          'NOVA_VARIACAO',
          'REVISAR_CRIATIVO',
          'REVISAR_PUBLICO',
        ]),
        motivo: z.string(),
      }),
    )
    .min(1),
});

export type GlobalPolicy = z.infer<typeof globalPolicySchema>;
export type BudgetPolicy = z.infer<typeof budgetPolicySchema>;
export type ApprovalPolicy = z.infer<typeof approvalPolicySchema>;
export type OptimizationPolicy = z.infer<typeof optimizationPolicySchema>;

export interface PolicyBundle {
  readonly global: GlobalPolicy;
  readonly budget: BudgetPolicy;
  readonly approval: ApprovalPolicy;
  readonly optimization: OptimizationPolicy;
}
