import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { nycacPressReadings } from "../../apps/www/src/data/knowledge-bank/nycac-press-readings.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { projectSocialAccounts, socialEngagementEvents } from "../../apps/www/src/data/knowledge-bank/social-media-production-2026-07.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "../lib/knowledge-evals.mjs";

const suite = loadKnowledgeEvalSuite();
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const callNycPopulationPath = path.join(repoRoot, suite.pilot.callNycFullPopulation.manifestPath);
const wowListPopulationPath = path.join(repoRoot, suite.pilot.wowListFullPopulation.manifestPath);

function loadCallNycPopulation() {
  return JSON.parse(readFileSync(callNycPopulationPath, "utf8"));
}

function loadWowListPopulation() {
  return JSON.parse(readFileSync(wowListPopulationPath, "utf8"));
}

test("knowledge-bank gate invalidates stale holdouts after the eval suite changes", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.holdout.complete, false);
  assert.equal(result.holdout.consecutivePassingRuns, 0);
  assert.deepEqual(result.holdout.judgeIds, []);
});

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

test("second NYCAC source expansion adds ten non-duplicate sources", () => {
  const first = suite.pilot.sourceExpansion;
  const second = suite.pilot.secondSourceExpansion;
  const firstIds = new Set(first.sourceIds);
  const secondIds = new Set(second.sourceIds);
  const normalizedText = (value) => value
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const canonicalKeys = (source) => {
    if (source.kind !== "published-article") return [];
    const value = source.canonicalUrl ?? source.archiveUrl;
    const keys = [];
    if (value) {
      const url = new URL(value);
      const pathParts = url.pathname.split("/").filter(Boolean);
      keys.push(`slug:${pathParts.at(-1)?.toLowerCase()}`);
    }
    if (source.title) keys.push(`title:${normalizedText(source.title)}`);
    if (source.author && source.publishedAt) {
      keys.push(`author-date:${normalizedText(source.author)}:${source.publishedAt}`);
    }
    return keys;
  };
  const existingCanonicalKeys = new Set(
    knowledgeBank.sources
      .filter((source) => !secondIds.has(source.id))
      .flatMap(canonicalKeys)
  );
  const secondCanonicalKeys = second.sourceIds
    .map((id) => knowledgeBank.sources.find((source) => source.id === id))
    .flatMap(canonicalKeys);

  assert.equal(second.sourceIds.length, 10);
  assert.equal(second.intakeIds.length, 10);
  assert.equal(new Set(second.sourceIds).size, 10);
  assert.equal(new Set(secondCanonicalKeys).size, secondCanonicalKeys.length);
  assert.ok(second.sourceIds.every((id) => !firstIds.has(id)));
  assert.ok(secondCanonicalKeys.every((key) => !existingCanonicalKeys.has(key)));
  assert.ok(second.sourceIds.every((id) => knowledgeBank.sources.some((source) => source.id === id)));
  assert.ok(second.intakeIds.every((id) => knowledgeBank.intakeItems.some((intake) => intake.id === id && intake.disposition === "integrated")));
});

test("second NYCAC source expansion rejects an unbounded source", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.secondSourceExpansion.sourceIds[0]
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

test("campaign press archive retains a verified Wayback route for every distinct article", () => {
  const press = suite.pilot.pressArchive;
  const entries = campaignPressInventory.flatMap((campaign) => campaign.entries);
  const sourceIdsWithRoutes = new Set(
    entries
      .filter((entry) => entry.archiveUrl?.includes("web.archive.org/web/"))
      .map((entry) => entry.sourceId)
  );

  assert.equal(sourceIdsWithRoutes.size, press.expectedWaybackRouteCount);
  assert.ok(
    [...new Set(entries.map((entry) => entry.sourceId))].every((sourceId) =>
      sourceIdsWithRoutes.has(sourceId)
    )
  );
  assert.ok(
    [...new Set(entries.map((entry) => entry.sourceId))].every((sourceId) => {
      const source = knowledgeBank.sources.find((item) => item.id === sourceId);
      return source?.archiveUrl?.includes("web.archive.org/web/") &&
        source.preservationStatus !== "live";
    })
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

test("campaign press articles retain one bounded close reading per source", () => {
  const press = suite.pilot.pressArchive;
  const sourceIds = new Set(campaignPressInventory.flatMap((campaign) => campaign.entries.map((entry) => entry.sourceId)));
  const sources = [...sourceIds].map((id) => knowledgeBank.sources.find((source) => source.id === id));
  const claim = knowledgeBank.claims.find((item) => item.id === press.claimId);

  assert.equal(nycacPressReadings.length, press.expectedReadingCount);
  assert.equal(new Set(nycacPressReadings.map((reading) => reading.sourceId)).size, press.expectedUniqueArticleCount);
  assert.ok(nycacPressReadings.every((reading) =>
    /^[a-f0-9]{64}$/.test(reading.contentSha256) &&
    reading.summary.length >= 40 &&
    reading.locator.length >= 20 &&
    reading.supportsGenerally.length &&
    reading.doesNotEstablish.length >= 2
  ));
  assert.ok(sources.every((source) => source?.doesNotEstablish.length));
  assert.ok(claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0));
});

test("campaign press recovery rejects a generic redirect as an article body", () => {
  const reading = nycacPressReadings.find((item) => item.sourceId === suite.pilot.pressArchive.redirectTrapSourceId);
  assert.ok(reading);
  const original = { recoveryMode: reading.recoveryMode, retrievalUrl: reading.retrievalUrl };

  try {
    reading.recoveryMode = "publisher-body";
    reading.retrievalUrl = "https://www.bloomberg.com/citylab";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PRESS-ARCHIVE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    reading.recoveryMode = original.recoveryMode;
    reading.retrievalUrl = original.retrievalUrl;
  }
});

test("campaign press recovery preserves the one partial article boundary", () => {
  const press = suite.pilot.pressArchive;
  const partial = nycacPressReadings.filter((reading) => reading.reviewExtent === "headline-and-deck");

  assert.equal(partial.length, press.expectedPartialReadingCount);
  assert.equal(partial[0]?.sourceId, press.partialSourceId);
  assert.equal(
    nycacPressReadings.filter((reading) => reading.reviewExtent === "recovered-body").length,
    press.expectedRecoveredBodyCount
  );
});

test("campaign press direct attributions are separately inspectable observations", () => {
  const press = suite.pilot.pressArchive;
  const attributionCount = nycacPressReadings.reduce(
    (total, reading) => total + reading.directAttributions.length,
    0
  );
  const attributionObservations = nycacPressArchive.observations.filter((observation) =>
    observation.id.startsWith("OBS-NYCAC-PRESS-ATTRIBUTION-")
  );

  assert.equal(attributionCount, press.expectedDirectAttributionCount);
  assert.equal(attributionObservations.length, press.expectedDirectAttributionCount);
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

test("agency graph distinguishes contribution from institutional enactment", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 5);
});

test("agency graph rejects advocacy rewritten as enactment", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-JAMIE-CABARET-ADVOCACY"
  );
  assert.ok(relation);
  const originalAction = relation.action;

  try {
    relation.action = "enacted";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.action = originalAction;
  }
});

test("MARCH enactment remains assigned to the Council", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-COUNCIL-MARCH-TRANSPARENCY-LAW"
  );
  assert.ok(relation);
  const originalActorIds = relation.actorIds;

  try {
    relation.actorIds = ["ENT-JAMIE-BURKART"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.actorIds = originalActorIds;
  }
});

