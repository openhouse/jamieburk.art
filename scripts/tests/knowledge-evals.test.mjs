import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { callNycCorpusFindings, callNycPopulationAudit, callNycSocialCorpus } from "../../apps/www/src/data/knowledge-bank/callnyc-social-corpus.ts";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { kcTownHallPopulationAudit, kcTownHallSocialCorpus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { nycacFacebookEventFindings, nycacFacebookEventPopulationAudit, nycacFacebookEvents } from "../../apps/www/src/data/knowledge-bank/nycac-facebook-events.ts";
import { nterChngArchive } from "../../apps/www/src/data/knowledge-bank/nterchng-archive.ts";
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
const nycacFacebookEventLedger = JSON.parse(readFileSync(
  new URL("../../docs/knowledge-bank/data/nycartc-public-facebook-event-ledger.json", import.meta.url),
  "utf8"
));
const nycacFacebookEventLinkLedger = JSON.parse(readFileSync(
  new URL("../../docs/knowledge-bank/data/nycartc-public-facebook-event-link-ledger.json", import.meta.url),
  "utf8"
));
const nycacFacebookEventDocumentation = readFileSync(
  new URL("../../docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-event-population.md", import.meta.url),
  "utf8"
);
const nycacFacebookEventReport = readFileSync(
  new URL("../../docs/knowledge-bank/projects/nycartc-facebook-events-2026-07-14.md", import.meta.url),
  "utf8"
);
const fairRentMdx = readFileSync(
  new URL("../../apps/www/src/content/work/fair-rent-nyc.mdx", import.meta.url),
  "utf8"
);
const publicRegistryText = readFileSync(
  new URL("../../apps/www/src/data/knowledge-bank/public-registry.json", import.meta.url),
  "utf8"
);

const knowledgeCriterionScore = (result) =>
  result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score;

function evaluateEventLedgerWithReboundDigest(altered) {
  const alteredSuite = structuredClone(suite);
  alteredSuite.pilot.nycacFacebookEvents.expectedEventLedgerDigestSha256 = createHash("sha256")
    .update(JSON.stringify(altered))
    .digest("hex");
  return evaluateKnowledgeBank(alteredSuite, { nycacFacebookEventLedger: altered });
}

function evaluateLinkLedgerWithReboundDigest(altered) {
  const alteredSuite = structuredClone(suite);
  alteredSuite.pilot.nycacFacebookEvents.expectedLinkLedgerDigestSha256 = createHash("sha256")
    .update(JSON.stringify(altered))
    .digest("hex");
  return evaluateKnowledgeBank(alteredSuite, { nycacFacebookEventLinkLedger: altered });
}

test("knowledge-bank pilot retains every supplied intake item", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-INTAKE")?.score, 5);
});

test("mature but unselected claims remain held off public surfaces", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 5);
});

test("NTER CHNG archive production is integrated, bounded, and held for future composition", () => {
  assert.deepEqual(
    {
      intakeItems: nterChngArchive.intakeItems.length,
      observations: nterChngArchive.observations.length,
      sources: nterChngArchive.sources.length,
      claims: nterChngArchive.claims.length,
      researchInquiries: nterChngArchive.researchInquiries.length
    },
    { intakeItems: 2, observations: 9, sources: 7, claims: 3, researchInquiries: 1 }
  );

  assert.ok(
    nterChngArchive.intakeItems.every((item) =>
      knowledgeBank.intakeItems.some(
        (bankItem) => bankItem.id === item.id && bankItem.disposition === "integrated"
      )
    )
  );
  assert.ok(
    nterChngArchive.sources.every(
      (source) =>
        source.doesNotEstablish.length > 0 &&
        knowledgeBank.sources.some((bankSource) => bankSource.id === source.id)
    )
  );
  assert.ok(
    nterChngArchive.claims.every(
      (claim) =>
        claim.boundaries.length > 0 &&
        claim.antiClaims.length > 0 &&
        claim.projections.every(
          (projection) => projection.status === "hold" && projection.surfaces.length === 0
        ) &&
        knowledgeBank.claims.some((bankClaim) => bankClaim.id === claim.id)
    )
  );
});

test("NTER CHNG evidence keeps exhibition inclusion distinct from wider context", () => {
  const artistPage = nterChngArchive.sources.find(
    (source) => source.id === "SRC-ANH-KC-NTERCHNG-ARTIST-PAGE-2011-05-18"
  );
  const nermanContext = nterChngArchive.sources.find(
    (source) => source.id === "SRC-ANH-NERMAN-2011-04-30"
  );
  const inclusionClaim = nterChngArchive.claims.find(
    (claim) => claim.id === "CLM-NTERCHNG-AMERICA-NOW-HERE-INCLUSION"
  );
  const inquiry = nterChngArchive.researchInquiries[0];

  assert.ok(artistPage?.supportsGenerally.includes("NTER CHNG as their collaborative work"));
  assert.ok(artistPage?.publicNote?.includes("phone numbers"));
  assert.ok(nermanContext?.doesNotEstablish.includes("NTER CHNG's inclusion"));
  assert.ok(inclusionClaim?.antiClaims.includes("NTER CHNG was displayed at the Nerman Museum"));
  assert.ok(inclusionClaim?.evidence.some(
    (evidence) =>
      evidence.sourceId === artistPage?.id && evidence.relationship === "direct-support"
  ));
  assert.ok(inquiry.limitations.some((limitation) => limitation.includes("phone numbers")));
  assert.ok(inquiry.findings.some((finding) => finding.includes("press release was not recovered")));
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

test("NYC Artist Coalition Facebook event population meets the complete criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    5
  );
  assert.equal(nycacFacebookEventPopulationAudit.controlSlots, 34);
  assert.equal(nycacFacebookEventPopulationAudit.recoveredRecords, 33);
  assert.equal(nycacFacebookEventPopulationAudit.unresolvedSlots, 1);
  assert.equal(nycacFacebookEventFindings.currentReplayFullBodies, 22);
  assert.equal(nycacFacebookEventFindings.currentReplayHeaderOnlyBodies, 11);
});

