import { z } from "zod";

const linkSchema = z.object({
  kind: z.enum(["canonical", "archive", "media", "local-public-artifact"]),
  url: z.url(),
  capturedAt: z.string().optional(),
  note: z.string().optional()
});

export const SourceRecordSchema = z.object({
  id: z.string().min(1),
  sourceClass: z.enum([
    "official-government-post",
    "organizer-social-post",
    "public-record",
    "public-webpage",
    "archived-webpage",
    "promotional-image",
    "participant-photograph",
    "press",
    "public-repository",
    "public-safe-research-log",
    "private-source-outside-repo"
  ]),
  title: z.string().min(1),
  creator: z.string().optional(),
  publisher: z.string().optional(),
  publishedAt: z.string().optional(),
  accessedAt: z.string().optional(),
  links: z.array(linkSchema),
  availability: z.enum(["live", "archived", "link-rot", "withheld", "private"]),
  publicCitationPolicy: z.enum([
    "link-canonical",
    "link-archive",
    "link-both",
    "cite-without-link",
    "approval-required",
    "internal-only"
  ]),
  shortLabel: z.string().min(1),
  publicCitation: z.string().min(1),
  summary: z.string().min(1),
  supports: z.array(z.string()),
  limitations: z.array(z.string()),
  caveats: z.array(z.string()).default([]),
  stability: z.enum(["stable", "fragile", "link-rot-risk", "offline"]),
  lastReviewed: z.string()
});

export const AssertionRecordSchema = z.object({
  id: z.string().min(1),
  claimId: z.string().optional(),
  project: z.string().min(1),
  proposition: z.string().min(1),
  publicWording: z.string().optional(),
  status: z.enum([
    "supported",
    "supported-with-attribution",
    "use-with-care",
    "open",
    "not-recovered",
    "protected"
  ]),
  citationRequired: z.boolean(),
  antiClaims: z.array(z.string()),
  qualifications: z.array(z.string()),
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
  status: z.enum([
    "recovered",
    "partially-recovered",
    "not-recovered",
    "inconclusive",
    "contradicted"
  ]),
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
  publicAssetUrl: z.string().optional(),
  sourceId: z.string().optional(),
  supportsAssertionIds: z.array(z.string()),
  evidenceScope: z.enum(["direct", "contextual", "representative"]),
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

export const KnowledgeBankSchema = z.object({
  sources: z.array(SourceRecordSchema),
  assertions: z.array(AssertionRecordSchema),
  evidence: z.array(EvidenceRelationshipSchema),
  researchRuns: z.array(ResearchRunSchema),
  artifacts: z.array(ArtifactRecordSchema)
});

export type SourceRecord = z.infer<typeof SourceRecordSchema>;
export type AssertionRecord = z.infer<typeof AssertionRecordSchema>;
export type EvidenceRelationship = z.infer<typeof EvidenceRelationshipSchema>;
