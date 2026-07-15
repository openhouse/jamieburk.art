import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const corpusIntakeId = "INT-2026-07-15-FB-JAMIE-POSTS";

const publicPostIntakes = [
  {
    id: "INT-2026-07-15-FB-JAMIE-NTER-OPENING",
    description:
      "Jamie's public January 2010 post documenting the NTER CHNG opening and preserving the three creator credits.",
    url: "https://www.facebook.com/jburkart/posts/226963042167",
    projectIds: ["personal-public-record", "creative-technical-systems"],
    sourceIds: ["SRC-FB-JAMIE-NTER-OPENING-2010"],
    claimIds: ["CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION"]
  },
  {
    id: "INT-2026-07-15-FB-JAMIE-WOWLIST-NINE-CITIES",
    description:
      "Jamie's public October 2015 post announcing WOW List community calendars in nine cities and routing readers to join.",
    url: "https://www.facebook.com/jburkart/posts/pfbid02hjaUtK2swFUy1XeNkQjqUnZj4M6ecbYpPjGa365MFo2oWR57HwEqNdrhSDQjJjBMl",
    projectIds: ["personal-public-record", "wowlist"],
    sourceIds: ["SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015"],
    claimIds: ["CLM-FB-WOWLIST-COMMUNITY-ROUTING"]
  },
  {
    id: "INT-2026-07-15-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB",
    description:
      "Jamie's public May 2016 post routing readers to a New York City Council CouncilStat job posting; retained with an open role-interpretation question.",
    url: "https://www.facebook.com/jburkart/posts/pfbid023maJq9xB4QQYyFzJswPL5tbT2ToUbJxJ5MRnV9L51y94fPDVZVuHcVGsuBpmEnTSl",
    projectIds: ["personal-public-record", "callnyc"],
    sourceIds: ["SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016"],
    claimIds: ["CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE"]
  },
  {
    id: "INT-2026-07-15-FB-JAMIE-LETNYCDANCE-NPR",
    description:
      "Jamie's public September 2017 post pairing his NPR quotation about the Cabaret Law with a Council call to action.",
    url: "https://www.facebook.com/jburkart/posts/pfbid021AY6ydWmHSAXQooc1KgivMWjY3jcuWSj958Z73MQ6fJick7jNaHHDwfKgZuo7cbal",
    projectIds: ["personal-public-record", "nyc-artist-coalition"],
    sourceIds: ["SRC-FB-JAMIE-LETNYCDANCE-NPR-2017"],
    claimIds: ["CLM-FB-JAMIE-CAMPAIGN-ACTION-ROUTING"]
  },
  {
    id: "INT-2026-07-15-FB-JAMIE-KCTOWNHALL-START",
    description:
      "Jamie's public July 2018 announcement that he and Julia Fredenburg were starting the KC Town Hall project.",
    url: "https://www.facebook.com/jburkart/posts/pfbid023rhzPSnUranjNyMCotufqMNS6uqLJatPp9R4e2m4s1ytZutdVSw2vKzEijbueVigl",
    projectIds: ["personal-public-record", "kc-town-hall"],
    sourceIds: ["SRC-FB-JAMIE-KCTOWNHALL-START-2018"],
    claimIds: ["CLM-KC-TOWN-HALL-PLANNING-AND-DOCUMENTATION-ROLE"]
  },
  {
    id: "INT-2026-07-15-FB-JAMIE-TALKSNOTRAIDS-ACTION",
    description:
      "Jamie's public February 2019 post routing readers to a City Hall hearing, NYC Artist Coalition video, campaign site, and Council bill action.",
    url: "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
    projectIds: ["personal-public-record", "nyc-artist-coalition"],
    sourceIds: ["SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019"],
    claimIds: ["CLM-FB-JAMIE-CAMPAIGN-ACTION-ROUTING"]
  },
  {
    id: "INT-2026-07-15-PITCH-GREAT-ACCOMMODATIONS-FOLLOWUP",
    description:
      "The Pitch's 2009 report connecting the completed four-month raft journey to Great Accommodations and Jamie's continuing Missouri River practice.",
    url: "https://www.thepitchkc.com/former-huck-finn-artist-now-working-in-a-pink-plastic-bubble/",
    projectIds: ["water-publics"],
    sourceIds: ["SRC-PITCH-GREAT-ACCOMMODATIONS-FOLLOWUP-2009"],
    claimIds: ["CLM-WATER-RAFT-GULF-COMPLETION"]
  }
];

