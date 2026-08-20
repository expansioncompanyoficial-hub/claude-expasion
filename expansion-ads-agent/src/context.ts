import { getConfig, type AppConfig } from './config/env.js';
import { ClientRegistry } from './clients/registry.js';
import { Database, openDatabase } from './database/db.js';
import { AuditTrail } from './logging/audit.js';
import { createLoggerFromConfig, type Logger } from './logging/logger.js';
import { MetaClient } from './meta/client.js';
import { MetaGateway } from './meta/gateway.js';
import type { HttpTransport } from './meta/http.js';
import { PolicyEngine } from './policies/engine.js';
import { loadPolicies } from './policies/loader.js';
import type { PolicyBundle } from './policies/schema.js';
import { systemClock, type Clock } from './shared/time.js';

/**
 * Contexto unico da aplicacao. CLI, MCP e jobs constroem o mesmo objeto —
 * as regras de seguranca vivem no backend e valem igual para todos.
 */
export interface AgentContext {
  readonly config: AppConfig;
  readonly logger: Logger;
  readonly db: Database;
  readonly audit: AuditTrail;
  readonly policies: PolicyBundle;
  readonly policyEngine: PolicyEngine;
  readonly clients: ClientRegistry;
  readonly metaClient: MetaClient;
  readonly meta: MetaGateway;
  readonly clock: Clock;
  readonly actor: string;
  readonly actorKind: 'human' | 'claude' | 'job' | 'cli' | 'system';
  close(): void;
}

export interface CreateContextOptions {
  readonly config?: AppConfig;
  readonly logStream?: 'stderr' | 'stdout' | 'none';
  readonly transport?: HttpTransport;
  readonly db?: Database;
  readonly clock?: Clock;
  readonly actor?: string;
  readonly actorKind?: AgentContext['actorKind'];
  /** Sobrescreve DRY_RUN. Usado pelo comando de criacao real, nunca pelo modelo. */
  readonly dryRunOverride?: boolean;
}

export function createContext(options: CreateContextOptions = {}): AgentContext {
  const config = options.config ?? getConfig();
  const logger = createLoggerFromConfig(config, options.logStream ?? 'stderr');
  const db = options.db ?? openDatabase(config.db);
  const clock = options.clock ?? systemClock;
  const audit = new AuditTrail(db, logger, clock);
  const policies = loadPolicies(config.paths.policies);
  const policyEngine = new PolicyEngine(policies);
  const clients = new ClientRegistry(config.paths.clients);
  const metaClient = new MetaClient({ config, logger, transport: options.transport });
  const dryRun = options.dryRunOverride ?? config.dryRun;
  const meta = new MetaGateway(metaClient, logger, { dryRun });

  return {
    config,
    logger,
    db,
    audit,
    policies,
    policyEngine,
    clients,
    metaClient,
    meta,
    clock,
    actor: options.actor ?? config.operatorId,
    actorKind: options.actorKind ?? 'cli',
    close(): void {
      if (!options.db) db.close();
    },
  };
}
