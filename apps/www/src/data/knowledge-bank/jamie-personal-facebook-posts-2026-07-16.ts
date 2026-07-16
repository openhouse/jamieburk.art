import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = ["Jamie Burkart", "Codex authenticated archival review"];
const project = "personal-public-record";

const populationSourceId = "SRC-FB-JAMIE-OWNER-POST-POPULATION-2026";
const controlsSourceId = "SRC-FB-JAMIE-OWNER-POST-CONTROLS-2026";

const heldProjection = (text: string) => [{
  key: "archive-note" as const,
  text,
  status: "hold" as const,
  citationRequired: false,
  surfaces: []
}];

const personalPost = {
  organization: "Jamie Burkart",
  author: "Jamie Burkart",
  kind: "firsthand-statement" as const,
  visibility: "public-metadata-only" as const,
  preservationStatus: "private" as const,
  accessedAt: reviewedAt
};

export const jamiePersonalFacebookPostSourceRecords20260716 = [
  {
    id: populationSourceId,
    title: "Authenticated Jamie Burkart personal Facebook owner-post population",
    organization: "Jamie Burkart portfolio research",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    accessedAt: reviewedAt,
    publicCitation:
      "Public-safe metadata from a July 2026 authenticated review of Jamie Burkart's Facebook owner-post surface.",
    publicNote:
      "The protected cursor traversal returned 1,243 unique owner-filtered records across 621 pages and ended with no next page. A July 16 Activity Log review independently confirmed the owner-post category and the same June 2022 top edge.",
    captureFingerprint:
      "sha256:ee5a65f5872cd47d1ca8289ef0ec6757314ac4b065fa8ed9f87fb624544e97f7",
    protectedLocatorId: "LOC-FB-JAMIE-OWNER-POST-POPULATION-2026",
    supportsGenerally: [
      "the returned 1,243-record owner-filtered population",
      "621 cursor pages and terminal has-next-page false",
      "the December 2006 through June 2022 returned chronology",
      "full-population aggregate classification and source routing"
    ],
    doesNotEstablish: [
      "a native Meta export, deletion history, or immutable lifetime publication count",
      "public audience status for records whose audience label was not exposed",
      "readership, endorsement, attendance, conversion, causality, or impact",
      "authorship of shared, linked, quoted, photographed, or collaborator-created material"
    ]
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
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe aggregate controls for Jamie Burkart's owner-filtered Facebook post population, July 2026.",
    publicNote:
      "The file preserves population, year, form, broad-theme, mission-route, URL-route, stakeholder-reference, and selected-public-source controls without raw posts, native IDs, responder identities, or authenticated routes.",
    supportsGenerally: [
      "aggregate reconciliation of the 1,243 returned records",
      "the fresh 1,243-record classification rerun",
      "bounded source and stakeholder research routes",
      "six individually public-audience-verified project-post sources"
    ],
    doesNotEstablish: [
      "a lifetime account archive or universal public audience",
      "record-level contents, identities, or interactions",
      "stakeholder engagement, endorsement, reach, attendance, conversion, causality, or impact"
    ]
  },
  {
    id: "SRC-FB-JAMIE-NTER-OPENING-2010",
    title: "Jamie Burkart public post about the NTER CHNG opening",
    ...personalPost,
    publishedAt: "2010-01-10",
    publicCitation:
      "Jamie Burkart, public Facebook post about the NTER CHNG opening, January 10, 2010.",
    publicNote:
      "The post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as creators of the interactive text-messaging experience and identifies its January 2010 exhibition window.",
    protectedLocatorId: "LOC-FB-JAMIE-NTER-OPENING-2010",
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
    ...personalPost,
    publishedAt: "2015-10-05",
    publicCitation:
      "Jamie Burkart, public Facebook post about WOW List community calendars in nine cities, October 5, 2015.",
    publicNote:
      "The post attributes community calendars in nine cities to WOW List members, routes readers to join, and displayed 28 reactions and eight comments during the July 16 review.",
    protectedLocatorId: "LOC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
    supportsGenerally: [
      "Jamie's attributed nine-city statement",
      "the WOW List join route",
      "a mutable July 16, 2026 display of 28 reactions and eight comments"
    ],
    doesNotEstablish: [
      "independently verified or sustained activity in every city",
      "a lifetime city count, user total, reach metric, or attendance",
      "that Jamie locally organized every calendar"
    ]
  },
  {
    id: "SRC-FB-JAMIE-COUNCILSTAT-JOB-2016",
    title: "Jamie Burkart public post routing to a CouncilStat job posting",
    ...personalPost,
    publishedAt: "2016-05-18",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to a New York City Council CouncilStat job posting, May 18, 2016.",
    publicNote:
      "Jamie invited open-data practitioners to work with him and a City Council team while linking a CouncilStat job posting; the July 16 review displayed seven likes and no comments.",
    protectedLocatorId: "LOC-FB-JAMIE-COUNCILSTAT-JOB-2016",
    supportsGenerally: [
      "Jamie's first-person invitation language",
      "a CouncilStat job-posting route",
      "a mutable July 16, 2026 display of seven likes and no comments"
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
    ...personalPost,
    publishedAt: "2017-09-20",
    publicCitation:
      "Jamie Burkart, public Facebook post pairing NPR Cabaret Law coverage with a Council action route, September 20, 2017.",
    publicNote:
      "The post pairs Jamie's NPR quotation with a call to contact Council members and a campaign call-script route; the July 16 review displayed 24 reactions and no comments.",
    protectedLocatorId: "LOC-FB-JAMIE-LETNYCDANCE-NPR-2017",
    supportsGenerally: [
      "Jamie's public pairing of press coverage and legislative action",
      "an NPR and call-script route",
      "a mutable July 16, 2026 display of 24 reactions and no comments"
    ],
    doesNotEstablish: [
      "sole authorship or ownership of the collective campaign",
      "that the post caused legislative action",
      "unique people, calls placed, conversion, endorsement, or impact"
    ]
  },
  {
    id: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
    title: "Jamie Burkart public KC Town Hall project announcement",
    ...personalPost,
    publishedAt: "2018-07-02",
    publicCitation:
      "Jamie Burkart, public Facebook post announcing the KC Town Hall project, July 2, 2018.",
    publicNote:
      "Jamie wrote that he and Julia Fredenburg were starting the project and described its permanently affordable neighborhood-resource and cultural-center intention; the July 16 review displayed 106 reactions and 14 comments, including one direct response from the project account.",
    protectedLocatorId: "LOC-FB-JAMIE-KCTOWNHALL-START-2018",
    supportsGenerally: [
      "Jamie's attributed co-initiation statement with Julia Fredenburg",
      "the stated public-benefit intention",
      "one direct public response from the KC Town Hall project account",
      "a mutable July 16, 2026 display of 106 reactions and 14 comments"
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
    ...personalPost,
    publishedAt: "2019-02-11",
    publicCitation:
      "Jamie Burkart, public Facebook post routing readers to the Talks Not Raids City Hall action, February 11, 2019.",
    publicNote:
      "The post routes readers to a City Hall hearing, an NYC Artist Coalition video, the Talks Not Raids campaign site, and Council action on Introduction 1156.",
    protectedLocatorId: "LOC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
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
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/movement-for-repealing-nycs-archaic-no-dancing-law-gains-momentum",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jake Offenhartz, 'Movement For Repealing NYC's Archaic No Dancing Law Gains Momentum,' Gothamist, March 31, 2017.",
    publicNote:
      "The independently published article reports that hundreds gathered at Market Hotel around the effort to repeal the Cabaret Law. Jamie's personal post routed readers to the article on the day it appeared.",
    supportsGenerally: [
      "independent reporting on the March 2017 Market Hotel gathering",
      "public Cabaret Law repeal advocacy and campaign momentum",
      "the destination of Jamie's contemporaneous article-sharing post"
    ],
    doesNotEstablish: [
      "Jamie's individual role in the gathering",
      "a precise attendance count",
      "sole campaign authorship, legislative causality, or the later repeal outcome"
    ]
  }
] satisfies SourceRecord[];

export const jamiePersonalFacebookPostClaimRecords20260716 = [
  {
    id: "CLM-FB-JAMIE-RETURNED-POST-POPULATION-2026",
    project,
    internalClaim:
      "The July 13 owner-filtered Facebook traversal returned 1,243 unique records across 621 cursor pages from December 19, 2006 through June 12, 2022 and ended with no next page; a July 16 Activity Log review independently confirmed the owner-post category and same top edge.",
    status: "confirmed-with-boundary",
    projections: heldProjection(
      "The recovered owner-filtered Facebook population contains 1,243 records from December 2006 through June 2022."
    ),
    evidence: [{
      sourceId: populationSourceId,
      relationship: "private-support",
      supports: ["returned population", "pagination control", "chronology boundaries"],
      locator: "Protected population control and July 16 interface reconciliation",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Every returned record received an analytical disposition.",
      "This is not a native Meta export, deletion history, immutable lifetime population, or proof that no unavailable post ever existed.",
      "Audience labels were not exposed for 973 records, so the row-level corpus remains protected."
    ],
    antiClaims: [
      "Every Facebook post Jamie ever published was recovered.",
      "All 1,243 records were public."
    ],
    researchInquiryIds: ["INQ-FB-JAMIE-OWNER-POST-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-MISSION-ROUTING-2026",
    project,
    internalClaim:
      "A fresh deterministic pass classified all 1,243 returned records and routed 181 unique records into overlapping mission-related project or practice categories.",
    status: "confirmed-with-boundary",
    projections: heldProjection(
      "A full-population archival pass recovered recurring links among Jamie's cultural, civic, technical, and place-based projects."
    ),
    evidence: [{
      sourceId: controlsSourceId,
      relationship: "direct-support",
      supports: ["fresh full-population classification", "181 overlapping mission-routed records"],
      locator: "broadClassification and missionRouting",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Routing categories overlap and are research aids, not exclusive semantic judgments.",
      "Frequency is not effort, importance, priority, audience, or impact."
    ],
    antiClaims: ["Mission-routing frequency ranks Jamie's projects or proves their impact."],
    researchInquiryIds: ["INQ-FB-JAMIE-OWNER-POST-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-POSTED-URL-INVENTORY-2026",
    project,
    internalClaim:
      "The returned corpus contains 430 URL-bearing records and 549 unique normalized external destinations queued for source-specific recovery and close reading.",
    status: "confirmed-with-boundary",
    projections: heldProjection(
      "Jamie's personal post archive preserves a substantial source field spanning project sites, public processes, reporting, and cultural media."
    ),
    evidence: [{
      sourceId: controlsSourceId,
      relationship: "direct-support",
      supports: ["430 URL-bearing records", "549 unique normalized external destinations"],
      locator: "postedUrlInventory",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["A posted destination remains a research lead until recovered, close-read, and decomposed."],
    antiClaims: ["Every posted link corroborates Jamie's professional record."],
    researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-OUTBOUND-STAKEHOLDER-ROUTING-2026",
    project,
    internalClaim:
      "The corpus repeatedly routes toward civic and cultural stakeholders, including New York City Council, Rafael Espinal, Market Hotel, the Office of Nightlife, Antonio Reynoso, Quinton Lucas, and Helen Rosenthal.",
    status: "confirmed-with-boundary",
    projections: heldProjection(
      "The archive preserves repeated public routing toward civic and cultural stakeholders."
    ),
    evidence: [{
      sourceId: controlsSourceId,
      relationship: "direct-support",
      supports: ["bounded outbound stakeholder-reference counts"],
      locator: "stakeholderRouting",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "These are Jamie's outbound mentions, tags, quotations, and links, not inbound actions by the named stakeholders.",
      "The pattern does not establish engagement, endorsement, attendance, partnership, response, influence, or impact."
    ],
    antiClaims: ["Twenty New York City Council accounts engaged with Jamie's personal Facebook posts."],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026",
    project,
    internalClaim:
      "Four selected public project posts displayed mutable July 16 interaction floors, and the KC Town Hall announcement included one direct response from the project account.",
    status: "confirmed-with-boundary",
    projections: heldProjection(
      "Selected public posts retain dated, bounded response traces."
    ),
    evidence: [{
      sourceId: controlsSourceId,
      relationship: "direct-support",
      supports: ["four dated counter snapshots", "one KC Town Hall project-account response"],
      locator: "selectedPublicSourceControls and selectedDirectResponses",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "Counters are mutable interface observations, not historical analytics and not unique people.",
      "One project-account reply is not a stakeholder-group response rate or government engagement."
    ],
    antiClaims: ["The selected reactions measure reach, endorsement, conversion, causality, or impact."],
    researchInquiryIds: ["INQ-FB-JAMIE-POST-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-PARTICIPATION-ROUTING-PRACTICE",
    project,
    internalClaim:
      "Across selected public posts, Jamie repeatedly connected project explanation to a usable participation route: joining a WOW List, calling Council through Let NYC Dance, entering a KC Town Hall neighborhood process, or attending and acting through Talks Not Raids.",
    status: "confirmed-with-boundary",
    projections: heldProjection(
      "Jamie repeatedly translated project purpose into a usable next step for public participation."
    ),
    evidence: [
      ["SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015", "WOW List join route"],
      ["SRC-FB-JAMIE-LETNYCDANCE-NPR-2017", "Council call-script route"],
      ["SRC-FB-JAMIE-KCTOWNHALL-START-2018", "neighborhood-process invitation"],
      ["SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019", "hearing, campaign, media, and bill-action routes"]
    ].map(([sourceId, supports]) => ({
      sourceId,
      relationship: "direct-support" as const,
      supports: [supports],
      locator: "Individually rechecked public post metadata",
      confidence: "high" as const,
      renderCitation: false
    })),
    boundaries: [
      "The posts support public communication and implementation practice, not proof that readers clicked, joined, called, attended, converted, or caused an outcome.",
      "Each project retained collective authorship and organizing context."
    ],
    antiClaims: ["Jamie alone created or controlled each referenced project or campaign."],
    researchInquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-NTER-OPENING-TRACE-2010",
    project: "nterchng",
    internalClaim:
      "Jamie's January 2010 public post names Drew Bolton, Jamie Burkart, and Garrett Fuselier as NTER CHNG creators and documents the exhibition window.",
    status: "confirmed-with-boundary",
    projections: heldProjection("A January 2010 public trace credits NTER CHNG to Drew Bolton, Jamie Burkart, and Garrett Fuselier."),
    evidence: [{
      sourceId: "SRC-FB-JAMIE-NTER-OPENING-2010",
      relationship: "direct-support",
      supports: ["creator credits", "January 2010 exhibition window"],
      locator: "Public post metadata and body",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The post does not divide technical labor or establish sole authorship."],
    antiClaims: ["Jamie was the sole creator of NTER CHNG."],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-COUNCILSTAT-INVITATION-2016",
    project: "callnyc",
    internalClaim:
      "Jamie's May 2016 public post invited open-data practitioners to work with him and a City Council team through a linked CouncilStat job posting.",
    status: "use-with-care",
    projections: heldProjection("Jamie publicly routed open-data practitioners toward a CouncilStat job opportunity in May 2016."),
    evidence: [{
      sourceId: "SRC-FB-JAMIE-COUNCILSTAT-JOB-2016",
      relationship: "direct-support",
      supports: ["Jamie's invitation language", "the CouncilStat job route"],
      locator: "Public post metadata and body",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The wording does not resolve employment, title, contract, team membership, hiring authority, or the exact Council relationship."],
    antiClaims: ["Jamie was employed by, staffed, or controlled hiring for the CouncilStat team."],
    researchInquiryIds: ["INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-2018",
    project: "kc-town-hall",
    internalClaim:
      "Jamie's July 2018 public announcement says he and Julia Fredenburg were starting KC Town Hall and describes its intended permanently affordable neighborhood-resource and cultural-center purpose.",
    status: "confirmed-with-boundary",
    projections: heldProjection("Jamie and Julia Fredenburg publicly announced KC Town Hall in July 2018 as a neighborhood resource and cultural-center project."),
    evidence: [{
      sourceId: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
      relationship: "direct-support",
      supports: ["attributed co-initiation", "stated public-benefit intention"],
      locator: "Public post metadata and body",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The post does not establish sole founding, later public funding, transition, or project outcome."],
    antiClaims: ["Jamie alone founded or owned KC Town Hall."],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FB-JAMIE-GOTHAMIST-CABARET-CONTEXT-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "Gothamist independently reported that hundreds gathered at Market Hotel in March 2017 around the effort to repeal New York City's Cabaret Law; Jamie shared the article the day it appeared.",
    status: "confirmed-with-boundary",
    projections: heldProjection("Independent reporting documented a large March 2017 Market Hotel gathering around the Cabaret Law repeal effort."),
    evidence: [{
      sourceId: "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31",
      relationship: "direct-support",
      supports: ["the reported gathering", "Cabaret Law repeal context", "publication date"],
      locator: "Headline, dek, publication metadata, and article body",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The article supplies campaign context, not Jamie's individual role or a precise attendance count."],
    antiClaims: ["The article proves Jamie organized the gathering or caused the later repeal."],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  }
] satisfies ClaimRecord[];

export const jamiePersonalFacebookPostResearchInquiries20260716 = [
  {
    id: "INQ-FB-JAMIE-OWNER-POST-POPULATION-2026",
    project,
    question:
      "What complete population can the authenticated owner-post surface support, and where does its completeness claim stop?",
    methods: [
      "Traversed the Posted by You cursor connection until has-next-page false",
      "Deduplicated returned story nodes by stable protected identity",
      "Reprocessed every returned record through deterministic form, theme, and relevance rules",
      "Independently reopened Activity Log > Your posts, photos and videos on July 16 and checked the current top edge"
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "The traversal returned 1,243 unique records across 621 pages and ended with no next page.",
      "The fresh 1,243-record classification reproduced the year and record-form controls.",
      "The Activity Log owner-post category still began at the same June 12, 2022 top edge on July 16."
    ],
    limitations: [
      "This is the complete returned owner-filtered surface, not a native Meta export, deletion history, or immutable all-ever population.",
      "Audience labels were absent for 973 records, so raw records remain protected.",
      "Unavailable, deleted, migrated, withheld, or otherwise unreturned history cannot be ruled out."
    ],
    sourceIds: [populationSourceId, controlsSourceId],
    publicSummary:
      "Every record returned by the terminal owner-filtered surface was reprocessed; the all-ever account-history question remains bounded.",
    protectedLocatorId: "LOC-FB-JAMIE-OWNER-POST-RESEARCH-2026"
  },
  {
    id: "INQ-FB-JAMIE-POSTED-SOURCES-2026",
    project,
    question:
      "Which posted destinations and public project traces can become normalized knowledge-bank sources?",
    methods: [
      "Inventoried external destinations across every returned record",
      "Routed mission-relevant project and practice records",
      "Individually reopened six selected public posts and checked public audience state",
      "Recovered and close-read the Gothamist destination separately from its Facebook placement"
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The corpus contains 430 URL-bearing records and 549 unique normalized external destinations.",
      "Six public project posts were promoted as metadata-only first-person sources.",
      "One newly normalized Gothamist article supplies independent Cabaret Law campaign context."
    ],
    limitations: [
      "Most posted destinations remain research leads, not decomposed evidence.",
      "A share does not prove authorship, endorsement, or that the destination supports Jamie's role.",
      "Native Facebook IDs and raw post bodies remain outside the repository."
    ],
    sourceIds: [
      controlsSourceId,
      "SRC-FB-JAMIE-NTER-OPENING-2010",
      "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
      "SRC-FB-JAMIE-COUNCILSTAT-JOB-2016",
      "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
      "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
      "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
      "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31"
    ],
    publicSummary:
      "Six first-person project traces and one independent article entered the bank; 549 external destinations remain a governed source-research queue.",
    protectedLocatorId: "LOC-FB-JAMIE-POSTED-SOURCE-QUEUE-2026"
  },
  {
    id: "INQ-FB-JAMIE-POST-ENGAGEMENT-2026",
    project,
    question:
      "What traction and stakeholder engagement can the personal-post population defensibly establish?",
    methods: [
      "Separated outbound mentions, tags, quotations, and links from inbound stakeholder actions",
      "Reopened six selected public posts and read visible counters and comments",
      "Retained only direct recoverable account-authored responses as engagement evidence"
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The corpus preserves recurring outbound routes to civic and cultural stakeholders.",
      "Four selected posts retain dated mutable counter snapshots.",
      "One direct response from the KC Town Hall project account was recovered on the selected announcement."
    ],
    limitations: [
      "Outbound references are not inbound engagement.",
      "No identity-complete responder or reaction population was recovered.",
      "The selected counters are not unique people, reach, endorsement, attendance, conversion, causality, or impact.",
      "No government-account response was recovered in the six selected posts; this does not prove none existed elsewhere."
    ],
    sourceIds: [controlsSourceId, "SRC-FB-JAMIE-KCTOWNHALL-START-2018"],
    publicSummary:
      "The pass recovered bounded response traces, not a complete stakeholder-engagement census.",
    protectedLocatorId: "LOC-FB-JAMIE-POST-ENGAGEMENT-RESEARCH-2026"
  },
  {
    id: "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026",
    project: "callnyc",
    question:
      "What exact relationship underlies Jamie's May 2016 invitation to work with him and a City Council team?",
    methods: [
      "Reopened the public post",
      "Reviewed the surviving link target metadata",
      "Kept the role interpretation separate from the exact first-person wording"
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: ["The public post and CouncilStat job route are recovered."],
    limitations: [
      "The original job PDF and an independent role record have not yet resolved employment, title, contract, team membership, or hiring authority."
    ],
    sourceIds: ["SRC-FB-JAMIE-COUNCILSTAT-JOB-2016"],
    publicSummary:
      "The post is a useful first-person trace, but the exact institutional relationship remains open."
  }
] satisfies ResearchInquiry[];

export const jamiePersonalFacebookPostIntakeRecords20260716 = [
  {
    id: "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "research-lead",
    title: "Complete returned personal Facebook owner-post population",
    publicSafeSummary:
      "A protected terminal traversal returned 1,243 owner-filtered records, all of which received a fresh analytical disposition.",
    whyItMatters:
      "The population can surface dated project traces, source leads, and practice patterns while preserving private-life and audience boundaries.",
    projectHints: [project],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: [populationSourceId, controlsSourceId],
    claimIds: [
      "CLM-FB-JAMIE-RETURNED-POST-POPULATION-2026",
      "CLM-FB-JAMIE-MISSION-ROUTING-2026"
    ],
    inquiryIds: ["INQ-FB-JAMIE-OWNER-POST-POPULATION-2026"],
    limitations: [
      "The raw corpus and audience-unknown material stay outside the repository.",
      "Complete returned surface does not mean immutable all-ever account history."
    ],
    nextActions: ["Reconcile a native Meta export only if its additional archival value justifies the privacy cost."]
  },
  {
    id: "INTAKE-FB-JAMIE-POSTED-SOURCE-FIELD-2026",
    capturedAt: reviewedAt,
    capturedBy: "Codex archival review",
    kind: "research-lead",
    title: "Personal Facebook posted-source field",
    publicSafeSummary:
      "The returned population contains 549 unique normalized external destinations; six public project posts and one independent article were normalized in this pass.",
    whyItMatters:
      "The source field can strengthen future audience-specific composition after destination-level recovery and close reading.",
    projectHints: [project],
    maturity: "research-needed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "research-inquiry-created",
    sourceIds: [controlsSourceId, "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31"],
    claimIds: ["CLM-FB-JAMIE-POSTED-URL-INVENTORY-2026"],
    inquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    limitations: ["A posted URL is a lead, not provenance, endorsement, or role evidence."],
    nextActions: ["Prioritize independent reporting, official records, and durable project artifacts for close reading."]
  },
  {
    id: "INTAKE-FB-JAMIE-STAKEHOLDER-ENGAGEMENT-2026",
    capturedAt: reviewedAt,
    capturedBy: "Codex archival review",
    kind: "engagement-lead",
    title: "Personal Facebook stakeholder and traction patterns",
    publicSafeSummary:
      "The archive preserves outbound stakeholder-routing counts, four dated counter snapshots, and one direct project-account response.",
    whyItMatters:
      "Separating direct recoverable responses from tags and mutable counters prevents stakeholder engagement from being overstated.",
    projectHints: [project],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: [controlsSourceId],
    claimIds: [
      "CLM-FB-JAMIE-OUTBOUND-STAKEHOLDER-ROUTING-2026",
      "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026"
    ],
    inquiryIds: ["INQ-FB-JAMIE-POST-ENGAGEMENT-2026"],
    limitations: ["No identity-complete inbound engagement population was recovered."],
    nextActions: ["Add stakeholder engagement only from individually verified account-authored responses."]
  },
  {
    id: "INTAKE-FB-JAMIE-SELECTED-PROJECT-POSTS-2026",
    capturedAt: reviewedAt,
    capturedBy: "Codex authenticated archival review",
    kind: "artifact-lead",
    title: "Six selected public personal Facebook project posts",
    publicSafeSummary:
      "Six individually rechecked public posts preserve bounded traces across NTER CHNG, WOW List, CallNYC context, Let NYC Dance, KC Town Hall, and Talks Not Raids.",
    whyItMatters:
      "The posts supply dated first-person traces, collaborator credit, and public participation routes without replacing independent outcome evidence.",
    projectHints: [project, "nterchng", "wowlist", "callnyc", "nyc-artist-coalition", "kc-town-hall"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: [
      "SRC-FB-JAMIE-NTER-OPENING-2010",
      "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
      "SRC-FB-JAMIE-COUNCILSTAT-JOB-2016",
      "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
      "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
      "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019"
    ],
    claimIds: [
      "CLM-FB-JAMIE-PARTICIPATION-ROUTING-PRACTICE",
      "CLM-FB-JAMIE-NTER-OPENING-TRACE-2010",
      "CLM-FB-JAMIE-COUNCILSTAT-INVITATION-2016",
      "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-2018"
    ],
    inquiryIds: ["INQ-FB-JAMIE-POSTED-SOURCES-2026"],
    limitations: [
      "First-person statements do not independently establish outcomes.",
      "Native post IDs, raw bodies, comments, and responder identities remain outside the repository."
    ],
    nextActions: ["Use only when a future composition needs the exact bounded trace and stronger evidence is not available."]
  },
  {
    id: "INTAKE-FB-JAMIE-GOTHAMIST-CABARET-2017",
    capturedAt: reviewedAt,
    capturedBy: "Codex source review",
    kind: "public-url",
    title: "Gothamist Cabaret Law campaign-momentum article",
    publicSafeSummary:
      "Gothamist reported on the March 2017 Market Hotel gathering around the Cabaret Law repeal effort.",
    whyItMatters:
      "The article independently contextualizes the campaign field represented in Jamie's contemporaneous source-sharing record.",
    projectHints: ["nyc-artist-coalition"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/movement-for-repealing-nycs-archaic-no-dancing-law-gains-momentum",
    sourceIds: ["SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31"],
    claimIds: ["CLM-FB-JAMIE-GOTHAMIST-CABARET-CONTEXT-2017"],
    inquiryIds: [],
    limitations: ["The article does not establish Jamie's individual role or a precise attendance count."],
    nextActions: ["Retain as bank depth unless a future Cabaret Law composition needs this campaign-context source."]
  }
] satisfies IntakeRecord[];
