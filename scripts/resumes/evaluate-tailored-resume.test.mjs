import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  evaluateDocumentArtifact,
  evaluateResume
} from "./evaluate-tailored-resume.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const resumePath = path.join(
  repoRoot,
  "resumes/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.md"
);
const resume = readFileSync(resumePath, "utf8");

test("the OTI tailored resume passes every deterministic application gate", () => {
  const result = evaluateResume(resume);
  assert.equal(result.overall, "pass", JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});

test("the OTI PDF is current, visually inspected, and installed as the public download", () => {
  const result = evaluateDocumentArtifact();
  assert.equal(result.overall, "pass", JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});
test("the evaluator rejects loss of the exact target title", () => {
  const mutation = resume.replaceAll("Senior Product Manager", "Product Lead");
  const result = evaluateResume(mutation, "mutation:no-target-title");
  assert.equal(
    result.checks.find((check) => check.id === "exact-target-title")?.pass,
    false
  );
  assert.equal(result.overall, "fail");
});

test("the evaluator rejects ATS-hostile tables", () => {
  const mutation = `${resume}\n| Skill | Evidence |\n| --- | --- |\n| Product | Launch |\n`;
  const result = evaluateResume(mutation, "mutation:table");
  assert.equal(
    result.checks.find((check) => check.id === "ats-safe-markdown")?.pass,
    false
  );
  assert.equal(result.overall, "fail");
});

test("the evaluator rejects collective-credit and metric-boundary removal", () => {
  const mutation = resume
    .replace("with Richard Caceres", "")
    .replace("while preserving collective credit and sensitive boundaries", "")
    .replace("distinguish these activity counts", "describe these activity counts")
    .replace("The award was not disbursed", "The award was administered");
  const result = evaluateResume(mutation, "mutation:claim-safety");
  assert.equal(
    result.checks.find((check) => check.id === "collective-credit-and-claim-safety")?.pass,
    false
  );
  assert.equal(result.overall, "fail");
});
