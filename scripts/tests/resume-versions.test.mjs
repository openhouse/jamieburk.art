import assert from "node:assert/strict";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "../..");
const checker = path.join(repoRoot, "scripts/check-resume-versions.mjs");
const targetPath = path.join(
  "resume-versions",
  "2026-08-14",
  "nyc-oti-senior-product-manager-782366",
  "Jamie-Burkart-Resume.md"
);
const targetPdfPath = path.join(
  "resume-versions",
  "2026-08-14",
  "nyc-oti-senior-product-manager-782366",
  "Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.pdf"
);
const targetArtifactPath = path.join(
  "resume-versions",
  "2026-08-14",
  "nyc-oti-senior-product-manager-782366",
  "artifact.json"
);

function run(root = repoRoot) {
  return spawnSync(process.execPath, [checker, root], {
    cwd: repoRoot,
    encoding: "utf8"
  });
}

function fixture(resume) {
  const root = mkdtempSync(path.join(tmpdir(), "resume-version-eval-"));
  const evalDir = path.join(root, "evals/resume-versions");
  const resumePath = path.join(root, targetPath);
  mkdirSync(evalDir, { recursive: true });
  mkdirSync(path.dirname(resumePath), { recursive: true });
  writeFileSync(
    path.join(evalDir, "evals.json"),
    JSON.stringify({
      id: "oti-senior-product-manager-resume-v1",
      targetJobId: "782366",
      targetResume: targetPath,
      targetPdf: targetPdfPath,
      targetArtifactManifest: targetArtifactPath,
      criteria: [
        { id: "versioned-path", blocking: true },
        { id: "ats-structure", blocking: true },
        { id: "role-language", blocking: true },
        { id: "evidence-anchors", blocking: true },
        { id: "collective-credit", blocking: true },
        { id: "truth-boundaries", blocking: true },
        { id: "submission-pdf", blocking: true },
        { id: "public-safety", blocking: true }
      ]
    }),
    "utf8"
  );
  writeFileSync(resumePath, resume, "utf8");
  return root;
}

test("the current OTI application resume satisfies every blocking contract", () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("a stale submission PDF manifest fails the exact-artifact gate", () => {
  const root = mkdtempSync(path.join(tmpdir(), "resume-pdf-eval-"));
  try {
    cpSync(path.join(repoRoot, "evals/resume-versions"), path.join(root, "evals/resume-versions"), { recursive: true });
    cpSync(
      path.join(repoRoot, "resume-versions/2026-08-14/nyc-oti-senior-product-manager-782366"),
      path.join(root, "resume-versions/2026-08-14/nyc-oti-senior-product-manager-782366"),
      { recursive: true }
    );
    const artifactPath = path.join(root, targetArtifactPath);
    const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));
    artifact.pdf.sha256 = "0".repeat(64);
    writeFileSync(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /submission-pdf/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a generic resume without the resident-facing product lifecycle fails role alignment", () => {
  const root = fixture("# Jamie Burkart\n\n## Experience\n\nBuilt websites.\n");
  try {
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /role-language/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("unsupported accessibility certification and sole-authorship language fail closed", () => {
  const root = fixture(`
# Jamie Burkart

## Professional Summary
Resident-facing product leader working end-to-end from problem framing and discovery through prioritization, public launch, metrics, and post-launch learning.

## Core Capabilities
Cross-functional product ownership, product briefs, decision memos, accessibility, privacy, user research, version one, MVP, pilot, scoping, sequencing, and instrumentation.

## Selected Product Impact
Solely built CallNYC and WOWList with Richard Caceres across 35 city ecosystems. Led WCAG 2.1 AA and Section 508 certification. Delivered 30+ pages, 2x revenue growth, 300+ gatherings, 20+ resident artists, and $490,539 in public funding.

## Professional Experience
### THICK ARTS

## Education & Professional Development
University of California, Santa Cruz.

## Additional
Authorized to work in the U.S.
`);
  try {
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /truth-boundaries|collective-credit/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a private archive locator fails the public-safety contract", () => {
  const root = fixture(`
# Jamie Burkart

## Professional Summary
Resident-facing product leader working end-to-end from problem framing and discovery through prioritization, public launch, metrics, and post-launch learning.

## Core Capabilities
Cross-functional product ownership, product briefs, decision memos, accessibility, privacy, user research, version one, MVP, pilot, scoping, sequencing, and instrumentation.

## Selected Product Impact
Co-built WOWList with Richard Caceres across 35 city ecosystems. Built CallNYC. Delivered 30+ pages, contributed to 2x revenue growth, documented 300+ gatherings, supported 20+ resident artists, and secured a $490,539 public funding award.

## Professional Experience
### THICK ARTS
/Users/jamie/private/archive

## Education & Professional Development
University of California, Santa Cruz.

## Additional
Authorized to work in the U.S.
`);
  try {
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /public-safety/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("an overlong tailored resume fails the ATS structure budget", () => {
  const repeatedDetail = "delivery ".repeat(1100);
  const root = fixture(`
# Jamie Burkart

## Professional Summary
Resident-facing product leader working end-to-end from problem framing and discovery through prioritization, public launch, metrics, and post-launch learning.

## Core Capabilities
Cross-functional product leadership, product briefs, decision memos, accessibility, privacy, user research, version one, MVP, pilot, scoping, sequencing, and instrumentation. Familiarity with WCAG 2.1 AA and Section 508.

## Selected Product & Civic Impact
Co-built WOWList with Richard Caceres across 35 city ecosystems. Built CallNYC. Delivered 30+ pages, contributed to 2x revenue growth at Harry J. Epstein Company, documented 300+ gatherings, supported 20+ resident artists, and secured a $490,539 public funding award.

## Professional Experience
### THICK ARTS
${repeatedDetail}

## Education & Professional Development
University of California, Santa Cruz.

## Additional
Authorized to work in the U.S.
`);
  try {
    const result = run(root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /ats-structure/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
