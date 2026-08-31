import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), 'utf8');
const check = (id, pass, detail) => ({ id, pass: Boolean(pass), detail });

export function evaluateProductManagerDraft({ application, source, opportunity }) {
  const expectedRanges = ['2017–2024', '2016–2016', '2013–Present', '2017–Present', '2012–Present'];
  const appText = application.replace(/\s+/g, ' ');
  const sourceText = source.replace(/\s+/g, ' ');
  const checks = [
    check('prepared-not-submitted', /application_state: prepared-not-submitted/.test(application) && !/application_state: submitted/.test(application), 'Draft state must not be inflated to submission.'),
    check('private-source-boundary', /visibility: summary-only/.test(source) && /raw exports remain outside Git/i.test(sourceText) && !/\/tmp\/|codex-remote-attachments|Preliminary-questions-Product-Manager|Easy-apply-Product-Manager/i.test(source), 'Only a bounded source summary may enter Git.'),
    check('entered-year-ranges', expectedRanges.every((range) => application.includes(range)), 'All five user-entered year ranges must remain visible.'),
    check('month-precision-boundary', /months are not visible/i.test(appText) && /Do not manufacture month precision/i.test(appText), 'The export does not establish month values.'),
    check('chronology-conflicts', /KC Town Hall[\s\S]*2017–2024[\s\S]*2015–2024/.test(application) && /WOWList[\s\S]*2013–Present[\s\S]*2015–2020/.test(application) && /THICK ARTS[\s\S]*2012–Present[\s\S]*2009–Present/.test(application), 'All three scope or date conflicts must remain explicit.'),
    check('accuracy-human-gate', /accuracy_certification: blocked-pending-reconciliation/.test(application) && /Jamie must personally read and check/i.test(appText), 'Accuracy, terms, privacy, and submission remain Jamie-only.'),
    check('protected-fields-unanswered', /leave the voluntary demographic and veteran fields blank/i.test(appText) && /Never infer/i.test(appText), 'No protected answer may be inferred.'),
    check('application-source-edge', /target: source\.application\.nyc-oti\.product-manager\.784450\.2026-08-31/.test(application) && /target: application\.nyc-oti\.product-manager\.784450\.draft/.test(source), 'Application and bounded source must be linked in both directions.'),
    check('opportunity-edge-and-state', /target: application\.nyc-oti\.product-manager\.784450\.draft/.test(opportunity) && /application_state: prepared-not-submitted/.test(opportunity), 'Opportunity must point to the draft without claiming submission.'),
  ];
  return {
    checks,
    passedChecks: checks.filter((item) => item.pass).length,
    totalChecks: checks.length,
    overall: checks.every((item) => item.pass) ? 'pass' : 'fail',
  };
}

export function evaluateRepository() {
  return evaluateProductManagerDraft({
    application: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450-draft.md'),
    source: read('docs/knowledge-bank/sources/nyc-oti-product-manager-784450-application-draft-2026-08-31.md'),
    opportunity: read('docs/knowledge-bank/opportunities/oti-product-manager-784450.md'),
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = evaluateRepository();
  for (const item of result.checks) console.log(`${item.pass ? 'PASS' : 'FAIL'} ${item.id}: ${item.detail}`);
  console.log(`${result.passedChecks}/${result.totalChecks} checks passed`);
  process.exitCode = result.overall === 'pass' ? 0 : 1;
}
