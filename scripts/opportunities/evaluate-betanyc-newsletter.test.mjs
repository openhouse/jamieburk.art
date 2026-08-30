import assert from "node:assert/strict";
import test from "node:test";

import { evaluateBetaNycMonitor } from "./evaluate-betanyc-newsletter.mjs";

const config = {
  sourceId: "source.betanyc.civic-tech-newsletter",
  maximumAgeDays: 9,
  strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
  automaticDisposition: "provisional-intake-only",
  applicationAuthority: "Jamie Burkart",
  evaluation: {
    stages: [
      "source-identity-and-freshness",
      "official-url-resolution-and-deduplication",
      "eligibility-salary-deadline-and-credential-screens",
      "deterministic-fit-and-secure-score",
      "named-reader-llm",
      "human-canonical-and-application-review"
    ],
    llmGate: "new-verified-strong-matches-only"
  }
};

const registry = {
  sources: [
    {
      id: "source.betanyc.civic-tech-newsletter",
      sourceType: "editorially-curated-recurring-newsletter",
      affordances: ["recurring-public-archive", "editorially-curated-job-leads", "civic-ecosystem-context"],
      boundaries: ["official-employer-posting-controls", "application-submission-remains-human"]
    }
  ]
};

const snapshot = {
  source: {
    id: "source.betanyc.civic-tech-newsletter",
    publishedAt: "2026-08-20T18:39:02Z",
    issueUrl: "https://www.beta.nyc/2026/08/20/this-week-in-nycs-civictech-august-20-2026/"
  },
  policy: {
    strongMatchThreshold: { composite: 78, fit: 75, secure: 65 },
    automaticDisposition: "provisional-intake-only",
    officialPostingControls: true,
    applicationAuthority: "Jamie Burkart"
  },
  census: { discoveredLeads: 2, provisionalStrongMatches: 1 },
  provisionalStrongMatches: [
    {
      jobId: "792925",
      officialUrl: "https://cityjobs.nyc.gov/job/example",
      fitScore: 82,
      secureScore: 85,
      compositeScore: 83.35,
      qualificationReview: "human-review-required",
      automaticDisposition: "provisional-intake-only"
    }
  ],
  leads: [
    { disposition: "provisional-strong-match", cityJobId: "792925" },
    { disposition: "official-verification-required" }
  ]
};

const scheduledWorkflow = `on:\n  schedule:\n    - cron: "17 13 * * *"\npermissions:\n  contents: read\nsteps:\n  - run: npm run opportunities:betanyc:daily`;

test("BetaNYC eval passes only when freshness, staged cost controls, provisional intake, and daily review hold", () => {
  const result = evaluateBetaNycMonitor({ config, registry, snapshot, workflow: scheduledWorkflow, asOf: "2026-08-20" });
  assert.equal(result.pass, true);
  assert.ok(result.checks.every((check) => check.pass));
});

test("BetaNYC eval fails closed on unreviewed leads or absent recurring schedule", () => {
  const result = evaluateBetaNycMonitor({
    config,
    registry,
    snapshot: { ...snapshot, leads: [{ title: "Unclassified lead" }] },
    workflow: "on: workflow_dispatch",
    asOf: "2026-08-20"
  });
  assert.equal(result.pass, false);
  assert.equal(result.checks.find((check) => check.id === "every-lead-has-a-disposition").pass, false);
  assert.equal(result.checks.find((check) => check.id === "daily-read-only-review-is-configured").pass, false);
});
