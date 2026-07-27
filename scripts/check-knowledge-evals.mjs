#!/usr/bin/env node

import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "./lib/knowledge-evals.mjs";

const suite = loadKnowledgeEvalSuite();
const result = evaluateKnowledgeBank(suite);

if (!result.accepted) {
  console.error(`Knowledge Wiki eval failed at ${result.weightedScore}/5.`);
  for (const id of result.belowMinimum) console.error(`- Below minimum: ${id}`);
  for (const error of result.errors) console.error(`- ${error}`);
  if (!result.holdout.complete) {
    console.error(`- Independent holdout passes: ${result.holdout.consecutivePassingRuns}/${result.holdout.requiredConsecutivePassingRuns}`);
  }
  process.exit(1);
}

console.log(`Knowledge Wiki eval passed: ${result.weightedScore}/5 across ${result.criteria.length} criteria and ${result.holdout.consecutivePassingRuns}/${result.holdout.requiredConsecutivePassingRuns} consecutive independent holdouts.`);
