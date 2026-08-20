import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import type { Database } from '../database/db.js';
import { HttpError, type Papel, PAPEIS, type Sessao } from './http.js';
import { registerSecret } from '../security/secrets.js';
import type { Clock } from '../shared/time.js';

/**
 * Autenticacao local.
 *
 * O backend nasceu como CLI + MCP de um operador so: nao havia login. Esta e a
 * camada minima para uma plataforma multiusuario, sem trocar nada do que ja
 * existia. Usuarios ficam em `users.json` (fora do git), senha com scrypt,
 * sessao em SQLite.
 */

const SESSAO_HORAS = 12;
const MAX_TENTATIVAS = 5;
const JANELA_TENTATIVAS_MS = 15 * 60 * 1000;

export const usuarioSchema = z.object({
  id: z.string().trim().min(1),
  nome: z.string().trim().min(1),
  email: z.string().trim().email(),
  papel: z.enum(PAPEIS),
  /** `scrypt$<salt-hex>$<hash-hex>` */
  senhaHash: z
    .string()
    .trim()
    .regex(/^scrypt\$[0-9a-f]+\$[0-9a-f]+$/),
  ativo: z.boolean().default(true),
});

export type Usuario = z.infer<typeof usuarioSchema>;

export function hashSenha(senha: string): string {
  const salt = randomBytes(16);
  const derivada = scryptSync(senha, salt, 64);
  return `scrypt$${salt.toString('hex')}$${derivada.toString('hex')}`;
}

export function conferirSenha(senha: string, armazenado: string): boolean {
  const partes = armazenado.split('$');
  if (partes.length !== 3) return false;
  const salt = Buffer.from(partes[1]!, 'hex');
  const esperado = Buffer.from(partes[2]!, 'hex');
  const derivada = scryptSync(senha, salt, esperado.length);
  return derivada.length === esperado.length && timingSafeEqual(derivada, esperado);
}

export class UserStore {
  private usuarios: Usuario[] = [];

  constructor(private readonly arquivo: string) {
    this.recarregar();
  }

  recarregar(): void {
    if (!existsSync(this.arquivo)) {
      this.usuarios = [];
      return;
    }
    const bruto = JSON.parse(readFileSync(this.arquivo, 'utf8')) as unknown;
    const lista = z.array(usuarioSchema).safeParse(bruto);
    if (!lista.success) {
      throw new HttpError(503, 'USUARIOS_INVALIDOS', 'O arquivo de usuarios esta invalido.', {
        arquivo: this.arquivo,
        issues: lista.error.issues.map((i) => ({ campo: i.path.join('.'), problema: i.message })),
      });
    }
    this.usuarios = lista.data;
    for (const usuario of this.usuarios) registerSecret(usuario.senhaHash);
  }

  get vazio(): boolean {
    return this.usuarios.length === 0;
  }

  porEmail(email: string): Usuario | undefined {
    const alvo = email.trim().toLowerCase();
    return this.usuarios.find((u) => u.email.toLowerCase() === alvo);
  }

  porId(id: string): Usuario | undefined {
    return this.usuarios.find((u) => u.id === id);
  }

  listar(): Array<Omit<Usuario, 'senhaHash'>> {
    return this.usuarios.map(({ senhaHash: _s, ...resto }) => resto);
  }
}

export function caminhoUsuarios(raiz: string): string {
  return path.join(raiz, 'users.json');
}

interface TentativaLogin {
  contagem: number;
  primeiraEm: number;
}

export class AuthService {
  private readonly tentativas = new Map<string, TentativaLogin>();

