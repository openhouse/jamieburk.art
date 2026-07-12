import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  evaluateLifecycle,
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

test("judge evidence and floors are enforced", () => {
  const assessment = {
    suiteId: suite.id,
    suiteVersion: suite.version,
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
    judge: { scores: suite.judgeCriteria.map((item) => ({ criterionId: item.id, score: 4, evidence: Array(item.minimumEvidence).fill({ file: "same.ts", record: "same" }) })) },
    humanGates: []
  };
  assert.equal(scoreAssessment(assessment, suite).valid, false);
});

test("judge evidence must resolve to repository records", () => {
  const assessment = {
    suiteId: suite.id,
    suiteVersion: suite.version,
    judge: { scores: suite.judgeCriteria.map((item) => ({ criterionId: item.id, score: 4, evidence: validEvidence.slice(0, item.minimumEvidence) })) },
    humanGates: []
  };
  assessment.judge.scores[0].evidence[0] = { file: "missing.ts", record: "invented" };
  assert.equal(scoreAssessment(assessment, suite).valid, false);
});
