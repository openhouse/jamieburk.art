#!/usr/bin/env node

import { evaluatePhotoKnowledge } from "./photo-knowledge/lib.mjs";

const { evaluation } = await evaluatePhotoKnowledge();

if (!evaluation.passed) {
  console.error("Photo knowledge eval failed:");
  for (const id of evaluation.failedHardGates) console.error(`- hard gate: ${id}`);
  for (const id of evaluation.failedCriteria) console.error(`- criterion: ${id}`);
  for (const id of evaluation.unmappedHardGates) console.error(`- unmapped hard gate: ${id}`);
  process.exit(1);
}

console.log(
  `Photo knowledge eval passed: ${Object.keys(evaluation.checks).length} checks and ${Object.keys(evaluation.criteria).length} criteria.`
);
