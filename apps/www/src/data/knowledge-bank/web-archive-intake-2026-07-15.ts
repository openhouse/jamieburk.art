import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const webArchiveSourceRecords20260715 = [
  {
    id: "SRC-NTERCHNG-PROJECT-SITE-2011",
    title: "NTER CHNG project site",
    organization: "NTER CHNG",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-01-28T19:33:50Z",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://nterchng.com/",
    archiveUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    preferredPublicUrl: "archive",
    publicCitation: "NTER CHNG project site, archived January 28, 2011.",
    publicNote: "The archived first-party page identifies the project as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier at Arts Incubator Cocoon Gallery in Kansas City.",
    captureFingerprint: "sha256:45002bbef9034c4191060c84bbeaa8ed011190563019ad055e5fad22caeaab18",
    supportsGenerally: [
      "the NTER CHNG project name",
      "the interactive texting installation description",
      "collective authorship by Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      "Arts Incubator Cocoon Gallery as the documented original venue"
    ],
    doesNotEstablish: [
      "the individual division of concept, software, fabrication, or production work",
      "visitor counts or measured outcomes",
      "the complete exhibition run dates",
      "the later America: Now and Here presentation"
    ]
  },
  {
    id: "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011",
    title: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    organization: "America: Now and Here Kansas City",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-05-18T07:16:26Z",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
    archiveUrl: "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
    preferredPublicUrl: "archive",
    publicCitation: "America: Now and Here Kansas City, 'Drew Bolton, Jamie Burkart, and Garrett Fuselier,' archived May 18, 2011.",
    publicNote: "The exhibition's archived Kansas City site identifies the trio as visual artists and publishes a NTER CHNG artist statement describing the installation's software, architectural, and participatory design. The page also displays historic phone numbers; do not reproduce them in repository or site copy.",
    captureFingerprint: "sha256:cbd797c4e7e6af9ff71f81e75283f3b7f1c30be19f7f6d71f08b666b9c818858",
    supportsGenerally: [
      "the trio's America: Now and Here Kansas City visual-artist context",
      "NTER CHNG as an interactive text-messaging experience",
      "the combination of software application and architectural installation",
      "real-time many-to-many participant dialogue through a gallery wall"
    ],
    doesNotEstablish: [
      "which collaborator performed each technical or artistic task",
      "the precise installation location, configuration, or run dates within America: Now and Here",
      "visitor counts, message counts, or measured audience outcomes",
      "that the Nerman Museum's Barbara Kruger truck displayed NTER CHNG",
      "permission to reproduce the historic phone numbers displayed on the page"
    ]
  },
  {
    id: "SRC-NTERCHNG-ANH-VISUAL-ARTISTS-INDEX-2011",
    title: "The Visual Artists",
    organization: "America: Now and Here Kansas City",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2011-05-18T10:08:58Z",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://kansascity.americanowandhere.org/the-visual-artists/",
    archiveUrl: "https://web.archive.org/web/20110518100858/http://kansascity.americanowandhere.org/the-visual-artists/",
    preferredPublicUrl: "archive",
    publicCitation: "America: Now and Here Kansas City, 'The Visual Artists,' archived May 18, 2011.",
    publicNote: "The archived index separately lists Drew Bolton, Jamie Burkart, and Garrett Fuselier and marks each as an America: Now and Here/Kansas City artist.",
    captureFingerprint: "sha256:3bcd408ad71e8cc5da26f7b8b5af84d6d09bb7d872e93804a2c95793383c9dc4",
    supportsGenerally: [
      "Drew Bolton's listing as an America: Now and Here/Kansas City visual artist",
      "Jamie Burkart's listing as an America: Now and Here/Kansas City visual artist",
      "Garrett Fuselier's listing as an America: Now and Here/Kansas City visual artist"
    ],
    doesNotEstablish: [
      "the title or physical form of each artist's exhibited work",
      "the individual division of labor within NTER CHNG",
      "the precise display site or dates for NTER CHNG",
      "participation beyond the Kansas City program"
    ]
  },
  {
    id: "SRC-ANH-NERMAN-MUSEUM-2011",
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
    publicNote: "The institutional page preserves contemporaneous reporting on America: Now and Here's Kansas City launch and documents the Barbara Kruger truck's May 11-12 Nerman Museum stop.",
    supportsGenerally: [
      "America: Now and Here's 2011 Kansas City launch context",
      "the project's cross-disciplinary civic-dialogue purpose",
      "the May 11-12, 2011 Nerman Museum stop for the Barbara Kruger truck"
    ],
    doesNotEstablish: [
      "Jamie Burkart's participation",
      "NTER CHNG's inclusion or physical display",
      "that every Kansas City program element appeared at the Nerman Museum",
      "the individual role of any NTER CHNG collaborator"
    ]
  }
] satisfies SourceRecord[];

