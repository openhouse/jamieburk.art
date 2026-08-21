#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

import {
  buildRefreshArtifacts,
  qualifyJobs,
  sourceRefreshState
} from "./nyc-jobs-lib.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const configPath = "config/opportunities/nyc-jobs.json";

function parseArgs(argv) {
  const options = {
    asOf: new Date().toISOString().slice(0, 10),
    datasetFile: null,
    metadataFile: null,
    force: false,
    write: false,
    check: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--as-of") options.asOf = argv[++index];
    else if (arg === "--dataset-file") options.datasetFile = argv[++index];
    else if (arg === "--metadata-file") options.metadataFile = argv[++index];
    else if (arg === "--force") options.force = true;
    else if (arg === "--write") options.write = true;
    else if (arg === "--check") options.check = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.write && options.check) throw new Error("Choose either --write or --check.");
  return options;
}

function readJson(relativeOrAbsolute) {
  const absolute = path.isAbsolute(relativeOrAbsolute)
    ? relativeOrAbsolute
    : path.join(repoRoot, relativeOrAbsolute);
  return JSON.parse(readFileSync(absolute, "utf8"));
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`NYC Jobs request failed with HTTP ${response.status}: ${url}`);
  return response.json();
}

function metadataShape(raw, rowCount = null) {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    rowsUpdatedAt: raw.rowsUpdatedAt,
    rowCount: rowCount ?? raw.rowCount,
    updateFrequency:
      raw.updateFrequency ?? raw.metadata?.custom_fields?.Update?.["Update Frequency"] ?? "Unknown",
    automation: raw.automation ?? raw.metadata?.custom_fields?.Update?.Automation ?? "Unknown"
  };
}

function trackedOpportunities(config) {
  const suite = readJson(config.trackedOpportunitySuite);
  return suite.opportunityPaths
    .map((relativePath) => {
      const parsed = matter(readFileSync(path.join(repoRoot, relativePath), "utf8"));
      const data = parsed.data;
      const jobId = String(data.job_id ?? data.id.match(/\.(\d+)$/)?.[1] ?? "");
      return {
        opportunityId: data.id,
        jobId,
        title: data.title,
        organization: data.organization ?? data.title.split(" - ")[0],
        canonicalUrl: data.canonical_url,
        status: data.opportunity_status,
        applicationStatus: data.application_status ?? "not-recorded",
        postedUntil: data.posted_until,
        fitScore: data.fit_score ?? null,
        securabilityScore: data.securability_score ?? null,
        combinedScore: data.combined_score ?? null,
        salaryFrom: data.salary_minimum ?? null,
        salaryTo: data.salary_maximum ?? null,
        positions: data.positions ?? 1
      };
    })
    .filter((item) => item.jobId);
}

function writeOrCheck(files, { check }) {
  const failures = [];
  for (const [relativePath, content] of Object.entries(files)) {
    const absolute = path.join(repoRoot, relativePath);
    if (check) {
      if (!existsSync(absolute)) failures.push(`${relativePath} is missing`);
      else if (readFileSync(absolute, "utf8") !== content) failures.push(`${relativePath} is stale`);
      continue;
    }
    mkdirSync(path.dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
  }
  const opportunityDirectory = path.join(repoRoot, "docs/knowledge-bank/opportunities");
  const expectedGenerated = new Set(
    Object.keys(files)
      .filter((file) => /^docs\/knowledge-bank\/opportunities\/nyc-jobs-\d+\.md$/.test(file))
      .map((file) => path.basename(file))
  );
  for (const name of readdirSync(opportunityDirectory).filter((item) => /^nyc-jobs-\d+\.md$/.test(item))) {
    if (expectedGenerated.has(name)) continue;
    const absolute = path.join(opportunityDirectory, name);
    const source = readFileSync(absolute, "utf8");
    if (!source.includes("admission_method: deterministic-strong-match")) continue;
    if (check) failures.push(`docs/knowledge-bank/opportunities/${name} is a stale generated opportunity`);
    else unlinkSync(absolute);
  }
  return failures;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const config = readJson(configPath);
  const rawMetadata = options.metadataFile
    ? readJson(options.metadataFile)
    : await fetchJson(config.metadataEndpoint);
  const observedRowsUpdatedAt = new Date(rawMetadata.rowsUpdatedAt * 1000).toISOString();
  const freshness = sourceRefreshState({
    lastSeenRowsUpdatedAt: config.lastSeenRowsUpdatedAt,
    observedRowsUpdatedAt
  });
  if (!options.force && !freshness.stale) {
    console.log(JSON.stringify({
      datasetId: config.datasetId,
      refreshed: false,
      freshness,
      rowsUpdatedAt: observedRowsUpdatedAt,
      nextAction: "Use the committed qualified set for today's digest."
    }, null, 2));
    return;
  }
  if (freshness.reason === "source-clock-regressed" && !options.force) {
    throw new Error("NYC Jobs rowsUpdatedAt regressed; human source review is required.");
  }
  const rows = options.datasetFile ? readJson(options.datasetFile) : await fetchJson(config.dataEndpoint);
  const metadata = metadataShape(rawMetadata, rows.length);
  const qualification = qualifyJobs(rows, {
    asOf: options.asOf,
    threshold: config.strongMatchThreshold
  });
  const artifacts = buildRefreshArtifacts({
    asOf: options.asOf,
    metadata,
    qualification,
    trackedOpportunities: trackedOpportunities(config),
    config
  });
  if (options.write || options.check) {
    const failures = writeOrCheck(artifacts.files, { check: options.check });
    if (failures.length) {
      for (const failure of failures) console.error(failure);
      process.exitCode = 1;
    }
  }
  console.log(JSON.stringify({
    datasetId: config.datasetId,
    refreshed: options.write && process.exitCode !== 1,
    checked: options.check,
    freshness,
    rowsUpdatedAt: observedRowsUpdatedAt,
    rowCount: qualification.rowCount,
    uniqueJobCount: qualification.uniqueJobCount,
    deterministicExcludedCount: qualification.excluded.length,
    scoredCount: qualification.scoredCount,
    admittedCount: qualification.admitted.length,
    actionableCount: artifacts.actionable.length,
    generatedFiles: Object.keys(artifacts.files).length
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack ?? error.message);
  process.exitCode = 1;
});
