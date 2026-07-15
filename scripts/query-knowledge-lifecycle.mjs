#!/usr/bin/env node

import { parseArgs } from "node:util";
import { retrieveKnowledgePalette } from "./lib/knowledge-palette.mjs";

const { values } = parseArgs({
  options: {
    brief: { type: "string" },
    project: { type: "string" },
    capability: { type: "string" },
    entity: { type: "string" },
    "from-year": { type: "string" },
    "to-year": { type: "string" },
    maturity: { type: "string" },
    confidence: { type: "string" },
    surface: { type: "string" },
    "proof-surface": { type: "string" },
    "publication-safe": { type: "boolean" },
    "evidence-role": { type: "string" },
    "source-kind": { type: "string" },
    "research-priority": { type: "string" },
    audience: { type: "string" },
    purpose: { type: "string" }
  }
});

const palette = retrieveKnowledgePalette({
  briefId: values.brief,
  projectId: values.project,
  capability: values.capability,
  entityId: values.entity,
  fromYear: values["from-year"] ? Number(values["from-year"]) : undefined,
  toYear: values["to-year"] ? Number(values["to-year"]) : undefined,
  maturity: values.maturity,
  confidence: values.confidence,
  surface: values.surface,
  proofSurface: values["proof-surface"],
  publicationSafe: values["publication-safe"],
  evidenceRole: values["evidence-role"],
  sourceKind: values["source-kind"],
  researchPriority: values["research-priority"],
  audienceTag: values.audience,
  purposeTag: values.purpose
});
console.log(JSON.stringify(palette, null, 2));
