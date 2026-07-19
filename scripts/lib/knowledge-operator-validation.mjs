import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateKnowledgeLifecycle } from "./knowledge-lifecycle-validation.mjs";

export function validateOperatorGraph(bank = knowledgeBank, proofs = proofClaims) {
  return validateKnowledgeLifecycle(bank, proofs);
}

export function validateIntakeCandidateReferences(
  candidate,
  bank = knowledgeBank,
  proofs = proofClaims
) {
  const errors = [];
  const knownProjects = new Set([
    ...bank.claims.map((item) => item.project),
    ...bank.researchInquiries.map((item) => item.project),
    ...bank.intake.flatMap((item) => item.projectIds),
    ...proofs.flatMap((item) => item.relatedProjects)
  ]);
  const referenceSets = {
    sourceIds: new Set(bank.sources.map((item) => item.id)),
    claimIds: new Set(bank.claims.map((item) => item.id)),
    inquiryIds: new Set(bank.researchInquiries.map((item) => item.id)),
    correctionIds: new Set(bank.corrections.map((item) => item.id)),
    relatedIntakeIds: new Set(bank.intake.map((item) => item.id))
  };

  for (const projectId of candidate.projectIds ?? []) {
    if (!knownProjects.has(projectId)) {
      errors.push(`Candidate references unknown project ${projectId}`);
    }
  }
  for (const [field, knownIds] of Object.entries(referenceSets)) {
    for (const id of candidate[field] ?? []) {
      if (!knownIds.has(id)) errors.push(`Candidate ${field} references unknown ID ${id}`);
    }
  }
  return errors;
}
