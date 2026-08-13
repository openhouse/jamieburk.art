import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateExchangeEnvelope } from "./federated-knowledge-exchange-eval.mjs";

const contract = {
  exchange_kinds: {
    transport_only: ["context-packet", "canonical-record-reference"],
    release_candidates: ["projection-proposal", "release-receipt"]
  },
  candidate_binding: {
    required_fields: ["commit", "content_fingerprint"]
  },
  human_gates: {
    required: [
      "public_safety",
      "rights",
      "consent",
      "collective_credit",
      "editorial_selection",
      "voice",
      "publication"
    ],
    allowed_states: ["approved", "not-applicable"],
    approval_required: ["public_safety", "editorial_selection", "publication"]
  },
  correction_policy: {
    restrictive_effect: "restrict-projection",
    hold_statuses: ["proposed", "acknowledged", "disputed", "held"]
  },
  temporal_postures: ["historic", "current", "relaunch-proposed"],
  authority: {
    automation_release_authority: "none"
  }
};

const currentCandidate = {
  commit: "candidate-commit",
  content_fingerprint: "candidate-fingerprint"
};

const approvedGate = {
  state: "approved",
  authority: "human-recorded",
  decided_by: "decision-owner",
  decided_at: "2026-08-13T12:00:00Z"
};

function releaseCandidate(overrides = {}) {
  return {
    kind: "projection-proposal",
    candidate: currentCandidate,
    temporal_posture: "historic",
    corrections: [],
    gates: Object.fromEntries(
      contract.human_gates.required.map((gate) => [gate, { ...approvedGate }])
    ),
    ...overrides
  };
}

test("transport packets cannot become release authority", () => {
  const actual = evaluateExchangeEnvelope(
    contract,
    releaseCandidate({ kind: "context-packet" }),
    currentCandidate
  );

  assert.deepEqual(actual, {
    decision: "deny",
    reasons: ["transport-is-not-release-authority"]
  });
});

test("missing or pending human gates hold a projection", () => {
  const candidate = releaseCandidate();
  delete candidate.gates.consent;
  candidate.gates.voice = { state: "pending" };

  const actual = evaluateExchangeEnvelope(contract, candidate, currentCandidate);

  assert.deepEqual(actual, {
    decision: "hold",
    reasons: ["gate-missing:consent", "gate-not-recorded:voice"]
  });
});

test("a receipt for a stale candidate is denied", () => {
  const actual = evaluateExchangeEnvelope(
    contract,
    releaseCandidate({
      candidate: {
        commit: "earlier-commit",
        content_fingerprint: "earlier-fingerprint"
      }
    }),
    currentCandidate
  );

  assert.deepEqual(actual, {
    decision: "deny",
    reasons: ["candidate-binding-mismatch"]
  });
});

test("an unresolved restriction request holds the affected projection", () => {
  const actual = evaluateExchangeEnvelope(
    contract,
    releaseCandidate({
      corrections: [
        {
          id: "correction-1",
          effect: "restrict-projection",
          status: "proposed"
        }
      ]
    }),
    currentCandidate
  );

  assert.deepEqual(actual, {
    decision: "hold",
    reasons: ["unresolved-restriction:correction-1"]
  });
});

test("an undeclared temporal posture holds public composition", () => {
  const actual = evaluateExchangeEnvelope(
    contract,
    releaseCandidate({ temporal_posture: "" }),
    currentCandidate
  );

  assert.deepEqual(actual, {
    decision: "hold",
    reasons: ["temporal-posture-not-declared"]
  });
});

test("an exact candidate with recorded human gates is eligible only for human-controlled action", () => {
  const actual = evaluateExchangeEnvelope(
    contract,
    releaseCandidate(),
    currentCandidate
  );

  assert.deepEqual(actual, {
    decision: "eligible-for-human-controlled-action",
    reasons: [],
    automation_authority: "none"
  });
});

test("the contract cannot grant release authority to automation", () => {
  const unsafeContract = structuredClone(contract);
  unsafeContract.authority.automation_release_authority = "release";

  const actual = evaluateExchangeEnvelope(
    unsafeContract,
    releaseCandidate(),
    currentCandidate
  );

  assert.deepEqual(actual, {
    decision: "deny",
    reasons: ["automation-release-authority-forbidden"]
  });
});

test("the repository contract preserves the human-authority boundary", () => {
  const repositoryContract = JSON.parse(
    readFileSync(
      new URL("../../rfcs/0006-federated-knowledge-exchange-and-release-receipts.contract.json", import.meta.url),
      "utf8"
    )
  );
  const actual = evaluateExchangeEnvelope(
    repositoryContract,
    releaseCandidate(),
    currentCandidate
  );

  assert.deepEqual(actual, {
    decision: "eligible-for-human-controlled-action",
    reasons: [],
    automation_authority: "none"
  });
});
