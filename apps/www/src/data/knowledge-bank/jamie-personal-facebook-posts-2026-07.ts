import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-07-15";
const personalProject = "personal-public-record";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

export const jamiePersonalFacebookPostSourceIds = {
  census: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
  controls: "SRC-FB-JAMIE-POST-CONTROLS-2026",
  nter: "SRC-FB-JAMIE-NTER-OPENING-2010",
  wowlist: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
  councilStat: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
  letNycDance: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
  kcTownHall: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
  talksNotRaids: "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
  gothamist: "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31",
  councilLabs: "SRC-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-DATA-2016"
} as const;

export const jamiePersonalFacebookPostClaimIds = {
  population: "CLM-FB-JAMIE-POST-POPULATION-2026",
  missionRouting: "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE",
  postedUrls: "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026",
  stakeholderRouting: "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026",
  interactionSnapshot: "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026",
  actionRouting: "CLM-FB-JAMIE-PROJECT-ACTION-ROUTING",
  councilStatLanguage: "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE",
  kcTownHallTrace: "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE"
} as const;

export const jamiePersonalFacebookPostReviewSummary = {
  populationDefinition: "Facebook Manage Posts filtered to Posted by You",
  cursorPages: 621,
  returnedNodes: 3728,
  uniqueRecords: 1243,
  terminalHasNextPage: false,
  missingDates: 0,
  ownerAbsentRecords: 0,
  recoveredStart: "2006-12-19",
  recoveredEnd: "2022-06-12",
  audienceLabels: { public: 268, friends: 1, onlyMe: 1, notExposed: 973 },
  missionRoutedRecords: 181,
  urlBearingRecords: 430,
  normalizedExternalDestinations: 549,
  selectedPublicSources: 6,
  rawPopulation: "protected",
  websiteUpdate: "not-required"
} as const;

const sourceIds = jamiePersonalFacebookPostSourceIds;
const claimIds = jamiePersonalFacebookPostClaimIds;
const intakeId = "INTAKE-2026-07-15-JAMIE-PERSONAL-FACEBOOK-POST-FULL-POPULATION";

const observationIds = [
  "OBS-FB-JAMIE-CENSUS-METHOD",
  "OBS-FB-JAMIE-POPULATION-CONTROL",
  "OBS-FB-JAMIE-MISSION-ROUTING",
  "OBS-FB-JAMIE-URL-ROUTING",
  "OBS-FB-JAMIE-STAKEHOLDER-ROUTING",
  "OBS-FB-JAMIE-NTER-OPENING",
  "OBS-FB-JAMIE-WOWLIST-NINE-CITIES",
  "OBS-FB-JAMIE-COUNCILSTAT-JOB-ROUTE",
  "OBS-FB-JAMIE-LETNYCDANCE-ACTION-ROUTE",
  "OBS-FB-JAMIE-KCTOWNHALL-COINITIATION",
  "OBS-FB-JAMIE-TALKSNOTRAIDS-ACTION-ROUTE",
  "OBS-GOTHAMIST-CABARET-MOMENTUM-2017",
  "OBS-NYC-COUNCILSTAT-PUBLIC-DATA-CONTEXT-2016",
  "OBS-FB-JAMIE-SELECTED-INTERACTION-SNAPSHOT"
] as const;

const inquiryIds = [
  "INQ-FB-JAMIE-POST-CORPUS-2026",
  "INQ-FB-JAMIE-POSTED-SOURCES-2026",
  "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"
] as const;

export const jamiePersonalFacebookPostIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Jamie personal Facebook post full-population archival production",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated public-safe archival review",
    reason:
      "Protected full-population archival production across every record returned by Jamie's authenticated Facebook Manage Posts surface after applying Posted by: You, with public-safe aggregate controls, six individually rechecked public posts, source discovery, and strict engagement boundaries.",
    projectIds: [
      personalProject,
      "wowlist",
      "callnyc",
      "nyc-artist-coalition",
      "kc-town-hall",
      "creative-technology-and-media"
    ],
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: Object.values(sourceIds),
    observationIds: [...observationIds],
    researchInquiryIds: [...inquiryIds],
    boundaries: [
      "Continue destination-by-destination review of the 549 external source leads, prioritizing independent reporting and official records.",
      "Recover the historical CouncilStat job posting and corroborate Jamie's exact relationship before interpreting his May 2016 invitation language.",
      "Reconcile an authorized Meta export only if its archival value justifies the privacy and processing cost.",
      "Keep raw records, audience-unknown text, personal identities, ordinary-life material, media, comments, authentication state, and record-level metrics outside the public repository."
    ]
  }
];

const publicPost = {
  organization: "Jamie Burkart",
  author: "Jamie Burkart",
  kind: "institutional-social-post" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: reviewedAt,
  preferredPublicUrl: "canonical" as const
};

