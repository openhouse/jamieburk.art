#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import {
  knowledgeLifecycleReport,
  validateKnowledgeLifecycle
} from "./lib/knowledge-lifecycle-validation.mjs";

const errors = validateKnowledgeLifecycle();
if (errors.length) throw new Error(errors.join("\n"));

const report = knowledgeLifecycleReport();
const humanStatus = JSON.parse(
  readFileSync("docs/evals/blind-spot-human-status.json", "utf8")
);
const humanBlockers = Object.entries(humanStatus.evals)
  .filter(([, value]) => value.status === "pending-human-review")
  .map(([id, value]) => `${id}: ${value.blockingReason}`);
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
  "## Lifecycle debt and blockers",
  "",
  `- Orphan active intake: ${report.orphanIntakeIds.length}`,
  `- Unsupported public claims: ${report.unsupportedPublicClaimIds.length}`,
  `- Unresolved inquiries: ${report.unresolvedInquiryIds.length}`,
  `- Sources with rights, consent, or display holds: ${report.rightsHoldSourceIds.length}`,
  `- Proof records in canonical research backlog: ${report.proofResearchBacklogIds.length}`,
  "",
  "### Human-only blockers",
  "",
  ...(humanBlockers.length ? humanBlockers.map((item) => `- ${item}`) : ["None."]),
  "",
  "### Orphan active intake",
  "",
  ...(report.orphanIntakeIds.length ? report.orphanIntakeIds.map((id) => `- ${id}`) : ["None."]),
  "",
  "### Unsupported public claims",
  "",
  ...(report.unsupportedPublicClaimIds.length ? report.unsupportedPublicClaimIds.map((id) => `- ${id}`) : ["None."]),
  "",
  "### Unresolved inquiries",
  "",
  ...(report.unresolvedInquiryIds.length ? report.unresolvedInquiryIds.map((id) => `- ${id}`) : ["None."]),
  "",
  "### Rights, consent, or display holds",
  "",
  ...(report.rightsHoldSourceIds.length ? report.rightsHoldSourceIds.map((id) => `- ${id}`) : ["None."]),
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
