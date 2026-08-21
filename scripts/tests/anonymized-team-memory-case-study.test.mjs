import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const caseStudyRoot =
  "docs/knowledge-bank/case-studies/anonymized-team-memory-collaboration";
const caseStudyFiles = [
  `${caseStudyRoot}/01-prospective-collaborator-perspective.md`,
  `${caseStudyRoot}/02-jamie-perspective.md`,
  `${caseStudyRoot}/03-prospective-collaborator-voice.md`
];

test("the anonymized case study contains the three required perspectives", () => {
  const [prospect, jamie, voice] = caseStudyFiles.map(read);

  for (const document of [prospect, jamie, voice]) {
    assert.match(document, /visibility: public-safe/);
    assert.match(document, /human_review: requested/);
    assert.match(document, /Jamie's\s+(?:direct\s+)?approval\s+is\s+(?:also\s+)?(?:still\s+)?required/i);
    assert.match(document, /not\s+participant-approved/i);
  }

  for (const phrase of [
    "The situation before the conversations",
    "What the prospective collaborator needed",
    "Why Jamie became relevant",
    "What remained unresolved"
  ]) {
    assert.ok(prospect.includes(phrase), `prospect account missing: ${phrase}`);
  }

  for (const phrase of [
    "What Jamie was trying to make legible",
    "What changed between the conversations",
    "What Jamie hoped the collaboration could become",
    "What Jamie needed to protect"
  ]) {
    assert.ok(jamie.includes(phrase), `Jamie account missing: ${phrase}`);
  }

  for (const phrase of [
    "Corpus and inference limit",
    "Conversational signature",
    "Characteristic reasoning moves",
    "Sentence movement and prosody",
    "Synthetic examples",
    "Do not use this profile to impersonate"
  ]) {
    assert.ok(voice.includes(phrase), `voice profile missing: ${phrase}`);
  }
});

test("the case study protects the prospective collaborator and company", () => {
  const publicSafeCaseStudy = caseStudyFiles.map(read).join("\n");
  const prohibitedPatterns = [
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
    /(?:\+?1[ .-]?)?\(?[0-9]{3}\)?[ .-][0-9]{3}[ .-][0-9]{4}/,
    /(?:\/Users\/|\/Volumes\/|com~apple~CloudDocs|file:\/\/)/i,
    /(?:https?:\/\/|www\.)/i,
    /(?:[$€£][0-9]|[0-9][0-9,]*(?:\.[0-9]{2})? (?:dollars|euros|pounds))/i
  ];

  for (const pattern of prohibitedPatterns) {
    assert.doesNotMatch(publicSafeCaseStudy, pattern);
  }

  assert.doesNotMatch(publicSafeCaseStudy, /^> /m);
  assert.doesNotMatch(publicSafeCaseStudy, /actual endorsement|actual hiring decision/i);
});

test("the eval is deterministic-first, advisory, and exact-candidate bound", async () => {
  const config = JSON.parse(
    read("evals/anonymized-team-memory-case-study/current.json")
  );
  assert.equal(config.schemaVersion, 1);
  assert.deepEqual(config.target.files, caseStudyFiles);
  assert.equal(config.sourceBoundary.privateTranscriptInRepository, false);
  assert.equal(config.sourceBoundary.protectedIdentifierCorpusInRepository, false);
  assert.equal(config.sourceBoundary.protectedIdentifierComparison.performedInPrivateWorkspace, true);
  assert.equal(config.sourceBoundary.protectedIdentifierComparison.persistedIdentifierCorpus, false);
  assert.equal(config.sourceBoundary.protectedIdentifierComparison.result, "no-known-identifiers-found");
  assert.equal(config.policy.deterministicChecksBeforeLlm, true);
  assert.equal(config.policy.stopOnDeterministicFailure, true);
  assert.equal(config.policy.calibrationStatus, "uncalibrated-advisory-simulation");
  assert.equal(config.humanValidation.prospectiveCollaboratorApproved, false);
  assert.equal(config.humanValidation.jamieApproved, false);
  assert.equal(config.evaluators.length, 3);

  const { evaluateAnonymizedTeamMemoryCaseStudy } = await import(
    "../evals-anonymized-team-memory-case-study.mjs"
  );
  const report = evaluateAnonymizedTeamMemoryCaseStudy(repoRoot);
  assert.equal(report.deterministicPassed, true, report.failures.join("\n"));
  assert.equal(report.advisorySimulationsPassed, true, report.failures.join("\n"));
  assert.equal(report.passed, true, report.failures.join("\n"));
});
