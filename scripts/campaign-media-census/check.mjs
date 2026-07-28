#!/usr/bin/env node

import { evaluateCampaignMediaCensus } from "./lib.mjs";

const result = evaluateCampaignMediaCensus();
if (result.errors.length) {
  console.error("Campaign media census check failed:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

const { researchScope } = result.data;
console.log(
  `Campaign media census passed: ${researchScope.totalDistinctWorks} distinct works, ` +
    `${researchScope.photoEntries} photo entries, ${researchScope.unreadableWorks} explicit unreadable gaps.`
);
