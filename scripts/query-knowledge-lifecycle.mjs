#!/usr/bin/env node

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseNamedArgs, queryKnowledgeBank } from "./lib/knowledge-tools.mjs";

const args = parseNamedArgs(process.argv.slice(2));
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routeBindings = JSON.parse(
  readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/policies/projection-surface-bindings.json"),
    "utf8"
  )
).routes;
const result = queryKnowledgeBank(knowledgeBank, {
  project: args.project,
  entity: args.entity,
  date: args.date,
  evidenceRole: args["evidence-role"],
  claimStatus: args["claim-status"],
  surface: args.surface ?? args.destination,
  audience: args.audience,
  purpose: args.purpose,
  routeBindings,
  publicationSafe: args["publication-safe"] === true || args["publication-safe"] === "true"
});

console.log(JSON.stringify(result, null, 2));
