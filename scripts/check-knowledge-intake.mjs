#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateIntakeQueue } from "./lib/knowledge-intake-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const result = validateIntakeQueue(repoRoot);
for (const failure of result.failures) console.error("FAIL " + failure);
if (result.failures.length) process.exit(1);
console.log("Knowledge intake queue passed: " + result.queue.length + " pending public-safe lead(s).");

