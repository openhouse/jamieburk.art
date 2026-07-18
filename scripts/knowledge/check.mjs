#!/usr/bin/env node

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { defaultRepoRoot } from "../evals/lib/knowledge-lifecycle.mjs";
import { assertPublicSafeText, readJsonLines } from "./lib.mjs";

const failures = [];
const receipts = readJsonLines(defaultRepoRoot);
const knownEntities = new Set(knowledgeBank.entities.map((entity) => entity.id));
const knownReceiptIds = new Set(receipts.map((receipt) => receipt.id));

for (const receipt of receipts) {
  try {
    assertPublicSafeText(JSON.stringify(receipt), receipt.id ?? "receipt");
  } catch (error) {
    failures.push(error.message);
  }
  if (receipt.receiptVersion !== 1 || receipt.status !== "queued") failures.push(`${receipt.id} has an invalid receipt contract`);
  if (!receipt.id || !receipt.receivedAt || !receipt.kind || !receipt.publicSafeSummary || !receipt.submittedBy) {
    failures.push(`${receipt.id ?? "unknown receipt"} is missing required fields`);
  }
  for (const entityId of receipt.entityIds ?? []) if (!knownEntities.has(entityId)) failures.push(`${receipt.id} references unknown entity ${entityId}`);
  if (receipt.duplicateOfReceiptId && !knownReceiptIds.has(receipt.duplicateOfReceiptId)) failures.push(`${receipt.id} has unknown duplicate target`);
  if (receipt.publicUrl) {
    try {
      if (!/^https?:$/.test(new URL(receipt.publicUrl).protocol)) failures.push(`${receipt.id} has a malformed public URL`);
    } catch {
      failures.push(`${receipt.id} has a malformed public URL`);
    }
  }
}

const duplicates = receipts.map((receipt) => receipt.id).filter((id, index, values) => values.indexOf(id) !== index);
for (const id of new Set(duplicates)) failures.push(`Duplicate receipt ID: ${id}`);

if (receipts.length) failures.push(`${receipts.length} queued receipt(s) require canonical disposition`);

if (failures.length) {
  console.error("Knowledge operations check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Knowledge operations check passed: no unsafe or undispositioned intake receipts.");

