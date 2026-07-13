#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressDistinctSourceCount,
  campaignPressPlacementCount,
  campaignPressSourceIds
} from "../apps/www/src/data/knowledge-bank/campaignPress.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const failures = [];
const warnings = [];

const requiredProofIds = [
  "career-operating-structure-14-years",
  "technical-operations-operating-backbone",
  "hje-modernization-stewardship",
  "hje-revenue-growth-contribution",
  "callnyc-civic-data-guidance",
  "fair-rent-campaign-memory",
  "fair-rent-source-map",
  "nyc-artist-coalition-civic-systems",
  "wowlist-community-platform",
  "sunday-dinner-196-participation-infrastructure",
  "kc-spaces-fund-digital-infrastructure",
  "kc-town-hall-public-benefit-documentation",
  "source-backed-team-memory-method"
];

const requiredWorkProofs = new Map([
  ["harry-j-epstein", ["hje-modernization-stewardship", "hje-revenue-growth-contribution"]],
  [
    "fair-rent-nyc",
    [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyca-campaign-press-architecture",
      "nyc-artist-coalition-civic-systems"
    ]
  ],
  ["callnyc", ["callnyc-civic-data-guidance"]],
  ["wowlist", ["wowlist-community-platform"]],
  ["196-sunday-dinner", ["sunday-dinner-196-participation-infrastructure"]],
  ["kc-town-hall", ["kc-town-hall-public-benefit-documentation"]]
]);

const publicSurfaces = new Set([
  "homepage",
  "resume",
  "technical-operations",
  "work-card",
  "case-study",
  "lab",
  "about"
]);

const proofPath = path.join(repoRoot, "apps/www/src/data/proofs.ts");
const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
const claimsPath = path.join(repoRoot, "docs/knowledge-bank/claims.md");
const docsRoot = path.join(repoRoot, "docs/knowledge-bank");
const campaignPressIndexPath = path.join(docsRoot, "projects/nyca-campaign-press-index.md");
const structuredClaimsById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const sourcesById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(file) {
  return readFileSync(file, "utf8");
}

function walk(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function relative(file) {
  return path.relative(repoRoot, file);
}

function extractStrings(block, field) {
  const match = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`).exec(block);
  if (!match) return [];
  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function extractStringField(block, field) {
  return new RegExp(`${field}:\\s*"([^"]*)"`).exec(block)?.[1] ?? "";
}

function assertIncludes(text, expected, label) {
  if (!text.includes(expected)) fail(`${label} is missing ${expected}`);
}

if (campaignPressPlacementCount !== 46) {
  fail(`Campaign press corpus has ${campaignPressPlacementCount} placements; expected 46`);
}

if (campaignPressDistinctSourceCount !== 45) {
  fail(`Campaign press corpus has ${campaignPressDistinctSourceCount} distinct articles; expected 45`);
}

for (const [campaign, sourceIds] of Object.entries(campaignPressSourceIds)) {
  for (const sourceId of sourceIds) {
    const source = sourcesById.get(sourceId);
    if (!source) {
      fail(`${campaign} press corpus references missing source ${sourceId}`);
    } else if (source.kind !== "published-article") {
      fail(`${campaign} press corpus source ${sourceId} is not a published article`);
    }
  }
}

const expectedCampaignPressCounts = {
  "let-nyc-dance": 21,
  "talks-not-raids": 7,
  "save-nyc-spaces": 8,
  "fair-rent-nyc": 10
};
for (const [campaign, expectedCount] of Object.entries(expectedCampaignPressCounts)) {
  const actualCount = campaignPressSourceIds[campaign]?.length;
  if (actualCount !== expectedCount) {
    fail(`${campaign} press corpus has ${actualCount} placements; expected ${expectedCount}`);
  }
}

if (!existsSync(campaignPressIndexPath)) {
  fail("docs/knowledge-bank/projects/nyca-campaign-press-index.md is missing");
} else {
  const campaignPressIndex = read(campaignPressIndexPath);
  for (const sourceId of new Set(Object.values(campaignPressSourceIds).flat())) {
    if (!campaignPressIndex.includes(sourceId)) {
      fail(`Campaign press index omits ${sourceId}`);
    }
  }
}

if (!existsSync(proofPath)) {
  fail("apps/www/src/data/proofs.ts is missing");
}

