/** Linhas do banco. Colunas `*_json` sao TEXT com JSON serializado. */

export interface ClientRow {
  id: string;
  name: string;
  ad_account_id: string;
  business_id: string | null;
  page_id: string | null;
  instagram_id: string | null;
  pixel_id: string | null;
  currency: string;
  timezone: string;
  status: string;
  config_json: string;
  config_hash: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignBriefRow {
  id: string;
  client_id: string;
  source_path: string | null;
  campaign_name: string;
  template: string;
  brief_json: string;
  brief_hash: string;
  created_at: string;
}

export interface CampaignRow {
  id: string;
  client_id: string;
  brief_id: string | null;
  internal_name: string;
  template: string;
  objective: string;
  ad_account_id: string;
  state: string;
  meta_campaign_id: string | null;
  meta_status: string | null;
  daily_budget_cents: number | null;
  lifetime_budget_cents: number | null;
  currency: string;
  start_time: string | null;
  stop_time: string | null;
  idempotency_key: string;
  spec_hash: string;
  creatives_hash: string;
  brief_hash: string;
  plan_json: string;
  dry_run: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdSetRow {
  id: string;
  campaign_id: string;
  name: string;
  meta_adset_id: string | null;
  meta_status: string | null;
  optimization_goal: string;
  billing_event: string;
  destination_type: string | null;
  daily_budget_cents: number | null;
  lifetime_budget_cents: number | null;
  targeting_json: string;
  promoted_object_json: string | null;
  spec_json: string;
  idempotency_key: string;
  created_at: string;
  updated_at: string;
}

export interface CreativeRow {
  id: string;
  client_id: string;
  campaign_id: string | null;
  kind: string;
  file_path: string | null;
  file_hash: string | null;
  file_bytes: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  meta_image_hash: string | null;
  meta_video_id: string | null;
  meta_creative_id: string | null;
  copy_json: string | null;
  spec_json: string | null;
  idempotency_key: string;
  created_at: string;
  updated_at: string;
}

export interface AdRow {
  id: string;
  campaign_id: string;
  adset_id: string;
  creative_id: string;
  name: string;
  meta_ad_id: string | null;
  meta_status: string | null;
  spec_json: string;
  idempotency_key: string;
  created_at: string;
  updated_at: string;
}

export interface ApprovalRow {
  id: string;
  campaign_id: string;
  client_id: string;
  approval_token: string;
  approved_by: string;
  approved_at: string;
  expires_at: string;
  status: string;
  approved_budget_cents: number;
  budget_kind: string;
  approved_summary: string;
  meta_ids_json: string;
  fingerprint: string;
  consumed_at: string | null;
  revoked_at: string | null;
  revoke_reason: string | null;
}

export interface MetaObjectRow {
  id: string;
  client_id: string;
  campaign_id: string | null;
  object_type: string;
  meta_id: string;
  ad_account_id: string;
  status: string | null;
  payload_json: string | null;
  idempotency_key: string | null;
  dry_run: number;
  created_at: string;
}

export interface ActionLogRow {
  id: string;
  ts: string;
  actor: string;
  actor_kind: string;
  tool: string;
  client_id: string | null;
  ad_account_id: string | null;
  campaign_id: string | null;
  params_json: string | null;
  outcome: string;
  created_ids_json: string | null;
  error_json: string | null;
  state_before: string | null;
  state_after: string | null;
  dry_run: number;
  duration_ms: number | null;
}

export interface PerformanceSnapshotRow {
  id: string;
  client_id: string;
  campaign_id: string | null;
  meta_object_type: string;
  meta_object_id: string;
  date_start: string;
  date_stop: string;
  metrics_json: string;
  collected_at: string;
}

export interface OptimizationRecommendationRow {
  id: string;
  client_id: string;
  campaign_id: string | null;
  meta_object_type: string;
  meta_object_id: string;
  action: string;
  confidence: string;
  rationale_json: string;
  blocked_by_json: string | null;
  applied: number;
  applied_at: string | null;
  created_at: string;
}

export interface PolicyViolationRow {
  id: string;
  ts: string;
  client_id: string | null;
  campaign_id: string | null;
  tool: string | null;
  policy: string;
  rule: string;
  severity: string;
  message: string;
  context_json: string | null;
}

export interface JobRunRow {
  id: string;
  job_name: string;
  started_at: string;
  finished_at: string | null;
  status: string;
  trigger: string;
  summary_json: string | null;
  error_json: string | null;
}

export interface IdempotencyKeyRow {
  key: string;
  scope: string;
  client_id: string;
  ad_account_id: string;
  result_json: string | null;
  created_at: string;
}
