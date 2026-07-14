import type {
  ClaimRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const wowListSocialCensus = {
  account: "@wowlist",
  observedAt: "2026-07-14",
  observedProfileCount: 38,
  postsRouteRecovered: 37,
  repliesRouteRecovered: 38,
  recoveredPublicStatuses: 38,
  unresolvedProfileCountSlots: 0,
  relationshipCounts: { accountPosts: 16, accountReplies: 6, reposts: 16 },
  accountAuthoredStatuses: 22,
  distinctRepostSourceAccounts: 13,
  productSupportAndOnboardingReplies: 6,
  eventDistributionStatuses: 5,
  sceneKnowledgeStatuses: 3,
  productCommunityInfrastructureStatuses: 3,
  civicCareAccountStatuses: 5,
  civicCareReposts: 5,
  platformUseAndEventAmplificationReposts: 5,
  uniqueShortUrls: 35,
  uniqueResolvedDestinations: 34,
  uniqueProjectOrLineageDestinations: 19,
  accountAuthoredVisibleReactionSnapshot: {
    statusesWithVisibleReaction: 12,
    replies: 2,
    reposts: 20,
    likes: 21
  },
  completenessStatement:
    "All 38 items represented by the authenticated profile count were recovered at item level from the Posts and Replies route union. This is complete recovery of the surviving July 2026 profile population, not an X data export, deletion history, or proof that no older item was deleted before capture.",
  publicLedger: "docs/knowledge-bank/data/wowlist-public-post-ledger.json"
} as const;

export const wowListSocialCensusIntake = [
  {
    id: "INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Authenticated full-population review of @wowlist, combining Posts and Replies routes, a 38-item public ledger, posted-link resolution, mission-source reading, and explicit authorship and traction boundaries.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/wowlist",
    entityIds: ["ENT-WOWLIST", "ENT-SUNDAY-DINNER"],
    disposition: "source-created",
    sourceIds: [
      "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
      "SRC-X-WOWLIST-PROFILE-NAVIGATION-2015",
      "SRC-X-WOWLIST-MULTI-LIST-SUBMISSION-2015",
      "SRC-X-WOWLIST-NYCDIY-IDENTITY-2016",
      "SRC-X-WOWLIST-NYCDIY-JOIN-2016",
      "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
      "SRC-GOOD-TIMES-ZINES-2-2015",
      "SRC-KQED-GHOST-SHIP-VIGIL-2016",
      "SRC-MEOW-WOLF-DIY-FUND-2016"
    ],
    claimIds: [
      "CLM-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT",
      "CLM-WOWLIST-FULL-SOCIAL-POPULATION",
      "CLM-WOWLIST-PUBLIC-NETWORK-PATTERN",
      "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
      "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
      "CLM-WOWLIST-CURRENT-VISIBLE-REACTION-SNAPSHOT"
    ],
    researchTaskIds: ["TASK-WOWLIST-FULL-POPULATION-CENSUS"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

const supportPost = (
  id: string,
  title: string,
  statusId: string,
  publishedAt: string,
  publicNote: string,
  supportsGenerally: string[]
): SourceRecord => ({
  id,
  title,
  organization: "WOW List",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl: `https://x.com/wowlist/status/${statusId}`,
  preferredPublicUrl: "canonical",
  publicCitation: `${title}, ${publishedAt}.`,
  publicNote,
  intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
  supportsGenerally,
  doesNotEstablish: [
    "the individual teammate who authored the shared-account post",
    "the platform's complete support workload",
    "platform-wide adoption, audience reach, satisfaction, or impact"
  ]
});

export const wowListSocialCensusSources = [
  {
    id: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
    title: "Authenticated WOW List full-population social census",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated, read-only census of the @wowlist Posts and Replies routes, with a redacted 38-item ledger, July 14, 2026.",
    publicNote:
      "The Posts route yielded 37 records; the Replies route supplied the missing authored status and closed the 38-item observed profile control. The recovered union contains 16 account posts, six account replies, and 16 reposts from 13 public accounts.",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: [
      "38-item surviving-profile reconciliation",
      "16 account posts, six account replies, and 16 reposts",
      "six public product-support and onboarding replies",
      "mission and stakeholder-network patterns within the bounded corpus",
      "35 shortened links resolving to 34 current destinations",
      "current visible-reaction inventory for account-authored statuses"
    ],
    doesNotEstablish: [
      "a native X export or deletion history",
      "that no older status was deleted before capture",
      "Jamie's authorship of every shared-account post",
      "the platform's complete support workload, user population, adoption, audience, or impact",
      "historical analytics, unique people, partnerships, endorsements, or outcomes"
    ]
  },
  supportPost(
    "SRC-X-WOWLIST-PROFILE-NAVIGATION-2015",
    "WOW List profile-navigation reply",
    "591666366215811073",
    "2015-04-24",
    "The account explained where a person could find their WOW Lists on their profile.",
    ["direct public product support", "profile-navigation explanation"]
  ),
  supportPost(
    "SRC-X-WOWLIST-MULTI-LIST-SUBMISSION-2015",
    "WOW List multi-list event-submission reply",
    "591668857670148096",
    "2015-04-24",
    "The account explained how to add an event and place it on multiple WOW Lists.",
    ["direct public product support", "multi-list event submission"]
  ),
  supportPost(
    "SRC-X-WOWLIST-NYCDIY-IDENTITY-2016",
    "WOW List NYCDIY identity reply",
    "771412862191407104",
    "2016-09-01",
    "The account identified NYCDIY.org as a local calendar identity.",
    ["NYCDIY local-calendar identity"]
  ),
  supportPost(
    "SRC-X-WOWLIST-NYCDIY-JOIN-2016",
    "WOW List NYCDIY joining reply",
    "771455571501416448",
    "2016-09-01",
    "The account explained how people could join NYCDIY, add shows, and receive a weekly email.",
    ["direct public onboarding", "event submission", "weekly email"]
  ),
  {
    id: "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    organization: "Grasstronaut",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-01-29",
    accessedAt: "2026-07-14",
    canonicalUrl: "http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl:
      "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    preferredPublicUrl: "archive",
    publicCitation:
      "Grasstronaut, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' January 29, 2015, archived April 6, 2015.",
    publicNote:
      "WOW List linked the guide as scene knowledge. It addresses community building, conflict resolution, organizational knowledge, and documentation of all-ages cultural spaces; it is not coverage of WOW List.",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["mission context for a grassroots cultural-infrastructure resource shared by WOW List"],
    doesNotEstablish: ["press coverage or endorsement of WOW List", "WOW List authorship", "adoption or impact"]
  },
  {
    id: "SRC-GOOD-TIMES-ZINES-2-2015",
    title: "Zines 2.0",
    organization: "Good Times",
    author: "Elise Granata",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-05-06",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    archiveUrl:
      "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015, archived September 7, 2015.",
    publicNote:
      "WOW List linked the reporting for its account of efforts to document and connect geographically separated grassroots arts spaces. The article supplies mission context, not coverage of WOW List.",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["mission context for scene documentation and connection"],
    doesNotEstablish: ["press coverage or endorsement of WOW List", "WOW List authorship", "adoption or impact"]
  },
  {
    id: "SRC-KQED-GHOST-SHIP-VIGIL-2016",
    title: "VIDEO: Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire",
    organization: "KQED",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-06",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire",
    preferredPublicUrl: "canonical",
    publicCitation:
      "KQED, 'VIDEO: Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire,' December 6, 2016.",
    publicNote:
      "WOW List shared public documentation of the Lake Merritt memorial vigil after the Ghost Ship fire. This supports the linked event's context, not WOW List organization of the vigil.",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["public context for a Ghost Ship memorial resource shared by WOW List"],
    doesNotEstablish: ["WOW List organization of the vigil", "Jamie attendance", "causality or impact from sharing"]
  },
  {
    id: "SRC-MEOW-WOLF-DIY-FUND-2016",
    title: "Meow Wolf's DIY Fund",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-11",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://meowwolf.com/blob/meow-wolfs-diy-fund",
    preferredPublicUrl: "canonical",
    publicCitation: "Meow Wolf, 'Meow Wolf's DIY Fund,' December 11, 2016.",
    publicNote:
      "WOW List reposted the fund announcement. The page documents Meow Wolf's support for DIY arts and music spaces after Ghost Ship; it does not make WOW List a fund organizer or grantee.",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    supportsGenerally: ["public context for a DIY-space support resource amplified by WOW List"],
    doesNotEstablish: ["WOW List organization of the fund", "a grant to WOW List", "causality or impact from the repost"]
  }
] satisfies SourceRecord[];

const supportReading = (
  id: string,
  sourceId: string,
  propositionId: string,
  text: string,
  supportTag: string
): SourceReading => ({
  id,
  sourceId,
  status: "closely-read",
  readAt: "2026-07-14",
  propositions: [
    {
      id: propositionId,
      text,
      relationToJamie: "project-context",
      supportTags: [supportTag],
      confidence: "high",
      locator: "Public reply"
    }
  ],
  limitations: [
    "The shared-account record does not identify the teammate who authored the reply or establish platform-wide support volume, adoption, or impact."
  ],
  researchTaskIds: []
});

export const wowListSocialCensusReadings = [
  {
    id: "READ-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
    sourceId: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-WOWLIST-FULL-POPULATION-DISPOSITION",
        text: "The authenticated Posts and Replies route union recovered all 38 unique status records represented by the observed profile count: 16 account posts, six account replies, and 16 reposts.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-full-population-disposition"],
        confidence: "high",
        locator: "Population audit and item ledger"
      },
      {
        id: "PROP-X-WOWLIST-SIX-PUBLIC-SUPPORT-REPLIES",
        text: "All six account replies function as product support, onboarding, or local-calendar identity guidance, covering feed scope, profile navigation, multi-list event submission, joining NYCDIY, and the relationship among NYCDIY, WOW List, and Sunday Dinner.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-six-public-support-replies"],
        confidence: "high",
        locator: "Relationship and theme classification"
      },
      {
        id: "PROP-X-WOWLIST-MISSION-ROUTING-PATTERN",
        text: "The 38-record corpus contains five event-distribution statuses, three scene-knowledge statuses, three product/community-infrastructure statuses, five account-authored civic-care statuses, five civic-care reposts, and five platform-use or event-amplification reposts.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-mission-routing-pattern"],
        confidence: "high",
        locator: "Primary-theme classification"
      },
      {
        id: "PROP-X-WOWLIST-PUBLIC-NETWORK-PATTERN",
        text: "The corpus contains 16 reposts from 13 public accounts, including all-ages and DIY cultural-infrastructure accounts, cultural organizations, artists and organizers, and adjacent creative projects.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-public-network-pattern"],
        confidence: "high",
        locator: "Repost-source inventory"
      },
      {
        id: "PROP-X-WOWLIST-LINK-DESTINATION-INVENTORY",
        text: "The corpus contains 35 unique shortened links resolving in July 2026 to 34 destinations, including 19 WOW List, Sunday Dinner, or NYCDIY project-lineage destinations.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-link-destination-inventory"],
        confidence: "high",
        locator: "Outbound-link inventory"
      },
      {
        id: "PROP-X-WOWLIST-CURRENT-VISIBLE-REACTION-SNAPSHOT",
        text: "In July 2026, 12 of the 22 account-authored statuses retained at least one visible reaction; their visible interface counts totaled two replies, 20 reposts, and 21 likes.",
        relationToJamie: "outcome-context",
        supportTags: ["wowlist-current-visible-reaction-snapshot"],
        confidence: "high",
        locator: "Visible metrics observed July 14, 2026"
      }
    ],
    limitations: [
      "The census reconciles the surviving live-profile control, not a native X export or deletion history.",
      "Account-authored means published by the account; it does not establish that Jamie drafted or posted every item.",
      "Visible reactions are mutable July 2026 interface observations, not historical analytics, unique people, adoption, endorsement, or impact.",
      "For reposts, visible metrics belong to the source status and are excluded from the account-authored reaction claim.",
      "Current URL resolution does not prove that each destination resolved identically when posted."
    ],
    researchTaskIds: ["TASK-WOWLIST-FULL-POPULATION-CENSUS"]
  },
  supportReading(
    "READ-X-WOWLIST-PROFILE-NAVIGATION-2015",
    "SRC-X-WOWLIST-PROFILE-NAVIGATION-2015",
    "PROP-X-WOWLIST-PROFILE-NAVIGATION-2015",
    "The account explained where a person could find their WOW Lists on their profile.",
    "wowlist-profile-navigation-support"
  ),
  supportReading(
    "READ-X-WOWLIST-MULTI-LIST-SUBMISSION-2015",
    "SRC-X-WOWLIST-MULTI-LIST-SUBMISSION-2015",
    "PROP-X-WOWLIST-MULTI-LIST-SUBMISSION-2015",
    "The account explained how to add an event and place it on multiple WOW Lists.",
    "wowlist-multi-list-submission-support"
  ),
  supportReading(
    "READ-X-WOWLIST-NYCDIY-IDENTITY-2016",
    "SRC-X-WOWLIST-NYCDIY-IDENTITY-2016",
    "PROP-X-WOWLIST-NYCDIY-IDENTITY-2016",
    "The account identified NYCDIY.org as a local calendar identity.",
    "wowlist-nycdiy-identity-guidance"
  ),
  supportReading(
    "READ-X-WOWLIST-NYCDIY-JOIN-2016",
    "SRC-X-WOWLIST-NYCDIY-JOIN-2016",
    "PROP-X-WOWLIST-NYCDIY-JOIN-2016",
    "The account explained how people could join NYCDIY, add shows, and receive a weekly email.",
    "wowlist-nycdiy-joining-guidance"
  ),
  {
    id: "READ-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    sourceId: "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-GRASSTRONAUT-CULTURAL-INFRASTRUCTURE-CONTEXT",
        text: "The linked guide addresses practical community, organizational, legal, and documentation questions for all-ages cultural spaces.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-scene-knowledge-context"],
        confidence: "high",
        locator: "Archived article"
      }
    ],
    limitations: ["The guide is not press coverage or endorsement of WOW List and does not establish platform adoption or impact."],
    researchTaskIds: []
  },
  {
    id: "READ-GOOD-TIMES-ZINES-2-2015",
    sourceId: "SRC-GOOD-TIMES-ZINES-2-2015",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-GOOD-TIMES-SCENE-DOCUMENTATION-CONTEXT",
        text: "The linked reporting describes work to document and connect geographically separated grassroots arts spaces.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-scene-documentation-context"],
        confidence: "high",
        locator: "Archived article"
      }
    ],
    limitations: ["The article is not press coverage or endorsement of WOW List and does not establish platform adoption or impact."],
    researchTaskIds: []
  },
  {
    id: "READ-KQED-GHOST-SHIP-VIGIL-2016",
    sourceId: "SRC-KQED-GHOST-SHIP-VIGIL-2016",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-KQED-GHOST-SHIP-MEMORIAL-CONTEXT",
        text: "KQED documented the Lake Merritt vigil shared by WOW List after the Ghost Ship fire.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-civic-care-context"],
        confidence: "high",
        locator: "Article"
      }
    ],
    limitations: ["The article does not establish WOW List organization of the vigil, Jamie attendance, or causality from sharing."],
    researchTaskIds: []
  },
  {
    id: "READ-MEOW-WOLF-DIY-FUND-2016",
    sourceId: "SRC-MEOW-WOLF-DIY-FUND-2016",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-MEOW-WOLF-DIY-FUND-CONTEXT",
        text: "Meow Wolf documented a fund and support resources for DIY arts and music spaces after Ghost Ship.",
        relationToJamie: "project-context",
        supportTags: ["wowlist-diy-space-care-context"],
        confidence: "high",
        locator: "Article"
      }
    ],
    limitations: ["The source does not make WOW List a fund organizer, grantee, partner, or cause of the fund."],
    researchTaskIds: []
  }
] satisfies SourceReading[];

