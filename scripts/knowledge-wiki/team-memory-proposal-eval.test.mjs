import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateTeamMemoryProposal,
  loadTeamMemoryProposalCandidate
} from "./team-memory-proposal-eval.mjs";

test("the team-memory proposal clears deterministic preflight before model work", () => {
  const result = evaluateTeamMemoryProposal(loadTeamMemoryProposalCandidate(), {
    deterministicOnly: true
  });
  assert.equal(result.passed, true, result.failures.join("\n"));
});

test("missing scenario coverage fails before model work", () => {
  const candidate = loadTeamMemoryProposalCandidate();
  candidate.pageSource = candidate.pageSource.replaceAll(
    "start-here page",
    "project page"
  );
  const result = evaluateTeamMemoryProposal(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /operating-deliverables/i);
});

test("protected collaborator or company material cannot enter the committed eval", () => {
  const candidate = loadTeamMemoryProposalCandidate();
  candidate.run.companyIdentity = "protected";
  const result = evaluateTeamMemoryProposal(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /protected identity, company/);
});

test("deterministic checks cannot convert a missing model judgment into a pass", () => {
  const candidate = loadTeamMemoryProposalCandidate();
  candidate.run.status = "not-run";
  candidate.run.result = null;
  const result = evaluateTeamMemoryProposal(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /fictionalized reader run is missing/);
});
