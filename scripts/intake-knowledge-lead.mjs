#!/usr/bin/env node

import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { intakeItemSchema } from "../apps/www/src/data/knowledge-bank/schema.ts";

const privateMarker = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|credential|password|authenticated export/i;

function slug(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 56);
}

export function buildIntakeLead(values) {
  const required = ["title", "summary", "project", "kind"];
  for (const key of required) if (!values[key]) throw new Error(`Missing --${key}`);
  if (privateMarker.test(`${values.title} ${values.summary} ${values.url ?? ""}`)) {
    throw new Error("Intake contains a private-path or protected-source marker");
  }
  const knownProjects = new Set([
    ...knowledgeBank.claims.map(({ project }) => project),
    ...knowledgeBank.researchTasks.map(({ project }) => project),
    ...knowledgeBank.intake.flatMap(({ projects }) => projects)
  ]);
  if (!knownProjects.has(values.project)) throw new Error(`Unknown project: ${values.project}`);
  const date = values.date ?? new Date().toISOString().slice(0, 10);
  const id = values.id ?? `INT-${date.replaceAll("-", "")}-${slug(values.title)}`;
  if (knowledgeBank.intake.some((item) => item.id === id)) throw new Error(`Intake ID already exists: ${id}`);
  if (values.url && knowledgeBank.sources.some((source) => [source.canonicalUrl, source.archiveUrl, source.assetUrl].includes(values.url))) {
    throw new Error("URL already exists in the canonical source bank; associate the existing source instead");
  }
  return intakeItemSchema.parse({
    id,
    kind: values.kind,
    capturedAt: date,
    capturedFrom: values.from ?? "Public-safe future-agent intake",
    publicSafeSummary: values.summary,
    publicUrl: values.url,
    projects: [values.project],
    status: "captured",
    disposition: "research-queued",
    sourceIds: [],
    claimIds: [],
    researchTaskIds: [],
    notes: ["Queue receipt only. Canonical integration still requires source decomposition, claim review, and explicit disposition."],
    reviewedAt: date,
    reviewedBy: [values.by ?? "Future knowledge-bank agent"]
  });
}

export function readQueue(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8").split("\n").filter(Boolean).map((line) => intakeItemSchema.parse(JSON.parse(line)));
}

export function appendUnique(path, lead) {
  const existing = readQueue(path);
  if (existing.some(({ id }) => id === lead.id)) throw new Error(`Queue already contains ${lead.id}`);
  if (lead.publicUrl && existing.some(({ publicUrl }) => publicUrl === lead.publicUrl)) throw new Error("Queue already contains this public URL");
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(lead)}\n`);
}

function run() {
  try {
    const { values } = parseArgs({
      options: {
        id: { type: "string" }, title: { type: "string" }, summary: { type: "string" },
        project: { type: "string" }, kind: { type: "string" }, date: { type: "string" },
        from: { type: "string" }, by: { type: "string" }, url: { type: "string" },
        queue: { type: "string", default: "reports/generated/knowledge-intake.jsonl" },
        write: { type: "boolean", default: false }
      }
    });
    const lead = buildIntakeLead(values);
    if (values.write) appendUnique(values.queue, lead);
    console.log(JSON.stringify({ mode: values.write ? "written" : "preview", queue: values.queue, lead }, null, 2));
  } catch (error) {
    console.error(`Knowledge intake failed: ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
