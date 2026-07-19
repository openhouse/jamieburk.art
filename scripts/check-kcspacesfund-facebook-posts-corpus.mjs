#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const corpusPath =
  "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.json";
export const manifestPath =
  "docs/knowledge-bank/corpora/kcspacesfund-facebook-posts-full-population.manifest.json";
export const expectedCorpusSha256 =
  "bbe54d3cf4b63b9cf38b96e5b44336a8163ef3873dac47b2dfd23237bc14404b";
export const expectedIdentitySetSha256 =
  "eec42c8175289777dd42e62dfb4d5cd1439915b0afc7b5ebb55011f11c9b1114";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function allKeys(value, result = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => allKeys(item, result));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      result.push(key);
      allKeys(item, result);
    });
  }
  return result;
}

function hasOnlyKeys(value, allowed) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).every((key) => allowed.has(key))
  );
}

export function evaluateKcSpacesFundCorpus(corpus, corpusText) {
  const errors = [];
  const fail = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const records = Array.isArray(corpus.records) ? corpus.records : [];
  const identityText =
    records.map((record) => record.publicIdentity).sort().join("\n") + "\n";
  const mediaIds = records.flatMap((record) => record.mediaIds ?? []);
  const count = (field, value) =>
    records.filter((record) => record[field] === value).length;
  const modeCount = (mode) =>
    records.filter((record) => record.missionModes?.includes(mode)).length;
  const reactionFloor = records.reduce(
    (total, record) => total + (record.visibleReactionSignals ?? 0),
    0
  );
  const commentRows = records.filter(
    (record) => record.visibleCommentRelation !== null
  );
  const expectedTopLevelKeys = new Set([
    "schemaVersion",
    "capturedAt",
    "account",
    "platform",
    "publicPageUrl",
    "surface",
    "ordering",
    "dateRange",
    "completeness",
    "captureDateRecheck",
    "independentVerification",
    "profileSnapshot",
    "aggregate",
    "routeDictionary",
    "privacy",
    "records"
  ]);
  const expectedRecordKeys = new Set([
    "id",
    "order",
    "publicIdentity",
    "mediaIds",
    "publicUrls",
    "recordForm",
    "recoveryState",
    "missionModes",
    "spotlightSubject",
    "publicDestinations",
    "visibleReactionSignals",
    "visibleCommentRelation"
  ]);
  const expectedDateRangeKeys = new Set(["earliest", "latest", "boundary"]);
  const expectedCompletenessKeys = new Set([
    "survivingPublicRecords",
    "terminalTraversalCounts",
    "scrollIterations",
    "terminalNoAdditionPasses",
    "stableMediaIds",
    "stableMediaSetMatchedAcrossAllTraversals",
    "interpretation",
    "excludedHistory"
  ]);
  const expectedRecheckKeys = new Set([
    "terminalTraversalCounts",
    "terminalNoAdditionPasses",
    "stableMediaIds",
    "stableMediaSetMatchedCanonicalCapture",
    "interpretation"
  ]);
  const expectedIndependentVerificationKeys = new Set([
    "observedAt",
    "survivingPublicRecords",
    "capturedScrollStates",
    "terminalStableChecks",
    "protectedCaptureSha256",
    "interpretation"
  ]);
  const expectedProfileKeys = new Set([
    "followers",
    "following",
    "observedAt",
    "boundary"
  ]);
  const expectedAggregateKeys = new Set([
    "mediaBackedRecords",
    "nonMediaRecords",
    "contentMaterializedRecords",
    "metadataDepthRecords",
    "unavailableAttachmentRecords",
    "fundedSpaceSpotlights",
    "applicationRoutingRecords",
    "fundraisingRecords",
    "recordsWithVisibleReactionSignals",
    "visibleReactionSignalFloor",
    "recordsWithVisibleCommentRelations",
    "culturalSpaceAccountCommentRelations",
    "otherPublicCommentRelations"
  ]);
  const expectedPrivacyKeys = new Set(["omitted", "note"]);
  const expectedRouteKeys = new Set(["label", "url", "retrievalState"]);
  const expectedRoutes = {
    "kc-spaces-fund-site": "https://kcspacesfund.com/",
    "kc-spaces-fund-apply": "https://kcspacesfund.com/apply/",
    "kc-spaces-fund-gofundme": "https://www.gofundme.com/f/kcspacesfund",
    "oddities-mutual-aid-prints":
      "https://www.odditiesprints.com/covid-19-fundraise",
    "oddities-prints-facebook": "https://www.facebook.com/oddities.prints",
    "farewell-transmission-facebook":
      "https://www.facebook.com/farewelltransmission",
    "twocc-donation-resource": "http://twocc.us/donate",
    "do816-daily-dogood":
      "https://do816.com/p/the-daily-dogood-kansas-city"
  };
  const expectedSpotlights = [
    "Vulpes Bastille",
    "SWAN",
    "Kansas City Textile Arts Center",
    "Parker 2",
    "Farewell Transmission",
    "One Mic Stand",
    "Blackbox on Troost",
    "Trans Women of Color Collective",
    "GetWoke: Queer and Trans People of Color",
    "UN/TUCK Queer & Trans Collective",
    "Latino Foundation for the Arts"
  ];

  fail(corpus.schemaVersion === 1, "schema version drift");
  fail(corpus.platform === "facebook", "platform identity drift");
  fail(corpus.account === "@kcspacesfund", "account identity drift");
  fail(
    hasOnlyKeys(corpus, expectedTopLevelKeys),
    "unexpected top-level corpus field"
  );
  fail(
    hasOnlyKeys(corpus.dateRange, expectedDateRangeKeys) &&
      hasOnlyKeys(corpus.completeness, expectedCompletenessKeys) &&
      hasOnlyKeys(corpus.captureDateRecheck, expectedRecheckKeys) &&
      hasOnlyKeys(
        corpus.independentVerification,
        expectedIndependentVerificationKeys
      ) &&
      hasOnlyKeys(corpus.profileSnapshot, expectedProfileKeys) &&
      hasOnlyKeys(corpus.aggregate, expectedAggregateKeys) &&
      hasOnlyKeys(corpus.privacy, expectedPrivacyKeys) &&
      Object.values(corpus.routeDictionary ?? {}).every((route) =>
        hasOnlyKeys(route, expectedRouteKeys)
      ),
    "unexpected nested corpus field"
  );
  fail(
    corpus.capturedAt === "2026-07-15" &&
      corpus.publicPageUrl === "https://www.facebook.com/kcspacesfund" &&
      corpus.dateRange?.earliest === "2020-04-07" &&
      corpus.dateRange?.latest === "2020-07-09",
    "capture identity or date-range drift"
  );
  fail(records.length === 40, "population must contain 40 records");
  fail(
    new Set(records.map((record) => record.id)).size === 40,
    "record IDs must be unique"
  );
  fail(
    new Set(records.map((record) => record.publicIdentity)).size === 40,
    "public identities must be unique"
  );
  fail(
    records.every(
      (record, index) =>
        record.order === index + 1 &&
        record.id ===
          `kcspacesfund-facebook-${String(index + 1).padStart(2, "0")}` &&
        hasOnlyKeys(record, expectedRecordKeys) &&
        Array.isArray(record.mediaIds) &&
        Array.isArray(record.publicUrls) &&
        Array.isArray(record.missionModes) &&
        Array.isArray(record.publicDestinations) &&
        record.publicUrls.every((url) =>
          /^https:\/\/www\.facebook\.com\/(?:photo\/\?fbid=|[^/]+\/posts\/)/.test(
            url
          )
        )
    ),
    "record shape, ordering, or public URL drift"
  );
  fail(
    sha256(identityText) === expectedIdentitySetSha256,
    "public identity set drift"
  );
  fail(new Set(mediaIds).size === 21, "stable media-ID set drift");
  fail(
    corpus.completeness?.survivingPublicRecords === 40 &&
      JSON.stringify(corpus.completeness?.terminalTraversalCounts) ===
        JSON.stringify([40, 38, 40]) &&
      corpus.completeness?.stableMediaSetMatchedAcrossAllTraversals === true,
    "terminal population control drift"
  );
  fail(
    corpus.independentVerification?.survivingPublicRecords === 40 &&
      corpus.independentVerification?.observedAt === "2026-07-16" &&
      corpus.independentVerification?.capturedScrollStates === 61 &&
      corpus.independentVerification?.terminalStableChecks === 8 &&
      corpus.independentVerification?.protectedCaptureSha256 ===
        "f591af30365fbad37b094c84f92cb49a7a0bdcd7653ee63926f5a9ebde072a03",
    "independent verification control drift"
  );
  fail(
    count("recordForm", "media-backed") === 20 &&
      count("recordForm", "non-media") === 20 &&
      count("recoveryState", "content-materialized") === 20 &&
      count("recoveryState", "metadata-depth") === 14 &&
      count("recoveryState", "attachment-unavailable") === 6,
    "recovery-state counts drift"
  );
  fail(
    modeCount("funded-space-spotlight") === 11 &&
      modeCount("application-routing") === 8 &&
      modeCount("fundraising") === 14,
    "mission-mode counts drift"
  );
  fail(
    JSON.stringify(Object.keys(corpus.routeDictionary ?? {}).sort()) ===
      JSON.stringify(Object.keys(expectedRoutes).sort()) &&
      Object.entries(expectedRoutes).every(
        ([key, url]) => corpus.routeDictionary?.[key]?.url === url
      ) &&
      records.every((record) =>
        record.publicDestinations.every((key) => key in expectedRoutes)
      ) &&
      JSON.stringify(
        [...new Set(records.flatMap((record) => record.publicDestinations))].sort()
      ) === JSON.stringify(Object.keys(expectedRoutes).sort()),
    "route inventory drift"
  );
  fail(
    JSON.stringify(
      records
        .filter((record) =>
          record.missionModes.includes("funded-space-spotlight")
        )
        .map((record) => record.spotlightSubject)
    ) === JSON.stringify(expectedSpotlights),
    "funded-space spotlight identity drift"
  );
  fail(
    reactionFloor === 119 &&
      records.filter((record) => record.visibleReactionSignals > 0).length ===
        28 &&
      commentRows.length === 4 &&
      commentRows.filter((record) =>
        ["funded-cultural-space-account", "cultural-space-account"].includes(
          record.visibleCommentRelation
        )
      ).length === 3 &&
      corpus.aggregate?.mediaBackedRecords === 20 &&
      corpus.aggregate?.nonMediaRecords === 20 &&
      corpus.aggregate?.contentMaterializedRecords === 20 &&
      corpus.aggregate?.metadataDepthRecords === 14 &&
      corpus.aggregate?.unavailableAttachmentRecords === 6 &&
      corpus.aggregate?.fundedSpaceSpotlights === 11 &&
      corpus.aggregate?.applicationRoutingRecords === 8 &&
      corpus.aggregate?.fundraisingRecords === 14 &&
      corpus.aggregate?.recordsWithVisibleReactionSignals === 28 &&
      corpus.aggregate?.visibleReactionSignalFloor === 119 &&
      corpus.aggregate?.recordsWithVisibleCommentRelations === 4 &&
      corpus.aggregate?.culturalSpaceAccountCommentRelations === 3 &&
      corpus.aggregate?.otherPublicCommentRelations === 1,
    "bounded interaction aggregate drift"
  );
  fail(
    corpus.profileSnapshot?.followers === 108 &&
      corpus.profileSnapshot?.following === 1 &&
      corpus.profileSnapshot?.observedAt === "2026-07-16",
    "profile snapshot drift"
  );
  fail(
    JSON.stringify(corpus.privacy?.omitted) ===
      JSON.stringify([
        "full post transcripts",
        "personal commenter identity",
        "reaction identities",
        "authenticated-session state",
        "session tokens",
        "private Page-management data",
        "contact details"
      ]),
    "privacy disposition drift"
  );

  const forbiddenKeys = new Set([
    "body",
    "rawBody",
    "commentText",
    "commenterName",
    "reactionIdentity",
    "followerIdentity",
    "email",
    "phone",
    "cookie",
    "sessionToken",
    "authenticatedUrl",
    "privateAnalytics"
  ]);
  fail(
    !allKeys(corpus).some((key) => forbiddenKeys.has(key)),
    "forbidden public-corpus key exposed"
  );
  fail(
    !/(c_user|xs=|fr=|datr=|__cft__|__tn__)/i.test(corpusText),
    "authenticated-session material exposed"
  );
  fail(
    !corpusText.includes("/Users/") &&
      !corpusText.includes("/Volumes/") &&
      !corpusText.includes("/private/") &&
      !corpusText.includes("/tmp/"),
    "private filesystem path exposed"
  );

  return errors;
}

