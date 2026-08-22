import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function sameThreshold(left, right) {
  return ["composite", "fit", "secure"].every((key) => left?.[key] === right?.[key]);
}

function ageInDays(date, asOf) {
  const published = new Date(date);
  const evaluated = new Date(`${asOf}T23:59:59.999Z`);
  return Math.floor((evaluated.getTime() - published.getTime()) / 86_400_000);
}

function containsProtectedAccountFields(value) {
  const text = JSON.stringify(value);
  return /gmailMessageId|threadId|accountUrl|mailboxId|oauthToken|accessToken|refreshToken/i.test(text);
}

export function evaluateBetaNycMonitor({ config, registry, snapshot, workflow, asOf }) {
  const source = registry.sources.find((entry) => entry.id === config.sourceId);
  const stages = config.evaluation?.stages ?? [];
  const deterministicBeforeModel =
    stages.indexOf("source-identity-and-freshness") === 0 &&
    stages.indexOf("official-url-resolution-and-deduplication") === 1 &&
    stages.indexOf("eligibility-salary-deadline-and-credential-screens") === 2 &&
    stages.indexOf("deterministic-fit-and-secure-score") === 3 &&
    stages.indexOf("named-reader-llm") === 4 &&
    config.evaluation?.llmGate === "new-verified-strong-matches-only";
  const sourceCurrent =
    snapshot.source?.id === config.sourceId &&
    ageInDays(snapshot.source?.publishedAt, asOf) >= -1 &&
    ageInDays(snapshot.source?.publishedAt, asOf) <= config.maximumAgeDays;
  const strongMatches = snapshot.provisionalStrongMatches ?? [];
  const thresholdsHold =
    sameThreshold(snapshot.policy?.strongMatchThreshold, config.strongMatchThreshold) &&
    strongMatches.every(
      (entry) =>
        entry.fitScore >= config.strongMatchThreshold.fit &&
        entry.secureScore >= config.strongMatchThreshold.secure &&
        entry.compositeScore >= config.strongMatchThreshold.composite &&
        entry.qualificationReview === "human-review-required" &&
        /^https:\/\//.test(entry.officialUrl ?? "") &&
        Boolean(entry.jobId)
    );
  const everyLeadDisposed =
    snapshot.census?.discoveredLeads > 0 &&
    snapshot.census.discoveredLeads === snapshot.leads?.length &&
    snapshot.leads.every((lead) =>
      ["provisional-strong-match", "not-promoted", "official-verification-required"].includes(lead.disposition)
    );
  const dailyReadOnly =
    /schedule\s*:/m.test(workflow) &&
    /cron\s*:/m.test(workflow) &&
    /npm run opportunities:betanyc:daily/.test(workflow) &&
    /contents:\s*read/.test(workflow) &&
    !/git push|gh pr create|contents:\s*write/.test(workflow);
  const sourceFluent =
    source?.sourceType === "editorially-curated-recurring-newsletter" &&
    ["recurring-public-archive", "editorially-curated-job-leads", "civic-ecosystem-context"].every((item) =>
      source.affordances?.includes(item)
    ) &&
    source.boundaries?.includes("official-employer-posting-controls") &&
    source.boundaries?.includes("application-submission-remains-human");
  const intakeSafe =
    config.automaticDisposition === "provisional-intake-only" &&
    snapshot.policy?.automaticDisposition === "provisional-intake-only" &&
    snapshot.policy?.officialPostingControls === true &&
    snapshot.policy?.applicationAuthority === "Jamie Burkart" &&
    strongMatches.every((entry) => entry.automaticDisposition === "provisional-intake-only");

  const checks = [
    { id: "recurring-source-is-modeled-by-its-affordances", pass: sourceFluent, detail: source?.id ?? "missing" },
    { id: "latest-public-issue-is-current", pass: sourceCurrent, detail: snapshot.source?.publishedAt ?? "missing" },
    { id: "every-lead-has-a-disposition", pass: everyLeadDisposed, detail: JSON.stringify(snapshot.census ?? {}) },
    { id: "deterministic-gates-precede-model-review", pass: deterministicBeforeModel, detail: stages.join(" -> ") },
    { id: "verified-strong-matches-clear-every-threshold", pass: thresholdsHold, detail: `${strongMatches.length} provisional matches` },
    { id: "automatic-promotion-stops-at-provisional-intake", pass: intakeSafe, detail: config.automaticDisposition },
    { id: "private-mailbox-state-is-not-retained", pass: !containsProtectedAccountFields(snapshot), detail: "public issue metadata only" },
    { id: "daily-read-only-review-is-configured", pass: dailyReadOnly, detail: "scheduled artifact-only workflow" }
  ];
  return { pass: checks.every((check) => check.pass), checks };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const config = JSON.parse(readFileSync(path.join(repoRoot, "data/opportunities/betanyc-newsletter-monitor.json"), "utf8"));
  const registry = JSON.parse(readFileSync(path.join(repoRoot, "evals/opportunity-intake/sources.json"), "utf8"));
  const snapshot = JSON.parse(readFileSync(path.join(repoRoot, config.snapshotPath), "utf8"));
  const workflow = readFileSync(path.join(repoRoot, ".github/workflows/nyc-jobs-opportunity-monitor.yml"), "utf8");
  const asOf = process.env.OPPORTUNITY_AS_OF ?? new Date().toISOString().slice(0, 10);
  const result = evaluateBetaNycMonitor({ config, registry, snapshot, workflow, asOf });
  console.log(JSON.stringify(result, null, 2));
  if (!result.pass) process.exitCode = 1;
}
