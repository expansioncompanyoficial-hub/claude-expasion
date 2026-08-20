import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { ValidationError } from '../shared/errors.js';
import { sha256Hex } from '../shared/ids.js';

export type CreativeKind = 'image' | 'video';

export interface CreativeFile {
  readonly arquivo: string;
  readonly caminhoAbsoluto: string;
  readonly caminhoRelativo: string;
  readonly kind: CreativeKind;
  readonly extensao: string;
  readonly mimeType: string;
  readonly bytes: number;
  readonly hash: string;
  readonly largura: number | null;
  readonly altura: number | null;
  readonly integro: boolean;
  readonly problemaDeIntegridade: string | null;
}

const MIME_BY_EXTENSION: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.m4v': 'video/x-m4v',
};

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.avi']);

/**
 * Resolve o arquivo dentro da pasta da cliente e impede path traversal.
 * Um criativo de uma cliente nunca pode apontar para a pasta de outra.
 */
export function resolveCreativePath(creativesDir: string, clientId: string, arquivo: string): string {
  const baseDir = path.resolve(creativesDir, clientId);
  const candidate = path.resolve(baseDir, arquivo);
  const relative = path.relative(baseDir, candidate);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new ValidationError(
      `Criativo "${arquivo}" aponta para fora da pasta da cliente.`,
      { clientId, arquivo, pastaEsperada: baseDir },
      [`Coloque o arquivo em creatives/${clientId}/ e use apenas o nome do arquivo.`],
    );
  }

  return candidate;
}

export function readCreativeFile(
  creativesDir: string,
  clientId: string,
  arquivo: string,
): CreativeFile {
  const caminhoAbsoluto = resolveCreativePath(creativesDir, clientId, arquivo);

  if (!existsSync(caminhoAbsoluto)) {
    throw new ValidationError(
      `Criativo nao encontrado: ${arquivo}`,
      { clientId, arquivo, caminhoEsperado: caminhoAbsoluto },
      [`Coloque o arquivo em creatives/${clientId}/${arquivo}.`],
    );
  }

  const stats = statSync(caminhoAbsoluto);
  if (!stats.isFile()) {
    throw new ValidationError(`"${arquivo}" nao e um arquivo.`, { caminho: caminhoAbsoluto });
  }

  const data = readFileSync(caminhoAbsoluto);
  const extensao = path.extname(caminhoAbsoluto).toLowerCase();
  const kind: CreativeKind = VIDEO_EXTENSIONS.has(extensao) ? 'video' : 'image';
  const integridade = verificarIntegridade(data, extensao, kind);
  const dimensoes = kind === 'image' ? lerDimensoes(data, extensao) : { largura: null, altura: null };

  return {
    arquivo,
    caminhoAbsoluto,
    caminhoRelativo: path.join(clientId, arquivo),
    kind,
    extensao,
    mimeType: MIME_BY_EXTENSION[extensao] ?? 'application/octet-stream',
    bytes: stats.size,
    hash: sha256Hex(data),
    largura: dimensoes.largura,
    altura: dimensoes.altura,
    integro: integridade === null,
    problemaDeIntegridade: integridade,
  };
}

export function readCreativeBytes(file: CreativeFile): Uint8Array {
  return new Uint8Array(readFileSync(file.caminhoAbsoluto));
}

/** Confere a assinatura do arquivo (magic bytes) contra a extensao declarada. */
function verificarIntegridade(data: Buffer, extensao: string, kind: CreativeKind): string | null {
  if (data.length < 12) return 'Arquivo vazio ou truncado.';

  if (extensao === '.png') {
    const assinatura = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    const bate = assinatura.every((byte, index) => data[index] === byte);
    return bate ? null : 'Extensao .png mas o conteudo nao e um PNG.';
  }

  if (extensao === '.jpg' || extensao === '.jpeg') {
    const inicioOk = data[0] === 0xff && data[1] === 0xd8;
    const fimOk = data[data.length - 2] === 0xff && data[data.length - 1] === 0xd9;
    if (!inicioOk) return 'Extensao .jpg/.jpeg mas o conteudo nao e um JPEG.';
    if (!fimOk) return 'JPEG truncado: o marcador de fim de imagem esta faltando.';
    return null;
  }

  if (kind === 'video') {
    const ftyp = data.subarray(4, 8).toString('ascii');
    if (ftyp !== 'ftyp') return `Extensao ${extensao} mas o conteudo nao parece MP4/MOV.`;
    return null;
  }

  return null;
}

/** Le largura/altura direto do cabecalho, sem dependencia externa. */
function lerDimensoes(
  data: Buffer,
  extensao: string,
): { largura: number | null; altura: number | null } {
  try {
    if (extensao === '.png' && data.length > 24) {
      return { largura: data.readUInt32BE(16), altura: data.readUInt32BE(20) };
    }

    if (extensao === '.jpg' || extensao === '.jpeg') {
      let offset = 2;
      while (offset < data.length - 9) {
        if (data[offset] !== 0xff) {
          offset += 1;
          continue;
        }
        const marker = data[offset + 1]!;
        const isSof =
          (marker >= 0xc0 && marker <= 0xc3) ||
          (marker >= 0xc5 && marker <= 0xc7) ||
          (marker >= 0xc9 && marker <= 0xcb) ||
          (marker >= 0xcd && marker <= 0xcf);

        if (isSof) {
          return { altura: data.readUInt16BE(offset + 5), largura: data.readUInt16BE(offset + 7) };
        }

        const length = data.readUInt16BE(offset + 2);
        if (length < 2) break;
        offset += 2 + length;
      }
    }
  } catch {
    // cabecalho inesperado: dimensoes ficam desconhecidas, e o validador avisa
  }

  return { largura: null, altura: null };
}
