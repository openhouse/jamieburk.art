import { z } from "zod";

export const atlasIdSchema = z
  .string()
  .regex(/^ATLAS-[A-Z0-9]+(?:-[A-Z0-9]+)*$/, "Use an ATLAS-prefixed stable ID");

export const atlasRelationSchema = z.object({
  predicate: z.enum([
    "uses-method",
    "used-by",
    "guards-with",
    "guards",
    "applies-concept",
    "applied-by",
    "governed-by",
    "governs",
    "related-to"
  ]),
  target: atlasIdSchema,
  reciprocal: z.boolean().default(true)
});

export const atlasAuthoritySchema = z.object({
  stewardship: z.enum([
    "first-party",
    "first-party-and-collective",
    "collective",
    "referenced-not-owned",
    "contested"
  ]),
  publicUse: z.enum([
    "internal-only",
    "portfolio-review-required",
    "public-safe-approved",
    "do-not-publish"
  ]),
  consent: z.enum([
    "not-applicable",
    "public-source-and-metadata-only",
    "review-required",
    "do-not-publish"
  ]),
  correctionRoute: z.string().min(1)
});

export const atlasCanonicalSchema = z.object({
  entityId: z.string().min(1),
  projectKey: z.string().min(1),
  coverage: z.literal("complete-project-slice")
});

