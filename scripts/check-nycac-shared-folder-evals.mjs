#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runNyCACSharedFolderGuard } from "./lib/nycac-shared-folder-guard.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suite = JSON.parse(readFileSync(path.join(repoRoot, ".agents/evals/nycac-shared-folder.json"), "utf8"));
const errors = [];

if (suite.version !== 1) errors.push("suite version must be 1");
if (suite.suite_id !== "nycac-shared-folder-archival-production") errors.push("suite id is invalid");
if (!Array.isArray(suite.evals) || suite.evals.length !== 10) errors.push("suite must contain ten evals");
const ids = new Set();
for (const entry of suite.evals ?? []) {
  if (!/^NYCAC-SF-\d{3}$/.test(entry.id ?? "")) errors.push(`invalid eval id: ${entry.id}`);
  if (ids.has(entry.id)) errors.push(`duplicate eval id: ${entry.id}`);
  ids.add(entry.id);
  if (entry.blocking !== true) errors.push(`${entry.id} must remain blocking`);
  if (!Array.isArray(entry.pass_criteria) || entry.pass_criteria.length < 2) errors.push(`${entry.id} requires pass criteria`);
}
if (suite.optimization?.two_consecutive_unchanged_passing_runs_required !== true) {
  errors.push("suite must require two consecutive unchanged passing runs");
}
errors.push(...runNyCACSharedFolderGuard(repoRoot));

if (errors.length) {
  console.error("NYC Artist Coalition shared-folder evals failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`NYC Artist Coalition shared-folder evals passed: ${suite.evals.length} blocking criteria.`);
