import { readFileSync } from "node:fs";
import path from "node:path";

import { compileWiki, defaultRepoRoot } from "./knowledge-wiki/lib.mjs";

const indexId = "index.knowledge-wiki.live-project-websites";
const historicalStates = new Set([
  "live-historical-campaign",
  "live-historical-project-site",
  "live-victory-archive",
  "live-archive"
]);

export function evaluateLiveProjectWebsites({ inventory, config, workSource }) {
  const failures = [];
  const sites = Array.isArray(inventory?.project_sites) ? inventory.project_sites : [];
  const counts = inventory?.counts ?? {};

  if (sites.length === 0) failures.push("inventory has no project_sites entries");

  const liveSites = sites.filter((site) => site.http_status === 200);
  const countedSites = sites.filter((site) => site.counts_toward_verified_made_total === true);
  const creditOpenSites = sites.filter((site) => site.credit_state === "authorship-open");

  if (counts.verified_live_project_homes !== liveSites.length) {
    failures.push(`verified live count ${counts.verified_live_project_homes} does not match ${liveSites.length} entries`);
  }
  if (counts.verified_made_or_directly_implemented !== countedSites.length) {
    failures.push(`verified Jamie-made count ${counts.verified_made_or_directly_implemented} does not match ${countedSites.length} entries`);
  }
  if (counts.credit_open !== creditOpenSites.length) {
    failures.push(`credit-open count ${counts.credit_open} does not match ${creditOpenSites.length} entries`);
  }

  if (counts.verified_live_project_homes !== config.expected.verifiedLiveProjectHomes) {
    failures.push("inventory live count does not match the reviewed eval fixture");
  }
  if (counts.verified_made_or_directly_implemented !== config.expected.verifiedMadeOrDirectlyImplemented) {
    failures.push("inventory Jamie-made count does not match the reviewed eval fixture");
  }
  if (counts.credit_open !== config.expected.creditOpen) {
    failures.push("inventory credit-open count does not match the reviewed eval fixture");
  }

  const projectIds = new Set();
  const canonicalUrls = new Set();
  const aliases = new Set();
  const relationTargets = new Set((inventory?.relations ?? []).map((relation) => relation.target));

  for (const site of sites) {
    for (const field of ["id", "project_id", "name", "canonical_url", "surface_state", "credit_state", "verified_at", "caution"]) {
      if (!site[field]) failures.push(`${site.id ?? "unknown site"} is missing ${field}`);
    }
    if (!/^https:\/\//.test(site.canonical_url ?? "")) {
      failures.push(`${site.id ?? "unknown site"} canonical URL must use HTTPS`);
    }
    if (projectIds.has(site.project_id)) failures.push(`duplicate project entry ${site.project_id}`);
    projectIds.add(site.project_id);
    if (canonicalUrls.has(site.canonical_url)) failures.push(`duplicate canonical URL ${site.canonical_url}`);
    canonicalUrls.add(site.canonical_url);
    if (!relationTargets.has(site.project_id)) failures.push(`${site.id} lacks a typed relation to ${site.project_id}`);

    if (site.counts_toward_verified_made_total && site.credit_state === "authorship-open") {
      failures.push(`${site.id} cannot count toward Jamie-made total while authorship is open`);
    }
    if (historicalStates.has(site.surface_state) && !/(archive|histor|not current|obsolete|era)/i.test(site.caution ?? "")) {
      failures.push(`${site.id} historical or archive state lacks a useful caution`);
    }
    if (site.portfolio_slug && !workSource.includes(site.canonical_url)) {
      failures.push(`${site.id} canonical project home is missing from the portfolio work data`);
    }
    for (const alias of site.alternate_urls ?? []) {
      if (!/^https:\/\//.test(alias)) failures.push(`${site.id} alternate URL must use HTTPS`);
      if (aliases.has(alias)) failures.push(`duplicate alternate URL ${alias}`);
      aliases.add(alias);
    }
  }

  for (const alias of aliases) {
    if (canonicalUrls.has(alias)) failures.push(`alternate URL ${alias} duplicates a canonical project home`);
  }
  if (counts.alternate_domains_observed !== aliases.size) {
    failures.push(`alternate-domain count ${counts.alternate_domains_observed} does not match ${aliases.size} aliases`);
  }

  const siteIds = new Set(sites.map((site) => site.id));
  for (const requiredId of config.expected.requiredRestoredSites) {
    if (!siteIds.has(requiredId)) failures.push(`missing restored project site ${requiredId}`);
  }

  return {
    passed: failures.length === 0,
    failures,
    counts: {
      live: liveSites.length,
      jamieMade: countedSites.length,
      creditOpen: creditOpenSites.length,
      aliases: aliases.size
    }
  };
}

export function loadCandidate(repoRoot = defaultRepoRoot) {
  const wiki = compileWiki({ repoRoot, now: "2026-08-14" });
  const inventory = wiki.records.find((record) => record.id === indexId);
  const config = JSON.parse(readFileSync(path.join(repoRoot, "evals/live-project-websites/evals.json"), "utf8"));
  const workSource = readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  return { inventory, config, workSource };
}

export function main() {
  const result = evaluateLiveProjectWebsites(loadCandidate());
  console.log(JSON.stringify({ suite: "live-project-websites", ...result }, null, 2));
  if (!result.passed) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) main();
