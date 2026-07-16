import type {
  ClaimRecord,
  EntityRecord,
  IntakeItem,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nycArtcInstitutionalValueEntities = [
  {
    id: "nyc-department-cultural-affairs",
    kind: "organization",
    name: "New York City Department of Cultural Affairs",
    aliases: ["DCLA", "NYC Cultural Affairs"],
    publicDescription: "City agency responsible for supporting New York City's cultural life and administering CreateNYC."
  },
  {
    id: "create-nyc",
    kind: "campaign",
    name: "CreateNYC",
    aliases: ["Create NYC"],
    publicDescription: "New York City's first comprehensive cultural-planning process and published cultural plan."
  },
  {
    id: "tom-finkelpearl",
    kind: "person",
    name: "Tom Finkelpearl",
    aliases: [],
    publicDescription: "Commissioner of the New York City Department of Cultural Affairs during the 2017 CreateNYC process."
  },
  {
    id: "rafael-espinal",
    kind: "person",
    name: "Rafael Espinal",
    aliases: ["Rafael L. Espinal Jr."],
    publicDescription: "New York City Council member who sponsored the 2017 Office of Nightlife and Cabaret Law repeal measures."
  }
] satisfies EntityRecord[];

export const nycArtcInstitutionalValueIntakes = [
  {
    id: "INT-2026-07-15-DCLA-FINKELPEARL-CREATENYC-TESTIMONY",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex source discovery",
    publicSafeDescription: "Official February 2017 DCLA testimony describing DIY-community recommendations, independent organizing, direct public dialogue, and the agency's intention to keep learning from that community.",
    submittedUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect6_Commissioner-Tom-Finkelpearl_Testimony.pdf",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-department-cultural-affairs", "create-nyc", "tom-finkelpearl", "new-york-city-council"],
    dateHints: ["2017-02-27"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017"],
    claimIds: ["CLM-DCLA-NYCARTC-RECIPROCAL-PUBLIC-ENGAGEMENT"],
    inquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"]
  },
  {
    id: "INT-2026-07-15-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex source discovery",
    publicSafeDescription: "Official May 2017 Council budget-hearing transcript in which Commissioner Finkelpearl named NYC Artist Coalition while discussing reciprocal public engagement and expanded direct feedback.",
    submittedUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-department-cultural-affairs", "create-nyc", "tom-finkelpearl", "new-york-city-council", "nyc-artist-coalition"],
    dateHints: ["2017-05-19"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017"],
    claimIds: [
      "CLM-FINKELPEARL-NYCARTC-COUNCIL-TESTIMONY-2017",
      "CLM-DCLA-NYCARTC-RECIPROCAL-PUBLIC-ENGAGEMENT",
      "CLM-NYC-COUNCIL-NYCARTC-CIVIC-VALUE"
    ],
    inquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"]
  },
  {
    id: "INT-2026-07-15-CREATENYC-FORWARD-NYCARTC",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex source discovery",
    publicSafeDescription: "Official CreateNYC foreword identifying NYC Artist Coalition as a coalition launched through the planning process's direct-public-dialogue practice.",
    submittedUrl: "https://createnyc.cityofnewyork.us/the-cultural-plan/forward/",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-department-cultural-affairs", "create-nyc", "tom-finkelpearl", "nyc-artist-coalition"],
    dateHints: ["2017"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-CREATENYC-FORWARD-NYCARTC-2017"],
    claimIds: ["CLM-DCLA-NYCARTC-RECIPROCAL-PUBLIC-ENGAGEMENT"],
    inquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"]
  },
  {
    id: "INT-2026-07-15-CREATENYC-NYC-ARTISTS-NYCARTC",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex source discovery",
    publicSafeDescription: "Official CreateNYC issue-area page describing NYC Artist Coalition's formation, recommendations, and dialogue about preserving safe artist-led spaces.",
    submittedUrl: "https://createnyc.cityofnewyork.us/the-cultural-plan/issue-areas/nyc-artsts/",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-department-cultural-affairs", "create-nyc", "nyc-artist-coalition"],
    dateHints: ["2017"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-CREATENYC-NYC-ARTISTS-NYCARTC-2017"],
    claimIds: ["CLM-DCLA-NYCARTC-RECIPROCAL-PUBLIC-ENGAGEMENT"],
    inquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"]
  }
] satisfies IntakeItem[];

export const nycArtcInstitutionalValueSources = [
  {
    id: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
    title: "Testimony on CreateNYC Cultural Plan - Next Steps",
    organization: "New York City Department of Cultural Affairs",
    author: "Tom Finkelpearl",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-27",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect6_Commissioner-Tom-Finkelpearl_Testimony.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "Tom Finkelpearl, DCLA testimony on CreateNYC before the New York City Council Committee on Cultural Affairs, February 27, 2017.",
    publicNote: "Finkelpearl described a DIY-community meeting, formal recommendations submitted to him, continued independent organizing, and DCLA's intention to keep learning from and working with that community.",
    locator: "Pages 3-4, paragraphs on Office Hours, DIY art spaces, formal recommendations, independent organizing, direct dialogue, and emerging public priorities.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-DCLA-FINKELPEARL-CREATENYC-TESTIMONY"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex official-record close reading"],
    supportsGenerally: [
      "DCLA hosted a well-attended DIY art-spaces meeting after the Ghost Ship fire",
      "members of the DIY community submitted formal recommendations to Commissioner Finkelpearl",
      "participants continued organizing independently after the meeting",
      "Finkelpearl said DCLA wanted to keep learning from and working with the community",
      "DCLA framed face-to-face public dialogue as a practice it wanted to continue"
    ],
    doesNotEstablish: [
      "NYC Artist Coalition by name in this February testimony",
      "Jamie's individual contribution",
      "Finkelpearl's private motive or personal dependence on the coalition",
      "DCLA adoption of every recommendation",
      "sole coalition causality for any later law, office, or policy"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
    title: "Fiscal 2018 Executive Budget Hearing Transcript - Cultural Affairs",
    organization: "New York City Council",
    author: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-05-19",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Fiscal 2018 Executive Budget hearing transcript for Cultural Affairs, May 19, 2017, pp. 89-93.",
    publicNote: "In budget testimony, Finkelpearl linked CreateNYC to reciprocal public relationships, expanded direct feedback, and common-cause convening, then named NYC Artist Coalition as an example formed after a DCLA DIY-community meeting.",
    locator: "Transcript pages 89-93, especially pages 92-93 on reciprocal public relationships, direct feedback, common-cause convening, and NYC Artist Coalition.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex official-record close reading"],
    supportsGenerally: [
      "Finkelpearl described CreateNYC as an opportunity to reimagine DCLA's work through a close reciprocal relationship with the public",
      "Finkelpearl said DCLA wanted to expand opportunities for direct public feedback",
      "Finkelpearl said DCLA had seen the power of bringing people together around a common cause",
      "Finkelpearl named NYC Artist Coalition as having formed after DCLA hosted a January DIY-arts-community meeting",
      "Finkelpearl linked Council participation in public engagement to a message that representatives were listening to residents' ideas and concerns"
    ],
    doesNotEstablish: [
      "Finkelpearl's private motive for selecting this example",
      "that DCLA or the Council could not act without NYC Artist Coalition",
      "Jamie's individual role in the example Finkelpearl described",
      "DCLA endorsement or adoption of every coalition position",
      "sole coalition causality for CreateNYC, Cabaret Law repeal, or the Office of Nightlife"
    ]
  },
  {
    id: "SRC-CREATENYC-FORWARD-NYCARTC-2017",
    title: "CreateNYC Foreword",
    organization: "New York City Department of Cultural Affairs",
    author: "Tom Finkelpearl",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://createnyc.cityofnewyork.us/the-cultural-plan/forward/",
    preferredPublicUrl: "canonical",
    publicCitation: "Tom Finkelpearl, CreateNYC foreword, New York City Department of Cultural Affairs.",
    publicNote: "The foreword says CreateNYC's direct-public-dialogue opportunities helped launch NYC Artist Coalition and presents continuing direct conversation as part of making the plan an active public reference point.",
    locator: "Section 'What now?', paragraphs on Office Hours, NYC Artist Coalition, direct conversation, and implementation with collaborators.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-CREATENYC-FORWARD-NYCARTC"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex official-record close reading"],
    supportsGenerally: [
      "CreateNYC Office Hours demonstrated public appetite for meaningful dialogue",
      "the process helped launch NYC Artist Coalition",
      "the City described the coalition as advocating for DIY spaces across New York City",
      "DCLA intended to continue direct public conversation during implementation"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "the complete coalition founding sequence or founder roster",
      "DCLA adoption of every coalition recommendation",
      "private reasons for highlighting the coalition",
      "causal credit for later legislation"
    ]
  },
  {
    id: "SRC-CREATENYC-NYC-ARTISTS-NYCARTC-2017",
    title: "CreateNYC Issue Area - NYC Artists",
    organization: "New York City Department of Cultural Affairs",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://createnyc.cityofnewyork.us/the-cultural-plan/issue-areas/nyc-artsts/",
    preferredPublicUrl: "canonical",
    publicCitation: "CreateNYC, 'NYC Artists,' New York City Department of Cultural Affairs.",
    publicNote: "The official plan says a DCLA DIY-spaces meeting spurred NYC Artist Coalition, which then organized, submitted recommendations, and drove dialogue about safe artist-led spaces.",
    locator: "NYC Artists issue-area section, paragraphs on safety and sustainability of artist-led community spaces after Ghost Ship.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-15-CREATENYC-NYC-ARTISTS-NYCARTC"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex official-record close reading"],
    supportsGenerally: [
      "DCLA's January 2017 DIY and alternative art-spaces meeting preceded the coalition's establishment",
      "NYC Artist Coalition organized and supplied recommendations concerning safe artist-led spaces",
      "the official plan credited the coalition with thoughtful dialogue about preserving artist-led spaces as sites of experimentation and community building"
    ],
    doesNotEstablish: [
      "Jamie's individual role or authorship",
      "representation of every artist, venue, or neighborhood",
      "DCLA adoption of every recommendation",
      "private motives of Finkelpearl, Council members, or coalition participants",
      "sole coalition causality for policy outcomes"
    ]
  }
] satisfies SourceRecord[];

export const nycArtcInstitutionalValueClaims = [
  {
    id: "CLM-FINKELPEARL-NYCARTC-COUNCIL-TESTIMONY-2017",
    project: "nyc-artist-coalition",
    claimType: "attributed-description",
    internalClaim: "In May 2017 Council budget testimony, Commissioner Tom Finkelpearl named NYC Artist Coalition after describing DCLA's desire for expanded direct public feedback, common-cause convening, and a close reciprocal relationship with the public.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{
      key: "archive-note",
      text: "In May 2017 Council testimony, DCLA Commissioner Tom Finkelpearl named NYC Artist Coalition while describing reciprocal public engagement, expanded direct feedback, and the power of common-cause convening.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
      relationship: "direct-support",
      supports: ["Finkelpearl's attributed institutional framing", "NYC Artist Coalition example", "Council testimony context"],
      locator: "Transcript pages 89-93, especially pages 92-93.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "This establishes Finkelpearl's public institutional framing, not his private motive or personal dependence on the coalition.",
      "The testimony names the coalition collectively and does not allocate Jamie's individual contribution."
    ],
    antiClaims: [
      "Finkelpearl said that he or DCLA needed NYC Artist Coalition in order to function.",
      "Finkelpearl endorsed or adopted every coalition recommendation."
    ],
    researchInquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex official-record close reading"]
  },
  {
    id: "CLM-DCLA-NYCARTC-RECIPROCAL-PUBLIC-ENGAGEMENT",
    project: "nyc-artist-coalition",
    claimType: "attributed-description",
    internalClaim: "Taken together, DCLA's public records support interpreting NYC Artist Coalition as an extension of reciprocal public engagement into informal, DIY, and artist-led spaces through independent organizing, venue-grounded recommendations, and continuing dialogue.",
    status: "inference",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
        relationship: "context",
        supports: ["formal DIY-community recommendations", "independent organizing", "DCLA learning and direct-dialogue framing"],
        locator: "Pages 3-4, Office Hours and DIY-community discussion.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
        relationship: "context",
        supports: ["reciprocal relationship", "expanded direct feedback", "common-cause convening", "named coalition example"],
        locator: "Transcript pages 89-93.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-FORWARD-NYCARTC-2017",
        relationship: "context",
        supports: ["direct-dialogue continuation", "coalition launch attribution", "DIY-space advocacy"],
        locator: "Section 'What now?'.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYC-ARTISTS-NYCARTC-2017",
        relationship: "context",
        supports: ["coalition recommendations", "safe artist-led spaces", "thoughtful dialogue attribution"],
        locator: "NYC Artists section on artist-led community spaces.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYCARTC-COMMUNITY-SPACES-2017",
        relationship: "context",
        supports: ["content and scope of coalition recommendations", "community-driven-space priorities"],
        locator: "Appendix pages 5-8.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is an institutional interpretation grounded in public records, not a verbatim DCLA statement that the agency needed the coalition.",
      "The records do not establish private motive, dependency, universal representation, or adoption of every recommendation."
    ],
    antiClaims: [
      "DCLA could not act without NYC Artist Coalition.",
      "NYC Artist Coalition represented every artist or cultural space.",
      "DCLA adopted all coalition recommendations."
    ],
    researchInquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex institutional evidence synthesis"]
  },
  {
    id: "CLM-NYC-COUNCIL-NYCARTC-CIVIC-VALUE",
    project: "nyc-artist-coalition",
    claimType: "attributed-description",
    internalClaim: "The record supports interpreting NYC Artist Coalition as civic translation infrastructure for the Council: it organized dispersed cultural-space experience into public testimony, policy recommendations, convenings with officials, and implementation feedback that could enter legislative and oversight processes.",
    status: "inference",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
        relationship: "context",
        supports: ["Council listening and public-engagement framing", "coalition as a common-cause organizing example"],
        locator: "Transcript pages 89-93.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017",
        relationship: "context",
        supports: ["coalition-affiliated public testimony", "venue-level account of Cabaret Law effects"],
        locator: "Article paragraphs on the Council hearing and Jamie's testimony.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
        relationship: "context",
        supports: ["coalition-affiliated testimony", "commercial-affordability and cultural-space implementation concerns"],
        locator: "Transcript pages 346-348.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
        relationship: "context",
        supports: ["coalition-convened dialogue among cultural organizations, Council members, and city officials"],
        locator: "Opening account of the October 2017 town hall.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This describes a supported civic function, not a claim that the Council depended on the coalition or accepted every position.",
      "Public testimony, turnout, and dialogue do not prove a specific causal share in legislation or agency action."
    ],
    antiClaims: [
      "The New York City Council could not act without NYC Artist Coalition.",
      "Coalition testimony caused the Council to enact every supported measure.",
      "The coalition spoke for every artist or venue in New York City."
    ],
    researchInquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex institutional evidence synthesis"]
  },
  {
    id: "CLM-ESPINAL-NYCARTC-SPONSORED-MEASURES",
    project: "nyc-artist-coalition",
    claimType: "chronology",
    internalClaim: "Official Council records identify Council Member Rafael Espinal as sponsor of the 2017 Office of Nightlife and Cabaret Law repeal measures.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017",
        relationship: "direct-support",
        supports: ["Espinal sponsorship", "Office of Nightlife legislative chronology"],
        locator: "Council press-release section on Introduction 1688-A.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-VOTE-2017",
        relationship: "direct-support",
        supports: ["Espinal sponsorship", "Cabaret Law repeal legislative chronology"],
        locator: "Council press-release section on Introduction 1652-A.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Sponsorship establishes Espinal's formal legislative role, not coalition authorship, private motive, responsiveness, or causal allocation."],
    antiClaims: ["NYC Artist Coalition wrote Espinal's bills or controlled the legislative process."],
    researchInquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex official-record close reading"]
  },
  {
    id: "CLM-ESPINAL-NYCARTC-TOWN-HALL-PARTICIPATION",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "Contemporaneous reporting identified Council Member Rafael Espinal among the officials participating in NYC Artist Coalition's October 11, 2017 Market Hotel town hall about the Office of Nightlife.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [],
    evidence: [{
      sourceId: "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
      relationship: "direct-support",
      supports: ["Espinal participation", "coalition-convened town hall", "Office of Nightlife context"],
      locator: "Opening account of the October 2017 town hall and participant description.",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["One documented appearance does not establish a recurring relationship, responsiveness, endorsement, recommendation adoption, or an accountability arrangement."],
    antiClaims: ["Espinal's town-hall participation proves coalition endorsement, cultural-sector legitimacy, or agreement with every position expressed."],
    researchInquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex contemporaneous-report close reading"]
  },
  {
    id: "CLM-ESPINAL-NYCARTC-RELATIONAL-VALUE",
    project: "nyc-artist-coalition",
    claimType: "attributed-description",
    internalClaim: "Separate sponsorship, testimony, and town-hall records support a limited interpretation: NYC Artist Coalition created a public forum and supplied cultural-space feedback in policy areas connected to measures Rafael Espinal sponsored, while formal legislative action remained with Espinal and the Council.",
    status: "inference",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017",
        relationship: "context",
        supports: ["Espinal sponsorship", "Office of Nightlife legislative context"],
        locator: "Council press-release section on Introduction 1688-A.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-VOTE-2017",
        relationship: "context",
        supports: ["Espinal sponsorship", "Cabaret Law repeal legislative context"],
        locator: "Council press-release section on Introduction 1652-A.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
        relationship: "context",
        supports: ["Espinal participation in a coalition-convened public forum", "dialogue with cultural-space stakeholders"],
        locator: "Opening account of the October 2017 town hall.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017",
        relationship: "context",
        supports: ["coalition-affiliated public testimony on Espinal-sponsored repeal legislation"],
        locator: "Article paragraphs on the Cabaret Law hearing.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "This limited interpretation does not establish a recurring Espinal-coalition relationship, responsiveness, a public-accountability arrangement, endorsement, cultural-sector legitimacy, private motive, personal dependence, or agreement with every coalition position.",
      "The records do not allocate causal shares among Espinal, coalition participants, partner organizations, other Council members, or the administration."
    ],
    antiClaims: [
      "Espinal needed NYC Artist Coalition in order to legislate.",
      "NYC Artist Coalition wrote Espinal's bills or solely caused their passage.",
      "Espinal adopted every coalition recommendation.",
      "One documented town hall establishes a recurring relationship, responsiveness, endorsement, or cultural-sector legitimacy."
    ],
    researchInquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex institutional evidence synthesis"]
  },
  {
    id: "CLM-JAMIE-NYCARTC-INSTITUTIONAL-BRIDGE-VALUE",
    project: "nyc-artist-coalition",
    claimType: "role",
    internalClaim: "Within the coalition's collective work, Jamie's documented organizer, practical safety, recurring participation, public testimony, and civic-systems contributions helped build the translation capacity through which cultural-space experience could reach agencies, legislators, and public audiences.",
    status: "inference",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NYCARTC-BNB-DIY-SPACES-2017",
        relationship: "context",
        supports: ["Jamie's early organizer attribution", "coalition meeting and recommendation context"],
        locator: "Paragraphs describing the February 2017 meeting and Jamie's organizer role.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
        relationship: "context",
        supports: ["Jamie's fire-code study groups", "coalition affiliation", "public repeal advocacy"],
        locator: "Paragraphs on fire-code study groups and City Hall advocacy.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017",
        relationship: "context",
        supports: ["Jamie's coalition-affiliated Council testimony"],
        locator: "Article paragraphs on Jamie's hearing statement.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
        relationship: "private-support",
        supports: ["Jamie's bounded first-person account of helping establish and produce the recurring participation system"],
        locator: "Public-safe first-person summary; underlying account withheld.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-NYCARTC-EVENTS-CORPUS-2026",
        relationship: "context",
        supports: ["recurring public event and participation system", "meetings, hearings, campaign action, and practical support paths"],
        locator: "Complete displayed event control and close-read event records.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The evidence establishes component contributions and supports an inference about their institutional value; it does not make Jamie the sole designer, producer, translator, or representative.",
      "Collective outcomes, policy adoption, and other participants' work remain collectively credited."
    ],
    antiClaims: [
      "Jamie alone created NYC Artist Coalition's civic capacity.",
      "Jamie personally represented every artist or venue to DCLA and the Council.",
      "Jamie's work solely caused the Office of Nightlife, Cabaret Law repeal, or later legislation."
    ],
    researchInquiryIds: ["INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex institutional evidence synthesis"]
  }
] satisfies ClaimRecord[];

