import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  compareObjective,
  currentLaunchCandidateSnapshot,
  evaluateSourceChecks,
  findOutcomeChainFailures,
  findPopulationScopeFailures,
  findProofProjectionSyncFailures,
  loadSuite,
  scoreAssessment as scoreAssessmentRaw,
  validateSuite
} from "../evals/lib/launch-readiness.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import {
  findSemanticInflation,
  semanticBoundaryMutations
} from "../evals/lib/semantic-boundaries.mjs";

const suite = loadSuite();
const scoreAssessment = (assessment, activeSuite = suite) =>
  scoreAssessmentRaw(assessment, activeSuite, { requireCommitBinding: false });

test("launch-readiness contract is internally consistent", () => {
  assert.deepEqual(validateSuite(suite), []);
  assert.equal(
    suite.judgeCriteria.reduce((sum, criterion) => sum + criterion.weight, 0),
    100
  );
  assert.ok(suite.humanGates.every((gate) => gate.agentMaySelfCertify === false));
  const chadLens = suite.judgeCriteria.find((criterion) => criterion.id === "chad-lens");
  assert.equal(chadLens.floor, 4);
  assert.equal(chadLens.minimumEvidence, 4);
  for (const lensId of ["margaret-morse-lens", "warren-sack-lens"]) {
    const lens = suite.judgeCriteria.find((criterion) => criterion.id === lensId);
    assert.equal(lens.floor, 4);
    assert.equal(lens.minimumEvidence, 4);
  }
  assert.equal(suite.blindSpotCoverage.length, 10);
  assert.equal(
    new Set(suite.blindSpotCoverage.map((item) => item.id)).size,
    suite.blindSpotCoverage.length
  );
});

test("source evaluator covers every declared source criterion", () => {
  const report = evaluateSourceChecks({ suite });
  assert.deepEqual(
    report.results.map((item) => item.id).sort(),
    suite.sourceChecks.map((item) => item.id).sort()
  );
  assert.equal(
    report.summary.hardGateTotal,
    suite.sourceChecks.filter((item) => item.kind === "hard-gate").length
  );
});

test("public Open fields describe uncertainty rather than approval workflow", () => {
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  assert.doesNotMatch(
    work,
    /\b(?:needs?|requires?)\s+(?:Jamie\s+)?approval\b|\bbefore\s+(?:launch|publication)\b/i
  );
});

test("a held canonical claim cannot return through a legacy proof selector", () => {
  const proofs = structuredClone(proofClaims);
  const proof = proofs.find((item) => item.id === "hje-revenue-growth-contribution");
  proof.status = "ready";
  proof.surfaces = ["homepage"];
  const failures = findProofProjectionSyncFailures({
    bank: knowledgeBank,
    proofs,
    selections: [{ surface: "homepage", proof }]
  });
  assert.ok(failures.some((item) => item.reason === "held canonical claim has public proof status"));
  assert.ok(failures.some((item) => item.reason === "held canonical claim is selected on a public surface"));
});

test("every active projection requires the full outcome chain", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON");
  delete claim.composition;
  assert.deepEqual(findOutcomeChainFailures(bank), [
    { claimId: claim.id, reason: "active projection lacks composition" }
  ]);
});

test("population claims must preserve recovered-surface and history boundaries", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === "CLM-WOWLIST-FULL-SOCIAL-POPULATION");
  claim.boundaries = ["The count is useful."];
  claim.antiClaims = ["Do not overstate the count."];
  const failures = findPopulationScopeFailures(bank).filter((item) => item.claimId === claim.id);
  assert.equal(failures.length, 2);
});

function completeAssessment({ verifier = "Jamie Burkart", score = 4 } = {}) {
  return {
    suiteId: suite.id,
    suiteVersion: suite.version,
    candidate: currentLaunchCandidateSnapshot(suite),
    judge: {
      model: "independent-eval-model",
      independentPass: true,
      scores: suite.judgeCriteria.map((criterion) => ({
        criterionId: criterion.id,
        score,
        evidence: Array.from(
          { length: criterion.minimumEvidence ?? 2 },
          (_, index) => `${criterion.id} evidence ${index + 1}`
        )
      }))
    },
    humanGates: suite.humanGates.map((gate) => ({
      gateId: gate.id,
      status: "confirmed",
      verifiedBy: verifier
    }))
  };
}

test("a complete independently evidenced assessment reaches 100", () => {
  const scored = scoreAssessment(completeAssessment(), suite);
  assert.equal(scored.valid, true);
  assert.equal(scored.weightedJudgeScore, 100);
  assert.equal(scored.judgeThresholdMet, true);
  assert.deepEqual(scored.pendingHumanGates, []);
});

