#!/usr/bin/env node

import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "./lib/knowledge-evals.mjs";

const suite = loadKnowledgeEvalSuite();
const result = evaluateKnowledgeBank(suite);

if (!result.accepted) {
  console.error(`Knowledge-bank eval failed at ${result.weightedScore}/5.`);
  for (const id of result.belowMinimum) console.error(`- Below minimum: ${id}`);
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Knowledge-bank eval passed: ${result.weightedScore}/5 across ${result.criteria.length} criteria.`);
