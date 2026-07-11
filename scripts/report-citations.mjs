#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadCitationData, validateCitationData } from "./check-citations.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = loadCitationData(repoRoot);
const validation = validateCitationData(data, { repoRoot });

function tableCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

const lines = [
  "# Citation report",
  "",
  "> Generated from `apps/www/src/data/knowledge-bank/` by `npm run report:citations`.",
  "",
  `- Sources: ${data.sources.length}`,
  `- Claims: ${data.claims.length}`,
  `- Evidence relationships: ${data.evidence.length}`,
  `- Citation notes: ${data.notes.length}`,
  `- Public pages using citations: ${data.pages.length}`,
  `- Open production corrections: ${data.corrections.filter((item) => item.status === "required-before-production").length}`,
  "",
  "## Public citation coverage",
  "",
  "| Route | Occurrences | Unique references | Ready notes |",
  "| --- | ---: | ---: | ---: |"
];

for (const page of validation.resolvedPages) {
  lines.push(`| ${tableCell(page.route)} | ${page.occurrences.length} | ${page.references.length} | ${page.references.filter((item) => item.note.status === "ready").length} |`);
}

lines.push(
  "",
  "## Claim register",
  "",
  "| Claim ID | Status | Citation policy | Public surfaces |",
  "| --- | --- | --- | --- |"
);

for (const claim of data.claims) {
  lines.push(`| \`${tableCell(claim.id)}\` | ${tableCell(claim.status)} | ${tableCell(claim.citationPolicy)} | ${tableCell(claim.allowedSurfaces.join(", "))} |`);
}

lines.push("", "## Corrections", "");
for (const correction of data.corrections) {
  lines.push(
    `### ${correction.id}`,
    "",
    `- Status: \`${correction.status}\``,
    `- Target: \`${correction.targetIdOrPath}\``,
    `- Reason: ${correction.reason}`,
    correction.replacementText ? `- Approved replacement direction: ${correction.replacementText}` : "",
    ""
  );
}

lines.push("## Validation", "");
if (validation.failures.length) {
  lines.push("### Failures", "", ...validation.failures.map((item) => `- ${item}`), "");
} else {
  lines.push("No citation-integrity failures in the non-production check.", "");
}
if (validation.warnings.length) {
  lines.push("### Warnings", "", ...validation.warnings.map((item) => `- ${item}`), "");
}

const outputPath = path.join(repoRoot, "reports/citations.md");
mkdirSync(path.dirname(outputPath), { recursive: true });
const report = lines.filter((line) => line !== undefined).join("\n").trimEnd();
writeFileSync(outputPath, `${report}\n`);
console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
