import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { socialMediaArchiveProduction } from "../../apps/www/src/data/knowledge-bank/social-media-archive-production.ts";
import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "../lib/knowledge-evals.mjs";

const suite = loadKnowledgeEvalSuite();

test("knowledge-bank pilot retains every supplied intake item", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-INTAKE")?.score, 5);
});

test("mature but unselected claims remain held off public surfaces", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 5);
});

test("selected NYCAC claims improve existing-site citation coverage", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-COVERAGE")?.score, 5);
});

test("NYCAC source expansion retains exactly ten newly researched sources", () => {
  const expansion = suite.pilot.sourceExpansion;
  assert.equal(expansion.sourceIds.length, 10);
  assert.equal(expansion.intakeIds.length, 10);
  assert.equal(new Set(expansion.sourceIds).size, 10);
  assert.ok(expansion.sourceIds.every((id) => knowledgeBank.sources.some((source) => source.id === id)));
  assert.ok(expansion.intakeIds.every((id) => knowledgeBank.intakeItems.some((intake) => intake.id === id && intake.disposition === "integrated")));
});

test("NYCAC source expansion rejects an unbounded source", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.sourceExpansion.sourceIds[0]
  );
  assert.ok(source);
  const original = source.doesNotEstablish;

  try {
    source.doesNotEstablish = [];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.doesNotEstablish = original;
  }
});

test("campaign press archive retains every appearance and distinct article identity", () => {
  const press = suite.pilot.pressArchive;
  const entries = campaignPressInventory.flatMap((campaign) => campaign.entries);
  const sourceIds = new Set(entries.map((entry) => entry.sourceId));

  assert.equal(campaignPressInventory.length, press.expectedIndexCount);
  assert.equal(entries.length, press.expectedAppearanceCount);
  assert.equal(sourceIds.size, press.expectedUniqueArticleCount);
  assert.deepEqual(
    Object.fromEntries(campaignPressInventory.map((campaign) => [campaign.id, campaign.entries.length])),
    press.campaignEntryCounts
  );
  assert.equal(
    entries.filter((entry) => entry.sourceId === press.duplicateSourceId).length,
    2
  );
  assert.equal(nycacPressArchive.sources.length, press.expectedNewSourceCount);
  assert.equal(
    nycacPressArchive.sources.filter((source) => source.kind === "published-article").length,
    press.expectedNewArticleSourceCount
  );
});

test("campaign press archive completeness is a hard evaluation gate", () => {
  const press = suite.pilot.pressArchive;
  const intake = knowledgeBank.intakeItems.find((item) => item.id === press.intakeIds[0]);
  assert.ok(intake);
  const removedObservationId = intake.observationIds.pop();

  try {
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PRESS-ARCHIVE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    intake.observationIds.push(removedObservationId);
  }
});

test("campaign press articles remain bounded source leads until close reading", () => {
  const press = suite.pilot.pressArchive;
  const sourceIds = new Set(campaignPressInventory.flatMap((campaign) => campaign.entries.map((entry) => entry.sourceId)));
  const sources = [...sourceIds].map((id) => knowledgeBank.sources.find((source) => source.id === id));
  const claim = knowledgeBank.claims.find((item) => item.id === press.claimId);

  assert.ok(sources.every((source) => source?.doesNotEstablish.length));
  assert.ok(claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0));
});

test("KC Town Hall funding lifecycle retains the Council action and later disposition", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FUNDING-LIFECYCLE")?.score,
    5
  );
});

test("KC Town Hall funding lifecycle rejects omission of the 2024 disposition", () => {
  const pilot = suite.pilot.kcTownHallFunding;
  const intake = knowledgeBank.intakeItems.find((item) => item.id === pilot.intakeId);
  assert.ok(intake);
  const removedObservationId = intake.observationIds.pop();

  try {
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FUNDING-LIFECYCLE")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    intake.observationIds.push(removedObservationId);
  }
});

