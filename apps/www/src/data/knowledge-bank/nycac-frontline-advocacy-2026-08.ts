import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-12";
const reviewedBy = ["Jamie Burkart", "Codex governed-archive review"];
const intakeId = "INTAKE-NYCAC-FRONTLINE-ADVOCACY-2026-08";
const claimId = "CLM-NYCAC-FRONTLINE-ADVOCACY-2026-08";
const inquiryId = "INQ-NYCAC-FRONTLINE-ADVOCACY-PUBLICATION-2026-08";

const sourceIds = {
  report: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-28",
  publicEvent: "SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29",
  transcript: "SRC-NYCAC-SBU-REPORT-LAUNCH-TRANSCRIPT-2026-07-29",
  correspondence: "SRC-NYCAC-FRONTLINE-ADVOCACY-CORRESPONDENCE-2026-08",
  social: "SRC-ACTION-LAB-SBU-INSTAGRAM-2026-08-11"
} as const;

const observationIds = [
  "OBS-NYCAC-SBU-REPORT-REVIEW-CREDIT-2026-07",
  "OBS-NYCAC-SBU-PUBLIC-STATEMENT-2026-07-29",
  "OBS-NYCAC-CITY-OFFICE-EVENT-HANDOFF-2026-07",
  "OBS-NYCAC-STATE-OFFICE-COORDINATION-2026-08",
  "OBS-NYCAC-SBU-MEDIA-REQUEST-BOUNDARY-2026-07",
  "OBS-NYCAC-SBU-INSTAGRAM-CREDIT-STATE-2026-08"
] as const;

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "NYC Artist Coalition frontline advocacy review, July 13-August 12, 2026",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex governed-archive review",
    projectIds: ["nyc-artist-coalition", "fair-rent-nyc"],
    reason: "Reconcile public event, report, correspondence, transcript, social, and local archival evidence into bounded claims about advocacy, report review, and official-staff coordination.",
    visibility: "protected",
    disposition: "integrated",
    sourceIds: Object.values(sourceIds),
    observationIds: [...observationIds],
    researchInquiryIds: [inquiryId],
    boundaries: [
      "Keep public speaking, bounded report review, city-office logistics, state-office coordination, media outreach, and campaign publication as separate actions.",
      "A final-report acknowledgment does not establish report authorship, data analysis, legal review, editorial control, or ownership of the report's causal claims.",
      "Repository access, source sensitivity, publication authority, portfolio selection, attribution, and collective credit remain separate human-governed states."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: observationIds[0],
    intakeId,
    sourceId: sourceIds.report,
    comparisonSourceIds: [sourceIds.correspondence],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "The exact July 28 report edition publicly thanks Jamie, identified through NYC Artist Coalition and Fair Rent NYC, for thoughtful and careful review of the draft report; the correspondence record shows the review focused on factual accuracy, source and method clarity, current bill language, and claim scope.",
    locator: "Public acknowledgment page and protected review record",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "Jamie did not rerun the analysis and is not identified as an author, analyst, lawyer, editor, or report owner.",
      "The final report retains stronger causal language than its descriptive vacancy-and-rent comparison can establish by itself."
    ]
  },
  {
    id: observationIds[1],
    intakeId,
    sourceId: sourceIds.transcript,
    comparisonSourceIds: [sourceIds.publicEvent],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "A protected authenticated transcript confirms that Jamie delivered a July 29 public statement connecting cultural-space survival, commercial rent stabilization, public data, and aligned city and state action in the same formal program as State Senator Julia Salazar and Assembly Member Emily Gallagher.",
    locator: "Bounded formal-program transcript review",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "Shared appearance establishes participation in one public program, not endorsement of Jamie or shared authorship of every position.",
      "Council Member Christopher Marte did not speak in the recovered transcript; his office's event presence remains distinct from Council-member participation."
    ]
  },
  {
    id: observationIds[2],
    intakeId,
    sourceId: sourceIds.correspondence,
    comparisonSourceIds: [sourceIds.publicEvent],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "Jamie contacted Council Member Christopher Marte's office, supplied corrected event details, and connected the office with the event organizers while explicitly identifying himself as a speaker rather than the event organizer.",
    locator: "Protected call and email disposition summary",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "The handoff did not establish Council-member attendance, sponsorship, drafting work, endorsement, or a substantive office position.",
      "The external event page still presents a conflicting street number and imprecise city-versus-state call to action."
    ]
  },
  {
    id: observationIds[3],
    intakeId,
    sourceId: sourceIds.correspondence,
    comparisonSourceIds: [],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "After an August 5 follow-up call, the Assembly sponsor's deputy chief of staff proposed a monthly coordination meeting with Jamie and a coalition organizer; the first meeting was scheduled for August 26 and had not occurred by the close of this review window.",
    locator: "Protected state-office correspondence disposition summary",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "A proposed and scheduled cadence is coordination infrastructure, not a completed meeting, formal appointment, policy decision, legislative outcome, or endorsement.",
      "The call and email content are private political correspondence and are not approved for quotation or public repository release."
    ]
  },
  {
    id: observationIds[4],
    intakeId,
    sourceId: sourceIds.correspondence,
    comparisonSourceIds: [],
    project: "fair-rent-nyc",
    kind: "limitation",
    text: "An event organizer relayed an urgent request for video from a television outlet, but the bounded review recovered no resulting broadcast, article, published Jamie quotation, or permission-cleared media artifact.",
    locator: "Protected media-request disposition summary",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "An inbound request is a media lead, not coverage.",
      "Jamie's prepared press quotation was submitted to organizers, but no publication of that quotation was recovered."
    ]
  },
  {
    id: observationIds[5],
    intakeId,
    sourceId: sourceIds.social,
    comparisonSourceIds: [sourceIds.correspondence],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "The August 11 public campaign carousel was recovered, but its authenticated collaborator list did not include NYCArtC at the time of review even though a collaborator invitation and Jamie's acceptance were present in protected correspondence.",
    locator: "Public social post and authenticated collaborator-list observation",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "The invitation and acceptance do not establish completed platform credit.",
      "The carousel is campaign media and cannot independently prove Jamie's public speaking role, report contribution, or its own causal policy claims."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: sourceIds.report,
    title: "Empty Storefronts, High Rents — final report edition",
    organization: "The Action Lab and Small Business United",
    kind: "published-article",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2026-07-28",
    accessedAt: reviewedAt,
    publicCitation: "The Action Lab and Small Business United, Empty Storefronts, High Rents, exact 20-page final edition dated July 28, 2026.",
    publicNote: "The exact edition is preserved in the governed archive with SHA-256 a864510ba1d5cf961659b536c08ff581146bfc081a7c621fc206baf4473dbe2f; no email attachment route or private locator is exposed.",
    protectedLocatorId: "ARCHIVE-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-28",
    supportsGenerally: [
      "exact final-edition identity",
      "public acknowledgment of Jamie's thoughtful and careful draft review",
      "descriptive comparison of registered rents and storefront vacancy"
    ],
    doesNotEstablish: [
      "Jamie as report author, analyst, lawyer, or editor",
      "that every proposed review change was incorporated",
      "that rent and vacancy data alone prove landlord motive, deliberate warehousing, or a financing mechanism",
      "permission to redistribute the report from a private message attachment"
    ]
  },
  {
    id: sourceIds.publicEvent,
    title: "Empty Storefronts, High Rents public report launch",
    organization: "The Action Lab",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-29",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.actionlabny.org/event-details/empty-storefronts-high-rents-why-nyc-needs-commercial-rent-stabilization",
    preferredPublicUrl: "canonical",
    publicCitation: "The Action Lab public event page for the July 29, 2026 Empty Storefronts, High Rents report launch.",
    publicNote: "The page corroborates the public event and report-release purpose but retains an address discrepancy and an imprecise city-versus-state call to action.",
    supportsGenerally: ["July 29 public report launch", "commercial rent stabilization campaign context"],
    doesNotEstablish: [
      "the formal speaker roster",
      "Jamie's delivered statement",
      "a corrected event address",
      "Council Member Marte as a speaker",
      "report authorship or contribution allocation"
    ]
  },
  {
    id: sourceIds.transcript,
    title: "Protected July 29 report-launch transcript comparison",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation: "Authenticated transcript comparison for the July 29, 2026 Small Business United report launch.",
    publicNote: "The public-safe record preserves role, sequence, bounded duration, and a source fingerprint while withholding verbatim speech, authenticated URLs, audio locators, contact data, and sensitive personal details.",
    protectedLocatorId: "ARCHIVE-NYCAC-SBU-REPORT-LAUNCH-TRANSCRIPT-2026-07-29",
    supportsGenerally: [
      "Jamie's delivered public statement",
      "Julia Salazar and Emily Gallagher in the same formal program",
      "Council Member Marte not speaking in the recovered transcript"
    ],
    doesNotEstablish: [
      "permission to republish the full transcript or audio",
      "endorsement of Jamie by another speaker",
      "Council Member Marte's attendance or participation",
      "media publication of Jamie's remarks"
    ]
  },
  {
    id: sourceIds.correspondence,
    title: "Protected frontline advocacy correspondence and call review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: reviewedAt,
    publicCitation: "Governed July 13-August 12, 2026 correspondence, call, attachment, and document review for NYC Artist Coalition and Fair Rent NYC advocacy.",
    publicNote: "Only dispositions and bounded claims enter Git. Raw bodies, contact data, signatures, authenticated routes, local paths, and private political or coalition context remain in governed custody.",
    protectedLocatorId: "RESEARCH-NYCAC-FRONTLINE-ADVOCACY-2026-08",
    supportsGenerally: [
      "scope and limits of Jamie's report review",
      "city-office event-information handoff",
      "proposed and scheduled monthly state-office coordination",
      "historical 2019 field-method context",
      "media request without recovered publication",
      "social collaborator invitation and acceptance"
    ],
    doesNotEstablish: [
      "report authorship",
      "Council Member Marte as event speaker",
      "completed August 26 meeting or subsequent outcome",
      "current-window canvassing or new 51-district field deployment",
      "published press coverage",
      "completed Instagram collaborator credit"
    ]
  },
  {
    id: sourceIds.social,
    title: "Empty Storefronts campaign carousel, August 11, 2026",
    organization: "The Action Lab",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-11",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.instagram.com/actionlabny/p/Db59xHUDq5v/",
    preferredPublicUrl: "canonical",
    publicCitation: "The Action Lab public Instagram carousel promoting the Small Business Rent Stabilization Act, August 11, 2026.",
    publicNote: "The post was inspected through an authenticated public-post view; the public-safe record reports only the visible publication and collaborator state.",
    supportsGenerally: [
      "campaign carousel publication",
      "visible collaborators include the two state sponsors"
    ],
    doesNotEstablish: [
      "NYCArtC as a completed collaborator at review time",
      "Jamie as carousel author or subject",
      "Jamie's July 29 speaking role",
      "causal proof for the carousel's policy claims"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "fair-rent-nyc",
    internalClaim: "During the July 13-August 12, 2026 review window, Jamie contributed a bounded prepublication review that the final report publicly acknowledged, delivered a public cultural-space argument for commercial rent stabilization in a formal program with both state sponsors, completed a city-office event-information handoff, and helped establish a future monthly state-office coordination cadence.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "In July and August 2026, Jamie reviewed a storefront-vacancy report before publication, delivered a public cultural-space argument for commercial rent stabilization, connected event organizers with a City Council office, and helped establish a recurring coordination cadence with a state sponsor's staff.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      { sourceId: sourceIds.report, relationship: "direct-support", supports: ["public final-report acknowledgment", "exact final edition"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.transcript, relationship: "private-support", supports: ["Jamie's delivered public statement", "formal-program context"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.publicEvent, relationship: "corroborating", supports: ["public event and report-release purpose"], confidence: "high", renderCitation: true },
      { sourceId: sourceIds.correspondence, relationship: "private-support", supports: ["bounded review scope", "city-office handoff", "future state-office coordination", "media and social credit limits"], confidence: "high", renderCitation: false },
      { sourceId: sourceIds.social, relationship: "supports-boundary", supports: ["published campaign carousel", "observed collaborator list"], confidence: "high", renderCitation: true }
    ],
    boundaries: [
      "Use reviewer or contributor language for the report, never author, co-author, analyst, legal reviewer, or editor.",
      "City and state work is aligned but not interchangeable: event logistics with a Council office and recurring coordination with state sponsor staff are different relationships and actions.",
      "The August 26 meeting was scheduled but had not occurred by the review date.",
      "A media request and a prepared press quote do not establish published coverage.",
      "The final report's descriptive findings do not by themselves prove landlord motive, deliberate warehousing, or a financing mechanism."
    ],
    antiClaims: [
      "Jamie authored or co-authored Empty Storefronts, High Rents.",
      "Jamie reran or validated the report's analysis.",
      "Jamie organized or owned the July 29 event.",
      "Council Member Christopher Marte spoke at the event or endorsed Jamie.",
      "The scheduled August meeting produced a policy or legislative outcome.",
      "NBC or another press outlet published Jamie's remarks or prepared quotation.",
      "NYCArtC received completed collaborator credit on the August 11 post.",
      "Jamie's work alone caused campaign, press, legislative, or government action."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: inquiryId,
    project: "fair-rent-nyc",
    question: "Which July-August 2026 advocacy findings should remain in governed memory, enter subject repositories, or become a public portfolio claim after source-owner and Jamie review?",
    methods: [
      "Maintain source-specific dispositions across public event, exact report edition, private correspondence, protected transcripts, public social post, and local archival derivatives.",
      "Seek an owner-hosted final report URL or redistribution permission before exposing the attachment-derived edition.",
      "Verify any later August 26 meeting outcome, media publication, corrected event page, or completed social collaborator state as a new dated source encounter."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The final report supplies public external credit for Jamie's bounded review.",
      "The authenticated transcript confirms Jamie spoke in the same formal program as both state sponsors.",
      "Private records support distinct city-office logistics and future state-office coordination claims.",
      "No resulting television coverage, published prepared quote, corrected external event page, or completed NYCArtC collaborator credit was recovered."
    ],
    limitations: [
      "This was a bounded July 13-August 12 query-family review, not a universal census of every account, device, platform, or stakeholder archive.",
      "No third party was contacted and no private content was cleared for quotation or public release.",
      "Future events and later source-state changes fall outside this review window."
    ],
    sourceIds: Object.values(sourceIds),
    publicSummary: "The strongest mature facts are Jamie's publicly acknowledged report review and July 29 public advocacy; staff coordination, media, social credit, redistribution, and causal claims retain narrower states and human gates.",
    protectedLocatorId: "INQUIRY-NYCAC-FRONTLINE-ADVOCACY-PUBLICATION-2026-08"
  }
];

export const nycacFrontlineAdvocacyAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
