#!/usr/bin/env node

import { validateKnowledgeIntake } from "./lib/knowledge-intake-validation.mjs";

const result = validateKnowledgeIntake();

if (result.errors.length) {
  console.error("Knowledge-intake check failed:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

for (const [name, check] of Object.entries(result.checks)) {
  console.log(`PASS\t${name}\t${check.evidence}`);
}

console.log("Knowledge-intake check passed.");
