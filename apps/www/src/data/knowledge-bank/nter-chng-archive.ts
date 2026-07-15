import type { KnowledgeBank } from "./schema.ts";

export const nterChngArchiveIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-NTER-CHNG-ARCHIVE-AND-EXHIBITION",
    receivedAt: "2026-07-15",
    inputKind: "url",
    summary: "A recovered first-party site and two contemporaneous working documents establish NTER CHNG's interactive-texting form, collective credits, and preparation for a May 2011 America: Now and Here installation at Leedy-Voulkos; final installation completion remains to be corroborated.",
    projectIds: ["creative-technology-and-media"],
    researchStatus: "needs-more-research",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
      "SRC-NTER-CHNG-ANH-INSTALLER-2011-04-13",
      "SRC-NTER-CHNG-ANH-WORKING-DOCUMENT-2011-04-06",
      "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
      "SRC-AMERICA-NOW-HERE-NERMAN-2011",
      "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
      "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026"
    ],
    observationIds: [
      "OBS-NTER-CHNG-OFFICIAL-SITE-DESCRIPTION-CREDITS",
      "OBS-NTER-CHNG-ANH-INSTALLATION-PREPARATION",
      "OBS-NTER-CHNG-ANH-PARTICIPATORY-PROMPTS",
      "OBS-NTER-CHNG-JAMIE-PARTICIPATORY-INTENT",
      "OBS-NTER-CHNG-ANH-JAMIE-LOGISTICS",
      "OBS-NTER-CHNG-AMERICA-NOW-HERE-ACCOUNT",
      "OBS-AMERICA-NOW-HERE-KANSAS-CITY-CONTEXT",
      "OBS-AMERICA-NOW-HERE-SMITHSONIAN-SCOPE",
      "OBS-AMERICA-NOW-HERE-WAYBACK-NO-REFERENCE-RECOVERED"
    ],
    claimIds: [
      "CLM-NTER-CHNG-INTERACTIVE-INSTALLATION",
      "CLM-NTER-CHNG-ANH-INSTALLATION-PREPARATION",
      "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"
    ],
    researchInquiryIds: [
      "INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"
    ],
    nextActions: [
      "Seek a final program, installed-view photograph, completion record, press item, organizer archive, or collaborator account confirming that the planned Leedy-Voulkos installation opened to the public.",
      "Review relevant folder-level material in the Smithsonian Archives of American Art collection if access and permissions permit.",
      "Keep completed-exhibition language out of the public website until final-installation evidence is recovered."
    ]
  }
];

