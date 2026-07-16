#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.json";
const manifestPath =
  "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.manifest.json";

export const expectedCorpusSha256 =
  "a410ac5fcd488e73a9008e0a646ad53f0ee4fa4d85d209fc2deb431b42f5f9e5";
export const expectedReconciliationHashSetSha256 =
  "8c25756bd56ff742266a2afeebca945d65dc596262422e16314d446734245c88";

export function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
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

function countTags(population, field) {
  const result = {};
  for (const record of population) {
    for (const value of record[field] ?? []) {
      result[value] = (result[value] ?? 0) + 1;
    }
  }
  return result;
}

export function evaluateCorpus(corpus, corpusText) {
  const errors = [];
  const fail = (message) => errors.push(message);
  const population = corpus.population ?? [];
  const hashes = population.map((record) => record.reconciliationKeySha256);
  const routeKeys = new Set(
    (corpus.postedUrlInventory ?? []).map((route) => route.routeKey)
  );
  const reconciliationHashSetSha256 = createHash("sha256")
    .update(`${[...hashes].sort().join("\n")}\n`)
    .digest("hex");

  if (corpus.schemaVersion !== 1) fail("schemaVersion must remain 1");
  if (corpus.project !== "kc-spaces-fund") fail("project changed");
  if (corpus.platform !== "facebook") fail("platform changed");
  if (corpus.account !== "@KCSpacesFund") fail("account changed");
  if (corpus.reviewedAt !== "2026-07-15") fail("review date changed");
  if (corpus.method?.managementAccessRecovered !== false) {
    fail("management access must remain unrecovered");
  }
  if (corpus.method?.terminalControl?.consecutiveStableTerminalChecks !== 4) {
    fail("four stable terminal checks are required");
  }
  if (corpus.method?.terminalControl?.visibleLoadingBoundary !== false) {
    fail("terminal loading-boundary state changed");
  }

  const reconciliation = corpus.populationReconciliation ?? {};
  if (reconciliation.coverageState !== "complete-surviving-public-surface") {
    fail("surviving-surface coverage state changed");
  }
  if (
    population.length !== 38 ||
    reconciliation.exposedDistinctPosts !== 38 ||
    reconciliation.ledgerRows !== 38 ||
    reconciliation.recoveredPublicationDates !== 38
  ) {
    fail("38-record denominator changed");
  }
  if (new Set(hashes).size !== 38) fail("reconciliation hashes are not unique");
  if (reconciliationHashSetSha256 !== expectedReconciliationHashSetSha256) {
    fail("reconciliation hash set changed");
  }
  if (
    reconciliation.dateRange?.earliest !== "2020-04-07" ||
    reconciliation.dateRange?.latest !== "2020-07-09" ||
    reconciliation.yearCounts?.["2020"] !== 38 ||
    population.some((record) => !record.publishedAt.startsWith("2020-"))
  ) {
    fail("chronology changed");
  }
  const contentStates = Object.fromEntries(
    ["public-body-recovered", "embedded-source-unavailable", "body-not-recovered"].map(
      (state) => [
        state,
        population.filter((record) => record.contentState === state).length
      ]
    )
  );
  if (
    contentStates["public-body-recovered"] !== 33 ||
    contentStates["embedded-source-unavailable"] !== 2 ||
    contentStates["body-not-recovered"] !== 3 ||
    JSON.stringify(contentStates) !==
      JSON.stringify(reconciliation.contentStateCounts)
  ) {
    fail("content-recovery states changed");
  }
  if (!/not establish every post ever created/i.test(reconciliation.boundary ?? "")) {
    fail("every-post-ever boundary is missing");
  }

  const missionCounts = countTags(population, "missionTags");
  const expectedMissionCounts = {
    "grant-and-grantee-documentation": 12,
    "application-and-eligibility-routing": 10,
    "fundraising-and-mutual-aid-prints": 23,
    "coalition-and-volunteer-participation": 6,
    "press-and-media-circulation": 1
  };
  if (
    Object.entries(expectedMissionCounts).some(
      ([key, value]) => missionCounts[key] !== value
    ) ||
    Object.keys(missionCounts).length !== Object.keys(expectedMissionCounts).length
  ) {
    fail("mission classification counts changed");
  }
  if (
    JSON.stringify(corpus.missionSummary?.tagCounts) !==
    JSON.stringify(expectedMissionCounts)
  ) {
    fail("mission summary does not reproduce");
  }
  if (corpus.stakeholderSummary?.namedGranteeOrFundedSpaceHighlights !== 11) {
    fail("named-highlight count changed");
  }
  if (!/incoming engagement.*remains unmeasured/i.test(
    corpus.stakeholderSummary?.boundary ?? ""
  )) {
    fail("stakeholder-reference boundary is missing");
  }

  const inventory = corpus.postedUrlInventory ?? [];
  const governed = inventory.filter(
    (route) => route.preservationDisposition === "governed-source-record"
  );
  const inventoryOnly = inventory.filter(
    (route) => route.preservationDisposition === "route-inventory-only"
  );
  if (
    inventory.length !== 9 ||
    new Set(inventory.map((route) => route.routeKey)).size !== 9 ||
    governed.length !== 7 ||
    inventoryOnly.length !== 2 ||
    corpus.postedUrlSummary?.distinctExternalRoutes !== 9 ||
    corpus.postedUrlSummary?.governedSourceRoutes !== 7 ||
    corpus.postedUrlSummary?.inventoryOnlyRoutes !== 2
  ) {
    fail("posted-route inventory changed");
  }
  if (
    population.some((record) =>
      record.postedRouteKeys.some((routeKey) => !routeKeys.has(routeKey))
    )
  ) {
    fail("population contains an orphaned route key");
  }
  if (governed.some((route) => !route.sourceId)) {
    fail("governed route is missing a source record ID");
  }

  const displayed = corpus.displayedInteractionSummary ?? {};
  const reactions = population.reduce(
    (sum, record) => sum + record.visibleReactions,
    0
  );
  if (
    displayed.rowsWithVisibleReactions !== 28 ||
    displayed.displayedReactions !== 119 ||
    displayed.maxReactionsOnOneRow !== 15 ||
    displayed.highestReactionOrdinal !== 11 ||
    displayed.rowsWithVisibleCommentOrShareCountLabels !== 0 ||
    reactions !== 119
  ) {
    fail("capture-date interaction snapshot changed");
  }
  if (!/not 119 unique people/i.test(displayed.boundary ?? "")) {
    fail("unique-person interaction boundary is missing");
  }
  if (
    corpus.currentPageSnapshot?.followers !== 108 ||
    !/not evidence of 2020 reach/i.test(
      corpus.currentPageSnapshot?.boundary ?? ""
    )
  ) {
    fail("current-follower boundary changed");
  }

  const credit = corpus.ownershipAndCreditBoundary ?? {};
  if (
    JSON.stringify(credit.namedPublicOrganizers) !==
      JSON.stringify([
        "Caitlin Horsmon",
        "Jordan Carr",
        "Kendell Harbin",
        "Megan Pobywajlo"
      ]) ||
    credit.historicalPagePublisherRecovered !== false ||
    credit.jamiePagePublisherAttribution !== "not-supported" ||
    !/research lead/i.test(credit.participantBoundary ?? "") ||
    !/not a claim established/i.test(credit.participantBoundary ?? "")
  ) {
    fail("ownership, organizer-credit, or naming-memory boundary changed");
  }
  if (
    population.some(
      (record) =>
        record.authorshipDisposition !==
        "project-page-human-publisher-unresolved"
    )
  ) {
    fail("historical human authorship was assigned");
  }

  const publication = corpus.publicationBoundary ?? {};
  const requiredFalse = [
    "rawBodiesStored",
    "rawRenderedTokensStored",
    "nativePostIdsStored",
    "commentTextStored",
    "interactionIdentitiesStored",
    "followerIdentitiesStored",
    "authenticatedUrlsStored"
  ];
  if (requiredFalse.some((key) => publication[key] !== false)) {
    fail("protected data publication boundary changed");
  }
  if (publication.oneWayReconciliationHashesStored !== true) {
    fail("one-way reconciliation hash state changed");
  }
  if (population.some((record) => record.bodyStored !== false)) {
    fail("a post body was marked as stored");
  }

  const prohibitedKeys = new Set([
    "rawBody",
    "rawPostText",
    "rawText",
    "postId",
    "nativePostId",
    "renderedToken",
    "commentText",
    "commenterIdentity",
    "engagerIdentity",
    "followerIdentity",
    "email",
    "contactEmail",
    "phone",
    "phoneNumber",
    "cookie",
    "session",
    "credential",
    "privateLocator",
    "authenticatedRoute"
  ]);
  if (allObjectKeys(corpus).some((key) => prohibitedKeys.has(key))) {
    fail("prohibited field entered the public corpus");
  }
  if (
    corpusText.includes("/Users/") ||
    corpusText.includes("/Volumes/") ||
    corpusText.includes("/private/tmp/") ||
    /mailto:|@gmail\.com|@ohai\.us|story_fbid|__a=|cookie|bearer /i.test(
      corpusText
    )
  ) {
    fail("private path, contact, ID, or authenticated state entered the corpus");
  }

  return {
    errors,
    missionCounts,
    inventory,
    governed,
    inventoryOnly,
    reconciliationHashSetSha256
  };
}

