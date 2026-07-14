import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  validLifecycleJudgments,
  validateKnowledgeLifecycle,
  weightedScore
} from "../lib/knowledge-lifecycle.mjs";

const suite = JSON.parse(readFileSync("evals/knowledge-lifecycle/suite.json", "utf8"));

test("knowledge-lifecycle weights sum to 100", () => {
  assert.equal(suite.rubrics.reduce((sum, rubric) => sum + rubric.weight, 0), 100);
  assert.equal(weightedScore(suite.rubrics, Object.fromEntries(suite.rubrics.map((item) => [item.id, 4]))), 100);
});

test("canonical knowledge bank reaches deterministic lifecycle completion", () => {
  const result = validateKnowledgeLifecycle(knowledgeBank, suite);
  assert.deepEqual(result.findings, []);
  assert.equal(result.score, 100);
  assert.equal(Object.keys(result.scores).length, suite.rubrics.length);
});

test("every supplied URL has a completed intake disposition", () => {
  const intakeByUrl = new Map(
    knowledgeBank.intakeItems.map((item) => [item.submittedUrl, item])
  );
  for (const url of suite.requiredIntakeUrls) {
    const item = intakeByUrl.get(url);
    assert.ok(item, url);
    assert.equal(["promoted", "deferred", "closed"].includes(item.status), true);
  }
});

test("memory leads remain inquiries rather than confirmed claims", () => {
  const memoryItems = knowledgeBank.intakeItems.filter((item) =>
    item.id.startsWith("INT-2026-07-13-MEMORY")
  );
  assert.equal(memoryItems.length, 4);
  for (const item of memoryItems) {
    assert.equal(item.status, "deferred");
    assert.equal(item.claimIds.length, 0);
    assert.equal(item.inquiryIds.length > 0, true);
    assert.equal(Boolean(item.dispositionReason), true);
  }
});

test("the first lifecycle corpus preserves source support and non-support", () => {
  const lifecycleSources = knowledgeBank.sources.filter((source) =>
    source.intakeIds.some((id) => id.startsWith("INT-2026-07-13"))
  );
  assert.equal(lifecycleSources.length, 8);
  for (const source of lifecycleSources.filter((item) => item.reviewStatus === "reviewed")) {
    assert.equal(source.supportsGenerally.length > 0, true);
    assert.equal(source.doesNotEstablish.length > 0, true);
    assert.equal(Boolean(source.locator), true);
  }
  assert.equal(lifecycleSources.every((item) => item.reviewStatus === "reviewed"), true);
  assert.equal(
    lifecycleSources.find((item) => item.id === "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017")?.preservationStatus,
    "live"
  );
});

test("mature unused claims remain out of public composition", () => {
  const lifecycleClaims = knowledgeBank.claims.filter((claim) =>
    ["water-publics", "open-house", "nyc-artist-coalition"].includes(claim.project)
  );
  const active = lifecycleClaims.filter((claim) => claim.editorialStatus === "active");
  const unused = lifecycleClaims.filter((claim) => claim.editorialStatus === "unused");
  assert.deepEqual(
    active.map((claim) => claim.id).sort(),
    ["CLM-NYCARTC-CABARET-LAW-ADVOCACY", "CLM-NYCARTC-FOUNDING-ROLE"]
  );
  assert.equal(unused.length, 7);
  assert.equal(unused.every((claim) => claim.projections.every((item) => item.status !== "active")), true);
});

test("missing supplied URLs fail capture integrity", () => {
  const result = validateKnowledgeLifecycle({ ...knowledgeBank, intakeItems: [] }, suite);
  assert.equal(result.findings.filter((item) => item.code === "missing-required-intake").length, suite.requiredIntakeUrls.length);
  assert.equal(result.scores.capture_integrity, 0);
});

test("private filesystem paths fail projection restraint", () => {
  const bank = structuredClone(knowledgeBank);
  bank.projects[0].summary = "See /private/tmp/secret";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "private-path"), true);
});

test("immature public projections fail closed", () => {
  const bank = structuredClone(knowledgeBank);
  bank.claims[0].status = "inference";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "immature-active"), true);
});

test("candidate-bound judgments reject stale evidence", () => {
  const judgment = {
    judgeId: "judge-a",
    lens: "archival-editorial",
    candidate: "sha256:candidate",
    contract: "sha256:contract",
    passes: true,
    scores: Object.fromEntries(suite.rubrics.map((rubric) => [rubric.id, 3])),
    regressions: []
  };
  assert.equal(validLifecycleJudgments({ judgments: [judgment], candidate: "sha256:candidate", contract: "sha256:contract", suite }).length, 1);
  assert.equal(validLifecycleJudgments({ judgments: [judgment], candidate: "sha256:new", contract: "sha256:contract", suite }).length, 0);
});
