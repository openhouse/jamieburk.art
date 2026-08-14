#!/usr/bin/env node

import { compileWiki, writeGeneratedOutputs } from "./lib.mjs";

const result = compileWiki();
writeGeneratedOutputs(result, "report");

console.log(
  `Wiki reports generated: ${result.health.diagnostics.records} records, ${result.health.diagnostics.orphanCount} type-aware orphans, ${result.health.diagnostics.rightsReviewCount} rights-review item(s).`
);

if (result.errors.length) process.exitCode = 1;
