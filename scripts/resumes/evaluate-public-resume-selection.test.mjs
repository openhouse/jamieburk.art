import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluatePublicResumeSelection } from "./evaluate-public-resume-selection.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/resumes/public-resume-selection.json"), "utf8")
);

function opportunityText(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("current state selects the four fresh and open OTI product and operations roles", () => {
  const result = evaluatePublicResumeSelection();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.selectedTier, "open-opportunities");
  assert.deepEqual(result.selectedOpportunityIds, [
    "opportunity.nyc-oti.operations-manager-speed.789810",
    "opportunity.nyc-oti.product-manager.784450",
    "opportunity.nyc-oti.senior-product-manager-speed.789610",
    "opportunity.nyc-oti.senior-product-manager.782366"
  ]);
  assert.equal(result.llmGate.allowed, true);
  assert.equal(result.llmGate.queuedCalls, 8);
  assert.ok(result.llmGate.avoidedCalls > 0);
});

test("one active application takes precedence over all open postings", () => {
  const pit = config.candidates.find((candidate) =>
    candidate.opportunityId === "opportunity.nyc-oti.senior-product-manager.782366"
  );
  const original = opportunityText(pit.opportunityPath);
  const result = evaluatePublicResumeSelection({
    opportunityOverrides: {
      [pit.opportunityPath]: original.replace("application_status: not-recorded", "application_status: submitted")
    }
  });
  assert.equal(result.selectedTier, "active-applications");
  assert.deepEqual(result.selectedOpportunityIds, [pit.opportunityId]);
  assert.equal(result.selectedResumePath, "resumes/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.md");
  assert.equal(result.overall, "fail", "The selected source changes before the stable site PDF is rebound.");
  assert.equal(result.llmGate.queuedCalls, 0);
  assert.equal(result.deterministicChecks.resumeSetBound, false);
});

test("a stale review or elapsed closing date prevents an open role from consuming reader calls", () => {
  const role = config.candidates.find((candidate) =>
    candidate.opportunityId === "opportunity.nyc-oti.product-manager.784450"
  );
  const original = opportunityText(role.opportunityPath);
  const result = evaluatePublicResumeSelection({
    opportunityOverrides: {
      [role.opportunityPath]: original
        .replace("review_by: 2026-08-27", "review_by: 2026-08-19")
        .replace("posted_until: 2026-09-04", "posted_until: 2026-08-19")
    }
  });
  const candidate = result.candidateResults.find((entry) => entry.opportunityId === role.opportunityId);
  assert.equal(candidate.openOpportunity, false);
  assert.equal(result.llmGate.queue.some((entry) => entry.opportunityId === role.opportunityId), false);
  assert.equal(result.overall, "fail", "An undeclared three-role resume set must fail closed.");
  assert.equal(result.llmGate.allowed, false);
  assert.equal(result.llmGate.queuedCalls, 0);
});

test("no active or open roles selects the top quarter of the complete historical ranking", () => {
  const overrides = Object.fromEntries(
    config.candidates.map((candidate) => {
      const original = opportunityText(candidate.opportunityPath);
      const withStatus = /^opportunity_status:/m.test(original)
        ? original.replace(/^opportunity_status:.+$/m, "opportunity_status: closed")
        : original;
      return [candidate.opportunityPath, withStatus.replace(/^application_status:.+$/m, "application_status: not-recorded")];
    })
  );
  const fallbackConfig = structuredClone(config);
  const historicalIds = [...fallbackConfig.candidates]
    .sort((a, b) => a.historicalFitRank - b.historicalFitRank)
    .slice(0, Math.ceil(fallbackConfig.candidates.length * 0.25))
    .map((candidate) => candidate.opportunityId)
    .sort();
  const result = evaluatePublicResumeSelection({ config: fallbackConfig, opportunityOverrides: overrides });
  assert.equal(result.selectedTier, "historical-top-quarter");
  assert.equal(result.selectedOpportunityIds.length, 4);
  assert.deepEqual(result.selectedOpportunityIds, historicalIds);
  assert.equal(result.selectedScope, "Top-quarter historical fallback across the complete ranked opportunity set");
  assert.equal(result.overall, "pass");
});

test("a missing exact resume-set binding blocks every modeled reader call", () => {
  const mutated = structuredClone(config);
  mutated.resumeSets = [];
  const result = evaluatePublicResumeSelection({ config: mutated });
  assert.equal(result.overall, "fail");
  assert.equal(result.llmGate.allowed, false);
  assert.deepEqual(result.llmGate.queue, []);
});
