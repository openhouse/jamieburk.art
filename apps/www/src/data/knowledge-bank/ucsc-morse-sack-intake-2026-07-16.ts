import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const ucscMorseSackSourceRecords20260716 = [
  {
    id: "SRC-UCSC-NARRATIVE-EVALS-UNOFFICIAL-2004-2006",
    title: "Unofficial UCSC narrative-evaluation transcript for courses taught by Margaret Morse and Warren Sack",
    organization: "University of California, Santa Cruz",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-16",
    publicCitation: "Unofficial UCSC narrative-evaluation transcript covering four 2004-2006 courses (protected educational record).",
    publicNote: "The transcript informs the Morse and Sack evaluation lenses. Exact grades, scores, identifiers, and full narrative text remain protected and are not projected as public testimony.",
    supportsGenerally: [
      "Margaret Morse evaluated Jamie's embodied and performative demonstrations of media-theory concepts",
      "the transcript attributes media-archaeology practice and the Time is Long installation to Jamie",
      "Warren Sack evaluated Jamie's social-software analysis, Flickr prototype, interactive interface, and classroom contributions",
      "a final physical/digital installation design was collective student work"
    ],
    doesNotEstablish: [
      "official-transcript authenticity or completeness",
      "permission to publish the full evaluations or educational identifiers",
      "a present-day endorsement by either professor",
      "current production-software or machine-learning capability",
      "Jamie's sole authorship of the collaborative final installation design",
      "that structural equivalence originated with Jamie as a field-wide concept"
    ],
    protectedLocatorId: "PROTECTED-UCSC-NARRATIVE-EVALS-2004-2006"
  },
  {
    id: "SRC-MORSE-LINKEDIN-RECOMMENDATION-SCREENSHOT-2014",
    title: "Margaret Morse LinkedIn recommendation screenshot",
    author: "Margaret Morse",
    organization: "LinkedIn",
    kind: "firsthand-statement",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2014-09-04",
    accessedAt: "2026-07-16",
    publicCitation: "2014 LinkedIn recommendation attributed to Margaret Morse (screenshot held pending permission and stable public provenance).",
    publicNote: "The screenshot is retained as a source lead. It is not selected for public quotation or display in this update.",
    captureFingerprint: "sha256:ae60985f103da425fa5a27ed75861f80fc187547ec7d2121e434eb0b41288bdb",
    supportsGenerally: [
      "a recommendation attributed to Margaret Morse appeared in the supplied LinkedIn interface",
      "the recommendation describes Jamie as a former student and installation-project advisee"
    ],
    doesNotEstablish: [
      "a stable publicly accessible recommendation URL",
      "permission to republish the screenshot or full recommendation",
      "Margaret Morse's present-day view",
      "the identity of the specific installation without another source"
    ],
    protectedLocatorId: "PROTECTED-MORSE-LINKEDIN-RECOMMENDATION-2014",
    media: {
      mediaKind: "screenshot",
      rightsStatus: "permission-needed",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold",
      visibleText: [
        "Margaret Morse",
        "September 4, 2014",
        "LinkedIn recommendation interface"
      ]
    }
  },
  {
    id: "SRC-MORSE-JAMIE-CORRESPONDENCE-2007-2008",
    title: "Private correspondence between Margaret Morse and Jamie Burkart, 2007-2008",
    author: "Margaret Morse and Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-16",
    publicCitation: "Private post-course correspondence between Margaret Morse and Jamie Burkart, 2007-2008.",
    publicNote: "Held solely as protected relationship context. Email addresses, signatures, private messages, and quoted language are not public claim evidence.",
    supportsGenerally: [
      "Jamie and Margaret Morse remained in occasional contact after the UCSC courses"
    ],
    doesNotEstablish: [
      "permission to publish private correspondence",
      "a present-day endorsement",
      "independent verification of Jamie's project outcomes",
      "a continuing professional relationship"
    ],
    protectedLocatorId: "PROTECTED-MORSE-JAMIE-CORRESPONDENCE-2007-2008"
  }
] satisfies SourceRecord[];

