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
import { nycArtCFacebookEventCensus } from "../../apps/www/src/data/knowledge-bank/nycartc-facebook-events-2026-07-14.ts";
import { personalWowListFacebookEventCensus } from "../../apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events-2026-07-14.ts";
import { wowListFacebookPostCensus } from "../../apps/www/src/data/knowledge-bank/wowlist-facebook-posts-2026-07-14.ts";
import { nycArtCFacebookPostCensus } from "../../apps/www/src/data/knowledge-bank/nycartc-facebook-posts-2026-07-14.ts";
import { kcSpacesFundFacebookPostCensus } from "../../apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-2026-07-14.ts";
import { urbanHermitSocialCensus } from "../../apps/www/src/data/knowledge-bank/urbanhermit-social-census-2026-07-14.ts";
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

test("authenticated Teams deepening preserves the inventory and version-skew boundary", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-TEAMS-ICLOUD-WEB-INVENTORY-2026"
  );
  const reading = knowledgeBank.sourceReadings.find(
    (item) => item.sourceId === source.id
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-TEAMS-ICLOUD-VERSION-RECONCILIATION-2026"
  );

  assert.equal(source.visibility, "protected");
  assert.equal(source.preservationStatus, "private");
  assert.ok(source.protectedLocatorId);
  assert.equal(source.canonicalUrl, undefined);
  assert.equal(source.archiveUrl, undefined);
  assert.equal(source.assetUrl, undefined);
  assert.ok(reading.propositions.some((item) => /68 Teams items.*six Jamie Projects History items.*175 CRS items.*58 job-hunt items/i.test(item.text)));
  assert.ok(reading.limitations.some((item) => /newest cloud overview was inventoried but not close-read/i.test(item)));
  assert.equal(task.status, "open");
  assert.equal(task.priority, "high");
  assert.ok(task.nextActions.some((item) => /checksums/i.test(item)));
});

test("NTER CHNG preserves participatory behavior and every recovered collaborator credit", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION-2010"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );

  assert.equal(claim.maturity, "public-ready");
  assert.equal(claim.projections.length, 0);
  assert.match(claim.composition.action, /co-designed.*participatory texting installation/i);
  assert.match(claim.composition.usableResult, /participant text messages.*digital wall/i);
  assert.match(claim.composition.collectiveCredit, /Drew Bolton.*Garrett Fuselier.*Mary Nichols.*Megan Mantia.*Elisha Stetson/i);
  assert.ok(claim.antiClaims.some((item) => /alone created/i.test(item)));
  assert.equal(decision.decision, "defer");

  const publicSources = claim.evidence.map((item) =>
    knowledgeBank.sources.find((source) => source.id === item.sourceId)
  );
  assert.equal(publicSources.length, 2);
  assert.ok(publicSources.every((source) => source.visibility === "public"));
  assert.ok(publicSources.every((source) => source.canonicalUrl));
});

test("NTER CHNG exhibition inclusion uses the official program record without overstating venue", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"
  );
  const officialArtistSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011"
  );
  const nermanSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NERMAN-AMERICA-NOW-HERE-2011"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );

  assert.equal(claim.maturity, "public-ready");
  assert.equal(claim.projections.length, 0);
  assert.match(claim.internalClaim, /included NTER CHNG.*2011 Kansas City launch/i);
  assert.match(claim.composition.collectiveCredit, /Drew Bolton.*Jamie Burkart.*Garrett Fuselier.*Mary Nichols.*Megan Mantia.*Elisha Stetson/i);
  assert.ok(claim.antiClaims.some((item) => /NTER CHNG was presented at the Nerman Museum/i.test(item)));
  assert.equal(decision.decision, "defer");

  assert.equal(officialArtistSource.visibility, "public");
  assert.equal(officialArtistSource.preservationStatus, "archived");
  assert.match(officialArtistSource.archiveUrl, /americanowandhere\.org\/the-visual-artists/);
  assert.ok(officialArtistSource.supportsGenerally.some((item) => /inclusion.*artist roster/i.test(item)));
  assert.ok(nermanSource.doesNotEstablish.some((item) => /NTER CHNG.*Nerman Museum/i.test(item)));
  assert.doesNotMatch(JSON.stringify(officialArtistSource), /(?:816|501)-\d{3}-\d{4}/);

  assert.equal(task.status, "open");
  assert.ok(task.nextActions.some((item) => /checklist|catalog|program schedule/i.test(item)));
});

test("NTER CHNG working artifacts preserve implementation depth without exposing raw material", () => {
  const sourceIds = [
    "SRC-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
    "SRC-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011"
  ];
  const sources = sourceIds.map((id) =>
    knowledgeBank.sources.find((item) => item.id === id)
  );
  const planReading = knowledgeBank.sourceReadings.find(
    (item) => item.id === "READ-NTER-CHNG-ANH-INSTALLATION-PLAN-2011"
  );

  assert.ok(sources.every((source) => source.visibility === "protected"));
  assert.ok(sources.every((source) => source.preservationStatus === "private"));
  assert.ok(sources.every((source) => source.protectedLocatorId));
  assert.ok(sources.every((source) => source.canonicalUrl === undefined));
  assert.ok(sources.every((source) => source.archiveUrl === undefined));
  assert.ok(sources.every((source) => source.assetUrl === undefined));
  assert.doesNotMatch(JSON.stringify(sources), /docs\.google\.com|\b(?:816|501)-\d{3}-\d{4}\b/);
  assert.ok(planReading.propositions.some((item) => /software reliability.*server hosting.*wall fabrication.*takedown/i.test(item.text)));
  assert.ok(planReading.limitations.some((item) => /forward-looking plan.*not a completion report/i.test(item)));
});

test("NTER CHNG separates Jamie's public connection purpose from planned installation execution", () => {
  const purposeClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NTER-CHNG-JAMIE-CONNECTION-DESIGN-2011"
  );
  const operationsClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NTER-CHNG-ANH-INSTALLATION-OPERATIONS-2011"
  );
  const purposeDecision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === purposeClaim.id
  );
  const executionTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NTER-CHNG-ANH-INSTALLATION-EXECUTION-CREDIT"
  );

  assert.equal(purposeClaim.maturity, "public-ready");
  assert.equal(purposeDecision.decision, "defer");
  assert.match(purposeClaim.composition.intendedEnd, /connections outside their existing contact lists/i);
  assert.match(purposeClaim.composition.collectiveCredit, /Drew Bolton.*Jamie Burkart.*Garrett Fuselier/i);
  assert.ok(purposeClaim.antiClaims.some((item) => /measurably created new relationships/i.test(item)));
  assert.ok(purposeClaim.evidence.some((item) => item.sourceId === "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011" && item.relationship === "direct-support"));

  assert.equal(operationsClaim.maturity, "corroborated");
  assert.equal(operationsClaim.projections.length, 0);
  assert.ok(operationsClaim.boundaries.some((item) => /planned work distinct from independently verified completion/i.test(item)));
  assert.ok(operationsClaim.antiClaims.some((item) => /solely managed or implemented/i.test(item)));
  assert.equal(executionTask.status, "open");
  assert.ok(executionTask.nextActions.some((item) => /Drew Bolton and Garrett Fuselier/i.test(item)));
});

