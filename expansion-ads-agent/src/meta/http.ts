/**
 * Transporte HTTP. Existe como interface para que os testes injetem um mock e
 * NENHUM teste automatico toque a Meta de verdade.
 */

export interface HttpRequest {
  readonly method: 'GET' | 'POST' | 'DELETE';
  readonly url: string;
  readonly headers?: Record<string, string>;
  readonly body?: string | FormData;
  readonly timeoutMs: number;
}

export interface HttpResponse {
  readonly status: number;
  readonly headers: Record<string, string>;
  readonly body: unknown;
  readonly rawText: string;
}

export interface HttpTransport {
  send(request: HttpRequest): Promise<HttpResponse>;
}

export class FetchTransport implements HttpTransport {
  async send(request: HttpRequest): Promise<HttpResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), request.timeoutMs);

    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        signal: controller.signal,
      });

      const rawText = await response.text();
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      let body: unknown = rawText;
      if (rawText.length > 0) {
        try {
          body = JSON.parse(rawText);
        } catch {
          body = rawText;
        }
      }

      return { status: response.status, headers, body, rawText };
    } finally {
      clearTimeout(timer);
    }
  }
}
