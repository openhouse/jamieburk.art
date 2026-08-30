import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateOperatingControlPlane,
  loadCandidate
} from "./operating-control-plane-eval.mjs";

test("the Knowledge Wiki operating control plane passes every deterministic gate", () => {
  const result = evaluateOperatingControlPlane(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

test("the evaluator reports all eleven executed gates without making model calls", () => {
  const result = evaluateOperatingControlPlane(loadCandidate());
  assert.equal(result.checks, 11);
  assert.equal(result.modelCallsMade, 0);
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateOperatingControlPlane(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "source coverage cannot equate access with consent or publication authority",
  (candidate) => {
    candidate.contract.sourceCoverage.accessIsConsent = true;
  },
  /access, consent, and publication authority/
);

expectFailure(
  "a proposal cannot silently become authority or an outcome",
  (candidate) => {
    candidate.contract.operatingStates = candidate.contract.operatingStates.filter(
      (state) => state !== "authority"
    );
  },
  /operating states/
);

expectFailure(
  "perishable health cannot be represented by one permanent green state",
  (candidate) => {
    candidate.contract.healthBands = ["green"];
  },
  /candidate, situational, and strategic health/
);

expectFailure(
  "an evidence-starved model reader must be able to abstain",
  (candidate) => {
    candidate.contract.modelReview.allowedVerdicts = ["PASS", "FAIL"];
  },
  /ABSTAIN_INSUFFICIENT_EVIDENCE/
);

expectFailure(
  "interpretive review cannot run before deterministic eligibility",
  (candidate) => {
    candidate.contract.evaluationOrder = [
      "fictionalized-model-review",
      "deterministic-eligibility"
    ];
  },
  /deterministic eligibility, mutation resistance/
);

for (const evaluationOrder of [
  ["deterministic-eligibility", "fictionalized-model-review", "human-decision"],
  ["deterministic-eligibility", "fictionalized-model-review", "mutation-resistance", "human-decision"]
]) {
  expectFailure(
    `model review requires prior mutation resistance: ${evaluationOrder.join(" -> ")}`,
    (candidate) => { candidate.contract.evaluationOrder = evaluationOrder; },
    /mutation resistance/
  );
}

expectFailure(
  "an exploring proposal cannot count as observed adoption",
  (candidate) => { candidate.contract.authority.actualAdoptionObserved = true; },
  /exploring instrument/
);

expectFailure(
  "situated voice cannot waive corpus sufficiency",
  (candidate) => { candidate.contract.situatedVoice.corpusSufficiencyRequired = false; },
  /corpus sufficiency/
);

expectFailure(
  "exact-candidate review cannot accept stale receipts",
  (candidate) => { candidate.contract.exactCandidate.staleReceiptsRejected = false; },
  /reject stale receipts/
);

expectFailure(
  "the colophon cannot lose the human decision owner",
  (candidate) => { candidate.colophon = candidate.colophon.replace("Jamie decides what is published", "The model makes the decision"); },
  /Jamie's decision authority/
);

expectFailure(
  "the concise colophon must provide a route to the detailed method",
  (candidate) => { candidate.colophon = candidate.colophon.replaceAll("/lab/source-backed-team-memory", "/about"); },
  /detailed method/
);

expectFailure(
  "the public page cannot lose the operating control explanation",
  (candidate) => {
    candidate.labCopy = candidate.labCopy.replace("## Operating Control Plane", "## More");
  },
  /public method does not explain the operating control plane/
);

expectFailure(
  "the maintained method cannot lose capacity and handoff as outcome measures",
  (candidate) => {
    candidate.method = candidate.method.replaceAll("handoff", "transfer");
  },
  /capacity and handoff measures/
);