test("NYC Artist Coalition Wikipedia handoff separates drafting, editing, and publication", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-WIKIPEDIA-SOURCE-HANDOFF-2025"
  );
  const privateSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025"
  );
  const historySource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );

  assert.equal(privateSource.visibility, "protected");
  assert.equal(privateSource.canonicalUrl, undefined);
  assert.equal(historySource.visibility, "public");
  assert.match(historySource.canonicalUrl, /action=history/);
  assert.match(claim.composition.collectiveCredit, /Dorothy Howard.*expert editing.*publication handoff/i);
  assert.ok(claim.antiClaims.some((item) => /independently published/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /verified or endorsed every coalition claim/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /image right/i.test(item)));
  assert.equal(claim.projections.length, 0);
  assert.equal(decision.decision, "defer");
});

test("CRS power-map evidence cannot imply adoption or policy impact", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CRS-POWER-MAP-MESSAGING-GRID-2026"
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-TEAMS-CRS-POWER-MAP-2026"
  );

  assert.equal(source.visibility, "protected");
  assert.equal(source.canonicalUrl, undefined);
  assert.match(claim.composition.intendedEnd, /reviewable operational choices.*vulnerable participants/i);
  assert.ok(claim.boundaries.some((item) => /prepared or designed, not adopted/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /produced passage.*measured outcome/i.test(item)));
  assert.equal(claim.projections.length, 0);
});

test("job-hunt synthesis routes the HJE revenue corroboration gap", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026"
  );
  const reading = knowledgeBank.sourceReadings.find(
    (item) => item.sourceId === source.id
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-HJE-REVENUE-INDEPENDENT-CORROBORATION"
  );

  assert.equal(source.visibility, "protected");
  assert.ok(source.doesNotEstablish.some((item) => /independent verification/i.test(item)));
  assert.ok(reading.propositions.some((item) => /did not independently corroborate.*two-times revenue/i.test(item.text)));
  assert.equal(task.status, "open");
  assert.equal(task.priority, "high");
  assert.deepEqual(task.claimIds, ["CLM-HJE-REVENUE-GROWTH-CONTRIBUTION"]);
  assert.ok(task.nextActions.some((item) => /Jori Sackin.*authorized.*financial-record custodian/i.test(item)));
  assert.ok(task.nextActions.some((item) => /gross-versus-net.*returns treatment/i.test(item)));
  assert.ok(task.nextActions.some((item) => /between 1\.95 and 2\.05/i.test(item)));
  assert.ok(task.nextActions.some((item) => /dated written confirmation/i.test(item)));

  const revenueClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION"
  );
  const revenueDecision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === revenueClaim.id
  );
  assert.equal(revenueClaim.maturity, "corroborated");
  assert.equal(revenueClaim.projections.some((item) => item.status === "active"), false);
  assert.ok(revenueClaim.antiClaims.some((item) => /independently verified/i.test(item)));
  assert.equal(revenueDecision.decision, "defer");
});

test("KCUR replaces the HJE revenue number with independent company context", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-KCUR-HJE-ONLINE-SALES-2016"
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-HJE-ONLINE-SALES-SHARE-2016"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );

  assert.equal(source.visibility, "public");
  assert.match(source.canonicalUrl, /kcur\.org/);
  assert.ok(source.doesNotEstablish.some((item) => /Jamie's role/i.test(item)));
  assert.equal(claim.maturity, "projected");
  assert.match(claim.projections[0].text, /online sales accounted for half/i);
  assert.doesNotMatch(claim.projections[0].text, /Jamie|2x|doubled/i);
  assert.ok(claim.antiClaims.some((item) => /Jamie doubled/i.test(item)));
  assert.equal(decision.decision, "publish");
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

test("NYC Artist Coalition Facebook event census accounts for every control slot", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-facebook-event-ledger.json", "utf8")
  );
  const recovered = ledger.records.filter((item) =>
    ["detail-recovered", "detail-partial-description"].includes(item.recoveryStatus)
  );
  const unresolved = ledger.records.filter(
    (item) => item.recoveryStatus === "unresolved-control-slot"
  );

  assert.equal(ledger.records.length, 34);
  assert.equal(recovered.length, 33);
  assert.equal(unresolved.length, 1);
  assert.equal(new Set(recovered.map((item) => item.eventId)).size, 33);
  assert.ok(recovered.every((item) => item.sourceUrl === `https://www.facebook.com/events/${item.eventId}/`));
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(
        recovered.reduce((counts, item) => {
          const year = item.date.slice(0, 4);
          counts[year] = (counts[year] ?? 0) + 1;
          return counts;
        }, {})
      )
    ),
    { "2017": 17, "2018": 3, "2019": 6, "2020": 6, "2021": 1 }
  );
  assert.equal(unresolved[0].eventId, null);
  assert.equal(unresolved[0].date, null);
  assert.equal(unresolved[0].title, null);
  assert.equal(nycArtCFacebookEventCensus.dispositionTotal, 34);
  assert.match(nycArtCFacebookEventCensus.completenessStatement, /not complete item recovery/i);
});

test("personal and WOW List Facebook event controls account for their full populations", () => {
  const controls = JSON.parse(
    readFileSync("docs/knowledge-bank/data/personal-wowlist-facebook-event-controls.json", "utf8")
  );
  const hostedRows = readFileSync(
    "docs/knowledge-bank/data/jamie-facebook-hosted-event-census-2026-07-14.csv",
    "utf8"
  ).trim().split("\n").slice(1);

  assert.equal(controls.personalAssociationSurface.currentRecords, 502);
  assert.equal(
    controls.personalAssociationSurface.displayedHostAccounting.jamie
      + controls.personalAssociationSurface.displayedHostAccounting.anotherHost,
    502
  );
  assert.equal(controls.personalAssociationSurface.secondPassExactIdMatch, true);
  assert.equal(hostedRows.length, 21);
  assert.equal(hostedRows.filter((row) => row.includes(",recovered,")).length, 20);
  assert.equal(hostedRows.filter((row) => row.includes(",unresolved,")).length, 1);
  assert.equal(controls.wowlist.currentDisplayedRecords, 0);
  assert.equal(personalWowListFacebookEventCensus.personalAssociationSurface.currentRecords, 502);
  assert.equal(personalWowListFacebookEventCensus.jamieHostedControl.controlSlots, 21);
  assert.equal(personalWowListFacebookEventCensus.wowListControl.currentDisplayedRecords, 0);
  assert.match(personalWowListFacebookEventCensus.completenessStatement, /not native Meta exports/i);
});

