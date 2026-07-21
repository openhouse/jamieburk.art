#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import {
  appendKnowledgeEvent,
  parseKnowledgeHistory,
  validateKnowledgeEvent
} from "./lib/knowledge-history.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultHistoryPath = "docs/knowledge-bank/lifecycle/history.jsonl";

try {
  const { values } = parseArgs({
    options: {
      id: { type: "string" },
      type: { type: "string" },
      subject: { type: "string" },
      summary: { type: "string" },
      actor: { type: "string" },
      date: { type: "string" },
      visibility: { type: "string", default: "public-safe" },
      locator: { type: "string" },
      supersedes: { type: "string" },
      disposition: { type: "string" },
      reason: { type: "string" },
      history: { type: "string", default: defaultHistoryPath },
      write: { type: "boolean", default: false }
    },
    strict: true
  });

  for (const key of ["id", "type", "subject", "summary"]) {
    if (!values[key]) throw new Error(`Missing --${key}`);
  }

  const event = {
    version: 1,
    id: values.id,
    type: values.type,
    occurredAt: values.date ?? new Date().toISOString().slice(0, 10),
    actor: values.actor ?? "Jamie Burkart",
    subjectId: values.subject,
    summary: values.summary,
    visibility: values.visibility,
    ...(values.locator ? { protectedLocatorId: values.locator } : {}),
    ...(values.supersedes ? { supersedesEventId: values.supersedes } : {}),
    ...(values.disposition ? { disposition: values.disposition } : {}),
    ...(values.reason ? { reason: values.reason } : {})
  };

  const findings = validateKnowledgeEvent(event);
  if (findings.length) throw new Error(findings.join("; "));
  const historyPath = path.resolve(repoRoot, values.history);
  const existingText = existsSync(historyPath) ? readFileSync(historyPath, "utf8") : "";
  const existing = parseKnowledgeHistory(existingText);
  if (existing.findings.length) throw new Error(existing.findings.join("; "));
  if (existing.events.some((item) => item.id === event.id)) throw new Error(`Duplicate event ID ${event.id}`);
  if (event.supersedesEventId && !existing.events.some((item) => item.id === event.supersedesEventId)) {
    throw new Error(`Unknown superseded event ${event.supersedesEventId}`);
  }
  if (values.write) appendKnowledgeEvent(historyPath, event);
  console.log(JSON.stringify({ mode: values.write ? "written" : "dry-run", history: values.history, event }, null, 2));
} catch (error) {
  console.error(`Knowledge event failed: ${error.message}`);
  process.exit(1);
}
