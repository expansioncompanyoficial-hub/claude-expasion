import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import type { SqlDriver, SqlValue } from './driver.js';

/**
 * Driver SQLite baseado no modulo nativo `node:sqlite` (Node >= 22.5).
 * Escolhido para o MVP por nao exigir compilacao de modulo nativo.
 */
export class SqliteDriver implements SqlDriver {
  private readonly db: DatabaseSync;

  constructor(filePath: string) {
    if (filePath !== ':memory:') {
      mkdirSync(path.dirname(filePath), { recursive: true });
    }
    this.db = new DatabaseSync(filePath);
    this.db.exec('PRAGMA journal_mode = WAL;');
    this.db.exec('PRAGMA foreign_keys = ON;');
    this.db.exec('PRAGMA busy_timeout = 5000;');
  }

  exec(sql: string): void {
    this.db.exec(sql);
  }

  run(sql: string, params: readonly SqlValue[] = []): { changes: number } {
    const statement = this.db.prepare(sql);
    const result = statement.run(...(params as SqlValue[]));
    return { changes: Number(result.changes) };
  }

  get<T>(sql: string, params: readonly SqlValue[] = []): T | undefined {
    const statement = this.db.prepare(sql);
    const row = statement.get(...(params as SqlValue[]));
    return row === undefined ? undefined : ({ ...(row as object) } as T);
  }

  all<T>(sql: string, params: readonly SqlValue[] = []): T[] {
    const statement = this.db.prepare(sql);
    const rows = statement.all(...(params as SqlValue[]));
    return rows.map((row) => ({ ...(row as object) }) as T);
  }

  transaction<T>(fn: () => T): T {
    this.db.exec('BEGIN');
    try {
      const result = fn();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      try {
        this.db.exec('ROLLBACK');
      } catch {
        // rollback best-effort
      }
      throw error;
    }
  }

  close(): void {
    this.db.close();
  }
}
