#!/usr/bin/env node

import { queryWiki, renderQuery } from "./lib.mjs";

const args = process.argv.slice(2);
const help = `Knowledge Wiki query (read-only)\n\n` +
  `Usage:\n` +
  `  npm run wiki:query -- --id project.callnyc\n` +
  `  npm run wiki:query -- --backlinks project.callnyc\n` +
  `  npm run wiki:query -- --authority claim:CLM-CALLNYC-INDEPENDENT-FOLLOW-ON\n` +
  `  npm run wiki:query -- --project callnyc\n` +
  `  npm run wiki:query -- --rights-pending\n` +
  `  npm run wiki:query -- --question callnyc-chronology\n` +
  `  npm run wiki:query -- --question digital-district-protection --json\n\n` +
  `Bounded questions: callnyc-chronology, callnyc-time, ` +
  `callnyc-council-attribution, digital-district-support, ` +
  `digital-district-protection, callnyc-correction, public-data-translation, ` +
  `oti-role-coverage.\n` +
  `The command reads authored Wiki records and never edits or promotes them.\n`;

if (!args.length || args.includes("--help") || args.includes("-h")) {
  console.log(help);
  process.exit(0);
}

const modes = ["id", "backlinks", "authority", "project", "rights-pending", "question"];
let mode = null;
let value = null;
for (const candidate of modes) {
  const index = args.indexOf(`--${candidate}`);
  if (index === -1) continue;
  if (mode) {
    console.error("Choose exactly one query mode.");
    process.exit(2);
  }
  mode = candidate;
  value = candidate === "rights-pending" ? true : args[index + 1];
}

if (!mode || (mode !== "rights-pending" && !value)) {
  console.error(help);
  process.exit(2);
}

const result = queryWiki({ mode, value });
if (args.includes("--json")) console.log(JSON.stringify(result, null, 2));
else process.stdout.write(renderQuery(result));
if (result.error) process.exit(1);
