import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("the team-memory page is a concrete first-engagement proposal", () => {
  const page = [
    read("apps/www/src/content/lab/source-backed-team-memory.mdx"),
    read("apps/www/src/app/lab/source-backed-team-memory/page.tsx")
  ].join("\n");

  for (const phrase of [
    "What a First Engagement Tests",
    "one approved source surface",
    "useful ideas, decisions, open questions, onboarding context, and product reasoning",
    "No broad access to company systems",
    "continue, revise, or stop",
    "two-week discovery and prototype",
    "One sponsor, one working lead, and two or three teammates",
    "Three to five approved sources"
  ]) {
    assert.ok(page.includes(phrase), `missing proposal requirement: ${phrase}`);
  }

  assert.match(page, /AI drafts\. Humans review\./);
  assert.match(page, /new collaborators can get up to speed/);
  assert.match(page, /review and correct the result/);
});

test("the public proposal does not disclose the protected call or commercial context", () => {
  const publicSurface = [
    read("apps/www/src/content/lab/source-backed-team-memory.mdx"),
    read("apps/www/src/app/lab/source-backed-team-memory/page.tsx")
  ].join("\n");

  for (const forbidden of [
    "Jonathan Marmor",
    "June 18 call",
    "$2,500",
    "eleven people",
    "five to ten software engineers",
    "overlords"
  ]) {
    assert.ok(!publicSurface.includes(forbidden), `protected context leaked: ${forbidden}`);
  }
});

test("the simulated prospect gate is public-safe, deterministic-first, and advisory", () => {
  const config = JSON.parse(read("evals/team-memory-proposal/current.json"));

  assert.equal(config.schemaVersion, 1);
  assert.equal(config.target.route, "/lab/source-backed-team-memory");
  assert.equal(config.sourceBoundary.visibility, "summary-only");
  assert.equal(config.sourceBoundary.privateTranscriptInRepository, false);
  assert.equal(config.evaluator.readerIdentity, "protected-prospective-collaborator");
  assert.equal(config.evaluator.simulatedPublicFigureLens, true);
  assert.match(config.evaluator.nonEndorsementBoundary, /not participation.*endorsement/i);
  assert.equal(config.policy.deterministicChecksBeforeLlm, true);
  assert.equal(config.policy.stopOnDeterministicFailure, true);
  assert.equal(config.policy.calibrationStatus, "uncalibrated-advisory-simulation");
  for (const criterionId of [
    "two-week-timebox",
    "small-participant-set",
    "approved-source-set",
    "end-decision"
  ]) {
    assert.ok(
      config.deterministicCriteria.some((criterion) => criterion.id === criterionId),
      `missing deterministic proposal criterion ${criterionId}`
    );
  }
  assert.equal(config.acceptanceQuestion, "Based only on this public page as Jamie's proposal, I would hire Jamie for the small paid discovery / prototype engagement described by the protected June 2026 scenario.");
  assert.ok(config.deterministicCriteria.length >= 6);
  assert.deepEqual(config.judgeOutputSchema, {
    critique: "string",
    result: "pass | fail"
  });
});

test("the exact page digest and fictionalized acceptance result remain in step", async () => {
  const { evaluateTeamMemoryProposal } = await import(
    "../evals-team-memory-proposal.mjs"
  );
  const report = evaluateTeamMemoryProposal(repoRoot);

  assert.equal(report.deterministicPassed, true, report.failures.join("\n"));
  assert.equal(report.simulatedAcceptancePassed, true, report.failures.join("\n"));
  assert.equal(report.passed, true, report.failures.join("\n"));
});
