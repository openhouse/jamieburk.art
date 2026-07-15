import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { callNycCorpusFindings, callNycPopulationAudit, callNycSocialCorpus } from "../../apps/www/src/data/knowledge-bank/callnyc-social-corpus.ts";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { kcTownHallPopulationAudit, kcTownHallSocialCorpus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { nycacPopulationAudit, nycacSocialCorpus } from "../../apps/www/src/data/knowledge-bank/nycac-social-corpus.ts";
import { socialMediaArchiveProduction } from "../../apps/www/src/data/knowledge-bank/social-media-archive-production.ts";
import { urbanhermitCorpusFindings, urbanhermitPopulationAudit, urbanhermitSocialCorpus } from "../../apps/www/src/data/knowledge-bank/urbanhermit-social-corpus.ts";
import { wowlistPopulationAudit, wowlistSocialCorpus } from "../../apps/www/src/data/knowledge-bank/wowlist-social-corpus.ts";
import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "../lib/knowledge-evals.mjs";

const suite = loadKnowledgeEvalSuite();
const callNycLedger = JSON.parse(readFileSync(
  new URL("../../docs/knowledge-bank/data/callnyc-public-post-ledger.json", import.meta.url),
  "utf8"
));
const wowlistLedger = JSON.parse(readFileSync(
  new URL("../../docs/knowledge-bank/data/wowlist-public-post-ledger.json", import.meta.url),
  "utf8"
));
const kcTownHallLedger = JSON.parse(readFileSync(
  new URL("../../docs/knowledge-bank/data/kctownhall-public-post-ledger.json", import.meta.url),
  "utf8"
));
const nycacLedger = JSON.parse(readFileSync(
  new URL("../../docs/knowledge-bank/data/nycartc-public-post-ledger.json", import.meta.url),
  "utf8"
));
const urbanhermitLedger = JSON.parse(readFileSync(
  new URL("../../docs/knowledge-bank/data/urbanhermit-public-post-ledger.json", import.meta.url),
  "utf8"
));

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
  assert.equal(pilot.callnycCouncilPostIds.length, 8);
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
    socialMediaArchiveProduction.inventory.callnycCouncilMemberCount = 9;
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

test("CallNYC full-population ledger dispositions all 110 observed slots", () => {
  const pilot = suite.pilot.callNycFullPopulation;
  const result = evaluateKnowledgeBank(suite);

  assert.equal(callNycLedger.records.length, 107);
  assert.equal(new Set(callNycLedger.records.map((record) => record.statusId)).size, 107);
  assert.equal(new Set(callNycLedger.records.map((record) => record.statusUrl)).size, 107);
  assert.equal(callNycLedger.unresolvedItems.length, 3);
  assert.equal(
    callNycLedger.records.length + callNycLedger.unresolvedItems.length,
    callNycLedger.populationAudit.profileCountObserved
  );
  assert.equal(callNycPopulationAudit.uniqueItemsRecovered, pilot.expectedUniqueItems);
  assert.equal(callNycCorpusFindings.issueRecognitionPosts, pilot.expectedIssueRecognitionPosts);
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score,
    5
  );
});

test("CallNYC visual tokens are not misrepresented as archived media", () => {
  assert.ok(
    callNycLedger.records.every(
      (record) => !("mediaUrls" in record) && !("mediaIndicators" in record)
    )
  );
  assert.ok(
    callNycLedger.records.every(
      (record) =>
        Array.isArray(record.visualTokens) &&
        record.visualTokens.every(
          (token) => typeof token === "string" && token.length > 0
        )
    )
  );
  assert.equal(
    callNycLedger.records.filter((record) => record.visualTokens.length > 0).length,
    87
  );
  assert.equal(
    callNycLedger.records.filter((record) => record.visualTokens.includes("Image")).length,
    82
  );
  assert.equal(
    callNycLedger.records.filter(
      (record) => record.visualTokens.length > 0 && !record.visualTokens.includes("Image")
    ).length,
    5
  );
});

test("CallNYC recognition architecture excludes institutional accounts", () => {
  const handles = callNycCorpusFindings.councilMemberHandlesNamedInRecognitionsList;
  assert.equal(handles.length, 26);
  assert.equal(new Set(handles.map((handle) => handle.toLowerCase())).size, 26);
  assert.ok(!handles.some((handle) => ["@nyccouncil", "@nychousing", "@nycha"].includes(handle.toLowerCase())));

  const original = [...handles];
  try {
    handles.push("@NYCHA");
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    handles.splice(0, handles.length, ...original);
  }
});

test("CallNYC full-population eval rejects an erased unresolved slot", () => {
  const original = callNycPopulationAudit.unresolvedPopulationSlots;

  try {
    callNycPopulationAudit.unresolvedPopulationSlots = 2;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    callNycPopulationAudit.unresolvedPopulationSlots = original;
  }
});

test("CallNYC full-population claim cannot convert outreach into engagement", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE"
  );
  assert.ok(claim);
  const original = [...claim.antiClaims];

  try {
    claim.antiClaims = claim.antiClaims.filter(
      (antiClaim) => !/Twenty-six Council members engaged/i.test(antiClaim)
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    claim.antiClaims = original;
  }
});

