import type {
  ClaimRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const lifecycleSources = [
  {
    id: "SRC-WATER-PITCH-HUCK-FINN-2007",
    title: "When Artists Turn Huck Finn",
    organization: "The Pitch",
    author: "Eric Barton",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-08-09",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
    preferredPublicUrl: "canonical",
    publicCitation: "Eric Barton, 'When Artists Turn Huck Finn,' The Pitch, August 9, 2007.",
    publicNote: "Contemporaneous reporting credits Jamie with originating the experiential raft project and connects it to his investigation of Kansas City transportation history and the Missouri River.",
    locator: "Article body paragraphs describing the project's origin, recycled-material construction, Missouri route, and river context.",
    projectIds: ["water-publics"],
    intakeIds: ["INT-2026-07-13-PITCH-RAFT"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "Jamie originated the experiential raft idea",
      "the raft used recycled materials",
      "the project crossed Missouri",
      "relationship to Kansas City transportation history and the Missouri River"
    ],
    doesNotEstablish: [
      "the complete route to salt water",
      "a four-month duration",
      "arrival at the Gulf of Mexico",
      "a complete participant roster",
      "the later Great Accommodations program"
    ]
  },
  {
    id: "SRC-WATER-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
    title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
    organization: "Charlotte Street Foundation",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2009-09-01",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
    preferredPublicUrl: "canonical",
    publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' 2009.",
    publicNote: "Institutional program description of Jamie's participatory river-city exhibition, outreach, installation, public programs, and attributed account of the earlier raft journey.",
    locator: "Program description from 'Great Accommodations is a project spearheaded' through the facilitator description, plus Event Details.",
    projectIds: ["water-publics"],
    intakeIds: ["INT-2026-07-13-CHARLOTTE-STREET-WATER"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "Jamie spearheaded Great Accommodations",
      "hundreds of letters and targeted social-media outreach",
      "river stories solicited from multiple connected watersheds",
      "planned interactive installation, public programs, and Jamie's facilitator role",
      "Jamie's attributed account of a four-month raft journey down the Missouri and Mississippi until the water tasted salty"
    ],
    doesNotEstablish: [
      "independent verification of every route and duration detail in Jamie's quoted recollection",
      "arrival at a specifically named Gulf destination",
      "complete participation or attendance counts",
      "long-term outcomes for every participant"
    ]
  },
  {
    id: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
    title: "Open House",
    organization: "Good Times",
    author: "Laura Mattingly",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2006-06-28",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Laura Mattingly, 'Open House,' Good Times, June 28, 2006.",
    publicNote: "Contemporaneous feature on Jamie's ten-day Porter Bridge Gallery experiment in communal living, shared responsibility, facilitation, and documentation.",
    locator: "Feature body paragraphs on the ten-day duration, shared responsibility, Jamie's role, and documentation practice.",
    projectIds: ["open-house"],
    intakeIds: ["INT-2026-07-13-GOOD-TIMES-OPEN-HOUSE"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "Jamie instigated the ten-day Open House",
      "responsibility and decisions were intentionally communal",
      "Jamie continuously tended and facilitated the public space",
      "the project extended earlier Shop Show participation practices",
      "documentation helped participants view themselves in relation to others"
    ],
    doesNotEstablish: [
      "Jamie as sole leader or author of participants' activity",
      "consent for republication of every named participant or photograph",
      "a quantified attendance total",
      "long-term outcomes for participants"
    ]
  },
  {
    id: "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
    title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
    organization: "Gothamist",
    author: "Emma Whitford",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-19",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    preferredPublicUrl: "canonical",
    publicCitation: "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
    publicNote: "Contemporaneous reporting identifies Jamie with NYC Artist Coalition and documents his fire-code study groups and public call for full Cabaret Law repeal.",
    locator: "Paragraphs identifying Jamie, the fire-code study groups, and his City Hall repeal position.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-GOTHAMIST-CABARET"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "Jamie's affiliation with NYC Artist Coalition",
      "Jamie organized fire-code study groups for DIY venues",
      "Jamie rallied outside City Hall for full Cabaret Law repeal",
      "Jamie's public safety argument concerning venues and fire-code engagement"
    ],
    doesNotEstablish: [
      "Jamie as sole founder or leader of NYC Artist Coalition",
      "Jamie's exact role in drafting legislation",
      "sole causality for repeal",
      "creation of the Office of Nightlife",
      "the final enacted outcome"
    ]
  },
  {
    id: "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
    title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife",
    organization: "NPR",
    author: "Jane Lerner",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-20",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife?renderPlatform=nprone_ios&unified=true",
    preferredPublicUrl: "canonical",
    publicCitation: "Jane Lerner, 'With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife,' NPR, September 20, 2017.",
    publicNote: "Contemporaneous reporting describes collective Let NYC Dance mobilization, identifies Jamie as a founding coalition member using a name variant, and reports enactment of the Office of Nightlife legislation.",
    locator: "Paragraphs on Let NYC Dance, Jamie's coalition role, the Office of Nightlife, and his repeal position.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-NPR-NIGHTLIFE"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "NPR identified Jamie as a founding member of 'NYC Arts Coalition'",
      "NYC Artist Coalition and other groups mobilized under Let NYC Dance",
      "the Mayor signed legislation establishing an Office of Nightlife and Nightlife Advisory Board",
      "Jamie publicly supported Cabaret Law repeal"
    ],
    doesNotEstablish: [
      "Jamie as the coalition's sole founder",
      "Jamie's exact causal contribution to creating the Office of Nightlife",
      "Jamie as the author or sponsor of legislation",
      "final Cabaret Law enactment after the article date",
      "sole coalition causality for policy outcomes"
    ]
  },
  {
    id: "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017",
    title: "The Co-op Q&A With Jamie Burkart and Julia Fredenberg",
    organization: "Greene Hill Food Co-op",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-12-19",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
    preferredPublicUrl: "canonical",
    publicCitation: "Greene Hill Food Co-op, 'The Co-op Q&A With Jamie Burkart and Julia Fredenberg,' December 19, 2017.",
    publicNote: "A public Q&A describing Jamie and Julia's NYC Artist Coalition work, Cabaret Law advocacy, and invitation to a September 28 town hall in dialogue with the Office of Nightlife.",
    locator: "Introduction and Q&A answers under 'What are you working on outside of the Co-op?' and 'How can Co-op members get involved?'",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-GREENE-HILL-NEWSLETTER"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "Jamie and Julia described working as part of NYC Artists Coalition",
      "their stated work to repeal the Cabaret Law and legalize dancing",
      "their invitation to a September 28 town hall in dialogue with the Office of Nightlife",
      "NYC Artist Coalition's stated mutual-aid and advocacy orientation toward community spaces"
    ],
    doesNotEstablish: [
      "that the September 28 town hall occurred as planned",
      "attendance or scale of the town hall",
      "Jamie's complete production role",
      "policy effects of the town hall",
      "sole causality for Cabaret Law repeal or creation of the Office of Nightlife"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017",
    title: "Council to Vote to Establish a Nightlife Advisory Board and Office of Nightlife",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-08-24",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://council.nyc.gov/press/2017/08/24/1453/",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, 'Council to Vote to Establish a Nightlife Advisory Board and Office of Nightlife,' August 24, 2017.",
    publicNote: "Official Council description of Introduction 1688-A, its sponsor, vote context, and intended Office and Advisory Board responsibilities.",
    locator: "Press-release sections on Introduction 1688-A, sponsorship, vote context, and the Office and Advisory Board's proposed duties.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-NYC-COUNCIL-NIGHTLIFE"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "August 24, 2017 Council vote context",
      "Introduction 1688-A sponsorship by Council Member Rafael Espinal",
      "proposed Office of Nightlife and Nightlife Advisory Board responsibilities"
    ],
    doesNotEstablish: [
      "Jamie's role in developing or passing the legislation",
      "NYC Artist Coalition's exact contribution",
      "public town-hall production",
      "the later implementation quality of the Office"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-CABARET-VOTE-2017",
    title: "Council to Vote to Repeal the New York City Cabaret Law of 1926",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-31",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://council.nyc.gov/press/2017/10/31/1541/",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, press release describing the October 31, 2017 vote on Cabaret Law repeal.",
    publicNote: "Official Council description of the scheduled vote on Introduction 1652-A and the security measures the proposal retained.",
    locator: "Press-release sections on Introduction 1652-A, the October 31 vote, repeal, and retained security provisions.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-NYC-COUNCIL-CABARET-VOTE"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"],
    supportsGenerally: [
      "October 31, 2017 Council vote context",
      "Introduction 1652-A sponsorship by Council Member Rafael Espinal",
      "proposal to repeal the Cabaret Law while retaining specified security measures"
    ],
    doesNotEstablish: [
      "Jamie's role in drafting or passing the legislation",
      "sole causality by any advocacy organization",
      "the final signed-law date",
      "the later implementation effects of repeal"
    ]
  }
] satisfies SourceRecord[];

