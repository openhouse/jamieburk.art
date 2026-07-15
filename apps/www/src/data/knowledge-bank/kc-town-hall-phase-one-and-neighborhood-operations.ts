import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const kcTownHallPhaseOneNeighborhoodSources = [
  {
    id: "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020",
    title: "KC Town Hall published survey and Tired of Tires pages",
    organization: "KC Town Hall",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publicCitation:
      "Public-safe archival review of KC Town Hall's published survey and Tired of Tires pages, captured through 2020.",
    publicNote:
      "The review preserves page-level propositions without publishing the underlying site export, form responses, contact data, or administrative records.",
    protectedLocatorId: "ARCHIVE-KC-TOWN-HALL-PUBLIC-SITE-2020",
    supportsGenerally: [
      "KC Town Hall published a neighborhood survey page with a backing Google Form",
      "KC Town Hall and the Oak Park Neighborhood Association presented a monthly free tire-pickup service for homes in Kansas City historic east neighborhoods",
      "the Tired of Tires page reported $17,768 in avoided tire-disposal fees by its 2020 update"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship of the survey handbill or form",
      "Jamie's individual design, coordination, pickup, hauling, or reporting role",
      "expansion of the program to Indian Mound",
      "an independently audited savings figure",
      "the exact number of tires collected",
      "current program operation"
    ]
  },
  {
    id: "SRC-KCMO-WASTE-TIRE-DROPOFF-PROGRAM",
    title: "City waste-tire drop-off program for residents and neighborhood groups",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.kcmo.gov/Home/Components/Calendar/Event/5438/2222?npage=2&toggle=all",
    preferredPublicUrl: "canonical",
    publicCitation:
      "City of Kansas City, Missouri, waste-tire drop-off program for residents and neighborhood groups.",
    publicNote:
      "The City page documents the municipal operating mechanism: approved neighborhood groups may deliver residents' tires at no charge to the Environmental Campus during scheduled collection days.",
    supportsGenerally: [
      "Kansas City operates a no-charge waste-tire drop-off mechanism for approved neighborhood groups",
      "the mechanism is for residents rather than businesses",
      "the Environmental Campus serves as the drop-off location"
    ],
    doesNotEstablish: [
      "the historical dates or exact procedures used in 2019 or 2020",
      "KC Town Hall's or Oak Park Neighborhood Association's participation",
      "Jamie's role in Tired of Tires",
      "the Indian Mound expansion",
      "program savings or tire counts"
    ]
  },
  {
    id: "SRC-HENC-STRATEGIC-PLAN-2024",
    title: "Historic East Neighborhoods Coalition Strategic Plan 3.0",
    organization: "Historic East Neighborhoods Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://extension.missouri.edu/media/wysiwyg/News/TheNetwork/March2024/HENC%20Strategic%20Plan%203.0%20%28PDF%29.pdf",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Historic East Neighborhoods Coalition, Strategic Plan 3.0, updated January 2024.",
    publicNote:
      "The plan documents HENC's east-side coalition history, Oak Park membership, and goals around neighborhood alliances, beautification, surveys, PIAC engagement, and capital funding.",
    supportsGenerally: [
      "HENC formed as a coalition of Kansas City east-side neighborhood associations",
      "Oak Park is listed among HENC member neighborhoods",
      "HENC's goals include neighborhood cleanups and beautification",
      "HENC's goals include resident surveys, PIAC engagement, and pursuit of capital funding"
    ],
    doesNotEstablish: [
      "the Cleveland Avenue Unify to Beautify program",
      "Jamie's role in HENC or the Cleveland Avenue program",
      "Pastor Lee's authorship of the corridor concept",
      "elected officials' participation in listening sessions",
      "a causal relationship to any funding allocation"
    ]
  }
] satisfies SourceRecord[];

