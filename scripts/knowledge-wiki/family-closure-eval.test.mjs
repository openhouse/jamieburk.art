import assert from "node:assert/strict";
import test from "node:test";

import { compileWiki } from "./lib.mjs";
import { evaluateFamilyClosure } from "./family-closure-eval.mjs";

const result = compileWiki();
const baseline = evaluateFamilyClosure({ result });

function cloneClosure() {
  return structuredClone(
    JSON.parse(
      // The baseline evaluator intentionally exposes only results, so load through a clean eval mutation.
      requireJson("docs/integration/knowledge-wiki-family-closure.json")
    )
  );
}

function cloneCensus() {
  return structuredClone(
    JSON.parse(
      requireJson("docs/knowledge-bank/data/knowledge-wiki-family-census-reconciliation.json")
    )
  );
}

function requireJson(relativePath) {
  const item = process.getBuiltinModule("fs").readFileSync(
    new URL(`../../${relativePath}`, import.meta.url),
    "utf8"
  );
  return item;
}

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

test("family closure baseline passes", () => {
  assert.deepEqual(baseline.failures, []);
  assert.equal(baseline.counts.donors, 5);
  assert.equal(baseline.counts.selectedRecords, 13);
});

test("a donor SHA cannot drift", () => {
  const closure = cloneClosure();
  closure.frozenDonors[0].sha = "0".repeat(40);
  const evaluation = evaluateFamilyClosure({ result, closure });
  assert.equal(evaluation.checks.frozen_heads_exact, false);
});

test("a parallel Wiki root cannot return", () => {
  const evaluation = evaluateFamilyClosure({
    result,
    pathExists: (relativePath) =>
      relativePath === "docs/knowledge-wiki" ? true : true
  });
  assert.equal(evaluation.checks.one_canonical_architecture, false);
});

test("a missing donor destination fails closure", () => {
  const evaluation = evaluateFamilyClosure({
    result,
    pathExists: (relativePath) =>
      relativePath !== "docs/knowledge-bank/indexes/canonical-story-bank.md"
  });
  assert.equal(evaluation.checks.every_donor_has_materialized_destination, false);
});

test("conflicting census values cannot become a universal metric", () => {
  const census = cloneCensus();
  census.universalMetricStatus = "selected";
  const evaluation = evaluateFamilyClosure({ result, census });
  assert.equal(evaluation.checks.census_conflict_preserved, false);
});

test("census observations cannot be silently normalized", () => {
  const census = cloneCensus();
  for (const observation of census.observations) observation.population = 2405;
  const evaluation = evaluateFamilyClosure({ result, census });
  assert.equal(evaluation.checks.census_conflict_preserved, false);
});

test("the first-person stakes page cannot activate itself", () => {
  const stakes = cloneRecord("method.what-is-at-stake-for-me");
  stakes.human_review = "resolved";
  stakes.projection_status = "active";
  stakes.projection = { status: "active", surfaces: ["/about"] };
  const evaluation = evaluateFamilyClosure({
    result,
    recordOverrides: { [stakes.id]: stakes }
  });
  assert.equal(evaluation.checks.personal_stakes_remains_human_gated, false);
  assert.equal(evaluation.checks.no_public_wiki_or_proofs_route, false);
});

test("a public proofs route fails the release boundary", () => {
  const evaluation = evaluateFamilyClosure({
    result,
    routePaths: ["apps/www/src/app/proofs"],
    pathExists: (relativePath) => relativePath === "apps/www/src/app/proofs"
  });
  assert.equal(evaluation.checks.no_public_wiki_or_proofs_route, false);
});

test("visual evidence cannot skip rights sequencing", () => {
  const evaluation = evaluateFamilyClosure({
    result,
    sourceOverrides: { "index.knowledge-wiki.visual-evidence": "# Visual evidence" }
  });
  assert.equal(evaluation.checks.visual_rights_sequence_complete, false);
});