test("agency graph rejects an attribution with no boundary", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-NYCAC-FOUNDING-MEMBER"
  );
  assert.ok(relation);
  const originalBoundaries = relation.boundaries;

  try {
    relation.boundaries = [];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.boundaries = originalBoundaries;
  }
});

test("agency graph rejects a public but unrelated source", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-JAMIE-CABARET-ADVOCACY"
  );
  assert.ok(relation);
  const originalSourceIds = relation.sourceIds;

  try {
    relation.sourceIds = ["SRC-CALLNYC-GITHUB-REPOSITORY"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.sourceIds = originalSourceIds;
  }
});

test("institutional-capacity analysis preserves public function without inventing private motive", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 5);

  const institutional = suite.pilot.institutionalCapacity;
  const claim = knowledgeBank.claims.find((item) => item.id === institutional.claimId);
  assert.equal(claim?.status, "inference");
  assert.ok(claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0));
  assert.ok(claim?.antiClaims.some((antiClaim) => /private motive/i.test(antiClaim)));
  assert.ok(claim?.antiClaims.some((antiClaim) => /depended|could not act/i.test(antiClaim)));
});

test("institutional-capacity analysis rejects a missing motive boundary", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.institutionalCapacity.claimId
  );
  assert.ok(claim);
  const originalAntiClaims = claim.antiClaims;

  try {
    claim.antiClaims = claim.antiClaims.filter((antiClaim) => !/private motive/i.test(antiClaim));
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.antiClaims = originalAntiClaims;
  }
});

test("institutional-capacity analysis rejects blind-holdout motive, dependence, and enactment overclaims", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.institutionalCapacity.claimId
  );
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-NYCAC-DCLA-INSTITUTIONAL-USE"
  );
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-ESPINAL-CHAIRED-CABARET-REFORM-HEARING"
  );
  assert.ok(claim && observation && relation);
  const originalClaim = claim.internalClaim;
  const originalObservation = observation.text;
  const originalResult = relation.result;
  const blindHoldoutOverclaims = [
    "Finkelpearl needed NYC Artist Coalition to validate CreateNYC.",
    "Espinal wanted NYC Artist Coalition to provide political cover.",
    "The City Council relied entirely on NYC Artist Coalition.",
    "NYC Artist Coalition wrote Local Law 214.",
    "Rafael Espinal passed the Cabaret repeal law.",
    "The coalition was indispensable to the Council.",
    "NYC Artist Coalition enabled the Council to enact the Cabaret repeal.",
    "NYC Artist Coalition was the decisive reason Espinal advanced the reform.",
    "The Council would have been unable to legislate without NYC Artist Coalition.",
    "Espinal privately sought NYC Artist Coalition as validation for his agenda.",
    "The coalition guaranteed passage of the Cabaret repeal.",
    "DCLA owed the success of CreateNYC to NYC Artist Coalition."
  ];

  try {
    for (const overclaim of blindHoldoutOverclaims) {
      claim.internalClaim = overclaim;
      const result = evaluateKnowledgeBank(suite);
      assert.equal(
        result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score,
        1,
        `expected evaluator to reject: ${overclaim}`
      );
      assert.equal(
        result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score,
        1,
        `expected scope evaluator to reject: ${overclaim}`
      );
      assert.equal(result.accepted, false, `expected evaluator to reject: ${overclaim}`);
    }

    claim.internalClaim = originalClaim;
    observation.text = "DCLA could not act without NYC Artist Coalition.";
    let result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);

    observation.text = originalObservation;
    relation.result = "Espinal and NYC Artist Coalition authored and enacted the Cabaret repeal law.";
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.internalClaim = originalClaim;
    observation.text = originalObservation;
    relation.result = originalResult;
  }
});

test("comparative policy alignment requires both sides of the comparison", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-NYCAC-CABARET-POLICY-ALIGNMENT"
  );
  assert.ok(observation);
  const originalComparisonSourceIds = observation.comparisonSourceIds;

  try {
    observation.comparisonSourceIds = [];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    observation.comparisonSourceIds = originalComparisonSourceIds;
  }
});

