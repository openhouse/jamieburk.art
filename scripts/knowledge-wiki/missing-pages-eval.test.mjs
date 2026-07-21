import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot, wikiRecordSchema } from "./lib.mjs";
import { evaluateMissingPages } from "./missing-pages-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

test("living archive and source-return baseline passes", () => {
  const evaluation = evaluateMissingPages({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.counts.priorityRecords, 32);
  assert.equal(evaluation.counts.sourceEncounterTargets, 8);
});

test("a missing priority page fails", () => {
  const evaluation = evaluateMissingPages({
    result,
    recordOverrides: { "person.jamie-burkart": null }
  });
  assert.equal(evaluation.checks.priority_missing_pages_materialized, false);
});

test("research permission cannot become publication authority", () => {
  const run = cloneRecord("research.foundational-source-return.2026-07-19");
  run.source_encounter.publication_authority = "research-authorization";
  const evaluation = evaluateMissingPages({
    result,
    recordOverrides: { [run.id]: run }
  });
  assert.equal(evaluation.checks.research_authority_not_publication, false);
});

test("the record contract rejects substituted publication authority", () => {
  const run = cloneRecord("research.foundational-source-return.2026-07-19");
  run.source_encounter.publication_authority = "research-authorization";
  assert.equal(wikiRecordSchema.safeParse(run).success, false);
});

test("changed interpretation is required", () => {
  const run = cloneRecord("research.foundational-source-return.2026-07-19");
  run.source_encounter.changed_interpretations = [];
  const evaluation = evaluateMissingPages({
    result,
    recordOverrides: { [run.id]: run }
  });
  assert.equal(evaluation.checks.prior_readings_and_changes_preserved, false);
});

test("librarian requests cannot disappear", () => {
  const run = cloneRecord("research.foundational-source-return.2026-07-19");
  run.source_encounter.librarian_requests = [];
  const evaluation = evaluateMissingPages({
    result,
    recordOverrides: { [run.id]: run }
  });
  assert.equal(evaluation.checks.librarian_requests_actionable, false);
});

test("an unresolved contradiction requires an inquiry", () => {
  const evaluation = evaluateMissingPages({
    result,
    recordOverrides: { "research-inquiry.ucsc-installation-title": null }
  });
  assert.equal(evaluation.checks.contradictions_remain_open, false);
});

test("the role-fit map cannot activate itself", () => {
  const projection = cloneRecord("portfolio.role-fit-referral-map");
  projection.projection_status = "active";
  projection.projection = { status: "active", surfaces: ["/about"] };
  const evaluation = evaluateMissingPages({
    result,
    recordOverrides: { [projection.id]: projection }
  });
  assert.equal(evaluation.checks.public_projection_still_selective, false);
});

test("a protected source path fails the public-safe metadata boundary", () => {
  const id = "source.ucsc.narrative-evaluations.2004-2006";
  const original = readFileSync(
    path.join(
      defaultRepoRoot,
      "docs/knowledge-bank/sources/ucsc-narrative-evaluations-2004-2006.md"
    ),
    "utf8"
  );
  const evaluation = evaluateMissingPages({
    result,
    sourceOverrides: { [id]: `${original}\n/Users/example/protected-source.txt\n` }
  });
  assert.equal(evaluation.checks.protected_sources_metadata_only, false);
});
