import { z } from "zod";

const kebabIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a stable kebab-case identifier");

const objectIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "Use a stable dotted or kebab-case identifier");

const publicUrlSchema = z.url().refine(
  (value) =>
    value.startsWith("https://") &&
    !/(?:localhost|127\.0\.0\.1|staging\.jamieburk\.art|file:\/\/|\/(?:private|tmp|Users|Volumes)\/)/i.test(
      value
    ),
  "Public citation URLs must be production-safe HTTPS URLs"
);

export const sourceKindSchema = z.enum([
  "official-web-page",
  "official-social-post",
  "archived-carrier-page",
  "promotional-graphic",
  "independent-reporting",
  "participant-photograph",
  "project-archive",
  "research-run",
  "internal-record"
]);

export const sourceVisibilitySchema = z.enum([
  "public",
  "restricted",
  "private",
  "protected"
]);

export const sourceAvailabilitySchema = z.enum([
  "live",
  "archived",
  "dead",
  "not-recovered",
  "private"
]);

export const sourceRecordSchema = z
  .object({
    id: kebabIdSchema,
    title: z.string().min(8),
    kind: sourceKindSchema,
    visibility: sourceVisibilitySchema,
    availability: sourceAvailabilitySchema,
    author: z.string().min(1).optional(),
    publisher: z.string().min(1).optional(),
    account: z.string().min(1).optional(),
    issuedAt: z.iso.date().optional(),
    accessedAt: z.iso.date().optional(),
    url: publicUrlSchema.optional(),
    archivedUrl: publicUrlSchema.optional(),
    archiveTimestamp: z.iso.datetime({ offset: true }).optional(),
    archiveRelation: z.string().min(1).optional(),
    publicNote: z.string().min(1).optional(),
    internalNote: z.string().min(1).optional(),
    establishes: z.array(z.string().min(1)).default([]),
    doesNotEstablish: z.array(z.string().min(1)).default([]),
    rightsHolder: z.string().min(1).optional(),
    rightsStatus: z.string().min(1).optional(),
    consentStatus: z.string().min(1).optional()
  })
  .superRefine((source, context) => {
    if (source.visibility !== "public" && (source.url || source.archivedUrl)) {
      context.addIssue({
        code: "custom",
        message: "Restricted, private, and protected sources cannot expose URLs"
      });
    }
    if (source.visibility !== "public" && !source.publicNote) {
      context.addIssue({
        code: "custom",
        message: "Non-public sources need an approved public-safe summary"
      });
    }
    if (source.kind === "archived-carrier-page" && !source.archiveRelation) {
      context.addIssue({
        code: "custom",
        message: "Archived carriers must state their relationship to original evidence"
      });
    }
  });

export const evidenceRelationshipSchema = z.enum([
  "supports",
  "qualifies",
  "contextualizes",
  "contradicts",
  "does-not-support"
]);

export const evidenceLinkSchema = z.object({
  sourceId: kebabIdSchema,
  relationship: evidenceRelationshipSchema,
  locator: z.string().min(1).optional(),
  supportNote: z.string().min(1),
  limitationNote: z.string().min(1).optional()
});

export const claimStatusSchema = z.enum(["approved", "qualified", "open", "protected"]);
export const confidenceSchema = z.enum(["high", "medium-high", "medium", "low"]);
export const projectionSurfaceSchema = z.enum([
  "homepage",
  "work-card",
  "case-study",
  "technical-operations",
  "resume-page",
  "lab",
  "photo-caption"
]);

export const claimRecordSchema = z.object({
  id: objectIdSchema,
  publicText: z.string().min(1),
  internalText: z.string().min(1).optional(),
  status: claimStatusSchema,
  confidence: confidenceSchema,
  qualifiers: z.array(z.string().min(1)).optional(),
  evidence: z.array(evidenceLinkSchema).min(1),
  projectionSurfaces: z.array(projectionSurfaceSchema),
  approvalOwner: z.string().min(1),
  approvedAt: z.iso.date().optional(),
  antiClaims: z.array(z.string().min(1)).optional(),
  protectedBoundary: z.string().min(1).optional()
});

export const evidenceNoteRecordSchema = z.object({
  id: kebabIdSchema,
  claimIds: z.array(objectIdSchema).min(1),
  sourceIds: z.array(kebabIdSchema).min(1),
  title: z.string().min(8),
  publicSummary: z.string().min(1),
  qualification: z.string().min(1).optional(),
  preferredSourceId: kebabIdSchema.optional(),
  renderMode: z.enum(["full", "summary-only"]).default("full")
});

export const citationOccurrenceSchema = z.object({
  refId: kebabIdSchema,
  noteId: kebabIdSchema
});

export const pageCitationManifestSchema = z.object({
  pageId: kebabIdSchema,
  path: z.string().regex(/^\/[a-z0-9-/]*$/),
  mdxPath: z.string().min(1),
  allowedNoteIds: z.array(kebabIdSchema).min(1),
  occurrences: z.array(citationOccurrenceSchema).min(1),
  expectedOccurrenceCount: z.number().int().positive()
});

export const researchRunRecordSchema = z.object({
  id: kebabIdSchema,
  purpose: z.string().min(1),
  performedAt: z.iso.date(),
  method: z.string().min(1),
  queryScope: z.array(z.string().min(1)).optional(),
  tools: z.array(z.string().min(1)).optional(),
  capturesReviewed: z.number().int().nonnegative().optional(),
  originalUrlsReviewed: z.number().int().nonnegative().optional(),
  eventUrlKeysReviewed: z.number().int().nonnegative().optional(),
  finding: z.string().min(1),
  limitations: z.array(z.string().min(1)).min(1),
  privateWorkingPath: z.string().min(1).optional()
});

export const mediaEvidenceRecordSchema = z.object({
  id: kebabIdSchema,
  sourceId: kebabIdSchema,
  filename: z.string().min(1).optional(),
  photographedAt: z.iso.datetime({ offset: true }).optional(),
  photographer: z.string().min(1).optional(),
  rightsHolder: z.string().min(1).optional(),
  rightsStatus: z.string().min(1).optional(),
  consentStatus: z.string().min(1).optional(),
  eventAssociation: z.enum(["verified", "probable", "contextual-only", "unverified"]),
  visibleEvidence: z.array(z.string().min(1)).optional(),
  captionPublic: z.string().min(1).optional(),
  captionArchival: z.string().min(1).optional(),
  protectedPeople: z.array(z.string().min(1)).optional(),
  cropRestrictions: z.array(z.string().min(1)).optional()
});

export const correctionRecordSchema = z.object({
  id: kebabIdSchema,
  recordedAt: z.iso.date(),
  objectIds: z.array(objectIdSchema).min(1),
  previousPublicText: z.string().min(1).optional(),
  revisedPublicText: z.string().min(1).optional(),
  reason: z.string().min(1),
  evidenceAdded: z.array(kebabIdSchema).optional(),
  status: z.enum(["recorded", "reviewed", "published"])
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type EvidenceLink = z.infer<typeof evidenceLinkSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type EvidenceNoteRecord = z.infer<typeof evidenceNoteRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type PageCitationManifest = z.infer<typeof pageCitationManifestSchema>;
export type ResearchRunRecord = z.infer<typeof researchRunRecordSchema>;
export type MediaEvidenceRecord = z.infer<typeof mediaEvidenceRecordSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
