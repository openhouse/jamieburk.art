import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const sum = (record) => Object.values(record).reduce((total, value) => total + value, 0);

export function evaluateNyCACSharedFolderCensus(census) {
  const failures = [];
  const { coverage, population, formatCounts, dispositionCounts, closeReading, method, privateManifest } = census;

  const requireValue = (condition, message) => {
    if (!condition) failures.push(message);
  };

  requireValue(coverage.population_total === 2078, "population total must be 2,078");
  for (const field of ["inventoried_total", "classified_total", "dispositioned_total", "protected_total"]) {
    requireValue(coverage[field] === coverage.population_total, `${field} must equal population_total`);
  }
  requireValue(coverage.content_reviewed_total === 36, "content-reviewed total must be 36");
  requireValue(coverage.rights_reviewed_total === 0, "rights-reviewed total must remain zero");
  requireValue(coverage.public_source_total === 0, "raw Drive public-source total must remain zero");
  requireValue(coverage.projection_selected_total === 2, "projection-selected total must be two");
  requireValue(population.topLevelTotal === population.topLevelFolderTotal + population.topLevelLooseFileTotal, "root population does not reconcile");
  requireValue(population.topLevelTotal === 61, "root population must be 61");
  requireValue(population.folderTotal + population.nonFolderTotal === coverage.population_total, "folder and non-folder totals do not reconcile");
  requireValue(population.traversalFolderTotal === population.folderTotal, "folder traversal is incomplete");
  requireValue(population.traversalExceptionTotal === population.emptyFolderTotal + population.recoveredFolderTotal, "traversal exceptions are not fully adjudicated");
  requireValue(population.emptyFolderTotal === 18 && population.recoveredFolderTotal === 2, "exception adjudication must be 18 empty and two recovered");
  requireValue(sum(formatCounts) === coverage.population_total, "format counts do not reconcile");
  requireValue(sum(dispositionCounts) === coverage.population_total, "disposition counts do not reconcile");
  requireValue(closeReading.recordTotal === 36 && closeReading.errorTotal === 0, "close-reading count or error total is incorrect");
  requireValue(method.rootCountReconciled === true && method.recursiveQueueClosed === true, "census queue is not closed");
  requireValue(method.downloadFailureWasCoverageGap === false, "ZIP failure must not be represented as a coverage gap");
  requireValue(/^[a-f0-9]{64}$/.test(privateManifest.sha256), "private manifest requires a lowercase SHA-256 digest");
  requireValue(privateManifest.exactLocatorPublished === false, "exact private locator must not be published");
  requireValue(privateManifest.rawContentInGit === false, "raw private content must not enter Git");
  requireValue(!Array.isArray(census.items), "public census must not contain item records");

  return failures;
}

export function findNyCACSharedFolderLeak(text) {
  const patterns = [
    [/https?:\/\/(?:drive|docs)\.google\.com/i, "Google Drive or Docs URL"],
    [/resourcekey\s*=|resourcekey%3d/i, "Drive resource key"],
    [/(?:\/Users\/|\/Volumes\/|Mobile Documents|private-source-vault)/i, "private local path"],
    [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, "email address"],
    [/"(?:privateId|parentPrivateId|ownerDisplay|items)"\s*:/i, "private item-level field"],
  ];
  return patterns.find(([pattern]) => pattern.test(text))?.[1] ?? null;
}

