#!/usr/bin/env node

import { resolveOpportunityGaps, writeArtifact } from "./lib.mjs";

const args = process.argv.slice(2);
const index = args.indexOf("--opportunity");
const opportunityId = index === -1 ? null : args[index + 1];
if (!opportunityId || args.includes("--help")) {
  console.log(
    "Usage: npm run eval:hiring:gaps -- --opportunity opportunity.nyc-oti.technical-operations-manager.782369\n" +
      "Runs after public-only evaluation and may inspect public-safe Wiki proof routing."
  );
  process.exit(opportunityId ? 0 : 2);
}

const result = resolveOpportunityGaps(opportunityId);
const path = writeArtifact(`gap-resolution/${opportunityId}.json`, result);
console.log(`Gap resolver found ${result.findings.length} non-proven or qualified signals.`);
console.log(path);