test("CallNYC engagement floor includes the authenticated Ydanis quote-post", () => {
  assert.equal(socialMediaArchiveProduction.inventory.callnycCouncilMemberCount, 8);
  assert.ok(
    socialMediaArchiveProduction.inventory.callnycCouncilPostIds.includes(
      "SRC-X-CALLNYC-YDANIS-RODRIGUEZ-2016-05-18"
    )
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-X-CALLNYC-YDANIS-RODRIGUEZ-2016-05-18"
  );
  assert.equal(source?.canonicalUrl, "https://x.com/ydanis/status/733089563334299648");
});

test("CallNYC reserve depth stays off public surfaces", () => {
  const heldIds = suite.pilot.callNycFullPopulation.heldClaimIds;
  const heldClaims = callNycSocialCorpus.claims.filter((claim) => heldIds.includes(claim.id));

  assert.equal(heldClaims.length, heldIds.length);
  assert.ok(
    heldClaims.every((claim) =>
      claim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      )
    )
  );
});

test("WOW List full-population ledger reconciles every surviving profile item", () => {
  assert.equal(wowlistPopulationAudit.profileCountObserved, 38);
  assert.equal(wowlistLedger.records.length, 38);
  assert.equal(new Set(wowlistLedger.records.map((record) => record.statusId)).size, 38);
  assert.equal(wowlistLedger.populationAudit.unresolvedPopulationSlots, 0);
  assert.equal(wowlistLedger.method.freshVerification.repliesOnlyStatusId, "665520472461860864");
});

test("WOW List source-status reactions cannot become project-account traction", () => {
  const reposts = wowlistLedger.records.filter((record) => record.relationship === "repost");
  const authored = wowlistLedger.records.filter((record) => record.relationship !== "repost");

  assert.equal(reposts.length, 16);
  assert.ok(reposts.every((record) => record.metricOwner === "source-status"));
  assert.ok(authored.every((record) => record.metricOwner === "wowlist-status"));
  assert.equal(wowlistLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes, 21);
  assert.equal(wowlistLedger.aggregateFindings.repostSourceVisibleReactionSnapshot.likes, 516);
});

test("WOW List shared-account authorship boundary is a hard gate", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE"
  );
  assert.ok(claim);
  const original = [...claim.antiClaims];

  try {
    claim.antiClaims = claim.antiClaims.filter(
      (antiClaim) => !/personally wrote all six replies/i.test(antiClaim)
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    claim.antiClaims = original;
  }
});

test("WOW List reserve depth stays off public surfaces", () => {
  const heldIds = suite.pilot.wowlistFullPopulation.heldClaimIds;
  const heldClaims = wowlistSocialCorpus.claims.filter((claim) => heldIds.includes(claim.id));

  assert.equal(heldClaims.length, heldIds.length);
  assert.ok(
    heldClaims.every((claim) =>
      claim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      )
    )
  );
});

test("KC Town Hall full-population ledger reconciles every surviving profile item", () => {
  assert.equal(kcTownHallPopulationAudit.profileCountObserved, 183);
  assert.equal(kcTownHallLedger.records.length, 183);
  assert.equal(new Set(kcTownHallLedger.records.map((record) => record.statusId)).size, 183);
  assert.equal(kcTownHallLedger.population.unresolvedProfileCountSlots, 0);
  assert.equal(kcTownHallLedger.population.excludedConversationContextArticles, 5);
  const directCouncilResponses = kcTownHallLedger.records.filter(
    (record) => record.outsideAuthoredInteraction?.targetAccount === "@KCTownHall"
  );
  assert.deepEqual(
    directCouncilResponses.map((record) => record.outsideAuthoredInteraction.interactionType).sort(),
    ["quote-post", "reply"]
  );
  assert.ok(
    directCouncilResponses.every(
      (record) =>
        record.outsideAuthoredInteraction.stakeholderRole === "sitting-kansas-city-council-member" &&
        record.outsideAuthoredInteraction.roleSourceId === "SRC-KCMO-COUNCIL-ROSTER-2018"
    )
  );
});

test("KC Town Hall aggregate findings are recomputed from item-level records", () => {
  const records = kcTownHallLedger.records;
  const authored = records.filter((record) => record.relationship !== "repost");
  const reposts = records.filter((record) => record.relationship === "repost");
  const sumMetrics = (items) => items.reduce(
    (totals, record) => ({
      statuses: totals.statuses + 1,
      statusesWithVisibleReaction: totals.statusesWithVisibleReaction +
        (record.currentVisibleMetrics.replies + record.currentVisibleMetrics.reposts + record.currentVisibleMetrics.likes > 0 ? 1 : 0),
      replies: totals.replies + record.currentVisibleMetrics.replies,
      reposts: totals.reposts + record.currentVisibleMetrics.reposts,
      likes: totals.likes + record.currentVisibleMetrics.likes
    }),
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );

  assert.deepEqual(kcTownHallLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot, sumMetrics(authored));
  assert.deepEqual(kcTownHallLedger.aggregateFindings.repostSourceVisibleReactionSnapshot, sumMetrics(reposts));
  assert.equal(kcTownHallLedger.aggregateFindings.postedLinks.occurrences, records.flatMap((record) => record.postedUrls).length);
  assert.equal(kcTownHallLedger.aggregateFindings.tireWorkflow.classifiedRecords, records.filter((record) => record.primaryTheme === "resident-tire-intake-and-operations").length);
});

