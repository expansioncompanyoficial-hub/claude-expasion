import { createHmac } from 'node:crypto';
import type { AppConfig } from '../config/env.js';
import type { Logger } from '../logging/logger.js';
import { redact } from '../logging/redact.js';
import { AppError, MetaApiError, RateLimitError } from '../shared/errors.js';
import { parseMetaError, readUsagePercent } from './errors.js';
import { FetchTransport, type HttpTransport } from './http.js';

export type MetaParams = Record<string, unknown>;

/**
 * Registro de uma chamada. E o que o dry-run mostra ao operador: exatamente o
 * que sairia daqui. Nunca contem token, appsecret_proof nem binario de arquivo.
 */
export interface MetaCallRecord {
  readonly ts: string;
  readonly method: 'GET' | 'POST' | 'DELETE';
  /** Caminho relativo, ja versionado na hora do envio. */
  readonly path: string;
  readonly params: Record<string, unknown>;
  readonly simulado: boolean;
  readonly tentativa: number;
  readonly status?: number;
  readonly duracaoMs?: number;
}

export interface MetaUploadFile {
  readonly field: string;
  readonly filename: string;
  readonly contentType: string;
  readonly data: Uint8Array;
}

export interface MetaClientOptions {
  readonly config: AppConfig;
  readonly logger: Logger;
  readonly transport?: HttpTransport;
  readonly sleep?: (ms: number) => Promise<void>;
  readonly now?: () => Date;
}

const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Cliente da Graph API.
 *
 * Cuida de: URL versionada, autenticacao, appsecret_proof, timeout, retry com
 * backoff exponencial, rate limit e traducao de erro da Meta. O token viaja no
 * cabecalho Authorization e nunca aparece em log, registro de chamada ou erro.
 */
export class MetaClient {
  private readonly config: AppConfig;
  private readonly logger: Logger;
  private readonly transport: HttpTransport;
  private readonly sleep: (ms: number) => Promise<void>;
  private readonly now: () => Date;
  private readonly records: MetaCallRecord[] = [];

  constructor(options: MetaClientOptions) {
    this.config = options.config;
    this.logger = options.logger;
    this.transport = options.transport ?? new FetchTransport();
    this.sleep = options.sleep ?? defaultSleep;
    this.now = options.now ?? ((): Date => new Date());
  }

  get callLog(): readonly MetaCallRecord[] {
    return this.records;
  }

  clearCallLog(): void {
    this.records.length = 0;
  }

  get hasCredentials(): boolean {
    return this.config.meta.hasCredentials;
  }

  get apiVersion(): string {
    return this.config.meta.apiVersion;
  }

  /** Registra uma chamada que NAO foi feita (dry-run ou leitura sem credencial). */
  recordSimulated(method: 'GET' | 'POST' | 'DELETE', path: string, params: MetaParams): void {
    this.records.push({
      ts: this.now().toISOString(),
      method,
      path,
      params: redact(sanitizeParams(params)),
      simulado: true,
      tentativa: 0,
    });
  }

  async get<T>(path: string, params: MetaParams = {}): Promise<T> {
    return this.execute<T>('GET', path, params);
  }

  async post<T>(path: string, params: MetaParams = {}): Promise<T> {
    return this.execute<T>('POST', path, params);
  }

  /** Upload multipart (imagens e videos). O binario nunca entra no registro. */
  async postMultipart<T>(
    path: string,
    fields: MetaParams,
    file: MetaUploadFile,
  ): Promise<T> {
    return this.execute<T>(
      'POST',
      path,
      { ...fields, '(arquivo)': file.filename, '(bytes)': file.data.byteLength },
      file,
    );
  }

  private requireToken(): string {
    const token = this.config.meta.accessToken;
    if (!token) {
      throw new AppError({
        code: 'META_CREDENTIALS_MISSING',
        category: 'config',
        message: 'META_ACCESS_TOKEN nao esta configurado.',
        remediation: [
          'Copie .env.example para .env e preencha META_ACCESS_TOKEN.',
          'Sem credencial o agente opera apenas em dry-run e leitura simulada.',
        ],
      });
    }
    return token;
  }

  private appSecretProof(token: string): string | null {
    if (!this.config.meta.requireAppSecretProof) return null;
    const secret = this.config.meta.appSecret;
    if (!secret) return null;
    return createHmac('sha256', secret).update(token).digest('hex');
  }

  private buildUrl(path: string): string {
    const clean = path.replace(/^\/+/, '');
    return `${this.config.meta.baseUrl}/${this.config.meta.apiVersion}/${clean}`;
  }

