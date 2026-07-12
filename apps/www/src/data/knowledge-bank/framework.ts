import type {
  ClaimRecord,
  CitationPage,
  IntakeRecord,
  ProjectRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const frameworkPrinciple =
  "No silent loss: every submitted fragment receives a durable disposition, but intake is never automatically promoted to a public claim.";

export const frameworkIntake = [
  {
    id: "LEAD-NYCARTC-COFOUNDING-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "NYC Artist Coalition founding-role memory",
    summary: "Research Jamie's role in creating and developing NYC Artist Coalition.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE"],
    notes: ["Treat Jamie's memory as a research lead until public records and collaborator context are mapped."]
  },
  {
    id: "LEAD-CABARET-LAW-ROLE-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Cabaret Law repeal role memory",
    summary: "Research Jamie's contribution to the collective campaign to repeal New York City's Cabaret Law.",
    status: "researching",
    dispositions: ["project-linked", "claim-created", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-ORGANIZING"],
    inquiryIds: ["INQ-NYCARTC-CABARET-OUTCOME-ROLE"],
    notes: ["The first mature claim covers documented organizing activity, not causality for repeal."]
  },
  {
    id: "LEAD-OFFICE-NIGHTLIFE-ROLE-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Office of Nightlife creation-role memory",
    summary: "Research Jamie's contribution to advocacy surrounding creation of New York City's Office of Nightlife.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
    notes: ["Do not publish causal or first-office claims until the legislative and coalition record is mapped."]
  },
  {
    id: "LEAD-NIGHTLIFE-TOWN-HALLS-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Nightlife town-hall production memory",
    summary: "Research Jamie's role producing public town halls intended to connect the Office of Nightlife with small and diverse cultural spaces.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    notes: ["Recover event pages, programs, attendance context, collaborators, and Jamie's production artifacts."]
  },
  {
    id: "LEAD-TALKS-NOT-RAIDS-MARCH-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Talks Not Raids and MARCH memory",
    summary: "Research the collective Talks Not Raids campaign, its transparency work, and the documented path to changes in MARCH enforcement activity.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"],
    notes: ["Separate Jamie's role, coalition accomplishments, agency decisions, and the meaning of disbandment."]
  },
  {
    id: "LEAD-RAFT-GULF-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Kansas City-to-Gulf raft memory",
    summary: "Research the exact route, duration, participants, and endpoint of Jamie's recycled-material raft expedition.",
    status: "researching",
    dispositions: ["project-linked", "claim-created", "inquiry-created"],
    projectIds: ["great-accommodations"],
    sourceIds: ["SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-RIVER-RAFT-EXPEDITION"],
    inquiryIds: ["INQ-RIVER-RAFT-EXACT-ROUTE"],
    notes: ["Current sources support four months and reaching salt water, but not an exact Gulf endpoint."]
  },
  {
    id: "LEAD-WATERWAYS-PUBLIC-ENGAGEMENT-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Waterways public-engagement practice memory",
    summary: "Research the range of participatory programs Jamie created to connect city residents with shared waterways.",
    status: "researching",
    dispositions: ["project-linked", "claim-created", "inquiry-created"],
    projectIds: ["participatory-public-practice", "great-accommodations"],
    sourceIds: ["SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"],
    inquiryIds: ["INQ-WATERWAYS-PUBLIC-PROGRAMS", "INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    notes: ["One institutional source supports Great Accommodations; the broader practice remains a research hypothesis."]
  },
  {
    id: "LEAD-PITCH-RAFT-2007",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "The Pitch raft article",
    summary: "Contemporaneous reporting on the recycled-material raft expedition and its Kansas City transportation-history context.",
    sourceUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["great-accommodations"],
    sourceIds: ["SRC-RAFT-PITCH-2007"],
    claimIds: ["CLM-RIVER-RAFT-EXPEDITION"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-CHARLOTTE-GREAT-ACCOMMODATIONS-2009",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "website",
    title: "Charlotte Street Great Accommodations record",
    summary: "Institutional event record for Jamie's participatory Cities on the Water exhibition and related raft history.",
    sourceUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["great-accommodations", "participatory-public-practice"],
    sourceIds: ["SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "CLM-RIVER-RAFT-EXPEDITION", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-GOOD-TIMES-OPEN-HOUSE-2006",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "Good Times Open House profile",
    summary: "Reported account of Open House as a participatory communal-living, public-art, and documentation experiment.",
    sourceUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["open-house", "participatory-public-practice"],
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
    claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-GOTHAMIST-CABARET-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "Gothamist Cabaret Law organizing report",
    summary: "Contemporaneous reporting on Jamie's fire-code study groups and public advocacy for Cabaret Law repeal.",
    sourceUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-ORGANIZING"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-NPR-CABARET-REPEAL-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "NPR Cabaret Law repeal article",
    summary: "Potential source on the Cabaret Law repeal and the broader nightlife-policy context; close reading remains pending.",
    sourceUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NPR-CABARET-SOURCE-CAPTURE"],
    notes: ["The page was not available for close reading in this research run and is not yet a canonical source record."]
  }
] satisfies IntakeRecord[];

export const frameworkProjects = [
  {
    id: "callnyc",
    title: "CallNYC",
    aliases: ["CallNYC.org"],
    period: "2016",
    status: "historical",
    summary: "Independent civic-data prototype translating CouncilStat records into resident-facing pathways.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["civic data", "public guidance", "information architecture"],
    sourceIds: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28",
      "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170",
      "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648",
      "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208",
      "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304",
      "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328",
      "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026"
    ],
    claimIds: [
      "CLM-CALLNYC-HACKATHON-DATE-TIME",
      "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
      "CLM-CALLNYC-EVENT-BRANDING",
      "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
      "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
      "CLM-CALLNYC-DIGITAL-DISTRICT",
      "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED"
    ],
    inquiryIds: ["INQ-CALLNYC-CIVIC-HALL-PAGE-2026"],
    photoBrief: {
      status: "candidates-located",
      selectionQuestion: "Which image best shows Jamie working in a collaborative civic-data setting without implying official Council ownership?",
      evidenceNeeds: ["event context", "visible project work", "rights and participant consent"],
      rightsNotes: "The known participant photograph remains metadata-only pending rights and consent review."
    }
  },
  {
    id: "nyc-artist-coalition",
    title: "NYC Artist Coalition",
    aliases: ["NYCARTC", "FairRentNYC", "Talks Not Raids", "Let NYC Dance"],
    period: "2017-present",
    status: "active",
    summary: "Collective cultural-space advocacy supported by civic systems, public campaigns, coalition operations, and policy communications.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["cultural-space advocacy", "coalition operations", "public policy"],
    sourceIds: ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-ORGANIZING"],
    inquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE", "INQ-NYCARTC-CABARET-OUTCOME-ROLE", "INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE", "INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS", "INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "Which public images show Jamie's facilitation, web, documentation, or event-production role while preserving collective credit?",
      evidenceNeeds: ["Jamie visibly working", "event or campaign context", "collaborator credit", "rights"],
      rightsNotes: "Use public press or campaign images only after rights, caption, and collaborator review."
    }
  },
  {
    id: "open-house",
    title: "Open House",
    aliases: ["Porter Bridge Gallery Open House"],
    period: "2006",
    status: "historical",
    summary: "A ten-day participatory communal-living and public-art experiment at UC Santa Cruz.",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    themes: ["participation", "facilitation", "collective documentation"],
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
    claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM"],
    inquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "Which images show distributed participation and the gallery-as-house without exposing vulnerable participants?",
      evidenceNeeds: ["space use", "participant authorship", "documentation practices", "consent"],
      rightsNotes: "Article images and Jamie's archive require photographer, participant, and vulnerability review."
    }
  },
  {
    id: "great-accommodations",
    title: "Great Accommodations",
    aliases: ["Cities on the Water", "Miss Rockaway Armada raft journey"],
    period: "2007-2009",
    status: "historical",
    summary: "A river-centered body of participatory travel, exhibition, correspondence, software, and public programs.",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    themes: ["waterways", "public engagement", "participatory programs"],
    sourceIds: ["SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "CLM-RIVER-RAFT-EXPEDITION"],
    inquiryIds: ["INQ-RIVER-RAFT-EXACT-ROUTE", "INQ-WATERWAYS-PUBLIC-PROGRAMS"],
    photoBrief: {
      status: "candidates-located",
      selectionQuestion: "Which sequence connects raft construction and travel to resident participation and public programming?",
      evidenceNeeds: ["raft and crew", "river-city encounters", "exhibition participation", "captions and route dates"],
      rightsNotes: "Charlotte Street images and Jamie's archive require photographer and participant-rights review."
    }
  },
  {
    id: "participatory-public-practice",
    title: "Participatory public practice",
    aliases: ["participation systems", "public engagement practice"],
    period: "2003-present",
    status: "researching",
    summary: "A candidate longitudinal frame connecting participatory cultural, civic, and community operating practices.",
    publicSafety: "public-with-boundary",
    editorialStatus: "hold",
    themes: ["participation", "public life", "documentation", "facilitation"],
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006", "SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"],
    inquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "What visual sequence demonstrates the recurring practice without flattening distinct communities or decades?",
      evidenceNeeds: ["multiple periods", "Jamie facilitating", "participant agency", "documentation artifacts"],
      rightsNotes: "No longitudinal visual claim should publish until project-level rights and context are reviewed."
    }
  }
] satisfies ProjectRecord[];

