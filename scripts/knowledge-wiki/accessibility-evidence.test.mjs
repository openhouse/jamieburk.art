import assert from "node:assert/strict";
import { test } from "node:test";

import { readFileSync } from "node:fs";

import {
  canonicalAccessibilityRoutes,
  computePublicSurfaceFingerprint,
  validateResponsiveAccessibilityEvidence
} from "./accessibility-evidence.mjs";
import { defaultRepoRoot } from "./lib.mjs";

const current = validateResponsiveAccessibilityEvidence(defaultRepoRoot);

test("the responsive accessibility matrix includes every featured project route", () => {
  assert.equal(canonicalAccessibilityRoutes.includes("/work/kc-spaces-fund"), true);
});

test("candidate-bound responsive accessibility evidence passes", () => {
  assert.equal(current.passed, true);
});

test("stale public-surface evidence fails closed", () => {
  const report = structuredClone(current.report);
  report.publicSurfaceFingerprint = "0".repeat(64);
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("unrelated root QA scripts do not invalidate visual evidence", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  packageJson.scripts.check = `${packageJson.scripts.check} && npm run unrelated-qa-probe`;
  const mutated = computePublicSurfaceFingerprint(defaultRepoRoot, {
    fileOverrides: { "package.json": JSON.stringify(packageJson) }
  });
  assert.equal(mutated.fingerprint, current.current.fingerprint);
});

test("root build-script changes still invalidate visual evidence", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  packageJson.scripts.build = "node unreviewed-build-probe.mjs";
  const mutated = computePublicSurfaceFingerprint(defaultRepoRoot, {
    fileOverrides: { "package.json": JSON.stringify(packageJson) }
  });
  assert.notEqual(mutated.fingerprint, current.current.fingerprint);
});

test("public source changes still invalidate visual evidence", () => {
  const relativePath = "apps/www/src/components/Hero.tsx";
  const mutated = computePublicSurfaceFingerprint(defaultRepoRoot, {
    fileOverrides: {
      [relativePath]: `${readFileSync(relativePath, "utf8")}\n// visual mutation probe`
    }
  });
  assert.notEqual(mutated.fingerprint, current.current.fingerprint);
});

test("an axe violation fails closed", () => {
  const report = structuredClone(current.report);
  report.rows[0].violations.push({ id: "color-contrast", impact: "serious", nodeCount: 1 });
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("an invisible resume action fails even when axe reports no violation", () => {
  const report = structuredClone(current.report);
  report.resumeActionReview = {
    route: "/work/technical-operations",
    occurrences: [360, 375, 768, 1280].map((viewport) => ({
      viewport, label: "Download resume PDF", contrastRatio: 1, visible: true
    }))
  };
  const result = validateResponsiveAccessibilityEvidence(defaultRepoRoot, report);
  assert.equal(result.resumeActionReviewPasses, false);
  assert.equal(result.passed, false);
});

test("a low-contrast focused resume action cannot hide behind a passing summary", () => {
  const report = structuredClone(current.report);
  report.resumeActionReview = {
    route: "/work/technical-operations",
    occurrences: [360, 375, 768, 1280].map((viewport) => ({
      viewport, label: "Download resume PDF", contrastRatio: 5.59, visible: true,
      states: { default: { contrastRatio: 5.59 }, hover: { contrastRatio: 5.59 }, focus: { contrastRatio: 1 } },
      keyboardFocusVisible: true
    }))
  };
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).resumeActionReviewPasses, false);
});

test("a focused resume action requires a contrasting keyboard outline", () => {
  const report = structuredClone(current.report);
  report.resumeActionReview = {
    route: "/work/technical-operations",
    occurrences: [360, 375, 768, 1280].map((viewport) => ({
      viewport, label: "Download resume PDF", contrastRatio: 5.59, visible: true,
      states: { default: { contrastRatio: 5.59 }, hover: { contrastRatio: 5.59 }, focus: { contrastRatio: 5.59 } },
      keyboardFocusVisible: true, keyboardFocus: { contrastRatio: 1 }
    }))
  };
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).resumeActionReviewPasses, false);
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
