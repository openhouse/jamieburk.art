import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import {
  sourceExpansionIntake,
  sourceExpansionSources
} from "../../apps/www/src/data/knowledge-bank/source-expansion.ts";
import {
  campaignPressArticleSourceIds,
  campaignPressClaims,
  campaignPressInquiries,
  campaignPressIntake,
  campaignPressManifests,
  campaignPressSources
} from "../../apps/www/src/data/knowledge-bank/campaign-press.ts";
import {
  kcTownHallCouncilActionCorrections,
  kcTownHallCouncilActionInquiries,
  kcTownHallCouncilActionIntake,
  kcTownHallCouncilActionSources
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-council-action.ts";
import {
  kcTownHallStewardshipTransitionInquiries,
  kcTownHallStewardshipTransitionIntake
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-stewardship-transition.ts";
import {
  kcTownHallPhaseOneNeighborhoodClaims,
  kcTownHallPhaseOneNeighborhoodInquiries,
  kcTownHallPhaseOneNeighborhoodIntake,
  kcTownHallPhaseOneNeighborhoodSources
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-phase-one-and-neighborhood-operations.ts";
import {
  nterChngClaims,
  nterChngInquiries,
  nterChngIntake,
  nterChngSources
} from "../../apps/www/src/data/knowledge-bank/nter-chng.ts";
import {
  icloudArchiveClaims,
  icloudArchiveInquiries,
  icloudArchiveIntake,
  icloudArchiveSources
} from "../../apps/www/src/data/knowledge-bank/icloud-archive-production.ts";
import {
  googleDriveArchiveClaims,
  googleDriveArchiveInquiries,
  googleDriveArchiveIntake,
  googleDriveArchiveSources
} from "../../apps/www/src/data/knowledge-bank/google-drive-archive-production.ts";
import {
  participationLineageClaims,
  participationLineageInquiries,
  participationLineageIntake,
  participationLineageSources
} from "../../apps/www/src/data/knowledge-bank/participation-lineage.ts";
import {
  nycacDclaCouncilClaims,
  nycacDclaCouncilInquiries,
  nycacDclaCouncilIntake,
  nycacDclaCouncilSources
} from "../../apps/www/src/data/knowledge-bank/nycac-dcla-council-interface.ts";
import {
  callNycCouncilReposts,
  callNycMemberAuthoredInteractions,
  kcSpacesFundHighlights,
  nycArtistCoalitionCouncilInteractions,
  olympiaKaziCoalitionIdentityPosts,
  projectSocialAccounts,
  socialMediaArchiveClaims,
  socialMediaArchiveInquiries,
  socialMediaArchiveIntake,
  socialMediaArchiveSources
} from "../../apps/www/src/data/knowledge-bank/social-media-archive-production.ts";
import {
  callNycFullPopulationClaims,
  callNycFullPopulationInquiries,
  callNycFullPopulationIntake,
  callNycFullPopulationSources
} from "../../apps/www/src/data/knowledge-bank/callnyc-x-full-population.ts";
import {
  wowListFullPopulationClaims,
  wowListFullPopulationInquiries,
  wowListFullPopulationIntake,
  wowListFullPopulationSources
} from "../../apps/www/src/data/knowledge-bank/wowlist-x-full-population.ts";
import {
  kcTownHallFullPopulationClaims,
  kcTownHallFullPopulationInquiries,
  kcTownHallFullPopulationIntake,
  kcTownHallFullPopulationSources
} from "../../apps/www/src/data/knowledge-bank/kctownhall-x-full-population.ts";
import {
  validateCommittedCorpus
} from "../derive-callnyc-x-corpus.mjs";
import {
  validateCommittedCorpus as validateCommittedWowListCorpus
} from "../derive-wowlist-x-corpus.mjs";
import {
  buildPublicAcquisitionLedger,
  validateCommittedFixture as validateCommittedKcTownHallFixture
} from "../derive-kctownhall-x-corpus.mjs";
import {
  knowledgeLifecycleReport,
  validateKnowledgeLifecycle
} from "../lib/knowledge-lifecycle-validation.mjs";

const cloneBank = () => structuredClone(knowledgeBank);
const campaignPressCaptureInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
    "utf8"
  )
);

const normalizeSourceUrl = (value) =>
  value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

test("canonical knowledge lifecycle is valid", () => {
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("social account inventory preserves project relationships and dated metrics", () => {
  const recoveredHandles = new Set(
    projectSocialAccounts
      .filter((account) => account.status === "recovered")
      .map((account) => account.handle)
  );
  assert.deepEqual(recoveredHandles, new Set([
    "@CallNYCapp",
    "@NYCArtC",
    "@wowlist",
    "@KCTownHall",
    "@KCSpacesFund"
  ]));
  assert.equal(
    projectSocialAccounts.filter((account) => account.handle === "@NYCArtC").length,
    5
  );
  assert.equal(
    projectSocialAccounts.find((account) => account.projectId === "sunday-dinner")
      .status,
    "not-recovered"
  );

  const activeSocialCopy = socialMediaArchiveClaims.flatMap((claim) =>
    claim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text)
  ).join("\n");
  assert.doesNotMatch(activeSocialCopy, /\b(?:followers|following)\b/i);
});

test("CallNYC social audit enforces the 20-member lower bound and eight authored interactions", () => {
  assert.equal(callNycCouncilReposts.length, 19);
  assert.equal(callNycMemberAuthoredInteractions.length, 8);

  const repostPeople = new Set(callNycCouncilReposts.map((event) => event.name));
  const authoredPeople = new Set(
    callNycMemberAuthoredInteractions.map((event) => event.name)
  );
  const union = new Set([...repostPeople, ...authoredPeople]);
  assert.equal(union.size, 20);
  assert.deepEqual(
    [...authoredPeople].filter((name) => !repostPeople.has(name)),
    ["Ydanis Rodriguez"]
  );

  const claim = socialMediaArchiveClaims.find(
    (item) => item.id === "CLM-CALLNYC-SOCIAL-PUBLIC-FEEDBACK-LOOP"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-CALLNYC-COUNCIL-ENGAGEMENT"
  );
  assert.match(claim.internalClaim, /at least 20 distinct accounts/);
  assert.match(claim.internalClaim, /eight members authored/);
  assert.ok(claim.boundaries.some((item) => /lower bound/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /exactly 20/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /endorsed CallNYC/i.test(item)));
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.match(inquiry.publicSummary, /at least 20/);
});

test("CallNYC full-population corpus is complete, reproducible, and honestly bounded", () => {
  const rawPath =
    "docs/knowledge-bank/corpora/source-captures/callnyc-x-browser-extraction-2026-07-15-utc.json";
  const corpusPath =
    "docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.json";
  const manifestPath =
    "docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.manifest.json";
  const rawText = readFileSync(rawPath, "utf8");
  const corpusText = readFileSync(corpusPath, "utf8");
  const manifestText = readFileSync(manifestPath, "utf8");
  const corpus = JSON.parse(corpusText);
  const manifest = JSON.parse(manifestText);
  const metrics = validateCommittedCorpus(rawText, corpus);

  for (const publicArtifact of [rawText, corpusText, manifestText]) {
    assert.doesNotMatch(publicArtifact, /authenticated(?:As|SessionIdentity)/);
    assert.doesNotMatch(publicArtifact, /@urbanhermit/i);
  }

  assert.equal(
    createHash("sha256").update(rawText).digest("hex"),
    manifest.capture.rawArtifactSha256
  );
  assert.equal(corpus.items.length, 107);
  assert.ok(
    corpus.boundaries.some((boundary) =>
      /telephone numbers.*must not be treated as current guidance/i.test(boundary)
    )
  );
  assert.equal(new Set(corpus.items.map((item) => item.canonicalUrl)).size, 107);
  assert.deepEqual(corpus.items.map((item) => item.index),
    Array.from({ length: 107 }, (_, index) => index + 1));
  assert.deepEqual(
    {
      profileReported: metrics.profileReported,
      renderedDistinct: metrics.renderedDistinct,
      authored: metrics.authored,
      reposted: metrics.reposted,
      unresolvedCountDifference: metrics.unresolvedCountDifference,
      recognitionPosts: metrics.recognitionPosts,
      recognitionRecipients: metrics.recognitionRecipients.length,
      issuePages: metrics.distinctNormalizedIssuePageDestinations,
      outgoingLinks: metrics.outgoingLinkOccurrences,
      externalLinks: metrics.externalLinkOccurrences,
      visibleMedia: metrics.authoredPostsWithVisibleMedia,
      engagedAuthored: metrics.authoredPostsWithVisibleEngagement,
      engagementTotals: metrics.authoredEngagementTotals
    },
    {
      profileReported: 110,
      renderedDistinct: 107,
      authored: 92,
      reposted: 15,
      unresolvedCountDifference: 3,
      recognitionPosts: 71,
      recognitionRecipients: 26,
      issuePages: 61,
      outgoingLinks: 98,
      externalLinks: 13,
      visibleMedia: 75,
      engagedAuthored: 59,
      engagementTotals: { replies: 8, reposts: 74, likes: 111 }
    }
  );

  assert.equal(callNycFullPopulationSources.length, 8);
  assert.equal(callNycFullPopulationClaims.length, 3);
  assert.equal(callNycFullPopulationInquiries.length, 1);
  assert.equal(callNycFullPopulationIntake.length, 1);
  assert.equal(callNycFullPopulationInquiries[0].resultStatus, "partially-recovered");
  assert.match(callNycFullPopulationInquiries[0].publicSummary, /three-item profile-count discrepancy/);
  assert.ok(
    callNycFullPopulationClaims
      .find((claim) => claim.id === "CLM-CALLNYC-SOCIAL-TRACTION-OBSERVATION")
      .projections.every((projection) => projection.status === "hold")
  );

  const publicFeedbackClaim = socialMediaArchiveClaims.find(
    (claim) => claim.id === "CLM-CALLNYC-SOCIAL-PUBLIC-FEEDBACK-LOOP"
  );
  assert.ok(publicFeedbackClaim.boundaries.some((boundary) => /107 distinct items/.test(boundary)));
  assert.ok(publicFeedbackClaim.antiClaims.some((antiClaim) => /all 110/.test(antiClaim)));
  assert.ok(publicFeedbackClaim.boundaries.some((boundary) => /Twenty-six describes/.test(boundary)));
});

test("WOW List full-population corpus is complete, reproducible, and honestly bounded", () => {
  const rawPath =
    "docs/knowledge-bank/corpora/source-captures/wowlist-x-browser-extraction-2026-07-15-utc.json";
  const corpusPath =
    "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.json";
  const manifestPath =
    "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.manifest.json";
  const rawText = readFileSync(rawPath, "utf8");
  const corpusText = readFileSync(corpusPath, "utf8");
  const manifestText = readFileSync(manifestPath, "utf8");
  const corpus = JSON.parse(corpusText);
  const manifest = JSON.parse(manifestText);
  const metrics = validateCommittedWowListCorpus(
    rawText,
    corpusText,
    manifest
  );

  for (const publicArtifact of [rawText, corpusText, manifestText]) {
    assert.doesNotMatch(
      publicArtifact,
      /"(?:authenticatedAs|authenticatedSessionIdentity)"\s*:/i
    );
  }

  assert.equal(
    createHash("sha256").update(rawText).digest("hex"),
    manifest.sourceCaptureSha256
  );
  assert.equal(new Set(corpus.items.map((item) => item.canonicalUrl)).size, 38);
  assert.equal(corpus.acquisitionVerification.passes.length, 3);
  assert.ok(
    corpus.acquisitionVerification.passes.every(
      (pass) =>
        pass.distinctStatusIds === 38 &&
        pass.matchedProfileBaseline &&
        pass.matchedCanonicalStatusIdSet &&
        pass.statusIds.length === 38 &&
        new Set(pass.statusIds).size === 38
    )
  );
  assert.equal(
    wowListFullPopulationInquiries
      .find((inquiry) => inquiry.id === "INQ-WOWLIST-X-FULL-POPULATION-2026")
      .sourceIds.includes("SRC-WOWLIST-DATABASE-AGGREGATES-2017"),
    false
  );
  assert.equal(corpus.sourceLeads.find((lead) => lead.id === "good-times-zines-2").disposition, "archived-and-close-read");
  assert.doesNotMatch(
    JSON.stringify(corpus.missionPatterns),
    /unrecovered article/,
  );
  assert.deepEqual(
    {
      profileReported: metrics.profileReported,
      renderedDistinct: metrics.renderedDistinct,
      authored: metrics.authored,
      reposted: metrics.reposted,
      unresolvedCountDifference: metrics.unresolvedCountDifference,
      authoredReplies: metrics.authoredReplies,
      allOutgoingLinks: metrics.allOutgoingLinkOccurrences,
      authoredOutgoingLinks: metrics.authoredOutgoingLinkOccurrences,
      recoveredSupportThreads: metrics.recoveredPublicSupportThreads,
      engagedAuthored: metrics.authoredPostsWithVisibleEngagement,
      engagementTotals: metrics.authoredEngagementTotals
    },
    {
      profileReported: 38,
      renderedDistinct: 38,
      authored: 22,
      reposted: 16,
      unresolvedCountDifference: 0,
      authoredReplies: 5,
      allOutgoingLinks: 35,
      authoredOutgoingLinks: 23,
      recoveredSupportThreads: 3,
      engagedAuthored: 12,
      engagementTotals: { replies: 2, reposts: 20, likes: 21 }
    }
  );

  assert.equal(wowListFullPopulationSources.length, 10);
  assert.equal(wowListFullPopulationClaims.length, 6);
  assert.equal(wowListFullPopulationInquiries.length, 2);
  assert.equal(wowListFullPopulationIntake.length, 2);
  assert.ok(
    wowListFullPopulationInquiries.every(
      (inquiry) => inquiry.resultStatus === "recovered"
    )
  );
  assert.ok(
    wowListFullPopulationClaims
      .find((claim) => claim.id === "CLM-WOWLIST-SOCIAL-TRACTION-OBSERVATION")
      .projections.every((projection) => projection.status === "hold")
  );
  assert.ok(
    wowListFullPopulationClaims
      .find((claim) => claim.id === "CLM-WOWLIST-CIVIC-CARE-USE")
      .boundaries.some((boundary) => /not interchangeable/.test(boundary))
  );
  const scaleClaim = wowListFullPopulationClaims.find(
    (claim) => claim.id === "CLM-WOWLIST-ARCHIVE-SCALE"
  );
  assert.deepEqual(scaleClaim.evidence.map((item) => item.sourceId), [
    "SRC-WOWLIST-DATABASE-AGGREGATES-2017"
  ]);
  assert.ok(scaleClaim.boundaries.some((boundary) => /July 22, 2017/.test(boundary)));
  assert.deepEqual(scaleClaim.researchInquiryIds, [
    "INQ-WOWLIST-ARCHIVE-IMPLEMENTATION-2026"
  ]);
  const technicalClaim = wowListFullPopulationClaims.find(
    (claim) => claim.id === "CLM-WOWLIST-TECHNICAL-CONTRIBUTION"
  );
  assert.deepEqual(technicalClaim.evidence.map((item) => item.sourceId), [
    "SRC-WOWLIST-TECHNICAL-ARCHIVE-2026"
  ]);
  const socialIntake = wowListFullPopulationIntake.find(
    (record) => record.id === "INT-WOWLIST-X-FULL-POPULATION-2026"
  );
  assert.ok(!socialIntake.claimIds.includes("CLM-WOWLIST-ARCHIVE-SCALE"));
  assert.ok(!socialIntake.claimIds.includes("CLM-WOWLIST-TECHNICAL-CONTRIBUTION"));
});

test("KC Town Hall full-population corpus is complete, reproducible, and safely bounded", () => {
  const fixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json";
  const manifestPath =
    "docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.manifest.json";
  const fixtureText = readFileSync(fixturePath, "utf8");
  const manifestText = readFileSync(manifestPath, "utf8");
  const fixture = JSON.parse(fixtureText);
  const manifest = JSON.parse(manifestText);
  const metrics = validateCommittedKcTownHallFixture(
    fixturePath,
    fixtureText,
    manifest
  );

  assert.equal(
    createHash("sha256").update(fixtureText).digest("hex"),
    manifest.corpusSha256
  );
  assert.equal(new Set(fixture.records.map((record) => record.url)).size, 183);
  assert.equal(fixture.conversationContextRecords.length, 5);
  assert.doesNotMatch(fixtureText, /"(?:authenticatedAs|sessionData|rawText|text|phone|address)"\s*:/i);
  assert.doesNotMatch(fixtureText, /\b\d{3}[-.) ]\s*\d{3}[- ]\d{4}\b/);
  assert.deepEqual(metrics, {
    profileReported: 183,
    postsTimelinePrimaryRecords: 170,
    repliesTimelineRenderedCards: 188,
    conversationContextCards: 5,
    renderedPrimaryRecords: 183,
    unresolvedCountDifference: 0,
    recordTypes: { original: 142, reply: 13, repost: 28 },
    accountAuthoredRecords: 155,
    recordsByYear: {
      "2018": 30,
      "2019": 85,
      "2020": 41,
      "2021": 17,
      "2022": 10
    },
    tireRelatedRecords: 100,
    surveyLinkedRecords: 12,
    recordsWithExternalLinks: 118,
    externalLinkOccurrences: 133,
    distinctExternalShortUrls: 31,
    accountAuthoredRecordsWithExternalLinks: 115,
    accountAuthoredExternalLinkOccurrences: 130,
    accountAuthoredDistinctExternalShortUrls: 28,
    curatedMissionRelevantSources: 9,
    directCouncilMemberAccounts: 3,
    otherMissionRelevantStakeholderRecords: 4,
    accountAuthoredRecordsWithVisibleInteraction: 77,
    accountAuthoredVisibleEngagement: {
      replies: 22,
      reposts: 70,
      likes: 174,
      bookmarks: 1
    }
  });

  assert.equal(kcTownHallFullPopulationSources.length, 17);
  assert.equal(kcTownHallFullPopulationClaims.length, 2);
  assert.equal(kcTownHallFullPopulationInquiries.length, 3);
  assert.equal(kcTownHallFullPopulationIntake.length, 1);
  assert.ok(
    kcTownHallFullPopulationClaims.every((claim) =>
      claim.projections.every((projection) => projection.status === "hold")
    )
  );
  assert.ok(
    kcTownHallFullPopulationClaims
      .find((claim) => claim.id === "CLM-KCTH-X-DATED-VISIBLE-ENGAGEMENT")
      .antiClaims.some((antiClaim) => /267 people engaged/.test(antiClaim))
  );
  assert.ok(
    kcTownHallFullPopulationInquiries
      .find((inquiry) => inquiry.id === "INQ-KCTH-X-TIRE-TOTALS-CORROBORATION")
      .limitations.some((limitation) => /one drop-off/.test(limitation))
  );

  const operatingClaim = socialMediaArchiveClaims.find(
    (claim) => claim.id === "CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS"
  );
  assert.deepEqual(
    operatingClaim.evidence.filter((item) => item.renderCitation).map((item) => item.sourceId),
    [
      "SRC-KCTH-X-CORPUS-2026-07-15",
      "SRC-KCTH-KCMO-COUNCIL-ROSTER-2019",
      "SRC-KCTH-KCMO-ROBINSON-SERVICE-2020",
      "SRC-KCTH-ROBINSON-REPLY-2020",
      "SRC-KCTH-JUSTUS-REPLY-2019",
      "SRC-KCTH-LUCAS-QUOTE-2019",
      "SRC-KCTH-KCMO311-REPLY-2018",
      "SRC-KCTH-BRIDGING-GAP-DROPOFF-2019"
    ]
  );
  assert.ok(operatingClaim.boundaries.some((boundary) => /publishing and operating continuity/.test(boundary)));
  assert.ok(operatingClaim.antiClaims.some((antiClaim) => /267 people engaged/.test(antiClaim)));

  const run = readFileSync(
    "docs/knowledge-bank/runs/2026-07-15-kctownhall-x-full-population.md",
    "utf8"
  );
  assert.match(run, /183 unique canonical status IDs/);
  assert.match(run, /do not\s+independently verify tire quantities/i);
  assert.match(run, /Tags and mentions alone do not/);
});

test("KC Town Hall acquisition rejects Replies-route corruption", () => {
  const ledger = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/corpora/kctownhall-x-acquisition-ledger-2026-07-15.json",
      "utf8"
    )
  );
  const toCaptureRecord = (record, recoveredRoutes) => ({
    statusId: record.statusId,
    statusPath: new URL(record.statusUrl).pathname,
    statusOwner: record.authorHandle,
    datetime: record.publishedAt,
    isReply: record.recordType === "reply",
    isRepost: record.recordType === "repost",
    recoveredRoutes
  });
  const capture = {
    profileReportedCount: 183,
    reviewedAt: "2026-07-15",
    postsRoute: ledger.primaryRecords
      .filter((record) => record.recoveredRoutes.includes("posts"))
      .map((record) => toCaptureRecord(record, ["posts"])),
    repliesRoute: [
      ...ledger.primaryRecords.map((record) =>
        toCaptureRecord(record, ["replies"])
      ),
      ...ledger.conversationContextRecords.map((record) =>
        toCaptureRecord(record, ["replies"])
      )
    ],
    attributablePopulation: ledger.primaryRecords.map((record) =>
      toCaptureRecord(record, record.recoveredRoutes)
    ),
    excludedConversationContext: ledger.conversationContextRecords.map(
      (record) => toCaptureRecord(record, ["replies"])
    )
  };

  assert.doesNotThrow(() =>
    buildPublicAcquisitionLedger(`${JSON.stringify(capture)}\n`)
  );

  const corrupted = structuredClone(capture);
  corrupted.repliesRoute[0].statusId = "9999999999999999999";
  corrupted.repliesRoute[0].statusPath =
    "/KCTownHall/status/9999999999999999999";
  assert.throws(() =>
    buildPublicAcquisitionLedger(`${JSON.stringify(corrupted)}\n`)
  );

  const coordinatedSwap = structuredClone(capture);
  const repliesOnlyPrimaryIndex = coordinatedSwap.attributablePopulation.findIndex(
    (record) =>
      record.statusOwner === "@KCTownHall" &&
      !record.recoveredRoutes.includes("posts")
  );
  const primaryRecord =
    coordinatedSwap.attributablePopulation[repliesOnlyPrimaryIndex];
  const contextRecord = coordinatedSwap.excludedConversationContext[0];
  coordinatedSwap.attributablePopulation[repliesOnlyPrimaryIndex] = contextRecord;
  coordinatedSwap.excludedConversationContext[0] = primaryRecord;
  assert.throws(() =>
    buildPublicAcquisitionLedger(`${JSON.stringify(coordinatedSwap)}\n`)
  );
});

