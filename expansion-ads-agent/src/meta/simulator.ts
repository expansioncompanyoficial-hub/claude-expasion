import { sha256Hex, stableHash } from '../shared/ids.js';

/**
 * Simulador do dry-run.
 *
 * Gera IDs deterministicos e visivelmente falsos. Nada aqui toca a rede.
 * O prefixo `dryrun_` existe para que um ID simulado jamais seja confundido
 * com um ID real da Meta em log, banco ou relatorio.
 */
export class MetaSimulator {
  /** Mesma entrada -> mesmo ID. Isso torna o dry-run reproduzivel e testavel. */
  id(kind: string, seed: unknown): string {
    return `dryrun_${kind}_${stableHash(seed).slice(0, 12)}`;
  }

  imageHash(seed: unknown): string {
    return `dryrun${sha256Hex(String(stableHash(seed))).slice(0, 26)}`;
  }

  campaign(payload: Record<string, unknown>): { id: string } {
    return { id: this.id('campaign', payload) };
  }

  adset(payload: Record<string, unknown>): { id: string } {
    return { id: this.id('adset', payload) };
  }

  creative(payload: Record<string, unknown>): { id: string } {
    return { id: this.id('creative', payload) };
  }

  ad(payload: Record<string, unknown>): { id: string } {
    return { id: this.id('ad', payload) };
  }

  image(filename: string, fileHash: string): { images: Record<string, { hash: string; url: string }> } {
    return {
      images: {
        [filename]: {
          hash: this.imageHash(fileHash),
          url: `https://exemplo.invalido/dryrun/${fileHash.slice(0, 12)}`,
        },
      },
    };
  }

  video(fileHash: string): { id: string } {
    return { id: this.id('video', fileHash) };
  }
}

/** Prefixo obrigatorio de todo ID gerado pelo simulador. */
export const DRY_RUN_ID_PREFIX = 'dryrun';

/**
 * Um ID simulado NUNCA pode ser tratado como prova de que o objeto existe na
 * Meta. Sem esta trava, um dry-run deixaria residuo no banco e a criacao real
 * seguinte "reaproveitaria" objetos que nunca existiram.
 */
export function isRealMetaId(id: string | null | undefined): id is string {
  if (!id) return false;
  return !id.startsWith(`${DRY_RUN_ID_PREFIX}_`) && !id.startsWith(DRY_RUN_ID_PREFIX);
}
