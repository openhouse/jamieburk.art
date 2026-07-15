#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");
const corpusText = read("docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json");
const corpus = JSON.parse(corpusText);
const manifest = JSON.parse(read("docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.manifest.json"));
const rawCaptureText = read("docs/knowledge-bank/corpora/source-captures/nycartc-x-browser-extraction-2026-07-15-utc.json");
const receipt = read("docs/knowledge-bank/intake/2026-07-15-nycartc-x-full-population.md");
const caseStudy = read("apps/www/src/content/work/fair-rent-nyc.mdx");
const moduleSource = read("apps/www/src/data/knowledge-bank/nycartc-x-corpus.ts");
const normalizedReceipt = receipt.replace(/\s+/g, " ");

const checks = [];
const check = (dimension, label, points, passes, hard = true) =>
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
const includesAll = (source, values) => values.every((value) => source.includes(value));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const items = corpus.items;
const authored = items.filter((item) => item.kind === "authored");
const reposts = items.filter((item) => item.kind === "reposted");
const statusIds = items.map((item) => item.statusId);

check(
  "Population accounting",
  "Every profile-reported slot has a recovered-or-gap disposition",
  14,
  corpus.account === "@NYCArtC" &&
    corpus.population.profileReported === 5124 &&
    corpus.population.recoveredAccountItems === 3367 &&
    corpus.population.unrecoveredCountDifference === 1757 &&
    3367 + 1757 === 5124 &&
    items.length === 3367 &&
    new Set(statusIds).size === 3367 &&
    corpus.supplementalContexts.length === 19
);

check(
  "Population accounting",
  "Authored posts and reposts reconcile exactly without classifying the gap",
  10,
  authored.length === 696 &&
    reposts.length === 2671 &&
    authored.length + reposts.length === 3367 &&
    corpus.boundaries.some((value) => value.includes("no content or account-item type is inferred")) &&
    includesAll(normalizedReceipt, [
      "100% population accounting, not 100% item recovery",
      "gap is not described as deleted content"
    ])
);

const markerCounts = Object.fromEntries(
  corpus.campaignMarkers.map((marker) => [marker.id, marker.statusIds.length])
);
check(
  "Campaign continuity",
  "Four overlapping campaign traces reproduce from item-level status IDs",
  12,
  markerCounts["fair-rent-nyc"] === 195 &&
    markerCounts["save-nyc-spaces"] === 110 &&
    markerCounts["let-nyc-dance"] === 78 &&
    markerCounts["talks-not-raids"] === 54 &&
    corpus.campaignMarkers.every(
      (marker) => new Set(marker.statusIds).size === marker.statusIds.length
    )
);

const accountShortUrls = new Set(
  items.flatMap((item) => item.outgoingLinks.map((link) => link.shortUrl))
);
const unresolvedAccountLinks = items.flatMap((item) => item.outgoingLinks)
  .filter((link) => !link.resolvedDestination);
const authoredLinks = authored.flatMap((item) => item.outgoingLinks);
check(
  "Source circulation",
  "Recovered-account links are fully dispositioned and authored-link totals reproduce",
  12,
  accountShortUrls.size === 1235 &&
    unresolvedAccountLinks.length === 0 &&
    authored.filter((item) => item.outgoingLinks.length > 0).length === 446 &&
    authoredLinks.length === 529 &&
    new Set(authoredLinks.map((link) => link.shortUrl)).size === 287 &&
    corpus.linkInventory.allDistinctShortUrlsResolved === 1235
);

const nycCouncilPosts = authored.filter((item) =>
  item.visibleMentions.includes("@nyccouncil")
);
const nycCouncilOccurrences = authored.reduce(
  (sum, item) => sum + item.visibleMentions.filter((value) => value === "@nyccouncil").length,
  0
);
check(
  "Stakeholder boundary",
  "Council communication is reproduced and explicitly kept outbound",
  10,
  nycCouncilPosts.length === 109 &&
    nycCouncilOccurrences === 115 &&
    includesAll(normalizedReceipt, [
      "outbound communication findings",
      "not incoming Council engagement"
    ]) &&
    moduleSource.includes("109 Council members engaged with the coalition")
);