export function evaluateKcSpacesFundManifest(manifest) {
  const errors = [];
  const expectedManifestKeys = new Set([
    "schemaVersion",
    "corpus",
    "account",
    "platform",
    "capturedAt",
    "independentlyVerifiedAt",
    "recordCount",
    "sha256",
    "publicIdentitySetSha256",
    "protectedCapture",
    "boundary"
  ]);
  const expectedProtectedCaptureKeys = new Set([
    "published",
    "sha256",
    "recordCount"
  ]);
  const invalid =
    !hasOnlyKeys(manifest, expectedManifestKeys) ||
    !hasOnlyKeys(manifest.protectedCapture, expectedProtectedCaptureKeys) ||
    manifest.schemaVersion !== 1 ||
    manifest.corpus !==
      "kcspacesfund-facebook-posts-full-population.json" ||
    manifest.account !== "@kcspacesfund" ||
    manifest.platform !== "facebook" ||
    manifest.capturedAt !== "2026-07-15" ||
    manifest.independentlyVerifiedAt !== "2026-07-16" ||
    manifest.sha256 !== expectedCorpusSha256 ||
    manifest.publicIdentitySetSha256 !== expectedIdentitySetSha256 ||
    manifest.recordCount !== 40 ||
    manifest.protectedCapture?.published !== false ||
    manifest.protectedCapture?.recordCount !== 40 ||
    manifest.protectedCapture?.sha256 !==
      "f591af30365fbad37b094c84f92cb49a7a0bdcd7653ee63926f5a9ebde072a03" ||
    !/not a native Meta export/i.test(manifest.boundary ?? "") ||
    !/not.*lifetime history/i.test(manifest.boundary ?? "");

  if (invalid) errors.push("manifest integrity drift");
  return errors;
}

export function checkKcSpacesFundCorpus() {
  const corpusText = read(corpusPath);
  const corpus = JSON.parse(corpusText);
  const manifest = JSON.parse(read(manifestPath));
  const errors = evaluateKcSpacesFundCorpus(corpus, corpusText);
  errors.push(...evaluateKcSpacesFundManifest(manifest));

  if (sha256(corpusText) !== expectedCorpusSha256) {
    errors.push("corpus file digest drift");
  }
  assert.deepEqual(errors, []);
  return { corpus, manifest };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkKcSpacesFundCorpus();
  console.log(
    "KC Spaces Fund Facebook corpus check passed: 40 public-safe records."
  );
}
