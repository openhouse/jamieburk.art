#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(root, "apps/www/src/data/knowledge-bank");
const failures = [];
const warnings = [];

const load = (name) => JSON.parse(readFileSync(path.join(dataRoot, name), "utf8"));
const sources = load("sources.json");
const assertions = load("assertions.json");
const evidence = load("evidence.json");
const researchRuns = load("research-runs.json");
const artifacts = load("artifacts.json");

const sourceMap = new Map(sources.map((item) => [item.id, item]));
const assertionMap = new Map(assertions.map((item) => [item.id, item]));
const evidenceMap = new Map(evidence.map((item) => [item.id, item]));
const blockedPolicies = new Set(["approval-required", "internal-only"]);
const publicStatuses = new Set(["supported", "supported-with-attribution", "use-with-care"]);

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function checkUnique(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (!record.id) fail(`${label} record has no ID`);
    if (seen.has(record.id)) fail(`Duplicate ${label} ID: ${record.id}`);
    seen.add(record.id);
  }
}

checkUnique(sources, "source");
checkUnique(assertions, "assertion");
checkUnique(evidence, "evidence");
checkUnique(researchRuns, "research-run");
checkUnique(artifacts, "artifact");

for (const source of sources) {
  for (const link of source.links ?? []) {
    try {
      const url = new URL(link.url);
      if (!new Set(["http:", "https:"]).has(url.protocol)) throw new Error("unsupported protocol");
    } catch {
      fail(`${source.id} contains malformed public link: ${link.url}`);
    }
  }

  const hasArchive = source.links?.some((link) => link.kind === "archive");
  const hasPreservationCaveat = [...(source.caveats ?? []), ...(source.limitations ?? [])].some(
    (text) => /archiv|preserv|capture|not recovered/i.test(text)
  );
  if ((source.availability === "archived" || source.stability === "fragile") && !hasArchive && !hasPreservationCaveat) {
    fail(`${source.id} is archived/fragile without an archive link or preservation caveat`);
  }
  if (source.availability === "live" && !hasArchive) {
    warn(`${source.id} is live without an archive link`);
  }
}

for (const relationship of evidence) {
  if (!sourceMap.has(relationship.sourceId)) {
    fail(`${relationship.id} references unknown source ${relationship.sourceId}`);
  }
  if (!assertionMap.has(relationship.assertionId)) {
    fail(`${relationship.id} references unknown assertion ${relationship.assertionId}`);
  }
  if (!relationship.locator) warn(`${relationship.id} has no locator`);
}

for (const run of researchRuns) {
  for (const sourceId of run.sourceIds ?? []) {
    if (!sourceMap.has(sourceId)) fail(`${run.id} references unknown source ${sourceId}`);
  }
}

for (const artifact of artifacts) {
  if (artifact.sourceId && !sourceMap.has(artifact.sourceId)) {
    fail(`${artifact.id} references unknown source ${artifact.sourceId}`);
  }
  for (const assertionId of artifact.supportsAssertionIds ?? []) {
    if (!assertionMap.has(assertionId)) {
      fail(`${artifact.id} references unknown assertion ${assertionId}`);
    }
  }
}

for (const assertion of assertions) {
  const relationships = evidence.filter((item) => item.assertionId === assertion.id);
  const publicEvidence = relationships.filter((item) => {
    const source = sourceMap.get(item.sourceId);
    return item.publicCitation && source && !blockedPolicies.has(source.publicCitationPolicy);
  });

  if (assertion.citationRequired && publicStatuses.has(assertion.status) && publicEvidence.length === 0) {
    fail(`${assertion.id} requires a citation but has no public evidence`);
  }
  if (publicEvidence.length > 0 && publicEvidence.every((item) => item.relation === "contextualizes")) {
    warn(`${assertion.id} has only contextual public support`);
  }
  if (
    publicEvidence.length === 1 &&
    publicEvidence[0].relation === "representative-only" &&
    /event|date|time|venue|attend/i.test(assertion.proposition)
  ) {
    fail(`${assertion.id} relies solely on representative evidence for an event-specific claim`);
  }
  if (assertion.status === "not-recovered") {
    const boundary = [...(assertion.antiClaims ?? []), ...(assertion.qualifications ?? [])].join(" ");
    if (!/never|does not prove|failure to recover|bounded/i.test(boundary)) {
      fail(`${assertion.id} does not preserve the boundary between not recovered and nonexistence`);
    }
  }
}

