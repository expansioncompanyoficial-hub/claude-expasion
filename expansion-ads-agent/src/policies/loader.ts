import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { ZodType } from 'zod';
import { ConfigError } from '../shared/errors.js';
import {
  approvalPolicySchema,
  budgetPolicySchema,
  globalPolicySchema,
  optimizationPolicySchema,
  type PolicyBundle,
} from './schema.js';

function loadPolicyFile<T>(dir: string, file: string, schema: ZodType<T>): T {
  const fullPath = path.join(dir, file);
  let raw: string;
  try {
    raw = readFileSync(fullPath, 'utf8');
  } catch {
    throw new ConfigError(`Politica nao encontrada: ${file}.`, { path: fullPath }, [
      `Restaure o arquivo ${file} em policies/.`,
    ]);
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch (error) {
    throw new ConfigError(`Politica ${file} nao e um JSON valido.`, {
      erro: (error as Error).message,
    });
  }

  const result = schema.safeParse(parsedJson);
  if (!result.success) {
    throw new ConfigError(`Politica ${file} invalida.`, {
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }
  return result.data;
}

let cache: { dir: string; bundle: PolicyBundle } | null = null;

export function loadPolicies(dir: string, useCache = true): PolicyBundle {
  if (useCache && cache && cache.dir === dir) return cache.bundle;
  const bundle: PolicyBundle = {
    global: loadPolicyFile(dir, 'global-policy.json', globalPolicySchema),
    budget: loadPolicyFile(dir, 'budget-policy.json', budgetPolicySchema),
    approval: loadPolicyFile(dir, 'approval-policy.json', approvalPolicySchema),
    optimization: loadPolicyFile(dir, 'optimization-policy.json', optimizationPolicySchema),
  };
  cache = { dir, bundle };
  return bundle;
}

export function resetPolicyCache(): void {
  cache = null;
}