test("KC Town Hall full-population eval rejects aggregate-only drift", () => {
  const alteredLedger = structuredClone(kcTownHallLedger);
  alteredLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes += 1;
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: alteredLedger });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("KC Town Hall official-response floor is derived from ledger annotations", () => {
  const alteredLedger = structuredClone(kcTownHallLedger);
  const record = alteredLedger.records.find(
    (item) => item.outsideAuthoredInteraction?.interactionType === "quote-post"
  );
  assert.ok(record);
  delete record.outsideAuthoredInteraction;
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: alteredLedger });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("KC Town Hall source-status reactions cannot become project-account traction", () => {
  const reposts = kcTownHallLedger.records.filter((record) => record.relationship === "repost");
  const authored = kcTownHallLedger.records.filter((record) => record.relationship !== "repost");

  assert.equal(reposts.length, 28);
  assert.ok(reposts.every((record) => record.metricOwner === "source-status-not-kctownhall-repost-action"));
  assert.ok(authored.every((record) => record.metricOwner === "account-authored-status"));
  assert.equal(kcTownHallLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes, 174);
  assert.equal(kcTownHallLedger.aggregateFindings.repostSourceVisibleReactionSnapshot.likes, 1241);
});

test("KC Town Hall shared-account and service-unit boundaries are hard gates", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-SOCIAL-SERVICE-REPORTING"
  );
  assert.ok(claim);
  const original = [...claim.antiClaims];

  try {
    claim.antiClaims = claim.antiClaims.filter(
      (antiClaim) => !/One hundred records equal/i.test(antiClaim)
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    claim.antiClaims = original;
  }
});

test("KC Town Hall official-engagement floor cannot absorb outreach or reposts", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR"
  );
  assert.ok(claim);
  const original = [...claim.antiClaims];

  try {
    claim.antiClaims = claim.antiClaims.filter(
      (antiClaim) => !/Nine Council members engaged/i.test(antiClaim)
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    claim.antiClaims = original;
  }
});

test("KC Town Hall reserve depth stays off public surfaces", () => {
  const heldIds = suite.pilot.kcTownHallFullPopulation.heldClaimIds;
  const heldClaims = kcTownHallSocialCorpus.claims.filter((claim) => heldIds.includes(claim.id));

  assert.equal(heldClaims.length, heldIds.length);
  assert.ok(
    heldClaims.every((claim) =>
      claim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      )
    )
  );
});

test("NYC Artist Coalition population ledger reconciles every displayed profile slot", () => {
  assert.equal(nycacPopulationAudit.profileCountObserved, 5124);
  assert.equal(nycacLedger.records.length, 1026);
  assert.equal(new Set(nycacLedger.records.map((record) => record.statusId)).size, 1026);
  assert.equal(nycacLedger.population.unresolvedProfileCountSlots, 4098);
  assert.equal(
    nycacLedger.population.itemLevelRecordsRecovered + nycacLedger.population.unresolvedProfileCountSlots,
    nycacLedger.population.displayedProfileCount
  );
  assert.match(
    nycacLedger.population.completenessStatement,
    /100 percent population reconciliation, not 100 percent item-level recovery/i
  );
});

