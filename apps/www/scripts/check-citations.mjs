#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  claimRecords,
  correctionRecords,
  evidenceNoteRecords,
  mediaEvidenceRecords,
  pageCitationManifests,
  researchRunRecords,
  sourceRecords
} from "../src/data/knowledge-bank/index.ts";
import {
  validateCitationGraph,
  validateManifestAgainstMdx
} from "../src/lib/citation-validation.ts";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(appRoot, "../..");
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");
const graph = {
  sources: sourceRecords,
  claims: claimRecords,
  notes: evidenceNoteRecords,
  pages: pageCitationManifests,
  researchRuns: researchRunRecords,
  media: mediaEvidenceRecords,
  corrections: correctionRecords
};

const { failures, warnings } = validateCitationGraph(graph);
for (const manifest of pageCitationManifests) {
  const result = validateManifestAgainstMdx(manifest, read(manifest.mdxPath));
  failures.push(...result.failures);
  warnings.push(...result.warnings);
}

const workSource = read("apps/www/src/data/work.ts");
const callNYCStart = workSource.indexOf('title: "CallNYC.org"');
const callNYCEnd = workSource.indexOf('title: "WOWList.org"');
const callNYCWorkBlock = workSource.slice(callNYCStart, callNYCEnd);
const callNYCPage = read("apps/www/src/content/work/callnyc.mdx");
const publicCallNYC = `${callNYCWorkBlock}\n${callNYCPage}`;

if (!/years:\s*"2016"/.test(callNYCWorkBlock)) failures.push("CallNYC year must be 2016");
if (/2014\s*[-–]\s*2015/.test(publicCallNYC)) {
  failures.push("CallNYC still exposes the incorrect 2014-2015 chronology");
}
if (/(?:is|was|as) (?:a )?recovered Civic Hall calendar listing/i.test(publicCallNYC)) {
  failures.push("CallNYC mislabels the embedded-feed carrier as a calendar listing");
}
if (/Digital District (?:is|was) the (?:formal|official) title/i.test(publicCallNYC)) {
  failures.push("CallNYC misrepresents Digital District as the full event title");
}
const assertsNonexistence = publicCallNYC
  .split(/(?<=[.!?])\s+/)
  .some(
    (sentence) =>
      /never existed|no [^.]{1,120} ever existed/i.test(sentence) &&
      !/(?:not (?:a )?claim|does not (?:show|establish|prove|mean)|cannot conclude)/i.test(
        sentence
      )
  );
if (assertsNonexistence) {
  failures.push("CallNYC converts not recovered into never existed");
}
if (/(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|localhost|staging\.jamieburk\.art)/i.test(publicCallNYC)) {
  failures.push("CallNYC public output contains a private path or non-production URL");
}

for (const id of [
  "civic-hall-x-693124020917522433",
  "nyc-council-x-693509031768506368",
  "nyc-council-hackathon-promotional-graphic",
  "civic-hall-wayback-2016-01-31",
  "callnyc-digital-district-participant-photo",
  "civic-hall-cdx-research-run"
]) {
  if (!sourceRecords.some((source) => source.id === id)) failures.push(`Required source missing: ${id}`);
}

const citeSource = read("apps/www/src/components/citations/Cite.tsx");
const referencesSource = read("apps/www/src/components/citations/References.tsx");
const componentBundle = `${citeSource}\n${referencesSource}`;
for (const requirement of [
  'role="doc-noteref"',
  'role="doc-endnotes"',
  'role="doc-backlink"',
  "aria-label={`Citation",
  "referenceAnchorIds.map",
  ">References</h2>",
  "href={`#${occurrence.noteAnchorId}`}",
  "href={`#${anchorId}`}"
]) {
  if (!componentBundle.includes(requirement)) {
    failures.push(`Citation components are missing contract: ${requirement}`);
  }
}
if (/^["']use client["'];?/m.test(componentBundle)) {
  failures.push("Basic citation navigation must remain server-rendered without client JavaScript");
}

const styles = read("apps/www/src/app/globals.css");
if (!/:focus-visible/.test(styles) || !/outline:/.test(styles)) {
  failures.push("Citation keyboard focus has no visible treatment");
}
if (!/:target/.test(styles)) failures.push("Citation targets have no visible highlight");
if (!/@media print/.test(styles) || !/attr\(href\)/.test(styles)) {
  failures.push("Citation print output does not preserve public URLs");
}

const proofSource = read("apps/www/src/data/proofs.ts");
const proofStart = proofSource.indexOf('id: "callnyc-civic-data-guidance"');
const proofEnd = proofSource.indexOf('id: "fair-rent-campaign-memory"');
const proofBlock = proofSource.slice(proofStart, proofEnd);
for (const claimId of [
  "callnyc.event.date-and-venue",
  "callnyc.participation-and-follow-on",
  "callnyc.product-method"
]) {
  if (!proofBlock.includes(`"${claimId}"`)) {
    failures.push(`Existing proof registry is not linked to ${claimId}`);
  }
}

if (warnings.length) {
  console.warn("Citation warnings:");
  for (const warning of [...new Set(warnings)]) console.warn(`- ${warning}`);
}
if (failures.length) {
  console.error("Citation check failed:");
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Citation check passed: ${sourceRecords.length} sources, ${claimRecords.length} claims, ${evidenceNoteRecords.length} notes, ${pageCitationManifests.length} page, ${correctionRecords.length} correction.`
);
