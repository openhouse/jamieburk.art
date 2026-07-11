#!/usr/bin/env node

import { getPageCitationScope, getPublicReferences } from "./projectors/public-page.ts";
import { callNYCKnowledgeBank } from "./records/callnyc.ts";
import type { KnowledgeBank } from "./schemas.ts";

export function createCitationReport(
  pageId = "work.callnyc",
  bank: KnowledgeBank = callNYCKnowledgeBank
) {
  const scope = getPageCitationScope(pageId, bank);
  const references = getPublicReferences(pageId, bank);
  const lines: string[] = [];

  lines.push(`# Citation Report: ${scope.path}`);
  lines.push("");
  lines.push(`Page ID: ${scope.pageId}`);
  lines.push(`Visible references: ${references.length}`);
  lines.push(`Citation occurrences: ${scope.occurrences.length}`);
  lines.push("");

  for (const reference of references) {
    lines.push(`## [${reference.number}] ${reference.citationGroup.shortLabel}`);
    lines.push(`Citation group: ${reference.citationGroup.id}`);
    lines.push(`Occurrences: ${reference.occurrences.map((item) => item.occurrenceId).join(", ")}`);
    lines.push("");
    lines.push("Claims:");
    for (const claim of reference.claims) {
      lines.push(`- ${claim.id} (${claim.status}, ${claim.reviewStatus})`);
      lines.push(`  ${claim.approvedPublicText}`);
      if (claim.guardrails?.length) lines.push(`  Guardrails: ${claim.guardrails.join("; ")}`);
    }
    lines.push("");
    lines.push("Support:");
    for (const target of reference.targets) {
      const linkState = target.links.length ? "linked" : "description-only";
      lines.push(
        `- ${target.kind}:${target.id} (${target.relation}, ${linkState}, rights: ${target.rightsState ?? "n/a"}, review: ${target.reviewState ?? "n/a"})`
      );
      lines.push(`  ${target.description}`);
      if (target.explanation) lines.push(`  Edge: ${target.explanation}`);
    }
    if (reference.corrections.length) {
      lines.push("");
      lines.push("Corrections affecting the claim:");
      for (const correction of reference.corrections) {
        lines.push(`- ${correction.id} (${correction.status}, ${correction.correctedAt})`);
        lines.push(`  Prior: ${correction.priorPublicText}`);
        lines.push(`  Revised: ${correction.revisedPublicText}`);
        lines.push(`  Reason: ${correction.reason}`);
      }
    }
    if (reference.warnings.length) {
      lines.push("");
      lines.push("Warnings:");
      for (const warning of reference.warnings) lines.push(`- ${warning}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(createCitationReport());
}
