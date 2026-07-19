#!/usr/bin/env node

import { checkGeneratedArtifacts, loadKnowledgeWiki } from "./lib/knowledge-wiki.mjs";

const wiki = loadKnowledgeWiki();
const failures = [...wiki.inspection.errors, ...checkGeneratedArtifacts(wiki)];

if (wiki.inspection.warnings.length) {
  console.warn("Knowledge Wiki diagnostics:");
  for (const warning of wiki.inspection.warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Knowledge Wiki check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Knowledge Wiki check passed: ${wiki.graph.nodes.length} records, ${wiki.graph.edges.length} edges, ` +
    `${wiki.health.diagnostics.reachableDiscoverableRecords}/${wiki.health.diagnostics.discoverableRecords} discoverable records reachable.`
);
