import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluatePublicHiringPathway,
  evaluatePublicHiringPathwayRFC
} from "./public-hiring-pathway-eval.mjs";

const contract = {
  stage: "proposed",
  offer: {
    model: "fixed-fee-outcome",
    currency: "USD",
    proposed_amount: 250,
    maximum_total_effort_minutes: 60,
    required_components: [
      "agreed-preparation",
      "working-session-or-analysis",
      "short-written-recap"
    ],
    standalone: true,
    follow_on: "separately-scoped-and-authorized"
  },
  surface: {
    primary_location: "/contact#working-session",
    homepage_role: "secondary",
    new_route_required: false,
    allowed_cta_actions: ["propose-working-session"]
  },
  public_boundary: {
    forbidden_fields: [
      "private_transcript",
      "private_correspondence",
      "relationship_source",
      "client_negotiation",
      "private_repository_locator",
      "public_contract_body",
      "public_contract_url"
    ],
    implied_current_availability: false,
    named_private_opportunity: false
  },
  authority: {
    decision_owner: "Jamie Burkart",
    implementation_authorized: false,
    publication_authorized: false,
    automatic_acceptance_authority: "none",
    human_decisions: [
      "exact-public-copy",
      "displayed-price",
      "implementation",
      "deployment",
      "production-indexing"
    ]
  }
};

function proposedPathway(overrides = {}) {
  return {
    offer: {
      model: "fixed-fee-outcome",
      currency: "USD",
      amount: 250,
      maximum_total_effort_minutes: 60,
      components: [
        "agreed-preparation",
        "working-session-or-analysis",
        "short-written-recap"
      ],
      intended_outcome_agreed_before_work: true,
      standalone: true,
      follow_on: "separately-scoped-and-authorized"
    },
    surface: {
      primary_location: "/contact#working-session",
      homepage_role: "secondary",
      new_route_required: false
    },
    cta: {
      label: "Propose a working session",
      action: "propose-working-session",
      implied_current_availability: false
    },
    public_contract: {
      published: false,
      linked: false
    },
    ...overrides
  };
}

test("the proposed fixed-fee pathway reaches human review without authorizing publication", () => {
  assert.deepEqual(evaluatePublicHiringPathway(contract, proposedPathway()), {
    decision: "ready-for-human-review",
    next_state: "proposed",
    implementation_authorized: false,
    publication_authorized: false,
    reasons: []
  });
});

test("private provenance is denied even when nested in an otherwise public offer", () => {
  const candidate = proposedPathway({
    provenance: {
      relationship_source: "protected source"
    }
  });

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "deny",
    reasons: ["forbidden-public-field:relationship_source"]
  });
});

test("an hourly-labor listing is held instead of replacing the outcome-based offer", () => {
  const candidate = proposedPathway();
  candidate.offer.model = "hourly-labor";

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "hold",
    reasons: ["offer-model-not-fixed-fee-outcome"]
  });
});

test("a free discovery call cannot satisfy the compensated entry pathway", () => {
  const candidate = proposedPathway();
  candidate.offer.amount = 0;

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "hold",
    reasons: ["proposed-fee-mismatch"]
  });
});

test("the working unit must include preparation, a session or analysis, and a recap", () => {
  const candidate = proposedPathway();
  candidate.offer.components = ["working-session-or-analysis"];
  candidate.offer.standalone = false;

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "hold",
    reasons: [
      "offer-component-missing:agreed-preparation",
      "offer-component-missing:short-written-recap",
      "standalone-offer-required"
    ]
  });
});

test("automatic follow-on work is denied", () => {
  const candidate = proposedPathway();
  candidate.offer.follow_on = "automatic-renewal";

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "deny",
    reasons: ["follow-on-must-be-separately-scoped-and-authorized"]
  });
});

test("the pathway cannot imply availability or immediate booking", () => {
  const candidate = proposedPathway({
    cta: {
      label: "Book now",
      action: "book-now",
      implied_current_availability: true
    }
  });

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "deny",
    reasons: [
      "cta-action-not-allowed:book-now",
      "current-availability-not-established"
    ]
  });
});

test("the entry offer belongs on Contact rather than a new route or homepage hero", () => {
  const candidate = proposedPathway({
    surface: {
      primary_location: "/services",
      homepage_role: "hero",
      new_route_required: true
    }
  });

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "hold",
    reasons: [
      "homepage-role-mismatch",
      "new-route-not-authorized",
      "primary-location-mismatch"
    ]
  });
});

test("publishing or linking a contract on the public surface is denied", () => {
  const candidate = proposedPathway({
    public_contract: {
      published: true,
      linked: true
    }
  });

  assert.deepEqual(evaluatePublicHiringPathway(contract, candidate), {
    decision: "deny",
    reasons: ["public-contract-not-authorized"]
  });
});

test("the repository RFC candidate passes every hard gate and scenario", () => {
  const result = evaluatePublicHiringPathwayRFC();

  assert.equal(result.rfc, 13);
  assert.equal(result.stage, "implementing");
  assert.equal(result.score, 1);
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.failed, 0);
  assert.ok(result.scenarios.total >= 8);
  assert.match(result.candidate_fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(result.implementation_authorized, true);
  assert.equal(result.publication_authorized, false);
});

test("the authorized implementation is wired to Contact and its three modeled page owners", () => {
  const result = evaluatePublicHiringPathwayRFC();

  assert.equal(result.stage, "implementing");
  assert.equal(result.implementation_authorized, true);
  assert.equal(result.publication_authorized, false);
  assert.equal(result.checks.implemented_contact_surface, true);
  assert.equal(result.checks.single_secondary_path, true);
  assert.equal(result.checks.contact_page_owners_registered, true);
  assert.equal(result.checks.contact_page_owner_run, true);
});

test("one failed Contact owner invalidates the all-pass receipt", () => {
  const contactOwnerRun = JSON.parse(
    readFileSync(
      new URL(
        "../../evals/page-owners/runs/2026-09-04-contact-page-owners.json",
        import.meta.url
      ),
      "utf8"
    )
  );
  contactOwnerRun.assessments[0].verdict = "Fail";

  const result = evaluatePublicHiringPathwayRFC({ contactOwnerRun });

  assert.equal(result.checks.contact_page_owner_run, false);
  assert.equal(result.hard_failures.includes("contact_page_owner_run"), true);
});
