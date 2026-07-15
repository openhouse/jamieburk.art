import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const lifecycleEntities = [
  {
    id: "ENT-RIVER-PUBLIC-ENGAGEMENT",
    kind: "project",
    label: "River-centered public engagement",
    publicSafeSummary: "A body of participatory, documentary, and expedition work connecting city residents with the waterways that shape their lives.",
    aliases: ["Great Accommodations", "Cities on the Water"],
    projectKey: "river-public-engagement",
    relatedEntityIds: ["ENT-MISSOURI-MISSISSIPPI-RIVER-SYSTEM"],
    status: "historical"
  },
  {
    id: "ENT-MISSOURI-MISSISSIPPI-RIVER-SYSTEM",
    kind: "place",
    label: "Missouri and Mississippi river system",
    publicSafeSummary: "The connected waterway and river-city context for Jamie's expedition and public-program work.",
    aliases: [],
    relatedEntityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    status: "historical"
  },
  {
    id: "ENT-OPEN-HOUSE",
    kind: "program",
    label: "Open House",
    publicSafeSummary: "A participatory UC Santa Cruz program that joined communal living, public art activity, shared decision-making, and documentation.",
    aliases: ["Shop Shows"],
    projectKey: "open-house",
    relatedEntityIds: [],
    status: "historical"
  },
  {
    id: "ENT-NYC-ARTIST-COALITION",
    kind: "organization",
    label: "NYC Artist Coalition",
    publicSafeSummary: "A coalition associated with artist-space safety, nightlife policy, and cultural-space advocacy in New York City.",
    aliases: ["NYC Artists Coalition", "NYC-ARTC"],
    projectKey: "nyc-artist-coalition",
    relatedEntityIds: ["ENT-CABARET-LAW-REPEAL", "ENT-OFFICE-OF-NIGHTLIFE", "ENT-TALKS-NOT-RAIDS"],
    status: "historical"
  },
  {
    id: "ENT-CABARET-LAW-REPEAL",
    kind: "campaign",
    label: "Cabaret Law repeal",
    publicSafeSummary: "The 2017 advocacy and legislative process that ended New York City's Cabaret Law licensing requirement.",
    aliases: ["Let NYC Dance"],
    relatedEntityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-LOCAL-LAW-2017-214"],
    status: "historical"
  },
  {
    id: "ENT-LOCAL-LAW-2017-214",
    kind: "law",
    label: "Local Law 2017/214",
    publicSafeSummary: "The enacted New York City law repealing the Cabaret Law licensing provisions.",
    aliases: ["Int. 1652-2017"],
    relatedEntityIds: ["ENT-CABARET-LAW-REPEAL"],
    status: "historical"
  },
  {
    id: "ENT-OFFICE-OF-NIGHTLIFE",
    kind: "institution",
    label: "New York City Office of Nightlife",
    publicSafeSummary: "The city office established in 2017 to liaise among nightlife establishments, communities, and city government.",
    aliases: [],
    relatedEntityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-LOCAL-LAW-2017-178"],
    status: "active"
  },
  {
    id: "ENT-LOCAL-LAW-2017-178",
    kind: "law",
    label: "Local Law 2017/178",
    publicSafeSummary: "The enacted New York City law establishing an Office of Nightlife and advisory board.",
    aliases: ["Office of Nightlife law"],
    relatedEntityIds: ["ENT-OFFICE-OF-NIGHTLIFE"],
    status: "historical"
  },
  {
    id: "ENT-TALKS-NOT-RAIDS",
    kind: "campaign",
    label: "Talks Not Raids",
    publicSafeSummary: "A nightlife-community campaign concerning enforcement transparency and the MARCH inspection initiative.",
    aliases: ["#TalksNotRaids"],
    relatedEntityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-MARCH-OPERATIONS"],
    status: "historical"
  },
  {
    id: "ENT-MARCH-OPERATIONS",
    kind: "program",
    label: "MARCH operations",
    publicSafeSummary: "A multi-agency nightlife-enforcement initiative whose history and dissolution require further source recovery.",
    aliases: ["M.A.R.C.H."],
    relatedEntityIds: ["ENT-TALKS-NOT-RAIDS"],
    status: "historical"
  },
  {
    id: "ENT-CALLNYC",
    kind: "project",
    label: "CallNYC",
    publicSafeSummary: "Jamie's archived independent civic-data prototype using CouncilStat constituent-services records.",
    aliases: ["CallNYC.org", "@CallNYCapp"],
    projectKey: "callnyc",
    relatedEntityIds: [],
    status: "historical"
  },
  {
    id: "ENT-HARRY-J-EPSTEIN",
    kind: "project",
    label: "Harry J. Epstein Company",
    publicSafeSummary: "Jamie's long-term technical and operational work with a legacy industrial-supply e-commerce business.",
    aliases: ["HJE"],
    projectKey: "harry-j-epstein",
    relatedEntityIds: [],
    status: "historical"
  },
  {
    id: "ENT-FAIR-RENT-NYC",
    kind: "campaign",
    label: "FairRentNYC",
    publicSafeSummary: "A Commercial Rent Stabilization campaign and public reference-library effort associated with NYC Artist Coalition.",
    aliases: ["Commercial Rent Stabilization"],
    projectKey: "fair-rent-nyc",
    relatedEntityIds: ["ENT-NYC-ARTIST-COALITION"],
    status: "active"
  },
  {
    id: "ENT-WOWLIST",
    kind: "project",
    label: "WOWList",
    publicSafeSummary: "A community event-sharing platform represented by an archived public application and surviving project records.",
    aliases: ["WOW List"],
    projectKey: "wowlist",
    relatedEntityIds: [],
    status: "historical"
  }
] satisfies EntityRecord[];

