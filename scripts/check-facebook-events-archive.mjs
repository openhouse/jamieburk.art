#!/usr/bin/env node

import { validateFacebookEventsArchive } from
  "./lib/facebook-events-archive-validation.mjs";

const result = validateFacebookEventsArchive();

if (!result.passed) {
  console.error("Facebook event archive validation failed:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Facebook event archive validation passed.");
for (const [name, check] of Object.entries(result.checks)) {
  console.log(`- ${name}: ${check.evidence}`);
}

