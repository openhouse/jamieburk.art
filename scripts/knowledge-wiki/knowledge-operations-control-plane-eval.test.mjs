import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateControlPlaneCandidate,
  evaluateWorkflowItem,
  loadControlPlaneCandidate
} from "./knowledge-operations-control-plane-eval.mjs";

test("the maintained Knowledge Wiki operating control plane passes", () => {
  const result = evaluateControlPlaneCandidate(loadControlPlaneCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

test("a stale source stops before subjective model review", () => {
  const { contract } = loadControlPlaneCandidate();
  const result = evaluateWorkflowItem(contract, {
    current_state: "qualified",
    proposed_state: "ready-to-apply",
    source_reviewed_at: "2026-08-01T12:00:00Z",
    source_refresh_due_at: "2026-08-20T12:00:00Z",
    deterministic_checks_passed: true,
    subjective_review_required: true,
    action: "prepare-application",
    human_authorization: "not-required",
    candidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  }, {
    now: "2026-08-29T12:00:00Z",
    currentCandidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  });

  assert.deepEqual(result, {
    decision: "hold",
    reasons: ["source-refresh-required"],
    next_stage: "deterministic-remediation"
  });
});

test("a changed upstream dependency invalidates the exact-candidate receipt", () => {
  const { contract } = loadControlPlaneCandidate();
  const result = evaluateWorkflowItem(contract, {
    current_state: "applied",
    proposed_state: "in-review",
    source_reviewed_at: "2026-08-29T10:00:00Z",
    source_refresh_due_at: "2026-09-05T10:00:00Z",
    deterministic_checks_passed: true,
    subjective_review_required: false,
    action: "record-status",
    human_authorization: "not-required",
    candidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "old-source-fingerprint"
    }
  }, {
    now: "2026-08-29T12:00:00Z",
    currentCandidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "new-source-fingerprint"
    }
  });

  assert.deepEqual(result, {
    decision: "hold",
    reasons: ["candidate-receipt-stale"],
    next_stage: "deterministic-remediation"
  });
});

test("a deterministic failure cannot spend a subjective model call", () => {
  const { contract } = loadControlPlaneCandidate();
  const result = evaluateWorkflowItem(contract, {
    current_state: "qualified",
    proposed_state: "ready-to-apply",
    source_reviewed_at: "2026-08-29T10:00:00Z",
    source_refresh_due_at: "2026-09-05T10:00:00Z",
    deterministic_checks_passed: false,
    subjective_review_required: true,
    action: "prepare-application",
    human_authorization: "not-required",
    candidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  }, {
    now: "2026-08-29T12:00:00Z",
    currentCandidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  });

  assert.deepEqual(result, {
    decision: "hold",
    reasons: ["deterministic-check-failed"],
    next_stage: "deterministic-remediation"
  });
});

test("outreach remains a human action after every automated gate passes", () => {
  const { contract } = loadControlPlaneCandidate();
  const result = evaluateWorkflowItem(contract, {
    current_state: "ready-to-apply",
    proposed_state: "applied",
    source_reviewed_at: "2026-08-29T10:00:00Z",
    source_refresh_due_at: "2026-09-05T10:00:00Z",
    deterministic_checks_passed: true,
    subjective_review_required: false,
    action: "submit-application",
    human_authorization: "pending",
    candidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  }, {
    now: "2026-08-29T12:00:00Z",
    currentCandidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  });

  assert.deepEqual(result, {
    decision: "hold",
    reasons: ["human-authorization-required:submit-application"],
    next_stage: "human-decision"
  });
});

test("eligible work enters subjective review only after deterministic gates pass", () => {
  const { contract } = loadControlPlaneCandidate();
  const result = evaluateWorkflowItem(contract, {
    current_state: "qualified",
    proposed_state: "ready-to-apply",
    source_reviewed_at: "2026-08-29T10:00:00Z",
    source_refresh_due_at: "2026-09-05T10:00:00Z",
    deterministic_checks_passed: true,
    subjective_review_required: true,
    action: "prepare-application",
    human_authorization: "not-required",
    candidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  }, {
    now: "2026-08-29T12:00:00Z",
    currentCandidate: {
      commit: "candidate-commit",
      content_fingerprint: "candidate-fingerprint",
      upstream_fingerprint: "source-fingerprint"
    }
  });

  assert.deepEqual(result, {
    decision: "eligible-for-subjective-evaluation",
    reasons: [],
    next_stage: "subjective-evaluation",
    automation_authority: "none"
  });
});

function expectCandidateFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadControlPlaneCandidate();
    mutate(candidate);
    const result = evaluateControlPlaneCandidate(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectCandidateFailure(
  "source coverage cannot lose the claim-limit field",
  (candidate) => {
    candidate.contract.source_registry.required_fields =
      candidate.contract.source_registry.required_fields.filter(
        (field) => field !== "cannot_establish"
      );
  },
  /source registry/
);

expectCandidateFailure(
  "health cannot collapse into one composite score",
  (candidate) => {
    candidate.contract.health.no_composite_override = false;
  },
  /health dimensions/
);

expectCandidateFailure(
  "situated voice cannot become impersonation",
  (candidate) => {
    candidate.contract.situated_voice.simulation_is_endorsement = true;
  },
  /situated voice/
);

expectCandidateFailure(
  "human actions cannot be granted to automation",
  (candidate) => {
    candidate.contract.authority.automation_action_authority = "submit";
  },
  /human action boundary/
);