export const webArchiveClaimRecords20260715 = [
  {
    id: "CLM-NTERCHNG-COLLECTIVE-INSTALLATION-2011",
    project: "nter-chng",
    internalClaim: "NTER CHNG was an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier, documented at Arts Incubator Cocoon Gallery in Kansas City.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Co-created NTER CHNG with Drew Bolton and Garrett Fuselier, an interactive texting installation documented at Arts Incubator Cocoon Gallery in Kansas City.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NTERCHNG-PROJECT-SITE-2011",
        relationship: "direct-support",
        supports: ["project name", "interactive texting format", "collective authorship", "documented original venue"],
        locator: "page title, description metadata, and main project description",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011",
        relationship: "corroborating",
        supports: ["collective authorship", "interactive text-messaging format"],
        locator: "artist heading and artist statement",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Credit Drew Bolton and Garrett Fuselier wherever Jamie's participation is projected.",
      "The sources establish collective authorship but do not assign individual technical or artistic tasks."
    ],
    antiClaims: [
      "Jamie created NTER CHNG alone.",
      "Jamie alone wrote the software or designed the installation.",
      "The archive establishes visitor counts or measured impact."
    ],
    researchInquiryIds: ["INQ-NTERCHNG-ANH-ARCHIVE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival web review"]
  },
  {
    id: "CLM-NTERCHNG-PARTICIPATORY-SYSTEM-2011",
    project: "nter-chng",
    internalClaim: "NTER CHNG combined a software application and architectural installation so gallery visitors could use their phones to contribute in real time to a shared many-to-many dialogue across a digital wall.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "The team joined software and spatial design so visitors could turn private texting into a shared real-time gallery dialogue.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [{
      sourceId: "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011",
      relationship: "direct-support",
      supports: ["software and architectural form", "phone-based participation", "real-time shared dialogue", "many-to-many interaction model"],
      locator: "NTER CHNG artist statement",
      confidence: "high",
      renderCitation: true
    }],
    boundaries: [
      "Treat the interaction model as the team's collective work.",
      "Do not infer adoption, accessibility performance, scale, or audience outcomes that the statement does not report."
    ],
    antiClaims: [
      "NTER CHNG was a commercial messaging platform.",
      "The installation's audience scale or impact was measured.",
      "The source assigns software implementation to Jamie individually."
    ],
    researchInquiryIds: ["INQ-NTERCHNG-ANH-ARCHIVE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival web review"]
  },
  {
    id: "CLM-NTERCHNG-ANH-KC-INCLUSION-2011",
    project: "nter-chng",
    internalClaim: "America: Now and Here's archived Kansas City site lists Drew Bolton, Jamie Burkart, and Garrett Fuselier as Kansas City visual artists and gives the trio a dedicated page carrying the NTER CHNG artist statement.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "America: Now and Here's 2011 Kansas City program included the NTER CHNG collaborators as Kansas City visual artists and preserved the project on a dedicated artist page.",
      status: "hold",
      citationRequired: true,
      surfaces: []
    }],
    evidence: [
      {
        sourceId: "SRC-NTERCHNG-ANH-VISUAL-ARTISTS-INDEX-2011",
        relationship: "direct-support",
        supports: ["the three individual visual-artist listings", "the America: Now and Here/Kansas City artist designation"],
        locator: "Visual Artists list and Kansas City artist footnote",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011",
        relationship: "corroborating",
        supports: ["dedicated trio page", "NTER CHNG artist statement", "visual-artist designation"],
        locator: "page title, visual-artist heading, and artist statement",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-ANH-NERMAN-MUSEUM-2011",
        relationship: "context",
        supports: ["America: Now and Here Kansas City launch context", "Nerman Museum stop"],
        locator: "institutional exhibition description and May 11-12 listing",
        publicNote: "Context for the broader Kansas City program only; this source does not name Jamie or NTER CHNG.",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The archived exhibition site establishes the trio's Kansas City visual-artist listing and dedicated NTER CHNG page.",
      "It does not by itself establish the exact physical form, venue, or run dates of NTER CHNG within the America: Now and Here program.",
      "The Nerman Museum page documents a separate Barbara Kruger truck stop and must not be used to place NTER CHNG at that museum."
    ],
    antiClaims: [
      "NTER CHNG was displayed at the Nerman Museum.",
      "The specific installation configuration used at Arts Incubator was remounted unchanged for America: Now and Here.",
      "Jamie was the sole NTER CHNG artist.",
      "The project toured nationally with America: Now and Here."
    ],
    researchInquiryIds: ["INQ-NTERCHNG-ANH-ARCHIVE-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival web review"]
  }
] satisfies ClaimRecord[];

