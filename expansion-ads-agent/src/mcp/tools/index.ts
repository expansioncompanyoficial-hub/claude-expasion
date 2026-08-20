import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AgentContext } from '../../context.js';
import { registerCreationTools } from './create.js';
import { registerProtectedTools } from './protected.js';
import { registerReadTools } from './read.js';
import { registerValidationTools } from './validate.js';

/**
 * Registra todas as ferramentas.
 *
 * Nao existe — e nao pode existir — uma ferramenta generica tipo
 * `meta_raw_request`. Cada capacidade e uma ferramenta especifica, com schema
 * rigido, checagem de cliente/conta e registro na auditoria.
 */
export function registerAllTools(server: McpServer, ctx: AgentContext): void {
  registerReadTools(server, ctx);
  registerValidationTools(server, ctx);
  registerCreationTools(server, ctx);
  registerProtectedTools(server, ctx);
}
