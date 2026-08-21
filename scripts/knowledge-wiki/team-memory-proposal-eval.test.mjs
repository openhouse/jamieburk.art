import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateTeamMemoryProposal,
  loadTeamMemoryProposalCandidate
} from "./team-memory-proposal-eval.mjs";
import { assertPublicSafeModelResult } from "./record-team-memory-reader-run.mjs";

test("the model output schema declares explicit types for constrained fields", () => {
  const schema = JSON.parse(
    readFileSync(
      new URL(
        "../../evals/knowledge-wiki/team-memory-proposal-response.schema.json",
        import.meta.url
      ),
      "utf8"
    )
  );
  assert.equal(schema.properties.readerId.type, "string");
  assert.equal(schema.properties.verdict.type, "string");
  assert.equal(schema.properties.decision.type, "string");
  assert.equal(schema.properties.actualPersonParticipated.type, "boolean");
});

test("the team-memory proposal clears deterministic preflight before model work", () => {
  const result = evaluateTeamMemoryProposal(loadTeamMemoryProposalCandidate(), {
    deterministicOnly: true
  });
  assert.equal(result.passed, true, result.failures.join("\n"));
});

test("the current public-page candidate passes the fictionalized reader gate", () => {
  const result = evaluateTeamMemoryProposal(loadTeamMemoryProposalCandidate());
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

test("the committed reader receipt cannot repeat the protected runtime identity", () => {
  assert.throws(
    () =>
      assertPublicSafeModelResult(
        { constructiveCritique: "A named person appears here." },
        "Named Person"
      ),
    /protected runtime reader identity/
  );
  assert.doesNotThrow(() =>
    assertPublicSafeModelResult(
      { boundary: "The named person did not participate." },
      "Protected Reader"
    )
  );
});
