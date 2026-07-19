import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const personalProject = "personal-public-record";

const censusSourceId = "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026";
const controlsSourceId = "SRC-FB-JAMIE-POST-CONTROLS-2026";
const nterSourceId = "SRC-FB-JAMIE-NTER-OPENING-2010";
const wowListSourceId = "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015";
const councilStatSourceId = "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016";
const letNycDanceSourceId = "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017";
const kcTownHallSourceId = "SRC-FB-JAMIE-KCTOWNHALL-START-2018";
const talksNotRaidsSourceId = "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019";
const gothamistSourceId = "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31";

const populationClaimId = "CLM-FB-JAMIE-POST-POPULATION-2026";
const missionClaimId = "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE";
const urlClaimId = "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026";
const stakeholderClaimId = "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026";
const interactionClaimId = "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-FLOOR-2026";
const actionRoutingClaimId = "CLM-FB-JAMIE-PROJECT-ACTION-ROUTING";
const councilStatClaimId = "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE";
const kcTownHallClaimId = "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE";

export const jamiePersonalFacebookPostAudit = {
  crawlCompletedAt: "2026-07-13",
  authenticatedFilterRecheckedAt: reviewedAt,
  populationDefinition: "Facebook Manage Posts filtered to Posted by You",
  cursorPages: 621,
  returnedNodes: 3728,
  uniqueRecords: 1243,
  terminalHasNextPage: false,
  missingDates: 0,
  ownerAbsentRecords: 0,
  recoveredStart: "2006-12-19",
  recoveredEnd: "2022-06-12",
  audienceLabelExposedRecords: 270,
  audienceLabelNotExposedRecords: 973,
  missionRoutedRecords: 181,
  urlBearingRecords: 430,
  uniqueNormalizedExternalUrls: 549,
  selectedPublicSources: 6,
  controlsPath:
    "docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
  reportPath:
    "docs/knowledge-bank/projects/jamie-personal-facebook-posts.md",
} as const;

export const jamiePersonalFacebookPostCaptures = [
  {
    id: "CAP-FB-JAMIE-OWNER-POST-POPULATION-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "artifact",
    summary:
      "Protected full-population review of every unique record returned by Jamie's Facebook Manage Posts surface after applying the Posted by You filter.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [personalProject],
    potentialClaimFamilies: [
      "owner-filtered population control",
      "mission and source routing",
      "stakeholder-addressing patterns",
      "bounded social-platform observations",
    ],
    sourceIds: [censusSourceId, controlsSourceId],
    observationIds: [
      "OBS-FB-JAMIE-CENSUS-METHOD",
      "OBS-FB-JAMIE-POPULATION-CONTROL",
      "OBS-FB-JAMIE-MISSION-ROUTING",
      "OBS-FB-JAMIE-URL-ROUTING",
      "OBS-FB-JAMIE-STAKEHOLDER-ROUTING",
    ],
    researchTaskIds: [
      "RT-FB-JAMIE-META-EXPORT-RECONCILIATION",
      "RT-FB-JAMIE-POSTED-SOURCE-REVIEW",
    ],
    disposition:
      "Integrated public-safe aggregate controls and a protected evidence pointer. Raw records, audience-unknown text, identities, comments, media, authentication state, and record-level metrics remain outside the public repository.",
  },
  {
    id: "CAP-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "url",
    summary:
      "Six individually reopened public posts preserve dated project, participation-route, source, and bounded response traces across NTER CHNG, WOW List, CallNYC context, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: [
      personalProject,
      "nterchng",
      "wowlist",
      "callnyc",
      "nyc-artist-coalition",
      "kc-town-hall",
    ],
    potentialClaimFamilies: [
      "project chronology",
      "public participation routing",
      "collaborator credit",
      "independent source discovery",
    ],
    sourceIds: [
      nterSourceId,
      wowListSourceId,
      councilStatSourceId,
      letNycDanceSourceId,
      kcTownHallSourceId,
      talksNotRaidsSourceId,
      gothamistSourceId,
    ],
    observationIds: [
      "OBS-FB-JAMIE-NTER-OPENING",
      "OBS-FB-JAMIE-WOWLIST-NINE-CITIES",
      "OBS-FB-JAMIE-COUNCILSTAT-JOB-ROUTE",
      "OBS-FB-JAMIE-LETNYCDANCE-ACTION-ROUTE",
      "OBS-FB-JAMIE-KCTOWNHALL-COINITIATION",
      "OBS-FB-JAMIE-TALKSNOTRAIDS-ACTION-ROUTE",
      "OBS-GOTHAMIST-CABARET-MOMENTUM-2017",
      "OBS-FB-JAMIE-SELECTED-INTERACTION-SNAPSHOT",
    ],
    researchTaskIds: [
      "RT-FB-JAMIE-POSTED-SOURCE-REVIEW",
      "RT-FB-JAMIE-COUNCILSTAT-ROLE-RECOVERY",
    ],
    disposition:
      "Integrated six public first-person traces and one independent article as governed bank depth. No current website copy change is required.",
  },
] satisfies CaptureRecord[];