if (!existsSync(claimsPath)) {
  fail("docs/knowledge-bank/claims.md is missing");
}

if (existsSync(path.join(repoRoot, "docs/proofs-bank.md")) && existsSync(claimsPath)) {
  fail("docs/proofs-bank.md conflicts with docs/knowledge-bank/claims.md; use one canonical claim register");
}

const blockedRouteDirs = [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/public-claims"
];

for (const routeDir of blockedRouteDirs) {
  if (existsSync(path.join(repoRoot, routeDir))) {
    fail(`${routeDir} must not exist as a public route`);
  }
}

let proofSource = "";
let proofIds = [];
const proofBlocks = new Map();

if (existsSync(proofPath)) {
  proofSource = read(proofPath);

  if (/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw-otter|otter(?:\.ai|_ai)|\.docx|\.xlsx/i.test(proofSource)) {
    fail("apps/www/src/data/proofs.ts contains a private path or private source marker");
  }

  if (!/export type SupportLevel\s*=/.test(proofSource)) {
    fail("Proof data is missing SupportLevel type");
  }

  for (const match of proofSource.matchAll(/\{\n\s+id:\s*"([^"]+)"[\s\S]*?\n\s+\}/g)) {
    const [, id] = match;
    proofIds.push(id);
    proofBlocks.set(id, match[0]);
  }

  const uniqueIds = new Set(proofIds);
  if (uniqueIds.size !== proofIds.length) {
    const duplicates = proofIds.filter((id, index) => proofIds.indexOf(id) !== index);
    fail(`Duplicate proof IDs: ${[...new Set(duplicates)].join(", ")}`);
  }

  for (const id of requiredProofIds) {
    if (!uniqueIds.has(id)) fail(`Missing required proof claim: ${id}`);
  }

  for (const [id, block] of proofBlocks.entries()) {
    const status = extractStringField(block, "status");
    const supportLevel = extractStringField(block, "supportLevel");
    const evidenceClasses = extractStrings(block, "evidenceClass");
    const surfaces = extractStrings(block, "surfaces");
    const structuredClaimIds = extractStrings(block, "structuredClaimIds");
    const publicFieldBundle = [
      "publicWording",
      "shortWording",
      "detailedPublicWording",
      "sourceBasis",
      "sourceNote",
      "whyItMatters"
    ]
      .map((field) => extractStringField(block, field))
      .join(" ");

    for (const field of [
      "status",
      "supportLevel",
      "publicWording",
      "sourceBasis",
      "guardrail",
      "lastReviewed"
    ]) {
      if (!new RegExp(`${field}:`).test(block)) fail(`${id} is missing ${field}`);
    }

    if (!["ready", "careful", "pending", "private"].includes(status)) {
      fail(`${id} has invalid status: ${status || "missing"}`);
    }

    if (!["strong", "moderate", "careful", "pending"].includes(supportLevel)) {
      fail(`${id} has invalid supportLevel: ${supportLevel || "missing"}`);
    }

    if (!evidenceClasses.length) fail(`${id} is missing evidenceClass`);
    if (!extractStrings(block, "doNotSay").length) fail(`${id} is missing doNotSay`);
    if (!extractStrings(block, "protectedBoundaries").length) {
      fail(`${id} is missing protectedBoundaries`);
    }
    if (!surfaces.length) fail(`${id} is missing surfaces`);

    for (const structuredClaimId of structuredClaimIds) {
      const structuredClaim = structuredClaimsById.get(structuredClaimId);
      if (!structuredClaim) {
        fail(`${id} references missing structured claim ${structuredClaimId}`);
      } else if (!structuredClaim.proofClaimIds.includes(id)) {
        fail(`${id} and ${structuredClaimId} do not reference each other`);
      }
    }

    if ((status === "pending" || status === "private") && surfaces.some((surface) => publicSurfaces.has(surface))) {
      fail(`${id} is pending/private but projected to a public surface`);
    }

    if (status === "ready" && /TODO|approval required/i.test(block)) {
      fail(`${id} is ready but contains unresolved approval language`);
    }

    if (status === "careful") warn(`${id} is careful and must keep its guardrail in public copy`);

    if (id === "source-backed-team-memory-method" && /Jonathan Marmor|pricing|private transcript|private company/i.test(publicFieldBundle)) {
      fail("source-backed-team-memory-method exposes private collaborator, pricing, transcript, or company context in public fields");
    }
  }
}

