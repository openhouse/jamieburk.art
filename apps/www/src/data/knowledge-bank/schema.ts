import { z } from "zod";

const reviewedDate = z.string().date();

export const sourcePublicationModeSchema = z.enum([
  "link",
  "label-only",
  "summary-only",
  "not-public"
]);

export const sourceClassSchema = z.enum([
  "official-record",
  "official-social-post",
  "archival-capture",
  "independent-reporting",
  "participant-archive",
  "project-artifact",
  "research-log"
]);

export const sourceRecordSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum([
      "webpage",
      "social-post",
      "article",
      "report",
      "image",
      "dataset",
      "project",
      "research-log"
    ]),
    title: z.string().min(1),
    shortTitle: z.string().min(1),
    authors: z.array(z.string()),
    publisher: z.string().optional(),
    issued: z.string().optional(),
    accessedAt: reviewedDate,
    url: z.string().url().optional(),
    archiveUrl: z.string().url().optional(),
    assetUrl: z.string().url().optional(),
    sourceClass: sourceClassSchema,
    publicationMode: sourcePublicationModeSchema,
    availability: z.enum([
      "live",
      "archived",
      "live-and-archived",
      "dead",
      "not-recovered"
    ]),
    publicNote: z.string().min(1),
    establishes: z.array(z.string()).min(1),
    doesNotEstablish: z.array(z.string()).min(1),
    rightsStatus: z.string().optional(),
    consentStatus: z.string().optional(),
    creditLine: z.string().optional(),
    opaqueLocator: z.string().optional(),
    lastReviewed: reviewedDate
  })
  .strict();

export const evidenceRecordSchema = z
  .object({
    id: z.string().min(1),
    sourceId: z.string().min(1),
    claimId: z.string().min(1),
    relation: z.enum([
      "direct-support",
      "corroborating",
      "context",
      "archival-carrier",
      "participant-reconstruction",
      "negative-search",
      "contradiction"
    ]),
    locator: z.string().optional(),
    supportNote: z.string().min(1),
    limitations: z.array(z.string()),
    confidence: z.enum(["confirmed", "strong", "working", "uncertain"]),
    publicUseStatus: z.enum(["approved", "review-required", "internal-only"])
  })
  .strict();

export const claimRecordSchema = z
  .object({
    id: z.string().min(1),
    canonicalText: z.string().min(1),
    publicProjection: z.string().optional(),
    state: z.enum(["known", "open", "protected", "superseded"]),
    precision: z.enum([
      "exact",
      "approximate",
      "month-only",
      "reconstructed",
      "not-recovered"
    ]),
    supportLevel: z.enum(["strong", "moderate", "limited"]),
    allowedSurfaces: z.array(z.string()).min(1),
    boundaries: z.array(z.string()),
    antiClaims: z.array(z.string()),
    approvalOwner: z.string().min(1),
    lastReviewed: reviewedDate,
    supersedes: z.array(z.string()).optional(),
    supersededBy: z.array(z.string()).optional()
  })
  .strict();

export const citationNoteRecordSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    shortLabel: z.string().min(1),
    claimIds: z.array(z.string()).min(1),
    evidenceIds: z.array(z.string()).min(1),
    publicSummary: z.string().min(1),
    boundaries: z.array(z.string()),
    publicationState: z.enum(["public", "withheld"]),
    lastReviewed: reviewedDate
  })
  .strict();

export const mediaRecordSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(["photograph", "screenshot", "graphic", "document", "diagram"]),
    title: z.string().min(1),
    sourceId: z.string().optional(),
    date: z.string().optional(),
    rightsStatus: z.enum(["cleared", "likely-cleared", "needs-research", "not-cleared"]),
    consentStatus: z.enum(["approved", "needs-consent", "not-applicable", "do-not-use"]),
    publicUseStatus: z.enum([
      "approved-public",
      "public-summary-only",
      "review-required",
      "private",
      "do-not-use"
    ]),
    evidentiaryScope: z.enum(["direct", "contextual", "representative"]),
    establishes: z.array(z.string()),
    doesNotEstablish: z.array(z.string()),
    boundaries: z.array(z.string()),
    creditLine: z.string().optional(),
    opaqueLocator: z.string().optional(),
    lastReviewed: reviewedDate
  })
  .strict();

export const researchRunSchema = z
  .object({
    id: z.string().min(1),
    question: z.string().min(1),
    method: z.string().min(1),
    conductedAt: reviewedDate,
    scope: z.record(z.string(), z.union([z.number(), z.string()])),
    recovered: z.array(z.string()),
    notRecovered: z.array(z.string()),
    finding: z.string().min(1),
    publicSummary: z.string().optional(),
    limitations: z.array(z.string()).min(1),
    publicationState: z.enum(["public-summary", "internal-only"])
  })
  .strict();

export const correctionRecordSchema = z
  .object({
    id: z.string().min(1),
    surface: z.string().min(1),
    field: z.string().min(1),
    previousValue: z.string().min(1),
    correctedValue: z.string().min(1),
    reason: z.string().min(1),
    evidenceIds: z.array(z.string()).min(1),
    status: z.enum(["proposed", "applied", "follow-up-required"]),
    resolvedAt: reviewedDate.optional(),
    lastReviewed: reviewedDate
  })
  .strict();

export const citationPageSchema = z
  .object({
    id: z.string().min(1),
    path: z.string().startsWith("/"),
    occurrences: z
      .array(
        z
          .object({
            id: z.string().min(1),
            noteId: z.string().min(1)
          })
          .strict()
      )
      .min(1)
  })
  .strict();

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type EvidenceRecord = z.infer<typeof evidenceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type CitationNoteRecord = z.infer<typeof citationNoteRecordSchema>;
export type MediaRecord = z.infer<typeof mediaRecordSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
