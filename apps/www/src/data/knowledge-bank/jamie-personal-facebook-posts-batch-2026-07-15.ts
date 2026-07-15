import type { KnowledgeBank } from "./schema.ts";

type JamiePersonalFacebookPostsBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

export const jamiePersonalFacebookPostAudit = {
  crawlCompletedAt: "2026-07-13",
  authenticatedFilterRecheckedAt: "2026-07-15",
  populationDefinition: "Facebook Manage Posts filtered to Posted by You",
  populationControl: {
    cursorPages: 621,
    returnedNodes: 3728,
    uniqueRecords: 1243,
    terminalHasNextPage: false,
    missingDates: 0,
    ownerAbsentRecords: 0,
    recoveredStart: "2006-12-19",
    recoveredEnd: "2022-06-12",
    audienceLabelExposedRecords: 270,
    audienceLabelNotExposedRecords: 973
  },
  forms: {
    text: 335,
    sharedStory: 244,
    photo: 221,
    mediaOrTextUnavailable: 159,
    photoAlbum: 135,
    event: 58,
    externalLink: 55,
    video: 36
  },
  missionRouting: {
    uniqueRecords: 181,
    projectRecordCounts: {
      wowList: 48,
      sundayDinner: 44,
      nycArtistCoalition: 34,
      letNycDance: 33,
      creativeTechnical: 19,
      civicTechnical: 13,
      waterPublics: 10,
      saveNycSpaces: 10,
      talksNotRaids: 4,
      fairRentNyc: 3,
      kcTownHall: 2,
      nterChng: 2,
      callnyc: 1
    }
  },
  postedUrlInventory: {
    urlBearingRecords: 430,
    uniqueNormalizedExternalUrls: 549
  },
  stakeholderRouting: {
    newYorkCityCouncil: 20,
    rafaelEspinal: 18,
    marketHotel: 9,
    officeOfNightlife: 6,
    antonioReynoso: 5,
    quintonLucas: 1,
    helenRosenthal: 1
  },
  publicControls:
    "docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
  researchReport:
    "docs/knowledge-bank/research/jamie-personal-facebook-posts-2026-07-15.md"
} as const;

const publicFacebookPost = {
  organization: "Jamie Burkart",
  kind: "personal-social-post" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: "2026-07-15" as const,
  preferredPublicUrl: "canonical" as const
};

