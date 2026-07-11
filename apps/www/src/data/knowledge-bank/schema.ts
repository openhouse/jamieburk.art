import { z } from "zod";

const reviewedDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const semanticIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const sourceClassSchema = z.enum([
  "official-record",
  "official-social-post",
  "archival-capture",
  "independent-reporting",
  "participant-archive",
  "project-artifact",
  "research-log"
]);

export const accessStatusSchema = z.enum([
  "live",
  "archived",
  "dead",
  "private",
  "not-recovered"
]);

export const sourceRecordSchema = z
  .object({
    id: semanticIdSchema,
    type: z.enum([
      "webpage",
      "social-post",
      "article",
      "image",
      "dataset",
      "report",
      "research-log"
    ]),
    title: z.string().min(1),
    authors: z.array(z.string()).default([]),
    publisher: z.string().optional(),
    issued: z.string().optional(),
    url: z.string().url().optional(),
    archiveUrl: z.string().url().optional(),
    assetUrl: z.string().url().optional(),
    sourceClass: sourceClassSchema,
    accessStatus: accessStatusSchema,
    publicLinkAllowed: z.boolean(),
    citationLabel: z.string().min(1),
    publicNote: z.string().optional(),
    lastReviewed: reviewedDateSchema
  })
  .strict();

export const evidenceRelationSchema = z.enum([
  "direct-support",
  "corroborating",
  "context",
  "participant-reconstruction",
  "negative-search",
  "contradiction"
]);

export const evidenceRecordSchema = z
  .object({
    id: semanticIdSchema,
    sourceId: semanticIdSchema,
    relation: evidenceRelationSchema,
    locator: z.string().optional(),
    supportNote: z.string().min(1),
    publicCitationAllowed: z.boolean()
  })
  .strict();

export const claimStateSchema = z.enum(["known", "open", "protected"]);

export const claimPrecisionSchema = z.enum([
  "exact",
  "approximate",
  "month-only",
  "reconstructed",
  "not-recovered"
]);

export const claimRecordSchema = z
  .object({
    id: semanticIdSchema,
    canonicalText: z.string().min(1),
    publicProjection: z.string().optional(),
    state: claimStateSchema,
    precision: claimPrecisionSchema,
    supportLevel: z.enum(["strong", "moderate", "limited"]),
    evidenceIds: z.array(semanticIdSchema).min(1),
    allowedSurfaces: z.array(z.string().min(1)).min(1),
    boundaries: z.array(z.string()).default([]),
    lastReviewed: reviewedDateSchema
  })
  .strict();

export const pageCitationSchema = z
  .object({
    id: semanticIdSchema,
    path: z.string().startsWith("/"),
    claimOrder: z.array(semanticIdSchema).min(1)
  })
  .strict();

export const researchRunSchema = z
  .object({
    id: semanticIdSchema,
    method: z.string().min(1),
    conductedAt: reviewedDateSchema,
    scope: z.record(z.string(), z.number()),
    finding: z.string().min(1),
    limitations: z.array(z.string()).min(1)
  })
  .strict();

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type EvidenceRecord = z.infer<typeof evidenceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type CitationPage = z.infer<typeof pageCitationSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
