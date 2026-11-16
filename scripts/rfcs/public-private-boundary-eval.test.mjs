import assert from "node:assert/strict";
import test from "node:test";

let evaluateEngagementInformationPlacement;
try {
  ({ evaluateEngagementInformationPlacement } = await import(
    "./public-engagement-pathway-eval.mjs"
  ));
} catch {
  // The first red run fails by assertion until the placement evaluator exists.
}

const policy = {
  public: {
    allowed_content_classes: [
      "general-offer",
      "problem-types",
      "bounded-process",
      "artifact-examples",
      "continuation-boundary",
      "alternate-contact-pathways"
    ],
    forbidden_content_classes: [
      "named-relationship",
      "direct-quotation",
      "relationship-state",
      "negotiation-state",
      "private-rate",
      "presumed-intent",
      "private-source-locator"
    ]
  },
  private_sidecar: {
    allowed_content_classes: [
      "named-relationship",
      "relationship-chronology",
      "commercial-status",
      "interpretation",
      "agreement-draft",
      "source-pointer",
      "participant-restricted-call-record"
    ],
    allowed_representations: [
      "governed-pointer",
      "bounded-derived-record",
      "bounded-complete-repaired-transcript"
    ]
  },
  source_vault: {
    required_content_classes: [
      "raw-transcript",
      "message-database",
      "account-export",
      "credential",
      "authenticated-session",
      "unrestricted-source-binary"
    ]
  }
};

function evaluator() {
  assert.equal(typeof evaluateEngagementInformationPlacement, "function");
  return evaluateEngagementInformationPlacement;
}

test("a generalized offer can enter public review without becoming published", () => {
  const actual = evaluator()(policy, {
    requested_destination: "public",
    content_classes: [
      "general-offer",
      "problem-types",
      "bounded-process",
      "artifact-examples",
      "continuation-boundary",
      "alternate-contact-pathways"
    ],
    public_backlink_to_private: false,
    has_separate_publication_packet: true
  });

  assert.deepEqual(actual, {
    decision: "ready-for-public-review",
    destination: "public",
    publication_authorized: false,
    reasons: []
  });
});

test("named relationship provenance and a direct quotation are denied from public", () => {
  const actual = evaluator()(policy, {
    requested_destination: "public",
    content_classes: ["general-offer", "named-relationship", "direct-quotation"],
    public_backlink_to_private: false,
    has_separate_publication_packet: true
  });

  assert.deepEqual(actual, {
    decision: "deny",
    destination: "private-sidecar",
    publication_authorized: false,
    reasons: [
      "public-content-forbidden:direct-quotation",
      "public-content-forbidden:named-relationship"
    ]
  });
});

test("governed relationship interpretation belongs in the private sidecar", () => {
  const actual = evaluator()(policy, {
    requested_destination: "private-sidecar",
    content_classes: ["relationship-chronology", "commercial-status", "interpretation"],
    representation: "bounded-derived-record",
    source_registered: true
  });

  assert.deepEqual(actual, {
    decision: "ready-for-private-intake",
    destination: "private-sidecar",
    publication_authorized: false,
    reasons: []
  });
});

test("a governed private pointer may point outward to a stable public id", () => {
  const actual = evaluator()(policy, {
    requested_destination: "private-sidecar",
    content_classes: ["source-pointer"],
    representation: "governed-pointer",
    source_registered: true,
    public_projection_id: "method.source-backed-team-memory"
  });

  assert.deepEqual(actual, {
    decision: "ready-for-private-intake",
    destination: "private-sidecar",
    publication_authorized: false,
    reasons: []
  });
});

test("raw transcripts are routed out of private Git to source custody", () => {
  const actual = evaluator()(policy, {
    requested_destination: "private-sidecar",
    content_classes: ["raw-transcript"],
    representation: "exact-copy",
    source_registered: true
  });

  assert.deepEqual(actual, {
    decision: "route-to-source-vault",
    destination: "source-vault",
    publication_authorized: false,
    reasons: ["source-vault-content-cannot-enter-private-git:raw-transcript"]
  });
});

test("a participant-restricted call record is held without an explicit complete-record mandate", () => {
  const actual = evaluator()(policy, {
    requested_destination: "private-sidecar",
    content_classes: ["participant-restricted-call-record"],
    representation: "bounded-complete-repaired-transcript",
    source_registered: true,
    owner_preservation_authorized: false,
    sole_private_access_verified: true,
    participant_restrictions_retained: true,
    complete_record_accounted_for: true
  });

  assert.deepEqual(actual, {
    decision: "hold",
    destination: "private-sidecar",
    publication_authorized: false,
    reasons: ["private-complete-record-authorization-required"]
  });
});

test("an explicitly authorized complete repair may enter the private sidecar without becoming public", () => {
  const actual = evaluator()(policy, {
    requested_destination: "private-sidecar",
    content_classes: ["participant-restricted-call-record"],
    representation: "bounded-complete-repaired-transcript",
    source_registered: true,
    owner_preservation_authorized: true,
    sole_private_access_verified: true,
    participant_restrictions_retained: true,
    complete_record_accounted_for: true
  });

  assert.deepEqual(actual, {
    decision: "ready-for-private-intake",
    destination: "private-sidecar",
    publication_authorized: false,
    reasons: []
  });
});

test("credentials are denied from both Git repositories", () => {
  const actual = evaluator()(policy, {
    requested_destination: "public",
    content_classes: ["credential"],
    public_backlink_to_private: false,
    has_separate_publication_packet: true
  });

  assert.deepEqual(actual, {
    decision: "deny",
    destination: "source-vault",
    publication_authorized: false,
    reasons: ["source-vault-content-cannot-enter-git:credential"]
  });
});

test("a public backlink to private topology is denied", () => {
  const actual = evaluator()(policy, {
    requested_destination: "public",
    content_classes: ["general-offer"],
    public_backlink_to_private: true,
    has_separate_publication_packet: true
  });

  assert.deepEqual(actual, {
    decision: "deny",
    destination: "private-sidecar",
    publication_authorized: false,
    reasons: ["public-private-backlink-forbidden"]
  });
});
