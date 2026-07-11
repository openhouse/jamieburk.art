#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  allowedRelationships,
  dataRoot,
  indexById,
  loadCitationModel,
  readText,
  resolveProjection,
  validIdPattern,
  walkTextFiles
} from "./lib/citation-model.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function exists(relativePath) {
  return existsSync(path.join(repoRoot, relativePath));
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function assertIncludes(text, expected, label) {
  if (!text.includes(expected)) fail(`${label} is missing ${expected}`);
}

function validUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

for (const relativePath of [
  `${dataRoot}/schema.ts`,
  `${dataRoot}/sources.json`,
  `${dataRoot}/claims.json`,
  `${dataRoot}/evidence.json`,
  `${dataRoot}/research-runs.json`,
  `${dataRoot}/assets.json`,
  `${dataRoot}/corrections.json`,
  `${dataRoot}/projections/callnyc.json`,
  `${dataRoot}/projections/technical-operations.json`,
  "apps/www/src/components/citations/Cite.tsx",
  "apps/www/src/components/citations/References.tsx",
  "apps/www/src/lib/citations/resolve-citation-page.ts"
]) {
  if (!exists(relativePath)) fail(`${relativePath} is missing`);
}

const model = loadCitationModel(repoRoot);
const sourceIndex = indexById(model.sources, "source", failures);
const claimIndex = indexById(model.claims, "claim", failures);
const evidenceIndex = indexById(model.evidence, "evidence", failures);
const researchIndex = indexById(model.researchRuns, "research", failures);
const assetIndex = indexById(model.assets, "asset", failures);
const correctionIndex = indexById(model.corrections, "correction", failures);
const projectionIndex = indexById(model.projections, "page projection", failures);

const allIds = new Map();
for (const [label, records] of [
  ["source", model.sources],
  ["claim", model.claims],
  ["evidence", model.evidence],
  ["research", model.researchRuns],
  ["asset", model.assets],
  ["correction", model.corrections],
  ["page", model.projections]
]) {
  for (const record of records) {
    if (allIds.has(record.id)) fail(`global duplicate id: ${record.id}`);
    allIds.set(record.id, label);
  }
}

for (const source of model.sources) {
  for (const field of ["title", "shortCitation", "fullCitation", "publisher", "publicNote"]) {
    if (!source[field]) fail(`${source.id} is missing ${field}`);
  }
  for (const field of ["originalUrl", "archiveUrl"]) {
    if (source[field] && !validUrl(source[field])) fail(`${source.id} has malformed ${field}`);
  }
  if (source.preservation?.captureUrl && !validUrl(source.preservation.captureUrl)) {
    fail(`${source.id} has malformed preservation captureUrl`);
  }
  if (source.accessStatus === "private") {
    if (source.originalUrl || source.archiveUrl || source.preservation?.captureUrl) {
      fail(`${source.id} is private but exposes a public URL`);
    }
    if (source.publiclyLinkable) fail(`${source.id} is private but publiclyLinkable is true`);
  }
  if (!source.establishes?.length) fail(`${source.id} is missing establishes`);
  if (!source.doesNotEstablish?.length) fail(`${source.id} is missing doesNotEstablish`);
  if (/Wayback[^.]{0,80}event listing/i.test(source.publicNote)) {
    fail(`${source.id} describes a Wayback-preserved page as an event listing`);
  }
}

for (const claim of model.claims) {
  if (!validIdPattern.test(claim.id)) fail(`${claim.id} has an invalid claim id`);
  if (claim.publiclyUsable && claim.approval?.status !== "approved") {
    fail(`${claim.id} is publicly usable but not approved`);
  }
  if (claim.publiclyUsable && !model.evidence.some((evidence) => evidence.claimId === claim.id)) {
    fail(`${claim.id} is public but has no evidence relationship`);
  }
  if (claim.publiclyUsable && !claim.allowedSurfaces?.length) {
    fail(`${claim.id} is public but has no allowed surfaces`);
  }
  if (!claim.antiClaims?.length) fail(`${claim.id} is missing antiClaims`);
}

for (const evidence of model.evidence) {
  if (!claimIndex.has(evidence.claimId)) fail(`${evidence.id} references unknown claim ${evidence.claimId}`);
  if (!sourceIndex.has(evidence.sourceId) && !researchIndex.has(evidence.sourceId)) {
    fail(`${evidence.id} references unknown source/research record ${evidence.sourceId}`);
  }
  if (!allowedRelationships.has(evidence.relationship)) {
    fail(`${evidence.id} has unsupported relationship ${evidence.relationship}`);
  }
  if (evidence.publicCitation && !claimIndex.get(evidence.claimId)?.publiclyUsable) {
    fail(`${evidence.id} is public citation evidence for a non-public claim`);
  }
}

