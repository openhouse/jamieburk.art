#!/usr/bin/env node
import { createIntakeReceipt, parseFlags, writeIntakeReceipt } from "./lib/knowledge-tools.mjs";

try {
  const flags = parseFlags(process.argv.slice(2));
  if (flags.help) {
    console.log("npm run knowledge:intake -- --title TEXT --project ID --kind public-url|public-artifact|memory-lead|photo-lead|collaborator-note --reason TEXT [--url HTTPS] [--visibility public-safe|protected] [--write]");
    process.exit(0);
  }
  const receipt = createIntakeReceipt(flags);
  if (flags.write) writeIntakeReceipt(receipt);
  console.log(JSON.stringify({ mode: flags.write ? "written" : "dry-run", receipt }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
