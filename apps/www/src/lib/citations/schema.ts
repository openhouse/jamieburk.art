import { z } from "zod";

export const publicVisibilitySchema = z.enum([
  "public",
  "link-only",
  "not-for-projection"
]);

export const sourceAvailabilitySchema = z.enum([
  "live",
  "archived",
  "live-and-archived",
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
  datePublished: z.string().optional(),
  dateCaptured: z.string().optional(),
  dateAccessed: z.string().min(1),
  availability: sourceAvailabilitySchema,
  publicVisibility: publicVisibilitySchema,
  scopeNote: z.string().min(1),
  doesNotSupport: z.array(z.string()).optional()
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

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type EvidenceRelation = z.infer<typeof evidenceRelationSchema>;
export type PageCitations = z.infer<typeof pageCitationsSchema>;
