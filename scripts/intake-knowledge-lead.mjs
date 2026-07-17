#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  appendLeadReceipt,
  createLeadReceipt,
  parseNamedArgs
} from "./lib/knowledge-tools.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = parseNamedArgs(process.argv.slice(2));

try {
  const receipt = createLeadReceipt({
    title: args.title,
    kind: args.kind,
    summary: args.summary,
    project: args.project,
    url: args.url,
    receivedAt: args["received-at"]
  });

  if (!args.write) {
    console.log(JSON.stringify({ mode: "dry-run", receipt }, null, 2));
    console.log("Dry run only. Re-run with --write after reviewing the public-safe receipt.");
  } else {
    const file = path.join(repoRoot, "docs/knowledge-bank/intake/receipts.jsonl");
    const result = appendLeadReceipt(file, receipt);
    console.log(JSON.stringify({ mode: "write", ...result, receipt }, null, 2));
  }
} catch (error) {
  console.error(`Knowledge intake rejected:\n${error.message}`);
  process.exit(1);
}
