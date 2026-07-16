import { z } from "zod";
import { publicUrlSchema, stableIdSchema } from "./schema.ts";

const idList = z.array(stableIdSchema).default([]);
const dated = z.iso.date();

export const entitySchema = z.object({
  id: stableIdSchema,
  type: z.enum(["person", "organization", "place", "policy", "event", "platform", "publication"]),
  name: z.string().min(1),
  aliases: z.array(z.string().min(1)).default([]),
  publicSummary: z.string().min(1),
  sameAs: z.array(z.url()).default([])
});

export const projectSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  aliases: z.array(z.string().min(1)).default([]),
  summary: z.string().min(1),
  dateRange: z.string().min(1),
  startYear: z.number().int().min(1900).max(2100),
  endYear: z.number().int().min(1900).max(2100),
  domains: z.array(z.string().min(1)).min(1),
  capabilities: z.array(z.string().min(1)).min(1),
  canonicalProjectKeys: z.array(stableIdSchema).default([]),
  proofIds: z.array(stableIdSchema).default([]),
  entityIds: idList,
  status: z.enum(["historical", "active", "researching"])
});

export const leadSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  kind: z.enum(["source-url", "memory", "metric", "document", "media", "claim", "collaborator-note"]),
  capturedAt: dated,
  capturedBy: z.string().min(1),
  state: z.enum(["captured", "triaged", "extracted", "held"]),
  visibility: z.enum(["public", "public-safe", "private-reference"]),
  publicSummary: z.string().min(1),
  publicUrl: publicUrlSchema.optional(),
  projectAssociationStatus: z.enum(["assigned", "unassigned"]).default("assigned"),
  projectIds: idList,
  entityIds: idList,
  sourceIds: idList,
  candidateClaimIds: idList,
  researchTaskIds: idList,
  protectedLocatorId: stableIdSchema.optional(),
  duplicateOfLeadId: stableIdSchema.optional(),
  nextAction: z.string().min(1)
});

export const intakeReceiptSchema = z.object({
  receiptVersion: z.literal(1),
  id: stableIdSchema,
  title: z.string().min(1),
  kind: leadSchema.shape.kind,
  capturedAt: dated,
  capturedBy: z.string().min(1),
  visibility: leadSchema.shape.visibility,
  publicSummary: z.string().min(1),
  initialProjectAssociationStatus: leadSchema.shape.projectAssociationStatus,
  initialProjectIds: idList,
  initialEntityIds: idList,
  initialSourceIds: idList,
  publicUrl: publicUrlSchema.optional(),
  protectedLocatorId: stableIdSchema.optional(),
  duplicateOfLeadId: stableIdSchema.optional()
});

export const intakeAmendmentSchema = z.object({
  amendmentVersion: z.literal(1),
  id: stableIdSchema,
  receiptId: stableIdSchema,
  field: z.enum(["title", "publicSummary", "publicUrl", "protectedLocatorId"]),
  previousValue: z.string().min(1),
  replacementValue: z.string().min(1),
  reason: z.string().min(1),
  amendedAt: dated,
  amendedBy: z.string().min(1),
  sourceIds: idList
});

const evidenceRoleSchema = z.enum(["direct-support", "corroborating", "context", "contradicts", "supports-boundary"]);

export const observationSchema = z.object({
  id: stableIdSchema,
  sourceId: stableIdSchema,
  projectIds: idList,
  entityIds: idList,
  statement: z.string().min(1),
  locator: z.string().min(1),
  evidenceRole: evidenceRoleSchema,
  certainty: z.enum(["high", "moderate", "limited"]),
  doesNotEstablish: z.array(z.string().min(1)).min(1),
  candidateClaimIds: idList,
  candidateRelationships: z.array(z.object({
    candidateClaimId: stableIdSchema,
    evidenceRole: evidenceRoleSchema,
    supports: z.string().min(1),
    limitations: z.array(z.string().min(1)).min(1)
  })).default([]),
  reviewedAt: dated
});