export const jamiePersonalFacebookPostsBatch = {
  intakeRecords: [
    {
      id: "INTAKE-2026-07-15-JAMIE-FACEBOOK-POST-POPULATION",
      receivedAt: "2026-07-15",
      kind: "artifact",
      project: "personal-public-record",
      publicSummary:
        "A protected cursor traversal dispositioned all 1,243 unique records returned by Facebook's owner-filtered Manage Posts surface, while a July 15 authenticated recheck confirmed the current filter method and six selected public project posts.",
      privacy: "public-safe-summary",
      status: "claim-linked",
      sourceIds: [
        "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
        "SRC-FB-JAMIE-POST-CONTROLS-2026"
      ],
      claimIds: [
        "CLM-FB-JAMIE-POST-POPULATION-2026",
        "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE",
        "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026",
        "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026"
      ],
      researchInquiryIds: [
        "INQ-FB-JAMIE-POST-CORPUS-2026",
        "INQ-FB-JAMIE-POSTED-SOURCES-2026"
      ],
      projectionIntent: "bank-only",
      nextActions: [
        "Reconcile an authorized Meta export against the owner-filtered control if one becomes available.",
        "Continue destination-by-destination review of the 549 normalized external source leads.",
        "Keep audience-unknown rows, raw text, identities, exact dates, comments, media, and record-level metrics outside the public repository."
      ],
      protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001",
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "INTAKE-2026-07-15-JAMIE-FACEBOOK-PUBLIC-PROJECT-POSTS",
      receivedAt: "2026-07-15",
      kind: "source-url",
      project: "personal-public-record",
      publicSummary:
        "Six individually reopened public posts preserve dated project traces for NTER CHNG, WOW List, CouncilStat and CallNYC context, Let NYC Dance, KC Town Hall, and Talks Not Raids; a posted Gothamist article adds independent Cabaret Law campaign context.",
      privacy: "public",
      status: "claim-linked",
      sourceIds: [
        "SRC-FB-JAMIE-NTER-OPENING-2010",
        "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
        "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
        "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
        "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
        "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
        "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31"
      ],
      claimIds: [
        "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-FLOOR-2026",
        "CLM-FB-JAMIE-PROJECT-ACTION-ROUTING",
        "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE",
        "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE"
      ],
      researchInquiryIds: [
        "INQ-FB-JAMIE-POSTED-SOURCES-2026",
        "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"
      ],
      projectionIntent: "bank-only",
      nextActions: [
        "Use the selected posts as contemporaneous first-person traces, not substitutes for independent outcome evidence.",
        "Recover the linked CouncilStat job PDF before interpreting Jamie's exact Council relationship.",
        "Keep current counters as dated mutable observations rather than reach, endorsement, conversion, causality, or impact."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    }
  ],
  sources: [
    {
      id: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
      title: "Authenticated Jamie Burkart personal Facebook owner-post census",
      organization: "Jamie Burkart portfolio research",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-15",
      publicCitation:
        "Public-safe metadata from an authenticated July 2026 review of Jamie Burkart's Facebook owner-post surface.",
      publicNote:
        "The protected cursor crawl returned 1,243 unique owner-filtered records across 621 pages and ended with no next page. A July 15 browser review confirmed that Manage Posts still exposed the Posted by You filter.",
      protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001",
      supportsGenerally: [
        "the 1,243-record owner-filtered population control",
        "621 cursor pages and terminal has-next-page false",
        "the December 2006 through June 2022 returned chronology",
        "aggregate mission, URL, and stakeholder routing research"
      ],
      doesNotEstablish: [
        "a native Meta export, deletion history, or immutable lifetime publication count",
        "public audience status for the 973 rows without exposed audience labels",
        "readership, endorsement, attendance, unique people, causality, or impact",
        "authorship of quoted, shared, linked, photographed, or collaborator-created material"
      ]
    },
    {
      id: "SRC-FB-JAMIE-POST-CONTROLS-2026",
      title: "Jamie personal Facebook post public-safe aggregate controls",
      organization: "Jamie Burkart portfolio research",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://github.com/openhouse/jamieburk.art/blob/2ce9b407cc6c8409befab3cfcb7fcfeb44575a91/docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Public-safe aggregate controls for Jamie Burkart's owner-filtered Facebook post census, July 2026.",
      publicNote:
        "The file preserves population, form, year, mission-routing, URL-routing, stakeholder-routing, and selected-public-source controls without raw post records.",
      supportsGenerally: [
        "aggregate reconciliation of the 1,243-record owner-filtered control",
        "coarse returned chronology and record-form totals",
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
      id: "SRC-FB-JAMIE-NTER-OPENING-2010",
      title: "Jamie Burkart public post about the NTER CHNG opening",
      author: "Jamie Burkart",
      ...publicFacebookPost,
      publishedAt: "2010-01-10",
      canonicalUrl: "https://www.facebook.com/jburkart/posts/226963042167",
      publicCitation:
        "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
      publicNote:
        "The post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as creators of the interactive text-messaging experience and routes to an opening-photo album.",
      supportsGenerally: [
        "a dated first-person public trace of the NTER CHNG opening",
        "the three creator credits",
        "the January 2010 exhibition window"
      ],
      doesNotEstablish: [
        "the division of technical labor",
        "sole authorship by Jamie",
        "rights or consent for republication of the linked album"
      ]
    },
    {
      id: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
      title: "Jamie Burkart public post about WOW List calendars in nine cities",
      author: "Jamie Burkart",
      ...publicFacebookPost,
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
        "a mutable July 15, 2026 display of 28 likes"
      ],
      doesNotEstablish: [
        "independently verified or sustained activity in every city",
        "a lifetime city count, user total, reach metric, or attendance",
        "that Jamie locally organized every calendar"
      ]
    },
    {
      id: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
      title: "Jamie Burkart public post routing to a CouncilStat job posting",
      author: "Jamie Burkart",
      ...publicFacebookPost,
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
        "a mutable July 15, 2026 display of seven likes and no comments"
      ],
      doesNotEstablish: [
        "Jamie's employment, title, contract, formal team membership, or exact Council relationship",
        "that Jamie authored the job posting or held hiring authority",
        "endorsement, reach, conversion, or impact"
      ]
    },
    {
      id: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
      title: "Jamie Burkart public Cabaret Law press-and-action post",
      author: "Jamie Burkart",
      ...publicFacebookPost,
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
        "a mutable July 15, 2026 display of 24 reactions"
      ],
      doesNotEstablish: [
        "sole authorship or ownership of the collective campaign",
        "that the post caused legislative action",
        "unique people, readership, calls placed, conversion, endorsement, or impact"
      ]
    },
    {
      id: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
      title: "Jamie Burkart public KC Town Hall project announcement",
      author: "Jamie Burkart",
      ...publicFacebookPost,
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
        "a mutable July 15, 2026 display of 106 reactions and 14 comments"
      ],
      doesNotEstablish: [
        "sole founding, ownership, or authorship by Jamie",
        "the later Board recommendation, Council appropriation, transition, or project outcome",
        "attendance, unique people, reach, endorsement, causality, or impact"
      ]
    },
    {
      id: "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
      title: "Jamie Burkart public Talks Not Raids action-routing post",
      author: "Jamie Burkart",
      ...publicFacebookPost,
      publishedAt: "2019-02-11",
      canonicalUrl:
        "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
      publicCitation:
        "Jamie Burkart, public Facebook post routing readers to the Talks Not Raids City Hall action, February 11, 2019.",
      publicNote:
        "The post routes readers to a City Hall hearing, an NYC Artist Coalition video, the Talks Not Raids campaign site, and Council action on Introduction 1156.",
      supportsGenerally: [
        "Jamie's public routing among an in-person hearing, coalition media, campaign infrastructure, and legislation"
      ],
      doesNotEstablish: [
        "Jamie's sole authorship of the shared coalition post or video",
        "attendance, bill outcome, sole campaign ownership, legislative causality, or impact"
      ]
    },
    {
      id: "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31",
      title: "Movement For Repealing NYC's Archaic 'No Dancing' Law Gains Momentum",
      organization: "Gothamist",
      author: "Jake Offenhartz",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-31",
      accessedAt: "2026-07-15",
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
        "the destination of Jamie's contemporaneous article-sharing post"
      ],
      doesNotEstablish: [
        "Jamie's individual role in that gathering",
        "a precise attendance count",
        "sole campaign authorship, legislative causality, or the later repeal outcome"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-FB-JAMIE-POST-POPULATION-2026",
      project: "personal-public-record",
      internalClaim:
        "The July 13 authenticated owner-filtered Facebook crawl returned 1,243 unique records across 621 cursor pages from December 19, 2006, through June 12, 2022, and ended with no next page; the filter method remained available on July 15.",
      status: "confirmed-with-boundary",
      projections: [],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["current returned population", "pagination control", "chronology boundaries"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-POST-CONTROLS-2026",
          relationship: "supports-boundary",
          supports: ["public-safe aggregate controls", "completeness and privacy boundaries"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Completeness is limited to records returned by Facebook Manage Posts filtered to Posted by You in the July 13, 2026 crawl.",
        "The control is not a native Meta export, deletion history, or proof that no hidden, removed, migrated, or unavailable post existed.",
        "Audience status was not exposed for 973 records, so the full record-level corpus remains protected."
      ],
      antiClaims: [
        "This is every Facebook post Jamie ever published.",
        "All 1,243 records were public.",
        "The control includes deleted or hidden history."
      ],
      researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE",
      project: "personal-public-record",
      internalClaim:
        "A deterministic full-population research pass routed 181 unique records into overlapping project or practice categories, with recurring traces across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, creative and civic technology, waterways practice, and KC Town Hall.",
      status: "confirmed-with-boundary",
      projections: [],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["181 unique mission-routed records", "coarse overlapping project routes"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-POST-CONTROLS-2026",
          relationship: "supports-boundary",
          supports: ["aggregate project-route counts", "classification boundary"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Categories overlap and are archive-navigation aids, not exclusive semantic judgments.",
        "Posting frequency does not measure effort, importance, professional priority, audience, or impact.",
        "Shared and linked material retains its original authorship."
      ],
      antiClaims: [
        "The corpus proves Jamie's professional priorities by frequency.",
        "Every mission-routed record is an accomplishment claim.",
        "Jamie authored all material appearing in the routed records."
      ],
      researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026",
      project: "personal-public-record",
      internalClaim:
        "The owner-filtered corpus contains 430 URL-bearing records and 549 unique normalized external destinations that form a governed source-discovery and action-routing queue.",
      status: "confirmed-with-boundary",
      projections: [],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["430 URL-bearing records", "549 normalized external destinations"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31",
          relationship: "corroborating",
          supports: ["one recovered and close-read independent destination"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-PITCH-GREAT-ACCOMMODATIONS-2009-09-03",
          relationship: "corroborating",
          supports: ["one recovered independent source that strengthens the water-practice record"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Every destination remains a source lead until recovered, close-read, and decomposed.",
        "Posting a URL does not establish its truth, authorship, availability, readership, endorsement, partnership, conversion, causality, or impact.",
        "Dead, redirected, or unresolved routes require source-specific preservation review."
      ],
      antiClaims: [
        "Every posted URL corroborates a portfolio claim.",
        "Jamie authored or endorsed every linked source.",
        "The link inventory measures readership or impact."
      ],
      researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026",
      project: "personal-public-record",
      internalClaim:
        "Overlapping full-population routing rules found 20 New York City Council, 18 Rafael Espinal, nine Market Hotel, six Office of Nightlife, five Antonio Reynoso, one Quinton Lucas, and one Helen Rosenthal record occurrences.",
      status: "use-with-care",
      projections: [],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["bounded stakeholder string and route occurrences"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-POST-CONTROLS-2026",
          relationship: "supports-boundary",
          supports: ["public-safe aggregate stakeholder-routing counts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Counts are overlapping mentions, tags, quotations, and link matches in Jamie's records.",
        "They are not actions by the named stakeholders and do not establish engagement, endorsement, attendance, partnership, response, or impact.",
        "No corpus-wide responder-identity census was promoted from the personal archive."
      ],
      antiClaims: [
        "Twenty New York City Council stakeholders engaged with Jamie.",
        "Rafael Espinal endorsed 18 posts.",
        "Mentions prove official participation or policy influence."
      ],
      researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-FLOOR-2026",
      project: "personal-public-record",
      internalClaim:
        "Four individually rechecked public project posts retained mutable July 15 display floors: WOW List 28 likes; CouncilStat job route seven likes and no comments; Let NYC Dance 24 reactions; KC Town Hall 106 reactions and 14 comments.",
      status: "use-with-care",
      projections: [],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
          relationship: "direct-support",
          supports: ["28-like current display"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
          relationship: "direct-support",
          supports: ["seven-like and no-comment current display"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
          relationship: "direct-support",
          supports: ["24-reaction current display"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
          relationship: "direct-support",
          supports: ["106-reaction and 14-comment current display"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Current counters are mutable interface observations, not historical analytics.",
        "Do not sum the counters or convert them into unique people, reach, attendance, stakeholder engagement, endorsement, conversion, causality, or impact.",
        "The KC Town Hall project-account response is one direct public response, not a stakeholder-group census."
      ],
      antiClaims: [
        "The selected posts reached 165 people.",
        "The counters prove project impact.",
        "The comments establish institutional endorsement."
      ],
      researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser review"]
    },
    {
      id: "CLM-FB-JAMIE-PROJECT-ACTION-ROUTING",
      project: "personal-public-record",
      internalClaim:
        "Selected public posts show Jamie repeatedly connecting project explanation to practical participation routes: joining a WOW List calendar, contacting Council through Let NYC Dance, joining a KC Town Hall neighborhood process, and attending or amplifying a Talks Not Raids hearing.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "Selected public posts show Jamie connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
          relationship: "direct-support",
          supports: ["community calendar join route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
          relationship: "direct-support",
          supports: ["press-to-Council-action route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
          relationship: "direct-support",
          supports: ["neighborhood-process and project route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
          relationship: "direct-support",
          supports: ["hearing, coalition-media, campaign-site, and bill-action route"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is a selected-post practice claim, not a semantic claim about all 1,243 records.",
        "Routing does not establish clicks, attendance, calls placed, conversion, adoption, endorsement, causality, or impact.",
        "Collective project, campaign, and source authorship remains intact."
      ],
      antiClaims: [
        "Jamie's posts caused participation or legislation.",
        "Jamie solely authored the campaigns and their materials.",
        "The corpus proves audience conversion."
      ],
      researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE",
      project: "callnyc",
      internalClaim:
        "In a public May 2016 post, Jamie invited open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting; the exact institutional relationship behind that wording remains unresolved.",
      status: "confirmed-with-boundary",
      projections: [],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
          relationship: "direct-support",
          supports: ["Jamie's exact attributed invitation", "CouncilStat job route"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Preserve attribution to Jamie's post and infer no employment, title, contract, formal team membership, or hiring authority.",
        "The linked historical job PDF remains unavailable and requires recovery."
      ],
      antiClaims: [
        "Jamie was employed by the CouncilStat team.",
        "Jamie authored or controlled hiring for the job posting."
      ],
      researchInquiryIds: ["INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser review"]
    },
    {
      id: "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE",
      project: "kc-town-hall",
      internalClaim:
        "Jamie's July 2018 public announcement states that he and Julia Fredenburg were starting KC Town Hall and describes their intended permanently affordable neighborhood-resource and cultural-center purpose.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "A contemporaneous public announcement states that Jamie and Julia Fredenburg were starting KC Town Hall as a permanently affordable neighborhood resource and cultural center.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      proofClaimIds: [],
      evidence: [
        {
          sourceId: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
          relationship: "direct-support",
          supports: ["co-initiation statement", "stated public-benefit intention"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Julia Fredenburg and retain the wording as Jamie's contemporaneous first-person statement.",
        "The post does not establish sole founding, ownership, later public funding, project outcome, or causal impact."
      ],
      antiClaims: [
        "Jamie solely founded KC Town Hall.",
        "The announcement proves the project's later outcome or impact."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-FB-JAMIE-POST-CORPUS-2026",
      project: "personal-public-record",
      question:
        "What can the complete returned owner-filtered Facebook population establish without turning private life, mutable counters, or platform associations into public professional claims?",
      methods: [
        "Traversed 621 owner-filtered cursor pages until Facebook reported has-next-page false.",
        "Deduplicated 3,728 returned nodes into 1,243 unique records and verified zero missing dates and zero owner-absent records.",
        "Rechecked the authenticated Manage Posts and Posted by You interface on July 15, 2026.",
        "Ran deterministic overlapping mission and stakeholder routing rules across the protected population, then individually reopened selected public sources before promotion."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "The July 13 owner-filtered surface returned 1,243 unique records across 621 cursor pages and ended with no next page.",
        "The returned chronology runs from December 19, 2006, through June 12, 2022.",
        "A deterministic research pass routed 181 unique records into overlapping mission categories.",
        "Six selected posts were individually rechecked as public and preserve project, action-routing, source, and mutable-response evidence."
      ],
      limitations: [
        "This is complete disposition of the July 13 returned owner-filtered surface, not a native Meta export, deletion history, or immutable lifetime population.",
        "Audience labels were not exposed for 973 records; the raw population remains protected.",
        "Deterministic categories are research-routing aids, not semantic truth, effort, engagement, endorsement, or impact measures.",
        "No complete responder-identity or historical engagement export was recovered."
      ],
      sourceIds: [
        "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
        "SRC-FB-JAMIE-POST-CONTROLS-2026",
        "SRC-FB-JAMIE-NTER-OPENING-2010",
        "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
        "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
        "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
        "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
        "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019"
      ],
      publicSummary:
        "The July 2026 owner-filtered census accounted for all 1,243 records returned across 621 cursor pages; deleted, hidden, audience-unknown, and otherwise unavailable history remains outside the public claim.",
      protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001"
    },
    {
      id: "INQ-FB-JAMIE-POSTED-SOURCES-2026",
      project: "personal-public-record",
      question:
        "Which of the 549 normalized external destinations can be recovered, close-read, decomposed, and promoted as independent or official sources?",
      methods: [
        "Normalized external destinations and separated posted-source leads from claim evidence.",
        "Compared recovered destinations against the existing Knowledge Bank before creating new source records.",
        "Close-read the already-ingested Pitch Great Accommodations follow-up and the newly recovered Gothamist Market Hotel article."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "The corpus contains 430 URL-bearing records and 549 unique normalized external destinations.",
        "The posted NPR Cabaret Law article and Pitch Great Accommodations follow-up already existed as governed Knowledge Bank sources.",
        "The March 2017 Gothamist Market Hotel article is now a governed independent source with campaign-context boundaries.",
        "The remaining destinations stay in the source-review queue."
      ],
      limitations: [
        "A posted URL is not automatic corroboration of its propositions.",
        "Dead links, redirects, changed pages, and snippets require source-specific recovery and review.",
        "Posting does not establish authorship, partnership, endorsement, readership, clicks, conversion, causality, or outcomes."
      ],
      sourceIds: [
        "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
        "SRC-FB-JAMIE-POST-CONTROLS-2026",
        "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31",
        "SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017-09-20",
        "SRC-PITCH-GREAT-ACCOMMODATIONS-2009-09-03"
      ],
      publicSummary:
        "The corpus yielded 549 external source leads; reviewed independent reporting now strengthens Cabaret Law campaign context and the collective raft-completion record while the remaining routes stay queued."
    },
    {
      id: "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026",
      project: "callnyc",
      question:
        "What exact working relationship, if any, underlies Jamie's May 2016 invitation to work with him and a City Council team through a CouncilStat job posting?",
      methods: [
        "Rechecked the post's public audience label, first-person wording, CouncilStat job-card identity, and current counter display.",
        "Separated directly observable language from employment, title, contract, team-membership, and hiring-authority interpretations.",
        "Retained recovery of the original Council job PDF and corroborating records as open work."
      ],
      runAt: "2026-07-15",
      resultStatus: "inconclusive",
      findings: [
        "The public post directly supports Jamie's attributed invitation language and the CouncilStat job-posting route.",
        "The post does not resolve Jamie's title, employment, contract, formal team membership, or hiring authority."
      ],
      limitations: [
        "The linked historical job PDF is currently unavailable.",
        "Social wording can reflect collaboration, referral, adjacent work, or informal identification and cannot safely choose among them without corroboration."
      ],
      sourceIds: ["SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016"],
      publicSummary:
        "Jamie's public post preserves a CouncilStat job route and attributed team language while his exact Council relationship remains unresolved."
    }
  ]
} satisfies JamiePersonalFacebookPostsBatch;