test("hearing agency separates the individual chair from the Council", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-ESPINAL-CHAIRED-CABARET-REFORM-HEARING"
  );
  assert.ok(relation);
  const originalActorIds = relation.actorIds;

  try {
    relation.actorIds = ["ENT-RAFAEL-ESPINAL", "ENT-NYC-COUNCIL"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.actorIds = originalActorIds;
  }
});

test("hearing agency requires the exact actor, action, event, and credit tuple", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-COUNCIL-CONVENED-CABARET-REFORM-HEARING"
  );
  assert.ok(relation);
  const originalAction = relation.action;
  const originalObjectId = relation.objectId;

  try {
    relation.action = "advocated-for";
    let result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);

    relation.action = originalAction;
    relation.objectId = "ENT-CABARET-LICENSE-REPEAL";
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.action = originalAction;
    relation.objectId = originalObjectId;
  }
});

test("institutional overclaim scan covers every NYCAC-related claim", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-CREATENYC-POLICY-DEVELOPMENT-2017"
  );
  assert.ok(claim);
  const originalClaim = claim.internalClaim;

  const escapedHoldoutOverclaims = [
    "DCLA needed NYC Artist Coalition to validate CreateNYC, and Finkelpearl depended on the coalition.",
    "DCLA regarded NYC Artist Coalition as indispensable to CreateNYC.",
    "Espinal advanced the repeal only because NYC Artist Coalition asked him to.",
    "Finkelpearl's unstated reason for embracing the coalition was to rescue CreateNYC."
  ];

  try {
    for (const overclaim of escapedHoldoutOverclaims) {
      claim.internalClaim = overclaim;
      const result = evaluateKnowledgeBank(suite);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
      assert.equal(result.accepted, false, `expected evaluator to reject: ${overclaim}`);
    }
  } finally {
    claim.internalClaim = originalClaim;
  }
});

test("institutional dependency remains rejected after deliberate approval-hash refresh", () => {
  const institutional = suite.pilot.institutionalCapacity;
  const claim = knowledgeBank.claims.find((item) => item.id === institutional.claimId);
  const inquiry = knowledgeBank.researchInquiries.find((item) => item.id === institutional.inquiryId);
  const observations = institutional.observationIds.map((id) =>
    knowledgeBank.observations.find((item) => item.id === id)
  );
  const relations = institutional.relationIds.map((id) =>
    knowledgeBank.agencyRelations.find((item) => item.id === id)
  );
  assert.ok(claim && inquiry && observations.every(Boolean) && relations.every(Boolean));
  const originalClaim = claim.internalClaim;
  const originalContentHash = institutional.approvedContentSha256;
  const originalRelatedClaimsHash = institutional.approvedRelatedClaimsSha256;
  const relevantProjects = new Set([
    "nyc-artist-coalition",
    "createnyc",
    "cabaret-law",
    "office-of-nightlife",
    "talks-not-raids"
  ]);
  const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
  const refreshApprovalHashes = () => {
    institutional.approvedContentSha256 = hash({
      claim: {
        internalClaim: claim.internalClaim,
        projections: claim.projections.map(({ key, text, status, surfaces }) => ({ key, text, status, surfaces })),
        evidence: claim.evidence.map(({ sourceId, relationship, supports, locator }) => ({ sourceId, relationship, supports, locator }))
      },
      observations: observations.map((observation) => ({
        id: observation.id,
        text: observation.text,
        limitations: observation.limitations
      })),
      relations: relations.map((relation) => ({
        id: relation.id,
        actorIds: relation.actorIds,
        action: relation.action,
        objectId: relation.objectId,
        purpose: relation.purpose,
        result: relation.result,
        creditScope: relation.creditScope,
        sourceIds: relation.sourceIds,
        sourceSupportKeys: relation.sourceSupportKeys,
        boundaries: relation.boundaries
      })),
      inquiry: {
        findings: inquiry.findings,
        limitations: inquiry.limitations,
        publicSummary: inquiry.publicSummary
      }
    });
    institutional.approvedRelatedClaimsSha256 = hash(
      knowledgeBank.claims
        .filter((item) => relevantProjects.has(item.project))
        .map((item) => ({
          id: item.id,
          project: item.project,
          internalClaim: item.internalClaim,
          status: item.status,
          projections: item.projections.map(({ key, text, status, surfaces }) => ({ key, text, status, surfaces })),
          boundaries: item.boundaries,
          antiClaims: item.antiClaims
        }))
    );
  };
  const hashRefreshedOverclaims = [
    "The coalition provided the only validation DCLA could accept, making the agency dependent on NYC Artist Coalition.",
    "Finkelpearl viewed NYC Artist Coalition as vital to the success of CreateNYC.",
    "The Council Cabaret repeal resulted from NYC Artist Coalition advocacy.",
    "The Council enacted the coalition proposal verbatim.",
    "Espinal advanced repeal in response to NYC Artist Coalition testimony.",
    "The coalition furnished the Council rationale for enacting Local Law 214.",
    "Finkelpearl used NYC Artist Coalition to rescue CreateNYC legitimacy.",
    "The Council followed the coalition blueprint in repealing the Cabaret Law.",
    "NYC Artist Coalition testimony moved Espinal to advance repeal."
  ];

  try {
    for (const overclaim of hashRefreshedOverclaims) {
      claim.internalClaim = overclaim;
      refreshApprovalHashes();
      const result = evaluateKnowledgeBank(suite);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
      assert.equal(result.accepted, false, `expected semantic rejection after hash refresh: ${overclaim}`);
    }
  } finally {
    claim.internalClaim = originalClaim;
    institutional.approvedContentSha256 = originalContentHash;
    institutional.approvedRelatedClaimsSha256 = originalRelatedClaimsHash;
  }
});

