#!/usr/bin/env node

import {
  evaluateCommercialRentAdvocacy,
  loadCommercialRentAdvocacyCandidate
} from "./lib/commercial-rent-advocacy-eval.mjs";

const result = evaluateCommercialRentAdvocacy(loadCommercialRentAdvocacyCandidate());

if (!result.accepted) {
  console.error(`Commercial-rent advocacy eval failed: ${result.failed.join(", ")}`);
  process.exit(1);
}

console.log(
  `Commercial-rent advocacy eval passed: ${result.criteria.length}/${result.criteria.length} hard gates; ` +
  `${result.metrics.sources} sources, ${result.metrics.observations} observations, ` +
  `${result.metrics.claims} claims, ${result.metrics.relations} agency relation, ` +
  `${result.metrics.inquiries} inquiries, and no active projections.`
);
