import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import {
  wowlistFacebookPostClaimIds,
  wowlistFacebookPostReviewSummary,
  wowlistFacebookPostSourceIds,
} from "../../apps/www/src/data/knowledge-bank/wowlistFacebookPosts.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import { validateWowListFacebookAcquisition } from "../lib/wowlist-facebook-acquisition-validation.mjs";

const fixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json";
const reportPath = "docs/knowledge-bank/projects/wowlist-facebook-posts.md";
const builderPath =
  "scripts/research/build-wowlist-facebook-posts-census.mjs";
const acquisitionPath =
  "docs/knowledge-bank/corpora/wowlist-facebook-posts-acquisition-manifest.json";

const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
const acquisition = JSON.parse(await readFile(acquisitionPath, "utf8"));

test("WOW List Facebook census reconciles the full recovered population", () => {
  assert.equal(fixture.platform, "facebook");
  assert.equal(fixture.corpusId, "wowlist-facebook-owner-posts-2026-07-15");
  assert.equal(fixture.populationReconciliation.protectedCapturePageCount, 19);
  assert.equal(fixture.populationReconciliation.protectedCaptureTerminal, true);
  assert.equal(fixture.populationReconciliation.protectedCaptureUniqueRecordCount, 57);
  assert.equal(fixture.populationReconciliation.publicCensusRecordCount, 57);
  assert.equal(fixture.populationReconciliation.recordsReviewedPercent, 100);
  assert.equal(fixture.records.length, 57);
  assert.equal(new Set(fixture.records.map((record) => record.postId)).size, 57);
  assert.deepEqual(fixture.populationReconciliation.recordsByYear, {
    2015: 22,
    2016: 27,
    2017: 7,
    2018: 1,
  });
  assert.match(
    fixture.populationReconciliation.protectedRecordSetSha256,
    /^[a-f0-9]{64}$/,
  );
});

test("public-safe acquisition controls independently bind the recovered denominator", () => {
  assert.deepEqual(validateWowListFacebookAcquisition(acquisition, fixture), []);

  const denominatorTamper = structuredClone(acquisition);
  denominatorTamper.protectedOwnerCapture.uniqueRecordCount = 56;
  assert.match(validateWowListFacebookAcquisition(denominatorTamper, fixture).join("\n"), /denominator drifted/);

  const omittedCheckpoint = structuredClone(acquisition);
  omittedCheckpoint.liveBidirectionalControl.reverse.checkpoints.pop();
  assert.match(validateWowListFacebookAcquisition(omittedCheckpoint, fixture).join("\n"), /final checkpoint/);
});

test("publisher attribution stays strong and explicitly bounded", () => {
  const audit = fixture.livePublisherAudit;
  assert.equal(audit.reviewedRecordCount, 57);
  assert.equal(audit.availablePostCount, 54);
  assert.equal(audit.unavailablePostCount, 3);
  assert.equal(audit.jamieAttributedPostCount, 51);
  assert.equal(audit.otherPublisherAttributedPostCount, 0);
  assert.equal(audit.attributionNotRecoveredCount, 6);
  assert.equal(
    fixture.records.filter(
      (record) => record.publisherAttribution === "jamie-burkart",
    ).length,
    51,
  );
  assert.equal(
    fixture.records.filter(
      (record) => record.publisherAttribution === "not-recovered",
    ).length,
    6,
  );
  assert.equal(
    fixture.records.filter((record) => record.liveDisposition === "unavailable")
      .length,
    3,
  );
  assert.equal(
    fixture.records.filter(
      (record) => record.liveDisposition === "available-video-redirect",
    ).length,
    3,
  );
  assert.match(audit.boundary, /six unattributed records/i);
});

