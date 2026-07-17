import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nycacInstitutionalValueSourceRecords20260716 = [
  {
    id: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
    title: "CreateNYC cultural plan oversight testimony",
    organization: "New York City Department of Cultural Affairs",
    author: "Tom Finkelpearl",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-27",
    accessedAt: "2026-07-16",
    canonicalUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect6_Commissioner-Tom-Finkelpearl_Testimony.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "Tom Finkelpearl, testimony before the New York City Council Committee on Cultural Affairs, Libraries and International Intergroup Relations, February 27, 2017.",
    publicNote: "Finkelpearl presented the DIY Office Hours as an example of a public process that produced formal recommendations, continued independent organizing, and an ongoing DCLA relationship.",
    supportsGenerally: [
      "Finkelpearl told the Council that the CreateNYC process had been helpful and had already informed action",
      "DIY Office Hours participants prepared formal recommendations for the commissioner",
      "the DIY community continued to organize independently after the meeting",
      "Finkelpearl wanted DCLA to continue learning from and working with the community",
      "DCLA heard needs involving safety upgrades, government navigation, affordability, and workspace"
    ],
    doesNotEstablish: [
      "the name NYC Artist Coalition; the testimony refers to members of the DIY community",
      "who authored the recommendations or performed each organizing task",
      "that DCLA adopted every recommendation",
      "that the coalition caused CreateNYC or was necessary to its completion",
      "Finkelpearl's private motives for selecting the example"
    ]
  },
  {
    id: "SRC-DCLA-FINKELPEARL-MESSAGE-NYCAC-2017",
    title: "Message from the Commissioner",
    organization: "New York City Department of Cultural Affairs",
    author: "Tom Finkelpearl",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-16",
    canonicalUrl: "https://www.nyc.gov/site/dcla/about/message-from-the-commissioner.page",
    preferredPublicUrl: "canonical",
    publicCitation: "Tom Finkelpearl, 'Message from the Commissioner,' New York City Department of Cultural Affairs, accessed July 16, 2026.",
    publicNote: "The commissioner explicitly named NYC Artist Coalition as a coalition the CreateNYC Office Hours helped launch and connected continued public dialogue to what New Yorkers want from government support for culture.",
    supportsGenerally: [
      "DCLA's retrospective statement that CreateNYC Office Hours helped launch NYC Artist Coalition",
      "NYC Artist Coalition's stated dedication to advocating for DIY spaces",
      "DCLA's intention to continue opportunities for residents to speak directly with the agency",
      "DCLA's intention to hear what was and was not working during implementation"
    ],
    doesNotEstablish: [
      "the complete founding sequence or division of labor within NYC Artist Coalition",
      "that Office Hours alone caused the coalition to form",
      "that every coalition recommendation was adopted",
      "that DCLA depended on the coalition or endorsed every campaign",
      "Jamie's individual role in the Office Hours or coalition formation"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
    title: "Committee on Consumer Affairs Cabaret Law hearing transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-19",
    accessedAt: "2026-07-16",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=4DB6965B-EC69-4863-B461-DF449A04AE9F&ID=5316934&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Committee on Consumer Affairs hearing transcript, June 19, 2017.",
    publicNote: "The official transcript records several NYC Artist Coalition participants and identifies Jamie as a coalition member asking the Council to repeal the Cabaret Law.",
    supportsGenerally: [
      "Rafael Espinal chaired the June 19, 2017, Consumer Affairs hearing",
      "multiple NYC Artist Coalition participants testified",
      "Jamie identified himself as a coalition member and asked the Council to repeal the Cabaret Law",
      "the hearing provided a formal route for public experience and coalition recommendations to enter the Council record"
    ],
    doesNotEstablish: [
      "that every factual statement made by every witness was independently verified by the Council",
      "that Jamie or NYC Artist Coalition drafted the repeal bill",
      "that coalition testimony alone caused repeal",
      "that the coalition represented every artist, venue, dancer, or nightlife worker",
      "the complete private relationship between Espinal and coalition participants"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2017-06-21",
    title: "Council stated-meeting transcript crediting Cabaret Law advocacy",
    organization: "New York City Council",
    author: "Rafael L. Espinal Jr.",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-21",
    accessedAt: "2026-07-16",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=22A511CF-8451-4001-8210-E42869526380&ID=5330257&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, stated-meeting transcript, June 21, 2017, pp. 119-120.",
    publicNote: "While urging colleagues to sign onto Intro 1652, Espinal credited Dance Liberation Network and NYC Artist Coalition for work on the ground that brought attention to the bill.",
    supportsGenerally: [
      "Espinal publicly associated NYC Artist Coalition with the collective Cabaret Law repeal effort",
      "Espinal credited coalition and Dance Liberation Network ground work with bringing attention to Intro 1652",
      "Espinal used that acknowledgment while urging Council colleagues to sign onto the bill"
    ],
    doesNotEstablish: [
      "that Espinal could not advance the bill without the coalition",
      "that NYC Artist Coalition alone created public attention or legislative support",
      "Jamie's individual contribution to the credited ground work",
      "coalition authorship of Intro 1652",
      "that coalition activity alone caused enactment"
    ]
  }
] satisfies SourceRecord[];

export const nycacInstitutionalValueClaimRecords20260716 = [
  {
    id: "CLM-DCLA-DIY-ENGAGEMENT-IN-COUNCIL-TESTIMONY-2017",
    project: "nyc-artist-coalition",
    internalClaim: "In February 2017 Council testimony, Finkelpearl presented the DIY Office Hours as an example of public engagement producing formal recommendations, continued independent organizing, and an ongoing relationship with DCLA.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Finkelpearl presented the DIY Office Hours to the Council as an example of engagement producing formal recommendations, continued organizing, and an ongoing relationship with DCLA.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
      relationship: "direct-support",
      supports: ["testimony context", "formal recommendations", "continued independent organizing", "intended continuing relationship"],
      locator: "pp. 4-5, paragraphs beginning 'The process itself has been helpful' and 'One well attended meeting'",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["The testimony describes the DIY community but does not name NYC Artist Coalition."],
    antiClaims: ["The testimony proves that NYC Artist Coalition was the only DIY participant group.", "Finkelpearl said DCLA needed or depended on the coalition."],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex public-source close reading"]
  },
  {
    id: "CLM-DCLA-OFFICE-HOURS-HELPED-LAUNCH-NYCAC-2017",
    project: "nyc-artist-coalition",
    internalClaim: "In an official commissioner message, Finkelpearl wrote that CreateNYC Office Hours helped launch NYC Artist Coalition, which he described as advocating for DIY spaces.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "DCLA later named NYC Artist Coalition as one of the coalitions the CreateNYC Office Hours helped launch.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-DCLA-FINKELPEARL-MESSAGE-NYCAC-2017",
      relationship: "direct-support",
      supports: ["DCLA's helped-launch characterization", "coalition name", "DIY-space advocacy purpose"],
      locator: "What Now section, paragraph beginning 'We will also continue the practice'",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["This is DCLA's retrospective institutional characterization, not a complete founding history or allocation of individual credit."],
    antiClaims: ["DCLA alone created NYC Artist Coalition.", "Jamie was the sole founder.", "DCLA endorsed every coalition campaign."],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex public-source close reading"]
  },
  {
    id: "CLM-NYCAC-COUNCIL-TESTIMONY-PARTICIPATION-2017",
    project: "nyc-artist-coalition",
    internalClaim: "The official June 19, 2017, Council transcript records multiple NYC Artist Coalition participants, including Jamie, testifying at an Espinal-chaired hearing about the Cabaret Law.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Multiple NYC Artist Coalition participants, including Jamie, entered their Cabaret Law testimony into the official Council record in June 2017.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
      relationship: "direct-support",
      supports: ["hearing date and chair", "coalition participation", "Jamie's coalition affiliation and repeal request"],
      locator: "appearance list and transcript pp. 151-153, 200-203",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["A hearing record establishes participation and statements, not automatic acceptance, legislative authorship, or policy causality."],
    antiClaims: ["NYC Artist Coalition wrote Intro 1652.", "Coalition testimony alone caused repeal.", "Jamie represented every coalition participant."],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017", "INQ-NYCAC-ESPINAL-RECIPROCAL-RELATIONSHIP-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex public-source close reading"]
  },
  {
    id: "CLM-ESPINAL-CREDITED-NYCAC-GROUND-WORK-2017",
    project: "nyc-artist-coalition",
    internalClaim: "On June 21, 2017, Espinal publicly credited Dance Liberation Network and NYC Artist Coalition for ground work that brought attention to Intro 1652 while urging Council colleagues to sign on.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "While urging colleagues to support Intro 1652, Espinal publicly credited Dance Liberation Network and NYC Artist Coalition for ground work that brought attention to the bill.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2017-06-21",
        relationship: "direct-support",
        supports: ["Espinal's public credit", "ground-work characterization", "bill-attention characterization", "request for Council sign-ons"],
        locator: "stated-meeting transcript pp. 119-120",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-NYCARTC-ESPINAL-2017",
        relationship: "corroborating",
        supports: ["later public identification of NYC Artist Coalition in the collective repeal effort"],
        locator: "public post dated October 30, 2017",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Espinal credited two groups collectively; the statement does not allocate individual labor or say the bill depended on either group."],
    antiClaims: ["Espinal said he needed NYC Artist Coalition to pass the bill.", "NYC Artist Coalition alone brought attention to the bill.", "Jamie personally performed all credited ground work."],
    researchInquiryIds: ["INQ-NYCAC-ESPINAL-RECIPROCAL-RELATIONSHIP-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex public-source close reading"]
  },
  {
    id: "CLM-JAMIE-NYCAC-INSTITUTIONAL-PARTICIPATION-2017",
    project: "nyc-artist-coalition",
    internalClaim: "Across public sources, Jamie is identified as a founding NYC Artist Coalition member who organized fire-code study groups, advocated publicly for Cabaret Law repeal, testified before the Council, and appeared as a coalition speaker at an Office of Nightlife town hall.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Public records place Jamie in the coalition's institution-facing work as a founding member, safety-study organizer, repeal advocate, Council witness, and town-hall speaker.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NYCAC-NPR-NIGHTLIFE-2017",
        relationship: "direct-support",
        supports: ["founding-member identification", "public repeal advocacy"],
        locator: "paragraph identifying Jamie and quoting his repeal position",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-GOTHAMIST-CABARET-2017",
        relationship: "direct-support",
        supports: ["fire-code study groups", "City Hall repeal advocacy"],
        locator: "paragraphs describing post-Ghost Ship study groups and City Hall rally",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "direct-support",
        supports: ["Council testimony", "coalition affiliation", "repeal request"],
        locator: "transcript pp. 200-202",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
        relationship: "direct-support",
        supports: ["coalition speaker role at the Office of Nightlife town hall"],
        locator: "paragraph naming Jamie and Olympia Kazi among coalition speakers",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The sources document several concrete contributions but do not reconstruct the complete founding process, recommendation authorship, event-production division of labor, or policy causality."],
    antiClaims: ["Jamie was the sole founder or coalition leader.", "Jamie individually created the Office of Nightlife or caused Cabaret Law repeal.", "Jamie produced every coalition event or authored every recommendation."],
    researchInquiryIds: ["INQ-NYCAC-FOUNDING-ROLE-SCOPE-2026", "INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex cross-source synthesis"]
  },
  {
    id: "CLM-JAMIE-NYCAC-INSTITUTIONAL-INTERFACE-CONTRIBUTION-2017",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie's documented founding participation, safety-study organizing, advocacy, Council testimony, and town-hall speaking support a bounded inference that he helped build and operate NYC Artist Coalition's interface between community-driven cultural spaces and city government.",
    status: "inference",
    projections: [{
      key: "archive-note",
      text: "Jamie helped build and operate the coalition's interface between community-driven cultural spaces and city government.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NYCAC-NPR-NIGHTLIFE-2017",
        relationship: "context",
        supports: ["founding-member identification", "collective repeal context"],
        locator: "Jamie identification and quoted repeal position",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-GOTHAMIST-CABARET-2017",
        relationship: "context",
        supports: ["safety-study organizing", "public advocacy"],
        locator: "study-group and rally reporting",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "context",
        supports: ["institution-facing testimony", "coalition affiliation"],
        locator: "transcript pp. 200-202",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
        relationship: "context",
        supports: ["coalition town-hall speaker role", "cross-sector public dialogue"],
        locator: "coalition town-hall account",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Interface contribution is an analytical synthesis of documented activity, not a formal title or complete allocation of coalition labor."],
    antiClaims: ["Jamie alone built the coalition's government relationships.", "The inference establishes recommendation authorship or event production for every coalition action.", "Jamie's work alone caused legislation, agency action, or institutional adoption."],
    researchInquiryIds: ["INQ-NYCAC-FOUNDING-ROLE-SCOPE-2026", "INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex institutional-analysis synthesis"]
  },
  {
    id: "CLM-FINKELPEARL-DIY-EXAMPLE-INSTITUTIONAL-UTILITY-2017",
    project: "nyc-artist-coalition",
    internalClaim: "The placement and framing of the DIY Office Hours example support an inference that Finkelpearl used it to demonstrate to the Council that CreateNYC engagement could produce structured recommendations, independent civic organization, and a continuing agency relationship.",
    status: "inference",
    projections: [{
      key: "archive-note",
      text: "The testimony's structure suggests that the DIY example helped Finkelpearl show the Council what the CreateNYC engagement process was making possible.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
      relationship: "context",
      supports: ["the testimony's public-engagement argument", "the DIY example's placement", "recommendation, organizing, and relationship outcomes"],
      locator: "pp. 4-5, transition from formal feedback to the Office Hours example",
      confidence: "moderate",
      renderCitation: false
    }],
    boundaries: ["This is an institutional reading of the testimony's structure, not a direct statement of Finkelpearl's private motive."],
    antiClaims: ["Finkelpearl privately said he included the example for this reason.", "The testimony names NYC Artist Coalition.", "The example was necessary to secure Council support or funding."],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex institutional-analysis synthesis"]
  },
  {
    id: "CLM-NYCAC-DCLA-KNOWLEDGE-INTERMEDIARY-2017",
    project: "nyc-artist-coalition",
    internalClaim: "Taken together, the official records support an inference that NYC Artist Coalition functioned as a knowledge intermediary for DCLA by aggregating dispersed DIY-space experience, converting it into formal proposals, and sustaining a feedback relationship beyond one meeting.",
    status: "inference",
    projections: [{
      key: "archive-note",
      text: "The coalition functioned as a field-to-government intermediary: it gathered recurring DIY-space problems, translated them into proposals, and sustained a route for feedback.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
        relationship: "context",
        supports: ["formal recommendations", "independent organizing", "continuing DCLA relationship", "named administrative needs"],
        locator: "pp. 4-6",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-DCLA-FINKELPEARL-MESSAGE-NYCAC-2017",
        relationship: "context",
        supports: ["coalition linkage", "continued direct dialogue", "implementation feedback"],
        locator: "What Now section",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-CREATENYC-APPENDIX-2017",
        relationship: "direct-support",
        supports: ["collectively developed problem categories", "formal policy and administrative recommendations", "request for next steps"],
        locator: "letter opening and recommendation sections",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Knowledge intermediary is an analytical description, not a title used by DCLA or the coalition."],
    antiClaims: ["NYC Artist Coalition represented every DIY space.", "DCLA adopted every recommendation.", "The coalition was indispensable to DCLA.", "Jamie individually authored the coalition's institutional function."],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex institutional-analysis synthesis"]
  },
  {
    id: "CLM-NYCAC-COUNCIL-POLICY-INTERFACE-2017",
    project: "nyc-artist-coalition",
    internalClaim: "The record supports an inference that NYC Artist Coalition gave Council actors a usable policy interface: organized testimony, recurring problem definitions, proposed remedies, and a public constituency relevant to oversight and legislation.",
    status: "inference",
    projections: [{
      key: "archive-note",
      text: "For the Council, the coalition made a dispersed cultural field easier to hear through organized testimony, defined problems, proposed remedies, and continuing public participation.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "context",
        supports: ["organized coalition testimony", "formal Council record", "Espinal-chaired public hearing"],
        locator: "appearance list and coalition testimony panels",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-CREATENYC-APPENDIX-2017",
        relationship: "context",
        supports: ["structured problem definitions", "proposed remedies spanning legislation and administration"],
        locator: "Prevent Criminalization, Access to Financial and Administrative Support, and Promote Affordability sections",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2017-06-21",
        relationship: "context",
        supports: ["a Council sponsor's public acknowledgment of ground work and bill attention"],
        locator: "stated-meeting transcript pp. 119-120",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Policy interface is an institutional-analysis inference, not proof that the Council needed, endorsed, or adopted every coalition position."],
    antiClaims: ["The Council depended on NYC Artist Coalition.", "The coalition spoke for every cultural worker.", "Coalition participation caused legislation to pass.", "Council engagement proves official endorsement of every campaign."],
    researchInquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex institutional-analysis synthesis"]
  },
  {
    id: "CLM-NYCAC-ESPINAL-RECIPROCAL-LEGISLATIVE-RELATIONSHIP-2017",
    project: "nyc-artist-coalition",
    internalClaim: "The public record supports an inference of a reciprocal legislative relationship: coalition participants supplied field knowledge, testimony, organizing, and public attention, while Espinal supplied a Council hearing, bill sponsorship, and a route for legislative action.",
    status: "inference",
    projections: [{
      key: "archive-note",
      text: "The relationship was reciprocal: coalition participants brought field knowledge and organized public attention; Espinal brought a hearing, bill sponsorship, and a legislative route.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
        relationship: "context",
        supports: ["Espinal-chaired hearing", "NYC Artist Coalition appearance entries and testimony panels", "formal public record"],
        locator: "hearing cover, appearance list, and coalition testimony panels",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2017-06-21",
        relationship: "context",
        supports: ["Espinal's sponsorship and call for sign-ons", "public credit for coalition ground work and bill attention"],
        locator: "stated-meeting transcript pp. 119-120",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Reciprocal relationship is an evidence-based interpretation; the sources do not reveal private motives, bargaining, dependence, or the complete division of labor."],
    antiClaims: ["Espinal needed NYC Artist Coalition in a literal or indispensable sense.", "NYC Artist Coalition authored Intro 1652.", "Either Espinal or the coalition acted alone.", "The relationship proves sole causality for repeal."],
    researchInquiryIds: ["INQ-NYCAC-ESPINAL-RECIPROCAL-RELATIONSHIP-2017"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Codex institutional-analysis synthesis"]
  }
] satisfies ClaimRecord[];

export const nycacInstitutionalValueResearchInquiries20260716 = [
  {
    id: "INQ-NYCAC-INSTITUTIONAL-VALUE-2017",
    project: "nyc-artist-coalition",
    question: "What do official records establish, and what can only be inferred, about why NYC Artist Coalition's work was useful to DCLA, Finkelpearl, and the New York City Council?",
    methods: [
      "Close-read Finkelpearl's February 27, 2017, CreateNYC oversight testimony to the Council.",
      "Close-read DCLA's official Message from the Commissioner and its explicit NYC Artist Coalition reference.",
      "Reused the already close-read City-preserved coalition recommendations without treating collective authorship as Jamie's individual authorship.",
      "Close-read the June 19 Council hearing transcript and June 21 stated-meeting transcript.",
      "Separated direct institutional statements, source-bounded facts, analytical inferences, and unobservable private motives."
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "Finkelpearl presented the DIY Office Hours to the Council as a process that produced formal recommendations, continued independent organizing, and a continuing agency relationship.",
      "DCLA later explicitly named NYC Artist Coalition as a coalition the Office Hours helped launch.",
      "The City-preserved coalition submission translated lived problems into administrative and legislative recommendations concerning enforcement, government navigation, repairs, and affordability.",
      "Official Council records document coalition testimony and Espinal's public credit for coalition ground work that brought attention to Intro 1652.",
      "Together, these records support a bounded institutional interpretation: the coalition reduced the distance between informal cultural spaces and government by making field knowledge organized, discussable, and actionable."
    ],
    limitations: [
      "Finkelpearl's testimony describes the DIY community but does not name NYC Artist Coalition; the official commissioner message provides the explicit coalition linkage.",
      "The sources do not reveal Finkelpearl's private motive for selecting the example.",
      "Institutional value does not prove dependency, indispensability, endorsement of every recommendation, adoption, or policy causality.",
      "The coalition did not represent every artist or cultural space, and the records do not allocate every contribution among collaborators.",
      "Jamie's specific role in the recommendation drafting and DCLA relationship remains subject to the existing founding-role inquiry and collaborator review."
    ],
    sourceIds: [
      "SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017",
      "SRC-DCLA-FINKELPEARL-MESSAGE-NYCAC-2017",
      "SRC-NYCAC-CREATENYC-APPENDIX-2017",
      "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
      "SRC-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2017-06-21"
    ],
    publicSummary: "Official records establish that DCLA used the DIY engagement as an example of structured public input and continuing organization, explicitly linked that process to NYC Artist Coalition, and received formal coalition recommendations; the broader institutional-value interpretation remains an inference rather than a claim about private motives or necessity."
  },
  {
    id: "INQ-NYCAC-ESPINAL-RECIPROCAL-RELATIONSHIP-2017",
    project: "nyc-artist-coalition",
    question: "What did NYC Artist Coalition and Espinal each contribute to their public legislative relationship, and what evidence would be needed to make a stronger claim about design, dependence, or causality?",
    methods: [
      "Close-read the June 19, 2017, Espinal-chaired Cabaret Law hearing transcript.",
      "Close-read Espinal's June 21, 2017, stated-meeting remarks about Intro 1652.",
      "Compared the official records with the already normalized October 2017 Espinal public-post record.",
      "Separated a documented reciprocal public interface from claims about private strategy, bill authorship, or causal necessity."
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "Espinal chaired a hearing where multiple coalition participants supplied testimony and Jamie identified himself as a coalition member seeking repeal.",
      "Two days later, Espinal credited Dance Liberation Network and NYC Artist Coalition for ground work that brought attention to Intro 1652 while asking colleagues to sign on.",
      "The public record supports a reciprocal-legislative-interface interpretation: organizers brought field knowledge and public attention, and Espinal brought an official hearing and sponsored legislative route."
    ],
    limitations: [
      "The public sources do not establish private negotiations, drafting exchanges, strategic dependence, or the complete division of labor.",
      "Espinal's credit was collective and does not allocate Jamie's individual contribution.",
      "The relationship does not establish that coalition work alone caused co-sponsorship, passage, enactment, or later implementation.",
      "A stronger role claim would require dated drafting records, direct collaborator or Council-staff confirmation, or other role-bearing public records."
    ],
    sourceIds: [
      "SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19",
      "SRC-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2017-06-21",
      "SRC-X-NYCARTC-ESPINAL-2017"
    ],
    publicSummary: "Official Council records document coalition testimony and Espinal's public credit for coalition ground work while leaving private strategy, bill authorship, individual task allocation, and causal necessity unresolved."
  }
] satisfies ResearchInquiry[];

export const nycacInstitutionalValueIntakeRecords20260716 = [
  {
    id: "INTAKE-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Codex public-source close reading",
    kind: "public-url",
    title: "Finkelpearl CreateNYC oversight testimony",
    publicSafeSummary: "Official testimony uses the DIY Office Hours as an example of engagement producing recommendations, continued organizing, and an ongoing agency relationship.",
    whyItMatters: "It directly establishes how Finkelpearl presented the DIY community's participation to the Council and supports a bounded interpretation of why the example was institutionally useful.",
    projectHints: ["nyc-artist-coalition", "createnyc", "dcla"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect6_Commissioner-Tom-Finkelpearl_Testimony.pdf",
    sourceIds: ["SRC-DCLA-FINKELPEARL-CREATENYC-TESTIMONY-2017"],
    claimIds: ["CLM-DCLA-DIY-ENGAGEMENT-IN-COUNCIL-TESTIMONY-2017", "CLM-FINKELPEARL-DIY-EXAMPLE-INSTITUTIONAL-UTILITY-2017"],
    inquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    limitations: ["The testimony does not name NYC Artist Coalition or state Finkelpearl's private motive."],
    nextActions: ["Seek any contemporaneous DCLA notes or direct public explanation that further clarifies how the example was selected for testimony."]
  },
  {
    id: "INTAKE-DCLA-FINKELPEARL-MESSAGE-NYCAC-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Codex public-source close reading",
    kind: "public-url",
    title: "DCLA commissioner message naming NYC Artist Coalition",
    publicSafeSummary: "An official DCLA message says CreateNYC Office Hours helped launch NYC Artist Coalition and ties continued dialogue to public expectations of government support for culture.",
    whyItMatters: "It provides the missing explicit link between the DIY Office Hours described in Council testimony and NYC Artist Coalition.",
    projectHints: ["nyc-artist-coalition", "createnyc", "dcla"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://www.nyc.gov/site/dcla/about/message-from-the-commissioner.page",
    sourceIds: ["SRC-DCLA-FINKELPEARL-MESSAGE-NYCAC-2017"],
    claimIds: ["CLM-DCLA-OFFICE-HOURS-HELPED-LAUNCH-NYCAC-2017", "CLM-NYCAC-DCLA-KNOWLEDGE-INTERMEDIARY-2017"],
    inquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017"],
    limitations: ["The message is an institutional retrospective, not a complete founding history or individual-credit record."],
    nextActions: ["Preserve the helped-launch wording as DCLA's characterization and continue collaborator review of the coalition's full founding sequence."]
  },
  {
    id: "INTAKE-NYC-COUNCIL-CABARET-HEARING-2017-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Codex public-source close reading",
    kind: "public-url",
    title: "June 2017 Cabaret Law hearing transcript",
    publicSafeSummary: "The official Espinal-chaired hearing transcript records multiple coalition participants and Jamie's testimony as an NYC Artist Coalition member seeking repeal.",
    whyItMatters: "It turns the coalition's Council-facing participation from secondary reporting into a direct government record while preserving the distinction between testimony and adoption.",
    projectHints: ["nyc-artist-coalition", "let-nyc-dance", "nyc-council"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=4DB6965B-EC69-4863-B461-DF449A04AE9F&ID=5316934&M=F",
    sourceIds: ["SRC-NYC-COUNCIL-CABARET-HEARING-2017-06-19"],
    claimIds: ["CLM-NYCAC-COUNCIL-TESTIMONY-PARTICIPATION-2017", "CLM-JAMIE-NYCAC-INSTITUTIONAL-PARTICIPATION-2017", "CLM-JAMIE-NYCAC-INSTITUTIONAL-INTERFACE-CONTRIBUTION-2017", "CLM-NYCAC-COUNCIL-POLICY-INTERFACE-2017", "CLM-NYCAC-ESPINAL-RECIPROCAL-LEGISLATIVE-RELATIONSHIP-2017"],
    inquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017", "INQ-NYCAC-ESPINAL-RECIPROCAL-RELATIONSHIP-2017"],
    limitations: ["Testimony establishes participation and statements, not legislative authorship, automatic acceptance, or policy causality."],
    nextActions: ["Compare the transcript with any surviving written coalition testimony and bill-development records before strengthening individual role claims."]
  },
  {
    id: "INTAKE-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Codex public-source close reading",
    kind: "public-url",
    title: "Espinal stated-meeting credit to NYC Artist Coalition",
    publicSafeSummary: "In the official June 21, 2017, Council transcript, Espinal credited Dance Liberation Network and NYC Artist Coalition for ground work that brought attention to Intro 1652 while urging colleagues to sign on.",
    whyItMatters: "This is direct evidence that Espinal publicly regarded the coalition's organizing as useful to the bill's visibility, without proving dependency or sole causality.",
    projectHints: ["nyc-artist-coalition", "let-nyc-dance", "nyc-council"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=22A511CF-8451-4001-8210-E42869526380&ID=5330257&M=F",
    sourceIds: ["SRC-NYC-COUNCIL-ESPINAL-COALITION-CREDIT-2017-06-21"],
    claimIds: ["CLM-ESPINAL-CREDITED-NYCAC-GROUND-WORK-2017", "CLM-NYCAC-COUNCIL-POLICY-INTERFACE-2017", "CLM-NYCAC-ESPINAL-RECIPROCAL-LEGISLATIVE-RELATIONSHIP-2017"],
    inquiryIds: ["INQ-NYCAC-ESPINAL-RECIPROCAL-RELATIONSHIP-2017"],
    limitations: ["Espinal's credit was collective and does not establish Jamie's individual share, bill authorship, necessity, or causality."],
    nextActions: ["Seek dated role-bearing records or direct collaborator and Council-staff confirmation for a more precise account of the legislative working relationship."]
  },
  {
    id: "INTAKE-NYCAC-INSTITUTIONAL-VALUE-QUESTION-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex",
    kind: "research-lead",
    title: "Why DCLA, the Council, Finkelpearl, and Espinal benefited from NYC Artist Coalition",
    publicSafeSummary: "A research question asks what institutional functions the coalition performed for DCLA and Council actors, while distinguishing documented public value from private motive or literal dependency.",
    whyItMatters: "The question can surface a strong, hiring-relevant account of translation, implementation, public participation, and legislative interface without overstating causal power.",
    projectHints: ["nyc-artist-coalition", "createnyc", "let-nyc-dance"],
    maturity: "research-needed",
    publicUse: "cite-with-care",
    editorialState: "unsurfaced",
    disposition: "research-inquiry-created",
    sourceIds: [],
    claimIds: ["CLM-JAMIE-NYCAC-INSTITUTIONAL-INTERFACE-CONTRIBUTION-2017"],
    inquiryIds: ["INQ-NYCAC-INSTITUTIONAL-VALUE-2017", "INQ-NYCAC-ESPINAL-RECIPROCAL-RELATIONSHIP-2017"],
    limitations: ["The word needed is treated as a prompt for institutional analysis, not as a factual claim of indispensability or a statement of private motive."],
    nextActions: ["Continue role-bearing source and collaborator research before selecting any institutional-value synthesis for the public portfolio."]
  }
] satisfies IntakeRecord[];
