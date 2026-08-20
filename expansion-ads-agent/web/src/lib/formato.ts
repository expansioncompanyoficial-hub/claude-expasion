/** Formatação em pt-BR. Moeda padrão BRL; o fuso vem do cadastro da cliente. */

export function moeda(cents: number | null | undefined, codigo = 'BRL'): string {
  if (cents === null || cents === undefined || !Number.isFinite(cents)) return '—';
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: codigo }).format(
      cents / 100,
    );
  } catch {
    return `${codigo} ${(cents / 100).toFixed(2)}`;
  }
}

export function numero(valor: number | null | undefined, casas = 0): string {
  if (valor === null || valor === undefined || !Number.isFinite(valor)) return '—';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  }).format(valor);
}

export function percentual(valor: number | null | undefined, casas = 2): string {
  if (valor === null || valor === undefined || !Number.isFinite(valor)) return '—';
  return `${numero(valor, casas)}%`;
}

export function dataHora(iso: string | null | undefined, fuso?: string): string {
  if (!iso) return '—';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    ...(fuso ? { timeZone: fuso } : {}),
  }).format(data);
}

export function dataCurta(iso: string | null | undefined, fuso?: string): string {
  if (!iso) return '—';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    ...(fuso ? { timeZone: fuso } : {}),
  }).format(data);
}

/** "R$ 50,00" ou "50" -> 5000 centavos. */
export function paraCents(texto: string): number | null {
  const limpo = texto
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}\b)/g, '')
    .replace(',', '.');
  const valor = Number(limpo);
  return Number.isFinite(valor) ? Math.round(valor * 100) : null;
}

const ROTULO_ESTADO: Record<string, { texto: string; tom: string }> = {
  DRAFT: { texto: 'Rascunho', tom: 'neutro' },
  VALIDATING: { texto: 'Validando', tom: 'info' },
  VALIDATED: { texto: 'Validada', tom: 'info' },
  VALIDATION_FAILED: { texto: 'Validação reprovada', tom: 'erro' },
  CREATING: { texto: 'Criando', tom: 'info' },
  CREATED_PAUSED: { texto: 'Criada e pausada', tom: 'laranja' },
  CREATION_FAILED: { texto: 'Falha na criação', tom: 'erro' },
  WAITING_APPROVAL: { texto: 'Aguardando aprovação', tom: 'atencao' },
  APPROVED: { texto: 'Aprovada', tom: 'sucesso' },
  ACTIVATING: { texto: 'Ativando', tom: 'info' },
  ACTIVATION_FAILED: { texto: 'Falha na ativação', tom: 'erro' },
  ACTIVE: { texto: 'Ativa', tom: 'sucesso' },
  PAUSED: { texto: 'Pausada', tom: 'neutro' },
  COMPLETED: { texto: 'Encerrada', tom: 'neutro' },
};

export function estadoDaCampanha(estado: string): { texto: string; tom: string } {
  return ROTULO_ESTADO[estado] ?? { texto: estado, tom: 'neutro' };
}

const ROTULO_ORIGEM: Record<string, string> = {
  dado_real: 'dado real',
  calculo: 'cálculo',
  recomendacao: 'recomendação',
  inferencia: 'inferência',
};

export function rotuloOrigem(origem: string): string {
  return ROTULO_ORIGEM[origem] ?? origem;
}
