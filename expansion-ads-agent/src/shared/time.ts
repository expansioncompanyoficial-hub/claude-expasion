import { ValidationError } from './errors.js';

export type Clock = () => Date;

export const systemClock: Clock = () => new Date();

export function isoNow(clock: Clock = systemClock): string {
  return clock().toISOString();
}

export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 3_600_000);
}

export function isExpired(expiresAtIso: string, clock: Clock = systemClock): boolean {
  return new Date(expiresAtIso).getTime() <= clock().getTime();
}

/**
 * Aceita `AAAA-MM-DD` ou ISO completo e devolve ISO 8601 em UTC.
 * Datas apenas com dia sao ancoradas em 00:00 (inicio) ou 23:59 (fim).
 */
export function parseBriefDate(value: string, edge: 'start' | 'end'): string {
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const suffix = edge === 'start' ? 'T00:00:00Z' : 'T23:59:00Z';
    const parsed = new Date(`${trimmed}${suffix}`);
    if (Number.isNaN(parsed.getTime())) {
      throw new ValidationError(`Data invalida: ${value}.`);
    }
    return parsed.toISOString();
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    throw new ValidationError(
      `Data invalida: ${value}. Use AAAA-MM-DD ou ISO 8601 (ex.: 2026-09-01T09:00:00-03:00).`,
    );
  }
  return parsed.toISOString();
}

export function daysBetween(startIso: string, stopIso: string): number {
  const start = new Date(startIso).getTime();
  const stop = new Date(stopIso).getTime();
  return Math.max(0, (stop - start) / 86_400_000);
}

export function todayIso(clock: Clock = systemClock): string {
  return clock().toISOString().slice(0, 10);
}