export const jamiePersonalFacebookPostSources: KnowledgeBank["sources"] = [
  {
    id: sourceIds.census,
    title: "Authenticated Jamie Burkart personal Facebook owner-post census",
    organization: "Jamie Burkart portfolio research",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Protected cursor crawl completed July 13, 2026; authenticated filter rechecked July 15, 2026",
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe metadata from an authenticated July 2026 review of Jamie Burkart's Facebook owner-post surface.",
    publicNote:
      "The protected crawl returned 1,243 unique owner-filtered records across 621 pages and ended with no next page. A July 15 browser replay confirmed that the Posted by: You surface began in June 2022.",
    supportsGenerally: [
      "the returned owner-filtered population control",
      "the December 2006 through June 2022 chronology",
      "aggregate mission, URL, and stakeholder research routing"
    ],
    doesNotEstablish: [
      "a native Meta export, deletion history, or immutable lifetime publication count",
      "public audience status for records without exposed audience labels",
      "readership, endorsement, attendance, unique people, causality, or impact",
      "authorship of shared, linked, quoted, photographed, or collaborator-created material"
    ],
    protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001"
  },
  {
    id: sourceIds.controls,
    title: "Jamie personal Facebook post public-safe aggregate controls",
    organization: "Jamie Burkart portfolio research",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe aggregate controls for Jamie Burkart's owner-filtered Facebook post census, July 2026.",
    publicNote:
      "The file preserves population, form, year, mission-routing, URL-routing, stakeholder-routing, and selected-public-source controls without raw personal post records.",
    supportsGenerally: [
      "aggregate reconciliation of the 1,243 returned records",
      "coarse chronology and record-form totals",
      "bounded research-routing counts",
      "the six-post public-source review control"
    ],
    doesNotEstablish: [
      "a lifetime account archive or universal public audience",
      "record-level contents, identities, or interactions",
      "stakeholder engagement, endorsement, reach, conversion, causality, or impact"
    ]
  },
  {
    id: sourceIds.nter,
    title: "Jamie Burkart public post about the NTER CHNG opening",
    ...publicPost,
    publishedAt: "2010-01-10",
    canonicalUrl: "https://www.facebook.com/jburkart/posts/226963042167",
    publicCitation:
      "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
    publicNote:
      "The post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as creators of the interactive text-messaging experience.",
    supportsGenerally: ["a dated NTER CHNG opening trace", "the three named creator credits"],
    doesNotEstablish: ["the division of technical labor", "sole authorship by Jamie", "rights to republish linked media"]
  },
  {
    id: sourceIds.wowlist,
    title: "Jamie Burkart public post about WOW List calendars in nine cities",
    ...publicPost,
    publishedAt: "2015-10-05",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid02hjaUtK2swFUy1XeNkQjqUnZj4M6ecbYpPjGa365MFo2oWR57HwEqNdrhSDQjJjBMl",
    publicCitation:
      "Jamie Burkart, public Facebook post about WOW List community calendars in nine cities, October 5, 2015.",
    publicNote:
      "The post attributes community calendars in nine cities to WOW List members, routes readers to join, and displayed 28 likes during the July 15 review.",
    supportsGenerally: ["Jamie's attributed nine-city statement", "the WOW List join route", "a mutable 28-like display snapshot"],
    doesNotEstablish: ["sustained activity in every city", "a lifetime city or user count", "reach or attendance", "that Jamie organized every local calendar"]
  },
  {
    id: sourceIds.councilStat,
    title: "Jamie Burkart public post routing to a CouncilStat job posting",
    ...publicPost,
    publishedAt: "2016-05-18",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023maJq9xB4QQYyFzJswPL5tbT2ToUbJxJ5MRnV9L51y94fPDVZVuHcVGsuBpmEnTSl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to a New York City Council CouncilStat job posting, May 18, 2016.",
    publicNote:
      "Jamie invited open-data practitioners to work with him and a City Council team while linking a CouncilStat job posting; the review displayed seven likes and no comments.",
    supportsGenerally: ["Jamie's exact attributed invitation", "a CouncilStat job route", "a mutable seven-like and zero-comment display snapshot"],
    doesNotEstablish: ["Jamie's employment, title, contract, formal team membership, or exact Council relationship", "job-post authorship or hiring authority", "endorsement, reach, conversion, or impact"]
  },
  {
    id: sourceIds.letNycDance,
    title: "Jamie Burkart public Cabaret Law press-and-action post",
    ...publicPost,
    publishedAt: "2017-09-20",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid021AY6ydWmHSAXQooc1KgivMWjY3jcuWSj958Z73MQ6fJick7jNaHHDwfKgZuo7cbal",
    publicCitation:
      "Jamie Burkart, public Facebook post pairing NPR Cabaret Law coverage with a Council action route, September 20, 2017.",
    publicNote:
      "The post pairs Jamie's NPR quotation with a call to contact Council members and a campaign call-script route; it displayed 24 reactions during review.",
    supportsGenerally: ["Jamie's public pairing of press coverage and legislative action", "an NPR and call-script route", "a mutable 24-reaction snapshot"],
    doesNotEstablish: ["sole authorship of the collective campaign", "legislative causality", "unique people, calls placed, conversion, endorsement, or impact"]
  },
  {
    id: sourceIds.kcTownHall,
    title: "Jamie Burkart public KC Town Hall project announcement",
    ...publicPost,
    publishedAt: "2018-07-02",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023rhzPSnUranjNyMCotufqMNS6uqLJatPp9R4e2m4s1ytZutdVSw2vKzEijbueVigl",
    publicCitation:
      "Jamie Burkart, public Facebook post announcing the KC Town Hall project, July 2, 2018.",
    publicNote:
      "Jamie wrote that he and Julia Fredenburg were starting the project and described its intended public benefit; the post displayed 106 reactions and 14 comments during review.",
    supportsGenerally: ["Jamie's co-initiation statement with Julia Fredenburg", "the stated public-benefit intention", "one direct public KC Town Hall project-account response", "a mutable 106-reaction and 14-comment snapshot"],
    doesNotEstablish: ["sole founding, ownership, or authorship by Jamie", "later Council actions or project outcomes", "reach, endorsement, causality, or impact"]
  },
  {
    id: sourceIds.talksNotRaids,
    title: "Jamie Burkart public Talks Not Raids action-routing post",
    ...publicPost,
    publishedAt: "2019-02-11",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to the Talks Not Raids City Hall action, February 11, 2019.",
    publicNote:
      "The post routes readers to a City Hall hearing, an NYC Artist Coalition video, the campaign site, and Council action on Introduction 1156.",
    supportsGenerally: ["Jamie's public routing among a hearing, coalition media, campaign infrastructure, and legislation"],
    doesNotEstablish: ["sole authorship of the shared post or video", "attendance, bill outcome, sole campaign ownership, legislative causality, or impact"]
  },
  {
    id: sourceIds.gothamist,
    title: "Movement For Repealing NYC's Archaic 'No Dancing' Law Gains Momentum",
    organization: "Gothamist",
    author: "Jake Offenhartz",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-31",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/movement-for-repealing-nycs-archaic-no-dancing-law-gains-momentum",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jake Offenhartz, 'Movement For Repealing NYC's Archaic No Dancing Law Gains Momentum,' Gothamist, March 31, 2017.",
    publicNote:
      "Independent reporting on the Market Hotel gathering and the Cabaret Law repeal effort; Jamie's personal post routed readers to it the day it appeared.",
    supportsGenerally: ["independent reporting on the Market Hotel gathering", "Cabaret Law repeal advocacy", "one destination in Jamie's posted-source queue"],
    doesNotEstablish: ["Jamie's individual role in the gathering", "a precise attendance count", "sole campaign authorship or legislative causality"]
  },
  {
    id: sourceIds.councilLabs,
    title: "Constituent Services Data",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-05-27",
    accessedAt: reviewedAt,
    canonicalUrl: "https://council.nyc.gov/labs/2016/05/27/constituent-services-data/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, 'Constituent Services Data,' May 27, 2016.",
    publicNote:
      "Official context for CouncilStat, the daily open-data release, and the January 2016 Civic Hall hackathon.",
    supportsGenerally: ["CouncilStat's constituent-issue tracking purpose", "the public CouncilStat data release", "the January 2016 Civic Hall hackathon context"],
    doesNotEstablish: ["Jamie's employment, title, contract, or team membership", "Jamie's authorship of a job posting", "hiring authority or an official CallNYC relationship"]
  }
];

