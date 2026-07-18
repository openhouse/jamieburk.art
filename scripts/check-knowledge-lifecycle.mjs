#!/usr/bin/env node

import {
  knowledgeLifecycleReport,
  validateKnowledgeLifecycle
} from "./lib/knowledge-lifecycle-validation.mjs";

const errors = validateKnowledgeLifecycle();
if (errors.length) {
  console.error("Knowledge lifecycle validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const report = knowledgeLifecycleReport();
console.log(
  `Knowledge lifecycle passed: ${report.intakeCount} intake records, ` +
    `${report.sources} sources, ${report.claims} claims, ` +
    `${report.inquiries} inquiries, ${report.heldMatureClaimIds.length} held mature claims.`
);
console.log(
  `Canonical proof coverage: ${report.canonicallyLinkedProofIds.length} linked, ` +
    `${report.proofResearchBacklogIds.length} in explicit research backlog.`
);
