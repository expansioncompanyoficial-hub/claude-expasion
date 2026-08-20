/**
 * Porta de persistencia.
 *
 * O MVP usa SQLite (node:sqlite, sem dependencia nativa). Toda a aplicacao fala
 * apenas com esta interface, entao trocar por Postgres no futuro e escrever um
 * novo driver — nenhum repositorio precisa mudar.
 */

export type SqlValue = string | number | bigint | null | Uint8Array;

export interface SqlDriver {
  exec(sql: string): void;
  run(sql: string, params?: readonly SqlValue[]): { changes: number };
  get<T>(sql: string, params?: readonly SqlValue[]): T | undefined;
  all<T>(sql: string, params?: readonly SqlValue[]): T[];
  transaction<T>(fn: () => T): T;
  close(): void;
}

export function buildInsert(
  table: string,
  row: Record<string, SqlValue>,
): { sql: string; params: SqlValue[] } {
  const columns = Object.keys(row);
  if (columns.length === 0) throw new Error(`INSERT sem colunas em ${table}.`);
  const placeholders = columns.map(() => '?').join(', ');
  return {
    sql: `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
    params: columns.map((column) => row[column] as SqlValue),
  };
}

export function buildUpdate(
  table: string,
  row: Record<string, SqlValue>,
  where: Record<string, SqlValue>,
): { sql: string; params: SqlValue[] } {
  const setColumns = Object.keys(row);
  const whereColumns = Object.keys(where);
  if (setColumns.length === 0) throw new Error(`UPDATE sem colunas em ${table}.`);
  if (whereColumns.length === 0) throw new Error(`UPDATE sem WHERE em ${table} e proibido.`);
  const setClause = setColumns.map((column) => `${column} = ?`).join(', ');
  const whereClause = whereColumns.map((column) => `${column} = ?`).join(' AND ');
  return {
    sql: `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`,
    params: [
      ...setColumns.map((column) => row[column] as SqlValue),
      ...whereColumns.map((column) => where[column] as SqlValue),
    ],
  };
}

export function buildSelect(
  table: string,
  where: Record<string, SqlValue> = {},
  options: { orderBy?: string; limit?: number } = {},
): { sql: string; params: SqlValue[] } {
  const whereColumns = Object.keys(where);
  const whereClause =
    whereColumns.length > 0
      ? ` WHERE ${whereColumns.map((column) => `${column} = ?`).join(' AND ')}`
      : '';
  const orderClause = options.orderBy ? ` ORDER BY ${options.orderBy}` : '';
  const limitClause = options.limit ? ` LIMIT ${Math.trunc(options.limit)}` : '';
  return {
    sql: `SELECT * FROM ${table}${whereClause}${orderClause}${limitClause}`,
    params: whereColumns.map((column) => where[column] as SqlValue),
  };
}
