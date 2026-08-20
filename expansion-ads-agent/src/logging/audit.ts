import type { Database } from '../database/db.js';
import { newId, uuid } from '../shared/ids.js';
import { redact } from './redact.js';
import type { Logger } from './logger.js';
import { type Clock, systemClock } from '../shared/time.js';

export type ActorKind = 'human' | 'claude' | 'job' | 'cli' | 'system';
export type ActionOutcome = 'success' | 'blocked' | 'error' | 'dry_run' | 'noop';

export interface ActionRecord {
  readonly actor: string;
  readonly actorKind: ActorKind;
  readonly tool: string;
  readonly clientId?: string | null;
  readonly adAccountId?: string | null;
  readonly campaignId?: string | null;
  readonly params?: unknown;
  readonly outcome: ActionOutcome;
  readonly createdIds?: Record<string, unknown> | null;
  readonly error?: unknown;
  readonly stateBefore?: string | null;
  readonly stateAfter?: string | null;
  readonly dryRun: boolean;
  readonly durationMs?: number | null;
}

export interface ViolationRecord {
  readonly clientId?: string | null;
  readonly campaignId?: string | null;
  readonly tool?: string | null;
  readonly policy: string;
  readonly rule: string;
  readonly severity: 'block' | 'warn';
  readonly message: string;
  readonly context?: unknown;
}

/**
 * Trilha de auditoria. Toda acao relevante passa por aqui: quem pediu, quando,
 * qual cliente, qual conta, qual ferramenta, parametros SEM segredos, resultado,
 * IDs criados, erro, estado antes e depois.
 */
export class AuditTrail {
  constructor(
    private readonly db: Database,
    private readonly logger: Logger,
    private readonly clock: Clock = systemClock,
  ) {}

  record(action: ActionRecord): string {
    const id = newId('log', this.clock());
    const ts = this.clock().toISOString();

    try {
      this.db.actionLogs.insert({
        id,
        ts,
        actor: action.actor,
        actor_kind: action.actorKind,
        tool: action.tool,
        client_id: action.clientId ?? null,
        ad_account_id: action.adAccountId ?? null,
        campaign_id: action.campaignId ?? null,
        params_json: action.params === undefined ? null : safeJson(action.params),
        outcome: action.outcome,
        created_ids_json: action.createdIds ? safeJson(action.createdIds) : null,
        error_json: action.error === undefined ? null : safeJson(serializeError(action.error)),
        state_before: action.stateBefore ?? null,
        state_after: action.stateAfter ?? null,
        dry_run: action.dryRun ? 1 : 0,
        duration_ms: action.durationMs ?? null,
      });
    } catch (error) {
      this.logger.error('Falha ao gravar trilha de auditoria.', { erro: serializeError(error) });
    }

    const level = action.outcome === 'error' ? 'error' : action.outcome === 'blocked' ? 'warn' : 'info';
    this.logger[level](`acao:${action.tool}`, {
      logId: id,
      ator: action.actor,
      tipoAtor: action.actorKind,
      cliente: action.clientId ?? null,
      conta: action.adAccountId ?? null,
      campanha: action.campaignId ?? null,
      resultado: action.outcome,
      dryRun: action.dryRun,
      estadoAntes: action.stateBefore ?? null,
      estadoDepois: action.stateAfter ?? null,
      idsCriados: action.createdIds ?? null,
    });

    return id;
  }

  violation(violation: ViolationRecord): string {
    const id = newId('viol', this.clock());
    try {
      this.db.policyViolations.insert({
        id,
        ts: this.clock().toISOString(),
        client_id: violation.clientId ?? null,
        campaign_id: violation.campaignId ?? null,
        tool: violation.tool ?? null,
        policy: violation.policy,
        rule: violation.rule,
        severity: violation.severity,
        message: violation.message,
        context_json: violation.context === undefined ? null : safeJson(violation.context),
      });
    } catch (error) {
      this.logger.error('Falha ao gravar violacao de politica.', { erro: serializeError(error) });
    }
    this.logger.warn(`politica:${violation.policy}/${violation.rule}`, {
      severidade: violation.severity,
      mensagem: violation.message,
      cliente: violation.clientId ?? null,
      campanha: violation.campaignId ?? null,
    });
    return id;
  }

  startJob(jobName: string, trigger: string): string {
    const id = uuid();
    this.db.jobRuns.insert({
      id,
      job_name: jobName,
      started_at: this.clock().toISOString(),
      finished_at: null,
      status: 'running',
      trigger,
      summary_json: null,
      error_json: null,
    });
    return id;
  }

  finishJob(
    id: string,
    status: 'success' | 'error' | 'skipped',
    summary?: unknown,
    error?: unknown,
  ): void {
    this.db.jobRuns.update(id, {
      finished_at: this.clock().toISOString(),
      status,
      summary_json: summary === undefined ? null : safeJson(summary),
      error_json: error === undefined ? null : safeJson(serializeError(error)),
    });
  }
}

export function safeJson(value: unknown): string {
  try {
    return JSON.stringify(redact(value)) ?? 'null';
  } catch {
    return JSON.stringify({ erro: 'valor nao serializavel' });
  }
}

export function serializeError(error: unknown): Record<string, unknown> {
  if (error && typeof error === 'object' && 'toJSON' in error) {
    const candidate = (error as { toJSON: () => unknown }).toJSON();
    if (candidate && typeof candidate === 'object') return candidate as Record<string, unknown>;
  }
  if (error instanceof Error) return { name: error.name, message: error.message };
  return { message: String(error) };
}