export const lifecycleIntake = [
  {
    id: "INTAKE-MIGRATION-CALLNYC-PUBLIC-CORPUS",
    receivedAt: "2026-07-12",
    kind: "migration",
    publicSafeSummary: "Migration accession for the existing public CallNYC announcement, graphic, journalism, repository, and approved claim records.",
    submittedBy: "Codex knowledge-bank migration",
    entityIds: ["ENT-CALLNYC"],
    disposition: "source-created",
    sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC", "SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"],
    claimIds: ["CLM-CALLNYC-HACKATHON-DATE-TIME", "CLM-CALLNYC-EVENT-BRANDING", "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-MIGRATION-CALLNYC-RESEARCH",
    receivedAt: "2026-07-12",
    kind: "migration",
    publicSafeSummary: "Migration accession for the protected Civic Hall recovery research and its bounded not-recovered claim.",
    submittedBy: "Codex knowledge-bank migration",
    entityIds: ["ENT-CALLNYC"],
    disposition: "source-created",
    sourceIds: ["SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026"],
    claimIds: ["CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-MIGRATION-HJE-PUBLIC-CLAIMS",
    receivedAt: "2026-07-12",
    kind: "migration",
    publicSafeSummary: "Migration accession for existing Harry J. Epstein public sources and approved portfolio claims.",
    submittedBy: "Codex knowledge-bank migration",
    entityIds: ["ENT-HARRY-J-EPSTEIN"],
    disposition: "source-created",
    sourceIds: ["SRC-HJE-PUBLIC-STOREFRONT-2026", "SRC-HJE-PUBLIC-RESUME-2026-07-11"],
    claimIds: ["CLM-HJE-PUBLIC-ECOMMERCE-SURFACE", "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-MIGRATION-FAIRRENT-PUBLIC-CLAIM",
    receivedAt: "2026-07-12",
    kind: "migration",
    publicSafeSummary: "Migration accession for the existing FairRentNYC public site source and bounded campaign-surface claim.",
    submittedBy: "Codex knowledge-bank migration",
    entityIds: ["ENT-FAIR-RENT-NYC"],
    disposition: "source-created",
    sourceIds: ["SRC-FAIRRENTNYC-PUBLIC-SITE-2026"],
    claimIds: ["CLM-FAIRRENTNYC-PUBLIC-CAMPAIGN-SURFACE"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-MIGRATION-WOWLIST-PUBLIC-CLAIM",
    receivedAt: "2026-07-12",
    kind: "migration",
    publicSafeSummary: "Migration accession for the existing WOWList archived application source and bounded public-surface claim.",
    submittedBy: "Codex knowledge-bank migration",
    entityIds: ["ENT-WOWLIST"],
    disposition: "source-created",
    sourceIds: ["SRC-WOWLIST-WAYBACK-2016-02-12"],
    claimIds: ["CLM-WOWLIST-ARCHIVED-PUBLIC-SURFACE"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-RIVER-PITCH-2007",
    receivedAt: "2026-07-12",
    kind: "public-url",
    publicSafeSummary: "Independent reporting on the origin and early Missouri crossing of Jamie's homemade-raft expedition.",
    submittedBy: "Jamie Burkart",
    sourceUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
    entityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds: ["SRC-RIVER-PITCH-HUCK-FINN-2007"],
    claimIds: ["CLM-RIVER-EXPEDITION-ORIGIN", "CLM-RIVER-FOUR-MONTH-JOURNEY"],
    researchTaskIds: ["TASK-RIVER-ROUTE-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-RIVER-CHARLOTTE-STREET-2009",
    receivedAt: "2026-07-12",
    kind: "public-url",
    publicSafeSummary: "Institutional exhibition record describing Great Accommodations, its river-city outreach, and the preceding raft journey.",
    submittedBy: "Jamie Burkart",
    sourceUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
    entityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds: ["SRC-RIVER-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-RIVER-GREAT-ACCOMMODATIONS", "CLM-RIVER-FOUR-MONTH-JOURNEY"],
    researchTaskIds: ["TASK-RIVER-ROUTE-CORROBORATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-OPEN-HOUSE-GOOD-TIMES-2006",
    receivedAt: "2026-07-12",
    kind: "public-url",
    publicSafeSummary: "Contemporaneous reporting on Jamie's role in instigating and tending the participatory Open House program.",
    submittedBy: "Jamie Burkart",
    sourceUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
    entityIds: ["ENT-OPEN-HOUSE"],
    disposition: "source-created",
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
    claimIds: ["CLM-OPEN-HOUSE-INSTIGATION-AND-CARE"],
    researchTaskIds: ["TASK-OPEN-HOUSE-PARTICIPANT-RECORD"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NYCARTC-GOTHAMIST-CABARET-2017",
    receivedAt: "2026-07-12",
    kind: "public-url",
    publicSafeSummary: "Contemporaneous reporting on Jamie's fire-code study groups, NYC Artist Coalition affiliation, and Cabaret Law repeal rally.",
    submittedBy: "Jamie Burkart",
    sourceUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-CABARET-LAW-REPEAL"],
    disposition: "source-created",
    sourceIds: ["SRC-NYCARTC-GOTHAMIST-CABARET-2017", "SRC-NYC-CABARET-REPEAL-LAW-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-SAFETY-ORGANIZING", "CLM-NYCARTC-CABARET-REPEAL-OUTCOME"],
    researchTaskIds: ["TASK-NYCARTC-CABARET-COLLECTIVE-CHRONOLOGY"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NYCARTC-NPR-CABARET-2017",
    receivedAt: "2026-07-12",
    kind: "public-url",
    publicSafeSummary: "NPR coverage of the Cabaret Law repeal, retained for close reading when access is available.",
    submittedBy: "Jamie Burkart",
    sourceUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    entityIds: ["ENT-CABARET-LAW-REPEAL"],
    disposition: "research-open",
    sourceIds: ["SRC-NYCARTC-NPR-CABARET-2017"],
    claimIds: [],
    researchTaskIds: ["TASK-NYCARTC-NPR-CLOSE-READ", "TASK-NYCARTC-CABARET-COLLECTIVE-CHRONOLOGY"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NYCARTC-CREATION-ROLE-MEMORY",
    receivedAt: "2026-07-12",
    kind: "public-memory",
    publicSafeSummary: "A high-value role claim concerning NYC Artist Coalition's formation requires a dated founding chronology and collective-credit review.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-NYC-ARTIST-COALITION"],
    disposition: "claim-seed-created",
    sourceIds: [],
    claimIds: ["CLM-NYCARTC-CREATION-ROLE-SEED"],
    researchTaskIds: ["TASK-NYCARTC-CREATION-ROLE"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-NYCARTC-OFFICE-NIGHTLIFE-MEMORY",
    receivedAt: "2026-07-12",
    kind: "public-memory",
    publicSafeSummary: "A high-value role claim concerning coalition advocacy around the Office of Nightlife and public town halls requires a documented contribution chain.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-OFFICE-OF-NIGHTLIFE"],
    disposition: "claim-seed-created",
    sourceIds: ["SRC-NYC-OFFICE-NIGHTLIFE-LAW-2017"],
    claimIds: ["CLM-NYCARTC-OFFICE-NIGHTLIFE-ROLE-SEED"],
    researchTaskIds: ["TASK-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-NYCARTC-TALKS-NOT-RAIDS-MEMORY",
    receivedAt: "2026-07-12",
    kind: "public-memory",
    publicSafeSummary: "A high-value role claim concerning Talks Not Raids, MARCH transparency, and institutional change requires source recovery and causal review.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-TALKS-NOT-RAIDS", "ENT-MARCH-OPERATIONS"],
    disposition: "claim-seed-created",
    sourceIds: [],
    claimIds: ["CLM-NYCARTC-MARCH-TRANSPARENCY-SEED"],
    researchTaskIds: ["TASK-NYCARTC-MARCH-TRANSPARENCY-OUTCOME"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO",
    receivedAt: "2026-07-12",
    kind: "photo-observation",
    publicSafeSummary: "A participant-archive photograph shows a Digital District breakout placard; the visual observation supports research and a held claim while the image remains private pending rights and consent review.",
    submittedBy: "Codex photo-archive review",
    entityIds: ["ENT-CALLNYC"],
    disposition: "source-created",
    sourceIds: ["SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
    claimIds: ["CLM-CALLNYC-DIGITAL-DISTRICT"],
    researchTaskIds: ["TASK-CALLNYC-DIGITAL-DISTRICT-CONTEXT"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT",
    receivedAt: "2026-07-12",
    kind: "public-memory",
    publicSafeSummary: "Authenticated review recovered a bounded minimum of NYC Council member account interactions with @CallNYCapp while preserving the distinction between engagement and adoption.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-CALLNYC"],
    disposition: "source-created",
    sourceIds: [
      "SRC-X-PROFILE-CALLNYCAPP-2026",
      "SRC-X-REVIEW-CALLNYC-2026",
      "SRC-X-CALLNYC-CHIN-2017",
      "SRC-X-CALLNYC-WILLS-2016",
      "SRC-X-CALLNYC-MATTEO-2016",
      "SRC-X-CALLNYC-KOO-2016",
      "SRC-X-CALLNYC-EUGENE-2016",
      "SRC-X-CALLNYC-ROSENTHAL-2016",
      "SRC-X-CALLNYC-MENDEZ-2016",
      "SRC-X-CALLNYC-RODRIGUEZ-2016"
    ],
    claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-SEED", "CLM-CALLNYC-ENGAGEMENT-EQUALS-ADOPTION-REJECTED"],
    researchTaskIds: ["TASK-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-CALLNYC-SUPERLATIVE-CORRECTION",
    receivedAt: "2026-07-12",
    kind: "correction",
    publicSafeSummary: "The broad 'first civic-data hackathon' wording was replaced by the source-supported 'first CouncilStat hackathon' wording.",
    submittedBy: "Codex citational-care review",
    entityIds: ["ENT-CALLNYC"],
    disposition: "claim-seed-created",
    sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"],
    claimIds: ["CLM-CALLNYC-FIRST-CIVIC-DATA-HACKATHON-SUPERSEDED", "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  }
] satisfies IntakeRecord[];

export const lifecycleSources = [
  {
    id: "SRC-RIVER-PITCH-HUCK-FINN-2007",
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
    publicNote: "Contemporaneous reporting on the expedition's origin, early organization, and Missouri crossing.",
    intakeIds: ["INTAKE-RIVER-PITCH-2007"],
    supportsGenerally: ["Jamie originated the experiential expedition idea", "Jamie organized an earlier transportation-history screening", "the homemade raft crossed Missouri"],
    doesNotEstablish: ["the full route to the Gulf of Mexico", "every participant's role", "sole authorship of the collective expedition"]
  },
  {
    id: "SRC-RIVER-CHARLOTTE-STREET-2009",
    title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
    organization: "Charlotte Street Foundation",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2009-09-01",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
    preferredPublicUrl: "canonical",
    publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' 2009.",
    publicNote: "Institutional exhibition record describing a Jamie-spearheaded river-city project, collective outreach with Suzanne Hogan, and the preceding raft journey.",
    intakeIds: ["INTAKE-RIVER-CHARLOTTE-STREET-2009"],
    supportsGenerally: ["Jamie spearheaded Great Accommodations", "Jamie and Suzanne Hogan solicited stories across river cities", "the exhibition used participatory and documentary forms", "a prior four-month raft journey was described"],
    doesNotEstablish: ["independent verification of every segment of the raft route", "sole authorship of collaborative outreach", "measured public-engagement outcomes"]
  },
  {
    id: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
    title: "Open House at UC-Santa Cruz",
    organization: "Good Times",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2006-06-28",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Good Times, 'Open House at UC-Santa Cruz,' June 28, 2006.",
    publicNote: "Contemporaneous reporting on the program's communal residence, public art activity, collective governance, and Jamie's initiating and sustaining role.",
    intakeIds: ["INTAKE-OPEN-HOUSE-GOOD-TIMES-2006"],
    supportsGenerally: ["Jamie instigated Open House", "Jamie tended the program", "decision-making and responsibility were communal", "Shop Shows invited open participation", "the program documented its process"],
    doesNotEstablish: ["Jamie as sole leader", "sole authorship of participant work", "a complete participant roster", "measured long-term outcomes"]
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
    accessedAt: "2026-07-12",
    canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    preferredPublicUrl: "canonical",
    publicCitation: "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
    publicNote: "Contemporaneous reporting identifying Jamie with NYC Artist Coalition and documenting his safety study groups, public advocacy, and Cabaret Law repeal rally.",
    intakeIds: ["INTAKE-NYCARTC-GOTHAMIST-CABARET-2017"],
    supportsGenerally: ["Jamie started fire-code study groups", "Jamie was identified with NYC Artist Coalition", "Jamie rallied at City Hall for full repeal", "Jamie connected licensing fear with venue safety"],
    doesNotEstablish: ["that Jamie founded NYC Artist Coalition", "that Jamie or the coalition alone caused repeal", "that Jamie authored the repeal legislation", "a complete coalition roster"]
  },
  {
    id: "SRC-NYCARTC-NPR-CABARET-2017",
    title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife",
    organization: "NPR",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-20",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    preferredPublicUrl: "canonical",
    publicCitation: "NPR, 'With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife,' September 20, 2017.",
    publicNote: "The source is retained for close reading; access was not available during this research pass.",
    intakeIds: ["INTAKE-NYCARTC-NPR-CABARET-2017"],
    supportsGenerally: [],
    doesNotEstablish: ["Jamie's role until the article is closely read", "sole causation for repeal"]
  },
  {
    id: "SRC-NYC-CABARET-REPEAL-LAW-2017",
    title: "Int. 1652-2017 - Repeal of Cabaret Law licensing provisions",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE&ID=3086319",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council legislative record for Int. 1652-2017, enacted as Local Law 2017/214.",
    publicNote: "The official record establishes the legislative outcome, not any advocate's causal share.",
    intakeIds: ["INTAKE-NYCARTC-GOTHAMIST-CABARET-2017"],
    supportsGenerally: ["Cabaret Law repeal was enacted", "the measure became Local Law 2017/214"],
    doesNotEstablish: ["Jamie's role", "NYC Artist Coalition's causal contribution", "sole causation by any advocate"]
  },
  {
    id: "SRC-NYC-OFFICE-NIGHTLIFE-LAW-2017",
    title: "Local Law 2017/178 - Office of Nightlife",
    organization: "City of New York",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://codelibrary.amlegal.com/codes/newyorkcity/latest/NYCadmin/0-0-0-129402",
    preferredPublicUrl: "canonical",
    publicCitation: "City of New York, Local Law 2017/178 establishing the Office of Nightlife and advisory board.",
    publicNote: "The law establishes the office and its statutory functions, not the authorship or influence of outside advocates.",
    intakeIds: ["INTAKE-NYCARTC-OFFICE-NIGHTLIFE-MEMORY"],
    supportsGenerally: ["the Office of Nightlife was established", "the office has liaison and support functions", "an advisory board was established"],
    doesNotEstablish: ["Jamie's role", "NYC Artist Coalition's role", "who designed the office", "the impact of later town halls"]
  }
] satisfies SourceRecord[];

export const lifecycleSourceReadings = [
  {
    id: "READ-RIVER-PITCH-2007",
    sourceId: "SRC-RIVER-PITCH-HUCK-FINN-2007",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-RIVER-PITCH-ORIGIN", text: "The article attributes the experiential boat-expedition idea to Jamie.", relationToJamie: "direct-role", supportTags: ["expedition-concept-origin"], confidence: "high", locator: "Opening paragraphs" },
      { id: "PROP-RIVER-PITCH-SCREENING", text: "The article reports that Jamie organized a trolley-history screening that helped frame his interest in Kansas City's lost relationship with the Missouri River.", relationToJamie: "direct-role", supportTags: ["transportation-history-screening", "river-public-purpose"], confidence: "high", locator: "Opening paragraphs" },
      { id: "PROP-RIVER-PITCH-CROSSING", text: "The article reports that the homemade raft crossed Missouri with a group of Kansas City and California participants.", relationToJamie: "collective-role", supportTags: ["collective-missouri-crossing"], confidence: "high", locator: "Opening paragraph" }
    ],
    limitations: ["The available article text documents the Missouri crossing, not the complete later route.", "The expedition was collective even though the origin idea is attributed to Jamie."],
    researchTaskIds: ["TASK-RIVER-ROUTE-CORROBORATION"]
  },
  {
    id: "READ-RIVER-CHARLOTTE-STREET-2009",
    sourceId: "SRC-RIVER-CHARLOTTE-STREET-2009",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-RIVER-CSF-SPEARHEADED", text: "Charlotte Street describes Great Accommodations as spearheaded by Jamie.", relationToJamie: "direct-role", supportTags: ["great-accommodations-leadership"], confidence: "high", locator: "Project description" },
      { id: "PROP-RIVER-CSF-OUTREACH", text: "The project invited river-city histories through outreach Jamie conducted with Suzanne Hogan.", relationToJamie: "collective-role", supportTags: ["river-city-collective-outreach"], confidence: "high", locator: "Project description" },
      { id: "PROP-RIVER-CSF-PROGRAM", text: "The exhibition combined interactive video, participatory sculpture, computer programs, community projects, and working documents.", relationToJamie: "project-context", supportTags: ["participatory-exhibition-form"], confidence: "high", locator: "Exhibition description" },
      { id: "PROP-RIVER-CSF-JOURNEY", text: "The institutional page describes a preceding four-month raft journey from Kansas City down the Missouri and Mississippi until the water tasted salty.", relationToJamie: "direct-role", supportTags: ["four-month-river-route-account"], confidence: "moderate", locator: "Biographical project context" }
    ],
    limitations: ["The route narrative is an institutional publication of participant-supplied project history, not independent route-by-route verification.", "Suzanne Hogan receives collective credit for the documented outreach."],
    researchTaskIds: ["TASK-RIVER-ROUTE-CORROBORATION"]
  },
  {
    id: "READ-OPEN-HOUSE-GOOD-TIMES-2006",
    sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-OPEN-HOUSE-INSTIGATOR", text: "The article describes Jamie as the instigator of Open House.", relationToJamie: "direct-role", supportTags: ["open-house-instigation"], confidence: "high", locator: "Program description" },
      { id: "PROP-OPEN-HOUSE-TENDING", text: "Professor Margaret Morse said the program worked because Jamie was present and tended it.", relationToJamie: "direct-role", supportTags: ["open-house-sustaining-care"], confidence: "high", locator: "Margaret Morse discussion" },
      { id: "PROP-OPEN-HOUSE-COLLECTIVE", text: "Jamie described responsibility and decision-making as communal rather than leader-centered.", relationToJamie: "collective-role", supportTags: ["open-house-collective-governance"], confidence: "high", locator: "Jamie Burkart discussion" },
      { id: "PROP-OPEN-HOUSE-PARTICIPATION", text: "Shop Shows provided an open participatory art setting and the program documented its unfolding process.", relationToJamie: "project-context", supportTags: ["open-house-participatory-program"], confidence: "high", locator: "Shop Shows and documentation discussion" }
    ],
    limitations: ["The report does not support sole authorship of participant work.", "The available page is not a complete participant or program archive."],
    researchTaskIds: ["TASK-OPEN-HOUSE-PARTICIPANT-RECORD"]
  },
  {
    id: "READ-NYCARTC-GOTHAMIST-CABARET-2017",
    sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-NYCARTC-FIRE-CODE-GROUPS", text: "Gothamist reports that Jamie started fire-code study groups for DIY venues after the Ghost Ship fire.", relationToJamie: "direct-role", supportTags: ["fire-code-study-groups"], confidence: "high", locator: "Opening paragraphs" },
      { id: "PROP-NYCARTC-RALLY", text: "Gothamist reports that Jamie rallied at City Hall calling for full Cabaret Law repeal.", relationToJamie: "direct-role", supportTags: ["cabaret-repeal-rally", "cabaret-advocacy-context"], confidence: "high", locator: "Opening paragraphs" },
      { id: "PROP-NYCARTC-AFFILIATION", text: "Gothamist identifies Jamie with NYC Artist Coalition.", relationToJamie: "collective-role", supportTags: ["nycartc-affiliation", "cabaret-advocacy-context"], confidence: "high", locator: "Jamie Burkart quotation attribution" },
      { id: "PROP-NYCARTC-SAFETY-FRAMING", text: "Jamie connected fear of approaching fire officials without a cabaret license to a venue-safety problem.", relationToJamie: "direct-role", supportTags: ["cabaret-safety-framing"], confidence: "high", locator: "Jamie Burkart quotation" }
    ],
    limitations: ["The article does not establish who founded the coalition.", "The article predates enactment and cannot establish causal responsibility for repeal.", "The advocacy involved multiple organizers, venue operators, advocates, and public officials."],
    researchTaskIds: ["TASK-NYCARTC-CABARET-COLLECTIVE-CHRONOLOGY"]
  },
  {
    id: "READ-NYCARTC-NPR-CABARET-2017",
    sourceId: "SRC-NYCARTC-NPR-CABARET-2017",
    status: "needs-access",
    propositions: [],
    limitations: ["The page was not accessible for close reading during this pass; no proposition is attributed to it yet."],
    researchTaskIds: ["TASK-NYCARTC-NPR-CLOSE-READ"]
  },
  {
    id: "READ-NYC-CABARET-REPEAL-LAW-2017",
    sourceId: "SRC-NYC-CABARET-REPEAL-LAW-2017",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-CABARET-REPEAL-ENACTED", text: "The Council legislative record shows Int. 1652-2017 was enacted as Local Law 2017/214.", relationToJamie: "outcome-context", supportTags: ["cabaret-repeal-enacted"], confidence: "high", locator: "Legislation status" }
    ],
    limitations: ["The official record does not establish Jamie's or the coalition's causal contribution."],
    researchTaskIds: ["TASK-NYCARTC-CABARET-COLLECTIVE-CHRONOLOGY"]
  },
  {
    id: "READ-NYC-OFFICE-NIGHTLIFE-LAW-2017",
    sourceId: "SRC-NYC-OFFICE-NIGHTLIFE-LAW-2017",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-OFFICE-NIGHTLIFE-ESTABLISHED", text: "Local Law 2017/178 establishes an Office of Nightlife and advisory board with liaison and support functions.", relationToJamie: "outcome-context", supportTags: ["office-nightlife-established"], confidence: "high", locator: "Statutory text" }
    ],
    limitations: ["The law does not identify outside advocates or establish Jamie's contribution to the office's creation or later public programs."],
    researchTaskIds: ["TASK-NYCARTC-OFFICE-NIGHTLIFE-ROLE"]
  },
  {
    id: "READ-CALLNYC-COUNCIL-POST-SUPERLATIVE",
    sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-CALLNYC-FIRST-COUNCILSTAT", text: "The Council's event-day post identifies the gathering as its first CouncilStat hackathon.", relationToJamie: "project-context", supportTags: ["first-councilstat-wording"], confidence: "high", locator: "Event-day post" },
      { id: "PROP-CALLNYC-COUNCIL-EVENT-DATE-VENUE", text: "The Council posted from Civic Hall on January 30, 2016, about the CouncilStat hackathon.", relationToJamie: "project-context", supportTags: ["callnyc-event-venue"], confidence: "high", locator: "Event-day post" }
    ],
    limitations: ["The post does not support a broader first civic-data, civic-tech, or all-purpose Council hackathon superlative."],
    researchTaskIds: []
  },
  {
    id: "READ-CALLNYC-DIGITAL-DISTRICT-PHOTO",
    sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
    status: "closely-read",
    readAt: "2026-07-12",
    propositions: [
      { id: "PROP-CALLNYC-DIGITAL-DISTRICT-PLACARD", text: "The private participant photograph shows a breakout placard reading 'Digital District - Help improve City Council District office operations.'", relationToJamie: "project-context", supportTags: ["digital-district-placard"], confidence: "high", locator: "Visible placard text" }
    ],
    limitations: ["The image does not establish the overall event title, Jamie's role at the table, participant identities, or public-display permission.", "The image remains outside the public repository."],
    researchTaskIds: ["TASK-CALLNYC-DIGITAL-DISTRICT-CONTEXT"]
  }
] satisfies SourceReading[];

export const lifecycleClaims = [
  {
    id: "CLM-RIVER-EXPEDITION-ORIGIN",
    project: "river-public-engagement",
    internalClaim: "Jamie originated the idea for an experiential boat expedition and organized an earlier transportation-history screening that connected the project to Kansas City's relationship with the Missouri River.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-RIVER-PITCH-2007"],
    requiredSupportTags: ["expedition-concept-origin", "transportation-history-screening", "river-public-purpose"],
    composition: {
      action: "Originated the expedition concept and organized a transportation-history screening.",
      intendedEnd: "Reconnect public imagination about Kansas City with the Missouri River and its transportation history.",
      usableResult: "An experiential expedition concept grounded in a concrete public-history program.",
      audience: "Kansas City residents and cultural participants.",
      collectiveCredit: "The concept and screening role are attributed to Jamie; the expedition was collective.",
      causalBoundary: "The source establishes origin and early organization, not sole authorship or the complete later route."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-RIVER-PITCH-HUCK-FINN-2007", relationship: "direct-support", supports: ["origin of the expedition idea", "Jamie's screening work", "river and transportation purpose"], propositionIds: ["PROP-RIVER-PITCH-ORIGIN", "PROP-RIVER-PITCH-SCREENING"], confidence: "high", renderCitation: false }],
    boundaries: ["Credit the expedition itself as collective work."],
    antiClaims: ["Jamie alone built or completed the raft expedition.", "The Pitch article establishes the complete route to the Gulf of Mexico."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-RIVER-GREAT-ACCOMMODATIONS",
    project: "river-public-engagement",
    internalClaim: "Jamie spearheaded Great Accommodations, a participatory and documentary project that invited river-city residents to contribute histories and imagine urban life around connected waterways; documented outreach was conducted with Suzanne Hogan.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-RIVER-CHARLOTTE-STREET-2009", "INTAKE-JAMIE-FACEBOOK-ARTTATTLER-2009"],
    requiredSupportTags: ["great-accommodations-leadership", "river-city-collective-outreach", "participatory-exhibition-form"],
    composition: {
      action: "Spearheaded a participatory exhibition and conducted river-city outreach with Suzanne Hogan.",
      intendedEnd: "Help residents connect personal and local histories across a shared river system and imagine cities organized around water.",
      usableResult: "An exhibition combining public contributions, interactive media, participatory sculpture, computer programs, and working documents.",
      audience: "Residents and cultural participants in river cities.",
      collectiveCredit: "Jamie is credited with spearheading the project; Suzanne Hogan shares credit for the documented outreach and contributors retain authorship of their material.",
      causalBoundary: "The source documents program form and outreach, not measured civic outcomes."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-RIVER-CHARLOTTE-STREET-2009", relationship: "direct-support", supports: ["Jamie's spearheading role", "participatory and documentary program forms", "collective outreach with Suzanne Hogan"], propositionIds: ["PROP-RIVER-CSF-SPEARHEADED", "PROP-RIVER-CSF-OUTREACH", "PROP-RIVER-CSF-PROGRAM"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009", relationship: "corroborating", supports: ["independent review of the participatory exhibition", "trust and mutual-help premise", "river as connective social infrastructure"], propositionIds: ["PROP-ARTTATTLER-GREAT-ACCOMMODATIONS-PARTICIPATORY", "PROP-ARTTATTLER-GREAT-ACCOMMODATIONS-TRUST"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Preserve Suzanne Hogan's credit for the documented outreach.", "Do not imply measured civic outcomes not reported by the source."],
    antiClaims: ["Jamie solely authored every contribution or community project."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-RIVER-FOUR-MONTH-JOURNEY",
    project: "river-public-engagement",
    internalClaim: "A Charlotte Street institutional record describes Jamie's preceding four-month raft journey from Kansas City down the Missouri and Mississippi until the water tasted salty.",
    status: "use-with-care",
    maturity: "corroborated",
    intakeIds: ["INTAKE-RIVER-CHARLOTTE-STREET-2009", "INTAKE-RIVER-PITCH-2007"],
    requiredSupportTags: ["four-month-river-route-account", "collective-missouri-crossing"],
    projections: [],
    evidence: [
      { sourceId: "SRC-RIVER-CHARLOTTE-STREET-2009", relationship: "direct-support", supports: ["the published four-month and river-route description"], propositionIds: ["PROP-RIVER-CSF-JOURNEY"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-RIVER-PITCH-HUCK-FINN-2007", relationship: "corroborating", supports: ["the expedition's origin and documented Missouri crossing"], propositionIds: ["PROP-RIVER-PITCH-CROSSING"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Attribute the complete route and duration to the Charlotte Street record until independently corroborated."],
    antiClaims: ["The two current sources independently verify every route segment.", "Jamie completed the expedition alone."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-OPEN-HOUSE-INSTIGATION-AND-CARE",
    project: "open-house",
    internalClaim: "Jamie instigated and tended Open House, helping make a communal living and participatory art program usable while explicitly locating responsibility and decisions in the group.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-OPEN-HOUSE-GOOD-TIMES-2006"],
    requiredSupportTags: ["open-house-instigation", "open-house-sustaining-care", "open-house-collective-governance", "open-house-participatory-program"],
    composition: {
      action: "Instigated and continuously tended a communal living and participatory art program.",
      intendedEnd: "Create an open setting where participants could make work, share responsibility, and learn through the process itself.",
      usableResult: "A functioning communal residence, open Shop Shows, collective decision practices, and documentation of the process.",
      audience: "UC Santa Cruz participants and the surrounding public.",
      collectiveCredit: "Jamie initiated and sustained the setting while explicitly locating responsibility and decisions in the group.",
      causalBoundary: "The source does not support sole leadership or authorship of participant work."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006", relationship: "direct-support", supports: ["Jamie's initiating role", "Jamie's sustaining care", "participatory program", "collective governance"], propositionIds: ["PROP-OPEN-HOUSE-INSTIGATOR", "PROP-OPEN-HOUSE-TENDING", "PROP-OPEN-HOUSE-COLLECTIVE", "PROP-OPEN-HOUSE-PARTICIPATION"], confidence: "high", renderCitation: false }],
    boundaries: ["Describe Jamie as an instigator and sustaining organizer, not sole leader or sole author."],
    antiClaims: ["Jamie alone led Open House.", "Jamie authored all participant work."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-CABARET-SAFETY-ORGANIZING",
    project: "nyc-artist-coalition",
    internalClaim: "In 2017 Jamie started fire-code study groups for DIY venues and, as a member of NYC Artist Coalition, rallied at City Hall for full Cabaret Law repeal while framing license-related fear of safety officials as a safety problem.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-NYCARTC-GOTHAMIST-CABARET-2017"],
    requiredSupportTags: ["fire-code-study-groups", "cabaret-repeal-rally", "nycartc-affiliation", "cabaret-safety-framing"],
    composition: {
      action: "Started fire-code study groups and publicly advocated with NYC Artist Coalition for full Cabaret Law repeal.",
      intendedEnd: "Help small cultural spaces understand safety requirements without a discriminatory licensing barrier deterring contact with safety officials.",
      usableResult: "Study groups and a public safety argument brought into the City Hall repeal debate.",
      audience: "DIY venues, cultural-space operators, advocates, and city decision-makers.",
      collectiveCredit: "Jamie's actions are documented within a wider coalition, venue, advocate, and legislative effort.",
      causalBoundary: "The source establishes organizing and advocacy, not sole causation for repeal."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017", relationship: "direct-support", supports: ["fire-code study groups", "coalition affiliation", "City Hall rally", "safety framing"], propositionIds: ["PROP-NYCARTC-FIRE-CODE-GROUPS", "PROP-NYCARTC-RALLY", "PROP-NYCARTC-AFFILIATION", "PROP-NYCARTC-SAFETY-FRAMING"], confidence: "high", renderCitation: false }],
    boundaries: ["Keep the work collective and distinguish advocacy from legislative causation."],
    antiClaims: ["Jamie alone repealed the Cabaret Law.", "Jamie authored the repeal legislation.", "This source proves Jamie founded NYC Artist Coalition."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-CABARET-REPEAL-OUTCOME",
    project: "nyc-artist-coalition",
    internalClaim: "New York City enacted the Cabaret Law repeal as Local Law 2017/214 after a collective advocacy and legislative process.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: ["INTAKE-NYCARTC-GOTHAMIST-CABARET-2017"],
    requiredSupportTags: ["cabaret-repeal-enacted", "cabaret-advocacy-context"],
    projections: [],
    evidence: [
      { sourceId: "SRC-NYC-CABARET-REPEAL-LAW-2017", relationship: "direct-support", supports: ["enactment", "law number"], propositionIds: ["PROP-CABARET-REPEAL-ENACTED"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017", relationship: "context", supports: ["one documented part of the preceding advocacy context"], propositionIds: ["PROP-NYCARTC-RALLY", "PROP-NYCARTC-AFFILIATION"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The current evidence supports the outcome and Jamie's documented advocacy separately; it does not allocate causal shares."],
    antiClaims: ["Jamie or NYC Artist Coalition alone caused repeal."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-CREATION-ROLE-SEED",
    project: "nyc-artist-coalition",
    internalClaim: "Research whether public records and collaborator accounts support an instrumental role for Jamie in creating NYC Artist Coalition.",
    status: "claim-seed",
    maturity: "researching",
    intakeIds: ["INTAKE-NYCARTC-CREATION-ROLE-MEMORY"],
    requiredSupportTags: [],
    projections: [],
    evidence: [],
    boundaries: ["Do not publish a founder or co-founder claim until chronology and collective credit are documented."],
    antiClaims: ["Jamie solely founded NYC Artist Coalition."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart memory intake", "Codex triage"]
  },
  {
    id: "CLM-NYCARTC-OFFICE-NIGHTLIFE-ROLE-SEED",
    project: "nyc-artist-coalition",
    internalClaim: "Research Jamie's and the coalition's precise contribution to creating the Office of Nightlife and producing accountability-oriented public town halls.",
    status: "researching",
    maturity: "researching",
    intakeIds: ["INTAKE-NYCARTC-OFFICE-NIGHTLIFE-MEMORY"],
    requiredSupportTags: [],
    projections: [],
    evidence: [{ sourceId: "SRC-NYC-OFFICE-NIGHTLIFE-LAW-2017", relationship: "context", supports: ["the office's legal establishment and statutory purpose"], propositionIds: ["PROP-OFFICE-NIGHTLIFE-ESTABLISHED"], confidence: "high", renderCitation: false }],
    boundaries: ["The current official source establishes the office, not Jamie's role or town-hall effects."],
    antiClaims: ["Jamie alone created the Office of Nightlife.", "The current source proves the town halls changed office policy."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart memory intake", "Codex triage"]
  },
  {
    id: "CLM-NYCARTC-MARCH-TRANSPARENCY-SEED",
    project: "nyc-artist-coalition",
    internalClaim: "Research the Talks Not Raids transparency work, Jamie's role, and any defensible relationship to changes in or the end of MARCH operations.",
    status: "claim-seed",
    maturity: "researching",
    intakeIds: ["INTAKE-NYCARTC-TALKS-NOT-RAIDS-MEMORY"],
    requiredSupportTags: [],
    projections: [],
    evidence: [],
    boundaries: ["Do not publish the contribution or disbandment claim until the program identity, chronology, coalition activity, and institutional outcome are sourced."],
    antiClaims: ["Jamie or NYC Artist Coalition alone disbanded MARCH operations."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart memory intake", "Codex triage"]
  },
  {
    id: "CLM-CALLNYC-COUNCIL-ENGAGEMENT-SEED",
    project: "callnyc",
    internalClaim: "An authenticated review recovered at least eight then-serving NYC Council member accounts that publicly replied to, reposted, quoted, or directly shared CallNYC between April 2016 and July 2017.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT"],
    requiredSupportTags: ["callnyc-council-eight-recovered", "callnyc-council-member-engagement", "callnyc-independent-follow-on"],
    composition: {
      action: "Built and publicly explained an independent civic-data prototype legible enough for direct exchange with Council offices.",
      intendedEnd: "Help residents find issue-oriented constituent-service pathways and make the underlying CouncilStat records easier to discuss.",
      usableResult: "The recovered public record includes replies, quotes, reposts, or direct shares from at least eight then-serving Council member accounts.",
      audience: "Hiring readers evaluating Jamie's civic-data implementation, public communication, and stakeholder traction.",
      collectiveCredit: "Council members and staff own their responses; the recovered record documents interaction with CallNYC rather than transferring their work or endorsement to Jamie.",
      causalBoundary: "Social engagement documents recognition and exchange, not institutional adoption, endorsement, constituent use, or measured service impact."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-X-REVIEW-CALLNYC-2026", relationship: "direct-support", supports: ["a recovered minimum of eight then-serving Council-member account interactions"], propositionIds: ["PROP-X-CALLNYC-EIGHT-COUNCIL-MEMBERS"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-CHIN-2017", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-CHIN-2017"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-WILLS-2016", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-WILLS-2016"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-MATTEO-2016", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-MATTEO-2016"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-KOO-2016", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-KOO-2016"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-EUGENE-2016", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-EUGENE-2016"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-ROSENTHAL-2016", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-ROSENTHAL-2016"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-MENDEZ-2016", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-MENDEZ-2016"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-RODRIGUEZ-2016", relationship: "corroborating", supports: ["a recovered Council-member account interaction"], propositionIds: ["PROP-X-CALLNYC-RODRIGUEZ-2016"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "direct-support", supports: ["Jamie's independent CallNYC development and public explanation"], propositionIds: ["PROP-CALLNYC-POLITICO-INDEPENDENT-FOLLOW-ON"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Count only recovered, account-verified interactions and preserve access and denominator limits.", "Carlina Rivera's May 2016 quote is recorded separately as a Council staff and later-member interaction, not counted among then-serving members."],
    antiClaims: ["Social engagement proves adoption, endorsement, constituent use, institutional deployment, or public impact.", "The recovered minimum is an exhaustive lifetime interaction count."],
    disposition: {
      reason: "This researchable claim replaces an overbroad adoption inference.",
      predecessorClaimIds: ["CLM-CALLNYC-ENGAGEMENT-EQUALS-ADOPTION-REJECTED"],
      successorClaimIds: [],
      decidedAt: "2026-07-12"
    },
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-CALLNYC-ENGAGEMENT-EQUALS-ADOPTION-REJECTED",
    project: "callnyc",
    internalClaim: "Engagement by Council member accounts would establish adoption or endorsement of CallNYC.",
    status: "rejected",
    maturity: "rejected",
    intakeIds: ["INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT"],
    requiredSupportTags: [],
    projections: [],
    evidence: [],
    boundaries: ["Engagement can be described only at the recovered interaction level."],
    antiClaims: ["Account engagement equals institutional adoption or endorsement."],
    researchInquiryIds: [],
    disposition: {
      reason: "The proposed inference exceeds what likes, reposts, replies, or follows can establish.",
      predecessorClaimIds: [],
      successorClaimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-SEED"],
      decidedAt: "2026-07-12"
    },
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex evidence review"]
  },
  {
    id: "CLM-CALLNYC-FIRST-CIVIC-DATA-HACKATHON-SUPERSEDED",
    project: "callnyc",
    internalClaim: "The event was the Council's first civic-data hackathon.",
    status: "superseded",
    maturity: "superseded",
    intakeIds: ["INTAKE-CALLNYC-SUPERLATIVE-CORRECTION"],
    requiredSupportTags: [],
    projections: [{ key: "archive-note", text: "First civic-data hackathon", status: "deprecated", citationRequired: false, surfaces: [] }],
    evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "supports-boundary", supports: ["the narrower first-CouncilStat wording"], propositionIds: ["PROP-CALLNYC-FIRST-COUNCILSTAT"], confidence: "high", renderCitation: false }],
    boundaries: ["The source supports only the narrower 'first CouncilStat hackathon' description."],
    antiClaims: ["First civic-data hackathon", "First civic-tech hackathon", "First Council hackathon of any kind"],
    researchInquiryIds: [],
    disposition: {
      reason: "The official event-day source supports a narrower superlative.",
      predecessorClaimIds: [],
      successorClaimIds: ["CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON"],
      decidedAt: "2026-07-11"
    },
    reviewedAt: "2026-07-12",
    reviewedBy: ["Codex citational-care review"]
  }
] satisfies ClaimRecord[];

export const lifecycleResearchTasks = [
  {
    id: "TASK-CALLNYC-DIGITAL-DISTRICT-CONTEXT",
    project: "callnyc",
    question: "What public event records can corroborate the Digital District breakout context without publishing the private participant photograph?",
    status: "open",
    priority: "low",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
    sourceIds: ["SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
    claimIds: ["CLM-CALLNYC-DIGITAL-DISTRICT"],
    nextActions: ["Search public event posts and participant accounts for the breakout title.", "Keep the photograph metadata-only until rights and consent are resolved."]
  },
  {
    id: "TASK-RIVER-ROUTE-CORROBORATION",
    project: "river-public-engagement",
    question: "What independent, route-specific evidence can corroborate the four-month journey, participants, dates, and arrival near salt water without collapsing collective credit?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-RIVER-PITCH-2007", "INTAKE-RIVER-CHARLOTTE-STREET-2009"],
    sourceIds: ["SRC-RIVER-PITCH-HUCK-FINN-2007", "SRC-RIVER-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-RIVER-FOUR-MONTH-JOURNEY"],
    nextActions: ["Search contemporaneous press and exhibition records along the route.", "Inspect public-safe expedition logs, maps, photographs, and participant recollections.", "Record participant roles and collective-credit boundaries before projection."]
  },
  {
    id: "TASK-OPEN-HOUSE-PARTICIPANT-RECORD",
    project: "open-house",
    question: "Which public program records and participant accounts can deepen the Open House chronology, outputs, and collective credit?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-OPEN-HOUSE-GOOD-TIMES-2006"],
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
    claimIds: ["CLM-OPEN-HOUSE-INSTIGATION-AND-CARE"],
    nextActions: ["Recover public program materials and contemporaneous documentation.", "Invite participant proof notes with explicit permission and limits.", "Use photo observations as research leads without publishing unapproved images."]
  },
  {
    id: "TASK-NYCARTC-CREATION-ROLE",
    project: "nyc-artist-coalition",
    question: "What founding chronology, public records, and collaborator accounts support Jamie's precise role in creating NYC Artist Coalition?",
    status: "open",
    priority: "critical",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-NYCARTC-CREATION-ROLE-MEMORY"],
    sourceIds: [],
    claimIds: ["CLM-NYCARTC-CREATION-ROLE-SEED"],
    nextActions: ["Recover earliest public coalition pages, domains, social posts, and organizational documents.", "Build a dated founding timeline with named collaborators.", "Request collaborator proof notes about role, purpose, and collective credit."]
  },
  {
    id: "TASK-NYCARTC-CABARET-COLLECTIVE-CHRONOLOGY",
    project: "nyc-artist-coalition",
    question: "How did Jamie's and NYC Artist Coalition's documented safety and repeal work relate to the wider collective advocacy and legislative chronology?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-NYCARTC-GOTHAMIST-CABARET-2017", "INTAKE-NYCARTC-NPR-CABARET-2017"],
    sourceIds: ["SRC-NYCARTC-GOTHAMIST-CABARET-2017", "SRC-NYC-CABARET-REPEAL-LAW-2017", "SRC-NYCARTC-NPR-CABARET-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-SAFETY-ORGANIZING", "CLM-NYCARTC-CABARET-REPEAL-OUTCOME"],
    nextActions: ["Recover hearing testimony, coalition statements, event records, and legislative sponsor accounts.", "Map Jamie's documented actions separately from the collective outcome.", "Preserve credit for coalition members, venue operators, advocates, and public officials."]
  },
  {
    id: "TASK-NYCARTC-NPR-CLOSE-READ",
    project: "nyc-artist-coalition",
    question: "What propositions and limits does the supplied NPR article support after full text is accessible?",
    status: "blocked",
    priority: "medium",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-NYCARTC-NPR-CABARET-2017"],
    sourceIds: ["SRC-NYCARTC-NPR-CABARET-2017"],
    claimIds: [],
    nextActions: ["Recover an accessible public or archived copy.", "Closely read before attaching the article to any Jamie-specific claim."]
  },
  {
    id: "TASK-NYCARTC-OFFICE-NIGHTLIFE-ROLE",
    project: "nyc-artist-coalition",
    question: "What public and archival evidence supports Jamie's and the coalition's precise contribution to creating the Office of Nightlife and producing accountability-oriented town halls?",
    status: "open",
    priority: "critical",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-NYCARTC-OFFICE-NIGHTLIFE-MEMORY"],
    sourceIds: ["SRC-NYC-OFFICE-NIGHTLIFE-LAW-2017"],
    claimIds: ["CLM-NYCARTC-OFFICE-NIGHTLIFE-ROLE-SEED"],
    nextActions: ["Recover bill-hearing testimony, coalition proposals, correspondence suitable for public summary, and press coverage.", "Document each town hall's date, organizers, attendance evidence, outputs, and follow-through.", "Separate contribution to the office's creation from later public-accountability programming."]
  },
  {
    id: "TASK-NYCARTC-MARCH-TRANSPARENCY-OUTCOME",
    project: "nyc-artist-coalition",
    question: "What records establish the Talks Not Raids campaign, its transparency work, Jamie's role, and any relationship to the modification or disbandment of MARCH operations?",
    status: "open",
    priority: "critical",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-NYCARTC-TALKS-NOT-RAIDS-MEMORY", "INTAKE-HELLGATE-NIGHTCLUB-RAIDS-2023", "INTAKE-HELLGATE-CURE-MARCH-2025"],
    sourceIds: ["SRC-HELLGATE-NIGHTCLUB-RAIDS-2023", "SRC-HELLGATE-CURE-MARCH-2025"],
    claimIds: ["CLM-NYCARTC-MARCH-TRANSPARENCY-SEED"],
    nextActions: ["Recover the campaign site, press, public-record requests, agency documents, and dated coalition materials.", "Identify the agency action that changed or ended the initiative.", "Build an evidence chain that distinguishes transparency gains, policy change, collective contribution, and causation."]
  },
  {
    id: "TASK-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT",
    project: "callnyc",
    question: "Which verified NYC Council member accounts engaged with @CallNYCapp, through which actions, and what bounded claim can those records support?",
    status: "resolved",
    priority: "medium",
    openedAt: "2026-07-12",
    intakeIds: ["INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT"],
    sourceIds: [
      "SRC-X-REVIEW-CALLNYC-2026",
      "SRC-X-CALLNYC-CHIN-2017",
      "SRC-X-CALLNYC-WILLS-2016",
      "SRC-X-CALLNYC-MATTEO-2016",
      "SRC-X-CALLNYC-KOO-2016",
      "SRC-X-CALLNYC-EUGENE-2016",
      "SRC-X-CALLNYC-ROSENTHAL-2016",
      "SRC-X-CALLNYC-MENDEZ-2016",
      "SRC-X-CALLNYC-RODRIGUEZ-2016"
    ],
    claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-SEED"],
    nextActions: ["Preserve the eight-member result as a recovered minimum and repeat the review if X indexing or exported account data becomes more complete."],
    resolutionSummary: "Authenticated review recovered 107 unique public statuses across the Posts and Replies routes, preserved three unresolved slots against the observed profile count of 110, and verified a recovered minimum of eight then-serving Council member accounts with replies, quotes, reposts, or direct CallNYC shares. The result is not a native X export, excludes incomplete like and follower histories, and does not imply adoption or endorsement."
  }
] satisfies ResearchTask[];

export const lifecycleProjectionDecisions = [
  { id: "DEC-PUBLISH-CALLNYC-DATE", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", surface: "/work/callnyc", decision: "publish", rationale: "Existing cited case-study claim retained during lifecycle migration.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-CALLNYC-FIRST", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", surface: "/work/callnyc", decision: "publish", rationale: "Existing cited case-study claim retained with the narrower source-supported wording.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-CALLNYC-BRANDING", claimId: "CLM-CALLNYC-EVENT-BRANDING", surface: "/work/callnyc", decision: "publish", rationale: "Existing cited branding claim retained with its formal-title boundary.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-CALLNYC-FOLLOW-ON-CASE", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", surface: "/work/callnyc", decision: "publish", rationale: "Existing flagship case-study projection retained as a supported independent-project claim.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-CALLNYC-FOLLOW-ON-WORK", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", surface: "/work", decision: "publish", rationale: "Existing work-index projection retained as a concise supported summary.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-CALLNYC-FOLLOW-ON-RESUME", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", surface: "/resume", decision: "publish", rationale: "Existing resume projection retained as approved application language.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-CALLNYC-ARCHIVED", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", surface: "/work/callnyc", decision: "publish", rationale: "The archive and unofficial-status boundary is required public context.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-CALLNYC-NOT-RECOVERED", claimId: "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED", surface: "docs/knowledge-bank/projects/callnyc", decision: "publish", rationale: "The bounded negative research finding remains in public-safe documentation.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-HJE-STOREFRONT", claimId: "CLM-HJE-PUBLIC-ECOMMERCE-SURFACE", surface: "/work/harry-j-epstein", decision: "publish", rationale: "Existing cited public-surface claim retained.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-HJE-GROWTH", claimId: "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION", surface: "/work/harry-j-epstein", decision: "publish", rationale: "Existing carefully bounded contribution claim retained.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-FAIRRENT-SURFACE", claimId: "CLM-FAIRRENTNYC-PUBLIC-CAMPAIGN-SURFACE", surface: "/work/fair-rent-nyc", decision: "publish", rationale: "Existing cited public campaign-surface claim retained.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  { id: "DEC-PUBLISH-WOWLIST-SURFACE", claimId: "CLM-WOWLIST-ARCHIVED-PUBLIC-SURFACE", surface: "/work/wowlist", decision: "publish", rationale: "Existing cited archived-surface claim retained.", decidedAt: "2026-07-12", reviewedBy: ["Existing public projection", "Codex migration review"] },
  {
    id: "DEC-RIVER-EXPEDITION-ORIGIN-DEFER",
    claimId: "CLM-RIVER-EXPEDITION-ORIGIN",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale: "The claim is public-ready, but the current job-application argument does not yet include a river-program case study.",
    decidedAt: "2026-07-12",
    reviewedBy: ["Codex editorial review"]
  },
  {
    id: "DEC-RIVER-GREAT-ACCOMMODATIONS-DEFER",
    claimId: "CLM-RIVER-GREAT-ACCOMMODATIONS",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale: "Retain as a strong future proof of participatory program design and public engagement; do not add it to the current site without compositional review.",
    decidedAt: "2026-07-12",
    reviewedBy: ["Codex editorial review"]
  },
  {
    id: "DEC-OPEN-HOUSE-DEFER",
    claimId: "CLM-OPEN-HOUSE-INSTIGATION-AND-CARE",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale: "The claim is strong and relevant to facilitation and program operations, but needs selection against the site's current hiring argument.",
    decidedAt: "2026-07-12",
    reviewedBy: ["Codex editorial review"]
  },
  {
    id: "DEC-NYCARTC-CABARET-ORGANIZING-DEFER",
    claimId: "CLM-NYCARTC-CABARET-SAFETY-ORGANIZING",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale: "The action claim is defensible, but the larger NYC Artist Coalition chronology should be researched before composing a flagship public account.",
    decidedAt: "2026-07-12",
    reviewedBy: ["Codex editorial review"]
  },
  {
    id: "DEC-NYCARTC-CABARET-OUTCOME-DEFER",
    claimId: "CLM-NYCARTC-CABARET-REPEAL-OUTCOME",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale: "The legislative outcome is established, but the contribution chain requires additional collective chronology before portfolio projection.",
    decidedAt: "2026-07-12",
    reviewedBy: ["Codex editorial review"]
  }
] satisfies ProjectionDecision[];
