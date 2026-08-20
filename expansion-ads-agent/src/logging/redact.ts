import { registeredSecrets } from '../security/secrets.js';

export const REDACTED = '[REDIGIDO]';

/** Chaves cujo valor nunca pode aparecer em log, relatorio ou resposta MCP. */
const SENSITIVE_KEY_PATTERN =
  /(token|secret|password|passwd|senha|authorization|auth|credential|api[_-]?key|apikey|appsecret|proof|cookie|session|bearer|private[_-]?key)/i;

/**
 * Padroes de segredo reconheciveis mesmo sem estarem registrados:
 * - tokens de acesso da Meta (`EAA...`)
 * - `access_token=` / `appsecret_proof=` em query strings
 * - cabecalho Bearer
 */
const TOKEN_PATTERNS: readonly RegExp[] = [
  /\bEA[A-Za-z0-9_-]{20,}\b/g,
  /((?:access_token|appsecret_proof|client_secret|app_secret)=)[^&\s"']+/gi,
  /(Bearer\s+)[A-Za-z0-9._~+/-]{12,}=*/gi,
];

const MAX_DEPTH = 12;

function redactString(input: string): string {
  let output = input;

  for (const secret of registeredSecrets()) {
    if (secret && output.includes(secret)) {
      output = output.split(secret).join(REDACTED);
    }
  }

  for (const pattern of TOKEN_PATTERNS) {
    pattern.lastIndex = 0;
    output = output.replace(pattern, (match, prefix?: string) =>
      prefix ? `${prefix}${REDACTED}` : REDACTED,
    );
  }

  return output;
}

/**
 * Redige recursivamente qualquer estrutura antes de sair do processo.
 * Nunca lanca: falhar ao redigir nao pode derrubar o fluxo, mas tambem nao
 * pode deixar passar o valor original — no pior caso devolve `[irredigivel]`.
 */
export function redact<T>(value: T, depth = 0): T {
  try {
    return redactInternal(value, depth) as T;
  } catch {
    return '[irredigivel]' as unknown as T;
  }
}

function redactInternal(value: unknown, depth: number): unknown {
  if (depth > MAX_DEPTH) return '[profundidade-maxima]';
  if (value === null || value === undefined) return value;

  const type = typeof value;
  if (type === 'string') return redactString(value as string);
  if (type === 'number' || type === 'boolean' || type === 'bigint') return value;
  if (type === 'function') return '[function]';

  if (value instanceof Error) {
    return {
      name: value.name,
      message: redactString(value.message),
      ...(hasCode(value) ? { code: value.code } : {}),
    };
  }

  if (value instanceof Date) return value.toISOString();
  if (value instanceof URL) return redactString(value.toString());
  if (Array.isArray(value)) return value.map((item) => redactInternal(item, depth + 1));

  if (type === 'object') {
    const source = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(source)) {
      if (SENSITIVE_KEY_PATTERN.test(key)) {
        output[key] = entry === undefined || entry === null ? entry : REDACTED;
        continue;
      }
      output[key] = redactInternal(entry, depth + 1);
    }
    return output;
  }

  return String(value);
}

function hasCode(value: Error): value is Error & { code: string } {
  return typeof (value as { code?: unknown }).code === 'string';
}

/** Util para testes e para o hook PreToolUse: existe segredo aparente no texto? */
export function containsSecret(text: string): boolean {
  return redactString(text) !== text;
}
