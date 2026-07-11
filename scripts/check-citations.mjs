#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(repoRoot, "apps/www/src/data/knowledge-bank");
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(rel) {
  return readFileSync(path.join(repoRoot, rel), "utf8");
}

function load(name) {
  return JSON.parse(readFileSync(path.join(dataRoot, name), "utf8"));
}

function checkUnique(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (!record.id) fail(`${label} record is missing an id`);
    if (seen.has(record.id)) fail(`duplicate ${label} id: ${record.id}`);
    seen.add(record.id);
  }
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (![".git", ".next", "node_modules"].includes(entry.name)) {
        files.push(...walk(absolute));
      }
      continue;
    }
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

const sources = load("sources.json");
const claims = load("claims.json");
const citationGroups = load("citation-groups.json");
const researchRuns = load("research-runs.json");
const pageOrders = load("page-citation-orders.json");

checkUnique(sources, "source");
checkUnique(claims, "claim");
checkUnique(citationGroups, "citation-group");
checkUnique(researchRuns, "research-run");

const sourceIds = new Set(sources.map((source) => source.id));
const claimIds = new Set(claims.map((claim) => claim.id));
const groupIds = new Set(citationGroups.map((group) => group.id));
const sourceById = new Map(sources.map((source) => [source.id, source]));

for (const source of sources) {
  if (!source.title?.trim()) fail(`${source.id} is missing title`);
  if (!source.supportSummary?.trim()) fail(`${source.id} is missing supportSummary`);

  const publicHref = source.originalUrl || source.archivedUrl || source.mediaUrl;
  if (source.publicCitationMode === "link" && !publicHref) {
    fail(`${source.id} is public-linkable but has no public URL`);
  }
  if (source.visibility === "public-archived" && !source.archivedUrl) {
    fail(`${source.id} is public-archived but has no archivedUrl`);
  }
  if (source.availability === "archived" && !source.archivedUrl) {
    fail(`${source.id} is archived but has no archivedUrl`);
  }
  if (source.visibility === "public-unlinked") {
    warn(`${source.id} is public-unlinked`);
  }
  if (source.originalUrl && !source.archivedUrl && source.originalUrl.startsWith("http")) {
    warn(`${source.id} has a live original URL without an archive URL`);
  }
  if (
    source.availability === "dead-original-archive-available" &&
    !source.archivedUrl
  ) {
    fail(`${source.id} says dead original archive available but has no archivedUrl`);
  }
}

for (const claim of claims) {
  for (const edge of claim.evidence ?? []) {
    if (!sourceIds.has(edge.sourceId)) {
      fail(`${claim.id} references unknown source ${edge.sourceId}`);
    }
    if (!edge.supportSummary?.trim()) {
      fail(`${claim.id} has an evidence edge without supportSummary`);
    }
  }

  const publicSurfaces = (claim.surfaces ?? []).filter((surface) => surface !== "internal-only");
  if (["pending", "private", "superseded"].includes(claim.status) && publicSurfaces.length) {
    fail(`${claim.id} is ${claim.status} but projected to public surfaces`);
  }
  if (claim.status === "careful" && claim.caveat) {
    warn(`${claim.id} is careful and carries a public caveat`);
  }
}

for (const group of citationGroups) {
  if (["pending", "private"].includes(group.status)) {
    fail(`${group.id} is ${group.status} but present in public citation groups`);
  }
  for (const claimId of group.claimIds) {
    if (!claimIds.has(claimId)) fail(`${group.id} references unknown claim ${claimId}`);
  }
  for (const sourceId of group.sourceIds) {
    if (!sourceIds.has(sourceId)) fail(`${group.id} references unknown source ${sourceId}`);
    const source = sourceById.get(sourceId);
    if (source?.publicCitationMode === "not-public") {
      fail(`${group.id} includes not-public source ${sourceId}`);
    }
    if (source?.publicCitationMode === "link") {
      const canRender =
        (group.includeOriginalLinks && source.originalUrl) ||
        (group.includeArchiveLinks && source.archivedUrl) ||
        (group.includeMediaLinks && source.mediaUrl);
      if (!canRender) {
        fail(`${group.id} includes link source ${sourceId} but no permitted link type`);
      }
    }
  }
}

