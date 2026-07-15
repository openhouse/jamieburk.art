import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { kcTownHallFieldPractice } from "../../apps/www/src/data/knowledge-bank/kctownhall-field-practice.ts";
import { kcTownHallSocialCorpus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { nycacPressReadings } from "../../apps/www/src/data/knowledge-bank/nycac-press-readings.ts";
import {
  nycacFacebookEventArticleSourceIds,
  nycacFacebookEventClaimIds,
  nycacFacebookEventKnowledge,
  nycacFacebookEventReviewSummary
} from "../../apps/www/src/data/knowledge-bank/nycac-facebook-events-2026-07.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { projectSocialAccounts, socialEngagementEvents } from "../../apps/www/src/data/knowledge-bank/social-media-production-2026-07.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "../lib/knowledge-evals.mjs";
import { nycacMissionSignalRules } from "../lib/nycac-mission-classifier.mjs";
import { urbanhermitMissionSignalRules } from "../lib/urbanhermit-mission-classifier.mjs";

const suite = loadKnowledgeEvalSuite();
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const callNycPopulationPath = path.join(repoRoot, suite.pilot.callNycFullPopulation.manifestPath);
const wowListPopulationPath = path.join(repoRoot, suite.pilot.wowListFullPopulation.manifestPath);
const nycacPopulationPath = path.join(repoRoot, suite.pilot.nycacRetrievablePopulation.manifestPath);
const urbanhermitPopulationPath = path.join(repoRoot, suite.pilot.urbanhermitFullPopulation.manifestPath);
const kcTownHallLedgerPath = path.join(repoRoot, suite.pilot.kcTownHallFullPopulation.ledgerPath);
const nycacFacebookEventPopulationPath = path.join(
  repoRoot,
  suite.pilot.nycacFacebookEvents.manifestPath
);

function loadCallNycPopulation() {
  return JSON.parse(readFileSync(callNycPopulationPath, "utf8"));
}

function loadWowListPopulation() {
  return JSON.parse(readFileSync(wowListPopulationPath, "utf8"));
}

function loadNycacPopulation() {
  return JSON.parse(readFileSync(nycacPopulationPath, "utf8"));
}

function loadUrbanhermitPopulation() {
  return JSON.parse(readFileSync(urbanhermitPopulationPath, "utf8"));
}

function loadKcTownHallLedger() {
  return JSON.parse(readFileSync(kcTownHallLedgerPath, "utf8"));
}

function loadNycacFacebookEventPopulation() {
  return JSON.parse(readFileSync(nycacFacebookEventPopulationPath, "utf8"));
}

function refreshFieldPracticeApproval(targetSuite) {
  targetSuite.pilot.kcTownHallFieldPractice.approvedContentSha256 = createHash("sha256")
    .update(JSON.stringify({
      intakes: kcTownHallFieldPractice.intakeItems,
      observations: kcTownHallFieldPractice.observations,
      sources: kcTownHallFieldPractice.sources,
      claims: kcTownHallFieldPractice.claims,
      inquiries: kcTownHallFieldPractice.researchInquiries
    }))
    .digest("hex");
}

test("knowledge-bank gate records two fresh NYCAC Facebook event holdout passes", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(result.holdout.complete, true);
  assert.equal(result.holdout.consecutivePassingRuns, 2);
  assert.deepEqual(result.holdout.judgeIds, [
    "nycac-facebook-events-holdout-data-integrity-privacy-2026-07-15-final-a",
    "nycac-facebook-events-holdout-hiring-editor-credit-2026-07-15-final-b"
  ]);
  assert.equal(result.contentApprovals.kcTownHallFieldPractice.matches, true);
  assert.equal(result.contentApprovals.kcTownHallFieldPractice.reviewLocksMatch, true);
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
  assert.equal(result.holdout.complete, true);
  assert.equal(result.accepted, true);
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

test("NYC Artist Coalition retrievable-population production passes its deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score,
    5
  );
  assert.equal(result.contentApprovals.nycacSocialPopulation.reviewLocksMatch, true);
});

test("NYC Artist Coalition eval preserves retrievable-union and profile-counter boundaries", () => {
  const population = loadNycacPopulation();
  population.populationReconciliation.profileCountNotMaterialized = 0;
  population.populationReconciliation.profileCounterCoveragePercent = 100;
  population.populationReconciliation.conclusion = "All 5,124 profile-counted posts were recovered.";
  const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score,
    1
  );
  assert.equal(result.accepted, false);
});

test("NYC Artist Coalition eval rejects a dropped or duplicated source status", () => {
  const dropped = loadNycacPopulation();
  dropped.records.pop();
  let result = evaluateKnowledgeBank(suite, { nycacPopulation: dropped });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);

  const duplicated = loadNycacPopulation();
  duplicated.records[1].url = duplicated.records[0].url;
  result = evaluateKnowledgeBank(suite, { nycacPopulation: duplicated });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
});

