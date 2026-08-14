import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateResume } from "./evaluate-tailored-resume.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const resumePath = path.join(
  repoRoot,
  "resumes/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.md"
);
const resume = readFileSync(resumePath, "utf8");
const baseline = readFileSync(
  path.join(
    repoRoot,
    "evals/resumes/fixtures/oti-senior-product-manager-pre-tailoring.md"
  ),
  "utf8"
);
const politicoArticleUrl =
  "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf";

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

test("the OTI tailored resume passes every deterministic application gate", () => {
  const result = evaluateResume(resume);
  assert.equal(result.overall, "pass", JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});

test("the retained pre-tailoring fixture reproduces the failing baseline", () => {
  const result = evaluateResume(baseline, "fixture:pre-tailoring");
  assert.equal(result.overall, "fail");
  assert.equal(result.passedChecks, 1);
  assert.equal(result.totalChecks, 14);
  assert.equal(result.score, 7);
});

test("the rubric and retained run records stay bound to the evaluated inputs", () => {
  const rubric = readJson("evals/resumes/nyc-oti-senior-product-manager-782366.json");
  const baselineRun = readJson(
    "evals/resumes/runs/2026-08-14-oti-senior-product-manager-baseline.json"
  );
  const candidateRun = readJson(
    "evals/resumes/runs/2026-08-14-oti-senior-product-manager-post-hillclimb.json"
  );
  const baselineResult = evaluateResume(baseline, baselineRun.candidate);
  const candidateResult = evaluateResume(resume, candidateRun.candidate);

  assert.deepEqual(
    candidateResult.checks.map((check) => check.id),
    rubric.hardGates
  );
  assert.equal(baselineRun.inputSha256, sha256(baseline));
  assert.equal(candidateRun.inputSha256, sha256(resume));

  for (const [record, result] of [
    [baselineRun, baselineResult],
    [candidateRun, candidateResult]
  ]) {
    assert.equal(record.wordCount, result.wordCount);
    assert.equal(record.numericSignalCount, result.numericSignalCount);
    assert.equal(record.passedChecks, result.passedChecks);
    assert.equal(record.totalChecks, result.totalChecks);
    assert.equal(record.score, result.score);
    assert.equal(record.overall, result.overall);
  }
});

test("the OTI resume links contemporaneous coverage and keeps the project transition concise", () => {
  const result = evaluateResume(resume);
  assert.equal(
    result.checks.find((check) => check.id === "direct-source-link-and-concise-transition")?.pass,
    true,
    JSON.stringify(result.checks, null, 2)
  );

  const unlinked = resume.replace(
    `[Politico New York](${politicoArticleUrl})`,
    "Politico New York"
  );
  const verbose = `${resume}\nThe award was not disbursed to the project.\n`;

  assert.equal(
    evaluateResume(unlinked).checks.find(
      (check) => check.id === "direct-source-link-and-concise-transition"
    )?.pass,
    false
  );
  assert.equal(
    evaluateResume(verbose).checks.find(
      (check) => check.id === "direct-source-link-and-concise-transition"
    )?.pass,
    false
  );
});

test("the evaluator rejects loss of the exact target title", () => {
  const result = evaluateResume(
    resume.replaceAll("Senior Product Manager", "Product Lead"),
    "mutation:no-target-title"
  );
  assert.equal(result.checks.find((check) => check.id === "exact-target-title")?.pass, false);
  assert.equal(result.overall, "fail");
});

test("the evaluator rejects ATS-hostile tables", () => {
  const result = evaluateResume(
    `${resume}\n| Skill | Evidence |\n| --- | --- |\n| Product | Launch |\n`,
    "mutation:table"
  );
  assert.equal(result.checks.find((check) => check.id === "ats-safe-markdown")?.pass, false);
  assert.equal(result.overall, "fail");
});

test("the evaluator rejects loss of bounded resident-service evidence", () => {
  const result = evaluateResume(
    resume.replaceAll("Tired of Tires", "Neighborhood service"),
    "mutation:no-resident-service"
  );
  assert.equal(result.checks.find((check) => check.id === "resident-service-delivery")?.pass, false);
  assert.equal(result.overall, "fail");
});

test("the evaluator rejects collective-credit and metric-boundary removal", () => {
  const mutation = resume
    .replace("with Richard Caceres", "")
    .replace("while preserving collective credit and sensitive boundaries", "")
    .replace("distinguish these activity counts", "describe these activity counts");
  const result = evaluateResume(mutation, "mutation:claim-safety");
  assert.equal(
    result.checks.find((check) => check.id === "collective-credit-and-claim-safety")?.pass,
    false
  );
  assert.equal(result.overall, "fail");
});
