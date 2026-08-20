import type { CampaignRow } from '../database/types.js';
import { stableHash } from '../shared/ids.js';

export interface FingerprintInput {
  readonly clientId: string;
  readonly adAccountId: string;
  readonly objective: string;
  readonly template: string;
  readonly budget: { daily: number | null; lifetime: number | null; currency: string };
  readonly schedule: { start: string | null; stop: string | null };
  readonly destination: { tipo: string; valor: string };
  readonly targeting: unknown;
  readonly metaIds: {
    campanha: string | null;
    conjuntos: string[];
    criativos: string[];
    anuncios: string[];
  };
  readonly creativeHashes: string[];
  readonly adCount: number;
}

/**
 * Impressao digital da campanha aprovada.
 *
 * Se qualquer um destes itens mudar depois da aprovacao, a impressao muda e a
 * ativacao e recusada. E isso que impede "aprovar uma coisa e subir outra".
 */
export function computeFingerprint(input: FingerprintInput): string {
  return stableHash({
    clientId: input.clientId,
    adAccountId: input.adAccountId,
    objective: input.objective,
    template: input.template,
    budget: input.budget,
    schedule: input.schedule,
    destination: input.destination,
    targeting: input.targeting,
    metaIds: {
      campanha: input.metaIds.campanha,
      conjuntos: [...input.metaIds.conjuntos].sort(),
      criativos: [...input.metaIds.criativos].sort(),
      anuncios: [...input.metaIds.anuncios].sort(),
    },
    creativeHashes: [...input.creativeHashes].sort(),
    adCount: input.adCount,
  });
}

export interface CampaignSnapshot {
  readonly row: CampaignRow;
  readonly adsetMetaIds: string[];
  readonly creativeMetaIds: string[];
  readonly adMetaIds: string[];
  readonly creativeFileHashes: string[];
  readonly targeting: unknown;
  readonly destination: { tipo: string; valor: string };
}

export function fingerprintFromSnapshot(snapshot: CampaignSnapshot): string {
  return computeFingerprint({
    clientId: snapshot.row.client_id,
    adAccountId: snapshot.row.ad_account_id,
    objective: snapshot.row.objective,
    template: snapshot.row.template,
    budget: {
      daily: snapshot.row.daily_budget_cents,
      lifetime: snapshot.row.lifetime_budget_cents,
      currency: snapshot.row.currency,
    },
    schedule: { start: snapshot.row.start_time, stop: snapshot.row.stop_time },
    destination: snapshot.destination,
    targeting: snapshot.targeting,
    metaIds: {
      campanha: snapshot.row.meta_campaign_id,
      conjuntos: snapshot.adsetMetaIds,
      criativos: snapshot.creativeMetaIds,
      anuncios: snapshot.adMetaIds,
    },
    creativeHashes: snapshot.creativeFileHashes,
    adCount: snapshot.adMetaIds.length,
  });
}
