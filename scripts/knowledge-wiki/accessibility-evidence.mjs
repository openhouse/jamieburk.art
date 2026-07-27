import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

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

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function loadPhotoOccurrenceExpectations(repoRoot) {
  const registry = JSON.parse(
    readFileSync(
      path.join(repoRoot, "apps/www/src/data/photo-placement-registry.json"),
      "utf8"
    )
  ).placements;
  const edition = readFileSync(
    path.join(
      repoRoot,
      "docs/knowledge-bank/projections/photography/layout-d-portfolio-edition.md"
    ),
    "utf8"
  );
  const projectionDirectory = path.join(
    repoRoot,
    "docs/knowledge-bank/projections/photography"
  );
  const records = new Map(
    [...edition.matchAll(/\((layout-d-[^)]+\.md)\)/g)]
      .map((match) => path.join(projectionDirectory, match[1]))
      .filter((filePath) =>
        !filePath.endsWith("layout-d-resume-protected-absence.md")
      )
      .map((filePath) => {
        const { data } = matter(readFileSync(filePath, "utf8"));
        return [data.id, data];
      })
  );

  return registry.map((placement) => {
    const record = records.get(placement.occurrenceId);
    return {
      ...placement,
      caption: normalizeText(record?.caption?.text),
      credit: normalizeText(record?.credit?.text)
    };
  });
}

export function computePublicSurfaceFingerprint(repoRoot) {
  const files = execFileSync(
    "git",
    ["ls-files", "apps/www", "package.json", "package-lock.json"],
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
  const photoExpectations = loadPhotoOccurrenceExpectations(repoRoot);
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
  const photoOccurrenceRows = report.rows.flatMap((row) =>
    (row.photoOccurrences ?? []).map((occurrence) => ({
      ...occurrence,
      path: row.path,
      viewport: row.viewport
    }))
  );
  const photoOccurrenceAuditPasses = report.rows.every((row) => {
    const expected = photoExpectations.filter(
      (placement) => placement.route === row.path
    );
    const observed = row.photoOccurrences ?? [];
    if (observed.length !== expected.length) return false;
    const observedById = new Map(
      observed.map((occurrence) => [occurrence.occurrenceId, occurrence])
    );
    return expected.every((placement) => {
      const occurrence = observedById.get(placement.occurrenceId);
      const expectedText = `${placement.caption} ${placement.credit}`;
      const renderedText = normalizeText(occurrence?.text);
      const expectedAt = renderedText.indexOf(expectedText);
      return (
        occurrence?.visible === true &&
        expectedAt >= 0 &&
        !renderedText.slice(expectedAt + expectedText.length).startsWith(".")
      );
    });
  });
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
      (row.path !== "/" ||
        (row.firstViewport?.identityVisible === true &&
          row.firstViewport?.roleVisible === true &&
          row.firstViewport?.propositionVisible === true &&
          row.firstViewport?.heroContentClipped === false &&
          row.firstViewport?.nextSectionHintVisible === true)) &&
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
    report.summary.invalidHomepageFirstViewportRows === 0 &&
    report.summary.photoOccurrenceRows === photoExpectations.length * report.viewports.length &&
    report.summary.hiddenPhotoOccurrences === 0 &&
    report.summary.governedPhotoTextMismatches === 0 &&
    report.summary.duplicatePhotoCreditPunctuation === 0 &&
    report.summary.lazyImagesObserved > 0 &&
    report.summary.unloadedImagesBeforeScroll > 0 &&
    report.summary.lazyImageFollowUpPerformed === true &&
    report.summary.allImagesLoadedAfterScroll === true;

  return {
    passed:
      report.reportVersion === 3 &&
      report.rows.length === expectedRows &&
      expectedRows === 56 &&
      canonicalCoverage &&
      completeMatrix &&
      photoOccurrenceAuditPasses &&
      rowsPass &&
      summaryPasses &&
      report.publicSurfaceFingerprint === current.fingerprint &&
      report.publicSurfaceFileCount === current.fileCount,
    report,
    current,
    canonicalCoverage,
    completeMatrix,
    photoOccurrenceAuditPasses,
    photoOccurrenceRows,
    rowsPass,
    summaryPasses
  };
}
