import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = ["Jamie Burkart", "Codex public-source review"];

export const nterChngArchiveBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-NTER-CHNG-ARCHIVE-2026",
      kind: "public-url",
      capturedAt: "2026-07-15",
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Recover NTER CHNG's project record, Jamie's bounded co-creator credit, and the installation's later inclusion in America: Now and Here.",
      projects: ["nter-chng"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-NTER-CHNG-PROJECT-SITE-2011",
        "SRC-NTER-CHNG-PITCH-2010",
        "SRC-NTER-CHNG-VIMEO-2011",
        "SRC-NTER-CHNG-ANH-KC-2011",
        "SRC-NTER-CHNG-NERMAN-2011"
      ],
      claimIds: [
        "CLM-NTER-CHNG-CO-CREATION",
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM",
        "CLM-NTER-CHNG-AMERICA-NOW-HERE"
      ],
      researchTaskIds: ["TASK-NTER-CHNG-ROLE-AND-TECHNICAL-DETAIL"],
      notes: [
        "Public sources confirm collective authorship and exhibition context but do not allocate software, scenic, fabrication, or production responsibilities among the collaborators.",
        "The original site linked a press release that was not recovered in the reviewed Wayback capture inventory."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-NTER-CHNG-PROJECT-SITE-2011",
      title: "NTER CHNG project site",
      author: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-01-28T19:33:50Z",
      accessedAt: "2026-07-15",
      archiveUrl:
        "https://web.archive.org/web/20110128193350/http://nterchng.com/",
      preferredPublicUrl: "archive",
      publicCitation:
        "Drew Bolton, Jamie Burkart, and Garrett Fuselier, NTER CHNG project site, Wayback Machine capture, January 28, 2011.",
      publicNote:
        "The archived landing page describes NTER CHNG as an interactive texting installation, credits the three collaborators, and names Arts Incubator Cocoon Gallery in Kansas City.",
      supportsGenerally: [
        "collective authorship by Drew Bolton, Jamie Burkart, and Garrett Fuselier",
        "the interactive texting-installation format",
        "presentation at Arts Incubator Cocoon Gallery"
      ],
      doesNotEstablish: [
        "the division of labor among the collaborators",
        "individual ownership of the software or installation design",
        "attendance or measured outcomes",
        "the exact original exhibition dates"
      ]
    },
    {
      id: "SRC-NTER-CHNG-PITCH-2010",
      title: "NTR CHNG",
      organization: "The Pitch",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2010-01-07",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.thepitchkc.com/ntr-chng/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "The Pitch, 'NTR CHNG,' January 7, 2010, event listing for January 8, 2010.",
      publicNote:
        "The contemporaneous listing describes software and architecture that let visitors communicate in real time through a digital gallery wall.",
      supportsGenerally: [
        "a January 8, 2010 public event",
        "the software-application and architectural-installation form",
        "real-time visitor communication through a digital wall"
      ],
      doesNotEstablish: [
        "individual collaborator responsibilities",
        "the duration of the original exhibition",
        "attendance or quantified participation"
      ]
    },
    {
      id: "SRC-NTER-CHNG-VIMEO-2011",
      title: "NTER CHNG",
      organization: "Vimeo",
      author: "Garrett Fuselier",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2011-03-23",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://vimeo.com/21395655",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Garrett Fuselier, 'NTER CHNG,' Vimeo video, uploaded March 23, 2011.",
      publicNote:
        "The project video credits the installation to Bolton, Burkart, and Fuselier; it credits Mary Nichols for help engineering and constructing the wall and Megan Mantia and Elisha Stetson as actors.",
      supportsGenerally: [
        "collective project credit",
        "a surviving moving-image record",
        "Mary Nichols's wall engineering and construction contribution",
        "Megan Mantia's and Elisha Stetson's credited participation"
      ],
      doesNotEstablish: [
        "the complete project team",
        "the division of labor among the three named artists",
        "audience scale or project outcomes"
      ]
    },
    {
      id: "SRC-NTER-CHNG-ANH-KC-2011",
      title: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      organization: "America: Now and Here Kansas City",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-05-18T07:16:26Z",
      accessedAt: "2026-07-15",
      archiveUrl:
        "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
      preferredPublicUrl: "archive",
      publicCitation:
        "America: Now and Here Kansas City, 'Drew Bolton, Jamie Burkart, and Garrett Fuselier,' archived visual-artists page, Wayback Machine capture, May 18, 2011.",
      publicNote:
        "The exhibition's Kansas City site lists the collaborators as visual artists and publishes an artist statement for NTER CHNG.",
      supportsGenerally: [
        "NTER CHNG's inclusion in the Kansas City visual-artists program",
        "collective artist credit",
        "the project's many-to-many public communication design"
      ],
      doesNotEstablish: [
        "a solo credit for Jamie",
        "individual disciplinary responsibilities",
        "attendance or measured audience impact",
        "presentation at every national-tour venue"
      ]
    },
    {
      id: "SRC-NTER-CHNG-NERMAN-2011",
      title: "America: Now and Here - Barbara Kruger",
      organization: "Nerman Museum of Contemporary Art",
      author: "Alice Thorson, The Kansas City Star",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2011-04-30",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Alice Thorson, 'America: Now and Here - Barbara Kruger,' The Kansas City Star, April 30, 2011, republished by the Nerman Museum of Contemporary Art.",
      publicNote:
        "The museum record describes the exhibition's Kansas City launch, national and local artist structure, and May 11-12 Nerman Museum presentation.",
      supportsGenerally: [
        "America: Now and Here's Kansas City launch",
        "the traveling project's local-and-national artist structure",
        "the Nerman Museum presentation on May 11-12, 2011"
      ],
      doesNotEstablish: [
        "NTER CHNG's inclusion by itself",
        "Jamie's individual role in the national project",
        "the division of labor within NTER CHNG"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-NTER-CHNG-PROJECT-CREDIT",
      sourceId: "SRC-NTER-CHNG-PROJECT-SITE-2011",
      project: "nter-chng",
      assertion:
        "NTER CHNG's archived project site identifies the work as an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NTER-CHNG-CO-CREATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-PITCH-FORMAT",
      sourceId: "SRC-NTER-CHNG-PITCH-2010",
      project: "nter-chng",
      assertion:
        "The Pitch describes a software application and architectural installation carrying visitor messages through both faces of a digital gallery wall in real time.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-NTER-CHNG-PARTICIPATORY-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-PITCH-DATE",
      sourceId: "SRC-NTER-CHNG-PITCH-2010",
      project: "nter-chng",
      assertion:
        "The Pitch published its listing on January 7, 2010, for an event on January 8, 2010.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NTER-CHNG-CO-CREATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-VIMEO-CREDIT",
      sourceId: "SRC-NTER-CHNG-VIMEO-2011",
      project: "nter-chng",
      assertion:
        "The project video credits NTER CHNG to Bolton, Burkart, and Fuselier and separately credits Mary Nichols's help engineering and constructing the wall.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NTER-CHNG-CO-CREATION",
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-ANH-INCLUSION",
      sourceId: "SRC-NTER-CHNG-ANH-KC-2011",
      project: "nter-chng",
      assertion:
        "America: Now and Here's archived Kansas City site lists Bolton, Burkart, and Fuselier as visual artists and publishes NTER CHNG's artist statement.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-ANH-CONCEPT",
      sourceId: "SRC-NTER-CHNG-ANH-KC-2011",
      project: "nter-chng",
      assertion:
        "The archived artist statement describes NTER CHNG as converting private one-to-one texting into a public many-to-many, physically immersive group exchange.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NTER-CHNG-PARTICIPATORY-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-NERMAN-CONTEXT",
      sourceId: "SRC-NTER-CHNG-NERMAN-2011",
      project: "nter-chng",
      assertion:
        "The Nerman Museum record places America: Now and Here's national launch in Kansas City in May 2011 and describes its combination of national work with local artists.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NTER-CHNG-ROLE-BOUNDARY",
      sourceId: "SRC-NTER-CHNG-ANH-KC-2011",
      project: "nter-chng",
      assertion:
        "The exhibition page names disciplinary backgrounds collectively but does not assign software, scenic, motion-graphics, fabrication, or production responsibilities to a specific collaborator.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NTER-CHNG-CO-CREATION",
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-NTER-CHNG-CO-CREATION",
      project: "nter-chng",
      internalClaim:
        "Jamie Burkart co-created NTER CHNG with Drew Bolton and Garrett Fuselier, and the interactive texting installation was publicly presented in Kansas City in January 2010.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie co-created NTER CHNG with Drew Bolton and Garrett Fuselier, an interactive texting installation presented in Kansas City in 2010.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/nter-chng"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTER-CHNG-PROJECT-SITE-2011",
          relationship: "direct-support",
          supports: ["project title", "collective authorship", "installation form"],
          locator: "Page metadata and landing-page copy",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NTER-CHNG-PITCH-2010",
          relationship: "corroborating",
          supports: ["January 2010 public presentation", "installation operation"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NTER-CHNG-VIMEO-2011",
          relationship: "corroborating",
          supports: ["collective authorship", "surviving project documentation"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Name Drew Bolton and Garrett Fuselier whenever the work is summarized as a project credit.",
        "The sources do not allocate disciplinary responsibilities among the three artists.",
        "Credit Mary Nichols's wall-engineering and construction help when discussing fabrication in detail."
      ],
      antiClaims: [
        "Jamie created NTER CHNG alone",
        "Jamie alone designed or programmed the installation",
        "The records establish every collaborator's exact role",
        "The project had a quantified audience or measured public outcome"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-WAYBACK-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM",
      project: "nter-chng",
      internalClaim:
        "NTER CHNG combined a software application and architectural installation so participant text messages became a real-time public exchange across a digital gallery wall.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "NTER CHNG combined software and spatial installation to turn private texting into a real-time, many-to-many public exchange across a digital gallery wall.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/nter-chng"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTER-CHNG-PITCH-2010",
          relationship: "direct-support",
          supports: ["software and architectural form", "real-time visitor messaging", "digital wall"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NTER-CHNG-ANH-KC-2011",
          relationship: "direct-support",
          supports: ["artist-statement concept", "public many-to-many exchange"],
          locator: "Artist's Statement",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the intended interaction and observable interface without converting the artist statement into measured impact.",
        "Keep the system credit collective until role-specific evidence is recovered."
      ],
      antiClaims: [
        "Jamie was the sole software architect",
        "The installation proved a lasting change in participant behavior",
        "Every visitor participated",
        "The archived description establishes audience scale"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-WAYBACK-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-NTER-CHNG-AMERICA-NOW-HERE",
      project: "nter-chng",
      internalClaim:
        "America: Now and Here's archived Kansas City site included NTER CHNG in its visual-artists program and credited Drew Bolton, Jamie Burkart, and Garrett Fuselier during the exhibition's May 2011 Kansas City launch.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "In 2011, America: Now and Here's Kansas City visual-artists program included NTER CHNG and credited Drew Bolton, Jamie Burkart, and Garrett Fuselier.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/nter-chng"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NTER-CHNG-ANH-KC-2011",
          relationship: "direct-support",
          supports: ["visual-artists listing", "collective credit", "NTER CHNG artist statement"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NTER-CHNG-NERMAN-2011",
          relationship: "context",
          supports: ["Kansas City launch context", "local and national artist structure", "May 2011 timing"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe Jamie as one of three credited NTER CHNG artists, not as a solo participant.",
        "The Nerman page establishes exhibition context; the archived exhibition artist page supplies the NTER CHNG connection.",
        "Do not imply Jamie organized, curated, or led the national exhibition."
      ],
      antiClaims: [
        "Jamie was a nationally selected solo artist in America: Now and Here",
        "Jamie organized or curated America: Now and Here",
        "The Nerman Museum page independently names NTER CHNG",
        "NTER CHNG was presented at every venue on the national tour"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-WAYBACK-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-NTER-CHNG-ROLE-AND-TECHNICAL-DETAIL",
      project: "nter-chng",
      question:
        "What do recoverable records and collaborator accounts establish about NTER CHNG's technical architecture, production process, exact dates, and each contributor's role?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Search public-safe project archives for diagrams, code, photographs, programs, and approved production notes",
        "Request bounded collaborator confirmation from Drew Bolton, Garrett Fuselier, and Mary Nichols",
        "Continue Wayback and institutional searches for the original press release and exhibition program",
        "Separate technical implementation, scenic design, fabrication, motion graphics, and production credits"
      ],
      successCriteria: [
        "Assign no role without a dated source or collaborator confirmation",
        "Recover the original exhibition date range or retain it as unresolved",
        "Document the technical stack without exposing unsafe artifacts",
        "Preserve complete collective credit"
      ],
      sourceIds: [
        "SRC-NTER-CHNG-PROJECT-SITE-2011",
        "SRC-NTER-CHNG-PITCH-2010",
        "SRC-NTER-CHNG-VIMEO-2011",
        "SRC-NTER-CHNG-ANH-KC-2011"
      ],
      claimIds: [
        "CLM-NTER-CHNG-CO-CREATION",
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM"
      ],
      publicSummary:
        "Research the collaborators' exact roles and the installation's technical implementation before making role-specific claims.",
      reviewedAt: "2026-07-15"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NTER-CHNG-WAYBACK-2026",
      project: "nter-chng",
      question:
        "Can the NTER CHNG project site and America: Now and Here's own record of the project be recovered from the Wayback Machine?",
      methods: [
        "Inventoried deduplicated Wayback captures for nterchng.com from 2011 through 2014.",
        "Inventoried 2010-2013 captures for americanowandhere.org and its Kansas City subdomain.",
        "Searched recovered URLs and page bodies for the project and collaborator names.",
        "Cross-checked the pages against The Pitch, Vimeo metadata, and the Nerman Museum record."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "The archived NTER CHNG landing page directly credits Bolton, Burkart, and Fuselier.",
        "A later project-site capture preserves a Vimeo embed for the surviving project video.",
        "America: Now and Here's archived Kansas City site preserves a dedicated visual-artists page with the NTER CHNG artist statement.",
        "The original project's linked press-release PDF was not recovered in the reviewed CDX inventory."
      ],
      limitations: [
        "The missing press release is not evidence that no copy survives elsewhere.",
        "The recovered pages do not assign each collaborator's exact responsibilities.",
        "No audience count, message corpus, technical source code, or original exhibition program was recovered.",
        "The artist page establishes Kansas City inclusion, not presentation at every national-tour venue."
      ],
      sourceIds: [
        "SRC-NTER-CHNG-PROJECT-SITE-2011",
        "SRC-NTER-CHNG-PITCH-2010",
        "SRC-NTER-CHNG-VIMEO-2011",
        "SRC-NTER-CHNG-ANH-KC-2011",
        "SRC-NTER-CHNG-NERMAN-2011"
      ],
      publicSummary:
        "The project site and America: Now and Here's own artist page were recovered; the linked original press release was not recovered in this pass."
    }
  ],
  pages: []
};
