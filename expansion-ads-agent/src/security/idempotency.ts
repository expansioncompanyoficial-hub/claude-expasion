import { stableHash } from '../shared/ids.js';

export interface CampaignIdempotencyInput {
  readonly clientId: string;
  readonly adAccountId: string;
  readonly internalName: string;
  readonly template: string;
  /** Dia de referencia (AAAA-MM-DD) — duas campanhas iguais em dias diferentes sao distintas. */
  readonly dia: string;
  readonly briefHash: string;
  readonly creativesHash: string;
}

/**
 * Chave de idempotencia da campanha.
 *
 * Mesma cliente + mesma conta + mesmo nome + mesmo tipo + mesmo dia + mesmo
 * briefing + mesmos criativos = mesma chave. Duas execucoes do mesmo comando
 * nao criam duas campanhas.
 */
export function campaignIdempotencyKey(input: CampaignIdempotencyInput): string {
  return `cmp:${stableHash(input)}`;
}

/** Chave derivada para conjuntos, criativos e anuncios dentro da campanha. */
export function childIdempotencyKey(
  parentKey: string,
  kind: 'adset' | 'creative' | 'ad',
  ref: string,
  payload?: unknown,
): string {
  return `${kind}:${stableHash({ parentKey, kind, ref, payload: payload ?? null })}`;
}

export function creativesHash(entries: ReadonlyArray<{ arquivo: string; hash: string }>): string {
  const ordenado = [...entries]
    .map((entry) => ({ arquivo: entry.arquivo, hash: entry.hash }))
    .sort((a, b) => a.arquivo.localeCompare(b.arquivo));
  return stableHash(ordenado);
}
