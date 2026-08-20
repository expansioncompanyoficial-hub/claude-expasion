import type { Criativo } from '../lib/tipos';

/**
 * Estado do assistente.
 *
 * O formulário monta exatamente os campos do briefing canônico do backend. A
 * serialização para markdown acontece no servidor — a tela nunca inventa
 * estrutura de campanha.
 */

export interface CopyForm {
  ref: string;
  titulo: string;
  descricao: string;
  texto: string;
  criativo: string;
}

export interface EstadoAssistente {
  etapa: number;
  cliente: string;
  objetivoComercial: string;
  modelo: string;
  nomeCampanha: string;
  objetivoDescricao: string;
  produtoOferta: string;
  publico: string;
  diferenciais: string;
  provas: string;
  restricoes: string;
  observacoes: string;
  remarketing: boolean;
  destino: string;
  whatsapp: string;
  mensagemWhatsapp: string;
  url: string;
  pixelId: string;
  evento: string;
  formularioId: string;
  criativos: Criativo[];
  copies: CopyForm[];
  regioes: string;
  faixaEtaria: string;
  generos: string;
  interesses: string;
  orcamentoDiario: string;
  orcamentoTotal: string;
  dataInicio: string;
  dataEncerramento: string;
  meta: string;
}

export const ETAPAS = [
  { numero: 1, titulo: 'Cliente', descricao: 'Em qual conta a campanha vai rodar' },
  { numero: 2, titulo: 'Objetivo', descricao: 'O que a campanha precisa gerar' },
  { numero: 3, titulo: 'Estratégia', descricao: 'Oferta, diferencial e prova' },
  { numero: 4, titulo: 'Destino', descricao: 'Para onde a pessoa vai' },
  { numero: 5, titulo: 'Criativos', descricao: 'Imagens e vídeos' },
  { numero: 6, titulo: 'Copy', descricao: 'Texto, título e chamada' },
  { numero: 7, titulo: 'Público', descricao: 'Quem vai ver' },
  { numero: 8, titulo: 'Posicionamentos', descricao: 'Onde o anúncio aparece' },
  { numero: 9, titulo: 'Orçamento', descricao: 'Quanto e por quanto tempo' },
  { numero: 10, titulo: 'Revisão', descricao: 'Conferir, validar e criar' },
] as const;

export function estadoInicial(cliente = ''): EstadoAssistente {
  const hoje = new Date();
  const inicio = new Date(hoje.getTime() + 86_400_000);
  return {
    etapa: 1,
    cliente,
    objetivoComercial: '',
    modelo: '',
    nomeCampanha: '',
    objetivoDescricao: '',
    produtoOferta: '',
    publico: '',
    diferenciais: '',
    provas: '',
    restricoes: '',
    observacoes: '',
    remarketing: false,
    destino: '',
    whatsapp: '',
    mensagemWhatsapp: '',
    url: '',
    pixelId: '',
    evento: '',
    formularioId: '',
    criativos: [],
    copies: [],
    regioes: 'BR',
    faixaEtaria: '25-45',
    generos: 'todos',
    interesses: '',
    orcamentoDiario: '',
    orcamentoTotal: '',
    dataInicio: inicio.toISOString().slice(0, 10),
    dataEncerramento: '',
    meta: '',
  };
}

const CHAVE_RASCUNHO = 'expansion.rascunho';

export function salvarRascunho(estado: EstadoAssistente): void {
  try {
    // Criativos guardam apenas metadado; o arquivo já está no servidor.
    localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(estado));
  } catch {
    /* modo privado ou cota cheia: o rascunho apenas não persiste */
  }
}

export function lerRascunho(): EstadoAssistente | null {
  try {
    const bruto = localStorage.getItem(CHAVE_RASCUNHO);
    if (!bruto) return null;
    const dados = JSON.parse(bruto) as Partial<EstadoAssistente>;
    if (!dados || typeof dados !== 'object') return null;
    return { ...estadoInicial(), ...dados };
  } catch {
    return null;
  }
}

export function limparRascunho(): void {
  try {
    localStorage.removeItem(CHAVE_RASCUNHO);
  } catch {
    /* ignora */
  }
}

function linhas(texto: string): string[] {
  return texto
    .split('\n')
    .map((l) => l.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);
}

