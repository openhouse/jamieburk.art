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
    id: "SRC-WATERWAYS-KC-STAR-2007-11-15",
    title: "In the name of art, go with the flow",
    organization: "The Kansas City Star",
    author: "Darryl Levings",
    kind: "published-article",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2007-11-15",
    accessedAt: "2026-07-16",
    publicCitation: "Darryl Levings, 'In the name of art, go with the flow,' The Kansas City Star, November 15, 2007, pp. A1 and A4; protected reader-provided PDF reviewed July 16, 2026.",
    publicNote: "The two-page front-page feature independently documents the collaborative bicycle-powered raft, attributes the originating idea to Jamie, reports the three-week build and more than 1,000 miles traveled, describes the project as a living river experience centered on meeting people, and attributes to Jamie the possibility that the river could awaken cultural connection between river communities.",
    protectedLocatorId: "ARCHIVE-WATERWAYS-KC-STAR-2007-11-15",
    supportsGenerally: [
      "the raft-expedition idea originated with Jamie",
      "the craft was built in three weeks from reused materials",
      "the roughly 12-by-13-foot craft used two bicycles linked to a paddlewheel",
      "the expedition had passed the 1,000-mile marker by November 2007",
      "the crew spent 51 days stranded after a Coast Guard interruption and resumed after repairs",
      "the project was framed as a living experience on the rivers and an encounter with people along them",
      "friends joined or left the raft at multiple river cities",
      "Jamie invited people met along the way to join the raft",
      "Jamie described the river as a possible cultural connection between Kansas City's West Bottoms and Delta towns"
    ],
    doesNotEstablish: [
      "that Jamie acted alone",
      "that Jamie personally performed every construction task",
      "the later Gulf of Mexico terminus",
      "a complete route or participant roster",
      "permission to republish the supplied PDF or its photographs",
      "that every person or community encountered shared Jamie's interpretation"
    ],
    media: {
      mediaKind: "document",
      rightsStatus: "permission-needed",
      consentStatus: "review-needed",
      publicDisplayStatus: "metadata-only",
      visibleText: ["In the name of art, go with the flow"]
    }
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
      "Margaret Morse described Jamie as tending the experiment",
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
    preservationStatus: "live-and-archived",
    publishedAt: "2017-06-19",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    archiveUrl: "https://web.archive.org/web/20190507132352/http://gothamist.com/2017/06/19/cabaret_law_nyc.php",
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
    preservationStatus: "live-and-archived",
    publishedAt: "2017-09-20",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    archiveUrl: "https://web.archive.org/web/20251028172606/https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
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
    preservationStatus: "live-and-archived",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    archiveUrl: "https://web.archive.org/web/20260106102010/https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
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
    internalClaim: "Jamie conceived, co-built, and organized a collaborative bicycle-powered raft expedition from Kansas City down the Missouri and Mississippi rivers; independent reporting says he and Libby Hendon spent weeks constructing the recycled-material raft, the group traveled more than 1,000 miles before a Coast Guard interruption, and the crew later reached the Gulf of Mexico four months after leaving Kansas City.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie conceived, co-built, and organized a collaborative bicycle-powered raft expedition from Kansas City down the Missouri and Mississippi rivers. Independent reporting says he and Libby Hendon spent weeks constructing the recycled-material raft, the group traveled more than 1,000 miles before a Coast Guard interruption, and the crew later reached the Gulf after four months.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"], rationale: "Retain in the historical bank because it establishes initiative, hands-on implementation, duration, and independently corroborated terminus; hold from hiring pages until an inspectable artifact and concise present-day bridge are ready." },
      { key: "about", text: "Conceived and organized a collaborative raft project whose crew reached the Gulf of Mexico four months after leaving Kansas City.", status: "hold", citationRequired: true, surfaces: [], rationale: "Strong historical depth, but hold from the current hiring narrative until a visual artifact and concise bridge to Jamie's present operating practice are ready." }
    ],
    evidence: [
      { sourceId: "SRC-WATERWAYS-PITCH-2007-08-09", relationship: "direct-support", supports: ["Jamie originated the raft expedition idea", "the project investigated Kansas City's relationship to the Missouri River"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15", relationship: "corroborating", supports: ["the raft-expedition idea originated with Jamie", "the craft was built in three weeks from reused materials", "the roughly 12-by-13-foot craft used two bicycles linked to a paddlewheel", "the expedition had passed the 1,000-mile marker by November 2007", "the crew spent 51 days stranded after a Coast Guard interruption and resumed after repairs"], publicNote: "The protected PDF supplies unusually detailed contemporaneous implementation evidence. Its metadata and bounded findings may remain in the public bank, but the PDF and photographs are not approved for republication.", confidence: "high", renderCitation: false },
      { sourceId: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12", relationship: "corroborating", supports: ["Jamie Burkart and Libby Hendon's participation", "their weeks spent constructing the recycled-material raft", "the expedition's public title", "more than 1,000 miles traveled before the reported Coast Guard interruption"], publicNote: "This independent mid-journey report adds direct implementation evidence and a dated route checkpoint; it does not establish the later Gulf terminus or a complete route.", confidence: "high", renderCitation: true },
      { sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01", relationship: "direct-support", supports: ["Jamie's published account that he organized the bicycle-powered raft project", "Jamie's published account of traveling from Kansas City down the Missouri and Mississippi rivers for four months until the water reached salt"], publicNote: "Charlotte Street reproduces Jamie's first-person retrospective account; it is public evidence of his account, not an independent route log.", confidence: "moderate", renderCitation: true },
      { sourceId: "SRC-WATERWAYS-PITCH-GULF-2009-09-03", relationship: "corroborating", supports: ["Jamie and the raft crew reached the Gulf of Mexico", "the journey lasted four months"], publicNote: "The Pitch independently corroborates the collaborative crew's Gulf terminus and four-month duration, but it is not a complete route log.", confidence: "high", renderCitation: true }
    ],
    boundaries: ["Describe the expedition as collaborative.", "The Kansas City Star supports a three-week build and detailed craft description, not Jamie's sole authorship of every construction task.", "The later report independently corroborates the Gulf terminus and four-month duration, not every stop, participant, or route detail.", "Do not republish the protected newspaper PDF or its photographs without rights and consent review."],
    antiClaims: ["Jamie completed the expedition alone.", "The reviewed sources independently establish every stop or participant."],
    researchInquiryIds: ["INQ-WATERWAYS-FULL-PROGRAM-CORPUS"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex public-source review", "Codex Facebook-events source maturation review", "Codex Kansas City Star source review"]
  },
  {
    id: "CLM-WATERWAYS-PARTICIPATORY-RIVER-PRACTICE",
    project: "waterways-participatory-practice",
    internalClaim: "Contemporaneous Kansas City Star reporting documents the 2007 raft expedition as a participatory public practice: the crew stopped to meet people, friends joined and left at river cities, Jamie invited people encountered along the way aboard, and he articulated the river as a possible cultural connection between Kansas City's West Bottoms and Delta towns.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "The 2007 raft expedition functioned as a participatory river practice: the crew stopped to meet people, friends joined and left in river cities, Jamie invited people encountered along the way aboard, and he described the river as a possible cultural connection between Kansas City's West Bottoms and Delta towns.", status: "active", citationRequired: false, surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"], rationale: "Preserve the independently reported public-purpose and participation model in the historical bank without exposing the protected newspaper artifact." },
      { key: "about", text: "Built a collaborative river expedition as a moving public encounter, inviting people aboard and exploring cultural connection between river communities.", status: "hold", citationRequired: false, surfaces: [], rationale: "This sharpens the participatory-practice throughline, but the current About page already carries that argument through Open House; hold until the audience and composition benefit from another historical example." },
      { key: "photo-brief", text: "Look for rights-clearable evidence of the bicycle-powered raft, its reused-material construction, people joining or meeting the crew, river-city stops, repairs, and the relation between craft and public encounter.", status: "hold", citationRequired: false, surfaces: [], rationale: "Use only as a private photo-research brief; the newspaper photographs and supplied PDF remain metadata-only pending rights and consent review." }
    ],
    evidence: [
      { sourceId: "SRC-WATERWAYS-KC-STAR-2007-11-15", relationship: "direct-support", supports: ["the project was framed as a living experience on the rivers and an encounter with people along them", "friends joined or left the raft at multiple river cities", "Jamie invited people met along the way to join the raft", "Jamie described the river as a possible cultural connection between Kansas City's West Bottoms and Delta towns"], publicNote: "This is a bounded interpretation of reported actions and Jamie's attributed contemporaneous statement, not a claim that every community shared the same interpretation.", confidence: "high", renderCitation: false }
    ],
    boundaries: ["Describe the project and travel as collaborative.", "Attribute the cultural-connection interpretation to Jamie rather than to every participant or river community.", "Do not infer attendance, endorsement, or outcomes beyond the encounters the article reports.", "Do not republish the protected PDF, newspaper design, or photographs without rights and consent review."],
    antiClaims: ["Jamie alone created the expedition or every encounter.", "Every person encountered joined the raft or endorsed the project.", "The article proves lasting cultural or policy outcomes."],
    researchInquiryIds: ["INQ-WATERWAYS-FULL-PROGRAM-CORPUS"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex Kansas City Star source review"]
  },
  {
    id: "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
    project: "waterways-participatory-practice",
    internalClaim: "Jamie spearheaded Great Accommodations, a participatory exhibition and public-program system that treated connected rivers as a social network linking river cities, stories, and possible ways of living.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie spearheaded Great Accommodations, a participatory exhibition and public-program system that used connected rivers as a social network for stories, collaboration, and imagining life in river cities.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"], rationale: "Retain as public-safe depth for participatory-program and civic-engagement compositions without displacing the current technical-operations narrative." },
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
    internalClaim: "Jamie initiated and tended Open House, a 10-day public experiment at UC Santa Cruz that combined communal living, participatory art, collective decision-making, and distributed documentation.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie initiated and tended Open House, a 10-day public experiment at UC Santa Cruz combining communal living, participatory art, collective decision-making, and distributed documentation.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-practice"], rationale: "Retain in the public-safe historical bank because it establishes an early, source-backed throughline of participation infrastructure and collective governance without adding it to the current hiring site." },
      { key: "about", text: "Long before I called this operations, I initiated and tended Open House, a 10-day communal gallery experiment organized around shared responsibility, public art-making, and distributed documentation.", status: "active", citationRequired: true, surfaces: ["/about"], rationale: "The About page now gives this early participatory practice one compact threshold that connects artistic, social, civic, and technical work without displacing the hiring narrative." },
      { key: "photo-brief", text: "Look for the Porter Bridge Gallery household, participant-made installations, shared documentation tools, Shop Shows, and inflatable screening environment.", status: "hold", citationRequired: false, surfaces: [], rationale: "Use as a private selection brief only; participant identity, context, authorship, rights, and consent require review." }
    ],
    evidence: [
      { sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28", relationship: "direct-support", supports: ["Jamie initiated Open House", "Margaret Morse described Jamie as tending the experiment", "the public experiment ran for 10 days", "participants shared responsibility and decisions", "the project integrated communal living, art, performance, and documentation"], locator: "Profile sections 'Open House,' 'UCSC Staff Investigates The Open House,' and 'A Tradition of Experiment'", confidence: "high", renderCitation: true }
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
      { key: "archive-note", text: "As a founding member of NYC Artist Coalition, Jamie organized fire-code study groups, rallied at City Hall, and spoke publicly for Cabaret Law repeal inside the broader Let NYC Dance coalition.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"], rationale: "Retain Jamie's specific documented labor in the public-safe bank while reserving a full case study for a composition that can carry decades of coalition credit." },
      { key: "case-study", text: "Organized safety study groups and public advocacy for Cabaret Law repeal as a founding member of NYC Artist Coalition, working inside a broad coalition that won repeal.", status: "active", citationRequired: true, surfaces: ["/work/nyc-artist-coalition"], rationale: "The dedicated NYC Artist Coalition composition now carries Jamie's specific work together with decades of prior advocacy and broad coalition credit." }
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
      { key: "archive-note", text: "Contemporaneous reporting described NYC Artist Coalition as instrumental in Office of Nightlife advocacy and as spearheading a town hall where small, diverse cultural-space stakeholders addressed elected officials; Jamie participated as a founding coalition member.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"], rationale: "Retain the strong coalition-level record in the bank, with Jamie's narrower documented participation visible, while individual production attribution remains under inquiry." },
      { key: "case-study", text: "Worked as a founding NYC Artist Coalition member while the coalition advocated for the Office of Nightlife and spearheaded a public town hall centered on small, diverse cultural spaces.", status: "active", citationRequired: true, surfaces: ["/work/nyc-artist-coalition"], rationale: "The dedicated composition uses the bounded founding-member participation supported by reporting and keeps individual town-hall production attribution open." }
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
      { key: "archive-note", text: "Jamie testified before the New York City Council on behalf of NYC Artist Coalition for Talks Not Raids, describing coalition safety work and calling for transparency and engagement around M.A.R.C.H. operations; the campaign organized Council outreach for Intro 1156.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"], rationale: "Retain as direct evidence of Jamie translating community concerns into public testimony; hold from the current site until the legislative and coalition sequence can be shown clearly." },
      { key: "case-study", text: "Testified for Talks Not Raids and supported the coalition's Council action campaign for a transparency bill that became law.", status: "active", citationRequired: true, surfaces: ["/work/nyc-artist-coalition"], rationale: "The dedicated policy sequence separates Jamie's testimony and campaign work from legislative sponsorship and enactment." }
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
      { key: "archive-note", text: "Talks Not Raids advocated M.A.R.C.H. transparency; Intro 1156 became Local Law 220 of 2019; and in 2023 New York City replaced M.A.R.C.H. with the engagement-first CURE process after years of collective effort.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"], rationale: "Retain the documented multi-year sequence in the bank while keeping it off hiring pages until collective causality and Jamie's bounded advocacy role can remain unmistakable." },
      { key: "case-study", text: "Part of a multi-year public arc from transparency advocacy and enacted reporting requirements to the city's replacement of M.A.R.C.H. with an engagement-first process.", status: "active", citationRequired: true, surfaces: ["/work/nyc-artist-coalition"], rationale: "The dedicated composition shows the documented sequence while explicitly rejecting sole causality by Jamie, one campaign, or one law." }
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
      "Reviewed the supplied August 2007 Pitch article, the November 2007 Pitch mid-journey report, the protected two-page November 15, 2007 Kansas City Star front-page feature, the 2009 Pitch follow-up, and the Charlotte Street institutional event page.",
      "Separated direct reporting from Jamie's quoted retrospective account.",
      "Close-read and visually verified both Kansas City Star pages, separating article text, captions, credited photographs, and publication contact details before encoding only public-safe metadata and bounded findings.",
      "Recorded route, duration, program, participation, rights, and collaboration limits as claim boundaries."
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "The Pitch attributes the expedition concept to Jamie and documents the recycled-material raft project.",
      "The Kansas City Star independently attributes the originating idea to Jamie and reports that the roughly 12-by-13-foot bicycle-powered craft was built collaboratively in three weeks from reused materials.",
      "The Kansas City Star says the expedition had passed 1,000 miles, describes a 51-day Coast Guard interruption followed by repairs and resumed travel, and does not establish the later Gulf terminus.",
      "The Kansas City Star documents the project as a living river experience centered on meeting people, reports friends joining or leaving at river cities, records Jamie inviting people encountered aboard, and attributes to him a cultural-connection interpretation linking Kansas City's West Bottoms with Delta towns.",
      "The November 2007 Pitch report says Jamie Burkart and Libby Hendon spent weeks constructing the recycled-material raft.",
      "The November 2007 Pitch report names Jamie Burkart and Libby Hendon and says the collaborative group had traveled more than 1,000 miles before a Coast Guard interruption.",
      "Charlotte Street documents Great Accommodations and quotes Jamie's account of a four-month journey reaching salt water.",
      "The 2009 Pitch follow-up independently reports that Jamie and the collaborative crew reached the Gulf of Mexico four months after leaving Kansas City.",
      "The reviewed sources support a substantial participatory waterways practice but not its complete chronology or artifact corpus."
    ],
    limitations: [
      "No complete route log or participant roster was reviewed.",
      "The Gulf terminus and four-month duration are independently corroborated, but the complete route remains unrecovered.",
      "The Kansas City Star article does not establish that Jamie performed every construction task or that every participant and community shared his interpretation.",
      "The supplied Kansas City Star PDF and its photographs remain outside the repository pending rights and consent review.",
      "Photographs, correspondence, video, and additional programs remain to be inventoried and reviewed for rights and consent."
    ],
    sourceIds: ["SRC-WATERWAYS-PITCH-2007-08-09", "SRC-WATERWAYS-PITCH-PART-III-2007-11-12", "SRC-WATERWAYS-KC-STAR-2007-11-15", "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01", "SRC-WATERWAYS-PITCH-GULF-2009-09-03"],
    publicSummary: "Public reporting and an institutional exhibition record establish Jamie's collaborative raft expedition, its hands-on bicycle-powered build, a moving public encounter with river communities, the crew's Gulf terminus after four months, and Jamie's later participatory waterways practice; the complete route, collaborator, program, and artifact corpus remains under research."
  },
  {
    id: "INQ-NYCAC-JAMIE-ROLE-CAUSALITY",
    project: "nyc-artist-coalition",
    question: "What exact individual and collective roles did Jamie and NYC Artist Coalition play in creating the Office of Nightlife, producing public town halls, and winning Cabaret Law repeal?",
    methods: [
      "Reviewed supplied Gothamist and NPR reporting.",
      "Reviewed Bedford + Bowery reporting on the Office of Nightlife town hall.",
      "Reviewed the Greene Hill Food Co-op profile documenting Jamie's public community-space advocacy and invitation to the Office of Nightlife town hall.",
      "Reviewed the Let NYC Dance and Save NYC Spaces campaign sites.",
      "Reviewed Jamie's 2018 New York City Council Small Business testimony and separated direct advocacy from legislative authorship and collective outcomes."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "Jamie is publicly identified as a founding member of NYC Artist Coalition and as an organizer and speaker for repeal.",
      "Bedford + Bowery described NYC Artist Coalition as instrumental in the advocacy and as spearheading the town hall.",
      "Greene Hill Food Co-op documents Jamie articulating NYC Artist Coalition's community-space purpose and inviting readers to the Office of Nightlife town hall.",
      "Save NYC Spaces preserves Jamie's public cultural-space argument within a broad partner coalition.",
      "The 2018 Council transcript records Jamie linking commercial affordability to cultural-space safety and advocating lease protections.",
      "The sources support a significant collective coalition role more strongly than a complete individual production or legislative-authoring account."
    ],
    limitations: [
      "A full event production record and collaborator testimony were not reviewed.",
      "Legislative sponsorship and drafting belonged to elected officials and government staff.",
      "Decades of prior advocacy and a broad coalition contributed to repeal."
    ],
    sourceIds: ["SRC-NYCAC-GOTHAMIST-2017-06-19", "SRC-NYCAC-NPR-2017-09-20", "SRC-NYCAC-BEDFORD-BOWERY-NIGHT-MAYOR", "SRC-NYCAC-LET-NYC-DANCE", "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19", "SRC-NYCAC-SAVE-NYC-SPACES", "SRC-NYC-COUNCIL-SMALL-BUSINESS-2018-10-22"],
    publicSummary: "Public reporting, campaign records, and Council testimony support Jamie's founding, organizing, speaking, commercial-affordability advocacy, and coalition role; exact individual production and causal attribution remains bounded and under research."
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
      "Reviewed the public CallNYC profile and exact post/activity URLs through Jamie's authenticated X session.",
      "Reproduced 19 distinct Council-member identities in public repost lists and eight Council-member-authored posts or replies involving CallNYC.",
      "Deduplicated the repost-list and authored-interaction ledgers by historical person identity and checked service against an official Council roster.",
      "Reconciled the result against the 71-post, 26-addressed-account, 61-issue-page CallNYC corpus."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "At least 20 distinct serving Council-member accounts engaged publicly with CallNYC: 19 public repost-list identities plus Ydanis Rodriguez's separate quote post.",
      "Eight Council members authored posts or replies explicitly involving CallNYC.",
      "Twenty corrects an earlier working count of 19; eight corrects an earlier authored-interaction count of six."
    ],
    limitations: [
      "Twenty is a recovered lower bound, not a complete lifetime denominator.",
      "Likes, follows, private interactions, deleted posts, hidden replies, and inaccessible platform activity are excluded.",
      "Current handles can differ from interaction-time handles, and interaction does not establish endorsement, adoption, or official City status."
    ],
    sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026", "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28"],
    publicSummary: "An authenticated, identity-deduplicated audit recovered attributable CallNYC interactions from at least 20 serving Council-member accounts, including eight member-authored posts or replies; the result remains a lower bound rather than a complete platform census."
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
  },
  {
    id: "INQ-READER-FEEDBACK-PROJECTION-GOVERNANCE",
    project: "knowledge-bank-governance",
    question: "How should independent reader feedback change projection governance without becoming evidence for Jamie's professional accomplishments?",
    methods: [
      "Recorded a public-safe summary of the feedback as typed intake.",
      "Compared the feedback with the frozen projection criterion and existing claim, inquiry, and publication gates.",
      "Changed governance artifacts and tests while prohibiting a direct reader-feedback-to-claim relationship."
    ],
    runAt: "2026-07-12",
    resultStatus: "recovered",
    findings: [
      "Reader feedback can expose a composition or governance defect.",
      "The feedback should resolve through a stable inquiry or correction and may name changed governance artifacts.",
      "Reader feedback is not source evidence for an accomplishment and cannot link directly to a claim."
    ],
    limitations: [
      "A reader judgment does not establish historical fact, role, scale, causality, rights, consent, or approval.",
      "Future factual suggestions from readers must enter as separate source or claim-hypothesis intake."
    ],
    sourceIds: [],
    publicSummary: "Reader feedback may improve projection governance through a stable inquiry, but it cannot serve as accomplishment evidence or directly activate a claim."
  }
] satisfies ResearchInquiry[];
