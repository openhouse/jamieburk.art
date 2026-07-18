#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json";
const manifestPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.manifest.json";
const reportPath =
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function count(values) {
  return Object.fromEntries(
    [...values.reduce((result, value) => result.set(value, (result.get(value) ?? 0) + 1), new Map())]
      .sort(([left], [right]) => String(left).localeCompare(String(right)))
  );
}

const corpusText = read(corpusPath);
const corpus = JSON.parse(corpusText);
const manifest = JSON.parse(read(manifestPath));
const report = read(reportPath).replace(/\s+/g, " ");
const readme = read("docs/knowledge-bank/README.md").replace(/\s+/g, " ");
const packageJson = JSON.parse(read("package.json"));
const receipts = read("docs/knowledge-bank/intake/receipts.jsonl");

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const population = corpus.population;
const reconciliation = corpus.populationReconciliation;
const exportControl = corpus.ownerExportReconciliation;
const identityHashes = population.map((record) => record.reconciliationKeySha256);
const dates = population.map((record) => record.publishedAt);
const yearCounts = count(dates.map((date) => date.slice(0, 4)));
const corpusSha = createHash("sha256").update(corpusText).digest("hex");
const corpusBytes = Buffer.byteLength(corpusText);

check(
  "Population accounting",
  "Every row in every nonempty annual Published export has one unique public-safe disposition",
  20,
  reconciliation.annualOwnerExportRows === 444 &&
    reconciliation.annualOwnerExportUniquePostIds === 444 &&
    reconciliation.ledgerRows === 444 &&
    reconciliation.recoveredPublicationDates === 444 &&
    reconciliation.notRecovered === 0 &&
    population.length === 444 &&
    new Set(identityHashes).size === 444 &&
    JSON.stringify(yearCounts) ===
      JSON.stringify({ 2017: 185, 2018: 74, 2019: 111, 2020: 69, 2021: 5 }) &&
    dates.at(0) === "2021-09-15" &&
    dates.at(-1) === "2017-01-29" &&
    includesAll(report, [
      "100% accounting for the annual Published-export population",
      "not proof of every post ever created",
      "Deleted, hidden, private, unpublished, or no-longer-retained posts",
    ])
);

check(
  "Cross-surface reconciliation",
  "The feed traversal crosschecks the native denominator without inflating embedded render fragments",
  8,
  reconciliation.encounteredRenderRows === 598 &&
    reconciliation.excludedDuplicateOrEmbeddedRenderVariants === 154 &&
    reconciliation.exposedDistinctPosts === 444 &&
    corpus.method.terminalControl.consecutiveStableTerminalChecks === 7 &&
    corpus.method.terminalControl.reverifiedNoLoadingBoundary === true &&
    includesAll(report, [
      "598 encountered feed rows",
      "154 duplicate or embedded render variants",
      "endpoint identity, not height alone",
    ])
);

const forbiddenKeys = new Set([
  "postId",
  "pageId",
  "permalink",
  "rawBody",
  "rawCaption",
  "description",
  "commentText",
  "interactionIdentities",
  "followerIdentities",
  "cookie",
  "session",
  "credential",
]);

function collectKeys(value, output = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, output);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      output.push(key);
      collectKeys(item, output);
    }
  }
  return output;
}

const corpusKeys = collectKeys(corpus);
const serializedCorpus = JSON.stringify(corpus);

check(
  "Public safety",
  "The public corpus uses one-way identities and excludes raw posts, people, auth state, and sensitive routes",
  15,
  population.every(
    (record) =>
      record.bodyStored === false &&
      record.authorshipDisposition === "shared-account-human-author-unresolved" &&
      /^[a-f0-9]{64}$/.test(record.reconciliationKeySha256)
  ) &&
    corpus.publicationBoundary.rawBodiesStored === false &&
    corpus.publicationBoundary.commentTextStored === false &&
    corpus.publicationBoundary.interactionIdentitiesStored === false &&
    corpus.publicationBoundary.followerIdentitiesStored === false &&
    corpus.publicationBoundary.authenticatedUrlsStored === false &&
    corpus.publicationBoundary.nativePostIdsStored === false &&
    !corpusKeys.some((key) => forbiddenKeys.has(key)) &&
    !serializedCorpus.includes("/Users/") &&
    !serializedCorpus.includes("/Volumes/") &&
    corpus.postedUrlInventory.filter((route) => route.url === null).length === 2
);

