const reviewedAt = "2026-07-15";

const manifestSourceId = "SRC-NYCAC-X-RETRIEVABLE-POPULATION-2026";
const reportSourceId = "SRC-NYCAC-X-POPULATION-REPORT-2026";
const missingPostsSourceId = "SRC-X-HELP-MISSING-POSTS";
const ownerArchiveSourceId = "SRC-X-HELP-ACCOUNT-ARCHIVE";

export const nycacSocialPopulationJuly2026 = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-X-RETRIEVABLE-POPULATION-2026",
      kind: "analysis-note",
      title: "NYC Artist Coalition X retrievable-population archival pass",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-web review",
      projectIds: [
        "nyc-artist-coalition",
        "fair-rent-nyc",
        "talks-not-raids",
        "let-nyc-dance",
        "save-nyc-spaces"
      ],
      reason: "Preserve and classify every unique @NYCArtC record materialized by exhausted authenticated profile and yearly authored-search surfaces, while carrying the platform-imposed remainder as a first-class research gap.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [manifestSourceId, reportSourceId, missingPostsSourceId, ownerArchiveSourceId],
      observationIds: [
        "OBS-NYCAC-X-RETRIEVABLE-POPULATION",
        "OBS-NYCAC-X-RECORD-TYPE-AND-PUBLISHING-PATTERN",
        "OBS-NYCAC-X-MISSION-SIGNAL-CONTINUITY",
        "OBS-NYCAC-X-POSTED-URL-INVENTORY",
        "OBS-NYCAC-X-PLATFORM-REMAINDER"
      ],
      researchInquiryIds: [
        "INQ-NYCAC-X-OWNER-ARCHIVE-RECONCILIATION",
        "INQ-NYCAC-X-POSTED-SOURCE-MATURATION"
      ],
      boundaries: [
        "One hundred percent means every record in the 3,123-record retrievable union was reviewed; it does not mean all 5,124 profile-counted posts were recovered.",
        "The 2,001 profile-counted records outside the recovered public union are not represented as absent, deleted, or reviewed.",
        "Shared-account records are not attributed to Jamie or another individual without post-level evidence."
      ]
    },
    {
      id: "INTAKE-NYCAC-X-STAKEHOLDER-AND-SOURCE-PATTERNS-2026",
      kind: "analysis-note",
      title: "NYC Artist Coalition X source, stakeholder, and visible-engagement patterns",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-web review",
      projectIds: ["nyc-artist-coalition"],
      reason: "Separate the sources the coalition account circulated, the public accounts that addressed it, and access-time interaction totals into distinct evidence classes.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [manifestSourceId, reportSourceId],
      observationIds: [
        "OBS-NYCAC-X-SOURCE-NETWORK",
        "OBS-NYCAC-X-POST-2020-INCOMING-RESPONSE",
        "OBS-NYCAC-X-VISIBLE-ENGAGEMENT-SNAPSHOT"
      ],
      researchInquiryIds: [
        "INQ-NYCAC-X-POSTED-SOURCE-MATURATION",
        "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"
      ],
      boundaries: [
        "A source account appearing because @NYCArtC reposted its post is not evidence that the source account engaged with the coalition.",
        "Displayed interaction totals are volatile interface observations, not unique people, reach, conversion, endorsement, participation, or impact.",
        "Incoming mention context and source-network appearance remain separate datasets."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-NYCAC-X-RETRIEVABLE-POPULATION",
      intakeId: "INTAKE-NYCAC-X-RETRIEVABLE-POPULATION-2026",
      sourceId: manifestSourceId,
      comparisonSourceIds: [missingPostsSourceId, ownerArchiveSourceId, "SRC-NYCAC-X-PROFILE"],
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "The authenticated Posts and Posts & replies surfaces, exhausted through repeated no-growth states and reconciled with exact yearly from:NYCArtC searches, yielded 3,123 unique public source-status URLs. Every record in that retrievable union was reviewed; the union represents 60.9 percent of the profile's 5,124-post counter.",
      locator: "Population reconciliation and 3,123-row public-safe manifest",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE"],
      researchInquiryIds: ["INQ-NYCAC-X-OWNER-ARCHIVE-RECONCILIATION"],
      limitations: [
        "The remaining 2,001 profile-counted records were not materialized by the inspected public surfaces.",
        "A platform counter is not itself a list of stable status IDs and may not reconcile exactly to an owner archive."
      ]
    },
    {
      id: "OBS-NYCAC-X-RECORD-TYPE-AND-PUBLISHING-PATTERN",
      intakeId: "INTAKE-NYCAC-X-RETRIEVABLE-POPULATION-2026",
      sourceId: manifestSourceId,
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The 3,123 unique source statuses partition into 608 coalition-account originals, 77 coalition-account replies, and 2,438 external-source statuses surfaced through native repost cards. The manifest separately preserves two coalition-account-authored statuses that also appeared as self-repost cards and 15 quote posts corrected so an embedded reply card did not redefine the source status.",
      locator: "recordTypeCounts and publishingPattern",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE"],
      researchInquiryIds: ["INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
      limitations: [
        "Source-status identity and profile-timeline appearance are separate axes.",
        "For native reposts, the displayed timestamp is the source-post date, not the date @NYCArtC reposted it."
      ]
    },
    {
      id: "OBS-NYCAC-X-MISSION-SIGNAL-CONTINUITY",
      intakeId: "INTAKE-NYCAC-X-RETRIEVABLE-POPULATION-2026",
      sourceId: manifestSourceId,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "Replayable, overlapping subject rules identify 477 Fair Rent NYC records, 192 Save NYC Spaces records, 97 Let NYC Dance records, 62 Talks Not Raids records, 57 nightlife-governance records, and 98 artist-labor records in the recovered union.",
      locator: "missionSignalClassification and publishingPattern.missionSignalRecordCounts",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE"],
      researchInquiryIds: ["INQ-NYCAC-X-POSTED-SOURCE-MATURATION"],
      limitations: [
        "Signals can overlap and describe subject matter, not authorship, endorsement, causality, or impact.",
        "Positive labels are publicly auditable from the checked-in rules, input digests, and retained first match; full false-negative replay requires the private raw capture."
      ]
    },
    {
      id: "OBS-NYCAC-X-POSTED-URL-INVENTORY",
      intakeId: "INTAKE-NYCAC-X-RETRIEVABLE-POPULATION-2026",
      sourceId: manifestSourceId,
      comparisonSourceIds: [reportSourceId],
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The recovered population contains 1,451 external-link occurrences, representing 1,161 distinct short URLs across 1,339 records. The manifest preserves every recovered posted link and identifies representative sources on Cabaret Law repeal, M.A.R.C.H. reporting, commercial rent, music-worker relief, ticketing policy, independent cultural spaces, and cultural-policy leadership.",
      locator: "postedUrlInventory",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE"],
      researchInquiryIds: ["INQ-NYCAC-X-POSTED-SOURCE-MATURATION"],
      limitations: [
        "A posted source records circulation and mission context; it is not automatically coverage of NYC Artist Coalition.",
        "Displayed destinations can redirect or change after the historical post date."
      ]
    },
    {
      id: "OBS-NYCAC-X-SOURCE-NETWORK",
      intakeId: "INTAKE-NYCAC-X-STAKEHOLDER-AND-SOURCE-PATTERNS-2026",
      sourceId: manifestSourceId,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "The recovered union contains 623 visible source authors. Frequent sources include Olympia Kazi, Future of Music Coalition, United for Small Business NYC, Music Workers Alliance, Street Vendor Project, Artist Studio Affordability Project, League of Independent Theater New York, tenant and legal advocates, public agencies, and officeholder accounts.",
      locator: "sourceAuthorNetwork.sourceAuthorCounts",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE"],
      researchInquiryIds: ["INQ-NYCAC-X-POSTED-SOURCE-MATURATION"],
      limitations: [
        "Most external source-status appearances were selected by @NYCArtC through native reposting; appearance does not establish incoming engagement, collaboration, endorsement, or permission.",
        "Counts describe the recovered source-status network, not the number of organizations formally participating in the coalition."
      ]
    },
    {
      id: "OBS-NYCAC-X-POST-2020-INCOMING-RESPONSE",
      intakeId: "INTAKE-NYCAC-X-STAKEHOLDER-AND-SOURCE-PATTERNS-2026",
      sourceId: manifestSourceId,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "A bounded 2021 through July 14, 2026 incoming search rendered 98 public records from 43 authors. Seventy-five records from 34 authors directly matched @NYCArtC; 23 records from 15 authors were surrounding conversation context retained for auditability. Curated direct records preserve collaborator continuity, legal-advocacy partnership, Commercial Rent Stabilization co-host context, public-service-advertising distribution, and independent-theater and nightlife acknowledgment.",
      locator: "post2020IncomingMentionInventory",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-POST-2020-PUBLIC-RESPONSE"],
      researchInquiryIds: ["INQ-SOCIAL-NYCAC-ENGAGEMENT"],
      limitations: [
        "This is complete for the rendered bounded result, not a complete archive of every later mention, reply, quote, repost, or like.",
        "Former-officeholder context is not counted as serving-Council engagement."
      ]
    },
    {
      id: "OBS-NYCAC-X-VISIBLE-ENGAGEMENT-SNAPSHOT",
      intakeId: "INTAKE-NYCAC-X-STAKEHOLDER-AND-SOURCE-PATTERNS-2026",
      sourceId: manifestSourceId,
      project: "nyc-artist-coalition",
      kind: "bounded-inference",
      text: "At the July 14, 2026 access snapshot, 618 of the 685 coalition-account originals or replies displayed at least one reply, repost, or like. Those account-authored source statuses displayed 118 replies, 1,490 reposts, and 2,698 likes, for 4,306 displayed interaction units under the manifest's metric definition.",
      locator: "visibleEngagementSnapshot",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-VISIBLE-ENGAGEMENT-SNAPSHOT"],
      researchInquiryIds: [],
      limitations: [
        "The values are volatile interface observations and can change.",
        "They are not unique people, reach, conversion, endorsement, participation, or policy impact; views and bookmarks are excluded from the interaction-unit total."
      ]
    },
    {
      id: "OBS-NYCAC-X-PLATFORM-REMAINDER",
      intakeId: "INTAKE-NYCAC-X-RETRIEVABLE-POPULATION-2026",
      sourceId: missingPostsSourceId,
      comparisonSourceIds: [ownerArchiveSourceId, manifestSourceId],
      project: "nyc-artist-coalition",
      kind: "limitation",
      text: "X documents an 800-record Posts display limit, a 3,200-record Posts & replies display limit, and older-post indexing restrictions. X separately directs account owners to an X Archive for history beginning with the first post, making an owner-archive reconciliation the appropriate route for the 2,001-record public-surface gap.",
      locator: "X Help Center profile-timeline and account-archive guidance",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE"],
      researchInquiryIds: ["INQ-NYCAC-X-OWNER-ARCHIVE-RECONCILIATION"],
      limitations: [
        "The general platform guidance does not identify the specific @NYCArtC records outside the recovered union.",
        "An owner archive may still require reconciliation for deletions, counter drift, reposts, or platform representation changes."
      ]
    }
  ],
  sources: [
    {
      id: manifestSourceId,
      title: "NYC Artist Coalition X retrievable-population manifest",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition X retrievable-population manifest, July 15, 2026.",
      publicNote: "A public-safe 3,123-row manifest preserving source-status URLs, source-post dates, author handles, record types, link metadata, mention handles, hashtags, classification digests and first matches, incoming mentions from the defined query window, and dated aggregate counts. Raw post text, credentials, cookies, private account state, and session data are excluded.",
      supportsGenerally: [
        "complete review of the 3,123-record retrievable public union",
        "population reconciliation and record-type taxonomy",
        "posted-URL, source-author, mission-signal, incoming-response, and visible-engagement inventories"
      ],
      doesNotEstablish: [
        "the content of 2,001 profile-counted records outside the recovered public union",
        "individual authorship of the shared account",
        "engagement by every reposted source account",
        "reach, endorsement, participation, policy causality, or impact"
      ]
    },
    {
      id: reportSourceId,
      title: "NYC Artist Coalition social-population archival production report",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/nycac-social-population.md",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition social-population archival production report, July 15, 2026.",
      publicNote: "Documents retrieval boundaries, corpus topology, posted-source roles, stakeholder relationship classes, mission patterns, public-safety decisions, and the selective website projection.",
      supportsGenerally: ["research method", "population reconciliation", "source roles", "stakeholder relationship distinctions", "editorial decision"],
      doesNotEstablish: ["literal full-account recovery", "individual post authorship", "formal partnership from repost appearance", "policy causality"]
    },
    {
      id: missingPostsSourceId,
      title: "Help with missing Posts",
      organization: "X Help Center",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://help.x.com/en/using-x/missing-posts",
      preferredPublicUrl: "canonical",
      publicCitation: "X Help Center, 'Help with missing Posts,' accessed July 15, 2026.",
      publicNote: "X documents that Posts displays the latest 800 records, Posts & replies displays the latest 3,200, and older posts may fail to appear because of indexing restrictions.",
      supportsGenerally: ["public profile display limits", "older-post indexing restriction"],
      doesNotEstablish: ["which @NYCArtC records fall outside the limits", "that an unmaterialized record was deleted"]
    },
    {
      id: ownerArchiveSourceId,
      title: "New user FAQ",
      organization: "X Help Center",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://help.x.com/en/resources/new-user-faq",
      preferredPublicUrl: "canonical",
      publicCitation: "X Help Center, 'New user FAQ,' accessed July 15, 2026.",
      publicNote: "X directs account owners beyond the recent profile timeline to download an X Archive and browse account information beginning with the first post.",
      supportsGenerally: ["owner-archive route beyond recent profile timelines"],
      doesNotEstablish: ["the contents of the @NYCArtC owner archive", "exact reconciliation to the current profile counter"]
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE",
      project: "nyc-artist-coalition",
      internalClaim: "The complete 3,123-record retrievable @NYCArtC union documents a durable shared public infrastructure across four named campaigns and six recurring mission lines: coalition calls to action, partner and source amplification, public resources, artist-labor information, commercial-rent advocacy, and nightlife accountability.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "A July 2026 archival pass reviewed every one of the 3,123 unique public records X made retrievable from the coalition account: 685 coalition-account-authored originals or replies and 2,438 external-source posts surfaced through native reposts. The corpus preserves four campaign lines and a broad arts, labor, small-business, tenant, legal, public-sector, and journalism source network. X's timeline limits leave 2,001 profile-counted records outside the public capture, so this is a complete review of the retrievable union, not a complete account export.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        { sourceId: manifestSourceId, relationship: "direct-support", supports: ["3,123-record retrievable union", "record-type partition", "mission, source-author, posted-link, and stakeholder inventories"], confidence: "high", renderCitation: true },
        { sourceId: reportSourceId, relationship: "corroborating", supports: ["research method", "source roles", "stakeholder distinctions", "projection decision"], confidence: "high", renderCitation: false },
        { sourceId: missingPostsSourceId, relationship: "supports-boundary", supports: ["800 and 3,200 profile display limits", "older-post indexing restrictions"], confidence: "high", renderCitation: true },
        { sourceId: ownerArchiveSourceId, relationship: "supports-boundary", supports: ["owner-archive route beginning with the first post"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYCAC-X-PROFILE", relationship: "context", supports: ["5,124-post profile counter", "shared four-campaign identity"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "The recovered union covers 60.9 percent of the 5,124-post profile counter; literal full-account recovery requires the owner archive.",
        "The 2,001-record remainder is not described as absent, deleted, empty, or reviewed.",
        "The shared account does not identify the human author of each coalition-account post.",
        "External-source reposts document what the coalition account circulated, not incoming engagement, endorsement, collaboration, or source permission.",
        "Mission signals, source counts, links, and visible interactions describe the recovered corpus; they do not measure reach, participation, policy causality, or impact.",
        "Native repost timestamps are source-post dates, not @NYCArtC activity dates."
      ],
      antiClaims: [
        "All 5,124 profile-counted posts were recovered",
        "Jamie authored every @NYCArtC post",
        "2,438 external accounts engaged with or endorsed NYC Artist Coalition",
        "the social record proves that the coalition caused policy outcomes"
      ],
      researchInquiryIds: [
        "INQ-NYCAC-X-OWNER-ARCHIVE-RECONCILIATION",
        "INQ-NYCAC-X-POSTED-SOURCE-MATURATION",
        "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
    },
    {
      id: "CLM-NYCAC-X-POST-2020-PUBLIC-RESPONSE",
      project: "nyc-artist-coalition",
      internalClaim: "A bounded post-2020 incoming-mention inventory preserves direct public acknowledgment and working-context records from coalition collaborators, legal and small-business partners, public-service-advertising infrastructure, independent-theater participants, and nightlife stakeholders.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "A bounded post-2020 incoming inventory preserves partner, collaborator, distribution, theater, and nightlife continuity.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [{ sourceId: manifestSourceId, relationship: "direct-support", supports: ["98 rendered incoming records", "75 direct matches", "43 distinct authors", "curated public relationship records"], confidence: "high", renderCitation: false }],
      boundaries: [
        "This is a bounded rendered result, not a complete later-period interaction census.",
        "Conversation context is retained separately from direct @NYCArtC matches.",
        "Former officeholders are not counted as serving-Council engagement after leaving office."
      ],
      antiClaims: ["exactly 43 people or organizations engaged after 2020", "every mention was an endorsement", "the incoming inventory proves policy impact"],
      researchInquiryIds: ["INQ-SOCIAL-NYCAC-ENGAGEMENT"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
    },
    {
      id: "CLM-NYCAC-X-VISIBLE-ENGAGEMENT-SNAPSHOT",
      project: "nyc-artist-coalition",
      internalClaim: "At the July 14, 2026 access snapshot, 618 coalition-account originals or replies displayed at least one reply, repost, or like, totaling 4,306 displayed interaction units under the manifest's bounded definition.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "The access-time corpus preserves a bounded visible-interaction snapshot for future research.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [{ sourceId: manifestSourceId, relationship: "direct-support", supports: ["618 account-authored statuses with displayed interaction", "4,306 displayed interaction units", "metric boundary"], confidence: "high", renderCitation: false }],
      boundaries: ["The snapshot is volatile and dated.", "It is not a unique-person, reach, conversion, endorsement, participation, or impact metric.", "Views and bookmarks are excluded from the interaction-unit total."],
      antiClaims: ["4,306 people engaged", "4,306 supporters", "4,306 actions caused policy outcomes", "visible interaction equals reach"],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-X-OWNER-ARCHIVE-RECONCILIATION",
      project: "nyc-artist-coalition",
      question: "Can an account-owner X Archive recover or explain the 2,001 profile-counted records outside the exhausted public-surface union?",
      methods: [
        "Request and download the @NYCArtC X Archive from the account-owner settings.",
        "Transform it in a private workspace, reconcile stable status IDs against the 3,123-record public union, and publish only public-safe derived metadata.",
        "Rerun record-type, posted-link, mission-signal, and relationship classifications over newly materialized records."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All 3,123 records materialized by exhausted public surfaces were reviewed.",
        "The recovered union covers 60.9 percent of the 5,124-post profile counter.",
        "X documents profile display limits and directs account owners to an archive beginning with the first post."
      ],
      limitations: [
        "The owner archive has not been supplied to this production pass.",
        "The 2,001-record remainder cannot be classified or represented as absent from the public surfaces alone."
      ],
      sourceIds: [manifestSourceId, missingPostsSourceId, ownerArchiveSourceId],
      publicSummary: "The public-surface union is fully reviewed; literal full-account recovery remains blocked on an owner-archive reconciliation."
    },
    {
      id: "INQ-NYCAC-X-POSTED-SOURCE-MATURATION",
      project: "nyc-artist-coalition",
      question: "Which of the 1,161 distinct posted short URLs should mature from complete inventory into source-level readings and future claims?",
      methods: [
        "Retain every recovered link in the public-safe manifest.",
        "Prioritize links that independently document coalition participation, policy sequence, partner relationships, implementation, or measurable outcomes.",
        "Keep mission context, reporting, official records, direct coverage, and project self-description as separate source roles."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Every recovered posted link has an inventory disposition.",
        "Representative source roles span Cabaret Law repeal, M.A.R.C.H. reporting, commercial rent, music-worker relief, ticketing policy, independent cultural spaces, and cultural-policy leadership.",
        "Existing knowledge-bank records already mature many campaign press and official policy sources independently of the social corpus."
      ],
      limitations: [
        "The complete link population has not received article-level close reading.",
        "A source circulated by @NYCArtC is not automatically coverage of the coalition or evidence of Jamie's role."
      ],
      sourceIds: [manifestSourceId, reportSourceId],
      publicSummary: "All recovered posted URLs are preserved; source-level maturation remains prioritized by evidentiary value rather than social circulation alone."
    }
  ]
};
