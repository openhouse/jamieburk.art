#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import {
  knowledgeLifecycleReport,
  validateKnowledgeLifecycle
} from "./lib/knowledge-lifecycle-validation.mjs";

const errors = validateKnowledgeLifecycle();
if (errors.length) throw new Error(errors.join("\n"));

const report = knowledgeLifecycleReport();
const lines = [
  "# Knowledge lifecycle report",
  "",
  "Generated from the canonical public-safe knowledge bank.",
  "",
  `- Intake records: ${report.intakeCount}`,
  `- Sources: ${report.sources}`,
  `- Claims: ${report.claims}`,
  `- Research inquiries: ${report.inquiries}`,
  "",
  "## Intake by status",
  "",
  ...Object.entries(report.intakeByStatus).map(([status, count]) => `- ${status}: ${count}`),
  "",
  "## Mature claims held from the website",
  "",
  ...(report.heldMatureClaimIds.length
    ? report.heldMatureClaimIds.map((id) => `- ${id}`)
    : ["None."]),
  "",
  "## Projection decisions",
  "",
  ...report.projectionDecisions.map((decision) => {
    const destination = decision.surfaces.length
      ? decision.surfaces.map((surface) => `\`${surface}\``).join(", ")
      : "no public surface";
    return `- \`${decision.claimId}/${decision.key}\` - **${decision.status}** - ${destination}: ${decision.rationale}`;
  }),
  "",
  "## Public proof-surface decisions",
  "",
  ...report.proofProjectionDecisions.map((decision) => {
    const destination = decision.surfaces.map((surface) => `\`${surface}\``).join(", ");
    const coverage = decision.canonicalCoverage
      ? "canonical claim linked"
      : "canonical research backlog";
    return `- \`${decision.proofId}\` - **${decision.status}** - ${destination} - ${coverage}: ${decision.rationale} Guardrail: ${decision.guardrail}`;
  }),
  "",
  "## Canonically linked proof claims",
  "",
  ...(report.canonicallyLinkedProofIds.length
    ? report.canonicallyLinkedProofIds.map((id) => `- ${id}`)
    : ["None."]),
  "",
  "## Proof research backlog",
  "",
  ...report.proofResearchBacklogIds.map((id) => `- ${id}`),
  ""
];

mkdirSync("reports/generated", { recursive: true });
writeFileSync("reports/generated/knowledge-lifecycle.md", lines.join("\n"));
console.log("Wrote reports/generated/knowledge-lifecycle.md");
