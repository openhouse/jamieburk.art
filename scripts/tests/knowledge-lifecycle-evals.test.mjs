import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressNewArticleSourceIds,
  campaignPressPlacements
} from "../../apps/www/src/data/knowledge-bank/campaign-press-2026-07-13.ts";
import { projectTwitterAccountInventory } from "../../apps/www/src/data/knowledge-bank/social-account-archive-production-2026-07-14.ts";
import { callNycSocialCensus } from "../../apps/www/src/data/knowledge-bank/callnyc-social-census-2026-07-14.ts";
import { wowListSocialCensus } from "../../apps/www/src/data/knowledge-bank/wowlist-social-census-2026-07-14.ts";
import { kcTownHallSocialCensus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-census-2026-07-14.ts";
import { nycArtCSocialCensus } from "../../apps/www/src/data/knowledge-bank/nycartc-social-census-2026-07-14.ts";
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

test("public-ready Chad-lens action requires proposition-level role support", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-NYCARTC-SOCIAL-IDENTITY-CONTINUITY"
  );
  claim.evidence = claim.evidence.filter(
    (item) => item.sourceId !== "SRC-BEDFORD-DIY-SPACES-2017"
  );

  const report = evaluateLifecycle({ suite, bank });
  const promotion = report.results.find(
    (item) => item.id === "claim-promotion-is-evidence-backed"
  );
  assert.equal(promotion.passed, false);
  assert.ok(promotion.evidence.some((item) => /Chad-lens action/i.test(item.reason)));
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

test("Google Drive archive production remains protected, bounded, and deferred", () => {
  const sourceIds = [
    "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    "SRC-GDRIVE-196-ACCEPTANCE-2023",
    "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
    "SRC-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023",
    "SRC-GDRIVE-CRS-VERSION-HISTORY-2026",
    "SRC-GDRIVE-COMMERCIAL-VACANCY-PILOT-2026",
    "SRC-GDRIVE-VACANCY-CORPUS-2026",
    "SRC-GDRIVE-SUNDAY-DINNER-RECORDINGS-2023",
    "SRC-GDRIVE-WOWLIST-MEMBER-MEETING-2015"
  ];
  const closeReadSourceIds = new Set(sourceIds.slice(0, 7));
  const claimIds = [
    "CLM-GDRIVE-COLLABORATIVE-HANDOFF-PRACTICE-2023-2026",
    "CLM-196-PARTICIPANT-ONBOARDING-2023",
    "CLM-FAIR-RENT-WEB-RELAUNCH-SYSTEM-2023",
    "CLM-COMMERCIAL-VACANCY-PUBLIC-DATA-PILOT-2026"
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
    assert.equal(reading.status, closeReadSourceIds.has(sourceId) ? "closely-read" : "queued");
  }

  for (const claimId of claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claimId);
    assert.equal(claim.maturity, "public-ready");
    assert.equal(claim.projections.length, 0);
    assert.ok(claim.composition);
    assert.ok(claim.requiredSupportTags.length > 0);
    assert.ok(claim.antiClaims.length > 0);
    assert.equal(decision.decision, "defer");
  }

  const publicRecord = JSON.stringify({
    sources: sourceIds.map((id) => knowledgeBank.sources.find((item) => item.id === id)),
    claims: claimIds.map((id) => knowledgeBank.claims.find((item) => item.id === id))
  });
  assert.doesNotMatch(publicRecord, /drive\.google\.com|docs\.google\.com|@gmail\.com|@ohai\.us|\/Users\//i);

  const queuedTaskIds = [
    "TASK-GDRIVE-SUNDAY-DINNER-RECORDINGS",
    "TASK-GDRIVE-WOWLIST-MEMBER-MEETING",
    "TASK-GDRIVE-NYCARTC-PHOTOSET"
  ];
  for (const taskId of queuedTaskIds) {
    const task = knowledgeBank.researchTasks.find((item) => item.id === taskId);
    assert.equal(task.status, "open");
    assert.ok(task.nextActions.length > 0);
  }

  const crsClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CRS-SHARED-OPERATING-MEMORY-2026"
  );
  assert.ok(crsClaim.intakeIds.includes("INTAKE-GDRIVE-CRS-VERSION-HISTORY-2026"));
  assert.ok(crsClaim.requiredSupportTags.includes("crs-running-minutes-collaborative-version-history"));
});

