#!/usr/bin/env node

import {
  loadLaunchEvalSuite,
  runSourceChecks,
  validateLaunchEvalSuite
} from "./lib/launch-evals.mjs";

const suite = loadLaunchEvalSuite();
const failures = [...validateLaunchEvalSuite(suite), ...runSourceChecks(suite)];

if (failures.length) {
  console.error("Launch-readiness eval check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Launch-readiness eval check passed: ${suite.hardGates.length} hard gates, ` +
    `${suite.runtimeCases.length} runtime cases, and ` +
    `${suite.judgeCriteria.length} weighted criteria.`
);
