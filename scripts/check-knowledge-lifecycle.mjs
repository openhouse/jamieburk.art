#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { intakeReceiptSchema } from "../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeLifecycleReport, validateIntakeReceipts, validateKnowledgeLifecycle } from "./lib/knowledge-lifecycle-validation.mjs";

const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8").split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
const failures = [...validateKnowledgeLifecycle(), ...validateIntakeReceipts(receipts)];
if (failures.length) {
  console.error("Knowledge lifecycle check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Knowledge lifecycle check passed:");
console.log(JSON.stringify(knowledgeLifecycleReport(), null, 2));
