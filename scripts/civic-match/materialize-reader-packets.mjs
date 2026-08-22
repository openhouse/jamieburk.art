#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { deriveExpectedAudience, evaluateCivicMatch } from "./evaluate.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outputRoot = process.env.CIVIC_MATCH_PACKET_DIR || "/private/tmp/civic-match-reader-packets-B";
const readJson = (relativePath) => JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
const readText = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");

const deterministic = evaluateCivicMatch(repoRoot, { deterministicOnly: true });
if (!deterministic.pass) {
  throw new Error(`Deterministic Civic Match gates failed:\n${deterministic.failures.join("\n")}`);
}

const config = readJson("evals/opportunity-intake/civic-match.json");
const selection = readJson(config.selectionConfigPath);
const audience = deriveExpectedAudience(repoRoot, config);
const selectedOpportunity = selection.opportunities.find(
  (opportunity) => opportunity.opportunityId === selection.expectedCurrentSelection.opportunityIds[0]
);
const digest = (value) => createHash("sha256").update(value).digest("hex");
const shared = [
  "# Fictionalized Civic Match reader packet",
  "",
  "Use only this packet. Do not inspect repository code, local files, private communications, or the wider web.",
  "This is a simulation based on public sources. The named person did not participate, speak, endorse Jamie, or make a hiring decision.",
  "Assess the copy as a rushed, responsible reader would. Do not reward imagined evidence.",
  "When the acceptance question expressly reserves the employer's formal process, record unresolved eligibility, references, and interview validation as risks and follow-up; do not treat their ordinary incompleteness in a candidate profile as an automatic failure.",
  "",
  "## Current opportunity",
  "",
  selectedOpportunity.title,
  `Official source: ${selectedOpportunity.officialSource}`,
  `Known application state: ${selectedOpportunity.applicationState}; outcome: ${selectedOpportunity.outcomeState}.`,
  "This date-level application milestone is Jamie-authorized and public-safe; confirmation artifacts and correspondence remain private.",
  "",
  ...selectedOpportunity.modelContextPaths.flatMap((sourcePath) => [readText(sourcePath), ""]),
  "## Lifecycle-selected public resume",
  "",
  readText(config.resume.markdownPath),
  "",
  "## Civic Match signup guide",
  "",
  readText(config.guidePath)
].join("\n");

mkdirSync(outputRoot, { recursive: true });
const manifest = [];
for (const member of [...audience.hiringReaders, ...audience.helpers]) {
  const slug = member.personId.replace(/^person\./u, "");
  const context = readText(`docs/knowledge-bank/people/${slug}.md`);
  const output = [
    shared,
    "",
    "## Your reader lens",
    "",
    `Name: ${member.displayName ?? member.name}`,
    `Kind: ${member.kind}`,
    context,
    "",
    "## Acceptance gate",
    "",
    member.acceptanceQuestion,
    "",
    "Return JSON only with this exact shape:",
    "",
    "```json",
    JSON.stringify({
      personId: member.personId,
      kind: member.kind,
      acceptanceQuestion: member.acceptanceQuestion,
      pass: false,
      strengths: ["specific strength", "specific strength"],
      risks: ["constructive remaining risk"],
      followUp: ["specific next validation or action"],
      narrative: "Concise reasoning based only on this packet."
    }, null, 2),
    "```",
    "",
    "Set pass=true only when the acceptance statement is justified by the packet."
  ].join("\n");
  const packetPath = path.join(outputRoot, `${slug}.md`);
  writeFileSync(packetPath, output);
  manifest.push({ personId: member.personId, kind: member.kind, packetPath, packetSha256: digest(output) });
}

writeFileSync(path.join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ outputRoot, packets: manifest.length }, null, 2));