const publicPost = {
  organization: "Jamie Burkart",
  author: "Jamie Burkart",
  kind: "firsthand-statement" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: reviewedAt,
  preferredPublicUrl: "canonical" as const,
};

export const jamiePersonalFacebookPostSources = [
  {
    id: censusSourceId,
    title: "Authenticated Jamie Burkart personal Facebook owner-post census",
    organization: "Jamie Burkart portfolio research",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe metadata from an authenticated July 2026 review of Jamie Burkart's Facebook owner-post surface.",
    publicNote:
      "The protected cursor crawl returned 1,243 unique owner-filtered records across 621 pages and ended with no next page. A July 15 browser review confirmed that Manage Posts still exposed the Posted by: You filter and that the filtered surface began in June 2022.",
    protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001",
    supportsGenerally: [
      "the 1,243-record owner-filtered population control",
      "621 cursor pages and terminal has-next-page false",
      "the December 2006 through June 2022 returned chronology",
      "aggregate mission, URL, and stakeholder routing research",
    ],
    doesNotEstablish: [
      "a native Meta export, deletion history, or immutable lifetime publication count",
      "public audience status for 973 records without exposed audience labels",
      "readership, endorsement, attendance, unique people, causality, or impact",
      "authorship of quoted, shared, linked, photographed, or collaborator-created material",
    ],
  },
  {
    id: controlsSourceId,
    title: "Jamie personal Facebook post public-safe aggregate controls",
    organization: "Jamie Burkart portfolio research",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/7e50b49a8df44cf5a80ba62203a9fa45f9ef59f4/docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe aggregate controls for Jamie Burkart's owner-filtered Facebook post census, July 2026.",
    publicNote:
      "The file preserves population, form, year, mission-routing, URL-routing, stakeholder-routing, and selected-public-source controls without raw post records.",
    supportsGenerally: [
      "aggregate reconciliation of the 1,243-record owner-filtered control",
      "coarse returned chronology and record-form totals",
      "bounded research-routing counts",
      "the six-post public-source review control",
    ],
    doesNotEstablish: [
      "a lifetime account archive or universal public audience",
      "record-level contents, identities, or interactions",
      "stakeholder engagement, endorsement, reach, conversion, causality, or impact",
    ],
  },
  {
    id: nterSourceId,
    title: "Jamie Burkart public post about the NTER CHNG opening",
    ...publicPost,
    publishedAt: "2010-01-10",
    canonicalUrl: "https://www.facebook.com/jburkart/posts/226963042167",
    publicCitation:
      "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
    publicNote:
      "The post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as creators of the interactive text-messaging experience and routes to an opening-photo album.",
    supportsGenerally: [
      "a dated first-person public trace of the NTER CHNG opening",
      "the three creator credits",
      "the January 2010 exhibition window",
    ],
    doesNotEstablish: [
      "the division of technical labor",
      "sole authorship by Jamie",
      "rights or consent for republication of the linked album",
    ],
  },
  {
    id: wowListSourceId,
    title: "Jamie Burkart public post about WOW List calendars in nine cities",
    ...publicPost,
    publishedAt: "2015-10-05",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid02hjaUtK2swFUy1XeNkQjqUnZj4M6ecbYpPjGa365MFo2oWR57HwEqNdrhSDQjJjBMl",
    publicCitation:
      "Jamie Burkart, public Facebook post about WOW List community calendars in nine cities, October 5, 2015.",
    publicNote:
      "The post attributes community calendars in nine cities to WOW List members, routes readers to join, and displayed 28 likes during the July 15 review.",
    supportsGenerally: [
      "Jamie's attributed nine-city statement",
      "the WOW List join route",
      "a mutable July 15, 2026 display of 28 likes",
    ],
    doesNotEstablish: [
      "independently verified or sustained activity in every city",
      "a lifetime city count, user total, reach metric, or attendance",
      "that Jamie locally organized every calendar",
    ],
  },
  {
    id: councilStatSourceId,
    title: "Jamie Burkart public post routing to a CouncilStat job posting",
    ...publicPost,
    publishedAt: "2016-05-18",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023maJq9xB4QQYyFzJswPL5tbT2ToUbJxJ5MRnV9L51y94fPDVZVuHcVGsuBpmEnTSl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to a New York City Council CouncilStat job posting, May 18, 2016.",
    publicNote:
      "Jamie invited open-data practitioners to work with him and a City Council team while linking a CouncilStat job posting; the review displayed seven likes and no comments.",
    supportsGenerally: [
      "Jamie's exact first-person invitation language",
      "a CouncilStat job-posting route",
      "a mutable July 15, 2026 display of seven likes and no comments",
    ],
    doesNotEstablish: [
      "Jamie's employment, title, contract, formal team membership, or exact Council relationship",
      "that Jamie authored the job posting or held hiring authority",
      "endorsement, reach, conversion, or impact",
    ],
  },
  {
    id: letNycDanceSourceId,
    title: "Jamie Burkart public Cabaret Law press-and-action post",
    ...publicPost,
    publishedAt: "2017-09-20",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid021AY6ydWmHSAXQooc1KgivMWjY3jcuWSj958Z73MQ6fJick7jNaHHDwfKgZuo7cbal",
    publicCitation:
      "Jamie Burkart, public Facebook post pairing NPR Cabaret Law coverage with a Council action route, September 20, 2017.",
    publicNote:
      "The post pairs Jamie's NPR quotation with a call to contact Council members and a campaign call-script route; it displayed 24 reactions during review.",
    supportsGenerally: [
      "Jamie's public pairing of press coverage and legislative action",
      "an NPR and call-script route",
      "a mutable July 15, 2026 display of 24 reactions",
    ],
    doesNotEstablish: [
      "sole authorship or ownership of the collective campaign",
      "that the post caused legislative action",
      "unique people, readership, calls placed, conversion, endorsement, or impact",
    ],
  },
  {
    id: kcTownHallSourceId,
    title: "Jamie Burkart public KC Town Hall project announcement",
    ...publicPost,
    publishedAt: "2018-07-02",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023rhzPSnUranjNyMCotufqMNS6uqLJatPp9R4e2m4s1ytZutdVSw2vKzEijbueVigl",
    publicCitation:
      "Jamie Burkart, public Facebook post announcing the KC Town Hall project, July 2, 2018.",
    publicNote:
      "Jamie wrote that he and Julia Fredenburg were starting the project and described its permanently affordable neighborhood-resource and cultural-center intention; the post displayed 106 reactions and 14 comments during review.",
    supportsGenerally: [
      "Jamie's attributed co-initiation statement with Julia Fredenburg",
      "the stated public-benefit intention",
      "a direct public response from the KC Town Hall project account",
      "a mutable July 15, 2026 display of 106 reactions and 14 comments",
    ],
    doesNotEstablish: [
      "sole founding, ownership, or authorship by Jamie",
      "the later Board recommendation, Council appropriation, transition, or project outcome",
      "attendance, unique people, reach, endorsement, causality, or impact",
    ],
  },
  {
    id: talksNotRaidsSourceId,
    title: "Jamie Burkart public Talks Not Raids action-routing post",
    ...publicPost,
    publishedAt: "2019-02-11",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to the Talks Not Raids City Hall action, February 11, 2019.",
    publicNote:
      "The post routes readers to a City Hall hearing, an NYC Artist Coalition video, the Talks Not Raids campaign site, and Council action on Introduction 1156.",
    supportsGenerally: [
      "Jamie's public routing among an in-person hearing, coalition media, campaign infrastructure, and legislation",
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the shared coalition post or video",
      "attendance, bill outcome, sole campaign ownership, legislative causality, or impact",
    ],
  },
  {
    id: gothamistSourceId,
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
      "The independently published article reports that hundreds gathered at Market Hotel for the Cabaret Law repeal effort and documents the campaign's public momentum. Jamie's personal post routed readers to it the day it appeared.",
    supportsGenerally: [
      "independent reporting on the March 2017 Market Hotel gathering",
      "public Cabaret Law repeal advocacy and campaign momentum",
      "the destination of Jamie's contemporaneous article-sharing post",
    ],
    doesNotEstablish: [
      "Jamie's individual role in that gathering",
      "a precise attendance count",
      "sole campaign authorship, legislative causality, or the later repeal outcome",
    ],
  },
] satisfies SourceRecord[];

