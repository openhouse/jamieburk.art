#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(repoRoot, "apps/www/src/data/knowledge-bank");
const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
const layoutPath = path.join(repoRoot, "apps/www/src/components/CaseStudyLayout.tsx");
const mdxRoot = path.join(repoRoot, "apps/www/src/content/work");
const researchDoc = path.join(
  repoRoot,
  "docs/knowledge-bank/research/callnyc-civic-hall-2016.md"
);

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(file) {
  return readFileSync(file, "utf8");
}

function readJson(name) {
  const file = path.join(dataRoot, name);
  try {
    return JSON.parse(read(file));
  } catch (error) {
    fail(`${path.relative(repoRoot, file)} is invalid JSON: ${error.message}`);
    return [];
  }
}

function uniqueMap(label, records) {
  const map = new Map();
  for (const record of records) {
    if (!record || typeof record.id !== "string") {
      fail(`${label} record is missing a string ID`);
      continue;
    }
    if (map.has(record.id)) fail(`duplicate ${label} ID: ${record.id}`);
    map.set(record.id, record);
  }
  return map;
}

function validUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const sources = readJson("sources.json");
const evidence = readJson("evidence.json");
const claims = readJson("claims.json");
const pages = readJson("pages.json");
const researchRuns = readJson("research-runs.json");

const sourceById = uniqueMap("source", sources);
const evidenceById = uniqueMap("evidence", evidence);
const claimById = uniqueMap("claim", claims);
const pageById = uniqueMap("page", pages);
uniqueMap("research run", researchRuns);

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
for (const [label, map] of [
  ["source", sourceById],
  ["evidence", evidenceById],
  ["claim", claimById],
  ["page", pageById]
]) {
  for (const id of map.keys()) {
    if (!idPattern.test(id)) fail(`${label} ID is not stable kebab-case: ${id}`);
  }
}

for (const source of sources) {
  const links = [source.url, source.archiveUrl, source.assetUrl].filter(Boolean);
  const publicPageLinks = [source.url, source.archiveUrl].filter(Boolean);
  for (const link of links) {
    if (!validUrl(link)) fail(`source ${source.id} has invalid URL: ${link}`);
  }
  if (source.publicLinkAllowed && publicPageLinks.length === 0) {
    fail(`public-link source ${source.id} has no URL or archive URL`);
  }
  if (source.accessStatus === "private" && links.length > 0) {
    fail(`private source ${source.id} contains a public URL`);
  }
  if (source.accessStatus === "live" && !source.archiveUrl) {
    warn(`live source ${source.id} has no archive URL`);
  }
  if (
    source.sourceClass === "participant-archive" &&
    !/rights.+review|required.+review|review required/i.test(source.publicNote ?? "")
  ) {
    warn(`participant archive ${source.id} lacks a rights-review note`);
  }
}

for (const record of evidence) {
  if (!sourceById.has(record.sourceId)) {
    fail(`evidence ${record.id} references missing source ${record.sourceId}`);
  }
}

for (const claim of claims) {
  if (!Array.isArray(claim.evidenceIds) || claim.evidenceIds.length === 0) {
    fail(`claim ${claim.id} has no evidence IDs`);
    continue;
  }
  for (const evidenceId of claim.evidenceIds) {
    if (!evidenceById.has(evidenceId)) {
      fail(`claim ${claim.id} references missing evidence ${evidenceId}`);
    }
  }
  if (new Set(claim.evidenceIds).size !== claim.evidenceIds.length) {
    fail(`claim ${claim.id} has duplicate evidence IDs`);
  }

  const relations = claim.evidenceIds
    .map((id) => evidenceById.get(id)?.relation)
    .filter(Boolean);
  if (
    claim.state === "known" &&
    relations.length > 0 &&
    relations.every((relation) => relation === "context" || relation === "contradiction")
  ) {
    fail(`known claim ${claim.id} is supported only by context or contradiction evidence`);
  }

  if (claim.precision === "not-recovered") {
    const negativeEvidence = claim.evidenceIds
      .map((id) => evidenceById.get(id))
      .filter((record) => record?.relation === "negative-search");
    if (negativeEvidence.length === 0 || researchRuns.every((run) => !run.limitations?.length)) {
      warn(`negative-search claim ${claim.id} lacks search scope or limitations`);
    }
  }

  if (/\b\d{1,2}:\d{2}\s*(?:a\.?m\.?|p\.?m\.?)\b/i.test(claim.canonicalText)) {
    const supportingClasses = claim.evidenceIds
      .map((id) => evidenceById.get(id))
      .map((record) => sourceById.get(record?.sourceId)?.sourceClass)
      .filter(Boolean);
    if (
      supportingClasses.length > 0 &&
      supportingClasses.every((sourceClass) => sourceClass === "participant-archive")
    ) {
      warn(`exact event time in ${claim.id} relies only on participant-photo evidence`);
    }
  }
}

