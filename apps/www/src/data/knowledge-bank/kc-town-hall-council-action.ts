import type {
  CitationPage,
  ClaimRecord,
  CorrectionRecord,
  IntakeItem,
  ProjectRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const kcTownHallIntakes = [
  {
    id: "INT-2026-07-14-KC-TOWN-HALL-APPROVED-RESUME",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart approved public resume",
    publicSafeDescription: "Jamie's approved public resume describing his KC Town Hall co-founder and project-manager role and his co-leadership of redevelopment planning and public-benefit documentation.",
    submittedUrl: "https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2015", "2024", "2026"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-KC-TOWN-HALL-APPROVED-RESUME-2026"],
    claimIds: ["CLM-KC-TOWN-HALL-PLANNING-AND-DOCUMENTATION-ROLE"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-KC-TOWN-HALL-BOARD-PACKET",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex public-record research",
    publicSafeDescription: "Official CCED Board packet naming Jamie as the KC Town Hall presenter and recording the Board's four affirmative votes to recommend $490,539 to the City Council.",
    submittedUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2019-06-12", "2019-07-16"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019"],
    claimIds: [
      "CLM-KC-TOWN-HALL-PRESENTER-ROLE",
      "CLM-KC-TOWN-HALL-BOARD-RECOMMENDATION"
    ],
    inquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"]
  },
  {
    id: "INT-2026-07-14-KC-TOWN-HALL-COUNCIL-MEETING",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex public-record research",
    publicSafeDescription: "Official September 26, 2019, Council meeting record showing passage of Ordinance 190642 and adoption of Resolution 190649.",
    submittedUrl: "https://kansascity.legistar.com/MeetingDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GID=821&LEGID=14410",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2019-09-26"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019"],
    claimIds: [
      "CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE",
      "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"
    ],
    inquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"]
  },
  {
    id: "INT-2026-07-14-KC-TOWN-HALL-ORDINANCE-190642",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex public-record research",
    publicSafeDescription: "Authenticated Committee Substitute for Ordinance 190642, including the KC Town Hall project line and $490,539 appropriation.",
    submittedUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628353&GUID=DAED2DE7-AA03-43D8-B1C9-448EA4DAEEB2&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2019-09-26"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-KC-TOWN-HALL-ORDINANCE-190642"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"],
    inquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"]
  },
  {
    id: "INT-2026-07-14-KC-TOWN-HALL-RESOLUTION-190649",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex public-record research",
    publicSafeDescription: "Authenticated Second Committee Substitute for Resolution 190649 accepting the Board recommendation and authorizing funding-agreement negotiations.",
    submittedUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628240&GUID=2CBC09C0-65EC-4F05-A70F-FCD8E4F7FBE3&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2019-09-26"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-KC-TOWN-HALL-RESOLUTION-190649"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE"],
    inquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"]
  },
  {
    id: "INT-2026-07-14-KC-TOWN-HALL-ORDINANCE-240317",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex public-record research",
    publicSafeDescription: "Official 2024 ordinance confirming the earlier KC Town Hall appropriation and reclaiming the unused allocation after project withdrawal.",
    submittedUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2024-03-28"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-KC-TOWN-HALL-ORDINANCE-240317"],
    claimIds: ["CLM-KC-TOWN-HALL-UNUSED-ALLOCATION"],
    inquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"]
  }
] satisfies IntakeItem[];

export const kcTownHallProject = {
  id: "kc-town-hall",
  title: "KC Town Hall",
  summary: "Adaptive-reuse proposal and public-benefit planning for a long-vacant Kansas City building, documented through CCED Board review and City Council action.",
  status: "historical",
  period: { start: "2015", end: "2024" },
  entityIds: [],
  publicSurfaceCandidates: ["/work/kc-town-hall", "/work", "/work/technical-operations"],
  photoResearchPrompts: [
    "Board presentation materials, the building and neighborhood context, planning sessions, public-benefit documentation, and collaborators, with property, participant, and private-record boundaries reviewed."
  ]
} satisfies ProjectRecord;

