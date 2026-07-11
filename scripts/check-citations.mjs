#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const warnings = [];

const allowedRelations = new Set([
  "supports",
  "corroborates",
  "qualifies",
  "contextualizes",
  "contradicts",
  "documents-negative-search"
]);
const publicStatuses = new Set(["approved", "approved-qualified"]);
const blockedStatuses = new Set(["needs-review", "do-not-publish"]);
const publicSourceVisibilities = new Set(["public", "link-only"]);
const protectedSourceVisibilities = new Set([
  "restricted",
  "private",
  "protected",
  "not-for-projection"
]);

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  try {
    return JSON.parse(read(relativePath));
  } catch (error) {
    failures.push(`${relativePath} cannot parse: ${error.message}`);
    return null;
  }
}

function assertArray(value, label) {
  if (!Array.isArray(value)) failures.push(`${label} must be an array`);
}

function assertUnique(records, label) {
  const seen = new Set();

  for (const record of records) {
    if (!record?.id) {
      failures.push(`${label} has a record without an id`);
      continue;
    }

    if (seen.has(record.id)) failures.push(`${label} has duplicate id: ${record.id}`);
    seen.add(record.id);
  }
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function eachString(value, visit) {
  if (typeof value === "string") {
    visit(value);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) eachString(item, visit);
    return;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) eachString(item, visit);
  }
}

function assertNoPrivateLocator(records, label) {
  for (const record of records) {
    eachString(record, (value) => {
      if (/\/Users\/|\/Volumes\/|\/private\/tmp\/|file:\/\//.test(value)) {
        failures.push(`${label} ${record.id ?? "unknown"} leaks a private/local path`);
      }
    });
  }
}

function assertNoStoredDisplayNumbers(records, label) {
  for (const record of records) {
    if (record && typeof record === "object" && "displayNumber" in record) {
      failures.push(`${label} ${record.id ?? "unknown"} stores a manual displayNumber`);
    }
  }
}

const sources = readJson("apps/www/src/data/knowledge-bank/sources.json") ?? [];
const claims = readJson("apps/www/src/data/knowledge-bank/claims.json") ?? [];
const pageCitations = readJson("apps/www/src/data/knowledge-bank/page-citations.json") ?? {};
const media = readJson("apps/www/src/data/knowledge-bank/media.json") ?? [];
const researchRuns = readJson("apps/www/src/data/knowledge-bank/research-runs.json") ?? [];
const corrections = readJson("apps/www/src/data/knowledge-bank/corrections.json") ?? [];

assertArray(sources, "sources.json");
assertArray(claims, "claims.json");
assertArray(media, "media.json");
assertArray(researchRuns, "research-runs.json");
assertArray(corrections, "corrections.json");

if (!pageCitations || Array.isArray(pageCitations)) {
  failures.push("page-citations.json must be an object keyed by page path");
}

assertUnique(sources, "sources.json");
assertUnique(claims, "claims.json");
assertUnique(media, "media.json");
assertUnique(researchRuns, "research-runs.json");
assertUnique(corrections, "corrections.json");

assertNoPrivateLocator(sources, "source");
assertNoPrivateLocator(claims, "claim");
assertNoPrivateLocator(media, "media");
assertNoPrivateLocator(researchRuns, "research-run");
assertNoPrivateLocator(corrections, "correction");

assertNoStoredDisplayNumbers(sources, "source");
assertNoStoredDisplayNumbers(claims, "claim");
assertNoStoredDisplayNumbers(media, "media");
assertNoStoredDisplayNumbers(researchRuns, "research-run");
assertNoStoredDisplayNumbers(corrections, "correction");

const sourceById = new Map(sources.map((source) => [source.id, source]));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));
const mediaById = new Map(media.map((item) => [item.id, item]));
const correctionById = new Map(corrections.map((correction) => [correction.id, correction]));

for (const source of sources) {
  const urls = [source.url, ...(source.archiveUrls ?? [])].filter(Boolean);
  const allowsNoPublicLocator =
    protectedSourceVisibilities.has(source.publicVisibility) ||
    source.availability === "private" ||
    source.availability === "not-recovered";

  if (!urls.length && !allowsNoPublicLocator) {
    failures.push(`${source.id} must include an original URL, archive URL, or protected/private visibility`);
  }

  for (const url of urls) {
    if (!isHttpUrl(url)) failures.push(`${source.id} has malformed URL: ${url}`);
  }

  if (protectedSourceVisibilities.has(source.publicVisibility)) {
    warnings.push(`${source.id} is ${source.publicVisibility}; keep it out of public page projections`);
  }

  if (source.publicVisibility === "link-only") {
    warnings.push(`${source.id} is link-only; do not embed the source`);
  }

  if (source.type === "participant-photo" && publicSourceVisibilities.has(source.publicVisibility)) {
    failures.push(`${source.id} is a public participant-photo source without explicit approval gate`);
  }

  if (source.type === "archive-capture" && !source.scopeNote.toLowerCase().includes("preserves")) {
    failures.push(`${source.id} archive carrier must describe what it preserves`);
  }

  if (source.availability === "live" && !source.archiveUrls?.length) {
    warnings.push(`${source.id} is live but has no archive URL`);
  }

  if ((source.type === "social-post" || source.type === "official-social-post") && !source.archiveUrls?.length) {
    warnings.push(`${source.id} is a social post without an archive URL`);
  }
}

