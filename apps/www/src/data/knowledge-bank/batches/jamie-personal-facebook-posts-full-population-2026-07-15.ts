import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];
const personalProject = "urbanhermit-public-record";

const ids = {
  census: "SRC-FB-JAMIE-OWNER-POST-CENSUS-2026",
  controls: "SRC-FB-JAMIE-POST-CONTROLS-2026",
  nter: "SRC-FB-JAMIE-NTER-OPENING-2010",
  wowList: "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
  councilStat: "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016",
  letNycDance: "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
  kcTownHall: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
  talksNotRaids: "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
  councilLabs: "SRC-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-DATA-2016",
  pitchGulf: "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
  gothamist: "SRC-NAC-GOTHAMIST-CABARET-2017",
  populationClaim: "CLM-FB-JAMIE-POST-POPULATION-2026",
  missionClaim: "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE",
  urlClaim: "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026",
  stakeholderClaim: "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026",
  interactionClaim: "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026",
  actionClaim: "CLM-FB-JAMIE-PROJECT-ACTION-ROUTING",
  councilStatClaim: "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE",
  kcTownHallClaim: "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE",
  corpusInquiry: "INQ-FB-JAMIE-POST-CORPUS-2026",
  sourceInquiry: "INQ-FB-JAMIE-POSTED-SOURCES-2026",
  councilStatInquiry: "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"
} as const;