export const ucscMorseSackClaimRecords20260716 = [
  {
    id: "CLM-OPEN-HOUSE-PARTICIPATORY-SYSTEM-2006",
    project: "open-house-ucsc",
    internalClaim: "A 2006 reported profile documents Jamie's Open House and earlier Shop Shows as participatory art and social-software experiments combining open invitation, communal governance, hospitality, shared making, and multi-perspective documentation.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "about",
        text: "Before I had product-operations language for this work, I was building participatory art and social-software experiments: communal spaces with shared governance, open invitations, and many ways for participants to document what happened.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
        relationship: "direct-support",
        locator: "Open House introduction; Shop Shows; UCSC Staff Investigates; A Tradition of Experiment; A Community on Display",
        supports: [
          "participatory art and communal-space practice",
          "shared governance and open invitation",
          "multi-perspective documentation",
          "an explicit relationship to social-software ideas"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Credit Open House residents, Shop Show participants, and collaborators collectively where the work was shared.",
      "Do not reproduce sensitive participant details or images from the historical article without separate review.",
      "The article supports the early lineage; the present-day connection is Jamie's reflective framing."
    ],
    antiClaims: [
      "Jamie alone authored every Open House activity or decision.",
      "Open House measured attendance, reach, adoption, or social impact.",
      "The 2006 project by itself proves current production-technology capability."
    ],
    researchInquiryIds: ["INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex public-safe source review"]
  },
  {
    id: "CLM-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE",
    project: "ucsc-digital-media",
    internalClaim: "An unofficial UCSC narrative-evaluation transcript attributes to Margaret Morse an assessment that Jamie demonstrated media-theory understanding through embodied, performative, installation, and media-archaeology practices, including Time is Long.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "A protected unofficial course record describes an early practice of understanding media theory through performance, installation, attention, and media archaeology.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-NARRATIVE-EVALS-UNOFFICIAL-2004-2006",
        relationship: "private-support",
        locator: "Visual Culture and Technology and New Media Theory Seminar narrative evaluations",
        supports: [
          "embodied and performative demonstrations of theory",
          "media-archaeology practice",
          "Time is Long as a realized installation"
        ],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "The source is an unofficial copy of an educational record and remains protected.",
      "Preserve the evaluations' discussion of writing requirements rather than extracting praise alone.",
      "A 2006 course evaluation is not a present-day endorsement or current competency assessment."
    ],
    antiClaims: [
      "Margaret Morse currently endorses every claim on this portfolio.",
      "The full narrative evaluations may be published without review.",
      "The evaluations establish every production detail of Time is Long."
    ],
    researchInquiryIds: ["INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
  },
  {
    id: "CLM-UCSC-SACK-SOCIAL-SOFTWARE-PROTOTYPES",
    project: "ucsc-digital-media",
    internalClaim: "An unofficial UCSC narrative-evaluation transcript attributes to Warren Sack an assessment of Jamie's early social-software analysis, recursive group-relationship insight, Flickr similarity prototype, Max/MSP Jitter interface, and contribution to a collective physical/digital installation design.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: "A protected unofficial course record describes early social-software analysis, a Flickr similarity prototype, an interactive Jitter interface, and a collective physical/digital installation design.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-NARRATIVE-EVALS-UNOFFICIAL-2004-2006",
        relationship: "private-support",
        locator: "Introduction to Digital Media and Social Information Spaces narrative evaluations",
        supports: [
          "early social-network and social-software analysis",
          "Flickr similarity prototype",
          "interactive Max/MSP Jitter interface",
          "collective design of a physical/digital photo-browsing installation"
        ],
        confidence: "moderate",
        renderCitation: false
      }
    ],
    boundaries: [
      "The source is an unofficial copy of an educational record and remains protected.",
      "Keep the final installation design collectively credited to the student group.",
      "Any structural-equivalence statement must remain attributed to Warren Sack's evaluation rather than presented as field-wide priority.",
      "Course prototypes do not establish present-day production ML, computer-vision, or social-network-analysis breadth."
    ],
    antiClaims: [
      "Jamie originated structural equivalence as a social-network-analysis concept.",
      "Jamie solely designed the collaborative final installation.",
      "The 2006 prototypes were deployed production systems.",
      "Warren Sack currently endorses every claim on this portfolio."
    ],
    researchInquiryIds: ["INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026"],
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
  }
] satisfies ClaimRecord[];

