#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { compileKnowledgeWiki, repoRoot } from "../knowledge-wiki/lib.mjs";

const argument = (name) => { const index = process.argv.indexOf(name); return index >= 0 ? process.argv[index + 1] : undefined; };
const reportPath = argument("--report") ?? path.join(repoRoot, "reports/hiring/current/reader-consensus.json");
const report = JSON.parse(readFileSync(reportPath, "utf8"));
const compiled = compileKnowledgeWiki();
const roles = new Map(compiled.graph.nodes.filter((node) => node.kind === "opportunity").map((node) => [node.id, node]));
const resolutions = [];
for (const review of report.reviews) {
  const role = roles.get(review.opportunityId);
  const requirements = new Map(role.opportunity.role_requirements.map((item) => [item.id, item]));
  for (const gap of review.missingPositiveEvidence) {
    const requirementId = typeof gap === "string" ? null : gap.requirementId;
    const requirement = requirementId ? requirements.get(requirementId) : null;
    resolutions.push({
      reader_id: review.readerId,
      opportunity_id: review.opportunityId,
      signal: typeof gap === "string" ? gap : gap.signal,
      requirement_id: requirementId,
      classification: requirement?.coverage?.status ?? "unknown",
      public_routes: requirement?.coverage?.public_routes ?? [],
      wiki_evidence: requirement?.coverage?.wiki_evidence ?? [],
      public_proof_ids: requirement?.coverage?.public_proof_ids ?? [],
      next_action: requirement?.coverage?.next_action ?? "Create a bounded research inquiry; do not infer missing evidence.",
    });
  }
}
const root = path.dirname(path.resolve(reportPath));
mkdirSync(root, { recursive: true });
writeFileSync(path.join(root, "wiki-gap-resolution.json"), `${JSON.stringify({ schemaVersion: 1, candidateSha: report.candidateSha, sourceReport: path.relative(repoRoot, reportPath), resolutions }, null, 2)}\n`);
writeFileSync(path.join(root, "wiki-gap-resolution.md"), [
  "<!-- GENERATED AFTER HIRING EVALUATION. This file was not available to the hiring reader. -->",
  "",
  "# Wiki gap resolution",
  "",
  `Candidate fingerprint: \`${report.candidateSha}\``,
  "",
  "| Reader | Opportunity | Requirement | Classification | Next action |",
  "| --- | --- | --- | --- | --- |",
  ...resolutions.map((item) => `| \`${item.reader_id}\` | \`${item.opportunity_id}\` | ${item.requirement_id ? `\`${item.requirement_id}\`` : item.signal} | \`${item.classification}\` | ${item.next_action} |`),
  "",
  "The gap resolver may identify evidence work. It cannot approve publication, remove a hard screen, or change the hiring evaluation retroactively.",
].join("\n"));
process.stdout.write(`Resolved ${resolutions.length} reported gaps after evaluation\n`);
