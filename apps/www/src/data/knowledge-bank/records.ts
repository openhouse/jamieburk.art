import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";

const knowledgeBankInput = {
  intakeItems: [
    {
      id: "INTAKE-2026-07-12-WATERWAYS-AND-OPEN-HOUSE-URLS",
      receivedAt: "2026-07-12",
      inputKind: "url",
      summary: "Three public articles and institutional pages concerning Jamie's raft expedition, waterways-centered participatory work, Open House, and Shop Shows.",
      projectIds: ["waterways-participatory-art", "open-house"],
      researchStatus: "researched",
      publicationStatus: "knowledge-bank-only",
      sourceIds: [
        "SRC-WATERWAYS-PITCH-2007-08-09",
        "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
        "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"
      ],
      observationIds: [
        "OBS-WATERWAYS-PITCH-RAFT-ORIGIN",
        "OBS-WATERWAYS-PITCH-MISSOURI-CROSSING",
        "OBS-WATERWAYS-CHARLOTTE-EXPEDITION",
        "OBS-WATERWAYS-CHARLOTTE-PARTICIPATION",
        "OBS-WATERWAYS-CHARLOTTE-INSTALLATION",
        "OBS-OPEN-HOUSE-GALLERY-RESIDENCY",
        "OBS-OPEN-HOUSE-SHOP-SHOWS",
        "OBS-OPEN-HOUSE-DOCUMENTATION"
      ],
      claimIds: [
        "CLM-WATERWAYS-RAFT-EXPEDITION",
        "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
        "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"
      ],
      researchInquiryIds: [],
      nextActions: [
        "Search Jamie's public archive for route, collaborator, and program documentation before considering a website projection.",
        "Use the project graph to brief photo editors on waterways, raft, Open House, and participatory-program imagery."
      ]
    },
    {
      id: "INTAKE-2026-07-12-NIGHTLIFE-URLS",
      receivedAt: "2026-07-12",
      inputKind: "url",
      summary: "Public reporting and primary government records concerning Jamie's and NYC Artist Coalition's Cabaret Law, Office of Nightlife, town-hall, and MARCH-reform work.",
      projectIds: ["nyc-artist-coalition"],
      researchStatus: "needs-more-research",
      publicationStatus: "knowledge-bank-only",
      sourceIds: [
        "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
        "SRC-NYCA-NPR-CABARET-2017-09-20",
        "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
        "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
        "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
        "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
        "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
        "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
        "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
        "SRC-NYCA-TALKS-NOT-RAIDS",
        "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
        "SRC-NYCA-MAYOR-CURE-2023-12-28"
      ],
      observationIds: [
        "OBS-NYCA-FIRE-CODE-STUDY-GROUPS",
        "OBS-NYCA-CABARET-RALLY",
        "OBS-NYCA-CABARET-TESTIMONY",
        "OBS-NYCA-CABARET-REPEAL-ENACTED",
        "OBS-NYCA-OFFICE-NIGHTLIFE-ENACTED",
        "OBS-NYCA-TOWN-HALL-SPEARHEADED",
        "OBS-NYCA-TOWN-HALL-JAMIE-PARTICIPATION",
        "OBS-NYCA-TALKS-NOT-RAIDS-POSITION",
        "OBS-NYCA-MARCH-TRANSPARENCY-LAW",
        "OBS-NYCA-MARCH-REPLACED-BY-CURE"
      ],
      claimIds: [
        "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
        "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL",
        "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"
      ],
      researchInquiryIds: [
        "INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026",
        "INQ-NYCA-MARCH-CAUSAL-LINK-2026"
      ],
      nextActions: [
        "Recover additional primary coalition records and public testimony identifying Jamie's individual production and drafting responsibilities.",
        "Trace the documented path from Talks Not Raids advocacy to Local Law 220 and the CURE transition without assuming sole causality."
      ]
    },
    {
      id: "INTAKE-2026-07-12-NYCA-FOUNDING-MEMORY",
      receivedAt: "2026-07-12",
      inputKind: "memory",
      summary: "Jamie identifies an instrumental role in creating NYC Artist Coalition and in its nightlife-policy and public-program work.",
      projectIds: ["nyc-artist-coalition"],
      researchStatus: "needs-more-research",
      publicationStatus: "pending",
      sourceIds: [],
      observationIds: [],
      claimIds: ["CLM-NYCA-COFOUNDER-ROLE"],
      researchInquiryIds: ["INQ-NYCA-COFOUNDER-ROLE-2026"],
      nextActions: [
        "Locate contemporaneous founding documents, public biographies, organizational records, and collaborator-confirmed accounts.",
        "Keep the existing approved co-founder wording bounded while the independent citation layer develops."
      ]
    },
    {
      id: "INTAKE-2026-07-12-CALLNYC-COUNCIL-ENGAGEMENT",
      receivedAt: "2026-07-12",
      inputKind: "metric",
      summary: "Candidate evidence concerning engagement with the CallNYC social account by New York City Council member accounts.",
      projectIds: ["callnyc"],
      researchStatus: "needs-more-research",
      publicationStatus: "knowledge-bank-only",
      sourceIds: [
        "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
        "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04"
      ],
      observationIds: [
        "OBS-CALLNYC-MATHIEU-EUGENE-AMPLIFICATION",
        "OBS-CALLNYC-HELEN-ROSENTHAL-PROMOTION"
      ],
      claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      nextActions: [
        "Recover a bounded interaction corpus from authenticated exports, archived pages, supplied PDFs, or API data.",
        "Define Council-member account inclusion, interaction types, date range, deduplication, and inaccessible-content limitations before calculating metrics."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      title: "Civic Hall announcement of New York City Council hackathon",
      organization: "Civic Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-01-29",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://x.com/CivicHall/status/693124020917522433",
      archiveUrl: "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
      preferredPublicUrl: "archive",
      publicCitation: "Civic Hall announcement of a January 30, 2016, 1-3 p.m. New York City Council hackathon focused on constituent services.",
      publicNote: "The archived Civic Hall page preserves the embedded social post. It is not a recovered Civic Hall calendar listing or event-detail page.",
      supportsGenerally: ["January 30, 2016", "1-3 p.m.", "New York City Council hackathon", "constituent-services purpose"],
      doesNotEstablish: ["a recovered Civic Hall calendar listing", "a dedicated event-detail page", "the complete formal event title", "the agenda", "the participant roster"]
    },
    {
      id: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      title: "New York City Council event-day CouncilStat hackathon post",
      organization: "New York City Council",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-01-30",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://x.com/NYCCouncil/status/693509031768506368",
      archiveUrl: "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
      preferredPublicUrl: "archive",
      publicCitation: "New York City Council event-day post from Civic Hall identifying the gathering as the Council's first CouncilStat hackathon.",
      publicNote: "The source supports the narrower 'first CouncilStat hackathon' wording, not a broader historical superlative.",
      supportsGenerally: ["January 30, 2016", "Civic Hall", "first CouncilStat hackathon"],
      doesNotEstablish: ["broader historical hackathon superlatives", "the full agenda", "a complete attendee list", "formal winners", "CallNYC as an official submission"]
    },
    {
      id: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      title: "New York City Council Hackathon promotional graphic",
      organization: "New York City Council / Civic Hall",
      kind: "promotional-graphic",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-11",
      assetUrl: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
      preferredPublicUrl: "asset",
      publicCitation: "NYC Council-branded promotional graphic reading 'New York City Council Hackathon' and displaying labs.council.nyc.",
      publicNote: "The graphic supports the visible event branding, not a longer formal registration title.",
      supportsGenerally: ["New York City Council Hackathon branding", "labs.council.nyc"],
      doesNotEstablish: ["a longer formal registration title", "the agenda", "breakout structure", "participant roster"],
      media: {
        mediaKind: "graphic",
        rightsStatus: "unknown",
        consentStatus: "not-applicable",
        publicDisplayStatus: "metadata-only",
        visibleText: ["New York City Council Hackathon", "labs.council.nyc"]
      }
    },
    {
      id: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      title: "Participant photograph of Digital District breakout placard",
      kind: "participant-photograph",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publicCitation: "Participant photograph showing a placard reading 'Digital District - Help improve City Council District office operations.'",
      publicNote: "The photograph remains outside the public repository pending rights, consent, and editorial review.",
      protectedLocatorId: "PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001",
      supportsGenerally: ["Digital District placard wording", "breakout-table context", "collaborative working setting"],
      doesNotEstablish: ["the official event title", "the facilitator", "the complete agenda", "the event start time", "the identity or consent status of all people depicted"],
      media: {
        mediaKind: "photograph",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold",
        visibleText: ["Digital District", "Help improve City Council District office operations"],
        captureTimestamp: "approximately 2:10 p.m.",
        timestampConfidence: "limited"
      }
    },
    {
      id: "SRC-CALLNYC-POLITICO-2016-03-14",
      title: "Website provides new information about council members' focus",
      organization: "Politico New York",
      author: "Miranda Neubauer",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2016-03-14",
      accessedAt: "2026-07-11",
      archiveUrl: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
      preferredPublicUrl: "archive",
      publicCitation: "Miranda Neubauer, 'Website provides new information about council members' focus,' Politico New York, March 14, 2016.",
      publicNote: "The reporting connects Jamie to the January event, the fuller data release, and his independent development and iteration of CallNYC.",
      supportsGenerally: ["CallNYC existed", "Jamie's relationship to the project", "CouncilStat and event relationship", "press date and coverage"],
      doesNotEstablish: ["CallNYC as an official Council product", "CallNYC as a formal hackathon submission", "CallNYC as a documented winner"]
    },
    {
      id: "SRC-CALLNYC-GITHUB-REPOSITORY",
      title: "CallNYC source repository",
      organization: "openhouse",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://github.com/openhouse/CallNYC",
      preferredPublicUrl: "canonical",
      publicCitation: "Public CallNYC source repository.",
      publicNote: "The repository documents the surviving implementation of the independent, archived prototype.",
      supportsGenerally: ["project implementation", "surviving source code"],
      doesNotEstablish: ["official Council ownership", "formal hackathon submission status", "current resident-service guidance"]
    },
    {
      id: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026",
      title: "Civic Hall calendar and event-detail recovery research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      publicCitation: "Documented 2026 Wayback/CDX review of Civic Hall event captures.",
      publicNote: "The bounded search recovered embedded social-feed evidence but no dedicated Civic Hall listing or event-detail page.",
      protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001",
      supportsGenerally: ["bounded negative search finding", "research method and limitations"],
      doesNotEstablish: ["that no event page ever existed"]
    },
    {
      id: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      title: "CallNYC X timeline capture",
      kind: "archived-web-capture",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      capturedAt: "2026-07-11T18:02:08-04:00",
      accessedAt: "2026-07-12",
      publicCitation: "Seven-page PDF capture of the public CallNYC X timeline, created July 11, 2026.",
      publicNote: "The underlying capture remains outside the public repository. Visual review preserves a bounded timeline slice, not a complete export.",
      protectedLocatorId: "CAPTURE-CALLNYC-X-TIMELINE-2026-07-11",
      supportsGenerally: [
        "visible CallNYC timeline posts",
        "a Mathieu Eugene quote-post of a CallNYC award post",
        "a Helen Rosenthal post directing readers to callnyc.org",
        "visible dates and engagement counts for the captured posts"
      ],
      doesNotEstablish: [
        "a comprehensive account history",
        "all Council-member interactions",
        "deleted or inaccessible posts",
        "endorsement or adoption by the New York City Council",
        "the identity of every account behind aggregate likes or repost counts"
      ]
    },
    {
      id: "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04",
      title: "PBNYC Cycle 6 has begun",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-08-04",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://council.nyc.gov/news/2016/08/04/pbnyc-cycle-6-has-begun/",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, 'PBNYC Cycle 6 has begun,' August 4, 2016.",
      publicNote: "Contemporaneous Council page listing Helen Rosenthal and Mathieu Eugene as Council members by district during the relevant period.",
      supportsGenerally: [
        "Helen Rosenthal served as Council Member for District 6",
        "Mathieu Eugene served as Council Member for District 40",
        "both held office during the captured 2016 interaction period"
      ],
      doesNotEstablish: [
        "their CallNYC interactions",
        "endorsement or adoption of CallNYC",
        "a complete Council-member roster for every CallNYC post",
        "the social-account ownership or verification method"
      ]
    },
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
      publicNote: "Contemporaneous independent reporting on the origin and Missouri portion of the raft expedition.",
      supportsGenerally: [
        "Jamie conceived an experiential boat expedition",
        "the raft used recycled materials",
        "the group crossed Missouri by river",
        "the project responded to Kansas City's lost relationship with the Missouri River"
      ],
      doesNotEstablish: [
        "that Jamie completed the expedition alone",
        "the complete route to the Gulf of Mexico",
        "a complete participant roster",
        "every later waterways program"
      ]
    },
    {
      id: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
      organization: "Charlotte Street Foundation",
      author: "Charlotte Street Foundation",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2009-09-01",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
      preferredPublicUrl: "canonical",
      publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' September 1, 2009.",
      publicNote: "Institutional project description documenting the exhibition, prior raft expedition, outreach, public programs, and participatory methods.",
      supportsGenerally: [
        "Jamie spearheaded Great Accommodations",
        "the project treated rivers as a social network",
        "the earlier raft expedition traveled from Kansas City down the Missouri and Mississippi for four months",
        "the exhibition used participatory, computational, sculptural, video, community, and documentary forms"
      ],
      doesNotEstablish: [
        "solo authorship of collaborators' contributions",
        "the exact final landing location of the raft",
        "current program status",
        "permission to publish every linked photograph"
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
      publicNote: "Contemporaneous reporting on Open House, Shop Shows, communal participation, and working documentation.",
      supportsGenerally: [
        "Jamie initiated a ten-day public communal-living experiment in a UCSC gallery",
        "Jamie and housemates held participatory Shop Shows from 2003 to 2005",
        "participants documented daily activity",
        "the programs invited visitors to shape the environment"
      ],
      doesNotEstablish: [
        "solo authorship of participants' work",
        "a complete attendance record",
        "permission to identify or publish every participant",
        "current program status"
      ]
    },
    {
      id: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
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
      publicNote: "Independent reporting directly identifies Jamie's fire-code study groups, City Hall rally, NYC Artist Coalition affiliation, and safety framing.",
      supportsGenerally: [
        "Jamie organized fire-code study groups for DIY venues",
        "Jamie rallied for full Cabaret Law repeal",
        "Jamie represented an NYC Artist Coalition safety argument"
      ],
      doesNotEstablish: [
        "that Jamie solely led the repeal campaign",
        "that NYC Artist Coalition alone caused repeal",
        "that every venue agreed with the coalition",
        "the later legislative outcome by itself"
      ]
    },
    {
      id: "SRC-NYCA-NPR-CABARET-2017-09-20",
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
      publicNote: "National reporting contextualizing the broader nightlife movement and political moment; the canonical page was robots-blocked during this review and was cross-checked through syndicated copies.",
      supportsGenerally: [
        "a broad nightlife-advocacy movement supported repeal",
        "Councilmember Rafael Espinal advanced nightlife legislation",
        "the repeal effort had national coverage"
      ],
      doesNotEstablish: [
        "Jamie's individual role",
        "NYC Artist Coalition's complete role",
        "sole causality for repeal",
        "the full coalition roster"
      ]
    },
    {
      id: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
      title: "New York City Council Committee on Consumer Affairs Cabaret Law hearing transcript",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-06-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=41F1062B-FC32-4A12-846E-65CEB3BB052C&ID=5316935&M=F",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Committee on Consumer Affairs hearing transcript on Cabaret Law enforcement, June 19, 2017.",
      publicNote: "Primary government record preserving Jamie's testimony as a member of NYC Artist Coalition calling for repeal and representation for low-income communities.",
      supportsGenerally: [
        "Jamie testified before the Council",
        "Jamie identified himself with NYC Artist Coalition",
        "Jamie called for Cabaret Law repeal",
        "Jamie called for low-income-community representation in nightlife governance"
      ],
      doesNotEstablish: [
        "sole authorship of the coalition position",
        "sole causality for repeal",
        "official legal analysis by Jamie",
        "the final legislative vote"
      ]
    },
    {
      id: "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
      title: "Introduction 1652-2017 - Cabaret licensing repeal",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-11-27",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE&ID=3086319",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Introduction 1652-2017, enacted as Local Law 214 of 2017, November 27, 2017.",
      publicNote: "Primary record confirming enactment of the Cabaret licensing repeal and retained safety measures.",
      supportsGenerally: [
        "the Council approved the repeal legislation",
        "the mayor signed it",
        "the law repealed cabaret licensing requirements",
        "some security requirements remained"
      ],
      doesNotEstablish: [
        "which advocates caused enactment",
        "Jamie's individual contribution",
        "that every dancing-related zoning restriction ended",
        "sole coalition causality"
      ]
    },
    {
      id: "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
      title: "Mayor de Blasio Signs Bill Establishing Nightlife Mayor",
      organization: "NYC Mayor's Office of Media and Entertainment",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.nyc.gov/site/mome/news/091917-nightlife-office.page",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Mayor's Office of Media and Entertainment, 'Mayor de Blasio Signs Bill Establishing Nightlife Mayor,' September 19, 2017.",
      publicNote: "Primary city record confirming creation and intended functions of the Office of Nightlife.",
      supportsGenerally: [
        "the Office of Nightlife was established",
        "the office would address nightlife challenges and opportunities",
        "the office would implement taskforce recommendations"
      ],
      doesNotEstablish: [
        "Jamie's individual role",
        "NYC Artist Coalition's complete role",
        "that the office adopted every advocate recommendation",
        "sole causality"
      ]
    },
    {
      id: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      title: "What Can the Night Mayor Do? The DIY Scene Discusses",
      organization: "Bedford + Bowery",
      author: "Cassidy Dawn Graves",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-12",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
      preferredPublicUrl: "canonical",
      publicCitation: "Cassidy Dawn Graves, 'What Can the Night Mayor Do? The DIY Scene Discusses,' Bedford + Bowery, October 12, 2017.",
      publicNote: "Independent reporting describing the town hall as spearheaded by NYC Artist Coalition, the coalition as instrumental in advocacy, and Jamie as a participating coalition speaker.",
      supportsGenerally: [
        "NYC Artist Coalition spearheaded the town hall",
        "independent reporting described the coalition as instrumental in Office of Nightlife and repeal advocacy",
        "Jamie participated as an NYC Artist Coalition speaker"
      ],
      doesNotEstablish: [
        "Jamie's exact production responsibilities",
        "solo coalition leadership",
        "sole causality for legislation",
        "the complete participant roster"
      ]
    },
    {
      id: "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
      title: "Influential Bushwick Artists and Nightlife Advocates Met City Reps to Hash Out Night Mayor Role",
      organization: "Bushwick Daily",
      author: "Andrew Tobia",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-12",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://bushwickdaily.com/news/4985-artists-and-advocates-join-forces-to-protect-nyc-s-diy-culture-and-art-spaces/",
      preferredPublicUrl: "canonical",
      publicCitation: "Andrew Tobia, 'Influential Bushwick Artists and Nightlife Advocates Met City Reps to Hash Out Night Mayor Role,' Bushwick Daily, October 12, 2017.",
      publicNote: "Independent event coverage identifying NYC Artist Coalition as organizer of the packed Market Hotel town hall.",
      supportsGenerally: [
        "NYC Artist Coalition organized the town hall",
        "artists and officials discussed expectations for the Office of Nightlife",
        "the event centered small and culturally significant spaces"
      ],
      doesNotEstablish: [
        "Jamie's exact production responsibilities",
        "the event's official status as a city hearing",
        "sole coalition causality for the office",
        "every attendee's position"
      ]
    },
    {
      id: "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
      title: "Awaiting the Night Mayor",
      organization: "The Village Voice",
      author: "Roshan Abraham",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-11-17",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.villagevoice.com/awaiting-the-night-mayor/",
      preferredPublicUrl: "canonical",
      publicCitation: "Roshan Abraham, 'Awaiting the Night Mayor,' The Village Voice, November 17, 2017.",
      publicNote: "Independent reporting on NYC Artist Coalition's town halls, Cabaret Law advocacy, Office of Nightlife concerns, and enforcement context.",
      supportsGenerally: [
        "NYC Artist Coalition organized the Save NYC Spaces town hall",
        "the coalition hosted town halls with city officials",
        "the broader coalition had legislative successes",
        "MARCH enforcement was part of the public concern"
      ],
      doesNotEstablish: [
        "Jamie's exact individual role",
        "solo causality for legislative outcomes",
        "that every later Office of Nightlife policy followed coalition demands",
        "the complete organizing roster"
      ]
    },
    {
      id: "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
      title: "NYC Artist Coalition letter concerning the Office of Nightlife",
      organization: "NYC Artist Coalition and co-signing organizations",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-08",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://savenycspaces.nycartc.com/download/Night-Mayor-Letter-MOME-9-23-17.pdf",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition and co-signing organizations, letter concerning the Office of Nightlife, September 8, 2017.",
      publicNote: "Public coalition letter inviting city agencies to an October 11 town hall and arguing for an equitable, trust-based Office of Nightlife.",
      supportsGenerally: [
        "NYC Artist Coalition helped convene the October 11 town hall",
        "the coalition sought an equitable and trust-based Office of Nightlife",
        "multiple cultural organizations co-signed the letter"
      ],
      doesNotEstablish: [
        "Jamie's individual authorship",
        "agreement by every nightlife stakeholder",
        "city adoption of every recommendation",
        "sole coalition causality"
      ]
    },
    {
      id: "SRC-NYCA-TALKS-NOT-RAIDS",
      title: "Talks Not Raids: Transparency on MARCH Raids in NYC",
      organization: "Talks Not Raids Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://talksnotraids.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "Talks Not Raids Coalition, 'Talks Not Raids: Transparency on MARCH Raids in NYC.'",
      publicNote: "Public campaign surface advocating trust, transparency, and relationship-based safety work in place of disruptive MARCH raids.",
      supportsGenerally: [
        "the coalition publicly advocated talks rather than raids",
        "the campaign framed MARCH as harmful to vulnerable cultural spaces",
        "the campaign sought trust with public-safety stakeholders"
      ],
      doesNotEstablish: [
        "Jamie's individual authorship",
        "that the campaign alone caused later legislation",
        "that the campaign alone caused replacement of MARCH",
        "the complete coalition history"
      ]
    },
    {
      id: "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
      title: "Introduction 1156-2018 - MARCH reporting and notice requirements",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-12-15",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Introduction 1156-2018, enacted as Local Law 220 of 2019, December 15, 2019.",
      publicNote: "Primary record confirming MARCH reporting requirements and advance-notice and response provisions for establishments.",
      supportsGenerally: [
        "MARCH reporting requirements were enacted",
        "advance written notification was required in many circumstances",
        "establishments gained an opportunity to provide information"
      ],
      doesNotEstablish: [
        "which advocates caused enactment",
        "Jamie's individual role",
        "that MARCH ended in 2019",
        "sole coalition causality"
      ]
    },
    {
      id: "SRC-NYCA-MAYOR-CURE-2023-12-28",
      title: "Mayor Adams Launches CURE, Phasing Out MARCH Enforcement",
      organization: "NYC Mayor's Office",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2023-12-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.nyc.gov/mayors-office/news/2023/12/mayor-adams-launches-effort-enhance-nightlife-safety-strengthen-small-businesses-phasing",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Mayor's Office, 'Mayor Adams Launches Effort to Enhance Nightlife Safety and Strengthen Small Businesses, Phasing Out MARCH Enforcement,' December 28, 2023.",
      publicNote: "Primary city record confirming that CURE replaced MARCH with an engagement-first process; the accompanying transcript names NYC Artist Coalition among nightlife advocates.",
      supportsGenerally: [
        "CURE replaced MARCH",
        "the replacement emphasized communication and correction before enforcement",
        "NYC Artist Coalition was acknowledged among nightlife advocates"
      ],
      doesNotEstablish: [
        "that NYC Artist Coalition alone caused the replacement",
        "Jamie's individual causal contribution",
        "that enforcement ended entirely",
        "that every campaign demand was adopted"
      ]
    }
  ],
  observations: [
    {
      id: "OBS-CALLNYC-MATHIEU-EUGENE-AMPLIFICATION",
      sourceId: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      project: "callnyc",
      text: "The captured timeline visibly preserves an October 4, 2016, post from Dr. Mathieu Eugene quoting CallNYC's October 3 HPD Housing Lottery award post.",
      locator: "PDF page 1, captured timeline near the top",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex PDF text and visual review"]
    },
    {
      id: "OBS-CALLNYC-HELEN-ROSENTHAL-PROMOTION",
      sourceId: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      project: "callnyc",
      text: "The captured timeline visibly preserves a September 27, 2016, post from Helen Rosenthal directing readers to find their Council member through callnyc.org; CallNYC reposted that post.",
      locator: "PDF page 1, captured timeline below the first recommendation module",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex PDF text and visual review"]
    },
    {
      id: "OBS-WATERWAYS-PITCH-RAFT-ORIGIN",
      sourceId: "SRC-WATERWAYS-PITCH-2007-08-09",
      project: "waterways-participatory-art",
      text: "The Pitch reported that Jamie conceived the experiential boat expedition while investigating Kansas City's transportation history and its diminished relationship with the Missouri River.",
      locator: "Article body, opening project-history paragraphs",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-PITCH-MISSOURI-CROSSING",
      sourceId: "SRC-WATERWAYS-PITCH-2007-08-09",
      project: "waterways-participatory-art",
      text: "The Pitch documented a group of Kansas City and California participants crossing Missouri on a homemade raft built from recycled materials.",
      locator: "Article summary and opening body",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-CHARLOTTE-EXPEDITION",
      sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      project: "waterways-participatory-art",
      text: "Charlotte Street's project history records Jamie describing a four-month bicycle-powered paddle-wheel raft journey from Kansas City down the Missouri and Mississippi until the water tasted salty.",
      locator: "Great Accommodations project description, prior-expedition section",
      status: "verified",
      confidence: "moderate",
      claimIds: ["CLM-WATERWAYS-RAFT-EXPEDITION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-CHARLOTTE-PARTICIPATION",
      sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      project: "waterways-participatory-art",
      text: "Great Accommodations invited people across river cities to contribute stories and perspectives through mailed letters, targeted outreach, public programs, and facilitated participation.",
      locator: "Great Accommodations project description, outreach and public-program sections",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-GREAT-ACCOMMODATIONS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-WATERWAYS-CHARLOTTE-INSTALLATION",
      sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
      project: "waterways-participatory-art",
      text: "The institutional description identifies interactive video, participatory sculpture, computer programs, community projects, recycled materials, public programs, facilitation, and working documentation as parts of the exhibition.",
      locator: "Great Accommodations exhibition-format section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-WATERWAYS-GREAT-ACCOMMODATIONS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-OPEN-HOUSE-GALLERY-RESIDENCY",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      project: "open-house",
      text: "Good Times reported that Jamie turned a UCSC gallery allocation into a ten-day public experiment in communal living and open participation.",
      locator: "Article headline and opening project description",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-OPEN-HOUSE-SHOP-SHOWS",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      project: "open-house",
      text: "The article documents earlier Shop Shows held by Jamie and housemates from 2003 to 2005, where visitors were invited to contribute work, perform, share food, and shape the event.",
      locator: "Shop Shows section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-OPEN-HOUSE-DOCUMENTATION",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      project: "open-house",
      text: "Good Times describes participants maintaining detailed records of daily activity and using the project as a setting for dialogue, revision, and collective interpretation.",
      locator: "Open House activity and documentation sections",
      status: "verified",
      confidence: "moderate",
      claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-FIRE-CODE-STUDY-GROUPS",
      sourceId: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
      project: "nyc-artist-coalition",
      text: "Gothamist directly reported that Jamie organized fire-code study groups for New York City DIY venues.",
      locator: "Article opening paragraph",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-CABARET-RALLY",
      sourceId: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
      project: "nyc-artist-coalition",
      text: "Gothamist directly identified Jamie as an NYC Artist Coalition member rallying at City Hall for full Cabaret Law repeal and articulating a safety concern for small venues.",
      locator: "Article opening and Jamie attribution",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-CABARET-TESTIMONY",
      sourceId: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
      project: "nyc-artist-coalition",
      text: "The Council transcript records Jamie identifying himself with NYC Artist Coalition, calling for repeal, and asking for low-income communities to have representation in nightlife governance.",
      locator: "Committee transcript pages 199-202",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-CABARET-REPEAL-ENACTED",
      sourceId: "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
      project: "nyc-artist-coalition",
      text: "The Council record confirms that Introduction 1652 was approved on October 31 and signed as Local Law 214 on November 27, 2017, repealing cabaret licensing requirements while retaining specified safety measures.",
      locator: "Legislation details and enactment history",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-OFFICE-NIGHTLIFE-ENACTED",
      sourceId: "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
      project: "nyc-artist-coalition",
      text: "The city record confirms that legislation establishing the Office of Nightlife was signed on September 19, 2017.",
      locator: "Press release opening and office-description section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-TOWN-HALL-SPEARHEADED",
      sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      project: "nyc-artist-coalition",
      text: "Bedford + Bowery reported that NYC Artist Coalition spearheaded the Market Hotel town hall and described the coalition as instrumental in Office of Nightlife and Cabaret Law advocacy.",
      locator: "Town-hall opening and coalition-history paragraphs",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-TOWN-HALL-JAMIE-PARTICIPATION",
      sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      project: "nyc-artist-coalition",
      text: "The same report identifies Jamie and Olympia Kazi as NYC Artist Coalition participants who had spoken at hearings or town halls.",
      locator: "Town-hall participant paragraph",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-TALKS-NOT-RAIDS-POSITION",
      sourceId: "SRC-NYCA-TALKS-NOT-RAIDS",
      project: "nyc-artist-coalition",
      text: "The public campaign advocated trust, communication, transparency, and relationship-based safety work instead of disruptive MARCH raids.",
      locator: "Campaign overview and coalition statement",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-MARCH-TRANSPARENCY-LAW",
      sourceId: "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
      project: "nyc-artist-coalition",
      text: "Local Law 220 established MARCH reporting and advance-notice provisions and gave establishments an opportunity to provide relevant information before many operations.",
      locator: "Legislation summary and enactment details",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    },
    {
      id: "OBS-NYCA-MARCH-REPLACED-BY-CURE",
      sourceId: "SRC-NYCA-MAYOR-CURE-2023-12-28",
      project: "nyc-artist-coalition",
      text: "The Mayor's Office announced that CURE replaced MARCH with an engagement-first process emphasizing communication and opportunities to correct issues before enforcement.",
      locator: "Press release opening and program-description section",
      status: "verified",
      confidence: "high",
      claimIds: ["CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Codex source review"]
    }
  ],
  claims: [
    {
      id: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      project: "callnyc",
      internalClaim: "The New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016, from 1-3 p.m.",
      status: "confirmed",
      projections: [{ key: "case-study", text: "On January 30, 2016, the New York City Council held a 1-3 p.m. hackathon at Civic Hall focused on constituent services.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", relationship: "direct-support", supports: ["date", "time", "Council event", "constituent-services purpose"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "corroborating", supports: ["date", "venue", "CouncilStat context"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Do not describe the Wayback page as a recovered event calendar listing."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
      project: "callnyc",
      internalClaim: "The New York City Council described the gathering as its first CouncilStat hackathon.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "The Council described the gathering as its first CouncilStat hackathon.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "direct-support", supports: ["the Council's own first-CouncilStat description"], confidence: "high", renderCitation: true }],
      boundaries: [],
      antiClaims: ["first civic-data hackathon", "first civic-tech hackathon", "the Council's first hackathon of any kind"],
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-EVENT-BRANDING",
      project: "callnyc",
      internalClaim: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC", relationship: "direct-support", supports: ["graphic wording", "event branding"], confidence: "high", renderCitation: true }],
      boundaries: ["Treat the wording as visible branding, not proof of a longer formal registration title."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      project: "callnyc",
      internalClaim: "After the fuller CouncilStat dataset was released, Jamie independently built CallNYC as a public-facing interpretation of those constituent-services records.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "After the fuller CouncilStat dataset was released, Jamie developed CallNYC.org as an independent public-facing interpretation of those constituent-services records.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] },
        { key: "work-card", text: "Built an independent civic-data follow-on translating CouncilStat constituent-services records into resident-facing issue pathways and next-step guidance.", status: "active", citationRequired: false, surfaces: ["/work", "/work/callnyc"] },
        { key: "resume-html", text: "Built CallNYC.org as an independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.", status: "active", citationRequired: false, surfaces: ["/resume"] }
      ],
      evidence: [
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "direct-support", supports: ["sequence from the January event through the fuller data release", "Jamie's independent development and iteration", "Politico coverage"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "corroborating", supports: ["surviving implementation of the independent prototype"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["CallNYC was an independent follow-on, not an official Council product, documented formal submission, or winner."],
      antiClaims: ["Jamie caused the CouncilStat release", "CallNYC was commissioned by the Council", "CallNYC was a winning hackathon submission"],
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
      project: "callnyc",
      internalClaim: "CallNYC is an archived independent civic-data prototype, not an official or current New York City Council service.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "CallNYC is an archived independent prototype, not an official or current New York City Council service.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "direct-support", supports: ["surviving independent implementation"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "context", supports: ["contemporaneous independent-project framing"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Historical officeholders, statistics, categories, and contact information are not current guidance."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-DIGITAL-DISTRICT",
      project: "callnyc",
      internalClaim: "A participant photograph documents a breakout table labeled 'Digital District - Help improve City Council District office operations.'",
      status: "use-with-care",
      projections: [{ key: "photo-caption", text: "Participant photograph documenting the Digital District breakout table.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [{ sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO", relationship: "private-support", supports: ["placard wording", "breakout-table context"], confidence: "high", renderCitation: false }],
      boundaries: ["Do not describe Digital District as the official event title.", "Do not publish the photograph before rights, consent, and editorial review."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED",
      project: "callnyc",
      internalClaim: "No Civic Hall calendar listing or dedicated event-detail page was recovered in the documented Wayback/CDX review.",
      status: "not-recovered",
      projections: [{ key: "archive-note", text: "No Civic Hall calendar listing or dedicated event-detail page has been recovered in the documented Wayback/CDX review.", status: "active", citationRequired: false, surfaces: ["docs/knowledge-bank/projects/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026", relationship: "direct-support", supports: ["bounded negative search finding"], confidence: "high", renderCitation: false }],
      boundaries: ["Negative search is not proof of nonexistence.", "The archived Civic Hall page preserves embedded social-feed evidence, not a recovered event listing."],
      antiClaims: ["No Civic Hall event page existed."],
      researchInquiryIds: ["INQ-CALLNYC-CIVIC-HALL-PAGE-2026"], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-WATERWAYS-RAFT-EXPEDITION",
      project: "waterways-participatory-art",
      internalClaim: "Jamie conceived and organized a collaborative bicycle-powered raft expedition built from recycled materials that traveled from Kansas City down the Missouri and Mississippi over four months, using the river as a setting for public encounter and inquiry.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie conceived and organized a collaborative, bicycle-powered raft expedition from Kansas City down the Missouri and Mississippi, connecting river travel, recycled construction, public encounter, and inquiry into how cities relate to their waterways.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/waterways-and-participatory-art"]
      }],
      evidence: [
        {
          sourceId: "SRC-WATERWAYS-PITCH-2007-08-09",
          relationship: "direct-support",
          supports: ["Jamie's conception and organization", "recycled-material raft", "Missouri River journey", "Kansas City waterways inquiry"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
          relationship: "corroborating",
          supports: ["bicycle-powered paddle-wheel design", "four-month duration", "travel down the Missouri and Mississippi", "public encounter along the route"],
          confidence: "moderate",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the expedition as collaborative; do not erase fellow travelers or hosts.",
        "Use the source's salt-water description unless a precise final landing point is separately corroborated."
      ],
      antiClaims: [
        "Jamie completed the expedition alone.",
        "The recovered sources establish every participant or stop.",
        "The raft definitely reached a named Gulf Coast endpoint."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
      project: "waterways-participatory-art",
      internalClaim: "Jamie spearheaded Great Accommodations, a multi-component participatory project that treated river systems as social infrastructure and invited people across river cities to contribute stories, perspectives, and public programs.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie spearheaded Great Accommodations, using exhibitions, correspondence, public programs, facilitation, video, sculpture, software, community projects, and working documentation to help people imagine relationships among river cities.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/waterways-and-participatory-art"]
      }],
      evidence: [{
        sourceId: "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
        relationship: "direct-support",
        supports: ["Jamie spearheaded the project", "river as social network", "public outreach", "participatory and documentary methods"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "Credit Suzanne Hogan and other collaborators when naming their specific contributions.",
        "Do not convert participants' stories into Jamie's authored content."
      ],
      antiClaims: [
        "Jamie alone created every part of Great Accommodations.",
        "The project represented every river community.",
        "All linked images are cleared for publication."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS",
      project: "open-house",
      internalClaim: "Jamie initiated Open House, a ten-day public experiment in communal living inside a UCSC gallery, building on earlier Shop Shows that invited visitors to contribute work, perform, share food, reshape the environment, and document what unfolded.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie initiated Open House, a ten-day gallery experiment in communal living and public participation, building on Shop Shows where visitors contributed art, performance, food, interpretation, and working documentation.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/waterways-and-participatory-art"]
      }],
      evidence: [{
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
        relationship: "direct-support",
        supports: ["Jamie's initiation of Open House", "ten-day communal-living experiment", "Shop Shows history", "open participation and documentation"],
        confidence: "high",
        renderCitation: true
      }],
      boundaries: [
        "Use collective language for housemates, residents, visitors, and participant-created work.",
        "Do not publish participant identities or photographs without appropriate review."
      ],
      antiClaims: [
        "Jamie authored every participant contribution.",
        "The article is a complete attendance or activity record.",
        "Open House was a conventional solo exhibition."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
      project: "nyc-artist-coalition",
      internalClaim: "As part of NYC Artist Coalition and a broader nightlife-advocacy movement, Jamie organized fire-code study groups, rallied, and testified for Cabaret Law repeal; independent reporting described the coalition as instrumental in advocacy before the Council enacted repeal in 2017.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "Jamie contributed directly to the collective campaign to repeal New York City's Cabaret Law by organizing fire-code study groups for DIY venues, rallying at City Hall, testifying before the Council, and advancing a safety-and-equity argument through NYC Artist Coalition. Independent reporting described the coalition as instrumental in the advocacy; the Council enacted repeal in 2017.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [
        {
          sourceId: "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
          relationship: "direct-support",
          supports: ["fire-code study groups", "City Hall rally", "Jamie attribution", "NYC Artist Coalition affiliation"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
          relationship: "direct-support",
          supports: ["Jamie's Council testimony", "call for repeal", "coalition affiliation", "representation request"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
          relationship: "corroborating",
          supports: ["independent description of coalition advocacy as instrumental", "Jamie's coalition participation"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
          relationship: "context",
          supports: ["Council approval", "mayoral signature", "repeal outcome"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-NPR-CABARET-2017-09-20",
          relationship: "context",
          supports: ["broader nightlife-advocacy movement", "national reporting context"],
          confidence: "moderate",
          renderCitation: true
        }
      ],
      boundaries: [
        "The repeal was a collective political outcome involving advocates, venue operators, communities, Council members, city officials, and other organizations.",
        "Name Jamie's documented actions without assigning him sole causality or legal authorship."
      ],
      antiClaims: [
        "Jamie single-handedly repealed the Cabaret Law.",
        "NYC Artist Coalition alone caused repeal.",
        "Jamie authored Local Law 214.",
        "Repeal removed every zoning or safety rule affecting dancing."
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL",
      project: "nyc-artist-coalition",
      internalClaim: "NYC Artist Coalition helped shape the public conversation around the new Office of Nightlife and spearheaded an October 2017 Market Hotel town hall; reporting identifies Jamie as a participating coalition speaker, but his complete individual production role needs further documentation.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "NYC Artist Coalition spearheaded a packed October 2017 Market Hotel town hall where artists, venue operators, officials, and community members articulated expectations for the new Office of Nightlife. Independent reporting identifies Jamie as a participating coalition speaker; research into his complete production role remains open.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [
        {
          sourceId: "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
          relationship: "direct-support",
          supports: ["coalition spearheaded town hall", "Jamie participation", "coalition advocacy context"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
          relationship: "corroborating",
          supports: ["coalition event organization", "packed Market Hotel setting", "public priorities"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
          relationship: "corroborating",
          supports: ["Save NYC Spaces town hall", "city-official participation", "coalition town-hall practice"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
          relationship: "direct-support",
          supports: ["coalition invitation", "October 11 event", "equity and trust priorities"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
          relationship: "context",
          supports: ["Office of Nightlife enactment", "official office purpose"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Do not present Jamie as the sole creator of the Office of Nightlife or sole producer of the town hall.",
        "Keep Jamie's complete production role open until contemporaneous division-of-labor evidence is recovered."
      ],
      antiClaims: [
        "Jamie single-handedly created the Office of Nightlife.",
        "Jamie alone produced the Market Hotel town hall.",
        "The city adopted every town-hall recommendation."
      ],
      researchInquiryIds: ["INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC",
      project: "nyc-artist-coalition",
      internalClaim: "Talks Not Raids publicly advocated trust, transparency, and communication in place of MARCH raids; the city later enacted MARCH reporting and notice requirements and replaced MARCH with CURE, but the campaign's precise causal contribution to those outcomes needs further documentation.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "Talks Not Raids advocated trust, transparency, and communication in place of disruptive MARCH raids. The city later enacted reporting and advance-notice requirements and, in 2023, replaced MARCH with the engagement-first CURE process. The chronology is established; the campaign's precise causal contribution remains an open research question.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }],
      evidence: [
        {
          sourceId: "SRC-NYCA-TALKS-NOT-RAIDS",
          relationship: "direct-support",
          supports: ["campaign position", "trust and communication framing", "MARCH transparency concern"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
          relationship: "context",
          supports: ["reporting requirements", "advance notice", "opportunity to respond"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCA-MAYOR-CURE-2023-12-28",
          relationship: "context",
          supports: ["MARCH replacement", "CURE engagement-first approach", "NYC Artist Coalition acknowledgement among advocates"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The sources establish advocacy and later policy outcomes, but not a complete causal chain.",
        "Do not describe CURE as ending all nightlife enforcement."
      ],
      antiClaims: [
        "Jamie single-handedly disbanded MARCH.",
        "Talks Not Raids alone caused Local Law 220 or CURE.",
        "CURE eliminated enforcement.",
        "Every campaign demand was adopted."
      ],
      researchInquiryIds: ["INQ-NYCA-MARCH-CAUSAL-LINK-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCA-COFOUNDER-ROLE",
      project: "nyc-artist-coalition",
      internalClaim: "Jamie co-founded NYC Artist Coalition and played an instrumental role in creating its operating, civic, and public-communications infrastructure.",
      status: "inference",
      projections: [{
        key: "archive-note",
        text: "Candidate claim: Jamie co-founded NYC Artist Coalition and helped create its operating and public-communications infrastructure.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }],
      evidence: [],
      boundaries: [
        "Existing approved portfolio wording may continue under its current proof-bank guardrail, but the canonical citation layer still needs contemporaneous independent or organizational evidence."
      ],
      antiClaims: [
        "Jamie solely founded NYC Artist Coalition.",
        "Jamie controlled all coalition decisions.",
        "Every coalition accomplishment belongs to Jamie."
      ],
      researchInquiryIds: ["INQ-NYCA-COFOUNDER-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS",
      project: "callnyc",
      internalClaim: "A preserved CallNYC timeline slice shows at least two distinct then-Council-member accounts publicly amplifying CallNYC in September-October 2016: Mathieu Eugene quote-posted a CallNYC award post, and Helen Rosenthal directed readers to callnyc.org.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "A preserved timeline slice shows at least two distinct then-Council-member accounts publicly amplifying CallNYC in 2016: Mathieu Eugene quote-posted a CallNYC award post, and Helen Rosenthal directed readers to callnyc.org. This is a documented lower bound, not a comprehensive engagement count.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/callnyc"]
      }],
      evidence: [
        {
          sourceId: "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
          relationship: "private-support",
          supports: ["Mathieu Eugene quote-post", "Helen Rosenthal callnyc.org promotion", "captured dates", "minimum of two distinct accounts"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04",
          relationship: "supports-boundary",
          supports: ["contemporaneous Council-member status for Helen Rosenthal and Mathieu Eugene"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use at least two and name the captured examples; do not describe the result as comprehensive.",
        "Do not aggregate visible repost and like counts without identifying which accounts performed them.",
        "Engagement does not establish endorsement, adoption, commissioning, or official status."
      ],
      antiClaims: [
        "The Council endorsed CallNYC.",
        "Council members adopted CallNYC.",
        "Only two Council members engaged with CallNYC.",
        "The preserved timeline is a complete export.",
        "Social engagement proves official project status."
      ],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    }
  ],
  researchInquiries: [{
    id: "INQ-CALLNYC-CIVIC-HALL-PAGE-2026",
    project: "callnyc",
    question: "Can a dedicated Civic Hall calendar listing or event-detail page for the January 30, 2016, CouncilStat hackathon be recovered from the searched Wayback/CDX corpus?",
    methods: ["Reviewed 4,630 deduplicated HTML captures and 1,240 original URLs.", "Grouped 296 distinct event-prefix URL keys and inspected 215 successful event pages, 74 redirects, and 7 captured 404s.", "Searched event-like captures for CouncilStat, constituent services, and New York City Council references."],
    runAt: "2026-07-11",
    resultStatus: "not-recovered",
    findings: ["No CouncilStat, constituent-services, or NYC Council event slug was recovered.", "No dedicated Civic Hall event page or calendar listing was recovered.", "The archived Civic Hall page preserves embedded social-feed evidence supporting date, time, venue, branding, CouncilStat context, and constituent-services purpose."],
    limitations: ["Negative search is not proof of nonexistence.", "Google Form contents were not recovered.", "The agenda, breakout roster, and registration contents were not recovered."],
    sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026"],
    publicSummary: "A review of 4,630 deduplicated HTML captures, 1,240 original URLs, and 296 distinct event-prefix keys recovered embedded social-feed evidence but no dedicated Civic Hall listing or event-detail page.",
    protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001"
  },
  {
    id: "INQ-NYCA-COFOUNDER-ROLE-2026",
    project: "nyc-artist-coalition",
    question: "Which contemporaneous public, organizational, and collaborator-approved sources establish Jamie's co-founder role and specific founding responsibilities in NYC Artist Coalition?",
    methods: [
      "Search public organizational histories, archived website biographies, launch materials, and contemporaneous press.",
      "Review public-safe founding documents and request collaborator confirmation where appropriate.",
      "Separate formal title, practical founding labor, website authorship, and collective governance."
    ],
    resultStatus: "queued",
    findings: [],
    limitations: [
      "Jamie's firsthand memory and existing approved resume wording are not substitutes for an independently wired citation layer.",
      "Private coalition records must remain outside the public repository."
    ],
    sourceIds: [],
    publicSummary: "Research is queued to strengthen the independent citation layer for Jamie's co-founder role while preserving collective credit."
  },
  {
    id: "INQ-NYCA-OFFICE-NIGHTLIFE-JAMIE-ROLE-2026",
    project: "nyc-artist-coalition",
    question: "What specific organizing, production, drafting, facilitation, and follow-through responsibilities did Jamie hold in NYC Artist Coalition's Office of Nightlife advocacy and October 2017 town hall?",
    methods: [
      "Close-read independent event coverage, the coalition letter, city records, public event materials, and hearing transcripts.",
      "Search public-safe project archives for role assignments, authored materials, production records, and collaborator-approved accounts.",
      "Keep coalition accomplishment and Jamie's direct contribution as separate linked claims."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "Independent coverage says NYC Artist Coalition spearheaded and organized the Market Hotel town hall.",
      "Independent coverage identifies Jamie as an NYC Artist Coalition participant who spoke at hearings or town halls.",
      "The public coalition letter documents the event's equity, trust, and representation goals.",
      "Jamie's complete individual production and drafting responsibilities are not yet recovered."
    ],
    limitations: [
      "Group-level event credit does not establish Jamie's complete division of labor.",
      "The reviewed sources do not support sole causality for creation of the Office of Nightlife.",
      "Private coalition records and unapproved collaborator accounts remain outside the repo."
    ],
    sourceIds: [
      "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
      "SRC-NYCA-BUSHWICK-DAILY-NIGHT-MAYOR-2017-10-12",
      "SRC-NYCA-VILLAGE-VOICE-NIGHT-MAYOR-2017-11-17",
      "SRC-NYCA-NIGHT-MAYOR-LETTER-2017-09-08",
      "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19"
    ],
    publicSummary: "The coalition's town-hall and advocacy role is strongly documented, and Jamie is documented as a participating coalition speaker; his complete production role remains open."
  },
  {
    id: "INQ-NYCA-MARCH-CAUSAL-LINK-2026",
    project: "nyc-artist-coalition",
    question: "What documented causal contribution did Talks Not Raids, NYC Artist Coalition, and Jamie make to MARCH transparency requirements and the later replacement of MARCH with CURE?",
    methods: [
      "Compare the public campaign's demands with Local Law 220, MARCH reports, CURE materials, hearing testimony, and city acknowledgements.",
      "Search legislative histories and public testimony for explicit references to the campaign, coalition, and Jamie.",
      "Distinguish chronological alignment, public acknowledgement, policy influence, and sole causality."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "Talks Not Raids publicly advocated transparency, trust, communication, and relationship-based safety work in place of disruptive raids.",
      "Local Law 220 later required MARCH reporting and advance notice in many circumstances.",
      "The city replaced MARCH with the engagement-first CURE process in 2023.",
      "The CURE announcement transcript acknowledged NYC Artist Coalition among nightlife advocates, but the reviewed sources do not establish a complete causal chain or Jamie's individual causal contribution."
    ],
    limitations: [
      "Temporal sequence and thematic alignment do not by themselves prove causation.",
      "The reviewed legislation summary does not name every contributing advocate.",
      "Further hearing, drafting, and collaborator evidence is needed before strengthening the causal claim."
    ],
    sourceIds: [
      "SRC-NYCA-TALKS-NOT-RAIDS",
      "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
      "SRC-NYCA-MAYOR-CURE-2023-12-28"
    ],
    publicSummary: "The campaign position, later transparency law, and eventual CURE replacement are documented; the campaign's and Jamie's precise causal contributions remain open."
  },
  {
    id: "INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026",
    project: "callnyc",
    question: "Which New York City Council member accounts engaged with the CallNYC social account, through which interaction types, and during what date range?",
    methods: [
      "Recover authenticated account exports, archived timelines, supplied PDF captures, or API records.",
      "Build a dated Council-member account roster appropriate to the historical period.",
      "Deduplicate posts and classify replies, mentions, reposts, quotes, and likes separately.",
      "Record inaccessible or deleted content as unknown rather than zero."
    ],
    runAt: "2026-07-12",
    resultStatus: "partially-recovered",
    findings: [
      "A seven-page PDF capture was inspected through text extraction and rendered visual review.",
      "The captured timeline visibly preserves Mathieu Eugene quote-posting a CallNYC award post on October 4, 2016.",
      "The captured timeline visibly preserves Helen Rosenthal directing readers to callnyc.org on September 27, 2016.",
      "A contemporaneous Council page confirms both people served as Council members during the relevant period.",
      "The defensible current metric is a lower bound of at least two distinct Council-member accounts visibly amplifying CallNYC in the captured slice."
    ],
    limitations: [
      "The PDF is a bounded timeline capture, not a complete account export.",
      "Platform blocking, deleted posts, account renames, and incomplete archives may limit recall.",
      "Aggregate repost and like counts do not identify every acting account.",
      "Engagement cannot be interpreted as endorsement, adoption, commissioning, or official status without additional evidence."
    ],
    sourceIds: [
      "SRC-CALLNYC-X-TIMELINE-PDF-2026-07-11",
      "SRC-CALLNYC-COUNCIL-PB-ROSTER-2016-08-04"
    ],
    publicSummary: "A preserved timeline slice documents at least two then-Council-member accounts amplifying CallNYC in 2016; comprehensive engagement measurement remains open."
  }],
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" }
  ],
  pages: [{
    id: "callnyc",
    surface: "/work/callnyc",
    sourceOrder: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"
    ],
    occurrences: [
      { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
      { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
      { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
      { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
    ]
  }]
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