test("Google Drive mature claims cannot lose semantic support", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-FAIR-RENT-WEB-RELAUNCH-SYSTEM-2023"
  );
  const templateEvidence = claim.evidence.find(
    (item) => item.sourceId === "SRC-GDRIVE-FAIR-RENT-WEBSITE-TEMPLATE-2023"
  );
  templateEvidence.propositionIds = templateEvidence.propositionIds.filter(
    (id) => id !== "PROP-GDRIVE-FAIR-RENT-REUSE-CONSTRAINTS"
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

test("social archive inventories the confirmed project handles with bounded denominators", () => {
  assert.deepEqual(
    projectTwitterAccountInventory.accounts.map((item) => item.handle),
    ["@CallNYCapp", "@NYCArtC", "@wowlist", "@KCTownHall", "@KCSpacesFund"]
  );
  assert.deepEqual(
    projectTwitterAccountInventory.sharedCampaignHandle.campaigns,
    ["Let NYC Dance", "Talks Not Raids", "Save NYC Spaces", "FairRentNYC"]
  );
  assert.ok(projectTwitterAccountInventory.limits.some((item) => /incomplete denominators/i.test(item)));
  assert.ok(projectTwitterAccountInventory.limits.some((item) => /multiple authors/i.test(item)));
});

test("CallNYC Council engagement is promoted only as a recovered minimum", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CALLNYC-COUNCIL-ENGAGEMENT-SEED"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT"
  );
  const councilSourceIds = claim.evidence
    .map((item) => item.sourceId)
    .filter((id) => /^SRC-X-CALLNYC-(?:CHIN|WILLS|MATTEO|KOO|EUGENE|ROSENTHAL|MENDEZ|RODRIGUEZ)-/.test(id));

  assert.equal(claim.maturity, "public-ready");
  assert.equal(councilSourceIds.length, 8);
  assert.match(claim.internalClaim, /at least eight then-serving/i);
  assert.ok(claim.antiClaims.some((item) => /adoption/i.test(item)));
  assert.ok(claim.boundaries.some((item) => /Carlina Rivera/i.test(item)));
  assert.equal(task.status, "resolved");
  assert.match(task.resolutionSummary, /recovered minimum/i);
  assert.match(task.resolutionSummary, /does not imply adoption or endorsement/i);
});

