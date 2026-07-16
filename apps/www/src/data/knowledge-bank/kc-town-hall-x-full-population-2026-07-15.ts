import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const project = "kc-town-hall";

function socialPost(
  id: string,
  title: string,
  organization: string,
  canonicalUrl: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[],
  kind: "institutional-social-post" | "government-social-post" =
    "institutional-social-post"
): SourceRecord {
  return {
    id,
    title,
    organization,
    kind,
    visibility: "public",
    preservationStatus: "live",
    publishedAt,
    accessedAt: reviewedAt,
    canonicalUrl,
    preferredPublicUrl: "canonical",
    publicCitation,
    publicNote,
    supportsGenerally,
    doesNotEstablish
  };
}

export const kcTownHallFullPopulationSourceIds = {
  population: "SRC-X-KCTOWNHALL-FULL-POPULATION-2026",
  neighborhoodProcess: "SRC-X-KCTOWNHALL-NEIGHBORHOOD-PROCESS-2018",
  tireWorkflow: "SRC-X-KCTOWNHALL-TIRE-WORKFLOW-2021",
  lucas: "SRC-X-KCTOWNHALL-LUCAS-RESPONSE-2019",
  justus: "SRC-X-KCTOWNHALL-JUSTUS-RESPONSE-2019",
  robinson: "SRC-X-KCTOWNHALL-ROBINSON-RESPONSE-2020",
  bridgingTheGap: "SRC-X-KCTOWNHALL-BTG-TIRE-DROPOFF-2019",
  councilRoster: "SRC-KCTH-KCMO-COUNCIL-ROSTER-2019",
  robinsonService: "SRC-KCTH-KCMO-ROBINSON-SERVICE-RECORD",
  leonArticle: "SRC-KCTH-KCSTAR-LEONS-2016",
  affordableHousing: "SRC-KCTH-NORTHEAST-AFFORDABLE-HOUSING-2018",
  renterCredit: "SRC-KCTH-CURBED-RENTER-CREDIT-2018",
  rideKcNext: "SRC-KCTH-RIDEKC-NEXT-2019",
  kcurElection: "SRC-KCTH-KCUR-PRIMARY-GUIDE-2018",
  voterLookup: "SRC-KCTH-MISSOURI-VOTER-LOOKUP-2018",
  ozoneAlert: "SRC-KCTH-KCATA-OZONE-ALERT-2018",
  covidVideo: "SRC-KCTH-COVID-RESOURCE-VIDEO-2020",
  cleanupVideo: "SRC-KCTH-SITE-CLEANUP-VIDEO-2018"
} as const;

export const kcTownHallFullPopulationClaimIds = {
  accountRole: "CLM-KCTOWNHALL-ACCOUNT-ESTABLISHMENT-ROLE",
  population: "CLM-KCTOWNHALL-FULL-POPULATION-PRACTICE",
  residentInput: "CLM-KCTOWNHALL-RESIDENT-INPUT-SURFACE",
  tireOperations: "CLM-KCTOWNHALL-TIRE-OPERATING-PATTERN",
  tireCorroboration: "CLM-KCTOWNHALL-TIRE-DROPOFF-CORROBORATION",
  councilResponses: "CLM-KCTOWNHALL-COUNCIL-RESPONSE-FLOOR",
  civicCuration: "CLM-KCTOWNHALL-CIVIC-RESOURCE-CURATION",
  engagement: "CLM-KCTOWNHALL-VISIBLE-ENGAGEMENT-SNAPSHOT"
} as const;

const curatedSourceIds = [
  kcTownHallFullPopulationSourceIds.leonArticle,
  kcTownHallFullPopulationSourceIds.affordableHousing,
  kcTownHallFullPopulationSourceIds.renterCredit,
  kcTownHallFullPopulationSourceIds.rideKcNext,
  kcTownHallFullPopulationSourceIds.kcurElection,
  kcTownHallFullPopulationSourceIds.voterLookup,
  kcTownHallFullPopulationSourceIds.ozoneAlert,
  kcTownHallFullPopulationSourceIds.covidVideo,
  kcTownHallFullPopulationSourceIds.cleanupVideo
] as const;

