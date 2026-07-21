import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot, wikiRecordSchema } from "./lib.mjs";
import { evaluateInterpretiveLayer } from "./interpretive-layer-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function sourceFor(id) {
  const item = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, item.path), "utf8");
}

test("interpretive layer baseline passes", () => {
  const evaluation = evaluateInterpretiveLayer({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    requiredRecords: 19,
    decisionRecords: 6,
    sourceEncounterTargets: 13,
    protectedSourceTargets: 7
  });
});

test("a missing interpretive record fails materialization", () => {
  const evaluation = evaluateInterpretiveLayer({
    result,
    recordOverrides: { "index.knowledge-wiki.pressures": null }
  });
  assert.equal(evaluation.checks.interpretive_records_materialized, false);
});

test("pressure framing cannot turn people and places into deficits", () => {
  const id = "index.knowledge-wiki.pressures";
  const mutated = sourceFor(id).replace(
    /People and places\s+were holders of knowledge and agency/,
    "People and places were obstacles to delivery"
  );
  const evaluation = evaluateInterpretiveLayer({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.pressures_precede_responses_without_deficit, false);
});

test("people and place cannot become a private relationship directory", () => {
  const id = "index.knowledge-wiki.people-places-work";
  const mutated = sourceFor(id).replace(
    /not a collaborator directory, private\s+relationship map/,
    "a collaborator directory and private relationship map"
  );
  const evaluation = evaluateInterpretiveLayer({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.people_places_collective_credit_bounded, false);
});

test("lineage cannot become retrospective inevitability", () => {
  const id = "index.knowledge-wiki.project-lineages";
  const mutated = sourceFor(id).replace(
    /not a\s+claim that every later project was predetermined/,
    "a claim that every later project was predetermined"
  );
  const evaluation = evaluateInterpretiveLayer({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.project_lineages_not_teleology, false);
});

test("a decision requires one chosen option and observed boundaries", () => {
  const decision = cloneRecord("decision.callnyc.issue-pathways");
  decision.options_considered = decision.options_considered.filter(
    (option) => option.disposition !== "chosen"
  );
  const evaluation = evaluateInterpretiveLayer({
    result,
    recordOverrides: { [decision.id]: decision }
  });
  assert.equal(evaluation.checks.decision_contract_complete, false);
  assert.equal(wikiRecordSchema.safeParse(decision).success, false);
});

test("a decision cannot activate itself on the portfolio", () => {
  const decision = cloneRecord("decision.hje.continuity-modernization");
  decision.projection = { status: "active", surfaces: ["/work/harry-j-epstein"] };
  const evaluation = evaluateInterpretiveLayer({
    result,
    recordOverrides: { [decision.id]: decision }
  });
  assert.equal(evaluation.checks.decision_credit_and_projection_bounded, false);
  assert.equal(wikiRecordSchema.safeParse(decision).success, false);
});

test("a collective decision cannot silently become individual credit", () => {
  const decision = cloneRecord("decision.open-house.communal-governance");
  decision.credit_scope = "individual";
  const evaluation = evaluateInterpretiveLayer({
    result,
    recordOverrides: { [decision.id]: decision }
  });
  assert.equal(evaluation.checks.decision_credit_and_projection_bounded, false);
});

test("the interpretive source return requires changed readings", () => {
  const run = cloneRecord("research.interpretive-layer-source-return.2026-07-19");
  run.source_encounter.changed_interpretations = [];
  const evaluation = evaluateInterpretiveLayer({
    result,
    recordOverrides: { [run.id]: run }
  });
  assert.equal(evaluation.checks.interpretive_source_return_current, false);
});

test("the recovered Council source must remain canonical and official", () => {
  const source = cloneRecord("source.councilstat.fuller-release.2016");
  source.canonical_url = "https://example.com/secondary-summary";
  const evaluation = evaluateInterpretiveLayer({
    result,
    recordOverrides: { [source.id]: source }
  });
  assert.equal(evaluation.checks.councilstat_source_gap_closed, false);
});

test("interpretive records cannot enter the public registry implicitly", () => {
  const evaluation = evaluateInterpretiveLayer({
    result,
    publicRegistryOverride: "decision.callnyc.issue-pathways"
  });
  assert.equal(evaluation.checks.interpretive_public_projection_selective, false);
});

test("protected source paths fail the interpretive public-safe boundary", () => {
  const id = "source.kc-town-hall.cced-proposal.2019";
  const evaluation = evaluateInterpretiveLayer({
    result,
    sourceOverrides: { [id]: `${sourceFor(id)}\n/Volumes/private/source.pdf\n` }
  });
  assert.equal(evaluation.checks.interpretive_protected_sources_metadata_only, false);
});
