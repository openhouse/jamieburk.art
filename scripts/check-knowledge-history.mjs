#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateAppendOnlyGitHistory } from "./lib/knowledge-history.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const relativePath = "docs/knowledge-bank/lifecycle/history.jsonl";
const findings = validateAppendOnlyGitHistory(repoRoot, relativePath);

if (findings.length) {
  console.error("Knowledge history check failed:");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log("Knowledge history is valid and append-only.");
