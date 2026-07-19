#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const censusPath =
  "docs/knowledge-bank/corpora/nycac-shared-folder-public-census-2026-07-19.json";
export const expectedCensusSha256 =
  "c8ccf50784ae4a7f4792131c82d5753e3510dc26796f3039292fb03b745cb49c";

export const publicFiles = [
  censusPath,
  "docs/knowledge-bank/runs/2026-07-19-nycac-shared-folder-full-population.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-shared-folder.md",
  "docs/knowledge-bank/briefs/nycac-civic-operations-application-brief.md",
  "docs/knowledge-wiki/projects/nyc-artist-coalition.md",
  "docs/knowledge-wiki/sources/nycac-shared-folder-census-2026.md",
  "docs/knowledge-wiki/research-runs/nycac-shared-folder-2026.md",
  "docs/knowledge-wiki/applications/nycac-civic-operations-evidence.md",
  "docs/knowledge-wiki/evaluations/nycac-shared-folder-coverage.md",
  "apps/www/src/content/work/nyc-artist-coalition.mdx",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/knowledge-bank/nycac-shared-folder-archive-production.ts"
];

export function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sumValues(record = {}) {
  return Object.values(record).reduce((sum, value) => sum + Number(value), 0);
}

function includesAll(values, patterns) {
  return patterns.every((pattern) =>
    values.some((value) => pattern.test(String(value)))
  );
}

