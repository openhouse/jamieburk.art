#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const corpusText = read(
  "docs/knowledge-bank/corpora/callnyc-x-public-corpus.json"
);
const corpus = JSON.parse(corpusText);
const receipt = read(
  "docs/knowledge-bank/intake/2026-07-15-callnyc-x-full-population.md"
);
const projectNote = read("docs/knowledge-bank/projects/callnyc.md");
const caseStudy = read("apps/www/src/content/work/callnyc.mdx");
const workData = read("apps/www/src/data/work.ts");
const moduleSource = read(
  "apps/www/src/data/knowledge-bank/callnyc-x-corpus.ts"
);
const normalizedReceipt = receipt.replace(/\s+/g, " ");
const normalizedProjectNote = projectNote.replace(/\s+/g, " ");

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function validUrl(value, hostname) {
  try {
    const parsed = new URL(value);
    return !hostname || parsed.hostname.toLowerCase() === hostname;
  } catch {
    return false;
  }
}

function collectKeys(value, keys = []) {
  if (!value || typeof value !== "object") return keys;
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, keys);
    return keys;
  }
  for (const [key, item] of Object.entries(value)) {
    keys.push(key);
    collectKeys(item, keys);
  }
  return keys;
}

const records = corpus.records;
const statusIds = records.map((record) => record.statusId);
const authored = records.filter((record) => record.accountAction === "authored");
const reposted = records.filter((record) => record.accountAction === "reposted");
const searchOnly = records.filter(
  (record) => record.recoverySurface === "authenticated-latest-search"
);

check(
  "Population accounting",
  "Displayed, recovered, and residual counts reconcile exactly",
  10,
  corpus.account === "@CallNYCapp" &&
    corpus.populationAccounting.displayedByProfile === 110 &&
    corpus.populationAccounting.recoveredStatusRecords === 107 &&
    corpus.populationAccounting.unavailableResidual === 3 &&
    corpus.populationAccounting.accountedPopulation === 110 &&
    corpus.populationAccounting.recoveryRate === "97.3%" &&
    107 + 3 === 110
);

check(
  "Population accounting",
  "The corpus has 107 unique recovered status records",
  8,
  records.length === 107 &&
    new Set(statusIds).size === 107 &&
    statusIds.every((id) => /^\d+$/.test(id))
);

check(
  "Population accounting",
  "Authored posts, reposts, and the search-only recovery remain distinct",
  7,
  authored.length === 92 &&
    reposted.length === 15 &&
    authored.length + reposted.length === records.length &&
    searchOnly.length === 1 &&
    searchOnly[0]?.statusId === "722837286476390401"
);

check(
  "Record integrity",
  "Every record preserves stable public fields and nonnegative counters",
  8,
  records.every(
    (record) =>
      validUrl(record.statusUrl, "x.com") &&
      record.statusUrl.endsWith("/status/" + record.statusId) &&
      !Number.isNaN(Date.parse(record.publishedAt)) &&
      /^@[A-Za-z0-9_]+$/.test(record.authorHandle) &&
      ["authored", "reposted"].includes(record.accountAction) &&
      [
        "authenticated-profile",
        "authenticated-latest-search"
      ].includes(record.recoverySurface) &&
      typeof record.text === "string" &&
      Array.isArray(record.quotedText) &&
      Array.isArray(record.links) &&
      Array.isArray(record.mentions) &&
      Array.isArray(record.hashtags) &&
      ["replies", "reposts", "likes"].every((metric) =>
        Number.isInteger(record.publicMetrics?.[metric]) &&
        record.publicMetrics[metric] >= 0
      )
  )
);

const allKeys = collectKeys(corpus).map((key) => key.toLowerCase());
const forbiddenKeys = [
  "liked",
  "repostedbyviewer",
  "rawaccessibletext",
  "analyticsurl",
  "credentials",
  "cookies",
  "privatemessages",
  "audiencedata"
];

