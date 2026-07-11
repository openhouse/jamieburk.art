import { z } from "zod";

export const sourceTypeSchema = z.enum([
  "official-web-page",
  "official-social-post",
  "archived-web-capture",
  "press",
  "public-project-artifact",
  "public-record",
  "photograph",
  "participant-archive",
  "research-audit"
]);

export const sourceVisibilitySchema = z.enum([
  "public",
  "public-metadata-only",
  "protected"
]);

export const sourceAvailabilitySchema = z.enum([
  "live",
  "archived",
  "live-and-archived",
  "dead",
  "not-recovered"
]);

export const sourceLinkSchema = z.object({
  kind: z.enum([
    "canonical",
    "original",
    "archive",
    "archive-context",
    "media",
    "local-public-artifact"
  ]),
  url: z.url(),
  label: z.string().min(1)
});

export const knowledgeSourceSchema = z.object({
  id: z.string().min(1),
  type: sourceTypeSchema,
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  authorOrOrganization: z.string().min(1).optional(),
  publisher: z.string().min(1).optional(),
  publishedAt: z.string().min(1).optional(),
  capturedAt: z.string().min(1).optional(),
  accessedAt: z.string().min(1),
  links: z.array(sourceLinkSchema),
  visibility: sourceVisibilitySchema,
  availability: sourceAvailabilitySchema,
  publicNote: z.string().min(1),
  locator: z.string().min(1).optional(),
  establishes: z.array(z.string().min(1)).min(1),
  doesNotEstablish: z.array(z.string().min(1)).min(1),
  rightsStatus: z.string().min(1).optional(),
  creditLine: z.string().min(1).optional(),
  archiveCarrierFor: z.array(z.string().min(1)).optional(),
  supersedes: z.array(z.string().min(1)).optional(),
  lastCheckedAt: z.string().min(1).optional()
});

export const knowledgeClaimSchema = z.object({
  id: z.string().min(1),
  internalClaim: z.string().min(1),
  publicProjection: z.string().min(1).optional(),
  status: z.enum(["defensible", "use-with-care", "open", "protected", "superseded"]),
  allowedSurfaces: z.array(z.string().min(1)).min(1),
  boundaries: z.array(z.string().min(1)).min(1),
  antiClaims: z.array(z.string().min(1)).min(1),
  approvalOwner: z.string().min(1),
  lastReviewedAt: z.string().min(1),
  supersedes: z.array(z.string().min(1)).optional(),
  supersededBy: z.array(z.string().min(1)).optional()
});

export const evidenceRelationshipSchema = z.object({
  claimId: z.string().min(1),
  sourceId: z.string().min(1),
  supportType: z.enum([
    "direct",
    "corroborating",
    "contextual",
    "archival-carrier",
    "participant-archive-only",
    "contradictory",
    "negative-search-result"
  ]),
  supportsText: z.string().min(1),
  locator: z.string().min(1).optional(),
  publicCitation: z.boolean(),
  citationNote: z.string().min(1).optional(),
  confidence: z.enum(["confirmed", "strong", "working", "uncertain"]),
  limitations: z.array(z.string().min(1))
});

export const researchAuditSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1),
  performedAt: z.string().min(1),
  method: z.string().min(1),
  scope: z.record(z.string(), z.union([z.number(), z.string()])),
  result: z.string().min(1),
  interpretation: z.string().min(1),
  doesNotProve: z.array(z.string().min(1)).min(1)
});

export const citationPageSchema = z.object({
  route: z.string().startsWith("/"),
  slug: z.string().min(1),
  occurrences: z.array(
    z.object({
      id: z.string().min(1),
      claimId: z.string().min(1)
    })
  )
});

export const knowledgeBundleSchema = z.object({
  sources: z.array(knowledgeSourceSchema),
  claims: z.array(knowledgeClaimSchema),
  evidence: z.array(evidenceRelationshipSchema),
  researchAudits: z.array(researchAuditSchema),
  pages: z.array(citationPageSchema)
});

export type KnowledgeSource = z.infer<typeof knowledgeSourceSchema>;
export type KnowledgeClaim = z.infer<typeof knowledgeClaimSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ResearchAudit = z.infer<typeof researchAuditSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type KnowledgeBundle = z.infer<typeof knowledgeBundleSchema>;

export type ResolvedCitationSource = {
  source: KnowledgeSource;
  evidence: EvidenceRelationship;
  number: number;
  targetId: string;
  refId: string;
};

export type ResolvedCitationOccurrence = {
  id: string;
  claim: KnowledgeClaim;
  sources: ResolvedCitationSource[];
};

export type ResolvedSourceNote = {
  source: KnowledgeSource;
  evidence: EvidenceRelationship[];
  number: number;
  targetId: string;
  backlinks: { id: string; label: string }[];
};

export type ResolvedCitationPage = {
  route: string;
  slug: string;
  occurrences: ResolvedCitationOccurrence[];
  sources: ResolvedSourceNote[];
};
