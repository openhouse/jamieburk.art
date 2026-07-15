#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  classifyUrbanhermitRecord,
  urbanhermitMissionSignalRules
} from "./lib/urbanhermit-mission-classifier.mjs";

const defaultLedger =
  "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.json";
const defaultManifest =
  "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.manifest.json";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const digestValues = (values) =>
  sha256(JSON.stringify([...values].sort((left, right) => left.localeCompare(right))));
const statusPathPattern = /^\/([^/]+)\/status\/(\d+)$/;
const statusParts = (record) => record.statusUrl?.match(statusPathPattern);
const statusId = (record) => statusParts(record)?.[2];
const statusHandle = (record) => statusParts(record)?.[1].toLowerCase();

const missionThirdPartyIds = new Set([
  "579088937022406657",
  "726096416070836224",
  "726238278433804288",
  "731863659052445696",
  "775795144553398272",
  "916709928915619840",
  "923573066252382209",
  "925021115080232960",
  "925875113555357707",
  "934625625016623104",
  "934923724683431936",
  "1124810411302359040",
  "1135246124883861504",
  "1510067983456026629",
  "1648007189049516032"
]);
const missionConversationContextIds = new Set([
  "916710349172301824",
  "916710595092729857"
]);

const selectedSourceLeads = [
  {
    id: "music-hackathon-wowlist-attribution",
    canonicalUrl: "https://x.com/musichackathon/status/579088937022406657",
    disposition: "public-peer-attribution",
    supports: "Jamie as a Music Hackathon co-organizer and WOW List as an event-sharing service he made.",
    boundary: "Does not establish sole authorship, complete architecture, adoption, or impact."
  },
  {
    id: "horse-lords-drew-daniel-attribution",
    canonicalUrl: "https://x.com/DDDrewDaniel/status/726096416070836224",
    disposition: "public-collaborator-network-attribution",
    supports: "Shared public credit for Jamie Burkart and M.C. Schmidt's Horse Lords video.",
    boundary: "Does not establish the collaborators' division of labor, rights, terms, or reach."
  },
  {
    id: "horse-lords-julia-fredenburg-attribution",
    canonicalUrl: "https://x.com/juliafredenburg/status/726238278433804288",
    disposition: "public-collaborator-attribution",
    supports: "A second public attribution naming Jamie and M.C. Schmidt and the analog-media context.",
    boundary: "Does not establish sole authorship or the precise division of labor."
  },
  {
    id: "eighth-street-tunnel-julia-fredenburg-attribution",
    canonicalUrl: "https://x.com/juliafredenburg/status/775795144553398272",
    disposition: "public-collaborator-attribution",
    supports: "Public attribution connecting Jamie to the 8th Street Tunnel interpretation.",
    boundary: "Does not establish ownership, restoration, formal control, attendance, or measured impact."
  },
  {
    id: "cabaret-repeal-peer-attribution",
    canonicalUrl: "https://x.com/alizauf/status/925021115080232960",
    disposition: "public-peer-attribution",
    supports: "Public recognition of Jamie Burkart and Julia Fredenburg's work in the Cabaret Law repeal effort.",
    boundary: "Does not assign legislative authorship, sole strategy, or decisive policy causation."
  },
  {
    id: "nycac-cultural-spaces-quote",
    canonicalUrl: "https://x.com/NYCArtC/status/923573066252382209",
    disposition: "public-coalition-attribution",
    supports: "NYC Artist Coalition attribution of a statement by Jamie about cultural traditions and small diverse spaces.",
    boundary: "Speaker attribution is not sole ownership of a coalition argument or outcome."
  },
  {
    id: "nycac-trust-safety-quote",
    canonicalUrl: "https://x.com/NYCArtC/status/925875113555357707",
    disposition: "public-coalition-attribution",
    supports: "NYC Artist Coalition attribution of Jamie's Cabaret Law trust-and-safety framing.",
    boundary: "Does not establish legislative authorship or sole policy causation."
  },
  {
    id: "nycac-save-spaces-town-hall-quote",
    canonicalUrl: "https://x.com/NYCArtC/status/934923724683431936",
    disposition: "public-coalition-attribution",
    supports: "NYC Artist Coalition attribution of Jamie's statement at a Save NYC Spaces town hall.",
    boundary: "Does not establish sole event production, coalition ownership, or policy outcome."
  },
  {
    id: "kcth-tired-of-tires-participation",
    canonicalUrl: "https://x.com/KCTownHall/status/1135246124883861504",
    disposition: "public-project-account-attribution",
    supports: "A KC Town Hall operating update names Jamie among Tired of Tires participants.",
    boundary: "Does not establish sole design, sole coordination, every shift, or audited totals."
  },
  {
    id: "tired-of-tires-jimmy-fitzner-account",
    canonicalUrl: "https://x.com/JimmyFitzner/status/1510067983456026629",
    disposition: "public-participant-account",
    supports: "A first-person account of a dump-truck tire-pickup shift with Jamie in Northeast Kansas City.",
    boundary: "Does not establish sole program operation, every shift, or complete geography."
  },
  {
    id: "creative-community-introductions",
    canonicalUrl: "https://x.com/letsglitchit/status/1648007189049516032",
    disposition: "public-peer-attribution",
    supports: "Public thanks to Jamie for artist introductions across a creative-technology community.",
    boundary: "Does not establish a formal convening role, the complete context, or downstream outcomes."
  },
  {
    id: "kcur-eighth-street-tunnel",
    canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    disposition: "live-and-close-read",
    supports: "KCUR documents Jamie's 2006 participatory route and three-film screening in the 8th Street Tunnel.",
    boundary: "Does not establish tunnel ownership, restoration, attendance, or measured educational impact."
  },
  {
    id: "brooklyn-daily-eagle-office-of-nightlife",
    canonicalUrl: "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
    disposition: "live-and-close-read",
    supports: "Contemporaneous reporting quotes NYC Artist Coalition and records the Council committee and public-feedback sequence.",
    boundary: "Does not name Jamie individually or establish sole coalition causation."
  }
];

