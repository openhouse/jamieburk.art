import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateKnowledgeDevelopmentSuite } from "../check-knowledge-development-evals.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  nycacResearchCaptures,
  nycacResearchClaims,
  nycacResearchObservations,
  nycacResearchSources,
  nycacResearchTasks,
} from "../../apps/www/src/data/knowledge-bank/nycac-research-2026-07-14.ts";
import {
  campaignPressArchiveUrlFor,
  campaignPressArticleSourceIds,
  campaignPressCaptures,
  campaignPressClaims,
  campaignPressManifests,
  campaignPressObservations,
  campaignPressResearchTasks,
  campaignPressSources,
} from "../../apps/www/src/data/knowledge-bank/campaign-press.ts";
import {
  kcTownHallFundingCaptures,
  kcTownHallFundingClaims,
  kcTownHallFundingCorrections,
  kcTownHallFundingInquiries,
  kcTownHallFundingObservations,
  kcTownHallFundingSources,
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import {
  kcTownHallPhaseOneCaptures,
  kcTownHallPhaseOneClaims,
  kcTownHallPhaseOneInquiries,
  kcTownHallPhaseOneObservations,
  kcTownHallPhaseOneResearchTasks,
  kcTownHallPhaseOneSources,
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-phase-one.ts";
import {
  teamsArchiveCaptures,
  teamsArchiveClaims,
  teamsArchiveInquiries,
  teamsArchiveObservations,
  teamsArchiveResearchTasks,
  teamsArchiveSources,
} from "../../apps/www/src/data/knowledge-bank/teams-archive.ts";
import {
  googleSharedDriveCaptures,
  googleSharedDriveClaims,
  googleSharedDriveInquiries,
  googleSharedDriveObservations,
  googleSharedDriveResearchTasks,
  googleSharedDriveReviewSummary,
  googleSharedDriveSources,
} from "../../apps/www/src/data/knowledge-bank/google-shared-drives.ts";
import {
  projectSocialAccounts,
  socialMediaCaptures,
  socialMediaClaims,
  socialMediaInquiries,
  socialMediaObservations,
  socialMediaResearchTasks,
  socialMediaReviewSummary,
  socialMediaSources,
} from "../../apps/www/src/data/knowledge-bank/social-media-production.ts";
import {
  nterchngCaptures,
  nterchngClaims,
  nterchngInquiries,
  nterchngObservations,
  nterchngResearchTasks,
  nterchngSources,
} from "../../apps/www/src/data/knowledge-bank/nterchng-production.ts";
import {
  urbanhermitCaptures,
  urbanhermitClaims,
  urbanhermitInquiries,
  urbanhermitObservations,
  urbanhermitResearchTasks,
  urbanhermitReviewSummary,
  urbanhermitSources,
} from "../../apps/www/src/data/knowledge-bank/urbanhermit-production.ts";
import {
  nycacFacebookEventCaptures,
  nycacFacebookEventClaims,
  nycacFacebookEventInquiries,
  nycacFacebookEventObservations,
  nycacFacebookEventResearchTasks,
  nycacFacebookEventSources,
} from "../../apps/www/src/data/knowledge-bank/nycac-facebook-events.ts";
import {
  jamieWowListFacebookEventCaptures,
  jamieWowListFacebookEventClaims,
  jamieWowListFacebookEventInquiries,
  jamieWowListFacebookEventObservations,
  jamieWowListFacebookEventResearchTasks,
  jamieWowListFacebookEventReviewSummary,
  jamieWowListFacebookEventSources,
} from "../../apps/www/src/data/knowledge-bank/jamie-wowlist-facebook-events.ts";
import {
  wowListFacebookPostCaptures,
  wowListFacebookPostClaims,
  wowListFacebookPostInquiries,
  wowListFacebookPostObservations,
  wowListFacebookPostResearchTasks,
  wowListFacebookPostReviewSummary,
  wowListFacebookPostSources,
} from "../../apps/www/src/data/knowledge-bank/wowlist-facebook-posts.ts";
import {
  nycartcFacebookPostAudit,
  nycartcFacebookPostCaptures,
  nycartcFacebookPostClaims,
  nycartcFacebookPostInquiries,
  nycartcFacebookPostObservations,
  nycartcFacebookPostResearchTasks,
  nycartcFacebookPostReviewSummary,
  nycartcFacebookPostSources,
} from "../../apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts";
import {
  kcSpacesFundFacebookPostAudit,
  kcSpacesFundFacebookPostCaptures,
  kcSpacesFundFacebookPostClaims,
  kcSpacesFundFacebookPostInquiries,
  kcSpacesFundFacebookPostObservations,
  kcSpacesFundFacebookPostResearchTasks,
  kcSpacesFundFacebookPostReviewSummary,
  kcSpacesFundFacebookPostSources,
} from "../../apps/www/src/data/knowledge-bank/kc-spaces-fund-facebook-posts.ts";
import {
  jamiePersonalFacebookPostAudit,
  jamiePersonalFacebookPostCaptures,
  jamiePersonalFacebookPostClaims,
  jamiePersonalFacebookPostInquiries,
  jamiePersonalFacebookPostObservations,
  jamiePersonalFacebookPostResearchTasks,
  jamiePersonalFacebookPostReviewSummary,
  jamiePersonalFacebookPostSources,
} from "../../apps/www/src/data/knowledge-bank/jamie-personal-facebook-posts.ts";
import {
  classifyNycacMissionSignals,
  extractNycacSourcePostBody,
  normalizeNycacSourceRecordType,
  nycacClassificationInputDigest,
  nycacClassificationInputs,
  nycacMissionSignalRules,
} from "../lib/nycac-mission-classifier.mjs";
import { urbanhermitMissionSignalRules } from "../lib/urbanhermit-mission-classifier.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/knowledge-development.json", "utf8"),
);
const cloneSuite = () => structuredClone(suite);
const campaignPressInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
    "utf8",
  ),
);
const socialMediaInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/social-media-capture-inventory.json",
    "utf8",
  ),
);
const callNycPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/callnyc-full-population.json",
    "utf8",
  ),
);
const wowListPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/wowlist-full-population.json",
    "utf8",
  ),
);
const kcTownHallPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json",
    "utf8",
  ),
);
const nycacPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json",
    "utf8",
  ),
);
const urbanhermitPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
    "utf8",
  ),
);
const nycacFacebookEventInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
    "utf8",
  ),
);
const jamieWowListFacebookEventInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/jamie-wowlist-facebook-events-full-population.json",
    "utf8",
  ),
);
const wowListFacebookPostInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json",
    "utf8",
  ),
);
const nycartcFacebookPostInventory = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
    "utf8",
  ),
);
const kcSpacesFundFacebookPostInventory = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/data/kcspacesfund-public-facebook-post-ledger.json",
    "utf8",
  ),
);
const jamiePersonalFacebookPostInventory = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
    "utf8",
  ),
);
const nycartcFacebookPostRouteInventory = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
    "utf8",
  ),
);

const normalizeSourceUrl = (value) =>
  value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

test("canonical knowledge-development suite is valid", () => {
  assert.deepEqual(validateKnowledgeDevelopmentSuite(suite).errors, []);
});

test("knowledge-development weights total 100", () => {
  const candidate = cloneSuite();
  candidate.evals[0].weight += 1;
  assert.match(
    validateKnowledgeDevelopmentSuite(candidate).errors.join("\n"),
    /weights must total 100/,
  );
});

test("suite requires a blocking eval", () => {
  const candidate = cloneSuite();
  candidate.evals.forEach((entry) => {
    entry.blocking = false;
  });
  assert.match(
    validateKnowledgeDevelopmentSuite(candidate).errors.join("\n"),
    /blocking eval/,
  );
});

test("optimizer cannot grade its own patch", () => {
  const candidate = cloneSuite();
  candidate.optimization.optimizer_may_not_grade_own_patch = false;
  assert.match(
    validateKnowledgeDevelopmentSuite(candidate).errors.join("\n"),
    /may not grade its own patch/,
  );
});

test("holdout judgments and repeat runs are required", () => {
  const candidate = cloneSuite();
  candidate.development_thresholds.holdout_judgments_required = false;
  candidate.development_thresholds.two_consecutive_passing_runs_required = false;
  const errors = validateKnowledgeDevelopmentSuite(candidate).errors.join("\n");
  assert.match(errors, /holdout judgments/);
  assert.match(errors, /two consecutive passing runs/);
});

test("campaign press corpus is complete, ordered, deduplicated, and archived", () => {
  assert.deepEqual(
    campaignPressManifests.map((manifest) => manifest.articleSourceIds.length),
    [21, 7, 8, 9],
  );
  assert.equal(
    campaignPressManifests.reduce(
      (count, manifest) => count + manifest.articleSourceIds.length,
      0,
    ),
    45,
  );
  assert.equal(campaignPressArticleSourceIds.length, 44);
  assert.equal(campaignPressSources.length, 45);
  assert.equal(campaignPressObservations.length, 45);
  assert.equal(campaignPressCaptures.length, 4);
  assert.equal(campaignPressClaims.length, 1);
  assert.equal(campaignPressResearchTasks.length, 1);
  assert.equal(campaignPressInventory.captures.length, 4);
  assert.equal(campaignPressInventory.placements.length, 45);

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source]),
  );
  const observedSourceIds = new Set(
    knowledgeBank.observations.map((observation) => observation.sourceId),
  );
  for (const sourceId of campaignPressArticleSourceIds) {
    assert.ok(
      sourceById.has(sourceId),
      `Missing campaign press source ${sourceId}`,
    );
    assert.ok(
      observedSourceIds.has(sourceId),
      `Missing observation for ${sourceId}`,
    );
    assert.match(
      campaignPressArchiveUrlFor(sourceId) ?? "",
      /^https:\/\/web\.archive\.org\/web\//,
    );
  }

  for (const manifest of campaignPressManifests) {
    const capture = campaignPressInventory.captures.find(
      (item) => item.campaignId === manifest.campaignId,
    );
    const placements = campaignPressInventory.placements.filter(
      (item) => item.campaignId === manifest.campaignId,
    );
    const indexSource = sourceById.get(manifest.indexSourceId);

    assert.ok(capture, `Missing capture for ${manifest.campaignId}`);
    assert.equal(capture.indexSourceId, manifest.indexSourceId);
    assert.equal(capture.placementCount, placements.length);
    assert.equal(capture.captureUrl, indexSource.archiveUrl);
    assert.deepEqual(
      placements.map((item) => item.ordinal),
      Array.from({ length: placements.length }, (_, index) => index + 1),
    );
    assert.deepEqual(
      placements.map((item) => item.sourceId),
      manifest.articleSourceIds,
    );

    for (const placement of placements) {
      const source = sourceById.get(placement.sourceId);
      const archiveOriginalUrl = campaignPressArchiveUrlFor(
        placement.sourceId,
      )?.match(/^https:\/\/web\.archive\.org\/web\/\d{14}\/(.+)$/)?.[1];
      assert.ok(source, `Missing source ${placement.sourceId}`);
      assert.ok(
        [source.canonicalUrl, archiveOriginalUrl]
          .filter(Boolean)
          .map(normalizeSourceUrl)
          .includes(normalizeSourceUrl(placement.listedUrl)),
        `${placement.sourceId} does not preserve its capture-listed URL`,
      );
    }
  }
});

test("campaign press metadata cannot silently become personal proof", () => {
  const newArticleIds = new Set(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .map((source) => source.id),
  );
  const promotedRelationships = knowledgeBank.claims.flatMap((claim) =>
    claim.evidence.filter((relationship) =>
      newArticleIds.has(relationship.sourceId),
    ),
  );

  assert.deepEqual(promotedRelationships, []);
  assert.equal(campaignPressClaims[0].publicationState, "public-safe");
  assert.equal(campaignPressClaims[0].selectionState, "dormant");
  assert.ok(
    campaignPressClaims[0].projections.every(
      (projection) =>
        projection.status === "hold" && projection.surfaces.length === 0,
    ),
  );
  assert.ok(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .every((source) =>
        source.doesNotEstablish.some((boundary) =>
          boundary.includes("Jamie's authorship"),
        ),
      ),
  );
});

test("campaign press duplicate is explicit and limited to the shared NPR article", () => {
  const repeatedPlacements = campaignPressInventory.placements.filter(
    (item) => item.duplicateDisposition !== "unique",
  );
  assert.deepEqual(
    repeatedPlacements.map((item) => [
      item.campaignId,
      item.sourceId,
      item.duplicateDisposition,
    ]),
    [
      [
        "let-nyc-dance",
        "SRC-NYCAC-NPR-KUAF-CABARET-2017-09-20",
        "shared-with-save-nyc-spaces",
      ],
      [
        "save-nyc-spaces",
        "SRC-NYCAC-NPR-KUAF-CABARET-2017-09-20",
        "shared-with-let-nyc-dance",
      ],
    ],
  );
});

test("Teams archival production covers all required corpora with a traversable graph", () => {
  assert.equal(teamsArchiveCaptures.length, 7);
  assert.equal(teamsArchiveSources.length, 13);
  assert.equal(teamsArchiveObservations.length, 32);
  assert.equal(teamsArchiveClaims.length, 7);
  assert.equal(teamsArchiveResearchTasks.length, 3);
  assert.equal(teamsArchiveInquiries.length, 2);

  for (const prefix of [
    "CAP-TEAMS-CRS",
    "CAP-TEAMS-JPH",
    "CAP-TEAMS-JOBHUNT",
  ]) {
    assert.ok(
      teamsArchiveCaptures.some((capture) => capture.id.startsWith(prefix)),
      `Missing required corpus prefix ${prefix}`,
    );
  }

  const observedSourceIds = new Set(
    teamsArchiveObservations.map((observation) => observation.sourceId),
  );
  for (const source of teamsArchiveSources) {
    assert.ok(observedSourceIds.has(source.id), `Unobserved source ${source.id}`);
  }
});

test("protected Teams sources stay URL-free and non-citing", () => {
  const protectedSourceIds = new Set(
    teamsArchiveSources
      .filter((source) => source.visibility !== "public")
      .map((source) => source.id),
  );

  for (const source of teamsArchiveSources.filter(
    (item) => item.visibility !== "public",
  )) {
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
  }

  for (const claim of teamsArchiveClaims) {
    assert.ok(
      claim.evidence
        .filter((item) => protectedSourceIds.has(item.sourceId))
        .every((item) => item.renderCitation === false),
      `${claim.id} renders protected evidence`,
    );
  }
});

test("Google Shared Drive production preserves the bounded sample and graph", () => {
  assert.equal(googleSharedDriveReviewSummary.accessibleDriveCount, 110);
  assert.equal(googleSharedDriveReviewSummary.selectedDriveCount, 14);
  assert.equal(googleSharedDriveReviewSummary.unreviewedDriveCount, 96);
  assert.equal(googleSharedDriveReviewSummary.closeReadTextArtifactCount, 7);
  assert.equal(googleSharedDriveReviewSummary.revisionHistoryCount, 4);
  assert.equal(googleSharedDriveCaptures.length, 9);
  assert.equal(googleSharedDriveSources.length, 6);
  assert.equal(googleSharedDriveObservations.length, 18);
  assert.equal(googleSharedDriveClaims.length, 5);
  assert.equal(googleSharedDriveResearchTasks.length, 7);
  assert.equal(googleSharedDriveInquiries.length, 1);

  const observedSourceIds = new Set(
    googleSharedDriveObservations.map((observation) => observation.sourceId),
  );
  for (const source of googleSharedDriveSources) {
    assert.ok(observedSourceIds.has(source.id), `Unobserved source ${source.id}`);
  }
});

