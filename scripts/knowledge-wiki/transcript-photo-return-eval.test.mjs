import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { evaluateTranscriptPhotoReturn } from "./transcript-photo-return-eval.mjs";

const methodPath =
  "docs/knowledge-bank/methods/transcript-linked-photographic-source-return.md";
const selectPath =
  "docs/knowledge-bank/sources/tooling/photo-select-curatorial-cascade.md";

function source(relativePath) {
  return fs.readFileSync(relativePath, "utf8");
}

test("transcript-linked photo source-return baseline passes", () => {
  assert.deepEqual(evaluateTranscriptPhotoReturn().failures, []);
});

test("temporal proximity cannot identify a visible speaker", () => {
  const mutated = source(methodPath).replace(
    /Do not infer that a visible person is speaking merely because their label and a\s+transcript turn occur near one another\./,
    "Temporal proximity is enough to identify the visible speaker."
  );
  const result = evaluateTranscriptPhotoReturn({
    sourceOverrides: { [methodPath]: mutated }
  });
  assert.equal(
    result.checks.find((item) => item.id === "TRANSCRIPT-PHOTO-002").pass,
    false
  );
});

test("keep depth cannot become an objective ranking", () => {
  const mutated = source(selectPath).replace(
    "not an objective aesthetic score, a permanent ranking, or proof that Jamie",
    "an objective aesthetic score and permanent ranking proving that Jamie"
  );
  const result = evaluateTranscriptPhotoReturn({
    sourceOverrides: { [selectPath]: mutated }
  });
  assert.equal(
    result.checks.find((item) => item.id === "TRANSCRIPT-PHOTO-003").pass,
    false
  );
});

test("private source paths cannot enter the governed method", () => {
  const mutated = `${source(methodPath)}\n/private/example/event/IMG_1234.jpg\n`;
  const result = evaluateTranscriptPhotoReturn({
    sourceOverrides: { [methodPath]: mutated }
  });
  assert.equal(
    result.checks.find((item) => item.id === "TRANSCRIPT-PHOTO-005").pass,
    false
  );
});

test("historical selection cannot clear rights or consent", () => {
  const mutated = source(methodPath).replace(
    "No association or selection grants photographer rights",
    "A deep keep selection grants photographer rights"
  );
  const result = evaluateTranscriptPhotoReturn({
    sourceOverrides: { [methodPath]: mutated }
  });
  assert.equal(
    result.checks.find((item) => item.id === "TRANSCRIPT-PHOTO-005").pass,
    false
  );
});
