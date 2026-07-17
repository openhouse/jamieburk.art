#!/usr/bin/env node

import { validateFacebookEventsArchive } from
  "./lib/facebook-events-archive-validation.mjs";

const weights = {
  population: 20,
  minimization: 15,
  lifecycle: 15,
  selectedEvents: 15,
  wowList: 15,
  sourceRouting: 10,
  projection: 10
};

const result = validateFacebookEventsArchive();
let score = 0;

for (const [name, weight] of Object.entries(weights)) {
  const check = result.checks[name];
  const earned = check?.passed ? weight : 0;
  score += earned;
  console.log(
    `${check?.passed ? "PASS" : "FAIL"}\t${name}\t${earned}/${weight}\t${check?.evidence ?? "Missing check"}`
  );
  for (const error of check?.errors ?? []) console.log(`  - ${error}`);
}

console.log(`\nFacebook event archive score: ${score}/100`);

if (!result.passed || score !== 100) process.exit(1);