for (const research of model.researchRuns) {
  if (!research.findings?.length) fail(`${research.id} is missing findings`);
  if (!research.negativeFindings?.length) fail(`${research.id} is missing negativeFindings`);
  if (research.privateArtifacts?.storedInPublicRepo !== false) {
    fail(`${research.id} must state that private artifacts are not stored in the public repo`);
  }
}

const civicRun = researchIndex.get("research.civic-hall-wayback-cdx.2026-07");
if (!civicRun) {
  fail("research.civic-hall-wayback-cdx.2026-07 is missing");
} else {
  const expectedCounts = {
    deduplicated_html_captures: 4630,
    original_urls: 1240,
    distinct_event_url_keys: 296,
    successful_event_pages: 215,
    redirect_event_urls: 74,
    not_found_captures: 7
  };
  for (const [key, value] of Object.entries(expectedCounts)) {
    if (civicRun.counts?.[key] !== value) {
      fail(`${civicRun.id} count ${key} expected ${value}, found ${civicRun.counts?.[key]}`);
    }
  }
}

for (const asset of model.assets) {
  if (!sourceIndex.has(asset.sourceId)) fail(`${asset.id} references unknown source ${asset.sourceId}`);
  if (asset.rightsStatus !== "cleared" && asset.publicationStatus === "public" && !asset.publiclyLinkable) {
    fail(`${asset.id} is public without cleared rights or public linkability`);
  }
  if (asset.id.includes("digital-district")) {
    if (asset.publicationStatus !== "summary_only") fail(`${asset.id} must remain summary_only`);
    if (asset.rightsStatus !== "protected" || asset.consentStatus !== "protected") {
      fail(`${asset.id} must keep rights and consent protected`);
    }
  }
}

const correction = correctionIndex.get("correction.callnyc.project-year.2016");
if (!correction) {
  fail("correction.callnyc.project-year.2016 is missing");
} else {
  if (correction.surface !== "/work/callnyc") fail("CallNYC correction has wrong surface");
  if (correction.field !== "years") fail("CallNYC correction has wrong field");
  if (!/^2014[\u2013-]2015$/.test(correction.previousValue)) {
    fail("CallNYC correction previous value must be 2014-2015 or 2014-2015 with en dash");
  }
  if (correction.correctedValue !== "2016") fail("CallNYC correction must correct the year to 2016");
  if (correction.status !== "resolved") fail("CallNYC correction must be resolved");
}

const pageSourceByPath = new Map([
  ["/work/callnyc", "apps/www/src/content/work/callnyc.mdx"],
  ["/work/technical-operations", "apps/www/src/app/work/technical-operations/page.tsx"]
]);

const requiredProjectionTerms = new Map([
  [
    "claim.callnyc.hackathon.date-time-purpose",
    ["advertised event window", "not independently verified actual start and end times"]
  ],
  ["claim.callnyc.project.independent-follow-on", ["independent", "not an official"]],
  [
    "claim.callnyc.hackathon.digital-district-breakout",
    ["breakout/table", "camera timestamp", "not published"]
  ],
  ["claim.callnyc.project.data-limitations", ["not safely be treated as simple measures"]],
  ["claim.callnyc.research.no-dedicated-event-page-recovered", ["not proof of nonexistence"]]
]);

