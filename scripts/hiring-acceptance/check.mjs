#!/usr/bin/env node

import { runHiringAcceptance } from "./lib.mjs";

const result = runHiringAcceptance();
const criteriaTotal = result.context.rubric.machineCriteria.length;
const criteriaPassed = result.issues.length === 0 ? criteriaTotal : 0;

console.log(`Hiring acceptance: ${criteriaPassed}/${criteriaTotal} machine criteria`);
console.log(`Tier 1 opportunities: ${result.context.opportunities.length}/${result.context.suite.opportunityIds.length}`);
console.log(`Contract hash: ${result.contractHash}`);
console.log(`Public candidate hash: ${result.candidate.candidateHash}`);
console.log(`Target critical signal recall: ${Math.round((result.assessment?.criticalSignalRecall ?? 0) * 100)}%`);
console.log(`Human reader state: ${result.context.suite.humanReaderState}`);
console.log(`External outcome state: ${result.context.suite.externalOutcomeState}`);

for (const item of result.issues) {
  console.error(`FAIL ${item.code} ${item.location}: ${item.message}`);
}

if (result.issues.length) process.exit(1);

console.log("Hiring acceptance machine criteria met. Human review and real hiring outcomes remain open.");
