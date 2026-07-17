#!/usr/bin/env node

import { readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hasStableId } from "./lib/composite-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerPath = path.join(repoRoot, "docs/knowledge-bank/operator-intake-M.json");
const kinds = new Set([
  "url",
  "memory",
  "claim",
  "artifact",
  "repository",
  "photo-lead"
]);
const visibilities = new Set(["public", "public-safe", "protected"]);

function argsFrom(argv) {
  const args = { projectHints: [], write: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--write") {
      args.write = true;
      continue;
    }
    if (!token.startsWith("--")) continue;
    const key = token.slice(2).replace(/-([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${token}`);
    index += 1;
    if (key === "project") args.projectHints.push(value);
    else args[key] = value;
  }
  return args;
}

const args = argsFrom(process.argv.slice(2));
const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
const record = {
  id: args.id,
  receivedAt: args.receivedAt ?? new Date().toISOString().slice(0, 10),
  submittedBy: args.submittedBy ?? "Jamie Burkart",
  kind: args.kind,
  visibility: args.visibility,
  summary: args.summary,
  ...(args.sourceUrl ? { sourceUrl: args.sourceUrl } : {}),
  projectHints: args.projectHints,
  status: "captured",
  disposition: "Awaiting triage; no claim, promotion, or public projection was created.",
  linkedRecordIds: []
};

if (!hasStableId(record.id)) throw new Error("--id must be a stable uppercase hyphenated ID");
if (!kinds.has(record.kind)) throw new Error(`Unsupported --kind: ${record.kind}`);
if (!visibilities.has(record.visibility)) {
  throw new Error(`Unsupported --visibility: ${record.visibility}`);
}
if (!record.summary?.trim()) throw new Error("--summary is required");
if (record.visibility === "protected" && record.sourceUrl) {
  throw new Error("Protected intake cannot include a source URL");
}
if (ledger.items.some((item) => item.id === record.id)) {
  throw new Error(`Duplicate intake ID: ${record.id}`);
}

if (!args.write) {
  console.log(JSON.stringify({ mode: "dry-run", record }, null, 2));
  console.log("Rerun with --write to append this captured lead.");
  process.exit(0);
}

const nextLedger = { ...ledger, items: [...ledger.items, record] };
const temporaryPath = `${ledgerPath}.tmp`;
writeFileSync(temporaryPath, `${JSON.stringify(nextLedger, null, 2)}\n`, {
  flag: "wx"
});
renameSync(temporaryPath, ledgerPath);
console.log(`Captured ${record.id}; no promotion or projection was created.`);
