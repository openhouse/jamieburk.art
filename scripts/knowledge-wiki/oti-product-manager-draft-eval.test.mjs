import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { evaluateProductManagerDraft, evaluateRepository } from './oti-product-manager-draft-eval.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), 'utf8');

test('Product Manager draft remains historical after the separate submitted milestone', () => {
  const result = evaluateRepository();
  assert.equal(result.overall, 'pass', JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});

test('draft eval rejects submission inflation, lost month caveat, and missing chronology conflict', () => {
  const base = {
    application: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450-draft.md'),
    source: read('docs/knowledge-bank/sources/nyc-oti-product-manager-784450-application-draft-2026-08-31.md'),
    opportunity: read('docs/knowledge-bank/opportunities/oti-product-manager-784450.md'),
  };
  const inflated = evaluateProductManagerDraft({
    ...base,
    application: base.application.replace('application_state: prepared-not-submitted', 'application_state: submitted'),
  });
  const inventedMonths = evaluateProductManagerDraft({
    ...base,
    application: base.application.replace('months are not visible', 'months are January'),
  });
  const hiddenConflict = evaluateProductManagerDraft({
    ...base,
    application: base.application.replace('2013–Present', '2015–2020'),
  });
  assert.equal(inflated.checks.find((check) => check.id === 'prepared-not-submitted')?.pass, false);
  assert.equal(inventedMonths.checks.find((check) => check.id === 'month-precision-boundary')?.pass, false);
  assert.equal(hiddenConflict.checks.find((check) => check.id === 'entered-year-ranges')?.pass, false);
});
