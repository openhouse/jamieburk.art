import type { KnowledgeBank } from "./schema.ts";

export const icloudTeamsExpansionIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-ICLOUD-JAMIE-PROJECTS-HISTORY-EXPANSION",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "A differential pass through Jamie Projects History recovered two institutional program records placing Jamie in BAPLab 2006's New Media Program; the title and form of Jamie's presented work remain open.",
    projectIds: ["creative-technology-and-media"],
    researchStatus: "needs-more-research",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-BAPLAB-WAVE-FARM-PROGRAM-2006",
      "SRC-BAPLAB-OFFICIAL-PROGRAM-WAYBACK-2006"
    ],
    observationIds: [
      "OBS-BAPLAB-WAVE-FARM-JAMIE-LISTING",
      "OBS-BAPLAB-OFFICIAL-JAMIE-LISTING"
    ],
    claimIds: ["CLM-BAPLAB-NEW-MEDIA-PROGRAM-2006"],
    researchInquiryIds: ["INQ-BAPLAB-JAMIE-WORK-2006"],
    nextActions: [
      "Recover the archived artist-detail page for program record 108 or another first-party record naming Jamie's work.",
      "Seek installed-view photographs, programs, correspondence, or collaborator confirmation before naming the work Time Is Long.",
      "Keep the BAPLab participation record as portfolio depth until the presented work and Jamie's role are more fully recovered."
    ]
  },
  {
    id: "INTAKE-2026-07-15-ICLOUD-CRS-EXPANSION",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "Later Commercial Rent Stabilization records add a protected working coalition map and meeting evidence that Jamie used it to make relationships, continuity, and follow-up infrastructure discussable.",
    projectIds: ["commercial-rent-stabilization", "fair-rent-nyc"],
    researchStatus: "researched",
    publicationStatus: "projected",
    sourceIds: [
      "SRC-CRS-COALITION-MAP-2026-05-06",
      "SRC-CRS-RUNNING-MINUTES-2026"
    ],
    observationIds: [
      "OBS-CRS-COALITION-MAP-STRUCTURE",
      "OBS-CRS-MAY-06-MAP-USE"
    ],
    claimIds: ["CLM-CRS-COALITION-MAPPING-PRACTICE"],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    nextActions: [
      "Use the map as evidence of Jamie's operating practice, not coalition adoption, governance authority, or campaign outcome.",
      "Keep the working image, private discussion, relationship context, and unapproved participant detail outside the public repository.",
      "Continue seeking collaborator-approved evidence of which mapped structures and follow-up practices were adopted or sustained."
    ]
  },
  {
    id: "INTAKE-2026-07-15-ICLOUD-JOB-HUNT-EXPANSION",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary: "A current job-hunt context outline preserves Jamie's role-positioning logic and explicitly flags the Harry J. Epstein revenue-growth metric for further verification.",
    projectIds: ["job-search-positioning", "harry-j-epstein"],
    researchStatus: "needs-more-research",
    publicationStatus: "knowledge-bank-only",
    sourceIds: ["SRC-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    observationIds: [
      "OBS-JOB-HUNT-ROLE-FRAME",
      "OBS-JOB-HUNT-HJE-METRIC-CAUTION"
    ],
    claimIds: [],
    researchInquiryIds: [
      "INQ-JOB-SEARCH-POSITIONING-2026",
      "INQ-HJE-REVENUE-GROWTH-VERIFICATION-2026"
    ],
    nextActions: [
      "Use the role frame as composition guidance rather than independent proof of accomplishment.",
      "Seek an approved owner or collaborator account and a bounded aggregate record for the revenue-growth period.",
      "Retain contribution language and the existing causal guardrail unless stronger evidence supports a more precise statement."
    ]
  }
];