test("NYC Artist Coalition count separates direct, mission-relevant, and thread-context records", () => {
  const directPeople = new Set(
    nycArtistCoalitionCouncilInteractions.map((event) => event.name)
  );
  const missionPeople = new Set(
    nycArtistCoalitionCouncilInteractions
      .filter((event) => event.missionRelevant)
      .map((event) => event.name)
  );
  assert.equal(directPeople.size, 5);
  assert.equal(missionPeople.size, 4);
  assert.ok(!directPeople.has("Carlina Rivera"));
  assert.ok(!directPeople.has("Brad Lander"));
  assert.equal(
    nycArtistCoalitionCouncilInteractions.find(
      (event) => event.name === "Justin Brannan"
    ).missionRelevant,
    false
  );

  const claim = socialMediaArchiveClaims.find(
    (item) => item.id === "CLM-NYCAC-SOCIAL-COUNCIL-ENGAGEMENT"
  );
  assert.match(claim.internalClaim, /at least five accounts/);
  assert.ok(claim.boundaries.some((item) => /Carlina Rivera and Brad Lander/.test(item)));
  assert.ok(claim.boundaries.some((item) => /Justin Brannan/.test(item)));
});

test("shared identity evidence credits Jamie's establishment and preserves collaborator authorship", () => {
  assert.deepEqual(
    olympiaKaziCoalitionIdentityPosts.map((post) => post.publishedAt.slice(0, 4)),
    ["2020", "2021", "2022"]
  );
  const claim = socialMediaArchiveClaims.find(
    (item) => item.id === "CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT"
  );
  assert.match(claim.internalClaim, /Jamie states that he established/);
  assert.ok(claim.boundaries.some((item) => /first-person account/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /every project-account post/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /Olympia Kazi authored every/i.test(item)));
});

