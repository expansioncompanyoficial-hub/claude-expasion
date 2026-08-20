import path from 'node:path';
import { existsSync } from 'node:fs';
import type { AgentContext } from '../../context.js';
import { iniciarServidor } from '../../api/server.js';
import { flagOptional, type ParsedCli } from '../args.js';
import { aviso, EXIT, item, linha, ok, titulo } from '../output.js';

/** `npm run web` — sobe a plataforma EXPANSION ADS. */
export async function comandoWeb(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const porta = Number(flagOptional(cli, 'porta') ?? process.env.API_PORT ?? 4000);
  const pastaWeb = path.join(ctx.config.paths.root, 'web', 'dist');
  const temFrontend = existsSync(path.join(pastaWeb, 'index.html'));

  const montado = await iniciarServidor({
    config: ctx.config,
    porta,
    estaticos: temFrontend ? pastaWeb : null,
  });

  titulo('EXPANSION ADS');
  item(`Endereco: http://localhost:${porta}`);
  item(`Rotas de API: ${montado.api.router.listar().length}`);
  item(`Dry-run: ${ctx.config.dryRun ? 'LIGADO — nada e criado na Meta' : 'DESLIGADO'}`);
  item(`Versao da Graph API: ${ctx.config.meta.apiVersion}`);
  linha('');

  if (!temFrontend) {
    aviso('Frontend nao compilado: apenas a API responde. Rode npm run web:build.');
    linha('');
  }
  if (montado.api.auth.semUsuarios) {
    aviso('Nenhum usuario cadastrado. Ninguem consegue entrar ainda.');
    item(
      "EXPANSION_USER_PASSWORD='sua-senha' npm run user:create --email voce@agencia.com --nome 'Seu Nome'",
    );
    linha('');
  }
  if (!ctx.config.meta.hasCredentials) {
    aviso('Sem META_ACCESS_TOKEN: a plataforma sobe, mas metricas da Meta ficam indisponiveis.');
    linha('');
  }

  ok('No ar. Ctrl+C para encerrar.');
  linha('');

  await new Promise<void>((resolve) => {
    const encerrar = () => {
      montado.fechar();
      resolve();
    };
    process.once('SIGINT', encerrar);
    process.once('SIGTERM', encerrar);
  });

  return EXIT.OK;
}
