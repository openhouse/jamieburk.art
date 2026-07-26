#!/usr/bin/env node

import { evaluatePhotoKnowledge } from "./lib.mjs";

const evaluation = evaluatePhotoKnowledge();

console.log("Living photographic knowledge loop");
for (const [id, passed] of Object.entries(evaluation.checks)) {
  console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
}
console.log(
  `Records: ${evaluation.counts.records}; statements: ${evaluation.counts.statements}; edition occurrences: ${evaluation.counts.occurrences}.`
);
console.log(`Status: ${evaluation.status}`);

if (!evaluation.passed) {
  console.error(`Photo knowledge check failed: ${evaluation.failures.join(", ")}`);
  process.exit(1);
}
