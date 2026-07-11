#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  assets,
  citationNotes,
  claims,
  corrections,
  evidenceRelationships,
  pageProjections,
  researchRuns,
  sources
} from "../apps/www/src/data/knowledge-bank/index.ts";
import { resolveCitationPage } from "../apps/www/src/lib/citations.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const warnings = [];
const localPathPattern =
  /(?:\/private\/|\/tmp\/|\/Users\/|~\/|[A-Za-z]:\\(?:Users|Documents|tmp)\\)/;

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function duplicateIds(records) {
  const seen = new Set();
  return records
    .map((record) => record.id)
    .filter((id) => (seen.has(id) ? true : !seen.add(id)));
}

function assertUnique(label, records) {
  const duplicates = [...new Set(duplicateIds(records))];
  if (duplicates.length) fail(`${label} contains duplicate IDs: ${duplicates.join(", ")}`);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return entry.isFile() ? [absolute] : [];
  });
}

for (const [label, records] of [
  ["sources", sources],
  ["claims", claims],
  ["evidence relationships", evidenceRelationships],
  ["citation notes", citationNotes],
  ["page projections", pageProjections],
  ["research runs", researchRuns],
  ["corrections", corrections],
  ["assets", assets]
]) {
  assertUnique(label, records);
}

const sourceIds = new Set(sources.map((source) => source.id));
const claimIds = new Set(claims.map((claim) => claim.id));
const noteIds = new Set(citationNotes.map((note) => note.id));
const assetIds = new Set(assets.map((asset) => asset.id));

for (const source of sources) {
  if (source.preservedBySourceId && !sourceIds.has(source.preservedBySourceId)) {
    fail(`${source.id} references unknown preserving source ${source.preservedBySourceId}`);
  }
  if (
    source.publicUseStatus === "protected" &&
    (source.canonicalUrl || source.archiveUrl || source.originalUrl)
  ) {
    fail(`${source.id} is protected but exposes a URL`);
  }
  if (
    ["public", "public-with-caveat"].includes(source.publicUseStatus) &&
    (!source.title || !source.sourceClass || !source.mediaType || !source.publicSourceNote)
  ) {
    fail(`${source.id} lacks required public source metadata`);
  }
  if (source.publicUseStatus === "protected") {
    warn(`${source.id} is protected and intentionally has no public URL`);
  }
  if (
    ["public", "public-with-caveat"].includes(source.publicUseStatus) &&
    !source.lastVerifiedAt
  ) {
    warn(`${source.id} has no manual link-verification date`);
  }
  if (!source.canonicalUrl && source.archiveUrl) {
    warn(`${source.id} uses an archived capture without a canonical URL`);
  }
}

for (const relationship of evidenceRelationships) {
  if (!claimIds.has(relationship.claimId)) {
    fail(`${relationship.id} references unknown claim ${relationship.claimId}`);
  }
  if (!sourceIds.has(relationship.sourceId)) {
    fail(`${relationship.id} references unknown source ${relationship.sourceId}`);
  }
}

for (const note of citationNotes) {
  for (const claimId of note.claimIds) {
    if (!claimIds.has(claimId)) fail(`${note.id} references unknown claim ${claimId}`);
  }
  for (const sourceId of note.sourceIds) {
    if (!sourceIds.has(sourceId)) fail(`${note.id} references unknown source ${sourceId}`);
  }
}

const citedClaimSurfaces = new Set();
for (const page of pageProjections) {
  const occurrenceIds = new Set();
  const domIds = new Set();

  for (const assetId of page.assetIds) {
    if (!assetIds.has(assetId)) fail(`${page.id} references unknown asset ${assetId}`);
    const asset = assets.find((candidate) => candidate.id === assetId);
    if (asset?.publicUseStatus === "protected") {
      fail(`${page.id} attempts to render protected asset ${assetId}`);
    }
  }

  for (const occurrence of page.occurrences) {
    if (occurrenceIds.has(occurrence.id)) {
      fail(`${page.id} contains duplicate reference ID ${occurrence.id}`);
    }
    occurrenceIds.add(occurrence.id);

    if (!noteIds.has(occurrence.noteId)) {
      fail(`${page.id}/${occurrence.id} references unknown note ${occurrence.noteId}`);
    }
    const claim = claims.find((candidate) => candidate.id === occurrence.claimId);
    if (!claim) {
      fail(`${page.id}/${occurrence.id} references unknown claim ${occurrence.claimId}`);
      continue;
    }
    if (!claim.allowedSurfaces.includes(page.surface)) {
      fail(`${page.id}/${occurrence.id} projects ${claim.id} to disallowed surface ${page.surface}`);
    }
    if (claim.status !== "approved") {
      fail(`${page.id}/${occurrence.id} projects ${claim.status} claim ${claim.id}`);
    }
    const note = citationNotes.find((candidate) => candidate.id === occurrence.noteId);
    if (note && !note.claimIds.includes(claim.id)) {
      fail(`${page.id}/${occurrence.id} cites note ${note.id}, which does not govern claim ${claim.id}`);
    }
    citedClaimSurfaces.add(`${claim.id}:${page.surface}`);
  }

  const resolved = resolveCitationPage(page.id);
  for (const occurrence of resolved.occurrences) {
    for (const domId of [occurrence.referenceAnchor, occurrence.noteAnchor]) {
      if (domId.startsWith("cite-ref-") && domIds.has(domId)) {
        fail(`${page.id} would generate duplicate DOM ID ${domId}`);
      }
      if (domId.startsWith("cite-ref-")) domIds.add(domId);
    }
  }
  const noteDomIds = resolved.notes.map((note) => note.noteAnchor);
  if (new Set(noteDomIds).size !== noteDomIds.length) {
    fail(`${page.id} would generate duplicate note DOM IDs`);
  }
  for (const note of resolved.notes) {
    for (const occurrence of note.occurrences) {
      if (!resolved.occurrences.some((candidate) => candidate.referenceAnchor === occurrence.referenceAnchor)) {
        fail(`${page.id}/${note.note.id} has an invalid backlink target`);
      }
    }
  }
}

