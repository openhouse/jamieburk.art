import assert from "node:assert/strict";
import test from "node:test";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
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

test("complete maturation pilot meets every floor", () => {
  const result = evaluateKnowledgeBank(suite);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.belowMinimum, []);
  assert.equal(result.accepted, true);
});
