import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

export function renderProjectionMap(input = knowledgeLifecycle) {
  const sections = input.proofSurfaceManifests.map((manifest) => [
    `## \`${manifest.route}\``,
    "",
    `**Surface:** \`${manifest.surface}\``,
    `**Audience:** ${manifest.audience}`,
    `**Purpose:** ${manifest.purpose}`,
    "",
    "### Approved Proofs",
    "",
    ...manifest.proofIds.map((id) => `- \`${id}\``),
    "",
    "### Exclusions",
    "",
    ...manifest.exclusions.map((item) => `- ${item}`),
    "",
    "### Guardrails",
    "",
    ...manifest.guardrails.map((item) => `- ${item}`)
  ].join("\n"));

  return [
    "# Projection Map",
    "",
    "This file is generated from the Jamie-approved exact-route manifests in",
    "`apps/www/src/data/knowledge-bank/lifecycle-records.ts`. The website is a",
    "composed public surface, not a claim database.",
    "",
    ...sections,
    ""
  ].join("\n");
}
