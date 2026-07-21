#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/kcspacesfund-facebook-posts-full-population.json";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
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

const fixtureText = read(fixturePath);
const fixture = JSON.parse(fixtureText);
const receipt = read(
  "docs/knowledge-bank/intake/2026-07-15-kcspacesfund-facebook-posts-full-population.md"
);
const projectReport = read(
  "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"
);
const moduleSource = read(
  "apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-2026-07.ts"
);
const proofs = read("apps/www/src/data/proofs.ts");
const technicalOperations = read(
  "apps/www/src/app/work/technical-operations/page.tsx"
);
const normalizedDocs = `${receipt}\n${projectReport}`.replace(/\s+/g, " ");

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const records = fixture.records;
const recordIdentityDigest = createHash("sha256")
  .update(records.map((record) => record.publicIdentity).sort().join("\n") + "\n")
  .digest("hex");

check(
  "Population boundary",
  "Repeated terminal traversals reproduce the 40-record exposed population",
  16,
  fixture.platform === "facebook" &&
    fixture.account === "@kcspacesfund" &&
    fixture.publicPageUrl === "https://www.facebook.com/kcspacesfund" &&
    fixture.completeness.survivingPublicRecords === 40 &&
    JSON.stringify(fixture.completeness.terminalTraversalCounts) ===
      JSON.stringify([40, 38, 40]) &&
    JSON.stringify(fixture.completeness.terminalNoAdditionPasses) ===
      JSON.stringify([18, 18, 24]) &&
    JSON.stringify(fixture.captureDateRecheck.terminalTraversalCounts) ===
      JSON.stringify([38, 39]) &&
    JSON.stringify(fixture.captureDateRecheck.terminalNoAdditionPasses) ===
      JSON.stringify([24, 24]) &&
    fixture.captureDateRecheck.stableMediaSetMatchedCanonicalCapture === true &&
    fixture.completeness.stableMediaIds === 21 &&
    fixture.completeness.stableMediaSetMatchedAcrossAllTraversals === true &&
    fixture.dateRange.earliest === "2020-04-07" &&
    fixture.dateRange.latest === "2020-07-09" &&
    includesAll(normalizedDocs, [
      "100% accounting for the capture-date authenticated Page-feed population",
      "not a native Meta export",
      "Deleted, hidden"
    ])
);

const allMediaIds = records.flatMap((record) => record.mediaIds);

check(
  "Record integrity",
  "All 40 rows retain unique public-safe identities and exact ordering",
  10,
  records.length === 40 &&
    new Set(records.map((record) => record.id)).size === 40 &&
    new Set(records.map((record) => record.publicIdentity)).size === 40 &&
    new Set(allMediaIds).size === 21 &&
    recordIdentityDigest ===
      "eec42c8175289777dd42e62dfb4d5cd1439915b0afc7b5ebb55011f11c9b1114" &&
    records.every(
      (record, index) =>
        record.order === index + 1 &&
        record.id === `kcspacesfund-facebook-${String(index + 1).padStart(2, "0")}` &&
        ["media-backed", "non-media"].includes(record.recordForm) &&
        Array.isArray(record.missionModes) &&
        Array.isArray(record.publicDestinations)
    )
);

const count = (key, value) =>
  records.filter((record) => record[key] === value).length;
const modeCount = (mode) =>
  records.filter((record) => record.missionModes.includes(mode)).length;

check(
  "Recovery states",
  "Media, non-media, content, metadata, and unavailable states reconcile",
  10,
  count("recordForm", "media-backed") === 20 &&
    count("recordForm", "non-media") === 20 &&
    count("recoveryState", "content-materialized") === 20 &&
    count("recoveryState", "metadata-depth") === 14 &&
    count("recoveryState", "attachment-unavailable") === 6 &&
    fixture.aggregate.mediaBackedRecords === 20 &&
    fixture.aggregate.nonMediaRecords === 20 &&
    fixture.aggregate.contentMaterializedRecords === 20 &&
    fixture.aggregate.metadataDepthRecords === 14 &&
    fixture.aggregate.unavailableAttachmentRecords === 6 &&
    includesAll(normalizedDocs, [
      "A remnant is preserved as a remnant",
      "not silently converted"
    ])
);

