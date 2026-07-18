#!/usr/bin/env node

import { randomUUID } from "node:crypto";
import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  assertPublicSafeText,
  intakeQueuePath,
  readJsonLines,
  stableId
} from "./lib.mjs";

const { values } = parseArgs({
  options: {
    id: { type: "string" },
    kind: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    summary: { type: "string" },
    entity: { type: "string", multiple: true },
    url: { type: "string" },
    by: { type: "string" },
    date: { type: "string" },
    "duplicate-of": { type: "string" },
    write: { type: "boolean", default: false }
  },
  strict: true
});

const allowedKinds = new Set([
  "public-url",
  "artifact-description",
  "public-memory",
  "correction",
  "source-lead",
  "photo-observation"
]);

try {
  const kind = values.kind ?? "source-lead";
  if (!allowedKinds.has(kind)) throw new Error(`Unknown intake kind: ${kind}`);
  const summary = values.description ?? values.summary;
  if (!summary) throw new Error("Missing --description or --summary");
  assertPublicSafeText(values.title ?? "", "title");
  assertPublicSafeText(summary, "description");
  assertPublicSafeText(values.by ?? "", "submitter");
  if (values.url) {
    const parsed = new URL(values.url);
    if (!/^https?:$/.test(parsed.protocol)) throw new Error("--url must use HTTP(S)");
  }
  if (kind === "public-url" && !values.url) throw new Error("public-url intake requires --url");
  if (kind !== "public-url" && values.url) throw new Error("Only public-url intake may include --url");

  const entityIds = values.entity ?? [];
  const knownEntities = new Set(knowledgeBank.entities.map((entity) => entity.id));
  for (const id of entityIds) if (!knownEntities.has(id)) throw new Error(`Unknown entity: ${id}`);

  const receivedAt = values.date ?? new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(receivedAt)) throw new Error("--date must be YYYY-MM-DD");
  const idBasis = values.title ?? summary;
  const id = values.id ?? `RECEIPT-${receivedAt}-${randomUUID().slice(0, 8)}-${stableId(idBasis).slice(0, 32)}`;
  if (!/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(id)) throw new Error("--id must be a stable hyphenated ID");

  const repoRoot = process.cwd();
  const existing = readJsonLines(repoRoot);
  if (existing.some((receipt) => receipt.id === id)) throw new Error(`Duplicate receipt ID: ${id}`);
  if (values["duplicate-of"] && !existing.some((receipt) => receipt.id === values["duplicate-of"])) {
    throw new Error(`Unknown duplicate receipt: ${values["duplicate-of"]}`);
  }
  const likelyDuplicate = existing.find((receipt) =>
    values.url ? receipt.publicUrl === values.url : receipt.publicSafeSummary === summary
  );
  if (likelyDuplicate && values["duplicate-of"] !== likelyDuplicate.id) {
    throw new Error(`Likely duplicate of ${likelyDuplicate.id}; preserve that relation with --duplicate-of`);
  }

  const receipt = {
    receiptVersion: 1,
    id,
    receivedAt,
    kind,
    title: values.title,
    publicSafeSummary: summary,
    submittedBy: values.by ?? "Jamie Burkart",
    entityIds,
    publicUrl: values.url,
    duplicateOfReceiptId: values["duplicate-of"],
    status: "queued",
    nextAction: "Create or link a canonical intake record, then remove this receipt in the same reviewed change."
  };

  if (values.write) {
    const absolute = path.join(repoRoot, intakeQueuePath);
    mkdirSync(path.dirname(absolute), { recursive: true });
    appendFileSync(absolute, `${JSON.stringify(receipt)}\n`);
  }
  console.log(JSON.stringify({ mode: values.write ? "written" : "dry-run", receipt }, null, 2));
} catch (error) {
  console.error(`Knowledge intake failed: ${error.message}`);
  process.exit(1);
}
