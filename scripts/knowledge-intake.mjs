#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { intakeRecordSchema } from "../apps/www/src/data/knowledge-bank/schema.ts";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  validateIntakeCandidateReferences,
  validateOperatorGraph
} from "./lib/knowledge-operator-validation.mjs";

const help = `Usage:
  npm run knowledge:intake -- --template
  npm run knowledge:intake -- --create <public-safe-record.json>
  npm run knowledge:intake -- --validate <public-safe-record.json>

Creates or validates a public-safe intake candidate. --create uses exclusive
creation and never edits canonical records. Validation never creates a claim or
public projection. After review, add the record to the canonical TypeScript
intake module with a normal code patch and run npm run check.
`;

const template = {
  id: "INT-PROJECT-SHORT-DESCRIPTION-YYYY-MM-DD",
  receivedAt: new Date().toISOString().slice(0, 10),
  kind: "claim-hypothesis",
  visibility: "public-safe",
  title: "Short public-safe title",
  description: "Describe the fragment without private paths, raw correspondence, or unsupported conclusions.",
  whyItMatters: "Explain the professional or historical question this may help answer.",
  projectIds: ["project-id"],
  status: "deferred",
  disposition: "deferred-with-reason",
  dispositionNote: "Awaiting source discovery and claim review; this record does not establish the proposed claim.",
  sourceIds: [],
  claimIds: [],
  inquiryIds: [],
  correctionIds: [],
  relatedIntakeIds: [],
  artifactPaths: [],
  boundaries: ["Do not promote this intake candidate directly to a public claim."]
};

const privateMarkers = [
  /\/Users\//i,
  /\/Volumes\//i,
  /Mobile Documents/i,
  /supporting-materials/i,
  /raw[-_ ]?transcript/i,
  /(?:password|api[_ -]?key|bearer token|private key)/i
];

function fail(message) {
  console.error(message);
  process.exit(1);
}

function validateCandidate(filePath) {
  const graphErrors = validateOperatorGraph();
  if (graphErrors.length) fail(`Canonical knowledge graph is invalid:\n${graphErrors.join("\n")}`);
  if (!existsSync(filePath)) fail(`Intake candidate does not exist: ${filePath}`);
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Intake candidate is not valid JSON: ${error.message}`);
  }

  const result = intakeRecordSchema.safeParse(parsed);
  if (!result.success) fail(result.error.issues.map((issue) => issue.message).join("\n"));
  if (result.data.visibility !== "public-safe") {
    fail("This public-repo command accepts only visibility=public-safe candidates.");
  }
  if (knowledgeBank.intake.some((record) => record.id === result.data.id)) {
    fail(`Intake ID already exists in canonical records: ${result.data.id}`);
  }
  const referenceErrors = validateIntakeCandidateReferences(result.data);
  if (referenceErrors.length) fail(referenceErrors.join("\n"));
  const serialized = JSON.stringify(result.data);
  for (const marker of privateMarkers) {
    if (marker.test(serialized)) fail(`Candidate contains a protected marker matched by ${marker}`);
  }
  console.log(`Valid public-safe intake candidate: ${result.data.id}`);
  console.log("No canonical record or public claim was created.");
}

const args = process.argv.slice(2);
if (!args.length || args.includes("--help") || args.includes("-h")) {
  console.log(help);
} else if (args[0] === "--template" && args.length === 1) {
  console.log(JSON.stringify(template, null, 2));
} else if (args[0] === "--create" && args.length === 2) {
  const filePath = path.resolve(args[1]);
  if (existsSync(filePath)) fail(`Refusing to overwrite existing file: ${filePath}`);
  writeFileSync(filePath, `${JSON.stringify(template, null, 2)}\n`, { flag: "wx" });
  console.log(`Created intake candidate template: ${filePath}`);
  console.log("The canonical knowledge bank was not modified.");
} else if (args[0] === "--validate" && args.length === 2) {
  validateCandidate(path.resolve(args[1]));
} else {
  fail(help);
}
