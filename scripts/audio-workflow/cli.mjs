#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { runPersonReadings } from './person-reading-files.mjs';
import {
  completeStage,
  evaluateQueue,
  holdStage,
  requireStageAuthority,
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

  if (command === 'voices') {
    const root = valueAfter(args,'--private-root');
    if (!root) throw new Error('private-root-required');
    return runPersonReadings({root,manifest_path:manifestPath,mode:write?'write':args.includes('--check')?'check':'plan'});
  }

  if (command === "queue") {
    return evaluateQueue(loadJson(manifestPath, "manifest"));
  }

  const job = loadJson(manifestPath, "manifest");
  if (command === "plan") return summarizeJob(job);

  const stage = COMMAND_TO_STAGE.get(command);
  if (!stage || !STAGES.includes(stage)) throw new Error("known-audio-command-required");
  const holdReasons = valueAfter(args, "--hold");
  if (command === 'wiki' && !holdReasons) {
    requireStageAuthority(job,stage);
    if (job.stages?.repair?.status !== 'complete') throw new Error('prerequisite-stage-incomplete:repair');
    const voiceManifest = valueAfter(args,'--voice-manifest');
    const privateRoot = valueAfter(args,'--private-root');
    if (!voiceManifest || !privateRoot) throw new Error('person-reading-manifest-required');
    const scope = job.private_context?.transcript_source_ids;
    if (!Array.isArray(scope) || !scope.length) throw new Error('job-source-scope-required');
    const coverage = runPersonReadings({root:privateRoot,manifest_path:voiceManifest,scope_source_ids:scope,mode:write?'write':'check'});
    const stageReceipt = loadJson(valueAfter(args,'--receipt'),'receipt');
    const updated = coverage.projection_current && coverage.complete
      ? completeStage(job,stage,{...stageReceipt,person_reading_coverage:{...coverage,repair_fingerprint:job.receipts.repair.output_fingerprint}})
      : holdStage(job,stage,['person-close-readings-pending']);
    if (write) writeFileSync(path.resolve(manifestPath), `${JSON.stringify(updated,null,2)}\n`);
    return {dry_run:!write,command,...summarizeJob(updated)};
  }
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
  if (result?.projection_current === false) return 1;
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
