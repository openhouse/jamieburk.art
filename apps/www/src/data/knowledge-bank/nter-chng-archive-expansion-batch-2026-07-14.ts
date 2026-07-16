import type {
  ClaimRecord,
  IntakeRecord,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const nterChngArchiveSourceIds = [
  "SRC-NTER-CHNG-PROJECT-SITE-2011",
  "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
  "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
  "SRC-NERMAN-AMERICA-NOW-HERE-2011",
  "SRC-GDRIVE-NTER-CHNG-INSTALLER-2011",
  "SRC-GDRIVE-NTER-CHNG-PROJECT-TEXT-2011"
] as const;

export const nterChngArchiveClaimIds = [
  "CLM-NTER-CHNG-AMERICA-NOW-HERE-2011",
  "CLM-NTER-CHNG-PRODUCTION-SYSTEM-2011"
] as const;

export const nterChngArchiveIntake = [
  {
    id: "LEAD-NTER-CHNG-ARCHIVE-EXHIBITION-EXPANSION-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart with Codex Wayback review",
    kind: "website",
    title: "NTER CHNG and America: Now and Here archive expansion",
    summary:
      "The archived NTER CHNG site and two archived pages from America: Now and Here's official sites establish the project's shared maker credit, participatory interaction, inclusion in the 2011 exhibition, and observed public use; a Nerman Museum page supplies institutional launch context without independently naming NTER CHNG.",
    sourceUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "inquiry-created", "project-linked"],
    projectIds: ["creative-technology-practice", "career-proof-system"],
    sourceIds: [...nterChngArchiveSourceIds],
    claimIds: [...nterChngArchiveClaimIds],
    inquiryIds: ["INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"],
    notes: [
      "America: Now and Here's official Kansas City artist page directly establishes exhibition inclusion and credits Drew Bolton, Jamie Burkart, and Garrett Fuselier together.",
      "The Nerman Museum page establishes institutional and launch context but does not itself name NTER CHNG.",
      "Archived phone numbers and participant-submitted messages are excluded from the public repository; only public-safe summaries of the interaction are retained.",
      "A PDF linked by the archived project site was not recovered in this pass; not recovered is not evidence that it did not exist."
    ]
  },
  {
    id: "LEAD-NTER-CHNG-GDRIVE-ARTIFACTS-2026",
    receivedAt: "2026-07-15",
    suppliedBy: "Jamie Burkart with Codex protected Google Drive review",
    kind: "document",
    title: "NTER CHNG installer and project-text artifacts",
    summary:
      "Two contemporaneous Google Docs add a protected production layer to the public exhibition record: a 2011 America: Now and Here installer plan and a project-text document containing the January 2010 exhibit description and many-to-many interaction rationale.",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["creative-technology-practice", "career-proof-system"],
    sourceIds: [
      "SRC-GDRIVE-NTER-CHNG-INSTALLER-2011",
      "SRC-GDRIVE-NTER-CHNG-PROJECT-TEXT-2011"
    ],
    claimIds: ["CLM-NTER-CHNG-PRODUCTION-SYSTEM-2011"],
    inquiryIds: ["INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"],
    notes: [
      "Drive metadata dates the documents' creation to April 2011; both were modified in July 2026, so the current text is treated as contemporaneous-origin project material rather than a frozen 2011 revision.",
      "The installer is a plan and task inventory, not proof that every task was completed or that any one collaborator performed it.",
      "The project-text document contains phone numbers and participant messages; neither the raw text nor either Google Drive link enters the public repository.",
      "The January 2010 exhibit language may preserve press-material text, but the record does not establish that it is the unrecovered linked PDF or a final published release.",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier retain equal shared maker credit; individual role decomposition remains open."
    ]
  }
] satisfies IntakeRecord[];

