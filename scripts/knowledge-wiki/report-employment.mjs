#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { employmentHealth, fingerprint } from "./employment.mjs";
import { repoRoot } from "./lib.mjs";

const health = employmentHealth();
const root = path.join(repoRoot, "reports/wiki");
const roleRoot = path.join(root, "role-coverage");
mkdirSync(roleRoot, { recursive: true });

function write(relative, content) {
  writeFileSync(path.join(root, relative), content.endsWith("\n") ? content : `${content}\n`);
}

write("employment-health.json", `${JSON.stringify({ ...health, fingerprint: fingerprint(health) }, null, 2)}\n`);
write("employment-health.md", [
  "<!-- GENERATED FILE. Run `npm run wiki:employment:report`; do not edit directly. -->",
  "",
  "# Employment context health",
  "",
  `**Status:** ${health.status.toUpperCase()}`,
  `**As of:** ${health.as_of}`,
  "",
  "## Hard gates",
  "",
  "| Gate | Result |",
  "| --- | --- |",
  ...Object.entries(health.gates).map(([gate, pass]) => `| ${gate.replaceAll("_", " ")} | ${pass ? "PASS" : "FAIL"} |`),
  "",
  "These gates do not establish employer interest, human approval, rights clearance, or application outcome.",
].join("\n"));

for (const role of health.role_coverage) {
  write(`role-coverage/${role.opportunity_id}.md`, [
    "<!-- GENERATED FILE. Run `npm run wiki:employment:report`; do not edit directly. -->",
    "",
    `# ${role.title} - role coverage`,
    "",
    `Official posting state: **${role.posting_status}**. Verified ${role.verified_at}; reverify by ${role.reverify_by}.`,
    "",
    "| Requirement | Importance | Wiki evidence | Public evidence | Status | Gap | Next action |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...role.requirements.map((item) => `| \`${item.id}\`<br>${item.text} | ${item.importance} | ${item.wiki_evidence.map((id) => `\`${id}\``).join(", ")} | ${item.public_routes.map((route) => `\`${route}\``).join(", ")} | \`${item.status}\` | ${item.gap_type} | ${item.next_action} |`),
    "",
    "## Hard screens",
    "",
    ...role.hard_screens.map((item) => `- \`${item.id}\` - **${item.status}**: ${item.text} Next: ${item.next_action}`),
    "",
    "This report describes evidence visibility, not applicant eligibility or a hiring decision.",
  ].join("\n"));
}

const discovery = health.discovery;
write("opportunity-discovery-recall.md", [
  "<!-- GENERATED FILE. Run `npm run wiki:employment:report`; do not edit directly. -->",
  "",
  "# Opportunity discovery recall",
  "",
  `**Title-blind:** ${discovery.title_blind ? "YES" : "NO"}`,
  `**Top-${discovery.top_k} recall:** ${(discovery.top_k_recall * 100).toFixed(0)}%`,
  `**Precision:** ${(discovery.precision * 100).toFixed(0)}%`,
  `**Hard-screen detection:** ${(discovery.hard_screen_detection * 100).toFixed(0)}%`,
  `**Closed control rejected:** ${discovery.closed_roles_rejected ? "YES" : "NO"}`,
  `**Below-floor control rejected:** ${discovery.below_floor_rejected ? "YES" : "NO"}`,
  "",
  "## Retrieved priority roles",
  "",
  ...discovery.retrieved.map((id, index) => `${index + 1}. \`${id}\``),
  "",
  "Scenario controls test the retrieval policy; they are not live job leads.",
].join("\n"));

write("source-coverage.md", [
  "<!-- GENERATED FILE. Run `npm run wiki:employment:report`; do not edit directly. -->",
  "",
  "# Source-channel coverage",
  "",
  "Canonical authored coverage: `docs/knowledge-bank/employment/source-channel-coverage.md`.",
  "",
  "The public report confirms that protected channels are represented only by opaque IDs, access state, known gaps, and public-use boundaries. Raw communications and private relationship history remain outside Git.",
].join("\n"));

write("career-trajectory-coverage.md", [
  "<!-- GENERATED FILE. Run `npm run wiki:employment:report`; do not edit directly. -->",
  "",
  "# Career trajectory coverage",
  "",
  "Canonical authored coverage: `docs/knowledge-bank/employment/career-trajectory.md`.",
  "",
  "The current role family is Technical Project Manager - Product Operations & Implementation. The label is a hiring translation of a broader practice, not its final essence.",
].join("\n"));

process.stdout.write(`Wrote employment reports to ${path.relative(repoRoot, root)}\n`);
