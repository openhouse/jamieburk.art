import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function sameThreshold(left, right) {
  return ["composite", "fit", "secure"].every((key) => left?.[key] === right?.[key]);
}

export function evaluateOpportunityMonitor({ config, snapshot, lifecycle, asOf }) {
  const threshold = config.strongMatchThreshold;
  const sourceAligned =
    snapshot.dataset.id === config.datasetId &&
    snapshot.dataset.rowsUpdatedAt === config.rowsUpdatedAt &&
    snapshot.dataset.rowsUpdatedAtIso === config.rowsUpdatedAtIso;
  const matches = [...(snapshot.newStrongMatches ?? []), ...(snapshot.knownStrongMatches ?? [])];
  const thresholdsHold =
    sameThreshold(snapshot.policy?.strongMatchThreshold, threshold) &&
    matches.every(
      (entry) =>
        entry.fitScore >= threshold.fit &&
        entry.secureScore >= threshold.secure &&
        entry.compositeScore >= threshold.composite &&
        entry.qualificationReview === "human-review-required"
    );
  const stages = config.evaluation?.stages ?? [];
  const deterministicBeforeModel =
    stages.indexOf("source-integrity") >= 0 &&
    stages.indexOf("eligibility") > stages.indexOf("source-integrity") &&
    stages.indexOf("deterministic-score") > stages.indexOf("eligibility") &&
    stages.indexOf("named-reader-llm") > stages.indexOf("deterministic-score") &&
    config.evaluation?.llmGate === "new-strong-matches-only";
  const lifecycleSafe =
    !Array.isArray(snapshot.lifecycleMutations) &&
    (snapshot.knownJobIdsAbsentFromDataset ?? []).every(
      (jobId) =>
        !lifecycle.opportunities.some(
          (entry) => entry.opportunityId?.endsWith(`.${jobId}`) && entry.postingState === "closed-by-dataset-absence"
        )
    );
  const deliverySafe =
    config.delivery?.recipient === "jamie@ohai.us" &&
    config.delivery?.applicationAuthority === "Jamie Burkart" &&
    Array.isArray(config.delivery?.credentialEnvironmentVariables) &&
    config.delivery.credentialEnvironmentVariables.length === 3 &&
    !Object.prototype.hasOwnProperty.call(config.delivery, "apiKey");
  const countsCoherent =
    snapshot.census.sourceRows >= snapshot.census.uniqueJobIds &&
    snapshot.census.uniqueJobIds >= snapshot.census.deterministicallyEligible &&
    snapshot.census.deterministicallyEligible >= snapshot.census.strongMatches &&
    snapshot.census.strongMatches === matches.length;

  const checks = [
    {
      id: "source-state-is-current",
      pass: sourceAligned,
      detail: `${config.datasetId} @ ${config.rowsUpdatedAtIso}`
    },
    {
      id: "strong-match-thresholds-hold",
      pass: thresholdsHold,
      detail: `${matches.length} strong matches meet ${JSON.stringify(threshold)} and retain qualification review.`
    },
    {
      id: "automatic-intake-remains-provisional",
      pass: snapshot.policy?.automaticDisposition === "provisional-intake-only",
      detail: snapshot.policy?.automaticDisposition ?? "missing"
    },
    {
      id: "deterministic-gates-precede-model-review",
      pass: deterministicBeforeModel,
      detail: stages.join(" -> ")
    },
    {
      id: "feed-absence-cannot-change-lifecycle",
      pass: lifecycleSafe,
      detail: `${snapshot.knownJobIdsAbsentFromDataset?.length ?? 0} absent known IDs remain non-authoritative.`
    },
    {
      id: "daily-email-recipient-and-authority-are-governed",
      pass: deliverySafe,
      detail: `${config.delivery?.recipient ?? "missing"}; applications remain with ${config.delivery?.applicationAuthority ?? "missing"}.`
    },
    {
      id: "snapshot-counts-are-coherent",
      pass: countsCoherent,
      detail: JSON.stringify(snapshot.census)
    },
    {
      id: "evaluation-date-is-explicit",
      pass: /^\d{4}-\d{2}-\d{2}$/.test(asOf),
      detail: asOf
    }
  ];
  return { pass: checks.every((check) => check.pass), checks };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const config = JSON.parse(readFileSync(path.join(repoRoot, "data/opportunities/nyc-jobs-monitor.json"), "utf8"));
  const snapshot = JSON.parse(readFileSync(path.join(repoRoot, config.snapshotPath), "utf8"));
  const lifecycle = JSON.parse(readFileSync(path.join(repoRoot, config.lifecyclePath), "utf8"));
  const asOf = process.env.NYC_JOBS_AS_OF ?? new Date().toISOString().slice(0, 10);
  const result = evaluateOpportunityMonitor({ config, snapshot, lifecycle, asOf });
  console.log(JSON.stringify(result, null, 2));
  if (!result.pass) process.exitCode = 1;
}
