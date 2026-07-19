#!/usr/bin/env node

import { evaluateParticipationContinuity } from "./lib/participation-continuity-eval.mjs";

const result = evaluateParticipationContinuity();

for (const criterion of result.criteria) {
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.description}`);
  console.log(`  ${criterion.evidence}`);
}

console.log(`\n${result.passedPoints}/${result.totalPoints} participation-continuity points passed.`);

if (!result.pass) process.exitCode = 1;
