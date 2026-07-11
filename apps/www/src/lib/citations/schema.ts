import { z } from "zod";

export const publicVisibilitySchema = z.enum([
  "public",
  "link-only",
  "restricted",
  "private",
  "protected",
  "not-for-projection"
]);

export const sourceAvailabilitySchema = z.enum([
  "live",
  "archived",
  "live-and-archived",
  "not-recovered",
  "private",
  "unavailable"
]);

export const sourceRecordSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "official-web",
    "official-social-post",
    "social-post",
    "archive-capture",
    "promotional-image",
    "press",
    "public-code-repository",
    "participant-photo",
    "research-log"
  ]),
  publisher: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url().optional(),
  archiveUrls: z.array(z.string().url()).optional(),
  archiveRelation: z.string().optional(),
  datePublished: z.string().optional(),
  dateCaptured: z.string().optional(),
  dateAccessed: z.string().min(1),
  availability: sourceAvailabilitySchema,
  publicVisibility: publicVisibilitySchema,
  scopeNote: z.string().min(1),
  doesNotSupport: z.array(z.string()).optional(),
  rightsHolder: z.string().optional(),
  rightsStatus: z.string().optional(),
  consentStatus: z.string().optional()
});

export const evidenceRelationSchema = z.enum([
  "supports",
  "corroborates",
  "qualifies",
  "contextualizes",
  "contradicts",
  "documents-negative-search"
]);

export const claimRecordSchema = z.object({
  id: z.string().min(1),
  projectId: z.string().min(1),
  publicText: z.string().min(1),
  status: z.enum([
    "approved",
    "approved-qualified",
    "needs-review",
    "do-not-publish"
  ]),
  confidence: z.enum(["high", "medium", "low"]),
  evidence: z.array(
    z.object({
      sourceId: z.string().min(1),
      relation: evidenceRelationSchema,
      note: z.string().min(1)
    })
  ),
  caveat: z.string().optional(),
  antiClaims: z.array(z.string()).optional(),
  projectedPages: z.array(z.string().regex(/^\//)),
  lastReviewedAt: z.string().min(1)
});

export const pageCitationsSchema = z.record(
  z.string().regex(/^\//),
  z.array(z.string().min(1))
);

export const mediaRecordSchema = z.object({
  id: z.string().min(1),
  kind: z.string().min(1),
  title: z.string().min(1),
  visibility: z.enum(["public", "restricted", "private", "protected"]),
  eventAssociation: z.string().optional(),
  visibleEvidence: z.array(z.string()).optional(),
  photographer: z.string().optional(),
  rightsHolder: z.string().optional(),
  rightsStatus: z.string().min(1),
  consentStatus: z.string().min(1),
  publicUrl: z.string().url().optional(),
  publicCaption: z.string().optional(),
  publicationStatus: z.enum([
    "public",
    "approved",
    "pending-rights",
    "restricted",
    "do-not-publish"
  ]),
  cropRestrictions: z.array(z.string()).optional(),
  protectedPeople: z.array(z.string()).optional()
});

export const researchRunRecordSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  method: z.string().min(1),
  scope: z.string().min(1),
  performedAt: z.string().min(1),
  result: z.string().min(1),
  limitation: z.string().min(1),
  publicProjection: z.enum(["none", "summary", "full-public-note"])
});

export const correctionRecordSchema = z.object({
  id: z.string().min(1),
  subjectId: z.string().min(1),
  status: z.enum(["informational", "required-before-production", "applied"]),
  priorWording: z.string().optional(),
  revisedWording: z.string().min(1),
  reason: z.string().min(1),
  effectiveAt: z.string().min(1),
  reviewedBy: z.array(z.string()).optional(),
  supersedes: z.array(z.string()).optional()
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type EvidenceRelation = z.infer<typeof evidenceRelationSchema>;
export type PageCitations = z.infer<typeof pageCitationsSchema>;
export type MediaRecord = z.infer<typeof mediaRecordSchema>;
export type ResearchRunRecord = z.infer<typeof researchRunRecordSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
