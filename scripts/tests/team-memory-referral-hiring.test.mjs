import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("the team-memory page makes a paid first engagement easy to authorize", () => {
  const page = [
    read("apps/www/src/content/lab/source-backed-team-memory.mdx"),
    read("apps/www/src/app/lab/source-backed-team-memory/page.tsx")
  ].join("\n");

  for (const phrase of [
    "Proposed first engagement",
    "One approved source. One useful team-memory test.",
    "What I will deliver",
    "What you can decide",
    "paid discovery and prototype",
    'href="/resume"'
  ]) {
    assert.ok(page.includes(phrase), `missing forwardable proposal element: ${phrase}`);
  }
});

test("the referral eval exposes only anonymized interpretation and browser-visible surfaces", () => {
  const config = JSON.parse(read("evals/team-memory-referral-hiring/current.json"));

  assert.equal(config.schemaVersion, 1);
  assert.deepEqual(config.inputBoundary.anonymizedArtifacts, [
    "docs/knowledge-bank/case-studies/anonymized-team-memory-collaboration/01-prospective-collaborator-perspective.md",
    "docs/knowledge-bank/case-studies/anonymized-team-memory-collaboration/03-prospective-collaborator-voice.md"
  ]);
  assert.equal(config.inputBoundary.rawTranscriptAccess, false);
  assert.equal(config.inputBoundary.repositoryAccess, false);
  assert.equal(config.inputBoundary.participantIdentityAccess, false);
  assert.equal(config.inputBoundary.companyIdentityAccess, false);
  assert.equal(config.browser.startRoute, "/lab/source-backed-team-memory");
  assert.equal(config.browser.sameOriginPublicNavigationOnly, true);
  assert.equal(config.browser.requireLinkDiscovery, true);
  assert.equal(config.browser.screenshotEvidenceRequired, true);
  assert.equal(config.policy.deterministicChecksBeforeLlm, true);
  assert.equal(config.policy.stopOnDeterministicFailure, true);
  assert.equal(config.policy.calibrationStatus, "uncalibrated-advisory-simulation");
});

test("the judge prompt separates the referral, authority decision, and relay failure modes", () => {
  const config = JSON.parse(read("evals/team-memory-referral-hiring/current.json"));

  assert.equal(config.judges.length, 3);
  assert.deepEqual(
    config.judges.map((judge) => judge.id),
    [
      "fictionalized-referral-readiness",
      "fictionalized-hiring-authority-decision",
      "fictionalized-referrer-relay"
    ]
  );
  for (const judge of config.judges) {
    assert.equal(judge.outputSchema.critique, "string");
    assert.equal(judge.outputSchema.result, "pass | fail");
    assert.ok(judge.passDefinition);
    assert.ok(judge.failDefinition);
  }
});

test("the exact browser packet and fictionalized hiring decision remain in step", async () => {
  const { evaluateTeamMemoryReferralHiring } = await import(
    "../evals-team-memory-referral-hiring.mjs"
  );
  const report = evaluateTeamMemoryReferralHiring(repoRoot);

  assert.equal(report.deterministicPassed, true, report.failures.join("\n"));
  assert.equal(report.advisorySimulationPassed, true, report.failures.join("\n"));
  assert.equal(report.passed, true, report.failures.join("\n"));
});
