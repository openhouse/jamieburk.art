import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { suitePath, validateWikiEvalSuite } from "../knowledge-wiki/check-wiki-evals.mjs";
import {
  campaignNarrativePageSpecs,
  governancePageSpecs,
  hashFiles,
  practicePageSpecs,
  selectedCandidateFiles,
  sourceReturnPageSpecs,
  validateJudgmentPayload,
  validatePageSpecText,
  validateSourceReturnText,
} from "../knowledge-wiki/run-wiki-evals.mjs";
import { compileKnowledgeWiki } from "../knowledge-wiki/lib.mjs";
import { createHash } from "node:crypto";

const suite = JSON.parse(readFileSync(suitePath, "utf8"));

test("canonical Knowledge Wiki eval suite is valid", () => {
  assert.deepEqual(validateWikiEvalSuite(suite).errors, []);
});

test("weights total 100 and human authority is unique", () => {
  assert.equal(suite.evals.reduce((sum, entry) => sum + entry.weight, 0), 100);
  assert.equal(suite.evals.filter((entry) => entry.grader === "human_approval").length, 1);
});

test("optimizer cannot grade its own patch", () => {
  assert.equal(suite.optimization.optimizer_may_not_grade_own_patch, true);
  const fingerprint = hashFiles(selectedCandidateFiles());
  const rubric = createHash("sha256").update(readFileSync(suitePath)).digest("hex");
  const payload = { suite_id: suite.suite_id, candidate_fingerprint: fingerprint, rubric_fingerprint: rubric, judge_id: "optimizer", independent_from_optimizer: false, judgments: [] };
  assert.ok(validateJudgmentPayload(payload, fingerprint, rubric).errors.includes("Judgment must be independent from the optimizer"));
});

test("stale candidate judgments fail closed", () => {
  const rubric = createHash("sha256").update(readFileSync(suitePath)).digest("hex");
  const payload = { suite_id: suite.suite_id, candidate_fingerprint: "stale", rubric_fingerprint: rubric, judge_id: "holdout", independent_from_optimizer: true, judgments: [] };
  assert.ok(validateJudgmentPayload(payload, "current", rubric).errors.some((error) => error.includes("stale")));
});

test("human release authority is never a local grader", () => {
  const entry = suite.evals.find((item) => item.id === "KW-012");
  assert.equal(entry.grader, "human_approval");
  assert.equal(entry.external_judgment_required, true);
  assert.ok(entry.cannot_establish.some((statement) => statement.includes("human approval")));
});

test("priority pages carry complete source-return records without private locators", () => {
  for (const spec of sourceReturnPageSpecs) {
    const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
    assert.deepEqual(validateSourceReturnText(text).errors, [], spec.id);
  }
});

test("source-return validation fails when an access boundary is removed", () => {
  const spec = sourceReturnPageSpecs[0];
  const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
  const mutated = text.replace("- **Access boundary:**", "- **Boundary removed:**");
  assert.ok(validateSourceReturnText(mutated).errors.some((error) => error.includes("Access boundary")));
});

test("source-return validation fails closed on a private locator", () => {
  const spec = sourceReturnPageSpecs[0];
  const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
  const mutated = `${text}\n/Volumes/private/archive/source.pdf\n`;
  assert.ok(validateSourceReturnText(mutated).errors.some((error) => error.includes("Private locator")));
});

test("new source practice evals remain blocking and bounded", () => {
  for (const id of ["KW-013", "KW-014"]) assert.equal(suite.evals.find((entry) => entry.id === id)?.blocking, true);
  const sourceEval = suite.evals.find((entry) => entry.id === "KW-014");
  assert.ok(sourceEval.cannot_establish.includes("source completeness"));
  assert.ok(sourceEval.cannot_establish.includes("publication rights"));
});

test("campaign and ownership narratives satisfy bounded page contracts", () => {
  for (const spec of campaignNarrativePageSpecs) {
    const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
    assert.deepEqual(validatePageSpecText(text, spec).errors, [], spec.id);
  }
  const graph = compileKnowledgeWiki().graph;
  assert.equal(graph.nodes.find((node) => node.id === "hje-modernization-stewardship")?.kind, "proof-claim");
});

test("campaign narrative validation fails when collective-credit governance is removed", () => {
  const spec = campaignNarrativePageSpecs[0];
  const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
  const mutated = text.replace("    target: policy.people-and-collective-credit", "    target: policy.credit-removed");
  assert.ok(validatePageSpecText(mutated, spec).errors.some((error) => error.includes("policy.people-and-collective-credit")));
});

test("practice and place pages retain source return and embodied boundaries", () => {
  for (const spec of practicePageSpecs) {
    const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
    assert.deepEqual(validatePageSpecText(text, spec).errors, [], spec.id);
  }
});

test("collective-credit policy fails when protected absence is erased", () => {
  const spec = governancePageSpecs[0];
  const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
  const mutated = text.replace("## Protected absence", "## Public names only");
  assert.ok(validatePageSpecText(mutated, spec, { requireSourceReturn: false }).errors.some((error) => error.includes("Protected absence")));
});

test("claim maturity dashboard requires an explicit advancement test", () => {
  const spec = governancePageSpecs.find((entry) => entry.id === "index.claim-maturity-dashboard");
  const text = readFileSync(new URL(`../../${spec.path}`, import.meta.url), "utf8");
  assert.deepEqual(validatePageSpecText(text, spec, { requireSourceReturn: false }).errors, []);
  const mutated = text.replaceAll("Advancement test", "Possible next step");
  assert.ok(validatePageSpecText(mutated, spec, { requireSourceReturn: false }).errors.some((error) => error.includes("Advancement test")));
});

test("new narrative, relational, and maturity evals are blocking and bounded", () => {
  for (const id of ["KW-015", "KW-016", "KW-017"]) assert.equal(suite.evals.find((entry) => entry.id === id)?.blocking, true);
  assert.ok(suite.evals.find((entry) => entry.id === "KW-015").cannot_establish.includes("individual legislative causality"));
  assert.ok(suite.evals.find((entry) => entry.id === "KW-016").cannot_establish.includes("participant impact"));
  assert.ok(suite.evals.find((entry) => entry.id === "KW-017").cannot_establish.includes("human publication approval"));
});
