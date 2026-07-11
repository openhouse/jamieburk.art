import { z } from "zod";

const linkSchema = z.object({
  kind: z.enum(["canonical", "archive", "media", "local-public-artifact"]),
  label: z.string().min(1),
  url: z.url(),
  capturedAt: z.string().optional(),
  note: z.string().optional()
});

export const SourceRecordSchema = z.object({
  id: z.string().min(1),
  sourceClass: z.enum([
    "official-government-post",
    "organizer-social-post",
    "official-webpage",
    "public-record",
    "press",
    "public-repository",
    "promotional-image",
    "archived-web-capture",
    "participant-photograph",
    "public-safe-research-log",
    "private-source-outside-repo"
  ]),
  title: z.string().min(1),
  shortLabel: z.string().min(1),
  creator: z.string().optional(),
  publisher: z.string().optional(),
  publishedAt: z.string().optional(),
  accessedAt: z.string().optional(),
  links: z.array(linkSchema),
  availability: z.enum([
    "live",
    "archived",
    "live-and-archived",
    "link-rot",
    "withheld",
    "private",
    "not-recovered"
  ]),
  visibility: z.enum(["public", "public-metadata-only", "protected"]),
  publicCitationPolicy: z.enum([
    "link-canonical",
    "link-archive",
    "link-both",
    "cite-without-link",
    "approval-required",
    "internal-only"
  ]),
  publicCitation: z.string().min(1),
  summary: z.string().min(1),
  supports: z.array(z.string()),
  limitations: z.array(z.string()),
  caveats: z.array(z.string()),
  stability: z.enum(["stable", "fragile", "link-rot-risk", "offline"]),
  rights: z
    .object({
      rightsHolder: z.string().optional(),
      permission: z.enum([
        "cleared",
        "cleared-with-condition",
        "pending",
        "not-required",
        "do-not-publish",
        "unknown"
      ]),
      creditLine: z.string().optional()
    })
    .optional(),
  lastReviewed: z.string()
});

export const AssertionRecordSchema = z.object({
  id: z.string().min(1),
  project: z.string().min(1),
  proposition: z.string().min(1),
  publicWording: z.string().optional(),
  status: z.enum([
    "supported",
    "supported-with-attribution",
    "use-with-care",
    "open",
    "not-recovered",
    "protected",
    "superseded"
  ]),
  citationRequired: z.boolean(),
  qualifications: z.array(z.string()),
  antiClaims: z.array(z.string()),
  allowedSurfaces: z.array(z.string()),
  lastReviewed: z.string()
});

export const EvidenceRelationshipSchema = z.object({
  id: z.string().min(1),
  assertionId: z.string().min(1),
  sourceId: z.string().min(1),
  relation: z.enum([
    "direct-support",
    "corroborates",
    "contextualizes",
    "qualifies",
    "limits",
    "contradicts",
    "representative-only",
    "documents-search-result"
  ]),
  locator: z
    .object({
      kind: z.enum([
        "page",
        "section",
        "visible-text",
        "timestamp",
        "photo-metadata",
        "archive-capture",
        "record-field"
      ]),
      value: z.string().min(1)
    })
    .optional(),
  publicCitation: z.boolean(),
  publicNote: z.string().optional(),
  internalNote: z.string().optional(),
  lastVerified: z.string()
});

export const ResearchRunSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1),
  performedAt: z.string(),
  method: z.array(z.string()),
  scope: z.object({
    deduplicatedHtmlCaptures: z.number().int().optional(),
    originalUrls: z.number().int().optional(),
    eventUrlKeys: z.number().int().optional(),
    successfulPages: z.number().int().optional(),
    redirects: z.number().int().optional(),
    notFoundCaptures: z.number().int().optional()
  }),
  status: z.enum(["recovered", "partially-recovered", "not-recovered", "inconclusive", "contradicted"]),
  finding: z.string().min(1),
  limitations: z.array(z.string()),
  sourceIds: z.array(z.string()),
  publicSummaryAllowed: z.boolean(),
  publicSummary: z.string().optional(),
  protectedArtifactPolicy: z.string().min(1)
});

export const ArtifactRecordSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  kind: z.enum(["photograph", "screenshot", "diagram", "document", "promotional-graphic"]),
  sourceId: z.string().optional(),
  publicAssetUrl: z.url().optional(),
  supportsAssertionIds: z.array(z.string()),
  evidenceScope: z.enum(["direct", "contextual", "representative"]),
  publicUseStatus: z.enum([
    "approved-public",
    "approved-public-with-condition",
    "public-metadata-only",
    "approval-required",
    "protected",
    "do-not-publish"
  ]),
  rightsStatus: z.enum([
    "cleared",
    "cleared-with-condition",
    "needs-photographer-permission",
    "needs-subject-consent",
    "needs-collaborator-review",
    "hold-sensitive",
    "do-not-publish",
    "unknown"
  ]),
  caption: z.string(),
  limitations: z.array(z.string())
});

export const CorrectionRecordSchema = z.object({
  id: z.string().min(1),
  surface: z.string().min(1),
  previousValue: z.string().min(1),
  correctedValue: z.string().min(1),
  reason: z.string().min(1),
  relatedAssertionIds: z.array(z.string()),
  relatedSourceIds: z.array(z.string()),
  status: z.enum(["recorded", "applied-to-site", "applied-to-source", "follow-up-required"]),
  resolvedAt: z.string().optional()
});

export const CitationNoteSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  evidenceIds: z.array(z.string()).min(1),
  publicText: z.string().min(1),
  boundaryNote: z.string().optional(),
  status: z.enum(["public-ready", "public-ready-with-qualification", "approval-required", "internal-only"]),
  lastReviewed: z.string()
});

export const CitationPageSchema = z.object({
  id: z.string().min(1),
  route: z.string().min(1),
  slug: z.string().min(1),
  citationOrder: z.array(z.string()),
  occurrences: z.array(
    z.object({
      noteId: z.string().min(1),
      occurrence: z.string().min(1)
    })
  ),
  publicBoundary: z.string().min(1)
});

export const KnowledgeBankSchema = z.object({
  sources: z.array(SourceRecordSchema),
  assertions: z.array(AssertionRecordSchema),
  evidence: z.array(EvidenceRelationshipSchema),
  researchRuns: z.array(ResearchRunSchema),
  artifacts: z.array(ArtifactRecordSchema),
  corrections: z.array(CorrectionRecordSchema),
  citationNotes: z.array(CitationNoteSchema),
  pages: z.array(CitationPageSchema)
});

export type SourceRecord = z.infer<typeof SourceRecordSchema>;
export type AssertionRecord = z.infer<typeof AssertionRecordSchema>;
export type EvidenceRelationship = z.infer<typeof EvidenceRelationshipSchema>;
export type CitationNote = z.infer<typeof CitationNoteSchema>;
export type CitationPage = z.infer<typeof CitationPageSchema>;
