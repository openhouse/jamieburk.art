import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

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

const occurrenceSourceIdsByClaim = new Map();
for (const page of knowledgeBank.pages) {
  for (const occurrence of page.occurrences) {
    const ids = occurrenceSourceIdsByClaim.get(occurrence.claimId) ?? new Set();
    for (const sourceId of occurrence.sourceIds ?? []) ids.add(sourceId);
    occurrenceSourceIdsByClaim.set(occurrence.claimId, ids);
  }
}

const publicClaimIds = new Set([
  ...occurrenceSourceIdsByClaim.keys(),
  ...knowledgeBank.claims
    .filter((claim) => claim.projections.some((projection) => projection.status === "active" && projection.surfaces.some((surface) => surface.startsWith("/"))))
    .map((claim) => claim.id)
]);

const publicRegistry = {
  sources: knowledgeBank.sources
    .filter((source) => usedSourceIds.has(source.id))
    .map(({ protectedLocatorId: _protectedLocatorId, media: _media, supportsGenerally: _supportsGenerally, ...source }) => source),
  claims: knowledgeBank.claims
    .filter((claim) => publicClaimIds.has(claim.id))
    .map((claim) => ({
      id: claim.id,
      status: claim.status,
      projections: claim.projections.filter((projection) => projection.status === "active"),
      evidence: claim.evidence
        .filter((evidence) => evidence.renderCitation && occurrenceSourceIdsByClaim.get(claim.id)?.has(evidence.sourceId))
        .map(({ internalExcerpt: _internalExcerpt, locator: _locator, ...evidence }) => evidence),
      boundaries: claim.boundaries
    })),
  pages: knowledgeBank.pages
};

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