export const kcTownHallFullPopulationSourceRecords20260715 = [
  {
    id: kcTownHallFullPopulationSourceIds.population,
    title: "Authenticated @KCTownHall full-population archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe July 2026 review of all 183 records currently reported by the @KCTownHall profile counter.",
    publicNote:
      "The review reconciles the current displayed population and supports the tire-related publishing pattern and bounded stakeholder-response floor; record-level public status URLs remain in the repository fixture.",
    supportsGenerally: [
      "the complete displayed account population",
      "record-type and posted-URL inventories",
      "publishing-pattern analysis",
      "bounded stakeholder-response inventory",
      "dated visible-engagement context"
    ],
    doesNotEstablish: [
      "every deleted, private, withheld, or unindexed historical record",
      "authorship of every institutional post",
      "independent verification of account-published quantities",
      "reach, participation, endorsement, adoption, project completion, or causal impact"
    ]
  },
  socialPost(
    kcTownHallFullPopulationSourceIds.neighborhoodProcess,
    "KC Town Hall neighborhood-process invitation",
    "KC Town Hall",
    "https://x.com/KCTownHall/status/1013903289392517120",
    "2018-07-02",
    "KC Town Hall, public invitation for residents to say what they wanted in the proposed 36th-and-Indiana neighborhood site, July 2, 2018.",
    "The post documents a public resident-input invitation connected to the proposed neighborhood resource and cultural center.",
    ["resident-input invitation", "neighborhood process", "public project participation"],
    ["survey response totals", "adoption of every response", "project completion", "individual post authorship"]
  ),
  socialPost(
    kcTownHallFullPopulationSourceIds.tireWorkflow,
    "KC Town Hall free household tire-pickup workflow",
    "KC Town Hall",
    "https://x.com/KCTownHall/status/1457012244588412935",
    "2021-11-06",
    "KC Town Hall, public free household tire-pickup intake and update post, November 6, 2021.",
    "The post documents the project account operating as an intake and update surface for recurring free household tire pickup in East Kansas City. The linked public status contains historical contact information that is not reproduced in the knowledge bank.",
    ["service-intake workflow", "recurring neighborhood cleanup", "before-and-after operating updates"],
    ["independently verified tire totals", "total participation", "causal health impact", "individual post authorship"]
  ),
  socialPost(
    kcTownHallFullPopulationSourceIds.lucas,
    "Quinton Lucas response to KC Town Hall's Leon's alert",
    "Kansas City, Missouri City Council",
    "https://x.com/QuintonLucasKC/status/1122866432130334720",
    "2019-04-29",
    "Then-Council Member Quinton Lucas, public quote-response to KC Town Hall's Leon's Thriftway alert, April 29, 2019.",
    "Lucas said he had spoken with ownership and was looking for a way to help keep the neighborhood grocery store operating.",
    ["direct Council-member account response", "neighborhood food-access context"],
    ["KC Town Hall policy causality", "store preservation", "blanket endorsement"],
    "government-social-post"
  ),
  socialPost(
    kcTownHallFullPopulationSourceIds.justus,
    "Jolie Justus response to KC Town Hall about Leon's",
    "Kansas City, Missouri City Council",
    "https://x.com/joliejustus/status/1122883010582466560",
    "2019-04-29",
    "Then-Council Member Jolie Justus, public reply to KC Town Hall about Leon's Thriftway, April 29, 2019.",
    "Justus said she had been working with the EDC on possible solutions, had stopped by for an update, and saw strong community commitment.",
    ["direct Council-member account response", "economic-development follow-up"],
    ["KC Town Hall policy causality", "store preservation", "blanket endorsement"],
    "government-social-post"
  ),
  socialPost(
    kcTownHallFullPopulationSourceIds.robinson,
    "Melissa Robinson response to KC Town Hall",
    "Kansas City, Missouri City Council",
    "https://x.com/Robinson4kc/status/1289714535251742726",
    "2020-08-01",
    "Council Member Melissa Robinson, public reply thanking KC Town Hall for work to improve community conditions, August 1, 2020.",
    "The reply directly acknowledges KC Town Hall's community-condition work without identifying every underlying activity or outcome.",
    ["direct Council-member account response", "community-condition work"],
    ["specific program totals", "policy adoption", "blanket endorsement", "causal government impact"],
    "government-social-post"
  ),
  socialPost(
    kcTownHallFullPopulationSourceIds.bridgingTheGap,
    "Bridging the Gap collaborator report of a KC Town Hall tire drop-off",
    "Bridging the Gap",
    "https://x.com/trutheresme/status/1148277187583389703",
    "2019-07-08",
    "A Bridging the Gap collaborator, public report of receiving a large tire drop-off from KC Town Hall, July 8, 2019.",
    "The post supplies external qualitative corroboration of one KC Town Hall tire drop-off and connects the work to healthier, greener communities.",
    ["external program corroboration", "tire drop-off", "environmental collaboration"],
    ["an exact tire count", "full program scale", "causal health outcome"]
  ),
  {
    id: kcTownHallFullPopulationSourceIds.councilRoster,
    title: "Kansas City Council roster in the 2019 Bike KC Master Plan",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-01-01",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kcmo.gov/home/showpublisheddocument/6992/637684219737100000",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of Kansas City, Missouri, 2019 Bike KC Master Plan Council roster.",
    publicNote:
      "The roster identifies Quinton Lucas and Jolie Justus as Council members during the April 2019 responses.",
    supportsGenerally: ["Quinton Lucas Council service", "Jolie Justus Council service"],
    doesNotEstablish: ["endorsement of KC Town Hall", "policy causality"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.robinsonService,
    title: "Melissa Robinson person and Council service record",
    organization: "City Clerk, Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://clerk.kcmo.gov/PersonDetail.aspx?GUID=1696D403-A114-4AB0-B632-A303AF8E3B3C&ID=240616",
    preferredPublicUrl: "canonical",
    publicCitation: "Kansas City Clerk record for Councilmember Melissa Robinson.",
    publicNote:
      "The record identifies Robinson as a Councilmember beginning July 19, 2019, before the August 2020 response.",
    supportsGenerally: ["Melissa Robinson Council service date"],
    doesNotEstablish: ["endorsement of KC Town Hall", "program totals", "policy causality"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.leonArticle,
    title: "Leon's Thriftway may be the oldest black-owned grocery store in the country",
    author: "Monty Davis",
    organization: "The Kansas City Star",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-07-01",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.kansascity.com/news/business/article87241897.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Monty Davis, 'Leon's Thriftway may be the oldest black-owned grocery store in the country,' The Kansas City Star, July 1, 2016.",
    publicNote:
      "Mission-relevant reporting circulated by @KCTownHall; it supplies neighborhood food-access context, not coverage of KC Town Hall or proof that the account preserved the store.",
    supportsGenerally: ["neighborhood food-access context", "Black-owned business history"],
    doesNotEstablish: ["KC Town Hall coverage", "KC Town Hall causal impact", "store preservation"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.affordableHousing,
    title: "Affordable Housing Policy hits the docket in KCMO",
    organization: "Northeast News",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2018-09-19",
    accessedAt: reviewedAt,
    canonicalUrl:
      "http://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    archiveUrl:
      "https://web.archive.org/web/20180920120704/http://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Northeast News, 'Affordable Housing Policy hits the docket in KCMO,' September 19, 2018.",
    publicNote:
      "Local policy reporting circulated by @KCTownHall; it is context for the account's civic-information practice, not coverage of the project.",
    supportsGenerally: ["local affordable-housing policy context", "civic-information circulation"],
    doesNotEstablish: ["KC Town Hall coverage", "policy causality", "project completion"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.renterCredit,
    title: "Tax credit for renters proposed by U.S. Senator Kamala Harris",
    author: "Alissa Walker",
    organization: "Curbed",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2018-07-20",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
    archiveUrl:
      "https://web.archive.org/web/20180720221744/https://www.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
    preferredPublicUrl: "archive",
    publicCitation:
      "Alissa Walker, 'Tax credit for renters proposed by U.S. Senator Kamala Harris,' Curbed, July 20, 2018.",
    publicNote:
      "National housing-policy reporting present through a repost; it is not KC Town Hall coverage or evidence of policy influence.",
    supportsGenerally: ["housing-affordability policy context", "mission-relevant source curation"],
    doesNotEstablish: ["KC Town Hall coverage", "formal policy partnership", "policy impact"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.rideKcNext,
    title: "RideKC Next System Redesign",
    organization: "Kansas City Area Transportation Authority",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: reviewedAt,
    canonicalUrl: "https://ridekc.org/planning/ridekc-next",
    archiveUrl:
      "https://web.archive.org/web/20190821135819/https://ridekc.org/planning/ridekc-next",
    preferredPublicUrl: "archive",
    publicCitation:
      "Kansas City Area Transportation Authority, archived RideKC Next System Redesign page.",
    publicNote:
      "Official transit-planning information reposted by @KCTownHall; the repost does not establish a formal project partnership.",
    supportsGenerally: ["public transit planning", "resident survey distribution"],
    doesNotEstablish: ["formal partnership", "survey participation", "transit-plan causality"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.kcurElection,
    title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
    author: "Erica Hunzinger",
    organization: "KCUR",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live-and-archived",
    publishedAt: "2018-08-05",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
    archiveUrl:
      "https://web.archive.org/web/20180805134939/http://www.kcur.org/post/cheat-sheet-tuesdays-primary-election-missouri",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Erica Hunzinger, 'A Cheat Sheet For Tuesday's Primary Election In Missouri,' KCUR, August 5, 2018.",
    publicNote:
      "Election information circulated by @KCTownHall; it does not establish use, turnout, or electoral impact.",
    supportsGenerally: ["Missouri election information", "civic-resource distribution"],
    doesNotEstablish: ["voter turnout", "KC Town Hall electoral impact", "partisan endorsement"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.voterLookup,
    title: "Missouri voter outreach search",
    organization: "Missouri Secretary of State",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://voteroutreach.sos.mo.gov/PRD/VoterOutreach/VOSearch.aspx",
    preferredPublicUrl: "canonical",
    publicCitation: "Missouri Secretary of State voter outreach and polling-place search.",
    publicNote:
      "Official voter information circulated by @KCTownHall; the post does not establish resource use or turnout.",
    supportsGenerally: ["official voter resource", "civic-information distribution"],
    doesNotEstablish: ["resource use", "voter turnout", "electoral impact"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.ozoneAlert,
    title: "Ozone Alert",
    organization: "Kansas City Area Transportation Authority",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: reviewedAt,
    canonicalUrl: "http://kcata.org/about_kcata/entries/ozone_alert/",
    archiveUrl:
      "https://web.archive.org/web/20181005031942/http://www.kcata.org/about_kcata/entries/ozone_alert",
    preferredPublicUrl: "archive",
    publicCitation:
      "Kansas City Area Transportation Authority, archived Ozone Alert resource.",
    publicNote:
      "Official transit and public-health information circulated by @KCTownHall; it does not establish ridership or health outcomes.",
    supportsGenerally: ["public-health information", "transit resource distribution"],
    doesNotEstablish: ["ridership", "health outcomes", "formal partnership"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.covidVideo,
    title: "COVID-19 relief resource Q&A",
    organization: "KC Town Hall",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-20",
    accessedAt: reviewedAt,
    canonicalUrl: "https://youtu.be/onCKU-TuPhc",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall, public COVID-19 relief resource Q&A video, April 2020.",
    publicNote:
      "The destination documents a public community-resource surface; it does not establish viewership, resolution, or individual authorship.",
    supportsGenerally: ["community COVID-19 information", "public resource distribution"],
    doesNotEstablish: ["viewership", "service resolution", "individual authorship"]
  },
  {
    id: kcTownHallFullPopulationSourceIds.cleanupVideo,
    title: "Bad latex paint cleanup video and tool list",
    organization: "KC Town Hall",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-08-30",
    accessedAt: reviewedAt,
    canonicalUrl: "https://youtu.be/PmLjLyOpS9I",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall, public site-cleanup documentation video, August 2018.",
    publicNote:
      "The destination documents a cleanup method and tool list; it does not establish the complete restoration scope or individual authorship.",
    supportsGenerally: ["site-cleanup documentation", "public method sharing"],
    doesNotEstablish: ["complete restoration", "individual authorship", "project completion"]
  }
] satisfies SourceRecord[];

export const kcTownHallFullPopulationClaimRecords20260715 = [
  {
    id: kcTownHallFullPopulationClaimIds.accountRole,
    project,
    internalClaim:
      "Jamie established @KCTownHall as public-facing project identity infrastructure; it became a shared surface with collective post authorship and changing stewardship.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "I established @KCTownHall as a shared project identity collaborators could continue using. Because it carried team work and later stewardship, I do not assign every post or later activity to myself.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
        relationship: "private-support",
        supports: ["Jamie's account-establishment role", "shared identity and handoff intent"],
        locator: "Jamie's July 2026 first-person account-establishment confirmation",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026",
        relationship: "corroborating",
        supports: ["the durable public account identity", "changing public record"],
        locator: "profile identity and dated account inventory",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Account establishment is not post-level authorship.",
      "Later program activity remains under changing stewardship unless post-level evidence supports a more specific role."
    ],
    antiClaims: ["Jamie authored every @KCTownHall post", "Jamie alone operated every later program"],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: kcTownHallFullPopulationClaimIds.population,
    project,
    internalClaim:
      "The Posts and Replies union recovered on July 15, 2026 contains 183 unique primary @KCTownHall records, exactly matching the profile counter after five other-account conversation-context cards are excluded.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "An authenticated archival review recovered all 183 records reported by the @KCTownHall profile counter.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFullPopulationSourceIds.population,
        relationship: "direct-support",
        supports: ["183 unique primary records", "exact reconciliation with the displayed profile counter"],
        locator: "fixture populationReconciliation and all 183 primary record entries",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The complete displayed population is not a complete history of deleted, private, withheld, or unindexed activity.",
      "The five other-account cards rendered as conversation context are not @KCTownHall records."
    ],
    antiClaims: [
      "The five conversation-context cards are @KCTownHall posts",
      "The fixture contains every record ever published by @KCTownHall"
    ],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: kcTownHallFullPopulationClaimIds.residentInput,
    project,
    internalClaim:
      "The @KCTownHall launch and neighborhood-process records invited people to help build a neighborhood resource and cultural center and asked residents what they wanted in the proposed 36th-and-Indiana site.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "The project account invited people to help build a neighborhood resource and cultural center and asked what they wanted in the proposed 36th-and-Indiana site.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-KCTOWNHALL-LAUNCH-2018",
        relationship: "direct-support",
        supports: ["participatory launch", "neighborhood-resource purpose"],
        locator: "visible launch-post text, project link, and timestamp",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFullPopulationSourceIds.neighborhoodProcess,
        relationship: "direct-support",
        supports: ["resident-input invitation", "site-specific neighborhood process"],
        locator: "visible post text, project link, and timestamp",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The posts document invitations and intended process, not response volume, adoption of every response, or completed redevelopment.",
      "Institutional posts are not assigned to an individual author."
    ],
    antiClaims: ["Every resident response was adopted", "The posts prove project completion"],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: kcTownHallFullPopulationClaimIds.tireOperations,
    project,
    internalClaim:
      "The complete displayed @KCTownHall population contains 100 tire-related records and documents recurring free household pickup intake and operating updates from 2019 through 2022.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "Across the 183 records currently displayed by the profile, 100 are tire-related. Together with archived service material, they document recurring free household pickup intake and updates from 2019 through 2022.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFullPopulationSourceIds.population,
        relationship: "direct-support",
        supports: ["100 tire-related records", "2019-2022 continuity"],
        locator:
          "fixture publishingPattern.tireRelatedRecordCount and record-level tire-related classifications",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-KCTH-TIRED-OF-TIRES-ARCHIVE-2020",
        relationship: "direct-support",
        supports: ["monthly free residential pickup", "Oak Park partnership", "resident and volunteer intake"],
        locator: "archived page service description and intake pathways",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-KCTH-TIRED-OF-TIRES-UPDATE-2019",
        relationship: "corroborating",
        supports: ["a recurring 2019 pickup workflow", "Jamie's named participation"],
        locator: "visible project-account update and timestamp",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFullPopulationSourceIds.tireWorkflow,
        relationship: "corroborating",
        supports: ["a 2021 household intake and update workflow"],
        locator: "visible workflow description and timestamp",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "One hundred tire-related records do not mean one hundred pickups, one hundred households, or a particular number of tires.",
      "First-party tire and savings totals remain held pending independent corroboration.",
      "The account does not assign every later pickup role to Jamie."
    ],
    antiClaims: [
      "KC Town Hall completed 100 tire pickups",
      "The social record independently verifies tire or savings totals",
      "Jamie personally authored or operated every record"
    ],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: kcTownHallFullPopulationClaimIds.tireCorroboration,
    project,
    internalClaim:
      "A Bridging the Gap collaborator publicly reported receiving a large tire drop-off from KC Town Hall in July 2019.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "An environmental-program collaborator separately reported receiving a large KC Town Hall tire drop-off.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFullPopulationSourceIds.bridgingTheGap,
        relationship: "direct-support",
        supports: ["external qualitative corroboration of one KC Town Hall tire drop-off"],
        locator: "visible post text, organization reference, and timestamp",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The post uses a qualitative scale description and does not independently establish an exact tire count, full program scale, or causal health outcome."
    ],
    antiClaims: ["The collaborator independently audited the program", "The post proves the complete program impact"],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: kcTownHallFullPopulationClaimIds.councilResponses,
    project,
    internalClaim:
      "Three sitting Kansas City Council-member accounts directly responded to @KCTownHall in mission-relevant contexts: Quinton Lucas and Jolie Justus around Leon's Thriftway in April 2019 and Melissa Robinson around community-condition work in August 2020.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "At least three sitting Kansas City Council-member accounts directly responded in mission-relevant contexts: Quinton Lucas and Jolie Justus around Leon's Thriftway, and Melissa Robinson around work to improve community conditions. These exchanges show public response, not endorsement or government adoption.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFullPopulationSourceIds.population,
        relationship: "corroborating",
        supports: ["the three-account direct-response floor and bounded stakeholder inventory"],
        locator: "fixture stakeholderResponseInventory.councilMemberAccounts",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFullPopulationSourceIds.lucas,
        relationship: "direct-support",
        supports: ["Quinton Lucas quote-response", "neighborhood food-access follow-up"],
        locator: "quote-post text, quoted KC Town Hall status, and timestamp",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFullPopulationSourceIds.justus,
        relationship: "direct-support",
        supports: ["Jolie Justus reply", "EDC and community follow-up"],
        locator: "reply text, conversation context, and timestamp",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFullPopulationSourceIds.robinson,
        relationship: "direct-support",
        supports: ["Melissa Robinson reply", "community-condition acknowledgment"],
        locator: "reply text, conversation context, and timestamp",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFullPopulationSourceIds.councilRoster,
        relationship: "corroborating",
        supports: ["Lucas and Justus Council service during the April 2019 responses"],
        locator: "2019 Council roster",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: kcTownHallFullPopulationSourceIds.robinsonService,
        relationship: "corroborating",
        supports: ["Robinson Council service before the August 2020 response"],
        locator: "City Clerk service record",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Three direct responses are a verified floor, not a complete stakeholder census.",
      "Direct response is not blanket endorsement, policy adoption, funding approval, or proof that KC Town Hall caused later government action."
    ],
    antiClaims: [
      "The Council endorsed KC Town Hall",
      "KC Town Hall caused the officials' follow-up",
      "Every tagged official engaged with the project"
    ],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: kcTownHallFullPopulationClaimIds.civicCuration,
    project,
    internalClaim:
      "The complete displayed population includes mission-relevant sources about neighborhood food access, local and national housing policy, public transit, elections, voter information, public health, COVID-19 relief, and site cleanup.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "The account also circulated neighborhood food-access, housing, transit, election, public-health, and cleanup resources.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFullPopulationSourceIds.population,
        relationship: "direct-support",
        supports: ["the account records containing the posted destinations"],
        locator: "fixture postedUrlInventory and record-level externalLinks",
        confidence: "high",
        renderCitation: false
      },
      ...curatedSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "context" as const,
        supports: ["mission-relevant content of one source circulated by the account"],
        locator: "source title, publisher, and main public or archived content",
        confidence: "high" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "Circulating a source does not establish authorship, formal partnership, publisher endorsement, resource use, or causal impact."
    ],
    antiClaims: ["KC Town Hall authored every linked source", "Every publisher was a KC Town Hall partner"],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: kcTownHallFullPopulationClaimIds.engagement,
    project,
    internalClaim:
      "At access time, 77 of 155 account-authored records displayed at least one interaction, totaling 22 replies, 70 reposts, 174 likes, and one bookmark, or 267 displayed interaction units.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "A dated interface snapshot preserved displayed interactions without treating them as reach, adoption, participation, endorsement, or impact.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: kcTownHallFullPopulationSourceIds.population,
        relationship: "direct-support",
        supports: ["the dated displayed-interaction aggregate"],
        locator: "fixture visibleEngagementSnapshot",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Displayed counts are mutable interface observations, not unique people, reach, conversion, endorsement, participation, adoption, or impact.",
      "Counts attached to reposted source records are excluded from the account-authored aggregate."
    ],
    antiClaims: ["The account reached 267 people", "The snapshot measures program participation or impact"],
    researchInquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallFullPopulationResearchInquiries20260715 = [
  {
    id: "INQ-KCTOWNHALL-FULL-POPULATION-2026",
    project,
    question:
      "What project, operating, posted-source, engagement, and stakeholder-response patterns appear across the full displayed @KCTownHall population?",
    methods: [
      "Traversed authenticated @KCTownHall Posts and Replies timelines through repeated no-growth states.",
      "Deduplicated primary status IDs across both tabs, separated five other-account conversation-context cards, and reconciled the 183-record union against the profile counter.",
      "Classified all primary records as original, reply, or repost and retained record-level dates, public status URLs, timeline membership, posted links, and public-safe classifications without raw post text or session state.",
      "Close-read every record for resident input, tire-removal operations, restoration, civic-resource distribution, and stakeholder-response patterns.",
      "Inventoried all 31 distinct posted short URLs and normalized nine mission-relevant destinations for source-level review.",
      "Ran bounded authenticated searches for account, reply, domain, and project-name references; separated direct responses from tags, mentions, broad-name false positives, and conversation context.",
      "Recorded displayed interaction counts only as a dated, volatile interface snapshot."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "Posts yielded 170 primary records. Replies rendered 183 primary records and five other-account context cards; the deduplicated primary union exactly matches the 183-post profile counter.",
      "The population comprises 142 original posts, 13 replies, and 28 reposts, spanning July 2018 through September 2022.",
      "One hundred records are tire-related, and 12 records link to the resident survey; classifications remain inspectable through public status URLs.",
      "One hundred eighteen records contain 133 external-link occurrences representing 31 distinct short URLs; nine mission-relevant destinations were normalized for closer use.",
      "The account documented resident input, recurring free tire-pickup intake, neighborhood cleanup, restoration, public-health, transit, housing, election, and civic-information work.",
      "Three sitting Council-member accounts directly responded in mission-relevant contexts, and an environmental-program collaborator supplied qualitative tire-dropoff corroboration.",
      "At access time, 77 account-authored records displayed 267 interaction units; the volatile total is retained only as bounded context."
    ],
    limitations: [
      "A complete displayed profile population is not a complete archive of deleted, private, withheld, or unindexed activity.",
      "The incoming search is bounded and cannot recover every historical mention, native repost, like, private interaction, or unindexed record.",
      "The shared account does not identify the human composer of every post or assign later stewardship to Jamie.",
      "Displayed interactions are not unique people and do not measure reach, endorsement, adoption, participation, or impact.",
      "First-party program quantities remain unverified unless separately corroborated.",
      "Direct official responses do not establish blanket endorsement, policy adoption, funding, or government causality."
    ],
    sourceIds: [
      "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026",
      "SRC-X-KCTOWNHALL-LAUNCH-2018",
      "SRC-KCTH-TIRED-OF-TIRES-ARCHIVE-2020",
      "SRC-KCTH-TIRED-OF-TIRES-UPDATE-2019",
      ...kcTownHallFullPopulationSourceRecords20260715.map(({ id }) => id)
    ],
    publicSummary:
      "All 183 profile-counted records were reviewed. They show the project account operating as a resident-input, recurring neighborhood-service, civic-resource, and public stakeholder-dialogue surface while retaining authorship, stewardship, metric, and causality boundaries."
  }
] satisfies ResearchInquiry[];

export const kcTownHallFullPopulationIntakeRecords20260715 = [
  {
    id: "INTAKE-KCTOWNHALL-FULL-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "engagement-lead",
    title: "Complete displayed @KCTownHall population and bounded stakeholder inventory",
    publicSafeSummary:
      "Public-safe metadata and analysis for all 183 records reported by the @KCTownHall profile counter, all 31 distinct posted short URLs, five separated conversation-context records, dated visible engagement, and bounded stakeholder responses.",
    whyItMatters:
      "Shows the account functioning as resident-input, recurring neighborhood-service, civic-resource, and stakeholder-dialogue infrastructure while separating collective work and observable response from authorship, reach, endorsement, and causal impact.",
    projectHints: [project],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://x.com/KCTownHall",
    sourceIds: [
      "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026",
      "SRC-X-KCTOWNHALL-LAUNCH-2018",
      "SRC-KCTH-TIRED-OF-TIRES-ARCHIVE-2020",
      "SRC-KCTH-TIRED-OF-TIRES-UPDATE-2019",
      ...kcTownHallFullPopulationSourceRecords20260715.map(({ id }) => id)
    ],
    claimIds: Object.values(kcTownHallFullPopulationClaimIds),
    inquiryIds: ["INQ-KCTOWNHALL-FULL-POPULATION-2026"],
    limitations: [
      "Complete current-profile recovery does not prove that no older record was deleted or withheld.",
      "The bounded stakeholder search is not a complete historical reception census.",
      "Raw post text, phone numbers, cookies, private account state, credentials, and session data remain outside the repository."
    ],
    nextActions: [
      "Seek independent records for any first-party tire or savings total before promotion.",
      "Recover archived resident-survey and site materials that preserve a decision trail without exposing resident data.",
      "Seek collaborator corroboration before expanding individual authorship or later-stewardship claims."
    ]
  }
] satisfies IntakeRecord[];
