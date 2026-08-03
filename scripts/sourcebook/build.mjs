#!/usr/bin/env node

import { compileSourcebook, defaultRepoRoot, writeSourcebookOutputs } from "./lib.mjs";

const result = compileSourcebook({ repoRoot: defaultRepoRoot });
if (result.issues.length) {
  console.error("Sourcebook build failed:");
  for (const failure of result.issues) console.error(`- ${failure.code}: ${failure.message}`);
  process.exit(1);
}

writeSourcebookOutputs(defaultRepoRoot, result.outputs);
console.log(
  `Sourcebook build wrote ${Object.keys(result.outputs).length} deterministic outputs for ${result.catalog.records.length} records.`
);