test("CallNYC census gives every observed profile-count slot a public-safe disposition", () => {
  const ledger = JSON.parse(readFileSync("docs/knowledge-bank/data/callnyc-public-post-ledger.json", "utf8"));
  const recovered = ledger.items.filter((item) => item.status === "recovered-public-status");
  const unresolved = ledger.items.filter((item) => item.status === "unresolved-profile-count-slot");

  assert.equal(ledger.items.length, 110);
  assert.equal(recovered.length, 107);
  assert.equal(unresolved.length, 3);
  assert.equal(new Set(ledger.items.map((item) => item.dispositionId)).size, 110);
  assert.equal(new Set(recovered.map((item) => item.statusId)).size, 107);
  assert.ok(unresolved.every((item) => item.statusId === null && item.canonicalUrl === null));
  assert.ok(ledger.completenessStatement.includes("100% disposition coverage"));
  assert.ok(ledger.completenessStatement.includes("not an X data export"));
  assert.ok(ledger.items.every((item) => !("text" in item) && !("raw" in item)));
  assert.doesNotMatch(JSON.stringify(ledger), /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
});

test("CallNYC census aggregates reproduce the typed knowledge record", () => {
  const ledger = JSON.parse(readFileSync("docs/knowledge-bank/data/callnyc-public-post-ledger.json", "utf8"));
  const aggregate = ledger.aggregate;

  assert.equal(aggregate.observedProfileCount, callNycSocialCensus.observedProfileCount);
  assert.equal(aggregate.recoveredPublicStatuses, callNycSocialCensus.recoveredPublicStatuses);
  assert.equal(aggregate.unresolvedProfileCountSlots, callNycSocialCensus.unresolvedProfileCountSlots);
  assert.deepEqual(aggregate.relationshipCounts, { "account-post": 86, "account-reply": 6, repost: 15 });
  assert.equal(aggregate.accountAuthoredStatuses, 92);
  assert.equal(aggregate.accountAuthoredStatusesMentioningNyccouncil, 82);
  assert.equal(aggregate.issueRecognitionStatuses, 71);
  assert.equal(aggregate.councilMemberHandlesNamedInIssueRecognition, 26);
  assert.equal(aggregate.councilMemberHandlesIncluded.length, 26);
  assert.deepEqual(aggregate.nonMemberInstitutionalHandlesExcluded, ["@nyccouncil", "@nycha", "@nychousing"]);
  assert.equal(new Set(aggregate.councilMemberHandlesIncluded).size, 26);
  assert.equal(aggregate.uniqueIssueDestinations, 61);
  assert.equal(aggregate.topLevelIssueCategories, 16);
  assert.equal(aggregate.uniqueShortUrls, 84);
  assert.equal(aggregate.uniqueResolvedDestinations, 76);
  assert.equal(aggregate.uniqueCallNycDestinations, 63);
  assert.equal(aggregate.uniqueExternalDestinations, 13);
  assert.deepEqual(aggregate.issueRecognitionVisibleReactionTotals, {
    statusesWithVisibleReaction: 46,
    replies: 4,
    reposts: 66,
    likes: 86
  });
});

test("CallNYC full-population claims preserve Chad-lens agency and traction boundaries", () => {
  const loopClaim = knowledgeBank.claims.find((item) => item.id === "CLM-CALLNYC-SOCIAL-ISSUE-CONTACT-LOOP");
  const metricsClaim = knowledgeBank.claims.find((item) => item.id === "CLM-CALLNYC-CURRENT-VISIBLE-REACTION-PATTERN");
  const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === loopClaim.id);
  const roleProposition = knowledgeBank.sourceReadings
    .flatMap((item) => item.propositions)
    .find((item) => item.id === "PROP-CALLNYC-POLITICO-INDEPENDENT-FOLLOW-ON");

  assert.equal(loopClaim.maturity, "public-ready");
  assert.match(loopClaim.composition.action, /independently built/i);
  assert.equal(roleProposition.relationToJamie, "direct-role");
  assert.ok(loopClaim.antiClaims.some((item) => /71 recognition posts/i.test(item)));
  assert.equal(decision.decision, "defer");
  assert.equal(metricsClaim.maturity, "corroborated");
  assert.ok(metricsClaim.boundaries.some((item) => /July 2026/i.test(item)));
  assert.ok(metricsClaim.antiClaims.some((item) => /unique people/i.test(item)));
});

test("CallNYC School of Data recognition is independent and narrowly worded", () => {
  const claim = knowledgeBank.claims.find((item) => item.id === "CLM-CALLNYC-NYC-SCHOOL-OF-DATA-RECOGNITION");
  const source = knowledgeBank.sources.find((item) => item.id === "SRC-CALLNYC-NYC-SCHOOL-OF-DATA-RECAP-2016");
  const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claim.id);

  assert.equal(source.author, "Noel Hidalgo");
  assert.match(source.canonicalUrl, /schoolofdata\.nyc/);
  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.internalClaim, /featured hacks/i);
  assert.ok(claim.antiClaims.some((item) => /award/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /formally presented/i.test(item)));
  assert.equal(decision.decision, "defer");
});

test("CallNYC product announcements and unresolved slots remain research-routed", () => {
  const apiClaim = knowledgeBank.claims.find((item) => item.id === "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENTS");
  const apiTask = knowledgeBank.researchTasks.find((item) => item.id === "TASK-CALLNYC-API-AND-CONTACT-CONTROLS");
  const unresolvedTask = knowledgeBank.researchTasks.find((item) => item.id === "TASK-CALLNYC-UNRESOLVED-PROFILE-SLOTS");
  const rejectedOutcome = knowledgeBank.claims.find((item) => item.id === "CLM-CALLNYC-AGGREGATE-SERVICE-OUTCOME-REJECTED");

  assert.equal(apiClaim.maturity, "corroborated");
  assert.equal(apiClaim.projections.length, 0);
  assert.ok(apiClaim.boundaries.some((item) => /announcements/i.test(item)));
  assert.equal(apiTask.status, "open");
  assert.equal(unresolvedTask.status, "open");
  assert.equal(unresolvedTask.priority, "high");
  assert.ok(unresolvedTask.nextActions.some((item) => /native X account archive/i.test(item)));
  assert.equal(rejectedOutcome.maturity, "rejected");
  assert.match(rejectedOutcome.disposition.reason, /not an independently audited/i);
});