test("NYC Artist Coalition row locks reject count-preserving identity mutations", () => {
  const mutations = [
    (population) => {
      const other = population.records.find((record) => record.authorHandle !== population.records[0].authorHandle);
      [population.records[0].authorHandle, other.authorHandle] =
        [other.authorHandle, population.records[0].authorHandle];
    },
    (population) => {
      const other = population.records.find((record) => record.sourcePublishedAt !== population.records[0].sourcePublishedAt);
      [population.records[0].sourcePublishedAt, other.sourcePublishedAt] =
        [other.sourcePublishedAt, population.records[0].sourcePublishedAt];
    },
    (population) => {
      const linked = population.records.filter((record) => record.externalLinks.length > 0);
      [linked[0].externalLinks[0].displayedDestination, linked[1].externalLinks[0].displayedDestination] =
        [linked[1].externalLinks[0].displayedDestination, linked[0].externalLinks[0].displayedDestination];
    },
    (population) => {
      population.records[0].classificationInputDigest = "a".repeat(64);
    }
  ];

  for (const mutate of mutations) {
    const population = loadNycacPopulation();
    mutate(population);
    const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
    assert.equal(result.accepted, false);
  }
});

test("NYC Artist Coalition incoming-ledger locks reject count-preserving mutations", () => {
  const mutations = [
    (population) => {
      const records = population.post2020IncomingMentionInventory.records;
      const other = records.find((record) => record.authorHandle !== records[0].authorHandle);
      [records[0].authorHandle, other.authorHandle] = [other.authorHandle, records[0].authorHandle];
    },
    (population) => {
      const records = population.post2020IncomingMentionInventory.records;
      const other = records.find((record) => record.publishedAt !== records[0].publishedAt);
      [records[0].publishedAt, other.publishedAt] = [other.publishedAt, records[0].publishedAt];
    },
    (population) => {
      const records = population.post2020IncomingMentionInventory.records;
      const direct = records.filter((record) => record.mentionHandles.some((handle) => handle.toLowerCase() === "@nycartc"));
      [direct[0].mentionHandles, direct[1].mentionHandles] = [direct[1].mentionHandles, direct[0].mentionHandles];
    },
    (population) => {
      population.post2020IncomingMentionInventory.records[0].classificationInputDigest = "b".repeat(64);
    }
  ];

  for (const mutate of mutations) {
    const population = loadNycacPopulation();
    mutate(population);
    const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
    assert.equal(result.accepted, false);
  }
});

test("NYC Artist Coalition eval rejects mission-classification drift", () => {
  const population = loadNycacPopulation();
  population.missionSignalClassification.rules[0].pattern = "anything";
  const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
  assert.deepEqual(
    population.missionSignalClassification.rules.map((rule) => rule.signalId),
    nycacMissionSignalRules.map((rule) => rule.id)
  );
});

