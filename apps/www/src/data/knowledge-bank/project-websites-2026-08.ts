import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-14";
const reviewedBy = ["Jamie Burkart", "Codex public-surface audit"];
const intakeId = "INTAKE-PROJECT-WEBSITE-LIVE-AUDIT-2026-08-14";
const auditSourceId = "SRC-PROJECT-WEBSITE-LIVE-AUDIT-2026-08-14";
const claimId = "CLM-PROJECT-WEBSITE-LIVE-INVENTORY-2026-08-14";
const inquiryId = "INQ-PROJECT-WEBSITE-LIVE-INVENTORY-REFRESH";

const restoredSources = {
  kcTownHall: "SRC-KCTH-LIVE-SURFACE-2026-08-14",
  wowList: "SRC-WOWLIST-LIVE-SURFACE-2026-08-14",
  callNyc: "SRC-CALLNYC-LIVE-SURFACE-2026-08-14"
} as const;

const observationIds = {
  count: "OBS-PROJECT-WEBSITE-LIVE-COUNT-2026-08-14",
  credit: "OBS-PROJECT-WEBSITE-IMPLEMENTATION-CREDIT-2026-08-14",
  kcTownHall: "OBS-KCTH-RESTORED-PUBLIC-SURFACE-2026-08-14",
  wowList: "OBS-WOWLIST-RESTORED-PUBLIC-SURFACE-2026-08-14",
  callNyc: "OBS-CALLNYC-RESTORED-PUBLIC-SURFACE-2026-08-14"
} as const;

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: intakeId,
    kind: "analysis-note",
    title: "Live project-website inventory and restored-surface close reading",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex public-surface audit",
    projectIds: [
      "cross-project-system",
      "harry-j-epstein",
      "nyc-artist-coalition",
      "fair-rent-nyc",
      "talks-not-raids",
      "let-nyc-dance",
      "callnyc",
      "wowlist",
      "kc-spaces-fund",
      "kc-town-hall",
      "save-nyc-spaces"
    ],
    reason: "Keep a dated, reproducible count of reachable project sites while separating reachability, currentness, Jamie's implementation evidence, collective credit, and editorial suitability for direct links.",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [auditSourceId, ...Object.values(restoredSources)],
    observationIds: Object.values(observationIds),
    researchInquiryIds: [inquiryId],
    boundaries: [
      "A successful HTTP response establishes reachability at the audit time, not current service availability, completeness, maintenance quality, or authorship.",
      "Direct implementation evidence and collective project credit are separate states.",
      "The personal portfolio is counted separately from client, civic, cultural, and community project sites."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: observationIds.count,
    intakeId,
    sourceId: auditSourceId,
    comparisonSourceIds: [],
    project: "cross-project-system",
    kind: "source-fact",
    text: "At the August 14, 2026 audit, ten distinct tracked project websites returned HTTP 200; jamieburk.art was an eleventh live associated web property counted separately as the portfolio.",
    locator: "Machine-readable project-site inventory and dated HTTP audit",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["Reachability may change after the audit and does not establish a current service or healthy dependency chain."]
  },
  {
    id: observationIds.credit,
    intakeId,
    sourceId: auditSourceId,
    comparisonSourceIds: [
      "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-WOWLIST-PUBLIC-THRESHOLD-2026",
      "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026",
      "SRC-KCTH-GHOST-ARCHIVE-2020",
      "SRC-NYCAC-SAVE-NYC-SPACES"
    ],
    project: "cross-project-system",
    kind: "bounded-inference",
    text: "Eight reachable project sites have direct source-backed evidence of Jamie's implementation, co-build, or bounded web-infrastructure work; KC Town Hall remains shared project context and Save NYC Spaces remains open for individual site-implementation attribution.",
    locator: "Inventory relationship states compared with canonical repository, archive, and project-source records",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["Direct implementation does not imply sole project authorship, control over every page, or causal credit for project outcomes."]
  },
  {
    id: observationIds.kcTownHall,
    intakeId,
    sourceId: restoredSources.kcTownHall,
    comparisonSourceIds: ["SRC-KCTH-GHOST-ARCHIVE-2020"],
    project: "kc-town-hall",
    kind: "source-fact",
    text: "The restored KC Town Hall site presents the building, neighborhood participation, Tired of Tires, survey work, and smaller resident-service or reporting pathways as one public point of contact.",
    locator: "Homepage plus ten sampled internal routes",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["The Tired of Tires page displays historical 2022 dates; the restored site is not evidence that pickups currently operate.", "The reviewed archive does not assign Jamie individual authorship of every page."]
  },
  {
    id: observationIds.wowList,
    intakeId,
    sourceId: restoredSources.wowList,
    comparisonSourceIds: ["SRC-WOWLIST-PUBLIC-THRESHOLD-2026"],
    project: "wowlist",
    kind: "source-fact",
    text: "WOW List's restored landing and About pages join a concise real-life discovery proposition, shared Sunday Dinner provenance, Jamie and Richard Caceres co-builder credit, and a purpose-limited tester invitation.",
    locator: "Homepage and About page",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["The surface remains noindex and is not the restored community calendar.", "One image lacked alternative text and the compact surface has no explicit navigation or footer landmarks."]
  },
  {
    id: observationIds.callNyc,
    intakeId,
    sourceId: restoredSources.callNyc,
    comparisonSourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY"],
    project: "callnyc",
    kind: "source-fact",
    text: "The restored CallNYC snapshot preserves an issue-first resident pathway from constituent-services categories to district-office context and possible next steps, under a visible archived, unofficial, and non-current boundary.",
    locator: "Homepage plus twelve sampled internal routes",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: ["Historical officeholders, statistics, categories, and contact information are not current guidance.", "The audit found missing image alternatives, mixed-content font requests, and decayed portrait or map dependencies."]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: auditSourceId,
    title: "Live project-website HTTP and rendered-page audit",
    organization: "Jamie Burkart knowledge wiki",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Rendered Chromium and HTTP audit completed 2026-08-14T21:57:44.805Z",
    accessedAt: reviewedAt,
    publicCitation: "Dated project-website reachability and restored-surface audit, August 14, 2026.",
    publicNote: "The audit records a reproducible snapshot; currentness, authorship, accessibility, and editorial use were evaluated separately from HTTP status.",
    supportsGenerally: ["ten reachable project sites at the audit time", "three restored-surface close readings", "separate project-site, attribution, and portfolio counts"],
    doesNotEstablish: ["future availability", "current operation of historical services", "sole project authorship", "complete dependency health", "measured community impact"]
  },
  {
    id: restoredSources.kcTownHall,
    title: "KC Town Hall restored public site",
    organization: "KC Town Hall",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://kctownhall.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall restored public site, accessed August 14, 2026.",
    publicNote: "The live surface is read as a historical project and resident-service interface; old dates are not a current schedule.",
    supportsGenerally: ["restored project surface", "building and neighborhood frame", "Tired of Tires page", "survey and resident-contact pathways"],
    doesNotEstablish: ["current pickup service", "individual page authorship", "representative neighborhood consensus", "completed redevelopment"]
  },
  {
    id: restoredSources.wowList,
    title: "WOW List restored public threshold",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://wowlist.org/",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List public landing and About pages, accessed August 14, 2026.",
    publicNote: "The public return remains noindex and deliberately smaller than the historical calendar platform.",
    supportsGenerally: ["live landing and About pages", "tester-interest invitation", "shared provenance and co-builder credit", "noindex threshold"],
    doesNotEstablish: ["restored calendar availability", "current city-scene activity", "sole authorship", "public search launch"]
  },
  {
    id: restoredSources.callNyc,
    title: "CallNYC restored archived prototype",
    organization: "CallNYC",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://callnyc.org/",
    preferredPublicUrl: "canonical",
    publicCitation: "CallNYC archived public prototype, accessed August 14, 2026.",
    publicNote: "The site visibly identifies itself as an archived, unofficial, and non-current snapshot.",
    supportsGenerally: ["surviving issue-first information architecture", "resident-facing open-data translation", "archived boundary", "twelve sampled internal routes"],
    doesNotEstablish: ["official City status", "current officeholders or guidance", "complete dependency health", "present-day accessibility compliance"]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "cross-project-system",
    internalClaim: "As of the August 14, 2026 audit, ten distinct tracked project websites were reachable; eight carry direct source-backed Jamie implementation, co-build, or bounded web-infrastructure evidence, while two retain shared or open implementation attribution and the personal portfolio is counted separately.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "A dated audit found ten reachable project websites in the tracked knowledge-wiki ecosystem; eight have direct source-backed Jamie implementation, co-build, or bounded web-infrastructure evidence, while two retain attribution boundaries. The portfolio is counted separately.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/sources/project-website-live-audit-2026-08-14.md"]
      }
    ],
    evidence: [
      {
        sourceId: auditSourceId,
        relationship: "direct-support",
        supports: ["reachability count", "project-versus-portfolio count", "attribution-state count", "dated audit method"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The count is a dated snapshot and must be refreshed after restoration, retirement, migration, or material domain change.",
      "Reachability, currentness, implementation credit, collective project credit, and measured impact remain separate.",
      "Historical and archived sites must not be presented as current resident services."
    ],
    antiClaims: [
      "Jamie solely authored all ten reachable project sites",
      "all ten sites are current services",
      "a 200 response proves accessibility or dependency health",
      "the project sites prove their own community impact"
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt,
    reviewedBy
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: inquiryId,
    project: "cross-project-system",
    question: "Which tracked project websites remain reachable, what state is each surface in, and what evidence supports Jamie's specific implementation relationship?",
    methods: [
      "Run dated HTTP checks for every tracked current or historical project URL.",
      "Render and close-read restored or materially changed surfaces and sample their internal routes.",
      "Compare each public URL with canonical repository, archive, project-role, and collective-credit records.",
      "Count the personal portfolio separately and retain failed domains as archive-only rather than silently dropping them."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Ten project sites returned HTTP 200 at the audit time.",
      "Eight have direct source-backed Jamie implementation, co-build, or bounded web-infrastructure evidence.",
      "KC Town Hall remains shared project context without page-level authorship; Save NYC Spaces individual site implementation remains open.",
      "jamieburk.art is a separate eleventh live associated property; NTER CHNG remains archive-only after DNS failure."
    ],
    limitations: [
      "Availability can change after the audit.",
      "A homepage and sampled internal-link crawl are not a complete accessibility, content, security, or dependency audit.",
      "Public visibility and project participation do not independently settle individual implementation authorship."
    ],
    sourceIds: [auditSourceId, ...Object.values(restoredSources)],
    publicSummary: "A dated audit separates ten reachable project sites from one live personal portfolio, records eight direct implementation relationships, and preserves two attribution boundaries."
  }
];

export const projectWebsiteKnowledgeAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
