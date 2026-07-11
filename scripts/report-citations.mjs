#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  loadCitationBundle,
  repoRoot,
  resolveCitationPage,
  validateCitationBundle
} from "./lib/citation-model.mjs";

const bundle = loadCitationBundle();
const validation = validateCitationBundle(bundle);
const correctionByEvidence = new Map();
for (const correction of bundle.corrections) {
  for (const evidenceId of correction.evidenceIds) {
    const values = correctionByEvidence.get(evidenceId) ?? [];
    values.push(`${correction.id}: ${correction.status}`);
    correctionByEvidence.set(evidenceId, values);
  }
}

const lines = [
  "# Citation Report",
  "",
  "Generated deterministically from the public-safe Knowledge Bank. No external links were fetched.",
  ""
];

for (const page of bundle.pages) {
  lines.push(`## ${page.path}`, "");
  for (const resolved of resolveCitationPage(page.id, bundle)) {
    const evidenceIds = resolved.note.evidenceIds;
    const sourceIds = resolved.sources.map((source) => source.id);
    const publicationModes = resolved.sources.map((source) => source.publicationMode);
    const correctionStates = evidenceIds.flatMap((id) => correctionByEvidence.get(id) ?? []);
    lines.push(
      `### ${resolved.number}. ${resolved.note.title}`,
      "",
      `- Note ID: \`${resolved.note.id}\``,
      `- Claim IDs: ${resolved.note.claimIds.map((id) => `\`${id}\``).join(", ")}`,
      `- Evidence IDs: ${evidenceIds.map((id) => `\`${id}\``).join(", ")}`,
      `- Source IDs: ${sourceIds.map((id) => `\`${id}\``).join(", ")}`,
      `- Publication modes: ${publicationModes.join(", ")}`,
      `- Boundaries: ${resolved.note.boundaries.join(" ")}`,
      `- Correction status: ${correctionStates.length ? correctionStates.join("; ") : "none"}`,
      `- Last reviewed: ${resolved.note.lastReviewed}`,
      ""
    );
  }
}

lines.push(
  "## Warnings",
  "",
  ...(validation.warnings.length ? validation.warnings.map((warning) => `- ${warning}`) : ["- None"]),
  ""
);

const output = path.join(repoRoot, "reports/citations.md");
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${lines.join("\n")}\n`, "utf8");
console.log(path.relative(repoRoot, output));
