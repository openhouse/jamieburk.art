import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { buildPublicRegistry } from "./lib/projection-consistency.mjs";

const outputUrl = new URL(
  "../apps/www/src/data/knowledge-bank/public-registry.json",
  import.meta.url
);

const usedSourceIds = new Set(
  knowledgeBank.pages.flatMap((page) => page.occurrences.flatMap((occurrence) => {
    const claim = knowledgeBank.claims.find((item) => item.id === occurrence.claimId);
    return occurrence.sourceIds ?? claim?.evidence.filter((item) => item.renderCitation).map((item) => item.sourceId) ?? [];
  }))
);

const unsafeSources = knowledgeBank.sources.filter((source) => usedSourceIds.has(source.id) && !["public", "public-metadata-only"].includes(source.visibility));
if (unsafeSources.length) throw new Error(`Refusing to generate public registry with non-public sources: ${unsafeSources.map((source) => source.id).join(", ")}`);

const publicRegistry = buildPublicRegistry(knowledgeBank);

const output = `${JSON.stringify(publicRegistry, null, 2)}\n`;

if (process.argv.includes("--check")) {
  const existing = readFileSync(outputUrl, "utf8");
  if (existing !== output) {
    console.error("Generated public citation registry is stale. Run npm run generate:citations.");
    process.exit(1);
  }
  console.log("Public citation registry is current and redacted.");
} else {
  writeFileSync(outputUrl, output);
  console.log(`Wrote ${fileURLToPath(outputUrl)}`);
}