export const jamiePersonalFacebookPostObservations = [
  {
    id: "OBS-FB-JAMIE-CENSUS-METHOD",
    sourceId: censusSourceId,
    project: personalProject,
    statement:
      "The owner-filtered crawl traversed 621 cursor pages, deduplicated 3,728 returned nodes into 1,243 records, and stopped when the surface reported no next page.",
    observationType: "metadata",
    locator: "Protected crawl control and pagination log",
    confidence: "high",
    limitations: [
      "The method accounts for the returned surface, not deleted or otherwise unavailable history.",
    ],
    supportsClaimIds: [populationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-POPULATION-CONTROL",
    sourceId: controlsSourceId,
    project: personalProject,
    statement:
      "The returned population runs from December 19, 2006 through June 12, 2022, with zero missing dates and zero owner-absent rows; audience labels were not exposed for 973 records.",
    observationType: "metadata",
    locator: "populationControl",
    confidence: "high",
    limitations: [
      "The public control contains aggregates only and does not assert that all records were public.",
    ],
    supportsClaimIds: [populationClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-MISSION-ROUTING",
    sourceId: controlsSourceId,
    project: personalProject,
    statement:
      "Deterministic overlapping research rules routed 181 records to project or practice categories, led by WOW List, Sunday Dinner, NYC Artist Coalition, and Let NYC Dance.",
    observationType: "metadata",
    locator: "missionRouting",
    confidence: "high",
    limitations: [
      "Routing frequency is not effort, importance, priority, audience, or impact.",
    ],
    supportsClaimIds: [missionClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-URL-ROUTING",
    sourceId: controlsSourceId,
    project: personalProject,
    statement:
      "The corpus contains 430 URL-bearing records and 549 unique normalized external destinations queued for source-specific recovery and close reading.",
    observationType: "metadata",
    locator: "postedUrlInventory",
    confidence: "high",
    limitations: [
      "A posted destination remains a lead until recovered and reviewed.",
    ],
    supportsClaimIds: [urlClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-STAKEHOLDER-ROUTING",
    sourceId: controlsSourceId,
    project: personalProject,
    statement:
      "Overlapping mention, tag, quotation, and link rules found 20 New York City Council, 18 Rafael Espinal, nine Market Hotel, six Office of Nightlife, five Antonio Reynoso, one Quinton Lucas, and one Helen Rosenthal record occurrences.",
    observationType: "metadata",
    locator: "stakeholderRouting",
    confidence: "high",
    limitations: [
      "These are Jamie's outbound references, not inbound stakeholder actions.",
    ],
    supportsClaimIds: [stakeholderClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-NTER-OPENING",
    sourceId: nterSourceId,
    project: "nterchng",
    statement:
      "Jamie's January 2010 public post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as NTER CHNG creators and documents the opening window.",
    observationType: "attributed",
    locator: "Post body and publication date",
    confidence: "high",
    limitations: ["The post does not divide technical labor or establish sole authorship."],
    supportsClaimIds: [],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-WOWLIST-NINE-CITIES",
    sourceId: wowListSourceId,
    project: "wowlist",
    statement:
      "Jamie's October 2015 public post attributes community calendars in nine cities to WOW List members and gives readers a route to join.",
    observationType: "attributed",
    locator: "Post body and publication date",
    confidence: "high",
    limitations: [
      "The statement is not independent verification of sustained activity in every city.",
    ],
    supportsClaimIds: [actionRoutingClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-COUNCILSTAT-JOB-ROUTE",
    sourceId: councilStatSourceId,
    project: "callnyc",
    statement:
      "Jamie's May 2016 public post invites open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting.",
    observationType: "attributed",
    locator: "Post body and linked job card",
    confidence: "high",
    limitations: [
      "The wording does not resolve employment, title, contract, team membership, or hiring authority.",
    ],
    supportsClaimIds: [councilStatClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-LETNYCDANCE-ACTION-ROUTE",
    sourceId: letNycDanceSourceId,
    project: "nyc-artist-coalition",
    statement:
      "Jamie's September 2017 public post pairs NPR Cabaret Law reporting and his quoted perspective with a Council contact and campaign call-script route.",
    observationType: "explicit",
    locator: "Post body and linked destinations",
    confidence: "high",
    limitations: [
      "The post does not establish sole campaign authorship or legislative causality.",
    ],
    supportsClaimIds: [actionRoutingClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-KCTOWNHALL-COINITIATION",
    sourceId: kcTownHallSourceId,
    project: "kc-town-hall",
    statement:
      "Jamie's July 2018 public announcement says he and Julia Fredenburg were starting KC Town Hall and describes the intended permanently affordable neighborhood-resource and cultural-center purpose.",
    observationType: "attributed",
    locator: "Post body and publication date",
    confidence: "high",
    limitations: [
      "The post does not establish sole founding, later public funding, transition, or project outcome.",
    ],
    supportsClaimIds: [kcTownHallClaimId, actionRoutingClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-TALKSNOTRAIDS-ACTION-ROUTE",
    sourceId: talksNotRaidsSourceId,
    project: "nyc-artist-coalition",
    statement:
      "Jamie's February 2019 public post connects a City Hall hearing, coalition video, campaign site, and Council action on Introduction 1156.",
    observationType: "explicit",
    locator: "Post body and linked destinations",
    confidence: "high",
    limitations: [
      "The post does not establish attendance, bill outcome, sole authorship, or causality.",
    ],
    supportsClaimIds: [actionRoutingClaimId],
    reviewedAt,
  },
  {
    id: "OBS-GOTHAMIST-CABARET-MOMENTUM-2017",
    sourceId: gothamistSourceId,
    project: "nyc-artist-coalition",
    statement:
      "Gothamist reported in March 2017 that hundreds gathered at Market Hotel around the effort to repeal New York City's Cabaret Law.",
    observationType: "explicit",
    locator: "Headline, dek, and article body",
    confidence: "high",
    limitations: [
      "The article supplies campaign context, not Jamie's individual role or a precise attendance count.",
    ],
    supportsClaimIds: [urlClaimId],
    reviewedAt,
  },
  {
    id: "OBS-FB-JAMIE-SELECTED-INTERACTION-SNAPSHOT",
    sourceId: controlsSourceId,
    project: personalProject,
    statement:
      "Four selected public project posts displayed mutable July 15 floors: WOW List 28 likes; CouncilStat seven likes and no comments; Let NYC Dance 24 reactions; KC Town Hall 106 reactions and 14 comments.",
    observationType: "metadata",
    locator: "selectedPublicSourceControls",
    confidence: "high",
    limitations: [
      "The counters are current interface observations, not historical analytics or unique people.",
    ],
    supportsClaimIds: [interactionClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const jamiePersonalFacebookPostClaims = [
  {
    id: populationClaimId,
    project: personalProject,
    claimType: "scale",
    internalClaim:
      "The July 13 owner-filtered Facebook crawl returned 1,243 unique records across 621 cursor pages from December 19, 2006 through June 12, 2022 and ended with no next page; the Posted by: You filter remained available on July 15.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-FB-JAMIE-CENSUS-METHOD",
      "OBS-FB-JAMIE-POPULATION-CONTROL",
    ],
    projections: [],
    evidence: [
      {
        sourceId: censusSourceId,
        relationship: "private-support",
        supports: ["returned population", "pagination control", "chronology boundaries"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: controlsSourceId,
        relationship: "supports-boundary",
        supports: ["public-safe aggregate controls", "completeness and privacy boundaries"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Completeness is limited to records returned by Facebook Manage Posts filtered to Posted by You in the July 13 crawl.",
      "The control is not a native Meta export, deletion history, or proof that no hidden, removed, migrated, or unavailable post existed.",
      "Audience status was not exposed for 973 records, so the full record-level corpus remains protected.",
    ],
    antiClaims: [
      "This is every Facebook post Jamie ever published.",
      "All 1,243 records were public.",
      "The control includes deleted or hidden history.",
    ],
    researchTaskIds: ["RT-FB-JAMIE-META-EXPORT-RECONCILIATION"],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"],
  },
  {
    id: missionClaimId,
    project: personalProject,
    claimType: "method",
    internalClaim:
      "A deterministic full-population research pass routed 181 unique records into overlapping project or practice categories, with recurring traces across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, creative and civic technology, waterways practice, and KC Town Hall.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-FB-JAMIE-MISSION-ROUTING"],
    projections: [],
    evidence: [
      {
        sourceId: censusSourceId,
        relationship: "private-support",
        supports: ["181 mission-routed records", "overlapping project routes"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: controlsSourceId,
        relationship: "supports-boundary",
        supports: ["aggregate project-route counts", "classification boundary"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Categories overlap and are archive-navigation aids, not exclusive semantic judgments.",
      "Posting frequency does not measure effort, importance, professional priority, audience, or impact.",
      "Shared and linked material retains its original authorship.",
    ],
    antiClaims: [
      "The corpus proves Jamie's professional priorities by frequency.",
      "Every mission-routed record is an accomplishment claim.",
      "Jamie authored all material appearing in the routed records.",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: urlClaimId,
    project: personalProject,
    claimType: "method",
    internalClaim:
      "The owner-filtered corpus contains 430 URL-bearing records and 549 unique normalized external destinations that form a governed source-discovery and action-routing queue.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-FB-JAMIE-URL-ROUTING", "OBS-GOTHAMIST-CABARET-MOMENTUM-2017"],
    projections: [
      {
        key: "archive-note",
        text: "Jamie's owner-filtered Facebook archive preserves 549 external source leads; each remains queued for recovery and close reading before it can support a public claim.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: controlsSourceId,
        relationship: "direct-support",
        supports: ["430 URL-bearing records", "549 normalized destinations"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: gothamistSourceId,
        relationship: "corroborating",
        supports: ["one recovered and close-read independent destination"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Every destination remains a source lead until recovered, close-read, and decomposed.",
      "Posting a URL does not establish its truth, authorship, availability, readership, endorsement, partnership, conversion, causality, or impact.",
      "Dead, redirected, or unresolved routes require source-specific preservation review.",
    ],
    antiClaims: [
      "Every posted URL corroborates a portfolio claim.",
      "Jamie authored or endorsed every linked source.",
      "The link inventory measures readership or impact.",
    ],
    researchTaskIds: ["RT-FB-JAMIE-POSTED-SOURCE-REVIEW"],
    researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source review"],
  },
  {
    id: stakeholderClaimId,
    project: personalProject,
    claimType: "context",
    internalClaim:
      "Overlapping full-population routing rules found 20 New York City Council, 18 Rafael Espinal, nine Market Hotel, six Office of Nightlife, five Antonio Reynoso, one Quinton Lucas, and one Helen Rosenthal record occurrences.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: ["OBS-FB-JAMIE-STAKEHOLDER-ROUTING"],
    projections: [],
    evidence: [
      {
        sourceId: controlsSourceId,
        relationship: "direct-support",
        supports: ["bounded stakeholder string and route occurrences"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Counts are overlapping mentions, tags, quotations, and link matches in Jamie's records.",
      "They are not inbound actions by the named stakeholders and do not establish engagement, endorsement, attendance, partnership, response, or impact.",
      "No corpus-wide responder-identity census was promoted from the personal archive.",
    ],
    antiClaims: [
      "Twenty New York City Council stakeholders engaged with Jamie.",
      "Rafael Espinal endorsed 18 posts.",
      "Mentions prove official participation or policy influence.",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: interactionClaimId,
    project: personalProject,
    claimType: "scale",
    internalClaim:
      "Four individually rechecked public project posts retained mutable July 15 display floors: WOW List 28 likes; CouncilStat job route seven likes and no comments; Let NYC Dance 24 reactions; KC Town Hall 106 reactions and 14 comments.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: ["OBS-FB-JAMIE-SELECTED-INTERACTION-SNAPSHOT"],
    projections: [],
    evidence: [
      {
        sourceId: controlsSourceId,
        relationship: "direct-support",
        supports: ["dated selected-post counter controls"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Current counters are mutable interface observations, not historical analytics.",
      "Do not sum the counters or convert them into unique people, reach, attendance, stakeholder engagement, endorsement, conversion, causality, or impact.",
      "The KC Town Hall project-account response is one direct public response, not a stakeholder-group census.",
    ],
    antiClaims: [
      "The selected posts reached 165 people.",
      "The counters prove project impact.",
      "The comments establish institutional endorsement.",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated-browser review"],
  },
  {
    id: actionRoutingClaimId,
    project: personalProject,
    claimType: "method",
    internalClaim:
      "Selected public posts show Jamie repeatedly connecting project explanation to practical participation routes: joining a WOW List calendar, contacting Council through Let NYC Dance, joining a KC Town Hall neighborhood process, and attending or amplifying a Talks Not Raids hearing.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-FB-JAMIE-WOWLIST-NINE-CITIES",
      "OBS-FB-JAMIE-LETNYCDANCE-ACTION-ROUTE",
      "OBS-FB-JAMIE-KCTOWNHALL-COINITIATION",
      "OBS-FB-JAMIE-TALKSNOTRAIDS-ACTION-ROUTE",
    ],
    projections: [
      {
        key: "archive-note",
        text: "Selected public posts show Jamie connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: wowListSourceId,
        relationship: "direct-support",
        supports: ["community calendar join route"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: letNycDanceSourceId,
        relationship: "direct-support",
        supports: ["press-to-Council-action route"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: kcTownHallSourceId,
        relationship: "direct-support",
        supports: ["neighborhood-process and project route"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: talksNotRaidsSourceId,
        relationship: "direct-support",
        supports: ["hearing, coalition-media, campaign-site, and bill-action route"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "This is a selected-post practice claim, not a semantic claim about all 1,243 records.",
      "Routing does not establish clicks, attendance, calls placed, conversion, adoption, endorsement, causality, or impact.",
      "Collective project, campaign, and source authorship remains intact.",
    ],
    antiClaims: [
      "Jamie's posts caused participation or legislation.",
      "Jamie solely authored the campaigns and their materials.",
      "The corpus proves audience conversion.",
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source review"],
  },
  {
    id: councilStatClaimId,
    project: "callnyc",
    claimType: "context",
    internalClaim:
      "In a public May 2016 post, Jamie invited open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting; the exact institutional relationship behind that wording remains unresolved.",
    epistemicState: "sourced",
    publicationState: "restricted",
    selectionState: "dormant",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-FB-JAMIE-COUNCILSTAT-JOB-ROUTE"],
    projections: [],
    evidence: [
      {
        sourceId: councilStatSourceId,
        relationship: "direct-support",
        supports: ["Jamie's attributed invitation", "CouncilStat job route"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Preserve attribution to Jamie's post and infer no employment, title, contract, formal team membership, or hiring authority.",
      "The linked historical job PDF remains unavailable and requires recovery.",
    ],
    antiClaims: [
      "Jamie was employed by the CouncilStat team.",
      "Jamie authored or controlled hiring for the job posting.",
    ],
    researchTaskIds: ["RT-FB-JAMIE-COUNCILSTAT-ROLE-RECOVERY"],
    researchInquiryIds: ["INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated-browser review"],
  },
  {
    id: kcTownHallClaimId,
    project: "kc-town-hall",
    claimType: "role",
    internalClaim:
      "Jamie's July 2018 public announcement states that he and Julia Fredenburg were starting KC Town Hall and describes their intended permanently affordable neighborhood-resource and cultural-center purpose.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-FB-JAMIE-KCTOWNHALL-COINITIATION"],
    projections: [
      {
        key: "archive-note",
        text: "A contemporaneous public announcement states that Jamie and Julia Fredenburg were starting KC Town Hall as a permanently affordable neighborhood resource and cultural center.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: kcTownHallSourceId,
        relationship: "direct-support",
        supports: ["co-initiation statement", "stated public-benefit intention"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Credit Julia Fredenburg and retain the wording as Jamie's contemporaneous first-person statement.",
      "The post does not establish sole founding, ownership, later public funding, project outcome, or causal impact.",
    ],
    antiClaims: [
      "Jamie solely founded KC Town Hall.",
      "The announcement proves the project's later outcome or impact.",
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated-browser review"],
  },
] satisfies ClaimRecord[];

export const jamiePersonalFacebookPostResearchTasks = [
  {
    id: "RT-FB-JAMIE-META-EXPORT-RECONCILIATION",
    project: personalProject,
    question:
      "How does the 1,243-record owner-filtered control compare with an authorized native Meta export, including deleted, hidden, migrated, or otherwise unavailable history?",
    priority: "medium",
    status: "blocked",
    captureIds: ["CAP-FB-JAMIE-OWNER-POST-POPULATION-2026"],
    sourceIds: [censusSourceId, controlsSourceId],
    claimIds: [populationClaimId],
    successCriteria: [
      "An authorized export is inventoried privately and reconciled against the owner-filtered denominator without publishing private row data.",
      "Any difference is described as a platform or preservation boundary rather than silently merged.",
    ],
    nextActions: [
      "Obtain an authorized Meta export if Jamie decides the additional recovery value justifies it.",
      "Run a private identity, date, and record-form reconciliation.",
    ],
    publicNote:
      "A native export is not currently available; the owner-filtered control remains explicitly bounded.",
    owner: "Jamie Burkart / archival research",
    blockedReason: "Requires an authorized Meta export that has not been supplied.",
    reviewedAt,
  },
  {
    id: "RT-FB-JAMIE-POSTED-SOURCE-REVIEW",
    project: personalProject,
    question:
      "Which of the 549 normalized external destinations can be recovered, close-read, decomposed, and promoted as independent or official sources?",
    priority: "high",
    status: "in-progress",
    captureIds: [
      "CAP-FB-JAMIE-OWNER-POST-POPULATION-2026",
      "CAP-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
    ],
    sourceIds: [controlsSourceId, gothamistSourceId],
    claimIds: [urlClaimId, actionRoutingClaimId],
    successCriteria: [
      "Priority destinations have a recovered public or archived source, atomic observations, claim-specific boundaries, and preservation status.",
      "Unresolved, dead, redirected, or non-public destinations remain explicit leads rather than evidence.",
    ],
    nextActions: [
      "Prioritize independent reporting, government records, project artifacts, and action routes by current portfolio relevance.",
      "Associate each recovered proposition with the existing claim graph or a bounded new claim.",
    ],
    publicNote:
      "The corpus supplies a deep source queue; one posted URL is never automatic corroboration.",
    owner: "Knowledge-bank archival production",
    reviewedAt,
  },
  {
    id: "RT-FB-JAMIE-COUNCILSTAT-ROLE-RECOVERY",
    project: "callnyc",
    question:
      "What exact working relationship, if any, underlies Jamie's May 2016 invitation to work with him and a City Council team through a CouncilStat job posting?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026"],
    sourceIds: [councilStatSourceId],
    claimIds: [councilStatClaimId],
    successCriteria: [
      "The historical job posting or equivalent official record is recovered.",
      "Jamie's exact relationship is corroborated by a role record, collaborator proof note, contract, or equivalent source before public use.",
    ],
    nextActions: [
      "Recover the linked historical CouncilStat job PDF through archives or Council records.",
      "Search contemporaneous correspondence and collaborator records for bounded role language.",
    ],
    publicNote:
      "The public post preserves Jamie's attributed invitation language but does not establish employment, title, or hiring authority.",
    owner: "CallNYC archival research",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const jamiePersonalFacebookPostInquiries = [
  {
    id: "INQ-FB-JAMIE-POST-CORPUS-2026",
    project: personalProject,
    question:
      "What can the complete returned owner-filtered Facebook population establish without turning private life, mutable counters, or platform associations into public professional claims?",
    methods: [
      "Traversed 621 owner-filtered cursor pages until Facebook reported has-next-page false.",
      "Deduplicated 3,728 returned nodes into 1,243 unique records and verified zero missing dates and zero owner-absent records.",
      "Rechecked the authenticated Manage Posts interface and applied its Posted by: You filter on July 15, 2026.",
      "Ran deterministic overlapping mission and stakeholder routing rules across the protected population, then individually reopened selected public sources before promotion.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The returned owner-filtered surface contained 1,243 unique records across 621 cursor pages and ended with no next page.",
      "The returned chronology runs from December 19, 2006 through June 12, 2022.",
      "A deterministic research pass routed 181 unique records into overlapping mission categories.",
      "Six selected posts were individually rechecked as public and preserve project, action-routing, source, and mutable-response evidence.",
    ],
    limitations: [
      "This is complete disposition of the returned owner-filtered surface, not a native Meta export, deletion history, or immutable lifetime population.",
      "Audience labels were not exposed for 973 records; the raw population remains protected.",
      "Deterministic categories are research-routing aids, not semantic truth, effort, engagement, endorsement, or impact measures.",
      "No complete responder-identity or historical engagement export was recovered.",
    ],
    sourceIds: [censusSourceId, controlsSourceId],
    publicSummary:
      "The July 2026 owner-filtered census accounted for all 1,243 records returned across 621 cursor pages; deleted, hidden, audience-unknown, and otherwise unavailable history remains outside the public claim.",
    protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001",
  },
  {
    id: "INQ-FB-JAMIE-POSTED-SOURCES-2026",
    project: personalProject,
    question:
      "Which external destinations can be recovered and promoted as independent or official evidence?",
    methods: [
      "Normalized external destinations and separated posted-source leads from claim evidence.",
      "Compared recovered destinations against the existing knowledge bank before creating new source records.",
      "Close-read Gothamist's March 2017 Market Hotel article and recognized existing NPR and Pitch sources already governed elsewhere in the bank.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The corpus contains 430 URL-bearing records and 549 unique normalized external destinations.",
      "NPR Cabaret Law reporting and The Pitch's Great Accommodations reporting already existed as governed sources.",
      "The March 2017 Gothamist Market Hotel article is now a governed independent source with campaign-context boundaries.",
      "The remaining destinations stay in the source-review queue.",
    ],
    limitations: [
      "A posted URL is not automatic corroboration of its propositions.",
      "Dead links, redirects, changed pages, and snippets require source-specific recovery and review.",
      "Posting does not establish authorship, partnership, endorsement, readership, clicks, conversion, causality, or outcomes.",
    ],
    sourceIds: [controlsSourceId, gothamistSourceId],
    publicSummary:
      "The corpus yielded 549 external source leads; reviewed reporting strengthens campaign context while the remaining routes stay queued.",
  },
  {
    id: "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026",
    project: "callnyc",
    question:
      "What exact working relationship, if any, underlies Jamie's May 2016 CouncilStat invitation language?",
    methods: [
      "Rechecked the post's public audience label, first-person wording, CouncilStat job-card identity, and current counter display.",
      "Separated directly observable language from employment, title, contract, team-membership, and hiring-authority interpretations.",
      "Retained recovery of the original Council job PDF and corroborating records as open work.",
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "The public post directly supports Jamie's attributed invitation language and the CouncilStat job-posting route.",
      "The post does not resolve Jamie's title, employment, contract, formal team membership, or hiring authority.",
    ],
    limitations: [
      "The linked historical job PDF is currently unavailable.",
      "Social wording cannot safely distinguish formal employment from adjacent or informal collaboration without corroboration.",
    ],
    sourceIds: [councilStatSourceId],
    publicSummary:
      "Jamie's public post preserves a CouncilStat job route and attributed team language while his exact Council relationship remains unresolved.",
  },
] satisfies ResearchInquiry[];

export const jamiePersonalFacebookPostReviewSummary = {
  records: 1243,
  cursorPages: 621,
  terminalHasNextPage: false,
  missionRoutedRecords: 181,
  urlBearingRecords: 430,
  normalizedExternalDestinations: 549,
  selectedPublicSources: 6,
  rawPopulation: "protected",
  websiteUpdate: "not-required",
} as const;
