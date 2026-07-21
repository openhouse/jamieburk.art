#!/usr/bin/env node

import { checkGeneratedOutputs, compileWiki } from "./lib.mjs";

const result = compileWiki();
const generatedIssues = checkGeneratedOutputs(result);
const errors = [...result.errors, ...generatedIssues];

if (result.warnings.length) {
  console.warn("Knowledge Wiki diagnostics:");
  for (const issue of result.warnings) {
    console.warn(`- ${issue.code} ${issue.file}:${issue.line} - ${issue.message}`);
  }
}

if (errors.length) {
  console.error("Knowledge Wiki check failed:");
  for (const issue of errors) {
    console.error(`- ${issue.code} ${issue.file}:${issue.line} - ${issue.message}`);
  }
  process.exit(1);
}

console.log(
  `Knowledge Wiki check passed: ${result.graph.nodes.length} records, ${result.graph.edges.length} semantic/evidence edges, ${result.graph.documentLinks.length} prose links, all generated outputs current.`
);