test("NYC Artist Coalition aggregate findings are recomputed from item-level records", () => {
  const records = nycacLedger.records;
  const authored = records.filter((record) => record.relationship !== "native-repost-source");
  const repostSources = records.filter((record) => record.relationship === "native-repost-source");
  const links = records.flatMap((record) => record.postedUrls);
  const reactionSnapshot = authored.reduce(
    (totals, record) => ({
      records: totals.records + 1,
      recordsWithVisibleReaction: totals.recordsWithVisibleReaction +
        (record.reactionSnapshot.replies + record.reactionSnapshot.reposts + record.reactionSnapshot.likes > 0 ? 1 : 0),
      replies: totals.replies + record.reactionSnapshot.replies,
      reposts: totals.reposts + record.reactionSnapshot.reposts,
      likes: totals.likes + record.reactionSnapshot.likes
    }),
    { records: 0, recordsWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );

  assert.deepEqual(
    {
      records: nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.records,
      recordsWithVisibleReaction:
        nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.recordsWithVisibleReaction,
      replies: nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.replies,
      reposts: nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.reposts,
      likes: nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes
    },
    reactionSnapshot
  );
  assert.equal(nycacLedger.aggregateFindings.postedLinks.shortUrlOccurrences, links.length);
  assert.equal(
    nycacLedger.aggregateFindings.postedLinks.uniqueShortUrls,
    new Set(links.map((link) => link.shortUrl)).size
  );
  assert.equal(nycacLedger.aggregateFindings.repostNetwork.statuses, repostSources.length);
  assert.equal(
    nycacLedger.aggregateFindings.repostNetwork.directMentionStatuses,
    repostSources.filter((record) => record.directMentionOfAccount).length
  );
});

test("NYC Artist Coalition population eval rejects aggregate-only drift", () => {
  const alteredLedger = structuredClone(nycacLedger);
  alteredLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes += 1;
  const result = evaluateKnowledgeBank(suite, { nycacLedger: alteredLedger });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-POPULATION-DISPOSITION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("NYC Artist Coalition source-status reactions cannot become account traction", () => {
  const repostSources = nycacLedger.records.filter(
    (record) => record.relationship === "native-repost-source"
  );
  const authored = nycacLedger.records.filter(
    (record) => record.relationship !== "native-repost-source"
  );

  assert.equal(repostSources.length, 684);
  assert.ok(
    repostSources.every(
      (record) => record.reactionSnapshot === null && record.metricOwner === "source-status-excluded"
    )
  );
  assert.ok(authored.every((record) => record.metricOwner === "nycartc-status"));
  assert.equal(nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes, 1111);
});

test("NYC Artist Coalition linked articles mature into source-specific observations", () => {
  const articleSources = nycacSocialCorpus.intakeItems[0].sourceIds
    .map((sourceId) => knowledgeBank.sources.find((source) => source.id === sourceId))
    .filter((source) => source?.kind === "published-article");
  const articleObservations = nycacSocialCorpus.observations.filter(
    (observation) => articleSources.some((source) => source.id === observation.sourceId)
  );

  assert.equal(articleSources.length, 10);
  assert.equal(articleObservations.length, 10);
  assert.equal(new Set(articleObservations.map((observation) => observation.sourceId)).size, 10);
  assert.equal(
    knowledgeBank.sources.filter(
      (source) => source.canonicalUrl === "https://thebaffler.com/latest/cut-the-music-pelly"
    ).length,
    1
  );
  assert.ok(
    articleObservations.every(
      (observation) => observation.limitations.length && observation.claimIds.length
    )
  );
});

test("urbanhermit population ledger reconciles every displayed profile slot", () => {
  assert.equal(urbanhermitPopulationAudit.profileCountObserved, 434);
  assert.equal(urbanhermitLedger.records.length, 141);
  assert.equal(new Set(urbanhermitLedger.records.map((record) => record.statusId)).size, 141);
  assert.equal(
    urbanhermitLedger.withheldPopulationDispositions.reduce((sum, item) => sum + item.count, 0),
    284
  );
  assert.equal(urbanhermitLedger.unresolvedItems.length, 9);
  assert.equal(
    urbanhermitLedger.records.length +
      urbanhermitLedger.withheldPopulationDispositions.reduce((sum, item) => sum + item.count, 0) +
      urbanhermitLedger.unresolvedItems.length,
    urbanhermitLedger.populationAudit.profileCountObserved
  );
  assert.equal(
    urbanhermitLedger.records.length +
      urbanhermitLedger.withheldPopulationDispositions.reduce((sum, item) => sum + item.count, 0),
    urbanhermitLedger.populationAudit.profileAndBoundedSearchItemsRecovered
  );
  assert.match(
    urbanhermitLedger.populationAudit.completenessStatement,
    /population reconciliation, not a platform export/i
  );
});

test("urbanhermit context and protected records remain aggregate-only and unlinkable", () => {
  const forbiddenFingerprintFields = [
    "recordKey",
    "contentDigestSha256",
    "normalizedTextCharacterCount",
    "publishedYear"
  ];

  assert.ok(
    urbanhermitLedger.records.every((record) => record.disposition === "public-safe-evidence")
  );
  assert.deepEqual(
    urbanhermitLedger.withheldPopulationDispositions.map(({ disposition, count }) => ({ disposition, count })),
    [
      { disposition: "context-only", count: 271 },
      { disposition: "protected-context", count: 13 }
    ]
  );
  assert.ok(
    urbanhermitLedger.withheldPopulationDispositions.every((item) =>
      Object.keys(item).every((key) => ["disposition", "count", "publicDetail"].includes(key)) &&
        /aggregate count only/i.test(item.publicDetail) &&
        /no public item identifier/i.test(item.publicDetail)
    )
  );
  assert.ok(urbanhermitLedger.records.every((record) => !("text" in record) && !("rawText" in record)));
  assert.ok(
    forbiddenFingerprintFields.every((field) => !JSON.stringify(urbanhermitLedger).includes(`"${field}"`))
  );
  const nonRecordMetadata = structuredClone(urbanhermitLedger);
  nonRecordMetadata.records = [];
  nonRecordMetadata.aggregateFindings.selectedMissionSourceStatusIds = [];
  nonRecordMetadata.linkedSourceEdges = [];
  assert.doesNotMatch(JSON.stringify(nonRecordMetadata), /\b\d{15,}\b/);
  assert.doesNotMatch(JSON.stringify(nonRecordMetadata), /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  assert.equal(Object.hasOwn(urbanhermitLedger.aggregateFindings, "relationshipCounts"), false);
  assert.doesNotMatch(
    JSON.stringify(urbanhermitLedger),
    /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/
  );
});

test("urbanhermit public evidence aggregates are recomputed from item-level records", () => {
  const publicRecords = urbanhermitLedger.records.filter(
    (record) => record.disposition === "public-safe-evidence"
  );
  const authoredRecords = urbanhermitLedger.records.filter(
    (record) => record.relationship !== "native-repost-source-status"
  );
  const sourceRecords = urbanhermitLedger.records.filter(
    (record) => record.relationship === "native-repost-source-status"
  );
  const reactionSnapshot = authoredRecords.reduce(
    (totals, record) => ({
      statuses: totals.statuses + 1,
      statusesWithVisibleReaction: totals.statusesWithVisibleReaction +
        (Object.values(record.currentVisibleMetrics).some((value) => value > 0) ? 1 : 0),
      replies: totals.replies + record.currentVisibleMetrics.replies,
      reposts: totals.reposts + record.currentVisibleMetrics.reposts,
      likes: totals.likes + record.currentVisibleMetrics.likes
    }),
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );

  assert.deepEqual(
    urbanhermitLedger.aggregateFindings.publicSafeAccountAuthoredVisibleReactionSnapshot,
    reactionSnapshot
  );
  assert.equal(
    urbanhermitLedger.aggregateFindings.postedPublicUrlOccurrencesInEvidenceRecords,
    publicRecords.flatMap((record) => record.postedUrls).length
  );
  assert.equal(
    urbanhermitLedger.aggregateFindings.uniquePostedPublicUrlsInEvidenceRecords,
    new Set(publicRecords.flatMap((record) => record.postedUrls)).size
  );
  assert.equal(authoredRecords.length, 81);
  assert.equal(sourceRecords.length, 60);
  assert.equal(
    urbanhermitLedger.aggregateFindings.sourceStatusMetricsExcluded.publicEvidenceSourceStatuses,
    60
  );
  assert.equal(
    Object.hasOwn(
      urbanhermitLedger.aggregateFindings.sourceStatusMetricsExcluded,
      "populationSourceStatuses"
    ),
    false
  );
  assert.ok(
    sourceRecords.every(
      (record) =>
        record.metricOwner === "source-status-excluded" &&
        record.currentVisibleMetrics === null
    )
  );
});

test("urbanhermit mature depth stays held off public surfaces", () => {
  const heldIds = suite.pilot.urbanhermitFullPopulation.heldClaimIds;
  const heldClaims = urbanhermitSocialCorpus.claims.filter((claim) => heldIds.includes(claim.id));

  assert.equal(heldClaims.length, heldIds.length);
  assert.ok(
    heldClaims.every((claim) =>
      claim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      )
    )
  );
});

test("urbanhermit eval rejects unresolved-population drift", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.unresolvedItems.pop();
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("urbanhermit eval rejects an item-level crosswalk on a withheld disposition", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.withheldPopulationDispositions[0].statusUrl =
    "https://x.com/urbanhermit/status/unsafe";
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval rejects a fingerprint on a withheld disposition", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.withheldPopulationDispositions[0].contentDigestSha256 = "a".repeat(64);
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval rejects a withheld fingerprint outside the disposition buckets", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.method.freshVerification.withheldStatusId = "1234567890123456789";
  alteredLedger.method.freshVerification.withheldMetricTuple = [1, 2, 3];
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("urbanhermit eval rejects subtractive relationship disclosure", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.aggregateFindings.relationshipCounts = {
    "account-post": 340,
    "account-reply": 4,
    "native-repost-source-status": 81
  };
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval rejects source-status metrics assigned to Jamie", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  const sourceRecord = alteredLedger.records.find(
    (record) => record.relationship === "native-repost-source-status"
  );
  sourceRecord.currentVisibleMetrics = { replies: 0, reposts: 0, likes: 1 };
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval rejects source-status authorship assigned to Jamie", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  const sourceRecord = alteredLedger.records.find(
    (record) => record.relationship === "native-repost-source-status"
  );
  sourceRecord.authorHandle = "@urbanhermit";
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit handle identities are normalized case-insensitively", () => {
  const handles = new Set(
    urbanhermitLedger.records.flatMap((record) => record.mentionedHandles)
      .map((handle) => handle.toLowerCase())
  );

  assert.equal(handles.size, suite.pilot.urbanhermitFullPopulation.expectedDistinctPublicHandles);
  assert.equal(handles.has("@nycartc"), true);
  assert.equal(handles.has("@rlespinal"), true);
});

test("urbanhermit eval rejects unexpected nested metric metadata", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  const authored = alteredLedger.records.find(
    (record) => record.relationship !== "native-repost-source-status"
  );
  authored.currentVisibleMetrics.withheldMetadata = true;
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval rejects unexpected disposition categories", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.aggregateFindings.dispositionCounts["withheld-account-reply"] = 1;
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval rejects nested personal metadata in allowed arrays", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.method.exclusions.push({
    withheldPerson: { name: "Protected Person", profile: "https://example.com/private-profile" }
  });
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("urbanhermit eval rejects false fresh-verification values", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  Object.assign(alteredLedger.method.freshVerification, {
    profileCountReconfirmed: 0,
    uniqueItemRecords: 0,
    profileTraversalReachedOldestRecoveredStatus: false,
    repliesSurfaceCarrierErrorObserved: false
  });
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("urbanhermit eval rejects identifying detail appended to unresolved reasons", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.unresolvedItems[0].reason +=
    " Protected Person at https://example.com/private-profile";
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("urbanhermit metadata contract rejects equivalent free-text privacy and truth attacks", () => {
  const mutations = [
    (ledger) => ledger.metricBoundary.doesNotEstablish.push(
      "Protected Person at https://example.com/private-profile"
    ),
    (ledger) => { ledger.populationDefinition = "All 434 records were fully recovered."; },
    (ledger) => {
      ledger.populationDefinition += " Protected Person at https://example.com/private-profile";
    }
  ];

  for (const mutate of mutations) {
    const alteredLedger = structuredClone(urbanhermitLedger);
    mutate(alteredLedger);
    const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  }
});

test("urbanhermit complete ledger contract rejects unlisted item drift", () => {
  const mutations = [
    (ledger) => {
      ledger.records[0].contentSummary =
        "Protected Person lives at 123 Main Street; Jamie alone guaranteed every outcome.";
    },
    (ledger) => {
      const record = ledger.records.find(
        (item) => item.relationship === "native-repost-source-status"
      );
      record.authorHandle = "@unrelatedsource";
      record.statusUrl = `https://x.com/unrelatedsource/status/${record.statusId}`;
    },
    (ledger) => {
      const record = ledger.records.find((item) => BigInt(item.statusId) < 100000000000000000n);
      record.publishedAt = "not-a-date";
    },
    (ledger) => {
      const edgeIds = new Set(ledger.linkedSourceEdges.map((edge) => edge.statusId));
      const record = ledger.records.find(
        (item) => item.postedUrls.length === 1 && !edgeIds.has(item.statusId)
      );
      record.postedUrls[0] = "https://t.co/N0VELBYPASS";
    }
  ];

  for (const mutate of mutations) {
    const alteredLedger = structuredClone(urbanhermitLedger);
    mutate(alteredLedger);
    const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  }
});

test("urbanhermit eval rejects an empty selected-source inventory", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.aggregateFindings.selectedMissionSourceStatusIds = [];
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval rejects empty recomputed aggregate maps", () => {
  for (const field of [
    "publicLedgerRelationshipCounts",
    "publicSafeAccountAuthoredVisibleReactionSnapshot"
  ]) {
    const alteredLedger = structuredClone(urbanhermitLedger);
    alteredLedger.aggregateFindings[field] = {};
    const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
  }
});

test("urbanhermit linked-source edges bind short URLs to canonical sources", () => {
  assert.equal(
    urbanhermitLedger.linkedSourceEdges.length,
    suite.pilot.urbanhermitFullPopulation.expectedLinkedSourceEdgeCount
  );
  for (const edge of urbanhermitLedger.linkedSourceEdges) {
    const record = urbanhermitLedger.records.find((item) => item.statusId === edge.statusId);
    assert.ok(record?.postedUrls.includes(edge.shortUrl));
    assert.ok(knowledgeBank.sources.some((source) => source.id === edge.destinationSourceId));
  }
});

test("urbanhermit eval rejects removal of a linked-source edge", () => {
  const alteredLedger = structuredClone(urbanhermitLedger);
  alteredLedger.linkedSourceEdges.pop();
  const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });

  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
    1
  );
});

