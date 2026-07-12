import type {
  ClaimRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const portfolioHistorySources = [
  {
    id: "SRC-WATERWAYS-PITCH-2007-08-09",
    title: "When Artists Turn Huck Finn",
    organization: "The Pitch",
    author: "Eric Barton",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-08-09",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
    preferredPublicUrl: "canonical",
    publicCitation: "Eric Barton, 'When Artists Turn Huck Finn,' The Pitch, August 9, 2007.",
    publicNote: "The article identifies Jamie as originating the experiential raft expedition and connects it to his research into Kansas City's transportation history and relationship to the Missouri River.",
    supportsGenerally: [
      "Jamie originated the raft expedition idea",
      "Jamie participated in the collaborative raft expedition",
      "the raft was built from recycled materials",
      "the group traveled across Missouri",
      "the project investigated Kansas City's relationship to the Missouri River"
    ],
    doesNotEstablish: [
      "that Jamie acted alone",
      "the complete route to the Gulf of Mexico",
      "a complete participant roster",
      "all later waterways programs"
    ]
  },
  {
    id: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
    title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
    organization: "Charlotte Street Foundation",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2009-09-01",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
    preferredPublicUrl: "canonical",
    publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' September 1, 2009.",
    publicNote: "The institutional event page describes Jamie as spearheading Great Accommodations and documents its participatory, river-connected exhibition and public programs.",
    supportsGenerally: [
      "Jamie spearheaded Great Accommodations",
      "the project used central rivers as a social network",
      "hundreds of invitations sought river-city stories",
      "the exhibition included participatory installations and public programs",
      "Jamie's published account that he organized the bicycle-powered raft project",
      "Jamie's published account of traveling from Kansas City down the Missouri and Mississippi rivers for four months until the water reached salt"
    ],
    doesNotEstablish: [
      "a complete independent route log",
      "that Jamie created every component alone",
      "the identity or consent status of every participant",
      "current project status"
    ]
  },
  {
    id: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
    title: "Open House",
    organization: "Good Times",
    author: "Laura Mattingly",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2006-06-28",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Laura Mattingly, 'Open House,' Good Times, June 28, 2006.",
    publicNote: "The feature documents Jamie's initiation and facilitation of a 10-day communal-living and participatory-art experiment at UC Santa Cruz, including collective decision-making and distributed documentation.",
    supportsGenerally: [
      "Jamie initiated Open House",
      "the public experiment ran for 10 days",
      "participants shared responsibility and decisions",
      "the project integrated communal living, art, performance, and documentation",
      "the earlier Shop Shows invited broad participation"
    ],
    doesNotEstablish: [
      "that Jamie was the sole author of collective activity",
      "a complete participant list",
      "consent to republish photographs or private participant details",
      "a complete archive of the project"
    ]
  },
  {
    id: "SRC-NYCAC-GOTHAMIST-2017-06-19",
    title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
    organization: "Gothamist",
    author: "Emma Whitford",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-19",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    preferredPublicUrl: "canonical",
    publicCitation: "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
    publicNote: "The reporting identifies Jamie with NYC Artist Coalition, documents his fire-code study-group organizing, and records his City Hall advocacy for full Cabaret Law repeal.",
    supportsGenerally: [
      "Jamie organized fire-code study groups for DIY venues",
      "Jamie rallied at City Hall for full Cabaret Law repeal",
      "Jamie spoke as part of NYC Artist Coalition",
      "Jamie framed the license as a safety barrier for otherwise compliant spaces"
    ],
    doesNotEstablish: [
      "that Jamie acted alone",
      "that Jamie authored the repeal legislation",
      "that one rally caused repeal",
      "that every DIY venue shared one position"
    ]
  },
  {
    id: "SRC-NYCAC-NPR-2017-09-20",
    title: "With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife",
    organization: "NPR Music",
    author: "Jane Lerner",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-20",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    preferredPublicUrl: "canonical",
    publicCitation: "Jane Lerner, 'With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife,' NPR Music, September 20, 2017.",
    publicNote: "The reporting identifies Jamie as a founding member of NYC Artist Coalition, situates the coalition inside the broader repeal movement, and records Jamie's public argument against the discriminatory law.",
    supportsGenerally: [
      "Jamie was a founding member of NYC Artist Coalition",
      "NYC Artist Coalition participated in the Let NYC Dance coalition",
      "Jamie publicly argued for repeal",
      "the Office of Nightlife had been established while repeal advocacy continued"
    ],
    doesNotEstablish: [
      "that Jamie or NYC Artist Coalition acted alone",
      "that Jamie drafted the legislation",
      "sole causality for the Office of Nightlife",
      "sole causality for Cabaret Law repeal"
    ]
  },
  {
    id: "SRC-NYCAC-BEDFORD-BOWERY-NIGHT-MAYOR",
    title: "What Can the Night Mayor Do? The DIY Scene Discusses",
    organization: "Bedford + Bowery",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    preferredPublicUrl: "canonical",
    publicCitation: "Bedford + Bowery, 'What Can the Night Mayor Do? The DIY Scene Discusses,' 2017.",
    publicNote: "The report describes NYC Artist Coalition as spearheading the town hall and as instrumental in advocacy for the Office of Nightlife and Cabaret Law repeal; it identifies Jamie and Olympia Kazi among coalition participants.",
    supportsGenerally: [
      "NYC Artist Coalition spearheaded the Office of Nightlife town hall",
      "the coalition was described as instrumental in related advocacy",
      "Jamie participated as an NYC Artist Coalition representative",
      "the event brought cultural-space stakeholders and elected officials together"
    ],
    doesNotEstablish: [
      "Jamie's sole production role",
      "that NYC Artist Coalition acted alone",
      "sole causality for either law",
      "a complete event production roster"
    ]
  },
  {
    id: "SRC-NYCAC-LET-NYC-DANCE",
    title: "Let NYC Dance - Movement to Repeal the Cabaret Law",
    organization: "NYC Artist Coalition / Let NYC Dance coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://letnycdance.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Let NYC Dance public campaign website.",
    publicNote: "The public campaign site documents coalition membership, Council outreach, campaign materials, town-hall and protest assets, and the eventual repeal of the Cabaret Law.",
    supportsGenerally: [
      "NYC Artist Coalition participated in the Let NYC Dance coalition",
      "the campaign organized public Council outreach",
      "the campaign maintained public press and action materials",
      "the Cabaret Law was repealed"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the campaign",
      "sole causality for repeal",
      "the complete history of Cabaret Law opposition",
      "individual authorship of every campaign asset"
    ]
  },
  {
    id: "SRC-NYCAC-TALKS-NOT-RAIDS",
    title: "Talks Not Raids: Transparency on M.A.R.C.H. Raids in NYC",
    organization: "NYC Artist Coalition / Talks Not Raids coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://talksnotraids.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Talks Not Raids public campaign website.",
    publicNote: "The site documents a coalition campaign for transparency and accountability around M.A.R.C.H. operations, Council outreach, public materials, coalition members, and support for Intro 1156.",
    supportsGenerally: [
      "a Talks Not Raids coalition campaign existed",
      "NYC Artist Coalition participated",
      "the campaign supported Intro 1156",
      "the campaign organized public Council outreach",
      "the campaign framed transparency and engagement as alternatives to raids"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship",
      "that the campaign alone enacted Intro 1156",
      "that the campaign alone caused the later replacement of MARCH",
      "the accuracy of every historical aggregate without underlying records"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
    title: "New York City Council Committee on Justice System hearing transcript on Intro 1156",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-02-11",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Committee on Justice System hearing transcript on Intro 1156, February 11, 2019.",
    publicNote: "The transcript records Jamie testifying on behalf of NYC Artist Coalition for Talks Not Raids, describing fire-safety work and collective advocacy around the Office of Nightlife and M.A.R.C.H. transparency.",
    supportsGenerally: [
      "Jamie testified for Talks Not Raids",
      "Jamie represented NYC Artist Coalition",
      "Jamie described coalition fire-safety workshops and study groups",
      "Jamie called for MARCH transparency",
      "Jamie described collective advocacy around the Office of Nightlife"
    ],
    doesNotEstablish: [
      "independent verification of every assertion in testimony",
      "sole causality for the Office of Nightlife",
      "sole causality for Intro 1156",
      "sole causality for the later replacement of MARCH"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-INTRO-1156-2018",
    title: "Intro 1156-2018 legislative record",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-10-17",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342&Options=ID%7CText%7C&Search=1156",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council legislative record for Intro 1156-2018, enacted as Local Law 220 of 2019.",
    publicNote: "The official record documents the legislation's reporting and notice requirements, enactment, date, law number, and Council sponsors.",
    supportsGenerally: [
      "Intro 1156 was enacted",
      "the enactment date was December 15, 2019",
      "the law number is 2019/220",
      "the law required MARCH reporting and notice provisions",
      "the official sponsor list"
    ],
    doesNotEstablish: [
      "Jamie as a legislative sponsor",
      "Jamie as the bill author",
      "sole campaign causality",
      "that the 2019 law itself ended MARCH"
    ]
  },
  {
    id: "SRC-NYC-MAYOR-CURE-2023-12-28",
    title: "Mayor Adams launches CURE and phases out MARCH enforcement",
    organization: "NYC Mayor's Office",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2023-12-28",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.nyc.gov/mayors-office/news/2023/12/mayor-adams-launches-effort-enhance-nightlife-safety-strengthen-small-businesses-phasing",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Mayor's Office, announcement of CURE replacing MARCH enforcement, December 28, 2023.",
    publicNote: "The announcement documents the replacement of MARCH with the engagement-first CURE process and credits many years of collective effort without attributing the outcome to one advocate or campaign.",
    supportsGenerally: [
      "CURE replaced MARCH",
      "the announcement date was December 28, 2023",
      "CURE requires direct communication before escalated enforcement",
      "the change involved years of collective effort"
    ],
    doesNotEstablish: [
      "that Jamie or NYC Artist Coalition alone caused the change",
      "that Intro 1156 alone caused CURE",
      "that all nightlife enforcement ended",
      "that every stakeholder agreed on the reform"
    ]
  }
] satisfies SourceRecord[];

export const portfolioHistoryClaims = [
  {
    id: "CLM-WATERWAYS-RAFT-EXPEDITION",
    project: "waterways-participatory-practice",
    internalClaim: "Jamie conceived and organized a collaborative bicycle-powered raft expedition from Kansas City down the Missouri and Mississippi rivers; in a published first-person account, he described a four-month journey that reached salt water.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie conceived and organized a collaborative bicycle-powered raft expedition from Kansas City down the Missouri and Mississippi rivers; in a published first-person account, he described traveling for four months until the water reached salt.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"] },
      { key: "about", text: "Conceived and organized a four-month collaborative raft journey from Kansas City down the Missouri and Mississippi rivers.", status: "hold", citationRequired: true, surfaces: [], rationale: "Strong historical depth, but hold from the current hiring narrative until a visual artifact and concise bridge to Jamie's present operating practice are ready." }
    ],
    evidence: [
      { sourceId: "SRC-WATERWAYS-PITCH-2007-08-09", relationship: "direct-support", supports: ["Jamie originated the raft expedition idea", "the project investigated Kansas City's relationship to the Missouri River"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01", relationship: "direct-support", supports: ["Jamie's published account that he organized the bicycle-powered raft project", "Jamie's published account of traveling from Kansas City down the Missouri and Mississippi rivers for four months until the water reached salt"], publicNote: "Charlotte Street reproduces Jamie's first-person retrospective account; it is public evidence of his account, not an independent route log.", confidence: "moderate", renderCitation: true }
    ],
    boundaries: ["Describe the expedition as collaborative.", "Route and duration details are Jamie's published first-person retrospective account, not an independently corroborated complete route log.", "Use 'reached salt water' rather than 'reached the Gulf of Mexico' unless a complete route log independently confirms that terminus."],
    antiClaims: ["Jamie completed the expedition alone.", "The reviewed sources independently establish every stop or participant."],
    researchInquiryIds: ["INQ-WATERWAYS-FULL-PROGRAM-CORPUS"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
    project: "waterways-participatory-practice",
    internalClaim: "Jamie spearheaded Great Accommodations, a participatory exhibition and public-program system that treated connected rivers as a social network linking river cities, stories, and possible ways of living.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie spearheaded Great Accommodations, a participatory exhibition and public-program system that used connected rivers as a social network for stories, collaboration, and imagining life in river cities.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"] },
      { key: "about", text: "Built participatory public programs around how rivers connect cities, stories, and people.", status: "hold", citationRequired: true, surfaces: [], rationale: "Hold until the About page can add this range without displacing the clearer technical-operations positioning." },
      { key: "photo-brief", text: "Look for the inflatable environment, river correspondence, public programs, participatory installations, and working documentation associated with Great Accommodations.", status: "hold", citationRequired: false, surfaces: [], rationale: "Use privately for photo research; do not publish until image context, authorship, rights, and participant consent are reviewed." }
    ],
    evidence: [
      { sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01", relationship: "direct-support", supports: ["Jamie spearheaded Great Accommodations", "the project used central rivers as a social network", "the exhibition included participatory installations and public programs"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Credit Suzanne Hogan and other collaborators when discussing specific correspondence or components.", "Do not imply current program status."],
    antiClaims: ["Jamie created every component alone.", "The exhibition represented every river community."],
    researchInquiryIds: ["INQ-WATERWAYS-FULL-PROGRAM-CORPUS"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-OPEN-HOUSE-PARTICIPATORY-PRACTICE",
    project: "open-house-participatory-practice",
    internalClaim: "Jamie initiated and facilitated Open House, a 10-day public experiment at UC Santa Cruz that combined communal living, participatory art, collective decision-making, and distributed documentation.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie initiated and facilitated Open House, a 10-day public experiment at UC Santa Cruz combining communal living, participatory art, collective decision-making, and distributed documentation.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"] },
      { key: "about", text: "Initiated and tended a 10-day communal, participatory art environment built around shared responsibility and documentation.", status: "hold", citationRequired: true, surfaces: [], rationale: "Hold until the site can explain the relationship between this early participatory practice and Jamie's current work without adding excessive reading burden." },
      { key: "photo-brief", text: "Look for the Porter Bridge Gallery household, participant-made installations, shared documentation tools, Shop Shows, and inflatable screening environment.", status: "hold", citationRequired: false, surfaces: [], rationale: "Use as a private selection brief only; participant identity, context, authorship, rights, and consent require review." }
    ],
    evidence: [
      { sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28", relationship: "direct-support", supports: ["Jamie initiated Open House", "the public experiment ran for 10 days", "participants shared responsibility and decisions", "the project integrated communal living, art, performance, and documentation"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Collective decisions and participant work remain collectively credited.", "Do not republish participant identities, images, or private details without review."],
    antiClaims: ["Jamie was the sole author of participant activity.", "Every participant consented to future republication."],
    researchInquiryIds: ["INQ-PHOTO-ARCHIVE-CLAIM-DISCOVERY"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCAC-CABARET-ADVOCACY",
    project: "nyc-artist-coalition",
    internalClaim: "As a founding member of NYC Artist Coalition, Jamie organized fire-code study groups, rallied at City Hall, and spoke publicly for repeal of the discriminatory Cabaret Law inside the broader Let NYC Dance coalition.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "As a founding member of NYC Artist Coalition, Jamie organized fire-code study groups, rallied at City Hall, and spoke publicly for Cabaret Law repeal inside the broader Let NYC Dance coalition.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"] },
      { key: "case-study", text: "Organized safety study groups and public advocacy for Cabaret Law repeal as a founding member of NYC Artist Coalition, working inside a broad coalition that won repeal.", status: "hold", citationRequired: true, surfaces: [], rationale: "Hold pending a dedicated NYC Artist Coalition case-study composition that can preserve decades of prior advocacy and coalition credit." }
    ],
    evidence: [
      { sourceId: "SRC-NYCAC-GOTHAMIST-2017-06-19", relationship: "direct-support", supports: ["Jamie organized fire-code study groups for DIY venues", "Jamie rallied at City Hall for full Cabaret Law repeal", "Jamie spoke as part of NYC Artist Coalition"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCAC-NPR-2017-09-20", relationship: "corroborating", supports: ["Jamie was a founding member of NYC Artist Coalition", "Jamie publicly argued for repeal", "NYC Artist Coalition participated in the Let NYC Dance coalition"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCAC-LET-NYC-DANCE", relationship: "context", supports: ["NYC Artist Coalition participated in the Let NYC Dance coalition", "the campaign organized public Council outreach", "the Cabaret Law was repealed"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Cabaret Law repeal was a collective accomplishment with decades of prior advocacy.", "Do not claim Jamie drafted the legislation or caused repeal alone."],
    antiClaims: ["Jamie alone repealed the Cabaret Law.", "NYC Artist Coalition was the only repeal organization."],
    researchInquiryIds: ["INQ-NYCAC-JAMIE-ROLE-CAUSALITY"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCAC-OFFICE-NIGHTLIFE-TOWN-HALL",
    project: "nyc-artist-coalition",
    internalClaim: "Contemporaneous reporting described NYC Artist Coalition as instrumental in advocacy for the Office of Nightlife and as spearheading a town hall where small, diverse cultural-space stakeholders addressed elected officials; Jamie participated as a founding coalition member.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Contemporaneous reporting described NYC Artist Coalition as instrumental in Office of Nightlife advocacy and as spearheading a town hall where small, diverse cultural-space stakeholders addressed elected officials; Jamie participated as a founding coalition member.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"] },
      { key: "case-study", text: "Worked as a founding NYC Artist Coalition member while the coalition advocated for the Office of Nightlife and spearheaded a public town hall centered on small, diverse cultural spaces.", status: "hold", citationRequired: true, surfaces: [], rationale: "Hold until production records or collaborator testimony can distinguish Jamie's individual town-hall work from the coalition role established by reporting." }
    ],
    evidence: [
      { sourceId: "SRC-NYCAC-BEDFORD-BOWERY-NIGHT-MAYOR", relationship: "direct-support", supports: ["NYC Artist Coalition spearheaded the Office of Nightlife town hall", "the coalition was described as instrumental in related advocacy", "Jamie participated as an NYC Artist Coalition representative"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCAC-NPR-2017-09-20", relationship: "context", supports: ["Jamie was a founding member of NYC Artist Coalition", "the Office of Nightlife had been established while repeal advocacy continued"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["The reporting supports the coalition's role more strongly than Jamie's exact individual production credit.", "Do not claim Jamie or NYC Artist Coalition created the Office alone."],
    antiClaims: ["Jamie alone created the Office of Nightlife.", "Jamie was the sole town-hall producer."],
    researchInquiryIds: ["INQ-NYCAC-JAMIE-ROLE-CAUSALITY"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-TALKS-NOT-RAIDS-ADVOCACY",
    project: "talks-not-raids",
    internalClaim: "Jamie testified before the New York City Council on behalf of NYC Artist Coalition for Talks Not Raids, describing coalition safety work and calling for transparency and engagement around M.A.R.C.H. operations; the public campaign organized Council outreach for Intro 1156.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie testified before the New York City Council on behalf of NYC Artist Coalition for Talks Not Raids, describing coalition safety work and calling for transparency and engagement around M.A.R.C.H. operations; the campaign organized Council outreach for Intro 1156.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"] },
      { key: "case-study", text: "Helped turn nightlife-enforcement concerns into public testimony, a Council action campaign, and a transparency bill that became law.", status: "hold", citationRequired: true, surfaces: [], rationale: "Hold for a dedicated case-study sequence that clearly separates Jamie's testimony and campaign work from legislative sponsorship and enactment." }
    ],
    evidence: [
      { sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11", relationship: "direct-support", supports: ["Jamie testified for Talks Not Raids", "Jamie represented NYC Artist Coalition", "Jamie described coalition fire-safety workshops and study groups", "Jamie called for MARCH transparency"], locator: "Committee transcript pages 90-92", confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCAC-TALKS-NOT-RAIDS", relationship: "corroborating", supports: ["a Talks Not Raids coalition campaign existed", "NYC Artist Coalition participated", "the campaign supported Intro 1156", "the campaign organized public Council outreach"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-INTRO-1156-2018", relationship: "context", supports: ["Intro 1156 was enacted", "the law required MARCH reporting and notice provisions"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["The transcript records Jamie's testimony; it does not independently verify every statement within it.", "The legislation had elected sponsors and collective advocates."],
    antiClaims: ["Jamie authored Intro 1156.", "Jamie enacted the law alone."],
    researchInquiryIds: ["INQ-NYCAC-MARCH-TO-CURE-CAUSALITY"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-MARCH-TRANSPARENCY-TO-CURE",
    project: "talks-not-raids",
    internalClaim: "The Talks Not Raids campaign advocated M.A.R.C.H. transparency; Intro 1156 became Local Law 220 of 2019; in 2023 New York City replaced M.A.R.C.H. with the engagement-first CURE process after years of collective effort.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Talks Not Raids advocated M.A.R.C.H. transparency; Intro 1156 became Local Law 220 of 2019; and in 2023 New York City replaced M.A.R.C.H. with the engagement-first CURE process after years of collective effort.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"] },
      { key: "case-study", text: "Part of a multi-year public arc from transparency advocacy and enacted reporting requirements to the city's replacement of M.A.R.C.H. with an engagement-first process.", status: "hold", citationRequired: true, surfaces: [], rationale: "Hold until a public narrative can show the documented sequence without implying that Jamie, one campaign, or one law solely caused CURE." }
    ],
    evidence: [
      { sourceId: "SRC-NYCAC-TALKS-NOT-RAIDS", relationship: "direct-support", supports: ["the campaign supported Intro 1156", "the campaign framed transparency and engagement as alternatives to raids"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-INTRO-1156-2018", relationship: "direct-support", supports: ["Intro 1156 was enacted", "the enactment date was December 15, 2019", "the law number is 2019/220", "the law required MARCH reporting and notice provisions"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-MAYOR-CURE-2023-12-28", relationship: "direct-support", supports: ["CURE replaced MARCH", "CURE requires direct communication before escalated enforcement", "the change involved years of collective effort"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["This is a documented sequence, not proof that one campaign or person solely caused CURE.", "CURE replaced MARCH; it did not end all nightlife enforcement."],
    antiClaims: ["Jamie alone disbanded M.A.R.C.H.", "Intro 1156 automatically ended M.A.R.C.H.", "CURE eliminated all enforcement."],
    researchInquiryIds: ["INQ-NYCAC-MARCH-TO-CURE-CAUSALITY"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  }
] satisfies ClaimRecord[];

export const portfolioHistoryInquiries = [
  {
    id: "INQ-WATERWAYS-FULL-PROGRAM-CORPUS",
    project: "waterways-participatory-practice",
    question: "What is the complete chronology, route, collaborator network, public-program inventory, and surviving artifact set for Jamie's raft and waterways practice?",
    methods: [
      "Reviewed the supplied Pitch article and Charlotte Street institutional event page.",
      "Separated direct reporting from Jamie's quoted retrospective account.",
      "Recorded route, duration, program, and collaboration limits as claim boundaries."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "The Pitch attributes the expedition concept to Jamie and documents the recycled-material raft project.",
      "Charlotte Street documents Great Accommodations and quotes Jamie's account of a four-month journey reaching salt water.",
      "The reviewed sources support a substantial participatory waterways practice but not its complete chronology or artifact corpus."
    ],
    limitations: [
      "No complete route log or participant roster was reviewed.",
      "Some route details are preserved as Jamie's quoted account rather than independent contemporaneous reporting.",
      "Photographs, correspondence, video, and additional programs remain to be inventoried and reviewed for rights and consent."
    ],
    sourceIds: ["SRC-WATERWAYS-PITCH-2007-08-09", "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01"],
    publicSummary: "Public reporting and an institutional exhibition record establish Jamie's collaborative raft expedition and participatory waterways practice; the complete route, collaborator, program, and artifact corpus remains under research."
  },
  {
    id: "INQ-NYCAC-JAMIE-ROLE-CAUSALITY",
    project: "nyc-artist-coalition",
    question: "What exact individual and collective roles did Jamie and NYC Artist Coalition play in creating the Office of Nightlife, producing public town halls, and winning Cabaret Law repeal?",
    methods: [
      "Reviewed supplied Gothamist and NPR reporting.",
      "Reviewed Bedford + Bowery reporting on the Office of Nightlife town hall.",
      "Reviewed the Let NYC Dance campaign site and separated coalition outcomes from individual authorship."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "Jamie is publicly identified as a founding member of NYC Artist Coalition and as an organizer and speaker for repeal.",
      "Bedford + Bowery described NYC Artist Coalition as instrumental in the advocacy and as spearheading the town hall.",
      "The sources support a significant collective coalition role more strongly than a complete individual production or legislative-authoring account."
    ],
    limitations: [
      "A full event production record and collaborator testimony were not reviewed.",
      "Legislative sponsorship and drafting belonged to elected officials and government staff.",
      "Decades of prior advocacy and a broad coalition contributed to repeal."
    ],
    sourceIds: ["SRC-NYCAC-GOTHAMIST-2017-06-19", "SRC-NYCAC-NPR-2017-09-20", "SRC-NYCAC-BEDFORD-BOWERY-NIGHT-MAYOR", "SRC-NYCAC-LET-NYC-DANCE"],
    publicSummary: "Public reporting supports Jamie's founding, organizing, speaking, and coalition role, and describes NYC Artist Coalition as instrumental in the advocacy; exact individual production and causal attribution remains bounded and under research."
  },
  {
    id: "INQ-NYCAC-MARCH-TO-CURE-CAUSALITY",
    project: "talks-not-raids",
    question: "How should Jamie's and NYC Artist Coalition's Talks Not Raids work be situated in the causal chain from M.A.R.C.H. transparency advocacy to Local Law 220 and the 2023 CURE replacement?",
    methods: [
      "Reviewed the Talks Not Raids campaign site.",
      "Reviewed Jamie's 2019 City Council testimony and the official Intro 1156 legislative record.",
      "Reviewed the 2023 Mayor's Office announcement replacing MARCH with CURE."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "Jamie publicly testified for Talks Not Raids and transparency on MARCH operations.",
      "The campaign organized Council outreach for Intro 1156, which became Local Law 220 of 2019.",
      "The city replaced MARCH with CURE in 2023 and described the change as the result of years of collective effort."
    ],
    limitations: [
      "The reviewed record does not establish a single causal path from the campaign to CURE.",
      "Many advocates, officials, Office of Nightlife staff, agencies, businesses, and communities contributed.",
      "Further collaborator testimony and policy-history review would be needed for a stronger individual-role claim."
    ],
    sourceIds: ["SRC-NYCAC-TALKS-NOT-RAIDS", "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11", "SRC-NYC-COUNCIL-INTRO-1156-2018", "SRC-NYC-MAYOR-CURE-2023-12-28"],
    publicSummary: "The public record supports Jamie's testimony and campaign role, enactment of MARCH transparency requirements, and the later collective transition to CURE; sole or linear causality is not established."
  },
  {
    id: "INQ-CALLNYC-COUNCIL-ENGAGEMENT",
    project: "callnyc",
    question: "Which New York City Council member accounts engaged with CallNYC, through what interaction types, over what period, and against what complete denominator?",
    methods: [
      "Defined the required account roster, interaction taxonomy, date range, capture method, and missing-post limitations.",
      "Deferred quantitative scoring until an authenticated or archival timeline capture can be preserved and independently checked."
    ],
    runAt: "2026-07-12",
    resultStatus: "open",
    findings: [
      "Council-account engagement is a potentially useful quantitative proof.",
      "No complete authenticated or archival engagement dataset was preserved in this public-safe pass."
    ],
    limitations: [
      "Public timelines may be incomplete or access-limited.",
      "Deleted posts and changed account identities can affect counts.",
      "A defensible metric requires a declared denominator and deduplication method."
    ],
    sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"],
    publicSummary: "Council-account engagement with CallNYC remains an open quantitative research inquiry pending a complete, reproducible capture and denominator."
  },
  {
    id: "INQ-PHOTO-ARCHIVE-CLAIM-DISCOVERY",
    project: "cross-project-photo-archive",
    question: "Which public-safe photographs can corroborate known projects or reveal new research leads without turning visual inference into an automatic claim?",
    methods: [
      "Defined a feedback loop from eligible claims to photo-editor briefs and from visual leads back to intake.",
      "Required rights, consent, identity, date, location, and project-context review before public use."
    ],
    runAt: "2026-07-12",
    resultStatus: "open",
    findings: [
      "The current claim graph can generate project-specific photo-editor briefs.",
      "No photograph is promoted or published by this framework record."
    ],
    limitations: [
      "The photo corpus was not inspected in this pass.",
      "Visual similarity alone cannot establish date, identity, authorship, consent, or project meaning.",
      "Private photo locators must remain outside the public repository."
    ],
    sourceIds: [],
    publicSummary: "Photo-editor review is modeled as a reciprocal research process: claims can guide selection, and visual leads can open inquiries, but images do not automatically become evidence or public claims."
  },
  {
    id: "INQ-WATERWAYS-PHOTO-SELECTS",
    project: "waterways-participatory-practice",
    question: "Can a public-safe, rights-cleared image or photographed artifact make the raft expedition or Great Accommodations claims more inspectable without exposing participants or private archive structure?",
    methods: [
      "Generated a bounded search brief from mature waterways claims and their held photo projection.",
      "Required context, date, authorship, rights, participant consent, and source corroboration before an image can support a claim or enter a public projection."
    ],
    runAt: "2026-07-12",
    resultStatus: "open",
    findings: [
      "The mature waterways record identifies concrete visual subjects worth searching for.",
      "No candidate image or private locator was reviewed or published in this pass."
    ],
    limitations: [
      "The private photo archive was not inspected in this lifecycle run.",
      "A photograph alone cannot establish project meaning, identity, date, authorship, rights, or consent."
    ],
    sourceIds: [],
    publicSummary: "The waterways claims have generated a specific, bounded photo-research inquiry; no image has been selected or promoted."
  }
] satisfies ResearchInquiry[];
