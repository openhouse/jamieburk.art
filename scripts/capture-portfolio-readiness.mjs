#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import {
  candidateDigestAtRevision,
  currentCandidateDigest,
  digestJson,
  readJson,
  validateRubric
} from "./lib/portfolio-readiness-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const values = parseArgs({
  options: {
    "run-id": { type: "string" },
    revision: { type: "string" },
    output: { type: "string" }
  }
}).values;

if (!values["run-id"]) throw new Error("Use --run-id");
const rubric = readJson(path.join(repoRoot, "evals/portfolio-readiness/rubric.json"));
const rubricFailures = validateRubric(rubric);
if (rubricFailures.length) throw new Error(rubricFailures.join("; "));

const head = spawnSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).stdout.trim();
const revision = values.revision || head;
if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error("Revision must be a full Git SHA");
const candidateDigest = candidateDigestAtRevision(repoRoot, rubric, revision);
if (currentCandidateDigest(repoRoot, rubric) !== candidateDigest) {
  throw new Error("Current candidate surfaces differ from the requested revision");
}

const commands = [];
for (const suite of rubric.domainSuites) {
  const result = spawnSync(suite.command, {
    cwd: repoRoot,
    encoding: "utf8",
    shell: true,
    env: Object.assign({}, process.env, { NEXT_TELEMETRY_DISABLED: "1" })
  });
  const output = String(result.stdout || "") + String(result.stderr || "");
  process.stdout.write(output);
  commands.push({
    id: suite.id,
    command: suite.command,
    outcome: result.status === 0 ? "passed" : "failed",
    exitCode: result.status === null ? -1 : result.status,
    outputDigest: createHash("sha256").update(output).digest("hex")
  });
  if (result.status !== 0) {
    console.error("Deterministic suite failed: " + suite.id);
    process.exit(result.status || 1);
  }
}

const receipt = {
  version: 1,
  runId: values["run-id"],
  evaluatedAt: new Date().toISOString(),
  candidateRevision: revision,
  candidateDigest,
  rubricDigest: digestJson(rubric),
  environment: {
    node: process.version,
    npm: spawnSync("npm", ["--version"], { cwd: repoRoot, encoding: "utf8" }).stdout.trim(),
    platform: os.platform() + "-" + os.arch()
  },
  commands
};
const defaultOutput = "evals/portfolio-readiness/runs/" + values["run-id"] + "/deterministic.json";
const outputPath = path.resolve(repoRoot, values.output || defaultOutput);
mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(receipt, null, 2) + "\n");
console.log("Wrote " + path.relative(repoRoot, outputPath));