test("NYC Artist Coalition eval rejects source-network appearance as incoming engagement", () => {
  const population = loadNycacPopulation();
  population.sourceAuthorNetwork.boundary = "Every source account engaged with and endorsed NYC Artist Coalition.";
  const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("NYC Artist Coalition eval rejects direct-mention and conversation-context conflation", () => {
  const population = loadNycacPopulation();
  const contextRecord = population.post2020IncomingMentionInventory.records.find(
    (record) => !record.mentionHandles.some((handle) => handle.toLowerCase() === "@nycartc")
  );
  assert.ok(contextRecord);
  contextRecord.mentionHandles.push("@NYCArtC");
  const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
});

test("NYC Artist Coalition eval rejects visible-interaction inflation", () => {
  const population = loadNycacPopulation();
  const authoredRecord = population.records.find((record) => record.recordType === "original");
  assert.ok(authoredRecord);
  authoredRecord.visibleEngagement.likes += 1;
  const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
});

test("NYC Artist Coalition eval rejects source-post dates as coalition activity dates", () => {
  const population = loadNycacPopulation();
  population.populationReconciliation.dateBoundary = "Native repost timestamps are @NYCArtC activity dates.";
  const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("NYC Artist Coalition public manifest rejects raw post-body leakage", () => {
  const population = loadNycacPopulation();
  population.records[0].text = "Synthetic raw post body that must never enter the public fixture.";
  const result = evaluateKnowledgeBank(suite, { nycacPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("NYC Artist Coalition selected projection rejects individual shared-account authorship", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.nycacRetrievablePopulation.activeClaimId
  );
  assert.ok(claim?.projections[0]);
  const original = claim.projections[0].text;

  try {
    claim.projections[0].text = `${original} Jamie established and ran the @NYCArtC coalition account.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0].text = original;
  }
});

test("NYC Artist Coalition selected projection rejects source-network engagement inflation", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.nycacRetrievablePopulation.activeClaimId
  );
  assert.ok(claim?.projections[0]);
  const original = claim.projections[0].text;

  try {
    claim.projections[0].text = `${original} 2,438 source accounts engaged with and endorsed the coalition.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0].text = original;
  }
});

test("NYC Artist Coalition selected projection rejects interaction units as people", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === suite.pilot.nycacRetrievablePopulation.activeClaimId
  );
  assert.ok(claim?.projections[0]);
  const original = claim.projections[0].text;

  try {
    claim.projections[0].text = `${original} 4,306 people engaged with the coalition.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0].text = original;
  }
});

test("Urbanhermit full-population production passes its deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.equal(
    result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score,
    5
  );
  assert.equal(result.contentApprovals.urbanhermitSocialPopulation.reviewLocksMatch, true);
});

test("Urbanhermit eval preserves the live-profile versus owner-archive boundary", () => {
  const population = loadUrbanhermitPopulation();
  population.populationReconciliation.profileReportedPostCount = 433;
  population.populationReconciliation.boundary = "This is every post Jamie ever published.";
  const result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("Urbanhermit eval rejects a dropped or duplicated profile record", () => {
  const dropped = loadUrbanhermitPopulation();
  dropped.records.pop();
  let result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: dropped });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);

  const duplicated = loadUrbanhermitPopulation();
  duplicated.records[1].url = duplicated.records[0].url;
  result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: duplicated });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
});

test("Urbanhermit row locks reject count-preserving identity mutations", () => {
  const mutations = [
    (population) => {
      const other = population.records.find((record) => record.authorHandle !== population.records[0].authorHandle);
      [population.records[0].authorHandle, other.authorHandle] = [other.authorHandle, population.records[0].authorHandle];
    },
    (population) => {
      [population.records[0].publishedAt, population.records[1].publishedAt] =
        [population.records[1].publishedAt, population.records[0].publishedAt];
    },
    (population) => {
      const linked = population.records.filter((record) => record.externalLinks.length > 0);
      [linked[0].externalLinks, linked[1].externalLinks] = [linked[1].externalLinks, linked[0].externalLinks];
    },
    (population) => {
      population.records[0].classificationInputDigest = "a".repeat(64);
    }
  ];

  for (const mutate of mutations) {
    const population = loadUrbanhermitPopulation();
    mutate(population);
    const result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: population });
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  }
});

test("Urbanhermit eval rejects mission-classification drift", () => {
  const population = loadUrbanhermitPopulation();
  population.missionSignalClassification.rules[0].pattern = "anything";
  const result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  assert.deepEqual(
    population.missionSignalClassification.rules.map((rule) => rule.signalId),
    urbanhermitMissionSignalRules.map((rule) => rule.id)
  );
});

test("Urbanhermit eval rejects repost-source authorship inflation", () => {
  const population = loadUrbanhermitPopulation();
  const repost = population.records.find((record) => record.recordType === "repost");
  assert.ok(repost);
  repost.authorHandle = "@urbanhermit";
  repost.sourceAuthorship = "account-authored";
  const result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
});

test("Urbanhermit eval rejects professional-traction inflation from context records", () => {
  const population = loadUrbanhermitPopulation();
  const context = population.stakeholderInventory.records.find(
    (record) => record.classification === "context-limited-personal-or-network"
  );
  assert.ok(context);
  context.classification = "mission-relevant-third-party";
  context.stakeholderGroup = "creative-community-peer";
  const result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
});

test("Urbanhermit public fixture withholds non-mission personal-context identities", () => {
  const population = loadUrbanhermitPopulation();
  const personalContext = population.stakeholderInventory.records.filter(
    (record) => record.classification === "context-limited-personal-or-network"
  );
  assert.equal(personalContext.length, 9);
  assert.ok(personalContext.every((record) =>
    record.publicDisposition === "identity-date-and-metrics-withheld-as-non-mission-personal-context" &&
    !("url" in record) && !("authorHandle" in record) && !("publishedAt" in record) && !("visibleEngagement" in record)
  ));
});

test("Urbanhermit eval rejects visible-interaction inflation", () => {
  const population = loadUrbanhermitPopulation();
  const authored = population.records.find((record) => record.sourceAuthorship === "account-authored");
  assert.ok(authored);
  authored.visibleEngagement.likes += 1;
  const result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
});

test("Urbanhermit public fixture rejects raw post-body leakage", () => {
  const population = loadUrbanhermitPopulation();
  population.records[0].text = "Synthetic raw post body that must never enter the public fixture.";
  const result = evaluateKnowledgeBank(suite, { urbanhermitPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("Urbanhermit mature claims reject silent website promotion", () => {
  const claim = knowledgeBank.claims.find((item) => item.id === "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING");
  assert.ok(claim?.projections[0]);
  const original = structuredClone(claim.projections[0]);

  try {
    claim.projections[0].status = "active";
    claim.projections[0].surfaces = ["/work/eighth-street-tunnel"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  } finally {
    Object.assign(claim.projections[0], original);
  }
});

test("Urbanhermit mature claims reject tunnel and tire role inflation", () => {
  const tunnel = knowledgeBank.claims.find((item) => item.id === "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING");
  const tire = knowledgeBank.claims.find((item) => item.id === "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION");
  assert.ok(tunnel && tire);
  const tunnelOriginal = tunnel.internalClaim;
  const tireOriginal = tire.internalClaim;

  try {
    tunnel.internalClaim = `${tunnelOriginal} Jamie restored the 8th Street Tunnel.`;
    let result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);

    tunnel.internalClaim = tunnelOriginal;
    tire.internalClaim = `${tireOriginal} Jamie alone created and operated Tired of Tires.`;
    result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  } finally {
    tunnel.internalClaim = tunnelOriginal;
    tire.internalClaim = tireOriginal;
  }
});

test("Urbanhermit source maturation preserves Horse Lords shared credit", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-URBANHERM-X-HORSE-LORDS-CORROBORATION"
  );
  assert.ok(observation);
  const originalText = observation.text;
  const originalLimitations = observation.limitations;

  try {
    observation.text = observation.text.replaceAll("M.C. Schmidt", "Jamie Burkart");
    observation.limitations = observation.limitations.filter((limitation) => !/M\.C\. Schmidt/.test(limitation));
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  } finally {
    observation.text = originalText;
    observation.limitations = originalLimitations;
  }
});

test("Urbanhermit source maturation rejects Jamie attribution from Brooklyn Eagle", () => {
  const observation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-URBANHERM-BROOKLYN-EAGLE-NYCAC-NIGHTLIFE-SEQUENCE"
  );
  assert.ok(observation);
  const originalText = observation.text;

  try {
    observation.text = `${observation.text} Jamie authored the NYC Artist Coalition statement and caused the Office of Nightlife.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-URBANHERM-FULL-POPULATION")?.score, 1);
  } finally {
    observation.text = originalText;
  }
});

test("KC Town Hall full-population production passes its deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  const ledger = loadKcTownHallLedger();

  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 5);
  assert.equal(ledger.records.length, 183);
  assert.equal(ledger.method.freshVerification.exactStatusIdMatchToJuly14Ledger, true);
  assert.equal(ledger.publicReposterAudit.length, 40);
  assert.equal(ledger.councilMemberPublicReposterAppearances.length, 7);
});

test("KC Town Hall full-population eval rejects a dropped profile object", () => {
  const ledger = loadKcTownHallLedger();
  ledger.records.pop();
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: ledger });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
  assert.equal(result.accepted, false);
});

