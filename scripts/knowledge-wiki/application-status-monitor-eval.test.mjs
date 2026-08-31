import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { evaluateApplicationStatusMonitor, evaluateRepository } from './application-status-monitor-eval.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), 'utf8');

function repositoryInputs() {
  return {
    monitorConfig: read('data/applications/nyc-oti-status-monitor.json'),
    method: read('docs/knowledge-bank/methods/private-application-status-loop.md'),
    source: read('docs/knowledge-bank/sources/nyc-oti-application-status-dashboard-2026-08-31.md'),
    productApplication: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450.md'),
    operationsApplication: read('docs/knowledge-bank/applications/nyc-oti-speed-operations-manager-789810.md'),
  };
}

test('two OTI applications have refreshable, private-bounded status connections', () => {
  const result = evaluateRepository();
  assert.equal(result.overall, 'pass', JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});

test('monitor rejects raw locators, inferred review, and a missing application binding', () => {
  const base = repositoryInputs();
  const rawLocator = evaluateApplicationStatusMonitor({
    ...base,
    monitorConfig: base.monitorConfig.replace(
      '"locatorStorage": "authenticated-browser-runtime-only"',
      '"locatorStorage": "https://jobs.smartrecruiters.com/private-token"'
    ),
  });
  const reviewInflation = evaluateApplicationStatusMonitor({
    ...base,
    productApplication: base.productApplication.replace(
      'normalized_status: received-awaiting-review',
      'normalized_status: in-review'
    ),
  });
  const missingBinding = evaluateApplicationStatusMonitor({
    ...base,
    monitorConfig: base.monitorConfig.replace('"reference": "789810"', '"reference": "missing"'),
  });

  assert.equal(rawLocator.checks.find((item) => item.id === 'private-locator-boundary')?.pass, false);
  assert.equal(reviewInflation.checks.find((item) => item.id === 'literal-provider-state')?.pass, false);
  assert.equal(missingBinding.checks.find((item) => item.id === 'two-application-bindings')?.pass, false);
});

test('monitor treats silence, failed login, and shared-dashboard access as non-events', () => {
  const base = repositoryInputs();
  const inferredSilence = evaluateApplicationStatusMonitor({
    ...base,
    method: `${base.method}\nNo new email means the application remains active and under review.\n`,
  });
  const pageFailureInflation = evaluateApplicationStatusMonitor({
    ...base,
    method: base.method.replace(
      /leave the last verified\s+status unchanged/,
      'promote the application to in-review'
    ),
  });
  const perLinkDashboardInflation = evaluateApplicationStatusMonitor({
    ...base,
    source: `${base.source}\nEach email exposed an independent application-only status system.\n`,
  });

  assert.equal(inferredSilence.checks.find((item) => item.id === 'no-silence-inference')?.pass, false);
  assert.equal(pageFailureInflation.checks.find((item) => item.id === 'failed-refresh-is-not-status')?.pass, false);
  assert.equal(perLinkDashboardInflation.checks.find((item) => item.id === 'shared-dashboard-model')?.pass, false);
});
