#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { nycartcFacebookPostAudit } from "../apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts";
import {
  campaignPressDistinctSourceCount,
  campaignPressPlacementCount,
  campaignPressSourceIds
} from "../apps/www/src/data/knowledge-bank/campaignPress.ts";
import { hasWowlistFacebookPublicArtifactRisk } from "./lib/wowlist-facebook-guard.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const failures = [];
const warnings = [];

const requiredProofIds = [
  "career-operating-structure-14-years",
  "technical-operations-operating-backbone",
  "hje-modernization-stewardship",
  "hje-revenue-growth-contribution",
  "callnyc-civic-data-guidance",
  "fair-rent-campaign-memory",
  "fair-rent-source-map",
  "nyca-participation-system",
  "nyc-artist-coalition-civic-systems",
  "wowlist-community-platform",
  "sunday-dinner-196-participation-infrastructure",
  "kc-spaces-fund-digital-infrastructure",
  "kc-town-hall-public-benefit-documentation",
  "source-backed-team-memory-method"
];

const requiredWorkProofs = new Map([
  ["harry-j-epstein", ["hje-modernization-stewardship", "hje-revenue-growth-contribution"]],
  [
    "fair-rent-nyc",
    [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyca-campaign-press-architecture",
      "nyca-participation-system",
      "nyc-artist-coalition-civic-systems"
    ]
  ],
  ["callnyc", ["callnyc-civic-data-guidance"]],
  ["wowlist", ["wowlist-community-platform"]],
  ["196-sunday-dinner", ["sunday-dinner-196-participation-infrastructure"]],
  ["kc-town-hall", ["kc-town-hall-public-benefit-documentation"]]
]);

const publicSurfaces = new Set([
  "homepage",
  "resume",
  "technical-operations",
  "work-card",
  "case-study",
  "lab",
  "about"
]);

const proofPath = path.join(repoRoot, "apps/www/src/data/proofs.ts");
const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
const claimsPath = path.join(repoRoot, "docs/knowledge-bank/claims.md");
const docsRoot = path.join(repoRoot, "docs/knowledge-bank");
const campaignPressIndexPath = path.join(docsRoot, "projects/nyca-campaign-press-index.md");
const nycartcFacebookEventReportPath = path.join(
  docsRoot,
  "nycartc-facebook-events-2026-07-13.md"
);
const nycartcFacebookEventLedgerPath = path.join(
  docsRoot,
  "data/nycartc-public-facebook-event-ledger.json"
);
const nycartcFacebookEventLinkLedgerPath = path.join(
  docsRoot,
  "data/nycartc-public-facebook-event-link-ledger.json"
);
const nycartcFacebookEventCensusPath = path.join(
  docsRoot,
  "nycartc-facebook-event-census-2026-07-13.csv"
);
const personalWowlistFacebookEventReportPath = path.join(
  docsRoot,
  "personal-wowlist-facebook-events-2026-07-14.md"
);
const personalWowlistFacebookEventControlsPath = path.join(
  docsRoot,
  "data/personal-wowlist-facebook-event-controls.json"
);
const personalFacebookDisplayedHostCensusPath = path.join(
  docsRoot,
  "jamie-facebook-displayed-host-event-census-2026-07-14.csv"
);
const wowlistFacebookPostReportPath = path.join(
  docsRoot,
  "projects/wowlist-facebook-post-population-2026-07-14.md"
);
const wowlistFacebookPostLedgerPath = path.join(
  docsRoot,
  "data/wowlist-public-facebook-post-ledger.json"
);
const wowlistFacebookPostBatchPath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/wowlist-facebook-posts-batch-2026-07-14.ts"
);
const nycartcFacebookPostReportPath = path.join(
  docsRoot,
  "projects/nycartc-facebook-post-population-2026-07-14.md"
);
const nycartcFacebookPostLedgerPath = path.join(
  docsRoot,
  "data/nycartc-public-facebook-post-ledger.json"
);
const nycartcFacebookPostRouteLedgerPath = path.join(
  docsRoot,
  "data/nycartc-public-facebook-post-route-ledger.json"
);
let personalWowlistControls;
const structuredClaimsById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const sourcesById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(file) {
  return readFileSync(file, "utf8");
}

function walk(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function relative(file) {
  return path.relative(repoRoot, file);
}

function collectObjectKeys(value, keys = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectObjectKeys(item, keys);
    return keys;
  }
  if (!value || typeof value !== "object") return keys;

  for (const [key, item] of Object.entries(value)) {
    keys.push(key);
    collectObjectKeys(item, keys);
  }
  return keys;
}

function extractStrings(block, field) {
  const match = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`).exec(block);
  if (!match) return [];
  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function extractStringField(block, field) {
  return new RegExp(`${field}:\\s*"([^"]*)"`).exec(block)?.[1] ?? "";
}

function assertIncludes(text, expected, label) {
  if (!text.includes(expected)) fail(`${label} is missing ${expected}`);
}