export function evaluateCensus(census, censusText = JSON.stringify(census)) {
  const errors = [];
  const fail = (condition, message) => {
    if (!condition) errors.push(message);
  };

  fail(census.schemaVersion === 1, "schema version drift");
  fail(
    census.corpus === "nyc-artist-coalition-shared-folder",
    "corpus identity drift"
  );
  fail(census.snapshotDate === "2026-07-19", "snapshot date drift");

  const population = census.population ?? {};
  fail(population.uniqueItems === 2408, "population must equal 2,408");
  fail(population.foldersClosed === 258, "folder closure must equal 258");
  fail(
    population.rootItems === population.rootFolders + population.rootFiles &&
      population.rootItems === 61,
    "root reconciliation drift"
  );
  fail(
    population.foldersClosed ===
      population.bottomVerifiedFolders +
        population.allRowsVisibleWithoutScrollFolders,
    "folder closure modes do not reconcile"
  );
  fail(
    population.queuedFolders === 0 && population.unresolvedFolders === 0,
    "folder traversal is not closed"
  );

  const coverage = census.coverage ?? {};
  fail(
    coverage.populationTotal === 2408 &&
      coverage.inventoriedTotal === coverage.populationTotal &&
      coverage.classifiedTotal === coverage.populationTotal &&
      coverage.dispositionedTotal === coverage.populationTotal,
    "coverage equation does not close"
  );
  fail(
    coverage.priorityDocumentMetadataReviewed === 9 &&
      coverage.contentReviewedTotal === 2,
    "priority-reading denominator drift"
  );
  fail(
    coverage.rightsReviewedTotal === 0 &&
      coverage.publicSourceTotal === 0 &&
      coverage.protectedTotal === 2408 &&
      coverage.claimLinkedTotal === 0 &&
      coverage.projectionSelectedTotal === 1,
    "staged-research coverage semantics drift"
  );

  fail(sumValues(census.formats) === 2408, "format totals do not reconcile");
  fail(
    sumValues(census.sourceClasses) === 2408,
    "source-class totals do not reconcile"
  );
  fail(
    sumValues(census.primaryDispositions) === 2408,
    "primary dispositions do not reconcile"
  );
  fail(
    sumValues(census.missionClusters) === 2408,
    "mission-cluster totals do not reconcile"
  );
  fail(
    census.primaryDispositions?.pendingRightsConsentAttributionOrJamieReview ===
      1896 &&
      census.primaryDispositions?.protectedMetadataOnly === 511 &&
      census.primaryDispositions?.rejectedFromClaimUseWithReason === 1,
    "one-primary-disposition contract drift"
  );

  const custody = census.custody ?? {};
  fail(
    custody.exactManifestStoredOutsidePublicRepository === true &&
      /^[a-f0-9]{64}$/.test(custody.exactManifestSha256 ?? "") &&
      custody.rawContentInRepository === false &&
      custody.exactPrivateLocatorsInRepository === false,
    "private custody boundary drift"
  );

  fail(
    includesAll(census.boundaries ?? [], [
      /population accounting/i,
      /not authorship evidence/i,
      /rights, consent, attribution/i,
      /do not independently establish public impact/i
    ]),
    "census boundaries are incomplete"
  );
  fail(
    includesAll(census.antiClaims ?? [], [
      /authored all items/i,
      /approved for publication/i,
      /content-read or rights-reviewed/i,
      /complete historical record/i,
      /sole causality/i
    ]),
    "census anti-claims are incomplete"
  );

  for (const [pattern, label] of [
    [/drive\.google\.com\/drive\/folders/i, "private folder URL"],
    [/resourcekey=/i, "resource key"],
    [/\/Users\//i, "absolute user path"],
    [/\/Volumes\//i, "absolute volume path"],
    [/Mobile Documents/i, "CloudDocs path"],
    [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, "email address"],
    [/(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/, "phone number"]
  ]) {
    fail(!pattern.test(censusText), `public census contains ${label}`);
  }

  return errors;
}

export function evaluatePublicSemantics(text) {
  const errors = [];
  const require = (pattern, message) => {
    if (!pattern.test(text)) errors.push(message);
  };
  const reject = (pattern, message) => {
    if (pattern.test(text)) errors.push(message);
  };

  require(/Folder access is not publication permission/i, "access boundary missing");
  require(/not authorship/i, "authorship boundary missing");
  require(/collective|coalition and policy outcomes belong/i, "collective credit missing");
  require(/Jamie builds operating structure for ambiguous public-facing work/i, "application referral sentence missing");
  require(/what became usable/i, "application-usefulness framing missing");
  require(/human gates/i, "human-gate language missing");
  require(/automated|automation/i, "automation boundary missing");
  require(/2,408/, "population claim missing from public synthesis");
  require(/258 folders/, "folder denominator missing from public synthesis");

  reject(/drive\.google\.com\/drive\/folders/i, "private folder URL leaked");
  reject(/resourcekey=/i, "resource key leaked");
  reject(/\/Users\//i, "absolute user path leaked");
  reject(/\/Volumes\//i, "absolute volume path leaked");
  reject(/Mobile Documents/i, "CloudDocs path leaked");

  return errors;
}

export function evaluatePublicFileSemantics(textByPath) {
  const errors = [];
  const requireIn = (relativePath, pattern, message) => {
    if (!pattern.test(textByPath[relativePath] ?? "")) {
      errors.push(`${relativePath}: ${message}`);
    }
  };

  requireIn(
    "docs/knowledge-bank/runs/2026-07-19-nycac-shared-folder-full-population.md",
    /Folder access is not publication permission/i,
    "access boundary missing"
  );
  requireIn(
    "docs/knowledge-bank/runs/2026-07-19-nycac-shared-folder-full-population.md",
    /not authorship/i,
    "authorship boundary missing"
  );
  requireIn(
    "docs/knowledge-bank/projects/nyc-artist-coalition-shared-folder.md",
    /collective and institutional credit/i,
    "collective-credit boundary missing"
  );
  requireIn(
    "docs/knowledge-bank/briefs/nycac-civic-operations-application-brief.md",
    /Jamie builds operating structure for ambiguous public-facing work/i,
    "application actor sentence missing"
  );
  requireIn(
    "docs/knowledge-bank/briefs/nycac-civic-operations-application-brief.md",
    /what became usable/i,
    "application result framing missing"
  );
  requireIn(
    "docs/knowledge-wiki/evaluations/nycac-shared-folder-coverage.md",
    /human gates/i,
    "human-gate control missing"
  );
  requireIn(
    "apps/www/src/content/work/nyc-artist-coalition.mdx",
    /exact\s+records\s+remain protected/i,
    "public archive boundary missing"
  );
  requireIn(
    "apps/www/src/content/work/nyc-artist-coalition.mdx",
    /collective outcomes/i,
    "public collective-credit boundary missing"
  );

  return errors;
}

export function checkRepository() {
  const censusText = read(censusPath);
  const census = JSON.parse(censusText);
  const publicTexts = Object.fromEntries(
    publicFiles.map((relativePath) => [relativePath, read(relativePath)])
  );
  const publicText = Object.values(publicTexts).join("\n");
  const errors = [
    ...evaluateCensus(census, censusText),
    ...evaluatePublicSemantics(publicText),
    ...evaluatePublicFileSemantics(publicTexts)
  ];

  if (sha256(censusText) !== expectedCensusSha256) {
    errors.push("public census digest drift");
  }

  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-SHARED-FOLDER-PUBLIC-CENSUS-2026"
  );
  const protectedSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-SHARED-FOLDER-CUSTODY-MANIFEST-2026"
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-SHARED-ARCHIVE-CENSUS"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-NYCAC-SHARED-ARCHIVE-ROLE-ATTRIBUTION-2026"
  );
  const intake = knowledgeBank.intake.find(
    (item) => item.id === "INT-NYCAC-SHARED-FOLDER-2026"
  );

  if (source?.visibility !== "public") errors.push("public census source missing");
  if (
    protectedSource?.visibility !== "protected" ||
    !protectedSource.protectedLocatorId
  ) {
    errors.push("protected manifest source boundary missing");
  }
  if (
    claim?.status !== "confirmed-with-boundary" ||
    !claim.projections.some(
      (projection) =>
        projection.key === "case-study" &&
        projection.status === "active" &&
        projection.surfaces.includes("/work/nyc-artist-coalition")
    ) ||
    claim.antiClaims.length < 5 ||
    claim.boundaries.length < 4
  ) {
    errors.push("canonical census claim is incomplete");
  }
  if (inquiry?.resultStatus !== "partially-recovered") {
    errors.push("item-level role inquiry status drift");
  }
  if (
    intake?.status !== "matured" ||
    !intake.claimIds.includes("CLM-NYCAC-SHARED-ARCHIVE-CENSUS") ||
    !intake.inquiryIds.includes(
      "INQ-NYCAC-SHARED-ARCHIVE-ROLE-ATTRIBUTION-2026"
    )
  ) {
    errors.push("knowledge lifecycle closure missing");
  }

  const tracked = execFileSync("git", ["ls-files"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  if (/nycac-shared-folder-private-manifest.*\.json/i.test(tracked)) {
    errors.push("exact private manifest entered git");
  }

  return { census, censusText, publicText, publicTexts, errors };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = checkRepository();
  if (result.errors.length) {
    console.error("NYCAC shared-folder census check failed:");
    result.errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(
    "NYCAC shared-folder census passes population closure, public-safety, claim, and lifecycle checks."
  );
}