for (const claim of knowledgeBank.claims) {
  for (const proofClaimId of claim.proofClaimIds) {
    const proofBlock = proofBlocks.get(proofClaimId);
    if (!proofBlock) {
      fail(`${claim.id} references missing proof claim ${proofClaimId}`);
      continue;
    }
    if (!extractStrings(proofBlock, "structuredClaimIds").includes(claim.id)) {
      fail(`${claim.id} and ${proofClaimId} do not reference each other`);
    }
  }
}

if (existsSync(claimsPath)) {
  const claimsSource = read(claimsPath);

  for (const id of proofIds) {
    if (!claimsSource.includes(`## ${id}`)) fail(`claims.md is missing ${id}`);
  }

  const claimHeadings = [...claimsSource.matchAll(/^##\s+([a-z0-9-]+)/gm)];
  claimHeadings.forEach((match, index) => {
    const id = match[1];
    const nextHeading = claimHeadings[index + 1]?.index ?? claimsSource.length;
    const block = claimsSource.slice(match.index, nextHeading);
    for (const field of [
      "**Status:**",
      "**Support level:**",
      "**Evidence class:**",
      "**Public wording:**",
      "**Detailed public-safe wording:**",
      "**Where to project:**",
      "**Why it matters:**",
      "**Guardrail:**",
      "**Do not say:**",
      "**Protected boundaries:**",
      "**Review owner:**",
      "**Last reviewed:**"
    ]) {
      if (!block.includes(field)) fail(`${id} in claims.md is missing ${field}`);
    }
  });
}

if (existsSync(workPath)) {
  const workSource = read(workPath);
  const allProofIds = new Set(proofIds);

  for (const match of workSource.matchAll(/proofBankIds:\s*\[([\s\S]*?)\]/g)) {
    const ids = [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
    for (const id of ids) {
      if (!allProofIds.has(id)) fail(`work.ts references missing proof claim: ${id}`);
    }
  }

  for (const slugMatch of workSource.matchAll(/slug:\s*"([^"]+)"/g)) {
    const slug = slugMatch[1];
    const nextSlugIndex = workSource.indexOf("\n    slug:", slugMatch.index + 1);
    const block = workSource.slice(
      Math.max(0, workSource.lastIndexOf("\n  {", slugMatch.index)),
      nextSlugIndex === -1 ? workSource.indexOf("\n] satisfies", slugMatch.index) : nextSlugIndex
    );

    if (!/proofBankIds:\s*\[/.test(block)) {
      fail(`${slug} is missing proofBankIds`);
    }

    const required = requiredWorkProofs.get(slug) ?? [];
    for (const id of required) {
      assertIncludes(block, `"${id}"`, `${slug} proofBankIds`);
    }

    if (/(2x|30\+|1,800\+|16,000\+|300\+|20\+|\$490,539)/.test(block) && !/proofBankIds:\s*\[[\s\S]*?"[^"]+"/.test(block)) {
      fail(`${slug} includes metric-bearing evidence without proofBankIds`);
    }
  }
}

for (const file of walk(docsRoot)) {
  if (!/\.(md|mdx|txt)$/i.test(file)) continue;

  const content = read(file);
  if (/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|otter\.ai\.txt|\.docx|\.xlsx/i.test(content)) {
    fail(`${relative(file)} contains a private path, raw-source filename, or office-source marker`);
  }
}

for (const requiredDoc of [
  "README.md",
  "lifecycle.md",
  "chad-lens.md",
  "approval-register.md",
  "claims.md",
  "proofs.md",
  "sources.md",
  "projection-map.md",
  "publishing-governance.md",
  "launch-blockers.md",
  "review-checklist.md",
  "anti-claims.md",
  "public-safety.md",
  "opportunities/oti-technical-operations.md",
  "opportunities/source-backed-team-memory.md"
]) {
  const absolute = path.join(docsRoot, requiredDoc);
  if (!existsSync(absolute) || !statSync(absolute).size) {
    fail(`docs/knowledge-bank/${requiredDoc} is missing or empty`);
  }
}

if (warnings.length) {
  console.warn("Knowledge-bank warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Knowledge-bank check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Knowledge-bank check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`
);
