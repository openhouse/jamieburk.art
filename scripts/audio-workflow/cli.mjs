#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  completeStage,
  evaluateQueue,
  holdStage,
  STAGES,
  summarizeJob
} from "./core.mjs";

const COMMAND_TO_STAGE = new Map([
  ["inventory", "inventory"],
  ["preserve", "preservation"],
  ["prepare", "preparation"],
  ["transcribe", "transcription"],
  ["diarize", "diarization"],
  ["repair", "repair"],
  ["wiki", "close-reading"],
  ["project", "projection"],
  ["verify", "verification"]
]);

function valueAfter(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function loadJson(filePath, label) {
  if (!filePath) throw new Error(`${label}-path-required`);
  return JSON.parse(readFileSync(path.resolve(filePath), "utf8"));
}

export function run(argv) {
  const [command, ...args] = argv;
  const manifestPath = valueAfter(args, "--manifest");
  const write = args.includes("--write");

  if (command === "queue") {
    return evaluateQueue(loadJson(manifestPath, "manifest"));
  }

  const job = loadJson(manifestPath, "manifest");
  if (command === "plan") return summarizeJob(job);

  const stage = COMMAND_TO_STAGE.get(command);
  if (!stage || !STAGES.includes(stage)) throw new Error("known-audio-command-required");
  const holdReasons = valueAfter(args, "--hold");
  const updated = holdReasons
    ? holdStage(job, stage, holdReasons.split(",").filter(Boolean))
    : completeStage(job, stage, loadJson(valueAfter(args, "--receipt"), "receipt"));

  if (write) writeFileSync(path.resolve(manifestPath), `${JSON.stringify(updated, null, 2)}\n`);
  return {
    dry_run: !write,
    command,
    ...summarizeJob(updated)
  };
}

export function exitCodeForResult(result) {
  if (Array.isArray(result?.hard_failures) && result.hard_failures.length > 0) return 1;
  if (
    Object.values(result?.stage_states ?? {}).some(
      (stage) => stage?.status === "held" || stage?.status === "failed"
    )
  ) {
    return 2;
  }
  return 0;
}

function main() {
  try {
    const result = run(process.argv.slice(2));
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = exitCodeForResult(result);
  } catch (error) {
    process.stderr.write(`${JSON.stringify({ error: error.message })}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
