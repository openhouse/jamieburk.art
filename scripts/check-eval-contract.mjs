#!/usr/bin/env node
import {
  evaluateCompositeStopCondition,
  loadCompositeRunRecords,
  loadEvalContract,
  validateCompositeHistory
} from "./lib/eval-contract.mjs";

const contract = loadEvalContract();
const runs = loadCompositeRunRecords();
const errors = validateCompositeHistory(runs, contract);
const stop = evaluateCompositeStopCondition(runs, contract);
if (runs.length === 0) errors.push("no composite run records exist");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Composite eval contract ${contract.version} is structurally valid.`);
console.log(`Certification status: ${stop.acceptedForReview ? "accepted-for-review" : "incomplete"} ${JSON.stringify(stop)}`);
