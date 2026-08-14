import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const runnerPath = path.join(repoRoot, "scripts/evals-resume-hiring-readers.mjs");

function run(root = repoRoot) {
  return spawnSync(process.execPath, [runnerPath, "--root", root], {
    cwd: repoRoot,
    encoding: "utf8"
  });
}

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "resume-hiring-reader-eval-"));
  for (const relativePath of [
    "evals/hiring-readers",
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

function rebindResume(entry, resume) {
  const resumeSha256 = createHash("sha256").update(resume).digest("hex");
  entry.resumeSha256 = resumeSha256;
  for (const assessment of entry.readerAssessments) assessment.resumeSha256 = resumeSha256;
}

test("every named-reader opportunity has a distinct dated resume and passing reader assessments", () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.passed, true);
  assert.equal(report.metrics.opportunities, 4);
  assert.equal(report.metrics.resumes, 4);
  assert.equal(report.metrics.namedReaders, 7);
  assert.equal(report.metrics.passingReaderAssessments, 7);
});

test("a different resume-review skill fingerprint fails the pinned skill contract", () => {
  const root = fixture();
  try {
    const relativePath = "evals/resume-hiring-readers/current.json";
    const manifest = readJson(root, relativePath);
    manifest.skillContract.primarySkill.skillSha256 = "a".repeat(64);
    writeJson(root, relativePath, manifest);
    const result = run(root);
    assert.notEqual(result.status, 0, "unreviewed skill drift must fail closed");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /skill-contract/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a retained resume packet must bind to a live or closed application opportunity", () => {
  const root = fixture();
  try {
    const relativePath = "docs/knowledge-bank/opportunities/benepass-product-operations.md";
    const opportunityPath = path.join(root, relativePath);
    const opportunity = readFileSync(opportunityPath, "utf8").replace(
      "opportunity_status: closed",
      "opportunity_status: historical-benchmark"
    );
    writeFileSync(opportunityPath, opportunity, "utf8");
    const result = run(root);
    assert.notEqual(result.status, 0, "current resume packets must not silently become historical benchmarks");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /opportunity-binding/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a generic target-role headline fails job-specific resume tailoring", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/resume-hiring-readers/current.json";
    const manifest = readJson(root, manifestPath);
    const entry = manifest.opportunities.find(
      ({ opportunityId }) => opportunityId === "opportunity.nyc-oti.senior-product-manager.782366"
    );
    const resumePath = path.join(root, entry.resumePath);
    const resume = readFileSync(resumePath, "utf8").replace(
      "## Target Role: Senior Product Manager - Public Interest Technology Crew",
      "## Target Role: Generic Leader"
    );
    writeFileSync(resumePath, resume, "utf8");
    rebindResume(entry, resume);
    writeJson(root, manifestPath, manifest);
    const result = run(root);
    assert.notEqual(result.status, 0, "generic target-role headlines must fail closed");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /target-role/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("an overstuffed job entry fails the resume-review scannability limit", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/resume-hiring-readers/current.json";
    const manifest = readJson(root, manifestPath);
    const entry = manifest.opportunities.find(
      ({ opportunityId }) => opportunityId === "opportunity.benepass.product-operations.7f963a7a"
    );
    const resumePath = path.join(root, entry.resumePath);
    const resume = readFileSync(resumePath, "utf8").replace(
      "- Build decision records, onboarding guides, runbooks, launch checklists, status reports, retrospectives, and source-backed team memory.",
      "- Build decision records, onboarding guides, runbooks, launch checklists, status reports, retrospectives, and source-backed team memory.\n- Document routine updates.\n- Coordinate routine follow-up."
    );
    writeFileSync(resumePath, resume, "utf8");
    rebindResume(entry, resume);
    writeJson(root, manifestPath, manifest);
    const result = run(root);
    assert.notEqual(result.status, 0, "six bullets in one job entry must fail closed");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /role-bullets/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a newly assigned hiring-reader opportunity cannot enter the queue without a resume", () => {
  const root = fixture();
  try {
    const registryPath = "evals/hiring-readers/current.json";
    const registry = readJson(root, registryPath);
    const added = structuredClone(registry.evaluations[0]);
    added.id = "new-reader-opportunity";
    added.opportunityId = "opportunity.example.new-role.123";
    added.reader.personId = "person.example-reader";
    added.reader.name = "Example Reader";
    added.isolation.taskId = "new-reader-opportunity-task";
    registry.evaluations.push(added);
    writeJson(root, registryPath, registry);
    const result = run(root);
    assert.notEqual(result.status, 0, "new reader opportunities require a resume entry");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /coverage/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a reader assessment bound to an older resume digest fails exact-resume acceptance", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/resume-hiring-readers/current.json";
    const manifest = readJson(root, manifestPath);
    manifest.opportunities[0].readerAssessments[0].resumeSha256 = "0".repeat(64);
    writeJson(root, manifestPath, manifest);
    const result = run(root);
    assert.notEqual(result.status, 0, "stale reader assessments must fail closed");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /reader-acceptance/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("two opportunities cannot reuse the same generic resume candidate", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/resume-hiring-readers/current.json";
    const manifest = readJson(root, manifestPath);
    const source = manifest.opportunities[0];
    const target = manifest.opportunities[1];
    target.resumePath = source.resumePath;
    target.resumeSha256 = source.resumeSha256;
    for (const assessment of target.readerAssessments) {
      assessment.resumeSha256 = source.resumeSha256;
    }
    writeJson(root, manifestPath, manifest);
    const result = run(root);
    assert.notEqual(result.status, 0, "copied generic resumes must fail closed");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /distinct-tailoring/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("tailoring cannot rename an actual employment title to Product Manager", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/resume-hiring-readers/current.json";
    const manifest = readJson(root, manifestPath);
    const entry = manifest.opportunities.find(
      ({ opportunityId }) => opportunityId === "opportunity.nyc-oti.senior-product-manager.782366"
    );
    const resumePath = path.join(root, entry.resumePath);
    const resume = readFileSync(resumePath, "utf8").replace(
      "### THICK ARTS - Founder, Technical Project Manager & Web Systems Lead",
      "### THICK ARTS - Senior Product Manager"
    );
    writeFileSync(resumePath, resume, "utf8");
    rebindResume(entry, resume);
    writeJson(root, manifestPath, manifest);
    const result = run(root);
    assert.notEqual(result.status, 0, "resume tailoring must preserve actual titles");
    const report = JSON.parse(result.stdout);
    assert.match(report.failures.map(({ criterion }) => criterion).join("\n"), /truth-boundaries/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