export function checkRepository() {
  const corpusText = read(corpusPath);
  const corpus = JSON.parse(corpusText);
  const manifest = JSON.parse(read(manifestPath));
  const corpusSha256 = createHash("sha256").update(corpusText).digest("hex");
  const result = evaluateCorpus(corpus, corpusText);

  if (corpusSha256 !== expectedCorpusSha256) {
    result.errors.push("corpus SHA-256 changed");
  }
  if (
    manifest.corpusSha256 !== expectedCorpusSha256 ||
    manifest.corpusBytes !== Buffer.byteLength(corpusText) ||
    manifest.publicReconciliationHashSet?.count !== 38 ||
    manifest.publicReconciliationHashSet?.sha256 !==
      expectedReconciliationHashSetSha256 ||
    manifest.sourceCapturePublished !== false ||
    Object.values(manifest.privacy ?? {}).some((value) => value !== false)
  ) {
    result.errors.push("manifest provenance or privacy controls changed");
  }

  const batch = read(
    "apps/www/src/data/knowledge-bank/batches/kcspacesfund-facebook-posts-full-population-2026-07-15.ts"
  );
  const records = read("apps/www/src/data/knowledge-bank/records.ts");
  const projectNote = read(
    "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"
  );
  const runNote = read(
    "docs/knowledge-bank/runs/2026-07-15-kcspacesfund-facebook-posts-full-population.md"
  );
  const normalizedDocs = `${projectNote}\n${runNote}`.replace(/\s+/g, " ");
  const normalizedDocsLower = normalizedDocs.toLowerCase();
  if (
    !batch.includes("SRC-KCSPACES-FACEBOOK-POST-CORPUS-2026-07-15") ||
    !batch.includes(
      "blob/15046d080c3ee374923cf6de25d5903f443d70a4/docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.json"
    ) ||
    batch.includes("blob/feature/evals-I/") ||
    !records.includes("kcSpacesFundFacebookPostsFullPopulationBatch20260715")
  ) {
    result.errors.push("immutable corpus provenance or batch registration is missing");
  }
  if (
    !normalizedDocsLower.includes("all 38 distinct records") ||
    !normalizedDocsLower.includes("not a meta owner export") ||
    !normalizedDocsLower.includes("not a complete grant ledger") ||
    !normalizedDocsLower.includes("incoming engagement by key stakeholder groups") ||
    !normalizedDocsLower.includes("not 119 unique people") ||
    !normalizedDocsLower.includes("not the stakeholder or owner posting")
  ) {
    result.errors.push("public documentation is missing a required boundary");
  }

  return { corpus, corpusSha256, manifest, result };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { corpusSha256, result } = checkRepository();
  if (result.errors.length) {
    console.error("KC Spaces Fund Facebook corpus check failed:");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(
    JSON.stringify(
      {
        status: "pass",
        records: 38,
        dateRange: ["2020-04-07", "2020-07-09"],
        externalRoutes: 9,
        displayedReactions: 119,
        corpusSha256,
        reconciliationHashSetSha256:
          result.reconciliationHashSetSha256
      },
      null,
      2
    )
  );
}