export const candidateClaimSchema = z.object({
  id: stableIdSchema,
  projectIds: idList,
  proposition: z.string().min(1),
  maturity: z.enum(["captured", "researching", "corroborated", "defensible", "held", "disallowed", "promoted"]),
  confidence: z.enum(["high", "moderate", "limited"]),
  observationIds: idList,
  requiredEvidence: z.array(z.string().min(1)).min(1),
  boundaries: z.array(z.string().min(1)).min(1),
  antiClaims: z.array(z.string().min(1)).min(1),
  counterevidencePosture: z.string().min(1),
  sourceIndependenceNote: z.string().min(1),
  researchTaskIds: idList,
  promotionDecisionIds: idList,
  targetCanonicalClaimId: stableIdSchema.optional(),
  publicEvidenceQualifier: z.object({
    kind: z.literal("self-reported"),
    appliesTo: z.array(z.string().min(1)).min(1),
    acceptedPhrases: z.array(z.string().min(1)).min(1)
  }).optional(),
  updatedAt: dated
});

export const candidateEventSchema = z.object({
  id: stableIdSchema,
  candidateClaimId: stableIdSchema,
  fromMaturity: candidateClaimSchema.shape.maturity.optional(),
  toMaturity: candidateClaimSchema.shape.maturity,
  occurredAt: dated,
  actor: z.string().min(1),
  reason: z.string().min(1),
  decisionId: stableIdSchema.optional()
});

export const researchTaskSchema = z.object({
  id: stableIdSchema,
  candidateClaimIds: idList,
  question: z.string().min(1),
  status: z.enum(["open", "in-progress", "completed", "blocked"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  methods: z.array(z.string().min(1)).min(1),
  actions: z.array(z.enum([
    "metadata-review",
    "public-source-research",
    "source-close-read",
    "claim-decomposition",
    "corroboration",
    "review-protected-media"
  ])).optional(),
  sourceIds: idList,
  observationIds: idList,
  findings: z.array(z.string().min(1)).default([]),
  limitations: z.array(z.string().min(1)).min(1),
  nextActions: z.array(z.string().min(1)).min(1),
  requiresContentReviewAuthorization: z.boolean().optional(),
  openedAt: dated,
  completedAt: dated.optional()
});

export const promotionDecisionSchema = z.object({
  id: stableIdSchema,
  candidateClaimId: stableIdSchema,
  decision: z.enum(["promote", "hold", "reject", "research", "retire", "correct"]),
  rationale: z.string().min(1),
  evidenceThreshold: z.string().min(1),
  decidedAt: dated,
  decidedBy: z.array(z.string().min(1)).min(1),
  reviewAuthority: z.enum(["research-review", "jamie-approved", "collaborator-confirmed"]).default("research-review"),
  humanReviewStatus: z.enum(["pending", "approved", "not-required"]).default("pending"),
  humanReviewer: z.string().min(1).optional(),
  targetCanonicalClaimId: stableIdSchema.optional(),
  allowedSurfaces: z.array(z.string().min(1)).default([]),
  guardrails: z.array(z.string().min(1)).min(1),
  retiredSurfaces: z.array(z.string().min(1)).optional(),
  supersedesDecisionId: stableIdSchema.optional()
});

export const editorialBriefSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  audience: z.string().min(1),
  audienceTags: z.array(stableIdSchema).min(1),
  goal: z.string().min(1),
  purposeTags: z.array(stableIdSchema).min(1),
  status: z.enum(["research", "active", "archived"]),
  publicationIntent: z.enum(["research", "internal-brief", "public-composition"]),
  targetSurfaces: z.array(z.string().min(1)).default([]),
  selectionCriteria: z.array(z.string().min(1)).min(1),
  projectIds: idList,
  canonicalClaimIds: idList,
  candidateClaimIds: idList,
  exclusions: z.array(z.string().min(1)).min(1),
  citationPosture: z.string().min(1),
  chadLensQuestion: z.string().min(1),
  mediaLeadIds: idList,
  pageClaimExclusions: z.array(z.object({ claimId: stableIdSchema, reason: z.string().min(1) })).default([])
});