export const frameworkSources = [
  {
    id: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
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
    publicNote: "The reported account documents a ten-day gallery-as-house experiment, communal responsibility, public participation, institutional negotiation, and participant-generated documentation.",
    supportsGenerally: ["Jamie's initiation and tending of Open House", "communal decision-making", "public participation", "collective documentation"],
    doesNotEstablish: ["Jamie as sole author of participants' work", "consent to republish participant images", "a comprehensive participant roster", "a direct causal line to later civic projects"]
  },
  {
    id: "SRC-RAFT-PITCH-2007",
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
    publicNote: "The contemporaneous report attributes the expedition idea to Jamie and connects it to Kansas City transportation history and the Missouri River.",
    supportsGenerally: ["Jamie conceived the expedition", "recycled-material raft", "Missouri River and transportation-history context"],
    doesNotEstablish: ["the complete route to the Gulf of Mexico", "the expedition's final endpoint", "solo authorship of the collective voyage", "the complete crew roster"]
  },
  {
    id: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
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
    publicNote: "The institutional record describes Jamie as spearheading a river-centered participatory project and documents correspondence, installations, software, community projects, public programs, and the prior raft journey.",
    supportsGenerally: ["Jamie spearheaded Great Accommodations", "river-centered public engagement", "multi-component participatory exhibition", "four-month raft journey until salt water"],
    doesNotEstablish: ["an exact Gulf of Mexico endpoint", "solo authorship of collective contributions", "the complete raft route", "rights to republish all event photographs"]
  },
  {
    id: "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
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
    publicNote: "The article identifies Jamie with NYC Artist Coalition, reports that he organized fire-code study groups for DIY venues, and documents his City Hall advocacy for full repeal.",
    supportsGenerally: ["Jamie organized fire-code study groups", "Jamie publicly advocated for full Cabaret Law repeal", "NYC Artist Coalition affiliation"],
    doesNotEstablish: ["Jamie solely caused repeal", "Jamie alone led the coalition", "Jamie authored the repeal legislation", "the full history of the collective campaign"]
  }
] satisfies SourceRecord[];