test("Google Shared Drive sources expose no locators and never render citations", () => {
  const protectedIds = new Set([
    ...googleSharedDriveSources.map((source) => source.id),
    "SRC-CRS-RUNNING-MINUTES-2026-05-15",
  ]);
  for (const source of googleSharedDriveSources) {
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
  }
  for (const claim of googleSharedDriveClaims) {
    assert.ok(
      claim.evidence
        .filter((item) => protectedIds.has(item.sourceId))
        .every((item) => item.renderCitation === false),
      `${claim.id} renders protected evidence`,
    );
  }
  const payload = JSON.stringify({
    captures: googleSharedDriveCaptures,
    sources: googleSharedDriveSources,
    observations: googleSharedDriveObservations,
    claims: googleSharedDriveClaims,
    tasks: googleSharedDriveResearchTasks,
    inquiries: googleSharedDriveInquiries,
  });
  assert.doesNotMatch(
    payload,
    /\/Users\/|\/Volumes\/|drive\.google\.com|docs\.google\.com|permissionId|fileId|[\w.+-]+@[\w.-]+/i,
  );
});

test("NTER CHNG archival production preserves collaboration and exhibition evidence", () => {
  assert.equal(nterchngCaptures.length, 2);
  assert.equal(nterchngSources.length, 9);
  assert.equal(nterchngObservations.length, 12);
  assert.equal(nterchngClaims.length, 3);
  assert.equal(nterchngResearchTasks.length, 1);
  assert.equal(nterchngInquiries.length, 2);

  const installation = nterchngClaims.find(
    (claim) => claim.id === "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION",
  );
  const exhibition = nterchngClaims.find(
    (claim) => claim.id === "CLM-NTERCHNG-AMERICA-NOW-HERE-EXHIBITION",
  );
  const operations = nterchngClaims.find(
    (claim) => claim.id === "CLM-NTERCHNG-INSTALLATION-OPERATIONS",
  );
  assert.ok(installation);
  assert.ok(exhibition);
  assert.ok(operations);
  assert.match(installation.internalClaim, /Drew Bolton/);
  assert.match(installation.internalClaim, /Garrett Fuselier/);
  assert.match(exhibition.internalClaim, /official archived/i);
  assert.equal(installation.selectionState, "dormant");
  assert.equal(exhibition.selectionState, "dormant");
  assert.equal(operations.selectionState, "candidate");
  assert.equal(operations.publicationState, "public-safe");
  assert.equal(operations.status, "confirmed-with-boundary");
  assert.ok(
    operations.boundaries.some((boundary) =>
      /collective work by Drew Bolton, Jamie Burkart, and Garrett Fuselier/i.test(
        boundary,
      ),
    ),
  );
  assert.ok(
    operations.boundaries.some((boundary) => /plan establishes intended workflow/i.test(boundary)),
  );
  assert.ok(
    exhibition.boundaries.some((boundary) => /not a solo exhibition/i.test(boundary)),
  );
  assert.ok(
    exhibition.antiClaims.includes("NTER CHNG was exhibited at the Nerman Museum"),
  );
});

test("NTER CHNG protected sources cannot expose historical or Drive data", () => {
  const detail = nterchngSources.find(
    (source) =>
      source.id === "SRC-NTERCHNG-ANH-ARTIST-DETAIL-2011-05-18",
  );
  assert.ok(detail);
  assert.equal(detail.visibility, "public-metadata-only");
  assert.equal(detail.canonicalUrl, undefined);
  assert.equal(detail.archiveUrl, undefined);
  assert.equal(detail.assetUrl, undefined);
  assert.ok(detail.protectedLocatorId);

  const protectedSources = nterchngSources.filter((source) =>
    [
      "SRC-NTERCHNG-ANH-ARTIST-DETAIL-2011-05-18",
      "SRC-NTERCHNG-INSTALLER-PLAN-2011-04-13",
      "SRC-NTERCHNG-WORKING-TRANSCRIPT-2011-04-06",
    ].includes(source.id),
  );
  assert.equal(protectedSources.length, 3);
  for (const source of protectedSources) {
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
    assert.ok(source.protectedLocatorId);
  }

  const installer = protectedSources.find(
    (source) => source.id === "SRC-NTERCHNG-INSTALLER-PLAN-2011-04-13",
  );
  const working = protectedSources.find(
    (source) => source.id === "SRC-NTERCHNG-WORKING-TRANSCRIPT-2011-04-06",
  );
  assert.ok(installer.supportsGenerally.some((item) => /back-queuing/i.test(item)));
  assert.ok(
    working.doesNotEstablish.some((item) => /public exhibition visitors/i.test(item)),
  );

  const serialized = JSON.stringify({
    nterchngCaptures,
    nterchngSources,
    nterchngObservations,
    nterchngClaims,
    nterchngResearchTasks,
    nterchngInquiries,
  });
  assert.doesNotMatch(
    serialized,
    /(?:\+?1[-.\s])?(?:\([2-9]\d{2}\)[-.\s]?|[2-9]\d{2}[-.\s])[2-9]\d{2}[-.\s]\d{4}|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|docs\.google\.com|drive\.google\.com/i,
  );

  for (const claim of nterchngClaims) {
    const relationships = claim.evidence.filter((item) =>
      protectedSources.some((source) => source.id === item.sourceId),
    );
    assert.ok(
      relationships.every((relationship) => relationship.renderCitation === false),
      `${claim.id} renders protected evidence`,
    );
  }
});

test("Shared Drive claims distinguish selected proof from held research", () => {
  for (const id of [
    "CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE",
    "CLM-196-RESIDENCY-ONBOARDING-HANDOFF",
    "CLM-NYCAC-MULTI-ACTION-GUIDANCE-DRAFT",
    "CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW",
  ]) {
    const claim = googleSharedDriveClaims.find((item) => item.id === id);
    assert.equal(claim.selectionState, "selected");
    assert.equal(claim.publicationState, "approved");
    assert.ok(
      claim.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.some((surface) => surface.startsWith("/")),
      ),
    );
  }

  const held = googleSharedDriveClaims.find(
    (item) => item.id === "CLM-SBU-STYLE-GUIDE-HANDOFF-SEED",
  );
  assert.equal(held.selectionState, "dormant");
  assert.ok(held.projections.every((projection) => projection.status === "hold"));
  assert.deepEqual(held.researchTaskIds, [
    "RT-GDRIVE-SBU-STYLE-GUIDE-COMPLETION",
  ]);
});

test("remaining drives, photographs, and WOWList materials stay tasked research", () => {
  const remaining = googleSharedDriveResearchTasks.find(
    (item) => item.id === "RT-GDRIVE-REMAINING-CORPUS-TRIAGE",
  );
  const photo = googleSharedDriveResearchTasks.find(
    (item) => item.id === "RT-GDRIVE-SUNDAY-DINNER-PHOTO-REVIEW",
  );
  const wowlist = googleSharedDriveResearchTasks.find(
    (item) => item.id === "RT-GDRIVE-WOWLIST-MEETING-HANDOFF-REVIEW",
  );
  assert.equal(remaining.status, "open");
  assert.match(remaining.publicNote, /remaining 96/i);
  assert.equal(photo.status, "open");
  assert.match(photo.successCriteria.join("\n"), /rights, consent/i);
  assert.equal(wowlist.status, "open");
  assert.match(wowlist.publicNote, /protected research leads/i);
});

test("Shared Drive outcome gaps remain explicit research tasks", () => {
  const expected = [
    [
      "CLM-196-RESIDENCY-ONBOARDING-HANDOFF",
      "RT-GDRIVE-196-WORKFLOW-REUSE-CORROBORATION",
    ],
    [
      "CLM-NYCAC-MULTI-ACTION-GUIDANCE-DRAFT",
      "RT-GDRIVE-NYCAC-GUIDANCE-PUBLICATION-USE",
    ],
    [
      "CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW",
      "RT-GDRIVE-ARCHIVE-WORKFLOW-EXECUTION",
    ],
  ];

  for (const [claimId, taskId] of expected) {
    const claim = googleSharedDriveClaims.find((item) => item.id === claimId);
    const task = googleSharedDriveResearchTasks.find((item) => item.id === taskId);
    assert.equal(task.status, "open");
    assert.ok(claim.researchTaskIds.includes(taskId));
    assert.ok(task.claimIds.includes(claimId));
  }
});

test("social-media production preserves account, engagement, and timeline inventories", () => {
  assert.deepEqual(
    projectSocialAccounts.map((account) => account.currentHandle),
    ["@CallNYCApp", "@NYCArtC", "@wowlist", "@KCTownHall"],
  );
  assert.equal(socialMediaCaptures.length, 8);
  assert.equal(socialMediaSources.length, 66);
  assert.equal(socialMediaObservations.length, 69);
  assert.equal(socialMediaClaims.length, 7);
  assert.equal(socialMediaResearchTasks.length, 7);
  assert.equal(socialMediaInquiries.length, 7);

  const callNycPopulationSource = socialMediaSources.find(
    (source) => source.id === "SRC-SOCIAL-CALLNYC-FULL-POPULATION-2026-07-14",
  );
  assert.equal(callNycPopulationSource.visibility, "public");
  assert.equal(callNycPopulationSource.preservationStatus, "live");
  assert.match(
    callNycPopulationSource.canonicalUrl,
    /github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\/apps\/www\/src\/data\/knowledge-bank\/fixtures\/callnyc-full-population\.json$/,
  );
  const wowListPopulationSource = socialMediaSources.find(
    (source) => source.id === "SRC-SOCIAL-WOWLIST-FULL-POPULATION-2026-07-14",
  );
  assert.equal(wowListPopulationSource.visibility, "public");
  assert.equal(wowListPopulationSource.preservationStatus, "live");
  assert.match(
    wowListPopulationSource.canonicalUrl,
    /github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\/apps\/www\/src\/data\/knowledge-bank\/fixtures\/wowlist-full-population\.json$/,
  );
  const kcTownHallPopulationSource = socialMediaSources.find(
    (source) => source.id === "SRC-SOCIAL-KCTH-FULL-POPULATION-2026-07-14",
  );
  assert.equal(kcTownHallPopulationSource.visibility, "public");
  assert.equal(kcTownHallPopulationSource.preservationStatus, "live");
  assert.match(
    kcTownHallPopulationSource.canonicalUrl,
    /github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\/apps\/www\/src\/data\/knowledge-bank\/fixtures\/kctownhall-full-population\.json$/,
  );
  const nycacPopulationSource = socialMediaSources.find(
    (source) =>
      source.id === "SRC-SOCIAL-NYCAC-RETRIEVABLE-POPULATION-2026-07-14",
  );
  assert.equal(nycacPopulationSource.visibility, "public");
  assert.equal(nycacPopulationSource.preservationStatus, "live");
  assert.match(
    nycacPopulationSource.canonicalUrl,
    /github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\/apps\/www\/src\/data\/knowledge-bank\/fixtures\/nycartc-retrievable-population\.json$/,
  );
  assert.equal(socialMediaReviewSummary.callNycCouncilMemberAccountCount, 8);
  assert.equal(socialMediaReviewSummary.callNycRecoveredTimelineRecordCount, 107);
  assert.equal(socialMediaReviewSummary.callNycUnmaterializedProfileRecordCount, 3);
  assert.equal(
    socialMediaReviewSummary.nycacMissionRelevantCouncilMemberAccountCount2017To2020,
    4,
  );
  assert.equal(
    socialMediaReviewSummary.nycacHistoricalMentionRecordCount2017To2020,
    358,
  );
  assert.equal(socialMediaReviewSummary.nycacProfilePostCount, 5124);
  assert.equal(
    socialMediaReviewSummary.nycacRecoveredTimelineAndSearchRecordCount,
    3123,
  );
  assert.equal(socialMediaReviewSummary.nycacProfileCountNotMaterialized, 2001);
  assert.equal(socialMediaReviewSummary.nycacRecoveredOriginalPostCount, 608);
  assert.equal(socialMediaReviewSummary.nycacRecoveredReplyCount, 77);
  assert.equal(socialMediaReviewSummary.nycacRecoveredRepostCount, 2438);
  assert.equal(socialMediaReviewSummary.nycacOriginalAndReplyRecordCount, 685);
  assert.equal(
    socialMediaReviewSummary.nycacExternalSourceNativeRepostRecordCount,
    2438,
  );
  assert.equal(
    socialMediaReviewSummary.nycacTimelineNativeRepostAppearanceCount,
    2440,
  );
  assert.equal(
    socialMediaReviewSummary.nycacAccountAuthoredStatusAlsoSeenAsSelfRepostCount,
    2,
  );
  assert.equal(socialMediaReviewSummary.nycacDistinctSourceAuthorCount, 623);
  assert.equal(socialMediaReviewSummary.nycacDistinctExternalShortUrlCount, 1161);
  assert.equal(socialMediaReviewSummary.nycacPost2020IncomingSearchRecordCount, 98);
  assert.equal(socialMediaReviewSummary.nycacPost2020IncomingAuthorCount, 43);
  assert.equal(socialMediaReviewSummary.nycacPost2020DirectMentionRecordCount, 75);
  assert.equal(socialMediaReviewSummary.nycacPost2020DirectMentionAuthorCount, 34);
  assert.equal(
    socialMediaReviewSummary.nycacPost2020ConversationContextRecordCount,
    23,
  );
  assert.equal(socialMediaReviewSummary.wowListRecoveredTimelineRecordCount, 38);
  assert.equal(socialMediaReviewSummary.wowListRecoveredOriginalPostCount, 16);
  assert.equal(socialMediaReviewSummary.wowListRecoveredReplyCount, 6);
  assert.equal(socialMediaReviewSummary.wowListRecoveredRepostCount, 16);
  assert.equal(socialMediaReviewSummary.wowListAuthoredRecordCount, 22);
  assert.equal(socialMediaReviewSummary.wowListDistinctExternalShortUrlCount, 35);
  assert.equal(socialMediaReviewSummary.wowListIncomingSearchRecordCount, 16);
  assert.equal(
    socialMediaReviewSummary.wowListMissionRelevantThirdPartyAccountCount,
    10,
  );
  assert.equal(socialMediaReviewSummary.kcTownHallRecoveredTimelineRecordCount, 183);
  assert.equal(socialMediaReviewSummary.kcTownHallRecoveredOriginalPostCount, 142);
  assert.equal(socialMediaReviewSummary.kcTownHallRecoveredReplyCount, 13);
  assert.equal(socialMediaReviewSummary.kcTownHallRecoveredRepostCount, 28);
  assert.equal(socialMediaReviewSummary.kcTownHallAuthoredRecordCount, 155);
  assert.equal(socialMediaReviewSummary.kcTownHallDistinctExternalShortUrlCount, 31);
  assert.equal(socialMediaReviewSummary.kcTownHallDirectCouncilMemberAccountCount, 3);

  const nycacRecords =
    socialMediaInventory.inventories.nycArtistCoalitionIncomingMentions2017To2020
      .records;
  const wowListRecords =
    socialMediaInventory.inventories.wowListProfileTimeline.records;
  assert.equal(nycacRecords.length, 358);
  assert.equal(new Set(nycacRecords.map((record) => record.url)).size, 358);
  assert.equal(wowListRecords.length, 38);
  assert.equal(new Set(wowListRecords.map((record) => record.url)).size, 38);

  const observedSourceIds = new Set(
    socialMediaObservations.map((observation) => observation.sourceId),
  );
  for (const source of socialMediaSources) {
    assert.ok(observedSourceIds.has(source.id), `Unobserved source ${source.id}`);
  }
});

