import { z } from "zod";

const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a stable kebab-case identifier");

const publicUrlSchema = z.url().refine(
  (value) => !/^(?:file:)|localhost|127\.0\.0\.1/i.test(value),
  "Citation URLs must be public web URLs"
);

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

export const publicationStatusSchema = z.enum([
  "public",
  "public-with-caveat",
  "private",
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
  "private",
  "rejected"
]);

export const sourceRecordSchema = z
  .object({
    id: stableIdSchema,
    title: z.string().min(1),
    shortLabel: z.string().min(1),
    authorOrAccount: z.string().min(1).optional(),
    publisher: z.string().min(1).optional(),
    datePublished: z.iso.date().optional(),
    sourceClass: sourceClassSchema,
    mediaType: mediaTypeSchema,
    publicationStatus: publicationStatusSchema,
    canonicalUrl: publicUrlSchema.optional(),
    archiveUrl: publicUrlSchema.optional(),
    originalUrl: publicUrlSchema.optional(),
    accessedAt: z.iso.date().optional(),
    lastVerifiedAt: z.iso.date().optional(),
    linkStatus: z.enum(["live", "archived", "unavailable", "unchecked"]).optional(),
    rightsStatus: z.string().min(1).optional(),
    creditLine: z.string().min(1).optional(),
    publicSourceNote: z.string().min(1),
    researchNote: z.string().min(1).optional()
  })
  .superRefine((source, context) => {
    if (
      source.publicationStatus === "private" &&
      (source.canonicalUrl || source.archiveUrl || source.originalUrl)
    ) {
      context.addIssue({
        code: "custom",
        message: "Private sources cannot expose public URLs"
      });
    }
  });

export const claimEvidenceSchema = z.object({
  sourceId: stableIdSchema,
  relation: evidenceRelationSchema,
  locator: z.string().min(1).optional(),
  supports: z.string().min(1),
  doesNotSupport: z.string().min(1).optional()
});

export const claimRecordSchema = z.object({
  id: stableIdSchema,
  projectId: stableIdSchema,
  publicText: z.string().min(1),
  status: claimStatusSchema,
  strength: claimStrengthSchema,
  mustCite: z.boolean(),
  evidence: z.array(claimEvidenceSchema).min(1),
  caveat: z.string().min(1).optional(),
  antiClaims: z.array(z.string().min(1)).default([]),
  publicSurfaces: z.array(stableIdSchema),
  reviewedBy: z.array(z.string().min(1)).optional(),
  reviewedAt: z.iso.date().optional()
});

export const citationNoteRecordSchema = z.object({
  id: stableIdSchema,
  shortLabel: z.string().min(1),
  claimIds: z.array(stableIdSchema).min(1),
  sourceIds: z.array(stableIdSchema).min(1),
  publicNote: z.string().min(1),
  publicCaveat: z.string().min(1).optional()
});

export const citationReferenceSchema = z.object({
  refId: stableIdSchema,
  noteId: stableIdSchema
});

export const pageCitationSetSchema = z.object({
  pageId: stableIdSchema,
  references: z.array(citationReferenceSchema).min(1)
});

export type SourceClass = z.infer<typeof sourceClassSchema>;
export type MediaType = z.infer<typeof mediaTypeSchema>;
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type ClaimStrength = z.infer<typeof claimStrengthSchema>;
export type EvidenceRelation = z.infer<typeof evidenceRelationSchema>;
export type ClaimStatus = z.infer<typeof claimStatusSchema>;
export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimEvidence = z.infer<typeof claimEvidenceSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type CitationNoteRecord = z.infer<typeof citationNoteRecordSchema>;
export type CitationReference = z.infer<typeof citationReferenceSchema>;
export type PageCitationSet = z.infer<typeof pageCitationSetSchema>;
