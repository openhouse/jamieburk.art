import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateIntegration,
  lockedSources
} from "../pre-launch/check-integration-lineage.mjs";

const manifest = JSON.parse(readFileSync("evals/pre-launch/integration-C.json", "utf8"));
const allAncestors = () => true;
const allPaths = () => true;
const oneCanonicalRfc = ["0004-jamie-burkart-sourcebook-and-knowledge-ecosystem.md"];

function evaluate(candidate) {
  return evaluateIntegration(candidate, {
    isAncestor: allAncestors,
    pathExists: allPaths,
    activeRfcNames: oneCanonicalRfc
  });
}

test("the exact integration candidate passes its pure contract", () => {
  const result = evaluate(manifest);
  assert.equal(result.passed, true);
  assert.equal(Object.keys(result.checks).length, 7);
});

test("omitting a reviewed sibling fails the population lock", () => {
  const candidate = structuredClone(manifest);
  candidate.sources = candidate.sources.filter((source) => source.branch !== "feature/pre-launch-E");
  assert.equal(evaluate(candidate).checks.exact_source_population_and_heads, false);
});

test("a fabricated or stale source head fails closed", () => {
  const candidate = structuredClone(manifest);
  candidate.sources[0].head = "0000000000000000000000000000000000000000";
  assert.equal(evaluate(candidate).checks.exact_source_population_and_heads, false);
});

test("a reviewed sibling cannot be relabeled as a substantive merge", () => {
  const candidate = structuredClone(manifest);
  candidate.sources.find((source) => source.branch === "feature/pre-launch-D").mode = "substantive-merge";
  assert.equal(evaluate(candidate).checks.exact_source_population_and_heads, false);
});

test("the product base cannot drift from the exact C head", () => {
  const candidate = structuredClone(manifest);
  candidate.productBase.branch = "feature/pre-launch-A";
  assert.equal(evaluate(candidate).checks.feature_pre_launch_c_is_the_exact_product_base, false);
});

test("every frozen source must be an ancestor of the candidate", () => {
  const blockedHead = lockedSources.get("feature/professional-record-C")[0];
  const result = evaluateIntegration(manifest, {
    isAncestor: (head) => head !== blockedHead,
    pathExists: allPaths,
    activeRfcNames: oneCanonicalRfc
  });
  assert.equal(result.checks.every_frozen_head_is_reachable_from_the_candidate, false);
});

test("missing integrated material fails closed", () => {
  const result = evaluateIntegration(manifest, {
    isAncestor: allAncestors,
    pathExists: (relativePath) => relativePath !== "sourcebook/catalog.json",
    activeRfcNames: oneCanonicalRfc
  });
  assert.equal(result.checks.integrated_capabilities_are_materialized, false);
});

test("two active RFC 0004 files are rejected", () => {
  const result = evaluateIntegration(manifest, {
    isAncestor: allAncestors,
    pathExists: allPaths,
    activeRfcNames: [
      "0004-jamie-burkart-sourcebook-and-knowledge-ecosystem.md",
      "0004-conflicting-authority.md"
    ]
  });
  assert.equal(result.checks.one_canonical_rfc_preserves_both_historical_snapshots, false);
});

test("publication, indexing, rights, and semantic review gates cannot self-close", () => {
  const candidate = structuredClone(manifest);
  candidate.humanGates.productionApproval = "approved";
  candidate.humanGates.productionIndexing = "authorized";
  candidate.humanGates.photoRightsAndConsent = "passed-by-agent";
  candidate.humanGates.candidateBoundSemanticReview = "reuse-prior-receipts";
  assert.equal(evaluate(candidate).checks.human_release_authority_remains_open, false);
});

test("the public composition decision cannot silently become a branch mashup", () => {
  const candidate = structuredClone(manifest);
  candidate.publicSurfaceDecision = "Combine every page and generated artifact from every branch.";
  assert.equal(evaluate(candidate).checks.public_composition_decision_is_bounded_and_explicit, false);
});
