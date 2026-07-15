#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const outputUrl = new URL("../docs/knowledge-bank/campaign-press-corpus.md", import.meta.url);
const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const listed = knowledgeBank.sourceCollections.flatMap(({ itemSourceIds }) => itemSourceIds);

const href = (source) => {
  if (source.preferredPublicUrl === "archive") return source.archiveUrl;
  if (source.preferredPublicUrl === "asset") return source.assetUrl;
  return source.canonicalUrl ?? source.archiveUrl ?? source.assetUrl;
};

const lines = [
  "# NYC Artist Coalition campaign press corpus",
  "",
  "Reviewed July 14, 2026.",
  "",
  `This public-safe source collection preserves ${listed.length} campaign press listings across four campaign sites, representing ${new Set(listed).size} unique articles. The NPR Cabaret Law article appears in both Let NYC Dance and Save NYC Spaces and remains one canonical source record.`,
  "",
  "Collection membership records what a campaign selected for its press section. It does not by itself establish Jamie's role, article accuracy, source independence, or causation. Article-level claims require close reading and atomic observations before promotion.",
  ""
];

for (const collection of knowledgeBank.sourceCollections) {
  const index = sourceById.get(collection.indexSourceId);
  lines.push(`## ${collection.title}`, "");
  lines.push(`**Campaign index:** [${index.title}](${href(index)})`);
  lines.push(`**Capture:** ${collection.captureMethod}; ${collection.completeness}; ${collection.itemSourceIds.length} of ${collection.listedItemCount} displayed articles.`);
  lines.push(`**Scope:** ${collection.scopeNote}`);
  lines.push(`**Boundary:** ${collection.interpretationBoundary}`, "");

  collection.itemSourceIds.forEach((sourceId, indexNumber) => {
    const source = sourceById.get(sourceId);
    const byline = source.author ? `, ${source.author}` : "";
    const date = source.publishedAt ? `, ${source.publishedAt}` : "";
    lines.push(`${indexNumber + 1}. [${source.title}](${href(source)}) - ${source.organization ?? "Unknown outlet"}${byline}${date}. \`${source.id}\``);
  });
  lines.push("");
}

const output = `${lines.join("\n").trimEnd()}\n`;

if (process.argv.includes("--check")) {
  const existing = readFileSync(outputUrl, "utf8");
  if (existing !== output) {
    console.error("Generated campaign press corpus is stale. Run npm run generate:campaign-press.");
    process.exit(1);
  }
  console.log("Campaign press corpus is current.");
} else {
  writeFileSync(outputUrl, output);
  console.log(`Wrote ${fileURLToPath(outputUrl)}`);
}
