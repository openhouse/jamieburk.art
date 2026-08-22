import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const outputUrl = new URL(
  "../apps/www/src/data/knowledge-bank/public-registry.json",
  import.meta.url
);

const claimsById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const sourcesById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));

function publicSourceIdsForOccurrence(occurrence) {
  const claim = claimsById.get(occurrence.claimId);
  const renderableSourceIds = new Set(
    claim?.evidence
      .filter((item) => item.renderCitation)
      .map((item) => item.sourceId) ?? []
  );
  const requestedSourceIds = occurrence.sourceIds ?? [...renderableSourceIds];

  return requestedSourceIds.filter(
    (sourceId) =>
      renderableSourceIds.has(sourceId) &&
      sourcesById.get(sourceId)?.visibility === "public"
  );
}

const publicPages = knowledgeBank.pages.map((page) => {
  const occurrences = page.occurrences.map((occurrence) => {
    const sourceIds = publicSourceIdsForOccurrence(occurrence);
    const { sourceIds: _sourceIds, ...redactedOccurrence } = occurrence;

    return sourceIds.length > 0
      ? { ...redactedOccurrence, sourceIds }
      : redactedOccurrence;
  });
  const pageSourceIds = new Set(
    occurrences.flatMap((occurrence) => occurrence.sourceIds ?? [])
  );

  return {
    ...page,
    sourceOrder: page.sourceOrder.filter((sourceId) => pageSourceIds.has(sourceId)),
    occurrences
  };
});

const usedSourceIds = new Set(
  publicPages.flatMap((page) =>
    page.occurrences.flatMap((occurrence) => occurrence.sourceIds ?? [])
  )
);

const publicRegistry = {
  sources: knowledgeBank.sources
    .filter((source) => source.visibility === "public" && usedSourceIds.has(source.id))
    .map(({ protectedLocatorId: _protectedLocatorId, media: _media, supportsGenerally: _supportsGenerally, ...source }) => source),
  claims: knowledgeBank.claims
    .filter((claim) => knowledgeBank.pages.some((page) => page.occurrences.some((occurrence) => occurrence.claimId === claim.id)))
    .map((claim) => ({
      id: claim.id,
      status: claim.status,
      projections: claim.projections.filter((projection) => projection.status === "active"),
      evidence: claim.evidence
        .filter((evidence) => evidence.renderCitation && usedSourceIds.has(evidence.sourceId))
        .map(({ internalExcerpt: _internalExcerpt, locator: _locator, ...evidence }) => evidence),
      boundaries: claim.boundaries
    })),
  pages: publicPages
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
