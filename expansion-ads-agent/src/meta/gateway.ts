import type { Logger } from '../logging/logger.js';
import { AppError } from '../shared/errors.js';
import type { MetaClient, MetaParams } from './client.js';
import { MetaSimulator } from './simulator.js';

export interface MetaListResponse<T> {
  data: T[];
  paging?: { cursors?: { before?: string; after?: string }; next?: string };
}

export interface AdAccountSummary {
  id: string;
  account_id?: string;
  name?: string;
  currency?: string;
  timezone_name?: string;
  account_status?: number;
  business?: { id: string; name: string };
  amount_spent?: string;
  spend_cap?: string;
  disable_reason?: number;
  funding_source?: string;
  __simulado?: boolean;
}

export interface PageSummary {
  id: string;
  name?: string;
  category?: string;
  tasks?: string[];
  /** De onde veio: me/accounts, owned_pages ou client_pages. */
  origem?: string;
  __simulado?: boolean;
}

export interface BusinessSummary {
  id: string;
  name?: string;
  __simulado?: boolean;
}

export interface InstagramAccountSummary {
  id: string;
  username?: string;
  name?: string;
  origem?: string;
  __simulado?: boolean;
}

export interface PixelSummary {
  id: string;
  name?: string;
  last_fired_time?: string;
  is_unavailable?: boolean;
  __simulado?: boolean;
}

export interface CampaignSummary {
  id: string;
  name?: string;
  objective?: string;
  status?: string;
  effective_status?: string;
  daily_budget?: string;
  lifetime_budget?: string;
  start_time?: string;
  stop_time?: string;
  created_time?: string;
  special_ad_categories?: string[];
  __simulado?: boolean;
}

export interface AdSetSummary {
  id: string;
  name?: string;
  campaign_id?: string;
  status?: string;
  effective_status?: string;
  optimization_goal?: string;
  billing_event?: string;
  destination_type?: string;
  daily_budget?: string;
  lifetime_budget?: string;
  start_time?: string;
  end_time?: string;
  targeting?: Record<string, unknown>;
  promoted_object?: Record<string, unknown>;
  __simulado?: boolean;
}

export interface AdSummary {
  id: string;
  name?: string;
  adset_id?: string;
  campaign_id?: string;
  status?: string;
  effective_status?: string;
  creative?: { id: string };
  issues_info?: Array<{ error_summary?: string; error_message?: string; level?: string }>;
  __simulado?: boolean;
}

export interface InsightRow {
  date_start?: string;
  date_stop?: string;
  campaign_id?: string;
  campaign_name?: string;
  adset_id?: string;
  adset_name?: string;
  ad_id?: string;
  ad_name?: string;
  spend?: string;
  reach?: string;
  impressions?: string;
  frequency?: string;
  cpm?: string;
  clicks?: string;
  ctr?: string;
  cpc?: string;
  inline_link_clicks?: string;
  inline_link_click_ctr?: string;
  actions?: Array<{ action_type: string; value: string }>;
  action_values?: Array<{ action_type: string; value: string }>;
  cost_per_action_type?: Array<{ action_type: string; value: string }>;
  purchase_roas?: Array<{ action_type: string; value: string }>;
  website_purchase_roas?: Array<{ action_type: string; value: string }>;
  [key: string]: unknown;
}

export interface InsightsQuery {
  readonly level?: 'account' | 'campaign' | 'adset' | 'ad';
  readonly datePreset?: string;
  readonly timeRange?: { since: string; until: string };
  readonly fields: readonly string[];
  readonly breakdowns?: readonly string[];
  readonly limit?: number;
}

const AD_ACCOUNT_FIELDS =
  'id,account_id,name,currency,timezone_name,account_status,disable_reason,amount_spent,spend_cap,funding_source,business{id,name}';
const CAMPAIGN_FIELDS =
  'id,name,objective,status,effective_status,daily_budget,lifetime_budget,start_time,stop_time,created_time,special_ad_categories';
const ADSET_FIELDS =
  'id,name,campaign_id,status,effective_status,optimization_goal,billing_event,destination_type,daily_budget,lifetime_budget,start_time,end_time,targeting,promoted_object';
const AD_FIELDS = 'id,name,adset_id,campaign_id,status,effective_status,creative{id},issues_info';

/**
 * Superficie tipada da Marketing API.
 *
 * Leitura: real quando ha credencial; simulada quando nao ha.
 * Escrita: real APENAS fora do dry-run. Em dry-run nada sai do processo.
 */
