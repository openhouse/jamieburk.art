#!/usr/bin/env node

import { validateNYCACFacebookPosts } from
  "./lib/nycac-facebook-posts-validation.mjs";

const result = validateNYCACFacebookPosts();

for (const [name, check] of Object.entries(result.checks)) {
  console.log(`${check.passed ? "PASS" : "FAIL"}\t${name}\t${check.evidence}`);
  for (const error of check.errors) console.log(`  - ${error}`);
}

if (!result.passed) process.exit(1);