test("personal Facebook event evidence stays aggregate-safe and semantically bounded", () => {
  const controlsText = readFileSync(
    "docs/knowledge-bank/data/personal-wowlist-facebook-event-controls.json",
    "utf8"
  );
  const association = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026"
  );
  const population = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026"
  );

  assert.doesNotMatch(controlsText, /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
  assert.ok(association.boundaries.some((item) => /Association does not establish attendance/i.test(item)));
  assert.ok(association.antiClaims.some((item) => /attended or produced all 502/i.test(item)));
  assert.ok(population.boundaries.some((item) => /does not mean every historical event page/i.test(item)));
  assert.ok(population.antiClaims.some((item) => /All 21 event pages were recovered/i.test(item)));
});

test("Facebook event readings separate host attribution from event context", () => {
  const readings = knowledgeBank.sourceReadings.filter((item) =>
    item.sourceId.startsWith("SRC-JAMIE-FACEBOOK-EVENT-")
      && !item.sourceId.includes("ASSOCIATION")
  );

  for (const reading of readings) {
    for (const proposition of reading.propositions) {
      if (proposition.relationToJamie === "direct-role") {
        assert.match(proposition.text, /host|display/i);
        assert.doesNotMatch(proposition.text, / and (documents|routes|invites)/i);
      }
    }
  }
  const practiceReading = knowledgeBank.sourceReadings.find(
    (item) => item.id === "READ-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026"
  );
  assert.equal(
    practiceReading.propositions.find(
      (item) => item.id === "PROP-JAMIE-FACEBOOK-HOSTED-EVENT-ATTRIBUTION"
    ).relationToJamie,
    "direct-role"
  );
  assert.equal(
    practiceReading.propositions.find(
      (item) => item.id === "PROP-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE"
    ).relationToJamie,
    "project-context"
  );
});

test("public-safety scanners include CSV knowledge-bank artifacts", () => {
  const publicSafetyScript = readFileSync("scripts/check-public-safety.mjs", "utf8");
  const lifecycleScript = readFileSync("scripts/evals/lib/knowledge-lifecycle.mjs", "utf8");

  assert.match(publicSafetyScript, /textExtensions[\s\S]*"\.csv"/);
  assert.match(lifecycleScript, /repositoryBoundaryTextExtensions[\s\S]*"\.csv"/);
});

test("hosted-event throughline keeps Chad's lens, collective credit, and a defer decision", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"
  );
  const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claim.id);
  const sourceIds = [
    "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
    "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
    "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017"
  ];

  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.composition.action, /Hosted public events/i);
  assert.match(claim.composition.intendedEnd, /Help people encounter one another/i);
  assert.match(claim.composition.usableResult, /recurring event-making practice/i);
  assert.match(claim.composition.collectiveCredit, /performers.*venues.*collaborators.*hosts.*participants/i);
  assert.match(claim.composition.causalBoundary, /not sole production/i);
  for (const sourceId of sourceIds) assert.ok(claim.evidence.some((item) => item.sourceId === sourceId));
  assert.ok(claim.antiClaims.some((item) => /Jamie alone produced/i.test(item)));
  assert.equal(claim.projections.length, 0);
  assert.equal(decision.decision, "defer");
});

test("WOW List Facebook non-recovery cannot become a nonexistence claim", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-WOWLIST-FACEBOOK-HISTORICAL-EVENT-RECOVERY"
  );

  assert.match(claim.internalClaim, /displayed zero event records/i);
  assert.ok(claim.boundaries.some((item) => /Not recovered does not mean did not exist/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /never had a Facebook event/i.test(item)));
  assert.equal(task.status, "open");
  assert.ok(task.nextActions.some((item) => /native WOW List Page export/i.test(item)));
});

test("WOW List Facebook post census dispositions reproduce the two-pass control", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/wowlist-facebook-post-ledger.json", "utf8")
  );

  assert.deepEqual(
    ledger.population.renderedRecordsPerPass,
    wowListFacebookPostCensus.traversal.renderedRecordsPerPass
  );
  assert.deepEqual(
    ledger.population.renderedRecordsWithJamiePublisherAttributionPerPass,
    wowListFacebookPostCensus.traversal.renderedRecordsWithJamiePublisherAttributionPerPass
  );
  assert.equal(ledger.records.length, 53);
  assert.equal(new Set(ledger.records.map((item) => item.id)).size, 53);
  assert.equal(new Set(ledger.records.map((item) => item.timelineSlot)).size, 53);
  assert.ok(!ledger.records.some((item) => item.timelineSlot === 34));
  assert.equal(ledger.duplicateDisposition.timelineSlot, undefined);
  assert.equal(ledger.duplicateDisposition.renderedTimelineSlot, 34);
  assert.equal(ledger.duplicateDisposition.duplicateOf, "FB-WOWLIST-033");

  const computedThemes = Object.fromEntries(
    Object.keys(ledger.primaryThemeCounts).map((theme) => [
      theme,
      ledger.records.filter((item) => item.primaryTheme === theme).length
    ])
  );
  assert.deepEqual(computedThemes, ledger.primaryThemeCounts);
  assert.deepEqual(ledger.primaryThemeCounts, {
    "product-onboarding-and-community-governance": wowListFacebookPostCensus.primaryThemeCounts.productOnboardingAndCommunityGovernance,
    "event-and-participant-amplification": wowListFacebookPostCensus.primaryThemeCounts.eventAndParticipantAmplification,
    "cultural-space-care-and-safety": wowListFacebookPostCensus.primaryThemeCounts.culturalSpaceCareAndSafety,
    "civic-mobilization-and-public-care": wowListFacebookPostCensus.primaryThemeCounts.civicMobilizationAndPublicCare,
    "adjacent-cultural-knowledge-and-opportunity": wowListFacebookPostCensus.primaryThemeCounts.adjacentCulturalKnowledgeAndOpportunity
  });
  assert.equal(
    ledger.destinationInventory.canonicalDestinations.length,
    wowListFacebookPostCensus.destinationInventory.uniqueCanonicalDestinations
  );
});

test("WOW List Facebook publisher claim is strong, collective, and bounded", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );
  const censusEvidence = claim.evidence.find(
    (item) => item.sourceId === "SRC-FACEBOOK-WOWLIST-POST-CENSUS-RUN-2026"
  );

  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.internalClaim, /all 54 rendered records representing 53 distinct posts/i);
  assert.match(claim.composition.action, /operated WOW List's Facebook Page publishing surface/i);
  assert.match(claim.composition.intendedEnd, /show up for one another in physical places/i);
  assert.match(claim.composition.collectiveCredit, /Jamie and Richard's project/i);
  assert.match(claim.composition.collectiveCredit, /members.*organizers.*artists.*venues/i);
  assert.match(claim.composition.causalBoundary, /not sole lifetime administration/i);
  assert.equal(censusEvidence.relationship, "private-support");
  assert.ok(claim.antiClaims.some((item) => /sole lifetime administrator/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /every sentence.*quotation.*image.*event.*linked source/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /adoption or impact/i.test(item)));
  assert.equal(claim.projections.length, 0);
  assert.equal(decision.decision, "defer");
});

