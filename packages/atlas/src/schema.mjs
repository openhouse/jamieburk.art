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