function readJson(file, label) {
  try {
    return JSON.parse(read(file));
  } catch (error) {
    fail(`${label} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) fail(`${label} is ${JSON.stringify(actual)}; expected ${JSON.stringify(expected)}`);
}

function normalizedUrl(value) {
  try {
    const url = new URL(value);
    if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString();
  } catch {
    return null;
  }
}

function csvCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

if (campaignPressPlacementCount !== 46) {
  fail(`Campaign press corpus has ${campaignPressPlacementCount} placements; expected 46`);
}

if (!existsSync(nycartcFacebookEventLedgerPath)) {
  fail("NYC Artist Coalition Facebook event ledger is missing");
} else {
  const ledger = readJson(nycartcFacebookEventLedgerPath, "NYC Artist Coalition Facebook event ledger");
  if (ledger) {
    const records = Array.isArray(ledger.records) ? ledger.records : [];
    const recovered = records.filter((record) => record.recoveryStatus !== "unresolved-control-slot");
    const unresolved = records.filter((record) => record.recoveryStatus === "unresolved-control-slot");
    const recurring = recovered.filter((record) => record.isRecurringMeeting);
    const physicalRecurring = recurring.filter((record) => record.venueOrMode !== "Virtual");
    const virtualRecurring = recurring.filter((record) => record.venueOrMode === "Virtual");
    const physicalVenues = new Set(physicalRecurring.map((record) => record.venueOrMode));
    const ids = records.map((record) => record.slotId);
    const eventIds = recovered.map((record) => record.eventId);
    const sourceUrls = recovered.map((record) => record.sourceUrl);
    const responseValues = recovered
      .map((record) => record.responseValue)
      .filter((value) => Number.isFinite(value));

    assertEqual(ledger.accounting?.controlSlots, 34, "Facebook event control-slot count");
    assertEqual(records.length, 34, "Facebook event ledger row count");
    assertEqual(new Set(ids).size, 34, "Facebook event unique slot-ID count");
    assertEqual(new Set(eventIds).size, 33, "Facebook event unique event-ID count");
    assertEqual(new Set(sourceUrls).size, 33, "Facebook event unique source-URL count");
    assertEqual(ledger.accounting?.recoveredRecords, 33, "Facebook recovered-event count");
    assertEqual(recovered.length, 33, "Facebook recovered-event row count");
    assertEqual(ledger.accounting?.unresolvedSlots, 1, "Facebook unresolved-slot count");
    assertEqual(unresolved.length, 1, "Facebook unresolved-slot row count");

    for (const [year, expected] of Object.entries({ 2017: 17, 2018: 3, 2019: 6, 2020: 6, 2021: 1 })) {
      assertEqual(ledger.accounting?.yearCounts?.[year], expected, `Facebook ${year} event count`);
      assertEqual(
        recovered.filter((record) => record.date?.startsWith(`${year}-`)).length,
        expected,
        `Facebook ${year} row count`
      );
    }

    assertEqual(recurring.length, 12, "Facebook recurring-meeting row count");
    assertEqual(physicalRecurring.length, 10, "Facebook physical recurring-meeting count");
    assertEqual(physicalVenues.size, 10, "Facebook distinct recurring physical-venue count");
    assertEqual(virtualRecurring.length, 2, "Facebook virtual recurring-meeting count");

    const responseSignals = ledger.accounting?.responseSignals;
    for (const [field, expected] of Object.entries({
      displayed: 32,
      missing: 1,
      minimum: 9,
      maximum: 1700,
      atLeast100: 19,
      atLeast400: 9,
      atLeast1000: 3
    })) {
      assertEqual(responseSignals?.[field], expected, `Facebook response-signal ${field}`);
    }
    assertEqual(responseValues.length, responseSignals?.displayed, "Facebook derived response-display count");
    assertEqual(recovered.length - responseValues.length, responseSignals?.missing, "Facebook derived missing-response count");
    assertEqual(Math.min(...responseValues), responseSignals?.minimum, "Facebook derived minimum response");
    assertEqual(Math.max(...responseValues), responseSignals?.maximum, "Facebook derived maximum response");
    assertEqual(responseValues.filter((value) => value >= 100).length, responseSignals?.atLeast100, "Facebook derived 100-response threshold");
    assertEqual(responseValues.filter((value) => value >= 400).length, responseSignals?.atLeast400, "Facebook derived 400-response threshold");
    assertEqual(responseValues.filter((value) => value >= 1000).length, responseSignals?.atLeast1000, "Facebook derived 1,000-response threshold");
    for (const record of recovered) {
      if ((record.responseDisplay === null) !== (record.responseValue === null)) {
        fail(`Facebook event ${record.slotId} has inconsistent response display and numeric value`);
      }
    }
    if (!/not unique people, attendance[\s\S]*must not be summed/i.test(responseSignals?.boundary ?? "")) {
      fail("Facebook response-signal boundary must reject unique-person, attendance, and summed interpretations");
    }

    for (const [field, expected] of Object.entries({
      authenticatedUrlsOpened: 33,
      eventHeadersRecovered: 33,
      currentFullDetailModules: 28,
      currentHeaderOnlyUnavailableModules: 5
    })) {
      assertEqual(ledger.liveReplay?.[field], expected, `Facebook live-replay ${field}`);
    }
    const unavailableEventIds = ledger.liveReplay?.currentHeaderOnlyUnavailableEventIds ?? [];
    assertEqual(unavailableEventIds.length, 5, "Facebook header-only replay event-ID count");
    assertEqual(new Set(unavailableEventIds).size, 5, "Facebook unique header-only replay event-ID count");
    for (const eventId of unavailableEventIds) {
      if (!eventIds.includes(eventId)) fail(`Facebook header-only replay references unknown event ${eventId}`);
    }

    const unresolvedRecord = unresolved[0];
    for (const field of ["eventId", "date", "title", "venueOrMode", "eventFormat", "primaryProgram", "sourceUrl"]) {
      if (unresolvedRecord?.[field] !== null) fail(`Facebook unresolved slot must keep ${field} null`);
    }
    if (unresolvedRecord?.isRecurringMeeting !== false || unresolvedRecord?.pageRelationship !== "control-only") {
      fail("Facebook unresolved slot must not infer recurring-meeting or page-relationship metadata");
    }

    for (const record of recovered) {
      if (!/^https:\/\/www\.facebook\.com\/events\/\d+\/$/.test(record.sourceUrl ?? "")) {
        fail(`Facebook recovered event ${record.slotId} has an invalid public event URL`);
      }
    }

    if (!existsSync(nycartcFacebookEventCensusPath)) {
      fail("NYC Artist Coalition Facebook event census CSV is missing");
    } else {
      const header = [
        "slot_id",
        "event_id",
        "event_date",
        "event_title",
        "page_relationship",
        "venue_or_mode",
        "event_format",
        "primary_program",
        "response_display",
        "recovery_status",
        "source_url"
      ];
      const csvRows = records.map((record) => [
        record.slotId,
        record.eventId,
        record.date,
        record.title,
        record.pageRelationship,
        record.venueOrMode,
        record.eventFormat,
        record.primaryProgram,
        record.responseDisplay,
        record.recoveryStatus,
        record.sourceUrl
      ]);
      const expectedCsv = `${[header, ...csvRows].map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
      if (read(nycartcFacebookEventCensusPath) !== expectedCsv) {
        fail("NYC Artist Coalition Facebook event census CSV does not match the governed JSON ledger");
      }
    }
  }
}

if (!existsSync(nycartcFacebookEventLinkLedgerPath)) {
  fail("NYC Artist Coalition Facebook event outbound-link ledger is missing");
} else {
  const ledger = readJson(
    nycartcFacebookEventLinkLedgerPath,
    "NYC Artist Coalition Facebook event outbound-link ledger"
  );
  if (ledger) {
    const rows = Array.isArray(ledger.rows) ? ledger.rows : [];
    for (const [field, expected] of Object.entries({
      linkOccurrences: 61,
      normalizedUrlRows: 38,
      eventsWithOutboundLinks: 25,
      sourceArticles: 7,
      protectedRows: 1,
      researchNeededRows: 4
    })) {
      assertEqual(ledger.accounting?.[field], expected, `Facebook outbound-link ${field}`);
    }
    assertEqual(rows.length, 38, "Facebook outbound-link row count");
    assertEqual(new Set(rows.map((row) => row.rowId)).size, 38, "Facebook outbound-link unique row-ID count");
    assertEqual(rows.filter((row) => row.category === "published-article").length, 7, "Facebook article-route row count");
    assertEqual(rows.filter((row) => row.disposition === "protected").length, 1, "Facebook protected-link row count");
    assertEqual(rows.filter((row) => row.disposition === "research-needed").length, 4, "Facebook unresolved-link row count");
    assertEqual(
      rows.reduce((total, row) => total + row.occurrences, 0),
      ledger.accounting?.linkOccurrences,
      "Facebook derived outbound-link occurrence count"
    );
    const linkedEventIds = new Set(rows.flatMap((row) => row.eventIds));
    assertEqual(
      linkedEventIds.size,
      ledger.accounting?.eventsWithOutboundLinks,
      "Facebook derived linked-event count"
    );
    const governedEventIds = new Set(
      readJson(nycartcFacebookEventLedgerPath, "NYC Artist Coalition Facebook event ledger for link reconciliation")
        ?.records?.filter((record) => record.eventId)
        .map((record) => record.eventId) ?? []
    );
    for (const eventId of linkedEventIds) {
      if (!governedEventIds.has(eventId)) fail(`Facebook outbound-link ledger references unknown event ${eventId}`);
    }
    for (const row of rows) {
      if (!row.eventIds.length || !row.eventTitles.length) {
        fail(`Facebook outbound-link ${row.rowId} is missing its event relationship`);
      }
      if (!Number.isInteger(row.occurrences) || row.occurrences < 1) {
        fail(`Facebook outbound-link ${row.rowId} has an invalid occurrence count`);
      }
    }

    for (const row of rows.filter((item) => item.disposition === "protected" || item.host === "goo.gl")) {
      if (row.publicUrl !== null) fail(`Facebook protected/unresolved link ${row.rowId} exposes a locator`);
    }
    for (const row of rows) {
      if (/docs\.google\.com|drive\.google\.com|zoom\.us/i.test(row.publicUrl ?? "")) {
        fail(`Facebook link ${row.rowId} exposes a working-document or meeting-access URL`);
      }
    }
  }
}

if (!existsSync(nycartcFacebookEventReportPath)) {
  fail("NYC Artist Coalition Facebook event archival-production report is missing");
} else {
  const report = read(nycartcFacebookEventReportPath);
  for (const phrase of [
    "100 percent control-slot accounting, not 100 percent content recovery",
    "helped establish and produce",
    "not unique-person or attendance counts",
    "The pages are collective event surfaces",
    "held interpretive claim"
  ]) {
    assertIncludes(report, phrase, "NYC Artist Coalition Facebook event report");
  }
}

if (!existsSync(personalWowlistFacebookEventControlsPath)) {
  fail("Personal and WOW List Facebook event controls are missing");
} else {
  const controls = readJson(
    personalWowlistFacebookEventControlsPath,
    "Personal and WOW List Facebook event controls"
  );
  if (controls) {
    personalWowlistControls = controls;
    const association = controls.personalAssociationSurface ?? {};
    const hostedTab = controls.personalHostedEventsTab ?? {};
    const displayedJamie = controls.displayedJamieHostSubset ?? {};
    const wowlist = controls.wowlist ?? {};

    assertEqual(association.currentRecords, 502, "Personal Past events count");
    assertEqual(association.secondPassExactIdMatch, true, "Personal second-pass exact match");
    assertEqual(association.displayedHostAccounting?.jamie, 20, "Past events Jamie-host display count");
    assertEqual(association.displayedHostAccounting?.anotherHost, 482, "Past events other-host display count");
    assertEqual(
      association.displayedHostAccounting?.distinctHostLabelsIncludingUnresolved,
      295,
      "Past events distinct displayed-host label count"
    );
    assertEqual(
      Object.values(association.yearCounts ?? {}).reduce((sum, value) => sum + value, 0),
      502,
      "Personal Past events derived year total"
    );

    assertEqual(hostedTab.currentRecords, 21, "Personal hosted-tab record count");
    assertEqual(hostedTab.recoveredRecords, 21, "Personal hosted-tab recovered count");
    assertEqual(hostedTab.unresolvedRecords, 0, "Personal hosted-tab unresolved count");
    assertEqual(hostedTab.overlapWithAssociationSurface, 18, "Personal event-control overlap count");
    assertEqual(hostedTab.hostedTabOnlyRecords, 3, "Personal hosted-tab-only count");
    assertEqual(hostedTab.distinctRecordsAcrossBothTabs, 505, "Personal event-control union count");
    assertEqual(hostedTab.displayedHostAccounting?.jamie, 16, "Hosted-tab Jamie-host display count");
    assertEqual(hostedTab.displayedHostAccounting?.anotherHost, 5, "Hosted-tab other-host display count");
    assertEqual(
      Object.values(hostedTab.yearCounts ?? {}).reduce((sum, value) => sum + value, 0),
      21,
      "Personal hosted-tab derived year total"
    );

    assertEqual(displayedJamie.pastEventsCards, 20, "Displayed Jamie-host subset count");
    assertEqual(
      Object.values(displayedJamie.primaryFormCounts ?? {}).reduce((sum, value) => sum + value, 0),
      20,
      "Displayed Jamie-host primary-form total"
    );
    assertEqual(
      Object.values(displayedJamie.yearCounts ?? {}).reduce((sum, value) => sum + value, 0),
      20,
      "Displayed Jamie-host year total"
    );
    assertEqual(
      displayedJamie.unlabeledNumericDisplayQuality?.pagesWithAValueAcrossEitherAuthenticatedRun,
      8,
      "Displayed-host mutable-response page count"
    );
    assertEqual(displayedJamie.unlabeledNumericDisplayQuality?.minimumObserved, 5, "Displayed-host numeric-display minimum");
    assertEqual(displayedJamie.unlabeledNumericDisplayQuality?.maximumObserved, 128, "Displayed-host numeric-display maximum");

    assertEqual(wowlist.currentDisplayedRecords, 0, "WOW List current Facebook event count");
    assertEqual(wowlist.facebookSearchNumericRecords, 0, "WOW List Facebook search event count");
    assertEqual(wowlist.pastEventsControlMatches, 0, "WOW List 502-record Past events match count");
    assertEqual(wowlist.historicalDisposition, "not-recovered", "WOW List historical event disposition");

    const rawControls = read(personalWowlistFacebookEventControlsPath);
    if (/facebook\.com\/events\/\d+|\b\d{12,}\b/.test(rawControls)) {
      fail("Personal event controls expose record-level event identifiers");
    }
    const prohibitedRecordKeys = collectObjectKeys(controls).filter((key) =>
      /^(eventId|eventUrl|guests?|invitees?|comments?|addresses?|exactLocation|rawDescription)$/i.test(key)
    );
    if (prohibitedRecordKeys.length) {
      fail(`Personal event controls expose prohibited record-level fields: ${prohibitedRecordKeys.join(", ")}`);
    }
  }
}

if (!existsSync(personalFacebookDisplayedHostCensusPath)) {
  fail("Displayed Jamie-host Facebook event census is missing");
} else {
  const censusLines = read(personalFacebookDisplayedHostCensusPath).trimEnd().split("\n");
  const censusRows = censusLines.slice(1).map((line) => line.split(","));
  assertEqual(censusLines.length, 21, "Displayed Jamie-host census line count");
  assertEqual(
    censusLines[0],
    "subset_slot,source_surface,displayed_host,recovery_status,year,primary_form",
    "Displayed Jamie-host census header"
  );
  for (const [index, line] of censusLines.slice(1).entries()) {
    const columns = line.split(",");
    assertEqual(columns.length, 6, `Displayed Jamie-host census row ${index + 1} column count`);
    assertEqual(columns[1], "past-events", `Displayed Jamie-host census row ${index + 1} surface`);
    assertEqual(columns[2], "Jamie Burkart", `Displayed Jamie-host census row ${index + 1} host`);
    assertEqual(columns[3], "recovered", `Displayed Jamie-host census row ${index + 1} recovery state`);
    if (/https?:|facebook\.com|\b\d{12,}\b/.test(line)) {
      fail(`Displayed Jamie-host census row ${index + 1} exposes a record-level locator`);
    }
  }
  assertEqual(
    new Set(censusRows.map((columns) => columns[0])).size,
    censusRows.length,
    "Displayed Jamie-host census unique slot count"
  );
  if (personalWowlistControls) {
    const yearCounts = Object.fromEntries(
      Object.keys(personalWowlistControls.displayedJamieHostSubset.yearCounts).map((year) => [
        year,
        censusRows.filter((columns) => columns[4] === year).length
      ])
    );
    const primaryFormCounts = Object.fromEntries(
      Object.keys(personalWowlistControls.displayedJamieHostSubset.primaryFormCounts).map((form) => [
        form,
        censusRows.filter((columns) => columns[5] === form).length
      ])
    );
    assertEqual(
      JSON.stringify(yearCounts),
      JSON.stringify(personalWowlistControls.displayedJamieHostSubset.yearCounts),
      "Displayed Jamie-host CSV-derived year counts"
    );
    assertEqual(
      JSON.stringify(primaryFormCounts),
      JSON.stringify(personalWowlistControls.displayedJamieHostSubset.primaryFormCounts),
      "Displayed Jamie-host CSV-derived primary-form counts"
    );
  }
}

if (!existsSync(personalWowlistFacebookEventReportPath)) {
  fail("Personal and WOW List Facebook event archival-production report is missing");
} else {
  const report = read(personalWowlistFacebookEventReportPath);
  for (const phrase of [
    "505 distinct current event IDs",
    "Association does not establish attendance",
    "platform classification, not a reliable",
    "source route, not automatic corroboration",
    "not recovered",
    "Do not add a new visible portfolio claim"
  ]) {
    assertIncludes(report, phrase, "Personal and WOW List Facebook event report");
  }
}

if (!existsSync(wowlistFacebookPostLedgerPath)) {
  fail("WOW List Facebook post ledger is missing");
} else {
  const ledger = readJson(wowlistFacebookPostLedgerPath, "WOW List Facebook post ledger");
  if (ledger) {
    const records = Array.isArray(ledger.records) ? ledger.records : [];
    const slotIds = records.map((record) => record.slotId);
    const digests = records.map((record) => record.evidenceDigest);
    const destinationUrls = [...new Set(records.flatMap((record) => record.postedDestinationUrls ?? []))];
    const normalizedHosts = new Set(
      destinationUrls.map((url) => new URL(url).hostname.toLowerCase().replace(/^www\./, ""))
    );
    const wowlistUrls = destinationUrls.filter(
      (url) => new URL(url).hostname.toLowerCase().replace(/^www\./, "") === "wowlist.org"
    );

    assertEqual(records.length, 53, "WOW List Facebook current-post row count");
    assertEqual(new Set(slotIds).size, 53, "WOW List Facebook unique slot-ID count");
    assertEqual(new Set(digests).size, 53, "WOW List Facebook unique evidence-digest count");
    assertEqual(destinationUrls.length, 30, "WOW List Facebook distinct destination-URL count");
    assertEqual(normalizedHosts.size, 10, "WOW List Facebook normalized destination-host count");
    assertEqual(wowlistUrls.length, 20, "WOW List Facebook WOW List destination-URL count");

    for (const [index, record] of records.entries()) {
      const expectedSlotId = `current-${String(index + 1).padStart(3, "0")}`;
      assertEqual(record.slotId, expectedSlotId, `WOW List Facebook row ${index + 1} slot ID`);
      if (!/^[a-f0-9]{64}$/.test(record.evidenceDigest ?? "")) {
        fail(`WOW List Facebook ${record.slotId} lacks a valid SHA-256 evidence digest`);
      }
      assertEqual(
        record.sourcePreservation,
        "protected-capture",
        `WOW List Facebook ${record.slotId} source preservation`
      );
      if (!record.publicSummary || !record.primaryTheme || !(record.stakeholderGroups?.length >= 1)) {
        fail(`WOW List Facebook ${record.slotId} lacks a public summary, theme, or stakeholder group`);
      }
      for (const field of ["messages", "profiles", "labels", "buttons", "comments", "commenterIdentity", "rawText"]) {
        if (Object.hasOwn(record, field)) {
          fail(`WOW List Facebook ${record.slotId} exposes protected raw field ${field}`);
        }
      }
    }

    for (const [field, expected] of Object.entries({
      forwardTraversalRecords: 53,
      reverseTraversalRecords: 53,
      forwardOnlyRecords: 0,
      reverseOnlyRecords: 0,
      exactSetMatch: true,
      missionRelevantDestinationUrls: 30,
      normalizedDestinationHostnames: 10,
      wowlistDestinationUrls: 20,
      currentFollowerDisplay: 185,
      postsWithDisplayedLikes: 37,
      currentDisplayedLikeFloor: 81,
      largestSinglePostLikeDisplay: 13
    })) {
      assertEqual(ledger.accounting?.[field], expected, `WOW List Facebook accounting ${field}`);
    }
    if (!/not historical analytics[\s\S]*must not be used as a performance total/i.test(
      ledger.accounting?.engagementBoundary ?? ""
    )) {
      fail("WOW List Facebook engagement boundary must reject historical-analytics and performance-total interpretations");
    }
    if (!/SHA-256[\s\S]*protected canonical record/i.test(ledger.evidenceKeyMethod ?? "")) {
      fail("WOW List Facebook evidence-key method is missing or incomplete");
    }
    assertEqual(
      ledger.hostnameNormalization,
      "Lowercase each URL hostname and remove one leading www. before counting distinct hostnames.",
      "WOW List Facebook hostname-normalization rule"
    );
    assertIncludes(
      ledger.additionalControlBoundary ?? "",
      "Additional protected controls did not establish a lifetime denominator",
      "WOW List Facebook additional-control boundary"
    );

    const slotIdSet = new Set(slotIds);
    const corpusClaims = knowledgeBank.claims.filter(
      (claim) =>
        claim.id.startsWith("CLM-WOWLIST-FACEBOOK-") ||
        claim.id === "CLM-JAMIE-WOWLIST-SOCIAL-MANAGEMENT-MEMORY"
    );
    for (const claim of corpusClaims) {
      for (const evidence of claim.evidence) {
        for (const locator of evidence.locator?.match(/current-\d{3}/g) ?? []) {
          if (!slotIdSet.has(locator)) {
            fail(`${claim.id} references unknown WOW List Facebook locator ${locator}`);
          }
        }
      }
    }
  }
}

if (!existsSync(nycartcFacebookPostLedgerPath)) {
  fail("NYC Artist Coalition Facebook post ledger is missing");
} else {
  const ledger = readJson(
    nycartcFacebookPostLedgerPath,
    "NYC Artist Coalition Facebook post ledger"
  );
  if (ledger) {
    const records = Array.isArray(ledger.records) ? ledger.records : [];
    const recordKeys = [
      "form",
      "hasVisibleInteraction",
      "outboundUrlCount",
      "primaryTheme",
      "publicDetailStatus",
      "recordId",
      "sequenceNewestToOldest",
      "stakeholderGroupCount",
      "stakeholderGroups",
      "themeCount",
      "themes"
    ];
    const expectedForms = {
      "event-route": nycartcFacebookPostAudit.forms.eventRoutes,
      "standalone-post": nycartcFacebookPostAudit.forms.standalonePosts,
      "original-media-post": nycartcFacebookPostAudit.forms.originalMediaPosts,
      "reshared-story": nycartcFacebookPostAudit.forms.resharedStories,
      "source-or-resource-route": nycartcFacebookPostAudit.forms.sourceOrResourceRoutes
    };
    const expectedPrimaryThemes = {
      "nightlife-enforcement-and-governance": nycartcFacebookPostAudit.primaryThemes.nightlifeEnforcementAndGovernance,
      "general-coalition-communication": nycartcFacebookPostAudit.primaryThemes.generalCoalitionCommunication,
      "commercial-rent-and-tenancy": nycartcFacebookPostAudit.primaryThemes.commercialRentAndTenancy,
      "cultural-space-care": nycartcFacebookPostAudit.primaryThemes.culturalSpaceCare,
      "public-meetings-and-participation": nycartcFacebookPostAudit.primaryThemes.publicMeetingsAndParticipation,
      "funding-and-operational-resources": nycartcFacebookPostAudit.primaryThemes.fundingAndOperationalResources,
      "event-and-cultural-distribution": nycartcFacebookPostAudit.primaryThemes.eventAndCulturalDistribution,
      "press-and-public-knowledge": nycartcFacebookPostAudit.primaryThemes.pressAndPublicKnowledge,
      "equity-solidarity-and-mutual-aid": nycartcFacebookPostAudit.primaryThemes.equitySolidarityAndMutualAid
    };
    const expectedStakeholderGroups = {
      "NYC Council members and Council": nycartcFacebookPostAudit.stakeholderGroupOccurrences.nycCouncilMembersAndCouncil,
      "NYC cultural and nightlife agencies": nycartcFacebookPostAudit.stakeholderGroupOccurrences.nycCulturalAndNightlifeAgencies,
      "Cultural and advocacy partners": nycartcFacebookPostAudit.stakeholderGroupOccurrences.culturalAndAdvocacyPartners,
      "NYC business and enforcement agencies": nycartcFacebookPostAudit.stakeholderGroupOccurrences.nycBusinessAndEnforcementAgencies,
      "Press and public-information organizations": nycartcFacebookPostAudit.stakeholderGroupOccurrences.pressAndPublicInformationOrganizations
    };
    const expectedThemeOccurrences = {
      "nightlife-enforcement-and-governance": nycartcFacebookPostAudit.themeOccurrences.nightlifeEnforcementAndGovernance,
      "public-meetings-and-participation": nycartcFacebookPostAudit.themeOccurrences.publicMeetingsAndParticipation,
      "cultural-space-care": nycartcFacebookPostAudit.themeOccurrences.culturalSpaceCare,
      "commercial-rent-and-tenancy": nycartcFacebookPostAudit.themeOccurrences.commercialRentAndTenancy,
      "event-and-cultural-distribution": nycartcFacebookPostAudit.themeOccurrences.eventAndCulturalDistribution,
      "funding-and-operational-resources": nycartcFacebookPostAudit.themeOccurrences.fundingAndOperationalResources,
      "press-and-public-knowledge": nycartcFacebookPostAudit.themeOccurrences.pressAndPublicKnowledge,
      "equity-solidarity-and-mutual-aid": nycartcFacebookPostAudit.themeOccurrences.equitySolidarityAndMutualAid
    };
    assertEqual(ledger.schemaVersion, 3, "NYC Artist Coalition Facebook post ledger schema");
    assertEqual(
      ledger.population?.terminalTraversals,
      nycartcFacebookPostAudit.terminalTraversals,
      "NYC Artist Coalition Facebook terminal traversal count"
    );
    assertEqual(
      ledger.population?.protectedIdentitySetSha256,
      nycartcFacebookPostAudit.protectedIdentitySetSha256,
      "NYC Artist Coalition Facebook protected identity-set digest"
    );
    assertEqual(
      ledger.population?.distinctSurvivingPosts,
      nycartcFacebookPostAudit.ownerTimelineRecords,
      "NYC Artist Coalition Facebook post population"
    );
    assertEqual(records.length, nycartcFacebookPostAudit.ownerTimelineRecords, "NYC Artist Coalition Facebook disposition row count");
    assertEqual(new Set(records.map((record) => record.recordId)).size, records.length, "NYC Artist Coalition Facebook unique disposition IDs");
    assertEqual(new Set(records.map((record) => record.sequenceNewestToOldest)).size, records.length, "NYC Artist Coalition Facebook unique disposition sequence values");
    for (const [index, record] of records.entries()) {
      assertEqual(
        Object.keys(record).sort().join("|"),
        recordKeys.join("|"),
        `NYC Artist Coalition Facebook row ${index + 1} public-safe schema`
      );
      assertEqual(
        record.sequenceNewestToOldest,
        index + 1,
        `NYC Artist Coalition Facebook row ${index + 1} sequence`
      );
      if (!/^nycartc-fb-[0-9a-f]{16}$/.test(record.recordId ?? "")) {
        fail(`NYC Artist Coalition Facebook row ${index + 1} has an invalid public-safe record ID`);
      }
      if (record.publicDetailStatus !== "aggregate-only") {
        fail(`NYC Artist Coalition Facebook row ${index + 1} must remain aggregate-only`);
      }
      if (!Array.isArray(record.themes) || !Array.isArray(record.stakeholderGroups)) {
        fail(`NYC Artist Coalition Facebook row ${index + 1} must retain anonymous classification arrays`);
      }
      assertEqual(record.themes?.length, record.themeCount, `NYC Artist Coalition Facebook row ${index + 1} theme count`);
      assertEqual(record.stakeholderGroups?.length, record.stakeholderGroupCount, `NYC Artist Coalition Facebook row ${index + 1} stakeholder count`);
      if ((record.themes ?? []).some((theme) => !(theme in expectedThemeOccurrences))) {
        fail(`NYC Artist Coalition Facebook row ${index + 1} has an unknown theme`);
      }
      if ((record.stakeholderGroups ?? []).some((group) => !(group in expectedStakeholderGroups))) {
        fail(`NYC Artist Coalition Facebook row ${index + 1} has an unknown stakeholder group`);
      }
      for (const field of ["themeCount", "stakeholderGroupCount", "outboundUrlCount"]) {
        if (!Number.isInteger(record[field]) || record[field] < 0) {
          fail(`NYC Artist Coalition Facebook row ${index + 1} has invalid ${field}`);
        }
      }
    }
    assertEqual(
      records.filter((record) => record.hasVisibleInteraction).length,
      nycartcFacebookPostAudit.recordsWithVisibleInteraction,
      "NYC Artist Coalition Facebook records with visible interaction"
    );
    for (const [form, expected] of Object.entries(expectedForms)) {
      assertEqual(ledger.forms?.[form], expected, `NYC Artist Coalition Facebook declared ${form} count`);
      assertEqual(records.filter((record) => record.form === form).length, expected, `NYC Artist Coalition Facebook row-derived ${form} count`);
    }
    for (const [theme, expected] of Object.entries(expectedPrimaryThemes)) {
      assertEqual(ledger.primaryThemes?.[theme], expected, `NYC Artist Coalition Facebook declared ${theme} count`);
      assertEqual(records.filter((record) => record.primaryTheme === theme).length, expected, `NYC Artist Coalition Facebook row-derived ${theme} count`);
    }
    for (const [theme, expected] of Object.entries(expectedThemeOccurrences)) {
      assertEqual(ledger.themeOccurrences?.[theme], expected, `NYC Artist Coalition Facebook declared ${theme} occurrence count`);
      assertEqual(records.filter((record) => (record.themes ?? []).includes(theme)).length, expected, `NYC Artist Coalition Facebook row-derived ${theme} occurrence count`);
    }
    for (const [group, expected] of Object.entries(expectedStakeholderGroups)) {
      assertEqual(ledger.stakeholderRouting?.recordOccurrences?.[group], expected, `NYC Artist Coalition Facebook declared ${group} count`);
      assertEqual(records.filter((record) => (record.stakeholderGroups ?? []).includes(group)).length, expected, `NYC Artist Coalition Facebook row-derived ${group} count`);
    }
    assertEqual(
      records.reduce((total, record) => total + record.outboundUrlCount, 0),
      nycartcFacebookPostAudit.outboundLinkOccurrences,
      "NYC Artist Coalition Facebook row-derived outbound-link count"
    );
    assertEqual(
      ledger.destinationInventory?.normalizedPublicSafeRoutes,
      nycartcFacebookPostAudit.normalizedPublicSafeRoutes,
      "NYC Artist Coalition Facebook normalized public-safe route count"
    );
    assertEqual(
      ledger.destinationInventory?.protectedRoutes,
      2,
      "NYC Artist Coalition Facebook protected route count"
    );
    for (const [field, expected] of Object.entries({
      reactions: nycartcFacebookPostAudit.reactions,
      comments: nycartcFacebookPostAudit.comments,
      shares: nycartcFacebookPostAudit.shares
    })) {
      assertEqual(
        ledger.visibleInteractionSnapshot?.datedAggregateFloor?.[field],
        expected,
        `NYC Artist Coalition Facebook visible ${field} floor`
      );
      const frequencies = ledger.visibleInteractionSnapshot?.unlinkableValueFrequencies?.[field] ?? [];
      if (
        !Array.isArray(frequencies) ||
        frequencies.some(
          (entry) =>
            !Number.isInteger(entry.value) ||
            entry.value < 0 ||
            !Number.isInteger(entry.recordCount) ||
            entry.recordCount < 1
        )
      ) {
        fail(`NYC Artist Coalition Facebook ${field} histogram is invalid`);
      } else {
        assertEqual(
          frequencies.reduce((total, entry) => total + entry.recordCount, 0),
          records.length,
          `NYC Artist Coalition Facebook ${field} histogram population`
        );
        assertEqual(
          frequencies.reduce((total, entry) => total + entry.value * entry.recordCount, 0),
          expected,
          `NYC Artist Coalition Facebook histogram-derived ${field} floor`
        );
      }
    }
    const publicDispositionDigest = createHash("sha256")
      .update(records.map((record) => record.recordId).sort().join("\n"))
      .digest("hex");
    assertEqual(
      ledger.population?.publicDispositionSetSha256,
      publicDispositionDigest,
      "NYC Artist Coalition Facebook public disposition-set digest"
    );
    assertEqual(
      ledger.population?.publicDispositionDigestMethod,
      "SHA-256 of the 444 sorted public recordId values joined by a line feed, with no trailing line feed.",
      "NYC Artist Coalition Facebook public disposition-set digest method"
    );
    if (ledger.population?.exactIdentitySetMatch !== true) {
      fail("NYC Artist Coalition Facebook post traversals must retain an exact identity-set match");
    }
    if (!/not a native Meta export[\s\S]*lifetime total/i.test(ledger.population?.completenessBoundary ?? "")) {
      fail("NYC Artist Coalition Facebook post ledger must preserve native-export and lifetime boundaries");
    }
    if (!/not historical analytics[\s\S]*unique people[\s\S]*impact/i.test(ledger.visibleInteractionSnapshot?.boundary ?? "")) {
      fail("NYC Artist Coalition Facebook response snapshot must reject historical, unique-person, and impact interpretations");
    }
  }
}

if (!existsSync(nycartcFacebookPostRouteLedgerPath)) {
  fail("NYC Artist Coalition Facebook posted-route ledger is missing");
} else {
  const ledger = readJson(
    nycartcFacebookPostRouteLedgerPath,
    "NYC Artist Coalition Facebook posted-route ledger"
  );
  if (ledger) {
    const rows = Array.isArray(ledger.rows) ? ledger.rows : [];
    const routeKeys = [
      "category",
      "disposition",
      "interpretationBoundary",
      "occurrences",
      "publicUrl",
      "routeId",
      "sourceId"
    ];
    assertEqual(ledger.schemaVersion, 2, "NYC Artist Coalition Facebook route-ledger schema");
    assertEqual(rows.length, nycartcFacebookPostAudit.normalizedPublicSafeRoutes, "NYC Artist Coalition Facebook normalized posted-route count");
    assertEqual(new Set(rows.map((row) => row.routeId)).size, rows.length, "NYC Artist Coalition Facebook unique posted-route IDs");
    assertEqual(
      rows.reduce((total, row) => total + row.occurrences, 0),
      nycartcFacebookPostAudit.outboundLinkOccurrences,
      "NYC Artist Coalition Facebook posted-route occurrence accounting"
    );
    assertEqual(
      rows.filter((row) => row.disposition === "protected").length,
      2,
      "NYC Artist Coalition Facebook protected historical route count"
    );
    if (rows.some((row) => row.disposition === "protected" && row.publicUrl !== null)) {
      fail("NYC Artist Coalition Facebook protected historical routes must not expose URLs");
    }
    assertEqual(
      ledger.accounting?.sourceRecords,
      rows.filter((row) => row.sourceId !== null).length,
      "NYC Artist Coalition Facebook route source-record accounting"
    );
    for (const [index, row] of rows.entries()) {
      assertEqual(
        Object.keys(row).sort().join("|"),
        routeKeys.join("|"),
        `NYC Artist Coalition Facebook route ${index + 1} public-safe schema`
      );
      if (row.publicUrl !== null) {
        const publicUrl = normalizedUrl(row.publicUrl);
        if (!publicUrl) fail(`NYC Artist Coalition Facebook route ${row.routeId} has an invalid public URL`);
        if (/(?:docs|drive)\.google\.com|zoom\.us|[?&](?:auth|access_token|key|signature|token)=/i.test(row.publicUrl)) {
          fail(`NYC Artist Coalition Facebook route ${row.routeId} exposes a protected or credentialed URL`);
        }
      }
      if (row.sourceId !== null) {
        const source = sourcesById.get(row.sourceId);
        if (!source) {
          fail(`NYC Artist Coalition Facebook route ${row.routeId} references unknown source ${row.sourceId}`);
        } else if (normalizedUrl(source.canonicalUrl) !== normalizedUrl(row.publicUrl)) {
          fail(`NYC Artist Coalition Facebook route ${row.routeId} does not match ${row.sourceId}'s canonical URL`);
        }
      }
    }
    if (rows.some((row) => !/not automatic corroboration[\s\S]*impact/i.test(row.interpretationBoundary ?? ""))) {
      fail("NYC Artist Coalition Facebook posted routes must preserve their interpretation boundary");
    }
  }
}

if (!existsSync(nycartcFacebookPostReportPath)) {
  fail("NYC Artist Coalition Facebook post archival-production report is missing");
} else {
  const report = read(nycartcFacebookPostReportPath);
  for (const artifactPath of [
    "apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts",
    "docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
    "docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
    "docs/knowledge-bank/projects/project-social-accounts-2026-07-14.md",
    "scripts/tests/nycartc-facebook-guard.test.mjs"
  ]) {
    assertIncludes(report, artifactPath, "NYC Artist Coalition Facebook durable-artifact list");
    if (!existsSync(path.join(repoRoot, artifactPath))) {
      fail(`NYC Artist Coalition Facebook report references missing artifact ${artifactPath}`);
    }
  }
  const closeReadSourceIds = [
    "SRC-FB-NYCAC-CABARET-LAW-CULTURE-POST",
    "SRC-FB-NYCAC-TALKS-NOT-RAIDS-POST",
    "SRC-FB-NYCAC-COVID-KNOW-YOUR-RIGHTS-VIDEO"
  ];
  const closeReadUrls = closeReadSourceIds.map((sourceId) => {
    const source = sourcesById.get(sourceId);
    if (!source?.canonicalUrl) {
      fail(`NYC Artist Coalition Facebook report source ${sourceId} is missing a canonical URL`);
      return null;
    }
    assertIncludes(report, source.canonicalUrl, "NYC Artist Coalition Facebook close-read source");
    return normalizedUrl(source.canonicalUrl);
  });
  const reportPostUrls = [
    ...report.matchAll(/https:\/\/www\.facebook\.com\/(?:photo\/\?fbid=\d+&set=a\.\d+|nycartc\/videos\/\d+\/)/g)
  ].map((match) => normalizedUrl(match[0]));
  assertEqual(reportPostUrls.length, 3, "NYC Artist Coalition Facebook close-read post-URL count");
  assertEqual(
    [...new Set(reportPostUrls)].sort().join("|"),
    closeReadUrls.filter(Boolean).sort().join("|"),
    "NYC Artist Coalition Facebook close-read source graph"
  );
}

if (!existsSync(wowlistFacebookPostReportPath)) {
  fail("WOW List Facebook post archival-production report is missing");
} else {
  const report = read(wowlistFacebookPostReportPath);
  for (const phrase of [
    "Complete current-surface accounting; partial historical recovery",
    "SHA-256 evidence digest",
    "not a native Meta export",
    "outbound civic routing",
    "retrieval-state snapshot",
    "Jamie recalls managing WOW List's social presence",
    "retrieval hypotheses, not identity",
    "Do not add a new visible portfolio claim"
  ]) {
    assertIncludes(report, phrase, "WOW List Facebook post report");
  }
  if (/Jamie retains authenticated Page access|community-governed event/i.test(report)) {
    fail("WOW List Facebook post report exposes account access or overstates community governance");
  }
}

if (existsSync(wowlistFacebookPostBatchPath) && existsSync(wowlistFacebookPostLedgerPath) && existsSync(wowlistFacebookPostReportPath)) {
  const publicArtifactText = [
    read(wowlistFacebookPostBatchPath),
    read(wowlistFacebookPostLedgerPath),
    read(wowlistFacebookPostReportPath)
  ].join("\n");
  if (hasWowlistFacebookPublicArtifactRisk(publicArtifactText)) {
    fail("WOW List Facebook public artifacts contain overbroad governance, participation, or account-state wording");
  }
}

const selectedPersonalEventSourceIds = [
  "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
  "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
  "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
  "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
  "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
  "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
  "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
  "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
  "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017"
];
for (const sourceId of selectedPersonalEventSourceIds) {
  const source = sourcesById.get(sourceId);
  if (!source) {
    fail(`Selected personal Facebook event source is missing: ${sourceId}`);
    continue;
  }
  if (source.author) fail(`${sourceId} converts a displayed Facebook host label into author metadata`);
  if (!source.publicCitation.includes("displaying 'Event by Jamie Burkart'")) {
    fail(`${sourceId} must preserve the literal displayed-host label in its citation`);
  }
}

const micropopRouteSourceIds = [
  "SRC-MICROPOP-POSTED-IMAGINED-COMMUNITIES",
  "SRC-MICROPOP-POSTED-LASTFM-FAN-GRAPH",
  "SRC-MICROPOP-POSTED-KCDIY"
];
const micropopIntake = knowledgeBank.intakeRecords.find(
  (record) => record.id === "INTAKE-2026-07-14-MICROPOP-POSTED-DESTINATIONS"
);
for (const sourceId of micropopRouteSourceIds) {
  if (!sourcesById.has(sourceId)) fail(`Micropop posted destination is missing: ${sourceId}`);
  if (!micropopIntake?.sourceIds.includes(sourceId)) {
    fail(`Micropop posted destination lacks governed intake routing: ${sourceId}`);
  }
}

const wowlistLiveClaim = structuredClaimsById.get("CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026");
const wowlistHistoryClaim = structuredClaimsById.get(
  "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026"
);
assertEqual(wowlistLiveClaim?.status, "confirmed-with-boundary", "WOW List live-control claim status");
assertEqual(wowlistHistoryClaim?.status, "not-recovered", "WOW List historical-recovery claim status");

const personalAssociationClaim = structuredClaimsById.get(
  "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026"
);
if (
  !personalAssociationClaim?.evidence.some(
    (item) => item.sourceId === "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026"
  )
) {
  fail("Personal event-control union claim lacks its hosted-tab evidence edge");
}

const personalPracticeClaim = structuredClaimsById.get(
  "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"
);
if (
  !personalPracticeClaim?.evidence.some(
    (item) =>
      item.sourceId === "SRC-JAMIE-FACEBOOK-DISPLAYED-HOST-PRACTICE-RUN-2026" &&
      item.supports.some((support) => /displayed-host population and five-form classification/i.test(support))
  )
) {
  fail("Displayed-host practice claim lacks its population-and-classification evidence edge");
}

if (campaignPressDistinctSourceCount !== 45) {
  fail(`Campaign press corpus has ${campaignPressDistinctSourceCount} distinct articles; expected 45`);
}

for (const [campaign, sourceIds] of Object.entries(campaignPressSourceIds)) {
  for (const sourceId of sourceIds) {
    const source = sourcesById.get(sourceId);
    if (!source) {
      fail(`${campaign} press corpus references missing source ${sourceId}`);
    } else if (source.kind !== "published-article") {
      fail(`${campaign} press corpus source ${sourceId} is not a published article`);
    }
  }
}

const expectedCampaignPressCounts = {
  "let-nyc-dance": 21,
  "talks-not-raids": 7,
  "save-nyc-spaces": 8,
  "fair-rent-nyc": 10
};
for (const [campaign, expectedCount] of Object.entries(expectedCampaignPressCounts)) {
  const actualCount = campaignPressSourceIds[campaign]?.length;
  if (actualCount !== expectedCount) {
    fail(`${campaign} press corpus has ${actualCount} placements; expected ${expectedCount}`);
  }
}

if (!existsSync(campaignPressIndexPath)) {
  fail("docs/knowledge-bank/projects/nyca-campaign-press-index.md is missing");
} else {
  const campaignPressIndex = read(campaignPressIndexPath);
  for (const sourceId of new Set(Object.values(campaignPressSourceIds).flat())) {
    if (!campaignPressIndex.includes(sourceId)) {
      fail(`Campaign press index omits ${sourceId}`);
    }
  }
}

if (!existsSync(proofPath)) {
  fail("apps/www/src/data/proofs.ts is missing");
}

if (!existsSync(claimsPath)) {
  fail("docs/knowledge-bank/claims.md is missing");
}

if (existsSync(path.join(repoRoot, "docs/proofs-bank.md")) && existsSync(claimsPath)) {
  fail("docs/proofs-bank.md conflicts with docs/knowledge-bank/claims.md; use one canonical claim register");
}

const blockedRouteDirs = [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/public-claims"
];

for (const routeDir of blockedRouteDirs) {
  if (existsSync(path.join(repoRoot, routeDir))) {
    fail(`${routeDir} must not exist as a public route`);
  }
}

let proofSource = "";
let proofIds = [];
const proofBlocks = new Map();

if (existsSync(proofPath)) {
  proofSource = read(proofPath);

  if (/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw-otter|otter(?:\.ai|_ai)|\.docx|\.xlsx/i.test(proofSource)) {
    fail("apps/www/src/data/proofs.ts contains a private path or private source marker");
  }

  if (!/export type SupportLevel\s*=/.test(proofSource)) {
    fail("Proof data is missing SupportLevel type");
  }

  for (const match of proofSource.matchAll(/\{\n\s+id:\s*"([^"]+)"[\s\S]*?\n\s+\}/g)) {
    const [, id] = match;
    proofIds.push(id);
    proofBlocks.set(id, match[0]);
  }

  const uniqueIds = new Set(proofIds);
  if (uniqueIds.size !== proofIds.length) {
    const duplicates = proofIds.filter((id, index) => proofIds.indexOf(id) !== index);
    fail(`Duplicate proof IDs: ${[...new Set(duplicates)].join(", ")}`);
  }

  for (const id of requiredProofIds) {
    if (!uniqueIds.has(id)) fail(`Missing required proof claim: ${id}`);
  }

  for (const [id, block] of proofBlocks.entries()) {
    const status = extractStringField(block, "status");
    const supportLevel = extractStringField(block, "supportLevel");
    const evidenceClasses = extractStrings(block, "evidenceClass");
    const surfaces = extractStrings(block, "surfaces");
    const structuredClaimIds = extractStrings(block, "structuredClaimIds");
    const publicFieldBundle = [
      "publicWording",
      "shortWording",
      "detailedPublicWording",
      "sourceBasis",
      "sourceNote",
      "whyItMatters"
    ]
      .map((field) => extractStringField(block, field))
      .join(" ");

    for (const field of [
      "status",
      "supportLevel",
      "publicWording",
      "sourceBasis",
      "guardrail",
      "lastReviewed"
    ]) {
      if (!new RegExp(`${field}:`).test(block)) fail(`${id} is missing ${field}`);
    }

    if (!["ready", "careful", "pending", "private"].includes(status)) {
      fail(`${id} has invalid status: ${status || "missing"}`);
    }

    if (!["strong", "moderate", "careful", "pending"].includes(supportLevel)) {
      fail(`${id} has invalid supportLevel: ${supportLevel || "missing"}`);
    }

    if (!evidenceClasses.length) fail(`${id} is missing evidenceClass`);
    if (!extractStrings(block, "doNotSay").length) fail(`${id} is missing doNotSay`);
    if (!extractStrings(block, "protectedBoundaries").length) {
      fail(`${id} is missing protectedBoundaries`);
    }
    if (!surfaces.length) fail(`${id} is missing surfaces`);

    for (const structuredClaimId of structuredClaimIds) {
      const structuredClaim = structuredClaimsById.get(structuredClaimId);
      if (!structuredClaim) {
        fail(`${id} references missing structured claim ${structuredClaimId}`);
      } else if (!structuredClaim.proofClaimIds.includes(id)) {
        fail(`${id} and ${structuredClaimId} do not reference each other`);
      }
    }

    if ((status === "pending" || status === "private") && surfaces.some((surface) => publicSurfaces.has(surface))) {
      fail(`${id} is pending/private but projected to a public surface`);
    }

    if (status === "ready" && /TODO|approval required/i.test(block)) {
      fail(`${id} is ready but contains unresolved approval language`);
    }

    if (status === "careful") warn(`${id} is careful and must keep its guardrail in public copy`);

    if (id === "source-backed-team-memory-method" && /Jonathan Marmor|pricing|private transcript|private company/i.test(publicFieldBundle)) {
      fail("source-backed-team-memory-method exposes private collaborator, pricing, transcript, or company context in public fields");
    }
  }
}

for (const claim of knowledgeBank.claims) {
  for (const proofClaimId of claim.proofClaimIds) {
    const proofBlock = proofBlocks.get(proofClaimId);
    if (!proofBlock) {
      fail(`${claim.id} references missing proof claim ${proofClaimId}`);
      continue;
    }
    if (!extractStrings(proofBlock, "structuredClaimIds").includes(claim.id)) {
      fail(`${claim.id} and ${proofClaimId} do not reference each other`);
    }
  }
}

if (existsSync(claimsPath)) {
  const claimsSource = read(claimsPath);

  for (const id of proofIds) {
    if (!claimsSource.includes(`## ${id}`)) fail(`claims.md is missing ${id}`);
  }

  const claimHeadings = [...claimsSource.matchAll(/^##\s+([a-z0-9-]+)/gm)];
  claimHeadings.forEach((match, index) => {
    const id = match[1];
    const nextHeading = claimHeadings[index + 1]?.index ?? claimsSource.length;
    const block = claimsSource.slice(match.index, nextHeading);
    for (const field of [
      "**Status:**",
      "**Support level:**",
      "**Evidence class:**",
      "**Public wording:**",
      "**Detailed public-safe wording:**",
      "**Where to project:**",
      "**Why it matters:**",
      "**Guardrail:**",
      "**Do not say:**",
      "**Protected boundaries:**",
      "**Review owner:**",
      "**Last reviewed:**"
    ]) {
      if (!block.includes(field)) fail(`${id} in claims.md is missing ${field}`);
    }
  });
}

if (existsSync(workPath)) {
  const workSource = read(workPath);
  const allProofIds = new Set(proofIds);

  for (const match of workSource.matchAll(/proofBankIds:\s*\[([\s\S]*?)\]/g)) {
    const ids = [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
    for (const id of ids) {
      if (!allProofIds.has(id)) fail(`work.ts references missing proof claim: ${id}`);
    }
  }

  for (const slugMatch of workSource.matchAll(/slug:\s*"([^"]+)"/g)) {
    const slug = slugMatch[1];
    const nextSlugIndex = workSource.indexOf("\n    slug:", slugMatch.index + 1);
    const block = workSource.slice(
      Math.max(0, workSource.lastIndexOf("\n  {", slugMatch.index)),
      nextSlugIndex === -1 ? workSource.indexOf("\n] satisfies", slugMatch.index) : nextSlugIndex
    );

    if (!/proofBankIds:\s*\[/.test(block)) {
      fail(`${slug} is missing proofBankIds`);
    }

    const required = requiredWorkProofs.get(slug) ?? [];
    for (const id of required) {
      assertIncludes(block, `"${id}"`, `${slug} proofBankIds`);
    }

    if (/(2x|30\+|1,800\+|16,000\+|300\+|20\+|\$490,539)/.test(block) && !/proofBankIds:\s*\[[\s\S]*?"[^"]+"/.test(block)) {
      fail(`${slug} includes metric-bearing evidence without proofBankIds`);
    }
  }
}

for (const file of walk(docsRoot)) {
  if (!/\.(md|mdx|txt)$/i.test(file)) continue;

  const content = read(file);
  if (/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|otter\.ai\.txt|\.docx|\.xlsx/i.test(content)) {
    fail(`${relative(file)} contains a private path, raw-source filename, or office-source marker`);
  }
}

for (const requiredDoc of [
  "README.md",
  "lifecycle.md",
  "chad-lens.md",
  "approval-register.md",
  "claims.md",
  "proofs.md",
  "sources.md",
  "projection-map.md",
  "publishing-governance.md",
  "launch-blockers.md",
  "review-checklist.md",
  "anti-claims.md",
  "public-safety.md",
  "opportunities/oti-technical-operations.md",
  "opportunities/source-backed-team-memory.md"
]) {
  const absolute = path.join(docsRoot, requiredDoc);
  if (!existsSync(absolute) || !statSync(absolute).size) {
    fail(`docs/knowledge-bank/${requiredDoc} is missing or empty`);
  }
}

if (warnings.length) {
  console.warn("Knowledge-bank warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Knowledge-bank check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Knowledge-bank check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`
);
