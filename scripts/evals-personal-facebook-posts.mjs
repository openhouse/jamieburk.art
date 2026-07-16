#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import {
  personalFacebookPostClaimIds,
  personalFacebookPostSourceIds,
} from "../apps/www/src/data/knowledge-bank/personal-facebook-posts.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath = "apps/www/src/data/knowledge-bank/fixtures/personal-facebook-posts-full-population.json";
const manifestPath = "docs/knowledge-bank/corpora/personal-facebook-posts-full-population.manifest.json";
const reportPath = "docs/knowledge-bank/projects/personal-facebook-posts.md";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

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

function populationContract(value) {
  const population = value.populationReconciliation;
  const annualTotal = Object.values(value.recordsByYear).reduce((sum, count) => sum + count, 0);
  const visibilityTotal = ["Public", "Friends", "Only me", "Unlabeled in compact card"]
    .reduce((sum, label) => sum + value.visibilityLabelCounts[label], 0);
  return population.authoredPostCount === 1243 &&
    population.reviewedPostCount === 1243 &&
    population.reviewedPopulationPercent === 100 &&
    population.dateRange.earliest === "2006-12-19" &&
    population.dateRange.latest === "2022-06-12" &&
    population.terminalChecks === 2 &&
    population.terminalPostCount === 1243 &&
    population.terminalProgressIndicators === 0 &&
    annualTotal === 1243 &&
    visibilityTotal === 1243 &&
    population.boundary.includes("not a native account export");
}

function privacyContract(value) {
  return value.publicSafety.status === "public-safe-aggregate-only" &&
    value.visibilityLabelCounts.Public === 671 &&
    value.visibilityLabelCounts.Friends === 204 &&
    value.visibilityLabelCounts["Only me"] === 98 &&
    value.visibilityLabelCounts["Unlabeled in compact card"] === 270 &&
    value.visibilityLabelCounts.boundary.includes("unknown, not public") &&
    !collectKeys(value).some((key) => [
      "postId", "rawPostText", "rawBody", "commentText", "commenterIdentity",
      "reactionIdentities", "cookie", "session", "credential", "localPath",
    ].includes(key));
}

function tractionContract(value) {
  return value.tractionBoundary.reactionCountsRecovered === false &&
    value.tractionBoundary.commentCountsRecovered === false &&
    value.tractionBoundary.shareCountsRecovered === false &&
    value.tractionBoundary.incomingStakeholderIdentityAuditCompleted === false &&
    value.eventCardSocialContext.missionRelevantPostsWithRenderedAndNFriendsContext === 20 &&
    value.eventCardSocialContext.renderedRange.minimum === 6 &&
    value.eventCardSocialContext.renderedRange.maximum === 157 &&
    value.eventCardSocialContext.boundary.includes("not attendance") &&
    value.tractionBoundary.finding.includes("No full-population Facebook engagement total is claimed");
}

const fixtureText = read(fixturePath);
const fixture = JSON.parse(fixtureText);
const manifest = JSON.parse(read(manifestPath));
const report = read(reportPath).replace(/\s+/g, " ");
const readme = read("docs/knowledge-bank/README.md").replace(/\s+/g, " ");
const packageJson = JSON.parse(read("package.json"));
const receipts = read("docs/knowledge-bank/intake/receipts.jsonl");
const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const denominatorMutation = structuredClone(fixture);
denominatorMutation.populationReconciliation.reviewedPostCount = 1242;
const privacyMutation = structuredClone(fixture);
privacyMutation.visibilityLabelCounts.boundary = "Unlabeled cards are public.";
const tractionMutation = structuredClone(fixture);
tractionMutation.tractionBoundary.reactionCountsRecovered = true;

check(
  "Population accounting",
  "The capture-date denominator, terminal state, annual total, and visibility total reconcile and reject denominator drift",
  18,
  populationContract(fixture) &&
    !populationContract(denominatorMutation) &&
    fixture.availability.readableOrRendered === 1237 &&
    fixture.availability.sourceUnavailable === 6 &&
    includesAll(report, ["1,243 authored-post cards", "100% of the authored-post population exposed by that surface", "not a native owner export or an all-ever count"])
);

