import assert from "node:assert/strict";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import os from "node:os";
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
    "A small paid two-week discovery and prototype sprint",
    "Three to five approved sources around one decision trail",
    "What I deliver",
    "End decision",
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

test("the browser receipt is invalidated when the public resume artifact changes", async () => {
  const { evaluateTeamMemoryReferralHiring } = await import(
    "../evals-team-memory-referral-hiring.mjs"
  );
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "team-memory-referral-eval-"));
  const relativePaths = [
    "evals/team-memory-referral-hiring/current.json",
    "evals/team-memory-referral-hiring/runs/2026-08-21/local-public-browser-receipt.json",
    "evals/team-memory-referral-hiring/runs/2026-08-21/fictionalized-referral-and-authority-decision.json",
    "docs/knowledge-bank/case-studies/anonymized-team-memory-collaboration/01-prospective-collaborator-perspective.md",
    "docs/knowledge-bank/case-studies/anonymized-team-memory-collaboration/03-prospective-collaborator-voice.md",
    "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
  ];

  try {
    for (const relativePath of relativePaths) {
      const destination = path.join(tempRoot, relativePath);
      mkdirSync(path.dirname(destination), { recursive: true });
      copyFileSync(path.join(repoRoot, relativePath), destination);
    }
    const publicResumePath = path.join(
      tempRoot,
      "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
    );
    const changedResume = Buffer.concat([
      readFileSync(publicResumePath),
      Buffer.from("\nchanged exact public artifact\n")
    ]);
    writeFileSync(publicResumePath, changedResume);

    const report = evaluateTeamMemoryReferralHiring(tempRoot);
    assert.equal(report.deterministicPassed, false);
    assert.ok(
      report.failures.includes(
        "browser receipt resume digest is stale for the current public PDF"
      ),
      report.failures.join("\n")
    );
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});