export const icloudTeamsExpansionSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-BAPLAB-WAVE-FARM-PROGRAM-2006",
    title: "free103point9 at Bushwick Art Project's BAPLab 2006",
    organization: "Wave Farm",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2006-07-22",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://wavefarm.org/wf/calendar/bnavcx",
    preferredPublicUrl: "canonical",
    publicCitation: "Wave Farm, 'free103point9 at Bushwick Art Project's BAPLab 2006,' July 22-23, 2006.",
    publicNote: "Institutional event record and schedule listing Jamie among the 4 p.m. program participants.",
    supportsGenerally: [
      "BAPLab 2006 took place July 22-23 at 3rd Ward in Brooklyn",
      "Jamie Burkart appears in the event schedule at 4 p.m."
    ],
    doesNotEstablish: [
      "the title, medium, or form of Jamie's work",
      "Jamie's curatorial or production role",
      "attendance, reception, or longer-term outcome",
      "that the work was titled Time Is Long"
    ]
  },
  {
    id: "SRC-BAPLAB-OFFICIAL-PROGRAM-WAYBACK-2006",
    title: "BAPLab 2006 New Media Program",
    organization: "Bushwick Art Project",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: "2026-07-15",
    archiveUrl: "https://web.archive.org/web/20130905013518/http://bushwickartproject.org/index.php?option=com_wrapper&Itemid=49",
    preferredPublicUrl: "archive",
    publicCitation: "Bushwick Art Project, 'BAPLab 2006 New Media Program,' archived by the Wayback Machine.",
    publicNote: "Archived first-party schedule listing Jamie Burkart in the New Media Program at 4 p.m.",
    supportsGenerally: [
      "Jamie Burkart was listed in BAPLab 2006's New Media Program",
      "the listing linked to artist record 108"
    ],
    doesNotEstablish: [
      "the content of artist record 108",
      "the title or medium of Jamie's work",
      "whether Jamie organized or curated the program",
      "audience or impact claims"
    ]
  },
  {
    id: "SRC-CRS-COALITION-MAP-2026-05-06",
    title: "Working intra-organizational collaboration map",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-05-06",
    publicCitation: "Jamie Burkart, working Commercial Rent Stabilization coalition map, May 6, 2026 (protected project record).",
    publicNote: "A working visual map used to make organizational relationships, cross-cutting issues, and possible stewardship structures discussable during a collaboration meeting.",
    supportsGenerally: [
      "Jamie created a working visual coalition map",
      "the map represented relationships among campaign, organizing, cultural-space, small-business, and government contexts",
      "the map treated fragmentation and stewardship structure as operating questions"
    ],
    doesNotEstablish: [
      "coalition adoption of the map",
      "formal governance authority",
      "endorsement by every person or organization represented",
      "policy influence or campaign outcome"
    ],
    protectedLocatorId: "LOC-ICLOUD-CRS-COALITION-MAP-2026-05-06"
  },
  {
    id: "SRC-JOB-HUNT-CONTEXT-OUTLINE-2026",
    title: "Job-Hunt Context Outline",
    author: "Jamie Burkart with AI-assisted archival synthesis",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-07-03",
    publicCitation: "Jamie Burkart, 'Job-Hunt Context Outline,' July 3, 2026 (protected working synthesis).",
    publicNote: "Internal composition map for role positioning, evidence routing, privacy boundaries, and unresolved claim verification.",
    supportsGenerally: [
      "a current role-positioning preference centered on technical project management, product operations, implementation, civic technology, and knowledge systems",
      "an internal warning that the 2x Harry J. Epstein revenue-growth metric lacked independently recovered support in the folders reviewed for that synthesis"
    ],
    doesNotEstablish: [
      "independent proof of any accomplishment",
      "labor-market fit or hiring outcome",
      "that supporting evidence for the revenue metric does not exist",
      "that every referenced archive was exhaustively reviewed"
    ],
    protectedLocatorId: "LOC-ICLOUD-JOB-HUNT-CONTEXT-OUTLINE-2026"
  }
];

