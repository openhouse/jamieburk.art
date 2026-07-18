#!/usr/bin/env node

import {
  evaluatePortfolioEffectiveness,
  loadPortfolioEvalSuite
} from "./lib/portfolio-evals.mjs";

const { suite, evidence } = loadPortfolioEvalSuite();
const result = evaluatePortfolioEffectiveness(suite, evidence);

if (!result.accepted) {
  console.error(`Portfolio-effectiveness eval failed at ${result.weightedScore}/5.`);
  for (const id of result.belowMinimum) console.error(`- Below minimum: ${id}`);
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Portfolio-effectiveness eval passed at ${result.weightedScore}/5 across ` +
  `${result.criteria.length} criteria; ${result.externalGates.length} explicit external gate(s) remain.`
);
