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
    claimIds: [
      "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
      "CLM-NTER-CHNG-JAMIE-CONNECTION-DESIGN-2011",
      "CLM-NTER-CHNG-ANH-INSTALLATION-OPERATIONS-2011"
    ],
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
  },
  {
    id: "INTAKE-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
    receivedAt: "2026-07-15",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Contemporaneous collaborative planning document for NTER CHNG's America: Now and Here installation, covering software, fabrication, equipment, logistics, on-site work, and takedown.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-NTER-CHNG", "ENT-AMERICA-NOW-AND-HERE"],
    disposition: "source-created",
    sourceIds: ["SRC-NTER-CHNG-ANH-INSTALLATION-PLAN-2011"],
    claimIds: ["CLM-NTER-CHNG-ANH-INSTALLATION-OPERATIONS-2011"],
    researchTaskIds: [
      "TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY",
      "TASK-NTER-CHNG-ANH-INSTALLATION-EXECUTION-CREDIT"
    ],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011",
    receivedAt: "2026-07-15",
    kind: "private-archive-pointer",
    publicSafeSummary:
      "Contemporaneous working compilation of NTER CHNG exhibit information, artist materials, participation prompts, and response samples; raw contact details and messages remain protected.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-NTER-CHNG", "ENT-AMERICA-NOW-AND-HERE"],
    disposition: "source-created",
    sourceIds: ["SRC-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011"],
    claimIds: ["CLM-NTER-CHNG-JAMIE-CONNECTION-DESIGN-2011"],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-INSTALLATION-EXECUTION-CREDIT"],
    rawMaterialPolicy: "protected-outside-repo"
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
      "the collaborators' combined scenic-design, programming, motion-graphics, and experiential-production backgrounds",
      "Jamie's stated intention to help gallery visitors connect beyond their existing contact lists"
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
  },
  {
    id: "SRC-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
    title: "NTER CHNG America: Now and Here installation plan",
    author: "NTER CHNG collaborators",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-13",
    publicCitation:
      "Contemporaneous collaborative NTER CHNG installation plan for America: Now and Here, April 2011.",
    publicNote:
      "The public-safe description records a planned implementation workflow spanning software reliability, hosting, display equipment, wall fabrication, transport, wiring, participant wayfinding, on-site installation, experience tuning, and takedown. The underlying document remains protected.",
    intakeIds: ["INTAKE-NTER-CHNG-ANH-INSTALLATION-PLAN-2011"],
    supportsGenerally: [
      "a multi-layer technical and physical installation workflow",
      "Jamie's scheduled participation in preparation and installation",
      "a planned late-April 2011 installation sequence at Leedy-Voulkos",
      "collective responsibility across software, fabrication, logistics, and gallery experience"
    ],
    doesNotEstablish: [
      "completion of every planned task",
      "sole project management or implementation by Jamie",
      "the final division of labor among collaborators",
      "the exact public presentation dates or a completed installation at the planned venue"
    ],
    protectedLocatorId: "ARCHIVE-NTER-CHNG-ANH-INSTALLATION-PLAN-2011"
  },
  {
    id: "SRC-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011",
    title: "NTER CHNG working artist and participation materials",
    author: "NTER CHNG collaborators",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2011-04-06",
    publicCitation:
      "Contemporaneous NTER CHNG working artist and participation materials, April 2011.",
    publicNote:
      "The working compilation joins prior exhibit information, the artist statement, biographies, three participation prompts, nine dated message samples, and a Jamie-attributed statement of purpose later published by America: Now and Here. Raw contact details and message text are not retained in the repository.",
    intakeIds: ["INTAKE-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011"],
    supportsGenerally: [
      "the three-maker project credit",
      "the prompt-driven participation structure",
      "nine preserved message samples associated with three prompts",
      "Jamie's stated intention to help gallery visitors make connections beyond existing contacts"
    ],
    doesNotEstablish: [
      "that the message senders were public visitors rather than collaborators or test participants",
      "permission to publish contact details or message text",
      "measured connection, behavior change, audience scale, or impact",
      "sole authorship or a complete technical division of labor"
    ],
    protectedLocatorId: "ARCHIVE-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011"
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
      },
      {
        id: "PROP-NTER-CHNG-ANH-JAMIE-CONNECTION-PURPOSE",
        text: "America: Now and Here's official artist page attributes to Jamie the aim of helping gallery visitors make new connections by reaching beyond their existing address books and contact lists.",
        relationToJamie: "direct-role",
        supportTags: ["nter-chng-anh-jamie-connection-purpose"],
        confidence: "high",
        locator: "Jamie-attributed statement in the final artist-statement paragraph"
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
  },
  {
    id: "READ-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
    sourceId: "SRC-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      {
        id: "PROP-NTER-CHNG-ANH-DEPLOYMENT-SCOPE",
        text: "The collaborative plan treats NTER CHNG as a multi-layer deployment spanning software reliability, server hosting, display computers and projectors, wall fabrication, transport, networking and wiring, participant wayfinding, on-site assembly, experience tuning, and takedown.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-anh-deployment-scope"],
        confidence: "high",
        locator: "Preparation, software, fabrication, installation, remaining-tasks, and takedown sections"
      },
      {
        id: "PROP-NTER-CHNG-ANH-JAMIE-INSTALLATION-SEQUENCE",
        text: "The plan explicitly schedules Jamie into the preparation and installation sequence for the America: Now and Here presentation.",
        relationToJamie: "direct-role",
        supportTags: ["nter-chng-anh-jamie-installation-sequence"],
        confidence: "high",
        locator: "Dated preparation and installation sequence"
      },
      {
        id: "PROP-NTER-CHNG-ANH-PLANNED-LEEDY-VOULKOS",
        text: "The plan identifies Leedy-Voulkos as the intended on-site installation location and schedules installation to begin in late April 2011.",
        relationToJamie: "project-context",
        supportTags: ["nter-chng-anh-planned-leedy-voulkos"],
        confidence: "high",
        locator: "Installation heading and sequence"
      }
    ],
    limitations: [
      "This is a forward-looking plan, not a completion report or formal exhibition checklist.",
      "The source does not assign every listed task to a named collaborator or establish sole project management by Jamie.",
      "The planned venue and sequence require after-the-fact corroboration before they become final presentation details.",
      "Private preparation-location details are intentionally omitted from the public-safe record."
    ],
    researchTaskIds: [
      "TASK-NTER-CHNG-ANH-CHECKLIST-RECOVERY",
      "TASK-NTER-CHNG-ANH-INSTALLATION-EXECUTION-CREDIT"
    ]
  },
  {
    id: "READ-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011",
    sourceId: "SRC-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011",
    status: "closely-read",
    readAt: "2026-07-15",
    propositions: [
      {
        id: "PROP-NTER-CHNG-WORKING-PROMPT-STRUCTURE",
        text: "The working compilation organizes three open-ended prompts about American journeys, encounters with art, and identifying as an artist alongside exhibit and artist materials.",
        relationToJamie: "collective-role",
        supportTags: ["nter-chng-working-prompt-structure"],
        confidence: "high",
        locator: "Prompt and exhibit-information sections"
      },
      {
        id: "PROP-NTER-CHNG-WORKING-NINE-MESSAGE-SAMPLES",
        text: "The document preserves nine dated message samples associated with the three prompts while leaving sender identity and participation context unresolved.",
        relationToJamie: "project-context",
        supportTags: ["nter-chng-working-nine-message-samples"],
        confidence: "high",
        locator: "Three prompt-and-response groups"
      },
      {
        id: "PROP-NTER-CHNG-WORKING-JAMIE-CONNECTION-PURPOSE",
        text: "The working materials attribute to Jamie an intention to help gallery visitors make new connections by reaching beyond their existing contacts.",
        relationToJamie: "direct-role",
        supportTags: ["nter-chng-working-jamie-connection-purpose"],
        confidence: "high",
        locator: "Jamie-attributed project-purpose statement"
      }
    ],
    limitations: [
      "The repository does not retain or reproduce the underlying phone numbers or message text.",
      "The document does not establish whether message senders were visitors, collaborators, or test participants.",
      "A working compilation is not proof of audience scale, connection, behavior change, or civic impact.",
      "The exact technical and editorial division of labor among the three makers remains unresolved."
    ],
    researchTaskIds: ["TASK-NTER-CHNG-ANH-INSTALLATION-EXECUTION-CREDIT"]
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
  },
  {
    id: "CLM-NTER-CHNG-JAMIE-CONNECTION-DESIGN-2011",
    project: "nter-chng",
    internalClaim:
      "Jamie co-created NTER CHNG's participatory interface and publicly framed its intended end as helping gallery visitors make connections beyond their existing address books and contact lists.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [
      "INTAKE-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
      "INTAKE-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011"
    ],
    requiredSupportTags: [
      "nter-chng-anh-jamie-connection-purpose",
      "nter-chng-working-jamie-connection-purpose"
    ],
    composition: {
      action:
        "Co-created a software-and-architecture interface that invited gallery visitors to participate through their own phones.",
      intendedEnd:
        "Help visitors move beyond private one-to-one texting and make connections outside their existing contact lists.",
      usableResult:
        "A shared public text environment in which messages could become part of a many-to-many gallery experience.",
      audience:
        "Gallery visitors, including people invited to contribute without already knowing one another.",
      collectiveCredit:
        "Credit Drew Bolton, Jamie Burkart, and Garrett Fuselier as co-creators; the Jamie-attributed statement identifies his articulated purpose, not sole authorship of the work's concept or implementation.",
      causalBoundary:
        "The record establishes the intended participation design and a public Jamie-attributed statement, not measured new relationships, behavior change, audience scale, or a complete technical division of labor."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
        relationship: "direct-support",
        supports: [
          "the official public attribution to Jamie",
          "the aim of connections beyond existing contacts"
        ],
        propositionIds: ["PROP-NTER-CHNG-ANH-JAMIE-CONNECTION-PURPOSE"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011",
        relationship: "private-support",
        supports: ["the same Jamie-attributed purpose in contemporaneous working materials"],
        propositionIds: ["PROP-NTER-CHNG-WORKING-JAMIE-CONNECTION-PURPOSE"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use co-created and preserve all three makers' credit.",
      "Describe the connection language as Jamie's stated intention, not a measured outcome.",
      "Do not publish raw message text or contact details from the protected working artifact."
    ],
    antiClaims: [
      "Jamie alone conceived or created NTER CHNG.",
      "NTER CHNG measurably created new relationships or changed participant behavior.",
      "The preserved message samples establish audience adoption or impact.",
      "The Jamie-attributed statement establishes his sole responsibility for software, fabrication, or installation."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Google Drive and public-source review"]
  },
  {
    id: "CLM-NTER-CHNG-ANH-INSTALLATION-OPERATIONS-2011",
    project: "nter-chng",
    internalClaim:
      "A contemporaneous installation plan situates Jamie in NTER CHNG's preparation for America: Now and Here and documents a planned implementation workflow spanning software reliability, hosting, displays and projectors, wall fabrication, transport, networking, participant wayfinding, on-site installation, experience tuning, and takedown.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [
      "INTAKE-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
      "INTAKE-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011"
    ],
    requiredSupportTags: [
      "nter-chng-anh-deployment-scope",
      "nter-chng-anh-jamie-installation-sequence",
      "nter-chng-anh-2011-inclusion"
    ],
    composition: {
      action:
        "Participated in preparing a technically and physically integrated installation across software, hosting, hardware, fabrication, logistics, networking, wayfinding, and on-site work.",
      intendedEnd:
        "Make the participatory text system reliable, legible, and usable as a gallery-scale experience.",
      usableResult:
        "A concrete implementation plan connected the software service, constructed wall, display hardware, visitor interface, installation sequence, tuning, and takedown.",
      audience:
        "NTER CHNG collaborators, America: Now and Here organizers, installation partners, and gallery visitors.",
      collectiveCredit:
        "The planning artifact belongs to the three-maker collaboration and does not assign every workstream to Jamie or identify a sole project manager.",
      causalBoundary:
        "The plan documents scope, sequence, and Jamie's scheduled participation; it does not prove that every listed task was completed, establish the final labor split, or independently confirm final venue and presentation dates."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
        relationship: "private-support",
        supports: [
          "the implementation workstreams",
          "Jamie's scheduled participation",
          "the planned installation sequence"
        ],
        propositionIds: [
          "PROP-NTER-CHNG-ANH-DEPLOYMENT-SCOPE",
          "PROP-NTER-CHNG-ANH-JAMIE-INSTALLATION-SEQUENCE",
          "PROP-NTER-CHNG-ANH-PLANNED-LEEDY-VOULKOS"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
        relationship: "corroborating",
        supports: ["official inclusion in the America: Now and Here Kansas City program"],
        propositionIds: ["PROP-NTER-CHNG-ANH-INCLUSION"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe this as a contemporaneous implementation plan and Jamie's scheduled participation.",
      "Keep planned work distinct from independently verified completion.",
      "Keep collective credit and do not assign every workstream to Jamie.",
      "Treat Leedy-Voulkos as the planned venue until an after-the-fact installation-specific source confirms the final presentation details."
    ],
    antiClaims: [
      "Jamie solely managed or implemented the America: Now and Here installation.",
      "Jamie personally completed every listed technical, fabrication, and logistics task.",
      "The planning document alone proves final installation dates or completed presentation at Leedy-Voulkos.",
      "The implementation plan establishes audience scale or measured impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex Google Drive and public-source review"]
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
      "INTAKE-NERMAN-AMERICA-NOW-HERE-2011",
      "INTAKE-NTER-CHNG-ANH-INSTALLATION-PLAN-2011"
    ],
    sourceIds: [
      "SRC-NTER-CHNG-PROJECT-WAYBACK-2011",
      "SRC-ANH-KC-ABOUT-WAYBACK-2011",
      "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011",
      "SRC-NERMAN-AMERICA-NOW-HERE-2011",
      "SRC-NTER-CHNG-ANH-INSTALLATION-PLAN-2011"
    ],
    claimIds: [
      "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
      "CLM-NTER-CHNG-ANH-INSTALLATION-OPERATIONS-2011"
    ],
    nextActions: [
      "Search the archived Kansas City calendar, artist index, uploads, and linked national site for NTER CHNG-specific venue or date language.",
      "Review the Smithsonian Archives of American Art finding aid and request the relevant America: Now and Here Kansas City checklist or digital-program material if needed.",
      "Search collaborator archives for a dated installation view, program, or correspondence that can be described publicly without exposing private contact information.",
      "Treat the protected plan as evidence of intended venue and sequence, not completed presentation details.",
      "Keep the current inclusion claim; add venue or date detail only when an after-the-fact installation-specific source supports it."
    ]
  },
  {
    id: "TASK-NTER-CHNG-ANH-INSTALLATION-EXECUTION-CREDIT",
    project: "nter-chng",
    question:
      "Which planned NTER CHNG software, hosting, fabrication, equipment, logistics, installation, and gallery-experience tasks were completed for America: Now and Here, and how should collaborator credit be assigned?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-15",
    intakeIds: [
      "INTAKE-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
      "INTAKE-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011"
    ],
    sourceIds: [
      "SRC-NTER-CHNG-ANH-INSTALLATION-PLAN-2011",
      "SRC-NTER-CHNG-WORKING-ARTIST-MATERIALS-2011",
      "SRC-ANH-KC-NTER-CHNG-ARTIST-WAYBACK-2011"
    ],
    claimIds: [
      "CLM-NTER-CHNG-JAMIE-CONNECTION-DESIGN-2011",
      "CLM-NTER-CHNG-ANH-INSTALLATION-OPERATIONS-2011"
    ],
    nextActions: [
      "Recover dated installation photographs, completed-task notes, code or deployment history, equipment records, and after-the-fact program material.",
      "Ask Drew Bolton and Garrett Fuselier to confirm the completed workstreams and the collaborators' division of labor.",
      "Separate software, hosting, fabrication, installation, content, and production responsibilities rather than assigning the plan wholesale to one maker.",
      "Preserve the public Jamie-attributed participation purpose while treating implementation completion and individual credit as distinct research questions."
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
  },
  {
    id: "DEC-NTER-CHNG-JAMIE-CONNECTION-DESIGN-DEFER",
    claimId: "CLM-NTER-CHNG-JAMIE-CONNECTION-DESIGN-2011",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale:
      "The purpose claim is public-ready and directly attributed on the official program page, but it remains reserve depth until a future portfolio composition needs this participatory-design example.",
    decidedAt: "2026-07-15",
    reviewedBy: ["Codex archival-production review"]
  }
] satisfies ProjectionDecision[];