test("an LLM cannot self-certify human approval", () => {
  const scored = scoreAssessment(completeAssessment({ verifier: "Codex agent" }), suite);
  assert.equal(scored.valid, false);
  assert.equal(scored.pendingHumanGates.length, suite.humanGates.length);
  assert.ok(scored.failures.every((failure) => /named human owner/.test(failure)));
});

test("launch assessments are bound to the governed candidate and suite", () => {
  const assessment = completeAssessment();
  assessment.candidate.contentFingerprint = "0".repeat(64);
  const scored = scoreAssessment(assessment, suite);
  assert.equal(scored.valid, false);
  assert.ok(scored.failures.some((failure) => /content fingerprint/i.test(failure)));
});

test("hostile semantic transformations fail closed", () => {
  const specimens = [
    "Silence was endorsement",
    "The proposal delivered the program",
    "The appropriation was received",
    "107 posts represent the complete lifetime history",
    "25 reactions means 25 unique people",
    "Jamie authored every tweet",
    "The Council reference was an endorsement",
    "Publicly available means publication permission",
    "Event responses proved attendance",
    "Source circulation was agreement",
    "Codex review counts as human validation"
  ].map((text, index) => ({ id: `mutation-${index + 1}`, text }));
  const failures = findSemanticInflation(specimens);
  assert.equal(failures.length, semanticBoundaryMutations.length);
  assert.deepEqual(
    failures.map((failure) => failure.mutation),
    semanticBoundaryMutations.map(([id]) => id)
  );
});

test("Chad's lens requires broad evidence and a perfect floor score", () => {
  const thin = completeAssessment();
  const submitted = thin.judge.scores.find((item) => item.criterionId === "chad-lens");
  submitted.evidence = ["homepage", "resume"];
  let scored = scoreAssessment(thin, suite);
  assert.equal(scored.valid, false);
  assert.ok(scored.failures.some((failure) => /chad-lens requires at least 4/.test(failure)));

  const almost = completeAssessment();
  almost.judge.scores.find((item) => item.criterionId === "chad-lens").score = 3;
  scored = scoreAssessment(almost, suite);
  assert.deepEqual(scored.judgeFloorFailures, ["chad-lens"]);
  assert.equal(scored.judgeThresholdMet, false);
});

test("Morse and Sack lenses require broad evidence and perfect floor scores", () => {
  for (const lensId of ["margaret-morse-lens", "warren-sack-lens"]) {
    const thin = completeAssessment();
    thin.judge.scores.find((item) => item.criterionId === lensId).evidence = [
      "homepage",
      "about"
    ];
    let scored = scoreAssessment(thin, suite);
    assert.equal(scored.valid, false);
    assert.ok(
      scored.failures.some((failure) =>
        failure.includes(`${lensId} requires at least 4`)
      )
    );

    const almost = completeAssessment();
    almost.judge.scores.find((item) => item.criterionId === lensId).score = 3;
    scored = scoreAssessment(almost, suite);
    assert.ok(scored.judgeFloorFailures.includes(lensId));
    assert.equal(scored.judgeThresholdMet, false);
  }
});

test("Morse and Sack lens contracts preserve source and anti-gaming boundaries", () => {
  const judgePrompt = readFileSync("evals/launch-readiness/judge-prompt.md", "utf8");
  for (const [lensId, path] of [
    ["margaret-morse-lens", "evals/launch-readiness/margaret-morse-lens.md"],
    ["warren-sack-lens", "evals/launch-readiness/warren-sack-lens.md"]
  ]) {
    const contract = readFileSync(path, "utf8");
    assert.match(contract, /historical evidence, not a claim/i);
    assert.match(contract, /Award 4 only/i);
    assert.match(contract, /Do not award 4/i);
    assert.match(judgePrompt, new RegExp(lensId));
  }
});

test("objective comparison accepts only lexicographic improvement", () => {
  const before = {
    summary: {
      hardGateFailures: 2,
      judgeFloorFailures: ["visual-proof"],
      weightedJudgeScore: 70,
      qualityTargetGaps: 2
    }
  };
  const after = {
    summary: {
      hardGateFailures: 1,
      judgeFloorFailures: ["visual-proof", "completion-confidence"],
      weightedJudgeScore: 60,
      qualityTargetGaps: 2
    }
  };
  const regression = {
    summary: {
      hardGateFailures: 3,
      judgeFloorFailures: [],
      weightedJudgeScore: 100,
      qualityTargetGaps: 0
    }
  };

  assert.equal(compareObjective(before, after).accepted, true);
  assert.equal(compareObjective(before, regression).accepted, false);
});
