const reviewedAt = "2026-07-15";
const reportPath = "docs/knowledge-bank/wowlist-facebook-posts-2015-2018.md";
const ledgerPath = "docs/knowledge-bank/data/wowlist-facebook-post-ledger.json";

const sourceIds = [
  "SRC-WOWLIST-FACEBOOK-PAGE-POSTS-2026",
  "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
  "SRC-WOWLIST-FACEBOOK-CONTENT-LIBRARY-2026",
  "SRC-WOWLIST-FACEBOOK-COMMUNITY-PHILOSOPHY-2016",
  "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
  "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-2017",
  "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
  "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016"
] as const;

const observationIds = [
  "OBS-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION",
  "OBS-WOWLIST-FACEBOOK-FRESH-BIDIRECTIONAL-CONTROL",
  "OBS-WOWLIST-FACEBOOK-PUBLISHER-ATTRIBUTION",
  "OBS-WOWLIST-FACEBOOK-CONTENT-LIBRARY-BOUNDARY",
  "OBS-WOWLIST-FACEBOOK-PRIMARY-THEME-DISPOSITION",
  "OBS-WOWLIST-FACEBOOK-DESTINATION-NETWORK",
  "OBS-WOWLIST-FACEBOOK-VISIBLE-REACTION-SNAPSHOT",
  "OBS-WOWLIST-FACEBOOK-MEMBER-PHILOSOPHY",
  "OBS-WOWLIST-FACEBOOK-WOMENS-MARCH-ROUTE",
  "OBS-WOWLIST-FACEBOOK-LET-NYC-DANCE-BRIDGE",
  "OBS-WOWLIST-FACEBOOK-DENVER-DIY-FUND-CONTEXT",
  "OBS-WOWLIST-FACEBOOK-THE-KNOW-CLOSING-CONTEXT",
  "OBS-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY"
] as const;

export const wowListFacebookPostAudit = {
  distinctSurvivingPosts: 53,
  priorRenderedRecordsPerPass: [54, 54],
  priorRenderedPublisherAttributionsPerPass: [54, 54],
  featuredChronologyDuplicates: 1,
  freshForwardMessageRecords: 53,
  freshReverseMessageRecords: 53,
  freshExactMessageAgreement: 53,
  primaryThemeCounts: {
    productOnboardingAndCommunityGovernance: 13,
    eventAndParticipantAmplification: 12,
    culturalSpaceCareAndSafety: 18,
    civicMobilizationAndPublicCare: 7,
    adjacentCulturalKnowledgeAndOpportunity: 3
  },
  explicitDestinationOccurrences: 29,
  uniqueExplicitDestinations: 27,
  widerRenderedLinkOccurrences: 80,
  widerDistinctRenderedDestinations: 71,
  postsWithVisibleReactionLabels: 39,
  totalVisibleReactions: 88,
  currentFollowers: 185,
  currentFollowing: 2,
  contentLibraryRows: 5,
  ledgerPath,
  reportPath
} as const;

