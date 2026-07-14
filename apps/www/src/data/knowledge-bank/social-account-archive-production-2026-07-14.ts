import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const projectTwitterAccountInventory = {
  reviewedAt: "2026-07-14",
  method: "Authenticated, read-only X profile, timeline, and indexed-search review.",
  accounts: [
    { project: "CallNYC", handle: "@CallNYCapp", profileUrl: "https://x.com/CallNYCapp", observedPosts: 110, recoveredPublicStatuses: 107, unresolvedProfileCountSlots: 3 },
    { project: "NYC Artist Coalition", handle: "@NYCArtC", profileUrl: "https://x.com/NYCArtC", observedPosts: 5124, recoveredIndexedMentions: 374 },
    { project: "WOW List", handle: "@wowlist", profileUrl: "https://x.com/wowlist", observedPosts: 38, recoveredTimelineItems: 38 },
    { project: "KC Town Hall", handle: "@KCTownHall", profileUrl: "https://x.com/KCTownHall", observedPosts: 183, recoveredTimelineItems: 183 },
    { project: "KC Spaces Fund", handle: "@KCSpacesFund", profileUrl: "https://x.com/KCSpacesFund", observedPosts: 35, recoveredTimelineItems: 34 }
  ],
  sharedCampaignHandle: {
    handle: "@NYCArtC",
    campaigns: ["Let NYC Dance", "Talks Not Raids", "Save NYC Spaces", "FairRentNYC"]
  },
  noDedicatedAccountRecovered: ["196 Artists Residency", "Sunday Dinner"],
  limits: [
    "Observed profile totals are mutable snapshots, not lifetime archive counts.",
    "Recovered timelines and indexed searches are incomplete denominators.",
    "Account posts may have multiple authors and do not establish who drafted or published an individual post.",
    "Replies, reposts, quotes, mentions, likes, and follows do not establish institutional adoption, endorsement, or resident use."
  ]
} as const;

export const socialArchiveEntities = [
  {
    id: "ENT-KC-SPACES-FUND",
    kind: "project",
    label: "KC Spaces Fund",
    publicSafeSummary: "A 2020 emergency mutual-aid fund for grassroots arts and culture spaces in the Kansas City region.",
    aliases: ["KC Arts and Culture Spaces Mutual Aid Fund", "@KCSpacesFund"],
    projectKey: "kc-spaces-fund",
    relatedEntityIds: [],
    status: "historical"
  },
  {
    id: "ENT-SOCIAL-PROJECT-IDENTITY-PRACTICE",
    kind: "project",
    label: "Public project identity systems",
    publicSafeSummary: "Jamie's cross-project practice of establishing durable public identities that collaborators could use for explanation, outreach, support, and documentation.",
    aliases: ["Social account practice"],
    projectKey: "social-project-identity-practice",
    relatedEntityIds: ["ENT-CALLNYC", "ENT-NYC-ARTIST-COALITION", "ENT-WOWLIST", "ENT-KC-TOWN-HALL", "ENT-KC-SPACES-FUND"],
    status: "conceptual"
  }
] satisfies EntityRecord[];

