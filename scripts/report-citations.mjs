#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(repoRoot, "apps/www/src/data/knowledge-bank");
const outputPath = path.join(
  repoRoot,
  "reports/citational-care-composite-L/citations.md"
);

function load(name) {
  return JSON.parse(readFileSync(path.join(dataRoot, name), "utf8"));
}

const sources = load("sources.json");
const claims = load("claims.json");
const groups = load("citation-groups.json");
const pageOrders = load("page-citation-orders.json");
const inquiries = load("research-inquiries.json");
const media = load("media.json");
const corrections = load("corrections.json");

const sourceById = new Map(sources.map((source) => [source.id, source]));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));
const groupById = new Map(groups.map((group) => [group.id, group]));
const usedClaimIds = new Set();
const usedSourceIds = new Set();
const lines = [
  "# Citational Care Composite L Citation Report",
  "",
  "Generated from committed public-safe citation records. No external links were fetched.",
  "",
  "## Pages With Citations",
  ""
];

for (const [pageKey, groupIds] of Object.entries(pageOrders)) {
  lines.push(`### ${pageKey}`, "");
  lines.push(`Citation groups (${groupIds.length}):`);
  for (const groupId of groupIds) {
    const group = groupById.get(groupId);
    if (!group) continue;
    group.claimIds.forEach((claimId) => usedClaimIds.add(claimId));
    group.sourceIds.forEach((sourceId) => usedSourceIds.add(sourceId));
    lines.push(`- ${group.id}: ${group.shortLabel}`);
    lines.push(`  - Claims: ${group.claimIds.join(", ")}`);
    lines.push(`  - Sources: ${group.sourceIds.join(", ")}`);
  }
  lines.push("");
}

const summaryOnlyUsed = [...usedSourceIds]
  .map((id) => sourceById.get(id))
  .filter((source) => source?.publicCitationMode === "summary-only");
const carefulClaimsUsed = [...usedClaimIds]
  .map((id) => claimById.get(id))
  .filter((claim) => claim?.status === "careful");
const uncitedReadyClaims = claims.filter(
  (claim) => claim.status === "ready" && !usedClaimIds.has(claim.id)
);
const warnings = [];

for (const source of sources) {
  if (source.visibility === "public-unlinked") {
    warnings.push(`${source.id}: public-unlinked source`);
  }
  if (source.originalUrl && !source.archivedUrl && source.originalUrl.startsWith("http")) {
    warnings.push(`${source.id}: live original without archivedUrl`);
  }
}

lines.push(
  "## Private / Summary-Only Sources Used",
  "",
  ...(summaryOnlyUsed.length
    ? summaryOnlyUsed.map((source) => `- ${source.id}: ${source.shortLabel}`)
    : ["- None"]),
  "",
  "## Careful Claims Used",
  "",
  ...(carefulClaimsUsed.length
    ? carefulClaimsUsed.map((claim) => `- ${claim.id}: ${claim.caveat ?? "careful"}`)
    : ["- None"]),
  "",
  "## Unresolved Inquiries",
  "",
  ...inquiries.map((inquiry) => `- ${inquiry.id}: ${inquiry.question}`),
  "",
  "## Media / Asset Records",
  "",
  ...media.map(
    (item) =>
      `- ${item.id}: ${item.evidenceRole}; public use: ${item.publicUse}; rights: ${item.rights}`
  ),
  "",
  "## Corrections",
  "",
  ...corrections.map(
    (correction) =>
      `- ${correction.id}: ${correction.priorWording} -> ${correction.revisedWording}`
  ),
  "",
  "## Uncited Ready Claims",
  "",
  ...(uncitedReadyClaims.length
    ? uncitedReadyClaims.map((claim) => `- ${claim.id}`)
    : ["- None"]),
  "",
  "## Warnings",
  "",
  ...(warnings.length ? warnings.map((warning) => `- ${warning}`) : ["- None"]),
  ""
);

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(path.relative(repoRoot, outputPath));
