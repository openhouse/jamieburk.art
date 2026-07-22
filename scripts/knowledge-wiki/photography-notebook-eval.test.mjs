import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import { evaluatePhotographyNotebook } from "./photography-notebook-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function sourceFor(id) {
  const item = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, item.path), "utf8");
}

test("photography working notebook baseline passes", () => {
  const evaluation = evaluatePhotographyNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    records: 6,
    entryHeadings: 11,
    blockingCriteria: 18
  });
});

test("a missing notebook record fails materialization", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { "research-inquiry.photography.field-set-001": null }
  });
  assert.equal(evaluation.checks.photography_notebook_records_materialized, false);
});

test("the notebook must remain reachable from the Wiki root", () => {
  const root = cloneRecord("index.knowledge-wiki");
  root.relations = root.relations.filter(
    (relation) => relation.target !== "index.knowledge-wiki.photography-notebook"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [root.id]: root }
  });
  assert.equal(evaluation.checks.photography_notebook_reachable, false);
});

test("the rough field cannot activate itself as a public projection", () => {
  const field = cloneRecord("research-inquiry.photography.field-set-001");
  field.projection = { status: "active", surfaces: ["/work"] };
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [field.id]: field }
  });
  assert.equal(evaluation.checks.field_set_provisional_not_population_claim, false);
  assert.equal(evaluation.checks.photography_projection_remains_hold, false);
});

test("matching counts cannot replace exact private membership", () => {
  const id = "research-inquiry.photography.field-set-001";
  const mutated = sourceFor(id).replace(
    /exact private membership\s+rather than relying on a matching count/,
    "a matching count is sufficient"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.field_set_exact_identity_and_nonmutation, false);
});

test("visible observation cannot collapse into interpretation", () => {
  const id = "method.photography.notebook-entry";
  const mutated = sourceFor(id).replace(
    "## Interpretations and hypotheses",
    "## Confirmed meaning"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.observation_interpretation_claim_separated, false);
  assert.equal(evaluation.checks.notebook_entry_contract_complete, false);
});

test("a private source path fails the notebook boundary", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: `${sourceFor(id)}\n/Volumes/private/photo-library\n` }
  });
  assert.equal(evaluation.checks.photography_notebook_public_private_boundary, false);
});

test("an embedded private preview fails the notebook boundary", () => {
  const id = "research-inquiry.photography.field-set-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: `${sourceFor(id)}\n![Private preview](preview-image)\n` }
  });
  assert.equal(evaluation.checks.photography_notebook_public_private_boundary, false);
});

test("agent authority cannot replace human holds", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const mutated = sourceFor(id).replace(
    /they may not clear\s+safety, provenance, rights, consent, attribution, or publication holds/,
    "they may clear all remaining holds"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.human_holds_cannot_be_agent_cleared, false);
});

test("the creative grammar keeps the complete three-part movement", () => {
  const id = "method.photography.invitation-container-emergence";
  const mutated = sourceFor(id).replace(
    "## Until it tastes of salt: emergence",
    "## Finished outcome"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.creative_sequence_grammar_preserved, false);
});

test("the residency proposal remains an accepted but reviewable entryway", () => {
  const id = "project.photography.field-set-001-residency";
  const proposal = cloneRecord(id);
  proposal.human_review = "completed";
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [id]: proposal }
  });
  assert.equal(evaluation.checks.residency_proposal_is_governed_entryway, false);
});

test("the proposal cannot be converted into a production contract", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    /instrument of attention, not a contract/gi,
    "binding production agreement"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_proposal_is_not_contract, false);
});

test("changing course remains evidence of attention rather than failure", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    "Changing course is evidence that attention is operating, not a failure",
    "Changing course is a failure to execute"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_permission_to_depart_preserved, false);
});

test("success cannot require a finished or public result", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    /Success does not require a finished artifact, a fixed number of selects, or a\s+public result/,
    "Success requires a finished public exhibition"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_success_not_output_or_publication, false);
});

test("artistic freedom cannot erase privacy and consent boundaries", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    /Play\s+does not override privacy, provenance, attribution, rights, consent, factual\s+review, or Jamie's approval/,
    "Play overrides all publication boundaries"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_freedom_remains_ethically_bounded, false);
});

test("the Teju Cole precedent cannot be sharpened beyond the sources", () => {
  const id = "source.teju-cole.far-away-from-here.2015";
  const mutated = sourceFor(id).replace(
    /he did some Lagos\s+and other writing/,
    "he abandoned all writing"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.teju_cole_reference_is_source_honest, false);
});

test("notebook IDs cannot enter the public registry implicitly", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    publicRegistryOverride: "index.knowledge-wiki.photography-notebook"
  });
  assert.equal(evaluation.checks.photography_projection_remains_hold, false);
});
