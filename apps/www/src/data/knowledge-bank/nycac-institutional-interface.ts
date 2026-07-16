import type { KnowledgeBank } from "./schema.ts";

const reviewedBy = [
  "Jamie Burkart",
  "Codex NYC Council transcript archival review"
];

const project = "nyc-artist-coalition";
const inquiryId = "INQ-NYCAC-INSTITUTIONAL-INTERFACE-2026";

export const nycacInstitutionalInterfaceIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-NYCAC-INSTITUTIONAL-INTERFACE",
    receivedAt: "2026-07-15",
    inputKind: "claim",
    summary:
      "Official Council and CreateNYC records documenting Tom Finkelpearl's Council testimony about NYC Artist Coalition, Jamie's Council testimony about DCLA office hours, and the coalition's bounded institutional-interface role.",
    projectIds: [project],
    researchStatus: "researched",
    publicationStatus: "projected",
    sourceIds: [
      "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19",
      "SRC-NYC-COUNCIL-CULTURAL-BUDGET-HEARING-2018-03-16",
      "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
      "SRC-CREATENYC-TWITTER-APPENDIX-2017",
      "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-CENSUS-2026-07-15",
      "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19"
    ],
    observationIds: [
      "OBS-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
      "OBS-DCLA-DIRECT-PUBLIC-FEEDBACK-CONTEXT",
      "OBS-CREATENYC-NYCAC-RECOMMENDATIONS",
      "OBS-CREATENYC-NYCAC-PUBLIC-EXCHANGE",
      "OBS-NYCAC-JAMIE-CULTURAL-BUDGET-TESTIMONY",
      "OBS-NYCAC-ESPINAL-CABARET-TESTIMONY",
      "OBS-NYCAC-FINKELPEARL-TRANSCRIPT-CENSUS"
    ],
    claimIds: [
      "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
      "CLM-NYCAC-INSTITUTIONAL-INTERFACE"
    ],
    researchInquiryIds: [inquiryId],
    nextActions: [
      "Extend the transcript census to non-Cultural Affairs committees if a Council-wide negative claim becomes necessary.",
      "Seek collaborator and agency accounts before assigning individual credit for every coalition recommendation, convening, or outcome.",
      "Keep institutional recognition distinct from endorsement, policy causation, or sole authorship."
    ]
  }
];

export const nycacInstitutionalInterfaceSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19",
    title: "Executive Budget hearing transcript for Cultural Affairs and Libraries",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-05-19",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, joint Finance, Cultural Affairs, and Libraries Executive Budget hearing transcript, May 19, 2017.",
    publicNote:
      "In prepared testimony, DCLA Commissioner Tom Finkelpearl placed NYC Artist Coalition within an account of CreateNYC, direct public feedback, and reciprocal agency-public relationships.",
    supportsGenerally: [
      "Finkelpearl explicitly named NYC Artist Coalition in Council testimony",
      "he said the coalition formed after DCLA hosted a January DIY arts-community meeting",
      "he presented the coalition while discussing direct public feedback and the power of bringing people together"
    ],
    doesNotEstablish: [
      "that DCLA solely created or governed NYC Artist Coalition",
      "that Finkelpearl named Jamie or assigned his individual role",
      "that DCLA endorsed every coalition position",
      "that the coalition alone caused a legislative or agency outcome"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-CULTURAL-BUDGET-HEARING-2018-03-16",
    title: "Preliminary Budget hearing transcript for Cultural Affairs and Libraries",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-03-16",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=7514BB5D-51E7-4B77-92D8-A3919828DBEB&ID=6195706&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Committee on Cultural Affairs, Libraries and International Intergroup Relations Preliminary Budget hearing transcript, March 16, 2018.",
    publicNote:
      "The transcript records Jamie testifying as an NYC Artist Coalition member in support of DCLA funding and CreateNYC implementation.",
    supportsGenerally: [
      "Jamie testified as an NYC Artist Coalition member",
      "Jamie supported DCLA funding for CreateNYC implementation",
      "Jamie described CreateNYC office hours as connecting artists, nonprofits, public officials, safety services, and city understanding"
    ],
    doesNotEstablish: [
      "that Jamie spoke for every coalition member",
      "that DCLA adopted every coalition recommendation",
      "that office hours alone produced a policy outcome",
      "an exhaustive account of Jamie's coalition work"
    ]
  },
  {
    id: "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
    title: "NYC Artist Coalition recommendations for community-driven spaces",
    organization: "CreateNYC",
    author: "NYC Artist Coalition",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
    preferredPublicUrl: "canonical",
    publicCitation:
      "CreateNYC, appendix preserving NYC Artist Coalition recommendations for community-driven spaces, 2017.",
    publicNote:
      "The city-published appendix preserves the coalition's public recommendations and request for continued partnership with informal community-driven cultural spaces.",
    supportsGenerally: [
      "the coalition translated community-driven-space concerns into specific recommendations",
      "the coalition asked DCLA to partner with informal cultural communities",
      "CreateNYC preserved the recommendations in its official appendix"
    ],
    doesNotEstablish: [
      "authorship by Jamie of every recommendation",
      "formal adoption of every recommendation",
      "a complete founding or governance history",
      "policy causation"
    ]
  },
  {
    id: "SRC-CREATENYC-TWITTER-APPENDIX-2017",
    title: "CreateNYC Twitter data appendix",
    organization: "CreateNYC",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect3_Twitter-data.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "CreateNYC, Twitter data appendix, 2017.",
    publicNote:
      "The official appendix preserves public exchanges among DCLA, NYC Artist Coalition, artists, and elected officials during the planning process.",
    supportsGenerally: [
      "DCLA publicly acknowledged coalition input",
      "DCLA described a large crowd gathered by NYC Artist Coalition for a DIY-spaces discussion",
      "the public planning record connected coalition convening with CreateNYC"
    ],
    doesNotEstablish: [
      "an exact event attendance count",
      "Jamie's authorship of every coalition post",
      "endorsement of every coalition recommendation",
      "policy causation"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-CENSUS-2026-07-15",
    title: "Bounded Cultural Affairs transcript census during Finkelpearl's DCLA tenure",
    organization: "Codex archival review of New York City Council records",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt:
      "Official Cultural Affairs calendar records, legislative items, and hearing transcript attachments retrieved July 15, 2026",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://legistar.council.nyc.gov/Calendar.aspx",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Codex, bounded review of New York City Council Cultural Affairs hearing transcripts from 2014 through 2019, July 15, 2026.",
    publicNote:
      "The review recovered 74 committee meeting pages, 77 distinct legislative items, and 132 searchable transcript attachments. Two transcripts contained an Artist Coalition phrase; one was Finkelpearl's May 2017 reference and one was Jamie's March 2018 testimony.",
    supportsGenerally: [
      "the bounded committee-corpus denominator",
      "one recovered instance in which Finkelpearl named NYC Artist Coalition",
      "one additional recovered transcript in which Jamie named the coalition and Finkelpearl"
    ],
    doesNotEstablish: [
      "a census of every New York City Council committee",
      "that no other Council transcript refers to the coalition",
      "that search indexing or OCR is perfect",
      "the meaning of either occurrence without close reading"
    ]
  }
];

export const nycacInstitutionalInterfaceObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
    sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19",
    project,
    text:
      "In May 2017 prepared Council testimony, Finkelpearl named NYC Artist Coalition's formation immediately after saying DCLA wanted more direct public feedback and had seen the power of bringing people together around a common cause.",
    locator: "Transcript pages 91-93",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-DCLA-DIRECT-PUBLIC-FEEDBACK-CONTEXT",
    sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19",
    project,
    text:
      "Finkelpearl contrasted DCLA's continuing work with roughly 1,000 annually funded nonprofit cultural organizations with a desire to expand direct public feedback and reciprocal public relationships.",
    locator: "Transcript pages 91-92",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
      "CLM-NYCAC-INSTITUTIONAL-INTERFACE"
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-CREATENYC-NYCAC-RECOMMENDATIONS",
    sourceId: "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
    project,
    text:
      "The CreateNYC appendix preserves coalition recommendations that translated community-driven-space experience into requests concerning safety, affordability, support, and continued DCLA partnership.",
    locator: "Coalition letter and recommendation sections",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-INSTITUTIONAL-INTERFACE"],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-CREATENYC-NYCAC-PUBLIC-EXCHANGE",
    sourceId: "SRC-CREATENYC-TWITTER-APPENDIX-2017",
    project,
    text:
      "The official CreateNYC social appendix preserves DCLA's acknowledgement of coalition input and its description of a large DIY-spaces crowd gathered by NYC Artist Coalition.",
    locator: "Twitter-data appendix entries for @NYCulture and @NYCArtC",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-INSTITUTIONAL-INTERFACE"],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NYCAC-JAMIE-CULTURAL-BUDGET-TESTIMONY",
    sourceId: "SRC-NYC-COUNCIL-CULTURAL-BUDGET-HEARING-2018-03-16",
    project,
    text:
      "In March 2018 Council testimony, Jamie identified himself as an NYC Artist Coalition member, supported DCLA funding for CreateNYC implementation, and described office hours as building trust while connecting underground artists, public officials, and safety services.",
    locator: "Transcript pages 165-168",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-INSTITUTIONAL-INTERFACE"],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NYCAC-ESPINAL-CABARET-TESTIMONY",
    sourceId: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
    project,
    text:
      "At Rafael Espinal's June 2017 Consumer Affairs hearing, Jamie and other coalition participants supplied affected-community testimony, safety framing, and a direct call for Cabaret Law repeal.",
    locator: "Transcript pages 158-164 and 199-202",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-INSTITUTIONAL-INTERFACE"],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "OBS-NYCAC-FINKELPEARL-TRANSCRIPT-CENSUS",
    sourceId: "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-CENSUS-2026-07-15",
    project,
    text:
      "A bounded census of 74 official Cultural Affairs meeting records from 2014 through 2019 recovered 77 legislative items and 132 searchable transcript attachments. Two transcripts contained an Artist Coalition phrase: Finkelpearl's May 2017 reference and Jamie's March 2018 testimony.",
    locator:
      "docs/knowledge-bank/research/nyc-council-finkelpearl-transcript-census.json",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  }
];

export const nycacInstitutionalInterfaceClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
    project,
    internalClaim:
      "At a May 19, 2017, City Council budget hearing, DCLA Commissioner Tom Finkelpearl cited NYC Artist Coalition's formation as a concrete example of direct public engagement and the power of bringing people together around a common cause.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "At a May 2017 City Council budget hearing, DCLA Commissioner Tom Finkelpearl cited NYC Artist Coalition's formation as evidence that bringing people together could create a closer, reciprocal relationship between the agency and the public.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "archive-note",
        text:
          "Finkelpearl named NYC Artist Coalition in prepared Council testimony while explaining DCLA's effort to expand direct public feedback through CreateNYC.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19",
        relationship: "direct-support",
        supports: [
          "Finkelpearl's Council testimony",
          "the NYC Artist Coalition reference",
          "direct-public-feedback and reciprocal-relationship context"
        ],
        locator: "Transcript pages 91-93",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-CENSUS-2026-07-15",
        relationship: "supports-boundary",
        supports: [
          "one direct Finkelpearl occurrence in the bounded Cultural Affairs transcript corpus",
          "corpus and search limitations"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Finkelpearl referred to the coalition, not to Jamie individually.",
      "DCLA's January convening does not establish that DCLA solely created, owned, or governed the coalition.",
      "The bounded census covers Cultural Affairs meeting records, not every Council committee or every possible transcript.",
      "Institutional citation does not establish endorsement of every coalition position or causation of later policy outcomes."
    ],
    antiClaims: [
      "Finkelpearl credited Jamie personally in this testimony.",
      "DCLA created or controlled NYC Artist Coalition.",
      "Finkelpearl endorsed every coalition recommendation.",
      "This is the only Council reference to NYC Artist Coalition in any committee or year.",
      "The reference proves the coalition caused a policy outcome."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  },
  {
    id: "CLM-NYCAC-INSTITUTIONAL-INTERFACE",
    project,
    internalClaim:
      "The combined record supports an institutional interpretation of NYC Artist Coalition as a civic interface: it organized situated knowledge from informal cultural spaces into recommendations, convenings, public testimony, and action routes that DCLA and the Council could hear and use, while carrying civic information back to participants.",
    status: "inference",
    projections: [
      {
        key: "archive-note",
        text:
          "The evidence supports interpreting NYC Artist Coalition as an interface between informal cultural communities and city institutions, not as a substitute for those communities or as the sole cause of government action.",
        status: "hold",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19",
        relationship: "direct-support",
        supports: [
          "DCLA's stated interest in direct public feedback",
          "the coalition as an engagement example"
        ],
        locator: "Transcript pages 91-93",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
        relationship: "corroborating",
        supports: [
          "translation of informal cultural-space concerns into recommendations",
          "a request for continuing DCLA partnership"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CREATENYC-TWITTER-APPENDIX-2017",
        relationship: "corroborating",
        supports: [
          "public DCLA-coalition exchange",
          "coalition convening acknowledged by DCLA"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CULTURAL-BUDGET-HEARING-2018-03-16",
        relationship: "corroborating",
        supports: [
          "Jamie's account of office hours as trust and safety infrastructure",
          "reciprocal public testimony supporting DCLA implementation"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "context",
        supports: [
          "affected-community testimony before Espinal",
          "safety, representation, and repeal framing"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "This is an evidence-backed institutional interpretation, not language used verbatim by DCLA, the Council, or Espinal.",
      "DCLA brought formal agency access and convening authority; coalition participants built and maintained the independent civic relationships and tools.",
      "The Council and Espinal retained legislative authority and responsibility; the coalition supplied constituency, situated evidence, participation, and accountability capacity.",
      "The record does not isolate Jamie's individual authorship of every coalition action or recommendation."
    ],
    antiClaims: [
      "DCLA, the Council, or Espinal could not act without Jamie.",
      "Jamie spoke for every DIY venue or artist.",
      "The coalition replaced direct participation by affected communities.",
      "Institutional access proves institutional endorsement.",
      "Coalition testimony alone caused Cabaret Law repeal, the Office of Nightlife, or another policy outcome."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt: "2026-07-15",
    reviewedBy
  }
];

export const nycacInstitutionalInterfaceResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: inquiryId,
    project,
    question:
      "Where did Tom Finkelpearl refer to NYC Artist Coalition in Council testimony, and what does the source record support about why DCLA, the Council, and Rafael Espinal found the coalition's work useful?",
    methods: [
      "Enumerated 74 official Cultural Affairs committee meeting records from 2014 through 2019 and traversed their 77 legislative items.",
      "Downloaded and searched 132 hearing transcript attachments for Artist Coalition and Finkelpearl spelling variants, then close-read every match.",
      "Cross-read the direct occurrence with official CreateNYC appendices, Jamie's March 2018 Cultural Affairs testimony, and coalition testimony before Espinal's June 2017 Consumer Affairs hearing.",
      "Separated direct statements, bounded corpus findings, and institutional inference."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Finkelpearl directly named NYC Artist Coalition in prepared testimony at the May 19, 2017, Executive Budget hearing.",
      "He used the coalition while explaining DCLA's effort to move beyond content collection toward direct feedback and closer reciprocal public relationships.",
      "The bounded Cultural Affairs corpus produced one Finkelpearl-to-coalition occurrence and one additional March 2018 occurrence in which Jamie named the coalition and Finkelpearl.",
      "Official CreateNYC records preserve coalition recommendations, DCLA acknowledgement, and coalition convening as part of the planning record.",
      "Council transcripts show coalition participants supplying affected-community testimony and safety, representation, and implementation detail before Rafael Espinal and other members.",
      "The evidence supports the inference that DCLA benefited from access to communities beyond its usual funded-institution relationships, while the Council and Espinal benefited from organized constituency, testimony, turnout, issue definition, and accountability capacity."
    ],
    limitations: [
      "The transcript census is bounded to the Council's Cultural Affairs committee calendar and does not prove absence from every other committee.",
      "Legistar OCR and search can miss spelling variants or image-only material.",
      "The institutional-function analysis is an inference from multiple records, not a statement attributed directly to Finkelpearl, the Council, or Espinal.",
      "The sources do not establish Jamie's authorship of every coalition recommendation, event, communication, or outcome.",
      "The sources do not establish sole coalition causation for legislation, agency creation, or enforcement reform."
    ],
    sourceIds: [
      "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19",
      "SRC-NYC-COUNCIL-CULTURAL-BUDGET-HEARING-2018-03-16",
      "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
      "SRC-CREATENYC-TWITTER-APPENDIX-2017",
      "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-CENSUS-2026-07-15",
      "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19"
    ],
    publicSummary:
      "A bounded official-transcript review recovered one direct instance of Finkelpearl naming NYC Artist Coalition in Council testimony. Read with CreateNYC and Council records, it supports a careful interpretation of the coalition as a useful interface between informal cultural communities and city institutions."
  }
];
