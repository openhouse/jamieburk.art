import { z } from "zod";

const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, "Use a stable hyphenated ID");

const publicUrlSchema = z
  .url()
  .refine((value) => /^https?:\/\//.test(value), "Use an HTTP(S) public URL");

export const intakeKindSchema = z.enum([
  "public-url",
  "memory",
  "possible-claim",
  "artifact-lead",
  "engagement-lead",
  "research-lead"
]);

export const intakeMaturitySchema = z.enum([
  "captured",
  "triaged",
  "metadata-reviewed",
  "source-reviewed",
  "decomposed",
  "research-needed",
  "superseded"
]);

export const intakePublicUseSchema = z.enum([
  "public-linkable",
  "cite-with-care",
  "approval-required",
  "protected"
]);

export const intakeEditorialStateSchema = z.enum([
  "unsurfaced",
  "candidate",
  "selected",
  "retired"
]);

export const intakeDispositionSchema = z.enum([
  "source-created",
  "claim-candidate-created",
  "research-inquiry-created",
  "linked-existing",
  "linked-duplicate",
  "held-protected",
  "superseded"
]);

export const intakeRecordSchema = z
  .object({
    id: stableIdSchema,
    capturedAt: z.iso.date(),
    capturedBy: z.string().min(1),
    kind: intakeKindSchema,
    title: z.string().min(1),
    publicSafeSummary: z.string().min(1),
    whyItMatters: z.string().min(1),
    projectHints: z.array(stableIdSchema).min(1),
    maturity: intakeMaturitySchema,
    publicUse: intakePublicUseSchema,
    editorialState: intakeEditorialStateSchema,
    disposition: intakeDispositionSchema,
    canonicalUrl: publicUrlSchema.optional(),
    sourceIds: z.array(stableIdSchema).default([]),
    claimIds: z.array(stableIdSchema).default([]),
    inquiryIds: z.array(stableIdSchema).default([]),
    duplicateOf: stableIdSchema.optional(),
    limitations: z.array(z.string().min(1)).default([]),
    nextActions: z.array(z.string().min(1)).min(1)
  })
  .superRefine((intake, context) => {
    const addIssue = (message: string) => context.addIssue({ code: "custom", message });

    if (intake.kind === "public-url" && !intake.canonicalUrl) {
      addIssue("Public URL intakes require a canonical URL");
    }

    if (
      ["metadata-reviewed", "source-reviewed"].includes(intake.maturity) &&
      !intake.sourceIds.length
    ) {
      addIssue("Metadata- and source-reviewed intakes require a normalized source");
    }

    if (
      intake.maturity === "decomposed" &&
      (!intake.sourceIds.length || !intake.claimIds.length)
    ) {
      addIssue("Decomposed intakes require a source and atomic claim candidate");
    }

    if (
      intake.editorialState === "selected" &&
      (intake.maturity !== "decomposed" || intake.publicUse !== "public-linkable")
    ) {
      addIssue("Selected intakes must be decomposed and public-linkable");
    }

    const linkedRecordCount =
      intake.sourceIds.length + intake.claimIds.length + intake.inquiryIds.length;

    if (intake.disposition === "source-created" && !intake.sourceIds.length) {
      addIssue("source-created disposition requires a source ID");
    }
    if (intake.disposition === "claim-candidate-created" && !intake.claimIds.length) {
      addIssue("claim-candidate-created disposition requires a claim ID");
    }
    if (
      intake.disposition === "research-inquiry-created" &&
      !intake.inquiryIds.length
    ) {
      addIssue("research-inquiry-created disposition requires an inquiry ID");
    }
    if (intake.disposition === "linked-existing" && !linkedRecordCount) {
      addIssue("linked-existing disposition requires a canonical record ID");
    }
    if (intake.disposition === "linked-duplicate" && !intake.duplicateOf) {
      addIssue("linked-duplicate disposition requires duplicateOf");
    }
    if (
      intake.disposition === "held-protected" &&
      !["approval-required", "protected"].includes(intake.publicUse)
    ) {
      addIssue("held-protected disposition requires a non-public public-use policy");
    }
    if (intake.disposition === "superseded" && !intake.duplicateOf) {
      addIssue("superseded disposition requires a superseding intake ID");
    }
  });

export const sourceVisibilitySchema = z.enum([
  "public",
  "public-metadata-only",
  "private",
  "protected"
]);

export const sourceKindSchema = z.enum([
  "government-record",
  "government-social-post",
  "institutional-web-page",
  "institutional-social-post",
  "firsthand-statement",
  "archived-web-capture",
  "promotional-graphic",
  "published-article",
  "project-archive",
  "participant-photograph",
  "photo-metadata",
  "research-run"
]);

export const preservationStatusSchema = z.enum([
  "live",
  "archived",
  "live-and-archived",
  "dead",
  "private"
]);

const mediaSchema = z.object({
  mediaKind: z.enum(["photograph", "screenshot", "graphic", "document", "other"]),
  photographer: z.string().min(1).optional(),
  rightsHolder: z.string().min(1).optional(),
  rightsStatus: z.enum([
    "cleared",
    "permission-needed",
    "unknown",
    "do-not-publish"
  ]),
  consentStatus: z.enum([
    "cleared",
    "review-needed",
    "not-applicable",
    "do-not-publish"
  ]),
  publicDisplayStatus: z.enum([
    "cleared",
    "metadata-only",
    "hold",
    "do-not-publish"
  ]),
  visibleText: z.array(z.string().min(1)).optional(),
  captureTimestamp: z.string().min(1).optional(),
  timestampConfidence: z.enum(["high", "moderate", "limited"]).optional()
});

export const sourceRecordSchema = z
  .object({
    id: stableIdSchema,
    title: z.string().min(1),
    organization: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    kind: sourceKindSchema,
    visibility: sourceVisibilitySchema,
    preservationStatus: preservationStatusSchema,
    publishedAt: z.iso.date().optional(),
    capturedAt: z.string().min(1).optional(),
    accessedAt: z.iso.date().optional(),
    canonicalUrl: publicUrlSchema.optional(),
    archiveUrl: publicUrlSchema.optional(),
    assetUrl: publicUrlSchema.optional(),
    preferredPublicUrl: z.enum(["canonical", "archive", "asset"]).optional(),
    publicCitation: z.string().min(1),
    publicNote: z.string().min(1).optional(),
    captureFingerprint: z
      .string()
      .regex(/^sha256:[a-f0-9]{64}$/, "Use a SHA-256 capture fingerprint")
      .optional(),
    supportsGenerally: z.array(z.string().min(1)).default([]),
    doesNotEstablish: z.array(z.string().min(1)).default([]),
    protectedLocatorId: stableIdSchema.optional(),
    media: mediaSchema.optional()
  })
  .superRefine((source, context) => {
    const hasPublicUrl = Boolean(
      source.canonicalUrl || source.archiveUrl || source.assetUrl
    );

    if (source.visibility !== "public" && hasPublicUrl) {
      context.addIssue({
        code: "custom",
        message: `${source.visibility} sources cannot expose an underlying URL`
      });
    }

    if (
      source.visibility === "public" &&
      ["archived", "live-and-archived"].includes(source.preservationStatus) &&
      !source.archiveUrl
    ) {
      context.addIssue({ code: "custom", message: "Archived public sources require an archive URL" });
    }

    if (source.preferredPublicUrl === "canonical" && !source.canonicalUrl) {
      context.addIssue({ code: "custom", message: "Preferred canonical URL is missing" });
    }
    if (source.preferredPublicUrl === "archive" && !source.archiveUrl) {
      context.addIssue({ code: "custom", message: "Preferred archive URL is missing" });
    }
    if (source.preferredPublicUrl === "asset" && !source.assetUrl) {
      context.addIssue({ code: "custom", message: "Preferred asset URL is missing" });
    }
  });

export const evidenceRelationshipSchema = z.object({
  sourceId: stableIdSchema,
  relationship: z.enum([
    "direct-support",
    "corroborating",
    "context",
    "supports-boundary",
    "contradicts",
    "private-support"
  ]),
  supports: z.array(z.string().min(1)).min(1),
  locator: z.string().min(1).optional(),
  internalExcerpt: z.string().min(1).optional(),
  publicNote: z.string().min(1).optional(),
  confidence: z.enum(["high", "moderate", "limited"]),
  renderCitation: z.boolean()
});

export const claimProjectionSchema = z.object({
  key: z.enum([
    "case-study",
    "work-card",
    "resume-html",
    "technical-operations",
    "homepage",
    "photo-caption",
    "archive-note"
  ]),
  text: z.string().min(1),
  status: z.enum(["active", "hold", "deprecated", "disallowed"]),
  citationRequired: z.boolean(),
  surfaces: z.array(z.string().min(1))
});

export const claimRecordSchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  internalClaim: z.string().min(1),
  status: z.enum([
    "confirmed",
    "confirmed-with-boundary",
    "use-with-care",
    "inference",
    "not-recovered",
    "disallowed"
  ]),
  projections: z.array(claimProjectionSchema),
  evidence: z.array(evidenceRelationshipSchema),
  boundaries: z.array(z.string().min(1)).default([]),
  antiClaims: z.array(z.string().min(1)).default([]),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  reviewedAt: z.iso.date(),
  reviewedBy: z.array(z.string().min(1)).default([])
});