test("CallNYC full-population archive reconciles every retrievable record", () => {
  const reconciliation = callNycPopulationInventory.populationReconciliation;
  assert.equal(reconciliation.profileReportedPostCount, 110);
  assert.equal(reconciliation.postsTimelineUniqueCount, 106);
  assert.equal(reconciliation.repliesTimelineUniqueCount, 107);
  assert.equal(reconciliation.recoveredUnionRecordCount, 107);
  assert.equal(reconciliation.recoveredPopulationReviewedPercent, 100);
  assert.equal(reconciliation.profileCountNotMaterialized, 3);
  assert.match(reconciliation.conclusion, /107 of 110/i);

  const records = callNycPopulationInventory.records;
  assert.equal(records.length, 107);
  assert.equal(new Set(records.map((record) => record.url)).size, 107);
  assert.ok(
    records.every(
      (record) =>
        Array.isArray(record.recoveredFrom) &&
        record.recoveredFrom.length > 0 &&
        record.recoveredFrom.every((timeline) =>
          ["posts", "replies"].includes(timeline),
        ),
    ),
  );
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("posts")).length,
    reconciliation.postsTimelineUniqueCount,
  );
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("replies")).length,
    reconciliation.repliesTimelineUniqueCount,
  );
  assert.deepEqual(
    records
      .filter((record) => !record.recoveredFrom.includes("posts"))
      .map((record) => record.url),
    ["https://x.com/CallNYCapp/status/722837286476390401"],
  );
  assert.deepEqual(callNycPopulationInventory.recordTypeCounts, {
    original: 86,
    reply: 6,
    repost: 15,
  });
  assert.equal(
    Object.values(callNycPopulationInventory.recordTypeCounts).reduce(
      (sum, value) => sum + value,
      0,
    ),
    records.length,
  );

  const pattern = callNycPopulationInventory.publishingPattern;
  assert.equal(pattern.callNycAuthoredRecordCount, 92);
  assert.equal(pattern.councilRecognitionPatternRecordCount, 71);
  assert.equal(pattern.distinctCouncilMemberHandlesCredited, 26);
  assert.equal(pattern.callNycDeepLinkOccurrences, 75);
  assert.equal(pattern.distinctCallNycIssueOrApiPaths, 62);
  assert.equal(pattern.distinctServiceDomains, 16);
  assert.equal(pattern.apiPathCount, 1);
  const recognitionRecords = records.filter(
    (record) => record.publishingClassification?.kind === "council-recognition",
  );
  assert.equal(recognitionRecords.length, 71);
  assert.equal(
    new Set(
      recognitionRecords.map((record) =>
        record.publishingClassification.creditedHandle.toLowerCase(),
      ),
    ).size,
    26,
  );
  const callNycPaths = records.flatMap((record) => record.callNycPaths || []);
  assert.equal(callNycPaths.length, 75);
  assert.equal(new Set(callNycPaths).size, 62);
  assert.equal(
    callNycPopulationInventory.postedUrlInventory.distinctExternalShortUrls,
    84,
  );

  const incoming = callNycPopulationInventory.incomingMentionSearch.records;
  assert.equal(incoming.length, 11);
  assert.equal(new Set(incoming.map((record) => record.url)).size, 11);
  assert.deepEqual(
    incoming.reduce((counts, record) => {
      counts[record.stakeholderGroup] =
        (counts[record.stakeholderGroup] || 0) + 1;
      return counts;
    }, {}),
    {
      "council-office": 4,
      "incidental-network": 1,
      "legal-services": 2,
      resident: 2,
      "civic-technology": 2,
    },
  );

  const missingPostsTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-CALLNYC-UNMATERIALIZED-POSTS",
  );
  assert.equal(missingPostsTask.status, "open");
  assert.match(missingPostsTask.publicNote, /three.*unrecovered/i);
  assert.doesNotMatch(
    JSON.stringify(callNycPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i,
  );
  assert.doesNotMatch(
    JSON.stringify(wowListPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i,
  );
});

test("NYC Artist Coalition classifier excludes profile chrome and quoted cards", () => {
  const quotePost = {
    url: "https://x.com/NYCArtC/status/synthetic-quote",
    recordType: "reply",
    text: [
      "NYC Artist Coalition",
      "@NYCArtC",
      "·",
      "Feb 3, 2023",
      "Outer #FairRentNYC body",
      "Quote",
      "Music Workers Alliance",
      "@MusicWorkers",
      "·",
      "Feb 2, 2023",
      "Replying to @MusicWorkers",
      "Quoted Music Workers content",
    ].join("\n"),
    hashtags: ["#FairRentNYC"],
    externalLinks: [],
  };
  const quoteInputs = nycacClassificationInputs(quotePost);
  assert.equal(normalizeNycacSourceRecordType(quotePost), "original");
  assert.equal(extractNycacSourcePostBody(quotePost), "Outer #FairRentNYC body");
  assert.deepEqual(classifyNycacMissionSignals(quoteInputs), [
    {
      signalId: "fair-rent-nyc",
      inputField: "source-post-body",
      matchedValue: "#FairRentNYC",
    },
  ]);
  assert.match(nycacClassificationInputDigest(quoteInputs), /^[a-f0-9]{64}$/);

  const displayNameOnly = {
    url: "https://x.com/MusicWorkers/status/synthetic-repost",
    recordType: "repost",
    text: [
      "NYC Artist Coalition reposted",
      "Music Workers Alliance",
      "@MusicWorkers",
      "·",
      "Mar 12",
      "A body without the subject terms.",
    ].join("\n"),
    hashtags: [],
    externalLinks: [],
  };
  assert.deepEqual(
    classifyNycacMissionSignals(nycacClassificationInputs(displayNameOnly)),
    [],
  );
});

test("NYC Artist Coalition archive reconciles the complete retrievable population", () => {
  const reconciliation = nycacPopulationInventory.populationReconciliation;
  assert.equal(reconciliation.profileReportedPostCount, 5124);
  assert.equal(reconciliation.postsTimelineUniqueCount, 764);
  assert.equal(reconciliation.postsAndRepliesTimelinePrimaryCount, 2698);
  assert.equal(reconciliation.recoveredUnionRecordCount, 3123);
  assert.equal(reconciliation.recoveredPopulationReviewedPercent, 100);
  assert.equal(reconciliation.profileCountNotMaterialized, 2001);
  assert.match(reconciliation.conclusion, /3,123 unique records/i);
  assert.match(reconciliation.conclusion, /owner archive/i);

  const records = nycacPopulationInventory.records;
  assert.equal(records.length, 3123);
  assert.equal(new Set(records.map((record) => record.url)).size, 3123);
  assert.deepEqual(nycacPopulationInventory.recordTypeCounts, {
    original: 608,
    reply: 77,
    repost: 2438,
  });
  assert.equal(
    Object.values(nycacPopulationInventory.recordTypeCounts).reduce(
      (sum, count) => sum + count,
      0,
    ),
    records.length,
  );
  assert.ok(
    records.every(
      (record) =>
        Array.isArray(record.recoveredFrom) && record.recoveredFrom.length > 0,
    ),
  );

  const publishing = nycacPopulationInventory.publishingPattern;
  assert.equal(publishing.accountOriginalAndReplyRecordCount, 685);
  assert.equal(publishing.accountOriginalRecordCount, 608);
  assert.equal(publishing.accountReplyRecordCount, 77);
  assert.equal(publishing.externalSourceNativeRepostRecordCount, 2438);
  assert.equal(publishing.timelineNativeRepostAppearanceCount, 2440);
  assert.equal(publishing.accountAuthoredStatusAlsoSeenAsSelfRepostCount, 2);
  assert.equal(publishing.accountQuotePostReplyInheritanceCorrectionCount, 15);
  assert.ok(
    publishing.accountQuotePostReplyInheritanceCorrectionUrls.includes(
      "https://x.com/NYCArtC/status/1621553786790596609",
    ),
  );
  assert.ok(
    records
      .filter((record) =>
        publishing.accountQuotePostReplyInheritanceCorrectionUrls.includes(
          record.url,
        ),
      )
      .every((record) => record.recordType === "original"),
  );
  const expectedSelfRepostAppearanceUrls = [
    "https://x.com/NYCArtC/status/1674013523373068289",
    "https://x.com/NYCArtC/status/1995868766614462973",
  ];
  assert.deepEqual(
    publishing.accountAuthoredStatusAlsoSeenAsSelfRepostUrls.slice().sort(),
    expectedSelfRepostAppearanceUrls,
  );
  const originalsAndReplies = records.filter((record) =>
    ["original", "reply"].includes(record.recordType),
  );
  assert.equal(originalsAndReplies.length, 685);
  assert.ok(
    originalsAndReplies.every(
      (record) => record.authorHandle.toLowerCase() === "@nycartc",
    ),
  );
  const selfRepostAppearanceRecords = records
    .filter((record) =>
      record.accountTimelineAppearances?.includes("native-self-repost-card"),
    )
    .sort((a, b) => a.url.localeCompare(b.url));
  assert.deepEqual(
    selfRepostAppearanceRecords.map((record) => record.url),
    expectedSelfRepostAppearanceUrls,
  );
  assert.ok(
    selfRepostAppearanceRecords.every(
      (record) =>
        record.recordType === "original" &&
        record.authorHandle.toLowerCase() === "@nycartc" &&
        record.recoveredFrom.some((surface) =>
          surface.startsWith("search-authored-"),
        ),
    ),
  );
  assert.equal(
    records.filter(
      (record) =>
        record.recordType === "repost" &&
        record.authorHandle.toLowerCase() !== "@nycartc",
    ).length,
    2438,
  );
  assert.equal(publishing.distinctSourceAuthorCount, 623);
  assert.deepEqual(publishing.missionSignalRecordCounts, {
    "fair-rent-nyc": 477,
    "save-nyc-spaces": 192,
    "let-nyc-dance": 97,
    "talks-not-raids": 62,
    "nightlife-governance": 57,
    "artist-labor": 98,
  });
  const missionClassification =
    nycacPopulationInventory.missionSignalClassification;
  const missionRules = new Map(
    missionClassification.rules.map((rule) => [rule.signalId, rule]),
  );
  assert.deepEqual([...missionRules.keys()], [
    "fair-rent-nyc",
    "save-nyc-spaces",
    "let-nyc-dance",
    "talks-not-raids",
    "nightlife-governance",
    "artist-labor",
  ]);
  assert.deepEqual(missionClassification.inputFields, [
    "source-post-body",
    "hashtag",
    "displayed-link-destination",
  ]);
  assert.deepEqual(
    missionClassification.rules,
    nycacMissionSignalRules.map((rule) => ({
      signalId: rule.id,
      pattern: rule.pattern.source,
      flags: rule.pattern.flags,
    })),
  );
  for (const record of [
    ...records,
    ...nycacPopulationInventory.post2020IncomingMentionInventory.records,
  ]) {
    assert.match(record.classificationInputDigest, /^[a-f0-9]{64}$/);
    assert.deepEqual(
      record.missionSignalEvidence.map((evidence) => evidence.signalId),
      record.missionSignals,
    );
    for (const evidence of record.missionSignalEvidence) {
      const rule = missionRules.get(evidence.signalId);
      assert.ok(rule);
      assert.ok(missionClassification.inputFields.includes(evidence.inputField));
      assert.match(evidence.matchedValue, new RegExp(rule.pattern, rule.flags));
    }
  }

  const links = records.flatMap((record) => record.externalLinks);
  assert.equal(links.length, 1451);
  assert.equal(new Set(links.map((link) => link.shortUrl)).size, 1161);
  assert.equal(
    nycacPopulationInventory.postedUrlInventory.recordsWithExternalLinks,
    1339,
  );

  const incoming = nycacPopulationInventory.post2020IncomingMentionInventory;
  assert.equal(incoming.renderedRecordCount, 98);
  assert.equal(incoming.records.length, 98);
  assert.equal(new Set(incoming.records.map((record) => record.url)).size, 98);
  assert.equal(incoming.distinctAuthorCount, 43);
  assert.equal(incoming.directlyMatchingRecordCount, 75);
  assert.equal(incoming.directlyMatchingAuthorCount, 34);
  assert.equal(incoming.conversationContextRecordCount, 23);
  assert.equal(incoming.conversationContextAuthorCount, 15);
  assert.equal(
    incoming.records.filter((record) =>
      record.mentionHandles.some(
        (handle) => handle.toLowerCase() === "@nycartc",
      ),
    ).length,
    75,
  );

  assert.deepEqual(nycacPopulationInventory.visibleEngagementSnapshot, {
    observedAt: "2026-07-14",
    originalAndReplyRecordsWithDisplayedReplyRepostOrLike: 618,
    originalAndReplyDisplayedReplies: 118,
    originalAndReplyDisplayedReposts: 1490,
    originalAndReplyDisplayedLikes: 2698,
    originalAndReplyDisplayedBookmarks: 65,
    originalAndReplyDisplayedInteractionUnits: 4306,
    boundary:
      "The 618-record count includes account-authored source statuses with at least one displayed reply, repost, or like. Displayed counts are volatile interface observations, not unique people, reach, conversion, endorsement, participation, or impact. Views and bookmarks are excluded from both that record count and the interaction-unit total; only account-authored source statuses are included, even when one also appeared as a native self-repost card.",
  });
  const authoredRecords = records.filter((record) =>
    ["original", "reply"].includes(record.recordType),
  );
  assert.equal(
    authoredRecords.filter(
      (record) =>
        record.visibleEngagement.replies > 0 ||
        record.visibleEngagement.reposts > 0 ||
        record.visibleEngagement.likes > 0,
    ).length,
    nycacPopulationInventory.visibleEngagementSnapshot
      .originalAndReplyRecordsWithDisplayedReplyRepostOrLike,
  );
  assert.match(
    nycacPopulationInventory.sourceAuthorNetwork.boundary,
    /does not by itself establish.*engaged/i,
  );

  const boundedSearchTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-NYCAC-POST-2020-MENTION-INVENTORY",
  );
  assert.equal(boundedSearchTask.status, "complete");
  assert.match(boundedSearchTask.publicNote, /75 records from 34 authors/i);
  const ownerArchiveTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-NYCAC-OWNER-ARCHIVE",
  );
  assert.equal(ownerArchiveTask.status, "blocked");
  assert.match(ownerArchiveTask.blockedReason, /account-owner X Archive/i);

  assert.doesNotMatch(
    JSON.stringify(nycacPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i,
  );
});

test("WOW List full-population archive reconciles all 38 profile records", () => {
  const reconciliation = wowListPopulationInventory.populationReconciliation;
  assert.equal(reconciliation.profileReportedPostCount, 38);
  assert.equal(reconciliation.postsTimelineUniqueCount, 37);
  assert.equal(reconciliation.repliesTimelineUniqueCount, 38);
  assert.equal(reconciliation.recoveredUnionRecordCount, 38);
  assert.equal(reconciliation.recoveredPopulationReviewedPercent, 100);
  assert.equal(reconciliation.profileCountNotMaterialized, 0);
  assert.match(reconciliation.conclusion, /Every one of the 38 records/i);

  const records = wowListPopulationInventory.records;
  assert.equal(records.length, 38);
  assert.equal(new Set(records.map((record) => record.url)).size, 38);
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("posts")).length,
    37,
  );
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("replies")).length,
    38,
  );
  assert.deepEqual(
    records
      .filter((record) => !record.recoveredFrom.includes("posts"))
      .map((record) => record.url),
    ["https://x.com/wowlist/status/665520472461860864"],
  );
  assert.deepEqual(wowListPopulationInventory.recordTypeCounts, {
    original: 16,
    reply: 6,
    repost: 16,
  });

  const links = records.flatMap((record) => record.externalLinks);
  assert.equal(links.length, 35);
  assert.equal(new Set(links.map((link) => link.shortUrl)).size, 35);
  assert.equal(
    wowListPopulationInventory.publishingPattern.accountAuthoredRecordCount,
    22,
  );
  assert.equal(
    wowListPopulationInventory.postedUrlInventory.curatedMissionRelevantSources
      .length,
    9,
  );

  const incoming = wowListPopulationInventory.stakeholderInventory.records;
  const missionRelevant = incoming.filter(
    (record) => record.classification === "mission-relevant-third-party",
  );
  assert.equal(incoming.length, 16);
  assert.equal(new Set(incoming.map((record) => record.url)).size, 16);
  assert.equal(missionRelevant.length, 10);
  assert.equal(
    new Set(missionRelevant.map((record) => record.authorHandle)).size,
    10,
  );
  assert.equal(
    Object.values(
      wowListPopulationInventory.stakeholderInventory.stakeholderGroupCounts,
    ).reduce((sum, count) => sum + count, 0),
    10,
  );
  assert.doesNotMatch(
    JSON.stringify(wowListPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i,
  );
});

