import type {
  ClaimRecord,
  IntakeRecord,
  KnowledgeBank,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type NterchngBatch = Pick<
  KnowledgeBank,
  "intakeRecords" | "sources" | "claims" | "researchInquiries"
>;

const intakeRecords = [
  {
    id: "INTAKE-2026-07-15-NTERCHNG-AMERICA-NOW-AND-HERE",
    receivedAt: "2026-07-15",
    kind: "source-url",
    project: "nterchng",
    publicSummary:
      "Archived project and exhibition records document NTER CHNG, a collaborative interactive text-messaging installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier, and its inclusion among the visual artists presented by America: Now and Here Kansas City in 2011.",
    privacy: "public",
    status: "claim-linked",
    sourceIds: [
      "SRC-NTERCHNG-ARCHIVED-PROJECT-SITE-2011",
      "SRC-AMERICA-NOW-AND-HERE-KC-NTERCHNG-2011",
      "SRC-NERMAN-AMERICA-NOW-AND-HERE-2011"
    ],
    claimIds: [
      "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION-2011",
      "CLM-NTERCHNG-AMERICA-NOW-AND-HERE-2011"
    ],
    researchInquiryIds: ["INQ-NTERCHNG-PRODUCTION-AND-EXHIBITION-2011"],
    projectionIntent: "bank-only",
    nextActions: [
      "Seek collaborator confirmation or production records before assigning programming, scenic, motion-graphics, fabrication, or installation responsibilities to any one collaborator.",
      "Recover the original press release, opening date, exhibition placement, and approved installation images if a future public projection needs greater specificity.",
      "Keep participant messages, telephone numbers, and any unreviewed photographs out of the public repository."
    ],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "INTAKE-2026-07-15-NTERCHNG-PRODUCTION-ARTIFACTS",
    receivedAt: "2026-07-15",
    kind: "artifact",
    project: "nterchng",
    publicSummary:
      "Two protected records created in April 2011 add a collaborative installation plan, production-system detail, original exhibition copy, and participant-response material to the NTER CHNG record without exposing personal identifiers or participant messages.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-NTERCHNG-INSTALLER-PLAN-2011",
      "SRC-NTERCHNG-EXHIBITION-PARTICIPANT-NOTES-2011"
    ],
    claimIds: [
      "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION-2011",
      "CLM-NTERCHNG-REINSTALLATION-OPERATIONS-2011"
    ],
    researchInquiryIds: ["INQ-NTERCHNG-PRODUCTION-AND-EXHIBITION-2011"],
    projectionIntent: "bank-only",
    nextActions: [
      "Seek collaborator confirmation or task-level records before assigning any software, fabrication, installation, hosting, hardware, or production workstream to one collaborator.",
      "Reconcile the protected record's January 8-29, 2010 exhibition window with the archived project's undated 'Open until Jan. 24th' language before publishing an exact closing date.",
      "Keep participant messages, telephone numbers, personal scheduling and location details, source-document links, and private collaborator context outside the public repository."
    ],
    protectedLocatorId: "NTERCHNG-PRODUCTION-ARTIFACTS-2011-001",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex Google Drive archival review"]
  }
] satisfies IntakeRecord[];

