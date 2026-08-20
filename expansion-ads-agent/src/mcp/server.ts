#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createContext } from '../context.js';
import { describeConfig } from '../config/env.js';
import { toAppError } from '../shared/errors.js';
import { registerAllTools } from './tools/index.js';

export const SERVER_NAME = 'meta-ads';
export const SERVER_VERSION = '0.1.0';

export function buildServer(ctxOverrides: Parameters<typeof createContext>[0] = {}): {
  server: McpServer;
  ctx: ReturnType<typeof createContext>;
} {
  // stdout pertence ao protocolo JSON-RPC: todo log vai para stderr.
  const ctx = createContext({ logStream: 'stderr', actorKind: 'claude', ...ctxOverrides });

  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions: [
        'Servidor MCP do EXPANSION ADS AGENT para a Meta Marketing API.',
        '',
        'Regras que o codigo aplica e o modelo nao pode contornar:',
        '- Nao existe chamada arbitraria a Graph API. Use apenas as ferramentas listadas.',
        '- Toda campanha nasce PAUSED.',
        '- DRY_RUN esta ligado por padrao: nenhuma escrita sai do processo.',
        '- Ativar exige aprovacao humana valida, registrada no terminal.',
        '- Cada cliente so opera na conta de anuncios cadastrada para ela.',
        '- Orcamento acima do limite da cliente e recusado.',
        '',
        'Ordem recomendada: validar acesso -> validar ativos -> validar briefing ->',
        'checar duplicidade -> criar pausado -> conferir na Meta -> pedir aprovacao.',
      ].join('\n'),
    },
  );

  registerAllTools(server, ctx);
  return { server, ctx };
}

export async function main(): Promise<void> {
  const { server, ctx } = buildServer();

  ctx.logger.info('Servidor MCP meta-ads iniciando.', {
    servidor: SERVER_NAME,
    versao: SERVER_VERSION,
    ambiente: describeConfig(ctx.config),
  });

  const encerrar = (): void => {
    ctx.logger.info('Encerrando servidor MCP meta-ads.');
    ctx.close();
    process.exit(0);
  };
  process.on('SIGINT', encerrar);
  process.on('SIGTERM', encerrar);

  await server.connect(new StdioServerTransport());
}

const executadoDiretamente =
  process.argv[1] !== undefined && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (executadoDiretamente || process.env.EXPANSION_MCP_AUTOSTART === '1') {
  main().catch((error) => {
    const appError = toAppError(error);
    process.stderr.write(`${JSON.stringify({ erro: appError.toJSON() })}\n`);
    process.exit(1);
  });
}
