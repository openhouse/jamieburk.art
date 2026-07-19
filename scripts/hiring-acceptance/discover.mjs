#!/usr/bin/env node

import { loadHiringContext, rankOpportunities } from "./lib.mjs";

const query = process.argv.slice(2).join(" ").trim();
if (!query) {
  console.error('Usage: npm run hiring:discover -- "capability and environment description"');
  process.exit(1);
}

const context = loadHiringContext();
const ranked = rankOpportunities(context.opportunities, query);
for (const result of ranked) {
  console.log(`${result.score}\t${result.opportunityId}\t${result.matchedTerms.join(", ")}`);
}