for (const page of pages) {
  if (!Array.isArray(page.claimOrder) || page.claimOrder.length === 0) {
    fail(`page ${page.id} has no claim order`);
    continue;
  }
  if (new Set(page.claimOrder).size !== page.claimOrder.length) {
    fail(`page ${page.id} has duplicate claim IDs in claimOrder`);
  }
  for (const claimId of page.claimOrder) {
    const claim = claimById.get(claimId);
    if (!claim) {
      fail(`page ${page.id} references missing claim ${claimId}`);
      continue;
    }
    if (!claim.allowedSurfaces?.includes(page.path)) {
      fail(`claim ${claimId} is not allowed on ${page.path}`);
    }
    for (const evidenceId of claim.evidenceIds) {
      const record = evidenceById.get(evidenceId);
      if (record && !record.publicCitationAllowed) {
        fail(`page ${page.id} cites evidence ${evidenceId} that disallows public citation`);
      }
    }
  }
}

const citationsByFile = new Map();
for (const entry of readdirSync(mdxRoot, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;
  const file = path.join(mdxRoot, entry.name);
  const citations = [...read(file).matchAll(/<Cite\b([^>]*)\/>/g)].map((match) => {
    const pageId = /\bpage=["']([^"']+)["']/.exec(match[1])?.[1];
    const claimId = /\bclaimId=["']([^"']+)["']/.exec(match[1])?.[1];
    if (!pageId || !claimId) {
      fail(`${path.relative(repoRoot, file)} has a Cite without page and claimId`);
    }
    return { pageId: pageId ?? "", claimId: claimId ?? "" };
  });
  citationsByFile.set(file, citations);

  for (const citation of citations) {
    const page = pageById.get(citation.pageId);
    if (!page) {
      fail(`${path.relative(repoRoot, file)} uses unknown citation page ${citation.pageId}`);
      continue;
    }
    if (!claimById.has(citation.claimId)) {
      fail(`${path.relative(repoRoot, file)} uses unknown citation claim ${citation.claimId}`);
      continue;
    }
    if (!page.claimOrder.includes(citation.claimId)) {
      fail(`cited claim ${citation.claimId} is missing from page ${page.id} claimOrder`);
    }
  }
}

for (const page of pages) {
  const slug = page.path.split("/").filter(Boolean).at(-1);
  const file = path.join(mdxRoot, `${slug}.mdx`);
  if (!existsSync(file)) {
    fail(`citation page ${page.id} has no MDX file at ${path.relative(repoRoot, file)}`);
    continue;
  }
  const citations = citationsByFile.get(file) ?? [];

  const actualOrder = citations.map((citation) => citation.claimId);
  if (new Set(actualOrder).size !== actualOrder.length) {
    fail(`MDX page ${page.id} cites the same claim more than once`);
  }
  if (actualOrder.join("|") !== page.claimOrder.join("|")) {
    warn(`page ${page.id} claimOrder differs from MDX citation appearance`);
  }
}

const workSource = existsSync(workPath) ? read(workPath) : "";
const layoutSource = existsSync(layoutPath) ? read(layoutPath) : "";
for (const page of pages) {
  if (!workSource.includes(`citationPageId: "${page.id}"`)) {
    fail(`page ${page.id} has citations but no citationPageId in work metadata`);
  }
}
if (pages.length > 0 && !/<References\s+page=/.test(layoutSource)) {
  fail("citation pages exist but CaseStudyLayout has no References rendering path");
}

const restrictedDataPattern =
  /\/private\/tmp|\/Volumes\/|\/Users\/|file:\/\/|Apple Photos Library|\.photoslibrary|raw-transcripts|otter-exports|gdrive\/|google-drive\/|legal-review\/|coalition-private\/|client-private\//i;
for (const name of ["sources.json", "evidence.json", "claims.json", "pages.json", "research-runs.json"]) {
  const content = read(path.join(dataRoot, name));
  if (restrictedDataPattern.test(content)) {
    fail(`citation data ${name} contains a private filesystem or source marker`);
  }
}
if (existsSync(researchDoc) && restrictedDataPattern.test(read(researchDoc))) {
  fail("public CallNYC research note contains a private filesystem or source marker");
}

const usedEvidence = new Set(
  pages.flatMap((page) =>
    page.claimOrder.flatMap((claimId) => claimById.get(claimId)?.evidenceIds ?? [])
  )
);
const usedSources = new Set(
  [...usedEvidence].map((evidenceId) => evidenceById.get(evidenceId)?.sourceId).filter(Boolean)
);
for (const source of sources) {
  if (!usedSources.has(source.id) && source.sourceClass !== "research-log") {
    warn(`source ${source.id} is not used by a public citation page`);
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

console.log(
  `Citation check passed: ${sources.length} sources, ${evidence.length} evidence records, ${claims.length} claims, ${pages.length} page.`
);
