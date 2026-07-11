import type {
  AssetRecord,
  ClaimRecord,
  CorrectionRecord,
  EvidenceRelationship,
  PageCitationProjection,
  ResearchRunRecord,
  SourceRecord
} from "@/data/knowledge-bank/schema";

export type CitationRegistry = {
  assets: AssetRecord[];
  claims: ClaimRecord[];
  corrections: CorrectionRecord[];
  evidence: EvidenceRelationship[];
  projections: PageCitationProjection[];
  researchRuns: ResearchRunRecord[];
  sources: SourceRecord[];
};

export type CitationSourceSummary = {
  id: string;
  title: string;
  shortCitation: string;
  fullCitation: string;
  publicNote: string;
  originalUrl?: string;
  archiveUrl?: string;
  publiclyLinkable: boolean;
  accessStatus: string;
  sourceType: string;
  establishes: string[];
  doesNotEstablish: string[];
};

export type CitationBacklink = {
  anchorId: string;
  label: string;
};

export type ResolvedReference = {
  number: number;
  evidenceId: string;
  claimId: string;
  treatment: "linked" | "summary_only";
  note: string;
  qualifierNotes: string[];
  source: CitationSourceSummary;
  backlinks: CitationBacklink[];
};

export type ResolvedOccurrenceCitation = {
  referenceNumber: number;
  referenceId: string;
  anchorId: string;
};

export type ResolvedCitationOccurrence = {
  occurrenceId: string;
  claimId: string;
  citations: ResolvedOccurrenceCitation[];
};

export type ResolvedCitationPage = Pick<
  PageCitationProjection,
  "id" | "path" | "surface" | "title"
> & {
  occurrences: Record<string, ResolvedCitationOccurrence>;
  references: ResolvedReference[];
};
