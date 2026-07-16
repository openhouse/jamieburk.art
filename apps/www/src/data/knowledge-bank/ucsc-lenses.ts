import type {
  CitationPage,
  ClaimRecord,
  IntakeRecordInput,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";

export const ucscLensSources: SourceRecord[] = [
  {
    id: "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
    title: "Margaret Morse narrative evaluations of Jamie Burkart",
    organization: "University of California, Santa Cruz",
    author: "Margaret Morse",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2006-06-30",
    accessedAt: reviewedAt,
    publicCitation:
      "Margaret Morse, narrative evaluations of Jamie Burkart in Visual Culture and Technology and New Media Theory Seminar, Spring 2006; unofficial academic-record copy reviewed July 16, 2026.",
    publicNote:
      "The protected evaluations describe Jamie's media-archaeology work, embodied and performative engagement with theory, and realization of the Time is Long installation. The raw academic record remains outside the public repository.",
    protectedLocatorId: "UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
    supportsGenerally: [
      "Margaret Morse described Jamie as an artist and media archaeologist",
      "Jamie presented early home-video and video-synthesis equipment in class",
      "Jamie embodied theoretical concepts through performance and installation",
      "Jamie realized Time is Long as a gallery installation in New York City",
      "Morse connected Jamie's practice to attention and the relationship between art and life"
    ],
    doesNotEstablish: [
      "an official transcript",
      "a current professional endorsement",
      "the complete production history or venue record for Time is Long",
      "permission to publish the raw academic record",
      "that writing was absent from Jamie's wider practice"
    ]
  },
  {
    id: "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
    title: "Warren Sack narrative evaluations of Jamie Burkart",
    organization: "University of California, Santa Cruz",
    author: "Warren Sack",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2006-03-31",
    accessedAt: reviewedAt,
    publicCitation:
      "Warren Sack, narrative evaluations of Jamie Burkart in Introduction to Digital Media and Social Information Spaces, 2004 and 2006; unofficial academic-record copy reviewed July 16, 2026.",
    publicNote:
      "The protected evaluations describe Jamie's early social-software analysis, dictionary-source program, Flickr structural-equivalence prototype, Jitter interface, and co-designed physical photo-browsing installation. The raw academic record remains outside the public repository.",
    protectedLocatorId: "UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
    supportsGenerally: [
      "Jamie wrote and presented an online-dictionary-source program",
      "Jamie analyzed physical and online social networks using primary and secondary sources",
      "Jamie independently applied structural-equivalence reasoning to Flickr groups",
      "Jamie built and demonstrated an image-similarity prototype and Jitter interface",
      "Jamie co-designed an installation that translated online photo browsing into embodied movement through projected rooms"
    ],
    doesNotEstablish: [
      "an official transcript",
      "a current professional endorsement",
      "production deployment or continued adoption of the classroom prototypes",
      "sole authorship of the collaborative final installation design",
      "permission to publish the raw academic record"
    ]
  },
  {
    id: "SRC-UCSC-MORSE-LINKEDIN-RECOMMENDATION-2014",
    title: "Margaret Morse LinkedIn recommendation for Jamie Burkart",
    organization: "LinkedIn",
    author: "Margaret Morse",
    kind: "archived-web-capture",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2014-09-04",
    accessedAt: reviewedAt,
    publicCitation:
      "Margaret Morse, LinkedIn recommendation for Jamie Burkart, September 4, 2014; protected screenshot reviewed July 16, 2026.",
    publicNote:
      "The recommendation describes Jamie as bright, creative, dedicated, warm, and generous, and recalls an ambitious installation he completed successfully. The screenshot remains outside the public repository.",
    protectedLocatorId: "UCSC-MORSE-LINKEDIN-RECOMMENDATION-2014",
    supportsGenerally: [
      "Morse advised Jamie on an ambitious installation project",
      "Morse described the installation as successfully executed",
      "Morse described Jamie as dedicated, warm, generous, bright, and creative"
    ],
    doesNotEstablish: [
      "which installation is being referenced",
      "a current employment relationship",
      "current endorsement of every portfolio claim",
      "permission to republish the screenshot or profile interface"
    ]
  }
];

export const ucscLensClaims: ClaimRecord[] = [
  {
    id: "CLM-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE",
    project: "participatory-public-practice",
    internalClaim:
      "Margaret Morse's 2006 narrative evaluations and later recommendation document an early practice in which Jamie joined media archaeology, embodied theory, installation, attention, warmth, and the tending of participatory situations.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Margaret Morse's evaluations document an early practice joining media archaeology, embodied theory, installation, attention, and the tending of participatory situations.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/ucsc-media-and-social-systems"],
        rationale:
          "Retain the source-backed artistic method in the public-safe bank while keeping protected academic records and private correspondence outside Git."
      },
      {
        key: "about",
        text:
          "My operating practice did not begin as administration. It began in art: making situations people could inhabit, tending what happened inside them, and treating attention, participation, and documentation as part of the work.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
        rationale:
          "The About page uses the independently published Open House record for the public composition; this broader faculty-derived interpretation remains supporting depth."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
        relationship: "private-support",
        supports: [
          "media archaeology",
          "embodied and performative engagement with theory",
          "realization of Time is Long",
          "attention as artistic method"
        ],
        publicNote:
          "Protected academic-record summary; raw text, grades, identifiers, and private locators remain outside Git.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-UCSC-MORSE-LINKEDIN-RECOMMENDATION-2014",
        relationship: "corroborating",
        supports: [
          "successful realization of an ambitious installation",
          "dedication, warmth, and generosity in Jamie's practice"
        ],
        publicNote:
          "Protected screenshot summary; the record does not identify the installation or operate as a current blanket endorsement.",
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
        relationship: "corroborating",
        supports: [
          "Jamie initiated and tended an inhabitable participatory situation",
          "the practice joined art, life, attention, public participation, and documentation"
        ],
        locator: "Sections 'A Tradition of Experiment,' 'A Community on Display,' and 'The Power of Performance'",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The academic evaluations are historical records, not current blanket endorsements.",
      "Do not publish grades, student identifiers, private correspondence, contact details, or raw academic-record text.",
      "Do not imply that embodied practice replaces Jamie's substantial writing, documentation, or analytical work."
    ],
    antiClaims: [
      "Margaret Morse currently endorses every claim on this site.",
      "Jamie rejected writing or analysis.",
      "Jamie alone authored every collective or participatory artwork."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Codex source review", "Jamie Burkart source authorization"]
  },
  {
    id: "CLM-OPEN-HOUSE-ITERATIVE-GOVERNANCE",
    project: "open-house-participatory-practice",
    internalClaim:
      "Open House used a shared-governance operating model and visibly revised that model in response to institutional feedback: Jamie and the housemates met with Porter staff, cleaned the space, and marked a smaller boundary around the gallery's technical equipment.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Open House incorporated institutional feedback through a group meeting, cleanup, and a newly marked operating boundary around technical equipment.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/ucsc-media-and-social-systems"],
        rationale:
          "Preserve a concrete feedback-to-revision example from the independently published article."
      },
      {
        key: "about",
        text:
          "Observed how social software represents people in relation; modeled shared responsibility in an open communal gallery; built and tended the 10-day space; then used participant experience and staff feedback to hold a group meeting, clean up, and mark a new operating boundary.",
        status: "active",
        citationRequired: true,
        surfaces: ["/about"],
        rationale:
          "Make one complete observe-model-build-use-revise sequence inspectable without publishing participant details or images."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
        relationship: "direct-support",
        supports: [
          "shared responsibility and decision-making",
          "institutional feedback from Porter staff",
          "a group meeting with staff",
          "cleanup and a newly taped operating boundary"
        ],
        locator: "Sections 'UCSC Staff Investigates The Open House' and 'Is UCSC the Appropriate Setting For Experimental Art?'",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Credit the housemates collectively for the group response and revision.",
      "Do not publish participant identities, pseudonym relationships, private details, or article photographs without separate review."
    ],
    antiClaims: [
      "Jamie alone resolved every institutional concern.",
      "The revision proves the experiment was risk-free or universally approved."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-CALLNYC-RECURSIVE-METHOD",
    project: "callnyc",
    internalClaim:
      "CallNYC documents a recursive product method in which Jamie observed data-quality and communication barriers, modeled a civic guidance system, built an independent application and JSON interface, and revised the product through conversations and record review.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "about",
        text:
          "Observed noisy records and residents' communication barriers; modeled district-and-issue guidance; built the independent app and JSON interface; then used conversations to add Twitter contacts and borough filtering.",
        status: "active",
        citationRequired: true,
        surfaces: ["/about"],
        rationale:
          "Give the recursive-method map one concise product example while leaving the governed CallNYC case-study projection unchanged."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-CALLNYC-POLITICO-2016-03-14",
        relationship: "direct-support",
        supports: [
          "Jamie independently developed and iterated CallNYC",
          "record filtering and borough guidance",
          "resident communication preferences",
          "addition of Council-member Twitter contacts"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CALLNYC-X-API-2016",
        relationship: "corroborating",
        supports: ["a public JSON interface for Council-member Twitter usernames"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "CallNYC was an independent project, not an official Council product.",
      "Informal conversations are not presented as representative user research.",
      "The sources do not establish a formal hackathon submission or documented prize."
    ],
    antiClaims: [
      "CallNYC was commissioned or operated by the New York City Council.",
      "A representative research sample requested every product revision."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCAC-RECURSIVE-METHOD",
    project: "nyc-artist-coalition",
    internalClaim:
      "Jamie reports that his NYC Artist Coalition contribution followed a recurring convene-listen-translate-route cycle: rotating meetings surfaced artists' experience, and the collective developed events, safety sessions, campaigns, testimony, and relief responses around issues participants raised.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "about",
        text:
          "Listened through recurring meetings in rotating cultural spaces; modeled a convene-listen-translate-route cycle; built public event, safety, campaign, and testimony infrastructure; then helped the coalition take up issues artists surfaced, including Cabaret Law, M.A.R.C.H. raids, commercial rent, and emergency relief.",
        status: "active",
        citationRequired: true,
        surfaces: ["/about"],
        rationale:
          "Give the recursive-method map a bounded collective example while leaving the corpus-governed role projection unchanged."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
        relationship: "private-support",
        supports: [
          "Jamie's description of listening, translation, event infrastructure, and campaign support as his operating contribution"
        ],
        publicNote:
          "First-hand role framing remains explicitly attributed to Jamie and does not assign every event or outcome to him.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        relationship: "direct-support",
        supports: [
          "recurring meetings in rotating cultural spaces",
          "practical safety sessions, campaigns, hearings, and relief convenings"
        ],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCAC-GOTHAMIST-2017-06-19",
        relationship: "corroborating",
        supports: [
          "Jamie's identified role with NYC Artist Coalition",
          "fire-code study-group organizing",
          "City Hall advocacy for Cabaret Law repeal"
        ],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The individual operating role is Jamie's first-hand account, supported but not exhaustively attributed by public records.",
      "Events, campaigns, testimony, and outcomes remain collective work.",
      "The evidence does not establish that one meeting or one person caused legislation or agency action."
    ],
    antiClaims: [
      "Jamie solely produced every NYC Artist Coalition event.",
      "Jamie alone caused Cabaret Law repeal or other policy outcomes.",
      "Facebook event records prove attendance or unique reach."
    ],
    researchInquiryIds: ["INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE"],
    reviewedAt,
    reviewedBy: ["Codex source review", "Jamie Burkart first-hand account"]
  },
  {
    id: "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SYSTEMS",
    project: "participatory-public-practice",
    internalClaim:
      "Warren Sack's 2004 and 2006 narrative evaluations document an early recurring method: Jamie analyzed relationships around social systems, developed original models, built and demonstrated interfaces, and translated online structures into embodied collective experience.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text:
          "Warren Sack's evaluations document an early method of analyzing relationships, building models and interfaces, and translating online social structures into embodied collective experience.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/ucsc-media-and-social-systems"],
        rationale:
          "Preserve the technical and intellectual lineage without presenting classroom prototypes as deployed products."
      },
      {
        key: "about",
        text:
          "That practice is technical as well as social: study the relationships around a system, build a model or interface people can enter, and learn from what happens when they use it.",
        status: "active",
        citationRequired: true,
        surfaces: ["/about"],
        rationale:
          "A compact relational-systems throughline connects early social-software inquiry to Jamie's later product, civic, and knowledge-system work without publishing protected academic details."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
        relationship: "private-support",
        supports: [
          "social-network analysis",
          "structural-equivalence reasoning",
          "working software and interface prototypes",
          "translation between online structures and embodied installation"
        ],
        publicNote:
          "Protected academic-record summary; the raw evaluation and private locator remain outside Git.",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
        relationship: "context",
        supports: [
          "Jamie connected an embodied participatory project to social software and representations of relationships",
          "the public experiment invited participants to interpret and revise a shared system"
        ],
        locator: "Sections 'A Community on Display' and 'The Power of Performance'",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The structural-equivalence, Flickr, dictionary, and Jitter details come from a protected unofficial academic-record copy.",
      "Classroom prototypes are not presented as production deployments or sustained adoption.",
      "The final installation design was collaborative and remains collectively credited."
    ],
    antiClaims: [
      "Jamie originated structural equivalence as a field-wide concept.",
      "The Flickr prototype became a deployed commercial service.",
      "Jamie solely designed the collaborative installation."
    ],
    researchInquiryIds: [],
    reviewedAt,
    reviewedBy: ["Codex source review", "Jamie Burkart source authorization"]
  }
];

