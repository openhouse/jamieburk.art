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

for (const claim of knowledgeBank.claims) {
  const activeSurfaces = new Set(
    claim.projections.filter((projection) => projection.status === "active").flatMap((projection) => projection.surfaces)
  );
  for (const surface of activeSurfaces) {
    const decision = knowledgeBank.projectionDecisions.find(
      (item) => item.claimId === claim.id && item.surface === surface
    );
    if (!decision || decision.decision !== "publish") {
      throw new Error(`${claim.id} cannot serialize an active ${surface} projection without a publish decision`);
    }
  }
  for (const decision of knowledgeBank.projectionDecisions.filter((item) => item.claimId === claim.id)) {
    if (decision.decision !== "publish" && activeSurfaces.has(decision.surface)) {
      throw new Error(`${claim.id} has a ${decision.decision} decision on active surface ${decision.surface}`);
    }
  }
}

for (const page of knowledgeBank.pages) {
  for (const occurrence of page.occurrences) {
    const claim = knowledgeBank.claims.find((item) => item.id === occurrence.claimId);
    const decision = knowledgeBank.projectionDecisions.find(
      (item) => item.claimId === occurrence.claimId && item.surface === page.surface
    );
    if (!claim || claim.maturity !== "projected") {
      throw new Error(`${occurrence.claimId} cannot enter the public registry without projected maturity`);
    }
    if (!decision || decision.decision !== "publish") {
      throw new Error(`${occurrence.claimId} cannot enter ${page.surface} without a publish decision`);
    }
  }
}

const publicRegistry = {
  sources: knowledgeBank.sources
    .filter((source) => usedSourceIds.has(source.id))
    .map(({ protectedLocatorId: _protectedLocatorId, media: _media, supportsGenerally: _supportsGenerally, intakeIds: _intakeIds, ...source }) => source),
  claims: knowledgeBank.claims
    .filter((claim) => knowledgeBank.pages.some((page) => page.occurrences.some((occurrence) => occurrence.claimId === claim.id)))
    .map((claim) => ({
      id: claim.id,
      status: claim.status,
      projections: claim.projections.filter((projection) => projection.status === "active"),
      evidence: claim.evidence
        .filter((evidence) => evidence.renderCitation && usedSourceIds.has(evidence.sourceId))
        .map(({ locator: _locator, propositionIds: _propositionIds, ...evidence }) => evidence),
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
