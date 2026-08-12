#!/usr/bin/env node

import {
  checkSourcebookOutputs,
  compileSourcebook,
  defaultRepoRoot
} from "./lib.mjs";

const result = compileSourcebook({ repoRoot: defaultRepoRoot });
const failures = [...result.issues];
if (!failures.length) {
  for (const message of checkSourcebookOutputs(defaultRepoRoot, result.outputs)) {
    failures.push({ code: "GENERATED_OUTPUT", message });
  }
}

if (failures.length) {
  console.error("Sourcebook check failed:");
  for (const failure of failures) console.error(`- ${failure.code}: ${failure.message}`);
  process.exit(1);
}

const publicExport = JSON.parse(result.outputs["sourcebook/public-export.json"]);
console.log(
  `Sourcebook check passed: ${result.catalog.records.length}/${result.catalog.pilot.eligibleCount} records, ${Object.keys(result.outputs).length} outputs, fingerprint ${publicExport.exportFingerprint}.`
);
