import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateTeamMemoryProposal,
  loadTeamMemoryProposalCandidate,
  repoRoot
} from "./team-memory-proposal-eval.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function assertPublicSafeModelResult(result, readerName) {
  if (!readerName) {
    throw new Error("The protected runtime reader identity is required to audit the model result.");
  }
  if (JSON.stringify(result).toLowerCase().includes(readerName.toLowerCase())) {
    throw new Error("The model result repeats the protected runtime reader identity and cannot be committed.");
  }
}

function main() {
  const metadataPath = arg("--metadata");
  const resultPath = arg("--result");
  const readerName = process.env.TEAM_MEMORY_RUNTIME_READER_NAME;
  if (!metadataPath || !resultPath || !readerName) {
    throw new Error("Usage: TEAM_MEMORY_RUNTIME_READER_NAME=<protected runtime value> node record-team-memory-reader-run.mjs --metadata <metadata json> --result <model result json>");
  }

  const candidate = loadTeamMemoryProposalCandidate(repoRoot);
  const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  const result = JSON.parse(readFileSync(resultPath, "utf8"));
  assertPublicSafeModelResult(result, readerName);
  const run = {
    id: "team-memory-proposal-reader-2026-08-21",
    schemaVersion: 1,
    status: "complete",
    evaluatedAt: new Date().toISOString(),
    ...metadata,
    result,
    boundary:
      "This is an independent model simulation of an explicitly fictionalized public-page reader lens. The named person did not participate or endorse Jamie; a pass is not budget authorization, a contract, or a promise of work."
  };
  const proposed = { ...candidate, run };
  const evaluated = evaluateTeamMemoryProposal(proposed);
  if (!evaluated.passed) {
    throw new Error(`Result cannot be recorded:\n${evaluated.failures.join("\n")}`);
  }
  writeFileSync(
    path.join(repoRoot, candidate.config.currentRunPath),
    `${JSON.stringify(run, null, 2)}\n`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
