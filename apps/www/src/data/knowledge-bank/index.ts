import { defineCitationProjection } from "./define-citation-projection";
import { callnycProjectionRecord } from "./records";

export {
  claims,
  corrections,
  getClaim,
  getResearchRun,
  getSource,
  researchRuns,
  sources
} from "./records";
export { defineCitationProjection } from "./define-citation-projection";
export type {
  CitationEntry,
  CitationOccurrence,
  CitationProjection,
  CitationReference
} from "./define-citation-projection";
export type {
  CitationProjectionRecord,
  ClaimRecord,
  ClaimSupport,
  CorrectionRecord,
  ResearchRunRecord,
  SourceRecord
} from "./schema";

export const callnycCitationProjection = defineCitationProjection(callnycProjectionRecord);
