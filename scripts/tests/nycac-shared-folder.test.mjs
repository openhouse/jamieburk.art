import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { evaluateNycacSharedFolder } from "../lib/nycac-shared-folder-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function loadCensus() {
  return JSON.parse(readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/data/nycac-shared-folder-census-2026-07-19.json"),
    "utf8"
  ));
}

test("NYCAC shared-folder eval accepts the governed candidate", () => {
  const result = evaluateNycacSharedFolder();
  assert.equal(result.pass, true);
  assert.equal(result.passedPoints, 100);
  assert.equal(result.totalPoints, 100);
});

test("population and disposition controls reject numeric mutations", () => {
  const mutations = [
    (copy) => { copy.populationReconciliation.rootItems = 60; },
    (copy) => { copy.populationReconciliation.populationTotal = 2406; },
    (copy) => { copy.populationReconciliation.classifiedTotal = 2404; },
    (copy) => { copy.primaryDispositionCounts["document-review-deferred"] = 337; },
    (copy) => { copy.priorityReview.documents = 64; },
    (copy) => { copy.priorityReview.characters = 351533; }
  ];

  for (const mutate of mutations) {
    const census = loadCensus();
    mutate(census);
    assert.equal(evaluateNycacSharedFolder({ census }).pass, false);
  }
});

test("protected sources reject URL exposure and public preservation", () => {
  const sources = structuredClone(knowledgeBank.sources);
  const source = sources.find((item) => item.id === "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026");
  source.visibility = "public";
  source.preservationStatus = "public";
  source.canonicalUrl = "https://example.com/protected-source";
  assert.equal(evaluateNycacSharedFolder({ sources }).pass, false);
});

test("public artifacts reject structural private-locator leakage", () => {
  assert.equal(evaluateNycacSharedFolder({
    publicCorpus: "Authenticated source https://drive.google.com/example"
  }).pass, false);
  assert.equal(evaluateNycacSharedFolder({
    publicCorpus: "Protected export under /Users/example/archive"
  }).pass, false);
});

test("governed claims reject automatic projection and missing collective credit", () => {
  const activeClaims = structuredClone(knowledgeBank.claims);
  const archiveClaim = activeClaims.find((item) =>
    item.id === "CLM-NYCAC-SHARED-FOLDER-ARCHIVAL-COVERAGE-2026"
  );
  archiveClaim.projections[0].status = "active";
  archiveClaim.projections[0].surfaces = ["case-study"];
  assert.equal(evaluateNycacSharedFolder({ claims: activeClaims }).pass, false);

  const soloClaims = structuredClone(knowledgeBank.claims);
  const playbookClaim = soloClaims.find((item) =>
    item.id === "CLM-NYCAC-ADVOCACY-OPERATING-PLAYBOOK-2017"
  );
  playbookClaim.internalClaim = "Jamie solely authored the coalition method.";
  assert.equal(evaluateNycacSharedFolder({ claims: soloClaims }).pass, false);
});

test("human review language cannot be converted into automated completion", () => {
  const evaluationRecord = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/evaluations/nycac-shared-folder-production-2026-07-19.md"),
    "utf8"
  ).replace("Those gates remain open", "Those gates are complete");
  assert.equal(evaluateNycacSharedFolder({ evaluationRecord }).pass, false);
});
