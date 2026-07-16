import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const teamsArchiveDeepeningEntities = [
  {
    id: "ENT-NTER-CHNG",
    kind: "project",
    label: "NTER CHNG",
    publicSafeSummary:
      "A 2010 participatory software and architectural installation that turned visitor text messages into a shared gallery dialogue.",
    aliases: ["NTR CHNG", "NTER CHNG"],
    projectKey: "nter-chng",
    relatedEntityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    status: "historical"
  }
] satisfies EntityRecord[];

export const teamsArchiveDeepeningIntake = [
  {
    id: "INTAKE-TEAMS-ICLOUD-WEB-INVENTORY-2026",
    receivedAt: "2026-07-14",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Authenticated iCloud Drive inventory of Teams, Jamie Projects History, CRS, and job-hunt, reconciled against locally hydrated folder metadata without publishing private filenames or paths.",
    submittedBy: "Codex authenticated iCloud archival review",
    entityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "research-open",
    sourceIds: ["SRC-TEAMS-ICLOUD-WEB-INVENTORY-2026"],
    claimIds: [],
    researchTaskIds: ["TASK-TEAMS-ICLOUD-VERSION-RECONCILIATION-2026"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025",
    receivedAt: "2026-07-14",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Private December 2025 collaboration packet documenting Jamie's source packaging, sandbox draft, request for expert help, and revision handoff for an NYC Artist Coalition Wikipedia article.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025"],
    claimIds: ["CLM-NYCAC-WIKIPEDIA-SOURCE-HANDOFF-2025"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Public Wikipedia revision history preserving Jamie's December 20 sandbox draft and a collaborator's December 27 move into the article namespace.",
    submittedBy: "Codex public-source review",
    sourceUrl: "https://en.wikipedia.org/w/index.php?title=NYC_Artist_Coalition&action=history",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE"],
    disposition: "source-created",
    sourceIds: ["SRC-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025"],
    claimIds: ["CLM-NYCAC-WIKIPEDIA-SOURCE-HANDOFF-2025"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-PITCH-NTER-CHNG-2010",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "The Pitch listing for NTER CHNG, describing a software and architectural installation for real-time visitor text dialogue.",
    submittedBy: "Codex public-source review",
    sourceUrl: "https://www.thepitchkc.com/ntr-chng/",
    entityIds: ["ENT-NTER-CHNG"],
    disposition: "source-created",
    sourceIds: ["SRC-PITCH-NTER-CHNG-2010"],
    claimIds: ["CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION-2010"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-VIMEO-NTER-CHNG-2011",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Public NTER CHNG project-video metadata crediting the three installation makers and the collaborators responsible for wall construction and performance.",
    submittedBy: "Codex public-source review",
    sourceUrl: "https://vimeo.com/21395655",
    entityIds: ["ENT-NTER-CHNG"],
    disposition: "source-created",
    sourceIds: ["SRC-VIMEO-NTER-CHNG-2011"],
    claimIds: ["CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION-2010"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-TEAMS-CRS-POWER-MAP-2026",
    receivedAt: "2026-07-14",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Private February 2026 Commercial Rent Stabilization power-map and messaging-grid artifact prepared by Jamie for internal operational use.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-TEAMS-CRS-POWER-MAP-2026"],
    claimIds: ["CLM-CRS-POWER-MAP-MESSAGING-GRID-2026"],
    researchTaskIds: [],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026",
    receivedAt: "2026-07-14",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Private July 2026 job-hunt evidence-routing outline that maps role positioning, source locations, publication boundaries, and unresolved verification needs.",
    submittedBy: "Codex private-archive review",
    entityIds: ["ENT-SOURCE-BACKED-KNOWLEDGE-PRACTICE", "ENT-HARRY-J-EPSTEIN"],
    disposition: "research-open",
    sourceIds: ["SRC-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    claimIds: [],
    researchTaskIds: ["TASK-HJE-REVENUE-INDEPENDENT-CORROBORATION"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-KCUR-HJE-ONLINE-SALES-2016",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Independent 2016 reporting on Harry J. Epstein Company's internet-enabled inventory, online-sales share, global customer reach, and family ownership.",
    submittedBy: "Codex public-source review",
    sourceUrl:
      "https://www.kcur.org/show/central-standard/2016-04-21/how-flying-dolphins-kept-this-old-school-kansas-city-hardware-store-alive",
    entityIds: ["ENT-HARRY-J-EPSTEIN"],
    disposition: "source-created",
    sourceIds: ["SRC-KCUR-HJE-ONLINE-SALES-2016"],
    claimIds: ["CLM-HJE-ONLINE-SALES-SHARE-2016"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const teamsArchiveDeepeningSources = [
  {
    id: "SRC-TEAMS-ICLOUD-WEB-INVENTORY-2026",
    title: "Authenticated iCloud Teams inventory and hydration reconciliation",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation:
      "Authenticated iCloud Drive inventory and local-hydration reconciliation for Jamie Burkart's private Teams archive, July 2026.",
    publicNote:
      "The source preserves aggregate folder counts and version-skew observations without exposing account information, private filenames, local paths, or source contents.",
    intakeIds: ["INTAKE-TEAMS-ICLOUD-WEB-INVENTORY-2026"],
    supportsGenerally: [
      "authenticated folder-level inventory",
      "target-folder presence and aggregate counts",
      "cloud and local version-skew detection"
    ],
    doesNotEstablish: [
      "the contents of files that were not close-read",
      "archive completeness beyond the observed iCloud surface",
      "that the newest cloud object was locally hydrated",
      "the truth of claims contained in private working files"
    ],
    protectedLocatorId: "RESEARCH-TEAMS-ICLOUD-WEB-2026-001"
  },
  {
    id: "SRC-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025",
    title: "NYC Artist Coalition Wikipedia collaboration packet",
    author: "Jamie Burkart and Dorothy Howard",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2025-12-27",
    publicCitation:
      "Private December 2025 collaboration packet for the NYC Artist Coalition Wikipedia draft and publication handoff.",
    publicNote:
      "The packet includes draft history, source packaging, correspondence, a recorded working session, and the collaborator-edited article; raw correspondence and recordings remain private.",
    intakeIds: ["INTAKE-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025"],
    supportsGenerally: [
      "Jamie's source collection and sandbox drafting",
      "Jamie's request for experienced editorial help",
      "a documented collaborator handoff and revision process"
    ],
    doesNotEstablish: [
      "that Wikipedia independently verified every underlying coalition claim",
      "that Jamie independently published the article",
      "that either collaborator authored every sentence",
      "that image rights or fair-use questions are conclusively resolved"
    ],
    protectedLocatorId: "ARCHIVE-TEAMS-NYCAC-WIKIPEDIA-2025-001"
  },
  {
    id: "SRC-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025",
    title: "NYC Artist Coalition revision history",
    organization: "Wikipedia",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://en.wikipedia.org/w/index.php?title=NYC_Artist_Coalition&action=history",
    preferredPublicUrl: "canonical",
    publicCitation: "Wikipedia, 'NYC Artist Coalition: Revision history.'",
    publicNote:
      "The history preserves Jamie's sandbox draft creation and later collaborator edits and mainspace move; it is provenance for the article workflow, not proof of every claim within the article.",
    intakeIds: ["INTAKE-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025"],
    supportsGenerally: [
      "Jamie's December 20, 2025 sandbox draft creation",
      "collaborator editing",
      "the December 27, 2025 move into the article namespace",
      "continued public article availability"
    ],
    doesNotEstablish: [
      "the factual accuracy of every article statement",
      "Jamie's independent publication of the article",
      "permission to reuse every article image",
      "the private identity behind every Wikipedia username"
    ]
  },
  {
    id: "SRC-PITCH-NTER-CHNG-2010",
    title: "NTR CHNG",
    organization: "The Pitch",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2010-01-07",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.thepitchkc.com/ntr-chng/",
    preferredPublicUrl: "canonical",
    publicCitation: "The Pitch, 'NTR CHNG,' January 7, 2010.",
    publicNote:
      "The listing describes the installation's public behavior and scheduled opening but does not name its makers.",
    intakeIds: ["INTAKE-PITCH-NTER-CHNG-2010"],
    supportsGenerally: [
      "software and architectural installation",
      "real-time visitor texting through a gallery wall",
      "participant messages forming a shared virtual dialogue",
      "January 2010 public presentation"
    ],
    doesNotEstablish: [
      "Jamie's individual role",
      "the division of technical work",
      "audience size or measured engagement",
      "long-term project impact"
    ]
  },
  {
    id: "SRC-VIMEO-NTER-CHNG-2011",
    title: "NTER CHNG project video and credits",
    author: "Garrett Fuselier",
    organization: "Vimeo",
    kind: "personal-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-03-23",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://vimeo.com/21395655",
    preferredPublicUrl: "canonical",
    publicCitation: "Garrett Fuselier, 'NTER CHNG,' Vimeo, March 23, 2011.",
    publicNote:
      "Official Vimeo metadata names Drew Bolton, Jamie Burkart, and Garrett Fuselier as the installation makers and preserves additional construction and performer credit.",
    intakeIds: ["INTAKE-VIMEO-NTER-CHNG-2011"],
    supportsGenerally: [
      "Jamie as one of three installation makers",
      "Drew Bolton and Garrett Fuselier as co-makers",
      "Mary Nichols's wall engineering and construction support",
      "Megan Mantia and Elisha Stetson as actors"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship",
      "a precise division of software, design, and fabrication labor",
      "audience size or measured engagement",
      "the installation's long-term impact"
    ]
  },
  {
    id: "SRC-TEAMS-CRS-POWER-MAP-2026",
    title: "Commercial Rent Stabilization power map and functional messaging grid",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-02-06",
    publicCitation:
      "Jamie Burkart, private Commercial Rent Stabilization power map and functional messaging grid, February 2026.",
    publicNote:
      "The document demonstrates operational and communications design. Its internal policy assertions, target assessments, and proposed tactics require independent review before external use.",
    intakeIds: ["INTAKE-TEAMS-CRS-POWER-MAP-2026"],
    supportsGenerally: [
      "Jamie's preparation of an operational power-map template",
      "audience-specific messaging architecture",
      "story and messenger safety controls",
      "coalition-governance and phased execution design"
    ],
    doesNotEstablish: [
      "collective adoption or use",
      "the accuracy of every policy or stakeholder assessment",
      "completion of proposed work",
      "legislative or campaign outcomes"
    ],
    protectedLocatorId: "ARCHIVE-TEAMS-CRS-POWER-MAP-2026-001"
  },
  {
    id: "SRC-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026",
    title: "Job-Hunt Context Outline",
    author: "Jamie Burkart with AI-assisted archival synthesis",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-03",
    publicCitation: "Private job-hunt evidence-routing outline, July 2026.",
    publicNote:
      "The outline maps role positioning and evidence locations. It is a research and editorial guide, not independent proof of the accomplishments it summarizes.",
    intakeIds: ["INTAKE-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    supportsGenerally: [
      "a cross-archive evidence-routing map",
      "technical project management and product-operations positioning",
      "explicit public/private source boundaries",
      "an identified independent-corroboration gap for the HJE revenue claim"
    ],
    doesNotEstablish: [
      "the truth of every summarized accomplishment",
      "independent verification of resume claims",
      "current hiring-market fit",
      "audited business outcomes"
    ],
    protectedLocatorId: "ARCHIVE-TEAMS-JOB-HUNT-CONTEXT-2026-001"
  },
  {
    id: "SRC-KCUR-HJE-ONLINE-SALES-2016",
    title: "How Flying Dolphins Kept This Old-School Kansas City Hardware Store Alive",
    author: "Coy Dugger",
    organization: "KCUR 89.3",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-21",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.kcur.org/show/central-standard/2016-04-21/how-flying-dolphins-kept-this-old-school-kansas-city-hardware-store-alive",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Coy Dugger, 'How Flying Dolphins Kept This Old-School Kansas City Hardware Store Alive,' KCUR 89.3, April 21, 2016.",
    publicNote:
      "Independent reporting quotes fourth-generation owner and webmaster Jori Sackin on the internet's role, online sales accounting for 50 percent of the business, and customers beyond Kansas City.",
    intakeIds: ["INTAKE-KCUR-HJE-ONLINE-SALES-2016"],
    supportsGenerally: [
      "the internet's role in inventory and niche-item sales",
      "online sales accounting for 50 percent of the business in 2016",
      "customer reach beyond the local market",
      "Jori Sackin's owner and webmaster role"
    ],
    doesNotEstablish: [
      "Jamie's role or authorship",
      "a two-times total-revenue comparison",
      "the revenue comparison period or basis",
      "causation between Jamie's work and business outcomes"
    ]
  }
] satisfies SourceRecord[];

export const teamsArchiveDeepeningReadings = [
  {
    id: "READ-TEAMS-ICLOUD-WEB-INVENTORY-2026",
    sourceId: "SRC-TEAMS-ICLOUD-WEB-INVENTORY-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-TEAMS-ICLOUD-TARGET-INVENTORY",
        text: "The authenticated iCloud surface exposed 68 Teams items, six Jamie Projects History items, 175 CRS items, and 58 job-hunt items during this pass.",
        relationToJamie: "project-context",
        supportTags: ["teams-icloud-target-folder-inventory"],
        confidence: "high",
        locator: "Authenticated folder-level item counts"
      },
      {
        id: "PROP-TEAMS-ICLOUD-LOCAL-CLOUD-VERSION-SKEW",
        text: "The iCloud surface showed a newer and substantially larger CRS overview than the locally hydrated copy, so the local file could not be treated as the newest archive snapshot.",
        relationToJamie: "limitation",
        supportTags: ["teams-icloud-version-skew-detected"],
        confidence: "high",
        locator: "CRS overview metadata reconciliation"
      }
    ],
    limitations: [
      "Folder counts describe the authenticated surface at one moment and are not lifetime archive totals.",
      "The newest cloud overview was inventoried but not close-read; no claim in this pass depends on its unseen contents.",
      "Private filenames, account details, and local paths are intentionally omitted from the public repository."
    ],
    researchTaskIds: ["TASK-TEAMS-ICLOUD-VERSION-RECONCILIATION-2026"]
  },
  {
    id: "READ-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025",
    sourceId: "SRC-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-NYCAC-WIKIPEDIA-JAMIE-SOURCE-PACKAGING",
        text: "Jamie assembled a sandbox draft, campaign-site references, Council-record bibliography, and visual asset for an NYC Artist Coalition article.",
        relationToJamie: "direct-role",
        supportTags: ["nycac-wikipedia-draft-source-packaging"],
        confidence: "high",
        locator: "Draft, campaign-source correspondence, and consolidated Council-record bibliography"
      },
      {
        id: "PROP-NYCAC-WIKIPEDIA-EXPERT-HANDOFF",
        text: "After an earlier unsuccessful submission, Jamie sought help from Dorothy Howard and worked through an edited draft and publication handoff rather than presenting himself as the independent publisher.",
        relationToJamie: "collective-role",
        supportTags: ["nycac-wikipedia-expert-collaboration-handoff"],
        confidence: "high",
        locator: "Collaboration notes, working-session record, and edited draft"
      },
      {
        id: "PROP-NYCAC-WIKIPEDIA-RIGHTS-BOUNDARY",
        text: "The collaboration packet records a proposed image-use rationale but does not itself constitute a conclusive rights determination.",
        relationToJamie: "limitation",
        supportTags: ["nycac-wikipedia-image-rights-boundary"],
        confidence: "high",
        locator: "Image correspondence"
      }
    ],
    limitations: [
      "Private correspondence and recordings remain outside the repository and are not public testimonials.",
      "The collaboration packet does not make every underlying coalition claim independently verified.",
      "Wikipedia publication does not transfer collective campaign accomplishments into Jamie's sole credit."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025",
    sourceId: "SRC-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-NYCAC-WIKIPEDIA-JAMIE-SANDBOX-DRAFT",
        text: "Wikipedia's public history records the James Bernard Burkart account creating an 11,066-byte NYC Artist Coalition sandbox draft on December 20, 2025.",
        relationToJamie: "direct-role",
        supportTags: ["nycac-wikipedia-jamie-sandbox-draft"],
        confidence: "high",
        locator: "December 20, 2025 creation revision"
      },
      {
        id: "PROP-NYCAC-WIKIPEDIA-COLLABORATOR-MAINSPACE-MOVE",
        text: "The public history records subsequent edits by Hexatekin and a December 27, 2025 move from Jamie's sandbox into the NYC Artist Coalition article namespace.",
        relationToJamie: "collective-role",
        supportTags: ["nycac-wikipedia-collaborator-mainspace-handoff"],
        confidence: "high",
        locator: "December 20-27, 2025 revision and move entries"
      },
      {
        id: "PROP-NYCAC-WIKIPEDIA-LIVE-ARTICLE",
        text: "The NYC Artist Coalition article and its public revision history remained available when verified on July 14, 2026.",
        relationToJamie: "outcome-context",
        supportTags: ["nycac-wikipedia-live-public-record"],
        confidence: "high",
        locator: "Live article and revision-history pages"
      }
    ],
    limitations: [
      "The public revision history does not identify every editor's offline identity.",
      "A live Wikipedia article is not proof that every statement within it is correct or that Wikipedia endorses the coalition.",
      "The history does not establish Jamie as the article's independent publisher."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-PITCH-NTER-CHNG-2010",
    sourceId: "SRC-PITCH-NTER-CHNG-2010",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-NTER-CHNG-PARTICIPATORY-INTERFACE",
        text: "The Pitch described NTER CHNG as equal parts software application and architectural installation, enabling visitors to communicate in real time through a digital gallery wall.",
        relationToJamie: "project-context",
        supportTags: ["nter-chng-participatory-interface"],
        confidence: "high",
        locator: "Event description"
      },
      {
        id: "PROP-NTER-CHNG-SHARED-DIALOGUE",
        text: "The listing states that participant messages accumulated into a virtual dialogue over the course of the exhibition.",
        relationToJamie: "outcome-context",
        supportTags: ["nter-chng-shared-dialogue-result"],
        confidence: "high",
        locator: "Event description"
      },
      {
        id: "PROP-NTER-CHNG-JANUARY-2010-PRESENTATION",
        text: "The public listing is dated January 7, 2010 and announces a January 8 presentation.",
        relationToJamie: "project-context",
        supportTags: ["nter-chng-january-2010-presentation"],
        confidence: "high",
        locator: "Publication date and event line"
      }
    ],
    limitations: [
      "The Pitch listing does not identify the makers or divide technical responsibilities.",
      "The source describes intended and visible interaction but provides no audience count or measured engagement result."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-VIMEO-NTER-CHNG-2011",
    sourceId: "SRC-VIMEO-NTER-CHNG-2011",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-NTER-CHNG-COLLABORATIVE-MAKERS",
        text: "Official Vimeo metadata credits Drew Bolton, Jamie Burkart, and Garrett Fuselier as the makers of the interactive texting installation.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-collaborative-makers"],
        confidence: "high",
        locator: "Video description"
      },
      {
        id: "PROP-NTER-CHNG-SUPPORTING-CREDITS",
        text: "The same metadata credits Mary Nichols with helping engineer and construct the wall and Megan Mantia and Elisha Stetson as actors.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-supporting-collaborator-credits"],
        confidence: "high",
        locator: "Video description"
      },
      {
        id: "PROP-NTER-CHNG-DESIGNER-CREDIT",
        text: "The archived project metadata labels Jamie as a designer while leaving the detailed division of labor among the three makers unresolved.",
        relationToJamie: "direct-role",
        supportTags: ["nter-chng-jamie-designer-credit"],
        confidence: "high",
        locator: "Project credits"
      }
    ],
    limitations: [
      "The credits do not establish Jamie's sole authorship or the detailed technical implementation split.",
      "The video metadata does not establish audience size, adoption, or lasting impact."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-TEAMS-CRS-POWER-MAP-2026",
    sourceId: "SRC-TEAMS-CRS-POWER-MAP-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-TEAMS-CRS-POWER-MAP-OPERATIONAL-STRUCTURE",
        text: "Jamie prepared a dated internal artifact that organized decision-makers and coalition actors through influence, stance, access, relationship owner, next ask, messenger, and evidence fields.",
        relationToJamie: "direct-role",
        supportTags: ["crs-power-map-operational-structure"],
        confidence: "high",
        locator: "Purpose, power-map categories, and target-grid template"
      },
      {
        id: "PROP-TEAMS-CRS-POWER-MAP-MESSAGING-SYSTEM",
        text: "The artifact translated a policy campaign into audience-specific messages, proof points, asks, messenger choices, rebuttal patterns, and phased execution work.",
        relationToJamie: "direct-role",
        supportTags: ["crs-power-map-messaging-and-execution-design"],
        confidence: "high",
        locator: "Functional messaging grid and 30/60/90-day plan"
      },
      {
        id: "PROP-TEAMS-CRS-POWER-MAP-MESSENGER-SAFETY",
        text: "The design treated tenant retaliation risk as an operating constraint and included anonymization, consent, and messenger-protection practices.",
        relationToJamie: "direct-role",
        supportTags: ["crs-power-map-messenger-safety"],
        confidence: "high",
        locator: "Story and messenger safety section"
      },
      {
        id: "PROP-TEAMS-CRS-POWER-MAP-INTERNAL-REVIEW-BOUNDARY",
        text: "The document labels itself internal-only and requires review before external circulation.",
        relationToJamie: "limitation",
        supportTags: ["crs-power-map-review-boundary"],
        confidence: "high",
        locator: "Document classification"
      }
    ],
    limitations: [
      "A prepared internal artifact does not establish coalition adoption, execution, or outcome.",
      "Policy assertions, target assessments, and proposed tactics were not independently validated in this pass.",
      "No private target intelligence or sensitive tenant information is reproduced in the repository."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026",
    sourceId: "SRC-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-TEAMS-JOB-HUNT-EVIDENCE-ROUTING",
        text: "The outline explicitly positions itself as an evidence-routing map rather than a resume and connects role narratives to source folders and public/private boundaries.",
        relationToJamie: "direct-role",
        supportTags: ["job-hunt-evidence-routing-map"],
        confidence: "high",
        locator: "Purpose, folder map, and major job-hunt stories"
      },
      {
        id: "PROP-TEAMS-JOB-HUNT-ROLE-FRAME",
        text: "The synthesis frames Jamie's strongest role fit around technical project management, product operations, implementation, civic technology, and source-backed knowledge systems rather than software engineering or organizing alone.",
        relationToJamie: "project-context",
        supportTags: ["job-hunt-role-positioning-synthesis"],
        confidence: "moderate",
        locator: "Best current role frame and core narrative"
      },
      {
        id: "PROP-TEAMS-JOB-HUNT-HJE-VERIFICATION-GAP",
        text: "The outline states that its archive pass did not independently corroborate the HJE two-times revenue contribution claim and recommends verification before treating it as a major external proof point.",
        relationToJamie: "limitation",
        supportTags: ["hje-revenue-independent-corroboration-gap"],
        confidence: "high",
        locator: "Web and product implementation claim caution"
      }
    ],
    limitations: [
      "The outline is an AI-assisted synthesis and cannot independently prove the claims it routes.",
      "Role-fit recommendations are editorial judgments, not hiring-market measurements.",
      "Private job-search conversations and application materials remain outside the repository."
    ],
    researchTaskIds: ["TASK-HJE-REVENUE-INDEPENDENT-CORROBORATION"]
  },
  {
    id: "READ-KCUR-HJE-ONLINE-SALES-2016",
    sourceId: "SRC-KCUR-HJE-ONLINE-SALES-2016",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-KCUR-HJE-INTERNET-INVENTORY-AND-NICHE-SALES",
        text: "KCUR reported that the internet played a key role in helping Harry J. Epstein Company's owners manage inventory and sell niche items.",
        relationToJamie: "project-context",
        supportTags: ["hje-internet-inventory-and-niche-sales-context"],
        confidence: "high",
        locator: "Surplus and the internet section"
      },
      {
        id: "PROP-KCUR-HJE-ONLINE-SALES-HALF-2016",
        text: "Fourth-generation owner and webmaster Jori Sackin told KCUR that online sales accounted for 50 percent of the business in 2016.",
        relationToJamie: "outcome-context",
        supportTags: ["hje-online-sales-half-2016"],
        confidence: "high",
        locator: "Surplus and the internet section"
      },
      {
        id: "PROP-KCUR-HJE-GLOBAL-CUSTOMER-REACH-2016",
        text: "KCUR reported that the company had expanded from local contractor and Kansas City sales to customers in Canada, Thailand, Australia, and England.",
        relationToJamie: "outcome-context",
        supportTags: ["hje-global-customer-reach-2016"],
        confidence: "high",
        locator: "Surplus and the internet section"
      }
    ],
    limitations: [
      "The article does not name Jamie or attribute implementation work to him.",
      "A 50-percent online-sales share is not evidence that total revenue doubled.",
      "The article does not supply the baseline, comparison period, or accounting basis for the separate two-times claim.",
      "The reporting establishes business context and outcome, not individual causation."
    ],
    researchTaskIds: []
  }
] satisfies SourceReading[];