test("WOW List census recovers every item in the observed profile control", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/wowlist-public-post-ledger.json", "utf8")
  );
  const population = ledger.populationAudit;

  assert.equal(population.profileCountObserved, 38);
  assert.equal(population.postsTabItemsRecovered, 37);
  assert.equal(population.repliesTabItemsRecovered, 38);
  assert.equal(population.uniqueItemsRecovered, 38);
  assert.equal(population.unresolvedPopulationSlots, 0);
  assert.equal(population.dispositionTotal, 38);
  assert.deepEqual(
    {
      accountPosts: population.accountPostsRecovered,
      accountReplies: population.accountRepliesRecovered,
      reposts: population.repostsRecovered
    },
    wowListSocialCensus.relationshipCounts
  );
  assert.equal(new Set(ledger.records.map((item) => item.statusId)).size, 38);
  assert.ok(ledger.records.every((item) => /^[a-f0-9]{64}$/.test(item.contentDigestSha256)));
  assert.ok(ledger.records.every((item) => !("text" in item) && !("raw" in item)));
  assert.match(population.completenessStatement, /surviving July 2026 profile population/i);
  assert.match(population.completenessStatement, /not a platform export/i);
  assert.doesNotMatch(JSON.stringify(ledger), /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
});

test("WOW List census aggregates reproduce the typed lifecycle record", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/wowlist-public-post-ledger.json", "utf8")
  );
  const aggregate = ledger.aggregateFindings;

  assert.equal(ledger.populationAudit.profileCountObserved, wowListSocialCensus.observedProfileCount);
  assert.equal(ledger.populationAudit.uniqueItemsRecovered, wowListSocialCensus.recoveredPublicStatuses);
  assert.equal(aggregate.directProductSupportReplies, wowListSocialCensus.productSupportAndOnboardingReplies);
  assert.equal(aggregate.eventDistributionPosts, wowListSocialCensus.eventDistributionStatuses);
  assert.equal(aggregate.sceneKnowledgePosts, wowListSocialCensus.sceneKnowledgeStatuses);
  assert.equal(aggregate.productCommunityInfrastructurePosts, wowListSocialCensus.productCommunityInfrastructureStatuses);
  assert.equal(aggregate.civicCareAuthoredPosts, wowListSocialCensus.civicCareAccountStatuses);
  assert.equal(aggregate.civicCareReposts, wowListSocialCensus.civicCareReposts);
  assert.equal(aggregate.uniqueShortUrls, wowListSocialCensus.uniqueShortUrls);
  assert.equal(aggregate.uniqueResolvedDestinations, wowListSocialCensus.uniqueResolvedDestinations);
  assert.deepEqual(aggregate.accountAuthoredVisibleReactionSnapshot, {
    statuses: 22,
    statusesWithVisibleReaction: 12,
    replies: 2,
    reposts: 20,
    likes: 21
  });
});

test("WOW List support claim uses the complete six-reply record without assigning authorship", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT"
  );
  const censusReading = knowledgeBank.sourceReadings.find(
    (item) => item.id === "READ-X-WOWLIST-FULL-POPULATION-CENSUS-2026"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );

  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.internalClaim, /six account replies/i);
  assert.match(claim.composition.action, /worked with Richard/i);
  assert.match(claim.composition.usableResult, /multi-list event submission/i);
  assert.match(claim.composition.collectiveCredit, /shared account/i);
  assert.ok(claim.antiClaims.some((item) => /personally wrote all six/i.test(item)));
  assert.ok(
    censusReading.propositions.some(
      (item) => item.id === "PROP-X-WOWLIST-SIX-PUBLIC-SUPPORT-REPLIES"
    )
  );
  assert.equal(decision.decision, "defer");
});

