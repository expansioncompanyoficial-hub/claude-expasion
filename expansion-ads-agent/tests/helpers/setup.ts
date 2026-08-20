/**
 * Setup global do vitest.
 *
 * Nenhum teste automatico pode tocar a Meta de verdade nem gastar dinheiro.
 * O `fetch` global e substituido por uma trava que falha o teste na hora.
 *
 * Excecao unica: loopback. Os testes da camada HTTP sobem o proprio servidor
 * numa porta efemera e falam com ele por 127.0.0.1 — isso e o alvo do teste,
 * nao uma chamada externa. Qualquer outro host continua barrado, entao a
 * garantia de "nenhum teste chama a Meta" segue valendo.
 */
import { beforeAll } from 'vitest';

const HOSTS_PERMITIDOS = new Set(['127.0.0.1', 'localhost', '::1', '[::1]']);

function ehLoopback(input: unknown): boolean {
  try {
    const url = new URL(
      typeof input === 'string' ? input : ((input as Request).url ?? String(input)),
    );
    return HOSTS_PERMITIDOS.has(url.hostname);
  } catch {
    return false;
  }
}

beforeAll(() => {
  const original = globalThis.fetch;

  globalThis.fetch = (async (input: unknown, init?: unknown) => {
    if (ehLoopback(input)) {
      return original(
        input as Parameters<typeof original>[0],
        init as Parameters<typeof original>[1],
      );
    }
    throw new Error(
      `Teste tentou fazer uma chamada de rede real para ${String(input)}. ` +
        'Use o MockTransport de tests/helpers/meta-mock.ts.',
    );
  }) as typeof fetch;
});
