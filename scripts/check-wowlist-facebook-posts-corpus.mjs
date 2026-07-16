#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const corpusPath =
  "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population.json";
export const manifestPath =
  "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population.manifest.json";
export const expectedCorpusSha256 =
  "c464757f5927b3406f88b3417e7647ccf4d8530e7e45c82d75c8f59325ffe0fa";
export const expectedPostIdSha256 =
  "7dc9f9f50b466f613b060d9b054eaae0c541bf7fce404fd602f7ecffac37791e";

export function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function allObjectKeys(value, result = []) {
  if (Array.isArray(value)) {
    for (const item of value) allObjectKeys(item, result);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      result.push(key);
      allObjectKeys(item, result);
    }
  }
  return result;
}

export function evaluateCorpus(corpus, corpusText) {
  const errors = [];
  const fail = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const records = Array.isArray(corpus.records) ? corpus.records : [];
  const ids = records.map((record) => String(record.postId));
  const sortedIdText = `${[...ids].sort().join("\n")}\n`;

  fail(corpus.schemaVersion === 1, "schema version drift");
  fail(corpus.account === "WOW List", "account identity drift");
  fail(corpus.facebookPageId === "242582625948552", "Page ID drift");
  fail(
    corpus.collectionSurface ===
      "Facebook Professional Dashboard > Content Library > Published > Lifetime",
    "collection surface drift"
  );
  fail(records.length === 54, "population must contain 54 records");
  fail(new Set(ids).size === 54, "post IDs must be unique");
  fail(sha256(sortedIdText) === expectedPostIdSha256, "post ID set drift");
  fail(
    records.every((record, index) => record.ordinal === index + 1),
    "ordinals must be contiguous"
  );
  fail(
    records.every(
      (record) =>
        record.canonicalUrl ===
        `https://www.facebook.com/wowlist/posts/${record.postId}`
    ),
    "canonical post route drift"
  );
  fail(
    records[0]?.publishedOn === "2018-03-22" &&
      records.at(-1)?.publishedOn === "2015-04-25",
    "chronology boundary drift"
  );
  fail(
    records.every(
      (record, index) =>
        index === 0 || record.publishedOn <= records[index - 1].publishedOn
    ),
    "records must remain reverse chronological"
  );

  const recovered = records.filter(
    (record) => record.detailRecovery === "recovered"
  );
  const tableOnly = records.filter(
    (record) => record.detailRecovery === "table-only"
  );
  fail(recovered.length === 50, "recovered-detail count drift");
  fail(tableOnly.length === 4, "table-only count drift");
  fail(
    recovered.every(
      (record) => record.publisherAttribution === "Jamie Burkart"
    ),
    "every recovered detail must retain its publisher attribution"
  );
  fail(
    tableOnly.every(
      (record) => record.publisherAttribution === "not-recovered"
    ),
    "table-only records must not receive invented publisher attribution"
  );
  fail(
    corpus.populationReconciliation?.materializedRecordCount === 54 &&
      corpus.populationReconciliation?.detailRecoveredCount === 50 &&
      corpus.populationReconciliation?.tableOnlyCount === 4 &&
      corpus.populationReconciliation?.coverageState ===
        "complete-as-materialized",
    "population reconciliation drift"
  );
  fail(
    /100% of the surviving records/i.test(
      corpus.populationReconciliation?.boundary ?? ""
    ) &&
      /not a Meta owner export/i.test(
        corpus.populationReconciliation?.boundary ?? ""
      ) &&
      /cannot establish/i.test(
        corpus.populationReconciliation?.boundary ?? ""
      ),
    "complete-as-materialized boundary was weakened"
  );
  fail(
    corpus.publishingAttribution?.recoveredDetailsAttributedToJamieBurkart ===
      50 &&
      corpus.publishingAttribution?.tableOnlyWithoutPublisherAttribution === 4,
    "publisher aggregate drift"
  );
  fail(
    /not sole authorship/i.test(
      corpus.publishingAttribution?.boundary ?? ""
    ) &&
      /not.*sole ownership/i.test(
        corpus.publishingAttribution?.boundary ?? ""
      ) &&
      /not.*exclusive management/i.test(
        corpus.publishingAttribution?.boundary ?? ""
      ),
    "collective-credit boundary was weakened"
  );

  const links = [
    ...new Set(records.flatMap((record) => record.sourceLinks ?? []))
  ].sort();
  fail(links.length === 42, "normalized destination count drift");
  fail(
    JSON.stringify(links) ===
      JSON.stringify([...(corpus.linkInventory?.links ?? [])].sort()),
    "link inventory does not match records"
  );
  fail(
    corpus.linkInventory?.normalizedDistinctUrlCount === 42,
    "link aggregate drift"
  );

  const expectedThemes = {
    "community-calendar-onboarding": 18,
    "event-and-artist-distribution": 17,
    "cultural-space-support-and-mutual-aid": 19,
    "civic-mobilization": 12,
    "community-governance-and-product-feedback": 13,
    "community-care-and-remembrance": 9,
    "cultural-space-funding": 9
  };
  const derivedThemes = Object.fromEntries(
    Object.keys(expectedThemes).map((theme) => [
      theme,
      records.filter((record) => record.themes?.includes(theme)).length
    ])
  );
  fail(
    JSON.stringify(derivedThemes) === JSON.stringify(expectedThemes),
    "record-level theme counts drift"
  );
  fail(
    JSON.stringify(corpus.missionPatterns?.recordCounts) ===
      JSON.stringify(expectedThemes),
    "theme aggregates do not match records"
  );
  fail(
    /does not claim stakeholder-group engagement counts/i.test(
      corpus.missionPatterns?.stakeholderEngagementBoundary ?? ""
    ),
    "stakeholder-identity boundary was weakened"
  );

  const metricTotals = records.reduce(
    (totals, record) => {
      for (const key of Object.keys(totals)) {
        totals[key] += record.adminMetricSnapshot?.[key] ?? 0;
      }
      return totals;
    },
    { interactions: 0, netFollows: 0, impressions: 0, comments: 0 }
  );
  fail(
    JSON.stringify(metricTotals) ===
      JSON.stringify({
        interactions: 108,
        netFollows: 0,
        impressions: 512,
        comments: 11
      }),
    "record-level metric totals drift"
  );
  fail(
    Object.entries(metricTotals).every(
      ([key, value]) => corpus.adminMetricSnapshot?.[key] === value
    ),
    "metric aggregates do not match records"
  );
  fail(
    /not.*historical lifetime reach/i.test(
      corpus.adminMetricSnapshot?.boundary ?? ""
    ) && /not.*impact/i.test(corpus.adminMetricSnapshot?.boundary ?? ""),
    "metric-to-impact boundary was weakened"
  );
  fail(
    /product-migration boundary/i.test(
      corpus.migrationBoundary?.boundary ?? ""
    ) && /not evidence/i.test(corpus.migrationBoundary?.boundary ?? ""),
    "migration zero was converted into historical absence"
  );

  const prohibitedKeys = new Set([
    "body",
    "rawBody",
    "rawPostText",
    "commentBodies",
    "commenterIdentities",
    "reactorIdentities",
    "privateProfileLinks",
    "cookie",
    "token",
    "session",
    "credential",
    "directMessage"
  ]);
  fail(
    !allObjectKeys(corpus).some((key) => prohibitedKeys.has(key)),
    "prohibited raw or authenticated field entered the corpus"
  );
  fail(!corpusText.includes("/Users/"), "private user path entered corpus");
  fail(!corpusText.includes("/Volumes/"), "private volume path entered corpus");
  fail(
    corpus.publicSafety?.rawPostTextPublished === false &&
      corpus.publicSafety?.commenterIdentitiesPublished === false &&
      corpus.publicSafety?.privateProfileLinksPublished === false &&
      corpus.publicSafety?.authenticatedSessionDataPublished === false,
    "public-safety disposition drift"
  );

  return { errors, ids, metricTotals, derivedThemes, links };
}

