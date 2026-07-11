#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  citationNoteRecords,
  claimRecords,
  pageCitationSets,
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
  notes: citationNoteRecords,
  pages: pageCitationSets
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
if (/\/(?:private|tmp|Users|Volumes)\//i.test(publicCallNYC)) {
  failures.push("CallNYC public output contains a private filesystem path");
}

const requiredAntiClaimFragments = [
  "organized, led, or officially represented",
  "Digital District was the event's official title",
  "2:10 p.m. was the event's start time",
  "caused the CouncilStat release",
  "official Council product",
  "commissioned",
  "Speaker Melissa Mark-Viverito attended",
  "simple measures of office quality",
  "measured improvements"
];
const antiClaims = claimRecords.flatMap((claim) => claim.antiClaims).join("\n");
for (const fragment of requiredAntiClaimFragments) {
  if (!antiClaims.includes(fragment)) failures.push(`CallNYC anti-claim is missing: ${fragment}`);
}

const citationComponentSource = [
  read("apps/www/src/components/citations/CitationRef.tsx"),
  read("apps/www/src/components/citations/CitationList.tsx")
].join("\n");
for (const requirement of [
  'role="doc-noteref"',
  'role="doc-endnotes"',
  "aria-label={`Citation",
  "referenceAnchorIds.map"
]) {
  if (!citationComponentSource.includes(requirement)) {
    failures.push(`Citation components are missing accessibility contract: ${requirement}`);
  }
}

const proofSource = read("apps/www/src/data/proofs.ts");
const proofIds = [...proofSource.matchAll(/\n\s+id:\s*"([^"]+)"/g)].map((match) => match[1]);
const structuredClaimIds = new Set(claimRecords.map((claim) => claim.id));
const pendingMigrations = proofIds.filter((id) => !structuredClaimIds.has(id));
if (pendingMigrations.length) {
  warnings.push(
    `${pendingMigrations.length} existing proof-bank claims do not yet have citational-care records; migration is intentionally deferred`
  );
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
  `Citation check passed: ${sourceRecords.length} sources, ${claimRecords.length} claims, ${citationNoteRecords.length} notes, ${pageCitationSets.length} page set.`
);
