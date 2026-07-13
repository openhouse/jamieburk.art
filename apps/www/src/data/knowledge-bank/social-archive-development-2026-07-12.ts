import type { KnowledgeBank } from "./schema.ts";

type SocialArchiveDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const socialArchiveDevelopmentRecords: SocialArchiveDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-PROJECT-SOCIAL-ARCHIVE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary:
        "Inventory project social accounts and recover their public-documentation, source, traction, and Council-member engagement history.",
      projectHints: ["callnyc", "nyc-artist-coalition", "wowlist"],
      status: "processed",
      disposition:
        "Created a bounded account registry, recovered a 279-post readable NYC Artist Coalition corpus, resolved its public links, and promoted only minimum-count and continuity claims.",
      linkedRecordIds: [
        "INQ-PROJECT-SOCIAL-ARCHIVE-2026",
        "SRC-SOCIAL-WOWLIST-MARCHES-POST-2016",
        "SRC-SOCIAL-WOWLIST-PARTICIPATION-POST-2016",
        "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM",
        "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
        "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"
      ]
    },
    {
      id: "INT-2026-07-12-CALLNYC-PROFILE-CAPTURE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Rendered CallNYC X profile capture with a visible timeline and recoverable public-post link annotations.",
      projectHints: ["callnyc"],
      status: "processed",
      disposition:
        "Extracted public post URLs and public-safe profile metadata; kept the local PDF outside the repository and treated the visible timeline as bounded rather than exhaustive.",
      linkedRecordIds: [
        "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
        "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
        "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
        "INQ-PROJECT-SOCIAL-ARCHIVE-2026"
      ],
      protectedLocatorId: "INTAKE-CALLNYC-X-PROFILE-2026-001"
    },
    {
      id: "INT-2026-07-12-NYCAC-SOCIAL-CORPUS",
      receivedAt: "2026-07-12",
      submittedBy: "Codex archival review",
      kind: "artifact",
      visibility: "public-safe",
      summary:
        "Wayback-indexed @NYCArtC status corpus with public X oEmbed readings and resolved outbound links.",
      projectHints: ["nyc-artist-coalition", "fair-rent-nyc"],
      status: "processed",
      disposition:
        "Recovered 286 distinct post URLs, 279 readable records, and 193 unique resolved links; retained keyword counts and article leads with explicit coverage limits.",
      linkedRecordIds: [
        "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026",
        "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026",
        "INQ-PROJECT-SOCIAL-ARCHIVE-2026"
      ]
    },
    {
      id: "INT-2026-07-12-SOCIAL-IDENTITY-CONFIRMATION",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "memory",
      visibility: "public-safe",
      summary:
        "Jamie established the project accounts and NYC Artist Coalition's logo and website family; teammates also posted through the coalition identity.",
      projectHints: ["callnyc", "nyc-artist-coalition", "wowlist"],
      status: "processed",
      disposition:
        "Promoted the bounded identity-system claim while holding named collaborator post-level attribution for direct confirmation.",
      linkedRecordIds: [
        "SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026",
        "CND-NYCAC-PUBLIC-IDENTITY-SYSTEM",
        "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP",
        "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026",
      sourceId: "SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-SOCIAL-JAMIE-ACCOUNT-SETUP",
          statement: "Jamie directly confirms that he established the project social accounts.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-SOCIAL-JAMIE-IDENTITY-SYSTEM",
          statement:
            "Jamie directly confirms that the NYC Artist Coalition identity system also included the logo and campaign website family.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-SOCIAL-COLLECTIVE-AUTHORSHIP",
          statement:
            "Jamie states that teammates also posted through the accounts, so account identity cannot be treated as individual post authorship.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "This is firsthand confirmation of Jamie's contribution, not independent post-level authorship evidence or a collaborator testimonial."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition"],
      themeIds: ["public-identity", "collective-authorship", "social-infrastructure"],
      candidateClaimIds: [
        "CND-NYCAC-PUBLIC-IDENTITY-SYSTEM",
        "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP"
      ]
    },
    {
      id: "READ-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
      sourceId: "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-PROFILE-METRICS",
          statement:
            "The rendered profile displayed 110 posts, 69 followers, 194 following, and a March 2016 join date on July 11, 2026.",
          locator: "Profile header",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLNYC-VISIBLE-COUNCIL-ENGAGEMENT",
          statement:
            "The visible timeline included Helen Rosenthal directing residents to CallNYC and Mathieu Eugene amplifying a CallNYC housing recognition.",
          locator: "Visible profile timeline and PDF link annotations",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Only the loaded timeline segment is readable; the capture is not a complete account export and does not identify all likes or reposts."
      ],
      entityIds: ["CallNYC", "Helen-Rosenthal", "Mathieu-Eugene"],
      themeIds: ["civic-data", "social-engagement", "bounded-counts"],
      candidateClaimIds: [
        "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
        "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT"
      ]
    },
    {
      id: "READ-SOCIAL-CALLNYC-LAUNCH-POST-2016",
      sourceId: "SRC-SOCIAL-CALLNYC-LAUNCH-POST-2016",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-SOCIAL-LAUNCH-DATE",
          statement: "@CallNYCapp publicly announced CallNYC on March 5, 2016.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLNYC-SOCIAL-DATA-FRAMING",
          statement:
            "The launch post framed the project as a public use of New York City Council constituent-services data.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The post's first-of-kind wording is a project self-description and is not promoted as an independently verified superlative."
      ],
      entityIds: ["CallNYC", "New-York-City-Council"],
      themeIds: ["project-launch", "civic-data", "public-identity"],
      candidateClaimIds: ["CND-NYCAC-PUBLIC-IDENTITY-SYSTEM"]
    },
    {
      id: "READ-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
      sourceId: "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-ROSENTHAL-DIRECT",
          statement:
            "Helen Rosenthal's Council-member account directly linked residents to CallNYC to find their Council member.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLNYC-ROSENTHAL-SERVICE-FRAME",
          statement: "The post framed Council offices as places where residents could get help.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "One post establishes one direct engagement, not official endorsement of all project content or a complete Council engagement total."
      ],
      entityIds: ["CallNYC", "Helen-Rosenthal"],
      themeIds: ["council-engagement", "resident-guidance"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
      sourceId: "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-EUGENE-DIRECT",
          statement:
            "Mathieu Eugene's Council-member account amplified a CallNYC housing-service recognition through a quoted post.",
          locator: "Public post plus bounded rendered profile context",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CALLNYC-EUGENE-CONSTITUENT-FRAME",
          statement:
            "His accompanying text connected the recognition to helping constituents improve housing options.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The post does not independently validate the ranking method or establish official Council ownership."
      ],
      entityIds: ["CallNYC", "Mathieu-Eugene"],
      themeIds: ["council-engagement", "housing", "public-data"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
      sourceId: "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-CREATENYC-RECORD",
          statement:
            "The City of New York's CreateNYC appendix preserves multiple @NYCArtC posts and reposts in its hashtag dataset.",
          locator: "March 30-31, 2017 entries",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-NYCULTURE-CREDIT",
          statement:
            "NYC Cultural Affairs publicly credited @NYCArtC with gathering a large crowd to discuss DIY spaces.",
          locator: "Post 847587814862729216",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The appendix is a bounded hashtag dataset and its recorded metrics are snapshots, not current or complete reach totals."
      ],
      entityIds: ["NYC-Artist-Coalition", "NYC-Cultural-Affairs"],
      themeIds: ["public-record", "cultural-planning", "institutional-recognition"],
      candidateClaimIds: ["CND-NYCAC-SOCIAL-PUBLIC-RECORD"]
    },
    {
      id: "READ-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018",
      sourceId: "SRC-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-ESPINAL-JOINT-WORK",
          statement:
            "The article reproduces Rafael Espinal's post saying that he and @NYCArtC welcomed the Nightlife Mayor to Brooklyn.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-ESPINAL-PUBLIC-IDENTITY",
          statement:
            "The post treats @NYCArtC as a legible collaborator identity in a public Council-member communication.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The source supports collective joint work, not Jamie's sole event authorship or sole causality for the Office of Nightlife."
      ],
      entityIds: ["NYC-Artist-Coalition", "Rafael-Espinal"],
      themeIds: ["council-engagement", "nightlife", "coalition-identity"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-CORPUS-RUN-2026",
      sourceId: "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-CORPUS-COVERAGE",
          statement:
            "The bounded run recovered 286 distinct archived status URLs and readable public metadata for 279.",
          locator: "Deduplicated CDX and oEmbed result sets",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-CORPUS-RANGE",
          statement: "The readable corpus spans March 2017 through February 2023.",
          locator: "Post-date range",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-CORPUS-CROSS-CAMPAIGN",
          statement:
            "Overlapping keyword coding recovered sustained documentation across Let NYC Dance, Talks Not Raids, Fair Rent NYC, Save NYC Spaces, COVID/mutual-aid, and public-process work.",
          locator: "Keyword-coded corpus summary",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Wayback and oEmbed coverage is incomplete; keyword groups overlap; the corpus does not establish post-level authorship, full engagement, reach, or policy causality."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["social-archive", "campaign-continuity", "bounded-corpus"],
      candidateClaimIds: [
        "CND-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
        "CND-NYCAC-SOCIAL-PUBLIC-RECORD"
      ]
    },
    {
      id: "READ-SOCIAL-NYCAC-LINK-CENSUS-2026",
      sourceId: "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-NYCAC-LINKS-RESOLVED",
          statement: "All 193 unique short links in the readable corpus resolved.",
          locator: "Resolved-link result set",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-LINKS-EXTERNAL-DEPTH",
          statement:
            "The run identified 59 distinct non-campaign external resource destinations across 42 domains.",
          locator: "Deduplicated external-destination set",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-LINKS-FUNCTION",
          statement:
            "The account repeatedly linked campaign action to reporting, public records, grants, hearings, and practical support resources.",
          locator: "Destination classification",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "A link is not necessarily earned press, endorsement, authorship, current guidance, or evidence of audience reach."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["source-association", "public-guidance", "link-census"],
      candidateClaimIds: ["CND-NYCAC-SOCIAL-PUBLIC-RECORD"]
    },
    {
      id: "READ-SOCIAL-NYCAC-CONTINUITY-POST-2025",
      sourceId: "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-SOCIAL-ACTIVE-2025",
          statement: "@NYCArtC published a cultural-venue grant resource on August 24, 2025.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYCAC-SOCIAL-SERVICE-CONTINUITY",
          statement:
            "The post demonstrates that the shared identity continued distributing practical opportunities more than eight years after its 2017 launch.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "One 2025 post establishes a later endpoint, not uninterrupted activity or individual authorship."
      ],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["identity-continuity", "resource-distribution"],
      candidateClaimIds: ["CND-NYCAC-SOCIAL-IDENTITY-CONTINUITY"]
    },
    {
      id: "READ-SOCIAL-WOWLIST-MARCHES-POST-2016",
      sourceId: "SRC-SOCIAL-WOWLIST-MARCHES-POST-2016",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-SOCIAL-NATIONWIDE-ROUTE",
          statement:
            "The historical @wowlist account distributed a route for finding marches across the United States on November 9, 2016.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-SOCIAL-ACTION-FRAME",
          statement:
            "The post framed WOWList as infrastructure for collective action rather than only an event directory.",
          confidence: "moderate",
          publicSafe: true
        }
      ],
      limitations: [
        "One surviving post does not establish account completeness, event count, city count, attendance, reach, or individual authorship."
      ],
      entityIds: ["WOWList"],
      themeIds: ["public-coordination", "event-discovery", "social-infrastructure"],
      candidateClaimIds: []
    },
    {
      id: "READ-SOCIAL-WOWLIST-PARTICIPATION-POST-2016",
      sourceId: "SRC-SOCIAL-WOWLIST-PARTICIPATION-POST-2016",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-WOWLIST-SOCIAL-PARTICIPATION",
          statement:
            "The historical account invited people to add events and receive updates about marches, meetings, and local connection.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-WOWLIST-SOCIAL-CROSS-PROJECT",
          statement:
            "The bounded CallNYC profile capture shows CallNYC reposting this WOWList post, connecting two project identities Jamie established.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The surviving post and one cross-project repost do not establish a complete account history, sustained adoption, reach, or individual authorship."
      ],
      entityIds: ["WOWList", "CallNYC"],
      themeIds: ["participatory-infrastructure", "cross-project-continuity"],
      candidateClaimIds: []
    },
    {
      id: "READ-SOCIAL-CITY-LIMITS-CRS-COVID-2020",
      sourceId: "SRC-SOCIAL-CITY-LIMITS-CRS-COVID-2020",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-CITY-LIMITS-CRS-CONTEXT",
          statement:
            "City Limits documented the commercial-rent campaign and Intro 1796 amid acute small-business pressure in April 2020.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-CITY-LIMITS-SOCIAL-SOURCE-USE",
          statement:
            "The article is one example of @NYCArtC connecting campaign action to independent public reporting.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The article does not establish Jamie as bill author, sole campaign owner, or the measure's passage."
      ],
      entityIds: ["NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: ["commercial-rent", "source-association", "public-reporting"],
      candidateClaimIds: ["CND-NYCAC-SOCIAL-PUBLIC-RECORD"]
    },
    {
      id: "READ-SOCIAL-BUZZFEED-MARCH-GENTRIFICATION-2020",
      sourceId: "SRC-SOCIAL-BUZZFEED-MARCH-GENTRIFICATION-2020",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-BUZZFEED-MARCH-EFFECTS",
          statement:
            "BuzzFeed News reported on MARCH raids, cultural-space precarity, complaints, enforcement, and gentrification.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-BUZZFEED-SOCIAL-SOURCE-USE",
          statement:
            "The account used reported experience to connect enforcement policy to consequences for cultural spaces.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The reporting does not establish Talks Not Raids as the sole cause of reforms or Jamie as sole campaign leader."
      ],
      entityIds: ["NYC-Artist-Coalition", "Talks-Not-Raids"],
      themeIds: ["nightlife-enforcement", "source-association", "public-reporting"],
      candidateClaimIds: ["CND-NYCAC-SOCIAL-PUBLIC-RECORD"]
    },
    {
      id: "READ-SOCIAL-GOTHAMIST-BOOK-CULTURE-2020",
      sourceId: "SRC-SOCIAL-GOTHAMIST-BOOK-CULTURE-2020",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-GOTHAMIST-BOOK-CULTURE-RENT",
          statement:
            "Gothamist documented Book Culture's seizure in a commercial-rent dispute.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GOTHAMIST-SOCIAL-SOURCE-USE",
          statement:
            "The shared account used a concrete storefront case to make commercial-rent precarity legible.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The example does not establish that rent was the only business pressure, policy causality, or the human author of the social post."
      ],
      entityIds: ["NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: ["commercial-rent", "source-association", "public-reporting"],
      candidateClaimIds: ["CND-NYCAC-SOCIAL-PUBLIC-RECORD"]
    },
    {
      id: "READ-SOCIAL-EATER-NEIRS-2020",
      sourceId: "SRC-SOCIAL-EATER-NEIRS-2020",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        {
          id: "ASSERT-EATER-NEIRS-RENT",
          statement:
            "Eater documented the threatened closure of the long-running Neir's Tavern amid a rent increase.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-EATER-SOCIAL-SOURCE-USE",
          statement:
            "The shared account connected policy concerns to a recognizable neighborhood institution through public reporting.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The example does not establish that rent was the only business pressure, policy causality, or the human author of the social post."
      ],
      entityIds: ["NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: ["commercial-rent", "source-association", "public-reporting"],
      candidateClaimIds: ["CND-NYCAC-SOCIAL-PUBLIC-RECORD"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-PUBLIC-IDENTITY-SYSTEM",
      project: "nyc-artist-coalition",
      text:
        "Jamie established NYC Artist Coalition's public identity system across its logo, campaign website family, and shared social account; collaborators sustained that identity over time.",
      status: "promoted",
      sourceIds: [
        "SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026",
        "SRC-SOCIAL-NYCAC-ACCOUNT",
        "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "Jamie's direct confirmation establishes his contribution; surviving public account and campaign records corroborate the identity and its continuity.",
      missingEvidence: [],
      boundaries: [
        "Do not attribute every post to Jamie or treat collective campaign identity as personal ownership."
      ],
      promotedClaimId: "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
      project: "nyc-artist-coalition",
      text:
        "The shared @NYCArtC identity carried campaign action, public accountability, and cultural-space resources from 2017 through at least 2025.",
      status: "promoted",
      sourceIds: [
        "SRC-SOCIAL-NYCAC-TOWN-HALL-POST-2017",
        "SRC-SOCIAL-NYCAC-TALKS-NOT-RAIDS-POST-2019",
        "SRC-SOCIAL-NYCAC-FAIR-RENT-POST-2024",
        "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "Public posts establish cross-campaign use and endpoints in 2017, 2019, 2024, and 2025.",
      missingEvidence: [],
      boundaries: [
        "Continuity belongs to the shared identity and does not establish one person's uninterrupted operation or authorship."
      ],
      promotedClaimId: "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
      project: "public-project-identities",
      text:
        "Recovered public evidence documents direct engagement by at least three distinct then-sitting Council member accounts with CallNYC or NYC Artist Coalition.",
      status: "promoted",
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
        "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
        "SRC-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "Direct public posts and published reproduction establish Helen Rosenthal, Mathieu Eugene, and Rafael Espinal as a recovered minimum.",
      missingEvidence: [],
      boundaries: [
        "Three is a minimum, not an exhaustive total; mentions and anonymous interaction counts are excluded."
      ],
      promotedClaimId: "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-SOCIAL-PUBLIC-RECORD",
      project: "nyc-artist-coalition",
      text:
        "The @NYCArtC identity entered the official CreateNYC public record and functioned as a source-linked documentation layer across campaigns.",
      status: "promoted",
      sourceIds: [
        "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
        "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "The city appendix preserves the account in an official dataset; the bounded link census establishes the source-association pattern.",
      missingEvidence: [],
      boundaries: [
        "Do not equate every destination with earned media or infer reach, authorship, or policy causality."
      ],
      promotedClaimId: "CLM-NYCAC-SOCIAL-PUBLIC-RECORD",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT",
      project: "public-project-identities",
      text:
        "A comprehensive exact count can be stated for all Council-member account engagement with @CallNYCapp and @NYCArtC.",
      status: "partially-supported",
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
        "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "A minimum is recoverable, but the available timeline, Wayback, and oEmbed corpora do not expose a complete identity-level engagement history.",
      missingEvidence: [
        "Official account exports or a reproducible authenticated full-history capture",
        "Complete replies, quotes, repost identities, and historical likes",
        "A date-appropriate Council-account roster with handle changes"
      ],
      boundaries: ["Do not turn the recovered minimum into a comprehensive total."],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP",
      project: "nyc-artist-coalition",
      text:
        "A named collaborator can be publicly credited with authoring specific @NYCArtC posts or defined periods of account stewardship.",
      status: "research-needed",
      sourceIds: ["SRC-SOCIAL-JAMIE-IDENTITY-CONFIRMATION-2026"],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "Jamie confirms collaborative account use, but account-level evidence does not identify the human author of individual posts.",
      missingEvidence: [
        "Direct collaborator confirmation or public byline-level evidence",
        "Approved scope and wording for any named stewardship credit"
      ],
      boundaries: [
        "Do not infer post authorship from who shared a link privately or from account access."
      ],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-NYCAC-PUBLIC-IDENTITY-SYSTEM-2026",
      candidateClaimId: "CND-NYCAC-PUBLIC-IDENTITY-SYSTEM",
      claimId: "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM",
      decision: "promoted",
      reason:
        "Jamie's direct confirmation and the surviving public identity support a bounded contribution claim with collective-authorship guardrails.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-NYCAC-SOCIAL-CONTINUITY-2026",
      candidateClaimId: "CND-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
      claimId: "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
      decision: "promoted",
      reason:
        "Public posts support a bounded multi-year identity-continuity claim without assigning individual authorship.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-PROJECT-SOCIAL-COUNCIL-MINIMUM-2026",
      candidateClaimId: "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
      claimId: "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
      decision: "promoted",
      reason:
        "Three direct engagements are individually sourced and explicitly presented as a minimum rather than a complete count.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-NYCAC-SOCIAL-PUBLIC-RECORD-2026",
      candidateClaimId: "CND-NYCAC-SOCIAL-PUBLIC-RECORD",
      claimId: "CLM-NYCAC-SOCIAL-PUBLIC-RECORD",
      decision: "promoted",
      reason:
        "The official CreateNYC appendix and reproducible link census support the documentation-layer claim.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-PROJECT-SOCIAL-COUNCIL-EXACT-HOLD-2026",
      candidateClaimId: "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT",
      decision: "held",
      reason:
        "The available sources support only a recovered minimum; an exact total requires a complete export or reproducible authenticated corpus.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-NYCAC-NAMED-SOCIAL-STEWARDSHIP-HOLD-2026",
      candidateClaimId: "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP",
      decision: "held",
      reason:
        "Collective use is confirmed, but public attribution of individual posts or stewardship periods needs direct collaborator confirmation.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-SOCIAL-IDENTITY-HIRING-2026",
      audience: "Hiring managers and public-interest collaborators",
      goal:
        "Show that Jamie builds durable public identity and documentation systems without mistaking collective voice for personal authorship.",
      argument:
        "Jamie established project identities that collaborators could use across campaigns and years; the accounts connected action, public records, reporting, resources, and government engagement.",
      selectedClaimIds: [
        "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM",
        "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY"
      ],
      heldCandidateClaimIds: [
        "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT",
        "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP"
      ],
      rationale: [
        "Lead with durable systems and collaborator agency, not follower metrics.",
        "Keep the three-member engagement minimum in the research report until it serves a clear public argument.",
        "Do not add a social analytics panel or a new public knowledge-bank route."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-SOCIAL-ARCHIVE-FOLLOWUP-2026",
      kind: "archive-research",
      summary:
        "Request official account exports for @CallNYCapp, @NYCArtC, and @wowlist; map handle changes against historical Council rosters; and seek collaborator confirmation for named stewardship periods.",
      projectHints: ["callnyc", "nyc-artist-coalition", "wowlist"],
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
        "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026"
      ],
      candidateClaimIds: [
        "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT",
        "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP"
      ],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-12"
    }
  ]
};
