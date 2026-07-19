#!/usr/bin/env node

import { loadWiki, validateWiki } from "./lib.mjs";

const records = loadWiki();
const result = validateWiki(records);

if (result.errors.length) {
  console.error("Knowledge Wiki check failed:");
  for (const entry of result.errors) {
    console.error(`- ${entry.path}:${entry.line} [${entry.code}] ${entry.message}`);
  }
  process.exit(1);
}

console.log(
  `Knowledge Wiki check passed: ${result.metrics.records} records, ` +
    `${result.metrics.proseLinks} prose links, ${result.metrics.typedRelations} typed relations, ` +
    `${result.metrics.rootReachable}/${result.metrics.discoverable} root-reachable.`
);
console.log(
  `Diagnostics: ${result.metrics.intentionalLeaves.length} intentional leaves, ` +
    `${result.metrics.deadEnds.length} dead ends, ${result.metrics.wantedPages.length} wanted record, ` +
    `${result.metrics.rightsBacklog.length} rights hold.`
);