export const nterChngArchiveSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
    title: "NTER CHNG",
    organization: "NTER CHNG",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "Wayback capture, January 28, 2011",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://nterchng.com/",
    archiveUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation: "NTER CHNG, archived project site, Wayback Machine capture, January 28, 2011.",
    publicNote: "First-party project surface describing the work as an interactive texting installation and crediting Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
    supportsGenerally: [
      "the project name NTER CHNG",
      "the description 'an interactive txting installation'",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier as the project's three named creators"
    ],
    doesNotEstablish: [
      "the complete division of design, programming, engineering, fabrication, or production labor",
      "Jamie's sole authorship",
      "attendance, message volume, or long-term deployment",
      "inclusion in America: Now and Here"
    ]
  },
  {
    id: "SRC-NTER-CHNG-ANH-INSTALLER-2011-04-13",
    title: "NTER CHNG Installer",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Google document created April 13, 2011; reviewed July 15, 2026",
    publicCitation: "NTER CHNG collaborators, protected America: Now and Here installation-planning document, April 2011; reviewed July 15, 2026.",
    publicNote: "Contemporaneous working plan for staging NTER CHNG for America: Now and Here at Leedy-Voulkos, including fabrication, software, projection, computing, networking, and gallery-installation tasks.",
    supportsGenerally: [
      "preparation for an America: Now and Here installation in May 2011",
      "Leedy-Voulkos as the planned installation venue",
      "software revision, wall fabrication, projection, computer, network, floor-number, and gallery-experience work",
      "Jamie's presence in the preparation and installation schedule"
    ],
    doesNotEstablish: [
      "that every planned task was completed",
      "that the installation opened to the public",
      "that NTER CHNG was exhibited at the Nerman Museum",
      "Jamie's sole authorship or responsibility for every listed task",
      "permission to publish private logistics or collaborator details"
    ],
    protectedLocatorId: "LOC-GDRIVE-NTER-CHNG-INSTALLER-2011-04-13"
  },
  {
    id: "SRC-NTER-CHNG-ANH-WORKING-DOCUMENT-2011-04-06",
    title: "inerchng 2011",
    organization: "NTER CHNG",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Google document created April 6, 2011; reviewed July 15, 2026",
    publicCitation: "NTER CHNG collaborators, protected participatory-content and project-description working document, April 2011; reviewed July 15, 2026.",
    publicNote: "Contemporaneous working document preserving participatory prompts and message traces alongside the project's January 2010 exhibit description and collective credits.",
    supportsGenerally: [
      "open-ended participant prompts about journey, art, and artistic identity",
      "dated April 2011 message traces showing the prompt-and-response interaction in use",
      "the project's software, architectural, and many-to-many public-dialogue concept",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier as collaborators",
      "the project description's attribution to Jamie of an intent to help gallery visitors make connections beyond their existing contacts"
    ],
    doesNotEstablish: [
      "consent to publish participant phone numbers or message text",
      "the identities of message participants",
      "a complete or representative message corpus",
      "that the planned 2011 installation opened to the public",
      "the complete division of labor among collaborators"
    ],
    protectedLocatorId: "LOC-GDRIVE-NTER-CHNG-WORKING-DOCUMENT-2011-04-06"
  },
  {
    id: "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
    title: "Jamie Burkart account of NTER CHNG's later exhibition context",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Received July 15, 2026",
    publicCitation: "Jamie Burkart, first-person clarification to the portfolio archive, July 15, 2026.",
    publicNote: "Jamie recalls that NTER CHNG was later included in America: Now and Here's 2011 Kansas City program.",
    supportsGenerally: [
      "Jamie's first-person recollection of the exhibition connection",
      "a research lead connecting NTER CHNG with America: Now and Here"
    ],
    doesNotEstablish: [
      "independent confirmation of the exhibition listing",
      "the venue, date, installation configuration, or program section",
      "that NTER CHNG was exhibited at the Nerman Museum",
      "the complete participating-artist roster"
    ],
    protectedLocatorId: "LOC-CONVERSATION-NTER-CHNG-2026-07-15"
  },
  {
    id: "SRC-AMERICA-NOW-HERE-NERMAN-2011",
    title: "America: Now and Here - Barbara Kruger",
    organization: "Nerman Museum of Contemporary Art",
    author: "Alice Thorson",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-04-30",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Alice Thorson, 'America: Now and Here - Barbara Kruger,' Nerman Museum of Contemporary Art, April 30, 2011.",
    publicNote: "Nerman Museum page preserving contemporaneous reporting about the Kansas City launch and the museum's Barbara Kruger truck stop.",
    supportsGenerally: [
      "America: Now and Here launched its national program in Kansas City in May 2011",
      "the Kansas City program joined local and national artists across multiple disciplines",
      "the Barbara Kruger project visited the Nerman Museum on May 11 and 12, 2011"
    ],
    doesNotEstablish: [
      "NTER CHNG's inclusion in the program",
      "Jamie's participation",
      "that NTER CHNG was installed at the Nerman Museum",
      "the complete Kansas City artist or project roster"
    ]
  },
  {
    id: "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
    title: "America: Now and Here records, circa 2008-2012",
    organization: "Smithsonian Archives of American Art",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2014-05-12",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.aaa.si.edu/collections/america-now-and-here-records-16039",
    assetUrl: "https://sirismm.si.edu/EADpdfs/AAA.amernowh.pdf",
    preferredPublicUrl: "canonical",
    publicCitation: "Smithsonian Archives of American Art, 'America: Now and Here records, circa 2008-2012,' collection summary and finding aid.",
    publicNote: "Institutional archive description establishing the national program, its Kansas City emphasis, multidisciplinary scope, and surviving record categories.",
    supportsGenerally: [
      "America: Now and Here was a traveling arts program founded by Eric Fischl and directed by Dorothy Dunn",
      "much of the collection concerns the May 2011 Kansas City program",
      "the program involved more than 150 artists across visual art, plays, movies, music, poetry, and interactive exercises"
    ],
    doesNotEstablish: [
      "NTER CHNG's inclusion",
      "Jamie's participation",
      "the complete contents of folder-level or audiovisual records",
      "a project-specific venue, date, or installation record"
    ]
  },
  {
    id: "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026",
    title: "AmericaNowAndHere.org Wayback capture review",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "Research run completed July 15, 2026",
    accessedAt: "2026-07-15",
    archiveUrl: "https://web.archive.org/web/2011/http://americanowandhere.org/",
    preferredPublicUrl: "archive",
    publicCitation: "Codex archival review of 205 recoverable 2011 HTML pages from AmericanNowAndHere.org in the Wayback Machine, July 15, 2026.",
    publicNote: "Reproducible exact-term review of the recoverable official-site HTML corpus; no NTER CHNG or collaborator-name reference was recovered.",
    supportsGenerally: [
      "the official project domain AmericanNowAndHere.org is preserved by the Wayback Machine",
      "205 normalized, recoverable 2011 HTML pages were replayed and searched",
      "no exact match was recovered for NTER CHNG, NTR CHNG, NTERCHNG, Jamie Burkart, Drew Bolton, or Garrett Fuselier"
    ],
    doesNotEstablish: [
      "that NTER CHNG was absent from America: Now and Here",
      "that every 2011 page or asset was captured or replayable",
      "that non-HTML, image-based, private, or uncaptured program records contain no reference",
      "a complete participating-artist or project roster"
    ]
  }
];