export const socialArchiveIntake = [
  {
    id: "INTAKE-NYCARTC-X-ARCHIVE-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Authenticated review of the public @NYCArtC profile, four campaign searches, indexed mentions, and selected Council-member interactions.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/NYCArtC",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-CABARET-LAW-REPEAL", "ENT-TALKS-NOT-RAIDS", "ENT-FAIR-RENT-NYC"],
    disposition: "source-created",
    sourceIds: [
      "SRC-X-PROFILE-NYCARTC-2026", "SRC-X-REVIEW-NYCARTC-2026",
      "SRC-X-NYCARTC-ESPINAL-2019", "SRC-X-NYCARTC-LEVIN-2019", "SRC-X-NYCARTC-LANDER-2021", "SRC-X-NYCARTC-VAN-BRAMER-2020", "SRC-X-NYCARTC-LEVINE-2020",
      "SRC-X-NYCARTC-LETNYCDANCE-2017", "SRC-X-NYCARTC-TALKSNOTRAIDS-2020", "SRC-X-NYCARTC-SAVENYCSPACES-2018", "SRC-X-NYCARTC-FAIRRENT-2023"
    ],
    claimIds: ["CLM-NYCARTC-SOCIAL-IDENTITY-CONTINUITY", "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-SOCIAL-ACCOUNT-ESTABLISHMENT-MEMORY-2026",
    receivedAt: "2026-07-14",
    kind: "public-memory",
    publicSafeSummary: "Jamie reports establishing the project accounts and designing public-facing identities that teammates, including Olympia Kazi, could use over multiple years.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-SOCIAL-PROJECT-IDENTITY-PRACTICE", "ENT-NYC-ARTIST-COALITION"],
    disposition: "research-open",
    sourceIds: [],
    claimIds: ["CLM-SOCIAL-ACCOUNT-ESTABLISHMENT-SEED"],
    researchTaskIds: ["TASK-SOCIAL-ACCOUNT-ESTABLISHMENT-AND-AUTHORSHIP"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-WOWLIST-X-ARCHIVE-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Authenticated review of the public @wowlist profile and recovered timeline.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/wowlist",
    entityIds: ["ENT-WOWLIST", "ENT-SUNDAY-DINNER"],
    disposition: "source-created",
    sourceIds: ["SRC-X-PROFILE-WOWLIST-2026", "SRC-X-REVIEW-WOWLIST-2026", "SRC-X-WOWLIST-ORIGIN-2014", "SRC-X-WOWLIST-SUPPORT-2015", "SRC-X-WOWLIST-NYCDIY-2016"],
    claimIds: ["CLM-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCSPACES-X-ARCHIVE-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Authenticated review of the public @KCSpacesFund profile and recovered 2020 timeline.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/KCSpacesFund",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "source-created",
    sourceIds: ["SRC-X-PROFILE-KCSPACES-2026", "SRC-X-REVIEW-KCSPACES-2026", "SRC-X-KCSPACES-LAUNCH-2020", "SRC-X-KCSPACES-ROLLING-GRANTS-2020", "SRC-X-KCSPACES-FIRST-ROUND-2020"],
    claimIds: ["CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"],
    researchTaskIds: ["TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026",
    receivedAt: "2026-07-14",
    kind: "private-archive-pointer",
    publicSafeSummary: "AI-assisted review of public-safe conclusions from the KC Spaces Fund project and code archive, retained as background evidence rather than eyewitness testimony.",
    submittedBy: "Codex archival review",
    entityIds: ["ENT-KC-SPACES-FUND"],
    disposition: "source-created",
    sourceIds: ["SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026"],
    claimIds: ["CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"],
    researchTaskIds: ["TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-KCTOWNHALL-X-ARCHIVE-2026",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Authenticated review of the public @KCTownHall profile and a bounded timeline sample.",
    submittedBy: "Codex authenticated social-archive review",
    sourceUrl: "https://x.com/KCTownHall",
    entityIds: ["ENT-KC-TOWN-HALL"],
    disposition: "source-created",
    sourceIds: ["SRC-X-PROFILE-KCTOWNHALL-2026", "SRC-X-REVIEW-KCTOWNHALL-2026", "SRC-X-KCTOWNHALL-PIN-2018", "SRC-X-KCTOWNHALL-TIRES-JUNE-2019", "SRC-X-KCTOWNHALL-TIRES-JULY-2019"],
    claimIds: ["CLM-KCTOWNHALL-SOCIAL-OPERATIONS-LOOP"],
    researchTaskIds: ["TASK-KCTOWNHALL-SOCIAL-METRIC-RECONCILIATION"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-HELLGATE-NIGHTCLUB-RAIDS-2023",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Hell Gate reporting surfaced through the @NYCArtC Talks Not Raids stream about disputed 2023 multi-agency nightlife inspections.",
    submittedBy: "Codex social-source discovery",
    sourceUrl: "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/",
    entityIds: ["ENT-TALKS-NOT-RAIDS", "ENT-MARCH-OPERATIONS"],
    disposition: "source-created",
    sourceIds: ["SRC-HELLGATE-NIGHTCLUB-RAIDS-2023"],
    claimIds: [],
    researchTaskIds: ["TASK-NYCARTC-MARCH-TRANSPARENCY-OUTCOME"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-HELLGATE-CURE-MARCH-2025",
    receivedAt: "2026-07-14",
    kind: "public-url",
    publicSafeSummary: "Hell Gate reporting surfaced through the @NYCArtC Talks Not Raids stream about renewed multi-agency nightlife inspections in 2025.",
    submittedBy: "Codex social-source discovery",
    sourceUrl: "https://hellgatenyc.com/cure-march-raids-2025-report/",
    entityIds: ["ENT-TALKS-NOT-RAIDS", "ENT-MARCH-OPERATIONS"],
    disposition: "source-created",
    sourceIds: ["SRC-HELLGATE-CURE-MARCH-2025"],
    claimIds: [],
    researchTaskIds: ["TASK-NYCARTC-MARCH-TRANSPARENCY-OUTCOME"],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

const profileSources = [
  ["SRC-X-PROFILE-CALLNYCAPP-2026", "CallNYC (@CallNYCapp) public X profile", "CallNYC", "https://x.com/CallNYCapp", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "The profile identifies CallNYC as a resident-facing interface for New York City Council open data and showed 110 posts at review time."],
  ["SRC-X-PROFILE-NYCARTC-2026", "NYC Artist Coalition (@NYCArtC) public X profile", "NYC Artist Coalition", "https://x.com/NYCArtC", "INTAKE-NYCARTC-X-ARCHIVE-2026", "The profile has existed since January 2017 and explicitly names Save NYC Spaces, Let NYC Dance, Talks Not Raids, and FairRentNYC."],
  ["SRC-X-PROFILE-WOWLIST-2026", "WOW List (@wowlist) public X profile", "WOW List", "https://x.com/wowlist", "INTAKE-WOWLIST-X-ARCHIVE-2026", "The profile identifies the public WOW List account, which showed 38 posts at review time."],
  ["SRC-X-PROFILE-KCTOWNHALL-2026", "KC Town Hall (@KCTownHall) public X profile", "KC Town Hall", "https://x.com/KCTownHall", "INTAKE-KCTOWNHALL-X-ARCHIVE-2026", "The profile describes a neighborhood-resource and cultural-center project and showed 183 posts at review time."],
  ["SRC-X-PROFILE-KCSPACES-2026", "KC Spaces Fund (@KCSpacesFund) public X profile", "KC Spaces Fund", "https://x.com/KCSpacesFund", "INTAKE-KCSPACES-X-ARCHIVE-2026", "The profile describes a COVID-19 emergency fund for grassroots arts and culture spaces in Kansas City and showed 35 posts at review time."]
] as const;

const researchSources: SourceRecord[] = [
  {
    id: "SRC-X-REVIEW-CALLNYC-2026", title: "Authenticated CallNYC X inventory", author: "Codex archival review", kind: "research-run", visibility: "public", preservationStatus: "live", capturedAt: "2026-07-14", accessedAt: "2026-07-14",
    publicCitation: "Authenticated, read-only review of the @CallNYCapp profile, timeline, and indexed mentions, July 14, 2026.",
    publicNote: "The review recovered 107 unique public statuses across the authenticated Posts and Replies routes from a profile showing 110 posts, preserved three unresolved slots, and verified a minimum of eight then-serving Council member accounts that replied to, quoted, reposted, or directly shared CallNYC.",
    intakeIds: ["INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT"], supportsGenerally: ["bounded CallNYC Posts and Replies inventory", "minimum of eight then-serving Council-member account interactions"], doesNotEstablish: ["a native X data export", "the content or cause of three unresolved profile-count slots", "an exhaustive interaction count", "institutional adoption", "endorsement", "resident use", "complete liker history"]
  },
  {
    id: "SRC-X-REVIEW-NYCARTC-2026", title: "Authenticated NYC Artist Coalition X inventory", author: "Codex archival review", kind: "research-run", visibility: "public", preservationStatus: "live", capturedAt: "2026-07-14", accessedAt: "2026-07-14",
    publicCitation: "Authenticated, read-only review of the @NYCArtC profile, campaign searches, and indexed mentions, July 14, 2026.",
    publicNote: "The review recovered 374 indexed mentions, including 89 from Olympia Kazi's account, and minimum campaign-search sets of 90 Let NYC Dance posts, 55 Talks Not Raids posts, 102 Save NYC Spaces posts, and 69 FairRentNYC posts authored by @NYCArtC.",
    intakeIds: ["INTAKE-NYCARTC-X-ARCHIVE-2026"], supportsGenerally: ["bounded indexed mention counts", "bounded campaign-search counts", "minimum of five then-serving Council-member account interactions", "sustained use by Olympia Kazi from her own account"], doesNotEstablish: ["complete lifetime mention totals", "authorship of individual @NYCArtC posts", "Jamie as sole account operator", "institutional adoption", "campaign causation"]
  },
  {
    id: "SRC-X-REVIEW-WOWLIST-2026", title: "Authenticated WOW List X inventory", author: "Codex archival review", kind: "research-run", visibility: "public", preservationStatus: "live", capturedAt: "2026-07-14", accessedAt: "2026-07-14",
    publicCitation: "Authenticated, read-only review of the @wowlist profile and recovered timeline, July 14, 2026.",
    publicNote: "The cross-tab review recovered all 38 items represented by the observed profile count; the complete item ledger and route reconciliation are recorded in the full-population census.",
    intakeIds: ["INTAKE-WOWLIST-X-ARCHIVE-2026"], supportsGenerally: ["bounded WOW List social timeline inventory"], doesNotEstablish: ["a native platform export or deletion history", "user adoption", "Jamie as sole account author"]
  },
  {
    id: "SRC-X-REVIEW-KCSPACES-2026", title: "Authenticated KC Spaces Fund X inventory", author: "Codex archival review", kind: "research-run", visibility: "public", preservationStatus: "live", capturedAt: "2026-07-14", accessedAt: "2026-07-14",
    publicCitation: "Authenticated, read-only review of the @KCSpacesFund profile and recovered timeline, July 14, 2026.",
    publicNote: "The review recovered 34 visible timeline items from a profile showing 35 posts, including at least 11 distinct grantee or funding announcements.",
    intakeIds: ["INTAKE-KCSPACES-X-ARCHIVE-2026"], supportsGenerally: ["bounded KC Spaces Fund timeline inventory", "at least 11 public grantee or funding announcements"], doesNotEstablish: ["a complete grant ledger", "Jamie as an organizer or grant decision-maker", "authorship of individual posts", "fundraising causation"]
  },
  {
    id: "SRC-X-REVIEW-KCTOWNHALL-2026", title: "Authenticated KC Town Hall X inventory", author: "Codex archival review", kind: "research-run", visibility: "public", preservationStatus: "live", capturedAt: "2026-07-14", accessedAt: "2026-07-14",
    publicCitation: "Authenticated, read-only review of the @KCTownHall profile and a bounded timeline sample, July 14, 2026.",
    publicNote: "The review recovered 121 visible items from a profile showing 183 posts, including 106 account-authored items and repeated calls for tire locations followed by dated operational reports.",
    intakeIds: ["INTAKE-KCTOWNHALL-X-ARCHIVE-2026"], supportsGenerally: ["bounded KC Town Hall timeline inventory", "public intake and reporting pattern"], doesNotEstablish: ["a complete timeline", "independently audited tire or savings totals", "Jamie as author of every post", "causal neighborhood impact"]
  },
  {
    id: "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026", title: "KC Spaces Fund digital-infrastructure archival review", author: "Codex archival review", kind: "research-run", visibility: "protected", preservationStatus: "private", capturedAt: "2026-07-09",
    publicCitation: "AI-assisted archival review of KC Spaces Fund project and code records, July 2026.",
    publicNote: "The review documents Jamie's behind-the-scenes Ghost site, campaign-theme, fundraising-widget, deployment, and domain or platform work. It is archival analysis, not a human collaborator testimonial.",
    intakeIds: ["INTAKE-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026"], supportsGenerally: ["Jamie's behind-the-scenes digital-infrastructure role", "campaign site and theme implementation", "fundraising widget and deployment work"], doesNotEstablish: ["public organizer status", "grant decision-making", "fundraiser ownership", "authorship of every social post", "eyewitness testimony"], protectedLocatorId: "RESEARCH-KCSPACES-DIGITAL-INFRASTRUCTURE-2026-001"
  }
];

const postSources = [
  ["SRC-X-CALLNYC-CHIN-2017", "Margaret Chin response to CallNYC", "New York City Council Member Margaret Chin", "government-social-post", "2017-07-11", "https://x.com/CM_MargaretChin/status/884863588317442049", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Margaret Chin's Council-member account thanked CallNYC for recognition and said her office was ready to work harder.", "callnyc-council-member-engagement"],
  ["SRC-X-CALLNYC-WILLS-2016", "Ruben Wills response to CallNYC", "New York City Council Member Ruben Wills", "government-social-post", "2016-05-17", "https://x.com/CM_RubenWills/status/732717792097603584", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Ruben Wills's Council-member account replied in a CallNYC and New York City Council thread.", "callnyc-council-member-engagement"],
  ["SRC-X-CALLNYC-MATTEO-2016", "Steven Matteo response to CallNYC", "New York City Council Member Steven Matteo", "government-social-post", "2016-05-03", "https://x.com/StevenMatteo/status/727621921341358081", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Steven Matteo's Council-member account replied to CallNYC with a constituent-service issue description.", "callnyc-council-member-engagement"],
  ["SRC-X-CALLNYC-KOO-2016", "Peter Koo repost of CallNYC recognition", "New York City Council Member Peter Koo", "government-social-post", "2016-04-27", "https://x.com/CMPeterKoo/status/725422741160079360", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Peter Koo's Council-member account reposted a CallNYC issue-recognition post.", "callnyc-council-member-engagement"],
  ["SRC-X-CALLNYC-EUGENE-2016", "Mathieu Eugene quote of CallNYC", "New York City Council Member Mathieu Eugene", "government-social-post", "2016-10-04", "https://x.com/CMMathieuEugene/status/783305320508514304", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Mathieu Eugene's Council-member account quoted CallNYC while discussing constituent housing help.", "callnyc-council-member-engagement"],
  ["SRC-X-CALLNYC-ROSENTHAL-2016", "Helen Rosenthal share of CallNYC", "New York City Council Member Helen Rosenthal", "government-social-post", "2016-09-27", "https://x.com/HelenRosenthal/status/780797474277511170", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Helen Rosenthal's Council-member account directly shared CallNYC as a way to find Council offices.", "callnyc-council-member-engagement"],
  ["SRC-X-CALLNYC-MENDEZ-2016", "Rosie Mendez quote of CallNYC", "New York City Council Member Rosie Mendez", "government-social-post", "2016-05-19", "https://x.com/RosieMendez/status/733410096915550208", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Rosie Mendez's Council-member account quoted CallNYC's emergency-repairs recognition and thanked her team.", "callnyc-council-member-engagement"],
  ["SRC-X-CALLNYC-RODRIGUEZ-2016", "Ydanis Rodriguez quote of CallNYC", "New York City Council Member Ydanis Rodriguez", "government-social-post", "2016-05-18", "https://x.com/ydanis/status/733089563334299648", "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT", "Ydanis Rodriguez's Council-member account quoted CallNYC's rent-overcharge recognition and connected it to tenant protection.", "callnyc-council-member-engagement"],
  ["SRC-X-NYCARTC-ESPINAL-2019", "Rafael Espinal response to NYC Artist Coalition", "New York City Council Member Rafael Espinal", "government-social-post", "2019-02-21", "https://x.com/RLEspinal/status/1098626837821997056", "INTAKE-NYCARTC-X-ARCHIVE-2026", "Rafael Espinal's Council-member account thanked @NYCArtC and used the Save NYC Spaces and Talks Not Raids campaign language.", "nycartc-council-member-engagement"],
  ["SRC-X-NYCARTC-LEVIN-2019", "Stephen Levin response to Talks Not Raids", "New York City Council Member Stephen Levin", "government-social-post", "2019-02-11", "https://x.com/StephenLevin33/status/1095020293112979457", "INTAKE-NYCARTC-X-ARCHIVE-2026", "Stephen Levin's Council-member account thanked @NYCArtC and venues for testimony about MARCH operations.", "nycartc-council-member-engagement"],
  ["SRC-X-NYCARTC-LANDER-2021", "Brad Lander response in FairRentNYC thread", "New York City Council Member Brad Lander", "government-social-post", "2021-01-28", "https://x.com/bradlander/status/1354840336330330116", "INTAKE-NYCARTC-X-ARCHIVE-2026", "Brad Lander's Council-member account replied in a coalition commercial-rent thread and described supporting Commercial Rent Stabilization in committee remarks.", "nycartc-council-member-engagement"],
  ["SRC-X-NYCARTC-VAN-BRAMER-2020", "Jimmy Van Bramer post naming NYC Artist Coalition", "New York City Council Member Jimmy Van Bramer", "government-social-post", "2020-10-26", "https://x.com/JimmyVanBramer/status/1320792543773282304", "INTAKE-NYCARTC-X-ARCHIVE-2026", "Jimmy Van Bramer's Council-member account named @NYCArtC in a post advocating support for performing artists and culture.", "nycartc-council-member-engagement"],
  ["SRC-X-NYCARTC-LEVINE-2020", "Mark Levine reply to NYC Artist Coalition", "New York City Council Member Mark Levine", "government-social-post", "2020-03-20", "https://x.com/MarkLevineNYC/status/1241027587947876352", "INTAKE-NYCARTC-X-ARCHIVE-2026", "Mark Levine's Council-member account replied directly to @NYCArtC.", "nycartc-council-member-engagement"],
  ["SRC-X-NYCARTC-LETNYCDANCE-2017", "NYC Artist Coalition Cabaret Law repeal post", "NYC Artist Coalition", "institutional-social-post", "2017-11-28", "https://x.com/NYCArtC/status/935386225539735552", "INTAKE-NYCARTC-X-ARCHIVE-2026", "The coalition account announced the Cabaret Law repeal under the Let NYC Dance identity and credited collaborators and public officials.", "nycartc-shared-campaign-identity"],
  ["SRC-X-NYCARTC-TALKSNOTRAIDS-2020", "NYC Artist Coalition MARCH transparency report post", "NYC Artist Coalition", "institutional-social-post", "2020-09-16", "https://x.com/NYCArtC/status/1306354775823388675", "INTAKE-NYCARTC-X-ARCHIVE-2026", "The coalition account used the Talks Not Raids identity to circulate the first city MARCH transparency report.", "nycartc-shared-campaign-identity"],
  ["SRC-X-NYCARTC-SAVENYCSPACES-2018", "NYC Artist Coalition Save NYC Spaces action post", "NYC Artist Coalition", "institutional-social-post", "2018-10-18", "https://x.com/NYCArtC/status/1053070380276088833", "INTAKE-NYCARTC-X-ARCHIVE-2026", "The coalition account used the Save NYC Spaces identity to mobilize for a City Hall commercial-tenant hearing.", "nycartc-shared-campaign-identity"],
  ["SRC-X-NYCARTC-FAIRRENT-2023", "NYC Artist Coalition FairRentNYC source-sharing post", "NYC Artist Coalition", "institutional-social-post", "2023-06-28", "https://x.com/NYCArtC/status/1674013523373068289", "INTAKE-NYCARTC-X-ARCHIVE-2026", "The coalition account used FairRentNYC to connect a reported small-business lease dispute with proposed commercial-tenant protections.", "nycartc-shared-campaign-identity"],
  ["SRC-X-WOWLIST-ORIGIN-2014", "WOW List account origin post", "WOW List", "institutional-social-post", "2014-02-12", "https://x.com/wowlist/status/433671630837919744", "INTAKE-WOWLIST-X-ARCHIVE-2026", "The account publicly identified Richard and Jamie as working on a project based on WOW List calendars made at Sunday Dinner.", "wowlist-social-origin"],
  ["SRC-X-WOWLIST-SUPPORT-2015", "WOW List product-support thread", "WOW List", "institutional-social-post", "2015-04-24", "https://x.com/wowlist/status/591664757473673216", "INTAKE-WOWLIST-X-ARCHIVE-2026", "The account answered a prospective user's questions about local calendars, profiles, and contributing events and lists.", "wowlist-public-support"],
  ["SRC-X-WOWLIST-NYCDIY-2016", "WOW List NYC DIY calendar post", "WOW List", "institutional-social-post", "2016-09-01", "https://x.com/wowlist/status/771457416298921985", "INTAKE-WOWLIST-X-ARCHIVE-2026", "The account described NYC DIY as running on WOW List and connected the community calendar to Sunday Dinner.", "wowlist-community-adaptation"],
  ["SRC-X-KCSPACES-LAUNCH-2020", "KC Spaces Fund public launch post", "KC Spaces Fund", "institutional-social-post", "2020-04-07", "https://x.com/KCSpacesFund/status/1247641592510504961", "INTAKE-KCSPACES-X-ARCHIVE-2026", "The account launched public donation and application pathways for emergency support to grassroots arts and culture spaces.", "kcspaces-public-fund-operations"],
  ["SRC-X-KCSPACES-ROLLING-GRANTS-2020", "KC Spaces Fund rolling-grant post", "KC Spaces Fund", "institutional-social-post", "2020-04-14", "https://x.com/KCSpacesFund/status/1250217081552986112", "INTAKE-KCSPACES-X-ARCHIVE-2026", "The account described rolling emergency-grant distribution and continued application and donation pathways.", "kcspaces-public-fund-operations"],
  ["SRC-X-KCSPACES-FIRST-ROUND-2020", "KC Spaces Fund first funding announcement", "KC Spaces Fund", "institutional-social-post", "2020-04-18", "https://x.com/KCSpacesFund/status/1251553551454797830", "INTAKE-KCSPACES-X-ARCHIVE-2026", "The account announced a first round of support and named Latino Arts Foundation as a recipient.", "kcspaces-public-grant-announcement"],
  ["SRC-X-KCTOWNHALL-PIN-2018", "KC Town Hall project-identity post", "KC Town Hall", "institutional-social-post", "2018-07-02", "https://x.com/KCTownHall/status/1013893135695601665", "INTAKE-KCTOWNHALL-X-ARCHIVE-2026", "The pinned post presented KC Town Hall as a permanent neighborhood resource and cultural center.", "kctownhall-public-project-identity"],
  ["SRC-X-KCTOWNHALL-TIRES-JUNE-2019", "KC Town Hall June 2019 tire-removal report", "KC Town Hall", "institutional-social-post", "2019-06-02", "https://x.com/KCTownHall/status/1135246124883861504", "INTAKE-KCTOWNHALL-X-ARCHIVE-2026", "The account published a dated self-report of 74 tires removed and thanked collaborators.", "kctownhall-public-operations-report"],
  ["SRC-X-KCTOWNHALL-TIRES-JULY-2019", "KC Town Hall July 2019 tire-removal report", "KC Town Hall", "institutional-social-post", "2019-07-06", "https://x.com/KCTownHall/status/1147679988600254465", "INTAKE-KCTOWNHALL-X-ARCHIVE-2026", "The account published a dated self-report of 93 tires removed and a cumulative disposal-fee estimate.", "kctownhall-public-operations-report"]
] as const;

const articleSources: SourceRecord[] = [
  {
    id: "SRC-HELLGATE-NIGHTCLUB-RAIDS-2023", title: "Who Is Leading Raids on NYC Nightclubs?", organization: "Hell Gate", author: "Adlan Jackson", kind: "published-article", visibility: "public", preservationStatus: "live", publishedAt: "2023-06-09", accessedAt: "2026-07-14", canonicalUrl: "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/", preferredPublicUrl: "canonical",
    publicCitation: "Adlan Jackson, 'Who Is Leading Raids on NYC Nightclubs?,' Hell Gate, June 9, 2023.",
    publicNote: "The reporting records disagreement over how to classify and attribute renewed multi-agency nightlife inspections.",
    intakeIds: ["INTAKE-HELLGATE-NIGHTCLUB-RAIDS-2023"], supportsGenerally: ["renewed 2023 inspection reports", "institutional disagreement about classification and requester"], doesNotEstablish: ["that every inspection was a MARCH operation", "who requested each inspection", "Jamie's role", "campaign causation"]
  },
  {
    id: "SRC-HELLGATE-CURE-MARCH-2025", title: "Nightclub Raids Are on the Rise in 2025, Report Says", organization: "Hell Gate", author: "Adlan Jackson", kind: "published-article", visibility: "public", preservationStatus: "live", publishedAt: "2025-10-03", accessedAt: "2026-07-14", canonicalUrl: "https://hellgatenyc.com/cure-march-raids-2025-report/", preferredPublicUrl: "canonical",
    publicCitation: "Adlan Jackson, 'Nightclub Raids Are on the Rise in 2025, Report Says,' Hell Gate, October 3, 2025.",
    publicNote: "The reporting cites Office of Nightlife figures showing two multi-agency inspections in 2024 and nine in the first half of 2025, while questioning the relationship between CURE and MARCH.",
    intakeIds: ["INTAKE-HELLGATE-CURE-MARCH-2025"], supportsGenerally: ["reported 2024 and first-half 2025 inspection counts", "continuing CURE and MARCH classification questions"], doesNotEstablish: ["that CURE and MARCH are legally identical", "a complete 2025 annual total", "Jamie's role", "campaign causation"]
  }
];

export const socialArchiveSources: SourceRecord[] = [
  ...profileSources.map(([id, title, organization, canonicalUrl, intakeId, publicNote]) => ({
    id, title, organization, kind: "institutional-web-page" as const, visibility: "public" as const, preservationStatus: "live" as const, accessedAt: "2026-07-14", canonicalUrl, preferredPublicUrl: "canonical" as const,
    publicCitation: `${title}, reviewed July 14, 2026.`, publicNote, intakeIds: [intakeId], supportsGenerally: ["account identity", "profile description", "observed profile metadata"], doesNotEstablish: ["authorship of individual posts", "complete lifetime activity", "institutional adoption", "Jamie's sole operation of the account"]
  })),
  ...researchSources,
  ...postSources.map(([id, title, organization, kind, publishedAt, canonicalUrl, intakeId, publicNote]) => ({
    id, title, organization, kind, visibility: "public" as const, preservationStatus: "live" as const, publishedAt, accessedAt: "2026-07-14", canonicalUrl, preferredPublicUrl: "canonical" as const,
    publicCitation: `${title}, ${publishedAt}.`, publicNote, intakeIds: [intakeId], supportsGenerally: [publicNote], doesNotEstablish: ["authorship by Jamie", "sole credit", "institutional adoption", "causal impact beyond the described post"]
  })),
  ...articleSources
];

const researchReadings: SourceReading[] = [
  {
    id: "READ-X-REVIEW-CALLNYC-2026", sourceId: "SRC-X-REVIEW-CALLNYC-2026", status: "closely-read", readAt: "2026-07-14",
    propositions: [
      { id: "PROP-X-CALLNYC-PUBLIC-UNION-107", text: "The authenticated Posts and Replies union recovered 107 unique public statuses from a profile showing 110 posts and preserved three unresolved profile-count slots.", relationToJamie: "project-context", supportTags: ["callnyc-bounded-social-inventory"], confidence: "high", locator: "Posts and Replies route union" },
      { id: "PROP-X-CALLNYC-EIGHT-COUNCIL-MEMBERS", text: "At least eight then-serving NYC Council member accounts publicly replied to, reposted, quoted, or directly shared CallNYC between April 2016 and July 2017.", relationToJamie: "outcome-context", supportTags: ["callnyc-council-eight-recovered"], confidence: "high", locator: "Deduplicated account and office-date review" },
      { id: "PROP-X-CALLNYC-CARLINA-BOUNDARY", text: "Carlina Rivera also quoted CallNYC in May 2016 while serving on Council Member Rosie Mendez's team, before Rivera joined the Council.", relationToJamie: "outcome-context", supportTags: ["callnyc-later-member-boundary"], confidence: "high", locator: "Office-date classification" }
    ],
    limitations: ["The review is not a native X data export and cannot identify the content or cause of the three unresolved profile-count slots.", "X search does not expose a complete historical liker or follower ledger.", "Engagement does not establish adoption, endorsement, resident use, or institutional deployment."], researchTaskIds: []
  },
  {
    id: "READ-X-REVIEW-NYCARTC-2026", sourceId: "SRC-X-REVIEW-NYCARTC-2026", status: "closely-read", readAt: "2026-07-14",
    propositions: [
      { id: "PROP-X-NYCARTC-FOUR-CAMPAIGN-STREAMS", text: "Authenticated searches recovered 90 Let NYC Dance posts, 55 Talks Not Raids posts, 102 Save NYC Spaces posts, and 69 FairRentNYC posts authored by @NYCArtC.", relationToJamie: "project-context", supportTags: ["nycartc-four-social-campaign-streams"], confidence: "high", locator: "Four from-account campaign searches" },
      { id: "PROP-X-NYCARTC-FIVE-COUNCIL-MEMBERS", text: "At least five then-serving NYC Council member accounts were recovered directly addressing, replying to, or naming @NYCArtC between 2018 and 2021.", relationToJamie: "outcome-context", supportTags: ["nycartc-five-council-members-recovered"], confidence: "high", locator: "Deduplicated account and office-date review" },
      { id: "PROP-X-NYCARTC-OLYMPIA-89", text: "The indexed mention review recovered 89 posts from Olympia Kazi's own account mentioning @NYCArtC.", relationToJamie: "project-context", supportTags: ["nycartc-olympia-sustained-public-use"], confidence: "high", locator: "Author-frequency count across 374 recovered mentions" }
    ],
    limitations: ["Search-result counts are bounded recovered sets, not complete lifetime totals.", "Posts from Olympia Kazi's account demonstrate use of the coalition identity but do not establish authorship of posts from @NYCArtC.", "The review does not establish that Jamie authored every post or operated the account alone."], researchTaskIds: ["TASK-SOCIAL-ACCOUNT-ESTABLISHMENT-AND-AUTHORSHIP"]
  },
  {
    id: "READ-X-REVIEW-WOWLIST-2026", sourceId: "SRC-X-REVIEW-WOWLIST-2026", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-WOWLIST-RECOVERED-38", text: "The Posts and Replies route union recovered all 38 items represented by the observed profile count.", relationToJamie: "project-context", supportTags: ["wowlist-bounded-social-inventory"], confidence: "high", locator: "Profile and cross-tab timeline review" }],
    limitations: ["The recovered current profile population is not a native platform export or deletion history and does not establish adoption or user totals."], researchTaskIds: []
  },
  {
    id: "READ-X-REVIEW-KCSPACES-2026", sourceId: "SRC-X-REVIEW-KCSPACES-2026", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-KCSPACES-ELEVEN-ANNOUNCEMENTS", text: "The recovered timeline contains at least 11 distinct grantee or funding announcements between April and July 2020.", relationToJamie: "outcome-context", supportTags: ["kcspaces-eleven-grantee-announcements"], confidence: "high", locator: "Deduplicated named-recipient review" }],
    limitations: ["The timeline is not a grant ledger and does not establish Jamie's role in grant decisions, fundraising, or post authorship."], researchTaskIds: ["TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"]
  },
  {
    id: "READ-X-REVIEW-KCTOWNHALL-2026", sourceId: "SRC-X-REVIEW-KCTOWNHALL-2026", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-X-KCTOWNHALL-OPERATIONS-LOOP", text: "The recovered timeline repeatedly invited residents to submit tire locations and then published dated removal reports and collaborator acknowledgments.", relationToJamie: "project-context", supportTags: ["kctownhall-social-operations-loop"], confidence: "high", locator: "Bounded timeline sample" }],
    limitations: ["Only 121 of 183 profile posts were recovered in this pass.", "Tire and savings figures are account self-reports and require reconciliation before aggregation."], researchTaskIds: ["TASK-KCTOWNHALL-SOCIAL-METRIC-RECONCILIATION"]
  },
  {
    id: "READ-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026", sourceId: "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-KCSPACES-JAMIE-DIGITAL-INFRASTRUCTURE", text: "The reviewed project and code records document Jamie's behind-the-scenes implementation of the Ghost campaign site, campaign theme, fundraising widget, deployment, and related platform continuity.", relationToJamie: "direct-role", supportTags: ["kcspaces-jamie-digital-infrastructure"], confidence: "high", locator: "Public-safe synthesis of project and code evidence" }],
    limitations: ["The review is AI-assisted archival analysis, not eyewitness testimony.", "It does not identify Jamie as a public organizer, grant decision-maker, fundraiser owner, or author of every social post."], researchTaskIds: ["TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION"]
  }
];

export const socialArchiveReadings: SourceReading[] = [
  ...profileSources.map(([id, , , , , publicNote]) => ({
    id: `READ-${id.slice(4)}`, sourceId: id, status: "closely-read" as const, readAt: "2026-07-14",
    propositions: [{ id: `PROP-${id.slice(4)}-IDENTITY`, text: publicNote, relationToJamie: "project-context" as const, supportTags: [`${id.slice(4).toLowerCase()}-identity`], confidence: "high" as const, locator: "Public profile" }],
    limitations: ["Profile metadata is mutable and does not establish authorship of individual posts or Jamie's sole operation of the account."], researchTaskIds: []
  })),
  ...researchReadings,
  ...postSources.map(([id, , , , , , , publicNote, supportTag]) => ({
    id: `READ-${id.slice(4)}`, sourceId: id, status: "closely-read" as const, readAt: "2026-07-14",
    propositions: [{ id: `PROP-${id.slice(4)}`, text: publicNote, relationToJamie: id.includes("WOWLIST-ORIGIN") ? "collective-role" as const : "project-context" as const, supportTags: [supportTag], confidence: "high" as const, locator: "Public post" }],
    limitations: ["The post documents a public communication, not Jamie's authorship, sole credit, institutional adoption, or causal impact beyond the communication itself."], researchTaskIds: []
  })),
  {
    id: "READ-HELLGATE-NIGHTCLUB-RAIDS-2023", sourceId: "SRC-HELLGATE-NIGHTCLUB-RAIDS-2023", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-HELLGATE-2023-CLASSIFICATION-DISPUTE", text: "Hell Gate reported firsthand accounts resembling MARCH operations while city and state representatives disagreed about classification and requester.", relationToJamie: "outcome-context", supportTags: ["march-post-campaign-classification-ambiguity"], confidence: "moderate", locator: "Article summary and reported institutional disagreement" }],
    limitations: ["The source does not resolve who requested each inspection or establish that every inspection was a MARCH operation."], researchTaskIds: ["TASK-NYCARTC-MARCH-TRANSPARENCY-OUTCOME"]
  },
  {
    id: "READ-HELLGATE-CURE-MARCH-2025", sourceId: "SRC-HELLGATE-CURE-MARCH-2025", status: "closely-read", readAt: "2026-07-14",
    propositions: [{ id: "PROP-HELLGATE-2025-INSPECTION-COUNTS", text: "Hell Gate reported Office of Nightlife figures of two multi-agency inspections in 2024 and nine in the first half of 2025.", relationToJamie: "outcome-context", supportTags: ["march-cure-later-inspection-record"], confidence: "high", locator: "Reported Office of Nightlife figures" }],
    limitations: ["The article does not establish that CURE and MARCH are legally identical, provide a complete 2025 total, or establish Jamie's causal role."], researchTaskIds: ["TASK-NYCARTC-MARCH-TRANSPARENCY-OUTCOME"]
  }
];

export const socialArchiveClaims = [
  {
    id: "CLM-NYCARTC-SOCIAL-IDENTITY-CONTINUITY", project: "nyc-artist-coalition",
    internalClaim: "The shared @NYCArtC identity carried four distinct campaign streams across multiple years, and collaborators including Olympia Kazi repeatedly used the coalition identity from their own accounts.",
    status: "confirmed-with-boundary", maturity: "public-ready", intakeIds: ["INTAKE-NYCARTC-X-ARCHIVE-2026", "INTAKE-NYCARTC-FULL-POPULATION-X-CENSUS-2026"], requiredSupportTags: ["nycartc-four-social-campaign-streams", "nycartc-olympia-sustained-public-use", "x-profile-nycartc-2026-identity", "nycartc-organizer-role"],
    composition: { action: "Worked as a documented NYC Artist Coalition organizer within a durable shared public identity used across multiple campaigns.", intendedEnd: "Give artists, venues, collaborators, and public officials a stable way to recognize and enter related advocacy work.", usableResult: "One public account carried four named campaign streams across years, while collaborators repeatedly used the coalition identity from their own accounts.", audience: "Hiring readers evaluating Jamie's implementation, communications, and coalition-infrastructure practice.", collectiveCredit: "NYC Artist Coalition communications were collective; recovered posts do not identify Jamie as the author of each message, and Olympia Kazi's sustained use belongs to her own organizing voice.", causalBoundary: "The evidence supports Jamie's organizer role and the identity's continuity separately; account creation remains a research-stage memory, and social activity does not prove legislative causation." },
    projections: [],
    evidence: [
      { sourceId: "SRC-X-PROFILE-NYCARTC-2026", relationship: "direct-support", supports: ["four campaign identities on the public profile"], propositionIds: ["PROP-X-PROFILE-NYCARTC-2026-IDENTITY"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-REVIEW-NYCARTC-2026", relationship: "direct-support", supports: ["bounded campaign streams and sustained collaborator use"], propositionIds: ["PROP-X-NYCARTC-FOUR-CAMPAIGN-STREAMS", "PROP-X-NYCARTC-OLYMPIA-89"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-FULL-POPULATION-CENSUS-2026", relationship: "corroborating", supports: ["stronger recovered authored-status floors across all four campaign streams and Olympia Kazi's recovered amplification pattern"], propositionIds: ["PROP-X-NYCARTC-FOUR-CAMPAIGN-AUTHORED-FLOORS", "PROP-X-NYCARTC-RECOVERED-AMPLIFICATION-NETWORK"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-LETNYCDANCE-2017", relationship: "corroborating", supports: ["Let NYC Dance campaign use"], propositionIds: ["PROP-X-NYCARTC-LETNYCDANCE-2017"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-TALKSNOTRAIDS-2020", relationship: "corroborating", supports: ["Talks Not Raids campaign use"], propositionIds: ["PROP-X-NYCARTC-TALKSNOTRAIDS-2020"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-SAVENYCSPACES-2018", relationship: "corroborating", supports: ["Save NYC Spaces campaign use"], propositionIds: ["PROP-X-NYCARTC-SAVENYCSPACES-2018"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-FAIRRENT-2023", relationship: "corroborating", supports: ["FairRentNYC campaign use"], propositionIds: ["PROP-X-NYCARTC-FAIRRENT-2023"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-BEDFORD-DIY-SPACES-2017", relationship: "direct-support", supports: ["Jamie's documented NYC Artist Coalition organizer role"], propositionIds: ["PROP-BEDFORD-NYCARTC-ORGANIZER"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Authenticated search counts are recovered minimums and may change as X indexing changes.", "The full-population pass recovers 3,367 of 5,124 profile-counted slots and does not extrapolate from the recovered corpus to the 1,757 unresolved slots.", "The record distinguishes collaborators using the identity from authorship of posts on the coalition account."],
    antiClaims: ["Jamie authored every @NYCArtC post.", "Jamie operated the account alone.", "Social activity alone caused legislative or administrative outcomes."], researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Jamie Burkart memory intake", "Codex authenticated social-archive review"]
  },
  {
    id: "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT", project: "nyc-artist-coalition",
    internalClaim: "An authenticated review recovered at least five then-serving NYC Council member accounts directly addressing, replying to, or naming @NYCArtC between 2018 and 2021.",
    status: "confirmed-with-boundary", maturity: "public-ready", intakeIds: ["INTAKE-NYCARTC-X-ARCHIVE-2026"], requiredSupportTags: ["nycartc-five-council-members-recovered", "nycartc-council-member-engagement", "nycartc-organizer-role"],
    composition: { action: "Worked as a documented NYC Artist Coalition organizer while the coalition's shared account entered direct public exchange with Council members.", intendedEnd: "Move cultural-space concerns into public dialogue with policy makers while preserving a shared coalition voice.", usableResult: "The recovered record contains direct interactions from at least five then-serving Council member accounts.", audience: "Hiring readers assessing public-interest implementation, stakeholder communication, and mission traction.", collectiveCredit: "The interaction belongs to the coalition and its many participants; it is not individual credit for Jamie or proof he authored the initiating posts.", causalBoundary: "The evidence supports Jamie's organizer role and Council-account engagement separately; it does not prove he authored the exchanges, endorsement, adoption, constituent use, or policy causation." },
    projections: [],
    evidence: [
      { sourceId: "SRC-X-REVIEW-NYCARTC-2026", relationship: "direct-support", supports: ["minimum of five then-serving Council-member accounts"], propositionIds: ["PROP-X-NYCARTC-FIVE-COUNCIL-MEMBERS"], confidence: "high", renderCitation: false },
      ...["ESPINAL-2019", "LEVIN-2019", "LANDER-2021", "VAN-BRAMER-2020", "LEVINE-2020"].map((key) => ({ sourceId: `SRC-X-NYCARTC-${key}`, relationship: "corroborating" as const, supports: ["a recovered Council-member account interaction"], propositionIds: [`PROP-X-NYCARTC-${key}`], confidence: "high" as const, renderCitation: false })),
      { sourceId: "SRC-BEDFORD-DIY-SPACES-2017", relationship: "direct-support", supports: ["Jamie's documented NYC Artist Coalition organizer role"], propositionIds: ["PROP-BEDFORD-NYCARTC-ORGANIZER"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The count includes only recovered interactions classified against office dates.", "Former and future Council members were not counted as then-serving for posts outside their Council terms."],
    antiClaims: ["Council-member engagement proves coalition endorsement.", "Council-member engagement proves policy adoption or impact.", "The recovered count is exhaustive."], researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-SOCIAL-ACCOUNT-ESTABLISHMENT-SEED", project: "social-project-identity-practice",
    internalClaim: "Jamie reports establishing the project accounts and identity systems so collaborators could communicate publicly through durable project voices.",
    status: "researching", maturity: "researching", intakeIds: ["INTAKE-SOCIAL-ACCOUNT-ESTABLISHMENT-MEMORY-2026"], requiredSupportTags: [], projections: [], evidence: [],
    boundaries: ["Do not publish account-establishment, administration, or post-authorship claims until account-creation records and collaborator testimony are recovered."],
    antiClaims: ["Jamie authored every post.", "Jamie was the only account administrator.", "Collaborators' public work should be reassigned to Jamie."], researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Jamie Burkart memory intake", "Codex triage"]
  },
  {
    id: "CLM-WOWLIST-SOCIAL-ORIGIN-AND-SUPPORT", project: "wowlist",
    internalClaim: "The complete surviving @wowlist record connected Jamie and Richard to a project based on Sunday Dinner calendars and preserved six account replies explaining product use, onboarding, and local-calendar adaptations.",
    status: "confirmed-with-boundary", maturity: "public-ready", intakeIds: ["INTAKE-WOWLIST-X-ARCHIVE-2026", "INTAKE-WOWLIST-FULL-POPULATION-X-CENSUS-2026"], requiredSupportTags: ["wowlist-social-origin", "wowlist-six-public-support-replies", "wowlist-community-adaptation"],
    composition: { action: "Worked with Richard on a WOW List project rooted in Sunday Dinner calendars and community event sharing.", intendedEnd: "Turn a community calendar practice into a reusable way for people to find, contribute, and organize events.", usableResult: "The complete surviving account record preserves six direct support and onboarding replies covering feed scope, profile navigation, multi-list event submission, joining NYCDIY, and the relationship among NYCDIY, WOW List, and Sunday Dinner.", audience: "Hiring readers evaluating product operations, community onboarding, and implementation continuity.", collectiveCredit: "The origin post names Richard and Jamie together, and the wider Sunday Dinner and WOW List practices were collective; the shared account does not identify the teammate who authored each reply.", causalBoundary: "The evidence supports Jamie's collective project role and the account's support behavior separately, not individual post authorship, total support workload, user scale, adoption, satisfaction, or sole product authorship." },
    projections: [], evidence: [
      { sourceId: "SRC-X-WOWLIST-ORIGIN-2014", relationship: "direct-support", supports: ["Jamie and Richard's project connection to Sunday Dinner calendars"], propositionIds: ["PROP-X-WOWLIST-ORIGIN-2014"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-WOWLIST-FULL-POPULATION-CENSUS-2026", relationship: "direct-support", supports: ["the complete six-reply public support and onboarding pattern"], propositionIds: ["PROP-X-WOWLIST-SIX-PUBLIC-SUPPORT-REPLIES"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-WOWLIST-SUPPORT-2015", relationship: "direct-support", supports: ["public product-support workflow"], propositionIds: ["PROP-X-WOWLIST-SUPPORT-2015"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-WOWLIST-NYCDIY-2016", relationship: "corroborating", supports: ["community-calendar adaptation"], propositionIds: ["PROP-X-WOWLIST-NYCDIY-2016"], confidence: "high", renderCitation: false }
    ], boundaries: ["The account record does not identify the author of every post or quantify adoption, satisfaction, audience, or the complete support workload."], antiClaims: ["Jamie alone created WOW List.", "Jamie personally wrote all six support replies.", "The social account proves user or city scale."], researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION", project: "kc-spaces-fund",
    internalClaim: "The @KCSpacesFund timeline publicly documented donation and application pathways, rolling emergency-grant operations, and at least 11 distinct grantee or funding announcements in 2020.",
    status: "confirmed-with-boundary", maturity: "public-ready", intakeIds: ["INTAKE-KCSPACES-X-ARCHIVE-2026", "INTAKE-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026"], requiredSupportTags: ["kcspaces-public-fund-operations", "kcspaces-public-grant-announcement", "kcspaces-eleven-grantee-announcements", "kcspaces-jamie-digital-infrastructure"],
    composition: { action: "Supported a public digital surface through which the collective explained applications, donations, rolling grants, and funding announcements.", intendedEnd: "Make emergency relief for grassroots arts and culture spaces understandable and actionable online.", usableResult: "The recovered account timeline documents launch and rolling-grant workflows plus at least 11 named funding announcements.", audience: "Hiring readers assessing the project context for Jamie's behind-the-scenes digital infrastructure work.", collectiveCredit: "Public organizer and grant-making credit remains with the campaign's named organizers and collective; the social record does not assign post authorship or grant decisions to Jamie.", causalBoundary: "The account documents public operations and announcements, not a complete grant ledger or proof that Jamie raised or allocated funds." },
    projections: [], evidence: [
      { sourceId: "SRC-X-REVIEW-KCSPACES-2026", relationship: "direct-support", supports: ["at least 11 grantee or funding announcements"], propositionIds: ["PROP-X-KCSPACES-ELEVEN-ANNOUNCEMENTS"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KCSPACES-LAUNCH-2020", relationship: "direct-support", supports: ["public donation and application pathways"], propositionIds: ["PROP-X-KCSPACES-LAUNCH-2020"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KCSPACES-ROLLING-GRANTS-2020", relationship: "direct-support", supports: ["rolling emergency-grant operations"], propositionIds: ["PROP-X-KCSPACES-ROLLING-GRANTS-2020"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KCSPACES-FIRST-ROUND-2020", relationship: "corroborating", supports: ["a named first-round funding announcement"], propositionIds: ["PROP-X-KCSPACES-FIRST-ROUND-2020"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026", relationship: "private-support", supports: ["Jamie's behind-the-scenes digital-infrastructure role"], propositionIds: ["PROP-KCSPACES-JAMIE-DIGITAL-INFRASTRUCTURE"], confidence: "high", renderCitation: false }
    ], boundaries: ["The account is a public project record, not a complete grant ledger.", "Jamie's separate digital-infrastructure role must retain the named-organizer boundary."], antiClaims: ["Jamie organized the fund.", "Jamie made grant decisions.", "Jamie authored every post.", "The account alone proves fundraising causation."], researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review"]
  },
  {
    id: "CLM-KCTOWNHALL-SOCIAL-OPERATIONS-LOOP", project: "kc-town-hall",
    internalClaim: "Jamie worked with Julia Fredenburg and Oak Park Neighborhood Association on a recurring free tire-pickup workflow that gave residents public intake routes, a schedule, and dated operations reporting.",
    status: "confirmed-with-boundary", maturity: "public-ready", intakeIds: ["INTAKE-KCTOWNHALL-X-ARCHIVE-2026", "INTAKE-KCTOWNHALL-FULL-POPULATION-X-CENSUS-2026"], requiredSupportTags: ["kctownhall-social-operations-loop", "kctownhall-public-operations-report", "kctownhall-jamie-julia-public-workflow", "kctownhall-resident-intake", "kctownhall-recurring-service-schedule", "kctownhall-tire-workflow-census"],
    composition: { action: "Worked with Julia Fredenburg and Oak Park Neighborhood Association to make a recurring free tire-pickup workflow operable and visible.", intendedEnd: "Give residents practical ways to report dumped tires and follow recurring neighborhood service.", usableResult: "The project exposed form and phone or text intake, a recurring pickup schedule, calls for locations, and dated progress reports with collaborator credit.", audience: "Hiring readers evaluating implementation, resident-facing operations, and durable public-service workflows.", collectiveCredit: "The archived project pages attribute the work to Julia and Jamie and name Oak Park Neighborhood Association; the wider pickup and disposal work involved residents and service partners.", causalBoundary: "The evidence supports Jamie's collective role and the public workflow, not sole authorship, authorship of every account post, independently audited aggregate tire or savings totals, or causal neighborhood impact." },
    projections: [], evidence: [
      { sourceId: "SRC-X-REVIEW-KCTOWNHALL-2026", relationship: "direct-support", supports: ["public intake and reporting pattern"], propositionIds: ["PROP-X-KCTOWNHALL-OPERATIONS-LOOP"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026", relationship: "direct-support", supports: ["100-record tire-intake and operations pattern in the complete surviving profile population"], propositionIds: ["PROP-X-KCTOWNHALL-TIRE-WORKFLOW-100"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WAYBACK-KCTOWNHALL-HOME-2019", relationship: "direct-support", supports: ["Jamie and Julia's collective role and the Oak Park Neighborhood Association collaboration"], propositionIds: ["PROP-WAYBACK-KCTOWNHALL-JAMIE-JULIA-WORKFLOW"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WAYBACK-KCTOWNHALL-TIRES-2021", relationship: "direct-support", supports: ["resident intake routes and recurring pickup schedule"], propositionIds: ["PROP-WAYBACK-KCTOWNHALL-RESIDENT-INTAKE", "PROP-WAYBACK-KCTOWNHALL-RECURRING-SCHEDULE"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KCTOWNHALL-TIRES-JUNE-2019", relationship: "corroborating", supports: ["a dated removal report with collaborator acknowledgment"], propositionIds: ["PROP-X-KCTOWNHALL-TIRES-JUNE-2019"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KCTOWNHALL-TIRES-JULY-2019", relationship: "corroborating", supports: ["a second dated removal report"], propositionIds: ["PROP-X-KCTOWNHALL-TIRES-JULY-2019"], confidence: "high", renderCitation: false }
    ], boundaries: ["The route union closes the surviving 183-item profile control but is not a native export or deletion history.", "Published tire and savings totals remain attributed project self-reports pending reconciliation.", "The project's later transition is represented without private family context."], antiClaims: ["The account provides audited aggregate impact figures.", "Jamie authored every post or operated the workflow alone.", "Social reporting alone proves causal neighborhood outcomes."], researchInquiryIds: [], reviewedAt: "2026-07-14", reviewedBy: ["Codex authenticated social-archive review", "Codex Chad-lens composition review"]
  }
] satisfies ClaimRecord[];

export const socialArchiveResearchTasks = [
  {
    id: "TASK-SOCIAL-ACCOUNT-ESTABLISHMENT-AND-AUTHORSHIP", project: "social-project-identity-practice",
    question: "What account-creation, design, administration, and collaborator records establish Jamie's role in creating the project identities without assigning him teammates' posts?",
    status: "in-progress", priority: "high", openedAt: "2026-07-14", intakeIds: ["INTAKE-SOCIAL-ACCOUNT-ESTABLISHMENT-MEMORY-2026"], sourceIds: ["SRC-X-REVIEW-NYCARTC-2026"], claimIds: ["CLM-SOCIAL-ACCOUNT-ESTABLISHMENT-SEED"],
    nextActions: ["Recover account-creation dates, early design files, administrator records, and launch messages without exposing credentials.", "Request short proof notes from collaborators including Olympia Kazi about account establishment, shared stewardship, and how they used the identity.", "Separate account creation, visual and editorial system design, administration, campaign strategy, and individual post authorship."]
  },
  {
    id: "TASK-KCSPACES-SOCIAL-ROLE-INTEGRATION", project: "kc-spaces-fund",
    question: "How should the public account record be joined to the existing behind-the-scenes digital-infrastructure proof without shifting public organizer or grant-making credit?",
    status: "open", priority: "medium", openedAt: "2026-07-14", intakeIds: ["INTAKE-KCSPACES-X-ARCHIVE-2026", "INTAKE-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026"], sourceIds: ["SRC-X-REVIEW-KCSPACES-2026", "SRC-X-KCSPACES-LAUNCH-2020", "SRC-X-KCSPACES-ROLLING-GRANTS-2020", "SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVAL-REVIEW-2026"], claimIds: ["CLM-KCSPACES-PUBLIC-GRANT-DOCUMENTATION"],
    nextActions: ["Map public social calls to the campaign-site and widget implementation chronology.", "Seek collaborator confirmation of Jamie's account and web-platform role.", "Retain named-organizer and grant-decision boundaries in every public composition."]
  },
  {
    id: "TASK-KCTOWNHALL-SOCIAL-METRIC-RECONCILIATION", project: "kc-town-hall",
    question: "Which dated tire-removal and disposal-fee figures can be reconciled, and what evidence identifies Jamie's role in the public intake and reporting workflow before it is composed as his accomplishment?",
    status: "in-progress", priority: "medium", openedAt: "2026-07-14", intakeIds: ["INTAKE-KCTOWNHALL-X-ARCHIVE-2026", "INTAKE-KCTOWNHALL-FULL-POPULATION-X-CENSUS-2026"], sourceIds: ["SRC-X-REVIEW-KCTOWNHALL-2026", "SRC-X-KCTOWNHALL-FULL-POPULATION-CENSUS-2026", "SRC-WAYBACK-KCTOWNHALL-HOME-2019", "SRC-WAYBACK-KCTOWNHALL-TIRES-2021", "SRC-X-KCTOWNHALL-TIRES-JUNE-2019", "SRC-X-KCTOWNHALL-TIRES-JULY-2019", "SRC-X-KCTOWNHALL-BTG-DROPOFF-2019"], claimIds: ["CLM-KCTOWNHALL-SOCIAL-OPERATIONS-LOOP"],
    nextActions: ["Compare the complete post-level figure sequence with event, invoice, partner, and disposal records.", "Seek collaborator confirmation of operational roles without exposing private family context.", "Keep unreconciled aggregate totals attributed as project self-reports even though the workflow and Jamie's collective role are now public-ready."]
  }
] satisfies ResearchTask[];

export const socialArchiveDecisions = [
  ...socialArchiveClaims
    .filter((claim) => claim.maturity === "public-ready")
    .map((claim) => ({
      id: `DEC-DEFER-${claim.id.slice(4)}-SOCIAL-2026`, claimId: claim.id, surface: "future-portfolio-composition", decision: "defer" as const,
      rationale: "The claim is public-safe and source-backed, but this archival-production pass does not automatically alter the live portfolio argument.", decidedAt: "2026-07-14", reviewedBy: ["Jamie Burkart", "Codex authenticated social-archive review"]
    })),
  {
    id: "DEC-DEFER-CALLNYC-COUNCIL-ENGAGEMENT-SOCIAL-2026",
    claimId: "CLM-CALLNYC-COUNCIL-ENGAGEMENT-SEED",
    surface: "future-portfolio-composition",
    decision: "defer",
    rationale: "The recovered minimum is public-safe and source-backed, but the live CallNYC page should change only after a separate compositional review.",
    decidedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated social-archive review"]
  }
] satisfies ProjectionDecision[];
