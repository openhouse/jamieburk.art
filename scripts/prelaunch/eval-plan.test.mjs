import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluationGroups,
  exactCandidateExternalGates,
  makeEvaluationPlan,
  parsePorcelainZ
} from "./eval-plan.mjs";

test("Wiki changes select their owners and require exact-candidate refresh", () => {
  const plan = makeEvaluationPlan([
    "docs/knowledge-bank/sources/example.md",
    "scripts/knowledge-wiki/example.test.mjs"
  ]);
  const groups = plan.selectedGroups.map((group) => group.id);

  assert.ok(groups.includes("foundation"));
  assert.ok(groups.includes("wiki"));
  assert.ok(groups.includes("citations"));
  assert.ok(groups.includes("legacyKnowledge"));
  assert.equal(plan.exactCandidateEvidence.required, true);
  assert.equal(plan.finalRelease.command, "npm run check");
  assert.equal(plan.finalRelease.incrementalPlanIsSubstitute, false);
});

test("unselected groups remain explicitly not passed", () => {
  const plan = makeEvaluationPlan(["rfcs/0003-living-photographic-knowledge-loop.md"]);

  assert.ok(plan.unselectedGroups.length > 0);
  assert.ok(
    plan.unselectedGroups.every(
      (group) => group.status === "not-selected-not-passed"
    )
  );
});

test("unknown paths fail closed to every group and external gate", () => {
  const plan = makeEvaluationPlan(["unexpected/new-system.bin"]);

  assert.deepEqual(
    plan.selectedGroups.map((group) => group.id).sort(),
    Object.keys(evaluationGroups).sort()
  );
  assert.deepEqual(plan.unknownPaths, ["unexpected/new-system.bin"]);
  assert.equal(
    plan.exactCandidateEvidence.gates.length,
    exactCandidateExternalGates.length
  );
});

test("generated reports do not independently trigger candidate refresh", () => {
  const plan = makeEvaluationPlan([
    "docs/knowledge-bank/_generated/graph.json",
    "reports/photo-knowledge/candidate.json"
  ]);

  assert.equal(plan.exactCandidateEvidence.required, false);
});

test("the plan is reproducible for the same changed paths", () => {
  const left = makeEvaluationPlan(["apps/www/src/app/page.tsx", "package.json"]);
  const right = makeEvaluationPlan(["package.json", "apps/www/src/app/page.tsx"]);

  assert.equal(left.changedPathsSha256, right.changedPathsSha256);
  assert.deepEqual(left.deterministicCommands, right.deterministicCommands);
  assert.equal(left.humanGates.productionApproval, "open");
  assert.equal(left.humanGates.jamieFinalReview, "open");
});

test("NUL-delimited Git status preserves both rename paths", () => {
  const output =
    "R  docs/new-name.md\u0000docs/old-name.md\u0000 M package.json\u0000?? docs/new.md\u0000";

  assert.deepEqual(parsePorcelainZ(output), [
    "docs/new-name.md",
    "docs/old-name.md",
    "package.json",
    "docs/new.md"
  ]);
});
