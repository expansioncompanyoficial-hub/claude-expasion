import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { createContext, type AgentContext } from '../context.js';
import { getConfig, type AppConfig } from '../config/env.js';
import { montarApiContexto, type ApiContexto } from './contexto.js';
import { COOKIE_SESSAO, lerCookie } from './auth.js';
import {
  HttpError,
  PADRAO_CORPO_MAX,
  Router,
  lerCorpo,
  papelAtende,
  responder,
  respostaDeErro,
  type Metodo,
  type Requisicao,
} from './http.js';
import { rotasAuth } from './routes/auth.js';
import { rotasClients } from './routes/clients.js';
import { rotasCampaigns } from './routes/campaigns.js';
import { rotasCreatives } from './routes/creatives.js';
import { rotasData } from './routes/data.js';
import type { Database } from '../database/db.js';

const TIPOS_ESTATICOS: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
};

export interface ServerOptions {
  readonly config?: AppConfig;
  readonly db?: Database;
  readonly porta?: number;
  /** Pasta do frontend compilado. Quando ausente, so a API responde. */
  readonly estaticos?: string | null;
}

export interface ServidorMontado {
  readonly server: Server;
  readonly api: ApiContexto;
  readonly agent: AgentContext;
  fechar(): void;
}

export function montarServidor(options: ServerOptions = {}): ServidorMontado {
  const config = options.config ?? getConfig();
  const agent = createContext({
    config,
    ...(options.db ? { db: options.db } : {}),
    logStream: 'stderr',
    actor: 'api',
    actorKind: 'system',
  });

  const router = new Router();
  const api = montarApiContexto(agent, router);

  router
    .addAll(rotasAuth(api))
    .addAll(rotasClients(api))
    .addAll(rotasCampaigns(api))
    .addAll(rotasCreatives(api))
    .addAll(rotasData(api));

  const estaticos = options.estaticos ?? null;

  const server = createServer((req, res) => {
    void atender(req, res).catch((erro) => {
      agent.logger.error('Falha nao tratada na API.', { erro: String(erro) });
      responder(res, respostaDeErro(erro));
    });
  });

  async function atender(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const metodo = (req.method ?? 'GET').toUpperCase() as Metodo;

    // Nunca cacheia resposta de API: dado de campanha muda a todo momento.
    if (url.pathname.startsWith('/api/')) {
      const casado = router.casar(metodo, url.pathname);
      if (!casado) {
        responder(res, {
          status: 404,
          corpo: {
            ok: false,
            erro: { codigo: 'ROTA_NAO_ENCONTRADA', mensagem: 'Rota inexistente.' },
          },
        });
        return;
      }

      try {
        const token = lerCookie(req.headers.cookie, COOKIE_SESSAO);
        const sessao = api.auth.resolver(token);

        if (casado.rota.papel !== null) {
          if (!sessao) {
            throw new HttpError(401, 'SEM_SESSAO', 'Faca login para continuar.');
          }
          if (!papelAtende(sessao.papel, casado.rota.papel)) {
            throw new HttpError(
              403,
              'PAPEL_INSUFICIENTE',
              `Esta acao exige o papel "${casado.rota.papel}". O seu e "${sessao.papel}".`,
            );
          }
        }

        const limite = casado.rota.maxCorpoBytes ?? PADRAO_CORPO_MAX;
        const bytes = metodo === 'GET' ? Buffer.alloc(0) : await lerCorpo(req, limite);

        let corpo: unknown = undefined;
        const tipo = String(req.headers['content-type'] ?? '');
        if (bytes.length > 0 && tipo.includes('application/json')) {
          try {
            corpo = JSON.parse(bytes.toString('utf8'));
          } catch {
            throw new HttpError(
              422,
              'JSON_INVALIDO',
              'O corpo da requisicao nao e um JSON valido.',
            );
          }
        }

        const requisicao: Requisicao = {
          metodo,
          caminho: url.pathname,
          params: casado.params,
          query: url.searchParams,
          headers: req.headers,
          corpo,
          bytes,
          sessao,
          ip: (req.socket.remoteAddress ?? 'desconhecido').replace(/^::ffff:/, ''),
        };

        const resposta = await casado.rota.handler(requisicao);
        responder(res, {
          ...resposta,
          headers: { 'Cache-Control': 'no-store', ...resposta.headers },
        });
      } catch (erro) {
        responder(res, respostaDeErro(erro));
      }
      return;
    }

    if (!estaticos) {
      responder(res, { status: 404, corpo: { ok: false, erro: { mensagem: 'Nao encontrado.' } } });
      return;
    }

    servirEstatico(url.pathname, estaticos, res);
  }

  function servirEstatico(caminho: string, raiz: string, res: ServerResponse): void {
    const relativo = caminho === '/' ? 'index.html' : caminho.replace(/^\/+/, '');
    const alvo = path.resolve(raiz, relativo);

    // Impede sair da pasta do frontend por ../
    if (!alvo.startsWith(path.resolve(raiz))) {
      responder(res, {
        status: 403,
        corpo: { ok: false, erro: { mensagem: 'Caminho invalido.' } },
      });
      return;
    }

    const existe = existsSync(alvo) && statSync(alvo).isFile();
    // SPA: qualquer rota desconhecida cai no index para o router do frontend.
    const arquivo = existe ? alvo : path.join(raiz, 'index.html');

    if (!existsSync(arquivo)) {
      responder(res, {
        status: 404,
        corpo: { ok: false, erro: { mensagem: 'Frontend nao compilado. Rode npm run web:build.' } },
      });
      return;
    }

    const extensao = path.extname(arquivo).toLowerCase();
    const imutavel = existe && /\/assets\//.test(alvo);
    res.writeHead(200, {
      'Content-Type': TIPOS_ESTATICOS[extensao] ?? 'application/octet-stream',
      'Cache-Control': imutavel ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    createReadStream(arquivo).pipe(res);
  }

  return {
    server,
    api,
    agent,
    fechar(): void {
      server.close();
      if (!options.db) agent.close();
    },
  };
}

export async function iniciarServidor(options: ServerOptions = {}): Promise<ServidorMontado> {
  const montado = montarServidor(options);
  const porta = options.porta ?? Number(process.env.API_PORT ?? 4000);

  await new Promise<void>((resolve) => {
    montado.server.listen(porta, () => resolve());
  });

  montado.agent.logger.info('API no ar.', {
    porta,
    dryRun: montado.agent.config.dryRun,
    versaoApi: montado.agent.config.meta.apiVersion,
    rotas: montado.api.router.listar().length,
    usuariosCadastrados: !montado.api.auth.semUsuarios,
  });

  return montado;
}
