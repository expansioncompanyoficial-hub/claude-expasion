import { describe, expect, it } from 'vitest';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadPolicies } from '../../src/policies/loader.js';
import { PROJECT_ROOT } from '../../src/config/env.js';
import { readCreativeFile, resolveCreativePath } from '../../src/creatives/files.js';
import { validarCriativos } from '../../src/creatives/validate.js';

const policy = loadPolicies(path.join(PROJECT_ROOT, 'policies'), false).global;
const creativesDir = path.join(PROJECT_ROOT, 'creatives');

function sandboxCreative(nome: string, bytes: Buffer): { dir: string; clientId: string } {
  const dir = mkdtempSync(path.join(tmpdir(), 'expansion-creatives-'));
  const clientId = 'example-client';
  mkdirSync(path.join(dir, clientId), { recursive: true });
  writeFileSync(path.join(dir, clientId, nome), bytes);
  return { dir, clientId };
}

describe('leitura e validacao de criativos', () => {
  it('le os criativos de exemplo e calcula hash e dimensoes', () => {
    const arquivo = readCreativeFile(creativesDir, 'example-client', 'vestido-primavera-quadrado.png');
    expect(arquivo.hash).toMatch(/^[a-f0-9]{64}$/);
    expect(arquivo.kind).toBe('image');
    expect(arquivo.largura).toBeGreaterThan(0);
    expect(arquivo.altura).toBeGreaterThan(0);
  });

  it('aprova os criativos de exemplo', () => {
    const arquivos = [
      readCreativeFile(creativesDir, 'example-client', 'vestido-primavera-quadrado.png'),
      readCreativeFile(creativesDir, 'example-client', 'blusa-linho-vertical.png'),
    ];
    const resultado = validarCriativos(arquivos, policy);
    expect(resultado.relatorios.every((r) => r.ok)).toBe(true);
    expect(resultado.findings.filter((f) => f.severidade === 'block')).toHaveLength(0);
  });

  it('reprova extensao nao permitida com relatorio objetivo', () => {
    const { dir, clientId } = sandboxCreative('arquivo.gif', Buffer.from('GIF89a'));
    const arquivo = readCreativeFile(dir, clientId, 'arquivo.gif');
    const resultado = validarCriativos([arquivo], policy);
    const relatorio = resultado.relatorios[0]!;
    expect(relatorio.ok).toBe(false);
    expect(relatorio.problemas.join(' ')).toMatch(/extens|permitid/i);
  });

  it('reprova imagem abaixo da dimensao minima', () => {
    // PNG 1x1 valido.
    const png1x1 = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );
    const { dir, clientId } = sandboxCreative('minusculo.png', png1x1);
    const arquivo = readCreativeFile(dir, clientId, 'minusculo.png');
    const resultado = validarCriativos([arquivo], policy);
    expect(resultado.relatorios[0]!.ok).toBe(false);
    expect(resultado.relatorios[0]!.problemas.join(' ')).toMatch(/600|dimens|largura|altura/i);
  });

  it('reprova arquivo vazio ou corrompido', () => {
    const { dir, clientId } = sandboxCreative('vazio.png', Buffer.alloc(0));
    const arquivo = readCreativeFile(dir, clientId, 'vazio.png');
    const resultado = validarCriativos([arquivo], policy);
    expect(resultado.relatorios[0]!.ok).toBe(false);
  });

  it('detecta o mesmo arquivo repetido no lote pelo hash', () => {
    const arquivo = readCreativeFile(creativesDir, 'example-client', 'vestido-primavera-quadrado.png');
    const resultado = validarCriativos([arquivo, { ...arquivo, arquivo: 'copia.png' }], policy);
    expect(resultado.duplicados.length).toBeGreaterThan(0);
  });

  it('detecta criativo ja usado antes pela mesma cliente', () => {
    const arquivo = readCreativeFile(creativesDir, 'example-client', 'blusa-linho-vertical.png');
    const resultado = validarCriativos(
      [arquivo],
      policy,
      new Map([[arquivo.hash, 'cmp_2026-01-01_antiga']]),
    );
    expect(resultado.duplicados[0]?.jaUsadoEm).toBe('cmp_2026-01-01_antiga');
  });

  it('impede sair da pasta da cliente (path traversal)', () => {
    expect(() => resolveCreativePath(creativesDir, 'example-client', '../../etc/passwd')).toThrow();
  });

  it('arquivo inexistente falha com mensagem clara', () => {
    expect(() => readCreativeFile(creativesDir, 'example-client', 'nao-existe.png')).toThrow(
      /nao encontrad/i,
    );
  });
});
