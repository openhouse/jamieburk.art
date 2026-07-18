import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { homepageProofs, proofClaims } from "../../apps/www/src/data/proofs.ts";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const publicEvidenceSnapshotSha = "3757c4f529cc05d169f30ec059b13bea24cc75d1";

function pinRepositoryUrl(url) {
  return typeof url === "string"
    ? url.replace("https://github.com/openhouse/jamieburk.art/blob/develop/", `https://github.com/openhouse/jamieburk.art/blob/${publicEvidenceSnapshotSha}/`)
    : url;
}

const defaultIgnorables = /[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0]/g;

function normalize(value) {
  return value.normalize("NFKC").replace(defaultIgnorables, "").replace(/[\u2010-\u2015]/g, "-").replace(/\s+/g, " ").trim().toLocaleLowerCase();
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
    "apps/www/src/data/work.ts",
    "docs/knowledge-bank/public-artifacts"
  ];
  return roots.flatMap(walk).filter((file) => /\.(?:ts|tsx|mdx|json|html|txt)$/.test(file)).map((file) => ({
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
      .filter((source) => usedSourceIds.has(source.id) && ["public", "public-metadata-only"].includes(source.visibility))
      .map(({ protectedLocatorId: _protectedLocatorId, media: _media, supportsGenerally: _supportsGenerally, ...source }) => Object.fromEntries(
        Object.entries(source).map(([key, value]) => [key, key.endsWith("Url") ? pinRepositoryUrl(value) : value])
      )),
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
  publicFiles = loadPublicSurfaceFiles(),
  projectionMapText = readFileSync(path.join(repoRoot, "docs/knowledge-bank/projection-map.md"), "utf8")
} = {}) {
  const errors = [];
  const claimById = new Map(bank.claims.map((claim) => [claim.id, claim]));
  const sourceById = new Map(bank.sources.map((source) => [source.id, source]));
  const publicCorpus = normalize(publicFiles.map((item) => item.content).join("\n"));

  if (publicFiles.length === 0) errors.push("public surface scan cannot be empty");

  const expectedRegistry = `${JSON.stringify(buildPublicRegistry(bank), null, 2)}\n`;
  if (registryText !== expectedRegistry) errors.push("public registry disagrees with canonical knowledge records");

  const coverageByProof = new Map(bank.proofCoverageTargets.map((target) => [target.proofId, target]));
  const publicFileByPath = new Map(publicFiles.map((item) => [item.file, item]));
  for (const proof of proofClaims) {
    if (!coverageByProof.has(proof.id)) errors.push(`${proof.id}: public proof is missing canonical knowledge-bank coverage`);
  }
  for (const target of bank.proofCoverageTargets) {
    if (!proofClaims.some((proof) => proof.id === target.proofId)) errors.push(`${target.proofId}: proof coverage points to an unknown public proof`);
    for (const sourceId of target.sourceIds) if (!sourceById.has(sourceId)) errors.push(`${target.proofId}: proof coverage has unknown source ${sourceId}`);
    for (const inquiryId of target.researchInquiryIds) if (!bank.researchInquiries.some((inquiry) => inquiry.id === inquiryId)) errors.push(`${target.proofId}: proof coverage has unknown inquiry ${inquiryId}`);
    for (const binding of target.projectionBindings ?? []) {
      const claim = claimById.get(binding.claimId);
      const projection = claim?.projections.find((item) => item.key === binding.projection && item.status === "active");
      if (!claim) {
        errors.push(`${target.proofId}: projection binding has unknown claim ${binding.claimId}`);
        continue;
      }
      if (!projection) {
        errors.push(`${target.proofId}: ${binding.claimId} has no active ${binding.projection} projection`);
        continue;
      }
      if (!projection.surfaces.includes(binding.surface)) {
        errors.push(`${target.proofId}: ${binding.claimId}/${binding.projection} is not authorized for ${binding.surface}`);
      }
      for (const phrase of binding.requiredPhrases) {
        if (!normalize(projection.text).includes(normalize(phrase))) {
          errors.push(`${target.proofId}: ${binding.claimId}/${binding.projection} is missing required boundary language ${JSON.stringify(phrase)}`);
        }
      }
      const sourceFile = publicFileByPath.get(binding.sourceFile);
      if (!sourceFile) {
        errors.push(`${target.proofId}: projection source file is missing from the public scan: ${binding.sourceFile}`);
        continue;
      }
      const sourceText = normalize(sourceFile.content);
      for (const token of [
        binding.claimId,
        `"${binding.projection}"`,
        `"${binding.surface}"`
      ]) {
        if (!sourceText.includes(normalize(token))) {
          errors.push(`${target.proofId}: ${binding.sourceFile} bypasses the canonical ${binding.claimId}/${binding.projection} binding`);
          break;
        }
      }
    }
  }
  for (const proof of homepageProofs) {
    const coverage = coverageByProof.get(proof.id);
    if (!coverage || ["protected-support", "research-needed"].includes(coverage.status)) errors.push(`${proof.id}: homepage proof needs public or resume-backed coverage`);
  }

  const homepageSection = projectionMapText.match(/## Homepage Proof Strip\s+([\s\S]*?)(?=\n## |$)/)?.[1] ?? "";
  const documentedHomepageProofIds = [...homepageSection.matchAll(/^- `([^`]+)`$/gm)].map((match) => match[1]);
  const executableHomepageProofIds = homepageProofs.map((proof) => proof.id);
  if (JSON.stringify(documentedHomepageProofIds) !== JSON.stringify(executableHomepageProofIds)) {
    errors.push("docs/knowledge-bank/projection-map.md homepage proof strip disagrees with executable homepageProofs");
  }

  for (const claim of bank.claims) {
    if (claim.projections.some((projection) => projection.status === "hold") && publicCorpus.includes(normalize(claim.id))) {
      errors.push(`${claim.id}: held claim identifier leaked into a public surface`);
    }
    for (const projection of claim.projections) {
      if (projection.status === "active" && projection.surfaces.length === 0) {
        errors.push(`${claim.id}: active projection has no authorized surface`);
      }
      if (projection.status === "hold" && publicCorpus.includes(normalize(projection.text))) {
        errors.push(`${claim.id}: held projection leaked into a public surface`);
      }
    }
  }

  for (const source of bank.sources.filter((item) => item.visibility === "protected")) {
    if (publicCorpus.includes(normalize(source.id))) errors.push(`${source.id}: protected source identifier leaked into a public surface`);
    if (source.protectedLocatorId && publicCorpus.includes(normalize(source.protectedLocatorId))) {
      errors.push(`${source.id}: protected locator identifier leaked into a public surface`);
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
        else if (!["public", "public-metadata-only"].includes(source.visibility)) errors.push(`${page.id}/${occurrence.id}: non-public source ${sourceId} cannot render`);
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
