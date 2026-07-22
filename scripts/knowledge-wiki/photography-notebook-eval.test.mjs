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

function source(id) {
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

test("photography working notebook baseline passes", () => {
  const evaluation = evaluatePhotographyNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.counts.requiredRecords, 4);
  assert.equal(evaluation.counts.notebookSections, 12);
});

test("a missing notebook record fails materialization", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { "index.knowledge-wiki.photography-notebook": null }
  });
  assert.equal(evaluation.checks.photography_records_materialized, false);
});

test("the visual index must lead into the notebook", () => {
  const visual = cloneRecord("index.knowledge-wiki.visual-evidence");
  visual.relations = visual.relations.filter(
    (relation) => relation.target !== "index.knowledge-wiki.photography-notebook"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [visual.id]: visual }
  });
  assert.equal(evaluation.checks.photography_navigation_reachable, false);
});

test("the provisional field cannot become a representative final edit", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const mutated = source(id)
    .replace("provisional field of attention", "final portfolio selection")
    .replace(
      "not a representative sample, final edit, complete census, or publication slate",
      "a representative sample and final publication slate"
    );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.provisional_field_remains_open, false);
});

test("a fixed taxonomy mutation fails the play contract", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const mutated = source(id).replace(
    "prompts, not a mandatory taxonomy",
    "mandatory taxonomy and fixed quotas"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.play_precedes_fixed_taxonomy, false);
});

test("the opening note cannot pretend the private field was inspected", () => {
  const id = "research.photography-notebook-opening.2026-07-22";
  const mutated = source(id)
    .replace(
      "No photographs from Jamie's private archive were inspected",
      "The complete private archive was inspected"
    )
    .replace("planned, not completed", "completed and final");
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.opening_encounter_state_honest, false);
});

test("source return cannot lose stable identity and burst context", () => {
  const id = "method.photographic-archive-fieldwork";
  const mutated = source(id)
    .replace("stable route back to the exact source", "temporary export")
    .replace("duplicate, sequence, and burst relationships", "one preferred frame");
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photographic_source_return_durable, false);
});

test("selection cannot become publication approval", () => {
  const id = "method.photographic-archive-fieldwork";
  const mutated = source(id).replace(
    "Editorial usefulness is not publication approval.",
    "Editorial usefulness is publication approval."
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_lifecycle_states_separate, false);
});

test("a private locator fails the public notebook boundary", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: `${source(id)}\n/Users/example/Photos/private.heic\n` }
  });
  assert.equal(evaluation.checks.photography_public_boundary_clean, false);
});

test("a committed photograph fails the opening workspace boundary", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    workspaceFilesOverride: ["README.md", "draft-select/candidate-001.jpg"]
  });
  assert.equal(evaluation.checks.opening_workspace_contains_no_photo_assets, false);
});

test("the notebook cannot activate its own portfolio projection", () => {
  const notebook = cloneRecord("index.knowledge-wiki.photography-notebook");
  notebook.projection_status = "active";
  notebook.projection = { status: "active", surfaces: ["/work"] };
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [notebook.id]: notebook }
  });
  assert.equal(evaluation.checks.photography_projection_held, false);
});

test("AI cannot substitute itself for human publication authority", () => {
  const id = "method.photographic-archive-fieldwork";
  const mutated = source(id).replace(
    "may not clear a safety hold, infer consent, or grant publication permission",
    "may clear safety, infer consent, and grant publication permission"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photography_human_authority_preserved, false);
});

test("a notebook entry cannot discard protected absences", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const mutated = source(id).replace("- **Protected absences**", "");
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.notebook_entry_contract_complete, false);
});

test("the executable evaluator must remain wired into repository checks", () => {
  const mainEvaluator = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/evaluate-wiki.mjs"),
    "utf8"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    mainEvaluatorOverride: mainEvaluator.replace(
      'import { evaluatePhotographyNotebook } from "./photography-notebook-eval.mjs";',
      ""
    )
  });
  assert.equal(evaluation.checks.photography_eval_wired, false);
});
