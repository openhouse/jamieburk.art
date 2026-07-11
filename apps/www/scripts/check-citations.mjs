import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const dataDir = path.join(appRoot, "src", "data", "knowledge-bank");

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, relativePath), "utf8"));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(appRoot, relativePath), "utf8");
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function addIds(records, label, allIds) {
  const seen = new Set();

  for (const record of records) {
    if (!record.id) fail(`${label} record is missing an ID.`);
    if (seen.has(record.id)) fail(`Duplicate ${label} ID: ${record.id}`);
    if (allIds.has(record.id)) fail(`Knowledge-bank ID reused across record types: ${record.id}`);
    seen.add(record.id);
    allIds.add(record.id);
  }
}

function hasPrivatePath(value) {
  return /\/private\/tmp|\/Users\/|\/Volumes\/|raw-otter|transcripts-private|client-private|legal-review|archive-private/i.test(
    value
  );
}

function hasCredentialLikeText(value) {
  return /-----BEGIN [A-Z ]*PRIVATE KEY-----|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|password\s*[:=]|secret\s*[:=]/i.test(
    value
  );
}

function supportEntryKey(support) {
  return support.kind === "source"
    ? `source:${support.sourceId}`
    : `research-run:${support.researchRunId}`;
}

function slugifyPage(page) {
  const slug = page.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  return slug || "page";
}

const sources = readJson("sources.json");
const claims = readJson("claims.json");
const researchRuns = readJson("research-runs.json");
const corrections = readJson("corrections.json");
const projections = [readJson(path.join("projections", "callnyc.json"))];

const allIds = new Set();
addIds(sources, "source", allIds);
addIds(claims, "claim", allIds);
addIds(researchRuns, "research-run", allIds);
addIds(corrections, "correction", allIds);

const sourceById = new Map(sources.map((source) => [source.id, source]));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));
const researchRunById = new Map(researchRuns.map((run) => [run.id, run]));

for (const source of sources) {
  if (!source.publicCitation || hasPrivatePath(source.publicCitation)) {
    fail(`Source ${source.id} lacks safe publicCitation text.`);
  }

  if (source.accessStatus === "private") {
    const privateSourceText = [
      source.publisher,
      source.title,
      source.publicCitation,
      ...(source.caveats ?? [])
    ].join("\n");

    if (hasPrivatePath(privateSourceText)) {
      fail(`Private source ${source.id} contains a local/private filesystem path.`);
    }
  }

  const urls = [
    ...(source.originalUrl ? [{ url: source.originalUrl, label: "originalUrl" }] : []),
    ...source.archiveUrls.map((archiveUrl) => ({
      url: archiveUrl.url,
      label: `archiveUrl:${archiveUrl.relationship}`
    }))
  ];

  for (const { url, label } of urls) {
    if (!isHttpsUrl(url)) fail(`Source ${source.id} has a non-https or invalid ${label}.`);
  }

  if (source.accessStatus === "public" && !source.archiveUrls.length) {
    warn(`Source ${source.id} has no archive URL.`);
  }

  if (!source.lastChecked) warn(`Source ${source.id} is missing lastChecked.`);

  if (source.originalUrl?.includes("x.com/") || source.originalUrl?.includes("twitter.com/")) {
    warn(`Source ${source.id} uses a fragile social-media original URL.`);
  }
}

const supportRelationshipsThatCanVerify = new Set([
  "direct",
  "corroborating",
  "visible-text",
  "metadata"
]);

for (const claim of claims) {
  for (const support of claim.support) {
    if (support.kind === "source" && !sourceById.has(support.sourceId)) {
      fail(`Claim ${claim.id} points to unknown source ${support.sourceId}.`);
    }

    if (support.kind === "research-run" && !researchRunById.has(support.researchRunId)) {
      fail(`Claim ${claim.id} points to unknown research run ${support.researchRunId}.`);
    }
  }

  if (
    ["verified", "verified-attribution", "verified-visible-text"].includes(claim.status) &&
    !claim.support.some(
      (support) =>
        support.kind === "source" && supportRelationshipsThatCanVerify.has(support.relationship)
    )
  ) {
    fail(`Verified claim ${claim.id} has no direct, visible, metadata, or corroborating source.`);
  }

  if (
    claim.status === "supported-negative-search-finding" &&
    !claim.support.some((support) => support.kind === "research-run")
  ) {
    fail(`Negative-search claim ${claim.id} lacks a documented research run.`);
  }

  if (
    claim.status === "supported-negative-search-finding" &&
    /did not exist|never existed/i.test([claim.canonical, ...claim.prohibitedWording].join("\n"))
  ) {
    warn(`Negative-search claim ${claim.id} mentions existence limits; confirm wording stays careful.`);
  }

  const sourceSupports = claim.support
    .filter((support) => support.kind === "source")
    .map((support) => sourceById.get(support.sourceId))
    .filter(Boolean);

  if (
    sourceSupports.length > 0 &&
    sourceSupports.every((source) => source.sourceClass === "participant-archive")
  ) {
    warn(`Claim ${claim.id} relies only on participant-archive evidence.`);
  }
}

