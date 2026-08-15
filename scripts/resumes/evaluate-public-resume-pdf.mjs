import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateResumePdf } from "./evaluate-tailored-resume-pdf.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const specPath = path.join(
  repoRoot,
  "evals/resumes/artifacts/public-technical-project-manager-pdf.json"
);

export const publicResumeSpec = JSON.parse(readFileSync(specPath, "utf8"));

export function evaluatePublicResumePdf(options = {}) {
  return evaluateResumePdf({ spec: publicResumeSpec, ...options });
}

function main() {
  const result = evaluatePublicResumePdf();
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
