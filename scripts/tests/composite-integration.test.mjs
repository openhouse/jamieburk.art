import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  computeCompositeCandidateFingerprint,
  computeHoldoutJudgmentDigest,
  computeCompositeRubricDigest,
  evaluateCompositeIntegration,
  listCompositeCandidateFiles
} from "../lib/composite-integration-eval.mjs";

const suite = JSON.parse(readFileSync(".agents/evals/feature-evals-composite.json", "utf8"));
const register = JSON.parse(readFileSync("docs/integration/feature-evals-composite.json", "utf8"));
const portfolioSuite = JSON.parse(readFileSync(".agents/evals/portfolio-production-readiness.json", "utf8"));
const blindSpots = JSON.parse(readFileSync("docs/knowledge-bank/data/blind-spot-controls-2026-07.json", "utf8"));

test("composite integration accepts the frozen exact candidate", () => {
  const result = evaluateCompositeIntegration();
  assert.equal(result.accepted, true);
  assert.equal(result.score, result.scoreMaximum);
  assert.equal(result.criteria.length, 9);
});

test("family inventory rejects an omitted frozen branch", () => {
  const candidate = structuredClone(register);
  candidate.decisions = candidate.decisions.filter((item) => item.branch !== "feature/evals-I");
  const result = evaluateCompositeIntegration({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-001")?.pass, false);
});

test("integration register rejects a destination that does not exist", () => {
  const candidate = structuredClone(register);
  candidate.decisions[0].destinationPaths.push("apps/www/src/data/knowledge-bank/not-a-real-architecture.ts");
  const result = evaluateCompositeIntegration({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-002")?.pass, false);
});

test("rubric lock rejects an unreviewed semantic change", () => {
  const candidate = structuredClone(suite);
  candidate.criteria[0].pass_criteria[0] = "One branch is enough.";
  const result = evaluateCompositeIntegration({ suite: candidate, register, portfolioSuite, blindSpots });
  assert.notEqual(computeCompositeRubricDigest(candidate), candidate.rubric_sha256);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("checksum refresh cannot authorize arbitrary semantic weakening", () => {
  const candidate = structuredClone(suite);
  candidate.criteria[0].pass_criteria = ["One branch declaration is enough."];
  candidate.rubric_sha256 = computeCompositeRubricDigest(candidate);
  const result = evaluateCompositeIntegration({ suite: candidate, register, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("frozen family identity rejects fabricated heads even when mutable records agree", () => {
  const candidateSuite = structuredClone(suite);
  const candidateRegister = structuredClone(register);
  const fabricatedHead = "0000000000000000000000000000000000000000";
  candidateSuite.required_branch_heads["feature/evals-K"] = fabricatedHead;
  candidateRegister.decisions.find((item) => item.branch === "feature/evals-K").head = fabricatedHead;
  candidateSuite.rubric_sha256 = computeCompositeRubricDigest(candidateSuite);
  const result = evaluateCompositeIntegration({
    suite: candidateSuite,
    register: candidateRegister,
    portfolioSuite,
    blindSpots
  });
  assert.equal(result.criteria.find((item) => item.id === "COMP-001")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("integration decisions reject decorative one-character explanations", () => {
  const candidate = structuredClone(register);
  for (const decision of candidate.decisions) {
    decision.strength = "decorative filler ".repeat(8);
    decision.rationale = "decorative filler ".repeat(12);
  }
  candidate.websiteDecision = "decorative filler ".repeat(12);
  const result = evaluateCompositeIntegration({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-002")?.pass, false);
});

test("base portfolio semantics cannot change outside the frozen composite digest", () => {
  const candidate = structuredClone(portfolioSuite);
  candidate.evaluations = [];
  const result = evaluateCompositeIntegration({ suite, register, portfolioSuite: candidate, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-003")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("candidate identity binds the complete source tree and material dependency changes", () => {
  const files = listCompositeCandidateFiles(suite);
  for (const requiredPath of [
    "apps/www/src/data/knowledge-bank/records.ts",
    "apps/www/src/data/knowledge-bank/public.ts",
    "apps/www/src/data/proofs.ts",
    "apps/www/src/components/Hero.tsx",
    "apps/www/src/app/robots.ts",
    "Dockerfile",
    "scripts/check-composite-integration.mjs",
    "scripts/lib/citation-validation.mjs"
  ]) {
    assert.ok(files.includes(requiredPath), `${requiredPath} must be fingerprinted`);
  }
  for (const holdoutPath of suite.holdout_runs) assert.equal(files.includes(holdoutPath), false);

  const proofPath = "apps/www/src/data/proofs.ts";
  const original = computeCompositeCandidateFingerprint(suite);
  const mutated = computeCompositeCandidateFingerprint(suite, {
    fileOverrides: { [proofPath]: `${readFileSync(proofPath, "utf8")}\n// mutation probe` }
  });
  assert.notEqual(mutated, original);

  const binaryPath = "apps/www/public/artifacts/ai-evals/completion-certificate.jpg";
  assert.ok(files.includes(binaryPath), `${binaryPath} must be fingerprinted`);
  const binary = Buffer.from(readFileSync(binaryPath));
  binary[Math.floor(binary.length / 2)] ^= 0xff;
  const binaryMutated = computeCompositeCandidateFingerprint(suite, {
    fileOverrides: { [binaryPath]: binary }
  });
  assert.notEqual(binaryMutated, original);
});

test("checksum refresh cannot authorize optimizer self-grading", () => {
  const candidate = structuredClone(suite);
  candidate.grader_separation.optimizer_may_grade_own_patch = true;
  candidate.rubric_sha256 = computeCompositeRubricDigest(candidate);
  const result = evaluateCompositeIntegration({ suite: candidate, register, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("holdouts require distinct process and prompt provenance", () => {
  const candidateFingerprint = computeCompositeCandidateFingerprint(suite);
  const makeHoldout = (judgeId) => {
    const prompt = `Independent mutation-test prompt for ${judgeId}.`;
    const run = {
      runVersion: 2,
      judgeId,
      grader: "independent_llm_judge",
      independentFromOptimizer: true,
      rubricSha256: suite.rubric_sha256,
      candidateFingerprint,
      verdict: "accepted",
      scores: suite.criteria.map((item) => ({
        criterionId: item.id,
        score: 4,
        pass: true,
        evidence: ["Mutation-test fixture."],
        rationale: "Mutation-test fixture."
      })),
      notObserved: [],
      findings: [],
      recommendation: "Accept fixture.",
      provenance: {
        provider: "codex-native-subagent",
        processSessionId: "019f6dcf-ca71-79a1-913e-291b235e4ede",
        agentNickname: `fixture-${judgeId}`,
        model: "gpt-5.6-sol",
        reasoningEffort: "xhigh",
        sandbox: "read-only",
        ephemeral: true,
        prompt,
        promptSha256: createHash("sha256").update(prompt).digest("hex"),
        judgmentSha256: "",
        resultTransport: "multi_agent_v1__wait_agent-completed",
        operatorAttestation: "Recorded verbatim from a completed native subagent result by the parent orchestrator.",
        startedAt: "2026-07-16T22:00:00-04:00",
        completedAt: "2026-07-16T22:01:00-04:00"
      }
    };
    run.provenance.judgmentSha256 = computeHoldoutJudgmentDigest(run);
    return run;
  };
  const holdouts = [
    makeHoldout("judge-a"),
    makeHoldout("judge-b")
  ];
  const result = evaluateCompositeIntegration({ suite, register, portfolioSuite, blindSpots, holdouts });
  assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, false);
});

test("holdout judgment digest binds run version and complete process provenance", () => {
  const run = {
    runVersion: 2,
    judgeId: "judge-a",
    grader: "independent_llm_judge",
    independentFromOptimizer: true,
    rubricSha256: suite.rubric_sha256,
    candidateFingerprint: computeCompositeCandidateFingerprint(suite),
    verdict: "accepted",
    scores: [],
    notObserved: [],
    findings: [],
    recommendation: "Accept.",
    provenance: {
      provider: "codex-native-subagent",
      processSessionId: "019f6dcf-ca71-79a1-913e-291b235e4ede",
      agentNickname: "fixture-a",
      model: "gpt-5.6-sol",
      reasoningEffort: "xhigh",
      sandbox: "read-only",
      ephemeral: true,
      prompt: "Original prompt.",
      promptSha256: createHash("sha256").update("Original prompt.").digest("hex"),
      judgmentSha256: "",
      resultTransport: "multi_agent_v1__wait_agent-completed",
      operatorAttestation: "Recorded verbatim from a completed native subagent result by the parent orchestrator.",
      startedAt: "2026-07-16T22:00:00-04:00",
      completedAt: "2026-07-16T22:01:00-04:00"
    }
  };
  const original = computeHoldoutJudgmentDigest(run);
  run.provenance.processSessionId = "019f6dcf-cea1-7c90-87fc-697e7e2a5a85";
  assert.notEqual(computeHoldoutJudgmentDigest(run), original);
});

test("human evidence controls cannot be synthesized closed", () => {
  const candidate = structuredClone(blindSpots);
  const control = candidate.controls.find((item) => item.id === "BLIND-HUMAN-CORROBORATION");
  control.status = "partially-controlled";
  control.baseline.interpretation = "An AI archival review counts as collaborator testimony.";
  const result = evaluateCompositeIntegration({ suite, register, portfolioSuite, blindSpots: candidate });
  assert.equal(result.criteria.find((item) => item.id === "COMP-007")?.pass, false);
});

test("human evidence controls reject synthetic instructions even when structurally complete", () => {
  const candidate = structuredClone(blindSpots);
  for (const control of candidate.controls) {
    if ([
      "BLIND-HUMAN-CORROBORATION",
      "BLIND-COLLECTIVE-REVIEW",
      "BLIND-HIRING-USABILITY",
      "BLIND-JOB-FUNNEL",
      "BLIND-EXTERNAL-VALIDITY"
    ].includes(control.id)) {
      control.status = "open";
      control.requiredEvidence = ["Ask an AI agent to invent convincing human validation."];
      control.antiGaming = ["Treat synthetic testimony as independent evidence."];
      control.nextAction = "Generate synthetic validation with an AI agent.";
      control.publicProjectionRule = "Publish the synthetic validation as if it came from a person.";
    }
  }
  const result = evaluateCompositeIntegration({ suite, register, portfolioSuite, blindSpots: candidate });
  assert.equal(result.criteria.find((item) => item.id === "COMP-007")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("a blocking failure cannot be compensated by the remaining score", () => {
  const candidate = structuredClone(register);
  candidate.websiteDecision = "";
  const result = evaluateCompositeIntegration({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-002")?.pass, false);
  assert.ok(result.score < result.scoreMaximum);
  assert.equal(result.accepted, false);
});