test("WOW List network, source, and traction findings retain their boundaries", () => {
  const network = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-PUBLIC-NETWORK-PATTERN"
  );
  const metrics = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-CURRENT-VISIBLE-REACTION-SNAPSHOT"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-WOWLIST-FULL-POPULATION-CENSUS"
  );
  const contextSources = [
    "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    "SRC-GOOD-TIMES-ZINES-2-2015",
    "SRC-KQED-GHOST-SHIP-VIGIL-2016",
    "SRC-MEOW-WOLF-DIY-FUND-2016"
  ];

  assert.equal(network.maturity, "corroborated");
  assert.ok(network.antiClaims.some((item) => /endorsed/i.test(item)));
  assert.ok(network.antiClaims.some((item) => /adoption/i.test(item)));
  assert.equal(metrics.maturity, "corroborated");
  assert.ok(metrics.boundaries.some((item) => /July 2026/i.test(item)));
  assert.ok(metrics.antiClaims.some((item) => /unique people/i.test(item)));
  assert.ok(metrics.antiClaims.some((item) => /historical engagement/i.test(item)));
  for (const sourceId of contextSources) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    assert.ok(source.doesNotEstablish.some((item) => /coverage|organization|fund organizer/i.test(item)));
  }
  assert.equal(task.status, "resolved");
  assert.match(task.resolutionSummary, /all 38 items/i);
});

test("KC Town Hall census recovers every item in the observed profile control", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/kctownhall-public-post-ledger.json", "utf8")
  );

  assert.equal(ledger.population.displayedProfileCount, 183);
  assert.equal(ledger.population.postsRouteUnique, 170);
  assert.equal(ledger.population.repliesRouteArticles, 188);
  assert.equal(ledger.population.excludedConversationContextArticles, 5);
  assert.equal(ledger.population.attributableRecords, 183);
  assert.equal(ledger.population.unresolvedProfileCountSlots, 0);
  assert.deepEqual(
    ledger.population.relationshipCounts,
    kcTownHallSocialCensus.relationshipCounts
  );
  assert.equal(new Set(ledger.records.map((item) => item.statusId)).size, 183);
  assert.ok(
    ledger.records.every((item) => /^[a-f0-9]{64}$/.test(item.contentDigestSha256))
  );
  assert.ok(ledger.records.every((item) => !("text" in item) && !("raw" in item)));
  assert.match(ledger.population.completenessStatement, /surviving July 2026 profile population/i);
  assert.match(ledger.population.completenessStatement, /not a native X export/i);
  assert.doesNotMatch(
    JSON.stringify(ledger),
    /\/private\/|\/tmp\/|\/Users\/|Mobile Documents|phone|street address/i
  );
});

test("KC Town Hall census aggregates reproduce the typed lifecycle record", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/kctownhall-public-post-ledger.json", "utf8")
  );
  const aggregate = ledger.aggregateFindings;

  assert.equal(ledger.population.displayedProfileCount, kcTownHallSocialCensus.observedProfileCount);
  assert.equal(ledger.population.attributableRecords, kcTownHallSocialCensus.recoveredPublicStatuses);
  assert.equal(aggregate.tireWorkflow.classifiedRecords, kcTownHallSocialCensus.tireWorkflowStatuses);
  assert.equal(aggregate.tireWorkflow.hashtagBearingRecords, kcTownHallSocialCensus.tireHashtagBearingStatuses);
  assert.equal(aggregate.repostNetwork.distinctSourceAccounts, kcTownHallSocialCensus.distinctRepostSourceAccounts);
  assert.equal(aggregate.repostNetwork.cityCouncilFigureSourceStatuses, kcTownHallSocialCensus.councilFigureRepostSourceStatuses);
  assert.equal(aggregate.postedLinks.uniqueShortUrls, kcTownHallSocialCensus.uniqueShortUrls);
  assert.equal(aggregate.postedLinks.uniqueResolvedDestinations, kcTownHallSocialCensus.uniqueResolvedDestinations);
  assert.deepEqual(
    aggregate.accountAuthoredVisibleReactionSnapshot,
    kcTownHallSocialCensus.accountAuthoredVisibleReactionSnapshot
  );
  assert.match(aggregate.metricBoundary, /source statuses/i);
});

