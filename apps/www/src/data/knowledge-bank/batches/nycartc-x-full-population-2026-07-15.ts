import type {
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

export const nycArtCXFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
} = {
  intake: [
    {
      id: "INT-NAC-X-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-15",
      capturedFrom:
        "Authenticated @NYCArtC timeline traversal and monthly historical authored-search partitions",
      publicSafeSummary:
        "A governed population accounting for @NYCArtC: 3,367 recovered account items, an explicit 1,757-item gap against the 5,124-post profile count, 19 context-only public records after cross-partition deduplication, resolved account-item links, campaign markers, source leads, stakeholder-communication patterns, and public-safety boundaries.",
      projects: ["nyc-artist-coalition"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-NAC-X-CORPUS-2026-07-15",
        "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
        "SRC-NAC-GOTHAMIST-REPEAL-50A-2020",
        "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
        "SRC-NAC-HELLGATE-RAIDS-2023",
        "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
        "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019"
      ],
      claimIds: [
        "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER",
        "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION",
        "CLM-NAC-X-STAKEHOLDER-COMMUNICATION",
        "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION"
      ],
      researchTaskIds: [
        "TASK-NAC-X-RECOVER-ACCOUNT-GAP",
        "TASK-NAC-X-ARTICLE-CLOSE-READ",
        "TASK-NAC-X-ACCOUNT-AUTHORSHIP"
      ],
      notes: [
        "The full reported population is accounted for as 3,367 recovered account items plus an explicit 1,757-item recovery gap. Nineteen context-only public records are outside the account denominator; sixteen duplicate rendered views of account items were removed.",
        "All 1,235 distinct t.co URLs present in recovered account items resolved; four URLs found only in supplemental context remain unresolved and are not included in that count.",
        "Third-party repost text is omitted. Public contact details and tracking values are redacted. No private messages, settings, non-public analytics, authentication material, browser storage, follower exports, or session identifiers were committed.",
        "Visible interaction totals are retained as dated research observations and held from accomplishment messaging."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-NAC-X-CORPUS-2026-07-15",
      title: "Authenticated NYC Artist Coalition population-accounted X corpus",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://x.com/NYCArtC/with_replies",
      assetUrl:
        "https://github.com/openhouse/jamieburk.art/blob/c0b376c69c00a508b6ec8cdff2c893a145540768/docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json",
      preferredPublicUrl: "asset",
      publicCitation:
        "Committed item-level corpus from an authenticated @NYCArtC archival-production pass, July 15, 2026.",
      publicNote:
        "The profile reported 5,124 posts. The corpus preserves 3,367 distinct recovered account items, an explicit 1,757-item recovery gap, 19 context-only public records after cross-partition deduplication, and redirect resolutions for all 1,235 distinct t.co URLs in the recovered account items.",
      supportsGenerally: [
        "a complete population accounting on the capture date",
        "696 recovered authored posts and 2,671 recovered reposts",
        "campaign-marker, outgoing-link, stakeholder-communication, source-circulation, and dated visible-interaction classifications"
      ],
      doesNotEstablish: [
        "the contents or item types of 1,757 unrecovered profile-count items",
        "Jamie's authorship of the account's posts",
        "the individual author of every shared-account post",
        "complete incoming engagement or lifetime reach",
        "endorsement of posted sources",
        "policy causation or sole campaign credit"
      ]
    },
    {
      id: "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
      title:
        "City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say",
      organization: "City Limits",
      author: "Bridget Bartolini",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-04-06",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://citylimits.org/citys-small-businesses-need-rent-stabilization-to-survive-covid-19-advocates-say/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Bridget Bartolini, 'City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say,' City Limits, April 6, 2020.",
      publicNote:
        "@NYCArtC circulated the article in a Fair Rent NYC post. The article documents United for Small Business NYC's policy argument during the first pandemic shutdown.",
      supportsGenerally: [
        "the public policy context circulated by the account",
        "commercial rent as an urgent small-business concern during COVID-19"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the post or article",
        "policy adoption",
        "campaign causation"
      ]
    },
    {
      id: "SRC-NAC-GOTHAMIST-REPEAL-50A-2020",
      title:
        "New York State Legislature Votes To Repeal Law That Shields Police From Scrutiny",
      organization: "Gothamist",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2020-06-09",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://gothamist.com/news/new-york-state-legislature-votes-repeal-law-50-shields-police-scrunity",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Gothamist, 'New York State Legislature Votes To Repeal Law That Shields Police From Scrutiny,' June 9, 2020.",
      publicNote:
        "The article establishes the legislative action the account circulated. The account's relationship between 50-a repeal and MARCH accountability remains a project interpretation.",
      supportsGenerally: ["the June 2020 legislative repeal circulated by the account"],
      doesNotEstablish: [
        "the coalition's causal role in repeal",
        "the account's broader interpretation of MARCH outcomes",
        "Jamie's authorship of the post"
      ]
    },
    {
      id: "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
      title: "The Lark Is Grounded: New-Play Incubator to Fold After 27 Years",
      organization: "American Theatre",
      author: "American Theatre Editors",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2021-10-05",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.americantheatre.org/2021/10/05/the-lark-is-grounded-new-play-incubator-to-fold-after-25-years/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "American Theatre Editors, 'The Lark Is Grounded: New-Play Incubator to Fold After 27 Years,' October 5, 2021.",
      publicNote:
        "The article reported a proposed rent increase as one factor in the Lark's closure. @NYCArtC used it to connect a concrete cultural loss to Fair Rent NYC advocacy.",
      supportsGenerally: [
        "a concrete cultural-space loss circulated in the Fair Rent NYC source field",
        "the article's report that proposed rent was one closure factor"
      ],
      doesNotEstablish: [
        "a single-cause account of the Lark's closure",
        "Jamie's authorship of the post",
        "Fair Rent NYC policy causation"
      ]
    },
    {
      id: "SRC-NAC-HELLGATE-RAIDS-2023",
      title: "Who Is Leading the Raids on NYC Nightclubs?",
      organization: "Hell Gate",
      author: "Adlan Jackson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2023-06-09",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Adlan Jackson, 'Who Is Leading the Raids on NYC Nightclubs?,' Hell Gate, June 9, 2023.",
      publicNote:
        "@NYCArtC circulated the article as continuity evidence for nightlife-enforcement concerns. Its quoted ambiguity about which operations were MARCH is preserved as a boundary.",
      supportsGenerally: ["continued public scrutiny of multi-agency nightlife enforcement in 2023"],
      doesNotEstablish: [
        "that every described inspection was a MARCH raid",
        "coalition causation",
        "Jamie's authorship of the post"
      ]
    },
    {
      id: "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
      title:
        "Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?",
      organization: "Hell Gate",
      author: "Adlan Jackson",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-02-22",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Adlan Jackson, 'Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?,' Hell Gate, February 22, 2024.",
      publicNote:
        "The article and account post preserve continued public scrutiny after the announced end of MARCH without classifying the Saint Vitus action as MARCH.",
      supportsGenerally: ["continued venue-enforcement scrutiny after MARCH's announced end"],
      doesNotEstablish: [
        "that the Saint Vitus action was a MARCH raid",
        "the end of all multi-agency venue inspections",
        "Jamie's authorship of the post"
      ]
    },
    {
      id: "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019",
      title:
        "Mayor's Office of Nightlife drastically underfunded and understaffed, pol says",
      organization: "New York Daily News",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-08-28",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.nydailynews.com/2019/08/28/mayors-office-of-nightlife-drastically-underfunded-and-understaffed-pol-says/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "New York Daily News, 'Mayor's Office of Nightlife drastically underfunded and understaffed, pol says,' August 28, 2019.",
      publicNote:
        "The destination and headline were recovered from the account and live search metadata. Automated article-body access was blocked, so details remain unpromoted pending a recoverable copy.",
      supportsGenerally: ["a source lead circulated by the account"],
      doesNotEstablish: [
        "the article body's complete reporting",
        "the account's quoted numerical claim",
        "Jamie's authorship of the post"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-NAC-X-POPULATION-ACCOUNTING-2026",
      sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
      project: "nyc-artist-coalition",
      assertion:
        "The profile reported 5,124 posts; the governed pass recovered 3,367 distinct account items and preserves the 1,757-item difference explicitly rather than inferring deletion or content type.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-SHARED-CAMPAIGNS-2026",
      sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
      project: "nyc-artist-coalition",
      assertion:
        "Among 696 recovered authored posts, 195 distinct posts used #FairRentNYC, 110 used #SaveNYCSpaces, 78 used #LetNYCDance, and 54 used #TalksNotRaids; categories overlap.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-SOURCE-CIRCULATION-2026",
      sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
      project: "nyc-artist-coalition",
      assertion:
        "All 1,235 distinct t.co URLs in the 3,367 recovered account items resolved. Of 696 authored posts, 446 contained 529 outgoing-link occurrences representing 287 distinct short URLs.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-COUNCIL-OUTBOUND-2026",
      sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
      project: "nyc-artist-coalition",
      assertion:
        "The recovered authored corpus contains 115 visible @NYCCouncil mention occurrences across 109 posts. These are outbound communication, not incoming Council engagement.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-STAKEHOLDER-COMMUNICATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-REPOST-NETWORK-2026",
      sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
      project: "nyc-artist-coalition",
      assertion:
        "The 2,671 recovered reposts include repeated circulation from organizers, arts and labor groups, tenant and vendor coalitions, elected officials, and public agencies; counts are recovery lower bounds because older native reposts were not exposed by historical search.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER",
        "CLM-NAC-X-STAKEHOLDER-COMMUNICATION"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-TRACTION-OBSERVATION-2026",
      sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
      project: "nyc-artist-coalition",
      assertion:
        "On July 15, 2026, 630 of 696 authored posts displayed at least one visible interaction; the observed totals were 112 replies, 1,527 reposts, 2,761 likes, and 64 bookmarks.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-LARK-SOURCE-2021",
      sourceId: "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
      project: "nyc-artist-coalition",
      assertion:
        "American Theatre reported that a threatened near-doubling of rent was one factor in the Lark's closure; the account used the article to connect a cultural-space loss to Fair Rent NYC advocacy.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-CITYLIMITS-RENT-COVID-2020",
      sourceId: "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
      project: "nyc-artist-coalition",
      assertion:
        "City Limits documented United for Small Business NYC's commercial-rent-stabilization argument during the first pandemic shutdown; the account circulated that context through Fair Rent NYC.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-REPEAL-50A-SOURCE-2020",
      sourceId: "SRC-NAC-GOTHAMIST-REPEAL-50A-2020",
      project: "nyc-artist-coalition",
      assertion:
        "Gothamist establishes the June 2020 legislative repeal the account circulated; the account's stated relationship to MARCH transparency remains a separate campaign interpretation.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-RAIDS-SOURCE-2023",
      sourceId: "SRC-NAC-HELLGATE-RAIDS-2023",
      project: "nyc-artist-coalition",
      assertion:
        "The account circulated Hell Gate's 2023 reporting as continuity evidence for nightlife-enforcement concerns while preserving the article's uncertainty about whether the operations were MARCH.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-DAILY-NEWS-METADATA-2019",
      sourceId: "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019",
      project: "nyc-artist-coalition",
      assertion:
        "The public post and live search metadata preserve the Daily News destination and headline, but the blocked article body cannot support more detailed independent assertions in this pass.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-NAC-X-NIGHTLIFE-CONTINUITY-2024",
      sourceId: "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
      project: "nyc-artist-coalition",
      assertion:
        "The account's 2024 circulation of Hell Gate's Saint Vitus reporting preserves continuity in public scrutiny of venue enforcement after the announced end of MARCH, without classifying the action as a MARCH raid.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER",
      project: "nyc-artist-coalition",
      internalClaim:
        "The recovered authored account corpus shows one shared coalition identity carrying four campaign systems across 2017-2026, with distinct public traces for Fair Rent NYC, Save NYC Spaces, Let NYC Dance, and Talks Not Raids.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "One shared coalition identity carried four public campaign systems across nine years. Among 696 recovered authored posts, 195 used #FairRentNYC, 110 used #SaveNYCSpaces, 78 used #LetNYCDance, and 54 used #TalksNotRaids; categories overlap.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "authored-post denominator",
            "distinct campaign-marker post counts",
            "2017-2026 recovered range",
            "population and authorship boundaries"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The profile count is accounted for as 3,367 recovered account items plus an explicit 1,757-item gap; this is not a claim that all 5,124 items were recovered.",
        "Campaign categories overlap and measure public communication, not unique initiatives, audience reach, or policy outcomes.",
        "The account was shared. The corpus does not identify Jamie or any collaborator as author of every post, and it does not independently prove Jamie created the account."
      ],
      antiClaims: [
        "All 5,124 profile-reported items were recovered",
        "Jamie authored 696 coalition posts",
        "Hashtag volume proves campaign impact or causation",
        "The coalition account represents Jamie's work alone"
      ],
      researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION",
      project: "nyc-artist-coalition",
      internalClaim:
        "The recovered corpus preserves a broad public source-and-action layer spanning campaign sites, official records, reporting, forms, event pages, and field resources.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "The account also operated as a source-and-action layer: 446 of 696 recovered authored posts linked outward to campaign tools, public records, reporting, forms, events, and field resources.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "archive-note",
          text:
            "All 1,235 distinct t.co URLs in the recovered account items resolved; the governed corpus retains their destinations and source boundaries.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "complete recovered-account-item URL resolution",
            "authored-post and outgoing-link denominators",
            "mission-relevant source inventory"
          ],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
          relationship: "context",
          supports: ["commercial-rent policy source circulation"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
          relationship: "context",
          supports: ["cultural-space loss source circulation"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
          relationship: "context",
          supports: ["later nightlife-enforcement source circulation"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "A resolved destination documents source circulation, not endorsement, page accuracy, audience reach, or authorship of the linked work.",
        "Four unresolved links appeared only in supplemental contexts and are excluded from the 1,235-account-item count.",
        "Every article-level claim still requires close reading before it can support a separate accomplishment claim."
      ],
      antiClaims: [
        "Every linked source endorses NYC Artist Coalition",
        "The account authored the linked reporting or public records",
        "Posted links prove audience reach or policy effect"
      ],
      researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-NAC-X-STAKEHOLDER-COMMUNICATION",
      project: "nyc-artist-coalition",
      internalClaim:
        "The authored corpus documents sustained outbound communication to government, arts, venue, labor, tenant, vendor, and community stakeholders, while the recovered repost network documents source circulation across those groups.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The authored corpus mentions @NYCCouncil in 109 posts and repeatedly addresses agencies, venues, artists, labor, tenant, vendor, and community groups. These are outbound communication findings, kept separate from incoming engagement.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "outbound mention counts",
            "recovered repost-source counts",
            "stakeholder-classification boundary"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Outbound mentions and account reposts are not incoming engagement or endorsement.",
        "The existing at-least-four-Council-member incoming-engagement claim uses separately preserved replies, mentions, and quote posts authored by Council accounts.",
        "Repost-source counts are recovery lower bounds because older native reposts were not exposed by historical search."
      ],
      antiClaims: [
        "109 Council members engaged with the coalition",
        "Every mentioned stakeholder replied or endorsed the work",
        "The account's repost choices represent Jamie alone"
      ],
      researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION",
      project: "nyc-artist-coalition",
      internalClaim:
        "On July 15, 2026, 630 of 696 recovered authored posts displayed at least one visible interaction; totals were 112 replies, 1,527 reposts, 2,761 likes, and 64 bookmarks.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A dated observation found visible interaction on 630 of 696 recovered authored posts; aggregate counts remain held because platform metrics are unstable, incomplete, and not stakeholder-attributed.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NAC-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "authored-post denominator",
            "dated visible-interaction labels",
            "held aggregate observation"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The figures are a July 15, 2026 platform observation, not complete lifetime engagement.",
        "Metrics attached to third-party reposts are excluded.",
        "The observation does not identify stakeholder types or measure campaign, policy, organizational, or cultural outcomes."
      ],
      antiClaims: [
        "These are complete lifetime engagement totals",
        "Visible engagement proves policy impact",
        "Every interaction is attributable to a mission-relevant stakeholder"
      ],
      researchInquiryIds: ["INQ-NAC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-NAC-X-RECOVER-ACCOUNT-GAP",
      project: "nyc-artist-coalition",
      question:
        "Can the 1,757-item difference between the profile-reported count and recovered account items be reduced through a lawful account export or stronger archive?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Request or acquire a lawful account archive if available",
        "Search bounded web archives for pre-December 2019 native repost identities",
        "Reconcile any recovered IDs without inferring contents for the remaining gap"
      ],
      successCriteria: [
        "Preserve a status-ID-level audit trail for every added item",
        "Update population counts and hashes reproducibly",
        "Keep not recovered distinct from deleted or did not exist"
      ],
      sourceIds: ["SRC-NAC-X-CORPUS-2026-07-15"],
      claimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"],
      publicSummary:
        "Reduce the explicitly preserved recovery gap only with item-level evidence.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-NAC-X-ARTICLE-CLOSE-READ",
      project: "nyc-artist-coalition",
      question:
        "Which mission-relevant posted articles can mature into new atomic claims after full-text recovery, close reading, and source association?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Prioritize the corpus source leads by mission relevance and current portfolio gaps",
        "Recover blocked or dead article bodies through lawful public archives",
        "Decompose each source into atomic assertions before promoting claims"
      ],
      successCriteria: [
        "Every promoted article claim cites a recovered page body",
        "Linked reporting remains distinct from campaign-authored interpretation",
        "Blocked pages retain metadata-only or not-recovered labels"
      ],
      sourceIds: [
        "SRC-NAC-X-CORPUS-2026-07-15",
        "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019"
      ],
      claimIds: ["CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"],
      publicSummary:
        "Continue converting the complete posted-source inventory into close-read evidence without promoting headlines alone.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-NAC-X-ACCOUNT-AUTHORSHIP",
      project: "nyc-artist-coalition",
      question:
        "Which public-safe records can corroborate Jamie's account-establishment and identity-stewardship role without attributing collective output to him?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Recover dated account-creation or administrator records suitable for public use",
        "Seek bounded collaborator testimony about identity and infrastructure stewardship",
        "Separate account creation, visual identity, strategy, administration, and post authorship"
      ],
      successCriteria: [
        "Corroborate only the role components the records name",
        "Retain collective credit for shared-account output",
        "Do not convert chronology into authorship"
      ],
      sourceIds: ["SRC-NAC-X-CORPUS-2026-07-15"],
      claimIds: ["CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"],
      publicSummary:
        "Corroborate Jamie's identity-infrastructure role while preserving shared authorship.",
      reviewedAt: "2026-07-15"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NAC-X-FULL-POPULATION-2026",
      project: "nyc-artist-coalition",
      question:
        "What does a full population-accounted pass on @NYCArtC establish about campaign continuity, posted sources, stakeholder communication, mission-relevant traction, and evidence gaps?",
      methods: [
        "Verified the authenticated @urbanhermit browser identity and opened the replies-inclusive @NYCArtC profile.",
        "Traversed the rendered profile timeline in overlapping increments and reran a denser overlapping pass until both converged at the same 3,031 account-item IDs and December 13, 2019 cutoff.",
        "Ran monthly historical authored-search partitions from January 2017 through the cutoff; reran 2017 in one-month windows as an overlap check and added no new IDs.",
        "Classified authored posts, native reposts, and supplemental public contexts separately; did not infer deletion or item type for the recovery gap.",
        "Resolved every distinct t.co URL in the recovered account-item population and preserved four unresolved context-only links outside that count.",
        "Omitted third-party repost text, redacted contact and tracking data, retained item hashes and public metadata, and excluded private account surfaces.",
        "Derived campaign-marker, outbound-mention, repost-source, link-domain, article-lead, and dated visible-interaction inventories with explicit anti-claims.",
        "Close-read selected live sources and retained blocked article bodies as metadata-only leads.",
        "Encoded sources, atomic assertions, bounded claims, research tasks, and selective public projection."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "The full reported population is accounted for as 3,367 recovered account items plus an explicit 1,757-item gap against the 5,124-post profile count; 19 context-only public records remain after removing 16 duplicate rendered views of account items.",
        "The recovered account population contains 696 authored posts and 2,671 reposts spanning February 3, 2017-May 18, 2026.",
        "Distinct authored posts carrying campaign markers total 195 for #FairRentNYC, 110 for #SaveNYCSpaces, 78 for #LetNYCDance, and 54 for #TalksNotRaids; categories overlap.",
        "All 1,235 distinct t.co URLs in recovered account items resolved. Four hundred forty-six authored posts contain 529 outgoing-link occurrences representing 287 distinct short URLs.",
        "The authored corpus mentions @NYCCouncil in 109 posts, while separate source-specific records retain the stricter lower-bound finding of incoming engagement by at least four sitting Council member accounts.",
        "Mission-relevant posted sources span Cabaret Law repeal, Office of Nightlife, MARCH accountability, commercial rent, cultural-space closure, labor and relief, and later venue-enforcement reporting.",
        "Visible interaction totals are retained as a dated held observation rather than accomplishment metrics."
      ],
      limitations: [
        "Historical search did not expose older native reposts, and the 1,757-item gap cannot be classified from the available evidence.",
        "A platform population accounting is not a complete project history, stakeholder ledger, or impact study.",
        "Outbound mentions and reposts are communication evidence, not incoming engagement, endorsement, reach, or causation.",
        "The shared account does not identify the person who authored every post and does not independently prove Jamie established it.",
        "Four context-only short URLs remain unresolved; some linked article bodies were blocked or unavailable.",
        "Visible metrics may omit deleted, hidden, private, or platform-suppressed activity and are unstable over time."
      ],
      sourceIds: [
        "SRC-NAC-X-CORPUS-2026-07-15",
        "SRC-NAC-CITYLIMITS-RENT-COVID-2020",
        "SRC-NAC-GOTHAMIST-REPEAL-50A-2020",
        "SRC-NAC-AMERICAN-THEATRE-LARK-2021",
        "SRC-NAC-HELLGATE-RAIDS-2023",
        "SRC-NAC-HELLGATE-SAINT-VITUS-2024",
        "SRC-NAC-DAILY-NEWS-NIGHTLIFE-2019"
      ],
      publicSummary:
        "A full authenticated population-accounting pass preserves 3,367 recovered @NYCArtC account items, an explicit 1,757-item gap, all recovered account-item links, four overlapping campaign traces, mission-relevant source leads, and strict stakeholder, authorship, privacy, and traction boundaries."
    }
  ]
};
