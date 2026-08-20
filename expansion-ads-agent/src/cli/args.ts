import { parseArgs } from 'node:util';
import { ValidationError } from '../shared/errors.js';

export interface ParsedCli {
  readonly comando: string;
  readonly flags: Record<string, string | boolean>;
  readonly posicionais: string[];
}

const BOOLEAN_FLAGS = new Set([
  'help',
  'json',
  'confirmar-duplicidade',
  'confirmar',
  'sem-meta',
  'verbose',
  'yes',
]);

export function parseCli(argv: readonly string[]): ParsedCli {
  const [comando, ...resto] = argv;
  if (!comando) {
    return { comando: 'help', flags: {}, posicionais: [] };
  }

  const options: Record<string, { type: 'string' | 'boolean' }> = {};
  for (const token of resto) {
    const match = /^--([a-z0-9-]+)(=.*)?$/i.exec(token);
    if (!match) continue;
    const nome = match[1]!;
    options[nome] = { type: BOOLEAN_FLAGS.has(nome) ? 'boolean' : 'string' };
  }

  try {
    const parsed = parseArgs({
      args: [...resto],
      options,
      allowPositionals: true,
      strict: true,
    });
    return {
      comando,
      flags: parsed.values as Record<string, string | boolean>,
      posicionais: parsed.positionals,
    };
  } catch (error) {
    throw new ValidationError(`Argumentos invalidos: ${(error as Error).message}`, {
      comando,
    });
  }
}

export function flagString(
  cli: ParsedCli,
  nome: string,
  fallback?: string,
): string {
  const valor = cli.flags[nome];
  if (typeof valor === 'string' && valor.trim()) return valor.trim();
  if (fallback !== undefined) return fallback;
  throw new ValidationError(`Falta o argumento --${nome}.`, { comando: cli.comando }, [
    `Exemplo: npm run ${cli.comando} -- --${nome} <valor>`,
  ]);
}

export function flagOptional(cli: ParsedCli, nome: string): string | null {
  const valor = cli.flags[nome];
  return typeof valor === 'string' && valor.trim() ? valor.trim() : null;
}

export function flagBool(cli: ParsedCli, nome: string): boolean {
  return cli.flags[nome] === true;
}
