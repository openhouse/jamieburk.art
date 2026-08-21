#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function parseArgs(argv) {
  const options = { asOf: new Date().toISOString().slice(0, 10), check: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--as-of") options.asOf = argv[++index];
    else if (arg === "--check") options.check = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function daysBetween(from, to) {
  return Math.floor((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const config = readJson("config/opportunities/betanyc-newsletter.json");
  const report = readJson(config.snapshotPath);
  const editionAgeDays = daysBetween(report.edition.publishedAt, options.asOf);
  const stale = editionAgeDays < 0 || editionAgeDays > config.maximumEditionAgeDays;
  const clocksAgree =
    config.latestEditionDate === report.edition.publishedAt &&
    config.latestEditionObservedAt === report.edition.observedAt &&
    config.latestPublicArchiveEditionDate === report.edition.latestPublicArchiveEditionDate;
  const result = {
    sourceId: config.sourceId,
    checkedAt: options.asOf,
    latestEditionDate: report.edition.publishedAt,
    latestPublicArchiveEditionDate: report.edition.latestPublicArchiveEditionDate,
    editionAgeDays,
    maximumEditionAgeDays: config.maximumEditionAgeDays,
    stale,
    clocksAgree,
    refreshMode: config.refresh.mode,
    nextAction:
      stale || !clocksAgree
        ? config.refresh.staleAction
        : "Use the committed normalized edition and rerun the deterministic opportunity evaluation."
  };
  console.log(JSON.stringify(result, null, 2));
  if (stale || !clocksAgree) process.exitCode = 1;
}

main();

