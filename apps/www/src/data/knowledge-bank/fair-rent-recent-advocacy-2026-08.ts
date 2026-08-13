import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-12";
const reviewedBy = ["Jamie Burkart", "Codex authenticated source review"];
const recentIntakeId = "INTAKE-FAIRRENT-RECENT-ADVOCACY-2026-07-29";
const coordinationIntakeId = "INTAKE-FAIRRENT-RECENT-COORDINATION-2026-08";
const statusIntakeId = "INTAKE-FAIRRENT-OFFICIAL-STATUS-2026-08";
const carouselIntakeId = "INTAKE-SBU-CAROUSEL-DATA-CHECK-2026-08";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: recentIntakeId,
    kind: "public-artifact",
    title: "July 2026 Small Business United report review and public launch",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated source review",
    projectIds: ["fair-rent-nyc", "commercial-rent-stabilization"],
    reason: "Preserve Jamie's bounded report review and public cultural-space argument while keeping authorship, editorial authority, media placement, policy adoption, and collective campaign outcomes separate.",
    sourceUrl: "https://actionlabny.org/events/small-business-united-rally",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      "SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29",
      "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-29",
      "SRC-JAMIE-SBU-REPORT-REVIEW-2026-07-25",
      "SRC-FAIRRENT-JULY29-DELIVERED-REMARKS-TRANSCRIPT"
    ],
    observationIds: [
      "OBS-SBU-REPORT-FINAL-ACKNOWLEDGMENT-2026",
      "OBS-SBU-REPORT-REVIEW-DISPOSITION-2026",
      "OBS-FAIRRENT-JULY29-PUBLIC-SPEECH-2026"
    ],
    researchInquiryIds: ["INQ-FAIRRENT-PRESS-PLACEMENT-2026-08"],
    boundaries: [
      "The final report credits a bounded review; it does not establish co-authorship, data-analysis ownership, legal approval, or final editorial authority.",
      "Speaking at a public report launch does not establish a published press quotation, broadcast placement, endorsement, bill passage, or campaign impact.",
      "The protected draft, correspondence, and automated transcript remain outside the public bundle."
    ]
  },
  {
    id: coordinationIntakeId,
    kind: "analysis-note",
    title: "Protected post-event elected-office coordination records",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated source review",
    projectIds: ["fair-rent-nyc", "commercial-rent-stabilization"],
    reason: "Register the existence and disposition of recent office-staff coordination without publishing correspondence, private quotations, contact details, uncompleted asks, or future meeting logistics.",
    visibility: "protected",
    disposition: "protected",
    sourceIds: ["SRC-FAIRRENT-RECENT-OFFICIAL-COORDINATION-RECORDS-2026-08"],
    observationIds: ["OBS-FAIRRENT-RECENT-OFFICIAL-COORDINATION-HOLD-2026-08"],
    researchInquiryIds: ["INQ-FAIRRENT-RECENT-OFFICIAL-COORDINATION-PUBLIC-USE"],
    boundaries: [
      "Access to correspondence and a private call record is not permission to publish or attribute counterpart statements.",
      "A proposed or scheduled meeting is not a completed meeting, formal role, endorsement, commitment, or policy outcome.",
      "No public wording is authorized. Jamie approval is required, and counterpart review may also be required."
    ]
  },
  {
    id: statusIntakeId,
    kind: "public-url",
    title: "Current official Commercial Rent Stabilization legislative status",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex official-source review",
    projectIds: ["fair-rent-nyc", "commercial-rent-stabilization"],
    reason: "Anchor current bill and Council-resolution language in official records instead of private recollection or campaign shorthand.",
    sourceUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=8F4D668A-9741-4F3F-9EC4-2F84CC8592C6&ID=8067758",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      "SRC-NYS-A5568A-2025-2026",
      "SRC-NYS-S8319-2025-2026",
      "SRC-NYC-COUNCIL-RES-0496-2026"
    ],
    observationIds: ["OBS-FAIRRENT-CURRENT-LEGISLATIVE-STATUS-2026-08-12"],
    researchInquiryIds: [],
    boundaries: [
      "Legislative status is time-sensitive and must be rechecked before reuse.",
      "Introduction, committee referral, sponsorship, and advocacy are not passage or enactment."
    ]
  },
  {
    id: carouselIntakeId,
    kind: "public-url",
    title: "August 2026 Small Business United carousel numerical check",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex authenticated visual review",
    projectIds: ["fair-rent-nyc", "commercial-rent-stabilization"],
    reason: "Prevent a tenfold caption-to-graphic conflict from entering the Knowledge Wiki or portfolio as settled evidence.",
    sourceUrl: "https://www.instagram.com/actionlabny/p/Db59xHUDq5v/",
    visibility: "public-safe",
    disposition: "researching",
    sourceIds: [
      "SRC-SBU-INSTAGRAM-CAROUSEL-2026-08-11",
      "SRC-NYC-COUNCIL-RES-0496-2026"
    ],
    observationIds: ["OBS-SBU-CAROUSEL-BUSINESS-CLOSURES-CONFLICT-2026-08"],
    researchInquiryIds: ["INQ-SBU-CAROUSEL-BUSINESS-CLOSURES-2026-08"],
    boundaries: [
      "Do not reuse the caption's 84,000 figure while the graphic and official Council source say 8,400.",
      "A public correction remains the publisher's decision; this record controls only this ecosystem's reuse."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-SBU-REPORT-FINAL-ACKNOWLEDGMENT-2026",
    intakeId: recentIntakeId,
    sourceId: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-29",
    comparisonSourceIds: ["SRC-JAMIE-SBU-REPORT-REVIEW-2026-07-25"],
    project: "fair-rent-nyc",
    kind: "source-fact",
    text: "The released report acknowledges Jamie, in his NYC Artist Coalition and Fair Rent NYC context, for a thoughtful and careful draft review.",
    locator: "Final report, acknowledgments page.",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-FAIRRENT-REPORT-REVIEW-2026"],
    researchInquiryIds: [],
    limitations: [
      "The acknowledgment supports review credit, not co-authorship, data-analysis ownership, legal review, final editorial authority, or endorsement of every claim."
    ]
  },
  {
    id: "OBS-SBU-REPORT-REVIEW-DISPOSITION-2026",
    intakeId: recentIntakeId,
    sourceId: "SRC-JAMIE-SBU-REPORT-REVIEW-2026-07-25",
    comparisonSourceIds: ["SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-29"],
    project: "fair-rent-nyc",
    kind: "bounded-inference",
    text: "A bounded comparison shows that the final report adopted factual corrections, clearer bill mechanics, fuller limitations language, expanded source notes, and more legible maps from Jamie's review while retaining some causal and motive language he had flagged as unsupported.",
    locator: "Protected tracked review compared with the released 20-page report.",
    status: "corroborated",
    publicSafe: true,
    claimIds: ["CLM-FAIRRENT-REPORT-REVIEW-2026"],
    researchInquiryIds: [],
    limitations: [
      "The comparison does not assign every edit to one reviewer or establish that every suggestion was adopted.",
      "The final report team's editorial and methodological authority remained separate from Jamie's review."
    ]
  },
  {
    id: "OBS-FAIRRENT-JULY29-PUBLIC-SPEECH-2026",
    intakeId: recentIntakeId,
    sourceId: "SRC-FAIRRENT-JULY29-DELIVERED-REMARKS-TRANSCRIPT",
    comparisonSourceIds: ["SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29"],
    project: "commercial-rent-stabilization",
    kind: "source-fact",
    text: "Jamie spoke publicly at the July 29 report launch as an NYC Artist Coalition member, connecting commercial rent predictability to the continuity and safety of neighborhood cultural spaces while crediting the report team and public-data work.",
    locator: "Protected automated transcript; Jamie's delivered segment cross-checked against the public event record.",
    status: "corroborated",
    publicSafe: true,
    claimIds: ["CLM-FAIRRENT-PUBLIC-SPEECH-2026-07-29"],
    researchInquiryIds: ["INQ-FAIRRENT-PRESS-PLACEMENT-2026-08"],
    limitations: [
      "The transcript is automated rather than certified and remains protected.",
      "Public speaking at a press-facing event does not by itself prove a published quotation, interview, broadcast, or attributable policy effect."
    ]
  },
  {
    id: "OBS-FAIRRENT-RECENT-OFFICIAL-COORDINATION-HOLD-2026-08",
    intakeId: coordinationIntakeId,
    sourceId: "SRC-FAIRRENT-RECENT-OFFICIAL-COORDINATION-RECORDS-2026-08",
    comparisonSourceIds: [],
    project: "fair-rent-nyc",
    kind: "limitation",
    text: "Protected records support a fuller account of post-event office-staff coordination, evidence transfer, and a proposed recurring alignment cadence; no public account of those interactions is authorized in this candidate.",
    locator: "Protected coordination corpus; public-safe disposition only.",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-FAIRRENT-RECENT-OFFICIAL-COORDINATION-2026-08"],
    researchInquiryIds: ["INQ-FAIRRENT-RECENT-OFFICIAL-COORDINATION-PUBLIC-USE"],
    limitations: [
      "The public repository does not reproduce private correspondence, quotations, names of staff participants, contact details, or future meeting logistics.",
      "The records do not establish endorsement, formal appointment, completed future work, or legislation caused by Jamie."
    ]
  },
  {
    id: "OBS-FAIRRENT-CURRENT-LEGISLATIVE-STATUS-2026-08-12",
    intakeId: statusIntakeId,
    sourceId: "SRC-NYC-COUNCIL-RES-0496-2026",
    comparisonSourceIds: ["SRC-NYS-A5568A-2025-2026", "SRC-NYS-S8319-2025-2026"],
    project: "commercial-rent-stabilization",
    kind: "source-fact",
    text: "As checked August 12, 2026, A5568A and S8319 are active in their respective Cities committees, while New York City Council Resolution 496 has been introduced and referred to the Committee on Small Business.",
    locator: "Official bill detail and Council Legistar status pages.",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-FAIRRENT-CURRENT-LEGISLATIVE-STATUS-2026-08-12"],
    researchInquiryIds: [],
    limitations: [
      "This is an access-date status, not a durable outcome.",
      "None of the cited records establishes passage or enactment."
    ]
  },
  {
    id: "OBS-SBU-CAROUSEL-BUSINESS-CLOSURES-CONFLICT-2026-08",
    intakeId: carouselIntakeId,
    sourceId: "SRC-SBU-INSTAGRAM-CAROUSEL-2026-08-11",
    comparisonSourceIds: ["SRC-NYC-COUNCIL-RES-0496-2026"],
    project: "commercial-rent-stabilization",
    kind: "limitation",
    text: "The August 11 Instagram caption says 84,000 businesses closed in Q2 2025, while its own second carousel graphic and Council Resolution 496 say 8,400.",
    locator: "Public caption and carousel slide 2; Council resolution text.",
    status: "contested",
    publicSafe: true,
    claimIds: ["CLM-SBU-CAROUSEL-COUNT-CONFLICT-2026-08"],
    researchInquiryIds: ["INQ-SBU-CAROUSEL-BUSINESS-CLOSURES-2026-08"],
    limitations: [
      "This establishes an internal publication conflict; it does not by itself identify how the error occurred or authorize editing the publisher's post."
    ]
  },
  {
    id: "OBS-FAIRRENT-PRESS-PLACEMENT-NOT-RECOVERED-2026",
    intakeId: recentIntakeId,
    sourceId: "SRC-FAIRRENT-LAST-30-DAY-RESEARCH-2026-08-12",
    comparisonSourceIds: ["SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29"],
    project: "fair-rent-nyc",
    kind: "limitation",
    text: "The bounded review recovered a press-facing public event, prepared press language, and a request for video, but did not recover a published Jamie quotation, completed interview, broadcast placement, or indexed press article from the reviewed window.",
    locator: "July 13-August 12 authenticated archive and public-web search run.",
    status: "verified",
    publicSafe: true,
    claimIds: ["CLM-FAIRRENT-PRESS-PLACEMENT-NOT-RECOVERED-2026"],
    researchInquiryIds: ["INQ-FAIRRENT-PRESS-PLACEMENT-2026-08"],
    limitations: [
      "A bounded negative search does not establish nonexistence.",
      "Requests, drafts, and event participation are not proof of publication or broadcast."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: "SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29",
    title: "Small Business United release of Empty Storefronts, High Rents",
    organization: "The Action Lab / Small Business United",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-29",
    accessedAt: reviewedAt,
    canonicalUrl: "https://actionlabny.org/events/small-business-united-rally",
    preferredPublicUrl: "canonical",
    publicCitation: "The Action Lab, 'Join Small Business United for the Release of Empty Storefronts, High Rents,' July 29, 2026.",
    publicNote: "Public event record for the report launch and Commercial Rent Stabilization advocacy gathering.",
    supportsGenerally: ["July 29 public report launch", "Small Business Rent Stabilization Act advocacy"],
    doesNotEstablish: ["complete speaker roster", "Jamie's delivered wording", "published media placement", "attendance total", "legislative outcome"]
  },
  {
    id: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-29",
    title: "Empty Storefronts, High Rents: Why New York City Needs Commercial Rent Stabilization",
    organization: "Small Business United / Action Lab / Main Street Alliance",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-07-29",
    accessedAt: reviewedAt,
    publicCitation: "Small Business United, Action Lab, and Main Street Alliance, 'Empty Storefronts, High Rents: Why New York City Needs Commercial Rent Stabilization,' released July 29, 2026.",
    publicNote: "The released 20-page report names its lead author and analyst, credits guidance and design feedback, and acknowledges Jamie's bounded draft review.",
    supportsGenerally: ["final acknowledgment of Jamie's bounded review", "released report text and limitations language", "final editorial disposition"],
    doesNotEstablish: ["Jamie as co-author", "Jamie as data analyst", "Jamie as legal reviewer", "Jamie's endorsement of every report claim", "public republication rights for the stored PDF"],
    protectedLocatorId: "PROTECTED-FAIRRENT-FINAL-REPORT-2026-07-29"
  },
  {
    id: "SRC-JAMIE-SBU-REPORT-REVIEW-2026-07-25",
    title: "Jamie Burkart pre-event review of Empty Storefronts, High Rents",
    organization: "Fair Rent NYC / NYC Artist Coalition",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-25",
    accessedAt: reviewedAt,
    publicCitation: "Protected July 25, 2026, pre-event review of the Small Business United report draft; public-safe metadata only.",
    publicNote: "Tracked review covering factual precision, source comparability, bill mechanics, limitations, accessibility, and claim scope.",
    supportsGenerally: ["Jamie's pre-publication factual and source review", "claim-scope and bill-mechanics corrections", "review recommendations not adopted"],
    doesNotEstablish: ["co-authorship", "methodological ownership", "legal approval", "final editorial authority", "acceptance of every recommendation"],
    protectedLocatorId: "PROTECTED-FAIRRENT-REPORT-REVIEW-2026-07-25"
  },
  {
    id: "SRC-FAIRRENT-JULY29-DELIVERED-REMARKS-TRANSCRIPT",
    title: "Protected automated transcript of July 29 report launch",
    organization: "Fair Rent NYC campaign archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-29",
    accessedAt: reviewedAt,
    publicCitation: "Protected automated transcript of the July 29, 2026, Small Business United report launch; public-safe metadata only.",
    publicNote: "Used only to verify the existence and themes of Jamie's delivered public remarks; no third-party transcript text is published.",
    supportsGenerally: ["Jamie spoke at the July 29 launch", "cultural-space and commercial-rent framing", "credit to report and public-data collaborators"],
    doesNotEstablish: ["a certified verbatim transcript", "media placement", "audience size", "policy adoption", "counterpart consent to publish transcript text"],
    protectedLocatorId: "PROTECTED-FAIRRENT-JULY29-TRANSCRIPT-2026"
  },
  {
    id: "SRC-FAIRRENT-RECENT-OFFICIAL-COORDINATION-RECORDS-2026-08",
    title: "Protected recent elected-office coordination corpus",
    organization: "Fair Rent NYC campaign archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-08",
    accessedAt: reviewedAt,
    publicCitation: "Protected July-August 2026 elected-office coordination records; public-safe disposition only.",
    publicNote: "Registers that current coordination evidence exists without exposing correspondence, private statements, contact details, or future logistics.",
    supportsGenerally: ["existence of post-event follow-through", "transfer of a governed legislative-provenance artifact", "proposed recurring alignment cadence"],
    doesNotEstablish: ["counterpart endorsement", "formal campaign appointment", "completed future meeting", "policy commitment", "legislative outcome caused by Jamie"],
    protectedLocatorId: "PROTECTED-FAIRRENT-OFFICIAL-COORDINATION-2026-08"
  },
  {
    id: "SRC-NYS-A5568A-2025-2026",
    title: "New York State Assembly Bill A5568A",
    organization: "New York State Legislature",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2025-05-27",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.nysenate.gov/legislation/bills/2025/A5568/amendment/A",
    preferredPublicUrl: "canonical",
    publicCitation: "New York State Legislature, A5568A, New York City Small Business Rent Stabilization Act, status accessed August 12, 2026.",
    supportsGenerally: ["active Assembly bill", "Assembly Cities committee", "bill text and mechanics"],
    doesNotEstablish: ["passage", "enactment", "implementation", "advocate-specific causation"]
  },
  {
    id: "SRC-NYS-S8319-2025-2026",
    title: "New York State Senate Bill S8319",
    organization: "New York State Legislature",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-02-13",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.nysenate.gov/legislation/bills/2025/S8319",
    preferredPublicUrl: "canonical",
    publicCitation: "New York State Legislature, S8319, New York City Small Business Rent Stabilization Act, status accessed August 12, 2026.",
    supportsGenerally: ["active Senate bill", "Senate Cities 1 committee", "bill text and mechanics"],
    doesNotEstablish: ["passage", "enactment", "implementation", "advocate-specific causation"]
  },
  {
    id: "SRC-NYC-COUNCIL-RES-0496-2026",
    title: "New York City Council Resolution 496 of 2026",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-06-11",
    accessedAt: reviewedAt,
    canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=8F4D668A-9741-4F3F-9EC4-2F84CC8592C6&ID=8067758",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Resolution 496 of 2026, New York City Small Business Rent Stabilization Act, status accessed August 12, 2026.",
    publicNote: "The resolution calls on the State Legislature to pass A5568A/S8319 and remained in the Committee on Small Business at the recorded access date.",
    supportsGenerally: ["introduced Council resolution", "Committee on Small Business referral", "8,400 business closures in Q2 2025", "Council call for State passage"],
    doesNotEstablish: ["Council adoption of the resolution", "State bill passage", "enactment", "advocate-specific causation"]
  },
  {
    id: "SRC-SBU-INSTAGRAM-CAROUSEL-2026-08-11",
    title: "Small Business United report carousel",
    organization: "The Action Lab / Small Business United",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-08-11",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.instagram.com/actionlabny/p/Db59xHUDq5v/",
    preferredPublicUrl: "canonical",
    publicCitation: "The Action Lab and Small Business United, Instagram carousel promoting Empty Storefronts, High Rents, August 11, 2026.",
    publicNote: "The caption and second graphic display conflicting Q2 2025 business-closure counts.",
    supportsGenerally: ["August 11 public campaign post", "caption-to-graphic numerical conflict", "8,400 displayed on carousel slide 2", "84,000 displayed in caption"],
    doesNotEstablish: ["which number the publisher intended", "a corrected publication", "Jamie's authorship of the post", "Jamie's appearance in the carousel"]
  },
  {
    id: "SRC-FAIRRENT-LAST-30-DAY-RESEARCH-2026-08-12",
    title: "Fair Rent NYC July 13-August 12 evidence review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    capturedAt: "2026-08-12",
    accessedAt: reviewedAt,
    publicCitation: "Bounded authenticated archive and public-web review of Fair Rent NYC activity, July 13-August 12, 2026.",
    publicNote: "Reviewed relevant email threads and attachments, Drive documents, a protected transcript, public event and social pages, the released report, and official legislation pages; protected materials remain outside the repository.",
    supportsGenerally: ["bounded source coverage", "media-placement search result", "public-private disposition map"],
    doesNotEstablish: ["complete lifetime archive coverage", "nonexistence of unrecovered media", "publication permission", "counterpart consent"],
    protectedLocatorId: "RESEARCH-FAIRRENT-LAST-30-DAYS-2026-08-12"
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: "CLM-FAIRRENT-REPORT-REVIEW-2026",
    project: "fair-rent-nyc",
    internalClaim: "Jamie completed a bounded pre-publication factual, source, bill-mechanics, accessibility, and claim-scope review of Empty Storefronts, High Rents; the final report acknowledges his review and incorporates documented corrections and limitations while retaining final editorial authority with the report team.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "Jamie completed a bounded pre-publication review of the 2026 Small Business United report; the released report acknowledges his contribution and incorporates documented corrections and limitations.", status: "active", citationRequired: false, surfaces: ["/work/fair-rent-nyc"] }],
    evidence: [
      { sourceId: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-29", relationship: "direct-support", supports: ["final acknowledgment", "released report disposition"], locator: "Acknowledgments and final report text.", confidence: "high", renderCitation: false },
      { sourceId: "SRC-JAMIE-SBU-REPORT-REVIEW-2026-07-25", relationship: "private-support", supports: ["scope and substance of Jamie's tracked review"], locator: "Protected tracked review.", confidence: "high", renderCitation: false }
    ],
    boundaries: ["The contribution was review, not co-authorship, report authorship, data-analysis ownership, or legal approval.", "The report team retained final editorial authority and did not adopt every recommendation.", "A credited review does not make Jamie responsible for every report claim or campaign recommendation."],
    antiClaims: ["Jamie co-authored the report", "Jamie produced the report's dataset", "Jamie legally approved the bill or report", "Every recommendation was adopted", "The report independently validates every causal claim"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FAIRRENT-PUBLIC-SPEECH-2026-07-29",
    project: "commercial-rent-stabilization",
    internalClaim: "Jamie delivered public remarks at the July 29 Small Business United report launch, using the cultural-space lane to connect rent predictability, neighborhood value, public safety, displacement, and open public data.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "At the July 29, 2026, report launch, Jamie made the cultural-space case for Commercial Rent Stabilization, connecting predictable leases with the continuity and safety of neighborhood cultural infrastructure.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
    evidence: [
      { sourceId: "SRC-FAIRRENT-JULY29-DELIVERED-REMARKS-TRANSCRIPT", relationship: "private-support", supports: ["Jamie delivered public remarks", "cultural-space, displacement, safety, and data themes"], locator: "Protected delivered-remarks segment.", confidence: "high", renderCitation: false },
      { sourceId: "SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29", relationship: "context", supports: ["public event identity and purpose"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["This establishes public speaking, not a published interview, broadcast, or media placement.", "The remarks support Jamie's advocacy position, not passage or enactment of legislation.", "The event record does not establish audience size, complete speaker roster, or attributable campaign impact."],
    antiClaims: ["Jamie's speech caused legislative movement", "Jamie secured press coverage", "Jamie spoke for every coalition participant", "The speech proves bill passage or enactment"],
    researchInquiryIds: ["INQ-FAIRRENT-PRESS-PLACEMENT-2026-08"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FAIRRENT-RECENT-OFFICIAL-COORDINATION-2026-08",
    project: "fair-rent-nyc",
    internalClaim: "Protected records support a fuller account of direct post-event elected-office staff coordination, evidence transfer, and a proposed recurring alignment cadence; public wording awaits Jamie and counterpart approval.",
    status: "use-with-care",
    projections: [{ key: "archive-note", text: "No public account of recent elected-office coordination is authorized without Jamie approval.", status: "hold", citationRequired: false, surfaces: [] }],
    evidence: [{ sourceId: "SRC-FAIRRENT-RECENT-OFFICIAL-COORDINATION-RECORDS-2026-08", relationship: "private-support", supports: ["existence of post-event follow-through and protected coordination records"], locator: "Protected coordination corpus.", confidence: "high", renderCitation: false }],
    boundaries: ["Do not publish correspondence, private quotations, staff identities, contact details, or future meeting logistics without Jamie and counterpart approval.", "A proposed cadence or scheduled meeting is not a completed meeting, formal appointment, endorsement, policy commitment, or legislative result.", "Evidence transfer does not establish adoption or agreement."],
    antiClaims: ["Elected officials endorsed Jamie", "Jamie received a formal campaign appointment", "A future meeting already occurred", "Jamie secured a policy commitment", "Jamie caused legislative action"],
    researchInquiryIds: ["INQ-FAIRRENT-RECENT-OFFICIAL-COORDINATION-PUBLIC-USE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FAIRRENT-CURRENT-LEGISLATIVE-STATUS-2026-08-12",
    project: "commercial-rent-stabilization",
    internalClaim: "On August 12, 2026, official records list A5568A and S8319 as active in their respective Cities committees and Council Resolution 496 as introduced and referred to the Committee on Small Business.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "As checked August 12, 2026, the State bills remained active in committee and the related City Council resolution remained in committee.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: [
      { sourceId: "SRC-NYS-A5568A-2025-2026", relationship: "direct-support", supports: ["active Assembly status and committee"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYS-S8319-2025-2026", relationship: "direct-support", supports: ["active Senate status and committee"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-RES-0496-2026", relationship: "direct-support", supports: ["introduced Council resolution and committee referral"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["This status can change and must be rechecked before reuse.", "Introduced, active, referred, and sponsored do not mean passed, adopted, enacted, funded, or implemented."],
    antiClaims: ["A5568A passed", "S8319 passed", "Council Resolution 496 was adopted", "Commercial Rent Stabilization was enacted", "Jamie caused the recorded legislative status"],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-SBU-CAROUSEL-COUNT-CONFLICT-2026-08",
    project: "commercial-rent-stabilization",
    internalClaim: "The August 11 campaign post contains a tenfold count conflict: its caption says 84,000 Q2 2025 business closures, while the graphic and Council Resolution 496 say 8,400.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "Do not reuse the campaign caption's 84,000 business-closure figure; the post's graphic and the official Council source say 8,400.", status: "disallowed", citationRequired: true, surfaces: [] }],
    evidence: [
      { sourceId: "SRC-SBU-INSTAGRAM-CAROUSEL-2026-08-11", relationship: "direct-support", supports: ["84,000 caption value and 8,400 graphic value"], locator: "Caption and slide 2.", confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-RES-0496-2026", relationship: "contradicts", supports: ["official resolution uses 8,400"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["The conflict controls reuse in this ecosystem; it does not authorize changing another publisher's post.", "Recheck the underlying NYCEDC source before any broader numerical claim is projected."],
    antiClaims: ["84,000 is a settled supported count", "Jamie authored the campaign post", "The social post is a verified statistical source"],
    researchInquiryIds: ["INQ-SBU-CAROUSEL-BUSINESS-CLOSURES-2026-08"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-FAIRRENT-PRESS-PLACEMENT-NOT-RECOVERED-2026",
    project: "fair-rent-nyc",
    internalClaim: "No published Jamie quotation, completed interview, broadcast placement, or indexed press article from the July 29 launch was recovered in the bounded July 13-August 12 review.",
    status: "not-recovered",
    projections: [{ key: "archive-note", text: "A press-facing event and prepared press materials were recovered; a published Jamie quotation, interview, broadcast placement, or indexed article was not recovered in the bounded review.", status: "hold", citationRequired: false, surfaces: [] }],
    evidence: [{ sourceId: "SRC-FAIRRENT-LAST-30-DAY-RESEARCH-2026-08-12", relationship: "direct-support", supports: ["bounded negative media-placement search result"], confidence: "high", renderCitation: false }],
    boundaries: ["A bounded failure to recover media is not proof of nonexistence.", "A footage request, prepared quote, or public appearance is not a publication or broadcast.", "Reopen the inquiry if a clipping, link, recording, or newsroom confirmation appears."],
    antiClaims: ["Jamie received verified press coverage from the July 29 event", "The event had no coverage anywhere", "A media request proves broadcast use"],
    researchInquiryIds: ["INQ-FAIRRENT-PRESS-PLACEMENT-2026-08"],
    reviewedAt,
    reviewedBy
  }
];

const entities: KnowledgeBank["entities"] = [
  { id: "ENT-SBU-EMPTY-STOREFRONTS-REPORT-2026", name: "Empty Storefronts, High Rents report", kind: "project", aliases: [], publicSafe: true },
  { id: "ENT-SBU-REPORT-LAUNCH-2026", name: "July 29, 2026 Small Business United report launch", kind: "event", aliases: ["Empty Storefronts, High Rents launch"], publicSafe: true }
];

const agencyRelations: KnowledgeBank["agencyRelations"] = [
  {
    id: "REL-JAMIE-SBU-REPORT-REVIEW-2026",
    project: "fair-rent-nyc",
    actorIds: ["ENT-JAMIE-BURKART"],
    action: "reviewed",
    objectId: "ENT-SBU-EMPTY-STOREFRONTS-REPORT-2026",
    purpose: "Improve factual precision, source comparability, bill mechanics, limitations, accessibility, and claim scope before the public launch.",
    result: "The final report acknowledged Jamie's review and incorporated documented corrections and limitations while the report team retained final editorial authority and some flagged language remained.",
    creditScope: "individual",
    status: "confirmed-with-boundary",
    claimIds: ["CLM-FAIRRENT-REPORT-REVIEW-2026"],
    sourceIds: ["SRC-JAMIE-SBU-REPORT-REVIEW-2026-07-25", "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-2026-07-29"],
    sourceSupportKeys: ["Jamie's pre-publication factual and source review", "final acknowledgment of Jamie's bounded review"],
    boundaries: ["Review credit is not co-author or authorship credit.", "The report team retained final editorial authority; not every suggestion was adopted, and Jamie does not own every report claim."],
    reviewedAt,
    reviewedBy
  },
  {
    id: "REL-JAMIE-SBU-REPORT-LAUNCH-SPEECH-2026",
    project: "commercial-rent-stabilization",
    actorIds: ["ENT-JAMIE-BURKART"],
    action: "spoke-at",
    objectId: "ENT-SBU-REPORT-LAUNCH-2026",
    purpose: "Make the cultural-space case for predictable commercial rents while connecting public safety, displacement, neighborhood value, and public data.",
    result: "Jamie delivered the cultural-space segment of the public launch program as an NYC Artist Coalition member.",
    creditScope: "individual",
    status: "confirmed-with-boundary",
    claimIds: ["CLM-FAIRRENT-PUBLIC-SPEECH-2026-07-29"],
    sourceIds: ["SRC-FAIRRENT-JULY29-DELIVERED-REMARKS-TRANSCRIPT", "SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29"],
    sourceSupportKeys: ["Jamie spoke at the July 29 launch", "July 29 public report launch"],
    boundaries: ["Public speaking does not establish interview or media placement.", "The speech does not establish passage, enactment, or attributable policy impact.", "Campaign and event outcomes remain collective."],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-FAIRRENT-PRESS-PLACEMENT-2026-08",
    project: "fair-rent-nyc",
    question: "Did Jamie's July 29 public remarks or prepared press language appear in a published article, interview, broadcast, or attributable newsroom product?",
    methods: ["Reviewed the relevant authenticated email threads and attachments in the July 13-August 12 window.", "Inspected the public event page, authenticated campaign social post, protected event transcript, and bounded public-web search results.", "Separated requests, prepared language, and public speaking from completed publication or broadcast."],
    runAt: reviewedAt,
    resultStatus: "not-recovered",
    findings: ["A press-facing event, prepared press language, and a request for event video were recovered.", "No published Jamie quotation, completed interview, broadcast placement, or indexed press article from the launch was recovered."],
    limitations: ["Negative search is not proof of nonexistence.", "Unindexed, deleted, local, broadcast-only, or privately circulated coverage may remain outside the reviewed surfaces."],
    sourceIds: ["SRC-FAIRRENT-LAST-30-DAY-RESEARCH-2026-08-12", "SRC-ACTION-LAB-SBU-REPORT-LAUNCH-2026-07-29"],
    publicSummary: "The review supports a public-speaking claim, but not a verified press-placement claim."
  },
  {
    id: "INQ-FAIRRENT-RECENT-OFFICIAL-COORDINATION-PUBLIC-USE",
    project: "fair-rent-nyc",
    question: "Which, if any, current elected-office coordination facts can be made public without exposing correspondence, overreading informal reception, or implying endorsement or commitment?",
    methods: ["Separated office logistics, evidence transfer, relationship maintenance, proposed cadence, completed action, and policy outcome.", "Recorded only a protected-source disposition in the public repository.", "Reserved publication and attribution decisions for Jamie and, where appropriate, counterpart review."],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: ["The protected corpus supports a fuller internal account.", "No public wording is authorized in this candidate."],
    limitations: ["Access is not consent or publication permission.", "Future meetings and asks must not be represented as completed outcomes."],
    sourceIds: ["SRC-FAIRRENT-RECENT-OFFICIAL-COORDINATION-RECORDS-2026-08"],
    publicSummary: "Recent office coordination remains a protected evidence lane pending explicit publication and attribution decisions.",
    protectedLocatorId: "RESEARCH-FAIRRENT-OFFICIAL-COORDINATION-PUBLIC-USE-2026"
  },
  {
    id: "INQ-SBU-CAROUSEL-BUSINESS-CLOSURES-2026-08",
    project: "commercial-rent-stabilization",
    question: "Which Q2 2025 business-closure count should the campaign ecosystem use, and should the August 11 caption be corrected?",
    methods: ["Compared the authenticated public caption with all six carousel graphics.", "Checked the number against the official text of Council Resolution 496.", "Blocked both portfolio and Knowledge Wiki reuse of the conflicting caption value."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["The caption says 84,000.", "The second graphic and Council Resolution 496 say 8,400.", "The underlying NYCEDC source should be rechecked before a final cross-system correction is closed."],
    limitations: ["This review did not edit or contact the publisher.", "The official Council record is strong corroboration but the originating dataset remains the best final authority for the statistic."],
    sourceIds: ["SRC-SBU-INSTAGRAM-CAROUSEL-2026-08-11", "SRC-NYC-COUNCIL-RES-0496-2026"],
    publicSummary: "Do not reuse 84,000; reconcile the caption to the graphic, Council record, and originating NYCEDC source first."
  }
];

const corrections: KnowledgeBank["corrections"] = [
  {
    id: "COR-SBU-CAROUSEL-BUSINESS-CLOSURES-2026-08",
    claimId: "CLM-SBU-CAROUSEL-COUNT-CONFLICT-2026-08",
    previousText: "84,000 businesses closed in Q2 2025",
    replacementText: "8,400 businesses closed in Q2 2025",
    reason: "The August 11 caption conflicts with its own second graphic and with New York City Council Resolution 496, both of which state 8,400; recheck the originating NYCEDC source before closing the publisher-side correction.",
    decidedAt: reviewedAt,
    affectedSurfaces: ["knowledge-bank", "portfolio", "campaign social-source reuse"],
    status: "active"
  }
];

export const fairRentRecentAdvocacyAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  entities,
  agencyRelations,
  researchInquiries,
  corrections
};
