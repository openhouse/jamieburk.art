#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  citationRecords,
  claimRecords,
  getPageCitationEntries,
  getPublicSourceLinks,
  pageCitationPlans,
  researchRuns,
  sourceRecords
} from "./index.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const failures: string[] = [];
const warnings: string[] = [];
const restrictedPattern =
  /(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|Mobile Documents|supporting-materials|raw transcript|otter\.ai|\.docx|\.xlsx)/i;
const manualCitationPattern = /\[(?:[1-9]|[1-9][0-9])\]/;

function read(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function duplicateValues(values: string[]) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function fail(message: string) {
  failures.push(message);
}

function warn(message: string) {
  warnings.push(message);
}

const idsByKind = {
  source: sourceRecords.map((source) => source.id),
  claim: claimRecords.map((claim) => claim.id),
  citation: citationRecords.map((citation) => citation.id),
  researchRun: researchRuns.map((run) => run.id),
  pagePlan: pageCitationPlans.map((plan) => plan.pageId)
};

for (const [kind, ids] of Object.entries(idsByKind)) {
  const duplicates = duplicateValues(ids);
  if (duplicates.length) fail(`Duplicate ${kind} IDs: ${duplicates.join(", ")}`);
}

const sourceIds = new Set(idsByKind.source);
const claimIds = new Set(idsByKind.claim);
const citationIds = new Set(idsByKind.citation);
const pageIds = new Set(idsByKind.pagePlan);

for (const source of sourceRecords) {
  const publicBundle = JSON.stringify(source);

  if (restrictedPattern.test(publicBundle)) {
    fail(`${source.id} exposes a private path or restricted source marker`);
  }

  if (manualCitationPattern.test(publicBundle)) {
    fail(`${source.id} contains a manual citation number`);
  }

  if (source.publicLinkable && !source.url && !source.archiveUrl) {
    fail(`${source.id} is publicLinkable without a public URL`);
  }

  if (source.access === "private" && (source.url || source.archiveUrl || source.originalUrl)) {
    fail(`${source.id} is private but exposes a URL`);
  }

  if (!source.publicLinkable && getPublicSourceLinks(source).length) {
    fail(`${source.id} produces links despite publicLinkable=false`);
  }

  if (source.linkStatus === "unchecked") {
    warn(`${source.id} needs manual link verification`);
  }
}

for (const claim of claimRecords) {
  const publicBundle = JSON.stringify({
    publicText: claim.publicText,
    guardrail: claim.guardrail,
    antiClaims: claim.antiClaims
  });

  if (restrictedPattern.test(publicBundle)) {
    fail(`${claim.id} exposes a private path or restricted source marker`);
  }

  if (manualCitationPattern.test(publicBundle)) {
    fail(`${claim.id} contains a manual citation number`);
  }

  for (const evidence of claim.evidence) {
    if (!sourceIds.has(evidence.sourceId)) {
      fail(`${claim.id} references unknown source ${evidence.sourceId}`);
    }
  }

  for (const surface of claim.publicSurfaces) {
    if (!pageIds.has(surface)) fail(`${claim.id} declares unknown public surface ${surface}`);
  }

  if (claim.status !== "approved" && claim.publicSurfaces.length) {
    fail(`${claim.id} is ${claim.status} but appears on public surfaces`);
  }

  if (claim.mustCite) {
    const notesForClaim = citationRecords.filter((citation) =>
      citation.claimIds.includes(claim.id)
    );
    if (!notesForClaim.length) fail(`${claim.id} must be cited but has no citation record`);
  }
}

for (const citation of citationRecords) {
  const publicBundle = JSON.stringify(citation);

  if (restrictedPattern.test(publicBundle)) {
    fail(`${citation.id} exposes a private path or restricted source marker`);
  }

  if (manualCitationPattern.test(publicBundle)) {
    fail(`${citation.id} contains a manual citation number`);
  }

  for (const claimId of citation.claimIds) {
    if (!claimIds.has(claimId)) fail(`${citation.id} references unknown claim ${claimId}`);
  }
  for (const sourceId of citation.sourceIds) {
    if (!sourceIds.has(sourceId)) fail(`${citation.id} references unknown source ${sourceId}`);
  }
}

for (const run of researchRuns) {
  const publicBundle = JSON.stringify(run);
  if (restrictedPattern.test(publicBundle)) {
    fail(`${run.id} exposes a private path or restricted source marker`);
  }

  for (const sourceId of run.sourcesConsulted) {
    if (!sourceIds.has(sourceId)) fail(`${run.id} references unknown source ${sourceId}`);
  }
}

for (const plan of pageCitationPlans) {
  const duplicates = duplicateValues(plan.citationIds);
  if (duplicates.length) fail(`${plan.pageId} has duplicate citation IDs: ${duplicates.join(", ")}`);

  for (const citationId of plan.citationIds) {
    if (!citationIds.has(citationId)) fail(`${plan.pageId} references unknown citation ${citationId}`);
  }

  const numbers = getPageCitationEntries(plan.pageId).map((entry) => entry.number);
  const expected = plan.citationIds.map((_, index) => index + 1);
  if (numbers.join(",") !== expected.join(",")) {
    fail(`${plan.pageId} citation numbering does not follow the page plan`);
  }
}

const requiredAntiClaimFragments = [
  "organized, led, or officially represented",
  "Digital District was the event's official title",
  "2:10 p.m. was the event's start time",
  "Jamie caused the CouncilStat release",
  "official Council product",
  "Speaker Melissa Mark-Viverito attended",
  "CouncilStat counts were simple measures of office quality",
  "CallNYC measured improvements"
];
const antiClaimText = claimRecords.flatMap((claim) => claim.antiClaims).join("\n");
for (const fragment of requiredAntiClaimFragments) {
  if (!antiClaimText.includes(fragment)) fail(`Missing CallNYC anti-claim: ${fragment}`);
}

const callNYCPage = read("apps/www/src/content/work/callnyc.mdx");
const workData = read("apps/www/src/data/work.ts");
const callNYCStart = workData.indexOf('title: "CallNYC.org"');
const callNYCEnd = workData.indexOf('title: "WOWList.org"', callNYCStart);
const callNYCWorkBlock = workData.slice(callNYCStart, callNYCEnd);
const publicCallNYC = `${callNYCWorkBlock}\n${callNYCPage}`;
const callNYCPlan = pageCitationPlans.find((plan) => plan.pageId === "work.callnyc");
const citeTags = [...callNYCPage.matchAll(/<Cite\s+[\s\S]*?\/>/g)].map((match) => match[0]);
const usedCitationIds = citeTags
  .map((tag) => /citationId="([^"]+)"/.exec(tag)?.[1])
  .filter(Boolean) as string[];

