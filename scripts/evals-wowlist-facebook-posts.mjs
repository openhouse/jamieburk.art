#!/usr/bin/env node

import { validateWowListFacebookPosts } from
  "./lib/wowlist-facebook-posts-validation.mjs";

const weights = {
  population: 25,
  minimization: 15,
  lifecycle: 15,
  sourceRouting: 15,
  engagement: 15,
  authorship: 10,
  projection: 5
};

const result = validateWowListFacebookPosts();
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

console.log(`\nWOW List Facebook post archive score: ${score}/100`);

if (!result.passed || score !== 100) process.exit(1);
