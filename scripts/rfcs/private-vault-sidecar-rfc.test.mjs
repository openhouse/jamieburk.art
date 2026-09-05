import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

test("the public contract requires private disposition without exposing private topology", () => {
  const contract = JSON.parse(
    readFileSync(
      new URL("../../rfcs/0011-private-vault-sidecar.contract.json", import.meta.url),
      "utf8"
    )
  );

  assert.equal(contract.retention.private_call_artifact_disposition_required, true);
  assert.equal(contract.retention.public_omission_requires_private_disposition, true);
  assert.equal(contract.retention.unlocated_artifact_state, "explicit-gap-not-discarded");
  assert.equal(contract.retention.confidentiality_effect, "restrict-projection-not-custody");
  assert.equal(contract.retention.deletion_authority, "separate-explicit-human-decision");
  assert.equal(contract.public_boundary.public_may_reveal_private_topology, false);
});
