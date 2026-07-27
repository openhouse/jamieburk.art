import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildProfessorCandidateReceipt,
  professorCandidateReceiptPath
} from "./lib/professor-lens-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(repoRoot, professorCandidateReceiptPath);
const receipt = buildProfessorCandidateReceipt();

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);

console.log(
  `Professor candidate receipt written: ${receipt.candidateFileCount} files, ` +
    `${receipt.candidateSha256}.`
);
