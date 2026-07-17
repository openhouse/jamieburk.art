import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchInquiry,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

const intakeId = "INTAKE-URBANHERMIT-FULL-POPULATION-X-CENSUS-2026";

export const urbanHermitSocialCensus = {
  account: "@urbanhermit",
  observedAt: "2026-07-14",
  observedProfileCount: 434,
  currentProfileRecordsDispositioned: 434,
  directlyReverifiedRecords: 431,
  priorAuthenticatedCaptureOnlyRecords: 3,
  relationshipCounts: {
    authoredStandalonePosts: 338,
    authoredReplies: 15,
    reposts: 81
  },
  recoveredDateRange: ["2008-10-04", "2023-04-17"],
  postedLinks: {
    recordsWithExternalLinks: 277,
    occurrences: 345,
    uniqueShortUrls: 321,
    occurrencesWithExpandedLabels: 339,
    uniqueExpandedLabels: 298
  },
  inboundSearch: {
    explicitMentionRecords: 26,
    distinctPublicAccounts: 17,
    projectAccountRecords: 6,
    professionalInstitutionRecords: 1,
    culturalOrTechnicalCollaboratorRecords: 7,
    journalistDesignerOrCivicPeerRecords: 5,
    communityPeerOrPersonalContextRecords: 7,
    roleOrProjectAttributionRecords: 11,
    missionRelatedThreadRecords: 7,
    generalPublicConversationRecords: 8,
    governmentOrPublicOfficialAccountsRecovered: 0
  },
  visibleReactionSnapshot: {
    authoredRecordsWithAnyReaction: 85,
    authoredReplies: 8,
    authoredReposts: 60,
    authoredLikes: 175
  },
  completenessStatement:
    "Every record in the authenticated 434-item current-profile control has a public-safe disposition. A July 14 recrawl directly reverified 431 records; three reposted source statuses are retained from the immediately prior authenticated capture because their live source objects now redirect or fail to render. This is complete current-profile accounting, not a native X export, deletion history, or proof that no earlier record was removed before capture.",
  publicPostLedger:
    "docs/knowledge-bank/data/urbanhermit-public-post-ledger.json",
  publicEngagementLedger:
    "docs/knowledge-bank/data/urbanhermit-public-engagement-ledger.json"
} as const;

export const urbanHermitSocialCensusEntities = [
  {
    id: "ENT-PERSONAL-PUBLIC-ARCHIVE",
    kind: "project",
    label: "Jamie Burkart personal public archive",
    publicSafeSummary:
      "A privacy-bounded research layer for public traces that can lead to professional sources without turning Jamie's personal timeline into a portfolio or public dossier.",
    aliases: ["@urbanhermit archive"],
    projectKey: "personal-public-archive",
    relatedEntityIds: [
      "ENT-RIVER-PUBLIC-ENGAGEMENT",
      "ENT-SUNDAY-DINNER",
      "ENT-WOWLIST",
      "ENT-NYC-ARTIST-COALITION",
      "ENT-KC-TOWN-HALL"
    ],
    status: "conceptual"
  },
  {
    id: "ENT-HORSE-LORDS-TRUTHERS-VIDEO",
    kind: "project",
    label: "Horse Lords - Truthers video",
    publicSafeSummary:
      "The official 2016 music video for Horse Lords' 'Truthers,' made by Jamie Burkart and M.C. Schmidt and featured by NPR Music.",
    aliases: ["Truthers video"],
    projectKey: "horse-lords-truthers-video",
    relatedEntityIds: ["ENT-PERSONAL-PUBLIC-ARCHIVE"],
    status: "historical"
  },
  {
    id: "ENT-MUSIC-HACKATHON",
    kind: "organization",
    label: "Music Hackathon / Music Community Lab",
    publicSafeSummary:
      "A public music-technology community account that identified Jamie as a co-organizer in 2015.",
    aliases: ["@musichackathon"],
    projectKey: "music-hackathon",
    relatedEntityIds: ["ENT-WOWLIST", "ENT-PERSONAL-PUBLIC-ARCHIVE"],
    status: "historical"
  }
] satisfies EntityRecord[];

