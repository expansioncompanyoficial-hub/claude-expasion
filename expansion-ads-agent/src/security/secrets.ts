/**
 * Registro central de segredos conhecidos em memoria.
 *
 * Nada aqui e persistido. O objetivo e permitir que o redator de logs
 * substitua ocorrencias literais de um token, mesmo quando ele aparece
 * dentro de uma URL, de um corpo de erro da Meta ou de um stack trace.
 */

const registry = new Set<string>();

/** Comprimento minimo para um valor ser tratado como segredo redigivel. */
const MIN_SECRET_LENGTH = 8;

export function registerSecret(value: string | undefined | null): void {
  if (!value) return;
  const trimmed = value.trim();
  if (trimmed.length < MIN_SECRET_LENGTH) return;
  registry.add(trimmed);
}

export function registeredSecrets(): readonly string[] {
  return [...registry];
}

export function clearSecrets(): void {
  registry.clear();
}

/** Mostra apenas o suficiente para o operador reconhecer o token, sem revela-lo. */
export function fingerprintSecret(value: string | undefined | null): string {
  if (!value) return '(ausente)';
  const trimmed = value.trim();
  if (trimmed.length <= 6) return '***';
  return `${trimmed.slice(0, 3)}***${trimmed.slice(-2)} (len=${trimmed.length})`;
}
