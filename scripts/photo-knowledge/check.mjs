#!/usr/bin/env node

import { checkPhotoReports, evaluatePhotoKnowledge } from "./lib.mjs";

const evaluation = evaluatePhotoKnowledge();
for (const [criterion, passed] of Object.entries(evaluation.checks)) {
  console.log(`${passed ? "PASS" : "FAIL"} ${criterion}`);
}

if (!evaluation.passed) {
  console.error(
    `Photo knowledge check failed: ${evaluation.failures.join(", ")}`
  );
  process.exit(1);
}

if (!process.argv.includes("--manifest-only")) {
  const staleReports = checkPhotoReports();
  if (staleReports.length) {
    console.error(
      `Photo knowledge reports are stale or missing: ${staleReports.join(", ")}`
    );
    console.error("Run npm run photos:report.");
    process.exit(1);
  }
}

console.log(
  `Photo knowledge check passed: ${evaluation.counts.photos} photos, ${evaluation.counts.placements} placements, ${evaluation.counts.blockingCriteria} blocking criteria; production and indexing remain open.`
);