export const urbanHermitSocialCensusIntake = [
  {
    id: intakeId,
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary:
      "Authenticated full-population archival-production pass on Jamie's public @urbanhermit account, including current-profile reconciliation, aggregate-only privacy ledgers, posted-link and explicit-mention inventories, selected source close reading, and bounded claim development.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/urbanhermit",
    entityIds: [
      "ENT-PERSONAL-PUBLIC-ARCHIVE",
      "ENT-HORSE-LORDS-TRUTHERS-VIDEO",
      "ENT-MUSIC-HACKATHON",
      "ENT-WOWLIST",
      "ENT-NYC-ARTIST-COALITION",
      "ENT-KC-TOWN-HALL"
    ],
    disposition: "source-created",
    sourceIds: [
      "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
      "SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
      "SRC-X-URBANHERMIT-EXPLICIT-MENTION-CENSUS-2026",
      "SRC-X-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
      "SRC-X-URBANHERMIT-HJE-WEB-PRACTICE-2010",
      "SRC-X-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
      "SRC-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
      "SRC-X-URBANHERMIT-HORSE-LORDS-2016",
      "SRC-X-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
      "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
      "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
      "SRC-X-MUSIC-HACKATHON-WOWLIST-CREDIT-2015",
      "SRC-X-ALIZA-CABARET-COLLABORATOR-CREDIT-2017",
      "SRC-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022"
    ],
    claimIds: [
      "CLM-URBANHERMIT-UNREVIEWED-MEDIA-LEAD",
      "CLM-URBANHERMIT-FULL-POPULATION-DISPOSITION",
      "CLM-URBANHERMIT-POSTED-SOURCE-ROUTING",
      "CLM-URBANHERMIT-EXPLICIT-INBOUND-PATTERN",
      "CLM-URBANHERMIT-PRACTICE-CONTINUITY",
      "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      "CLM-MUSIC-HACKATHON-WOWLIST-PUBLIC-CREDIT"
    ],
    researchTaskIds: [
      "TASK-URBANHERMIT-FULL-POPULATION-DISPOSITION",
      "TASK-URBANHERMIT-EXPORT-AND-PRESERVATION"
    ],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

const selectedPersonalPosts = [
  {
    id: "SRC-X-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
    title: "Jamie Burkart river, handicraft, and software office-hours post",
    publishedAt: "2009-06-15",
    canonicalUrl: "https://x.com/urbanhermit/status/2179328286",
    publicCitation:
      "Jamie Burkart post inviting conversation about river projects, handicrafts, and software design, June 15, 2009.",
    publicNote:
      "A contemporaneous personal-account trace connecting participatory river work, making, and software design.",
    support: "an early public connection among participatory river work, making, and software design"
  },
  {
    id: "SRC-X-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    title: "Jamie Burkart Harry J. Epstein Co. web-practice post",
    publishedAt: "2010-01-24",
    canonicalUrl: "https://x.com/urbanhermit/status/8154854842",
    publicCitation:
      "Jamie Burkart post describing work on a forward-looking Harry J. Epstein Co. hand-tool website, January 24, 2010.",
    publicNote:
      "A contemporaneous personal-account description of Jamie's Harry J. Epstein Company web work.",
    support: "Jamie's public description of Harry J. Epstein Company web practice in 2010"
  },
  {
    id: "SRC-X-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
    title: "Jamie Burkart Sunday Dinner video post",
    publishedAt: "2013-03-26",
    canonicalUrl: "https://x.com/urbanhermit/status/316641626258808832",
    publicCitation:
      "Jamie Burkart post publishing a Sunday Dinner video, March 26, 2013.",
    publicNote:
      "A contemporaneous personal-account trace of Jamie documenting Sunday Dinner through video.",
    support: "Jamie's public documentation of Sunday Dinner through video"
  },
  {
    id: "SRC-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
    title: "Jamie Burkart NYC Council public-engagement post",
    publishedAt: "2015-04-14",
    canonicalUrl: "https://x.com/urbanhermit/status/588028157510418432",
    publicCitation:
      "Jamie Burkart post routing people to an NYC Council public-hearing question pathway, April 14, 2015.",
    publicNote:
      "A contemporaneous personal-account trace of Jamie routing a civic participation pathway.",
    support: "Jamie's public interest in making civic participation pathways usable"
  },
  {
    id: "SRC-X-URBANHERMIT-HORSE-LORDS-2016",
    title: "Jamie Burkart Horse Lords video credit post",
    publishedAt: "2016-04-29",
    canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
    publicCitation:
      "Jamie Burkart post linking to NPR's feature on the Horse Lords 'Truthers' video and naming his collaboration with M.C. Schmidt, April 29, 2016.",
    publicNote:
      "Jamie's contemporaneous account of making the video with M.C. Schmidt; NPR independently corroborates the joint credit.",
    support: "Jamie's contemporaneous account of co-creating the Horse Lords video with M.C. Schmidt"
  },
  {
    id: "SRC-X-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    title: "Jamie Burkart Let NYC Dance safety-framing post",
    publishedAt: "2017-03-21",
    canonicalUrl: "https://x.com/urbanhermit/status/844221071465373696",
    publicCitation:
      "Jamie Burkart post connecting the criminalization and closure of cultural spaces to unsafe underground conditions, March 21, 2017.",
    publicNote:
      "A contemporaneous personal-account statement of Jamie's public-safety framing within Let NYC Dance advocacy.",
    support: "Jamie's public-safety framing within Let NYC Dance advocacy"
  },
  {
    id: "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    title: "Jamie Burkart media-archaeology workflow post",
    publishedAt: "2020-11-22",
    canonicalUrl: "https://x.com/urbanhermit/status/1330547315132731398",
    publicCitation:
      "Jamie Burkart post describing a dual-boot workflow for preserving access to older software used in media archaeology, November 22, 2020.",
    publicNote:
      "A contemporaneous personal-account description of a practical software-preservation workflow.",
    support: "Jamie's practical attention to preserving access to older software and media workflows"
  }
] as const;

export const urbanHermitSocialCensusSources = [
  {
    id: "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
    title: "Jamie Burkart public X profile",
    author: "Jamie Burkart",
    kind: "personal-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/urbanhermit",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jamie Burkart's public @urbanhermit X profile, accessed July 14, 2026.",
    publicNote:
      "The authenticated live profile displayed 434 posts and an October 2008 join date.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "the account identity @urbanhermit",
      "a displayed current-profile control of 434 posts",
      "an October 2008 join date"
    ],
    doesNotEstablish: [
      "records removed before capture",
      "that reposted statements were authored by Jamie",
      "that record counts measure work effort, outcomes, or audience reach"
    ]
  },
  {
    id: "SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
    title: "Authenticated Jamie Burkart personal-account full-population census",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for a July 2026 record-level accounting and recrawl of the surviving @urbanhermit current-profile population.",
    publicNote:
      "The public repository retains aggregate findings and a redacted 434-row ledger. Full text, exact dates, handles, status IDs, URLs, media, metrics, and browser artifacts remain outside the repository.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "434 current-profile records reconciled and dispositioned",
      "431 records directly reverified on July 14, 2026",
      "three reposted source statuses retained from an immediately prior authenticated capture",
      "338 authored standalone posts, 15 authored replies, and 81 reposts",
      "posted-link, theme, and current visible-reaction aggregates"
    ],
    doesNotEstablish: [
      "the content or count of records removed before capture",
      "why three source statuses no longer resolve",
      "authorship of reposted material",
      "historic analytics, audience reach, professional effort, causation, or impact"
    ],
    protectedLocatorId: "RESEARCH-URBANHERMIT-FULL-POPULATION-2026-001"
  },
  {
    id: "SRC-X-URBANHERMIT-EXPLICIT-MENTION-CENSUS-2026",
    title: "Authenticated Jamie Burkart explicit-mention census",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://x.com/search?q=%40urbanhermit%20-from%3Aurbanhermit&src=typed_query&f=live",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Authenticated, read-only Latest-search review for @urbanhermit excluding posts from the account, July 14, 2026.",
    publicNote:
      "The bounded set contains 26 explicit mentions from 17 public accounts. All 26 were directly reverified, then reduced to an aggregate-only public ledger.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "26 explicit mentions from 17 public accounts",
      "seven records from project or professional organizational accounts",
      "11 role or project attribution records and seven mission-related thread records",
      "selected public collaborator and project-account corroboration"
    ],
    doesNotEstablish: [
      "a complete lifetime mention or engagement history",
      "the authorship or meaning of likes and follows",
      "that no public official ever engaged with the account",
      "endorsement, partnership, adoption, audience reach, or impact"
    ]
  },
  ...selectedPersonalPosts.map((source) => ({
    id: source.id,
    title: source.title,
    author: "Jamie Burkart",
    kind: "personal-social-post" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    publishedAt: source.publishedAt,
    accessedAt: "2026-07-14" as const,
    canonicalUrl: source.canonicalUrl,
    preferredPublicUrl: "canonical" as const,
    publicCitation: source.publicCitation,
    publicNote: source.publicNote,
    intakeIds: [intakeId],
    supportsGenerally: [source.support],
    doesNotEstablish: [
      "independent verification of every statement in the post",
      "project outcome, audience reach, or sole authorship unless separately corroborated"
    ]
  })),
  {
    id: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    organization: "NPR Music",
    author: "Lars Gotrich",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.npr.org/2016/04/29/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Lars Gotrich, 'Video: Horse Lords' Hypnotic Truthers Will Blast Your Noodle,' NPR Music, April 29, 2016.",
    publicNote:
      "NPR identifies M.C. Schmidt and Jamie Burkart as the video's makers and reports Horse Lords saxophonist Andrew Bernstein's explanation of how the visual construction mirrors the band's music.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "Jamie Burkart and M.C. Schmidt made the official Horse Lords 'Truthers' video",
      "the video used simple visual materials, repetition, variation, text, and color to translate the music's structure",
      "NPR Music featured the video"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship",
      "the division of labor between Jamie and M.C. Schmidt",
      "an NPR commission, commercial performance, audience reach, or later use"
    ]
  },
  {
    id: "SRC-X-MUSIC-HACKATHON-WOWLIST-CREDIT-2015",
    title: "Music Hackathon public credit for Jamie Burkart and WOW List",
    organization: "Music Hackathon / Music Community Lab",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2015-03-21",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/musichackathon/status/579088937022406657",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Music Hackathon / Music Community Lab post identifying Jamie Burkart as a co-organizer and crediting him with making WOW List, March 20, 2015 Eastern Time.",
    publicNote:
      "The organizational account supplies contemporaneous public role and product credit. Its singular phrasing does not displace Richard Kim or other WOW List collaborators.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "Jamie was publicly identified as a Music Hackathon co-organizer",
      "the organization publicly credited Jamie with making WOW List"
    ],
    doesNotEstablish: [
      "Jamie's complete Music Hackathon role or tenure",
      "sole ownership or authorship of WOW List",
      "product adoption, audience reach, or impact"
    ]
  },
  {
    id: "SRC-X-ALIZA-CABARET-COLLABORATOR-CREDIT-2017",
    title: "Aliza Aufrichtig public collaborator credit for Cabaret Law repeal work",
    author: "Aliza Aufrichtig",
    kind: "personal-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-30",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/alizauf/status/925021115080232960",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Aliza Aufrichtig post crediting Jamie Burkart and Julia Fredenburg for work on the Cabaret Law repeal effort, October 30, 2017.",
    publicNote:
      "A public collaborator attribution that corroborates contribution to the collective effort without assigning sole causation or defining the complete role.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "public collaborator credit for Jamie and Julia's work on the Cabaret Law repeal effort"
    ],
    doesNotEstablish: [
      "the scope or division of their work",
      "sole leadership, authorship of legislation, or causal responsibility for repeal"
    ]
  },
  {
    id: "SRC-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022",
    title: "Jimmy Fitzner public recollection of KC Town Hall tire operations",
    author: "Jimmy Fitzner",
    kind: "personal-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2022-04-02",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/JimmyFitzner/status/1510067983456026629",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Jimmy Fitzner post recalling driving a dump truck with Jamie Burkart to collect tires in Northeast Kansas City, April 1, 2022 Eastern Time.",
    publicNote:
      "A direct collaborator recollection that corroborates hands-on participation in the collective tire workflow without validating project-reported aggregate counts.",
    intakeIds: [intakeId],
    supportsGenerally: [
      "Jamie's hands-on participation with a collaborator in Northeast Kansas City tire collection"
    ],
    doesNotEstablish: [
      "the date or total of a specific KC Town Hall disposal run",
      "audited tire or savings totals",
      "sole ownership or causal neighborhood impact"
    ]
  }
] satisfies SourceRecord[];

