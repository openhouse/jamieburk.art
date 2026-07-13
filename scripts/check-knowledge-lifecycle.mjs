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

const kcTownHallCouncilSourceIds = [
  "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
  "SRC-KCMO-CCED-ORDINANCE-190642-2019",
  "SRC-KCMO-CCED-CLAWBACK-240317-2024"
];

const archivalProductionSourceIds = [
  "SRC-RAFT-SOUNDINGS-2007",
  "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
  "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
  "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
  "SRC-CRS-OPEN-DATA-FOUNDATION-2025"
];

const teamsArchiveIntakeIds = [
  "INT-2026-07-12-TEAMS-JAMIE-PROJECTS-HISTORY",
  "INT-2026-07-12-TEAMS-CRS",
  "INT-2026-07-12-TEAMS-JOB-HUNT"
];

const sharedDriveSourceIds = [
  "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026",
  "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
  "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
  "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
  "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
  "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
  "SRC-GDRIVE-196-ONBOARDING-LETTER-2023"
];

const sharedDriveIntakeIds = [
  "INT-2026-07-12-GDRIVE-SHARED-DRIVE-CORPUS",
  "INT-2026-07-12-GDRIVE-CRS-OPERATING-MEMORY",
  "INT-2026-07-12-GDRIVE-CRS-DATA-OPPORTUNITY",
  "INT-2026-07-12-GDRIVE-SUNDAY-DINNER-TRACKER",
  "INT-2026-07-12-GDRIVE-196-ONBOARDING"
];

const sharedDriveHeldCandidateIds = [
  "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS",
  "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
  "CND-196-RESIDENCY-ONBOARDING-WORKFLOW",
  "CND-CRS-MULTILINGUAL-MEETING-MEMORY"
];

const socialArchiveSourceIds = [
  "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
  "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
  "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
  "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
  "SRC-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018",
  "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026",
  "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026",
  "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025",
  "SRC-SOCIAL-WOWLIST-MARCHES-POST-2016",
  "SRC-SOCIAL-WOWLIST-PARTICIPATION-POST-2016"
];

const socialArchiveIntakeIds = [
  "INT-2026-07-12-PROJECT-SOCIAL-ARCHIVE",
  "INT-2026-07-12-CALLNYC-PROFILE-CAPTURE",
  "INT-2026-07-12-NYCAC-SOCIAL-CORPUS",
  "INT-2026-07-12-SOCIAL-IDENTITY-CONFIRMATION"
];

const authenticatedSocialSourceIds = [
  "SRC-SOCIAL-X-AUTHENTICATED-RUN-2026",
  "SRC-SOCIAL-CALLNYC-PETER-KOO-2016",
  "SRC-SOCIAL-CALLNYC-STEVEN-MATTEO-2016",
  "SRC-SOCIAL-CALLNYC-RUBEN-WILLS-2016",
  "SRC-SOCIAL-CALLNYC-MARGARET-CHIN-2017",
  "SRC-SOCIAL-NYCAC-CARLINA-RIVERA-2018",
  "SRC-SOCIAL-NYCAC-STEPHEN-LEVIN-2019",
  "SRC-SOCIAL-NYCAC-JUSTIN-BRANNAN-2019",
  "SRC-SOCIAL-NYCAC-MARK-LEVINE-2020",
  "SRC-SOCIAL-NYCAC-JIMMY-VAN-BRAMER-2020",
  "SRC-SOCIAL-NYCAC-BRAD-LANDER-2021",
  "SRC-SOCIAL-OLYMPIA-NYCAC-CORPUS-2026",
  "SRC-SOCIAL-OLYMPIA-NYCAC-HEARING-2022",
  "SRC-SOCIAL-NYC-INSTITUTIONAL-CORPUS-2026",
  "SRC-SOCIAL-NYCULTURE-MARCH-CABARET-2017",
  "SRC-SOCIAL-DOCUMENT-JOURNAL-NIGHTLIFE-2018"
];

const callnycPopulationSourceIds = [
  "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
  "SRC-CALLNYC-FULL-POPULATION-RUN-2026"
];

