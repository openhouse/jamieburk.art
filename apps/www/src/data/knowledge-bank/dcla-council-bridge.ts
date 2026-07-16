import type { ClaimRecord, ResearchInquiry, SourceRecord } from "./schema.ts";

const reviewedAt = "2026-07-16";

export const dclaCouncilBridgeSourceIds = {
  finkelpearlNextSteps: "SRC-NYCAC-COUNCIL-FINKELPEARL-NEXT-STEPS-2017",
  finkelpearlBudget: "SRC-NYCAC-COUNCIL-FINKELPEARL-BUDGET-2017",
  finkelpearlCulturalPlan: "SRC-NYCAC-COUNCIL-FINKELPEARL-CULTURAL-PLAN-2017",
  createNycArtists: "SRC-NYCAC-CREATENYC-NYC-ARTISTS-2017",
  espinalStatedMeeting: "SRC-NYCAC-COUNCIL-ESPINAL-STATED-MEETING-2017",
  cabaretHearing: "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14",
  cabaretLegislation: "SRC-NYCAC-COUNCIL-INT-1652-LEGISLATION-2017"
} as const;

export const dclaCouncilBridgeSources: SourceRecord[] = [
  {
    id: dclaCouncilBridgeSourceIds.finkelpearlNextSteps,
    title: "Cultural Plan - Next Steps hearing transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-27",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex official-record review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex official-record review",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?M=F&ID=5010771&GUID=AF871425-F776-4CD2-89EC-201202A95D97",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Cultural Plan - Next Steps hearing transcript, February 27, 2017.",
    publicNote:
      "Finkelpearl described DIY-community members submitting formal recommendations to him, continuing to organize independently, and creating an ongoing relationship DCLA wanted to sustain.",
    supportsGenerally: [
      "the DIY community submitted formal recommendations to Finkelpearl",
      "the group continued to organize independently",
      "DCLA saw Office Hours as a platform for listening and continued conversation"
    ],
    doesNotEstablish: [
      "that Finkelpearl used the formal NYC Artist Coalition name in this hearing",
      "that DCLA created or controlled the coalition",
      "Jamie's individual role in every recommendation",
      "policy causality"
    ]
  },
  {
    id: dclaCouncilBridgeSourceIds.finkelpearlBudget,
    title: "Fiscal 2018 Executive Budget hearing transcript for Cultural Affairs",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-05-19",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex official-record review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex official-record review",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=68A2E207-53EA-43CA-A03E-F879A113464E&ID=5271559&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Fiscal 2018 Executive Budget hearing transcript for Cultural Affairs, May 19, 2017.",
    publicNote:
      "In sworn budget testimony, Finkelpearl named NYC Artist Coalition, said it formed after DCLA's January DIY arts meeting, and used it as an example of reciprocal public engagement beyond the department's regular nonprofit grantee constituency.",
    supportsGenerally: [
      "Finkelpearl's exact named reference to NYC Artist Coalition",
      "the coalition's formation after DCLA's January DIY arts meeting",
      "DCLA's reciprocal-public-relationship framing",
      "the coalition as evidence that public convening could support independent civic capacity"
    ],
    doesNotEstablish: [
      "that DCLA created or controlled NYC Artist Coalition",
      "that every coalition participant shared DCLA's interpretation",
      "Jamie's sole responsibility for coalition formation",
      "a policy outcome caused by the meeting"
    ]
  },
  {
    id: dclaCouncilBridgeSourceIds.finkelpearlCulturalPlan,
    title: "Comprehensive Cultural Plan hearing transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-20",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex official-record review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex official-record review",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?M=F&ID=5479046&GUID=E9387EDE-DCBA-455B-B3A0-71F30D23DF3E",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Comprehensive Cultural Plan hearing transcript, September 20, 2017.",
    publicNote:
      "Finkelpearl described DIY arts spaces as a group that had formed around the plan, said the process activated groups and let DCLA listen, and connected public recommendations to Cabaret Law review and an Office of Nightlife. Coalition testimony later in the same hearing named NYC Artist Coalition and described its recommendations as included in the plan.",
    supportsGenerally: [
      "Finkelpearl's group-activation and listening account",
      "public recommendations concerning the Cabaret Law and an Office of Nightlife",
      "coalition testimony connecting its formation and recommendations to CreateNYC",
      "Chair Van Bramer's acknowledgement of a scheduled coalition meeting"
    ],
    doesNotEstablish: [
      "that Finkelpearl used the coalition's formal name in his relevant statement",
      "that the coalition alone generated either policy proposal",
      "that DCLA or the Council adopted every recommendation",
      "Jamie's individual authorship of the testimony"
    ]
  },
  {
    id: dclaCouncilBridgeSourceIds.createNycArtists,
    title: "CreateNYC: NYC Artists",
    organization: "New York City Department of Cultural Affairs",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-07-19",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex official-page review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex official-page review",
    canonicalUrl:
      "https://createnyc.cityofnewyork.us/the-cultural-plan/issue-areas/nyc-artsts/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Department of Cultural Affairs, CreateNYC, 'NYC Artists,' 2017.",
    publicNote:
      "DCLA's official cultural-plan page says the January DIY and alternative-art-spaces meeting spurred NYC Artist Coalition's establishment and credits the coalition with organizing recommendations and driving dialogue about preserving artist-led spaces.",
    supportsGenerally: [
      "DCLA's exact institutional identification of NYC Artist Coalition",
      "the January 2017 meeting as a precursor to coalition establishment",
      "coalition recommendations on safe artist-led spaces",
      "coalition dialogue about artist-led spaces as experimentation and community infrastructure"
    ],
    doesNotEstablish: [
      "that DCLA founded or directed the coalition",
      "a complete founding roster",
      "Jamie's sole authorship or leadership",
      "causal allocation for later legislation"
    ]
  },
  {
    id: dclaCouncilBridgeSourceIds.espinalStatedMeeting,
    title: "New York City Council stated meeting transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-21",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex official-record review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex official-record review",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?GUID=85421758-71D8-4ED5-9D27-C7B5126089FD&ID=5330214&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council stated meeting transcript, remarks of Council Member Rafael Espinal on Intro 1652, June 21, 2017.",
    publicNote:
      "Espinal credited Dance Liberation Network and NYC Artist Coalition for on-the-ground work bringing attention to the Cabaret Law repeal bill, then urged colleagues to sign on.",
    supportsGenerally: [
      "Espinal's direct public credit to NYC Artist Coalition",
      "the coalition's on-the-ground work bringing attention to Intro 1652",
      "Espinal's request that colleagues sign onto the repeal bill"
    ],
    doesNotEstablish: [
      "that NYC Artist Coalition was the only advocacy group",
      "that Jamie personally performed every credited action",
      "that advocacy alone determined Council sponsorship or passage",
      "sole causation of repeal"
    ]
  },
  {
    id: dclaCouncilBridgeSourceIds.cabaretHearing,
    title: "Consumer Affairs hearing transcript on Intro 1652",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-14",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex official-record review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex official-record review",
    canonicalUrl:
      "https://legistar.council.nyc.gov/View.ashx?M=F&ID=5444684&GUID=6DBE5276-1842-4693-843F-18667D2D6EBC",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council Consumer Affairs hearing transcript on Intro 1652, September 14, 2017.",
    publicNote:
      "The official transcript records Olympia Kazi and Jamie Burkart as NYC Artist Coalition witnesses, includes the coalition's repeal testimony, and later calls another coalition participant. The transcript renders Jamie's surname as Burkhart.",
    supportsGenerally: [
      "formal NYC Artist Coalition participation in the Council hearing",
      "Jamie's testimony as a coalition member",
      "coalition safety, equity, and repeal framing",
      "multiple coalition voices in the hearing record"
    ],
    doesNotEstablish: [
      "Jamie's authorship of every coalition statement",
      "a complete coalition roster",
      "that every witness shared every position",
      "sole causation of repeal"
    ]
  },
  {
    id: dclaCouncilBridgeSourceIds.cabaretLegislation,
    title: "Intro 1652-2017 legislative record",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-21",
    accessedAt: reviewedAt,
    metadataVerifiedAt: reviewedAt,
    metadataVerifiedBy: "Codex official-record review",
    reviewStatus: "close-read",
    contentReviewedAt: reviewedAt,
    contentReviewedBy: "Codex official-record review",
    canonicalUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=3086319&GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council legislative record for Intro 1652-2017, enacted as Local Law 214 of 2017.",
    publicNote:
      "The official record identifies Rafael Espinal as prime sponsor, lists 25 Council sponsors, and records enactment as Local Law 214 on November 27, 2017.",
    supportsGenerally: [
      "Rafael Espinal as prime sponsor",
      "25 Council sponsors",
      "passage and enactment as Local Law 214 of 2017"
    ],
    doesNotEstablish: [
      "why each Council Member sponsored or voted for the bill",
      "the coalition's precise causal share",
      "Jamie's individual causal contribution",
      "that advocacy was the only input into the legislative process"
    ]
  }
];