test("KC Town Hall funding lifecycle rejects appropriation-as-receipt language", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019"
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const originalText = projection.text;

  try {
    projection.text = "KC Town Hall received the $490,539.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FUNDING-LIFECYCLE")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("KC Town Hall stewardship transition remains retained, bounded, and held", () => {
  const pilot = suite.pilot.kcTownHallFunding;
  const intake = knowledgeBank.intakeItems.find((item) => item.id === pilot.transitionIntakeId);
  const observation = knowledgeBank.observations.find(
    (item) => item.id === pilot.transitionObservationId
  );
  const claim = knowledgeBank.claims.find((item) => item.id === pilot.transitionClaimId);
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === pilot.transitionInquiryId
  );

  assert.equal(intake?.disposition, "captured");
  assert.equal(intake?.sourceIds.length, 0);
  assert.equal(observation?.kind, "participant-memory");
  assert.equal(observation?.status, "captured");
  assert.equal(claim?.status, "use-with-care");
  assert.ok(claim?.antiClaims.includes("Jamie abandoned the project."));
  assert.ok(
    claim?.projections.every(
      (projection) => projection.status === "hold" && projection.surfaces.length === 0
    )
  );
  assert.equal(inquiry?.resultStatus, "inconclusive");
  assert.equal(inquiry?.sourceIds.length, 0);
});

test("KC Town Hall eval rejects accidental publication of the transition lead", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.kcTownHallFunding.transitionClaimId
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const original = { status: projection.status, surfaces: [...projection.surfaces] };

  try {
    projection.status = "active";
    projection.surfaces = ["/work/kc-town-hall"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FUNDING-LIFECYCLE")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    projection.status = original.status;
    projection.surfaces = original.surfaces;
  }
});

test("Teams archive production retains the complete three-family evidence graph", () => {
  const pilot = suite.pilot.teamsArchiveProduction;
  const result = evaluateKnowledgeBank(suite);

  assert.equal(pilot.intakeIds.length, pilot.expectedIntakeCount);
  assert.equal(pilot.sourceIds.length, pilot.expectedSourceCount);
  assert.equal(pilot.claimIds.length, pilot.expectedClaimCount);
  assert.equal(pilot.inquiryIds.length, pilot.expectedInquiryCount);
  assert.deepEqual(pilot.archiveGroups, {
    jamieProjectsHistory: 6,
    crs: 4,
    jobHunt: 2
  });
  assert.equal(
    result.criteria.find(
      (item) => item.criterionId === "KB-EVAL-TEAMS-ARCHIVE-PRODUCTION"
    )?.score,
    5
  );
});

test("Teams archive private sources retain protected locators and cannot enter the public registry", () => {
  const pilot = suite.pilot.teamsArchiveProduction;
  const publicRegistry = readFileSync(
    new URL("../../apps/www/src/data/knowledge-bank/public-registry.json", import.meta.url),
    "utf8"
  );

  for (const sourceId of pilot.privateSourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    assert.ok(source);
    assert.notEqual(source.visibility, "public");
    assert.equal(source.preservationStatus, "private");
    assert.ok(source.protectedLocatorId);
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
    assert.equal(publicRegistry.includes(sourceId), false);
  }
});

test("Teams archive eval rejects accidental publication of a held CRS claim", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CRS-OPEN-DATA-FOUNDATION-DESIGN"
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const original = { status: projection.status, surfaces: [...projection.surfaces] };

  try {
    projection.status = "active";
    projection.surfaces = ["/work/fair-rent-nyc"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-TEAMS-ARCHIVE-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    projection.status = original.status;
    projection.surfaces = original.surfaces;
  }
});

test("Teams archive inquiry preserves the iCloud materialization limitation", () => {
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-TEAMS-ARCHIVE-PRODUCTION-2026-07-14"
  );

  assert.ok(inquiry);
  assert.ok(
    inquiry.limitations.some(
      (limitation) =>
        limitation.includes("did not materialize") &&
        limitation.includes("does not prove")
    )
  );
});

