#!/usr/bin/env node

import { buildWikiGraph, loadWiki, validateWiki, writeWikiArtifacts } from "./lib.mjs";

const records = loadWiki();
const validation = validateWiki(records);
if (validation.errors.length) {
  console.error("Wiki Graph generation refused because hard gates failed.");
  for (const entry of validation.errors) {
    console.error(`- ${entry.path}:${entry.line} [${entry.code}] ${entry.message}`);
  }
  process.exit(1);
}

const graph = buildWikiGraph(records);
const result = writeWikiArtifacts({ records, validation, graph });
console.log(
  `Wiki Graph generated: ${graph.nodes.length} nodes, ${graph.edges.length} semantic edges, ` +
    `${graph.documentLinks.length} document edges, fingerprint ${graph.semanticFingerprint.slice(0, 12)}.`
);
console.log(`Derived artifacts: ${result.paths.length} files under .artifacts/knowledge-wiki/.`);
