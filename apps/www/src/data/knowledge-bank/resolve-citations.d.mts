import type {
  CitationNote,
  CitationPage,
  ClaimRecord,
  EvidenceRelationship,
  SourceRecord
} from "./schema";

export type CitationRegistry = {
  notesById: Map<string, CitationNote>;
  claimsById: Map<string, ClaimRecord>;
  evidenceById: Map<string, EvidenceRelationship>;
  sourcesById: Map<string, SourceRecord>;
};

export type ResolvedCitationOccurrence = CitationPage["occurrences"][number] & {
  note: CitationNote;
  number: number;
  citationId: string;
  referenceId: string;
};

export type ResolvedCitationReference = {
  note: CitationNote;
  claims: ClaimRecord[];
  evidence: EvidenceRelationship[];
  sources: SourceRecord[];
  number: number;
  referenceId: string;
  backlinks: Array<{ occurrenceId: string; citationId: string }>;
};

export type ResolvedCitationPage = Omit<CitationPage, "occurrences"> & {
  occurrences: ResolvedCitationOccurrence[];
  references: ResolvedCitationReference[];
  occurrenceById: Map<string, ResolvedCitationOccurrence>;
};

export function resolveCitationPage(page: CitationPage, registry: CitationRegistry): ResolvedCitationPage;
export function assertNoDuplicateDomIds(page: ResolvedCitationPage): true;
