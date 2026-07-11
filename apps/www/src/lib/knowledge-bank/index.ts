import artifactsInput from "@/data/knowledge-bank/artifacts.json";
import assertionsInput from "@/data/knowledge-bank/assertions.json";
import evidenceInput from "@/data/knowledge-bank/evidence.json";
import researchRunsInput from "@/data/knowledge-bank/research-runs.json";
import sourcesInput from "@/data/knowledge-bank/sources.json";
import { KnowledgeBankSchema } from "./schema";

export const knowledgeBank = KnowledgeBankSchema.parse({
  sources: sourcesInput,
  assertions: assertionsInput,
  evidence: evidenceInput,
  researchRuns: researchRunsInput,
  artifacts: artifactsInput
});

export const sourcesById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
export const assertionsById = new Map(
  knowledgeBank.assertions.map((assertion) => [assertion.id, assertion])
);
export const evidenceById = new Map(
  knowledgeBank.evidence.map((relationship) => [relationship.id, relationship])
);
