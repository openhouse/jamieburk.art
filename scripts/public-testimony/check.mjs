#!/usr/bin/env node

import { evaluateTestimonyCorpora } from "./lib.mjs";

const result = evaluateTestimonyCorpora();
if (result.errors.length) {
  console.error("Public testimony corpus check failed:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Public testimony corpus passed: ${result.corpora.length} hearings, ` +
    `${result.supportivePopulation} supportive or partly supportive speakers with full text.`
);
