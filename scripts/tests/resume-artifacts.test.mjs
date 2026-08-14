import assert from "node:assert/strict";
import { appendFileSync, cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checker = path.join(repoRoot, "scripts/check-resume-artifacts.mjs");

function run(root = repoRoot) {
  return spawnSync(process.execPath, [checker, "--root", root], {
    cwd: repoRoot,
    encoding: "utf8"
  });
}

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "resume-artifacts-eval-"));
  for (const relativePath of [
    "evals/resume-artifacts",
    "evals/resume-hiring-readers",
    "docs/knowledge-bank/opportunities",
    "resume-versions"
  ]) {
    cpSync(path.join(repoRoot, relativePath), path.join(root, relativePath), { recursive: true });
  }
  return root;
}

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function writeJson(root, relativePath, value) {
  writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function firstEntry(root) {
  return readJson(root, "evals/resume-hiring-readers/current.json").opportunities[0];
}

test("every governed opportunity has a current styled and visually inspected PDF sibling", () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.deepEqual(report.metrics, { opportunities: 4, markdownResumes: 4, pdfs: 4, artifacts: 4 });
});

test("a missing PDF sibling fails complete coverage", () => {
  const root = fixture();
  try {
    const entry = firstEntry(root);
    const directory = path.dirname(path.join(root, entry.resumePath));
    const artifact = readJson(root, path.relative(root, path.join(directory, "artifact.json")));
    unlinkSync(path.join(directory, artifact.pdf.file));
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /complete-opportunity-coverage/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a changed opportunity brief fails until the resume is re-tailored", () => {
  const root = fixture();
  try {
    const entry = firstEntry(root);
    appendFileSync(path.join(root, entry.opportunityPath), "\nNew governed requirement.\n", "utf8");
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /opportunity-source-current/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a changed Markdown resume fails exact artifact synchronization", () => {
  const root = fixture();
  try {
    const entry = firstEntry(root);
    appendFileSync(path.join(root, entry.resumePath), "\nUnreviewed addition.\n", "utf8");
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /markdown-current/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("changed PDF bytes fail the digest-bound PDF gate", () => {
  const root = fixture();
  try {
    const entry = firstEntry(root);
    const directory = path.dirname(path.join(root, entry.resumePath));
    const artifact = readJson(root, path.relative(root, path.join(directory, "artifact.json")));
    appendFileSync(path.join(directory, artifact.pdf.file), "stale", "utf8");
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /pdf-structure/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("unverified Google Docs lineage fails closed", () => {
  const root = fixture();
  try {
    const entry = firstEntry(root);
    const relative = path.join(path.dirname(entry.resumePath), "artifact.json");
    const artifact = readJson(root, relative);
    artifact.googleWorkspace.sourceUnchangedAfterCopy = false;
    writeJson(root, relative, artifact);
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /google-docs-lineage/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("an incomplete page-inspection receipt fails closed", () => {
  const root = fixture();
  try {
    const entry = firstEntry(root);
    const relative = path.join(path.dirname(entry.resumePath), "artifact.json");
    const artifact = readJson(root, relative);
    artifact.visualInspection.pagesInspected = [1];
    writeJson(root, relative, artifact);
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /visual-inspection/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a committed Google Docs locator fails public safety", () => {
  const root = fixture();
  try {
    const entry = firstEntry(root);
    const relative = path.join(path.dirname(entry.resumePath), "artifact.json");
    const artifact = readJson(root, relative);
    artifact.googleWorkspace.copy = "https://docs.google.com/document/d/1abcdefghijklmnopqrstuvwxyzABCDE/edit";
    writeJson(root, relative, artifact);
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /public-safety/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("an orphan tailored Markdown resume fails one-to-one coverage", () => {
  const root = fixture();
  try {
    const orphan = path.join(root, "resume-versions/2026-08-14/orphan-opportunity");
    mkdirSync(orphan, { recursive: true });
    writeFileSync(path.join(orphan, "Jamie-Burkart-Resume.md"), "# Jamie Burkart\n", "utf8");
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /complete-opportunity-coverage/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
