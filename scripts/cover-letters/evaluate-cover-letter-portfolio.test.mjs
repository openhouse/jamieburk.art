import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateCoverLetterPortfolio } from "./evaluate-cover-letter-portfolio.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(readFileSync(path.join(repoRoot, "evals/cover-letters/hiring-reader-portfolio.json"), "utf8"));
const currentPath = config.versions.find((version) => version.opportunityId === "opportunity.nyc-oti.senior-product-manager.782366").coverLetterPath;
const expiredPath = config.versions.find((version) => version.status === "expired-benchmark").coverLetterPath;

test("every maintained tailored resume has a passing role-specific cover letter", () => {
  const result = evaluateCoverLetterPortfolio();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.deepEqual(result.summary, {
    requiredLetters: 5,
    maintainedLetters: 5,
    passingLetters: 5,
    requiredReaderPairs: 8,
    passingReaderPreflights: 8
  });
});

test("a missing sibling cover letter blocks all downstream reader work", () => {
  const result = evaluateCoverLetterPortfolio({ artifactOverrides: { [currentPath]: null } });
  assert.equal(result.overall, "fail");
  const version = result.versions.find((entry) => entry.coverLetterPath === currentPath);
  assert.equal(version.artifactChecks[0].id, "cover-letter-exists");
  assert.equal(version.readerResults.every((reader) => reader.decision === "block-model-review"), true);
});

test("generic or guaranteed application language fails before model review", () => {
  const original = readFileSync(path.join(repoRoot, currentPath), "utf8");
  const result = evaluateCoverLetterPortfolio({ artifactOverrides: { [currentPath]: `${original}\nI am writing to apply because this guarantees an interview.\n` } });
  const version = result.versions.find((entry) => entry.coverLetterPath === currentPath);
  assert.equal(version.artifactChecks.find((check) => check.id === "claim-and-endorsement-safety").pass, false);
  assert.equal(result.overall, "fail");
});

test("a voice source modified after its recorded read blocks evaluation", () => {
  const mutation = structuredClone(config);
  mutation.writerVoiceSource.sourceModifiedAt = "2026-08-21T00:00:00.000Z";
  const result = evaluateCoverLetterPortfolio({ config: mutation });
  assert.equal(result.portfolioChecks.find((check) => check.id === "living-voice-source-bound").pass, false);
  assert.equal(result.overall, "fail");
});

test("the expired benchmark cannot lose its do-not-submit label", () => {
  const original = readFileSync(path.join(repoRoot, expiredPath), "utf8");
  const mutation = original.replace("# Historical benchmark — do not submit", "# Technical Operations Manager");
  const result = evaluateCoverLetterPortfolio({ artifactOverrides: { [expiredPath]: mutation } });
  const version = result.versions.find((entry) => entry.coverLetterPath === expiredPath);
  assert.equal(version.artifactChecks.find((check) => check.id === "lifecycle-safety").pass, false);
  assert.equal(result.overall, "fail");
});
