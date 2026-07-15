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
  },
  {
    id: "INT-2026-07-14-KC-TOWN-HALL-PROJECT-TRANSITION-MEMORY",
    kind: "memory",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "Jamie's first-party recollection that he transitioned KC Town Hall project stewardship to a mission-aligned organization.",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["later project period"],
    sensitivity: "public-safe",
    availability: "unknown",
    status: "deferred",
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-KC-TOWN-HALL-PROJECT-TRANSITION"],
    dispositionReason: "The recollection is public-safe but remains first-party. Corroborating public evidence and recipient confirmation should precede public projection."
  },
  {
    id: "INT-2026-07-15-KC-TOWN-HALL-PHASE-ONE-PACKET",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "KC Town Hall's 2019 CCED proposal packet, closely reviewed for Phase One restoration scope, neighborhood-survey process, local hiring, and trade-learning evidence while excluding its private financial appendix.",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2018", "2019"],
    sensitivity: "protected-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019"],
    claimIds: [
      "CLM-KC-TOWN-HALL-PHASE-ONE-SCOPE",
      "CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION",
      "CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY"
    ],
    inquiryIds: ["INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"],
    protectedLocatorId: "KC-TOWN-HALL-PHASE-ONE-PACKET-2019"
  },
  {
    id: "INT-2026-07-15-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY",
    kind: "memory",
    capturedAt: "2026-07-15",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "Jamie's first-person account of Phase One general-contractor work, survey-system design, TiredOfTires operations, and Cleveland Avenue civic-design support.",
    projectIds: [
      "kc-town-hall",
      "tired-of-tires",
      "cleveland-ave-unify-to-beautify"
    ],
    entityIds: [],
    dateHints: ["2018", "2019", "2020", "2021", "2022"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026"],
    claimIds: [
      "CLM-KC-TOWN-HALL-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
      "CLM-KC-TOWN-HALL-SURVEY-SYSTEM-ROLE",
      "CLM-TIRED-OF-TIRES-JAMIE-ROLE",
      "CLM-TIRED-OF-TIRES-INDIAN-MOUND-EXPANSION",
      "CLM-CLEVELAND-AVE-JAMIE-DESIGN-OPERATIONS-ROLE"
    ],
    inquiryIds: [
      "INQ-KC-TOWN-HALL-PHASE-ONE-ROLE",
      "INQ-KC-TOWN-HALL-SURVEY-SYSTEM",
      "INQ-TIRED-OF-TIRES-OPERATIONS",
      "INQ-CLEVELAND-AVE-JAMIE-ROLE"
    ],
    protectedLocatorId: "JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026"
  },
  {
    id: "INT-2026-07-15-TIRED-OF-TIRES-CALCULATOR",
    kind: "artifact",
    capturedAt: "2026-07-15",
    submittedBy: "Codex iCloud archival review",
    publicSafeDescription: "Private KC Town Hall operating calculator with monthly tire-count rows from May 2019 through September 2022.",
    projectIds: ["tired-of-tires"],
    entityIds: [],
    dateHints: ["2019-05", "2022-09"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-TIRED-OF-TIRES-OPERATIONS-CALCULATOR-2019-2022"],
    claimIds: ["CLM-TIRED-OF-TIRES-INTERNAL-LOG-AGGREGATE"],
    inquiryIds: ["INQ-TIRED-OF-TIRES-OPERATIONS"],
    protectedLocatorId: "TIRED-OF-TIRES-OPERATIONS-CALCULATOR-2019-2022"
  },
  {
    id: "INT-2026-07-15-TIRED-OF-TIRES-FACEBOOK-POST",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex authenticated Facebook review",
    publicSafeDescription: "Public Cleveland Ave KC post describing a monthly residential tire-pickup service operated by KC Town Hall with the Oak Park Neighborhood Association.",
    submittedUrl: "https://www.facebook.com/ClevelandAveKC/posts/1633775000115273",
    projectIds: ["tired-of-tires"],
    entityIds: [],
    dateHints: ["2020-09"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-FB-CLEVELAND-AVE-TIRED-OF-TIRES-2020"],
    claimIds: ["CLM-TIRED-OF-TIRES-OPERATING-PROGRAM"],
    inquiryIds: ["INQ-TIRED-OF-TIRES-OPERATIONS"]
  },
  {
    id: "INT-2026-07-15-HENC-STRATEGIC-PLAN",
    kind: "url",
    capturedAt: "2026-07-15",
    submittedBy: "Codex public-source research",
    publicSafeDescription: "HENC's public strategic plan describing the coalition's history, purpose, and neighborhood-association structure.",
    submittedUrl: "https://extension.missouri.edu/media/wysiwyg/News/TheNetwork/March2024/HENC%20Strategic%20Plan%203.0%20%28PDF%29.pdf",
    projectIds: ["cleveland-ave-unify-to-beautify"],
    entityIds: [],
    dateHints: ["2009", "2024"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-HENC-STRATEGIC-PLAN-2024"],
    claimIds: ["CLM-CLEVELAND-AVE-JAMIE-DESIGN-OPERATIONS-ROLE"],
    inquiryIds: ["INQ-CLEVELAND-AVE-JAMIE-ROLE"]
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
    "Board presentation materials, the building and neighborhood context, planning sessions, public-benefit documentation, and collaborators, with property, participant, and private-record boundaries reviewed.",
    "Phase One roof, masonry, carpentry, welding, water-service, egress, and scaffolding work; measured drawings and survey cards; daily site coordination; and neighborhood conversations, with worker credit and site-safety context preserved."
  ]
} satisfies ProjectRecord;

export const tiredOfTiresProject = {
  id: "tired-of-tires",
  title: "TiredOfTires",
  summary: "Recurring free residential tire-pickup operations associated with KC Town Hall and the Oak Park Neighborhood Association, documented through public posts and a private operating calculator.",
  status: "historical",
  period: { start: "2019", end: "2022" },
  entityIds: [],
  publicSurfaceCandidates: [],
  photoResearchPrompts: [
    "Monthly pickup routes, collected tires, handbills, city recycling handoff, neighborhood partners, and volunteer operations, without exposing resident addresses or request records."
  ]
} satisfies ProjectRecord;

export const clevelandAveProject = {
  id: "cleveland-ave-unify-to-beautify",
  title: "Cleveland Ave Unify to Beautify",
  summary: "A neighborhood-corridor initiative associated with the Historic East Neighborhoods Coalition, currently preserved as a research project pending fuller source recovery and collaborator confirmation.",
  status: "research",
  period: {},
  entityIds: [],
  publicSurfaceCandidates: [],
  photoResearchPrompts: [
    "Cleveland Avenue listening sessions, corridor maps, identity materials, handbills, public meetings, participating neighborhood associations, and elected-official context, with creator and participant credit reviewed."
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
  },
  {
    id: "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
    title: "KC Town Hall CCED proposal and supporting letters",
    organization: "KC Town Hall",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2019-03-25",
    accessedAt: "2026-07-15",
    publicCitation: "KC Town Hall, CCED proposal and supporting letters, 2019.",
    publicNote: "The project packet documents Phase One's cold-shell scope, neighborhood-survey process, local hiring, trade learning, and a line-item budget while containing a private appendix that is excluded from the public repository.",
    locator: "PDF pp. 4, 7, and 11-12; private appendix excluded.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-15-KC-TOWN-HALL-PHASE-ONE-PACKET"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex text extraction and visual PDF inspection"],
    supportsGenerally: [
      "Phase One cold-shell scope",
      "$189,629 Phase One budget",
      "2018 roof and structural-masonry progress",
      "2019 completion column in the Phase One budget",
      "neighborhood survey with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
      "project-reported local hiring and masonry trade learning"
    ],
    doesNotEstablish: [
      "Jamie's general-contractor role",
      "the general contractor of record",
      "independent audit or closeout of Phase One completion",
      "Jamie as sole author of the survey or proposal",
      "Phase Two construction or completion",
      "public suitability of the packet's financial appendix"
    ],
    protectedLocatorId: "KC-TOWN-HALL-PHASE-ONE-PACKET-2019"
  },
  {
    id: "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026",
    title: "Jamie Burkart first-person KC neighborhood-stewardship note",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    publicCitation: "Jamie Burkart, first-person archival note, July 15, 2026.",
    publicNote: "Jamie describes his Phase One site-coordination role, survey-system work, TiredOfTires operations, and Cleveland Avenue design and communications support.",
    locator: "First-person archival submission; public-safe synopsis only.",
    projectIds: [
      "kc-town-hall",
      "tired-of-tires",
      "cleveland-ave-unify-to-beautify"
    ],
    intakeIds: ["INT-2026-07-15-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart submission and Codex claim decomposition"],
    supportsGenerally: [
      "Jamie's attributed Phase One general-contractor and daily site-coordination role",
      "Jamie's attributed survey-handbill and data-system role",
      "Jamie's attributed TiredOfTires design, city-coordination, and monthly pickup role",
      "Jamie's attributed Indian Mound expansion recollection",
      "Jamie's attributed Cleveland Avenue identity, mapping, photography, social, print, and meeting-support role",
      "Pastor Lee's credited corridor concept"
    ],
    doesNotEstablish: [
      "independent corroboration",
      "contractor-of-record or licensure status",
      "sole authorship, sole founding, or sole operational responsibility",
      "audited tire-removal totals",
      "causality for municipal capital decisions",
      "authority to speak for neighborhood associations, HENC, Pastor Lee, or other collaborators"
    ],
    protectedLocatorId: "JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026"
  },
  {
    id: "SRC-TIRED-OF-TIRES-OPERATIONS-CALCULATOR-2019-2022",
    title: "KC Town Hall tire-pickup operations calculator",
    organization: "KC Town Hall",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-01-26",
    accessedAt: "2026-07-15",
    publicCitation: "KC Town Hall, tire-pickup operations calculator, 2019-2022.",
    publicNote: "The private calculator records monthly rimmed, rimless, large-tire, total-count, and estimated-fee rows from May 2019 through September 2022.",
    locator: "Monthly columns and total-count row; public-safe aggregate only.",
    projectIds: ["tired-of-tires"],
    intakeIds: ["INT-2026-07-15-TIRED-OF-TIRES-CALCULATOR"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured CSV review"],
    supportsGenerally: [
      "26 monthly columns from May 2019 through September 2022",
      "25 nonzero logged pickup months",
      "1,970 aggregate tires in the total-count row",
      "project-reported operating geography fields"
    ],
    doesNotEstablish: [
      "independent audit",
      "unique tires or unique households",
      "who performed each pickup",
      "complete program history",
      "independently verified disposal-fee savings",
      "Indian Mound expansion"
    ],
    protectedLocatorId: "TIRED-OF-TIRES-OPERATIONS-CALCULATOR-2019-2022"
  },
  {
    id: "SRC-FB-CLEVELAND-AVE-TIRED-OF-TIRES-2020",
    title: "Cleveland Ave KC post about monthly free tire pickup",
    organization: "Cleveland Ave KC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/ClevelandAveKC/posts/1633775000115273",
    preferredPublicUrl: "canonical",
    publicCitation: "Cleveland Ave KC, public Facebook post about monthly free tire pickup, 2020.",
    publicNote: "The post says KC Town Hall and the Oak Park Neighborhood Association offered monthly free residential tire pickup in historic east Kansas City and routed residents to request pickup or volunteer.",
    locator: "Public post text beginning 'KC Town Hall & the Oak Park Neighborhood Association'.",
    projectIds: ["tired-of-tires"],
    intakeIds: ["INT-2026-07-15-TIRED-OF-TIRES-FACEBOOK-POST"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated Facebook inspection"],
    supportsGenerally: [
      "monthly free residential tire-pickup program",
      "KC Town Hall and Oak Park Neighborhood Association program framing",
      "historic east Kansas City service area",
      "pickup-request and volunteer routes",
      "project-reported disposal-fee savings"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "independently verified tire or savings totals",
      "complete program duration",
      "Indian Mound expansion",
      "sole ownership by KC Town Hall or Oak Park Neighborhood Association"
    ]
  },
  {
    id: "SRC-HENC-STRATEGIC-PLAN-2024",
    title: "HENC Strategic Plan 3.0",
    organization: "Historic East Neighborhoods Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-01-01",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://extension.missouri.edu/media/wysiwyg/News/TheNetwork/March2024/HENC%20Strategic%20Plan%203.0%20%28PDF%29.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "Historic East Neighborhoods Coalition, HENC Strategic Plan 3.0, 2024.",
    publicNote: "The plan describes HENC as a coalition of neighborhood associations and community stakeholders formed in 2009 to support and empower Kansas City's east-side neighborhoods.",
    locator: "PDF pp. 2-3, About HENC and historic membership.",
    projectIds: ["cleveland-ave-unify-to-beautify"],
    intakeIds: ["INT-2026-07-15-HENC-STRATEGIC-PLAN"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex public-source review"],
    supportsGenerally: [
      "HENC organization and mission",
      "2009 coalition origin",
      "neighborhood-association and community-stakeholder structure",
      "east-side neighborhood focus"
    ],
    doesNotEstablish: [
      "Cleveland Ave Unify to Beautify program details",
      "Jamie's membership, co-founding, or design role",
      "Pastor Lee's authorship of the corridor concept",
      "specific meetings, participants, funding decisions, or capital outcomes"
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
      },
      {
        sourceId: "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
        relationship: "corroborating",
        supports: ["Jamie's attributed co-initiation statement", "stated public-benefit intention"],
        locator: "Public project-announcement post text.",
        confidence: "moderate",
        renderCitation: false
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
    editorialStatus: "unused",
    projections: [
      {
        key: "case-study",
        text: "A 2024 ordinance records that the project later withdrew and that the City reclaimed the unused $490,539 allocation.",
        status: "hold",
        citationRequired: false,
        surfaces: []
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
      "The later withdrawal does not erase the earlier Board recommendation, Council adoption, or appropriation.",
      "The City's administrative record does not describe how project stewardship changed."
    ],
    antiClaims: [
      "Jamie caused the project withdrawal.",
      "Jamie abandoned the project.",
      "The appropriation was disbursed before it was reclaimed.",
      "The source establishes current property status."
    ],
    researchInquiryIds: [
      "INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE",
      "INQ-KC-TOWN-HALL-PROJECT-TRANSITION"
    ],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-record review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-PHASE-ONE-SCOPE",
    project: "kc-town-hall",
    claimType: "activity",
    internalClaim: "KC Town Hall's 2019 CCED packet defines Phase One as a $189,629 cold-shell scope spanning roof and TPO membrane work, structural masonry, floor framing, water service, construction staging, debris and tree removal, basement egress, material transport, property acquisition, site safety, air-quality controls, and supporting costs.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
        relationship: "direct-support",
        supports: ["Phase One cold-shell definition", "$189,629 total", "line-item work categories"],
        locator: "PDF pp. 11-12, Summary of Budget and Phase One budget detail.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The project-authored packet establishes the documented scope and budget, not an independent construction audit or Jamie's individual role.",
      "Specialized work categories do not establish who contracted, supervised, designed, stamped, or performed each task."
    ],
    antiClaims: [
      "The packet independently verifies that every Phase One line item was completed exactly as budgeted.",
      "Jamie personally performed every trade represented in the Phase One scope.",
      "Phase One included the later Phase Two warm-shell buildout."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex close reading and visual PDF inspection"]
  },
  {
    id: "CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION",
    project: "kc-town-hall",
    claimType: "chronology",
    internalClaim: "The March 2019 packet records 2018 roof and structural-masonry progress and labels its Phase One budget 'Completed 2019'; Jamie separately remembers Phase One reaching completion in 2019.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
        relationship: "direct-support",
        supports: ["2018 documented progress", "2019 completion label", "2018 and 2019 budget columns"],
        locator: "PDF pp. 11-12.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026",
        relationship: "private-support",
        supports: ["Jamie's attributed 2019 completion recollection"],
        locator: "First-person archival submission.",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "The same contemporaneous packet says Phase One was 66 percent complete and slated for completion in 2019 before presenting a later budget page labeled completed; the internal timing requires care.",
      "No independent closeout report, permit completion, contractor affidavit, or final invoice set has yet been linked."
    ],
    antiClaims: [
      "The packet independently proves a formally certified Phase One closeout.",
      "Phase Two was completed in 2019.",
      "The full KC Town Hall redevelopment was completed."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart first-person account and Codex source review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
    project: "kc-town-hall",
    claimType: "role",
    internalClaim: "Jamie states that he served as general contractor for Phase One, coordinating historic brick masonry, roofing, carpentry, welding, engineering, architecture, plumbing, site sequencing, measurements, and daily work from basement through roof deck.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026",
        relationship: "private-support",
        supports: ["attributed general-contractor role", "attributed daily site coordination", "attributed multi-trade sequencing"],
        locator: "First-person archival submission.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
        relationship: "context",
        supports: ["specialized Phase One workstreams", "roof, masonry, framing, water, egress, safety, and air-quality scope"],
        locator: "PDF pp. 7 and 11-12.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The role is presently Jamie's first-person account; the packet corroborates the scope but does not name the general contractor.",
      "General-contractor coordination does not erase Julia Fredenburg, trade contractors, architects, engineers, neighborhood collaborators, or workers.",
      "The current record does not establish a statutory contractor-of-record designation or licensure status."
    ],
    antiClaims: [
      "The CCED packet names Jamie as general contractor.",
      "Jamie solely designed, engineered, restored, or constructed the building.",
      "Jamie personally performed licensed architectural, engineering, plumbing, roofing, masonry, carpentry, or welding work."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart first-person account and Codex claim review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY",
    project: "kc-town-hall",
    claimType: "activity",
    internalClaim: "The 2019 packet documents an ongoing neighborhood survey conducted with the Oak Park Neighborhood Association and New Horizon Missionary Baptist Church and states that survey results directly shaped the proposal.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
        relationship: "direct-support",
        supports: ["survey existence", "named neighborhood partners", "survey questions", "project-reported influence on proposal"],
        locator: "PDF p. 4, Neighborhood Process; p. 23, support letter.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The packet is project-authored and reports that the survey shaped the proposal; no response denominator, raw dataset, or independent evaluation is currently linked.",
      "The source does not assign sole authorship of the survey or data system to Jamie."
    ],
    antiClaims: [
      "The survey represented every neighborhood resident.",
      "The packet independently verifies survey methodology or impact.",
      "Jamie alone designed or conducted the neighborhood process."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-SURVEY-SYSTEM"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex close reading and visual PDF inspection"]
  },
  {
    id: "CLM-KC-TOWN-HALL-SURVEY-SYSTEM-ROLE",
    project: "kc-town-hall",
    claimType: "role",
    internalClaim: "Jamie states that he designed a 4-by-6-inch neighborhood survey handbill and backing contact-and-response system and used daily site presence and neighborhood service routes to collect visions, stories, contacts, and priorities.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026",
        relationship: "private-support",
        supports: ["attributed handbill design", "attributed backing-data system", "attributed field collection practice"],
        locator: "First-person archival submission.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
        relationship: "corroborating",
        supports: ["surviving survey handbill image", "survey fields", "named neighborhood partners", "project-reported proposal influence"],
        locator: "PDF p. 4, Neighborhood Process.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The surviving packet corroborates the handbill and process, not Jamie's sole design authorship or the architecture of the backing data system.",
      "Resident stories, contact records, addresses, and raw responses remain protected."
    ],
    antiClaims: [
      "Jamie alone authored every survey question or neighborhood-process decision.",
      "The raw survey dataset belongs in the public repository.",
      "The survey proves representative neighborhood consensus."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-SURVEY-SYSTEM"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart first-person account and Codex source review"]
  },
  {
    id: "CLM-TIRED-OF-TIRES-OPERATING-PROGRAM",
    project: "tired-of-tires",
    claimType: "activity",
    internalClaim: "Public KC Town Hall and Cleveland Ave KC records document TiredOfTires as a recurring free residential tire-pickup program associated with KC Town Hall and the Oak Park Neighborhood Association in historic east Kansas City.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-FB-CLEVELAND-AVE-TIRED-OF-TIRES-2020",
        relationship: "direct-support",
        supports: ["monthly free residential pickup", "KC Town Hall and Oak Park program framing", "historic east Kansas City service area", "request and volunteer route"],
        locator: "Public post text.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KC-TOWN-HALL-CORPUS-2026",
        relationship: "corroborating",
        supports: ["107 TiredOfTires-tagged records", "2018-2022 recurring operations communication"],
        locator: "Reconciled private corpus summary.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The records establish a recurring public program and action route, not every pickup, participant, disposal receipt, or outcome.",
      "Program association does not assign every post or operational task to Jamie."
    ],
    antiClaims: [
      "Every TiredOfTires post represents a separate completed pickup.",
      "KC Town Hall or Jamie solely owned the neighborhood program.",
      "Public posts independently verify tire totals, disposal, savings, environmental outcomes, or neighborhood-wide coverage."
    ],
    researchInquiryIds: ["INQ-TIRED-OF-TIRES-OPERATIONS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated Facebook and social-corpus review"]
  },
  {
    id: "CLM-TIRED-OF-TIRES-INTERNAL-LOG-AGGREGATE",
    project: "tired-of-tires",
    claimType: "metric",
    internalClaim: "A private KC Town Hall calculator records 1,970 tires across 25 nonzero logged pickup months within 26 monthly columns from May 2019 through September 2022.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-TIRED-OF-TIRES-OPERATIONS-CALCULATOR-2019-2022",
        relationship: "private-support",
        supports: ["1,970 total-count aggregate", "25 nonzero months", "May 2019 through September 2022 columns"],
        locator: "Monthly headers and total-count row.",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "This is an internal project calculator, not an independent audit, city disposal ledger, or household-level dataset.",
      "The aggregate may include repeated locations, tires collected outside a narrow walk area, or operating definitions that require collaborator review."
    ],
    antiClaims: [
      "An independent source verified 1,970 unique tires or households.",
      "The spreadsheet proves Jamie personally collected every logged tire.",
      "The recorded fee estimate is audited savings or measured economic impact."
    ],
    researchInquiryIds: ["INQ-TIRED-OF-TIRES-OPERATIONS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured CSV review"]
  },
  {
    id: "CLM-TIRED-OF-TIRES-JAMIE-ROLE",
    project: "tired-of-tires",
    claimType: "role",
    internalClaim: "Jamie states that he designed the TiredOfTires program, coordinated its free-pickup arrangement with Kansas City on behalf of the Oak Park Neighborhood Association, produced outreach materials, collected tires monthly, delivered them to the city recycling center, and maintained the operating spreadsheet.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026",
        relationship: "private-support",
        supports: ["attributed program design", "attributed city coordination", "attributed monthly field operations", "attributed print and recordkeeping role"],
        locator: "First-person archival submission.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-FB-CLEVELAND-AVE-TIRED-OF-TIRES-2020",
        relationship: "context",
        supports: ["public program framing", "monthly pickup cadence", "KC Town Hall and Oak Park association"],
        locator: "Public post text.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-TIRED-OF-TIRES-OPERATIONS-CALCULATOR-2019-2022",
        relationship: "corroborating",
        supports: ["surviving monthly operational record"],
        locator: "Monthly columns and total-count row.",
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Jamie's individual role remains first-party; public program records and the calculator corroborate the operation, not who performed each task.",
      "Credit remains collective with Oak Park Neighborhood Association, city staff, residents, volunteers, KC Town Hall collaborators, and later neighborhood partners."
    ],
    antiClaims: [
      "Jamie alone created, operated, or delivered TiredOfTires.",
      "The public Facebook post names Jamie as program designer or operator.",
      "Jamie has independently verified every pickup, tire count, disposal, or savings estimate."
    ],
    researchInquiryIds: ["INQ-TIRED-OF-TIRES-OPERATIONS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart first-person account and Codex evidence review"]
  },
  {
    id: "CLM-TIRED-OF-TIRES-INDIAN-MOUND-EXPANSION",
    project: "tired-of-tires",
    claimType: "chronology",
    internalClaim: "Jamie remembers the TiredOfTires program later expanding to include the Indian Mound neighborhood.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026",
        relationship: "private-support",
        supports: ["attributed Indian Mound expansion recollection"],
        locator: "First-person archival submission.",
        confidence: "limited",
        renderCitation: false
      }
    ],
    boundaries: [
      "No dated public post, city record, operational log field, or Indian Mound collaborator confirmation has yet been linked."
    ],
    antiClaims: [
      "The current source set independently confirms the Indian Mound expansion date, scope, or duration.",
      "The program served every household in Indian Mound."
    ],
    researchInquiryIds: ["INQ-TIRED-OF-TIRES-OPERATIONS"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart first-person account and Codex claim review"]
  },
  {
    id: "CLM-CLEVELAND-AVE-JAMIE-DESIGN-OPERATIONS-ROLE",
    project: "cleveland-ave-unify-to-beautify",
    claimType: "role",
    internalClaim: "Jamie states that he was a co-founding member of Cleveland Ave Unify to Beautify and served as a pro bono design, print, photography, mapping, social-media, and listening-session support studio; he credits Pastor Lee with the corridor concept connecting east-side neighborhood-association areas.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      {
        sourceId: "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026",
        relationship: "private-support",
        supports: ["attributed co-founding membership", "attributed design and print role", "Pastor Lee concept credit", "attributed meeting and corridor-map support"],
        locator: "First-person archival submission.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-HENC-STRATEGIC-PLAN-2024",
        relationship: "context",
        supports: ["HENC coalition identity", "east-side neighborhood-association structure", "coalition mission"],
        locator: "PDF pp. 2-3.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The current public HENC source establishes organizational context, not Cleveland Ave program details or Jamie's role.",
      "Pastor Lee retains credit for the corridor concept in Jamie's account; other founders, residents, neighborhood associations, elected officials, and city staff require fuller identification.",
      "No public capital-allocation record has yet been linked to establish program causality."
    ],
    antiClaims: [
      "Jamie solely founded, authored, or led Cleveland Ave Unify to Beautify.",
      "Jamie originated Pastor Lee's Cleveland Avenue corridor concept.",
      "The initiative caused a specific discretionary funding or capital-improvement decision.",
      "Jamie speaks for HENC, Pastor Lee, participating neighborhoods, residents, elected officials, or city staff."
    ],
    researchInquiryIds: ["INQ-CLEVELAND-AVE-JAMIE-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart first-person account and Codex source review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallInquiry = {
  id: "INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE",
  project: "kc-town-hall",
  intakeIds: kcTownHallIntakes
    .filter((item) => item.kind === "url")
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

export const kcTownHallTransitionInquiry = {
  id: "INQ-KC-TOWN-HALL-PROJECT-TRANSITION",
  project: "kc-town-hall",
  intakeIds: ["INT-2026-07-14-KC-TOWN-HALL-PROJECT-TRANSITION-MEMORY"],
  question: "What public-safe evidence can corroborate Jamie's recollection that he transitioned KC Town Hall project stewardship to a mission-aligned organization, and how should the recipient and timing be described?",
  methods: [
    "Identify public-facing records of the organizational transition.",
    "Seek collaborator or recipient confirmation suitable for public attribution.",
    "Compare the transition chronology with the municipal record without treating them as the same legal event."
  ],
  runAt: "2026-07-14",
  resultStatus: "inconclusive",
  findings: [
    "Jamie supplied a public-safe first-party recollection that he transitioned project stewardship to a mission-aligned organization."
  ],
  limitations: [
    "No corroborating public source or recipient confirmation has been linked.",
    "The receiving organization and transition date have not been verified for public attribution.",
    "The municipal withdrawal record does not describe any organizational transition."
  ],
  sourceIds: []
} satisfies ResearchInquiry;

export const kcTownHallNeighborhoodInquiries = [
  {
    id: "INQ-KC-TOWN-HALL-PHASE-ONE-ROLE",
    project: "kc-town-hall",
    intakeIds: [
      "INT-2026-07-15-KC-TOWN-HALL-PHASE-ONE-PACKET",
      "INT-2026-07-15-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY"
    ],
    question: "What contemporaneous records and collaborator accounts can corroborate Jamie's Phase One general-contractor role and establish the construction-completion chronology?",
    methods: [
      "Recover contracts, proposals, invoices, payment records, permits, inspection records, measured drawings, schedules, photographs, and project correspondence.",
      "Seek public-safe confirmation from Julia Fredenburg and the masonry, roofing, carpentry, welding, engineering, architecture, plumbing, and other trade teams.",
      "Separate daily field coordination from contractor-of-record, licensed design, trade performance, ownership, and collective project leadership."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The project packet establishes the specialized Phase One scope and a $189,629 budget.",
      "The packet records 2018 roof and structural-masonry progress and contains a 2019 completion label.",
      "Jamie supplied a detailed first-person account of serving as general contractor and coordinating daily site work."
    ],
    limitations: [
      "The packet does not name the general contractor.",
      "The packet's narrative and budget pages use different temporal frames for 2019 completion.",
      "No independent closeout record or collaborator confirmation has yet been linked."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
      "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026"
    ],
    protectedLocatorId: "KC-TOWN-HALL-PHASE-ONE-ROLE-RESEARCH-2026"
  },
  {
    id: "INQ-KC-TOWN-HALL-SURVEY-SYSTEM",
    project: "kc-town-hall",
    intakeIds: [
      "INT-2026-07-15-KC-TOWN-HALL-PHASE-ONE-PACKET",
      "INT-2026-07-15-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY"
    ],
    question: "What surviving artifacts and collaborator accounts can document Jamie's role in the KC Town Hall neighborhood-survey handbill and backing data system?",
    methods: [
      "Recover the original handbill source file, print runs, response schema, intake forms, contact-system structure, and aggregate response analysis without exposing resident data.",
      "Seek public-safe confirmation from Oak Park Neighborhood Association, New Horizon Missionary Baptist Church, Julia Fredenburg, and other process collaborators.",
      "Compare survey fields and proposal choices while avoiding representative-consensus or causal claims unsupported by method and response data."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The packet reproduces the survey handbill and names two neighborhood partners.",
      "The packet states that survey results directly shaped the proposal.",
      "Jamie supplied a first-person account of designing the handbill and backing system and using field operations to collect responses."
    ],
    limitations: [
      "The raw responses and contact records are protected.",
      "No original design file, response denominator, method note, or collaborator confirmation has yet been linked.",
      "The current record does not support sole authorship or representative-consensus claims."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-PHASE-ONE-PACKET-2019",
      "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026"
    ],
    protectedLocatorId: "KC-TOWN-HALL-SURVEY-SYSTEM-RESEARCH-2026"
  },
  {
    id: "INQ-TIRED-OF-TIRES-OPERATIONS",
    project: "tired-of-tires",
    intakeIds: [
      "INT-2026-07-15-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY",
      "INT-2026-07-15-TIRED-OF-TIRES-CALCULATOR",
      "INT-2026-07-15-TIRED-OF-TIRES-FACEBOOK-POST"
    ],
    question: "What public-safe records can corroborate Jamie's individual TiredOfTires role, reconcile the private operating totals, and document the remembered Indian Mound expansion?",
    methods: [
      "Recover city recycling receipts, fee schedules, route logs, pickup forms, handbills, public posts, neighborhood-association minutes, and city correspondence.",
      "Seek collaborator confirmation from Oak Park Neighborhood Association, Indian Mound neighborhood participants, KC Town Hall collaborators, volunteers, and city staff.",
      "Reconcile monthly spreadsheet definitions with public post totals without exposing resident addresses, pickup requests, or personal contact data."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A public Cleveland Ave KC post documents a monthly KC Town Hall and Oak Park residential pickup program.",
      "The reconciled KC Town Hall X corpus contains 107 TiredOfTires-tagged records.",
      "A private calculator records 1,970 tires across 25 nonzero logged months from May 2019 through September 2022.",
      "Jamie supplied a first-person account of program design, city coordination, monthly field operations, and later Indian Mound expansion."
    ],
    limitations: [
      "The calculator is not an independent audit or city disposal ledger.",
      "Public program records do not identify who performed each pickup or authored each post.",
      "No dated Indian Mound source or collaborator confirmation has yet been linked."
    ],
    sourceIds: [
      "SRC-FB-CLEVELAND-AVE-TIRED-OF-TIRES-2020",
      "SRC-X-KC-TOWN-HALL-CORPUS-2026",
      "SRC-TIRED-OF-TIRES-OPERATIONS-CALCULATOR-2019-2022",
      "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026"
    ],
    protectedLocatorId: "TIRED-OF-TIRES-OPERATIONS-RESEARCH-2026"
  },
  {
    id: "INQ-CLEVELAND-AVE-JAMIE-ROLE",
    project: "cleveland-ave-unify-to-beautify",
    intakeIds: [
      "INT-2026-07-15-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY",
      "INT-2026-07-15-HENC-STRATEGIC-PLAN"
    ],
    question: "What records and collaborator accounts can document Cleveland Ave Unify to Beautify, Pastor Lee's corridor concept, Jamie's co-founding and design role, participating neighborhoods, and any relationship to public capital decisions?",
    methods: [
      "Recover public Page posts, identity source files, maps, photography, handbills, meeting notices, listening-session materials, sign-in records, and HENC or neighborhood-association minutes.",
      "Seek public-safe confirmation from Pastor Lee, HENC, participating neighborhood associations, residents, elected officials, and city staff.",
      "Locate official discretionary-funding or capital-improvement records before making any contribution or causality claim."
    ],
    runAt: "2026-07-15",
    resultStatus: "inconclusive",
    findings: [
      "HENC's strategic plan establishes the coalition's east-side neighborhood-association structure and mission.",
      "Jamie supplied a first-person account that credits Pastor Lee with the corridor concept and describes Jamie's co-founding, design, print, photography, mapping, social, and meeting-support role."
    ],
    limitations: [
      "The reviewed HENC plan does not describe Cleveland Ave Unify to Beautify or Jamie's role.",
      "No collaborator confirmation, source-design files, meeting packet, or capital-decision record has yet been linked.",
      "The current record does not support sole founding, sole authorship, or funding-causality claims."
    ],
    sourceIds: [
      "SRC-HENC-STRATEGIC-PLAN-2024",
      "SRC-JAMIE-KC-NEIGHBORHOOD-STEWARDSHIP-MEMORY-2026"
    ],
    protectedLocatorId: "CLEVELAND-AVE-JAMIE-ROLE-RESEARCH-2026"
  }
] satisfies ResearchInquiry[];

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
    "SRC-KC-TOWN-HALL-ORDINANCE-190642"
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
    }
  ]
} satisfies CitationPage;
