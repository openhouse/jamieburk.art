import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function normalize(value) {
  return value.normalize("NFKC").replace(/[\u2010-\u2015]/g, "-").replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

function walk(relativePath) {
  const absolute = path.join(repoRoot, relativePath);
  if (!existsSync(absolute)) return [];
  if (!statSync(absolute).isDirectory()) return [relativePath];
  return readdirSync(absolute).sort().flatMap((name) => walk(path.posix.join(relativePath, name)));
}

export function loadPublicSurfaceFiles() {
  const roots = [
    "apps/www/src/app",
    "apps/www/src/components",
    "apps/www/src/content",
    "apps/www/src/data/proofs.ts",
    "apps/www/src/data/work.ts"
  ];
  return roots.flatMap(walk).filter((file) => /\.(?:ts|tsx|mdx|json)$/.test(file)).map((file) => ({
    file,
    content: readFileSync(path.join(repoRoot, file), "utf8")
  }));
}

export function buildPublicRegistry(bank = knowledgeBank) {
  const usedSourceIds = new Set(bank.pages.flatMap((page) => page.occurrences.flatMap((occurrence) => {
    const claim = bank.claims.find((item) => item.id === occurrence.claimId);
    return occurrence.sourceIds ?? claim?.evidence.filter((item) => item.renderCitation).map((item) => item.sourceId) ?? [];
  })));
  return {
    sources: bank.sources
      .filter((source) => usedSourceIds.has(source.id))
      .map(({ protectedLocatorId: _protectedLocatorId, media: _media, supportsGenerally: _supportsGenerally, ...source }) => source),
    claims: bank.claims
      .filter((claim) => bank.pages.some((page) => page.occurrences.some((occurrence) => occurrence.claimId === claim.id)))
      .map((claim) => ({
        id: claim.id,
        status: claim.status,
        projections: claim.projections.filter((projection) => projection.status === "active"),
        evidence: claim.evidence
          .filter((evidence) => evidence.renderCitation && usedSourceIds.has(evidence.sourceId))
          .map(({ internalExcerpt: _internalExcerpt, locator: _locator, ...evidence }) => evidence),
        boundaries: claim.boundaries
      })),
    pages: bank.pages
  };
}

export function validateProjectionConsistency({
  bank = knowledgeBank,
  registryText = readFileSync(path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json"), "utf8"),
  publicFiles = loadPublicSurfaceFiles()
} = {}) {
  const errors = [];
  const claimById = new Map(bank.claims.map((claim) => [claim.id, claim]));
  const sourceById = new Map(bank.sources.map((source) => [source.id, source]));
  const publicCorpus = normalize(publicFiles.map((item) => item.content).join("\n"));

  const expectedRegistry = `${JSON.stringify(buildPublicRegistry(bank), null, 2)}\n`;
  if (registryText !== expectedRegistry) errors.push("public registry disagrees with canonical knowledge records");

  for (const claim of bank.claims) {
    for (const projection of claim.projections) {
      if (projection.status === "active" && projection.surfaces.length === 0) {
        errors.push(`${claim.id}: active projection has no authorized surface`);
      }
      if (projection.status === "hold" && publicCorpus.includes(normalize(projection.text))) {
        errors.push(`${claim.id}: held projection leaked into a public surface`);
      }
    }
  }

  for (const page of bank.pages) {
    for (const occurrence of page.occurrences) {
      const claim = claimById.get(occurrence.claimId);
      if (!claim) {
        errors.push(`${page.id}/${occurrence.id}: unknown claim ${occurrence.claimId}`);
        continue;
      }
      const projection = claim.projections.find((item) => item.key === occurrence.projection && item.status === "active");
      if (!projection) errors.push(`${page.id}/${occurrence.id}: occurrence does not resolve to an active projection`);
      else if (!projection.surfaces.includes(page.surface)) errors.push(`${page.id}/${occurrence.id}: ${page.surface} is not an authorized surface`);
      const sourceIds = occurrence.sourceIds ?? claim.evidence.filter((item) => item.renderCitation).map((item) => item.sourceId);
      for (const sourceId of sourceIds) {
        const source = sourceById.get(sourceId);
        if (!source) errors.push(`${page.id}/${occurrence.id}: unknown source ${sourceId}`);
        else if (source.visibility === "protected") errors.push(`${page.id}/${occurrence.id}: protected source ${sourceId} cannot render`);
      }
    }
  }

  for (const correction of bank.corrections) {
    const publicCorrection = correction.affectedSurfaces.some((surface) => surface.startsWith("/") || ["homepage", "resume", "technical-operations"].includes(surface));
    if (publicCorrection && publicCorpus.includes(normalize(correction.previousText))) {
      errors.push(`${correction.id}: superseded wording remains on a public surface`);
    }
  }
  return errors;
}
