#!/usr/bin/env node

import { buildWikiGraph, loadWiki, validateWiki, writeWikiArtifacts } from "./lib.mjs";

const records = loadWiki();
const validation = validateWiki(records);
const graph = buildWikiGraph(records);
const result = writeWikiArtifacts({ records, validation, graph });

console.log(
  `Knowledge Wiki health report ${validation.errors.length ? "failed" : "passed"}: ` +
    `${validation.errors.length} hard errors, ${validation.warnings.length} warnings.`
);
console.log(
  `Reachability: ${validation.metrics.rootReachable}/${validation.metrics.discoverable}; ` +
    `wanted: ${validation.metrics.wantedPages.length}; rights backlog: ${validation.metrics.rightsBacklog.length}.`
);
console.log(`Report: ${result.paths.find((path) => path.endsWith("wiki-health.md"))}`);

if (validation.errors.length) process.exit(1);