const spotlights = records
  .filter((record) => record.missionModes.includes("funded-space-spotlight"))
  .map((record) => record.spotlightSubject);

check(
  "Mission sequence",
  "Funded-space, application, and fundraising classifications reproduce",
  10,
  modeCount("funded-space-spotlight") === 11 &&
    modeCount("application-routing") === 8 &&
    modeCount("fundraising") === 14 &&
    JSON.stringify(spotlights) ===
      JSON.stringify([
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
      ]) &&
    fixture.aggregate.fundedSpaceSpotlights === 11 &&
    fixture.aggregate.applicationRoutingRecords === 8 &&
    fixture.aggregate.fundraisingRecords === 14 &&
    includesAll(normalizedDocs, [
      "11 funded-space spotlights",
      "not a complete grant file"
    ])
);

const exactRoutes = Object.values(fixture.routeDictionary).filter(
  (route) => typeof route.url === "string"
);
const incompleteRoutes = Object.values(fixture.routeDictionary).filter(
  (route) => route.url === null
);

check(
  "Route and source semantics",
  "All destination families and the posted source article retain exact bounded routes",
  10,
  exactRoutes.length === 8 &&
    incompleteRoutes.length === 0 &&
    fixture.routeDictionary["oddities-mutual-aid-prints"].url ===
      "https://www.odditiesprints.com/covid-19-fundraise" &&
    fixture.routeDictionary["twocc-donation-resource"].url ===
      "http://twocc.us/donate" &&
    fixture.routeDictionary["do816-daily-dogood"].url ===
      "https://do816.com/p/the-daily-dogood-kansas-city" &&
    fixture.routeDictionary["do816-daily-dogood"].retrievalState ===
      "posted-article-route" &&
    includesAll(normalizedDocs, [
      "one Page-posted source-article route",
      "Direct article retrieval was blocked during review",
      "discovered independently and must not be described as Page-posted"
    ])
);

const reactionTotal = records.reduce(
  (sum, record) => sum + record.visibleReactionSignals,
  0
);
const rowsWithReactions = records.filter(
  (record) => record.visibleReactionSignals > 0
).length;
const rowsWithComments = records.filter(
  (record) => record.visibleCommentRelation !== null
);

check(
  "Displayed interaction boundary",
  "Mutable reaction and comment signals reproduce without becoming impact",
  10,
  reactionTotal === 119 &&
    rowsWithReactions === 28 &&
    rowsWithComments.length === 4 &&
    rowsWithComments.filter((record) =>
      ["funded-cultural-space-account", "cultural-space-account"].includes(
        record.visibleCommentRelation
      )
    ).length === 3 &&
    fixture.profileSnapshot.followers === 108 &&
    fixture.profileSnapshot.following === 1 &&
    includesAll(normalizedDocs, [
      "not unique people, reach, impressions, attendance, conversion",
      "not proof of partnership, grant receipt, or campaign outcome",
      "not historical audience measures"
    ])
);

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);

check(
  "Governed sources",
  "Campaign, fundraiser, independent reporting, print benefit, and protected role sources are governed",
  8,
  sourceById.get("SRC-KCSPACES-FACEBOOK-PAGE")?.canonicalUrl ===
    "https://www.facebook.com/kcspacesfund" &&
    sourceById.get("SRC-KCSPACES-CAMPAIGN-SITE-2020")?.canonicalUrl ===
      "https://kcspacesfund.com/" &&
    sourceById.get("SRC-KCSPACES-GOFUNDME-2020")?.supportsGenerally.includes(
      "named organizer credit"
    ) &&
    sourceById.get("SRC-KCSPACES-KANSAS-CITY-STAR-2020-04-10")?.kind ===
      "published-article" &&
    sourceById
      .get("SRC-KCSPACES-KANSAS-CITY-STAR-2020-04-10")
      ?.doesNotEstablish.includes("Facebook distribution") &&
    sourceById.get("SRC-KCSPACES-ODDITIES-KAIJU-PRINT-2020")?.kind ===
      "institutional-web-page" &&
    sourceById.get("SRC-KCSPACES-DO816-DAILY-DOGOOD-2020")?.kind ===
      "published-article" &&
    sourceById
      .get("SRC-KCSPACES-DO816-DAILY-DOGOOD-2020")
      ?.doesNotEstablish.includes("the complete article body") &&
    sourceById.get("SRC-KCSPACES-TWOCC-DONATION-RESOURCE-2020")
      ?.doesNotEstablish.includes("grant amount or payment record") &&
    sourceById.get("SRC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026")
      ?.visibility === "protected" &&
    sourceById.get("SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026")
      ?.visibility === "protected"
);

