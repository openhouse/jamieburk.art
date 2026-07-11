import type { CitationNote } from "@/data/knowledge-bank";
import { evidenceById, sourcesById } from "@/data/knowledge-bank";

const blockedPolicies = new Set(["approval-required", "internal-only"]);

export function validatePublicCitation(note: CitationNote) {
  if (!note.status.startsWith("public-ready")) {
    throw new Error(`Citation note is not public-ready: ${note.id}`);
  }

  return note.evidenceIds.map((evidenceId) => {
    const evidence = evidenceById.get(evidenceId);
    if (!evidence) throw new Error(`Citation note ${note.id} references unknown evidence ${evidenceId}`);
    if (!evidence.publicCitation) throw new Error(`Citation note ${note.id} includes non-public evidence ${evidenceId}`);

    const source = sourcesById.get(evidence.sourceId);
    if (!source) throw new Error(`Evidence ${evidenceId} references unknown source ${evidence.sourceId}`);
    if (source.visibility !== "public" || blockedPolicies.has(source.publicCitationPolicy)) {
      throw new Error(`Citation note ${note.id} includes protected or approval-required source ${source.id}`);
    }

    return { evidence, source };
  });
}
