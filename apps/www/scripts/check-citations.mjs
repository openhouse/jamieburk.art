#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  claimRecords,
  evidenceNoteRecords,
  mediaEvidenceRecords,
  pageCitationSets,
  researchRunRecords,
  sourceRecords
} from "../src/data/knowledge-bank/index.ts";
import {
  runCitationContractTests,
  validateCitationGraph
} from "../src/lib/citation-validation.ts";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(appRoot, "../..");
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");
const graph = {
  sources: sourceRecords,
  claims: claimRecords,
  notes: evidenceNoteRecords,
  pages: pageCitationSets,
  researchRuns: researchRunRecords,
  media: mediaEvidenceRecords
};

const { failures, warnings } = validateCitationGraph(graph);
failures.push(...runCitationContractTests(graph));

const workSource = read("apps/www/src/data/work.ts");
const callNYCStart = workSource.indexOf('title: "CallNYC.org"');
const callNYCEnd = workSource.indexOf('title: "WOWList.org"');
const callNYCWorkBlock = workSource.slice(callNYCStart, callNYCEnd);
const callNYCPage = read("apps/www/src/content/work/callnyc.mdx");
const publicCallNYC = `${callNYCWorkBlock}\n${callNYCPage}`;

if (!/years:\s*"2016"/.test(callNYCWorkBlock)) {
  failures.push("CallNYC public year must be exactly 2016");
}
if (/2014\s*[-–]\s*2015/.test(publicCallNYC)) {
  failures.push("CallNYC still exposes the incorrect 2014-2015 year range");
}
if (/(?:is|was|as) (?:a )?recovered Civic Hall calendar listing/i.test(publicCallNYC)) {
  failures.push("CallNYC mislabels embedded-feed evidence as a recovered calendar listing");
}
if (/CallNYC (?:is|was) an official (?:New York City )?Council (?:product|service)/i.test(publicCallNYC)) {
  failures.push("CallNYC is described as an official Council service");
}
if (/(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|staging\.jamieburk\.art)/i.test(publicCallNYC)) {
  failures.push("CallNYC public output contains a private path or staging URL");
}

for (const requiredClaimId of [
  "callnyc.event.date-and-venue",
  "callnyc.event.time",
  "callnyc.event.branding",
  "callnyc.event.councilstat",
  "callnyc.event.constituent-services-purpose",
  "callnyc.event.digital-district",
  "callnyc.participation-and-follow-on",
  "callnyc.product-method",
  "callnyc.research.calendar-not-recovered"
]) {
  if (!claimRecords.some((claim) => claim.id === requiredClaimId)) {
    failures.push(`Required CallNYC claim is missing: ${requiredClaimId}`);
  }
}

for (const requiredNoteId of [
  "callnyc-event-date-time",
  "callnyc-event-branding-councilstat",
  "callnyc-participation-follow-on",
  "callnyc-product-method",
  "callnyc-digital-district-photo",
  "callnyc-calendar-search-limit"
]) {
  if (!evidenceNoteRecords.some((note) => note.id === requiredNoteId)) {
    failures.push(`Required CallNYC evidence note is missing: ${requiredNoteId}`);
  }
}

const callNYCSet = pageCitationSets.find((set) => set.pageId === "callnyc-case-study");
if (!callNYCSet) {
  failures.push("CallNYC citation manifest is missing");
} else {
  for (const reference of callNYCSet.references) {
    if (!publicCallNYC.includes(`"${reference.refId}"`)) {
      failures.push(`CallNYC citation occurrence is declared but not rendered: ${reference.refId}`);
    }
  }
}

const citeSource = read("apps/www/src/components/citations/Cite.tsx");
const referencesSource = read("apps/www/src/components/citations/References.tsx");
const componentBundle = `${citeSource}\n${referencesSource}`;
for (const requirement of [
  'role="doc-noteref"',
  'role="doc-endnotes"',
  "aria-label={`Citation",
  "referenceAnchorIds.map",
  ">References</h2>",
  "href={`#${reference.noteAnchorId}`}",
  "href={`#${anchorId}`}"
]) {
  if (!componentBundle.includes(requirement)) {
    failures.push(`Citation components are missing accessibility contract: ${requirement}`);
  }
}

const styles = read("apps/www/src/app/globals.css");
if (!/:focus-visible/.test(styles) || !/outline:/.test(styles)) {
  failures.push("Citation keyboard focus has no visible global focus treatment");
}
if (!/@media print/.test(styles) || !/attr\(href\)/.test(styles)) {
  failures.push("Citation print output does not preserve public URLs");
}

const mdxComponents = read("apps/www/mdx-components.tsx");
if (!/Cite, References/.test(mdxComponents)) {
  failures.push("Cite and References are not registered for MDX authoring");
}

const proofSource = read("apps/www/src/data/proofs.ts");
const callNYCProofStart = proofSource.indexOf('id: "callnyc-civic-data-guidance"');
const callNYCProofEnd = proofSource.indexOf('id: "fair-rent-campaign-memory"');
const callNYCProofBlock = proofSource.slice(callNYCProofStart, callNYCProofEnd);
for (const claimId of [
  "callnyc.event.date-and-venue",
  "callnyc.participation-and-follow-on",
  "callnyc.product-method"
]) {
  if (!callNYCProofBlock.includes(`"${claimId}"`)) {
    failures.push(`Existing proof registry is not linked to structured claim ${claimId}`);
  }
}

const forbiddenRepositoryBundle = [
  read("apps/www/src/data/knowledge-bank/sources.ts"),
  read("apps/www/src/data/knowledge-bank/research-runs.ts"),
  read("apps/www/src/data/knowledge-bank/media.ts"),
  read("docs/citational-care.md"),
  read("docs/research/callnyc-civic-hall-2016.md")
].join("\n");
if (/\/private\/tmp\/civic-hall-wayback-research|file:\/\/|\/Users\/|\/Volumes\//i.test(forbiddenRepositoryBundle)) {
  failures.push("Citational-care records or docs expose a forbidden research path");
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
  `Citation check passed: ${sourceRecords.length} sources, ${claimRecords.length} claims, ${evidenceNoteRecords.length} notes, ${pageCitationSets.length} page set.`
);
