#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { defaultIntakeLedger, readIntakeLedger } from "./intake-knowledge-lead.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const valueOptions = new Set([
  "--type", "--project", "--claim-type", "--epistemic", "--publication", "--selection",
  "--status", "--surface", "--source-visibility", "--confidence", "--from", "--to",
  "--q", "--limit", "--format", "--audience", "--purpose", "--ledger",
]);
const flagOptions = new Set(["--help"]);
const audienceSurfaces = {
  hiring: new Set(["homepage", "resume-html", "technical-operations", "work-card", "case-study"]),
  "public-sector": new Set(["case-study", "technical-operations", "archive-note"]),
  collaborator: new Set(["case-study", "archive-note"]),
  "photo-editor": new Set(["photo-caption", "archive-note"]),
};

function parseOptions(argv) {
  const values = new Map();
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (flagOptions.has(token)) {
      values.set(token, ["true"]);
      continue;
    }
    if (!valueOptions.has(token)) throw new Error(`Unknown option: ${token}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${token}`);
    values.set(token, [...(values.get(token) ?? []), value]);
    index += 1;
  }
  return { first: (name) => values.get(name)?.[0], all: (name) => values.get(name) ?? [], has: (name) => values.has(name) };
}

function recordDate(record) {
  return record.reviewedAt ?? record.receivedAt ?? record.publishedAt ?? record.runAt ?? record.decidedAt ?? null;
}

function summaries(ledgerPath) {
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const records = [];
  for (const item of readIntakeLedger(ledgerPath)) {
    records.push({ id: item.receiptId, type: "receipt", projectIds: item.projectIds, status: item.status, date: item.receivedAt, text: item.summary, sourceIds: [], claimIds: [], taskIds: item.researchTaskIds, surfaces: [] });
  }
  for (const item of knowledgeBank.captures) {
    records.push({ id: item.id, type: "capture", projectIds: item.potentialProjectIds, status: item.status, date: item.receivedAt, text: item.summary, sourceIds: item.sourceIds, claimIds: [], taskIds: item.researchTaskIds, surfaces: [] });
  }
  for (const item of knowledgeBank.sources) {
    records.push({ id: item.id, type: "source", projectIds: [], status: item.preservationStatus, visibility: item.visibility, date: recordDate(item), text: item.title, sourceIds: [item.id], claimIds: [], taskIds: [], surfaces: [] });
  }
  for (const item of knowledgeBank.observations) {
    records.push({ id: item.id, type: "observation", projectIds: [item.project], status: item.observationType, confidence: item.confidence, date: item.reviewedAt, text: item.statement, sourceIds: [item.sourceId], claimIds: item.supportsClaimIds, taskIds: [], surfaces: [] });
  }
  for (const item of knowledgeBank.claims) {
    records.push({
      id: item.id, type: "claim", projectIds: [item.project], status: item.status,
      claimType: item.claimType, epistemicState: item.epistemicState, publicationState: item.publicationState,
      selectionState: item.selectionState, date: item.reviewedAt, text: item.internalClaim,
      sourceIds: item.evidence.map((entry) => entry.sourceId), claimIds: [item.id], taskIds: item.researchTaskIds ?? [],
      surfaces: item.projections.flatMap((projection) => [projection.key, ...projection.surfaces]),
    });
  }
  for (const item of knowledgeBank.researchTasks) {
    records.push({ id: item.id, type: "task", projectIds: [item.project], status: item.status, date: item.reviewedAt, text: item.question, sourceIds: item.sourceIds, claimIds: item.claimIds, taskIds: [item.id], surfaces: [] });
  }
  for (const item of knowledgeBank.researchInquiries) {
    records.push({ id: item.id, type: "inquiry", projectIds: [item.project], status: item.resultStatus, date: item.runAt, text: item.question, sourceIds: item.sourceIds, claimIds: [], taskIds: [], surfaces: [] });
  }
  for (const item of knowledgeBank.corrections) {
    const claim = claimById.get(item.claimId);
    records.push({ id: item.id, type: "correction", projectIds: claim ? [claim.project] : [], status: item.status, date: item.decidedAt, text: `${item.previousText} -> ${item.replacementText}`, sourceIds: [], claimIds: [item.claimId], taskIds: [], surfaces: item.affectedSurfaces });
  }
  return records;
}

