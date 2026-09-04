import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateEngagementPathwayCandidate,
  evaluatePublicEngagementPathwayRFC
} from "./public-engagement-pathway-eval.mjs";

const policy = {
  allowed_routes: ["/contact", "/work/technical-operations"],
  canonical_route: "/contact",
  primary_cta_destination: "email",
  allowed_source_classes: [
    "existing-public-portfolio-evidence",
    "self-authored-public-offer"
  ],
  allowed_claims: ["availability-for-conversation"],
  new_top_level_navigation_authorized: false,
  required_rung_ids: [
    "focused-working-session",
    "knowledge-operations-diagnostic",
    "implementation-or-fractional-operations"
  ],
  forbidden_source_classes: [
    "named-private-counterparty",
    "private-correspondence",
    "raw-transcript",
    "draft-private-agreement",
    "private-demand-signal"
  ],
  forbidden_claims: [
    "client-adoption",
    "client-endorsement",
    "current-paid-engagement",
    "market-demand",
    "measured-client-result"
  ],
  pricing: {
    public_state: "withheld-pending-Jamie-decision"
  },
  authority: {
    implementation_authorized: false,
    publication_authorized: false
  }
};

function candidate(overrides = {}) {
  return {
    source_basis: ["existing-public-portfolio-evidence", "self-authored-public-offer"],
    claims: ["availability-for-conversation"],
    placement: {
      canonical_route: "/contact",
      supporting_routes: ["/work/technical-operations"],
      add_top_level_navigation: false
    },
    primary_cta: {
      label: "Discuss a working session",
      destination: "email",
      interaction: "email",
      checkout_or_payment: false
    },
    supporting_entry_cta: {
      label: "See ways to work together",
      destination: "/contact"
    },
    engagements: policy.required_rung_ids.map((id) => ({
      id,
      buyer_decision: `Decide whether ${id} fits the current need`,
      bounded_outcome: `A bounded outcome for ${id}`,
      separately_authorized: true,
      automatic_continuation: false
    })),
    pricing: {
      public_state: "withheld-pending-Jamie-decision"
    },
    ...overrides
  };
}

test("a public-safe, decision-oriented pathway is ready only for human review", () => {
  assert.deepEqual(evaluateEngagementPathwayCandidate(policy, candidate()), {
    decision: "ready-for-human-review",
    reasons: [],
    implementation_authorized: false,
    publication_authorized: false
  });
});

test("private relationship evidence cannot establish a public offer or demand", () => {
  const result = evaluateEngagementPathwayCandidate(
    policy,
    candidate({
      source_basis: ["existing-public-portfolio-evidence", "private-demand-signal"],
      claims: ["availability-for-conversation", "market-demand"]
    })
  );

  assert.deepEqual(result, {
    decision: "deny",
    reasons: [
      "forbidden-public-claim:market-demand",
      "forbidden-public-source:private-demand-signal"
    ],
    implementation_authorized: false,
    publication_authorized: false
  });
});

test("a transcript or private agreement remains excluded even when its wording is paraphrased", () => {
  const result = evaluateEngagementPathwayCandidate(
    policy,
    candidate({
      source_basis: ["raw-transcript", "draft-private-agreement"]
    })
  );

  assert.deepEqual(result, {
    decision: "deny",
    reasons: [
      "forbidden-public-source:draft-private-agreement",
      "forbidden-public-source:raw-transcript"
    ],
    implementation_authorized: false,
    publication_authorized: false
  });
});

test("an unknown source class fails closed instead of evading the private-source list", () => {
  const result = evaluateEngagementPathwayCandidate(
    policy,
    candidate({ source_basis: ["private-context-summary"] })
  );

  assert.deepEqual(result, {
    decision: "deny",
    reasons: ["unapproved-public-source:private-context-summary"],
    implementation_authorized: false,
    publication_authorized: false
  });
});

test("the first public version cannot add navigation, checkout, or unapproved pricing", () => {
  const result = evaluateEngagementPathwayCandidate(
    policy,
    candidate({
      placement: {
        canonical_route: "/services",
        supporting_routes: [],
        add_top_level_navigation: true
      },
      primary_cta: {
        label: "Buy now",
        destination: "/checkout",
        interaction: "checkout",
        checkout_or_payment: true
      },
      pricing: { public_state: "published" }
    })
  );

  assert.deepEqual(result, {
    decision: "deny",
    reasons: [
      "checkout-or-payment-not-authorized",
      "pricing-publication-not-authorized",
      "top-level-navigation-not-authorized",
      "unapproved-canonical-route:/services",
      "untruthful-primary-cta-destination:/checkout"
    ],
    implementation_authorized: false,
    publication_authorized: false
  });
});

test("every expansion beyond a working session requires a new authorization", () => {
  const unsafe = candidate();
  unsafe.engagements[1].separately_authorized = false;
  unsafe.engagements[2].automatic_continuation = true;

  assert.deepEqual(evaluateEngagementPathwayCandidate(policy, unsafe), {
    decision: "deny",
    reasons: [
      "automatic-continuation:implementation-or-fractional-operations",
      "separate-authorization-missing:knowledge-operations-diagnostic"
    ],
    implementation_authorized: false,
    publication_authorized: false
  });
});

test("a missing buyer decision or rung is held rather than silently completed", () => {
  const incomplete = candidate();
  incomplete.engagements[0].buyer_decision = "";
  incomplete.engagements.pop();

  assert.deepEqual(evaluateEngagementPathwayCandidate(policy, incomplete), {
    decision: "hold",
    reasons: [
      "buyer-decision-missing:focused-working-session",
      "required-rung-missing:implementation-or-fractional-operations"
    ],
    implementation_authorized: false,
    publication_authorized: false
  });
});

test("the repository RFC candidate passes while preserving Jamie's gates", () => {
  const result = evaluatePublicEngagementPathwayRFC();

  assert.equal(result.rfc, 12);
  assert.equal(result.stage, "proposed");
  assert.equal(result.score, 1);
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.failed, 0);
  assert.ok(result.scenarios.total >= 6);
  assert.match(result.candidate_fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(result.implementation_authorized, false);
  assert.equal(result.publication_authorized, false);
});
