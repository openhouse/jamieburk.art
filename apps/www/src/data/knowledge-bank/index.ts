import artifactsInput from "./artifacts.json";
import assertionsInput from "./assertions.json";
import citationNotesInput from "./citation-notes.json";
import correctionsInput from "./corrections.json";
import evidenceInput from "./evidence.json";
import callNYCPageInput from "./pages/callnyc.json";
import researchRunsInput from "./research-runs.json";
import sourcesInput from "./sources.json";
import { KnowledgeBankSchema } from "./schema";

export const knowledgeBank = KnowledgeBankSchema.parse({
  sources: sourcesInput,
  assertions: assertionsInput,
  evidence: evidenceInput,
  researchRuns: researchRunsInput,
  artifacts: artifactsInput,
  corrections: correctionsInput,
  citationNotes: citationNotesInput,
  pages: [callNYCPageInput]
});

export const sourcesById = new Map(knowledgeBank.sources.map((record) => [record.id, record]));
export const assertionsById = new Map(knowledgeBank.assertions.map((record) => [record.id, record]));
export const evidenceById = new Map(knowledgeBank.evidence.map((record) => [record.id, record]));
export const citationNotesById = new Map(
  knowledgeBank.citationNotes.map((record) => [record.id, record])
);
export const citationPagesByRoute = new Map(
  knowledgeBank.pages.map((record) => [record.route, record])
);

export type {
  AssertionRecord,
  CitationNote,
  CitationPage,
  EvidenceRelationship,
  SourceRecord
} from "./schema";
