import assert from "node:assert/strict";
import test from "node:test";

let evaluatePublicEngagementPathway;
let evaluatePublicEngagementPathwayRFC;
try {
  ({
    evaluatePublicEngagementPathway,
    evaluatePublicEngagementPathwayRFC
  } = await import(
    "./public-engagement-pathway-eval.mjs"
  ));
} catch {
  // The first red run should fail as an assertion until the evaluator exists.
}

const contract = {
  pathways: {
    other_engagements_remain_visible: true,
    continuation_requires_separate_mutual_decision: true
  },
  pricing: {
    public_price_state: "decision-pending"
  }
};

const completeCandidate = {
  surface: "/contact",
  introduces_new_route: false,
  paid: true,
  duration_minutes: 60,
  names_problem_types: true,
  names_takeaway: true,
  continuation_is_separate: true,
  other_engagements_remain_visible: true,
  public_price: null,
  references_specific_private_opportunity: false,
  implies_past_client_outcome: false,
  implies_endorsement: false
};

test("a bounded public-safe pathway becomes reviewable without becoming published", () => {
  assert.equal(typeof evaluatePublicEngagementPathway, "function");
  assert.deepEqual(evaluatePublicEngagementPathway(contract, completeCandidate), {
    decision: "ready-for-human-review",
    publication_authorized: false,
    reasons: []
  });
});

test("private opportunity provenance is denied on the public candidate", () => {
  const candidate = {
    ...completeCandidate,
    references_specific_private_opportunity: true
  };

  assert.deepEqual(evaluatePublicEngagementPathway(contract, candidate), {
    decision: "deny",
    publication_authorized: false,
    reasons: ["specific-private-opportunity-reference-forbidden"]
  });
});

test("an unsupported past-client outcome is denied", () => {
  const candidate = {
    ...completeCandidate,
    implies_past_client_outcome: true
  };

  assert.deepEqual(evaluatePublicEngagementPathway(contract, candidate), {
    decision: "deny",
    publication_authorized: false,
    reasons: ["past-client-outcome-claim-forbidden"]
  });
});

test("an unpaid or underspecified session remains held", () => {
  const candidate = {
    ...completeCandidate,
    paid: false,
    names_takeaway: false
  };

  assert.deepEqual(evaluatePublicEngagementPathway(contract, candidate), {
    decision: "hold",
    publication_authorized: false,
    reasons: ["paid-boundary-missing", "takeaway-missing"]
  });
});

test("automatic continuation is denied", () => {
  const candidate = {
    ...completeCandidate,
    continuation_is_separate: false
  };

  assert.deepEqual(evaluatePublicEngagementPathway(contract, candidate), {
    decision: "deny",
    publication_authorized: false,
    reasons: ["automatic-continuation-forbidden"]
  });
});

test("premature public pricing and a new route remain held", () => {
  const candidate = {
    ...completeCandidate,
    surface: "/services",
    introduces_new_route: true,
    public_price: "published-amount"
  };

  assert.deepEqual(evaluatePublicEngagementPathway(contract, candidate), {
    decision: "hold",
    publication_authorized: false,
    reasons: [
      "new-route-not-justified",
      "public-price-decision-required",
      "recommended-surface-mismatch"
    ]
  });
});

test("the session offer cannot erase employment and project pathways", () => {
  const candidate = {
    ...completeCandidate,
    other_engagements_remain_visible: false
  };

  assert.deepEqual(evaluatePublicEngagementPathway(contract, candidate), {
    decision: "hold",
    publication_authorized: false,
    reasons: ["other-engagement-pathways-missing"]
  });
});

test("the repository candidate satisfies every hard gate and the reader-burden target", () => {
  assert.equal(typeof evaluatePublicEngagementPathwayRFC, "function");
  const result = evaluatePublicEngagementPathwayRFC();

  assert.equal(result.rfc, 12);
  assert.equal(result.stage, "proposed");
  assert.equal(result.score, 1);
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.total, 7);
  assert.equal(result.scenarios.failed, 0);
  assert.equal(result.placement_scenarios.total, 7);
  assert.equal(result.placement_scenarios.failed, 0);
  assert.match(result.candidate_fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(result.implementation_authorized, false);
  assert.equal(result.publication_authorized, false);
});