test("other project social archives retain population and role boundaries", () => {
  const wowClaim = socialMediaArchiveClaims.find(
    (item) => item.id === "CLM-WOWLIST-SOCIAL-PROVENANCE-SUPPORT"
  );
  const kcTownHallClaim = socialMediaArchiveClaims.find(
    (item) => item.id === "CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS"
  );
  const kcSpacesClaim = socialMediaArchiveClaims.find(
    (item) => item.id === "CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION"
  );
  assert.match(wowClaim.internalClaim, /complete recovered @wowlist profile population/);
  assert.match(kcTownHallClaim.internalClaim, /complete 183-record/);
  assert.match(kcTownHallClaim.internalClaim, /three then-serving Council-member accounts/);
  assert.match(kcTownHallClaim.internalClaim, /Bridging the Gap collaborator/);
  assert.equal(kcSpacesFundHighlights.length, 11);
  assert.equal(kcSpacesClaim.projections[0].status, "hold");
  assert.deepEqual(kcSpacesClaim.projections[0].surfaces, []);
  assert.ok(kcSpacesClaim.antiClaims.some((item) => /complete grant ledger/i.test(item)));
});

test("social archival production is dispositioned and publishes a reproducible contract", () => {
  const sourceIds = new Set(socialMediaArchiveSources.map((source) => source.id));
  const linkedSourceIds = new Set([
    ...socialMediaArchiveClaims.flatMap((claim) =>
      claim.evidence.map((relationship) => relationship.sourceId)
    ),
    ...socialMediaArchiveInquiries.flatMap((inquiry) => inquiry.sourceIds),
    ...socialMediaArchiveIntake.flatMap((record) => record.sourceIds)
  ]);
  assert.ok([...sourceIds].every((sourceId) => linkedSourceIds.has(sourceId)));
  assert.ok(
    socialMediaArchiveIntake.every(
      (record) => record.status === "matured" && record.claimIds.length > 0
    )
  );

  const report = readFileSync(
    "docs/knowledge-bank/projects/social-media-archive-production.md",
    "utf8"
  );
  assert.match(report, /authenticated X session/);
  assert.match(report, /at\s+least \*\*20 distinct accounts/);
  assert.match(report, /at least \*\*five\s+serving Council-member accounts/);
  assert.match(report, /lower bounds?/i);
  assert.match(report, /No dedicated account recovered/);
  assert.match(report, /do not establish who authored every coalition post/i);
  assert.doesNotMatch(report, /auth_token=|ct0=|bearer [A-Za-z0-9]/i);
});

test("ten-source expansion is complete and dispositioned", () => {
  assert.equal(sourceExpansionSources.length, 10);
  assert.equal(sourceExpansionIntake.length, 10);
  const sourceIds = new Set(sourceExpansionSources.map((source) => source.id));
  assert.deepEqual(
    new Set(sourceExpansionIntake.flatMap((record) => record.sourceIds)),
    sourceIds
  );
  assert.ok(
    sourceExpansionIntake.every(
      (record) => record.status === "matured" && record.claimIds.length > 0
    )
  );
});

test("KC Town Hall Council action is exact, complete, and dispositioned", () => {
  assert.equal(kcTownHallCouncilActionSources.length, 4);
  assert.equal(kcTownHallCouncilActionIntake.length, 1);
  assert.equal(kcTownHallCouncilActionInquiries.length, 1);
  assert.equal(kcTownHallCouncilActionCorrections.length, 1);

  const intake = kcTownHallCouncilActionIntake[0];
  const inquiry = kcTownHallCouncilActionInquiries[0];
  const correction = kcTownHallCouncilActionCorrections[0];
  const sourceIds = kcTownHallCouncilActionSources.map((source) => source.id);
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"
  );
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  const projection = claim.projections.find(
    (item) => item.key === "case-study" && item.status === "active"
  );

  assert.equal(intake.status, "matured");
  assert.equal(intake.disposition, "correction-created");
  assert.deepEqual(intake.sourceIds, sourceIds);
  assert.ok(sourceIds.every((sourceId) => inquiry.sourceIds.includes(sourceId)));
  assert.equal(inquiry.resultStatus, "recovered");
  assert.equal(correction.claimId, claim.id);
  assert.ok(correction.affectedSurfaces.includes("resume-pdf"));
  assert.ok(
    sourceIds.every((sourceId) =>
      claim.evidence.some((relationship) => relationship.sourceId === sourceId)
    )
  );
  assert.deepEqual(proof.canonicalClaimIds, [
    claim.id,
    "CLM-KC-TOWN-HALL-PHASE-ONE-RESTORATION",
    "CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY",
    "CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS"
  ]);

  assert.match(projection.text, /CCED Board unanimously recommended \$490,539/);
  assert.match(projection.text, /City Council then adopted/);
  assert.match(projection.text, /companion ordinance appropriated that amount/);
  assert.match(projection.text, /withdrew before the funds were disbursed/);
  assert.doesNotMatch(projection.text, /Council (?:vote )?was unanimous/i);
  assert.ok(
    claim.antiClaims.some((item) => /Council vote was unanimous/i.test(item))
  );
  assert.ok(
    claim.antiClaims.some((item) => /received or spent/i.test(item))
  );
});