export const nterChngArchiveObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-NTER-CHNG-OFFICIAL-SITE-DESCRIPTION-CREDITS",
    sourceId: "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
    project: "creative-technology-and-media",
    text: "The recovered first-party site describes NTER CHNG as 'an interactive txting installation' and names Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
    locator: "Page title, meta description, project description, and creator-credit line",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NTER-CHNG-INTERACTIVE-INSTALLATION"],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Wayback source review"]
  },
  {
    id: "OBS-NTER-CHNG-ANH-INSTALLATION-PREPARATION",
    sourceId: "SRC-NTER-CHNG-ANH-INSTALLER-2011-04-13",
    project: "creative-technology-and-media",
    text: "A contemporaneous plan labels the work 'Staging of install for ANH, May 2011,' specifies installation at Leedy-Voulkos starting April 22, and records software, wall, projection, computer, network, floor-number, and gallery-experience work.",
    locator: "Title, staging heading, software-change list, preparation schedule, and Leedy-Voulkos installation checklist",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-NTER-CHNG-INTERACTIVE-INSTALLATION",
      "CLM-NTER-CHNG-ANH-INSTALLATION-PREPARATION",
      "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-NTER-CHNG-ANH-PARTICIPATORY-PROMPTS",
    sourceId: "SRC-NTER-CHNG-ANH-WORKING-DOCUMENT-2011-04-06",
    project: "creative-technology-and-media",
    text: "An April 2011 working document preserves open-ended prompts about an American journey, first encounters with art, and artistic identity, with timestamped response traces; its project description frames NTER CHNG as a software-and-architectural environment that turns one-to-one texting into many-to-many public dialogue.",
    locator: "April 5-6 prompt-and-response sections and January 2010 exhibit information",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-NTER-CHNG-INTERACTIVE-INSTALLATION",
      "CLM-NTER-CHNG-ANH-INSTALLATION-PREPARATION"
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-NTER-CHNG-ANH-JAMIE-LOGISTICS",
    sourceId: "SRC-NTER-CHNG-ANH-INSTALLER-2011-04-13",
    project: "creative-technology-and-media",
    text: "The installation schedule records Jamie arriving April 20, preparation in Jamie's mother's garage, an installation period beginning April 22, and a planned interview with all three collaborators and the wall before Jamie's May 5 departure.",
    locator: "Preparation, installation, and post-install schedule",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NTER-CHNG-ANH-INSTALLATION-PREPARATION"],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-NTER-CHNG-JAMIE-PARTICIPATORY-INTENT",
    sourceId: "SRC-NTER-CHNG-ANH-WORKING-DOCUMENT-2011-04-06",
    project: "creative-technology-and-media",
    text: "The preserved project description attributes to Jamie an intention to help gallery visitors make new connections by reaching beyond their existing address books and buddy lists.",
    locator: "January 2010 exhibit information, quotation attributed to Jamie Burkart",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-NTER-CHNG-INTERACTIVE-INSTALLATION",
      "CLM-NTER-CHNG-ANH-INSTALLATION-PREPARATION"
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-NTER-CHNG-AMERICA-NOW-HERE-ACCOUNT",
    sourceId: "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
    project: "creative-technology-and-media",
    text: "Jamie recalls that NTER CHNG was later included in America: Now and Here's 2011 Kansas City program.",
    locator: "First-person portfolio-archive clarification, July 15, 2026",
    status: "provisional",
    confidence: "moderate",
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex intake review"]
  },
  {
    id: "OBS-AMERICA-NOW-HERE-KANSAS-CITY-CONTEXT",
    sourceId: "SRC-AMERICA-NOW-HERE-NERMAN-2011",
    project: "creative-technology-and-media",
    text: "The Nerman Museum page preserves contemporaneous reporting that America: Now and Here launched in Kansas City in May 2011 as a multidisciplinary program joining local and national artists; its Nerman-specific event was Barbara Kruger's truck project.",
    locator: "Opening program description and Nerman Museum event details",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex institutional-source review"]
  },
  {
    id: "OBS-AMERICA-NOW-HERE-SMITHSONIAN-SCOPE",
    sourceId: "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
    project: "creative-technology-and-media",
    text: "The Smithsonian finding aid describes America: Now and Here as a traveling, multidisciplinary arts program involving more than 150 artists and says much of its surviving archive concerns the May 2011 Kansas City program.",
    locator: "Collection summary, scope and contents, and biographical note",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex institutional-source and finding-aid review"]
  },
  {
    id: "OBS-AMERICA-NOW-HERE-WAYBACK-NO-REFERENCE-RECOVERED",
    sourceId: "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026",
    project: "creative-technology-and-media",
    text: "An exact-term scan of 205 recoverable 2011 HTML pages from the official America: Now and Here domain recovered no reference to NTER CHNG or its three named designers.",
    locator: "Normalized 2011 HTML corpus; six project and collaborator search terms",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex reproducible Wayback corpus review"]
  }
];

