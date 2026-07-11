import { mkdirSync, writeFileSync } from "node:fs";
import { citationReport, validateKnowledgeBank } from "./lib/citation-validation.mjs";

const errors = validateKnowledgeBank();
if (errors.length) throw new Error(`Cannot report an invalid citation registry:\n${errors.join("\n")}`);
const report = citationReport();
const table = (rows) => rows.map(([label, count]) => `| ${label} | ${count} |`).join("\n");
const lines = [
  "# Citation report", "", "Generated from the canonical machine-readable Knowledge Bank. Do not edit this report by hand.", "",
  "## Sources by kind", "", "| Kind | Count |", "| --- | ---: |", table(report.sourceKinds), "",
  "## Sources by visibility", "", "| Visibility | Count |", "| --- | ---: |", table(report.sourceVisibility), "",
  "## Preservation", "", "| Status | Count |", "| --- | ---: |", table(report.preservation), "",
  "## Claims and projections", "", `- Active projections: ${report.activeProjections}`, `- Cited claims: ${report.citedClaims}`, `- Uncited public claims: ${report.uncitedPublicClaims.join(", ") || "none"}`, `- Projection surfaces: ${report.projectionSurfaces.join(", ")}`, "",
  "## Research and corrections", "", `- Research inquiries: ${report.inquiries}`, `- Corrections: ${report.corrections}`, "",
  "## Bounded evidence", "", ...report.boundedEvidence.map((item) => `- ${item.id}: ${item.visibility}`), "",
  "## Orphan sources", "", ...(report.orphanSources.length ? report.orphanSources.map((id) => `- ${id}`) : ["None."]), "",
  "## Pages", "", ...report.pages.map((page) => `- ${page.id}: ${page.sources} sources, ${page.occurrences} occurrences`), ""
];
mkdirSync("reports/generated", { recursive: true });
writeFileSync("reports/generated/citations.md", lines.join("\n"));
console.log("Wrote reports/generated/citations.md");
