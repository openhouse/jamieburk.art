#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const allowedStatuses = new Set(["Defensible", "Use with care", "Open", "Protected"]);
const allowedSurfaces = new Set([
  "Homepage",
  "About",
  "Work card",
  "Case study",
  "Resume page",
  "PDF resume",
  "Lab page",
  "Technical operations",
  "Colophon",
  "Docs only",
  "No",
  "Yes",
  "Possible"
]);

function addError(message) {
  errors.push(message);
}

function file(relativePath) {
  return path.join(root, relativePath);
}

function parseClaimsTable() {
  const claimsPath = file("docs/knowledge-bank/claims.md");
  if (!existsSync(claimsPath)) {
    addError("docs/knowledge-bank/claims.md is missing");
    return [];
  }

  const markdown = readFileSync(claimsPath, "utf8");
  const rows = markdown
    .split("\n")
    .filter((line) => line.startsWith("| ") && !line.includes("| ---"));

  const dataRows = rows.filter((line) => !line.startsWith("| ID |"));

  return dataRows.map((line, index) => {
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length !== 7) {
      addError(`claims.md row ${index + 1} must have 7 cells`);
    }

    const [id, status, claim, evidenceClass, publicProjection, boundaries, surfaces] = cells;
    return { id, status, claim, evidenceClass, publicProjection, boundaries, surfaces };
  });
}

const claims = parseClaimsTable();
const byId = new Map();

for (const claim of claims) {
  if (!claim.id) addError("Every claim must have an ID");
  if (byId.has(claim.id)) addError(`Duplicate claim ID: ${claim.id}`);
  byId.set(claim.id, claim);

  if (!allowedStatuses.has(claim.status)) {
    addError(`${claim.id}: unsupported status "${claim.status}"`);
  }

  if (!claim.claim) addError(`${claim.id}: claim is required`);
  if (!claim.evidenceClass) addError(`${claim.id}: evidence class is required`);
  if (!claim.boundaries) addError(`${claim.id}: boundaries are required`);

  if (
    (claim.status === "Defensible" || claim.status === "Use with care") &&
    !claim.publicProjection
  ) {
    addError(`${claim.id}: ${claim.status} claims need a public projection`);
  }

  const surfaces = claim.surfaces
    .split(";")
    .map((surface) => surface.trim())
    .filter(Boolean);

  for (const surface of surfaces) {
    if (!allowedSurfaces.has(surface)) {
      addError(`${claim.id}: unknown surface "${surface}"`);
    }
  }

  if (
    claim.status === "Protected" &&
    surfaces.some((surface) => ["Homepage", "Resume page", "PDF resume"].includes(surface))
  ) {
    addError(`${claim.id}: protected claims cannot appear on homepage or resume surfaces`);
  }
}

const requiredDocs = [
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/chad-lens.md",
  "docs/knowledge-bank/publishing-governance.md",
  "docs/knowledge-bank/public-claims-inventory.md",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/source-classes.md",
  "docs/knowledge-bank/projection-guide.md",
  "docs/knowledge-bank/launch-blockers.md"
];

for (const requiredDoc of requiredDocs) {
  if (!existsSync(file(requiredDoc))) addError(`${requiredDoc} is missing`);
}

const proofsPath = file("apps/www/src/data/proofs.ts");
if (existsSync(proofsPath)) {
  const proofsSource = readFileSync(proofsPath, "utf8");
  const homepageIdsMatch = proofsSource.match(/homepageProofClaimIds\s*=\s*\[([\s\S]*?)\]/);
  const homepageIds = homepageIdsMatch
    ? Array.from(homepageIdsMatch[1].matchAll(/"([^"]+)"/g), (match) => match[1])
    : [];

  if (!homepageIds.length) {
    addError("apps/www/src/data/proofs.ts must define homepageProofClaimIds");
  }

  for (const id of homepageIds) {
    const claim = byId.get(id);
    if (!claim) {
      addError(`homepageProofClaimIds references unknown claim ID: ${id}`);
      continue;
    }

    if (claim.status === "Open" || claim.status === "Protected") {
      addError(`${id}: ${claim.status} claim cannot appear in homepageProofClaimIds`);
    }
  }
}

const appFilesToCheck = [
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/components/ProofStrip.tsx",
  "apps/www/src/data/work.ts"
];

const tooStrongPatterns = [
  [/caused 2x/i, "caused 2x"],
  [/led the movement/i, "led the movement"],
  [/owned the bill/i, "owned the bill"],
  [/single-handedly/i, "single-handedly"],
  [/35 city ecosystems/i, "35 city ecosystems"],
  [/300\+\s*(hosted\s*)?gatherings/i, "300+ gatherings"],
  [/20\+\s*resident artists/i, "20+ resident artists"]
];

for (const relativePath of appFilesToCheck) {
  const source = readFileSync(file(relativePath), "utf8");
  for (const [pattern, label] of tooStrongPatterns) {
    if (pattern.test(source)) {
      addError(`${relativePath}: app source contains approval-gated claim "${label}"`);
    }
  }
}

if (errors.length) {
  console.error("Knowledge-bank check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Knowledge-bank check passed for ${claims.length} claims.`);
