#!/usr/bin/env node

import { compileWiki } from "./lib.mjs";

function parseArgs(argv) {
  const options = { format: "markdown" };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) options[key] = true;
    else {
      options[key] = value;
      index += 1;
    }
  }
  return options;
}

function usage() {
  console.log(`Knowledge Wiki query\n\n` +
    `  npm run wiki:query -- --id project.callnyc\n` +
    `  npm run wiki:query -- --project callnyc\n` +
    `  npm run wiki:query -- --kind source\n` +
    `  npm run wiki:query -- --status maintained\n` +
    `  npm run wiki:query -- --surface /work/callnyc\n` +
    `  npm run wiki:query -- --canonical-ref CLM-CALLNYC-INDEPENDENT-FOLLOW-ON\n` +
    `  npm run wiki:query -- --backlinks project.callnyc\n` +
    `  Add --format json for machine-readable output.`);
}

const options = parseArgs(process.argv.slice(2));
if (options.help || Object.keys(options).length === 1) {
  usage();
  process.exit(0);
}

const result = compileWiki();
if (result.health.hardFailures.length) {
  console.error("Query refused because the Wiki has hard failures. Run npm run wiki:check.");
  process.exit(1);
}

let nodes = result.graph.nodes;
if (options.id) nodes = nodes.filter((node) => node.id === options.id);
if (options.project) nodes = nodes.filter((node) => node.id === `project.${options.project}`);
if (options.capability) nodes = nodes.filter((node) => node.id === `capability.${options.capability}`);
if (options.opportunity) nodes = nodes.filter((node) => node.id.includes(`opportunity.${options.opportunity}`));
if (options.kind) nodes = nodes.filter((node) => node.kind === options.kind);
if (options.status) nodes = nodes.filter((node) => node.status === options.status);
if (options.surface) nodes = nodes.filter((node) => node.surface === options.surface);
if (options["canonical-ref"]) {
  nodes = nodes.filter((node) => node.canonicalRefs.includes(options["canonical-ref"]));
}

let output = { nodes };
if (options.backlinks) {
  const target = result.graph.nodes.find((node) => node.id === options.backlinks);
  output = {
    target: target ?? null,
    backlinks: result.backlinks[options.backlinks] ?? []
  };
}

if (options.format === "json") {
  console.log(JSON.stringify(output, null, 2));
  process.exit(0);
}

const printableNodes = options.backlinks ? [output.target].filter(Boolean) : output.nodes;
if (printableNodes.length === 0) {
  console.log("No matching Knowledge Wiki records.");
  process.exit(0);
}
for (const node of printableNodes) {
  console.log(`- [${node.title}](${node.path})`);
  console.log(`  - ID: \`${node.id}\``);
  console.log(`  - Kind/status: ${node.kind} / ${node.status}`);
  if (node.surface) console.log(`  - Surface: \`${node.surface}\``);
  if (node.canonicalRefs.length) console.log(`  - Canonical refs: ${node.canonicalRefs.map((id) => `\`${id}\``).join(", ")}`);
}
if (options.backlinks) {
  console.log("  - Backlinks:");
  for (const edge of output.backlinks) {
    console.log(`    - \`${edge.from}\` via \`${edge.type}\` (${edge.source})`);
  }
}
