#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(repoRoot, "docs/qa/evals-K/manifest.json");
const defaultSourceInputs = [
  "apps/www/src",
  "apps/www/next.config.ts",
  "apps/www/package.json"
];

function filesFor(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) throw new Error(`Visual-evidence source input is missing: ${relativePath}`);
  if (!statSync(absolutePath).isDirectory()) return [relativePath];
  return readdirSync(absolutePath, { withFileTypes: true })
    .flatMap((entry) => filesFor(path.posix.join(relativePath, entry.name)));
}

function digestFiles(relativePaths, excludedPaths = []) {
  const hash = createHash("sha256");
  const excluded = new Set(excludedPaths);
  for (const relativePath of relativePaths.flatMap(filesFor).filter((item) => !excluded.has(item)).sort()) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, relativePath)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

if (process.argv.includes("--print-source-hash")) {
  const sourceInputs = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, "utf8")).sourceInputs
    : defaultSourceInputs;
  const sourceExcludes = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, "utf8")).sourceExcludes ?? []
    : [];
  console.log(digestFiles(sourceInputs, sourceExcludes));
  process.exit(0);
}

const failures = [];
if (!existsSync(manifestPath)) failures.push("docs/qa/evals-K/manifest.json is missing");

const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { sourceInputs: defaultSourceInputs, captures: [] };
const currentSourceSha256 = digestFiles(manifest.sourceInputs, manifest.sourceExcludes ?? []);
if (manifest.sourceSha256 !== currentSourceSha256) {
  failures.push(`Visual evidence is stale: expected source ${manifest.sourceSha256}, current source ${currentSourceSha256}`);
}

const governedRoutes = new Set(knowledgeLifecycle.proofSurfaceManifests.map(({ route }) => route));
const governedPageRoutes = knowledgeLifecycle.proofSurfaceManifests
  .filter(({ destinationType }) => destinationType === "route")
  .map(({ route }) => route)
  .sort();

if (!manifest.qaMatrix?.resultsPath) {
  failures.push("Visual-evidence QA matrix has no machine-readable results path");
} else {
  const matrixPath = path.join(repoRoot, manifest.qaMatrix.resultsPath);
  if (!existsSync(matrixPath)) {
    failures.push(`Visual-evidence QA matrix is missing: ${manifest.qaMatrix.resultsPath}`);
  } else {
    const matrix = JSON.parse(readFileSync(matrixPath, "utf8"));
    const expectedViewports = manifest.qaMatrix.viewports ?? [];
    const expectedKeys = new Set(
      governedPageRoutes.flatMap((route) => expectedViewports.map((viewport) => `${route}|${viewport}`))
    );
    const actualKeys = new Set();
    let matrixFailureCount = 0;

    if (matrix.mode !== "production") failures.push(`Visual-evidence QA matrix is not production mode: ${matrix.mode}`);
    if (matrix.runtime !== "next-start") failures.push(`Visual-evidence QA matrix is not a built Next.js runtime: ${matrix.runtime}`);
    if (matrix.sourceSha256 !== manifest.sourceSha256) failures.push("Visual-evidence QA matrix is not bound to the manifest source digest");
    if (manifest.qaMatrix.routes !== governedPageRoutes.length) failures.push(`Visual-evidence route count ${manifest.qaMatrix.routes} does not match ${governedPageRoutes.length} governed routes`);
    if (matrix.results?.length !== manifest.qaMatrix.observations) failures.push(`Visual-evidence observation count ${matrix.results?.length ?? 0} does not match ${manifest.qaMatrix.observations}`);

    for (const result of matrix.results ?? []) {
      const key = `${result.route}|${result.viewport}`;
      if (actualKeys.has(key)) failures.push(`Duplicate visual-evidence observation: ${key}`);
      actualKeys.add(key);
      if (!result.passed || result.failures?.length) {
        matrixFailureCount += 1;
        failures.push(`Failed visual-evidence observation: ${key}`);
      }
      for (const [check, passed] of Object.entries({
        status: result.status === 200,
        h1: result.h1Count === 1,
        expectedCopy: result.expectedCopyPassed,
        horizontalOverflow: result.horizontalOverflow === false,
        brokenImages: result.brokenImages === 0,
        duplicateIds: result.duplicateIdCount === 0,
        emptyLinks: result.emptyLinks === 0,
        contrast: result.contrastPassed,
        sourceDisclosure: result.sourceDisclosurePassed,
        skipLink: result.firstTabStopIsSkipLink,
        keyboardTraversal: result.keyboardTraversalPassed,
        reducedMotion: result.reducedMotionPassed,
        productionRuntime: result.developmentIndicatorCount === 0,
        consoleErrors: result.consoleErrorCount === 0,
        pageErrors: result.pageErrorCount === 0
      })) if (!passed) failures.push(`Visual-evidence check ${check} failed: ${key}`);
    }

    for (const key of expectedKeys) if (!actualKeys.has(key)) failures.push(`Missing visual-evidence observation: ${key}`);
    for (const key of actualKeys) if (!expectedKeys.has(key)) failures.push(`Unexpected visual-evidence observation: ${key}`);
    if (matrixFailureCount !== manifest.qaMatrix.failures) failures.push(`Visual-evidence failure count ${matrixFailureCount} does not match ${manifest.qaMatrix.failures}`);
  }
}

for (const capture of manifest.captures) {
  const artifactPath = path.join(repoRoot, capture.artifactPath);
  if (!governedRoutes.has(capture.route)) failures.push(`Visual evidence route is not governed: ${capture.route}`);
  if (!existsSync(artifactPath)) {
    failures.push(`Visual evidence artifact is missing: ${capture.artifactPath}`);
    continue;
  }
  const actualSha256 = createHash("sha256").update(readFileSync(artifactPath)).digest("hex");
  if (capture.artifactSha256 !== actualSha256) failures.push(`Visual evidence artifact hash changed: ${capture.artifactPath}`);
}

if (failures.length) {
  console.error("Visual-evidence freshness check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Visual-evidence freshness check passed for ${manifest.qaMatrix.observations} route/viewport observations and ${manifest.captures.length} source-bound capture(s).`);