export const nterChngArchiveClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-NTER-CHNG-ANH-INSTALLATION-PREPARATION",
    project: "creative-technology-and-media",
    internalClaim: "Contemporaneous first-party records show NTER CHNG's collaborators preparing a May 2011 America: Now and Here installation at Leedy-Voulkos, including software revision, wall fabrication, projection, computing, networking, floor-number, and gallery-experience work; the recovered records document staging and planned installation, not final completion.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "In April 2011, NTER CHNG's collaborators prepared the interactive installation for a May America: Now and Here presentation at Leedy-Voulkos, revisiting its software and rebuilding its physical, projection, and computing systems.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/creative-technology-and-media"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NTER-CHNG-ANH-INSTALLER-2011-04-13",
        relationship: "direct-support",
        supports: [
          "America: Now and Here installation preparation",
          "May 2011 timing",
          "Leedy-Voulkos venue plan",
          "software, fabrication, projection, computing, networking, and gallery-installation work",
          "Jamie's scheduled participation"
        ],
        locator: "Staging, preparation, installation, and post-install sections",
        publicNote: "Contemporaneous installation-planning record.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-ANH-WORKING-DOCUMENT-2011-04-06",
        relationship: "corroborating",
        supports: [
          "April 2011 project activity",
          "participant prompts",
          "message-response traces",
          "software-and-architectural interaction concept"
        ],
        locator: "April 5-6 prompts and January 2010 exhibit information",
        publicNote: "Contemporaneous participatory-content working record.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use 'prepared' or 'staged for installation'; the recovered records do not establish that the installation opened to the public.",
      "Do not infer that NTER CHNG was shown at the Nerman Museum; the plan names Leedy-Voulkos.",
      "Preserve collective credit and do not assign every task in the shared plan to Jamie.",
      "Do not expose participant phone numbers, message text, or private logistics from the working documents."
    ],
    antiClaims: [
      "The recovered documents prove that the America: Now and Here installation was completed.",
      "NTER CHNG was exhibited at the Nerman Museum.",
      "Jamie solely designed, programmed, fabricated, and installed NTER CHNG.",
      "The archived participant messages are cleared for publication."
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
    project: "creative-technology-and-media",
    internalClaim: "Jamie recalls that NTER CHNG was included in America: Now and Here's 2011 Kansas City program. A contemporaneous project plan now directly establishes preparation for an ANH installation at Leedy-Voulkos, while final completion or public presentation remains to be corroborated.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "A contemporaneous project plan documents preparation for an America: Now and Here installation at Leedy-Voulkos; final completion or public presentation remains to be corroborated.",
        status: "hold",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/creative-technology-and-media"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NTER-CHNG-ANH-INSTALLER-2011-04-13",
        relationship: "direct-support",
        supports: ["project-specific ANH installation preparation", "May 2011 timing", "planned Leedy-Voulkos venue"],
        locator: "Staging and installation headings",
        publicNote: "Contemporaneous installation-planning record.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-ANH-WORKING-DOCUMENT-2011-04-06",
        relationship: "corroborating",
        supports: ["April 2011 project activity", "America-themed participatory prompt", "collective project description"],
        locator: "April 5-6 prompts and January 2010 exhibit information",
        publicNote: "Contemporaneous participatory-content working record.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
        relationship: "private-support",
        supports: ["Jamie's first-person recollection of the exhibition connection"],
        locator: "First-person clarification, July 15, 2026",
        publicNote: "First-person account retained as a research lead.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
        relationship: "supports-boundary",
        supports: ["project identity", "project description", "collective creator credits", "no exhibition claim on the recovered page"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AMERICA-NOW-HERE-NERMAN-2011",
        relationship: "context",
        supports: ["Kansas City launch context", "multidisciplinary local-and-national program", "Nerman-specific Barbara Kruger event"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
        relationship: "context",
        supports: ["program scope", "May 2011 Kansas City archive", "surviving record categories"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026",
        relationship: "supports-boundary",
        supports: ["no exact project or collaborator-name reference recovered from 205 replayable 2011 official-site HTML pages"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The contemporaneous project record establishes preparation for an ANH installation, not completion or public presentation.",
      "The Nerman Museum page establishes program context and a Barbara Kruger event, not an NTER CHNG presentation at the museum.",
      "A failed exact-term recovery is not evidence that the project was absent from the program.",
      "Keep this claim out of active website surfaces while the inclusion record remains unrecovered."
    ],
    antiClaims: [
      "NTER CHNG was exhibited at the Nerman Museum.",
      "The recovered installation plan proves the work opened to the public.",
      "The recovered America: Now and Here website lists NTER CHNG.",
      "The Smithsonian finding aid identifies NTER CHNG.",
      "The Wayback review proves NTER CHNG was not included in America: Now and Here."
    ],
    researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
];

export const nterChngArchiveResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026",
    project: "creative-technology-and-media",
    question: "What final record establishes that NTER CHNG's planned May 2011 America: Now and Here installation at Leedy-Voulkos was completed and presented to the public?",
    methods: [
      "Recover and review the first-party NTER CHNG site and its creator credits.",
      "Review the two surfaced April 2011 Google Docs as protected, contemporaneous working records while withholding participant phone numbers, message text, and private logistics.",
      "Review the Nerman Museum page and Smithsonian Archives of American Art collection description and finding aid for institutional program context.",
      "Enumerate distinct 2011 HTML captures from AmericanNowAndHere.org, replay every recoverable normalized page, and search exact project-name variants and collaborator names.",
      "Preserve 'not recovered' separately from 'did not exist' and route future program, image, organizer, and collaborator evidence back to this inquiry."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The NTER CHNG site was recovered and independently confirms the project's description and three named creators.",
      "A project-specific document created April 13, 2011 labels the work 'Staging of install for ANH, May 2011,' specifies Leedy-Voulkos, and records software, fabrication, projection, computing, networking, and gallery-installation preparation.",
      "A second project document created April 6, 2011 preserves America-themed and art-focused participatory prompts, dated response traces, and the project's software-and-architectural description.",
      "The Nerman Museum and Smithsonian records confirm America: Now and Here's May 2011 Kansas City context and multidisciplinary scope.",
      "The official exhibition domain AmericanNowAndHere.org was identified and its 2011 Wayback captures were enumerated.",
      "No exact project-name or collaborator-name reference was recovered from 205 replayable 2011 official-site HTML pages."
    ],
    limitations: [
      "Wayback capture and replay coverage is incomplete by design.",
      "Non-HTML, image-based, private, or uncaptured records may contain project-specific evidence.",
      "The public Smithsonian finding aid describes most materials at folder or series level and does not expose every document's contents.",
      "The recovered documents are working plans rather than a final program, installed-view photograph, completion record, press item, organizer record, or collaborator confirmation."
    ],
    sourceIds: [
      "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
      "SRC-NTER-CHNG-ANH-INSTALLER-2011-04-13",
      "SRC-NTER-CHNG-ANH-WORKING-DOCUMENT-2011-04-06",
      "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
      "SRC-AMERICA-NOW-HERE-NERMAN-2011",
      "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
      "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026"
    ],
    publicSummary: "Contemporaneous project records now establish that NTER CHNG was prepared for a May 2011 America: Now and Here installation at Leedy-Voulkos. A final record confirming completion and public presentation remains to be found."
  }
];
