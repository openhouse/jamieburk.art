#!/usr/bin/env node

import { validateNYCACFacebookPosts } from
  "./lib/nycac-facebook-posts-validation.mjs";

const weights = {
  population: 20,
  integrity: 10,
  minimization: 15,
  sourceRouting: 15,
  mission: 10,
  traction: 10,
  lifecycle: 15,
  composition: 5,
};

const result = validateNYCACFacebookPosts();
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

console.log(`\nNYC Artist Coalition Facebook post archive score: ${score}/100`);

if (!result.passed || score !== 100) process.exit(1);
