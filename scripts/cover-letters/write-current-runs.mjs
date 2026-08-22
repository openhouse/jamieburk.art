import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { currentRunSnapshot, evaluateCoverLetterPortfolio } from "./evaluate-cover-letter-portfolio.mjs";
import { planCoverLetterReaderCalls } from "./plan-hiring-reader-llm.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outputs = [
  {
    path: "evals/cover-letters/runs/2026-08-20-cover-letter-preflight.json",
    value: currentRunSnapshot(evaluateCoverLetterPortfolio())
  },
  {
    path: "evals/cover-letters/runs/2026-08-20-cover-letter-model-plan.json",
    value: planCoverLetterReaderCalls()
  }
];

for (const output of outputs) {
  const absolutePath = path.join(repoRoot, output.path);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(output.value, null, 2)}\n`);
  console.log(output.path);
}