test("agency graph rejects the holdout's actor, object, and causal-result mutations", () => {
  const mutations = [
    {
      id: "REL-JAMIE-CABARET-ADVOCACY",
      key: "result",
      value: "Jamie advocacy supplied the Council basis for repeal."
    },
    {
      id: "REL-NYCAC-MARCH-TRANSPARENCY-ADVOCACY",
      key: "result",
      value: "The coalition gave the Council its enacted Local Law 220 policy."
    },
    {
      id: "REL-NYCAC-MARCH-TRANSPARENCY-ADVOCACY",
      key: "objectId",
      value: "ENT-CABARET-LICENSE-REPEAL"
    },
    {
      id: "REL-NYCAC-MARCH-TRANSPARENCY-ADVOCACY",
      key: "actorIds",
      value: ["ENT-JAMIE-BURKART"]
    }
  ];

  for (const mutation of mutations) {
    const relation = knowledgeBank.agencyRelations.find((item) => item.id === mutation.id);
    assert.ok(relation);
    const original = relation[mutation.key];
    try {
      relation[mutation.key] = mutation.value;
      const result = evaluateKnowledgeBank(suite);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
      assert.equal(result.accepted, false, `expected rejection for ${mutation.id}.${mutation.key}`);
    } finally {
      relation[mutation.key] = original;
    }
  }
});

test("every agency relation has source-closed support propositions", () => {
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));

  for (const relation of knowledgeBank.agencyRelations) {
    assert.ok(relation.sourceSupportKeys.length, `${relation.id} has no source support keys`);
    assert.ok(
      relation.sourceSupportKeys.every((supportKey) => relation.sourceIds.some(
        (sourceId) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
      )),
      `${relation.id} contains a support proposition its sources do not declare`
    );
    assert.ok(
      relation.sourceIds.every((sourceId) => relation.sourceSupportKeys.some(
        (supportKey) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
      )),
      `${relation.id} contains a source with no declared proposition`
    );
  }
});

test("institutional evidence propositions remain source-closed after approval-hash refresh", () => {
  const institutional = suite.pilot.institutionalCapacity;
  const claim = knowledgeBank.claims.find((item) => item.id === institutional.claimId);
  const inquiry = knowledgeBank.researchInquiries.find((item) => item.id === institutional.inquiryId);
  const evidence = claim?.evidence.find(
    (item) => item.sourceId === "SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19"
  );
  const observations = institutional.observationIds.map((id) =>
    knowledgeBank.observations.find((item) => item.id === id)
  );
  const relations = institutional.relationIds.map((id) =>
    knowledgeBank.agencyRelations.find((item) => item.id === id)
  );
  assert.ok(claim && inquiry && evidence && observations.every(Boolean) && relations.every(Boolean));
  const originalSupports = evidence.supports;
  const originalContentHash = institutional.approvedContentSha256;
  const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

  try {
    evidence.supports = ["Finkelpearl privately sought NYC Artist Coalition to validate CreateNYC"];
    institutional.approvedContentSha256 = hash({
      claim: {
        internalClaim: claim.internalClaim,
        projections: claim.projections.map(({ key, text, status, surfaces }) => ({ key, text, status, surfaces })),
        evidence: claim.evidence.map(({ sourceId, relationship, supports, locator }) => ({ sourceId, relationship, supports, locator }))
      },
      observations: observations.map((observation) => ({ id: observation.id, text: observation.text, limitations: observation.limitations })),
      relations: relations.map((relation) => ({
        id: relation.id,
        actorIds: relation.actorIds,
        action: relation.action,
        objectId: relation.objectId,
        purpose: relation.purpose,
        result: relation.result,
        creditScope: relation.creditScope,
        sourceIds: relation.sourceIds,
        sourceSupportKeys: relation.sourceSupportKeys,
        boundaries: relation.boundaries
      })),
      inquiry: { findings: inquiry.findings, limitations: inquiry.limitations, publicSummary: inquiry.publicSummary }
    });

    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    evidence.supports = originalSupports;
    institutional.approvedContentSha256 = originalContentHash;
  }
});

test("Cabaret hearing correction rejects stale dates and decisive-causation copy on related projections", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-CABARET-SAFETY-ORGANIZING"
  );
  const projection = claim?.projections.find((item) => item.status === "active");
  assert.ok(projection);
  const originalText = projection.text;

  try {
    projection.text = "Jamie testified at the June 19, 2017 Council Cabaret hearing and supplied decisive evidence for repeal.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("institutional role relations require source-declared support", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-ESPINAL-CHAIRED-CABARET-REFORM-HEARING"
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.institutionalCapacity.correctedSourceId
  );
  assert.ok(relation && source);
  const originalSupportKeys = relation.sourceSupportKeys;
  const originalSupportsGenerally = source.supportsGenerally;

  try {
    relation.sourceSupportKeys = [];
    let result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);

    relation.sourceSupportKeys = originalSupportKeys;
    source.supportsGenerally = source.supportsGenerally.filter(
      (support) => support !== "Espinal chaired the September 14 hearing"
    );
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.sourceSupportKeys = originalSupportKeys;
    source.supportsGenerally = originalSupportsGenerally;
  }
});

test("Cabaret hearing date correction is a complete traceability gate", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.institutionalCapacity.correctedSourceId
  );
  const correction = knowledgeBank.corrections.find(
    (item) => item.id === suite.pilot.institutionalCapacity.correctionId
  );
  assert.ok(source && correction);
  const originalDate = source.publishedAt;
  const originalClaimId = correction.claimId;
  const originalReason = correction.reason;
  const originalAffectedSurfaces = correction.affectedSurfaces;

  try {
    source.publishedAt = "2017-06-19";
    let result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);

    source.publishedAt = originalDate;
    correction.claimId = "CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017";
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);

    correction.claimId = originalClaimId;
    correction.reason = "Date changed.";
    correction.affectedSurfaces = ["knowledge-bank"];
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.publishedAt = originalDate;
    correction.claimId = originalClaimId;
    correction.reason = originalReason;
    correction.affectedSurfaces = originalAffectedSurfaces;
  }
});

