#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { intakeReceiptSchema } from "../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeLifecycleReport, validateIntakeReceipts, validateKnowledgeLifecycle } from "./lib/knowledge-lifecycle-validation.mjs";
import { renderProjectionMap } from "./lib/projection-map.mjs";

const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8").split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
const failures = [...validateKnowledgeLifecycle(), ...validateIntakeReceipts(receipts)];
if (readFileSync("docs/knowledge-bank/projection-map.md", "utf8") !== renderProjectionMap()) {
  failures.push("Projection map is stale; run npm run generate:projection-map");
}
if (failures.length) {
  console.error("Knowledge lifecycle check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Knowledge lifecycle check passed:");
console.log(JSON.stringify(knowledgeLifecycleReport(), null, 2));
