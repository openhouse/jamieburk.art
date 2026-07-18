const reviewedAt = "2026-07-15";
const project = "personal-public-record";
const reportPath = "docs/knowledge-bank/projects/jamie-personal-facebook-posts.md";
const controlsPath = "docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json";

const sourceIds = {
  census: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
  controls: "SRC-FB-JAMIE-POST-CONTROLS-2026",
  nter: "SRC-FB-JAMIE-NTER-OPENING-2010",
  wowlist: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
  councilStat: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
  letNycDance: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
  kcTownHall: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
  talksNotRaids: "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
  gothamist: "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31",
  councilLabs: "SRC-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-2016"
} as const;

const claimIds = [
  "CLM-FB-JAMIE-POST-POPULATION-2026",
  "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE",
  "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026",
  "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026",
  "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026",
  "CLM-FB-JAMIE-PROJECT-ACTION-ROUTING",
  "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE",
  "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE",
  "CLM-FB-JAMIE-NTER-OPENING-CREDIT-TRACE",
  "CLM-FB-JAMIE-WOWLIST-NINE-CITY-TRACE"
] as const;

const inquiryIds = [
  "INQ-FB-JAMIE-POST-CORPUS-2026",
  "INQ-FB-JAMIE-POSTED-SOURCES-2026",
  "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"
] as const;

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
  audienceLabels: {
    public: 268,
    onlyMe: 1,
    friends: 1,
    notExposed: 973
  },
  missionRoutedRecords: 181,
  urlBearingRecords: 430,
  uniqueNormalizedExternalUrls: 549,
  selectedPublicSources: 6,
  controlsPath,
  reportPath
} as const;

const publicPost = {
  organization: "Jamie Burkart",
  author: "Jamie Burkart",
  kind: "public-social-post" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: reviewedAt,
  preferredPublicUrl: "canonical" as const
};

