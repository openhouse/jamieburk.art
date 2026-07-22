import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function manifestForFieldSource(fieldSource) {
  const manifest = JSON.parse(
    readFileSync(
      path.join(defaultRepoRoot, "evals/knowledge-wiki/photography-notebook.json"),
      "utf8"
    )
  );
  manifest.contentBindings.field = sha256(fieldSource);
  return manifest;
}

test("photography notebook baseline passes", () => {
  const evaluation = evaluatePhotographyNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.counts.blockingCriteria, 15);
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
  const fieldSource = `${sourceFor(id)}\n\nWe finished assembling the full corpus.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
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
  const fieldSource = `${sourceFor(id)}\n\nMachine confidence satisfies every publication prerequisite and marks human review complete.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.photo_publication_gates_human, false);
});

test("experimental material cannot be forced into complete coverage", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nAllocate the same number of photographs to each project.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.experimental_space_preserved, false);
});

test("a visible observation cannot promote itself into a factual claim", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nA visible observation is sufficient evidence for a verified factual claim.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.photo_observations_remain_questions, false);
});

test("reconstructive image-level payloads fail the public notebook boundary", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nArchive location: /private/tmp/photo-field\nImage file: river-launch-2007.heic\nArchive UUID: 123e4567-e89b-42d3-a456-426614174000\nCoordinates: 40°42'46\"N, 74°0'21\"W\nRecognized person: Example Person\nExtracted text: private placard lettering\nThumbnail URI: vault://thumb/1234\n![remote preview](https://example.com/private.jpg)\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.public_notebook_has_no_private_payload, false);
});

test("an unreviewed additive note invalidates the exact notebook binding", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nA new public-safe working note.\n`
    }
  });
  assert.equal(evaluation.checks.photography_notebook_content_bound, false);
  assert.equal(evaluation.passed, false);
});

test("a coordinated final-narrative claim still fails semantic review", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nThis field is the representative complete final narrative of the archive.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.attention_not_publication, false);
});
