import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { z } from 'zod';
import type { AgentContext } from '../../context.js';
import { caminhoUsuarios, hashSenha, usuarioSchema, type Usuario } from '../../api/auth.js';
import { PAPEIS, type Papel } from '../../api/http.js';
import { flagBool, flagOptional, type ParsedCli } from '../args.js';
import { aviso, EXIT, falha, item, json, linha, ok, titulo } from '../output.js';

/**
 * `npm run user:create` — cadastra quem pode entrar na plataforma.
 *
 * A senha entra por variavel de ambiente (EXPANSION_USER_PASSWORD) ou por
 * prompt, nunca por argumento de linha de comando: argumento fica no historico
 * do shell e na lista de processos.
 */
export async function comandoCriarUsuario(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const arquivo = caminhoUsuarios(ctx.config.paths.root);
  const email = flagOptional(cli, 'email');
  const nome = flagOptional(cli, 'nome');
  const papelBruto = flagOptional(cli, 'papel') ?? 'admin';

  if (!email || !nome) {
    falha('Informe --email e --nome.');
    item('Exemplo: npm run user:create --email voce@agencia.com --nome "Seu Nome" --papel admin');
    linha('');
    return EXIT.VALIDACAO;
  }

  if (!(PAPEIS as readonly string[]).includes(papelBruto)) {
    falha(`Papel invalido: ${papelBruto}.`);
    item(`Papeis: ${PAPEIS.join(', ')}`);
    linha('');
    return EXIT.VALIDACAO;
  }

  const senha = process.env.EXPANSION_USER_PASSWORD;
  if (!senha || senha.length < 10) {
    falha('Defina a senha em EXPANSION_USER_PASSWORD, com pelo menos 10 caracteres.');
    item("Exemplo: EXPANSION_USER_PASSWORD='sua-senha-longa' npm run user:create --email ...");
    item('A senha nao entra por argumento: ficaria no historico do shell.');
    linha('');
    return EXIT.VALIDACAO;
  }

  const existentes: Usuario[] = existsSync(arquivo)
    ? z.array(usuarioSchema).parse(JSON.parse(readFileSync(arquivo, 'utf8')))
    : [];

  if (existentes.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    falha(`Ja existe usuario com o e-mail ${email}.`);
    linha('');
    return EXIT.DUPLICIDADE;
  }

  const novo: Usuario = {
    id: `usr_${Date.now().toString(36)}`,
    nome,
    email,
    papel: papelBruto as Papel,
    senhaHash: hashSenha(senha),
    ativo: true,
  };

  writeFileSync(arquivo, `${JSON.stringify([...existentes, novo], null, 2)}\n`, 'utf8');

  if (flagBool(cli, 'json')) {
    json({ id: novo.id, email: novo.email, papel: novo.papel });
    return EXIT.OK;
  }

  titulo('USUARIO CRIADO');
  item(`Nome: ${novo.nome}`);
  item(`E-mail: ${novo.email}`);
  item(`Papel: ${novo.papel}`);
  item(`Arquivo: ${arquivo}`);
  linha('');
  aviso('users.json esta no .gitignore. Nao versione nem compartilhe esse arquivo.');
  linha('');
  ok('Pronto. Suba a plataforma com npm run web e entre com este e-mail.');
  linha('');
  return EXIT.OK;
}

export async function comandoListarUsuarios(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const arquivo = caminhoUsuarios(ctx.config.paths.root);
  if (!existsSync(arquivo)) {
    aviso('Nenhum usuario cadastrado ainda. Use npm run user:create.');
    linha('');
    return EXIT.OK;
  }

  const usuarios = z.array(usuarioSchema).parse(JSON.parse(readFileSync(arquivo, 'utf8')));
  if (flagBool(cli, 'json')) {
    json(usuarios.map(({ senhaHash: _s, ...resto }) => resto));
    return EXIT.OK;
  }

  titulo(`USUARIOS (${usuarios.length})`);
  for (const u of usuarios) {
    linha(
      `  ${u.email.padEnd(32)} ${u.papel.padEnd(14)} ${u.ativo ? 'ativo' : 'inativo'}  ${u.nome}`,
    );
  }
  linha('');
  return EXIT.OK;
}