test("publishing and URL aggregates remain reproducible", () => {
  const pattern = fixture.publishingPattern;
  assert.deepEqual(pattern.relationshipCounts, {
    "media-or-link-without-message": 4,
    "page-authored-commentary": 32,
    "page-commentary-with-shared-source": 12,
    "shared-source-only": 9,
  });
  assert.equal(pattern.recordsWithPageAuthoredCommentary, 44);
  assert.equal(pattern.recordsWithAttachedSharedSource, 21);
  assert.equal(pattern.recordsWithoutMessageText, 4);
  assert.deepEqual(pattern.missionThemeCounts, {
    "civic-and-cultural-advocacy": 9,
    "diy-cultural-space-sustainability": 19,
    "event-discovery-and-circulation": 34,
    "mutual-aid-and-solidarity": 17,
    "peer-learning-and-documentation": 12,
    "product-onboarding-and-contribution": 21,
  });

  const inventory = fixture.postedUrlInventory;
  assert.equal(inventory.recordsWithPublicUrls, 54);
  assert.equal(inventory.publicUrlOccurrences, 73);
  assert.equal(inventory.distinctNormalizedPublicUrls, 65);
  assert.equal(inventory.distinctWowListRouteUrls, 36);
  assert.equal(inventory.distinctExternalPublicUrls, 29);
  assert.equal(inventory.withheldRouteOccurrences, 1);
  assert.equal(new Set(inventory.publicUrls).size, 65);
  assert.ok(
    inventory.publicUrls.every(
      (url) => !/(?:^|\.)facebook\.com|^https?:\/\/m\.me/i.test(url),
    ),
  );
  assert.ok(inventory.publicUrls.every((url) => !/docs\.google\.com/i.test(url)));
});

