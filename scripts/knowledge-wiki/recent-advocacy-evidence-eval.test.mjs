import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateRecentAdvocacyEvidence,
  loadCandidate
} from "./recent-advocacy-evidence-eval.mjs";

test("the governed July-August advocacy candidate passes", () => {
  const result = evaluateRecentAdvocacyEvidence(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateRecentAdvocacyEvidence(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "report review cannot be inflated into authorship or methods validation",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-NYCAC-SBU-REPORT-REVIEW-2026"
    );
    claim.internalClaim = "Jamie co-authored and independently validated the report methods.";
  },
  /inflates bounded report review/
);

expectFailure(
  "a scheduled speaking slot cannot become public delivery proof",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-NYCAC-SBU-RALLY-SPEAKING-2026"
    );
    claim.status = "confirmed";
    claim.projections[0].status = "active";
    claim.projections[0].surfaces = ["/work/fair-rent-nyc"];
  },
  /speaking claim must remain use-with-care and held/
);

expectFailure(
  "office-staff coordination cannot become elected-official endorsement",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026"
    );
    claim.antiClaims = claim.antiClaims.filter(
      (item) => !/endors/i.test(item)
    );
  },
  /endorsement boundary/
);

expectFailure(
  "protected correspondence cannot expose an email or filesystem locator",
  (candidate) => {
    candidate.closeReading += "\n/private/source/from-person@example.com\n";
  },
  /private locator or email/
);

expectFailure(
  "the report claim requires public report credit and private incorporation evidence",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-NYCAC-SBU-REPORT-REVIEW-2026"
    );
    claim.evidence = claim.evidence.filter(
      (item) => item.relationship !== "private-support"
    );
  },
  /public credit and protected incorporation evidence/
);

expectFailure(
  "the destination map must keep four repository authorities distinct",
  (candidate) => {
    candidate.closeReading = candidate.closeReading.replace(
      "openhouse/jamie-burkart-public-record",
      "openhouse/commercial-rent-stabilization-public-support"
    );
  },
  /repository destination map/
);

expectFailure(
  "the review window cannot silently drift beyond thirty days",
  (candidate) => {
    candidate.data.review_window.start = "2026-06-01";
  },
  /review window/
);

expectFailure(
  "public-event metadata cannot be represented as a named speaker transcript",
  (candidate) => {
    candidate.data.findings.public_speaking.evidence_state =
      "public-transcript-recovered";
  },
  /public-speaking evidence state/
);

expectFailure(
  "a future coordination meeting cannot be represented as already occurred",
  (candidate) => {
    candidate.data.findings.elected_office_coordination.future_meeting_state =
      "occurred";
  },
  /future meeting state/
);
