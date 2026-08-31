import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), 'utf8');
const check = (id, pass, detail) => ({ id, pass: Boolean(pass), detail });

const SUBMITTED_DATE = '2026-08-31';

function hasSubmissionState(text, reference) {
  return (
    new RegExp(`reference ${reference}`, 'i').test(text) &&
    /application_state: submitted/.test(text) &&
    new RegExp(`submitted_on: ["']${SUBMITTED_DATE}["']`).test(text) &&
    /authorization_state: human-completed/.test(text) &&
    /confirmation_evidence_state: reviewed-not-committed/.test(text)
  );
}

function hasPendingOutcome(text) {
  return (
    /outcome_state: pending/.test(text) &&
    /does not establish[\s\S]{0,260}civil-service eligibility/i.test(text) &&
    /interview/i.test(text) &&
    /offer/i.test(text) &&
    /appointment/i.test(text) &&
    /selection/i.test(text)
  );
}

function hasLifecycleEdge(text, target, href) {
  return text.includes(`target: ${target}`) && text.includes(`href: ${href}`);
}

export function evaluateConfirmedSubmissions({
  productApplication,
  operationsApplication,
  confirmationSource,
  productOpportunity,
  operationsOpportunity,
  productDraft,
  civicMatchSource,
}) {
  const allGovernedText = [productApplication, operationsApplication, confirmationSource].join('\n');
  const privateEvidencePattern =
    /\/tmp\/|codex-remote-attachments|\b[123]-Photo-[123]\b|Access My Application|notification@|gmail\.com|\b6:07\b|\b6:32\b|(?:addressed|applicant)[^\n]{0,40}\bJames\b/i;
  const completedWarmPathPattern =
    /(?:^|\n)\s*(?:A |The )?(?:warm introduction|personal referral) (?:was |has been )?(?:completed|made|secured|received|used)[.!]/im;
  const sourceRouteInflationPattern = /Civic Match submitted the application|submitted through Civic Match/i;

  const checks = [
    check(
      'two-date-level-receipts',
      hasSubmissionState(productApplication, '784450') &&
        hasSubmissionState(operationsApplication, '789810') &&
        /Product Manager[\s\S]{0,100}784450/i.test(confirmationSource) &&
        /Operations Manager[\s\S]{0,100}789810/i.test(confirmationSource) &&
        new RegExp(SUBMITTED_DATE.replaceAll('-', '\\-')).test(confirmationSource),
      'Both expected references must have a date-level, human-completed receipt state.'
    ),
    check(
      'outcomes-remain-pending',
      hasPendingOutcome(productApplication) && hasPendingOutcome(operationsApplication),
      'Receipt must remain separate from eligibility, review, interview, offer, appointment, and selection.'
    ),
    check(
      'private-evidence-boundary',
      /visibility: summary-only/.test(confirmationSource) &&
        /custody: external-to-repository/.test(confirmationSource) &&
        /Raw images, correspondence, private application[\s\S]{0,220}remain outside Git/i.test(confirmationSource) &&
        !privateEvidencePattern.test(allGovernedText),
      'Private paths, messages, links, identifiers, precise times, and salutations must not enter Git.'
    ),
    check(
      'same-system-corroboration-boundary',
      /corroborating artifacts from the same application[\s\S]{0,80}not independent sources/i.test(confirmationSource),
      'The success screen and receipt message must not be misrepresented as independent sources.'
    ),
    check(
      'no-warm-path-inflation',
      /does not establish that a warm introduction or personal referral[\s\S]{0,12}occurred/i.test(productApplication) &&
        /does not establish that a warm introduction or personal referral[\s\S]{0,12}occurred/i.test(operationsApplication) &&
        /does not establish that a Civic Match introduction or personal referral was[\s\S]{0,80}(?:made|used)/i.test(confirmationSource) &&
        !completedWarmPathPattern.test(allGovernedText),
      'A future plan to try a connection feature must not become a completed introduction or referral.'
    ),
    check(
      'source-route-separation',
      /Civic Match was the discovery source, not the employer submission destination\./.test(productApplication) &&
        /Civic Match was the discovery source, not the employer submission destination\./.test(operationsApplication) &&
        /Candidates must still apply through each government's official process\./.test(civicMatchSource) &&
        !sourceRouteInflationPattern.test(allGovernedText),
      'Civic Match discovery and connection affordances must remain separate from formal City submission.'
    ),
    check(
      'opportunity-lifecycle-edges',
      /application_state: submitted/.test(productOpportunity) &&
        /application_state: submitted/.test(operationsOpportunity) &&
        hasLifecycleEdge(
          productOpportunity,
          'application.nyc-oti.product-manager.784450',
          '../applications/nyc-oti-product-manager-784450.md'
        ) &&
        hasLifecycleEdge(
          operationsOpportunity,
          'application.nyc-oti.speed-operations-manager.789810',
          '../applications/nyc-oti-speed-operations-manager-789810.md'
        ),
      'Each opportunity must point to its submitted milestone and carry the submitted state.'
    ),
    check(
      'historical-draft-preserved',
      /application_state: prepared-not-submitted/.test(productDraft) &&
        /target: application\.nyc-oti\.product-manager\.784450\n/.test(productDraft) &&
        /Historical-state note/.test(productDraft),
      'The Product Manager draft remains an immutable pre-submission observation linked to the later event.'
    ),
    check(
      'packet-lineage',
      /Field-by-field guide/.test(productApplication) &&
        /Tailored résumé PDF/.test(productApplication) &&
        /Signed cover-letter PDF/.test(productApplication) &&
        /Field-by-field guide/.test(operationsApplication) &&
        /Tailored résumé PDF/.test(operationsApplication) &&
        /Signed cover-letter PDF/.test(operationsApplication),
      'Both application milestones must retain guide, resume, and signed-letter lineage.'
    ),
  ];

  return {
    checks,
    passedChecks: checks.filter((item) => item.pass).length,
    totalChecks: checks.length,
    overall: checks.every((item) => item.pass) ? 'pass' : 'fail',
  };
}

export function evaluateRepository() {
  return evaluateConfirmedSubmissions({
    productApplication: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450.md'),
    operationsApplication: read('docs/knowledge-bank/applications/nyc-oti-speed-operations-manager-789810.md'),
    confirmationSource: read('docs/knowledge-bank/sources/nyc-oti-application-confirmations-2026-08-31.md'),
    productOpportunity: read('docs/knowledge-bank/opportunities/oti-product-manager-784450.md'),
    operationsOpportunity: read('docs/knowledge-bank/opportunities/oti-speed-operations-manager-789810.md'),
    productDraft: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450-draft.md'),
    civicMatchSource: read('docs/knowledge-bank/sources/civic-match-candidate-network-2026-08-20.md'),
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = evaluateRepository();
  for (const item of result.checks) console.log(`${item.pass ? 'PASS' : 'FAIL'} ${item.id}: ${item.detail}`);
  console.log(`${result.passedChecks}/${result.totalChecks} checks passed`);
  process.exitCode = result.overall === 'pass' ? 0 : 1;
}
