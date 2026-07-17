#!/usr/bin/env node
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  contractDigest,
  governedInputDigest,
  governedInputDigestAtCommit,
  loadCompositeRunRecords,
  loadEvalContract,
  promptDigest,
  repoRoot,
  runRecordDigest,
  validateCompositeRunRecord,
  validateRunSequence
} from "./lib/eval-contract.mjs";

const git = (...args) => execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
const contract = loadEvalContract();
const commit = git("rev-parse", "HEAD");
const tree = git("rev-parse", "HEAD^{tree}");
const currentDigest = governedInputDigest(contract);
const committedDigest = governedInputDigestAtCommit(commit, contract);

if (currentDigest !== committedDigest) {
  throw new Error("Governed inputs differ from HEAD. Commit the candidate before running composite evals.");
}

const previousRuns = loadCompositeRunRecords();
const previous = previousRuns.at(-1)?.record;
const iteration = (previous?.iteration ?? 0) + 1;
const id = `composite-${contract.version}-deterministic-${iteration}`;
const logRoot = path.join(repoRoot, `evals/_shared/logs/${String(iteration).padStart(3, "0")}-${id}`);
mkdirSync(logRoot, { recursive: true });
const commands = [];
for (const [index, command] of contract.requiredCommands.entries()) {
  const started = new Date();
  const result = spawnSync(command, { cwd: repoRoot, encoding: "utf8", shell: true, env: process.env, maxBuffer: 50 * 1024 * 1024 });
  const completed = new Date();
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  const outputPath = path.posix.join("evals/_shared/logs", path.basename(logRoot), `${String(index + 1).padStart(2, "0")}.log`);
  writeFileSync(path.join(repoRoot, outputPath), output);
  process.stdout.write(`\n$ ${command}\n${output}`);
  commands.push({
    command,
    exitCode: result.status ?? 1,
    status: result.status === 0 ? "passed" : "failed",
    startedAt: started.toISOString(),
    completedAt: completed.toISOString(),
    durationMs: completed.getTime() - started.getTime(),
    outputDigest: createHash("sha256").update(output).digest("hex"),
    outputPath
  });
}

const record = {
  schemaVersion: "2.1.0",
  id,
  iteration,
  recordedAt: new Date().toISOString(),
  ...(previous ? { previousRunId: previous.id, previousRunDigest: previous.recordDigest } : {}),
  contract: { id: contract.id, version: contract.version, digest: contractDigest(contract) },
  candidate: { branch: git("branch", "--show-current"), commit, tree, governedInputDigest: committedDigest },
  execution: {
    runnerPath: "scripts/run-composite-eval.mjs",
    runnerDigest: promptDigest("scripts/run-composite-eval.mjs"),
    node: process.version,
    platform: `${process.platform}-${process.arch}`
  },
  commands,
  judge: { class: "deterministic", label: `canonical-runner-${iteration}`, independent: false, priorScoresVisible: false },
  criterionResults: [],
  openDisagreements: [],
  overrides: [],
  reopenTriggersReviewed: [...contract.requiredReopenTriggers],
  decision: {
    status: commands.every((command) => command.exitCode === 0) ? "accepted-for-review" : "revision-required",
    productionReady: false,
    externalGatesOpen: [...contract.requiredExternalGates]
  }
};
record.recordDigest = runRecordDigest(record);
const candidateRecords = [...previousRuns, { file: "pending deterministic record", record }];
const recordErrors = [
  ...validateRunSequence(candidateRecords),
  ...validateCompositeRunRecord(record, { contract, contractId: contract.id, contractVersion: contract.version, contractDigest: contractDigest(contract), governedInputDigest: committedDigest })
];
if (recordErrors.length) throw new Error(`Refusing invalid run record:\n${recordErrors.join("\n")}`);
const outputPath = path.join(repoRoot, `evals/_shared/runs/${String(iteration).padStart(3, "0")}-${id}.json`);
mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`\nRecorded ${path.relative(repoRoot, outputPath)} (${record.decision.status}).`);
if (record.decision.status !== "accepted-for-review") process.exit(1);
