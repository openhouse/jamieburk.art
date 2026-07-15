import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const nterChngAmericaNowHereEntities = [
  {
    id: "ENT-AMERICA-NOW-AND-HERE",
    kind: "program",
    label: "America: Now and Here",
    publicSafeSummary:
      "A multidisciplinary traveling arts program that launched in Kansas City in 2011 and used art to invite public dialogue about America.",
    aliases: ["America Now and Here", "ANH"],
    relatedEntityIds: ["ENT-NTER-CHNG"],
    status: "historical"
  }
] satisfies EntityRecord[];

export const nterChngAmericaNowHereIntake = [
  {
    id: "INTAKE-NTER-CHNG-PROJECT-WAYBACK-2011",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary:
      "January 2011 Wayback capture of the NTER CHNG project site identifying the interactive texting installation, its three makers, and its original Kansas City gallery venue.",
    submittedBy: "Jamie Burkart",
    sourceUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    entityIds: ["ENT-NTER-CHNG"],
    disposition: "source-created",
    sourceIds: ["SRC-NTER-CHNG-PROJECT-WAYBACK-2011"],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-ANH-KC-ABOUT-WAYBACK-2011",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary:
      "Official archived America: Now and Here Kansas City program description establishing its 2011 launch context, public-dialogue purpose, and cross-disciplinary format.",
    submittedBy: "Codex Wayback research",
    sourceUrl:
      "https://web.archive.org/web/20110503025503/http://kansascity.americanowandhere.org/about-anh-kc/",
    entityIds: ["ENT-AMERICA-NOW-AND-HERE", "ENT-NTER-CHNG"],
    disposition: "source-created",
    sourceIds: ["SRC-ANH-KC-ABOUT-WAYBACK-2011"],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary:
      "Official archived America: Now and Here Kansas City visual-artist page for Drew Bolton, Jamie Burkart, and Garrett Fuselier, including the NTER CHNG artist statement.",
    submittedBy: "Codex Wayback research",
    sourceUrl:
      "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
    entityIds: ["ENT-AMERICA-NOW-AND-HERE", "ENT-NTER-CHNG"],
    disposition: "source-created",
    sourceIds: ["SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011"],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NERMAN-AMERICA-NOW-HERE-2011",
    receivedAt: "2026-07-15",
    kind: "public-url",
    publicSafeSummary:
      "Nerman Museum institutional record contextualizing the May 2011 Kansas City launch of America: Now and Here and the museum's Barbara Kruger truck presentation.",
    submittedBy: "Jamie Burkart",
    sourceUrl:
      "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    entityIds: ["ENT-AMERICA-NOW-AND-HERE", "ENT-NTER-CHNG"],
    disposition: "source-created",
    sourceIds: ["SRC-NERMAN-AMERICA-NOW-HERE-2011"],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const nterChngAmericaNowHereSources = [
  {
    id: "SRC-NTER-CHNG-PROJECT-WAYBACK-2011",
    title: "NTER CHNG project site",
    author: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-01-28T19:33:50Z",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://nterchng.com/",
    archiveUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier, 'NTER CHNG,' archived project site, captured January 28, 2011.",
    publicNote:
      "The capture identifies NTER CHNG as an interactive texting installation by the three makers and records its Arts Incubator Cocoon Gallery presentation. The page does not print a year for the exhibition notice.",
    intakeIds: ["INTAKE-NTER-CHNG-PROJECT-WAYBACK-2011"],
    supportsGenerally: [
      "the NTER CHNG project identity and domain",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier as the three makers",
      "interactive texting installation wording",
      "Arts Incubator Cocoon Gallery as the original listed venue"
    ],
    doesNotEstablish: [
      "the year of the undated exhibition notice",
      "the division of technical labor among the makers",
      "inclusion in America: Now and Here",
      "audience size or measured impact"
    ]
  },
  {
    id: "SRC-ANH-KC-ABOUT-WAYBACK-2011",
    title: "About America: Now and Here, Kansas City",
    organization: "America: Now and Here",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-05-03T02:55:03Z",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://kansascity.americanowandhere.org/about-anh-kc/",
    archiveUrl:
      "https://web.archive.org/web/20110503025503/http://kansascity.americanowandhere.org/about-anh-kc/",
    preferredPublicUrl: "archive",
    publicCitation:
      "America: Now and Here, 'About America: Now and Here, Kansas City,' archived May 3, 2011.",
    publicNote:
      "The program's own site describes Kansas City as the first America: Now and Here installation and frames the cross-disciplinary program as public dialogue through art.",
    intakeIds: ["INTAKE-ANH-KC-ABOUT-WAYBACK-2011"],
    supportsGenerally: [
      "Kansas City as the program's first installation",
      "public dialogue through art as the program purpose",
      "visual art, poetry, music, theater, and film as the program format",
      "audience participation as an explicit program aim"
    ],
    doesNotEstablish: [
      "NTER CHNG's inclusion by itself",
      "the exact venue or dates of NTER CHNG within the program",
      "Jamie's individual role",
      "audience or impact measurements"
    ]
  },
  {
    id: "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
    title: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    organization: "America: Now and Here Kansas City",
    author: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-05-18T07:16:26Z",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
    archiveUrl:
      "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
    preferredPublicUrl: "archive",
    publicCitation:
      "America: Now and Here Kansas City, 'Drew Bolton, Jamie Burkart, and Garrett Fuselier,' archived visual-artist page, May 18, 2011.",
    publicNote:
      "The program's official artist page identifies the three collaborators as visual artists and publishes their NTER CHNG artist statement. Historical phone numbers and visitor-response excerpts visible in the capture are intentionally not reproduced in the knowledge bank.",
    intakeIds: ["INTAKE-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011"],
    supportsGenerally: [
      "NTER CHNG's inclusion in the America: Now and Here Kansas City artist roster",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier as the named visual artists",
      "the work's participatory text-messaging behavior and artistic purpose",
      "the collaborators' combined scenic-design, programming, motion-graphics, and experiential-production backgrounds"
    ],
    doesNotEstablish: [
      "sole authorship by Jamie",
      "which collaborator performed each technical task",
      "the exact NTER CHNG installation venue or dates within America: Now and Here",
      "that NTER CHNG was presented at the Nerman Museum",
      "audience size or measured impact"
    ]
  },
  {
    id: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
    title: "America: Now and Here - Barbara Kruger",
    author: "Alice Thorson",
    organization: "Nerman Museum of Contemporary Art / The Kansas City Star",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2011-04-30",
    accessedAt: "2026-07-15",
    canonicalUrl:
      "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Alice Thorson, 'America: Now and Here - Barbara Kruger,' The Kansas City Star, republished by the Nerman Museum of Contemporary Art, April 30, 2011.",
    publicNote:
      "The museum record contextualizes the Kansas City launch and its May 11-12 Barbara Kruger truck presentation. It does not name NTER CHNG or place that work at the Nerman Museum.",
    intakeIds: ["INTAKE-NERMAN-AMERICA-NOW-HERE-2011"],
    supportsGenerally: [
      "America: Now and Here's May 2011 Kansas City launch context",
      "the program's multidisciplinary and public-dialogue purpose",
      "a visual-arts exhibition combining Kansas City and national artists",
      "the Nerman Museum's May 11-12 Barbara Kruger truck presentation"
    ],
    doesNotEstablish: [
      "NTER CHNG's inclusion by itself",
      "NTER CHNG's presentation at the Nerman Museum",
      "Jamie as an America: Now and Here organizer",
      "the exact NTER CHNG installation venue or dates within the program"
    ]
  }
] satisfies SourceRecord[];

export const nterChngAmericaNowHereReadings = [
  {
    id: "READ-NTER-CHNG-PROJECT-WAYBACK-2011",
    sourceId: "SRC-NTER-CHNG-PROJECT-WAYBACK-2011",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      {
        id: "PROP-NTER-CHNG-PROJECT-SITE-THREE-MAKERS",
        text: "The archived NTER CHNG homepage identifies the work as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-project-site-three-makers"],
        confidence: "high",
        locator: "Page title, description metadata, and visible project credit"
      },
      {
        id: "PROP-NTER-CHNG-PROJECT-SITE-ORIGINAL-VENUE",
        text: "The archived homepage lists the Arts Incubator Cocoon Gallery in Kansas City as the installation venue.",
        relationToJamie: "project-context",
        supportTags: ["nter-chng-project-site-original-venue"],
        confidence: "high",
        locator: "Visible venue line"
      }
    ],
    limitations: [
      "The capture is dated January 2011, but the page's exhibition notice does not print a year.",
      "The page does not divide technical responsibilities among the three makers.",
      "The source does not establish later inclusion in America: Now and Here by itself."
    ],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"]
  },
  {
    id: "READ-ANH-KC-ABOUT-WAYBACK-2011",
    sourceId: "SRC-ANH-KC-ABOUT-WAYBACK-2011",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      {
        id: "PROP-ANH-KC-FIRST-INSTALLATION",
        text: "America: Now and Here's official Kansas City site described Kansas City as the first installation in the program's planned national journey.",
        relationToJamie: "project-context",
        supportTags: ["anh-kc-first-installation-context"],
        confidence: "high",
        locator: "Launching a Great American Journey in Kansas City section"
      },
      {
        id: "PROP-ANH-KC-DIALOGUE-PURPOSE",
        text: "The program described its purpose as bringing people together for respectful conversation about America through shared experiences of art.",
        relationToJamie: "project-context",
        supportTags: ["anh-kc-public-dialogue-purpose"],
        confidence: "high",
        locator: "Program purpose and mission sections"
      },
      {
        id: "PROP-ANH-KC-CROSS-DISCIPLINARY-FORMAT",
        text: "The archived site describes a cross-disciplinary program spanning visual art, poetry, music, theater, and film with audience participation as an explicit aim.",
        relationToJamie: "project-context",
        supportTags: ["anh-kc-cross-disciplinary-participatory-format"],
        confidence: "high",
        locator: "Program format and participation sections"
      }
    ],
    limitations: [
      "The about page does not name NTER CHNG or Jamie.",
      "Program aspirations do not establish measured audience participation or civic impact.",
      "The page does not identify the venue or dates of NTER CHNG's participation."
    ],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"]
  },
  {
    id: "READ-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
    sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      {
        id: "PROP-NTER-CHNG-ANH-OFFICIAL-ARTIST-ROSTER",
        text: "America: Now and Here's official Kansas City site lists Drew Bolton, Jamie Burkart, and Garrett Fuselier together as visual artists and gives them a dedicated artist page.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-anh-official-artist-roster"],
        confidence: "high",
        locator: "Page title, visual-artist heading, and site hierarchy"
      },
      {
        id: "PROP-NTER-CHNG-ANH-ARTIST-STATEMENT",
        text: "The official page publishes the collaborators' NTER CHNG artist statement, describing an interactive text-messaging experience that turned private one-to-one exchange into public many-to-many participation through a digital gallery wall.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-anh-artist-statement"],
        confidence: "high",
        locator: "Artist's Statement section"
      },
      {
        id: "PROP-NTER-CHNG-ANH-COLLABORATIVE-BACKGROUNDS",
        text: "The artist statement describes the three makers as combining backgrounds in scenic design, computer programming, motion graphics, and experiential production.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-anh-combined-practice-backgrounds"],
        confidence: "high",
        locator: "Final artist-statement paragraph"
      },
      {
        id: "PROP-NTER-CHNG-ANH-INCLUSION",
        text: "The dedicated page within the official 2011 Kansas City visual-artist roster directly supports NTER CHNG's inclusion in America: Now and Here's Kansas City launch program.",
        relationToJamie: "outcome-context",
        supportTags: ["nter-chng-anh-2011-inclusion"],
        confidence: "high",
        locator: "Official program domain, visual-artist hierarchy, and NTER CHNG statement"
      }
    ],
    limitations: [
      "The page establishes collective inclusion and credit, not sole authorship or a detailed technical division of labor.",
      "The page does not state NTER CHNG's exact venue or installation dates within the program.",
      "The source does not place NTER CHNG at the Nerman Museum.",
      "Historical phone numbers and visitor-response excerpts are omitted from the repository."
    ],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"]
  },
  {
    id: "READ-NERMAN-AMERICA-NOW-HERE-2011",
    sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      {
        id: "PROP-NERMAN-ANH-KC-LAUNCH-CONTEXT",
        text: "The Nerman Museum record describes America: Now and Here as a May 2011 Kansas City launch joining national and Kansas City artists across multiple disciplines.",
        relationToJamie: "project-context",
        supportTags: ["anh-kc-2011-institutional-context"],
        confidence: "high",
        locator: "Kansas City Star article republished on the exhibition page"
      },
      {
        id: "PROP-NERMAN-ANH-BARBARA-KRUGER-COMPONENT",
        text: "The museum's own event record concerns a Barbara Kruger truck presented at the Nerman Museum on May 11 and 12, 2011.",
        relationToJamie: "limitation",
        supportTags: ["anh-nerman-barbara-kruger-component-boundary"],
        confidence: "high",
        locator: "Event title, article, dates, and location"
      }
    ],
    limitations: [
      "The Nerman page does not name NTER CHNG, Jamie, Drew Bolton, or Garrett Fuselier.",
      "It must not be used to claim that NTER CHNG was installed at the Nerman Museum.",
      "Its program-scale descriptions contextualize the launch but do not establish NTER CHNG's exact presentation details."
    ],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY"]
  }
] satisfies SourceReading[];

