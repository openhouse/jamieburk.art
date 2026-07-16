#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const corpusPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.json";
export const manifestPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-posts-full-population.manifest.json";
export const expectedCorpusSha256 =
  "d39d851976da5e35cba5df9b8258db9c48c7f24faea058a0c242223403d50ac4";
export const expectedReconciliationSha256 =
  "79add9a8e36d93d41c0b30ddf233c39c3fe59fe4014db0b96f769ec98cf1ce5c";
export const expectedPopulationSemanticSha256 =
  "d7a7d1f72d8643b8c59f3e7009d151eb90afe7269abb1d8e84f31df508d4488d";
export const expectedUrlInventorySemanticSha256 =
  "43c0eeb051dacf60a6286fce755483d6ffeef669842b66ec3599e6286f2a53af";
export const expectedOwnerSummarySemanticSha256 =
  "7d35076d4edf985ec751f00759c02f2b3510c5097bb3c516a7949b0353db6879";

export function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function allObjectEntries(value, result = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => allObjectEntries(item, result));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      result.push([key, item]);
      allObjectEntries(item, result);
    }
  }
  return result;
}

function countTags(records, field, expected) {
  return Object.fromEntries(
    Object.keys(expected).map((tag) => [
      tag,
      records.filter((record) => record[field]?.includes(tag)).length
    ])
  );
}