test("KC Town Hall operations claim uses collective role proof and keeps impact bounded", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTOWNHALL-SOCIAL-OPERATIONS-LOOP"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );
  const roleReading = knowledgeBank.sourceReadings.find(
    (item) => item.id === "READ-WAYBACK-KCTOWNHALL-HOME-2019"
  );

  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.composition.action, /Julia Fredenburg/i);
  assert.match(claim.composition.action, /Oak Park Neighborhood Association/i);
  assert.match(claim.composition.intendedEnd, /residents/i);
  assert.match(claim.composition.usableResult, /form and phone or text intake/i);
  assert.match(claim.composition.collectiveCredit, /collective|Julia/i);
  assert.match(claim.composition.causalBoundary, /not sole authorship|not sole/i);
  assert.ok(claim.boundaries.some((item) => /self-reports/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /audited/i.test(item)));
  assert.ok(
    roleReading.propositions.some(
      (item) =>
        item.id === "PROP-WAYBACK-KCTOWNHALL-JAMIE-JULIA-WORKFLOW" &&
        item.relationToJamie === "collective-role"
    )
  );
  assert.equal(decision.decision, "defer");
});

test("KC Town Hall stakeholder and traction findings retain attribution boundaries", () => {
  const engagement = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTOWNHALL-COUNCIL-AND-CITY-ENGAGEMENT"
  );
  const metrics = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTOWNHALL-CURRENT-VISIBLE-REACTION-SNAPSHOT"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-KCTOWNHALL-FULL-POPULATION-CENSUS"
  );
  const contextualSources = [
    "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
    "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
    "SRC-KSHB-LEONS-CLOSURE-2019"
  ];

  assert.equal(engagement.maturity, "public-ready");
  assert.match(engagement.internalClaim, /three then-serving City Council figures/i);
  assert.ok(engagement.boundaries.some((item) => /amplification/i.test(item)));
  assert.ok(engagement.antiClaims.some((item) => /endorsement/i.test(item)));
  assert.equal(metrics.status, "use-with-care");
  assert.ok(metrics.boundaries.some((item) => /July 2026/i.test(item)));
  assert.ok(metrics.antiClaims.some((item) => /unique people/i.test(item)));
  for (const sourceId of contextualSources) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    assert.ok(source.doesNotEstablish.some((item) => /coverage of KC Town Hall/i.test(item)));
  }
  assert.equal(task.status, "resolved");
  assert.match(task.resolutionSummary, /all 183 items/i);
});

test("NYC Artist Coalition census dispositions the full 5,124-slot profile control", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-public-post-ledger.json", "utf8")
  );
  const population = ledger.populationAudit;

  assert.equal(population.profileCountObserved, 5124);
  assert.equal(population.uniqueItemsRecovered, 3367);
  assert.equal(population.accountAuthoredStatusesRecovered, 715);
  assert.equal(population.repostsRecovered, 2652);
  assert.equal(population.unresolvedPopulationSlots, 1757);
  assert.equal(population.dispositionTotal, 5124);
  assert.equal(ledger.items.length, 5124);
  assert.equal(
    ledger.items.filter((item) => item.status === "recovered-public-status").length,
    3367
  );
  assert.equal(
    ledger.items.filter((item) => item.status === "unresolved-profile-count-slot").length,
    1757
  );
  assert.match(ledger.completenessStatement, /complete accounting, not complete item recovery/i);
  assert.match(ledger.completenessStatement, /not a platform export/i);
});

test("NYC Artist Coalition census is public-safe and leaves unresolved slots uninterpreted", () => {
  const ledgerText = readFileSync(
    "docs/knowledge-bank/data/nycartc-public-post-ledger.json",
    "utf8"
  );
  const ledger = JSON.parse(ledgerText);
  const recovered = ledger.items.filter(
    (item) => item.status === "recovered-public-status"
  );
  const unresolved = ledger.items.filter(
    (item) => item.status === "unresolved-profile-count-slot"
  );

  assert.equal(new Set(recovered.map((item) => item.statusId)).size, 3367);
  assert.ok(recovered.every((item) => /^[a-f0-9]{64}$/.test(item.contentDigestSha256)));
  assert.ok(recovered.every((item) => !("text" in item) && !("raw" in item)));
  assert.ok(
    unresolved.every(
      (item) =>
        item.statusId === null &&
        item.publishedAt === null &&
        item.relationship === null &&
        item.authorHandle === null &&
        item.primaryTheme === "unresolved"
    )
  );
  assert.doesNotMatch(
    ledgerText,
    /\/private\/|\/tmp\/|\/Users\/|Mobile Documents|authenticated-cookie|authorization:/i
  );
});

