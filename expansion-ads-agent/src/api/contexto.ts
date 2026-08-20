import path from 'node:path';
import type { AgentContext } from '../context.js';
import { DeterministicAdvisor } from '../advisor/deterministic.js';
import { AuthService, UserStore, caminhoUsuarios } from './auth.js';
import type { Router } from './http.js';

/** Estado compartilhado por todas as rotas. */
export interface ApiContexto {
  readonly agent: AgentContext;
  readonly auth: AuthService;
  readonly users: UserStore;
  readonly advisor: DeterministicAdvisor;
  readonly router: Router;
  /** Rascunhos do assistente, em memoria + banco. */
  readonly draftsDir: string;
}

export function montarApiContexto(agent: AgentContext, router: Router): ApiContexto {
  const users = new UserStore(caminhoUsuarios(agent.config.paths.root));
  const auth = new AuthService(agent.db, users, agent.clock);
  const advisor = new DeterministicAdvisor(agent.policyEngine);

  agent.db.driver.exec(`
    CREATE TABLE IF NOT EXISTS drafts (
      id          TEXT PRIMARY KEY,
      user_id     TEXT NOT NULL,
      client_id   TEXT,
      payload     TEXT NOT NULL,
      etapa       INTEGER NOT NULL DEFAULT 1,
      created_at  TEXT NOT NULL,
      updated_at  TEXT NOT NULL
    );
  `);

  return {
    agent,
    auth,
    users,
    advisor,
    router,
    draftsDir: path.join(agent.config.paths.root, 'briefs'),
  };
}