const selectedPostReadingSpecs = [
  [
    "READ-X-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
    "SRC-X-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
    "PROP-X-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS",
    "The 2009 post publicly connects river projects, handicrafts, and software design in one invitation to shared office hours.",
    "urbanhermit-participatory-place-and-software-thread"
  ],
  [
    "READ-X-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    "SRC-X-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    "PROP-X-URBANHERMIT-HJE-WEB-PRACTICE",
    "The 2010 post describes Jamie making a forward-looking hand-tool website for Harry J. Epstein Company.",
    "urbanhermit-web-practice-thread"
  ],
  [
    "READ-X-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
    "SRC-X-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
    "PROP-X-URBANHERMIT-SUNDAY-DINNER-VIDEO",
    "The 2013 post publishes a Jamie Burkart video documenting a Sunday Dinner program.",
    "urbanhermit-community-documentation-thread"
  ],
  [
    "READ-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
    "SRC-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
    "PROP-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT",
    "The 2015 post routes readers to an NYC Council public-hearing participation pathway.",
    "urbanhermit-civic-participation-thread"
  ],
  [
    "READ-X-URBANHERMIT-HORSE-LORDS-2016",
    "SRC-X-URBANHERMIT-HORSE-LORDS-2016",
    "PROP-X-URBANHERMIT-HORSE-LORDS-COLLABORATION",
    "The 2016 post says Jamie and M.C. Schmidt made a video for Horse Lords and links the NPR feature.",
    "urbanhermit-creative-technology-thread"
  ],
  [
    "READ-X-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    "SRC-X-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    "PROP-X-URBANHERMIT-LET-NYC-DANCE-SAFETY",
    "The 2017 post frames criminalization and closure of cultural spaces as a public-safety problem.",
    "urbanhermit-cultural-safety-thread"
  ],
  [
    "READ-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    "PROP-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-WORKFLOW",
    "The 2020 post describes a dual-boot workflow for retaining access to older software used in media-archaeology work.",
    "urbanhermit-software-preservation-thread"
  ]
] as const;

