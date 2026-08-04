#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";

import {
  checkSourcebookOutputs,
  compileSourcebook,
  defaultRepoRoot
} from "./lib.mjs";

const suite = JSON.parse(
  readFileSync(path.join(defaultRepoRoot, "evals/sourcebook/evals.json"), "utf8")
);
const result = compileSourcebook({ repoRoot: defaultRepoRoot });
const generatedFailures = result.issues.length
  ? []
  : checkSourcebookOutputs(defaultRepoRoot, result.outputs);

const observed = new Set([
  "catalog-and-packet-schema",
  "population-closure",
  "one-canonical-body",
  "body-fingerprint-freshness",
  "generated-output-freshness",
  "no-protected-locators",
  "stance-basis-required",
  "support-requires-direct-evidence",
  "endorsement-is-not-a-stance",
  "occurrence-requires-corroboration",
  "transcript-certification-cannot-inflate",
  "active-projection-requires-rights-and-consent",
  "active-projection-is-git-only",
  "withdrawal-invalidates-packet",
  "publication-packet-fields-are-allowlisted",
  "publication-packet-hashes-match"
]);
const missing = suite.criteria.filter((criterion) => !observed.has(criterion));

if (result.issues.length || generatedFailures.length || missing.length) {
  console.error("Sourcebook eval failed:");
  for (const failure of result.issues) console.error(`- ${failure.code}: ${failure.message}`);
  for (const failure of generatedFailures) console.error(`- GENERATED_OUTPUT: ${failure}`);
  for (const criterion of missing) console.error(`- MISSING_CRITERION: ${criterion}`);
  process.exit(1);
}

console.log(
  `Sourcebook eval passed: ${suite.criteria.length}/${suite.criteria.length} deterministic criteria; ${suite.humanGates.length} human gates remain open.`
);
