export const ucscLensLifecycle = {
  entities: [
    {
      id: "ENT-UC-SANTA-CRUZ",
      type: "organization",
      name: "University of California, Santa Cruz",
      aliases: ["UCSC"],
      publicSummary: "A public research university where Jamie studied mathematics and Film and Digital Media.",
      sameAs: ["https://www.ucsc.edu/"]
    },
    {
      id: "ENT-MARGARET-MORSE",
      type: "person",
      name: "Margaret Morse",
      aliases: [],
      publicSummary: "Professor emerita of Film and Digital Media at UC Santa Cruz and one of Jamie's former instructors and advisers.",
      sameAs: []
    },
    {
      id: "ENT-WARREN-SACK",
      type: "person",
      name: "Warren Sack",
      aliases: [],
      publicSummary: "Professor of Film and Digital Media at UC Santa Cruz and one of Jamie's former instructors.",
      sameAs: ["https://people.ucsc.edu/~wsack/"]
    }
  ],
  projects: [
    {
      id: "PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE",
      title: "UCSC media and social-software practice",
      aliases: ["UCSC Film and Digital Media coursework"],
      summary: "An early body of source-backed analysis, recursive social-software research, interactive prototyping, media archaeology, installation, and participatory inquiry.",
      dateRange: "2004-2006",
      startYear: 2004,
      endYear: 2006,
      domains: ["digital media", "social software", "participatory art", "media archaeology"],
      capabilities: ["research", "software prototyping", "interaction design", "installation", "collective design", "public presentation"],
      canonicalProjectKeys: ["ucsc-media-systems-practice"],
      proofIds: [],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-UC-SANTA-CRUZ", "ENT-MARGARET-MORSE", "ENT-WARREN-SACK"],
      status: "historical"
    }
  ],
  leads: [
    {
      id: "LEAD-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      title: "UCSC narrative evaluations by Margaret Morse and Warren Sack",
      kind: "document",
      capturedAt: "2026-07-16",
      capturedBy: "Jamie Burkart",
      state: "extracted",
      visibility: "private-reference",
      publicSummary: "An unofficial protected copy preserves four instructor evaluations describing Jamie's media archaeology, embodied inquiry, source-backed analysis, recursive social-software research, prototypes, interfaces, and collective installation work.",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE", "PRJ-OPEN-HOUSE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-UC-SANTA-CRUZ", "ENT-MARGARET-MORSE", "ENT-WARREN-SACK"],
      sourceIds: ["SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006"],
      candidateClaimIds: ["CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD", "CND-UCSC-RECURSIVE-SYSTEMS-METHOD"],
      researchTaskIds: ["TASK-UCSC-MORSE-SACK-LENS-REVIEW-2026"],
      protectedLocatorId: "ARCHIVE-UCSC-NARRATIVE-EVALUATIONS-2004-2006-001",
      nextAction: "Keep the record protected; use public-safe paraphrase and seek official or collaborator confirmation before any future public historical composition."
    },
    {
      id: "LEAD-MARGARET-MORSE-LINKEDIN-RECOMMENDATION-2014",
      title: "Margaret Morse LinkedIn recommendation",
      kind: "collaborator-note",
      capturedAt: "2026-07-16",
      capturedBy: "Jamie Burkart",
      state: "extracted",
      visibility: "public-safe",
      publicSummary: "A user-provided screenshot preserves a 2014 public-facing recommendation describing Jamie as Morse's former student and advisee on an ambitious installation project.",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-MARGARET-MORSE"],
      sourceIds: ["SRC-MARGARET-MORSE-LINKEDIN-RECOMMENDATION-2014"],
      candidateClaimIds: ["CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD"],
      researchTaskIds: ["TASK-UCSC-MORSE-SACK-LENS-REVIEW-2026"],
      nextAction: "Retain as corroborating public-facing context; do not publish the screenshot or treat praise as outcome evidence."
    }
  ],
  observations: [
    {
      id: "OBS-UCSC-MORSE-MEDIA-ARCHAEOLOGY-2006",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-MARGARET-MORSE"],
      statement: "Morse's Visual Culture and Technology evaluation describes Jamie presenting early home-video equipment and a video synthesizer, grasping the course material, and demonstrating an artistic strategy of embodying concepts rather than relying only on prose.",
      locator: "Section 'Visual Culture and Technology,' Spring 2006 evaluation",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["current media-archaeology practice", "public exhibition of every artifact", "permission to reproduce the evaluation"],
      candidateClaimIds: ["CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-UCSC-MORSE-TIME-IS-LONG-2006",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-MARGARET-MORSE"],
      statement: "Morse's New Media Theory Seminar evaluation says Jamie realized his Time is Long proposal as an installation shown in a New York City gallery and embodied course concepts through performance.",
      locator: "Section 'New Media Theory Seminar,' Spring 2006 evaluation",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["the gallery name", "the exhibition dates", "critical reception", "sole authorship of every component"],
      candidateClaimIds: ["CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-OPEN-HOUSE-ATTENTION-HOSPITALITY-2006",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
      projectIds: ["PRJ-OPEN-HOUSE", "PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-MARGARET-MORSE"],
      statement: "Contemporaneous reporting describes Open House as an art/life experiment sustained through Jamie's presence, public hospitality, communal responsibility, participant contribution, and multi-perspective documentation.",
      locator: "Public article sections 'Shop Shows,' 'UCSC Staff Investigates,' 'A Tradition of Experiment,' and 'A Community on Display'",
      evidenceRole: "corroborating",
      certainty: "high",
      doesNotEstablish: ["sole authorship", "a complete participant roster", "rights or consent for article images", "a quantified social outcome"],
      candidateClaimIds: ["CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-UCSC-SACK-SOURCE-BACKED-ANALYSIS-2004",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-WARREN-SACK"],
      statement: "Sack's Introduction to Digital Media evaluation describes an online-dictionary program, a classroom demonstration, and an original final analysis of physical and online social networks supported by primary and secondary sources.",
      locator: "Section 'Introduction to Digital Media,' Spring 2004 evaluation",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["production deployment", "publication", "current software behavior", "permission to reproduce the evaluation"],
      candidateClaimIds: ["CND-UCSC-RECURSIVE-SYSTEMS-METHOD"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-UCSC-SACK-RECURSIVE-PROTOTYPE-2006",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-WARREN-SACK"],
      statement: "Sack's Social Information Spaces evaluation describes Jamie recursively analyzing common group memberships, extending that observation into a similar-image search prototype, building an interactive Max/MSP Jitter interface, and demonstrating it in class.",
      locator: "Social Information Spaces, Winter 2006, paragraphs 1-2",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["production adoption", "ownership of the structural-equivalence concept", "a deployed Flickr product", "independent performance testing"],
      candidateClaimIds: ["CND-UCSC-RECURSIVE-SYSTEMS-METHOD"],
      reviewedAt: "2026-07-16"
    },
    {
      id: "OBS-UCSC-SACK-COLLECTIVE-INSTALLATION-2006",
      sourceId: "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      entityIds: ["ENT-JAMIE-BURKART", "ENT-WARREN-SACK"],
      statement: "The same evaluation describes a co-designed physical Flickr-browsing installation with two architectures documented through Maya models, short films, sketches, diagrams, prose, and an HTML mock-up.",
      locator: "Social Information Spaces, Winter 2006, paragraphs 3-4",
      evidenceRole: "direct-support",
      certainty: "high",
      doesNotEstablish: ["Jamie as sole designer", "completed fabrication", "public exhibition", "visitor adoption or impact"],
      candidateClaimIds: ["CND-UCSC-RECURSIVE-SYSTEMS-METHOD"],
      reviewedAt: "2026-07-16"
    }
  ],
  candidateClaims: [
    {
      id: "CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE", "PRJ-OPEN-HOUSE"],
      proposition: "Jamie's early media practice joined embodied conceptual inquiry, media archaeology, participatory situations, hospitality, shared responsibility, and documentation.",
      maturity: "defensible",
      confidence: "high",
      observationIds: ["OBS-UCSC-MORSE-MEDIA-ARCHAEOLOGY-2006", "OBS-UCSC-MORSE-TIME-IS-LONG-2006", "OBS-OPEN-HOUSE-ATTENTION-HOSPITALITY-2006"],
      requiredEvidence: ["Protected instructor evaluations plus independent contemporaneous reporting for the public participatory-practice context"],
      boundaries: ["Keep educational records protected", "Keep collaborative projects collective", "Separate instructor judgment from outcome evidence"],
      antiClaims: ["Every later system is an artwork", "Jamie solely authored Open House", "Instructor praise proves later professional impact"],
      counterevidencePosture: "Add collaborator accounts, official records, and corrections without erasing the documented method.",
      sourceIndependenceNote: "One protected instructor record and one independent public article support complementary parts of the method; the LinkedIn artifact is corroborating, not independent reporting.",
      researchTaskIds: ["TASK-UCSC-MORSE-SACK-LENS-REVIEW-2026"],
      promotionDecisionIds: [],
      targetCanonicalClaimId: "CLM-UCSC-EMBODIED-ART-SYSTEMS-METHOD-2006",
      updatedAt: "2026-07-16"
    },
    {
      id: "CND-UCSC-RECURSIVE-SYSTEMS-METHOD",
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"],
      proposition: "Jamie's UCSC work connected source-backed analysis and recursive social observation to prototypes, interfaces, demonstrations, and collective installation architecture.",
      maturity: "defensible",
      confidence: "high",
      observationIds: ["OBS-UCSC-SACK-SOURCE-BACKED-ANALYSIS-2004", "OBS-UCSC-SACK-RECURSIVE-PROTOTYPE-2006", "OBS-UCSC-SACK-COLLECTIVE-INSTALLATION-2006"],
      requiredEvidence: ["Direct instructor evaluation describing the analysis, prototype, interface, demonstration, and collective final project"],
      boundaries: ["Keep the unofficial record protected", "Separate prototype from deployment", "Credit collective design", "Do not appropriate structural equivalence as Jamie's field invention"],
      antiClaims: ["The prototype was adopted in production", "Jamie originated structural equivalence", "Jamie alone designed the final project"],
      counterevidencePosture: "Seek surviving project artifacts and collaborator accounts; record any discrepancy at the atomic observation level.",
      sourceIndependenceNote: "The direct evidence is one protected instructor record; the claim remains held from public historical projection pending stronger public or collaborator evidence.",
      researchTaskIds: ["TASK-UCSC-MORSE-SACK-LENS-REVIEW-2026"],
      promotionDecisionIds: [],
      targetCanonicalClaimId: "CLM-UCSC-RECURSIVE-SYSTEMS-METHOD-2004-2006",
      updatedAt: "2026-07-16"
    }
  ],
  candidateEvents: [
    {
      id: "EVT-UCSC-EMBODIED-METHOD-DEFENSIBLE-2026",
      candidateClaimId: "CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD",
      toMaturity: "defensible",
      occurredAt: "2026-07-16",
      actor: "Jamie Burkart and Codex local artifact review",
      reason: "Protected instructor evaluations and independent contemporaneous reporting support a bounded method claim while public projection remains held."
    },
    {
      id: "EVT-UCSC-RECURSIVE-METHOD-DEFENSIBLE-2026",
      candidateClaimId: "CND-UCSC-RECURSIVE-SYSTEMS-METHOD",
      toMaturity: "defensible",
      occurredAt: "2026-07-16",
      actor: "Jamie Burkart and Codex local artifact review",
      reason: "A protected instructor evaluation directly documents the analysis-to-prototype chain with explicit prototype, collective-credit, and adoption boundaries."
    }
  ],
  researchTasks: [
    {
      id: "TASK-UCSC-MORSE-SACK-LENS-REVIEW-2026",
      candidateClaimIds: ["CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD", "CND-UCSC-RECURSIVE-SYSTEMS-METHOD"],
      question: "What bounded method principles can the Morse and Sack evaluations contribute to the portfolio without exposing protected records or converting praise into outcome claims?",
      status: "completed",
      priority: "high",
      methods: ["Close-read the protected unofficial evaluation copy", "Close-read the public Open House article", "Review the LinkedIn recommendation screenshot as metadata-only corroboration", "Separate current first-person method language from historical claims"],
      actions: ["metadata-review", "source-close-read", "claim-decomposition", "corroboration"],
      sourceIds: ["SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006", "SRC-OPEN-HOUSE-GOOD-TIMES-2006", "SRC-MARGARET-MORSE-LINKEDIN-RECOMMENDATION-2014"],
      observationIds: ["OBS-UCSC-MORSE-MEDIA-ARCHAEOLOGY-2006", "OBS-UCSC-MORSE-TIME-IS-LONG-2006", "OBS-OPEN-HOUSE-ATTENTION-HOSPITALITY-2006", "OBS-UCSC-SACK-SOURCE-BACKED-ANALYSIS-2004", "OBS-UCSC-SACK-RECURSIVE-PROTOTYPE-2006", "OBS-UCSC-SACK-COLLECTIVE-INSTALLATION-2006"],
      findings: ["The two lenses identify complementary method lineages rather than competing professional identities.", "A short current-method threshold belongs on About; historical detail remains in the bank.", "The source record supports prototyping and demonstration, not production adoption or later impact."],
      limitations: ["The narrative evaluations are an unofficial protected copy.", "The LinkedIn screenshot lacks a recovered canonical URL.", "Current-method continuity is Jamie's present framing, not a longitudinal causal finding."],
      nextActions: ["Seek surviving student-project artifacts or public program records only if a future composition needs the historical detail.", "Do not publish source images or raw evaluations without separate rights and privacy review."],
      openedAt: "2026-07-16",
      completedAt: "2026-07-16"
    }
  ],
  promotionDecisions: [],
  editorialBriefs: [
    {
      id: "BRIEF-UCSC-CROSS-PRACTICE-METHOD-2026",
      title: "Artistic and recursive systems method palette",
      audience: "Internal editors composing Jamie's professional throughline",
      audienceTags: ["internal-editor", "hiring-reader"],
      goal: "Preserve the artistic, civic, technical, and social continuity that explains Jamie's humane systems practice without turning the About page into a retrospective.",
      purposeTags: ["professional-method", "cross-practice-continuity"],
      status: "active",
      publicationIntent: "internal-brief",
      targetSurfaces: [],
      selectionCriteria: ["Use present-tense first-person method language", "Name systems as inhabited and changeable", "Connect latent structure to prototypes and shared artifacts", "Keep historical detail and instructor praise in the source layer"],
      projectIds: ["PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE", "PRJ-OPEN-HOUSE", "PRJ-WOWLIST", "PRJ-SUNDAY-DINNER-196", "PRJ-CALLNYC"],
      canonicalClaimIds: ["CLM-UCSC-EMBODIED-ART-SYSTEMS-METHOD-2006", "CLM-UCSC-RECURSIVE-SYSTEMS-METHOD-2004-2006"],
      candidateClaimIds: ["CND-UCSC-EMBODIED-ART-SYSTEMS-METHOD", "CND-UCSC-RECURSIVE-SYSTEMS-METHOD"],
      exclusions: ["Raw evaluations", "Private correspondence", "Student identifiers", "Grades", "Recommendation language", "Unsupported continuity or impact claims"],
      citationPosture: "Keep public-source and protected-source lineage in the bank; the About page states Jamie's current method rather than quoting historical praise.",
      chadLensQuestion: "Does this make the reason Jamie's systems differ more legible without increasing the reader's burden?",
      mediaLeadIds: [],
      pageClaimExclusions: []
    }
  ],
  proofSurfaceManifests: [],
  mediaLeads: []
};