test("WOW List Facebook mission, source, and traction patterns retain credit limits", () => {
  const claimIds = [
    "CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION",
    "CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE",
    "CLM-WOWLIST-FACEBOOK-STAKEHOLDER-PARTICIPATION",
    "CLM-WOWLIST-FACEBOOK-DESTINATION-NETWORK"
  ];
  const missionSources = [
    "SRC-FACEBOOK-WOWLIST-COMMUNITY-PHILOSOPHY-2016",
    "SRC-FACEBOOK-WOWLIST-WOMENS-MARCH-2017",
    "SRC-FACEBOOK-WOWLIST-LET-NYC-DANCE-2017",
    "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
    "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016"
  ];
  const resolvedTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-WOWLIST-FACEBOOK-POST-CENSUS"
  );
  const openTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-WOWLIST-FACEBOOK-NATIVE-EXPORT-AND-ROLE-CORROBORATION"
  );

  for (const claimId of claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claimId);
    assert.equal(claim.projections.length, 0);
    assert.equal(decision.decision, "defer");
  }
  for (const sourceId of missionSources) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    const reading = knowledgeBank.sourceReadings.find((item) => item.sourceId === sourceId);
    assert.ok(source);
    assert.equal(reading.status, "closely-read");
    assert.ok(source.doesNotEstablish.some((item) => /adoption|impact|organization|coverage|authorship|stakeholder/i.test(item)));
  }
  const stakeholderClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-FACEBOOK-STAKEHOLDER-PARTICIPATION"
  );
  assert.ok(stakeholderClaim.boundaries.some((item) => /not a complete user census/i.test(item)));
  assert.ok(stakeholderClaim.antiClaims.some((item) => /national adoption/i.test(item)));
  assert.equal(resolvedTask.status, "resolved");
  assert.match(resolvedTask.resolutionSummary, /53 distinct surviving posts/i);
  assert.equal(openTask.status, "open");
  assert.ok(openTask.nextActions.some((item) => /native Meta Page export/i.test(item)));
});

test("NYC Artist Coalition event census preserves rotating-meeting and stakeholder boundaries", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-facebook-event-ledger.json", "utf8")
  );
  const meetings = ledger.records.filter((item) => item.isRecurringMeeting);
  const physicalVenues = new Set(
    meetings.filter((item) => item.venueOrMode !== "Virtual").map((item) => item.venueOrMode)
  );

  assert.equal(meetings.length, 12);
  assert.equal(physicalVenues.size, 10);
  assert.equal(meetings.filter((item) => item.venueOrMode === "Virtual").length, 2);
  assert.deepEqual(ledger.accounting.hostBylines, {
    coalitionOnly: 17,
    sharedOrAssociated: 16,
    boundary: "Visible public host bylines document shared event identity, not each organization's division of labor, formal partnership terms, or individual page authorship."
  });
  assert.deepEqual(ledger.accounting.pageRelationships, {
    directCardHost: 24,
    cohostedOrAssociated: 9
  });
});

test("NYC Artist Coalition event response displays remain bounded platform signals", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-facebook-event-ledger.json", "utf8")
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-FACEBOOK-RESPONSE-SIGNALS"
  );

  assert.deepEqual(ledger.accounting.responseSignals, {
    displayed: 32,
    missing: 1,
    minimum: 9,
    maximum: 1700,
    atLeast100: 19,
    atLeast400: 9,
    atLeast1000: 3,
    boundary: "Facebook response displays are mutable event-level platform signals, not unique people, attendance, participation, reach, endorsement, or impact. They must not be summed."
  });
  assert.ok(claim.boundaries.some((item) => /Do not sum/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /physical attendance/i.test(item)));
  assert.ok(claim.evidence.some((item) => item.sourceId === "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017"));
});

test("NYC Artist Coalition event link ledger routes every recovered destination safely", () => {
  const ledgerText = readFileSync(
    "docs/knowledge-bank/data/nycartc-facebook-event-link-ledger.json",
    "utf8"
  );
  const ledger = JSON.parse(ledgerText);
  const protectedRows = ledger.rows.filter((item) => item.disposition === "protected");

  assert.equal(ledger.rows.length, 38);
  assert.deepEqual(ledger.accounting, {
    linkOccurrences: 61,
    normalizedUrlRows: 38,
    eventsWithOutboundLinks: 25,
    sourceArticles: 7,
    protectedRows: 1,
    researchNeededRows: 4
  });
  assert.equal(protectedRows.length, 1);
  assert.equal(protectedRows[0].publicUrl, null);
  assert.match(ledger.interpretationBoundary, /not automatic corroboration/i);
  assert.doesNotMatch(ledgerText, /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
});

test("NYC Artist Coalition participation system is public-ready, collective, and deferred", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-PARTICIPATION-SYSTEM"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );

  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.composition.action, /Helped establish and produce/i);
  assert.match(claim.composition.intendedEnd, /Listen deeply/i);
  assert.match(claim.composition.collectiveCredit, /venue hosts.*cohosts.*participants/i);
  assert.match(claim.composition.causalBoundary, /not an uninterrupted monthly schedule/i);
  assert.ok(claim.antiClaims.some((item) => /Jamie alone organized/i.test(item)));
  assert.ok(claim.evidence.some((item) => item.sourceId === "SRC-NYCARTC-GOTHAMIST-CABARET-2017"));
  assert.ok(claim.evidence.some((item) => item.sourceId === "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017"));
  assert.equal(claim.projections.length, 0);
  assert.equal(decision.decision, "defer");
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

  assert.match(kcSpaces.internalClaim, /complete surviving observed Facebook Page surface/i);
  assert.ok(
    kcSpaces.evidence.some(
      (item) =>
        item.sourceId === "SRC-X-REVIEW-KCSPACES-2026" &&
        item.supports.some((support) => /at least 11/i.test(support))
    )
  );
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

test("personal social census dispositions the full current-profile control", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/urbanhermit-public-post-ledger.json", "utf8")
  );
  const audit = ledger.populationAudit;

  assert.equal(ledger.items.length, 434);
  assert.equal(new Set(ledger.items.map((item) => item.ledgerId)).size, 434);
  assert.equal(audit.profileCountObserved, urbanHermitSocialCensus.observedProfileCount);
  assert.equal(audit.currentProfileRecordsDispositioned, 434);
  assert.equal(audit.directlyReverifiedRecords, 431);
  assert.equal(audit.priorAuthenticatedCaptureOnlyRecords, 3);
  assert.equal(
    ledger.items.filter((item) => item.verificationStatus === "live-reverified-2026-07-14").length,
    431
  );
  assert.equal(
    ledger.items.filter(
      (item) => item.verificationStatus === "prior-authenticated-capture-currently-unavailable"
    ).length,
    3
  );
  assert.deepEqual(audit, {
    ...audit,
    authoredStandalonePosts: 338,
    authoredReplies: 15,
    reposts: 81
  });
  assert.match(audit.completenessStatement, /100% current-profile disposition coverage/i);
  assert.match(audit.completenessStatement, /not a native X export/i);
});

