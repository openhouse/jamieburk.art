import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot, wikiRecordSchema } from "./lib.mjs";
import { evaluatePhotoNotebook } from "./photo-notebook-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function sourceFor(id) {
  const item = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, item.path), "utf8");
}

test("photography notebook baseline passes", () => {
  const evaluation = evaluatePhotoNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    requiredRecords: 5,
    targetPopulation: 1000,
    currentPopulation: 0
  });
});

test("a notebook cannot activate itself on the portfolio", () => {
  const notebook = cloneRecord("notebook.photography");
  notebook.projection = { status: "active", surfaces: ["/"] };
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [notebook.id]: notebook }
  });
  assert.equal(evaluation.checks.photography_notebook_contract_bounded, false);
  assert.equal(wikiRecordSchema.safeParse(notebook).success, false);
});

test("the field cannot claim a population beyond its target", () => {
  const field = cloneRecord("notebook.photography.field.v01");
  field.current_population = 1001;
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [field.id]: field }
  });
  assert.equal(evaluation.checks.photography_notebook_contract_bounded, false);
  assert.equal(evaluation.checks.photography_field_is_rough_draft_not_completion, false);
  assert.equal(wikiRecordSchema.safeParse(field).success, false);
});

test("visual interpretation cannot silently become evidence", () => {
  const id = "notebook.photography.templates";
  const mutated = sourceFor(id).replace(
    /Treat memory as attributed context and a research lead, not automatic proof\./,
    "Treat memory as proof."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photography_epistemic_lanes_separate, false);
});

test("selection cannot imply publication clearance", () => {
  const id = "notebook.photography";
  const mutated = sourceFor(id).replace(
    /Selection is not publication\./,
    "Selection clears publication."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.photography_selection_publication_rights_separate,
    false
  );
});

test("the experimental field cannot collapse into deterministic scoring", () => {
  const id = "notebook.photography.vocabulary";
  const mutated = sourceFor(id).replace(
    /not a\s+deterministic scoring system/,
    "a deterministic scoring system"
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photography_experiment_remains_open, false);
});

test("private photo-library coordinates fail closed", () => {
  const id = "notebook.photography.field.v01";
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n/Volumes/private/Jamie.photoslibrary/original.jpg\n`
    }
  });
  assert.equal(evaluation.checks.photography_private_archive_boundary, false);
});

test("notebook IDs cannot enter the public registry implicitly", () => {
  const evaluation = evaluatePhotoNotebook({
    result,
    publicRegistryOverride: "notebook.photography"
  });
  assert.equal(evaluation.checks.photography_public_projection_selective, false);
});
