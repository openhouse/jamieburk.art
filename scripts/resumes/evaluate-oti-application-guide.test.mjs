import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const guidePath = path.join(
  repoRoot,
  "resumes/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-NYC-OTI-Senior-Product-Manager-782366-Application-Guide.md"
);

let evaluator;
try {
  evaluator = await import("./evaluate-oti-application-guide.mjs");
} catch {
  evaluator = undefined;
}

test("the OTI application guide and evaluator are maintained beside the resume", () => {
  assert.ok(existsSync(guidePath), `missing application guide: ${guidePath}`);
  assert.equal(
    typeof evaluator?.evaluateApplicationGuide,
    "function",
    "missing application-guide evaluator"
  );
});

test("the maintained OTI application guide passes every field-contract gate", () => {
  assert.equal(typeof evaluator?.evaluateApplicationGuide, "function");
  const result = evaluator.evaluateApplicationGuide(readFileSync(guidePath, "utf8"));

  assert.equal(result.overall, "pass", JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});

test("the application guide fails closed if a required field loses its exact answer", () => {
  assert.equal(typeof evaluator?.evaluateApplicationGuide, "function");
  const guide = readFileSync(guidePath, "utf8");
  const mutation = guide.replace("| First name | `Jamie` |", "| First name | Leave blank. |");
  const result = evaluator.evaluateApplicationGuide(mutation, "mutation:missing-first-name");

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "exact-field-contract")?.pass, false);
});

test("the application guide fails if optional social or demographic fields gain invented answers", () => {
  assert.equal(typeof evaluator?.evaluateApplicationGuide, "function");
  const guide = readFileSync(guidePath, "utf8");
  const socialMutation = guide.replace(
    "| Facebook | Leave blank. |",
    "| Facebook | `https://facebook.com/example` |"
  );
  const demographicMutation = guide.replace(
    "| Voluntary demographic and veteran questions | Leave every optional field unanswered.",
    "| Voluntary demographic and veteran questions | Select answers inferred from the resume."
  );

  assert.equal(
    evaluator.evaluateApplicationGuide(socialMutation, "mutation:social-invention").overall,
    "fail"
  );
  assert.equal(
    evaluator.evaluateApplicationGuide(demographicMutation, "mutation:demographic-invention").overall,
    "fail"
  );
});

test("the application guide keeps final submission as Jamie's human-authorized action", () => {
  assert.equal(typeof evaluator?.evaluateApplicationGuide, "function");
  const guide = readFileSync(guidePath, "utf8");
  const mutation = guide.replace(
    "Jamie reviews every screen and personally clicks **Submit**.",
    "Submit automatically after validation."
  );
  const result = evaluator.evaluateApplicationGuide(mutation, "mutation:automatic-submit");

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "human-submit-gate")?.pass, false);
});