for (const source of sources) {
  const relationshipCount = evidence.filter((item) => item.sourceId === source.id).length;
  if (source.stability === "fragile" && relationshipCount > 3) {
    warn(`${source.id} is fragile and carries ${relationshipCount} evidence relationships`);
  }
  if (
    source.publicCitationPolicy === "cite-without-link" &&
    ![...(source.limitations ?? []), ...(source.caveats ?? [])].some((text) => /rights|review|permission/i.test(text))
  ) {
    warn(`${source.id} is citable without a link but has no rights-review note`);
  }
}

const manifestPath = path.join(root, "apps/www/src/content/work/callnyc.citations.ts");
const mdxPath = path.join(root, "apps/www/src/content/work/callnyc.mdx");
const manifestText = readFileSync(manifestPath, "utf8");
const mdxText = readFileSync(mdxPath, "utf8");
const manifestIds = [...manifestText.matchAll(/"(EVID-CALL-[A-Z0-9-]+)"/g)].map((match) => match[1]);
const citeTags = [...mdxText.matchAll(/<Cite\s+[\s\S]*?\/>/g)].map((match) => match[0]);
const renderedIds = citeTags.flatMap((tag) =>
  [...tag.matchAll(/"(EVID-CALL-[A-Z0-9-]+)"/g)].map((match) => match[1])
);

if (new Set(manifestIds).size !== manifestIds.length) fail("CallNYC citation manifest contains duplicate IDs");
for (const id of manifestIds) {
  const relationship = evidenceMap.get(id);
  if (!relationship) {
    fail(`CallNYC citation manifest references unknown evidence ${id}`);
    continue;
  }
  const source = sourceMap.get(relationship.sourceId);
  if (!relationship.publicCitation) fail(`CallNYC manifest projects non-public evidence ${id}`);
  if (source && blockedPolicies.has(source.publicCitationPolicy)) {
    fail(`CallNYC manifest projects ${source.publicCitationPolicy} source through ${id}`);
  }
  if (!renderedIds.includes(id)) fail(`CallNYC manifest includes unused evidence ${id}`);
}
for (const id of renderedIds) {
  if (!manifestIds.includes(id)) fail(`CallNYC MDX cites ${id}, which is absent from its manifest`);
}
const firstRenderedIds = renderedIds.filter((id, index) => renderedIds.indexOf(id) === index);
if (JSON.stringify(firstRenderedIds) !== JSON.stringify(manifestIds)) {
  fail("CallNYC citation manifest does not follow first appearance in the page");
}

const exactClaimAssertions = assertions.filter(
  (assertion) =>
    assertion.project === "CallNYC" &&
    assertion.citationRequired &&
    publicStatuses.has(assertion.status) &&
    /(2016|January|1-3|1–3|first|Council|Politico|official|data|repository)/i.test(
      `${assertion.proposition} ${assertion.publicWording ?? ""}`
    )
);
for (const assertion of exactClaimAssertions) {
  const renderedSupport = evidence.some(
    (item) => item.assertionId === assertion.id && renderedIds.includes(item.id)
  );
  if (!renderedSupport) fail(`${assertion.id} is rendered as an exact CallNYC claim without a <Cite>`);
}

const trackedKnowledgeText = [
  ...["sources.json", "assertions.json", "evidence.json", "research-runs.json", "artifacts.json"].map(loadName =>
    readFileSync(path.join(dataRoot, loadName), "utf8")
  ),
  manifestText,
  mdxText
].join("\n");
if (/\/private\/tmp\/|\/Users\/|\/Volumes\//.test(trackedKnowledgeText)) {
  fail("Tracked citation content contains a raw machine-local path");
}

if (!mdxText.includes("<References />")) fail("CallNYC MDX does not render <References />");
if (/Digital District/i.test(mdxText)) fail("CallNYC publicly renders Digital District before rights review");
if (/built during the hackathon|official Council product|first civic-data hackathon/i.test(mdxText)) {
  fail("CallNYC MDX contains a prohibited chronology or status claim");
}

if (warnings.length) {
  console.warn("Citation warnings:");
  warnings.forEach((message) => console.warn(`- ${message}`));
}
if (failures.length) {
  console.error("Citation check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`Citation check passed for ${sources.length} sources, ${assertions.length} assertions, ${evidence.length} evidence relationships, ${researchRuns.length} research run, and ${artifacts.length} artifacts${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`);
