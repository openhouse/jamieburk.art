import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateLayoutPhotography } from "./lib/layout-photography-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const result = evaluateLayoutPhotography({ repoRoot });

for (const criterion of result.criteria) {
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.detail}`);
}

if (!result.pass) {
  console.error(`Layout photography eval failed: ${result.passed}/${result.total} criteria passed.`);
  process.exit(1);
}

console.log(`Layout photography eval passed: ${result.passed}/${result.total} criteria passed.`);
console.log("Machine pass is not production publication clearance; the human gate remains required.");