export const jamiePersonalFacebookPosts = {
  intakeItems: [
    {
      id: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
      kind: "public-artifact",
      title: "Jamie Burkart personal Facebook owner-post population",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: [project],
      reason:
        "Account for every unique record returned by Facebook's owner-filtered Manage Posts surface while preserving public-safety, audience, authorship, and platform-completeness boundaries.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [sourceIds.census, sourceIds.controls],
      observationIds: [
        "OBS-FB-JAMIE-CENSUS-METHOD",
        "OBS-FB-JAMIE-POPULATION-CONTROL",
        "OBS-FB-JAMIE-RECORD-FORMS",
        "OBS-FB-JAMIE-MISSION-ROUTING",
        "OBS-FB-JAMIE-URL-ROUTING",
        "OBS-FB-JAMIE-STAKEHOLDER-ROUTING"
      ],
      researchInquiryIds: [inquiryIds[0], inquiryIds[1]],
      boundaries: [
        "Complete means every unique record returned by the July 2026 owner-filtered surface received a disposition.",
        "The population is not a native Meta export, deletion history, or immutable lifetime-publication count.",
        "Audience labels were not exposed for 973 records, so the raw corpus remains protected.",
        "Raw text, ordinary-life material, identities, comments, media, authentication state, and record-level counters remain outside the public repository."
      ]
    },
    {
      id: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      kind: "public-artifact",
      title: "Selected public personal Facebook project posts and linked sources",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: [project, "nterchng", "wowlist", "callnyc", "nyc-artist-coalition", "kc-town-hall"],
      reason:
        "Promote only individually reopened public posts and close-read linked sources that preserve project chronology, collective credit, public participation routes, bounded traction, and open research questions.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        sourceIds.nter,
        sourceIds.wowlist,
        sourceIds.councilStat,
        sourceIds.letNycDance,
        sourceIds.kcTownHall,
        sourceIds.talksNotRaids,
        sourceIds.gothamist,
        sourceIds.councilLabs
      ],
      observationIds: [
        "OBS-FB-JAMIE-NTER-OPENING",
        "OBS-FB-JAMIE-WOWLIST-NINE-CITIES",
        "OBS-FB-JAMIE-COUNCILSTAT-JOB-ROUTE",
        "OBS-FB-JAMIE-LETNYCDANCE-ACTION-ROUTE",
        "OBS-FB-JAMIE-KCTOWNHALL-COINITIATION",
        "OBS-FB-JAMIE-TALKSNOTRAIDS-ACTION-ROUTE",
        "OBS-FB-JAMIE-SELECTED-INTERACTION-SNAPSHOT",
        "OBS-GOTHAMIST-CABARET-MOMENTUM-2017",
        "OBS-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-2016"
      ],
      researchInquiryIds: [...inquiryIds],
      boundaries: [
        "A personal post is first-person evidence, not independent corroboration of its every proposition.",
        "Shared or linked material keeps its original authorship and collective project credit.",
        "Current counters are mutable interface labels, not historical analytics, unique people, stakeholder engagement, or impact.",
        "The selected public sources enrich the bank but do not force a new visible portfolio claim."
      ]
    }
  ],

  sources: [
    {
      id: sourceIds.census,
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
        "The protected traversal returned 1,243 unique records across 621 cursor pages and reached the terminal no-next-page state.",
      protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026",
      supportsGenerally: [
        "the bounded 1,243-record owner-filtered population control",
        "the returned chronology and aggregate research routes",
        "the terminal pagination result"
      ],
      doesNotEstablish: [
        "a native Meta export, deletion history, or immutable lifetime count",
        "public audience status for records without exposed audience labels",
        "readership, endorsement, unique people, causality, or impact",
        "authorship of shared, quoted, linked, photographed, or collaborator-created material"
      ]
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
        "The file preserves population, chronology, record-form, mission-routing, URL-routing, stakeholder-routing, and selected-source controls without raw records.",
      supportsGenerally: [
        "aggregate reconciliation of the returned owner-filtered population",
        "coarse year and record-form totals",
        "bounded mission, URL, stakeholder, and selected-source controls"
      ],
      doesNotEstablish: [
        "a lifetime account archive or universal public audience",
        "record-level contents, identities, or interactions",
        "stakeholder engagement, reach, conversion, causality, or impact"
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
      supportsGenerally: ["a dated public opening trace", "the three creator credits"],
      doesNotEstablish: ["the division of technical labor", "sole authorship by Jamie", "rights to republish the linked photographs"]
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
        "The post attributes community calendars in nine cities to WOW List members and gives readers a join route.",
      supportsGenerally: ["Jamie's attributed nine-city statement", "a WOW List participation route", "a mutable July 2026 display of 28 likes"],
      doesNotEstablish: ["sustained activity in every city", "a lifetime city or user total", "that Jamie organized every local calendar", "impact"]
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
        "Jamie invited open-data practitioners to work with him and a City Council team while linking a CouncilStat job posting.",
      supportsGenerally: ["Jamie's exact first-person invitation language", "a CouncilStat job route", "a mutable July 2026 display of seven likes and no comments"],
      doesNotEstablish: ["Jamie's employment, title, contract, or formal team membership", "job-post authorship or hiring authority", "endorsement, conversion, or impact"]
    },
    {
      id: sourceIds.letNycDance,
      title: "Jamie Burkart public Cabaret Law press-and-action post",
      ...publicPost,
      publishedAt: "2017-09-20",
      canonicalUrl:
        "https://www.facebook.com/jburkart/posts/pfbid021AY6ydWmHSAXQooc1KgivMWjY3jcuWSj958Z73MQ6fJick7jNaHHDwfKgZuo7cbal",
      publicCitation:
        "Jamie Burkart, public Facebook post pairing Cabaret Law reporting with a Council action route, September 20, 2017.",
      publicNote:
        "The post pairs Jamie's NPR quotation with a call to contact Council members and a campaign call script.",
      supportsGenerally: ["Jamie's public press-to-action routing", "an NPR and Council call-script route", "a mutable July 2026 display of 24 reactions"],
      doesNotEstablish: ["sole campaign authorship", "that the post caused legislative action", "unique people, calls placed, conversion, or impact"]
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
        "Jamie wrote that he and Julia Fredenburg were starting the project and described its intended neighborhood-resource and cultural-center benefit.",
      supportsGenerally: ["Jamie's attributed co-initiation statement with Julia Fredenburg", "the stated public-benefit intention", "one bounded project-account response", "a mutable July 2026 display of 106 reactions and 14 comments"],
      doesNotEstablish: ["sole founding, ownership, or authorship", "later Council action or project outcome", "unique people, endorsement, causality, or impact"]
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
        "The post routes readers to a hearing, coalition video, campaign site, and Council action on Introduction 1156.",
      supportsGenerally: ["Jamie's public routing among an in-person hearing, coalition media, campaign infrastructure, and legislation"],
      doesNotEstablish: ["sole authorship of the shared coalition material", "attendance or bill outcome", "legislative causality or impact"]
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
        "The article independently reports on the March 2017 Market Hotel gathering and Cabaret Law repeal campaign momentum.",
      supportsGenerally: ["independent reporting on the Market Hotel gathering", "public Cabaret Law repeal advocacy"],
      doesNotEstablish: ["Jamie's individual role", "a precise attendance count", "sole campaign authorship", "legislative causality or the later repeal outcome"]
    },
    {
      id: sourceIds.councilLabs,
      title: "Constituent Services Data",
      organization: "New York City Council Labs",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-05-27",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://council.nyc.gov/labs/2016/05/27/constituent-services-data/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council Labs, 'Constituent Services Data,' May 27, 2016.",
      publicNote:
        "The official page describes the CouncilStat data release and the January 2016 Civic Hall hackathon context.",
      supportsGenerally: ["official CouncilStat data-publication context", "the January 2016 Civic Hall hackathon context", "an invitation to civic technologists to use the data"],
      doesNotEstablish: ["Jamie's employment, title, contract, or formal Council role", "the historical job posting", "CallNYC adoption, endorsement, or impact"]
    }
  ],

  observations: [
    {
      id: "OBS-FB-JAMIE-CENSUS-METHOD",
      intakeId: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
      sourceId: sourceIds.census,
      project,
      kind: "source-fact",
      text: "The owner-filtered traversal crossed 621 cursor pages, deduplicated 3,728 returned nodes into 1,243 records, and ended when Facebook reported no next page.",
      locator: "Protected pagination and deduplication control",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[0]],
      researchInquiryIds: [inquiryIds[0]],
      limitations: ["The method accounts for the returned surface, not deleted or unavailable history.", "It is not a native Meta export or immutable lifetime count."]
    },
    {
      id: "OBS-FB-JAMIE-POPULATION-CONTROL",
      intakeId: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
      sourceId: sourceIds.controls,
      project,
      kind: "limitation",
      text: "The returned population runs from December 19, 2006 through June 12, 2022; 268 records exposed Public, one Only me, one Friends, and 973 no audience label in the crawl.",
      locator: "populationControl and audienceLabels",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[0]],
      researchInquiryIds: [inquiryIds[0]],
      limitations: ["An unexposed audience label is unknown, not public.", "The raw corpus remains protected even when aggregate controls are public-safe."]
    },
    {
      id: "OBS-FB-JAMIE-RECORD-FORMS",
      intakeId: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
      sourceId: sourceIds.controls,
      project,
      kind: "source-fact",
      text: "Eight coarse record-form categories reconcile exactly to the 1,243-record returned population.",
      locator: "recordForms",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[0]],
      researchInquiryIds: [inquiryIds[0]],
      limitations: ["Form classification is an archival control, not a statement of authorship.", "Unavailable media or text is retained as an explicit category rather than reconstructed."]
    },
    {
      id: "OBS-FB-JAMIE-MISSION-ROUTING",
      intakeId: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
      sourceId: sourceIds.controls,
      project,
      kind: "context",
      text: "Overlapping deterministic rules routed 181 unique records into project or practice categories led by WOW List, Sunday Dinner, NYC Artist Coalition, and Let NYC Dance.",
      locator: "missionRouting",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[1]],
      researchInquiryIds: [inquiryIds[0]],
      limitations: ["Categories overlap and cannot be summed into a population denominator.", "Routing frequency is not effort, importance, audience, engagement, or impact."]
    },
    {
      id: "OBS-FB-JAMIE-URL-ROUTING",
      intakeId: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
      sourceId: sourceIds.controls,
      project,
      kind: "research-lead",
      text: "The population contains 430 URL-bearing records and 549 unique normalized external destinations queued for source-specific recovery and close reading.",
      locator: "postedUrlInventory",
      status: "extracted",
      publicSafe: true,
      claimIds: [claimIds[2]],
      researchInquiryIds: [inquiryIds[1]],
      limitations: ["A posted destination is a source lead, not corroboration.", "Posting does not establish authorship, partnership, readership, endorsement, or impact."]
    },
    {
      id: "OBS-FB-JAMIE-STAKEHOLDER-ROUTING",
      intakeId: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
      sourceId: sourceIds.controls,
      project,
      kind: "context",
      text: "Overlapping mention, tag, quotation, and link rules found 20 New York City Council, 18 Rafael Espinal, nine Market Hotel, six Office of Nightlife, five Antonio Reynoso, one Quinton Lucas, and one Helen Rosenthal record occurrences.",
      locator: "stakeholderRouting",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[3]],
      researchInquiryIds: [inquiryIds[0]],
      limitations: ["These are Jamie's outbound references, not inbound stakeholder actions.", "Occurrences do not establish engagement, response, endorsement, attendance, partnership, or impact."]
    },
    {
      id: "OBS-FB-JAMIE-NTER-OPENING",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.nter,
      project: "nterchng",
      kind: "source-fact",
      text: "Jamie's January 2010 public post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as NTER CHNG creators and preserves a dated opening trace.",
      locator: "Post body and publication date",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[8]],
      researchInquiryIds: [inquiryIds[1]],
      limitations: ["The post does not divide technical labor.", "It does not establish sole authorship or photo-republication rights."]
    },
    {
      id: "OBS-FB-JAMIE-WOWLIST-NINE-CITIES",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.wowlist,
      project: "wowlist",
      kind: "source-fact",
      text: "Jamie's October 2015 public post attributes community calendars in nine cities to WOW List members and gives readers a route to join.",
      locator: "Post body and publication date",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[5], claimIds[9]],
      researchInquiryIds: [inquiryIds[1]],
      limitations: ["The statement is attributed first-person evidence, not independent verification.", "It does not establish lifetime cities, users, reach, or locally organized activity by Jamie in every place."]
    },
    {
      id: "OBS-FB-JAMIE-COUNCILSTAT-JOB-ROUTE",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.councilStat,
      project: "callnyc",
      kind: "research-lead",
      text: "Jamie's May 2016 public post invites open-data practitioners to work with him and a City Council team while routing to a CouncilStat job posting.",
      locator: "Post body, linked card, and publication date",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[6]],
      researchInquiryIds: [inquiryIds[2]],
      limitations: ["The historical job posting was not recovered in this pass.", "The post does not establish Jamie's title, employment, contract, formal team membership, job-post authorship, or hiring authority."]
    },
    {
      id: "OBS-FB-JAMIE-LETNYCDANCE-ACTION-ROUTE",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.letNycDance,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Jamie's September 2017 public post pairs Cabaret Law press coverage with a concrete Council contact script.",
      locator: "Post body and linked routes",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[5]],
      researchInquiryIds: [inquiryIds[1]],
      limitations: ["The post does not establish calls placed or legislative causality.", "Coalition campaign work remains collective rather than solely authored by Jamie."]
    },
    {
      id: "OBS-FB-JAMIE-KCTOWNHALL-COINITIATION",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.kcTownHall,
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Jamie's July 2018 public post says that he and Julia Fredenburg were starting KC Town Hall and describes its intended public benefit.",
      locator: "Post body and publication date",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[5], claimIds[7]],
      researchInquiryIds: [inquiryIds[1]],
      limitations: ["This is attributed first-person evidence, not sole-founding proof.", "The post does not establish later Council action, project outcome, or impact."]
    },
    {
      id: "OBS-FB-JAMIE-TALKSNOTRAIDS-ACTION-ROUTE",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.talksNotRaids,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "Jamie's February 2019 public post routes readers among a City Hall hearing, coalition video, campaign site, and Introduction 1156.",
      locator: "Post body and linked routes",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[5]],
      researchInquiryIds: [inquiryIds[1]],
      limitations: ["The post does not establish attendance or the bill's outcome.", "It does not establish sole authorship, campaign ownership, or legislative causality."]
    },
    {
      id: "OBS-FB-JAMIE-SELECTED-INTERACTION-SNAPSHOT",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.controls,
      project,
      kind: "limitation",
      text: "A July 15, 2026 review retained mutable counters for four selected public posts and one bounded project-account response on the KC Town Hall post.",
      locator: "selectedPublicSourceControls",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[4]],
      researchInquiryIds: [inquiryIds[0]],
      limitations: ["Counters are current interface labels, not historical analytics or unique people.", "One project-account response is not a stakeholder-group measure, endorsement, reach, causality, or impact."]
    },
    {
      id: "OBS-GOTHAMIST-CABARET-MOMENTUM-2017",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.gothamist,
      project: "nyc-artist-coalition",
      kind: "context",
      text: "Gothamist independently reported on the March 2017 Market Hotel gathering and the Cabaret Law repeal effort's public momentum.",
      locator: "Article body and publication metadata",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[5]],
      researchInquiryIds: [inquiryIds[1]],
      limitations: ["The article does not establish Jamie's individual role.", "It does not supply a precise attendance count, sole authorship, legislative causality, or the later repeal outcome."]
    },
    {
      id: "OBS-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-2016",
      intakeId: "INTAKE-FB-JAMIE-PUBLIC-PROJECT-POSTS-2026",
      sourceId: sourceIds.councilLabs,
      project: "callnyc",
      kind: "context",
      text: "A May 2016 New York City Council Labs page describes the CouncilStat data release, the January Civic Hall hackathon, and an invitation to civic technologists to use the data.",
      locator: "Article body and publication metadata",
      status: "verified",
      publicSafe: true,
      claimIds: [claimIds[6]],
      researchInquiryIds: [inquiryIds[2]],
      limitations: ["The official page does not mention Jamie or recover the linked job posting.", "It does not establish Jamie's exact Council relationship or CallNYC adoption."]
    }
  ],

  claims: [
    {
      id: claimIds[0],
      project,
      internalClaim: "The July 2026 owner-filtered Facebook surface returned 1,243 unique records across 621 cursor pages and reached a terminal no-next-page state.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "All 1,243 records returned by the owner-filtered surface received public-safe dispositions.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [
        { sourceId: sourceIds.census, relationship: "private-support", supports: ["population, pagination, chronology, owner, and audience controls"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.controls, relationship: "direct-support", supports: ["public-safe aggregate reconciliation"], locator: "populationControl", confidence: "high", renderCitation: false }
      ],
      boundaries: ["Complete refers only to the returned owner-filtered surface.", "The raw corpus remains protected because 973 records lacked an exposed audience label."],
      antiClaims: ["Jamie published exactly 1,243 Facebook posts in his lifetime", "All 1,243 records were public", "The census proves no records were deleted, hidden, migrated, or unavailable"],
      researchInquiryIds: [inquiryIds[0]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: claimIds[1],
      project,
      internalClaim: "A deterministic pass routed 181 unique returned records into overlapping mission-related project and practice categories.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The protected corpus preserves recurring public traces across cultural, civic, technical, and community practices.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: sourceIds.controls, relationship: "direct-support", supports: ["181 unique mission-routed records and overlapping category counts"], locator: "missionRouting", confidence: "high", renderCitation: false }],
      boundaries: ["Categories overlap and are research routes rather than exclusive semantic judgments.", "Frequency is not effort, importance, public audience, engagement, or impact."],
      antiClaims: ["The category counts can be summed into a second population total", "The most frequent category was Jamie's most important work", "The routing counts measure professional impact"],
      researchInquiryIds: [inquiryIds[0]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival-production review"]
    },
    {
      id: claimIds[2],
      project,
      internalClaim: "The returned population contains 430 URL-bearing records and 549 unique normalized external destinations available for source-specific review.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The personal post archive contributes a 549-destination source-research queue.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: sourceIds.controls, relationship: "direct-support", supports: ["URL-bearing record and normalized-destination counts"], locator: "postedUrlInventory", confidence: "high", renderCitation: false }],
      boundaries: ["Every destination remains a lead until recovered and close-read.", "Posting does not transfer authorship or prove agreement with every proposition at the destination."],
      antiClaims: ["The 549 links are 549 corroborating sources", "Every destination remains live and unchanged", "Posting proves readership, partnership, endorsement, conversion, causality, or impact"],
      researchInquiryIds: [inquiryIds[1]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex source-review pass"]
    },
    {
      id: claimIds[3],
      project,
      internalClaim: "Stakeholder-routing rules preserve recurring outbound references from Jamie's records to public institutions, elected officials, cultural spaces, and nightlife infrastructure.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The corpus preserves recurring outbound civic and cultural stakeholder routes.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: sourceIds.controls, relationship: "direct-support", supports: ["overlapping stakeholder mention, tag, quotation, and link occurrence counts"], locator: "stakeholderRouting", confidence: "high", renderCitation: false }],
      boundaries: ["These are Jamie's outbound references, not inbound stakeholder engagement.", "Occurrence counts overlap and cannot establish response, officeholding-at-date, endorsement, attendance, partnership, or impact."],
      antiClaims: ["Twenty City Council members engaged with Jamie's personal account", "Rafael Espinal engaged 18 times", "Stakeholder-reference frequency proves influence or policy impact"],
      researchInquiryIds: [inquiryIds[0]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex stakeholder-routing review"]
    },
    {
      id: claimIds[4],
      project,
      internalClaim: "Four selected public project posts retained mutable July 2026 counter snapshots, and one KC Town Hall post retained one bounded project-account response.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "Selected public posts retain dated, mutable interaction snapshots with explicit non-impact boundaries.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: sourceIds.controls, relationship: "direct-support", supports: ["selected public counter and bounded response controls"], locator: "selectedPublicSourceControls", confidence: "high", renderCitation: false }],
      boundaries: ["Counters are mutable interface labels, not historical analytics or unique people.", "The project-account response is one response, not a stakeholder-group total."],
      antiClaims: ["The selected counters can be summed into reach", "The counters prove stakeholder engagement or endorsement", "The counters measure attendance, conversion, causality, or impact"],
      researchInquiryIds: [inquiryIds[0]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex traction-boundary review"]
    },
    {
      id: claimIds[5],
      project,
      internalClaim: "Selected public posts document a recurring practice of pairing project explanation with usable participation routes, including joining, Council contact, neighborhood participation, and City Hall action.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Across selected public traces, Jamie repeatedly connected project explanation to a usable participation route.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [
        { sourceId: sourceIds.wowlist, relationship: "direct-support", supports: ["a WOW List join route"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.letNycDance, relationship: "direct-support", supports: ["a press-to-Council-contact route"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.kcTownHall, relationship: "direct-support", supports: ["a neighborhood project invitation"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.talksNotRaids, relationship: "direct-support", supports: ["a hearing, campaign, media, and bill-action route"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.gothamist, relationship: "context", supports: ["independent context for the Cabaret Law campaign's March 2017 public gathering"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["The finding concerns public communication and participation architecture.", "It does not establish whether readers clicked, joined, called, attended, converted, or caused an outcome."],
      antiClaims: ["Jamie solely authored every project or campaign", "The posts prove participation or attendance", "The routing practice caused policy, organizational, or cultural outcomes"],
      researchInquiryIds: [inquiryIds[1]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex implementation-language review"]
    },
    {
      id: claimIds[6],
      project: "callnyc",
      internalClaim: "Jamie's May 2016 post preserves attributed language about working with him and a City Council team through a CouncilStat job route, while his exact relationship remains unresolved.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "Jamie's public post preserves a CouncilStat job route and attributed team language; his exact Council relationship remains unresolved.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: sourceIds.councilStat, relationship: "direct-support", supports: ["Jamie's attributed invitation language and the CouncilStat job route"], confidence: "high", renderCitation: false },
        { sourceId: sourceIds.councilLabs, relationship: "context", supports: ["the official May 2016 CouncilStat data-publication context"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Preserve the statement as attributed first-person language.", "Recover the job posting or corroborating role record before public professional use."],
      antiClaims: ["Jamie was employed by the New York City Council", "Jamie held a formal CouncilStat title or contract", "Jamie authored the job posting or held hiring authority"],
      researchInquiryIds: [inquiryIds[2]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex role-boundary review"]
    },
    {
      id: claimIds[7],
      project: "kc-town-hall",
      internalClaim: "Jamie's July 2018 public post says that he and Julia Fredenburg were starting KC Town Hall and describes the project's intended neighborhood benefit.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "A contemporaneous first-person post preserves Jamie and Julia Fredenburg's co-initiation trace for KC Town Hall.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: sourceIds.kcTownHall, relationship: "direct-support", supports: ["the attributed co-initiation statement and stated intention"], confidence: "high", renderCitation: false }],
      boundaries: ["This is contemporaneous attributed evidence, not an independent complete history.", "Keep Julia Fredenburg's co-credit visible and use later official records for later actions."],
      antiClaims: ["Jamie solely founded KC Town Hall", "The post proves the later funding lifecycle or project outcome", "The post's counters prove endorsement or impact"],
      researchInquiryIds: [inquiryIds[1]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex collective-credit review"]
    },
    {
      id: claimIds[8],
      project: "nterchng",
      internalClaim: "Jamie's January 2010 public post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as NTER CHNG creators and preserves a dated opening trace.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "A contemporaneous public post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as NTER CHNG creators.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: sourceIds.nter, relationship: "direct-support", supports: ["the three creator credits and dated opening trace"], confidence: "high", renderCitation: false }],
      boundaries: ["Preserve all three creator credits.", "Use project archives and collaborator evidence to describe the technical division of labor."],
      antiClaims: ["Jamie solely created NTER CHNG", "The post establishes the complete division of technical work", "The linked photographs are cleared for publication"],
      researchInquiryIds: [inquiryIds[1]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex collective-credit review"]
    },
    {
      id: claimIds[9],
      project: "wowlist",
      internalClaim: "Jamie's October 2015 public post attributed WOW List community calendars in nine cities to members of the project.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "In October 2015 Jamie publicly described WOW List members as making community calendars in nine cities.", status: "active", citationRequired: false, surfaces: [reportPath] }],
      evidence: [{ sourceId: sourceIds.wowlist, relationship: "direct-support", supports: ["Jamie's attributed nine-city statement"], confidence: "high", renderCitation: false }],
      boundaries: ["The source supports attributed wording at one date.", "Use project records for independently reconciled city, member, activity, and duration claims."],
      antiClaims: ["WOW List permanently operated in exactly nine cities", "Jamie personally organized all nine local calendars", "The post's likes establish project reach, adoption, or impact"],
      researchInquiryIds: [inquiryIds[1]],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex source-scope review"]
    }
  ],

  researchInquiries: [
    {
      id: inquiryIds[0],
      project,
      question: "What can the complete returned owner-filtered Facebook population establish without turning private life, mutable counters, or platform associations into public professional claims?",
      methods: ["Traversed 621 owner-filtered cursor pages to the terminal state.", "Deduplicated 3,728 returned nodes into 1,243 unique records.", "Rechecked the authenticated Manage Posts Posted by You filter on July 15, 2026.", "Applied aggregate mission and stakeholder research routes, then individually reopened selected public sources."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["The returned surface contained 1,243 unique records.", "The chronology runs from December 19, 2006 through June 12, 2022.", "All 1,243 records received an aggregate public-safe disposition.", "The six selected posts were individually rechecked as public before promotion."],
      limitations: ["This is not a native Meta export or deletion history.", "Audience labels were not exposed for 973 records.", "The raw record-level population remains protected.", "No complete responder-identity or historical engagement export was recovered."],
      sourceIds: [sourceIds.census, sourceIds.controls],
      publicSummary: "The owner-filtered census accounted for all 1,243 returned records while holding raw and audience-unknown material outside the public repo.",
      protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026"
    },
    {
      id: inquiryIds[1],
      project,
      question: "Which of the 549 external destinations can be recovered, close-read, and promoted as independent, official, or project sources?",
      methods: ["Normalized external destinations and separated source leads from evidence.", "Compared selected destinations against existing bank records.", "Close-read the Gothamist Cabaret Law article and New York City Council Labs page.", "Preserved unresolved destinations as a future research queue."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["The corpus contains 430 URL-bearing records.", "Those records yielded 549 unique normalized destinations.", "The Gothamist article is now a governed independent source.", "The Council Labs page is now a governed official source."],
      limitations: ["A posted URL is not automatic corroboration.", "Dead, changed, redirected, or private destinations require source-specific review.", "Posting does not establish authorship, endorsement, readership, or partnership.", "The remaining source queue was not exhaustively close-read in this pass."],
      sourceIds: [sourceIds.controls, sourceIds.gothamist, sourceIds.councilLabs],
      publicSummary: "The corpus yielded a 549-destination source queue; two newly reviewed destinations matured into bounded sources."
    },
    {
      id: inquiryIds[2],
      project: "callnyc",
      question: "What exact working relationship, if any, underlies Jamie's May 2016 CouncilStat invitation language?",
      methods: ["Rechecked the post's public audience and first-person wording.", "Separated observable language from employment and title interpretations.", "Reviewed the official May 2016 Council Labs data-publication context.", "Searched for but did not recover the original linked job posting."],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["The post directly supports Jamie's attributed invitation language.", "The post routes to a CouncilStat job card.", "The Council Labs page independently establishes official CouncilStat context.", "Jamie's exact title, contract, employment, team membership, and hiring authority remain unresolved."],
      limitations: ["The linked historical job posting was not recovered.", "The official Council Labs page does not mention Jamie.", "Social wording cannot distinguish formal from adjacent collaboration.", "No public role projection is authorized from this evidence alone."],
      sourceIds: [sourceIds.councilStat, sourceIds.councilLabs],
      publicSummary: "A public post preserves CouncilStat job-routing language while Jamie's exact Council relationship remains open."
    }
  ]
};

export const jamiePersonalFacebookPostFindings = {
  sourceIds,
  claimIds: [...claimIds],
  inquiryIds: [...inquiryIds],
  selectedPublicSourceIds: [
    sourceIds.nter,
    sourceIds.wowlist,
    sourceIds.councilStat,
    sourceIds.letNycDance,
    sourceIds.kcTownHall,
    sourceIds.talksNotRaids,
    sourceIds.gothamist,
    sourceIds.councilLabs
  ],
  controlsPath,
  reportPath
} as const;
