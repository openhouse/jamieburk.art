#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const includesAll = (source, values) => values.every((value) => source.includes(value));

const ledgerPath =
  "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.json";
const ledgerText = read(ledgerPath);
const ledger = JSON.parse(ledgerText);
const manifest = JSON.parse(read(
  "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.manifest.json"
));
const receipt = read("docs/knowledge-bank/runs/2026-07-15-urbanhermit-x-full-population.md");
const projectNote = read("docs/knowledge-bank/projects/urbanhermit.md");
const projectionMap = read("docs/knowledge-bank/projection-map.md");
const claimsDoc = read("docs/knowledge-bank/claims.md");
const urbanhermitModule = read("apps/www/src/data/knowledge-bank/urbanhermit-x-full-population-2026-07-15.ts");
const ledgerBuilder = read("scripts/build-urbanhermit-x-public-ledger.mjs");
const missionClassifier = read("scripts/lib/urbanhermit-mission-classifier.mjs");
const gitignore = read(".gitignore");
const docs = `${receipt}\n${projectNote}\n${projectionMap}\n${claimsDoc}`.replace(/\s+/g, " ");

const checks = [];
function check(dimension, label, points, passes) {
  checks.push({ dimension, label, points, passes: Boolean(passes) });
}

check("Population", "Three independent passes reconcile every live profile-counted record", 15,
  ledger.account === "@urbanhermit" &&
  ledger.population.profileReported === 434 &&
  ledger.population.recoveredAccountItems === 434 &&
  ledger.population.recoveryGap === 0 &&
  ledger.population.accountAuthored === 353 &&
  ledger.population.externalSourceNativeReposts === 81 &&
  ledger.population.independentCompletePasses === 3 &&
  ledger.population.allPassesRecoveredSamePopulation === true &&
  ledger.population.passStatusIdDigests.length === 3 &&
  ledger.population.passStatusIdDigests.every((pass) =>
    pass.distinctStatusIds === 434 &&
    pass.statusIdDigest === ledger.population.recoveredStatusIdDigest) &&
  includesAll(docs, ["100% of the live profile-counted population", "account-owner X Archive"]));

check("Source inventory", "Posted-source and mission-signal totals are explicit and bounded", 15,
  ledger.sourceCirculation.recordsWithExternalLinks === 277 &&
  ledger.sourceCirculation.normalizedRecordLinkPairs === 345 &&
  ledger.sourceCirculation.distinctShortUrls === 321 &&
  ledger.sourceCirculation.accountAuthoredDistinctShortUrls === 277 &&
  ledger.sourceCirculation.researchQueueDisposition.status === "open" &&
  ledger.sourceCirculation.researchQueueDisposition.bulkUrlInventoryPublished === false &&
  JSON.stringify(ledger.missionSignals.counts) === JSON.stringify({
    "community-platforms-and-gatherings": 35,
    "civic-participation-and-service": 8,
    "cultural-space-advocacy": 45,
    "public-history-place-and-waterways": 2,
    "creative-technology-and-media": 4,
    "neighborhood-mutual-aid": 1
  }) &&
  includesAll(docs, ["overlapping", "not measures of labor", "not words authored by Jamie"]));

check("Stakeholder response", "Incoming public response is complete for the stated search and identity-minimized", 12,
  ledger.incomingStakeholderSearch.recoveredPublicRecords === 26 &&
  ledger.incomingStakeholderSearch.missionRelevantThirdPartyRecords === 15 &&
  ledger.incomingStakeholderSearch.missionRelevantThirdPartyAccounts === 9 &&
  ledger.incomingStakeholderSearch.missionRelevantConversationContexts === 2 &&
  ledger.incomingStakeholderSearch.redactedNonMissionPersonalOrNetworkRecords === 9 &&
  includesAll(docs, ["no identity, date, URL, or metrics", "not a complete engagement census", "endorsement count"]));

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));
const intakeById = new Map(knowledgeBank.intakes.map((item) => [item.id, item]));
const urbanClaimIds = [
  "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
  "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
  "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT",
  "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
  "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
  "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
  "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
  "CLM-URBANHERM-CREATIVE-COMMUNITY-INTRODUCTIONS"
];

check("Lifecycle", "The pass reaches intake, sources, claims, inquiries, and durable artifacts", 15,
  intakeById.get("INTAKE-URBANHERM-X-FULL-POPULATION-2026")?.maturity === "decomposed" &&
  intakeById.get("INTAKE-URBANHERM-X-MISSION-SOURCES-2026")?.maturity === "decomposed" &&
  sourceById.has("SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15") &&
  sourceById.has("SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15") &&
  urbanClaimIds.every((id) => claimById.has(id)) &&
  knowledgeBank.intakes.filter((item) => item.id.startsWith("INTAKE-URBANHERM-")).every((item) =>
    item.sourceIds.every((id) => sourceById.has(id)) &&
    item.claimIds.every((id) => claimById.has(id)) &&
    item.inquiryIds.every((id) => inquiryById.has(id))) &&
  knowledgeBank.claims.filter((claim) => urbanClaimIds.includes(claim.id)).every((claim) =>
    claim.evidence.every((evidence) => sourceById.has(evidence.sourceId))) &&
  inquiryById.get("INQ-URBANHERM-X-OWNER-ARCHIVE-2026")?.resultStatus === "partially-recovered" &&
  inquiryById.get("INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026")?.resultStatus === "partially-recovered" &&
  includesAll(docs, ["Horse Lords", "8th Street Tunnel", "Tired of Tires"]));

