#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { urbanhermitClaimIds, urbanhermitSourceIds } from "../apps/www/src/data/knowledge-bank/urbanhermit-x-corpus.ts";
import { urbanhermitMissionSignalManifest } from "./lib/urbanhermit-mission-classifier.mjs";
import { collectUrbanhermitAggregateShapeFailures } from "./lib/urbanhermit-public-aggregate-schema.mjs";

const fixtureText = readFileSync("apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json", "utf8");
const fixture = JSON.parse(fixtureText);
const receipt = readFileSync("docs/knowledge-bank/intake/2026-07-15-urbanhermit-x-full-population.md", "utf8");
const projectNote = readFileSync("docs/knowledge-bank/projects/urbanhermit-public-record.md", "utf8");
const docs = `${receipt}\n${projectNote}`.replace(/\s+/g, " ");
const checks = [];

function check(dimension, label, points, passes) {
  checks.push({ dimension, label, points, passes: Boolean(passes) });
}

const population = fixture.populationReconciliation;
check("Population", "Live denominator is exactly reconciled", 18,
  fixture.account === "@urbanhermit" &&
  population.profileReportedPostCount === 434 &&
  population.recoveredUnionRecordCount === 434 &&
  population.recoveredPopulationReviewedPercent === 100 &&
  population.profileCountNotMaterialized === 0 &&
  population.postsTimelineUniqueCount === 421 &&
  population.repliesTimelineRenderedArticleCount === 436 &&
  population.repliesTimelineConversationContextCount === 2 &&
  Object.values(fixture.recordTypeCounts).reduce((a, b) => a + b, 0) === 434 &&
  Object.values(fixture.recordsByYear).reduce((a, b) => a + b, 0) === 434 &&
  docs.includes("100% of the live profile-counted population") &&
  docs.includes("not proof that no older record"));

check("Sources", "Authorship and posted-link accounting are explicit", 14,
  fixture.recordTypeCounts.original === 340 &&
  fixture.recordTypeCounts.reply === 13 &&
  fixture.recordTypeCounts.repost === 81 &&
  fixture.publishingPattern.accountAuthoredRecordCount === 353 &&
  fixture.publishingPattern.externalLinkOccurrences === 349 &&
  fixture.publishingPattern.distinctExternalShortUrls === 321 &&
  fixture.publishingPattern.accountAuthoredExternalLinkOccurrences === 292 &&
  fixture.publishingPattern.accountAuthoredDistinctExternalShortUrls === 277 &&
  docs.includes("not all 321 destinations have been resolved and close-read") &&
  docs.includes("does not establish Jamie's authorship"));

check("Classification", "Mission-signal rules and overlapping counts are reproducible", 12,
  JSON.stringify(fixture.missionSignalClassification.rules) === JSON.stringify(urbanhermitMissionSignalManifest) &&
  JSON.stringify(fixture.publishingPattern.missionSignalRecordCounts) === JSON.stringify({
    "community-platforms-and-gatherings": 35,
    "civic-participation-and-service": 8,
    "cultural-space-advocacy": 45,
    "public-history-place-and-waterways": 2,
    "creative-technology-and-media": 4,
    "neighborhood-mutual-aid": 1
  }) &&
  docs.includes("retrieval signals, not measures of labor") &&
  docs.includes("not words authored by Jamie"));

check("Stakeholders", "Incoming response is typed and bounded", 12,
  fixture.stakeholderInventory.recoveredPublicIncomingRecordCount === 26 &&
  fixture.stakeholderInventory.missionRelevantThirdPartyRecordCount === 15 &&
  fixture.stakeholderInventory.missionRelevantThirdPartyAccountCount === 9 &&
  fixture.stakeholderInventory.missionRelevantConversationContextCount === 2 &&
  fixture.stakeholderInventory.contextLimitedRecordCount === 9 &&
  Object.values(fixture.stakeholderInventory.stakeholderGroupCounts).reduce((a, b) => a + b, 0) === 15 &&
  docs.includes("not complete historical engagement") &&
  docs.includes("not an endorsement count"));