export const wowListSocialCensusClaims = [
  {
    id: "CLM-WOWLIST-FULL-SOCIAL-POPULATION",
    project: "wowlist",
    internalClaim:
      "The complete surviving @wowlist profile population contains 38 unique records matching the live 38-post control: 16 account posts, six account replies, and 16 reposts from 13 public accounts.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["wowlist-full-population-disposition"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["38-record population reconciliation", "account-post, reply, and repost counts"],
        propositionIds: ["PROP-X-WOWLIST-FULL-POPULATION-DISPOSITION"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means the current 38-item profile control is fully reconciled; it does not establish that no status was deleted before capture.",
      "Account authorship does not identify the individual teammate who composed a post."
    ],
    antiClaims: [
      "The ledger is a complete X platform export.",
      "Jamie authored every @wowlist post.",
      "Thirty-eight posts measure WOW List adoption or impact."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-WOWLIST-PUBLIC-NETWORK-PATTERN",
    project: "wowlist",
    internalClaim:
      "The surviving corpus includes 16 reposts from 13 public accounts spanning all-ages and DIY cultural infrastructure, cultural organizations, artists and organizers, and adjacent creative projects.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["wowlist-public-network-pattern"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["bounded repost-source and stakeholder-network pattern"],
        propositionIds: ["PROP-X-WOWLIST-PUBLIC-NETWORK-PATTERN"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The source-account inventory documents circulation within a network, not endorsement, partnership, adoption, or project impact."],
    antiClaims: ["Every repost source endorsed WOW List.", "The account network proves platform-wide adoption.", "WOW List organized work described in every repost."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
    project: "wowlist",
    internalClaim:
      "Three account posts routed knowledge about grassroots all-ages infrastructure, disconnected but similar arts spaces, and documentation as cultural continuity.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["wowlist-mission-routing-pattern", "wowlist-scene-knowledge-context", "wowlist-scene-documentation-context"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["three scene-knowledge records and their public destinations"],
        propositionIds: ["PROP-X-WOWLIST-MISSION-ROUTING-PATTERN"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
        relationship: "context",
        supports: ["grassroots cultural-infrastructure context"],
        propositionIds: ["PROP-GRASSTRONAUT-CULTURAL-INFRASTRUCTURE-CONTEXT"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-GOOD-TIMES-ZINES-2-2015",
        relationship: "context",
        supports: ["scene documentation and connection context"],
        propositionIds: ["PROP-GOOD-TIMES-SCENE-DOCUMENTATION-CONTEXT"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["The linked articles supply mission context; they are not press coverage, reviews, or endorsements of WOW List.", "Routing a resource does not establish authorship, adoption, or outcome."],
    antiClaims: ["Grasstronaut or Good Times reviewed WOW List.", "WOW List authored the linked articles.", "Three links prove nationwide scene impact."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source review"]
  },
  {
    id: "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
    project: "wowlist",
    internalClaim:
      "The surviving corpus contains five account posts and five reposts centered on civic mobilization or care, including public gathering, mutual-aid resources, mourning, DIY-space safety, and cultural-space support.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["wowlist-mission-routing-pattern", "wowlist-civic-care-context", "wowlist-diy-space-care-context"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["five account civic-care posts and five civic-care reposts"],
        propositionIds: ["PROP-X-WOWLIST-MISSION-ROUTING-PATTERN"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KQED-GHOST-SHIP-VIGIL-2016",
        relationship: "context",
        supports: ["public context for a memorial resource shared by the account"],
        propositionIds: ["PROP-KQED-GHOST-SHIP-MEMORIAL-CONTEXT"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-MEOW-WOLF-DIY-FUND-2016",
        relationship: "context",
        supports: ["public context for a DIY-space support resource reposted by the account"],
        propositionIds: ["PROP-MEOW-WOLF-DIY-FUND-CONTEXT"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Amplifying a gathering or resource does not establish WOW List or Jamie as its organizer, author, participant, beneficiary, or cause.", "The corpus documents public routing and care themes; it does not measure resulting action or impact."],
    antiClaims: ["WOW List organized every amplified mobilization.", "Jamie authored every shared resource.", "Social posts alone demonstrate civic impact."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-WOWLIST-CURRENT-VISIBLE-REACTION-SNAPSHOT",
    project: "wowlist",
    internalClaim:
      "In July 2026, 12 of 22 recovered account-authored statuses retained a visible reaction, with interface totals of two replies, 20 reposts, and 21 likes.",
    status: "use-with-care",
    maturity: "corroborated",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    requiredSupportTags: ["wowlist-current-visible-reaction-snapshot"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["current visible-reaction snapshot for account-authored statuses"],
        propositionIds: ["PROP-X-WOWLIST-CURRENT-VISIBLE-REACTION-SNAPSHOT"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: ["Date every use as a July 2026 interface observation.", "Counts are mutable; repost-source metrics are excluded because they belong to the original status."],
    antiClaims: ["These are historical engagement totals.", "The counts represent unique people.", "Visible reactions prove adoption, endorsement, audience reach, or impact."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  }
] satisfies ClaimRecord[];

export const wowListSocialCensusResearchTasks = [
  {
    id: "TASK-WOWLIST-FULL-POPULATION-CENSUS",
    project: "wowlist",
    question:
      "Can every item represented by the surviving @wowlist profile count be recovered, classified, linked, and integrated without overstating completeness, authorship, adoption, or impact?",
    status: "resolved",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: ["INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"],
    sourceIds: [
      "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026",
      "SRC-X-WOWLIST-SUPPORT-2015",
      "SRC-X-WOWLIST-PROFILE-NAVIGATION-2015",
      "SRC-X-WOWLIST-MULTI-LIST-SUBMISSION-2015",
      "SRC-X-WOWLIST-NYCDIY-IDENTITY-2016",
      "SRC-X-WOWLIST-NYCDIY-JOIN-2016",
      "SRC-X-WOWLIST-NYCDIY-2016"
    ],
    claimIds: [
      "CLM-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT",
      "CLM-WOWLIST-FULL-SOCIAL-POPULATION",
      "CLM-WOWLIST-PUBLIC-NETWORK-PATTERN",
      "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
      "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
      "CLM-WOWLIST-CURRENT-VISIBLE-REACTION-SNAPSHOT"
    ],
    nextActions: [
      "Re-run the route union and compare content digests if the live profile count changes.",
      "Keep account-creation and individual-post authorship routed to the existing identity-provenance research task."
    ],
    resolutionSummary:
      "Recovered all 38 items represented by the July 2026 profile control: 16 account posts, six account replies, and 16 reposts. Resolved 35 shortened URLs to 34 destinations and preserved completeness, authorship, metric, and causality boundaries."
  }
] satisfies ResearchTask[];

export const wowListSocialCensusDecisions = [
  {
    id: "DEC-DEFER-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT",
    claimId: "CLM-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT",
    surface: "/work/wowlist",
    decision: "defer",
    rationale:
      "Keep the newly complete support and onboarding evidence available for composition while the current case study remains focused on the product, implementation, and independently supported archive counts.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  }
] satisfies ProjectionDecision[];