test("NYC Artist Coalition event eval rejects erasing the unresolved slot", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.records.pop();
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects invented unresolved metadata", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.records.at(-1).title = "Inferred missing event";
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects response-as-attendance wording", () => {
  const result = evaluateKnowledgeBank(suite, {
    nycacFacebookEventDocumentation:
      `${nycacFacebookEventDocumentation}\n\nThe response totals equal attendance at these events.`
  });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects RSVP-as-turnout paraphrases", () => {
  const result = evaluateKnowledgeBank(suite, {
    nycacFacebookEventDocumentation:
      `${nycacFacebookEventDocumentation}\n\nFacebook RSVPs were the turnout.`
  });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects semantic attendance bypasses", () => {
  for (const sentence of [
    "Facebook RSVPs demonstrate turnout.",
    "Facebook responses are not unique reach, but Facebook RSVPs were the turnout.",
    "The Facebook response total was attendance.",
    "Attendance matched Facebook response totals.",
    "Although Facebook responses are not unique reach, Facebook RSVPs were the turnout.",
    "Treat Facebook responses as attendance.",
    "Facebook RSVPs verify turnout.",
    "Facebook responses are not estimates and Facebook RSVPs were the turnout.",
    "Facebook RSVPs were the headcount.",
    "Facebook responses tracked how many people showed up.",
    "Treat Facebook responses as the crowd size.",
    "Facebook response totals measure in-person presence.",
    "Facebook RSVPs prove audience size.",
    "Facebook responses did not merely suggest attendance but verified it.",
    "Facebook responses aren't just platform signals - they prove turnout.",
    "No one doubts Facebook responses prove turnout.",
    "Facebook responses cannot be distinguished from attendance.",
    "Facebook responses did not fail to represent attendance.",
    "Facebook responses are not estimates and therefore represent attendance.",
    "Facebook response totals were recorded. They establish the turnout.",
    "The audience size was exactly the Facebook reply figure.",
    "It is false that Facebook RSVPs do not represent attendance.",
    "Attendance was the thing those Facebook numbers measured.",
    "Use the number responding on Facebook as the count of people present in the room.",
    "Facebook responses validate physical presence.",
    "People who clicked Going on Facebook were the people who showed up.",
    "The Going tally on Facebook was the headcount.",
    "Facebook event confirmations measured audience size.",
    "Facebook RSVPs were recorded. This establishes turnout.",
    "The claim that Facebook RSVPs do not represent attendance is false.",
    "The Interested tally on Facebook represented attendance.",
    "Facebook's Going count was the crowd size.",
    "Facebook response totals were recorded. Those verify physical presence.",
    "Facebook's Interested metric established turnout.",
    "The response figures measured the audience size.",
    "Facebook response totals prove that 400 people attended.",
    "Facebook RSVPs counted the attendees.",
    "It is not false that Facebook responses do not establish attendance.",
    "The claim that Facebook RSVPs cannot establish turnout is unsupported.",
    "The audience consisted of the people responding on Facebook.",
    "Facebook responses supplied the number of unique individuals reached.",
    "Facebook RSVPs establish footfall at coalition events.",
    "Facebook response totals supplied the number who came through the door.",
    "The Facebook Going figure was our total reach.",
    "Facebook replies served as the on-site gate count.",
    "Facebook confirmations show how many visitors arrived.",
    "Facebook's response figures became our room-fill number: 1,700 bodies under one roof.",
    "The Facebook tally gives the number of seats occupied at the venue.",
    "Nobody can say the Facebook count failed to capture how many New Yorkers crossed the threshold.",
    "Facebook responses were a community mandate for the repeal.",
    "The response totals quantify how far the campaign traveled through the city.",
    "Facebook RSVPs translated one-for-one into people in the hall.",
    "It would be wrong to say the Facebook figures did not reveal a packed house.",
    "Facebook logged 1.7K responses. The same number filled the room.",
    "Facebook logged 1.7K responses. That became 1.7K people in seats.",
    "The Facebook response count delivered the repeal.",
    "The Going total on Facebook amounted to a vote of confidence from the community.",
    "Facebook responses measured the size of the constituency the campaign reached.",
    "Facebook responses documented a 1,700-strong room.",
    "It is not true that Facebook responses failed to mirror the bodies in the room.",
    "A packed hall was inferred from the Facebook totals.",
    "“Facebook responses are a community mandate,” the caption declared.",
    "Facebook showed 1.7K responses, a census of the coalition’s supporters.",
    "The platform’s event reply indicator furnished the number who entered the building.",
    "The Facebook event card recorded 400 clicks; each click stands for a distinct participant.",
    "Facebook displayed the response figure. This was retained for context. The value was the on-site population.",
    "The blue-button total doubled as the door sheet for the night.",
    "Facebook’s event counter represented the people who backed the campaign.",
    "The event-page acceptances counted everyone who crossed the venue threshold.",
    "The social RSVP roll was our census of the room.",
    "Each Going mark corresponded to one occupied chair.",
    "The platform acknowledgments reveal the number of neighbors physically present.",
    "Digital replies furnished the live-room census."
  ]) {
    const result = evaluateKnowledgeBank(suite, {
      nycacFacebookEventDocumentation: `${nycacFacebookEventDocumentation}\n\n${sentence}`
    });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1,
      sentence
    );
  }
});

