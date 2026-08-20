import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { AgentContext } from '../context.js';
import { redact } from '../logging/redact.js';
import { serializeError } from '../logging/audit.js';
import { toAppError } from '../shared/errors.js';
import { adAccountIdSchema } from '../clients/schema.js';

export interface ToolResult {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
  structuredContent?: Record<string, unknown>;
}

export type ToolCategory = 'leitura' | 'validacao' | 'criacao' | 'protegida';

export interface ToolDefinition<Shape extends z.ZodRawShape> {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly category: ToolCategory;
  readonly inputSchema: Shape;
  readonly readOnly: boolean;
  readonly destructive?: boolean;
  handler(args: z.objectOutputType<Shape, z.ZodTypeAny>, ctx: AgentContext): Promise<unknown>;
}

/** Campos comuns — repetidos em quase toda ferramenta. */
export const clientIdField = z
  .string()
  .trim()
  .min(1)
  .describe('Identificador interno da cliente cadastrada em clients/<id>/config.json.');

export const adAccountField = adAccountIdSchema.describe(
  'Conta de anuncios no formato act_<digitos>. Precisa ser exatamente a conta cadastrada para a cliente.',
);

export const campaignIdField = z
  .string()
  .trim()
  .min(1)
  .describe('ID interno da campanha (cmp_...) ou o ID da campanha na Meta.');

/**
 * Registra uma ferramenta no servidor MCP com:
 * auditoria, redacao de segredos, mensagens de erro uteis e resposta em JSON.
 *
 * Nenhuma ferramenta escapa deste wrapper — e aqui que a trilha de auditoria
 * fica garantida mesmo quando o handler falha.
 */
export function registerTool<Shape extends z.ZodRawShape>(
  server: McpServer,
  ctx: AgentContext,
  definition: ToolDefinition<Shape>,
): void {
  server.registerTool(
    definition.name,
    {
      title: definition.title,
      description: definition.description,
      inputSchema: definition.inputSchema,
      annotations: {
        readOnlyHint: definition.readOnly,
        destructiveHint: definition.destructive ?? false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    (async (args: unknown): Promise<ToolResult> => {
      const iniciou = Date.now();
      const parametros = args as Record<string, unknown>;
      const clientId = typeof parametros?.clientId === 'string' ? parametros.clientId : null;
      const adAccountId =
        typeof parametros?.adAccountId === 'string' ? parametros.adAccountId : null;
      const campaignId = typeof parametros?.campaignId === 'string' ? parametros.campaignId : null;

      try {
        const resultado = await definition.handler(
          args as z.objectOutputType<Shape, z.ZodTypeAny>,
          ctx,
        );

        ctx.audit.record({
          actor: ctx.actor,
          actorKind: 'claude',
          tool: definition.name,
          clientId,
          adAccountId,
          campaignId,
          params: parametros,
          outcome: ctx.meta.dryRun && definition.category !== 'leitura' ? 'dry_run' : 'success',
          dryRun: ctx.meta.dryRun,
          durationMs: Date.now() - iniciou,
        });

        return jsonResult({ ok: true, ferramenta: definition.name, ...(resultado as object) });
      } catch (error) {
        const appError = toAppError(error);

        ctx.audit.record({
          actor: ctx.actor,
          actorKind: 'claude',
          tool: definition.name,
          clientId,
          adAccountId,
          campaignId,
          params: parametros,
          outcome: appError.category === 'policy' || appError.category === 'authorization' ? 'blocked' : 'error',
          error: appError,
          dryRun: ctx.meta.dryRun,
          durationMs: Date.now() - iniciou,
        });

        if (appError.category === 'policy') {
          ctx.audit.violation({
            clientId,
            campaignId,
            tool: definition.name,
            policy: String(appError.details.policy ?? 'desconhecida'),
            rule: String(appError.details.rule ?? appError.code),
            severity: 'block',
            message: appError.message,
            context: appError.details,
          });
        }

        return jsonResult(
          {
            ok: false,
            ferramenta: definition.name,
            erro: {
              codigo: appError.code,
              categoria: appError.category,
              mensagem: appError.message,
              detalhes: appError.details,
              comoResolver: appError.remediation,
            },
          },
          true,
        );
      }
    }) as never,
  );
}

/** Toda resposta sai como JSON redigido — nunca texto solto com segredo dentro. */
export function jsonResult(payload: unknown, isError = false): ToolResult {
  const limpo = redact(payload);
  return {
    content: [{ type: 'text', text: JSON.stringify(limpo, null, 2) }],
    ...(isError ? { isError: true } : {}),
  };
}

export function erroSerializado(error: unknown): Record<string, unknown> {
  return serializeError(error);
}
