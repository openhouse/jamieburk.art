#!/usr/bin/env node
import { loadCompositeRunRecords, loadEvalContract, validateCompositeHistory } from "./lib/eval-contract.mjs";

const records = loadCompositeRunRecords();
const errors = validateCompositeHistory(records, loadEvalContract());
if (records.length === 0) errors.push("no composite run records exist");
if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Composite run history passes structural validation across ${records.length} record(s).`);
