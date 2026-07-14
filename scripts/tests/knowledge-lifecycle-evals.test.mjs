import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressNewArticleSourceIds,
  campaignPressPlacements
} from "../../apps/www/src/data/knowledge-bank/campaign-press-2026-07-13.ts";
import {
  currentRepositorySnapshot,
  evaluateLifecycle,
  findUnsafeRepositoryText,
  loadSuite,
  scoreAssessment,
  validateSuite
} from "../evals/lib/knowledge-lifecycle.mjs";

const suite = loadSuite();
const validEvidence = [
  { file: "apps/www/src/data/knowledge-bank/schema.ts", record: "intakeRecordSchema" },
  { file: "apps/www/src/data/knowledge-bank/lifecycle-records.ts", record: "CLM-RIVER-EXPEDITION-ORIGIN" },
  { file: "docs/knowledge-bank/lifecycle.md", record: "Knowledge lifecycle" },
  { file: "scripts/evals/lib/knowledge-lifecycle.mjs", record: "claim-promotion-is-evidence-backed" },
  { file: "scripts/tests/knowledge-lifecycle-evals.test.mjs", record: "context-only evidence cannot promote" }
];

test("knowledge-lifecycle suite contract is valid", () => {
  assert.deepEqual(validateSuite(suite), []);
  assert.equal(suite.judgeCriteria.reduce((sum, item) => sum + item.weight, 0), 100);
  assert.equal(suite.judgeCriteria.find((item) => item.id === "loss-resistance").floor, 4);
});

test("canonical lifecycle clears deterministic gates", () => {
  const report = evaluateLifecycle({ suite, bank: knowledgeBank });
  assert.equal(report.summary.hardGateFailures, 0);
  assert.equal(report.summary.qualityTargetGaps, 0);
});

test("orphaned intake fails", () => {
  const bank = structuredClone(knowledgeBank);
  bank.intake[0].sourceIds = [];
  bank.intake[0].claimIds = [];
  bank.intake[0].researchTaskIds = [];
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "intake-is-accounted-for").passed, false);
});

test("every source and claim requires an accession", () => {
  const bank = structuredClone(knowledgeBank);
  bank.sources[0].intakeIds = [];
  bank.claims[0].intakeIds = [];
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "intake-is-accounted-for").passed, false);
});

test("researching claims cannot project", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === "CLM-NYCARTC-CREATION-ROLE-SEED");
  claim.projections.push({ key: "homepage", text: "Unsupported founder claim", status: "active", citationRequired: false, surfaces: ["/"] });
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "publication-is-an-independent-decision").passed, false);
});

test("context-only evidence cannot promote a lifecycle claim", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === "CLM-RIVER-EXPEDITION-ORIGIN");
  claim.evidence[0].relationship = "context";
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed, false);
});

test("public-ready claims require a publication decision when not projected", () => {
  const bank = structuredClone(knowledgeBank);
  bank.projectionDecisions = bank.projectionDecisions.filter((item) => item.claimId !== "CLM-RIVER-EXPEDITION-ORIGIN");
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "publication-is-an-independent-decision").passed, false);
});

test("active surfaces require explicit publish decisions", () => {
  const bank = structuredClone(knowledgeBank);
  bank.projectionDecisions = bank.projectionDecisions.filter((item) => item.id !== "DEC-PUBLISH-CALLNYC-DATE");
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "publication-is-an-independent-decision").passed, false);
});

test("photo observations remain public-safe research leads", () => {
  const observation = knowledgeBank.intake.find((item) => item.kind === "photo-observation");
  assert.equal(observation.rawMaterialPolicy, "protected-outside-repo");
  assert.ok(observation.researchTaskIds.length > 0);
  const claim = knowledgeBank.claims.find((item) => item.id === observation.claimIds[0]);
  assert.equal(claim.maturity, "corroborated");
  assert.equal(claim.projections.some((item) => item.status === "active"), false);
});

test("photo observations require protection and research routing", () => {
  const bank = structuredClone(knowledgeBank);
  const observation = bank.intake.find((item) => item.kind === "photo-observation");
  observation.rawMaterialPolicy = "public-source-only";
  observation.researchTaskIds = [];
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "intake-is-accounted-for").passed, false);
});

