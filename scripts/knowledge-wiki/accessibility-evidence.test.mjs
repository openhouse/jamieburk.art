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
