#!/usr/bin/env node

import { runHiringAcceptance, writeHiringReports } from "./lib.mjs";

const result = runHiringAcceptance();
const outputs = writeHiringReports(result);

console.log(`Wrote hiring reports to ${outputs.outputRoot}`);
console.log(`Wrote role coverage reports to ${outputs.coverageRoot}`);
if (result.issues.length) {
  console.error(`Reports preserve ${result.issues.length} unresolved machine issue(s).`);
  process.exit(1);
}
