import assert from "node:assert/strict";
import test from "node:test";

import { scanTextForPublicSafetyTerms } from "./public-safety.ts";

test("returns no findings for clean public portfolio copy", () => {
  assert.deepEqual(
    scanTextForPublicSafetyTerms("Public-safe summary with role, artifact, and source-layer notes."),
    []
  );
});

test("flags obvious private markers", () => {
  assert.deepEqual(scanTextForPublicSafetyTerms("Includes a raw transcript."), [
    { term: "raw transcript", index: 11 }
  ]);
});