export const urbanHermitSocialCensusReadings = [
  {
    id: "READ-X-URBANHERMIT-PROFILE-CONTROL-2026",
    sourceId: "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-URBANHERMIT-PROFILE-CONTROL-434",
        text: "The authenticated @urbanhermit profile displayed a 434-post control.",
        relationToJamie: "project-context",
        supportTags: ["urbanhermit-profile-control-434"],
        confidence: "high",
        locator: "Profile header"
      },
      {
        id: "PROP-X-URBANHERMIT-PROFILE-IDENTITY",
        text:
          "The current profile identifies Jamie and publicly routes Sunday Dinner, WOW List, and NYC Artist Coalition as connected parts of his practice.",
        relationToJamie: "direct-role",
        supportTags: ["urbanhermit-profile-project-continuity"],
        confidence: "high",
        locator: "Profile biography"
      }
    ],
    limitations: [
      "The mutable profile count is a current-population control, not a lifetime archive count.",
      "Profile biography links do not establish the scope, outcome, or sole authorship of the projects."
    ],
    researchTaskIds: ["TASK-URBANHERMIT-FULL-POPULATION-DISPOSITION"]
  },
  {
    id: "READ-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
    sourceId: "SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-URBANHERMIT-FULL-POPULATION-DISPOSITION",
        text:
          "Every record in the authenticated 434-item current-profile control has a disposition: 431 directly reverified records and three reposted source statuses retained from the immediately prior authenticated capture.",
        relationToJamie: "project-context",
        supportTags: ["urbanhermit-full-population-disposition"],
        confidence: "high",
        locator: "Posts and Replies reconciliation plus direct-status retry"
      },
      {
        id: "PROP-X-URBANHERMIT-RELATIONSHIP-COUNTS",
        text:
          "The reconciled population contains 338 authored standalone posts, 15 authored replies, and 81 reposts.",
        relationToJamie: "project-context",
        supportTags: ["urbanhermit-relationship-counts"],
        confidence: "high",
        locator: "Deduplicated record-type accounting"
      },
      {
        id: "PROP-X-URBANHERMIT-POSTED-LINK-INVENTORY",
        text:
          "The corpus contains 345 external-link occurrences across 321 unique shortened URLs in 277 records; 339 occurrences expose 298 unique expanded destination labels.",
        relationToJamie: "project-context",
        supportTags: ["urbanhermit-posted-source-routing"],
        confidence: "high",
        locator: "Deduplicated posted-link inventory"
      },
      {
        id: "PROP-X-URBANHERMIT-MUTABLE-REACTION-FLOOR",
        text:
          "The July 2026 interface showed at least one visible reaction on 85 authored records, totaling eight replies, 60 reposts, and 175 likes across those current status displays.",
        relationToJamie: "outcome-context",
        supportTags: ["urbanhermit-current-visible-reaction-floor"],
        confidence: "moderate",
        locator: "Current visible reaction-label snapshot"
      }
    ],
    limitations: [
      "The current control cannot reveal records removed before capture.",
      "The three retained records are reposted source statuses; the review does not infer why their current objects fail to resolve.",
      "Theme labels are deterministic research aids, not measures of labor, importance, identity, or impact.",
      "Visible reactions are mutable July 2026 interface floors, not historic analytics or unique people."
    ],
    researchTaskIds: [
      "TASK-URBANHERMIT-FULL-POPULATION-DISPOSITION",
      "TASK-URBANHERMIT-EXPORT-AND-PRESERVATION"
    ]
  },
  {
    id: "READ-X-URBANHERMIT-EXPLICIT-MENTION-CENSUS-2026",
    sourceId: "SRC-X-URBANHERMIT-EXPLICIT-MENTION-CENSUS-2026",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-URBANHERMIT-EXPLICIT-MENTION-FLOOR",
        text:
          "A bounded authenticated Latest-search set contains 26 directly reverified records from 17 public accounts that explicitly name @urbanhermit.",
        relationToJamie: "project-context",
        supportTags: ["urbanhermit-explicit-inbound-pattern"],
        confidence: "high",
        locator: "Deduplicated Latest-search and direct-status reconciliation"
      },
      {
        id: "PROP-X-URBANHERMIT-ORGANIZATIONAL-MENTION-FLOOR",
        text:
          "The set includes six records from project accounts and one from a professional organizational account.",
        relationToJamie: "project-context",
        supportTags: ["urbanhermit-organizational-mention-floor"],
        confidence: "high",
        locator: "Stakeholder classification"
      },
      {
        id: "PROP-X-URBANHERMIT-ROLE-PROJECT-ATTRIBUTION-FLOOR",
        text:
          "Eleven records carry role or project attribution, seven are retained as mission-related thread context, and eight are ordinary public conversation rather than professional proof.",
        relationToJamie: "project-context",
        supportTags: ["urbanhermit-role-project-attribution-floor"],
        confidence: "high",
        locator: "Public-safety disposition"
      },
      {
        id: "PROP-X-URBANHERMIT-NO-OFFICIAL-IN-BOUNDED-SET",
        text:
          "No government or public-official account was recovered in this 26-record explicit-mention set.",
        relationToJamie: "limitation",
        supportTags: ["urbanhermit-bounded-official-absence"],
        confidence: "high",
        locator: "Stakeholder classification"
      }
    ],
    limitations: [
      "The result is a current search-index floor, not a complete lifetime interaction history.",
      "The absence of government accounts in this set does not establish that no public official ever engaged with Jamie or his projects.",
      "A public mention can corroborate a relationship or role but does not prove endorsement, adoption, reach, causation, or impact.",
      "Ordinary-life and relationship material remains outside professional projection."
    ],
    researchTaskIds: ["TASK-URBANHERMIT-FULL-POPULATION-DISPOSITION"]
  },
  ...selectedPostReadingSpecs.map(
    ([id, sourceId, propositionId, text, supportTag]) => ({
      id,
      sourceId,
      status: "closely-read" as const,
      readAt: "2026-07-14" as const,
      propositions: [
        {
          id: propositionId,
          text,
          relationToJamie: "direct-role" as const,
          supportTags: [supportTag],
          confidence: "high" as const,
          locator: "Post body"
        }
      ],
      limitations: [
        "This personal-account record is a contemporaneous statement or trace, not independent verification of every project outcome.",
        "No audience, adoption, causation, or impact inference is made from the post."
      ],
      researchTaskIds: []
    })
  ),
  {
    id: "READ-NPR-HORSE-LORDS-TRUTHERS-2016",
    sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-NPR-HORSE-LORDS-JOINT-CREATOR-CREDIT",
        text:
          "NPR identifies Jamie Burkart and M.C. Schmidt together as makers of Horse Lords' official 'Truthers' video.",
        relationToJamie: "collective-role",
        supportTags: ["horse-lords-truthers-joint-creator-credit"],
        confidence: "high",
        locator: "Article body"
      },
      {
        id: "PROP-NPR-HORSE-LORDS-VISUAL-METHOD",
        text:
          "NPR reports Andrew Bernstein's description of the video using simple materials, repetition, variation, text, black and white, and color to mirror the band's musical construction.",
        relationToJamie: "collective-role",
        supportTags: ["horse-lords-truthers-visual-method"],
        confidence: "high",
        locator: "Andrew Bernstein attribution"
      },
      {
        id: "PROP-NPR-HORSE-LORDS-FEATURE",
        text: "NPR Music featured the official video on April 29, 2016.",
        relationToJamie: "outcome-context",
        supportTags: ["horse-lords-truthers-npr-feature"],
        confidence: "high",
        locator: "Headline and publication date"
      }
    ],
    limitations: [
      "The article does not divide labor between Jamie and M.C. Schmidt.",
      "It does not establish an NPR commission, commercial performance, audience reach, or later use."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-X-MUSIC-HACKATHON-WOWLIST-CREDIT-2015",
    sourceId: "SRC-X-MUSIC-HACKATHON-WOWLIST-CREDIT-2015",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-MUSIC-HACKATHON-JAMIE-COORGANIZER",
        text:
          "The Music Hackathon organizational account publicly identified Jamie as a co-organizer in March 2015.",
        relationToJamie: "direct-role",
        supportTags: ["music-hackathon-jamie-coorganizer"],
        confidence: "high",
        locator: "Post body"
      },
      {
        id: "PROP-X-MUSIC-HACKATHON-WOWLIST-CREDIT",
        text:
          "The same post publicly credited Jamie with making WOW List and routed a Music Hackathon calendar on the service.",
        relationToJamie: "direct-role",
        supportTags: ["music-hackathon-wowlist-public-credit"],
        confidence: "high",
        locator: "Post body and linked route"
      }
    ],
    limitations: [
      "The social post does not establish Jamie's complete organizing scope or tenure.",
      "Its singular product-credit phrasing does not displace Richard Kim or other WOW List collaborators."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-X-ALIZA-CABARET-COLLABORATOR-CREDIT-2017",
    sourceId: "SRC-X-ALIZA-CABARET-COLLABORATOR-CREDIT-2017",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-ALIZA-CABARET-COLLABORATOR-CREDIT",
        text:
          "Aliza Aufrichtig publicly credited Jamie Burkart and Julia Fredenburg for their work on the Cabaret Law repeal effort.",
        relationToJamie: "collective-role",
        supportTags: ["cabaret-repeal-public-collaborator-credit"],
        confidence: "high",
        locator: "Post body"
      }
    ],
    limitations: [
      "The post does not define the collaborators' division of labor.",
      "It does not establish sole leadership, legislative authorship, or causal responsibility for repeal."
    ],
    researchTaskIds: []
  },
  {
    id: "READ-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022",
    sourceId: "SRC-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022",
    status: "closely-read",
    readAt: "2026-07-14",
    propositions: [
      {
        id: "PROP-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES",
        text:
          "Jimmy Fitzner publicly recalled driving a dump truck with Jamie to collect tires in Northeast Kansas City.",
        relationToJamie: "collective-role",
        supportTags: ["kc-town-hall-jamie-hands-on-tire-operations"],
        confidence: "high",
        locator: "Post body"
      }
    ],
    limitations: [
      "The post is a collaborator recollection, not an audited operations ledger.",
      "It does not validate project-reported aggregate tire, savings, or outcome figures."
    ],
    researchTaskIds: []
  }
] satisfies SourceReading[];

