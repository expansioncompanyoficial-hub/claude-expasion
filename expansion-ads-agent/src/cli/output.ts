import { redact } from '../logging/redact.js';
import { isAppError, toAppError } from '../shared/errors.js';

/** Codigos de saida estaveis — scripts podem depender deles. */
export const EXIT = {
  OK: 0,
  VALIDACAO: 2,
  POLITICA: 3,
  AUTORIZACAO: 4,
  APROVACAO: 5,
  DUPLICIDADE: 6,
  META: 7,
  CONFIG: 8,
  INTERNO: 1,
} as const;

const CODIGO_POR_CATEGORIA: Record<string, number> = {
  validation: EXIT.VALIDACAO,
  policy: EXIT.POLITICA,
  authorization: EXIT.AUTORIZACAO,
  approval: EXIT.APROVACAO,
  duplicate: EXIT.DUPLICIDADE,
  meta_api: EXIT.META,
  rate_limit: EXIT.META,
  config: EXIT.CONFIG,
  state: EXIT.VALIDACAO,
  not_found: EXIT.VALIDACAO,
  internal: EXIT.INTERNO,
};

export function titulo(texto: string): void {
  console.log(`\n${texto}`);
  console.log('─'.repeat(Math.min(texto.length, 76)));
}

export function linha(texto = ''): void {
  console.log(texto);
}

export function item(texto: string): void {
  console.log(`  • ${texto}`);
}

export function ok(texto: string): void {
  console.log(`  ✓ ${texto}`);
}

export function falha(texto: string): void {
  console.log(`  ✗ ${texto}`);
}

export function aviso(texto: string): void {
  console.log(`  ! ${texto}`);
}

export function json(valor: unknown): void {
  console.log(JSON.stringify(redact(valor), null, 2));
}

/** Imprime o erro de forma util e devolve o codigo de saida correspondente. */
function descreverProblema(problema: unknown): string {
  if (typeof problema === 'string') return problema;
  if (problema && typeof problema === 'object') {
    const registro = problema as Record<string, unknown>;
    const campo = registro.campo ?? registro.path ?? registro.field;
    const texto = registro.problema ?? registro.message ?? registro.mensagem;
    if (campo || texto) return `${campo ?? '?'}: ${texto ?? ''}`.trim();
  }
  return JSON.stringify(problema);
}

export function reportarErro(error: unknown): number {
  const appError = toAppError(error);

  titulo(`ERRO — ${appError.code}`);
  linha(`  ${appError.message}`);

  const detalhes = appError.details;
  if (Array.isArray(detalhes.camposFaltando)) {
    linha('');
    linha('  Campos obrigatorios ausentes:');
    for (const campo of detalhes.camposFaltando as string[]) item(campo);
  }
  if (Array.isArray(detalhes.problemas)) {
    linha('');
    linha('  Problemas:');
    for (const problema of detalhes.problemas as unknown[]) {
      item(descreverProblema(problema));
    }
  }
  if (Array.isArray(detalhes.bloqueios)) {
    linha('');
    linha('  Bloqueios de politica:');
    for (const bloqueio of detalhes.bloqueios as Array<{ policy: string; rule: string; mensagem: string }>) {
      item(`[${bloqueio.policy}/${bloqueio.rule}] ${bloqueio.mensagem}`);
    }
  }
  if (Array.isArray(detalhes.issues)) {
    linha('');
    for (const issue of detalhes.issues as Array<{ path?: string; campo?: string; message?: string; problema?: string }>) {
      item(`${issue.path ?? issue.campo ?? '?'}: ${issue.message ?? issue.problema ?? ''}`);
    }
  }
  if (Array.isArray(detalhes.duplicidades)) {
    linha('');
    linha('  Possiveis duplicidades:');
    for (const dup of detalhes.duplicidades as Array<Record<string, unknown>>) {
      item(`${dup.origem}: ${dup.motivo} (${dup.referencia})`);
    }
  }

  if (appError.remediation.length > 0 && !Array.isArray(detalhes.problemas)) {
    linha('');
    linha('  Como resolver:');
    for (const passo of appError.remediation) item(passo);
  }

  linha('');
  return isAppError(error) ? (CODIGO_POR_CATEGORIA[appError.category] ?? EXIT.INTERNO) : EXIT.INTERNO;
}