check(
  "Manifest integrity",
  "The public-safe artifact manifest binds the exact corpus and denominator",
  7,
  manifest.corpus === corpusPath &&
    manifest.corpusSha256 === corpusSha &&
    manifest.corpusBytes === corpusBytes &&
    manifest.population.ownerExportRows === 444 &&
    manifest.population.ownerExportUniquePostIds === 444 &&
    manifest.population.publicLedgerRows === 444 &&
    manifest.privacy.rawOwnerExportsPublished === false &&
    manifest.privacy.postIdsPublished === false &&
    manifest.privacy.engagerIdentitiesPublished === false
);

check(
  "Content and source patterns",
  "Mission, civic-interface, and source-route totals reproduce from the governed corpus",
  12,
  corpus.missionSummary.tagCounts["cultural-space-survival-and-network"] === 191 &&
    corpus.missionSummary.tagCounts["cabaret-law-and-dance-freedom"] === 76 &&
    corpus.missionSummary.tagCounts["march-transparency-and-accountability"] === 65 &&
    corpus.missionSummary.tagCounts["commercial-rent-and-anti-displacement"] === 48 &&
    corpus.stakeholderSummary.tagCounts["artists-cultural-spaces-and-organizers"] === 256 &&
    corpus.stakeholderSummary.tagCounts["nyc-council-and-elected-officials"] === 66 &&
    corpus.stakeholderSummary.tagCounts["enforcement-and-regulatory-agencies"] === 66 &&
    corpus.postedUrlSummary.distinctExternalRoutes === 67 &&
    corpus.postedUrlSummary.publishedExactRoutes === 65 &&
    corpus.postedUrlSummary.withheldSensitiveRoutes === 2 &&
    corpus.postedUrlSummary.governedSourceRoutes === 9 &&
    corpus.postedUrlSummary.inventoryOnlyRoutes === 56
);

const knowledgeSourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
const governedRouteSourceIds = corpus.postedUrlInventory
  .map((route) => route.sourceId)
  .filter(Boolean);

check(
  "Source graph",
  "Every governed posted route points to a current canonical source record",
  8,
  governedRouteSourceIds.length === 9 &&
    new Set(governedRouteSourceIds).size === 9 &&
    governedRouteSourceIds.every((sourceId) => knowledgeSourceIds.has(sourceId)) &&
    [
      "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
      "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
      "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
    ].every((sourceId) => knowledgeSourceIds.has(sourceId))
);

check(
  "Traction boundaries",
  "The complete metric snapshot reproduces without becoming a unique-person or stakeholder claim",
  10,
  exportControl.metricSnapshot.rowsWithNonzeroInteractions === 375 &&
    exportControl.metricSnapshot.rowsWithNonzeroReach === 364 &&
    exportControl.metricSnapshot.reactions === 2589 &&
    exportControl.metricSnapshot.comments === 295 &&
    exportControl.metricSnapshot.shares === 552 &&
    exportControl.metricSnapshot.reactionCommentShareTotal === 3436 &&
    exportControl.metricSnapshot.summedPostReach === 48044 &&
    exportControl.metricSnapshot.totalClicks === 2190 &&
    includesAll(report, [
      "not 48,044 unique people",
      "None of the values identifies the stakeholder groups",
      "not a historical audience count",
    ])
);