export function evaluateCorpus(corpus, corpusText) {
  const errors = [];
  const fail = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const records = Array.isArray(corpus.population) ? corpus.population : [];
  const hashes = records.map((record) => record.reconciliationKeySha256);
  const sortedHashText = `${[...hashes].sort().join("\n")}\n`;

  fail(corpus.schemaVersion === 3, "schema version drift");
  fail(corpus.platform === "facebook", "platform identity drift");
  fail(corpus.account === "@nycartc", "account identity drift");
  fail(records.length === 445, "population must contain 445 feed records");
  fail(new Set(hashes).size === 445, "reconciliation hashes must be unique");
  fail(
    sha256(sortedHashText) === expectedReconciliationSha256,
    "reconciliation hash set drift"
  );
  fail(
    records.every((record, index) => record.ordinal === index + 1),
    "ordinals must be contiguous"
  );
  fail(
    records.every(
      (record) =>
        /^\d{4}-\d{2}-\d{2}$/.test(record.publishedAt) &&
        /^[a-f0-9]{64}$/.test(record.reconciliationKeySha256) &&
        /^[a-f0-9]{64}$/.test(record.contentFingerprint) &&
        record.authorshipDisposition ===
          "shared-account-human-author-unresolved" &&
        record.bodyStored === false
    ),
    "record public-safety or authorship state drift"
  );
  fail(
    sha256(stableStringify(records)) === expectedPopulationSemanticSha256,
    "population semantic record drift"
  );

  const annual = Object.fromEntries(
    ["2017", "2018", "2019", "2020", "2021"].map((year) => [
      year,
      records.filter((record) => record.publishedAt.startsWith(year)).length
    ])
  );
  const expectedPopulationAnnual = {
    2017: 186,
    2018: 74,
    2019: 111,
    2020: 69,
    2021: 5
  };
  fail(
    JSON.stringify(annual) === JSON.stringify(expectedPopulationAnnual),
    "annual population drift"
  );
  fail(
    corpus.populationReconciliation?.annualOwnerExportRows === 444 &&
      corpus.populationReconciliation?.annualOwnerExportUniquePostIds === 444 &&
      corpus.populationReconciliation?.ownerExportCrosswalkStatus ===
        "surface-complete-row-level-crosswalk-not-asserted" &&
      corpus.populationReconciliation?.ledgerRows === 445 &&
      corpus.populationReconciliation?.notRecovered === 0 &&
      corpus.populationReconciliation?.encounteredRenderRows === 598 &&
      corpus.populationReconciliation
        ?.excludedDuplicateOrEmbeddedRenderVariants === 153 &&
      corpus.populationReconciliation?.dateRange?.earliest === "2017-01-29" &&
      corpus.populationReconciliation?.dateRange?.latest === "2021-09-15",
    "population reconciliation drift"
  );
  fail(
    /all 445 distinct identities/i.test(
      corpus.populationReconciliation?.boundary ?? ""
    ) &&
      /all 444 Published rows/i.test(
        corpus.populationReconciliation?.boundary ?? ""
      ) &&
      /no one-to-one row crosswalk is asserted/i.test(
        corpus.populationReconciliation?.boundary ?? ""
      ) &&
      /Deleted, hidden, private, unpublished, or no-longer-retained/i.test(
        corpus.populationReconciliation?.boundary ?? ""
      ),
    "100 percent boundary was weakened"
  );

  const owner = corpus.ownerExportReconciliation ?? {};
  const expectedOwnerAnnual = {
    2017: 185,
    2018: 74,
    2019: 111,
    2020: 69,
    2021: 5
  };
  fail(
    sha256(stableStringify(owner)) === expectedOwnerSummarySemanticSha256,
    "owner-export semantic summary drift"
  );
  fail(
    owner.totalRows === 444 &&
      owner.uniquePostIds === 444 &&
      JSON.stringify(owner.annualRowCounts) ===
        JSON.stringify(expectedOwnerAnnual) &&
      owner.sourceFilesPublished === false,
    "owner export control drift"
  );
  fail(
    JSON.stringify(owner.postTypes) ===
      JSON.stringify({ text: 172, links: 131, photos: 116, videos: 25 }) &&
      JSON.stringify(owner.shareStates) ===
        JSON.stringify({ originalOrUnmarked: 303, markedAsShare: 141 }),
    "owner export record-type drift"
  );
  fail(
    JSON.stringify(owner.metricSnapshot) ===
      JSON.stringify({
        rowsWithNonzeroInteractions: 375,
        rowsWithNonzeroReach: 364,
        reactions: 2589,
        comments: 295,
        shares: 552,
        reactionCommentShareTotal: 3436,
        summedPostReach: 48044,
        totalClicks: 2190,
        otherClicks: 1411,
        linkClicks: 204
      }),
    "owner export metric drift"
  );
  fail(
    /not a unique-person audience total/i.test(owner.boundary ?? "") &&
      /no metric identifies stakeholder groups/i.test(owner.boundary ?? ""),
    "metric semantics were weakened"
  );

  const expectedMission = {
    "commercial-rent-and-anti-displacement": 48,
    "civic-solidarity-and-participation": 16,
    "covid-and-space-relief": 30,
    "cultural-space-survival-and-network": 192,
    "coalition-public-communications": 103,
    "nightlife-governance-and-listening": 29,
    "march-transparency-and-accountability": 65,
    "cabaret-law-and-dance-freedom": 76,
    "cultural-policy-and-create-nyc": 18,
    "cultural-space-safety-and-compliance": 8
  };
  const missionCounts = countTags(records, "missionTags", expectedMission);
  fail(
    JSON.stringify(missionCounts) === JSON.stringify(expectedMission) &&
      JSON.stringify(corpus.missionSummary?.tagCounts) ===
        JSON.stringify(expectedMission),
    "mission classification drift"
  );

  const expectedStakeholders = {
    "general-public-and-followers": 104,
    "artists-cultural-spaces-and-organizers": 257,
    "enforcement-and-regulatory-agencies": 66,
    "state-and-federal-government": 9,
    "office-of-nightlife-and-nightlife-governance": 33,
    "published-media": 35,
    "coalition-and-advocacy-networks": 39,
    "nyc-council-and-elected-officials": 66,
    "cultural-affairs-and-city-agencies": 15
  };
  const stakeholderCounts = countTags(
    records,
    "stakeholderGroups",
    expectedStakeholders
  );
  fail(
    JSON.stringify(stakeholderCounts) === JSON.stringify(expectedStakeholders) &&
      JSON.stringify(corpus.stakeholderSummary?.tagCounts) ===
        JSON.stringify(expectedStakeholders),
    "stakeholder classification drift"
  );
  fail(
    /do not establish that every named stakeholder engaged/i.test(
      corpus.stakeholderSummary?.boundary ?? ""
    ),
    "outgoing reference was converted into incoming engagement"
  );

  const inventory = corpus.postedUrlInventory ?? [];
  fail(
    sha256(stableStringify(inventory)) === expectedUrlInventorySemanticSha256,
    "posted URL semantic inventory drift"
  );
  const withheld = inventory.filter(
    (route) => route.preservationDisposition === "withheld-sensitive-route"
  );
  const governed = inventory.filter((route) => route.sourceId);
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  fail(
    inventory.length === 67 &&
      new Set(inventory.map((route) => route.routeKey)).size === 67 &&
      corpus.postedUrlSummary?.publishedExactRoutes === 65 &&
      corpus.postedUrlSummary?.withheldSensitiveRoutes === 2 &&
      corpus.postedUrlSummary?.governedSourceRoutes === 9 &&
      corpus.postedUrlSummary?.inventoryOnlyRoutes === 56,
    "posted URL inventory drift"
  );
  fail(
    inventory.every((route) => {
      const firstSeenRecord = records[route.firstSeenOrdinal - 1];
      return (
        firstSeenRecord?.publishedAt === route.firstSeenAt &&
        firstSeenRecord?.postedRouteKeys.includes(route.routeKey)
      );
    }),
    "posted URL first-seen reference drift"
  );
  fail(
    withheld.length === 2 &&
      withheld.every(
        (route) =>
          route.url === null &&
          route.accessDisposition === "withheld-public-route" &&
          route.sourceId === null
      ),
    "sensitive route was published or misclassified"
  );
  fail(
    governed.length === 9 &&
      governed.every(
        (route) =>
          sourceIds.has(route.sourceId) &&
          route.accessDisposition === "governed-source-recovered" &&
          route.preservationDisposition === "governed-source-record"
      ),
    "governed source route drift"
  );

  fail(
    corpus.displayedInteractionSummary?.displayedReactions === 2291 &&
      corpus.displayedInteractionSummary?.displayedComments === 212 &&
      /not be combined with native-export metrics/i.test(
        corpus.displayedInteractionSummary?.boundary ?? ""
      ),
    "feed metric snapshot or cross-surface boundary drift"
  );

  const prohibitedKeys = new Set([
    "body",
    "rawBody",
    "rawPostText",
    "postId",
    "pageId",
    "permalink",
    "commentText",
    "commenterIdentity",
    "reactionIdentity",
    "followerIdentity",
    "cookie",
    "token",
    "credential",
    "authenticatedUrl"
  ]);
  const entries = allObjectEntries(corpus);
  fail(
    !entries.some(([key]) => prohibitedKeys.has(key)),
    "protected key entered the public corpus"
  );
  fail(
    !entries.some(([, value]) =>
      typeof value === "string"
        ? /(\/Users\/|\/Volumes\/|c_user=|\bxs=|\bdatr=|\bfr=|zoom\.us\/j\/|docs\.google\.com\/document\/d\/)/i.test(
            value
          )
        : false
    ),
    "protected value entered the public corpus"
  );
  fail(
    corpus.publicationBoundary?.rawBodiesStored === false &&
      corpus.publicationBoundary?.interactionIdentitiesStored === false &&
      corpus.publicationBoundary?.authenticatedUrlsStored === false &&
      corpus.publicationBoundary?.sensitiveExactRoutesStored === false &&
      corpus.publicationBoundary?.nativeExportFilesStored === false &&
      corpus.publicationBoundary?.nativePostIdsStored === false,
    "publication boundary drift"
  );

  return {
    errors,
    annual,
    hashes,
    inventory,
    governed,
    missionCounts,
    stakeholderCounts
  };
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
  assert.equal(manifest.publicReconciliationHashSet.count, 445);
  assert.equal(
    manifest.publicReconciliationHashSet.sha256,
    expectedReconciliationSha256
  );
  assert.equal(manifest.sourceCapturesPublished, false);
  assert.equal(manifest.privacy.rawOwnerExportsPublished, false);
  assert.equal(manifest.privacy.rawPostTextPublished, false);
  assert.equal(manifest.privacy.postIdsPublished, false);
  assert.equal(manifest.privacy.engagerIdentitiesPublished, false);

  const knowledgeRecords = read(
    "apps/www/src/data/knowledge-bank/nycac-facebook-posts-full-population.ts"
  );
  const records = read("apps/www/src/data/knowledge-bank/records.ts");
  const report = read(
    "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md"
  );
  const run = read(
    "docs/knowledge-bank/runs/2026-07-15-nycac-facebook-posts-full-population.md"
  );
  const dossier = read(
    "docs/knowledge-bank/projects/nyc-artist-coalition.md"
  );
  assert.match(
    knowledgeRecords,
    /github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\/docs\/knowledge-bank\/corpora\/nycartc-facebook-posts-full-population\.json/
  );
  const corpusSource = knowledgeBank.sources.find(
    (source) => source.id === "SRC-NYCAC-FACEBOOK-POST-CORPUS-2026"
  );
  const immutableCommit = corpusSource?.canonicalUrl?.match(
    /\/blob\/([0-9a-f]{40})\//
  )?.[1];
  assert.ok(immutableCommit, "corpus source must use an immutable commit URL");
  const immutableCorpus = execFileSync(
    "git",
    ["show", `${immutableCommit}:${corpusPath}`],
    { cwd: repoRoot }
  );
  assert.equal(
    sha256(immutableCorpus),
    expectedCorpusSha256,
    "immutable corpus source does not match the reviewed corpus"
  );
  execFileSync("git", ["merge-base", "--is-ancestor", immutableCommit, "HEAD"], {
    cwd: repoRoot
  });
  assert.ok(records.includes("nycacFacebookPostClaims"));
  assert.ok(report.includes("all 445 distinct feed identities"));
  assert.ok(report.includes("all 444 owner-export rows"));
  assert.ok(report.includes("not proof of every post ever created"));
  assert.ok(report.includes("incoming engagement by stakeholder group remains unmeasured"));
  assert.match(
    run.replace(/\s+/g, " "),
    /All three projections remain held from the website/
  );
  assert.ok(dossier.includes("## Facebook Page operating record"));

  return { corpus, manifest, result };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { result } = checkRepository();
  console.log(
    JSON.stringify(
      {
        status: "pass",
        records: result.hashes.length,
        reconciliationSha256: expectedReconciliationSha256,
        corpusSha256: expectedCorpusSha256,
        annualRows: result.annual,
        governedRoutes: result.governed.length,
        totalRoutes: result.inventory.length
      },
      null,
      2
    )
  );
}