for (const projection of model.projections) {
  const contentPath = pageSourceByPath.get(projection.path);
  if (!contentPath) fail(`${projection.id} has no page source mapping for ${projection.path}`);
  if (contentPath && !exists(contentPath)) fail(`${contentPath} is missing for ${projection.id}`);

  const content = contentPath && exists(contentPath) ? read(contentPath) : "";
  let projectionPublicText = content;
  try {
    const resolved = resolveProjection(projection, model);
    projectionPublicText +=
      "\n" +
      resolved.references
        .map((reference) =>
          [
            reference.note,
            reference.source.publicNote,
            reference.source.establishes.join(" "),
            reference.source.doesNotEstablish.join(" "),
            reference.qualifierNotes.join(" ")
          ].join(" ")
        )
        .join("\n");
  } catch {
    // The resolver failure is reported below; keep collecting structural errors.
  }
  const occurrenceIds = new Set();
  for (const occurrence of projection.occurrences) {
    if (occurrenceIds.has(occurrence.occurrenceId)) {
      fail(`${projection.id} has duplicate occurrence ${occurrence.occurrenceId}`);
    }
    occurrenceIds.add(occurrence.occurrenceId);
    const claim = claimIndex.get(occurrence.claimId);
    if (!claim) {
      fail(`${projection.id} references unknown claim ${occurrence.claimId}`);
      continue;
    }
    if (!claim.publiclyUsable || claim.approval?.status !== "approved") {
      fail(`${projection.id} projects unapproved/protected claim ${claim.id}`);
    }
    if (!claim.allowedSurfaces.includes(projection.surface)) {
      fail(`${projection.id} projects ${claim.id} onto unauthorized surface ${projection.surface}`);
    }
    if (content && !content.includes(occurrence.occurrenceId)) {
      fail(`${contentPath} does not render occurrence ${occurrence.occurrenceId}`);
    }
  }

  for (const claimId of new Set(projection.occurrences.map((occurrence) => occurrence.claimId))) {
    for (const term of requiredProjectionTerms.get(claimId) ?? []) {
      if (projectionPublicText && !projectionPublicText.toLowerCase().includes(term.toLowerCase())) {
        fail(`${contentPath} projects ${claimId} without required qualifier term: ${term}`);
      }
    }
  }

  try {
    const resolved = resolveProjection(projection, model);
    const domIds = new Set();
    resolved.references.forEach((reference, index) => {
      if (reference.number !== index + 1) fail(`${projection.id} has non-sequential reference numbers`);
      const refId = `reference-${reference.number}`;
      if (domIds.has(refId)) fail(`${projection.id} has duplicate rendered DOM id ${refId}`);
      domIds.add(refId);
      for (const backlink of reference.backlinks) {
        if (domIds.has(backlink.anchorId)) {
          fail(`${projection.id} has duplicate rendered DOM id ${backlink.anchorId}`);
        }
        domIds.add(backlink.anchorId);
      }
    });
  } catch (error) {
    fail(`${projection.id} failed resolver: ${error.message}`);
  }
}

const citationDataFiles = walkTextFiles(repoRoot, dataRoot, new Set([".json", ".ts"]));
const citationDataText = citationDataFiles.map((file) => read(file)).join("\n");
if (/\b(citationNumber|referenceNumber|globalCitationNumber|globalReferenceNumber)\b/.test(citationDataText)) {
  fail("citation data stores global citation/reference numbers; numbering must be page-local");
}

const forbiddenPathMarkers = ["/pr" + "ivate/", "/tm" + "p/", "/Us" + "ers/", "/Vol" + "umes/"];
for (const marker of forbiddenPathMarkers) {
  if (citationDataText.includes(marker)) fail(`citation data exposes local/private path marker ${marker}`);
}

const callNycPublicFiles = [
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/proofs.ts",
  "docs/knowledge-bank/claims.md"
];
for (const file of callNycPublicFiles) {
  const text = exists(file) ? read(file) : "";
  if (/2014[\u2013-]2015/.test(text)) fail(`${file} still exposes old CallNYC project years`);
  if (/first civic-data hackathon/i.test(text)) fail(`${file} uses unsupported first civic-data hackathon wording`);
  if (/citation pending|press citation pending|public-safe screenshots pending/i.test(text)) {
    fail(`${file} contains pending citation/screenshot wording`);
  }
}

for (const routeDir of [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/public-claims"
]) {
  if (exists(routeDir)) fail(`${routeDir} must not exist as a public route`);
}

const citeSource = exists("apps/www/src/components/citations/Cite.tsx")
  ? read("apps/www/src/components/citations/Cite.tsx")
  : "";
const refsSource = exists("apps/www/src/components/citations/References.tsx")
  ? read("apps/www/src/components/citations/References.tsx")
  : "";
assertIncludes(citeSource, 'role="doc-noteref"', "Cite component");
assertIncludes(refsSource, 'role="doc-footnote"', "References component");
assertIncludes(refsSource, 'role="doc-backlink"', "References component");
if (/role=["']doc-endnote["']/.test(citeSource + refsSource)) {
  fail("citation components use deprecated doc-endnote role");
}

if (warnings.length) {
  console.warn("Citation check warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Citation check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Citation check passed: ${model.sources.length} sources, ${model.claims.length} claims, ${model.evidence.length} evidence relationships, ${model.projections.length} page projections.`
);
