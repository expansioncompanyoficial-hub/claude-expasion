/**
 * Schema do banco local. Cada migracao e idempotente e aplicada em ordem.
 * A tabela `schema_migrations` guarda o que ja rodou.
 */

export interface Migration {
  readonly id: string;
  readonly sql: string;
}

export const MIGRATIONS: readonly Migration[] = [
  {
    id: '001_core',
    sql: `
CREATE TABLE IF NOT EXISTS clients (
  id                TEXT PRIMARY KEY,
  name              TEXT NOT NULL,
  ad_account_id     TEXT NOT NULL,
  business_id       TEXT,
  page_id           TEXT,
  instagram_id      TEXT,
  pixel_id          TEXT,
  currency          TEXT NOT NULL,
  timezone          TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'active',
  config_json       TEXT NOT NULL,
  config_hash       TEXT NOT NULL,
  created_at        TEXT NOT NULL,
  updated_at        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS campaign_briefs (
  id                TEXT PRIMARY KEY,
  client_id         TEXT NOT NULL REFERENCES clients(id),
  source_path       TEXT,
  campaign_name     TEXT NOT NULL,
  template          TEXT NOT NULL,
  brief_json        TEXT NOT NULL,
  brief_hash        TEXT NOT NULL,
  created_at        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_briefs_client ON campaign_briefs(client_id);
CREATE INDEX IF NOT EXISTS idx_briefs_hash ON campaign_briefs(brief_hash);

CREATE TABLE IF NOT EXISTS campaigns (
  id                  TEXT PRIMARY KEY,
  client_id           TEXT NOT NULL REFERENCES clients(id),
  brief_id            TEXT REFERENCES campaign_briefs(id),
  internal_name       TEXT NOT NULL,
  template            TEXT NOT NULL,
  objective           TEXT NOT NULL,
  ad_account_id       TEXT NOT NULL,
  state               TEXT NOT NULL,
  meta_campaign_id    TEXT,
  meta_status         TEXT,
  daily_budget_cents  INTEGER,
  lifetime_budget_cents INTEGER,
  currency            TEXT NOT NULL,
  start_time          TEXT,
  stop_time           TEXT,
  idempotency_key     TEXT NOT NULL,
  spec_hash           TEXT NOT NULL,
  creatives_hash      TEXT NOT NULL,
  brief_hash          TEXT NOT NULL,
  plan_json           TEXT NOT NULL,
  dry_run             INTEGER NOT NULL DEFAULT 1,
  last_error          TEXT,
  created_at          TEXT NOT NULL,
  updated_at          TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_campaigns_idempotency ON campaigns(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_campaigns_client ON campaigns(client_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_state ON campaigns(state);
CREATE INDEX IF NOT EXISTS idx_campaigns_meta ON campaigns(meta_campaign_id);

CREATE TABLE IF NOT EXISTS adsets (
  id                  TEXT PRIMARY KEY,
  campaign_id         TEXT NOT NULL REFERENCES campaigns(id),
  name                TEXT NOT NULL,
  meta_adset_id       TEXT,
  meta_status         TEXT,
  optimization_goal   TEXT NOT NULL,
  billing_event       TEXT NOT NULL,
  destination_type    TEXT,
  daily_budget_cents  INTEGER,
  lifetime_budget_cents INTEGER,
  targeting_json      TEXT NOT NULL,
  promoted_object_json TEXT,
  spec_json           TEXT NOT NULL,
  idempotency_key     TEXT NOT NULL,
  created_at          TEXT NOT NULL,
  updated_at          TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_adsets_idempotency ON adsets(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_adsets_campaign ON adsets(campaign_id);

CREATE TABLE IF NOT EXISTS creatives (
  id                  TEXT PRIMARY KEY,
  client_id           TEXT NOT NULL REFERENCES clients(id),
  campaign_id         TEXT REFERENCES campaigns(id),
  kind                TEXT NOT NULL,
  file_path           TEXT,
  file_hash           TEXT,
  file_bytes          INTEGER,
  mime_type           TEXT,
  width               INTEGER,
  height              INTEGER,
  meta_image_hash     TEXT,
  meta_video_id       TEXT,
  meta_creative_id    TEXT,
  copy_json           TEXT,
  spec_json           TEXT,
  idempotency_key     TEXT NOT NULL,
  created_at          TEXT NOT NULL,
  updated_at          TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_creatives_idempotency ON creatives(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_creatives_client_hash ON creatives(client_id, file_hash);
CREATE INDEX IF NOT EXISTS idx_creatives_campaign ON creatives(campaign_id);

CREATE TABLE IF NOT EXISTS ads (
  id                  TEXT PRIMARY KEY,
  campaign_id         TEXT NOT NULL REFERENCES campaigns(id),
  adset_id            TEXT NOT NULL REFERENCES adsets(id),
  creative_id         TEXT NOT NULL REFERENCES creatives(id),
  name                TEXT NOT NULL,
  meta_ad_id          TEXT,
  meta_status         TEXT,
  spec_json           TEXT NOT NULL,
  idempotency_key     TEXT NOT NULL,
  created_at          TEXT NOT NULL,
  updated_at          TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_ads_idempotency ON ads(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_ads_campaign ON ads(campaign_id);

CREATE TABLE IF NOT EXISTS approvals (
  id                    TEXT PRIMARY KEY,
  campaign_id           TEXT NOT NULL REFERENCES campaigns(id),
  client_id             TEXT NOT NULL REFERENCES clients(id),
  approval_token        TEXT NOT NULL,
  approved_by           TEXT NOT NULL,
  approved_at           TEXT NOT NULL,
  expires_at            TEXT NOT NULL,
  status                TEXT NOT NULL,
  approved_budget_cents INTEGER NOT NULL,
  budget_kind           TEXT NOT NULL,
  approved_summary      TEXT NOT NULL,
  meta_ids_json         TEXT NOT NULL,
  fingerprint           TEXT NOT NULL,
  consumed_at           TEXT,
  revoked_at            TEXT,
  revoke_reason         TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_approvals_token ON approvals(approval_token);
CREATE INDEX IF NOT EXISTS idx_approvals_campaign ON approvals(campaign_id);

CREATE TABLE IF NOT EXISTS meta_objects (
  id                TEXT PRIMARY KEY,
  client_id         TEXT NOT NULL,
  campaign_id       TEXT,
  object_type       TEXT NOT NULL,
  meta_id           TEXT NOT NULL,
  ad_account_id     TEXT NOT NULL,
  status            TEXT,
  payload_json      TEXT,
  idempotency_key   TEXT,
  dry_run           INTEGER NOT NULL DEFAULT 1,
  created_at        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_meta_objects_campaign ON meta_objects(campaign_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_meta_objects_unique ON meta_objects(object_type, meta_id, ad_account_id);

CREATE TABLE IF NOT EXISTS action_logs (
  id                TEXT PRIMARY KEY,
  ts                TEXT NOT NULL,
  actor             TEXT NOT NULL,
  actor_kind        TEXT NOT NULL,
  tool              TEXT NOT NULL,
  client_id         TEXT,
  ad_account_id     TEXT,
  campaign_id       TEXT,
  params_json       TEXT,
  outcome           TEXT NOT NULL,
  created_ids_json  TEXT,
  error_json        TEXT,
  state_before      TEXT,
  state_after       TEXT,
  dry_run           INTEGER NOT NULL DEFAULT 1,
  duration_ms       INTEGER
);
CREATE INDEX IF NOT EXISTS idx_action_logs_ts ON action_logs(ts);
CREATE INDEX IF NOT EXISTS idx_action_logs_campaign ON action_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_action_logs_tool ON action_logs(tool);

CREATE TABLE IF NOT EXISTS performance_snapshots (
  id                TEXT PRIMARY KEY,
  client_id         TEXT NOT NULL,
  campaign_id       TEXT,
  meta_object_type  TEXT NOT NULL,
  meta_object_id    TEXT NOT NULL,
  date_start        TEXT NOT NULL,
  date_stop         TEXT NOT NULL,
  metrics_json      TEXT NOT NULL,
  collected_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_snapshots_object ON performance_snapshots(meta_object_id, date_start, date_stop);

CREATE TABLE IF NOT EXISTS optimization_recommendations (
  id                TEXT PRIMARY KEY,
  client_id         TEXT NOT NULL,
  campaign_id       TEXT,
  meta_object_type  TEXT NOT NULL,
  meta_object_id    TEXT NOT NULL,
  action            TEXT NOT NULL,
  confidence        TEXT NOT NULL,
  rationale_json    TEXT NOT NULL,
  blocked_by_json   TEXT,
  applied           INTEGER NOT NULL DEFAULT 0,
  applied_at        TEXT,
  created_at        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_reco_campaign ON optimization_recommendations(campaign_id);

CREATE TABLE IF NOT EXISTS policy_violations (
  id                TEXT PRIMARY KEY,
  ts                TEXT NOT NULL,
  client_id         TEXT,
  campaign_id       TEXT,
  tool              TEXT,
  policy            TEXT NOT NULL,
  rule              TEXT NOT NULL,
  severity          TEXT NOT NULL,
  message           TEXT NOT NULL,
  context_json      TEXT
);
CREATE INDEX IF NOT EXISTS idx_violations_ts ON policy_violations(ts);

CREATE TABLE IF NOT EXISTS job_runs (
  id                TEXT PRIMARY KEY,
  job_name          TEXT NOT NULL,
  started_at        TEXT NOT NULL,
  finished_at       TEXT,
  status            TEXT NOT NULL,
  trigger           TEXT NOT NULL,
  summary_json      TEXT,
  error_json        TEXT
);
CREATE INDEX IF NOT EXISTS idx_job_runs_name ON job_runs(job_name, started_at);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  key               TEXT PRIMARY KEY,
  scope             TEXT NOT NULL,
  client_id         TEXT NOT NULL,
  ad_account_id     TEXT NOT NULL,
  result_json       TEXT,
  created_at        TEXT NOT NULL
);
`,
  },
];
