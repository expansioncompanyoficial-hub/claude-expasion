import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';

/** Identificador interno legivel: `cmp_2026-08-20_a1b2c3d4`. */
export function newId(prefix: string, now: Date = new Date()): string {
  const day = now.toISOString().slice(0, 10);
  return `${prefix}_${day}_${randomBytes(4).toString('hex')}`;
}

export function uuid(): string {
  return randomUUID();
}

export function sha256Hex(input: string | Uint8Array): string {
  return createHash('sha256').update(input).digest('hex');
}

/** Hash estavel de um objeto: chaves ordenadas recursivamente. */
export function stableHash(value: unknown): string {
  return sha256Hex(stableStringify(value));
}

export function stableStringify(value: unknown): string {
  return JSON.stringify(sortDeep(value));
}

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const source = value as Record<string, unknown>;
    return Object.keys(source)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortDeep(source[key]);
        return acc;
      }, {});
  }
  if (value instanceof Date) return value.toISOString();
  return value;
}

/** Token de aprovacao: alto entropia, legivel, sem ambiguidade visual. */
export function newApprovalToken(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(20);
  let out = '';
  for (const byte of bytes) out += alphabet[byte % alphabet.length];
  return `APV-${out.slice(0, 5)}-${out.slice(5, 10)}-${out.slice(10, 15)}-${out.slice(15, 20)}`;
}

/** Comparacao de tokens resistente a timing attack. */
export function safeEquals(a: string, b: string): boolean {
  const bufferA = Buffer.from(a, 'utf8');
  const bufferB = Buffer.from(b, 'utf8');
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}
