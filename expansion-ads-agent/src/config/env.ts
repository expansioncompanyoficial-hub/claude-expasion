import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { z } from 'zod';
import { ConfigError } from '../shared/errors.js';
import { registerSecret } from '../security/secrets.js';

/** Raiz do projeto (dois niveis acima de src/config quando compilado ou nao). */
export const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

let dotenvLoaded = false;

function loadDotEnvOnce(): void {
  if (dotenvLoaded) return;
  dotenvLoaded = true;
  const envPath = path.join(PROJECT_ROOT, '.env');
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath, quiet: true });
  }
}

const booleanish = z
  .union([z.boolean(), z.string()])
  .transform((value) => {
    if (typeof value === 'boolean') return value;
    return ['1', 'true', 'yes', 'y', 'on', 'sim'].includes(value.trim().toLowerCase());
  });

const positiveInt = (fallback: number) =>
  z
    .union([z.string(), z.number()])
    .optional()
    .transform((value) => {
      if (value === undefined || value === '') return fallback;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? Math.trunc(parsed) : Number.NaN;
    })
    .pipe(z.number().int().positive());

/**
 * Versao da Graph API. Deixada configuravel de proposito (item 3.8 do escopo).
 * Padrao: v26.0 — versao corrente da Graph/Marketing API (lancada em 29/07/2026).
 */
export const DEFAULT_GRAPH_API_VERSION = 'v26.0';

const envSchema = z.object({
  META_ACCESS_TOKEN: z.string().trim().min(1).optional(),
  META_APP_ID: z.string().trim().optional(),
  META_APP_SECRET: z.string().trim().optional(),
  META_GRAPH_API_VERSION: z
    .string()
    .trim()
    .regex(/^v\d+\.\d+$/, 'META_GRAPH_API_VERSION deve seguir o formato vNN.N (ex.: v26.0).')
    .default(DEFAULT_GRAPH_API_VERSION),
  META_GRAPH_API_BASE_URL: z.string().trim().url().default('https://graph.facebook.com'),

  DRY_RUN: booleanish.default(true),
  META_REQUIRE_APPSECRET_PROOF: booleanish.default(false),
  META_REQUEST_TIMEOUT_MS: positiveInt(30_000),
  META_MAX_RETRIES: z
    .union([z.string(), z.number()])
    .optional()
    .transform((value) => (value === undefined || value === '' ? 4 : Number(value)))
    .pipe(z.number().int().min(0).max(10)),
  META_RETRY_BASE_DELAY_MS: positiveInt(1_000),

  DB_DRIVER: z.enum(['sqlite', 'memory']).default('sqlite'),
  DB_PATH: z.string().trim().default('./data/expansion-ads.sqlite'),

  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'silent']).default('info'),
  LOG_DIR: z.string().trim().default('./logs'),
  LOG_PRETTY: booleanish.default(false),

  APPROVAL_TTL_HOURS: positiveInt(24),
  OPERATOR_ID: z.string().trim().min(1).default('operador-local'),

  HEADLESS_ENABLED: booleanish.default(false),
  AUTO_PAUSE_ENABLED: booleanish.default(false),
  AUTO_SCALE_ENABLED: booleanish.default(false),
  AUTO_REACTIVATE_ENABLED: booleanish.default(false),

  CLIENTS_DIR: z.string().trim().default('./clients'),
  BRIEFS_DIR: z.string().trim().default('./briefs'),
  CREATIVES_DIR: z.string().trim().default('./creatives'),
  POLICIES_DIR: z.string().trim().default('./policies'),
  REPORTS_DIR: z.string().trim().default('./reports'),
});

export type RawEnv = z.infer<typeof envSchema>;

export interface AppConfig {
  readonly meta: {
    readonly accessToken: string | null;
    readonly appId: string | null;
    readonly appSecret: string | null;
    readonly apiVersion: string;
    readonly baseUrl: string;
    readonly requireAppSecretProof: boolean;
    readonly timeoutMs: number;
    readonly maxRetries: number;
    readonly retryBaseDelayMs: number;
    readonly hasCredentials: boolean;
  };
  readonly dryRun: boolean;
  readonly db: { readonly driver: 'sqlite' | 'memory'; readonly path: string };
  readonly log: {
    readonly level: 'debug' | 'info' | 'warn' | 'error' | 'silent';
    readonly dir: string;
    readonly pretty: boolean;
  };
  readonly approval: { readonly ttlHours: number };
  readonly operatorId: string;
  readonly automation: {
    readonly headlessEnabled: boolean;
    readonly autoPauseEnabled: boolean;
    readonly autoScaleEnabled: boolean;
    readonly autoReactivateEnabled: boolean;
  };
  readonly paths: {
    readonly root: string;
    readonly clients: string;
    readonly briefs: string;
    readonly creatives: string;
    readonly policies: string;
    readonly reports: string;
  };
}

