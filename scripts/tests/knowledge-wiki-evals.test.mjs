import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { suitePath, validateWikiEvalSuite } from "../knowledge-wiki/check-wiki-evals.mjs";
import { hashFiles, selectedCandidateFiles, sourceReturnPageSpecs, validateJudgmentPayload, validateSourceReturnText } from "../knowledge-wiki/run-wiki-evals.mjs";
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
