#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  contractDigest,
  evaluateCompositeStopCondition,
  governedFiles,
  governedInputDigest,
  loadCompositeRunRecords,
  loadEvalContract,
  repoRoot
} from "./lib/eval-contract.mjs";

const contract = loadEvalContract();
const runs = loadCompositeRunRecords();
const stop = evaluateCompositeStopCondition(runs, contract);
const lines = [
  "# Composite evaluation report",
  "",
  `- Contract: \`${contract.id}\` v${contract.version}`,
  `- Contract digest: \`${contractDigest(contract)}\``,
  `- Governed input digest: \`${governedInputDigest(contract)}\``,
  `- Governed files: ${governedFiles(contract).length}`,
  `- Deterministic passes: ${stop.deterministicPasses}`,
  `- Independent holdouts: ${stop.independentHoldouts}`,
  `- Unchanged candidate: ${stop.unchangedCandidate ? "yes" : "no"}`,
  `- Accepted for review: ${stop.acceptedForReview ? "yes" : "no"}`,
  `- External gates open: ${stop.externalGatesOpen ? "yes" : "no"}`,
  "",
  "## Runs",
  "",
  ...runs.map(({ file, record }) => `- \`${record.id}\`: ${record.judge?.class}; ${record.decision?.status}${record.decision?.weightedScore ? `; score ${record.decision.weightedScore}` : ""}; \`${file}\``),
  "",
  "Acceptance for review is not production approval. Jamie retains final truth, consent, and promotion authority.",
  ""
];
const outputPath = path.join(repoRoot, "reports/generated/composite-evals.md");
mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, lines.join("\n"));
console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