test("public website authorship is reconciled with repository evidence", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 5);
});

test("public website authorship rejects removal of archival Git support", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION"
  );
  assert.ok(claim);
  const originalEvidence = claim.evidence;

  try {
    claim.evidence = claim.evidence.filter(
      (evidence) => evidence.sourceId !== "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE"
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.evidence = originalEvidence;
  }
});

test("repository authorship cannot become sole policy, copy, data, or design credit", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION"
  );
  assert.ok(claim?.projections.length);
  const projection = claim.projections[0];
  const originalText = projection.text;

  try {
    projection.text = "Jamie solely authored every policy, copy, data, and design decision.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("Talks Not Raids research rejects individual disbanding credit", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-TALKS-NOT-RAIDS-POLICY-ARC"
  );
  assert.ok(claim?.projections.length);
  const projection = claim.projections[0];
  const originalText = projection.text;

  try {
    projection.text = "Jamie disbanded M.A.R.C.H. and replaced it with CURE.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("Talks Not Raids projection keeps the program definition and statutory exceptions", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-TALKS-NOT-RAIDS-POLICY-ARC"
  );
  assert.ok(claim?.projections.length);
  const projection = claim.projections[0];
  const originalText = projection.text;

  try {
    projection.text = "Jamie maintained the site. The Council later required 30 days' notice.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("KC Town Hall retains the complete Board-to-Council appropriation lifecycle", () => {
  const result = evaluateKnowledgeBank(suite);
  for (const criterionId of [
    "KB-EVAL-INTAKE",
    "KB-EVAL-SCOPE",
    "KB-EVAL-MATURATION",
    "KB-EVAL-PROJECTION",
    "KB-EVAL-COVERAGE",
    "KB-EVAL-SAFETY",
    "KB-EVAL-AGENCY"
  ]) {
    assert.equal(result.criteria.find((item) => item.criterionId === criterionId)?.score, 5);
  }
});

test("KC Town Hall appropriation cannot be projected as receipt or expenditure", () => {
  const proof = proofClaims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.proofId
  );
  assert.ok(proof);
  const originalWording = proof.publicWording;

  try {
    proof.publicWording = "KC Town Hall received $490,539 from the City.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    proof.publicWording = originalWording;
  }
});