  private async execute<T>(
    method: 'GET' | 'POST' | 'DELETE',
    path: string,
    params: MetaParams,
    file?: MetaUploadFile,
  ): Promise<T> {
    const token = this.requireToken();
    const proof = this.appSecretProof(token);
    const maxAttempts = this.config.meta.maxRetries + 1;
    let lastError: AppError | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const started = Date.now();
      const index = this.records.length;
      this.records.push({
        ts: this.now().toISOString(),
        method,
        path,
        params: redact(sanitizeParams(params)),
        simulado: false,
        tentativa: attempt,
      });

      try {
        const response = await this.transport.send(
          this.buildRequest(method, path, params, token, proof, file),
        );

        const duracaoMs = Date.now() - started;
        this.records[index] = { ...this.records[index]!, status: response.status, duracaoMs };

        const usage = readUsagePercent(response.headers);
        if (usage !== null && usage >= 75) {
          this.logger.warn('Uso da API da Meta alto — proximo do rate limit.', {
            usoPercentual: usage,
            path,
          });
        }

        if (response.status >= 200 && response.status < 300) {
          this.logger.debug('meta:resposta', { path, method, status: response.status, duracaoMs });
          return response.body as T;
        }

        const error = parseMetaError(response.status, response.body, response.headers);
        lastError = error;
        if (!error.retryable || attempt === maxAttempts) throw error;

        const delay =
          error instanceof RateLimitError ? error.retryAfterMs : this.backoffDelay(attempt);
        this.logger.warn('meta:retry', {
          path,
          method,
          tentativa: attempt,
          de: maxAttempts,
          esperaMs: delay,
          codigoMeta: error.metaCode,
        });
        await this.sleep(delay);
      } catch (error) {
        if (error instanceof MetaApiError) {
          if (!error.retryable || attempt === maxAttempts) throw error;
          lastError = error;
          continue;
        }
        if (error instanceof AppError) throw error;

        const isAbort = error instanceof Error && error.name === 'AbortError';
        const wrapped = new MetaApiError({
          message: isAbort
            ? `Timeout de ${this.config.meta.timeoutMs}ms ao chamar a Meta (${path}).`
            : `Falha de rede ao chamar a Meta (${path}): ${(error as Error).message}`,
          httpStatus: isAbort ? 408 : 0,
          retryable: true,
        });
        lastError = wrapped;
        if (attempt === maxAttempts) throw wrapped;

        const delay = this.backoffDelay(attempt);
        this.logger.warn('meta:retry-rede', { path, tentativa: attempt, esperaMs: delay });
        await this.sleep(delay);
      }
    }

    throw lastError ?? new MetaApiError({ message: `Falha ao chamar a Meta (${path}).`, httpStatus: 0 });
  }

  private buildRequest(
    method: 'GET' | 'POST' | 'DELETE',
    path: string,
    params: MetaParams,
    token: string,
    proof: string | null,
    file?: MetaUploadFile,
  ): { method: 'GET' | 'POST' | 'DELETE'; url: string; headers: Record<string, string>; body?: string | FormData; timeoutMs: number } {
    const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
    let url = this.buildUrl(path);
    let body: string | FormData | undefined;

    if (method === 'GET') {
      const query = toSearchParams(params);
      if (proof) query.set('appsecret_proof', proof);
      const queryString = query.toString();
      if (queryString) url += `?${queryString}`;
    } else if (file) {
      const form = new FormData();
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || key.startsWith('(')) continue;
        form.append(key, typeof value === 'string' ? value : JSON.stringify(value));
      }
      if (proof) form.set('appsecret_proof', proof);
      const bytes = new Uint8Array(file.data);
      form.append(file.field, new Blob([bytes], { type: file.contentType }), file.filename);
      body = form;
    } else {
      const form = toSearchParams(params);
      if (proof) form.set('appsecret_proof', proof);
      body = form.toString();
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return { method, url, headers, body, timeoutMs: this.config.meta.timeoutMs };
  }

  /** Backoff exponencial com teto de 60s. */
  private backoffDelay(attempt: number): number {
    const base = this.config.meta.retryBaseDelayMs * 2 ** (attempt - 1);
    return Math.min(Math.floor(base * 1.25), 60_000);
  }
}

function toSearchParams(params: MetaParams): URLSearchParams {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || key.startsWith('(')) continue;
    query.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
  return query;
}

/** Nunca guardamos binario nem campos sensiveis no registro de chamadas. */
function sanitizeParams(params: MetaParams): Record<string, unknown> {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
      output[key] = `[binario ${key}]`;
      continue;
    }
    output[key] = value;
  }
  return output;
}
