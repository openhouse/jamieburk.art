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
  "SRC-NERMAN-AMERICA-NOW-HERE-2011"
] as const;

export const nterChngArchiveClaimIds = [
  "CLM-NTER-CHNG-AMERICA-NOW-HERE-2011"
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
      }
    ],
    boundaries: [
      "Credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together; the records do not establish solo authorship or a detailed task split.",
      "The official America: Now and Here pages establish exhibition inclusion and use; the Nerman Museum page supplies context but does not itself name NTER CHNG.",
      "No attendance, unique-participant, reception, adoption, endorsement, or impact claim is attached.",
      "Do not republish archived phone numbers, participant messages, or media without separate permission and review."
    ],
    antiClaims: [
      "Jamie solely created NTER CHNG",
      "The Nerman Museum page names NTER CHNG",
      "The sources establish a quantified audience or exhibition impact",
      "Archived access grants rights to participant messages or media"
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex Wayback review"]
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
    resultStatus: "open",
    findings: [
      "Official archived exhibition pages now establish inclusion, shared visual-artist credit, installation form, and observed visitor use."
    ],
    limitations: [
      "The linked project-site press-release PDF was not recovered in this pass.",
      "Current public records do not decompose individual responsibilities or grant media and participant-text rights."
    ],
    sourceIds: [...nterChngArchiveSourceIds]
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
  }
] satisfies PublicationDecision[];