test("KC Town Hall full-population archive reconciles all 183 profile records", () => {
  const reconciliation = kcTownHallPopulationInventory.populationReconciliation;
  const records = kcTownHallPopulationInventory.records;
  const contexts = kcTownHallPopulationInventory.conversationContextRecords;

  assert.equal(reconciliation.profileReportedPostCount, 183);
  assert.equal(reconciliation.postsTimelineUniqueCount, 170);
  assert.equal(reconciliation.repliesTimelineRenderedArticleCount, 188);
  assert.equal(reconciliation.repliesTimelineConversationContextCount, 5);
  assert.equal(reconciliation.repliesTimelinePrimaryRecordCount, 183);
  assert.equal(reconciliation.recoveredUnionRecordCount, 183);
  assert.equal(reconciliation.recoveredPopulationReviewedPercent, 100);
  assert.equal(reconciliation.profileCountNotMaterialized, 0);
  assert.match(reconciliation.conclusion, /Every one of the 183 records/i);

  assert.equal(records.length, 183);
  assert.equal(new Set(records.map((record) => record.url)).size, 183);
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("posts")).length,
    170,
  );
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("replies")).length,
    183,
  );
  assert.equal(contexts.length, 5);
  assert.equal(new Set(contexts.map((record) => record.url)).size, 5);
  assert.ok(
    contexts.every(
      (context) => !records.some((record) => record.url === context.url),
    ),
  );
  assert.deepEqual(kcTownHallPopulationInventory.recordTypeCounts, {
    original: 142,
    reply: 13,
    repost: 28,
  });
  assert.equal(
    kcTownHallPopulationInventory.publishingPattern.accountAuthoredRecordCount,
    155,
  );
  assert.equal(
    kcTownHallPopulationInventory.publishingPattern.tireRelatedRecordCount,
    records.filter((record) =>
      record.classifications.includes("tire-related"),
    ).length,
  );
  assert.equal(
    kcTownHallPopulationInventory.publishingPattern.surveyLinkedRecordCount,
    records.filter((record) =>
      record.classifications.includes("survey-linked"),
    ).length,
  );
  assert.equal(
    records.filter((record) =>
      record.classifications.includes("tire-related"),
    ).length,
    100,
  );
  assert.equal(
    records.filter((record) =>
      record.classifications.includes("survey-linked"),
    ).length,
    12,
  );
  assert.ok(
    records
      .filter((record) => record.classifications.includes("survey-linked"))
      .every((record) =>
        record.externalLinks.some((link) =>
          /survey/i.test(link.displayedDestination),
        ),
      ),
  );
  assert.match(
    kcTownHallPopulationInventory.publishingPattern.classificationMethod
      .tireRelated,
    /close reading.*public post/i,
  );
  assert.equal(
    kcTownHallPopulationInventory.postedUrlInventory.distinctExternalShortUrls,
    31,
  );
  assert.equal(
    kcTownHallPopulationInventory.stakeholderResponseInventory
      .directCouncilMemberAccountCount,
    3,
  );
  assert.deepEqual(
    kcTownHallPopulationInventory.stakeholderResponseInventory.councilMemberAccounts.map(
      (record) => record.handle,
    ),
    ["@QuintonLucasKC", "@joliejustus", "@Robinson4kc"],
  );
  assert.doesNotMatch(
    JSON.stringify(kcTownHallPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\/|816-\d{3}-\d{4}/i,
  );
});

test("KC Town Hall population source pins the exact classified fixture commit", () => {
  const fixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json";
  const source = socialMediaSources.find(
    (record) => record.id === "SRC-SOCIAL-KCTH-FULL-POPULATION-2026-07-14",
  );
  const match = source.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/(apps\/www\/src\/data\/knowledge-bank\/fixtures\/kctownhall-full-population\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], fixturePath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${fixturePath}`], {
      maxBuffer: 4 * 1024 * 1024,
    }),
    readFileSync(fixturePath),
  );
});

test("Urbanhermit live-profile population reconciles all 434 counted records", () => {
  const records = urbanhermitPopulationInventory.records;
  const contextRecords =
    urbanhermitPopulationInventory.conversationContextRecords;
  const reconciliation = urbanhermitPopulationInventory.populationReconciliation;

  assert.equal(records.length, 434);
  assert.equal(new Set(records.map((record) => record.url)).size, 434);
  assert.equal(reconciliation.profileReportedPostCount, 434);
  assert.equal(reconciliation.postsTimelineUniqueCount, 421);
  assert.equal(reconciliation.repliesTimelineRenderedArticleCount, 436);
  assert.equal(reconciliation.repliesTimelineConversationContextCount, 2);
  assert.equal(reconciliation.repliesTimelinePrimaryRecordCount, 434);
  assert.equal(reconciliation.recoveredUnionRecordCount, 434);
  assert.equal(reconciliation.recoveredPopulationReviewedPercent, 100);
  assert.equal(reconciliation.profileCountNotMaterialized, 0);
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("posts")).length,
    421,
  );
  assert.equal(
    records.filter((record) => record.recoveredFrom.includes("replies")).length,
    434,
  );
  assert.equal(contextRecords.length, 2);
  assert.ok(
    contextRecords.every(
      (context) => !records.some((record) => record.url === context.url),
    ),
  );
  assert.match(reconciliation.boundary, /no older post was deleted/i);
});

test("Urbanhermit fixture preserves source authorship, posted links, and safe metadata", () => {
  const records = urbanhermitPopulationInventory.records;
  const authored = records.filter(
    (record) => record.sourceAuthorship === "account-authored",
  );
  const reposts = records.filter((record) => record.recordType === "repost");
  const links = records.flatMap((record) => record.externalLinks);
  const authoredLinks = authored.flatMap((record) => record.externalLinks);

  assert.deepEqual(urbanhermitPopulationInventory.recordTypeCounts, {
    original: 340,
    reply: 13,
    repost: 81,
  });
  assert.equal(authored.length, 353);
  assert.ok(
    authored.every(
      (record) =>
        record.authorHandle.toLowerCase() === "@urbanhermit" &&
        ["original", "reply"].includes(record.recordType),
    ),
  );
  assert.equal(reposts.length, 81);
  assert.ok(
    reposts.every(
      (record) =>
        record.sourceAuthorship === "external-source-native-repost" &&
        record.authorHandle.toLowerCase() !== "@urbanhermit",
    ),
  );
  assert.equal(links.length, 349);
  assert.equal(new Set(links.map((link) => link.shortUrl)).size, 321);
  assert.equal(authoredLinks.length, 292);
  assert.equal(
    new Set(authoredLinks.map((link) => link.shortUrl)).size,
    277,
  );
  assert.doesNotMatch(
    JSON.stringify(urbanhermitPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken|profileBiography)"\s*:|\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i,
  );
  assert.match(
    urbanhermitPopulationInventory.publicSafety.excluded,
    /Raw post text/i,
  );
});

test("Urbanhermit mission classifications are manifest-bound and auditable", () => {
  const classification =
    urbanhermitPopulationInventory.missionSignalClassification;
  const rules = new Map(
    classification.rules.map((rule) => [rule.signalId, rule]),
  );

  assert.deepEqual(
    classification.rules,
    urbanhermitMissionSignalRules.map((rule) => ({
      signalId: rule.id,
      pattern: rule.pattern.source,
      flags: rule.pattern.flags,
    })),
  );
  assert.deepEqual(classification.inputFields, [
    "source-post-body",
    "hashtag",
    "displayed-link-destination",
  ]);
  assert.ok(
    urbanhermitPopulationInventory.records.every((record) => {
      if (!/^[a-f0-9]{64}$/.test(record.classificationInputDigest)) return false;
      if (
        record.missionSignals.join("|") !==
        record.missionSignalEvidence
          .map((evidence) => evidence.signalId)
          .join("|")
      ) {
        return false;
      }
      return record.missionSignalEvidence.every((evidence) => {
        const rule = rules.get(evidence.signalId);
        return (
          rule &&
          classification.inputFields.includes(evidence.inputField) &&
          new RegExp(rule.pattern, rule.flags).test(evidence.matchedValue)
        );
      });
    }),
  );
  assert.deepEqual(
    urbanhermitPopulationInventory.publishingPattern.missionSignalRecordCounts,
    {
      "community-platforms-and-gatherings": 35,
      "civic-participation-and-service": 8,
      "cultural-space-advocacy": 45,
      "public-history-place-and-waterways": 2,
      "creative-technology-and-media": 4,
      "neighborhood-mutual-aid": 1,
    },
  );
});

test("Urbanhermit bounded incoming inventory preserves stakeholder and context limits", () => {
  const inventory = urbanhermitPopulationInventory.stakeholderInventory;
  const missionRelevant = inventory.records.filter(
    (record) => record.classification === "mission-relevant-third-party",
  );
  const missionContext = inventory.records.filter(
    (record) =>
      record.classification === "mission-relevant-conversation-context",
  );
  const contextLimited = inventory.records.filter(
    (record) =>
      record.classification === "context-limited-personal-or-network",
  );

  assert.equal(inventory.records.length, 26);
  assert.equal(new Set(inventory.records.map((record) => record.url)).size, 26);
  assert.equal(missionRelevant.length, 15);
  assert.equal(
    new Set(missionRelevant.map((record) => record.authorHandle)).size,
    9,
  );
  assert.equal(missionContext.length, 2);
  assert.equal(contextLimited.length, 9);
  assert.equal(
    Object.values(inventory.stakeholderGroupCounts).reduce(
      (sum, count) => sum + count,
      0,
    ),
    15,
  );
  assert.match(inventory.boundary, /not a complete historical engagement archive/i);
});

test("Urbanhermit population source pins the exact classified fixture commit", () => {
  const fixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json";
  const source = urbanhermitSources.find(
    (record) => record.id === "SRC-URBANHERM-FULL-POPULATION-2026-07-15",
  );
  const match = source.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/(apps\/www\/src\/data\/knowledge-bank\/fixtures\/urbanhermit-full-population\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], fixturePath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${fixturePath}`], {
      maxBuffer: 4 * 1024 * 1024,
    }),
    readFileSync(fixturePath),
  );
});

test("Urbanhermit archival production promotes strong claims without adding a route", () => {
  assert.equal(urbanhermitCaptures.length, 1);
  assert.equal(urbanhermitSources.length, 10);
  assert.equal(urbanhermitObservations.length, 12);
  assert.equal(urbanhermitClaims.length, 4);
  assert.equal(urbanhermitResearchTasks.length, 3);
  assert.equal(urbanhermitInquiries.length, 1);
  assert.deepEqual(urbanhermitReviewSummary, {
    profileReportedPostCount: 434,
    recoveredPopulationCount: 434,
    profileCountNotMaterialized: 0,
    postsTimelineUniqueCount: 421,
    repliesTimelineRenderedArticleCount: 436,
    conversationContextCount: 2,
    accountAuthoredRecordCount: 353,
    externalSourceNativeRepostRecordCount: 81,
    externalLinkOccurrences: 349,
    distinctExternalShortUrlCount: 321,
    incomingSearchRecordCount: 26,
    missionRelevantIncomingRecordCount: 15,
    missionRelevantIncomingAccountCount: 9,
  });

  const archiveClaim = urbanhermitClaims.find(
    (claim) =>
      claim.id === "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE",
  );
  const horseClaim = urbanhermitClaims.find(
    (claim) => claim.id === "CLM-URBANHERM-HORSE-LORDS-VIDEO",
  );
  const tunnelClaim = urbanhermitClaims.find(
    (claim) =>
      claim.id === "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING",
  );
  const tireClaim = urbanhermitClaims.find(
    (claim) =>
      claim.id === "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
  );

  assert.equal(archiveClaim.selectionState, "dormant");
  assert.equal(horseClaim.selectionState, "candidate");
  assert.equal(tunnelClaim.selectionState, "candidate");
  assert.equal(tireClaim.selectionState, "dormant");
  assert.ok(urbanhermitClaims.every((claim) => claim.evidence.length));
  assert.ok(urbanhermitClaims.every((claim) => claim.boundaries.length));
  assert.ok(urbanhermitClaims.every((claim) => claim.antiClaims.length));
  assert.ok(
    urbanhermitClaims.every((claim) =>
      claim.projections.every((projection) =>
        projection.surfaces.every((surface) => !surface.startsWith("/")),
      ),
    ),
  );
  assert.match(
    horseClaim.internalClaim,
    /co-created.*M\.C\. Schmidt.*NPR/i,
  );
  assert.match(
    tunnelClaim.internalClaim,
    /2006.*scavenger hunt.*8th Street Tunnel/i,
  );
  assert.match(
    tireClaim.internalClaim,
    /directly participated.*dump truck.*Northeast Kansas City/i,
  );
});