test("KC Town Hall full-population eval rejects relationship inflation", () => {
  const ledger = loadKcTownHallLedger();
  ledger.records.find((row) => row.relationship === "repost").relationship = "account-post";
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: ledger });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
});

test("KC Town Hall source-status metrics cannot become project-account traction", () => {
  const ledger = loadKcTownHallLedger();
  ledger.records.find((row) => row.relationship === "repost").metricOwner = "account-authored-status";
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: ledger });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
});

test("KC Town Hall public ledger rejects raw post-body leakage", () => {
  const ledger = loadKcTownHallLedger();
  ledger.records[0].text = "raw body should not be public";
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: ledger });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
});

test("KC Town Hall repost audit rejects duplicated public identities", () => {
  const ledger = loadKcTownHallLedger();
  const handles = ledger.publicReposterAudit.flatMap((item) => item.publicReposterHandles);
  const row = ledger.publicReposterAudit.find((item) => item.publicReposterHandles.includes(handles.at(-1)));
  row.publicReposterHandles[row.publicReposterHandles.indexOf(handles.at(-1))] = handles[0];
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: ledger });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
});

test("KC Town Hall Council engagement requires official-at-date role evidence", () => {
  const ledger = loadKcTownHallLedger();
  ledger.councilMemberPublicReposterAppearances[0].roleSourceId = "SRC-KCSTAR-CCED-PROJECT-DELAYS-2021";
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: ledger });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
});

test("KC Town Hall fresh verification cannot drift from the preserved census", () => {
  const ledger = loadKcTownHallLedger();
  ledger.method.freshVerification.exactStatusIdMatchToJuly14Ledger = false;
  const result = evaluateKnowledgeBank(suite, { kcTownHallLedger: ledger });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
});

test("KC Town Hall service-workflow records cannot become completed-service units", () => {
  const claim = knowledgeBank.claims.find((item) => item.id === "CLM-KCTH-SOCIAL-SERVICE-REPORTING");
  assert.ok(claim?.projections[0]);
  const originalText = claim.projections[0].text;

  try {
    claim.projections[0].text = `${originalText} This proves 100 completed pickups.`;
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
  } finally {
    claim.projections[0].text = originalText;
  }
});

test("KC Town Hall independent coverage cannot establish the later withdrawal reason", () => {
  const source = knowledgeBank.sources.find((item) => item.id === suite.pilot.kcTownHallFullPopulation.independentCoverageSourceId);
  assert.ok(source);
  const originalBoundaries = source.doesNotEstablish;

  try {
    source.doesNotEstablish = source.doesNotEstablish.filter((item) => !/withdrawal reason/i.test(item));
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FULL-POPULATION")?.score, 1);
  } finally {
    source.doesNotEstablish = originalBoundaries;
  }
});

test("KC Town Hall reserve claims remain off public surfaces", () => {
  const heldIds = suite.pilot.kcTownHallFullPopulation.heldClaimIds;
  const heldClaims = kcTownHallSocialCorpus.claims.filter((claim) => heldIds.includes(claim.id));
  assert.equal(heldClaims.length, heldIds.length);
  assert.ok(heldClaims.every((claim) =>
    claim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
  ));
});

test("KC Town Hall field-practice production passes its deterministic criterion", () => {
  const result = evaluateKnowledgeBank(suite);
  const criterion = result.criteria.find(
    (item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE"
  );

  assert.equal(criterion?.score, 5);
  assert.equal(kcTownHallFieldPractice.intakeItems.length, 3);
  assert.equal(kcTownHallFieldPractice.observations.length, 13);
  assert.equal(kcTownHallFieldPractice.sources.length, 5);
  assert.equal(kcTownHallFieldPractice.claims.length, 4);
  assert.equal(kcTownHallFieldPractice.researchInquiries.length, 4);
});

test("KC Town Hall field-practice eval rejects publication of a protected source", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019"
  );
  assert.ok(source);
  const originalVisibility = source.visibility;

  try {
    source.visibility = "public";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    source.visibility = originalVisibility;
  }
});

