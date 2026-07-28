import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { planEvaluations } from "./plan-evals.mjs";

const policy = JSON.parse(
  readFileSync(
    path.resolve(".agents/evals/pre-launch-cost-policy.json"),
    "utf8"
  )
);

test("documentation-only change avoids rendered and independent review", () => {
  const plan = planEvaluations({
    files: ["docs/integration/photo-knowledge-family-closure-2026-07-28.md"],
    policy
  });

  assert.deepEqual(
    plan.requiredTiers.map((tier) => tier.id),
    ["tier-0"]
  );
});

test("public surface change requires deterministic, rendered, and semantic review", () => {
  const plan = planEvaluations({
    files: ["apps/www/src/app/page.tsx"],
    policy
  });

  assert.deepEqual(
    plan.requiredTiers.map((tier) => tier.id),
    ["tier-0", "tier-1", "tier-2"]
  );
});

test("knowledge claim change requires semantic review without browser work by default", () => {
  const plan = planEvaluations({
    files: ["docs/knowledge-bank/claims/example.md"],
    policy
  });

  assert.deepEqual(
    plan.requiredTiers.map((tier) => tier.id),
    ["tier-0", "tier-2"]
  );
});

test("human authority gates are never skipped by path planning", () => {
  const plan = planEvaluations({ files: [], policy });

  assert.ok(plan.humanGates.includes("Jamie-approval"));
  assert.ok(plan.humanGates.includes("indexing-approval"));
  assert.ok(!plan.skippedTiers.some((tier) => tier.id === "tier-3"));
  assert.match(plan.cacheContract, /candidate fingerprint/);
});
