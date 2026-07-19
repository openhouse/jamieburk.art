#!/usr/bin/env node

import { pathToFileURL } from "node:url";
import {
  readCompositeArtifacts,
  validateCompositeArtifacts
} from "./lib/knowledge-composite-validation.mjs";

export function runCompositeCheck({ requireHoldouts = true } = {}) {
  const result = validateCompositeArtifacts(readCompositeArtifacts(), { requireHoldouts });
  if (result.errors.length) {
    console.error("Knowledge composite eval validation failed:");
    result.errors.forEach((error) => console.error(`- ${error}`));
    return { ...result, passed: false };
  }
  console.log(
    `Knowledge composite evals passed: weighted score ${result.weightedScore.toFixed(3)}, ` +
      `contract ${result.expectedContractFingerprint.slice(0, 12)}, ` +
      `candidate ${result.expectedCandidateFingerprint.slice(0, 12)}.`
  );
  return { ...result, passed: true };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = runCompositeCheck();
  if (!result.passed) process.exit(1);
}