test("KC Town Hall public surfaces preserve the no-disbursement boundary", () => {
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  const technicalOperationsSource = readFileSync(
    "apps/www/src/app/work/technical-operations/page.tsx",
    "utf8"
  );
  const publicText = [
    readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8"),
    technicalOperationsSource,
    readFileSync("apps/www/src/data/work.ts", "utf8"),
    readFileSync("docs/knowledge-bank/proofs.md", "utf8"),
    proof.publicWording,
    proof.shortWording,
    proof.detailedPublicWording
  ].join("\n");

  assert.match(
    technicalOperationsSource,
    /requireReadyOrCarefulProof\(\s*"kc-town-hall-public-benefit-documentation"/
  );
  assert.match(publicText, /City Council (?:approval and appropriation|then adopted)/);
  assert.match(
    publicText,
    /withdrew before (?:(?:the )?funds were )?disburs(?:ed|ement)/
  );
  assert.doesNotMatch(publicText, /public funding recommendation/);
  assert.doesNotMatch(publicText, /Council (?:vote )?was unanimous/i);
  assert.doesNotMatch(
    publicText,
    /(?:received|was paid|spent) (?:the )?\$490,539|\$490,539 (?:received|paid|spent)/i
  );
});

test("KC Town Hall stewardship transition remains a separate research lead", () => {
  assert.equal(kcTownHallStewardshipTransitionIntake.length, 1);
  assert.equal(kcTownHallStewardshipTransitionInquiries.length, 1);

  const intake = kcTownHallStewardshipTransitionIntake[0];
  const inquiry = kcTownHallStewardshipTransitionInquiries[0];
  const municipalClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"
  );

  assert.equal(intake.status, "researching");
  assert.equal(intake.disposition, "inquiry-opened");
  assert.deepEqual(intake.sourceIds, []);
  assert.deepEqual(intake.claimIds, []);
  assert.deepEqual(intake.inquiryIds, [inquiry.id]);
  assert.equal(inquiry.resultStatus, "open");
  assert.deepEqual(inquiry.sourceIds, []);
  assert.match(intake.description, /mission-aligned organization/);
  assert.ok(
    inquiry.limitations.some((item) =>
      /do not establish or explain the earlier stewardship transition/i.test(item)
    )
  );
  assert.ok(
    municipalClaim.researchInquiryIds.every((id) => id !== inquiry.id),
    "The source-backed municipal claim must not absorb the source-free handoff lead"
  );

  const publicSurfaces = [
    readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8"),
    readFileSync("apps/www/src/data/proofs.ts", "utf8"),
    readFileSync("apps/www/src/data/work.ts", "utf8"),
    readFileSync("apps/www/src/app/resume/page.tsx", "utf8")
  ].join("\n");
  assert.match(
    publicSurfaces,
    /Historical project for Jamie; current property or redevelopment status is not asserted\./
  );
  assert.doesNotMatch(publicSurfaces, /mission-aligned organization/i);
});

test("KC Town Hall Phase One preserves completed scope without overpromoting Jamie's title", () => {
  const claim = kcTownHallPhaseOneNeighborhoodClaims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-PHASE-ONE-RESTORATION"
  );
  const inquiry = kcTownHallPhaseOneNeighborhoodInquiries.find(
    (item) => item.id === "INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"
  );
  const archiveProjection = claim.projections.find(
    (item) => item.key === "archive-note"
  );
  const caseStudyProjection = claim.projections.find(
    (item) => item.key === "case-study"
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"
  );

  assert.equal(claim.status, "confirmed-with-boundary");
  assert.equal(archiveProjection.status, "hold");
  assert.deepEqual(archiveProjection.surfaces, []);
  assert.equal(caseStudyProjection.status, "active");
  assert.deepEqual(caseStudyProjection.surfaces, ["/work/kc-town-hall"]);
  assert.match(caseStudyProjection.text, /\$189,629 Phase One/);
  assert.doesNotMatch(caseStudyProjection.text, /general contractor/i);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(source.supportsGenerally.includes("Phase One cold-shell work was labeled completed in 2019"));
  assert.ok(source.supportsGenerally.includes("the Phase One value was listed as $189,629"));
  assert.ok(source.doesNotEstablish.includes("Jamie's general-contractor title"));
  assert.match(claim.internalClaim, /roof and TPO membrane work/);
  assert.ok(claim.boundaries.some((item) => /firsthand account/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /every construction trade/i.test(item)));
});

test("KC Town Hall survey records listening evidence while protecting people and attribution", () => {
  const claim = kcTownHallPhaseOneNeighborhoodClaims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY"
  );
  const intake = kcTownHallPhaseOneNeighborhoodIntake.find(
    (item) => item.id === "INT-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-2026-07-15"
  );
  const sourceIds = new Set(claim.evidence.map((item) => item.sourceId));

  assert.deepEqual(
    sourceIds,
    new Set([
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020"
    ])
  );
  assert.equal(
    claim.projections.find((item) => item.key === "archive-note").status,
    "hold"
  );
  assert.equal(claim.status, "confirmed-with-boundary");
  const caseStudyProjection = claim.projections.find(
    (item) => item.key === "case-study"
  );
  assert.equal(caseStudyProjection.status, "active");
  assert.match(caseStudyProjection.text, /directly shaped the plan/);
  assert.doesNotMatch(caseStudyProjection.text, /Jamie reports|Jamie designed/i);
  assert.ok(claim.boundaries.some((item) => /response count/i.test(item)));
  assert.ok(claim.boundaries.some((item) => /phone numbers/i.test(item)));
  assert.ok(intake.boundaries.some((item) => /New Horizon Missionary Baptist Church/i.test(item)));
});

