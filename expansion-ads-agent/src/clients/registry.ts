import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { AuthorizationError, NotFoundError, ValidationError } from '../shared/errors.js';
import { stableHash } from '../shared/ids.js';
import { clientConfigSchema, type ClientRecord } from './schema.js';

function readOptional(file: string): string | null {
  return existsSync(file) ? readFileSync(file, 'utf8') : null;
}

/**
 * Registro de clientes autorizadas.
 *
 * Uma cliente so existe se houver `clients/<id>/config.json`. Quando so existe
 * `config.example.json`, ela e carregada como EXEMPLO: serve para dry-run e para
 * os testes, mas o sistema recusa qualquer criacao real com ela.
 */
export class ClientRegistry {
  constructor(private readonly clientsDir: string) {}

  listIds(): string[] {
    if (!existsSync(this.clientsDir)) return [];
    return readdirSync(this.clientsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => this.resolveConfigPath(name) !== null)
      .sort();
  }

  list(): ClientRecord[] {
    return this.listIds().map((id) => this.load(id));
  }

  has(id: string): boolean {
    return this.resolveConfigPath(id) !== null;
  }

  private resolveConfigPath(id: string): { file: string; isExample: boolean } | null {
    if (!/^[a-z0-9][a-z0-9-]{1,48}$/.test(id)) return null;
    const dir = path.join(this.clientsDir, id);
    const real = path.join(dir, 'config.json');
    if (existsSync(real)) return { file: real, isExample: false };
    const example = path.join(dir, 'config.example.json');
    if (existsSync(example)) return { file: example, isExample: true };
    return null;
  }

  load(id: string): ClientRecord {
    const resolved = this.resolveConfigPath(id);
    if (!resolved) {
      throw new NotFoundError(`Cliente "${id}" nao esta cadastrada.`, {
        clienteSolicitada: id,
        clientesDisponiveis: this.listIds(),
        onde: this.clientsDir,
      });
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(readFileSync(resolved.file, 'utf8'));
    } catch (error) {
      throw new ValidationError(`config da cliente "${id}" nao e um JSON valido.`, {
        arquivo: resolved.file,
        erro: (error as Error).message,
      });
    }

    const result = clientConfigSchema.safeParse(parsedJson);
    if (!result.success) {
      throw new ValidationError(`Cadastro da cliente "${id}" invalido.`, {
        arquivo: resolved.file,
        issues: result.error.issues.map((issue) => ({
          campo: issue.path.join('.'),
          problema: issue.message,
        })),
      });
    }

    if (result.data.id !== id) {
      throw new ValidationError(
        `O campo id ("${result.data.id}") nao bate com a pasta ("${id}").`,
        { arquivo: resolved.file },
        ['Renomeie a pasta ou o campo id para que sejam iguais.'],
      );
    }

    const dir = path.join(this.clientsDir, id);
    return {
      config: result.data,
      isExample: resolved.isExample,
      configPath: resolved.file,
      configHash: stableHash(result.data),
      brand: readOptional(path.join(dir, 'brand.md')) ?? readOptional(path.join(dir, 'brand.example.md')),
      offers:
        readOptional(path.join(dir, 'offers.md')) ?? readOptional(path.join(dir, 'offers.example.md')),
    };
  }

  /** Carrega e ja recusa cliente inativa. Use este metodo em qualquer operacao. */
  loadActive(id: string): ClientRecord {
    const record = this.load(id);
    if (record.config.status !== 'active') {
      throw new AuthorizationError(
        `Cliente "${id}" esta inativa. Nenhuma operacao e permitida.`,
        { clientId: id, status: record.config.status },
        ['Mude "status" para "active" em clients/<id>/config.json se a operacao for legitima.'],
      );
    }
    return record;
  }
}
