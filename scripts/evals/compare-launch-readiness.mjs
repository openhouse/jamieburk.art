#!/usr/bin/env node

import path from "node:path";
import { compareObjective, readJson } from "./lib/launch-readiness.mjs";

const [beforePath, afterPath] = process.argv.slice(2);
if (!beforePath || !afterPath) {
  console.error("Usage: node scripts/evals/compare-launch-readiness.mjs before.json after.json");
  process.exit(2);
}

const comparison = compareObjective(
  readJson(path.resolve(beforePath)),
  readJson(path.resolve(afterPath))
);

console.log(JSON.stringify(comparison, null, 2));
if (!comparison.accepted) process.exit(1);
