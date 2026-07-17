#!/usr/bin/env node

import { parseArgs } from "node:util";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { publicSourceView } from "./lib.mjs";

const { values } = parseArgs({
  options: {
    kind: { type: "string", default: "all" },
    type: { type: "string" },
    project: { type: "string" },
    maturity: { type: "string" },
    status: { type: "string" },
    source: { type: "string" },
    surface: { type: "string" },
    text: { type: "string" }
  },
  strict: true
});

const includes = (value, needle) => !needle || JSON.stringify(value).toLowerCase().includes(needle.toLowerCase());
const kinds = new Set(["all", "source", "claim", "task", "intake", "decision", "anti-claim"]);
const requestedKind = values.type ?? values.kind;
if (!kinds.has(requestedKind)) {
  console.error(`Knowledge query failed: unknown --type ${requestedKind}`);
  process.exit(1);
}

const output = {};
if (["all", "source"].includes(requestedKind)) {
  output.sources = knowledgeBank.sources
    .filter((source) => !values.source || source.id === values.source)
    .filter((source) => !values.status || source.visibility === values.status || source.preservationStatus === values.status)
    .filter((source) => includes(source, values.text))
    .map(publicSourceView);
}
if (["all", "claim"].includes(requestedKind)) {
  output.claims = knowledgeBank.claims
    .filter((claim) => !values.project || claim.project === values.project)
    .filter((claim) => !values.maturity || claim.maturity === values.maturity)
    .filter((claim) => !values.status || claim.status === values.status)
    .filter((claim) => !values.source || claim.evidence.some((evidence) => evidence.sourceId === values.source))
    .filter((claim) => !values.surface || claim.projections.some((projection) => projection.surfaces.includes(values.surface)))
    .filter((claim) => includes(claim, values.text));
}
if (["all", "task"].includes(requestedKind)) {
  output.tasks = knowledgeBank.researchTasks
    .filter((task) => !values.project || task.project === values.project)
    .filter((task) => !values.status || task.status === values.status)
    .filter((task) => !values.source || task.sourceIds.includes(values.source))
    .filter((task) => includes(task, values.text));
}
if (["all", "intake"].includes(requestedKind)) {
  output.intake = knowledgeBank.intake
    .filter((item) => !values.status || item.disposition === values.status)
    .filter((item) => !values.source || item.sourceIds.includes(values.source))
    .filter((item) => includes(item, values.text));
}
if (["all", "decision"].includes(requestedKind)) {
  output.decisions = knowledgeBank.projectionDecisions
    .filter((decision) => !values.status || decision.decision === values.status)
    .filter((decision) => !values.surface || decision.surface === values.surface)
    .filter((decision) => includes(decision, values.text));
}
if (["all", "anti-claim"].includes(requestedKind)) {
  output.antiClaims = knowledgeBank.claims
    .filter((claim) => !values.project || claim.project === values.project)
    .flatMap((claim) => claim.antiClaims.map((text) => ({ claimId: claim.id, project: claim.project, text })))
    .filter((item) => includes(item, values.text));
}

console.log(JSON.stringify(output, null, 2));