check(
  "Traction boundary",
  "Mutable counters are retained as a held observation rather than impact",
  8,
  corpus.heldObservations.status === "hold" &&
    corpus.heldObservations.authoredPostsWithVisibleInteraction === 630 &&
    JSON.stringify(corpus.heldObservations.visibleInteractionTotals) ===
      JSON.stringify({ replies: 112, reposts: 1527, likes: 2761, bookmarks: 64 }) &&
    includesAll(normalizedReceipt, [
      "held from accomplishment messaging",
      "volatile and incomplete",
      "not counted as coalition traction"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const lead = knowledgeLifecycle.leads.find(
  (item) => item.id === "LEAD-NYCAC-X-FULL-POPULATION"
);
const lifecycleObservationIds = new Set(
  knowledgeLifecycle.observations.map((observation) => observation.id)
);
check(
  "Lifecycle integration",
  "The corpus reaches intake, sources, atomic observations, bounded claims, research, and governance",
  12,
  lead?.sourceIds.includes("SRC-NAC-X-CORPUS-2026-07-15") &&
    lead.candidateClaimIds.length === 5 &&
    [
      "OBS-NYCAC-X-POPULATION-ACCOUNTING",
      "OBS-NYCAC-X-COMPOSITION",
      "OBS-NYCAC-X-CAMPAIGN-MARKERS",
      "OBS-NYCAC-X-SOURCE-CIRCULATION",
      "OBS-NYCAC-X-SOURCE-LEADS",
      "OBS-NYCAC-X-COUNCIL-OUTBOUND",
      "OBS-NYCAC-X-REPOST-SOURCE-PATTERN",
      "OBS-NYCAC-X-TRACTION-SNAPSHOT"
    ].every((id) => lifecycleObservationIds.has(id)) &&
    knowledgeLifecycle.candidateClaims.filter((candidate) =>
      candidate.id.startsWith("CND-NYCAC-X-")
    ).every((candidate) => candidate.maturity === "held") &&
    knowledgeLifecycle.promotionDecisions.filter((decision) =>
      decision.id.startsWith("DEC-NYCAC-X-")
    ).every((decision) => decision.decision === "hold") &&
    claimById.get("CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER")?.status ===
      "confirmed-with-boundary" &&
    inquiryById.get("INQ-NAC-X-FULL-POPULATION-2026")?.resultStatus ===
      "partially-recovered"
);

check(
  "Source positioning",
  "Mission sources are ingested as circulated context with explicit non-claims",
  8,
  sourceById.get("SRC-NAC-CITYLIMITS-RENT-COVID-2020")?.doesNotEstablish.includes("policy adoption") &&
    sourceById.get("SRC-NAC-GOTHAMIST-REPEAL-50A-2020")?.doesNotEstablish.includes("the coalition's causal role in repeal") &&
    sourceById.get("SRC-NAC-AMERICAN-THEATRE-LARK-2021")?.doesNotEstablish.includes("a single-cause account of the closure") &&
    sourceById.get("SRC-NAC-HELLGATE-SAINT-VITUS-2024")?.doesNotEstablish.includes("that the Saint Vitus action was a MARCH raid") &&
    sourceById.get("SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019")?.doesNotEstablish.includes("the article body's complete reporting")
);

check(
  "Reproducibility and privacy",
  "Hashes pin the sanitized capture and corpus while prohibited private surfaces stay excluded",
  8,
  sha256(rawCaptureText) === manifest.sourceCaptureSha256 &&
    sha256(corpusText) === manifest.corpusSha256 &&
    corpus.rawCaptureSha256 === manifest.sourceCaptureSha256 &&
    includesAll(corpus.boundaries.join(" "), [
      "No private messages",
      "Third-party repost text is omitted"
    ]) &&
    !/(cookie|password|bearer token|refresh token|localStorage|sessionStorage)/i.test(
      `${rawCaptureText}\n${corpusText}`
    )
);

check(
  "Projection discipline",
  "The site keeps its clearer bounded coalition projection while the deeper corpus remains held",
  6,
  includesAll(caseStudy, [
    'claimId="CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY"',
    'occurrenceId="shared-social-identity"'
  ]) &&
    !caseStudy.includes("CLM-NAC-X-") &&
    knowledgeBank.claims.filter((claim) => claim.id.startsWith("CLM-NAC-X-"))
      .every((claim) => claim.projections.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      )) &&
    knowledgeLifecycle.editorialBriefs.find((brief) =>
      brief.id === "BRIEF-NYCAC-X-FULL-POPULATION-DEPTH"
    )?.pageClaimExclusions?.length === 5 &&
    includesAll(normalizedReceipt, [
      "website is intentionally unchanged",
      "current bounded shared-identity and incoming Council-engagement language is clearer"
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
  `NYC Artist Coalition X corpus eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
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
  console.error("\nFailed checks:");
  for (const item of failures) console.error(`- ${item.label}`);
}

if (score < threshold || hardFailures.length) process.exit(1);
console.log("Criterion met.");