check("Claim discipline", "Specific role proofs retain collaborator and policy credit", 12,
  claimById.get("CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO")?.evidence.some(
    (evidence) => evidence.sourceId === "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016") &&
  claimById.get("CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM")?.evidence.some(
    (evidence) => evidence.sourceId === "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016") &&
  claimById.get("CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION")?.evidence.some(
    (evidence) => evidence.sourceId === "SRC-URBANHERM-X-JIMMY-TIRES-2022") &&
  sourceById.has("SRC-X-WOWLIST-MUSIC-HACKATHON-ATTRIBUTION-2015") &&
  claimById.get("CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION")?.antiClaims.includes(
    "Jamie alone repealed the Cabaret Law.") &&
  sourceById.get("SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017")?.doesNotEstablish.includes(
    "Jamie's individual authorship or role") &&
  claimById.get("CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO")?.boundaries.some(
    (boundary) => boundary.includes("M.C. Schmidt")) &&
  claimById.get("CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION")?.antiClaims.includes(
    "Jamie alone created or operated Tired of Tires."));

check("Traction boundary", "Volatile counters remain held and non-causal", 8,
  ledger.heldVisibleInteractionObservation.accountAuthoredRecordsWithOneOrMoreDisplayedInteraction === 85 &&
  ledger.heldVisibleInteractionObservation.displayedInteractionUnits.total === 243 &&
  ledger.heldVisibleInteractionObservation.status === "hold" &&
  includesAll(docs, ["243 interaction units, not 243 people", "not unique people", "impact"]));

const trackedProhibited = execFileSync("git", ["ls-files", "--",
  "docs/knowledge-bank/corpora/source-captures/urbanhermit-x-browser-extraction-2026-07-15-utc.json",
  "docs/knowledge-bank/corpora/urbanhermit-x-full-population-2026-07-15.json",
  "docs/knowledge-bank/corpora/urbanhermit-x-full-population-2026-07-15.manifest.json"
], { cwd: repoRoot, encoding: "utf8" }).trim();

check("Public safety", "The public ledger is minimized and bulk personal records are excluded", 18,
  ledger.privacy.status === "public-safe-minimized-ledger" &&
  ledger.acquisitionIntegrity.rawCapturePublished === false &&
  !Object.hasOwn(ledger, "items") &&
  !Object.hasOwn(ledger, "protectedSource") &&
  !/("text"|"visibleText"|"mediaAlts"|"engagementLabel"|"authenticatedAs")\s*:/.test(ledgerText) &&
  !/(protectedLocatorId|protectedSourceLocatorId|source-captures\/urbanhermit|\/Volumes\/|\/Users\/|\/private\/tmp\/)/.test(
    `${ledgerText}\n${JSON.stringify(manifest)}\n${receipt}\n${projectNote}\n${urbanhermitModule}\n${ledgerBuilder}`
  ) &&
  trackedProhibited === "" &&
  includesAll(gitignore, [
    "docs/knowledge-bank/corpora/source-captures/*-x-browser-extraction-*.json",
    "docs/knowledge-bank/corpora/*-x-full-population-*.json"
  ]) &&
  manifest.rawCapturePublished === false &&
  manifest.captureSha256 === ledger.acquisitionIntegrity.captureSha256 &&
  manifest.generatorSha256 === sha256(ledgerBuilder) &&
  manifest.classifier === "scripts/lib/urbanhermit-mission-classifier.mjs" &&
  manifest.classifierSha256 === sha256(missionClassifier) &&
  /^v26\./.test(manifest.nodeRuntime) &&
  manifest.publicLedgerSha256 === sha256(ledgerText));

const websiteFiles = execFileSync("rg", ["--files", "apps/www/src/app", "apps/www/src/components", "apps/www/src/data"],
  { cwd: repoRoot, encoding: "utf8" }).trim().split("\n").filter(Boolean);
const websiteText = websiteFiles
  .filter((file) => !file.includes("knowledge-bank"))
  .map((file) => read(file))
  .join("\n");

check("Projection", "New archive depth does not silently alter the current website argument", 5,
  urbanClaimIds.every((id) => claimById.get(id)?.projections.every(
    (projection) => projection.status === "hold" && projection.surfaces.length === 0)) &&
  urbanClaimIds.every((id) => !websiteText.includes(id)) &&
  includesAll(docs, ["No new website projection was selected", "current portfolio"]));

const possible = checks.reduce((sum, item) => sum + item.points, 0);
const earned = checks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
const score = Math.round((earned / possible) * 100);
const failures = checks.filter((item) => !item.passes);
console.log(`Urbanhermit X corpus eval: ${score}/100 (criterion: 100)`);
for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const group = checks.filter((item) => item.dimension === dimension);
  console.log(`- ${dimension}: ${group.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0)}/${group.reduce((sum, item) => sum + item.points, 0)}`);
}
if (failures.length) {
  for (const item of failures) console.error(`- FAILED: ${item.label}`);
  process.exit(1);
}
console.log("Criterion met.");
