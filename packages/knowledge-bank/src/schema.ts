import { z } from "zod";

const id = z.string().min(1).regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);
const text = z.string().min(1);
const url = z.url();

export const sourceLinkSchema = z.object({
  kind: z.enum([
    "canonical",
    "original",
    "archive",
    "archive-context",
    "media",
    "local-public-artifact"
  ]),
  label: text,
  url
});

export const sourceSchema = z.object({
  id,
  type: z.enum([
    "official-web-page",
    "official-social-post",
    "archived-web-capture",
    "press",
    "public-project-artifact",
    "public-record",
    "photograph",
    "participant-archive"
  ]),
  title: text,
  shortTitle: text,
  authorOrOrganization: text.optional(),
  publisher: text.optional(),
  publishedAt: text.optional(),
  capturedAt: text.optional(),
  accessedAt: text,
  visibility: z.enum(["public", "public-metadata-only", "protected"]),
  availability: z.enum([
    "live",
    "archived",
    "live-and-archived",
    "dead",
    "not-recovered"
  ]),
  links: z.array(sourceLinkSchema),
  publicNote: text,
  establishes: z.array(text).min(1),
  doesNotEstablish: z.array(text).min(1),
  rightsStatus: text.optional(),
  consentStatus: text.optional(),
  creditLine: text.optional(),
  archivalCarrierFor: z.array(id).optional(),
  lastCheckedAt: text.optional()
});

export const claimSchema = z.object({
  id,
  internalClaim: text,
  publicProjection: text.optional(),
  status: z.enum(["defensible", "use-with-care", "open", "protected", "superseded"]),
  allowedSurfaces: z.array(text).min(1),
  boundaries: z.array(text).min(1),
  antiClaims: z.array(text).min(1),
  approvalOwner: text,
  lastReviewedAt: text,
  proofId: id.optional(),
  supersedes: z.array(id).optional(),
  supersededBy: z.array(id).optional()
});

const evidenceBase = z.object({
  id,
  claimId: id,
  supportsText: text,
  locator: text.optional(),
  confidence: z.enum(["confirmed", "strong", "working", "uncertain"]),
  publicCitation: z.boolean(),
  publicNote: text.optional(),
  limitations: z.array(text)
});

export const sourceEvidenceSchema = evidenceBase.extend({
  kind: z.literal("source"),
  sourceId: id,
  supportType: z.enum([
    "direct",
    "visible-text",
    "metadata",
    "corroborating",
    "contextual",
    "archival-carrier",
    "participant-archive-only",
    "contradictory"
  ])
});

export const researchEvidenceSchema = evidenceBase.extend({
  kind: z.literal("research-run"),
  researchRunId: id,
  supportType: z.literal("negative-search-result")
});

export const evidenceSchema = z.discriminatedUnion("kind", [
  sourceEvidenceSchema,
  researchEvidenceSchema
]);

export const citationGroupSchema = z.object({
  id,
  title: text.optional(),
  claimIds: z.array(id).min(1),
  evidenceIds: z.array(id).min(1),
  sourceIds: z.array(id),
  researchRunIds: z.array(id),
  artifactIds: z.array(id),
  publicNote: text,
  materialLimitations: z.array(text).min(1),
  allowedSurfaces: z.array(text).min(1),
  status: z.enum(["public", "hold", "protected"])
});

export const pagePlanSchema = z.object({
  pageId: id,
  route: z.string().startsWith("/"),
  heading: text.default("Sources"),
  occurrences: z.array(
    z.object({
      id,
      citationGroupId: id
    })
  )
});

export const researchRunSchema = z.object({
  id,
  subject: text,
  performedAt: text,
  method: text,
  scope: z.record(z.string(), z.union([z.number(), z.string()])),
  result: text,
  interpretation: text,
  doesNotProve: z.array(text).min(1),
  visibility: z.enum(["public-summary", "protected"])
});

export const correctionSchema = z.object({
  id,
  subject: text,
  previousValue: text,
  correctedValue: text,
  reason: text,
  resolvedAt: text,
  relatedClaimIds: z.array(id).min(1),
  status: z.enum(["resolved", "open"])
});

export const artifactSchema = z.object({
  id,
  type: z.enum([
    "photograph",
    "screenshot",
    "graphic",
    "diagram",
    "document",
    "audio",
    "video"
  ]),
  title: text,
  sourceId: id.optional(),
  visibility: z.enum(["public", "restricted", "private", "protected"]),
  rightsStatus: text,
  consentStatus: text.optional(),
  creditLine: text.optional(),
  publicUrl: url.optional(),
  publicMetadataOnly: z.boolean().optional(),
  depicts: z.array(text).optional(),
  establishes: z.array(text).min(1),
  doesNotEstablish: z.array(text).min(1),
  captionLimits: z.array(text),
  cropLimits: z.array(text)
});

export const knowledgeBundleSchema = z.object({
  sources: z.array(sourceSchema),
  claims: z.array(claimSchema),
  evidence: z.array(evidenceSchema),
  citationGroups: z.array(citationGroupSchema),
  pagePlans: z.array(pagePlanSchema),
  researchRuns: z.array(researchRunSchema),
  corrections: z.array(correctionSchema),
  artifacts: z.array(artifactSchema)
});

export type SourceRecord = z.infer<typeof sourceSchema>;
export type ClaimRecord = z.infer<typeof claimSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceSchema>;
export type CitationGroup = z.infer<typeof citationGroupSchema>;
export type PageCitationPlan = z.infer<typeof pagePlanSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
export type CorrectionRecord = z.infer<typeof correctionSchema>;
export type ArtifactRecord = z.infer<typeof artifactSchema>;
export type KnowledgeBundle = z.infer<typeof knowledgeBundleSchema>;

export type ResolvedOccurrence = {
  id: string;
  group: CitationGroup;
  number: number;
  anchorId: string;
  targetId: string;
};

export type ResolvedReference = {
  group: CitationGroup;
  claims: ClaimRecord[];
  evidence: EvidenceRelationship[];
  sources: SourceRecord[];
  researchRuns: ResearchRun[];
  artifacts: ArtifactRecord[];
  number: number;
  targetId: string;
  backlinks: Array<{ anchorId: string; label: string }>;
};

export type ResolvedPage = {
  pageId: string;
  route: string;
  heading: string;
  occurrences: ResolvedOccurrence[];
  references: ResolvedReference[];
};