export const icloudTeamsExpansionObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-BAPLAB-WAVE-FARM-JAMIE-LISTING",
    sourceId: "SRC-BAPLAB-WAVE-FARM-PROGRAM-2006",
    project: "creative-technology-and-media",
    text: "Wave Farm's institutional event record dates BAPLab 2006 to July 22-23 at 3rd Ward and lists Jamie Burkart in the 4 p.m. schedule.",
    locator: "Event heading, location, and schedule",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-BAPLAB-NEW-MEDIA-PROGRAM-2006"],
    researchInquiryIds: ["INQ-BAPLAB-JAMIE-WORK-2006"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival review"]
  },
  {
    id: "OBS-BAPLAB-OFFICIAL-JAMIE-LISTING",
    sourceId: "SRC-BAPLAB-OFFICIAL-PROGRAM-WAYBACK-2006",
    project: "creative-technology-and-media",
    text: "The archived Bushwick Art Project schedule places Jamie Burkart in BAPLab 2006's New Media Program at 4 p.m. and links his name to artist record 108.",
    locator: "New Media Program table",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-BAPLAB-NEW-MEDIA-PROGRAM-2006"],
    researchInquiryIds: ["INQ-BAPLAB-JAMIE-WORK-2006"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival review"]
  },
  {
    id: "OBS-CRS-COALITION-MAP-STRUCTURE",
    sourceId: "SRC-CRS-COALITION-MAP-2026-05-06",
    project: "commercial-rent-stabilization",
    text: "Jamie's working map visualizes relationships among organizing containers, campaign lineage, cross-cutting affordability constituencies, government contexts, fragmentation risk, and a possible steering structure.",
    locator: "Full protected map",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-COALITION-MAPPING-PRACTICE"],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex visual review"]
  },
  {
    id: "OBS-CRS-MAY-06-MAP-USE",
    sourceId: "SRC-CRS-RUNNING-MINUTES-2026",
    project: "commercial-rent-stabilization",
    text: "The May 6 meeting record says Jamie screen-shared a working movement and coalition map and connected event signups, QR codes, lists, and follow-up systems to durable organizing power.",
    locator: "May 6 meeting summary and key notes",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CRS-COALITION-MAPPING-PRACTICE"],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-JOB-HUNT-ROLE-FRAME",
    sourceId: "SRC-JOB-HUNT-CONTEXT-OUTLINE-2026",
    project: "job-search-positioning",
    text: "The working synthesis frames Jamie most coherently for technical project management, product operations, implementation, civic technology, and knowledge or documentation systems roles rather than software engineering or organizing alone.",
    locator: "Best Current Role Frame and Core Narrative",
    status: "verified",
    confidence: "high",
    claimIds: [],
    researchInquiryIds: ["INQ-JOB-SEARCH-POSITIONING-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival review"]
  },
  {
    id: "OBS-JOB-HUNT-HJE-METRIC-CAUTION",
    sourceId: "SRC-JOB-HUNT-CONTEXT-OUTLINE-2026",
    project: "harry-j-epstein",
    text: "The working synthesis notes that the 2x revenue-growth metric appears in resume drafts but that its review did not recover independent supporting evidence in the listed folders.",
    locator: "Web and Product Implementation claim caution",
    status: "verified",
    confidence: "high",
    claimIds: [],
    researchInquiryIds: ["INQ-HJE-REVENUE-GROWTH-VERIFICATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival review"]
  }
];

export const icloudTeamsExpansionClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-BAPLAB-NEW-MEDIA-PROGRAM-2006",
    project: "creative-technology-and-media",
    internalClaim: "Two institutional program records place Jamie Burkart in BAPLab 2006's New Media Program at 4 p.m.; the title, medium, and content of Jamie's presented work remain unrecovered.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie was listed in BAPLab 2006's New Media Program at 3rd Ward in Brooklyn.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/creative-technology-and-media"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-BAPLAB-OFFICIAL-PROGRAM-WAYBACK-2006",
        relationship: "direct-support",
        supports: ["Jamie name", "New Media Program", "4 p.m. listing"],
        locator: "New Media Program table",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-BAPLAB-WAVE-FARM-PROGRAM-2006",
        relationship: "corroborating",
        supports: ["Jamie name", "event dates", "3rd Ward location", "4 p.m. schedule"],
        locator: "Event heading, location, and schedule",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Do not identify the presented work as Time Is Long until a source connects that title to Jamie's listing.",
      "Do not infer medium, authorship division, curatorial responsibility, attendance, or reception from the schedule.",
      "Preserve BAPLab's collective festival context."
    ],
    antiClaims: [
      "Jamie curated BAPLab 2006.",
      "Jamie organized the festival.",
      "Jamie presented Time Is Long at BAPLab 2006.",
      "The program records prove audience impact."
    ],
    researchInquiryIds: ["INQ-BAPLAB-JAMIE-WORK-2006"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex archival review"]
  },
  {
    id: "CLM-CRS-COALITION-MAPPING-PRACTICE",
    project: "commercial-rent-stabilization",
    internalClaim: "Jamie created and screen-shared a working coalition map to make organizational relationships, campaign lineage, cross-cutting constituencies, fragmentation risk, and follow-up infrastructure discussable during a Commercial Rent Stabilization collaboration meeting.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "technical-operations",
        text: "Created and used a live coalition map to clarify relationships, continuity, and follow-up pathways in a multi-stakeholder campaign.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      },
      {
        key: "archive-note",
        text: "A protected working map and meeting record establish Jamie's coalition-mapping practice; they do not establish formal adoption or governance authority.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/commercial-rent-stabilization-operating-memory"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CRS-COALITION-MAP-2026-05-06",
        relationship: "direct-support",
        supports: ["Jamie authorship", "visual relationship mapping", "fragmentation and stewardship questions"],
        locator: "Full protected map",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-CRS-RUNNING-MINUTES-2026",
        relationship: "corroborating",
        supports: ["meeting use", "screen-sharing", "connection to signup, list, and follow-up systems"],
        locator: "May 6 meeting summary and key notes",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The map is a working artifact, not an adopted governance chart or statement of organizational authority.",
      "Representation on the map does not imply endorsement by every person or organization shown.",
      "Do not publish the protected image or private meeting context without approval.",
      "Do not infer policy influence, campaign outcome, or sustained adoption."
    ],
    antiClaims: [
      "Jamie designed the coalition's formal governance structure.",
      "Every represented organization adopted the map.",
      "The map caused a policy outcome."
    ],
    researchInquiryIds: ["INQ-CRS-OPERATING-PLAN-IMPLEMENTATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document and visual review"]
  }
];