if (!callNYCPlan) fail("CallNYC page citation plan is missing");
if (!/years:\s*"2016"/.test(callNYCWorkBlock)) {
  fail("CallNYC work metadata must use years: \"2016\"");
}
if (/2014\s*[-–]\s*2015/.test(publicCallNYC)) {
  fail("CallNYC public copy still exposes the incorrect 2014-2015 year range");
}
if (manualCitationPattern.test(callNYCPage)) {
  fail("CallNYC MDX contains manual citation numbers; use <Cite> components");
}
if (restrictedPattern.test(publicCallNYC)) {
  fail("CallNYC public copy contains a private path or restricted source marker");
}
if (/CallNYC (?:is|was) an official (?:New York City )?Council (?:service|product)/i.test(publicCallNYC)) {
  fail("CallNYC is described as an official Council service or product");
}

if (callNYCPlan) {
  for (const citationId of callNYCPlan.citationIds) {
    if (!usedCitationIds.includes(citationId)) {
      fail(`CallNYC MDX does not render planned citation ${citationId}`);
    }
  }
}

for (const citationId of usedCitationIds) {
  if (!citationIds.has(citationId)) fail(`CallNYC MDX uses unknown citation ${citationId}`);
}

for (const filePath of [
  "apps/www/src/components/citations/Cite.tsx",
  "apps/www/src/components/citations/ReferenceList.tsx"
]) {
  if (!existsSync(path.join(repoRoot, filePath))) fail(`${filePath} is missing`);
}

const componentSource = [
  read("apps/www/src/components/citations/Cite.tsx"),
  read("apps/www/src/components/citations/ReferenceList.tsx")
].join("\n");
for (const requirement of ['role="doc-noteref"', 'role="doc-endnotes"', "aria-label"]) {
  if (!componentSource.includes(requirement)) {
    fail(`Citation components are missing accessibility contract: ${requirement}`);
  }
}

if (!existsSync(path.join(repoRoot, "docs/citational-care.md"))) {
  fail("docs/citational-care.md is missing");
}

if (!read("AGENTS.md").includes("Citational Care")) {
  fail("AGENTS.md is missing Citational Care guidance");
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
  `Citation check passed: ${sourceRecords.length} sources, ${claimRecords.length} claims, ${citationRecords.length} citations, ${pageCitationPlans.length} page plan.`
);