const holdProjection = (text: string): ClaimRecord["projections"] => [
  {
    key: "archive-note",
    text,
    status: "hold",
    citationRequired: true,
    surfaces: []
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

export const jamiePersonalFacebookPostsFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-FB-JAMIE-POST-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom:
        "Authenticated Facebook Manage Posts review and protected archival captures",
      publicSafeSummary:
        "A full-population disposition of every record returned by Jamie's owner-filtered Facebook Manage Posts surface, with public-safe aggregate controls, six individually rechecked public posts, and a governed source-research queue.",
      projects: [
        personalProject,
        "wowlist",
        "callnyc",
        "nyc-artist-coalition",
        "kc-town-hall",
        "waterway-participation"
      ],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        ids.census,
        ids.controls,
        ids.nter,
        ids.wowList,
        ids.councilStat,
        ids.letNycDance,
        ids.kcTownHall,
        ids.talksNotRaids,
        ids.councilLabs,
        ids.pitchGulf,
        ids.gothamist
      ],
      claimIds: [
        ids.populationClaim,
        ids.missionClaim,
        ids.urlClaim,
        ids.stakeholderClaim,
        ids.interactionClaim,
        ids.actionClaim,
        ids.councilStatClaim,
        ids.kcTownHallClaim,
        "CLM-WATER-GULF-ROUTE"
      ],
      researchTaskIds: [
        "TASK-FB-JAMIE-META-EXPORT-COMPLETENESS",
        "TASK-FB-JAMIE-POSTED-SOURCE-REVIEW",
        "TASK-FB-JAMIE-COUNCILSTAT-ROLE",
        "TASK-FB-JAMIE-STAKEHOLDER-ENGAGEMENT"
      ],
      notes: [
        "One hundred percent means all 1,243 unique records returned across 621 cursor pages after applying Posted by: You, not a native Meta export, deletion history, or immutable lifetime archive.",
        "Audience labels were not exposed for 973 records; the record-level corpus remains protected.",
        "Mission and stakeholder classifications are overlapping research routes, not measures of importance, engagement, endorsement, or impact.",
        "Raw post text, comments, identities, media, authentication state, private paths, and record-level personal data remain outside the public repository."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: ids.census,
      title: "Authenticated Jamie Burkart personal Facebook owner-post census",
      organization: "Jamie Burkart portfolio research",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt:
        "Protected cursor crawl completed July 13, 2026; authenticated filter rechecked July 15, 2026",
      publicCitation:
        "Public-safe metadata from an authenticated July 2026 review of Jamie Burkart's Facebook owner-post surface.",
      publicNote:
        "The protected crawl returned 1,243 unique owner-filtered records across 621 pages and ended with no next page. A July 15 browser replay confirmed the Posted by: You filter and its June 2022 newest boundary.",
      protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001",
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
      ]
    },
    {
      id: ids.controls,
      title: "Jamie personal Facebook post public-safe aggregate controls",
      organization: "Jamie Burkart portfolio knowledge bank",
      author: "Codex authenticated public-safe archival review",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: reviewedAt,
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://github.com/openhouse/jamieburk.art/blob/93ba7875d7bd379a602a7901790d351b95c63216/docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
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
      id: ids.nter,
      title: "Jamie Burkart public post about the NTER CHNG opening",
      ...publicPost,
      publishedAt: "2010-01-10",
      canonicalUrl: "https://www.facebook.com/jburkart/posts/226963042167",
      publicCitation:
        "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
      publicNote:
        "Jamie's post describes NTER CHNG as a trio's art opening, links Megan Mantia's photographs, and associates Garrett Fuselier and Drew Bolton with the opening.",
      supportsGenerally: [
        "a dated public NTER CHNG opening trace",
        "a public trio and collaborator association",
        "Megan Mantia's linked photography credit"
      ],
      doesNotEstablish: [
        "the creators' exact roles or division of technical labor",
        "sole authorship by Jamie",
        "rights to republish linked media"
      ]
    },
    {
      id: ids.wowList,
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
        "a mutable 28-like display snapshot"
      ],
      doesNotEstablish: [
        "sustained activity in every city",
        "a lifetime city or user count",
        "reach or attendance",
        "that Jamie organized every local calendar"
      ]
    },
    {
      id: ids.councilStat,
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
        "Jamie's exact attributed invitation",
        "a CouncilStat job route",
        "a mutable seven-like and zero-comment display snapshot"
      ],
      doesNotEstablish: [
        "Jamie's employment, title, contract, formal team membership, or exact Council relationship",
        "job-post authorship or hiring authority",
        "endorsement, reach, conversion, or impact"
      ]
    },
    {
      id: ids.letNycDance,
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
        "a mutable 24-reaction snapshot"
      ],
      doesNotEstablish: [
        "sole authorship of the collective campaign",
        "legislative causality",
        "unique people, calls placed, conversion, endorsement, or impact"
      ]
    },
    {
      id: ids.kcTownHall,
      title: "Jamie Burkart public KC Town Hall project announcement",
      ...publicPost,
      publishedAt: "2018-07-02",
      canonicalUrl:
        "https://www.facebook.com/jburkart/posts/pfbid023rhzPSnUranjNyMCotufqMNS6uqLJatPp9R4e2m4s1ytZutdVSw2vKzEijbueVigl",
      publicCitation:
        "Jamie Burkart, public Facebook post announcing the KC Town Hall project, July 2, 2018.",
      publicNote:
        "Jamie wrote that he and Julia Fredenburg were starting the project and described its intended public benefit; the post displayed 106 reactions and 14 comments during review.",
      supportsGenerally: [
        "Jamie's co-initiation statement with Julia Fredenburg",
        "the stated public-benefit intention",
        "one direct public KC Town Hall project-account response",
        "a mutable 106-reaction and 14-comment snapshot"
      ],
      doesNotEstablish: [
        "sole founding, ownership, or authorship by Jamie",
        "later Council actions or project outcomes",
        "reach, endorsement, causality, or impact"
      ]
    },
    {
      id: ids.talksNotRaids,
      title: "Jamie Burkart public Talks Not Raids action-routing post",
      ...publicPost,
      publishedAt: "2019-02-11",
      canonicalUrl:
        "https://www.facebook.com/jburkart/posts/pfbid033Wq5p6tEctq8Lc4R5WxYpCyTgUfeEpyTQGa6y7VsTwMjfk81CJb7C7RRoxmAAQWXl",
      publicCitation:
        "Jamie Burkart, public Facebook post routing readers to the Talks Not Raids City Hall action, February 11, 2019.",
      publicNote:
        "The post routes readers to a City Hall hearing, an NYC Artist Coalition video, the campaign site, and Council action on Introduction 1156.",
      supportsGenerally: [
        "Jamie's public routing among a hearing, coalition media, campaign infrastructure, and legislation"
      ],
      doesNotEstablish: [
        "sole authorship of the shared post or video",
        "attendance, bill outcome, sole campaign ownership, legislative causality, or impact"
      ]
    },
    {
      id: ids.councilLabs,
      title: "Constituent Services Data",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-05-27",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://council.nyc.gov/labs/2016/05/27/constituent-services-data/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council, 'Constituent Services Data,' May 27, 2016.",
      publicNote:
        "Official context for CouncilStat, the daily open-data release, and the January 2016 Civic Hall hackathon.",
      supportsGenerally: [
        "CouncilStat's constituent-issue tracking purpose",
        "the public CouncilStat data release",
        "the January 2016 Civic Hall hackathon context"
      ],
      doesNotEstablish: [
        "Jamie's employment, title, contract, or team membership",
        "Jamie's authorship of a job posting",
        "hiring authority or an official CallNYC relationship"
      ]
    },
    {
      id: ids.pitchGulf,
      title: "Former Huck Finn artist now working in a pink, plastic bubble",
      organization: "The Pitch",
      author: "Carolyn Szczepanski",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2009-09-03",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.thepitchkc.com/former-huck-finn-artist-now-working-in-a-pink-plastic-bubble/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Carolyn Szczepanski, 'Former Huck Finn artist now working in a pink, plastic bubble,' The Pitch, September 3, 2009.",
      publicNote:
        "The follow-up independently reports that Jamie and the collaborative raft crew reached the Gulf of Mexico four months after departing Kansas City.",
      supportsGenerally: [
        "Jamie and the raft crew reached the Gulf of Mexico",
        "the journey lasted four months",
        "the expedition departed from Kaw Point",
        "the raft used recycled materials"
      ],
      doesNotEstablish: [
        "that Jamie traveled alone",
        "every participant or stop",
        "a complete route log",
        "authorship of every expedition component"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-FB-JAMIE-CENSUS-POPULATION",
      sourceId: ids.census,
      project: personalProject,
      assertion:
        "The protected owner-filtered crawl traversed 621 cursor pages, deduplicated 3,728 returned nodes into 1,243 records, and stopped when Facebook reported no next page.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.populationClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-CONTROLS-POPULATION",
      sourceId: ids.controls,
      project: personalProject,
      assertion:
        "The public controls reconcile chronology, audience-state, year, and record-form aggregates to the 1,243-record denominator.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.populationClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-CONTROLS-MISSION",
      sourceId: ids.controls,
      project: personalProject,
      assertion:
        "Overlapping deterministic rules routed 181 records into project or practice categories without treating frequency as importance or impact.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.missionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-CONTROLS-URLS",
      sourceId: ids.controls,
      project: personalProject,
      assertion:
        "The corpus contains 430 URL-bearing records and 549 unique normalized destinations that remain source leads pending close reading.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.urlClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-CONTROLS-STAKEHOLDERS",
      sourceId: ids.controls,
      project: personalProject,
      assertion:
        "Stakeholder counts are Jamie's overlapping mentions, tags, quotations, and links, not inbound stakeholder actions.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.stakeholderClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-CONTROLS-INTERACTIONS",
      sourceId: ids.controls,
      project: personalProject,
      assertion:
        "Four selected public posts retain dated mutable counter displays that cannot be converted into reach, stakeholder engagement, or impact.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [ids.interactionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-CONTROLS-ACTION-SAMPLE",
      sourceId: ids.controls,
      project: personalProject,
      assertion:
        "The six-source public review control indexes a bounded sample used to test Jamie's project-to-action routing practice.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.actionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-NTER-OPENING",
      sourceId: ids.nter,
      project: "creative-technology-and-media",
      assertion:
        "Jamie's January 2010 public post preserves a dated NTER CHNG opening trace and public collaborator association.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.missionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-WOWLIST-ACTION",
      sourceId: ids.wowList,
      project: "wowlist",
      assertion:
        "Jamie's October 2015 public post attributes calendars in nine cities to WOW List members and provides a route to join.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.actionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-COUNCILSTAT-JOB-ROUTE",
      sourceId: ids.councilStat,
      project: "callnyc",
      assertion:
        "Jamie's May 2016 public post invites open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.councilStatClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-LETNYCDANCE-ACTION",
      sourceId: ids.letNycDance,
      project: "nyc-artist-coalition",
      assertion:
        "Jamie's September 2017 public post pairs NPR reporting with a Council contact and campaign call-script route.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.actionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-KCTOWNHALL-COINITIATION",
      sourceId: ids.kcTownHall,
      project: "kc-town-hall",
      assertion:
        "Jamie's July 2018 public announcement says that he and Julia Fredenburg were starting KC Town Hall and describes the intended public benefit.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.kcTownHallClaim, ids.actionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-TALKSNOTRAIDS-ACTION",
      sourceId: ids.talksNotRaids,
      project: "nyc-artist-coalition",
      assertion:
        "Jamie's February 2019 public post connects a City Hall hearing, coalition media, the campaign site, and Council action on Introduction 1156.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [ids.actionClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-GOTHAMIST-SOURCE-ROUTE",
      sourceId: ids.gothamist,
      project: "nyc-artist-coalition",
      assertion:
        "Independent Gothamist reporting is one recovered destination in the personal-post source queue and provides public campaign context.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.urlClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-COUNCILLABS-CONTEXT",
      sourceId: ids.councilLabs,
      project: "callnyc",
      assertion:
        "The Council describes CouncilStat's constituent-services purpose, public data release, and January 2016 hackathon context without identifying Jamie's institutional role.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [ids.councilStatClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-FB-JAMIE-PITCH-GULF-ROUTE",
      sourceId: ids.pitchGulf,
      project: "waterway-participation",
      assertion:
        "The Pitch independently reports that Jamie and the collaborative raft crew reached the Gulf of Mexico four months after leaving Kansas City.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WATER-GULF-ROUTE", ids.urlClaim],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [
    {
      id: ids.populationClaim,
      project: personalProject,
      internalClaim:
        "The July 13 owner-filtered Facebook crawl returned 1,243 unique records across 621 cursor pages from December 19, 2006 through June 12, 2022 and ended with no next page; the same owner filter began in June 2022 when replayed on July 15.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [],
      evidence: [
        {
          sourceId: ids.census,
          relationship: "private-support",
          supports: ["returned population", "pagination control", "chronology"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.controls,
          relationship: "direct-support",
          supports: ["public aggregate controls", "privacy and completeness boundaries"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Completeness is limited to records returned by Facebook Manage Posts after applying Posted by: You.",
        "This is not a native Meta export, deletion history, or immutable lifetime archive.",
        "Audience status was not exposed for 973 records, so the record-level corpus remains protected."
      ],
      antiClaims: [
        "every Facebook post Jamie ever published",
        "all 1,243 records were public",
        "deleted or hidden history is complete"
      ],
      researchInquiryIds: [ids.corpusInquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.missionClaim,
      project: personalProject,
      internalClaim:
        "A deterministic full-population research pass routed 181 unique records into overlapping project or practice categories, with recurring traces across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, creative and civic technology, waterways practice, and KC Town Hall.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [],
      evidence: [
        {
          sourceId: ids.controls,
          relationship: "direct-support",
          supports: ["181 mission-routed records", "overlapping project route counts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Categories overlap and are archive-navigation aids.",
        "Posting frequency does not measure effort, importance, professional priority, audience, engagement, or impact.",
        "Shared and linked material retains its original authorship."
      ],
      antiClaims: [
        "the corpus ranks Jamie's professional priorities",
        "every routed record is an accomplishment",
        "Jamie authored all routed material"
      ],
      researchInquiryIds: [ids.corpusInquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.urlClaim,
      project: personalProject,
      internalClaim:
        "The owner-filtered corpus contains 430 URL-bearing records and 549 unique normalized external destinations that form a governed source-discovery queue.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: holdProjection(
        "Jamie's owner-filtered Facebook archive preserves 549 external source leads; each remains queued for recovery and close reading before it can support a public claim."
      ),
      evidence: [
        {
          sourceId: ids.controls,
          relationship: "direct-support",
          supports: ["430 URL-bearing records", "549 normalized destinations"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.pitchGulf,
          relationship: "corroborating",
          supports: ["one recovered and close-read independent destination"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Each destination remains a lead until recovered, close-read, and decomposed.",
        "Posting does not establish truth, authorship, availability, readership, endorsement, partnership, conversion, causality, or impact."
      ],
      antiClaims: [
        "every posted URL corroborates a portfolio claim",
        "Jamie authored or endorsed every linked source",
        "the link inventory measures readership or impact"
      ],
      researchInquiryIds: [ids.sourceInquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.stakeholderClaim,
      project: personalProject,
      internalClaim:
        "Overlapping routing rules found 20 New York City Council, 18 Rafael Espinal, nine Market Hotel, six Office of Nightlife, five Antonio Reynoso, one Quinton Lucas, and one Helen Rosenthal record occurrences.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [],
      evidence: [
        {
          sourceId: ids.controls,
          relationship: "direct-support",
          supports: ["bounded stakeholder string and route occurrences"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Counts are overlapping mentions, tags, quotations, and link matches in Jamie's records.",
        "They are not inbound actions and do not establish engagement, endorsement, attendance, partnership, response, influence, or impact.",
        "No corpus-wide responder-identity census was promoted."
      ],
      antiClaims: [
        "twenty Council accounts engaged with Jamie",
        "Rafael Espinal endorsed 18 posts",
        "mentions prove official participation or policy influence"
      ],
      researchInquiryIds: [ids.corpusInquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.interactionClaim,
      project: personalProject,
      internalClaim:
        "Four individually rechecked public project posts retained mutable July 15 display snapshots: WOW List 28 likes; CouncilStat seven likes and no comments; Let NYC Dance 24 reactions; KC Town Hall 106 reactions and 14 comments.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [],
      evidence: [
        {
          sourceId: ids.controls,
          relationship: "direct-support",
          supports: ["dated selected-post counter controls"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Current counters are mutable interface observations, not historical analytics.",
        "Do not sum or convert them into unique people, reach, stakeholder engagement, endorsement, attendance, conversion, causality, or impact.",
        "One KC Town Hall project-account response remains one response, not a stakeholder-group census."
      ],
      antiClaims: [
        "the selected posts reached 165 people",
        "the counters prove project impact",
        "comments establish institutional endorsement"
      ],
      researchInquiryIds: [ids.corpusInquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.actionClaim,
      project: personalProject,
      internalClaim:
        "Selected public posts show Jamie repeatedly connecting project explanation to practical participation routes: joining a WOW List calendar, contacting Council through Let NYC Dance, joining a KC Town Hall neighborhood process, and attending or amplifying a Talks Not Raids hearing.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: holdProjection(
        "Selected public posts show Jamie connecting project explanation to practical participation routes across WOW List, Let NYC Dance, KC Town Hall, and Talks Not Raids."
      ),
      evidence: [
        {
          sourceId: ids.wowList,
          relationship: "direct-support",
          supports: ["community calendar join route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.letNycDance,
          relationship: "direct-support",
          supports: ["press-to-Council-action route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.kcTownHall,
          relationship: "direct-support",
          supports: ["neighborhood process route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.talksNotRaids,
          relationship: "direct-support",
          supports: ["hearing, coalition media, campaign site, and bill-action route"],
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
        "Jamie's posts caused participation or legislation",
        "Jamie solely authored the campaigns",
        "the corpus proves conversion"
      ],
      researchInquiryIds: [ids.sourceInquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.councilStatClaim,
      project: "callnyc",
      internalClaim:
        "In a public May 2016 post, Jamie invited open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting; the exact institutional relationship behind that wording remains unresolved.",
      status: "use-with-care",
      maturity: "research-needed",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [],
      evidence: [
        {
          sourceId: ids.councilStat,
          relationship: "direct-support",
          supports: ["Jamie's attributed invitation", "CouncilStat job route"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: ids.councilLabs,
          relationship: "context",
          supports: ["CouncilStat purpose and public-data context"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Infer no employment, title, contract, formal team membership, job-post authorship, or hiring authority.",
        "The historical job posting remains to be recovered."
      ],
      antiClaims: [
        "Jamie was employed by the CouncilStat team",
        "Jamie authored or controlled hiring for the job posting"
      ],
      researchInquiryIds: [ids.councilStatInquiry],
      reviewedAt,
      reviewedBy
    },
    {
      id: ids.kcTownHallClaim,
      project: "kc-town-hall",
      internalClaim:
        "Jamie's July 2018 public announcement states that he and Julia Fredenburg were starting KC Town Hall and describes their intended neighborhood-resource and cultural-center purpose.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: holdProjection(
        "A contemporaneous public announcement states that Jamie and Julia Fredenburg were starting KC Town Hall as a neighborhood resource and cultural center."
      ),
      evidence: [
        {
          sourceId: ids.kcTownHall,
          relationship: "direct-support",
          supports: ["co-initiation statement", "stated public-benefit intention"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Julia Fredenburg and retain the statement as Jamie's contemporaneous account.",
        "The post does not establish sole founding, ownership, later public funding, project outcome, or impact."
      ],
      antiClaims: [
        "Jamie solely founded KC Town Hall",
        "the announcement proves the project's later outcome or impact"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-FB-JAMIE-META-EXPORT-COMPLETENESS",
      project: personalProject,
      question:
        "Would an authorized native Meta export materially improve the archival denominator without creating disproportionate privacy risk?",
      priority: "low",
      status: "queued",
      methodsPlanned: [
        "Define the unanswered archival questions before requesting an export",
        "Compare export fields and retention states with the owner-filtered surface",
        "Keep raw records and personal identities in protected storage"
      ],
      successCriteria: [
        "Document whether the export changes the denominator or known missingness",
        "Publish no raw personal record or audience-unknown content",
        "Retain not recovered as distinct from never existed"
      ],
      sourceIds: [ids.census, ids.controls],
      claimIds: [ids.populationClaim],
      publicSummary:
        "The current denominator is complete for the returned owner-filtered surface; a native export is optional protected follow-up, not assumed evidence.",
      reviewedAt
    },
    {
      id: "TASK-FB-JAMIE-POSTED-SOURCE-REVIEW",
      project: personalProject,
      question:
        "Which of the remaining normalized external destinations can mature into independent or official evidence?",
      priority: "medium",
      status: "in-progress",
      methodsPlanned: [
        "Recover each destination or a bounded public archive",
        "Close-read the source and decompose atomic supported propositions",
        "Associate every proposition with boundaries, collective credit, and anti-claims"
      ],
      successCriteria: [
        "Promote only recovered and close-read sources",
        "Keep dead or unavailable routes as source leads rather than evidence",
        "Avoid treating Jamie's act of posting as corroboration"
      ],
      sourceIds: [ids.controls, ids.pitchGulf, ids.gothamist],
      claimIds: [ids.urlClaim],
      publicSummary:
        "The census yielded 549 external source leads; independent and official destinations are being reviewed one by one.",
      reviewedAt
    },
    {
      id: "TASK-FB-JAMIE-COUNCILSTAT-ROLE",
      project: "callnyc",
      question:
        "What exact working relationship, if any, underlies Jamie's May 2016 CouncilStat invitation language?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Recover the historical CouncilStat job posting",
        "Search dated Council, project, and collaborator records",
        "Separate employment, contract, adjacent collaboration, and informal participation"
      ],
      successCriteria: [
        "Corroborate a bounded institutional relationship or retain the question as unresolved",
        "Do not infer title, employment, hiring authority, or job-post authorship from social wording",
        "Preserve CallNYC's independently documented status"
      ],
      sourceIds: [ids.councilStat, ids.councilLabs],
      claimIds: [ids.councilStatClaim],
      publicSummary:
        "The public post preserves attributed CouncilStat team language while Jamie's exact institutional relationship remains unresolved.",
      reviewedAt
    },
    {
      id: "TASK-FB-JAMIE-STAKEHOLDER-ENGAGEMENT",
      project: personalProject,
      question:
        "Can owner-authorized data support a privacy-safe inbound stakeholder-engagement study across selected professional posts?",
      priority: "low",
      status: "queued",
      methodsPlanned: [
        "Define stakeholder groups and the eligible public-post population before counting",
        "Use identity-complete owner-authorized data only if available",
        "Separate reactions, comments, shares, replies, and project-account responses"
      ],
      successCriteria: [
        "Report only against a complete documented denominator",
        "Publish no private identities or comment text",
        "Keep interaction distinct from endorsement, attendance, conversion, causality, and impact"
      ],
      sourceIds: [ids.census, ids.controls],
      claimIds: [ids.stakeholderClaim, ids.interactionClaim],
      publicSummary:
        "Outgoing stakeholder references are documented; population-wide incoming stakeholder engagement remains unmeasured.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: ids.corpusInquiry,
      project: personalProject,
      question:
        "What can the complete returned owner-filtered Facebook population establish without turning private life, mutable counters, or platform associations into public professional claims?",
      methods: [
        "Traversed 621 owner-filtered cursor pages until Facebook reported no next page.",
        "Deduplicated 3,728 returned nodes into 1,243 records and verified zero missing dates and zero owner-absent records.",
        "Replayed the Manage Posts Posted by: You filter on July 15 and confirmed the June 2022 newest boundary.",
        "Ran deterministic overlapping research routing and individually reopened six public project sources before promotion."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All 1,243 records returned by the surface received a disposition.",
        "The returned chronology runs from December 19, 2006 through June 12, 2022.",
        "The research pass routed 181 unique records into overlapping mission categories.",
        "Six posts were individually rechecked as public."
      ],
      limitations: [
        "This is not a native Meta export, deletion history, or immutable lifetime population.",
        "Audience labels were not exposed for 973 records.",
        "Routing categories are research aids, not effort, engagement, endorsement, or impact measures.",
        "No complete responder-identity or historical engagement export was recovered."
      ],
      sourceIds: [ids.census, ids.controls],
      publicSummary:
        "The owner-filtered census accounted for all 1,243 records returned across 621 cursor pages; unavailable and audience-unknown history remains outside the public claim.",
      protectedLocatorId: "FB-JAMIE-OWNER-POST-CENSUS-2026-001"
    },
    {
      id: ids.sourceInquiry,
      project: personalProject,
      question:
        "Which external destinations can be recovered and promoted as independent or official evidence?",
      methods: [
        "Normalized external destinations and separated posted-source leads from claim evidence.",
        "Compared recovered destinations against the existing knowledge bank.",
        "Close-read selected independent and official sources and retained the remaining routes as leads."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The corpus contains 430 URL-bearing records and 549 unique normalized destinations.",
        "Existing governed NPR, Gothamist, and other campaign sources intersect the queue.",
        "A 2009 Pitch follow-up independently confirms that the collaborative raft expedition reached the Gulf of Mexico after four months.",
        "The remaining destinations stay queued."
      ],
      limitations: [
        "A posted URL is not automatic corroboration.",
        "Dead links, redirects, changed pages, and snippets require source-specific review.",
        "Posting does not establish authorship, partnership, endorsement, readership, conversion, causality, or outcomes."
      ],
      sourceIds: [ids.controls, ids.pitchGulf, ids.gothamist],
      publicSummary:
        "The corpus yielded 549 external source leads; reviewed reporting strengthens selected histories while the remaining routes stay queued."
    },
    {
      id: ids.councilStatInquiry,
      project: "callnyc",
      question:
        "What exact working relationship, if any, underlies Jamie's May 2016 CouncilStat invitation language?",
      methods: [
        "Rechecked the public post's attributed wording and linked CouncilStat job-card identity.",
        "Close-read the official CouncilStat data page for institutional context.",
        "Separated observable wording from employment, title, contract, team-membership, and hiring-authority interpretations."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: [
        "The public post directly supports Jamie's attributed invitation language and the CouncilStat job route.",
        "The Council page confirms CouncilStat's public purpose and hackathon context.",
        "Neither source resolves Jamie's exact institutional relationship."
      ],
      limitations: [
        "The linked historical job posting remains unavailable.",
        "Social wording cannot distinguish formal employment from adjacent or informal collaboration without corroboration."
      ],
      sourceIds: [ids.councilStat, ids.councilLabs],
      publicSummary:
        "Jamie's public post preserves a CouncilStat job route and attributed team language while his exact Council relationship remains unresolved."
    }
  ]
};
