import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const sourceKindSchema = z.enum([
  "official-primary", "institutional-social-post", "archived-web-capture",
  "promotional-graphic", "independent-secondary", "participant-photograph",
  "image-metadata", "public-project", "research-log"
]);
const sourceStatusSchema = z.enum([
  "live", "archived", "live-and-archived", "dead-link",
  "not-publicly-linked", "availability-unknown"
]);
export const sourceRecordSchema = z.object({
  id: z.string().min(1), kind: sourceKindSchema, title: z.string().min(1),
  creator: z.string().optional(), publisher: z.string().optional(),
  publishedAt: z.string().optional(), accessedAt: z.string().min(1),
  url: z.url().optional(), archiveUrls: z.array(z.url()).default([]),
  mediaUrls: z.array(z.url()).default([]), locator: z.string().optional(),
  sourceStatus: sourceStatusSchema, publicDescription: z.string().min(1),
  evidentiaryScope: z.array(z.string()).min(1),
  doesNotEstablish: z.array(z.string()).default([]), notes: z.string().optional()
});
const claimEvidenceSchema = z.object({
  sourceId: z.string().min(1),
  relation: z.enum([
    "directly-supports", "corroborates", "contextualizes", "qualifies",
    "contradicts", "visual-evidence", "metadata-evidence", "does-not-support"
  ]),
  supports: z.array(z.string()).min(1), locator: z.string().optional(), note: z.string().optional()
});
export const claimRecordSchema = z.object({
  id: z.string().min(1), canonicalStatement: z.string().min(1),
  publicProjections: z.object({
    homepage: z.string().optional(), workCard: z.string().optional(),
    caseStudy: z.string().optional(), resume: z.string().optional(),
    caption: z.string().optional(), archivalNote: z.string().optional()
  }),
  knowledgeStatus: z.enum([
    "confirmed", "attributed", "corroborated", "reconstructed", "inferred",
    "unresolved", "negative-research-finding"
  ]),
  publicationStatus: z.enum([
    "ready", "ready-with-attribution", "qualified", "internal-only", "protected"
  ]),
  citationPolicy: z.enum(["required", "recommended", "not-needed"]),
  evidence: z.array(claimEvidenceSchema).min(1), publicCitationNote: z.string().min(1),
  qualifications: z.array(z.string()).default([]), antiClaims: z.array(z.string()).default([]),
  allowedSurfaces: z.array(z.string()).min(1), lastReviewedAt: z.string().min(1),
  reviewedBy: z.array(z.string()).default([]), proofProjection: z.unknown().optional()
});
export const researchRunSchema = z.object({
  id: z.string().min(1), subject: z.string().min(1), performedAt: z.string().min(1),
  method: z.string().min(1),
  scope: z.object({
    deduplicatedHtmlCaptures: z.number().int().nonnegative().optional(),
    originalUrls: z.number().int().nonnegative().optional(),
    eventUrlKeys: z.number().int().nonnegative().optional(),
    successfulPages: z.number().int().nonnegative().optional(),
    redirects: z.number().int().nonnegative().optional(),
    captured404s: z.number().int().nonnegative().optional()
  }),
  finding: z.string().min(1), limitations: z.array(z.string()).default([]),
  privateArtifactId: z.string().optional(), publicSummary: z.string().optional()
});

const dataDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)), "../data/knowledge-bank"
);

function readJson(file) {
  return JSON.parse(readFileSync(path.join(dataDirectory, file), "utf8"));
}

export function loadKnowledgeBank() {
  const sources = sourceRecordSchema.array().parse(readJson("sources.json"));
  const claims = claimRecordSchema.array().parse(readJson("claims.json"));
  const researchRuns = researchRunSchema.array().parse(readJson("research-runs.json"));
  return {
    sources,
    claims,
    researchRuns,
    sourcesById: new Map(sources.map((source) => [source.id, source])),
    claimsById: new Map(claims.map((claim) => [claim.id, claim]))
  };
}

export const positiveEvidenceRelations = new Set([
  "directly-supports", "corroborates", "contextualizes", "visual-evidence", "metadata-evidence"
]);

export function isPublicClaim(claim) {
  return claim && !["internal-only", "protected"].includes(claim.publicationStatus);
}

export function requirePublicClaim(claimsById, id) {
  const claim = claimsById.get(id);
  if (!claim) throw new Error(`Unknown knowledge-bank claim: ${id}`);
  if (!isPublicClaim(claim)) throw new Error(`Knowledge-bank claim is not public: ${id}`);
  return claim;
}

export function createCitationPlan(ids, claimsById) {
  const uniqueIds = [...new Set(ids)];
  uniqueIds.forEach((id) => requirePublicClaim(claimsById, id));
  return {
    ids: uniqueIds,
    numberFor(id) {
      const index = uniqueIds.indexOf(id);
      if (index === -1) throw new Error(`Claim is outside this citation scope: ${id}`);
      return index + 1;
    }
  };
}

export function publicSourcesForClaim(claim, sourcesById) {
  return claim.evidence
    .filter((evidence) => positiveEvidenceRelations.has(evidence.relation))
    .map((evidence) => sourcesById.get(evidence.sourceId))
    .filter(Boolean);
}

export function sourceLinks(source) {
  const links = [];
  if (source.url) links.push({ href: source.url, label: source.title });
  source.archiveUrls.forEach((href, index) => links.push({
    href, label: source.archiveUrls.length > 1 ? `Archived capture ${index + 1}` : "Archived capture"
  }));
  source.mediaUrls.forEach((href, index) => links.push({
    href, label: source.mediaUrls.length > 1 ? `Media ${index + 1}` : "Promotional graphic"
  }));
  return links;
}

export function buildCitationNote(claim, sourcesById) {
  const sources = publicSourcesForClaim(claim, sourcesById);
  const links = sources.flatMap(sourceLinks).filter((link, index, all) =>
    all.findIndex((candidate) => candidate.href === link.href) === index
  );
  return {
    text: claim.publicCitationNote,
    links,
    qualifications: claim.qualifications,
    accessibleLabel: `Citation: ${sources.map((source) => source.title).join("; ") || claim.publicCitationNote}`
  };
}
