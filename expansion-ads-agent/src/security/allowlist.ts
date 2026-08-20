import { AuthorizationError, PolicyViolationError } from '../shared/errors.js';
import type { ClientRecord } from '../clients/schema.js';
import type { GlobalPolicy } from '../policies/schema.js';

/**
 * Trava de conta: a cliente so pode operar na conta de anuncios cadastrada.
 * Esta funcao e chamada em TODA ferramenta que toca uma conta.
 */
export function assertAdAccountAllowed(client: ClientRecord, adAccountId: string): string {
  const expected = client.config.meta.adAccountId;
  const normalized = adAccountId.trim();
  if (normalized !== expected) {
    throw new AuthorizationError(
      `Conta de anuncios nao autorizada para a cliente "${client.config.id}".`,
      {
        clientId: client.config.id,
        contaSolicitada: normalized,
        contaAutorizada: expected,
      },
      [
        `Use ${expected} — a unica conta cadastrada para esta cliente.`,
        'Se a conta mudou, atualize clients/<id>/config.json antes de operar.',
      ],
    );
  }
  return expected;
}

export function assertPageAllowed(client: ClientRecord, pageId: string): string {
  if (pageId.trim() !== client.config.meta.pageId) {
    throw new AuthorizationError(
      `Pagina nao autorizada para a cliente "${client.config.id}".`,
      {
        clientId: client.config.id,
        paginaSolicitada: pageId,
        paginaAutorizada: client.config.meta.pageId,
      },
    );
  }
  return client.config.meta.pageId;
}

export interface UrlCheck {
  readonly ok: boolean;
  readonly url: string;
  readonly problemas: string[];
}

/** Valida um destino contra a allowlist da cliente e a politica global. */
export function checkDestinationUrl(
  client: ClientRecord,
  rawUrl: string,
  policy: GlobalPolicy,
): UrlCheck {
  const problemas: string[] = [];
  let parsed: URL;

  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return { ok: false, url: rawUrl, problemas: ['URL malformada.'] };
  }

  if (policy.destinos.exigirHttps && parsed.protocol !== 'https:') {
    problemas.push('O destino precisa usar https.');
  }

  const host = parsed.hostname.toLowerCase();

  if (policy.destinos.bloquearEncurtadores) {
    const encurtador = policy.destinos.encurtadoresBloqueados.find(
      (blocked) => host === blocked || host.endsWith(`.${blocked}`),
    );
    if (encurtador) {
      problemas.push(`Encurtador bloqueado: ${encurtador}. Use a URL final.`);
    }
  }

  if (policy.destinos.exigirUrlNaAllowlistDoCliente) {
    const allowlist = client.config.urlsPermitidas;
    const domain = client.config.dominio?.toLowerCase() ?? null;

    const matchesAllowlist = allowlist.some((allowed) => {
      try {
        const allowedUrl = new URL(allowed);
        if (allowedUrl.hostname.toLowerCase() !== host) return false;
        const allowedPath = allowedUrl.pathname.replace(/\/$/, '');
        const candidatePath = parsed.pathname.replace(/\/$/, '');
        return allowedPath === '' || candidatePath === allowedPath || candidatePath.startsWith(`${allowedPath}/`);
      } catch {
        return false;
      }
    });

    const matchesDomain = domain !== null && (host === domain || host.endsWith(`.${domain}`));

    if (!matchesAllowlist && !matchesDomain) {
      problemas.push(
        `Host "${host}" nao esta na allowlist da cliente. Permitidos: ${
          [domain, ...allowlist].filter(Boolean).join(', ') || '(nenhum cadastrado)'
        }.`,
      );
    }
  }

  return { ok: problemas.length === 0, url: parsed.toString(), problemas };
}

export function assertDestinationUrl(
  client: ClientRecord,
  rawUrl: string,
  policy: GlobalPolicy,
): string {
  const check = checkDestinationUrl(client, rawUrl, policy);
  if (!check.ok) {
    throw new PolicyViolationError(
      'global-policy',
      'destinos',
      `Destino nao autorizado: ${rawUrl}`,
      { problemas: check.problemas, clientId: client.config.id },
      [
        'Adicione a URL final em "urlsPermitidas" no cadastro da cliente, se ela for legitima.',
        ...check.problemas,
      ],
    );
  }
  return check.url;
}
