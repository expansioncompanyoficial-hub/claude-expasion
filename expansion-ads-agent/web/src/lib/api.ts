/**
 * Camada central de API.
 *
 * Todo acesso ao backend passa por aqui. O navegador nunca chama a Graph API:
 * a única origem que este arquivo conhece é a própria plataforma.
 */

export interface ErroApi {
  readonly codigo: string;
  readonly categoria: string;
  readonly mensagem: string;
  readonly comoResolver: string[];
  readonly detalhes: unknown;
}

export class FalhaApi extends Error {
  readonly status: number;
  readonly erro: ErroApi;

  constructor(status: number, erro: ErroApi) {
    super(erro.mensagem);
    this.name = 'FalhaApi';
    this.status = status;
    this.erro = erro;
  }

  /** true quando a sessão caiu e o certo é voltar para o login. */
  get semSessao(): boolean {
    return this.status === 401;
  }
}

const ERRO_PADRAO: ErroApi = {
  codigo: 'ERRO_DESCONHECIDO',
  categoria: 'internal',
  mensagem: 'Não foi possível concluir a operação.',
  comoResolver: [],
  detalhes: null,
};

async function requisitar<T>(
  caminho: string,
  opcoes: RequestInit & { corpoJson?: unknown } = {},
): Promise<T> {
  const { corpoJson, ...resto } = opcoes;

  const init: RequestInit = {
    ...resto,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...(corpoJson !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(resto.headers ?? {}),
    },
    ...(corpoJson !== undefined ? { body: JSON.stringify(corpoJson) } : {}),
  };

  let resposta: Response;
  try {
    resposta = await fetch(caminho, init);
  } catch {
    throw new FalhaApi(0, {
      ...ERRO_PADRAO,
      codigo: 'SEM_CONEXAO',
      mensagem: 'Não foi possível falar com o servidor da plataforma.',
      comoResolver: ['Confira se o servidor está no ar (npm run web).'],
    });
  }

  const texto = await resposta.text();
  let corpo: unknown = null;
  if (texto) {
    try {
      corpo = JSON.parse(texto);
    } catch {
      corpo = texto;
    }
  }

  if (!resposta.ok) {
    const envelope = corpo as { erro?: Partial<ErroApi> } | null;
    throw new FalhaApi(resposta.status, {
      ...ERRO_PADRAO,
      ...(envelope?.erro ?? {}),
      comoResolver: envelope?.erro?.comoResolver ?? [],
    } as ErroApi);
  }

  return corpo as T;
}

export const api = {
  get: <T>(caminho: string) => requisitar<T>(caminho),
  post: <T>(caminho: string, corpo?: unknown) =>
    requisitar<T>(caminho, { method: 'POST', corpoJson: corpo ?? {} }),
  put: <T>(caminho: string, corpo?: unknown) =>
    requisitar<T>(caminho, { method: 'PUT', corpoJson: corpo ?? {} }),

  /** Upload com progresso — fetch não expõe progresso de envio, XHR sim. */
  upload: <T>(
    caminho: string,
    formulario: FormData,
    aoProgredir?: (percentual: number) => void,
  ): Promise<T> =>
    new Promise<T>((resolver, rejeitar) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', caminho);
      xhr.withCredentials = true;

      xhr.upload.addEventListener('progress', (evento) => {
        if (evento.lengthComputable && aoProgredir) {
          aoProgredir(Math.round((evento.loaded / evento.total) * 100));
        }
      });

      xhr.addEventListener('load', () => {
        let corpo: unknown = null;
        try {
          corpo = JSON.parse(xhr.responseText);
        } catch {
          corpo = null;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          resolver(corpo as T);
          return;
        }
        const envelope = corpo as { erro?: Partial<ErroApi> } | null;
        rejeitar(
          new FalhaApi(xhr.status, {
            ...ERRO_PADRAO,
            ...(envelope?.erro ?? {}),
            comoResolver: envelope?.erro?.comoResolver ?? [],
          } as ErroApi),
        );
      });

      xhr.addEventListener('error', () =>
        rejeitar(
          new FalhaApi(0, {
            ...ERRO_PADRAO,
            codigo: 'FALHA_UPLOAD',
            mensagem: 'O envio do arquivo falhou.',
          }),
        ),
      );

      xhr.addEventListener('abort', () =>
        rejeitar(
          new FalhaApi(0, {
            ...ERRO_PADRAO,
            codigo: 'UPLOAD_CANCELADO',
            mensagem: 'Envio cancelado.',
          }),
        ),
      );

      xhr.send(formulario);
      // Devolve o xhr pelo objeto de cancelamento global do chamador.
      (formulario as FormData & { __xhr?: XMLHttpRequest }).__xhr = xhr;
    }),
};