for (const researchRun of researchRuns) {
  if (!researchRun.publicCitation) {
    fail(`Research run ${researchRun.id} lacks safe publicCitation text.`);
  }

  if (!Object.keys(researchRun.counts ?? {}).length) {
    warn(`Research run ${researchRun.id} has no detailed counts.`);
  }
}

for (const correction of corrections) {
  if (correction.status === "required-before-production") {
    fail(`Correction ${correction.id} is still required before production.`);
  }
}

for (const projection of projections) {
  const pageSlug = slugifyPage(projection.page);
  const keys = new Set();
  const anchors = new Set();
  const referenceIds = new Set();
  const referenceByEntry = new Map();

  for (const citation of projection.citations) {
    if (keys.has(citation.key)) {
      fail(`Projection ${projection.page} repeats citation key ${citation.key}.`);
    }
    keys.add(citation.key);

    const claim = claimById.get(citation.claimId);
    if (!claim) {
      fail(`Projection ${projection.page} points to unknown claim ${citation.claimId}.`);
      continue;
    }

    if (claim.status === "superseded") {
      fail(`Projection ${projection.page} includes superseded claim ${claim.id}.`);
    }

    const anchorId = `cite-${pageSlug}-${citation.key}`;
    if (anchors.has(anchorId)) fail(`Projection ${projection.page} collides on anchor ${anchorId}.`);
    anchors.add(anchorId);

    for (const support of claim.support) {
      const entryKey = supportEntryKey(support);

      if (!referenceByEntry.has(entryKey)) {
        const referenceId = `ref-${pageSlug}-${support.kind}-${(support.sourceId ?? support.researchRunId).toLowerCase()}`;
        if (referenceIds.has(referenceId)) {
          fail(`Projection ${projection.page} collides on reference ${referenceId}.`);
        }
        referenceIds.add(referenceId);
        referenceByEntry.set(entryKey, referenceId);
      }

      if (support.kind === "source") {
        const source = sourceById.get(support.sourceId);
        if (source?.accessStatus === "private") {
          if (!source.publicCitation || hasPrivatePath(source.publicCitation)) {
            fail(`Projection ${projection.page} includes private source ${source.id} without safe public wording.`);
          }
        }
      }
    }
  }
}

const publicCallnycFiles = [
  "src/content/work/callnyc.mdx",
  "src/data/work.ts",
  "src/data/proofs.ts",
  "src/app/work/technical-operations/page.tsx"
];

const publicCallnycText = publicCallnycFiles
  .map((relativePath) => `\n--- ${relativePath} ---\n${readText(relativePath)}`)
  .join("\n");

const staleYearPatterns = [/2014-2015/, /2014\s*[–—]\s*2015/];
for (const pattern of staleYearPatterns) {
  if (pattern.test(publicCallnycText)) {
    fail(`Stale CallNYC year range remains in public source files: ${pattern}`);
  }
}

for (const prohibited of claims.flatMap((claim) => claim.prohibitedWording ?? [])) {
  if (prohibited && publicCallnycText.includes(prohibited)) {
    fail(`Prohibited wording remains in CallNYC public files: ${prohibited}`);
  }
}

const callnycSpecificBannedPhrases = [
  "New York City Council civic-data hackathon",
  "CallNYC was created at the hackathon",
  "Digital District was the event title",
  "the event started at 2:10 p.m.",
  "Civic Hall never had an event page"
];

for (const phrase of callnycSpecificBannedPhrases) {
  if (publicCallnycText.includes(phrase)) {
    fail(`CallNYC public file contains banned phrase: ${phrase}`);
  }
}

const knowledgeBankText = fs
  .readdirSync(dataDir, { recursive: true })
  .filter((fileName) => String(fileName).endsWith(".json"))
  .map((fileName) => fs.readFileSync(path.join(dataDir, String(fileName)), "utf8"))
  .join("\n");

if (hasPrivatePath(knowledgeBankText) || hasCredentialLikeText(knowledgeBankText)) {
  fail("Knowledge-bank JSON contains a private path, credential-like string, or forbidden private artifact marker.");
}

if (warnings.length) {
  for (const message of warnings) {
    console.warn(`warning: ${message}`);
  }
}

if (failures.length) {
  console.error("Citation check failed:");
  for (const message of failures) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log(
  `Citation check passed: ${sources.length} sources, ${claims.length} claims, ${researchRuns.length} research run, ${corrections.length} correction, ${projections.length} projection.`
);
