#!/usr/bin/env node

import { execFileSync } from "node:child_process";

import {
  defaultRepoRoot,
  evaluatePhotoKnowledge,
  renderPhotoReport,
  writeCandidateReceipt,
  writePhotoReports
} from "./lib.mjs";

const command = process.argv[2] ?? "check";
const { model, evaluation } = await evaluatePhotoKnowledge(defaultRepoRoot);

if (command === "check" || command === "manifest" || command === "curatorial-check") {
  console.log(`Photo knowledge ${command}: ${evaluation.passed ? "PASS" : "FAIL"}`);
  if (evaluation.failedHardGates.length) {
    console.error(`Failed hard gates: ${evaluation.failedHardGates.join(", ")}`);
  }
  if (evaluation.failedCriteria.length) {
    console.error(`Failed criteria: ${evaluation.failedCriteria.join(", ")}`);
  }
  process.exit(evaluation.passed ? 0 : 1);
}

if (command === "report") {
  const outputs = writePhotoReports(model, evaluation);
  console.log(`Generated ${outputs.length} photo knowledge report(s).`);
  process.exit(evaluation.passed ? 0 : 1);
}

if (["placements", "permissions", "usage", "impact", "health", "edition"].includes(command)) {
  process.stdout.write(renderPhotoReport(model, evaluation, command));
  process.exit(evaluation.passed ? 0 : 1);
}

if (command === "curatorial-run") {
  console.log("Curatorial proposal compiled. It does not publish or approve an image.");
  console.log(JSON.stringify(model.curatorialConfig, null, 2));
  process.exit(evaluation.checks.automated_selection_prohibited ? 0 : 1);
}

if (command === "recollection") {
  console.log("Recollection scaffold (stdout only; no public copy changes):");
  console.log("- asset: stable Wiki asset ID");
  console.log("- prompted_by: exact occurrence ID");
  console.log("- recorded_at: YYYY-MM-DD");
  console.log("- wording: first-person recollection with uncertainty");
  console.log("- projection: hold with no surfaces");
  console.log("- next step: correction, inquiry, or no action");
  process.exit(0);
}

if (command === "write-receipt") {
  if (!model.privateBinding.passed) {
    console.error("Private binding verification is required before writing the redacted receipt.");
    process.exit(1);
  }
  const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: defaultRepoRoot,
    encoding: "utf8"
  }).trim();
  const receipt = writeCandidateReceipt(model, {
    sourceCommit,
    privateBindingVerification: "verified"
  });
  console.log(`Wrote redacted candidate receipt for ${receipt.candidateFileCount} candidate files.`);
  process.exit(0);
}

console.error(`Unknown photo knowledge command: ${command}`);
process.exit(2);
