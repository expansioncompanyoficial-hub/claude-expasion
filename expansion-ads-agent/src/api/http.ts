import type { IncomingMessage, ServerResponse } from 'node:http';
import { ZodError } from 'zod';
import { AppError, toAppError, ValidationError } from '../shared/errors.js';
import { redact } from '../logging/redact.js';

/**
 * Roteador minimo sobre node:http.
 *
 * O projeto ja evita framework em todo lugar (parseArgs na CLI, node:sqlite no
 * banco, fetch nativo na Meta). Trazer Express so para servir ~30 rotas seria
 * a unica dependencia pesada do repositorio.
 */

export type Metodo = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Sessao {
  readonly usuarioId: string;
  readonly email: string;
  readonly nome: string;
  readonly papel: Papel;
}

export const PAPEIS = ['visualizador', 'operador', 'gestor', 'admin'] as const;
export type Papel = (typeof PAPEIS)[number];

/** Hierarquia: cada papel inclui os poderes dos anteriores. */
const FORCA: Record<Papel, number> = {
  visualizador: 1,
  operador: 2,
  gestor: 3,
  admin: 4,
};

export function papelAtende(papel: Papel, minimo: Papel): boolean {
  return FORCA[papel] >= FORCA[minimo];
}

export interface Requisicao {
  readonly metodo: Metodo;
  readonly caminho: string;
  readonly params: Record<string, string>;
  readonly query: URLSearchParams;
  readonly headers: Record<string, string | string[] | undefined>;
  readonly corpo: unknown;
  /** Corpo bruto — usado só pelo upload multipart. */
  readonly bytes: Buffer;
  readonly sessao: Sessao | null;
  readonly ip: string;
}

export interface Resposta {
  readonly status: number;
  readonly corpo?: unknown;
  readonly headers?: Record<string, string>;
}

export type Handler = (req: Requisicao) => Promise<Resposta> | Resposta;

export interface Rota {
  readonly metodo: Metodo;
  /** Padrao com `:param`, ex.: `/api/campaigns/:id/activate`. */
  readonly caminho: string;
  /** Papel minimo. `null` = rota publica. */
  readonly papel: Papel | null;
  readonly handler: Handler;
  /** Limite de corpo em bytes. Padrao 1 MiB; upload usa mais. */
  readonly maxCorpoBytes?: number;
}

export const PADRAO_CORPO_MAX = 1024 * 1024;

interface RotaCompilada extends Rota {
  readonly segmentos: string[];
}

export class Router {
  private readonly rotas: RotaCompilada[] = [];

  add(rota: Rota): this {
    this.rotas.push({ ...rota, segmentos: rota.caminho.split('/').filter(Boolean) });
    return this;
  }

  addAll(rotas: readonly Rota[]): this {
    for (const rota of rotas) this.add(rota);
    return this;
  }

  /** Rotas registradas — usado pelos testes e pela tela de diagnostico. */
  listar(): Array<{ metodo: Metodo; caminho: string; papel: Papel | null }> {
    return this.rotas.map((r) => ({ metodo: r.metodo, caminho: r.caminho, papel: r.papel }));
  }

  casar(
    metodo: string,
    caminho: string,
  ): { rota: RotaCompilada; params: Record<string, string> } | null {
    const alvo = caminho.split('/').filter(Boolean);
    for (const rota of this.rotas) {
      if (rota.metodo !== metodo) continue;
      if (rota.segmentos.length !== alvo.length) continue;

      const params: Record<string, string> = {};
      let casou = true;
      for (let i = 0; i < rota.segmentos.length; i += 1) {
        const esperado = rota.segmentos[i]!;
        const recebido = alvo[i]!;
        if (esperado.startsWith(':')) {
          params[esperado.slice(1)] = decodeURIComponent(recebido);
        } else if (esperado !== recebido) {
          casou = false;
          break;
        }
      }
      if (casou) return { rota, params };
    }
    return null;
  }
}

export class HttpError extends AppError {
  readonly status: number;

  constructor(status: number, code: string, message: string, details?: Record<string, unknown>) {
    super({ code, category: status === 403 ? 'authorization' : 'validation', message, details });
    this.status = status;
  }
}

/**
 * Traduz a taxonomia de erros do backend para HTTP, em portugues.
 *
 * A mensagem tecnica original vai em `detalhes` — a interface a esconde numa
 * area expansivel em vez de jogar erro cru da Meta na cara do operador.
 */
export function statusParaErro(erro: AppError): number {
  if (erro instanceof HttpError) return erro.status;
  switch (erro.category) {
    case 'authorization':
      return 403;
    case 'not_found':
      return 404;
    case 'duplicate':
      return 409;
    case 'state':
      return 409;
    case 'validation':
    case 'policy':
    case 'approval':
      return 422;
    case 'rate_limit':
      return 429;
    case 'meta_api':
      return 502;
    case 'config':
      return 503;
    default:
      return 500;
  }
}

export async function lerCorpo(req: IncomingMessage, maxBytes: number): Promise<Buffer> {
  const partes: Buffer[] = [];
  let total = 0;

  for await (const parte of req) {
    const chunk = parte as Buffer;
    total += chunk.length;
    if (total > maxBytes) {
      throw new HttpError(413, 'CORPO_GRANDE_DEMAIS', 'O corpo da requisicao excede o limite.', {
        limiteBytes: maxBytes,
      });
    }
    partes.push(chunk);
  }

  return Buffer.concat(partes);
}

export function responder(res: ServerResponse, resposta: Resposta): void {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin',
    ...resposta.headers,
  };

  if (resposta.corpo === undefined) {
    res.writeHead(resposta.status, headers);
    res.end();
    return;
  }

  if (Buffer.isBuffer(resposta.corpo)) {
    res.writeHead(resposta.status, headers);
    res.end(resposta.corpo);
    return;
  }

  const texto =
    typeof resposta.corpo === 'string' ? resposta.corpo : JSON.stringify(redact(resposta.corpo));
  res.writeHead(resposta.status, headers);
  res.end(texto);
}

/**
 * Falha de schema e erro de ENTRADA, nao falha do servidor.
 *
 * Sem esta conversao, um corpo malformado sobe como excecao crua e vira 500 —
 * o que culpa o servidor por um erro de quem chamou e nao diz qual campo esta
 * errado.
 */
function deZodParaValidacao(valor: unknown): unknown {
  if (!(valor instanceof ZodError)) return valor;
  return new ValidationError(
    `Dados invalidos: ${valor.issues.length} problema(s) no corpo da requisicao.`,
    {
      issues: valor.issues.map((i) => ({
        campo: i.path.join('.') || '(raiz)',
        problema: i.message,
      })),
    },
    valor.issues.map((i) => `${i.path.join('.') || 'corpo'}: ${i.message}`),
  );
}

export function respostaDeErro(valor: unknown): Resposta {
  const erro = toAppError(deZodParaValidacao(valor));
  const status = statusParaErro(erro);
  return {
    status,
    corpo: {
      ok: false,
      erro: {
        codigo: erro.code,
        categoria: erro.category,
        mensagem: erro.message,
        comoResolver: erro.remediation,
        detalhes: redact(erro.details),
      },
    },
  };
}
