#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

const receipt = read(
  "docs/knowledge-bank/intake/2026-07-15-icloud-teams-archive-expansion.md"
);
const creativeDossier = read(
  "docs/knowledge-bank/projects/creative-technology-and-media.md"
);
const crsDossier = read(
  "docs/knowledge-bank/projects/commercial-rent-stabilization-operating-memory.md"
);
const jobLens = read(
  "docs/knowledge-bank/opportunities/job-search-positioning.md"
);
const technicalOperations = read(
  "apps/www/src/app/work/technical-operations/page.tsx"
);
const moduleSource = read(
  "apps/www/src/data/knowledge-bank/icloud-teams-expansion.ts"
);
const runReceipt = read(
  "evals/knowledge-bank/runs/2026-07-15-icloud-teams-expansion.md"
);
const normalizedReceipt = receipt.replace(/\s+/g, " ");
const normalizedCrsDossier = crsDossier.replace(/\s+/g, " ");

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intakeById = new Map(
  knowledgeBank.intakeItems.map((intake) => [intake.id, intake])
);

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

check(
  "Archive reconciliation",
  "Authenticated web snapshots and local materialized records are reconciled by content date",
  14,
  includesAll(normalizedReceipt, [
    "authenticated iCloud Drive web session",
    "embedded generation dates",
    "modification time or file size",
    "generated May 17",
    "generated January 23"
  ])
);

check(
  "Required folder coverage",
  "Jamie Projects History, CRS, and job-hunt each produce a governed intake",
  14,
  intakeById.get(
    "INTAKE-2026-07-15-ICLOUD-JAMIE-PROJECTS-HISTORY-EXPANSION"
  )?.publicationStatus === "knowledge-bank-only" &&
    intakeById.get("INTAKE-2026-07-15-ICLOUD-CRS-EXPANSION")
      ?.publicationStatus === "projected" &&
    intakeById.get("INTAKE-2026-07-15-ICLOUD-JOB-HUNT-EXPANSION")
      ?.publicationStatus === "knowledge-bank-only"
);

const bapClaim = claimById.get("CLM-BAPLAB-NEW-MEDIA-PROGRAM-2006");

check(
  "Jamie Projects History",
  "Two institutional schedules confirm bounded BAPLab participation",
  18,
  sourceById.get("SRC-BAPLAB-WAVE-FARM-PROGRAM-2006")?.canonicalUrl ===
    "https://wavefarm.org/wf/calendar/bnavcx" &&
    sourceById.get("SRC-BAPLAB-OFFICIAL-PROGRAM-WAYBACK-2006")
      ?.preservationStatus === "archived" &&
    bapClaim?.status === "confirmed-with-boundary" &&
    bapClaim.evidence.length === 2 &&
    bapClaim.antiClaims.includes("Jamie curated BAPLab 2006.") &&
    includesAll(creativeDossier, [
      "BAPLab 2006",
      "artist record 108",
      "lead rather than proof"
    ])
);

const crsClaim = claimById.get("CLM-CRS-COALITION-MAPPING-PRACTICE");

check(
  "CRS operating evidence",
  "The protected map and later minutes support a precise operating-practice claim",
  20,
  sourceById.get("SRC-CRS-COALITION-MAP-2026-05-06")?.visibility ===
    "protected" &&
    crsClaim?.status === "confirmed-with-boundary" &&
    crsClaim.evidence.some(
      (evidence) =>
        evidence.sourceId === "SRC-CRS-RUNNING-MINUTES-2026" &&
        evidence.relationship === "corroborating"
    ) &&
    crsClaim.boundaries.some((boundary) =>
      boundary.includes("not an adopted governance chart")
    ) &&
    includesAll(normalizedCrsDossier, [
      "Running minutes through May 15",
      "Coalition Mapping Practice",
      "not an adopted governance chart"
    ])
);

const hjeInquiry = inquiryById.get(
  "INQ-HJE-REVENUE-GROWTH-VERIFICATION-2026"
);

check(
  "Job-hunt governance",
  "Role positioning remains guidance while the commercial metric enters a bounded verification queue",
  16,
  sourceById.get("SRC-JOB-HUNT-CONTEXT-OUTLINE-2026")?.visibility ===
    "protected" &&
    hjeInquiry?.resultStatus === "partially-recovered" &&
    hjeInquiry.limitations.some((limitation) =>
      limitation.includes("does not establish that supporting records do not exist")
    ) &&
    includesAll(jobLens, [
      "composition lens, not an accomplishment claim",
      "contributed during a period of",
      "not independently recovered in this pass"
    ])
);

check(
  "Selective projection",
  "Only the concise coalition-mapping refinement reaches the website",
  10,
  technicalOperations.includes("live coalition mapping") &&
    !technicalOperations.includes("BAPLab 2006") &&
    crsClaim?.projections.some(
      (projection) =>
        projection.key === "technical-operations" &&
        projection.status === "active" &&
        projection.surfaces.includes("/work/technical-operations")
    )
);

check(
  "Public safety",
  "Protected artifacts, private details, and overclaims remain excluded",
  8,
  includesAll(`${receipt}\n${moduleSource}\n${runReceipt}`, [
    "Do not publish the coalition map",
    "does not establish that supporting records do not exist",
    "Jamie presented Time Is Long at BAPLab 2006.",
    "The map caused a policy outcome.",
    "Private financial details and dashboards must remain outside the public repository."
  ]) &&
    !moduleSource.includes("/Users/jburkart/") &&
    !moduleSource.includes("/Volumes/16TB_SSD/")
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(
  `iCloud Teams expansion eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("iCloud Teams expansion gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("iCloud Teams expansion criterion met.");