test("NYC Artist Coalition population source pins the exact classified fixture commit", () => {
  const fixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json";
  const source = socialMediaSources.find(
    (record) =>
      record.id === "SRC-SOCIAL-NYCAC-RETRIEVABLE-POPULATION-2026-07-14",
  );
  const match = source.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/(apps\/www\/src\/data\/knowledge-bank\/fixtures\/nycartc-retrievable-population\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], fixturePath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${fixturePath}`], {
      maxBuffer: 4 * 1024 * 1024,
    }),
    readFileSync(fixturePath),
  );
});

test("social-media claims use bounded counts and preserve shared-account authorship", () => {
  const callNycClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT",
  );
  const nycacClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-NYCAC-COUNCIL-SOCIAL-ENGAGEMENT",
  );
  const identityClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-NYCAC-SHARED-IDENTITY-STEWARDSHIP",
  );
  const nycacInfrastructureClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-NYCAC-SOCIAL-INFRASTRUCTURE",
  );
  const wowListClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-WOWLIST-SOCIAL-PRODUCT-SURFACE",
  );
  const callNycGuidanceClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-CALLNYC-SOCIAL-PUBLIC-GUIDANCE",
  );
  const kcTownHallClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-KCTH-SOCIAL-OPERATING-SURFACE",
  );

  assert.equal(callNycClaim.selectionState, "selected");
  assert.match(callNycClaim.projections[0].text, /at least eight distinct/i);
  assert.match(callNycClaim.boundaries.join("\n"), /deleted post|native repost/i);
  assert.match(callNycClaim.antiClaims.join("\n"), /official Council service/i);

  assert.equal(callNycGuidanceClaim.selectionState, "selected");
  assert.match(callNycGuidanceClaim.projections[0].text, /62 distinct service or API pathways/i);
  assert.match(callNycGuidanceClaim.boundaries.join("\n"), /107 unique records/i);
  assert.match(callNycGuidanceClaim.antiClaims.join("\n"), /All 110.*recovered/i);

  assert.equal(nycacClaim.selectionState, "selected");
  assert.match(nycacClaim.projections[0].text, /at least four Council Member/i);
  assert.match(nycacClaim.boundaries.join("\n"), /two incidental or logistical/i);
  assert.match(nycacClaim.antiClaims.join("\n"), /authored every/i);
  const nycacCapture = socialMediaCaptures.find(
    (capture) => capture.id === "CAP-SOCIAL-NYCAC-COUNCIL-ENGAGEMENT-2026",
  );
  for (const sourceId of [
    "SRC-NYCAC-LEVINE-INCIDENTAL-2020-03-20",
    "SRC-NYCAC-BRANNAN-INCIDENTAL-2019-08-30",
  ]) {
    assert.ok(nycacCapture.sourceIds.includes(sourceId));
    assert.ok(!nycacClaim.evidence.some((evidence) => evidence.sourceId === sourceId));
  }
  assert.ok(
    nycacClaim.researchTaskIds.includes(
      "RT-SOCIAL-NYCAC-POST-2020-MENTION-INVENTORY",
    ),
  );

  assert.equal(nycacInfrastructureClaim.selectionState, "selected");
  assert.match(
    nycacInfrastructureClaim.projections[0].text,
    /used a shared account as durable public infrastructure/i,
  );
  assert.match(
    nycacInfrastructureClaim.projections[0].text,
    /reviewed every one of the 3,123 unique status URLs X made retrievable/i,
  );
  assert.match(
    nycacInfrastructureClaim.projections[0].text,
    /cited knowledge record preserves the complete taxonomy, platform limits, and owner-archive boundary/i,
  );
  const nycacPopulationSource = socialMediaSources.find(
    (source) =>
      source.id === "SRC-SOCIAL-NYCAC-RETRIEVABLE-POPULATION-2026-07-14",
  );
  assert.match(
    nycacPopulationSource.publicNote,
    /2,001 profile-counted records outside the reviewed public surfaces/i,
  );
  assert.ok(
    nycacInfrastructureClaim.evidence.some(
      (evidence) =>
        evidence.sourceId === "SRC-X-HELP-MISSING-POSTS-2026-07-14" &&
        evidence.supports.includes("platform display and indexing limits"),
    ),
  );
  assert.ok(
    nycacInfrastructureClaim.evidence.some(
      (evidence) =>
        evidence.sourceId === "SRC-X-HELP-ARCHIVE-HISTORY-2026-07-14" &&
        evidence.supports.includes(
          "owner-archive route beyond the recent profile timeline",
        ),
    ),
  );
  assert.match(
    nycacInfrastructureClaim.boundaries.join("\n"),
    /3,123 of 5,124/i,
  );
  assert.match(
    nycacInfrastructureClaim.boundaries.join("\n"),
    /source authorship/i,
  );
  assert.match(
    nycacInfrastructureClaim.antiClaims.join("\n"),
    /All 5,124.*recovered/i,
  );
  assert.match(
    nycacInfrastructureClaim.antiClaims.join("\n"),
    /Jamie authored all/i,
  );

  assert.equal(identityClaim.selectionState, "dormant");
  assert.ok(
    identityClaim.projections.every(
      (projection) => projection.status === "hold" && !projection.surfaces.length,
    ),
  );
  assert.ok(identityClaim.evidence.every((evidence) => !evidence.renderCitation));
  assert.match(identityClaim.boundaries.join("\n"), /cannot establish who opened/i);

  assert.equal(wowListClaim.selectionState, "selected");
  assert.match(wowListClaim.projections[0].text, /all 38 profile-counted records/i);
  assert.match(wowListClaim.projections[0].text, /10 mission-relevant third-party accounts/i);
  assert.match(wowListClaim.boundaries.join("\n"), /not used as.*adoption/i);
  assert.match(wowListClaim.boundaries.join("\n"), /All 38 records/i);
  assert.match(wowListClaim.antiClaims.join("\n"), /Only 37.*38/i);

  assert.equal(kcTownHallClaim.selectionState, "selected");
  assert.match(kcTownHallClaim.projections[0].text, /all 183 profile-counted records/i);
  assert.match(
    kcTownHallClaim.projections[0].text,
    /three sitting Kansas City Council Member/i,
  );
  assert.match(kcTownHallClaim.boundaries.join("\n"), /100 tire-related records/i);
  assert.match(
    kcTownHallClaim.boundaries.join("\n"),
    /267 displayed interaction units/i,
  );
  assert.match(
    kcTownHallClaim.antiClaims.join("\n"),
    /self-published tire totals/i,
  );
  assert.match(kcTownHallClaim.antiClaims.join("\n"), /personally authored every/i);
  assert.ok(
    kcTownHallClaim.researchTaskIds.includes(
      "RT-SOCIAL-KCTH-TIRE-OUTCOME-CORROBORATION",
    ),
  );
});

test("social-media production exposes no authenticated-session secrets or private locators", () => {
  const protectedSource = socialMediaSources.find(
    (source) => source.id === "SRC-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP-2026",
  );
  assert.equal(protectedSource.visibility, "protected");
  assert.equal(protectedSource.canonicalUrl, undefined);
  assert.equal(protectedSource.archiveUrl, undefined);
  assert.equal(protectedSource.assetUrl, undefined);

  const payload = JSON.stringify({
    captures: socialMediaCaptures,
    sources: socialMediaSources,
    observations: socialMediaObservations,
    claims: socialMediaClaims,
    tasks: socialMediaResearchTasks,
    inquiries: socialMediaInquiries,
  });
  assert.doesNotMatch(
    payload,
    /\/Users\/|\/Volumes\/|cookie|session token|direct messages|private messages/i,
  );
  assert.match(payload, /Counts are a point-in-time observation/i);
  assert.doesNotMatch(
    JSON.stringify(socialMediaInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i,
  );
  assert.doesNotMatch(
    JSON.stringify(callNycPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i,
  );
  assert.doesNotMatch(
    JSON.stringify(kcTownHallPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\/|816-\d{3}-\d{4}/i,
  );
  assert.doesNotMatch(
    JSON.stringify(nycacPopulationInventory),
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i,
  );
});

test("Shared Drive projections retain draft, collaboration, and selection boundaries", () => {
  const workData = readFileSync("apps/www/src/data/work.ts", "utf8");
  const proofData = readFileSync("apps/www/src/data/proofs.ts", "utf8");
  const technicalPage = readFileSync(
    "apps/www/src/app/work/technical-operations/page.tsx",
    "utf8",
  );
  const residencyClaim = googleSharedDriveClaims.find(
    (item) => item.id === "CLM-196-RESIDENCY-ONBOARDING-HANDOFF",
  );
  const crsClaim = teamsArchiveClaims.find(
    (item) => item.id === "CLM-CRS-COALITION-OPERATING-SYSTEM",
  );

  assert.doesNotMatch(workData, /Privacy-aware archive overview workflow/);
  assert.doesNotMatch(proofData, /community-platform work/i);
  assert.match(
    workData,
    /Jamie-attributed multi-action working draft later edited by a collaborator/,
  );
  assert.match(
    crsClaim.projections.map((projection) => projection.text).join("\n"),
    /collaborative running minutes/,
  );
  assert.doesNotMatch(workData, /reusable workflow for schedule/i);
  assert.doesNotMatch(technicalPage, /reusable residency/i);
  assert.doesNotMatch(
    `${residencyClaim.internalClaim}\n${residencyClaim.projections
      .map((projection) => projection.text)
      .join("\n")}`,
    /reusable residency|reusable 196/i,
  );
});

test("raft scale remains collective and does not promote the unrecovered Gulf endpoint", () => {
  const claim = teamsArchiveClaims.find(
    (item) => item.id === "CLM-WATERWAYS-RAFT-EXPEDITION-SCALE",
  );
  assert.equal(claim.epistemicState, "corroborated");
  assert.equal(claim.selectionState, "candidate");
  assert.ok(
    claim.boundaries.some((item) => /toward the Gulf/i.test(item)),
  );
  assert.ok(
    claim.antiClaims.some((item) => /confirm arrival at the Gulf/i.test(item)),
  );
  assert.deepEqual(claim.researchTaskIds, [
    "RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION",
  ]);
  assert.ok(
    claim.projections
      .filter((projection) => projection.key === "case-study")
      .every(
        (projection) =>
          projection.status === "hold" && projection.surfaces.length === 0,
      ),
  );
});

test("June job-hunt packets preserve recovered proposal evidence and the follow-up gap", () => {
  const capture = teamsArchiveCaptures.find(
    (item) =>
      item.id === "CAP-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION-2026",
  );
  const task = teamsArchiveResearchTasks.find(
    (item) => item.id === "RT-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION",
  );
  const inquiry = teamsArchiveInquiries.find(
    (item) => item.id === "INQ-TEAMS-ICLOUD-WEB-RECONCILIATION-2026",
  );
  const claim = teamsArchiveClaims.find(
    (item) => item.id === "CLM-SOURCE-BACKED-MEMORY-PILOT-DESIGN",
  );

  assert.equal(capture.status, "researching");
  assert.deepEqual(capture.sourceIds, [
    "SRC-JOBHUNT-SOURCE-BACKED-MEMORY-SPRINT-2026-06-26",
  ]);
  assert.equal(capture.observationIds.length, 4);
  assert.deepEqual(capture.researchTaskIds, [task.id]);
  assert.equal(task.status, "in-progress");
  assert.ok(
    task.nextActions.some((item) => /June 30 follow-up body/i.test(item)),
  );
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.match(inquiry.findings.join("\n"), /body was not.*no claim is inferred/i);
  assert.equal(claim.selectionState, "candidate");
  assert.ok(claim.antiClaims.some((item) => /production AI memory platform/i.test(item)));
});

test("Fair Rent projects direct operating and data-design work with adoption boundaries", () => {
  const caseStudy = readFileSync(
    "apps/www/src/content/work/fair-rent-nyc.mdx",
    "utf8",
  );
  const workData = readFileSync("apps/www/src/data/work.ts", "utf8");
  const publicText = `${caseStudy}\n${workData}`;
  const page = knowledgeBank.pages.find((item) => item.id === "fair-rent-nyc");

  assert.match(publicText, /six-part coalition operating/i);
  assert.match(publicText, /legislative (source map and )?provenance redline/i);
  assert.match(publicText, /privacy-preserving public-data pilot/i);
  assert.match(publicText, /not claims? that a City agency adopted/i);
  assert.ok(
    page.occurrences.some(
      (item) => item.claimId === "CLM-CRS-COALITION-OPERATING-SYSTEM",
    ),
  );
  assert.ok(
    page.occurrences.some(
      (item) => item.claimId === "CLM-CRS-OPEN-DATA-IMPLEMENTATION-DESIGN",
    ),
  );
});

test("NYC Artist Coalition institutional value preserves chronology, reciprocity, and causal boundaries", () => {
  const sourceIds = [
    "SRC-NYCAC-FINKELPEARL-CREATENYC-TESTIMONY-2017-02-27",
    "SRC-NYCAC-FINKELPEARL-BUDGET-HEARING-2017-05-19",
    "SRC-NYCAC-CREATENYC-FINAL-PLAN-2017-07",
    "SRC-NYCAC-ESPINAL-REPEAL-LETTER-2017-04-18",
    "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-06-19",
  ];
  const claim = nycacResearchClaims.find(
    (item) => item.id === "CLM-NYCAC-CIVIC-INTERMEDIARY-VALUE",
  );
  const task = nycacResearchTasks.find(
    (item) => item.id === "RT-NYCAC-INSTITUTIONAL-USE-CORROBORATION",
  );
  const page = knowledgeBank.pages.find((item) => item.id === "fair-rent-nyc");
  const mdx = readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8");

  assert.ok(
    sourceIds.every((sourceId) =>
      nycacResearchSources.some((source) => source.id === sourceId),
    ),
  );
  assert.ok(
    sourceIds.every((sourceId) =>
      nycacResearchObservations.some(
        (observation) => observation.sourceId === sourceId,
      ),
    ),
  );
  assert.ok(
    nycacResearchCaptures.some(
      (capture) => capture.id === "CAP-NYCAC-FINKELPEARL-BUDGET-HEARING-2026",
    ),
  );
  assert.equal(claim.epistemicState, "corroborated");
  assert.equal(claim.publicationState, "approved");
  assert.equal(claim.selectionState, "selected");
  assert.ok(
    claim.boundaries.some((boundary) =>
      /February 27.*does not name.*May 19/is.test(boundary),
    ),
  );
  assert.ok(
    claim.boundaries.some((boundary) =>
      /institutional usefulness.*not.*private motives.*dependence/is.test(boundary),
    ),
  );
  assert.ok(
    claim.antiClaims.some((antiClaim) =>
      /could not act without NYC Artist Coalition/i.test(antiClaim),
    ),
  );
  assert.equal(task.status, "open");
  assert.ok(
    task.successCriteria.some((criterion) =>
      /private motive.*personal dependence.*but-for causality/i.test(criterion),
    ),
  );
  assert.ok(
    page.occurrences.some(
      (occurrence) =>
        occurrence.id === "civic-intermediary-value" &&
        occurrence.claimId === "CLM-NYCAC-CIVIC-INTERMEDIARY-VALUE",
    ),
  );
  assert.match(mdx, /CLM-NYCAC-CIVIC-INTERMEDIARY-VALUE/);
  assert.match(mdx, /February 27[\s\S]*without naming NYC[\s\S]*May 19 Council budget testimony/i);
  assert.match(mdx, /institutional usefulness, not private motive/i);
});

test("KC Town Hall funding chain preserves proposal role, recommendation, appropriation, and later disposition", () => {
  assert.equal(kcTownHallFundingCaptures.length, 2);
  assert.equal(kcTownHallFundingSources.length, 5);
  assert.equal(kcTownHallFundingObservations.length, 6);
  assert.equal(kcTownHallFundingClaims.length, 3);
  assert.equal(kcTownHallFundingInquiries.length, 1);
  assert.equal(kcTownHallFundingCorrections.length, 2);

  const roleClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-DEVELOPER-PRESENTER-ROLE",
  );
  const fundingClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-COUNCIL-FUNDING-CHAIN",
  );
  const transitionClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-MISSION-ALIGNED-TRANSITION",
  );
  const page = knowledgeBank.pages.find((item) => item.id === "kc-town-hall");

  assert.equal(roleClaim.epistemicState, "sourced");
  assert.equal(roleClaim.publicationState, "approved");
  assert.equal(roleClaim.selectionState, "selected");
  assert.deepEqual(
    roleClaim.evidence.map((item) => item.sourceId),
    ["SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019"],
  );
  assert.ok(
    roleClaim.antiClaims.some((item) =>
      /caused the Council appropriation/i.test(item),
    ),
  );

  assert.equal(fundingClaim.epistemicState, "corroborated");
  assert.equal(fundingClaim.publicationState, "approved");
  assert.equal(fundingClaim.selectionState, "selected");
  assert.deepEqual(
    fundingClaim.evidence.map((item) => [item.sourceId, item.relationship]),
    [
      ["SRC-KCTH-KCMO-RESOLUTION-190649-2019", "direct-support"],
      ["SRC-KCTH-KCMO-ORDINANCE-190642-2019", "direct-support"],
      ["SRC-KCTH-KCMO-ORDINANCE-240317-2024", "supports-boundary"],
    ],
  );
  assert.ok(
    fundingClaim.boundaries.some((item) => /receipt.*expenditure/i.test(item)),
  );
  assert.ok(
    fundingClaim.antiClaims.some((item) => /received \$490,539/i.test(item)),
  );
  assert.ok(
    fundingClaim.antiClaims.some((item) => /spent \$490,539/i.test(item)),
  );

  assert.equal(transitionClaim.epistemicState, "sourced");
  assert.equal(transitionClaim.publicationState, "approved");
  assert.equal(transitionClaim.selectionState, "selected");
  assert.deepEqual(
    transitionClaim.evidence.map((item) => [item.sourceId, item.renderCitation]),
    [["SRC-KCTH-JAMIE-TRANSITION-CLARIFICATION-2026", false]],
  );
  assert.ok(
    transitionClaim.boundaries.some((item) =>
      /first-hand.*official City records/i.test(item),
    ),
  );
  assert.ok(
    transitionClaim.antiClaims.some((item) =>
      /official Council records document/i.test(item),
    ),
  );

  const transitionSource = kcTownHallFundingSources.find(
    (source) =>
      source.id === "SRC-KCTH-JAMIE-TRANSITION-CLARIFICATION-2026",
  );
  const transitionCapture = kcTownHallFundingCaptures.find(
    (capture) => capture.id === "CAP-KCTH-MISSION-ALIGNED-TRANSITION-2026",
  );
  assert.equal(
    transitionCapture.summary,
    "Jamie transitioned the KC Town Hall project to a mission-aligned organization.",
  );
  assert.equal(transitionSource.kind, "firsthand-statement");
  assert.equal(transitionSource.visibility, "public-metadata-only");
  assert.equal(transitionSource.canonicalUrl, undefined);

  const officialFundingSourceOrder = [
    "SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019",
    "SRC-KCTH-KCMO-RESOLUTION-190649-2019",
    "SRC-KCTH-KCMO-ORDINANCE-190642-2019",
    "SRC-KCTH-KCMO-ORDINANCE-240317-2024",
  ];
  assert.deepEqual(
    page.sourceOrder.filter((sourceId) =>
      officialFundingSourceOrder.includes(sourceId),
    ),
    officialFundingSourceOrder,
  );
  assert.deepEqual(
    page.occurrences.find(
      (occurrence) => occurrence.id === "mission-aligned-transition",
    ).sourceIds,
    undefined,
  );
});

test("KC Town Hall Phase One preserves completed delivery, attributed roles, and protected research", () => {
  assert.equal(kcTownHallPhaseOneCaptures.length, 2);
  assert.equal(kcTownHallPhaseOneSources.length, 3);
  assert.equal(kcTownHallPhaseOneObservations.length, 7);
  assert.equal(kcTownHallPhaseOneClaims.length, 5);
  assert.equal(kcTownHallPhaseOneResearchTasks.length, 2);
  assert.equal(kcTownHallPhaseOneInquiries.length, 1);

  assert.ok(
    kcTownHallPhaseOneSources.every(
      (source) =>
        source.visibility !== "public" &&
        !source.canonicalUrl &&
        !source.archiveUrl &&
        !source.assetUrl,
    ),
  );
  assert.ok(
    kcTownHallPhaseOneClaims.every((claim) =>
      claim.evidence
        .filter((evidence) =>
          kcTownHallPhaseOneSources.some(
            (source) => source.id === evidence.sourceId,
          ),
        )
        .every((evidence) => !evidence.renderCitation),
    ),
  );

  const completionClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-PHASE-ONE-COLD-SHELL-COMPLETION",
  );
  const contractorClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
  );
  const surveyClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-SURVEY-DESIGN-AND-DECISION-INPUT",
  );
  const tireClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS",
  );
  const clevelandClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-CLEVELAND-UNIFY-DESIGN-STUDIO-SEED",
  );

  for (const claim of [completionClaim, contractorClaim, surveyClaim, tireClaim]) {
    assert.equal(claim.publicationState, "approved");
    assert.equal(claim.selectionState, "selected");
    assert.ok(claim.boundaries.length);
    assert.ok(claim.antiClaims.length);
  }
  assert.match(completionClaim.internalClaim, /\$189,629/);
  assert.ok(
    completionClaim.antiClaims.some((item) =>
      /City appropriation paid for Phase One/i.test(item),
    ),
  );
  assert.ok(
    contractorClaim.boundaries.some((item) =>
      /packet.*founder\/project manager, not general contractor/i.test(item),
    ),
  );
  assert.ok(
    surveyClaim.boundaries.some((item) => /raw survey.*phone numbers/i.test(item)),
  );
  assert.ok(
    tireClaim.boundaries.some((item) =>
      /exact aggregate tire and savings totals.*held/i.test(item),
    ),
  );
  assert.equal(clevelandClaim.selectionState, "dormant");
  assert.equal(
    kcTownHallPhaseOneResearchTasks.find(
      (task) => task.id === "RT-KCTH-CLEVELAND-UNIFY-ARCHIVE-RECOVERY",
    ).status,
    "open",
  );
});

test("KC Town Hall public projection states authorization and the unused-funds ending together", () => {
  const standaloneDataSurfaces = [
    "apps/www/src/data/work.ts",
    "apps/www/src/data/proofs.ts",
  ].map((path) => ({ path, text: readFileSync(path, "utf8") }));
  const caseStudy = readFileSync(
    "apps/www/src/content/work/kc-town-hall.mdx",
    "utf8",
  );
  const claimBank = readFileSync(
    "apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts",
    "utf8",
  );
  const publicText = [
    ...standaloneDataSurfaces.map(({ text }) => text),
    caseStudy,
    claimBank,
  ].join("\n");

  assert.match(
    publicText,
    /Council accepted and appropriated the amount in 2019/i,
  );
  assert.match(publicText, /withdrew|withdrawal/i);
  assert.match(publicText, /unused/i);
  assert.match(publicText, /Separately, the City/i);
  assert.doesNotMatch(publicText, /later transitioned/i);
  for (const { path, text } of standaloneDataSurfaces) {
    assert.match(
      text,
      /Jamie states that he transitioned the project to a mission-aligned organization/i,
      `${path} must carry the first-hand attribution on its own`,
    );
    assert.match(
      text,
      /Separately, the City/i,
      `${path} must separate Jamie's statement from the City record`,
    );
  }
  const workData = standaloneDataSurfaces.find(
    ({ path }) => path === "apps/www/src/data/work.ts",
  ).text;
  assert.match(
    workData,
    /years: "2018-2022; 2019 funding decision; 2024 disposition"/i,
  );
  assert.match(
    workData,
    /in Jamie's first-hand account, continuity through a mission-aligned transition/i,
  );
  assert.match(
    claimBank,
    /Jamie states that he transitioned the project to a mission-aligned organization/i,
  );
  assert.match(caseStudy, /Jamie's approved first-hand account/i);
  assert.match(caseStudy, /not a fact established by the City\s+records/i);
  assert.doesNotMatch(
    publicText,
    /including a \$490,539 public funding recommendation/i,
  );
  assert.match(
    caseStudy,
    /recommendation, Council acceptance, appropriation,[\s\S]*receipt or expenditure/i,
  );
});