test("personal social population ledger is aggregate-only and public-safe", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/urbanhermit-public-post-ledger.json", "utf8")
  );
  const forbiddenFields = [
    "text",
    "raw",
    "statusId",
    "statusUrl",
    "authorHandle",
    "datetime",
    "canonicalUrl",
    "metricsLabel"
  ];

  for (const item of ledger.items) {
    for (const field of forbiddenFields) assert.equal(field in item, false, `${field} must remain protected`);
    assert.equal(item.publicDetailStatus, "aggregate-only");
  }
  assert.doesNotMatch(JSON.stringify(ledger), /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
});

test("personal explicit-mention ledger preserves stakeholder and interpretation boundaries", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/urbanhermit-public-engagement-ledger.json", "utf8")
  );

  assert.equal(ledger.records.length, 26);
  assert.equal(ledger.searchAudit.distinctPublicAccounts, 17);
  assert.equal(ledger.searchAudit.governmentOrPublicOfficialAccountsRecovered, 0);
  assert.deepEqual(ledger.aggregateFindings.byStakeholderGroup, {
    "community-peer-or-personal-context": 7,
    "professional-institution": 1,
    "cultural-or-technical-collaborator": 7,
    "journalist-designer-or-civic-peer": 5,
    "project-account": 6
  });
  assert.deepEqual(ledger.aggregateFindings.byInteractionContext, {
    "general-public-conversation": 8,
    "role-or-project-attribution": 11,
    "mission-related-thread": 7
  });
  assert.ok(ledger.records.every((item) => !("text" in item) && !("statusId" in item)));
  assert.ok(ledger.records.every((item) => !("authorHandle" in item) && !("statusUrl" in item)));
  assert.doesNotMatch(JSON.stringify(ledger), /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
});

test("personal social claims preserve authorship, traction, and official-engagement limits", () => {
  const disposition = knowledgeBank.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-FULL-POPULATION-DISPOSITION"
  );
  const practice = knowledgeBank.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-PRACTICE-CONTINUITY"
  );
  const inbound = knowledgeBank.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-EXPLICIT-INBOUND-PATTERN"
  );

  assert.ok(disposition.boundaries.some((item) => /current profile control, not a lifetime/i.test(item)));
  assert.ok(disposition.antiClaims.some((item) => /Jamie authored all 434/i.test(item)));
  assert.ok(practice.antiClaims.some((item) => /frequency measures.*labor.*impact/i.test(item)));
  assert.ok(inbound.boundaries.some((item) => /not proof of no public-official interaction/i.test(item)));
  assert.ok(inbound.antiClaims.some((item) => /endorsement.*partnership.*adoption.*impact/i.test(item)));
});

test("Horse Lords and Music Hackathon records preserve collective credit", () => {
  const horseLords = knowledgeBank.claims.find(
    (item) => item.id === "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016"
  );
  const musicHackathon = knowledgeBank.claims.find(
    (item) => item.id === "CLM-MUSIC-HACKATHON-WOWLIST-PUBLIC-CREDIT"
  );
  const npr = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NPR-HORSE-LORDS-TRUTHERS-2016"
  );

  assert.equal(horseLords.maturity, "public-ready");
  assert.match(horseLords.composition.collectiveCredit, /Jamie Burkart and M\.C\. Schmidt together/i);
  assert.ok(horseLords.antiClaims.some((item) => /alone made/i.test(item)));
  assert.ok(horseLords.antiClaims.some((item) => /NPR commissioned/i.test(item)));
  assert.match(npr.canonicalUrl, /npr\.org/);
  assert.match(musicHackathon.composition.action, /Co-organized Music Hackathon/i);
  assert.match(musicHackathon.composition.collectiveCredit, /Richard Kim/i);
  assert.ok(musicHackathon.antiClaims.some((item) => /alone made or owned WOW List/i.test(item)));
});

test("personal social findings remain deferred from public composition", () => {
  const claimIds = [
    "CLM-URBANHERMIT-FULL-POPULATION-DISPOSITION",
    "CLM-URBANHERMIT-POSTED-SOURCE-ROUTING",
    "CLM-URBANHERMIT-EXPLICIT-INBOUND-PATTERN",
    "CLM-URBANHERMIT-PRACTICE-CONTINUITY",
    "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
    "CLM-MUSIC-HACKATHON-WOWLIST-PUBLIC-CREDIT"
  ];

  for (const claimId of claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claimId);
    assert.equal(claim.projections.length, 0);
    assert.equal(decision.decision, "defer");
  }
});

test("unreviewed personal media remains a captured claim seed with a research route", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-URBANHERMIT-UNREVIEWED-MEDIA-LEAD"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-URBANHERMIT-EXPORT-AND-PRESERVATION"
  );

  assert.equal(claim.status, "claim-seed");
  assert.equal(claim.maturity, "captured");
  assert.equal(claim.projections.length, 0);
  assert.equal(claim.evidence.length, 0);
  assert.ok(claim.boundaries.some((item) => /raw media.*outside the public repository/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /cleared for publication/i.test(item)));
  assert.equal(task.status, "open");
  assert.ok(task.claimIds.includes(claim.id));
});

test("NYC Artist Coalition Facebook post ledger dispositions the complete surviving control", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-facebook-post-ledger.json", "utf8")
  );

  assert.equal(ledger.records.length, 441);
  assert.equal(new Set(ledger.records.map((item) => item.recordId)).size, 441);
  assert.equal(ledger.population.distinctSurvivingPosts, 441);
  assert.equal(ledger.population.terminalScrollsWithoutAddition, 40);
  assert.equal(ledger.population.pageActionControlsObserved, 441);
  assert.equal(ledger.population.humanPublisherAttribution, "not-exposed");
  assert.equal(nycArtCFacebookPostCensus.traversal.distinctSurvivingPosts, 441);
  assert.equal(
    Object.values(ledger.forms).reduce((sum, count) => sum + count, 0),
    441
  );
  assert.equal(
    Object.values(ledger.primaryThemes).reduce((sum, count) => sum + count, 0),
    441
  );
});

