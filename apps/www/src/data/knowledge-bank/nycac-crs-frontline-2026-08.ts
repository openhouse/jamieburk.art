import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-13";
const reviewedBy = ["Jamie Burkart", "Codex governed 30-day source return"];
const intakeId = "INTAKE-NYCAC-CRS-FRONTLINE-ADVOCACY-2026-08";

const reportClaimId = "CLM-NYCAC-CRS-REPORT-REVIEW-2026-07";
const speakingClaimId = "CLM-NYCAC-CRS-PRESS-CONFERENCE-SPEAKING-2026-07";
const alignmentClaimId = "CLM-NYCAC-CRS-GOVERNMENT-ALIGNMENT-2026-08";

const reportSourceId = "SRC-NYCAC-CRS-SBU-REPORT-2026-07-28";
const eventSourceId = "SRC-NYCAC-CRS-ACTION-LAB-EVENT-2026-07-29";
const socialSourceId = "SRC-NYCAC-CRS-ACTION-LAB-SOCIAL-2026-08-11";
const partnerSourceId = "SRC-NYCAC-CRS-PARTNER-CORRESPONDENCE-2026-07";
const eventRecordSourceId = "SRC-NYCAC-CRS-EVENT-RECORD-2026-07-29";
const officeSourceId = "SRC-NYCAC-CRS-OFFICE-CORRESPONDENCE-2026-07-08";

const deliveredRemarksInquiryId = "INQ-NYCAC-CRS-DELIVERED-REMARKS-2026-07";
const followThroughInquiryId = "INQ-NYCAC-CRS-FOLLOW-THROUGH-2026-08";