test("KC Town Hall public projection must retain non-disbursement and withdrawal", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.claimId
  );
  const projection = claim?.projections.find((item) => item.key === "case-study");
  assert.ok(projection);
  const originalText = projection.text;

  try {
    projection.text = "The CCED Board recommended $490,539, and the Council accepted the recommendation and appropriated the amount.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-COVERAGE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("KC Town Hall structured contribution cannot invent municipal causation", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.contributionClaimId
  );
  const projection = claim?.projections.find((item) => item.key === "case-study");
  assert.ok(projection);
  const originalText = projection.text;

  try {
    projection.text = "Jamie secured municipal backing for the project.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("KC Town Hall structured lifecycle cannot turn appropriation into approximate receipt", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.claimId
  );
  const projection = claim?.projections.find((item) => item.key === "case-study");
  assert.ok(projection);
  const originalText = projection.text;

  try {
    projection.text = `${projection.text} KC Town Hall received nearly half a million dollars from the City.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("KC Town Hall verified observation cannot reverse the no-disbursement record", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-KC-TOWN-HALL-NO-DISBURSEMENT-2022"
  );
  assert.ok(observation);
  const originalText = observation.text;

  try {
    observation.text = "Kansas City disbursed the full award to KC Town Hall in 2022.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-MATURATION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    observation.text = originalText;
  }
});

test("KC Town Hall proof wording cannot imply approximate receipt or Jamie's causation", () => {
  const proof = proofClaims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.proofId
  );
  assert.ok(proof);
  const originalWording = proof.publicWording;
  const regressions = [
    "KC Town Hall received roughly half a million dollars in municipal backing.",
    "Jamie's planning unlocked roughly half a million dollars in City support."
  ];

  try {
    for (const regression of regressions) {
      proof.publicWording = `${originalWording} ${regression}`;
      const result = evaluateKnowledgeBank(suite);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1, regression);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1, regression);
      assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1, regression);
      assert.equal(result.accepted, false, regression);
    }
  } finally {
    proof.publicWording = originalWording;
  }
});

test("KC Town Hall source citation cannot recast appropriation as payment", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-KC-TOWN-HALL-ORDINANCE-190642"
  );
  assert.ok(source);
  const originalCitation = source.publicCitation;

  try {
    source.publicCitation = "Council of Kansas City, Missouri, payment of $490,539 to KC Town Hall, September 26, 2019.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.publicCitation = originalCitation;
  }
});

test("KC Town Hall stewardship transition remains a held participant-memory lead", () => {
  const pilot = suite.pilot.kcTownHallCouncilFunding;
  const intake = knowledgeBank.intakeItems.find((item) => item.id === pilot.transitionIntakeId);
  const observation = knowledgeBank.observations.find((item) => item.id === pilot.transitionObservationId);
  const inquiry = knowledgeBank.researchInquiries.find((item) => item.id === pilot.transitionInquiryId);

  assert.equal(intake?.kind, "memory-lead");
  assert.equal(intake?.disposition, "researching");
  assert.deepEqual(intake?.sourceIds, []);
  assert.equal(observation?.kind, "participant-memory");
  assert.equal(observation?.status, "captured");
  assert.deepEqual(observation?.claimIds, []);
  assert.equal(inquiry?.resultStatus, "inconclusive");
  assert.deepEqual(inquiry?.sourceIds, []);
  assert.ok(knowledgeBank.claims.every((claim) =>
    claim.researchInquiryIds.every((inquiryId) => inquiryId !== pilot.transitionInquiryId)
  ));
});

test("KC Town Hall transition memory cannot be promoted without evidence review", () => {
  const pilot = suite.pilot.kcTownHallCouncilFunding;
  const observation = knowledgeBank.observations.find((item) => item.id === pilot.transitionObservationId);
  assert.ok(observation);
  const originalStatus = observation.status;
  const originalClaimIds = observation.claimIds;

  try {
    observation.status = "verified";
    observation.claimIds = [pilot.contributionClaimId];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-MATURATION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    observation.status = originalStatus;
    observation.claimIds = originalClaimIds;
  }
});

test("KC Town Hall case-study projection must retain funding-agreement negotiation status", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.claimId
  );
  const projection = claim?.projections.find((item) => item.key === "case-study");
  assert.ok(projection);
  const originalText = projection.text;

  try {
    projection.text = "After the CCED Board recommended KC Town Hall's proposal, the Council accepted the recommendation and appropriated $490,539 in 2019. City records reported no disbursement in 2022; after the project withdrew, the Council returned the full unused appropriation in 2024.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    projection.text = originalText;
  }
});

test("KC Town Hall claim requires all four official lifecycle sources", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.claimId
  );
  assert.ok(claim);
  const originalEvidence = claim.evidence;

  try {
    claim.evidence = claim.evidence.filter(
      (evidence) => evidence.sourceId !== "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17"
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-MATURATION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-COVERAGE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.evidence = originalEvidence;
  }
});

test("KC Town Hall agency graph preserves Board recommendation and Council appropriation", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-KC-COUNCIL-APPROPRIATED-TOWN-HALL-FUNDS"
  );
  assert.ok(relation);
  const originalActorIds = relation.actorIds;
  const originalAction = relation.action;

  try {
    relation.actorIds = ["ENT-JAMIE-BURKART"];
    let result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);

    relation.actorIds = originalActorIds;
    relation.action = "accepted-recommendation";
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.actorIds = originalActorIds;
    relation.action = originalAction;
  }
});

test("KC Town Hall agency graph keeps Jamie's planning contribution separate from Council action", () => {
  const relation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "REL-JAMIE-COLED-KC-TOWN-HALL-PLANNING"
  );
  assert.ok(relation);
  const originalAction = relation.action;
  const originalClaimIds = relation.claimIds;

  try {
    relation.action = "appropriated";
    relation.claimIds = [suite.pilot.kcTownHallCouncilFunding.claimId];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    relation.action = originalAction;
    relation.claimIds = originalClaimIds;
  }
});

test("KC Town Hall technical-operations wording retains the unused-return boundary", () => {
  const proof = proofClaims.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.proofId
  );
  assert.ok(proof?.shortWording);
  const originalWording = proof.shortWording;

  try {
    proof.shortWording = "Jamie co-led adaptive reuse planning that advanced through Council appropriation.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    proof.shortWording = originalWording;
  }
});

test("KC Town Hall source-backed proof coverage cannot regress to research-needed", () => {
  const target = knowledgeBank.proofCoverageTargets.find(
    (item) => item.proofId === suite.pilot.kcTownHallCouncilFunding.proofId
  );
  assert.ok(target);
  const originalStatus = target.status;

  try {
    target.status = "research-needed";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-COVERAGE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    target.status = originalStatus;
  }
});

test("KC Town Hall page citation retains the later disposition record", () => {
  const page = knowledgeBank.pages.find(
    (item) => item.id === suite.pilot.kcTownHallCouncilFunding.pageId
  );
  assert.ok(page?.occurrences.length);
  const originalSourceIds = page.occurrences[0].sourceIds;

  try {
    page.occurrences[0].sourceIds = page.occurrences[0].sourceIds.filter(
      (sourceId) => sourceId !== "SRC-KC-TOWN-HALL-ORDINANCE-240317"
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-COVERAGE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    page.occurrences[0].sourceIds = originalSourceIds;
  }
});

test("KC Town Hall handwritten MDX cannot assign Jamie municipal causation", () => {
  const mdx = readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
  const result = evaluateKnowledgeBank(suite, {
    kcTownHallMdx: `${mdx}\nJamie secured the Council appropriation for KC Town Hall.\n`
  });

  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score, 1);
  assert.equal(result.accepted, false);
});

test("KC Town Hall handwritten MDX cannot turn appropriation into receipt", () => {
  const mdx = readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
  const result = evaluateKnowledgeBank(suite, {
    kcTownHallMdx: `${mdx}\nKC Town Hall received $490,539 from the City.\n`
  });

  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
  assert.equal(result.accepted, false);
});

test("KC Town Hall handwritten MDX rejects funding-receipt euphemisms", () => {
  const mdx = readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
  const regressions = [
    "KC Town Hall secured $490,539 from the City.",
    "The City granted KC Town Hall $490,539.",
    "Jamie brought in $490,539 from the City.",
    "Jamie's work earned KC Town Hall a $490,539 City award.",
    "The Council funded KC Town Hall with $490,539."
  ];

  for (const regression of regressions) {
    const result = evaluateKnowledgeBank(suite, {
      kcTownHallMdx: `${mdx}\n${regression}\n`
    });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score,
      1,
      regression
    );
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score,
      1,
      regression
    );
    assert.equal(result.accepted, false, regression);
  }
});

test("KC Town Hall MDX approval hash rejects unforeseen causal paraphrases", () => {
  const mdx = readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
  const regressions = [
    "KC Town Hall received nearly half a million dollars from the City.",
    "Jamie secured municipal backing for the project.",
    "Jamie got the City to award the project."
  ];

  for (const regression of regressions) {
    const result = evaluateKnowledgeBank(suite, {
      kcTownHallMdx: `${mdx}\n${regression}\n`
    });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score,
      1,
      regression
    );
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score,
      1,
      regression
    );
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-AGENCY")?.score,
      1,
      regression
    );
    assert.equal(result.accepted, false, regression);
  }
});

test("working-archive production passes every deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);

  assert.equal(result.contentApprovals.archiveProduction.matches, true);
  assert.deepEqual(result.errors, []);
  assert.ok(result.criteria.every((criterion) => criterion.score === 5));
});

test("working-archive private sources cannot acquire public URLs", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.archiveProduction.privateSourceIds[0]
  );
  assert.ok(source);
  const originalCanonicalUrl = source.canonicalUrl;

  try {
    source.canonicalUrl = "https://example.com/private-working-record";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.canonicalUrl = originalCanonicalUrl;
  }
});

test("held working-archive claims cannot silently enter the website", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.archiveProduction.heldClaimIds[0]
  );
  assert.ok(claim?.projections[0]);
  const originalProjection = { ...claim.projections[0], surfaces: [...claim.projections[0].surfaces] };

  try {
    claim.projections[0].status = "active";
    claim.projections[0].surfaces = ["/work"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-RECOMPOSITION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0] = originalProjection;
  }
});

test("NTER CHNG recovers shared authorship and later exhibition inclusion", () => {
  const archive = suite.pilot.archiveProduction;
  const claim = knowledgeBank.claims.find((item) => item.id === archive.nterClaimId);
  const inquiry = knowledgeBank.researchInquiries.find((item) => item.id === archive.nterInquiryId);

  assert.ok(claim);
  assert.equal(inquiry?.resultStatus, "recovered");
  assert.deepEqual(claim.evidence.map((evidence) => evidence.sourceId), archive.nterSourceIds);
  assert.deepEqual(inquiry.sourceIds, archive.nterSourceIds);
  assert.ok(claim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0));
});

test("NTER CHNG shared credit cannot become sole authorship or a Nerman display claim", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.archiveProduction.nterClaimId
  );
  assert.ok(claim?.projections[0]);
  const originalText = claim.projections[0].text;

  try {
    claim.projections[0].text = "Jamie created NTER CHNG and displayed it at the Nerman Museum.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-MATURATION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0].text = originalText;
  }
});

test("a proposal cannot be rewritten as a completed client outcome", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-SOURCE-BACKED-MEMORY-METHOD-2026"
  );
  assert.ok(claim?.projections[0]);
  const originalText = claim.projections[0].text;

  try {
    claim.projections[0].text = "Deployed a production team-memory platform for a client.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-MATURATION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0].text = originalText;
  }
});

test("certificate evidence is content-hash governed", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.archiveProduction.certificateSourceId
  );
  assert.ok(source);
  const originalCitation = source.publicCitation;

  try {
    source.publicCitation = `${source.publicCitation} Certified evaluator.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.contentApprovals.archiveProduction.matches, false);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.publicCitation = originalCitation;
  }
});

