import { assertionsById, evidenceById, sourcesById } from "./index";

const blockedPublicPolicies = new Set(["approval-required", "internal-only"]);

export function getPublicCitation(evidenceId: string) {
  const evidence = evidenceById.get(evidenceId);
  if (!evidence) throw new Error(`Unknown evidence relationship: ${evidenceId}`);
  if (!evidence.publicCitation) throw new Error(`Evidence is not approved for public citation: ${evidenceId}`);

  const source = sourcesById.get(evidence.sourceId);
  const assertion = assertionsById.get(evidence.assertionId);
  if (!source || !assertion) throw new Error(`Incomplete evidence relationship: ${evidenceId}`);
  if (blockedPublicPolicies.has(source.publicCitationPolicy)) {
    throw new Error(`Source policy blocks public citation: ${evidenceId}`);
  }

  return { evidence, source, assertion };
}
