import type {
  CaptureRecord,
  ClaimRecord,
  CorrectionRecord,
  ObservationRecord,
  ResearchInquiry,
  SourceRecord,
} from "./schema.ts";

const proposalListSourceId = "SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019";
const resolutionSourceId = "SRC-KCTH-KCMO-RESOLUTION-190649-2019";
const appropriationSourceId = "SRC-KCTH-KCMO-ORDINANCE-190642-2019";
const reappropriationSourceId = "SRC-KCTH-KCMO-ORDINANCE-240317-2024";

const roleClaimId = "CLM-KCTH-CCED-DEVELOPER-PRESENTER-ROLE";
const fundingClaimId = "CLM-KCTH-CCED-COUNCIL-FUNDING-CHAIN";

export const kcTownHallFundingCaptures = [
  {
    id: "CAP-KCTH-COUNCIL-FUNDING-CHAIN-2026",
    receivedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    kind: "memory",
    summary:
      "The KCMO City Council voted on KC Town Hall funding after the CCED Sales Tax Board recommended the project.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: ["kc-town-hall"],
    potentialClaimFamilies: [
      "public proposal role",
      "CCED Board recommendation",
      "Council funding authorization",
      "municipal appropriation",
      "later funding disposition",
    ],
    sourceIds: [
      proposalListSourceId,
      resolutionSourceId,
      appropriationSourceId,
      reappropriationSourceId,
    ],
    observationIds: [
      "OBS-KCTH-CCED-DEVELOPER-PRESENTER",
      "OBS-KCTH-CCED-BOARD-RECOMMENDATION",
      "OBS-KCTH-COUNCIL-RESOLUTION-ACCEPTANCE",
      "OBS-KCTH-COUNCIL-APPROPRIATION",
      "OBS-KCTH-COUNCIL-UNUSED-REAPPROPRIATION",
    ],
    researchTaskIds: [],
    disposition:
      "Recovered the official proposal list and authenticated 2019 Council actions, then bounded the authorization claim with the Council's 2024 record reappropriating the unused amount after KC Town Hall withdrew.",
  },
] satisfies CaptureRecord[];

export const kcTownHallFundingSources = [
  {
    id: proposalListSourceId,
    title: "Central City Economic Development Sales Tax Round Two proposals",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of Kansas City, Missouri, Central City Economic Development Sales Tax Round Two proposal list, Proposal 16, 2019.",
    publicNote:
      "The official proposal table identifies Jamie Burkart as KC Town Hall's developer/presenter and records the request amount and then-proposed redevelopment program.",
    supportsGenerally: [
      "Jamie Burkart was listed as developer/presenter for KC Town Hall Proposal 16",
      "the listed request amount was $490,539",
      "the proposal concerned adaptive reuse at 36th Street and Indiana Avenue",
    ],
    doesNotEstablish: [
      "that Jamie solely authored or owned the proposal",
      "that Jamie caused the Board recommendation or Council actions",
      "that every proposed program element appeared in the final resolution",
      "that KC Town Hall received or spent the requested funds",
    ],
  },
  {
    id: resolutionSourceId,
    title: "Second Committee Substitute for Resolution No. 190649",
    organization: "Council of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://kansascity.legistar.com/View.ashx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=2CBC09C0-65EC-4F05-A70F-FCD8E4F7FBE3&ID=10628240&M=F",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Council of Kansas City, Missouri, Second Committee Substitute for Resolution No. 190649, authenticated September 26, 2019.",
    publicNote:
      "The authenticated resolution records the CCED Board's July 16 recommendation, accepts up to $490,539 for KC Town Hall, and authorizes negotiation of a funding agreement with conditions.",
    supportsGenerally: [
      "the CCED Board voted on July 16, 2019 to recommend $490,539 for KC Town Hall",
      "the Council accepted the Board recommendation on September 26, 2019",
      "the Council authorized negotiation of a conditional funding agreement",
    ],
    doesNotEstablish: [
      "that a funding agreement was executed",
      "that KC Town Hall received or spent $490,539",
      "that Jamie caused the Board recommendation or Council adoption",
      "that the proposed project was completed",
    ],
  },
  {
    id: appropriationSourceId,
    title: "Committee Substitute for Ordinance No. 190642",
    organization: "Council of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://kansascity.legistar.com/View.ashx?M=F&ID=10628353&GUID=DAED2DE7-AA03-43D8-B1C9-448EA4DAEEB2&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Council of Kansas City, Missouri, Committee Substitute for Ordinance No. 190642, authenticated September 26, 2019.",
    publicNote:
      "The authenticated ordinance appropriates Round Two CCED funds and lists a $490,539 award for KC Town Hall within the Central City Sales Tax-Projects account.",
    supportsGenerally: [
      "the Council passed Ordinance 190642 on September 26, 2019",
      "the ordinance appropriated $490,539 for KC Town Hall within a Central City Sales Tax-Projects account",
      "the appropriation followed Round Two funding recommendations",
    ],
    doesNotEstablish: [
      "that a funding agreement was executed",
      "that KC Town Hall received or spent the appropriation",
      "that Jamie caused the appropriation",
      "that the proposed project was completed",
    ],
  },
  {
    id: reappropriationSourceId,
    title: "Ordinance No. 240317",
    organization: "Council of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-03-28",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Council of Kansas City, Missouri, Ordinance No. 240317, passed March 28, 2024.",
    publicNote:
      "The ordinance says KC Town Hall had withdrawn, identifies its $490,539 as unused, reduces that full project account amount, and reappropriates the combined clawed-back funds for future awards.",
    supportsGenerally: [
      "KC Town Hall withdrew and would no longer proceed with the project",
      "the full $490,539 KC Town Hall amount was unused",
      "the Council reappropriated the unused amount in 2024",
    ],
    doesNotEstablish: [
      "the complete private reasons for withdrawal",
      "fault by Jamie or any collaborator",
      "that the 2019 Council appropriation had never occurred",
      "the present ownership or condition of the property",
    ],
  },
] satisfies SourceRecord[];

