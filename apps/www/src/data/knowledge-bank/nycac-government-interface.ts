const reviewedAt = "2026-07-15";

export const nycacGovernmentInterfaceAudit = {
  searchTerms: [
    "Tom Finkelpearl",
    "Finklepearl",
    "NYC Artist Coalition",
    "New York City Artist Coalition",
    "Artist Coalition",
    "DIY Arts Community"
  ],
  officialCouncilTranscriptCandidatesReviewed: 5,
  recoveredFinkelpearlCoalitionReferences: 1,
  recoveredReference: {
    hearingDate: "2017-05-19",
    transcriptPage: 92,
    hearing:
      "Fiscal 2018 Executive Budget hearing of the Committees on Finance, Cultural Affairs, and Libraries"
  },
  noMatchCandidateHearings: [
    "CreateNYC cultural-plan hearing transcript",
    "February 25, 2019 monuments hearing transcript",
    "Fiscal 2020 preliminary DCLA budget hearing transcript",
    "October 31, 2019 Cultural Affairs hearing transcript"
  ],
  corpusBoundary:
    "This is a bounded audit of indexed official Council attachments and identified Finkelpearl hearing candidates, not a complete native export of every Council hearing record."
} as const;

export const nycacGovernmentInterface = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-FINKELPEARL-COUNCIL-TESTIMONY-2017",
      kind: "public-url",
      title: "Finkelpearl Fiscal 2018 Executive Budget testimony",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-record review",
      projectIds: ["nyc-artist-coalition", "createnyc"],
      reason:
        "Preserve the official Council-side record in which DCLA Commissioner Tom Finkelpearl identified NYC Artist Coalition as an outcome of the agency's DIY-arts public engagement.",
      sourceUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19"],
      observationIds: [
        "OBS-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
        "OBS-NYCAC-FINKELPEARL-PUBLIC-ENGAGEMENT-CONTEXT"
      ],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT"],
      boundaries: [
        "The testimony establishes Finkelpearl's public account of the coalition's formation, not an exhaustive origin story or individual division of labor.",
        "Its placement in budget testimony supports an interpretation of institutional usefulness, not a claim that DCLA depended on the coalition."
      ]
    },
    {
      id: "INTAKE-NYCAC-DCLA-COMMISSIONER-MESSAGE",
      kind: "public-url",
      title: "DCLA Commissioner message on CreateNYC public engagement",
      submittedAt: reviewedAt,
      submittedBy: "Codex public-source review",
      projectIds: ["nyc-artist-coalition", "createnyc"],
      reason:
        "Corroborate how Finkelpearl publicly described the coalition, informal cultural spaces, and continuing direct dialogue with DCLA outside the Council hearing.",
      sourceUrl:
        "https://www.nyc.gov/site/dcla/about/message-from-the-commissioner.page",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-DCLA-COMMISSIONER-CREATENYC-MESSAGE"],
      observationIds: ["OBS-NYCAC-DCLA-OFFICE-HOURS-OUTCOME"],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      boundaries: [
        "The page establishes the Commissioner's public framing, not private agency deliberations.",
        "It does not establish that DCLA adopted every coalition recommendation."
      ]
    },
    {
      id: "INTAKE-NYCAC-MARCH-COUNCIL-HEARING-2019",
      kind: "public-url",
      title: "Council Committee on the Justice System M.A.R.C.H. hearing",
      submittedAt: reviewedAt,
      submittedBy: "Codex public-record review",
      projectIds: ["nyc-artist-coalition", "talks-not-raids"],
      reason:
        "Document the Council receiving NYC Artist Coalition testimony, data, and specific public-accountability requests during oversight of M.A.R.C.H. operations.",
      sourceUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11"],
      observationIds: [
        "OBS-NYCAC-COUNCIL-RECEIVED-TESTIMONY",
        "OBS-NYCAC-COUNCIL-RECEIVED-DATA",
        "OBS-NYCAC-JAMIE-TALKS-NOT-RAIDS-TESTIMONY"
      ],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      boundaries: [
        "The hearing establishes participation in Council oversight, not Council agreement with every claim or request.",
        "Coalition data and testimony are inputs to deliberation, not proof that they alone produced later operational change."
      ]
    },
    {
      id: "INTAKE-NYCAC-FINKELPEARL-TRANSCRIPT-AUDIT-2026",
      kind: "public-artifact",
      title: "Bounded Finkelpearl Council-transcript audit",
      submittedAt: reviewedAt,
      submittedBy: "Codex public-record research",
      projectIds: ["nyc-artist-coalition", "createnyc"],
      reason:
        "Retain the search method, recovered reference, candidate no-match results, and corpus limitation so future agents can extend rather than overstate the audit.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-AUDIT-2026"],
      observationIds: ["OBS-NYCAC-FINKELPEARL-BOUNDED-AUDIT-RESULT"],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT"],
      boundaries: [
        "One recovered reference is not proof that only one reference was ever made.",
        "No-match results describe the reviewed candidate corpus, not the full Council archive."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
      intakeId: "INTAKE-NYCAC-FINKELPEARL-COUNCIL-TESTIMONY-2017",
      sourceId: "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text:
        "During May 19, 2017 Fiscal 2018 Executive Budget testimony, DCLA Commissioner Tom Finkelpearl told the Council that NYC Artist Coalition formed after DCLA hosted a January meeting for the DIY arts community.",
      locator: "Official transcript, page 92, lines 13-16",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT"],
      limitations: [
        "This is Finkelpearl's public institutional account, not a complete participant-authored formation history.",
        "The statement does not assign Jamie or any collaborator an individual founding share."
      ]
    },
    {
      id: "OBS-NYCAC-FINKELPEARL-PUBLIC-ENGAGEMENT-CONTEXT",
      intakeId: "INTAKE-NYCAC-FINKELPEARL-COUNCIL-TESTIMONY-2017",
      sourceId: "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
      project: "createnyc",
      kind: "context",
      text:
        "Finkelpearl placed the coalition example inside DCLA's case for a closer reciprocal relationship with the public, more direct feedback, and the power of bringing people together around a common cause.",
      locator: "Official transcript, pages 91-92",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
        "CLM-NYCAC-DCLA-CIVIC-INTERMEDIARY-VALUE"
      ],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      limitations: [
        "The context supports why the example was useful in the testimony; it does not reveal every motive Finkelpearl held.",
        "The example does not establish formal agency adoption of the coalition's agenda."
      ]
    },
    {
      id: "OBS-NYCAC-DCLA-OFFICE-HOURS-OUTCOME",
      intakeId: "INTAKE-NYCAC-DCLA-COMMISSIONER-MESSAGE",
      sourceId: "SRC-DCLA-COMMISSIONER-CREATENYC-MESSAGE",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text:
        "In an official DCLA message, Finkelpearl wrote that CreateNYC office hours led to eye-opening interactions and helped launch NYC Artist Coalition, which he described as advocating for DIY spaces across the city.",
      locator: "What Now section",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-DCLA-CIVIC-INTERMEDIARY-VALUE"],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      limitations: [
        "The message records Finkelpearl's public assessment, not a third-party evaluation of CreateNYC engagement.",
        "It does not define the coalition's complete membership, governance, or later campaign record."
      ]
    },
    {
      id: "OBS-NYCAC-COUNCIL-RECEIVED-TESTIMONY",
      intakeId: "INTAKE-NYCAC-MARCH-COUNCIL-HEARING-2019",
      sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
      project: "talks-not-raids",
      kind: "source-fact",
      text:
        "At the February 11, 2019 M.A.R.C.H. oversight hearing, the Council chair acknowledged written NYC Artist Coalition testimony and the committee heard oral testimony from Olympia Kazi, Jamie Burkart, and other nightlife participants.",
      locator: "Official transcript, pages 64-65 and 86-91",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-COUNCIL-DELIBERATIVE-VALUE"],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      limitations: [
        "Appearance in the hearing record does not establish Council agreement or policy adoption.",
        "The record names multiple participants and does not make the coalition the sole source of testimony."
      ]
    },
    {
      id: "OBS-NYCAC-COUNCIL-RECEIVED-DATA",
      intakeId: "INTAKE-NYCAC-MARCH-COUNCIL-HEARING-2019",
      sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
      project: "talks-not-raids",
      kind: "source-fact",
      text:
        "During the hearing, Olympia Kazi described NYC Artist Coalition's handling of agency-provided M.A.R.C.H. data and said the material had already been shared with the Council.",
      locator: "Official transcript, pages 84-86",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-COUNCIL-DELIBERATIVE-VALUE"],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      limitations: [
        "The transcript records Kazi's statement; this pass does not independently audit the shared dataset or every transformation.",
        "Data sharing does not establish that the Council adopted the coalition's analysis or conclusions."
      ]
    },
    {
      id: "OBS-NYCAC-JAMIE-TALKS-NOT-RAIDS-TESTIMONY",
      intakeId: "INTAKE-NYCAC-MARCH-COUNCIL-HEARING-2019",
      sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
      project: "talks-not-raids",
      kind: "source-fact",
      text:
        "Jamie identified himself as an NYC Artist Coalition member and asked the Council for talks rather than raids and transparency about M.A.R.C.H. operations.",
      locator: "Official transcript, page 91",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-COUNCIL-DELIBERATIVE-VALUE"],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      limitations: [
        "The testimony establishes Jamie's participation and request, not sole authorship of the coalition position.",
        "It does not by itself establish that the testimony caused later changes to M.A.R.C.H. operations."
      ]
    },
    {
      id: "OBS-NYCAC-FINKELPEARL-BOUNDED-AUDIT-RESULT",
      intakeId: "INTAKE-NYCAC-FINKELPEARL-TRANSCRIPT-AUDIT-2026",
      sourceId: "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-AUDIT-2026",
      project: "nyc-artist-coalition",
      kind: "limitation",
      text:
        "A bounded search of indexed official Council attachments and five identified Finkelpearl transcript candidates recovered one direct coalition reference, in the May 19, 2017 budget hearing.",
      locator: "Public-safe transcript-audit summary",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT"],
      limitations: [
        "The reviewed candidates are not a complete native Council transcript export.",
        "One recovered reference does not prove that no other reference was made or survives elsewhere."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
      title: "Fiscal 2018 Executive Budget hearing transcript",
      organization: "New York City Council",
      author: "Testimony of DCLA Commissioner Tom Finkelpearl",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-05-19",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council Fiscal 2018 Executive Budget hearing transcript, May 19, 2017, pp. 91-92.",
      publicNote:
        "Finkelpearl names NYC Artist Coalition while explaining DCLA's direct-feedback and CreateNYC public-engagement process to the Council.",
      supportsGenerally: [
        "May 19, 2017 hearing context",
        "Finkelpearl's NYC Artist Coalition reference",
        "formation after a DCLA DIY arts meeting",
        "direct-feedback and reciprocal-public-relationship framing"
      ],
      doesNotEstablish: [
        "a complete coalition origin history",
        "Jamie's individual founding share",
        "DCLA adoption of every coalition recommendation",
        "private motives or institutional dependency",
        "sole causation of any law or agency outcome"
      ]
    },
    {
      id: "SRC-DCLA-COMMISSIONER-CREATENYC-MESSAGE",
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
        "Tom Finkelpearl, 'Message from the Commissioner,' New York City Department of Cultural Affairs, accessed July 15, 2026.",
      publicNote:
        "Connects CreateNYC office hours to the coalition's launch and describes the coalition as advocating for DIY spaces across the city.",
      supportsGenerally: [
        "Finkelpearl's public account of CreateNYC office hours",
        "NYC Artist Coalition launch context",
        "DIY-space advocacy purpose",
        "continuing direct public dialogue with DCLA"
      ],
      doesNotEstablish: [
        "private agency deliberations",
        "the coalition's complete origin story",
        "Jamie's individual role",
        "adoption of every coalition recommendation",
        "measured policy impact"
      ]
    },
    {
      id: "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
      title: "M.A.R.C.H. oversight hearing transcript",
      organization: "New York City Council Committee on the Justice System",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-02-11",
      accessedAt: reviewedAt,
      canonicalUrl:
        "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York City Council Committee on the Justice System M.A.R.C.H. oversight hearing transcript, February 11, 2019.",
      publicNote:
        "The official record documents written and oral NYC Artist Coalition testimony, coalition data shared with the Council, and Jamie's Talks Not Raids transparency request.",
      supportsGenerally: [
        "Council receipt of NYC Artist Coalition testimony",
        "Olympia Kazi's account of sharing M.A.R.C.H. data",
        "Jamie's NYC Artist Coalition identification",
        "Talks Not Raids and transparency request"
      ],
      doesNotEstablish: [
        "Council agreement with every witness",
        "independent audit of the coalition's data analysis",
        "sole authorship of testimony",
        "sole causation of legislation or operational change"
      ]
    },
    {
      id: "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-AUDIT-2026",
      title: "Bounded NYC Council Finkelpearl transcript audit",
      organization: "Codex public-record research",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      publicCitation:
        "Codex public-record research, bounded NYC Council Finkelpearl transcript audit, July 15, 2026.",
      publicNote:
        "Records the search terms, five identified official transcript candidates, one recovered coalition reference, candidate no-match results, and the incomplete-corpus boundary.",
      supportsGenerally: [
        "bounded search method",
        "five identified official transcript candidates",
        "one recovered reference",
        "candidate-level no-match results"
      ],
      doesNotEstablish: [
        "a complete native Council transcript export",
        "that only one reference was ever made",
        "that no additional reference survives",
        "Finkelpearl's private motives"
      ]
    }
  ],

  claims: [
    {
      id: "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE",
      project: "nyc-artist-coalition",
      internalClaim:
        "In May 2017 Executive Budget testimony, DCLA Commissioner Tom Finkelpearl identified NYC Artist Coalition to the City Council as a coalition that formed after DCLA convened the DIY arts community.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "In May 2017 budget testimony, DCLA Commissioner Tom Finkelpearl told the City Council that NYC Artist Coalition formed after DCLA convened the DIY arts community.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
          relationship: "direct-support",
          supports: ["hearing context", "Finkelpearl attribution", "coalition formation sequence"],
          locator: "Transcript page 92",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-AUDIT-2026",
          relationship: "supports-boundary",
          supports: ["bounded audit scope and one recovered reference"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Attribute the formation account to Finkelpearl and preserve DCLA's convening role.",
        "Keep Jamie's and collaborators' individual formation roles separate from this agency testimony.",
        "One recovered Council reference is a floor within the bounded search, not a lifetime total."
      ],
      antiClaims: [
        "DCLA alone founded NYC Artist Coalition.",
        "Jamie alone founded NYC Artist Coalition.",
        "This was the only Council-hearing reference ever made."
      ],
      researchInquiryIds: ["INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-record review"]
    },
    {
      id: "CLM-NYCAC-DCLA-CIVIC-INTERMEDIARY-VALUE",
      project: "nyc-artist-coalition",
      internalClaim:
        "Institutional interpretation: NYC Artist Coalition was useful to DCLA as a civic intermediary that made informal cultural-space experience more available to agency listening, planning, and implementation feedback beyond DCLA's usual nonprofit-grantee relationships.",
      status: "inference",
      projections: [
        {
          key: "archive-note",
          text:
            "The public record supports reading NYC Artist Coalition as a civic intermediary between informal cultural spaces and DCLA's listening and planning work.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
          relationship: "direct-support",
          supports: ["direct-feedback rationale", "reciprocal-public-relationship framing", "coalition example"],
          locator: "Transcript pages 91-92",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-DCLA-COMMISSIONER-CREATENYC-MESSAGE",
          relationship: "corroborating",
          supports: ["office-hours pathway", "DIY-space advocacy purpose", "continuing dialogue rationale"],
          locator: "What Now section",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Name this as an institutional interpretation derived from Finkelpearl's public framing, not a quotation or proof of private motive.",
        "The coalition complemented agency capacity; it did not replace DCLA, speak for every informal space, or secure adoption of every recommendation.",
        "Keep coalition labor collective and do not assign the intermediary role to Jamie alone."
      ],
      antiClaims: [
        "Finkelpearl or DCLA depended on Jamie.",
        "NYC Artist Coalition represented every DIY cultural space.",
        "DCLA adopted the coalition's complete agenda.",
        "Jamie alone supplied the agency's public knowledge."
      ],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex institutional analysis"]
    },
    {
      id: "CLM-NYCAC-COUNCIL-DELIBERATIVE-VALUE",
      project: "nyc-artist-coalition",
      internalClaim:
        "Institutional interpretation: NYC Artist Coalition was useful to the City Council as an organized channel through which affected cultural-space participants could supply testimony, data, problem definitions, and concrete accountability requests for oversight and legislation.",
      status: "inference",
      projections: [
        {
          key: "archive-note",
          text:
            "Council records support reading the coalition as a deliberative interface: affected participants brought testimony, data, and concrete accountability requests into public oversight.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
          relationship: "direct-support",
          supports: ["written and oral testimony", "data shared with Council", "specific transparency request"],
          locator: "Transcript pages 64-65, 84-86, and 91",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
          relationship: "context",
          supports: ["Council oversight context", "public-feedback and constituent framing"],
          locator: "Transcript pages 89-92",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "This interpretation concerns deliberative input and agenda translation, not proof that the Council adopted every position.",
        "The Council heard many witnesses and sources; the coalition was one organized participant among a wider field.",
        "Public testimony and data sharing do not by themselves establish policy causation."
      ],
      antiClaims: [
        "The Council depended on Jamie or NYC Artist Coalition.",
        "The coalition spoke for every affected venue or artist.",
        "Coalition testimony alone caused legislation or oversight action.",
        "Every Council member endorsed the coalition's agenda."
      ],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex institutional analysis"]
    },
    {
      id: "CLM-NYCAC-ESPINAL-IMPLEMENTATION-PARTNER-VALUE",
      project: "nyc-artist-coalition",
      internalClaim:
        "Institutional interpretation: NYC Artist Coalition was useful to Council Member Rafael Espinal as a collective implementation and constituency partner that convened affected people, maintained public issue pathways, and carried specific cultural-space priorities into hearings and the emerging Office of Nightlife context.",
      status: "inference",
      projections: [
        {
          key: "archive-note",
          text:
            "Espinal's public engagement with the coalition supports reading it as one collective implementation and constituency partner across Save NYC Spaces, Talks Not Raids, nightlife policy, and public hearings.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-X-NYCAC-RAFAEL-ESPINAL-2019-02-21",
          relationship: "direct-support",
          supports: ["Espinal's public thanks", "Save NYC Spaces", "Talks Not Raids", "collaborative framing"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
          relationship: "corroborating",
          supports: ["coalition-spearheaded public forum", "Council and agency participation", "Jamie's speaking role"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-OFFICE-NIGHTLIFE-LOCAL-LAW-178-2017",
          relationship: "context",
          supports: ["Office of Nightlife enactment", "liaison, outreach, policy, and public-hearing duties"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYC-CABARET-REPEAL-LOCAL-LAW-214-2017",
          relationship: "context",
          supports: ["Cabaret Law repeal outcome and official sponsor context"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the coalition as one collective partner in a wider advocacy and legislative field, not Espinal's sole constituency or source of policy.",
        "Espinal's public thanks supports collaboration; it does not assign Jamie an exclusive role or prove private reliance.",
        "Official laws establish outcomes and sponsors, not each advocate's causal share."
      ],
      antiClaims: [
        "Espinal depended on Jamie.",
        "Jamie or NYC Artist Coalition authored Espinal's legislation.",
        "The coalition alone created the Office of Nightlife.",
        "The coalition alone repealed the Cabaret Law."
      ],
      researchInquiryIds: ["INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex institutional analysis"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT",
      project: "nyc-artist-coalition",
      question:
        "In which recoverable New York City Council hearing transcripts did Tom Finkelpearl refer to NYC Artist Coalition, and what did the surrounding testimony allow him to demonstrate?",
      methods: [
        "Searched the indexed official Council Legistar attachment corpus using Finkelpearl and common coalition-name variants.",
        "Reviewed five identified official transcript candidates in which Finkelpearl testified, including CreateNYC, budget, monuments, and Cultural Affairs hearings.",
        "Close-read the recovered May 19, 2017 reference in its surrounding CreateNYC, direct-feedback, and budget-oversight context.",
        "Separated candidate no-match results from any claim about the complete Council archive."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "One direct reference was recovered in the bounded corpus: Finkelpearl's May 19, 2017 Fiscal 2018 Executive Budget testimony.",
        "He said NYC Artist Coalition formed after DCLA hosted a January meeting for the DIY arts community.",
        "The surrounding testimony used the coalition as an example of direct public feedback, reciprocal public relationship, and collective organization emerging from CreateNYC engagement."
      ],
      limitations: [
        "The review is not a complete native export of every Council hearing transcript or attachment.",
        "Search indexing, OCR, attachment availability, spelling, and later archival changes can conceal additional references.",
        "One recovered reference does not prove that it was the only reference ever made."
      ],
      sourceIds: [
        "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
        "SRC-NYC-COUNCIL-FINKELPEARL-TRANSCRIPT-AUDIT-2026"
      ],
      publicSummary:
        "A bounded audit recovered one direct Finkelpearl reference in official Council testimony, on May 19, 2017; the record presents NYC Artist Coalition as a concrete result of DCLA's public-engagement process while preserving an incomplete-corpus boundary."
    },
    {
      id: "INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE",
      project: "nyc-artist-coalition",
      question:
        "What source-backed institutional value did NYC Artist Coalition provide to DCLA, the City Council, and Council Member Rafael Espinal?",
      methods: [
        "Separated direct statements and hearing actions from institutional interpretation.",
        "Compared Finkelpearl's Council testimony with his official DCLA message about informal spaces and continuing direct dialogue.",
        "Reviewed the Council's receipt of coalition testimony and data in the 2019 M.A.R.C.H. hearing.",
        "Triangulated Espinal's public thanks with independent town-hall reporting and official nightlife legislation while rejecting sole-causation language."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Direct record: Finkelpearl used the coalition as evidence that DCLA public engagement could produce an ongoing organized constituency.",
        "Institutional interpretation: DCLA gained a bridge to situated knowledge from informal cultural spaces outside ordinary grantee relationships.",
        "Institutional interpretation: the Council gained organized testimony, data, and concrete requests that made diffuse cultural-space harms more deliberable.",
        "Institutional interpretation: Espinal gained a collective partner able to convene constituents, maintain public issue pathways, and carry priorities through hearings and nightlife-policy implementation contexts."
      ],
      limitations: [
        "The sources cannot prove any official's private motives, dependence, or counterfactual need.",
        "The interpretations do not assign the coalition sole causal credit for laws, offices, hearings, or later operational changes.",
        "Jamie was one participant in collective work; individual division of labor remains claim-specific."
      ],
      sourceIds: [
        "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19",
        "SRC-DCLA-COMMISSIONER-CREATENYC-MESSAGE",
        "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11",
        "SRC-X-NYCAC-RAFAEL-ESPINAL-2019-02-21",
        "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
        "SRC-NYC-OFFICE-NIGHTLIFE-LOCAL-LAW-178-2017",
        "SRC-NYC-CABARET-REPEAL-LOCAL-LAW-214-2017"
      ],
      publicSummary:
        "The record supports a bounded civic-intermediary interpretation: the coalition translated informal cultural-space experience into organized dialogue, testimony, data, public participation, and implementation feedback without becoming the sole representative or cause of government action."
    }
  ]
} as const;
