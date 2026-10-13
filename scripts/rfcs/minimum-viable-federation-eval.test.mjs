import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateCanaryEvent,
  evaluateMinimumViableFederationRFC
} from "./minimum-viable-federation-eval.mjs";

const contract = {
  exchange: {
    allowed_kinds: ["canonical-record-reference", "correction-notice"],
    required_fields: [
      "event_id",
      "kind",
      "origin",
      "target",
      "purpose",
      "audience",
      "authority"
    ],
    origin_requires: ["repository", "record_id", "revision", "content_fingerprint"],
    authority_requires: ["source", "interpretation", "publication"],
    forbidden_public_fields: ["raw_source_body", "protected_locator", "private_identifier"],
    authority_must_be_distinct: true,
    authority_transferred: false
  },
  correction: {
    required_fields: ["correction_id", "supersedes_revision", "affected_projection_ids"],
    downstream_effect: "hold-projection",
    original_preserved: true
  },
  evidence_boundaries: {
    outbound_only_postures: ["outbound-only"],
    outcomes_requiring_response: [
      "acceptance",
      "adoption",
      "delivery",
      "deployment",
      "endorsement",
      "payment"
    ],
    unresolved_source_states: ["dataless", "inaccessible", "not-materialized"],
    unresolved_source_effect: "hold",
    duplicate_content_fingerprints_do_not_add_support: true,
    silence_is_approval: false
  },
  authority: {
    automation_publication_authority: "none",
    transport_is_canonical_authority: false
  }
};

function recordReference(overrides = {}) {
  return {
    event_id: "event-001",
    kind: "canonical-record-reference",
    origin: {
      repository: "canonical-subject-edition",
      record_id: "statement-001",
      revision: "source-commit",
      content_fingerprint: "source-fingerprint"
    },
    target: "semantic-evidence-graph",
    purpose: "evaluate a bounded public-safe claim proposal",
    audience: ["internal-editorial-review"],
    authority: {
      source: "origin-repository",
      interpretation: "receiving-repository",
      publication: "named-human-decision-owner"
    },
    intent: "transport",
    ...overrides
  };
}

test("a complete reference is accepted only as a reviewable proposal", () => {
  assert.deepEqual(evaluateCanaryEvent(contract, recordReference()), {
    decision: "accept-as-proposal",
    next_state: "received-proposal",
    authority_transferred: false,
    publication_authorized: false,
    reasons: []
  });
});

test("public exchange denies raw bodies and protected locators", () => {
  const event = recordReference({
    raw_source_body: "private words",
    protected_locator: "private://source"
  });

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "deny",
    reasons: [
      "forbidden-public-field:protected_locator",
      "forbidden-public-field:raw_source_body"
    ]
  });
});

test("an unpinned source reference is held before transport", () => {
  const event = recordReference();
  delete event.origin.revision;

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "hold",
    reasons: ["origin-field-missing:revision"]
  });
});

test("transport cannot become publication authority", () => {
  assert.deepEqual(
    evaluateCanaryEvent(contract, recordReference({ intent: "publish" })),
    {
      decision: "deny",
      reasons: ["automation-publication-authority-forbidden"]
    }
  );
});

test("source, interpretation, and publication authority cannot collapse into one actor", () => {
  const event = recordReference({
    authority: {
      source: "receiving-automation",
      interpretation: "receiving-automation",
      publication: "receiving-automation"
    }
  });

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "deny",
    reasons: ["authority-boundaries-collapsed"]
  });
});

test("outbound-only communication cannot establish adoption", () => {
  const event = recordReference({
    evidence_posture: "outbound-only",
    claim_assertion: "adoption"
  });

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "hold",
    reasons: ["outbound-only-cannot-establish:adoption"]
  });
});

test("a dataless source remains unresolved rather than becoming negative evidence", () => {
  const event = recordReference({ source_access_state: "dataless" });

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "hold",
    reasons: ["source-content-unavailable:dataless"]
  });
});

test("duplicate exports cannot establish independent corroboration", () => {
  const event = recordReference({
    corroboration_required: true,
    minimum_independent_sources: 2,
    source_content_fingerprints: ["same-fingerprint", "same-fingerprint"]
  });

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "hold",
    reasons: ["duplicate-content-fingerprints-cannot-establish-corroboration"]
  });
});

test("a correction holds every affected downstream projection", () => {
  const event = recordReference({
    kind: "correction-notice",
    correction_id: "correction-001",
    supersedes_revision: "source-commit",
    affected_projection_ids: ["portfolio-case-study", "public-record-summary"]
  });

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "hold-projection",
    correction_id: "correction-001",
    invalidated_projection_ids: ["portfolio-case-study", "public-record-summary"],
    original_preserved: true,
    authority_transferred: false,
    publication_authorized: false,
    reasons: []
  });
});

test("a correction without a downstream inventory remains held", () => {
  const event = recordReference({
    kind: "correction-notice",
    correction_id: "correction-001",
    supersedes_revision: "source-commit",
    affected_projection_ids: []
  });

  assert.deepEqual(evaluateCanaryEvent(contract, event), {
    decision: "hold",
    reasons: ["correction-field-empty:affected_projection_ids"]
  });
});

test("the repository contract and scenarios preserve the proposed human boundary", () => {
  const repositoryContract = JSON.parse(
    readFileSync(
      new URL("../../rfcs/0010-minimum-viable-federation-canary.contract.json", import.meta.url),
      "utf8"
    )
  );
  const result = evaluateMinimumViableFederationRFC({ contract: repositoryContract });

  assert.equal(result.stage, "proposed");
  assert.equal(result.score, 1);
  assert.equal(result.hard_failures.length, 0);
  assert.equal(result.scenarios.failed, 0);
  assert.equal(result.implementation_authorized, false);
  assert.equal(result.publication_authorized, false);
});
