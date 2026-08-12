import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  evaluateCommercialRentAdvocacy,
  loadCommercialRentAdvocacyCandidate
} from "../lib/commercial-rent-advocacy-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const evaluation = JSON.parse(
  fs.readFileSync(
    path.join(repoRoot, "evals/pre-launch/commercial-rent-advocacy-2026-08.json"),
    "utf8"
  )
);

test("the August advocacy eval declares all ten hard gates", () => {
  assert.equal(evaluation.id, "commercial-rent-advocacy-2026-08");
  assert.deepEqual(
    evaluation.criteria.map(({ id }) => id),
    ["CRA-001", "CRA-002", "CRA-003", "CRA-004", "CRA-005", "CRA-006", "CRA-007", "CRA-008", "CRA-009", "CRA-010"]
  );
  assert.ok(evaluation.criteria.every(({ type }) => type === "hard-gate"));
});

test("the exact source-return candidate passes every gate", () => {
  const result = evaluateCommercialRentAdvocacy(loadCommercialRentAdvocacyCandidate());
  assert.equal(result.accepted, true, result.failed.join(", "));
  assert.deepEqual(result.metrics, {
    sources: 6,
    observations: 9,
    claims: 5,
    relations: 1,
    inquiries: 4,
    heldProjections: 6,
    disallowedProjections: 1
  });
});

test("the source return is integrated while all new projections stay off the website", () => {
  for (const id of [
    "CLM-CRS-JAMIE-REPORT-REVIEW-2026",
    "CLM-CRS-JAMIE-PUBLIC-ADVOCACY-2026-07-29",
    "CLM-CRS-JAMIE-OFFICIAL-STAFF-COORDINATION-2026",
    "CLM-CRS-NBC-FOOTAGE-REQUEST-2026",
    "CLM-CRS-PUBLISHED-PRESS-COVERAGE-NOT-RECOVERED-2026"
  ]) {
    const claim = knowledgeBank.claims.find((item) => item.id === id);
    assert.ok(claim, id);
    assert.ok(claim.projections.every(({ status }) => ["hold", "disallowed"].includes(status)));
  }

  const relation = knowledgeBank.agencyRelations.find(
    ({ id }) => id === "REL-JAMIE-CRS-SBU-REPORT-LAUNCH-SPEECH-2026"
  );
  assert.equal(relation?.action, "spoke-at");
  assert.equal(relation?.creditScope, "individual");
  assert.match(relation?.boundaries.join(" ") ?? "", /not authorship of the report/i);
});

