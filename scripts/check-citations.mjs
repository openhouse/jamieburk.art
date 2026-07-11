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

function readJson(relativePath) {
  try {
    return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
  } catch (error) {
    failures.push(`${relativePath} cannot parse: ${error.message}`);
    return null;
  }
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
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

const sources = readJson("apps/www/src/data/knowledge-bank/sources.json") ?? [];
const claims = readJson("apps/www/src/data/knowledge-bank/claims.json") ?? [];
const pageCitations =
  readJson("apps/www/src/data/knowledge-bank/page-citations.json") ?? {};

if (!Array.isArray(sources)) failures.push("sources.json must be an array");
if (!Array.isArray(claims)) failures.push("claims.json must be an array");
if (!pageCitations || Array.isArray(pageCitations)) {
  failures.push("page-citations.json must be an object keyed by page path");
}

assertUnique(Array.isArray(sources) ? sources : [], "sources.json");
assertUnique(Array.isArray(claims) ? claims : [], "claims.json");

const sourceById = new Map(sources.map((source) => [source.id, source]));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));

for (const source of sources) {
  const urls = [source.url, ...(source.archiveUrls ?? [])].filter(Boolean);

  if (!urls.length) {
    failures.push(`${source.id} must include an original URL, archive URL, or both`);
  }

  for (const url of urls) {
    if (!isHttpUrl(url)) failures.push(`${source.id} has malformed URL: ${url}`);
  }

  if (source.publicVisibility === "not-for-projection") {
    warnings.push(`${source.id} is not-for-projection`);
  }

  if (source.publicVisibility === "link-only") {
    warnings.push(`${source.id} is link-only; do not embed the source`);
  }

  if (source.type === "participant-photo" && source.publicVisibility === "public") {
    failures.push(`${source.id} is a public participant-photo source without explicit approval gate`);
  }

  if (source.availability === "live" && !source.archiveUrls?.length) {
    warnings.push(`${source.id} is live but has no archive URL`);
  }

  if ((source.type === "social-post" || source.type === "official-social-post") && !source.archiveUrls?.length) {
    warnings.push(`${source.id} is a social post without an archive URL`);
  }

  if (source.dateAccessed && source.dateAccessed < "2026-01-01") {
    warnings.push(`${source.id} has an older access date: ${source.dateAccessed}`);
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

    if (publicStatuses.has(claim.status) && source.publicVisibility === "not-for-projection") {
      failures.push(`${claim.id} cites not-for-projection source: ${source.id}`);
    }
  }

  if (publicStatuses.has(claim.status) && !hasSupports) {
    failures.push(`${claim.id} is public but has no supports relation`);
  }

  if (publicStatuses.has(claim.status) && claim.evidence.length === 1) {
    warnings.push(`${claim.id} relies on one public source`);
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

    if (page === "/work/callnyc") {
      for (const evidence of claim.evidence) {
        const source = sourceById.get(evidence.sourceId);
        if (source?.type === "participant-photo") {
          failures.push("CallNYC page citation references an unapproved participant photograph");
        }
      }
    }
  }
}

const workSource = read("apps/www/src/data/work.ts");
const callnycBlock = workSource.slice(
  workSource.indexOf('title: "CallNYC.org"'),
  workSource.indexOf('title: "WOWList.org"')
);

if (/2014-2015/.test(callnycBlock)) {
  failures.push("CallNYC public year remains 2014-2015");
}

if (/press citation pending/i.test(callnycBlock)) {
  failures.push("CallNYC still says press citation pending");
}

const restrictedLocationLabel = ["Digital", "District"].join(" ");
if (new RegExp(restrictedLocationLabel, "i").test(read("apps/www/src/content/work/callnyc.mdx"))) {
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