export const ucscLensIntake = [
  {
    id: "INT-UCSC-MORSE-SACK-LENS-PACKET-2026-07-16",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "protected-summary",
    title: "UCSC Margaret Morse and Warren Sack lens packet",
    description:
      "Public-safe summary of protected UCSC narrative evaluations, a Margaret Morse recommendation screenshot, and the already-recorded public Open House feature.",
    whyItMatters:
      "The records establish that Jamie's present operating method has a documented artistic and technical lineage: embodied inquiry, media archaeology, recursive social-systems analysis, prototyping, participation, and collective use.",
    projectIds: ["participatory-public-practice", "open-house-participatory-practice"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created five bounded lineage and method claims plus two production-readiness lenses; protected raw records and personal data remain outside Git.",
    sourceIds: [
      "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006",
      "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006",
      "SRC-UCSC-MORSE-LINKEDIN-RECOMMENDATION-2014",
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-X-API-2016",
      "SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-GOTHAMIST-2017-06-19"
    ],
    claimIds: [
      "CLM-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE",
      "CLM-OPEN-HOUSE-ITERATIVE-GOVERNANCE",
      "CLM-CALLNYC-RECURSIVE-METHOD",
      "CLM-NYCAC-RECURSIVE-METHOD",
      "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SYSTEMS"
    ],
    artifactPaths: [
      "docs/knowledge-bank/projects/ucsc-media-and-social-systems.md",
      "docs/evals/margaret-morse-and-warren-sack-lenses.md"
    ],
    boundaries: [
      "Do not publish the student identifier, grades, private correspondence, email addresses, telephone numbers, postal addresses, raw academic-record text, private locators, or recommendation screenshot.",
      "Treat the records as historical corroboration, not current blanket endorsement.",
      "Preserve collective credit and distinguish prototypes from deployed systems."
    ]
  }
] satisfies IntakeRecordInput[];

export const ucscLensPages: CitationPage[] = [
  {
    id: "about",
    surface: "/about",
    sourceOrder: [
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-X-API-2016",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-GOTHAMIST-2017-06-19"
    ],
    occurrences: [
      {
        id: "open-house-throughline",
        claimId: "CLM-OPEN-HOUSE-PARTICIPATORY-PRACTICE",
        projection: "about",
        sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"]
      },
      {
        id: "relational-systems-throughline",
        claimId: "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SYSTEMS",
        projection: "about",
        sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"]
      },
      {
        id: "open-house-recursive-method",
        claimId: "CLM-OPEN-HOUSE-ITERATIVE-GOVERNANCE",
        projection: "about",
        sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"]
      },
      {
        id: "callnyc-recursive-method",
        claimId: "CLM-CALLNYC-RECURSIVE-METHOD",
        projection: "about",
        sourceIds: [
          "SRC-CALLNYC-POLITICO-2016-03-14",
          "SRC-CALLNYC-X-API-2016"
        ]
      },
      {
        id: "nycac-recursive-method",
        claimId: "CLM-NYCAC-RECURSIVE-METHOD",
        projection: "about",
        sourceIds: [
          "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
          "SRC-NYCAC-GOTHAMIST-2017-06-19"
        ]
      }
    ]
  }
];
