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

const kcTownHallCouncilSourceIds = [
  "SRC-KC-TOWN-HALL-RESOLUTION-190649",
  "SRC-KC-TOWN-HALL-ORDINANCE-190642",
  "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
  "SRC-KC-TOWN-HALL-ORDINANCE-240317"
];

const kcTownHallPhaseOneSourceIds = [
  "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
  "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15"
];

const kcTownHallTransitionSourceId =
  "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15";

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
  "Source quality",
  "KC Town Hall Council funding and later disposition use primary government records",
  6,
  kcTownHallCouncilSourceIds.every(
    (id) => sourceById.get(id)?.kind === "government-record"
  ),
  true
);
check(
  "Source quality",
  "KC Town Hall protected records expose claims and boundaries without exposing source assets",
  6,
  kcTownHallPhaseOneSourceIds.every(
    (id) =>
      sourceById.get(id)?.visibility === "protected" &&
      sourceById.get(id)?.preservationStatus === "private" &&
      sourceById.get(id)?.protectedLocatorId &&
      !sourceById.get(id)?.canonicalUrl &&
      !sourceById.get(id)?.assetUrl
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
  "Atomic observations",
  "KC Town Hall decomposes document evidence from first-person memory",
  6,
  [
    "OBS-KC-TOWN-HALL-PROPOSER-TEAM-2019",
    "OBS-KC-TOWN-HALL-PHASE-ONE-COMPLETED-2019",
    "OBS-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-2019"
  ].every((id) =>
    observationById.get(id)?.sourceId === "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019" &&
    observationById.get(id)?.status === "verified"
  ) &&
    [
      "OBS-KC-TOWN-HALL-GENERAL-CONTRACTOR-ACCOUNT",
      "OBS-KC-TOWN-HALL-SITE-LISTENING-ACCOUNT",
      "OBS-KC-TIRED-OF-TIRES-ACCOUNT",
      "OBS-KC-CLEVELAND-UNIFY-TO-BEAUTIFY-ACCOUNT"
    ].every((id) =>
      observationById.get(id)?.sourceId ===
        "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15" &&
      observationById.get(id)?.status === "provisional"
    ),
  true
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
  "Claim maturity",
  "KC Town Hall distinguishes Council appropriation from receipt and later disposition",
  6,
  claimById.get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")?.status ===
      "confirmed-with-boundary" &&
    [
      "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
      "SRC-KC-TOWN-HALL-ORDINANCE-240317"
    ].every((sourceId) =>
      claimById
        .get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")
        ?.evidence.some((item) => item.sourceId === sourceId)
    ) &&
    claimById
      .get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")
      ?.boundaries.some((value) => /appropriation is not receipt.*disbursement/i.test(value)) &&
    claimById
      .get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")
      ?.antiClaims.some((value) => /received or spent/i.test(value)),
  true
);
check(
  "Claim maturity",
  "KC Town Hall Phase One is strong while first-person role claims remain bounded",
  8,
  claimById.get("CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION")
      ?.boundaries.some((value) => /not an independent.*certification/i.test(value)) &&
    claimById.get("CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE")?.status ===
      "use-with-care" &&
    claimById
      .get("CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE")
      ?.antiClaims.some((value) => /licensed general contractor/i.test(value)) &&
    [
      "CLM-KC-TIRED-OF-TIRES-OPERATIONS",
      "CLM-KC-CLEVELAND-UNIFY-TO-BEAUTIFY"
    ].every(
      (id) =>
        claimById.get(id)?.status === "use-with-care" &&
        claimById
          .get(id)
          ?.projections.every((projection) => projection.status !== "active")
    ),
  true
);
check(
  "Claim maturity",
  "KC Town Hall stewardship transition is projected without collapsing it into municipal withdrawal",
  6,
  sourceById.get(kcTownHallTransitionSourceId)?.visibility === "protected" &&
    observationById.get("OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-ACCOUNT")
      ?.status === "provisional" &&
    claimById.get("CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION")
      ?.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.includes("/work/kc-town-hall")
      ) &&
    claimById
      .get("CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION")
      ?.boundaries.some((value) => /does not establish how.*relates/i.test(value)) &&
    inquiryById.get("INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026")
      ?.resultStatus === "queued",
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
  "New depth remains selective, and projected intake clears claim-maturity gates",
  5,
  knowledgeBank.intakeItems
    .filter((item) => item.sourceIds.some((id) => newSourceIds.has(id)))
    .some((item) => item.publicationStatus === "knowledge-bank-only") &&
    knowledgeBank.intakeItems
      .filter(
        (item) =>
          item.publicationStatus === "projected" &&
          item.sourceIds.some((id) => newSourceIds.has(id))
      )
      .every(
        (item) =>
          item.claimIds.length > 0 &&
          item.claimIds.every((claimId) => {
            const claim = claimById.get(claimId);
            return (
              ["confirmed", "confirmed-with-boundary"].includes(claim?.status ?? "") &&
              claim?.projections.some(
                (projection) =>
                  projection.status === "active" &&
                  projection.surfaces.some((surface) => surface.startsWith("/"))
              )
            );
          })
      )
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
const kcTownHallReceipt = read(
  "docs/knowledge-bank/intake/2026-07-14-kc-town-hall-council-funding.md"
);
const kcTownHallPhaseOneReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-and-neighborhood-work.md"
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
  "Capture integrity",
  "The KC Town Hall receipt preserves the complete municipal decision chain",
  5,
  [
    "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
    ...kcTownHallCouncilSourceIds
  ].every((sourceId) => kcTownHallReceipt.includes(sourceId)) &&
    ["recommendation", "appropriating", "no funds disbursed", "withdrawn"].every(
      (phrase) => kcTownHallReceipt.toLowerCase().includes(phrase.toLowerCase())
    ),
  true
);
check(
  "Capture integrity",
  "The KC Town Hall Phase One receipt preserves verified work, held memories, and research routes",
  7,
  kcTownHallPhaseOneSourceIds.every((sourceId) =>
    kcTownHallPhaseOneReceipt.includes(sourceId)
  ) &&
    [
      "Phase One cold-shell restoration",
      "Completed in 2019",
      "general contractor",
      "TiredOfTires",
      "Cleveland Avenue Unify to Beautify",
      "Pastor Lee",
      "INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026",
      "INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"
    ].every((phrase) =>
      kcTownHallPhaseOneReceipt.toLowerCase().includes(phrase.toLowerCase())
    ),
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
