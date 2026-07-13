import type { KnowledgeBank } from "./schema.ts";

type EvidenceBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries" | "pages"
>;

export const evidenceBatchRecords: EvidenceBatch = {
  sources: [
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
      canonicalUrl:
        "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Laura Mattingly, 'Open House,' Good Times, June 28, 2006.",
      publicNote:
        "The profile documents Open House, earlier Shop Shows, communal responsibility, public participation, facilitation, and collective documentation practices.",
      supportsGenerally: [
        "Jamie organized Open House as a public communal-living experiment",
        "Jamie and collaborators created participatory art environments",
        "participants shared responsibility and documentation"
      ],
      doesNotEstablish: [
        "formal employment",
        "sole authorship of every activity",
        "the identity or consent status of every participant"
      ]
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
      publicCitation:
        "Eric Barton, 'When Artists Turn Huck Finn,' The Pitch, August 9, 2007.",
      publicNote:
        "The article attributes the expedition idea to Jamie and documents an early Missouri River stage of the collaborative raft project.",
      supportsGenerally: [
        "Jamie originated the experiential boat-expedition idea",
        "the group traveled on a homemade raft built from recycled materials",
        "the project connected Kansas City transportation history to the Missouri River"
      ],
      doesNotEstablish: [
        "the complete route to the Gulf of Mexico",
        "solo execution of the expedition",
        "the final duration or destination"
      ]
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
      canonicalUrl:
        "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' September 1, 2009.",
      publicNote:
        "The event page documents Jamie's project leadership, collaborative outreach, participatory public programs, and the earlier raft journey down the Missouri and Mississippi Rivers.",
      supportsGenerally: [
        "Jamie spearheaded Great Accommodations",
        "Jamie and Suzanne Hogan invited river communities to contribute stories",
        "Jamie organized a raft project down the Missouri and Mississippi Rivers",
        "the exhibition included participatory programs and working documentation"
      ],
      doesNotEstablish: [
        "solo authorship of all contributions",
        "a verified final landing point on the Gulf of Mexico",
        "current operation of the project"
      ]
    },
    {
      id: "SRC-NYCAC-CABARET-GOTHAMIST-2017",
      title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
      organization: "Gothamist",
      author: "Emma Whitford",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-06-19",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
      publicNote:
        "The reporting identifies Jamie with NYC Artist Coalition, documents his public repeal advocacy and fire-code study groups, and quotes his safety analysis.",
      supportsGenerally: [
        "Jamie publicly advocated for full repeal of the Cabaret Law",
        "Jamie organized fire-code study groups for DIY venues",
        "Jamie represented NYC Artist Coalition in public reporting"
      ],
      doesNotEstablish: [
        "Jamie alone caused repeal",
        "Jamie authored the repeal legislation",
        "NYC Artist Coalition was the only advocacy group involved"
      ]
    },
    {
      id: "SRC-NYCAC-CABARET-NPR-2017",
      title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife",
      organization: "NPR",
      author: "Andy Beta",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-20",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife?renderPlatform=nprone_ios&unified=true",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Andy Beta, 'With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife,' NPR, September 20, 2017.",
      publicNote:
        "The article provides contemporaneous national context for the repeal movement and the law's effects. It is contextual evidence, not Jamie-specific role evidence.",
      supportsGenerally: [
        "the Cabaret Law repeal movement had broad nightlife support",
        "the law regulated dancing in public establishments",
        "repeal was advancing in 2017"
      ],
      doesNotEstablish: [
        "Jamie's individual role",
        "NYC Artist Coalition's exact contribution",
        "a single cause of repeal"
      ]
    },
    {
      id: "SRC-NYC-COUNCIL-CABARET-REPEAL-2017",
      title: "Council vote to repeal the New York City Cabaret Law of 1926",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-31",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://council.nyc.gov/press/2017/10/31/1541/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council, 'Council to Vote ... to Repeal the New York City Cabaret Law of 1926,' October 31, 2017.",
      publicNote:
        "The Council record establishes the repeal vote and the official description of the law's discriminatory and suppressive history.",
      supportsGenerally: [
        "the Council voted to repeal the Cabaret Law in 2017",
        "the Council described the law as targeting specific groups",
        "Introduction 1652-A retained specified security requirements"
      ],
      doesNotEstablish: [
        "Jamie's individual contribution",
        "NYC Artist Coalition as sole cause",
        "the complete history of repeal advocacy"
      ]
    },
    {
      id: "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
      title: "Mayor de Blasio Signs Bill Establishing Nightlife Mayor",
      organization: "NYC Mayor's Office of Media and Entertainment",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.nyc.gov/site/mome/news/091917-nightlife-office.page",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Mayor's Office of Media and Entertainment, 'Mayor de Blasio Signs Bill Establishing Nightlife Mayor,' September 19, 2017.",
      publicNote:
        "The government record establishes creation, intended duties, and institutional placement of the Office of Nightlife.",
      supportsGenerally: [
        "the Office of Nightlife was created in 2017",
        "the office was intended as a liaison among agencies, industry, and residents",
        "the legislation also established an advisory board"
      ],
      doesNotEstablish: [
        "Jamie's individual contribution",
        "which advocates were decisive",
        "later performance of the office"
      ]
    },
    {
      id: "SRC-NYCAC-NIGHT-MAYOR-TOWN-HALL-2017",
      title: "Tell NYC's Night Mayor: Save NYC Spaces",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-13",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://nycartc.com/nightmayor/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition, 'Tell NYC's Night Mayor: Save NYC Spaces,' October 13, 2017.",
      publicNote:
        "The coalition page documents the October 11 Market Hotel town hall and its public-input purpose.",
      supportsGenerally: [
        "NYC Artist Coalition organized a public Office of Nightlife town hall",
        "the event centered grassroots cultural spaces",
        "city officials and cultural participants were invited into dialogue"
      ],
      doesNotEstablish: [
        "Jamie as sole producer",
        "the exact attendance count",
        "the event as the only input into the office"
      ]
    },
    {
      id: "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
      title: "What Can the Night Mayor Do? The DIY Scene Discusses",
      organization: "Bedford + Bowery",
      author: "Cassidy Dawn Graves",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-12",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Cassidy Dawn Graves, 'What Can the Night Mayor Do? The DIY Scene Discusses,' Bedford + Bowery, October 12, 2017.",
      publicNote:
        "The reporting describes NYC Artist Coalition as instrumental in Office of Nightlife and Cabaret Law advocacy, identifies Jamie as a coalition speaker, and documents the town hall.",
      supportsGenerally: [
        "NYC Artist Coalition spearheaded the Office of Nightlife town hall",
        "the coalition was contemporaneously described as instrumental in related advocacy",
        "Jamie participated as an NYC Artist Coalition speaker"
      ],
      doesNotEstablish: [
        "Jamie alone created the Office of Nightlife",
        "Jamie alone repealed the Cabaret Law",
        "solo production of the town hall"
      ]
    },
    {
      id: "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
      title: "Talks Not Raids: Transparency on M.A.R.C.H. Raids in NYC",
      organization: "NYC Artist Coalition and coalition partners",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://talksnotraids.com/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition and coalition partners, 'Talks Not Raids: Transparency on M.A.R.C.H. Raids in NYC.'",
      publicNote:
        "The campaign site documents the public action model, coalition, Council sponsor tracking, and transparency goals around Introduction 1156.",
      supportsGenerally: [
        "Talks Not Raids advocated for transparency and notice around MARCH operations",
        "the campaign tracked Council sponsorship",
        "the campaign connected public calls, source material, coalition partners, and legislative action"
      ],
      doesNotEstablish: [
        "the final number of supporters at every date",
        "the campaign as sole cause of enactment",
        "the campaign as sole cause of MARCH disbanding"
      ]
    },
    {
      id: "SRC-NYC-COUNCIL-INT-1156-2018",
      title: "Introduction 1156-2018 - MARCH reporting and notice requirements",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-10-17",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342&Options=ID%7CText%7C&Search=1156",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council, Introduction 1156-2018, enacted as Local Law 220 of 2019.",
      publicNote:
        "The legislative record establishes enactment, 19 Council sponsors, reporting requirements, and notice requirements for MARCH operations.",
      supportsGenerally: [
        "Introduction 1156 became Local Law 220 of 2019",
        "the enacted law required MARCH reporting",
        "the enacted law required advance notice with stated exceptions",
        "the final measure had 19 Council sponsors"
      ],
      doesNotEstablish: [
        "Jamie as the bill author",
        "one organization as sole cause of passage",
        "later disbanding of MARCH"
      ]
    },
    {
      id: "SRC-BUSHWICK-DAILY-MARCH-DISBANDS-2023",
      title: "The MARCH Disbands",
      organization: "Bushwick Daily",
      author: "Rachel Lu",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-02-10",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://bushwickdaily.com/music-and-nightlife/end-of-march-nyc-eric-adams-paragon/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Rachel Lu, 'The MARCH Disbands,' Bushwick Daily, February 10, 2024.",
      publicNote:
        "The reporting documents the administration's disbanding of MARCH and replacement with CURE. It does not establish a single causal chain from earlier advocacy.",
      supportsGenerally: [
        "the Adams administration disbanded MARCH",
        "MARCH was replaced with CURE",
        "officials described parts of MARCH as discriminatory"
      ],
      doesNotEstablish: [
        "Talks Not Raids as sole cause of disbanding",
        "Jamie as sole cause of disbanding",
        "continuous institutional conditions between 2018 and 2024"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
      project: "participatory-public-systems",
      internalClaim:
        "Jamie's early participatory cultural work created shared structures through which people could inhabit, document, and shape public experiences together.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "about",
          text:
            "Before I used the language of technical project management, I was organizing participatory public systems: a communal gallery-house in Santa Cruz, a collaborative human-powered raft expedition that traveled more than 1,000 miles from Kansas City down the Missouri and Mississippi Rivers, and a Kansas City exhibition inviting river communities to contribute their own stories and perspectives.",
          status: "active",
          citationRequired: true,
          surfaces: ["/about"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
          relationship: "direct-support",
          supports: ["communal gallery-house", "participatory governance", "collective documentation"],
          locator: "Open House profile and Shop Shows sections",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-RAFT-PITCH-2007",
          relationship: "direct-support",
          supports: ["Jamie's raft-expedition idea", "Missouri River stage"],
          locator: "Article introduction",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
          relationship: "direct-support",
          supports: ["Missouri and Mississippi route", "river-community outreach", "participatory exhibition"],
          locator: "Project description and public-program listing",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-RAFT-SOUNDINGS-2007",
          relationship: "corroborating",
          supports: [
            "the Kansas City starting point",
            "more than 1,000 miles traveled",
            "human-powered construction",
            "invitations for people encountered along the route to participate"
          ],
          locator: "Expedition background and participant sections",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use this as a professional throughline, not as formal employment history.",
        "Preserve collaborator and participant credit.",
        "Do not state the final Gulf landing point until route evidence is completed."
      ],
      antiClaims: [
        "Jamie alone created every part of the projects",
        "the raft's exact final destination is fully established",
        "every participant consented to current photo publication"
      ],
      researchInquiryIds: ["INQ-RIVER-RAFT-ROUTE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-NYCAC-CIVIC-ADVOCACY-2017",
      project: "nyc-artist-coalition",
      internalClaim:
        "Jamie publicly advocated through NYC Artist Coalition for Cabaret Law repeal and participated in coalition convenings about the Office of Nightlife.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "In 2017, Jamie publicly advocated through NYC Artist Coalition for full repeal of the Cabaret Law and participated in coalition town halls that brought artists, venue operators, council members, and city officials into conversation about the new Office of Nightlife.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-CABARET-GOTHAMIST-2017",
          relationship: "direct-support",
          supports: ["Jamie's public repeal advocacy", "NYC Artist Coalition affiliation", "fire-code study groups"],
          locator: "Opening section and Jamie quotation",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
          relationship: "direct-support",
          supports: ["coalition town hall", "Jamie's participation as a speaker", "Office of Nightlife context"],
          locator: "Town hall description and speaker list",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
          relationship: "context",
          supports: ["creation and purpose of the Office of Nightlife"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-COUNCIL-CABARET-REPEAL-2017",
          relationship: "context",
          supports: ["Council repeal vote and official outcome"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Use helped, advocated, participated, built, and organized within collective-work context.",
        "Do not collapse coalition advocacy, legislative sponsorship, and enactment into solo causality."
      ],
      antiClaims: [
        "Jamie alone repealed the Cabaret Law",
        "Jamie authored the legislation",
        "Jamie alone created the Office of Nightlife"
      ],
      researchInquiryIds: ["INQ-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-TALKS-NOT-RAIDS-TRANSPARENCY",
      project: "nyc-artist-coalition",
      internalClaim:
        "The collective Talks Not Raids campaign translated MARCH transparency legislation into a public action surface; Introduction 1156 later became Local Law 220 of 2019.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "The collective Talks Not Raids campaign turned MARCH transparency legislation into a public action surface with explanatory sources, calls to Council members, coalition participation, and sponsor tracking. Introduction 1156 ultimately became Local Law 220 of 2019, requiring reporting and advance notice around MARCH operations.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
          relationship: "direct-support",
          supports: ["public action surface", "coalition participation", "sponsor tracking", "campaign transparency goal"],
          locator: "Campaign introduction, progress, sponsor, and coalition sections",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-COUNCIL-INT-1156-2018",
          relationship: "direct-support",
          supports: ["enactment as Local Law 220 of 2019", "reporting requirements", "advance notice requirements"],
          locator: "Legislation status, summary, and enacted text",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Treat the campaign as collective work.",
        "Do not state that the campaign alone caused passage or MARCH disbanding."
      ],
      antiClaims: [
        "Jamie alone passed Local Law 220",
        "Talks Not Raids alone disbanded MARCH",
        "the campaign site proves every historical sponsor count"
      ],
      researchInquiryIds: ["INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-RIVER-RAFT-ROUTE-2026",
      project: "participatory-public-systems",
      question:
        "What complete route, dates, stops, collaborators, and final landing point can be established for the raft expedition?",
      methods: [
        "Closely read the supplied Pitch and Charlotte Street sources.",
        "Separated documented river segments from the remembered Gulf destination."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "The Pitch documents Jamie originating the idea and an early Missouri stage.",
        "Charlotte Street documents travel from Kansas City down the Missouri and Mississippi Rivers until the water tasted salty, four months on the river, and a 51-day Vicksburg delay."
      ],
      limitations: [
        "The reviewed sources do not name the exact final landing point.",
        "The complete participant roster, route chronology, and return logistics require further archival research."
      ],
      sourceIds: [
        "SRC-RAFT-PITCH-2007",
        "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"
      ],
      publicSummary:
        "Public sources establish a collaborative raft journey from Kansas City down the Missouri and Mississippi Rivers; exact route and landing details remain under research."
    },
    {
      id: "INQ-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026",
      project: "nyc-artist-coalition",
      question:
        "What is the strongest source-backed wording for Jamie's individual role within collective advocacy around Cabaret Law repeal and creation of the Office of Nightlife?",
      methods: [
        "Compared contemporaneous reporting, coalition event records, and official enactment records.",
        "Separated Jamie-specific acts, coalition-level influence, legislative sponsorship, and official enactment."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "Gothamist directly documents Jamie's public repeal advocacy and NYC Artist Coalition affiliation.",
        "Bedford + Bowery names Jamie as a coalition speaker and describes NYC Artist Coalition as instrumental in Office of Nightlife and Cabaret Law advocacy.",
        "Official records establish enactment but do not allocate causal credit among advocates."
      ],
      limitations: [
        "The reviewed sources support helped and advocated, not solo creation or sole causality.",
        "Further coalition records and collaborator testimony may clarify Jamie's production and strategy responsibilities."
      ],
      sourceIds: [
        "SRC-NYCAC-CABARET-GOTHAMIST-2017",
        "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
        "SRC-NYCAC-NIGHT-MAYOR-TOWN-HALL-2017",
        "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
        "SRC-NYC-COUNCIL-CABARET-REPEAL-2017"
      ],
      publicSummary:
        "Contemporaneous sources support Jamie's direct advocacy and participation within an NYC Artist Coalition effort described at the time as instrumental; official enactment remained collective and legislative."
    },
    {
      id: "INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026",
      project: "nyc-artist-coalition",
      question:
        "What causal relationship, if any, can be established between Talks Not Raids, Local Law 220, and the later disbanding of MARCH?",
      methods: [
        "Compared the campaign site, enacted legislation, and later reporting on MARCH disbanding.",
        "Distinguished chronology and policy continuity from causal attribution."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "Talks Not Raids advocated for the transparency and notice provisions in Introduction 1156.",
        "Introduction 1156 became Local Law 220 of 2019.",
        "Bushwick Daily reported in 2024 that the Adams administration disbanded MARCH and replaced it with CURE."
      ],
      limitations: [
        "The reviewed sources do not establish that Talks Not Raids caused the later disbanding.",
        "The institutional path from reporting reform to disbanding requires more government and collaborator evidence."
      ],
      sourceIds: [
        "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
        "SRC-NYC-COUNCIL-INT-1156-2018",
        "SRC-BUSHWICK-DAILY-MARCH-DISBANDS-2023"
      ],
      publicSummary:
        "The record establishes campaign advocacy, enacted transparency reforms, and later MARCH disbanding, but not a single proven causal chain among them."
    },
    {
      id: "INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026",
      project: "callnyc",
      question:
        "What comprehensive engagement by New York City Council member accounts with the CallNYC account can be recovered and verified?",
      methods: [
        "Preserved the research question as an intake-backed inquiry.",
        "Reviewed a bounded rendered profile capture and recovered its public post links.",
        "Separated direct replies and amplifications from outbound mentions, anonymous reaction totals, and project-authored posts naming Council members.",
        "Deferred exact quantitative reporting until an account export or another complete interaction corpus is available."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "Helen Rosenthal's account directly directed residents to CallNYC.",
        "Mathieu Eugene's account amplified a CallNYC housing-service recognition.",
        "These sources establish a minimum of two distinct then-sitting Council-member accounts engaging directly with CallNYC, not a comprehensive total."
      ],
      limitations: [
        "The rendered profile capture contains only the timeline segment loaded at capture time.",
        "Deleted posts, quote posts, replies, likes, and account renames may require archive or platform-export research."
      ],
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
        "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
        "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016"
      ],
      publicSummary:
        "At least two then-sitting Council-member accounts directly engaged with CallNYC in the recovered record; no comprehensive account total has been promoted."
    }
  ],
  pages: [
    {
      id: "about",
      surface: "/about",
      sourceOrder: [
        "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
        "SRC-RAFT-PITCH-2007",
        "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
        "SRC-RAFT-SOUNDINGS-2007"
      ],
      occurrences: [
        {
          id: "participatory-public-systems-throughline",
          claimId: "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
          projection: "about",
          sourceIds: [
            "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
            "SRC-RAFT-PITCH-2007",
            "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
            "SRC-RAFT-SOUNDINGS-2007"
          ]
        }
      ]
    },
    {
      id: "fair-rent-nyc",
      surface: "/work/fair-rent-nyc",
      sourceOrder: [
        "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
        "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
        "SRC-NYCAC-CABARET-GOTHAMIST-2017",
        "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
        "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
        "SRC-NYC-COUNCIL-CABARET-REPEAL-2017",
        "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
        "SRC-NYC-COUNCIL-INT-1156-2018",
        "SRC-LET-NYC-DANCE-CAMPAIGN-SITE",
        "SRC-SAVE-NYC-SPACES-CAMPAIGN-SITE",
        "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY",
        "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
        "SRC-NYCAC-SOCIAL-FAIR-RENT-2026",
        "SRC-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
        "SRC-NYCAC-SOCIAL-ARTIST-LABOR-2026",
        "SRC-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025"
      ],
      occurrences: [
        {
          id: "crs-shared-memory-operations",
          claimId: "CLM-CRS-SHARED-MEMORY-OPERATIONS",
          projection: "case-study"
        },
        {
          id: "nycac-public-testimony-2017-2019",
          claimId: "CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019",
          projection: "case-study",
          sourceIds: [
            "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
            "SRC-NYC-COUNCIL-MARCH-HEARING-2019"
          ]
        },
        {
          id: "nycac-civic-advocacy-2017",
          claimId: "CLM-NYCAC-CIVIC-ADVOCACY-2017",
          projection: "case-study",
          sourceIds: [
            "SRC-NYCAC-CABARET-GOTHAMIST-2017",
            "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
            "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
            "SRC-NYC-COUNCIL-CABARET-REPEAL-2017"
          ]
        },
        {
          id: "talks-not-raids-transparency",
          claimId: "CLM-TALKS-NOT-RAIDS-TRANSPARENCY",
          projection: "case-study",
          sourceIds: [
            "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
            "SRC-NYC-COUNCIL-INT-1156-2018"
          ]
        },
        {
          id: "nycac-campaign-press-infrastructure",
          claimId: "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE",
          projection: "case-study",
          sourceIds: [
            "SRC-LET-NYC-DANCE-CAMPAIGN-SITE",
            "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
            "SRC-SAVE-NYC-SPACES-CAMPAIGN-SITE",
            "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY"
          ]
        },
        {
          id: "crs-privacy-preserving-data-pilot",
          claimId: "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT",
          projection: "case-study",
          sourceIds: ["SRC-CRS-FULLER-PUBLIC-BASELINE-2026"]
        },
        {
          id: "nycac-resource-and-advocacy-surface",
          claimId: "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
          projection: "case-study",
          sourceIds: [
            "SRC-NYCAC-SOCIAL-FAIR-RENT-2026",
            "SRC-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
            "SRC-NYCAC-SOCIAL-ARTIST-LABOR-2026",
            "SRC-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025"
          ]
        }
      ]
    }
  ]
};
