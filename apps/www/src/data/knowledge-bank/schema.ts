import { z } from "zod";

export const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const urlSchema = z.string().url();

export const sourceClassSchema = z.enum([
  "official-institutional",
  "official-organizational-social",
  "independent-journalism",
  "primary-project",
  "participant-archive",
  "web-archive",
  "research-reconstruction"
]);

export const mediaTypeSchema = z.enum([
  "web-page",
  "social-post",
  "image",
  "pdf",
  "dataset",
  "repository",
  "photograph",
  "other"
]);

export const publicUseStatusSchema = z.enum([
  "public",
  "public-with-caveat",
  "protected",
  "unavailable"
]);

export const claimStrengthSchema = z.enum([
  "direct",
  "corroborated",
  "reconstructed",
  "inferred",
  "unresolved"
]);

export const evidenceRelationSchema = z.enum([
  "supports",
  "corroborates",
  "contextualizes",
  "limits",
  "contradicts"
]);

export const claimStatusSchema = z.enum([
  "approved",
  "provisional",
  "protected",
  "rejected"
]);

export const publicSurfaceSchema = z.enum([
  "case-study",
  "technical-operations",
  "homepage",
  "resume-html",
  "resume-pdf",
  "colophon"
]);

export const sourceSchema = z
  .object({
    id: idSchema,
    title: z.string().min(1),
    shortLabel: z.string().min(1),
    authorOrAccount: z.string().optional(),
    publisher: z.string().optional(),
    datePublished: dateSchema.optional(),
    sourceClass: sourceClassSchema,
    mediaType: mediaTypeSchema,
    publicUseStatus: publicUseStatusSchema,
    canonicalUrl: urlSchema.optional(),
    archiveUrl: urlSchema.optional(),
    originalUrl: urlSchema.optional(),
    accessedAt: dateSchema.optional(),
    lastVerifiedAt: dateSchema.optional(),
    linkStatus: z.enum(["live", "archived", "unavailable", "unchecked"]),
    publicSourceNote: z.string().min(1),
    researchNote: z.string().optional(),
    rightsStatus: z.string().optional(),
    creditLine: z.string().optional(),
    preservedBySourceId: idSchema.optional()
  })
  .superRefine((source, context) => {
    if (
      source.publicUseStatus === "protected" &&
      (source.canonicalUrl || source.archiveUrl || source.originalUrl)
    ) {
      context.addIssue({
        code: "custom",
        message: "Protected sources may not expose public URLs."
      });
    }
  });

export const claimSchema = z.object({
  id: idSchema,
  projectId: idSchema,
  publicText: z.string().min(1),
  status: claimStatusSchema,
  strength: claimStrengthSchema,
  mustCite: z.boolean(),
  caveat: z.string().optional(),
  antiClaims: z.array(z.string()).default([]),
  allowedSurfaces: z.array(publicSurfaceSchema).min(1),
  reviewedBy: z.array(z.string()).default([]),
  reviewedAt: dateSchema.optional()
});

export const evidenceRelationshipSchema = z.object({
  id: idSchema,
  claimId: idSchema,
  sourceId: idSchema,
  relation: evidenceRelationSchema,
  locator: z.string().optional(),
  supports: z.string().min(1),
  doesNotSupport: z.string().optional()
});

export const citationNoteSchema = z.object({
  id: idSchema,
  shortLabel: z.string().min(1),
  claimIds: z.array(idSchema).min(1),
  sourceIds: z.array(idSchema).min(1),
  publicNote: z.string().min(1),
  publicCaveat: z.string().optional()
});

export const citationOccurrenceSchema = z.object({
  id: idSchema,
  noteId: idSchema,
  claimId: idSchema,
  accessibleLabel: z.string().min(8)
});

export const pageProjectionSchema = z.object({
  id: idSchema,
  path: z.string().startsWith("/"),
  title: z.string().min(1),
  surface: publicSurfaceSchema,
  referenceHeading: z.string().min(1).default("Sources and notes"),
  occurrences: z.array(citationOccurrenceSchema),
  assetIds: z.array(idSchema).default([])
});

export const researchRunSchema = z.object({
  id: idSchema,
  projectId: idSchema,
  conductedAt: dateSchema,
  purpose: z.string().min(1),
  method: z.string().min(1),
  counts: z.record(z.string(), z.number().int().nonnegative()),
  recovered: z.array(z.string()).min(1),
  notRecovered: z.array(z.string()).min(1),
  conclusion: z.string().min(1),
  limitation: z.string().min(1)
});

export const correctionSchema = z.object({
  id: idSchema,
  projectId: idSchema,
  recordedAt: dateSchema,
  previousText: z.array(z.string()).min(1),
  correctedText: z.string().min(1),
  reason: z.string().min(1),
  affectedSurfaces: z.array(publicSurfaceSchema).min(1),
  status: z.enum(["applied", "partially-applied", "pending"]),
  publicNote: z.string().min(1)
});

export const assetSchema = z.object({
  id: idSchema,
  projectId: idSchema,
  title: z.string().min(1),
  mediaType: mediaTypeSchema,
  publicUseStatus: publicUseStatusSchema,
  evidenceRole: z.string().min(1),
  visibleEvidence: z.array(z.string()).min(1),
  rightsStatus: z.string().min(1),
  consentStatus: z.string().min(1),
  publicBoundary: z.string().min(1),
  sourceId: idSchema,
  canonicalUrl: urlSchema.optional()
});

export type SourceRecord = z.infer<typeof sourceSchema>;
export type ClaimRecord = z.infer<typeof claimSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type CitationNoteRecord = z.infer<typeof citationNoteSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type PageProjection = z.infer<typeof pageProjectionSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
export type CorrectionRecord = z.infer<typeof correctionSchema>;
export type AssetRecord = z.infer<typeof assetSchema>;
export type PublicSurface = z.infer<typeof publicSurfaceSchema>;
