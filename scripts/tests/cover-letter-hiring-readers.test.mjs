import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateCoverLetters } from "../evals-cover-letter-hiring-readers.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "cover-letter-eval-"));
  for (const relativePath of [
    "evals/cover-letter-hiring-readers",
    "evals/cover-letters",
    "evals/resume-hiring-readers",
    "docs/knowledge-bank/opportunities",
    "resume-versions"
  ]) cpSync(path.join(repoRoot, relativePath), path.join(root, relativePath), { recursive: true });
  return root;
}

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function writeJson(root, relativePath, value) {
  writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

test("deterministic gates pass before any named-reader work", () => {
  const result = evaluateCoverLetters(repoRoot, { now: "2026-08-20", deterministicOnly: true });
  assert.equal(result.pass, true, JSON.stringify(result.failures, null, 2));
  assert.deepEqual(result.phases, { deterministic: "pass", hiringReaders: "not-run" });
  assert.deepEqual(result.metrics, { opportunities: 4, namedReaders: 7, passingReaders: 0, readerAssessmentsEvaluated: 0 });
});

test("every current named reader accepts the exact cover letter and resume", () => {
  const result = evaluateCoverLetters(repoRoot, { now: "2026-08-20" });
  assert.equal(result.pass, true, JSON.stringify(result.failures, null, 2));
  assert.deepEqual(result.phases, { deterministic: "pass", hiringReaders: "pass" });
  assert.deepEqual(result.metrics, { opportunities: 4, namedReaders: 7, passingReaders: 7, readerAssessmentsEvaluated: 7 });
});

test("a missing sibling cover letter fails before reader commissioning", () => {
  const root = fixture();
  try {
    const manifest = readJson(root, "evals/cover-letter-hiring-readers/current.json");
    unlinkSync(path.join(root, manifest.opportunities[0].coverLetterPath));
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.equal(result.phases.hiringReaders, "not-eligible");
    assert.match(result.failures.join("\n"), /opportunity coverage|artifact lineage/i);
    assert.equal(result.metrics.readerAssessmentsEvaluated, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a stale authenticated writer's-voice read fails before reader commissioning", () => {
  const root = fixture();
  try {
    const relative = "evals/cover-letter-hiring-readers/current.json";
    const manifest = readJson(root, relative);
    manifest.voiceContract.lastAuthenticatedReview = "2026-07-01";
    writeJson(root, relative, manifest);
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.equal(result.phases.hiringReaders, "not-eligible");
    assert.match(result.failures.join("\n"), /voice freshness/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a changed voice contract invalidates the deterministic source binding", () => {
  const root = fixture();
  try {
    const voicePath = path.join(root, "evals/cover-letters/voice-contract.json");
    writeFileSync(voicePath, `${readFileSync(voicePath, "utf8")}\n`, "utf8");
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /voice source/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a letter edit invalidates its artifact and reader bindings", () => {
  const root = fixture();
  try {
    const manifest = readJson(root, "evals/cover-letter-hiring-readers/current.json");
    const entry = manifest.opportunities[0];
    const letterPath = path.join(root, entry.coverLetterPath);
    writeFileSync(letterPath, readFileSync(letterPath, "utf8").replace("A project plan", "A delivery plan"), "utf8");
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.equal(result.phases.hiringReaders, "not-eligible");
    assert.match(result.failures.join("\n"), /artifact lineage/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a re-bound letter still invalidates old exact-reader assessments", () => {
  const root = fixture();
  try {
    const relative = "evals/cover-letter-hiring-readers/current.json";
    const manifest = readJson(root, relative);
    const entry = manifest.opportunities[0];
    const letterPath = path.join(root, entry.coverLetterPath);
    const letter = readFileSync(letterPath, "utf8").replace("A project plan", "A delivery plan");
    writeFileSync(letterPath, letter, "utf8");
    entry.coverLetterSha256 = digest(letter);
    writeJson(root, relative, manifest);
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /reader binding/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a generic opening or placeholder fails editorial quality", () => {
  const root = fixture();
  try {
    const relative = "evals/cover-letter-hiring-readers/current.json";
    const manifest = readJson(root, relative);
    const entry = manifest.opportunities[0];
    const letterPath = path.join(root, entry.coverLetterPath);
    const letter = readFileSync(letterPath, "utf8").replace("A project plan becomes useful", "I am writing to apply because a project plan becomes useful");
    writeFileSync(letterPath, letter, "utf8");
    entry.coverLetterSha256 = digest(letter);
    writeJson(root, relative, manifest);
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.equal(result.phases.hiringReaders, "not-eligible");
    assert.match(result.failures.join("\n"), /editorial quality/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("removing a governed named reader fails unanimous coverage", () => {
  const root = fixture();
  try {
    const relative = "evals/cover-letter-hiring-readers/current.json";
    const manifest = readJson(root, relative);
    manifest.readerAssessments.pop();
    writeJson(root, relative, manifest);
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /reader coverage/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a protected Google Workspace locator fails public safety", () => {
  const root = fixture();
  try {
    const relative = "evals/cover-letter-hiring-readers/current.json";
    const manifest = readJson(root, relative);
    manifest.voiceContract.source = "https://docs.google.com/document/d/protected-source-id";
    writeJson(root, relative, manifest);
    const result = evaluateCoverLetters(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /public safety/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
