/**
 * Setup global do vitest.
 *
 * Nenhum teste automatico pode tocar a Meta de verdade nem gastar dinheiro:
 * o `fetch` global e substituido por uma trava que falha o teste na hora.
 */
import { beforeAll } from 'vitest';

beforeAll(() => {
  globalThis.fetch = (async (input: unknown) => {
    throw new Error(
      `Teste tentou fazer uma chamada de rede real para ${String(input)}. ` +
        'Use o MockTransport de tests/helpers/meta-mock.ts.',
    );
  }) as typeof fetch;
});
