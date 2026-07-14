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
    intakeIds: [
      "INT-2026-07-13-GOTHAMIST-CABARET",
      "INT-2026-07-13-PRESS-LET-NYC-DANCE"
    ],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
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
    intakeIds: [
      "INT-2026-07-13-NPR-NIGHTLIFE",
      "INT-2026-07-13-PRESS-LET-NYC-DANCE",
      "INT-2026-07-13-PRESS-SAVE-NYC-SPACES"
    ],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
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
  },
  {
    id: "SRC-NYCARTC-BNB-DIY-SPACES-2017",
    title: "6 Things to Know About Making DIY Spaces Work",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-07",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://bedfordandbowery.com/2017/02/6-things-to-know-about-making-diy-spaces-work/",
    preferredPublicUrl: "canonical",
    publicCitation: "Cassidy Dawn Graves, '6 Things to Know About Making DIY Spaces Work,' Bedford + Bowery, February 7, 2017.",
    publicNote: "Contemporaneous reporting identifies Jamie as an NYC Artist Coalition organizer, describes a coalition-organized safety and policy meeting, and attributes to Jamie that more than 100 people had joined its mutual-aid network.",
    locator: "Paragraphs describing the Magick City meeting and Jamie's organizer attribution and mutual-aid signup statement, especially article lines 20-25.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-BNB-DIY-SPACES"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "Jamie identified as an NYC Artist Coalition organizer",
      "coalition-organized February 2017 safety and policy meeting",
      "Jamie's attributed statement that more than 100 people had joined the mutual-aid network",
      "participants reviewed fire safety and proposals for the Department of Cultural Affairs"
    ],
    doesNotEstablish: [
      "an independently audited signup total",
      "Jamie as sole organizer or sole founder",
      "adoption of the proposals by the Department of Cultural Affairs",
      "the complete coalition membership or organizer roster"
    ]
  },
  {
    id: "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017",
    title: "Let NYC Dance: The Battle to Save New York City's Nightlife",
    organization: "Mixmag",
    author: "Miranda Bryant",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-20",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://mixmag.net/feature/let-nyc-dance-the-battle-to-save-new-york-citys-nightlife",
    preferredPublicUrl: "canonical",
    publicCitation: "Miranda Bryant, 'Let NYC Dance: The Battle to Save New York City's Nightlife,' Mixmag, September 20, 2017.",
    publicNote: "Reporting from the Cabaret Law hearing identifies Jamie as an NYC Artist Coalition member and documents his testimony about the law's use against community spaces.",
    locator: "Article paragraphs on the hearing and Jamie's testimony, especially lines 84-94.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-MIXMAG-CABARET-HEARING"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "Jamie spoke at a City Council Cabaret Law repeal hearing",
      "Jamie's NYC Artist Coalition affiliation",
      "Jamie's public argument that the law could be used to target community spaces",
      "collective testimony by nightlife and dance advocates"
    ],
    doesNotEstablish: [
      "Jamie as sole campaign leader",
      "Jamie's authorship of repeal legislation",
      "sole causality for repeal",
      "the final enacted-law chronology"
    ]
  },
  {
    id: "SRC-NYCARTC-PRIORITIES-2017",
    title: "NYC Artist Coalition Priorities",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-12-02",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://nycartc.com/priorities/",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, 'NYC Artist Coalition Priorities,' December 2, 2017.",
    publicNote: "The coalition's public priorities page connects its mutual-aid process with Cabaret Law repeal, M.A.R.C.H. transparency, Office of Nightlife recommendations, cultural-space support, and commercial affordability.",
    locator: "Priority sections 'Prevent Criminalization,' 'Access to Support,' 'Promote Affordability,' and 'NYC Office of Nightlife,' especially page lines 24-63.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-NYCARTC-PRIORITIES"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "coalition's published December 2017 priorities",
      "mutual aid, support access, and public advocacy as stated operating modes",
      "Talks Not Raids, Cabaret Law repeal, Office of Nightlife, and commercial affordability as connected priorities",
      "published recommendations to city officials"
    ],
    doesNotEstablish: [
      "Jamie's authorship of the page or every recommendation",
      "independent verification of the coalition's causal claims",
      "completion of every listed priority",
      "the later disposition of M.A.R.C.H. operations"
    ]
  },
  {
    id: "SRC-NYCARTC-NIGHT-MAYOR-LETTER-2017",
    title: "NYC Artist Coalition Letter on the Office of Nightlife",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-08",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://savenycspaces.nycartc.com/download/Night-Mayor-Letter-MOME-9-23-17.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, letter to the Mayor's Office of Media and Entertainment and Department of Cultural Affairs, September 8, 2017.",
    publicNote: "A coalition letter records a meeting with city cultural agencies, presents recommendations for the new Office of Nightlife, and invites officials to an October 11 Market Hotel town hall organized with sixteen named partner organizations and venues.",
    locator: "Pages 1-3, especially the addressees and purpose on page 1, recommendations on pages 2-3, and October 11 town-hall invitation and signatories on page 3.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-NIGHT-MAYOR-LETTER"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "coalition meeting with the Mayor's Office of Media and Entertainment and Department of Cultural Affairs",
      "written recommendations concerning safety, M.A.R.C.H. transparency, casework, permitting, affordability, trust, and inclusion",
      "October 11, 2017 Office of Nightlife town-hall invitation at Market Hotel",
      "sixteen named partner organizations and venues joining the letter"
    ],
    doesNotEstablish: [
      "Jamie's individual authorship of the letter",
      "Jamie's exact production responsibilities",
      "attendance or effects of the announced town hall",
      "city adoption of every recommendation",
      "sole coalition causality for creating the Office"
    ]
  },
  {
    id: "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
    title: "What Can the Night Mayor Do? The DIY Scene Discusses",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-12",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    preferredPublicUrl: "canonical",
    publicCitation: "Cassidy Dawn Graves, 'What Can the Night Mayor Do? The DIY Scene Discusses,' Bedford + Bowery, October 12, 2017.",
    publicNote: "Contemporaneous reporting confirms the coalition's October 11 Market Hotel town hall, identifies Jamie among NYC Artist Coalition participants, and documents participation by cultural organizations, three Council members, and city cultural officials.",
    locator: "Opening account of the town hall and participant description, especially article lines 23-30.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [
      "INT-2026-07-13-BNB-NIGHT-MAYOR-TOWN-HALL",
      "INT-2026-07-13-PRESS-SAVE-NYC-SPACES"
    ],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "the October 11, 2017 Market Hotel town hall occurred",
      "NYC Artist Coalition spearheaded the gathering",
      "Jamie identified among NYC Artist Coalition participants",
      "participation by varied cultural organizations, Council members Rafael Espinal, Antonio Reynoso, and Stephen Levin, and city cultural officials"
    ],
    doesNotEstablish: [
      "a reliable numeric attendance count",
      "Jamie's exact production responsibilities",
      "Jamie as sole organizer",
      "direct policy effects attributable to the town hall"
    ]
  },
  {
    id: "SRC-NYC-NIGHTLIFE-REPORT-2021",
    title: "NYC Office of Nightlife Report: 2018-2021",
    organization: "NYC Mayor's Office of Media and Entertainment",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-06-01",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.nyc.gov/assets/sbs/downloads/pdf/about/reports/nightlife-report-june-2021.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Mayor's Office of Media and Entertainment, 'NYC Office of Nightlife Report: 2018-2021,' June 2021.",
    publicNote: "The Office's first-term report captions a March 2018 NYC Artist Coalition town hall that introduced the city's first nightlife director to broad stakeholders.",
    locator: "Pages 28-29, 'From Legislation to Agenda,' including the caption describing the March 2018 NYC Artist Coalition town hall.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-NYC-NIGHTLIFE-REPORT"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "NYC Artist Coalition held a March 2018 town hall",
      "the event introduced the first nightlife director to broad stakeholders",
      "official Office of Nightlife institutional chronology"
    ],
    doesNotEstablish: [
      "Jamie's individual role in the March 2018 event",
      "a numeric attendance count",
      "the complete event agenda or participant roster",
      "causal effects of the event on later Office policy"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
    title: "Committee on Small Business Hearing Transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-10-22",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=3BAD981A-69D8-4D99-A882-52442F36F5A2&ID=6792384&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Committee on Small Business hearing transcript, October 22, 2018, pp. 346-348.",
    publicNote: "The official transcript identifies Jamie as an NYC Artist Coalition member and records his testimony connecting cultural-space safety and survival to commercial affordability while supporting Intro 737.",
    locator: "Transcript pages 346-348, Jamie Burkart testimony, especially PDF text lines 16640-16730.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-COUNCIL-SBJSA-TRANSCRIPT"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "Jamie's appearance and testimony at the October 22, 2018 Committee on Small Business hearing",
      "Jamie's NYC Artist Coalition affiliation",
      "Jamie's public connection between cultural-space safety, commercial affordability, and displacement",
      "Jamie's support for the Small Business Jobs Survival Act, Intro 737"
    ],
    doesNotEstablish: [
      "legislative passage of Intro 737",
      "Jamie's authorship of the bill",
      "Jamie's sole leadership of commercial-affordability advocacy",
      "the accuracy of every proper name marked uncertain by the transcription service"
    ]
  },
  {
    id: "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
    title: "Talks Not Raids: Transparency on M.A.R.C.H. Raids in NYC",
    organization: "Talks Not Raids coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://talksnotraids.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Talks Not Raids coalition, 'Transparency on M.A.R.C.H. Raids in NYC,' public campaign site.",
    publicNote: "The campaign surface explains its M.A.R.C.H. transparency position, links Intro 1156, tracks fifteen named Council supporters at the captured state, supplies a call script, credits a multi-organization coalition, and provides press and media assets.",
    locator: "Campaign sections 'NYC's M.A.R.C.H. Raids,' 'Progress,' Council supporter tracker, coalition credits, press links, and media kit, especially page lines 46-175.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [
      "INT-2026-07-13-TALKS-NOT-RAIDS",
      "INT-2026-07-13-PRESS-TALKS-NOT-RAIDS"
    ],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "public explanation and call script for M.A.R.C.H. transparency",
      "link to Intro 1156",
      "fifteen named Council supporters shown in the captured campaign state",
      "NYC Artist Coalition among the credited campaign coalition",
      "public press links and downloadable media assets"
    ],
    doesNotEstablish: [
      "Jamie's individual authorship or implementation role",
      "independent verification of the campaign's reported M.A.R.C.H. action count",
      "sole campaign causality for legislative enactment",
      "that M.A.R.C.H. was disbanded",
      "the final number of Council sponsors"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-INTRO-1156-LOCAL-LAW-220",
    title: "Introduction 1156-2018 / Local Law 220 of 2019",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-12-15",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342&Options=ID%7CText%7C&Search=1156",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Introduction 1156-2018, enacted as Local Law 220 of 2019.",
    publicNote: "The official legislative record shows nineteen Council sponsors and enactment of M.A.R.C.H. reporting, specified advance-notice, and nightlife-establishment inspection-reporting requirements as Local Law 220 of 2019.",
    locator: "Legislation details, enactment status and date, sponsors, summary, history, and enacted text, especially page lines 31-43 and 60-107.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-COUNCIL-INTRO-1156"],
    reviewStatus: "reviewed",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "Intro 1156's official title and legislative chronology",
      "nineteen Council sponsors",
      "December 15, 2019 enactment as Local Law 220",
      "M.A.R.C.H. reporting and specified advance-notice requirements",
      "inspection reporting by the Office of Special Enforcement"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "NYC Artist Coalition's exact causal contribution",
      "sole causality by Talks Not Raids",
      "disbandment of M.A.R.C.H.",
      "perfect compliance with or later effects of the law"
    ]
  },
  {
    id: "SRC-NYCARTC-SAVE-NYC-SPACES-CAMPAIGN",
    title: "Save NYC Spaces: New Nightlife Mayor Must Assist Diverse Cultures",
    organization: "Save NYC Spaces coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://savenycspaces.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Save NYC Spaces coalition, 'New Nightlife Mayor Must Assist Diverse Cultures,' public campaign site.",
    publicNote: "The public campaign surface credits NYC Artist Coalition and partner organizations, attributes a statement about grassroots cultural spaces to Jamie, presents Office of Nightlife priorities, and supplies press links and downloadable media assets.",
    locator: "Campaign priorities, Jamie attribution, coalition list, press links, and media kit, especially page lines 38-52, 169-183, and 238-299.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: [
      "INT-2026-07-13-SAVE-NYC-SPACES",
      "INT-2026-07-13-PRESS-SAVE-NYC-SPACES"
    ],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading with public-source verification"],
    supportsGenerally: [
      "Save NYC Spaces public campaign priorities",
      "Jamie identified with NYC Artist Coalition and attributed a statement about cultural traditions born in grassroots spaces",
      "NYC Artist Coalition and partner coalition credits",
      "press links and downloadable campaign media assets"
    ],
    doesNotEstablish: [
      "Jamie's authorship or implementation of the campaign surface",
      "Jamie's exact role in organizing every listed partner",
      "independent verification of every campaign assertion",
      "sole coalition causality for Office of Nightlife policy"
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
      },
      {
        sourceId: "SRC-NYCARTC-BNB-DIY-SPACES-2017",
        relationship: "corroborating",
        supports: ["Jamie's organizer role", "early coalition activity", "coalition name"],
        locator: "Article paragraphs identifying Jamie as an NYC Artist Coalition organizer and describing the coalition meeting.",
        confidence: "high",
        renderCitation: false
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
      },
      {
        sourceId: "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017",
        relationship: "direct-support",
        supports: ["Jamie's City Council hearing testimony", "coalition affiliation", "public repeal argument"],
        locator: "Article paragraphs on the Cabaret Law hearing and Jamie's testimony, especially lines 84-94.",
        confidence: "high",
        renderCitation: true
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
  },
  {
    id: "CLM-NYCARTC-EARLY-ORGANIZER-ROLE",
    project: "nyc-artist-coalition",
    claimType: "role",
    internalClaim: "By February 2017, contemporaneous reporting identified Jamie as an NYC Artist Coalition organizer working with artists and venue communities on safety, cultural-space preservation, and recommendations for city cultural officials.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "By February 2017, contemporaneous reporting identified Jamie as an NYC Artist Coalition organizer working with artists and venue communities on safety, cultural-space preservation, and recommendations for city cultural officials.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-BNB-DIY-SPACES-2017",
        relationship: "direct-support",
        supports: ["organizer attribution", "meeting purpose", "safety and policy work"],
        locator: "Article paragraphs describing the meeting and identifying Jamie as an NYC Artist Coalition organizer.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["Organizer attribution does not establish sole leadership, sole founding, or ownership of participants' work."],
    antiClaims: ["Jamie alone organized NYC Artist Coalition or authored every proposal."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-MUTUAL-AID-SIGNUPS",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim: "In February 2017, Jamie told Bedford + Bowery that more than 100 people had joined NYC Artist Coalition's mutual-aid network.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "In the same report, Jamie said more than 100 people had joined the coalition's mutual-aid network, offering skills ranging from zoning knowledge to DJ access.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-BNB-DIY-SPACES-2017",
        relationship: "direct-support",
        supports: ["Jamie's attributed count", "mutual-aid network", "examples of member skills"],
        locator: "Article paragraph attributing the signup count and examples of skills to Jamie.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["Keep the count attributed to Jamie; the article is not an independent audit of signup records or active participation."],
    antiClaims: ["More than 100 independently verified active members participated in every coalition effort."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-CABARET-HEARING-TESTIMONY",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "Mixmag documented Jamie speaking as an NYC Artist Coalition member at a 2017 City Council hearing on full Cabaret Law repeal.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "Mixmag documented Jamie speaking as an NYC Artist Coalition member at a 2017 City Council hearing on full Cabaret Law repeal.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017",
        relationship: "direct-support",
        supports: ["hearing participation", "coalition affiliation", "Jamie's public argument"],
        locator: "Article paragraphs on Jamie's statement at the Cabaret Law hearing.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Hearing testimony establishes advocacy activity, not legislative authorship or sole causality for repeal."],
    antiClaims: ["Jamie alone caused the City Council to repeal the Cabaret Law."],
    researchInquiryIds: ["INQ-NYCARTC-CABARET-REPEAL-CAUSALITY"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-PUBLIC-PRIORITIES",
    project: "nyc-artist-coalition",
    claimType: "attributed-description",
    internalClaim: "NYC Artist Coalition's December 2017 priorities page described mutual aid, support access, public advocacy, Cabaret Law repeal, MARCH transparency, Office of Nightlife accountability, and commercial affordability as connected workstreams.",
    status: "confirmed-with-boundary",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "NYC Artist Coalition publicly described mutual aid, safety, M.A.R.C.H. transparency, Office of Nightlife accountability, and commercial affordability as connected workstreams.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-PRIORITIES-2017",
        relationship: "direct-support",
        supports: ["coalition self-description", "connected priorities", "mutual-aid operating model"],
        locator: "Published priority sections covering criminalization, support, affordability, and the Office of Nightlife.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["This is the coalition's own public description; it does not allocate authorship or independently verify outcomes."],
    antiClaims: ["Jamie individually authored or completed every coalition priority."],
    researchInquiryIds: [
      "INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE",
      "INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"
    ],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-OFFICE-NIGHTLIFE-RECOMMENDATIONS",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "A September 2017 NYC Artist Coalition letter to city cultural officials presented recommendations for Office of Nightlife trust, MARCH transparency, cultural casework, permitting, affordability, and inclusion.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "A September 2017 coalition letter to city cultural officials presented recommendations for Office of Nightlife trust, M.A.R.C.H. transparency, cultural casework, permitting, affordability, and inclusion.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-NIGHT-MAYOR-LETTER-2017",
        relationship: "direct-support",
        supports: ["agency meeting", "written recommendations", "partner signatories"],
        locator: "Letter pages 1-3, including recommendations and signatories.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The letter is collective and does not establish Jamie's individual authorship or city adoption of every recommendation."],
    antiClaims: ["Jamie individually wrote every recommendation or the City adopted them all."],
    researchInquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-OCTOBER-TOWN-HALL",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "NYC Artist Coalition organized an October 11, 2017 Market Hotel town hall about the new Office of Nightlife; independent reporting described about one hundred attendees, and contemporaneous reporting identified Jamie among coalition participants.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "In October 2017, NYC Artist Coalition spearheaded a Market Hotel town hall about the new Office of Nightlife. Independent reporting described a crowd of about one hundred, while contemporaneous reporting identified Jamie among coalition participants and documented participation by cultural organizations, Council members, and city cultural officials.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-NIGHT-MAYOR-LETTER-2017",
        relationship: "direct-support",
        supports: ["coalition organizing role", "date", "venue", "partner signatories"],
        locator: "Page 3 town-hall invitation and signatory list.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
        relationship: "corroborating",
        supports: ["event occurred", "coalition spearheaded it", "Jamie's participation", "institutional participation"],
        locator: "Opening account of the town hall and participant description.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
        relationship: "corroborating",
        supports: ["approximately one hundred attendees", "Council and city-agency participation", "recurring coalition town-hall practice"],
        locator: "Opening paragraphs and later account of the coalition's town-hall practice.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["About one hundred is a contemporaneous journalistic description, not an audited attendance count; the sources establish Jamie's participation, not his exact production responsibilities."],
    antiClaims: ["Hundreds of people are independently documented as attending, Jamie alone produced the town hall, or the town hall alone determined Office policy."],
    researchInquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-MARCH-2018-TOWN-HALL",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "The NYC Office of Nightlife's 2018-2021 report identifies a March 2018 NYC Artist Coalition town hall that introduced the city's first nightlife director to broad stakeholders.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "A city report identifies a March 2018 NYC Artist Coalition town hall that introduced the first nightlife director to broad stakeholders.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYC-NIGHTLIFE-REPORT-2021",
        relationship: "direct-support",
        supports: ["event month", "coalition host", "event purpose", "broad-stakeholder framing"],
        locator: "Report pages 28-29 and the March 2018 town-hall caption.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The report does not name Jamie's role or supply a numeric attendance count, agenda, or complete roster."],
    antiClaims: ["The city report proves Jamie personally produced the March 2018 event."],
    researchInquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-SBJSA-TESTIMONY-2018",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "At the October 22, 2018 City Council Small Business hearing, Jamie testified as an NYC Artist Coalition member, linked cultural-space safety and survival to commercial affordability, and supported Intro 737.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "At an October 2018 City Council hearing, Jamie testified as an NYC Artist Coalition member, connecting cultural-space safety and survival to commercial affordability and supporting the Small Business Jobs Survival Act.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
        relationship: "direct-support",
        supports: ["Jamie's hearing appearance", "coalition affiliation", "safety-affordability argument", "support for Intro 737"],
        locator: "Official transcript pages 346-348, Jamie Burkart testimony.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["Testimony establishes Jamie's advocacy and reasoning, not legislative authorship, passage, or sole campaign leadership."],
    antiClaims: ["Jamie authored or passed the Small Business Jobs Survival Act."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-TALKS-NOT-RAIDS-PUBLIC-CAMPAIGN",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "The Talks Not Raids campaign surface translated MARCH transparency goals into an issue explainer, bill link, Council-support tracker, call script, coalition credits, and media kit.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "The Talks Not Raids campaign surface translated M.A.R.C.H. transparency goals into an issue explainer, bill link, Council-support tracker, call script, coalition credits, and media kit.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
        relationship: "direct-support",
        supports: ["campaign interface", "bill link", "support tracker", "call script", "coalition credits", "media kit"],
        locator: "Public campaign sections on the issue, progress, Council supporters, coalition, press, and media kit.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["The public page establishes campaign content and interface, not Jamie's individual authorship, an audited M.A.R.C.H. action count, or legislative causality."],
    antiClaims: ["The campaign page alone proves Jamie built it or that the campaign alone produced legislation."],
    researchInquiryIds: ["INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-TALKS-NOT-RAIDS-LEGISLATIVE-OUTCOME",
    project: "nyc-artist-coalition",
    claimType: "outcome",
    internalClaim: "The Talks Not Raids campaign supported Intro 1156; official Council records show the bill later had nineteen sponsors and became Local Law 220 of 2019 with MARCH reporting and specified notice requirements.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "The campaign supported Intro 1156. Council records show the measure later had nineteen sponsors and became Local Law 220 of 2019, requiring M.A.R.C.H. reporting and advance notice in specified circumstances.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
        relationship: "context",
        supports: ["campaign support for Intro 1156", "coalition context"],
        locator: "Campaign progress section linking Intro 1156 and crediting the coalition.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-INTRO-1156-LOCAL-LAW-220",
        relationship: "direct-support",
        supports: ["nineteen sponsors", "enactment date", "Local Law number", "reporting and notice provisions"],
        locator: "Official legislation details, sponsors, history, summary, and enacted text.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: ["The sequence does not assign causal shares to Talks Not Raids, Jamie, NYC Artist Coalition, legislators, officials, or partner organizations and does not establish that M.A.R.C.H. was disbanded."],
    antiClaims: ["Jamie or Talks Not Raids alone enacted Local Law 220.", "Local Law 220 disbanded M.A.R.C.H."],
    researchInquiryIds: ["INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-SAVE-NYC-SPACES-PUBLIC-CAMPAIGN",
    project: "nyc-artist-coalition",
    claimType: "attributed-description",
    internalClaim: "The Save NYC Spaces public campaign surface presented Office of Nightlife priorities, credited a broad partner coalition, attributed a statement about grassroots cultural spaces to Jamie, and supplied press and media assets.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [
      {
        key: "archive-note",
        text: "The Save NYC Spaces campaign presented Office of Nightlife priorities, broad partner credits, attributed public statements, and reusable press and media assets.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-SAVE-NYC-SPACES-CAMPAIGN",
        relationship: "direct-support",
        supports: ["campaign priorities", "Jamie attribution", "partner credits", "press and media assets"],
        locator: "Campaign priorities, Jamie attribution, partner list, press links, and media kit.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The public campaign surface does not establish Jamie's authorship, implementation role, or sole responsibility for coalition activity."],
    antiClaims: ["Jamie alone created Save NYC Spaces or authored every statement and asset."],
    researchInquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex close reading"]
  },
  {
    id: "CLM-NYCARTC-CAMPAIGN-PRESS-CORPUS",
    project: "nyc-artist-coalition",
    claimType: "metric",
    internalClaim: "Four recovered NYC Artist Coalition campaign Press sections contain forty-five placements linking forty-four distinct press or issue-context articles.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "Across Let NYC Dance, Talks Not Raids, Save NYC Spaces, and the archived FairRentNYC campaign, the recovered Press sections catalog 45 placements linking 44 distinct press or issue-context articles.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-LET-NYC-DANCE-CAMPAIGN",
        relationship: "direct-support",
        supports: ["twenty-one ordered Let NYC Dance press placements"],
        locator: "Live campaign Press section headed 'Press'.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
        relationship: "direct-support",
        supports: ["seven ordered Talks Not Raids press placements"],
        locator: "Live campaign Press section headed 'Press'.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-SAVE-NYC-SPACES-CAMPAIGN",
        relationship: "direct-support",
        supports: ["eight ordered Save NYC Spaces press placements"],
        locator: "Live campaign Press section headed 'Press'.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-FAIR-RENT-NYC-CAMPAIGN-ARCHIVE-2021",
        relationship: "direct-support",
        supports: ["nine ordered Fair Rent NYC press placements"],
        locator: "December 1, 2021 Wayback capture, Press section headed 'Press'.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "One NPR article appears in two campaign Press sections, producing forty-five placements and forty-four distinct source identities.",
      "Campaign inclusion does not establish that every article names Jamie, endorses the campaign, or measures audience reach.",
      "Article bodies remain metadata-reviewed unless a separate close reading is recorded."
    ],
    antiClaims: [
      "All forty-four articles profile Jamie or NYC Artist Coalition.",
      "Forty-four articles establish a measured audience or policy effect.",
      "Every listed article independently endorses each campaign position."
    ],
    researchInquiryIds: ["INQ-NYCARTC-PRESS-CORPUS-CLOSE-READING"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex DOM extraction, URL normalization, and collection reconciliation"]
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
      "Closely read the introduction and answers concerning NYC Artist Coalition, Cabaret Law advocacy, and the September 28 town-hall invitation.",
      "Compared the September 28 invitation with the coalition's later October 11 letter and contemporaneous October 12 event report."
    ],
    runAt: "2026-07-13",
    resultStatus: "recovered",
    findings: [
      "The live page is a public Q&A with Jamie Burkart and Julia Fredenberg published December 19, 2017.",
      "The Q&A documents their NYC Artist Coalition affiliation, stated Cabaret Law repeal work, and invitation to a September 28 town hall for dialogue with the Office of Nightlife.",
      "Separate records establish an October 11 Market Hotel town hall, but do not establish whether it was the same event rescheduled from September 28."
    ],
    limitations: [
      "The Greene Hill page alone does not establish that its September 28 event occurred, its attendance, Jamie's complete production role, or any policy effects.",
      "The relationship between the September 28 invitation and documented October 11 event remains unresolved.",
      "A durable archived capture would strengthen preservation."
    ],
    sourceIds: [
      "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017",
      "SRC-NYCARTC-NIGHT-MAYOR-LETTER-2017",
      "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017"
    ],
    publicSummary: "The supplied Greene Hill page supports a bounded September 28 town-hall invitation; separate records establish an October 11 coalition town hall without proving the two notices refer to one rescheduled event."
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
      "INT-2026-07-13-NYC-COUNCIL-NIGHTLIFE",
      "INT-2026-07-13-NYCARTC-PRIORITIES",
      "INT-2026-07-13-NIGHT-MAYOR-LETTER",
      "INT-2026-07-13-BNB-NIGHT-MAYOR-TOWN-HALL",
      "INT-2026-07-13-NYC-NIGHTLIFE-REPORT",
      "INT-2026-07-13-SAVE-NYC-SPACES"
    ],
    question: "What public and collaborator evidence can establish Jamie's and NYC Artist Coalition's specific contributions to creating the Office of Nightlife?",
    methods: [
      "Reviewed NPR and official Council records for institutional chronology and named attribution.",
      "Reviewed the coalition's priorities, September 2017 agency letter, October 2017 town-hall reporting, Save NYC Spaces campaign surface, and the Office's 2018-2021 report for public contribution evidence."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "The Office and Advisory Board were established in 2017.",
      "NYC Artist Coalition met with city cultural agencies, submitted detailed recommendations, organized an October 2017 public town hall, and later held a March 2018 town hall introducing the first nightlife director to broad stakeholders.",
      "Jamie is documented as an early coalition organizer and October 2017 town-hall participant, but the reviewed public sources do not allocate his individual contribution to developing or passing the Office legislation."
    ],
    limitations: [
      "Collective letters, campaign pages, and institutional reports cannot substitute for collaborator or project-archive evidence of Jamie's exact contribution.",
      "No reviewed source supports sole or primary causality by Jamie or NYC Artist Coalition."
    ],
    sourceIds: [
      "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
      "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017",
      "SRC-NYCARTC-PRIORITIES-2017",
      "SRC-NYCARTC-NIGHT-MAYOR-LETTER-2017",
      "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
      "SRC-NYC-NIGHTLIFE-REPORT-2021",
      "SRC-NYCARTC-SAVE-NYC-SPACES-CAMPAIGN"
    ]
  },
  {
    id: "INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-13-MEMORY-NYCARTC-TOWN-HALLS",
      "INT-2026-07-13-GREENE-HILL-NEWSLETTER",
      "INT-2026-07-13-NIGHT-MAYOR-LETTER",
      "INT-2026-07-13-BNB-NIGHT-MAYOR-TOWN-HALL",
      "INT-2026-07-13-NYC-NIGHTLIFE-REPORT",
      "INT-2026-07-14-FB-NYCARTC-EVENT-POPULATION"
    ],
    question: "Which nightlife town halls did Jamie produce, at what scale, with which collaborators, and how did they inform public accountability for the Office of Nightlife?",
    methods: [
      "Preserved Jamie's memory as an inquiry and identified the minimum event, role, scale, credit, and outcome evidence needed.",
      "Closely read the recovered Greene Hill Q&A for bounded event evidence.",
      "Triangulated the coalition's October 11 invitation with contemporaneous reporting that the event occurred and a later official report documenting a separate March 2018 town hall.",
      "Reconciled the complete displayed Facebook event control and close-read the recurring meetings, Market Hotel town hall, March 2018 panel, public-hearing paths, and response-versus-attendance boundary."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "A public Q&A records Jamie and Julia inviting readers to a September 28 town hall for dialogue with the new Office of Nightlife.",
      "NYC Artist Coalition's September letter and Bedford + Bowery reporting establish that the coalition spearheaded an October 11 Market Hotel town hall and identify Jamie among coalition participants.",
      "Independent Village Voice reporting described about one hundred people at the October Market Hotel town hall with Council members and city-agency representatives.",
      "The Office of Nightlife's report establishes that NYC Artist Coalition held another town hall in March 2018 to introduce the first nightlife director to broad stakeholders.",
      "The Facebook event record documents a wider recurring participation system across cultural-space meetings, practical support, public hearings, and campaign action."
    ],
    limitations: [
      "The October report's about-one-hundred figure is journalistic, not audited; Facebook response displays are not attendance.",
      "The October sources establish Jamie's participation, not his complete production responsibilities; the March report does not name him.",
      "Jamie's first-person account supports a bounded contribution claim; collaborator accounts and event-level production records would strengthen allocation of specific tasks."
    ],
    sourceIds: [
      "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017",
      "SRC-NYCARTC-NIGHT-MAYOR-LETTER-2017",
      "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
      "SRC-NYC-NIGHTLIFE-REPORT-2021",
      "SRC-NYCARTC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      "SRC-FB-NYCARTC-EVENTS-CORPUS-2026",
      "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026"
    ],
    publicSummary: "Public records establish coalition-organized Office of Nightlife town halls in October 2017 and March 2018; independent reporting described about one hundred people at the October event, and the broader event record supports Jamie's bounded contribution to a recurring participation system while preserving collective credit."
  },
  {
    id: "INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-13-MEMORY-TALKS-NOT-RAIDS-MARCH",
      "INT-2026-07-13-NYCARTC-PRIORITIES",
      "INT-2026-07-13-TALKS-NOT-RAIDS",
      "INT-2026-07-13-COUNCIL-INTRO-1156"
    ],
    question: "What evidence supports Jamie's and NYC Artist Coalition's Talks Not Raids work, its transparency outcomes, and any contribution to ending M.A.R.C.H. enforcement operations?",
    methods: [
      "Preserved Jamie's memory as an inquiry and separated campaign activity, transparency outcomes, institutional disposition, and causality into distinct research needs.",
      "Reviewed the public campaign surface, coalition priorities, and official legislative record for Intro 1156 and Local Law 220."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "The public Talks Not Raids surface linked Intro 1156, tracked fifteen named Council supporters at the reviewed state, provided a call script and media kit, and credited NYC Artist Coalition among a broader coalition.",
      "Official Council records show that Intro 1156 later had nineteen sponsors and became Local Law 220 of 2019 with M.A.R.C.H. reporting and specified advance-notice provisions."
    ],
    limitations: [
      "The reviewed public sources do not establish Jamie's exact campaign role or individual authorship of the site.",
      "The sequence does not allocate legislative causality among the campaign, coalition partners, Council sponsors, or officials.",
      "No reviewed source establishes that M.A.R.C.H. was disbanded; that part of Jamie's memory remains unresolved."
    ],
    sourceIds: [
      "SRC-NYCARTC-PRIORITIES-2017",
      "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
      "SRC-NYC-COUNCIL-INTRO-1156-LOCAL-LAW-220"
    ],
    publicSummary: "Talks Not Raids publicly supported Intro 1156; the Council record shows enactment as Local Law 220 of 2019, while Jamie's exact campaign role, causal allocation, and any M.A.R.C.H. disbandment claim remain open."
  },
  {
    id: "INQ-NYCARTC-CABARET-REPEAL-CAUSALITY",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-13-GOTHAMIST-CABARET",
      "INT-2026-07-13-NPR-NIGHTLIFE",
      "INT-2026-07-13-NYC-COUNCIL-CABARET-VOTE",
      "INT-2026-07-13-MIXMAG-CABARET-HEARING"
    ],
    question: "How should Jamie's and NYC Artist Coalition's contribution to the Cabaret Law repeal be stated relative to the collective campaign and legislative outcome?",
    methods: [
      "Compared contemporaneous Gothamist and NPR reporting with the official Council vote description.",
      "Reviewed Mixmag's hearing report for Jamie's directly documented testimony.",
      "Separated documented advocacy activity, collective mobilization, legislative chronology, final enactment, and causality."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "Jamie organized fire-code study groups and publicly called for full repeal.",
      "Mixmag documented Jamie testifying at the City Council hearing as an NYC Artist Coalition member.",
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
      "SRC-NYC-COUNCIL-CABARET-VOTE-2017",
      "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017"
    ]
  },
  {
    id: "INQ-NYCARTC-PRESS-CORPUS-CLOSE-READING",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-13-PRESS-LET-NYC-DANCE",
      "INT-2026-07-13-PRESS-TALKS-NOT-RAIDS",
      "INT-2026-07-13-PRESS-SAVE-NYC-SPACES",
      "INT-2026-07-13-PRESS-FAIR-RENT-NYC-ARCHIVE",
      "INT-2026-07-13-PRESS-FAIR-RENT-NYC-LIVE"
    ],
    question: "Which articles in the four campaign Press sections materially support, qualify, or contradict portfolio claims after article-level close reading?",
    methods: [
      "Parsed each Press section from live campaign HTML or the supplied FairRentNYC Wayback capture and preserved publisher, displayed headline, listed URL, and list order.",
      "Normalized duplicate source identities while retaining all campaign-to-article placements.",
      "Audited all forty-four distinct listed destinations and queried Wayback availability for blocked, dead, or misleading redirects.",
      "Recorded article sources at metadata review depth so they cannot become direct claim evidence before a separate close reading."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "The four Press sections contain forty-five placements linking forty-four distinct article sources.",
      "Let NYC Dance contains twenty-one placements, Talks Not Raids seven, Save NYC Spaces eight, and archived FairRentNYC nine.",
      "Thirty-four destinations returned article-like public responses during the audit; ten blocked, dead, or unavailable destinations received Wayback links, and one apparently successful Metro redirect was reclassified through archive recovery.",
      "The NPR nightlife article appears in both Let NYC Dance and Save NYC Spaces."
    ],
    limitations: [
      "This cycle completed campaign-index and link-metadata review, not forty-four full article close readings.",
      "Campaign editors selected these links; inclusion alone does not establish article endorsement, a mention of Jamie, or independent verification of campaign assertions.",
      "Paywalls, bot protections, publisher migrations, and later URL changes affect live availability.",
      "Future claim promotion must cite article-level locators and preserve collective credit and causal boundaries."
    ],
    sourceIds: [
      "SRC-NYCARTC-LET-NYC-DANCE-CAMPAIGN",
      "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
      "SRC-NYCARTC-SAVE-NYC-SPACES-CAMPAIGN",
      "SRC-NYCARTC-FAIR-RENT-NYC-CAMPAIGN-ARCHIVE-2021"
    ],
    publicSummary: "Four recovered campaign Press sections contain 45 placements linking 44 distinct articles; article bodies remain eligible for later close reading rather than automatic claim promotion."
  }
] satisfies ResearchInquiry[];
