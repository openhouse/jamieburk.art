#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadKnowledgeBank } from "../apps/www/src/lib/knowledge-bank-runtime.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const warnings = [];
const requiredProofIds = [
  "career-operating-structure-14-years", "technical-operations-operating-backbone",
  "hje-modernization-stewardship", "hje-revenue-growth-contribution",
  "callnyc-civic-data-guidance", "fair-rent-campaign-memory", "fair-rent-source-map",
  "nyc-artist-coalition-civic-systems", "wowlist-community-platform",
  "sunday-dinner-196-participation-infrastructure", "kc-spaces-fund-digital-infrastructure",
  "kc-town-hall-public-benefit-documentation", "source-backed-team-memory-method"
];
const requiredWorkProofs = new Map([
  ["harry-j-epstein", ["hje-modernization-stewardship", "hje-revenue-growth-contribution"]],
  ["fair-rent-nyc", ["fair-rent-campaign-memory", "fair-rent-source-map", "nyc-artist-coalition-public-web-infrastructure", "nyc-artist-coalition-civic-systems"]],
  ["callnyc", ["callnyc-civic-data-guidance"]], ["wowlist", ["wowlist-community-platform"]],
  ["196-sunday-dinner", ["sunday-dinner-196-participation-infrastructure"]],
  ["kc-town-hall", ["kc-town-hall-public-benefit-documentation"]]
]);
const docsRoot = path.join(repoRoot, "docs/knowledge-bank");

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}
function fail(message) { failures.push(message); }
function read(file) { return readFileSync(file, "utf8"); }

let bank;
try {
  bank = loadKnowledgeBank();
} catch (error) {
  fail(`Knowledge-bank JSON failed schema validation: ${error instanceof Error ? error.message : String(error)}`);
}

const proofClaims = bank?.claims.filter((claim) => claim.proofProjection) ?? [];
const proofIds = new Set(proofClaims.map((claim) => claim.id));
for (const id of requiredProofIds) if (!proofIds.has(id)) fail(`Missing required proof claim: ${id}`);

for (const claim of proofClaims) {
  const projection = claim.proofProjection;
  if (projection.status === "careful") warnings.push(`${claim.id} is careful and must keep its guardrail in public copy`);
  if (["pending", "private"].includes(projection.status) && claim.allowedSurfaces.some((surface) => surface !== "internal-only")) {
    fail(`${claim.id} is pending/private but projected to a public surface`);
  }
  if (!claim.qualifications.length) fail(`${claim.id} is missing a guardrail qualification`);
  if (!claim.antiClaims.length) fail(`${claim.id} is missing anti-claims`);
  if (!projection.protectedBoundaries.length) fail(`${claim.id} is missing protected boundaries`);
}

for (const route of ["proofs", "knowledge-bank", "public-claims"]) {
  if (existsSync(path.join(repoRoot, "apps/www/src/app", route))) fail(`apps/www/src/app/${route} must not exist as a public route`);
}

const claimsDocPath = path.join(docsRoot, "claims.md");
if (!existsSync(claimsDocPath)) fail("docs/knowledge-bank/claims.md is missing");
else {
  const claimsDoc = read(claimsDocPath);
  for (const id of proofIds) if (!claimsDoc.includes(`## ${id}`)) fail(`claims.md is missing ${id}`);
  const headings = [...claimsDoc.matchAll(/^##\s+([a-z0-9-]+)/gm)];
  headings.forEach((heading, index) => {
    const block = claimsDoc.slice(heading.index, headings[index + 1]?.index ?? claimsDoc.length);
    for (const field of [
      "**Status:**", "**Support level:**", "**Evidence class:**", "**Public wording:**",
      "**Detailed public-safe wording:**", "**Where to project:**", "**Why it matters:**",
      "**Guardrail:**", "**Do not say:**", "**Protected boundaries:**", "**Review owner:**", "**Last reviewed:**"
    ]) if (!block.includes(field)) fail(`${heading[1]} in claims.md is missing ${field}`);
  });
}

const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
if (existsSync(workPath)) {
  const work = read(workPath);
  for (const match of work.matchAll(/proofBankIds:\s*\[([\s\S]*?)\]/g)) {
    for (const id of [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1])) {
      if (!proofIds.has(id)) fail(`work.ts references missing proof claim: ${id}`);
    }
  }
  for (const match of work.matchAll(/slug:\s*"([^"]+)"/g)) {
    const slug = match[1];
    const next = work.indexOf("\n    slug:", match.index + 1);
    const block = work.slice(Math.max(0, work.lastIndexOf("\n  {", match.index)), next === -1 ? work.length : next);
    if (!/proofBankIds:\s*\[/.test(block)) fail(`${slug} is missing proofBankIds`);
    for (const id of requiredWorkProofs.get(slug) ?? []) {
      if (!block.includes(`"${id}"`)) fail(`${slug} proofBankIds is missing ${id}`);
    }
  }
}

for (const file of walk(docsRoot).filter((item) => /\.(md|mdx|txt)$/i.test(item))) {
  if (/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|otter\.ai\.txt|\.docx|\.xlsx/i.test(read(file))) {
    fail(`${path.relative(repoRoot, file)} contains a private path or raw-source marker`);
  }
}

for (const requiredDoc of [
  "README.md", "chad-lens.md", "approval-register.md", "claims.md", "proofs.md", "sources.md",
  "projection-map.md", "publishing-governance.md", "launch-blockers.md", "review-checklist.md",
  "anti-claims.md", "public-safety.md", "opportunities/oti-technical-operations.md",
  "opportunities/source-backed-team-memory.md"
]) {
  const file = path.join(docsRoot, requiredDoc);
  if (!existsSync(file) || !statSync(file).size) fail(`docs/knowledge-bank/${requiredDoc} is missing or empty`);
}

if (warnings.length) {
  console.warn("Knowledge-bank warnings:");
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
if (failures.length) {
  console.error("Knowledge-bank check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Knowledge-bank check passed for ${bank.claims.length} claims with ${warnings.length} warning(s).`);