test("Teams archive promotes only the independently supported CallNYC recognition", () => {
  const pilot = suite.pilot.teamsArchiveProduction;
  const activeClaims = pilot.claimIds
    .map((id) => knowledgeBank.claims.find((claim) => claim.id === id))
    .filter((claim) => claim?.projections.some((projection) => projection.status === "active"));

  assert.deepEqual(activeClaims.map((claim) => claim.id), [pilot.activeClaimId]);
  assert.equal(
    activeClaims[0].evidence.some(
      (evidence) =>
        evidence.sourceId === pilot.callnycSourceId && evidence.renderCitation === true
    ),
    true
  );
});

test("Shared Drives production retains the bounded seven-source evidence graph", () => {
  const pilot = suite.pilot.googleDriveSharedDrivesProduction;
  const result = evaluateKnowledgeBank(suite);

  assert.equal(pilot.expectedDriveCount, 110);
  assert.equal(pilot.expectedInspectedRootCount, 26);
  assert.equal(pilot.expectedCloseReadArtifactCount, 7);
  assert.equal(pilot.intakeIds.length, pilot.expectedIntakeCount);
  assert.equal(pilot.sourceIds.length, pilot.expectedSourceCount);
  assert.equal(pilot.claimIds.length, pilot.expectedClaimCount);
  assert.equal(pilot.inquiryIds.length, pilot.expectedInquiryCount);
  assert.equal(
    result.criteria.find(
      (item) => item.criterionId === "KB-EVAL-GDRIVE-SHARED-DRIVES-PRODUCTION"
    )?.score,
    5
  );
});

test("Shared Drives private sources cannot expose Drive URLs or enter the public registry", () => {
  const pilot = suite.pilot.googleDriveSharedDrivesProduction;
  const publicRegistry = readFileSync(
    new URL("../../apps/www/src/data/knowledge-bank/public-registry.json", import.meta.url),
    "utf8"
  );

  for (const sourceId of pilot.privateSourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    assert.ok(source);
    assert.notEqual(source.visibility, "public");
    assert.equal(source.preservationStatus, "private");
    assert.ok(source.protectedLocatorId);
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
    assert.equal(publicRegistry.includes(sourceId), false);
    assert.equal(publicRegistry.includes(source.protectedLocatorId), false);
  }
});

test("Shared Drives production rejects accidental publication of a held claim", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-COMMERCIAL-VACANCY-PRIVACY-PRESERVING-PILOT-DESIGN"
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const original = { status: projection.status, surfaces: [...projection.surfaces] };

  try {
    projection.status = "active";
    projection.surfaces = ["/work/fair-rent-nyc"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-GDRIVE-SHARED-DRIVES-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    projection.status = original.status;
    projection.surfaces = original.surfaces;
  }
});

test("Shared Drives production preserves collaborator authorship for email guides", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-GDRIVE-NYCAC-IOS-EMAIL-ONBOARDING-2020"
  );
  assert.ok(source);
  const originalAuthor = source.author;

  try {
    source.author = "Jamie Burkart";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-GDRIVE-SHARED-DRIVES-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    source.author = originalAuthor;
  }
});

test("Shared Drives production preserves the non-exhaustive access limitation", () => {
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-GDRIVE-SHARED-DRIVES-PRODUCTION-2026-07-14"
  );
  assert.ok(inquiry);
  const original = [...inquiry.limitations];

  try {
    inquiry.limitations = inquiry.limitations.filter(
      (limitation) => !/not an exhaustive review|does not prove ownership/i.test(limitation)
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-GDRIVE-SHARED-DRIVES-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    inquiry.limitations = original;
  }
});

test("Shared Drives production keeps the resident count separate from gathering evidence", () => {
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-GDRIVE-SUNDAY-DINNER-AND-196-SCALE"
  );
  const ledger = knowledgeBank.sources.find(
    (item) => item.id === "SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER"
  );

  assert.ok(inquiry?.findings.some((finding) => /not independently established/i.test(finding)));
  assert.ok(ledger?.doesNotEstablish.includes("20-plus resident artists"));
});