check(
  "Privacy and publication",
  "Only explicitly public cards contribute to content findings and no row-level personal record is published",
  14,
  privacyContract(fixture) &&
    !privacyContract(privacyMutation) &&
    includesAll(report, ["An absent label is unknown, not public", "Only the 671 explicitly Public cards", "item-level personal chronology", "remain outside the repository"]) &&
    !JSON.stringify(fixture).includes("/Users/") &&
    !JSON.stringify(fixture).includes("/Volumes/")
);

check(
  "Source routing",
  "External-route accounting and selected professional leads remain distinct from destination-level proof",
  12,
  fixture.postedUrlInventory.postsWithExternalUrls === 291 &&
    fixture.postedUrlInventory.externalUrlOccurrences === 470 &&
    fixture.postedUrlInventory.distinctExternalUrls === 363 &&
    fixture.postedUrlInventory.selectedProfessionalRoutes.length === 12 &&
    fixture.postedUrlInventory.selectedProfessionalRoutes.some(({ url }) => url === "https://talksnotraids.com/") &&
    fixture.postedUrlInventory.selectedProfessionalRoutes.some(({ url }) => url.includes("rollingstone.com/culture/videos/diy-music-nightlife")) &&
    includesAll(report, ["Not all 363 destinations have been resolved and close-read", "does not establish authorship of the destination, endorsement, readership, conversion, participation, or impact"])
);

const expectedPublicSignals = {
  "community-platforms-and-gatherings": 57,
  "cultural-space-advocacy": 36,
  "civic-participation-and-service": 38,
  "public-history-place-and-waterways": 12,
  "creative-technology-and-media": 4,
  "neighborhood-operations": 1,
  "public-events": 23,
};
check(
  "Mission retrieval",
  "Reproducible overlapping rules preserve project depth without becoming labor or impact measures",
  12,
  fixture.missionSignalInventory.rules.length === 7 &&
    Object.entries(expectedPublicSignals).every(([key, count]) => fixture.missionSignalInventory.overlappingRecordCounts[key].explicitlyPublic === count) &&
    fixture.missionSignalInventory.selectedProjectSignals.wowList.explicitlyPublic === 41 &&
    fixture.missionSignalInventory.selectedProjectSignals.nycArtistCoalition.explicitlyPublic === 26 &&
    fixture.missionSignalInventory.selectedProjectSignals.waterways.explicitlyPublic === 10 &&
    includesAll(report, ["overlapping retrieval signals, not measures of labor", "A zero result for another project name would not prove"])
);

const sourceIds = new Set(knowledgeBank.sources.map(({ id }) => id));
const populationClaim = knowledgeBank.claims.find(({ id }) => id === personalFacebookPostClaimIds.population);
const relayClaim = knowledgeBank.claims.find(({ id }) => id === personalFacebookPostClaimIds.civicRelay);
const selectedSourceIds = [
  personalFacebookPostSourceIds.wowListPractice,
  personalFacebookPostSourceIds.nycacMeeting,
  personalFacebookPostSourceIds.cabaretHearing,
  personalFacebookPostSourceIds.saveNycSpaces,
  personalFacebookPostSourceIds.nightMayor,
  personalFacebookPostSourceIds.kcTownHall,
  personalFacebookPostSourceIds.passSbjSA,
  personalFacebookPostSourceIds.talksNotRaids,
  personalFacebookPostSourceIds.waterways,
  personalFacebookPostSourceIds.nterChng,
];
const selectedSources = selectedSourceIds.map((id) => knowledgeBank.sources.find((source) => source.id === id));
const selectedObservations = selectedSourceIds.map((id) =>
  knowledgeLifecycle.observations.filter((observation) => observation.sourceId === id)
);
const sourceTask = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-FACEBOOK-JAMIE-POSTED-SOURCE-REVIEW");
check(
  "Civic relay claim",
  "Selected public specimens are close-read, atomically decomposed, and support a bounded cross-project relay practice",
  12,
    selectedSourceIds.every((id) => sourceIds.has(id)) &&
    selectedSources.every((source) => source?.reviewStatus === "close-read" && source.contentReviewedAt && source.contentReviewedBy) &&
    selectedObservations.every((observations) => observations.length === 1 && observations[0].locator.includes("Public post dated")) &&
    selectedSourceIds.every((id) => sourceTask?.sourceIds.includes(id)) &&
    selectedObservations.every(([observation]) => sourceTask?.observationIds.includes(observation.id)) &&
    populationClaim?.status === "confirmed-with-boundary" &&
    relayClaim?.status === "confirmed-with-boundary" &&
    selectedSourceIds.every((id) => relayClaim.evidence.some(({ sourceId }) => sourceId === id)) &&
    relayClaim.projections.every(({ status, surfaces }) => status === "hold" && surfaces.length === 0) &&
    relayClaim.antiClaims.includes("Posting proves policy causation") &&
    relayClaim.antiClaims.includes("Stakeholder references prove incoming engagement") &&
    includesAll(report, ["turning work into", "usable civic-cultural context", "Independent, official, institutional, or collaborator sources continue to govern"])
);