export const nterChngArchiveSources = [
  {
    id: "SRC-NTER-CHNG-PROJECT-SITE-2011",
    title: "NTER CHNG project site",
    organization: "NTER CHNG",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-01-28T19:33:50Z",
    accessedAt: "2026-07-14",
    archiveUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation: "NTER CHNG project site, archived January 28, 2011.",
    publicNote:
      "The archived project site describes an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier and records its earlier Kansas City presentation.",
    supportsGenerally: [
      "NTER CHNG as an interactive texting installation",
      "shared credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "an earlier public presentation in Kansas City"
    ],
    doesNotEstablish: [
      "the detailed division of software, design, fabrication, or production labor",
      "inclusion in America: Now and Here",
      "audience size, reception, adoption, or impact",
      "rights to republish archived media"
    ]
  },
  {
    id: "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
    title: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    organization: "America: Now and Here Kansas City",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-05-18T07:16:26Z",
    accessedAt: "2026-07-14",
    archiveUrl: "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
    preferredPublicUrl: "archive",
    publicCitation:
      "America: Now and Here Kansas City, 'Drew Bolton, Jamie Burkart, and Garrett Fuselier,' archived May 18, 2011.",
    publicNote:
      "The exhibition's official Kansas City site lists the three collaborators as visual artists and describes NTER CHNG as a software-and-architectural installation for real-time many-to-many public text exchange. Raw contact details and participant submissions on the archived page are intentionally excluded here.",
    supportsGenerally: [
      "NTER CHNG's inclusion in America: Now and Here in Kansas City",
      "shared visual-artist credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "the work's software, architectural, real-time, and participatory form",
      "the collaborators' combined backgrounds in scenic design, programming, motion graphics, and experiential production"
    ],
    doesNotEstablish: [
      "solo authorship or the detailed division of labor",
      "audience size, reception, later adoption, or causal impact",
      "institutional endorsement of an individual collaborator",
      "permission to republish contact details, participant messages, or media"
    ]
  },
  {
    id: "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
    title: "I Text, Therefore I Am",
    organization: "America: Now and Here",
    author: "BProffer",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2011-06-22",
    capturedAt: "2012-10-17T09:05:12Z",
    accessedAt: "2026-07-14",
    archiveUrl: "https://web.archive.org/web/20121017090512/http://americanowandhere.org/2011/06/i-text-therefore-i-am/",
    preferredPublicUrl: "archive",
    publicCitation: "America: Now and Here, 'I Text, Therefore I Am,' June 22, 2011, archived October 17, 2012.",
    publicNote:
      "A first-party exhibition account describes visitors using NTER CHNG by sending text messages and seeing them projected on a floor-to-ceiling gauze display. Participant messages are not reproduced in the knowledge bank.",
    supportsGenerally: [
      "visitor use of NTER CHNG during America: Now and Here",
      "text-message input and projected visual output",
      "public interaction as an observed feature of the installation"
    ],
    doesNotEstablish: [
      "the makers' individual responsibilities",
      "total attendance, unique participants, endorsement, or impact",
      "permission to republish participant messages or exhibition media"
    ]
  },
  {
    id: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
    title: "America: Now and Here - Barbara Kruger",
    organization: "Nerman Museum of Contemporary Art",
    author: "Alice Thorson",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-04-30",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Alice Thorson, 'America: Now and Here - Barbara Kruger,' Nerman Museum of Contemporary Art, April 30, 2011.",
    publicNote:
      "The institutional page situates America: Now and Here's 2011 Kansas City launch and its multi-venue visual, literary, musical, and performance program.",
    supportsGenerally: [
      "Kansas City as the 2011 launch context for America: Now and Here",
      "the exhibition's multi-venue and multi-disciplinary scope",
      "Nerman Museum participation in the Kansas City program"
    ],
    doesNotEstablish: [
      "NTER CHNG's inclusion in the exhibition",
      "the NTER CHNG maker credits or division of labor",
      "Jamie's attendance, institutional endorsement, audience reach, or impact"
    ]
  },
  {
    id: "SRC-GDRIVE-NTER-CHNG-INSTALLER-2011",
    title: "NTER CHNG Installer",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-13T18:25:12Z",
    accessedAt: "2026-07-15",
    publicCitation:
      "NTER CHNG installer plan for America: Now and Here, Google Doc created April 13, 2011, protected archival review.",
    publicNote:
      "The plan identifies May 2011 America: Now and Here staging and records an installation workflow spanning organizer permissions, software revisions, hosting, display computers, projectors, wall fabrication, floor instructions, wiring, and gallery-experience tuning.",
    supportsGenerally: [
      "planned NTER CHNG staging for America: Now and Here in May 2011",
      "a preparation and installation schedule beginning in April 2011",
      "server-side and wall-side software review",
      "a planned fix for rapid-message back-queuing",
      "hosting, display-computer, projector, wall, floor-labeling, wiring, and network dependencies",
      "fabrication, transport, assembly, mounting, painting, and gallery-experience tasks",
      "a planned interview with all three collaborators and the installation"
    ],
    doesNotEstablish: [
      "completion of every planned task",
      "which collaborator authored the document or performed each task",
      "solo software, fabrication, design, or production credit",
      "the installation's audience, reception, adoption, or impact",
      "that the current document text is unchanged from every 2011 revision",
      "permission to publish the underlying Drive link, private worksite details, or hosting details"
    ],
    protectedLocatorId: "LOC-GDRIVE-NTER-CHNG-INSTALLER-2011"
  },
  {
    id: "SRC-GDRIVE-NTER-CHNG-PROJECT-TEXT-2011",
    title: "NTER CHNG 2011 project-text document",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-06T19:49:17Z",
    accessedAt: "2026-07-15",
    publicCitation:
      "NTER CHNG project-text document containing January 2010 exhibit information, Google Doc created April 6, 2011, protected archival review.",
    publicNote:
      "The document preserves shared three-person credit and describes NTER CHNG as transforming private one-to-one text exchange into a public many-to-many social information space. Participant phone numbers and message text are excluded.",
    supportsGenerally: [
      "shared Drew Bolton, Jamie Burkart, and Garrett Fuselier maker credit",
      "the January 2010 exhibit description",
      "software-application and architectural-installation framing",
      "real-time text exchange through both faces of a digital wall",
      "private one-to-one texting transformed into public many-to-many interaction",
      "scenic design, computer programming, motion graphics, and experiential production as combined team backgrounds",
      "an attributed Jamie statement about inviting visitors beyond existing contact networks"
    ],
    doesNotEstablish: [
      "that the text is the final published press release or the unrecovered linked PDF",
      "individual task division or solo authorship",
      "independent corroboration of first-party project language",
      "participant identity, consent, audience size, reception, or impact",
      "that the current document text is unchanged from every 2011 revision",
      "permission to publish the underlying Drive link, phone numbers, participant messages, or full document"
    ],
    protectedLocatorId: "LOC-GDRIVE-NTER-CHNG-PROJECT-TEXT-2011"
  }
] satisfies SourceRecord[];

