#!/usr/bin/env node

import { readFileSync } from "node:fs";
import {
  buildEvaluatorPacket,
  candidateBinding,
  capturePublicSnapshot,
  loadHiringContext,
  writeArtifact
} from "./lib.mjs";

const args = process.argv.slice(2);
const value = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
};

const help = `Public-only hiring evaluator packet builder\n\n` +
  `Usage:\n` +
  `  npm run eval:hiring -- --base-url http://127.0.0.1:3042\n` +
  `  npm run eval:hiring -- --snapshot .artifacts/public-snapshot.json\n` +
  `  npm run eval:hiring -- --readers reader.generic-recruiter --opportunities opportunity.nyc-oti.technical-operations-manager.782369 --base-url URL\n\n` +
  `Options: --panel development|holdout --sha SHA --optimizer ID --evaluator ID\n` +
  `This command builds exact, public-only packets. It does not fabricate a reader decision.\n`;

if (args.includes("--help") || args.includes("-h")) {
  console.log(help);
  process.exit(0);
}

const baseUrl = value("--base-url");
const snapshotPath = value("--snapshot");
if (!baseUrl && !snapshotPath) {
  console.error(help);
  process.exit(2);
}

const context = loadHiringContext();
const binding = candidateBinding();
const requestedSha = value("--sha");
if (requestedSha && requestedSha !== binding.candidateSha) {
  throw new Error(`Requested SHA ${requestedSha} does not match checked-out ${binding.candidateSha}.`);
}

const panel = value("--panel") ?? "development";
if (!context.suite.panels?.[panel]) throw new Error(`Unknown panel ${panel}.`);
const requestedReaders = value("--readers")?.split(",").filter(Boolean) ?? context.suite.panels[panel];
const requestedOpportunities =
  value("--opportunities")?.split(",").filter(Boolean) ?? context.suite.opportunityIds;
const readerById = new Map(context.readers.map((reader) => [reader.data.id, reader]));
const opportunityById = new Map(
  context.opportunities.map((record) => [record.data.id, record])
);
for (const id of requestedReaders) {
  if (!readerById.has(id)) throw new Error(`Unknown reader ${id}.`);
  if (!context.suite.panels[panel].includes(id)) throw new Error(`${id} is not assigned to the ${panel} panel.`);
}
for (const id of requestedOpportunities) {
  if (!opportunityById.has(id)) throw new Error(`Unknown opportunity ${id}.`);
}

const routes = requestedOpportunities.flatMap(
  (id) => opportunityById.get(id).data.portfolio_routes
);
const snapshot = snapshotPath
  ? JSON.parse(readFileSync(snapshotPath, "utf8"))
  : await capturePublicSnapshot(baseUrl, routes);

const packets = [];
for (const opportunityId of requestedOpportunities) {
  for (const readerId of requestedReaders) {
    const packet = buildEvaluatorPacket({
      opportunity: opportunityById.get(opportunityId),
      reader: readerById.get(readerId),
      snapshot,
      binding,
      suite: context.suite,
      contract: context.contract,
      panel,
      evaluatorIdentity: value("--evaluator") ?? "unassigned-independent-evaluator",
      optimizerIdentity: value("--optimizer") ?? "codex-optimizer"
    });
    packets.push(packet);
    writeArtifact(
      `runs/${binding.candidateSha}/${opportunityId}/${readerId}.json`,
      packet
    );
  }
}

const manifest = {
  state: "packets-ready-review-not-run",
  candidateSha: binding.candidateSha,
  worktreeClean: binding.worktreeClean,
  snapshotHash: snapshot.snapshotHash,
  panel,
  packetRunIds: packets.map((packet) => packet.runId),
  disclaimer: "No reader decision, participation, endorsement, or hiring outcome was generated."
};
const manifestPath = writeArtifact(
  `runs/${binding.candidateSha}/${panel}-manifest.json`,
  manifest
);
console.log(`Built ${packets.length} public-only packets. Independent review remains not-run.`);
console.log(manifestPath);