const callnycCensusRows = readFileSync(
  "docs/knowledge-bank/callnyc-post-census-2026-07-12.csv",
  "utf8"
)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const callnycRecoveredCensusRows = callnycCensusRows.filter(
  (row) => row[10] === "recovered"
);
const callnycUnresolvedCensusRows = callnycCensusRows.filter(
  (row) => row[10] === "unrecovered"
);

const wowlistPopulationSourceIds = [
  "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
  "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
  "SRC-WOWLIST-ORIGIN-SUNDAY-DINNER-2014",
  "SRC-WOWLIST-SUPPORT-FEED-SCOPE-2015",
  "SRC-WOWLIST-SUPPORT-PROFILE-2015",
  "SRC-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
  "SRC-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
  "SRC-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
  "SRC-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016"
];

const wowlistCensusRows = readFileSync(
  "docs/knowledge-bank/wowlist-post-census-2026-07-12.csv",
  "utf8"
)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const kctownhallPopulationSourceIds = [
  "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
  "SRC-KCTH-FULL-POPULATION-RUN-2026",
  "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
  "SRC-KCTH-SOCIAL-LAUNCH-2018",
  "SRC-KCTH-SOCIAL-NEIGHBORHOOD-PROCESS-2018",
  "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
  "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
  "SRC-KCTH-SOCIAL-TIRES-2019-RECAP",
  "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
  "SRC-KCTH-SOCIAL-TIRES-2021-RECAP"
];

const kctownhallCensusText = readFileSync(
  "docs/knowledge-bank/kctownhall-post-census-2026-07-12.csv",
  "utf8"
);
const kctownhallCensusRows = kctownhallCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const nycartcPopulationSourceIds = [
  "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
  "SRC-NYCAC-FULL-POPULATION-RUN-2026",
  "SRC-NYCAC-SOCIAL-FAIR-RENT-2026",
  "SRC-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
  "SRC-NYCAC-SOCIAL-ARTIST-LABOR-2026",
  "SRC-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025"
];