test("urbanhermit eval binds source-status URL, author, date, and summary", () => {
  const mutations = [
    (record) => { record.authorHandle = "@unrelated-source"; },
    (record) => { record.statusUrl = `https://example.com/status/${record.statusId}`; },
    (record) => { record.publishedAt = "2099-01-01"; },
    (record) => { record.contentSummary = "This proves Jamie led and caused the outcome."; }
  ];

  for (const mutate of mutations) {
    const alteredLedger = structuredClone(urbanhermitLedger);
    const sourceRecord = alteredLedger.records.find(
      (record) => record.relationship === "native-repost-source-status"
    );
    mutate(sourceRecord);
    const result = evaluateKnowledgeBank(suite, { urbanhermitLedger: alteredLedger });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
  }
});

test("every urbanhermit intake source, including reused sources, has a bounded atomic observation", () => {
  const intake = urbanhermitSocialCorpus.intakeItems[0];
  const observedSourceIds = new Set(
    urbanhermitSocialCorpus.observations.map((observation) => observation.sourceId)
  );

  assert.equal(intake.sourceIds.length, suite.pilot.urbanhermitFullPopulation.expectedLinkedSourceCount);
  assert.ok(intake.sourceIds.every((sourceId) => observedSourceIds.has(sourceId)));
});