test("KC Town Hall field-practice eval rejects premature field-delivery projection", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"
  );
  assert.ok(claim?.projections[0]);
  const originalStatus = claim.projections[0].status;
  const originalSurfaces = claim.projections[0].surfaces;

  try {
    claim.projections[0].status = "active";
    claim.projections[0].surfaces = ["/work/kc-town-hall"];
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.projections[0].status = originalStatus;
    claim.projections[0].surfaces = originalSurfaces;
  }
});

test("KC Town Hall field-practice eval requires the general-contractor and completion boundary", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"
  );
  assert.ok(claim);
  const originalBoundaries = claim.boundaries;

  try {
    claim.boundaries = claim.boundaries.filter(
      (boundary) => !/does not independently establish general-contractor title or actual Phase One completion/i.test(boundary)
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.boundaries = originalBoundaries;
  }
});

test("KC Town Hall field-practice eval rejects individual-role and service-unit inflation", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"
  );
  assert.ok(claim);
  const originalBoundaries = claim.boundaries;

  try {
    claim.boundaries = claim.boundaries.filter(
      (boundary) => !/not completed service units/i.test(boundary)
    );
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.boundaries = originalBoundaries;
  }
});

test("KC Town Hall field-practice eval rejects private-path leakage", () => {
  const report = readFileSync(
    path.join(repoRoot, suite.pilot.kcTownHallFieldPractice.documentationPath),
    "utf8"
  );
  const result = evaluateKnowledgeBank(suite, {
    kcTownHallFieldPracticeReport: `${report}\n/private/tmp/raw-proposal.txt`
  });

  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
  assert.equal(result.accepted, false);
});

test("KC Town Hall field-practice eval rejects sole survey authorship with counts preserved", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE"
  );
  assert.ok(claim);
  const originalClaim = claim.internalClaim;

  try {
    claim.internalClaim = "The protected proposal proves Jamie alone designed the survey handbill and data system and produced a statistically representative community mandate.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.internalClaim = originalClaim;
  }
});

test("KC Town Hall field-practice eval rejects individual tire-operations inflation", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"
  );
  assert.ok(claim);
  const originalClaim = claim.internalClaim;

  try {
    claim.internalClaim = "The public archives prove Jamie individually designed, coordinated, drove, unloaded, and logged the monthly tire program.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.internalClaim = originalClaim;
  }
});

test("KC Town Hall field-practice eval rejects Cleveland Avenue sole credit and capital causation", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-CONTRIBUTION"
  );
  assert.ok(claim?.projections[0]);
  const originalClaim = claim.internalClaim;
  const originalProjection = claim.projections[0].text;

  try {
    claim.internalClaim = "Jamie alone created Cleveland Avenue Unify to Beautify, originated Pastor Lee's corridor vision, and caused a specific capital allocation.";
    claim.projections[0].text = "Verified: Jamie alone created the program and caused the capital allocation.";
    const result = evaluateKnowledgeBank(suite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    claim.internalClaim = originalClaim;
    claim.projections[0].text = originalProjection;
  }
});

test("KC Town Hall rendered proof cannot publish held field-practice claims after hash refresh", () => {
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  assert.ok(proof?.shortWording);
  const originalWording = proof.shortWording;

  try {
    proof.shortWording = `${originalWording} Jamie led Phase One construction as GC and built the neighborhood feedback system.`;
    const mutatedSuite = structuredClone(suite);
    const staleHashResult = evaluateKnowledgeBank(mutatedSuite);
    mutatedSuite.pilot.kcTownHallCouncilFunding.approvedContentSha256 =
      staleHashResult.contentApprovals.kcTownHall.actualSha256;
    const refreshedHashResult = evaluateKnowledgeBank(mutatedSuite);
    assert.equal(refreshedHashResult.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(refreshedHashResult.accepted, false);
  } finally {
    proof.shortWording = originalWording;
  }
});

test("KC Town Hall field-practice semantics survive approval-hash refresh", () => {
  const surveyClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE"
  );
  const tireClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"
  );
  const clevelandClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-CONTRIBUTION"
  );
  assert.ok(surveyClaim?.projections[0]);
  assert.ok(tireClaim);
  assert.ok(clevelandClaim);

  const mutations = [
    [surveyClaim, "internalClaim", "Jamie personally fashioned the questionnaire and respondent database, yielding a reliable neighborhood mandate."],
    [tireClaim, "internalClaim", "Records show Jamie personally ran every monthly tire collection from intake through hauling and disposal."],
    [clevelandClaim, "internalClaim", "Jamie was exclusively responsible for launching Cleveland Avenue Unify to Beautify, and his campaign brought municipal investment to the corridor."],
    [surveyClaim.projections[0], "text", "Jamie personally built the resident questionnaire and database that established the community mandate."]
  ];

  for (const [record, key, value] of mutations) {
    const original = record[key];
    try {
      record[key] = value;
      const mutatedSuite = structuredClone(suite);
      refreshFieldPracticeApproval(mutatedSuite);
      const result = evaluateKnowledgeBank(mutatedSuite);
      assert.equal(
        result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score,
        1,
        `expected semantic rejection after field-practice hash refresh: ${value}`
      );
      assert.equal(result.accepted, false);
    } finally {
      record[key] = original;
    }
  }
});