check(
  "Privacy boundary",
  "The public corpus excludes authenticated-user and private account state",
  8,
  forbiddenKeys.every((key) => !allKeys.includes(key)) &&
    includesAll(corpus.privacyBoundary, [
      "Authenticated-user interaction state",
      "credentials",
      "cookies",
      "private messages",
      "private audience data"
    ])
);

const links = records.flatMap((record) => record.links);
const uniqueLinks = new Map();
for (const link of links) {
  const existing = uniqueLinks.get(link.shortUrl);
  if (existing && existing.resolvedUrl !== link.resolvedUrl) {
    existing.conflict = true;
  } else if (!existing) {
    uniqueLinks.set(link.shortUrl, { ...link, conflict: false });
  }
}
const uniqueLinkRecords = [...uniqueLinks.values()];

check(
  "URL accounting",
  "Every short link has one valid and internally consistent destination",
  8,
  links.length === 98 &&
    uniqueLinks.size === 84 &&
    new Set(links.map((link) => link.resolvedUrl)).size === 76 &&
    links.every(
      (link) =>
        validUrl(link.shortUrl, "t.co") &&
        validUrl(link.resolvedUrl) &&
        ["redirect", "visible-label-inference"].includes(link.resolutionSource)
    ) &&
    uniqueLinkRecords.every((link) => !link.conflict)
);

check(
  "URL accounting",
  "Redirect and visible-label recovery account for all 84 unique short links",
  6,
  uniqueLinkRecords.filter((link) => link.resolutionSource === "redirect")
    .length === 82 &&
    uniqueLinkRecords.filter(
      (link) => link.resolutionSource === "visible-label-inference"
    ).length === 2
);

const recognitionPosts = authored.filter((record) =>
  /\b(?:provides|gives) the most\b/i.test(record.text)
);
const recognitionHandles = new Set(
  recognitionPosts.flatMap((record) => record.mentions)
);
const agencies = ["@NYCHA", "@NYCHousing"];
const contextHandles = new Set([
  "@CallNYCapp",
  "@NYCCouncil",
  ...agencies
]);
const councilHandles = [...recognitionHandles].filter(
  (handle) => !contextHandles.has(handle)
);

check(
  "Mission pattern",
  "The repeated issue-recognition system reaches 24 Council accounts and two agencies",
  10,
  recognitionPosts.length === 70 &&
    councilHandles.length === 24 &&
    agencies.every((handle) => recognitionHandles.has(handle))
);

function isCallnycLink(link) {
  try {
    return new URL(link.resolvedUrl).hostname.replace(/^www\./, "") ===
      "callnyc.org";
  } catch {
    return false;
  }
}

const callnycLinks = authored
  .flatMap((record) => record.links)
  .filter(isCallnycLink);
const serviceCategories = new Set(
  callnycLinks
    .map((link) => new URL(link.resolvedUrl).pathname.split("/").filter(Boolean)[0])
    .filter((segment) => segment && segment !== "api")
);

check(
  "Mission pattern",
  "Authored posts expose the measured breadth of resident pathways",
  9,
  callnycLinks.length === 83 &&
    new Set(callnycLinks.map((link) => link.resolvedUrl)).size === 63 &&
    serviceCategories.size === 16 &&
    authored.filter((record) =>
      record.mentions.some((handle) => handle.toLowerCase() === "@nyccouncil")
    ).length === 82
);

const publicMetricTotals = authored.reduce(
  (totals, record) => {
    totals.replies += record.publicMetrics.replies;
    totals.reposts += record.publicMetrics.reposts;
    totals.likes += record.publicMetrics.likes;
    if (Object.values(record.publicMetrics).some(Boolean)) totals.nonzero += 1;
    return totals;
  },
  { replies: 0, reposts: 0, likes: 0, nonzero: 0 }
);

