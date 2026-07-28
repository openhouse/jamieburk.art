import test from "node:test";
import assert from "node:assert/strict";

import { planAffectedChecks } from "./affected-lib.mjs";

test("knowledge records select the Wiki without public-site suites", () => {
  const plan = planAffectedChecks([
    "docs/knowledge-bank/data/public-hearing-events-2026-07.json"
  ]);
  assert.equal(plan.mode, "affected");
  assert.ok(plan.commands.includes("wiki:eval"));
  assert.ok(!plan.commands.includes("build"));
  assert.ok(!plan.commands.includes("photos:check"));
});

test("photo governance selects both photo and Wiki suites", () => {
  const plan = planAffectedChecks([
    "scripts/photo-knowledge/lib.mjs",
    "docs/knowledge-bank/assets/campaign-sites/abc.md"
  ]);
  assert.equal(plan.mode, "affected");
  assert.ok(plan.commands.includes("photos:check"));
  assert.ok(plan.commands.includes("wiki:eval"));
});

test("public application changes select build and route checks", () => {
  const plan = planAffectedChecks([
    "apps/www/src/app/work/page.tsx"
  ]);
  assert.equal(plan.mode, "affected");
  assert.ok(plan.commands.includes("build"));
  assert.ok(plan.commands.includes("check:routes"));
});

test("dependency and deployment changes select the full gate", () => {
  assert.deepEqual(planAffectedChecks(["package-lock.json"]).commands, [
    "check"
  ]);
  assert.deepEqual(planAffectedChecks(["Dockerfile"]).commands, ["check"]);
});

test("unknown paths fail conservatively into the full gate", () => {
  const plan = planAffectedChecks(["unclassified/new-surface.txt"]);
  assert.equal(plan.mode, "full");
  assert.deepEqual(plan.commands, ["check"]);
});

test("no changes require no commands", () => {
  const plan = planAffectedChecks([]);
  assert.equal(plan.mode, "none");
  assert.deepEqual(plan.commands, []);
});