export function runNyCACSharedFolderGuard(repoRoot) {
  const artifactPaths = [
    "apps/www/src/data/knowledge-bank/fixtures/nycac-shared-folder-public-census.json",
    "apps/www/src/data/knowledge-bank/nycac-shared-folder-production.ts",
    "docs/knowledge-bank/projects/nyc-artist-coalition-shared-folder-2026-07-19.md",
    "docs/knowledge-bank/employment/nyc-artist-coalition-application-brief.md",
  ];
  const failures = [];
  for (const relativePath of artifactPaths) {
    const absolutePath = path.join(repoRoot, relativePath);
    if (!existsSync(absolutePath)) {
      failures.push(`${relativePath} is missing`);
      continue;
    }
    const leak = findNyCACSharedFolderLeak(readFileSync(absolutePath, "utf8"));
    if (leak) failures.push(`${relativePath} contains ${leak}`);
  }

  const censusPath = path.join(repoRoot, artifactPaths[0]);
  if (existsSync(censusPath)) {
    failures.push(...evaluateNyCACSharedFolderCensus(JSON.parse(readFileSync(censusPath, "utf8"))));
  }

  const modulePath = path.join(repoRoot, artifactPaths[1]);
  const dossierPath = path.join(repoRoot, artifactPaths[2]);
  const applicationPath = path.join(repoRoot, artifactPaths[3]);
  const recordsPath = path.join(repoRoot, "apps/www/src/data/knowledge-bank/records.ts");
  const civicPath = path.join(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx");
  const technicalPath = path.join(repoRoot, "apps/www/src/app/work/technical-operations/page.tsx");
  const readIfPresent = (file) => existsSync(file) ? readFileSync(file, "utf8") : "";
  const moduleText = readIfPresent(modulePath);
  const dossierText = readIfPresent(dossierPath);
  const applicationText = readIfPresent(applicationPath);
  const recordsText = readIfPresent(recordsPath);
  const civicText = readIfPresent(civicPath);
  const technicalText = readIfPresent(technicalPath);

  const requireText = (text, needle, label) => {
    if (!text.includes(needle)) failures.push(`${label} is missing ${needle}`);
  };

  for (const exportedName of [
    "nycacSharedFolderCaptures",
    "nycacSharedFolderSources",
    "nycacSharedFolderObservations",
    "nycacSharedFolderClaims",
    "nycacSharedFolderResearchTasks",
    "nycacSharedFolderInquiries",
  ]) {
    requireText(recordsText, `...${exportedName}`, "knowledge-bank registry");
  }
  for (const claimId of [
    "CLM-NYCAC-PARTICIPATION-TO-ACTION-SYSTEM",
    "CLM-NYCAC-MACHINE-READABLE-CIVIC-DESIGN",
  ]) {
    requireText(moduleText, claimId, "shared-folder claim module");
    requireText(civicText, claimId, "civic case study");
  }
  requireText(technicalText, "CLM-NYCAC-MACHINE-READABLE-CIVIC-DESIGN", "technical-operations page");
  requireText(moduleText, "SRC-NYCAC-COUNCIL-SMALL-BUSINESS-HEARING-2019-03-18", "shared-folder claim module");
  requireText(moduleText, "CLM-NYCAC-TOWN-HALL-PRODUCTION-ROLE-CANDIDATE", "held claim registry");
  requireText(moduleText, "CLM-NYCAC-FAIRRENT-WEB-IMPLEMENTATION-CANDIDATE", "held claim registry");
  requireText(moduleText, 'status: "hold"', "held claim projections");
  requireText(moduleText, "RT-NYCAC-SHARED-FOLDER-MARCH-ANALYSIS-VALIDATION", "research queue");
  requireText(moduleText, "RT-NYCAC-SHARED-FOLDER-RIGHTS-QUEUE", "rights queue");
  requireText(dossierText, "100 percent means", "public census dossier");
  requireText(dossierText, "36", "public census dossier");
  requireText(dossierText, "`/proofs` page", "route boundary");
  for (const heading of ["## Application-Ready Proof", "## Interview Language", "## Role Translation", "## Held For Further Work", "## Anti-Claims"]) {
    requireText(applicationText, heading, "application brief");
  }

  for (const blockedRoute of [
    "apps/www/src/app/proofs",
    "apps/www/src/app/knowledge-bank",
    "apps/www/src/app/public-claims",
  ]) {
    if (existsSync(path.join(repoRoot, blockedRoute))) failures.push(`${blockedRoute} must not exist`);
  }

  return failures;
}
