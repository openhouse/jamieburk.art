import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const UCSC_PRACTICE_LINEAGE_PROJECTION =
  "My operating practice has an artistic lineage: a ten-day communal Open House I tended and the realized Time is Long installation that made elapsed time physical. I also prototyped an interface joining recursive social-network analysis with image comparison, and co-designed a documented proposal for browsing online photographs by moving through physical rooms. These were experiments in attention, atmosphere, participation, representation, and care, with value beyond organizational utility. The same inquiry continues through my civic, technical, and organizational work: form grows from the people, materials, relationships, and place already present.";

const intakeRecords = [
  {
    id: "INTAKE-2026-07-15-UCSC-PRACTICE-LENSES",
    receivedAt: "2026-07-15",
    kind: "artifact",
    project: "artistic-technical-practice-lineage",
    publicSummary:
      "Public reporting, protected UCSC narrative evaluations, and a protected recommendation support two portfolio lenses connecting Jamie's embodied artistic practice with recursive social-software and systems work.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: [
      "SRC-GOOD-TIMES-OPEN-HOUSE-2006",
      "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
      "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
      "SRC-MORSE-LINKEDIN-RECOMMENDATION-2014",
      "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
      "SRC-JAMIE-PRACTICE-LINEAGE-INTERPRETATION-2026"
    ],
    claimIds: [
      "CLM-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE-2006",
      "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SOFTWARE-2004-2006",
      "CLM-PRACTICE-LINEAGE-ART-TECHNOLOGY-PARTICIPATION"
    ],
    researchInquiryIds: ["INQ-UCSC-PRACTICE-LENSES-2026-07-15"],
    projectionIntent: "candidate-for-public-surface",
    nextActions: [
      "Use the public Open House and Time is Long records as the primary public source layer; treat the unofficial narrative evaluations and recommendation capture as protected corroboration.",
      "Preserve collaboration, participant agency, and the distinction between completed installations and course prototypes.",
      "Do not publish student identifiers, grades, raw educational records, private correspondence, contact details, or the recommendation image without a separate review."
    ],
    protectedLocatorId: "LOC-UCSC-PRACTICE-LENSES-2026-07-15",
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies IntakeRecord[];

const sources = [
  {
    id: "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
    title: "Margaret Morse narrative evaluations for two UCSC courses",
    organization: "University of California, Santa Cruz",
    author: "Margaret Morse",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Spring 2006",
    accessedAt: "2026-07-15",
    publicCitation:
      "Margaret Morse, UCSC narrative evaluations for Visual Culture and Technology and New Media Theory Seminar, Spring 2006. Unofficial student record; protected source.",
    publicNote:
      "The evaluations describe Jamie's media-archaeology work, embodied demonstrations of course ideas, and realization of Time is Long as a gallery installation.",
    protectedLocatorId: "LOC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
    supportsGenerally: [
      "Jamie's strong grasp of visual-culture and new-media theory",
      "presentations using early home-video and video-synthesis equipment",
      "an embodied and performative approach to demonstrating concepts",
      "realization of Time is Long as a gallery installation",
      "Margaret Morse's identification of Jamie as an artist and media archaeologist"
    ],
    doesNotEstablish: [
      "an official transcript or independently authenticated registrar record",
      "a complete account of Jamie's artistic practice",
      "permission to publish the raw student record or grades",
      "that every later professional project derives from these courses"
    ]
  },
  {
    id: "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
    title: "Warren Sack narrative evaluations for two UCSC courses",
    organization: "University of California, Santa Cruz",
    author: "Warren Sack",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2004-2006",
    accessedAt: "2026-07-15",
    publicCitation:
      "Warren Sack, UCSC narrative evaluations for Introduction to Digital Media and Social Information Spaces, 2004-2006. Unofficial student record; protected source.",
    publicNote:
      "The evaluations describe Jamie's source-backed analysis, recursive social-network reasoning, image-analysis prototype, interactive interface work, and co-design of a physical Flickr-browsing installation proposal.",
    protectedLocatorId: "LOC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
    supportsGenerally: [
      "a program using online dictionary sources and a source-supported analysis of physical and online social networks",
      "recursive analysis of group relationships and an independently developed structural-equivalence approach",
      "a prototype combining social-network structure, image analysis, and a Max/MSP Jitter interface",
      "co-design of an installation translating Flickr browsing into embodied movement through projected rooms",
      "documentation through models, films, sketches, diagrams, prose, and an HTML mock-up"
    ],
    doesNotEstablish: [
      "an official transcript or independently authenticated registrar record",
      "sole authorship of the collaborative final project",
      "production deployment or measured use of the social-software prototypes",
      "permission to publish the raw student record or grades"
    ]
  },
  {
    id: "SRC-MORSE-LINKEDIN-RECOMMENDATION-2014",
    title: "Margaret Morse recommendation for Jamie Burkart",
    organization: "LinkedIn",
    author: "Margaret Morse",
    kind: "institutional-web-page",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2014-09-04",
    accessedAt: "2026-07-15",
    publicCitation:
      "Margaret Morse, professional recommendation for Jamie Burkart, September 4, 2014. Protected capture; no public link stored.",
    publicNote:
      "Morse describes Jamie as exceptionally bright and creative, recalls advising an ambitious installation he executed with dedication, and recommends him without reservation.",
    protectedLocatorId: "LOC-MORSE-LINKEDIN-RECOMMENDATION-2014",
    supportsGenerally: [
      "Margaret Morse's direct recommendation of Jamie",
      "her recollection of advising an ambitious and innovative installation project",
      "her assessment of Jamie's dedication, warmth, generosity, creativity, and seriousness"
    ],
    doesNotEstablish: [
      "a complete employment or academic history",
      "the technical specification or collaborator map for the installation",
      "permission to republish the screenshot or profile data",
      "current institutional affiliation or endorsement by LinkedIn or UCSC"
    ]
  },
  {
    id: "SRC-JAMIE-PRACTICE-LINEAGE-INTERPRETATION-2026",
    title: "Jamie Burkart interpretation of his artistic and operating-practice lineage",
    organization: "Jamie Burkart portfolio research process",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-15",
    accessedAt: "2026-07-15",
    publicCitation:
      "Jamie Burkart, first-person interpretation of his artistic and operating-practice lineage, July 15, 2026. Public-safe summary of a protected research conversation.",
    publicNote:
      "Jamie connects early participatory art, embodied media systems, recursive social-software experiments, and later civic, technical, and organizational practice while insisting that the artistic work has value beyond professional utility.",
    protectedLocatorId: "LOC-JAMIE-PRACTICE-LINEAGE-INTERPRETATION-2026",
    supportsGenerally: [
      "Jamie's first-person cross-period interpretation",
      "the value-beyond-utility boundary",
      "the phrase that form grows from people, materials, relationships, and place"
    ],
    doesNotEstablish: [
      "independent corroboration of the cross-period interpretation",
      "a simple causal path from coursework to later professional work",
      "permission to publish the underlying research conversation",
      "sole authorship of collaborative or participatory projects"
    ]
  }
] satisfies SourceRecord[];

const claims = [
  {
    id: "CLM-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE-2006",
    project: "experimental-media-practice",
    internalClaim:
      "Margaret Morse's 2006 narrative evaluations describe Jamie demonstrating media theory through early video equipment, media archaeology, performance, and the realized Time is Long installation, while public records independently document Open House and Time is Long.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Protected UCSC evaluations describe Jamie's embodied media inquiry and media-archaeology practice; public reporting separately documents Open House and Time is Long.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
        relationship: "private-support",
        supports: [
          "Morse's assessment of Jamie's embodied, performative, and media-archaeological course work"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-GOOD-TIMES-OPEN-HOUSE-2006",
        relationship: "corroborating",
        supports: ["Open House as an embodied art-and-life experiment that Jamie tended"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
        relationship: "corroborating",
        supports: ["the realized Time is Long installation and its physical tape-delay mechanism"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Use public reporting for public event details and protected evaluations as corroborating educational context.",
      "Do not pathologize or publicize Morse's discussion of writing-course fit.",
      "Do not convert a course evaluation or grade into a current professional performance metric."
    ],
    antiClaims: [
      "Margaret Morse endorsed every later Jamie project",
      "Jamie rejected writing or documentation",
      "The unofficial evaluations are an official transcript"
    ],
    proofClaimIds: ["artistic-technical-practice-lineage"],
    researchInquiryIds: ["INQ-UCSC-PRACTICE-LENSES-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SOFTWARE-2004-2006",
    project: "experimental-media-practice",
    internalClaim:
      "Warren Sack's 2004 and 2006 narrative evaluations describe Jamie's source-backed analysis, recursive social-network reasoning, structural-equivalence prototype, image-analysis interface, and co-design of a physical installation for navigating digital photographs.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Protected UCSC evaluations document early work joining recursive network analysis, image processing, interactive interfaces, physical space, and collaborative design.",
        status: "hold",
        citationRequired: true,
        surfaces: ["knowledge-bank"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
        relationship: "private-support",
        supports: [
          "the named analyses, prototypes, interface work, installation proposal, and collaborative documentation"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe course prototypes and proposals as prototypes and proposals, not deployed products.",
      "Preserve the collaborative final project's shared authorship.",
      "Do not treat platform traces as complete representations of human relationships."
    ],
    antiClaims: [
      "Jamie invented structural equivalence as an academic field",
      "The Flickr prototype was a production search engine",
      "Jamie solely designed the collaborative installation"
    ],
    proofClaimIds: ["artistic-technical-practice-lineage"],
    researchInquiryIds: ["INQ-UCSC-PRACTICE-LENSES-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-PRACTICE-LINEAGE-ART-TECHNOLOGY-PARTICIPATION",
    project: "artistic-technical-practice-lineage",
    internalClaim:
      "Jamie identifies a continuous inquiry connecting early participatory art, embodied media systems, recursive social-software prototypes, and his later civic, technical, and organizational practice; public and protected records support the specimens while the continuity statement is Jamie's interpretation.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text: UCSC_PRACTICE_LINEAGE_PROJECTION,
        status: "active",
        citationRequired: false,
        surfaces: ["/about"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-PRACTICE-LINEAGE-INTERPRETATION-2026",
        relationship: "direct-support",
        supports: [
          "Jamie's first-person connection across artistic, civic, technical, and organizational practice"
        ],
        confidence: "high",
        roleBasis: "first-person",
        renderCitation: false
      },
      {
        sourceId: "SRC-GOOD-TIMES-OPEN-HOUSE-2006",
        relationship: "direct-support",
        supports: [
          "the ten-day Open House, Jamie's tending role, participatory inhabitation, shared decision-making, and extensive documentation"
        ],
        confidence: "high",
        roleBasis: "independent",
        renderCitation: false
      },
      {
        sourceId: "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
        relationship: "private-support",
        supports: ["embodied media inquiry, attention, media archaeology, and Time is Long"],
        confidence: "high",
        roleBasis: "independent",
        renderCitation: false
      },
      {
        sourceId: "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
        relationship: "private-support",
        supports: [
          "recursive social-network analysis, image and interface prototypes, translation into physical space, and collaborative design"
        ],
        confidence: "high",
        roleBasis: "independent",
        renderCitation: false
      },
      {
        sourceId: "SRC-MORSE-LINKEDIN-RECOMMENDATION-2014",
        relationship: "corroborating",
        supports: ["Morse's later assessment of Jamie's dedication, warmth, creativity, and seriousness"],
        confidence: "high",
        roleBasis: "independent",
        renderCitation: false
      },
      {
        sourceId: "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
        relationship: "corroborating",
        supports: ["the physical translation of time through the realized VHS installation"],
        confidence: "high",
        roleBasis: "independent",
        renderCitation: false
      }
    ],
    boundaries: [
      "Treat the cross-period lineage as Jamie's interpretation supported by bounded specimens, not a source's claim about every later project.",
      "Keep art's value beyond organizational utility explicit.",
      "Preserve collaborators' and participants' agency and distinguish built installations from prototypes or proposals.",
      "Do not publish raw educational records, grades, private correspondence, contact details, or unapproved images."
    ],
    antiClaims: [
      "Every later Jamie project directly derives from these courses",
      "Jamie solely authored Open House or the collaborative Flickr installation proposal",
      "Social-network data is equivalent to the relationships it represents",
      "Jamie's artistic work matters only because it supports hiring"
    ],
    proofClaimIds: ["artistic-technical-practice-lineage"],
    researchInquiryIds: ["INQ-UCSC-PRACTICE-LENSES-2026-07-15"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies ClaimRecord[];

const researchInquiries = [
  {
    id: "INQ-UCSC-PRACTICE-LENSES-2026-07-15",
    project: "artistic-technical-practice-lineage",
    question:
      "What distinct portfolio-evaluation lenses can Margaret Morse's and Warren Sack's records support without exposing private educational records or reducing artistic practice to professional utility?",
    methods: [
      "Close-read public reporting on Open House and its descriptions of tending, shared decision-making, documentation, participation, and art-life practice.",
      "Decompose the protected Morse evaluations into embodied inquiry, media archaeology, material specificity, and attention without retaining grades or student identifiers.",
      "Decompose the protected Sack evaluations into recursive relational reasoning, source-backed analysis, cross-media translation, prototyping, and collective authorship.",
      "Review the protected 2014 recommendation only for public-safe relational and professional context.",
      "Translate the findings into two separate eval contracts and one bounded About-page statement."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The Morse lens should test embodied inquiry, tending and hospitality, material and temporal specificity, art-life continuity, and value beyond organizational utility.",
      "The Sack lens should test recursive relational reasoning, translation across data, interfaces, and physical space, prototype specificity, source rigor, and collective agency.",
      "The public Open House and Time is Long records support the main public specimens; protected evaluations corroborate the larger intellectual lineage.",
      "One About-page threshold can connect artistic, civic, technical, and organizational practice without expanding the homepage or turning the site into an archive."
    ],
    limitations: [
      "The narrative evaluations are an unofficial copy rather than an independently authenticated registrar record.",
      "No original course artifacts or source code were recovered in this pass.",
      "The LinkedIn recommendation is represented by a protected capture without a stored public URL.",
      "The continuity across later projects remains Jamie's interpretation and must not be represented as a quotation from Morse or Sack."
    ],
    sourceIds: [
      "SRC-GOOD-TIMES-OPEN-HOUSE-2006",
      "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
      "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
      "SRC-MORSE-LINKEDIN-RECOMMENDATION-2014",
      "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
      "SRC-JAMIE-PRACTICE-LINEAGE-INTERPRETATION-2026"
    ],
    publicSummary:
      "Public and protected records support two distinct portfolio lenses: one for embodied, attentive, non-instrumental practice and one for recursive, cross-representational systems work; private educational and correspondence details remain offline.",
    protectedLocatorId: "LOC-UCSC-PRACTICE-LENSES-2026-07-15"
  }
] satisfies ResearchInquiry[];

export const ucscPracticeLensesBatch = {
  intakeRecords,
  sources,
  claims,
  researchInquiries
};
