import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildBetaNycSnapshot,
  extractNewsletterOpportunities,
  inspectNewsletterFreshness,
  renderBetaNycSnapshotMarkdown
} from "./betanyc-newsletter-monitor.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const configPath = path.join(repoRoot, "data/opportunities/betanyc-newsletter-monitor.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));
const args = new Set(process.argv.slice(2));
const write = args.has("--write");
const asOf = process.env.OPPORTUNITY_AS_OF ?? new Date().toISOString().slice(0, 10);

async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Opportunity source request failed (${response.status}) for ${url}`);
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { accept: "text/html,application/xhtml+xml" } });
  if (!response.ok) throw new Error(`Official opportunity request failed (${response.status}) for ${url}`);
  return response.text();
}

function writeArtifact(relativePath, value) {
  const absolutePath = path.join(repoRoot, relativePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, value);
}

const [posts, cityRows] = await Promise.all([fetchJson(config.postsUrl), fetchJson(config.cityRowsUrl)]);
const post = posts[0];
const freshness = inspectNewsletterFreshness(post, config, asOf);
if (freshness.state !== "current") throw new Error(`BetaNYC monitor ${freshness.state}: ${freshness.reason}`);
const leads = extractNewsletterOpportunities(post.content?.rendered ?? "");
if (leads.length === 0) throw new Error("BetaNYC monitor found no opportunity leads in the latest issue");
const officialPages = Object.fromEntries(
  await Promise.all(
    (config.externalReviews ?? [])
      .filter((rule) => rule.verificationMode !== "dated-official-review")
      .map(async (rule) => {
      const url = rule.verificationUrl ?? rule.sourceUrl;
      return [url, await fetchText(url)];
      })
  )
);
const snapshot = buildBetaNycSnapshot({ post, leads, cityRows, officialPages, asOf, config });

if (write) {
  writeArtifact(config.snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  writeArtifact(config.reportPath, renderBetaNycSnapshotMarkdown(snapshot));
}

console.log(JSON.stringify({ asOf, freshness, census: snapshot.census, provisionalStrongMatches: snapshot.provisionalStrongMatches }, null, 2));