export const lifecycleClaims = [
  {
    id: "CLM-WATER-RAFT-ORIGINATION",
    project: "water-publics",
    claimType: "activity",
    internalClaim: "Contemporaneous reporting credited Jamie with originating the 2007 experiential raft project from an investigation of Kansas City transportation history and the Missouri River.",
    status: "confirmed",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "Contemporaneous reporting credited Jamie with originating the 2007 experiential raft project from an investigation of Kansas City transportation history and the Missouri River.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WATER-PITCH-HUCK-FINN-2007",
        relationship: "direct-support",
        supports: ["origination", "project premise", "Kansas City and Missouri River context"],
        locator: "Article body paragraphs on Jamie's investigation, origination of the project, and the Missouri route.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The article describes travel across Missouri, not the complete later route."],
    antiClaims: ["The Pitch independently documented the full journey to salt water."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-WATER-RAFT-VOYAGE",
    project: "water-publics",
    claimType: "attributed-description",
    internalClaim: "Charlotte Street's 2009 program page quotes Jamie describing a four-month bicycle-powered raft journey from Kansas City down the Missouri and Mississippi until the water tasted salty.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "In a 2009 Charlotte Street program page, Jamie described a four-month bicycle-powered raft journey from Kansas City down the Missouri and Mississippi until the water tasted salty.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WATER-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
        relationship: "direct-support",
        supports: ["Jamie's attributed route and duration account"],
        locator: "Jamie Burkart quotation beginning 'A couple of years ago' in the program description.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WATER-PITCH-HUCK-FINN-2007",
        relationship: "corroborating",
        supports: ["raft existence", "Jamie as originator", "Missouri start context"],
        locator: "Article body paragraphs on project origin and the Missouri route.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Preserve attribution for the route and duration details."],
    antiClaims: ["The supplied sources independently verify arrival at a specifically named Gulf destination."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-PROGRAM",
    project: "water-publics",
    claimType: "attributed-description",
    internalClaim: "Charlotte Street presented Jamie as spearheading Great Accommodations and described its outreach, collected river stories, planned interactive installation and public programs, and Jamie's planned facilitator role.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "Charlotte Street presented Jamie as spearheading Great Accommodations and described its outreach, collected river stories, planned interactive installation and public programs, and Jamie's planned facilitator role.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WATER-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
        relationship: "direct-support",
        supports: ["Jamie's attributed role", "outreach", "planned installation", "planned public programs", "planned facilitation"],
        locator: "Program description from the opening project summary through the planned facilitator role, plus Event Details.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The page is a program description; do not convert planned facilitation into a completed outcome or infer participation counts and long-term effects."],
    antiClaims: ["Jamie alone authored every participant contribution."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-OPEN-HOUSE-PARTICIPATORY-PRACTICE",
    project: "open-house",
    claimType: "activity",
    internalClaim: "Good Times documented Jamie instigating and continuously tending a ten-day gallery experiment designed around communal responsibility, open participation, and reflexive documentation.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "Good Times documented Jamie instigating and continuously tending a ten-day gallery experiment designed around communal responsibility, open participation, and reflexive documentation.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
        relationship: "direct-support",
        supports: ["Jamie's initiating and facilitation role", "ten-day duration", "communal decision-making", "documentation practice"],
        locator: "Feature body paragraphs on Jamie's role, ten-day duration, collective decisions, and live documentation.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Collective participation must not be converted into sole authorship."],
    antiClaims: ["Jamie controlled every decision or participant action."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-FOUNDING-ROLE",
    project: "nyc-artist-coalition",
    claimType: "role",
    internalClaim: "Contemporaneous reporting identified Jamie as a founding member of NYC Artist Coalition.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "Contemporaneous reporting identified Jamie as a founding member of NYC Artist Coalition.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
        relationship: "direct-support",
        supports: ["founding-member attribution"],
        locator: "Paragraph identifying Jamie as a founding member of the name-variant 'NYC Arts Coalition.'",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
        relationship: "corroborating",
        supports: ["Jamie's NYC Artist Coalition affiliation", "coalition name"],
        locator: "Paragraphs identifying Jamie with NYC Artist Coalition and quoting his repeal position.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["NPR used the name variant 'NYC Arts Coalition'; Gothamist used 'NYC Artist Coalition.'"],
    antiClaims: ["Jamie was the sole founder or sole leader of NYC Artist Coalition."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-CABARET-LAW-ADVOCACY",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "In 2017 Jamie organized fire-code study groups for DIY venues and publicly advocated full Cabaret Law repeal as NYC Artist Coalition mobilized with other groups under Let NYC Dance.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "In 2017, Jamie organized fire-code study groups for DIY venues and publicly called for full Cabaret Law repeal as NYC Artist Coalition mobilized with other groups under Let NYC Dance.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
        relationship: "direct-support",
        supports: ["fire-code study groups", "public repeal advocacy", "coalition affiliation"],
        locator: "Paragraphs on Jamie's fire-code study groups and City Hall repeal advocacy.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
        relationship: "corroborating",
        supports: ["collective mobilization under Let NYC Dance", "Jamie's public repeal position"],
        locator: "Paragraphs on Let NYC Dance, Jamie's coalition role, and his repeal position.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017",
        relationship: "corroborating",
        supports: ["NYC Artist Coalition affiliation", "stated Cabaret Law repeal work"],
        locator: "Introduction and answer to 'What are you working on outside of the Co-op?'",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Advocacy and coalition mobilization do not establish sole causality for legislative outcomes."],
    antiClaims: ["Jamie alone repealed the Cabaret Law.", "NYC Artist Coalition acted without partner organizations."],
    researchInquiryIds: ["INQ-NYCARTC-CABARET-REPEAL-CAUSALITY"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-SEPTEMBER-TOWN-HALL-INVITATION",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "Greene Hill Food Co-op published a Q&A in which Jamie and Julia invited readers to a September 28 town hall for dialogue with the new Office of Nightlife.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "A Greene Hill Food Co-op Q&A records Jamie and Julia inviting readers to a September 28 town hall for dialogue with the new Office of Nightlife.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017",
        relationship: "direct-support",
        supports: ["public invitation", "September 28 date", "planned dialogue with the Office of Nightlife"],
        locator: "Answer to 'What are you working on outside of the Co-op?'",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The Q&A establishes the invitation, not that the event occurred, its attendance, Jamie's complete production role, or its policy effects."],
    antiClaims: ["The Q&A alone proves that Jamie produced a large completed town hall or that it changed Office policy."],
    researchInquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYC-OFFICE-NIGHTLIFE-ESTABLISHMENT",
    project: "nyc-artist-coalition",
    claimType: "outcome",
    internalClaim: "New York City enacted legislation establishing an Office of Nightlife and Nightlife Advisory Board in 2017.",
    status: "confirmed-with-boundary",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "New York City enacted legislation establishing an Office of Nightlife and Nightlife Advisory Board in 2017.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
        relationship: "direct-support",
        supports: ["Mayoral signature", "Office and Advisory Board establishment"],
        locator: "Paragraphs reporting the signed Office of Nightlife and Nightlife Advisory Board legislation.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017",
        relationship: "context",
        supports: ["bill number", "sponsor", "Council vote context", "intended responsibilities"],
        locator: "Press-release sections on Introduction 1688-A and the proposed Office and Advisory Board duties.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["These sources establish the institutional outcome, not Jamie's exact contribution to it."],
    antiClaims: ["Jamie alone created the Office of Nightlife."],
    researchInquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYC-CABARET-LAW-COUNCIL-VOTE",
    project: "nyc-artist-coalition",
    claimType: "chronology",
    internalClaim: "The New York City Council announced an October 31, 2017 vote on Introduction 1652-A to repeal the Cabaret Law while retaining specified security measures.",
    status: "confirmed-with-boundary",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "The Council announced an October 31, 2017 vote on Introduction 1652-A to repeal the Cabaret Law while retaining specified security measures.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-VOTE-2017",
        relationship: "direct-support",
        supports: ["vote date", "bill number", "sponsor", "repeal and retained-security description"],
        locator: "Press-release sections on Introduction 1652-A, the October 31 vote, repeal, and retained security measures.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The press release announces the vote; retain a separate inquiry for final enacted-law documentation and advocacy causality."],
    antiClaims: ["The Council press release alone proves Jamie caused repeal."],
    researchInquiryIds: ["INQ-NYCARTC-CABARET-REPEAL-CAUSALITY"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  }
] satisfies ClaimRecord[];

export const lifecycleResearchInquiries = [
  {
    id: "INQ-NYCARTC-GREENE-HILL-RECOVERY",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-13-GREENE-HILL-NEWSLETTER"],
    question: "What does the recovered Greene Hill Food Co-op Q&A support, and what additional event evidence remains necessary?",
    methods: [
      "Reopened the supplied live URL after an independent evaluator contradicted the initial availability finding.",
      "Closely read the introduction and answers concerning NYC Artist Coalition, Cabaret Law advocacy, and the September 28 town-hall invitation."
    ],
    runAt: "2026-07-13",
    resultStatus: "recovered",
    findings: [
      "The live page is a public Q&A with Jamie Burkart and Julia Fredenberg published December 19, 2017.",
      "The Q&A documents their NYC Artist Coalition affiliation, stated Cabaret Law repeal work, and invitation to a September 28 town hall for dialogue with the Office of Nightlife."
    ],
    limitations: [
      "The page does not establish that the announced town hall occurred, its attendance, Jamie's complete production role, or any policy effects.",
      "A durable archived capture and event-specific records would strengthen preservation and chronology."
    ],
    sourceIds: ["SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017"],
    publicSummary: "The supplied Greene Hill page was recovered and supports a bounded account of coalition advocacy and a September 28 town-hall invitation."
  },
  {
    id: "INQ-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT",
    project: "callnyc",
    intakeIds: ["INT-2026-07-13-MEMORY-CALLNYC-COUNCIL-ENGAGEMENT"],
    question: "What publicly recoverable engagement did New York City Council member accounts have with the CallNYC account and its posts?",
    methods: [
      "Define a dated Council-member account roster, interaction types, time window, deduplication rules, and missing-post protocol before measurement."
    ],
    runAt: "2026-07-13",
    resultStatus: "inconclusive",
    findings: ["The metric is captured as a research lead; no publishable count has been accepted in this lifecycle run."],
    limitations: [
      "Platform visibility, deleted posts, renamed accounts, quote-post behavior, and unauthenticated access can bias counts.",
      "Engagement does not by itself establish adoption, endorsement, or policy impact."
    ],
    sourceIds: []
  },
  {
    id: "INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-13-MEMORY-NYCARTC-OFFICE-NIGHTLIFE-ROLE",
      "INT-2026-07-13-NPR-NIGHTLIFE",
      "INT-2026-07-13-NYC-COUNCIL-NIGHTLIFE"
    ],
    question: "What public and collaborator evidence can establish Jamie's and NYC Artist Coalition's specific contributions to creating the Office of Nightlife?",
    methods: [
      "Reviewed the supplied NPR article and the official Council vote description for institutional chronology and named attribution."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "The Office and Advisory Board were established in 2017.",
      "The reviewed sources establish collective nightlife advocacy context but do not specify Jamie's contribution to developing or passing the Office legislation."
    ],
    limitations: [
      "No complete hearing record, coalition archive, collaborator account, or legislative-development chronology was reviewed in this run.",
      "Institutional outcome evidence cannot substitute for evidence of Jamie's role."
    ],
    sourceIds: ["SRC-NYCARTC-NPR-NIGHTLIFE-2017", "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017"]
  },
  {
    id: "INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-13-MEMORY-NYCARTC-TOWN-HALLS",
      "INT-2026-07-13-GREENE-HILL-NEWSLETTER"
    ],
    question: "Which nightlife town halls did Jamie produce, at what scale, with which collaborators, and how did they inform public accountability for the Office of Nightlife?",
    methods: [
      "Preserved Jamie's memory as an inquiry and identified the minimum event, role, scale, credit, and outcome evidence needed.",
      "Closely read the recovered Greene Hill Q&A for bounded event evidence."
    ],
    runAt: "2026-07-13",
    resultStatus: "inconclusive",
    findings: [
      "A public Q&A records Jamie and Julia inviting readers to a September 28 town hall for dialogue with the new Office of Nightlife.",
      "No completed-event, production-role, attendance, or policy-effect claim was promoted in this run."
    ],
    limitations: ["Event pages, programs, photographs, recordings, public testimony, collaborator accounts, and attendance evidence remain to be located and reviewed."],
    sourceIds: ["SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017"]
  },
  {
    id: "INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-13-MEMORY-TALKS-NOT-RAIDS-MARCH"],
    question: "What evidence supports Jamie's and NYC Artist Coalition's Talks Not Raids work, its transparency outcomes, and any contribution to ending M.A.R.C.H. enforcement operations?",
    methods: ["Preserved Jamie's memory as an inquiry and separated campaign activity, transparency outcomes, institutional disposition, and causality into distinct research needs."],
    runAt: "2026-07-13",
    resultStatus: "inconclusive",
    findings: ["No public claim about disbandment or causality was promoted in this run."],
    limitations: ["Campaign artifacts, agency records, hearing materials, reporting, chronology, collaborator accounts, and the official institutional disposition remain to be reviewed."],
    sourceIds: []
  },
  {
    id: "INQ-NYCARTC-CABARET-REPEAL-CAUSALITY",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-13-GOTHAMIST-CABARET",
      "INT-2026-07-13-NPR-NIGHTLIFE",
      "INT-2026-07-13-NYC-COUNCIL-CABARET-VOTE"
    ],
    question: "How should Jamie's and NYC Artist Coalition's contribution to the Cabaret Law repeal be stated relative to the collective campaign and legislative outcome?",
    methods: [
      "Compared contemporaneous Gothamist and NPR reporting with the official Council vote description.",
      "Separated documented advocacy activity, collective mobilization, legislative chronology, final enactment, and causality."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "Jamie organized fire-code study groups and publicly called for full repeal.",
      "NYC Artist Coalition mobilized alongside other organizations under Let NYC Dance.",
      "The Council announced an October 31, 2017 vote on Introduction 1652-A."
    ],
    limitations: [
      "The exact final signed-law record was not added in this run.",
      "The reviewed sources do not allocate causal shares among advocates, legislators, officials, and partner organizations."
    ],
    sourceIds: [
      "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
      "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
      "SRC-NYC-COUNCIL-CABARET-VOTE-2017"
    ]
  }
] satisfies ResearchInquiry[];