check("Traction", "Visible counters remain dated non-impact evidence", 10,
  fixture.visibleEngagementSnapshot.accountAuthoredRecordsWithAnyDisplayedInteraction === 85 &&
  Object.values(fixture.visibleEngagementSnapshot.accountAuthoredDisplayedInteractionTotals).reduce((a, b) => a + b, 0) === 243 &&
  docs.includes("243 interaction units, not 243 people") &&
  docs.includes("not unique people, reach, endorsement, conversion, attendance, or impact"));

const sourceIds = new Set(knowledgeBank.sources.map(({ id }) => id));
const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
check("Knowledge bank", "Selected sources and bounded claims are fully accessioned", 14,
  Object.values(urbanhermitSourceIds).every((id) => sourceIds.has(id)) &&
  Object.values(urbanhermitClaimIds).every((id) => claims.has(id)) &&
  Object.values(urbanhermitClaimIds).every((id) => claims.get(id).antiClaims.length >= 4 && claims.get(id).boundaries.length >= 3) &&
  claims.get(urbanhermitClaimIds.horseLords).boundaries.some((item) => item.includes("M.C. Schmidt")) &&
  claims.get(urbanhermitClaimIds.tunnel).antiClaims.some((item) => item.includes("restored or reopened")) &&
  claims.get(urbanhermitClaimIds.tires).antiClaims.some((item) => item.includes("alone ran")));

const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-URBANHERM-X-FULL-POPULATION-2026-07-15");
const candidates = knowledgeLifecycle.candidateClaims.filter(({ id }) => id.startsWith("CND-URBANHERM-"));
const decisions = knowledgeLifecycle.promotionDecisions.filter(({ id }) => id.startsWith("DEC-URBANHERM-"));
check("Lifecycle", "The corpus reaches atomic observations, governed bank promotion, media feedback, and an editorial brief", 12,
  task?.status === "completed" &&
  task.observationIds.length === 13 &&
  candidates.length === 4 && candidates.every(({ maturity }) => maturity === "promoted") &&
  decisions.length === 4 && decisions.every(({ decision, targetCanonicalClaimId, allowedSurfaces }) => decision === "promote" && targetCanonicalClaimId && allowedSurfaces.includes("research-brief")) &&
  knowledgeLifecycle.editorialBriefs.some(({ id, mediaLeadIds }) => id === "BRIEF-URBANHERM-RESERVE-PRACTICE" && mediaLeadIds.length === 3) &&
  knowledgeLifecycle.mediaLeads.filter(({ id }) => id.startsWith("MEDIA-URBANHERM-")).length === 3);

const serialized = JSON.stringify(fixture);
check("Privacy and composition", "The public artifact is aggregate-only and no website projection is created", 8,
  fixture.publicSafety.status === "public-safe-aggregate-only" &&
  collectUrbanhermitAggregateShapeFailures(fixture).length === 0 &&
  !serialized.includes("/Users/") && !serialized.includes("/Volumes/") &&
  Object.values(urbanhermitClaimIds).every((id) => claims.get(id).projections.every(({ status, surfaces }) => status === "hold" && surfaces.length === 0)) &&
  knowledgeBank.pages.every(({ surface }) => !["/proofs", "/knowledge-bank", "/urbanhermit"].includes(surface)) &&
  docs.includes("There is no `/proofs` or `/urbanhermit` page"));

const possible = checks.reduce((sum, item) => sum + item.points, 0);
const earned = checks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
const score = Math.round((earned / possible) * 100);
const failures = checks.filter(({ passes }) => !passes);

console.log(`Urbanhermit X corpus eval: ${score}/100 (criterion: 100)`);
for (const dimension of [...new Set(checks.map(({ dimension }) => dimension))]) {
  const group = checks.filter((item) => item.dimension === dimension);
  console.log(`- ${dimension}: ${group.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0)}/${group.reduce((sum, item) => sum + item.points, 0)}`);
}
for (const failure of failures) console.error(`- FAIL ${failure.dimension}: ${failure.label}`);
if (score !== 100 || failures.length) process.exit(1);
console.log("Urbanhermit X corpus criterion met.");