export const ucscMorseSackResearchInquiries20260716 = [
  {
    id: "INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026",
    project: "ucsc-digital-media",
    question: "What public-safe evidence can support the artistic, embodied, and social-software lineage described in protected UCSC records without publishing educational records or private correspondence?",
    methods: [
      "Close-read the supplied unofficial narrative-evaluation transcription while excluding its student identifier and exact educational metrics from public records.",
      "Close-read and visually inspect the supplied Good Times Santa Cruz PDF capture.",
      "Verify that the Good Times article remains live at its canonical public URL.",
      "Inspect the supplied LinkedIn recommendation screenshot as protected source metadata rather than publication permission.",
      "Separate private 2007-2008 correspondence from testimonial or project evidence.",
      "Compare the recovered evidence with the current portfolio's About, Technical Operations, and selected-work argument."
    ],
    runAt: "2026-07-16",
    resultStatus: "partially-recovered",
    findings: [
      "The public Good Times profile independently documents Open House and Shop Shows as participatory environments joining art, communal governance, hospitality, documentation, and social-software framing.",
      "The protected unofficial evaluations contain richer evidence of Margaret Morse's embodied-media lens and Warren Sack's social-software and prototyping lens.",
      "The recommendation screenshot is a potentially useful source lead but lacks stable public provenance and publication permission in the current review.",
      "The private correspondence is relationship context, not independent project corroboration or public testimonial material.",
      "A narrow public About-page lineage claim can rely on the published article without exposing the protected educational or correspondence records."
    ],
    limitations: [
      "No official UCSC transcript or institutionally hosted narrative evaluation was recovered in this pass.",
      "The supplied recommendation screenshot does not establish a stable public URL or current permission.",
      "The protected records do not by themselves establish present-day technical breadth.",
      "This pass did not attempt to publish Time is Long, course grades, test scores, private correspondence, or full professor quotations."
    ],
    sourceIds: [
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
      "SRC-UCSC-NARRATIVE-EVALS-UNOFFICIAL-2004-2006",
      "SRC-MORSE-LINKEDIN-RECOMMENDATION-SCREENSHOT-2014",
      "SRC-MORSE-JAMIE-CORRESPONDENCE-2007-2008"
    ],
    publicSummary: "A public 2006 profile supports a narrow artistic and social-systems lineage claim; richer educational and relationship records remain protected pending provenance and permission review.",
    protectedLocatorId: "RESEARCH-UCSC-MORSE-SACK-PROVENANCE-2026"
  }
] satisfies ResearchInquiry[];

