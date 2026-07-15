#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const read = (path) => readFileSync(path, "utf8");
const ledgerText = read("docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.json");
const ledger = JSON.parse(ledgerText);
const manifest = JSON.parse(read("docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.manifest.json"));
const receipt = read("docs/knowledge-bank/runs/2026-07-15-nycartc-x-full-population.md").replace(/\s+/g, " ");
const caseStudy = read("apps/www/src/content/work/fair-rent-nyc.mdx");
const workData = read("apps/www/src/data/work.ts");
const gitignore = read(".gitignore");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const includesAll = (source, values) => values.every((value) => source.includes(value));

const checks = [];
const check = (dimension, label, points, passes) =>
  checks.push({ dimension, label, points, passes: Boolean(passes) });

check("Population accounting", "Every profile slot has a recovered-or-gap disposition", 16,
  ledger.population.profileReported === 5124 && ledger.population.recoveredAccountItems === 3367 &&
  ledger.population.unrecoveredCountDifference === 1757 && 3367 + 1757 === 5124 &&
  ledger.population.authored === 696 && ledger.population.reposted === 2671 && 696 + 2671 === 3367 &&
  includesAll(receipt, ["100% population accounting, not 100% item recovery", "not described as deleted"]));

const campaignCounts = Object.fromEntries(
  ledger.campaignMarkers.map((marker) => [marker.id, marker.authoredPostCount])
);
check("Classification integrity", "Source-body campaign counts and digests remain pinned", 12,
  JSON.stringify(campaignCounts) === JSON.stringify({
    "fair-rent-nyc": 186, "save-nyc-spaces": 106,
    "let-nyc-dance": 76, "talks-not-raids": 54
  }) && ledger.campaignMarkers.every((marker) => /^[a-f0-9]{64}$/.test(marker.statusIdDigest)));

check("Source circulation", "Recovered-link and mission-source totals remain governed", 12,
  ledger.sourceCirculation.allDistinctShortUrlsResolved === 1235 &&
  ledger.sourceCirculation.authoredPostsWithOutgoingLinks === 446 &&
  ledger.sourceCirculation.authoredOutgoingLinkOccurrences === 529 &&
  ledger.sourceCirculation.distinctAuthoredShortUrls === 287 &&
  ledger.sourceLeads.length === 12 && new Set(ledger.sourceLeads.map((lead) => lead.id)).size === 12);

check("Stakeholder boundary", "Council communication remains outbound and repost sources remain circulation", 10,
  ledger.stakeholderCommunication.nycCouncilOutboundMentionOccurrences === 104 &&
  ledger.stakeholderCommunication.nycCouncilOutboundPosts === 100 &&
  ledger.stakeholderCommunication.selectedRecoveredRepostSources.find(
    (entry) => entry.handle === "olympiakazi")?.recoveredCount === 194 &&
  includesAll(receipt, ["outbound communication", "not incoming Council engagement"]));

check("Traction boundary", "Mutable counters remain a held dated observation", 8,
  ledger.heldObservations.status === "hold" &&
  ledger.heldObservations.authoredPostsWithDisplayedReplyRepostOrLike === 628 &&
  includesAll(receipt, ["held from accomplishment messaging", "volatile", "not unique people"]));

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));
const intake = knowledgeBank.intake.find((item) => item.id === "INT-NYCAC-X-FULL-POPULATION-2026-07-15");
const claimIds = [
  "CLM-NYCAC-X-SHARED-PUBLIC-OPERATING-LAYER", "CLM-NYCAC-X-PUBLIC-SOURCE-CIRCULATION",
  "CLM-NYCAC-X-OUTBOUND-STAKEHOLDER-COMMUNICATION", "CLM-NYCAC-X-REPOST-SOURCE-PATTERN",
  "CLM-NYCAC-X-DATED-TRACTION-SNAPSHOT"
];
check("Lifecycle integration", "Evidence reaches intake, sources, claims, inquiry, and public-safe artifacts", 14,
  intake?.status === "matured" && intake.sourceIds.includes("SRC-NYCAC-X-FULL-POPULATION-2026-07-15") &&
  claimIds.every((id) => claimById.has(id) && intake.claimIds.includes(id)) &&
  inquiryById.get("INQ-NYCAC-X-OWNER-ARCHIVE-2026")?.resultStatus === "partially-recovered" &&
  intake.artifactPaths.length === 5);

check("Source positioning", "Articles remain circulated context with explicit non-claims", 8,
  sourceById.get("SRC-NYCAC-X-CITY-LIMITS-RENT-COVID-2020")?.doesNotEstablish.includes("policy adoption") &&
  sourceById.get("SRC-NYCAC-X-GOTHAMIST-REPEAL-50A-2020")?.doesNotEstablish.includes("the coalition’s causal role in repeal") &&
  sourceById.get("SRC-NYCAC-X-HELL-GATE-SAINT-VITUS-2024")?.doesNotEstablish.includes("that the Saint Vitus action was a MARCH raid"));

check("Public safety", "Public artifacts are minimized and protected item-level files are excluded", 10,
  ledger.privacy.status === "public-safe-minimized-ledger" &&
  ledger.protectedSource.repositoryStatus === "excluded" &&
  !Object.hasOwn(ledger, "items") &&
  !/("visibleText"|"resolvedDestination"|"visibleInteractions")/.test(ledgerText) &&
  includesAll(gitignore, [
    "nycartc-x-browser-extraction-2026-07-15-utc.json",
    "nycartc-x-full-population-2026-07-15.json"
  ]) && manifest.publicLedgerSha256 === sha256(ledgerText));

check("Projection discipline", "Deeper metrics remain held while public chronology and claims stay clear", 10,
  claimIds.every((id) => claimById.get(id)?.projections.every(
    (projection) => projection.status === "hold" && projection.surfaces.length === 0)) &&
  includesAll(caseStudy, ['claimId="CLM-NYCAC-SOCIAL-COUNCIL-ENGAGEMENT"',
    'claimId="CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT"']) &&
  !caseStudy.includes("CLM-NYCAC-X-") && workData.includes("FairRentNYC: 2018-Present"));

const possible = checks.reduce((sum, item) => sum + item.points, 0);
const earned = checks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
const score = Math.round((earned / possible) * 100);
const failures = checks.filter((item) => !item.passes);
console.log(`NYC Artist Coalition X corpus eval: ${score}/100 (criterion: 100)`);
for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const group = checks.filter((item) => item.dimension === dimension);
  console.log(`- ${dimension}: ${group.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0)}/${group.reduce((sum, item) => sum + item.points, 0)}`);
}
if (failures.length) {
  for (const item of failures) console.error(`- FAILED: ${item.label}`);
  process.exit(1);
}
console.log("Criterion met.");
