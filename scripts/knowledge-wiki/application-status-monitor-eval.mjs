import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), 'utf8');
const check = (id, pass, detail) => ({ id, pass: Boolean(pass), detail });

function parseConfig(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function evaluateApplicationStatusMonitor({
  monitorConfig,
  method,
  source,
  programUpdateSource,
  productApplication,
  operationsApplication,
  seniorProductApplication,
}) {
  const config = parseConfig(monitorConfig);
  const allText = [
    monitorConfig,
    method,
    source,
    programUpdateSource,
    productApplication,
    operationsApplication,
    seniorProductApplication,
  ].join('\n');
  const privateLocatorPattern = /https?:\/\/[^\s"']*(?:token|tracking|application-status|login)|sendgrid|codex-remote-attachments|(?:passcode|one-time code)[^\n]{0,20}\b\d{6}\b|gmail\.com\/mail\/u\/\d+\/#/i;
  const silenceInferencePattern = /No new email means|silence (?:means|proves|confirms)|absence of (?:new )?mail (?:means|proves|confirms)/i;
  const independentDashboardPattern = /independent application-only status system/i;
  const programUpdateInflationPattern = /(?:^|\n)(?:Jamie was selected to advance to an interview|This message changed the provider status to In Review)\./im;
  const apps = config?.applications ?? [];
  const byReference = new Map(apps.map((item) => [item.reference, item]));

  const checks = [
    check(
      'three-application-bindings',
      apps.length === 3 &&
        byReference.get('784450')?.applicationId === 'application.nyc-oti.product-manager.784450' &&
        byReference.get('784450')?.opportunityId === 'opportunity.nyc-oti.product-manager.784450' &&
        byReference.get('789810')?.applicationId === 'application.nyc-oti.speed-operations-manager.789810' &&
        byReference.get('789810')?.opportunityId === 'opportunity.nyc-oti.speed-operations-manager.789810' &&
        byReference.get('782366')?.applicationId === 'application.nyc-oti.senior-product-manager.782366' &&
        byReference.get('782366')?.opportunityId === 'opportunity.nyc-oti.senior-product-manager.782366',
      'All three employer references must bind one application node to one canonical opportunity node.'
    ),
    check(
      'private-locator-boundary',
      config?.locatorStorage === 'authenticated-browser-runtime-only' &&
        config?.acquisition?.credentialStorage === 'none' &&
        /private action URL[\s\S]{0,40}into Git/i.test(method) &&
        /Passcodes, message identifiers, redirects, private action URLs[\s\S]{0,160}not retained/i.test(source) &&
        !privateLocatorPattern.test(allText),
      'Private action URLs, redirect tokens, passcodes, mailbox locators, and credentials must stay out of Git.'
    ),
    check(
      'literal-provider-state',
      byReference.get('784450')?.providerStatus === 'New' &&
        byReference.get('784450')?.normalizedStatus === 'received-awaiting-review' &&
        byReference.get('789810')?.providerStatus === 'New' &&
        byReference.get('789810')?.normalizedStatus === 'received-awaiting-review' &&
        byReference.get('782366')?.providerStatus === 'In Review' &&
        byReference.get('782366')?.normalizedStatus === 'in-review' &&
        /provider_status: New/.test(productApplication) &&
        /normalized_status: received-awaiting-review/.test(productApplication) &&
        /provider_status: New/.test(operationsApplication) &&
        /normalized_status: received-awaiting-review/.test(operationsApplication) &&
        /provider_status: In Review/.test(seniorProductApplication) &&
        /normalized_status: in-review/.test(seniorProductApplication) &&
        !/normalized_status: in-review/.test(productApplication + operationsApplication) &&
        /Senior Product Manager[\s\S]{0,180}literal provider status `In\s+Review`/i.test(source) &&
        /does not establish[\s\S]{0,80}interview/i.test(source),
      'New remains received-awaiting-review while the literal In Review label supports only in-review.'
    ),
    check(
      'runtime-reacquisition-contract',
      config?.accessModel === 'shared-authenticated-applicant-dashboard' &&
        config?.acquisition?.channel === 'authorized-mailbox-and-browser' &&
        config?.acquisition?.authentication === 'one-time-passcode' &&
        config?.refresh?.mode === 'read-only' &&
        config?.refresh?.changeRule === 'provider-label-change-only',
      'The monitor must reacquire access at runtime and write only an observed provider-label change.'
    ),
    check(
      'automation-activation-boundary',
      config?.refresh?.cadence === 'proposed-weekday-heartbeat' &&
        config?.refresh?.activationState === 'explicit-approval-required' &&
        /recurring activation remains a separate\s+human gate/i.test(method) &&
        /public pull[\s\S]{0,20}request[\s\S]{0,220}must not become active until Jamie explicitly authorizes/i.test(method),
      'Recurring private access and public PR egress remain inactive until explicitly authorized.'
    ),
    check(
      'shared-dashboard-model',
      /all three access routes converged on the same shared\s+applicant dashboard/i.test(source) &&
        /not independent evidence/i.test(source) &&
        !independentDashboardPattern.test(source),
      'Application-specific email routes converge on one provider dashboard and are not independent sources.'
    ),
    check(
      'program-update-scope',
      /program-level process update/i.test(programUpdateSource) &&
        /very large application volume/i.test(programUpdateSource) &&
        /did not name employer reference\s+782366/i.test(programUpdateSource) &&
        /did not change the provider status to `In\s+Review`/i.test(programUpdateSource) &&
        /no later City or SmartRecruiters message tied\s+specifically/i.test(programUpdateSource) &&
        !programUpdateInflationPattern.test(programUpdateSource),
      'The volume update remains general process context and cannot become a job-specific advance or status event.'
    ),
    check(
      'no-silence-inference',
      /No new email or page change is not a status update\./.test(method) &&
        /absence of new mail leaves the last verified graph state unchanged/i.test(source) &&
        !silenceInferencePattern.test(method + source),
      'Silence and elapsed time must not create a lifecycle event.'
    ),
    check(
      'failed-refresh-is-not-status',
      /leave the last verified\s+status unchanged/i.test(method) &&
        config?.refresh?.failureRule === 'retain-last-verified-observation' &&
        !/promote the application to in-review/i.test(method),
      'Authentication, matching, and page failures preserve the last verified observation.'
    ),
    check(
      'read-only-affordance-boundary',
      /application materials[\s\S]{0,180}data-management controls/i.test(method) &&
        /remains read-only/i.test(method) &&
        /requires\s+separate Jamie authorization/i.test(method) &&
        /Those capabilities\s+were observed, not used/i.test(source),
      'Status refresh may inventory capabilities but cannot edit, withdraw, or communicate.'
    ),
    check(
      'graph-status-source-edges',
      [productApplication, operationsApplication, seniorProductApplication].every(
        (text) =>
          text.includes('target: source.application.nyc-oti.status-dashboard.2026-08-31') &&
          text.includes('target: method.private-application-status-loop') &&
          /status_locator_state: authenticated-browser-runtime-only/.test(text)
      ) &&
        /target: source\.application\.nyc-oti\.pit-crew-volume-update\.2026-08-20/.test(seniorProductApplication),
      'Each application node must connect to the bounded status observation and refresh method.'
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
  return evaluateApplicationStatusMonitor({
    monitorConfig: read('data/applications/nyc-oti-status-monitor.json'),
    method: read('docs/knowledge-bank/methods/private-application-status-loop.md'),
    source: read('docs/knowledge-bank/sources/nyc-oti-application-status-dashboard-2026-08-31.md'),
    programUpdateSource: read('docs/knowledge-bank/sources/nyc-oti-pit-crew-volume-update-2026-08-20.md'),
    productApplication: read('docs/knowledge-bank/applications/nyc-oti-product-manager-784450.md'),
    operationsApplication: read('docs/knowledge-bank/applications/nyc-oti-speed-operations-manager-789810.md'),
    seniorProductApplication: read('docs/knowledge-bank/applications/nyc-oti-senior-product-manager-782366.md'),
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = evaluateRepository();
  for (const item of result.checks) console.log(`${item.pass ? 'PASS' : 'FAIL'} ${item.id}: ${item.detail}`);
  console.log(`${result.passedChecks}/${result.totalChecks} checks passed`);
  process.exitCode = result.overall === 'pass' ? 0 : 1;
}