export const researchInquirySchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  question: z.string().min(1),
  methods: z.array(z.string().min(1)).min(1),
  runAt: z.iso.date(),
  resultStatus: z.enum([
    "recovered",
    "partially-recovered",
    "not-recovered",
    "inconclusive"
  ]),
  findings: z.array(z.string().min(1)).min(1),
  limitations: z.array(z.string().min(1)).min(1),
  sourceIds: z.array(stableIdSchema).default([]),
  publicSummary: z.string().min(1).optional(),
  protectedLocatorId: stableIdSchema.optional()
});

export const correctionRecordSchema = z.object({
  id: stableIdSchema,
  claimId: stableIdSchema,
  previousText: z.string().min(1),
  replacementText: z.string().min(1),
  reason: z.string().min(1),
  decidedAt: z.iso.date(),
  affectedSurfaces: z.array(z.string().min(1)).min(1),
  status: z.enum(["active", "superseded"])
});

export const citationOccurrenceSchema = z.object({
  id: stableIdSchema,
  claimId: stableIdSchema,
  projection: claimProjectionSchema.shape.key,
  sourceIds: z.array(stableIdSchema).min(1).optional()
});

export const citationPageSchema = z.object({
  id: stableIdSchema,
  surface: z.string().min(1),
  sourceOrder: z.array(stableIdSchema),
  occurrences: z.array(citationOccurrenceSchema),
  sharedBoundary: z.string().min(1).optional(),
  sourceBoundaryOmissions: z
    .record(stableIdSchema, z.array(z.string().min(1)).min(1))
    .optional()
});

