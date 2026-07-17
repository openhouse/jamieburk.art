#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { buildProjectionMap } from "./lib/knowledge-operations.mjs";

const outputUrl = new URL("../docs/knowledge-bank/projection-register.md", import.meta.url);
const projectionMap = buildProjectionMap(knowledgeBank);
const rows = projectionMap.active.map((projection) =>
  `| \`${projection.claimId}\` | \`${projection.project}\` | \`${projection.key}\` | ${projection.surfaces.map((surface) => `\`${surface}\``).join(", ")} | ${projection.citationRequired ? "yes" : "no"} |`
);
const output = `# Projection register

Generated from \`${projectionMap.generatedFrom}\`. Do not edit by hand.

## Status counts

${Object.entries(projectionMap.countsByStatus).map(([status, count]) => `- \`${status}\`: ${count}`).join("\n")}

## Active projections

| Claim | Project | Projection | Surfaces | Citation required |
| --- | --- | --- | --- | --- |
${rows.join("\n")}
`;

if (process.argv.includes("--check")) {
  const existing = readFileSync(outputUrl, "utf8");
  if (existing !== output) {
    console.error("Generated knowledge projection register is stale. Run npm run knowledge:projection-map.");
    process.exit(1);
  }
  console.log(`Knowledge projection register is current: ${projectionMap.active.length} active projections.`);
} else {
  writeFileSync(outputUrl, output);
  console.log(`Wrote ${fileURLToPath(outputUrl)}`);
}
