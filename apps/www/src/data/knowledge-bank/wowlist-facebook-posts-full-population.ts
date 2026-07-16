import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-16";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public-safe archival review"
];

export const wowListFacebookPostSources: SourceRecord[] = [
  {
    id: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
    title: "WOW List Facebook posts full-population public ledger",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    assetUrl:
      "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.json",
    preferredPublicUrl: "asset",
    publicCitation:
      "Public-safe ledger of the 54 WOW List Facebook post records exposed by the authenticated legacy Lifetime table, reconciled July 16, 2026.",
    publicNote:
      "The ledger separates canonical public post IDs from legacy management content IDs and publishes dates, public URLs, classifications, source dispositions, integrity controls, and explicit anti-inference boundaries without republishing post text or private analytics.",
    supportsGenerally: [
      "54 materialized post records from April 25, 2015, through March 22, 2018",
      "51 renderable details attributed to Jamie Burkart as Page publisher",
      "three video redirects without a recovered publisher byline",
      "42 normalized destination URLs",
      "overlapping mission-pattern classifications",
      "exact reconciliation of 29 native owner-export post IDs"
    ],
    doesNotEstablish: [
      "an all-ever history that includes deleted or unexposed records",
      "sole authorship, sole ownership, or exclusive management",
      "engager identity, stakeholder-group counts, endorsement, attendance, reach, conversion, or impact",
      "causation of linked campaigns or reported outcomes"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-POST-PROTECTED-RUN-2026",
    title: "Authenticated WOW List Facebook post reconciliation run",
    organization: "WOW List",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Protected authenticated review of the complete WOW List Facebook post population exposed by Meta's legacy Lifetime table, July 15-16, 2026.",
    publicNote:
      "The protected run preserves management-table captures, detail audits, canonical-ID reconciliation, and publisher-byline observations. Raw social copy, comments, identities, authenticated state, and private analytics remain outside the public repository.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001",
    supportsGenerally: [
      "stable terminal table accounting",
      "canonical and legacy identifier mapping",
      "publisher-byline review",
      "public-safe ledger derivation"
    ],
    doesNotEstablish: [
      "permission to publish private analytics or personal traces",
      "records deleted or not exposed by Meta",
      "sole authorship of shared material"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-OWNER-EXPORT-2026",
    title: "WOW List native Meta post owner export",
    organization: "Meta / WOW List",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Protected native Meta owner-export review for WOW List Facebook posts, July 16, 2026.",
    publicNote:
      "Three one-year export jobs completed. One 29-row file was recovered and exactly matched canonical post ordinals 4 through 32; the other two completed files were blocked by the browser client and remain unverified. The recovered file reports two Page IDs under the WOW List name, preserved as an unresolved Meta identity or migration artifact.",
    protectedLocatorId: "RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-002",
    supportsGenerally: [
      "29 exact canonical-ID matches",
      "distinction between canonical post IDs and legacy management content IDs",
      "native owner-export date and post-link fields",
      "observed 22/7 Page-ID distribution under the WOW List Page name",
      "27 exact calendar-date matches and two one-day interface/timezone shifts"
    ],
    doesNotEstablish: [
      "file-level verification of the other two completed exports",
      "why Meta reports two Page IDs under one Page name",
      "a single calendar convention shared across Meta interfaces",
      "a common metric definition across Meta interfaces",
      "permission to publish administrator analytics"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-PAGE-SNAPSHOT-2026",
    title: "WOW List Facebook Page capture-date profile",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.facebook.com/wowlist/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List Facebook Page, capture-date profile reviewed July 15, 2026.",
    publicNote:
      "The current Page displayed 185 followers. This volatile profile value is retained only as a dated snapshot and is not used as historical reach or an accomplishment metric.",
    supportsGenerally: ["current Page identity", "dated current follower display"],
    doesNotEstablish: [
      "historical audience during 2015-2018",
      "engagement, adoption, conversion, endorsement, or impact"
    ]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-WESTWORD-2017",
    title: "City Partners with Meow Wolf on $20,000 Denver DIY Spaces Fund",
    organization: "Westword",
    author: "Kyle Harris",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-09",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Kyle Harris, 'City Partners with Meow Wolf on $20,000 Denver DIY Spaces Fund,' Westword, March 9, 2017.",
    publicNote:
      "The article supplies field context for a funding source circulated by WOW List; it is not coverage of WOW List.",
    supportsGenerally: [
      "Denver Arts & Venues' $20,000 contribution",
      "Meow Wolf administration of a fund for DIY and alternative spaces"
    ],
    doesNotEstablish: ["WOW List created, administered, funded, or caused the program"]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-GOTHAMIST-SILENT-BARN-2015",
    title: "Bushwick Venue Silent Barn Struggling To Regroup After Fire",
    organization: "Gothamist",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2015-09-30",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/bushwick-venue-silent-barn-struggling-to-regroup-after-fire",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Gothamist, 'Bushwick Venue Silent Barn Struggling To Regroup After Fire,' September 30, 2015.",
    publicNote:
      "Contemporaneous reporting supplies field context for the recovery links circulated by WOW List.",
    supportsGenerally: ["fire damage", "resident displacement", "donation and repair context"],
    doesNotEstablish: ["WOW List caused donations, repairs, attendance, or recovery"]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-BROKELYN-SHEA-2017",
    title: "Shea Stadium needs your help to reopen, kicks off $50K Kickstarter",
    organization: "Brokelyn",
    author: "Ben Weiss",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-22",
    accessedAt: reviewedAt,
    canonicalUrl: "https://brokelyn.com/shea-needs-your-help/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Ben Weiss, 'Shea Stadium needs your help to reopen, kicks off $50K Kickstarter,' Brokelyn, March 22, 2017.",
    publicNote:
      "The report supplies field context for a reopening campaign circulated by WOW List.",
    supportsGenerally: ["a $50,000 reopening campaign", "architectural and code-compliance needs"],
    doesNotEstablish: ["WOW List organized the campaign or caused its fundraising result"]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-STATE-PRESS-TRUNK-2016",
    title: "The Trunk Space finds new home in downtown Phoenix",
    organization: "The State Press",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-10-16",
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://www.statepress.com/article/2016/10/spartscult-trunk-space-new-location",
    preferredPublicUrl: "canonical",
    publicCitation:
      "The State Press, 'The Trunk Space finds new home in downtown Phoenix,' October 16, 2016.",
    publicNote:
      "The report corroborates a venue relocation following the funding effort circulated by WOW List.",
    supportsGenerally: ["a new downtown Phoenix home", "renovation and volunteer context"],
    doesNotEstablish: ["WOW List secured, funded, or caused the relocation"]
  },
  {
    id: "SRC-WOWLIST-FACEBOOK-OC-DIY-2015",
    title: "Orange County DIY community archive",
    organization: "Orange County Punk Zine",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2015-10-01",
    accessedAt: reviewedAt,
    canonicalUrl: "https://orangecountypunkzine.tumblr.com/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Orange County Punk Zine, Orange County DIY community-space post, October 1, 2015.",
    publicNote:
      "The community archive supplies field context for a space-funding link circulated by WOW List.",
    supportsGenerally: [
      "an all-ages, safer, sober, community-driven arts and music space effort"
    ],
    doesNotEstablish: ["WOW List owned, directed, or caused the effort or its fundraising"]
  }
];

export const wowListFacebookPostClaims: ClaimRecord[] = [
  {
    id: "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
    project: "wowlist",
    internalClaim:
      "As one of WOW List's co-builders, Jamie stewarded the project's Facebook publishing from 2015 through 2018; all 51 renderable details in the surviving 54-post owner record identify him as Page publisher, while three video redirects expose no byline.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "As one of WOW List's co-builders, I also stewarded its Facebook publishing from 2015 through 2018. Across the surviving 54-post owner record, all 51 renderable post details identify me as Page publisher; shared posts retain their original authorship.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale:
          "Make sustained distribution and operating ownership legible while preserving Richard Album's co-builder credit and the authorship of shared sources."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: ["54-post owner record", "51 Page-publisher bylines", "2015-2018 range"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-PROTECTED-RUN-2026",
        relationship: "private-support",
        supports: ["authenticated detail review and derivation provenance"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-OWNER-EXPORT-2026",
        relationship: "corroborating",
        supports: ["29 exact canonical-ID matches"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The denominator is complete as materialized in the capture-date legacy Lifetime table, not proof of all-ever history.",
      "A Page-publisher byline does not establish sole authorship of shared or quoted material.",
      "WOW List was co-built by Jamie Burkart and Richard Album.",
      "Three public video redirects do not expose a publisher byline."
    ],
    antiClaims: [
      "Jamie solely created or owned WOW List.",
      "Jamie authored every source or message circulated by the Page.",
      "The surviving record contains every post ever made or later deleted."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-OWNER-EXPORT-COMPLETION"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-DISTRIBUTION-PRACTICE",
    project: "wowlist",
    internalClaim:
      "The complete materialized Facebook record connects community-calendar onboarding and product feedback with event distribution, cultural-space mutual aid and funding, civic mobilization, and community care.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text:
          "The Page connected product support with field practice: calendar onboarding and participatory feedback sat alongside event distribution, cultural-space recovery and funding, civic-action calendars, and community care.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
        rationale:
          "Show how product operations and public communication formed one mission-aligned distribution practice without importing causal impact claims."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
        relationship: "direct-support",
        supports: ["54-record classification", "42-link inventory", "overlapping mission patterns"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-WESTWORD-2017",
        relationship: "context",
        supports: ["peer cultural-space funding context"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-GOTHAMIST-SILENT-BARN-2015",
        relationship: "context",
        supports: ["cultural-space recovery context"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-BROKELYN-SHEA-2017",
        relationship: "context",
        supports: ["venue reopening and compliance context"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-STATE-PRESS-TRUNK-2016",
        relationship: "context",
        supports: ["venue relocation and reopening context"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-OC-DIY-2015",
        relationship: "context",
        supports: ["all-ages community-space effort context"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Theme counts overlap and cannot be summed into a unique post total.",
      "Circulation is not authorship, endorsement by linked organizations, or causation of campaign outcomes.",
      "The captures do not identify a complete population of reactors or commenters."
    ],
    antiClaims: [
      "WOW List created or caused the linked campaigns and outcomes.",
      "Every linked organization engaged with or endorsed WOW List.",
      "The mission-pattern counts represent unique posts when summed."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-STAKEHOLDER-ENGAGEMENT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-FACEBOOK-TRACTION-METRICS",
    project: "wowlist",
    internalClaim:
      "Meta's legacy table and native owner export expose differently named and bounded analytics; no defensible common traction metric or identity-complete stakeholder-engagement count was recovered.",
    status: "use-with-care",
    projections: [
      {
        key: "archive-note",
        text:
          "Capture-date Meta analytics remain protected and held because the legacy table and native export do not expose a demonstrated common metric definition.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
        rationale:
          "A small or large number is not useful if its denominator, uniqueness, and interface definition cannot be defended."
      }
    ],
    evidence: [
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-POST-PROTECTED-RUN-2026",
        relationship: "private-support",
        supports: ["legacy management analytics"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-OWNER-EXPORT-2026",
        relationship: "private-support",
        supports: ["native owner-export analytics and metric-label difference"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-WOWLIST-FACEBOOK-PAGE-SNAPSHOT-2026",
        relationship: "supports-boundary",
        supports: ["dated current follower display held from accomplishment messaging"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Do not publish administrator analytics from the protected exports.",
      "Do not infer unique people, stakeholder groups, attendance, endorsement, conversion, or impact.",
      "The current 185-follower display is not historical reach."
    ],
    antiClaims: [
      "Legacy impressions and native reach are interchangeable.",
      "Shared links prove engagement by the linked organizations.",
      "A current follower count measures historical project impact."
    ],
    researchInquiryIds: ["INQ-WOWLIST-FACEBOOK-STAKEHOLDER-ENGAGEMENT"],
    reviewedAt,
    reviewedBy
  }
];

export const wowListFacebookPostInquiries: ResearchInquiry[] = [
  {
    id: "INQ-WOWLIST-FACEBOOK-OWNER-EXPORT-COMPLETION",
    project: "wowlist",
    question:
      "Can the two completed but browser-blocked owner-export files be recovered and reconciled without publishing administrator analytics?",
    methods: [
      "Generated three one-year native Meta post export jobs spanning April 2015 through March 2018.",
      "Recovered and parsed the March 31, 2016-March 30, 2017 file.",
      "Compared its post links in order against the canonical publisher-audit population."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "All three export jobs displayed Completed status.",
      "The recovered 29-row file exactly matched canonical ordinals 4 through 32.",
      "The native export confirms that legacy management content IDs are not always canonical public post IDs."
    ],
    limitations: [
      "The browser client blocked recovery of the first and third files.",
      "Completed job status is not file-level verification.",
      "Deleted or otherwise unexposed records remain unknowable from the reviewed surfaces."
    ],
    sourceIds: [
      "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
      "SRC-WOWLIST-FACEBOOK-OWNER-EXPORT-2026"
    ],
    publicSummary:
      "One native export file exactly reconciles 29 consecutive canonical records; two completed export files remain unrecovered."
  },
  {
    id: "INQ-WOWLIST-FACEBOOK-STAKEHOLDER-ENGAGEMENT",
    project: "wowlist",
    question:
      "Which people or stakeholder groups demonstrably engaged back with WOW List's Facebook publishing, rather than merely appearing as linked sources, mentions, or shared-post originators?",
    methods: [
      "Reviewed every materialized management record and every recoverable detail route.",
      "Normalized 42 posted destinations and close-read six mission-relevant sources.",
      "Kept linked organizations and source authors separate from reactors, commenters, endorsers, and partners."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "The corpus demonstrates a broad source and mission ecosystem.",
      "It does not expose an identity-complete reaction or comment population.",
      "No stakeholder-group engagement count is promoted."
    ],
    limitations: [
      "Administrative analytics do not supply a complete public identity denominator.",
      "Shared-post origin, mention, and linked destination are not engagement or endorsement.",
      "Current interface state may omit historical reactions and comments."
    ],
    sourceIds: [
      "SRC-WOWLIST-FACEBOOK-POST-LEDGER-2026",
      "SRC-WOWLIST-FACEBOOK-POST-PROTECTED-RUN-2026"
    ],
    publicSummary:
      "The source ecosystem is preserved, but stakeholder engagement remains unquantified because the available capture is not identity-complete."
  }
];

export const wowListFacebookPostIntake: IntakeRecordInput[] = [
  {
    id: "INT-WOWLIST-FACEBOOK-POSTS-2026",
    receivedAt: reviewedAt,
    kind: "public-artifact",
    visibility: "public-safe",
    title: "WOW List Facebook posts full-population archival pass",
    description:
      "Authenticated archival production over all 54 post records exposed by the legacy Lifetime table, reconciled against public detail routes and a native owner-export segment.",
    whyItMatters:
      "The record establishes Jamie's bounded Page-publishing stewardship and the project's mission-aligned distribution practice while preventing shared sources and incompatible analytics from becoming inflated authorship or impact claims.",
    projectIds: ["wowlist"],
    status: "matured",
    disposition: "claim-created",
    dispositionNote:
      "Created two active case-study projections, held incompatible traction metrics, and opened bounded owner-export and stakeholder-engagement inquiries.",
    sourceIds: wowListFacebookPostSources.map((source) => source.id),
    claimIds: [
      "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
      "CLM-WOWLIST-FACEBOOK-DISTRIBUTION-PRACTICE",
      "CLM-WOWLIST-FACEBOOK-TRACTION-METRICS"
    ],
    inquiryIds: [
      "INQ-WOWLIST-FACEBOOK-OWNER-EXPORT-COMPLETION",
      "INQ-WOWLIST-FACEBOOK-STAKEHOLDER-ENGAGEMENT"
    ],
    artifactPaths: [
      "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.json",
      "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.manifest.json",
      "docs/knowledge-bank/projects/wowlist-facebook-posts.md",
      "docs/knowledge-bank/runs/2026-07-16-wowlist-facebook-posts-full-population.md"
    ],
    boundaries: [
      "The population is complete as materialized, not an all-ever guarantee.",
      "WOW List was co-built by Jamie Burkart and Richard Album.",
      "Page-publisher attribution is not sole authorship.",
      "Raw social text, identities, comments, and administrator analytics remain protected.",
      "Linked organizations are not counted as engagers or endorsers."
    ]
  }
];