export const personalFacebookPostIntakes = [
  {
    id: corpusIntakeId,
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription:
      "A record-level census and research classification of all 1,243 owner-filtered records currently returned by Jamie Burkart's Facebook Manage Posts surface, retained outside the public repository.",
    projectIds: ["personal-public-record"],
    entityIds: [],
    dateHints: ["2006-12-19 through 2022-06-12"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      "SRC-FB-JAMIE-POST-CORPUS-2026",
      "SRC-FB-JAMIE-POSTED-URL-INVENTORY-2026"
    ],
    claimIds: [
      "CLM-FB-JAMIE-POST-POPULATION-2026",
      "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE",
      "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026",
      "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026",
      "CLM-FB-JAMIE-ENGAGEMENT-SAMPLES-2026"
    ],
    inquiryIds: [
      "INQ-FB-JAMIE-POST-CORPUS-2026",
      "INQ-FB-JAMIE-POSTED-SOURCES-2026"
    ],
    protectedLocatorId: "FB-JAMIE-POST-CORPUS-2026-001"
  },
  ...publicPostIntakes.map((item) => ({
    id: item.id,
    kind: "url" as const,
    capturedAt: "2026-07-15",
    submittedBy: "Codex source discovery and authenticated close reading",
    publicSafeDescription: item.description,
    submittedUrl: item.url,
    projectIds: item.projectIds,
    entityIds: [],
    dateHints: [],
    sensitivity: "public-safe" as const,
    availability: "live" as const,
    status: "promoted" as const,
    sourceIds: item.sourceIds,
    claimIds: item.claimIds,
    inquiryIds:
      item.id === "INT-2026-07-15-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB"
        ? ["INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"]
        : []
  }))
] satisfies IntakeItem[];

const reviewedFacebookPost = {
  kind: "institutional-social-post" as const,
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: "2026-07-15",
  preferredPublicUrl: "canonical" as const,
  reviewStatus: "reviewed" as const,
  reviewDepth: "close-reading" as const,
  reviewedAt: "2026-07-15",
  reviewedBy: ["Codex authenticated archival review"]
};