export const webArchiveResearchInquiries20260715 = [
  {
    id: "INQ-NTERCHNG-ANH-ARCHIVE-2026",
    project: "nter-chng",
    question: "Can the archived America: Now and Here website verify Jamie Burkart and the NTER CHNG collaborators' relationship to its 2011 Kansas City program?",
    methods: [
      "Close-read the supplied January 2011 NTER CHNG Wayback capture.",
      "Identified the former Kansas City exhibition domain through contemporaneous public reporting.",
      "Enumerated surviving public Wayback captures for the Kansas City domain.",
      "Close-read the recovered visual-artists index and dedicated trio page.",
      "Compared those records with the Nerman Museum's institutional exhibition context."
    ],
    runAt: "2026-07-15",
    resultStatus: "recovered",
    findings: [
      "The NTER CHNG project site identifies the installation and credits Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
      "The archived America: Now and Here Kansas City visual-artists index lists all three collaborators and marks each as a Kansas City artist.",
      "The exhibition site gives the trio a dedicated visual-artist page and publishes a detailed NTER CHNG artist statement.",
      "The Nerman Museum page confirms the broader 2011 Kansas City launch and its own Barbara Kruger truck stop but does not name Jamie or NTER CHNG.",
      "The press release linked from the original NTER CHNG page was not recovered in the available Wayback file inventory."
    ],
    limitations: [
      "The recovered pages do not assign individual responsibilities among the three collaborators.",
      "The recovered exhibition pages do not establish NTER CHNG's exact physical location, installation configuration, or run dates within America: Now and Here.",
      "The Nerman Museum context cannot be used to claim that NTER CHNG appeared at the museum.",
      "Failure to recover the original press release does not prove that it never existed."
    ],
    sourceIds: [
      "SRC-NTERCHNG-PROJECT-SITE-2011",
      "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011",
      "SRC-NTERCHNG-ANH-VISUAL-ARTISTS-INDEX-2011",
      "SRC-ANH-NERMAN-MUSEUM-2011"
    ],
    publicSummary: "The archived America: Now and Here Kansas City site lists Drew Bolton, Jamie Burkart, and Garrett Fuselier as Kansas City visual artists and preserves a dedicated NTER CHNG artist page; exact display details remain open."
  }
] satisfies ResearchInquiry[];

