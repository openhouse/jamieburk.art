import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const evaluatorPath = path.join(repoRoot, "scripts/rfcs/finite-weekly-review-eval.mjs");
const suitePath = path.join(
  repoRoot,
  "evals/knowledge-bank/finite-weekly-review-rfc-evals.json"
);

async function loadEvaluationSurface() {
  assert.equal(
    existsSync(evaluatorPath),
    true,
    "the finite weekly review evaluator must exist"
  );
  assert.equal(existsSync(suitePath), true, "the finite weekly review suite must exist");

  const evaluator = await import("./finite-weekly-review-eval.mjs");
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  return { evaluator, suite };
}

function mergeState(base, patch) {
  if (Array.isArray(base) || Array.isArray(patch)) return patch;
  if (!base || typeof base !== "object" || !patch || typeof patch !== "object") return patch;

  const result = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    result[key] =
      value && typeof value === "object" && !Array.isArray(value)
        ? mergeState(base[key] ?? {}, value)
        : value;
  }
  return result;
}

test("a bounded private review with three chosen commitments is ready for human review", async () => {
  const { evaluator, suite } = await loadEvaluationSurface();

  assert.deepEqual(evaluator.evaluateFiniteWeeklyReview(suite.baseline), {
    decision: "ready-for-human-review",
    public_projection_authorized: false,
    reasons: []
  });
});

test("retained open loops cannot become an unbounded commitment list", async () => {
  const { evaluator, suite } = await loadEvaluationSurface();
  const state = mergeState(suite.baseline, {
    next_week: {
      commitments: [
        { id: "one", lane: "livelihood", bounded: true, observable_end: true },
        { id: "two", lane: "community", bounded: true, observable_end: true },
        { id: "three", lane: "sustaining", bounded: true, observable_end: true },
        { id: "four", lane: "livelihood", bounded: true, observable_end: true }
      ]
    }
  });

  assert.deepEqual(evaluator.evaluateFiniteWeeklyReview(state), {
    decision: "deny",
    public_projection_authorized: false,
    reasons: ["commitment-budget-exceeded", "commitment-lane-budget-exceeded"]
  });
});

test("rest cannot be accepted as a productivity optimization variable", async () => {
  const { evaluator, suite } = await loadEvaluationSurface();
  const state = mergeState(suite.baseline, {
    sustaining_capacity: { productivity_optimization_target: true }
  });

  assert.deepEqual(evaluator.evaluateFiniteWeeklyReview(state), {
    decision: "deny",
    public_projection_authorized: false,
    reasons: ["rest-instrumentalization-forbidden"]
  });
});

test("repository activity cannot be promoted to an external lived outcome", async () => {
  const { evaluator, suite } = await loadEvaluationSurface();
  const state = mergeState(suite.baseline, {
    evidence: { operating_artifacts_claimed_as_external_outcomes: true }
  });

  assert.deepEqual(evaluator.evaluateFiniteWeeklyReview(state), {
    decision: "deny",
    public_projection_authorized: false,
    reasons: ["operating-artifact-is-not-lived-outcome"]
  });
});

test("private weekly detail cannot enter an automatic public projection", async () => {
  const { evaluator, suite } = await loadEvaluationSurface();
  const state = mergeState(suite.baseline, {
    projection: { automatic: true, contains_private_detail: true }
  });

  assert.deepEqual(evaluator.evaluateFiniteWeeklyReview(state), {
    decision: "deny",
    public_projection_authorized: false,
    reasons: [
      "private-weekly-detail-publication-forbidden",
      "automatic-publication-forbidden"
    ]
  });
});

test("fictionalized lenses cannot select commitments or authorize action", async () => {
  const { evaluator, suite } = await loadEvaluationSurface();
  const state = mergeState(suite.baseline, {
    modeled_review: { action_authority_claimed: true }
  });

  assert.deepEqual(evaluator.evaluateFiniteWeeklyReview(state), {
    decision: "deny",
    public_projection_authorized: false,
    reasons: ["modeled-review-authority-forbidden"]
  });
});

test("zero next-week commitments remains a valid finite choice", async () => {
  const { evaluator, suite } = await loadEvaluationSurface();
  const state = mergeState(suite.baseline, {
    next_week: { commitments: [] }
  });

  assert.deepEqual(evaluator.evaluateFiniteWeeklyReview(state), {
    decision: "ready-for-human-review",
    public_projection_authorized: false,
    reasons: []
  });
});

test("the exact RFC 0014 candidate satisfies every hard criterion and scenario", async () => {
  const { evaluator } = await loadEvaluationSurface();
  const result = evaluator.evaluateFiniteWeeklyReviewRFC({ repoRoot });

  assert.deepEqual(
    Object.entries(result.checks)
      .filter(([, passed]) => !passed)
      .map(([criterion]) => criterion),
    []
  );
  assert.deepEqual(
    result.scenarios.results.filter((scenario) => !scenario.passed).map((scenario) => scenario.id),
    []
  );
});