function matchesPurpose(record, purpose) {
  if (!purpose) return true;
  if (purpose === "public-projection") return record.type === "claim" && record.publicationState === "approved" && record.selectionState === "selected";
  if (purpose === "research") return ["receipt", "capture", "task", "inquiry"].includes(record.type);
  if (purpose === "corroboration") return record.type === "task" || (record.type === "claim" && record.taskIds.length > 0);
  if (purpose === "visual-evidence") return /photo|visual|image/i.test(record.text) || record.surfaces.includes("photo-caption");
  if (purpose === "application") return record.type === "claim" && record.surfaces.some((surface) => audienceSurfaces.hiring.has(surface));
  throw new Error(`Unknown purpose: ${purpose}`);
}

export function queryKnowledge(options, ledgerPath = defaultIntakeLedger) {
  const audience = options.first("--audience");
  if (audience && !audienceSurfaces[audience]) throw new Error(`Unknown audience: ${audience}`);
  const requestedTypes = new Set(options.all("--type"));
  const knownTypes = new Set(["receipt", "capture", "source", "observation", "claim", "task", "inquiry", "correction"]);
  for (const type of requestedTypes) if (!knownTypes.has(type)) throw new Error(`Unknown record type: ${type}`);
  const project = options.first("--project");
  const from = options.first("--from");
  const to = options.first("--to");
  const query = options.first("--q")?.toLowerCase();
  const audienceSet = audience ? audienceSurfaces[audience] : null;

  return summaries(ledgerPath)
    .filter((record) => !requestedTypes.size || requestedTypes.has(record.type))
    .filter((record) => !project || record.projectIds.includes(project))
    .filter((record) => !options.first("--claim-type") || record.claimType === options.first("--claim-type"))
    .filter((record) => !options.first("--epistemic") || record.epistemicState === options.first("--epistemic"))
    .filter((record) => !options.first("--publication") || record.publicationState === options.first("--publication"))
    .filter((record) => !options.first("--selection") || record.selectionState === options.first("--selection"))
    .filter((record) => !options.first("--status") || record.status === options.first("--status"))
    .filter((record) => !options.first("--surface") || record.surfaces.includes(options.first("--surface")))
    .filter((record) => !options.first("--source-visibility") || record.visibility === options.first("--source-visibility"))
    .filter((record) => !options.first("--confidence") || record.confidence === options.first("--confidence"))
    .filter((record) => !from || (record.date && record.date >= from))
    .filter((record) => !to || (record.date && record.date <= to))
    .filter((record) => !query || JSON.stringify(record).toLowerCase().includes(query))
    .filter((record) => !audienceSet || record.surfaces.some((surface) => audienceSet.has(surface)))
    .filter((record) => matchesPurpose(record, options.first("--purpose")))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function help() {
  return `Usage: node scripts/query-knowledge-lifecycle.mjs [filters]\n\n` +
    `Filters: --type --project --claim-type --epistemic --publication --selection --status\n` +
    `         --surface --source-visibility --confidence --from --to --q\n` +
    `         --audience hiring|public-sector|collaborator|photo-editor\n` +
    `         --purpose public-projection|research|corroboration|visual-evidence|application\n` +
    `Output:  --limit N --format json|jsonl|table\n`;
}

export function runQuery(argv = process.argv.slice(2)) {
  const options = parseOptions(argv);
  if (options.has("--help")) {
    process.stdout.write(help());
    return 0;
  }
  const ledgerPath = path.resolve(options.first("--ledger") ?? defaultIntakeLedger);
  const limit = Number(options.first("--limit") ?? 50);
  if (!Number.isInteger(limit) || limit < 1 || limit > 1000) throw new Error("--limit must be an integer from 1 to 1000");
  const format = options.first("--format") ?? "json";
  if (!["json", "jsonl", "table"].includes(format)) throw new Error(`Unknown format: ${format}`);
  const allResults = queryKnowledge(options, ledgerPath);
  const results = allResults.slice(0, limit);
  const output = { count: allResults.length, returned: results.length, truncated: allResults.length > results.length, results };
  if (format === "json") process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  if (format === "jsonl") results.forEach((record) => process.stdout.write(`${JSON.stringify(record)}\n`));
  if (format === "table") {
    process.stdout.write("TYPE\tID\tPROJECT\tSTATUS\tTEXT\n");
    results.forEach((record) => process.stdout.write(`${record.type}\t${record.id}\t${record.projectIds.join(",")}\t${record.status ?? ""}\t${record.text.replaceAll("\t", " ")}\n`));
  }
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = runQuery();
  } catch (error) {
    console.error(`Knowledge query failed: ${error.message}`);
    process.exitCode = 1;
  }
}