test("NYC Artist Coalition event eval accepts direct response boundaries", () => {
  for (const sentence of [
    "Facebook response totals do not establish physical attendance.",
    "Never use Facebook RSVP totals as a headcount.",
    "Facebook RSVPs cannot be used as attendance.",
    "Facebook responses are not a measure of turnout.",
    "Facebook responses are not attendance.",
    "Do not infer turnout from Facebook RSVP figures.",
    "Facebook RSVPs should never be mistaken for attendance.",
    "Facebook RSVP totals provide no evidence of attendance.",
    "Facebook responses cannot establish attendance but remain useful platform signals.",
    "Facebook response totals give no measure of turnout.",
    "Facebook RSVPs do not indicate turnout.",
    "Facebook responses cannot tell us attendance.",
    "Facebook response totals are not evidence of attendance.",
    "Facebook responses and attendance must be kept separate.",
    "Do not conflate Facebook responses with turnout.",
    "Facebook response totals say nothing about attendance.",
    "No valid inference from Facebook responses to attendance is available.",
    "There is no evidence that Facebook responses establish attendance.",
    "Attendance cannot be established from Facebook responses.",
    "Keep Facebook responses separate from attendance.",
    "Attendance cannot be inferred from Facebook RSVPs.",
    "Facebook responses are insufficient evidence of turnout.",
    "Facebook response totals offer no support for any participation claim.",
    "Facebook response totals and independently reported attendance are separate measurements.",
    "Facebook responses may be compared with event-specific attendance only to illustrate their non-equivalence.",
    "Facebook responses and a separately measured door count are independent datasets; neither substitutes for the other.",
    "The venue separately reported 100 attendees; Facebook displayed 1.2K responses. Those sources must be kept distinct.",
    "Independent reporting described about 100 people physically attending, while Facebook showed 1.2K responses.",
    "Facebook showed 1.2K responses, whereas the newspaper separately reported roughly 100 attendees.",
    "The report quotes “Facebook RSVPs equal attendance” only to reject that equation.",
    "The phrase “Facebook totals equal turnout” is prohibited.",
    "Facebook showed 1.2K responses. Separately, an independently preserved venue log records 86 people inside the hall.",
    "Never use an event-card reaction number as a proxy for physical presence.",
    "A separately archived turnstile log establishes attendance; Facebook responses do not establish it.",
    "A fire inspector independently reported 86 occupants. Facebook totals were never used to derive that count."
    ,"An RSVP is an interface state, not a headcount of anyone inside the venue."
  ]) {
    const result = evaluateKnowledgeBank(suite, {
      nycacFacebookEventDocumentation: `${nycacFacebookEventDocumentation}\n\n${sentence}`
    });
    assert.equal(knowledgeCriterionScore(result), 5, sentence);
  }
});

test("NYC Artist Coalition event eval scans the report for attendance conversion", () => {
  const result = evaluateKnowledgeBank(suite, {
    nycacFacebookEventReport:
      `${nycacFacebookEventReport}\n\nFacebook responses equal attendance.`
  });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval scans public page and proof copy for attendance conversion", () => {
  for (const fixture of [
    { fairRentMdx: `${fairRentMdx}\n\nFacebook responses are the attendance.` },
    { nycacProofNarrative: "Facebook response totals represent unique people." }
  ]) {
    const result = evaluateKnowledgeBank(suite, fixture);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1,
      JSON.stringify(fixture)
    );
  }
});

test("NYC Artist Coalition event eval scans canonical source notes and observations", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026"
  );
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-NYCAC-FACEBOOK-RESPONSE-SIGNALS"
  );
  assert.ok(source);
  assert.ok(observation);
  const originalSourceNote = source.publicNote;
  const originalObservationText = observation.text;
  try {
    source.publicNote = `${originalSourceNote} Facebook responses equal attendance.`;
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);

    source.publicNote = `${originalSourceNote} The response figures became our room-fill number.`;
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);

    source.publicNote = originalSourceNote;
    observation.text = `${originalObservationText} Jamie alone delivered the repeal.`;
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);

    observation.text = `${originalObservationText} The event calendar was Jamie's brainchild.`;
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);
  } finally {
    source.publicNote = originalSourceNote;
    observation.text = originalObservationText;
  }
});