function visibleInteraction(record, label) {
  const pattern = label === "replies"
    ? /(?:^|, )([0-9,.]+) repl(?:y|ies)/
    : new RegExp(`(?:^|, )([0-9,.]+) ${label.replace(/s$/, "")}s?`);
  return Number((record.engagementLabel.match(pattern)?.[1] ?? "0").replaceAll(",", ""));
}

function normalizedExternalLinks(record) {
  return [...new Set(record.links
    .map((link) => link.href)
    .filter((href) => /^https?:\/\//.test(href))
    .filter((href) => !/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\//.test(href)))];
}

function assertDistinctStatusRecords(records, expectedCount, label) {
  assert.equal(records.length, expectedCount, `${label} must contain ${expectedCount} records`);
  const ids = records.map((record, index) => {
    assert.match(record.statusUrl ?? "", statusPathPattern, `${label}[${index}] has an invalid status URL`);
    return statusId(record);
  });
  assert.equal(new Set(ids).size, expectedCount, `${label} must contain ${expectedCount} distinct status IDs`);
  return ids;
}

function assertEqualSets(actual, expected, label) {
  assert.equal(actual.size, expected.size, `${label} has the wrong set size`);
  for (const value of expected) assert(actual.has(value), `${label} is missing status ID ${value}`);
}

export function validateUrbanhermitCapture(capture) {
  assert.equal(capture.profile.account, "@urbanhermit");
  assert.equal(capture.profile.reportedPosts, 434);

  const primaryIds = assertDistinctStatusRecords(capture.items, 434, "items");
  const primarySet = new Set(primaryIds);
  for (const [index, item] of capture.items.entries()) {
    assert(["authored", "reposted"].includes(item.kind), `items[${index}] has an invalid kind`);
    if (item.kind === "authored") {
      assert.equal(statusHandle(item), "urbanhermit", `items[${index}] authored status must belong to @urbanhermit`);
    }
  }

  const passes = capture.acquisitionVerification.passes;
  assert.equal(passes.length, 3, "exactly three acquisition passes are required");
  assert.equal(new Set(passes.map((pass) => pass.id)).size, 3, "acquisition pass IDs must be distinct");
  for (const [index, pass] of passes.entries()) {
    assert.equal(pass.distinctPrimaryStatusIds, 434, `pass ${index + 1} distinct count is invalid`);
    assert.equal(pass.totalRenderedStatusIds, 436, `pass ${index + 1} rendered count is invalid`);
    assert.equal(pass.conversationContextRecords, 2, `pass ${index + 1} context count is invalid`);
    assert.equal(pass.statusIds.length, 434, `pass ${index + 1} must contain 434 status IDs`);
    assert.equal(new Set(pass.statusIds).size, 434, `pass ${index + 1} status IDs must be distinct`);
    pass.statusIds.forEach((id) => assert.match(id, /^\d+$/, `pass ${index + 1} contains an invalid status ID`));
    assertEqualSets(new Set(pass.statusIds), primarySet, `pass ${index + 1}`);
  }
  assert.equal(capture.acquisitionVerification.setsEqual, true);
  assert.equal(capture.acquisitionVerification.matchedProfileBaseline, true);
  assert.equal(
    capture.acquisitionVerification.stoppingCondition,
    "Twelve consecutive scroll observations produced no new canonical status IDs."
  );

  const supplementalIds = assertDistinctStatusRecords(
    capture.supplementalContexts,
    2,
    "supplementalContexts"
  );
  supplementalIds.forEach((id) => {
    assert(!primarySet.has(id), "supplemental context must remain outside the primary population");
  });

  assert.equal(capture.incomingSearch.query, "@urbanhermit -from:urbanhermit");
  assert.equal(capture.incomingSearch.yearlyWindows, "2008-2026");
  assert.equal(capture.incomingSearch.distinctRecovered, 26);
  const incomingIds = assertDistinctStatusRecords(capture.incomingSearch.records, 26, "incomingSearch.records");
  const incomingSet = new Set(incomingIds);
  const expectedMissionIds = new Set([...missionThirdPartyIds, ...missionConversationContextIds]);
  expectedMissionIds.forEach((id) => {
    assert(incomingSet.has(id), `incoming search is missing mission-relevant status ID ${id}`);
  });
  assert.equal(incomingIds.filter((id) => !expectedMissionIds.has(id)).length, 9);

  const missionAccounts = new Set(capture.incomingSearch.records
    .filter((record) => missionThirdPartyIds.has(statusId(record)))
    .map(statusHandle));
  assert.equal(missionAccounts.size, 9, "mission-relevant third-party account count must be derived as nine");

  return { primaryIds, incomingIds, missionAccounts };
}

export function buildUrbanhermitPublicLedger(protectedCaptureText) {
  const capture = JSON.parse(protectedCaptureText);
  const validated = validateUrbanhermitCapture(capture);

  const statusIds = validated.primaryIds;
  const authored = capture.items.filter((item) => item.kind === "authored");
  const reposted = capture.items.filter((item) => item.kind === "reposted");
  const dates = capture.items.map((item) => item.datetime).sort();
  const allLinks = capture.items.flatMap(normalizedExternalLinks);
  const authoredLinks = authored.flatMap(normalizedExternalLinks);
  const signalCounts = Object.fromEntries(urbanhermitMissionSignalRules.map((rule) => [
    rule.id,
    capture.items.filter((item) => classifyUrbanhermitRecord(item).includes(rule.id)).length
  ]));
  const byYear = Object.fromEntries(Object.entries(capture.items.reduce((years, item) => {
    const year = item.datetime.slice(0, 4);
    years[year] ??= { accountAuthored: 0, externalSourceNativeReposts: 0, total: 0 };
    years[year][item.kind === "authored" ? "accountAuthored" : "externalSourceNativeReposts"] += 1;
    years[year].total += 1;
    return years;
  }, {})).sort(([left], [right]) => left.localeCompare(right)));
  const visible = authored.reduce((totals, item) => {
    const current = {
      likes: visibleInteraction(item, "likes"),
      replies: visibleInteraction(item, "replies"),
      reposts: visibleInteraction(item, "reposts")
    };
    totals.likes += current.likes;
    totals.replies += current.replies;
    totals.reposts += current.reposts;
    if (current.likes + current.replies + current.reposts > 0) totals.recordsWithOneOrMore += 1;
    return totals;
  }, { recordsWithOneOrMore: 0, likes: 0, replies: 0, reposts: 0 });
  const incomingIds = validated.incomingIds;
  const missionIds = [...missionThirdPartyIds, ...missionConversationContextIds];

  return {
    schemaVersion: 1,
    account: "@urbanhermit",
    capturedAt: capture.capturedAt,
    acquisitionIntegrity: {
      captureSha256: sha256(protectedCaptureText),
      rawCapturePublished: false,
      boundary: "Digest supports integrity comparison without publishing a private locator or archive path."
    },
    population: {
      profileReported: capture.profile.reportedPosts,
      recoveredAccountItems: capture.items.length,
      accountAuthored: authored.length,
      externalSourceNativeReposts: reposted.length,
      recoveryGap: capture.profile.reportedPosts - capture.items.length,
      supplementalConversationContexts: capture.supplementalContexts.length,
      independentCompletePasses: capture.acquisitionVerification.passes.length,
      allPassesRecoveredSamePopulation: capture.acquisitionVerification.setsEqual,
      passStatusIdDigests: capture.acquisitionVerification.passes.map((pass) => ({
        passId: pass.id,
        distinctStatusIds: new Set(pass.statusIds).size,
        statusIdDigest: digestValues(pass.statusIds)
      })),
      range: [dates[0], dates.at(-1)],
      byYear,
      recoveredStatusIdDigest: digestValues(statusIds),
      accountAuthoredStatusIdDigest: digestValues(authored.map(statusId)),
      repostedStatusIdDigest: digestValues(reposted.map(statusId)),
      supplementalContextDigest: digestValues(capture.supplementalContexts.map(statusId)),
      boundary: "Complete for the capture-date live profile counter, not an account-owner export or deletion history."
    },
    sourceCirculation: {
      recordsWithExternalLinks: capture.items.filter((item) => normalizedExternalLinks(item).length).length,
      normalizedRecordLinkPairs: allLinks.length,
      distinctShortUrls: new Set(allLinks).size,
      accountAuthoredNormalizedRecordLinkPairs: authoredLinks.length,
      accountAuthoredDistinctShortUrls: new Set(authoredLinks).size,
      normalizedRecordLinkPairDigest: digestValues(capture.items.flatMap((item) =>
        normalizedExternalLinks(item).map((url) => `${statusId(item)}\t${url}`))),
      researchQueueDisposition: {
        status: "open",
        completeDistinctUrlInventoryProtected: true,
        bulkUrlInventoryPublished: false,
        boundary: "Most destinations remain unresolved or not close-read; selected public-safe sources are promoted individually rather than by adjacency."
      },
      boundary: "A posted destination documents circulation, not authorship, endorsement, readership, participation, partnership, or impact. Repeated identical anchors within one rendered card are normalized to one record-link pair."
    },
    missionSignals: {
      classificationSurface: "source-post body only; quoted-card text excluded",
      overlap: "Records may match more than one signal family.",
      counts: signalCounts,
      ruleManifestDigest: sha256(JSON.stringify(urbanhermitMissionSignalRules.map((rule) => ({ id: rule.id, pattern: rule.pattern.source, flags: rule.pattern.flags })))),
      boundary: "Retrieval signals describe records discussed or circulated, not work performed, priority, agreement, reach, or impact. A repost remains authored by its external source."
    },
    incomingStakeholderSearch: {
      query: capture.incomingSearch.query,
      yearWindows: capture.incomingSearch.yearlyWindows,
      recoveredPublicRecords: incomingIds.length,
      missionRelevantThirdPartyRecords: missionThirdPartyIds.size,
      missionRelevantThirdPartyAccounts: validated.missionAccounts.size,
      missionRelevantConversationContexts: missionConversationContextIds.size,
      redactedNonMissionPersonalOrNetworkRecords: incomingIds.length - missionIds.length,
      recoveredStatusIdDigest: digestValues(incomingIds),
      missionRelevantStatusIdDigest: digestValues(missionIds),
      stakeholderGroups: [
        "civic-design peers",
        "coalition and project accounts",
        "creative-technology and media collaborators",
        "neighborhood actors",
        "public-history collaborators"
      ],
      boundary: capture.incomingSearch.boundary
    },
    selectedSourceLeads,
    heldVisibleInteractionObservation: {
      capturedAt: capture.capturedAt,
      accountAuthoredRecordsWithOneOrMoreDisplayedInteraction: visible.recordsWithOneOrMore,
      displayedInteractionUnits: {
        likes: visible.likes,
        replies: visible.replies,
        reposts: visible.reposts,
        total: visible.likes + visible.replies + visible.reposts
      },
      status: "hold",
      boundary: "Dated volatile interface units, not unique people, reach, endorsement, conversion, attendance, or impact. Engagement displayed on external-source native reposts is excluded."
    },
    privacy: {
      status: "public-safe-minimized-ledger",
      omitted: [
        "raw post and quoted-card text",
        "per-item status IDs and URLs outside selected mission-relevant source leads",
        "per-item dates, mentions, hashtags, media labels, and interaction counters",
        "identities, dates, URLs, and metrics for nine non-mission personal or network records",
        "profile biography, historical contact details, ordinary-life context, and other people's unnecessary traces",
        "private analytics, direct messages, account settings, browser storage, and authentication state"
      ],
      rationale: "Retain complete evidence in Jamie's protected archive while publishing only reproducible aggregates, digests, selected public-safe sources, and bounded findings."
    }
  };
}

export function buildUrbanhermitPublicManifest(protectedCaptureText, ledgerText, ledger) {
  const generatorText = readFileSync(fileURLToPath(import.meta.url), "utf8");
  const classifierPath = fileURLToPath(
    new URL("./lib/urbanhermit-mission-classifier.mjs", import.meta.url)
  );
  const classifierText = readFileSync(classifierPath, "utf8");
  return {
    schemaVersion: 1,
    generatedAt: ledger.capturedAt,
    generator: "scripts/build-urbanhermit-x-public-ledger.mjs",
    generatorSha256: sha256(generatorText),
    classifier: "scripts/lib/urbanhermit-mission-classifier.mjs",
    classifierSha256: sha256(classifierText),
    nodeRuntime: process.version,
    captureSha256: sha256(protectedCaptureText),
    rawCapturePublished: false,
    publicLedger: defaultLedger,
    publicLedgerSha256: sha256(ledgerText),
    profileReportedPosts: ledger.population.profileReported,
    recoveredAccountItems: ledger.population.recoveredAccountItems,
    recoveryGap: ledger.population.recoveryGap,
    status: "complete-live-population-with-protected-source-and-minimized-public-ledger"
  };
}

function main() {
  const [protectedCapture, ledgerPath = defaultLedger,
    manifestPath = defaultManifest] = process.argv.slice(2);
  assert(
    protectedCapture,
    "usage: node scripts/build-urbanhermit-x-public-ledger.mjs <protected-capture> [ledger] [manifest]"
  );
  const protectedCaptureText = readFileSync(protectedCapture, "utf8");
  const ledger = buildUrbanhermitPublicLedger(protectedCaptureText);
  const ledgerText = `${JSON.stringify(ledger, null, 2)}\n`;
  const manifest = buildUrbanhermitPublicManifest(protectedCaptureText, ledgerText, ledger);
  writeFileSync(ledgerPath, ledgerText);
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ ledgerPath, manifestPath, publicLedgerSha256: manifest.publicLedgerSha256 }, null, 2));
}

if (process.argv[1]?.endsWith("build-urbanhermit-x-public-ledger.mjs")) main();
