#!/usr/bin/env node

import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { intakeReceiptSchema, leadSchema } from "../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

function argsToObject(argv) {
  const output = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index]?.replace(/^--/, "");
    if (!key || argv[index + 1] === undefined) throw new Error("Use --key value pairs");
    output[key] = argv[index + 1];
  }
  return output;
}

function slug(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
}

function list(value) {
  return value ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

function assertKnown(values, known, label) {
  for (const value of values) if (!known.has(value)) throw new Error(`Unknown ${label}: ${value}`);
}

function readQueue(queuePath) {
  if (!existsSync(queuePath)) return [];
  return readFileSync(queuePath, "utf8").split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
}

try {
  const args = argsToObject(process.argv.slice(2));
  for (const required of ["title", "kind", "summary", "project"]) if (!args[required]) throw new Error(`Missing --${required}`);
  const capturedAt = args.date ?? new Date().toISOString().slice(0, 10);
  const lead = leadSchema.parse({
    id: args.id ?? `LEAD-${capturedAt.replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}-${slug(args.title)}`,
    title: args.title,
    kind: args.kind,
    capturedAt,
    capturedBy: args.by ?? "Jamie Burkart",
    state: "captured",
    visibility: args.visibility ?? "public-safe",
    publicSummary: args.summary,
    publicUrl: args.url,
    projectIds: list(args.project),
    entityIds: list(args.entities),
    sourceIds: list(args.sources),
    candidateClaimIds: [],
    researchTaskIds: [],
    protectedLocatorId: args.locator,
    duplicateOfLeadId: args["duplicate-of"],
    nextAction: args.next ?? "Triage the lead, associate canonical sources, and create the smallest useful research task."
  });
  if (lead.visibility === "private-reference" && !lead.protectedLocatorId) throw new Error("Private-reference intake requires an opaque --locator ID");
  if (lead.visibility === "private-reference" && lead.publicUrl) throw new Error("Private-reference intake cannot expose a public URL");
  if (lead.kind === "source-url" && !lead.publicUrl && !lead.sourceIds.length) throw new Error("Source URL intake requires --url or --sources");
  assertKnown(lead.projectIds, new Set(knowledgeLifecycle.projects.map(({ id }) => id)), "project");
  assertKnown(lead.entityIds, new Set(knowledgeLifecycle.entities.map(({ id }) => id)), "entity");
  assertKnown(lead.sourceIds, new Set(knowledgeBank.sources.map(({ id }) => id)), "source");
  const queuePath = args.queue ?? "docs/knowledge-bank/intake/receipts.jsonl";
  const existing = [...knowledgeLifecycle.leads, ...readQueue(queuePath)];
  if (existing.some(({ id }) => id === lead.id)) throw new Error(`Lead ID already exists: ${lead.id}`);
  if (lead.duplicateOfLeadId && !existing.some(({ id }) => id === lead.duplicateOfLeadId)) throw new Error(`Unknown duplicate target: ${lead.duplicateOfLeadId}`);
  const likelyDuplicate = existing.find((item) =>
    (lead.publicUrl && item.publicUrl === lead.publicUrl) ||
    (item.title.toLowerCase() === lead.title.toLowerCase() && item.publicSummary.toLowerCase() === lead.publicSummary.toLowerCase())
  );
  if (likelyDuplicate && lead.duplicateOfLeadId !== likelyDuplicate.id) throw new Error(`Likely duplicate of ${likelyDuplicate.id}; pass --duplicate-of ${likelyDuplicate.id} to preserve the relationship`);
  const receipt = intakeReceiptSchema.parse({
    receiptVersion: 1,
    id: lead.id,
    title: lead.title,
    kind: lead.kind,
    capturedAt: lead.capturedAt,
    capturedBy: lead.capturedBy,
    visibility: lead.visibility,
    publicSummary: lead.publicSummary,
    initialProjectIds: lead.projectIds,
    initialEntityIds: lead.entityIds,
    initialSourceIds: lead.sourceIds,
    publicUrl: lead.publicUrl,
    protectedLocatorId: lead.protectedLocatorId,
    duplicateOfLeadId: lead.duplicateOfLeadId
  });
  if (args.write === "true") appendFileSync(queuePath, `${JSON.stringify(receipt)}\n`);
  console.log(JSON.stringify(lead, null, 2));
} catch (error) {
  console.error(`Knowledge intake failed: ${error.message}`);
  process.exit(1);
}