test("KC Town Hall rendered proof rejects rehabilitation and feedback paraphrases after hash refresh", () => {
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  assert.ok(proof?.shortWording);
  const originalWording = proof.shortWording;

  try {
    proof.shortWording = `${originalWording} Jamie delivered the first-stage rehabilitation and created its resident-feedback infrastructure.`;
    const mutatedSuite = structuredClone(suite);
    const staleHashResult = evaluateKnowledgeBank(mutatedSuite);
    mutatedSuite.pilot.kcTownHallCouncilFunding.approvedContentSha256 =
      staleHashResult.contentApprovals.kcTownHall.actualSha256;
    const result = evaluateKnowledgeBank(mutatedSuite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.accepted, false);
  } finally {
    proof.shortWording = originalWording;
  }
});

test("KC Town Hall shared public surfaces cannot bypass the field-practice hold", () => {
  const attempts = [
    "Jamie spearheaded Phase One construction and delivered the roof restoration.",
    "Jamie devised the neighborhood-engagement questionnaire and made its respondent database."
  ];

  for (const attempt of attempts) {
    const result = evaluateKnowledgeBank(suite, {
      kcTownHallAdditionalPublicSurfaceText: attempt
    });
    assert.equal(
      result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score,
      1,
      `expected alternate public-surface rejection: ${attempt}`
    );
    assert.equal(result.accepted, false);
  }
});

test("KC Town Hall field-practice review locks survive editable manifest refreshes", () => {
  const fieldClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY"
  );
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  assert.ok(fieldClaim);
  assert.ok(proof);

  const originalFieldClaim = fieldClaim.internalClaim;
  const originalSourceBasis = proof.sourceBasis;
  try {
    fieldClaim.internalClaim = "Burkart served as general contractor and completed Phase One in 2019.";
    const fieldSuite = structuredClone(suite);
    refreshFieldPracticeApproval(fieldSuite);
    let result = evaluateKnowledgeBank(fieldSuite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.contentApprovals.kcTownHallFieldPractice.reviewLocksMatch, false);

    fieldClaim.internalClaim = originalFieldClaim;
    proof.sourceBasis = "The March 2019 proposal confirms that the initial build-out was finished.";
    const proofSuite = structuredClone(suite);
    const staleProofResult = evaluateKnowledgeBank(proofSuite);
    proofSuite.pilot.kcTownHallCouncilFunding.approvedContentSha256 =
      staleProofResult.contentApprovals.kcTownHall.actualSha256;
    result = evaluateKnowledgeBank(proofSuite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.contentApprovals.kcTownHallFieldPractice.reviewLocksMatch, false);
  } finally {
    fieldClaim.internalClaim = originalFieldClaim;
    proof.sourceBasis = originalSourceBasis;
  }
});

test("KC Town Hall review locks reject holdout pronoun and synonym evasions", () => {
  const targets = [
    ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE", "He personally fashioned the questionnaire and respondent database, yielding a reliable neighborhood mandate."],
    ["CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE", "Records show he personally ran every monthly tire collection from intake through hauling and disposal."],
    ["CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-CONTRIBUTION", "He was exclusively responsible for launching Cleveland Avenue Unify to Beautify; the initiative attracted City investment to the corridor."],
    ["CLM-KCTH-NEIGHBORHOOD-SURVEY-PRACTICE", "Jamie was the sole architect of the resident poll and response registry, which demonstrated broad local consensus."],
    ["CLM-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE", "Records establish Jamie was solely responsible for every recurring scrap-tire removal round."],
    ["CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-CONTRIBUTION", "Jamie alone launched the Cleveland corridor beautification initiative, which unlocked public capital for the avenue."]
  ];

  for (const [claimId, mutation] of targets) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    assert.ok(claim);
    const original = claim.internalClaim;
    try {
      claim.internalClaim = mutation;
      const mutatedSuite = structuredClone(suite);
      refreshFieldPracticeApproval(mutatedSuite);
      const result = evaluateKnowledgeBank(mutatedSuite);
      assert.equal(
        result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score,
        1,
        `expected code-level review-lock rejection: ${mutation}`
      );
      assert.equal(result.contentApprovals.kcTownHallFieldPractice.reviewLocksMatch, false);
    } finally {
      claim.internalClaim = original;
    }
  }
});

test("KC Town Hall proof review lock rejects the holdout's stabilization paraphrase", () => {
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  assert.ok(proof?.shortWording);
  const original = proof.shortWording;

  try {
    proof.shortWording = "Jamie was responsible for the opening stabilization stage and originated its resident-input mechanism.";
    const mutatedSuite = structuredClone(suite);
    const staleResult = evaluateKnowledgeBank(mutatedSuite);
    mutatedSuite.pilot.kcTownHallCouncilFunding.approvedContentSha256 =
      staleResult.contentApprovals.kcTownHall.actualSha256;
    const result = evaluateKnowledgeBank(mutatedSuite);
    assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
    assert.equal(result.contentApprovals.kcTownHallFieldPractice.reviewLocksMatch, false);
  } finally {
    proof.shortWording = original;
  }
});

