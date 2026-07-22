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
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

test("photography notebook baseline passes", () => {
  const evaluation = evaluatePhotographyNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.counts.blockingCriteria, 14);
  assert.equal(evaluation.counts.humanGates, 10);
});

test("a missing field corpus page fails the notebook contract", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { "research-inquiry.photography.field-corpus-001": null }
  });
  assert.equal(evaluation.checks.photography_notebook_materialized, false);
  assert.equal(evaluation.checks.photography_notebook_reachable, false);
});

test("a false completed-corpus statement fails truthful state", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nThe private field is now frozen and ingested.\n`
    }
  });
  assert.equal(evaluation.checks.field_corpus_state_truthful, false);
});

test("selection cannot become publication", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const field = cloneRecord(id);
  field.projection = { status: "active", surfaces: ["/photos"] };
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [id]: field }
  });
  assert.equal(evaluation.checks.photo_publication_gates_human, false);
  assert.equal(evaluation.checks.no_public_photo_route, false);
});

test("a private source path fails the public notebook boundary", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nProtected source: /Users/example/Pictures/private-library\n`
    }
  });
  assert.equal(evaluation.checks.public_notebook_has_no_private_payload, false);
});

test("human publication gates cannot be replaced by a model score", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nA model score automatically clears every human gate.\n`
    }
  });
  assert.equal(evaluation.checks.photo_publication_gates_human, false);
});

test("experimental material cannot be forced into complete coverage", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nEvery project must receive an equal quota and every image must be classified.\n`
    }
  });
  assert.equal(evaluation.checks.experimental_space_preserved, false);
});

test("a visible observation cannot promote itself into a factual claim", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nA visible observation directly becomes a verified factual claim without corroboration.\n`
    }
  });
  assert.equal(evaluation.checks.photo_observations_remain_questions, false);
});

test("reconstructive image-level payloads fail the public notebook boundary", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nIMG_1234.JPG\nGPS: 40.71281, -74.00602\nFace label: Example Person\nOCR text: private placard text\nPreview locator: vault://preview/1234\n`
    }
  });
  assert.equal(evaluation.checks.public_notebook_has_no_private_payload, false);
});