test("Tired of Tires remains a bounded project-level operating claim", () => {
  const claim = kcTownHallPhaseOneNeighborhoodClaims.find(
    (item) => item.id === "CLM-TIRED-OF-TIRES-NEIGHBORHOOD-OPERATIONS"
  );
  const archiveSource = kcTownHallPhaseOneNeighborhoodSources.find(
    (item) => item.id === "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020"
  );
  const inquiry = kcTownHallPhaseOneNeighborhoodInquiries.find(
    (item) => item.id === "INQ-TIRED-OF-TIRES-JAMIE-ROLE"
  );

  assert.equal(claim.projections[0].status, "hold");
  assert.match(claim.internalClaim, /reports \$17,768/);
  assert.ok(claim.boundaries.some((item) => /project's published estimate/i.test(item)));
  assert.ok(claim.boundaries.some((item) => /Indian Mound.*pending/i.test(item)));
  assert.ok(archiveSource.doesNotEstablish.some((item) => /individual design/i.test(item)));
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(inquiry.limitations.some((item) => /No reviewed public source establishes the Indian Mound expansion/i.test(item)));
});

test("Cleveland Avenue remains an inquiry, not an accomplishment claim", () => {
  const intake = kcTownHallPhaseOneNeighborhoodIntake.find(
    (item) => item.id === "INT-CLEVELAND-UNIFY-BEAUTIFY-MEMORY-2026-07-15"
  );
  const inquiry = kcTownHallPhaseOneNeighborhoodInquiries.find(
    (item) => item.id === "INQ-CLEVELAND-UNIFY-BEAUTIFY-JAMIE-ROLE"
  );
  const source = kcTownHallPhaseOneNeighborhoodSources.find(
    (item) => item.id === "SRC-HENC-STRATEGIC-PLAN-2024"
  );

  assert.deepEqual(intake.claimIds, []);
  assert.deepEqual(intake.inquiryIds, [inquiry.id]);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(source.doesNotEstablish.includes("the Cleveland Avenue Unify to Beautify program"));
  assert.ok(source.doesNotEstablish.includes("Jamie's role in HENC or the Cleveland Avenue program"));
  assert.ok(
    kcTownHallPhaseOneNeighborhoodClaims.every(
      (claim) => !/CLEVELAND-UNIFY-BEAUTIFY/.test(claim.id)
    )
  );
});

test("KC fieldwork projects documented outcomes while holding personal role details", () => {
  assert.equal(kcTownHallPhaseOneNeighborhoodSources.length, 3);
  assert.equal(kcTownHallPhaseOneNeighborhoodClaims.length, 3);
  assert.equal(kcTownHallPhaseOneNeighborhoodInquiries.length, 4);
  assert.equal(kcTownHallPhaseOneNeighborhoodIntake.length, 4);

  const publicSurfaces = [
    readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8"),
    readFileSync("apps/www/src/data/proofs.ts", "utf8"),
    readFileSync("apps/www/src/data/work.ts", "utf8"),
    readFileSync("apps/www/src/app/resume/page.tsx", "utf8")
  ].join("\n");

  assert.doesNotMatch(publicSurfaces, /general contractor/i);
  assert.doesNotMatch(publicSurfaces, /Tired of Tires/i);
  assert.doesNotMatch(publicSurfaces, /Unify to Beautify/i);
  assert.match(publicSurfaces, /\$189,629/);
  assert.match(publicSurfaces, /directly shaped the (?:plan|proposal)/i);
  assert.doesNotMatch(
    JSON.stringify(kcTownHallPhaseOneNeighborhoodIntake),
    /\/Users\/|\/Volumes\/|supporting-materials|\.docx|\.xlsx/i
  );
});

test("NTER CHNG is source-backed, collectively credited, and held from hiring surfaces", () => {
  assert.equal(nterChngSources.length, 6);
  assert.equal(nterChngClaims.length, 1);
  assert.equal(nterChngInquiries.length, 1);
  assert.equal(nterChngIntake.length, 2);

  const claim = nterChngClaims[0];
  const archiveProjection = claim.projections.find(
    (item) => item.key === "archive-note"
  );
  const aboutProjection = claim.projections.find((item) => item.key === "about");
  const evidenceSourceIds = new Set(
    claim.evidence.map((relationship) => relationship.sourceId)
  );

  assert.equal(claim.status, "confirmed-with-boundary");
  assert.equal(archiveProjection.status, "active");
  assert.deepEqual(archiveProjection.surfaces, [
    "docs/knowledge-bank/projects/participatory-public-practice"
  ]);
  assert.equal(aboutProjection.status, "hold");
  assert.deepEqual(aboutProjection.surfaces, []);
  assert.deepEqual(
    evidenceSourceIds,
    new Set(nterChngSources.map((source) => source.id))
  );
  assert.match(claim.internalClaim, /Drew Bolton and Garrett Fuselier/);
  assert.ok(claim.boundaries.some((item) => /Mary Nichols/i.test(item)));
  assert.ok(claim.boundaries.some((item) => /Megan Mantia and Elisha Stetson/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /created NTER CHNG alone/i.test(item)));

  const protectedSources = nterChngSources.filter(
    (source) => source.visibility === "protected"
  );
  assert.deepEqual(
    new Set(protectedSources.map((source) => source.id)),
    new Set([
      "SRC-NTER-CHNG-INSTALLATION-PLAN-2011",
      "SRC-NTER-CHNG-EXHIBITION-TEXT-2010-2011"
    ])
  );
  assert.ok(
    protectedSources.every(
      (source) =>
        source.protectedLocatorId &&
        !source.canonicalUrl &&
        !source.archiveUrl &&
        !source.assetUrl
    )
  );
  assert.ok(
    claim.evidence
      .filter((relationship) =>
        protectedSources.some((source) => source.id === relationship.sourceId)
      )
      .every(
        (relationship) =>
          relationship.relationship === "private-support" &&
          relationship.renderCitation === false
      )
  );
  assert.ok(
    nterChngIntake.some(
      (record) =>
        record.visibility === "protected-summary" &&
        record.relatedIntakeIds.includes(
          "INT-NTER-CHNG-WAYBACK-EXHIBITION-2026-07-15"
        )
    )
  );
});

test("NTER CHNG evidence distinguishes exhibition inclusion from the Nerman stop", () => {
  const sourceById = new Map(nterChngSources.map((source) => [source.id, source]));
  const projectArchive = sourceById.get("SRC-NTER-CHNG-WAYBACK-2011");
  const exhibitionSource = sourceById.get(
    "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"
  );
  const nermanSource = sourceById.get("SRC-NERMAN-AMERICA-NOW-HERE-2011");
  const installationPlan = sourceById.get(
    "SRC-NTER-CHNG-INSTALLATION-PLAN-2011"
  );
  const inquiry = nterChngInquiries[0];

  assert.match(projectArchive.archiveUrl, /20110128193350/);
  assert.match(exhibitionSource.archiveUrl, /20121017090512/);
  assert.ok(
    exhibitionSource.supportsGenerally.includes(
      "NTER CHNG was presented within America: Now and Here's Kansas City program"
    )
  );
  assert.ok(
    nermanSource.doesNotEstablish.includes(
      "that NTER CHNG appeared at the Nerman Museum stop"
    )
  );
  assert.ok(
    installationPlan.supportsGenerally.includes(
      "Leedy-Voulkos was the intended installation site in the contemporaneous plan"
    )
  );
  assert.ok(
    installationPlan.doesNotEstablish.includes(
      "that Leedy-Voulkos was the completed presentation venue"
    )
  );
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(
    inquiry.limitations.some((item) => /press-release link was not captured/i.test(item))
  );
  assert.ok(
    inquiry.limitations.some(
      (item) =>
        /not independently confirmed as the completed America: Now and Here venue/i.test(
          item
        )
    )
  );
});

test("NTER CHNG does not silently enter the current website or resume", () => {
  const publicSurfaces = [
    readFileSync("apps/www/src/app/about/page.tsx", "utf8"),
    readFileSync("apps/www/src/app/resume/page.tsx", "utf8"),
    readFileSync("apps/www/src/data/proofs.ts", "utf8"),
    readFileSync("apps/www/src/data/work.ts", "utf8")
  ].join("\n");

  assert.doesNotMatch(publicSurfaces, /NTER CHNG/i);
  assert.doesNotMatch(publicSurfaces, /I Text, Therefore I Am/i);
  assert.doesNotMatch(publicSurfaces, /Drew Bolton|Garrett Fuselier/i);
});

test("iCloud archive production is source-backed, bounded, and fully dispositioned", () => {
  assert.equal(icloudArchiveSources.length, 13);
  assert.equal(icloudArchiveClaims.length, 6);
  assert.equal(icloudArchiveInquiries.length, 5);
  assert.equal(icloudArchiveIntake.length, 7);

  const sourceIds = new Set(icloudArchiveSources.map((source) => source.id));
  const claimIds = new Set(icloudArchiveClaims.map((claim) => claim.id));
  const inquiryIds = new Set(
    icloudArchiveInquiries.map((inquiry) => inquiry.id)
  );

  const maturedIntake = icloudArchiveIntake.filter(
    (record) => record.status === "matured"
  );
  const researchingIntake = icloudArchiveIntake.filter(
    (record) => record.status === "researching"
  );
  assert.equal(maturedIntake.length, 6);
  assert.ok(maturedIntake.every((record) => record.claimIds.length > 0));
  assert.equal(researchingIntake.length, 1);
  assert.ok(researchingIntake.every((record) => record.inquiryIds.length > 0));
  assert.deepEqual(
    new Set(icloudArchiveIntake.flatMap((record) => record.sourceIds)),
    sourceIds
  );
  assert.ok(
    icloudArchiveIntake
      .flatMap((record) => record.claimIds ?? [])
      .every((claimId) => claimIds.has(claimId))
  );
  assert.ok(
    icloudArchiveIntake
      .flatMap((record) => record.inquiryIds ?? [])
      .every((inquiryId) => inquiryIds.has(inquiryId))
  );

  const protectedSources = icloudArchiveSources.filter(
    (source) => source.visibility === "protected"
  );
  assert.ok(
    protectedSources.every(
      (source) =>
        source.protectedLocatorId &&
        !source.canonicalUrl &&
        !source.archiveUrl &&
        !source.assetUrl
    )
  );
  const protectedSourceIds = new Set(
    protectedSources.map((source) => source.id)
  );
  assert.ok(
    icloudArchiveClaims
      .flatMap((claim) => claim.evidence)
      .filter((relationship) => protectedSourceIds.has(relationship.sourceId))
      .every(
        (relationship) =>
          relationship.relationship === "private-support" &&
          relationship.renderCitation === false
      )
  );

  const serialized = JSON.stringify({
    intake: icloudArchiveIntake,
    sources: icloudArchiveSources,
    claims: icloudArchiveClaims,
    inquiries: icloudArchiveInquiries
  });
  assert.doesNotMatch(
    serialized,
    /\/Users\/|\/Volumes\/|Mobile Documents|CloudDocs|supporting-materials/i
  );
});

test("iCloud follow-up separates public proof, protected operations, and research control", () => {
  const sourceById = new Map(
    icloudArchiveSources.map((source) => [source.id, source])
  );
  const claimById = new Map(
    icloudArchiveClaims.map((claim) => [claim.id, claim])
  );
  const inquiryById = new Map(
    icloudArchiveInquiries.map((inquiry) => [inquiry.id, inquiry])
  );

  const musicSource = sourceById.get("SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013");
  const musicClaim = claimById.get("CLM-MUSIC-HACKATHON-SORTED-AUDIO");
  assert.equal(musicSource.visibility, "public");
  assert.equal(
    musicSource.canonicalUrl,
    "https://monthlymusichackathon.org/post/44177616179/sortedaudio"
  );
  assert.match(musicClaim.internalClaim, /Max\/MSP.*segments.*pitch/i);
  assert.equal(
    musicClaim.projections.find((item) => item.key === "about").status,
    "hold"
  );
  assert.ok(musicClaim.antiClaims.some((item) => /organized/i.test(item)));

  const operatingSource = sourceById.get(
    "SRC-CRS-POWER-MAP-MESSAGING-GRID-2026"
  );
  const campaignMemory = claimById.get(
    "CLM-CRS-CAMPAIGN-MEMORY-INFRASTRUCTURE"
  );
  assert.equal(operatingSource.visibility, "protected");
  assert.equal(operatingSource.canonicalUrl, undefined);
  assert.ok(
    campaignMemory.evidence.some(
      (item) =>
        item.sourceId === operatingSource.id &&
        item.relationship === "private-support" &&
        item.renderCitation === false
    )
  );
  assert.match(
    campaignMemory.projections.find(
      (item) => item.key === "technical-operations"
    ).text,
    /stakeholder power mapping/i
  );
  assert.ok(
    campaignMemory.boundaries.some((item) => /collectively approved or completed/i.test(item))
  );

  const controlSource = sourceById.get("SRC-JOB-HUNT-CONTEXT-OUTLINE-2026");
  const proofAudit = inquiryById.get("INQ-JOB-HUNT-PROOF-COVERAGE-2026");
  assert.equal(controlSource.visibility, "protected");
  assert.ok(
    icloudArchiveClaims.every((claim) =>
      claim.evidence.every((item) => item.sourceId !== controlSource.id)
    )
  );
  assert.equal(proofAudit.resultStatus, "partially-recovered");
  assert.ok(proofAudit.findings.some((item) => /2x revenue.*careful/i.test(item)));
  assert.ok(proofAudit.findings.some((item) => /20\+ resident-artist.*partially/i.test(item)));
});

test("iCloud claims preserve Chad's lens without erasing boundaries", () => {
  const claimById = new Map(icloudArchiveClaims.map((claim) => [claim.id, claim]));
  const horseLords = claimById.get("CLM-HORSE-LORDS-TRUTHERS-VIDEO");
  const campaignMemory = claimById.get(
    "CLM-CRS-CAMPAIGN-MEMORY-INFRASTRUCTURE"
  );
  const redline = claimById.get(
    "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE"
  );
  const teamMemory = claimById.get("CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD");
  const aiEvals = claimById.get("CLM-AI-EVALS-PROFESSIONAL-DEVELOPMENT");
  const musicHackathon = claimById.get(
    "CLM-MUSIC-HACKATHON-SORTED-AUDIO"
  );

  assert.match(horseLords.internalClaim, /co-created.*M\.C\. Schmidt/i);
  assert.ok(horseLords.antiClaims.some((item) => /alone/i.test(item)));
  assert.equal(
    horseLords.projections.find((item) => item.key === "about").status,
    "hold"
  );

  assert.match(campaignMemory.internalClaim, /30\+ pages/i);
  assert.equal(campaignMemory.status, "use-with-care");
  assert.ok(
    campaignMemory.boundaries.some((item) => /approximate aggregate/i.test(item))
  );
  assert.ok(
    campaignMemory.boundaries.some((item) => /collective-work language/i.test(item))
  );

  assert.match(redline.internalClaim, /ten-page legislative provenance redline/i);
  assert.ok(redline.boundaries.some((item) => /not legal advice/i.test(item)));
  assert.ok(
    redline.antiClaims.some((item) => /authored the .* legislation/i.test(item))
  );

  assert.equal(teamMemory.status, "use-with-care");
  assert.ok(
    teamMemory.antiClaims.some((item) => /production AI memory platform/i.test(item))
  );
  assert.ok(teamMemory.boundaries.some((item) => /Human review/i.test(item)));

  assert.equal(aiEvals.status, "confirmed-with-boundary");
  assert.match(aiEvals.internalClaim, /completed/i);
  assert.ok(
    aiEvals.boundaries.some((item) => /professional licensure/i.test(item))
  );

  assert.match(musicHackathon.internalClaim, /built a Max\/MSP program/i);
  assert.ok(
    musicHackathon.boundaries.some((item) => /source song/i.test(item))
  );
  assert.equal(
    musicHackathon.projections.find((item) => item.key === "about").status,
    "hold"
  );

  const expectedProofLinks = new Map([
    ["fair-rent-campaign-memory", campaignMemory.id],
    ["fair-rent-source-map", redline.id],
    ["source-backed-team-memory-method", teamMemory.id],
    ["ai-evals-professional-development", aiEvals.id]
  ]);
  for (const [proofId, claimId] of expectedProofLinks) {
    const proof = proofClaims.find((item) => item.id === proofId);
    assert.ok(proof.canonicalClaimIds.includes(claimId));
  }
});

test("campaign press ingestion is complete, deduplicated, and archived", () => {
  assert.deepEqual(
    campaignPressManifests.map((manifest) => manifest.articleSourceIds.length),
    [21, 7, 8, 9]
  );
  assert.equal(
    campaignPressManifests.reduce(
      (count, manifest) => count + manifest.articleSourceIds.length,
      0
    ),
    45
  );
  assert.equal(campaignPressArticleSourceIds.length, 44);
  assert.equal(campaignPressSources.length, 45);
  assert.equal(campaignPressClaims.length, 1);
  assert.equal(campaignPressIntake.length, 4);
  assert.equal(campaignPressInquiries.length, 1);

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  for (const sourceId of campaignPressArticleSourceIds) {
    const source = sourceById.get(sourceId);
    assert.ok(source, `Missing campaign press source ${sourceId}`);
    assert.match(source.archiveUrl ?? "", /^https:\/\/web\.archive\.org\/web\//);
  }
  for (const manifest of campaignPressManifests) {
    const indexSource = sourceById.get(manifest.indexSourceId);
    assert.ok(indexSource, `Missing campaign index ${manifest.indexSourceId}`);
    assert.match(
      indexSource.archiveUrl ?? "",
      /^https:\/\/web\.archive\.org\/web\//
    );
    assert.ok(indexSource.capturedAt, `${manifest.indexSourceId} lacks capturedAt`);
  }

  const duplicatePlacements = campaignPressManifests
    .flatMap((manifest) => manifest.articleSourceIds)
    .filter(
      (sourceId, index, placements) => placements.indexOf(sourceId) !== index
    );
  assert.deepEqual(duplicatePlacements, ["SRC-NYCAC-NPR-2017-09-20"]);
  assert.ok(
    campaignPressIntake.every(
      (record) =>
        record.status === "researching" &&
        record.inquiryIds.includes("INQ-NYCAC-CAMPAIGN-PRESS-CORPUS")
    )
  );
  assert.deepEqual(
    campaignPressClaims[0].evidence.map((relationship) => relationship.sourceId),
    campaignPressManifests.map((manifest) => manifest.indexSourceId)
  );
  assert.equal(campaignPressClaims[0].projections[0].status, "hold");
  assert.deepEqual(campaignPressClaims[0].projections[0].surfaces, []);
});

test("campaign press manifests are reproducible from capture-derived placements", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  assert.equal(campaignPressCaptureInventory.version, 1);
  assert.equal(campaignPressCaptureInventory.captures.length, 4);
  assert.equal(campaignPressCaptureInventory.placements.length, 45);

  for (const manifest of campaignPressManifests) {
    const capture = campaignPressCaptureInventory.captures.find(
      (item) => item.campaignId === manifest.campaignId
    );
    const placements = campaignPressCaptureInventory.placements.filter(
      (item) => item.campaignId === manifest.campaignId
    );
    const indexSource = sourceById.get(manifest.indexSourceId);

    assert.ok(capture, `Missing capture fixture for ${manifest.campaignId}`);
    assert.equal(capture.indexSourceId, manifest.indexSourceId);
    assert.equal(capture.placementCount, placements.length);
    assert.equal(capture.captureUrl, indexSource.archiveUrl);
    assert.equal(capture.capturedAt, indexSource.capturedAt);
    assert.deepEqual(
      placements.map((item) => item.ordinal),
      Array.from({ length: placements.length }, (_, index) => index + 1)
    );
    assert.deepEqual(
      placements.map((item) => item.sourceId),
      manifest.articleSourceIds
    );

    for (const placement of placements) {
      assert.doesNotThrow(() => new URL(placement.listedUrl));
      const source = sourceById.get(placement.sourceId);
      assert.ok(source, `Missing source ${placement.sourceId}`);
      const archivedOriginalUrl = source.archiveUrl?.match(
        /^https:\/\/web\.archive\.org\/web\/\d{14}\/(.+)$/
      )?.[1];
      assert.ok(
        [source.canonicalUrl, archivedOriginalUrl]
          .filter(Boolean)
          .map(normalizeSourceUrl)
          .includes(normalizeSourceUrl(placement.listedUrl)),
        `${placement.sourceId} does not preserve its capture-listed URL`
      );
    }
  }

  const repeatedPlacements = campaignPressCaptureInventory.placements.filter(
    (item) => item.duplicateDisposition !== "unique"
  );
  assert.deepEqual(
    repeatedPlacements.map((item) => [
      item.campaignId,
      item.sourceId,
      item.duplicateDisposition
    ]),
    [
      [
        "let-nyc-dance",
        "SRC-NYCAC-NPR-2017-09-20",
        "shared-with-save-nyc-spaces"
      ],
      [
        "save-nyc-spaces",
        "SRC-NYCAC-NPR-2017-09-20",
        "shared-with-let-nyc-dance"
      ]
    ]
  );
});

test("campaign press sources cannot silently become personal claims", () => {
  const newArticleIds = new Set(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .map((source) => source.id)
  );
  const promotedRelationships = knowledgeBank.claims.flatMap((claim) =>
    claim.evidence.filter((relationship) =>
      newArticleIds.has(relationship.sourceId)
    )
  );
  assert.deepEqual(promotedRelationships, []);
  assert.ok(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .every((source) =>
        source.doesNotEstablish.some((boundary) =>
          boundary.includes("Jamie's authorship")
        )
      )
  );
  assert.ok(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .every(
        (source) =>
          source.supportsGenerally.length === 1 &&
          source.supportsGenerally[0].includes("Press section listed this article")
      )
  );

  const dossier = readFileSync(
    "docs/knowledge-bank/projects/nyc-artist-coalition-press.md",
    "utf8"
  );
  for (const sourceId of campaignPressArticleSourceIds) {
    assert.match(dossier, new RegExp(sourceId));
  }
});

test("new evidence returns to every linked research inquiry", () => {
  const inquiryById = new Map(
    knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
  );
  const newSourceIds = new Set(sourceExpansionSources.map((source) => source.id));
  const expandedClaims = knowledgeBank.claims.filter((claim) =>
    claim.evidence.some((relationship) => newSourceIds.has(relationship.sourceId))
  );

  for (const claim of expandedClaims) {
    for (const inquiryId of claim.researchInquiryIds) {
      const inquiry = inquiryById.get(inquiryId);
      const relevantSourceIds = claim.evidence
        .map((relationship) => relationship.sourceId)
        .filter((sourceId) => newSourceIds.has(sourceId));
      assert.ok(inquiry, `Missing inquiry ${inquiryId}`);
      assert.ok(
        relevantSourceIds.every((sourceId) => inquiry.sourceIds.includes(sourceId)),
        `${inquiryId} omits new evidence for ${claim.id}`
      );
    }
  }

  for (const intake of sourceExpansionIntake) {
    for (const inquiryId of intake.inquiryIds ?? []) {
      const inquiry = inquiryById.get(inquiryId);
      assert.ok(inquiry, `Missing inquiry ${inquiryId}`);
      assert.ok(
        intake.sourceIds.every((sourceId) => inquiry.sourceIds.includes(sourceId)),
        `${inquiryId} omits intake evidence for ${intake.id}`
      );
    }
  }
});

test("Google Drive archive production is bounded, dispositioned, and public-safe", () => {
  assert.equal(googleDriveArchiveSources.length, 11);
  assert.equal(googleDriveArchiveClaims.length, 3);
  assert.equal(googleDriveArchiveInquiries.length, 7);
  assert.equal(googleDriveArchiveIntake.length, 7);

  assert.ok(
    googleDriveArchiveSources.every(
      (source) =>
        source.visibility === "protected" &&
        source.preservationStatus === "private" &&
        source.protectedLocatorId
    )
  );
  assert.ok(
    googleDriveArchiveSources.every(
      (source) =>
        !source.canonicalUrl && !source.archiveUrl && !source.assetUrl
    )
  );

  const serialized = JSON.stringify({
    sources: googleDriveArchiveSources,
    claims: googleDriveArchiveClaims,
    inquiries: googleDriveArchiveInquiries,
    intake: googleDriveArchiveIntake
  });
  assert.doesNotMatch(serialized, /drive\.google|docs\.google|\/Users\/|\/Volumes\//i);

  const sourceIds = new Set(googleDriveArchiveSources.map((source) => source.id));
  const disposedSourceIds = new Set(
    googleDriveArchiveIntake.flatMap((record) => record.sourceIds)
  );
  assert.deepEqual(disposedSourceIds, sourceIds);

  const inventory = googleDriveArchiveSources.find(
    (source) => source.id === "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026"
  );
  const triage = googleDriveArchiveInquiries.find(
    (inquiry) => inquiry.id === "INQ-GDRIVE-SHARED-DRIVE-TRIAGE-2026"
  );
  assert.ok(inventory.supportsGenerally.some((item) => /110 Shared Drive roots/.test(item)));
  assert.ok(inventory.doesNotEstablish.some((item) => /exhaustive review/i.test(item)));
  assert.deepEqual(new Set(triage.sourceIds), sourceIds);
  assert.ok(triage.limitations.some((item) => /bounded professional sample/i.test(item)));
});

test("Google Drive findings promote only what the reviewed records establish", () => {
  const claimsById = new Map(
    googleDriveArchiveClaims.map((claim) => [claim.id, claim])
  );
  const sourcesById = new Map(
    googleDriveArchiveSources.map((source) => [source.id, source])
  );

  const vacancy = claimsById.get("CLM-COMMERCIAL-VACANCY-PILOT-BRIEF-2026");
  assert.equal(vacancy.status, "confirmed-with-boundary");
  assert.ok(
    vacancy.projections.some(
      (projection) =>
        projection.key === "technical-operations" &&
        projection.status === "active"
    )
  );
  assert.ok(vacancy.antiClaims.some((item) => /commissioned or adopted/i.test(item)));
  assert.ok(vacancy.boundaries.some((item) => /external event listing/i.test(item)));

  const web = claimsById.get("CLM-FAIR-RENT-WEB-OPERATIONS-2023");
  assert.match(web.projections[0].text, /collaborative FairRentNYC web-operations queue/);
  assert.ok(web.boundaries.some((item) => /not the complete history/i.test(item)));
  assert.ok(web.antiClaims.some((item) => /every listed task alone/i.test(item)));

  const participation = claimsById.get(
    "CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS"
  );
  assert.match(participation.internalClaim, /345 prefixed event columns/);
  assert.ok(
    participation.boundaries.some((item) => /20-plus resident-artist aggregate/i.test(item))
  );
  assert.ok(
    sourcesById
      .get("SRC-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021")
      .doesNotEstablish.includes("the 20-plus resident-artist aggregate")
  );

  const proofById = new Map(proofClaims.map((proof) => [proof.id, proof]));
  assert.ok(
    proofById
      .get("fair-rent-source-map")
      .canonicalClaimIds.includes(vacancy.id)
  );
  assert.deepEqual(
    proofById.get("nyc-artist-coalition-public-web-infrastructure").canonicalClaimIds,
    [web.id, "CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT"]
  );
  assert.deepEqual(
    proofById.get("sunday-dinner-196-participation-infrastructure").canonicalClaimIds,
    [participation.id, "CLM-SUNDAY-DINNER-ATTENDANCE-LEDGER-STRUCTURE"]
  );
});

test("participation lineage is strong, bounded, and newspaper safe", () => {
  assert.equal(participationLineageSources.length, 4);
  assert.equal(participationLineageClaims.length, 2);
  assert.equal(participationLineageInquiries.length, 2);
  assert.equal(participationLineageIntake.length, 3);

  const sourceById = new Map(
    participationLineageSources.map((source) => [source.id, source])
  );
  const claimById = new Map(
    participationLineageClaims.map((claim) => [claim.id, claim])
  );

  const database = sourceById.get("SRC-WOWLIST-CIVIC-LINEAGE-AGGREGATES-2017");
  assert.equal(database.visibility, "protected");
  assert.match(database.publicNote, /Popular Vote/);
  assert.match(database.publicNote, /NYC Artist Coalition/);
  assert.ok(database.doesNotEstablish.some((item) => /unique people/i.test(item)));

  const sunday = claimById.get(
    "CLM-SUNDAY-DINNER-ATTENDANCE-LEDGER-STRUCTURE"
  );
  assert.match(sunday.internalClaim, /2,714 affirmative attendance marks/);
  assert.ok(sunday.antiClaims.includes("Sunday Dinner had 2,714 unique attendees."));
  assert.ok(sunday.antiClaims.includes("The workbook proves 2,714 meals were served."));
  assert.ok(
    sunday.boundaries.some((item) => /person-level attendance/i.test(item))
  );

  const lineage = claimById.get("CLM-WOWLIST-CIVIC-PARTICIPATION-LINEAGE");
  assert.ok(
    lineage.projections.some(
      (projection) =>
        projection.key === "case-study" &&
        projection.status === "active" &&
        projection.surfaces.includes("/work/wowlist")
    )
  );
  for (const antiClaim of [
    "Jamie solely founded or produced NYC Artist Coalition.",
    "The January 2017 event response label proves 445 people attended.",
    "Database follows, stars, event rows, or calendar mappings equal unique participants or endorsements."
  ]) {
    assert.ok(lineage.antiClaims.includes(antiClaim));
  }

  const callScript = sourceById.get(
    "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017"
  );
  assert.match(callScript.canonicalUrl, /388137698233507/);
  assert.ok(
    callScript.doesNotEstablish.some((item) => /who authored every Page post/i.test(item))
  );

  const serialized = JSON.stringify({
    sources: participationLineageSources,
    claims: participationLineageClaims,
    inquiries: participationLineageInquiries,
    intake: participationLineageIntake
  });
  assert.doesNotMatch(serialized, /\/Users\/|\/Volumes\/|docs\.google\.com\/spreadsheets/);
  assert.doesNotMatch(serialized, /Talking with people:/);
});

test("NYCAC DCLA and Council interface separates record, role, and inference", () => {
  assert.equal(nycacDclaCouncilSources.length, 6);
  assert.equal(nycacDclaCouncilClaims.length, 3);
  assert.equal(nycacDclaCouncilInquiries.length, 2);
  assert.equal(nycacDclaCouncilIntake.length, 1);

  const sourceById = new Map(
    nycacDclaCouncilSources.map((source) => [source.id, source])
  );
  const claimById = new Map(
    nycacDclaCouncilClaims.map((claim) => [claim.id, claim])
  );
  const transcript = sourceById.get(
    "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017"
  );

  assert.match(transcript.canonicalUrl, /ID=5271559/);
  assert.match(transcript.publicNote, /direct public feedback/i);
  assert.ok(
    transcript.doesNotEstablish.some((item) => /DCLA created, owned, directed/i.test(item))
  );

  const finkelpearl = claimById.get(
    "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"
  );
  assert.equal(finkelpearl.status, "confirmed-with-boundary");
  assert.ok(
    finkelpearl.antiClaims.includes("Finkelpearl endorsed Jamie personally.")
  );
  assert.ok(
    finkelpearl.projections.every(
      (projection) => projection.key !== "case-study" || projection.status === "hold"
    )
  );

  const jamie = claimById.get("CLM-NYCAC-JAMIE-CIVIC-TRANSLATION");
  assert.match(jamie.internalClaim, /interface between informal cultural communities and City government/i);
  assert.ok(jamie.boundaries.some((item) => /collective program production/i.test(item)));

  const institutional = claimById.get(
    "CLM-NYCAC-INSTITUTIONAL-INTERFACE-VALUE"
  );
  assert.equal(institutional.status, "inference");
  assert.ok(institutional.boundaries.some((item) => /institutional analysis/i.test(item)));
  for (const antiClaim of [
    "Finkelpearl, DCLA, Espinal, or the Council needed Jamie personally.",
    "NYC Artist Coalition spoke for every artist or cultural space.",
    "The coalition's usefulness proves that it caused legislation."
  ]) {
    assert.ok(institutional.antiClaims.includes(antiClaim));
  }

  const referenceInquiry = nycacDclaCouncilInquiries.find(
    (inquiry) => inquiry.id === "INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCES"
  );
  assert.equal(referenceInquiry.resultStatus, "recovered");
  assert.match(referenceInquiry.publicSummary, /30 Cultural Affairs meeting records/);
  assert.match(referenceInquiry.publicSummary, /24 Finkelpearl-bearing transcripts/);
  assert.ok(referenceInquiry.limitations.some((item) => /not every attachment/i.test(item)));

  const serialized = JSON.stringify({
    sources: nycacDclaCouncilSources,
    claims: nycacDclaCouncilClaims,
    inquiries: nycacDclaCouncilInquiries,
    intake: nycacDclaCouncilIntake
  });
  assert.doesNotMatch(serialized, /\/Users\/|\/Volumes\/|authenticatedAs|sessionIdentity/i);
  assert.doesNotMatch(serialized, /Finkelpearl needed Jamie\./i);
});

test("unresolved Shared Drive artifacts remain inquiries, not accomplishments", () => {
  const wowIntake = googleDriveArchiveIntake.find(
    (record) => record.id === "INT-GDRIVE-WOWLIST-MEMBERS-MEETING-2026-07-15"
  );
  const brandIntake = googleDriveArchiveIntake.find(
    (record) => record.id === "INT-GDRIVE-SBU-BRAND-GUIDE-SEED-2026-07-15"
  );
  const mediaIntake = googleDriveArchiveIntake.find(
    (record) => record.id === "INT-GDRIVE-PROTECTED-MEDIA-LEADS-2026-07-15"
  );
  assert.equal(wowIntake.status, "researching");
  assert.deepEqual(wowIntake.claimIds ?? [], []);
  assert.equal(brandIntake.status, "researching");
  assert.deepEqual(brandIntake.claimIds ?? [], []);
  assert.equal(mediaIntake.status, "researching");
  assert.deepEqual(mediaIntake.claimIds ?? [], []);
  assert.equal(mediaIntake.sourceIds.length, 4);
  assert.equal(mediaIntake.inquiryIds.length, 4);

  const protectedMediaSources = googleDriveArchiveSources.filter((source) =>
    mediaIntake.sourceIds.includes(source.id)
  );
  assert.ok(
    protectedMediaSources.every(
      (source) => source.media?.publicDisplayStatus !== "cleared"
    )
  );

  const publicSurfaces = [
    readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8"),
    readFileSync("apps/www/src/content/work/196-sunday-dinner.mdx", "utf8"),
    readFileSync("apps/www/src/app/work/technical-operations/page.tsx", "utf8")
  ].join("\n");
  assert.doesNotMatch(
    publicSurfaces,
    /members-meeting video|brand-guide seed|Save Jimmy's Corner|Dumpster Day|digital-gathering archive|Council District map package/i
  );
  assert.match(publicSurfaces, /CLM-COMMERCIAL-VACANCY-PILOT-BRIEF-2026/);
  assert.match(publicSurfaces, /CLM-FAIR-RENT-WEB-OPERATIONS-2023/);
  assert.match(publicSurfaces, /CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS/);
});

test("intake cannot reference unknown sources", () => {
  const candidate = cloneBank();
  candidate.intake[0].sourceIds.push("SRC-UNKNOWN");
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /references unknown source SRC-UNKNOWN/
  );
});

test("claims cannot reference unknown evidence sources or inquiries", () => {
  const missingSource = cloneBank();
  missingSource.claims[0].evidence[0].sourceId = "SRC-UNKNOWN";
  assert.match(
    validateKnowledgeLifecycle(missingSource, proofClaims).join("\n"),
    /Claim .* references unknown evidence source SRC-UNKNOWN/
  );

  const missingInquiry = cloneBank();
  missingInquiry.claims[0].researchInquiryIds.push("INQ-UNKNOWN");
  assert.match(
    validateKnowledgeLifecycle(missingInquiry, proofClaims).join("\n"),
    /Claim .* references unknown inquiry INQ-UNKNOWN/
  );
});

test("inquiries and corrections cannot reference unknown graph records", () => {
  const missingSource = cloneBank();
  missingSource.researchInquiries[0].sourceIds.push("SRC-UNKNOWN");
  assert.match(
    validateKnowledgeLifecycle(missingSource, proofClaims).join("\n"),
    /Inquiry .* references unknown source SRC-UNKNOWN/
  );

  const missingClaim = cloneBank();
  missingClaim.corrections[0].claimId = "CLM-UNKNOWN";
  assert.match(
    validateKnowledgeLifecycle(missingClaim, proofClaims).join("\n"),
    /Correction .* references unknown claim CLM-UNKNOWN/
  );
});

test("claims and inquiries cannot exist without an intake disposition", () => {
  const orphanClaim = cloneBank();
  const claimId = orphanClaim.claims[0].id;
  orphanClaim.intake.forEach((item) => {
    item.claimIds = item.claimIds.filter((id) => id !== claimId);
  });
  assert.match(
    validateKnowledgeLifecycle(orphanClaim, proofClaims).join("\n"),
    new RegExp(`Claim ${claimId} has no intake disposition`)
  );

  const orphanInquiry = cloneBank();
  const inquiryId = orphanInquiry.researchInquiries[0].id;
  orphanInquiry.intake.forEach((item) => {
    item.inquiryIds = item.inquiryIds.filter((id) => id !== inquiryId);
  });
  assert.match(
    validateKnowledgeLifecycle(orphanInquiry, proofClaims).join("\n"),
    new RegExp(`Inquiry ${inquiryId} has no intake disposition`)
  );
});

test("citation pages cannot contain broken or out-of-order graph references", () => {
  const missingPageSource = cloneBank();
  missingPageSource.pages[0].sourceOrder.push("SRC-UNKNOWN");
  assert.match(
    validateKnowledgeLifecycle(missingPageSource, proofClaims).join("\n"),
    /Citation page .* references unknown source SRC-UNKNOWN/
  );

  const missingOccurrenceClaim = cloneBank();
  missingOccurrenceClaim.pages[0].occurrences[0].claimId = "CLM-UNKNOWN";
  assert.match(
    validateKnowledgeLifecycle(missingOccurrenceClaim, proofClaims).join("\n"),
    /Citation occurrence .* references unknown claim CLM-UNKNOWN/
  );

  const missingOccurrenceSource = cloneBank();
  missingOccurrenceSource.pages[0].occurrences[0].sourceIds = ["SRC-UNKNOWN"];
  assert.match(
    validateKnowledgeLifecycle(missingOccurrenceSource, proofClaims).join("\n"),
    /Citation occurrence .* references unknown source SRC-UNKNOWN/
  );

  const outsideSourceOrder = cloneBank();
  const page = outsideSourceOrder.pages[0];
  const sourceId = page.occurrences[0].sourceIds[0];
  page.sourceOrder = page.sourceOrder.filter((id) => id !== sourceId);
  assert.match(
    validateKnowledgeLifecycle(outsideSourceOrder, proofClaims).join("\n"),
    /Citation occurrence .* uses source .* outside the page source order/
  );
});

test("corrections cannot exist without an intake disposition", () => {
  const candidate = cloneBank();
  candidate.intake.forEach((item) => {
    item.correctionIds = [];
  });
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Correction COR-CALLNYC-CHRONOLOGY-2026 has no intake disposition/
  );
});

test("matured intake must retain a claim disposition", () => {
  const candidate = cloneBank();
  candidate.intake.find((item) => item.status === "matured").claimIds = [];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Matured intake .* has no claim/
  );
});

