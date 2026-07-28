import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const accessibilityEvidencePath = "docs/qa/evals-H/responsive-route-matrix.json";
export const publicSurfaceFingerprintVersion = 2;
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

function canonicalJson(value) {
  if (Array.isArray(value)) return value.map(canonicalJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, canonicalJson(item)])
    );
  }
  return value;
}

function runtimePackageProjection(sourceText) {
  const packageJson = JSON.parse(sourceText);
  const runtimeScripts = Object.fromEntries(
    ["build", "dev", "start"]
      .filter((name) => typeof packageJson.scripts?.[name] === "string")
      .map((name) => [name, packageJson.scripts[name]])
  );
  return canonicalJson({
    dependencies: packageJson.dependencies ?? {},
    devDependencies: packageJson.devDependencies ?? {},
    engines: packageJson.engines ?? {},
    overrides: packageJson.overrides ?? {},
    packageManager: packageJson.packageManager ?? null,
    resolutions: packageJson.resolutions ?? {},
    scripts: runtimeScripts,
    workspaces: packageJson.workspaces ?? []
  });
}

export function computePublicSurfaceFingerprint(repoRoot) {
  const files = execFileSync(
    "git",
    [
      "ls-files",
      "--cached",
      "--others",
      "--exclude-standard",
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
  hash.update(`public-surface-fingerprint-v${publicSurfaceFingerprintVersion}`);
  hash.update("\0");
  for (const relativePath of files) {
    hash.update(relativePath);
    hash.update("\0");
    const source = readFileSync(path.join(repoRoot, relativePath));
    if (relativePath === "package.json") {
      hash.update(JSON.stringify(runtimePackageProjection(source.toString("utf8"))));
    } else {
      hash.update(source);
    }
    hash.update("\0");
  }
  return {
    version: publicSurfaceFingerprintVersion,
    fingerprint: hash.digest("hex"),
    fileCount: files.length
  };
}

function hashFile(repoRoot, relativePath) {
  if (
    typeof relativePath !== "string" ||
    path.isAbsolute(relativePath) ||
    relativePath.includes("..") ||
    !existsSync(path.join(repoRoot, relativePath))
  ) {
    return null;
  }
  return createHash("sha256")
    .update(readFileSync(path.join(repoRoot, relativePath)))
    .digest("hex");
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
      row.skipLinkPresent === true &&
      row.skipLinkWasFirst === true &&
      row.keyboardTargetsObserved >= 3 &&
      row.keyboardDistinctTargets >= 3 &&
      row.keyboardInvisibleTargets === 0 &&
      row.keyboardTrapDetected === false &&
      Array.isArray(row.photoOccurrences) &&
      row.photoOccurrences.every(
        (occurrence) =>
          typeof occurrence.placementId === "string" &&
          typeof occurrence.photoId === "string" &&
          occurrence.declaredRoute === row.path &&
          occurrence.renderedRoute === row.path &&
          typeof occurrence.crop === "string" &&
          typeof occurrence.derivative === "string" &&
          typeof occurrence.alt === "string" &&
          typeof occurrence.caption === "string" &&
          typeof occurrence.credit === "string"
      ) &&
      /^4\./.test(row.axeVersion)
  );
  const screenshotsPass =
    Array.isArray(report.screenshots) &&
    report.screenshots.length === 6 &&
    report.screenshots.every(
      (screenshot) =>
        canonicalAccessibilityRoutes.includes(screenshot.path) &&
        canonicalAccessibilityViewports.includes(screenshot.viewport) &&
        /^[a-f0-9]{64}$/.test(screenshot.sha256) &&
        hashFile(repoRoot, screenshot.file) === screenshot.sha256
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
    report.summary.keyboardRowsChecked === expectedRows &&
    report.summary.keyboardRowsPassed === expectedRows &&
    report.summary.screenshotsCaptured === 6 &&
    report.summary.photoOccurrenceRowsChecked === expectedRows &&
    report.summary.photoOccurrencesAtDesktop === 11 &&
    report.summary.lazyImagesObserved > 0 &&
    report.summary.unloadedImagesBeforeScroll > 0 &&
    report.summary.lazyImageFollowUpPerformed === true &&
    report.summary.allImagesLoadedAfterScroll === true;

  return {
    passed:
      report.reportVersion === 1 &&
      report.publicSurfaceFingerprintVersion === current.version &&
      report.rows.length === expectedRows &&
      expectedRows === 56 &&
      canonicalCoverage &&
      completeMatrix &&
      rowsPass &&
      screenshotsPass &&
      summaryPasses &&
      report.publicSurfaceFingerprint === current.fingerprint &&
      report.publicSurfaceFileCount === current.fileCount,
    report,
    current,
    canonicalCoverage,
    completeMatrix,
    rowsPass,
    screenshotsPass,
    summaryPasses
  };
}