export const ucscMorseSackIntakeRecords20260716 = [
  {
    id: "INTAKE-OPEN-HOUSE-GOOD-TIMES-ARTICLE-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex public-source review",
    kind: "artifact-lead",
    title: "Supplied PDF capture of the Good Times Santa Cruz Open House profile",
    publicSafeSummary: "A 2006 reported profile documents Open House and Shop Shows as participatory environments joining art, hospitality, communal governance, documentation, and social-software framing.",
    whyItMatters: "Provides public independent evidence for an early lineage connecting artistic, social, technical, and participatory systems practice.",
    projectHints: ["open-house-ucsc", "participatory-systems", "ucsc-digital-media"],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "unsurfaced",
    disposition: "linked-existing",
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
    claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-SYSTEM-2006"],
    inquiryIds: ["INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026"],
    limitations: [
      "The article is a reported profile, not proof of sole authorship, measured impact, present-day skill, or permission to republish sensitive participant details."
    ],
    nextActions: [
      "Maintain the live-link check and seek an archival preservation URL if the canonical article becomes fragile."
    ]
  },
  {
    id: "INTAKE-UCSC-NARRATIVE-EVALS-MORSE-SACK-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex protected-source review",
    kind: "artifact-lead",
    title: "Unofficial UCSC narrative evaluations by Margaret Morse and Warren Sack",
    publicSafeSummary: "A protected unofficial transcript preserves course evaluations describing embodied-media practice, media archaeology, social-software analysis, interface prototyping, and collective installation design.",
    whyItMatters: "Supplies historically specific lenses for testing whether the portfolio flattens Jamie into conventional administration or generic technical delivery.",
    projectHints: ["ucsc-digital-media", "open-house-ucsc", "participatory-systems"],
    maturity: "decomposed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "claim-candidate-created",
    sourceIds: ["SRC-UCSC-NARRATIVE-EVALS-UNOFFICIAL-2004-2006"],
    claimIds: [
      "CLM-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE",
      "CLM-UCSC-SACK-SOCIAL-SOFTWARE-PROTOTYPES"
    ],
    inquiryIds: ["INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026"],
    limitations: [
      "The source is unofficial, contains protected educational information, and does not establish current endorsement or present-day technical capability."
    ],
    nextActions: [
      "Seek an official or professor-approved public-safe record before selecting quotations, grades, scores, or course-specific claims for a public surface."
    ]
  },
  {
    id: "INTAKE-MORSE-LINKEDIN-RECOMMENDATION-SCREENSHOT-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex protected-source review",
    kind: "artifact-lead",
    title: "Margaret Morse LinkedIn recommendation screenshot",
    publicSafeSummary: "A supplied screenshot shows a 2014 recommendation attributed to Margaret Morse in LinkedIn's recommendation interface.",
    whyItMatters: "Could support a future approved collaborator statement, but only after provenance, stable-link, rights, and current-consent review.",
    projectHints: ["ucsc-digital-media", "open-house-ucsc"],
    maturity: "source-reviewed",
    publicUse: "approval-required",
    editorialState: "unsurfaced",
    disposition: "source-created",
    sourceIds: ["SRC-MORSE-LINKEDIN-RECOMMENDATION-SCREENSHOT-2014"],
    claimIds: [],
    inquiryIds: ["INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026"],
    limitations: [
      "The screenshot is not a stable public URL and does not establish present-day permission or endorsement."
    ],
    nextActions: [
      "Ask Margaret Morse for permission and approved wording before any public quotation or screenshot display."
    ]
  },
  {
    id: "INTAKE-MORSE-JAMIE-PRIVATE-CORRESPONDENCE-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex protected-source review",
    kind: "artifact-lead",
    title: "Private Margaret Morse and Jamie Burkart correspondence",
    publicSafeSummary: "Private post-course correspondence provides relationship context but is not needed for the public portfolio argument.",
    whyItMatters: "Recording the hold prevents private warmth or continuity from being silently converted into public testimonial evidence.",
    projectHints: ["ucsc-digital-media", "open-house-ucsc"],
    maturity: "source-reviewed",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "source-created",
    sourceIds: ["SRC-MORSE-JAMIE-CORRESPONDENCE-2007-2008"],
    claimIds: [],
    inquiryIds: ["INQ-UCSC-MORSE-SACK-PUBLIC-PROVENANCE-2026"],
    limitations: [
      "Email addresses, signatures, message text, and private invitations remain outside public records and are not independent corroboration."
    ],
    nextActions: [
      "Keep the correspondence protected unless both correspondents explicitly approve a narrow future use."
    ]
  },
  {
    id: "INTAKE-MORSE-SACK-LENS-PROCESS-SCREENSHOT-2026",
    capturedAt: "2026-07-16",
    capturedBy: "Jamie Burkart and Codex",
    kind: "artifact-lead",
    title: "Morse and Sack lens discussion screenshot",
    publicSafeSummary: "A process screenshot records the editorial concern that hiring-oriented evaluation can underrecognize artistic, relational, spatial, and experimental intelligence.",
    whyItMatters: "The concern belongs in the eval contract, but the screenshot itself is not evidence for a professional accomplishment.",
    projectHints: ["portfolio-evals", "ucsc-digital-media"],
    maturity: "captured",
    publicUse: "protected",
    editorialState: "unsurfaced",
    disposition: "held-protected",
    sourceIds: [],
    claimIds: [],
    inquiryIds: [],
    limitations: [
      "This is a screenshot of an editorial discussion, not an independent source or public artifact."
    ],
    nextActions: [
      "Translate the concern into versioned eval criteria and do not use the screenshot as claim evidence."
    ]
  }
] satisfies IntakeRecord[];
