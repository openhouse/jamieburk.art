#!/usr/bin/env node

import {
  loadLaunchEvalSuite,
  loadLaunchEvalRunRecords,
  runSourceChecks,
  validateLaunchEvalRunRecord,
  validateLaunchEvalSuite
} from "./lib/launch-evals.mjs";

const suite = loadLaunchEvalSuite();
const runs = loadLaunchEvalRunRecords();
const runFailures = runs.flatMap(({ file, record }) =>
  validateLaunchEvalRunRecord(suite, record).map((failure) => `${file}: ${failure}`)
);
const failures = [
  ...validateLaunchEvalSuite(suite),
  ...runSourceChecks(suite),
  ...runFailures
];

if (failures.length) {
  console.error("Launch-readiness eval check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Launch-readiness eval check passed: ${suite.hardGates.length} hard gates, ` +
    `${suite.runtimeCases.length} runtime cases, and ` +
    `${suite.judgeCriteria.length} weighted criteria; ` +
    `${runs.length} machine-readable run records validated.`
);
