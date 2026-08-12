#!/usr/bin/env node

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import {
  buildLayeredKnowledgeGraph,
  loadLayerPolicy,
  planLayeredPacketFamilies
} from "./layers.mjs";

function parseFlags(args) {
  const flags = new Map();
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (!argument.startsWith("--")) continue;
    const key = argument.slice(2);
    const value = args[index + 1] && !args[index + 1].startsWith("--")
      ? args[++index]
      : true;
    flags.set(key, value);
  }
  return flags;
}

function commaSeparated(value) {
  if (typeof value !== "string") return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] ?? "help";
  if (command === "help" || command === "--help") {
    process.stdout.write(`Layered Knowledge Wiki commands:\n\n  snapshot\n  plan --seeds <id,id> --max-degree <n> [--artifact-budget <n> --select-evidence <id,id>]\n`);
    return;
  }

  const wiki = compileWiki();
  if (wiki.errors.length > 0) {
    throw new Error("the Knowledge Wiki must pass its hard gates before layer compilation");
  }
  const policy = loadLayerPolicy(defaultRepoRoot);
  const layered = buildLayeredKnowledgeGraph(wiki, policy);

  if (command === "snapshot") {
    process.stdout.write(`${JSON.stringify({
      command,
      readOnly: true,
      sourceFingerprint: layered.sourceFingerprint,
      layered
    }, null, 2)}\n`);
    return;
  }

  if (command !== "plan") throw new Error(`unknown layered graph command: ${command}`);
  const flags = parseFlags(args.slice(1));
  const seedIds = commaSeparated(flags.get("seeds"));
  const maxDegree = Number(flags.get("max-degree"));
  const artifactBudget = flags.has("artifact-budget")
    ? Number(flags.get("artifact-budget"))
    : undefined;
  const selectedEvidenceIds = commaSeparated(flags.get("select-evidence"));
  const plan = planLayeredPacketFamilies(layered, {
    seedIds,
    maxDegree,
    artifactBudget,
    selectedEvidenceIds
  });
  process.stdout.write(`${JSON.stringify({
    command,
    readOnly: true,
    sourceFingerprint: layered.sourceFingerprint,
    plan
  }, null, 2)}\n`);
}

main();
