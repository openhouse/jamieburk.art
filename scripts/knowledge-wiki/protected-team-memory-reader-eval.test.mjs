import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  contractPath,
  evaluateProtectedTeamMemoryProposal
} from "./protected-team-memory-reader-eval.mjs";

const contract = JSON.parse(readFileSync(contractPath, "utf8"));
const candidatePage = readFileSync(contract.targetPath, "utf8");
const candidateSupportingCopy = readFileSync(
  contract.supportingPublicCopyPath,
  "utf8"
);

function evaluateCandidate(pageSource = candidatePage, contractOverride = contract) {
  return evaluateProtectedTeamMemoryProposal({
    contract: contractOverride,
    pageSource,
    supportingCopy: candidateSupportingCopy
  });
}

test("the exact team-memory proposal clears the protected-reader scenario preflight", () => {
  const run = spawnSync(
    process.execPath,
    ["scripts/knowledge-wiki/protected-team-memory-reader-eval.mjs"],
    { cwd: process.cwd(), encoding: "utf8" }
  );

  assert.equal(
    run.status,
    0,
    `expected the scenario preflight to pass\n${run.stdout}${run.stderr}`
  );
});

test("a generic statement that private transcripts stay outside the public memory is safe", () => {
  const evaluation = evaluateProtectedTeamMemoryProposal({
    contract,
    pageSource:
      "Private transcripts remain outside the public memory and are never supplied to the reader.",
    supportingCopy: ""
  });

  assert.equal(evaluation.checks.public_copy_preserves_private_boundary, true);
});

test("removing the fast-growth knowledge problem blocks modeled review", () => {
  const pageSource = candidatePage.replace(
    /When a team grows faster than its context can travel[\s\S]*?harder to revisit with confidence\./,
    "A general knowledge method for many settings."
  );
  const evaluation = evaluateCandidate(pageSource);

  assert.equal(evaluation.checks.scenario_is_problem_first, false);
  assert.equal(evaluation.judgeStatus, "preflight-blocked");
});

test("removing diagnosis and operating stabilization blocks modeled review", () => {
  const pageSource = candidatePage.replace(
    /Start with the operating problem[\s\S]*?Then preserve what must continue/,
    "Begin with a team-memory prototype"
  );
  const evaluation = evaluateCandidate(pageSource);

  assert.equal(evaluation.checks.diagnosis_precedes_memory_system, false);
  assert.equal(evaluation.judgeStatus, "preflight-blocked");
});

test("removing the focused first source blocks modeled review", () => {
  const pageSource = candidatePage.replace(
    /one\s+approved,\s*non-sensitive or\s*representative source/gi,
    "all available company systems"
  );
  const supportingCopy = candidateSupportingCopy.replace(
    /one approved source surface/gi,
    "all available company systems"
  );
  const evaluation = evaluateProtectedTeamMemoryProposal({
    contract,
    pageSource,
    supportingCopy
  });

  assert.equal(evaluation.checks.first_engagement_is_focused, false);
});

test("a protected participant identity in public copy fails closed", () => {
  const evaluation = evaluateCandidate(
    `${candidatePage}\nPrivate-call participant: Example Person`
  );

  assert.equal(
    evaluation.checks.public_copy_preserves_private_boundary,
    false
  );
});

test("the judge prompt asks for critique before a binary hiring verdict", () => {
  assert.match(contract.judge.prompt, /narrative critique/i);
  assert.match(contract.judge.prompt, /pass or fail/i);
  assert.deepEqual(contract.judge.outputOrder.slice(0, 2), [
    "narrativeCritique",
    "primaryRisk"
  ]);
});

test("an uncalibrated judge remains advisory even after deterministic preflight", () => {
  const evaluation = evaluateCandidate();

  assert.equal(evaluation.deterministicVerdict, "pass");
  assert.equal(contract.judge.calibration.status, "required");
  assert.equal(
    contract.judge.calibration.releaseAuthority,
    "advisory-until-calibrated"
  );
});
