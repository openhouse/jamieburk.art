import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { urbanhermitClaimIds, urbanhermitSourceIds } from "../../apps/www/src/data/knowledge-bank/urbanhermit-x-corpus.ts";
import { urbanhermitMissionSignalManifest } from "../lib/urbanhermit-mission-classifier.mjs";

const fixturePath = "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json";
const fixtureText = readFileSync(fixturePath, "utf8");
const fixture = JSON.parse(fixtureText);

test("Urbanhermit aggregate reconciles all 434 live profile-counted records", () => {
  const population = fixture.populationReconciliation;
  assert.equal(population.profileReportedPostCount, 434);
  assert.equal(population.recoveredUnionRecordCount, 434);
  assert.equal(population.recoveredPopulationReviewedPercent, 100);
  assert.equal(population.profileCountNotMaterialized, 0);
  assert.equal(population.postsTimelineUniqueCount, 421);
  assert.equal(population.repliesTimelineRenderedArticleCount, 436);
  assert.equal(population.repliesTimelineConversationContextCount, 2);
  assert.equal(population.repliesTimelinePrimaryRecordCount, 434);
  assert.match(population.protectedRecordSetSha256, /^[a-f0-9]{64}$/);
  assert.deepEqual(fixture.recordTypeCounts, { original: 340, reply: 13, repost: 81 });
  assert.equal(Object.values(fixture.recordTypeCounts).reduce((a, b) => a + b, 0), 434);
  assert.equal(Object.values(fixture.recordsByYear).reduce((a, b) => a + b, 0), 434);
});
test("Urbanhermit aggregate preserves link, mission, stakeholder, and counter arithmetic", () => {
  const pattern = fixture.publishingPattern;
  assert.equal(pattern.accountAuthoredRecordCount, 353);
  assert.equal(pattern.externalSourceNativeRepostRecordCount, 81);
  assert.equal(pattern.accountAuthoredRecordCount + pattern.externalSourceNativeRepostRecordCount, 434);
  assert.equal(pattern.externalLinkOccurrences, 349);
  assert.equal(pattern.distinctExternalShortUrls, 321);
  assert.equal(pattern.accountAuthoredExternalLinkOccurrences, 292);
  assert.equal(pattern.accountAuthoredDistinctExternalShortUrls, 277);
  assert.deepEqual(pattern.missionSignalRecordCounts, {
    "community-platforms-and-gatherings": 35,
    "civic-participation-and-service": 8,
    "cultural-space-advocacy": 45,
    "public-history-place-and-waterways": 2,
    "creative-technology-and-media": 4,
    "neighborhood-mutual-aid": 1
  });
  assert.deepEqual(fixture.missionSignalClassification.rules, urbanhermitMissionSignalManifest);

  const stakeholder = fixture.stakeholderInventory;
  assert.equal(stakeholder.recoveredPublicIncomingRecordCount, 26);
  assert.equal(stakeholder.missionRelevantThirdPartyRecordCount, 15);
  assert.equal(stakeholder.missionRelevantThirdPartyAccountCount, 9);
  assert.equal(stakeholder.missionRelevantConversationContextCount, 2);
  assert.equal(stakeholder.contextLimitedRecordCount, 9);
  assert.match(stakeholder.protectedIncomingRecordSetSha256, /^[a-f0-9]{64}$/);
  assert.match(stakeholder.boundary, /not a complete historical engagement archive/i);

  assert.equal(fixture.visibleEngagementSnapshot.accountAuthoredRecordsWithAnyDisplayedInteraction, 85);
  assert.deepEqual(fixture.visibleEngagementSnapshot.accountAuthoredDisplayedInteractionTotals, {
    likes: 175, replies: 8, reposts: 60, bookmarks: 0, views: 0
  });
  assert.match(fixture.visibleEngagementSnapshot.boundary, /not unique people, reach, endorsement, conversion, attendance, or impact/i);
});

test("Urbanhermit public artifact cannot reconstruct the personal timeline", () => {
  const forbiddenKeys = [];
  const walk = (value, path = "fixture") => {
    if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${path}[${index}]`));
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (/^(records|url|statusId|publishedAt|authorHandle|text|body|content|cookie|session|email|phone|localPath)$/i.test(key)) forbiddenKeys.push(`${path}.${key}`);
      walk(child, `${path}.${key}`);
    }
  };
  walk(fixture);

  assert.deepEqual(forbiddenKeys, []);
  assert.doesNotMatch(fixtureText, /https?:\/\/x\.com\/[^/\s]+\/status\//i);
  assert.doesNotMatch(fixtureText, /\/(?:Users|Volumes|private\/tmp)\//);
  assert.doesNotMatch(fixtureText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.equal(fixture.publicSafety.status, "public-safe-aggregate-only");
  assert.match(fixture.publicSafety.reason, /reconstruct personal history/i);
});

test("Urbanhermit sources, claims, and lifecycle decisions remain governed and held", () => {
  const sources = new Set(knowledgeBank.sources.map(({ id }) => id));
  const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  for (const sourceId of Object.values(urbanhermitSourceIds)) assert.ok(sources.has(sourceId), sourceId);
  for (const claimId of Object.values(urbanhermitClaimIds)) {
    const claim = claims.get(claimId);
    assert.ok(claim, claimId);
    assert.ok(claim.antiClaims.length >= 4);
    assert.ok(claim.boundaries.length >= 3);
    assert.ok(claim.projections.every(({ status, surfaces }) => status === "hold" && surfaces.length === 0));
  }
  assert.match(claims.get(urbanhermitClaimIds.horseLords).boundaries.join(" "), /credit M\.C\. Schmidt/i);
  assert.match(claims.get(urbanhermitClaimIds.tunnel).antiClaims.join(" "), /restored or reopened/i);
  assert.match(claims.get(urbanhermitClaimIds.tires).antiClaims.join(" "), /alone ran/i);

  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-URBANHERM-X-FULL-POPULATION-2026-07-15");
  assert.equal(task?.status, "completed");
  assert.equal(task?.observationIds.length, 8);
  const candidates = knowledgeLifecycle.candidateClaims.filter(({ id }) => id.startsWith("CND-URBANHERM-"));
  assert.equal(candidates.length, 4);
  assert.ok(candidates.every(({ maturity }) => maturity === "held"));
  const decisions = knowledgeLifecycle.promotionDecisions.filter(({ id }) => id.startsWith("DEC-URBANHERM-"));
  assert.equal(decisions.length, 4);
  assert.ok(decisions.every(({ decision }) => decision === "hold"));
  assert.ok(knowledgeBank.pages.every(({ surface }) => !["/proofs", "/knowledge-bank", "/urbanhermit"].includes(surface)));
});