const observation = (
  id: (typeof observationIds)[number],
  sourceId: string,
  project: string,
  text: string,
  locator: string,
  claimIdsForObservation: string[],
  inquiryIdsForObservation: string[] = []
): KnowledgeBank["observations"][number] => ({
  id,
  intakeId,
  sourceId,
  comparisonSourceIds: [],
  project,
  kind: "source-fact",
  text,
  locator,
  status: "verified",
  publicSafe: true,
  claimIds: claimIdsForObservation,
  researchInquiryIds: inquiryIdsForObservation,
  limitations: []
});

export const jamiePersonalFacebookPostObservations: KnowledgeBank["observations"] = [
  observation("OBS-FB-JAMIE-CENSUS-METHOD", sourceIds.census, personalProject, "The owner-filtered crawl traversed 621 cursor pages, deduplicated 3,728 returned nodes into 1,243 records, and stopped when Facebook reported no next page.", "Protected crawl control and pagination log", [claimIds.population], [inquiryIds[0]]),
  observation("OBS-FB-JAMIE-POPULATION-CONTROL", sourceIds.controls, personalProject, "The returned population runs from December 19, 2006 through June 12, 2022, with zero missing dates and zero owner-absent rows. Facebook exposed public audience labels for 268 records, friends for one, only-me for one, and no audience label for 973. The authenticated July 15 replay independently confirmed June 2022 as the first owner-filtered month.", "populationControl", [claimIds.population], [inquiryIds[0]]),
  observation("OBS-FB-JAMIE-MISSION-ROUTING", sourceIds.controls, personalProject, "Deterministic overlapping research rules routed 181 records to project or practice categories, led by WOW List, Sunday Dinner, NYC Artist Coalition, and Let NYC Dance.", "missionRouting", [claimIds.missionRouting], [inquiryIds[0]]),
  observation("OBS-FB-JAMIE-URL-ROUTING", sourceIds.controls, personalProject, "The corpus contains 430 URL-bearing records and 549 unique normalized external destinations queued for source-specific recovery and close reading.", "postedUrlInventory", [claimIds.postedUrls], [inquiryIds[1]]),
  observation("OBS-FB-JAMIE-STAKEHOLDER-ROUTING", sourceIds.controls, personalProject, "Overlapping mention, tag, quotation, and link rules found 20 New York City Council, 18 Rafael Espinal, nine Market Hotel, six Office of Nightlife, five Antonio Reynoso, one Quinton Lucas, and one Helen Rosenthal record occurrences. These are Jamie's outbound references, not incoming stakeholder actions.", "stakeholderRouting", [claimIds.stakeholderRouting], [inquiryIds[0]]),
  observation("OBS-FB-JAMIE-NTER-OPENING", sourceIds.nter, "creative-technology-and-media", "Jamie's January 2010 public post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as NTER CHNG creators and documents the opening window.", "Post body and publication date", [claimIds.missionRouting], []),
  observation("OBS-FB-JAMIE-WOWLIST-NINE-CITIES", sourceIds.wowlist, "wowlist", "Jamie's October 2015 public post attributes community calendars in nine cities to WOW List members and gives readers a route to join.", "Post body and publication date", [claimIds.actionRouting], []),
  observation("OBS-FB-JAMIE-COUNCILSTAT-JOB-ROUTE", sourceIds.councilStat, "callnyc", "Jamie's May 2016 public post invites open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting.", "Post body and linked job card", [claimIds.councilStatLanguage], [inquiryIds[2]]),
  observation("OBS-FB-JAMIE-LETNYCDANCE-ACTION-ROUTE", sourceIds.letNycDance, "nyc-artist-coalition", "Jamie's September 2017 public post pairs NPR Cabaret Law reporting and his quoted perspective with a Council contact and campaign call-script route.", "Post body and linked destinations", [claimIds.actionRouting], []),
  observation("OBS-FB-JAMIE-KCTOWNHALL-COINITIATION", sourceIds.kcTownHall, "kc-town-hall", "Jamie's July 2018 public announcement says he and Julia Fredenburg were starting KC Town Hall and describes the intended neighborhood-resource and cultural-center purpose.", "Post body and publication date", [claimIds.kcTownHallTrace, claimIds.actionRouting], []),
  observation("OBS-FB-JAMIE-TALKSNOTRAIDS-ACTION-ROUTE", sourceIds.talksNotRaids, "nyc-artist-coalition", "Jamie's February 2019 public post connects a City Hall hearing, coalition video, campaign site, and Council action on Introduction 1156.", "Post body and linked destinations", [claimIds.actionRouting], []),
  observation("OBS-GOTHAMIST-CABARET-MOMENTUM-2017", sourceIds.gothamist, "nyc-artist-coalition", "Gothamist reported in March 2017 that hundreds gathered at Market Hotel around the effort to repeal New York City's Cabaret Law.", "Headline, dek, and article body", [claimIds.postedUrls], [inquiryIds[1]]),
  observation("OBS-NYC-COUNCILSTAT-PUBLIC-DATA-CONTEXT-2016", sourceIds.councilLabs, "callnyc", "The Council described CouncilStat as an application used by district offices to track constituent issues, documented daily open-data publication, and said participant suggestions from a January 2016 Civic Hall hackathon were being implemented.", "Page body, paragraphs 1-4", [claimIds.councilStatLanguage], [inquiryIds[2]]),
  observation("OBS-FB-JAMIE-SELECTED-INTERACTION-SNAPSHOT", sourceIds.controls, personalProject, "Four selected public project posts displayed mutable July 15 floors: WOW List 28 likes; CouncilStat seven likes and no comments; Let NYC Dance 24 reactions; KC Town Hall 106 reactions and 14 comments.", "selectedPublicSourceControls", [claimIds.interactionSnapshot], [inquiryIds[0]])
];