test("NYC Artist Coalition Facebook public ledger is aggregate-only and public-safe", () => {
  const ledgerText = readFileSync(
    "docs/knowledge-bank/data/nycartc-facebook-post-ledger.json",
    "utf8"
  );
  const ledger = JSON.parse(ledgerText);
  const forbiddenFields = [
    "text",
    "message",
    "raw",
    "postUrl",
    "canonicalUrl",
    "person",
    "reactions",
    "comments",
    "shares",
    "publisher"
  ];

  for (const item of ledger.records) {
    for (const field of forbiddenFields) {
      assert.equal(field in item, false, `${field} must remain protected`);
    }
    assert.equal(item.publicDetailStatus, "aggregate-only");
  }
  assert.doesNotMatch(ledgerText, /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
  assert.match(ledger.publicSafety.withheld, /Raw post text.*comments.*names.*post URLs/i);
});

test("NYC Artist Coalition Facebook route ledger preserves posted sources safely", () => {
  const ledgerText = readFileSync(
    "docs/knowledge-bank/data/nycartc-facebook-post-route-ledger.json",
    "utf8"
  );
  const ledger = JSON.parse(ledgerText);
  const protectedRows = ledger.rows.filter((item) => item.disposition === "protected");
  const cityAndState = knowledgeBank.sourceReadings.find(
    (item) => item.sourceId === "SRC-CITY-AND-STATE-AGENT-OF-CHANGE-2018"
  );
  const seattle = knowledgeBank.sourceReadings.find(
    (item) => item.sourceId === "SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"
  );
  const recoveryTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NYCARTC-FACEBOOK-POSTED-SOURCE-RECOVERY"
  );

  assert.deepEqual(ledger.accounting, {
    rawOutboundLinkOccurrences: 64,
    rawUniqueUrls: 39,
    normalizedRoutes: 33,
    protectedRoutes: 2,
    sourceRecords: 4
  });
  assert.equal(protectedRows.length, 2);
  assert.ok(protectedRows.every((item) => item.publicUrl === null));
  assert.ok(ledger.rows.every((item) => /not automatic corroboration/i.test(item.interpretationBoundary)));
  assert.equal(cityAndState.status, "closely-read");
  assert.equal(cityAndState.propositions.length, 2);
  assert.equal(seattle.status, "revisit");
  assert.equal(seattle.propositions.length, 0);
  assert.equal(recoveryTask.status, "open");
  assert.ok(recoveryTask.sourceIds.includes("SRC-SEATTLE-TIMES-ARTS-RELIEF-2020"));
  assert.doesNotMatch(ledgerText, /zoom\.us|formstack|\/private\/|\/tmp\/|\/Users\//i);
});

test("NYC Artist Coalition Facebook stakeholder and response claims retain interpretation limits", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/nycartc-facebook-post-ledger.json", "utf8")
  );
  const stakeholderClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-FACEBOOK-STAKEHOLDER-ROUTING"
  );
  const responseClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-FACEBOOK-VISIBLE-RESPONSE-FLOOR"
  );

  assert.deepEqual(ledger.stakeholderRouting.recordOccurrences, {
    "NYC Council members and Council": 86,
    "NYC cultural and nightlife agencies": 40,
    "Cultural and advocacy partners": 38,
    "NYC business and enforcement agencies": 13,
    "Press and public-information organizations": 11
  });
  assert.match(ledger.stakeholderRouting.boundary, /do not establish.*saw.*endorsed/i);
  assert.ok(stakeholderClaim.antiClaims.some((item) => /Eighty-six Council members engaged/i.test(item)));
  assert.equal(ledger.visibleInteractionSnapshot.recordsWithAtLeastOneVisibleSignal, 386);
  assert.deepEqual(ledger.visibleInteractionSnapshot.datedAggregateFloor, {
    reactions: 2366,
    comments: 212,
    shares: 611
  });
  assert.ok(responseClaim.boundaries.some((item) => /not unique people.*historical reach/i.test(item)));
  assert.ok(responseClaim.antiClaims.some((item) => /policy influence.*public impact/i.test(item)));
});

test("NYC Artist Coalition Facebook publisher memory remains research-stage", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-FACEBOOK-JAMIE-PUBLISHER-SEED"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NYCARTC-FACEBOOK-NATIVE-EXPORT-AND-PUBLISHER-CREDIT"
  );

  assert.equal(claim.status, "researching");
  assert.equal(claim.maturity, "researching");
  assert.equal(claim.projections.length, 0);
  assert.ok(claim.boundaries.some((item) => /Do not quantify Jamie's share/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /all 441/i.test(item)));
  assert.equal(task.status, "open");
  assert.ok(task.claimIds.includes(claim.id));
  assert.ok(task.nextActions.some((item) => /Olympia Kazi.*other coalition participants/i.test(item)));
});

test("NYC Artist Coalition named-practice claim is strong, collective, and deferred", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-FACEBOOK-JAMIE-NAMED-PRACTICE"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );

  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.composition.action, /Fire Guard study groups.*venue-safety.*Cabaret Law repeal/i);
  assert.match(claim.composition.intendedEnd, /Help small cultural spaces pursue safety/i);
  assert.match(claim.composition.collectiveCredit, /venue operators.*artists.*organizers.*advocates/i);
  assert.match(claim.composition.causalBoundary, /not individual authorship.*sole campaign leadership/i);
  assert.ok(claim.evidence.some((item) => item.sourceId === "SRC-NYCARTC-GOTHAMIST-CABARET-2017"));
  assert.ok(claim.evidence.some((item) => item.sourceId === "SRC-FACEBOOK-NYCARTC-CABARET-BRIDGE-OF-TRUST-POST"));
  assert.ok(claim.antiClaims.some((item) => /Jamie alone repealed/i.test(item)));
  assert.equal(claim.projections.length, 0);
  assert.equal(decision.decision, "defer");
});

test("NYC Artist Coalition Facebook census and mature claims remain deferred", () => {
  const matureClaimIds = [
    "CLM-NYCARTC-FACEBOOK-SURVIVING-POST-POPULATION",
    "CLM-NYCARTC-FACEBOOK-PARTICIPATION-AND-CAMPAIGN-ROUTING",
    "CLM-NYCARTC-FACEBOOK-STAKEHOLDER-ROUTING",
    "CLM-NYCARTC-FACEBOOK-VISIBLE-RESPONSE-FLOOR",
    "CLM-NYCARTC-FACEBOOK-JAMIE-NAMED-PRACTICE"
  ];

  for (const claimId of matureClaimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claimId);
    assert.equal(claim.projections.length, 0);
    assert.equal(decision.decision, "defer");
  }
});

test("KC Spaces Fund Facebook ledger dispositions the complete surviving surface", () => {
  const ledger = JSON.parse(
    readFileSync("docs/knowledge-bank/data/kcspacesfund-facebook-post-ledger.json", "utf8")
  );

  assert.equal(ledger.records.length, 38);
  assert.equal(new Set(ledger.records.map((item) => item.recordId)).size, 38);
  assert.equal(ledger.population.surfacedPostAndRemnantRecords, 38);
  assert.equal(ledger.population.readableCampaignMessages, 19);
  assert.equal(ledger.population.interfaceOrUnavailableRemnants, 19);
  assert.equal(ledger.population.terminalScrollsWithoutAddition, 40);
  assert.equal(ledger.population.humanPublisherAttribution, "not-exposed");
  assert.equal(kcSpacesFundFacebookPostCensus.traversal.surfacedPostAndRemnantRecords, 38);
  assert.equal(Object.values(ledger.forms).reduce((sum, count) => sum + count, 0), 38);
  assert.equal(Object.values(ledger.primaryThemes).reduce((sum, count) => sum + count, 0), 38);
});

