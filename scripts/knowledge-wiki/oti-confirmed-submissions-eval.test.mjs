import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { evaluateConfirmedSubmissions, evaluateRepository } from './oti-confirmed-submissions-eval.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), 'utf8');

function repositoryInputs() {
  return {
    productApplication: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450.md'),
    operationsApplication: read('docs/knowledge-bank/applications/nyc-oti-speed-operations-manager-789810.md'),
    confirmationSource: read('docs/knowledge-bank/sources/nyc-oti-application-confirmations-2026-08-31.md'),
    productOpportunity: read('docs/knowledge-bank/opportunities/oti-product-manager-784450.md'),
    operationsOpportunity: read('docs/knowledge-bank/opportunities/oti-speed-operations-manager-789810.md'),
    productDraft: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450-draft.md'),
    civicMatchSource: read('docs/knowledge-bank/sources/civic-match-candidate-network-2026-08-20.md'),
  };
}

test('two OTI applications are recorded as received, private-bounded, and outcome-pending', () => {
  const result = evaluateRepository();
  assert.equal(result.overall, 'pass', JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});

test('submission eval rejects outcome, introduction, route, identity, and private-evidence inflation', () => {
  const base = repositoryInputs();
  const outcomeInflation = evaluateConfirmedSubmissions({
    ...base,
    productApplication: base.productApplication.replace('outcome_state: pending', 'outcome_state: interview'),
  });
  const introductionInflation = evaluateConfirmedSubmissions({
    ...base,
    operationsApplication: `${base.operationsApplication}\nA warm introduction was completed.\n`,
  });
  const routeInflation = evaluateConfirmedSubmissions({
    ...base,
    productApplication: base.productApplication.replace(
      'Civic Match was the discovery source, not the employer submission destination.',
      'Civic Match submitted the application to the employer.'
    ),
  });
  const identityInflation = evaluateConfirmedSubmissions({
    ...base,
    confirmationSource: `${base.confirmationSource}\nThe email addressed the applicant as James.\n`,
  });
  const privateLeak = evaluateConfirmedSubmissions({
    ...base,
    confirmationSource: `${base.confirmationSource}\n/tmp/codex-remote-attachments/private/2-Photo-2.jpg\n`,
  });

  assert.equal(outcomeInflation.checks.find((item) => item.id === 'outcomes-remain-pending')?.pass, false);
  assert.equal(introductionInflation.checks.find((item) => item.id === 'no-warm-path-inflation')?.pass, false);
  assert.equal(routeInflation.checks.find((item) => item.id === 'source-route-separation')?.pass, false);
  assert.equal(identityInflation.checks.find((item) => item.id === 'private-evidence-boundary')?.pass, false);
  assert.equal(privateLeak.checks.find((item) => item.id === 'private-evidence-boundary')?.pass, false);
});

test('submission eval rejects a missing lifecycle edge or changed receipt date', () => {
  const base = repositoryInputs();
  const missingEdge = evaluateConfirmedSubmissions({
    ...base,
    operationsOpportunity: base.operationsOpportunity.replace(
      /\n  - type: related_to\n    target: application\.nyc-oti\.speed-operations-manager\.789810\n    href: \.\.\/applications\/nyc-oti-speed-operations-manager-789810\.md/,
      ''
    ),
  });
  const changedDate = evaluateConfirmedSubmissions({
    ...base,
    productApplication: base.productApplication.replace('submitted_on: "2026-08-31"', 'submitted_on: "2026-08-30"'),
  });

  assert.equal(missingEdge.checks.find((item) => item.id === 'opportunity-lifecycle-edges')?.pass, false);
  assert.equal(changedDate.checks.find((item) => item.id === 'two-date-level-receipts')?.pass, false);
});
