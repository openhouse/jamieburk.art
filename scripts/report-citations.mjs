#!/usr/bin/env node

import { readFileSync } from "node:fs";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function byId(a, b) {
  return a.id.localeCompare(b.id);
}

const sources = readJson("apps/www/src/data/knowledge-bank/sources.json");
const claims = readJson("apps/www/src/data/knowledge-bank/claims.json");
const pageCitations = readJson("apps/www/src/data/knowledge-bank/page-citations.json");
const media = readJson("apps/www/src/data/knowledge-bank/media.json");
const researchRuns = readJson("apps/www/src/data/knowledge-bank/research-runs.json");
const corrections = readJson("apps/www/src/data/knowledge-bank/corrections.json");

const visibilityCounts = sources.reduce((counts, source) => {
  counts[source.publicVisibility] = (counts[source.publicVisibility] ?? 0) + 1;
  return counts;
}, {});

const claimStatusCounts = claims.reduce((counts, claim) => {
  counts[claim.status] = (counts[claim.status] ?? 0) + 1;
  return counts;
}, {});

const lines = [
  "# Citation Report",
  "",
  "Deterministic reviewer report for the public citational-care registry.",
  "",
  "## Counts",
  "",
  `- Sources: ${sources.length}`,
  `- Claims: ${claims.length}`,
  `- Page projections: ${Object.keys(pageCitations).length}`,
  `- Media records: ${media.length}`,
  `- Research runs: ${researchRuns.length}`,
  `- Corrections: ${corrections.length}`,
  "",
  "## Source Visibility",
  "",
  ...Object.entries(visibilityCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([visibility, count]) => `- ${visibility}: ${count}`),
  "",
  "## Claim Status",
  "",
  ...Object.entries(claimStatusCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([status, count]) => `- ${status}: ${count}`),
  "",
  "## Pages With Citations",
  "",
  ...Object.entries(pageCitations)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([page, claimIds]) => `- ${page}: ${claimIds.length} note(s)`),
  "",
  "## Sources",
  "",
  ...sources.sort(byId).map((source) => `- ${source.id}: ${source.publicVisibility}, ${source.availability}`),
  "",
  "## Claims",
  "",
  ...claims.sort(byId).map((claim) => `- ${claim.id}: ${claim.status}, ${claim.confidence}`),
  "",
  "## Media",
  "",
  ...media.sort(byId).map((item) => `- ${item.id}: ${item.visibility}, ${item.publicationStatus}`),
  "",
  "## Research Runs",
  "",
  ...researchRuns.sort(byId).map((run) => `- ${run.id}: ${run.publicProjection}`),
  "",
  "## Corrections",
  "",
  ...corrections.sort(byId).map((correction) => `- ${correction.id}: ${correction.status}`),
  ""
];

console.log(lines.join("\n"));