const mutationCases = [
  {
    name: "prepared remarks substituted for the delivered recording",
    expectedFailure: "CRA-001",
    mutate(candidate) {
      const claim = candidate.claims.find(({ id }) => id === "CLM-CRS-JAMIE-PUBLIC-ADVOCACY-2026-07-29");
      claim.evidence = claim.evidence.filter(({ sourceId }) => sourceId !== "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29");
    }
  },
  {
    name: "run of show promoted to official attendance",
    expectedFailure: "CRA-002",
    mutate(candidate) {
      const source = candidate.sources.find(({ id }) => id === "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11");
      source.doesNotEstablish = source.doesNotEstablish.filter((item) => item !== "final official attendance");
    }
  },
  {
    name: "staff coordination rewritten as elected-official work",
    expectedFailure: "CRA-003",
    mutate(candidate) {
      const claim = candidate.claims.find(({ id }) => id === "CLM-CRS-JAMIE-OFFICIAL-STAFF-COORDINATION-2026");
      claim.internalClaim = "Jamie worked directly with city and state elected officials during the reviewed period.";
    }
  },
  {
    name: "future meeting rewritten as completed",
    expectedFailure: "CRA-004",
    mutate(candidate) {
      const inquiry = candidate.researchInquiries.find(({ id }) => id === "INQ-CRS-STATE-STAFF-CADENCE-2026");
      inquiry.limitations = inquiry.limitations.filter((item) => item !== "The August 26 meeting was future-dated at review time.");
    }
  },
  {
    name: "footage request promoted to coverage",
    expectedFailure: "CRA-005",
    mutate(candidate) {
      const claim = candidate.claims.find(({ id }) => id === "CLM-CRS-PUBLISHED-PRESS-COVERAGE-NOT-RECOVERED-2026");
      claim.status = "confirmed";
      claim.projections[0].status = "active";
    }
  },
  {
    name: "review acknowledgment promoted to authorship",
    expectedFailure: "CRA-006",
    mutate(candidate) {
      const claim = candidate.claims.find(({ id }) => id === "CLM-CRS-JAMIE-REPORT-REVIEW-2026");
      claim.antiClaims = claim.antiClaims.filter((item) => item !== "Jamie authored Empty Storefronts, High Rents");
    }
  },
  {
    name: "descriptive association loses causal boundaries",
    expectedFailure: "CRA-007",
    mutate(candidate) {
      const observation = candidate.observations.find(({ id }) => id === "OBS-CRS-REPORT-REVIEW-BOUNDARY-2026");
      observation.limitations = ["The report is conclusive."];
    }
  },
  {
    name: "public event promoted to media clearance",
    expectedFailure: "CRA-008",
    mutate(candidate) {
      const source = candidate.sources.find(({ id }) => id === "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29");
      source.media.rightsStatus = "cleared";
      source.media.consentStatus = "cleared";
      source.media.publicDisplayStatus = "cleared";
    }
  },
  {
    name: "held portfolio wording silently activated",
    expectedFailure: "CRA-009",
    mutate(candidate) {
      const claim = candidate.claims.find(({ id }) => id === "CLM-CRS-JAMIE-PUBLIC-ADVOCACY-2026-07-29");
      claim.projections[0].status = "active";
    }
  },
  {
    name: "live social post promoted to completed coalition credit",
    expectedFailure: "CRA-010",
    mutate(candidate) {
      const source = candidate.sources.find(({ id }) => id === "SRC-CRS-ACTION-LAB-INSTAGRAM-2026-08-11");
      source.doesNotEstablish = source.doesNotEstablish.filter(
        (item) => item !== "NYC Artist Coalition as a completed collaborator at capture time"
      );
    }
  }
];

for (const mutation of mutationCases) {
  test(`advocacy holdout rejects ${mutation.name}`, () => {
    const candidate = loadCommercialRentAdvocacyCandidate();
    mutation.mutate(candidate);
    const result = evaluateCommercialRentAdvocacy(candidate);
    assert.equal(result.accepted, false);
    assert.ok(result.failed.includes(mutation.expectedFailure));
  });
}

test("public-safe documentation contains no authenticated or local source locator", () => {
  const files = [
    "docs/knowledge-bank/sources/empty-storefronts-high-rents-2026.md",
    "docs/knowledge-bank/sources/action-lab-commercial-rent-social-post-2026-08-11.md",
    "docs/knowledge-bank/events/commercial-rent-empty-storefronts-report-launch-2026-07-29.md",
    "docs/knowledge-bank/research-runs/commercial-rent-advocacy-source-return-2026-08-12.md",
    "docs/knowledge-bank/indexes/commercial-rent-ecosystem-update-map-2026-08-12.md",
    "docs/knowledge-bank/evaluations/commercial-rent-advocacy-hill-climb-2026-08-12.md"
  ];
  const text = files
    .map((file) => fs.readFileSync(path.join(repoRoot, file), "utf8"))
    .join("\n");

  assert.doesNotMatch(text, /\/Users\//);
  assert.doesNotMatch(text, /Mobile Documents/);
  assert.doesNotMatch(text, /otter\.ai/i);
  assert.doesNotMatch(text, /docs\.google\.com/i);
  assert.doesNotMatch(text, /mail\.google\.com/i);
  assert.doesNotMatch(text, /@gmail\.com/i);
});
