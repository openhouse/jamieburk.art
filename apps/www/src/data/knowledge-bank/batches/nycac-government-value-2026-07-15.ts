import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = ["Jamie Burkart", "Codex public-record review"];

export const nycacGovernmentValueBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-NYCAC-GOVERNMENT-VALUE-2026",
      kind: "research-question",
      capturedAt: reviewedAt,
      capturedFrom:
        "Jamie Burkart portfolio working session and official New York City records",
      publicSafeSummary:
        "Recover how DCLA, the New York City Council, and Council Member Rafael Espinal publicly described or used NYC Artist Coalition participation, testimony, and recommendations.",
      projects: ["nyc-artist-coalition"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017",
        "SRC-DCLA-COMMISSIONER-NYCAC-CREATENYC-2017",
        "SRC-CREATENYC-FINAL-PLAN-NYCAC-2017",
        "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
        "SRC-NYCAC-COUNCIL-JAMIE-ESPINAL-TESTIMONY-2017",
        "SRC-NYCAC-COUNCIL-ESPINAL-COLLABORATION-2019"
      ],
      claimIds: [],
      researchTaskIds: ["TASK-NYCAC-FINKELPEARL-TRANSCRIPT-CENSUS"],
      notes: [
        "One explicit Finkelpearl reference to NYC Artist Coalition was recovered in the searched Council transcript surfaces; this is not a claim that no other reference exists.",
        "Institutional-value statements are source-backed analysis, not testimony that DCLA, Council, or Espinal was literally dependent on Jamie or the coalition.",
        "No new ClaimRecord or website projection was selected pending collective-credit review."
      ],
      reviewedAt,
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017",
      title:
        "Fiscal 2018 Executive Budget hearing transcript: Department of Cultural Affairs",
      organization: "New York City Council",
      author: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-05-19",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council, Committee on Finance joint Fiscal 2018 Executive Budget hearing transcript, Department of Cultural Affairs testimony, May 19, 2017.",
      publicNote:
        "Commissioner Tom Finkelpearl placed NYC Artist Coalition in a sequence about direct public feedback, common-cause organizing, and examples of collaboration emerging from CreateNYC engagement.",
      supportsGenerally: [
        "Finkelpearl explicitly referred to NYC Artist Coalition in Council testimony",
        "he said the coalition formed after DCLA hosted a January 2017 DIY arts-community meeting",
        "he used the example while describing reciprocal public relationships and expanded direct feedback"
      ],
      doesNotEstablish: [
        "that DCLA solely created, owned, directed, or spoke for NYC Artist Coalition",
        "Jamie's individual role in the coalition's formation",
        "that this is the only Council hearing in which Finkelpearl mentioned the coalition"
      ]
    },
    {
      id: "SRC-DCLA-COMMISSIONER-NYCAC-CREATENYC-2017",
      title: "Message from the Commissioner",
      organization: "New York City Department of Cultural Affairs",
      author: "Tom Finkelpearl",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.nyc.gov/site/dcla/about/message-from-the-commissioner.page",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Tom Finkelpearl, Message from the Commissioner, New York City Department of Cultural Affairs, accessed July 15, 2026.",
      publicNote:
        "Finkelpearl's DCLA account says CreateNYC office hours helped launch NYC Artist Coalition and presents direct resident dialogue as a way to keep the cultural plan responsive to New Yorkers.",
      supportsGenerally: [
        "DCLA publicly treated NYC Artist Coalition as an outcome of its public-engagement process",
        "DCLA associated continuing direct dialogue with responsive cultural planning"
      ],
      doesNotEstablish: [
        "that DCLA owned or controlled NYC Artist Coalition",
        "that DCLA was the coalition's sole cause",
        "Jamie's individual contribution"
      ]
    },
    {
      id: "SRC-CREATENYC-FINAL-PLAN-NYCAC-2017",
      title: "CreateNYC: A Cultural Plan for All New Yorkers",
      organization: "City of New York",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-07-19",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://www.nyc.gov/assets/dcla/downloads/pdf/cultureplan/createnyc-finalplan.pdf",
      preferredPublicUrl: "canonical",
      publicCitation:
        "City of New York, CreateNYC: A Cultural Plan for All New Yorkers, 2017.",
      publicNote:
        "The final cultural plan repeats the office-hours account and includes a coalition representative's statement about preserving community-driven cultural spaces.",
      supportsGenerally: [
        "NYC Artist Coalition entered the City's durable cultural-planning record",
        "the coalition's community-space concerns were represented in the final plan"
      ],
      doesNotEstablish: [
        "that every coalition recommendation was adopted",
        "that NYC Artist Coalition represented every DIY or community-driven space",
        "Jamie's individual authorship of the cited position"
      ]
    },
    {
      id: "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
      title: "NYC Artist Coalition DIY Community recommendations to CreateNYC",
      organization: "NYC Artist Coalition and City of New York",
      author: "NYC Artist Coalition",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-17",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition, DIY Community recommendations to CreateNYC, letter to Commissioner Tom Finkelpearl, March 17, 2017.",
      publicNote:
        "The coalition letter says participants continued working after the January meeting to develop recommendations for CreateNYC and possible DCLA partnership with informal community-driven spaces.",
      supportsGenerally: [
        "the coalition converted an initial listening event into collective recommendations",
        "the recommendations addressed how DCLA could partner with and resource informal cultural spaces"
      ],
      doesNotEstablish: [
        "individual authorship of every recommendation",
        "adoption or implementation of every recommendation",
        "a complete account of the coalition's formation"
      ]
    },
    {
      id: "SRC-NYCAC-COUNCIL-JAMIE-ESPINAL-TESTIMONY-2017",
      title: "Committee on Consumer Affairs hearing transcript: Intro 1652-A",
      organization: "New York City Council",
      author: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-14",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=817A7573-F329-49C4-849A-347B6D00CBC5&ID=5444683&M=F",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council, Committee on Consumer Affairs hearing transcript on Intro 1652-A, September 14, 2017.",
      publicNote:
        "The transcript misspells Jamie's surname as Burkhart. Jamie testified as an NYC Artist Coalition member about Cabaret Law repeal, cultural expression, field safety work, venue trust, and compliance; Chair Rafael Espinal thanked him for his personal story and advocacy.",
      supportsGenerally: [
        "Jamie supplied lived and operational field testimony in support of Cabaret Law repeal",
        "Jamie connected fire-safety practice, compliance, and trust with cultural-space conditions",
        "Espinal directly expressed appreciation for Jamie's advocacy"
      ],
      doesNotEstablish: [
        "that Jamie authored Intro 1652-A",
        "that Jamie or NYC Artist Coalition alone caused repeal",
        "independent verification of every quantitative statement made in oral testimony"
      ]
    },
    {
      id: "SRC-NYCAC-COUNCIL-ESPINAL-COLLABORATION-2019",
      title: "Committee on Small Business hearing transcript",
      organization: "New York City Council",
      author: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-03-18",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=A217E78A-034D-4EE7-ACF4-F4A8DC1F9B16&ID=7230194&M=F",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council, Committee on Small Business hearing transcript, March 18, 2019.",
      publicNote:
        "Espinal acknowledged NYC Artist Coalition as a group that had worked closely over multiple years on nightlife. Jamie later testified with specific open-data recommendations intended to help small cultural spaces navigate legality, safety, and compliance.",
      supportsGenerally: [
        "Espinal publicly recognized a sustained working relationship with NYC Artist Coalition",
        "Jamie translated recurring field conditions into specific Council-facing data and implementation recommendations",
        "the coalition participated across nightlife, cultural-space, and small-business policy contexts"
      ],
      doesNotEstablish: [
        "that Espinal adopted every recommendation",
        "that Jamie authored the legislation under discussion",
        "that NYC Artist Coalition was indispensable to Council action"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-NYCAC-FINKELPEARL-COUNCIL-MENTION-2017",
      sourceId: "SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017",
      project: "nyc-artist-coalition",
      assertion:
        "In May 2017 Council testimony, Finkelpearl explicitly named NYC Artist Coalition as a group that formed after DCLA's January DIY arts-community meeting while explaining the value of direct feedback and common-cause organizing.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-CREATION-ROLE",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-DCLA-ENGAGEMENT-OUTCOME-2017",
      sourceId: "SRC-DCLA-COMMISSIONER-NYCAC-CREATENYC-2017",
      project: "nyc-artist-coalition",
      assertion:
        "DCLA's commissioner page describes NYC Artist Coalition as an outcome that CreateNYC office hours helped launch and links continued resident dialogue to responsive cultural planning.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-CREATION-ROLE",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-CREATENYC-DURABLE-PUBLIC-RECORD-2017",
      sourceId: "SRC-CREATENYC-FINAL-PLAN-NYCAC-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The final CreateNYC plan carried NYC Artist Coalition's formation and community-driven-space concerns into a durable City cultural-planning record.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-CREATION-ROLE",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-RECOMMENDATION-TRANSLATION-2017",
      sourceId: "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The coalition turned the January meeting into a continuing collective process and a March 2017 recommendation set about DCLA partnership with informal community-driven cultural spaces.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-CIVIC-SYSTEMS",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-DCLA-INSTITUTIONAL-VALUE-2026",
      sourceId: "SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017",
      project: "nyc-artist-coalition",
      assertion:
        "Source-backed analysis: NYC Artist Coalition gave DCLA a durable, self-organized counterpart for direct feedback from informal cultural spaces and gave Finkelpearl a concrete example that public listening could produce continuing civic capacity.",
      relationship: "contextualizes",
      confidence: "moderate",
      candidateClaimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-COUNCIL-JAMIE-FIELD-TESTIMONY-2017",
      sourceId: "SRC-NYCAC-COUNCIL-JAMIE-ESPINAL-TESTIMONY-2017",
      project: "nyc-artist-coalition",
      assertion:
        "Jamie gave Council a combined account of lived loss, discriminatory cultural regulation, fire-safety practice, compliance barriers, and the trust conditions affecting small cultural spaces.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-REPEAL-MOBILIZATION",
        "CLM-NAC-FIRE-CODE-STUDY-GROUPS"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-ESPINAL-APPRECIATION-2017",
      sourceId: "SRC-NYCAC-COUNCIL-JAMIE-ESPINAL-TESTIMONY-2017",
      project: "nyc-artist-coalition",
      assertion:
        "Espinal directly thanked Jamie for sharing his personal story and expressed appreciation for his advocacy for friends and the city.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-REPEAL-MOBILIZATION"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-ESPINAL-SUSTAINED-WORKING-RELATIONSHIP-2019",
      sourceId: "SRC-NYCAC-COUNCIL-ESPINAL-COLLABORATION-2019",
      project: "nyc-artist-coalition",
      assertion:
        "In March 2019, Espinal publicly acknowledged NYC Artist Coalition as a group that had worked closely over multiple years on improving New York City nightlife.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-CIVIC-SYSTEMS",
        "CLM-NAC-OFFICE-NIGHTLIFE-ROLE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-JAMIE-SMALL-BUSINESS-DATA-RECOMMENDATIONS-2019",
      sourceId: "SRC-NYCAC-COUNCIL-ESPINAL-COLLABORATION-2019",
      project: "nyc-artist-coalition",
      assertion:
        "Jamie translated recurring operator and agency experience into specific recommendations for public datasets and online tools that could help small businesses navigate legality, safety, and compliance.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-CIVIC-SYSTEMS"],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-COUNCIL-INSTITUTIONAL-VALUE-2026",
      sourceId: "SRC-NYCAC-COUNCIL-ESPINAL-COLLABORATION-2019",
      project: "nyc-artist-coalition",
      assertion:
        "Source-backed analysis: the coalition made an informal cultural constituency more legible and reachable to Council by bringing field conditions, repeat participation, testimony, and implementable recommendations into public proceedings.",
      relationship: "contextualizes",
      confidence: "moderate",
      candidateClaimIds: [
        "CLM-NAC-CIVIC-SYSTEMS",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-ESPINAL-INSTITUTIONAL-VALUE-2026",
      sourceId: "SRC-NYCAC-COUNCIL-JAMIE-ESPINAL-TESTIMONY-2017",
      project: "nyc-artist-coalition",
      assertion:
        "Source-backed analysis: Espinal benefited from a prepared constituency able to connect lived experience and operational detail to legislative and oversight questions while mobilizing public participation around nightlife policy.",
      relationship: "contextualizes",
      confidence: "moderate",
      candidateClaimIds: [
        "CLM-NAC-REPEAL-MOBILIZATION",
        "CLM-NAC-OFFICE-NIGHTLIFE-ROLE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    },
    {
      id: "AST-NYCAC-GOVERNMENT-NEED-BOUNDARY-2026",
      sourceId: "SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The records establish recognition, exchange, testimony, recommendations, and sustained collaboration; they do not establish that DCLA, Council, or Espinal was literally dependent on Jamie or NYC Artist Coalition, or that the coalition alone caused a government outcome.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-CIVIC-SYSTEMS",
        "CLM-NYCAC-PARTICIPATION-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy
    }
  ],
  claims: [],
  researchTasks: [
    {
      id: "TASK-NYCAC-FINKELPEARL-TRANSCRIPT-CENSUS",
      project: "nyc-artist-coalition",
      question:
        "Can a complete manifest of Finkelpearl's New York City Council hearing appearances establish whether he referred to NYC Artist Coalition in any additional transcript?",
      priority: "high",
      status: "queued",
      methodsPlanned: [
        "Obtain a complete Council or Legistar hearing and transcript inventory for Finkelpearl's tenure.",
        "Search every recovered transcript for Finkelpearl and Finklepearl, NYC Artist Coalition, New York City Artist Coalition, Artist Coalition, DIY, and CreateNYC variants.",
        "Record a denominator, date, committee, URL, accessibility status, and found-or-not-found result for every appearance."
      ],
      successCriteria: [
        "Every in-scope Finkelpearl Council appearance has a transcript disposition.",
        "Every positive result has a public URL and page or line locator.",
        "Inaccessible records remain distinct from searched records with no mention."
      ],
      sourceIds: ["SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017"],
      claimIds: [],
      publicSummary:
        "Complete the Council transcript denominator before describing the recovered May 2017 reference as the only instance.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-GOVERNMENT-VALUE-2026",
      project: "nyc-artist-coalition",
      question:
        "What do official City records establish about why NYC Artist Coalition's work was useful to DCLA, Council, and Rafael Espinal?",
      methods: [
        "Searched official Council and Legistar surfaces for spelling and naming variants of Finkelpearl and NYC Artist Coalition.",
        "Close-read the recovered May 2017 Finkelpearl testimony, September 2017 Cabaret Law hearing, and March 2019 Small Business hearing.",
        "Cross-checked the Council records against DCLA's commissioner page, the CreateNYC plan, and the City-hosted coalition recommendations appendix.",
        "Separated direct institutional statements from analyst inference and causal or dependency claims."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "One explicit Finkelpearl reference was recovered: in May 2017 Council testimony, he used NYC Artist Coalition as an example while discussing direct feedback and public collaboration.",
        "DCLA and CreateNYC records repeat the coalition's formation as a public-engagement outcome, while the coalition appendix shows participants translating the January meeting into recommendations.",
        "In September 2017, Jamie supplied lived and operational Cabaret Law testimony, and Espinal directly thanked him for his story and advocacy.",
        "In March 2019, Espinal described a multi-year working relationship with NYC Artist Coalition, and Jamie offered specific data and implementation recommendations to Council."
      ],
      limitations: [
        "The Council Legistar API requires an access token, so the transcript search does not yet have a complete Finkelpearl-appearance denominator.",
        "Search indexing and OCR can miss names; one recovered instance is not proof that no other reference exists.",
        "The reasons DCLA, Council, and Espinal benefited are institutional analysis grounded in source placement and conduct, not direct statements of dependency.",
        "The records do not establish sole coalition causation, legislative authorship, DCLA ownership, or Jamie's sole representation of the coalition."
      ],
      sourceIds: [
        "SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017",
        "SRC-DCLA-COMMISSIONER-NYCAC-CREATENYC-2017",
        "SRC-CREATENYC-FINAL-PLAN-NYCAC-2017",
        "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
        "SRC-NYCAC-COUNCIL-JAMIE-ESPINAL-TESTIMONY-2017",
        "SRC-NYCAC-COUNCIL-ESPINAL-COLLABORATION-2019"
      ],
      publicSummary:
        "Official records show NYC Artist Coalition turning public listening into recommendations, testimony, recurring civic participation, and implementation feedback; DCLA and Council publicly treated that interface as useful while the record preserves collective and governmental credit."
    }
  ]
};
