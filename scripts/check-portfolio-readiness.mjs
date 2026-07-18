#!/usr/bin/env node

import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { proofClaims } from "../apps/www/src/data/proofs.ts";
import { readJson, validateRunArtifacts } from "./lib/portfolio-readiness-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const parsed = parseArgs({
  options: {
    profile: { type: "string", default: "system-ready" },
    json: { type: "boolean", default: false }
  }
});
const values = parsed.values;
const evalRoot = path.join(repoRoot, "evals/portfolio-readiness");
const rubric = readJson(path.join(evalRoot, "rubric.json"));
const humanStatus = readJson(path.join(evalRoot, "human-status.json"));
const applicationArgument = readJson(path.join(evalRoot, "application-argument.json"));
const currentRun = readJson(path.join(evalRoot, "runs/current-run.json"));
const runRoot = path.join(evalRoot, "runs", currentRun.run);

let report;
try {
  report = validateRunArtifacts({
    repoRoot,
    runRoot,
    rubric,
    humanStatus,
    applicationArgument,
    proofIds: proofClaims.map(function (claim) { return claim.id; }),
    profileName: values.profile
  });
} catch (error) {
  console.error("Portfolio readiness check failed: " + error.message);
  process.exit(1);
}

if (values.json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("Composite portfolio readiness: " + report.machineState);
  console.log("Candidate: " + report.candidateRevision.slice(0, 12) + " / " + report.candidateDigest.slice(0, 12));
  console.log("Machine scores: " + report.machineScores.join(", "));
  console.log("Requested profile: " + report.profileName + " -> " + report.profileState);
  for (const failure of report.failures) console.error("FAIL " + failure);
  for (const blocker of report.humanBlockers) console.log("HUMAN " + blocker);
}

if (report.failures.length > 0) process.exit(1);
if (report.humanBlockers.length > 0) process.exit(2);