export const atlasPageSchema = z.object({
  id: atlasIdSchema,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  kind: z.enum(["project", "method", "concept"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(["draft", "active", "historical", "contested", "retired"]),
  visibility: z.literal("public-safe"),
  aliases: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(1),
  authority: atlasAuthoritySchema,
  canonical: atlasCanonicalSchema.optional(),
  relations: z.array(atlasRelationSchema).min(1),
  review: z.object({
    lastReviewed: z.union([
      z.iso.date(),
      z.date().transform((value) => value.toISOString().slice(0, 10))
    ]),
    owner: z.string().min(1)
  })
}).superRefine((page, context) => {
  if (page.kind === "project" && !page.canonical) {
    context.addIssue({ code: "custom", message: "Project pages require a canonical project slice" });
  }
  if (page.kind !== "project" && page.canonical) {
    context.addIssue({ code: "custom", message: "Only project pages may declare a canonical project slice" });
  }
});

export const evalBranchSchema = z.object({
  branch: z.string().regex(/^feature\/evals-[A-N]$/),
  sourceCommit: z.string().regex(/^[a-f0-9]{40}$/),
  strength: z.string().min(1),
  adoptedInAtlas: z.array(z.string().min(1)).min(1),
  knowledgeDisposition: z.enum(["canonical-base", "federated-source"])
});

export const evalIntegrationManifestSchema = z.object({
  schemaVersion: z.literal(3),
  sourceCutAt: z.iso.datetime({ offset: true }),
  deprecation: z.object({
    status: z.literal("frozen-reference-only"),
    successor: z.literal("@jamie-burkart/atlas"),
    branchWrites: z.literal("prohibited-after-source-cut"),
    compatibility: z.literal("generated-and-parity-checked")
  }),
  base: z.object({
    branch: z.literal("feature/evals-E"),
    commit: z.string().regex(/^[a-f0-9]{40}$/),
    rationale: z.string().min(1)
  }),
  branches: z.array(evalBranchSchema).length(14)
});

export const stakeholderCreditRegisterSchema = z.object({
  schemaVersion: z.literal(1),
  sourcePosition: z.literal("public-record-attribution-not-endorsement"),
  entries: z.array(z.object({
    name: z.string().min(1),
    atlasPage: atlasIdSchema,
    basisRecordIds: z.array(z.string().min(1)).min(1),
    credit: z.string().min(1),
    boundary: z.string().min(1)
  })).min(1)
});

const sourceRecordIdSchema = z.string().regex(/^(?:SRC|ART|OBS|CLM|ANTI|LIMIT|CORR|DEC|EVAL|CERT|GATE|MUT|REPAIR|STOP)-[A-Z0-9]+(?:-[A-Z0-9]+)*$/);

export const atlasSourceDossierSchema = z.object({
  schemaVersion: z.literal(1),
  id: atlasIdSchema,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  projectPageId: atlasIdSchema,
  synthesisPage: z.string().regex(/^docs\/atlas\/sources\/[a-z0-9-]+\.md$/),
  source: z.object({
    id: sourceRecordIdSchema,
    role: z.literal("canonical-source"),
    kind: z.enum(["published-article", "book", "letter", "report", "website", "other"]),
    title: z.string().min(1),
    author: z.string().min(1),
    publication: z.string().min(1),
    publishedAt: z.iso.date(),
    printedLocations: z.array(z.string().min(1)).min(1),
    canonicalUrl: z.url().nullable(),
    publicCitation: z.string().min(1),
    identityNote: z.string().min(1)
  }).strict(),
  artifact: z.object({
    id: sourceRecordIdSchema,
    sourceId: sourceRecordIdSchema,
    role: z.literal("preservation-copy"),
    mediaType: z.literal("application/pdf"),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    bytes: z.number().int().positive(),
    pages: z.number().int().positive(),
    containerCreatedAt: z.iso.datetime({ offset: true }),
    fixityVerifiedAt: z.iso.date(),
    extraction: z.object({
      method: z.string().min(1),
      textSha256: z.string().regex(/^[a-f0-9]{64}$/),
      visualReview: z.literal("all-pages-rendered-and-reviewed"),
      textIsNavigationAid: z.literal(true)
    }).strict(),
    custody: z.object({
      mode: z.literal("protected-external"),
      custodyId: sourceRecordIdSchema,
      repositoryCopy: z.literal(false),
      locatorExposed: z.literal(false)
    }).strict()
  }).strict(),
  observations: z.array(z.object({
    id: sourceRecordIdSchema,
    sourceId: sourceRecordIdSchema,
    kind: z.enum(["publication-context", "reported-fact", "attributed-statement", "technical-detail", "route-boundary", "rights-context"]),
    text: z.string().min(1),
    locator: z.string().min(1),
    attribution: z.string().min(1),
    confidence: z.enum(["high", "medium", "low"]),
    publicSafe: z.boolean()
  }).strict()).min(1),
  claims: z.array(z.object({
    id: sourceRecordIdSchema,
    text: z.string().min(1),
    status: z.enum(["sourced", "corroborated", "interpretive"]),
    supportObservationIds: z.array(sourceRecordIdSchema).min(1),
    corroboratingSourceIds: z.array(sourceRecordIdSchema).default([]),
    publicUse: z.enum(["internal-only", "portfolio-review-required", "public-safe-approved", "do-not-publish"])
  }).strict()).min(1),
  antiClaims: z.array(z.object({
    id: sourceRecordIdSchema,
    text: z.string().min(1),
    reason: z.string().min(1),
    boundedByObservationIds: z.array(sourceRecordIdSchema).min(1)
  }).strict()).min(1),
  sourceLimitations: z.array(z.object({
    id: sourceRecordIdSchema,
    text: z.string().min(1),
    consequence: z.string().min(1)
  }).strict()).min(1),
  corroboratingSources: z.array(z.object({
    id: sourceRecordIdSchema,
    role: z.literal("independent-corroborating-source"),
    title: z.string().min(1),
    author: z.string().min(1),
    publication: z.string().min(1),
    publishedAt: z.iso.date(),
    canonicalUrl: z.url(),
    relationship: z.string().min(1),
    supportsObservationIds: z.array(sourceRecordIdSchema).min(1),
    doesNotEstablish: z.array(z.string().min(1)).min(1)
  }).strict()).min(1),
  governance: z.object({
    rights: z.object({
      articleText: z.literal("permission-needed"),
      pageImages: z.literal("permission-needed"),
      photographs: z.literal("permission-and-consent-review-needed"),
      metadataAndBoundedParaphrase: z.literal("allowed")
    }).strict(),
    consent: z.object({
      namedPeople: z.literal("review-required-before-promotional-reuse"),
      depictedPeople: z.literal("review-required-before-image-use")
    }).strict(),
    publicUse: z.object({
      status: z.literal("internal-only"),
      meaning: z.literal("public-safe repository knowledge that must not project onto the website without a separate decision")
    }).strict(),
    custody: z.object({
      mode: z.literal("protected-external"),
      rawArtifactInRepository: z.literal(false),
      privateLocatorInRepository: z.literal(false)
    }).strict()
  }).strict(),
  projectionDecisions: z.array(z.object({
    id: sourceRecordIdSchema,
    claimIds: z.array(sourceRecordIdSchema).min(1),
    context: z.string().min(1),
    surface: z.string().min(1),
    decision: z.enum(["hold", "project", "reject"]),
    rationale: z.string().min(1),
    decidedAt: z.iso.date(),
    authority: z.enum(["automated-boundary", "editorial-review", "jamie-approval"])
  }).strict()).min(1),
  evaluation: z.object({
    machineRun: z.object({
      id: sourceRecordIdSchema,
      runAt: z.iso.date(),
      contractVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
      status: z.enum(["candidate", "passed", "failed"]),
      command: z.string().min(1)
    }).strict(),
    independentCertifications: z.array(z.object({
      id: sourceRecordIdSchema,
      status: z.enum(["pending", "pass", "fail"]),
      reviewer: z.string().min(1).nullable(),
      scope: z.string().min(1),
      evidence: z.array(z.string().min(1))
    }).strict()).min(1),
    humanGates: z.array(z.object({
      id: sourceRecordIdSchema,
      status: z.enum(["pending", "pass", "fail"]),
      reviewer: z.string().min(1).nullable(),
      requirement: z.string().min(1)
    }).strict()).min(1),
    mutations: z.array(z.object({
      id: sourceRecordIdSchema,
      description: z.string().min(1),
      expectedFailure: z.string().min(1),
      status: z.enum(["specified", "passed", "failed"])
    }).strict()).min(7),
    failuresAndRepairs: z.array(z.object({
      id: sourceRecordIdSchema,
      failure: z.string().min(1),
      repair: z.string().min(1),
      regression: z.string().min(1)
    }).strict()).min(1),
    stoppingDecision: z.object({
      id: sourceRecordIdSchema,
      decision: z.enum(["continue", "stop-automated-climb", "blocked"]),
      reason: z.string().min(1),
      decidedAt: z.iso.date(),
      humanGatesRemain: z.boolean()
    }).strict()
  }).strict()
}).strict();
