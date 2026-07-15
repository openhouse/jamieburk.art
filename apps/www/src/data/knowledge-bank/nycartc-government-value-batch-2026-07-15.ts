import type {
  ClaimRecord,
  IntakeRecord,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nycArtCGovernmentValueSourceIds = [
  "SRC-DCLA-CREATENYC-NEXT-STEPS-TESTIMONY-2017",
  "SRC-DCLA-COMMISSIONER-NYCARTC-MESSAGE-2017",
  "SRC-NYCARTC-DCLA-RECOMMENDATIONS-2017",
  "SRC-NYCARTC-ESPINAL-REPEAL-LETTER-2017",
  "SRC-NYC-COUNCIL-CABARET-OVERSIGHT-2017",
  "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-LAW-2017",
  "SRC-MOME-OFFICE-NIGHTLIFE-SIGNING-2017",
  "SRC-NYC-COUNCIL-CABARET-REPEAL-LAW-2017"
] as const;

export const nycArtCGovernmentValueClaimIds = [
  "CLM-NYCARTC-DCLA-PUBLIC-ENGAGEMENT-VALUE-2017",
  "CLM-NYCARTC-GOVERNMENT-TRANSLATION-VALUE-2017",
  "CLM-NYCARTC-ESPINAL-POLICY-SEQUENCE-2017"
] as const;

export const nycArtCGovernmentValueIntake = [
  {
    id: "LEAD-NYCARTC-GOVERNMENT-INSTITUTIONAL-VALUE-2026",
    receivedAt: "2026-07-15",
    suppliedBy: "Jamie Burkart with Codex public-record review",
    kind: "claim",
    title: "Why NYC government benefited from NYC Artist Coalition",
    summary:
      "A close reading of DCLA testimony, DCLA's later commissioner message, coalition recommendations, Council testimony, legislation, and Espinal's public credit separates direct facts from an institutional interpretation of the coalition as a translation layer between informal cultural spaces and government.",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "inquiry-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [...nycArtCGovernmentValueSourceIds, "SRC-X-NYCARTC-ESPINAL-CABARET-2017"],
    claimIds: [...nycArtCGovernmentValueClaimIds],
    inquiryIds: ["INQ-NYCARTC-GOVERNMENT-RECEPTION-CAUSALITY-2017"],
    notes: [
      "Finkelpearl's February 27 testimony describes DIY-community recommendations and continued independent organizing but does not name NYC Artist Coalition.",
      "A later DCLA commissioner message explicitly identifies New York City Artist Coalition as a coalition that CreateNYC Office Hours helped launch.",
      "The institutional-value interpretation is an inference from the public record, not a claim about any official's private motives or personal dependence.",
      "The Office of Nightlife's liaison and navigation functions align with coalition recommendations; alignment does not establish that the coalition authored the law or caused its enactment."
    ]
  }
] satisfies IntakeRecord[];

export const nycArtCGovernmentValueSources = [
  {
    id: "SRC-DCLA-CREATENYC-NEXT-STEPS-TESTIMONY-2017",
    title: "CreateNYC cultural plan: next steps testimony",
    organization: "New York City Department of Cultural Affairs",
    author: "Tom Finkelpearl",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-27",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect6_Commissioner-Tom-Finkelpearl_Testimony.pdf",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Tom Finkelpearl, testimony on CreateNYC next steps before the New York City Council Committee on Cultural Affairs, February 27, 2017.",
    publicNote:
      "Finkelpearl presented a DIY Office Hours meeting, formal recommendations, and continued independent organizing as an example of CreateNYC's useful public-engagement process and DCLA's continuing learning.",
    supportsGenerally: [
      "DCLA's DIY Office Hours after the Ghost Ship fire",
      "formal recommendations from members of the DIY community",
      "continued independent organization after the meeting",
      "DCLA's stated intent to keep listening and learning",
      "reported needs for safety-upgrade support and help navigating government"
    ],
    doesNotEstablish: [
      "the name NYC Artist Coalition in the February 27 testimony",
      "Jamie's individual role in the meeting or recommendations",
      "Finkelpearl's private motives or personal dependence",
      "DCLA adoption of every recommendation",
      "coalition causality for legislation or agency action"
    ]
  },
  {
    id: "SRC-DCLA-COMMISSIONER-NYCARTC-MESSAGE-2017",
    title: "Message from the Commissioner",
    organization: "New York City Department of Cultural Affairs",
    author: "Tom Finkelpearl",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.nyc.gov/site/dcla/about/message-from-the-commissioner.page",
    preferredPublicUrl: "canonical",
    publicCitation: "Tom Finkelpearl, 'Message from the Commissioner,' New York City Department of Cultural Affairs.",
    publicNote:
      "DCLA's commissioner message says CreateNYC Office Hours produced eye-opening interactions and helped launch New York City Artist Coalition, dedicated to advocating for DIY spaces.",
    supportsGenerally: [
      "DCLA's explicit identification of New York City Artist Coalition",
      "CreateNYC Office Hours as a contributing formation context",
      "DCLA's stated value for direct public dialogue",
      "DCLA's recognition of informal and grassroots cultural groups"
    ],
    doesNotEstablish: [
      "the complete coalition formation history",
      "Jamie's individual founding role",
      "DCLA creation, ownership, funding, or endorsement of the coalition",
      "adoption of every coalition proposal",
      "a publication date visible on the current page"
    ]
  },
  {
    id: "SRC-NYCARTC-DCLA-RECOMMENDATIONS-2017",
    title: "NYC Artist Coalition recommendations for the CreateNYC cultural plan",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-07",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://nycartc.com/nycdcla/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, recommendations to DCLA Commissioner Tom Finkelpearl for the CreateNYC cultural plan, March 7, 2017.",
    publicNote:
      "The collective letter translates concerns about criminalization, administrative support, safety, and affordability into specific proposals for DCLA and CreateNYC.",
    supportsGenerally: [
      "collective development of formal recommendations after a January DCLA meeting",
      "Cabaret Law repeal and MARCH transparency requests",
      "a proposed cultural-liaison and case-management function",
      "a proposed urgent-repairs fund",
      "affordability and access proposals for community-driven spaces"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the recommendations",
      "DCLA adoption or implementation of every proposal",
      "coalition authorship of later legislation",
      "the complete participant or collaborator roster"
    ]
  },
  {
    id: "SRC-NYCARTC-ESPINAL-REPEAL-LETTER-2017",
    title: "Repeal the Cabaret Law: letter to Council Member Espinal",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-04-18",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://nycartc.com/letter-espinal/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, letter to Council Member Rafael Espinal supporting Cabaret Law repeal, April 18, 2017.",
    publicNote:
      "The letter links a March 30 town hall, a planned staff meeting, cultural-space safety, Council-district license scarcity, zoning constraints, and public open-data maps to the repeal request.",
    supportsGenerally: [
      "Espinal's attendance at the coalition's March 30 town hall",
      "a planned meeting with Espinal and his staff",
      "the coalition's safety and non-criminalization framing",
      "coalition publication of license and zoning maps",
      "a structured public request for repeal"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the letter, maps, or analysis",
      "independent verification of every count in the coalition letter",
      "Espinal's adoption of every coalition argument",
      "coalition authorship of the repeal bill",
      "coalition causality for the Council vote"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-CABARET-OVERSIGHT-2017",
    title: "Committee on Consumer Affairs hearing on Cabaret Law enforcement and the Office of Nightlife",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-19",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=41F1062B-FC32-4A12-846E-65CEB3BB052C&ID=5316935&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council Committee on Consumer Affairs, hearing transcript on Cabaret Law enforcement and Intro 1648, June 19, 2017.",
    publicNote:
      "The official transcript records Espinal chairing a hearing that received NYC Artist Coalition testimony, including Jamie's request for repeal and account of fire-safety workshops and study groups. The transcript misspells Jamie's surname as Burkhart.",
    supportsGenerally: [
      "Espinal's chairing of the June 19 oversight hearing",
      "NYC Artist Coalition participation in the hearing",
      "Jamie's public testimony as a coalition member",
      "Jamie's public description of safety workshops and fire-guard study groups",
      "Council consideration of the Cabaret Law and an Office of Nightlife in one hearing"
    ],
    doesNotEstablish: [
      "independent verification of every claim made by witnesses",
      "Jamie's sole authorship or representation of all coalition testimony",
      "coalition authorship of Intro 1648 or later legislation",
      "the testimony's effect on individual Council votes",
      "sole coalition causality for repeal or the Office of Nightlife"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-LAW-2017",
    title: "Local Law 178 of 2017: Office of Nightlife and Nightlife Advisory Board",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-19",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=E6CEAE78-6D18-4C8F-8124-D9445FEF838F&ID=3131400&Options=ID%257CText%257C",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Int. 1688-2017, enacted as Local Law 178 of 2017, establishing an Office of Nightlife and Nightlife Advisory Board.",
    publicNote:
      "The enacted Espinal-sponsored law created outreach, liaison, navigation, advisory, complaint-review, recommendation, and public-input functions for nightlife governance.",
    supportsGenerally: [
      "Espinal's sponsorship of the enacted Office of Nightlife law",
      "a city liaison among nightlife establishments, residents, and government",
      "assistance navigating licensing, permits, approvals, and enforcement",
      "advisory review and policy recommendations",
      "an institutional path for continuing public input"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition authorship of the law",
      "adoption of every coalition recommendation",
      "coalition causality for enactment",
      "Jamie's individual role in legislative drafting",
      "the office's later implementation quality or outcomes"
    ]
  },
  {
    id: "SRC-MOME-OFFICE-NIGHTLIFE-SIGNING-2017",
    title: "Mayor de Blasio signs bill establishing Nightlife Mayor",
    organization: "New York City Mayor's Office of Media and Entertainment",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-19",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.nyc.gov/site/mome/news/091917-nightlife-office.page",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Mayor's Office of Media and Entertainment, 'Mayor de Blasio Signs Bill Establishing Nightlife Mayor,' September 19, 2017.",
    publicNote:
      "The signing announcement describes the office as a bridge among residents, venues, and agencies; Espinal names red tape, rent, planning, conflict resolution, and cultural-space loss, while Finkelpearl links the action to CreateNYC engagement with artists and small-venue operators.",
    supportsGenerally: [
      "the Office of Nightlife's bridge and liaison rationale",
      "Espinal's stated concerns about red tape, rent, planning, and cultural-space loss",
      "Finkelpearl's stated connection between CreateNYC engagement and small music venues",
      "the administration's safety and cultural-vitality framing"
    ],
    doesNotEstablish: [
      "a direct attribution of the Office of Nightlife law to NYC Artist Coalition",
      "coalition authorship of the office model",
      "Jamie's individual role in drafting or enactment",
      "implementation outcomes after the signing"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-CABARET-REPEAL-LAW-2017",
    title: "Local Law 214 of 2017: Cabaret Law repeal",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-11-27",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE&ID=3086319",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Int. 1652-2017, enacted as Local Law 214 of 2017, repealing the Cabaret Law licensing scheme.",
    publicNote:
      "The enacted Espinal-sponsored law repealed the public-dance-hall and cabaret licensing scheme while retaining specified security-camera and security-guard requirements.",
    supportsGenerally: [
      "Espinal's sponsorship of Cabaret Law repeal",
      "Council enactment of the repeal",
      "separation of the dance-license repeal from retained security requirements"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition authorship of the law",
      "the influence of any one witness on the vote",
      "Jamie's sole causality for repeal",
      "implementation or enforcement outcomes after enactment"
    ]
  }
] satisfies SourceRecord[];

export const nycArtCGovernmentValueClaims = [
  {
    id: "CLM-NYCARTC-DCLA-PUBLIC-ENGAGEMENT-VALUE-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "In February 2017 Council testimony, Finkelpearl used a DIY Office Hours meeting, community-authored recommendations, and continued independent organizing as evidence that CreateNYC's engagement process was already useful; DCLA's later commissioner message explicitly identified New York City Artist Coalition as a coalition that Office Hours helped launch.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "DCLA's public record presents the DIY community's formal recommendations and continued organizing as evidence that CreateNYC engagement produced usable learning and civic capacity; a later commissioner message identifies New York City Artist Coalition by name.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-DCLA-CREATENYC-NEXT-STEPS-TESTIMONY-2017",
        relationship: "direct-support",
        supports: [
          "DIY Office Hours as an example of a useful engagement process",
          "community-authored formal recommendations",
          "continued independent organizing",
          "DCLA's intent to continue learning and listening"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-DCLA-COMMISSIONER-NYCARTC-MESSAGE-2017",
        relationship: "direct-support",
        supports: [
          "DCLA's explicit identification of New York City Artist Coalition",
          "Office Hours as a contributing formation context"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-DCLA-RECOMMENDATIONS-2017",
        relationship: "corroborating",
        supports: ["the coalition's public formal recommendations", "specific administrative and policy proposals"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The February 27 testimony describes the DIY community's work but does not name NYC Artist Coalition; the later DCLA message supplies the explicit name.",
      "Finkelpearl's use of the example shows relevance to DCLA's public-engagement account, not personal dependence or endorsement of every proposal.",
      "The sources do not establish Jamie's individual authorship of the recommendations or the complete coalition formation history."
    ],
    antiClaims: [
      "Finkelpearl's February 27 testimony named NYC Artist Coalition",
      "Finkelpearl said he needed Jamie or the coalition",
      "DCLA created, owned, or endorsed every action of NYC Artist Coalition",
      "Jamie solely authored the recommendations"
    ],
    researchInquiryIds: ["INQ-NYCARTC-GOVERNMENT-RECEPTION-CAUSALITY-2017"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-record review"]
  },
  {
    id: "CLM-NYCARTC-GOVERNMENT-TRANSLATION-VALUE-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "The public record supports an institutional interpretation that NYC Artist Coalition functioned as a translation layer: it organized lived experience from informal cultural spaces into recommendations, public forums, maps, testimony, and implementation alternatives that DCLA and the Council could hear, examine, and act around.",
    status: "inference",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Institutional interpretation: NYC Artist Coalition made underrepresented cultural-space experience more usable to government by converting it into organized participation, formal recommendations, public data, testimony, and implementation choices.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-DCLA-CREATENYC-NEXT-STEPS-TESTIMONY-2017",
        relationship: "context",
        supports: ["agency listening need", "formal feedback and continued organization"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-DCLA-RECOMMENDATIONS-2017",
        relationship: "direct-support",
        supports: ["formal recommendations", "administrative and implementation alternatives"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCARTC-ESPINAL-REPEAL-LETTER-2017",
        relationship: "direct-support",
        supports: ["public forum", "Council-district maps", "structured repeal request"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-OVERSIGHT-2017",
        relationship: "direct-support",
        supports: [
          "NYC Artist Coalition witnesses appearing before Council",
          "lived safety and enforcement evidence before Council"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-LAW-2017",
        relationship: "context",
        supports: ["liaison and navigation functions", "continuing public-input functions"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "This is an evidence-backed institutional interpretation, not a quotation, a contemporaneous motive statement, or proof that an official personally depended on the coalition.",
      "Functional alignment between coalition recommendations and later government design does not establish authorship, adoption of every proposal, or legislative causality.",
      "Coalition action, Jamie's individual contribution, sponsor leadership, Council action, and administration implementation remain distinct."
    ],
    antiClaims: [
      "Finkelpearl, the Council, or Espinal could not act without Jamie",
      "NYC Artist Coalition authored the Office of Nightlife",
      "NYC Artist Coalition caused Cabaret Law repeal",
      "Jamie speaks for every informal cultural space"
    ],
    researchInquiryIds: ["INQ-NYCARTC-GOVERNMENT-RECEPTION-CAUSALITY-2017"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-record review"]
  },
  {
    id: "CLM-NYCARTC-ESPINAL-POLICY-SEQUENCE-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "The public record places NYC Artist Coalition in a documented sequence with Espinal: he attended its March 30 town hall; the coalition sent him an April 18 repeal letter and maps; he chaired the June 19 hearing that received coalition and Jamie testimony; he sponsored the enacted Office of Nightlife and Cabaret Law repeal laws; and his public account later credited the coalition and Dance Liberation Network in the repeal effort.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Public records place NYC Artist Coalition in a sustained 2017 policy sequence with Council Member Rafael Espinal: town hall, letter and maps, Council testimony, enacted legislation under his sponsorship, and his later public credit to the coalition and Dance Liberation Network in the repeal effort.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-ESPINAL-REPEAL-LETTER-2017",
        relationship: "direct-support",
        supports: ["March 30 town-hall attendance", "April 18 letter and public maps", "planned staff engagement"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-OVERSIGHT-2017",
        relationship: "direct-support",
        supports: ["Espinal's hearing-chair role", "coalition and Jamie testimony"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-LAW-2017",
        relationship: "direct-support",
        supports: ["Espinal sponsorship", "enactment of the Office of Nightlife law"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-REPEAL-LAW-2017",
        relationship: "direct-support",
        supports: ["Espinal sponsorship", "enactment of Cabaret Law repeal"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-X-NYCARTC-ESPINAL-CABARET-2017",
        relationship: "direct-support",
        supports: ["Espinal's public credit to NYC Artist Coalition and Dance Liberation Network"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "A documented sequence and Espinal's public credit establish participation, not sole or decisive causality for either law.",
      "The sources do not establish that NYC Artist Coalition drafted the bills or supplied the votes.",
      "The sequence contains collective coalition activity and does not assign every artifact or action to Jamie individually."
    ],
    antiClaims: [
      "Espinal needed Jamie personally to pass the laws",
      "NYC Artist Coalition wrote Int. 1652 or Int. 1688",
      "Coalition testimony determined the Council vote",
      "Jamie alone repealed the Cabaret Law or created the Office of Nightlife"
    ],
    researchInquiryIds: ["INQ-NYCARTC-GOVERNMENT-RECEPTION-CAUSALITY-2017"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-record review"]
  }
] satisfies ClaimRecord[];

export const nycArtCGovernmentValueInquiries = [
  {
    id: "INQ-NYCARTC-GOVERNMENT-RECEPTION-CAUSALITY-2017",
    project: "nyc-artist-coalition",
    question:
      "What additional public or permissioned records establish how DCLA staff, Finkelpearl, Espinal's office, and other Council members used specific coalition recommendations, testimony, maps, or convenings in planning, bill drafting, sponsorship, voting, and implementation?",
    methods: [
      "Compare the coalition recommendations with CreateNYC's final plan and implementation reports at proposition level, recording convergence separately from attributed adoption.",
      "Review committee reports, bill drafts, sponsor statements, hearing testimony, staff records cleared for use, and public correspondence for explicit coalition attribution.",
      "Invite Finkelpearl, Espinal, coalition collaborators, and relevant staff to confirm the practical value and limits of the coalition's contribution in their own words.",
      "Keep Jamie's individual work, collective coalition action, sponsor leadership, Council action, and administration implementation as separate graph nodes."
    ],
    resultStatus: "open",
    findings: [
      "The current public record establishes DCLA recognition, coalition recommendations, government testimony, functional alignment, sustained interaction with Espinal, enacted laws under his sponsorship, and his public coalition credit."
    ],
    limitations: [
      "The current sources do not expose internal agency or Council deliberation, bill-drafting provenance, individual vote influence, adoption of each recommendation, or a complete individual division of labor."
    ],
    sourceIds: [...nycArtCGovernmentValueSourceIds, "SRC-X-NYCARTC-ESPINAL-CABARET-2017"]
  }
] satisfies ResearchInquiry[];

export const nycArtCGovernmentValuePublicationDecisions = [
  {
    id: "PUB-NYCARTC-DCLA-PUBLIC-ENGAGEMENT-VALUE-2017",
    claimId: "CLM-NYCARTC-DCLA-PUBLIC-ENGAGEMENT-VALUE-2017",
    decision: "reserve",
    audiences: ["public-interest technology employers", "government partners", "future portfolio editors"],
    surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"],
    rationale:
      "The DCLA record is a strong proof of institutional relevance, but its current value is explanatory depth rather than additional front-page copy.",
    decidedAt: "2026-07-15"
  },
  {
    id: "PUB-NYCARTC-GOVERNMENT-TRANSLATION-VALUE-2017",
    claimId: "CLM-NYCARTC-GOVERNMENT-TRANSLATION-VALUE-2017",
    decision: "reserve",
    audiences: ["public-interest technology employers", "government partners", "future portfolio editors"],
    surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"],
    rationale:
      "The institutional interpretation clarifies why the work mattered while remaining explicitly separate from officials' motives and legislative causality.",
    decidedAt: "2026-07-15"
  },
  {
    id: "PUB-NYCARTC-ESPINAL-POLICY-SEQUENCE-2017",
    claimId: "CLM-NYCARTC-ESPINAL-POLICY-SEQUENCE-2017",
    decision: "reserve",
    audiences: ["public-interest technology employers", "government partners", "future portfolio editors"],
    surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"],
    rationale:
      "The sequence is source-backed and useful for future compositions, but the current site already carries a concise collective Cabaret Law contribution claim.",
    decidedAt: "2026-07-15"
  }
] satisfies PublicationDecision[];
