import type { HttpRequest, HttpResponse, HttpTransport } from '../../src/meta/http.js';

export interface MockRule {
  /**
   * Começando com "/", casa com o FIM do caminho da URL — assim `/ads` nao
   * casa com `/adsets`. Sem a barra, casa como substring da URL inteira
   * (util para IDs de objeto).
   */
  readonly match: string;
  readonly method?: 'GET' | 'POST' | 'DELETE';
  readonly status?: number;
  readonly body: unknown;
  readonly headers?: Record<string, string>;
  /** Quantas vezes esta regra responde antes de ser descartada. */
  readonly times?: number;
}

/**
 * Transporte falso. Registra tudo que recebeu para as asserções e devolve
 * respostas roteirizadas. Nunca abre socket.
 */
export class MockTransport implements HttpTransport {
  readonly requests: HttpRequest[] = [];
  private rules: MockRule[] = [];

  constructor(rules: MockRule[] = []) {
    this.rules = [...rules];
  }

  on(rule: MockRule): this {
    this.rules.push(rule);
    return this;
  }

  async send(request: HttpRequest): Promise<HttpResponse> {
    this.requests.push(request);

    const pathname = new URL(request.url).pathname;
    const index = this.rules.findIndex((rule) => {
      if (rule.method && rule.method !== request.method) return false;
      return rule.match.startsWith('/')
        ? pathname.endsWith(rule.match)
        : request.url.includes(rule.match);
    });

    if (index === -1) {
      return {
        status: 400,
        headers: {},
        body: {
          error: { message: `Sem regra no mock para ${request.method} ${request.url}`, code: 100 },
        },
        rawText: '',
      };
    }

    const rule = this.rules[index]!;
    if (rule.times !== undefined && rule.times <= 1) {
      this.rules.splice(index, 1);
    } else if (rule.times !== undefined) {
      this.rules[index] = { ...rule, times: rule.times - 1 };
    }

    const rawText = JSON.stringify(rule.body);
    return {
      status: rule.status ?? 200,
      headers: rule.headers ?? {},
      body: rule.body,
      rawText,
    };
  }

  /** Corpos enviados, decodificados, para verificar payloads. */
  bodies(): Array<Record<string, string>> {
    return this.requests.map((request) => {
      if (typeof request.body !== 'string') return {};
      return Object.fromEntries(new URLSearchParams(request.body));
    });
  }
}
