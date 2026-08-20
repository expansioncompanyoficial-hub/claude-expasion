import { z } from 'zod';
import type { ApiContexto } from '../contexto.js';
import { cookieDeSessao, cookieLimpo, COOKIE_SESSAO, lerCookie } from '../auth.js';
import { HttpError, type Rota } from '../http.js';

const loginSchema = z.object({
  email: z.string().trim().email('Informe um e-mail valido.'),
  senha: z.string().min(1, 'Informe a senha.'),
});

export function rotasAuth(api: ApiContexto): Rota[] {
  return [
    {
      metodo: 'POST',
      caminho: '/api/auth/login',
      papel: null,
      handler: (req) => {
        const dados = loginSchema.safeParse(req.corpo);
        if (!dados.success) {
          throw new HttpError(422, 'ENTRADA_INVALIDA', 'Preencha e-mail e senha.', {
            issues: dados.error.issues.map((i) => ({
              campo: i.path.join('.'),
              problema: i.message,
            })),
          });
        }

        const { token, sessao } = api.auth.login(dados.data.email, dados.data.senha, req.ip);
        return {
          status: 200,
          corpo: { ok: true, usuario: sessao },
          headers: { 'Set-Cookie': cookieDeSessao(token, false) },
        };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/auth/logout',
      papel: 'visualizador',
      handler: (req) => {
        const token = lerCookie(req.headers.cookie as string | undefined, COOKIE_SESSAO);
        if (token) api.auth.logout(token);
        return { status: 200, corpo: { ok: true }, headers: { 'Set-Cookie': cookieLimpo() } };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/auth/me',
      // Rota publica de proposito: a sondagem inicial do frontend nao deveria
      // gerar 401 no console de todo visitante anonimo. Sem sessao, devolve
      // usuario: null — que e a resposta correta para "quem sou eu?".
      papel: null,
      handler: (req) => ({ status: 200, corpo: { ok: true, usuario: req.sessao } }),
    },
    {
      metodo: 'GET',
      caminho: '/api/auth/status',
      papel: null,
      handler: () => ({
        status: 200,
        corpo: {
          ok: true,
          // Quando nao ha usuarios, a interface mostra o comando de criacao em
          // vez de um login que ninguem consegue passar.
          semUsuarios: api.auth.semUsuarios,
        },
      }),
    },
  ];
}
