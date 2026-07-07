#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const blockers = [];
const warnings = [];

const allowedStatuses = new Set([
  "approved-public",
  "approved-summary",
  "candidate-needs-approval",
  "private-source-not-committed",
  "protected-do-not-publish"
]);

const allowedRiskLevels = new Set(["low", "medium", "high"]);

const allowedSourceClasses = new Set([
  "public-url",
  "public-document",
  "approved-resume",
  "approved-screenshot",
  "approved-artifact",
  "public-record",
  "public-safe-summary",
  "private-source-not-committed",
  "protected-do-not-publish",
  "candidate-needs-approval"
]);

const knownRoutes = new Set([
  "/",
  "/about",
  "/contact",
  "/resume",
  "/work",
  "/work/technical-operations",
  "/work/harry-j-epstein",
  "/work/fair-rent-nyc",
  "/work/callnyc",
  "/work/wowlist",
  "/work/196-sunday-dinner",
  "/work/kc-town-hall",
  "/lab/source-backed-team-memory"
]);

function addBlocker(message) {
  blockers.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const claims = readJson("docs/knowledge-bank/claims.json");

if (!Array.isArray(claims)) {
  addBlocker("docs/knowledge-bank/claims.json must be an array");
}

const claimIds = new Set();
const claimById = new Map();

for (const [index, claim] of claims.entries()) {
  const label = claim?.id ?? `claim at index ${index}`;

  if (!claim || typeof claim !== "object") {
    addBlocker(`${label}: claim must be an object`);
    continue;
  }

  if (!claim.id || typeof claim.id !== "string") {
    addBlocker(`claim at index ${index}: missing string id`);
  } else if (claimIds.has(claim.id)) {
    addBlocker(`${claim.id}: duplicate claim id`);
  } else {
    claimIds.add(claim.id);
    claimById.set(claim.id, claim);
  }

  if (!allowedStatuses.has(claim.status)) {
    addBlocker(`${label}: invalid status "${claim.status}"`);
  }

  if (!claim.publicWording || typeof claim.publicWording !== "string") {
    addBlocker(`${label}: missing publicWording`);
  }

  if (!allowedSourceClasses.has(claim.sourceClass)) {
    addBlocker(`${label}: invalid sourceClass "${claim.sourceClass}"`);
  }

  if (!Array.isArray(claim.usedOn)) {
    addBlocker(`${label}: usedOn must be an array`);
  } else {
    for (const route of claim.usedOn) {
      if (!knownRoutes.has(route) && !route.startsWith("future:")) {
        addBlocker(`${label}: unknown usedOn route "${route}"`);
      }
    }
  }

  if (!allowedRiskLevels.has(claim.riskLevel)) {
    addBlocker(`${label}: invalid riskLevel "${claim.riskLevel}"`);
  }

  if (claim.status === "protected-do-not-publish" && claim.usedOn?.length) {
    addBlocker(`${label}: protected-do-not-publish claim cannot have public usedOn routes`);
  }

  if (
    claim.status === "candidate-needs-approval" &&
    /approved|settled|final/i.test(claim.notes ?? "")
  ) {
    addWarning(`${label}: approval-gated claim has notes that may read as settled`);
  }
}

const appClaimsSource = readFileSync(path.join(root, "apps/www/src/data/claims.ts"), "utf8");
const appClaimIds = [...appClaimsSource.matchAll(/id:\s*"([^"]+)"/g)].map((match) => match[1]);

for (const id of appClaimIds) {
  const claim = claimById.get(id);
  if (!claim) {
    addBlocker(`apps/www/src/data/claims.ts references unknown claim id "${id}"`);
    continue;
  }

  if (claim.status === "protected-do-not-publish") {
    addBlocker(`apps/www/src/data/claims.ts renders protected claim "${id}"`);
  }

  if (claim.status === "candidate-needs-approval") {
    addBlocker(`apps/www/src/data/claims.ts renders approval-gated claim "${id}"`);
  }
}

const workDataSource = readFileSync(path.join(root, "apps/www/src/data/work.ts"), "utf8");
const workClaimIds = [...workDataSource.matchAll(/"([a-z0-9-]+)"/g)]
  .map((match) => match[1])
  .filter((value) => claimIds.has(value));

for (const id of workClaimIds) {
  const claim = claimById.get(id);
  if (claim?.status === "protected-do-not-publish") {
    addBlocker(`apps/www/src/data/work.ts references protected claim "${id}"`);
  }
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (blockers.length > 0) {
  console.error("Knowledge-bank check failed:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log(`Knowledge-bank check passed for ${claimIds.size} claims.`);