export const frameworkClaims = [
  {
    id: "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM",
    project: "open-house",
    internalClaim: "Jamie initiated and tended Open House, a ten-day gallery-as-house experiment organized around communal responsibility, public participation, and distributed documentation.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{ key: "archive-note", text: "In 2006, Jamie initiated and tended Open House, a ten-day gallery-as-house experiment with communal decision-making, public participation, and participant-generated documentation.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-programs"] }],
    evidence: [{ sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006", relationship: "direct-support", supports: ["Jamie's initiation and tending role", "ten-day experiment", "communal responsibility", "participant-generated documentation"], confidence: "high", renderCitation: true }],
    boundaries: ["The project was explicitly communal; do not attribute participants' work or all decisions to Jamie.", "Do not publish participant images without rights, consent, and vulnerability review."],
    antiClaims: ["Jamie was the sole leader or author of Open House", "All participants consented to future publication"],
    researchInquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM",
    project: "great-accommodations",
    internalClaim: "Jamie spearheaded Great Accommodations, a river-centered participatory project combining correspondence, immersive installation, software, community projects, facilitation, and public programs.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{ key: "archive-note", text: "In 2009, Jamie spearheaded Great Accommodations, a river-centered participatory project combining correspondence, immersive installation, software, community projects, facilitation, and public programs.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-programs"] }],
    evidence: [{ sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", relationship: "direct-support", supports: ["Jamie's spearheading role", "river-centered public engagement", "participatory exhibition components", "public programs"], confidence: "high", renderCitation: true }],
    boundaries: ["Use spearheaded for Jamie's role while preserving Suzanne Hogan's named collaboration and participant authorship.", "Image publication requires separate rights review."],
    antiClaims: ["Jamie alone authored every contribution", "The project represented every river city"],
    researchInquiryIds: ["INQ-WATERWAYS-PUBLIC-PROGRAMS"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-RIVER-RAFT-EXPEDITION",
    project: "great-accommodations",
    internalClaim: "Jamie conceived and organized a recycled-material raft expedition that traveled down the Missouri and Mississippi Rivers for four months until the water tasted salt.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{ key: "archive-note", text: "Jamie conceived and helped organize a recycled-material raft expedition that traveled down the Missouri and Mississippi Rivers for four months, until the water tasted salt.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-programs"] }],
    evidence: [
      { sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", relationship: "direct-support", supports: ["four-month journey", "Missouri and Mississippi Rivers", "reaching salt water", "Jamie's organizing role"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-RAFT-PITCH-2007", relationship: "corroborating", supports: ["Jamie conceived the expedition", "recycled-material raft", "Missouri River context"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Current sources do not establish an exact Gulf of Mexico endpoint.", "Describe the voyage as collective and do not erase the crew or host communities."],
    antiClaims: ["Jamie traveled alone", "The reviewed sources prove the exact final destination was the Gulf of Mexico"],
    researchInquiryIds: ["INQ-RIVER-RAFT-EXACT-ROUTE"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCARTC-CABARET-ORGANIZING",
    project: "nyc-artist-coalition",
    internalClaim: "In 2017, Jamie organized fire-code study groups for DIY venues and publicly advocated at City Hall for full repeal of the Cabaret Law as part of NYC Artist Coalition.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      { key: "case-study", text: "In 2017, Jamie organized fire-code study groups for DIY venues and publicly advocated at City Hall for full repeal of the Cabaret Law as part of NYC Artist Coalition.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] },
      { key: "technical-operations", text: "Organized fire-code study groups for DIY venues and supported public advocacy for Cabaret Law repeal.", status: "active", citationRequired: false, surfaces: ["/work/technical-operations"] }
    ],
    evidence: [{ sourceId: "SRC-NYCARTC-CABARET-GOTHAMIST-2017", relationship: "direct-support", supports: ["fire-code study groups", "City Hall advocacy for full repeal", "NYC Artist Coalition affiliation"], confidence: "high", renderCitation: true }],
    boundaries: ["This establishes Jamie's documented organizing contribution, not sole causality for the collective repeal outcome."],
    antiClaims: ["Jamie alone repealed the Cabaret Law", "Jamie authored the repeal legislation", "Jamie solely led NYC Artist Coalition"],
    researchInquiryIds: ["INQ-NYCARTC-CABARET-OUTCOME-ROLE", "INQ-NPR-CABARET-SOURCE-CAPTURE"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL",
    project: "participatory-public-practice",
    internalClaim: "The reviewed Open House and Great Accommodations sources suggest a recurring practice of creating participatory structures in which strangers develop agency together and leave behind shared records.",
    status: "inference",
    publicSafety: "public-with-boundary",
    editorialStatus: "hold",
    projections: [{ key: "archive-note", text: "Candidate longitudinal frame: Jamie repeatedly creates participatory structures through which strangers can enter complex public situations, develop agency together, and leave behind shared records.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: [
      { sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006", relationship: "context", supports: ["participatory space", "distributed responsibility", "shared documentation"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", relationship: "context", supports: ["participatory river programs", "facilitation", "working documentation"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-RAFT-PITCH-2007", relationship: "context", supports: ["experiential public project", "river and city context"], confidence: "limited", renderCitation: false }
    ],
    boundaries: ["This is a research hypothesis, not an approved public throughline.", "Distinct participants, communities, and projects must not be flattened into one story."],
    antiClaims: ["Every Jamie Burkart project follows one identical method", "Later civic outcomes were caused by the early art projects"],
    researchInquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  }
] satisfies ClaimRecord[];

const openInquiry = (
  id: string,
  project: string,
  question: string,
  methods: string[],
  limitations: string[],
  sourceIds: string[] = []
) => ({ id, project, question, methods, resultStatus: "open" as const, findings: [], limitations, sourceIds });

export const frameworkInquiries = [
  openInquiry("INQ-NYCARTC-COFOUNDING-ROLE", "nyc-artist-coalition", "What do public formation records, launch materials, websites, correspondence, and collaborators establish about Jamie's role creating NYC Artist Coalition?", ["Recover dated public launch and formation materials.", "Map website authorship and coalition role language.", "Seek collaborator confirmation before broadening public wording."], ["Jamie's memory is a lead, not independent corroboration."]),
  openInquiry("INQ-NYCARTC-CABARET-OUTCOME-ROLE", "nyc-artist-coalition", "How did Jamie's documented fire-code education and public advocacy relate to the broader collective campaign and legislative repeal outcome?", ["Review Council hearing records and bill history.", "Recover coalition campaign materials and press coverage.", "Separate contribution, coalition action, sponsor action, and final legislative causality."], ["One press article establishes organizing activity but not complete causality."], ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"]),
  openInquiry("INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE", "nyc-artist-coalition", "What public records establish Jamie's and NYC Artist Coalition's roles in advocacy surrounding creation of the Office of Nightlife?", ["Review legislation, hearings, testimony, coalition pages, and contemporaneous press.", "Identify Jamie-authored or Jamie-produced public artifacts."], ["Do not infer causality from later affiliation or campaign proximity."]),
  openInquiry("INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS", "nyc-artist-coalition", "Which nightlife town halls did Jamie produce, what was his role, who participated, and what public outputs followed?", ["Recover event pages, programs, recordings, photographs, and press.", "Map production tasks, collaborators, attendance, and outputs."], ["Attendance, organizer credit, and policy effects remain unverified."]),
  openInquiry("INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH", "nyc-artist-coalition", "What did Talks Not Raids do, what role did Jamie play, what transparency was achieved, and what public record establishes changes to MARCH?", ["Archive the campaign website and linked public records.", "Review agency documents, hearings, reporting, and collaborator accounts.", "Define what disbanded means in the public record."], ["Campaign claims, agency structure, and causality require independent corroboration."]),
  openInquiry("INQ-RIVER-RAFT-EXACT-ROUTE", "great-accommodations", "What exact route, dates, crew, host communities, interruptions, and endpoint are documented for the raft expedition?", ["Recover route logs, contemporary press, photographs, correspondence, and collaborator accounts.", "Distinguish reaching salt water from a documented Gulf endpoint."], ["Current sources do not establish the exact final endpoint or complete crew."], ["SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"]),
  openInquiry("INQ-WATERWAYS-PUBLIC-PROGRAMS", "great-accommodations", "What participatory programs did Jamie create to connect residents and river cities through shared waterways?", ["Inventory Great Accommodations programs, correspondence, software, walks, screenings, and community contributions.", "Recover dates, collaborators, attendance, artifacts, and public outcomes."], ["One institutional event record is not a complete program inventory."], ["SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"]),
  openInquiry("INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL", "participatory-public-practice", "Does the wider record support a longitudinal professional claim connecting early participatory art, recurring cultural programs, civic systems, and source-backed team memory?", ["Build a dated cross-project source map.", "Test continuities and discontinuities in Jamie's role, methods, outputs, and participant agency.", "Seek counterexamples and collaborator perspectives."], ["A compelling pattern is not yet a confirmed public claim.", "Distinct communities must retain their own context."], ["SRC-OPEN-HOUSE-GOOD-TIMES-2006", "SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"]),
  openInquiry("INQ-NPR-CABARET-SOURCE-CAPTURE", "nyc-artist-coalition", "What claims and context does the supplied NPR Cabaret Law article support after durable capture and close reading?", ["Recover the article through a stable public or archived copy.", "Record exact attribution, date, supported propositions, and limitations."], ["The source was supplied but not available for close reading in this run."]),
  openInquiry("INQ-PUBLIC-PROOF-SOURCE-COVERAGE", "participatory-public-practice", "Which canonical public or public-safe sources should be associated with each existing public proof claim?", ["Audit every proof ID against canonical sources.", "Prioritize metric, causality, ownership, and public-outcome claims.", "Create bounded source records and inquiries rather than weakening accurate claims by default."], ["Many claims currently rely on approved resume or public-safe archive summaries rather than canonical source records."])
] satisfies ResearchInquiry[];

const publicationDecisionInputs: Array<[
  string,
  string,
  PublicationDecision["decision"],
  string[],
  string
]> = [
  ["PUB-CALLNYC-HACKATHON-DATE-TIME", "CLM-CALLNYC-HACKATHON-DATE-TIME", "selected", ["/work/callnyc"], "Needed for accurate project chronology."],
  ["PUB-CALLNYC-FIRST-COUNCILSTAT", "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", "selected", ["/work/callnyc"], "Useful bounded institutional context."],
  ["PUB-CALLNYC-EVENT-BRANDING", "CLM-CALLNYC-EVENT-BRANDING", "selected", ["/work/callnyc"], "Clarifies the surviving public artifact without expanding the title."],
  ["PUB-CALLNYC-INDEPENDENT-FOLLOW-ON", "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", "selected", ["/work", "/work/callnyc", "/resume"], "Central role and outcome claim."],
  ["PUB-CALLNYC-ARCHIVED-STATUS", "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", "selected", ["/work/callnyc"], "Necessary current-service boundary."],
  ["PUB-CALLNYC-MEMBER-AMPLIFICATION", "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION", "selected", ["/work/callnyc", "/resume", "/work/technical-operations"], "Strong bounded external validation."],
  ["PUB-CALLNYC-DIGITAL-DISTRICT", "CLM-CALLNYC-DIGITAL-DISTRICT", "hold", [], "Photo rights and consent remain unresolved."],
  ["PUB-CALLNYC-PAGE-NOT-RECOVERED", "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED", "reserve", ["docs/knowledge-bank/projects/callnyc"], "Useful research boundary, not primary site copy."],
  ["PUB-OPEN-HOUSE-PARTICIPATORY", "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM", "reserve", ["docs/knowledge-bank/projects/participatory-public-programs"], "Strong source-backed depth held outside the current site composition."],
  ["PUB-GREAT-ACCOMMODATIONS-PARTICIPATORY", "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "reserve", ["docs/knowledge-bank/projects/participatory-public-programs"], "Strong source-backed depth held for future audience needs."],
  ["PUB-RIVER-RAFT-EXPEDITION", "CLM-RIVER-RAFT-EXPEDITION", "reserve", ["docs/knowledge-bank/projects/participatory-public-programs"], "Compelling evidence retained with route and collective-work boundaries."],
  ["PUB-NYCARTC-CABARET-ORGANIZING", "CLM-NYCARTC-CABARET-ORGANIZING", "selected", ["/work/fair-rent-nyc", "/work/technical-operations"], "Adds concrete public evidence of Jamie's bounded organizing role."],
  ["PUB-PARTICIPATORY-LONGITUDINAL", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL", "hold", [], "Promising throughline requires broader cross-project research."]
];

export const frameworkPublicationDecisions = publicationDecisionInputs.map(
  ([id, claimId, decision, surfaces, rationale]) => ({
  id,
  claimId,
  decision,
  audiences: ["hiring managers", "public-interest technology peers", "future editors"],
  surfaces,
  rationale,
    decidedAt: "2026-07-12"
  })
) satisfies PublicationDecision[];

const coverage = (
  proofId: string,
  status: ProofCoverage["status"],
  note: string,
  sourceIds: string[] = [],
  inquiryIds: string[] = ["INQ-PUBLIC-PROOF-SOURCE-COVERAGE"]
): ProofCoverage => ({ proofId, status, sourceIds, inquiryIds, note, reviewedAt: "2026-07-12" });

export const frameworkProofCoverage = [
  coverage("career-operating-structure-14-years", "research-needed", "Build a dated cross-project source map for the career-duration synthesis."),
  coverage("hje-modernization-stewardship", "research-needed", "Associate public site history and public-safe operational evidence."),
  coverage("hje-revenue-growth-contribution", "research-needed", "Retain careful causality while locating a public or approved corroborating source."),
  coverage("callnyc-civic-data-guidance", "source-backed", "Canonical CallNYC press and repository sources support this proof.", ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"], []),
  coverage("callnyc-council-member-amplification", "source-backed", "Five member-account actions and officeholding context are canonical.", ["SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28", "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170", "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648", "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208", "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304", "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328"], []),
  coverage("fair-rent-campaign-memory", "research-needed", "Convert approved public-safe archive summaries into bounded canonical source relationships."),
  coverage("fair-rent-source-map", "research-needed", "Identify the public records and approved artifact metadata that support the source-map claim."),
  coverage("nyc-artist-coalition-public-web-infrastructure", "partially-backed", "Public campaign sites exist; authorship and role provenance require a canonical source map."),
  coverage("nyc-artist-coalition-civic-systems", "partially-backed", "Gothamist now supports one concrete organizing strand; broader systems coverage remains open.", ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"], ["INQ-PUBLIC-PROOF-SOURCE-COVERAGE", "INQ-NYCARTC-COFOUNDING-ROLE"]),
  coverage("nyc-artist-coalition-cabaret-organizing", "source-backed", "Gothamist directly supports the bounded organizing claim.", ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"], []),
  coverage("wowlist-community-platform", "research-needed", "Promote verified archive counts and architecture evidence into canonical public-safe source records."),
  coverage("sunday-dinner-196-participation-infrastructure", "research-needed", "Build public-safe aggregate evidence while protecting attendance and guest records."),
  coverage("kc-spaces-fund-digital-infrastructure", "research-needed", "Convert AI-assisted archival review into bounded canonical source metadata where public-safe."),
  coverage("kc-town-hall-public-benefit-documentation", "research-needed", "Associate the public funding recommendation and public-benefit documents."),
  coverage("source-backed-team-memory-method", "research-needed", "Associate public lab materials without exposing private collaborator context."),
  coverage("technical-operations-operating-backbone", "research-needed", "Treat this as a synthesis and map each operating capability to project evidence."),
  coverage("ai-evals-professional-development", "research-needed", "Associate the public-safe completion credential as a canonical source record.")
] satisfies ProofCoverage[];

export const frameworkPages = [{
  id: "fair-rent-nyc",
  surface: "/work/fair-rent-nyc",
  sourceOrder: ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"],
  occurrences: [{
    id: "cabaret-organizing",
    claimId: "CLM-NYCARTC-CABARET-ORGANIZING",
    projection: "case-study",
    sourceIds: ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"]
  }]
}] satisfies CitationPage[];