test("NYC Artist Coalition Facebook event population preserves the 34-to-33 reconciliation", () => {
  assert.equal(nycacFacebookEventCaptures.length, 1);
  assert.equal(nycacFacebookEventSources.length, 13);
  assert.equal(nycacFacebookEventObservations.length, 19);
  assert.equal(nycacFacebookEventClaims.length, 4);
  assert.equal(nycacFacebookEventResearchTasks.length, 4);
  assert.equal(nycacFacebookEventInquiries.length, 1);

  const reconciliation = nycacFacebookEventInventory.populationReconciliation;
  const events = nycacFacebookEventInventory.events;
  assert.equal(reconciliation.pageDisplayedPastEventCount, 34);
  assert.equal(reconciliation.recoveredIndexEventCount, 33);
  assert.equal(reconciliation.recoveredDetailEventCount, 33);
  assert.equal(reconciliation.detailRetrievalFailureCount, 0);
  assert.equal(reconciliation.unmaterializedCount, 1);
  assert.equal(reconciliation.terminalState.scrollRounds, 9);
  assert.equal(reconciliation.terminalState.stableRounds, 4);
  assert.match(reconciliation.reconciliationNote, /unmaterialized, not as nonexistent/i);
  assert.equal(events.length, 33);
  assert.equal(new Set(events.map((event) => event.id)).size, 33);
  assert.equal(new Set(events.map((event) => event.url)).size, 33);
  assert.equal(events[0].date, "2017-01-27");
  assert.equal(events.at(-1).date, "2021-01-29");
  assert.ok(
    events.every(
      (event) =>
        event.url === `https://www.facebook.com/events/${event.id}/` &&
        event.retrievalState === "retrieved" &&
        event.topics.length,
    ),
  );
});

test("NYC Artist Coalition Facebook organizer and response findings reproduce from event rows", () => {
  const events = nycacFacebookEventInventory.events;
  const snapshot = nycacFacebookEventInventory.aggregateSnapshot;
  const nycacOrganizerEvents = events.filter(
    (event) => event.relationToPage === "index-displayed-nycac-organizer",
  );
  const alliedEvents = events.filter(
    (event) => event.relationToPage === "allied-or-cohosted-listing",
  );
  const responseEvents = events.filter(
    (event) => event.responseSnapshot.pointEstimate !== null,
  );
  const responsePointEstimate = responseEvents.reduce(
    (sum, event) => sum + event.responseSnapshot.pointEstimate,
    0,
  );

  assert.equal(nycacOrganizerEvents.length, 24);
  assert.equal(alliedEvents.length, 9);
  assert.equal(responseEvents.length, 32);
  assert.equal(responsePointEstimate, 9989);
  assert.equal(responseEvents.filter((event) => event.responseSnapshot.rounded).length, 3);
  assert.equal(
    responseEvents.filter((event) => event.responseSnapshot.pointEstimate >= 100).length,
    19,
  );
  assert.equal(
    responseEvents.filter((event) => event.responseSnapshot.pointEstimate >= 500).length,
    7,
  );
  assert.equal(
    responseEvents.filter((event) => event.responseSnapshot.pointEstimate >= 1000).length,
    3,
  );
  assert.equal(snapshot.indexDisplayedNycacOrganizerEvents, 24);
  assert.equal(snapshot.alliedOrCohostedListings, 9);
  assert.equal(snapshot.eventsWithDisplayedResponseCount, 32);
  assert.equal(snapshot.responseActionPointEstimate, 9989);
  assert.match(snapshot.interpretation, /not unique people.*do not establish attendance/i);
});

test("NYC Artist Coalition Facebook event fixture publishes sanitized metadata only", () => {
  const fixturePayload = JSON.stringify(nycacFacebookEventInventory);
  assert.equal(nycacFacebookEventInventory.publicSafety.rawDescriptionsPublished, false);
  assert.equal(nycacFacebookEventInventory.publicSafety.attendeeIdentitiesPublished, false);
  assert.equal(nycacFacebookEventInventory.publicSafety.contactDetailsPublished, false);
  assert.equal(nycacFacebookEventInventory.publicSafety.accessCredentialsPublished, false);
  assert.doesNotMatch(fixturePayload, /"(?:detailsText|description|cookie|cookies|session|sessionToken)"\s*:/i);
  assert.doesNotMatch(fixturePayload, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(fixturePayload, /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  assert.doesNotMatch(fixturePayload, /\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/);
  assert.doesNotMatch(fixturePayload, /zoom\.us|docs\.google\.com|fbclid=/i);
  assert.ok(
    nycacFacebookEventInventory.events.every((event) =>
      event.outboundResources.every(
        (resource) => !/zoom\.us|docs\.google\.com|fbclid=/i.test(resource.url),
      ),
    ),
  );
});

test("NYC Artist Coalition Facebook event-posted source articles remain associated and bounded", () => {
  const articles = nycacFacebookEventInventory.postedSourceArticles;
  assert.equal(articles.length, 7);
  assert.deepEqual(
    [...new Set(articles.map((article) => article.publisher))].sort(),
    [
      "Curbed",
      "Gothamist",
      "Metro",
      "New York Post",
      "The Baffler",
      "The New Yorker",
      "WNYC",
    ],
  );
  assert.ok(
    articles.some(
      (article) =>
        article.eventId === "1014934072187610" &&
        article.publisher === "Gothamist" &&
        /commercial-rent-stabilization/.test(article.url),
    ),
  );
  const gothamistSource = nycacFacebookEventSources.find(
    (source) =>
      source.id === "SRC-NYCAC-EVENT-LINK-GOTHAMIST-FAIR-RENT-2019-11-06",
  );
  assert.equal(gothamistSource.preservationStatus, "live-and-archived");
  assert.match(gothamistSource.archiveUrl, /web\/20191107031823/);
  assert.ok(
    gothamistSource.doesNotEstablish.some((boundary) =>
      /individual event-production role/i.test(boundary),
    ),
  );
});

test("NYC Artist Coalition Facebook claims separate collective method, RSVP scale, role, and interpretation", () => {
  const infrastructureClaim = nycacFacebookEventClaims.find(
    (claim) => claim.id === "CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE",
  );
  const responseClaim = nycacFacebookEventClaims.find(
    (claim) => claim.id === "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SNAPSHOT",
  );
  const roleClaim = nycacFacebookEventClaims.find(
    (claim) => claim.id === "CLM-NYCAC-JAMIE-EVENT-SYSTEM-ROLE",
  );
  const interpretationClaim = nycacFacebookEventClaims.find(
    (claim) => claim.id === "CLM-NYCAC-EVENTS-DEMOCRACY-LAB-INTERPRETATION",
  );

  assert.equal(infrastructureClaim.publicationState, "approved");
  assert.equal(infrastructureClaim.selectionState, "selected");
  assert.ok(
    infrastructureClaim.boundaries.some((boundary) => /34.*33|33.*34/i.test(boundary)),
  );
  assert.ok(
    infrastructureClaim.antiClaims.some((antiClaim) =>
      /Jamie alone created or produced every/i.test(antiClaim),
    ),
  );

  assert.equal(responseClaim.publicationState, "approved");
  assert.equal(responseClaim.selectionState, "selected");
  assert.ok(
    responseClaim.boundaries.some((boundary) =>
      /RSVP actions.*not unique people.*attendance/i.test(boundary),
    ),
  );
  assert.ok(
    responseClaim.antiClaims.some((antiClaim) => /9,989 people attended/i.test(antiClaim)),
  );

  assert.equal(roleClaim.selectionState, "candidate");
  assert.ok(
    roleClaim.projections
      .filter((projection) => projection.surfaces.some((surface) => surface.startsWith("/")))
      .every((projection) => projection.status === "hold"),
  );
  assert.ok(
    roleClaim.boundaries.some((boundary) =>
      /first-hand.*not yet independently corroborated/i.test(boundary),
    ),
  );

  assert.equal(interpretationClaim.selectionState, "dormant");
  assert.equal(interpretationClaim.status, "inference");
  assert.ok(
    interpretationClaim.boundaries.some((boundary) =>
      /Jamie's interpretation.*not a neutral empirical outcome/i.test(boundary),
    ),
  );
});

test("NYC Artist Coalition Facebook selected claims project through the Fair Rent page plan", () => {
  const page = knowledgeBank.pages.find((item) => item.id === "fair-rent-nyc");
  const mdx = readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8");
  assert.ok(
    page.occurrences.some(
      (occurrence) =>
        occurrence.id === "recurring-event-infrastructure" &&
        occurrence.claimId === "CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE",
    ),
  );
  assert.ok(
    page.occurrences.some(
      (occurrence) =>
        occurrence.id === "facebook-event-response-snapshot" &&
        occurrence.claimId === "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SNAPSHOT",
    ),
  );
  assert.match(mdx, /CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE/);
  assert.match(mdx, /CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SNAPSHOT/);
  assert.doesNotMatch(mdx, /CLM-NYCAC-JAMIE-EVENT-SYSTEM-ROLE/);
});

test("NYC Artist Coalition Facebook population source pins the committed public fixture", () => {
  const fixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json";
  const fixtureSource = nycacFacebookEventSources.find(
    (source) =>
      source.id === "SRC-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15",
  );
  const match = fixtureSource.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/(apps\/www\/src\/data\/knowledge-bank\/fixtures\/[a-z0-9-]+\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], fixturePath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${fixturePath}`]),
    readFileSync(fixturePath),
  );
});

test("Jamie Facebook hosted-event population reconciles all 21 materialized records", () => {
  const account = jamieWowListFacebookEventInventory.accounts.jamieBurkart;
  const events = account.events;

  assert.equal(account.displayedEventCount, 21);
  assert.equal(account.materializedEventCount, 21);
  assert.equal(account.detailRecoveredCount, 17);
  assert.equal(account.indexOnlyCount, 4);
  assert.equal(account.terminalNoGrowthPasses, 6);
  assert.equal(account.coverageState, "complete-as-materialized");
  assert.deepEqual(account.dateRange, {
    start: "2006-12-02",
    end: "2019-02-24",
  });
  assert.equal(events.length, 21);
  assert.equal(new Set(events.map((event) => event.eventId)).size, 21);
  assert.equal(new Set(events.map((event) => event.canonicalUrl)).size, 21);
  assert.equal(
    events.filter((event) => event.detailState === "recovered").length,
    17,
  );
  assert.equal(
    events.filter((event) => event.detailState === "index-only").length,
    4,
  );
  assert.ok(
    events.every(
      (event) =>
        event.canonicalUrl ===
          `https://www.facebook.com/events/${event.eventId}/` &&
        event.themes.length,
    ),
  );
});

