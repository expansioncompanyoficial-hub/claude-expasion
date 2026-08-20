import { ValidationError } from './errors.js';

/**
 * A Meta trabalha com a menor unidade da moeda (centavos para BRL/USD).
 * Todo o sistema guarda inteiros em centavos e so converte na borda.
 */

/** Moedas sem subunidade (a Meta trata o valor como unidade inteira). */
const ZERO_DECIMAL_CURRENCIES = new Set(['JPY', 'KRW', 'CLP', 'VND', 'ISK', 'HUF', 'TWD']);

export function minorUnitFactor(currency: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase()) ? 1 : 100;
}

export function toMinorUnits(amount: number, currency: string): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new ValidationError(`Valor monetario invalido: ${amount}.`);
  }
  const factor = minorUnitFactor(currency);
  return Math.round(amount * factor);
}

export function fromMinorUnits(amount: number, currency: string): number {
  return amount / minorUnitFactor(currency);
}

export function formatMoney(minorUnits: number, currency: string): string {
  const value = fromMinorUnits(minorUnits, currency);
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}