test("defer decisions block active projections", () => {
  const bank = structuredClone(knowledgeBank);
  const decision = bank.projectionDecisions.find((item) => item.id === "DEC-PUBLISH-CALLNYC-DATE");
  decision.decision = "defer";
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "publication-is-an-independent-decision").passed, false);
});

test("rejected and superseded claims cannot project", () => {
  for (const maturity of ["rejected", "superseded"]) {
    const bank = structuredClone(knowledgeBank);
    const claim = bank.claims.find((item) => item.id === "CLM-NYCARTC-CREATION-ROLE-SEED");
    claim.maturity = maturity;
    claim.status = maturity;
    claim.projections.push({ key: "homepage", text: "Retired claim", status: "active", citationRequired: false, surfaces: ["/"] });
    const report = evaluateLifecycle({ suite, bank });
    assert.equal(report.results.find((item) => item.id === "publication-is-an-independent-decision").passed, false);
  }
});

test("rejected and superseded claims retain disposition history", () => {
  const bank = structuredClone(knowledgeBank);
  bank.claims.find((item) => item.maturity === "rejected").disposition = undefined;
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed, false);
});

test("superseded claims retain reciprocal lineage", () => {
  const bank = structuredClone(knowledgeBank);
  bank.claims.find((item) => item.maturity === "superseded").disposition.successorClaimIds = [];
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed, false);
});

test("proposition-level evidence cannot lose its source reading", () => {
  const bank = structuredClone(knowledgeBank);
  bank.sourceReadings = bank.sourceReadings.filter((item) => item.id !== "READ-RIVER-PITCH-2007");
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed, false);
});

test("proposition links must satisfy required semantic support tags", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === "CLM-RIVER-EXPEDITION-ORIGIN");
  claim.evidence[0].propositionIds = ["PROP-RIVER-PITCH-CROSSING"];
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed, false);
});

test("intake and claim links are reciprocal", () => {
  const bank = structuredClone(knowledgeBank);
  bank.claims.find((item) => item.id === "CLM-RIVER-EXPEDITION-ORIGIN").intakeIds = [];
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "graph-references-are-valid").passed, false);
});

test("every claim project resolves through the entity graph", () => {
  const bank = structuredClone(knowledgeBank);
  bank.claims.find((item) => item.id === "CLM-HJE-PUBLIC-ECOMMERCE-SURFACE").project = "missing-project";
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "graph-references-are-valid").passed, false);
});

test("public-safe records reject correspondence and contact patterns", () => {
  const bank = structuredClone(knowledgeBank);
  bank.intake[0].publicSafeSummary = "Subject: private note from person@example.com at 212-555-1212";
  const report = evaluateLifecycle({ suite, bank });
  assert.equal(report.results.find((item) => item.id === "public-repo-boundary-is-enforced").passed, false);
});

test("repository boundary scan detects concrete local archive paths", () => {
  const localPath = ["", "Users", "example", "private-archive"].join("/");
  const findings = findUnsafeRepositoryText("fixture.md", `Archive: ${localPath}`);
  assert.deepEqual(findings, [{ file: "fixture.md", reason: "local-user-path" }]);
  assert.deepEqual(findUnsafeRepositoryText("fixture.md", "Public-safe source description."), []);
});

test("July 13 source expansion preserves its original ten bounded public sources", () => {
  const sourceIds = [
    "SRC-GREENE-HILL-COOP-QA-2017",
    "SRC-BEDFORD-DIY-SPACES-2017",
    "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
    "SRC-SAVE-NYC-SPACES-PLATFORM",
    "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
    "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
    "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016",
    "SRC-PITCH-GREAT-ACCOMMODATIONS-2009",
    "SRC-WLBT-RAFT-2007",
    "SRC-CLAUDETTE-AR-COLLABORATION"
  ];

  assert.equal(new Set(sourceIds).size, 10);
  for (const sourceId of sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    const reading = knowledgeBank.sourceReadings.find((item) => item.sourceId === sourceId);
    assert.ok(source, `${sourceId} must be accessioned`);
    assert.equal(source.visibility, "public");
    assert.ok(source.intakeIds.length > 0);
    assert.equal(reading?.status, "closely-read");
    assert.ok(reading.propositions.length > 0);
    assert.ok(reading.limitations.length > 0);
  }

  const kcReading = knowledgeBank.sourceReadings.find((item) => item.id === "READ-KCMO-KC-TOWN-HALL-2019");
  const kcClaim = knowledgeBank.claims.find((item) => item.id === "CLM-KC-TOWN-HALL-CCED-RECOMMENDATION-2019");
  const kcTask = knowledgeBank.researchTasks.find((item) => item.id === "TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME");
  assert.ok(kcReading.propositions.some((item) => item.id === "PROP-KCTOWN-BOARD-RECOMMENDATION"));
  assert.ok(kcClaim.requiredSupportTags.includes("kc-town-hall-board-recommendation"));
  assert.equal(kcTask.priority, "high");
});

