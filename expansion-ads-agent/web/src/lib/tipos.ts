/** Formatos devolvidos pela API. Espelham src/api/routes no backend. */

export type Papel = 'visualizador' | 'operador' | 'gestor' | 'admin';

export interface Usuario {
  usuarioId: string;
  email: string;
  nome: string;
  papel: Papel;
}

export interface Cliente {
  id: string;
  nome: string;
  status: 'active' | 'inactive';
  exemplo: boolean;
  conta: string;
  businessId: string | null;
  pageId: string;
  instagramId: string | null;
  pixelId: string | null;
  whatsapp: string | null;
  dominio: string | null;
  urlsPermitidas: string[];
  moeda: string;
  fusoHorario: string;
  limites: { diarioCents: number; mensalCents: number };
  objetivosPermitidos: string[];
  modelosPermitidos: string[];
  metas: { cpaCents: number | null; cplCents: number | null; roas: number | null } | null;
  observacoes: string | null;
  campanhas?: { total: number; ativas: number };
}

export interface ObjetivoComercial {
  id: string;
  rotulo: string;
  descricao: string;
  modelo: string | null;
  disponivel: boolean;
  indisponivelPorque?: string;
  tecnico: {
    objective: string;
    destinationType: string;
    optimizationGoal: string;
    billingEvent: string;
    callToAction: string;
    requisitosDoCliente: string[];
  } | null;
}

export interface ModeloCampanha {
  id: string;
  nome: string;
  descricao: string;
  objective: string;
  destinationType: string;
  optimizationGoal: string;
  billingEvent: string;
  callToAction: string;
  requisitosDoCliente: string[];
}

export interface Campanha {
  id: string;
  cliente: string;
  nome: string;
  modelo: string;
  objetivo: string;
  estado: string;
  estadoLegivel: string;
  metaCampaignId: string | null;
  metaStatus: string | null;
  orcamentoDiarioCents: number | null;
  orcamentoTotalCents: number | null;
  moeda: string;
  inicio: string | null;
  fim: string | null;
  dryRun: boolean;
  ultimoErro: string | null;
  criadaEm: string;
  atualizadaEm: string;
}

export type Origem = 'dado_real' | 'calculo' | 'recomendacao' | 'inferencia';
export type Severidade = 'info' | 'recomendacao' | 'alerta' | 'bloqueio';

export interface Achado {
  origem: Origem;
  severidade: Severidade;
  titulo: string;
  detalhe: string;
  suporte?: Record<string, unknown>;
}

export interface AnaliseCriativo {
  arquivo: string;
  achados: Achado[];
  compatibilidade: { feed: boolean; stories: boolean; reels: boolean; quadrado: boolean };
  naoAvaliado: string[];
}

export interface Criativo {
  arquivo: string;
  tipo: string;
  mime?: string;
  bytes: number;
  tamanhoLegivel: string;
  hash: string;
  largura: number | null;
  altura: number | null;
  proporcao?: number | null;
  integro: boolean;
  problema: string | null;
  analise: AnaliseCriativo;
  usadoEm?: string[];
}

export interface Metricas {
  objetoId: string;
  objetoTipo: string;
  nome: string | null;
  investimentoCents?: number | null;
  alcance?: number | null;
  impressoes?: number | null;
  frequencia?: number | null;
  cpmCents?: number | null;
  cliques?: number | null;
  ctr?: number | null;
  cpcCents?: number | null;
  conversas?: number | null;
  leads?: number | null;
  compras?: number | null;
  receitaCents?: number | null;
  roas?: number | null;
  custoPorResultadoCents?: number | null;
  [chave: string]: unknown;
}

export interface EstadoMeta {
  ok: boolean;
  dryRun: boolean;
  versaoApi: string;
  credencialConfigurada: boolean;
  impressaoDigital: string;
  contas: Array<{ id: string; nome: string | null; moeda: string | null }>;
  problemas: string[];
}