export const dclaCouncilBridgeClaims: ClaimRecord[] = [
  {
    id: "CLM-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "In 2017, NYC Artist Coalition's independent organizing, recommendations, public testimony, and recurring participation practices gave emerging cultural-space concerns a usable path into DCLA dialogue and Council deliberation. Finkelpearl used the coalition as evidence that DCLA's public process could extend reciprocal engagement beyond its regular grantee relationships; Espinal credited the coalition's on-the-ground work with bringing attention to Intro 1652 while seeking Council sponsors. Jamie helped build and steward this operating layer with collaborators.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "NYC Artist Coalition's recurring participation system gave emerging cultural-space concerns a usable path into formal recommendations, agency dialogue, Council testimony, and legislative follow-through. Jamie helped build and steward that operating layer alongside collaborators.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: dclaCouncilBridgeSourceIds.finkelpearlBudget,
        relationship: "direct-support",
        supports: [
          "Finkelpearl's exact named coalition reference",
          "DCLA's reciprocal-public-engagement framing",
          "coalition formation after the January DIY meeting"
        ],
        locator: "Transcript pages 91-93",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: dclaCouncilBridgeSourceIds.finkelpearlNextSteps,
        relationship: "direct-support",
        supports: [
          "formal recommendations submitted to Finkelpearl",
          "continued independent organizing",
          "DCLA's desire for an ongoing working relationship"
        ],
        locator: "Transcript pages 17-18",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: dclaCouncilBridgeSourceIds.createNycArtists,
        relationship: "corroborating",
        supports: [
          "DCLA's formal identification of the coalition",
          "the meeting-to-coalition sequence",
          "recommendations and sustained dialogue"
        ],
        locator: "NYC Artists section, artist-led community spaces paragraphs",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: dclaCouncilBridgeSourceIds.finkelpearlCulturalPlan,
        relationship: "corroborating",
        supports: [
          "group activation around the plan",
          "DCLA's listening account",
          "recommendations on nightlife and Cabaret Law policy"
        ],
        locator: "Transcript pages 14-15, 29-30, and 122-124",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: dclaCouncilBridgeSourceIds.espinalStatedMeeting,
        relationship: "direct-support",
        supports: [
          "Espinal's public credit to the coalition",
          "on-the-ground work bringing attention to Intro 1652",
          "his request for Council sponsors"
        ],
        locator: "Transcript pages 119-121",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: dclaCouncilBridgeSourceIds.cabaretHearing,
        relationship: "direct-support",
        supports: [
          "formal coalition participation in Council testimony",
          "Jamie's testimony as a coalition member",
          "multiple coalition voices"
        ],
        locator: "Appearance list and testimony pages 34-35, 71-72, and 104-105",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: dclaCouncilBridgeSourceIds.cabaretLegislation,
        relationship: "context",
        supports: [
          "Espinal's prime sponsorship",
          "the bill's 25 Council sponsors",
          "enactment as Local Law 214 of 2017"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The institutional-value analysis is an evidence-based interpretation of public statements and process records, not a quotation of private motive.",
      "Finkelpearl used the exact NYC Artist Coalition name in the May 19 budget hearing; in the February 27 and September 20 hearings he described the DIY group and its work without using the formal name in the relevant passages.",
      "DCLA's official CreateNYC page links those descriptions to NYC Artist Coalition but does not establish agency ownership or control of the coalition.",
      "Espinal's credit establishes legislative usefulness and visibility, not sole causation of sponsorship, passage, or repeal.",
      "Jamie's role is helped build and steward alongside collaborators; preserve coalition, movement, venue, witness, agency, and Council credit."
    ],
    antiClaims: [
      "Finkelpearl named NYC Artist Coalition in every relevant hearing",
      "DCLA created or controlled NYC Artist Coalition",
      "The Council needed Jamie personally",
      "Espinal could not have advanced Intro 1652 without Jamie",
      "Jamie or NYC Artist Coalition alone caused Cabaret Law repeal",
      "Jamie authored every coalition recommendation, event, or testimony"
    ],
    researchInquiryIds: ["INQ-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex official-record review"]
  }
];