test("KC Town Hall records Council appropriation and the later unused-fund clawback", () => {
  const sourceIds = [
    "SRC-KCMO-COUNCIL-MEETING-2019-09-26",
    "SRC-KCMO-RESOLUTION-190649-2019",
    "SRC-KCMO-ORDINANCE-240317-2024"
  ];

  for (const sourceId of sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    const reading = knowledgeBank.sourceReadings.find((item) => item.sourceId === sourceId);
    assert.ok(source, `${sourceId} must resolve`);
    assert.equal(source.kind, "government-record");
    assert.equal(reading?.status, "closely-read");
    assert.ok(reading.propositions.length > 0);
    assert.ok(reading.limitations.length > 0);
  }

  const priorClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-CCED-RECOMMENDATION-2019"
  );
  const completeClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"
  );
  const transitionIntake = knowledgeBank.intake.find(
    (item) => item.id === "INTAKE-KCMO-KC-TOWN-HALL-TRANSITION-MEMORY"
  );
  const transitionClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-TRANSITION-SEED"
  );
  const transitionTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-KC-TOWN-HALL-TRANSITION-CHRONOLOGY"
  );

  assert.equal(priorClaim.maturity, "superseded");
  assert.ok(priorClaim.disposition.successorClaimIds.includes(completeClaim.id));
  assert.equal(completeClaim.maturity, "public-ready");
  assert.ok(completeClaim.requiredSupportTags.includes("kc-town-hall-council-appropriation-confirmed"));
  assert.ok(completeClaim.requiredSupportTags.includes("kc-town-hall-funding-negotiation-authorized"));
  assert.ok(completeClaim.requiredSupportTags.includes("kc-town-hall-council-funding-conditions"));
  assert.ok(completeClaim.requiredSupportTags.includes("kc-town-hall-unused-funds-clawed-back"));
  assert.match(completeClaim.composition.causalBoundary, /did not become a disbursement/i);
  assert.ok(completeClaim.antiClaims.some((item) => /received or spent/i.test(item)));
  assert.ok(completeClaim.antiClaims.some((item) => /personally made or controlled the later withdrawal/i.test(item)));
  assert.equal(task.status, "resolved");
  assert.match(task.resolutionSummary, /no disbursement or completed development/i);
  assert.match(task.resolutionSummary, /do not attribute the later withdrawal to Jamie/i);
  assert.equal(transitionIntake.kind, "public-memory");
  assert.equal(transitionIntake.rawMaterialPolicy, "protected-outside-repo");
  assert.equal(transitionClaim.maturity, "researching");
  assert.equal(transitionClaim.projections.length, 0);
  assert.equal(transitionClaim.evidence.length, 0);
  assert.equal(transitionTask.status, "open");
  assert.equal(transitionTask.priority, "high");
});

test("KC Town Hall transition memory cannot lose its research route", () => {
  const bank = structuredClone(knowledgeBank);
  const task = bank.researchTasks.find(
    (item) => item.id === "TASK-KC-TOWN-HALL-TRANSITION-CHRONOLOGY"
  );
  task.status = "resolved";

  const report = evaluateLifecycle({ suite, bank });
  assert.equal(
    report.results.find((item) => item.id === "claim-seeds-have-research-routes").passed,
    false
  );
});

test("KC Town Hall Council semantics cannot lose proposition-level support", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"
  );
  const resolutionEvidence = claim.evidence.find(
    (item) => item.sourceId === "SRC-KCMO-RESOLUTION-190649-2019"
  );
  resolutionEvidence.propositionIds = resolutionEvidence.propositionIds.filter(
    (id) => ![
      "PROP-KCTOWN-RESOLUTION-AUTHORIZES-NEGOTIATION",
      "PROP-KCTOWN-RESOLUTION-LIMITS-USES"
    ].includes(id)
  );

  const report = evaluateLifecycle({ suite, bank });
  assert.equal(
    report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed,
    false
  );
});