for (const claim of claims) {
  if (!claim.mustCite || claim.status !== "approved") continue;
  for (const surface of claim.allowedSurfaces) {
    if (!citedClaimSurfaces.has(`${claim.id}:${surface}`)) {
      fail(`${claim.id} must be cited but has no occurrence on ${surface}`);
    }
  }
  if (claim.strength === "reconstructed") {
    warn(`${claim.id} is supported by reconstruction rather than direct evidence`);
  }
}

const graphText = JSON.stringify({
  assets,
  citationNotes,
  claims,
  corrections,
  evidenceRelationships,
  pageProjections,
  researchRuns,
  sources
});
if (localPathPattern.test(graphText)) fail("Citation graph exposes a local filesystem path");

const workSource = read("apps/www/src/data/work.ts");
const callnycContent = read("apps/www/src/content/work/callnyc.mdx");
const technicalOperations = read("apps/www/src/app/work/technical-operations/page.tsx");
const colophon = read("apps/www/src/app/colophon/page.tsx");
const publicCallnycText = `${workSource}\n${callnycContent}\n${technicalOperations}`;

const callnycBlock = workSource.slice(
  workSource.indexOf('title: "CallNYC.org"'),
  workSource.indexOf('title: "WOWList.org"')
);
if (!/years:\s*"2016"/.test(callnycBlock)) fail("CallNYC public year must be exactly 2016");
if (/2014[\u2013-]2015/.test(publicCallnycText)) fail("CallNYC public output still contains 2014-2015");
if (/recovered Civic Hall calendar listing/i.test(publicCallnycText)) {
  fail("CallNYC is described as a recovered Civic Hall calendar listing");
}
if (/CallNYC\s+(?:is|was)\s+an official/i.test(publicCallnycText)) {
  fail("CallNYC is described as an official Council service");
}
if (/first civic-data hackathon/i.test(publicCallnycText)) {
  fail("CallNYC public output uses the unsupported phrase 'first civic-data hackathon'");
}
if (!callnycContent.includes('<References pageId="callnyc" />')) {
  fail("CallNYC does not render governed references");
}
if (!technicalOperations.includes('<References pageId="technical-operations" />')) {
  fail("Technical Operations does not render governed references");
}
if (!colophon.includes("Citational care")) fail("Colophon lacks the citational-care statement");

const correction = corrections.find((item) => item.id === "callnyc-project-year-2016");
if (!correction || correction.correctedText !== "2016") {
  fail("CallNYC year correction record is missing or incorrect");
}

const builtServerRoot = path.join(repoRoot, "apps/www/.next/server");
if (existsSync(builtServerRoot)) {
  const leakedOutput = walk(builtServerRoot)
    .filter((file) => [".html", ".rsc"].includes(path.extname(file)))
    .find((file) => localPathPattern.test(readFileSync(file, "utf8")));
  if (leakedOutput) {
    fail(`Built public output exposes a local filesystem path in ${path.relative(repoRoot, leakedOutput)}`);
  }
}

const resumePdf = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);
if (existsSync(resumePdf)) {
  try {
    const resumeText = execFileSync("pdftotext", [resumePdf, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    if (/first civic-data hackathon/i.test(resumeText) || /2014[\u2013-]2015/.test(resumeText)) {
      warn("Resume PDF contains stale CallNYC language and must be regenerated before cross-surface consistency is complete");
    }
  } catch {
    warn("Could not inspect resume PDF text for CallNYC consistency");
  }
}

warn("High-value claims outside the CallNYC pilot still need structured citation records");
warn("Homepage metrics and proof strips remain in the follow-up citation queue");

for (const message of warnings) console.warn(`Citation warning: ${message}`);

if (failures.length) {
  console.error("Citation check failed:");
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(
  `Citation check passed: ${sources.length} sources, ${claims.length} claims, ${citationNotes.length} notes, ${pageProjections.length} pages.`
);