export const kcTownHallFundingObservations = [
  {
    id: "OBS-KCTH-CCED-DEVELOPER-PRESENTER",
    sourceId: proposalListSourceId,
    project: "kc-town-hall",
    statement:
      "The City's Round Two proposal list identifies Jamie Burkart as the developer/presenter for KC Town Hall Proposal 16 and lists a $490,539 request for adaptive reuse at 36th Street and Indiana Avenue.",
    observationType: "explicit",
    locator: "Round Two proposals table, Proposal 16, KC Town-Hall row.",
    confidence: "high",
    limitations: [
      "The listing establishes Jamie's public presentation role, not sole authorship, ownership, or causality for later government decisions.",
    ],
    supportsClaimIds: [roleClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-KCTH-CCED-BOARD-RECOMMENDATION",
    sourceId: resolutionSourceId,
    project: "kc-town-hall",
    statement:
      "Resolution 190649 records that the CCED Sales Tax Board voted on July 16, 2019 to recommend $490,539 for costs associated with the KC Town Hall project.",
    observationType: "explicit",
    locator:
      "Authenticated Resolution 190649, page 1, fourth WHEREAS clause about the July 16, 2019 meeting.",
    confidence: "high",
    limitations: [
      "A Board recommendation was not itself a Council appropriation, executed agreement, payment, or disbursement.",
    ],
    supportsClaimIds: [fundingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-KCTH-COUNCIL-RESOLUTION-ACCEPTANCE",
    sourceId: resolutionSourceId,
    project: "kc-town-hall",
    statement:
      "On September 26, 2019, the Council authenticated Resolution 190649 accepting the CCED Board's recommendation for up to $490,539 and authorizing negotiation of a conditional funding agreement.",
    observationType: "explicit",
    locator:
      "Authenticated Resolution 190649, page 2, Sections 1-3; authentication and date on page 3.",
    confidence: "high",
    limitations: [
      "Authorization to negotiate did not establish that an agreement was executed or that funds were received.",
    ],
    supportsClaimIds: [fundingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-KCTH-COUNCIL-APPROPRIATION",
    sourceId: appropriationSourceId,
    project: "kc-town-hall",
    statement:
      "On September 26, 2019, the Council passed Ordinance 190642, which appropriated Round Two CCED funds and listed $490,539 for KC Town Hall within the Central City Sales Tax-Projects account.",
    observationType: "explicit",
    locator:
      "Authenticated Ordinance 190642, Sections 1-2 and the KC Town Hall row spanning pages 1-2; authentication on page 3.",
    confidence: "high",
    limitations: [
      "A municipal appropriation reserved budget authority; it did not establish execution, payment, receipt, expenditure, or project completion.",
    ],
    supportsClaimIds: [fundingClaimId],
    reviewedAt: "2026-07-14",
  },
  {
    id: "OBS-KCTH-COUNCIL-UNUSED-REAPPROPRIATION",
    sourceId: reappropriationSourceId,
    project: "kc-town-hall",
    statement:
      "In 2024, Ordinance 240317 recorded that KC Town Hall had withdrawn, identified the full $490,539 as unused, reduced that project account amount, and reappropriated the combined clawed-back funds for future awards.",
    observationType: "explicit",
    locator:
      "Legislation text, WHEREAS clauses and Sections 1-2; Council action dated March 28, 2024.",
    confidence: "high",
    limitations: [
      "The ordinance does not provide the complete private reasons for withdrawal and should not be used to assign fault.",
    ],
    supportsClaimIds: [fundingClaimId],
    reviewedAt: "2026-07-14",
  },
] satisfies ObservationRecord[];

export const kcTownHallFundingClaims = [
  {
    id: roleClaimId,
    project: "kc-town-hall",
    claimType: "role",
    internalClaim:
      "The City's CCED Round Two proposal list names Jamie Burkart as the developer/presenter for KC Town Hall Proposal 16, a $490,539 adaptive-reuse request.",
    epistemicState: "sourced",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: ["OBS-KCTH-CCED-DEVELOPER-PRESENTER"],
    projections: [
      {
        key: "case-study",
        text: "The City's CCED Round Two proposal list names Jamie as KC Town Hall's developer/presenter for the $490,539 adaptive-reuse request.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"],
      },
      {
        key: "work-card",
        text: "Named by the City as KC Town Hall's developer/presenter for its CCED adaptive-reuse proposal.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work", "/work/kc-town-hall"],
      },
    ],
    evidence: [
      {
        sourceId: proposalListSourceId,
        relationship: "direct-support",
        supports: [
          "Jamie's developer/presenter designation",
          "the $490,539 request",
          "the KC Town Hall proposal identity",
        ],
        locator: "Proposal 16 row.",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Use developer/presenter as the City's recorded proposal role; do not expand it to sole developer, sole author, or sole project owner.",
    ],
    antiClaims: [
      "Jamie solely authored the proposal",
      "Jamie caused the CCED Board recommendation",
      "Jamie caused the Council appropriation",
    ],
    researchInquiryIds: ["INQ-KCTH-COUNCIL-FUNDING-CHAIN-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: fundingClaimId,
    project: "kc-town-hall",
    claimType: "outcome",
    internalClaim:
      "After the CCED Board recommended $490,539 for KC Town Hall, the Council accepted that recommendation and appropriated the amount in 2019; KC Town Hall later withdrew and the Council reappropriated the unused amount in 2024.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCTH-CCED-BOARD-RECOMMENDATION",
      "OBS-KCTH-COUNCIL-RESOLUTION-ACCEPTANCE",
      "OBS-KCTH-COUNCIL-APPROPRIATION",
      "OBS-KCTH-COUNCIL-UNUSED-REAPPROPRIATION",
    ],
    projections: [
      {
        key: "case-study",
        text: "The public record preserves the complete funding decision: the CCED Board voted on July 16, 2019 to recommend $490,539; on September 26, the Council adopted Resolution 190649 accepting the recommendation and passed Ordinance 190642 appropriating $490,539 for KC Town Hall within the Central City Sales Tax-Projects account. This was authorization, not receipt: KC Town Hall later withdrew, and in 2024 the Council reappropriated the unused $490,539.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"],
      },
      {
        key: "work-card",
        text: "The CCED Board recommended $490,539 and the Council accepted and appropriated the amount in 2019; the project later withdrew and the unused funds were reappropriated in 2024.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work", "/work/kc-town-hall"],
      },
    ],
    evidence: [
      {
        sourceId: resolutionSourceId,
        relationship: "direct-support",
        supports: [
          "the July 16, 2019 CCED Board vote and $490,539 amount",
          "Council acceptance",
          "authorization to negotiate",
        ],
        locator: "Pages 1-3.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: appropriationSourceId,
        relationship: "direct-support",
        supports: [
          "the September 26, 2019 appropriation",
          "the $490,539 KC Town Hall amount",
        ],
        locator: "Sections 1-2 and KC Town Hall table row on pages 1-2.",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: reappropriationSourceId,
        relationship: "supports-boundary",
        supports: [
          "KC Town Hall's withdrawal",
          "the amount remained unused",
          "the 2024 reappropriation",
        ],
        locator: "WHEREAS clauses and Sections 1-2.",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Distinguish Board recommendation, Council acceptance, appropriation, negotiation authority, receipt, and expenditure.",
      "State the later withdrawal and reappropriation whenever the 2019 amount is presented as more than a recommendation.",
      "Treat the Council actions as governmental decisions, not outcomes caused by Jamie individually.",
    ],
    antiClaims: [
      "KC Town Hall received $490,539",
      "KC Town Hall spent $490,539",
      "the City executed a final funding agreement",
      "the project was completed with City funds",
      "Jamie secured or caused the Council appropriation",
    ],
    researchInquiryIds: ["INQ-KCTH-COUNCIL-FUNDING-CHAIN-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
] satisfies ClaimRecord[];

export const kcTownHallFundingInquiries = [
  {
    id: "INQ-KCTH-COUNCIL-FUNDING-CHAIN-2026",
    project: "kc-town-hall",
    question:
      "What do official KCMO records establish about Jamie's public proposal role, the CCED Board recommendation, the Council's 2019 actions, and the later disposition of the KC Town Hall appropriation?",
    methods: [
      "Reviewed the official CCED Round Two proposal list.",
      "Read the authenticated Second Committee Substitute for Resolution 190649 page by page.",
      "Read the authenticated Committee Substitute for Ordinance 190642 page by page and verified its Council passage record.",
      "Reviewed the full public text and Council history for Ordinance 240317.",
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "The City listed Jamie Burkart as developer/presenter for KC Town Hall Proposal 16.",
      "The CCED Board voted on July 16, 2019 to recommend $490,539 for the project.",
      "On September 26, 2019, the Council accepted the recommendation, authorized negotiation of a conditional funding agreement, and appropriated $490,539 for KC Town Hall within the Central City Sales Tax-Projects account.",
      "In 2024, the Council recorded KC Town Hall's withdrawal and reappropriated the full unused $490,539.",
    ],
    limitations: [
      "The public records establish Jamie's developer/presenter designation but not sole proposal authorship or ownership.",
      "Recommendation, acceptance, appropriation, and negotiation authority did not establish an executed agreement, payment, receipt, or expenditure.",
      "The 2024 ordinance does not provide the complete private reasons for withdrawal and should not be used to assign fault.",
    ],
    sourceIds: [
      proposalListSourceId,
      resolutionSourceId,
      appropriationSourceId,
      reappropriationSourceId,
    ],
    publicSummary:
      "Official KCMO records establish Jamie's developer/presenter role, a July 2019 CCED Board recommendation, Council acceptance and appropriation in September 2019, and reappropriation of the unused amount after KC Town Hall withdrew in 2024.",
  },
] satisfies ResearchInquiry[];

export const kcTownHallFundingCorrections = [
  {
    id: "COR-KCTH-FUNDING-STATUS-2026",
    claimId: fundingClaimId,
    previousText: "$490,539 public funding recommendation",
    replacementText:
      "The CCED Board recommended $490,539 and the Council accepted and appropriated the amount in 2019; KC Town Hall later withdrew and the Council reappropriated the unused funds in 2024.",
    reason:
      "The authenticated resolution, appropriation ordinance, and later reappropriation ordinance recover the complete public decision and disposition chain.",
    decidedAt: "2026-07-14",
    affectedSurfaces: ["/work", "/work/kc-town-hall", "knowledge-bank"],
    status: "active",
  },
] satisfies CorrectionRecord[];
