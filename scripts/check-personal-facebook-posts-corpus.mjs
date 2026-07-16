#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findPersonalFacebookPostsPublicArtifactRisk } from "./lib/personal-facebook-posts-guard.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/jamie-personal-facebook-posts-full-population-2026-07-16.json";
const reportPath = "docs/knowledge-bank/projects/jamie-personal-facebook-posts.md";
const modulePath =
  "apps/www/src/data/knowledge-bank/personal-facebook-posts-2026-07.ts";
const recordsPath = "apps/www/src/data/knowledge-bank/records.ts";
const expectedCorpusSha256 =
  "6b6c097dc0038c32fa2405ad3b45b91e651b77588092d2a95ab8f34f2fd55aee";

const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const sum = (values) => values.reduce((total, value) => total + value, 0);
const exactKeys = (value, keys) =>
  JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...keys].sort());

export function evaluatePersonalFacebookCorpus(corpus, corpusText) {
  const errors = [];
  const fail = (condition, message) => {
    if (!condition) errors.push(message);
  };

  const expectedTopLevel = [
    "schemaVersion",
    "capturedAt",
    "platform",
    "account",
    "surface",
    "population",
    "captureCommitments",
    "yearCounts",
    "recordForms",
    "audienceReconciliation",
    "structuralRouteInventory",
    "visualRouteCrossCheck",
    "missionRouting",
    "outgoingStakeholderReferences",
    "selectedPublicPosts",
    "reviewedPublicDestinations",
    "privacy",
    "engagementBoundary"
  ];
  const expectedPostIds = [
    "nter-chng-opening-2010",
    "wowlist-nine-cities-2015",
    "councilstat-job-route-2016",
    "letnycdance-npr-action-2017",
    "kc-town-hall-start-2018",
    "talks-not-raids-action-2019"
  ];

  fail(corpus.schemaVersion === 1, "schema version drift");
  fail(corpus.capturedAt === "2026-07-16", "capture date drift");
  fail(corpus.platform === "facebook", "platform drift");
  fail(
    corpus.surface === "Manage Posts filtered to Posted by You",
    "population surface drift"
  );
  fail(exactKeys(corpus, expectedTopLevel), "unexpected top-level corpus field");
  fail(
    corpus.population?.ownerFilteredRecords === 1243 &&
      corpus.population?.cursorPages === 621 &&
      corpus.population?.returnedNodes === 3728 &&
      corpus.population?.terminalHasNextPage === false &&
      corpus.population?.missingDates === 0 &&
      corpus.population?.ownerAbsent === 0 &&
      corpus.population?.visualTraversalRecords === 1243 &&
      corpus.population?.visuallyAvailableRecords === 1237 &&
      corpus.population?.visuallyUnavailableRecords === 6,
    "population reconciliation drift"
  );
  fail(
    corpus.population?.earliestVisibleDate === "2006-12-19" &&
      corpus.population?.latestVisibleDate === "2022-06-12",
    "visible chronology drift"
  );
  fail(sum(Object.values(corpus.yearCounts ?? {})) === 1243, "year counts must sum to 1,243");
  fail(sum(Object.values(corpus.recordForms ?? {})) === 1243, "record forms must sum to 1,243");
  fail(
    sum(Object.values(corpus.audienceReconciliation?.graphFieldCapture ?? {})) === 1243 &&
      sum(Object.values(corpus.audienceReconciliation?.visualCapture ?? {})) === 1243,
    "audience distributions must each sum to 1,243"
  );
  fail(
    corpus.audienceReconciliation?.visualCapture?.Public === 671 &&
      corpus.audienceReconciliation?.visualCapture?.Friends === 204 &&
      corpus.audienceReconciliation?.visualCapture?.OnlyMe === 98 &&
      corpus.audienceReconciliation?.visualCapture?.unlabeled === 270,
    "visual audience reconciliation drift"
  );
  fail(
    corpus.structuralRouteInventory?.externalUrlBearingRecords === 430 &&
      corpus.structuralRouteInventory?.uniqueNormalizedExternalUrls === 549 &&
      corpus.visualRouteCrossCheck?.recordsWithRenderedOutboundUrls === 291 &&
      corpus.visualRouteCrossCheck?.uniqueRenderedOutboundUrls === 363,
    "route inventory or method boundary drift"
  );
  fail(
    corpus.missionRouting?.recordsWithAtLeastOneStructuralRoute === 181,
    "mission-routing population drift"
  );
  fail(
    corpus.outgoingStakeholderReferences?.nycCouncil === 20 &&
      corpus.outgoingStakeholderReferences?.rafaelEspinal === 18,
    "outgoing stakeholder-reference controls drift"
  );
  fail(
    corpus.selectedPublicPosts?.length === 6 &&
      JSON.stringify(corpus.selectedPublicPosts.map((post) => post.id)) ===
        JSON.stringify(expectedPostIds) &&
      corpus.selectedPublicPosts.every(
        (post) =>
          /^https:\/\/www\.facebook\.com\/jburkart\/posts\//.test(post.url) &&
          !Object.hasOwn(post, "body") &&
          !Object.hasOwn(post, "message") &&
          !Object.hasOwn(post, "commentText")
      ),
    "selected public-post ledger drift"
  );
  fail(
    corpus.reviewedPublicDestinations?.length === 6 &&
      corpus.reviewedPublicDestinations.filter(
        (entry) => entry.disposition === "existing-source-associated"
      ).length === 5 &&
      corpus.reviewedPublicDestinations.filter(
        (entry) => entry.disposition === "posted-route-preserved-retrieval-blocked"
      ).length === 1,
    "reviewed destination disposition drift"
  );
  fail(
    Object.values(corpus.captureCommitments ?? {})
      .filter((value) => typeof value === "string" && /^[a-f0-9]{64}$/.test(value))
      .length === 5,
    "protected capture commitment drift"
  );
  fail(
    corpus.privacy?.omitted?.includes("raw post bodies") &&
      corpus.privacy?.omitted?.includes("Friends and Only me record contents") &&
      corpus.privacy?.omitted?.includes("comment text and responder identities") &&
      /not unique people/i.test(corpus.engagementBoundary),
    "privacy or engagement boundary drift"
  );
  fail(
    !/\/(?:Users|Volumes|private\/tmp)\//.test(corpusText),
    "public corpus exposes a protected filesystem path"
  );
  fail(
    !/(?:access_token|cookie|session_id|fb_dtsg|lsd=)/i.test(corpusText),
    "public corpus exposes authenticated state"
  );

  return errors;
}

const corpusText = read(corpusPath);
const reportText = read(reportPath);
const moduleText = read(modulePath);
const recordsText = read(recordsPath);
const corpus = JSON.parse(corpusText);
const errors = evaluatePersonalFacebookCorpus(corpus, corpusText);

assert.equal(sha256(corpusText), expectedCorpusSha256, "public corpus digest drift");
assert.deepEqual(errors, [], errors.join("\n"));
assert.equal(
  findPersonalFacebookPostsPublicArtifactRisk(`${corpusText}\n${reportText}`),
  null,
  "public artifact contains an unbounded Facebook claim"
);
assert.match(moduleText, /CLM-JAMIE-FACEBOOK-PARTICIPATION-ROUTING-PRACTICE/);
assert.match(moduleText, /INQ-JAMIE-FACEBOOK-STAKEHOLDER-ENGAGEMENT/);
assert.match(recordsText, /\.\.\.personalFacebookPostSources/);
assert.match(recordsText, /\.\.\.personalFacebookPostClaims/);
assert.match(recordsText, /\.\.\.personalFacebookPostInquiries/);

console.log(
  "Personal Facebook corpus passed: 1,243/1,243 current owner-filtered records, two capture methods reconciled, six Public posts promoted, and protected contents omitted."
);
