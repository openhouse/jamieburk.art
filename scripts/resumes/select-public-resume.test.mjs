import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { selectPublicResume } from "./select-public-resume.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const base = JSON.parse(readFileSync(path.join(repoRoot, "evals/resumes/public-resume-selection.json"), "utf8"));

function clone(value) {
  return structuredClone(value);
}

test("current public resume selects only the submitted-pending PIT Crew application", () => {
  const result = selectPublicResume({ root: repoRoot });
  assert.equal(result.overall, "pass", JSON.stringify(result.deterministicChecks, null, 2));
  assert.equal(result.selection.tier, "submitted-active");
  assert.deepEqual(result.selection.opportunityIds, ["opportunity.nyc-oti.senior-product-manager.782366"]);
  assert.equal(result.llmPlan.plannedCallCount, 2);
  assert.equal(result.llmPlan.status, "eligible");
});

test("multiple pending applications select their union before open opportunities", () => {
  const config = clone(base);
  const speed = config.opportunities.find((entry) => entry.opportunityId.includes("789610"));
  speed.applicationState = "submitted";
  speed.outcomeState = "pending";
  const result = selectPublicResume({ config, enforceExpected: false, skipArtifactChecks: true });
  assert.equal(result.selection.tier, "submitted-active");
  assert.deepEqual(new Set(result.selection.opportunityIds), new Set([
    "opportunity.nyc-oti.senior-product-manager.782366",
    "opportunity.nyc-oti.speed-senior-product-manager.789610"
  ]));
});

test("when no application is pending, every fresh open unapplied eligible opportunity is selected", () => {
  const config = clone(base);
  const pit = config.opportunities.find((entry) => entry.opportunityId.endsWith("782366"));
  pit.applicationState = "rejected";
  pit.outcomeState = "negative";
  const result = selectPublicResume({ config, enforceExpected: false, skipArtifactChecks: true });
  assert.equal(result.selection.tier, "open-unapplied");
  assert.ok(result.selection.opportunityIds.includes("opportunity.nyc-oti.speed-operations-manager.789810"));
  assert.ok(result.selection.opportunityIds.includes("opportunity.codepath.engineering-project-manager.5160542007"));
  assert.ok(!result.selection.opportunityIds.includes("opportunity.uibk.studio3.postdoc.arch-15927"));
});

test("when no current opening or application exists, selection falls back to the top quarter", () => {
  const config = clone(base);
  for (const entry of config.opportunities) {
    if (entry.applicationState === "submitted") {
      entry.applicationState = "rejected";
      entry.outcomeState = "negative";
    }
    entry.postingState = "expired";
  }
  const eligibleCount = config.opportunities.filter((entry) => ["clear", "review-needed"].includes(entry.eligibilityState)).length;
  const result = selectPublicResume({ config, asOf: "2027-01-01", enforceExpected: false, skipArtifactChecks: true });
  assert.equal(result.selection.tier, "historical-top-quartile");
  assert.equal(result.selection.opportunityIds.length, Math.ceil(eligibleCount * 0.25));
  assert.equal(result.selection.opportunityIds[0], "opportunity.nyc-oti.senior-product-manager.782366");
});

test("unknown eligibility and stale undated openings fail before any model call", () => {
  const config = clone(base);
  const pit = config.opportunities.find((entry) => entry.opportunityId.endsWith("782366"));
  pit.applicationState = "rejected";
  pit.outcomeState = "negative";
  const codepath = config.opportunities.find((entry) => entry.opportunityId.includes("codepath.engineering"));
  codepath.lastVerifiedAt = "2026-07-01";
  const aclu = config.opportunities.find((entry) => entry.opportunityId.includes("aclu.senior"));
  aclu.eligibilityState = "unknown";
  const result = selectPublicResume({ config, enforceExpected: false, skipArtifactChecks: true });
  assert.equal(result.overall, "fail");
  assert.equal(result.llmPlan.status, "blocked");
  assert.equal(result.llmPlan.plannedCallCount, 0);
  assert.match(JSON.stringify(result.deterministicChecks), /stale-undated-open-verification/);
  assert.match(JSON.stringify(result.deterministicChecks), /unknown-eligibility/);
});

test("an open state past its deadline fails closed", () => {
  const config = clone(base);
  const pit = config.opportunities.find((entry) => entry.opportunityId.endsWith("782366"));
  pit.applicationState = "rejected";
  pit.outcomeState = "negative";
  const product = config.opportunities.find((entry) => entry.opportunityId.endsWith("784450"));
  product.closesOn = "2026-08-19";
  const result = selectPublicResume({ config, enforceExpected: false, skipArtifactChecks: true });
  assert.equal(result.llmPlan.status, "blocked");
  assert.match(JSON.stringify(result.deterministicChecks), /open-state-past-deadline/);
});

test("the installed public PDF is byte-identical to the selected role PDF", () => {
  const result = selectPublicResume({ root: repoRoot });
  assert.equal(result.publicArtifact.pdfSha256, result.publicArtifact.publicInstallSha256);
  const exactSourceCheck = result.deterministicChecks.find((entry) => entry.id === "single-opportunity-public-source-is-exact");
  assert.equal(exactSourceCheck.pass, true);
});