test("Shared Drive production passes every deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);

  assert.equal(result.contentApprovals.googleDriveProduction.matches, true);
  assert.deepEqual(result.errors, []);
  assert.ok(result.criteria.every((criterion) => criterion.score === 5));
});

test("protected Shared Drive sources cannot acquire public URLs", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === suite.pilot.googleDriveProduction.workflowSourceIds[0]
  );
  assert.ok(source);
  const originalCanonicalUrl = source.canonicalUrl;

  try {
    source.canonicalUrl = "https://drive.google.com/private-record";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SCOPE")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.canonicalUrl = originalCanonicalUrl;
  }
});

test("Sunday Dinner participant data cannot enter the public-safe record", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-SUNDAY-DINNER-PARTICIPANT-DATA-BOUNDARY"
  );
  assert.ok(observation);
  const originalText = observation.text;

  try {
    observation.text = `${observation.text} Participant email: person@example.com`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    observation.text = originalText;
  }
});

test("Shared Drive visual custody cannot become a public authorship claim", () => {
  const template = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.googleDriveProduction.claimIds[0]
  );
  const mediaSourceId = suite.pilot.googleDriveProduction.heldMediaSourceIds[0];
  assert.ok(template);
  const inventedClaim = {
    ...template,
    id: "CLM-NYCAC-UNSUPPORTED-PHOTOGRAPHER-CREDIT",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie photographed and produced the campaign documentation.",
    projections: [{
      ...template.projections[0],
      text: "Jamie photographed and produced the campaign documentation.",
      surfaces: ["/work/fair-rent-nyc"]
    }],
    evidence: [{
      ...template.evidence[0],
      sourceId: mediaSourceId,
      supports: ["existence of a protected documentation lead"]
    }]
  };

  knowledgeBank.claims.push(inventedClaim);
  try {
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-PROJECTION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    knowledgeBank.claims.pop();
  }
});

test("one residency workflow cannot be promoted into scale or outcome evidence", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-196-RESIDENCY-ONBOARDING-WORKFLOW-2023"
  );
  assert.ok(claim?.projections[0]);
  const originalText = claim.projections[0].text;

  try {
    claim.projections[0].text = "Jamie delivered successful outcomes for 20+ resident artists.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-MATURATION")?.score, 1);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SAFETY")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0].text = originalText;
  }
});

test("complete maturation pilot meets every floor", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.belowMinimum, []);
  assert.equal(result.weightedScore, 5);
  assert.equal(result.accepted, false);
});

