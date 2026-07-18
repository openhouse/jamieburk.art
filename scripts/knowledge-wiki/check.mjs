#!/usr/bin/env node

import { compileWiki, formatFailures } from "./lib.mjs";

const result = compileWiki();

if (result.health.warnings.length) {
  console.warn("Knowledge Wiki diagnostic warnings:");
  for (const line of formatFailures(result.health.warnings)) console.warn(`- ${line}`);
}

if (result.health.hardFailures.length) {
  console.error("Knowledge Wiki check failed:");
  for (const line of formatFailures(result.health.hardFailures)) console.error(`- ${line}`);
  process.exit(1);
}

console.log(
  `Knowledge Wiki check passed: ${result.health.metrics.governedPages} governed pages, ` +
    `${result.health.metrics.typedRelations} typed relations, ` +
    `${result.health.metrics.reachableDiscoverablePages}/${result.health.metrics.discoverablePages} discoverable pages reachable.`
);
