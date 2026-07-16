import type { KnowledgeBank } from "./schema.ts";

type SocialAuthenticatedDevelopment = Pick<
  KnowledgeBank,
  "intakeItems" | "sourceReadings" | "candidateClaims" | "promotions"
>;

export const socialAuthenticatedDevelopmentRecords: SocialAuthenticatedDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-AUTHENTICATED-X-ARCHIVE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Authenticated X research across CallNYC, NYC Artist Coalition, WOWList, historical Council-member accounts, city institutions, and collaborator use.",
      projectHints: ["callnyc", "nyc-artist-coalition", "wowlist"],
      status: "processed",
      disposition:
        "Recovered bounded search corpora, promoted a 13-member engagement minimum plus city-dialogue and Olympia stewardship claims, and retained exact lifetime interaction totals as unresolved.",
      linkedRecordIds: [
        "SRC-SOCIAL-X-AUTHENTICATED-RUN-2026",
        "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
        "CLM-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP",
        "CLM-NYCAC-CITY-DIALOGUE"
      ],
      protectedLocatorId: "INTAKE-AUTHENTICATED-X-ARCHIVE-2026-001"
    }
  ],
  sourceReadings: [
    {
      id: "READ-SOCIAL-X-AUTHENTICATED-RUN-2026",
      sourceId: "SRC-SOCIAL-X-AUTHENTICATED-RUN-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-X-AUTHENTICATED-PROJECT-CORPORA",
          statement:
            "Authenticated searches recovered bounded CallNYC and NYC Artist Coalition authored, mention, reply, and domain-link corpora.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-X-AUTHENTICATED-COUNCIL-MINIMUM",
          statement:
            "A 60-handle historical Council query recovered 28 direct posts from 12 then-sitting members; the separate Mathieu Eugene post raises the cross-project minimum to 13 members and 29 posts.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-X-AUTHENTICATED-WOWLIST-GAP",
          statement:
            "Authenticated search returned no historical @wowlist results even though oEmbed and Wayback independently preserve two 2016 posts.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "X search is indexed and selective; it does not expose deleted posts, all handle changes, complete likes or repost identities, impressions, or an official account export."
      ],
      entityIds: ["CallNYC", "NYC-Artist-Coalition", "WOWList", "New-York-City-Council"],
      themeIds: ["authenticated-search", "bounded-counts", "council-engagement"],
      candidateClaimIds: [
        "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM",
        "CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT",
        "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS"
      ]
    },
    {
      id: "READ-SOCIAL-CALLNYC-PETER-KOO-2016",
      sourceId: "SRC-SOCIAL-CALLNYC-PETER-KOO-2016",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-PETER-KOO-ENGAGEMENT",
          statement: "Peter Koo's Council-member account directly amplified a CallNYC Lifeline recognition.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The repost does not validate every CallNYC interpretation or establish total reach."],
      entityIds: ["CallNYC", "Peter-Koo"],
      themeIds: ["council-engagement", "constituent-services"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-CALLNYC-STEVEN-MATTEO-2016",
      sourceId: "SRC-SOCIAL-CALLNYC-STEVEN-MATTEO-2016",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-MATTEO-ENGAGEMENT",
          statement: "Steven Matteo's Council-member account directly replied to CallNYC about potholes.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The reply does not establish issue resolution or a complete engagement history."],
      entityIds: ["CallNYC", "Steven-Matteo"],
      themeIds: ["council-engagement", "constituent-services"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-CALLNYC-RUBEN-WILLS-2016",
      sourceId: "SRC-SOCIAL-CALLNYC-RUBEN-WILLS-2016",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-RUBEN-WILLS-ENGAGEMENT",
          statement: "Ruben Wills's Council-member account directly replied to CallNYC and the Council account.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The compact result does not preserve the substance earlier in the thread."],
      entityIds: ["CallNYC", "Ruben-Wills"],
      themeIds: ["council-engagement"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-CALLNYC-MARGARET-CHIN-2017",
      sourceId: "SRC-SOCIAL-CALLNYC-MARGARET-CHIN-2017",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-CALLNYC-MARGARET-CHIN-ENGAGEMENT",
          statement:
            "Margaret Chin directly thanked CallNYC for recognition and connected it to improving her office's service numbers.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The response does not independently validate CallNYC's ranking method."],
      entityIds: ["CallNYC", "Margaret-Chin"],
      themeIds: ["council-engagement", "performance-feedback"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-CARLINA-RIVERA-2018",
      sourceId: "SRC-SOCIAL-NYCAC-CARLINA-RIVERA-2018",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-CARLINA-RIVERA-ENGAGEMENT",
          statement:
            "Carlina Rivera directly replied to a thread including @NYCArtC and affirmed that she co-sponsored and supported the proposal under discussion.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The compact post does not display the proposal name outside the full conversation."],
      entityIds: ["NYC-Artist-Coalition", "Carlina-Rivera"],
      themeIds: ["council-engagement", "legislative-support"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-STEPHEN-LEVIN-2019",
      sourceId: "SRC-SOCIAL-NYCAC-STEPHEN-LEVIN-2019",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-STEPHEN-LEVIN-ENGAGEMENT",
          statement:
            "Stephen Levin thanked NYC Artist Coalition and venue participants for testimony that made MARCH enforcement visible at a Council hearing.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The post supports public credit and hearing participation, not sole causality for later reform."],
      entityIds: ["NYC-Artist-Coalition", "Stephen-Levin"],
      themeIds: ["council-engagement", "talks-not-raids", "public-hearing"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-JUSTIN-BRANNAN-2019",
      sourceId: "SRC-SOCIAL-NYCAC-JUSTIN-BRANNAN-2019",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-JUSTIN-BRANNAN-ENGAGEMENT",
          statement: "Justin Brannan directly replied to NYC Artist Coalition and the MTA while serving in the Council.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The reply is engagement evidence but does not carry a substantive policy position."],
      entityIds: ["NYC-Artist-Coalition", "Justin-Brannan"],
      themeIds: ["council-engagement"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-MARK-LEVINE-2020",
      sourceId: "SRC-SOCIAL-NYCAC-MARK-LEVINE-2020",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-MARK-LEVINE-ENGAGEMENT",
          statement: "Mark Levine directly replied to NYC Artist Coalition while serving in the Council.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The compact scheduling reply does not preserve the broader thread or a policy position."],
      entityIds: ["NYC-Artist-Coalition", "Mark-Levine"],
      themeIds: ["council-engagement"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-JIMMY-VAN-BRAMER-2020",
      sourceId: "SRC-SOCIAL-NYCAC-JIMMY-VAN-BRAMER-2020",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-JIMMY-VAN-BRAMER-ENGAGEMENT",
          statement:
            "Jimmy Van Bramer included NYC Artist Coalition in a public call to prioritize performing artists and culture.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The post does not assign authorship or establish an enacted outcome."],
      entityIds: ["NYC-Artist-Coalition", "Jimmy-Van-Bramer"],
      themeIds: ["council-engagement", "arts-advocacy"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-NYCAC-BRAD-LANDER-2021",
      sourceId: "SRC-SOCIAL-NYCAC-BRAD-LANDER-2021",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-NYCAC-BRAD-LANDER-ENGAGEMENT",
          statement:
            "Brad Lander replied in a coalition thread that he had supported moving Commercial Rent Stabilization forward in committee remarks.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The reply does not establish proposal passage or sole campaign ownership."],
      entityIds: ["NYC-Artist-Coalition", "Brad-Lander"],
      themeIds: ["council-engagement", "commercial-rent"],
      candidateClaimIds: ["CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"]
    },
    {
      id: "READ-SOCIAL-OLYMPIA-NYCAC-CORPUS-2026",
      sourceId: "SRC-SOCIAL-OLYMPIA-NYCAC-CORPUS-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-OLYMPIA-NYCAC-COUNT",
          statement:
            "Authenticated search recovered 89 unique public posts by Olympia Kazi mentioning @NYCArtC from November 2019 through June 2022.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-OLYMPIA-NYCAC-THEMES",
          statement:
            "The posts repeatedly carried cultural policy, hearings, Fair Rent NYC, nightlife, and cultural-space work through the coalition identity.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "These are Olympia Kazi's posts mentioning the coalition; they do not identify who authored shared-account posts or establish an official complete account export."
      ],
      entityIds: ["Olympia-Kazi", "NYC-Artist-Coalition"],
      themeIds: ["collaborator-stewardship", "identity-continuity", "public-documentation"],
      candidateClaimIds: ["CND-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP"]
    },
    {
      id: "READ-SOCIAL-OLYMPIA-NYCAC-HEARING-2022",
      sourceId: "SRC-SOCIAL-OLYMPIA-NYCAC-HEARING-2022",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-OLYMPIA-NYCAC-HEARING-CONTINUITY",
          statement:
            "Olympia connected NYC Artist Coalition's Save NYC Spaces, Talks Not Raids, and Fair Rent NYC work to a 2022 Council oversight hearing.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The post supports Olympia's public authorship and continuity, not authorship of shared-account posts."],
      entityIds: ["Olympia-Kazi", "NYC-Artist-Coalition"],
      themeIds: ["oversight-hearing", "campaign-continuity"],
      candidateClaimIds: ["CND-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP"]
    },
    {
      id: "READ-SOCIAL-NYC-INSTITUTIONAL-CORPUS-2026",
      sourceId: "SRC-SOCIAL-NYC-INSTITUTIONAL-CORPUS-2026",
      readAt: "2026-07-12",
      reader: "Codex authenticated archival review",
      assertions: [
        {
          id: "ASSERT-NYC-INSTITUTIONAL-NYCAC-COUNT",
          statement:
            "Authenticated search recovered 17 direct posts from NYC Cultural Affairs and NYC311 engaging @NYCArtC in 2017.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NYC-INSTITUTIONAL-NYCAC-SUBSTANCE",
          statement:
            "The corpus includes issue-specific dialogue about services, community spaces, MARCH, Cabaret Law, interagency relationships, and CreateNYC participation.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["The corpus is bounded and does not equal all city-government engagement or policy adoption."],
      entityIds: ["NYC-Artist-Coalition", "NYC-Cultural-Affairs", "NYC-311"],
      themeIds: ["institutional-dialogue", "cultural-planning", "service-routing"],
      candidateClaimIds: ["CND-NYCAC-CITY-DIALOGUE"]
    },
    {
      id: "READ-SOCIAL-NYCULTURE-MARCH-CABARET-2017",
      sourceId: "SRC-SOCIAL-NYCULTURE-MARCH-CABARET-2017",
      readAt: "2026-07-12",
      reader: "Codex authenticated source review",
      assertions: [
        {
          id: "ASSERT-NYCULTURE-SOLICITS-NYCAC-KNOWLEDGE",
          statement:
            "NYC Cultural Affairs asked NYC Artist Coalition to explain MARCH and Cabaret Law concerns in relation to arts and culture.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: ["Soliciting input does not establish adoption of every recommendation or policy causality."],
      entityIds: ["NYC-Artist-Coalition", "NYC-Cultural-Affairs"],
      themeIds: ["institutional-dialogue", "march-raids", "cabaret-law"],
      candidateClaimIds: ["CND-NYCAC-CITY-DIALOGUE"]
    },
    {
      id: "READ-SOCIAL-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
      sourceId: "SRC-SOCIAL-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        {
          id: "ASSERT-DOCUMENT-JOURNAL-JAMIE-NYCAC",
          statement:
            "Document Journal visibly included Jamie among NYC Artist Coalition participants in the Cabaret Law repeal effort.",
          locator: "Image caption identifying Jamie, with surname misspelled in the source",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-DOCUMENT-JOURNAL-OLYMPIA-NYCAC",
          statement:
            "The article photographed and quoted Olympia Kazi as a NYC Artist Coalition and Let NYC Dance participant.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The article misspells Jamie's surname as Burkhart and supports visible participation rather than sole leadership or individual causality."
      ],
      entityIds: ["Jamie-Burkart", "Olympia-Kazi", "NYC-Artist-Coalition"],
      themeIds: ["cabaret-law", "public-recognition", "collective-credit"],
      candidateClaimIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP",
      project: "nyc-artist-coalition",
      text:
        "Olympia Kazi publicly carried and amplified the @NYCArtC identity across at least 89 recovered posts from November 2019 through June 2022.",
      status: "promoted",
      sourceIds: [
        "SRC-SOCIAL-OLYMPIA-NYCAC-CORPUS-2026",
        "SRC-SOCIAL-OLYMPIA-NYCAC-HEARING-2022"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "The authenticated corpus establishes a bounded count, date range, and repeated public documentation themes under Olympia's own authorship.",
      missingEvidence: [],
      boundaries: [
        "Credit Olympia for her posts; do not infer authorship of shared-account posts or Jamie's direction of her voice."
      ],
      promotedClaimId: "CLM-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-CITY-DIALOGUE",
      project: "nyc-artist-coalition",
      text:
        "NYC Artist Coalition's public identity supported sustained, issue-specific dialogue with NYC Cultural Affairs and NYC311 during CreateNYC.",
      status: "promoted",
      sourceIds: [
        "SRC-SOCIAL-NYC-INSTITUTIONAL-CORPUS-2026",
        "SRC-SOCIAL-NYCULTURE-MARCH-CABARET-2017",
        "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-2026"],
      supportSummary:
        "Seventeen authenticated-search posts and the official CreateNYC appendix establish direct city-agency dialogue and recognition.",
      missingEvidence: [],
      boundaries: ["Dialogue and recognition do not equal adoption of every recommendation or policy causality."],
      promotedClaimId: "CLM-NYCAC-CITY-DIALOGUE",
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP-2026",
      candidateClaimId: "CND-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP",
      claimId: "CLM-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP",
      decision: "promoted",
      reason:
        "The 89-post authenticated corpus supports bounded public stewardship under Olympia's own authorship while preserving the shared-account authorship boundary.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "PROM-NYCAC-CITY-DIALOGUE-2026",
      candidateClaimId: "CND-NYCAC-CITY-DIALOGUE",
      claimId: "CLM-NYCAC-CITY-DIALOGUE",
      decision: "promoted",
      reason:
        "Direct city-agency posts and the official CreateNYC appendix support bounded dialogue and recognition wording.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ]
};