test("NYC Artist Coalition corpus aggregates reproduce the typed lifecycle summary", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-public-post-ledger.json", "utf8")
  );
  const aggregate = ledger.aggregateFindings;

  assert.equal(
    ledger.populationAudit.profileCountObserved,
    nycArtCSocialCensus.observedProfileCount
  );
  assert.equal(
    ledger.populationAudit.uniqueItemsRecovered,
    nycArtCSocialCensus.recoveredPublicStatuses
  );
  assert.deepEqual(aggregate.byRelationship, {
    "account-status": nycArtCSocialCensus.relationshipCounts.accountStatuses,
    repost: nycArtCSocialCensus.relationshipCounts.reposts
  });
  assert.equal(
    aggregate.campaignHashtagAuthoredStatusFloors["#FairRentNYC"],
    nycArtCSocialCensus.authoredCampaignHashtagFloors.fairRentNYC
  );
  assert.equal(
    aggregate.campaignHashtagAuthoredStatusFloors["#SaveNYCSpaces"],
    nycArtCSocialCensus.authoredCampaignHashtagFloors.saveNYCSpaces
  );
  assert.equal(
    aggregate.campaignHashtagAuthoredStatusFloors["#LetNYCDance"],
    nycArtCSocialCensus.authoredCampaignHashtagFloors.letNYCDance
  );
  assert.equal(
    aggregate.campaignHashtagAuthoredStatusFloors["#TalksNotRaids"],
    nycArtCSocialCensus.authoredCampaignHashtagFloors.talksNotRaids
  );
  assert.equal(aggregate.uniqueOutboundUrls, nycArtCSocialCensus.postedLinks.uniqueShortUrls);
  assert.equal(
    aggregate.uniqueResolvedDestinations,
    nycArtCSocialCensus.postedLinks.uniqueResolvedDestinations
  );
});

test("NYC Artist Coalition inbound ledger separates explicit mentions from context", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-public-engagement-ledger.json", "utf8")
  );
  const aggregate = ledger.aggregateFindings;

  assert.equal(ledger.records.length, 501);
  assert.equal(aggregate.renderedSearchRecords, 501);
  assert.equal(aggregate.explicitAccountMentionRecords, 347);
  assert.equal(aggregate.searchOrThreadContextRecords, 154);
  assert.equal(aggregate.distinctPublicAccounts, 107);
  assert.equal(aggregate.coalitionCivicAndCulturalPartnerFloor.recoveredInteractions, 205);
  assert.equal(aggregate.councilMemberAccountFloor.recoveredInteractions, 15);
  assert.equal(aggregate.cityAgencyAccountFloor.recoveredInteractions, 2);
  assert.equal(
    ledger.records.filter((item) => item.evidenceDisposition === "explicit-account-mention").length,
    347
  );
  assert.equal(
    ledger.records.filter((item) => item.evidenceDisposition === "search-or-thread-context").length,
    154
  );
  assert.ok(ledger.records.every((item) => !("text" in item) && !("raw" in item)));
});

test("NYC Artist Coalition full-corpus claims retain recovery, authorship, and traction boundaries", () => {
  const disposition = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-FULL-SOCIAL-POPULATION-DISPOSITION"
  );
  const amplification = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK"
  );
  const routing = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-POSTED-SOURCE-ROUTING"
  );
  const inbound = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-EXPLICIT-INBOUND-PATTERN"
  );
  const identity = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-SOCIAL-IDENTITY-CONTINUITY"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NYCARTC-FULL-POPULATION-DISPOSITION"
  );

  assert.equal(disposition.maturity, "corroborated");
  assert.ok(disposition.antiClaims.some((item) => /complete X export/i.test(item)));
  assert.ok(disposition.antiClaims.some((item) => /All 5,124 historical items were recovered/i.test(item)));
  assert.ok(disposition.antiClaims.some((item) => /representative of the unresolved slots/i.test(item)));
  assert.ok(disposition.boundaries.some((item) => /100 percent disposition/i.test(item)));
  assert.ok(amplification.antiClaims.some((item) => /Jamie authored|selected every repost/i.test(item)));
  assert.ok(amplification.antiClaims.some((item) => /endorse|partnership|impact/i.test(item)));
  assert.ok(routing.antiClaims.some((item) => /click|conversion|impact/i.test(item)));
  assert.ok(inbound.boundaries.some((item) => /154 search or thread-context/i.test(item)));
  assert.ok(inbound.antiClaims.some((item) => /endorsement|partnership|adoption/i.test(item)));
  assert.ok(
    identity.evidence.some(
      (item) => item.sourceId === "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026"
    )
  );
  assert.equal(task.status, "resolved");
  assert.match(task.resolutionSummary, /5,124 public-safe profile dispositions/i);
  for (const claim of [disposition, amplification, routing, inbound]) {
    const decision = knowledgeBank.projectionDecisions.find(
      (item) => item.claimId === claim.id
    );
    assert.equal(decision.decision, "defer");
  }
});

