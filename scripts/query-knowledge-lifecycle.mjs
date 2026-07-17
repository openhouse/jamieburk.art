#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { parseKnowledgeHistory, publicKnowledgeEvent } from "./lib/knowledge-history.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({
  options: {
    source: { type: "string" },
    claim: { type: "string" },
    project: { type: "string" },
    surface: { type: "string" },
    intake: { type: "string" },
    "history-id": { type: "string" }
  },
  strict: true
});

if (!Object.values(values).some(Boolean)) {
  console.error("Use --source, --claim, --project, --surface, --intake, or --history-id");
  process.exit(1);
}

function safeSource(source) {
  return {
    id: source.id,
    title: source.title,
    organization: source.organization,
    author: source.author,
    kind: source.kind,
    visibility: source.visibility,
    preservationStatus: source.preservationStatus,
    publicCitation: source.publicCitation,
    publicUrls: source.visibility === "public"
      ? [source.canonicalUrl, source.archiveUrl, source.assetUrl].filter(Boolean)
      : [],
    projectIds: source.projectIds,
    intakeIds: source.intakeIds,
    reviewStatus: source.reviewStatus,
    reviewDepth: source.reviewDepth,
    supportsGenerally: source.supportsGenerally,
    doesNotEstablish: source.doesNotEstablish
  };
}

function safeClaim(claim) {
  return {
    id: claim.id,
    project: claim.project,
    claimType: claim.claimType,
    status: claim.status,
    publicationStatus: claim.publicationStatus,
    editorialStatus: claim.editorialStatus,
    publicProjections: claim.projections.filter((projection) => projection.status === "active"),
    evidence: claim.evidence.map(({ sourceId, relationship, supports, confidence, renderCitation }) => ({
      sourceId,
      relationship,
      supports,
      confidence,
      renderCitation
    })),
    boundaries: claim.boundaries,
    antiClaims: claim.antiClaims,
    researchInquiryIds: claim.researchInquiryIds
  };
}

function safeIntake(item) {
  const { protectedLocatorId: _protectedLocatorId, ...safe } = item;
  return safe;
}

const historyPath = path.join(repoRoot, "docs/knowledge-bank/lifecycle/history.jsonl");
const history = existsSync(historyPath)
  ? parseKnowledgeHistory(readFileSync(historyPath, "utf8"))
  : { events: [], findings: [] };
if (history.findings.length) {
  console.error(history.findings.join("\n"));
  process.exit(1);
}

const result = {
  query: values,
  projects: [],
  intakeItems: [],
  sources: [],
  claims: [],
  pages: [],
  historyEvents: []
};

if (values.source) {
  result.sources = knowledgeBank.sources.filter((source) => source.id === values.source).map(safeSource);
  result.claims = knowledgeBank.claims.filter((claim) => claim.evidence.some((evidence) => evidence.sourceId === values.source)).map(safeClaim);
}
if (values.claim) {
  const claims = knowledgeBank.claims.filter((claim) => claim.id === values.claim);
  result.claims = claims.map(safeClaim);
  const sourceIds = new Set(claims.flatMap((claim) => claim.evidence.map((evidence) => evidence.sourceId)));
  result.sources = knowledgeBank.sources.filter((source) => sourceIds.has(source.id)).map(safeSource);
}
if (values.project) {
  result.projects = knowledgeBank.projects.filter((project) => project.id === values.project);
  result.intakeItems = knowledgeBank.intakeItems.filter((item) => item.projectIds.includes(values.project)).map(safeIntake);
  result.sources = knowledgeBank.sources.filter((source) => source.projectIds.includes(values.project)).map(safeSource);
  result.claims = knowledgeBank.claims.filter((claim) => claim.project === values.project).map(safeClaim);
}
if (values.surface) {
  result.pages = knowledgeBank.pages.filter((page) => page.surface === values.surface);
  const claimIds = new Set(result.pages.flatMap((page) => page.occurrences.map((occurrence) => occurrence.claimId)));
  result.claims = knowledgeBank.claims.filter((claim) => claimIds.has(claim.id)).map(safeClaim);
  const sourceIds = new Set(result.pages.flatMap((page) => page.sourceOrder));
  result.sources = knowledgeBank.sources.filter((source) => sourceIds.has(source.id)).map(safeSource);
}
if (values.intake) {
  const items = knowledgeBank.intakeItems.filter((item) => item.id === values.intake);
  result.intakeItems = items.map(safeIntake);
  const sourceIds = new Set(items.flatMap((item) => item.sourceIds));
  const claimIds = new Set(items.flatMap((item) => item.claimIds));
  result.sources = knowledgeBank.sources.filter((source) => sourceIds.has(source.id)).map(safeSource);
  result.claims = knowledgeBank.claims.filter((claim) => claimIds.has(claim.id)).map(safeClaim);
}
if (values["history-id"]) {
  result.historyEvents = history.events.filter((event) => event.id === values["history-id"]).map(publicKnowledgeEvent);
}

const resultCount = Object.entries(result)
  .filter(([key]) => key !== "query")
  .reduce((total, [, records]) => total + records.length, 0);
if (!resultCount) {
  console.error("No matching public-safe knowledge records found.");
  process.exit(1);
}

console.log(JSON.stringify(result, null, 2));
