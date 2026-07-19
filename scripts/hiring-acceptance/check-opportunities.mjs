#!/usr/bin/env node

import { loadHiringContext, validateHiringContext } from "./lib.mjs";

const result = validateHiringContext(loadHiringContext());
if (result.errors.length) {
  console.error("Hiring acceptance context failed:");
  for (const error of result.errors) {
    console.error(`- ${error.path} [${error.code}] ${error.message}`);
  }
  process.exit(1);
}

console.log(
  `Hiring context passed: ${result.metrics.opportunities} current opportunities, ` +
    `${result.metrics.requirements} stable requirements, ${result.metrics.readers} reader contexts.`
);
console.log(
  `Title-blind top-K recall: ${result.metrics.titleBlindTopKRecall}; ` +
    `${result.metrics.negativeControlsRejected} negative controls rejected.`
);
