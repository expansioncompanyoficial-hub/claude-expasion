import { MetaApiError, RateLimitError } from '../shared/errors.js';

export interface MetaErrorPayload {
  message?: string;
  type?: string;
  code?: number;
  error_subcode?: number;
  error_user_title?: string;
  error_user_msg?: string;
  fbtrace_id?: string;
}

/** Codigos da Meta que significam "voce estourou o limite de chamadas". */
const RATE_LIMIT_CODES = new Set([4, 17, 32, 613, 80000, 80003, 80004, 80005, 80006, 80008, 80009]);

/** Codigos transitorios: vale tentar de novo com backoff. */
const TRANSIENT_CODES = new Set([1, 2, 341, 368]);

const REMEDIATION_BY_CODE: Record<number, string[]> = {
  190: [
    'O token de acesso esta invalido ou expirado.',
    'Gere um novo token de usuario de sistema no Business Manager e atualize META_ACCESS_TOKEN no .env.',
  ],
  200: [
    'O token nao tem permissao para esta operacao.',
    'Confira os escopos: ads_management, ads_read, business_management, pages_show_list, pages_read_engagement.',
    'Confira tambem se o usuario de sistema tem acesso a conta de anuncios e a Pagina.',
  ],
  100: [
    'Parametro invalido para esta versao da Graph API.',
    'Confira o campo citado na mensagem e a versao em META_GRAPH_API_VERSION.',
  ],
  294: ['A Pagina exige permissao de gestao de anuncios que o token nao tem.'],
  272: ['A conta de anuncios nao pertence ao Business Manager informado.'],
  2635: ['Campo ou objetivo depreciado nesta versao. Atualize o modelo de campanha.'],
};

export function parseMetaError(
  httpStatus: number,
  body: unknown,
  headers: Record<string, string>,
): MetaApiError {
  const payload = extractPayload(body);
  const code = typeof payload.code === 'number' ? payload.code : null;
  const subcode = typeof payload.error_subcode === 'number' ? payload.error_subcode : null;
  const fbtraceId = payload.fbtrace_id ?? null;

  const message = [payload.error_user_title, payload.error_user_msg, payload.message]
    .filter((part): part is string => Boolean(part && part.trim()))
    .join(' | ')
    .trim();

  const details: Record<string, unknown> = {
    type: payload.type ?? null,
    usoDaConta: headers['x-ad-account-usage'] ?? null,
    usoPorCasoDeUso: headers['x-business-use-case-usage'] ?? null,
    usoDoApp: headers['x-app-usage'] ?? null,
  };

  if (code !== null && RATE_LIMIT_CODES.has(code)) {
    return new RateLimitError({
      message: message || 'Limite de requisicoes da Meta atingido.',
      httpStatus,
      retryAfterMs: estimateRetryAfterMs(headers),
      metaCode: code,
      metaSubcode: subcode,
      fbtraceId,
      details,
    });
  }

  if (httpStatus === 429) {
    return new RateLimitError({
      message: message || 'Limite de requisicoes (HTTP 429).',
      httpStatus,
      retryAfterMs: estimateRetryAfterMs(headers),
      metaCode: code,
      metaSubcode: subcode,
      fbtraceId,
      details,
    });
  }

  const retryable =
    httpStatus >= 500 || (code !== null && TRANSIENT_CODES.has(code)) || httpStatus === 408;

  return new MetaApiError({
    message: message || `Erro da Meta (HTTP ${httpStatus}).`,
    httpStatus,
    metaCode: code,
    metaSubcode: subcode,
    fbtraceId,
    retryable,
    details,
    remediation: code !== null ? REMEDIATION_BY_CODE[code] : undefined,
  });
}

function extractPayload(body: unknown): MetaErrorPayload {
  if (body && typeof body === 'object') {
    const maybe = body as { error?: MetaErrorPayload };
    if (maybe.error && typeof maybe.error === 'object') return maybe.error;
    return body as MetaErrorPayload;
  }
  return { message: typeof body === 'string' ? body.slice(0, 500) : undefined };
}

/**
 * Deriva a espera a partir dos cabecalhos de uso da Meta.
 * `x-business-use-case-usage` traz `estimated_time_to_regain_access` em minutos.
 */
export function estimateRetryAfterMs(headers: Record<string, string>): number {
  const retryAfter = headers['retry-after'];
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds > 0) return Math.min(seconds * 1000, 600_000);
  }

  const usage = headers['x-business-use-case-usage'];
  if (usage) {
    try {
      const parsed = JSON.parse(usage) as Record<
        string,
        Array<{ estimated_time_to_regain_access?: number }>
      >;
      const minutes = Object.values(parsed)
        .flat()
        .map((entry) => entry?.estimated_time_to_regain_access ?? 0)
        .reduce((max, value) => Math.max(max, value), 0);
      if (minutes > 0) return Math.min(minutes * 60_000, 600_000);
    } catch {
      // cabecalho fora do formato esperado: cai no padrao
    }
  }

  return 60_000;
}

/** Percentual de uso mais alto reportado pela Meta (para avisar antes de bloquear). */
export function readUsagePercent(headers: Record<string, string>): number | null {
  const candidates = ['x-business-use-case-usage', 'x-ad-account-usage', 'x-app-usage'];
  let highest: number | null = null;

  for (const header of candidates) {
    const raw = headers[header];
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as unknown;
      const entries = Array.isArray(parsed)
        ? parsed
        : Object.values(parsed as Record<string, unknown>).flat();
      for (const entry of entries as Array<Record<string, unknown>>) {
        if (!entry || typeof entry !== 'object') continue;
        for (const key of ['call_count', 'total_cputime', 'total_time', 'acc_id_util_pct']) {
          const value = entry[key];
          if (typeof value === 'number') highest = Math.max(highest ?? 0, value);
        }
      }
    } catch {
      // ignora cabecalho malformado
    }
  }

  return highest;
}