export class MetaGateway {
  private readonly simulator = new MetaSimulator();

  constructor(
    private readonly client: MetaClient,
    private readonly logger: Logger,
    private readonly options: { dryRun: boolean },
  ) {}

  get dryRun(): boolean {
    return this.options.dryRun;
  }

  get hasCredentials(): boolean {
    return this.client.hasCredentials;
  }

  /** Leitura simulada quando nao ha token: devolve estrutura vazia e marcada. */
  private get canRead(): boolean {
    return this.client.hasCredentials;
  }

  // ------------------------------------------------------------------ leitura

  async listAdAccounts(limit = 50): Promise<AdAccountSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', 'me/adaccounts', { limit });
      return [];
    }
    const response = await this.client.get<MetaListResponse<AdAccountSummary>>('me/adaccounts', {
      fields: AD_ACCOUNT_FIELDS,
      limit,
    });
    return response.data ?? [];
  }

  async getAdAccount(adAccountId: string): Promise<AdAccountSummary | null> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', adAccountId, { fields: AD_ACCOUNT_FIELDS });
      return { id: adAccountId, __simulado: true };
    }
    return this.client.get<AdAccountSummary>(adAccountId, { fields: AD_ACCOUNT_FIELDS });
  }

  async listPages(limit = 50): Promise<PageSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', 'me/accounts', { limit });
      return [];
    }
    const response = await this.client.get<MetaListResponse<PageSummary>>('me/accounts', {
      fields: 'id,name,category,tasks',
      limit,
    });
    return response.data ?? [];
  }

  async listBusinesses(limit = 50): Promise<BusinessSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', 'me/businesses', { limit });
      return [];
    }
    const response = await this.client.get<MetaListResponse<BusinessSummary>>('me/businesses', {
      fields: 'id,name',
      limit,
    });
    return response.data ?? [];
  }

  /**
   * Paginas visiveis pelo Business Manager.
   *
   * `me/accounts` so devolve Paginas onde a PESSOA tem papel direto. Numa
   * agencia, a Pagina da cliente costuma chegar pelo Business Manager — como
   * ativo proprio (`owned_pages`) ou compartilhado pela cliente
   * (`client_pages`). Sem consultar os dois, a Pagina da cliente simplesmente
   * nao aparece.
   */
  async listBusinessPages(businessId: string): Promise<PageSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', `${businessId}/owned_pages`, {});
      return [];
    }

    const encontradas = new Map<string, PageSummary>();

    for (const borda of ['owned_pages', 'client_pages'] as const) {
      try {
        const response = await this.client.get<MetaListResponse<PageSummary>>(
          `${businessId}/${borda}`,
          { fields: 'id,name,category', limit: 100 },
        );
        for (const pagina of response.data ?? []) {
          encontradas.set(pagina.id, { ...pagina, origem: borda });
        }
      } catch (error) {
        // Uma borda pode estar indisponivel sem que a outra esteja: seguir.
        this.logger.debug('Borda de Paginas do negocio indisponivel.', {
          businessId,
          borda,
          erro: (error as Error).message,
        });
      }
    }

    return [...encontradas.values()];
  }

  async listInstagramAccounts(pageId: string): Promise<InstagramAccountSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', pageId, { fields: 'instagram_business_account' });
      return [];
    }
    const response = await this.client.get<{
      instagram_business_account?: { id: string; username?: string; name?: string };
      connected_instagram_account?: { id: string; username?: string; name?: string };
    }>(pageId, {
      fields:
        'instagram_business_account{id,username,name},connected_instagram_account{id,username,name}',
    });

    const accounts: InstagramAccountSummary[] = [];
    if (response.instagram_business_account) {
      accounts.push({
        ...response.instagram_business_account,
        origem: 'instagram_business_account',
      });
    }
    if (
      response.connected_instagram_account &&
      response.connected_instagram_account.id !== response.instagram_business_account?.id
    ) {
      accounts.push({
        ...response.connected_instagram_account,
        origem: 'connected_instagram_account',
      });
    }
    return accounts;
  }

  async listPixels(adAccountId: string): Promise<PixelSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', `${adAccountId}/adspixels`, {});
      return [];
    }
    const response = await this.client.get<MetaListResponse<PixelSummary>>(
      `${adAccountId}/adspixels`,
      { fields: 'id,name,last_fired_time,is_unavailable', limit: 50 },
    );
    return response.data ?? [];
  }

  async listCampaigns(
    adAccountId: string,
    options: { limit?: number; effectiveStatus?: readonly string[] } = {},
  ): Promise<CampaignSummary[]> {
    const params: MetaParams = { fields: CAMPAIGN_FIELDS, limit: options.limit ?? 50 };
    if (options.effectiveStatus?.length) {
      params.effective_status = JSON.stringify(options.effectiveStatus);
    }
    if (!this.canRead) {
      this.client.recordSimulated('GET', `${adAccountId}/campaigns`, params);
      return [];
    }
    const response = await this.client.get<MetaListResponse<CampaignSummary>>(
      `${adAccountId}/campaigns`,
      params,
    );
    return response.data ?? [];
  }

  async listAdSets(parentId: string, limit = 50): Promise<AdSetSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', `${parentId}/adsets`, { limit });
      return [];
    }
    const response = await this.client.get<MetaListResponse<AdSetSummary>>(`${parentId}/adsets`, {
      fields: ADSET_FIELDS,
      limit,
    });
    return response.data ?? [];
  }

  async listAds(parentId: string, limit = 100): Promise<AdSummary[]> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', `${parentId}/ads`, { limit });
      return [];
    }
    const response = await this.client.get<MetaListResponse<AdSummary>>(`${parentId}/ads`, {
      fields: AD_FIELDS,
      limit,
    });
    return response.data ?? [];
  }

  async getCampaign(campaignId: string): Promise<CampaignSummary | null> {
    if (!this.canRead) {
      this.client.recordSimulated('GET', campaignId, { fields: CAMPAIGN_FIELDS });
      return null;
    }
    return this.client.get<CampaignSummary>(campaignId, { fields: CAMPAIGN_FIELDS });
  }

  async getInsights(objectId: string, query: InsightsQuery): Promise<InsightRow[]> {
    const params: MetaParams = {
      fields: query.fields.join(','),
      limit: query.limit ?? 100,
    };
    if (query.level) params.level = query.level;
    if (query.breakdowns?.length) params.breakdowns = query.breakdowns.join(',');
    if (query.timeRange) {
      params.time_range = JSON.stringify(query.timeRange);
    } else if (query.datePreset) {
      params.date_preset = query.datePreset;
    }

    if (!this.canRead) {
      this.client.recordSimulated('GET', `${objectId}/insights`, params);
      return [];
    }

    const response = await this.client.get<MetaListResponse<InsightRow>>(
      `${objectId}/insights`,
      params,
    );
    return response.data ?? [];
  }

  // ------------------------------------------------------------------ escrita

  private assertWriteAllowed(operation: string): void {
    if (this.options.dryRun) {
      throw new AppError({
        code: 'DRY_RUN_WRITE_BLOCKED',
        category: 'policy',
        message: `Escrita bloqueada em dry-run: ${operation}.`,
        details: { operation },
      });
    }
    if (!this.client.hasCredentials) {
      throw new AppError({
        code: 'META_CREDENTIALS_MISSING',
        category: 'config',
        message: `Sem credencial para executar ${operation}.`,
        details: { operation },
      });
    }
  }

  async uploadImage(
    adAccountId: string,
    file: { filename: string; contentType: string; data: Uint8Array; fileHash: string },
  ): Promise<{ hash: string; url?: string; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', `${adAccountId}/adimages`, {
        arquivo: file.filename,
        bytes: file.data.byteLength,
      });
      const simulated = this.simulator.image(file.filename, file.fileHash);
      const entry = simulated.images[file.filename]!;
      return { hash: entry.hash, url: entry.url, simulado: true };
    }

    this.assertWriteAllowed('upload de imagem');
    const response = await this.client.postMultipart<{
      images: Record<string, { hash: string; url?: string }>;
    }>(
      `${adAccountId}/adimages`,
      {},
      {
        field: file.filename,
        filename: file.filename,
        contentType: file.contentType,
        data: file.data,
      },
    );

    const entry = Object.values(response.images ?? {})[0];
    if (!entry?.hash) {
      throw new AppError({
        code: 'META_UPLOAD_SEM_HASH',
        category: 'meta_api',
        message: 'A Meta aceitou a imagem mas nao devolveu hash.',
        details: { arquivo: file.filename },
      });
    }
    return { hash: entry.hash, url: entry.url, simulado: false };
  }

  async uploadVideo(
    adAccountId: string,
    file: { filename: string; contentType: string; data: Uint8Array; fileHash: string },
  ): Promise<{ id: string; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', `${adAccountId}/advideos`, {
        arquivo: file.filename,
        bytes: file.data.byteLength,
      });
      return { id: this.simulator.video(file.fileHash).id, simulado: true };
    }

    this.assertWriteAllowed('upload de video');
    const response = await this.client.postMultipart<{ id: string }>(
      `${adAccountId}/advideos`,
      { name: file.filename },
      { field: 'source', filename: file.filename, contentType: file.contentType, data: file.data },
    );
    if (!response.id) {
      throw new AppError({
        code: 'META_UPLOAD_SEM_ID',
        category: 'meta_api',
        message: 'A Meta aceitou o video mas nao devolveu id.',
        details: { arquivo: file.filename },
      });
    }
    return { id: response.id, simulado: false };
  }

  async createCampaign(
    adAccountId: string,
    payload: Record<string, unknown>,
  ): Promise<{ id: string; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', `${adAccountId}/campaigns`, payload);
      return { id: this.simulator.campaign(payload).id, simulado: true };
    }
    this.assertWriteAllowed('criacao de campanha');
    const response = await this.client.post<{ id: string }>(
      `${adAccountId}/campaigns`,
      payload as MetaParams,
    );
    return { id: response.id, simulado: false };
  }

  async createAdSet(
    adAccountId: string,
    payload: Record<string, unknown>,
  ): Promise<{ id: string; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', `${adAccountId}/adsets`, payload);
      return { id: this.simulator.adset(payload).id, simulado: true };
    }
    this.assertWriteAllowed('criacao de conjunto');
    const response = await this.client.post<{ id: string }>(
      `${adAccountId}/adsets`,
      payload as MetaParams,
    );
    return { id: response.id, simulado: false };
  }

  async createAdCreative(
    adAccountId: string,
    payload: Record<string, unknown>,
  ): Promise<{ id: string; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', `${adAccountId}/adcreatives`, payload);
      return { id: this.simulator.creative(payload).id, simulado: true };
    }
    this.assertWriteAllowed('criacao de criativo');
    const response = await this.client.post<{ id: string }>(
      `${adAccountId}/adcreatives`,
      payload as MetaParams,
    );
    return { id: response.id, simulado: false };
  }

  async createAd(
    adAccountId: string,
    payload: Record<string, unknown>,
  ): Promise<{ id: string; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', `${adAccountId}/ads`, payload);
      return { id: this.simulator.ad(payload).id, simulado: true };
    }
    this.assertWriteAllowed('criacao de anuncio');
    const response = await this.client.post<{ id: string }>(
      `${adAccountId}/ads`,
      payload as MetaParams,
    );
    return { id: response.id, simulado: false };
  }

  /** Muda status de campanha/conjunto/anuncio. Nunca DELETED — exclusao e proibida. */
  async updateStatus(
    objectId: string,
    status: 'ACTIVE' | 'PAUSED',
  ): Promise<{ ok: boolean; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', objectId, { status });
      return { ok: true, simulado: true };
    }
    this.assertWriteAllowed(`mudanca de status para ${status}`);
    const response = await this.client.post<{ success?: boolean; id?: string }>(objectId, {
      status,
    });
    this.logger.debug('Status atualizado na Meta.', { objectId, status });
    return { ok: response.success !== false, simulado: false };
  }

  async updateAdSetDailyBudget(
    adsetId: string,
    dailyBudgetMinorUnits: number,
  ): Promise<{ ok: boolean; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', adsetId, { daily_budget: dailyBudgetMinorUnits });
      return { ok: true, simulado: true };
    }
    this.assertWriteAllowed('alteracao de orcamento');
    const response = await this.client.post<{ success?: boolean }>(adsetId, {
      daily_budget: dailyBudgetMinorUnits,
    });
    return { ok: response.success !== false, simulado: false };
  }

  async updateCampaignDailyBudget(
    campaignId: string,
    dailyBudgetMinorUnits: number,
  ): Promise<{ ok: boolean; simulado: boolean }> {
    if (this.options.dryRun) {
      this.client.recordSimulated('POST', campaignId, { daily_budget: dailyBudgetMinorUnits });
      return { ok: true, simulado: true };
    }
    this.assertWriteAllowed('alteracao de orcamento da campanha');
    const response = await this.client.post<{ success?: boolean }>(campaignId, {
      daily_budget: dailyBudgetMinorUnits,
    });
    return { ok: response.success !== false, simulado: false };
  }
}
