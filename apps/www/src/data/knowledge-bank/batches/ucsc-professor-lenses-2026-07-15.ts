import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedAt = "2026-07-15";
const archivalReviewers = [
  "Jamie Burkart",
  "Codex protected educational-record review"
];
const publicReviewers = ["Jamie Burkart", "Codex public-source review"];

export const ucscProfessorLensesBatch20260715: {
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
      id: "INT-UCSC-NARRATIVE-EVALUATIONS-2026",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Review Warren Sack's and Margaret Morse's 2004-2006 narrative evaluations for bounded evidence of embodied media practice and social-information-systems lineage.",
      projects: ["participatory-programs"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
        "SRC-UCSC-NARRATIVE-TRANSCRIPTION-2026"
      ],
      claimIds: [
        "CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE",
        "CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE",
        "CLM-UCSC-INSTALLATION-TITLE-CONFLICT"
      ],
      researchTaskIds: ["TASK-UCSC-PUBLIC-PRESERVATION-AND-TITLE"],
      notes: [
        "The educational record, student identifier, grades, private locator, and full evaluation text are excluded from the public repository.",
        "The recovered source file records the installation title as Art is Long; the supplied transcription records Time is Long. Neither title is promoted as settled."
      ],
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "INT-UCSC-MORSE-RECOMMENDATION-2014",
      kind: "artifact-lead",
      capturedAt: reviewedAt,
      capturedFrom: "User-supplied screenshot of a public-facing recommendation",
      publicSafeSummary:
        "Preserve metadata and a bounded paraphrase of Margaret Morse's 2014 recommendation without republishing the screenshot or full text.",
      projects: ["participatory-programs"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: ["SRC-UCSC-MORSE-RECOMMENDATION-2014"],
      claimIds: ["CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE"],
      researchTaskIds: ["TASK-UCSC-PUBLIC-PRESERVATION-AND-TITLE"],
      notes: [
        "The screenshot remains outside the repository pending rights and public-display review.",
        "The recommendation is historical corroboration, not review of the current portfolio candidate."
      ],
      reviewedAt,
      reviewedBy: archivalReviewers
    }
  ],
  sources: [
    {
      id: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      title:
        "UCSC narrative evaluations: digital media, social information spaces, visual culture, and new media theory",
      organization: "University of California, Santa Cruz",
      author: "Warren Sack and Margaret Morse",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe metadata review of unofficial UCSC narrative evaluations by Warren Sack and Margaret Morse, 2004-2006; educational record and locator not published.",
      publicNote:
        "The evaluations describe Jamie's historical student work in digital-media analysis, social software, interactive prototyping, embodied theory, media archaeology, and installation practice.",
      protectedLocatorId: "ARCHIVE-UCSC-NARRATIVE-EVALS-2004-2006",
      supportsGenerally: [
        "historical instructor descriptions of Jamie's student work",
        "early social-software analysis and interactive prototyping",
        "embodied media-theory and installation practice",
        "collective credit for a course installation design"
      ],
      doesNotEstablish: [
        "official-transcript status",
        "current production expertise or present-day performance",
        "independent invention of structural equivalence as Jamie's public claim",
        "publication permission for the complete educational record"
      ]
    },
    {
      id: "SRC-UCSC-NARRATIVE-TRANSCRIPTION-2026",
      title: "User-supplied transcription of selected UCSC narrative evaluations",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation:
        "Public-safe review of a user-supplied transcription of selected UCSC narrative evaluations, received July 15, 2026; underlying educational record not published.",
      publicNote:
        "The transcription preserves selected Warren Sack and Margaret Morse evaluations but differs from the recovered source file on one installation title.",
      protectedLocatorId: "ARCHIVE-UCSC-NARRATIVE-TRANSCRIPTION-2026",
      supportsGenerally: [
        "a second transcription surface for the selected evaluations",
        "the Time is Long title reading supplied in 2026"
      ],
      doesNotEstablish: [
        "which conflicting installation-title reading is correct",
        "official-transcript status",
        "permission to publish the complete evaluation text"
      ]
    },
    {
      id: "SRC-UCSC-MORSE-RECOMMENDATION-2014",
      title: "Margaret Morse recommendation for Jamie Burkart",
      organization: "LinkedIn",
      author: "Margaret Morse",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2014-09-04",
      accessedAt: reviewedAt,
      publicCitation:
        "Margaret Morse, public-facing recommendation for Jamie Burkart, September 4, 2014; user-supplied screenshot reviewed July 15, 2026.",
      publicNote:
        "Morse described Jamie as a dedicated and creative former student, recalled advising an ambitious installation, and recommended him without reservation.",
      protectedLocatorId: "ARCHIVE-UCSC-MORSE-RECOMMENDATION-2014",
      media: {
        mediaKind: "screenshot",
        rightsStatus: "unknown",
        consentStatus: "review-needed",
        publicDisplayStatus: "metadata-only"
      },
      supportsGenerally: [
        "Margaret Morse's historical teacher and advisor relationship",
        "her positive assessment of Jamie's creativity, dedication, and installation work"
      ],
      doesNotEstablish: [
        "review of the current portfolio candidate",
        "present-day job performance",
        "rights clearance to republish the screenshot or full recommendation"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-UCSC-MORSE-EMBODIED-THEORY",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "participatory-programs",
      assertion:
        "Margaret Morse described Jamie as demonstrating theoretical understanding through embodied and performative work rather than writing alone.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-MORSE-MEDIA-ARCHAEOLOGY",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "participatory-programs",
      assertion:
        "Morse described Jamie's use of early video equipment and synthesis tools as evidence of artistic and media-archaeology ability.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-MORSE-INSTALLATION-TITLE-RAW",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "participatory-programs",
      assertion:
        "The recovered source file records the New York installation title as Art is Long.",
      relationship: "raises-question",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-INSTALLATION-TITLE-CONFLICT"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-MORSE-INSTALLATION-TITLE-TRANSCRIPTION",
      sourceId: "SRC-UCSC-NARRATIVE-TRANSCRIPTION-2026",
      project: "participatory-programs",
      assertion:
        "The user-supplied transcription records the same New York installation title as Time is Long, contradicting the recovered source-file reading.",
      relationship: "contradicts",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-INSTALLATION-TITLE-CONFLICT"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-SACK-DICTIONARY-PROGRAM",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "participatory-programs",
      assertion:
        "Warren Sack's 2004 evaluation describes a Jamie-authored program using online dictionary sources and a source-supported analysis of social networks across physical and online space.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-SACK-RECURSIVE-SOCIAL-ANALYSIS",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "participatory-programs",
      assertion:
        "Sack's 2006 evaluation describes Jamie recursively analyzing overlapping Flickr group memberships to reason about social structure.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-SACK-IMAGE-PROTOTYPE",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "participatory-programs",
      assertion:
        "Sack describes Jamie prototyping related-photo search from social similarity and image analysis, then designing and demonstrating an interface with Max/MSP Jitter.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-SACK-COLLECTIVE-INSTALLATION",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      project: "participatory-programs",
      assertion:
        "Sack credits Jamie as one member of a student group that designed a sensor- and projection-based installation for browsing Flickr through physical movement, documented in multiple media.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-UCSC-MORSE-RECOMMENDATION",
      sourceId: "SRC-UCSC-MORSE-RECOMMENDATION-2014",
      project: "participatory-programs",
      assertion:
        "In a 2014 public-facing recommendation, Morse recalled advising Jamie on an ambitious installation and described his creativity, dedication, generosity, and seriousness.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "AST-OPEN-HOUSE-MORSE-TENDING",
      sourceId: "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006",
      project: "participatory-programs",
      assertion:
        "Good Times quotes Morse saying Open House worked because Jamie remained present and tended it, while also reporting the group's communal responsibility and decisions.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-PARTICIPATION-ART-SOCIAL-SYSTEMS-THRESHOLD",
        "CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy: publicReviewers
    },
    {
      id: "AST-OPEN-HOUSE-DISTRIBUTED-DOCUMENTATION",
      sourceId: "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006",
      project: "participatory-programs",
      assertion:
        "The article describes continuous and distributed documentation that let participants record multiple perspectives and observe how representation changed their behavior.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-PARTICIPATION-ART-SOCIAL-SYSTEMS-THRESHOLD"],
      publicSafe: true,
      reviewedAt,
      reviewedBy: publicReviewers
    },
    {
      id: "AST-OPEN-HOUSE-SOCIAL-SOFTWARE-RELATION",
      sourceId: "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006",
      project: "participatory-programs",
      assertion:
        "The article connects Jamie's Open House thinking with Warren Sack's social-software course and quotes Jamie describing explicit representation in relation to other people and things.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-PARTICIPATION-ART-SOCIAL-SYSTEMS-THRESHOLD",
        "CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE"
      ],
      publicSafe: true,
      reviewedAt,
      reviewedBy: publicReviewers
    }
  ],
  claims: [
    {
      id: "CLM-PARTICIPATION-ART-SOCIAL-SYSTEMS-THRESHOLD",
      project: "participatory-programs",
      internalClaim:
        "Contemporaneous reporting connects Jamie's early participatory-art practice with social-software thinking, communal decision-making, attentive tending, and distributed documentation.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "homepage",
          text:
            "Before I called this operations work, I was building participatory-art and social-software experiments: shared situations where people could see themselves in relation to a place, a system, and one another. That practice still shapes how I build operating structure. I pay attention to the people, materials, histories, and relationships already present, then create forms they can inhabit, question, and carry forward together.",
          status: "active",
          citationRequired: true,
          surfaces: ["/about"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006",
          relationship: "direct-support",
          supports: [
            "participatory-art and social-software connection",
            "communal responsibility and decision-making",
            "attentive tending and distributed documentation"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Present this as a throughline from a documented collective experiment, not proof that Jamie authored participant experience or invented social software.",
        "The present-day operating interpretation is Jamie's synthesis; the historical facts remain bounded to the public article."
      ],
      antiClaims: [
        "Jamie was Open House's sole leader or author",
        "Jamie invented social software",
        "Open House measured durable participant or housing outcomes"
      ],
      researchInquiryIds: ["INQ-UCSC-PROFESSOR-LENSES-2026"],
      reviewedAt,
      reviewedBy: publicReviewers
    },
    {
      id: "CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE",
      project: "participatory-programs",
      internalClaim:
        "Margaret Morse's historical evaluations, later recommendation, and contemporaneous Open House commentary support a lineage of embodied conceptual work, media archaeology, attentive tending, and participatory installation practice.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Historical instructor and public records describe Jamie's early practice as joining embodied media theory, media archaeology, attentive tending, and participatory installation.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
          relationship: "private-support",
          supports: [
            "embodied and performative theory practice",
            "media-archaeology description",
            "historical installation context"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-UCSC-MORSE-RECOMMENDATION-2014",
          relationship: "corroborating",
          supports: ["historical advisor relationship and installation assessment"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006",
          relationship: "corroborating",
          supports: ["Morse's public commentary on tending and attention"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Keep the educational record protected and paraphrase only public-safe metadata unless Jamie separately approves quotation.",
        "Historical instructor assessment does not establish current job performance or review the current portfolio candidate."
      ],
      antiClaims: [
        "Margaret Morse reviewed or endorsed this portfolio candidate",
        "Historical praise proves current professional outcomes",
        "Jamie alone authored the collective installations discussed"
      ],
      researchInquiryIds: ["INQ-UCSC-PROFESSOR-LENSES-2026"],
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE",
      project: "participatory-programs",
      internalClaim:
        "Warren Sack's historical evaluations document Jamie analyzing recursive social relationships, prototyping social-and-image similarity search, designing an interactive interface, and co-designing a physical social-information installation.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Historical instructor records describe Jamie moving from recursive social analysis to prototype, interface, and a collectively designed physical information environment.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
          relationship: "private-support",
          supports: [
            "recursive Flickr group analysis",
            "social-and-image similarity prototype",
            "Max/MSP Jitter interface",
            "collective sensor- and projection-based installation design"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006",
          relationship: "corroborating",
          supports: [
            "contemporaneous connection between social software and physical communal space"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe the work as historical student research and prototyping, not current production delivery.",
        "Attribute the structural-equivalence interpretation to Warren Sack if ever quoted; do not turn it into an unqualified first-person invention claim.",
        "Credit the final installation design to the student group and keep individual component ownership unresolved."
      ],
      antiClaims: [
        "Jamie independently invented structural equivalence",
        "Jamie solely designed the student installation",
        "A course prototype was a deployed production search system"
      ],
      researchInquiryIds: ["INQ-UCSC-PROFESSOR-LENSES-2026"],
      reviewedAt,
      reviewedBy: archivalReviewers
    },
    {
      id: "CLM-UCSC-INSTALLATION-TITLE-CONFLICT",
      project: "participatory-programs",
      internalClaim:
        "Two reviewed transcription surfaces disagree on whether Margaret Morse's New Media Theory evaluation names Jamie's New York installation Art is Long or Time is Long.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The title of the New York installation remains unresolved across two reviewed transcription surfaces.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
          relationship: "private-support",
          supports: ["Art is Long title reading"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-UCSC-NARRATIVE-TRANSCRIPTION-2026",
          relationship: "contradicts",
          supports: ["Time is Long title reading"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Preserve both readings and do not normalize or project a title until another reliable source resolves the conflict.",
        "Resolving the title would not establish Jamie's sole authorship; installation credit remains with the student group described in the source record."
      ],
      antiClaims: [
        "The installation title is definitively Art is Long",
        "The installation title is definitively Time is Long",
        "Jamie solely authored the student installation"
      ],
      researchInquiryIds: ["INQ-UCSC-PROFESSOR-LENSES-2026"],
      reviewedAt,
      reviewedBy: archivalReviewers
    }
  ],
  researchTasks: [
    {
      id: "TASK-UCSC-PUBLIC-PRESERVATION-AND-TITLE",
      project: "participatory-programs",
      question:
        "Can public project artifacts, an official educational record, or collaborator confirmation resolve the installation title and support selective publication of the early media-practice lineage?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Search public and archived project records for the New York installation.",
        "Compare any official UCSC record with the recovered unofficial copy.",
        "Request bounded publication and quotation preferences from Margaret Morse and Warren Sack where appropriate.",
        "Preserve collective credit for student and participatory installations."
      ],
      successCriteria: [
        "Resolve or explicitly retain the title conflict with source citations.",
        "Identify which instructor-attributed details may be quoted publicly.",
        "Recover public artifacts for the dictionary program, Flickr prototype, or installation if they survive.",
        "Keep educational identifiers, grades, correspondence, and private locators outside the public repository."
      ],
      sourceIds: [
        "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
        "SRC-UCSC-NARRATIVE-TRANSCRIPTION-2026",
        "SRC-UCSC-MORSE-RECOMMENDATION-2014",
        "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006"
      ],
      claimIds: [
        "CLM-UCSC-MORSE-EMBODIED-MEDIA-LINEAGE",
        "CLM-UCSC-SACK-SOCIAL-INFORMATION-LINEAGE",
        "CLM-UCSC-INSTALLATION-TITLE-CONFLICT"
      ],
      publicSummary:
        "Resolve a conflicting installation title and recover public artifacts before promoting protected instructor evaluations into broader portfolio claims.",
      reviewedAt
    }
  ],
  researchInquiries: [
    {
      id: "INQ-UCSC-PROFESSOR-LENSES-2026",
      project: "participatory-programs",
      question:
        "What public-safe, source-backed portfolio criteria do Margaret Morse's and Warren Sack's historical evaluations support?",
      methods: [
        "Compared the supplied transcription with the recovered unofficial narrative-evaluation file.",
        "Close-read and visually inspected the supplied Good Times Open House PDF.",
        "Reviewed the user-supplied recommendation screenshot as metadata-only evidence.",
        "Separated public article support, protected educational-record support, interpretation, and unresolved conflict."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Morse's record supports evaluating embodied thought, media archaeology, attentive tending, and participation without reducing all value to organizational utility.",
        "Sack's record supports evaluating recursive social analysis, prototyping, interface design, physical-digital translation, and collective system design.",
        "Good Times publicly corroborates one threshold joining participatory art, social software, communal decisions, tending, and distributed documentation.",
        "The recovered file and supplied transcription disagree on one installation title."
      ],
      limitations: [
        "The narrative evaluations are an unofficial protected educational record.",
        "The recommendation screenshot is metadata-only pending rights and public-display review.",
        "Historical course performance does not establish present-day professional outcomes.",
        "No public artifact for the dictionary program, Flickr prototype, or course installation was recovered in this pass."
      ],
      sourceIds: [
        "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
        "SRC-UCSC-NARRATIVE-TRANSCRIPTION-2026",
        "SRC-UCSC-MORSE-RECOMMENDATION-2014",
        "SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006"
      ],
      publicSummary:
        "A July 2026 review recovered two complementary portfolio lenses and one public-source-backed throughline while keeping the educational record protected and one installation title unresolved.",
      protectedLocatorId: "RESEARCH-UCSC-PROFESSOR-LENSES-2026"
    }
  ],
  pages: [
    {
      id: "about",
      surface: "/about",
      sourceOrder: ["SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006"],
      occurrences: [
        {
          id: "participatory-social-systems-throughline",
          claimId: "CLM-PARTICIPATION-ART-SOCIAL-SYSTEMS-THRESHOLD",
          projection: "homepage",
          sourceIds: ["SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006"]
        }
      ]
    }
  ]
};
