#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateNycacSharedFolder,
  nycacSharedFolderFixture
} from "./lib/nycac-shared-folder-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.join(
  repoRoot,
  "docs/knowledge-bank/nyc-artist-coalition-shared-folder-census-2026-07-18.md"
);
const batchPath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/nycac-shared-folder-batch-2026-07-18.ts"
);
const developmentPath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/nycac-shared-folder-development-2026-07-18.ts"
);
const proofPath = path.join(repoRoot, "apps/www/src/data/proofs.ts");
const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
const caseStudyPath = path.join(
  repoRoot,
  "apps/www/src/content/work/fair-rent-nyc.mdx"
);
const registryPath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/public-registry.json"
);
const reconciliationPath = path.join(
  repoRoot,
  "docs/knowledge-bank/research-runs/nycac-shared-folder-census-reconciliation-2026-07-19.md"
);

const requiredPaths = [
  reportPath,
  batchPath,
  developmentPath,
  proofPath,
  workPath,
  caseStudyPath,
  registryPath,
  reconciliationPath
];

const missing = requiredPaths.filter((file) => !existsSync(file));
if (missing.length) {
  console.error(
    `NYC Artist Coalition archive eval is missing: ${missing
      .map((file) => path.relative(repoRoot, file))
      .join(", ")}`
  );
  process.exit(1);
}

const read = (file) => readFileSync(file, "utf8");
const report = read(reportPath);
const batch = read(batchPath);
const development = read(developmentPath);
const proofs = read(proofPath);
const work = read(workPath);
const caseStudy = read(caseStudyPath);
const registry = read(registryPath);
const reconciliation = read(reconciliationPath);
const governedPublicCorpus = [report, batch, development, proofs, work, caseStudy].join(
  "\n"
);
const portfolioCorpus = [proofs, work, caseStudy].join("\n");

function tableValue(label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`\\| ${escaped} \\| ([0-9,]+) \\|`).exec(report);
  return match ? Number(match[1].replaceAll(",", "")) : Number.NaN;
}

function sectionTableSum(startHeading, endHeading) {
  const start = report.indexOf(startHeading);
  const end = report.indexOf(endHeading, start + startHeading.length);
  if (start < 0 || end < 0) return Number.NaN;
  const section = report.slice(start, end);
  return [...section.matchAll(/\| [^|]+ \| ([0-9,]+) \|/g)].reduce(
    (sum, match) => sum + Number(match[1].replaceAll(",", "")),
    0
  );
}

const forbiddenPrivatePatterns = [
  /drive\.google\.com/i,
  /docs\.google\.com\/document\/d\//i,
  /resourcekey=/i,
  /\/Users\//,
  /\/Volumes\//,
  /0B6_BDzPWGpgU/,
  /Jamie - Small Business Testimony/,
  /FairRentNYC Website Changes/,
  /Fair Rent nyc - Jamie/,
  /Jamie Speech Final/,
  /Shared Folder FAQ/
];

const blockedRouteRoots = [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/knowledge-wiki",
  "apps/www/src/app/public-claims"
];

const actual = {
  ...nycacSharedFolderFixture(),
  accessiblePopulation: tableValue("Accessible descendants"),
  inventoriedTotal: tableValue("Inventoried"),
  classifiedTotal: tableValue("Broadly classified"),
  dispositionedTotal: tableValue("Dispositioned"),
  folderTotal: tableValue("Folders"),
  fileTotal: tableValue("Files"),
  typeTotal: sectionTableSum("## File-type accounting", "## Disposition accounting"),
  dispositionSum: sectionTableSum(
    "## Disposition accounting",
    "## Findings promoted from close reading"
  ),
  closeReadTotal: tableValue("Selected documents close-read"),
  traversalErrorTotal: tableValue("Traversal errors after retry"),
  rightsClearedTotal: tableValue("Media items rights-cleared in this pass"),
  everyItemHasOneDisposition:
    /every accessible\s+descendant[\s\S]{0,240}exactly one\s+disposition/i.test(
      report
    ) && /These dispositions sum to 2,365/.test(report),
  populationScope:
    /complete\s+accessible population returned by one declared capture/.test(
      report
    ) &&
    /internally complete for the population returned by this method/.test(report)
      ? "accessible-population"
      : "overbroad",
  interpretationScope:
    /selectively close-read/.test(report) &&
    /does not mean that every file\s+was opened/.test(report)
      ? "selected-close-reading"
      : "complete-interpretation",
  authorshipScope:
    /does not mean[\s\S]{0,120}every item was\s+created by Jamie/i.test(report) &&
    /Jamie's sole authorship/.test(governedPublicCorpus)
      ? "bounded"
      : "overbroad",
  privateLocatorExposed:
    forbiddenPrivatePatterns.some((pattern) => pattern.test(governedPublicCorpus)) ||
    /SRC-NYCAC-ARCHIVE|ARCHIVE-NYCAC|RESEARCH-NYCAC-SHARED-FOLDER/.test(
      registry
    ),
  publicRouteExposed: blockedRouteRoots.some((relativePath) =>
    existsSync(path.join(repoRoot, relativePath))
  ),
  heldMetricProjected: /several hundred/i.test(portfolioCorpus),
  portfolioClaimLinked:
    /nyc-artist-coalition-fairrent-web-data-implementation/.test(proofs) &&
    /nyc-artist-coalition-fairrent-web-data-implementation/.test(work) &&
    /CLM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION/.test(caseStudy),
  portfolioGuardrailPresent:
    /Credit policy, copy, organizing, partnerships, and campaign outcomes collectively/.test(
      proofs
    ) &&
    /does not prove that every proposed feature shipped/.test(proofs),
  humanGatesRemainOpen:
    /rights, consent, collaborator credit, Jamie approval/.test(report) &&
    /No media item was promoted/.test(report),
  captureMethod: /A-method archival-production census/.test(report)
    ? "A-descendant-accounting"
    : "unspecified",
  crossCaptureCanonicalTotal:
    /No single shared-folder population total is canonical/.test(reconciliation)
      ? null
      : tableValue("Accessible descendants"),
  crossCaptureProjection:
    /status: "hold"/.test(batch) && /surfaces: \[\]/.test(batch)
      ? "hold"
      : "active",
  reconciliationPresent:
    /2,365/.test(reconciliation) &&
    /2,408/.test(reconciliation) &&
    /2,078/.test(reconciliation) &&
    /2,192/.test(reconciliation) &&
    /2,405/.test(reconciliation)
};

const results = evaluateNycacSharedFolder(actual);
console.log(
  `NYC Artist Coalition shared-folder eval: ${
    results.filter((result) => result.pass).length
  }/${results.length}`
);
for (const result of results) {
  console.log(`${result.pass ? "PASS" : "FAIL"} ${result.id}`);
}

if (results.some((result) => !result.pass)) {
  process.exit(1);
}

console.log("NYC Artist Coalition shared-folder criterion met.");