test("NYC Artist Coalition linked articles remain context rather than transferred credit", () => {
  const sourceIds = [
    "SRC-GOTHAMIST-BOOK-CULTURE-RENT-2020",
    "SRC-GOTHAMIST-50A-REPEAL-2020",
    "SRC-GOTHAMIST-EXCLUDED-WORKERS-FUND-2021"
  ];

  for (const sourceId of sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    const reading = knowledgeBank.sourceReadings.find((item) => item.sourceId === sourceId);
    assert.equal(source.visibility, "public");
    assert.equal(reading.status, "closely-read");
    assert.ok(source.doesNotEstablish.some((item) => /Jamie|coalition|NYC Artist Coalition/i.test(item)));
    assert.ok(reading.limitations.some((item) => /not coverage or endorsement/i.test(item)));
  }
});

test("NYC Artist Coalition social claims preserve shared authorship and campaign continuity", () => {
  const identityClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-SOCIAL-IDENTITY-CONTINUITY"
  );
  const councilClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT"
  );
  const establishmentClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-SOCIAL-ACCOUNT-ESTABLISHMENT-SEED"
  );
  const establishmentTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-SOCIAL-ACCOUNT-ESTABLISHMENT-AND-AUTHORSHIP"
  );

  assert.equal(identityClaim.maturity, "public-ready");
  assert.match(identityClaim.composition.collectiveCredit, /collective/i);
  assert.match(identityClaim.composition.collectiveCredit, /Olympia Kazi/i);
  assert.ok(identityClaim.antiClaims.some((item) => /every @NYCArtC post/i.test(item)));
  assert.equal(councilClaim.maturity, "public-ready");
  assert.match(councilClaim.internalClaim, /at least five then-serving/i);
  assert.equal(establishmentClaim.maturity, "researching");
  assert.equal(establishmentClaim.evidence.length, 0);
  assert.equal(establishmentTask.status, "in-progress");
});

test("operational social claims retain metric and role boundaries", () => {
  const kcSpaces = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"
  );
  const kcTownHall = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTOWNHALL-SOCIAL-OPERATIONS-LOOP"
  );
  const wowList = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT"
  );

  assert.match(kcSpaces.internalClaim, /at least 11/i);
  assert.ok(kcSpaces.antiClaims.some((item) => /grant decisions/i.test(item)));
  assert.ok(kcTownHall.boundaries.some((item) => /self-reports/i.test(item)));
  assert.ok(kcTownHall.antiClaims.some((item) => /audited/i.test(item)));
  assert.match(wowList.composition.collectiveCredit, /Richard and Jamie together/i);
});

test("social discovery routes later MARCH reporting without resolving causation", () => {
  const sourceIds = [
    "SRC-HELLGATE-NIGHTCLUB-RAIDS-2023",
    "SRC-HELLGATE-CURE-MARCH-2025"
  ];
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NYCARTC-MARCH-TRANSPARENCY-OUTCOME"
  );

  for (const sourceId of sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    const reading = knowledgeBank.sourceReadings.find((item) => item.sourceId === sourceId);
    assert.equal(source.visibility, "public");
    assert.equal(reading.status, "closely-read");
    assert.ok(reading.limitations.some((item) => /does not|not establish/i.test(item)));
    assert.ok(task.sourceIds.includes(sourceId));
  }
  assert.equal(task.status, "open");
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
