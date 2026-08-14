import assert from "node:assert/strict";
import test from "node:test";

import { evaluateLayerImplementation } from "./layers-eval.mjs";

test("the current layered Wiki implementation satisfies every hard runtime gate", () => {
  const evaluation = evaluateLayerImplementation();

  assert.deepEqual(evaluation.hardFailures, []);
  assert.equal(evaluation.seedResults.unresolved.length, 0);
  assert.equal(evaluation.score >= 0.9, true);
  assert.equal(evaluation.stage, "exploring");
  assert.equal(evaluation.prototypeUnderEvaluation, true);
  assert.equal(evaluation.implementationAuthorized, false);
});
