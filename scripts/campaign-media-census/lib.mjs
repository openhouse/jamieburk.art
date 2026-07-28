import { readFileSync } from "node:fs";
import path from "node:path";

import { z } from "zod";

export const defaultRepoRoot = path.resolve(import.meta.dirname, "../..");
export const censusRelativePath =
  "docs/knowledge-bank/data/campaign-site-media-census-2026-07-28.json";

const stableIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);

const occurrenceSchema = z
  .object({
    siteId: z.string().min(1),
    kind: z.string().min(1)
  })
  .passthrough();

const archiveBindingSchema = z.object({
  status: z.enum([
    "not-yet-bound",
    "not-applicable",
    "candidate-family-located-and-visually-reviewed"
  ]),
  opaqueId: z
    .string()
    .regex(/^photo-family\.[a-z0-9.-]+$/)
    .nullable(),
  relationship: z.string().min(1).optional(),
  privateFamilyCount: z.number().int().positive().optional(),
  reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  boundary: z.string().min(1).optional()
});

const workSchema = z
  .object({
    id: stableIdSchema,
    reviewId: z.string().regex(/^[LF]\d{3}$/),
    classification: z.enum([
      "campaign-graphic",
      "document-or-flyer",
      "logo-or-icon",
      "map-or-data-visualization",
      "photograph",
      "photographic-composite",
      "unreadable"
    ]),
    visualReview: z.enum(["complete-2026-07-28", "gap-unreadable"]),
    contentChecksumSha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    canonicalPublicId: z.string().min(1).optional(),
    campaignSites: z.array(z.string().min(1)).min(1),
    publicUrls: z.array(z.string().url()).min(1),
    sourceAssetLocators: z.array(z.string().min(1)).min(1),
    occurrences: z.array(occurrenceSchema).min(1),
    photoEntry: z.boolean(),
    rightsState: z.literal("not-fully-established"),
    creatorCreditState: z.literal("open"),
    representedPersonReview: z.enum([
      "required-before-new-public-placement",
      "not-applicable"
    ]),
    portfolioAuthorization: z.string().min(1),
    publicDisplayStatus: z.literal("metadata-only"),
    privateArchiveBinding: archiveBindingSchema,
    antiClaims: z.array(z.string().min(1)).min(1)
  })
  .superRefine((work, context) => {
    const shouldBePhoto =
      work.classification === "photograph" ||
      work.classification === "photographic-composite";
    if (work.photoEntry !== shouldBePhoto) {
      context.addIssue({
        code: "custom",
        path: ["photoEntry"],
        message: "photoEntry must agree with the visual classification"
      });
    }
    if (
      work.privateArchiveBinding.status ===
        "candidate-family-located-and-visually-reviewed" &&
      (!work.privateArchiveBinding.opaqueId ||
        !work.privateArchiveBinding.relationship ||
        !work.privateArchiveBinding.privateFamilyCount ||
        !work.privateArchiveBinding.reviewedAt ||
        !work.privateArchiveBinding.boundary)
    ) {
      context.addIssue({
        code: "custom",
        path: ["privateArchiveBinding"],
        message: "reviewed private families require a complete public-safe binding"
      });
    }
    if (
      work.privateArchiveBinding.status !==
        "candidate-family-located-and-visually-reviewed" &&
      work.privateArchiveBinding.opaqueId !== null
    ) {
      context.addIssue({
        code: "custom",
        path: ["privateArchiveBinding", "opaqueId"],
        message: "unreviewed bindings cannot expose an opaque family ID"
      });
    }
  });

export const campaignMediaCensusSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.literal("census.campaign-site-media.2026-07-28"),
  title: z.string().min(1),
  generatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  researchScope: z.object({
    sites: z.array(z.string().min(1)).length(5),
    sourceMethod: z.string().min(1),
    localReferencePopulation: z.number().int().positive(),
    distinctLocalWorks: z.number().int().positive(),
    fairRentFlickrPhotographs: z.number().int().positive(),
    totalDistinctWorks: z.number().int().positive(),
    photoEntries: z.number().int().positive(),
    unreadableWorks: z.number().int().nonnegative(),
    classificationCounts: z.record(z.string(), z.number().int().nonnegative()),
    siteOccurrenceCounts: z.record(z.string(), z.number().int().nonnegative())
  }),
  publicationBoundary: z.string().min(1),
  limitations: z.array(z.string().min(1)).min(1),
  works: z.array(workSchema).min(1)
});

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|Mobile Documents|Library\/CloudStorage|\.photoslibrary\b|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

export function evaluateCampaignMediaCensus(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const source =
    options.source ??
    readFileSync(path.join(repoRoot, censusRelativePath), "utf8");
  const errors = [];
  let data;

  if (privatePattern.test(source)) {
    errors.push("the public census contains a private path or identifier");
  }

  try {
    data = campaignMediaCensusSchema.parse(JSON.parse(source));
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    return { data: null, errors };
  }

  const ids = data.works.map((work) => work.id);
  const reviewIds = data.works.map((work) => work.reviewId);
  if (new Set(ids).size !== ids.length) errors.push("work IDs must be unique");
  if (new Set(reviewIds).size !== reviewIds.length) {
    errors.push("review IDs must be unique");
  }

  const classificationCounts = Object.fromEntries(
    Object.keys(data.researchScope.classificationCounts).map((key) => [key, 0])
  );
  const siteOccurrenceCounts = Object.fromEntries(
    data.researchScope.sites.map((site) => [site, 0])
  );

  for (const work of data.works) {
    classificationCounts[work.classification] =
      (classificationCounts[work.classification] ?? 0) + 1;
    for (const occurrence of work.occurrences) {
      siteOccurrenceCounts[occurrence.siteId] =
        (siteOccurrenceCounts[occurrence.siteId] ?? 0) + 1;
    }
  }

  const photoEntries = data.works.filter((work) => work.photoEntry).length;
  const unreadableWorks = data.works.filter(
    (work) => work.classification === "unreadable"
  ).length;

  const expected = data.researchScope;
  if (data.works.length !== expected.totalDistinctWorks) {
    errors.push("totalDistinctWorks does not match the work population");
  }
  if (photoEntries !== expected.photoEntries) {
    errors.push("photoEntries does not match the work population");
  }
  if (unreadableWorks !== expected.unreadableWorks) {
    errors.push("unreadableWorks does not match the work population");
  }
  if (
    Object.entries(expected.classificationCounts).some(
      ([key, value]) => classificationCounts[key] !== value
    )
  ) {
    errors.push("classificationCounts does not match the work population");
  }
  if (
    Object.entries(expected.siteOccurrenceCounts).some(
      ([key, value]) => siteOccurrenceCounts[key] !== value
    )
  ) {
    errors.push("siteOccurrenceCounts does not match the occurrence population");
  }

  return { data, errors };
}