test("public fixture excludes protected conversation and administration data", () => {
  const serialized = JSON.stringify(fixture);
  assert.equal(fixture.publicSafety.status, "public-safe-project-account-census");
  assert.doesNotMatch(serialized, /\/Volumes\//);
  assert.doesNotMatch(serialized, /\/Users\//);
  assert.doesNotMatch(serialized, /\b212[-.)\s]/);
  assert.doesNotMatch(serialized, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(serialized, /Chris Greacen|Aaron Ponzo|Zrach Burba|Clyde Petersen/);
  assert.doesNotMatch(serialized, /cookie[^s]|access.?token|session.?id/i);
  assert.ok(
    fixture.records.every(
      (record) =>
        !Object.hasOwn(record, "body") &&
        !Object.hasOwn(record, "comments") &&
        !Object.hasOwn(record, "reactions"),
    ),
  );
});

test("knowledge bank integrates governed Facebook sources and claims", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
  const inquiryIds = new Set(
    knowledgeBank.researchInquiries.map((inquiry) => inquiry.id),
  );

  for (const sourceId of Object.values(wowlistFacebookPostSourceIds)) {
    assert.ok(sourceIds.has(sourceId), sourceId);
  }
  for (const claimId of Object.values(wowlistFacebookPostClaimIds)) {
    assert.ok(claimIds.has(claimId), claimId);
  }
  assert.ok(inquiryIds.has("INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"));
  assert.ok(inquiryIds.has("INQ-WOWLIST-FACEBOOK-SOURCE-NETWORK-2026"));

  const publishingClaim = knowledgeBank.claims.find(
    (claim) =>
      claim.id === wowlistFacebookPostClaimIds.publishingManagement,
  );
  assert.match(publishingClaim.internalClaim, /51 of the 57/i);
  assert.match(publishingClaim.internalClaim, /Richard Caceres/i);
  assert.ok(
    publishingClaim.boundaries.some((boundary) => /six unresolved/i.test(boundary)),
  );
  assert.ok(
    publishingClaim.antiClaims.some((antiClaim) => /all 57/i.test(antiClaim)),
  );

  assert.ok(
    knowledgeLifecycle.leads.some(
      (lead) => lead.id === "LEAD-WOWLIST-FACEBOOK-POST-FULL-POPULATION",
    ),
  );
  const lifecycleClaimIds = new Set(
    knowledgeLifecycle.candidateClaims
      .filter((claim) => claim.id.startsWith("CND-WOWLIST-FACEBOOK-"))
      .map((claim) => claim.targetCanonicalClaimId),
  );
  assert.deepEqual(
    lifecycleClaimIds,
    new Set(Object.values(wowlistFacebookPostClaimIds)),
  );
  assert.ok(
    knowledgeLifecycle.observations.some(
      (observation) =>
        observation.id === "OBS-WOWLIST-FACEBOOK-TRACTION-BOUNDARY" &&
        /No stable full-population/.test(observation.statement),
    ),
  );

  const publishing = knowledgeLifecycle.candidateClaims.find(
    ({ id }) => id === "CND-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT",
  );
  assert.ok(
    publishing?.observationIds.includes(
      "OBS-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY",
    ),
  );

  const care = knowledgeLifecycle.candidateClaims.find(
    ({ id }) => id === "CND-WOWLIST-FACEBOOK-CARE-ADVOCACY-ARC",
  );
  const sourceObservationIds = [
    "OBS-WOWLIST-FACEBOOK-EAST-BAY-GHOST-SHIP-SOURCE",
    "OBS-WOWLIST-FACEBOOK-WILLAMETTE-KNOW-CLOSING-SOURCE",
    "OBS-WOWLIST-FACEBOOK-PEHRSPACE-FUNDRAISER-SOURCE",
    "OBS-WOWLIST-FACEBOOK-WESTWORD-DENVER-FUND-SOURCE",
  ];
  assert.ok(sourceObservationIds.every((id) => care?.observationIds.includes(id)));
  for (const observationId of [
    "OBS-WOWLIST-FACEBOOK-POST-POPULATION",
    "OBS-WOWLIST-FACEBOOK-LIVE-BIDIRECTIONAL-CONTROL",
    "OBS-WOWLIST-FACEBOOK-PUBLISHER-AUDIT",
    "OBS-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY",
    "OBS-WOWLIST-FACEBOOK-OPERATING-PATTERN",
    ...sourceObservationIds,
  ]) {
    const observation = knowledgeLifecycle.observations.find(
      ({ id }) => id === observationId,
    );
    assert.ok(observation?.candidateRelationships.length, observationId);
    assert.ok(
      observation.candidateRelationships.every(
        ({ supports, limitations }) => supports.length > 0 && limitations.length > 0,
      ),
      observationId,
    );
  }
});

test("only the bounded Facebook publishing role projects to the WOW List case study", async () => {
  const governedClaimIds = new Set(Object.values(wowlistFacebookPostClaimIds));
  const governedOccurrences = knowledgeBank.pages.flatMap((page) =>
    page.occurrences
      .filter((occurrence) => governedClaimIds.has(occurrence.claimId))
      .map((occurrence) => ({ page: page.surface, ...occurrence })),
  );
  assert.deepEqual(governedOccurrences, [
    {
      page: "/work/wowlist",
      id: "facebook-publishing-management",
      claimId: wowlistFacebookPostClaimIds.publishingManagement,
      projection: "case-study",
      sourceIds: [wowlistFacebookPostSourceIds.census],
    },
  ]);

  const registryText = JSON.stringify(publicRegistry);
  assert.doesNotMatch(registryText, /INTAKE-WOWLIST-FACEBOOK-POSTS/);
  assert.match(registryText, /CLM-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT/);
  assert.doesNotMatch(registryText, /CLM-WOWLIST-FACEBOOK-POST-POPULATION/);
  assert.doesNotMatch(registryText, /CLM-WOWLIST-FACEBOOK-OPERATING-PRACTICE/);
  assert.doesNotMatch(registryText, /CLM-WOWLIST-FACEBOOK-CARE-ADVOCACY-ARC/);

  const report = await readFile(reportPath, "utf8");
  assert.match(report, /Projection decision.*selective case-study projection/i);
  assert.match(report, /one bounded role-and-operating-practice sentence/i);
  assert.doesNotMatch(report, /\/proofs\b/i);
});

test("review summary and transformer retain the public-safety contract", async () => {
  assert.equal(wowlistFacebookPostReviewSummary.recoveredPostCount, 57);
  assert.equal(wowlistFacebookPostReviewSummary.liveMessageRecordCount, 53);
  assert.equal(
    wowlistFacebookPostReviewSummary.liveMessageForwardReverseAgreement,
    53,
  );
  assert.equal(wowlistFacebookPostReviewSummary.jamieAttributedPostCount, 51);
  assert.equal(
    wowlistFacebookPostReviewSummary.attributionNotRecoveredCount,
    6,
  );
  assert.equal(
    wowlistFacebookPostReviewSummary.distinctNormalizedPublicUrls,
    65,
  );

  const builder = await readFile(builderPath, "utf8");
  assert.doesNotMatch(builder, /\/Volumes\//);
  assert.doesNotMatch(builder, /\/Users\//);
  assert.match(builder, /protected-capture\.json/);
  assert.match(builder, /protected-publisher-audit\.json/);
  assert.match(builder, /isWithheldRoute/);
});
