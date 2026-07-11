import { execFileSync } from "node:child_process";
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";

execFileSync(process.execPath, ["scripts/generate-public-citations.mjs", "--check"], { stdio: "inherit" });
const errors = validateKnowledgeBank();
if (errors.length) {
  console.error("Citation validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Citation check passed: canonical records, public projection, boundaries, and page plans are consistent.");