export const teamsArchiveDeepeningClaims = [
  {
    id: "CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION-2010",
    project: "nter-chng",
    internalClaim:
      "In 2010, Jamie co-designed NTER CHNG, a software and architectural installation that let gallery visitors use text messages to build a shared real-time dialogue.",
    status: "confirmed-with-boundary",
    maturity: "projected",
    intakeIds: ["INTAKE-PITCH-NTER-CHNG-2010", "INTAKE-VIMEO-NTER-CHNG-2011"],
    requiredSupportTags: [
      "nter-chng-participatory-interface",
      "nter-chng-shared-dialogue-result",
      "nter-chng-collaborative-makers",
      "nter-chng-jamie-designer-credit",
      "nter-chng-supporting-collaborator-credits"
    ],
    composition: {
      action:
        "Co-designed a participatory texting installation combining software with a constructed gallery interface.",
      intendedEnd:
        "Let visitors communicate across the installation and see their contributions accumulate into a shared dialogue.",
      usableResult:
        "A January 2010 public installation in which participant text messages appeared through both faces of a digital wall.",
      audience: "Gallery visitors participating with their own mobile phones.",
      collectiveCredit:
        "Credit Drew Bolton and Garrett Fuselier as co-makers, Mary Nichols for wall engineering and construction support, and Megan Mantia and Elisha Stetson as actors.",
      causalBoundary:
        "The sources establish project behavior and collaborative credits, not sole authorship, a detailed technical split, audience scale, or long-term impact."
    },
    projections: [
      {
        key: "archive-note",
        text:
          "With Drew Bolton and Garrett Fuselier, I co-designed NTER CHNG, a 2010 participatory installation combining software with a constructed gallery interface so visitors could use their own phones to contribute to a shared dialogue. Public credits also name Mary Nichols for wall engineering and construction support, and Megan Mantia and Elisha Stetson as actors.",
        status: "active",
        citationRequired: true,
        surfaces: ["/about"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-PITCH-NTER-CHNG-2010",
        relationship: "direct-support",
        supports: ["participatory interface", "shared dialogue", "January 2010 presentation"],
        propositionIds: [
          "PROP-NTER-CHNG-PARTICIPATORY-INTERFACE",
          "PROP-NTER-CHNG-SHARED-DIALOGUE",
          "PROP-NTER-CHNG-JANUARY-2010-PRESENTATION"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-VIMEO-NTER-CHNG-2011",
        relationship: "corroborating",
        supports: ["Jamie designer credit", "three collaborative makers", "supporting collaborators"],
        propositionIds: [
          "PROP-NTER-CHNG-COLLABORATIVE-MAKERS",
          "PROP-NTER-CHNG-SUPPORTING-CREDITS",
          "PROP-NTER-CHNG-DESIGNER-CREDIT"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Use co-designed and retain all named collaborator credits.",
      "Describe the visible participatory behavior without inventing audience or engagement totals."
    ],
    antiClaims: [
      "Jamie alone created NTER CHNG.",
      "Jamie wrote all software or engineered the wall.",
      "The installation reached a documented audience size or produced measured civic outcomes."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private-archive and public-source review"]
  },
  {
    id: "CLM-NYCAC-WIKIPEDIA-SOURCE-HANDOFF-2025",
    project: "nyc-artist-coalition",
    internalClaim:
      "In December 2025, Jamie assembled a source-backed NYC Artist Coalition sandbox draft, sought expert help after an earlier unsuccessful submission, and worked with Dorothy Howard through a revision and publication handoff that produced a live, independently edited Wikipedia article.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [
      "INTAKE-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025",
      "INTAKE-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025"
    ],
    requiredSupportTags: [
      "nycac-wikipedia-draft-source-packaging",
      "nycac-wikipedia-expert-collaboration-handoff",
      "nycac-wikipedia-jamie-sandbox-draft",
      "nycac-wikipedia-collaborator-mainspace-handoff",
      "nycac-wikipedia-live-public-record"
    ],
    composition: {
      action:
        "Assembled a sourced organizational-history draft, recognized the need for outside expertise, and handed the work into an editor-led revision process.",
      intendedEnd:
        "Create a durable, source-linked public history that could be reviewed and corrected beyond Jamie's own archive.",
      usableResult:
        "A December 2025 sandbox draft, Council-record bibliography, documented collaborator revision process, and live Wikipedia article with public revision history.",
      audience:
        "Readers, researchers, and collaborators seeking a navigable public record of NYC Artist Coalition history.",
      collectiveCredit:
        "Credit Dorothy Howard for expert editing and the publication handoff; the article and the coalition history it describes remain collective and independently editable.",
      causalBoundary:
        "The workflow establishes Jamie's source packaging and handoff practice, not independent publication, Wikipedia endorsement, universal factual verification, or ownership of coalition accomplishments."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-TEAMS-NYCAC-WIKIPEDIA-COLLABORATION-2025",
        relationship: "private-support",
        supports: ["source packaging", "request for expert help", "collaborator handoff", "rights boundary"],
        propositionIds: [
          "PROP-NYCAC-WIKIPEDIA-JAMIE-SOURCE-PACKAGING",
          "PROP-NYCAC-WIKIPEDIA-EXPERT-HANDOFF",
          "PROP-NYCAC-WIKIPEDIA-RIGHTS-BOUNDARY"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WIKIPEDIA-NYCAC-REVISION-HISTORY-2025",
        relationship: "corroborating",
        supports: ["Jamie's sandbox draft", "collaborator edits and move", "live public record"],
        propositionIds: [
          "PROP-NYCAC-WIKIPEDIA-JAMIE-SANDBOX-DRAFT",
          "PROP-NYCAC-WIKIPEDIA-COLLABORATOR-MAINSPACE-MOVE",
          "PROP-NYCAC-WIKIPEDIA-LIVE-ARTICLE"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe the work as source packaging, sandbox drafting, collaboration, and handoff.",
      "Do not use the Wikipedia article as independent proof of the underlying coalition claims.",
      "Keep raw correspondence, recordings, and unresolved image-rights material private."
    ],
    antiClaims: [
      "Jamie independently published the NYC Artist Coalition Wikipedia article.",
      "Wikipedia verified or endorsed every coalition claim.",
      "Jamie or Dorothy authored every sentence in the current article.",
      "The collaboration packet conclusively clears every image right.",
      "Publishing an organizational history makes Jamie the sole creator of the coalition's work."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private-archive and public-source review"]
  },
  {
    id: "CLM-CRS-POWER-MAP-MESSAGING-GRID-2026",
    project: "fair-rent-nyc",
    internalClaim:
      "In February 2026, Jamie prepared an internal Commercial Rent Stabilization power map and functional messaging grid that translated policy and coalition complexity into target ownership, audience-specific asks, messenger safety, governance, and phased execution structures.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-TEAMS-CRS-POWER-MAP-2026"],
    requiredSupportTags: [
      "crs-power-map-operational-structure",
      "crs-power-map-messaging-and-execution-design",
      "crs-power-map-messenger-safety",
      "crs-power-map-review-boundary"
    ],
    composition: {
      action:
        "Prepared an internal power map and messaging system that connected stakeholder analysis to ownership, asks, evidence, messengers, safety, and execution timing.",
      intendedEnd:
        "Help collaborators translate a complex policy campaign into reviewable operational choices without exposing vulnerable participants.",
      usableResult:
        "A dated internal artifact with target and message grids, story-safety controls, governance prompts, and a phased execution plan.",
      audience:
        "Commercial Rent Stabilization collaborators coordinating policy, communications, testimony, and stakeholder work.",
      collectiveCredit:
        "The artifact was designed for coalition use and does not convert collaborators' knowledge, decisions, or campaign work into Jamie's sole authorship.",
      causalBoundary:
        "The source establishes Jamie's preparation of the artifact, not collective adoption, factual validation of every internal assessment, implementation, or policy impact."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-TEAMS-CRS-POWER-MAP-2026",
        relationship: "private-support",
        supports: ["operational structure", "messaging and execution design", "messenger safety", "review boundary"],
        propositionIds: [
          "PROP-TEAMS-CRS-POWER-MAP-OPERATIONAL-STRUCTURE",
          "PROP-TEAMS-CRS-POWER-MAP-MESSAGING-SYSTEM",
          "PROP-TEAMS-CRS-POWER-MAP-MESSENGER-SAFETY",
          "PROP-TEAMS-CRS-POWER-MAP-INTERNAL-REVIEW-BOUNDARY"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use prepared or designed, not adopted, executed, or delivered.",
      "Do not reproduce private target assessments, tenant stories, or internal tactics.",
      "Treat policy assertions as working material unless separately sourced."
    ],
    antiClaims: [
      "The coalition adopted every recommendation in the artifact.",
      "Jamie controlled the coalition's policy, communications, or stakeholder decisions.",
      "The power map produced passage, campaign growth, or a measured outcome.",
      "Every internal stakeholder or policy assessment was independently verified."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex private-archive review"]
  },
  {
    id: "CLM-HJE-ONLINE-SALES-SHARE-2016",
    project: "harry-j-epstein",
    internalClaim:
      "In 2016, KCUR reported that the internet helped Harry J. Epstein Company manage inventory and sell niche items, that online sales accounted for 50 percent of the business, and that customers extended beyond Kansas City to several countries.",
    status: "confirmed-with-boundary",
    maturity: "projected",
    intakeIds: ["INTAKE-KCUR-HJE-ONLINE-SALES-2016"],
    requiredSupportTags: [
      "hje-internet-inventory-and-niche-sales-context",
      "hje-online-sales-half-2016",
      "hje-global-customer-reach-2016"
    ],
    composition: {
      action:
        "KCUR independently reported how Harry J. Epstein Company used internet-enabled inventory and niche-item sales to reach customers beyond Kansas City.",
      intendedEnd:
        "Provide independently inspectable company context while Jamie's separate numerical contribution claim remains on corroboration hold.",
      usableResult:
        "A dated public benchmark: online sales accounted for half of the business in 2016, with customers extending to several countries.",
      audience:
        "Portfolio readers evaluating the business context surrounding the company's e-commerce modernization.",
      collectiveCredit:
        "The result belongs to Harry J. Epstein Company and is attributed to KCUR's reporting and Jori Sackin's account, not to Jamie alone.",
      causalBoundary:
        "The source does not establish Jamie's role, total-revenue growth, or individual causation; a 50-percent online-sales share is not a two-times revenue result."
    },
    projections: [
      {
        key: "case-study",
        text:
          "By 2016, KCUR reported that online sales accounted for half of Harry J. Epstein Company's business and that its customers had expanded from local buyers to customers around the world.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/harry-j-epstein"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-KCUR-HJE-ONLINE-SALES-2016",
        relationship: "direct-support",
        supports: [
          "internet-enabled inventory and niche-item sales context",
          "50-percent online-sales share in 2016",
          "customer reach beyond Kansas City"
        ],
        propositionIds: [
          "PROP-KCUR-HJE-INTERNET-INVENTORY-AND-NICHE-SALES",
          "PROP-KCUR-HJE-ONLINE-SALES-HALF-2016",
          "PROP-KCUR-HJE-GLOBAL-CUSTOMER-REACH-2016"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Attribute the 50-percent figure and global reach to KCUR's reporting and Jori Sackin's account.",
      "Use this as company outcome context, not proof of Jamie's role or individual causation.",
      "Do not convert online-sales share into a two-times total-revenue claim."
    ],
    antiClaims: [
      "KCUR reported that Jamie doubled company revenue.",
      "Jamie alone caused online sales to reach half of the business.",
      "A 50-percent online-sales share means total company revenue doubled."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-source review"]
  }
] satisfies ClaimRecord[];

export const teamsArchiveDeepeningResearchTasks = [
  {
    id: "TASK-TEAMS-ICLOUD-VERSION-RECONCILIATION-2026",
    project: "source-backed-knowledge-practice",
    question:
      "What evidence changed in the newest cloud-hosted Teams overview files, and which additions warrant new close readings or claim corrections?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: ["INTAKE-TEAMS-ICLOUD-WEB-INVENTORY-2026"],
    sourceIds: [
      "SRC-TEAMS-ICLOUD-WEB-INVENTORY-2026",
      "SRC-TEAMS-PROJECT-HISTORY-OVERVIEW-2026"
    ],
    claimIds: ["CLM-CROSS-PROJECT-ARCHIVE-PRACTICE-2026"],
    nextActions: [
      "Materialize or safely export the newest cloud overview without exposing account credentials or private source material.",
      "Compare generation dates, sizes, checksums, and section inventories against the last close-read local snapshots.",
      "Close-read only changed high-value sections and promote bounded propositions rather than treating file size as evidence depth."
    ]
  },
  {
    id: "TASK-HJE-REVENUE-INDEPENDENT-CORROBORATION",
    project: "harry-j-epstein",
    question:
      "What exact start and end periods, accounting basis, and comparable revenue totals underlie the HJE two-times claim, and can the current authorized company records custodian separately confirm Jamie's contribution?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: ["INTAKE-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026"],
    sourceIds: [
      "SRC-TEAMS-JOB-HUNT-CONTEXT-OUTLINE-2026",
      "SRC-HJE-PUBLIC-RESUME-2026-07-11",
      "SRC-KCUR-HJE-ONLINE-SALES-2016"
    ],
    claimIds: ["CLM-HJE-REVENUE-GROWTH-CONTRIBUTION"],
    nextActions: [
      "Ask Jori Sackin or the current authorized Harry J. Epstein Company financial-record custodian to identify the intended comparison period; do not assume calendar years, fiscal years, or Jamie's first year.",
      "Recover same-basis start and end totals with the period dates, gross-versus-net definition, returns treatment, and source-system or bookkeeping report identified; retain the raw figures only in an authorized private record.",
      "Verify the arithmetic independently. Accept '2x' only when the same-basis ratio is between 1.95 and 2.05, or replace it with an explicitly approximate verified ratio.",
      "Obtain a dated written confirmation from an authorized company collaborator that distinguishes the company-level numerical result from Jamie's bounded contribution across web, e-commerce, marketing, analytics, content, and operations.",
      "Restore a public Jamie-linked numerical projection only when both the financial comparison and the contribution confirmation are present; otherwise keep the numerical claim on hold and use the independently reported 2016 online-sales context."
    ]
  }
] satisfies ResearchTask[];

export const teamsArchiveDeepeningDecisions = [
  ...teamsArchiveDeepeningClaims
    .filter(
      (claim) =>
        claim.id !== "CLM-HJE-ONLINE-SALES-SHARE-2016" &&
        claim.id !== "CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION-2010"
    )
    .map((claim) => ({
    id: `DEC-${claim.id.replace(/^CLM-/, "")}-DEFER`,
    claimId: claim.id,
    surface: "future-portfolio-composition",
    decision: "defer" as const,
    rationale:
      "The claim is public-safe and source-backed, but this archive pass expands the compositional palette rather than automatically changing the live portfolio.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex archival-production review"]
    })),
  {
    id: "DEC-PUBLISH-NTER-CHNG-PARTICIPATORY-INSTALLATION-2010",
    claimId: "CLM-NTER-CHNG-PARTICIPATORY-INSTALLATION-2010",
    surface: "/about",
    decision: "publish",
    rationale:
      "This bounded collaborative example makes Jamie's artistic, social-software, and implementation formation inspectable without implying sole authorship, measured adoption, or long-term impact.",
    decidedAt: "2026-07-15",
    reviewedBy: ["Codex archival-production and public-source review"]
  },
  {
    id: "DEC-PUBLISH-HJE-ONLINE-SALES-SHARE-2016",
    claimId: "CLM-HJE-ONLINE-SALES-SHARE-2016",
    surface: "/work/harry-j-epstein",
    decision: "publish",
    rationale:
      "Independent reporting supplies a stronger public business-context projection while the separate two-times contribution claim remains on corroboration hold.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex archival-production and public-source review"]
  }
] satisfies ProjectionDecision[];