test("photo leads cannot bypass research", () => {
  const candidate = cloneBank();
  const photoLead = candidate.intake.find((item) => item.kind === "photo-lead");
  photoLead.claimIds = [candidate.claims[0].id];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Photo lead .* bypasses research/
  );
});

test("reader feedback cannot become accomplishment evidence", () => {
  const candidate = cloneBank();
  const feedback = candidate.intake.find((item) => item.kind === "reader-feedback");
  feedback.claimIds = ["CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Reader feedback .* bypasses governance and links directly to a claim/
  );
});

test("every projection requires a compositional rationale", () => {
  const candidate = cloneBank();
  const claim = candidate.claims.find((item) =>
    item.projections.some((projection) => projection.status === "hold")
  );
  claim.projections.find((projection) => projection.status === "hold").rationale = undefined;
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Projection .* has no rationale/
  );
});

test("a claim cannot use a source for an explicitly excluded proposition", () => {
  const candidate = cloneBank();
  const relationship = candidate.claims[0].evidence[0];
  const source = candidate.sources.find((item) => item.id === relationship.sourceId);
  source.doesNotEstablish.push(relationship.supports[0]);
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /uses .* to support a proposition the source does not establish/
  );
});

test("high-risk projections retain their evidence posture", () => {
  const byId = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  assert.match(
    byId.get("CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS").projections[0].text,
    /portfolio presents .* historical evidence/i
  );
  assert.match(
    byId.get("CLM-WATERWAYS-RAFT-EXPEDITION").projections.find((item) => item.key === "about").text,
    /Gulf of Mexico/i
  );
  assert.match(
    byId.get("CLM-TALKS-NOT-RAIDS-ADVOCACY").projections.find((item) => item.key === "case-study").text,
    /Testified .* supported the coalition's .* campaign/i
  );
  const waterwaysProof = proofClaims.find(
    (proof) => proof.id === "waterways-participatory-practice"
  );
  assert.match(waterwaysProof.publicWording, /Gulf of Mexico/i);
  assert.ok(
    readFileSync("docs/knowledge-bank/claims.md", "utf8").includes(
      `**Public wording:** ${waterwaysProof.publicWording}`
    )
  );
  const participatoryProject = readFileSync(
    "docs/knowledge-bank/projects/participatory-public-practice.md",
    "utf8"
  );
  assert.match(participatoryProject, /Gulf of Mexico/);
  assert.match(participatoryProject, /8th Street Tunnel/);
  assert.match(participatoryProject, /Claudette/);
  assert.doesNotMatch(participatoryProject, /Use "reached salt water"/);
  const claudetteAbout = byId
    .get("CLM-CLAUDETTE-AR-COLLABORATION")
    .projections.find((item) => item.key === "about").text;
  for (const credit of [
    "Michael Rees",
    "Anne Dufy Burkart",
    "Julia Fredenberg",
    "Claudette"
  ]) {
    assert.match(claudetteAbout, new RegExp(credit));
  }
  const coalitionProject = readFileSync(
    "docs/knowledge-bank/projects/nyc-artist-coalition.md",
    "utf8"
  );
  assert.match(coalitionProject, /Save NYC Spaces/);
  assert.match(coalitionProject, /commercial-rent protections/);
  const marchProof = proofClaims.find(
    (proof) => proof.id === "march-transparency-to-cure"
  );
  assert.match(marchProof.publicWording, /^Advocated M\.A\.R\.C\.H\. transparency/);
  assert.match(marchProof.detailedPublicWording, /does not establish .* caused/i);
  assert.doesNotMatch(marchProof.publicWording, /^Contributed to/);
});