test("NYC Artist Coalition event eval scans canonical public fields for people and private locators", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026"
  );
  assert.ok(source);
  const original = {
    publicNote: source.publicNote,
    publicCitation: source.publicCitation,
    canonicalUrl: source.canonicalUrl,
    doesNotEstablish: source.doesNotEstablish
  };
  try {
    for (const publicNote of [
      `${original.publicNote} Guest: Alice Smith.`,
      `${original.publicNote} Working document: https://docs.google.com/document/d/private.`,
      `${original.publicNote} Working room: https://meet.jit.si/private-room.`,
      `${original.publicNote} Attendee Alice Chen was present.`,
      `${original.publicNote} Guest roster includes Alice Chen and Bruno Diaz.`,
      `${original.publicNote} Contact the organizer at alice [at] example [dot] org.`,
      `${original.publicNote} Working room: https://whereby.com/coalition-core.`,
      `${original.publicNote} Private working document: https://notion.so/secret-coalition-space.`,
      `${original.publicNote} Credential for the room: access code 482731.`,
      `${original.publicNote} Protected evidence: https://archive-bucket.s3.amazonaws.com/private.pdf?X-Amz-Signature=abc123.`,
      `${original.publicNote} Door list — Priya Raman.`,
      `${original.publicNote} Organizer mailbox: priya.raman (at) example (dot) org.`,
      `${original.publicNote} Call Priya at 917•555•0199.`,
      `${original.publicNote} Guestbook records Priya Raman and Luis Ortega.`,
      `${original.publicNote} Join with PIN 482731.`,
      `${original.publicNote} Workspace: hxxps://docs[.]google[.]com/document/d/coalition-core.`
    ]) {
      source.publicNote = publicNote;
      assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1, publicNote);
    }

    source.publicNote = original.publicNote;
    source.publicCitation = `${original.publicCitation} Contact alice.private@example.com.`;
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);

    source.publicCitation = original.publicCitation;
    source.canonicalUrl = "https://docs.google.com/document/d/private";
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);

    source.canonicalUrl = original.canonicalUrl;
    source.doesNotEstablish = [
      ...original.doesNotEstablish,
      "Private roster: Alice Smith; https://us02web.zoom.us/w/123456789"
    ];
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);
  } finally {
    source.publicNote = original.publicNote;
    source.publicCitation = original.publicCitation;
    source.canonicalUrl = original.canonicalUrl;
    source.doesNotEstablish = original.doesNotEstablish;
  }
});

test("NYC Artist Coalition event eval keeps held interpretations off public projections", () => {
  for (const sentence of [
    "Jamie interprets the event series as a democracy lab that believes artists and serves as the city's nervous system.",
    "The event series expanded public imagination and caused policy change.",
    "Jamie describes coalition events as an art form.",
    "The participation system was a democratic listening and translation practice."
    ,"Jamie treated the coalition as a civic experimentation workshop."
    ,"The practice functioned as a participatory ear that converted lived experience into government action."
    ,"The system treated artists' testimony as truth."
    ,"The gatherings themselves were creative works."
    ,"Cultural advocates served as the city's sensory network."
    ,"The event sequence broadened what residents thought possible."
    ,"The recurring gatherings delivered city reform."
    ,"The convenings operated as a civic sensorium, carrying artists’ lived knowledge into municipal decisions."
    ,"The event circuit was Jamie’s public artwork, with each gathering composing civic possibility."
    ,"Artists were authoritative witnesses of city life; the series translated their knowledge into government action."
    ,"The recurring sequence acted like a municipal synapse between cultural spaces and City Hall."
    ,"The meetings formed a civic circulatory system for the city."
    ,"The convening network became City Hall’s collective ear."
    ,"Each meeting was a work of socially engaged art."
    ,"Artists’ lived accounts were the final word in municipal decisions."
    ,"The sequence enlarged the horizon of civic possibility."
  ]) {
    const result = evaluateKnowledgeBank(suite, { fairRentMdx: `${fairRentMdx}\n\n${sentence}` });
    assert.equal(knowledgeCriterionScore(result), 1, sentence);
  }
});

test("NYC Artist Coalition event eval rejects a public protected locator", () => {
  const altered = structuredClone(nycacFacebookEventLinkLedger);
  altered.rows.find((row) => row.disposition === "protected").publicUrl =
    "https://docs.google.com/document/d/private-working-document";
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLinkLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects personal metadata fields", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.records[0].guestNames = ["Private Person"];
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects personal metadata inside allowed fields", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.records[0].venueOrMode = "Private attendee Jane Doe";
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects guest identity inside an allowed field", () => {
  for (const label of ["Guest Jane Doe", "Guest: Jane Doe", "Guest – Jane Doe"]) {
    const altered = structuredClone(nycacFacebookEventLedger);
    altered.records[0].venueOrMode = label;
    const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1
    );
  }
});

test("NYC Artist Coalition event eval rejects identities inside link fields", () => {
  for (const label of ["Attendee: Jane Doe", "Attendee #1: Jane Doe"]) {
    const altered = structuredClone(nycacFacebookEventLinkLedger);
    altered.rows[0].host = label;
    const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLinkLedger: altered });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1
    );
  }
});

