#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { intakeRecordSchema } from "../apps/www/src/data/knowledge-bank/schema.ts";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { loadIntakeQueue, validateIntakeEnvelope } from "./lib/knowledge-intake-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if (process.argv.includes("--help")) {
  console.log("Usage: npm run knowledge:intake -- --title TEXT --kind KIND --summary TEXT [--project ID] [--url URL] [--privacy public-safe-summary|protected] [--locator OPAQUE-ID] [--next TEXT] [--write]");
  process.exit(0);
}
const values = parseArgs({
  options: {
    id: { type: "string" },
    title: { type: "string" },
    kind: { type: "string" },
    summary: { type: "string" },
    project: { type: "string" },
    url: { type: "string" },
    privacy: { type: "string", default: "public-safe-summary" },
    locator: { type: "string" },
    next: { type: "string" },
    date: { type: "string" },
    by: { type: "string" },
    write: { type: "boolean", default: false }
  }
}).values;

for (const field of ["title", "kind", "summary"]) {
  if (!values[field]) throw new Error("Missing --" + field);
}
const date = values.date || new Date().toISOString().slice(0, 10);
const slug = values.title.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
const id = values.id || "INTAKE-" + date + "-" + slug;
const record = intakeRecordSchema.parse({
  id,
  receivedAt: date,
  kind: values.kind,
  project: values.project,
  publicSummary: values.summary,
  privacy: values.privacy,
  status: "received",
  sourceIds: [],
  claimIds: [],
  researchInquiryIds: [],
  projectionIntent: "undecided",
  nextActions: [values.next || "Close-read the lead, create or associate canonical sources, and decide whether a bounded claim or research inquiry is warranted."],
  protectedLocatorId: values.locator,
  reviewedAt: date,
  reviewedBy: [values.by || "knowledge intake CLI"]
});
const envelope = {
  version: 1,
  title: values.title,
  publicUrl: values.url || null,
  record
};
const failures = validateIntakeEnvelope(envelope);
if (failures.length) throw new Error(failures.join("; "));

const canonical = new Set(knowledgeBank.intakeRecords.map(function (item) { return item.id; }));
const queued = new Set(loadIntakeQueue(repoRoot).map(function (item) { return item.envelope.record.id; }));
if (canonical.has(id) || queued.has(id)) throw new Error("Intake ID already exists: " + id);

if (values.write) {
  const directory = path.join(repoRoot, "docs/knowledge-bank/intake");
  const output = path.join(directory, id + ".json");
  if (existsSync(output)) throw new Error("Refusing to overwrite " + path.relative(repoRoot, output));
  mkdirSync(directory, { recursive: true });
  writeFileSync(output, JSON.stringify(envelope, null, 2) + "\n");
  console.error("Wrote " + path.relative(repoRoot, output));
}
console.log(JSON.stringify(envelope, null, 2));

