#!/usr/bin/env node

import {
  buildPageNumbers,
  loadCitationData,
  publicSourceLinks,
  validateCitationData
} from "./check-citations.mjs";

const data = loadCitationData();
const result = validateCitationData(data, { checkFiles: false });
const claimsById = new Map(data.claims.map((claim) => [claim.id, claim]));
const sourcesById = new Map(data.sources.map((source) => [source.id, source]));
const lines = [
  "# Citation Report",
  "",
  "Generated from the canonical public-safe citation records. No URLs were fetched.",
  ""
];

for (const set of data.citationSets) {
  lines.push(`## ${set.pagePath}`, "", `Citation set: \`${set.id}\``, "");
  const numbers = buildPageNumbers(set);
  for (const entry of set.entries) {
    const claim = claimsById.get(entry.claimId);
    const number = numbers.get(entry.claimId);
    lines.push(
      `### ${number}. ${entry.claimId}`,
      "",
      `- Evidence status: \`${claim?.evidenceStatus ?? "unknown"}\``,
      `- Occurrences: ${entry.occurrences}`,
      `- Record status: \`${claim?.recordStatus ?? "active"}\``
    );
    for (const relationship of claim?.evidence ?? []) {
      const source = sourcesById.get(relationship.sourceId);
      const links = source ? publicSourceLinks(source) : [];
      lines.push(
        `- Source: \`${relationship.sourceId}\` (${source?.visibility ?? "unknown"}, ${relationship.support})`,
        `  - Public links: ${links.length ? links.join(", ") : "none"}`
      );
    }
    lines.push("");
  }
}

lines.push("## Corrections", "");
for (const correction of data.corrections) {
  lines.push(
    `- \`${correction.id}\`: ${correction.previousValue} -> ${correction.correctedValue}`,
    `  - Required before production: ${correction.requiredBeforeProduction ? "yes" : "no"}`,
    `  - Resolved: ${correction.resolvedAt ?? "no"}`
  );
}

lines.push("", "## Unresolved items", "");
const unresolvedCorrections = data.corrections.filter(
  (correction) => correction.requiredBeforeProduction && !correction.resolvedAt
);
const unresolvedClaims = data.claims.filter(
  (claim) => claim.evidenceStatus === "unresolved" && claim.recordStatus !== "superseded"
);
if (!unresolvedCorrections.length && !unresolvedClaims.length) {
  lines.push("- None");
} else {
  for (const correction of unresolvedCorrections) lines.push(`- Correction: ${correction.id}`);
  for (const claim of unresolvedClaims) lines.push(`- Claim: ${claim.id}`);
}

lines.push("", "## Research limits", "");
for (const inquiry of data.inquiries) {
  lines.push(`- \`${inquiry.id}\`: ${inquiry.limitation}`);
}

lines.push("", "## Warnings", "");
if (result.warnings.length) {
  for (const warning of result.warnings) lines.push(`- ${warning}`);
} else {
  lines.push("- None");
}

if (result.failures.length) {
  lines.push("", "## Validation failures", "");
  for (const failure of result.failures) lines.push(`- ${failure}`);
  process.exitCode = 1;
}

console.log(`${lines.join("\n")}\n`);