export const dclaCouncilBridgeResearchInquiries: ResearchInquiry[] = [
  {
    id: "INQ-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017",
    project: "nyc-artist-coalition",
    question:
      "Where did Tom Finkelpearl refer to NYC Artist Coalition in Council testimony, and what do official records support about the coalition's value to DCLA, the Council, and Rafael Espinal?",
    methods: [
      "Searched official Council transcript indexes for exact coalition-name variants with Finkelpearl",
      "Close-read the February 27, May 19, September 14, and September 20, 2017 Council hearing transcripts",
      "Close-read the June 21, 2017 stated-meeting transcript and Intro 1652 legislative record",
      "Compared Finkelpearl's exact named reference with his functional descriptions of recommendations, independent organizing, group activation, and listening",
      "Separated direct institutional statements from evidence-based interpretation of institutional value"
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "The May 19 Executive Budget hearing contains an exact named Finkelpearl reference: he presented NYC Artist Coalition's formation after the January DIY meeting as evidence of reciprocal public engagement.",
      "The February 27 hearing records formal recommendations, continued independent organizing, and Finkelpearl's desire to keep working with the group without using the coalition's formal name in that passage.",
      "The September 20 hearing records Finkelpearl describing DIY arts spaces as a group activated around the plan and DCLA's process as an opportunity to listen; coalition testimony later in the hearing supplied the formal name and described recommendations entering the plan.",
      "DCLA's official CreateNYC page explicitly says the January meeting spurred NYC Artist Coalition's establishment and credits the coalition with recommendations and sustained dialogue.",
      "Espinal directly credited NYC Artist Coalition's on-the-ground work with bringing attention to Intro 1652 while urging Council colleagues to sign on.",
      "The September 14 hearing records Jamie and other coalition participants giving formal testimony; the legislative record identifies Espinal as prime sponsor, 25 Council sponsors, and enactment as Local Law 214."
    ],
    limitations: [
      "The audit combines exact-name transcript search with close reading of the directly implicated 2017 hearing set; it is not a claim that every Council document in existence was machine-audited.",
      "The sources establish institutional statements, public participation, and legislative sequence; they do not reveal private motives or measure causal contribution.",
      "The official records do not allocate every coalition recommendation, event, or testimony to Jamie.",
      "The exact formal name varies across records, and the September 14 transcript misspells Jamie's surname as Burkhart."
    ],
    sourceIds: Object.values(dclaCouncilBridgeSourceIds),
    publicSummary:
      "Official DCLA and Council records support a bounded account of NYC Artist Coalition as an independent bridge from emerging cultural-space concerns to agency listening, formal recommendations, public testimony, and legislative attention. Jamie helped build and steward that operating layer with collaborators."
  }
];