for (const [pageKey, ids] of Object.entries(pageOrders)) {
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) fail(`${pageKey} citation order contains duplicate ${id}`);
    seen.add(id);
    if (!groupIds.has(id)) fail(`${pageKey} citation order references unknown ${id}`);
  }
}

const citationFiles = [
  ...walk(path.join(repoRoot, "apps/www/src/content")),
  ...walk(path.join(repoRoot, "apps/www/src/components"))
].filter((file) => /\.(mdx|tsx|ts)$/.test(file));

const citedIds = new Set();
for (const file of citationFiles) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/<(?:Cite|CitationRef)\b[\s\S]*?\bid=["']([^"']+)["']/g)) {
    citedIds.add(match[1]);
    if (!groupIds.has(match[1])) {
      fail(`${path.relative(repoRoot, file)} cites unknown group ${match[1]}`);
    }
  }
}

for (const [pageKey, ids] of Object.entries(pageOrders)) {
  if (pageKey === "callnyc") {
    for (const id of ids) {
      if (!citedIds.has(id)) fail(`CallNYC page order includes unused citation ${id}`);
    }
  }
}

const trackedCitationText = [
  "sources.json",
  "claims.json",
  "citation-groups.json",
  "research-runs.json",
  "page-citation-orders.json"
]
  .map((name) => readFileSync(path.join(dataRoot, name), "utf8"))
  .join("\n");

if (
  /\/Users\/|\/private\/|\/mnt\/|file:\/\/|raw-otter|transcripts-private|client-private/i.test(
    trackedCitationText
  )
) {
  fail("citation data contains a private filesystem path or private source marker");
}

for (const route of [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/public-claims"
]) {
  if (existsSync(path.join(repoRoot, route))) {
    fail(`public route must not exist: ${route}`);
  }
}

const workSource = read("apps/www/src/data/work.ts");
const callnycWorkBlock =
  /title:\s*"CallNYC\.org"[\s\S]*?\n\s*\},\n\s*\{\n\s*title:\s*"WOWList\.org"/.exec(
    workSource
  )?.[0] ?? "";
const callnycMdx = read("apps/www/src/content/work/callnyc.mdx");
const callnycPublicText = [callnycWorkBlock, callnycMdx].join("\n");
const callnycKnowledgeText = [
  callnycPublicText,
  read("docs/knowledge-bank/claims.md"),
  read("docs/knowledge-bank/proofs.md")
].join("\n");

if (/2014-2015|2014–2015/.test(callnycKnowledgeText)) {
  fail("CallNYC data still uses 2014-2015");
}
if (/citation pending|press citation pending|screenshots pending/i.test(callnycPublicText)) {
  fail("CallNYC public data still contains launch-scaffold citation language");
}
if (/Digital District was the official title|built during the hackathon|won the hackathon/i.test(callnycPublicText)) {
  fail("CallNYC public data contains a prohibited event relationship claim");
}

const componentText = read("apps/www/src/components/citations/CitationNotes.tsx");
if (/role="doc-endnote"/.test(componentText)) {
  fail("do not use deprecated doc-endnote role on individual list items");
}
if (!/role="doc-endnotes"/.test(componentText)) {
  fail("CitationNotes must use role=doc-endnotes on the notes section");
}
if (!/role="doc-noteref"/.test(read("apps/www/src/components/citations/CitationRef.tsx"))) {
  fail("CitationRef must use role=doc-noteref on the citation link");
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

console.log(
  `Citation check passed for ${sources.length} sources, ${claims.length} claims, ${citationGroups.length} citation groups, and ${researchRuns.length} research run(s)${
    warnings.length ? ` with ${warnings.length} warning(s)` : ""
  }.`
);
