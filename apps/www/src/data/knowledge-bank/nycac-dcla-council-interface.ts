import type {
  ClaimRecord,
  CitationPage,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = ["Jamie Burkart", "Codex public-safe archival review"];

export const nycacDclaCouncilSources: SourceRecord[] = [
  {
    id: "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017",
    title: "Fiscal 2018 Executive Budget hearing transcript - Cultural Affairs",
    organization: "New York City Council",
    author: "Tom Finkelpearl",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-05-19",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Fiscal 2018 Executive Budget hearing transcript for Cultural Affairs, May 19, 2017, pp. 91-93.",
    publicNote:
      "In his Council testimony, DCLA Commissioner Tom Finkelpearl used NYC Artist Coalition's formation after a January DIY-arts meeting as an example of the value of direct public feedback and bringing people together around a common cause.",
    supportsGenerally: [
      "Finkelpearl referred to NYC Artist Coalition in Council testimony",
      "DCLA hosted a January 2017 meeting for the DIY arts community",
      "Finkelpearl connected the coalition's formation to that meeting",
      "Finkelpearl presented the coalition as evidence of the value of direct public feedback"
    ],
    doesNotEstablish: [
      "that DCLA created, owned, directed, or spoke for NYC Artist Coalition",
      "Jamie's sole founding or leadership credit",
      "Finkelpearl's private motives",
      "sole causality for Cabaret Law repeal or the Office of Nightlife"
    ]
  },
  {
    id: "SRC-NYCAC-FINKELPEARL-DCLA-MESSAGE-2017",
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
      "Tom Finkelpearl, 'Message from the Commissioner,' New York City Department of Cultural Affairs, reviewed July 16, 2026.",
    publicNote:
      "Finkelpearl described CreateNYC office hours as meaningful direct dialogue, said they helped launch coalitions including NYC Artist Coalition, and connected continued public access to keeping the cultural plan responsive.",
    supportsGenerally: [
      "CreateNYC office hours created direct public access to DCLA",
      "Finkelpearl said the office hours helped launch NYC Artist Coalition",
      "DCLA regarded continued public dialogue as useful to cultural-policy implementation"
    ],
    doesNotEstablish: [
      "that DCLA controlled the coalition",
      "that one office-hours meeting alone created the coalition",
      "Jamie's individual contribution",
      "private intent beyond Finkelpearl's published explanation"
    ]
  },
  {
    id: "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
    title: "Fiscal 2019 Preliminary Budget hearing transcript - Cultural Affairs",
    organization: "New York City Council",
    author: "Jamie Burkart",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-03-16",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=7514BB5D-51E7-4B77-92D8-A3919828DBEB&ID=6195706&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Fiscal 2019 Preliminary Budget hearing transcript for Cultural Affairs, March 16, 2018, pp. 165-168.",
    publicNote:
      "Jamie testified as an NYC Artist Coalition member and artist-safety advocate in support of DCLA funding, describing office hours as a trust- and information-building interface and documenting subsequent safety work, coalition organizing, and city-facing recommendations.",
    supportsGenerally: [
      "Jamie testified as an NYC Artist Coalition member and artist-safety advocate",
      "Jamie supported increased DCLA funding to implement CreateNYC",
      "Jamie described office hours as connecting artists, nonprofits, public officials, safety services, and city understanding",
      "Jamie described fire-safety walkthroughs, Fire Guard support, coalition organizing, and policy recommendations"
    ],
    doesNotEstablish: [
      "that Jamie alone organized every safety activity or coalition action",
      "that DCLA adopted every coalition recommendation",
      "that Jamie authored legislation",
      "sole causality for Cabaret Law repeal or the Office of Nightlife"
    ]
  },
  {
    id: "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017",
    title: "Cabaret Law enforcement and Office of Nightlife hearing transcript",
    organization: "New York City Council",
    author: "Rafael Espinal and public witnesses",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-19",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=4DB6965B-EC69-4863-B461-DF449A04AE9F&ID=5316934&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Committee on Consumer Affairs hearing transcript on Cabaret Law enforcement and Intro 1648, June 19, 2017.",
    publicNote:
      "Chair Rafael Espinal framed DIY venues as indispensable, identified post-Ghost Ship enforcement and code-navigation problems, and described an Office of Nightlife liaison function. The transcript records NYC Artist Coalition testimony and Jamie's individual repeal testimony.",
    supportsGenerally: [
      "Espinal sought testimony from agencies, advocates, venue operators, and affected communities",
      "Espinal described DIY venues as culturally indispensable and identified enforcement and compliance problems",
      "the proposed Office of Nightlife would connect nightlife businesses, government, and residents",
      "NYC Artist Coalition and Jamie contributed public testimony to the hearing record"
    ],
    doesNotEstablish: [
      "that Espinal depended on Jamie personally",
      "that NYC Artist Coalition was the only affected constituency",
      "that testimony alone caused legislation",
      "that Espinal or the coalition agreed with every witness"
    ]
  },
  {
    id: "SRC-NYCAC-CREATENYC-APPENDIX-2017",
    title: "CreateNYC appendix - NYC Artist Coalition DIY community recommendations",
    organization: "New York City Department of Cultural Affairs / NYC Artist Coalition",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-07-19",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
    preferredPublicUrl: "canonical",
    publicCitation:
      "CreateNYC appendix, 'Preserve Community Driven Spaces - NYC Artist Coalition,' 2017.",
    publicNote:
      "The official cultural-plan appendix preserves the coalition's public recommendations on criminalization, administrative and financial support, and affordability, including DCLA and cross-agency proposals.",
    supportsGenerally: [
      "NYC Artist Coalition submitted organized recommendations to DCLA",
      "the recommendations addressed criminalization, access to support, and affordability",
      "the official CreateNYC appendix preserved the coalition submission"
    ],
    doesNotEstablish: [
      "that DCLA adopted every recommendation",
      "Jamie's authorship of the full submission",
      "individual ownership of collective policy work",
      "policy causality"
    ]
  },
  {
    id: "SRC-NYCAC-FINKELPEARL-COUNCIL-CORPUS-2026",
    title: "Finkelpearl-era New York City Council transcript corpus review",
    author: "Codex public-safe archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Public-safe review of official New York City Council hearing transcripts during the 2017-2019 NYC Artist Coalition and Finkelpearl overlap, July 16, 2026.",
    publicNote:
      "The bounded review enumerated 30 Cultural Affairs meeting records, 50 transcript attachment entries, 41 distinct transcript PDFs, and 24 distinct transcripts containing Finkelpearl's name. Phrase-variant and contextual review recovered one instance in which Finkelpearl himself referred to NYC Artist Coalition.",
    protectedLocatorId: "RESEARCH-NYCAC-FINKELPEARL-COUNCIL-2026",
    supportsGenerally: [
      "the search denominator and review method",
      "one recovered Finkelpearl-spoken NYC Artist Coalition reference",
      "separation of speaker attribution from nearby public-witness references"
    ],
    doesNotEstablish: [
      "that no other reference exists outside the indexed and text-extractable corpus",
      "perfect OCR or transcription",
      "private motive",
      "exclusive institutional importance"
    ]
  }
];

export const nycacDclaCouncilClaims: ClaimRecord[] = [
  {
    id: "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
    project: "nyc-artist-coalition",
    internalClaim:
      "At the May 19, 2017, Fiscal 2018 Executive Budget hearing, DCLA Commissioner Tom Finkelpearl cited NYC Artist Coalition's formation after a DCLA DIY-arts meeting as evidence of the value of direct public feedback and bringing people together around a common cause.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "In 2017 Council testimony, DCLA Commissioner Tom Finkelpearl cited NYC Artist Coalition's formation after a DCLA DIY-arts meeting as evidence of the value of direct public feedback and convening around a common cause.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nycac-dcla-council-interface"],
        rationale:
          "Preserve the exact institutional recognition in the public-safe bank while keeping the website focused on Jamie's work rather than a government endorsement claim."
      },
      {
        key: "case-study",
        text:
          "DCLA Commissioner Tom Finkelpearl later cited the coalition in Council testimony as an example of what direct public engagement could produce.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/nyc-artist-coalition"],
        rationale:
          "The dedicated NYC Artist Coalition case study explains the public-engagement relationship without implying endorsement or agency ownership."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017",
        relationship: "direct-support",
        supports: [
          "Finkelpearl's Council-hearing reference",
          "the DCLA DIY-arts meeting",
          "the public-feedback and common-cause framing"
        ],
        locator: "pp. 91-93",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-FINKELPEARL-DCLA-MESSAGE-2017",
        relationship: "corroborating",
        supports: [
          "Finkelpearl's published office-hours account",
          "direct-dialogue value",
          "coalition-launch wording"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-FINKELPEARL-COUNCIL-CORPUS-2026",
        relationship: "supports-boundary",
        supports: ["bounded search denominator", "speaker-attribution review"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is evidence that Finkelpearl regarded coalition formation as a useful public-engagement result, not a personal endorsement of Jamie.",
      "The phrase 'formed after' records chronology and institutional context; it does not assign sole causality or ownership to DCLA.",
      "The reviewed corpus is bounded and text-extraction dependent."
    ],
    antiClaims: [
      "Finkelpearl endorsed Jamie personally.",
      "DCLA created or controlled NYC Artist Coalition.",
      "Finkelpearl credited NYC Artist Coalition with passing the Cabaret Law repeal.",
      "This was the only Council-hearing reference that could ever exist."
    ],
    researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCES"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-JAMIE-CIVIC-TRANSLATION",
    project: "nyc-artist-coalition",
    internalClaim:
      "Jamie's 2018 Council testimony documents his role at the interface between informal cultural communities and City government: supporting DCLA's public-engagement model, organizing safety work, helping artists reach Fire Guard and compliance knowledge, and carrying coalition recommendations into public process.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie used coalition organizing, safety practice, and public testimony to translate between informal cultural communities and City government, helping artists reach practical safety knowledge while carrying community-defined problems into DCLA and Council processes.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nycac-dcla-council-interface"],
        rationale:
          "State Jamie's documented labor directly while keeping collective programs and policy outcomes collectively credited."
      },
      {
        key: "case-study",
        text:
          "Connected informal cultural communities with public safety knowledge and city decision-making through coalition operations, practical safety work, and public testimony.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/nyc-artist-coalition"],
        rationale:
          "The dedicated coalition case study carries the necessary collaborator, movement, and agency context."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
        relationship: "direct-support",
        supports: [
          "Jamie's coalition and artist-safety role",
          "office-hours trust and information function",
          "fire-safety walkthroughs and Fire Guard support",
          "coalition recommendations entering public process"
        ],
        locator: "pp. 165-168",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-CREATENYC-APPENDIX-2017",
        relationship: "corroborating",
        supports: [
          "the coalition's organized city-facing recommendations",
          "criminalization, support, and affordability problem structure"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017",
        relationship: "corroborating",
        supports: [
          "Jamie's public testimony",
          "coalition participation",
          "the Council's stated need for advocate and agency insight"
        ],
        locator: "pp. 199-203 and hearing opening",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Jamie's testimony is direct evidence of his own public account and public role; collective program production still requires collective credit.",
      "Do not convert policy recommendations, testimony, or trusted access into legislative authorship or sole outcome causality.",
      "The City-facing interface included many coalition members, partner groups, witnesses, public officials, and agency staff."
    ],
    antiClaims: [
      "Jamie was the sole bridge between artists and City government.",
      "Jamie alone designed or delivered every safety program.",
      "Jamie authored the Office of Nightlife or Cabaret Law legislation.",
      "DCLA adopted every coalition recommendation."
    ],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-INSTITUTIONAL-INTERFACE-VALUE",
    project: "nyc-artist-coalition",
    internalClaim:
      "The public record supports the institutional inference that DCLA, the City Council, and Councilmember Rafael Espinal benefited from NYC Artist Coalition as an organized interlocutor for cultural spaces that were informal, dispersed, wary of enforcement, or outside ordinary funding relationships. The coalition translated lived experience into recommendations, testimony, recurring convenings, safety practice, and implementation feedback.",
    status: "inference",
    projections: [
      {
        key: "archive-note",
        text:
          "Institutionally, NYC Artist Coalition made dispersed cultural-space knowledge more legible and actionable: it assembled recurring participation, practical safety work, recommendations, testimony, and feedback that DCLA and the Council could hear and respond to.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/nycac-dcla-council-interface"],
        rationale:
          "Keep the institutional analysis available to future composition while labeling it as synthesis rather than a recovered statement of private motive."
      },
      {
        key: "case-study",
        text:
          "Built a durable civic interface through which informal cultural spaces could define problems, share safety knowledge, and participate in policy conversations.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Hold until a dedicated case study can distinguish Jamie's specific operating contribution from the coalition's shared civic function."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017",
        relationship: "direct-support",
        supports: [
          "DCLA's public-feedback need",
          "coalition formation as a public-engagement result"
        ],
        locator: "pp. 91-93",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-FINKELPEARL-DCLA-MESSAGE-2017",
        relationship: "direct-support",
        supports: [
          "meaningful direct dialogue",
          "ongoing public input for cultural-policy implementation"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017",
        relationship: "direct-support",
        supports: [
          "Council demand for advocate, agency, venue, and community insight",
          "the Office of Nightlife liaison and navigation problem",
          "the concrete DIY-venue enforcement and compliance context"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
        relationship: "corroborating",
        supports: [
          "trust and information exchange",
          "safety-service access",
          "City understanding of artists' lives"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-CREATENYC-APPENDIX-2017",
        relationship: "corroborating",
        supports: [
          "translation of lived problems into organized recommendations",
          "official preservation of the submission"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "'Needed' is institutional analysis, not evidence of private dependence or personal motive.",
      "Espinal needed a plural hearing record and affected constituencies; the evidence does not show dependence on Jamie personally.",
      "The coalition was one interlocutor among artists, venue operators, partner organizations, agencies, residents, and other advocates.",
      "Civic usefulness is not government endorsement, representational monopoly, or policy causality."
    ],
    antiClaims: [
      "Finkelpearl, DCLA, Espinal, or the Council needed Jamie personally.",
      "NYC Artist Coalition spoke for every artist or cultural space.",
      "DCLA or the Council delegated public authority to the coalition.",
      "The coalition's usefulness proves that it caused legislation.",
      "Institutional access proves agreement with every coalition position."
    ],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE"],
    reviewedAt,
    reviewedBy
  }
];

export const nycacDclaCouncilInquiries: ResearchInquiry[] = [
  {
    id: "INQ-NYCAC-FINKELPEARL-COUNCIL-REFERENCES",
    project: "nyc-artist-coalition",
    question:
      "Where, if anywhere, did Tom Finkelpearl refer to NYC Artist Coalition in a New York City Council hearing transcript?",
    methods: [
      "Enumerated all 30 official Council meeting records indexed under Cultural Affairs from January 2017 through December 2019.",
      "Downloaded 50 hearing-transcript attachment entries representing 41 distinct official transcript PDFs.",
      "Identified 24 distinct transcripts containing Finkelpearl's name and searched phrase variants for NYC Artist Coalition, New York City Artist Coalition, New York City Artists Coalition, and Artist Coalition.",
      "Read every phrase hit in speaker context and separately reviewed the June 19, 2017, Consumer Affairs Cabaret Law and Office of Nightlife hearing."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "The May 19, 2017, Fiscal 2018 Executive Budget transcript records Finkelpearl citing NYC Artist Coalition's formation after a DCLA DIY-arts meeting as an example of direct public feedback and convening around a common cause.",
      "This was the only Finkelpearl-spoken coalition reference recovered in the 24 Finkelpearl-bearing Cultural Affairs transcript PDFs.",
      "Two other Cultural Affairs transcripts contained coalition phrase hits: Lane Harwell and Chair Jimmy Van Bramer discussed the coalition in September 2017, and Jamie testified as a coalition member in March 2018.",
      "Finkelpearl was not the agency witness in the June 19, 2017, Consumer Affairs hearing; the transcript records agency representatives, NYC Artist Coalition testimony, and Jamie's individual testimony."
    ],
    limitations: [
      "The denominator is the official indexed Cultural Affairs corpus plus the known Consumer Affairs hearing, not every attachment ever produced by every Council committee.",
      "Unavailable, unindexed, image-only, or mistranscribed records could evade text search.",
      "A recovered public statement cannot establish private motive or every institutional interaction."
    ],
    sourceIds: [
      "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017",
      "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
      "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017",
      "SRC-NYCAC-FINKELPEARL-COUNCIL-CORPUS-2026"
    ],
    publicSummary:
      "A bounded search of 30 Cultural Affairs meeting records, 41 distinct transcript PDFs, and 24 Finkelpearl-bearing transcripts recovered one direct Finkelpearl reference to NYC Artist Coalition, in the May 19, 2017, Fiscal 2018 Executive Budget hearing.",
    protectedLocatorId: "RESEARCH-NYCAC-FINKELPEARL-COUNCIL-2026"
  },
  {
    id: "INQ-NYCAC-INSTITUTIONAL-VALUE",
    project: "nyc-artist-coalition",
    question:
      "What public function did NYC Artist Coalition and Jamie's work perform for DCLA, the City Council, and Councilmember Rafael Espinal?",
    methods: [
      "Cross-read Finkelpearl's 2017 Council testimony with his DCLA commissioner message.",
      "Reviewed Jamie's 2018 Cultural Affairs budget testimony for a contemporaneous account of trust, safety, coalition, and city-understanding work.",
      "Reviewed Espinal's opening statement, the agency and public panels, and NYC Artist Coalition testimony in the June 2017 Cabaret Law and Office of Nightlife hearing.",
      "Reviewed the coalition recommendation letter preserved in the official CreateNYC appendix and separated observed institutional function from inferred motive."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Finkelpearl publicly treated coalition formation as evidence that direct agency-public engagement could produce durable civic capacity.",
      "Jamie's testimony described a two-way interface: artists gained access to safety knowledge and City relationships, while government gained a better understanding of informal cultural work.",
      "The coalition converted dispersed experience into recurring participation, organized recommendations, safety practice, and Council testimony.",
      "Espinal's hearing record shows a need for plural evidence from advocates, venue operators, agencies, residents, and affected communities to diagnose enforcement problems and design liaison and navigation functions.",
      "The strongest defensible answer is institutional rather than personal: the coalition made a hard-to-reach constituency and its practical knowledge more legible to government."
    ],
    limitations: [
      "No source says Finkelpearl, Espinal, DCLA, or the Council privately 'needed Jamie.'",
      "The review does not establish every meeting, drafting exchange, collaborator contribution, or implementation decision.",
      "Government access and quotation do not establish endorsement, control, exclusivity, adoption of every recommendation, or policy causality."
    ],
    sourceIds: [
      "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017",
      "SRC-NYCAC-FINKELPEARL-DCLA-MESSAGE-2017",
      "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
      "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017",
      "SRC-NYCAC-CREATENYC-APPENDIX-2017"
    ],
    publicSummary:
      "The public record supports a bounded institutional interpretation: NYC Artist Coalition made informal cultural-space knowledge more legible and actionable through recurring participation, safety practice, recommendations, testimony, and feedback, while Jamie's documented work helped operate that interface.",
    protectedLocatorId: "RESEARCH-NYCAC-INSTITUTIONAL-VALUE-2026"
  }
];

export const nycacDclaCouncilIntake: IntakeRecordInput[] = [
  {
    id: "INT-NYCAC-DCLA-COUNCIL-INTERFACE-2026-07-16",
    receivedAt: reviewedAt,
    kind: "claim-hypothesis",
    visibility: "public-safe",
    title: "Why DCLA, the Council, and Espinal benefited from NYC Artist Coalition",
    description:
      "Question-driven archival review of official Council transcripts and DCLA records concerning Finkelpearl's references, Jamie's civic-translation work, and the coalition's institutional function.",
    whyItMatters:
      "Makes the practical value of Jamie's relational and operating work legible without inventing private motive or overstating collective policy causality.",
    projectIds: ["nyc-artist-coalition", "let-nyc-dance", "save-nyc-spaces"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Separated a confirmed Finkelpearl statement, Jamie's confirmed public record, and a bounded institutional inference into independently governed claims.",
    sourceIds: nycacDclaCouncilSources.map((source) => source.id),
    claimIds: nycacDclaCouncilClaims.map((claim) => claim.id),
    inquiryIds: nycacDclaCouncilInquiries.map((inquiry) => inquiry.id),
    artifactPaths: [
      "docs/knowledge-bank/projects/nycac-dcla-council-interface.md",
      "docs/knowledge-bank/runs/2026-07-16-nycac-dcla-council-interface.md"
    ],
    boundaries: [
      "Treat 'needed' as institutional analysis, not personal dependence or recovered private motive.",
      "Preserve coalition, movement, agency, Council, witness, and venue credit.",
      "Do not convert public access, quotation, or incorporation into endorsement, control, exclusivity, or policy causality."
    ]
  }
];

export const nycacDclaCouncilPages: CitationPage[] = [
  {
    id: "nyc-artist-coalition",
    surface: "/work/nyc-artist-coalition",
    sourceOrder: [
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-GOTHAMIST-2017-06-19",
      "SRC-NYCAC-NPR-2017-09-20",
      "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19",
      "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
      "SRC-NYCAC-X-PROFILE-2026",
      "SRC-NYCAC-OLYMPIA-RELIEF-2020",
      "SRC-NYCAC-OLYMPIA-FAIR-RENT-2021",
      "SRC-NYCAC-OLYMPIA-NIGHTLIFE-2022",
      "SRC-SOCIAL-ARCHIVE-INVENTORY-2026",
      "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017",
      "SRC-NYCAC-FINKELPEARL-DCLA-MESSAGE-2017",
      "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
      "SRC-NYCAC-CREATENYC-APPENDIX-2017",
      "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017",
      "SRC-NYCAC-LET-NYC-DANCE",
      "SRC-NYCAC-BEDFORD-BOWERY-NIGHT-MAYOR",
      "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
      "SRC-NYCAC-TALKS-NOT-RAIDS",
      "SRC-NYC-COUNCIL-INTRO-1156-2018",
      "SRC-NYC-MAYOR-CURE-2023-12-28"
    ],
    occurrences: [
      {
        id: "participation-system",
        claimId: "CLM-NYCAC-PARTICIPATION-SYSTEM",
        projection: "case-study",
        sourceIds: [
          "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
          "SRC-NYCAC-GOTHAMIST-2017-06-19",
          "SRC-NYCAC-NPR-2017-09-20",
          "SRC-SUNDAY-WOWLIST-GREENE-HILL-2017-12-19"
        ]
      },
      {
        id: "shared-identity",
        claimId: "CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT",
        projection: "case-study",
        sourceIds: [
          "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
          "SRC-NYCAC-X-PROFILE-2026",
          "SRC-NYCAC-OLYMPIA-RELIEF-2020",
          "SRC-NYCAC-OLYMPIA-FAIR-RENT-2021",
          "SRC-NYCAC-OLYMPIA-NIGHTLIFE-2022"
        ]
      },
      {
        id: "council-interface",
        claimId: "CLM-NYCAC-SOCIAL-COUNCIL-ENGAGEMENT",
        projection: "case-study",
        sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026"]
      },
      {
        id: "finkelpearl-reference",
        claimId: "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
        projection: "case-study",
        sourceIds: [
          "SRC-NYCAC-FINKELPEARL-COUNCIL-BUDGET-2017",
          "SRC-NYCAC-FINKELPEARL-DCLA-MESSAGE-2017"
        ]
      },
      {
        id: "jamie-civic-translation",
        claimId: "CLM-NYCAC-JAMIE-CIVIC-TRANSLATION",
        projection: "case-study",
        sourceIds: [
          "SRC-NYCAC-JAMIE-COUNCIL-DCLA-BUDGET-2018",
          "SRC-NYCAC-CREATENYC-APPENDIX-2017",
          "SRC-NYCAC-ESPINAL-CABARET-HEARING-2017"
        ]
      },
      {
        id: "cabaret-advocacy",
        claimId: "CLM-NYCAC-CABARET-ADVOCACY",
        projection: "case-study",
        sourceIds: [
          "SRC-NYCAC-GOTHAMIST-2017-06-19",
          "SRC-NYCAC-NPR-2017-09-20",
          "SRC-NYCAC-LET-NYC-DANCE"
        ]
      },
      {
        id: "office-nightlife-town-hall",
        claimId: "CLM-NYCAC-OFFICE-NIGHTLIFE-TOWN-HALL",
        projection: "case-study",
        sourceIds: [
          "SRC-NYCAC-BEDFORD-BOWERY-NIGHT-MAYOR",
          "SRC-NYCAC-NPR-2017-09-20"
        ]
      },
      {
        id: "talks-not-raids",
        claimId: "CLM-TALKS-NOT-RAIDS-ADVOCACY",
        projection: "case-study",
        sourceIds: [
          "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
          "SRC-NYCAC-TALKS-NOT-RAIDS",
          "SRC-NYC-COUNCIL-INTRO-1156-2018"
        ]
      },
      {
        id: "march-to-cure",
        claimId: "CLM-MARCH-TRANSPARENCY-TO-CURE",
        projection: "case-study",
        sourceIds: [
          "SRC-NYCAC-TALKS-NOT-RAIDS",
          "SRC-NYC-COUNCIL-INTRO-1156-2018",
          "SRC-NYC-MAYOR-CURE-2023-12-28"
        ]
      }
    ]
  }
];
