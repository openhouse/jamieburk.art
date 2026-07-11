import { z } from "zod";

export const sourceLinkSchema = z.object({
  kind: z.enum([
    "canonical",
    "original",
    "archive",
    "archive-context",
    "media",
    "local-public-artifact"
  ]),
  label: z.string().min(1),
  url: z.url()
});

export const sourceRecordSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "official-web-page",
    "official-social-post",
    "archived-web-capture",
    "press",
    "public-project-artifact",
    "public-record",
    "photograph",
    "participant-archive",
    "research-audit"
  ]),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  authorOrOrganization: z.string().optional(),
  publisher: z.string().optional(),
  publishedAt: z.string().optional(),
  capturedAt: z.string().optional(),
  accessedAt: z.string().min(1),
  links: z.array(sourceLinkSchema),
  visibility: z.enum(["public", "public-metadata-only", "protected"]),
  availability: z.enum(["live", "archived", "live-and-archived", "dead", "not-recovered"]),
  publicNote: z.string().min(1),
  locator: z.string().optional(),
  establishes: z.array(z.string().min(1)).min(1),
  doesNotEstablish: z.array(z.string().min(1)).min(1),
  rightsStatus: z.string().optional(),
  creditLine: z.string().optional(),
  archiveCarrierFor: z.array(z.string().min(1)).optional(),
  supersedes: z.array(z.string().min(1)).optional(),
  lastCheckedAt: z.string().optional()
});

export const claimRecordSchema = z.object({
  id: z.string().min(1),
  internalClaim: z.string().min(1),
  publicProjection: z.string().optional(),
  status: z.enum(["defensible", "use-with-care", "open", "protected", "superseded"]),
  citationPolicy: z.enum(["required", "recommended", "not-needed"]),
  allowedSurfaces: z.array(z.string().min(1)).min(1),
  boundaries: z.array(z.string().min(1)).min(1),
  antiClaims: z.array(z.string().min(1)).min(1),
  approvalOwner: z.string().min(1),
  lastReviewedAt: z.string().min(1),
  supersedes: z.array(z.string().min(1)).optional(),
  supersededBy: z.array(z.string().min(1)).optional()
});

export const evidenceRelationshipSchema = z.object({
  id: z.string().min(1),
  claimId: z.string().min(1),
  sourceId: z.string().min(1),
  relation: z.enum([
    "direct",
    "corroborating",
    "contextual",
    "archival-carrier",
    "visual-evidence",
    "metadata-evidence",
    "participant-archive-only",
    "qualifies",
    "contradictory",
    "negative-search-result",
    "does-not-support"
  ]),
  supportsText: z.string().min(1),
  locator: z.string().optional(),
  publicCitation: z.boolean(),
  citationNote: z.string().optional(),
  confidence: z.enum(["confirmed", "strong", "working", "uncertain"]),
  limitations: z.array(z.string().min(1))
});

export const citationNoteSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  claimIds: z.array(z.string().min(1)).min(1),
  evidenceIds: z.array(z.string().min(1)).min(1),
  publicText: z.string().min(1),
  qualification: z.string().optional(),
  status: z.enum(["ready", "open", "protected", "superseded"])
});

export const citationPageSchema = z.object({
  route: z.string().startsWith("/"),
  slug: z.string().min(1),
  referenceHeading: z.literal("References"),
  occurrences: z.array(z.object({
    id: z.string().min(1),
    noteId: z.string().min(1)
  })).min(1)
});

export const artifactRecordSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["photograph", "document", "diagram", "screenshot", "video"]),
  title: z.string().min(1),
  sourceId: z.string().optional(),
  rightsStatus: z.enum(["cleared", "review-required", "not-cleared", "unknown"]),
  publicationStatus: z.enum(["public", "metadata-only", "protected"]),
  photographerOrCreator: z.string().optional(),
  creditLine: z.string().optional(),
  capturedAt: z.string().optional(),
  visiblyEstablishes: z.array(z.string().min(1)),
  doesNotEstablish: z.array(z.string().min(1)).min(1),
  representedPeopleReview: z.string().optional(),
  cropNotes: z.string().optional(),
  altTextDraft: z.string().optional(),
  captionDraft: z.string().optional()
});

export const researchRunSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1),
  performedAt: z.string().min(1),
  method: z.string().min(1),
  scope: z.record(z.string(), z.union([z.number(), z.string()])),
  result: z.string().min(1),
  interpretation: z.string().min(1),
  doesNotProve: z.array(z.string().min(1)).min(1),
  privateArtifactId: z.string().optional(),
  publicSummary: z.string().optional()
});

export const correctionRecordSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["open", "required-before-production", "resolved", "superseded"]),
  targetType: z.enum(["page-copy", "claim", "source", "resume-pdf", "artifact"]),
  targetIdOrPath: z.string().min(1),
  currentText: z.string().optional(),
  replacementText: z.string().optional(),
  reason: z.string().min(1),
  relatedClaimIds: z.array(z.string().min(1)),
  relatedSourceIds: z.array(z.string().min(1)),
  openedAt: z.string().min(1),
  resolvedAt: z.string().optional()
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type CitationNote = z.infer<typeof citationNoteSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type ArtifactRecord = z.infer<typeof artifactRecordSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