const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const lifecycleLead = knowledgeLifecycle.leads.find(
  (lead) => lead.id === "LEAD-NYCAC-FACEBOOK-POST-FULL-POPULATION"
);
const observationIds = new Set([
  "OBS-NYCAC-FACEBOOK-OWNER-EXPORT-POPULATION",
  "OBS-NYCAC-FACEBOOK-FEED-RECONCILIATION",
  "OBS-NYCAC-FACEBOOK-MISSION-AND-CIVIC-PATTERNS",
  "OBS-NYCAC-FACEBOOK-POST-CORPUS-ROUTES",
  "OBS-NYCAC-FACEBOOK-PUBLISHED-SOURCE-CONTEXT",
  "OBS-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
  "OBS-NYCAC-FACEBOOK-AUTHORSHIP-BOUNDARY",
]);
const candidateIds = new Set([
  "CND-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
  "CND-NYCAC-FACEBOOK-CIVIC-RELAY",
  "CND-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT",
]);
const candidateEventIds = new Set([
  "EVT-NYCAC-FACEBOOK-OPERATING-RECORD-PROMOTED",
  "EVT-NYCAC-FACEBOOK-CIVIC-RELAY-PROMOTED",
  "EVT-NYCAC-FACEBOOK-METRICS-HELD",
]);
const taskIds = new Set([
  "TASK-NYCAC-FACEBOOK-HUMAN-AUTHORSHIP",
  "TASK-NYCAC-FACEBOOK-STAKEHOLDER-ENGAGEMENT",
  "TASK-NYCAC-FACEBOOK-SOURCE-PRESERVATION",
  "TASK-NYCAC-FACEBOOK-EXPORT-VERSIONING",
]);
const decisionIds = new Set([
  "DEC-NYCAC-FACEBOOK-OPERATING-RECORD-PROMOTE",
  "DEC-NYCAC-FACEBOOK-CIVIC-RELAY-PROMOTE",
  "DEC-NYCAC-FACEBOOK-METRICS-HOLD",
]);
const observations = knowledgeLifecycle.observations.filter((item) =>
  observationIds.has(item.id)
);
const candidates = knowledgeLifecycle.candidateClaims.filter((item) =>
  candidateIds.has(item.id)
);
const candidateEvents = knowledgeLifecycle.candidateEvents.filter((item) =>
  candidateEventIds.has(item.id)
);
const tasks = knowledgeLifecycle.researchTasks.filter((item) =>
  taskIds.has(item.id)
);
const decisions = knowledgeLifecycle.promotionDecisions.filter((item) =>
  decisionIds.has(item.id)
);

check(
  "Lifecycle integration",
  "The archival pass reaches receipt, lead, observations, candidates, tasks, decisions, canonical claims, and inquiry",
  12,
  receipts.includes('"id":"LEAD-NYCAC-FACEBOOK-POST-FULL-POPULATION"') &&
    lifecycleLead?.sourceIds.length === 6 &&
    lifecycleLead?.candidateClaimIds.length === 3 &&
    observations.length === 7 &&
    candidates.length === 3 &&
    candidateEvents.length === 3 &&
    tasks.length === 4 &&
    decisions.length === 3 &&
    candidates.filter((candidate) => candidate.maturity === "promoted").length === 2 &&
    candidates.filter((candidate) => candidate.maturity === "held").length === 1 &&
    decisions.filter((decision) => decision.decision === "promote").length === 2 &&
    decisions.filter((decision) => decision.decision === "hold").length === 1 &&
    claimById.get("CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD")?.status ===
      "confirmed-with-boundary" &&
    claimById.get("CLM-NYCAC-FACEBOOK-CIVIC-RELAY")?.status ===
      "confirmed-with-boundary" &&
    claimById.get("CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT")?.status ===
      "use-with-care" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-POST-POPULATION-2026")?.resultStatus ===
      "partially-recovered"
);

const websiteCorpus = [
  read("apps/www/src/data/proofs.ts"),
  read("apps/www/src/data/work.ts"),
  read("apps/www/src/content/work/fair-rent-nyc.mdx"),
].join("\n");

check(
  "Chad lens and composition",
  "The bank gains depth while fragile counts and unresolved authorship stay off the public portfolio",
  8,
  !websiteCorpus.includes("48,044") &&
    !websiteCorpus.includes("3,436") &&
    !websiteCorpus.includes("444 Facebook") &&
    !websiteCorpus.includes("1.5K followers") &&
    claimById
      .get("CLM-NYCAC-FACEBOOK-NATIVE-METRIC-SNAPSHOT")
      ?.projections.every((projection) => projection.status === "hold") &&
    includesAll(report, [
      "No website copy changes are warranted",
      "collective civic communications infrastructure",
      "does not support saying Jamie authored every post",
    ]) &&
    readme.includes("no website copy changes were made from this pass")
);

check(
  "Recursive execution",
  "The dedicated eval is part of the repository-wide recursive check",
  5,
  packageJson.scripts["evals:nycac-facebook-posts"] ===
    "node scripts/evals-nycac-facebook-posts.mjs" &&
    packageJson.scripts.check.includes("npm run evals:nycac-facebook-posts")
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
  `NYCAC Facebook posts eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("NYCAC Facebook posts gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("NYCAC Facebook posts criterion met.");
