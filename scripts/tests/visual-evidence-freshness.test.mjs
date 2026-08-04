import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  computePublicSurfaceFingerprint,
  validateResponsiveAccessibilityEvidence
} from "../knowledge-wiki/accessibility-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const evidenceDir = path.join(repoRoot, "docs/qa/evals-H");
const visualManifest = JSON.parse(
  readFileSync(path.join(evidenceDir, "professor-lenses-browser-qa.json"), "utf8")
);
const interactionManifest = JSON.parse(
  readFileSync(path.join(evidenceDir, "professor-lenses-interaction-qa.json"), "utf8")
);

function sha256(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

test("current visual screenshots are checksum-bound to the current public surface", () => {
  const current = computePublicSurfaceFingerprint(repoRoot);
  assert.equal(visualManifest.publicSurfaceFingerprintPolicy, current.policy);
  assert.equal(visualManifest.publicSurfaceFingerprint, current.fingerprint);
  assert.equal(visualManifest.publicSurfaceFileCount, current.fileCount);
  assert.equal(visualManifest.passed, true);

  const captures = visualManifest.routes.flatMap((route) => route.screenshots);
  assert.equal(captures.length, 4);
  for (const capture of captures) {
    const screenshotPath = path.join(evidenceDir, capture.file);
    assert.ok(existsSync(screenshotPath), capture.file);
    assert.equal(sha256(screenshotPath), capture.sha256, capture.file);
  }
});

test("the full responsive matrix is current and complete", () => {
  const result = validateResponsiveAccessibilityEvidence(repoRoot);
  assert.equal(result.passed, true);
  assert.equal(result.report.rows.length, 56);
});

test("bounded keyboard, mobile-menu, focus, and reflow evidence is current", () => {
  const current = computePublicSurfaceFingerprint(repoRoot);
  assert.equal(interactionManifest.publicSurfaceFingerprintPolicy, current.policy);
  assert.equal(interactionManifest.publicSurfaceFingerprint, current.fingerprint);
  assert.equal(interactionManifest.publicSurfaceFileCount, current.fileCount);
  assert.equal(interactionManifest.passed, true);
  assert.equal(interactionManifest.keyboard.skipLinkIsFirst, true);
  assert.equal(interactionManifest.mobileNavigation.menuOpen, true);
  assert.equal(interactionManifest.reflow.rows.length, 4);
  assert.equal(
    interactionManifest.method.includes("not a human screen-reader"),
    true
  );
  assert.deepEqual(interactionManifest.residualHumanGates, [
    "Human screen-reader review",
    "Human browser zoom review",
    "Jamie visual and content approval",
    "Production deployment and indexing approval"
  ]);
});

test("superseded screenshots are clearly separated from current evidence", () => {
  const historicalReadme = path.join(
    evidenceDir,
    "historical-pre-candidate/README.md"
  );
  assert.ok(existsSync(historicalReadme));
  assert.match(readFileSync(historicalReadme, "utf8"), /not evidence for the current/i);
  for (const filename of [
    "candidate-technical-operations-mobile.png",
    "candidate-lab-certificate-desktop.png",
    "candidate-hje-mobile-proof.png"
  ]) {
    assert.equal(existsSync(path.join(evidenceDir, filename)), false);
    assert.equal(
      existsSync(path.join(evidenceDir, "historical-pre-candidate", filename)),
      true
    );
  }
});
