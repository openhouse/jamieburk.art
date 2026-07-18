#!/usr/bin/env node

import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { loadIntakeQueue, queryKnowledgeBank } from "./lib/knowledge-intake-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if (process.argv.includes("--help")) {
  console.log("Usage: npm run knowledge:query -- [--query TEXT] [--project ID] [--status STATUS] [--kind KIND] [--limit N] [--publication-safe --surface ROUTE]");
  process.exit(0);
}
const values = parseArgs({
  options: {
    query: { type: "string" },
    project: { type: "string" },
    status: { type: "string" },
    kind: { type: "string" },
    limit: { type: "string" },
    surface: { type: "string" },
    "publication-safe": { type: "boolean", default: false }
  }
}).values;
const queue = loadIntakeQueue(repoRoot);
const result = queryKnowledgeBank({
  query: values.query,
  project: values.project,
  status: values.status,
  kind: values.kind,
  limit: values.limit ? Number(values.limit) : 100,
  surface: values.surface,
  publicationSafe: values["publication-safe"]
}, queue);
console.log(JSON.stringify(result, null, 2));