const sources = [
  {
    id: "SRC-NTERCHNG-INSTALLER-PLAN-2011",
    title: "Protected NTER CHNG America: Now and Here installation plan",
    organization: "NTER CHNG collaborative production archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-13T18:25:12Z",
    accessedAt: "2026-07-15",
    publicCitation:
      "Protected collaborative NTER CHNG installation plan created April 13, 2011.",
    publicNote:
      "The plan documents preparation and installation for an America: Now and Here staging. It names Jamie in the production schedule and spans software revision, hosting, display hardware, networking, architectural fabrication, gallery tuning, and teardown without assigning those workstreams to one collaborator.",
    protectedLocatorId: "NTERCHNG-INSTALLER-PLAN-2011-001",
    supportsGenerally: [
      "Jamie's documented participation in the collaborative 2011 preparation schedule",
      "planned revision of server-side and wall-side software, including message-queue behavior",
      "planned hosting, display computers, projectors, network wiring, wall fabrication and installation, gallery tuning, and teardown",
      "the installation's character as a maintained technical and architectural system rather than a static object"
    ],
    doesNotEstablish: [
      "authorship of the plan or individual responsibility for any listed workstream",
      "that every planned task was completed exactly as written",
      "Jamie's sole technical, production, fabrication, installation, or project-management role",
      "the installation's exact America: Now and Here venue, audience, reception, or impact"
    ]
  },
  {
    id: "SRC-NTERCHNG-EXHIBITION-PARTICIPANT-NOTES-2011",
    title: "Protected NTER CHNG exhibition and participant-response record",
    organization: "NTER CHNG collaborative production archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-06T19:49:17Z",
    accessedAt: "2026-07-15",
    publicCitation:
      "Protected NTER CHNG exhibition and participant-response record created April 6, 2011.",
    publicNote:
      "The record preserves January 2010 exhibition copy and April 2011 participant-response material. Personal identifiers and participant messages are intentionally excluded from the repository.",
    protectedLocatorId: "NTERCHNG-EXHIBITION-NOTES-2011-001",
    supportsGenerally: [
      "collective credit to Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "a stated January 8-29, 2010 exhibition window requiring reconciliation with the archived project's January 24 language",
      "the description of NTER CHNG as equal parts software application and architectural installation",
      "the public many-to-many interaction concept and the collaborators' combined creative-technical disciplines",
      "a 2011 iteration that gathered text responses around America: Now and Here prompts"
    ],
    doesNotEstablish: [
      "a reconciled original closing date",
      "which collaborator supplied each discipline or performed each task",
      "permission to publish participant messages, telephone numbers, or other personal identifiers",
      "representative audience response, attendance, critical reception, or measured impact",
      "independent verification of self-authored artist biography statements"
    ]
  },
  {
    id: "SRC-NTERCHNG-ARCHIVED-PROJECT-SITE-2011",
    title: "NTER CHNG archived project site",
    author: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-01-28T19:33:50Z",
    accessedAt: "2026-07-15",
    archiveUrl:
      "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier, NTER CHNG archived project site, captured January 28, 2011.",
    publicNote:
      "The surviving page identifies the work as an interactive texting installation by the three collaborators and places it at the Arts Incubator Cocoon Gallery in Kansas City. Its displayed 'Open until Jan. 24th' line does not state a year or opening date.",
    supportsGenerally: [
      "the NTER CHNG project title",
      "collective credit to Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "the project's description as an interactive texting installation",
      "a presentation at the Arts Incubator Cocoon Gallery, 115 West 18th Street, Kansas City",
      "the surviving page's 'Open until Jan. 24th' language"
    ],
    doesNotEstablish: [
      "the installation's opening date or the year attached to January 24",
      "the division of programming, design, fabrication, or production labor",
      "attendance, audience response, impact, or later exhibition history",
      "the contents of the linked press release, which was not recovered in this pass"
    ]
  },
  {
    id: "SRC-AMERICA-NOW-AND-HERE-KC-NTERCHNG-2011",
    title:
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier, Visual Artists",
    organization: "America: Now and Here Kansas City",
    author: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-05-18T07:16:26Z",
    accessedAt: "2026-07-15",
    archiveUrl:
      "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
    preferredPublicUrl: "archive",
    publicCitation:
      "America: Now and Here Kansas City, 'Drew Bolton, Jamie Burkart, and Garrett Fuselier, Visual Artists,' archived May 18, 2011.",
    publicNote:
      "The exhibition's own archived site lists the trio under The Visual Artists and publishes their NTER CHNG artist statement. Participant messages and telephone numbers displayed on the archived page are intentionally omitted from this repository.",
    supportsGenerally: [
      "the trio's inclusion among the visual artists presented by America: Now and Here Kansas City",
      "NTER CHNG as an interactive text-messaging experience combining software and architectural installation",
      "a gallery interaction that transformed private one-to-one texting into a public many-to-many exchange",
      "the collaborators' combined backgrounds in scenic design, computer programming, motion graphics, and experiential production"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship or his individual production responsibilities",
      "which collaborator supplied each named discipline",
      "audience size, critical reception, or measured impact",
      "permission to republish participant messages, telephone numbers, or installation media",
      "a presentation of NTER CHNG at the Nerman Museum"
    ]
  },
  {
    id: "SRC-NERMAN-AMERICA-NOW-AND-HERE-2011",
    title: "America: Now and Here - Barbara Kruger",
    organization: "Nerman Museum of Contemporary Art",
    author: "Alice Thorson",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-04-30",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Alice Thorson, 'America: Now and Here - Barbara Kruger,' Nerman Museum of Contemporary Art, April 30, 2011.",
    publicNote:
      "The page documents the broader America: Now and Here Kansas City launch and a May 11-12 Barbara Kruger truck stop at the Nerman Museum. It does not mention NTER CHNG.",
    supportsGenerally: [
      "the broader America: Now and Here Kansas City exhibition context",
      "the project's multidisciplinary public-dialogue purpose",
      "the May 11-12, 2011 Barbara Kruger truck presentation at the Nerman Museum"
    ],
    doesNotEstablish: [
      "NTER CHNG's inclusion in America: Now and Here",
      "a Nerman Museum presentation of NTER CHNG",
      "Jamie's role, the trio's role, or the NTER CHNG production history"
    ]
  }
] satisfies SourceRecord[];