export const nycArtcInstitutionalValueResearchInquiries = [
  {
    id: "INQ-NYCARTC-INSTITUTIONAL-RELATIONAL-VALUE",
    project: "nyc-artist-coalition",
    intakeIds: [
      "INT-2026-07-15-DCLA-FINKELPEARL-CREATENYC-TESTIMONY",
      "INT-2026-07-15-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT",
      "INT-2026-07-15-CREATENYC-FORWARD-NYCARTC",
      "INT-2026-07-15-CREATENYC-NYC-ARTISTS-NYCARTC",
      "INT-2026-07-13-NYC-COUNCIL-NIGHTLIFE",
      "INT-2026-07-13-NYC-COUNCIL-CABARET-VOTE",
      "INT-2026-07-13-MIXMAG-CABARET-HEARING",
      "INT-2026-07-13-COUNCIL-SBJSA-TRANSCRIPT",
      "INT-2026-07-13-BNB-NIGHT-MAYOR-TOWN-HALL",
      "INT-2026-07-14-FB-NYCARTC-EVENT-POPULATION"
    ],
    question: "What can the public record establish about the value NYC Artist Coalition and Jamie's contributions provided to DCLA, the City Council, and Council Member Rafael Espinal without inventing private motives, dependency, or sole causality?",
    methods: [
      "Closely read Finkelpearl's February 2017 DCLA testimony and the official May 2017 Council budget-hearing transcript in sequence.",
      "Compared those statements with CreateNYC's foreword, NYC Artists issue-area account, and City-hosted coalition recommendations.",
      "Triangulated Council sponsorship records, coalition-affiliated testimony, independent town-hall reporting, and the recurring public event control.",
      "Separated documented statements and events from institutional interpretation, individual contribution, private motive, necessity, representation, adoption, and causal attribution."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Finkelpearl publicly framed CreateNYC as reciprocal engagement, expanded direct feedback, and common-cause convening, then named NYC Artist Coalition as an example formed after a DCLA DIY-community meeting.",
      "Official CreateNYC records say the coalition organized, submitted recommendations, and drove dialogue about preserving safe artist-led spaces.",
      "Council and independent records show coalition-affiliated testimony, coalition forums with Council and agency participants, and issue-specific feedback around legislation and implementation.",
      "Official Council records identify Espinal as sponsor of the Office of Nightlife and Cabaret Law repeal measures; independent reporting separately places him in one coalition-convened town hall.",
      "Public reporting and a bounded first-person record support Jamie's organizer, practical safety, testimony, and recurring-participation contributions, while collective credit remains essential."
    ],
    limitations: [
      "No reviewed source establishes Finkelpearl's, the Council's, or Espinal's private motives or personal dependence on the coalition.",
      "Espinal's sponsorship and one documented town-hall appearance do not establish a recurring relationship, responsiveness, an accountability arrangement, endorsement, or cultural-sector legitimacy.",
      "The records do not show that NYC Artist Coalition represented every artist, venue, or neighborhood.",
      "The official references to the coalition do not allocate Jamie's individual share of every activity or outcome.",
      "The sequence does not establish sole coalition or individual causality for CreateNYC, the Office of Nightlife, Cabaret Law repeal, or later legislation.",
      "A fuller account would benefit from contemporaneous correspondence, collaborator testimony, and direct recollections from Finkelpearl, Espinal, and Council or DCLA staff."
    ],
    sourceIds: [
      "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
      "SRC-NYC-COUNCIL-DCLA-BUDGET-TRANSCRIPT-2017",
      "SRC-CREATENYC-FORWARD-NYCARTC-2017",
      "SRC-CREATENYC-NYC-ARTISTS-NYCARTC-2017",
      "SRC-CREATENYC-NYCARTC-COMMUNITY-SPACES-2017",
      "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017",
      "SRC-NYC-COUNCIL-CABARET-VOTE-2017",
      "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017",
      "SRC-NYCARTC-MIXMAG-CABARET-HEARING-2017",
      "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
      "SRC-NYCARTC-BNB-DIY-SPACES-2017",
      "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
      "SRC-NYCARTC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      "SRC-FB-NYCARTC-EVENTS-CORPUS-2026"
    ],
    publicSummary: "Official records support a bounded institutional interpretation: NYC Artist Coalition extended reciprocal engagement with informal cultural spaces and brought organized recommendations, testimony, and public dialogue into agency and Council processes; the records do not establish private motives, dependency, universal representation, or sole causality."
  }
] satisfies ResearchInquiry[];