test("KC Town Hall case-study MDX review lock survives approval-hash refresh", () => {
  const originalMdx = readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
  const mutatedMdx = `${originalMdx}\nJamie delivered the opening stabilization stage and created its resident-input mechanism.\n`;
  const mutatedSuite = structuredClone(suite);
  mutatedSuite.pilot.kcTownHallCouncilFunding.approvedMdxSha256 = createHash("sha256")
    .update(mutatedMdx)
    .digest("hex");
  const result = evaluateKnowledgeBank(mutatedSuite, { kcTownHallMdx: mutatedMdx });

  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
  assert.equal(result.contentApprovals.kcTownHallFieldPractice.reviewLocksMatch, false);
  assert.equal(result.accepted, false);
});

test("KC Town Hall public review report is inside the field-practice review lock", () => {
  const report = readFileSync(
    path.join(repoRoot, suite.pilot.kcTownHallFieldPractice.documentationPath),
    "utf8"
  );
  const result = evaluateKnowledgeBank(suite, {
    kcTownHallFieldPracticeReport: `${report}\nRecords establish Burkart completed the opening stabilization and personally authored the resident-input apparatus.\n`
  });

  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-KCTH-FIELD-PRACTICE")?.score, 1);
  assert.equal(result.contentApprovals.kcTownHallFieldPractice.reviewLocksMatch, false);
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

test("NYCAC Facebook census accounts for every displayed event slot without overstating recovery", () => {
  const population = loadNycacFacebookEventPopulation();
  const reconciliation = population.populationReconciliation;
  const eventIds = new Set(population.events.map((event) => event.id));
  const eventUrls = new Set(population.events.map((event) => event.url));

  assert.equal(reconciliation.pageDisplayedPastEventCount, 34);
  assert.equal(reconciliation.recoveredIndexEventCount, 33);
  assert.equal(reconciliation.recoveredDetailEventCount, 33);
  assert.equal(reconciliation.unmaterializedCount, 1);
  assert.equal(reconciliation.recoveredIndexEventCount + reconciliation.unmaterializedCount, 34);
  assert.equal(population.events.length, 33);
  assert.equal(eventIds.size, 33);
  assert.equal(eventUrls.size, 33);
  assert.match(reconciliation.reconciliationNote, /unmaterialized, not as nonexistent/i);
});

test("NYCAC Facebook census preserves chronology, organizer relations, and recurring venue practice", () => {
  const population = loadNycacFacebookEventPopulation();
  const yearCounts = Object.fromEntries(
    Object.entries(Object.groupBy(population.events, (event) => event.date.slice(0, 4)))
      .map(([year, events]) => [year, events.length])
  );
  const direct = population.events.filter(
    (event) => event.relationToPage === "index-displayed-nycac-organizer"
  );
  const cohosted = population.events.filter(
    (event) => event.relationToPage === "allied-or-cohosted-listing"
  );
  const recurringIds = new Set(nycacFacebookEventReviewSummary.recurringMeetingEventIds);
  const recurring = population.events.filter((event) => recurringIds.has(event.id));
  const physicalVenues = new Set(
    recurring
      .filter((event) => event.venueCategory === "cultural-or-community-space")
      .map((event) => event.venue)
  );

  assert.deepEqual(yearCounts, nycacFacebookEventReviewSummary.recoveredYears);
  assert.equal(direct.length, 24);
  assert.equal(cohosted.length, 9);
  assert.equal(recurring.length, 12);
  assert.equal(physicalVenues.size, 10);
  assert.equal(recurring.filter((event) => event.venueCategory === "virtual").length, 2);
});

test("NYCAC Facebook later replay records platform volatility without deleting earlier recoveries", () => {
  const population = loadNycacFacebookEventPopulation();
  const recheck = population.populationReconciliation.detailAvailabilityRecheck;
  const eventIds = new Set(population.events.map((event) => event.id));

  assert.equal(recheck.recoveredEventIdCount, 33);
  assert.equal(recheck.recoveredDetailCount, 28);
  assert.equal(recheck.temporarilyUnavailableDetailCount, 5);
  assert.equal(new Set(recheck.temporarilyUnavailableEventIds).size, 5);
  assert.ok(recheck.temporarilyUnavailableEventIds.every((id) => eventIds.has(id)));
  assert.match(recheck.interpretation, /rather than evidence that those events did not exist/i);
});

test("NYCAC Facebook response labels remain bounded interface states rather than attendance", () => {
  const population = loadNycacFacebookEventPopulation();
  const withResponses = population.events.filter(
    (event) => event.responseSnapshot.respondedDisplay !== null
  );
  const atLeast = (minimum) => population.events.filter(
    (event) => event.responseSnapshot.pointEstimate >= minimum
  ).length;

  assert.equal(withResponses.length, 32);
  assert.equal(atLeast(100), 19);
  assert.equal(atLeast(500), 7);
  assert.equal(atLeast(1000), 3);
  assert.ok(population.events.every((event) =>
    /not unique people or verified attendance/i.test(event.responseSnapshot.interpretation)
  ));
  assert.match(population.aggregateSnapshot.interpretation, /do not establish attendance/i);
});

test("NYCAC Facebook census routes seven articles and withholds thirteen protected link occurrences", () => {
  const population = loadNycacFacebookEventPopulation();
  const withheld = population.events.reduce(
    (total, event) => total + event.withheldOutboundLinkCount,
    0
  );

  assert.equal(population.postedSourceArticles.length, 7);
  assert.equal(nycacFacebookEventArticleSourceIds.length, 7);
  assert.equal(withheld, 13);
  assert.ok(population.postedSourceArticles.every((article) =>
    /^https?:\/\//.test(article.url) && population.events.some((event) => event.id === article.eventId)
  ));
});

test("NYCAC Facebook public artifacts exclude private locators and sensitive event payloads", () => {
  const files = [
    suite.pilot.nycacFacebookEvents.manifestPath,
    "apps/www/src/data/knowledge-bank/nycac-facebook-events-2026-07.ts",
    suite.pilot.nycacFacebookEvents.reportPath
  ];
  const publicText = files.map((file) => readFileSync(path.join(repoRoot, file), "utf8")).join("\n");

  assert.doesNotMatch(publicText, /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/);
  assert.doesNotMatch(publicText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(publicText, /(?:zoom\.us\/j\/|docs\.google\.com\/document|"passcode"\s*:)/i);
  assert.equal(loadNycacFacebookEventPopulation().publicSafety.rawDescriptionsPublished, false);
});

test("NYCAC Facebook report enumerates every recovered event and states the population boundary", () => {
  const population = loadNycacFacebookEventPopulation();
  const report = readFileSync(
    path.join(repoRoot, suite.pilot.nycacFacebookEvents.reportPath),
    "utf8"
  );

  assert.ok(population.events.every((event) => report.includes(event.url)));
  assert.match(report, /100 percent control-slot accounting, not 100 percent historical content/i);
  assert.match(report, /Facebook response count[\s\S]{0,160}not verified attendance/i);
  assert.match(report, /helped establish and produce/i);
  assert.match(report, /platform volatility/i);
});

test("NYCAC Facebook event gate rejects attendance, sole-credit, causation, and completion overclaims", () => {
  const mutations = [
    [nycacFacebookEventClaimIds.responseSignals, "The events drew 9,989 people."],
    [nycacFacebookEventClaimIds.responseSignals, "Facebook responses equal event attendance."],
    [nycacFacebookEventClaimIds.participationSystem, "Jamie solely produced every NYC Artist Coalition event."],
    [nycacFacebookEventClaimIds.participationSystem, "The participation system caused the Cabaret Law repeal."],
    [nycacFacebookEventClaimIds.population, "All 34 event pages were recovered."]
  ];

  for (const [claimId, mutation] of mutations) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    const activeProjection = claim?.projections.find((projection) => projection.status === "active");
    assert.ok(activeProjection);
    const original = activeProjection.text;
    try {
      activeProjection.text = mutation;
      const result = evaluateKnowledgeBank(suite);
      assert.equal(
        result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score,
        1,
        `expected event gate rejection: ${mutation}`
      );
    } finally {
      activeProjection.text = original;
    }
  }
});

test("NYCAC Facebook event review locks reject count and public-report mutations", () => {
  const population = loadNycacFacebookEventPopulation();
  population.populationReconciliation.unmaterializedCount = 0;
  let result = evaluateKnowledgeBank(suite, { nycacFacebookEventPopulation: population });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score, 1);
  assert.equal(result.contentApprovals.nycacFacebookEvents.reviewLocksMatch, true);

  const report = readFileSync(
    path.join(repoRoot, suite.pilot.nycacFacebookEvents.reportPath),
    "utf8"
  );
  result = evaluateKnowledgeBank(suite, {
    nycacFacebookEventReport: `${report}\nAll 34 event pages were recovered.\n`
  });
  assert.equal(result.criteria.find((item) => item.criterionId === "KB-EVAL-NYCAC-FACEBOOK-EVENTS")?.score, 1);
  assert.equal(result.contentApprovals.nycacFacebookEvents.reviewLocksMatch, false);
});

test("NYCAC Facebook participation claim preserves collective credit and attributed interpretation", () => {
  const participation = nycacFacebookEventKnowledge.claims.find(
    (claim) => claim.id === nycacFacebookEventClaimIds.participationSystem
  );
  const interpretation = nycacFacebookEventKnowledge.claims.find(
    (claim) => claim.id === nycacFacebookEventClaimIds.democraticPractice
  );

  assert.ok(participation?.boundaries.some((boundary) => /authorship or sole production/i.test(boundary)));
  assert.ok(participation?.antiClaims.some((antiClaim) => /solely created or produced every/i.test(antiClaim)));
  assert.equal(interpretation?.status, "use-with-care");
  assert.ok(interpretation?.boundaries.some((boundary) => /attributed to Jamie/i.test(boundary)));
  assert.ok(interpretation?.projections.every((projection) =>
    projection.status === "active" && projection.surfaces.every((surface) => surface.startsWith("docs/"))
  ));
});