test("reader feedback resolves to a public governance artifact", () => {
  const feedback = knowledgeBank.intake.find((item) => item.kind === "reader-feedback");
  assert.equal(feedback.disposition, "governance-updated");
  assert.ok(feedback.artifactPaths.length > 0);
  assert.deepEqual(feedback.inquiryIds, [
    "INQ-READER-FEEDBACK-PROJECTION-GOVERNANCE"
  ]);
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("governance artifacts alone cannot dispose active intake", () => {
  const candidate = cloneBank();
  const feedback = candidate.intake.find((item) => item.kind === "reader-feedback");
  feedback.inquiryIds = [];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Intake INT-READER-FEEDBACK-.* has no source, inquiry, claim, or correction disposition/
  );
});

test("a concrete claim-generated photo lead returns to inquiry", () => {
  const lead = knowledgeBank.intake.find(
    (item) => item.id === "INT-WATERWAYS-PHOTO-LEAD-2026-07-12"
  );
  assert.equal(lead.status, "researching");
  assert.deepEqual(lead.claimIds, []);
  assert.deepEqual(lead.inquiryIds, ["INQ-WATERWAYS-PHOTO-SELECTS"]);
});

test("unlinked proof claims remain visible research backlog", () => {
  const report = knowledgeLifecycleReport();
  assert.ok(report.canonicallyLinkedProofIds.length > 0);
  assert.ok(report.proofResearchBacklogIds.length > 0);
  assert.equal(
    report.canonicallyLinkedProofIds.length + report.proofResearchBacklogIds.length,
    proofClaims.length
  );
  assert.equal(report.proofProjectionDecisions.length, proofClaims.length);
  assert.ok(
    report.proofProjectionDecisions.every(
      (decision) =>
        decision.surfaces.length > 0 && decision.rationale && decision.guardrail
    )
  );
});
