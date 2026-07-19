#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const operatorLedger = JSON.parse(
  readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/operator-intake-M.json"),
    "utf8"
  )
);

function parseArgs(argv) {
  const args = { type: "all" };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2).replace(/-([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${token}`);
    args[key] = value;
    index += 1;
  }
  return args;
}

function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(
        ([key]) =>
          !["protectedLocatorId", "internalExcerpt", "locator"].includes(key)
      )
      .map(([key, nested]) => [key, redact(nested)])
  );
}

const args = parseArgs(process.argv.slice(2));
const collections = {
  sources: knowledgeBank.sources,
  claims: knowledgeBank.claims,
  candidates: knowledgeBank.candidateClaims,
  inquiries: knowledgeBank.researchInquiries,
  intakes: [...knowledgeBank.intakeItems, ...operatorLedger.items],
  promotions: knowledgeBank.promotions,
  discovery: knowledgeBank.discoveryNotes
};

if (args.type !== "all" && !collections[args.type]) {
  throw new Error(`Unknown --type. Use ${Object.keys(collections).join(", ")}, or all.`);
}

const selected =
  args.type === "all"
    ? Object.entries(collections).flatMap(([type, items]) =>
        items.map((item) => ({ type, ...item }))
      )
    : collections[args.type];

const matches = selected.filter((item) => {
  if (args.project && item.project !== args.project && !item.projectHints?.includes(args.project)) return false;
  if (args.source && item.id !== args.source && item.sourceId !== args.source && !item.sourceIds?.includes(args.source)) return false;
  if (args.candidateStatus && item.status !== args.candidateStatus) return false;
  if (args.claimStatus && item.status !== args.claimStatus) return false;
  if (args.visibility && item.visibility !== args.visibility) return false;
  if (args.relationship && !item.evidence?.some((entry) => entry.relationship === args.relationship)) return false;
  if (args.openInquiry === "true" && !["not-recovered", "partially-recovered", "inconclusive"].includes(item.resultStatus)) return false;
  if (args.rights && item.media?.publicDisplayStatus !== args.rights && item.rightsReviewRequired?.toString() !== args.rights) return false;
  if (args.surface && !item.projections?.some((projection) => projection.surfaces.includes(args.surface))) return false;
  if (args.staleBefore && (!item.reviewedAt || item.reviewedAt >= args.staleBefore)) return false;
  return true;
});

console.log(JSON.stringify(redact(matches), null, 2));