export const nterChngAmericaNowHereClaims = [
  {
    id: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
    project: "nter-chng",
    internalClaim:
      "America: Now and Here included NTER CHNG in its 2011 Kansas City launch; the program's own archived site listed Drew Bolton, Jamie Burkart, and Garrett Fuselier as visual artists and published their artist statement for the participatory texting installation.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [
      "INTAKE-NTER-CHNG-PROJECT-WAYBACK-2011",
      "INTAKE-ANH-KC-ABOUT-WAYBACK-2011",
      "INTAKE-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
      "INTAKE-NERMAN-AMERICA-NOW-HERE-2011"
    ],
    requiredSupportTags: [
      "nter-chng-project-site-three-makers",
      "anh-kc-public-dialogue-purpose",
      "nter-chng-anh-official-artist-roster",
      "nter-chng-anh-artist-statement",
      "nter-chng-anh-2011-inclusion",
      "anh-kc-2011-institutional-context",
      "anh-nerman-barbara-kruger-component-boundary"
    ],
    composition: {
      action:
        "Co-created a participatory installation that combined software, a constructed gallery interface, and visitors' own phones.",
      intendedEnd:
        "Turn text messaging from a private one-to-one exchange into a public many-to-many encounter in which strangers could contribute to a shared dialogue.",
      usableResult:
        "NTER CHNG was included in the 2011 Kansas City launch of America: Now and Here, whose official site listed the three collaborators as visual artists and published their artist statement.",
      audience:
        "Gallery visitors and America: Now and Here audiences invited to participate in public dialogue through art.",
      collectiveCredit:
        "Credit Drew Bolton, Jamie Burkart, and Garrett Fuselier as the three makers; preserve the separate project record's credits to Mary Nichols, Megan Mantia, and Elisha Stetson.",
      causalBoundary:
        "The recovered sources establish collaborative inclusion, credit, and artistic purpose, not sole authorship, the exact technical split, a Nerman Museum installation, audience scale, or measured impact."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
        relationship: "direct-support",
        supports: [
          "official visual-artist roster inclusion",
          "three named collaborators",
          "NTER CHNG artist statement",
          "participatory purpose and combined practices"
        ],
        propositionIds: [
          "PROP-NTER-CHNG-ANH-OFFICIAL-ARTIST-ROSTER",
          "PROP-NTER-CHNG-ANH-ARTIST-STATEMENT",
          "PROP-NTER-CHNG-ANH-COLLABORATIVE-BACKGROUNDS",
          "PROP-NTER-CHNG-ANH-INCLUSION"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-PROJECT-WAYBACK-2011",
        relationship: "corroborating",
        supports: ["project identity", "three collaborative makers", "interactive texting installation"],
        propositionIds: ["PROP-NTER-CHNG-PROJECT-SITE-THREE-MAKERS"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-ANH-KC-ABOUT-WAYBACK-2011",
        relationship: "context",
        supports: ["Kansas City launch context", "public-dialogue purpose", "cross-disciplinary format"],
        propositionIds: [
          "PROP-ANH-KC-FIRST-INSTALLATION",
          "PROP-ANH-KC-DIALOGUE-PURPOSE",
          "PROP-ANH-KC-CROSS-DISCIPLINARY-FORMAT"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
        relationship: "supports-boundary",
        supports: ["May 2011 institutional context", "Nerman presentation limited to the Barbara Kruger component"],
        propositionIds: [
          "PROP-NERMAN-ANH-KC-LAUNCH-CONTEXT",
          "PROP-NERMAN-ANH-BARBARA-KRUGER-COMPONENT"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use included in the 2011 Kansas City launch or listed in its official visual-artist roster.",
      "Credit all three makers and preserve the supporting collaborator credits in the linked project record.",
      "Do not say NTER CHNG was installed at the Nerman Museum without a separate installation-specific source.",
      "Do not publish historical phone numbers or visitor-response excerpts from the archived artist page."
    ],
    antiClaims: [
      "Jamie alone created NTER CHNG.",
      "Jamie was an organizer or curator of America: Now and Here.",
      "NTER CHNG was presented at the Nerman Museum.",
      "The Nerman Museum page names or documents NTER CHNG.",
      "The recovered artist page establishes the exact technical division of labor.",
      "Inclusion establishes audience size, critical reception, or measured civic impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Wayback and public-source review"]
  }
] satisfies ClaimRecord[];

export const nterChngAmericaNowHereResearchTasks = [
  {
    id: "TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY",
    project: "nter-chng",
    question:
      "Can a formal America: Now and Here checklist, catalog, schedule, installation view, or venue record establish NTER CHNG's exact presentation location and dates within the 2011 Kansas City launch?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-15",
    intakeIds: [
      "INTAKE-NTER-CHNG-PROJECT-WAYBACK-2011",
      "INTAKE-ANH-KC-ABOUT-WAYBACK-2011",
      "INTAKE-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
      "INTAKE-NERMAN-AMERICA-NOW-HERE-2011"
    ],
    sourceIds: [
      "SRC-NTER-CHNG-PROJECT-WAYBACK-2011",
      "SRC-ANH-KC-ABOUT-WAYBACK-2011",
      "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
      "SRC-NERMAN-AMERICA-NOW-HERE-2011"
    ],
    claimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"],
    nextActions: [
      "Search the archived Kansas City calendar, artist index, uploads, and linked national site for NTER CHNG-specific venue or date language.",
      "Review the Smithsonian Archives of American Art finding aid and request the relevant America: Now and Here Kansas City checklist or digital-program material if needed.",
      "Search collaborator archives for a dated installation view, program, or correspondence that can be described publicly without exposing private contact information.",
      "Keep the current inclusion claim; add venue or date detail only when an installation-specific source supports it."
    ]
  }
] satisfies ResearchTask[];

export const nterChngAmericaNowHereDecisions = [
  {
    id: "DEC-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-DEFER",
    claimId: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale:
      "The exhibition-inclusion claim is public-ready and materially strengthens the professional record, but this accession preserves it in the compositional palette without automatically expanding the current website.",
    decidedAt: "2026-07-15",
    reviewedBy: ["Codex archival-production review"]
  }
] satisfies ProjectionDecision[];