export const webArchiveIntakeRecords20260715 = [
  {
    id: "INTAKE-NTERCHNG-PROJECT-SITE-2026",
    capturedAt: "2026-07-15",
    capturedBy: "Jamie Burkart and Codex archival web review",
    kind: "public-url",
    title: "Archived NTER CHNG project site",
    publicSafeSummary: "A first-party archived page identifies NTER CHNG as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier at Arts Incubator Cocoon Gallery in Kansas City.",
    whyItMatters: "Recovers direct public evidence for an early participatory technology project while preserving collective credit and role boundaries.",
    projectHints: ["nter-chng", "participatory-systems"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    canonicalUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
    sourceIds: ["SRC-NTERCHNG-PROJECT-SITE-2011"],
    claimIds: [
      "CLM-NTERCHNG-COLLECTIVE-INSTALLATION-2011",
      "CLM-NTERCHNG-PARTICIPATORY-SYSTEM-2011"
    ],
    inquiryIds: ["INQ-NTERCHNG-ANH-ARCHIVE-2026"],
    limitations: ["The page does not assign individual concept, software, fabrication, or production responsibilities."],
    nextActions: ["Seek collaborator review or production records before projecting an individual technical task split."]
  },
  {
    id: "INTAKE-NTERCHNG-ANH-INCLUSION-2026",
    capturedAt: "2026-07-15",
    capturedBy: "Codex archival web review",
    kind: "research-lead",
    title: "America: Now and Here Kansas City NTER CHNG recovery",
    publicSafeSummary: "The archived exhibition site lists all three NTER CHNG collaborators as Kansas City visual artists and preserves a dedicated page carrying the project's artist statement.",
    whyItMatters: "Adds official exhibition-site evidence for the project's later institutional context without inferring display details the archive does not show.",
    projectHints: ["nter-chng", "america-now-and-here"],
    maturity: "decomposed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "claim-candidate-created",
    sourceIds: [
      "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011",
      "SRC-NTERCHNG-ANH-VISUAL-ARTISTS-INDEX-2011"
    ],
    claimIds: [
      "CLM-NTERCHNG-COLLECTIVE-INSTALLATION-2011",
      "CLM-NTERCHNG-PARTICIPATORY-SYSTEM-2011",
      "CLM-NTERCHNG-ANH-KC-INCLUSION-2011"
    ],
    inquiryIds: ["INQ-NTERCHNG-ANH-ARCHIVE-2026"],
    limitations: ["The archive verifies the artist listing and project page, not exact display location, configuration, or dates."],
    nextActions: ["Search installation photographs, checklists, catalogs, or collaborator records if a future public surface needs physical display details."]
  },
  {
    id: "INTAKE-ANH-NERMAN-CONTEXT-2026",
    capturedAt: "2026-07-15",
    capturedBy: "Jamie Burkart and Codex archival web review",
    kind: "public-url",
    title: "Nerman Museum America: Now and Here exhibition context",
    publicSafeSummary: "The institutional page preserves contemporaneous reporting on the 2011 Kansas City launch and documents the Nerman Museum's May 11-12 Barbara Kruger truck stop.",
    whyItMatters: "Provides durable institutional context while explicitly preventing the museum page from being used as proof that NTER CHNG appeared there.",
    projectHints: ["nter-chng", "america-now-and-here"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "linked-existing",
    canonicalUrl: "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
    sourceIds: ["SRC-ANH-NERMAN-MUSEUM-2011"],
    claimIds: ["CLM-NTERCHNG-ANH-KC-INCLUSION-2011"],
    inquiryIds: ["INQ-NTERCHNG-ANH-ARCHIVE-2026"],
    limitations: ["The page does not name Jamie, the NTER CHNG collaborators, or NTER CHNG."],
    nextActions: ["Use only as contextual evidence for the broader Kansas City program and the museum's own truck stop."]
  }
] satisfies IntakeRecord[];
