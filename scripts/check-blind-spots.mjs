#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateBlindSpotControls,
  readJson,
  resultsAreGreen
} from "./lib/composite-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const controlPlane = readJson(repoRoot, "docs/qa/eval-control-plane-M.json");
const rubric = readJson(repoRoot, "docs/qa/blind-spot-readiness-M.json");

const protocolTexts = Object.fromEntries(
  controlPlane.humanProtocolPaths.map((relativePath) => [
    relativePath,
    existsSync(path.join(repoRoot, relativePath))
      ? readFileSync(path.join(repoRoot, relativePath), "utf8")
      : ""
  ])
);

const results = evaluateBlindSpotControls({
  rubric,
  controlPlane,
  protocolTexts
});

console.log(`Blind-spot readiness eval: ${results.filter((item) => item.pass).length}/${results.length}`);
for (const result of results) {
  console.log(
    `${result.pass ? "PASS" : "FAIL"} ${result.id}: ${result.criterion ?? "missing criterion"}`
  );
}

if (!resultsAreGreen(results)) {
  console.error(
    "Blind-spot controls are incomplete. Add or repair the protocol; do not invent the human outcome."
  );
  process.exit(1);
}

console.log("Blind-spot readiness criterion met; open outcomes remain explicitly pending.");
