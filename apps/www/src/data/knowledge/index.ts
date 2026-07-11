import claimsJson from "./claims.json" with { type: "json" };
import evidenceJson from "./evidence.json" with { type: "json" };
import pagesJson from "./pages.json" with { type: "json" };
import researchAuditsJson from "./research-audits.json" with { type: "json" };
import sourcesJson from "./sources.json" with { type: "json" };
import {
  knowledgeBundleSchema,
  type KnowledgeBundle,
  type ResolvedCitationPage,
  type ResolvedSourceNote
} from "./schema.ts";

const privatePathPattern = /(?:\/Users\/|\/private\/tmp\/|\/Volumes\/|[A-Z]:\\)/i;
const negativeProofPattern = /(?:proves?|establishes?)\s+(?:that\s+)?(?:no|never|nonexistence)/i;

function duplicateIds(records: { id: string }[], label: string): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const record of records) {
    if (seen.has(record.id)) duplicates.add(record.id);
    seen.add(record.id);
  }

  return [...duplicates].map((id) => `${label} has duplicate ID: ${id}`);
}

function normalized(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function validateKnowledgeBundle(input: unknown): KnowledgeBundle {
  const bundle = knowledgeBundleSchema.parse(input);
  const errors = [
    ...duplicateIds(bundle.sources, "Source"),
    ...duplicateIds(bundle.claims, "Claim"),
    ...duplicateIds(bundle.researchAudits, "Research audit"),
    ...duplicateIds(bundle.pages.map((page) => ({ id: page.route })), "Citation page")
  ];
  const sourceById = new Map(bundle.sources.map((source) => [source.id, source]));
  const claimById = new Map(bundle.claims.map((claim) => [claim.id, claim]));

  for (const source of bundle.sources) {
    if (privatePathPattern.test(JSON.stringify(source))) {
      errors.push(`Source ${source.id} contains an absolute private filesystem path.`);
    }

    if (source.type === "archived-web-capture" && !source.doesNotEstablish.length) {
      errors.push(`Archival source ${source.id} must state what it does not establish.`);
    }

    for (const carriedSourceId of source.archiveCarrierFor ?? []) {
      if (!sourceById.has(carriedSourceId)) {
        errors.push(`Source ${source.id} carries unknown source ${carriedSourceId}.`);
      }
    }
  }

  for (const relationship of bundle.evidence) {
    const claim = claimById.get(relationship.claimId);
    const source = sourceById.get(relationship.sourceId);

    if (!claim) errors.push(`Evidence references unknown claim ${relationship.claimId}.`);
    if (!source) errors.push(`Evidence references unknown source ${relationship.sourceId}.`);
    if (!claim || !source) continue;

    if (relationship.publicCitation && claim.status !== "defensible") {
      errors.push(
        `Evidence ${claim.id} -> ${source.id} cites claim with non-public status ${claim.status}.`
      );
    }
    if (relationship.publicCitation && source.visibility === "protected") {
      errors.push(`Evidence ${claim.id} -> ${source.id} attempts to cite a protected source.`);
    }
    if (relationship.publicCitation && !relationship.citationNote) {
      errors.push(`Evidence ${claim.id} -> ${source.id} lacks a public citation note.`);
    }
    if (relationship.supportType === "archival-carrier") {
      if (source.type !== "archived-web-capture") {
        errors.push(`Archival-carrier evidence ${claim.id} -> ${source.id} is not an archive.`);
      }
      if (!relationship.limitations.some((item) => /not the event listing/i.test(item))) {
        errors.push(`Archival-carrier evidence ${claim.id} -> ${source.id} must reject event-listing status.`);
      }
    }
    if (
      relationship.supportType === "negative-search-result" &&
      negativeProofPattern.test(`${relationship.supportsText} ${relationship.citationNote ?? ""}`)
    ) {
      errors.push(`Negative-search evidence ${claim.id} -> ${source.id} is worded as proof of nonexistence.`);
    }

    const support = normalized(relationship.supportsText);
    for (const antiSupport of source.doesNotEstablish) {
      const rejected = normalized(antiSupport);
      if (support === rejected || (rejected.length > 20 && support.includes(rejected))) {
        errors.push(
          `Evidence ${claim.id} -> ${source.id} asks the source to prove '${antiSupport}', which it does not establish.`
        );
      }
    }
  }

  for (const audit of bundle.researchAudits) {
    if (negativeProofPattern.test(`${audit.result} ${audit.interpretation}`)) {
      errors.push(`Research audit ${audit.id} is worded as proof of nonexistence.`);
    }
  }

  for (const page of bundle.pages) {
    const occurrenceIds = new Set<string>();
    for (const occurrence of page.occurrences) {
      if (occurrenceIds.has(occurrence.id)) {
        errors.push(`Citation page ${page.route} has duplicate occurrence ID ${occurrence.id}.`);
      }
      occurrenceIds.add(occurrence.id);

      const claim = claimById.get(occurrence.claimId);
      if (!claim) {
        errors.push(`Citation page ${page.route} references unknown claim ${occurrence.claimId}.`);
        continue;
      }
      if (claim.status !== "defensible") {
        errors.push(`Citation page ${page.route} uses ${claim.status} claim ${claim.id}.`);
      }
      if (!claim.allowedSurfaces.includes(page.route)) {
        errors.push(`Claim ${claim.id} does not allow citation on ${page.route}.`);
      }
      const publicEvidence = bundle.evidence.filter(
        (item) => item.claimId === claim.id && item.publicCitation
      );
      if (!publicEvidence.length) {
        errors.push(`Citation page ${page.route} claim ${claim.id} has no public evidence.`);
      }
    }
  }

  if (errors.length) {
    throw new Error(`Citation knowledge validation failed:\n- ${errors.join("\n- ")}`);
  }

  return bundle;
}

export const knowledgeBundle = validateKnowledgeBundle({
  sources: sourcesJson,
  claims: claimsJson,
  evidence: evidenceJson,
  researchAudits: researchAuditsJson,
  pages: pagesJson
});

export function resolveCitationPage(
  route: string,
  bundle: KnowledgeBundle = knowledgeBundle
): ResolvedCitationPage {
  const page = bundle.pages.find((candidate) => candidate.route === route);
  if (!page) throw new Error(`Unknown citation page: ${route}`);

  const claimById = new Map(bundle.claims.map((claim) => [claim.id, claim]));
  const sourceById = new Map(bundle.sources.map((source) => [source.id, source]));
  const sourceNumbers = new Map<string, number>();
  const sourceNotes = new Map<string, ResolvedSourceNote>();
  let nextNumber = 1;

  const occurrences = page.occurrences.map((occurrence) => {
    const claim = claimById.get(occurrence.claimId);
    if (!claim) throw new Error(`Unknown claim ${occurrence.claimId} on ${route}.`);
    if (claim.status !== "defensible") {
      throw new Error(`Claim ${claim.id} cannot render with status ${claim.status}.`);
    }
    if (!claim.allowedSurfaces.includes(route)) {
      throw new Error(`Claim ${claim.id} is not allowed on ${route}.`);
    }

    const publicEvidence = bundle.evidence.filter(
      (item) => item.claimId === claim.id && item.publicCitation
    );
    const resolvedSources = publicEvidence.map((relationship) => {
      const source = sourceById.get(relationship.sourceId);
      if (!source) throw new Error(`Unknown source ${relationship.sourceId} for ${claim.id}.`);
      if (source.visibility === "protected") {
        throw new Error(`Protected source ${source.id} cannot render.`);
      }

      let number = sourceNumbers.get(source.id);
      if (!number) {
        number = nextNumber++;
        sourceNumbers.set(source.id, number);
      }

      const targetId = `source-${page.slug}-${number}`;
      const refId = `cite-${page.slug}-${occurrence.id}-${number}`;
      const existing = sourceNotes.get(source.id);
      if (existing) {
        existing.evidence.push(relationship);
        existing.backlinks.push({
          id: refId,
          label: `Return to citation ${number}, occurrence ${existing.backlinks.length + 1}`
        });
      } else {
        sourceNotes.set(source.id, {
          source,
          evidence: [relationship],
          number,
          targetId,
          backlinks: [{ id: refId, label: `Return to citation ${number}` }]
        });
      }

      return { source, evidence: relationship, number, targetId, refId };
    });

    return { id: occurrence.id, claim, sources: resolvedSources };
  });

  return {
    route: page.route,
    slug: page.slug,
    occurrences,
    sources: [...sourceNotes.values()].sort((a, b) => a.number - b.number)
  };
}

export function getCitationOccurrence(page: ResolvedCitationPage, id: string) {
  const occurrence = page.occurrences.find((candidate) => candidate.id === id);
  if (!occurrence) throw new Error(`Unknown citation occurrence ${id} on ${page.route}.`);
  return occurrence;
}

export const callnycCitationPage = resolveCitationPage("/work/callnyc");

export type {
  CitationPage,
  EvidenceRelationship,
  KnowledgeBundle,
  ResolvedCitationPage
} from "./schema.ts";
