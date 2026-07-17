#!/usr/bin/env node

import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const defaultIntakeLedger = path.join(
  repoRoot,
  "docs/knowledge-bank/data/intake-ledger.jsonl",
);

const kinds = new Set(["url", "memory", "artifact", "metric", "photo-lead", "correction"]);
const publicSafetyStates = new Set(["public-safe", "protected-pointer"]);
const statuses = new Set(["untriaged", "triaged", "researching", "integrated", "closed"]);
const valueOptions = new Set([
  "--kind",
  "--summary",
  "--project",
  "--claim-family",
  "--submitted-by",
  "--public-safety",
  "--source-url",
  "--capture-id",
  "--research-task",
  "--status",
  "--disposition",
  "--received-at",
  "--ledger",
]);
const flagOptions = new Set(["--dry-run", "--json", "--help"]);
const unsafePayloadPattern =
  /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw-otter|otter(?:\.ai|_ai)|\.docx\b|\.xlsx\b|-----BEGIN|\b(?:sk-proj-|ghp_|AKIA)[A-Za-z0-9_-]+/i;

function optionValues(argv) {
  const values = new Map();
  const flags = new Set();

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (flagOptions.has(token)) {
      flags.add(token);
      continue;
    }
    if (!valueOptions.has(token)) throw new Error(`Unknown option: ${token}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${token}`);
    const items = values.get(token) ?? [];
    items.push(value);
    values.set(token, items);
    index += 1;
  }

  return {
    flags,
    first: (name) => values.get(name)?.[0],
    all: (name) => values.get(name) ?? [],
  };
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizedUrl(value) {
  if (!value) return undefined;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Source URL must use HTTP(S)");
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
  return url.toString();
}

function slug(value) {
  return value
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 36)
    .toUpperCase();
}

export function readIntakeLedger(ledgerPath = defaultIntakeLedger) {
  if (!existsSync(ledgerPath)) return [];
  return readFileSync(ledgerPath, "utf8")
    .split("\n")
    .filter((line) => line.trim())
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`Invalid JSONL at ${ledgerPath}:${index + 1}: ${error.message}`);
      }
    });
}

export function validateIntakeReceipts(receipts) {
  const errors = [];
  const receiptIds = new Set();
  const captureIds = new Set(knowledgeBank.captures.map((item) => item.id));
  const taskIds = new Set(knowledgeBank.researchTasks.map((item) => item.id));
  const projectIds = new Set([
    ...knowledgeBank.observations.map((item) => item.project),
    ...knowledgeBank.claims.map((item) => item.project),
    ...knowledgeBank.researchTasks.map((item) => item.project),
    ...knowledgeBank.captures.flatMap((item) => item.potentialProjectIds),
  ]);

  receipts.forEach((receipt, index) => {
    const label = `receipt[${index}]`;
    if (!/^INTAKE-[A-Z0-9-]+$/.test(receipt.receiptId ?? "")) errors.push(`${label} has an invalid receiptId`);
    if (receiptIds.has(receipt.receiptId)) errors.push(`${label} duplicates receiptId ${receipt.receiptId}`);
    receiptIds.add(receipt.receiptId);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(receipt.receivedAt ?? "")) errors.push(`${label} has an invalid receivedAt`);
    if (!receipt.submittedBy?.trim()) errors.push(`${label} is missing submittedBy`);
    if (!kinds.has(receipt.kind)) errors.push(`${label} has an invalid kind`);
    if (!receipt.summary?.trim()) errors.push(`${label} is missing summary`);
    if (!publicSafetyStates.has(receipt.publicSafety)) errors.push(`${label} has an invalid publicSafety`);
    if (!statuses.has(receipt.status)) errors.push(`${label} has an invalid status`);
    if (!receipt.disposition?.trim()) errors.push(`${label} is missing disposition`);
    if (!Array.isArray(receipt.projectIds) || !receipt.projectIds.length) errors.push(`${label} needs projectIds`);
    if (!Array.isArray(receipt.claimFamilies) || !receipt.claimFamilies.length) errors.push(`${label} needs claimFamilies`);
    if (!Array.isArray(receipt.researchTaskIds)) errors.push(`${label} needs researchTaskIds`);
    for (const projectId of receipt.projectIds ?? []) {
      if (!projectIds.has(projectId)) errors.push(`${label} references unknown project ${projectId}`);
    }
    for (const taskId of receipt.researchTaskIds ?? []) {
      if (!taskIds.has(taskId)) errors.push(`${label} references unknown task ${taskId}`);
    }
    if (receipt.canonicalCaptureId && !captureIds.has(receipt.canonicalCaptureId)) {
      errors.push(`${label} references unknown capture ${receipt.canonicalCaptureId}`);
    }
    if (!receipt.canonicalCaptureId && !(receipt.researchTaskIds ?? []).length) {
      errors.push(`${label} is not routed to a capture or research task`);
    }
    if (receipt.publicSafety === "protected-pointer" && receipt.sourceUrl) {
      errors.push(`${label} exposes sourceUrl for a protected pointer`);
    }
    if (receipt.sourceUrl) {
      try {
        normalizedUrl(receipt.sourceUrl);
      } catch (error) {
        errors.push(`${label}: ${error.message}`);
      }
    }
    if (unsafePayloadPattern.test(JSON.stringify(receipt))) errors.push(`${label} contains a private locator or secret marker`);
  });

  return errors;
}

