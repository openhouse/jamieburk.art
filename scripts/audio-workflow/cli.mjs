#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { evaluateArtifactReading } from "./artifact-access.mjs";
import { loadVoiceCorpus, syncVoicePages, voiceSummary } from "./situated-voices.mjs";
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

  if (command === "read-access") {
    const source = valueAfter(args, "--source");
    if (!source) throw new Error("source-path-required");
    try {
      const digest = createHash("sha256").update(readFileSync(path.resolve(source))).digest("hex");
      return evaluateArtifactReading(loadJson(manifestPath, "manifest"), digest);
    } catch {
      throw new Error("reading-input-unreadable-or-invalid");
    }
  }

  if (command === "queue") {
    return evaluateQueue(loadJson(manifestPath, "manifest"));
  }

  const job = loadJson(manifestPath, "manifest");
  if (command === "plan") return summarizeJob(job);

  const stage = COMMAND_TO_STAGE.get(command);
  if (!stage || !STAGES.includes(stage)) throw new Error("known-audio-command-required");
  const holdReasons = valueAfter(args, "--hold");
  let voiceCorpus;
  let voices;
  if (!holdReasons && STAGES.indexOf(stage) >= STAGES.indexOf("close-reading")) {
    const privateRoot = valueAfter(args, "--private-root");
    const voiceManifest = valueAfter(args, "--voices");
    if (!privateRoot || !voiceManifest) throw new Error("private-root-and-voices-required");
    voiceCorpus = loadVoiceCorpus(privateRoot, voiceManifest);
    voices = syncVoicePages(voiceCorpus, privateRoot);
  }
  const updated = holdReasons
    ? holdStage(job, stage, holdReasons.split(",").filter(Boolean))
    : voices && !voices.complete
      ? holdStage(job, stage, ["situated-voice-coverage-incomplete"])
      : completeStage(job, stage, loadJson(valueAfter(args, "--receipt"), "receipt"), voiceCorpus);

  if (write && voices) syncVoicePages(voiceCorpus, valueAfter(args, "--private-root"), { write: true });
  if (write) writeFileSync(path.resolve(manifestPath), `${JSON.stringify(updated, null, 2)}\n`);
  return {
    dry_run: !write,
    command,
    ...(voices ? { situated_voices: voiceSummary(voices.graph) } : {}),
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
