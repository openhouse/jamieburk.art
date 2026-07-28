import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

export const accessibilityEvidencePath = "docs/qa/evals-H/responsive-route-matrix.json";
export const canonicalAccessibilityRoutes = Object.freeze([
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory",
  "/work/harry-j-epstein",
  "/work/fair-rent-nyc",
  "/work/callnyc",
  "/work/wowlist",
  "/work/196-sunday-dinner",
  "/work/kc-town-hall"
]);
export const canonicalAccessibilityViewports = Object.freeze([360, 375, 768, 1280]);

export function computePublicSurfaceFingerprint(repoRoot) {
  const files = execFileSync(
    "git",
    [
      "ls-files",
      "--cached",
      "--others",
      "--exclude-standard",
      "--",
      "apps/www",
      "package.json",
      "package-lock.json"
    ],
    { cwd: repoRoot, encoding: "utf8" }
  )
    .trim()
    .split("\n")
    .filter(Boolean)
    .sort();
  const hash = createHash("sha256");
  for (const relativePath of files) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, relativePath)));
    hash.update("\0");
  }
  return { fingerprint: hash.digest("hex"), fileCount: files.length };
}

export function validateResponsiveAccessibilityEvidence(repoRoot, reportOverride) {
  const report = reportOverride ?? JSON.parse(
    readFileSync(path.join(repoRoot, accessibilityEvidencePath), "utf8")
  );
  const current = computePublicSurfaceFingerprint(repoRoot);
  const canonicalCoverage =
    JSON.stringify(report.routes) === JSON.stringify(canonicalAccessibilityRoutes) &&
    JSON.stringify(report.viewports) === JSON.stringify(canonicalAccessibilityViewports);
  const expectedRows = report.routes.length * report.viewports.length;
  const observedKeys = new Set(report.rows.map((row) => `${row.viewport}:${row.path}`));
  const expectedKeys = new Set(
    report.viewports.flatMap((viewport) =>
      report.routes.map((route) => `${viewport}:${route}`)
    )
  );
  const completeMatrix =
    observedKeys.size === expectedKeys.size &&
    [...expectedKeys].every((key) => observedKeys.has(key));
  const rowsPass = report.rows.every(
    (row) =>
      row.httpStatus >= 200 &&
      row.httpStatus < 400 &&
      row.violations.length === 0 &&
      row.overflowElements === 0 &&
      row.brokenImagesAfterScroll === 0 &&
      row.unlabeledImages === 0 &&
      row.failedRequests.length === 0 &&
      row.h1Count === 1 &&
      row.mainPresent === true &&
      /^4\./.test(row.axeVersion)
  );
  const summaryPasses =
    report.summary.rowCount === expectedRows &&
    report.summary.axeViolations === 0 &&
    report.summary.criticalAxeViolations === 0 &&
    report.summary.overflowElements === 0 &&
    report.summary.brokenImagesAfterScroll === 0 &&
    report.summary.unlabeledImages === 0 &&
    report.summary.failedRequests === 0 &&
    report.summary.nonSuccessResponses === 0 &&
    report.summary.invalidHeadingOrLandmarkRows === 0 &&
    report.summary.lazyImagesObserved > 0 &&
    report.summary.unloadedImagesBeforeScroll > 0 &&
    report.summary.lazyImageFollowUpPerformed === true &&
    report.summary.allImagesLoadedAfterScroll === true;

  return {
    passed:
      report.reportVersion === 1 &&
      report.rows.length === expectedRows &&
      expectedRows === 56 &&
      canonicalCoverage &&
      completeMatrix &&
      rowsPass &&
      summaryPasses &&
      report.publicSurfaceFingerprint === current.fingerprint &&
      report.publicSurfaceFileCount === current.fileCount,
    report,
    current,
    canonicalCoverage,
    completeMatrix,
    rowsPass,
    summaryPasses
  };
}