test("NYC Artist Coalition event eval rejects normalized and unlabeled identities after digest rebound", () => {
  for (const identity of [
    "1) Jane Doe; 2) John Smith",
    "1) Jane Doe, 2) John Smith",
    "1) jane doe; 2) john smith",
    "Gue\u200bst No. 1 - Jose Nunez",
    "Ａttendee #1: Jane Doe",
    "guest: jane doe",
    "ｇｕｅｓｔ： ｊａｎｅ ｄｏｅ",
    "gu\u200best: jane doe",
    "guest jane doe",
    "name: jane doe",
    "GuestJane Doe"
  ]) {
    const altered = structuredClone(nycacFacebookEventLedger);
    altered.records[0].venueOrMode = identity;
    assert.equal(knowledgeCriterionScore(evaluateEventLedgerWithReboundDigest(altered)), 1);
  }

  const alteredLinks = structuredClone(nycacFacebookEventLinkLedger);
  alteredLinks.rows[0].host = "1) Jane Doe; 2) John Smith";
  assert.equal(knowledgeCriterionScore(evaluateLinkLedgerWithReboundDigest(alteredLinks)), 1);
});

test("NYC Artist Coalition event eval scans all ledger strings for identities", () => {
  const eventMutations = [
    (ledger) => { ledger.privacyBoundary = "1) Jane Doe; 2) John Smith"; },
    (ledger) => { ledger.privacyBoundary = "Jane Doe"; },
    (ledger) => { ledger.privacyBoundary = "jane doe"; },
    (ledger) => { ledger.liveReplay.note += " Guest: Jane Doe"; }
  ];
  for (const mutate of eventMutations) {
    const altered = structuredClone(nycacFacebookEventLedger);
    mutate(altered);
    assert.equal(knowledgeCriterionScore(evaluateEventLedgerWithReboundDigest(altered)), 1);
  }

  const alteredLinks = structuredClone(nycacFacebookEventLinkLedger);
  alteredLinks.method += " 1) Jane Doe; 2) John Smith";
  assert.equal(knowledgeCriterionScore(evaluateLinkLedgerWithReboundDigest(alteredLinks)), 1);
});

test("NYC Artist Coalition event eval rejects protected locator smuggling", () => {
  const mutations = [
    (ledger) => {
      ledger.rows.find((row) => row.disposition === "protected").host =
        "docs.google.com/document/d/private-working-document";
    },
    (ledger) => {
      ledger.rows[0].publicUrl = "https://docs.google.com/document/d/private-working-document";
    },
    (ledger) => {
      ledger.rows[0].category = "docs.google.com/document/d/private-working-document";
    },
    (ledger) => {
      ledger.rows[0].publicUrl = "https://drive.google.com/file/d/private-working-file";
    }
  ];
  for (const mutate of mutations) {
    const altered = structuredClone(nycacFacebookEventLinkLedger);
    mutate(altered);
    assert.equal(knowledgeCriterionScore(evaluateLinkLedgerWithReboundDigest(altered)), 1);
  }
});

test("NYC Artist Coalition event eval enforces exact top-level ledger schemas", () => {
  const alteredEvents = structuredClone(nycacFacebookEventLedger);
  alteredEvents.guestNames = ["Jane Doe"];
  assert.equal(knowledgeCriterionScore(evaluateEventLedgerWithReboundDigest(alteredEvents)), 1);

  const alteredLinks = structuredClone(nycacFacebookEventLinkLedger);
  alteredLinks.attendeeNames = ["Jane Doe"];
  assert.equal(knowledgeCriterionScore(evaluateLinkLedgerWithReboundDigest(alteredLinks)), 1);
});

test("NYC Artist Coalition event eval scans every event field for protected locators", () => {
  for (const locator of [
    "https://docs.google.com/document/d/private-working-document",
    "https://docs.google.com:443/document/d/private-working-document",
    "https://drive.google.com:443/file/d/private-working-file",
    "https://zoom.us/j/123456789",
    "https://zoom.us:443/j/123456789",
    "https://meet.google.com/abc-defg-hij",
    "https://meet.google.com:443/abc-defg-hij",
    "https://teams.microsoft.com/meet/123456789?p=private"
  ]) {
    const altered = structuredClone(nycacFacebookEventLedger);
    altered.records[0].venueOrMode = locator;
    assert.equal(knowledgeCriterionScore(evaluateEventLedgerWithReboundDigest(altered)), 1);
  }
});

test("NYC Artist Coalition event eval rejects nested non-scalar ledger values", () => {
  for (const mutate of [
    (ledger) => { ledger.liveReplay.note = { text: ledger.liveReplay.note, attendeeName: "Jane Doe" }; },
    (ledger) => { ledger.privacyBoundary = { text: ledger.privacyBoundary, attendeeName: "Jane Doe" }; }
  ]) {
    const altered = structuredClone(nycacFacebookEventLedger);
    mutate(altered);
    assert.equal(knowledgeCriterionScore(evaluateEventLedgerWithReboundDigest(altered)), 1);
  }

  const alteredLinks = structuredClone(nycacFacebookEventLinkLedger);
  alteredLinks.method = { text: alteredLinks.method, attendeeName: "Jane Doe" };
  assert.equal(knowledgeCriterionScore(evaluateLinkLedgerWithReboundDigest(alteredLinks)), 1);
});

test("NYC Artist Coalition event eval binds reviewed ledgers independently of suite digests", () => {
  const alteredEvents = structuredClone(nycacFacebookEventLedger);
  alteredEvents.liveReplay.note += " Reviewed wording changed.";
  assert.equal(knowledgeCriterionScore(evaluateEventLedgerWithReboundDigest(alteredEvents)), 1);

  const alteredLinks = structuredClone(nycacFacebookEventLinkLedger);
  alteredLinks.interpretationBoundary += " Reviewed wording changed.";
  assert.equal(knowledgeCriterionScore(evaluateLinkLedgerWithReboundDigest(alteredLinks)), 1);
});