export const kcTownHallPhaseOneNeighborhoodClaims = [
  {
    id: "CLM-KC-TOWN-HALL-PHASE-ONE-RESTORATION",
    project: "kc-town-hall",
    internalClaim:
      "Jamie reports serving as general contractor for KC Town Hall Phase One; the 2019 municipal packet independently labels the $189,629 cold-shell phase completed in 2019 and itemizes roof and TPO membrane work, masonry restoration, floor framing, water connection, access, safety, transport, and cleanup.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "The 2019 municipal packet labels KC Town Hall's $189,629 Phase One cold-shell work completed and itemizes roof and TPO membrane work, masonry restoration, floor framing, water connection, access, safety, transport, and cleanup. Jamie reports serving as general contractor for this phase.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Retain the substantial completed construction record in the bank while holding Jamie's general-contractor title from publication until an independent role-attribution source is recovered."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
        relationship: "direct-support",
        supports: [
          "Phase One cold-shell work was labeled completed in 2019",
          "the Phase One value was listed as $189,629",
          "Phase One included roof and TPO membrane work, masonry, floor framing, water connection, access, safety, transport, and cleanup"
        ],
        locator: "Finance section, Phase One narrative and budget detail",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The general-contractor title is Jamie's firsthand account; the reviewed municipal packet documents his founder and presenter role but does not assign that title.",
      "Phase One completion is not completion of the later funded redevelopment or Phase Two.",
      "Do not imply Jamie personally performed every trade or worked without contractors, architects, engineers, and neighborhood collaborators.",
      "Do not publish private banking, contact, or legal details contained in the application packet."
    ],
    antiClaims: [
      "Jamie personally performed every construction trade.",
      "KC Town Hall's complete redevelopment was finished in 2019.",
      "Phase One was paid for with the later $490,539 municipal appropriation.",
      "The municipal packet independently confirms Jamie's general-contractor title."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex document review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY",
    project: "kc-town-hall",
    internalClaim:
      "Jamie reports designing the 4-by-6 neighborhood survey handbill and backing data-collection system; the 2019 municipal packet reproduces the survey, says it was conducted with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church, and says its results directly shaped the proposal, while the project archive preserves the backing Google Form.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "KC Town Hall used a neighborhood survey developed with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church; the 2019 proposal says the results directly shaped the plan. Jamie reports designing the handbill and backing data-collection system.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Preserve the documented listening method and Jamie's authorship lead while keeping response data private and awaiting corroboration of individual design credit."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
        relationship: "direct-support",
        supports: [
          "the proposal reproduced the neighborhood survey handbill",
          "the survey was conducted with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church",
          "the proposal states that survey results directly shaped the proposal"
        ],
        locator: "Project Narrative, Neighborhood Process",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020",
        relationship: "corroborating",
        supports: [
          "KC Town Hall published a neighborhood survey page with a backing Google Form"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Jamie's individual authorship of the handbill and data system is a firsthand account pending corroboration.",
      "The sources do not establish a response count, demographic representativeness, or complete decision trail.",
      "Survey responses, names, phone numbers, email addresses, and contact records remain private.",
      "Credit Oak Park Neighborhood Association and New Horizon Missionary Baptist Church in any future public projection."
    ],
    antiClaims: [
      "The survey statistically represented the entire neighborhood.",
      "Jamie alone determined the neighborhood vision.",
      "Survey contact data is available for publication."
    ],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-SURVEY-AUTHORSHIP"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex document and archive review"]
  },
  {
    id: "CLM-TIRED-OF-TIRES-NEIGHBORHOOD-OPERATIONS",
    project: "kansas-city-neighborhood-operations",
    internalClaim:
      "KC Town Hall's public-site archive documents a monthly free Tired of Tires service co-presented with Oak Park Neighborhood Association for homes in Kansas City's historic east neighborhoods and reports $17,768 in avoided disposal fees by 2020. Jamie reports designing and coordinating the program, conducting monthly pickups and city drop-offs, and later extending service to Indian Mound.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "KC Town Hall and Oak Park Neighborhood Association published a monthly free tire-pickup service for homes in Kansas City's historic east neighborhoods; a 2020 page update reported $17,768 in avoided disposal fees. Jamie reports designing, coordinating, and operating the pickup workflow.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale:
          "Retain the operational accomplishment and reported public benefit while holding individual role, Indian Mound expansion, and metric use pending corroboration."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020",
        relationship: "direct-support",
        supports: [
          "KC Town Hall and the Oak Park Neighborhood Association presented a monthly free tire-pickup service for homes in Kansas City historic east neighborhoods",
          "the Tired of Tires page reported $17,768 in avoided tire-disposal fees by its 2020 update"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCMO-WASTE-TIRE-DROPOFF-PROGRAM",
        relationship: "context",
        supports: [
          "Kansas City operates a no-charge waste-tire drop-off mechanism for approved neighborhood groups",
          "the mechanism is for residents rather than businesses",
          "the Environmental Campus serves as the drop-off location"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Jamie's individual design, coordination, hauling, recordkeeping, and print-production role remains a firsthand account pending corroboration.",
      "Expansion to Indian Mound remains a firsthand account pending a dated program record or collaborator confirmation.",
      "The $17,768 figure is the project's published estimate and has not been independently audited.",
      "Do not infer an exact tire count from the savings estimate or from the current City program page.",
      "Treat the program as historical unless current operation is separately verified."
    ],
    antiClaims: [
      "Jamie alone created or operated Tired of Tires.",
      "The City independently verified $17,768 in savings.",
      "The source establishes a specific number of tires collected.",
      "Tired of Tires is a current City service."
    ],
    researchInquiryIds: ["INQ-TIRED-OF-TIRES-JAMIE-ROLE"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archive and public-source review"]
  }
] satisfies ClaimRecord[];

export const kcTownHallPhaseOneNeighborhoodInquiries = [
  {
    id: "INQ-KC-TOWN-HALL-PHASE-ONE-ROLE",
    project: "kc-town-hall",
    question:
      "What public-safe construction records or collaborator confirmation can independently attribute Phase One general-contractor and daily site-coordination responsibilities to Jamie?",
    methods: [
      "Closely reviewed the attached 2019 municipal application packet, including its project narrative, Phase One budget detail, and support letters.",
      "Separated documented phase scope and completion from Jamie's firsthand role account.",
      "Queued contracts, invoices, permits, schedules, correspondence, and contractor or collaborator confirmation for a later public-safety review."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The packet labels the $189,629 Phase One cold-shell work completed in 2019.",
      "The packet itemizes roof and TPO membrane work, masonry, floor framing, water connection, access, safety, transport, cleanup, and related work.",
      "The packet identifies Jamie as founder and project presenter but does not print the title general contractor."
    ],
    limitations: [
      "The reviewed source does not independently establish Jamie's general-contractor title or day-to-day coordination duties.",
      "No private contract, invoice, permit, or correspondence should be published without separate review and redaction.",
      "Phase One completion does not establish completion of the later redevelopment plan."
    ],
    sourceIds: ["SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"]
  },
  {
    id: "INQ-KC-TOWN-HALL-SURVEY-AUTHORSHIP",
    project: "kc-town-hall",
    question:
      "What public-safe design files, form metadata, meeting records, or collaborator confirmation can attribute the KC Town Hall survey handbill and data system to Jamie and describe how responses informed decisions?",
    methods: [
      "Reviewed the municipal packet's Neighborhood Process page and reproduced survey handbill.",
      "Reviewed a protected project-site archive for the published survey page and backing Google Form reference.",
      "Kept respondent identities and response contents outside the public repository."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The proposal reproduces the survey handbill and says survey results directly shaped the proposal.",
      "The proposal credits a process with Oak Park Neighborhood Association and New Horizon Missionary Baptist Church.",
      "The project-site archive preserves a survey page and backing Google Form reference."
    ],
    limitations: [
      "The sources do not independently attribute the handbill or form design to Jamie.",
      "The reviewed record does not establish response count, representativeness, or a complete decision trail.",
      "Raw responses and contact information remain private."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020"
    ]
  },
  {
    id: "INQ-TIRED-OF-TIRES-JAMIE-ROLE",
    project: "kansas-city-neighborhood-operations",
    question:
      "What dated program materials or collaborator confirmation can establish Jamie's individual Tired of Tires design, city-coordination, pickup, hauling, recordkeeping, and Indian Mound expansion roles?",
    methods: [
      "Reviewed the protected KC Town Hall public-site archive for the published Tired of Tires page.",
      "Reviewed the current official City waste-tire drop-off page to corroborate the municipal operating mechanism without back-projecting current details onto 2019.",
      "Searched available public web results for the exact program name and Indian Mound expansion."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "A KC Town Hall page documents a monthly free pickup service co-presented with Oak Park Neighborhood Association for homes in historic east neighborhoods.",
      "The 2020 page update reports $17,768 in avoided disposal fees.",
      "The official City page confirms a no-charge drop-off mechanism for approved neighborhood groups at the Environmental Campus."
    ],
    limitations: [
      "No reviewed source independently attributes Jamie's individual operating role.",
      "No reviewed public source establishes the Indian Mound expansion.",
      "The savings figure is project-published rather than independently audited.",
      "Current City procedures do not prove identical historical procedures."
    ],
    sourceIds: [
      "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020",
      "SRC-KCMO-WASTE-TIRE-DROPOFF-PROGRAM"
    ]
  },
  {
    id: "INQ-CLEVELAND-UNIFY-BEAUTIFY-JAMIE-ROLE",
    project: "kansas-city-neighborhood-operations",
    question:
      "Can public-safe records corroborate the Cleveland Avenue Unify to Beautify program, Pastor Lee's corridor concept, Jamie's co-founding and design role, listening sessions, elected-official participation, and any connection to capital-improvement decisions?",
    methods: [
      "Reviewed HENC's 2024 strategic plan for coalition history, member neighborhoods, and stated program methods.",
      "Searched available public web results for the exact program name, Cleveland Avenue corridor framing, and Jamie's role.",
      "Recorded Jamie's firsthand account without promoting it to an accomplishment claim."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "HENC's strategic plan documents a coalition of east-side neighborhoods including Oak Park.",
      "The plan includes cleanup, beautification, surveys, PIAC engagement, and capital-funding goals consistent with the general operating context Jamie described.",
      "No reviewed public source recovered the specific Unify to Beautify program or Jamie's role."
    ],
    limitations: [
      "General HENC context is not evidence of the specific program, role, participants, or funding outcome.",
      "Absence from the bounded public search is not evidence that the program did not exist.",
      "Future review should prioritize dated handbills, logos, maps, social posts, meeting notices, PIAC records, and collaborator confirmation."
    ],
    sourceIds: ["SRC-HENC-STRATEGIC-PLAN-2024"]
  }
] satisfies ResearchInquiry[];

export const kcTownHallPhaseOneNeighborhoodIntake = [
  {
    id: "INT-KC-TOWN-HALL-PHASE-ONE-MEMORY-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-safe-memory",
    visibility: "public-safe",
    title: "KC Town Hall Phase One general-contractor and site-coordination account",
    description:
      "Jamie reports serving as general contractor for Phase One, hiring and coordinating specialized construction and design teams and managing daily site sequencing from basement through roof deck.",
    whyItMatters:
      "Adds substantial implementation and field-delivery responsibility to a record previously dominated by planning, documentation, and municipal process.",
    projectIds: ["kc-town-hall"],
    status: "researching",
    disposition: "claim-created",
    dispositionNote:
      "Created a bounded claim supported for phase scope and completion, with Jamie's general-contractor title held pending independent attribution.",
    sourceIds: ["SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-PHASE-ONE-RESTORATION"],
    inquiryIds: ["INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"],
    boundaries: [
      "Do not convert the firsthand general-contractor title into a source-confirmed public claim.",
      "Do not conflate Phase One completion with completion of the later redevelopment plan.",
      "Do not publish private financial, contact, legal, or contractor records without separate review."
    ]
  },
  {
    id: "INT-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-safe-memory",
    visibility: "public-safe",
    title: "KC Town Hall neighborhood survey design and listening process",
    description:
      "Jamie reports creating a 4-by-6 survey handbill and backing data system to gather neighborhood vision and contacts while Phase One work brought residents into daily conversation at the site.",
    whyItMatters:
      "Connects construction delivery to a documented listening method in which neighborhood survey results directly shaped the proposal.",
    projectIds: ["kc-town-hall"],
    status: "researching",
    disposition: "claim-created",
    dispositionNote:
      "Created a bounded claim for the documented survey process and opened individual authorship and methodology research.",
    sourceIds: [
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020"
    ],
    claimIds: ["CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY"],
    inquiryIds: ["INQ-KC-TOWN-HALL-SURVEY-AUTHORSHIP"],
    boundaries: [
      "Keep respondent identities, answers, and contact data private.",
      "Do not claim statistical representativeness or a complete decision trail.",
      "Retain Oak Park Neighborhood Association and New Horizon Missionary Baptist Church credit."
    ]
  },
  {
    id: "INT-TIRED-OF-TIRES-MEMORY-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-safe-memory",
    visibility: "public-safe",
    title: "Tired of Tires neighborhood operations account",
    description:
      "Jamie reports designing and coordinating Oak Park Neighborhood Association's monthly free Tired of Tires pickup, conducting the recurring collection and City drop-off workflow, tracking results, and later extending service to Indian Mound.",
    whyItMatters:
      "Documents recurring, resident-facing operations that joined neighborhood service, municipal coordination, communications, and accountable field execution.",
    projectIds: ["kansas-city-neighborhood-operations"],
    status: "researching",
    disposition: "claim-created",
    dispositionNote:
      "Created a bounded project-level claim and opened research on Jamie's individual role, Indian Mound expansion, and the published savings metric.",
    sourceIds: [
      "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020",
      "SRC-KCMO-WASTE-TIRE-DROPOFF-PROGRAM"
    ],
    claimIds: ["CLM-TIRED-OF-TIRES-NEIGHBORHOOD-OPERATIONS"],
    inquiryIds: ["INQ-TIRED-OF-TIRES-JAMIE-ROLE"],
    boundaries: [
      "Treat Jamie's individual operating role and Indian Mound expansion as firsthand leads pending corroboration.",
      "Label $17,768 as the project's published estimate, not an independently audited City figure.",
      "Do not infer an exact tire count or current operation."
    ]
  },
  {
    id: "INT-CLEVELAND-UNIFY-BEAUTIFY-MEMORY-2026-07-15",
    receivedAt: "2026-07-15",
    kind: "public-safe-memory",
    visibility: "public-safe",
    title: "Cleveland Avenue Unify to Beautify program account",
    description:
      "Jamie reports co-founding a HENC program built from Pastor Lee's Cleveland Avenue corridor concept and contributing identity, photography, social media, listening-session maps, public-meeting materials, and pro bono print production.",
    whyItMatters:
      "Preserves a potentially strong example of place-based coalition design and participatory capital-planning infrastructure without prematurely claiming a policy outcome.",
    projectIds: ["kansas-city-neighborhood-operations"],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "Retained as a firsthand research lead; the reviewed HENC plan establishes coalition context but not this program, Jamie's role, or a funding outcome.",
    sourceIds: ["SRC-HENC-STRATEGIC-PLAN-2024"],
    claimIds: [],
    inquiryIds: ["INQ-CLEVELAND-UNIFY-BEAUTIFY-JAMIE-ROLE"],
    boundaries: [
      "Credit Pastor Lee's corridor concept and collective neighborhood leadership in any future claim.",
      "Do not infer causality for discretionary funding or capital improvements.",
      "Do not name residents, reproduce listening-session responses, or publish contact information without review.",
      "No website or resume projection is approved."
    ]
  }
] satisfies IntakeRecordInput[];
