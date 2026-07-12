#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const intakeItems = knowledgeBank.intakeItems ?? [];
const sourceReadings = knowledgeBank.sourceReadings ?? [];
const candidateClaims = knowledgeBank.candidateClaims ?? [];
const promotions = knowledgeBank.promotions ?? [];
const editorialBriefs = knowledgeBank.editorialBriefs ?? [];
const discoveryNotes = knowledgeBank.discoveryNotes ?? [];

const suppliedUrls = [
  "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
  "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
  "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
  "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
  "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife?renderPlatform=nprone_ios&unified=true"
];

const batchSourceIds = [
  "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
  "SRC-RAFT-PITCH-2007",
  "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
  "SRC-NYCAC-CABARET-GOTHAMIST-2017",
  "SRC-NYCAC-CABARET-NPR-2017",
  "SRC-NYC-COUNCIL-CABARET-REPEAL-2017",
  "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
  "SRC-NYCAC-NIGHT-MAYOR-TOWN-HALL-2017",
  "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
  "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
  "SRC-NYC-COUNCIL-INT-1156-2018",
  "SRC-BUSHWICK-DAILY-MARCH-DISBANDS-2023"
];

const requiredCandidateIds = [
  "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
  "CND-RIVER-RAFT-KC-GULF",
  "CND-NYCAC-CIVIC-ADVOCACY-BOUNDED",
  "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE",
  "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY",
  "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS"
];

const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
const candidateById = new Map(candidateClaims.map((claim) => [claim.id, claim]));
const readingBySourceId = new Map(sourceReadings.map((reading) => [reading.sourceId, reading]));
const promotedCandidates = candidateClaims.filter((candidate) => candidate.status === "promoted");
const renderedProjectionSources = [
  readFileSync("apps/www/src/app/about/page.tsx", "utf8"),
  readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8")
].join("\n");

const criteria = [
  {
    id: "lifecycle-collections",
    label: "All upstream lifecycle collections exist",
    pass: [intakeItems, sourceReadings, candidateClaims, promotions, editorialBriefs, discoveryNotes].every(
      (items) => items.length > 0
    )
  },
  {
    id: "supplied-url-intake",
    label: "Every supplied URL has an intake record",
    pass: suppliedUrls.every((url) => intakeItems.some((item) => item.sourceUrl === url))
  },
  {
    id: "source-batch",
    label: "The research batch is represented by canonical source records",
    pass: batchSourceIds.every((id) => sourceIds.has(id))
  },
  {
    id: "close-readings",
    label: "Every batch source has an atomic reading with limits",
    pass: batchSourceIds.every((id) => {
      const reading = readingBySourceId.get(id);
      return reading && reading.assertions.length >= 2 && reading.limitations.length >= 1;
    })
  },
  {
    id: "intake-dispositions",
    label: "Every intake item has a research or processing disposition and links forward",
    pass:
      intakeItems.length >= suppliedUrls.length &&
      intakeItems.every(
        (item) =>
          ["researching", "processed", "deferred"].includes(item.status) &&
          item.linkedRecordIds.length > 0
      )
  },
  {
    id: "candidate-depth",
    label: "Promotable and unresolved candidate claims are both retained",
    pass:
      requiredCandidateIds.every((id) => candidateById.has(id)) &&
      candidateClaims.some((claim) => claim.status === "promoted") &&
      candidateClaims.some((claim) => claim.status === "partially-supported") &&
      candidateClaims.some((claim) => claim.status === "research-needed")
  },
  {
    id: "promotion-lineage",
    label: "Every promoted candidate has a promotion decision and canonical claim",
    pass:
      promotedCandidates.length > 0 &&
      promotedCandidates.every(
        (candidate) =>
          candidate.promotedClaimId &&
          claimIds.has(candidate.promotedClaimId) &&
          promotions.some(
            (promotion) =>
              promotion.candidateClaimId === candidate.id &&
              promotion.claimId === candidate.promotedClaimId &&
              promotion.decision === "promoted"
          )
      )
  },
  {
    id: "strong-claim-holds",
    label: "High-causality claims remain unprojected while evidence is incomplete",
    pass: [
      "CND-RIVER-RAFT-KC-GULF",
      "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE",
      "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY",
      "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS"
    ].every((id) => {
      const candidate = candidateById.get(id);
      return candidate && candidate.status !== "promoted" && !candidate.promotedClaimId;
    })
  },
  {
    id: "editorial-selection",
    label: "A hiring brief selects canonical claims and explicitly holds deeper material",
    pass: editorialBriefs.some(
      (brief) =>
        /hiring|job application/i.test(`${brief.audience} ${brief.goal}`) &&
        brief.selectedClaimIds.length > 0 &&
        brief.selectedClaimIds.every((id) => claimIds.has(id)) &&
        brief.heldCandidateClaimIds.length > 0 &&
        brief.heldCandidateClaimIds.every((id) => candidateById.has(id))
    )
  },
  {
    id: "photo-feedback-loop",
    label: "Photo and archive discovery can feed new research back into intake",
    pass:
      discoveryNotes.some((note) => note.kind === "photo-editor") &&
      discoveryNotes.some((note) => note.kind === "archive-research") &&
      discoveryNotes.every((note) => note.candidateClaimIds.length > 0)
  },
  {
    id: "public-citation-plan",
    label: "Every newly promoted public claim has a page occurrence rendered on its surface",
    pass:
      promotedCandidates.length > 0 &&
      promotedCandidates.every((candidate) => {
        const occurrence = knowledgeBank.pages
          .flatMap((page) => page.occurrences)
          .find((item) => item.claimId === candidate.promotedClaimId);
        return (
          occurrence &&
          renderedProjectionSources.includes(candidate.promotedClaimId) &&
          renderedProjectionSources.includes(occurrence.id)
        );
      })
  },
  {
    id: "public-selection-restraint",
    label: "The public site selects fewer claims than the bank retains",
    pass:
      promotedCandidates.length > 0 && promotedCandidates.length < candidateClaims.length
  }
];

const passed = criteria.filter((criterion) => criterion.pass).length;

console.log(`Knowledge lifecycle eval: ${passed}/${criteria.length}`);
for (const criterion of criteria) {
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.label}`);
}

if (passed !== criteria.length) {
  console.error(
    "Knowledge lifecycle criterion not met. Continue the intake, research, promotion, and editorial loop."
  );
  process.exit(1);
}

console.log("Knowledge lifecycle criterion met.");