const stakeholderCounts = fixture.stakeholderReferenceInventory.explicitlyPublicPostCounts;
check(
  "Stakeholders and traction",
  "Outgoing references and event-card context are counted while incoming engagement remains explicitly unresolved",
  14,
  stakeholderCounts["New York City Council language"] === 17 &&
    stakeholderCounts["Office of Nightlife or nightlife-mayor language"] === 9 &&
    stakeholderCounts["NYC Artist Coalition language"] === 24 &&
    stakeholderCounts["Silent Barn"] === 4 &&
    stakeholderCounts["Market Hotel"] === 5 &&
    stakeholderCounts["Secret Project Robot"] === 7 &&
    tractionContract(fixture) &&
    !tractionContract(tractionMutation) &&
    includesAll(report, ["outgoing references, not incoming engagement", "makes no full-population Facebook engagement total", "does not claim zero engagement"])
);

const populationCandidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-FACEBOOK-JAMIE-AUTHORED-POST-POPULATION");
const relayCandidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-FACEBOOK-JAMIE-CIVIC-RELAY-PRACTICE");
const engagementCandidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-FACEBOOK-JAMIE-PERSONAL-ENGAGEMENT");
const mediaLead = knowledgeLifecycle.mediaLeads.find(({ id }) => id === "MEDIA-FACEBOOK-JAMIE-PERSONAL-COLLECTION");
check(
  "Knowledge lifecycle",
  "The population and relay claims are promoted, engagement and media remain held, and all three intake leads have receipts",
  12,
  populationCandidate?.maturity === "promoted" &&
    relayCandidate?.maturity === "promoted" &&
    engagementCandidate?.maturity === "held" &&
    mediaLead?.displayStatus === "hold" &&
    mediaLead?.contentReviewStatus === "not-authorized" &&
    knowledgeLifecycle.promotionDecisions.some(({ id, decision }) => id === "DEC-FACEBOOK-JAMIE-PERSONAL-ENGAGEMENT-HOLD" && decision === "hold") &&
    includesAll(receipts, ["LEAD-FACEBOOK-JAMIE-AUTHORED-POST-FULL-POPULATION", "LEAD-FACEBOOK-JAMIE-POSTED-PROFESSIONAL-URLS", "LEAD-FACEBOOK-JAMIE-PERSONAL-MEDIA-COLLECTION"])
);

const websiteCorpus = [read("apps/www/src/data/proofs.ts"), read("apps/www/src/data/work.ts")].join("\n");
check(
  "Integrity and composition",
  "The manifest binds the aggregate and the recursive suite keeps archive metrics off the current website",
  6,
  manifest.corpus === fixturePath &&
    manifest.corpusSha256 === sha256(fixtureText) &&
    manifest.corpusBytes === Buffer.byteLength(fixtureText) &&
    manifest.protectedRecordSetSha256 === fixture.populationReconciliation.protectedRecordSetSha256 &&
    manifest.privacy.aggregateOnly === true &&
    manifest.privacy.unlabeledCardsTreatedAsPublic === false &&
    !websiteCorpus.includes("1,243 authored-post") &&
    includesAll(report, ["does not need another metric or archive surface", "There is no `/proofs`, `/knowledge-bank`, or personal-Facebook archive page"]) &&
    readme.includes("personal Facebook authored-post pass") &&
    packageJson.scripts["evals:personal-facebook-posts"] === "node scripts/evals-personal-facebook-posts.mjs" &&
    packageJson.scripts.check.includes("npm run evals:personal-facebook-posts")
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter(({ passes }) => !passes);
const hardFailures = failures.filter(({ hard }) => hard);
const threshold = 100;

console.log(`Personal Facebook posts eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`);
for (const dimension of [...new Set(checks.map(({ dimension }) => dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("Personal Facebook posts gaps:");
  for (const item of failures) console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
}

if (score < threshold || hardFailures.length) process.exit(1);
console.log("Personal Facebook posts criterion met.");
