import { getCitationGroup } from "./records";
import type { PageProjectionRecord } from "./schema";

export type CitationOccurrence = {
  citationGroupId: string;
  number: number;
  referenceId: string;
  occurrenceAnchor: string;
};

export type CitationReference = {
  citationGroupId: string;
  number: number;
  referenceId: string;
  citationAnchors: string[];
};

export type CitationProjection = {
  page: string;
  citationsByKey: Record<string, CitationOccurrence>;
  references: CitationReference[];
};

function slugifyPage(page: string) {
  const slug = page.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  return slug || "page";
}

export function defineCitationProjection(record: PageProjectionRecord): CitationProjection {
  const pageSlug = slugifyPage(record.page);
  const citationsByKey: Record<string, CitationOccurrence> = {};
  const references: CitationReference[] = [];
  const referenceByGroup = new Map<string, CitationReference>();
  const seenCitationKeys = new Set<string>();

  for (const occurrence of record.occurrences) {
    if (seenCitationKeys.has(occurrence.citationKey)) {
      throw new Error(`Duplicate citation key on ${record.page}: ${occurrence.citationKey}`);
    }

    seenCitationKeys.add(occurrence.citationKey);
    getCitationGroup(occurrence.citationGroupId);

    const occurrenceAnchor = `cite-${pageSlug}-${occurrence.citationKey}`;
    const existingReference = referenceByGroup.get(occurrence.citationGroupId);

    if (existingReference) {
      existingReference.citationAnchors.push(occurrenceAnchor);
      citationsByKey[occurrence.citationKey] = {
        citationGroupId: occurrence.citationGroupId,
        number: existingReference.number,
        referenceId: existingReference.referenceId,
        occurrenceAnchor
      };
      continue;
    }

    const reference: CitationReference = {
      citationGroupId: occurrence.citationGroupId,
      number: references.length + 1,
      referenceId: `note-${pageSlug}-${occurrence.citationGroupId.toLowerCase()}`,
      citationAnchors: [occurrenceAnchor]
    };

    references.push(reference);
    referenceByGroup.set(occurrence.citationGroupId, reference);
    citationsByKey[occurrence.citationKey] = {
      citationGroupId: occurrence.citationGroupId,
      number: reference.number,
      referenceId: reference.referenceId,
      occurrenceAnchor
    };
  }

  return {
    page: record.page,
    citationsByKey,
    references
  };
}
