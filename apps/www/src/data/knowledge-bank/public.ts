import { z } from "zod";
import registryJson from "./public-registry.json" with { type: "json" };
import {
  citationPageSchema,
  claimProjectionSchema,
  evidenceRelationshipSchema,
  preservationStatusSchema,
  sourceKindSchema,
  type ClaimProjection,
  type CitationOccurrence
} from "./schema.ts";

const publicClaimSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["confirmed", "confirmed-with-boundary", "use-with-care"]),
  projections: z.array(claimProjectionSchema),
  evidence: z.array(evidenceRelationshipSchema.omit({ internalExcerpt: true, locator: true })),
  boundaries: z.array(z.string())
});

const publicSourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  organization: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  kind: sourceKindSchema,
  visibility: z.literal("public"),
  preservationStatus: preservationStatusSchema,
  publishedAt: z.string().optional(),
  capturedAt: z.string().optional(),
  accessedAt: z.string().optional(),
  canonicalUrl: z.url().optional(),
  archiveUrl: z.url().optional(),
  assetUrl: z.url().optional(),
  preferredPublicUrl: z.enum(["canonical", "archive", "asset"]).optional(),
  publicCitation: z.string().min(1),
  publicNote: z.string().min(1).optional(),
  doesNotEstablish: z.array(z.string().min(1))
});

export type PublicSourceRecord = z.infer<typeof publicSourceSchema>;

const publicRegistrySchema = z.object({
  sources: z.array(publicSourceSchema),
  claims: z.array(publicClaimSchema),
  pages: z.array(citationPageSchema)
});

export const publicCitationRegistry = publicRegistrySchema.parse(registryJson);

export const publicSourcesById = Object.fromEntries(
  publicCitationRegistry.sources.map((source) => [source.id, source])
) as Record<string, PublicSourceRecord>;

export const publicClaimsById = Object.fromEntries(
  publicCitationRegistry.claims.map((claim) => [claim.id, claim])
);

export const citationPagesById = Object.fromEntries(
  publicCitationRegistry.pages.map((page) => [page.id, page])
);

function domId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function citationReferenceId(pageId: string, occurrenceId: string, sourceId: string) {
  return `cite-ref-${domId(pageId)}-${domId(occurrenceId)}-${domId(sourceId)}`;
}

export function citationNoteId(pageId: string, number: number) {
  return `cite-${domId(pageId)}-${number}`;
}

export function getClaimProjection(
  claimId: string,
  projectionKey: ClaimProjection["key"],
  surface: string
) {
  const claim = publicClaimsById[claimId];
  if (!claim) throw new Error(`Unknown public claim ${claimId}`);

  const projection = claim.projections.find((item) => item.key === projectionKey);
  if (!projection) throw new Error(`Missing ${projectionKey} projection for ${claimId}`);
  if (projection.status !== "active") {
    throw new Error(`${claimId}/${projectionKey} is ${projection.status}, not active`);
  }
  if (!projection.surfaces.includes(surface)) {
    throw new Error(`${claimId}/${projectionKey} is not approved for ${surface}`);
  }

  return projection;
}

function resolveOccurrenceSources(pageId: string, occurrence: CitationOccurrence) {
  const page = citationPagesById[pageId];
  const claim = publicClaimsById[occurrence.claimId];
  if (!page) throw new Error(`Unknown citation page ${pageId}`);
  if (!claim) throw new Error(`Unknown claim ${occurrence.claimId} on ${pageId}`);

  const renderableSourceIds = new Set(claim.evidence.map((item) => item.sourceId));
  const sourceIds = occurrence.sourceIds ?? [...renderableSourceIds];

  return sourceIds.map((sourceId) => {
    if (!renderableSourceIds.has(sourceId)) {
      throw new Error(`Source ${sourceId} is not renderable evidence for ${occurrence.claimId}`);
    }
    const source = publicSourcesById[sourceId];
    const sourceIndex = page.sourceOrder.indexOf(sourceId);
    if (!source) throw new Error(`Unknown source ${sourceId} on ${pageId}`);
    if (sourceIndex < 0) throw new Error(`Source ${sourceId} is missing from ${pageId} order`);

    return {
      source,
      number: sourceIndex + 1,
      referenceId: citationReferenceId(pageId, occurrence.id, sourceId),
      noteId: citationNoteId(pageId, sourceIndex + 1)
    };
  });
}

export function resolveCitationOccurrence(pageId: string, occurrenceId: string) {
  const page = citationPagesById[pageId];
  if (!page) throw new Error(`Unknown citation page ${pageId}`);
  const occurrence = page.occurrences.find((item) => item.id === occurrenceId);
  if (!occurrence) throw new Error(`Unknown citation occurrence ${pageId}/${occurrenceId}`);

  return {
    occurrence,
    claim: publicClaimsById[occurrence.claimId],
    projection: getClaimProjection(occurrence.claimId, occurrence.projection, page.surface),
    sources: resolveOccurrenceSources(pageId, occurrence)
  };
}

export function resolveCitationReferences(pageId: string) {
  const page = citationPagesById[pageId];
  if (!page) return [];

  const bySourceId = new Map<string, {
    source: PublicSourceRecord;
    number: number;
    noteId: string;
    backlinks: Array<{ id: string; occurrenceId: string }>;
  }>();

  for (const occurrence of page.occurrences) {
    for (const resolved of resolveOccurrenceSources(pageId, occurrence)) {
      const existing = bySourceId.get(resolved.source.id);
      const backlink = { id: resolved.referenceId, occurrenceId: occurrence.id };
      if (existing) existing.backlinks.push(backlink);
      else {
        bySourceId.set(resolved.source.id, {
          source: resolved.source,
          number: resolved.number,
          noteId: resolved.noteId,
          backlinks: [backlink]
        });
      }
    }
  }

  return [...bySourceId.values()].sort((a, b) => a.number - b.number);
}
