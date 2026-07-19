import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const statusPath = "docs/evals/blind-spot-human-status.json";
const requiredEvidencePaths = [
  "docs/evals/hiring-reader-response-loop.md",
  "docs/evals/human-launch-qa.md",
  "docs/evals/collaborator-corroboration.md",
  "docs/evals/outcome-transfer-matrix.md",
  "docs/evals/visual-proof-inventory.md",
  "docs/evals/recent-capability-map.md"
];

export function validateBlindSpotEvidence(status, fileExists = existsSync) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(status?.version === 1, "human status version must be 1");
  const allowedStatuses = new Set([
    "pending-human-review",
    "approved",
    "rejected",
    "expired"
  ]);
  for (const path of requiredEvidencePaths) {
    requireValue(fileExists(path), `required blind-spot evidence is missing: ${path}`);
  }

  for (const id of ["PR-019", "PR-025"]) {
    const record = status?.evals?.[id];
    requireValue(Boolean(record), `${id} human status is required`);
    requireValue(
      allowedStatuses.has(record?.status),
      `${id} status must be pending-human-review, approved, rejected, or expired`
    );
    requireValue(Array.isArray(record?.reviewers), `${id} reviewers must be an array`);
    requireValue(
      Array.isArray(record?.evidencePaths) && record.evidencePaths.length > 0,
      `${id} evidencePaths must be non-empty`
    );
    for (const path of record?.evidencePaths ?? []) {
      requireValue(fileExists(path), `${id} evidence path is missing: ${path}`);
    }

    if (record?.status === "approved") {
      requireValue(
        typeof record.candidateSha === "string" && /^[a-f0-9]{40}$/.test(record.candidateSha),
        `${id} approved requires an exact 40-character candidate SHA`
      );
      requireValue(
        typeof record.reviewedAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(record.reviewedAt),
        `${id} approved requires a review date`
      );
      const minimumReviewers = id === "PR-019" ? 3 : 2;
      requireValue(
        record.reviewers.length >= minimumReviewers,
        `${id} approved requires at least ${minimumReviewers} independent reviewers`
      );
      requireValue(!record.blockingReason, `${id} approved cannot retain a blocking reason`);
    } else if (record?.status === "pending-human-review") {
      requireValue(
        typeof record?.blockingReason === "string" && record.blockingReason.length > 0,
        `${id} pending status requires a blocking reason`
      );
      requireValue(record.candidateSha === null, `${id} pending status cannot claim a candidate review`);
      requireValue(record.reviewedAt === null, `${id} pending status cannot claim a review date`);
      requireValue(record.reviewers.length === 0, `${id} pending status cannot claim reviewers`);
    } else if (record) {
      requireValue(
        typeof record.candidateSha === "string" && /^[a-f0-9]{40}$/.test(record.candidateSha),
        `${id} ${record.status} requires an exact 40-character candidate SHA`
      );
      requireValue(
        typeof record.reviewedAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(record.reviewedAt),
        `${id} ${record.status} requires a review date`
      );
      requireValue(record.reviewers.length > 0, `${id} ${record.status} requires a human reviewer`);
      requireValue(
        typeof record.blockingReason === "string" && record.blockingReason.length > 0,
        `${id} ${record.status} requires a reason`
      );
    }
  }

  return { errors };
}

function run() {
  const status = JSON.parse(readFileSync(statusPath, "utf8"));
  const result = validateBlindSpotEvidence(status);
  if (result.errors.length) {
    console.error("Blind-spot evidence check failed:");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }

  const pending = Object.entries(status.evals)
    .filter(([, record]) => record.status !== "approved")
    .map(([id]) => id);
  console.log(
    `Blind-spot evidence is structurally valid; human review pending for ${pending.join(", ")}.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
