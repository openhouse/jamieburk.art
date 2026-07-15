import type { KnowledgeBank } from "./schema.ts";

export const nterChngArchiveIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-NTER-CHNG-ARCHIVE-AND-EXHIBITION",
    receivedAt: "2026-07-15",
    inputKind: "url",
    summary: "A recovered first-party NTER CHNG site confirms the project's interactive-texting form and collective designer credits; Jamie's account of its later inclusion in America: Now and Here remains a bounded research lead because no project-specific program listing has been recovered.",
    projectIds: ["creative-technology-and-media"],
    researchStatus: "needs-more-research",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
      "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
      "SRC-AMERICA-NOW-HERE-NERMAN-2011",
      "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
      "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026"
    ],
    observationIds: [
      "OBS-NTER-CHNG-OFFICIAL-SITE-DESCRIPTION-CREDITS",
      "OBS-NTER-CHNG-AMERICA-NOW-HERE-ACCOUNT",
      "OBS-AMERICA-NOW-HERE-KANSAS-CITY-CONTEXT",
      "OBS-AMERICA-NOW-HERE-SMITHSONIAN-SCOPE",
      "OBS-AMERICA-NOW-HERE-WAYBACK-NO-REFERENCE-RECOVERED"
    ],
    claimIds: [
      "CLM-NTER-CHNG-INTERACTIVE-INSTALLATION",
      "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"
    ],
    researchInquiryIds: [
      "INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"
    ],
    nextActions: [
      "Seek a program, checklist, installation record, press item, photograph, organizer archive, or collaborator account that names NTER CHNG within America: Now and Here's Kansas City program.",
      "Review relevant folder-level material in the Smithsonian Archives of American Art collection if access and permissions permit.",
      "Keep the exhibition connection out of the public website until project-specific evidence is recovered."
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
    id: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
    project: "creative-technology-and-media",
    internalClaim: "Jamie recalls that NTER CHNG was later included in America: Now and Here's 2011 Kansas City program. Institutional records confirm the program context, but no project-specific program listing has been recovered.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "Jamie recalls NTER CHNG's inclusion in America: Now and Here's 2011 Kansas City program; project-specific program documentation remains to be recovered.",
        status: "hold",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/creative-technology-and-media"]
      }
    ],
    evidence: [
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
      "Attribute the inclusion statement to Jamie's first-person account until a project-specific program or collaborator source is recovered.",
      "The Nerman Museum page establishes program context and a Barbara Kruger event, not an NTER CHNG presentation at the museum.",
      "A failed exact-term recovery is not evidence that the project was absent from the program.",
      "Keep this claim out of active website surfaces while the inclusion record remains unrecovered."
    ],
    antiClaims: [
      "NTER CHNG was exhibited at the Nerman Museum.",
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
    question: "What project-specific record establishes NTER CHNG's inclusion, venue, date, and presentation context within America: Now and Here's 2011 Kansas City program?",
    methods: [
      "Recover and review the first-party NTER CHNG site and its creator credits.",
      "Review the Nerman Museum page and Smithsonian Archives of American Art collection description and finding aid for institutional program context.",
      "Enumerate distinct 2011 HTML captures from AmericanNowAndHere.org, replay every recoverable normalized page, and search exact project-name variants and collaborator names.",
      "Preserve 'not recovered' separately from 'did not exist' and route future program, image, organizer, and collaborator evidence back to this inquiry."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The NTER CHNG site was recovered and independently confirms the project's description and three named creators.",
      "The Nerman Museum and Smithsonian records confirm America: Now and Here's May 2011 Kansas City context and multidisciplinary scope.",
      "The official exhibition domain AmericanNowAndHere.org was identified and its 2011 Wayback captures were enumerated.",
      "No exact project-name or collaborator-name reference was recovered from 205 replayable 2011 official-site HTML pages."
    ],
    limitations: [
      "Wayback capture and replay coverage is incomplete by design.",
      "Non-HTML, image-based, private, or uncaptured records may contain project-specific evidence.",
      "The public Smithsonian finding aid describes most materials at folder or series level and does not expose every document's contents.",
      "No project-specific program, checklist, installation record, photograph, press item, organizer record, or collaborator confirmation has yet been recovered."
    ],
    sourceIds: [
      "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
      "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
      "SRC-AMERICA-NOW-HERE-NERMAN-2011",
      "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
      "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026"
    ],
    publicSummary: "NTER CHNG's first-party site and America: Now and Here's institutional program context are recovered. Jamie's account of the connection is preserved, but a project-specific exhibition record remains to be found."
  }
];
