import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildDigest,
  buildOpportunitySnapshot,
  deliverDigest,
  extractLifecycleActions,
  extractNycJobIds,
  inspectFreshness,
  renderSnapshotMarkdown
} from "./nyc-jobs-monitor.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const args = new Set(process.argv.slice(2));
const write = args.has("--write");
const sendEmail = args.has("--send-email");
const forceRefresh = args.has("--force-refresh");
const asOf = process.env.NYC_JOBS_AS_OF ?? new Date().toISOString().slice(0, 10);
const configPath = path.join(repoRoot, "data/opportunities/nyc-jobs-monitor.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`NYC Open Data request failed (${response.status}) for ${url}`);
  return response.json();
}

function writeArtifact(relativePath, value) {
  const absolutePath = path.join(repoRoot, relativePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, value);
}

const metadata = await fetchJson(config.metadataUrl);
const freshness = inspectFreshness(metadata, config);
if (freshness.state === "blocked") {
  throw new Error(`NYC Jobs monitor blocked: ${freshness.reason}${freshness.missingFields ? ` (${freshness.missingFields.join(", ")})` : ""}`);
}

let snapshot;
const snapshotPath = path.join(repoRoot, config.snapshotPath);
const refresh = forceRefresh || freshness.state === "stale" || !existsSync(snapshotPath);
if (refresh) {
  const rows = await fetchJson(config.rowsUrl);
  const lifecycle = JSON.parse(readFileSync(path.join(repoRoot, config.lifecyclePath), "utf8"));
  const lifecycleJobIds = extractNycJobIds(lifecycle);
  snapshot = buildOpportunitySnapshot({
    rows,
    metadata,
    config: {
      ...config,
      knownJobIds: [...new Set([...config.reviewedJobIds, ...lifecycleJobIds])]
    },
    asOf
  });
  if (write) {
    writeArtifact(config.snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
    writeArtifact(config.reportPath, renderSnapshotMarkdown(snapshot));
    writeFileSync(
      configPath,
      `${JSON.stringify(
        {
          ...config,
          rowsUpdatedAt: metadata.rowsUpdatedAt,
          rowsUpdatedAtIso: new Date(metadata.rowsUpdatedAt * 1000).toISOString()
        },
        null,
        2
      )}\n`
    );
  }
} else {
  snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"));
}

const lifecycle = JSON.parse(readFileSync(path.join(repoRoot, config.lifecyclePath), "utf8"));
const lifecycleActions = extractLifecycleActions(lifecycle, asOf);
const digest = buildDigest({
  asOf,
  ...lifecycleActions,
  newStrongMatches: snapshot.newStrongMatches
});
if (write) writeArtifact(config.digestPath, digest.markdown);

let delivery = { state: "not-requested" };
if (sendEmail) {
  delivery = { state: "sent", ...(await deliverDigest(digest)) };
}

console.log(
  JSON.stringify(
    {
      asOf,
      freshness,
      refreshed: refresh,
      census: snapshot.census,
      newStrongMatchJobIds: snapshot.newStrongMatches.map((entry) => entry.jobId),
      actionCount: digest.actions.length,
      delivery
    },
    null,
    2
  )
);