test("Teams archive production remains protected, source-backed, and deferred", () => {
  const sourceIds = [
    "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026",
    "SRC-TEAMS-CRS-ACTION-PLAN-2026",
    "SRC-TEAMS-CRS-RUNNING-MINUTES-2026",
    "SRC-TEAMS-CRS-PROVENANCE-REDLINE-2026",
    "SRC-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026"
  ];
  const claimIds = [
    "CLM-CROSS-PROJECT-ARCHIVE-PRACTICE-2026",
    "CLM-CRS-SHARED-OPERATING-MEMORY-2026",
    "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
    "CLM-SOURCE-BACKED-MEMORY-PILOT-DESIGN-2026"
  ];

  for (const sourceId of sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    const reading = knowledgeBank.sourceReadings.find((item) => item.sourceId === sourceId);
    assert.equal(source.visibility, "protected");
    assert.equal(source.preservationStatus, "private");
    assert.ok(source.protectedLocatorId);
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
    assert.equal(reading.status, "closely-read");
    assert.ok(reading.propositions.length > 0);
    assert.ok(reading.limitations.length > 0);
  }

  for (const claimId of claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claimId);
    assert.equal(claim.maturity, "public-ready");
    assert.equal(claim.projections.length, 0);
    assert.ok(claim.composition);
    assert.ok(claim.antiClaims.length > 0);
    assert.equal(decision.decision, "defer");
  }

  const memoryIntake = knowledgeBank.intake.find(
    (item) => item.id === "INTAKE-TEAMS-ICLOUD-HANDOFF-PRACTICE-2026"
  );
  assert.equal(memoryIntake.kind, "public-memory");
  assert.equal(memoryIntake.rawMaterialPolicy, "protected-outside-repo");

  const pilotSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-TEAMS-SOURCE-BACKED-PILOT-PROPOSAL-2026"
  );
  const publicRecord = JSON.stringify(pilotSource);
  assert.equal(pilotSource.author, "Jamie Burkart");
  assert.equal(pilotSource.organization, undefined);
  assert.doesNotMatch(publicRecord, /\$\d|@gmail\.com|\/Users\//i);
  assert.ok(pilotSource.doesNotEstablish.some((item) => /acceptance/i.test(item)));
  assert.ok(pilotSource.doesNotEstablish.some((item) => /delivery/i.test(item)));
});

test("Teams archive claims cannot lose semantic support", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-CRS-SHARED-OPERATING-MEMORY-2026"
  );
  const minutesEvidence = claim.evidence.find(
    (item) => item.sourceId === "SRC-TEAMS-CRS-RUNNING-MINUTES-2026"
  );
  minutesEvidence.propositionIds = minutesEvidence.propositionIds.filter(
    (id) => id !== "PROP-TEAMS-CRS-MEMORY-GUARDRAILS"
  );

  const report = evaluateLifecycle({ suite, bank });
  assert.equal(
    report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed,
    false
  );
});

test("legacy projected claims carry proposition-level support", () => {
  const claimIds = [
    "CLM-CALLNYC-HACKATHON-DATE-TIME",
    "CLM-CALLNYC-EVENT-BRANDING",
    "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
    "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
    "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED",
    "CLM-HJE-PUBLIC-ECOMMERCE-SURFACE",
    "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION",
    "CLM-FAIRRENTNYC-PUBLIC-CAMPAIGN-SURFACE",
    "CLM-WOWLIST-ARCHIVED-PUBLIC-SURFACE"
  ];

  for (const claimId of claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    assert.ok(claim.requiredSupportTags.length > 0, `${claimId} must declare support tags`);
    assert.ok(
      claim.evidence.some((item) => item.propositionIds.length > 0),
      `${claimId} must cite source-level propositions`
    );
  }
});

test("legacy projected claims cannot lose semantic support", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-HJE-PUBLIC-ECOMMERCE-SURFACE"
  );
  claim.evidence[0].propositionIds = claim.evidence[0].propositionIds.filter(
    (id) => id !== "PROP-HJE-STOREFRONT-EDITORIAL-VOICE"
  );

  const report = evaluateLifecycle({ suite, bank });
  assert.equal(
    report.results.find((item) => item.id === "claim-promotion-is-evidence-backed").passed,
    false
  );
});

