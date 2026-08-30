import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateTeamMemoryCaseStudy,
  loadTeamMemoryCaseStudyCandidate
} from "./team-memory-case-study-eval.mjs";
import { assertPublicSafeCaseStudyResult } from "./record-team-memory-case-study-run.mjs";

test("the case-study response schema constrains every pass dimension", () => {
  const schema = JSON.parse(
    readFileSync(
      new URL(
        "../../evals/knowledge-wiki/team-memory-anonymized-case-study-response.schema.json",
        import.meta.url
      ),
      "utf8"
    )
  );
  for (const field of [
    "prospectiveSponsorAccuracy",
    "jamieAccuracy",
    "voiceFidelity",
    "anonymizationSafety"
  ]) {
    assert.deepEqual(schema.properties[field].enum, ["pass", "fail"]);
  }
  assert.equal(schema.properties.actualPersonParticipated.const, false);
  assert.equal(schema.properties.sourceParticipantReviewed.const, false);
});

test("the anonymized case study passes deterministic preflight before model work", () => {
  const result = evaluateTeamMemoryCaseStudy(
    loadTeamMemoryCaseStudyCandidate(),
    { deterministicOnly: true }
  );
  assert.equal(result.passed, true, result.failures.join("\n"));
});

test("the current case-study candidate passes the source-informed modeled gate", () => {
  const result = evaluateTeamMemoryCaseStudy(
    loadTeamMemoryCaseStudyCandidate()
  );
  assert.equal(result.passed, true, result.failures.join("\n"));
});

test("a missing perspective signal fails before model work", () => {
  const candidate = loadTeamMemoryCaseStudyCandidate();
  candidate.documents.jamie = candidate.documents.jamie.replaceAll(
    "listening tour",
    "research process"
  );
  const result = evaluateTeamMemoryCaseStudy(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /jamie is missing/i);
});

test("identifying source artifacts fail before model work", () => {
  const candidate = loadTeamMemoryCaseStudyCandidate();
  candidate.documents.index += "\nsource: /Users/private/call_otter.ai.txt\n";
  const result = evaluateTeamMemoryCaseStudy(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /private locator/i);
});

test("an exact identifying company-size detail fails before model work", () => {
  const candidate = loadTeamMemoryCaseStudyCandidate();
  candidate.documents.prospectiveSponsor += "\nAn eleven-person company.\n";
  const result = evaluateTeamMemoryCaseStudy(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /identifying company detail/i);
});

test("the voice profile cannot become an impersonation guide", () => {
  const candidate = loadTeamMemoryCaseStudyCandidate();
  candidate.documents.voice = candidate.documents.voice.replaceAll(
    "not permission to impersonate",
    "permission to impersonate"
  );
  const result = evaluateTeamMemoryCaseStudy(candidate, {
    deterministicOnly: true
  });
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /impersonation/i);
});

test("a stale modeled receipt cannot pass the current case study", () => {
  const candidate = loadTeamMemoryCaseStudyCandidate();
  candidate.run.caseStudySha256 = "0".repeat(64);
  const result = evaluateTeamMemoryCaseStudy(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /missing, stale/i);
});

test("a self-review receipt must retain a reproducible prompt hash", () => {
  const candidate = loadTeamMemoryCaseStudyCandidate();
  candidate.run.promptSha256 = "0".repeat(64);
  const result = evaluateTeamMemoryCaseStudy(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /missing, stale/i);
});

test("recording rejects protected identity terms and private locators", () => {
  assert.throws(
    () =>
      assertPublicSafeCaseStudyResult(
        { rationale: "Protected Person appears." },
        ["Protected Person"]
      ),
    /protected runtime identity/
  );
  assert.throws(
    () =>
      assertPublicSafeCaseStudyResult({ rationale: "/Volumes/private/source" }),
    /private locator/
  );
  assert.doesNotThrow(() =>
    assertPublicSafeCaseStudyResult({
      boundary: "The source participant did not participate."
    })
  );
});