test("KC Spaces Fund Facebook public ledger is aggregate-only and public-safe", () => {
  const ledgerText = readFileSync(
    "docs/knowledge-bank/data/kcspacesfund-facebook-post-ledger.json",
    "utf8"
  );
  const ledger = JSON.parse(ledgerText);
  const forbiddenFields = [
    "text",
    "message",
    "raw",
    "postUrl",
    "canonicalUrl",
    "person",
    "reactions",
    "comments",
    "shares",
    "publisher"
  ];

  for (const item of ledger.records) {
    for (const field of forbiddenFields) {
      assert.equal(field in item, false, `${field} must remain protected`);
    }
    assert.equal(item.publicDetailStatus, "aggregate-only");
  }
  assert.equal(ledger.namedGranteeRecognitionRecords, 10);
  assert.deepEqual(ledger.visibleInteractionSnapshot.datedAggregateFloor, {
    reactions: 119,
    comments: 4,
    shares: 50
  });
  assert.match(ledger.visibleInteractionSnapshot.boundary, /not historical analytics.*unique people/i);
  assert.doesNotMatch(ledgerText, /\/private\/|\/tmp\/|\/Users\/|Mobile Documents/i);
});

test("KC Spaces Fund Facebook route ledger preserves all recovered destination families", () => {
  const ledger = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/data/kcspacesfund-facebook-post-route-ledger.json",
      "utf8"
    )
  );

  assert.equal(ledger.routes.length, 3);
  assert.deepEqual(
    ledger.routes.map((item) => [item.routeType, item.occurrenceFloor]),
    [
      ["campaign-site", 17],
      ["partner-fundraiser", 4],
      ["fundraiser", 1]
    ]
  );
  assert.deepEqual(
    new Set(ledger.routes.map((item) => item.sourceId)),
    new Set([
      "SRC-KCSPACES-CAMPAIGN-SITE-2026",
      "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
      "SRC-KCSPACES-GOFUNDME-2020"
    ])
  );
  assert.match(ledger.postedRouteBoundary, /not automatic corroboration.*conversion/i);
});

test("KC Spaces Fund operations claim preserves organizers, authorship, and traction boundaries", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === claim.id
  );
  const requiredSources = [
    "SRC-FACEBOOK-KCSPACES-POST-CENSUS-RUN-2026",
    "SRC-KCSPACES-GOFUNDME-2020",
    "SRC-KCSPACES-ODDITIES-PRINT-FUNDRAISER-2020",
    "SRC-KANSAS-CITY-STAR-KCSPACES-2020",
    "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026"
  ];

  assert.equal(claim.maturity, "public-ready");
  assert.match(claim.composition.action, /behind-the-scenes web infrastructure/i);
  assert.match(claim.composition.usableResult, /38 records or remnants.*10 named grantee/i);
  assert.match(claim.composition.collectiveCredit, /named organizers.*fiscal sponsor.*partners/i);
  assert.match(claim.composition.causalBoundary, /does not show.*authored campaign posts/i);
  assert.ok(requiredSources.every((sourceId) => claim.evidence.some((item) => item.sourceId === sourceId)));
  assert.ok(claim.antiClaims.some((item) => /administered every account/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /reach.*adoption.*impact/i.test(item)));
  assert.equal(claim.projections.length, 0);
  assert.equal(decision.decision, "defer");
});

test("Jamie Facebook authored-post census accounts for every unique returned record without personal detail", () => {
  const csv = readFileSync(
    "docs/knowledge-bank/data/jamie-facebook-post-census-2026-07-14.csv",
    "utf8"
  ).trim();
  const [header, ...lines] = csv.split(/\r?\n/);

  assert.equal(
    header,
    "ledger_id,year,record_type,primary_theme,professional_relevance,accounting_status,public_detail_status"
  );
  assert.equal(lines.length, 1243);

  const rows = lines.map((line, index) => {
    const cells = line.split(",");
    assert.equal(cells.length, 7);
    assert.equal(cells[0], `recovered-${String(index + 1).padStart(4, "0")}`);
    assert.equal(cells[5], "recovered");
    assert.equal(cells[6], "aggregate-only");
    return cells;
  });

  const countBy = (column) =>
    Object.fromEntries(
      Object.entries(
        rows.reduce((counts, row) => {
          counts[row[column]] = (counts[row[column]] ?? 0) + 1;
          return counts;
        }, {})
      ).sort(([left], [right]) => left.localeCompare(right))
    );

  assert.deepEqual(countBy(1), {
    2006: 2,
    2007: 5,
    2008: 4,
    2009: 218,
    2010: 82,
    2011: 88,
    2012: 153,
    2013: 184,
    2014: 109,
    2015: 68,
    2016: 122,
    2017: 118,
    2018: 27,
    2019: 42,
    2020: 19,
    2022: 2
  });
  assert.deepEqual(countBy(4), {
    contextual: 1021,
    "practice-related": 64,
    "project-specific": 158
  });

  assert.doesNotMatch(
    csv,
    /facebook\.com|https?:\/\/|\/Users\/|\/private\/|\/tmp\/|@[A-Za-z0-9]|\b\d{4}-\d{2}-\d{2}\b/i
  );
});

test("Jamie Facebook archive claims preserve authorship, collective credit, and traction limits", () => {
  const population = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026"
  );
  const destination = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026"
  );
  const practice = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020"
  );
  const nycArtC = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019"
  );
  const engagement = knowledgeBank.claims.find(
    (item) => item.id === "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026"
  );

  assert.match(population.internalClaim, /3,728 nodes across 621 pages/i);
  assert.match(population.internalClaim, /1,243 unique/i);
  assert.ok(population.boundaries.some((item) => /not an official Meta export/i.test(item)));
  assert.ok(population.antiClaims.some((item) => /every Facebook post/i.test(item)));
  assert.equal(population.projections.length, 0);

  assert.match(destination.internalClaim, /564 unique URLs across 195 domains/i);
  assert.ok(destination.boundaries.some((item) => /outgoing source or action route/i.test(item)));
  assert.ok(destination.antiClaims.some((item) => /named stakeholders engaged/i.test(item)));

  assert.equal(practice.maturity, "public-ready");
  assert.match(practice.composition.action, /participation routes.*usable instructions/i);
  assert.match(practice.composition.intendedEnd, /join, contribute, respond, or carry work forward/i);
  assert.match(practice.composition.collectiveCredit, /collaborators.*participants.*institutions.*communities/i);
  assert.match(practice.composition.causalBoundary, /does not independently prove/i);
  assert.equal(practice.projections.length, 0);

  assert.equal(nycArtC.maturity, "public-ready");
  assert.match(nycArtC.composition.action, /meetings.*hearings.*call scripts.*action routes/i);
  assert.match(nycArtC.composition.intendedEnd, /artists.*organizers.*venue operators/i);
  assert.match(nycArtC.composition.collectiveCredit, /co-founders.*venue hosts.*artists.*organizers/i);
  assert.ok(nycArtC.antiClaims.some((item) => /Jamie alone/i.test(item)));
  assert.equal(nycArtC.projections.length, 0);

  assert.equal(engagement.status, "not-recovered");
  assert.match(engagement.internalClaim, /did not provide complete reaction, comment, or share metrics/i);
  assert.ok(engagement.boundaries.some((item) => /absent interaction values as zero/i.test(item)));
  assert.ok(engagement.antiClaims.some((item) => /zero engagement/i.test(item)));
  const engagementDecision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === engagement.id
  );
  assert.equal(engagementDecision.decision, "disallow");
});

