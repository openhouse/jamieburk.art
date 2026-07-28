import test from "node:test";
import assert from "node:assert/strict";

import { compileWiki } from "./lib.mjs";
import { evaluatePrelaunchArchive } from "./prelaunch-archive-eval.mjs";

test("pre-launch archive production satisfies every deterministic criterion", () => {
  const result = compileWiki();
  const evaluation = evaluatePrelaunchArchive({ result });
  assert.deepEqual(
    Object.entries(evaluation.checks).filter(([, passed]) => !passed),
    []
  );
});