function resolvePath(candidate: string): string {
  return path.isAbsolute(candidate) ? candidate : path.resolve(PROJECT_ROOT, candidate);
}

function build(raw: RawEnv): AppConfig {
  registerSecret(raw.META_ACCESS_TOKEN);
  registerSecret(raw.META_APP_SECRET);

  return {
    meta: {
      accessToken: raw.META_ACCESS_TOKEN ?? null,
      appId: raw.META_APP_ID || null,
      appSecret: raw.META_APP_SECRET || null,
      apiVersion: raw.META_GRAPH_API_VERSION,
      baseUrl: raw.META_GRAPH_API_BASE_URL.replace(/\/+$/, ''),
      requireAppSecretProof: raw.META_REQUIRE_APPSECRET_PROOF,
      timeoutMs: raw.META_REQUEST_TIMEOUT_MS,
      maxRetries: raw.META_MAX_RETRIES,
      retryBaseDelayMs: raw.META_RETRY_BASE_DELAY_MS,
      hasCredentials: Boolean(raw.META_ACCESS_TOKEN),
    },
    dryRun: raw.DRY_RUN,
    db: { driver: raw.DB_DRIVER, path: resolvePath(raw.DB_PATH) },
    log: { level: raw.LOG_LEVEL, dir: resolvePath(raw.LOG_DIR), pretty: raw.LOG_PRETTY },
    approval: { ttlHours: raw.APPROVAL_TTL_HOURS },
    operatorId: raw.OPERATOR_ID,
    automation: {
      headlessEnabled: raw.HEADLESS_ENABLED,
      autoPauseEnabled: raw.AUTO_PAUSE_ENABLED,
      autoScaleEnabled: raw.AUTO_SCALE_ENABLED,
      autoReactivateEnabled: raw.AUTO_REACTIVATE_ENABLED,
    },
    paths: {
      root: PROJECT_ROOT,
      clients: resolvePath(raw.CLIENTS_DIR),
      briefs: resolvePath(raw.BRIEFS_DIR),
      creatives: resolvePath(raw.CREATIVES_DIR),
      policies: resolvePath(raw.POLICIES_DIR),
      reports: resolvePath(raw.REPORTS_DIR),
    },
  };
}

let cached: AppConfig | null = null;

export function loadConfig(source: NodeJS.ProcessEnv = process.env): AppConfig {
  loadDotEnvOnce();
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    throw new ConfigError('Variaveis de ambiente invalidas.', {
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    }, ['Revise o arquivo .env comparando com .env.example.']);
  }

  const config = build(parsed.data);

  if (config.meta.requireAppSecretProof && !config.meta.appSecret) {
    throw new ConfigError(
      'META_REQUIRE_APPSECRET_PROOF=true exige META_APP_SECRET configurado.',
      {},
      ['Preencha META_APP_SECRET no .env ou desligue META_REQUIRE_APPSECRET_PROOF.'],
    );
  }

  return config;
}

export function getConfig(): AppConfig {
  if (!cached) cached = loadConfig();
  return cached;
}

export function resetConfigCache(): void {
  cached = null;
  dotenvLoaded = false;
}

/** Visao do ambiente segura para log e para respostas MCP. */
export function describeConfig(config: AppConfig): Record<string, unknown> {
  return {
    dryRun: config.dryRun,
    graphApiVersion: config.meta.apiVersion,
    graphApiBaseUrl: config.meta.baseUrl,
    credenciaisConfiguradas: config.meta.hasCredentials,
    appSecretProof: config.meta.requireAppSecretProof,
    dbDriver: config.db.driver,
    operatorId: config.operatorId,
    automacao: config.automation,
    aprovacaoValidadeHoras: config.approval.ttlHours,
  };
}