export const kcTownHallSources = [
  {
    id: "SRC-KC-TOWN-HALL-APPROVED-RESUME-2026",
    title: "Jamie Burkart approved public resume",
    organization: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-07-11",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart, approved public resume, KC Town Hall LLC experience entry, 2026.",
    publicNote: "In his approved public resume, Jamie describes serving as KC Town Hall co-founder and project manager and co-leading redevelopment planning and public-benefit documentation.",
    locator: "PDF p. 2, KC Town Hall LLC section.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-KC-TOWN-HALL-APPROVED-RESUME"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart approval and Codex text inspection"],
    supportsGenerally: [
      "Jamie's attributed KC Town Hall co-founder and project-manager role",
      "Jamie's attributed co-leadership of redevelopment planning and public-benefit documentation",
      "approximately 6,500 square feet",
      "intended four commercial spaces and three homes",
      "2015-2024 project period"
    ],
    doesNotEstablish: [
      "independent corroboration of Jamie's role description",
      "City Council action or appropriation",
      "an executed funding agreement",
      "disbursement or receipt",
      "construction or completion"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019",
    title: "Central City Economic Development Sales Tax Board meeting packet",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-07-29",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Central City Economic Development Sales Tax Board meeting packet, 2019.",
    publicNote: "The packet names Jamie as the presenter for the KC Town Hall proposal and records all four participating Board members voting to recommend $490,539 to the City Council.",
    locator: "PDF pp. 6 and 13: June 12 presentation table and July 16 recommendation minutes.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-KC-TOWN-HALL-BOARD-PACKET"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex close reading and PDF visual inspection"],
    supportsGenerally: [
      "Jamie named as KC Town Hall presenter",
      "$490,539 request",
      "four affirmative CCED Board votes",
      "recommendation to City Council for approval and funding"
    ],
    doesNotEstablish: [
      "City Council action",
      "a funding agreement",
      "disbursement or receipt",
      "sole ownership or sole authorship of the proposal",
      "completed construction"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019",
    title: "Kansas City Council meeting record, September 26, 2019",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://kansascity.legistar.com/MeetingDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GID=821&LEGID=14410",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Council meeting record, September 26, 2019, files 190642 and 190649.",
    publicNote: "The record shows the Council passed Ordinance 190642 as substituted and adopted Resolution 190649 as substituted.",
    locator: "Meeting Items, files 190642 and 190649.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-KC-TOWN-HALL-COUNCIL-MEETING"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex close reading with live public-record verification"],
    supportsGenerally: [
      "September 26, 2019, Council action date",
      "passage of Ordinance 190642 as substituted",
      "adoption of Resolution 190649 as substituted"
    ],
    doesNotEstablish: [
      "an individual roll-call tally",
      "execution of a funding agreement",
      "disbursement or receipt",
      "construction or completion",
      "Jamie's role in the Council's decision"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
    title: "Authenticated Committee Substitute for Ordinance 190642",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628353&GUID=DAED2DE7-AA03-43D8-B1C9-448EA4DAEEB2&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Committee Substitute for Ordinance 190642, passed September 26, 2019.",
    publicNote: "The authenticated ordinance appropriates Round Two CCED project funds and lists a $490,539 KC Town Hall award.",
    locator: "Authenticated ordinance pp. 1-2, Section 2 and KC Town Hall project line.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-KC-TOWN-HALL-ORDINANCE-190642"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex close reading and PDF visual inspection"],
    supportsGenerally: [
      "appropriation of Round Two CCED project funds",
      "KC Town Hall project line",
      "$490,539 amount",
      "September 26, 2019, authenticated passage"
    ],
    doesNotEstablish: [
      "execution of a funding agreement",
      "disbursement or receipt",
      "expenditure",
      "construction or completion",
      "individual causality for the Council action"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
    title: "Authenticated Second Committee Substitute for Resolution 190649",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628240&GUID=2CBC09C0-65EC-4F05-A70F-FCD8E4F7FBE3&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Second Committee Substitute for Resolution 190649, adopted September 26, 2019.",
    publicNote: "The resolution accepts the Board recommendation for up to $490,539 in eligible KC Town Hall costs and authorizes funding-agreement negotiations subject to specified uses and conditions.",
    locator: "Authenticated resolution pp. 1-2, title and Sections 1-3.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-KC-TOWN-HALL-RESOLUTION-190649"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex close reading and PDF visual inspection"],
    supportsGenerally: [
      "Council acceptance of the Board recommendation",
      "amount not to exceed $490,539",
      "authorization to negotiate a funding agreement",
      "conditions limiting eligible uses"
    ],
    doesNotEstablish: [
      "an executed funding agreement",
      "disbursement or receipt",
      "eligibility of every element in the original proposal",
      "construction or completion"
    ]
  },
  {
    id: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
    title: "Ordinance 240317",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-03-28",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Ordinance 240317, passed March 28, 2024.",
    publicNote: "The later ordinance confirms the 2019 KC Town Hall appropriation, records that the project withdrew, and reappropriates the unused $490,539 allocation.",
    locator: "Legislation text, first and third WHEREAS clauses and Sections 1-2.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-KC-TOWN-HALL-ORDINANCE-240317"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex close reading with live public-record verification"],
    supportsGenerally: [
      "the earlier $490,539 KC Town Hall appropriation",
      "later project withdrawal",
      "the allocation remained unused",
      "2024 reappropriation"
    ],
    doesNotEstablish: [
      "why the project withdrew",
      "individual responsibility for the withdrawal",
      "an executed funding agreement",
      "any disbursement, receipt, or expenditure",
      "current property status"
    ]
  }
] satisfies SourceRecord[];

export const kcTownHallClaims = [
  {
    id: "CLM-KC-TOWN-HALL-PLANNING-AND-DOCUMENTATION-ROLE",
    project: "kc-town-hall",
    claimType: "role",
    internalClaim: "In his approved public resume, Jamie describes serving as KC Town Hall co-founder and project manager and co-leading redevelopment planning and public-benefit documentation.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "In his approved public resume, Jamie describes serving as KC Town Hall co-founder and project manager and co-leading redevelopment planning and public-benefit documentation.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      },
      {
        key: "work-card",
        text: "Jamie's approved public resume describes him as KC Town Hall co-founder and project manager who co-led redevelopment planning and public-benefit documentation.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work", "/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-APPROVED-RESUME-2026",
        relationship: "direct-support",
        supports: ["attributed co-founder and project-manager role", "attributed co-leadership of redevelopment planning and public-benefit documentation"],
        locator: "PDF p. 2, KC Town Hall LLC section.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "This is Jamie's approved public account of his role, not independent third-party corroboration.",
      "The resume supports the role description but does not establish the Board recommendation, Council action, appropriation, disbursement, or completion."
    ],
    antiClaims: [
      "The approved resume independently verifies Jamie's role.",
      "Jamie solely led, owned, or completed the project.",
      "Jamie's planning role caused the Board or Council action."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart approval and Codex text inspection"]
  },
  {
    id: "CLM-KC-TOWN-HALL-PRESENTER-ROLE",
    project: "kc-town-hall",
    claimType: "role",
    internalClaim: "Official Board records name Jamie as the KC Town Hall presenter.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "Official Board records name Jamie as the KC Town Hall presenter.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019",
        relationship: "direct-support",
        supports: ["Jamie's presenter role", "$490,539 request"],
        locator: "PDF p. 6, June 12 presentation table.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Presenter does not mean sole author, owner, or organizer of the collective project."
    ],
    antiClaims: [
      "Jamie alone created or owned the KC Town Hall proposal."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-record review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-BOARD-RECOMMENDATION",
    project: "kc-town-hall",
    claimType: "outcome",
    internalClaim: "On July 16, 2019, all four participating CCED Board members voted to recommend the $490,539 KC Town Hall proposal to the City Council for approval and funding.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "On July 16, 2019, all four participating CCED Board members voted to recommend the $490,539 KC Town Hall proposal to the City Council for approval and funding.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019",
        relationship: "direct-support",
        supports: ["July 16, 2019 recommendation", "$490,539 amount", "four affirmative Board votes", "recommendation to City Council"],
        locator: "PDF p. 13, July 16 recommendation minutes.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The four affirmative votes belong to the CCED Board, not to the City Council.",
      "The recommendation was not a Council appropriation, funding agreement, disbursement, or receipt."
    ],
    antiClaims: [
      "The City Council vote was unanimous.",
      "The Board recommendation itself disbursed public money."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-record review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE",
    project: "kc-town-hall",
    claimType: "outcome",
    internalClaim: "On September 26, 2019, the Kansas City Council adopted Resolution 190649 accepting the Board recommendation for up to $490,539 in eligible KC Town Hall costs and authorizing funding-agreement negotiations.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "On September 26, 2019, the Kansas City Council adopted Resolution 190649, accepting the Board recommendation for up to $490,539 in eligible KC Town Hall costs and authorizing funding-agreement negotiations.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019",
        relationship: "direct-support",
        supports: ["Council action date", "adoption of Resolution 190649"],
        locator: "Meeting Items, files 190642 and 190649.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-KC-TOWN-HALL-RESOLUTION-190649",
        relationship: "direct-support",
        supports: ["acceptance of Board recommendation", "$490,539 limit", "authorization to negotiate"],
        locator: "Authenticated resolution pp. 1-2, title and Sections 1-3.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Acceptance and authorization to negotiate do not establish an executed funding agreement, appropriation by themselves, disbursement, receipt, expenditure, or construction.",
      "The official meeting record does not supply an individual roll-call tally for these Council actions.",
      "Government action should not be converted into sole causality by Jamie or KC Town Hall."
    ],
    antiClaims: [
      "Resolution 190649 by itself appropriated or disbursed $490,539.",
      "The Council vote was unanimous.",
      "Jamie controlled or caused the Council vote.",
      "The project was completed."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-record review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION",
    project: "kc-town-hall",
    claimType: "outcome",
    internalClaim: "On September 26, 2019, the Kansas City Council passed Ordinance 190642, which appropriated $490,539 for KC Town Hall.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "That day, the Council also passed Ordinance 190642, which appropriated $490,539 for KC Town Hall.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      },
      {
        key: "work-card",
        text: "Official records show that the City Council appropriated $490,539 for KC Town Hall.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work", "/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019",
        relationship: "corroborating",
        supports: ["Council action date", "passage of Ordinance 190642"],
        locator: "Meeting Items, file 190642.",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-190642",
        relationship: "direct-support",
        supports: ["appropriation", "KC Town Hall project line", "$490,539 amount"],
        locator: "Authenticated ordinance pp. 1-2, Section 2 and KC Town Hall project line.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Appropriation does not establish an executed funding agreement, disbursement, receipt, expenditure, construction, or completion.",
      "The official meeting record does not supply an individual roll-call tally for this Council action.",
      "Government action should not be converted into sole causality by Jamie or KC Town Hall."
    ],
    antiClaims: [
      "KC Town Hall received or spent $490,539.",
      "The Council vote was unanimous.",
      "Jamie controlled or caused the Council vote.",
      "The project was completed."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-record review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-UNUSED-ALLOCATION",
    project: "kc-town-hall",
    claimType: "chronology",
    internalClaim: "Ordinance 240317 records that KC Town Hall later withdrew and that the City reclaimed the unused $490,539 allocation in 2024.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "active",
    projections: [
      {
        key: "case-study",
        text: "A 2024 ordinance records that the project later withdrew and that the City reclaimed the unused $490,539 allocation.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-ORDINANCE-240317",
        relationship: "direct-support",
        supports: ["project withdrawal", "unused $490,539 allocation", "2024 reappropriation"],
        locator: "Legislation text, third WHEREAS clause and Sections 1-2.",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The ordinance does not state why the project withdrew or assign individual responsibility.",
      "The later withdrawal does not erase the earlier Board recommendation, Council adoption, or appropriation."
    ],
    antiClaims: [
      "Jamie caused the project withdrawal.",
      "The appropriation was disbursed before it was reclaimed.",
      "The source establishes current property status."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-record review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallInquiry = {
  id: "INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE",
  project: "kc-town-hall",
  intakeIds: kcTownHallIntakes
    .filter((item) => item.id !== "INT-2026-07-14-KC-TOWN-HALL-APPROVED-RESUME")
    .map((item) => item.id),
  question: "What public records establish the KC Town Hall sequence from Jamie's presentation and the CCED Board recommendation through City Council action and later disposition?",
  methods: [
    "Closely read the official CCED Board packet and visually inspected the relevant PDF pages.",
    "Reviewed the official September 26, 2019, Council meeting record and authenticated Resolution 190649 and Ordinance 190642.",
    "Reviewed Ordinance 240317 for the later status of the appropriation."
  ],
  runAt: "2026-07-14",
  resultStatus: "recovered",
  findings: [
    "Jamie is named as the KC Town Hall presenter in the Board packet.",
    "All four participating Board members voted to recommend $490,539 to the City Council.",
    "On September 26, 2019, the Council adopted Resolution 190649 and passed Ordinance 190642, which appropriated $490,539 for KC Town Hall.",
    "A 2024 ordinance records that the project withdrew and that the unused allocation was reappropriated."
  ],
  limitations: [
    "The public Council meeting record does not supply an individual roll-call tally for the two actions.",
    "The records do not establish an executed funding agreement, disbursement, receipt, expenditure, or construction.",
    "The 2024 ordinance does not state why the project withdrew or assign individual responsibility."
  ],
  sourceIds: kcTownHallSources
    .filter((source) => source.id !== "SRC-KC-TOWN-HALL-APPROVED-RESUME-2026")
    .map((source) => source.id),
  publicSummary: "Official records establish a four-member CCED Board recommendation followed by City Council adoption and a $490,539 appropriation; a later ordinance records that the project withdrew and the allocation remained unused."
} satisfies ResearchInquiry;

export const kcTownHallCorrections = [
  {
    id: "COR-KC-TOWN-HALL-FUNDING-STAGE-2026",
    claimId: "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION",
    previousText: "The documented public outcome is a $490,539 public funding recommendation.",
    replacementText: "The proposal advanced from a four-member CCED Board recommendation to City Council adoption and a $490,539 appropriation on September 26, 2019.",
    reason: "Official Council records and the authenticated ordinance establish a later appropriation stage beyond the Board recommendation.",
    decidedAt: "2026-07-14",
    affectedSurfaces: ["/work", "/work/kc-town-hall", "/work/technical-operations", "knowledge-bank"],
    status: "active"
  }
] satisfies CorrectionRecord[];

export const kcTownHallPage = {
  id: "kc-town-hall",
  surface: "/work/kc-town-hall",
  sourceOrder: [
    "SRC-KC-TOWN-HALL-APPROVED-RESUME-2026",
    "SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019",
    "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019",
    "SRC-KC-TOWN-HALL-RESOLUTION-190649",
    "SRC-KC-TOWN-HALL-ORDINANCE-190642",
    "SRC-KC-TOWN-HALL-ORDINANCE-240317"
  ],
  occurrences: [
    {
      id: "planning-and-documentation-role",
      claimId: "CLM-KC-TOWN-HALL-PLANNING-AND-DOCUMENTATION-ROLE",
      projection: "case-study",
      sourceIds: ["SRC-KC-TOWN-HALL-APPROVED-RESUME-2026"]
    },
    {
      id: "presenter-role",
      claimId: "CLM-KC-TOWN-HALL-PRESENTER-ROLE",
      projection: "case-study",
      sourceIds: ["SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019"]
    },
    {
      id: "board-recommendation",
      claimId: "CLM-KC-TOWN-HALL-BOARD-RECOMMENDATION",
      projection: "case-study",
      sourceIds: ["SRC-KC-TOWN-HALL-CCED-BOARD-PACKET-2019"]
    },
    {
      id: "council-acceptance",
      claimId: "CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE",
      projection: "case-study",
      sourceIds: [
        "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019",
        "SRC-KC-TOWN-HALL-RESOLUTION-190649"
      ]
    },
    {
      id: "council-appropriation",
      claimId: "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION",
      projection: "case-study",
      sourceIds: [
        "SRC-KC-TOWN-HALL-COUNCIL-MEETING-2019",
        "SRC-KC-TOWN-HALL-ORDINANCE-190642"
      ]
    },
    {
      id: "unused-allocation",
      claimId: "CLM-KC-TOWN-HALL-UNUSED-ALLOCATION",
      projection: "case-study",
      sourceIds: ["SRC-KC-TOWN-HALL-ORDINANCE-240317"]
    }
  ]
} satisfies CitationPage;
