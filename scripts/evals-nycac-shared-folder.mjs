#!/usr/bin/env node

import { evaluateNycacSharedFolder } from "./lib/nycac-shared-folder-eval.mjs";

const result = evaluateNycacSharedFolder();

for (const criterion of result.criteria) {
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.description}`);
  console.log(`  ${criterion.evidence}`);
}

console.log(`\n${result.passedPoints}/${result.totalPoints} NYC Artist Coalition shared-folder points passed.`);

if (!result.pass) process.exitCode = 1;
