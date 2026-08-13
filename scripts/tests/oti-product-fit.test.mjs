import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateOtiProductFit } from "../check-oti-product-fit.mjs";
import {
  fingerprintProfessorCandidate,
  professorCandidateRelativePaths
} from "../lib/professor-lens-eval.mjs";

test("exact-candidate OTI product fit passes", () => {
  const result = evaluateOtiProductFit();
  assert.equal(result.pass, true, JSON.stringify(result.failures, null, 2));
});

test("a weaker first-viewport proposition fails closed", () => {
  const path = "apps/www/src/components/Hero.tsx";
  const source = readFileSync(path, "utf8").replace(
    "Product leadership for public-facing systems.",
    "Selected work."
  );
  const result = evaluateOtiProductFit(process.cwd(), { [path]: source });
  assert.equal(result.pass, false);
  assert(result.failures.some((failure) => failure.includes("public-product proposition")));
});

test("a photo production authorization regression fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'production: "approved",',
    'production: "open",'
  );
  const result = evaluateOtiProductFit(process.cwd(), { [path]: source });
  assert.equal(result.pass, false);
  assert(result.failures.some((failure) => failure.includes("production and indexing authorization")));
});

test("a holdout scorecard bound to another candidate fails closed", () => {
  const path = "docs/qa/launch-C/oti-product-fit-final-a.json";
  const scorecard = JSON.parse(readFileSync(path, "utf8"));
  scorecard.candidateSha256 = "0".repeat(64);
  const result = evaluateOtiProductFit(process.cwd(), {
    [path]: JSON.stringify(scorecard)
  });
  assert.equal(result.pass, false);
  assert(result.failures.some((failure) => failure.includes("three independent PR-017 holdouts")));
});

test("the OTI gate fingerprints binary candidate files as raw bytes", () => {
  const expected = fingerprintProfessorCandidate(Object.fromEntries(
    professorCandidateRelativePaths.map((path) => [path, readFileSync(path)])
  ));
  const result = evaluateOtiProductFit();
  assert.equal(result.candidateSha256, expected);
});