for (const claim of claims) {
  if (!Array.isArray(claim.evidence) || !claim.evidence.length) {
    failures.push(`${claim.id} must include evidence`);
    continue;
  }

  if (!Array.isArray(claim.projectedPages)) {
    failures.push(`${claim.id} must include projectedPages`);
  } else {
    for (const page of claim.projectedPages) {
      if (typeof page !== "string" || !page.startsWith("/")) {
        failures.push(`${claim.id} has invalid projected page: ${page}`);
      }
    }
  }

  let hasSupports = false;

  for (const evidence of claim.evidence) {
    const source = sourceById.get(evidence.sourceId);

    if (!source) {
      failures.push(`${claim.id} cites missing source: ${evidence.sourceId}`);
      continue;
    }

    if (!allowedRelations.has(evidence.relation)) {
      failures.push(`${claim.id} uses invalid evidence relation: ${evidence.relation}`);
    }

    if (evidence.relation === "supports") hasSupports = true;

    if (publicStatuses.has(claim.status) && protectedSourceVisibilities.has(source.publicVisibility)) {
      failures.push(`${claim.id} cites non-public source: ${source.id}`);
    }

    if (source.availability === "not-recovered" && evidence.relation === "supports") {
      failures.push(`${claim.id} treats a not-recovered source as positive proof`);
    }
  }

  if (publicStatuses.has(claim.status) && !hasSupports) {
    failures.push(`${claim.id} is public but has no supports relation`);
  }

  if (publicStatuses.has(claim.status) && claim.evidence.length === 1) {
    warnings.push(`${claim.id} relies on one public source`);
  }

  if (claim.id === "callnyc-councilstat-usage-varied" && !claim.caveat) {
    failures.push(`${claim.id} must carry its comparability caveat`);
  }
}

for (const [page, claimIds] of Object.entries(pageCitations)) {
  if (!page.startsWith("/")) failures.push(`Invalid page citation path: ${page}`);
  if (!Array.isArray(claimIds)) {
    failures.push(`${page} must list claim IDs`);
    continue;
  }

  const seen = new Set();
  for (const claimId of claimIds) {
    if (seen.has(claimId)) failures.push(`${page} repeats citation claim unnecessarily: ${claimId}`);
    seen.add(claimId);

    const claim = claimById.get(claimId);
    if (!claim) {
      failures.push(`${page} cites missing claim: ${claimId}`);
      continue;
    }

    if (blockedStatuses.has(claim.status)) {
      failures.push(`${page} projects non-public claim: ${claimId}`);
    }

    if (!claim.projectedPages.includes(page)) {
      failures.push(`${claimId} is used on ${page} but does not list that projected page`);
    }

    for (const evidence of claim.evidence) {
      const source = sourceById.get(evidence.sourceId);
      if (source?.type === "participant-photo") {
        failures.push(`${page} projects an unapproved participant photograph`);
      }
    }
  }
}

for (const item of media) {
  if (item.visibility !== "public" && item.publicUrl) {
    failures.push(`${item.id} has a public URL despite ${item.visibility} visibility`);
  }

  if (item.publicationStatus === "pending-rights" && item.publicUrl) {
    failures.push(`${item.id} is pending rights but has a public URL`);
  }

  if (item.id.includes("digital-district") && item.publicationStatus !== "pending-rights") {
    failures.push(`${item.id} should remain pending rights until explicit approval`);
  }
}

for (const run of researchRuns) {
  if (/No dedicated Civic Hall calendar/.test(run.result) && !/Non-recovery/.test(run.limitation)) {
    failures.push(`${run.id} must state that non-recovery is not proof of nonexistence`);
  }
}

for (const correction of corrections) {
  if (correction.status === "required-before-production") {
    failures.push(`${correction.id} remains required before production`);
  }
}

for (const requiredCorrectionId of [
  "callnyc-years-2014-2015-to-2016",
  "callnyc-first-civic-data-to-first-councilstat"
]) {
  const correction = correctionById.get(requiredCorrectionId);
  if (!correction) {
    failures.push(`${requiredCorrectionId} correction record is missing`);
  } else if (correction.status !== "applied") {
    failures.push(`${requiredCorrectionId} correction is not marked applied`);
  }
}

if (!mediaById.has("callnyc-digital-district-participant-photo")) {
  failures.push("protected participant-photo media record is missing");
}

const workSource = read("apps/www/src/data/work.ts");
const callnycBlock = workSource.slice(
  workSource.indexOf('title: "CallNYC.org"'),
  workSource.indexOf('title: "WOWList.org"')
);
const callnycMdx = read("apps/www/src/content/work/callnyc.mdx");
const callnycPublicText = `${callnycBlock}\n${callnycMdx}`;

if (/2014-2015/.test(callnycBlock)) {
  failures.push("CallNYC public year remains 2014-2015");
}

if (/first civic-data hackathon/i.test(callnycPublicText)) {
  failures.push("CallNYC public copy uses first civic-data hackathon");
}

if (!/archived, unofficial/i.test(callnycPublicText)) {
  failures.push("CallNYC public copy lost archived/unofficial limits");
}

if (/press citation pending/i.test(callnycBlock)) {
  failures.push("CallNYC still says press citation pending");
}

const restrictedLocationLabel = ["Digital", "District"].join(" ");
if (new RegExp(restrictedLocationLabel, "i").test(callnycMdx)) {
  failures.push("CallNYC public narrative projects participant-photo-only research");
}

if (!/No dedicated Civic Hall calendar listing/.test(read("docs/knowledge-bank/research/callnyc-hackathon-2016.md"))) {
  warnings.push("Known negative research finding is not recorded in the public-safe research note");
}

if (warnings.length) {
  console.warn("Citation warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Citation check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Citation check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`);
