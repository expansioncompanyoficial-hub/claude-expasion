import { appendFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { redact } from './redact.js';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 100,
};

export interface LogRecord {
  readonly ts: string;
  readonly level: Exclude<LogLevel, 'silent'>;
  readonly msg: string;
  readonly ctx?: Record<string, unknown>;
}

export interface LoggerOptions {
  readonly level: LogLevel;
  readonly dir?: string | null;
  readonly pretty?: boolean;
  /**
   * Onde escrever. O servidor MCP fala JSON-RPC pelo stdout, entao TODO log
   * do processo MCP precisa ir para stderr. Padrao: stderr.
   */
  readonly stream?: 'stderr' | 'stdout' | 'none';
  readonly baseContext?: Record<string, unknown>;
  /** Injetavel para testes. */
  readonly now?: () => Date;
}

export class Logger {
  private readonly level: LogLevel;
  private readonly dir: string | null;
  private readonly pretty: boolean;
  private readonly stream: 'stderr' | 'stdout' | 'none';
  private readonly baseContext: Record<string, unknown>;
  private readonly now: () => Date;
  private fileReady = false;

  constructor(options: LoggerOptions) {
    this.level = options.level;
    this.dir = options.dir ?? null;
    this.pretty = options.pretty ?? false;
    this.stream = options.stream ?? 'stderr';
    this.baseContext = options.baseContext ?? {};
    this.now = options.now ?? (() => new Date());
  }

  child(context: Record<string, unknown>): Logger {
    return new Logger({
      level: this.level,
      dir: this.dir,
      pretty: this.pretty,
      stream: this.stream,
      baseContext: { ...this.baseContext, ...context },
      now: this.now,
    });
  }

  debug(msg: string, ctx?: Record<string, unknown>): void {
    this.write('debug', msg, ctx);
  }

  info(msg: string, ctx?: Record<string, unknown>): void {
    this.write('info', msg, ctx);
  }

  warn(msg: string, ctx?: Record<string, unknown>): void {
    this.write('warn', msg, ctx);
  }

  error(msg: string, ctx?: Record<string, unknown>): void {
    this.write('error', msg, ctx);
  }

  private write(level: Exclude<LogLevel, 'silent'>, msg: string, ctx?: Record<string, unknown>): void {
    if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[this.level]) return;

    const merged = { ...this.baseContext, ...(ctx ?? {}) };
    const record: LogRecord = {
      ts: this.now().toISOString(),
      level,
      msg: redact(msg),
      ...(Object.keys(merged).length > 0 ? { ctx: redact(merged) } : {}),
    };

    const line = this.pretty ? prettyLine(record) : JSON.stringify(record);
    this.emit(line);
    this.persist(record);
  }

  private emit(line: string): void {
    if (this.stream === 'none') return;
    const target = this.stream === 'stdout' ? process.stdout : process.stderr;
    target.write(`${line}\n`);
  }

  private persist(record: LogRecord): void {
    if (!this.dir) return;
    try {
      if (!this.fileReady) {
        mkdirSync(this.dir, { recursive: true });
        this.fileReady = true;
      }
      const day = record.ts.slice(0, 10);
      appendFileSync(path.join(this.dir, `agent-${day}.log`), `${JSON.stringify(record)}\n`, 'utf8');
    } catch {
      // Log em arquivo e best-effort: nunca pode derrubar a operacao.
    }
  }
}

function prettyLine(record: LogRecord): string {
  const ctx = record.ctx ? ` ${JSON.stringify(record.ctx)}` : '';
  return `${record.ts} ${record.level.toUpperCase().padEnd(5)} ${record.msg}${ctx}`;
}

let rootLogger: Logger | null = null;

export function getLogger(): Logger {
  if (!rootLogger) {
    rootLogger = new Logger({ level: 'info', dir: null, stream: 'stderr' });
  }
  return rootLogger;
}

export function setRootLogger(logger: Logger): void {
  rootLogger = logger;
}

export function createLoggerFromConfig(config: {
  log: { level: LogLevel; dir: string; pretty: boolean };
}, stream: 'stderr' | 'stdout' | 'none' = 'stderr'): Logger {
  return new Logger({
    level: config.log.level,
    dir: config.log.dir,
    pretty: config.log.pretty,
    stream,
  });
}
