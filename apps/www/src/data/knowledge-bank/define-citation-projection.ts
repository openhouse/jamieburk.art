import { getClaim, getResearchRun, getSource } from "./records";
import type { CitationProjectionRecord, ClaimSupport } from "./schema";

export type CitationEntry = {
  entryType: "source" | "research-run";
  entryId: string;
  number: number;
  referenceId: string;
};

export type CitationOccurrence = {
  claimId: string;
  anchorId: string;
  entries: CitationEntry[];
};

export type CitationReference = CitationEntry & {
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

function supportEntryKey(support: ClaimSupport) {
  if (support.kind === "source") {
    getSource(support.sourceId);
    return `source:${support.sourceId}`;
  }

  getResearchRun(support.researchRunId);
  return `research-run:${support.researchRunId}`;
}

function supportEntryId(support: ClaimSupport) {
  return support.kind === "source" ? support.sourceId : support.researchRunId;
}

function supportEntryType(support: ClaimSupport): CitationEntry["entryType"] {
  return support.kind === "source" ? "source" : "research-run";
}

export function defineCitationProjection(
  record: CitationProjectionRecord
): CitationProjection {
  const pageSlug = slugifyPage(record.page);
  const citationsByKey: Record<string, CitationOccurrence> = {};
  const references: CitationReference[] = [];
  const referenceByEntryKey = new Map<string, CitationReference>();
  const seenCitationKeys = new Set<string>();

  for (const citation of record.citations) {
    if (seenCitationKeys.has(citation.key)) {
      throw new Error(`Duplicate citation key on ${record.page}: ${citation.key}`);
    }

    seenCitationKeys.add(citation.key);

    const claim = getClaim(citation.claimId);
    const anchorId = `cite-${pageSlug}-${citation.key}`;
    const entries = claim.support.map((support) => {
      const entryKey = supportEntryKey(support);
      const existingReference = referenceByEntryKey.get(entryKey);

      if (existingReference) {
        if (!existingReference.citationAnchors.includes(anchorId)) {
          existingReference.citationAnchors.push(anchorId);
        }

        return {
          entryType: existingReference.entryType,
          entryId: existingReference.entryId,
          number: existingReference.number,
          referenceId: existingReference.referenceId
        };
      }

      const entryType = supportEntryType(support);
      const entryId = supportEntryId(support);
      const reference: CitationReference = {
        entryType,
        entryId,
        number: references.length + 1,
        referenceId: `ref-${pageSlug}-${entryType}-${entryId.toLowerCase()}`,
        citationAnchors: [anchorId]
      };

      references.push(reference);
      referenceByEntryKey.set(entryKey, reference);

      return {
        entryType,
        entryId,
        number: reference.number,
        referenceId: reference.referenceId
      };
    });

    citationsByKey[citation.key] = {
      claimId: citation.claimId,
      anchorId,
      entries
    };
  }

  return {
    page: record.page,
    citationsByKey,
    references
  };
}