test("urbanhermit eval rejects omission of a reused intake source observation", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-URBANHERMIT-GOOD-TIMES-ISSUE-CONTEXT"
  );
  assert.ok(observation);
  const originalSourceId = observation.sourceId;

  try {
    observation.sourceId = "SRC-X-URBANHERMIT-GOOD-TIMES-ZINES-2-2015";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
  } finally {
    observation.sourceId = originalSourceId;
  }
});

test("urbanhermit semantic contracts reject paraphrased overclaims", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-URBANHERMIT-WATER-PRACTICE"
  );
  assert.ok(observation);
  const originalText = observation.text;

  try {
    observation.text = "Jamie definitively delivered the river program and drove its results.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
  } finally {
    observation.text = originalText;
  }
});

test("urbanhermit semantic contracts cover sources, claims, projections, and inquiries", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-OBSERVER-MARKET-HOTEL-2016"
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-CIVIC-CAMPAIGN-CIRCULATION"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-URBANHERMIT-LINKED-SOURCE-MATURATION"
  );
  assert.ok(source && claim && inquiry);

  const mutations = [
    [source, "supportsGenerally", ["Jamie caused the policy outcome."]],
    [claim, "internalClaim", "Jamie single-handedly led every coalition campaign."],
    [claim.projections[0], "text", "Jamie alone transformed New York nightlife policy."],
    [inquiry, "publicSummary", "The corpus proves all of Jamie's professional impact."]
  ];

  for (const [target, field, replacement] of mutations) {
    const original = target[field];
    try {
      target[field] = replacement;
      const result = evaluateKnowledgeBank(suite);
      assert.equal(
        result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
        1
      );
    } finally {
      target[field] = original;
    }
  }
});

