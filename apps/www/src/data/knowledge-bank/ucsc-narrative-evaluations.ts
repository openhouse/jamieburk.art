import type { KnowledgeBank } from "./schema.ts";

export const ucscNarrativeEvaluationIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-UCSC-MORSE-SACK-EVALUATIONS",
    receivedAt: "2026-07-15",
    inputKind: "document",
    summary:
      "Protected UCSC narrative evaluations by Margaret Morse and Warren Sack, a held 2014 recommendation screenshot, and contemporaneous public reporting develop the record of Jamie's embodied media practice, social-information prototyping, participatory environments, and collective installation design.",
    projectIds: ["creative-technology-and-media", "open-house"],
    researchStatus: "needs-more-research",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
      "SRC-MARGARET-MORSE-RECOMMENDATION-2014",
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"
    ],
    observationIds: [
      "OBS-MORSE-MEDIA-ARCHAEOLOGY-2006",
      "OBS-MORSE-EMBODIED-THEORY-2006",
      "OBS-MORSE-TIME-IS-LONG-2006",
      "OBS-MORSE-RECOMMENDATION-2014",
      "OBS-SACK-DICTIONARY-SOCIAL-NETWORK-WORK-2004",
      "OBS-SACK-STRUCTURAL-EQUIVALENCE-PROTOTYPE-2006",
      "OBS-SACK-COLLECTIVE-PHYSICAL-BROWSING-DESIGN-2006",
      "OBS-OPEN-HOUSE-SOCIAL-SOFTWARE-FRAME-2006"
    ],
    claimIds: [
      "CLM-UCSC-EMBODIED-MEDIA-PRACTICE",
      "CLM-UCSC-SOCIAL-INFORMATION-PROTOTYPING"
    ],
    researchInquiryIds: ["INQ-TIME-IS-LONG-INSTALLATION-2026"],
    nextActions: [
      "Seek a public or institutionally verifiable UCSC narrative-evaluation record before quoting the unofficial copy on the website.",
      "Recover the exact venue, date, installed-view documentation, and production credits for Time is Long without conflating it with the separately documented BAPLab listing.",
      "Use the lenses to preserve artistic, social, civic, and technical continuity without turning academic praise into claims about every later professional outcome."
    ]
  }
];

export const ucscNarrativeEvaluationSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
    title: "UCSC narrative evaluations for Jamie Burkart",
    organization: "University of California, Santa Cruz",
    author: "Margaret Morse and Warren Sack",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Unofficial copy covering 2004 and 2006 courses; reviewed July 15, 2026",
    publicCitation:
      "UC Santa Cruz narrative evaluations for Jamie Burkart, courses taught by Warren Sack and Margaret Morse, 2004-2006; unofficial copy reviewed July 15, 2026.",
    publicNote:
      "Protected academic record describing Jamie's course projects, participation, prototypes, media-archaeology work, embodied responses to theory, and collective installation design.",
    supportsGenerally: [
      "Margaret Morse's evaluation of Jamie as an artist and media archaeologist",
      "Morse's account of embodied and performative responses to visual-culture and new-media theory",
      "Morse's statement that Time is Long was realized as a New York gallery installation",
      "Warren Sack's account of Jamie's dictionary-source program and social-network analysis",
      "Sack's account of a Flickr structural-equivalence and image-analysis prototype with an interactive Max/MSP Jitter interface",
      "Sack's account of Jamie's contribution to a collectively designed physical Flickr-browsing installation"
    ],
    doesNotEstablish: [
      "an official certified transcript",
      "permission to publish the complete narrative evaluations",
      "the exact venue or date of Time is Long",
      "that the BAPLab listing was Time is Long",
      "historical priority for the concept of structural equivalence",
      "production deployment or adoption of course prototypes",
      "Jamie's sole authorship of group work",
      "that an alternate spelling inside one evaluation refers to a different student"
    ],
    protectedLocatorId: "LOC-UCSC-NARRATIVE-EVALS-MORSE-SACK"
  },
  {
    id: "SRC-MARGARET-MORSE-RECOMMENDATION-2014",
    title: "Margaret Morse recommendation for Jamie Burkart",
    organization: "LinkedIn",
    author: "Margaret Morse",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Public-profile recommendation dated September 4, 2014; screenshot reviewed July 15, 2026",
    publicCitation:
      "Margaret Morse, public-profile recommendation for Jamie Burkart, September 4, 2014; screenshot reviewed July 15, 2026.",
    publicNote:
      "Held screenshot in which Morse identifies herself as Jamie's teacher and installation-project adviser and recommends him without reservation.",
    supportsGenerally: [
      "Morse's teacher and adviser relationship to Jamie",
      "her description of an ambitious installation completed with dedication",
      "her recollection that the work conveyed a lasting insight",
      "her description of Jamie as warm, generous, and serious about his work"
    ],
    doesNotEstablish: [
      "the installation title, venue, date, or complete credits",
      "permission to republish the screenshot",
      "the outcome of every project Jamie completed",
      "current LinkedIn profile state"
    ],
    protectedLocatorId: "LOC-MARGARET-MORSE-RECOMMENDATION-2014",
    media: {
      mediaKind: "screenshot",
      rightsStatus: "unknown",
      consentStatus: "review-needed",
      publicDisplayStatus: "hold"
    }
  }
];

export const ucscNarrativeEvaluationObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-MORSE-MEDIA-ARCHAEOLOGY-2006",
    sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
    project: "creative-technology-and-media",
    text: "Margaret Morse's Visual Culture and Technology evaluation records Jamie bringing early home-video equipment, home movies with video feedback, and an early video synthesizer into class, and characterizes him as an artist and media archaeologist.",
    locator: "Visual Culture and Technology narrative evaluation, Spring 2006",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-UCSC-EMBODIED-MEDIA-PRACTICE"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-MORSE-EMBODIED-THEORY-2006",
    sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
    project: "creative-technology-and-media",
    text: "Across two Spring 2006 evaluations, Morse says Jamie demonstrated theoretical mastery by embodying concepts and responses in artistic and performative forms, including an art-life performance grounded in attention.",
    locator: "Visual Culture and Technology and New Media Theory Seminar narrative evaluations, Spring 2006",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-UCSC-EMBODIED-MEDIA-PRACTICE"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-MORSE-TIME-IS-LONG-2006",
    sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
    project: "creative-technology-and-media",
    text: "Morse's New Media Theory Seminar evaluation says Jamie's Time is Long proposal was realized as an installation presented in a New York City gallery and connected its form to real and recorded time.",
    locator: "New Media Theory Seminar narrative evaluation, Spring 2006",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-UCSC-EMBODIED-MEDIA-PRACTICE"],
    researchInquiryIds: ["INQ-TIME-IS-LONG-INSTALLATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-MORSE-RECOMMENDATION-2014",
    sourceId: "SRC-MARGARET-MORSE-RECOMMENDATION-2014",
    project: "creative-technology-and-media",
    text: "A held screenshot of Margaret Morse's 2014 public-profile recommendation identifies her as Jamie's former teacher and installation adviser, describes the installation as ambitious and successful, and recommends Jamie without reservation.",
    locator: "Visible recommendation text and relationship metadata",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-UCSC-EMBODIED-MEDIA-PRACTICE"],
    researchInquiryIds: ["INQ-TIME-IS-LONG-INSTALLATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex screenshot review"]
  },
  {
    id: "OBS-SACK-DICTIONARY-SOCIAL-NETWORK-WORK-2004",
    sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
    project: "creative-technology-and-media",
    text: "Warren Sack's Introduction to Digital Media evaluation records Jamie presenting a program that used online dictionary sources and writing a source-supported analysis of social networks across physical and online space.",
    locator: "Introduction to Digital Media narrative evaluation, Spring 2004",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-UCSC-SOCIAL-INFORMATION-PROTOTYPING"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-SACK-STRUCTURAL-EQUIVALENCE-PROTOTYPE-2006",
    sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
    project: "creative-technology-and-media",
    text: "Sack's Social Information Spaces evaluation characterizes Jamie as independently arriving at the social-network-analysis concept of structural equivalence, then applying it recursively in a Flickr photo-similarity prototype that combined participant relationships, image analysis, and an interactive Max/MSP Jitter interface.",
    locator: "Social Information Spaces narrative evaluation, Winter 2006, weekly-assignment and prototype sections",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-UCSC-SOCIAL-INFORMATION-PROTOTYPING"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-SACK-COLLECTIVE-PHYSICAL-BROWSING-DESIGN-2006",
    sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
    project: "creative-technology-and-media",
    text: "Sack records Jamie and classmates co-designing two architectures for a movement-sensing, wall-projected installation that translated Flickr browsing into a physical walk; the group documented the designs through Maya models, films, sketches, diagrams, prose, and an HTML mock-up.",
    locator: "Social Information Spaces narrative evaluation, Winter 2006, final-project section",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-UCSC-SOCIAL-INFORMATION-PROTOTYPING"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex protected-document review"]
  },
  {
    id: "OBS-OPEN-HOUSE-SOCIAL-SOFTWARE-FRAME-2006",
    sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
    project: "open-house",
    text: "Good Times reports Jamie relating Open House to social software through the experience of seeing oneself represented in relation to other people and things; the article also documents communal decision-making, participation, and distributed documentation.",
    locator: "Community on Display and project-governance sections",
    status: "verified",
    confidence: "high",
    claimIds: [
      "CLM-UCSC-EMBODIED-MEDIA-PRACTICE",
      "CLM-UCSC-SOCIAL-INFORMATION-PROTOTYPING"
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex PDF text and rendered-page review"]
  }
];

export const ucscNarrativeEvaluationClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-UCSC-EMBODIED-MEDIA-PRACTICE",
    project: "creative-technology-and-media",
    internalClaim:
      "Margaret Morse's evaluations and contemporaneous public reporting document an early Jamie practice in which media archaeology, embodied theory, performance, close attention, hospitality, and participatory environments were connected rather than reduced to conventional written or object-based output.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Margaret Morse's evaluations and contemporary reporting document Jamie connecting media archaeology, embodied theory, performance, attention, hospitality, and participatory environments in his early practice.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/research/ucsc-morse-sack-evaluations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
        relationship: "private-support",
        supports: ["media archaeology", "embodied theory", "performance", "Time is Long"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-MARGARET-MORSE-RECOMMENDATION-2014",
        relationship: "corroborating",
        supports: ["teacher and adviser relationship", "installation dedication", "strong recommendation"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
        relationship: "direct-support",
        supports: ["participatory environment", "hospitality", "art-life frame", "distributed documentation"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The UCSC document is an unofficial copy and should be attributed as an instructor evaluation, not an independently audited project record.",
      "The Open House record requires collective credit for housemates, residents, visitors, and participant-created work.",
      "The recommendation screenshot remains held pending rights and contextual review."
    ],
    antiClaims: [
      "Jamie authored every participant contribution.",
      "The academic evaluations establish every later professional outcome.",
      "Jamie's professional value can be reduced to either artistic expression or organizational utility alone.",
      "The recommendation screenshot is cleared for republication."
    ],
    researchInquiryIds: ["INQ-TIME-IS-LONG-INSTALLATION-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-UCSC-SOCIAL-INFORMATION-PROTOTYPING",
    project: "creative-technology-and-media",
    internalClaim:
      "Warren Sack's evaluations document Jamie investigating social structure recursively and moving among source-backed analysis, software prototypes, image analysis, interface design, and collectively designed physical information environments.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Warren Sack's evaluations document Jamie moving among recursive social-network analysis, software prototypes, image analysis, interface design, and collective physical information environments.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/research/ucsc-morse-sack-evaluations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
        relationship: "private-support",
        supports: ["recursive social-network analysis", "Flickr prototype", "interactive interface", "collective installation design"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
        relationship: "corroborating",
        supports: ["physical and social environment", "social-software interpretation", "seeing oneself in relation"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Attribute the structural-equivalence insight to Sack's evaluation rather than claiming historical invention or priority.",
      "Describe the Flickr and installation work as course prototypes and designs, not production deployments.",
      "Credit classmates collectively for the final installation design."
    ],
    antiClaims: [
      "Jamie invented structural equivalence as a field concept.",
      "The course prototypes were deployed products with measured adoption.",
      "Jamie solely designed the physical Flickr installation.",
      "The academic record proves every later product or civic outcome."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  }
];

export const ucscNarrativeEvaluationResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-TIME-IS-LONG-INSTALLATION-2026",
    project: "creative-technology-and-media",
    question:
      "What public or independently verifiable records establish the exact venue, date, configuration, credits, and reception of Jamie's Time is Long installation?",
    methods: [
      "Search UCSC, New York gallery, BAPLab, calendar, program, correspondence, and photographic records for the exact title.",
      "Ask Margaret Morse and project collaborators for bounded correction or corroboration if appropriate.",
      "Keep the Morse evaluation's New York gallery statement distinct from the separately recovered BAPLab listing unless a source connects them."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Morse's protected narrative evaluation says Time is Long was realized and presented in a New York City gallery.",
      "The held 2014 recommendation recalls an ambitious installation she advised but does not name it.",
      "A separately recovered BAPLab program lists Jamie in a 2006 New Media program but does not identify the work title."
    ],
    limitations: [
      "No reviewed source yet connects Time is Long by title to BAPLab, an exact venue, a date, installed-view media, or complete credits.",
      "The narrative-evaluation source is an unofficial copy and the recommendation screenshot is not cleared for republication.",
      "Similarity of year, city, medium, or adviser context is not enough to merge records."
    ],
    sourceIds: [
      "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006",
      "SRC-MARGARET-MORSE-RECOMMENDATION-2014",
      "SRC-BAPLAB-OFFICIAL-PROGRAM-WAYBACK-2006",
      "SRC-BAPLAB-WAVE-FARM-PROGRAM-2006"
    ],
    publicSummary:
      "An instructor evaluation supports that Time is Long was realized in a New York gallery; exact venue, date, configuration, credits, and any connection to the recovered BAPLab listing remain open."
  }
];
