import type {
  ClaimRecord,
  IntakeRecord,
  KnowledgeBank,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type NycaInstitutionalValueBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

const intakeRecords = [
  {
    id: "INTAKE-2026-07-15-NYCA-INSTITUTIONAL-RECIPROCITY",
    receivedAt: "2026-07-15",
    kind: "claim-proposal",
    project: "nyc-artist-coalition",
    publicSummary:
      "Official DCLA and Council records support a bounded account of NYC Artist Coalition's institutional value: the coalition translated DIY-space experience into formal recommendations, public participation, testimony, and continuing dialogue while government partners supplied planning, hearing, legislative, and administrative pathways.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017-02-27",
      "SRC-CREATENYC-NYCA-CIVIC-DIALOGUE-2017",
      "SRC-CREATENYC-NYCA-FORWARD-2017",
      "SRC-CREATENYC-NYCA-RECOMMENDATIONS-APPENDIX-2017",
      "SRC-NYC-COUNCIL-INT-1652-2017",
      "SRC-NYC-COUNCIL-INT-1688-2017"
    ],
    claimIds: [
      "CLM-NYCA-DCLA-ENGAGEMENT-OUTCOME-2017",
      "CLM-NYCA-CIVIC-INTERMEDIARY-VALUE",
      "CLM-NYCA-COUNCIL-RECIPROCAL-CAPACITY"
    ],
    researchInquiryIds: ["INQ-NYCA-INSTITUTIONAL-RECIPROCITY-2026-07-15"],
    projectionIntent: "bank-only",
    nextActions: [
      "Use the official records to describe complementary institutional capacities, not to invent private motives or claim that an official literally depended on the coalition.",
      "Keep the February testimony's unnamed DIY-community account distinct from later CreateNYC pages that explicitly identify NYC Artist Coalition.",
      "Seek direct public statements from Rafael Espinal or collaborators before making any stronger claim about why he personally valued the relationship or how responsibilities were divided."
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-record review"]
  }
] satisfies IntakeRecord[];

const sources = [
  {
    id: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017-02-27",
    title: "Commissioner Tom Finkelpearl testimony on CreateNYC cultural-plan next steps",
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
      "Tom Finkelpearl, testimony on CreateNYC cultural-plan next steps, New York City Council Committee on Cultural Affairs, February 27, 2017.",
    publicNote:
      "Finkelpearl used the DIY-space Office Hours as an example of a helpful engagement process that produced formal recommendations, continued independent organizing, and a platform DCLA wanted to continue.",
    supportsGenerally: [
      "DCLA's statement that stakeholder feedback lent deep expertise to the CreateNYC planning process",
      "the DIY community's preparation of formal recommendations for Finkelpearl",
      "continued independent organizing after the Office Hours dialogue",
      "Finkelpearl's stated intention to keep learning from and working with the DIY community",
      "growth across the latest Office Hours from an anticipated roundtable of about 20 to approximately 100 participants",
      "DCLA's interest in continuing direct public conversations after the cultural plan"
    ],
    doesNotEstablish: [
      "the February testimony does not name NYC Artist Coalition",
      "that every attendance figure refers to the DIY-space meeting",
      "that Finkelpearl or DCLA literally needed or depended on the coalition",
      "Jamie's individual role in preparing the recommendations or organizing the meeting",
      "DCLA adoption of every recommendation",
      "coalition causality for later legislation or administrative action"
    ]
  },
  {
    id: "SRC-CREATENYC-NYCA-CIVIC-DIALOGUE-2017",
    title: "CreateNYC: NYC Artists",
    organization: "New York City Department of Cultural Affairs",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://createnyc.cityofnewyork.us/the-cultural-plan/issue-areas/nyc-artsts/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Department of Cultural Affairs, 'NYC Artists,' CreateNYC cultural plan, 2017.",
    publicNote:
      "The official plan says DCLA's January 2017 DIY-space Office Hours spurred NYC Artist Coalition's establishment and that the coalition organized, provided recommendations, and drove dialogue about preserving artist-led spaces.",
    supportsGenerally: [
      "DCLA's January 2017 Office Hours on DIY and alternative art spaces",
      "the official plan's statement that the meeting spurred the establishment of NYC Artist Coalition",
      "NYC Artist Coalition's subsequent organizing and recommendations for safe artist-led spaces",
      "the official plan's statement that NYC Artist Coalition and other stakeholders drove a thoughtful dialogue about preserving artist-led spaces"
    ],
    doesNotEstablish: [
      "a complete founder or responsibility map",
      "Jamie's individual authorship or leadership",
      "DCLA commissioning or control of NYC Artist Coalition",
      "formal endorsement or adoption of every coalition recommendation",
      "sole coalition causality for policy outcomes"
    ]
  },
  {
    id: "SRC-CREATENYC-NYCA-FORWARD-2017",
    title: "CreateNYC cultural plan forward",
    organization: "New York City Department of Cultural Affairs",
    author: "Tom Finkelpearl",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://createnyc.cityofnewyork.us/the-cultural-plan/forward/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Tom Finkelpearl, forward to the CreateNYC cultural plan, 2017.",
    publicNote:
      "The forward says Office Hours revealed demand for meaningful civic dialogue, helped launch NYC Artist Coalition, and informed DCLA's decision to continue direct opportunities for residents to speak with the agency.",
    supportsGenerally: [
      "DCLA's assessment that Office Hours demonstrated strong public interest in meaningful cultural-policy dialogue",
      "the official statement that Office Hours helped launch NYC Artist Coalition",
      "DCLA's intention to continue direct resident dialogue so the cultural plan could remain responsive to what New Yorkers wanted from government"
    ],
    doesNotEstablish: [
      "that NYC Artist Coalition was the only coalition or public-engagement outcome",
      "that DCLA created, commissioned, governed, or endorsed every action of NYC Artist Coalition",
      "Jamie's individual role",
      "implementation of every coalition recommendation"
    ]
  },
  {
    id: "SRC-CREATENYC-NYCA-RECOMMENDATIONS-APPENDIX-2017",
    title: "NYC Artist Coalition recommendations for community-driven spaces",
    organization: "NYC Artist Coalition; included in the CreateNYC appendix",
    author: "NYC Artist Coalition",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-06",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition, recommendations for community-driven spaces, included in the CreateNYC appendix, March 6, 2017.",
    publicNote:
      "The appendix preserves the coalition's collective translation of DIY-space experience into recommendations on criminalization, administrative and financial support, and affordability.",
    supportsGenerally: [
      "the coalition's collective development of recommendations after meeting with Finkelpearl",
      "the framing of informal community-driven spaces as part of New York City's cultural and democratic life",
      "recommendations concerning Cabaret Law repeal, MARCH transparency, permits, cultural liaisons, urgent repairs, and affordability",
      "the coalition's request for continued dialogue and a roadmap toward shared goals",
      "a March 30, 2017 town hall listing that named DCLA and Council Members Rafael Espinal and Antonio Reynoso"
    ],
    doesNotEstablish: [
      "individual authorship of the collective recommendations",
      "a complete attendance or organizer roster",
      "DCLA or Council adoption of every recommendation",
      "official legal analysis",
      "sole coalition causality for later laws or administrative changes"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-INT-1652-2017",
    title: "Int. 1652-2017: repeal of public dance hall and cabaret licensing requirements",
    organization: "New York City Council",
    author: "Rafael L. Espinal Jr. and co-sponsors",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-21",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?FullText=1&GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE&ID=3086319",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Int. 1652-2017, introduced by Rafael L. Espinal Jr., June 21, 2017.",
    publicNote:
      "The official record identifies Espinal as prime sponsor and documents the Council's legislative vehicle for repealing cabaret and public-dance-hall licensing requirements while retaining specified safety measures.",
    supportsGenerally: [
      "Rafael Espinal's prime sponsorship of Int. 1652-2017",
      "the Council's formal legislative pathway for Cabaret Law repeal",
      "the bill's combination of licensing repeal with retained security requirements"
    ],
    doesNotEstablish: [
      "why Espinal personally chose the issue",
      "that NYC Artist Coalition drafted the legislation",
      "that coalition advocacy was the sole cause of sponsorship, passage, or enactment",
      "that Espinal or the Council endorsed every coalition position"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-INT-1688-2017",
    title: "Int. 1688-2017: Office of Nightlife and Nightlife Advisory Board",
    organization: "New York City Council",
    author: "Rafael L. Espinal Jr. and co-sponsors",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-08-24",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=E6CEAE78-6D18-4C8F-8124-D9445FEF838F&ID=3131400&Options=ID%257CText%257C",
    preferredPublicUrl: "canonical",
    publicCitation:
      "New York City Council, Int. 1688-2017, introduced by Rafael L. Espinal Jr., enacted September 19, 2017.",
    publicNote:
      "The official record identifies Espinal as prime sponsor and defines the Office of Nightlife as a liaison and intermediary across nightlife establishments, residents, agencies, and enforcement systems.",
    supportsGenerally: [
      "Rafael Espinal's prime sponsorship of Int. 1688-2017",
      "the establishment of an Office of Nightlife and Nightlife Advisory Board",
      "the Office's mandated outreach, navigation, complaint-review, liaison, and policy-recommendation functions",
      "the Office's statutory role as an intermediary among agencies, residents, and nightlife establishments"
    ],
    doesNotEstablish: [
      "that NYC Artist Coalition created the Office of Nightlife",
      "that coalition recommendations were copied into the enacted text",
      "why Espinal personally sponsored the bill",
      "Jamie's individual role in the bill",
      "sole coalition causality for enactment or implementation"
    ]
  }
] satisfies SourceRecord[];

const claims = [
  {
    id: "CLM-NYCA-DCLA-ENGAGEMENT-OUTCOME-2017",
    project: "nyc-artist-coalition",
    internalClaim:
      "In February 2017, DCLA Commissioner Tom Finkelpearl presented the DIY-space Office Hours to the Council as an example of a helpful CreateNYC engagement process: community members prepared formal recommendations, continued organizing independently, and helped demonstrate demand for continued direct dialogue. Later official CreateNYC materials explicitly connected that process to NYC Artist Coalition and credited the coalition with organizing, providing recommendations, and driving thoughtful dialogue.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "DCLA's official record treated the DIY-space engagement as a substantive CreateNYC outcome: it produced formal recommendations, continued independent organizing, and an ongoing dialogue that later CreateNYC materials explicitly connected to NYC Artist Coalition.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017-02-27",
        relationship: "direct-support",
        locator: "Pages 2-3, testimony on formal DIY recommendations, independent organizing, Office Hours growth, and continuing dialogue.",
        supports: [
          "Finkelpearl's presentation of the DIY engagement as evidence that the planning process was helpful",
          "formal recommendations, continued independent organizing, and DCLA's intention to keep listening"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYCA-CIVIC-DIALOGUE-2017",
        relationship: "direct-support",
        supports: [
          "the explicit official connection between the January DIY Office Hours and NYC Artist Coalition",
          "the coalition's organizing, recommendations, and dialogue role"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYCA-FORWARD-2017",
        relationship: "corroborating",
        supports: [
          "DCLA's assessment of Office Hours as an important public-engagement form",
          "the coalition-launch connection and intention to continue resident dialogue"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYCA-RECOMMENDATIONS-APPENDIX-2017",
        relationship: "direct-support",
        supports: [
          "the formal recommendation artifact and its policy categories",
          "the coalition's request for continuing partnership and a shared-goals roadmap"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Finkelpearl's February testimony describes members of the DIY community but does not name NYC Artist Coalition; the identification comes from later official CreateNYC materials.",
      "The attendance growth from an anticipated 20 to about 100 describes the latest Office Hours generally, not a verified count for the DIY meeting alone.",
      "Describe institutional value and observable outcomes, not an unrecorded private motive or literal dependency.",
      "Keep Jamie's individual role separate from the coalition-level record."
    ],
    antiClaims: [
      "Finkelpearl testified that he needed NYC Artist Coalition",
      "Finkelpearl named NYC Artist Coalition in his February testimony",
      "One hundred people attended the DIY Office Hours",
      "DCLA commissioned or controlled NYC Artist Coalition",
      "DCLA adopted every coalition recommendation"
    ],
    proofClaimIds: ["nyc-artist-coalition-civic-systems"],
    researchInquiryIds: [
      "INQ-NYCA-INSTITUTIONAL-RECIPROCITY-2026-07-15",
      "INQ-NYCA-JAMIE-INSTRUMENTAL-ROLE"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-record review"]
  },
  {
    id: "CLM-NYCA-CIVIC-INTERMEDIARY-VALUE",
    project: "nyc-artist-coalition",
    internalClaim:
      "Taken together, official records support the inference that NYC Artist Coalition functioned as a civic intermediary: it translated lived conditions in informal cultural spaces into formal recommendations, public participation, sustained organizing, and administratively legible policy questions that DCLA and Council could receive through planning, hearings, and continuing dialogue.",
    status: "inference",
    projections: [
      {
        key: "archive-note",
        text: "Official records support a bounded institutional inference: NYC Artist Coalition translated lived experience from informal cultural spaces into recommendations, participation, testimony, and continuing dialogue that public institutions could receive and respond to.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017-02-27",
        relationship: "direct-support",
        supports: [
          "DCLA's need for stakeholder expertise and public feedback",
          "formal DIY recommendations, sustained organizing, and continued dialogue"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYCA-CIVIC-DIALOGUE-2017",
        relationship: "direct-support",
        supports: [
          "the coalition's organizing, recommendation, and dialogue functions",
          "the public-planning relationship"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYCA-RECOMMENDATIONS-APPENDIX-2017",
        relationship: "direct-support",
        supports: [
          "translation of community experience into named policy problems and concrete recommendations"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "corroborating",
        supports: [
          "coalition testimony carrying affected-community experience and recommendations into a Council hearing"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Civic intermediary is an evidence-based institutional analysis, not a title used by DCLA, Council, or NYC Artist Coalition.",
      "The record supports complementary value, not a claim that government could not act without the coalition.",
      "NYC Artist Coalition was one participant among many in CreateNYC and did not exclusively represent all artists or DIY spaces.",
      "This coalition-level inference does not establish Jamie's sole or complete individual responsibility."
    ],
    antiClaims: [
      "DCLA and Council could not function without NYC Artist Coalition",
      "NYC Artist Coalition was the official representative of every artist or DIY space",
      "DCLA commissioned the coalition",
      "The coalition's recommendations were government policy",
      "Jamie individually performed all intermediary work"
    ],
    proofClaimIds: ["nyc-artist-coalition-civic-systems"],
    researchInquiryIds: [
      "INQ-NYCA-INSTITUTIONAL-RECIPROCITY-2026-07-15",
      "INQ-NYCA-JAMIE-INSTRUMENTAL-ROLE"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-record review"]
  },
  {
    id: "CLM-NYCA-COUNCIL-RECIPROCAL-CAPACITY",
    project: "nyc-artist-coalition",
    internalClaim:
      "The public record supports a reciprocal-capacity analysis: Council and Rafael Espinal supplied formal authority, hearings, sponsorship, and legislative pathways; NYC Artist Coalition supplied affected-community issue framing, recommendations, testimony, public participation, communication, and continuing implementation feedback. Those capacities were complementary, without proving personal dependency, endorsement, or sole coalition causality.",
    status: "inference",
    projections: [
      {
        key: "archive-note",
        text: "Council and coalition capacities were complementary: elected officials supplied hearings and legislative pathways, while NYC Artist Coalition helped bring affected-community experience, recommendations, testimony, participation, and public communication into those processes.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-INT-1652-2017",
        relationship: "direct-support",
        supports: [
          "Espinal's prime sponsorship and the Council's formal legislative path for Cabaret Law repeal"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-INT-1688-2017",
        relationship: "direct-support",
        supports: [
          "Espinal's prime sponsorship of the Office of Nightlife legislation",
          "the Office's enacted liaison, outreach, navigation, and intermediary functions"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "direct-support",
        supports: [
          "Jamie's Council testimony as a coalition member",
          "coalition recommendations and affected-community framing entering the hearing record"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CREATENYC-NYCA-RECOMMENDATIONS-APPENDIX-2017",
        relationship: "corroborating",
        supports: [
          "the coalition's policy framing, recommendations, participation invitations, and March 2017 dialogue with DCLA and Council members"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCA-X-ENGAGEMENT-REVIEW-2026",
        relationship: "context",
        supports: [
          "a bounded public communication relationship between the shared coalition identity and Council-member accounts"
        ],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Reciprocal capacity is an institutional interpretation, not a statement of Espinal's private motive.",
      "Legislative sponsorship and coalition advocacy are distinct contributions; sequence and contact do not prove sole causality.",
      "Council-member account engagement is account-level evidence, not personal authorship or formal endorsement.",
      "Coalition testimony and recommendations do not establish that the coalition drafted the bills or controlled legislative decisions.",
      "Keep Jamie's documented actions visible without assigning every coalition contribution to him."
    ],
    antiClaims: [
      "Espinal needed Jamie or NYC Artist Coalition",
      "NYC Artist Coalition created the Office of Nightlife",
      "NYC Artist Coalition wrote Int. 1652 or Int. 1688",
      "Espinal endorsed every coalition recommendation",
      "The coalition alone caused Cabaret Law repeal or Office of Nightlife enactment",
      "Jamie personally supplied every witness, recommendation, or communication"
    ],
    proofClaimIds: [
      "nyc-artist-coalition-civic-systems",
      "nyca-participation-system"
    ],
    researchInquiryIds: [
      "INQ-NYCA-INSTITUTIONAL-RECIPROCITY-2026-07-15",
      "INQ-NYCA-JAMIE-INSTRUMENTAL-ROLE",
      "INQ-NYCA-JAMIE-OFFICE-NIGHTLIFE-ROLE"
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex public-record review"]
  }
] satisfies ClaimRecord[];

const researchInquiries = [
  {
    id: "INQ-NYCA-INSTITUTIONAL-RECIPROCITY-2026-07-15",
    project: "nyc-artist-coalition",
    question:
      "What public evidence explains why NYC Artist Coalition's work was valuable to DCLA, the NYC Council, and Rafael Espinal without inventing private motives or overstating causality?",
    methods: [
      "Close-read Finkelpearl's February 27, 2017 testimony to the Council and separated its explicit DIY-community account from later records that name NYC Artist Coalition.",
      "Compared the testimony with CreateNYC's NYC Artists section, forward, and official appendix copy of the coalition's recommendations.",
      "Reviewed official Council records for Espinal-sponsored Cabaret Law repeal and Office of Nightlife legislation.",
      "Related those institutional records to the existing official Council hearing transcript and bounded Council-member account-engagement review.",
      "Classified institutional complementarity as inference and preserved coalition, legislative, and Jamie-specific contribution boundaries."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Finkelpearl presented DIY formal recommendations, continued independent organizing, and growing demand for direct dialogue as evidence that CreateNYC's engagement process was useful and worth continuing.",
      "Later official CreateNYC materials explicitly say the DIY Office Hours helped launch NYC Artist Coalition and credit the coalition with organizing, providing recommendations, and driving thoughtful dialogue.",
      "The coalition's official appendix translated lived conditions into a structured agenda spanning criminalization, administrative and financial support, affordability, Cabaret Law repeal, MARCH transparency, permits, liaisons, and repairs.",
      "Official Council records establish Espinal's prime sponsorship of the Cabaret Law repeal and Office of Nightlife legislation, while the Council hearing record establishes coalition testimony and recommendations entering a formal legislative forum.",
      "Taken together, the records support a reciprocal-capacity analysis: the coalition supplied community knowledge, participation, testimony, communication, and feedback; public officials supplied planning, hearing, legislative, and administrative pathways."
    ],
    limitations: [
      "No reviewed source says Finkelpearl, DCLA, Council, or Espinal literally needed NYC Artist Coalition.",
      "Finkelpearl's February testimony does not name NYC Artist Coalition; the identification depends on later official CreateNYC records.",
      "The records do not disclose Espinal's private motives or prove that coalition activity was necessary or sufficient for legislative action.",
      "The records do not establish coalition authorship of legislation, government adoption of every recommendation, or sole causality for policy outcomes.",
      "Coalition-level evidence does not by itself establish Jamie's complete individual responsibility map."
    ],
    sourceIds: [
      "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017-02-27",
      "SRC-CREATENYC-NYCA-CIVIC-DIALOGUE-2017",
      "SRC-CREATENYC-NYCA-FORWARD-2017",
      "SRC-CREATENYC-NYCA-RECOMMENDATIONS-APPENDIX-2017",
      "SRC-NYC-COUNCIL-INT-1652-2017",
      "SRC-NYC-COUNCIL-INT-1688-2017",
      "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
      "SRC-NYCA-X-ENGAGEMENT-REVIEW-2026"
    ],
    publicSummary:
      "Official records show NYC Artist Coalition converting DIY-space experience into recommendations, testimony, participation, and continuing dialogue, while DCLA and Council supplied formal planning and policy pathways. This reciprocal value is well supported; claims about private motives, literal dependency, bill authorship, endorsement, or sole causality are not."
  }
] satisfies ResearchInquiry[];

export const nycaInstitutionalValueBatch: NycaInstitutionalValueBatch = {
  intakeRecords,
  sources,
  claims,
  researchInquiries
};