export const nterChngArchiveClaims = [
  {
    id: "CLM-NTER-CHNG-AMERICA-NOW-HERE-2011",
    project: "creative-technology-practice",
    internalClaim:
      "America: Now and Here's official Kansas City site listed Drew Bolton, Jamie Burkart, and Garrett Fuselier as visual artists and documented NTER CHNG in the 2011 exhibition; the exhibition's main site later described visitors using the installation.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "America: Now and Here's official sites document NTER CHNG in its 2011 Kansas City exhibition and credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together as visual artists.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"]
    }],
    evidence: [
      {
        sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
        relationship: "direct-support",
        supports: ["exhibition inclusion", "three-person visual-artist credit", "installation form and interaction"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
        relationship: "corroborating",
        supports: ["observed visitor use", "text input and projected output"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NTER-CHNG-PROJECT-SITE-2011",
        relationship: "context",
        supports: ["project description", "shared maker credit", "earlier Kansas City presentation"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
        relationship: "context",
        supports: ["institutional launch and exhibition context"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-GDRIVE-NTER-CHNG-INSTALLER-2011",
        relationship: "context",
        supports: ["America: Now and Here staging context", "installation-production dependencies"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-GDRIVE-NTER-CHNG-PROJECT-TEXT-2011",
        relationship: "corroborating",
        supports: ["shared maker credit", "many-to-many interaction rationale"],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together; the records do not establish solo authorship or a detailed task split.",
      "The official America: Now and Here pages establish exhibition inclusion and use; the Nerman Museum page supplies context but does not itself name NTER CHNG.",
      "The protected Google Drive artifacts are contemporaneous-origin project records, not independent coverage or frozen 2011 revisions.",
      "No attendance, unique-participant, reception, adoption, endorsement, or impact claim is attached.",
      "Do not republish archived phone numbers, participant messages, private production details, Google Drive links, or media without separate permission and review."
    ],
    antiClaims: [
      "Jamie solely created NTER CHNG",
      "The Nerman Museum page names NTER CHNG",
      "The sources establish a quantified audience or exhibition impact",
      "Archived or protected access grants rights to participant messages, private records, or media"
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-NTER-CHNG-PRODUCTION-SYSTEM-2011",
    project: "creative-technology-practice",
    internalClaim:
      "Contemporaneous-origin project records describe NTER CHNG as a shared three-person work whose installation depended on coordinated software, hosting, display hardware, architectural fabrication, wiring, networking, and gallery tuning; the records also frame its interaction as transforming private one-to-one texting into public many-to-many exchange.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "Protected project records show the operational depth behind NTER CHNG: software behavior, hosting, display hardware, architectural fabrication, wiring, networking, and gallery tuning were planned as one installation system. The work was collectively credited to Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"]
    }],
    evidence: [
      {
        sourceId: "SRC-GDRIVE-NTER-CHNG-INSTALLER-2011",
        relationship: "direct-support",
        supports: [
          "planned software and hosting work",
          "display, projector, wall, floor, wiring, and network dependencies",
          "staged fabrication and gallery-tuning workflow"
        ],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-GDRIVE-NTER-CHNG-PROJECT-TEXT-2011",
        relationship: "direct-support",
        supports: [
          "shared three-person credit",
          "software-and-architectural framing",
          "one-to-one to many-to-many interaction rationale"
        ],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
        relationship: "corroborating",
        supports: ["shared maker credit", "software, architectural, real-time, and participatory form"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
        relationship: "corroborating",
        supports: ["visitor interaction with text input and projected output"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The installer is a plan and task inventory, not proof that every listed task was completed exactly as written.",
      "Credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together; the records do not assign individual software, fabrication, design, or production responsibilities.",
      "Drive creation dates establish contemporaneous origin, but July 2026 modifications mean the current documents are not treated as immutable 2011 snapshots.",
      "The project-text document is first-party material, not independent corroboration or proof that it is the final linked press-release PDF.",
      "Underlying Google Drive links, phone numbers, participant messages, and private worksite and hosting details remain protected."
    ],
    antiClaims: [
      "Every installer task was completed exactly as planned",
      "Jamie alone implemented NTER CHNG's software, fabrication, design, or production",
      "The current Google Docs are untouched 2011 snapshots",
      "The protected project-text document is the recovered final press-release PDF",
      "Access to protected records grants publication rights"
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex protected Google Drive review"]
  }
] satisfies ClaimRecord[];

export const nterChngArchiveInquiries = [
  {
    id: "INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY",
    project: "creative-technology-practice",
    question:
      "What original code, diagrams, cleared installation media, collaborator accounts, and press materials would clarify the NTER CHNG division of labor and support a future visual projection?",
    methods: [
      "Recover the original project repository, technical notes, exhibition checklist, press release, and installation diagrams without publishing private working files.",
      "Ask Drew Bolton and Garrett Fuselier to confirm role language and complete collaborator credit.",
      "Review original images and video for authorship, participant consent, caption accuracy, and republication rights before selection.",
      "Keep participant-submitted text and contact details outside the public repository."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Official archived exhibition pages establish inclusion, shared visual-artist credit, installation form, and observed visitor use.",
      "A protected installer plan recovers the project's intended software, hardware, fabrication, network, and gallery-tuning workflow.",
      "A protected project-text document recovers shared credit and the one-to-one to many-to-many interaction rationale."
    ],
    limitations: [
      "The installer records planned work rather than certifying completion or individual responsibility.",
      "The protected documents were modified in July 2026 and are not treated as frozen 2011 revisions.",
      "The linked project-site press-release PDF, original code, diagrams, and cleared installation media remain unrecovered.",
      "Current records do not decompose individual responsibilities or grant media, participant-text, or private-record publication rights."
    ],
    sourceIds: [...nterChngArchiveSourceIds],
    publicSummary:
      "Public exhibition records establish inclusion, shared credit, and observed use. Protected project records add a bounded production-system and interaction-rationale layer; original code, role decomposition, completion records, cleared media, and the final linked press release remain open."
  }
] satisfies ResearchInquiry[];

export const nterChngArchivePublicationDecisions = [
  {
    id: "PUB-NTER-CHNG-AMERICA-NOW-HERE-2011",
    claimId: "CLM-NTER-CHNG-AMERICA-NOW-HERE-2011",
    decision: "reserve",
    audiences: ["creative-technology employers", "media collaborators", "future editors"],
    surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"],
    rationale:
      "The official exhibition record strengthens the portfolio's creative-technology depth, while the current hiring site remains focused on technical project management, product operations, and implementation.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-NTER-CHNG-PRODUCTION-SYSTEM-2011",
    claimId: "CLM-NTER-CHNG-PRODUCTION-SYSTEM-2011",
    decision: "reserve",
    audiences: ["creative-technology employers", "technical operations employers", "future editors"],
    surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"],
    rationale:
      "The production record reveals Jamie's long-running practice at the intersection of software, physical systems, participation, and implementation, but protected first-party records and unresolved role decomposition make the knowledge-bank project note the appropriate current surface.",
    decidedAt: "2026-07-15"
  }
] satisfies PublicationDecision[];
