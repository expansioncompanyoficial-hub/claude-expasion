import { buildInsert, buildSelect, buildUpdate, type SqlDriver, type SqlValue } from './driver.js';
import { MIGRATIONS } from './schema.js';
import { SqliteDriver } from './sqlite-driver.js';
import type {
  ActionLogRow,
  AdRow,
  AdSetRow,
  ApprovalRow,
  CampaignBriefRow,
  CampaignRow,
  ClientRow,
  CreativeRow,
  IdempotencyKeyRow,
  JobRunRow,
  MetaObjectRow,
  OptimizationRecommendationRow,
  PerformanceSnapshotRow,
  PolicyViolationRow,
} from './types.js';

export type Row = Record<string, SqlValue>;

/** Repositorio generico: CRUD por chave primaria + consultas simples. */
export class Repository<T extends object> {
  constructor(
    private readonly driver: SqlDriver,
    private readonly table: string,
    private readonly primaryKey: string = 'id',
  ) {}

  insert(row: Row): void {
    const { sql, params } = buildInsert(this.table, row);
    this.driver.run(sql, params);
  }

  update(id: SqlValue, row: Row): number {
    const { sql, params } = buildUpdate(this.table, row, { [this.primaryKey]: id });
    return this.driver.run(sql, params).changes;
  }

  updateWhere(where: Row, row: Row): number {
    const { sql, params } = buildUpdate(this.table, row, where);
    return this.driver.run(sql, params).changes;
  }

  findById(id: SqlValue): T | undefined {
    return this.driver.get<T>(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?`, [id]);
  }

  findOne(where: Row): T | undefined {
    const { sql, params } = buildSelect(this.table, where, { limit: 1 });
    return this.driver.get<T>(sql, params);
  }

  findMany(where: Row = {}, options: { orderBy?: string; limit?: number } = {}): T[] {
    const { sql, params } = buildSelect(this.table, where, options);
    return this.driver.all<T>(sql, params);
  }

  count(where: Row = {}): number {
    const columns = Object.keys(where);
    const clause =
      columns.length > 0 ? ` WHERE ${columns.map((c) => `${c} = ?`).join(' AND ')}` : '';
    const row = this.driver.get<{ n: number }>(
      `SELECT COUNT(*) AS n FROM ${this.table}${clause}`,
      columns.map((c) => where[c] as SqlValue),
    );
    return row?.n ?? 0;
  }

  raw(sql: string, params: readonly SqlValue[] = []): T[] {
    return this.driver.all<T>(sql, params);
  }
}

export class Database {
  readonly clients: Repository<ClientRow>;
  readonly briefs: Repository<CampaignBriefRow>;
  readonly campaigns: Repository<CampaignRow>;
  readonly adsets: Repository<AdSetRow>;
  readonly creatives: Repository<CreativeRow>;
  readonly ads: Repository<AdRow>;
  readonly approvals: Repository<ApprovalRow>;
  readonly metaObjects: Repository<MetaObjectRow>;
  readonly actionLogs: Repository<ActionLogRow>;
  readonly snapshots: Repository<PerformanceSnapshotRow>;
  readonly recommendations: Repository<OptimizationRecommendationRow>;
  readonly policyViolations: Repository<PolicyViolationRow>;
  readonly jobRuns: Repository<JobRunRow>;
  readonly idempotencyKeys: Repository<IdempotencyKeyRow>;

  constructor(readonly driver: SqlDriver) {
    this.migrate();
    this.clients = new Repository(driver, 'clients');
    this.briefs = new Repository(driver, 'campaign_briefs');
    this.campaigns = new Repository(driver, 'campaigns');
    this.adsets = new Repository(driver, 'adsets');
    this.creatives = new Repository(driver, 'creatives');
    this.ads = new Repository(driver, 'ads');
    this.approvals = new Repository(driver, 'approvals');
    this.metaObjects = new Repository(driver, 'meta_objects');
    this.actionLogs = new Repository(driver, 'action_logs');
    this.snapshots = new Repository(driver, 'performance_snapshots');
    this.recommendations = new Repository(driver, 'optimization_recommendations');
    this.policyViolations = new Repository(driver, 'policy_violations');
    this.jobRuns = new Repository(driver, 'job_runs');
    this.idempotencyKeys = new Repository(driver, 'idempotency_keys');
  }

  private migrate(): void {
    this.driver.exec(
      'CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY, applied_at TEXT NOT NULL)',
    );
    for (const migration of MIGRATIONS) {
      const applied = this.driver.get<{ id: string }>(
        'SELECT id FROM schema_migrations WHERE id = ?',
        [migration.id],
      );
      if (applied) continue;
      this.driver.exec(migration.sql);
      this.driver.run('INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)', [
        migration.id,
        new Date().toISOString(),
      ]);
    }
  }

  transaction<T>(fn: () => T): T {
    return this.driver.transaction(fn);
  }

  close(): void {
    this.driver.close();
  }
}

let shared: Database | null = null;

export function openDatabase(options: { driver: 'sqlite' | 'memory'; path: string }): Database {
  const target = options.driver === 'memory' ? ':memory:' : options.path;
  return new Database(new SqliteDriver(target));
}

export function getDatabase(options: { driver: 'sqlite' | 'memory'; path: string }): Database {
  if (!shared) shared = openDatabase(options);
  return shared;
}

export function setSharedDatabase(db: Database | null): void {
  shared = db;
}
