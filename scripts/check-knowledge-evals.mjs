#!/usr/bin/env node

import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "./lib/knowledge-evals.mjs";
import {
  evaluate as evaluateProfessionalRecord,
  loadCandidate as loadProfessionalRecordCandidate
} from "./knowledge-wiki/public-record-source-edition-eval.mjs";

const suite = loadKnowledgeEvalSuite();
const result = evaluateKnowledgeBank(suite);

if (!result.accepted) {
  console.error(`Knowledge-bank eval failed at ${result.weightedScore}/5.`);
  for (const id of result.belowMinimum) console.error(`- Below minimum: ${id}`);
  for (const error of result.errors) console.error(`- ${error}`);
  if (!result.holdout.complete) {
    console.error(`- Independent holdout passes: ${result.holdout.consecutivePassingRuns}/${result.holdout.requiredConsecutivePassingRuns}`);
  }
  process.exit(1);
}

console.log(`Knowledge-bank eval passed: ${result.weightedScore}/5 across ${result.criteria.length} criteria and ${result.holdout.consecutivePassingRuns}/${result.holdout.requiredConsecutivePassingRuns} consecutive independent holdouts.`);

const professionalRecordResult = evaluateProfessionalRecord(
  loadProfessionalRecordCandidate()
);

if (!professionalRecordResult.passed) {
  console.error("Professional-record integration eval failed:");
  for (const failure of professionalRecordResult.failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Professional-record integration eval passed: ${professionalRecordResult.metrics.records} records, ${professionalRecordResult.metrics.canonicalReferences} canonical references, and ${professionalRecordResult.metrics.publicCoverageGaps} governed gaps.`
);
