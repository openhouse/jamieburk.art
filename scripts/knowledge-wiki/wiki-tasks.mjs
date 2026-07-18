#!/usr/bin/env node

import { readFileSync } from "node:fs";

import { defaultRepoRoot } from "./lib.mjs";

const taskPath = `${defaultRepoRoot}/docs/knowledge-bank/evaluations/retrieval-tasks.md`;
console.log(readFileSync(taskPath, "utf8"));
console.log("\nHuman task results remain unobserved until a fresh reader actually performs them.");