export function checkRepository() {
  const corpusText = read(corpusPath);
  const corpus = JSON.parse(corpusText);
  const manifest = JSON.parse(read(manifestPath));
  const result = evaluateCorpus(corpus, corpusText);
  assert.deepEqual(result.errors, []);
  assert.equal(sha256(corpusText), expectedCorpusSha256);
  assert.equal(manifest.corpusSha256, expectedCorpusSha256);
  assert.equal(manifest.corpusBytes, Buffer.byteLength(corpusText));
  assert.equal(manifest.publicPostIdSet.count, 54);
  assert.equal(manifest.publicPostIdSet.sha256, expectedPostIdSha256);
  assert.equal(manifest.sourceCapturePublished, false);
  assert.equal(manifest.privacy.rawPostTextPublished, false);
  assert.equal(manifest.privacy.engagerIdentitiesPublished, false);
  assert.equal(manifest.privacy.authenticatedSessionDataPublished, false);

  const batch = read(
    "apps/www/src/data/knowledge-bank/batches/wowlist-facebook-posts-full-population-2026-07-15.ts"
  );
  const records = read("apps/www/src/data/knowledge-bank/records.ts");
  const page = read("apps/www/src/content/work/wowlist.mdx");
  const project = read("docs/knowledge-bank/projects/wowlist-facebook-posts.md");
  assert.match(
    batch,
    /github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\/docs\/knowledge-bank\/corpora\/wowlist-facebook-posts-full-population\.json/
  );
  assert.ok(records.includes("wowListFacebookPostsFullPopulationBatch20260715"));
  assert.ok(page.includes("CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP"));
  assert.ok(page.includes('occurrenceId="facebook-publishing-stewardship"'));
  assert.ok(project.includes("complete-as-materialized"));
  assert.ok(project.includes("not a Meta owner export"));
  assert.ok(project.includes("does not report engagement by artists"));

  return { corpus, manifest, result };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { result } = checkRepository();
  console.log(
    JSON.stringify(
      {
        status: "pass",
        records: result.ids.length,
        postIdSha256: expectedPostIdSha256,
        corpusSha256: expectedCorpusSha256,
        normalizedDestinations: result.links.length,
        metricTotals: result.metricTotals
      },
      null,
      2
    )
  );
}