const holdProjection = (text: string): KnowledgeBank["claims"][number]["projections"] => [
  { key: "archive-note", text, status: "hold", citationRequired: true, surfaces: [] }
];

export const jamiePersonalFacebookPostClaims: KnowledgeBank["claims"] = [
  {
    id: claimIds.population,
    project: personalProject,
    internalClaim: "The July 13 owner-filtered Facebook crawl returned 1,243 unique records across 621 cursor pages from December 19, 2006 through June 12, 2022 and ended with no next page; the same owner filter began in June 2022 when replayed on July 15.",
    status: "confirmed-with-boundary",
    projections: [],
    evidence: [
      { sourceId: sourceIds.census, relationship: "private-support", supports: ["returned population", "pagination control", "chronology"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.controls, relationship: "supports-boundary", supports: ["public aggregate controls", "privacy and completeness boundaries"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Completeness is limited to the records returned by Facebook Manage Posts after applying Posted by: You.", "This is not a native Meta export, deletion history, or immutable lifetime archive.", "Audience status was not exposed for 973 records, so the record-level corpus remains protected."],
    antiClaims: ["every Facebook post Jamie ever published", "all 1,243 records were public", "deleted or hidden history is complete"],
    researchInquiryIds: [inquiryIds[0]],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.missionRouting,
    project: personalProject,
    internalClaim: "A deterministic full-population research pass routed 181 unique records into overlapping project or practice categories, with recurring traces across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, creative and civic technology, waterways practice, and KC Town Hall.",
    status: "confirmed-with-boundary",
    projections: [],
    evidence: [{ sourceId: sourceIds.controls, relationship: "direct-support", supports: ["181 mission-routed records", "overlapping project route counts"], confidence: "high", renderCitation: false }],
    boundaries: ["Categories overlap and are archive-navigation aids.", "Posting frequency does not measure effort, importance, professional priority, audience, engagement, or impact.", "Shared and linked material retains its original authorship."],
    antiClaims: ["the corpus ranks Jamie's professional priorities", "every routed record is an accomplishment", "Jamie authored all routed material"],
    researchInquiryIds: [inquiryIds[0]],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.postedUrls,
    project: personalProject,
    internalClaim: "The owner-filtered corpus contains 430 URL-bearing records and 549 unique normalized external destinations that form a governed source-discovery queue.",
    status: "confirmed-with-boundary",
    projections: holdProjection("Jamie's owner-filtered Facebook archive preserves 549 external source leads; each remains queued for recovery and close reading before it can support a public claim."),
    evidence: [
      { sourceId: sourceIds.controls, relationship: "direct-support", supports: ["430 URL-bearing records", "549 normalized destinations"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.gothamist, relationship: "corroborating", supports: ["one recovered and close-read independent destination"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Each destination remains a lead until recovered, close-read, and decomposed.", "Posting does not establish truth, authorship, availability, readership, endorsement, partnership, conversion, causality, or impact."],
    antiClaims: ["every posted URL corroborates a portfolio claim", "Jamie authored or endorsed every linked source", "the link inventory measures readership or impact"],
    researchInquiryIds: [inquiryIds[1]],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.stakeholderRouting,
    project: personalProject,
    internalClaim: "Overlapping routing rules found 20 New York City Council, 18 Rafael Espinal, nine Market Hotel, six Office of Nightlife, five Antonio Reynoso, one Quinton Lucas, and one Helen Rosenthal record occurrences.",
    status: "use-with-care",
    projections: [],
    evidence: [{ sourceId: sourceIds.controls, relationship: "direct-support", supports: ["bounded stakeholder string and route occurrences"], confidence: "high", renderCitation: false }],
    boundaries: ["Counts are overlapping mentions, tags, quotations, and link matches in Jamie's records.", "They are not inbound actions and do not establish engagement, endorsement, attendance, partnership, response, influence, or impact.", "No corpus-wide responder-identity census was promoted."],
    antiClaims: ["twenty Council accounts engaged with Jamie", "Rafael Espinal endorsed 18 posts", "mentions prove official participation or policy influence"],
    researchInquiryIds: [inquiryIds[0]],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.interactionSnapshot,
    project: personalProject,
    internalClaim: "Four individually rechecked public project posts retained mutable July 15 display snapshots: WOW List 28 likes; CouncilStat seven likes and no comments; Let NYC Dance 24 reactions; KC Town Hall 106 reactions and 14 comments.",
    status: "use-with-care",
    projections: [],
    evidence: [{ sourceId: sourceIds.controls, relationship: "direct-support", supports: ["dated selected-post counter controls"], confidence: "high", renderCitation: false }],
    boundaries: ["Current counters are mutable interface observations, not historical analytics.", "Do not sum or convert them into unique people, reach, stakeholder engagement, endorsement, attendance, conversion, causality, or impact.", "One KC Town Hall project-account response remains one response, not a stakeholder-group census."],
    antiClaims: ["the selected posts reached 165 people", "the counters prove project impact", "comments establish institutional endorsement"],
    researchInquiryIds: [inquiryIds[0]],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.actionRouting,
    project: personalProject,
    internalClaim: "Selected public posts show Jamie repeatedly connecting project explanation to practical participation routes: joining a WOW List calendar, contacting Council through Let NYC Dance, joining a KC Town Hall neighborhood process, and attending or amplifying a Talks Not Raids hearing.",
    status: "confirmed-with-boundary",
    projections: holdProjection("Selected public posts show Jamie connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids."),
    evidence: [
      { sourceId: sourceIds.wowlist, relationship: "direct-support", supports: ["community calendar join route"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.letNycDance, relationship: "direct-support", supports: ["press-to-Council-action route"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.kcTownHall, relationship: "direct-support", supports: ["neighborhood process route"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.talksNotRaids, relationship: "direct-support", supports: ["hearing, coalition media, campaign site, and bill-action route"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["This is a selected-post practice claim, not a semantic claim about all 1,243 records.", "Routing does not establish clicks, attendance, calls placed, conversion, adoption, endorsement, causality, or impact.", "Collective project, campaign, and source authorship remains intact."],
    antiClaims: ["Jamie's posts caused participation or legislation", "Jamie solely authored the campaigns", "the corpus proves conversion"],
    researchInquiryIds: [inquiryIds[1]],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.councilStatLanguage,
    project: "callnyc",
    internalClaim: "In a public May 2016 post, Jamie invited open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting; the exact institutional relationship behind that wording remains unresolved.",
    status: "use-with-care",
    projections: [],
    evidence: [
      { sourceId: sourceIds.councilStat, relationship: "direct-support", supports: ["Jamie's attributed invitation", "CouncilStat job route"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.councilLabs, relationship: "context", supports: ["CouncilStat purpose and public-data context"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Infer no employment, title, contract, formal team membership, job-post authorship, or hiring authority.", "The historical job posting remains to be recovered."],
    antiClaims: ["Jamie was employed by the CouncilStat team", "Jamie authored or controlled hiring for the job posting"],
    researchInquiryIds: [inquiryIds[2]],
    reviewedAt,
    reviewedBy
  },
  {
    id: claimIds.kcTownHallTrace,
    project: "kc-town-hall",
    internalClaim: "Jamie's July 2018 public announcement states that he and Julia Fredenburg were starting KC Town Hall and describes their intended neighborhood-resource and cultural-center purpose.",
    status: "confirmed-with-boundary",
    projections: holdProjection("A contemporaneous public announcement states that Jamie and Julia Fredenburg were starting KC Town Hall as a neighborhood resource and cultural center."),
    evidence: [{ sourceId: sourceIds.kcTownHall, relationship: "direct-support", supports: ["co-initiation statement", "stated public-benefit intention"], confidence: "high", renderCitation: false }],
    boundaries: ["Credit Julia Fredenburg and retain the statement as Jamie's contemporaneous account.", "The post does not establish sole founding, ownership, later public funding, project outcome, or impact."],
    antiClaims: ["Jamie solely founded KC Town Hall", "the announcement proves the project's later outcome or impact"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  }
];

export const jamiePersonalFacebookPostResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: inquiryIds[0],
    project: personalProject,
    question: "What can the complete returned owner-filtered Facebook population establish without turning private life, mutable counters, or platform associations into public professional claims?",
    methods: ["Traversed 621 owner-filtered cursor pages until Facebook reported no next page.", "Deduplicated 3,728 returned nodes into 1,243 records and verified zero missing dates and zero owner-absent records.", "Replayed the Manage Posts Posted by: You filter on July 15 and confirmed the June 2022 newest boundary.", "Ran deterministic overlapping research routing and individually reopened six public project sources before promotion."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["All 1,243 records returned by the surface received a disposition.", "The returned chronology runs from December 19, 2006 through June 12, 2022.", "The research pass routed 181 unique records into overlapping mission categories.", "Six posts were individually rechecked as public."],
    limitations: ["This is not a native Meta export, deletion history, or immutable lifetime population.", "Audience labels were not exposed for 973 records.", "Routing categories are research aids, not effort, engagement, endorsement, or impact measures.", "No complete responder-identity or historical engagement export was recovered."],
    sourceIds: [sourceIds.census, sourceIds.controls],
    publicSummary: "The owner-filtered census accounted for all 1,243 records returned across 621 cursor pages; unavailable and audience-unknown history remains outside the public claim.",
    protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001"
  },
  {
    id: inquiryIds[1],
    project: personalProject,
    question: "Which external destinations can be recovered and promoted as independent or official evidence?",
    methods: ["Normalized external destinations and separated posted-source leads from claim evidence.", "Compared recovered destinations against the existing knowledge bank.", "Close-read the March 2017 Gothamist article and recognized existing NPR and Pitch sources already governed elsewhere."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["The corpus contains 430 URL-bearing records and 549 unique normalized destinations.", "Existing governed NPR and Pitch sources intersect the queue.", "The Gothamist Market Hotel article is now governed with campaign-context boundaries.", "The remaining destinations stay queued."],
    limitations: ["A posted URL is not automatic corroboration.", "Dead links, redirects, changed pages, and snippets require source-specific review.", "Posting does not establish authorship, partnership, endorsement, readership, conversion, causality, or outcomes."],
    sourceIds: [sourceIds.controls, sourceIds.gothamist],
    publicSummary: "The corpus yielded 549 external source leads; reviewed reporting strengthens campaign context while the remaining routes stay queued."
  },
  {
    id: inquiryIds[2],
    project: "callnyc",
    question: "What exact working relationship, if any, underlies Jamie's May 2016 CouncilStat invitation language?",
    methods: ["Rechecked the public post's attributed wording and linked CouncilStat job-card identity.", "Close-read the official CouncilStat data page for institutional context.", "Separated observable wording from employment, title, contract, team-membership, and hiring-authority interpretations."],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: ["The public post directly supports Jamie's attributed invitation language and the CouncilStat job route.", "The Council page confirms CouncilStat's public purpose and hackathon context.", "Neither source resolves Jamie's exact institutional relationship."],
    limitations: ["The linked historical job posting remains unavailable.", "Social wording cannot distinguish formal employment from adjacent or informal collaboration without corroboration."],
    sourceIds: [sourceIds.councilStat, sourceIds.councilLabs],
    publicSummary: "Jamie's public post preserves a CouncilStat job route and attributed team language while his exact Council relationship remains unresolved."
  }
];

export const jamiePersonalFacebookPostKnowledge = {
  intakeItems: jamiePersonalFacebookPostIntakeItems,
  observations: jamiePersonalFacebookPostObservations,
  sources: jamiePersonalFacebookPostSources,
  claims: jamiePersonalFacebookPostClaims,
  researchInquiries: jamiePersonalFacebookPostResearchInquiries
};
