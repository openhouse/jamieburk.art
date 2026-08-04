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

test("an overlapping photo credit occurrence fails closed", () => {
  const report = structuredClone(current.report);
  report.focusedVisualReview.occurrences[0].captionOverlapsPrimaryCopy = true;
  report.focusedVisualReview.passed = false;
  const result = validateResponsiveAccessibilityEvidence(defaultRepoRoot, report);
  assert.equal(result.focusedVisualReviewPasses, false);
  assert.equal(result.passed, false);
});

test("an unobserved homepage-to-About path fails closed", () => {
  const report = structuredClone(current.report);
  report.navigationReview.navigationCompleted = false;
  report.navigationReview.pass = false;
  const result = validateResponsiveAccessibilityEvidence(defaultRepoRoot, report);
  assert.equal(result.navigationReviewPasses, false);
  assert.equal(result.passed, false);
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
