#!/usr/bin/env node

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { buildKnowledgeReport, validateKnowledgeOperations } from "./lib/knowledge-operations.mjs";

const validation = validateKnowledgeOperations(knowledgeBank);
if (process.argv.includes("--check")) {
  if (!validation.passed) {
    for (const error of validation.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(validation.evidence);
} else {
  console.log(JSON.stringify(buildKnowledgeReport(knowledgeBank), null, 2));
}