function findDuplicate(receipt, receipts) {
  const sourceUrl = receipt.sourceUrl ? normalizedUrl(receipt.sourceUrl) : undefined;
  return receipts.find((candidate) => {
    if (sourceUrl && candidate.sourceUrl) return normalizedUrl(candidate.sourceUrl) === sourceUrl;
    return candidate.kind === receipt.kind && normalize(candidate.summary) === normalize(receipt.summary);
  });
}

export function buildReceipt(input, existingReceipts = []) {
  const receivedAt = input.receivedAt ?? new Date().toISOString().slice(0, 10);
  const sourceUrl = input.sourceUrl ? normalizedUrl(input.sourceUrl) : undefined;
  const digest = createHash("sha256")
    .update(`${input.kind}|${sourceUrl ?? normalize(input.summary)}`)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase();
  const projectToken = slug(input.projectIds[0]);
  const receipt = {
    receiptId: `INTAKE-${receivedAt.replaceAll("-", "")}-${projectToken}-${digest}`,
    receivedAt,
    submittedBy: input.submittedBy,
    kind: input.kind,
    summary: input.summary.trim(),
    ...(sourceUrl ? { sourceUrl } : {}),
    publicSafety: input.publicSafety,
    projectIds: [...new Set(input.projectIds)],
    claimFamilies: [...new Set(input.claimFamilies)],
    status: input.status,
    ...(input.canonicalCaptureId ? { canonicalCaptureId: input.canonicalCaptureId } : {}),
    researchTaskIds: [...new Set(input.researchTaskIds)],
    disposition: input.disposition.trim(),
  };
  const duplicate = findDuplicate(receipt, existingReceipts);
  return { receipt, duplicate };
}

export function appendReceipt(receipt, ledgerPath = defaultIntakeLedger) {
  const current = existsSync(ledgerPath) ? readFileSync(ledgerPath, "utf8") : "";
  const prefix = current && !current.endsWith("\n") ? "\n" : "";
  appendFileSync(ledgerPath, `${prefix}${JSON.stringify(receipt)}\n`, { encoding: "utf8", flag: "a" });
}

function help() {
  return `Usage: node scripts/intake-knowledge-lead.mjs [options]\n\n` +
    `Required: --kind --summary --project --claim-family --submitted-by --public-safety --status --disposition\n` +
    `Routing:  --capture-id or one or more --research-task\n` +
    `Repeat:   --project --claim-family --research-task\n` +
    `Optional: --source-url --received-at --ledger --dry-run --json\n`;
}

export function runIntake(argv = process.argv.slice(2)) {
  const options = optionValues(argv);
  if (options.flags.has("--help")) {
    process.stdout.write(help());
    return 0;
  }
  const required = ["--kind", "--summary", "--project", "--claim-family", "--submitted-by", "--public-safety", "--status", "--disposition"];
  for (const name of required) if (!options.first(name)) throw new Error(`Missing required option: ${name}`);
  const ledgerPath = path.resolve(options.first("--ledger") ?? defaultIntakeLedger);
  const existing = readIntakeLedger(ledgerPath);
  const existingErrors = validateIntakeReceipts(existing);
  if (existingErrors.length) throw new Error(existingErrors.join("\n"));
  const { receipt, duplicate } = buildReceipt(
    {
      kind: options.first("--kind"),
      summary: options.first("--summary"),
      projectIds: options.all("--project"),
      claimFamilies: options.all("--claim-family"),
      submittedBy: options.first("--submitted-by"),
      publicSafety: options.first("--public-safety"),
      sourceUrl: options.first("--source-url"),
      canonicalCaptureId: options.first("--capture-id"),
      researchTaskIds: options.all("--research-task"),
      status: options.first("--status"),
      disposition: options.first("--disposition"),
      receivedAt: options.first("--received-at"),
    },
    existing,
  );
  if (duplicate) {
    const result = { status: "duplicate", duplicateOf: duplicate.receiptId, receipt };
    process.stdout.write(`${options.flags.has("--json") ? JSON.stringify(result, null, 2) : `Duplicate of ${duplicate.receiptId}`}\n`);
    return 2;
  }
  const errors = validateIntakeReceipts([...existing, receipt]);
  if (errors.length) throw new Error(errors.join("\n"));
  if (!options.flags.has("--dry-run")) appendReceipt(receipt, ledgerPath);
  const result = { status: options.flags.has("--dry-run") ? "dry-run" : "appended", ledger: path.relative(repoRoot, ledgerPath), receipt };
  process.stdout.write(`${options.flags.has("--json") ? JSON.stringify(result, null, 2) : `${result.status}: ${receipt.receiptId}`}\n`);
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = runIntake();
  } catch (error) {
    console.error(`Knowledge intake failed: ${error.message}`);
    process.exitCode = 1;
  }
}
