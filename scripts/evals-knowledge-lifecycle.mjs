#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  nycaPressArticles,
  nycaPressCampaigns,
  nycaPressCorpusStats
} from "../apps/www/src/data/knowledge-bank/nyca-press-corpus.ts";
import publicRegistry from "../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [];

function check(dimension, label, points, passes, hard = false) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

function read(relativePath) {
  const absolute = path.join(repoRoot, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : "";
}

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const observationById = new Map(
  knowledgeBank.observations.map((observation) => [observation.id, observation])
);
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const validationErrors = validateKnowledgeBank();

check(
  "Capture integrity",
  "Canonical registry passes structural and public-safety validation",
  8,
  validationErrors.length === 0,
  true
);
check(
  "Capture integrity",
  "Every intake item preserves at least one downstream route",
  7,
  knowledgeBank.intakeItems.every(
    (item) =>
      item.sourceIds.length ||
      item.observationIds.length ||
      item.claimIds.length ||
      item.researchInquiryIds.length
  ),
  true
);

const suppliedSourceIds = [
  "SRC-WATERWAYS-PITCH-2007-08-09",
  "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
  "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
  "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
  "SRC-NYCA-NPR-CABARET-2017-09-20"
];

const portfolioExpansionSourceIds = [
  "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
  "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
  "SRC-NYCA-SAVE-NYC-SPACES-SITE",
  "SRC-NYCA-EDGE-OF-SOUND-TOWN-HALL-2017-10-14",
  "SRC-NYCA-MIXMAG-CABARET-2017-09-20",
  "SRC-CLAUDETTE-MICHAEL-REES-AR",
  "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
  "SRC-KC-EIGHTH-STREET-TUNNEL-KCUR-2016-09-15",
  "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
  "SRC-KC-FRONTIER-DREAMERS-2012-05-17"
];

check(
  "Source quality",
  "Every supplied and portfolio-expansion URL has a canonical source record",
  6,
  suppliedSourceIds.every((id) => sourceById.has(id)) &&
    portfolioExpansionSourceIds.length === 10 &&
    portfolioExpansionSourceIds.every((id) => sourceById.has(id)),
  true
);
check(
  "Source quality",
  "Public sources record access dates and negative boundaries",
  5,
  knowledgeBank.sources
    .filter((source) => source.visibility === "public")
    .every((source) => source.accessedAt && source.doesNotEstablish.length),
  true
);
check(
  "Source quality",
  "Research adds primary government corroboration for civic outcomes",
  4,
  [
    "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
    "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
    "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
    "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
    "SRC-NYCA-MAYOR-CURE-2023-12-28"
  ].every((id) => sourceById.get(id)?.kind === "government-record")
);
check(
  "Source quality",
  "The four campaign indexes recover the complete deduplicated press corpus",
  6,
  nycaPressCampaigns.letnycdance.expected === 21 &&
    nycaPressCampaigns.talksnotraids.expected === 7 &&
    nycaPressCampaigns.savenycspaces.expected === 8 &&
    nycaPressCampaigns.fairrentnyc.expected === 9 &&
    nycaPressCorpusStats.placementCount === 45 &&
    nycaPressCorpusStats.uniqueArticleCount === 44 &&
    nycaPressCorpusStats.reusedSourceCount === 3 &&
    nycaPressCorpusStats.newArticleSourceCount === 41,
  true
);
check(
  "Source quality",
  "Every recovered article resolves to a source and Wayback fallback",
  6,
  nycaPressArticles.length === 44 &&
    new Set(nycaPressArticles.map((article) => article.sourceId)).size === 44 &&
    nycaPressCorpusStats.archivedArticleCount === 44 &&
    nycaPressArticles.every(
      (article) =>
        sourceById.has(article.sourceId) &&
        article.archiveUrl.startsWith("https://web.archive.org/web/")
    ),
  true
);

check(
  "Atomic observations",
  "Every researched intake links atomic observations",
  5,
  knowledgeBank.intakeItems
    .filter((item) => item.researchStatus === "researched")
    .every((item) => item.observationIds.length > 0)
);
check(
  "Atomic observations",
  "Every observation links to a valid source and claim or inquiry",
  6,
  knowledgeBank.observations.every(
    (observation) =>
      sourceById.has(observation.sourceId) &&
      (observation.claimIds.some((id) => claimById.has(id)) ||
        observation.researchInquiryIds.some((id) => inquiryById.has(id)))
  ),
  true
);
check(
  "Atomic observations",
  "The first run captures both waterways and nightlife observations",
  4,
  knowledgeBank.observations.some(
    (observation) => observation.project === "waterways-participatory-art"
  ) &&
    knowledgeBank.observations.some(
      (observation) => observation.project === "nyc-artist-coalition"
    )
);

check(
  "Claim maturity",
  "Strong waterways and participatory-program claims are confirmed",
  6,
  [
    "CLM-WATERWAYS-RAFT-EXPEDITION",
    "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
    "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"
  ].every((id) =>
    ["confirmed", "confirmed-with-boundary"].includes(claimById.get(id)?.status)
  )
);
check(
  "Claim maturity",
  "Cabaret Law contribution is strong and collectively bounded",
  6,
  claimById.get("CLM-NYCA-CABARET-LAW-CONTRIBUTION")?.status ===
    "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-CABARET-LAW-CONTRIBUTION")
      ?.antiClaims.some((value) => /single-handedly/i.test(value)),
  true
);
check(
  "Claim maturity",
  "Office of Nightlife and MARCH claims retain open causal boundaries",
  4,
  [
    "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL",
    "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"
  ].every((id) => claimById.get(id)?.status === "use-with-care")
);
check(
  "Claim maturity",
  "Recovered co-founder and bounded CallNYC engagement claims retain distinct states",
  4,
  claimById.get("CLM-NYCA-COFOUNDER-ROLE")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-COFOUNDER-ROLE")
      ?.boundaries.some((boundary) => /division of labor|chronology/i.test(boundary)) &&
    claimById.get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS")?.status ===
      "use-with-care" &&
    claimById
      .get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS")
      ?.projections.every(
        (projection) =>
          projection.status !== "active" ||
          projection.surfaces.every((surface) => !surface.startsWith("/"))
      ),
  true
);
check(
  "Claim maturity",
  "Campaign website authorship is direct, specific, and collectively bounded",
  5,
  claimById.get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP")?.status ===
      "confirmed-with-boundary" &&
    ["Let NYC Dance", "Talks Not Raids", "Save NYC Spaces", "FairRentNYC"].every(
      (name) =>
        claimById
          .get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP")
          ?.internalClaim.includes(name)
    ) &&
    claimById
      .get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP")
      ?.antiClaims.some((value) => /solely led|alone caused/i.test(value)),
  true
);
check(
  "Claim maturity",
  "Press and commercial-rent claims preserve attribution boundaries",
  5,
  claimById.get("CLM-NYCA-CAMPAIGN-PRESS-CORPUS")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-CAMPAIGN-PRESS-CORPUS")
      ?.boundaries.some((value) => /inclusion.*endorsed/i.test(value)) &&
    claimById.get("CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT")
      ?.boundaries.some((value) => /do not establish Jamie's complete individual/i.test(value)),
  true
);

check(
  "Research recursion",
  "Every needs-more-research intake links a live inquiry",
  6,
  knowledgeBank.intakeItems
    .filter((item) => item.researchStatus === "needs-more-research")
    .every(
      (item) =>
        item.researchInquiryIds.length &&
        item.researchInquiryIds.every((id) => inquiryById.has(id))
    ),
  true
);
check(
  "Research recursion",
  "The framework supports queued work without fabricated findings",
  5,
  knowledgeBank.researchInquiries
    .filter((inquiry) => inquiry.resultStatus === "queued")
    .every((inquiry) => !inquiry.runAt && inquiry.findings.length === 0)
);
check(
  "Research recursion",
  "Partially recovered inquiries preserve findings and limitations",
  4,
  knowledgeBank.researchInquiries
    .filter((inquiry) => inquiry.resultStatus === "partially-recovered")
    .every(
      (inquiry) =>
        inquiry.runAt && inquiry.findings.length > 0 && inquiry.limitations.length > 0
    )
);

const newSourceIds = new Set(
  knowledgeBank.sources
    .filter((source) => !source.id.startsWith("SRC-CALLNYC-"))
    .map((source) => source.id)
);

check(
  "Projection discipline",
  "New depth can remain knowledge-bank-only",
  5,
  knowledgeBank.intakeItems
    .filter((item) => item.sourceIds.some((id) => newSourceIds.has(id)))
    .every((item) => item.publicationStatus !== "projected")
);
check(
  "Projection discipline",
  "Unselected sources stay out of the retinal citation layer",
  6,
  publicRegistry.sources.every((source) => !newSourceIds.has(source.id)),
  true
);
check(
  "Projection discipline",
  "The public citation registry remains a deliberate page plan",
  4,
  publicRegistry.pages.length === 1 && publicRegistry.pages[0]?.id === "callnyc"
);

const frameworkDoc = read("docs/knowledge-bank/framework.md");
const intakeDoc = read("docs/knowledge-bank/intake/README.md");
const nycaPressReceipt = read(
  "docs/knowledge-bank/intake/2026-07-13-nyca-campaign-press-corpus.md"
);

check(
  "Capture integrity",
  "The public-safe press receipt accounts for every recovered source",
  5,
  /\| \*\*Total placements\*\* \| \*\*45\*\* \|/.test(nycaPressReceipt) &&
    /\| \*\*Unique articles\*\* \| \*\*44\*\* \|/.test(nycaPressReceipt) &&
    nycaPressArticles.every((article) => nycaPressReceipt.includes(article.sourceId)),
  true
);

check(
  "Photo feedback",
  "The framework treats photographs as evidence, artifacts, projection candidates, and research leads",
  5,
  ["evidence", "artifact", "projection candidate", "research lead"].every(
    (phrase) => frameworkDoc.toLowerCase().includes(phrase)
  ) &&
    ["photograph", "photo-caption", "rights", "consent"].every((phrase) =>
      `${frameworkDoc}\n${intakeDoc}`.toLowerCase().includes(phrase)
    )
);

const possiblePoints = checks.reduce((total, item) => total + item.points, 0);
const earnedPoints = checks.reduce(
  (total, item) => total + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 95;

console.log(
  `Knowledge lifecycle eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (total, item) => total + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((total, item) => total + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (validationErrors.length) {
  console.error("Canonical validation errors:");
  for (const error of validationErrors) console.error(`- ${error}`);
}

if (failures.length) {
  console.error("Knowledge lifecycle gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("Knowledge lifecycle criterion met.");