test("social archive passes its deterministic account and engagement criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SOCIAL-ARCHIVE")?.score, 5);
  assert.equal(projectSocialAccounts.length, suite.pilot.socialMediaProduction.expectedAccountCount);
  assert.equal(socialEngagementEvents.length, suite.pilot.socialMediaProduction.expectedEngagementEventCount);
});

test("CallNYC Council lower bound deduplicates people across interaction types", () => {
  const actors = new Set(
    socialEngagementEvents
      .filter((event) => event.projectId === "callnyc" && event.servingPublicOfficial)
      .map((event) => event.actor)
  );
  assert.equal(actors.size, suite.pilot.socialMediaProduction.callNycDistinctCouncilMemberLowerBound);
  assert.equal(socialEngagementEvents.filter((event) => event.projectId === "callnyc").length, 25);
});

test("CallNYC full-population production passes its deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score, 5);

  const manifest = loadCallNycPopulation();
  assert.equal(manifest.population.length, 110);
  assert.equal(manifest.population.filter((row) => row.populationDisposition === "recovered").length, 107);
  assert.equal(manifest.population.filter((row) => row.populationDisposition === "not-recovered").length, 3);
});

test("CallNYC full-population eval rejects a dropped population disposition", () => {
  const manifest = loadCallNycPopulation();
  manifest.population.pop();
  const result = evaluateKnowledgeBank(suite, { callNycPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("CallNYC full-population eval preserves not-recovered as a distinct state", () => {
  const manifest = loadCallNycPopulation();
  manifest.population.at(-1).populationDisposition = "recovered";
  const result = evaluateKnowledgeBank(suite, { callNycPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("CallNYC full-population eval rejects a duplicated Council identity", () => {
  const manifest = loadCallNycPopulation();
  manifest.councilMemberReposters[1].name = manifest.councilMemberReposters[0].name;
  manifest.councilMemberReposters[1].handle = manifest.councilMemberReposters[0].handle;
  const result = evaluateKnowledgeBank(suite, { callNycPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("CallNYC full-population eval rejects original-author metrics as project traction", () => {
  const manifest = loadCallNycPopulation();
  manifest.engagementSummary.boundaries = manifest.engagementSummary.boundaries.filter(
    (boundary) => !/external posts.*original authors/i.test(boundary)
  );
  const result = evaluateKnowledgeBank(suite, { callNycPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("CallNYC full-population eval rejects contextual reporting as direct coverage", () => {
  const manifest = loadCallNycPopulation();
  const gizmodo = manifest.sourceReadings.find((item) => item.sourceId === "SRC-CALLNYC-GIZMODO-311-EXTENSION");
  gizmodo.role = "direct-project-coverage";
  const result = evaluateKnowledgeBank(suite, { callNycPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-CALLNYC-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("WOW List full-population production passes its deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score, 5);

  const manifest = loadWowListPopulation();
  assert.equal(manifest.population.length, 38);
  assert.equal(manifest.population.filter((row) => row.populationDisposition === "recovered").length, 38);
  assert.equal(manifest.population.filter((row) => row.populationDisposition === "not-recovered").length, 0);
});

test("WOW List full-population eval rejects a dropped profile object", () => {
  const manifest = loadWowListPopulation();
  manifest.population.pop();
  const result = evaluateKnowledgeBank(suite, { wowListPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("WOW List full-population eval rejects relationship inflation", () => {
  const manifest = loadWowListPopulation();
  manifest.population.find((row) => row.relationship === "project-repost").relationship = "project-post";
  const result = evaluateKnowledgeBank(suite, { wowListPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("WOW List full-population eval rejects original-author metrics as project traction", () => {
  const manifest = loadWowListPopulation();
  manifest.engagementSummary.boundaries = manifest.engagementSummary.boundaries.filter(
    (boundary) => !/external posts reposted by WOW List belong to their original authors/i.test(boundary)
  );
  const result = evaluateKnowledgeBank(suite, { wowListPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("WOW List full-population eval rejects mission context as product-use evidence", () => {
  const manifest = loadWowListPopulation();
  manifest.sourceReadings.find((item) => item.sourceId === "SRC-WOWLIST-GOOD-TIMES-ZINES-2015").role = "independent-product-tutorial";
  const result = evaluateKnowledgeBank(suite, { wowListPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("WOW List full-population eval rejects a duplicated external-adoption identity", () => {
  const manifest = loadWowListPopulation();
  manifest.externalAdoptionEvidence[1].statusId = manifest.externalAdoptionEvidence[0].statusId;
  manifest.externalAdoptionEvidence[1].statusUrl = manifest.externalAdoptionEvidence[0].statusUrl;
  const result = evaluateKnowledgeBank(suite, { wowListPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("WOW List public manifest rejects raw post-body leakage", () => {
  const manifest = loadWowListPopulation();
  manifest.population[0].text = "raw body should not be public";
  const result = evaluateKnowledgeBank(suite, { wowListPopulation: manifest });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-WOWLIST-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("shared-account authorship remains an open inquiry and KC Spaces stays held", () => {
  const inquiry = knowledgeBank.researchInquiries.find((item) => item.id === "INQ-SOCIAL-ACCOUNT-AUTHORSHIP");
  const claim = knowledgeBank.claims.find((item) => item.id === suite.pilot.socialMediaProduction.heldClaimId);
  assert.equal(inquiry?.resultStatus, "inconclusive");
  assert.ok(inquiry?.limitations.some((item) => /post authors/i.test(item)));
  assert.ok(claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0));
});

test("social archive rejects removal of collective-authorship boundaries", () => {
  const claim = knowledgeBank.claims.find((item) => item.id === "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY");
  assert.ok(claim);
  const originalAntiClaims = claim.antiClaims;

  try {
    claim.antiClaims = [];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-SOCIAL-ARCHIVE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.antiClaims = originalAntiClaims;
  }
});