test("Jamie Facebook source discovery promotes ArtTattler while retaining protected provenance", () => {
  const sourceIds = [
    "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
    "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
    "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
    "SRC-JAMIE-FACEBOOK-EXTERNAL-DESTINATION-INVENTORY-2026"
  ];

  for (const sourceId of sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    const reading = knowledgeBank.sourceReadings.find((item) => item.sourceId === sourceId);
    assert.equal(source.visibility, "protected");
    assert.equal(source.preservationStatus, "private");
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.ok(source.protectedLocatorId);
    assert.equal(reading.status, "closely-read");
  }

  const article = knowledgeBank.sources.find(
    (item) => item.id === "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009"
  );
  const articleReading = knowledgeBank.sourceReadings.find(
    (item) => item.sourceId === article.id
  );
  const greatAccommodations = knowledgeBank.claims.find(
    (item) => item.id === "CLM-RIVER-GREAT-ACCOMMODATIONS"
  );

  assert.equal(article.visibility, "public");
  assert.equal(article.preservationStatus, "archived");
  assert.match(article.archiveUrl, /web\.archive\.org/);
  assert.equal(article.preferredPublicUrl, "archive");
  assert.ok(article.doesNotEstablish.some((item) => /exact Gulf of Mexico endpoint/i.test(item)));
  assert.equal(articleReading.status, "closely-read");
  assert.ok(
    articleReading.propositions.some((item) => /trust, accepting help/i.test(item.text))
  );
  assert.ok(
    greatAccommodations.evidence.some((item) => item.sourceId === article.id)
  );

  const sourceTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-JAMIE-FACEBOOK-SOURCE-LEADS-2026"
  );
  const engagementTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-JAMIE-FACEBOOK-ENGAGEMENT-RECOVERY-2026"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"
  );

  assert.equal(sourceTask.status, "in-progress");
  assert.ok(sourceTask.sourceIds.includes(article.id));
  assert.equal(engagementTask.status, "open");
  assert.ok(engagementTask.nextActions.some((item) => /privacy-safe/i.test(item)));
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(inquiry.findings.some((item) => /not recovered/i.test(item)));
});

test("KC Spaces Fund uniform identity is mature while Jamie's naming memory remains research-stage", () => {
  const identityClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCSPACES-UNIFORM-PUBLIC-IDENTITY"
  );
  const namingSeed = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCSPACES-NAMING-AND-IDENTITY-ROLE-SEED"
  );
  const namingTask = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-KCSPACES-NAMING-AND-IDENTITY-ROLE"
  );
  const decision = knowledgeBank.projectionDecisions.find(
    (item) => item.claimId === identityClaim.id
  );

  assert.equal(identityClaim.maturity, "public-ready");
  assert.match(identityClaim.composition.usableResult, /kcspacesfund\.com.*Facebook, X, and Instagram/i);
  assert.match(identityClaim.composition.collectiveCredit, /does not assign naming.*credit/i);
  assert.ok(identityClaim.antiClaims.some((item) => /Jamie alone named/i.test(item)));
  assert.equal(identityClaim.projections.length, 0);
  assert.equal(decision.decision, "defer");

  assert.equal(namingSeed.status, "researching");
  assert.equal(namingSeed.maturity, "researching");
  assert.equal(namingSeed.evidence.length, 0);
  assert.equal(namingSeed.projections.length, 0);
  assert.ok(namingSeed.antiClaims.some((item) => /stakeholder or owner posting/i.test(item)));
  assert.equal(namingTask.status, "open");
  assert.ok(namingTask.nextActions.some((item) => /named organizers/i.test(item)));
});

test("Finkelpearl testimony significance remains a bounded governance interpretation", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-FINKELPEARL-TESTIMONY-SIGNIFICANCE-2017"
  );
  const transcript = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017"
  );
  const reading = knowledgeBank.sourceReadings.find(
    (item) => item.sourceId === transcript.id
  );

  assert.equal(claim.status, "inference");
  assert.equal(claim.maturity, "corroborated");
  assert.equal(claim.projections.length, 0);
  assert.match(claim.internalClaim, /concrete example.*public value/i);
  assert.ok(claim.boundaries.some((item) => /interpretation.*not.*private motive/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /could not function without/i.test(item)));
  assert.ok(reading.propositions.some((item) => /reciprocal relationship.*direct feedback/i.test(item.text)));
  assert.ok(reading.propositions.some((item) => /common cause.*NYC Artist Coalition/i.test(item.text)));
});

test("NYC Artist Coalition government-interface claims preserve Chad-lens agency and collective credit", () => {
  const dclaClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-DCLA-RECIPROCAL-PUBLIC-INTERFACE-2017"
  );
  const councilClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-COUNCIL-ESPINAL-POLICY-INTERFACE-2017-2018"
  );

  for (const claim of [dclaClaim, councilClaim]) {
    const decision = knowledgeBank.projectionDecisions.find((item) => item.claimId === claim.id);
    assert.equal(claim.maturity, "public-ready");
    assert.equal(claim.projections.length, 0);
    assert.equal(decision.decision, "defer");
    assert.match(claim.composition.action, /helped|operate/i);
    assert.match(claim.composition.usableResult, /repeatable|documented pathway/i);
    assert.match(claim.composition.collectiveCredit, /coalition|Espinal|Olympia/i);
    assert.match(claim.composition.causalBoundary, /not|does not/i);
  }

  assert.ok(dclaClaim.evidence.some((item) => item.sourceId === "SRC-CREATENYC-NYC-ARTISTS-2017"));
  assert.ok(councilClaim.evidence.some((item) => item.sourceId === "SRC-NYC-COUNCIL-NIGHTLIFE-ADVISORY-BOARD-2018"));
  assert.ok(councilClaim.antiClaims.some((item) => /Jamie authored Espinal/i.test(item)));
});

test("institutional-need interpretation rejects dependency and sole-causation claims", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCARTC-INSTITUTIONAL-NEED-INTERPRETATION-2026"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-NYCARTC-DCLA-COUNCIL-INTERFACE-2026"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NYCARTC-INSTITUTIONAL-INTERFACE-CORROBORATION"
  );

  assert.equal(claim.status, "inference");
  assert.equal(claim.maturity, "corroborated");
  assert.match(claim.internalClaim, /nonexclusive civic intermediary/i);
  assert.ok(claim.boundaries.some((item) => /useful.*valuable.*served as/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /could not act without/i.test(item)));
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(inquiry.limitations.some((item) => /complete personal motive/i.test(item)));
  assert.equal(task.status, "open");
  assert.ok(task.nextActions.some((item) => /Tom Finkelpearl.*Rafael Espinal/i.test(item)));
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