test("Jamie event chronology reproduces Sunday Dinner, source-link, and response findings", () => {
  const events =
    jamieWowListFacebookEventInventory.accounts.jamieBurkart.events;
  const sundayDinners = events.filter((event) =>
    /Sunday Dinner/i.test(event.title),
  );
  const responseEvents = events.filter((event) =>
    Number.isInteger(event.displayedResponseCount),
  );
  const linkedEvents = events.filter((event) => event.sourceLinks.length);
  const links = events.flatMap((event) => event.sourceLinks);

  assert.equal(sundayDinners.length, 6);
  assert.ok(
    sundayDinners.some(
      (event) => event.eventId === "702417306475691" && /100/.test(event.title),
    ),
  );
  assert.ok(
    sundayDinners.some(
      (event) =>
        event.eventId === "551536301637994" &&
        event.sourceLinks.some(
          (link) =>
            link.url ===
            "https://wowlist.org/events/22791/sunday-dinner-200",
        ),
    ),
  );
  assert.equal(responseEvents.length, 17);
  assert.equal(
    responseEvents.reduce(
      (sum, event) => sum + event.displayedResponseCount,
      0,
    ),
    608,
  );
  assert.equal(
    responseEvents.filter((event) => event.displayedResponseCount >= 20).length,
    8,
  );
  assert.equal(
    responseEvents.filter((event) => event.displayedResponseCount >= 100)
      .length,
    3,
  );
  assert.equal(linkedEvents.length, 7);
  assert.equal(links.length, 16);
  assert.match(
    jamieWowListFacebookEventInventory.accounts.jamieBurkart.responseSnapshot
      .boundary,
    /not unique people.*attendance.*impact/i,
  );
});

test("WOW List current event zero remains separate from unresolved legacy history", () => {
  const account = jamieWowListFacebookEventInventory.accounts.wowList;
  assert.equal(account.materializedEventCount, 0);
  assert.equal(account.coverageState, "complete-as-materialized-with-legacy-gap");
  assert.equal(account.surfaceFindings.length, 2);
  assert.ok(
    account.surfaceFindings.every(
      (surface) => surface.materializedEventCount === 0,
    ),
  );
  assert.match(account.boundary, /does not establish.*no historical/i);

  const legacyClaim = jamieWowListFacebookEventClaims.find(
    (claim) => claim.id === "CLM-WOWLIST-FACEBOOK-EVENT-LEGACY-GAP",
  );
  assert.equal(legacyClaim.selectionState, "dormant");
  assert.equal(legacyClaim.status, "not-recovered");
  assert.ok(
    legacyClaim.antiClaims.some((antiClaim) =>
      /never created Facebook events/i.test(antiClaim),
    ),
  );
});

test("Jamie and WOW List Facebook event graph is public-safe and purposefully projected", () => {
  assert.equal(jamieWowListFacebookEventCaptures.length, 1);
  assert.equal(jamieWowListFacebookEventSources.length, 8);
  assert.equal(jamieWowListFacebookEventObservations.length, 15);
  assert.equal(jamieWowListFacebookEventClaims.length, 4);
  assert.equal(jamieWowListFacebookEventResearchTasks.length, 4);
  assert.equal(jamieWowListFacebookEventInquiries.length, 1);
  assert.deepEqual(jamieWowListFacebookEventReviewSummary, {
    personalHostedEvents: 21,
    personalDetailsRecovered: 17,
    personalIndexOnly: 4,
    sundayDinnerRecords: 6,
    eventLinkedUrls: 16,
    eventsWithResponseTotals: 17,
    displayedResponseActions: 608,
    wowListCurrentMaterializedEvents: 0,
    criterion:
      "The two materialized populations are fully reconciled, every personal record is represented, private details are excluded, response metrics remain bounded, and the WOW List historical gap is explicit.",
  });

  const fixturePayload = JSON.stringify(jamieWowListFacebookEventInventory);
  assert.doesNotMatch(
    fixturePayload,
    /"(?:description|attendees|friends|contact|cookie|cookies|session|sessionToken|credentials)"\s*:/i,
  );
  assert.doesNotMatch(fixturePayload, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(fixturePayload, /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  assert.doesNotMatch(fixturePayload, /\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/);

  const milestoneClaim = jamieWowListFacebookEventClaims.find(
    (claim) => claim.id === "CLM-196-FACEBOOK-MILESTONE-CHRONOLOGY",
  );
  const responseClaim = jamieWowListFacebookEventClaims.find(
    (claim) => claim.id === "CLM-JAMIE-FACEBOOK-EVENT-RESPONSE-SNAPSHOT",
  );
  const page = knowledgeBank.pages.find(
    (item) => item.id === "196-sunday-dinner",
  );
  const mdx = readFileSync(
    "apps/www/src/content/work/196-sunday-dinner.mdx",
    "utf8",
  );

  assert.equal(milestoneClaim.publicationState, "approved");
  assert.equal(milestoneClaim.selectionState, "selected");
  assert.equal(responseClaim.selectionState, "dormant");
  assert.ok(
    responseClaim.antiClaims.some((antiClaim) =>
      /608 people attended/i.test(antiClaim),
    ),
  );
  assert.ok(
    page.occurrences.some(
      (occurrence) =>
        occurrence.id === "facebook-milestone-chronology" &&
        occurrence.claimId === "CLM-196-FACEBOOK-MILESTONE-CHRONOLOGY",
    ),
  );
  assert.match(mdx, /CLM-196-FACEBOOK-MILESTONE-CHRONOLOGY/);
  assert.doesNotMatch(mdx, /608 (?:people|attendees)|verified attendance/i);
});

test("Jamie and WOW List Facebook population source pins the committed public fixture", () => {
  const fixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/jamie-wowlist-facebook-events-full-population.json";
  const fixtureSource = jamieWowListFacebookEventSources.find(
    (source) =>
      source.id ===
      "SRC-JAMIE-WOWLIST-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15",
  );
  const match = fixtureSource.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/(apps\/www\/src\/data\/knowledge-bank\/fixtures\/[a-z0-9-]+\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], fixturePath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${fixturePath}`]),
    readFileSync(fixturePath),
  );
});

test("WOW List Facebook post population preserves all 54 surviving records and dispositions", () => {
  const records = wowListFacebookPostInventory.records;
  assert.equal(records.length, 54);
  assert.equal(new Set(records.map((record) => record.postId)).size, 54);
  assert.deepEqual(
    records.map((record) => record.ordinal),
    Array.from({ length: 54 }, (_, index) => index + 1),
  );
  assert.equal(records[0].publishedOn, "2018-03-22");
  assert.equal(records.at(-1).publishedOn, "2015-04-25");
  assert.equal(
    records.filter((record) => record.detailRecovery === "recovered").length,
    50,
  );
  assert.equal(
    records.filter((record) => record.detailRecovery === "table-only").length,
    4,
  );
  assert.equal(
    records.filter(
      (record) => record.publisherAttribution === "Jamie Burkart",
    ).length,
    50,
  );
  assert.equal(
    records.filter(
      (record) => record.publisherAttribution === "not-recovered",
    ).length,
    4,
  );
  assert.ok(records.every((record) => record.themes.length));
  assert.equal(
    wowListFacebookPostInventory.populationReconciliation.coverageState,
    "complete-as-materialized",
  );
  assert.match(
    wowListFacebookPostInventory.populationReconciliation.boundary,
    /not a Meta owner export.*deleted.*unexposed/i,
  );
});

test("WOW List Facebook post source, mission, metric, and migration findings remain reproducible and bounded", () => {
  const records = wowListFacebookPostInventory.records;
  const normalizedLinks = new Set(
    records.flatMap((record) => record.sourceLinks),
  );
  assert.equal(normalizedLinks.size, 42);
  assert.equal(
    wowListFacebookPostInventory.linkInventory.normalizedDistinctUrlCount,
    42,
  );
  assert.equal(
    wowListFacebookPostInventory.linkInventory.detailRawDistinctUrlCount,
    48,
  );
  assert.deepEqual(
    wowListFacebookPostInventory.missionPatterns.recordCounts,
    {
      "community-calendar-onboarding": 18,
      "event-and-artist-distribution": 17,
      "cultural-space-support-and-mutual-aid": 19,
      "civic-mobilization": 12,
      "community-governance-and-product-feedback": 13,
      "community-care-and-remembrance": 9,
      "cultural-space-funding": 9,
    },
  );
  assert.deepEqual(wowListFacebookPostInventory.adminMetricSnapshot, {
    observedOn: "2026-07-15",
    interactions: 108,
    netFollows: 0,
    impressions: 512,
    comments: 11,
    boundary:
      "These are the values Facebook currently displays beside legacy rows. They may be incomplete or non-comparable across migrated records and must not be represented as historical lifetime reach, unique people, attendance, or policy impact.",
  });
  assert.match(
    wowListFacebookPostInventory.missionPatterns
      .stakeholderEngagementBoundary,
    /does not claim stakeholder-group engagement counts/i,
  );
  assert.match(
    wowListFacebookPostInventory.migrationBoundary.boundary,
    /migration boundary, not evidence.*no historical publishing/i,
  );
});

test("WOW List Facebook post graph is public-safe and projects only the publishing role", () => {
  assert.equal(wowListFacebookPostCaptures.length, 1);
  assert.equal(wowListFacebookPostSources.length, 4);
  assert.equal(wowListFacebookPostObservations.length, 9);
  assert.equal(wowListFacebookPostClaims.length, 4);
  assert.equal(wowListFacebookPostResearchTasks.length, 4);
  assert.equal(wowListFacebookPostInquiries.length, 1);
  assert.deepEqual(wowListFacebookPostReviewSummary, {
    records: 54,
    detailsRecovered: 50,
    tableOnly: 4,
    dateStart: "2015-04-25",
    dateEnd: "2018-03-22",
    detailsAttributedToJamie: 50,
    normalizedDestinations: 42,
    dashboardInteractions: 108,
    dashboardImpressions: 512,
    dashboardComments: 11,
    currentFollowers: 185,
    criterion:
      "Every materialized post has an identity and disposition, every recovered publisher byline is preserved, private social data is excluded, metrics and migration are bounded, and only the role claim is selected for the website.",
  });

  const fixturePayload = JSON.stringify(wowListFacebookPostInventory);
  assert.doesNotMatch(
    fixturePayload,
    /"(?:content|text|description|commenters|reactors|friends|privateProfile|cookie|cookies|session|sessionToken|credentials)"\s*:/i,
  );
  assert.doesNotMatch(fixturePayload, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(fixturePayload, /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  assert.doesNotMatch(fixturePayload, /\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/);

  const stewardshipClaim = wowListFacebookPostClaims.find(
    (claim) => claim.id === "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
  );
  const metricClaim = wowListFacebookPostClaims.find(
    (claim) => claim.id === "CLM-WOWLIST-FACEBOOK-DASHBOARD-SNAPSHOT",
  );
  const migrationClaim = wowListFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-WOWLIST-FACEBOOK-MANAGEMENT-MIGRATION-GAP",
  );
  const page = knowledgeBank.pages.find((item) => item.id === "wowlist");
  const mdx = readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8");

  assert.equal(stewardshipClaim.publicationState, "approved");
  assert.equal(stewardshipClaim.selectionState, "selected");
  assert.ok(
    stewardshipClaim.boundaries.some((boundary) =>
      /co-built.*Richard Album/i.test(boundary),
    ),
  );
  assert.equal(metricClaim.selectionState, "dormant");
  assert.equal(migrationClaim.status, "not-recovered");
  assert.ok(
    page.occurrences.some(
      (occurrence) =>
        occurrence.id === "facebook-publishing-stewardship" &&
        occurrence.claimId ===
          "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
    ),
  );
  assert.equal(
    (
      mdx.match(/CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP/g) ?? []
    ).length,
    1,
  );
  assert.doesNotMatch(mdx, /512 (?:people|users)|108 historical/i);
});

test("WOW List Facebook post population source pins the committed public fixture", () => {
  const fixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json";
  const fixtureSource = wowListFacebookPostSources.find(
    (source) =>
      source.id ===
      "SRC-WOWLIST-FACEBOOK-POSTS-FULL-POPULATION-2026-07-15",
  );
  const match = fixtureSource.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/(apps\/www\/src\/data\/knowledge-bank\/fixtures\/[a-z0-9-]+\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], fixturePath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${fixturePath}`]),
    readFileSync(fixturePath),
  );
});

test("NYC Artist Coalition Facebook post population preserves and reconciles all 444 dispositions", () => {
  const records = nycartcFacebookPostInventory.records;
  assert.equal(records.length, 444);
  assert.equal(new Set(records.map((record) => record.recordId)).size, 444);
  assert.deepEqual(
    records.map((record) => record.sequenceNewestToOldest),
    Array.from({ length: 444 }, (_, index) => index + 1),
  );
  assert.ok(
    records.every(
      (record) =>
        record.publicDetailStatus === "aggregate-only" &&
        record.themeCount === record.themes.length &&
        record.stakeholderGroupCount === record.stakeholderGroups.length,
    ),
  );
  assert.equal(
    Object.values(nycartcFacebookPostInventory.forms).reduce(
      (sum, count) => sum + count,
      0,
    ),
    444,
  );
  assert.equal(
    Object.values(nycartcFacebookPostInventory.primaryThemes).reduce(
      (sum, count) => sum + count,
      0,
    ),
    444,
  );
  const digest = createHash("sha256")
    .update(
      records
        .map((record) => record.recordId)
        .sort()
        .join("\n"),
    )
    .digest("hex");
  assert.equal(
    digest,
    nycartcFacebookPostInventory.population.publicDispositionSetSha256,
  );
  assert.equal(
    nycartcFacebookPostInventory.population.exactIdentitySetMatch,
    true,
  );
  assert.match(
    nycartcFacebookPostInventory.population.completenessBoundary,
    /not a native Meta export.*deletion history.*lifetime total/i,
  );
});

