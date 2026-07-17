#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
const personalWowlistEventModulePath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events.ts"
);
const personalWowlistEventControlsPath = path.join(
  docsRoot,
  "data/personal-wowlist-facebook-event-controls.json"
);
const personalDisplayedHostCensusPath = path.join(
  docsRoot,
  "jamie-facebook-displayed-host-event-census-2026-07-14.csv"
);
const personalWowlistEventReportPath = path.join(
  docsRoot,
  "personal-wowlist-facebook-events-2026-07-14.md"
);

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

function collectObjectKeys(value, keys = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectObjectKeys(item, keys));
    return keys;
  }
  if (!value || typeof value !== "object") return keys;
  for (const [key, item] of Object.entries(value)) {
    keys.push(key);
    collectObjectKeys(item, keys);
  }
  return keys;
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

if (!existsSync(personalWowlistEventControlsPath)) {
  fail("Personal and WOW List Facebook event controls are missing");
} else {
  let controls;
  try {
    controls = JSON.parse(read(personalWowlistEventControlsPath));
  } catch (error) {
    fail(`Personal and WOW List Facebook event controls are invalid JSON: ${error.message}`);
  }

  if (controls) {
    const association = controls.personalAssociationSurface ?? {};
    const hosted = controls.personalHostedEventsTab ?? {};
    const displayed = controls.displayedJamieHostSubset ?? {};
    const wowlist = controls.wowlist ?? {};
    const live = controls.liveReverification ?? {};

    if (association.currentRecords !== 502) fail("Personal event control must retain 502 profile IDs");
    if (!association.secondPassExactIdMatch || !association.thirdPassExactIdMatch) {
      fail("Personal event control must retain both exact ID-set reverifications");
    }
    if (association.displayedHostAccounting?.jamie !== 20 || association.displayedHostAccounting?.anotherHost !== 482) {
      fail("Personal event displayed-host accounting must reconcile 20 + 482 = 502");
    }
    if (hosted.currentRecords !== 21 || hosted.recoveredRecords !== 21 || hosted.unresolvedRecords !== 0) {
      fail("Hosted-events control must reconcile all 21 current records");
    }
    if (hosted.overlapWithAssociationSurface !== 18 || hosted.distinctRecordsAcrossBothTabs !== 505) {
      fail("Personal event controls must retain the 18-overlap, 505-ID union");
    }
    if (displayed.pastEventsCards !== 20) fail("Displayed Jamie-host census must retain 20 cards");
    if (Object.values(displayed.primaryFormCounts ?? {}).reduce((sum, value) => sum + value, 0) !== 20) {
      fail("Displayed Jamie-host practice forms must reconcile to 20 cards");
    }
    if (wowlist.currentDisplayedRecords !== 0 || wowlist.historicalDisposition !== "not-recovered") {
      fail("WOW List event controls must separate current zero from historical non-recovery");
    }
    if (live.personalPastTraversalCount !== 502 || live.personalPastExactIdMatchAgainstPriorControl !== true || live.hostedTabRecordsRecovered !== 21 || live.wowlistDisplayedRecordsWhileActingAsPage !== 0) {
      fail("July 15 live Facebook event reverification is incomplete");
    }

    const controlsText = read(personalWowlistEventControlsPath);
    if (/facebook\.com\/events\/\d+|\b\d{12,}\b/.test(controlsText)) {
      fail("Personal event controls expose record-level event identifiers");
    }
    const prohibitedKeys = collectObjectKeys(controls).filter((key) =>
      /^(eventId|eventUrl|guests?|invitees?|comments?|addresses?|exactLocation|rawDescription)$/i.test(key)
    );
    if (prohibitedKeys.length) {
      fail(`Personal event controls expose prohibited record-level fields: ${prohibitedKeys.join(", ")}`);
    }
  }
}

if (!existsSync(personalDisplayedHostCensusPath)) {
  fail("Displayed Jamie-host event census is missing");
} else {
  const lines = read(personalDisplayedHostCensusPath).trimEnd().split("\n");
  if (lines.length !== 21) fail("Displayed Jamie-host census must contain 20 rows plus its header");
  if (lines[0] !== "subset_slot,source_surface,displayed_host,recovery_status,year,primary_form") {
    fail("Displayed Jamie-host census header changed unexpectedly");
  }
  for (const [index, line] of lines.slice(1).entries()) {
    if (line.split(",").length !== 6) fail(`Displayed-host census row ${index + 1} has the wrong column count`);
    if (/https?:|facebook\.com|\b\d{12,}\b/.test(line)) {
      fail(`Displayed-host census row ${index + 1} exposes a record-level locator`);
    }
  }
}

if (!existsSync(personalWowlistEventModulePath)) {
  fail("Personal and WOW List Facebook event knowledge module is missing");
} else {
  const moduleText = read(personalWowlistEventModulePath);
  for (const phrase of [
    "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
    "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026",
    "Not recovered does not mean did not exist",
    "attendance, unique reach, endorsement, causality, or impact"
  ]) assertIncludes(moduleText, phrase, "Personal and WOW List Facebook event knowledge module");
}

if (!existsSync(personalWowlistEventReportPath)) {
  fail("Personal and WOW List Facebook event report is missing");
} else {
  const report = read(personalWowlistEventReportPath);
  for (const phrase of [
    "505 distinct current event IDs",
    "Association does not establish attendance",
    "source route, not automatic corroboration",
    "not recovered",
    "Do not add a new visible portfolio claim"
  ]) assertIncludes(report, phrase, "Personal and WOW List Facebook event report");
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