check(
  "Traction boundary",
  "Dated counters reproduce without becoming unique-person or endorsement claims",
  7,
  publicMetricTotals.replies === 8 &&
    publicMetricTotals.reposts === 74 &&
    publicMetricTotals.likes === 111 &&
    publicMetricTotals.nonzero === 59 &&
    includesAll(normalizedReceipt, [
      "mutable counter events, not unique people",
      "sentiment, or endorsement"
    ])
);

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const corpusSourceIds = [
  "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
  "SRC-CALLNYC-X-LAUNCH-2016-03-05",
  "SRC-CALLNYC-X-JAMIE-IDENTIFICATION-2016-03-16",
  "SRC-CALLNYC-X-JSON-API-2016-04-20",
  "SRC-CALLNYC-X-POLITICO-CIRCULATION-2016-03-17",
  "SRC-CALLNYC-GIZMODO-311-2016-03-10",
  "SRC-CALLNYC-GOTHAMIST-PULASKI-2016-04-28"
];

check(
  "Lifecycle integration",
  "The full-population intake reaches sources, observations, claims, and inquiry",
  8,
  knowledgeBank.intakeItems.some(
    (item) =>
      item.id === "INTAKE-2026-07-15-CALLNYC-X-FULL-POPULATION" &&
      item.sourceIds.length === 7 &&
      item.observationIds.length === 8 &&
      item.claimIds.length === 2 &&
      item.researchInquiryIds.length === 1
  ) &&
    corpusSourceIds.every((id) => sourceById.has(id)) &&
    knowledgeBank.observations.filter((item) =>
      item.id.startsWith("OBS-CALLNYC-X-")
    ).length >= 8
);

const documentationClaim = claimById.get(
  "CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"
);
const corpusInquiry = inquiryById.get(
  "INQ-CALLNYC-X-FULL-POPULATION-2026"
);

check(
  "Lifecycle integration",
  "The projected claim and open inquiry retain the recovery and endorsement boundaries",
  7,
  documentationClaim?.status === "confirmed-with-boundary" &&
    documentationClaim.boundaries.some((value) =>
      value.includes("three unavailable residual posts")
    ) &&
    documentationClaim.antiClaims.includes(
      "Twenty-four Council members endorsed CallNYC."
    ) &&
    corpusInquiry?.resultStatus === "partially-recovered" &&
    corpusInquiry.limitations.some((value) =>
      value.includes("Three posts")
    )
);

check(
  "Source ecology",
  "Adjacent articles are ingested without being misrepresented as CallNYC coverage",
  5,
  sourceById.get("SRC-CALLNYC-GIZMODO-311-2016-03-10")
    ?.doesNotEstablish.includes("CallNYC coverage by Gizmodo") &&
    sourceById.get("SRC-CALLNYC-GOTHAMIST-PULASKI-2016-04-28")
      ?.doesNotEstablish.includes("CallNYC coverage by Gothamist") &&
    includesAll(normalizedReceipt, [
      "sources circulated by the timeline",
      "not articles about CallNYC"
    ])
);

check(
  "Projection discipline",
  "The case study projects one clear result while the archive keeps the full depth",
  9,
  includesAll(caseStudy, [
    'claimId="CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"',
    'occurrenceId="social-documentation-system"'
  ]) &&
    workData.includes(
      "Seventy recovered issue-recognition posts addressed 24 Council-member accounts and two city-agency accounts across 63 CallNYC destinations"
    ) &&
    includesAll(normalizedProjectNote, [
      "100% population accounting",
      "97.3% status-level recovery",
      "public JSON corpus"
    ]) &&
    includesAll(moduleSource, [
      "do not call 107 a complete export",
      "not unique people or identified stakeholder accounts"
    ])
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(
  "CallNYC X corpus eval: " +
    score +
    "/100 (criterion: >= " +
    threshold +
    ", no hard failures)"
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log("- " + dimension + ": " + earned + "/" + possible);
}

if (failures.length) {
  console.error("CallNYC X corpus gaps:");
  for (const item of failures) {
    console.error(
      "- " + (item.hard ? "HARD " : "") + item.dimension + ": " + item.label
    );
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("CallNYC X corpus criterion met.");