export const campaignPressPlacementSchema = z.object({
  id: stableIdSchema,
  campaign: stableIdSchema,
  indexSourceId: stableIdSchema,
  articleSourceId: stableIdSchema,
  position: z.number().int().positive(),
  listedPublisher: z.string().min(1),
  listedTitle: z.string().min(1),
  listedUrl: publicUrlSchema,
  relationship: z.literal("listed-in-campaign-press-section"),
  identityStatus: z.enum([
    "verified-live",
    "verified-redirect",
    "archive-backed",
    "access-restricted-with-archive"
  ]),
  reviewStatus: z.enum(["metadata-reviewed", "decomposed"]),
  editorialState: z.enum(["unsurfaced", "candidate", "selected", "retired"]),
  limitations: z.array(z.string().min(1)).min(1),
  reviewedAt: z.iso.date()
});

export const socialAccountRecordSchema = z.object({
  id: stableIdSchema,
  handle: z
    .string()
    .regex(/^@[A-Za-z0-9_]{1,15}$/, "Use a valid X account handle"),
  canonicalUrl: publicUrlSchema,
  projectIds: z.array(stableIdSchema).min(1),
  accountRelationship: z.enum(["dedicated-project", "shared-coalition"]),
  joined: z.string().min(1),
  observedAt: z.iso.date(),
  profilePostsObserved: z.number().int().nonnegative(),
  recoveredItems: z.number().int().nonnegative(),
  unresolvedItems: z.number().int().nonnegative(),
  recoveryStatus: z.enum([
    "current-profile-control-recovered",
    "near-complete-current-profile",
    "partial-with-all-slots-dispositioned"
  ]),
  sourceIds: z.array(stableIdSchema).min(1),
  claimIds: z.array(stableIdSchema).default([]),
  inquiryIds: z.array(stableIdSchema).default([]),
  authorshipBoundary: z.string().min(1),
  limitations: z.array(z.string().min(1)).min(1)
});

export const knowledgeBankSchema = z.object({
  intakes: z.array(intakeRecordSchema),
  sources: z.array(sourceRecordSchema),
  claims: z.array(claimRecordSchema),
  researchInquiries: z.array(researchInquirySchema),
  corrections: z.array(correctionRecordSchema),
  pages: z.array(citationPageSchema),
  campaignPressPlacements: z.array(campaignPressPlacementSchema),
  socialAccounts: z.array(socialAccountRecordSchema)
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type IntakeRecord = z.infer<typeof intakeRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type SocialAccountRecord = z.infer<typeof socialAccountRecordSchema>;
export type CampaignPressPlacement = z.infer<typeof campaignPressPlacementSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
