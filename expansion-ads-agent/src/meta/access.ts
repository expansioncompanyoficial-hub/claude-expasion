import { describeConfig } from '../config/env.js';
import type { AgentContext } from '../context.js';
import { fingerprintSecret } from '../security/secrets.js';
import { toAppError } from '../shared/errors.js';

export interface AccessCheck {
  readonly ok: boolean;
  readonly ambiente: Record<string, unknown>;
  readonly tokenConfigurado: boolean;
  /** Marca do token, nunca o token. Ex.: `EAA***bc (len=210)`. */
  readonly tokenImpressaoDigital: string;
  readonly problemas: string[];
  readonly cliente: {
    id: string;
    nome: string;
    status: string;
    origemDoCadastro: string;
    conta: string;
  } | null;
  readonly contaVisivelPeloToken: boolean | null;
  /** Contas que o token enxerga. Só preenchido quando nenhuma cliente foi pedida. */
  readonly contasVisiveis: Array<{ id: string; nome: string | null; moeda: string | null }> | null;
}

/**
 * Confere ambiente, versao da Graph API, presenca de credencial (sem revela-la)
 * e se o token enxerga a conta cadastrada. Somente leitura.
 *
 * Compartilhado entre a ferramenta MCP `meta_validate_access` e o comando
 * `npm run meta:validate-access`, para que os dois digam exatamente a mesma coisa.
 */
export async function verificarAcesso(ctx: AgentContext, clientId?: string): Promise<AccessCheck> {
  const problemas: string[] = [];
  const tokenConfigurado = ctx.config.meta.hasCredentials;

  if (!tokenConfigurado) {
    problemas.push(
      'META_ACCESS_TOKEN nao configurado. O sistema opera apenas em dry-run com dados simulados.',
    );
  }

  let cliente: AccessCheck['cliente'] = null;
  let contaVisivelPeloToken: boolean | null = null;
  let contasVisiveis: AccessCheck['contasVisiveis'] = null;

  if (clientId) {
    const client = ctx.clients.load(clientId);
    cliente = {
      id: client.config.id,
      nome: client.config.nome,
      status: client.config.status,
      origemDoCadastro: client.isExample ? 'config.example.json' : 'config.json',
      conta: client.config.meta.adAccountId,
    };

    if (client.isExample) {
      problemas.push(
        `A cliente "${client.config.id}" veio de config.example.json. Crie clients/${client.config.id}/config.json para operar de verdade.`,
      );
    }

    if (tokenConfigurado) {
      const contas = await listarContas(ctx, problemas);
      if (contas !== null) {
        contaVisivelPeloToken = contas.some((conta) => conta.id === client.config.meta.adAccountId);
        if (!contaVisivelPeloToken) {
          problemas.push(
            `O token nao enxerga a conta ${client.config.meta.adAccountId}. Confira o acesso do usuario de sistema no Business Manager.`,
          );
        }
      }
    }
  } else if (tokenConfigurado) {
    const contas = await listarContas(ctx, problemas);
    if (contas !== null) {
      contasVisiveis = contas.map((conta) => ({
        id: conta.id,
        nome: conta.name ?? null,
        moeda: conta.currency ?? null,
      }));
      if (contasVisiveis.length === 0) {
        problemas.push(
          'O token e valido mas nao enxerga nenhuma conta de anuncios. Confira, no Business Manager, se o usuario de sistema recebeu a conta como ativo.',
        );
      }
    }
  }

  return {
    ok: problemas.length === 0,
    ambiente: describeConfig(ctx.config),
    tokenConfigurado,
    tokenImpressaoDigital: fingerprintSecret(ctx.config.meta.accessToken),
    problemas,
    cliente,
    contaVisivelPeloToken,
    contasVisiveis,
  };
}

/**
 * Consulta as contas visiveis pelo token.
 *
 * Uma falha aqui NAO derruba o diagnostico: token invalido, expirado ou sem
 * permissao e exatamente o que este comando existe para relatar. O erro vira
 * um problema descrito, com o caminho de correcao.
 */
async function listarContas(
  ctx: AgentContext,
  problemas: string[],
): Promise<Awaited<ReturnType<AgentContext['meta']['listAdAccounts']>> | null> {
  try {
    return await ctx.meta.listAdAccounts(200);
  } catch (error) {
    const appError = toAppError(error);
    problemas.push(`A Meta recusou a consulta com este token: ${appError.message}`);
    for (const passo of appError.remediation) problemas.push(passo);
    return null;
  }
}