const nycartcCensusText = readFileSync(
  "docs/knowledge-bank/nycartc-post-census-2026-07-12.csv",
  "utf8"
);
const nycartcCensusRows = nycartcCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));
const nycartcRecoveredCensusRows = nycartcCensusRows.filter(
  (row) => row[9] === "recovered"
);
const nycartcUnresolvedCensusRows = nycartcCensusRows.filter(
  (row) => row[9] === "unresolved"
);

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
const publicSitePromotedCandidates = promotedCandidates.filter((candidate) =>
  knowledgeBank.claims
    .find((claim) => claim.id === candidate.promotedClaimId)
    ?.projections.some(
      (projection) =>
        projection.status === "active" && projection.surfaces.some((surface) => surface.startsWith("/"))
    )
);
const renderedProjectionSources = [
  readFileSync("apps/www/src/app/about/page.tsx", "utf8"),
  readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8"),
  readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8"),
  readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8")
].join("\n");
const publicRegistryText = readFileSync(
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "utf8"
);

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
      publicSitePromotedCandidates.length > 0 &&
      publicSitePromotedCandidates.every((candidate) => {
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
  },
  {
    id: "kc-town-hall-council-record",
    label: "Council adoption, appropriation, and later clawback have canonical source readings",
    pass: kcTownHallCouncilSourceIds.every((id) => {
      const reading = readingBySourceId.get(id);
      return sourceIds.has(id) && reading && reading.assertions.length >= 2 && reading.limitations.length >= 1;
    })
  },
  {
    id: "kc-town-hall-council-promotion",
    label: "The Council authorization candidate is promoted while receipt and disbursement remain held",
    pass:
      candidateById.get("CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION")?.status === "promoted" &&
      candidateById.get("CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION")?.promotedClaimId ===
        "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD" &&
      promotions.some(
        (promotion) =>
          promotion.candidateClaimId === "CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION" &&
          promotion.claimId === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD" &&
          promotion.decision === "promoted"
      ) &&
      candidateById.get("CND-KC-TOWN-HALL-FUNDING-AWARD")?.status === "hold" &&
      !candidateById.get("CND-KC-TOWN-HALL-FUNDING-AWARD")?.promotedClaimId
  },
  {
    id: "kc-town-hall-council-projection",
    label: "The case study renders Council allocation with the non-disbursement lifecycle boundary",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
      );
      const projection = claim?.projections.find((item) => item.key === "case-study");
      return Boolean(
        projection &&
        /Council.*adopted/i.test(projection.text) &&
        /appropriat/i.test(projection.text) &&
        /490,539/.test(projection.text) &&
        /withdr/i.test(projection.text) &&
        claim?.boundaries.some((boundary) => /disburs/i.test(boundary)) &&
        renderedProjectionSources.includes("CLM-KC-TOWN-HALL-MUNICIPAL-RECORD")
      );
    })()
  },
  {
    id: "kc-town-hall-transition-lineage",
    label: "The mission-aligned transition has firsthand source, reading, candidate, and promotion lineage",
    pass: (() => {
      const sourceId = "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026";
      const candidate = candidateById.get("CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION");
      return Boolean(
        sourceIds.has(sourceId) &&
        readingBySourceId.get(sourceId)?.assertions.length >= 2 &&
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === candidate.id &&
            promotion.claimId === candidate.promotedClaimId &&
            promotion.decision === "promoted"
        )
      );
    })()
  },
  {
    id: "kc-town-hall-transition-privacy",
    label: "The public projection names the transition without encoding its private cause",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
      );
      const projection = claim?.projections.find((item) => item.key === "case-study");
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026"
      );
      return Boolean(
        projection?.text.includes("transitioned the project to a mission-aligned organization") &&
        claim?.boundaries.some((boundary) => /reason.*transition.*not.*publish/i.test(boundary)) &&
        source?.doesNotEstablish.some((boundary) => /reason for the transition/i.test(boundary)) &&
        !/(because|due to).*transition/i.test(projection.text)
      );
    })()
  },
  {
    id: "teams-archive-intake",
    label: "Jamie Projects History, CRS, and job-hunt each have bounded archive dispositions",
    pass: teamsArchiveIntakeIds.every((id) => {
      const item = intakeItems.find((candidate) => candidate.id === id);
      return Boolean(
        item &&
        item.visibility === "protected" &&
        item.status === "processed" &&
        item.protectedLocatorId &&
        item.linkedRecordIds.includes("INQ-TEAMS-ARCHIVAL-PRODUCTION-2026")
      );
    })
  },
  {
    id: "archival-production-readings",
    label: "Every archival-production source has an atomic close reading with limits",
    pass: archivalProductionSourceIds.every((id) => {
      const source = knowledgeBank.sources.find((item) => item.id === id);
      const reading = readingBySourceId.get(id);
      return Boolean(
        source &&
        source.supportsGenerally.length >= 2 &&
        source.doesNotEstablish.length >= 2 &&
        reading &&
        reading.assertions.length >= 2 &&
        reading.limitations.length >= 1
      );
    })
  },
  {
    id: "crs-data-pilot-promotion",
    label: "The privacy-preserving data pilot has complete promotion and citation lineage",
    pass: (() => {
      const candidate = candidateById.get("CND-CRS-PRIVACY-PRESERVING-DATA-PILOT");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT"
      );
      const occurrence = knowledgeBank.pages
        .find((page) => page.id === "fair-rent-nyc")
        ?.occurrences.find((item) => item.id === "crs-privacy-preserving-data-pilot");
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === candidate.id &&
            promotion.claimId === claim?.id &&
            promotion.decision === "promoted"
        ) &&
        claim?.boundaries.some((boundary) => /not an adopted|proposal/i.test(boundary)) &&
        occurrence?.sourceIds?.includes("SRC-CRS-FULLER-PUBLIC-BASELINE-2026") &&
        renderedProjectionSources.includes(claim.id) &&
        renderedProjectionSources.includes(occurrence.id)
      );
    })()
  },
  {
    id: "archival-production-depth-holds",
    label: "Mature provenance and technical-history fragments remain available but unprojected",
    pass: [
      "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT",
      "CND-SORTED-AUDIO-MAXMSP-2013"
    ].every((id) => {
      const candidate = candidateById.get(id);
      return (
        candidate?.status === "ready-for-promotion" &&
        !candidate.promotedClaimId &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === id && promotion.decision === "held"
        )
      );
    })
  },
  {
    id: "raft-scale-with-landing-boundary",
    label: "The public throughline uses verified scale while the exact Gulf landing remains held",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE"
      );
      const projection = claim?.projections.find((item) => item.key === "about");
      const gulfCandidate = candidateById.get("CND-RIVER-RAFT-KC-GULF");
      return Boolean(
        projection?.text.includes("more than 1,000 miles") &&
        claim?.evidence.some(
          (evidence) =>
            evidence.sourceId === "SRC-RAFT-SOUNDINGS-2007" && evidence.renderCitation
        ) &&
        gulfCandidate?.status === "research-needed" &&
        !gulfCandidate.promotedClaimId &&
        !projection?.text.includes("Gulf of Mexico")
      );
    })()
  },
  {
    id: "archival-production-public-safety",
    label: "Protected locators and private archive coordinates stay out of the public registry",
    pass:
      !/ARCHIVE-TEAMS|ARCHIVE-CRS|RESEARCH-TEAMS/.test(publicRegistryText) &&
      !/Mobile Documents|CloudDocs|job-hunt\//i.test(publicRegistryText) &&
      knowledgeBank.sources
        .filter((source) =>
          [
            "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
            "SRC-CRS-OPEN-DATA-FOUNDATION-2025"
          ].includes(source.id)
        )
        .every(
          (source) =>
            source.visibility !== "public" &&
            !source.canonicalUrl &&
            !source.archiveUrl &&
            !source.assetUrl
        )
  },
  {
    id: "shared-drive-corpus-selection",
    label: "Shared Drive research records collection scope, selection, and access limits",
    pass: (() => {
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026"
      );
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"
      );
      return Boolean(
        source?.supportsGenerally.some((item) => /110 Shared Drives/.test(item)) &&
        source?.doesNotEstablish.some((item) => /created every accessible drive/.test(item)) &&
        inquiry?.methods.some((item) => /representative cohort/i.test(item)) &&
        inquiry?.limitations.some((item) => /not establish.*authored every file/i.test(item)) &&
        sharedDriveIntakeIds.every((id) => {
          const intake = intakeItems.find((item) => item.id === id);
          return intake?.visibility === "protected" && intake.status === "processed";
        })
      );
    })()
  },
  {
    id: "shared-drive-close-readings",
    label: "Every selected Shared Drive source has atomic assertions and explicit limits",
    pass: sharedDriveSourceIds.every((id) => {
      const source = knowledgeBank.sources.find((item) => item.id === id);
      const reading = readingBySourceId.get(id);
      return Boolean(
        source &&
        source.supportsGenerally.length >= 2 &&
        source.doesNotEstablish.length >= 2 &&
        reading &&
        reading.assertions.length >= 2 &&
        reading.limitations.length >= 1
      );
    })
  },
  {
    id: "shared-drive-authorship-discipline",
    label: "Revision evidence distinguishes Jamie's stewardship from shared access",
    pass: [
      "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
      "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
      "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
      "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
      "SRC-GDRIVE-196-ONBOARDING-LETTER-2023"
    ].every((id) => {
      const source = knowledgeBank.sources.find((item) => item.id === id);
      const reading = readingBySourceId.get(id);
      return Boolean(
        source?.supportsGenerally.some((item) => /recorded revisions|revision-level/i.test(item)) &&
        reading?.assertions.some((assertion) => /revision/i.test(assertion.locator ?? ""))
      );
    })
  },
  {
    id: "shared-drive-claim-promotion",
    label: "The campaign-memory claim has complete private-evidence promotion lineage",
    pass: (() => {
      const candidate = candidateById.get("CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CRS-SHARED-MEMORY-OPERATIONS"
      );
      const occurrence = knowledgeBank.pages
        .find((page) => page.id === "fair-rent-nyc")
        ?.occurrences.find((item) => item.id === "crs-shared-memory-operations");
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        claim?.evidence.length === 3 &&
        claim.evidence.every(
          (evidence) => evidence.relationship === "private-support" && !evidence.renderCitation
        ) &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === candidate.id &&
            promotion.claimId === claim.id &&
            promotion.decision === "promoted"
        ) &&
        occurrence?.claimId === claim.id &&
        renderedProjectionSources.includes(claim.id) &&
        renderedProjectionSources.includes(occurrence.id)
      );
    })()
  },
  {
    id: "shared-drive-public-safety-and-restraint",
    label: "Private Drive coordinates stay redacted and deeper workflow claims remain held",
    pass:
      sharedDriveSourceIds.every((id) => {
        const source = knowledgeBank.sources.find((item) => item.id === id);
        return Boolean(
          source &&
          source.visibility !== "public" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
        );
      }) &&
      sharedDriveHeldCandidateIds.every((id) => {
        const candidate = candidateById.get(id);
        return Boolean(candidate && candidate.status !== "promoted" && !candidate.promotedClaimId);
      }) &&
      !/SRC-GDRIVE|ARCHIVE-GDRIVE|RESEARCH-GDRIVE/.test(publicRegistryText)
  },
  {
    id: "social-archive-lineage",
    label: "Project social-account evidence has complete intake, source, and reading lineage",
    pass:
      socialArchiveIntakeIds.every((id) => intakeItems.some((item) => item.id === id)) &&
      socialArchiveSourceIds.every((id) => {
        const reading = readingBySourceId.get(id);
        return sourceIds.has(id) && reading && reading.assertions.length >= 1 && reading.limitations.length >= 1;
      })
  },
  {
    id: "social-archive-bounded-corpus",
    label: "Social corpus findings record coverage, resolved links, and platform limits",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-PROJECT-SOCIAL-ARCHIVE-2026"
      );
      return Boolean(
        inquiry?.findings.some((item) => /286 distinct.*279/i.test(item)) &&
        inquiry.findings.some((item) => /193 unique/i.test(item)) &&
        inquiry.limitations.some((item) => /Wayback coverage is selective/i.test(item)) &&
        inquiry.limitations.some((item) => /post-level authorship cannot be inferred/i.test(item))
      );
    })()
  },
  {
    id: "social-account-inventory-coverage",
    label: "Every recovered canonical project account has bounded source and reading coverage",
    pass: (() => {
      const registry = readFileSync("docs/knowledge-bank/social-account-registry.md", "utf8");
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-PROJECT-SOCIAL-ARCHIVE-2026"
      );
      return Boolean(
        /@CallNYCapp/.test(registry) &&
        /@NYCArtC/.test(registry) &&
        /@wowlist/.test(registry) &&
        inquiry?.findings.some((item) => /Two recovered @wowlist posts/i.test(item))
      );
    })()
  },
  {
    id: "social-council-minimum-not-total",
    label: "Direct Council engagement is promoted only as a recovered minimum",
    pass: (() => {
      const minimum = candidateById.get("CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM");
      const exact = candidateById.get("CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT");
      const legacyBroadClaim = candidateById.get("CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"
      );
      return Boolean(
        minimum?.status === "promoted" &&
        minimum.promotedClaimId === "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM" &&
        /29 direct posts.*13 distinct then-sitting/i.test(minimum.text) &&
        /29 public posts.*13 distinct then-sitting/i.test(claim?.internalClaim || "") &&
        claim?.boundaries.some((item) => /minimums, not comprehensive totals/i.test(item)) &&
        exact?.status !== "promoted" &&
        !exact?.promotedClaimId &&
        legacyBroadClaim?.status === "partially-supported" &&
        !legacyBroadClaim.promotedClaimId
      );
    })()
  },
  {
    id: "authenticated-social-lineage",
    label: "Authenticated social findings have atomic sources, readings, and platform limits",
    pass:
      intakeItems.some((item) => item.id === "INT-2026-07-12-AUTHENTICATED-X-ARCHIVE") &&
      authenticatedSocialSourceIds.every((id) => {
        const reading = readingBySourceId.get(id);
        return sourceIds.has(id) && reading && reading.assertions.length >= 1 && reading.limitations.length >= 1;
      })
  },
  {
    id: "social-collaborator-credit",
    label: "Olympia Kazi continuity is promoted under her authorship without shared-account overreach",
    pass: (() => {
      const candidate = candidateById.get("CND-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP"
      );
      return Boolean(
        candidate?.status === "promoted" &&
        /89 recovered posts/i.test(candidate.text) &&
        claim?.boundaries.some((item) => /Credit the posts to Olympia Kazi/i.test(item)) &&
        claim.boundaries.some((item) => /Do not infer.*shared @NYCArtC account/i.test(item))
      );
    })()
  },
  {
    id: "social-city-dialogue-boundary",
    label: "City-agency dialogue is source-backed without becoming an adoption claim",
    pass: (() => {
      const candidate = candidateById.get("CND-NYCAC-CITY-DIALOGUE");
      const claim = knowledgeBank.claims.find((item) => item.id === "CLM-NYCAC-CITY-DIALOGUE");
      return Boolean(
        candidate?.status === "promoted" &&
        /Seventeen authenticated-search posts/i.test(candidate.supportSummary) &&
        claim?.boundaries.some((item) => /do not equal adoption/i.test(item)) &&
        claim.antiClaims.some((item) => /adopted every coalition recommendation/i.test(item))
      );
    })()
  },
  {
    id: "callnyc-full-population-accounting",
    label: "The complete 110-slot CallNYC control is accounted without hiding the recovery gap",
    pass:
      callnycCensusRows.length === 110 &&
      callnycRecoveredCensusRows.length === 107 &&
      callnycUnresolvedCensusRows.length === 3 &&
      new Set(callnycRecoveredCensusRows.map((row) => row[1])).size === 107 &&
      callnycRecoveredCensusRows.filter((row) => row[3] === "authored-post").length === 86 &&
      callnycRecoveredCensusRows.filter((row) => row[3] === "authored-reply").length === 6 &&
      callnycRecoveredCensusRows.filter((row) => row[3] === "repost").length === 15
  },
  {
    id: "callnyc-full-population-lineage",
    label: "CallNYC population findings have intake, source, reading, inquiry, and hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-CALLNYC-FULL-POPULATION-2026"
      );
      const exact = candidateById.get("CND-CALLNYC-EXACT-EXPORT-COMPLETION");
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-12-CALLNYC-FULL-POPULATION"
        ) &&
        callnycPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        inquiry.findings.some((item) => /110-slot.*107 recovered.*three unresolved/i.test(item)) &&
        inquiry.limitations.some((item) => /official account export/i.test(item)) &&
        exact?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === exact.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "callnyc-service-pattern-boundary",
    label: "Record-level service findings are promoted without converting mentions into engagement",
    pass: (() => {
      const candidate = candidateById.get(
        "CND-CALLNYC-SERVICE-RECOGNITION-PATTERN"
      );
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CALLNYC-SERVICE-RECOGNITION-PATTERN"
      );
      return Boolean(
        callnycRecoveredCensusRows.filter(
          (row) => row[3].startsWith("authored-") && row[6] === "true"
        ).length === 72 &&
        candidate?.status === "promoted" &&
        /72.*92.*26.*66/i.test(candidate.text) &&
        claim?.boundaries.some((item) => /not proof.*engaged|not direct.*engagement/i.test(item)) &&
        claim.antiClaims.some((item) => /Twenty-six Council members directly engaged/i.test(item))
      );
    })()
  },
  {
    id: "wowlist-full-population-accounting",
    label: "The complete 38-record WOWList profile population is recovered and classified",
    pass:
      wowlistCensusRows.length === 38 &&
      wowlistCensusRows.every((row) => row[9] === "recovered") &&
      new Set(wowlistCensusRows.map((row) => row[1])).size === 38 &&
      wowlistCensusRows.filter((row) => row[3] === "authored-post").length === 16 &&
      wowlistCensusRows.filter((row) => row[3] === "authored-reply").length === 6 &&
      wowlistCensusRows.filter((row) => row[3] === "repost").length === 16
  },
  {
    id: "wowlist-full-population-lineage",
    label: "WOWList population findings have complete intake, source, reading, inquiry, and promotion lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-WOWLIST-FULL-POPULATION-2026"
      );
      const population = candidateById.get("CND-WOWLIST-COMPLETE-SOCIAL-POPULATION");
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-12-WOWLIST-FULL-POPULATION"
        ) &&
        wowlistPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        inquiry.findings.some((item) => /All 38 profile-counted records/i.test(item)) &&
        inquiry.limitations.some((item) => /shared account.*teammate/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION"
      );
    })()
  },
  {
    id: "wowlist-support-and-care-boundaries",
    label: "WOWList support and civic-care patterns are projected with shared-authorship and impact boundaries",
    pass: (() => {
      const support = candidateById.get("CND-WOWLIST-PUBLIC-SUPPORT-SURFACE");
      const supportClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE"
      );
      const civicClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-WOWLIST-CIVIC-CARE-CONTINUITY"
      );
      const wowlistMdx = readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8");
      return Boolean(
        wowlistCensusRows.filter(
          (row) => row[5] === "product-support-and-onboarding"
        ).length === 6 &&
        wowlistCensusRows.filter(
          (row) => row[5] === "civic-mobilization-and-care"
        ).length === 5 &&
        wowlistCensusRows.filter((row) => row[5] === "civic-care-amplification")
          .length === 5 &&
        support?.status === "promoted" &&
        supportClaim?.boundaries.some((item) => /do not assign individual post authorship/i.test(item)) &&
        civicClaim?.boundaries.some((item) => /does not establish.*causality/i.test(item)) &&
        /claimId="CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE"/.test(wowlistMdx)
      );
    })()
  },
  {
    id: "kctownhall-full-population-accounting",
    label: "The complete 183-record KC Town Hall profile population is recovered and classified",
    pass:
      kctownhallCensusRows.length === 183 &&
      kctownhallCensusRows.every((row) => row[9] === "recovered") &&
      new Set(kctownhallCensusRows.map((row) => row[1])).size === 183 &&
      kctownhallCensusRows.filter((row) => row[3] === "authored-post").length === 142 &&
      kctownhallCensusRows.filter((row) => row[3] === "authored-reply").length === 13 &&
      kctownhallCensusRows.filter((row) => row[3] === "repost").length === 28 &&
      kctownhallCensusRows.filter(
        (row) => row[5] === "resident-service-and-environmental-action"
      ).length === 100
  },
  {
    id: "kctownhall-full-population-lineage",
    label: "KC Town Hall population findings have complete lifecycle and research-hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-KCTH-FULL-POPULATION-2026"
      );
      const population = candidateById.get("CND-KCTH-COMPLETE-SOCIAL-POPULATION");
      const outcomes = candidateById.get("CND-KCTH-TIRES-OUTCOME-TOTALS");
      return Boolean(
        intakeItems.some((item) => item.id === "INT-2026-07-12-KCTH-FULL-POPULATION") &&
        kctownhallPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        inquiry.findings.some((item) => /All 183 profile-counted records/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-KCTH-COMPLETE-SOCIAL-POPULATION" &&
        outcomes?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === outcomes.id && promotion.decision === "held"
        ) &&
        discoveryNotes.some(
          (note) => note.id === "DISC-KCTH-TIRES-INDEPENDENT-CORROBORATION-2026"
        )
      );
    })()
  },
  {
    id: "kctownhall-workflow-credit-and-privacy",
    label: "The resident-service workflow preserves collective credit, metric boundaries, and resident privacy",
    pass: (() => {
      const workflow = candidateById.get("CND-KCTH-RESIDENT-SERVICE-WORKFLOW");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW"
      );
      const page = readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8");
      return Boolean(
        workflow?.status === "promoted" &&
        workflow.promotedClaimId === "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW" &&
        claim?.boundaries.some(
          (item) => /Julia and Jamie.*KC Town Hall.*Oak Park Neighborhood Association/i.test(item)
        ) &&
        claim.boundaries.some((item) => /project-reported|independently corroborated/i.test(item)) &&
        /claimId="CLM-KCTH-RESIDENT-SERVICE-WORKFLOW"/.test(page) &&
        !/\b816[- )]/.test(kctownhallCensusText) &&
        !/resident-submitted location/i.test(kctownhallCensusText)
      );
    })()
  },
  {
    id: "nycartc-full-population-accounting",
    label: "The complete 5,124-slot NYC Artist Coalition control is accounted without overstating recovery",
    pass:
      nycartcCensusRows.length === 5124 &&
      nycartcRecoveredCensusRows.length === 892 &&
      nycartcUnresolvedCensusRows.length === 4232 &&
      new Set(nycartcRecoveredCensusRows.map((row) => row[1])).size === 892 &&
      nycartcUnresolvedCensusRows.every((row) => !row[1]) &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "repost").length === 541 &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "authored-post").length === 103 &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "authored-reply").length === 12 &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "authored-record").length === 236
  },
  {
    id: "nycartc-full-population-lineage",
    label: "NYC Artist Coalition population findings have intake, source, reading, inquiry, promotion, and hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-NYCAC-FULL-POPULATION-2026"
      );
      const population = candidateById.get("CND-NYCAC-POPULATION-ACCOUNTING");
      const continuation = candidateById.get("CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE");
      const proportions = candidateById.get("CND-NYCAC-POPULATION-THEME-PROPORTIONS");
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-12-NYCAC-FULL-POPULATION"
        ) &&
        nycartcPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        inquiry.findings.some((item) => /5,124.*892/i.test(item)) &&
        inquiry.limitations.some((item) => /4,232 unresolved/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-NYCAC-POPULATION-ACCOUNTING" &&
        continuation?.status === "promoted" &&
        continuation.promotedClaimId === "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE" &&
        proportions?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === proportions.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "nycartc-public-boundaries",
    label: "NYC Artist Coalition population documentation preserves absence, privacy, and non-extrapolation boundaries",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-POPULATION-ACCOUNTING"
      );
      const page = readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8");
      const report = readFileSync(
        "docs/knowledge-bank/nycartc-population-2026-07-12.md",
        "utf8"
      );
      return Boolean(
        /complete accounting, not complete recovery/i.test(report) &&
        /17\.4\s+percent/i.test(report) &&
        claim?.boundaries.some((item) => /82\.6 percent.*unresolved/i.test(item)) &&
        claim.antiClaims.some((item) => /All 5,124 records were recovered/i.test(item)) &&
        /claimId="CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE"/.test(page) &&
        /^ledger_id,status_id,date,record_type,account,primary_theme,mentioned_handles,hashtags,status_url,accounting_status/m.test(
          nycartcCensusText
        ) &&
        !/full_text|post_text|private_path|protected_locator/i.test(
          nycartcCensusText.split("\n")[0]
        )
      );
    })()
  },
  {
    id: "social-identity-collective-authorship",
    label: "Identity-system authorship is visible while post authorship remains collective",
    pass: (() => {
      const identity = candidateById.get("CND-NYCAC-PUBLIC-IDENTITY-SYSTEM");
      const namedStewardship = candidateById.get(
        "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP"
      );
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM"
      );
      return Boolean(
        identity?.status === "promoted" &&
        claim?.boundaries.some((item) => /individual authorship|every post/i.test(item)) &&
        namedStewardship?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === namedStewardship.id && promotion.decision === "held"
        )
      );
    })()
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
