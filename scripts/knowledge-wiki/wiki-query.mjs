#!/usr/bin/env node

import { compileWiki, queryWiki } from "./lib.mjs";

const args = process.argv.slice(2);
const flags = new Map();
for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (!argument.startsWith("--")) continue;
  const key = argument.slice(2);
  const value = args[index + 1] && !args[index + 1].startsWith("--") ? args[++index] : true;
  flags.set(key, value);
}

const query = {
  id: flags.get("id"),
  sourcesForClaim: flags.get("sources-for-claim"),
  claimsForSource: flags.get("claims-for-source"),
  backlinks: flags.get("backlinks"),
  projectedTo: flags.get("projected-to"),
  rightsPending: flags.has("rights-pending"),
  corrections: flags.has("corrections"),
  opportunity: flags.get("opportunity")
};
const format = flags.get("format") ?? "text";

if (!Object.values(query).some(Boolean)) {
  console.log(`Knowledge Wiki query options:
  --id <stable-id>
  --sources-for-claim <claim-id>
  --claims-for-source <source-id>
  --backlinks <stable-id>
  --projected-to <projection-id>
  --rights-pending
  --corrections
  --opportunity <opportunity-id>`);
  process.exit(0);
}

const result = compileWiki();
const answer = queryWiki(result, query);

if (format === "json") {
  console.log(JSON.stringify(answer, null, 2));
  process.exit(0);
}

function recordLine(record, markdown = false) {
  if (!record) return "Not found.";
  return markdown
    ? `- [${record.title}](./${record.path}) - \`${record.id}\``
    : `- ${record.title} (${record.id})\n  ${record.path}`;
}

const markdown = format === "markdown";
const lines = [];
if (answer.record !== undefined) {
  lines.push(markdown ? "# Knowledge Wiki record" : "Knowledge Wiki record", "", recordLine(answer.record, markdown));
} else if (answer.sources) {
  lines.push(markdown ? `# Sources for ${answer.claim}` : `Sources for ${answer.claim}`, "", ...answer.sources.map((record) => recordLine(record, markdown)));
} else if (answer.claims) {
  lines.push(markdown ? `# Claims supported by ${answer.source}` : `Claims supported by ${answer.source}`, "", ...answer.claims.map((record) => recordLine(record, markdown)));
} else if (answer.backlinks) {
  lines.push(markdown ? `# Backlinks to ${answer.target}` : `Backlinks to ${answer.target}`, "", ...answer.backlinks.map((item) => `- ${item.from} - ${item.type} (${item.source})`));
} else if (answer.records && answer.query === "projected-to") {
  lines.push(markdown ? `# Records projected to ${answer.target}` : `Records projected to ${answer.target}`, "", ...answer.records.map((record) => recordLine(record, markdown)));
} else if (answer.query === "rights-pending" || answer.query === "corrections") {
  lines.push(markdown ? `# ${answer.query}` : answer.query, "", ...answer.records.map((record) => `- ${record.id} - ${record.path}`));
} else if (answer.query === "opportunity") {
  lines.push(
    markdown ? `# ${answer.opportunity?.title ?? answer.query}` : answer.opportunity?.title ?? answer.query,
    "",
    recordLine(answer.opportunity, markdown),
    "",
    markdown ? "## Connected proof" : "Connected proof",
    "",
    ...answer.connected.map((record) => recordLine(record, markdown))
  );
}

console.log(lines.join("\n"));