test("NYC Artist Coalition event eval binds displayed responses to numeric values", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.records[0].responseDisplay = "999 people responded";
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects duplicate row identities", () => {
  const alteredEvents = structuredClone(nycacFacebookEventLedger);
  alteredEvents.records[1].slotId = alteredEvents.records[0].slotId;
  let result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: alteredEvents });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );

  const alteredLinks = structuredClone(nycacFacebookEventLinkLedger);
  alteredLinks.rows[1].rowId = alteredLinks.rows[0].rowId;
  result = evaluateKnowledgeBank(suite, { nycacFacebookEventLinkLedger: alteredLinks });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval keeps the unresolved slot metadata-free", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.records.at(-1).responseDisplay = "100 people responded";
  altered.records.at(-1).responseValue = 100;
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval keeps the unresolved slot ID nonsemantic", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.records.at(-1).slotId = "unresolved-2019-06-01-town-hall";
  assert.equal(knowledgeCriterionScore(evaluateEventLedgerWithReboundDigest(altered)), 1);
});

test("NYC Artist Coalition event eval recomputes declared event accounting", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.accounting.controlSlots = 999;
  altered.accounting.recoveredRecords = 999;
  altered.accounting.yearCounts["2017"] = 999;
  altered.accounting.responseSignals.displayed = 999;
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval recomputes declared link accounting", () => {
  const altered = structuredClone(nycacFacebookEventLinkLedger);
  altered.accounting.linkOccurrences = 999;
  altered.accounting.normalizedUrlRows = 999;
  altered.accounting.eventsWithOutboundLinks = 999;
  altered.accounting.sourceArticles = 999;
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLinkLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects stale replay accounting", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.liveReplay.currentFullDetailModules = 28;
  altered.liveReplay.currentHeaderOnlyUnavailableModules = 5;
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval binds the exact replay event set", () => {
  const altered = structuredClone(nycacFacebookEventLedger);
  altered.liveReplay.currentHeaderOnlyUnavailableEventIds = Array(11).fill(
    altered.liveReplay.currentHeaderOnlyUnavailableEventIds[0]
  );
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects a missing source boundary", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026"
  );
  assert.ok(source);
  const original = source.doesNotEstablish;
  try {
    source.doesNotEstablish = [];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1
    );
  } finally {
    source.doesNotEstablish = original;
  }
});

