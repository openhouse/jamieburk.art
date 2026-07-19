#!/usr/bin/env node

import { compileWiki, formatFailures, writeArtifacts } from "./lib.mjs";

const result = compileWiki();
const files = writeArtifacts(result);

console.log(`Wrote ${files.join(", ")}.`);
console.log(
  `Health: ${result.health.hardFailures.length} hard failure(s), ${result.health.warnings.length} warning(s).`
);

if (result.health.hardFailures.length) {
  for (const line of formatFailures(result.health.hardFailures)) console.error(`- ${line}`);
  process.exit(1);
}
