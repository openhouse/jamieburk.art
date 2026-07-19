import type { KnowledgeBank } from "./schema.ts";

type StrengtheningBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries" | "pages"
>;

export const strengtheningBatchRecords: StrengtheningBatch = {
  sources: [
    {
      id: "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
      title: "Committee on Consumer Affairs transcript: Enforcement of New York City's Cabaret Law",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-06-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=41F1062B-FC32-4A12-846E-65CEB3BB052C&ID=5316935&M=F",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Committee on Consumer Affairs hearing transcript, June 19, 2017.",
      publicNote: "The official transcript lists Jamie as an NYC Artist Coalition representative and records his testimony urging Cabaret Law repeal and a trust-based safety approach.",
      supportsGenerally: [
        "Jamie testified publicly as a member of NYC Artist Coalition",
        "Jamie urged full repeal of the Cabaret Law",
        "Jamie connected safety to trust and access for community spaces"
      ],
      doesNotEstablish: [
        "Jamie as author of the repeal legislation",
        "Jamie or NYC Artist Coalition as sole cause of repeal",
        "the accuracy of every historical assertion made by every witness"
      ]
    },
    {
      id: "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
      title: "Committee on the Justice System transcript: MARCH operations and Introduction 1156",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-02-11",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Committee on the Justice System hearing transcript, February 11, 2019.",
      publicNote: "The official transcript records Jamie's testimony for Talks Not Raids, transparency, cooperative compliance, and coalition fire-safety work. Earlier in the hearing, Council Chair Rory Lancman repeatedly used NYC Artist Coalition's FOIL-derived analysis to question NYPD and proposed a follow-up meeting with the coalition.",
      supportsGenerally: [
        "Jamie testified publicly as an NYC Artist Coalition member",
        "Jamie called for transparency and talks rather than MARCH raids",
        "Jamie described coalition fire-safety walk-throughs, workshops, and study groups",
        "Council Chair Rory Lancman used coalition FOIL analysis to question NYPD about non-enforcement outcomes and racial disparities",
        "Lancman proposed a follow-up meeting involving NYPD, the coalition, Council members, and Council staff"
      ],
      doesNotEstablish: [
        "independent verification of the study-group pass-rate statement",
        "Jamie as author of Introduction 1156",
        "Jamie or Talks Not Raids as sole cause of later policy changes"
      ]
    },
    {
      id: "SRC-VICE-NYCAC-DIY-SAFETY-2017",
      title: "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety",
      organization: "VICE",
      author: "Alexander Iadarola",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-21",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/",
      preferredPublicUrl: "canonical",
      publicCitation: "Alexander Iadarola, 'A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety,' VICE, March 21, 2017.",
      publicNote: "Contemporaneous reporting documents NYC Artist Coalition's early formation, public-safety purpose, and meeting with the cultural-affairs commissioner.",
      supportsGenerally: [
        "NYC Artist Coalition formed in early 2017 after the Ghost Ship fire",
        "the coalition advocated for informal community spaces",
        "affordability, safety, and access to space were early priorities"
      ],
      doesNotEstablish: [
        "Jamie's individual founding role",
        "the coalition's complete membership or governance",
        "a causal relationship to later legislation"
      ]
    },
    {
      id: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      title: "Awaiting the 'Night Mayor'",
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
      publicNote: "The article documents an NYC Artist Coalition town hall of about one hundred people and situates the coalition within broader nightlife advocacy.",
      supportsGenerally: [
        "NYC Artist Coalition organized the Save NYC Spaces town hall",
        "about one hundred people attended with Council and agency representatives",
        "the coalition hosted town halls to bring DIY-community concerns to city officials"
      ],
      doesNotEstablish: [
        "Jamie's individual production responsibilities",
        "the coalition as sole cause of Cabaret Law repeal",
        "the exact attendance count as audited registration data"
      ]
    },
    {
      id: "SRC-NYC-MAYOR-CURE-MARCH-2023",
      title: "Mayor Adams launches CURE and phases out MARCH enforcement",
      organization: "NYC Mayor's Office",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2023-12-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.nyc.gov/mayors-office/news/2023/12/transcript-mayor-adams-launches-effort-enhance-nightlife-safety-strengthen-small",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Mayor's Office, transcript announcing CURE and the phaseout of MARCH enforcement, December 28, 2023.",
      publicNote: "The official announcement names NYC Artist Coalition among advocates and documents the administration's replacement of MARCH with a communication-first compliance model.",
      supportsGenerally: [
        "the City phased out MARCH and launched CURE",
        "NYC Artist Coalition was acknowledged among participating advocates",
        "CURE emphasized communication and opportunities to correct issues before enforcement"
      ],
      doesNotEstablish: [
        "Jamie's individual role in the 2023 announcement",
        "Talks Not Raids as sole cause of the change",
        "a complete causal history from 2017 advocacy to 2023 policy"
      ]
    },
    {
      id: "SRC-CREATENYC-NYCAC-APPENDIX-2017",
      title: "CreateNYC appendix: Preserve Community-Driven Spaces",
      organization: "NYC Department of Cultural Affairs / NYC Artist Coalition",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-07-01",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Department of Cultural Affairs, CreateNYC appendix preserving NYC Artist Coalition recommendations, July 2017.",
      publicNote: "The City-hosted appendix preserves coalition recommendations, public-program listings, and WOWList event links submitted during CreateNYC planning.",
      supportsGenerally: [
        "NYC Artist Coalition submitted recommendations into the CreateNYC process",
        "the recommendations addressed safety, affordability, and community-driven spaces",
        "WOWList links were used to distribute related public meetings and deadlines"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the submitted letter",
        "City adoption of every recommendation",
        "the complete ownership or production history of the linked websites"
      ]
    },
    {
      id: "SRC-SBDIY-WOWLIST-CALENDAR",
      title: "SBDIY community site with WOWList calendar links",
      organization: "SBDIY",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.sbdiy.org/",
      preferredPublicUrl: "canonical",
      publicCitation: "SBDIY, community site linking to its WOWList calendar, accessed July 12, 2026.",
      publicNote: "The independent Santa Barbara DIY community site invites visitors to add events to its WOWList community calendar and links to its WOWList page.",
      supportsGenerally: [
        "an independent community used a dedicated WOWList calendar",
        "the community invited visitors to add events through WOWList",
        "WOWList functioned as distributed community event infrastructure"
      ],
      doesNotEstablish: [
        "current activity of the linked WOWList calendar",
        "the total number of WOWList communities",
        "Jamie's sole authorship of WOWList"
      ]
    },
    {
      id: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
      title: "Central City Economic Development Sales Tax Board packet",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-07-29",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, Central City Economic Development Sales Tax Board packet, July 29, 2019.",
      publicNote: "The public packet lists Jamie as KC Town Hall's developer/presenter and records the board's unanimous recommendation to the City Council for approval and $490,539 in funding for four retail spaces and three apartments.",
      supportsGenerally: [
        "Jamie was identified as KC Town Hall's developer/presenter",
        "the proposal described four retail spaces and three apartment units at 36th and Indiana",
        "the board unanimously recommended the project to the City Council for approval and $490,539 in funding"
      ],
      doesNotEstablish: [
        "final City Council approval, contract execution, or disbursement",
        "Phase One completion or completion of the full redevelopment",
        "current ownership or project status"
      ]
    },
    {
      id: "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
      title: "Central City Economic Development Sales Tax Board meeting packet",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2021-10-12",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/7198/637696345156870000",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, Central City Economic Development Sales Tax Board meeting packet, October 12, 2021.",
      publicNote: "The public meeting packet identifies Jamie with KC Town Hall among community participants in the municipal review process.",
      supportsGenerally: [
        "Jamie continued to appear publicly for KC Town Hall in 2021",
        "KC Town Hall remained part of a municipal review context",
        "the project involved public-facing stakeholder participation"
      ],
      doesNotEstablish: [
        "a final funding award",
        "the outcome of every board discussion",
        "Phase One completion, completion of the full redevelopment, or current project status"
      ]
    },
    {
      id: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016",
      title: "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
      organization: "KCUR",
      author: "Cody Newill",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-15",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
      preferredPublicUrl: "canonical",
      publicCitation: "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
      publicNote: "Independent public-radio reporting documents Jamie's 2006 film screening and scavenger-hunt program inside Kansas City's 8th Street Tunnel.",
      supportsGenerally: [
        "Jamie led participants through downtown Kansas City to an 8th Street Tunnel screening",
        "the program combined public history, navigation, and film",
        "Jamie publicly advocated for educational access to the historic tunnel"
      ],
      doesNotEstablish: [
        "formal permission for the 2006 program",
        "the complete participant roster",
        "current public access to the tunnel"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019",
      project: "nyc-artist-coalition",
      internalClaim: "Jamie represented NYC Artist Coalition in public City Council testimony on Cabaret Law repeal in 2017 and MARCH transparency in 2019.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Jamie represented NYC Artist Coalition in public City Council testimony: in 2017 he urged repeal of the Cabaret Law and a trust-based safety approach; in 2019 he called for transparent, cooperative alternatives to MARCH raids and described coalition fire-safety work.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
          relationship: "direct-support",
          supports: ["Jamie's public testimony", "NYC Artist Coalition affiliation", "Cabaret Law repeal and safety advocacy"],
          locator: "Transcript pages 199-202",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
          relationship: "direct-support",
          supports: ["Jamie's public testimony", "Talks Not Raids framing", "fire-safety work and transparency advocacy"],
          locator: "Transcript pages 90-93",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Attribute testimony and described work directly to Jamie while keeping policy outcomes collective.",
        "Treat the transcripts as records of public testimony, not independent verification of every witness statement."
      ],
      antiClaims: [
        "Jamie authored either law",
        "Jamie alone caused Cabaret Law repeal",
        "Jamie alone caused the replacement of MARCH"
      ],
      researchInquiryIds: ["INQ-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026", "INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-WOWLIST-SBDIY-CALENDAR-USE",
      project: "wowlist",
      internalClaim: "An independent Santa Barbara DIY community site used a dedicated WOWList calendar and invited visitors to add events through it.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "A surviving independent community site shows the distribution model in use: SBDIY invited visitors to add events directly to its dedicated WOWList calendar.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SBDIY-WOWLIST-CALENDAR",
          relationship: "direct-support",
          supports: ["dedicated community calendar", "public invitation to add events"],
          locator: "Upcoming Events links",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: ["Use as a concrete example of external use, not as a proxy for total adoption."],
      antiClaims: ["SBDIY proves the number of city ecosystems", "SBDIY is currently active on WOWList"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD",
      project: "kc-town-hall",
      internalClaim: "Kansas City records identify Jamie as KC Town Hall's developer/presenter; after the board recommendation, the Council accepted and appropriated $490,539 for the project and authorized funding-agreement negotiations. Jamie later transitioned the project to a mission-aligned organization; KC Town Hall withdrew from the original allocation and the unused funds were reappropriated.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Kansas City records identify Jamie as KC Town Hall's developer/presenter for an adaptive-reuse plan with four retail spaces and three apartments. After the board's unanimous recommendation, the Council adopted Resolution 190649 accepting $490,539 for the project and passed Ordinance 190642 appropriating that amount to its project account. The funding agreement did not reach use. As his direct involvement concluded, Jamie transitioned the project to a mission-aligned organization; KC Town Hall withdrew from the original allocation, and the Council reappropriated the unused funds in 2024.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
          relationship: "direct-support",
          supports: ["developer/presenter role", "adaptive-reuse program", "unanimous board funding recommendation"],
          locator: "Proposal 16 on packet page 5 and board action on packet page 12",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
          relationship: "direct-support",
          supports: ["Council adoption", "$490,539 funding acceptance", "authorization to negotiate a funding agreement"],
          locator: "Resolution title and legislative history",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCMO-CCED-ORDINANCE-190642-2019",
          relationship: "direct-support",
          supports: ["Council passage of the Round Two appropriation ordinance", "appropriation into designated project accounts"],
          locator: "Ordinance title and legislative history",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
          relationship: "corroborating",
          supports: ["continued public participation for KC Town Hall"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
          relationship: "direct-support",
          supports: ["Jamie transitioned the project to a mission-aligned organization", "intentional project continuity"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCMO-CCED-CLAWBACK-240317-2024",
          relationship: "direct-support",
          supports: ["$490,539 KC Town Hall appropriation", "project withdrawal", "reappropriation of the unused allocation"],
          locator: "Recitals and Sections 1-2",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the documented actions as Council authorization and appropriation, not receipt or disbursement.",
        "The funding agreement was not completed for use; do not infer expenditure, completed construction, or current project status.",
        "Include the mission-aligned transition, later withdrawal, and reappropriation when summarizing the project lifecycle.",
        "The reason for the transition is not part of the public record and must not be published."
      ],
      antiClaims: ["KC Town Hall received or spent $490,539", "the Council appropriation proves a completed funding agreement", "the documented redevelopment was completed"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    }
  ],
  researchInquiries: [],
  pages: [
    {
      id: "wowlist",
      surface: "/work/wowlist",
      sourceOrder: [
        "SRC-SBDIY-WOWLIST-CALENDAR",
        "SRC-WOWLIST-ORIGIN-SUNDAY-DINNER-2014",
        "SRC-WOWLIST-SUPPORT-FEED-SCOPE-2015",
        "SRC-WOWLIST-SUPPORT-PROFILE-2015",
        "SRC-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
        "SRC-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
        "SRC-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
        "SRC-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016",
        "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
        "SRC-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
        "SRC-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018"
      ],
      occurrences: [
        {
          id: "sbdiy-calendar-use",
          claimId: "CLM-WOWLIST-SBDIY-CALENDAR-USE",
          projection: "case-study",
          sourceIds: ["SRC-SBDIY-WOWLIST-CALENDAR"]
        },
        {
          id: "wowlist-public-support-surface",
          claimId: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
          projection: "case-study",
          sourceIds: [
            "SRC-WOWLIST-ORIGIN-SUNDAY-DINNER-2014",
            "SRC-WOWLIST-SUPPORT-FEED-SCOPE-2015",
            "SRC-WOWLIST-SUPPORT-PROFILE-2015",
            "SRC-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
            "SRC-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
            "SRC-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
            "SRC-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016"
          ]
        },
        {
          id: "wowlist-facebook-distributed-use",
          claimId: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
          projection: "case-study",
          sourceIds: [
            "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
            "SRC-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
            "SRC-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018"
          ]
        }
      ]
    },
    {
      id: "kc-town-hall",
      surface: "/work/kc-town-hall",
      sourceOrder: [
        "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026",
        "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
        "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
        "SRC-KCMO-CCED-ORDINANCE-190642-2019",
        "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
        "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
        "SRC-KCMO-CCED-CLAWBACK-240317-2024",
        "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
        "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
        "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
        "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
        "SRC-KCTH-SOCIAL-TIRES-2021-RECAP",
        "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
        "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020"
      ],
      occurrences: [
        {
          id: "phase-one-construction-delivery",
          claimId: "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
          projection: "case-study",
          sourceIds: ["SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026"]
        },
        {
          id: "neighborhood-survey-system",
          claimId: "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
          projection: "case-study",
          sourceIds: ["SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026"]
        },
        {
          id: "participatory-construction-practice",
          claimId: "CLM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
          projection: "case-study",
          sourceIds: ["SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026"]
        },
        {
          id: "municipal-record",
          claimId: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD",
          projection: "case-study",
          sourceIds: [
            "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
            "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
            "SRC-KCMO-CCED-ORDINANCE-190642-2019",
            "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
            "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
            "SRC-KCMO-CCED-CLAWBACK-240317-2024"
          ]
        },
        {
          id: "resident-service-workflow",
          claimId: "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW",
          projection: "case-study",
          sourceIds: [
            "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
            "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
            "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
            "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
            "SRC-KCTH-SOCIAL-TIRES-2021-RECAP"
          ]
        },
        {
          id: "tired-of-tires-operations",
          claimId: "CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
          projection: "case-study",
          sourceIds: [
            "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
            "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
            "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020"
          ]
        }
      ]
    }
  ]
};