  constructor(
    private readonly db: Database,
    private readonly users: UserStore,
    private readonly clock: Clock,
  ) {
    this.db.driver.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        token       TEXT PRIMARY KEY,
        user_id     TEXT NOT NULL,
        created_at  TEXT NOT NULL,
        expires_at  TEXT NOT NULL,
        ip          TEXT
      );
    `);
  }

  get semUsuarios(): boolean {
    return this.users.vazio;
  }

  /** Trava por IP: 5 tentativas em 15 minutos. */
  private registrarTentativa(ip: string): void {
    const agora = this.clock().getTime();
    const atual = this.tentativas.get(ip);
    if (!atual || agora - atual.primeiraEm > JANELA_TENTATIVAS_MS) {
      this.tentativas.set(ip, { contagem: 1, primeiraEm: agora });
      return;
    }
    atual.contagem += 1;
  }

  private bloqueado(ip: string): boolean {
    const atual = this.tentativas.get(ip);
    if (!atual) return false;
    if (this.clock().getTime() - atual.primeiraEm > JANELA_TENTATIVAS_MS) {
      this.tentativas.delete(ip);
      return false;
    }
    return atual.contagem >= MAX_TENTATIVAS;
  }

  login(email: string, senha: string, ip: string): { token: string; sessao: Sessao } {
    if (this.bloqueado(ip)) {
      throw new HttpError(429, 'TENTATIVAS_DEMAIS', 'Tentativas demais. Aguarde 15 minutos.');
    }

    const usuario = this.users.porEmail(email);
    // Confere a senha mesmo com usuario inexistente: sem isso, o tempo de
    // resposta revelaria quais emails existem.
    const referencia = usuario?.senhaHash ?? hashSenha('senha-inexistente-para-tempo-constante');
    const senhaOk = conferirSenha(senha, referencia);

    if (!usuario || !usuario.ativo || !senhaOk) {
      this.registrarTentativa(ip);
      throw new HttpError(401, 'CREDENCIAL_INVALIDA', 'E-mail ou senha incorretos.');
    }

    this.tentativas.delete(ip);

    const token = randomBytes(32).toString('hex');
    registerSecret(token);
    const agora = this.clock();
    const expira = new Date(agora.getTime() + SESSAO_HORAS * 3_600_000);

    this.db.driver.run(
      'INSERT INTO sessions (token, user_id, created_at, expires_at, ip) VALUES (?, ?, ?, ?, ?)',
      [token, usuario.id, agora.toISOString(), expira.toISOString(), ip],
    );

    return { token, sessao: this.sessaoDe(usuario) };
  }

  logout(token: string): void {
    this.db.driver.run('DELETE FROM sessions WHERE token = ?', [token]);
  }

  resolver(token: string | null): Sessao | null {
    if (!token) return null;
    const linha = this.db.driver.get<{ user_id: string; expires_at: string }>(
      'SELECT user_id, expires_at FROM sessions WHERE token = ?',
      [token],
    );
    if (!linha) return null;

    if (new Date(linha.expires_at).getTime() <= this.clock().getTime()) {
      this.db.driver.run('DELETE FROM sessions WHERE token = ?', [token]);
      return null;
    }

    const usuario = this.users.porId(linha.user_id);
    if (!usuario || !usuario.ativo) return null;
    return this.sessaoDe(usuario);
  }

  limparExpiradas(): number {
    return this.db.driver.run('DELETE FROM sessions WHERE expires_at <= ?', [
      this.clock().toISOString(),
    ]).changes;
  }

  private sessaoDe(usuario: Usuario): Sessao {
    return {
      usuarioId: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      papel: usuario.papel as Papel,
    };
  }
}

export const COOKIE_SESSAO = 'expansion_sess';

export function lerCookie(header: string | undefined, nome: string): string | null {
  if (!header) return null;
  for (const parte of header.split(';')) {
    const [chave, ...resto] = parte.trim().split('=');
    if (chave === nome) return decodeURIComponent(resto.join('='));
  }
  return null;
}

export function cookieDeSessao(token: string, seguro: boolean): string {
  const partes = [
    `${COOKIE_SESSAO}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${SESSAO_HORAS * 3600}`,
  ];
  if (seguro) partes.push('Secure');
  return partes.join('; ');
}

export function cookieLimpo(): string {
  return `${COOKIE_SESSAO}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