export const personalFacebookPostSources = [
  {
    id: "SRC-FB-JAMIE-POST-CORPUS-2026",
    title: "Authenticated Jamie Burkart personal Facebook owner-post census",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Authenticated archival review of Jamie Burkart's current Facebook Manage Posts owner-filtered surface, July 2026.",
    publicNote:
      "Cursor pagination returned 1,243 unique owner-filtered records across 621 pages, ending with no next page; the current observable chronology runs from December 19, 2006, through June 12, 2022.",
    locator:
      "Manage Posts filtered to Posted by You; 621 cursor pages; 3,728 returned nodes; 1,243 unique records; terminal has-next-page false; zero missing dates and zero owner-absent records; authenticated UI boundary recheck on July 15, 2026.",
    projectIds: ["personal-public-record"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "1,243-record current owner-filtered population",
      "621-page terminal cursor traversal",
      "December 2006 through June 2022 current chronology",
      "deterministic cross-project research classification"
    ],
    doesNotEstablish: [
      "a native Meta export, deletion history, or immutable lifetime publication count",
      "that audience visibility was public when the current control did not expose it",
      "readership, endorsement, attendance, unique people, causality, or impact",
      "authorship of quoted, shared, linked, photographed, or collaborator-created material"
    ],
    protectedLocatorId: "FB-JAMIE-POST-CORPUS-2026-001"
  },
  {
    id: "SRC-FB-JAMIE-POSTED-URL-INVENTORY-2026",
    title: "Jamie Burkart personal Facebook posted-URL inventory",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation:
      "Public-safe URL inventory from Jamie Burkart's current Facebook owner-post census, July 2026.",
    publicNote:
      "The corpus contained 430 URL-bearing records and 549 unique normalized external URLs; each route remains a source lead until its destination is independently reviewed.",
    locator:
      "Normalized external hrefs and expanded Facebook redirect destinations with tracking parameters removed and duplicates collapsed.",
    projectIds: ["personal-public-record"],
    intakeIds: [corpusIntakeId],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: [
      "430 URL-bearing records",
      "549 unique normalized external URLs",
      "posted-source and action-routing research leads"
    ],
    doesNotEstablish: [
      "truth, authorship, availability, or completeness of linked content",
      "readership, clicks, partnership, endorsement, conversion, causality, or outcomes"
    ],
    protectedLocatorId: "FB-JAMIE-POSTED-URL-INVENTORY-2026-001"
  },
  {
    id: "SRC-FB-JAMIE-NTER-OPENING-2010",
    title: "Jamie Burkart public post about the NTER CHNG opening",
    author: "Jamie Burkart",
    ...reviewedFacebookPost,
    publishedAt: "2010-01-10",
    canonicalUrl: "https://www.facebook.com/jburkart/posts/226963042167",
    publicCitation:
      "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
    publicNote:
      "The post documents the January opening, names Drew Bolton, Jamie Burkart, and Garrett Fuselier as the interactive text-messaging work's creators, and links a public opening album.",
    locator: "Public post text, audience label, and linked opening album.",
    projectIds: ["personal-public-record", "creative-technical-systems"],
    intakeIds: ["INT-2026-07-15-FB-JAMIE-NTER-OPENING"],
    supportsGenerally: [
      "a dated first-party public trace of the NTER CHNG opening",
      "the three creator credits",
      "a linked opening-photo record"
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
    ...reviewedFacebookPost,
    publishedAt: "2015-10-05",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid02hjaUtK2swFUy1XeNkQjqUnZj4M6ecbYpPjGa365MFo2oWR57HwEqNdrhSDQjJjBMl",
    publicCitation:
      "Jamie Burkart, public Facebook post about WOW List community calendars in nine cities, October 5, 2015.",
    publicNote:
      "The post attributes the launch to WOW List members in nine cities, routes readers to join, and currently displays 28 likes and eight comments; the comments enumerate nine city routes.",
    locator:
      "Public post text, audience label, current counters, join link, and city-tag comments.",
    projectIds: ["personal-public-record", "wowlist"],
    intakeIds: ["INT-2026-07-15-FB-JAMIE-WOWLIST-NINE-CITIES"],
    supportsGenerally: [
      "Jamie's attributed nine-city calendar statement",
      "a join route",
      "nine city labels in the comment thread",
      "a mutable July 15, 2026 display of 28 likes and eight comments"
    ],
    doesNotEstablish: [
      "independently verified or sustained activity in every city",
      "a lifetime city count, user total, reach metric, or attendance",
      "that Jamie authored every comment or locally organized every calendar"
    ]
  },
  {
    id: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
    title: "Jamie Burkart public post routing to a CouncilStat job posting",
    author: "Jamie Burkart",
    ...reviewedFacebookPost,
    publishedAt: "2016-05-18",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023maJq9xB4QQYyFzJswPL5tbT2ToUbJxJ5MRnV9L51y94fPDVZVuHcVGsuBpmEnTSl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to a New York City Council CouncilStat job posting, May 18, 2016.",
    publicNote:
      "Jamie invited open-data practitioners to work with him and a City Council team while linking a CouncilStat job posting; the post currently displays seven likes and no comments.",
    locator: "Public post text, audience label, linked Council job card, and current counters.",
    projectIds: ["personal-public-record", "callnyc"],
    intakeIds: ["INT-2026-07-15-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB"],
    supportsGenerally: [
      "Jamie's exact first-person public wording",
      "a CouncilStat job-posting route",
      "a mutable July 15, 2026 display of seven likes and no comments"
    ],
    doesNotEstablish: [
      "Jamie's employment, title, contract, formal team membership, or exact Council relationship",
      "that Jamie authored the job posting",
      "endorsement, hiring authority, reach, or impact"
    ]
  },
  {
    id: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
    title: "Jamie Burkart public Cabaret Law press-and-action post",
    author: "Jamie Burkart",
    ...reviewedFacebookPost,
    publishedAt: "2017-09-20",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid021AY6ydWmHSAXQooc1KgivMWjY3jcuWSj958Z73MQ6fJick7jNaHHDwfKgZuo7cbal",
    publicCitation:
      "Jamie Burkart, public Facebook post pairing NPR Cabaret Law coverage with a Let NYC Dance action route, September 20, 2017.",
    publicNote:
      "The post pairs Jamie's NPR quotation with a call to contact Council members and a Let NYC Dance call-script route; it currently displays 24 reactions.",
    locator: "Public post text, audience label, embedded NPR article, campaign route, and current reaction display.",
    projectIds: ["personal-public-record", "nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-FB-JAMIE-LETNYCDANCE-NPR"],
    supportsGenerally: [
      "Jamie's public pairing of press coverage and legislative action",
      "a Let NYC Dance call-script route",
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
    ...reviewedFacebookPost,
    publishedAt: "2018-07-02",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid023rhzPSnUranjNyMCotufqMNS6uqLJatPp9R4e2m4s1ytZutdVSw2vKzEijbueVigl",
    publicCitation:
      "Jamie Burkart, public Facebook post announcing the KC Town Hall project, July 2, 2018.",
    publicNote:
      "Jamie wrote that he and Julia Fredenburg were starting the project and described its intended permanently affordable neighborhood-resource and cultural-center purpose; the current post displays 106 reactions, 14 comments, and three shares.",
    locator:
      "Public post text, audience label, current aggregate counters, and visible KC Town Hall project-account response.",
    projectIds: ["personal-public-record", "kc-town-hall"],
    intakeIds: ["INT-2026-07-15-FB-JAMIE-KCTOWNHALL-START"],
    supportsGenerally: [
      "Jamie's attributed co-initiation statement",
      "the stated public-benefit intention",
      "one direct public project-account response",
      "a mutable July 15, 2026 display of 106 reactions, 14 comments, and three shares"
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
    ...reviewedFacebookPost,
    publishedAt: "2019-02-11",
    canonicalUrl:
      "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to the Talks Not Raids City Hall action, February 11, 2019.",
    publicNote:
      "The post routes readers to a City Hall hearing, an NYC Artist Coalition video, the Talks Not Raids campaign site, and Council action on Intro 1156.",
    locator: "Public post text, audience label, embedded coalition post, event route, video route, and campaign route.",
    projectIds: ["personal-public-record", "nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-FB-JAMIE-TALKSNOTRAIDS-ACTION"],
    supportsGenerally: [
      "Jamie's public routing among an in-person hearing, coalition media, campaign infrastructure, and legislation"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the shared coalition post or video",
      "attendance, bill outcome, sole campaign ownership, legislative causality, or impact"
    ]
  },
  {
    id: "SRC-PITCH-GREAT-ACCOMMODATIONS-FOLLOWUP-2009",
    title: "Former Huck Finn artist now working in a pink, plastic bubble",
    organization: "The Pitch",
    author: "Carolyn Szczepanski",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2009-09-03",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.thepitchkc.com/former-huck-finn-artist-now-working-in-a-pink-plastic-bubble/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Carolyn Szczepanski, 'Former Huck Finn artist now working in a pink, plastic bubble,' The Pitch, September 3, 2009.",
    publicNote:
      "The retrospective report says Jamie and his fellow artists reached the Gulf of Mexico four months after leaving Kansas City and connects that journey to Great Accommodations and his continuing Missouri River practice.",
    locator:
      "Opening paragraphs on the raft's intended route, Gulf completion, four-month duration, and relationship to Great Accommodations.",
    projectIds: ["water-publics"],
    intakeIds: ["INT-2026-07-15-PITCH-GREAT-ACCOMMODATIONS-FOLLOWUP"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "collective arrival at the Gulf of Mexico",
      "four-month duration after departure from Kansas City",
      "the relationship between the raft journey and Great Accommodations"
    ],
    doesNotEstablish: [
      "a complete participant roster or division of labor",
      "solo completion by Jamie",
      "a continuous uninterrupted voyage or every route detail"
    ]
  }
] satisfies SourceRecord[];

const internalOnly = {
  publicationStatus: "internal-only" as const,
  editorialStatus: "candidate" as const,
  projections: []
};

export const personalFacebookPostClaims = [
  {
    id: "CLM-FB-JAMIE-POST-POPULATION-2026",
    project: "personal-public-record",
    claimType: "metric",
    internalClaim:
      "The July 2026 authenticated owner-filtered Facebook census returned 1,243 unique records across 621 cursor pages from December 19, 2006, through June 12, 2022, and ended with no next page.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-JAMIE-POST-CORPUS-2026",
      relationship: "private-support",
      supports: ["current population", "pagination control", "chronology boundaries"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Completeness is limited to Facebook Manage Posts filtered to Posted by You as currently observable in July 2026.",
      "The corpus is not a native Meta export, deletion history, or immutable lifetime publication total.",
      "Audience labels were not exposed for most records, so the raw corpus remains private and only individually rechecked public posts may become public sources."
    ],
    antiClaims: [
      "Jamie published exactly 1,243 Facebook posts in his lifetime.",
      "Every retained record is public.",
      "No historical personal post is missing."
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE",
    project: "personal-public-record",
    claimType: "activity",
    internalClaim:
      "A deterministic research pass routed 181 records into overlapping mission categories and documents repeated movement among projects, gatherings, hearings, campaign actions, public forms, source articles, and shared cultural work.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-JAMIE-POST-CORPUS-2026",
      relationship: "private-support",
      supports: ["181-record research routing set", "cross-project action and source patterns"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The project categories overlap and are deterministic research routes, not exclusive semantic judgments, effort measures, impact scores, or public metrics.",
      "Posts document invitation, routing, and public identity practice; they do not establish that readers acted, attended, endorsed, or produced an outcome.",
      "Shared and linked material retains its original authorship and collective credit."
    ],
    antiClaims: [
      "Jamie completed 181 separate professional projects through Facebook.",
      "The classified records prove mission impact or audience conversion.",
      "Jamie authored every linked, shared, quoted, or photographed contribution."
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival analysis"]
  },
  {
    id: "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026",
    project: "personal-public-record",
    claimType: "metric",
    internalClaim:
      "The owner-filtered corpus contains 430 URL-bearing records and 549 unique normalized external URLs retained as source-discovery and action-routing leads.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-JAMIE-POSTED-URL-INVENTORY-2026",
      relationship: "private-support",
      supports: ["430 URL-bearing records", "549 unique normalized external URLs"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "A posted URL is a source lead until its destination is independently recovered, close-read, and decomposed.",
      "Posting a link does not establish its truth, authorship, partnership, endorsement, readership, clicks, conversion, causality, or outcome."
    ],
    antiClaims: [
      "All 549 linked sources are accurate and available.",
      "Every linked organization partnered with or endorsed Jamie."
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival analysis"]
  },
  {
    id: "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026",
    project: "personal-public-record",
    claimType: "metric",
    internalClaim:
      "Within the 181-record mission-routing set, deterministic mention and link rules counted New York City Council in 20 records, Rafael Espinal in 18, Market Hotel in nine, the Office of Nightlife in six, and Antonio Reynoso in five.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-JAMIE-POST-CORPUS-2026",
      relationship: "private-support",
      supports: ["bounded deterministic mention and link counts"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "These are overlapping text and route matches in Jamie's posts, not actions by the named stakeholders.",
      "A mention, tag, quotation, event listing, link, or call to action is not engagement, attendance, endorsement, partnership, or impact."
    ],
    antiClaims: [
      "Twenty New York City Council members engaged with Jamie's Facebook account.",
      "The named officials and institutions endorsed Jamie or every referenced campaign."
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival analysis"]
  },
  {
    id: "CLM-FB-JAMIE-ENGAGEMENT-SAMPLES-2026",
    project: "personal-public-record",
    claimType: "metric",
    internalClaim:
      "On July 15, 2026, selected public posts displayed 106 reactions, 14 comments, and three shares for the KC Town Hall announcement; 28 likes and eight comments for the WOW List nine-city post; 24 reactions for the Let NYC Dance press-and-action post; and seven likes for the CouncilStat job-route post.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
        relationship: "direct-support",
        supports: ["current KC Town Hall post counters"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
        relationship: "direct-support",
        supports: ["current WOW List nine-city post counters"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
        relationship: "direct-support",
        supports: ["current Let NYC Dance post reaction count"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
        relationship: "direct-support",
        supports: ["current CouncilStat job-route post like count"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The counters are mutable current interface observations, not publication-time analytics.",
      "Do not sum the samples into reach, unique people, stakeholder engagement, endorsement, attendance, conversion, causality, or impact.",
      "Responder identities remain outside the public aggregate claim unless separately necessary and reviewed."
    ],
    antiClaims: [
      "Jamie's selected Facebook posts reached 165 people.",
      "The reaction and comment counts prove stakeholder endorsement or project impact."
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-CORPUS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-JAMIE-CAMPAIGN-ACTION-ROUTING",
    project: "personal-public-record",
    claimType: "activity",
    internalClaim:
      "Selected public posts show Jamie using his personal account to pair Cabaret Law press with a Council call to action and to route readers among a Talks Not Raids hearing, coalition media, campaign infrastructure, and legislation.",
    status: "confirmed-with-boundary",
    ...internalOnly,
    evidence: [
      {
        sourceId: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
        relationship: "direct-support",
        supports: ["press-to-action routing"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
        relationship: "direct-support",
        supports: ["hearing, coalition-media, campaign, and legislative routing"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The posts support Jamie's personal routing practice, not sole ownership or authorship of the collective campaigns and shared coalition material.",
      "Action routes do not prove attendance, calls placed, legislative causality, conversion, or impact."
    ],
    antiClaims: [
      "Jamie single-handedly organized Let NYC Dance or Talks Not Raids.",
      "Jamie's Facebook posts caused Cabaret Law repeal or passage of Intro 1156."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE",
    project: "personal-public-record",
    claimType: "attributed-description",
    internalClaim:
      "In a May 2016 public post linking a CouncilStat job notice, Jamie invited open-data practitioners to work with him and a City Council team.",
    status: "use-with-care",
    ...internalOnly,
    evidence: [{
      sourceId: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
      relationship: "direct-support",
      supports: ["Jamie's exact first-person public wording", "linked CouncilStat job card"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Preserve attribution to Jamie's post and do not infer employment, title, contract, hiring authority, formal team membership, or the exact relationship without corroborating records.",
      "The original job PDF is currently unavailable and remains a source-recovery lead."
    ],
    antiClaims: [
      "Jamie was employed by the New York City Council CouncilStat team.",
      "Jamie authored or had hiring authority for the CouncilStat job posting."
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-WATER-RAFT-GULF-COMPLETION",
    project: "water-publics",
    claimType: "outcome",
    internalClaim:
      "The Pitch reported in September 2009 that Jamie and his fellow artists reached the Gulf of Mexico four months after departing Kansas City on their bicycle-propelled recycled-material raft.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "The Pitch reported that Jamie and his fellow artists reached the Gulf of Mexico four months after leaving Kansas City on their bicycle-propelled recycled-material raft.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-PITCH-GREAT-ACCOMMODATIONS-FOLLOWUP-2009",
      relationship: "direct-support",
      supports: ["collective Gulf completion", "four-month duration", "Kansas City departure context"],
      locator: "Opening paragraphs reporting the intended route, completion, and duration.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Credit the journey collectively and do not imply that Jamie traveled alone.",
      "The retrospective article does not provide a complete participant roster, division of labor, or uninterrupted route log."
    ],
    antiClaims: [
      "Jamie alone completed the raft journey.",
      "The supplied article documents every stage and participant in the voyage."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex close reading"]
  }
] satisfies ClaimRecord[];

export const personalFacebookPostResearchInquiries = [
  {
    id: "INQ-FB-JAMIE-POST-CORPUS-2026",
    project: "personal-public-record",
    intakeIds: [corpusIntakeId],
    question:
      "What is the complete current owner-filtered Facebook Manage Posts population, and what can its chronology, mission routes, stakeholder mentions, and selected current engagement displays safely establish?",
    methods: [
      "Traversed the authenticated Manage Posts connection with Posted by You owner filtering through 621 cursor pages until has-next-page was false.",
      "Deduplicated 3,728 returned nodes into 1,243 unique records and verified zero missing dates and zero owner-absent records.",
      "Reconciled the oldest and newest owner-filtered records against the authenticated user interface on July 15, 2026.",
      "Ran deterministic overlapping project and stakeholder mention rules across every retained record, then manually reviewed selected mission records and rechecked individual public audience labels before promotion."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The current owner-filtered surface returned 1,243 unique records across 621 pages and ended with no next page.",
      "The currently observable chronology runs from December 19, 2006, through June 12, 2022.",
      "A deterministic research pass routed 181 records into overlapping mission categories.",
      "Selected individually rechecked public posts preserve project role, action-routing, source, and mutable response evidence."
    ],
    limitations: [
      "This is 100 percent coverage of the current July 2026 owner-filtered Manage Posts surface, not a native Meta export, deletion history, or immutable lifetime population.",
      "Audience labels were not exposed for most crawl records; the raw population remains private, and only individually rechecked public posts are promoted as public sources.",
      "Deterministic project and stakeholder categories overlap and are research-routing aids, not semantic truth, effort, engagement, endorsement, or impact measures.",
      "The corpus does not expose reliable record-level engagement counters; selected counters were re-observed in the current public interface and remain mutable."
    ],
    sourceIds: [
      "SRC-FB-JAMIE-POST-CORPUS-2026",
      "SRC-FB-JAMIE-POSTED-URL-INVENTORY-2026",
      "SRC-FB-JAMIE-NTER-OPENING-2010",
      "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
      "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
      "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
      "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
      "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019"
    ],
    publicSummary:
      "The July 2026 owner-filtered Facebook census accounted for all 1,243 records currently returned across 621 cursor pages; deleted, hidden, audience-unknown, and otherwise unavailable history remains outside the public claim.",
    protectedLocatorId: "FB-JAMIE-POST-CORPUS-2026-001"
  },
  {
    id: "INQ-FB-JAMIE-POSTED-SOURCES-2026",
    project: "personal-public-record",
    intakeIds: [corpusIntakeId, "INT-2026-07-15-PITCH-GREAT-ACCOMMODATIONS-FOLLOWUP"],
    question:
      "Which mission-relevant destinations posted through Jamie's personal account can be recovered, close-read, decomposed, and promoted as independent sources?",
    methods: [
      "Normalized Facebook redirect destinations and removed tracking parameters before deduplication.",
      "Separated posted-source leads from claims and required independent destination review before promotion.",
      "Close-read The Pitch's 2009 Great Accommodations follow-up and promoted its independent Gulf-completion reporting."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The corpus contains 430 URL-bearing records and 549 unique normalized external URLs.",
      "The Pitch's September 2009 follow-up independently reports collective Gulf completion and a four-month duration for the raft journey.",
      "Other routes remain research leads until availability, authorship, and exact support are reviewed."
    ],
    limitations: [
      "A posted URL is not automatic corroboration of its propositions.",
      "Dead links, redirects, changed pages, and current search snippets require source-specific recovery and review.",
      "Posting does not establish authorship, partnership, endorsement, readership, clicks, conversion, causality, or outcomes."
    ],
    sourceIds: [
      "SRC-FB-JAMIE-POSTED-URL-INVENTORY-2026",
      "SRC-PITCH-GREAT-ACCOMMODATIONS-FOLLOWUP-2009"
    ],
    publicSummary:
      "The current corpus yielded 549 unique external source leads; one newly close-read independent article now strengthens the public-safe raft-completion record, while the remaining routes stay in the research queue.",
    protectedLocatorId: "FB-JAMIE-POSTED-URL-INVENTORY-2026-001"
  },
  {
    id: "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026",
    project: "personal-public-record",
    intakeIds: ["INT-2026-07-15-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB"],
    question:
      "What exact working relationship, if any, underlies Jamie's May 2016 invitation to work with him and a City Council team through a linked CouncilStat job posting?",
    methods: [
      "Rechecked the post's public audience label, exact first-person wording, linked job-card identity, and current counters in the authenticated interface.",
      "Separated the post's directly observable wording from employment, title, contract, team-membership, and hiring-authority interpretations.",
      "Retained recovery of the original Council job PDF and corroborating records as open work."
    ],
    runAt: "2026-07-15",
    resultStatus: "inconclusive",
    findings: [
      "The public post directly supports Jamie's attributed invitation language and the CouncilStat job-posting route.",
      "The post does not by itself resolve Jamie's title, employment, contract, formal team membership, or hiring authority."
    ],
    limitations: [
      "The linked historical job PDF is currently unavailable.",
      "Social wording can reflect collaboration, referral, adjacent work, or informal team identification and cannot safely choose among them without corroboration."
    ],
    sourceIds: ["SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016"],
    publicSummary:
      "Jamie's public post preserves a CouncilStat job-route and attributed team language, while his exact Council relationship remains unresolved pending corroborating records."
  }
] satisfies ResearchInquiry[];
