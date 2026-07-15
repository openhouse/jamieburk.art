import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  urbanhermitClaimIds,
  urbanhermitReviewSummary,
  urbanhermitSourceIds
} from "../../apps/www/src/data/knowledge-bank/urbanhermit.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import { urbanhermitMissionSignalRules } from "../lib/urbanhermit-mission-classifier.mjs";

const fixturePath = "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json";
const fixtureText = readFileSync(fixturePath, "utf8");
const fixture = JSON.parse(fixtureText);

test("Urbanhermit aggregate reconciles all 434 live profile-counted records", () => {
  const reconciliation = fixture.populationReconciliation;
  assert.equal(reconciliation.profileReportedPostCount, 434);
  assert.equal(reconciliation.recoveredUnionRecordCount, 434);
  assert.equal(reconciliation.recoveredPopulationReviewedPercent, 100);
  assert.equal(reconciliation.profileCountNotMaterialized, 0);
  assert.equal(reconciliation.postsTimelineUniqueCount, 421);
  assert.equal(reconciliation.repliesTimelineRenderedArticleCount, 436);
  assert.equal(reconciliation.repliesTimelineConversationContextCount, 2);
  assert.match(reconciliation.protectedRecordSetSha256, /^[a-f0-9]{64}$/);

  assert.deepEqual(fixture.recordTypeCounts, {
    original: 340,
    reply: 13,
    repost: 81
  });
  assert.equal(Object.values(fixture.recordTypeCounts).reduce((a, b) => a + b, 0), 434);
  assert.equal(Object.values(fixture.recordsByYear).reduce((a, b) => a + b, 0), 434);
});

test("Urbanhermit aggregate preserves link and mission-signal arithmetic", () => {
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

  const ruleManifest = urbanhermitMissionSignalRules.map((rule) => ({
    signalId: rule.id,
    pattern: rule.pattern.source,
    flags: rule.pattern.flags
  }));
  assert.deepEqual(ruleManifest, fixture.missionSignalClassification.rules);
  assert.match(fixture.missionSignalClassification.boundary, /protected capture/i);
});

test("Urbanhermit interaction and stakeholder aggregates remain bounded", () => {
  assert.equal(
    fixture.visibleEngagementSnapshot.accountAuthoredRecordsWithAnyDisplayedInteraction,
    85
  );
  assert.deepEqual(
    fixture.visibleEngagementSnapshot.accountAuthoredDisplayedInteractionTotals,
    { likes: 175, replies: 8, reposts: 60, bookmarks: 0, views: 0 }
  );
  assert.match(
    fixture.visibleEngagementSnapshot.boundary,
    /not unique people, reach, endorsement, conversion, attendance, or impact/i
  );

  const stakeholder = fixture.stakeholderInventory;
  assert.equal(stakeholder.recoveredPublicIncomingRecordCount, 26);
  assert.equal(stakeholder.missionRelevantThirdPartyRecordCount, 15);
  assert.equal(stakeholder.missionRelevantThirdPartyAccountCount, 9);
  assert.equal(stakeholder.missionRelevantConversationContextCount, 2);
  assert.equal(stakeholder.contextLimitedRecordCount, 9);
  assert.match(stakeholder.protectedIncomingRecordSetSha256, /^[a-f0-9]{64}$/);
  assert.match(stakeholder.boundary, /not a complete historical engagement archive/i);
});

test("Urbanhermit public artifact does not become a personal item-level index", () => {
  const forbiddenKeys = [];
  const walk = (value, path = "fixture") => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (/^(records|url|statusId|publishedAt|authorHandle|text|body|content|cookie|session|email|phone|localPath)$/i.test(key)) {
        forbiddenKeys.push(`${path}.${key}`);
      }
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

test("Urbanhermit claim-specific sources and anti-claims are governed", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  for (const sourceId of Object.values(urbanhermitSourceIds)) {
    assert.ok(sourceIds.has(sourceId));
  }
  for (const claimId of Object.values(urbanhermitClaimIds)) {
    assert.ok(claims.has(claimId));
    assert.ok(claims.get(claimId).antiClaims.length >= 4);
    assert.ok(claims.get(claimId).boundaries.length >= 3);
  }
  assert.match(
    claims.get(urbanhermitClaimIds.horseLords).boundaries.join(" "),
    /credit M\.C\. Schmidt/i
  );
  assert.match(
    claims.get(urbanhermitClaimIds.tunnel).antiClaims.join(" "),
    /restored or reopened/i
  );
  assert.match(
    claims.get(urbanhermitClaimIds.tires).antiClaims.join(" "),
    /alone ran/i
  );
});

test("Urbanhermit findings are governed knowledge, not a public website route", () => {
  const intake = knowledgeBank.intakeItems.find((item) =>
    item.id === "INTAKE-URBANHERM-X-FULL-POPULATION-2026-07-15"
  );
  assert.equal(intake.status, "integrated");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.equal(urbanhermitReviewSummary.recoveredPopulationCount, 434);
  assert.ok(knowledgeBank.pages.every((page) =>
    !["/proofs", "/urbanhermit"].includes(page.surface)
  ));
  assert.doesNotMatch(
    JSON.stringify(publicRegistry),
    /INTAKE-URBANHERM|LOC-URBANHERM-AUTHENTICATED-CAPTURE/
  );
});
