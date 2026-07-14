#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressDistinctSourceCount,
  campaignPressPlacementCount,
  campaignPressSourceIds
} from "../apps/www/src/data/knowledge-bank/campaignPress.ts";

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