export const proofSurfaceManifestSchema = z.object({
  id: stableIdSchema,
  surface: z.enum([
    "homepage",
    "resume",
    "technical-operations",
    "work-card",
    "case-study",
    "lab",
    "about",
    "contact",
    "colophon",
    "resume-pdf"
  ]),
  route: z.string().regex(/^\/(?:[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*)?$/, "Use an exact public destination"),
  destinationType: z.enum(["route", "download"]).default("route"),
  artifactPath: z.string().regex(/^apps\/www\/public\/[A-Za-z0-9._/-]+$/).optional(),
  audience: z.string().min(1),
  purpose: z.string().min(1),
  selectionCriteria: z.array(z.string().min(1)).min(1),
  proofIds: idList,
  canonicalClaimIds: idList,
  exclusions: z.array(z.string().min(1)).min(1),
  reviewAuthority: z.literal("jamie-approved"),
  humanReviewStatus: z.literal("approved"),
  humanReviewer: z.string().min(1),
  reviewedAt: dated,
  guardrails: z.array(z.string().min(1)).min(1)
}).superRefine((manifest, context) => {
  if (manifest.destinationType === "download" && !manifest.artifactPath) {
    context.addIssue({ code: "custom", path: ["artifactPath"], message: "Downloads require a public artifact path" });
  }
  if (manifest.destinationType === "route" && manifest.artifactPath) {
    context.addIssue({ code: "custom", path: ["artifactPath"], message: "Routes cannot declare a download artifact path" });
  }
});

export const mediaLeadSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  projectIds: idList,
  kind: z.enum(["photograph", "video", "audio", "graphic", "document", "collection"]),
  publicSafeDescription: z.string().min(1),
  protectedLocatorId: stableIdSchema.optional(),
  sourceIds: idList,
  rightsStatus: z.enum(["cleared", "permission-needed", "unknown", "do-not-publish"]),
  consentStatus: z.enum(["cleared", "review-needed", "not-applicable", "do-not-publish"]),
  displayStatus: z.enum(["candidate", "metadata-only", "hold", "do-not-publish"]),
  candidateClaimIds: idList,
  researchTaskIds: idList,
  reviewIntent: z.enum(["metadata-only", "protected-content-review"]),
  contentReviewTaskIds: idList.optional(),
  researchPrompt: z.string().min(1),
  contentReviewStatus: z.enum(["not-authorized", "authorized", "completed"]).optional(),
  contentReviewAuthority: z.enum(["jamie-approved", "collaborator-approved"]).optional(),
  contentReviewAuthorizedBy: z.string().min(1).optional(),
  contentReviewAuthorizedAt: dated.optional(),
  status: z.enum(["captured", "queued", "reviewed", "held"])
}).superRefine((item, context) => {
  const contentReviewStatus = item.contentReviewStatus ?? "not-authorized";
  const authorizationFields = [item.contentReviewAuthority, item.contentReviewAuthorizedBy, item.contentReviewAuthorizedAt];
  if (contentReviewStatus === "not-authorized" && authorizationFields.some(Boolean)) {
    context.addIssue({ code: "custom", path: ["contentReviewStatus"], message: "Unauthorized content review cannot carry approval metadata" });
  }
  if (contentReviewStatus !== "not-authorized" && authorizationFields.some((value) => !value)) {
    context.addIssue({ code: "custom", path: ["contentReviewStatus"], message: "Authorized content review requires authority, reviewer, and date" });
  }
});

export const knowledgeLifecycleSchema = z.object({
  entities: z.array(entitySchema),
  projects: z.array(projectSchema),
  leads: z.array(leadSchema),
  observations: z.array(observationSchema),
  candidateClaims: z.array(candidateClaimSchema),
  candidateEvents: z.array(candidateEventSchema),
  researchTasks: z.array(researchTaskSchema),
  promotionDecisions: z.array(promotionDecisionSchema),
  editorialBriefs: z.array(editorialBriefSchema),
  proofSurfaceManifests: z.array(proofSurfaceManifestSchema),
  mediaLeads: z.array(mediaLeadSchema)
});

export type KnowledgeLifecycle = z.infer<typeof knowledgeLifecycleSchema>;