const observationIds = [
  "OBS-NYCAC-CRS-REPORT-PUBLIC-CREDIT",
  "OBS-NYCAC-CRS-REPORT-EDIT-INTEGRATION",
  "OBS-NYCAC-CRS-REPORT-METHOD-BOUNDARY",
  "OBS-NYCAC-CRS-PRESS-CONFERENCE-SPEAKING",
  "OBS-NYCAC-CRS-PREPARED-DELIVERED-DISTINCTION",
  "OBS-NYCAC-CRS-MEDIA-REQUEST-INCOMPLETE",
  "OBS-NYCAC-CRS-CITY-OFFICE-ROUTING",
  "OBS-NYCAC-CRS-STATE-STAFF-ALIGNMENT-SCHEDULED",
  "OBS-NYCAC-CRS-SOCIAL-COLLABORATION-NOT-ESTABLISHED"
] as const;

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "NYC Artist Coalition and Fair Rent NYC frontline advocacy source return",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex governed 30-day source return",
    projectIds: ["nyc-artist-coalition", "fair-rent-nyc", "commercial-rent-stabilization"],
    reason: "Preserve the July 14-August 13, 2026 report-review, public-speaking, elected-office coordination, and campaign follow-through record while separating public proof, protected support, attributed statements, and unresolved outcomes.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      reportSourceId,
      eventSourceId,
      socialSourceId,
      partnerSourceId,
      eventRecordSourceId,
      officeSourceId
    ],
    observationIds: [...observationIds],
    researchInquiryIds: [deliveredRemarksInquiryId, followThroughInquiryId],
    boundaries: [
      "The bounded period is July 14 through August 13, 2026; earlier campaign history is context, not part of this accomplishment census.",
      "Public report credit, protected correspondence, prepared text, event records, transcript derivatives, and later follow-up are different evidence classes and remain separately typed.",
      "Raw email, private documents, audio, transcripts, contact details, authenticated locators, and personal identifiers remain outside the public repository.",
      "Access is not consent, evidence is not publication permission, and passing evals cannot activate a public projection."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: observationIds[0],
    intakeId,
    sourceId: reportSourceId,
    comparisonSourceIds: [partnerSourceId],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "The final July 2026 Empty Storefronts, High Rents report publicly thanks Jamie Burkart, identified as an NYC Artist Coalition member participating in Fair Rent NYC, for a thoughtful and careful review of the draft report.",
    locator: "Final report acknowledgments",
    status: "verified",
    publicSafe: true,
    claimIds: [reportClaimId],
    researchInquiryIds: [],
    limitations: [
      "Acknowledgment establishes a credited review contribution, not report authorship, data analysis, research design ownership, or agreement with every claim."
    ]
  },
  {
    id: observationIds[1],
    intakeId,
    sourceId: partnerSourceId,
    comparisonSourceIds: [reportSourceId],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "Protected partner correspondence records that many of Jamie's detailed prepublication edits were incorporated and that Jamie approved the bounded acknowledgment appearing in the final report.",
    locator: "Protected July 2026 report-review correspondence; locator withheld",
    status: "corroborated",
    publicSafe: true,
    claimIds: [reportClaimId],
    researchInquiryIds: [],
    limitations: [
      "The repository does not publish the correspondence or itemize private draft edits.",
      "The source does not establish that every proposed edit was accepted."
    ]
  },
  {
    id: observationIds[2],
    intakeId,
    sourceId: reportSourceId,
    comparisonSourceIds: [partnerSourceId],
    project: "commercial-rent-stabilization",
    kind: "source-fact",
    text: "The final report distinguishes registered rent from asking, executed, and net-effective rent and states that district-level associations cannot determine individual vacancy causes, landlord motive, financing constraints, or causation.",
    locator: "Final report methodology and limitations",
    status: "verified",
    publicSafe: true,
    claimIds: [reportClaimId],
    researchInquiryIds: [],
    limitations: [
      "The public report shows the final boundary language but does not attribute any particular limitation sentence to Jamie."
    ]
  },
  {
    id: observationIds[3],
    intakeId,
    sourceId: eventRecordSourceId,
    comparisonSourceIds: [eventSourceId, reportSourceId],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "Jamie spoke in the formal program of the July 29, 2026 Empty Storefronts, High Rents press conference and rally as an NYC Artist Coalition member participating in Fair Rent NYC, carrying the cultural-space and public-data lane alongside small-business advocates and state elected officials.",
    locator: "Protected event record and transcript derivatives; locators withheld",
    status: "corroborated",
    publicSafe: true,
    claimIds: [speakingClaimId],
    researchInquiryIds: [deliveredRemarksInquiryId],
    limitations: [
      "Speaking at a press conference does not establish that a news outlet quoted, interviewed, broadcast, or endorsed Jamie.",
      "Participation alongside elected officials does not establish a joint statement or personal endorsement."
    ]
  },
  {
    id: observationIds[4],
    intakeId,
    sourceId: eventRecordSourceId,
    comparisonSourceIds: [partnerSourceId],
    project: "fair-rent-nyc",
    kind: "limitation",
    text: "The prepared two-minute statement and the delivered speaking turn are preserved as separate source objects; the current public-safe record does not represent the prepared text as a verbatim event transcript.",
    locator: "Protected prepared text, event record, and transcript-source family; locators withheld",
    status: "verified",
    publicSafe: true,
    claimIds: [speakingClaimId],
    researchInquiryIds: [deliveredRemarksInquiryId],
    limitations: [
      "Machine-derived speech-text derivatives require original-audio and speaker review before verbatim quotation or publication."
    ]
  },
  {
    id: observationIds[5],
    intakeId,
    sourceId: partnerSourceId,
    comparisonSourceIds: [],
    project: "fair-rent-nyc",
    kind: "limitation",
    text: "A protected organizer message records a press request for event footage, but the reviewed thread does not establish footage delivery, a Jamie interview, quotation, broadcast, or resulting coverage.",
    locator: "Protected post-event correspondence; locator withheld",
    status: "verified",
    publicSafe: true,
    claimIds: [speakingClaimId],
    researchInquiryIds: [followThroughInquiryId],
    limitations: [
      "A request is an opportunity signal, not a completed media result."
    ]
  },
  {
    id: observationIds[6],
    intakeId,
    sourceId: officeSourceId,
    comparisonSourceIds: [eventSourceId],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "Jamie completed a bounded logistics handoff between a City Council office and event organizers: the office acknowledged the event details and routed them internally to senior staff.",
    locator: "Protected city-office correspondence; locator withheld",
    status: "corroborated",
    publicSafe: true,
    claimIds: [alignmentClaimId],
    researchInquiryIds: [followThroughInquiryId],
    limitations: [
      "Routing event information does not establish attendance, bill support, office endorsement, sponsorship, or legislative action."
    ]
  },
  {
    id: observationIds[7],
    intakeId,
    sourceId: officeSourceId,
    comparisonSourceIds: [partnerSourceId],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "After a campaign follow-up call, state legislative staff proposed recurring alignment with Jamie and a campaign organizer and scheduled the first future meeting for August 26, 2026.",
    locator: "Protected state-office correspondence; locator withheld",
    status: "corroborated",
    publicSafe: true,
    claimIds: [alignmentClaimId],
    researchInquiryIds: [followThroughInquiryId],
    limitations: [
      "The scheduled meeting had not occurred by the August 13 evidence cutoff.",
      "A staff coordination channel does not establish an elected official's personal endorsement, a commitment on bill language, sponsorship, passage, or implementation."
    ]
  },
  {
    id: observationIds[8],
    intakeId,
    sourceId: socialSourceId,
    comparisonSourceIds: [partnerSourceId],
    project: "nyc-artist-coalition",
    kind: "limitation",
    text: "The authenticated final campaign social post listed five collaborators but did not list NYC Artist Coalition; an earlier request to add the coalition account therefore remains an uncompleted distribution proposal in this source return.",
    locator: "Public post collaborator list reviewed August 13, 2026",
    status: "verified",
    publicSafe: true,
    claimIds: [alignmentClaimId],
    researchInquiryIds: [followThroughInquiryId],
    limitations: [
      "The public collaborator list can change after review and should be rechecked before any later claim.",
      "The post documents campaign distribution and elected collaboration, not Jamie's authorship of the post."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: reportSourceId,
    title: "Empty Storefronts, High Rents: Commercial Vacancy and Rent Across New York City",
    organization: "Small Business United with Action Lab, Main Street Alliance, and Small Business Majority",
    author: "Mahin Rahman Tawrat",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-28",
    accessedAt: reviewedAt,
    canonicalUrl: "https://smallbizunited.com/reports/260728_SBU_FinalReport.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "Small Business United, Empty Storefronts, High Rents: Commercial Vacancy and Rent Across New York City, July 2026.",
    publicNote: "The final report publicly credits Jamie's thoughtful and careful draft review and states the analysis's data and causal limits.",
    supportsGenerally: [
      "final report title, date, publishers, and lead author",
      "public acknowledgment of Jamie's review",
      "reported vacancy and registered-rent analysis",
      "methodology and causation limitations"
    ],
    doesNotEstablish: [
      "Jamie's report authorship or data analysis",
      "which draft edits were Jamie's",
      "individual landlord motive",
      "causation",
      "legislative passage or policy effect"
    ]
  },
  {
    id: eventSourceId,
    title: "Empty Storefronts, High Rents report release event",
    organization: "Action Lab",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-29",
    accessedAt: reviewedAt,
    canonicalUrl: "https://actionlabny.org/events",
    preferredPublicUrl: "canonical",
    publicCitation: "Action Lab event listing for the July 29, 2026 Empty Storefronts, High Rents report release and rally.",
    publicNote: "The listing establishes the event, report-release purpose, coalition setting, and campaign call to action.",
    supportsGenerally: [
      "July 29, 2026 report release and rally",
      "small-business and community-advocate participation",
      "campaign call for the Small Business Rent Stabilization Act"
    ],
    doesNotEstablish: [
      "the complete speaker roster",
      "Jamie's delivered wording",
      "news coverage",
      "legislative endorsement or passage"
    ]
  },
  {
    id: socialSourceId,
    title: "Action Lab Small Business Rent Stabilization Act campaign post",
    organization: "Action Lab",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-11",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.instagram.com/actionlabny/p/Db59xHUDq5v/",
    preferredPublicUrl: "canonical",
    publicCitation: "Action Lab public Instagram campaign post promoting the Small Business Rent Stabilization Act, reviewed August 13, 2026.",
    publicNote: "The authenticated collaborator list included Action Lab, the two state sponsors, Yant Art Space, and Main Street Alliance Action Fund; NYC Artist Coalition was not listed at the review cutoff.",
    supportsGenerally: [
      "public campaign distribution",
      "named collaborator list at the review cutoff",
      "continued post-event coalition activity"
    ],
    doesNotEstablish: [
      "Jamie's post authorship",
      "NYC Artist Coalition collaboration on the final post",
      "a complete distribution census",
      "legislative passage"
    ]
  },
  {
    id: partnerSourceId,
    title: "Protected report-review, event-planning, and post-event correspondence summary",
    organization: "Fair Rent NYC campaign partners",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Bounded source family, July 18-August 11, 2026",
    publicCitation: "Protected campaign correspondence summary; underlying messages and locators withheld.",
    publicNote: "Summary-only source for report-edit integration, speaking preparation, corrections, and follow-through boundaries.",
    supportsGenerally: [
      "invited speaking role",
      "incorporation of many report-review edits",
      "approved public acknowledgment wording",
      "media-footage request without recovered completion"
    ],
    doesNotEstablish: [
      "permission to publish raw correspondence",
      "acceptance of every proposed edit",
      "verbatim delivered remarks",
      "footage delivery or press coverage"
    ],
    protectedLocatorId: "NYCAC-CRS-PARTNER-CORRESPONDENCE-2026"
  },
  {
    id: eventRecordSourceId,
    title: "Protected July 29 event record and speech-source family",
    organization: "Fair Rent NYC governed archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Event record reviewed through August 13, 2026",
    publicCitation: "Protected July 29, 2026 event record and transcript-source family; locators withheld.",
    publicNote: "Summary-only source for formal-program participation and prepared-versus-delivered boundaries.",
    supportsGenerally: [
      "Jamie's formal-program speaking participation",
      "NYC Artist Coalition and Fair Rent NYC affiliation",
      "cultural-space and public-data speaking lane",
      "separation of prepared text from delivered transcript"
    ],
    doesNotEstablish: [
      "publication permission for audio or transcript",
      "audio-certified verbatim wording",
      "press quotation or broadcast",
      "elected-official endorsement"
    ],
    protectedLocatorId: "NYCAC-CRS-EVENT-RECORD-2026-07-29"
  },
  {
    id: officeSourceId,
    title: "Protected city and state elected-office correspondence summary",
    organization: "New York City and New York State legislative offices",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Bounded source family, July 28-August 9, 2026",
    publicCitation: "Protected elected-office correspondence summary; underlying messages and locators withheld.",
    publicNote: "Summary-only source for the city-office logistics handoff and the future state-staff alignment schedule.",
    supportsGenerally: [
      "city-office acknowledgment and internal routing of event details",
      "state-staff proposal for recurring campaign alignment",
      "future meeting scheduled for August 26, 2026"
    ],
    doesNotEstablish: [
      "office endorsement",
      "an elected official's personal position",
      "a completed August 26 meeting",
      "bill commitment, sponsorship, passage, or implementation"
    ],
    protectedLocatorId: "NYCAC-CRS-ELECTED-OFFICE-CORRESPONDENCE-2026"
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: reportClaimId,
    project: "fair-rent-nyc",
    internalClaim: "Within the July 14-August 13, 2026 source window, Jamie completed a detailed prepublication review of Empty Storefronts, High Rents; protected partner correspondence says many edits were incorporated, and the final public report credits his thoughtful and careful review.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Jamie contributed a detailed, publicly credited review of the July 2026 Empty Storefronts, High Rents report, helping strengthen factual, methodological, and traveling-claim boundaries while the research and publication remained collective work.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: reportSourceId,
        relationship: "direct-support",
        supports: ["public acknowledgment", "final report identity and limits"],
        locator: "Acknowledgments; methodology and limitations",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: partnerSourceId,
        relationship: "private-support",
        supports: ["detailed review scope", "many edits incorporated", "acknowledgment approval"],
        publicNote: "Protected correspondence supports the edit-integration claim without exposing messages or locators.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit the report's named author, publishers, research-design advisers, campaign partners, affected businesses, and other contributors.",
      "The final report can establish public credit; only protected correspondence supports the statement that many edits were incorporated.",
      "Any public projection requires Jamie's editorial approval and a fresh claim/source review."
    ],
    antiClaims: [
      "Jamie authored the report or performed its data analysis.",
      "Jamie designed the research, supplied every limitation, or secured acceptance of every proposed edit.",
      "The report proves landlord motive, vacancy causation, legislative passage, or policy effects."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: speakingClaimId,
    project: "fair-rent-nyc",
    internalClaim: "Jamie spoke in the formal program of the July 29, 2026 Empty Storefronts, High Rents press conference and rally, representing the NYC Artist Coalition and Fair Rent NYC cultural-space and public-data lane alongside small-business advocates and state elected officials.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "At the report's July 29 press conference, Jamie made the cultural-space case for commercial rent stabilization and translated the report's descriptive data into a bounded public argument for action.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: eventRecordSourceId,
        relationship: "private-support",
        supports: ["formal speaking participation", "affiliation", "speaking lane"],
        publicNote: "Protected event and transcript derivatives support participation while verbatim quotation remains held.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: eventSourceId,
        relationship: "corroborating",
        supports: ["public event date, purpose, and campaign context"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: reportSourceId,
        relationship: "context",
        supports: ["report identity, findings, and methodological boundary"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Prepared text, delivered speech, organizer recollection, and published media are separate evidence classes.",
      "Keep the public program collective and do not convert co-presence with elected officials into endorsement."
    ],
    antiClaims: [
      "The prepared remarks are a verbatim transcript of the delivered speech.",
      "The footage request proves footage delivery, an interview, quotation, broadcast, or resulting coverage.",
      "Jamie was the sole campaign speaker, report author, or cause of any legislative action.",
      "Speaking alongside elected officials proves their endorsement of Jamie or every campaign position."
    ],
    researchInquiryIds: [deliveredRemarksInquiryId, followThroughInquiryId],
    reviewedAt,
    reviewedBy
  },
  {
    id: alignmentClaimId,
    project: "fair-rent-nyc",
    internalClaim: "Within the source window, Jamie completed a city-office event-information handoff and entered a state-staff recurring campaign-alignment channel whose first future meeting was scheduled for August 26, 2026.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "technical-operations",
        text: "Jamie translated frontline campaign activity into governed follow-through: a completed City Council office handoff and a scheduled recurring state-staff alignment channel, with status and authority boundaries kept explicit.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: officeSourceId,
        relationship: "private-support",
        supports: ["city-office routing", "state-staff recurring-alignment proposal", "future meeting schedule"],
        publicNote: "Protected office correspondence supports workflow status without exposing contacts or message contents.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: socialSourceId,
        relationship: "supports-boundary",
        supports: ["NYC Artist Coalition was not a final listed collaborator at the review cutoff"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Status language must distinguish offered, routed, scheduled, held, adopted, and completed.",
      "Office contact and campaign coordination are operating evidence, not policy authority."
    ],
    antiClaims: [
      "The City Council office endorsed the bill, attended the event, or took legislative action because information was routed.",
      "The scheduled state-staff alignment meeting had already occurred by August 13, 2026.",
      "The alignment channel commits an elected official or office to bill language, sponsorship, passage, or implementation.",
      "NYC Artist Coalition became a collaborator on the final campaign social post."
    ],
    researchInquiryIds: [followThroughInquiryId],
    reviewedAt,
    reviewedBy
  }
];

const entities: KnowledgeBank["entities"] = [
  {
    id: "ENT-NYCAC-CRS-SBU-REPORT-LAUNCH-2026",
    name: "Empty Storefronts, High Rents report launch and press conference",
    kind: "event",
    aliases: ["July 29, 2026 Small Business United report rally"],
    publicSafe: true
  }
];

const agencyRelations: KnowledgeBank["agencyRelations"] = [
  {
    id: "AGENCY-NYCAC-CRS-PRESS-CONFERENCE-SPEAKING-2026",
    project: "fair-rent-nyc",
    actorIds: ["ENT-JAMIE-BURKART"],
    action: "spoke-at",
    objectId: "ENT-NYCAC-CRS-SBU-REPORT-LAUNCH-2026",
    purpose: "Bring a cultural-space and bounded public-data perspective to the report launch's case for commercial rent stabilization.",
    result: "Jamie participated in the formal speaking program alongside small-business advocates and state elected officials.",
    creditScope: "shared",
    status: "confirmed-with-boundary",
    claimIds: [speakingClaimId],
    sourceIds: [eventRecordSourceId, eventSourceId],
    sourceSupportKeys: [
      "Jamie's formal-program speaking participation",
      "July 29, 2026 report release and rally"
    ],
    boundaries: [
      "Co-presence does not establish endorsement, joint authorship, media placement, or causal influence on legislation.",
      "Verbatim speech projection remains held pending original-audio and speaker review."
    ],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: deliveredRemarksInquiryId,
    project: "fair-rent-nyc",
    question: "What wording was delivered in Jamie's July 29 formal speaking turn, and what rights and speaker review are required before any quotation?",
    methods: [
      "Kept the prepared statement, machine-derived speech text, event record, and original recording as distinct source objects.",
      "Used the protected event record only to establish formal-program participation and speaking lane.",
      "Required original-audio comparison and Jamie speaker review before verbatim quotation."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Jamie's formal speaking participation and affiliation are corroborated.",
      "Prepared and delivered wording are not collapsed into one transcript.",
      "No verbatim delivered quotation is authorized for public projection in this candidate."
    ],
    limitations: [
      "The protected transcript derivatives were not treated as audio-certified.",
      "Raw event media, third-party speech, and authenticated locators remain outside the public repository."
    ],
    sourceIds: [eventRecordSourceId, partnerSourceId, eventSourceId],
    publicSummary: "Formal participation is established; verbatim delivered wording remains held pending original-audio, speaker, rights, and editorial review.",
    protectedLocatorId: "NYCAC-CRS-DELIVERED-REMARKS-REVIEW-2026"
  },
  {
    id: followThroughInquiryId,
    project: "fair-rent-nyc",
    question: "Which post-event opportunities became completed outcomes by the August 13 cutoff?",
    methods: [
      "Reviewed bounded campaign and elected-office correspondence through August 13.",
      "Checked the authenticated final social-post collaborator list.",
      "Separated requested, routed, scheduled, held, published, and completed states."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The city-office information handoff was completed.",
      "A recurring state-staff alignment channel was proposed and its first future meeting scheduled.",
      "The reviewed sources did not establish footage delivery, resulting coverage, or NYC Artist Coalition collaboration on the final social post."
    ],
    limitations: [
      "The August 26 meeting was future-dated at the evidence cutoff and must not be backfilled as occurred.",
      "Absence of a completion record in the bounded source set is not proof that no later outcome occurred."
    ],
    sourceIds: [partnerSourceId, officeSourceId, socialSourceId],
    publicSummary: "The city-office handoff completed and a state-staff alignment meeting was scheduled; media delivery, resulting coverage, and final coalition-account collaboration were not established by the cutoff.",
    protectedLocatorId: "NYCAC-CRS-FOLLOW-THROUGH-2026"
  }
];

export const nycacCrsFrontlineAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  entities,
  agencyRelations,
  researchInquiries
};