/** Converte o estado da tela no formulário que a API espera. */
export function paraFormularioApi(estado: EstadoAssistente): Record<string, unknown> {
  return {
    cliente: estado.cliente,
    nome_campanha: estado.nomeCampanha,
    modelo: estado.modelo,
    objetivo_comercial: estado.objetivoDescricao,
    produto_oferta: estado.produtoOferta,
    publico: estado.publico,
    regioes: estado.regioes,
    faixa_etaria: estado.faixaEtaria,
    generos: estado.generos,
    ...(estado.interesses.trim() ? { interesses: estado.interesses } : {}),
    ...(estado.orcamentoDiario.trim() ? { orcamento_diario: estado.orcamentoDiario } : {}),
    ...(estado.orcamentoTotal.trim() ? { orcamento_total: estado.orcamentoTotal } : {}),
    data_inicio: estado.dataInicio,
    ...(estado.dataEncerramento ? { data_encerramento: estado.dataEncerramento } : {}),
    destino: estado.destino,
    ...(estado.whatsapp.trim() ? { whatsapp: estado.whatsapp } : {}),
    ...(estado.mensagemWhatsapp.trim() ? { mensagem_whatsapp: estado.mensagemWhatsapp } : {}),
    ...(estado.url.trim() ? { url: estado.url } : {}),
    ...(estado.pixelId.trim() ? { pixel_id: estado.pixelId } : {}),
    ...(estado.evento.trim() ? { evento: estado.evento } : {}),
    ...(estado.formularioId.trim() ? { formulario_id: estado.formularioId } : {}),
    ...(estado.meta.trim() ? { meta: estado.meta } : {}),
    criativos: estado.criativos.map((c) => c.arquivo),
    copies: estado.copies,
    diferenciais: linhas(estado.diferenciais),
    provas: linhas(estado.provas),
    restricoes: linhas(estado.restricoes),
    observacoes: linhas(estado.observacoes),
  };
}

/** O que ainda falta para a etapa poder avançar. Vazio = pode seguir. */
export function pendenciasDaEtapa(estado: EstadoAssistente, etapa: number): string[] {
  const faltas: string[] = [];

  switch (etapa) {
    case 1:
      if (!estado.cliente) faltas.push('Selecione a cliente.');
      break;
    case 2:
      if (!estado.objetivoComercial) faltas.push('Escolha o objetivo comercial.');
      if (!estado.modelo) faltas.push('O objetivo escolhido não tem modelo disponível.');
      break;
    case 3:
      if (estado.nomeCampanha.trim().length < 3) faltas.push('Dê um nome à campanha.');
      if (estado.objetivoDescricao.trim().length < 10)
        faltas.push('Descreva o objetivo comercial em uma frase.');
      if (estado.produtoOferta.trim().length < 5) faltas.push('Informe o produto ou a oferta.');
      break;
    case 4:
      if (!estado.destino) faltas.push('Escolha o destino.');
      if (estado.destino === 'whatsapp' && !estado.whatsapp.trim())
        faltas.push('Informe o número de WhatsApp.');
      if (estado.destino === 'site' && !estado.url.trim()) faltas.push('Informe a URL de destino.');
      if (estado.destino === 'formulario' && !estado.formularioId.trim())
        faltas.push('Informe o ID do formulário.');
      break;
    case 5:
      if (estado.criativos.length === 0) faltas.push('Envie pelo menos um criativo.');
      break;
    case 6:
      if (estado.copies.length === 0) faltas.push('Escreva pelo menos uma copy.');
      estado.copies.forEach((copy, i) => {
        if (!copy.titulo.trim()) faltas.push(`Copy ${i + 1}: falta o título.`);
        if (!copy.descricao.trim()) faltas.push(`Copy ${i + 1}: falta a descrição.`);
        if (!copy.texto.trim()) faltas.push(`Copy ${i + 1}: falta o texto principal.`);
        if (!copy.criativo) faltas.push(`Copy ${i + 1}: associe um criativo.`);
      });
      break;
    case 7:
      if (!estado.regioes.trim()) faltas.push('Informe ao menos uma região.');
      if (!/^\d{2}\s*[-a]\s*\d{2}$/.test(estado.faixaEtaria.trim()))
        faltas.push('A faixa etária deve seguir o formato 25-45.');
      break;
    case 9:
      if (!estado.orcamentoDiario.trim() && !estado.orcamentoTotal.trim())
        faltas.push('Informe o orçamento diário ou o total.');
      if (!estado.dataInicio) faltas.push('Informe a data de início.');
      // `meta` está em CAMPOS_OBRIGATORIOS no backend. Sem esta checagem, o
      // operador preenchia as dez etapas para só então descobrir que faltava.
      if (!estado.meta.trim())
        faltas.push('Informe a meta de resultado (ex.: CPL: 25). O backend exige.');
      break;
    default:
      break;
  }

  return faltas;
}
