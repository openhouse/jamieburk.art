import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  computePublicSurfaceFingerprint,
  validateResponsiveAccessibilityEvidence
} from "./accessibility-evidence.mjs";
import { defaultRepoRoot } from "./lib.mjs";

const current = validateResponsiveAccessibilityEvidence(defaultRepoRoot);

test("candidate-bound responsive accessibility evidence passes", () => {
  assert.equal(current.passed, true);
});

test("stale public-surface evidence fails closed", () => {
  const report = structuredClone(current.report);
  report.publicSurfaceFingerprint = "0".repeat(64);
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("an axe violation fails closed", () => {
  const report = structuredClone(current.report);
  report.rows[0].violations.push({ id: "color-contrast", impact: "serious", nodeCount: 1 });
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("an unverified lazy-image follow-up fails closed", () => {
  const report = structuredClone(current.report);
  report.summary.lazyImageFollowUpPerformed = false;
  report.summary.allImagesLoadedAfterScroll = false;
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("untracked public files are included while ignored files stay excluded", () => {
  const root = mkdtempSync(path.join(tmpdir(), "jb-accessibility-fingerprint-"));
  execFileSync("git", ["init", "-q"], { cwd: root });
  mkdirSync(path.join(root, "apps/www/src"), { recursive: true });
  writeFileSync(path.join(root, "package.json"), "{}\n");
  writeFileSync(path.join(root, "apps/www/src/tracked.ts"), "export const tracked = true;\n");
  execFileSync("git", ["add", "package.json", "apps/www/src/tracked.ts"], { cwd: root });

  const tracked = computePublicSurfaceFingerprint(root);
  writeFileSync(path.join(root, "apps/www/src/untracked.ts"), "export const untracked = true;\n");
  const withUntracked = computePublicSurfaceFingerprint(root);
  writeFileSync(path.join(root, ".gitignore"), "apps/www/src/ignored.ts\n");
  writeFileSync(path.join(root, "apps/www/src/ignored.ts"), "private\n");
  const withIgnored = computePublicSurfaceFingerprint(root);

  assert.equal(tracked.fileCount, 2);
  assert.equal(withUntracked.fileCount, 3);
  assert.notEqual(withUntracked.fingerprint, tracked.fingerprint);
  assert.deepEqual(withIgnored, withUntracked);
});

test("a coordinated canonical-route substitution fails closed", () => {
  const report = structuredClone(current.report);
  report.routes[0] = "/noncanonical-replacement";
  for (const row of report.rows) {
    if (row.path === "/") row.path = "/noncanonical-replacement";
  }
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("a coordinated canonical-viewport substitution fails closed", () => {
  const report = structuredClone(current.report);
  report.viewports[0] = 1024;
  for (const row of report.rows) {
    if (row.viewport === 360) row.viewport = 1024;
  }
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("missing keyboard or screenshot evidence fails closed", () => {
  const report = structuredClone(current.report);
  report.rows[0].keyboardTrapDetected = true;
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);

  const missingScreenshot = structuredClone(current.report);
  missingScreenshot.screenshots.pop();
  assert.equal(
    validateResponsiveAccessibilityEvidence(defaultRepoRoot, missingScreenshot).passed,
    false
  );
});