test("campaign press recovery preserves 45 placements and 44 distinct articles", () => {
  const expectedByCampaign = {
    letnycdance: 21,
    talksnotraids: 7,
    savenycspaces: 8,
    fairrentnyc: 9
  };

  assert.equal(campaignPressPlacements.length, 45);
  assert.equal(new Set(campaignPressPlacements.map((item) => item.sourceId)).size, 44);
  assert.equal(campaignPressNewArticleSourceIds.length, 41);

  for (const [campaign, expected] of Object.entries(expectedByCampaign)) {
    const placements = campaignPressPlacements.filter((item) => item.campaign === campaign);
    assert.equal(placements.length, expected);
  }

  for (const sourceId of new Set(campaignPressPlacements.map((item) => item.sourceId))) {
    assert.ok(knowledgeBank.sources.some((item) => item.id === sourceId), `${sourceId} must resolve`);
  }

  const corpusClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-CAMPAIGN-PRESS-CORPUS"
  );
  assert.equal(corpusClaim.maturity, "corroborated");
  assert.equal(corpusClaim.projections.length, 0);

  const fairRentIndex = knowledgeBank.sources.find(
    (item) => item.id === "SRC-FAIRRENTNYC-PRESS-INDEX-2021"
  );
  assert.equal(fairRentIndex.preservationStatus, "archived");
  assert.match(fairRentIndex.archiveUrl, /web\.archive\.org/);

  const queuedArticles = knowledgeBank.sourceReadings.filter((item) =>
    campaignPressNewArticleSourceIds.includes(item.sourceId)
  );
  assert.equal(queuedArticles.length, 41);
  assert.ok(queuedArticles.every((item) => item.status === "queued"));
  assert.ok(queuedArticles.every((item) => item.researchTaskIds.length > 0));
});

test("judge evidence and floors are enforced", () => {
  const assessment = {
    suiteId: suite.id,
    suiteVersion: suite.version,
    repositorySnapshot: currentRepositorySnapshot(),
    judge: { scores: suite.judgeCriteria.map((item) => ({ criterionId: item.id, score: 4, evidence: validEvidence.slice(0, item.minimumEvidence) })) },
    humanGates: suite.humanGates.map((item) => ({ gateId: item.id, status: "pending" }))
  };
  const passing = scoreAssessment(assessment, suite);
  assert.equal(passing.valid, true);
  assert.equal(passing.weightedJudgeScore, 100);
  assessment.judge.scores.find((item) => item.criterionId === "loss-resistance").score = 3;
  const failing = scoreAssessment(assessment, suite);
  assert.deepEqual(failing.judgeFloorFailures, ["loss-resistance"]);
});

test("judge evidence must be distinct", () => {
  const assessment = {
    suiteId: suite.id,
    suiteVersion: suite.version,
    repositorySnapshot: currentRepositorySnapshot(),
    judge: { scores: suite.judgeCriteria.map((item) => ({ criterionId: item.id, score: 4, evidence: Array(item.minimumEvidence).fill({ file: "same.ts", record: "same" }) })) },
    humanGates: []
  };
  assert.equal(scoreAssessment(assessment, suite).valid, false);
});

test("judge evidence must resolve to repository records", () => {
  const assessment = {
    suiteId: suite.id,
    suiteVersion: suite.version,
    repositorySnapshot: currentRepositorySnapshot(),
    judge: { scores: suite.judgeCriteria.map((item) => ({ criterionId: item.id, score: 4, evidence: validEvidence.slice(0, item.minimumEvidence) })) },
    humanGates: []
  };
  assessment.judge.scores[0].evidence[0] = { file: "missing.ts", record: "invented" };
  assert.equal(scoreAssessment(assessment, suite).valid, false);
});

test("judge assessment is bound to the current knowledge-bank snapshot", () => {
  const assessment = {
    suiteId: suite.id,
    suiteVersion: suite.version,
    repositorySnapshot: currentRepositorySnapshot(),
    judge: { scores: suite.judgeCriteria.map((item) => ({ criterionId: item.id, score: 4, evidence: validEvidence.slice(0, item.minimumEvidence) })) },
    humanGates: []
  };
  assessment.repositorySnapshot.counts.intake -= 1;

  const result = scoreAssessment(assessment, suite);
  assert.equal(result.valid, false);
  assert.ok(result.failures.includes("Assessment repository snapshot is missing or stale"));
});
