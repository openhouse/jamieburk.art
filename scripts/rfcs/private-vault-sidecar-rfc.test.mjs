import assert from "node:assert/strict";
import test from "node:test";

import { evaluatePrivateVaultSidecarRFC } from "./private-vault-sidecar-eval.mjs";

test("the repository candidate satisfies every sidecar hard gate and scenario", () => {
  const result = evaluatePrivateVaultSidecarRFC();

  assert.equal(result.rfc, 11);
  assert.equal(result.stage, "implementing");
  assert.equal(result.score, 1);
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.failed, 0);
  assert.ok(result.scenarios.total >= 7);
  assert.match(result.candidate_fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(result.public_runtime_dependency, false);
  assert.equal(result.publication_authorized, false);
});