export const wowListFacebookPosts = {
  intakeItems: [
    {
      id: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      kind: "public-artifact",
      title: "WOW List Facebook Page post population",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: ["wowlist"],
      reason:
        "Account for every surviving Page-post record, preserve public source routes and mission-relevant patterns, and distinguish publishing action, shared authorship, mutable reactions, and historical completeness.",
      sourceUrl: "https://www.facebook.com/wowlist/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [...sourceIds],
      observationIds: observationIds.filter(
        (id) => id !== "OBS-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY"
      ),
      researchInquiryIds: [
        "INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026",
        "INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"
      ],
      boundaries: [
        "Complete means every distinct post exposed by the surviving July 2026 Page surface received a disposition; it does not mean a native Meta export or deletion history was recovered.",
        "The repository retains a redacted disposition ledger, aggregate controls, selected public sources, and limitations; raw post text, comments, participant relationship context, authentication state, and manager controls remain outside the repository.",
        "Facebook publisher attribution supports Jamie's publishing action for the recovered records, not sole lifetime administration or authorship of shared sources, quotations, images, events, or campaigns.",
        "Posted destinations establish routing, not endorsement, readership, click-through, stakeholder response, adoption, causality, or impact."
      ]
    },
    {
      id: "INTAKE-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY-2026",
      kind: "memory-lead",
      title: "Jamie memory that he managed WOW List's social presence",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["wowlist"],
      reason:
        "Preserve Jamie's broader role memory without silently upgrading a complete surviving Page-publisher record into a sole lifetime administration claim.",
      visibility: "public-safe",
      disposition: "researching",
      sourceIds: [],
      observationIds: ["OBS-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
      boundaries: [
        "This is Jamie's first-person memory and remains attributed to him.",
        "It requires a native Meta export, historical role records, or collaborator corroboration before it can become a public sole-management claim.",
        "WOW List was Jamie and Richard Album's project and depended on members, organizers, artists, venues, and local scene maintainers."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "Two earlier authenticated terminal traversals each recovered 54 rendered Page records; one community-philosophy post appeared in both Featured and chronology, leaving 53 distinct surviving posts with public-safe dispositions.",
      locator: "Protected two-pass population control and redacted 53-row ledger",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The surviving Page surface is not a native Meta export and cannot account for deleted, hidden, or unavailable historical records.",
        "Rendered records are platform presentation units; the duplicate was resolved by content-level close reading."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-FRESH-BIDIRECTIONAL-CONTROL",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "A fresh July 15 traversal recovered 53 unique message records from top to bottom and 53 from bottom to top, with exact message-level agreement across all 53 records.",
      locator: "Protected 101-step forward and 120-step reverse terminal-scroll control",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The exact agreement controls the currently rendered message-bearing population, not deleted history.",
        "Dynamic wrapper metadata differed by traversal and was excluded from record identity."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-PUBLISHER-ATTRIBUTION",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "Facebook's authenticated Page-management interface displayed 'Published by Jamie Burkart' on all 54 rendered records in each of two complete earlier traversals, representing 53 distinct surviving posts after Featured/chronology deduplication.",
      locator: "Manager-only publisher labels across two complete protected traversals",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
      limitations: [
        "Publisher attribution supports the Page publication action, not authorship of embedded sources, quoted members, campaign copy, events, images, or ideas.",
        "It does not establish sole lifetime administration of WOW List's Facebook Page or all project social accounts."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-CONTENT-LIBRARY-BOUNDARY",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-CONTENT-LIBRARY-2026",
      project: "wowlist",
      kind: "limitation",
      text:
        "The authenticated lifetime Content Library displayed five rows dated March 2017 through March 2018, while the older public timeline exposed a much larger surviving population.",
      locator: "Lifetime-filtered Page Content Library control",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The five-row modern library surface is not the denominator for the historical public timeline.",
        "Product-surface disagreement is retained as a finding rather than silently reconciled."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-PRIMARY-THEME-DISPOSITION",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      project: "wowlist",
      kind: "context",
      text:
        "The 53-post primary-theme disposition contains 13 product/onboarding/community-governance posts, 12 event/participant-amplification posts, 18 cultural-space care/safety posts, seven civic-mobilization/public-care posts, and three adjacent cultural-knowledge/opportunity posts.",
      locator: "Redacted 53-row public disposition ledger",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "Primary-theme classification is interpretive and assigns one category to each post even when concerns overlap.",
        "Theme frequency does not measure readership, endorsement, adoption, or impact."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-DESTINATION-NETWORK",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "The census recovered 29 explicit destination occurrences across 26 records, resolving to 27 canonical routes: 19 WOW List destinations and eight external destinations; the wider rendered graph contained 80 non-control occurrences resolving to 71 distinct public destinations.",
      locator: "Normalized explicit-route inventory and aggregate rendered-link graph",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-DESTINATION-NETWORK"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The wider graph includes source, social, event, media, and profile links; participant-level relationships are not published as a graph.",
        "A posted destination establishes routing, not endorsement, readership, conversion, partnership, or impact."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-VISIBLE-REACTION-SNAPSHOT",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      project: "wowlist",
      kind: "source-fact",
      text:
        "The July 14 interface snapshot displayed 88 reaction labels across 39 surviving posts; one featured nine-city video displayed 13 likes, three comments, and 53 views.",
      locator: "Protected current-label aggregation across the surviving post census",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-VISIBLE-TRACTION-SNAPSHOT"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The values are mutable interface displays and are not historical analytics or unique people.",
        "They do not establish stakeholder-group engagement, reach, adoption, endorsement, attendance, causality, or impact."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-MEMBER-PHILOSOPHY",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-COMMUNITY-PHILOSOPHY-2016",
      project: "wowlist",
      kind: "context",
      text:
        "A public member account describes WOW List as community-first infrastructure intended to reduce ownership friction and make it easier for people to gather.",
      locator: "Attributed member statement in the public Page post",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-STAKEHOLDER-PARTICIPATION"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "This is participant testimony, not independent evidence of platform-wide consensus, adoption, or impact.",
        "The member retains authorship of the statement."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-WOMENS-MARCH-ROUTE",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
      project: "wowlist",
      kind: "source-fact",
      text:
        "WOW List used its calendar form to route readers toward distributed Women's March gatherings.",
      locator: "Public Page post and linked WOW List calendar route",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The post does not establish WOW List organization of the marches.",
        "It does not establish resulting attendance or civic impact."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-LET-NYC-DANCE-BRIDGE",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-2017",
      project: "wowlist",
      kind: "source-fact",
      text:
        "Jamie published a WOW List post framing Cabaret Law repeal as support for community spaces and routing readers into NYC Artist Coalition action and reporting.",
      locator: "Public post plus protected manager publisher attribution",
      status: "verified",
      publicSafe: true,
      claimIds: [
        "CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE",
        "CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The shared campaign material retains NYC Artist Coalition and collective authorship.",
        "Addressing or tagging a stakeholder does not prove viewing, endorsement, action, or causality for repeal."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-DENVER-DIY-FUND-CONTEXT",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
      project: "wowlist",
      kind: "source-fact",
      text:
        "Westword reported a Denver Arts & Venues and Meow Wolf funding arrangement for local DIY spaces following closures, code enforcement, and heightened safety scrutiny.",
      locator: "Article close reading",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The article is context routed by WOW List, not coverage of WOW List.",
        "It does not establish that Jamie or WOW List organized the fund."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-THE-KNOW-CLOSING-CONTEXT",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016",
      project: "wowlist",
      kind: "source-fact",
      text:
        "Willamette Week reported that Portland venue The Know planned to close after a substantial rent increase while seeking a new location.",
      locator: "Article close reading",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The article is context routed by WOW List, not coverage of WOW List.",
        "It does not establish WOW List involvement in the venue or impact from sharing."
      ]
    },
    {
      id: "OBS-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY",
      intakeId: "INTAKE-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY-2026",
      project: "wowlist",
      kind: "participant-memory",
      text:
        "Jamie remembers that, while WOW List was his and Richard Album's project, he managed the project's social presence.",
      locator: "Jamie first-person memory supplied July 15, 2026",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT-MEMORY"],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
      limitations: [
        "The memory is attributed to Jamie and is not treated as a third-party confirmation.",
        "The complete surviving Facebook publisher record corroborates substantial Page operation but does not establish sole management of every historical social account."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-WOWLIST-FACEBOOK-PAGE-POSTS-2026",
      title: "WOW List Facebook Page",
      organization: "WOW List",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist/",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List Facebook Page, authenticated public-surface review, July 2026.",
      publicNote:
        "The Page describes WOW List as an event-sharing and community-building project with the motto 'Being there changes everything' and displays 185 followers and two following in the July 2026 snapshot.",
      supportsGenerally: [
        "the current public Page identity",
        "the event-sharing and community-building description",
        "the mutable July 2026 follower display"
      ],
      doesNotEstablish: [
        "a native Meta export or deletion history",
        "historical reach, active users, adoption, endorsement, or impact",
        "administrator chronology or individual post authorship"
      ]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
      title: "WOW List Facebook Page-post population accounting run",
      author: "Codex authenticated archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14 through 2026-07-15",
      publicCitation:
        "Public-safe aggregate metadata from independent July 2026 traversals of the surviving WOW List Facebook Page-post timeline.",
      publicNote:
        "The public repository retains aggregate accounting, a redacted 53-row disposition ledger, explicit public routes, selected source records, and limitations. Raw text, comments, participant relationship context, and manager state remain protected.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001",
      supportsGenerally: [
        "53 distinct surviving post records",
        "53-for-53 fresh bidirectional message agreement",
        "manager publisher attribution to Jamie across the complete earlier rendered population",
        "primary-theme, explicit-route, wider-link, and mutable-reaction aggregates"
      ],
      doesNotEstablish: [
        "that no historical post was deleted, hidden, or made unavailable",
        "sole lifetime administration of the Page or every WOW List social account",
        "individual authorship of shared sources, quotations, images, events, or campaigns",
        "historical analytics, unique people, stakeholder-group engagement, adoption, endorsement, attendance, causality, or impact"
      ]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-CONTENT-LIBRARY-2026",
      title: "WOW List Meta Content Library lifetime control",
      organization: "Meta",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      publicCitation:
        "Public-safe aggregate metadata from the WOW List Page's authenticated lifetime Content Library view, July 2026.",
      publicNote:
        "The modern Content Library displayed five published rows dated March 2017 through March 2018. It is retained as a separate product-surface control rather than treated as the historical denominator.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-CONTENT-LIBRARY-2026-001",
      supportsGenerally: ["five displayed lifetime-library rows", "the five displayed publication dates"],
      doesNotEstablish: ["that WOW List published only five posts", "a complete lifetime archive", "stable historical analytics"]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-COMMUNITY-PHILOSOPHY-2016",
      title: "WOW List community-philosophy post",
      organization: "WOW List",
      kind: "public-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-05-23",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist/posts/515811585292320",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List community-philosophy post, May 23, 2016.",
      publicNote:
        "The post republishes a member's account of a WOW List online hangout and describes community-first design intended to make gathering easier.",
      supportsGenerally: ["a member-articulated community-first design philosophy", "an online member-feedback setting"],
      doesNotEstablish: ["platform-wide consensus", "adoption or impact", "Jamie's authorship of the member's statement"]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
      title: "WOW List Women's March calendar post",
      organization: "WOW List",
      kind: "public-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-01-13",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist/posts/616983925175085",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List Women's March calendar post, January 13, 2017.",
      publicNote:
        "The post routes readers to a WOW List calendar for distributed Women's March gatherings.",
      supportsGenerally: ["a public civic-gathering calendar route", "reuse of the calendar form for distributed marches"],
      doesNotEstablish: ["WOW List organization of the Women's March", "attendance generated by the post", "causal civic impact"]
    },
    {
      id: "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-2017",
      title: "WOW List Let NYC Dance advocacy post",
      organization: "WOW List",
      kind: "public-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-07-03",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/wowlist/posts/702379893302154",
      preferredPublicUrl: "canonical",
      publicCitation: "WOW List Let NYC Dance advocacy post, July 3, 2017.",
      publicNote:
        "The post republishes NYC Artist Coalition material, routes readers to Cabaret Law repeal action and reporting, and addresses elected and cultural stakeholders. The campaign material retains collective authorship.",
      supportsGenerally: ["cross-project publication by Jamie", "routing from WOW List into Let NYC Dance advocacy", "public stakeholder-addressing practice"],
      doesNotEstablish: ["that addressed stakeholders saw, endorsed, or acted on the post", "Jamie's sole authorship or leadership of the coalition campaign", "causality for Cabaret Law repeal"]
    },
    {
      id: "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
      title: "City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund",
      author: "Patricia Calhoun",
      organization: "Denver Westword",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-03-09",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Patricia Calhoun, 'City Partners With Meow Wolf on $20,000 Denver DIY Spaces Fund,' Denver Westword, March 9, 2017.",
      publicNote:
        "WOW List shared the reporting as cultural-space support context. The article documents a Denver Arts & Venues and Meow Wolf funding arrangement following venue closures and heightened safety scrutiny.",
      supportsGenerally: ["the cultural-space policy and funding context routed by WOW List"],
      doesNotEstablish: ["press coverage of WOW List", "a WOW List partnership or grant", "Jamie organization of the fund", "impact from sharing"]
    },
    {
      id: "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016",
      title: "The Know Is Closing",
      author: "Matthew Singer",
      organization: "Willamette Week",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-07-01",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.wweek.com/bars/2016/07/01/the-know-is-closing/",
      preferredPublicUrl: "canonical",
      publicCitation: "Matthew Singer, 'The Know Is Closing,' Willamette Week, July 1, 2016.",
      publicNote:
        "WOW List shared the reporting as cultural-space sustainability context. The article reports a Portland venue's planned closure after a substantial rent increase and its intended relocation.",
      supportsGenerally: ["the cultural-space affordability and continuity context routed by WOW List"],
      doesNotEstablish: ["press coverage of WOW List", "WOW List involvement in the venue", "a general causal rule about venue closures", "impact from sharing"]
    }
  ],
  claims: [
    {
      id: "CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION",
      project: "wowlist",
      internalClaim:
        "Two earlier terminal traversals reconciled to 53 distinct surviving posts after one Featured/chronology duplicate, and a fresh bidirectional traversal independently recovered the same 53 message records in both directions.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The surviving July 2026 WOW List Facebook Page surface contains 53 distinct post records after one Featured/chronology duplicate; a fresh bidirectional control recovered the same 53 message records in both directions.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["the prior two-pass deduplication and fresh 53-for-53 bidirectional control"],
          locator: "Protected terminal-scroll controls and public-safe disposition ledger",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means every distinct post exposed by the surviving July 2026 Page surface received a disposition.",
        "The result is not a native Meta export and cannot establish that only 53 posts were ever published."
      ],
      antiClaims: [
        "WOW List published only 53 Facebook posts in its lifetime",
        "The census is a native Meta export or deletion history",
        "The five-row Content Library is the historical denominator"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-JAMIE-PUBLISHING-PRACTICE",
      project: "wowlist",
      internalClaim:
        "Facebook's authenticated Page-management interface attributed publication of the complete surviving WOW List Page-post record to Jamie Burkart.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Beyond co-building the platform, Jamie operated WOW List's Facebook publishing surface across the surviving 2015-2018 record, connecting product guidance, member contributions, threatened cultural spaces, civic gathering routes, and project updates under one public identity.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["manager publisher attribution to Jamie across both complete earlier rendered traversals"],
          locator: "Protected manager-only publisher labels",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-PAGE-POSTS-2026",
          relationship: "context",
          supports: ["the surviving public project identity and Page purpose"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-2017",
          relationship: "corroborating",
          supports: ["one public cross-project civic publishing example"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use 'published' or 'operated the Page publishing surface,' not 'personally authored every post.'",
        "WOW List was Jamie and Richard Album's project and depended on members, organizers, artists, venues, and local scene maintainers.",
        "Shared sources, statements, events, campaigns, images, and participant work retain their original authorship and collective credit.",
        "The record does not establish sole lifetime administration, all-project social management, platform adoption, or impact."
      ],
      antiClaims: [
        "Jamie alone created or operated WOW List",
        "Jamie was the sole lifetime administrator of every WOW List social account",
        "Jamie authored every sentence, quotation, image, event, campaign, or linked source",
        "Facebook publishing proves adoption, reach, or impact"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review", "Codex Chad-lens review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-MISSION-PRACTICE",
      project: "wowlist",
      internalClaim:
        "The complete surviving Facebook corpus repeatedly connects product onboarding and community governance with event circulation, cultural-space care and safety, civic gathering, and adjacent cultural knowledge.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The complete surviving Page record joins product onboarding and community governance to event circulation, cultural-space care, civic gathering, and adjacent cultural knowledge.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["the complete 53-post primary-theme disposition"],
          locator: "Redacted public disposition ledger",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
          relationship: "corroborating",
          supports: ["civic reuse of the calendar form"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WESTWORD-DENVER-DIY-SPACES-FUND-2017",
          relationship: "context",
          supports: ["one cultural-space policy and funding context routed by WOW List"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WILLAMETTE-WEEK-THE-KNOW-CLOSING-2016",
          relationship: "context",
          supports: ["one cultural-space affordability and continuity context routed by WOW List"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The categories are a one-primary-theme archival classification, not mutually exclusive truths.",
        "Routing a source or action does not establish authorship, organization, partnership, agreement with every linked claim, or resulting impact."
      ],
      antiClaims: [
        "WOW List organized every amplified event, march, space, article, or fund",
        "Theme frequency proves audience reach, adoption, or civic impact",
        "A shared article is press coverage of WOW List"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-STAKEHOLDER-PARTICIPATION",
      project: "wowlist",
      internalClaim:
        "The surviving Page record preserves participation by local-scene maintainers and members who promoted WOW List, updated calendars, added events, made a tutorial, and articulated community-first values.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The Page record preserves members and local-scene maintainers promoting WOW List, updating calendars, adding events, making a tutorial, and articulating community-first values.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["the recovered participant, tutorial, local-calendar, and onboarding pattern"],
          locator: "Redacted 53-row disposition ledger",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-COMMUNITY-PHILOSOPHY-2016",
          relationship: "corroborating",
          supports: ["one attributed member account of project values and use"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is a bounded participation pattern in the surviving social record, not a complete user census.",
        "Public praise, tutorials, event additions, or local promotion do not establish representative satisfaction, formal partnership, national adoption, or durable impact."
      ],
      antiClaims: [
        "Every featured participant endorsed every aspect of WOW List",
        "The examples prove active adoption across every archived city scene",
        "Jamie's publishing action makes him the author of participants' statements or work"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-DESTINATION-NETWORK",
      project: "wowlist",
      internalClaim:
        "The complete surviving corpus exposes 29 explicit route occurrences resolving to 27 canonical destinations, within a wider rendered graph of 80 non-control occurrences and 71 distinct public destinations.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The corpus preserves 29 explicit route occurrences resolving to 27 canonical destinations; a wider rendered link graph remains aggregate-only where it would expose participant relationships.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["normalized explicit-route and wider rendered-link counts"],
          locator: "Protected link extraction and redacted canonical-destination inventory",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Only the 27 explicit canonical routes are listed publicly; the wider relationship-bearing link graph remains aggregate-only.",
        "Posted routes do not establish click-through, readership, conversion, endorsement, partnership, adoption, or impact."
      ],
      antiClaims: [
        "Every linked destination was a formal WOW List partner",
        "Every rendered social/profile link was intentionally authored as a destination",
        "Posted links prove stakeholder response or resulting action"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-VISIBLE-TRACTION-SNAPSHOT",
      project: "wowlist",
      internalClaim:
        "A July 14, 2026 interface snapshot displayed 88 reactions across 39 surviving posts; one featured nine-city video displayed 13 likes, three comments, and 53 views.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text:
            "A mutable July 2026 interface snapshot displayed 88 reactions across 39 surviving posts; these values are retained as current labels, not historical analytics or impact.",
          status: "active",
          citationRequired: false,
          surfaces: [reportPath]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["the current visible-reaction aggregation and featured-video labels"],
          locator: "Protected July 14 interface-label control",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The values are mutable platform labels and not historical analytics or unique people.",
        "No stakeholder-group engagement count was defensibly recovered.",
        "The values do not measure reach, adoption, endorsement, attendance, causality, or impact."
      ],
      antiClaims: [
        "Eighty-eight people engaged with WOW List",
        "The reactions represent key stakeholder engagement",
        "The snapshot measures historical reach, adoption, attendance, or impact"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT-MEMORY",
      project: "wowlist",
      internalClaim:
        "Jamie remembers that he managed WOW List's social presence while the project itself was co-created with Richard Album.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie remembers managing WOW List's social presence; the broader sole-management wording remains held pending native role records or collaborator corroboration.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [],
      boundaries: [
        "This is Jamie's attributed first-person memory, not an independent collaborator statement.",
        "The complete surviving Facebook publisher record corroborates substantial Page operation but not sole lifetime management of every social account.",
        "WOW List remains credited as Jamie and Richard Album's project with community contribution."
      ],
      antiClaims: [
        "Jamie has been independently confirmed as the sole manager of every WOW List social account",
        "Richard Album and community contributors had no role in the project's public identity",
        "The surviving Facebook Page proves all historical social labor"
      ],
      researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-FACEBOOK-POST-POPULATION-2026",
      project: "wowlist",
      question:
        "Can every distinct post exposed by the surviving WOW List Facebook Page receive a public-safe disposition with source, mission, stakeholder, traction, and credit boundaries?",
      methods: [
        "Completed two authenticated terminal traversals of the Page surface and resolved a Featured/chronology duplicate.",
        "Repeated the crawl on July 15 from top to bottom and bottom to top; both directions recovered the same 53 exact message signatures.",
        "Close-read every retained post and assigned one primary theme and route label.",
        "Normalized explicit public destinations, counted the wider rendered link graph, and retained participant-bearing relationships only as aggregates.",
        "Aggregated current visible-reaction labels separately from authorship, stakeholder identity, historical analytics, and impact.",
        "Close-read selected public posts and independent articles while preserving source and collective authorship."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The surviving Page surface contains 53 distinct posts after one Featured/chronology duplicate.",
        "The fresh forward and reverse controls recovered the same 53 message signatures.",
        "Every post has a public-safe primary-theme disposition in the redacted ledger.",
        "The corpus repeatedly joins product guidance, participant circulation, cultural-space care, civic gathering, and adjacent cultural knowledge.",
        "Twenty-nine explicit routes resolve to 27 canonical destinations; the wider graph contains 80 non-control occurrences and 71 distinct destinations.",
        "Current reactions are preserved as a bounded snapshot, while no defensible stakeholder-group engagement count was recovered."
      ],
      limitations: [
        "The authenticated interface is not a native Meta export and cannot expose deleted, hidden, or unavailable historical posts.",
        "Raw text, comments, participant relationship context, manager controls, and authentication state remain outside the public repository.",
        "Publisher attribution does not transfer authorship from people, organizations, spaces, campaigns, events, quotations, images, or linked sources.",
        "Links and mutable reactions do not establish readership, endorsement, stakeholder response, adoption, attendance, causality, or impact."
      ],
      sourceIds: [...sourceIds],
      publicSummary:
        "Every one of the 53 distinct surviving posts received a public-safe disposition. The complete Page record preserves a coherent practice of product guidance, participant amplification, cultural-space care, and civic routing while keeping collective credit, mutable reactions, and historical completeness bounded.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001"
    },
    {
      id: "INQ-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026",
      project: "wowlist",
      question:
        "What can the surviving publisher record establish about Jamie's management of WOW List's social presence, and what remains open?",
      methods: [
        "Recorded Jamie's first-person memory as a separate attributed intake.",
        "Inspected manager-only publisher labels across two complete traversals of the surviving Facebook Page.",
        "Separated publication action from source authorship, project co-creation, administrator chronology, and all-account management.",
        "Defined native Meta role/export records and Richard Album corroboration as the next evidence threshold."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Facebook attributed every recovered rendered Page-post record to Jamie in two complete traversals.",
        "The surviving record supports substantial, coherent Page-publishing operation by Jamie.",
        "Jamie's broader memory that he managed all WOW List social presence remains attributed and held.",
        "WOW List remains credited as Jamie and Richard Album's project with member, organizer, artist, venue, and local-maintainer contribution."
      ],
      limitations: [
        "The Page interface does not supply a complete historical administrator or role ledger.",
        "Deleted or unavailable records may not appear.",
        "The evidence does not identify who authored every source, quotation, image, campaign, event, or underlying idea.",
        "No collaborator proof note or native export was reviewed in this pass."
      ],
      sourceIds: [
        "SRC-WOWLIST-FACEBOOK-PAGE-POSTS-2026",
        "SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026",
        "SRC-WOWLIST-FACEBOOK-LET-NYC-DANCE-2017"
      ],
      publicSummary:
        "The complete surviving Facebook Page record supports Jamie's Page-publishing operation. Sole lifetime management of every WOW List social account remains an attributed memory and open research question.",
      protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-2026-001"
    }
  ]
};
