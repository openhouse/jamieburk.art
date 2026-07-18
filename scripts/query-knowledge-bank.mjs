#!/usr/bin/env node

import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

function includesText(value, text) {
  return JSON.stringify(value).toLowerCase().includes(text.toLowerCase());
}

export function queryKnowledgeBank(filters) {
  if (!filters.project && !filters.text && !filters.maturity && !filters.status && !filters.sourceKind) {
    throw new Error("Provide at least one bounded filter: --project, --text, --maturity, --status, or --source-kind");
  }
  let claims = knowledgeBank.claims.filter((claim) =>
    (!filters.project || claim.project === filters.project) &&
    (!filters.text || includesText(claim, filters.text)) &&
    (!filters.maturity || claim.maturity === filters.maturity) &&
    (!filters.status || claim.status === filters.status) &&
    (!filters.publicationSafe || claim.projectionEligibility === "eligible")
  );
  const claimIds = new Set(claims.map(({ id }) => id));
  const sourceIds = new Set(claims.flatMap(({ evidence }) => evidence.map(({ sourceId }) => sourceId)));
  let sources = knowledgeBank.sources.filter((source) =>
    (!filters.sourceKind || source.kind === filters.sourceKind) &&
    (!filters.text || includesText(source, filters.text)) &&
    (!filters.publicationSafe || source.visibility === "public") &&
    (!claimIds.size || sourceIds.has(source.id))
  );
  const tasks = knowledgeBank.researchTasks.filter((task) =>
    (!filters.project || task.project === filters.project) &&
    (!filters.text || includesText(task, filters.text)) &&
    (!claimIds.size || task.claimIds.some((id) => claimIds.has(id)))
  );
  if (filters.limit) {
    claims = claims.slice(0, filters.limit);
    sources = sources.slice(0, filters.limit);
  }
  return {
    filters,
    counts: { claims: claims.length, sources: sources.length, researchTasks: tasks.length },
    claims: claims.map(({ id, project, internalClaim, status, maturity, projectionEligibility, boundaries, antiClaims }) => ({ id, project, internalClaim, status, maturity, projectionEligibility, boundaries, antiClaims })),
    sources: sources.map(({ id, title, organization, author, kind, visibility, publishedAt, canonicalUrl, archiveUrl, publicCitation, doesNotEstablish }) => ({ id, title, organization, author, kind, visibility, publishedAt, canonicalUrl, archiveUrl, publicCitation, doesNotEstablish })),
    researchTasks: filters.publicationSafe ? [] : tasks.map(({ id, project, question, priority, status, publicSummary }) => ({ id, project, question, priority, status, publicSummary }))
  };
}

function run() {
  try {
    const { values } = parseArgs({
      options: {
        project: { type: "string" }, text: { type: "string" }, maturity: { type: "string" },
        status: { type: "string" }, "source-kind": { type: "string" },
        "publication-safe": { type: "boolean", default: false }, limit: { type: "string" }
      }
    });
    console.log(JSON.stringify(queryKnowledgeBank({
      project: values.project,
      text: values.text,
      maturity: values.maturity,
      status: values.status,
      sourceKind: values["source-kind"],
      publicationSafe: values["publication-safe"],
      limit: values.limit ? Number(values.limit) : undefined
    }), null, 2));
  } catch (error) {
    console.error(`Knowledge query failed: ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
