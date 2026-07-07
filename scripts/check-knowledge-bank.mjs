#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredDocs = [
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/chad-lens.md",
  "docs/knowledge-bank/proofs-bank.md",
  "docs/knowledge-bank/public-claims-inventory.md",
  "docs/knowledge-bank/projection-guide.md",
  "docs/knowledge-bank/content-safety.md",
  "docs/knowledge-bank/release-checklist.md",
  "docs/knowledge-bank/typefaces.md"
];

const requiredInventoryTerms = [
  "14+ years",
  "2x revenue growth",
  "30+ pages",
  "35+ city scenes",
  "300+ gatherings",
  "20+ resident artists",
  "$490,539",
  "NYC Artist Coalition",
  "Source-Backed Team Memory"
];

const failures = [];

for (const file of requiredDocs) {
  if (!existsSync(path.join(repoRoot, file))) {
    failures.push(`${file} is missing`);
  }
}

const inventoryPath = path.join(
  repoRoot,
  "docs/knowledge-bank/public-claims-inventory.md"
);

if (existsSync(inventoryPath)) {
  const inventory = readFileSync(inventoryPath, "utf8");

  for (const term of requiredInventoryTerms) {
    if (!inventory.includes(term)) {
      failures.push(`public-claims-inventory.md is missing required term: ${term}`);
    }
  }
}

const claimsJson = path.join(repoRoot, "docs/knowledge-bank/claims.json");

if (existsSync(claimsJson)) {
  try {
    JSON.parse(readFileSync(claimsJson, "utf8"));
  } catch (error) {
    failures.push(`claims.json is not valid JSON: ${error.message}`);
  }
}

if (failures.length) {
  console.error("Knowledge-bank check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Knowledge-bank docs check passed.");