export const urbanHermitSocialCensusClaims = [
  {
    id: "CLM-URBANHERMIT-UNREVIEWED-MEDIA-LEAD",
    project: "personal-public-archive",
    internalClaim:
      "Ten media-only or text-unavailable records in the surviving @urbanhermit population remain source leads whose professional relevance, content, rights, consent, privacy, and evidentiary relationships have not yet been reviewed.",
    status: "claim-seed",
    maturity: "captured",
    intakeIds: [intakeId],
    requiredSupportTags: [],
    projections: [],
    evidence: [],
    boundaries: [
      "The aggregate census establishes only that these unresolved records exist in the current-profile control.",
      "Keep raw media, status identifiers, exact dates, and personal context outside the public repository while review is pending.",
      "A future reviewer must assess content, professional relevance, authorship, rights, consent, privacy, and source relationships before promotion."
    ],
    antiClaims: [
      "The unresolved media proves a professional role, accomplishment, outcome, or public impact.",
      "The unresolved media is cleared for publication or portfolio use.",
      "The ten records are professionally relevant merely because they survived in the population."
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-URBANHERMIT-FULL-POPULATION-DISPOSITION",
    project: "personal-public-archive",
    internalClaim:
      "The July 2026 @urbanhermit census gives every record in the 434-item current-profile control a public-safe disposition: 431 directly reverified records and three reposted source statuses retained from the immediately prior authenticated capture.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "urbanhermit-profile-control-434",
      "urbanhermit-full-population-disposition",
      "urbanhermit-relationship-counts"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
        relationship: "direct-support",
        supports: ["the current 434-post profile control"],
        propositionIds: ["PROP-X-URBANHERMIT-PROFILE-CONTROL-434"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: [
          "record recovery and reconciliation",
          "current revalidation and preservation status",
          "record-type accounting and public-safety redaction"
        ],
        propositionIds: [
          "PROP-X-URBANHERMIT-FULL-POPULATION-DISPOSITION",
          "PROP-X-URBANHERMIT-RELATIONSHIP-COUNTS"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means 100 percent disposition coverage against the current profile control, not a lifetime account export.",
      "The three records retained from the prior capture are reposted source statuses; no reason for their changed live state is inferred.",
      "The account includes authored posts, replies, and reposts, and reposted text retains its source authorship."
    ],
    antiClaims: [
      "Every record Jamie ever posted was recovered.",
      "All 434 records are currently available as live status pages.",
      "Jamie authored all 434 records.",
      "The public ledger reproduces Jamie's personal timeline."
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-URBANHERMIT-POSTED-SOURCE-ROUTING",
    project: "personal-public-archive",
    internalClaim:
      "The surviving @urbanhermit corpus routes 345 external-link occurrences across 321 unique shortened URLs in 277 records, surfacing project sites, journalism, civic participation pathways, cultural media, and technical resources for separate close reading.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: ["urbanhermit-posted-source-routing"],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["the bounded posted-link inventory"],
        propositionIds: ["PROP-X-URBANHERMIT-POSTED-LINK-INVENTORY"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
        relationship: "context",
        supports: ["one independently close-read source surfaced by a posted URL"],
        propositionIds: ["PROP-NPR-HORSE-LORDS-JOINT-CREATOR-CREDIT"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016",
        relationship: "context",
        supports: ["one independently close-read source surfaced by a posted URL"],
        propositionIds: [
          "PROP-TUNNEL-SCREENING",
          "PROP-TUNNEL-SCAVENGER",
          "PROP-TUNNEL-PUBLIC-HERITAGE"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A posted source remains the work of its author or institution.",
      "Legacy short links and redirects are preservation leads; link inventory does not imply current availability or reader action."
    ],
    antiClaims: [
      "Jamie authored the linked journalism, institutional records, or cultural works.",
      "Every posted URL is still live or completely resolved.",
      "Posted links prove clicks, conversion, endorsement, adoption, causation, or impact."
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source review"]
  },
  {
    id: "CLM-URBANHERMIT-EXPLICIT-INBOUND-PATTERN",
    project: "personal-public-archive",
    internalClaim:
      "A bounded authenticated search recovered 26 explicit @urbanhermit mentions from 17 public accounts, including public organizational and collaborator records that corroborate selected WOW List, Cabaret Law repeal, KC Town Hall, public-history, and creative-technology work.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "urbanhermit-explicit-inbound-pattern",
      "urbanhermit-organizational-mention-floor",
      "urbanhermit-role-project-attribution-floor"
    ],
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-URBANHERMIT-EXPLICIT-MENTION-CENSUS-2026",
        relationship: "direct-support",
        supports: ["bounded mention, stakeholder, and professional-disposition counts"],
        propositionIds: [
          "PROP-X-URBANHERMIT-EXPLICIT-MENTION-FLOOR",
          "PROP-X-URBANHERMIT-ORGANIZATIONAL-MENTION-FLOOR",
          "PROP-X-URBANHERMIT-ROLE-PROJECT-ATTRIBUTION-FLOOR"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-MUSIC-HACKATHON-WOWLIST-CREDIT-2015",
        relationship: "corroborating",
        supports: ["one organizational role and product-credit record"],
        propositionIds: [
          "PROP-X-MUSIC-HACKATHON-JAMIE-COORGANIZER",
          "PROP-X-MUSIC-HACKATHON-WOWLIST-CREDIT"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-ALIZA-CABARET-COLLABORATOR-CREDIT-2017",
        relationship: "corroborating",
        supports: ["one public collaborator attribution for collective Cabaret Law repeal work"],
        propositionIds: ["PROP-X-ALIZA-CABARET-COLLABORATOR-CREDIT"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022",
        relationship: "corroborating",
        supports: ["one public collaborator recollection of hands-on tire operations"],
        propositionIds: ["PROP-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "The result is a current search-index floor, not a complete lifetime engagement census.",
      "Eight ordinary public-conversation records remain explicitly outside professional proof.",
      "No government account appears in this bounded set; that is not proof of no public-official interaction elsewhere."
    ],
    antiClaims: [
      "All public interaction with Jamie or his projects was recovered.",
      "Public mentions prove endorsement, partnership, adoption, audience reach, causation, or impact.",
      "Ordinary-life and relationship material becomes professional evidence because it is public."
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-URBANHERMIT-PRACTICE-CONTINUITY",
    project: "personal-public-archive",
    internalClaim:
      "Selected public-safe personal-account records document recurring threads across participatory place work, software and web practice, community documentation, civic participation, cultural advocacy, creative technology, and media preservation.",
    status: "use-with-care",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "urbanhermit-participatory-place-and-software-thread",
      "urbanhermit-web-practice-thread",
      "urbanhermit-community-documentation-thread",
      "urbanhermit-civic-participation-thread",
      "urbanhermit-cultural-safety-thread",
      "urbanhermit-software-preservation-thread"
    ],
    projections: [],
    evidence: selectedPostReadingSpecs
      .filter(([, sourceId]) => sourceId !== "SRC-X-URBANHERMIT-HORSE-LORDS-2016")
      .map(([, sourceId, propositionId]) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: ["one dated, public-safe instance of a recurring practice thread"],
        propositionIds: [propositionId],
        confidence: "high" as const,
        renderCitation: false
      })),
    boundaries: [
      "This is a description of selected public records, not independent proof of every project outcome.",
      "The selection is editorial and does not make the personal account a resume or comprehensive career chronology.",
      "Ordinary-life, relationship, location, health, and historic contact material remains outside professional projection."
    ],
    antiClaims: [
      "Every personal post is professional evidence.",
      "Theme frequency measures Jamie's professional priorities, labor, importance, or impact.",
      "The selected records independently establish every project outcome."
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
    project: "horse-lords-truthers-video",
    internalClaim:
      "Jamie Burkart and M.C. Schmidt made the official 2016 Horse Lords 'Truthers' video featured by NPR Music.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "horse-lords-truthers-joint-creator-credit",
      "horse-lords-truthers-visual-method",
      "horse-lords-truthers-npr-feature"
    ],
    composition: {
      action: "Co-created the official music video with M.C. Schmidt.",
      intendedEnd:
        "Translate Horse Lords' musical construction into a visual language of simple materials, repetition, variation, text, and color.",
      usableResult: "A completed official video featured by NPR Music.",
      audience: "Horse Lords listeners, music-video viewers, and NPR Music readers.",
      collectiveCredit:
        "Credit Jamie Burkart and M.C. Schmidt together; NPR attributes the description of the video's method to Horse Lords saxophonist Andrew Bernstein.",
      causalBoundary:
        "The sources establish joint maker credit and the NPR feature, not division of labor, commissioning, commercial results, or audience reach."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
        relationship: "direct-support",
        supports: [
          "joint maker credit",
          "official video context",
          "the band's account of the visual method",
          "NPR Music feature"
        ],
        propositionIds: [
          "PROP-NPR-HORSE-LORDS-JOINT-CREATOR-CREDIT",
          "PROP-NPR-HORSE-LORDS-VISUAL-METHOD",
          "PROP-NPR-HORSE-LORDS-FEATURE"
        ],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-URBANHERMIT-HORSE-LORDS-2016",
        relationship: "corroborating",
        supports: ["Jamie's contemporaneous public account of the collaboration"],
        propositionIds: ["PROP-X-URBANHERMIT-HORSE-LORDS-COLLABORATION"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit Jamie and M.C. Schmidt together.",
      "The sources do not establish their division of labor, a commission, commercial results, or audience reach.",
      "Keep the credit in reserve until a public composition benefits from this creative-technology range."
    ],
    antiClaims: [
      "Jamie alone made the Horse Lords video.",
      "NPR commissioned the video.",
      "The feature proves commercial success or measured reach."
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-MUSIC-HACKATHON-WOWLIST-PUBLIC-CREDIT",
    project: "music-hackathon",
    internalClaim:
      "In March 2015 the Music Hackathon organizational account publicly identified Jamie as a co-organizer and credited him with making WOW List, while the broader knowledge bank preserves Richard Kim and other collaborators' product credit.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: [intakeId],
    requiredSupportTags: [
      "music-hackathon-jamie-coorganizer",
      "music-hackathon-wowlist-public-credit"
    ],
    composition: {
      action: "Co-organized Music Hackathon and helped build WOW List.",
      intendedEnd:
        "Support a music-technology community and give its participants a reusable event-sharing surface.",
      usableResult:
        "A Music Hackathon calendar route on WOW List and contemporaneous organizational credit for Jamie's role.",
      audience: "Music Hackathon participants and event-sharing communities.",
      collectiveCredit:
        "Retain Music Hackathon's public co-organizer credit while preserving Richard Kim and other WOW List collaborators' product credit.",
      causalBoundary:
        "The post documents public role and product credit, not complete tenure, sole authorship, adoption, or impact."
    },
    projections: [],
    evidence: [
      {
        sourceId: "SRC-X-MUSIC-HACKATHON-WOWLIST-CREDIT-2015",
        relationship: "direct-support",
        supports: ["co-organizer identification and contemporaneous WOW List credit"],
        propositionIds: [
          "PROP-X-MUSIC-HACKATHON-JAMIE-COORGANIZER",
          "PROP-X-MUSIC-HACKATHON-WOWLIST-CREDIT"
        ],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Describe Jamie as a co-organizer, not the sole organizer.",
      "Treat the singular WOW List phrasing as corroboration of Jamie's creation role, not sole ownership."
    ],
    antiClaims: [
      "Jamie alone organized Music Hackathon.",
      "Jamie alone made or owned WOW List.",
      "The post proves product adoption, audience reach, or impact."
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex source review"]
  }
] satisfies ClaimRecord[];

export const urbanHermitSocialCensusResearchTasks = [
  {
    id: "TASK-URBANHERMIT-FULL-POPULATION-DISPOSITION",
    project: "personal-public-archive",
    question:
      "Can every record in the current @urbanhermit profile control receive an explicit, privacy-preserving disposition while professional source leads are separated from ordinary life and relational context?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: [
      "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
      "SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
      "SRC-X-URBANHERMIT-EXPLICIT-MENTION-CENSUS-2026"
    ],
    claimIds: [
      "CLM-URBANHERMIT-FULL-POPULATION-DISPOSITION",
      "CLM-URBANHERMIT-POSTED-SOURCE-ROUTING",
      "CLM-URBANHERMIT-EXPLICIT-INBOUND-PATTERN",
      "CLM-URBANHERMIT-PRACTICE-CONTINUITY",
      "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      "CLM-MUSIC-HACKATHON-WOWLIST-PUBLIC-CREDIT"
    ],
    nextActions: [
      "Re-run and diff the aggregate-only ledgers if the displayed profile count or live status resolution changes.",
      "Keep public-site composition deferred until a separate Chad-lens review selects a claim for a specific audience and purpose."
    ],
    resolutionSummary:
      "Created 434 public-safe current-profile dispositions, directly reverified 431 records, retained three changed repost-source records through prior authenticated capture, classified all 26 recoverable explicit mentions, inventoried posted links, and integrated selected public sources without publishing the raw personal timeline."
  },
  {
    id: "TASK-URBANHERMIT-EXPORT-AND-PRESERVATION",
    project: "personal-public-archive",
    question:
      "Can an authorized account export and media-preservation pass test pre-capture deletion history, preserve the three changed repost-source records, and review media-only items without publishing personal material?",
    status: "open",
    priority: "medium",
    openedAt: "2026-07-14",
    intakeIds: [intakeId],
    sourceIds: ["SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026"],
    claimIds: [
      "CLM-URBANHERMIT-FULL-POPULATION-DISPOSITION",
      "CLM-URBANHERMIT-UNREVIEWED-MEDIA-LEAD"
    ],
    nextActions: [
      "Request or generate an authorized X account export if available.",
      "Reconcile export records against the aggregate ledger without committing raw personal content.",
      "Review media-only records for rights, consent, privacy, and professional relevance before any source promotion."
    ]
  }
] satisfies ResearchTask[];

export const urbanHermitSocialCensusInquiries = [
  {
    id: "INQ-URBANHERMIT-FULL-POPULATION-2026",
    project: "personal-public-archive",
    question:
      "Can 100 percent of the surviving @urbanhermit current-profile population be recovered, reverified, classified, and integrated without turning a personal timeline into a public dossier?",
    methods: [
      "Used the authenticated live profile's displayed 434-post count as the current-population control.",
      "Recovered 421 unique records from the Posts surface and 13 additional Jamie-authored replies from the Replies surface.",
      "Deduplicated the union by status ID, yielding exactly 434 current-profile records.",
      "Revisited profile, Posts, Replies, and direct status routes on July 14, directly reverifying 431 records and retaining three changed repost-source records from the immediately prior authenticated capture.",
      "Classified every record by year, relationship, and one primary interpretive theme while separating authored records from reposts.",
      "Inventoried posted URLs and directly reverified all 26 records in a bounded explicit-mention search.",
      "Close-read selected professional candidates and independently corroborated the strongest new credit through NPR Music.",
      "Generated aggregate-only public ledgers while keeping full text, exact dates, handles, status IDs, URLs, media, metrics, and browser artifacts outside the repository."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "Every record in the 434-item current-profile control has a public-safe disposition.",
      "The population contains 338 authored standalone posts, 15 authored replies, and 81 reposts.",
      "The July 14 recrawl directly reverified 431 records; three reposted source statuses remain preserved through the immediately prior authenticated capture.",
      "The bounded explicit-mention set contains 26 records from 17 public accounts, including 11 role or project attribution records.",
      "Selected records expose recurring practice threads and source leads without making the personal account a resume.",
      "NPR Music independently identifies Jamie Burkart and M.C. Schmidt as makers of Horse Lords' official 2016 'Truthers' video."
    ],
    limitations: [
      "The current profile count cannot reveal records removed before capture.",
      "X's profile, Posts, Replies, and search surfaces are interface views rather than an official account export.",
      "The review does not infer why three reposted source statuses no longer resolve directly.",
      "Quoted and reposted material remains attributable to its displayed source account, not Jamie.",
      "Theme labels and current reaction labels do not measure time, importance, effort, reach, or impact.",
      "Historic personal records contain contact, location, relationship, health, and ordinary-life material that should not be republished as a professional archive."
    ],
    sourceIds: [
      "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
      "SRC-X-URBANHERMIT-FULL-POPULATION-CENSUS-2026",
      "SRC-X-URBANHERMIT-EXPLICIT-MENTION-CENSUS-2026",
      ...selectedPersonalPosts.map((source) => source.id),
      "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
      "SRC-X-MUSIC-HACKATHON-WOWLIST-CREDIT-2015",
      "SRC-X-ALIZA-CABARET-COLLABORATOR-CREDIT-2017",
      "SRC-X-JIMMY-FITZNER-KC-TOWN-HALL-TIRES-2022"
    ],
    publicSummary:
      "All 434 records in the current live-profile control were accounted for. The public repository preserves aggregate accounting and selected professional evidence while withholding the raw personal timeline.",
    protectedLocatorId: "RESEARCH-URBANHERMIT-FULL-POPULATION-2026-001"
  }
] satisfies ResearchInquiry[];

export const urbanHermitSocialCensusDecisions = [
  {
    id: "DEC-DEFER-URBANHERMIT-FULL-POPULATION",
    claimId: "CLM-URBANHERMIT-FULL-POPULATION-DISPOSITION",
    surface: "/",
    decision: "defer",
    rationale:
      "Keep population-accounting evidence in the knowledge bank; the raw personal timeline is not a public portfolio surface, and census methodology is not the clearest hiring-facing account of Jamie's work.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-URBANHERMIT-SOURCE-ROUTING",
    claimId: "CLM-URBANHERMIT-POSTED-SOURCE-ROUTING",
    surface: "/",
    decision: "defer",
    rationale:
      "Use the link inventory as a research and source-discovery layer; only close-read sources attached to direct roles and audience-relevant claims should enter public composition.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-URBANHERMIT-INBOUND-PATTERN",
    claimId: "CLM-URBANHERMIT-EXPLICIT-INBOUND-PATTERN",
    surface: "/",
    decision: "defer",
    rationale:
      "Preserve selected collaborator and organizational corroboration in the knowledge bank without turning ordinary conversation or mention counts into a public traction claim.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-URBANHERMIT-PRACTICE-CONTINUITY",
    claimId: "CLM-URBANHERMIT-PRACTICE-CONTINUITY",
    surface: "/about",
    decision: "defer",
    rationale:
      "The recurring threads deepen future composition, but a personal-account chronology would increase reader burden and weaken the site's direct professional argument.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-HORSE-LORDS-TRUTHERS-VIDEO",
    claimId: "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
    surface: "/work",
    decision: "defer",
    rationale:
      "The joint creative-technology credit is strong and public-ready, but the current hiring argument has higher-priority technical operations and civic delivery proofs. Retain it for a future composition that needs creative range.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  },
  {
    id: "DEC-DEFER-MUSIC-HACKATHON-WOWLIST-CREDIT",
    claimId: "CLM-MUSIC-HACKATHON-WOWLIST-PUBLIC-CREDIT",
    surface: "/work/wowlist",
    decision: "defer",
    rationale:
      "The 2015 organizational credit strengthens the knowledge bank, but the existing WOW List case study already carries clearer product, collaboration, and adoption evidence.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Codex Chad-lens composition review"]
  }
] satisfies ProjectionDecision[];