export const icloudTeamsExpansionResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-JOB-SEARCH-POSITIONING-2026",
    project: "job-search-positioning",
    question: "Which role frame most clearly connects Jamie's strongest governed evidence to current hiring needs without flattening his technical, civic, cultural, and operational range?",
    methods: [
      "Compare the current resume, portfolio proof map, project dossiers, advisor feedback, and target-role materials.",
      "Prefer frames supported by multiple completed projects and concrete artifacts rather than aspiration alone.",
      "Keep role positioning revisable as target applications and available evidence change."
    ],
    runAt: "2026-07-15",
    resultStatus: "recovered",
    findings: [
      "The current archive converges on technical project management, product operations, implementation, civic technology, and knowledge or documentation systems.",
      "The strongest throughline is translation between technical systems, stakeholders, source material, public information, and practical delivery.",
      "Software engineering alone and organizing alone each omit important parts of the governed evidence."
    ],
    limitations: [
      "Role positioning is a strategic composition judgment, not independent proof of accomplishment.",
      "The best emphasis may change by application, employer, and labor-market conditions.",
      "Every projected accomplishment still requires its own source record and claim boundary."
    ],
    sourceIds: ["SRC-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    publicSummary: "The current composition frame centers technical project management, product operations, implementation, civic technology, and knowledge systems while keeping each accomplishment independently sourced."
  },
  {
    id: "INQ-BAPLAB-JAMIE-WORK-2006",
    project: "creative-technology-and-media",
    question: "What work did Jamie present in BAPLab 2006's New Media Program, and what were its title, medium, collaborators, and documented reception?",
    methods: [
      "Recover Bushwick Art Project artist record 108 and adjacent program assets through the Wayback Machine.",
      "Search Jamie's project archive, public photo accounts, video documentation, and contemporaneous correspondence for title and installed-view evidence.",
      "Seek collaborator or organizer confirmation while preserving collective credit."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Two institutional schedules place Jamie in the New Media Program at 4 p.m.",
      "The archived first-party schedule links Jamie to artist record 108.",
      "No reviewed source connects Jamie's listing to the title Time Is Long or identifies the work's medium."
    ],
    limitations: [
      "The archived artist-detail content was not recovered in this pass.",
      "A folder name is an archival lead, not proof of the exhibited title.",
      "Program listing does not establish authorship division, attendance, reception, or outcome."
    ],
    sourceIds: [
      "SRC-BAPLAB-WAVE-FARM-PROGRAM-2006",
      "SRC-BAPLAB-OFFICIAL-PROGRAM-WAYBACK-2006"
    ],
    publicSummary: "Jamie is confirmed in BAPLab 2006's New Media Program; the presented work's title, medium, and fuller credit remain open."
  },
  {
    id: "INQ-HJE-REVENUE-GROWTH-VERIFICATION-2026",
    project: "harry-j-epstein",
    question: "What approved aggregate evidence supports the claim that Jamie contributed during a period of 2x revenue growth at Harry J. Epstein Co., and what dates and metric definition bound that period?",
    methods: [
      "Seek an approved owner or collaborator account that states the period, metric, and Jamie's contribution without exposing private revenue detail.",
      "Review bounded aggregate records that can establish start and end values or a defensible index without publishing dashboards, customer data, or sensitive financials.",
      "Keep business growth, Jamie's contribution, and causality as separate propositions."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The metric appears in approved resume language and public-safe firsthand operational context.",
      "The July 2026 job-hunt synthesis did not recover independent supporting evidence in the folders reviewed during that pass.",
      "Current portfolio wording uses contribution language and explicitly disallows sole-causality claims."
    ],
    limitations: [
      "The job-hunt synthesis was selective and does not establish that supporting records do not exist.",
      "Private financial details and dashboards must remain outside the public repository.",
      "Independent proof may be unavailable even when a bounded collaborator-confirmed claim is accurate."
    ],
    sourceIds: ["SRC-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    publicSummary: "Retain careful contribution language while the metric's period, definition, and approved aggregate support are further verified.",
    protectedLocatorId: "RESEARCH-ICLOUD-HJE-REVENUE-VERIFICATION-2026"
  }
];
