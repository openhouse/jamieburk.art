#!/usr/bin/env node
import { parseFlags, queryKnowledge } from "./lib/knowledge-tools.mjs";

try {
  const flags = parseFlags(process.argv.slice(2));
  const results = queryKnowledge(flags);
  if (flags.json) console.log(JSON.stringify(results, null, 2));
  else {
    console.log(`# Knowledge query\n\n${results.length} result(s)\n`);
    for (const { type, record } of results) console.log(`- [${type}] ${record.id}: ${record.title ?? record.internalClaim ?? record.text ?? record.question}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