test("urbanhermit independent contracts reject dual-sided semantic overclaims", () => {
  const moduleSource = urbanhermitSocialCorpus.sources.find(
    (item) => item.id === "SRC-OBSERVER-MARKET-HOTEL-2016"
  );
  const bankSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-OBSERVER-MARKET-HOTEL-2016"
  );
  const moduleClaim = urbanhermitSocialCorpus.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-CIVIC-CAMPAIGN-CIRCULATION"
  );
  const bankClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-CIVIC-CAMPAIGN-CIRCULATION"
  );
  assert.ok(moduleSource && bankSource && moduleClaim && bankClaim);
  const sourceOriginals = [moduleSource.supportsGenerally, bankSource.supportsGenerally];
  const claimOriginals = [moduleClaim.internalClaim, bankClaim.internalClaim];

  try {
    moduleSource.supportsGenerally = ["Jamie caused the policy outcome."];
    bankSource.supportsGenerally = ["Jamie caused the policy outcome."];
    moduleClaim.internalClaim = "Jamie single-handedly led every coalition campaign.";
    bankClaim.internalClaim = "Jamie single-handedly led every coalition campaign.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    moduleSource.supportsGenerally = sourceOriginals[0];
    bankSource.supportsGenerally = sourceOriginals[1];
    moduleClaim.internalClaim = claimOriginals[0];
    bankClaim.internalClaim = claimOriginals[1];
  }
});

test("urbanhermit semantic digest rejects dual-sided paraphrased observation overclaims", () => {
  const moduleObservation = urbanhermitSocialCorpus.observations.find(
    (item) => item.id === "OBS-URBANHERMIT-WATER-PRACTICE"
  );
  const bankObservation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-URBANHERMIT-WATER-PRACTICE"
  );
  assert.ok(moduleObservation && bankObservation);
  const originals = [moduleObservation.text, bankObservation.text];

  try {
    const overclaim = "Jamie was the decisive leader whose work guaranteed the river project's success.";
    moduleObservation.text = overclaim;
    bankObservation.text = overclaim;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    moduleObservation.text = originals[0];
    bankObservation.text = originals[1];
  }
});

test("urbanhermit complete graph contract rejects provenance and review drift", () => {
  const intake = urbanhermitSocialCorpus.intakeItems[0];
  const source = urbanhermitSocialCorpus.sources.find(
    (item) => item.id === "SRC-OBSERVER-MARKET-HOTEL-2016"
  );
  const observation = urbanhermitSocialCorpus.observations.find(
    (item) => item.id === "OBS-URBANHERMIT-PRACTICE-CONTINUITY"
  );
  const claim = urbanhermitSocialCorpus.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-CIVIC-CAMPAIGN-CIRCULATION"
  );
  const inquiry = urbanhermitSocialCorpus.researchInquiries.find(
    (item) => item.id === "INQ-URBANHERMIT-LINKED-SOURCE-MATURATION"
  );
  assert.ok(intake && source && observation && claim && inquiry);

  const mutations = [
    [source, "accessedAt", "2099-01-01"],
    [observation, "intakeId", knowledgeBank.intakeItems.find((item) => item.id !== intake.id)?.id],
    [claim, "reviewedAt", "2099-01-01"],
    [claim, "reviewedBy", ["Unreviewed Placeholder"]],
    [inquiry, "runAt", "2099-01-01"],
    [intake, "reason", "Protected Person lives at 123 Main Street; Jamie alone caused every outcome."]
  ];

  for (const [target, field, replacement] of mutations) {
    const original = target[field];
    try {
      target[field] = replacement;
      const result = evaluateKnowledgeBank(suite);
      assert.equal(
        result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
        1
      );
      assert.equal(result.accepted, false);
    } finally {
      target[field] = original;
    }
  }
});

test("urbanhermit complete graph contract rejects citation-requirement drift", () => {
  const moduleClaim = urbanhermitSocialCorpus.claims[0];
  const bankClaim = knowledgeBank.claims.find((item) => item.id === moduleClaim.id);
  assert.ok(bankClaim);
  const moduleProjection = moduleClaim.projections[0];
  const bankProjection = bankClaim.projections[0];
  const originals = [moduleProjection.citationRequired, bankProjection.citationRequired];

  try {
    moduleProjection.citationRequired = !moduleProjection.citationRequired;
    bankProjection.citationRequired = !bankProjection.citationRequired;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
    assert.equal(result.accepted, false);
  } finally {
    moduleProjection.citationRequired = originals[0];
    bankProjection.citationRequired = originals[1];
  }
});

