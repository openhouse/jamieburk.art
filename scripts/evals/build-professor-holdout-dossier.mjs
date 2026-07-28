import { createHash } from "node:crypto";
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  fingerprintProfessorCandidate,
  professorCandidateRelativePaths,
} from "../lib/professor-lens-eval.mjs";
import { validateResponsiveAccessibilityEvidence } from "../knowledge-wiki/accessibility-evidence.mjs";

const repoRoot = path.resolve(process.argv[2] ?? process.cwd());
const dossierRoot = path.resolve(process.argv[3] ?? "");

if (!process.argv[3]) {
  throw new Error(
    "Usage: build-professor-holdout-dossier.mjs <repo-root> <dossier-root>",
  );
}

const screenshotPaths = [
  "docs/qa/evals-H/layout-B-screenshots/home-mobile.png",
  "docs/qa/evals-H/layout-B-screenshots/home-desktop.png",
  "docs/qa/evals-H/layout-B-screenshots/about-mobile.png",
  "docs/qa/evals-H/layout-B-screenshots/about-desktop.png",
  "docs/qa/evals-H/layout-B-screenshots/technical-operations-mobile.png",
  "docs/qa/evals-H/layout-B-screenshots/fair-rent-desktop.png",
  "docs/qa/evals-H/layout-B-screenshots/kc-town-hall-desktop.png",
];

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function copyRelative(relativePath) {
  const sourcePath = path.join(repoRoot, relativePath);
  const targetPath = path.join(dossierRoot, relativePath);
  const bytes = readFileSync(sourcePath);
  mkdirSync(path.dirname(targetPath), { recursive: true });
  copyFileSync(sourcePath, targetPath);
  return bytes;
}

rmSync(dossierRoot, { recursive: true, force: true });
mkdirSync(dossierRoot, { recursive: true, mode: 0o700 });

const candidateFiles = {};
for (const relativePath of professorCandidateRelativePaths) {
  const bytes = copyRelative(relativePath);
  candidateFiles[relativePath] = bytes;
  if (/\/(?:Users|Volumes)\//i.test(bytes.toString("utf8"))) {
    throw new Error(`Private absolute path found in ${relativePath}`);
  }
}

const screenshots = screenshotPaths.map((relativePath) => {
  const bytes = copyRelative(relativePath);
  return {
    path: relativePath,
    sha256: sha256(bytes),
  };
});

const accessibility = validateResponsiveAccessibilityEvidence(repoRoot);
if (!accessibility.passed) {
  throw new Error(
    "Responsive accessibility evidence must pass before a holdout dossier is built.",
  );
}

const candidateSha256 = fingerprintProfessorCandidate(candidateFiles);
const manifest = {
  version: 2,
  algorithm:
    "For each candidate path in declared order: SHA-256(path + NUL + raw bytes + NUL).",
  candidateSha256,
  candidateFileCount: professorCandidateRelativePaths.length,
  candidateRelativePaths: professorCandidateRelativePaths,
  screenshots,
  deterministicEvidence: {
    accessibilityFingerprint:
      accessibility.report.publicSurfaceFingerprint,
    accessibilityCheckedAt: accessibility.report.checkedAt,
    accessibilitySummary: accessibility.report.summary,
  },
  boundaries: [
    "The dossier contains public-repository candidate files and seven generated screenshots only.",
    "Final professor scorecards and previous model judgments are excluded.",
    "Private source locators, raw oral histories, and unapproved source pixels are excluded.",
    "Image rights, represented-person consent, exact credit and crop, Jamie approval, deployment, and indexing remain human gates.",
  ],
};

writeFileSync(
  path.join(dossierRoot, "candidate-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(
  `${manifest.candidateFileCount} candidate files, ${screenshots.length} screenshots, candidate ${candidateSha256}`,
);