const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intake = knowledgeBank.intakeItems.find(
  (item) =>
    item.id === "INTAKE-2026-07-15-KCSPACES-FACEBOOK-POST-FULL-POPULATION"
);
const claimIds = [
  "CLM-KCSPACES-FACEBOOK-SURVIVING-POPULATION",
  "CLM-KCSPACES-FACEBOOK-MUTUAL-AID-ROUTING",
  "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT",
  "CLM-KCSPACES-FACEBOOK-INTERACTION-SIGNALS",
  "CLM-KCSPACES-INDEPENDENT-COVID-RESOURCE-RECOGNITION"
];

check(
  "Lifecycle integration",
  "The pass reaches intake, sources, observations, claims, inquiries, and a bounded projection",
  12,
  intake?.disposition === "integrated" &&
    intake.visibility === "public-safe" &&
    intake.sourceIds.length === 12 &&
    intake.observationIds.length === 13 &&
    intake.researchInquiryIds.length === 3 &&
    intake.sourceIds.every((id) => sourceById.has(id)) &&
    intake.observationIds.every((id) =>
      knowledgeBank.observations.some((item) => item.id === id)
    ) &&
    claimIds.every((id) => claimById.has(id)) &&
    intake.researchInquiryIds.every((id) => inquiryById.has(id)) &&
    claimIds.slice(0, 3).every(
      (id) => claimById.get(id)?.status === "confirmed-with-boundary"
    ) &&
    claimById.get(claimIds[3])?.status === "use-with-care" &&
    claimById.get(claimIds[4])?.status === "confirmed-with-boundary" &&
    inquiryById.get("INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT")?.resultStatus ===
      "inconclusive" &&
    inquiryById.get("INQ-KCSPACES-FACEBOOK-STEWARDSHIP")?.resultStatus ===
      "partially-recovered" &&
    inquiryById.get("INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION")
      ?.resultStatus === "partially-recovered"
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
const exposedForbiddenKey = allObjectKeys(fixture).some((key) =>
  forbiddenKeys.has(key)
);
const digitalClaim = claimById.get(
  "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT"
);

check(
  "Credit, privacy, and projection",
  "Collective credit and Jamie's bounded implementation role survive publication",
  14,
  !exposedForbiddenKey &&
    !/(c_user|xs=|fr=|datr=|__cft__|__tn__)/i.test(fixtureText) &&
    digitalClaim?.projections.some(
      (projection) =>
        projection.key === "technical-operations" &&
        projection.status === "active" &&
        projection.surfaces.includes("/work/technical-operations")
    ) &&
    claimById
      .get("CLM-KCSPACES-FACEBOOK-INTERACTION-SIGNALS")
      ?.projections.every(
        (projection) =>
          projection.status === "hold" && projection.surfaces.length === 0
      ) &&
    includesAll(moduleSource, [
      "Jamie managed or posted from the KC Spaces Fund Facebook Page",
      "Jamie alone named KC Spaces Fund",
      "Public organizer credit remains with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo"
    ]) &&
    includesAll(proofs, [
      "Cross-channel identity and web infrastructure for KC Spaces Fund",
      "collaborator-led Facebook Page",
      "Do not frame Jamie as the Page publisher"
    ]) &&
    technicalOperations.includes(
      "Jamie built campaign web infrastructure and supported an available cross-channel identity for a collaborator-led mutual-aid campaign."
    ) &&
    includesAll(normalizedDocs, [
      "not the stakeholder or owner posting on the Facebook Page",
      "Public organizer credit remains with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo",
      "Population accounting, interaction labels, and independent source context remain knowledge-bank depth"
    ])
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(
  `KC Spaces Fund Facebook posts eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("KC Spaces Fund Facebook posts gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("KC Spaces Fund Facebook posts criterion met.");
