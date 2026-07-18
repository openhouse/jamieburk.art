#!/usr/bin/env node

import { loadKnowledgeWiki, queryWiki } from "./lib/knowledge-wiki.mjs";

const args = process.argv.slice(2);
const options = {};
let format = "text";
for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  const value = args[index + 1];
  if (argument === "--id" || argument === "--project") options.id = argument === "--project" ? `project.${value}` : value;
  else if (argument === "--kind") options.kind = value;
  else if (argument === "--status") options.status = value;
  else if (argument === "--visibility") options.visibility = value;
  else if (argument === "--surface") options.surface = value;
  else if (argument === "--canonical-ref") options.canonicalRef = value;
  else if (argument === "--backlinks") options.backlinks = value;
  else if (argument === "--format") format = value;
  else continue;
  index += 1;
}

if (!Object.keys(options).length) {
  console.error("Use --id, --project, --kind, --status, --visibility, --surface, --canonical-ref, or --backlinks.");
  process.exit(1);
}

const result = queryWiki(loadKnowledgeWiki({ failOnErrors: true }), options);
if (format === "json") console.log(JSON.stringify(result, null, 2));
else if (result.backlinks.length) {
  console.log(`Backlinks to ${options.backlinks}:`);
  for (const link of result.backlinks) console.log(`- ${link.from} (${link.type})`);
} else if (result.nodes.length) {
  for (const node of result.nodes) {
    console.log(`${node.id} | ${node.kind} | ${node.status}`);
    console.log(`  ${node.title}`);
    console.log(`  ${node.path}`);
    if (node.canonicalRefs.length) console.log(`  canonical: ${node.canonicalRefs.join(", ")}`);
    if (node.allowedSurfaces.length) console.log(`  surfaces: ${node.allowedSurfaces.join(", ")}`);
  }
} else {
  console.log("No public-safe Knowledge Wiki records matched.");
}
