import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  contractPath,
  evaluateForwardedHiringScenario
} from "./team-memory-forwarded-hiring-eval.mjs";

const contract = JSON.parse(readFileSync(contractPath, "utf8"));
const pageSource = readFileSync(contract.site.pageSourcePath, "utf8");
const opportunitySource = readFileSync(
  "docs/knowledge-bank/opportunities/source-backed-team-memory.md",
  "utf8"
);
const protectedSource = readFileSync(
  "docs/knowledge-bank/sources/protected-source-backed-memory-opportunity.md",
  "utf8"
);

function evaluate(
  candidate = pageSource,
  contractOverride = contract,
  sourceOverrides = {}
) {
  return evaluateForwardedHiringScenario({
    contract: contractOverride,
    pageSource: candidate,
    opportunitySource:
      sourceOverrides.opportunitySource ?? opportunitySource,
    protectedSource: sourceOverrides.protectedSource ?? protectedSource
  });
}

test("the forwarded hiring scenario clears every deterministic preflight", () => {
  const result = evaluate();

  assert.equal(result.deterministicVerdict, "pass", result.failures.join("\n"));
  assert.equal(result.judgeStatus, "ready-for-isolated-modeled-review");
});

test("the modeled reader receives exactly two anonymized artifacts and a local public site", () => {
  assert.deepEqual(contract.judge.allowedArtifactInputs, [
    "case-studies/2026-08-21/source-backed-team-memory/01-technical-leader-perspective.md",
    "case-studies/2026-08-21/source-backed-team-memory/03-technical-leader-conversational-voice.md"
  ]);
  assert.equal(contract.site.startPath, "/lab/source-backed-team-memory");
  assert.equal(contract.judge.repositoryAccess, false);
  assert.equal(contract.judge.navigation.publicRoutesOnly, true);
  assert.equal(contract.judge.navigation.mustBeginAtStartPath, true);
  assert.equal(contract.judge.navigation.mayInspectResume, true);
  assert.equal(contract.site.judgeDelivery, "harness-captured-local-render");
  assert.equal(
    contract.judge.navigation.judgeReceivesHarnessCapturedRenderings,
    true
  );
});

test("the hiring decision is a separate binary judge with critique first", () => {
  const decisionJudge = contract.judges.find(
    (judge) => judge.id === "decision-maker-hire-gate"
  );

  assert.ok(decisionJudge);
  assert.deepEqual(decisionJudge.outputOrder.slice(0, 2), [
    "critique",
    "primaryRisk"
  ]);
  assert.deepEqual(decisionJudge.verdicts, ["hire", "pass"]);
  assert.equal(decisionJudge.allCriteriaMustPass, true);
});

test("removing the explicit internal decision brief blocks the model call", () => {
  const candidate = pageSource.replace(
    /Internal decision brief/g,
    "Research notes"
  );
  const result = evaluate(candidate);

  assert.equal(result.checks.forwardable_decision_brief, false);
  assert.equal(result.judgeStatus, "preflight-blocked");
});

test("a solution-first proposal blocks the model call", () => {
  const candidate = pageSource.replace(
    /Start with the operating problem[\s\S]*?Then preserve what must continue/,
    "Begin with a team-memory prototype"
  );
  const result = evaluate(candidate);

  assert.equal(
    result.checks.diagnosis_and_stabilization_precede_memory,
    false
  );
  assert.equal(result.judgeStatus, "preflight-blocked");
});

test("removing the team-side owner blocks the model call", () => {
  const candidate = pageSource.replace(
    /one team-side owner/gi,
    "general participation"
  );
  const result = evaluate(candidate);

  assert.equal(result.checks.team_attention_is_explicit, false);
});

test("removing the resume route blocks the model call", () => {
  const candidate = pageSource.replace(/site\.resumePath/g, '"/work"');
  const result = evaluate(candidate);

  assert.equal(result.checks.resume_is_one_click_away, false);
});

test("removing the why-Jamie statement blocks the model call", () => {
  const candidate = pageSource.replace(/Why Jamie/g, "Background");
  const result = evaluate(candidate);

  assert.equal(result.checks.why_jamie_is_explicit, false);
});

test("removing pre-kickoff terms blocks the model call", () => {
  const candidate = pageSource.replace(/Before kickoff/g, "Later");
  const result = evaluate(candidate);

  assert.equal(result.checks.success_and_pre_kickoff_are_explicit, false);
});

test("a repo-wide or transcript-reading judge fails closed", () => {
  const unsafeContract = structuredClone(contract);
  unsafeContract.judge.repositoryAccess = true;
  unsafeContract.judge.prohibitedInputs = unsafeContract.judge.prohibitedInputs.filter(
    (item) => item !== "raw or working transcripts"
  );
  const result = evaluate(pageSource, unsafeContract);

  assert.equal(result.checks.judge_input_boundary_is_exact, false);
});

test("an uncalibrated synthetic hire remains advisory", () => {
  assert.equal(contract.calibration.status, "required");
  assert.equal(contract.calibration.releaseAuthority, "advisory-only");
  assert.equal(contract.calibration.realWorldDecisionClaimed, false);
});

test("a warm real-world reply advances only to conversation invited", () => {
  const result = evaluate();

  assert.equal(result.checks.real_world_feedback_stage_is_calibrated, true);
  assert.equal(result.checks.real_world_feedback_preserves_unknowns, true);
  assert.equal(result.checks.real_world_feedback_does_not_validate_modeled_hire, true);
  assert.equal(result.realWorldFeedback.stage, "conversation-invited");
  assert.equal(result.realWorldFeedback.commercialEffect, "none");
});

test("a warm reply cannot be promoted to hiring authorization", () => {
  const unsafeContract = structuredClone(contract);
  unsafeContract.realWorldFeedback = {
    ...unsafeContract.realWorldFeedback,
    observedStage: "commercial-authorization",
    validatesModeledHire: true
  };
  const result = evaluate(pageSource, unsafeContract);

  assert.equal(result.checks.real_world_feedback_stage_is_calibrated, false);
  assert.equal(result.checks.real_world_feedback_does_not_validate_modeled_hire, false);
  assert.equal(result.judgeStatus, "preflight-blocked");
});

test("private circumstance detail blocks the public-safe feedback record", () => {
  const unsafeOpportunity = `${opportunitySource}\nprivate_family_circumstances: retained\n`;
  const result = evaluate(pageSource, contract, {
    opportunitySource: unsafeOpportunity
  });

  assert.equal(result.checks.real_world_feedback_is_summary_only, false);
  assert.equal(result.judgeStatus, "preflight-blocked");
});
