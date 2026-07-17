#!/usr/bin/env node

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { queryKnowledgeBank } from "./lib/knowledge-operations.mjs";

const query = process.argv.slice(2).filter((argument) => argument !== "--json").join(" ");
if (!query) {
  console.error("Usage: npm run knowledge:query -- <stable ID, project, or search text>");
  process.exit(1);
}

const results = queryKnowledgeBank(knowledgeBank, query);
if (process.argv.includes("--json")) {
  console.log(JSON.stringify(results, null, 2));
} else if (!results.length) {
  console.log(`No public-safe knowledge records matched: ${query}`);
} else {
  for (const result of results) {
    console.log(`${result.id}\t${result.type}\t${result.state}\t${result.project}`);
    console.log(`  ${result.summary}`);
  }
}
