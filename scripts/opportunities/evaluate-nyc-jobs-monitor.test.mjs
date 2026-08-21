import assert from "node:assert/strict";
import test from "node:test";

import { evaluateOpportunityMonitor } from "./evaluate-nyc-jobs-monitor.mjs";

const config = {
  datasetId: "pda4-rgn4",
  rowsUpdatedAt: 1787079680,
  rowsUpdatedAtIso: "2026-08-18T19:01:20.000Z",
  strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
  evaluation: {
    stages: ["source-integrity", "eligibility", "deterministic-score", "named-reader-llm", "human-application"],
    llmGate: "new-strong-matches-only"
  },
  delivery: {
    provider: "resend",
    recipient: "jamie@ohai.us",
    credentialEnvironmentVariables: ["RESEND_API_KEY", "JOB_DIGEST_FROM", "JOB_DIGEST_TO"],
    applicationAuthority: "Jamie Burkart"
  }
};

const snapshot = {
  dataset: { id: "pda4-rgn4", rowsUpdatedAt: 1787079680, rowsUpdatedAtIso: "2026-08-18T19:01:20.000Z" },
  policy: {
    salaryTarget: 100000,
    strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
    automaticDisposition: "provisional-intake-only"
  },
  census: { sourceRows: 10, uniqueJobIds: 5, deterministicallyEligible: 2, strongMatches: 1 },
  newStrongMatches: [
    {
      jobId: "900001",
      title: "Product Manager",
      deadline: "2026-09-30",
      fitScore: 90,
      secureScore: 80,
      compositeScore: 85.5,
      qualificationReview: "human-review-required"
    }
  ],
  knownStrongMatches: [],
  knownJobIdsAbsentFromDataset: ["782366"]
};

const lifecycle = {
  opportunities: [
    {
      opportunityId: "opportunity.nyc-oti.senior-product-manager.782366",
      title: "Active Senior Product Manager",
      considered: true,
      postingState: "open",
      closesOn: "2026-10-16",
      applicationState: "submitted",
      outcomeState: "pending",
      eligibilityState: "review-needed",
      fitScore: 97,
      officialSource: "https://cityjobs.nyc.gov/job/example"
    }
  ]
};

test("monitor evaluator passes a current source, thresholded provisional intake, and exact recipient", () => {
  const result = evaluateOpportunityMonitor({ config, snapshot, lifecycle, asOf: "2026-08-20" });
  assert.equal(result.pass, true);
  assert.equal(result.checks.every((check) => check.pass), true);
});

test("monitor evaluator rejects a below-threshold automatic intake record", () => {
  const badSnapshot = {
    ...snapshot,
    newStrongMatches: [{ ...snapshot.newStrongMatches[0], fitScore: 74, compositeScore: 76 }]
  };
  const result = evaluateOpportunityMonitor({ config, snapshot: badSnapshot, lifecycle, asOf: "2026-08-20" });
  assert.equal(result.pass, false);
  assert.equal(result.checks.find((check) => check.id === "strong-match-thresholds-hold").pass, false);
});

test("monitor evaluator rejects source-state drift and any automatic lifecycle closure", () => {
  const badSnapshot = {
    ...snapshot,
    dataset: { ...snapshot.dataset, rowsUpdatedAt: 1787079681 },
    lifecycleMutations: [{ opportunityId: "opportunity.nyc-oti.senior-product-manager.782366", postingState: "closed" }]
  };
  const result = evaluateOpportunityMonitor({ config, snapshot: badSnapshot, lifecycle, asOf: "2026-08-20" });
  assert.equal(result.pass, false);
  assert.equal(result.checks.find((check) => check.id === "feed-absence-cannot-change-lifecycle").pass, false);
});