const claims = [
  {
    id: "CLM-NTERCHNG-COLLABORATIVE-INSTALLATION-2011",
    project: "nterchng",
    internalClaim:
      "Jamie Burkart collaborated with Drew Bolton and Garrett Fuselier on NTER CHNG, an interactive text-messaging installation that joined software and gallery architecture to turn private one-to-one texting into a public many-to-many exchange.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie Burkart collaborated with Drew Bolton and Garrett Fuselier on NTER CHNG, an interactive installation that joined software, gallery architecture, and audience text messages in a public group exchange.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NTERCHNG-ARCHIVED-PROJECT-SITE-2011",
        relationship: "direct-support",
        supports: [
          "the title, three collaborators, interactive-texting description, and Cocoon Gallery presentation"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AMERICA-NOW-AND-HERE-KC-NTERCHNG-2011",
        relationship: "direct-support",
        supports: [
          "the artist-statement account of the software, architectural, and many-to-many interaction design"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTERCHNG-EXHIBITION-PARTICIPANT-NOTES-2011",
        relationship: "corroborating",
        supports: [
          "the three-person collaboration and the software, architecture, and public group-exchange concept"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Always preserve equal collaborator credit to Drew Bolton and Garrett Fuselier.",
      "Describe the interdisciplinary design without assigning a discipline or implementation task to an individual collaborator.",
      "Do not derive an opening date or year from the archived project's 'Open until Jan. 24th' line."
    ],
    antiClaims: [
      "Jamie solely created, programmed, designed, fabricated, or produced NTER CHNG",
      "The reviewed sources establish which collaborator performed each production role",
      "The project archive establishes attendance or measured impact"
    ],
    proofClaimIds: ["experimental-media-systems-practice"],
    researchInquiryIds: ["INQ-NTERCHNG-PRODUCTION-AND-EXHIBITION-2011"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-NTERCHNG-REINSTALLATION-OPERATIONS-2011",
    project: "nterchng",
    internalClaim:
      "A protected 2011 production plan names Jamie in NTER CHNG's America: Now and Here installation schedule and documents a collaborative reinstallation spanning server- and wall-side software revision, hosting, display computers, projectors, networking, architectural fabrication, gallery tuning, and teardown.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Jamie participated in preparing NTER CHNG's 2011 reinstallation, a collaborative production spanning software, hosted infrastructure, display hardware, networking, architectural installation, gallery tuning, and teardown.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NTERCHNG-INSTALLER-PLAN-2011",
        relationship: "private-support",
        supports: [
          "Jamie's presence in the production schedule and the breadth of planned software, infrastructure, hardware, fabrication, installation, tuning, and teardown work"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AMERICA-NOW-AND-HERE-KC-NTERCHNG-2011",
        relationship: "context",
        supports: ["the public exhibition context and collaborative project identity"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The source is a collaborative plan and establishes intended workstreams, not completion of every listed task.",
      "Naming Jamie in the schedule supports participation but does not assign him sole or individual responsibility for the workstreams.",
      "Preserve equal project credit to Drew Bolton and Garrett Fuselier."
    ],
    antiClaims: [
      "Jamie individually performed every software, infrastructure, fabrication, installation, and production task",
      "Every task in the installation plan was completed exactly as written",
      "Jamie was NTER CHNG's sole technical lead, producer, fabricator, or project manager"
    ],
    proofClaimIds: ["experimental-media-systems-practice"],
    researchInquiryIds: ["INQ-NTERCHNG-PRODUCTION-AND-EXHIBITION-2011"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex Google Drive archival review"]
  },
  {
    id: "CLM-NTERCHNG-AMERICA-NOW-AND-HERE-2011",
    project: "nterchng",
    internalClaim:
      "America: Now and Here's official Kansas City site listed Drew Bolton, Jamie Burkart, and Garrett Fuselier among its visual artists and published their NTER CHNG artist statement in May 2011.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "America: Now and Here's official Kansas City site included Drew Bolton, Jamie Burkart, and Garrett Fuselier among its visual artists and published their statement for NTER CHNG in 2011.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-AMERICA-NOW-AND-HERE-KC-NTERCHNG-2011",
        relationship: "direct-support",
        supports: [
          "the official exhibition-site listing of the trio as visual artists and publication of the NTER CHNG statement"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NERMAN-AMERICA-NOW-AND-HERE-2011",
        relationship: "context",
        supports: ["the broader Kansas City exhibition and Nerman Museum context"],
        publicNote:
          "Context only: this source does not mention NTER CHNG or place it at the Nerman Museum.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use the archived America: Now and Here artist page, not the Nerman Museum page, as evidence of inclusion.",
      "Do not say NTER CHNG was installed at the Nerman Museum without venue-specific evidence.",
      "Do not infer audience response from the participant messages reproduced on the archived page."
    ],
    antiClaims: [
      "The Nerman Museum page documents NTER CHNG",
      "NTER CHNG was presented at the Nerman Museum",
      "America: Now and Here commissioned NTER CHNG",
      "The exhibition record establishes Jamie's individual production role"
    ],
    proofClaimIds: ["experimental-media-systems-practice"],
    researchInquiryIds: ["INQ-NTERCHNG-PRODUCTION-AND-EXHIBITION-2011"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

const researchInquiries = [
  {
    id: "INQ-NTERCHNG-PRODUCTION-AND-EXHIBITION-2011",
    project: "nterchng",
    question:
      "What production roles, original presentation chronology, exhibition placement, and publishable visual documentation can be established for NTER CHNG?",
    methods: [
      "Close-read the January 28, 2011 Wayback capture of nterchng.com and enumerated the captured site files.",
      "Searched the America: Now and Here Kansas City Wayback corpus and recovered the exhibition's dedicated artist page for Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
      "Compared the project and exhibition archives with the Nerman Museum's live America: Now and Here context page.",
      "Close-read two protected project records created in April 2011 and extracted only public-safe source propositions.",
      "Kept participant messages, telephone numbers, personal scheduling and location details, and source-document links outside the public repository."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The original project archive identifies NTER CHNG as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier at the Arts Incubator Cocoon Gallery.",
      "The official America: Now and Here Kansas City archive lists the trio among its visual artists and publishes their NTER CHNG statement.",
      "The statement describes software and architectural installation working together to convert private one-to-one texting into a public many-to-many gallery exchange.",
      "The Nerman Museum page establishes broader exhibition context but does not mention or locate NTER CHNG.",
      "The protected installer plan names Jamie in the collaborative preparation schedule and documents planned software, hosting, display, networking, fabrication, installation, tuning, and teardown workstreams.",
      "A second protected record states a January 8-29, 2010 exhibition window and preserves 2011 participant-response material; its closing date conflicts with the archived project's undated January 24 language and remains unresolved."
    ],
    limitations: [
      "The reviewed sources do not assign individual production roles among the three collaborators.",
      "The installation plan records intended work and does not establish that every task was completed exactly as written.",
      "The original press release linked by nterchng.com was not recovered in this pass.",
      "The exact original closing date, America: Now and Here placement, attendance, reception, and measured impact remain unresolved.",
      "No installation photograph or participant message has been cleared for public reuse."
    ],
    sourceIds: [
      "SRC-NTERCHNG-ARCHIVED-PROJECT-SITE-2011",
      "SRC-AMERICA-NOW-AND-HERE-KC-NTERCHNG-2011",
      "SRC-NERMAN-AMERICA-NOW-AND-HERE-2011",
      "SRC-NTERCHNG-INSTALLER-PLAN-2011",
      "SRC-NTERCHNG-EXHIBITION-PARTICIPANT-NOTES-2011"
    ],
    publicSummary:
      "Archived project, official exhibition, and protected production records establish NTER CHNG's three collaborators, participatory software-and-installation concept, Cocoon Gallery presentation, America: Now and Here inclusion, and collaborative 2011 reinstallation workstreams; individual task ownership and conflicting original closing dates remain open."
  }
] satisfies ResearchInquiry[];

export const nterchngBatchRecords = {
  intakeRecords,
  sources,
  claims,
  researchInquiries
} satisfies NterchngBatch;