test("photo feedback is instantiated as a protected research chain", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-RECOMPOSITION")?.score, 5);
});

test("photo feedback rejects an accidental publication-clearance mutation", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.photoFeedbackChain.sourceId
  );
  assert.ok(source?.media);
  const original = {
    rightsStatus: source.media.rightsStatus,
    consentStatus: source.media.consentStatus,
    publicDisplayStatus: source.media.publicDisplayStatus
  };

  try {
    source.media.rightsStatus = "cleared";
    source.media.consentStatus = "cleared";
    source.media.publicDisplayStatus = "cleared";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-RECOMPOSITION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.media.rightsStatus = original.rightsStatus;
    source.media.consentStatus = original.consentStatus;
    source.media.publicDisplayStatus = original.publicDisplayStatus;
  }
});

test("photo feedback requires an explicit hold and protected locator", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.photoFeedbackChain.sourceId
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.photoFeedbackChain.claimId
  );
  assert.ok(source?.protectedLocatorId);
  assert.ok(claim?.projections.length);
  const projection = claim.projections[0];
  const originalStatus = projection.status;
  const originalLocator = source.protectedLocatorId;

  try {
    projection.status = "deprecated";
    let result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-RECOMPOSITION")?.score, 1);
    assert.equal(result.accepted, false);

    projection.status = originalStatus;
    delete source.protectedLocatorId;
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-RECOMPOSITION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.status = originalStatus;
    source.protectedLocatorId = originalLocator;
  }
});

test("social archive production preserves five accounts and bounded official engagement", () => {
  const pilot = suite.pilot.socialMediaArchiveProduction;
  const result = evaluateKnowledgeBank(suite);

  assert.equal(socialMediaArchiveProduction.inventory.accounts.length, 5);
  assert.equal(socialMediaArchiveProduction.sources.length, pilot.expectedSourceCount);
  assert.equal(pilot.callnycCouncilPostIds.length, 7);
  assert.equal(pilot.nycacCouncilPostIds.length, 5);
  assert.equal(
    result.criteria.find(
      (item) => item.criterionId === "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION"
    )?.score,
    5
  );
});

test("social archive eval rejects an inflated CallNYC Council count", () => {
  const original = socialMediaArchiveProduction.inventory.callnycCouncilMemberCount;

  try {
    socialMediaArchiveProduction.inventory.callnycCouncilMemberCount = 8;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    socialMediaArchiveProduction.inventory.callnycCouncilMemberCount = original;
  }
});

test("social archive eval requires the pre-Council Carlina Rivera exclusion", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT"
  );
  assert.ok(claim);
  const original = [...claim.boundaries];

  try {
    claim.boundaries = claim.boundaries.filter((boundary) => !/Carlina Rivera/i.test(boundary));
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    claim.boundaries = original;
  }
});

test("social archive eval rejects a falsely complete NYC Artist Coalition count", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT"
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const original = projection.text;

  try {
    projection.text = projection.text.replace("at least five", "five");
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    projection.text = original;
  }
});

test("social archive eval keeps Jamie's account-establishment memory held", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT"
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const original = { status: projection.status, surfaces: [...projection.surfaces] };

  try {
    projection.status = "active";
    projection.surfaces = ["/work/fair-rent-nyc"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    projection.status = original.status;
    projection.surfaces = original.surfaces;
  }
});

test("social archive eval preserves excluded-handle uncertainty", () => {
  const original = [...socialMediaArchiveProduction.inventory.excludedHandles];

  try {
    socialMediaArchiveProduction.inventory.excludedHandles = ["@sundaydinnernyc"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find(
        (item) => item.criterionId === "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION"
      )?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    socialMediaArchiveProduction.inventory.excludedHandles = original;
  }
});

test("complete maturation pilot meets every floor", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.belowMinimum, []);
  assert.equal(result.accepted, true);
});