test("NYC Artist Coalition event eval rejects sole-credit claim drift", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.nycacFacebookEvents.selectedClaimId
  );
  assert.ok(claim);
  const projection = claim.projections.find((item) => item.status === "active");
  assert.ok(projection);
  const originalProjection = projection.text;
  try {
    projection.text = `${originalProjection} Jamie organized every coalition event.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1
    );
  } finally {
    projection.text = originalProjection;
  }
});

test("NYC Artist Coalition event eval scans the report for sole-credit drift", () => {
  const result = evaluateKnowledgeBank(suite, {
    nycacFacebookEventReport:
      `${nycacFacebookEventReport}\n\nJamie solely produced the entire event series.`
  });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition event eval rejects semantic sole-credit bypasses", () => {
  for (const sentence of [
    "Jamie created every coalition event.",
    "Jamie did not work alone, but Jamie organized every coalition event.",
    "Jamie was the sole producer of every coalition event.",
    "Every coalition event was produced by Jamie.",
    "Although Jamie did not work alone, Jamie organized every coalition event.",
    "Jamie deserves exclusive credit for the entire event series.",
    "Only Jamie produced the event series.",
    "Jamie did not act alone and Jamie organized every coalition event.",
    "Jamie was not merely a contributor but the sole producer.",
    "No one but Jamie produced the event series.",
    "Jamie, and nobody else, produced the event series.",
    "Production of every event belonged to Jamie.",
    "Jamie held full production responsibility for the calendar.",
    "Policy passage was exclusively Jamie's achievement.",
    "The law was caused solely by Jamie.",
    "The law passed only because of Jamie.",
    "Jamie was the sole cause of the policy.",
    "Jamie single-handedly delivered the repeal.",
    "Only Jamie made the law happen.",
    "Jamie helped with the calendar. He alone produced every event.",
    "The coalition calendar was produced exclusively by him. Jamie was one contributor among many.",
    "It is false that Jamie was not the sole producer.",
    "Jamies singular authorship covered the whole calendar.",
    "The law would not have passed without Jamie.",
    "The repeal owed its existence entirely to Jamie.",
    "All event production was his responsibility. Jamie had help on logistics.",
    "Jamie was the one person responsible for producing the series.",
    "He produced the series by himself. The producer was Jamie.",
    "Jamie's work was the event series from start to finish.",
    "The whole repeal was Jamie's accomplishment.",
    "But for Jamie, the law never would have passed.",
    "The statement that Jamie was not the sole producer is false.",
    "The repeal passed. Jamie made it happen alone.",
    "The repeal was due to Jamie and no one else.",
    "The event series was his work alone. The producer was Jamie.",
    "Jamie bore complete responsibility for producing the calendar.",
    "Jamie deserves 100 percent of the credit for the repeal.",
    "Jamie alone secured the law.",
    "The policy exists solely thanks to Jamie.",
    "The events were Jamie's alone.",
    "Jamie independently produced the event calendar.",
    "Jamie owned end-to-end production of the event series.",
    "The repeal succeeded owing entirely to Jamie.",
    "Every event was his handiwork. Jamie later thanked the team."
    ,"The event calendar was Jamie's creation."
    ,"The event calendar was Jamie’s creation."
    ,"All credit for producing the series belongs to its creator. Jamie was that creator."
    ,"Jamie designed the program. The coalition convened. Every event was produced by him."
    ,"The law passed as a direct result of Jamie's work."
    ,"Jamie's organizing delivered the repeal."
    ,"Production ownership belongs to Jamie; collaborators merely executed his plan."
    ,"Jamie's participation system delivered the Cabaret Law repeal."
    ,"The event calendar was Jamie's brainchild."
    ,"Jamie originated the event calendar."
    ,"The calendar bears one maker's imprint: Jamie."
    ,"Ask who made the series possible; the answer is Jamie."
    ,"The coalition merely staged Jamie's event designs."
    ,"Jamie unlocked the Cabaret Law repeal."
    ,"The Office of Nightlife is Jamie's legacy."
    ,"Jamie deserves credit for getting the law over the line."
    ,"The agency came into being through Jamie's work."
    ,"Jamie was the catalyst for the repeal."
    ,"“The event calendar was Jamie's brainchild,” the report concluded."
    ,"It is not false that the event calendar was Jamie's brainchild."
    ,"From invitations through logistics, the calendar had a single hand behind it: Jamie."
    ,"No page in the sequence came from a hand other than Jamie’s."
    ,"Other names appear, but authorship of the series traces back to Jamie."
    ,"Remove Jamie from the story and the repeal disappears with him."
    ,"City Hall’s decision bears Jamie’s fingerprints, not the coalition’s."
    ,"The coalition was the masthead; Jamie supplied the event machine beneath it."
    ,"Jamie was the indispensable architect behind the full calendar."
    ,"Every gathering originated at Jamie’s desk."
    ,"Nothing in the series would exist absent Jamie."
    ,"Jamie was the necessary condition for enactment of the repeal."
    ,"The coalition supplied the name; Jamie supplied everything that made the events real."
  ]) {
    const result = evaluateKnowledgeBank(suite, {
      nycacFacebookEventReport: `${nycacFacebookEventReport}\n\n${sentence}`
    });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1,
      sentence
    );
  }
});

test("NYC Artist Coalition event eval accepts bounded collective credit", () => {
  for (const sentence of [
    "Jamie helped produce the events with collaborators.",
    "Jamie was one of several event producers.",
    "Jamie was not the sole producer of the event series.",
    "Jamie did not solely produce the event series.",
    "No one should claim that Jamie was the sole producer.",
    "Jamie contributed to, but did not exclusively produce, the event series.",
    "Jamie was not exclusively responsible for producing the entire event series.",
    "Jamie never single-handedly caused the law to pass.",
    "The entire event calendar was not produced by Jamie alone.",
    "Jamie wasn't solely responsible for producing the event series.",
    "The law did not pass solely because of Jamie.",
    "Jamie was not alone in producing the event series.",
    "Jamie did not single-handedly deliver the repeal.",
    "The repeal was not solely Jamie's accomplishment.",
    "Jamie co-produced every event with the coalition.",
    "Jamie and collaborators organized all coalition events.",
    "The law's passage cannot be attributed solely to Jamie.",
    "There is no evidence that Jamie alone caused the policy.",
    "Sole credit for the repeal cannot be assigned to Jamie.",
    "Jamie helped organize the entire event calendar with collaborators.",
    "Jamie was one contributor among many to the whole event-production effort.",
    "Policy causality must not be assigned solely to Jamie."
    ,"Jamie was involved in all events, while collaborators produced them."
    ,"Jamie led one workstream while collaborators produced every event."
    ,"Jamie coordinated the calendar; collaborators authored every event description."
    ,"Jamie helped produce the series; partners retained final authorship of each page."
    ,"The coalition made the law possible, and Jamie was one contributor among many."
    ,"Jamie and partners deserve credit for supporting the repeal."
    ,"The phrase “Jamie was the sole producer” appears here only as a claim we reject."
    ,"Jamie’s substantial coordination role sat alongside partners’ authorship and production."
    ,"Jamie and coalition partners shared production; no policy result is assigned to one person."
    ,"This report includes the wording “all pages were Jamie’s” only to reject sole authorship."
    ,"The coalition’s event authorship remained distributed even where Jamie led a workstream."
  ]) {
    const result = evaluateKnowledgeBank(suite, {
      nycacFacebookEventReport: `${nycacFacebookEventReport}\n\n${sentence}`
    });
    assert.equal(knowledgeCriterionScore(result), 5, sentence);
  }
});

test("NYC Artist Coalition event eval enforces event-title referential integrity", () => {
  const altered = structuredClone(nycacFacebookEventLinkLedger);
  altered.rows[0].eventTitles[0] = "A mismatched event title";
  const result = evaluateKnowledgeBank(suite, { nycacFacebookEventLinkLedger: altered });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
    1
  );
});

test("NYC Artist Coalition selected sources match ledger titles and dates", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-FACEBOOK-EVENT-GENERAL-MEETING-2017"
  );
  assert.ok(source);
  const originalTitle = source.title;
  const originalDate = source.publishedAt;

  try {
    source.title = "A mismatched canonical source title";
    let result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1
    );

    source.title = originalTitle;
    source.publishedAt = "2017-02-07";
    result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1
    );
  } finally {
    source.title = originalTitle;
    source.publishedAt = originalDate;
  }
});

test("NYC Artist Coalition event eval keeps unselected claims off public surfaces", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.nycacFacebookEvents.heldClaimIds[0]
  );
  assert.ok(claim);
  const projection = claim.projections[0];
  const originalStatus = projection.status;
  const originalSurfaces = projection.surfaces;
  try {
    projection.status = "active";
    projection.surfaces = ["/work/fair-rent-nyc"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
      1
    );
  } finally {
    projection.status = originalStatus;
    projection.surfaces = originalSurfaces;
  }
});

test("NYC Artist Coalition event eval keeps the democracy-lab interpretation at inference status", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
  );
  assert.ok(claim);
  const originalStatus = claim.status;
  try {
    claim.status = "confirmed-with-boundary";
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);
  } finally {
    claim.status = originalStatus;
  }
});

test("NYC Artist Coalition event eval rejects an extra selected active projection", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.nycacFacebookEvents.selectedClaimId
  );
  assert.ok(claim);
  const originalProjections = claim.projections;
  try {
    claim.projections = [
      ...originalProjections,
      {
        status: "active",
        surface: "case-study",
        surfaces: ["/work/fair-rent-nyc"],
        text: "A second unreviewed projection."
      }
    ];
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);
  } finally {
    claim.projections = originalProjections;
  }
});

test("NYC Artist Coalition event eval binds reviewed evidence confidence and boundaries", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.nycacFacebookEvents.selectedClaimId
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026"
  );
  assert.ok(claim);
  assert.ok(source);
  const privateEvidence = claim.evidence.find(
    (item) => item.sourceId === "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026"
  );
  assert.ok(privateEvidence);

  const originalConfidence = privateEvidence.confidence;
  const originalBoundary = claim.boundaries[2];
  const originalSourceBoundaries = source.doesNotEstablish;
  try {
    privateEvidence.confidence = "high";
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);

    privateEvidence.confidence = originalConfidence;
    claim.boundaries[2] = "Independent reporting establishes Jamie as producer of the complete event population.";
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);

    claim.boundaries[2] = originalBoundary;
    source.doesNotEstablish = [
      ...originalSourceBoundaries,
      "Facebook response displays prove the physical crowd."
    ];
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite)), 1);
  } finally {
    privateEvidence.confidence = originalConfidence;
    claim.boundaries[2] = originalBoundary;
    source.doesNotEstablish = originalSourceBoundaries;
  }
});

test("NYC Artist Coalition event source set preserves public event URLs", () => {
  const sourceIds = suite.pilot.nycacFacebookEvents.eventSourceIds;
  const sources = nycacFacebookEvents.sources.filter((source) => sourceIds.includes(source.id));
  assert.equal(sources.length, sourceIds.length);
  assert.ok(sources.every((source) => source.canonicalUrl?.includes("facebook.com/events/")));
});

test("NYC Artist Coalition event eval binds every reviewed public narrative surface", () => {
  for (const fixture of [
    {
      nycacClaimsDocumentation:
        "Facebook response displays are attendance and Jamie alone produced every event."
    },
    {
      nycacProjectOverview:
        "The platform count is turnout and proves Jamie caused the repeal."
    }
  ]) {
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite, fixture)), 1);
  }
});

test("NYC Artist Coalition event eval accepts explicit boundaries on reviewed documentation", () => {
  for (const fixture of [
    {
      nycacClaimsDocumentation:
        "An RSVP is an interface state, not a headcount of anyone inside the venue."
    },
    {
      nycacProjectOverview:
        "Jamie helped produce the events alongside coalition partners."
    }
  ]) {
    assert.equal(knowledgeCriterionScore(evaluateKnowledgeBank(suite, fixture)), 5);
  }
});

test("NYC Artist Coalition event eval binds the complete generated public registry", () => {
  const mutations = [
    (registry) => {
      registry.claims.find((claim) => claim.id === "CLM-NYCAC-PARTICIPATION-SYSTEM").status = "confirmed";
    },
    (registry) => {
      registry.claims.find((claim) => claim.id === "CLM-NYCAC-PARTICIPATION-SYSTEM")
        .evidence[0].confidence = "moderate";
    },
    (registry) => {
      registry.claims.find((claim) => claim.id === "CLM-NYCAC-PARTICIPATION-SYSTEM")
        .boundaries.push("Private coordinator: priya.raman@example.org");
    },
    (registry) => {
      registry.sources.find((source) => source.id === "SRC-NYCAC-FACEBOOK-EVENT-LEDGER-2026")
        .publicNote += " https://files.example.org/evidence?X-Amz-Signature=secret";
    }
  ];

  for (const mutate of mutations) {
    const registry = JSON.parse(publicRegistryText);
    mutate(registry);
    assert.equal(
      knowledgeCriterionScore(evaluateKnowledgeBank(suite, {
        publicRegistryText: `${JSON.stringify(registry, null, 2)}\n`
      })),
      1
    );
  }
});

test("complete maturation pilot meets every floor", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.belowMinimum, []);
  assert.equal(result.accepted, true);
});
