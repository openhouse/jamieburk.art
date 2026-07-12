#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const intakeItems = knowledgeBank.intakeItems ?? [];
const sourceReadings = knowledgeBank.sourceReadings ?? [];
const candidateClaims = knowledgeBank.candidateClaims ?? [];
const promotions = knowledgeBank.promotions ?? [];
const editorialBriefs = knowledgeBank.editorialBriefs ?? [];
const discoveryNotes = knowledgeBank.discoveryNotes ?? [];
const pressCollections = knowledgeBank.pressCollections ?? [];

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

const strengtheningBatchUrls = [
  "https://legistar.council.nyc.gov/View.ashx?GUID=41F1062B-FC32-4A12-846E-65CEB3BB052C&ID=5316935&M=F",
  "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
  "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/",
  "https://www.villagevoice.com/awaiting-the-night-mayor/",
  "https://www.nyc.gov/mayors-office/news/2023/12/transcript-mayor-adams-launches-effort-enhance-nightlife-safety-strengthen-small",
  "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
  "https://www.sbdiy.org/",
  "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
  "https://www.kcmo.gov/home/showpublisheddocument/7198/637696345156870000",
  "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in"
];

const strengtheningBatchSourceIds = [
  "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
  "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
  "SRC-VICE-NYCAC-DIY-SAFETY-2017",
  "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
  "SRC-NYC-MAYOR-CURE-MARCH-2023",
  "SRC-CREATENYC-NYCAC-APPENDIX-2017",
  "SRC-SBDIY-WOWLIST-CALENDAR",
  "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
  "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
  "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016"
];

const strengtheningCandidateIds = [
  "CND-NYCAC-PUBLIC-TESTIMONY",
  "CND-NYCAC-SOLE-POLICY-CAUSALITY",
  "CND-WOWLIST-SBDIY-CALENDAR-USE",
  "CND-KC-TOWN-HALL-MUNICIPAL-RECORD",
  "CND-KC-TOWN-HALL-FUNDING-AWARD",
  "CND-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY"
];

const strengtheningPromotedClaimIds = [
  "CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019",
  "CLM-WOWLIST-SBDIY-CALENDAR-USE",
  "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
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
  readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8"),
  readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8"),
  readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8")
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
  },
  {
    id: "strengthening-source-batch",
    label: "Ten new public sources are canonical, bounded, and non-duplicative",
    pass:
      strengtheningBatchSourceIds.length === 10 &&
      new Set(strengtheningBatchSourceIds).size === 10 &&
      new Set(
        strengtheningBatchSourceIds.map(
          (id) => knowledgeBank.sources.find((item) => item.id === id)?.canonicalUrl
        )
      ).size === 10 &&
      strengtheningBatchSourceIds.every((id) => {
        const source = knowledgeBank.sources.find((item) => item.id === id);
        return (
          source &&
          source.visibility === "public" &&
          source.canonicalUrl &&
          strengtheningBatchUrls.includes(source.canonicalUrl) &&
          source.supportsGenerally.length >= 2 &&
          source.doesNotEstablish.length >= 2
        );
      })
  },
  {
    id: "strengthening-intake-and-readings",
    label: "Every new source has intake lineage and a close reading",
    pass:
      strengtheningBatchUrls.every((url) =>
        intakeItems.some((item) => item.sourceUrl === url && item.status === "processed")
      ) &&
      strengtheningBatchSourceIds.every((id) => {
        const reading = readingBySourceId.get(id);
        return reading && reading.assertions.length >= 2 && reading.limitations.length >= 1;
      })
  },
  {
    id: "strengthening-claim-maturation",
    label: "The new batch matures useful claims while holding causal and funding overclaims",
    pass:
      strengtheningCandidateIds.every((id) => candidateById.has(id)) &&
      strengtheningPromotedClaimIds.every((id) => claimIds.has(id)) &&
      ["CND-NYCAC-SOLE-POLICY-CAUSALITY", "CND-KC-TOWN-HALL-FUNDING-AWARD"].every(
        (id) => {
          const candidate = candidateById.get(id);
          return candidate && candidate.status !== "promoted" && !candidate.promotedClaimId;
        }
      )
  },
  {
    id: "strengthening-public-projection",
    label: "Only the strongest new hiring claims are projected with rendered citations",
    pass: strengtheningPromotedClaimIds.every((claimId) => {
      const occurrence = knowledgeBank.pages
        .flatMap((page) => page.occurrences)
        .find((item) => item.claimId === claimId);
      return occurrence && renderedProjectionSources.includes(claimId) && renderedProjectionSources.includes(occurrence.id);
    })
  },
  {
    id: "campaign-press-census",
    label: "All four campaign press collections preserve the complete deduplicated census",
    pass:
      pressCollections.length === 4 &&
      JSON.stringify(pressCollections.map((collection) => collection.entries.length)) ===
        JSON.stringify([21, 7, 8, 1]) &&
      pressCollections.flatMap((collection) => collection.entries).length === 37 &&
      new Set(
        pressCollections.flatMap((collection) =>
          collection.entries.map((entry) => entry.sourceId)
        )
      ).size === 36
  },
  {
    id: "campaign-press-lineage",
    label: "Every campaign and article source has a bounded reading and explicit retrieval state",
    pass:
      pressCollections.length === 4 &&
      pressCollections.every(
        (collection) =>
          sourceIds.has(collection.campaignSourceId) &&
          readingBySourceId.has(collection.campaignSourceId) &&
          collection.entries.every(
            (entry) =>
              sourceIds.has(entry.sourceId) &&
              readingBySourceId.has(entry.sourceId) &&
              ["read", "metadata-only", "not-recovered"].includes(entry.retrievalStatus)
          )
      )
  },
  {
    id: "campaign-press-claim-discipline",
    label: "The campaign-site claim is projected while reach and solo-causality claims remain held",
    pass:
      claimIds.has("CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE") &&
      renderedProjectionSources.includes("CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE") &&
      ["CND-NYCAC-PRESS-REACH", "CND-NYCAC-CAMPAIGN-SOLO-CAUSALITY"].every(
        (id) => {
          const candidate = candidateById.get(id);
          return candidate && candidate.status === "hold" && !candidate.promotedClaimId;
        }
      )
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
