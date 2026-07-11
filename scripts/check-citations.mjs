#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(repoRoot, "apps/www/src/data/citations");
const failures = [];
const warnings = [];

function readJson(filename) {
  return JSON.parse(readFileSync(path.join(dataRoot, filename), "utf8"));
}

function duplicateIds(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record.id)) failures.push(`Duplicate ${label} ID: ${record.id}`);
    seen.add(record.id);
  }
  return seen;
}

function unsafePublicValue(value) {
  return /file:\/\/|\/(?:private|tmp|Volumes|Users)\/|Mobile Documents|CloudStorage|civic-hall-wayback-research/i.test(
    value
  );
}

function mdxPathFor(pagePath) {
  const match = /^\/work\/([a-z0-9-]+)$/.exec(pagePath);
  if (!match) return null;
  return path.join(repoRoot, `apps/www/src/content/work/${match[1]}.mdx`);
}

function citeRecords(source) {
  return [...source.matchAll(/<Cite\s+([\s\S]*?)\s*\/>/g)].map((match) => {
    const props = match[1];
    return {
      setId: /setId="([^"]+)"/.exec(props)?.[1],
      claimId: /claimId="([^"]+)"/.exec(props)?.[1],
      occurrence: Number(/occurrence=\{(\d+)\}/.exec(props)?.[1])
    };
  });
}

const sources = readJson("sources.json");
const claims = readJson("claims.json");
const inquiries = readJson("research-inquiries.json");
const citationSets = readJson("citation-sets.json");

const sourceIds = duplicateIds(sources, "source");
const claimIds = duplicateIds(claims, "claim");
duplicateIds(inquiries, "research-inquiry");
duplicateIds(citationSets, "citation-set");

for (const source of sources) {
  const publicValues = [
    source.originalUrl,
    source.archiveUrl,
    source.preferredPublicUrl,
    source.locator
  ].filter(Boolean);

  for (const value of publicValues) {
    if (unsafePublicValue(value)) {
      failures.push(`${source.id} contains an unsafe public path or URL`);
    }
  }

  if (
    ["protected", "private"].includes(source.visibility) &&
    [source.originalUrl, source.archiveUrl, source.preferredPublicUrl].some(Boolean)
  ) {
    failures.push(`${source.id} is ${source.visibility} but attempts to expose a public URL`);
  }

  if (source.originalUrl && !source.archiveUrl) {
    warnings.push(`${source.id} has an original URL but no archive URL`);
  }
  if (source.status === "archived" && source.archiveUrl && !source.originalUrl) {
    warnings.push(`${source.id} is archived but has no original URL`);
  }
}

for (const claim of claims) {
  if (claim.publicApproved && !claim.evidence?.length) {
    failures.push(`${claim.id} is public-approved but has no evidence`);
  }

  for (const relationship of claim.evidence ?? []) {
    if (!sourceIds.has(relationship.sourceId)) {
      failures.push(`${claim.id} references unknown source ${relationship.sourceId}`);
    }
  }

  const supportingSources = (claim.evidence ?? [])
    .map((relationship) => sources.find((source) => source.id === relationship.sourceId))
    .filter(Boolean);
  if (
    claim.publicApproved &&
    supportingSources.length > 0 &&
    supportingSources.every((source) => source.visibility === "private") &&
    supportingSources.some((source) => !source.shortCitation || !source.fullCitation)
  ) {
    failures.push(`${claim.id} relies only on private records without safe public citation text`);
  }

  if (
    claim.evidenceStatus === "not_recovered" &&
    !claim.qualifier &&
    !(claim.limitations ?? []).length
  ) {
    failures.push(`${claim.id} is not_recovered but has no search limitation`);
  }
}

for (const inquiry of inquiries) {
  if (!inquiry.limitation) failures.push(`${inquiry.id} has no stated limitation`);
  if (unsafePublicValue(JSON.stringify(inquiry))) {
    failures.push(`${inquiry.id} contains an unsafe private research path`);
  }
}

for (const set of citationSets) {
  if (!/^\/[a-z0-9-/]*$/.test(set.pagePath) || set.pagePath.includes("..")) {
    failures.push(`${set.id} has an invalid page path: ${set.pagePath}`);
  }

  const declaredClaims = new Set();
  for (const entry of set.entries) {
    if (!claimIds.has(entry.claimId)) {
      failures.push(`${set.id} references unknown claim ${entry.claimId}`);
    }
    if (declaredClaims.has(entry.claimId)) {
      failures.push(`${set.id} declares ${entry.claimId} more than once`);
    }
    declaredClaims.add(entry.claimId);
  }

  const mdxPath = mdxPathFor(set.pagePath);
  if (!mdxPath || !existsSync(mdxPath)) {
    failures.push(`${set.id} does not map to an existing pilot MDX page`);
    continue;
  }

  const mdx = readFileSync(mdxPath, "utf8");
  const cites = citeRecords(mdx).filter((cite) => cite.setId === set.id);
  const firstAppearance = [...new Set(cites.map((cite) => cite.claimId))];
  const declaredOrder = set.entries.map((entry) => entry.claimId);

  if (JSON.stringify(firstAppearance) !== JSON.stringify(declaredOrder)) {
    failures.push(`${set.id} order does not match first citation appearance in its MDX page`);
  }

  for (const cite of cites) {
    if (!cite.claimId || !declaredClaims.has(cite.claimId)) {
      failures.push(`${set.id} MDX references undeclared claim ${cite.claimId ?? "missing"}`);
    }
    if (!Number.isInteger(cite.occurrence) || cite.occurrence < 1) {
      failures.push(`${set.id} has a Cite with a missing or invalid occurrence`);
    }
  }

  for (const entry of set.entries) {
    const occurrences = cites
      .filter((cite) => cite.claimId === entry.claimId)
      .map((cite) => cite.occurrence)
      .sort((a, b) => a - b);
    const expected = Array.from({ length: entry.occurrences }, (_, index) => index + 1);

    if (occurrences.length === 0) {
      failures.push(`${set.id} declares unused claim ${entry.claimId}`);
    } else if (JSON.stringify(occurrences) !== JSON.stringify(expected)) {
      failures.push(
        `${set.id} claim ${entry.claimId} occurrences must be contiguous 1-${entry.occurrences}`
      );
    }
  }

  if (!new RegExp(`<References\\s+setId="${set.id}"\\s*\\/>`).test(mdx)) {
    failures.push(`${set.id} page is missing its References component`);
  }
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
