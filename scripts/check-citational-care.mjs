#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kbRoot = path.join(repoRoot, "apps/www/src/data/knowledge-bank");

const failures = [];
const warnings = [];

const requiredCallNycClaimOrder = [
  "claim.callnyc.hackathon.date-time-purpose",
  "claim.callnyc.hackathon.first-councilstat",
  "claim.callnyc.hackathon.event-branding",
  "claim.callnyc.hackathon.digital-district-breakout",
  "claim.callnyc.project.independent-follow-on",
  "claim.callnyc.project.data-limitations",
  "claim.callnyc.research.no-dedicated-event-page-recovered"
];

const expectedResearchCounts = {
  deduplicated_html_captures: 4630,
  original_urls: 1240,
  distinct_event_url_keys: 296,
  successful_event_pages: 215,
  redirect_event_urls: 74,
  not_found_captures: 7
};

const privatePathPattern =
  /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|private\/tmp|\/private\/tmp|\.docx|\.xlsx/i;
const validIdPattern = /^(source|claim|research|asset|page)(\.[A-Za-z0-9_-]+)+$/;
const publicStatuses = new Set([
  "approved-public",
  "approved-public-summary",
  "qualified-public"
]);

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(file) {
  return readFileSync(file, "utf8");
}

function readJson(relativePath) {
  const absolute = path.join(kbRoot, relativePath);
  if (!existsSync(absolute)) {
    fail(`${path.relative(repoRoot, absolute)} is missing`);
    return null;
  }

  try {
    return JSON.parse(read(absolute));
  } catch (error) {
    fail(`${path.relative(repoRoot, absolute)} is not valid JSON: ${error.message}`);
    return null;
  }
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

function assertId(id, label) {
  if (!validIdPattern.test(id)) {
    fail(`${label} has invalid stable ID: ${id}`);
  }
}

const sources = readJson("sources.json") ?? [];
const claims = readJson("claims.json") ?? [];
const researchRuns = readJson("research-runs.json") ?? [];
const assets = readJson("assets.json") ?? [];
const callNycPage = readJson("pages/callnyc.json");
const pages = callNycPage ? [callNycPage] : [];

const sourceIds = new Set(sources.map((item) => item.id));
const claimIds = new Set(claims.map((item) => item.id));
const researchRunIds = new Set(researchRuns.map((item) => item.id));
const assetIds = new Set(assets.map((item) => item.id));
const knownSupportIds = new Set([...sourceIds, ...researchRunIds]);
const usedClaimIds = new Set(pages.flatMap((page) => page.claimOrder ?? []));

const allRecords = [
  ...sources.map((item) => ["source", item]),
  ...claims.map((item) => ["claim", item]),
  ...researchRuns.map((item) => ["research run", item]),
  ...assets.map((item) => ["asset", item]),
  ...pages.map((item) => ["page manifest", item])
];

const seenIds = new Map();
for (const [label, record] of allRecords) {
  assertId(record.id, label);
  if (seenIds.has(record.id)) {
    fail(`${record.id} is duplicated in ${seenIds.get(record.id)} and ${label}`);
  }
  seenIds.set(record.id, label);
}

for (const file of walk(kbRoot)) {
  const text = read(file);
  if (privatePathPattern.test(text)) {
    fail(`${relative(file)} contains a local/private path or private file marker`);
  }

  if (/"(?:citationNumber|citation_number|publicNumber|referenceNumber)"\s*:/.test(text)) {
    fail(`${relative(file)} appears to store citation numbers as source identity`);
  }
}

for (const routeDir of [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/public-claims"
]) {
  if (existsSync(path.join(repoRoot, routeDir))) {
    fail(`${routeDir} must not exist as a public route`);
  }
}

for (const source of sources) {
  if (!source.title || !source.citationLabel || !source.guardrail) {
    fail(`${source.id} is missing title, citationLabel, or guardrail`);
  }

  if (!source.archiveUrl && source.publicUrl && source.publiclyLinkable) {
    warn(`${source.id} has a public URL without a separate archive URL`);
  }

  const isPrivateSource =
    source.originKind?.includes("private") ||
    source.sourceType?.includes("private") ||
    source.publiclyLinkable === false;

  if (isPrivateSource && (source.publicUrl || source.archiveUrl)) {
    fail(`${source.id} is private/non-linkable but exposes a publicUrl or archiveUrl`);
  }

  if (isPrivateSource && !source.rightsReview) {
    warn(`${source.id} is private/non-linkable and has no rightsReview note`);
  }

  if (source.sourceType?.includes("participant")) {
    if (source.publiclyLinkable) fail(`${source.id} is a participant source but is linkable`);
    if (!source.protectedBoundaries?.some((item) => /identit/i.test(item))) {
      fail(`${source.id} is a participant source without identity protection`);
    }
    if (source.publicUrl || source.archiveUrl) {
      fail(`${source.id} is a participant source with a public URL`);
    }
  }
}

for (const researchRun of researchRuns) {
  if (!researchRun.counts || Object.keys(researchRun.counts).length === 0) {
    warn(`${researchRun.id} has no public counts`);
  }

  if (researchRun.id === "research.civic-hall-wayback-cdx.2026-07") {
    for (const [key, expected] of Object.entries(expectedResearchCounts)) {
      if (researchRun.counts?.[key] !== expected) {
        fail(`${researchRun.id} count ${key} is ${researchRun.counts?.[key]} not ${expected}`);
      }
    }
  }

  for (const sourceId of researchRun.sourceIds ?? []) {
    if (!sourceIds.has(sourceId)) {
      fail(`${researchRun.id} references unknown source ${sourceId}`);
    }
  }
}

for (const asset of assets) {
  if (!sourceIds.has(asset.sourceId)) {
    fail(`${asset.id} references unknown source ${asset.sourceId}`);
  }
}

for (const claim of claims) {
  if (publicStatuses.has(claim.status) && !claim.support?.length) {
    fail(`${claim.id} is public but has no support`);
  }

  if (publicStatuses.has(claim.status) && claim.supportLevel === "pending") {
    fail(`${claim.id} is public but has pending support`);
  }

  if (publicStatuses.has(claim.status) && !claim.requiredPublicQualifications?.length) {
    fail(`${claim.id} is public but has no required public qualifications`);
  }

  const publicSupport = claim.support?.filter((support) => support.includeInPublicCitation) ?? [];
  if (publicStatuses.has(claim.status) && !publicSupport.length) {
    fail(`${claim.id} is public but has no public citation support`);
  }

  for (const support of claim.support ?? []) {
    if (!knownSupportIds.has(support.sourceId)) {
      fail(`${claim.id} references unknown source or research run ${support.sourceId}`);
    }
  }
}

for (const page of pages) {
  for (const claimId of page.claimOrder ?? []) {
    if (!claimIds.has(claimId)) {
      fail(`${page.id} references unknown claim ${claimId}`);
      continue;
    }

    const claim = claims.find((item) => item.id === claimId);
    if (!publicStatuses.has(claim.status)) {
      fail(`${page.id} lists non-public claim ${claimId}`);
    }

    if (!claim.allowedSurfaces?.includes(page.surface)) {
      fail(`${claimId} is not allowed on ${page.surface}`);
    }
  }
}

if (callNycPage) {
  const actual = callNycPage.claimOrder ?? [];
  if (JSON.stringify(actual) !== JSON.stringify(requiredCallNycClaimOrder)) {
    fail("CallNYC page manifest claim order does not match the required public citation sequence");
  }
}

for (const claim of claims) {
  if (publicStatuses.has(claim.status) && !usedClaimIds.has(claim.id)) {
    warn(`${claim.id} is public-approved but unused by any page manifest`);
  }
}

const callNycContentPath = path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx");
const workDataPath = path.join(repoRoot, "apps/www/src/data/work.ts");
const callNycContent = existsSync(callNycContentPath) ? read(callNycContentPath) : "";
const workData = existsSync(workDataPath) ? read(workDataPath) : "";

if (/2014-2015/.test(callNycContent + workData)) {
  fail("CallNYC still contains 2014-2015 instead of 2016");
}

if (/Politico citation pending|citation approvals pending|Public-safe screenshots pending/i.test(callNycContent + workData)) {
  fail("CallNYC still contains pending citation/screenshot language");
}

if (!/References page=\{callNycCitationPage\}/.test(callNycContent)) {
  fail("CallNYC page does not render the References component");
}

if (callNycPage?.referenceHeading !== "Sources & notes") {
  fail("CallNYC page manifest does not set the Sources & notes heading");
}

if (!/not recover|not recovered/i.test(callNycContent)) {
  fail("CallNYC archival note is missing not-recovered language");
}

const citationComponentPath = path.join(repoRoot, "apps/www/src/components/citations/Cite.tsx");
const referencesComponentPath = path.join(repoRoot, "apps/www/src/components/citations/References.tsx");
if (!existsSync(citationComponentPath) || !existsSync(referencesComponentPath)) {
  fail("Citation components are missing");
} else {
  const citationComponent = read(citationComponentPath);
  const referencesComponent = read(referencesComponentPath);

  if (!/href=\{`#reference-\$\{number\}`\}/.test(citationComponent)) {
    fail("Inline citations must link only to page-local references");
  }

  if (!/aria-label=\{`Citation \$\{number\}`\}/.test(citationComponent)) {
    fail("Inline citations need accessible aria labels");
  }

  if (/source\.|claim\.|research\./.test(referencesComponent)) {
    fail("References component appears to render stable internal IDs");
  }
}

for (const publicRoute of [
  "apps/www/src/app/proofs/page.tsx",
  "apps/www/src/app/knowledge-bank/page.tsx",
  "apps/www/src/app/public-claims/page.tsx"
]) {
  if (existsSync(path.join(repoRoot, publicRoute)) || statSync(path.dirname(path.join(repoRoot, publicRoute)), { throwIfNoEntry: false })?.isDirectory()) {
    fail(`${publicRoute} or its route directory must not exist`);
  }
}

if (warnings.length) {
  console.warn("Citational-care warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Citational-care check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Citational-care check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`
);
