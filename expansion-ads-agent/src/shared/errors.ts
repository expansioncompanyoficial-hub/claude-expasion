/**
 * Taxonomia de erros do EXPANSION ADS AGENT.
 *
 * Todo erro carrega um `code` estavel (usado em logs, testes e respostas MCP) e
 * um `details` livre de segredos. Nenhuma mensagem de erro pode conter token.
 */

export type ErrorCategory =
  | 'validation'
  | 'authorization'
  | 'policy'
  | 'state'
  | 'duplicate'
  | 'approval'
  | 'meta_api'
  | 'rate_limit'
  | 'not_found'
  | 'config'
  | 'internal';

export interface AppErrorOptions {
  readonly code: string;
  readonly category: ErrorCategory;
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly retryable?: boolean;
  readonly cause?: unknown;
  /** Passos objetivos que o operador (ou o Claude) deve seguir para resolver. */
  readonly remediation?: string[];
}

export class AppError extends Error {
  readonly code: string;
  readonly category: ErrorCategory;
  readonly details: Record<string, unknown>;
  readonly retryable: boolean;
  readonly remediation: string[];

  constructor(options: AppErrorOptions) {
    super(options.message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = new.target.name;
    this.code = options.code;
    this.category = options.category;
    this.details = options.details ?? {};
    this.retryable = options.retryable ?? false;
    this.remediation = options.remediation ?? [];
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      category: this.category,
      message: this.message,
      details: this.details,
      retryable: this.retryable,
      remediation: this.remediation,
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>, remediation?: string[]) {
    super({ code: 'VALIDATION_FAILED', category: 'validation', message, details, remediation });
  }
}

export class ConfigError extends AppError {
  constructor(message: string, details?: Record<string, unknown>, remediation?: string[]) {
    super({ code: 'CONFIG_INVALID', category: 'config', message, details, remediation });
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>, remediation?: string[]) {
    super({ code: 'NOT_AUTHORIZED', category: 'authorization', message, details, remediation });
  }
}

export class PolicyViolationError extends AppError {
  readonly policy: string;
  readonly rule: string;

  constructor(
    policy: string,
    rule: string,
    message: string,
    details?: Record<string, unknown>,
    remediation?: string[],
  ) {
    super({
      code: 'POLICY_VIOLATION',
      category: 'policy',
      message,
      details: { ...details, policy, rule },
      remediation,
    });
    this.policy = policy;
    this.rule = rule;
  }
}

export class StateTransitionError extends AppError {
  constructor(from: string, to: string, allowed: readonly string[]) {
    super({
      code: 'INVALID_STATE_TRANSITION',
      category: 'state',
      message: `Transicao de estado invalida: ${from} -> ${to}.`,
      details: { from, to, allowed },
      remediation: [`A partir de ${from} so e permitido ir para: ${allowed.join(', ') || '(nada)'}.`],
    });
  }
}

export class DuplicateError extends AppError {
  constructor(message: string, details?: Record<string, unknown>, remediation?: string[]) {
    super({ code: 'DUPLICATE_DETECTED', category: 'duplicate', message, details, remediation });
  }
}

export class ApprovalError extends AppError {
  constructor(
    code: string,
    message: string,
    details?: Record<string, unknown>,
    remediation?: string[],
  ) {
    super({ code, category: 'approval', message, details, remediation });
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'NOT_FOUND', category: 'not_found', message, details });
  }
}

export class MetaApiError extends AppError {
  readonly httpStatus: number;
  readonly metaCode: number | null;
  readonly metaSubcode: number | null;
  readonly fbtraceId: string | null;

  constructor(params: {
    message: string;
    httpStatus: number;
    metaCode?: number | null;
    metaSubcode?: number | null;
    fbtraceId?: string | null;
    retryable?: boolean;
    details?: Record<string, unknown>;
    remediation?: string[];
  }) {
    super({
      code: 'META_API_ERROR',
      category: 'meta_api',
      message: params.message,
      details: {
        ...params.details,
        httpStatus: params.httpStatus,
        metaCode: params.metaCode ?? null,
        metaSubcode: params.metaSubcode ?? null,
        fbtraceId: params.fbtraceId ?? null,
      },
      retryable: params.retryable ?? false,
      remediation: params.remediation,
    });
    this.httpStatus = params.httpStatus;
    this.metaCode = params.metaCode ?? null;
    this.metaSubcode = params.metaSubcode ?? null;
    this.fbtraceId = params.fbtraceId ?? null;
  }
}

export class RateLimitError extends MetaApiError {
  readonly retryAfterMs: number;

  constructor(params: {
    message: string;
    httpStatus: number;
    retryAfterMs: number;
    metaCode?: number | null;
    metaSubcode?: number | null;
    fbtraceId?: string | null;
    details?: Record<string, unknown>;
  }) {
    super({ ...params, retryable: true });
    this.retryAfterMs = params.retryAfterMs;
  }
}

export function isAppError(value: unknown): value is AppError {
  return value instanceof AppError;
}

/** Converte qualquer coisa lancada em AppError, sem vazar stack para o usuario. */
export function toAppError(value: unknown): AppError {
  if (isAppError(value)) return value;
  if (value instanceof Error) {
    return new AppError({
      code: 'INTERNAL_ERROR',
      category: 'internal',
      message: value.message,
      cause: value,
    });
  }
  return new AppError({
    code: 'INTERNAL_ERROR',
    category: 'internal',
    message: String(value),
  });
}
