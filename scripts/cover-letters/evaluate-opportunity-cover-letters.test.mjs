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
  assert.equal(result.maintenanceOverall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.overall, "fail", "hard reader failures must not be averaged into green");
  assert.equal(result.versionCount, portfolio.versions.length);
  assert.equal(result.versionCount, 8);
  assert.ok(result.versions.every((version) => version.deterministicPass));
  assert.ok(result.skills.every((skill) => skill.fileExists && skill.lockMatches));
  assert.equal(result.readerRun.integrityPass, true);
  assert.equal(result.readerRun.voiceOverall, "pass");
  assert.equal(result.readerRun.advancementOverall, "fail");
  assert.equal(result.readerRun.advancePassCount, 2);
  assert.equal(result.readerRun.advanceFailCount, 6);
});

test("current exact reader run avoids every repeated selected-reader call", () => {
  const result = evaluateOpportunityCoverLetters();
  assert.equal(result.selection.tier, "open-opportunities");
  assert.equal(result.selection.opportunityIds.length, 4);
  assert.equal(result.llmGate.allowed, true);
  assert.equal(result.selection.selectedReadersCoveredByRun, true);
  assert.equal(result.llmGate.queuedCalls, 0);
  assert.equal(result.llmGate.avoidedCalls, 16);
});

test("a changed selected letter releases only its two affected reader gates", () => {
  const version = portfolio.versions.find(
    (entry) => entry.opportunityId === "opportunity.nyc-oti.product-manager.784450"
  );
  const original = readFileSync(path.join(repoRoot, version.coverLetterPath), "utf8");
  const changed = original.replace(
    "The work is not only to make a product function.",
    "The work is not only to make a product function; the evidence must remain inspectable."
  );
  const result = evaluateOpportunityCoverLetters({
    letterOverrides: { [version.coverLetterPath]: changed }
  });
  assert.equal(result.maintenanceOverall, "pass");
  assert.equal(result.llmGate.queuedCalls, 2);
  assert.ok(result.llmGate.queue.every((entry) => entry.opportunityId === version.opportunityId));
});

test("a missing selected cover letter blocks every modeled reader call", () => {
  const version = portfolio.versions.find(
    (entry) => entry.opportunityId === "opportunity.nyc-oti.product-manager.784450"
  );
  const result = evaluateOpportunityCoverLetters({
    letterOverrides: { [version.coverLetterPath]: null }
  });
  assert.equal(result.maintenanceOverall, "fail");
  assert.equal(result.llmGate.allowed, false);
  assert.deepEqual(result.llmGate.queue, []);
});

test("a stale connected read blocks reader spending before subjective evaluation", () => {
  const staleVoice = { ...config.voice, connectedReadAt: "2026-07-01T12:00:00-04:00" };
  const result = evaluateOpportunityCoverLetters({ configOverrides: { voice: staleVoice } });
  assert.equal(result.voice.connectedReadFresh, false);
  assert.equal(result.maintenanceOverall, "fail");
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
