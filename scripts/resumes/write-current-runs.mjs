import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  currentRunSnapshot as hiringSnapshot,
  evaluateHiringReaderPortfolio
} from "./evaluate-hiring-reader-portfolio.mjs";
import {
  currentRunSnapshot as pdfSnapshot,
  evaluateResumePdfPortfolio
} from "./evaluate-resume-pdf-portfolio.mjs";
import {
  currentRunSnapshot as selectionSnapshot,
  selectPublicResume
} from "./select-public-resume.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const outputs = [
  {
    path: "evals/resumes/runs/2026-08-20-public-resume-selection.json",
    value: selectionSnapshot(selectPublicResume())
  },
  {
    path: "evals/resumes/runs/2026-08-20-hiring-reader-resume-preflight.json",
    value: hiringSnapshot(evaluateHiringReaderPortfolio())
  },
  {
    path: "evals/resumes/runs/2026-08-20-resume-pdf-portfolio-lifecycle-public.json",
    value: pdfSnapshot(evaluateResumePdfPortfolio())
  }
];

for (const output of outputs) {
  const absolutePath = path.join(repoRoot, output.path);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(output.value, null, 2)}\n`);
  console.log(output.path);
}