test("urbanhermit public-surface contract rejects summary, inventory, and documentation drift", () => {
  const personalInventory = socialMediaArchiveProduction.inventory.personalAccounts.find(
    (item) => item.handle === "@urbanhermit"
  );
  assert.ok(personalInventory);

  for (const target of [urbanhermitPopulationAudit, urbanhermitCorpusFindings, personalInventory]) {
    for (const key of Object.keys(target)) {
      const original = target[key];
      try {
        target[key] = typeof original === "number" ? original + 1 : `${original} changed`;
        const result = evaluateKnowledgeBank(suite);
        assert.equal(
          result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
          1,
          `expected ${key} drift to fail`
        );
        assert.equal(result.accepted, false);
      } finally {
        target[key] = original;
      }
    }
  }

  const documentationFixtures = [
    [
      "urbanhermitDocumentation",
      "../../docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus.md"
    ],
    ["urbanhermitSourcesDocumentation", "../../docs/knowledge-bank/sources.md"],
    ["urbanhermitKnowledgeBankDocumentation", "../../docs/knowledge-bank/README.md"],
    [
      "urbanhermitSocialArchiveDocumentation",
      "../../docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md"
    ]
  ];

  for (const [fixture, relativePath] of documentationFixtures) {
    const documentation = readFileSync(new URL(relativePath, import.meta.url), "utf8");
    const result = evaluateKnowledgeBank(suite, {
      [fixture]: `${documentation}\nAll 434 records were fully recovered.`
    });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1,
      `expected ${relativePath} drift to fail`
    );
    assert.equal(result.accepted, false);
  }
});

test("urbanhermit cross-ledger contract rejects attribution and summary drift", () => {
  const cases = [
    {
      fixture: "wowlistLedger",
      ledger: wowlistLedger,
      mutate(altered) {
        const record = altered.records.find((item) => item.authorHandle?.toLowerCase() === "@urbanhermit");
        record.contentSummary = "Jamie alone authored WOW List and caused every public outcome.";
      }
    },
    {
      fixture: "wowlistLedger",
      ledger: wowlistLedger,
      mutate(altered) {
        altered.populationAudit.repostSourceHandles = altered.populationAudit.repostSourceHandles
          .filter((handle) => handle.toLowerCase() !== "@urbanhermit");
      }
    },
    {
      fixture: "kcTownHallLedger",
      ledger: kcTownHallLedger,
      mutate(altered) {
        const record = altered.records.find((item) =>
          item.publicMentions?.some((handle) => handle.toLowerCase() === "@urbanhermit")
        );
        record.publicSummary = "Jamie alone delivered the resident service outcome.";
      }
    },
    {
      fixture: "nycacLedger",
      ledger: nycacLedger,
      mutate(altered) {
        const record = altered.records.find((item) =>
          item.publicMentions?.some((handle) => handle.toLowerCase() === "@urbanhermit")
        );
        record.publicSummary = "Jamie alone led the coalition and caused the policy outcome.";
      }
    }
  ];

  for (const { fixture, ledger, mutate } of cases) {
    const altered = structuredClone(ledger);
    mutate(altered);
    const result = evaluateKnowledgeBank(suite, { [fixture]: altered });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1,
      `expected ${fixture} cross-ledger drift to fail`
    );
    assert.equal(result.accepted, false);
  }
});

test("urbanhermit personal and individual posts are not institutional metadata", () => {
  const personal = urbanhermitSocialCorpus.sources.find(
    (source) => source.id === "SRC-X-URBANHERMIT-RIVER-OFFICE-HOURS-2009"
  );
  const individual = urbanhermitSocialCorpus.sources.find(
    (source) => source.id === "SRC-X-LETSGLITCHIT-JAMIE-CONNECTIONS-2023"
  );

  assert.equal(personal?.kind, "public-social-post");
  assert.equal(individual?.kind, "public-social-post");
});

test("urbanhermit native repost boundary preserves source authorship", () => {
  const claim = urbanhermitSocialCorpus.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-CIVIC-CAMPAIGN-CIRCULATION"
  );

  assert.ok(claim?.boundaries.some((boundary) =>
    /underlying authorship, claims, metrics, and any described participation remain with the source account/i.test(boundary)
  ));
});

test("urbanhermit eval rejects a semantically overbroad observation", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-URBANHERMIT-WATER-PRACTICE"
  );
  assert.ok(observation);
  const originalText = observation.text;

  try {
    observation.text = "This source proves attendance, sole authorship, and impact.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-ATOMICITY")?.score,
      1
    );
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score,
      1
    );
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
  } finally {
    observation.text = originalText;
  }
});

test("urbanhermit eval rejects accidental public projection", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === urbanhermitSocialCorpus.claims[0].id
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const originalStatus = projection.status;
  const originalSurfaces = projection.surfaces;

  try {
    projection.status = "active";
    projection.surfaces = ["/about"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERMIT-FULL-POPULATION")?.score,
      1
    );
  } finally {
    projection.status = originalStatus;
    projection.surfaces = originalSurfaces;
  }
});

test("NYC Artist Coalition direct mentions cannot support the Council-member claim", () => {
  const observation = nycacSocialCorpus.observations.find(
    (item) => item.id === "OBS-NYCAC-DIRECT-MENTION-FLOOR"
  );

  assert.deepEqual(observation?.claimIds, ["CLM-NYCAC-SOCIAL-EDITORIAL-NETWORK"]);
  assert.ok(!observation?.claimIds.includes("CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT"));
});

test("NYC Artist Coalition reserve depth stays off public surfaces", () => {
  const heldIds = suite.pilot.nycacPopulationDisposition.heldClaimIds;
  const heldClaims = nycacSocialCorpus.claims.filter((claim) => heldIds.includes(claim.id));

  assert.equal(heldClaims.length, heldIds.length);
  assert.ok(
    heldClaims.every((claim) =>
      claim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      )
    )
  );
});

test("complete maturation pilot meets every floor", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.belowMinimum, []);
  assert.equal(result.accepted, true);
});
