#!/usr/bin/env node

import { validateWowListFacebookPosts } from
  "./lib/wowlist-facebook-posts-validation.mjs";

const result = validateWowListFacebookPosts();

if (!result.passed) {
  console.error("WOW List Facebook post validation failed:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("WOW List Facebook post validation passed.");
for (const [name, check] of Object.entries(result.checks)) {
  console.log(`- ${name}: ${check.evidence}`);
}
