import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateOpportunityCoverLetters } from "./evaluate-opportunity-cover-letters.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/cover-letters/opportunity-cover-letters.json"), "utf8")
);
const portfolio = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/resumes/hiring-reader-portfolio.json"), "utf8")
);

test("all tailored-resume opportunities have adjacent voice-bound cover letters", () => {
  const result = evaluateOpportunityCoverLetters();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.versionCount, portfolio.versions.length);
  assert.equal(result.versionCount, 8);
  assert.ok(result.versions.every((version) => version.deterministicPass));
  assert.ok(result.skills.every((skill) => skill.fileExists && skill.lockMatches));
});

test("current selection releases only the four OTI letters and eight bound readers", () => {
  const result = evaluateOpportunityCoverLetters();
  assert.equal(result.selection.tier, "open-opportunities");
  assert.equal(result.selection.opportunityIds.length, 4);
  assert.equal(result.llmGate.allowed, true);
  assert.equal(result.llmGate.queuedCalls, 8);
  assert.ok(result.llmGate.queue.every((entry) => entry.coverLetterPath && entry.resumePath));
  assert.ok(result.llmGate.avoidedCalls > 0);
});

test("a missing selected cover letter blocks every modeled reader call", () => {
  const version = portfolio.versions.find(
    (entry) => entry.opportunityId === "opportunity.nyc-oti.product-manager.784450"
  );
  const result = evaluateOpportunityCoverLetters({
    letterOverrides: { [version.coverLetterPath]: null }
  });
  assert.equal(result.overall, "fail");
  assert.equal(result.llmGate.allowed, false);
  assert.deepEqual(result.llmGate.queue, []);
});

test("a stale connected read blocks reader spending before subjective evaluation", () => {
  const staleVoice = { ...config.voice, connectedReadAt: "2026-07-01T12:00:00-04:00" };
  const result = evaluateOpportunityCoverLetters({ configOverrides: { voice: staleVoice } });
  assert.equal(result.voice.connectedReadFresh, false);
  assert.equal(result.llmGate.allowed, false);
  assert.equal(result.llmGate.queuedCalls, 0);
});

test("generic and overlong prose fails the deterministic editorial floor", () => {
  const version = portfolio.versions.find(
    (entry) => entry.opportunityId === "opportunity.nyc-oti.product-manager.784450"
  );
  const original = readFileSync(path.join(repoRoot, version.coverLetterPath), "utf8");
  const generic = original
    .replace("CallNYC began with a practical product question:", "I am writing to apply. CallNYC began with a practical product question:")
    .replace(/^Sincerely,$/m, `${"More generic application language. ".repeat(120)}\n\nSincerely,`);
  const result = evaluateOpportunityCoverLetters({
    letterOverrides: { [version.coverLetterPath]: generic }
  });
  const evaluated = result.versions.find((entry) => entry.opportunityId === version.opportunityId);
  assert.equal(evaluated.checks.wordCount, false);
  assert.equal(evaluated.checks.avoidsGenericPhrases, false);
  assert.equal(result.llmGate.allowed, false);
});

test("a mismatched resume binding fails closed", () => {
  const version = portfolio.versions.find(
    (entry) => entry.opportunityId === "opportunity.nyc-oti.operations-manager-speed.789810"
  );
  const original = readFileSync(path.join(repoRoot, version.coverLetterPath), "utf8");
  const mismatched = original.replace(
    /^resume_path:.+$/m,
    "resume_path: resumes/not-the-selected-resume.md"
  );
  const result = evaluateOpportunityCoverLetters({
    letterOverrides: { [version.coverLetterPath]: mismatched }
  });
  const evaluated = result.versions.find((entry) => entry.opportunityId === version.opportunityId);
  assert.equal(evaluated.checks.resumeBound, false);
  assert.equal(result.llmGate.queuedCalls, 0);
});

