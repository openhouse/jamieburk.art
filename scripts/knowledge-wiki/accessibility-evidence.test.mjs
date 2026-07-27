import assert from "node:assert/strict";
import { test } from "node:test";

import { validateResponsiveAccessibilityEvidence } from "./accessibility-evidence.mjs";
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

test("a vertically clipped homepage identity fails closed", () => {
  const report = structuredClone(current.report);
  const homepage = report.rows.find(
    (row) => row.path === "/" && row.viewport === 375
  );
  homepage.firstViewport.identityVisible = false;
  homepage.firstViewport.heroContentClipped = true;
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("a hidden governed photo occurrence fails closed", () => {
  const report = structuredClone(current.report);
  const row = report.rows.find(
    (entry) => entry.path === "/" && entry.viewport === 1280
  );
  row.photoOccurrences[0].visible = false;
  report.summary.hiddenPhotoOccurrences = 1;
  assert.equal(
    validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed,
    false
  );
});

test("duplicate rendered credit punctuation fails closed", () => {
  const report = structuredClone(current.report);
  const row = report.rows.find(
    (entry) => entry.path === "/" && entry.viewport === 375
  );
  row.photoOccurrences[0].text += ".";
  report.summary.duplicatePhotoCreditPunctuation = 1;
  assert.equal(
    validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed,
    false
  );
});
