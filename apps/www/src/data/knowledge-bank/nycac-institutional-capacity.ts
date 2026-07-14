const reviewedAt = "2026-07-14";
const reviewedBy = ["Jamie Burkart", "Codex public-source review"];

const sourceIds = [
  "SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19",
  "SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17",
  "SRC-NYCAC-CREATENYC-FINAL-PLAN-2017-07-19",
  "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14",
  "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
  "SRC-NYCAC-GREENE-HILL-QA-2017-12-19",
  "SRC-NYC-OFFICE-NIGHTLIFE-LOCAL-LAW-178-2017",
  "SRC-NYC-CABARET-REPEAL-LOCAL-LAW-214-2017"
] as const;

const observationIds = [
  "OBS-NYCAC-DCLA-INSTITUTIONAL-USE",
  "OBS-NYCAC-COUNCIL-EVIDENTIARY-USE",
  "OBS-NYCAC-ESPINAL-REFORM-FRAME",
  "OBS-NYCAC-ESPINAL-PUBLIC-CONSTITUENCY",
  "OBS-NYCAC-CABARET-POLICY-ALIGNMENT",
  "OBS-NYCAC-OFFICE-POLICY-ALIGNMENT"
] as const;

export const nycacInstitutionalCapacity = {
  intakeItems: [{
    id: "INTAKE-NYCAC-INSTITUTIONAL-CAPACITY-ANALYSIS",
    kind: "analysis-note",
    title: "Institutional capacity analysis: DCLA, City Council, Espinal, and NYC Artist Coalition",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex public-source review",
    projectIds: ["nyc-artist-coalition", "createnyc", "cabaret-law", "office-of-nightlife"],
    reason: "Preserve a public-safe account of what the coalition supplied to public institutions while separating documented institutional usefulness from unknowable private motive or sole causation.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds,
    observationIds,
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
    boundaries: [
      "Interpret only public institutional function and public framing; do not claim access to Tom Finkelpearl's or Rafael Espinal's private motives.",
      "Do not turn usefulness, policy alignment, or access to a constituency into institutional dependency, legislative authorship, or sole causation."
    ]
  }],
  observations: [
    {
      id: "OBS-NYCAC-DCLA-INSTITUTIONAL-USE",
      intakeId: "INTAKE-NYCAC-INSTITUTIONAL-CAPACITY-ANALYSIS",
      sourceId: "SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19",
      project: "createnyc",
      kind: "bounded-inference",
      text: "Finkelpearl's testimony presents NYC Artist Coalition's formation after DCLA's January convening as evidence of continuing civic organization produced through public participation.",
      locator: "Transcript pp. 91-92",
      status: "extracted",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017"],
      researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
      limitations: ["This is an inference from the commissioner's public testimony, not evidence of his private motive, personal dependency, or a claim that DCLA created the coalition alone."]
    },
    {
      id: "OBS-NYCAC-COUNCIL-EVIDENTIARY-USE",
      intakeId: "INTAKE-NYCAC-INSTITUTIONAL-CAPACITY-ANALYSIS",
      sourceId: "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14",
      project: "cabaret-law",
      kind: "bounded-inference",
      text: "The hearing record shows Jamie's coalition testimony contributing situated evidence about licensing fear, voluntary safety work, and regulatory trust to the stakeholder record Espinal solicited.",
      locator: "Transcript pp. 7-9 and 71-74",
      status: "extracted",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017"],
      researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
      limitations: ["The public hearing record establishes an evidentiary contribution, not that the Council depended on this testimony or that Jamie's testimony determined the legislative result."]
    },
    {
      id: "OBS-NYCAC-ESPINAL-REFORM-FRAME",
      intakeId: "INTAKE-NYCAC-INSTITUTIONAL-CAPACITY-ANALYSIS",
      sourceId: "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14",
      project: "cabaret-law",
      kind: "bounded-inference",
      text: "Espinal's opening framed Office of Nightlife creation and Cabaret License repeal as connected communication-and-safety reforms that the coalition's later testimony directly addressed.",
      locator: "Transcript pp. 7-9 and 71-74",
      status: "extracted",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017"],
      researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
      limitations: ["This identifies public political utility and alignment, not Espinal's private motive, exclusive reliance on the coalition, or coalition authorship of his agenda."]
    },
    {
      id: "OBS-NYCAC-ESPINAL-PUBLIC-CONSTITUENCY",
      intakeId: "INTAKE-NYCAC-INSTITUTIONAL-CAPACITY-ANALYSIS",
      sourceId: "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
      comparisonSourceIds: ["SRC-NYCAC-GREENE-HILL-QA-2017-12-19"],
      project: "office-of-nightlife",
      kind: "bounded-inference",
      text: "Reporting that NYC Artist Coalition spearheaded a town hall bringing community cultural organizations and City officials together supports the inference that the coalition supplied participating officials with an organized public forum for hearing what cultural organizations and community members wanted from the new Office.",
      locator: "Opening and town-hall attendance paragraphs",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017"],
      researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
      limitations: ["The article does not establish a complete production roster, private strategy, official dependence on the coalition, or direct policy adoption from the event."]
    },
    {
      id: "OBS-NYCAC-CABARET-POLICY-ALIGNMENT",
      intakeId: "INTAKE-NYCAC-INSTITUTIONAL-CAPACITY-ANALYSIS",
      sourceId: "SRC-NYC-CABARET-REPEAL-LOCAL-LAW-214-2017",
      comparisonSourceIds: ["SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14"],
      project: "cabaret-law",
      kind: "bounded-inference",
      text: "The enacted repeal's separation of the Cabaret License from retained security provisions substantively aligns with the coalition testimony's distinction between discriminatory licensing and legitimate venue safety.",
      locator: "Legislation summary and enacted text",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017"],
      researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
      limitations: ["Substantive alignment does not establish that Jamie or NYC Artist Coalition authored the law or caused its enactment."]
    },
    {
      id: "OBS-NYCAC-OFFICE-POLICY-ALIGNMENT",
      intakeId: "INTAKE-NYCAC-INSTITUTIONAL-CAPACITY-ANALYSIS",
      sourceId: "SRC-NYC-OFFICE-NIGHTLIFE-LOCAL-LAW-178-2017",
      comparisonSourceIds: ["SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17", "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12"],
      project: "office-of-nightlife",
      kind: "bounded-inference",
      text: "The Office of Nightlife law's liaison, outreach, policy, advisory, and public-hearing duties align with the coalition's demonstrated role in connecting grassroots cultural spaces with public officials and structured policy discussion.",
      locator: "Charter section 20-d",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017"],
      researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
      limitations: ["Substantive alignment does not establish coalition authorship, implementation quality, or any advocate's causal share."]
    }
  ],
  claims: [{
    id: "CLM-NYCAC-INSTITUTIONAL-CAPACITY-2017",
    project: "nyc-artist-coalition",
    internalClaim: "Public records support a bounded inference that NYC Artist Coalition functioned as an organized civic counterpart: DCLA cited its formation as a public-process outcome, while the coalition supplied City processes with situated evidence, structured recommendations, and public forums connecting grassroots cultural spaces with officials.",
    status: "inference",
    projections: [{
      key: "archive-note",
      text: "Public records support the inference that NYC Artist Coalition gave cultural officials and Council members an organized civic counterpart: structured recommendations, situated safety evidence, and public forums connecting grassroots cultural spaces with government.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      { sourceId: "SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19", relationship: "direct-support", supports: ["DCLA hosted the January 2017 DIY arts meeting", "Finkelpearl cited coalition formation as a public-process outcome"], locator: "Transcript pp. 91-92", confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17", relationship: "direct-support", supports: ["collective policy-development process", "cultural liaison and urgent repair fund proposals"], locator: "PDF pp. 3-8", confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCAC-CREATENYC-FINAL-PLAN-2017-07-19", relationship: "corroborating", supports: ["coalition recommendations", "City-recognized dialogue on preserving artist-led spaces"], locator: "Plan p. 146", confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14", relationship: "direct-support", supports: ["Council request for stakeholder testimony", "Jamie's trust-and-safety analysis", "Espinal's public reform framing"], locator: "Transcript pp. 7-9 and 71-74", confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12", relationship: "corroborating", supports: ["coalition-spearheaded Office of Nightlife town hall", "participation by cultural organizations and city officials"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYCAC-GREENE-HILL-QA-2017-12-19", relationship: "corroborating", supports: ["September 28 town hall invitation"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-OFFICE-NIGHTLIFE-LOCAL-LAW-178-2017", relationship: "context", supports: ["Local Law 178", "Office and Advisory Board duties"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-CABARET-REPEAL-LOCAL-LAW-214-2017", relationship: "context", supports: ["repeal of cabaret and dance-hall licensing requirement", "retained security provisions"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Describe public institutional usefulness and civic capacity, not what Finkelpearl, the Council, or Espinal privately felt they needed.",
      "Keep coalition participation, Council deliberation, and legislative enactment as distinct forms of agency.",
      "Treat policy alignment as context, not proof of authorship or causal weight."
    ],
    antiClaims: [
      "Finkelpearl personally depended on Jamie",
      "DCLA or the City Council could not act without NYC Artist Coalition",
      "Espinal's private motive is known",
      "Jamie or NYC Artist Coalition authored or enacted the laws",
      "policy alignment proves that the coalition caused the reforms"
    ],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-NEED"],
    reviewedAt,
    reviewedBy
  }],
  researchInquiries: [{
    id: "INQ-NYCAC-INSTITUTIONAL-NEED",
    project: "nyc-artist-coalition",
    question: "What does the public record establish about why DCLA, the City Council, and Rafael Espinal found NYC Artist Coalition useful?",
    methods: [
      "Close-read official testimony for how Finkelpearl and Espinal publicly framed public participation, coalition formation, stakeholder evidence, nightlife reform, and safety.",
      "Compare coalition recommendations and public forums with enacted institutional functions while separating alignment from authorship or causation.",
      "Use contemporary reporting to test whether the coalition supplied a visible constituency and public convening capacity."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Finkelpearl publicly cited coalition formation as an example of the power of DCLA's public convening and feedback process.",
      "The Council hearing sought a stakeholder record, and Jamie supplied situated testimony connecting licensing fear, safety work, and regulatory trust.",
      "Espinal publicly linked the Office of Nightlife and Cabaret License repeal to communication among artists, residents, nightlife participants, and government.",
      "The coalition supplied structured recommendations and a public town-hall forum that connected grassroots cultural spaces with officials.",
      "Enacted law aligned with parts of the coalition's safety and liaison framing, but the public record does not allocate causal weight."
    ],
    limitations: [
      "No private communications or retrospective interviews were used to establish personal motive.",
      "The public record does not show that any official or institution depended exclusively on NYC Artist Coalition.",
      "Policy alignment cannot establish causal weight, who authored a provision, or what caused enactment.",
      "The complete division of labor across coalition members, partners, staff, and elected officials remains outside this inquiry."
    ],
    sourceIds,
    publicSummary: "The public record supports a bounded institutional-capacity interpretation: the coalition supplied organized participation, structured policy input, situated evidence, and public convening, while private motive and causal allocation remain unknown."
  }]
} as const;