test("NYC Artist Coalition Facebook classifications, interactions, and routes remain reproducible", () => {
  assert.deepEqual(nycartcFacebookPostInventory.forms, {
    "event-route": 150,
    "standalone-post": 138,
    "original-media-post": 78,
    "reshared-story": 52,
    "source-or-resource-route": 26,
  });
  assert.deepEqual(nycartcFacebookPostInventory.primaryThemes, {
    "nightlife-enforcement-and-governance": 157,
    "general-coalition-communication": 95,
    "commercial-rent-and-tenancy": 71,
    "cultural-space-care": 47,
    "public-meetings-and-participation": 25,
    "funding-and-operational-resources": 21,
    "event-and-cultural-distribution": 15,
    "press-and-public-knowledge": 11,
    "equity-solidarity-and-mutual-aid": 2,
  });
  assert.deepEqual(
    nycartcFacebookPostInventory.stakeholderRouting.recordOccurrences,
    {
      "NYC Council members and Council": 88,
      "NYC cultural and nightlife agencies": 40,
      "Cultural and advocacy partners": 39,
      "NYC business and enforcement agencies": 13,
      "Press and public-information organizations": 12,
    },
  );
  assert.match(
    nycartcFacebookPostInventory.stakeholderRouting.boundary,
    /do not establish that a stakeholder saw, authored, endorsed, replied to, or acted/i,
  );

  const frequencies =
    nycartcFacebookPostInventory.visibleInteractionSnapshot
      .unlinkableValueFrequencies;
  const recordTotal = (rows) =>
    rows.reduce((sum, row) => sum + row.recordCount, 0);
  const valueTotal = (rows) =>
    rows.reduce((sum, row) => sum + row.value * row.recordCount, 0);
  for (const rows of Object.values(frequencies)) assert.equal(recordTotal(rows), 444);
  assert.equal(valueTotal(frequencies.reactions), 2374);
  assert.equal(valueTotal(frequencies.comments), 212);
  assert.equal(valueTotal(frequencies.shares), 611);

  const routes = nycartcFacebookPostRouteInventory.rows;
  assert.equal(routes.length, 33);
  assert.equal(new Set(routes.map((route) => route.routeId)).size, 33);
  assert.equal(
    routes.reduce((sum, route) => sum + route.occurrences, 0),
    64,
  );
  assert.equal(
    routes.filter((route) => route.disposition === "protected").length,
    2,
  );
  assert.ok(
    routes
      .filter((route) => route.disposition === "protected")
      .every((route) => route.publicUrl === null),
  );
});

test("NYC Artist Coalition Facebook graph preserves collective credit and bank-only selection", () => {
  assert.equal(nycartcFacebookPostCaptures.length, 2);
  assert.equal(nycartcFacebookPostSources.length, 12);
  assert.equal(nycartcFacebookPostObservations.length, 12);
  assert.equal(nycartcFacebookPostClaims.length, 6);
  assert.equal(nycartcFacebookPostResearchTasks.length, 3);
  assert.equal(nycartcFacebookPostInquiries.length, 3);
  assert.equal(nycartcFacebookPostAudit.ownerTimelineRecords, 444);
  assert.equal(nycartcFacebookPostReviewSummary.records, 444);
  assert.equal(nycartcFacebookPostReviewSummary.publisherAttribution, "unresolved");

  const stakeholderClaim = nycartcFacebookPostClaims.find(
    (claim) => claim.id === "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
  );
  const interactionClaim = nycartcFacebookPostClaims.find(
    (claim) => claim.id === "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS",
  );
  const roleClaim = nycartcFacebookPostClaims.find(
    (claim) => claim.id === "CLM-JAMIE-NYCAC-FACEBOOK-PUBLISHING-MEMORY",
  );
  assert.match(stakeholderClaim.boundaries.join("\n"), /not inbound actions/i);
  assert.match(
    stakeholderClaim.antiClaims.join("\n"),
    /Eighty-eight Council members engaged/i,
  );
  assert.match(interactionClaim.boundaries.join("\n"), /not historical peaks/i);
  assert.equal(roleClaim.publicationState, "restricted");
  assert.equal(roleClaim.selectionState, "dormant");
  assert.match(roleClaim.boundaries.join("\n"), /Do not assign any specific post/i);
  assert.ok(
    nycartcFacebookPostClaims.every((claim) =>
      claim.projections.every(
        (projection) =>
          projection.status !== "active" ||
          projection.surfaces.every((surface) => !surface.startsWith("/")),
      ),
    ),
  );

  const ledgerPayload = JSON.stringify(nycartcFacebookPostInventory);
  assert.doesNotMatch(
    ledgerPayload,
    /"(?:message|postText|commenters|reactors|friends|privateProfile|cookie|cookies|session|sessionToken|credentials|canonicalUrl)"\s*:/i,
  );
  assert.doesNotMatch(ledgerPayload, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(ledgerPayload, /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
});

test("NYC Artist Coalition Facebook sources pin the committed public ledgers", () => {
  for (const [sourceId, ledgerPath] of [
    [
      "SRC-FB-NYCAC-PUBLIC-POST-LEDGER-2026",
      "docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
    ],
    [
      "SRC-FB-NYCAC-PUBLIC-ROUTE-LEDGER-2026",
      "docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
    ],
  ]) {
    const source = nycartcFacebookPostSources.find((item) => item.id === sourceId);
    const match = source.canonicalUrl.match(
      /\/blob\/([0-9a-f]{40})\/((?:apps\/www\/src\/data\/knowledge-bank\/fixtures|docs\/knowledge-bank\/data)\/[a-z0-9-]+\.json)$/,
    );
    assert.ok(match);
    assert.equal(match[2], ledgerPath);
    assert.deepEqual(
      execFileSync("git", ["show", `${match[1]}:${ledgerPath}`]),
      readFileSync(ledgerPath),
    );
  }
});

test("KC Spaces Fund Facebook population preserves all 40 surviving public dispositions", () => {
  const records = kcSpacesFundFacebookPostInventory.records;
  assert.equal(records.length, 40);
  assert.equal(new Set(records.map((record) => record.id)).size, 40);
  assert.deepEqual(
    kcSpacesFundFacebookPostInventory.completeness.terminalTraversalCounts,
    [40, 38, 40],
  );
  assert.equal(
    kcSpacesFundFacebookPostInventory.completeness
      .stableMediaSetMatchedAcrossAllTraversals,
    true,
  );
  assert.equal(
    new Set(records.flatMap((record) => record.mediaIds ?? [])).size,
    21,
  );
  assert.equal(
    records.filter((record) => record.recordForm === "media-backed").length,
    20,
  );
  assert.equal(
    records.filter((record) => record.recordForm === "non-media").length,
    20,
  );
  assert.equal(
    records.filter((record) =>
      record.missionModes.includes("funded-space-spotlight"),
    ).length,
    10,
  );
  assert.equal(
    records.filter((record) =>
      record.missionModes.includes("application-routing"),
    ).length,
    8,
  );
  assert.equal(
    records.filter((record) => record.missionModes.includes("fundraising"))
      .length,
    13,
  );
  assert.equal(
    records.reduce(
      (sum, record) => sum + (record.visibleReactionSignals ?? 0),
      0,
    ),
    119,
  );
});

test("KC Spaces Fund Facebook graph preserves role, metric, and bank-only boundaries", () => {
  assert.equal(kcSpacesFundFacebookPostCaptures.length, 1);
  assert.equal(kcSpacesFundFacebookPostSources.length, 10);
  assert.equal(kcSpacesFundFacebookPostObservations.length, 8);
  assert.equal(kcSpacesFundFacebookPostClaims.length, 7);
  assert.equal(kcSpacesFundFacebookPostResearchTasks.length, 3);
  assert.equal(kcSpacesFundFacebookPostInquiries.length, 3);
  assert.equal(kcSpacesFundFacebookPostAudit.survivingPublicRecords, 40);
  assert.equal(kcSpacesFundFacebookPostReviewSummary.records, 40);
  assert.equal(
    kcSpacesFundFacebookPostReviewSummary.publisherAttribution,
    "unresolved",
  );
  assert.equal(kcSpacesFundFacebookPostReviewSummary.websiteUpdate, "not-required");

  const interactionClaim = kcSpacesFundFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-KCSPACESFUND-FACEBOOK-INTERACTION-SNAPSHOT",
  );
  const infrastructureClaim = kcSpacesFundFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-JAMIE-KCSPACESFUND-DIGITAL-INFRASTRUCTURE",
  );
  const namingClaim = kcSpacesFundFacebookPostClaims.find(
    (claim) => claim.id === "CLM-JAMIE-KCSPACESFUND-NAMING-MEMORY",
  );
  const outcomeClaim = kcSpacesFundFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-KCSPACESFUND-FUNDRAISING-AND-SPOTLIGHTS",
  );
  assert.match(
    interactionClaim.boundaries.join("\n"),
    /not unique people or historical peak/i,
  );
  assert.match(interactionClaim.antiClaims.join("\n"), /reached 119 people/i);
  assert.match(
    infrastructureClaim.boundaries.join("\n"),
    /Do not assign Jamie Facebook posting/i,
  );
  assert.equal(namingClaim.publicationState, "restricted");
  assert.equal(namingClaim.selectionState, "dormant");
  assert.match(namingClaim.boundaries.join("\n"), /not automatic corroboration/i);
  assert.match(outcomeClaim.antiClaims.join("\n"), /Jamie raised \$9,590/i);
  assert.ok(
    kcSpacesFundFacebookPostClaims.every((claim) =>
      claim.projections.every(
        (projection) =>
          projection.status !== "active" ||
          projection.surfaces.every((surface) => !surface.startsWith("/")),
      ),
    ),
  );

  const ledgerPayload = JSON.stringify(kcSpacesFundFacebookPostInventory);
  assert.doesNotMatch(
    ledgerPayload,
    /"(?:message|postText|fullTranscript|commenterName|reactorName|cookie|cookies|session|sessionToken|credentials|contactDetails)"\s*:/i,
  );
  assert.doesNotMatch(ledgerPayload, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(ledgerPayload, /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
});

test("KC Spaces Fund Facebook source pins the committed public ledger", () => {
  const ledgerPath =
    "docs/knowledge-bank/data/kcspacesfund-public-facebook-post-ledger.json";
  const source = kcSpacesFundFacebookPostSources.find(
    (item) => item.id === "SRC-FB-KCSPACESFUND-PUBLIC-LEDGER-2026",
  );
  const match = source.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/((?:apps\/www\/src\/data\/knowledge-bank\/fixtures|docs\/knowledge-bank\/data)\/[a-z0-9-]+\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], ledgerPath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${ledgerPath}`]),
    readFileSync(ledgerPath),
  );
});

test("Jamie personal Facebook population preserves the returned-surface denominator", () => {
  const control = jamiePersonalFacebookPostInventory.populationControl;
  assert.equal(control.cursorPages, 621);
  assert.equal(control.returnedNodes, 3728);
  assert.equal(control.uniqueRecords, 1243);
  assert.equal(control.terminalHasNextPage, false);
  assert.equal(control.missingDates, 0);
  assert.equal(control.ownerAbsentRecords, 0);
  assert.equal(control.recoveredStart, "2006-12-19");
  assert.equal(control.recoveredEnd, "2022-06-12");
  assert.equal(control.audienceLabelExposedRecords, 270);
  assert.equal(control.audienceLabelNotExposedRecords, 973);
  assert.equal(
    Object.values(jamiePersonalFacebookPostInventory.recordsByYear).reduce(
      (sum, count) => sum + count,
      0,
    ),
    1243,
  );
  assert.equal(
    Object.values(jamiePersonalFacebookPostInventory.recordForms).reduce(
      (sum, count) => sum + count,
      0,
    ),
    1243,
  );
  assert.match(
    jamiePersonalFacebookPostInventory.completenessBoundary,
    /not a native Meta export.*deletion history.*lifetime population/i,
  );
});

test("Jamie personal Facebook routing remains research infrastructure rather than engagement proof", () => {
  assert.equal(
    jamiePersonalFacebookPostInventory.missionRouting.uniqueRecords,
    181,
  );
  assert.equal(
    jamiePersonalFacebookPostInventory.postedUrlInventory.urlBearingRecords,
    430,
  );
  assert.equal(
    jamiePersonalFacebookPostInventory.postedUrlInventory
      .uniqueNormalizedExternalUrls,
    549,
  );
  assert.deepEqual(
    jamiePersonalFacebookPostInventory.stakeholderRouting.recordCounts,
    {
      newYorkCityCouncil: 20,
      rafaelEspinal: 18,
      marketHotel: 9,
      officeOfNightlife: 6,
      antonioReynoso: 5,
      quintonLucas: 1,
      helenRosenthal: 1,
    },
  );
  assert.match(
    jamiePersonalFacebookPostInventory.stakeholderRouting
      .classificationBoundary,
    /not actions by the named stakeholders.*not evidence of engagement/i,
  );
  assert.match(
    jamiePersonalFacebookPostInventory.postedUrlInventory.routingBoundary,
    /source lead until independently recovered/i,
  );
});

test("Jamie personal Facebook graph preserves privacy, role, metric, and bank-only boundaries", () => {
  assert.equal(jamiePersonalFacebookPostCaptures.length, 2);
  assert.equal(jamiePersonalFacebookPostSources.length, 9);
  assert.equal(jamiePersonalFacebookPostObservations.length, 13);
  assert.equal(jamiePersonalFacebookPostClaims.length, 8);
  assert.equal(jamiePersonalFacebookPostResearchTasks.length, 3);
  assert.equal(jamiePersonalFacebookPostInquiries.length, 3);
  assert.equal(jamiePersonalFacebookPostAudit.uniqueRecords, 1243);
  assert.equal(jamiePersonalFacebookPostReviewSummary.records, 1243);
  assert.equal(
    jamiePersonalFacebookPostReviewSummary.normalizedExternalDestinations,
    549,
  );
  assert.equal(jamiePersonalFacebookPostReviewSummary.rawPopulation, "protected");
  assert.equal(jamiePersonalFacebookPostReviewSummary.websiteUpdate, "not-required");

  const populationClaim = jamiePersonalFacebookPostClaims.find(
    (claim) => claim.id === "CLM-FB-JAMIE-POST-POPULATION-2026",
  );
  const stakeholderClaim = jamiePersonalFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026",
  );
  const interactionClaim = jamiePersonalFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-FLOOR-2026",
  );
  const councilStatClaim = jamiePersonalFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE",
  );
  const kcTownHallClaim = jamiePersonalFacebookPostClaims.find(
    (claim) =>
      claim.id === "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE",
  );
  assert.match(populationClaim.boundaries.join("\n"), /not a native Meta export/i);
  assert.match(populationClaim.antiClaims.join("\n"), /All 1,243 records were public/i);
  assert.match(stakeholderClaim.boundaries.join("\n"), /not inbound actions/i);
  assert.match(
    stakeholderClaim.antiClaims.join("\n"),
    /Council stakeholders engaged/i,
  );
  assert.match(interactionClaim.boundaries.join("\n"), /Do not sum the counters/i);
  assert.equal(councilStatClaim.publicationState, "restricted");
  assert.equal(councilStatClaim.selectionState, "dormant");
  assert.match(councilStatClaim.boundaries.join("\n"), /infer no employment/i);
  assert.match(kcTownHallClaim.boundaries.join("\n"), /Credit Julia Fredenburg/i);
  assert.ok(
    jamiePersonalFacebookPostClaims.every((claim) =>
      claim.projections.every(
        (projection) =>
          projection.status !== "active" ||
          projection.surfaces.every((surface) => !surface.startsWith("/")),
      ),
    ),
  );

  const controlsPayload = JSON.stringify(jamiePersonalFacebookPostInventory);
  assert.doesNotMatch(
    controlsPayload,
    /"(?:message|postText|fullTranscript|commenterName|reactorName|friendName|cookie|cookies|session|sessionToken|credentials|contactDetails)"\s*:/i,
  );
  assert.doesNotMatch(controlsPayload, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(controlsPayload, /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
});

test("Jamie personal Facebook controls source pins the committed public fixture", () => {
  const fixturePath =
    "docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json";
  const source = jamiePersonalFacebookPostSources.find(
    (item) => item.id === "SRC-FB-JAMIE-POST-CONTROLS-2026",
  );
  const match = source.canonicalUrl.match(
    /\/blob\/([0-9a-f]{40})\/(docs\/knowledge-bank\/data\/[a-z0-9-]+\.json)$/,
  );
  assert.ok(match);
  assert.equal(match[2], fixturePath);
  assert.deepEqual(
    execFileSync("git", ["show", `${match[1]}:${fixturePath}`]),
    readFileSync(fixturePath),
  );
});
