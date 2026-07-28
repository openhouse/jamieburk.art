import test from "node:test";
import assert from "node:assert/strict";
import { validateCurrentWorkBoundaries } from "./current-work-boundaries.mjs";

test("keeps current-work sources public-safe and projection-held", () => {
  assert.deepEqual(validateCurrentWorkBoundaries(), []);
});
