import type {
  CorrectionRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const kcTownHallCouncilActionSources = [
  {
    id: "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
    title: "Kansas City Resolution 190649 legislative record",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of Kansas City, Missouri, Resolution 190649 legislative record, Council action September 26, 2019.",
    publicNote:
      "The official record says the Council adopted Resolution 190649 as substituted, accepting the CCED Board's $490,539 recommendation for KC Town Hall and authorizing negotiation of a funding agreement.",
    supportsGenerally: [
      "the Council adopted Resolution 190649 as substituted on September 26, 2019",
      "the resolution accepted the CCED Board's $490,539 recommendation for KC Town Hall",
      "the resolution authorized negotiation of a funding agreement"
    ],
    doesNotEstablish: [
      "a member-level roll-call tally",
      "a unanimous Council vote",
      "an executed funding agreement",
      "receipt or disbursement of funds",
      "current project or property status"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019-09-26",
    title: "Kansas City Council meeting record from September 26, 2019",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://kansascity.legistar.com/MeetingDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GID=821&LEGID=14410",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of Kansas City, Missouri, Council meeting record, September 26, 2019.",
    publicNote:
      "The final meeting record shows Resolution 190649 adopted as substituted and companion Ordinance 190642 passed as substituted to reappropriate the Round Two project-funding pool.",
    supportsGenerally: [
      "the Council adopted Resolution 190649 as substituted",
      "the Council passed companion Ordinance 190642 as substituted",
      "Ordinance 190642 reappropriated the Round Two project-funding pool"
    ],
    doesNotEstablish: [
      "a member-level roll-call tally",
      "a unanimous Council vote",
      "receipt or disbursement of KC Town Hall funds",
      "current project or property status"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-CCED-PROJECT-STATUS-2024-04-12",
    title: "Central City Sales Tax Project Updates as of April 12, 2024",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-04-12",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.kcmo.gov/home/showpublisheddocument/12660/638482760631600000",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of Kansas City, Missouri, Central City Sales Tax Project Updates, April 12, 2024.",
    publicNote:
      "The official status table lists $490,539 in CCED funds for KC Town Hall, no funds disbursed, and a developer letter rescinding the previously awarded funds.",
    supportsGenerally: [
      "the KC Town Hall allocation was listed as $490,539",
      "no KC Town Hall funds were disbursed",
      "the project submitted a letter rescinding the previously awarded funds"
    ],
    doesNotEstablish: [
      "the reason for the project's withdrawal",
      "Jamie's role in the withdrawal",
      "current project or property status",
      "current ownership of the property"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
    title: "Kansas City Ordinance 240317 claw-back record",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-03-28",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of Kansas City, Missouri, Ordinance 240317, passed March 28, 2024.",
    publicNote:
      "The ordinance states that Committee Substitute for Ordinance 190642 appropriated $490,539 to KC Town Hall, that the project later withdrew, and that the unused amount was reappropriated in 2024.",
    supportsGenerally: [
      "Committee Substitute for Ordinance 190642 appropriated $490,539 to KC Town Hall",
      "KC Town Hall later withdrew from the project",
      "the unused $490,539 was reappropriated in 2024"
    ],
    doesNotEstablish: [
      "the reason for the project's withdrawal",
      "Jamie's role in the withdrawal",
      "a completed redevelopment",
      "current project or property status"
    ]
  }
] satisfies SourceRecord[];

export const kcTownHallCouncilActionInquiries = [
  {
    id: "INQ-KC-TOWN-HALL-COUNCIL-ACTION-2019",
    project: "kc-town-hall",
    question:
      "Did the Kansas City Council move KC Town Hall's $490,539 CCED Board recommendation into an approved municipal allocation, and what was the later funding disposition?",
    methods: [
      "Reviewed the official Resolution 190649 legislative history and September 26, 2019, Council meeting record.",
      "Compared Resolution 190649 with companion Ordinance 190642 and the later appropriation history stated in Ordinance 240317.",
      "Reviewed the April 12, 2024, Central City Sales Tax project-status table for disbursement and withdrawal status.",
      "Queried the official Legistar API for a member-level vote record and tally. No member votes or tally were published for the action."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "On September 26, 2019, the Council adopted Resolution 190649 as substituted, accepting the CCED Board's $490,539 KC Town Hall recommendation and authorizing negotiation of a funding agreement.",
      "The Council also passed companion Ordinance 190642; Ordinance 240317 later confirms that 190642 appropriated $490,539 to KC Town Hall.",
      "The 2024 project-status record reports no funds disbursed and says the project submitted a letter rescinding the previously awarded funds.",
      "Ordinance 240317 says KC Town Hall withdrew and reappropriates the unused $490,539."
    ],
    limitations: [
      "The official action establishes Council adoption and appropriation, not a unanimous Council vote or any member's individual vote.",
      "No executed funding agreement or disbursement is established; later official records affirm that the allocation remained unused.",
      "These records do not establish the reason for withdrawal, Jamie's role in that decision, or current property status."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-CCED-RECOMMENDATION-2019",
      "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019-09-26",
      "SRC-KC-TOWN-HALL-CCED-MINUTES-2021-09-14",
      "SRC-KC-TOWN-HALL-CCED-PROJECT-STATUS-2024-04-12",
      "SRC-KC-TOWN-HALL-ORDINANCE-240317"
    ],
    publicSummary:
      "Official KCMO records show that the Council adopted the KC Town Hall funding resolution and appropriated $490,539 following the CCED Board recommendation; the project later withdrew before disbursement, and the unused funds were reappropriated in 2024."
  }
] satisfies ResearchInquiry[];

export const kcTownHallCouncilActionCorrections = [
  {
    id: "COR-KC-TOWN-HALL-COUNCIL-ACTION-2026",
    claimId: "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS",
    previousText:
      "Co-led redevelopment planning and public-benefit documentation tied to a $490,539 public funding recommendation.",
    replacementText:
      "Co-led redevelopment planning and public-benefit documentation for a project that advanced from a unanimous CCED Board recommendation to City Council approval and appropriation of $490,539, then withdrew before disbursement.",
    reason:
      "Official Council and 2024 appropriation records establish the Council action and later unused-funds disposition beyond the previously documented Board recommendation.",
    decidedAt: "2026-07-14",
    affectedSurfaces: [
      "/work",
      "/work/kc-town-hall",
      "/work/technical-operations",
      "resume-pdf",
      "knowledge-bank"
    ],
    status: "active"
  }
] satisfies CorrectionRecord[];

export const kcTownHallCouncilActionIntake = [
  {
    id: "INT-KC-TOWN-HALL-COUNCIL-ACTION-2026-07-14",
    receivedAt: "2026-07-14",
    kind: "public-safe-memory",
    visibility: "public-safe",
    title: "KC Town Hall Council-allocation research lead",
    description:
      "User-supplied lead that the Kansas City Council voted to allocate KC Town Hall funds following the CCED Board recommendation, verified against official municipal records.",
    whyItMatters:
      "Replaces an understated recommendation-only account with the complete, defensible municipal chronology while preserving the later no-disbursement boundary.",
    projectIds: ["kc-town-hall"],
    status: "matured",
    disposition: "correction-created",
    dispositionNote:
      "Matured into the canonical municipal-process claim, a recovered inquiry, a public-proof correction, and a cited case-study projection.",
    sourceIds: [
      "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019-09-26",
      "SRC-KC-TOWN-HALL-CCED-PROJECT-STATUS-2024-04-12",
      "SRC-KC-TOWN-HALL-ORDINANCE-240317"
    ],
    claimIds: ["CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"],
    inquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-ACTION-2019"],
    correctionIds: ["COR-KC-TOWN-HALL-COUNCIL-ACTION-2026"],
    relatedIntakeIds: [
      "INT-KC-TOWN-HALL-PROPOSAL-RECORD-2026-07-12",
      "INT-KC-TOWN-HALL-RECOMMENDATION-PRESENTATION-2026-07-12",
      "INT-KC-TOWN-HALL-2021-MINUTES-2026-07-12"
    ],
    boundaries: [
      "Council adoption and appropriation do not establish a unanimous Council vote, an executed funding agreement, or receipt of funds.",
      "Later official records show no disbursement, project withdrawal, and reappropriation of the unused amount."
    ]
  }
] satisfies IntakeRecordInput[];
