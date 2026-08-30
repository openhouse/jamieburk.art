import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateInternalChampion,
  loadInternalChampionCandidate,
  repoRoot
} from "./team-memory-internal-champion-eval.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function assertPublicSafeInternalChampionResult(result) {
  const serialized = JSON.stringify(result);
  if (/Jonathan Marmor|\/Users\/|\/Volumes\/|private transcript|company identity/i.test(serialized)) {
    throw new Error("The result repeats a protected identity or locator.");
  }
  if (
    result.actualPeopleParticipated !== false ||
    result.actualCompanyDecision !== false
  ) {
    throw new Error("The result misstates real-person participation or company authorization.");
  }
}

function main() {
  const metadataPath = arg("--metadata");
  const resultPath = arg("--result");
  if (!metadataPath || !resultPath) {
    throw new Error(
      "Usage: node record-team-memory-internal-champion-run.mjs --metadata <metadata json> --result <model result json>"
    );
  }

  const candidate = loadInternalChampionCandidate();
  const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  const result = JSON.parse(readFileSync(resultPath, "utf8"));
  assertPublicSafeInternalChampionResult(result);

  const run = {
    id: "team-memory-internal-champion-hiring-2026-08-21",
    schemaVersion: 1,
    status: "complete",
    evaluatedAt: new Date().toISOString(),
    reviewMethod: "isolated-browser-packet-model-simulation",
    ...metadata,
    result,
    boundary:
      "This is an uncalibrated fictionalized model simulation. The real people did not participate, review the result, endorse Jamie, authorize budget, make an offer, or enter a contract."
  };
  const evaluated = evaluateInternalChampion({ ...candidate, run });
  if (!evaluated.passed) {
    throw new Error(`Result cannot be recorded:\n${evaluated.failures.join("\n")}`);
  }

  writeFileSync(
    path.join(repoRoot, candidate.config.currentRunPath),
    `${JSON.stringify(run, null, 2)}\n`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
