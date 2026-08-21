#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildOpportunityDigest, deliverDigest } from "./nyc-jobs-lib.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const digestPath = path.join(repoRoot, "reports/opportunities/nyc-jobs-digest.md");
const reportPath = path.join(repoRoot, "reports/opportunities/nyc-jobs-qualified.json");

async function main() {
  readFileSync(digestPath, "utf8");
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const asOf = process.env.OPPORTUNITY_DIGEST_DATE ?? new Date().toISOString().slice(0, 10);
  const opportunities = report.actionable.filter(
    (opportunity) => !opportunity.postedUntil || opportunity.postedUntil >= asOf
  );
  const digest = buildOpportunityDigest({
    asOf,
    sourceUpdatedAt: report.datasetRowsUpdatedAt,
    opportunities
  });
  const result = await deliverDigest({
    digest,
    appEnv: process.env.APP_ENV ?? "development",
    delivery: process.env.OPPORTUNITY_DIGEST_DELIVERY ?? "dry-run",
    apiKey: process.env.RESEND_API_KEY ?? "",
    from: process.env.OPPORTUNITY_DIGEST_FROM ?? "",
    to: process.env.OPPORTUNITY_DIGEST_TO ?? ""
  });
  console.log(JSON.stringify({ ...result, actionableCount: opportunities.length, digestDate: asOf }, null, 2));
  if (result.mode === "blocked") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack ?? error.message);
  process.exitCode = 1;
});
