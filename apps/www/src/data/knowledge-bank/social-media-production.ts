import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const reviewedAt = "2026-07-14";

const callNycCouncilClaimId = "CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT";
const nycacCouncilClaimId = "CLM-NYCAC-COUNCIL-SOCIAL-ENGAGEMENT";
const nycacIdentityClaimId = "CLM-NYCAC-SHARED-IDENTITY-STEWARDSHIP";
const wowListSocialClaimId = "CLM-WOWLIST-SOCIAL-PRODUCT-SURFACE";

export const projectSocialAccounts = [
  {
    projectIds: ["callnyc"],
    campaigns: ["CallNYC"],
    currentHandle: "@CallNYCApp",
    canonicalUrl: "https://x.com/CallNYCApp",
    joined: "March 2016",
    observedPostCount: 110,
    observedFollowerCount: 69,
    observedFollowingCount: 194,
    observedAt: reviewedAt,
    status: "historical-project-account",
  },
  {
    projectIds: ["fair-rent-nyc"],
    campaigns: [
      "NYC Artist Coalition",
      "SaveNYCSpaces",
      "LetNYCDance",
      "TalksNotRaids",
      "FairRentNYC",
    ],
    currentHandle: "@NYCArtC",
    canonicalUrl: "https://x.com/NYCArtC",
    joined: "January 2017",
    observedPostCount: 5124,
    observedFollowerCount: 1339,
    observedFollowingCount: 569,
    observedAt: reviewedAt,
    status: "active-shared-coalition-account",
  },
  {
    projectIds: ["wowlist"],
    campaigns: ["WOW List"],
    currentHandle: "@wowlist",
    canonicalUrl: "https://x.com/wowlist",
    joined: "February 2014",
    observedPostCount: 38,
    observedFollowerCount: 47,
    observedFollowingCount: 57,
    observedAt: reviewedAt,
    status: "historical-project-account",
    historicalHandleNote:
      "Project templates and a 2015 external mention use @WOWListNYC; this pass did not establish the exact account-rename history.",
  },
] as const;

export const socialMediaReviewSummary = {
  authenticatedSessionConfirmed: true,
  accountCount: projectSocialAccounts.length,
  callNycCouncilMemberAccountCount: 6,
  nycacCouncilMemberAuthorCount2017To2020: 6,
  nycacMissionRelevantCouncilMemberAccountCount2017To2020: 4,
  nycacHistoricalMentionRecordCount2017To2020: 358,
  wowListProfilePostCount: 38,
  wowListRecoveredTimelineRecordCount: 37,
  wowListRecoveredOriginalPostCount: 21,
  wowListRecoveredRepostCount: 16,
  observedAt: reviewedAt,
} as const;

type SocialPostDescriptor = {
  sourceId: string;
  observationId: string;
  project: string;
  title: string;
  author: string;
  organization?: string;
  kind: SourceRecord["kind"];
  publishedAt: string;
  canonicalUrl: string;
  publicCitation: string;
  publicNote?: string;
  supportsGenerally: string[];
  doesNotEstablish: string[];
  statement: string;
  locator: string;
  limitations: string[];
  supportsClaimIds: string[];
};

const socialPostDescriptors: SocialPostDescriptor[] = [
  {
    sourceId: "SRC-CALLNYC-CHIN-ENGAGEMENT-2017-07-11",
    observationId: "OBS-CALLNYC-CHIN-ACKNOWLEDGMENT",
    project: "callnyc",
    title: "Margaret Chin response to CallNYC recognition",
    author: "Margaret Chin",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2017-07-11",
    canonicalUrl: "https://x.com/CM_MargaretChin/status/884863588317442049",
    publicCitation:
      "Council Member Margaret Chin thanked CallNYC for recognizing her office's work and said it was ready to keep improving the numbers.",
    supportsGenerally: ["Council Member response", "recognition acknowledgment"],
    doesNotEstablish: ["endorsement of every CallNYC claim", "causal impact"],
    statement:
      "Margaret Chin publicly thanked CallNYC for recognizing her office's work and connected the recognition to continued constituent-service effort.",
    locator: "Post text and timestamp",
    limitations: ["The post does not establish endorsement of the full project."],
    supportsClaimIds: [callNycCouncilClaimId],
  },
  {
    sourceId: "SRC-CALLNYC-WILLS-ENGAGEMENT-2016-05-17",
    observationId: "OBS-CALLNYC-WILLS-REPLY",
    project: "callnyc",
    title: "Ruben Wills reply in a CallNYC thread",
    author: "Ruben Wills",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2016-05-17",
    canonicalUrl: "https://x.com/CM_RubenWills/status/732717792097603584",
    publicCitation:
      "Council Member Ruben Wills replied to CallNYC and copied the Queens Chronicle into the public thread.",
    supportsGenerally: ["Council Member reply", "public thread participation"],
    doesNotEstablish: ["substantive endorsement", "offline follow-through"],
    statement:
      "Ruben Wills publicly replied in a CallNYC thread and directed the exchange to a local newspaper account.",
    locator: "Reply context, post text, and timestamp",
    limitations: ["The short reply does not establish substantive endorsement."],
    supportsClaimIds: [callNycCouncilClaimId],
  },
  {
    sourceId: "SRC-CALLNYC-MATTEO-FIGURES-2018-01-23",
    observationId: "OBS-CALLNYC-MATTEO-QUOTED-FIGURES",
    project: "callnyc",
    title: "Steven Matteo post quoting CallNYC district figures",
    author: "Steven Matteo",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2018-01-23",
    canonicalUrl: "https://x.com/StevenMatteo/status/955773817497976832",
    publicCitation:
      "Council Member Steven Matteo quoted CallNYC's 2017 district figures in a public constituent-service post.",
    publicNote:
      "The post quotes 3,349 logged complaints and a comparison across 51 Council districts; it does not independently validate CallNYC's method.",
    supportsGenerally: ["independent use of CallNYC figures", "district comparison"],
    doesNotEstablish: ["independent methodological validation", "causal impact"],
    statement:
      "Steven Matteo publicly quoted CallNYC's district-level constituent-service figures in describing his office's work.",
    locator: "Post text, quoted post, and timestamp",
    limitations: ["The post repeats CallNYC figures rather than auditing them."],
    supportsClaimIds: [callNycCouncilClaimId],
  },
  {
    sourceId: "SRC-CALLNYC-KOO-ENGAGEMENT-2016-04-27",
    observationId: "OBS-CALLNYC-KOO-RESHARE",
    project: "callnyc",
    title: "Peter Koo reshare of CallNYC recognition",
    author: "Peter Koo",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2016-04-27",
    canonicalUrl: "https://x.com/CMPeterKoo/status/725422741160079360",
    publicCitation:
      "Council Member Peter Koo manually reshared a CallNYC post recognizing his office's constituent-service activity.",
    supportsGenerally: ["Council Member reshare", "recognition acknowledgment"],
    doesNotEstablish: ["project endorsement", "causal impact"],
    statement:
      "Peter Koo publicly reshared CallNYC recognition of his office's constituent-service activity.",
    locator: "Post text and timestamp",
    limitations: ["A reshare is not a blanket endorsement of the project."],
    supportsClaimIds: [callNycCouncilClaimId],
  },
  {
    sourceId: "SRC-CALLNYC-EUGENE-ENGAGEMENT-2016-10-04",
    observationId: "OBS-CALLNYC-EUGENE-QUOTE",
    project: "callnyc",
    title: "Mathieu Eugene response to CallNYC housing recognition",
    author: "Mathieu Eugene",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2016-10-04",
    canonicalUrl: "https://x.com/CMMathieuEugene/status/783305320508514304",
    publicCitation:
      "Council Member Mathieu Eugene quote-posted CallNYC recognition of his office's housing-related constituent work.",
    supportsGenerally: ["Council Member quote-post", "housing recognition"],
    doesNotEstablish: ["project endorsement", "causal impact"],
    statement:
      "Mathieu Eugene quote-posted CallNYC recognition and connected it to equal housing opportunities for constituents.",
    locator: "Post text, quoted post, and timestamp",
    limitations: ["The post does not validate every CallNYC category or figure."],
    supportsClaimIds: [callNycCouncilClaimId],
  },
  {
    sourceId: "SRC-CALLNYC-ROSENTHAL-SHARE-2016-09-27",
    observationId: "OBS-CALLNYC-ROSENTHAL-INDEPENDENT-SHARE",
    project: "callnyc",
    title: "Helen Rosenthal independent share of CallNYC",
    author: "Helen Rosenthal",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2016-09-27",
    canonicalUrl: "https://x.com/HelenRosenthal/status/780797474277511170",
    publicCitation:
      "Council Member Helen Rosenthal independently shared CallNYC as a way to find a Council Member and seek help from Council offices.",
    supportsGenerally: ["independent domain share", "constituent-service pathway"],
    doesNotEstablish: ["official Council adoption", "current guidance accuracy"],
    statement:
      "Helen Rosenthal independently shared CallNYC as a resident pathway to Council offices.",
    locator: "Post text, domain link, and timestamp",
    limitations: ["The historical share does not make CallNYC a current or official City service."],
    supportsClaimIds: [callNycCouncilClaimId],
  },
  {
    sourceId: "SRC-NYCAC-ESPINAL-CABARET-2017-10-30",
    observationId: "OBS-NYCAC-ESPINAL-CABARET-CREDIT",
    project: "fair-rent-nyc",
    title: "Rafael Espinal post naming NYC Artist Coalition in Cabaret Law repeal",
    author: "Rafael Espinal",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2017-10-30",
    canonicalUrl: "https://x.com/RLEspinal/status/924972124628049920",
    publicCitation:
      "Council Member Rafael Espinal named NYC Artist Coalition among the groups in the effort to repeal the Cabaret Law.",
    supportsGenerally: ["coalition credit", "Cabaret Law repeal campaign"],
    doesNotEstablish: ["individual authorship", "sole causality"],
    statement:
      "Rafael Espinal publicly credited NYC Artist Coalition within the collective Cabaret Law repeal effort.",
    locator: "Post text, linked article, and timestamp",
    limitations: ["The post credits collective work and does not assign individual causality."],
    supportsClaimIds: [nycacCouncilClaimId],
  },
  {
    sourceId: "SRC-NYCAC-ESPINAL-TOWN-HALL-2018-03-25",
    observationId: "OBS-NYCAC-ESPINAL-TOWN-HALL-PARTNERSHIP",
    project: "fair-rent-nyc",
    title: "Rafael Espinal invitation to NYC Artist Coalition nightlife town hall",
    author: "Rafael Espinal",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2018-03-25",
    canonicalUrl: "https://x.com/RLEspinal/status/978005203311001600",
    publicCitation:
      "Council Member Rafael Espinal described a large town hall with NYC Artist Coalition and invited the public to attend.",
    supportsGenerally: ["public convening", "Office of Nightlife agenda-setting"],
    doesNotEstablish: ["sole event production", "all attendance outcomes"],
    statement:
      "Rafael Espinal publicly described NYC Artist Coalition as a partner in a town hall connected to the new Office of Nightlife.",
    locator: "Reply text and timestamp",
    limitations: ["The post does not enumerate every organizer or production role."],
    supportsClaimIds: [nycacCouncilClaimId],
  },
  {
    sourceId: "SRC-NYCAC-LEVIN-HEARING-2019-02-06",
    observationId: "OBS-NYCAC-LEVIN-TALKSNOTRAIDS-HEARING",
    project: "fair-rent-nyc",
    title: "Stephen Levin promotion of Talks Not Raids hearing",
    author: "Stephen Levin",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2019-02-06",
    canonicalUrl: "https://x.com/StephenLevin33/status/1093220593317629952",
    publicCitation:
      "Council Member Stephen Levin quote-posted NYC Artist Coalition's Talks Not Raids call to attend a City Council hearing.",
    supportsGenerally: ["Council hearing mobilization", "Talks Not Raids"],
    doesNotEstablish: ["hearing attendance caused by the post", "sole campaign ownership"],
    statement:
      "Stephen Levin amplified NYC Artist Coalition's public call for a Council hearing on MARCH raids and accountability.",
    locator: "Post text, quoted coalition post, and timestamp",
    limitations: ["The post does not measure resulting attendance or policy causality."],
    supportsClaimIds: [nycacCouncilClaimId],
  },
  {
    sourceId: "SRC-NYCAC-LEVIN-TESTIMONY-2019-02-11",
    observationId: "OBS-NYCAC-LEVIN-TESTIMONY-THANKS",
    project: "fair-rent-nyc",
    title: "Stephen Levin acknowledgment of Talks Not Raids testimony",
    author: "Stephen Levin",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2019-02-11",
    canonicalUrl: "https://x.com/StephenLevin33/status/1095020293112979457",
    publicCitation:
      "Council Member Stephen Levin thanked NYC Artist Coalition and venue operators for testimony that brought attention to MARCH raids.",
    supportsGenerally: ["public testimony", "Council acknowledgment"],
    doesNotEstablish: ["individual authorship of coalition testimony", "sole causality"],
    statement:
      "Stephen Levin publicly thanked NYC Artist Coalition and venues for testimony that made MARCH raid experiences visible.",
    locator: "Post text and timestamp",
    limitations: ["The post credits a group of witnesses rather than assigning individual roles."],
    supportsClaimIds: [nycacCouncilClaimId],
  },
  {
    sourceId: "SRC-NYCAC-RIVERA-COSPONSOR-2018-10-20",
    observationId: "OBS-NYCAC-RIVERA-COSPONSOR-REPLY",
    project: "fair-rent-nyc",
    title: "Carlina Rivera co-sponsor response in an NYC Artist Coalition thread",
    author: "Carlina Rivera",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2018-10-20",
    canonicalUrl: "https://x.com/CarlinaRivera/status/1053849469853274112",
    publicCitation:
      "Council Member Carlina Rivera replied in an NYC Artist Coalition thread that she was already a co-sponsor and supported the measure under discussion.",
    supportsGenerally: ["Council Member reply", "co-sponsorship affirmation"],
    doesNotEstablish: ["the hidden thread's complete context", "coalition causality"],
    statement:
      "Carlina Rivera publicly replied in an NYC Artist Coalition thread by affirming co-sponsorship and support.",
    locator: "Reply text, participant context, and timestamp",
    limitations: ["The rendered result does not preserve the full preceding thread context."],
    supportsClaimIds: [nycacCouncilClaimId],
  },
  {
    sourceId: "SRC-NYCAC-VANBRAMER-ARTS-2020-10-26",
    observationId: "OBS-NYCAC-VANBRAMER-ARTS-ADVOCACY",
    project: "fair-rent-nyc",
    title: "Jimmy Van Bramer arts-and-culture post naming NYC Artist Coalition",
    author: "Jimmy Van Bramer",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2020-10-26",
    canonicalUrl: "https://x.com/JimmyVanBramer/status/1320792543773282304",
    publicCitation:
      "Council Member Jimmy Van Bramer named NYC Artist Coalition in a public call to prioritize performing artists, arts, and culture.",
    supportsGenerally: ["arts-and-culture advocacy", "coalition audience"],
    doesNotEstablish: ["formal partnership", "specific policy causality"],
    statement:
      "Jimmy Van Bramer included NYC Artist Coalition in a public appeal to prioritize performing artists and culture.",
    locator: "Post text and timestamp",
    limitations: ["The post does not define a formal partnership or specific resulting action."],
    supportsClaimIds: [nycacCouncilClaimId],
  },
  {
    sourceId: "SRC-NYCAC-LEVINE-INCIDENTAL-2020-03-20",
    observationId: "OBS-NYCAC-LEVINE-CONTEXT-LIMITED-REPLY",
    project: "fair-rent-nyc",
    title: "Mark Levine context-limited reply to NYC Artist Coalition",
    author: "Mark Levine",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2020-03-20",
    canonicalUrl: "https://x.com/MarkLevineNYC/status/1241027587947876352",
    publicCitation:
      "Council Member Mark Levine posted a short logistical reply to NYC Artist Coalition whose preceding context is not preserved in the rendered result.",
    supportsGenerally: ["Council Member account author appearance"],
    doesNotEstablish: [
      "mission-relevant engagement",
      "substantive support",
      "complete thread context",
    ],
    statement:
      "Mark Levine appeared as the author of a short reply to NYC Artist Coalition, but the visible text is too context-limited to classify as mission-relevant traction.",
    locator: "Reply text, participant context, and timestamp",
    limitations: [
      "The preceding thread context is not preserved in the rendered result.",
    ],
    supportsClaimIds: [],
  },
  {
    sourceId: "SRC-NYCAC-BRANNAN-INCIDENTAL-2019-08-30",
    observationId: "OBS-NYCAC-BRANNAN-INCIDENTAL-REPLY",
    project: "fair-rent-nyc",
    title: "Justin Brannan incidental reply in an NYC Artist Coalition thread",
    author: "Justin Brannan",
    organization: "New York City Council",
    kind: "government-social-post",
    publishedAt: "2019-08-30",
    canonicalUrl: "https://x.com/JustinBrannan/status/1167536258438115333",
    publicCitation:
      "Council Member Justin Brannan posted an incidental photo reaction in a thread including NYC Artist Coalition and the MTA.",
    supportsGenerally: ["Council Member account author appearance"],
    doesNotEstablish: [
      "mission-relevant engagement",
      "coalition support",
      "policy traction",
    ],
    statement:
      "Justin Brannan appeared as the author of an incidental reply in a thread including NYC Artist Coalition; it was excluded from the mission-relevant count.",
    locator: "Reply text, participant context, and timestamp",
    limitations: [
      "The post is incidental to the coalition's documented missions.",
    ],
    supportsClaimIds: [],
  },
  {
    sourceId: "SRC-WOWLIST-ORIGIN-2014-02-12",
    observationId: "OBS-WOWLIST-SUNDAY-DINNER-ORIGIN",
    project: "wowlist",
    title: "WOW List post connecting the project to Sunday Dinner calendars",
    author: "WOW List",
    kind: "institutional-social-post",
    publishedAt: "2014-02-12",
    canonicalUrl: "https://x.com/wowlist/status/433671630837919744",
    publicCitation:
      "WOW List's first surviving original post describes the project as based on calendars made at Sunday Dinner and names Richard and Jamie.",
    supportsGenerally: ["Sunday Dinner project origin", "Jamie and Richard attribution"],
    doesNotEstablish: ["complete founder roster", "sole authorship"],
    statement:
      "The account's first surviving original post connected WOW List to Sunday Dinner calendars and named Richard and Jamie as working on the project.",
    locator: "Post text and timestamp",
    limitations: ["The post does not establish the complete team or every prior activity."],
    supportsClaimIds: [wowListSocialClaimId],
  },
  {
    sourceId: "SRC-WOWLIST-TUTORIAL-2015-08-14",
    observationId: "OBS-WOWLIST-USER-TUTORIAL",
    project: "wowlist",
    title: "WOW List share of a user-created product tutorial",
    author: "WOW List",
    kind: "institutional-social-post",
    publishedAt: "2015-08-14",
    canonicalUrl: "https://x.com/wowlist/status/632168285291835392",
    publicCitation:
      "WOW List thanked a community member for creating a tutorial and linked viewers to the join flow.",
    supportsGenerally: ["community-created onboarding", "join flow"],
    doesNotEstablish: ["tutorial completion rates", "platform-wide adoption"],
    statement:
      "WOW List used its account to amplify a community-created tutorial and direct people into the product's join flow.",
    locator: "Post text, tutorial link, join link, and timestamp",
    limitations: ["The post does not provide tutorial-view or conversion metrics."],
    supportsClaimIds: [wowListSocialClaimId],
  },
  {
    sourceId: "SRC-WOWLIST-NYCDIY-2016-09-01",
    observationId: "OBS-WOWLIST-NYCDIY-DISTRIBUTION",
    project: "wowlist",
    title: "WOW List explanation of the NYC DIY calendar workflow",
    author: "WOW List",
    kind: "institutional-social-post",
    publishedAt: "2016-09-01",
    canonicalUrl: "https://x.com/wowlist/status/771457416298921985",
    publicCitation:
      "WOW List explained that NYCdiy ran on the platform, described it as a Sunday Dinner community-calendar project, and linked an event record.",
    supportsGenerally: ["community-calendar distribution", "Sunday Dinner lineage"],
    doesNotEstablish: ["complete NYC DIY adoption", "exclusive infrastructure"],
    statement:
      "The account explained how NYCdiy used WOW List as a community calendar and connected the workflow to Sunday Dinner.",
    locator: "Reply text, event link, and timestamp",
    limitations: ["The post does not establish exclusive use or complete scene adoption."],
    supportsClaimIds: [wowListSocialClaimId],
  },
  {
    sourceId: "SRC-WOWLIST-PRODUCT-SUPPORT-2015-04-24",
    observationId: "OBS-WOWLIST-INLINE-PRODUCT-SUPPORT",
    project: "wowlist",
    title: "WOW List inline product-support reply",
    author: "WOW List",
    kind: "institutional-social-post",
    publishedAt: "2015-04-24",
    canonicalUrl: "https://x.com/wowlist/status/591668857670148096",
    publicCitation:
      "WOW List answered a user with step-by-step instructions for adding an event to one or more lists.",
    supportsGenerally: ["public product support", "event-publishing workflow"],
    doesNotEstablish: ["support-volume scale", "resolution of every user issue"],
    statement:
      "WOW List used the account as an inline product-support surface for adding and distributing events.",
    locator: "Reply text and timestamp",
    limitations: ["A single reply does not establish support volume or service levels."],
    supportsClaimIds: [wowListSocialClaimId],
  },
  {
    sourceId: "SRC-WOWLIST-NATIONAL-MARCHES-2016-11-09",
    observationId: "OBS-WOWLIST-RAPID-CIVIC-COORDINATION",
    project: "wowlist",
    title: "WOW List national march-calendar post",
    author: "WOW List",
    kind: "institutional-social-post",
    publishedAt: "2016-11-09",
    canonicalUrl: "https://x.com/wowlist/status/796473557387575297",
    publicCitation:
      "WOW List published a same-day pointer to marches across the United States and framed the calendar as movement infrastructure.",
    supportsGenerally: ["rapid civic coordination", "multi-city event distribution"],
    doesNotEstablish: ["event attendance", "organizer ownership", "causal impact"],
    statement:
      "WOW List adapted its event-distribution surface to same-day, multi-city civic coordination after the 2016 election.",
    locator: "Post text, project link, and timestamp",
    limitations: ["The post does not measure attendance or claim ownership of listed events."],
    supportsClaimIds: [wowListSocialClaimId],
  },
  {
    sourceId: "SRC-WOWLIST-POPULAR-VOTE-2016-11-14",
    observationId: "OBS-WOWLIST-POPULAR-VOTE-TRANSITION",
    project: "wowlist",
    title: "WOW List popular.vote coordination post",
    author: "WOW List",
    kind: "institutional-social-post",
    publishedAt: "2016-11-14",
    canonicalUrl: "https://x.com/wowlist/status/798274424763981824",
    publicCitation:
      "WOW List directed people to popular.vote to add events and receive updates on marches, meetings, and local connection across the United States.",
    supportsGenerally: ["new civic project surface", "event contribution and updates"],
    doesNotEstablish: ["complete product ownership", "participation totals"],
    statement:
      "The account documented a transition from calendar infrastructure into a focused civic coordination surface with event contribution and updates.",
    locator: "Post text, domain, and timestamp",
    limitations: ["The post does not establish participation totals or complete team ownership."],
    supportsClaimIds: [wowListSocialClaimId],
  },
];

const profileSources = [
  {
    id: "SRC-SOCIAL-CALLNYC-PROFILE-2026-07-14",
    title: "CallNYC project account profile",
    organization: "CallNYC",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/CallNYCApp",
    preferredPublicUrl: "canonical",
    publicCitation:
      "CallNYC project-account profile observed July 14, 2026: joined March 2016, 110 posts, 69 followers, and a civic constituent-services bio.",
    publicNote: "Counts are a point-in-time observation and may change.",
    supportsGenerally: ["project handle", "account start", "public mission", "profile counts"],
    doesNotEstablish: ["authorship of every post", "current service accuracy", "impact"],
  },
  {
    id: "SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14",
    title: "NYC Artist Coalition shared account profile",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation:
      "NYC Artist Coalition profile observed July 14, 2026: joined January 2017, 5,124 posts, 1,339 followers, and a bio naming SaveNYCSpaces, LetNYCDance, TalksNotRaids, and FairRentNYC.",
    publicNote: "Counts are a point-in-time observation and may change.",
    supportsGenerally: ["shared coalition handle", "multi-campaign scope", "account continuity", "profile counts"],
    doesNotEstablish: ["who opened the account", "authorship of every post", "individual impact"],
  },
  {
    id: "SRC-SOCIAL-WOWLIST-PROFILE-2026-07-14",
    title: "WOW List project account profile",
    organization: "WOW List",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List project-account profile observed July 14, 2026: @wowlist, joined February 2014, 38 posts, and a link to wowlist.org.",
    publicNote:
      "The profile is historical and inactive. Counts are point-in-time observations; the exact history of the @WOWListNYC alias remains open.",
    supportsGenerally: ["current historical handle", "account start", "profile post count", "project domain"],
    doesNotEstablish: ["exact account-rename history", "authorship of every post", "platform-wide adoption"],
  },
] satisfies SourceRecord[];

const firsthandSource = {
  id: "SRC-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP-2026",
  title: "Jamie Burkart statement about project-account establishment and shared use",
  author: "Jamie Burkart",
  kind: "firsthand-statement",
  visibility: "protected",
  preservationStatus: "private",
  publishedAt: reviewedAt,
  publicCitation:
    "Jamie Burkart's July 2026 first-hand statement about establishing project accounts and a shared public identity system used by collaborators.",
  publicNote:
    "Useful role evidence pending collaborator corroboration; it is not evidence that Jamie authored every post.",
  supportsGenerally: ["account establishment claim", "shared teammate use", "identity-system intent"],
  doesNotEstablish: ["authorship of every post", "sole campaign ownership", "collaborator testimony"],
  protectedLocatorId: "SOCIAL-JAMIE-STATEMENT-2026-07-14",
} satisfies SourceRecord;

export const socialMediaSources = [
  ...profileSources,
  firsthandSource,
  ...socialPostDescriptors.map(
    (descriptor): SourceRecord => ({
      id: descriptor.sourceId,
      title: descriptor.title,
      author: descriptor.author,
      organization: descriptor.organization,
      kind: descriptor.kind,
      visibility: "public",
      preservationStatus: "live",
      publishedAt: descriptor.publishedAt,
      accessedAt: reviewedAt,
      canonicalUrl: descriptor.canonicalUrl,
      preferredPublicUrl: "canonical",
      publicCitation: descriptor.publicCitation,
      publicNote: descriptor.publicNote,
      supportsGenerally: descriptor.supportsGenerally,
      doesNotEstablish: descriptor.doesNotEstablish,
    }),
  ),
] satisfies SourceRecord[];

const profileObservations = [
  {
    id: "OBS-SOCIAL-CALLNYC-PROFILE-SNAPSHOT",
    sourceId: "SRC-SOCIAL-CALLNYC-PROFILE-2026-07-14",
    project: "callnyc",
    statement:
      "The authenticated public profile displayed @CallNYCApp, a March 2016 join date, 110 posts, 69 followers, 194 following, and a constituent-services mission.",
    observationType: "metadata",
    locator: "Profile header and bio",
    confidence: "high",
    limitations: ["Profile counts are volatile and were observed on one date."],
    supportsClaimIds: [callNycCouncilClaimId],
    reviewedAt,
  },
  {
    id: "OBS-SOCIAL-NYCARTC-PROFILE-SNAPSHOT",
    sourceId: "SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14",
    project: "fair-rent-nyc",
    statement:
      "The authenticated public profile displayed @NYCArtC, a January 2017 join date, 5,124 posts, 1,339 followers, and four campaign hashtags in its coalition bio.",
    observationType: "metadata",
    locator: "Profile header and bio",
    confidence: "high",
    limitations: ["Profile counts are volatile and do not identify individual authors."],
    supportsClaimIds: [nycacCouncilClaimId, nycacIdentityClaimId],
    reviewedAt,
  },
  {
    id: "OBS-SOCIAL-WOWLIST-PROFILE-SNAPSHOT",
    sourceId: "SRC-SOCIAL-WOWLIST-PROFILE-2026-07-14",
    project: "wowlist",
    statement:
      "The authenticated public profile displayed @wowlist, a February 2014 join date, 38 posts, 47 followers, 57 following, and wowlist.org.",
    observationType: "metadata",
    locator: "Profile header and bio",
    confidence: "high",
    limitations: ["Profile counts are volatile; alias history is not established."],
    supportsClaimIds: [wowListSocialClaimId],
    reviewedAt,
  },
  {
    id: "OBS-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP",
    sourceId: "SRC-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP-2026",
    project: "fair-rent-nyc",
    statement:
      "Jamie states that he established the project accounts and a public-facing identity system that teammates, including Olympia Kazi, used over years.",
    observationType: "attributed",
    locator: "First-hand statement dated July 14, 2026",
    confidence: "high",
    limitations: [
      "The role statement is first-hand and awaits collaborator corroboration.",
      "It does not attribute every post to Jamie.",
    ],
    supportsClaimIds: [nycacIdentityClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const socialMediaObservations = [
  ...profileObservations,
  ...socialPostDescriptors.map(
    (descriptor): ObservationRecord => ({
      id: descriptor.observationId,
      sourceId: descriptor.sourceId,
      project: descriptor.project,
      statement: descriptor.statement,
      observationType: "explicit",
      locator: descriptor.locator,
      confidence: "high",
      limitations: descriptor.limitations,
      supportsClaimIds: descriptor.supportsClaimIds,
      reviewedAt,
    }),
  ),
] satisfies ObservationRecord[];

const sourceIdsForClaim = (claimId: string) =>
  socialPostDescriptors
    .filter((descriptor) => descriptor.supportsClaimIds.includes(claimId))
    .map((descriptor) => descriptor.sourceId);

const observationIdsForClaim = (claimId: string) =>
  socialMediaObservations
    .filter((observation) => observation.supportsClaimIds.includes(claimId))
    .map((observation) => observation.id);

const callNycCouncilSourceIds = sourceIdsForClaim(callNycCouncilClaimId);
const nycacCouncilSourceIds = sourceIdsForClaim(nycacCouncilClaimId);
const wowListSocialSourceIds = sourceIdsForClaim(wowListSocialClaimId);
const nycacIncidentalCouncilSourceIds = [
  "SRC-NYCAC-LEVINE-INCIDENTAL-2020-03-20",
  "SRC-NYCAC-BRANNAN-INCIDENTAL-2019-08-30",
];
const nycacIncidentalCouncilObservationIds = [
  "OBS-NYCAC-LEVINE-CONTEXT-LIMITED-REPLY",
  "OBS-NYCAC-BRANNAN-INCIDENTAL-REPLY",
];

export const socialMediaCaptures = [
  {
    id: "CAP-SOCIAL-PROJECT-ACCOUNT-INVENTORY-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "metric",
    summary:
      "Authenticated point-in-time inventory of the confirmed CallNYC, NYC Artist Coalition, and WOW List project accounts.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: ["callnyc", "fair-rent-nyc", "wowlist"],
    potentialClaimFamilies: ["public project identity", "account continuity", "campaign scope"],
    sourceIds: profileSources.map((source) => source.id),
    observationIds: profileObservations.slice(0, 3).map((observation) => observation.id),
    researchTaskIds: ["RT-SOCIAL-WOWLIST-HANDLE-LINEAGE"],
    disposition:
      "Recorded public profile metadata as a dated snapshot; did not infer authorship, impact, or exact historical alias continuity.",
  },
  {
    id: "CAP-SOCIAL-CALLNYC-COUNCIL-ENGAGEMENT-2026",
    receivedAt: reviewedAt,
    submittedBy: "Codex authenticated archival review",
    kind: "metric",
    summary:
      "Six distinct historical NYC Council Member accounts recovered as public CallNYC respondents, sharers, or quoters.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: ["callnyc"],
    potentialClaimFamilies: ["public-official engagement", "independent sharing", "constituent-service traction"],
    sourceIds: callNycCouncilSourceIds,
    observationIds: observationIdsForClaim(callNycCouncilClaimId).filter(
      (id) => id !== "OBS-SOCIAL-CALLNYC-PROFILE-SNAPSHOT",
    ),
    researchTaskIds: [],
    disposition:
      "Promoted a bounded named-account count; excluded tags without response, resident comments, likes, deleted content, and claims of endorsement or impact.",
  },
  {
    id: "CAP-SOCIAL-NYCAC-COUNCIL-ENGAGEMENT-2026",
    receivedAt: reviewedAt,
    submittedBy: "Codex authenticated archival review",
    kind: "metric",
    summary:
      "Historical mention inventory recovering six Council Member account authors, four with clearly mission-relevant coalition engagement.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: ["fair-rent-nyc"],
    potentialClaimFamilies: ["public-official engagement", "campaign mobilization", "coalition traction"],
    sourceIds: [
      ...nycacCouncilSourceIds,
      ...nycacIncidentalCouncilSourceIds,
    ],
    observationIds: [
      ...observationIdsForClaim(nycacCouncilClaimId).filter(
        (id) => id !== "OBS-SOCIAL-NYCARTC-PROFILE-SNAPSHOT",
      ),
      ...nycacIncidentalCouncilObservationIds,
    ],
    researchTaskIds: ["RT-SOCIAL-NYCAC-POST-2020-MENTION-INVENTORY"],
    disposition:
      "Promoted four mission-relevant Council Member accounts; retained two incidental or logistical author appearances only in the research count.",
  },
  {
    id: "CAP-SOCIAL-NYCAC-IDENTITY-STEWARDSHIP-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "memory",
    summary:
      "First-hand account-establishment and shared-identity stewardship claim, held for collaborator corroboration.",
    status: "researching",
    publicSafety: "protected-pointer",
    potentialProjectIds: ["fair-rent-nyc"],
    potentialClaimFamilies: ["account establishment", "shared identity system", "collaborator handoff"],
    sourceIds: [
      "SRC-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP-2026",
      "SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14",
    ],
    observationIds: [
      "OBS-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP",
      "OBS-SOCIAL-NYCARTC-PROFILE-SNAPSHOT",
    ],
    researchTaskIds: ["RT-SOCIAL-NYCAC-ACCOUNT-ESTABLISHMENT-CORROBORATION"],
    disposition:
      "Preserved Jamie's role statement and the observable collective-use boundary; did not publish it as corroborated testimony or assign all account content to Jamie.",
  },
  {
    id: "CAP-SOCIAL-WOWLIST-TIMELINE-INVENTORY-2026",
    receivedAt: reviewedAt,
    submittedBy: "Codex authenticated archival review",
    kind: "artifact",
    summary:
      "Thirty-seven recovered records from a 38-post WOW List profile, close-read for product-support and civic-coordination patterns.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: ["wowlist"],
    potentialClaimFamilies: ["product support", "community publishing", "rapid civic coordination"],
    sourceIds: ["SRC-SOCIAL-WOWLIST-PROFILE-2026-07-14", ...wowListSocialSourceIds],
    observationIds: observationIdsForClaim(wowListSocialClaimId),
    researchTaskIds: ["RT-SOCIAL-WOWLIST-HANDLE-LINEAGE"],
    disposition:
      "Promoted the account as a product and coordination surface; did not treat the small profile count as the platform's adoption measure.",
  },
] satisfies CaptureRecord[];

export const socialMediaClaims = [
  {
    id: callNycCouncilClaimId,
    project: "callnyc",
    claimType: "outcome",
    internalClaim:
      "Between 2016 and 2018, at least six distinct NYC Council Member accounts publicly engaged with CallNYC through replies, independent sharing, quoted figures, or acknowledgment.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: observationIdsForClaim(callNycCouncilClaimId),
    projections: [
      {
        key: "case-study",
        text:
          "Public posts from 2016-2018 show at least six distinct NYC Council Member accounts engaging with CallNYC through replies, independent sharing, quoted district figures, or acknowledgment: Margaret Chin, Ruben Wills, Steven Matteo, Peter Koo, Mathieu Eugene, and Helen Rosenthal. This is a bounded public-engagement count, not an endorsement or impact measure.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-SOCIAL-CALLNYC-PROFILE-2026-07-14",
        relationship: "context",
        supports: ["historical project account", "public project identity"],
        confidence: "high",
        renderCitation: false,
      },
      ...callNycCouncilSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: [
          "named Council Member account",
          "observable public engagement",
        ],
        confidence: "high" as const,
        renderCitation: true,
      })),
    ],
    boundaries: [
      "Count only posts authored by Council Member accounts, not posts that merely tag an official.",
      "Historical X search cannot recover every deleted post, native repost, private interaction, or like.",
      "Engagement does not mean endorsement, adoption, service impact, or current officeholder status.",
    ],
    antiClaims: [
      "Every NYC Council Member endorsed CallNYC.",
      "CallNYC was adopted as an official Council service.",
      "The posts prove that CallNYC caused constituent-service outcomes.",
    ],
    researchInquiryIds: ["INQ-SOCIAL-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
  },
  {
    id: nycacCouncilClaimId,
    project: "fair-rent-nyc",
    claimType: "outcome",
    internalClaim:
      "A 2017-2020 authenticated X mention inventory recovered mission-relevant public engagement from at least four NYC Council Member accounts across NYC Artist Coalition campaigns.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: observationIdsForClaim(nycacCouncilClaimId),
    projections: [
      {
        key: "case-study",
        text:
          "Authenticated historical X search recovered mission-relevant public engagement from at least four Council Member accounts across coalition work: Rafael Espinal, Stephen Levin, Carlina Rivera, and Jimmy Van Bramer. Their posts addressed Cabaret Law repeal, Office of Nightlife convening, Talks Not Raids, co-sponsorship, and arts-and-culture advocacy. The count describes observable posts, not sole causality or blanket endorsement.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14",
        relationship: "context",
        supports: ["shared coalition account", "four named campaign lines", "multi-year continuity"],
        confidence: "high",
        renderCitation: true,
      },
      ...nycacCouncilSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: ["named Council Member account", "mission-relevant public engagement"],
        confidence: "high" as const,
        renderCitation: true,
      })),
    ],
    boundaries: [
      "The broad historical result set contained six Council Member account authors; two incidental or logistical appearances are not counted as mission-relevant traction.",
      "The recovered mention corpus covers 2017-2020; a complete post-2020 incoming-mention inventory remains open.",
      "Shared-account posts must not be attributed to Jamie without post-level authorship evidence.",
      "Engagement does not establish policy causality, sole coalition ownership, or blanket endorsement.",
    ],
    antiClaims: [
      "Jamie authored every @NYCArtC post.",
      "NYC Artist Coalition alone caused the cited policy outcomes.",
      "Every tagged Council Member publicly engaged with the coalition.",
    ],
    researchTaskIds: ["RT-SOCIAL-NYCAC-POST-2020-MENTION-INVENTORY"],
    researchInquiryIds: ["INQ-SOCIAL-NYCAC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
  },
  {
    id: nycacIdentityClaimId,
    project: "fair-rent-nyc",
    claimType: "role",
    internalClaim:
      "Jamie states that he established @NYCArtC and a public-facing project identity system that collaborators used across campaign work over years.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: [
      "OBS-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP",
      "OBS-SOCIAL-NYCARTC-PROFILE-SNAPSHOT",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie states that he established the coalition account and a shared public identity system that teammates used over years; collaborator corroboration remains open, and no individual is assigned authorship of the full feed.",
        status: "hold",
        citationRequired: false,
        surfaces: [],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP-2026",
        relationship: "direct-support",
        supports: ["Jamie's first-hand role statement"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14",
        relationship: "context",
        supports: ["shared multi-campaign identity", "multi-year public use"],
        confidence: "moderate",
        renderCitation: false,
      },
    ],
    boundaries: [
      "The public profile cannot establish who opened the account.",
      "Shared use does not establish authorship of individual posts.",
      "Olympia Kazi's visible public use is not a testimonial about Jamie's role.",
    ],
    antiClaims: [
      "Jamie authored every @NYCArtC post.",
      "Jamie solely controlled the coalition's public identity.",
      "Olympia Kazi has supplied a testimonial for this claim.",
    ],
    researchTaskIds: ["RT-SOCIAL-NYCAC-ACCOUNT-ESTABLISHMENT-CORROBORATION"],
    researchInquiryIds: ["INQ-SOCIAL-PROJECT-ACCOUNT-INVENTORY-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
  },
  {
    id: wowListSocialClaimId,
    project: "wowlist",
    claimType: "method",
    internalClaim:
      "WOW List used its project account as an extension of the product for onboarding, product support, event distribution, community lineage, and rapid civic coordination.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: observationIdsForClaim(wowListSocialClaimId),
    projections: [
      {
        key: "case-study",
        text:
          "WOW List's 2014-2017 account shows social media functioning as part of the product: explaining how to add and follow calendars, sharing a user tutorial, documenting Sunday Dinner as an origin, distributing events, and adapting the calendar to rapid civic coordination across cities.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"],
      },
    ],
    evidence: [
      {
        sourceId: "SRC-SOCIAL-WOWLIST-PROFILE-2026-07-14",
        relationship: "context",
        supports: ["historical project account", "timeline scope"],
        confidence: "high",
        renderCitation: true,
      },
      ...wowListSocialSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "direct-support" as const,
        supports: ["observable product-support or coordination use"],
        confidence: "high" as const,
        renderCitation: true,
      })),
    ],
    boundaries: [
      "The recovered timeline contains 37 of 38 profile posts and is not a complete platform-usage history.",
      "The account's follower count is not used as a WOW List adoption measure.",
      "Event distribution does not establish attendance, event ownership, or causal movement impact.",
    ],
    antiClaims: [
      "The Twitter account measures WOW List's total adoption.",
      "WOW List organized every event it distributed.",
      "The social posts establish attendance or causal civic impact.",
    ],
    researchInquiryIds: ["INQ-SOCIAL-WOWLIST-TIMELINE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"],
  },
] satisfies ClaimRecord[];

export const socialMediaResearchTasks = [
  {
    id: "RT-SOCIAL-NYCAC-POST-2020-MENTION-INVENTORY",
    project: "fair-rent-nyc",
    question:
      "Which mission-relevant public-official and collaborator engagements with @NYCArtC can be recovered from 2021 to the present?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-SOCIAL-NYCAC-COUNCIL-ENGAGEMENT-2026"],
    sourceIds: ["SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14"],
    claimIds: [nycacCouncilClaimId],
    successCriteria: [
      "Recover a dated, deduplicated post-2020 incoming-mention inventory.",
      "Classify author accounts separately from tags, likes, and reposts.",
      "Preserve post-level authorship and collective-work boundaries.",
    ],
    nextActions: [
      "Retry bounded date windows after the platform search error clears.",
      "Archive public URLs and classify only mission-relevant records.",
    ],
    publicNote:
      "The 2017-2020 inventory is complete for the recovered search result; post-2020 incoming mentions remain an explicit gap.",
    owner: "Portfolio research",
    reviewedAt,
  },
  {
    id: "RT-SOCIAL-NYCAC-ACCOUNT-ESTABLISHMENT-CORROBORATION",
    project: "fair-rent-nyc",
    question:
      "Can collaborators or dated account-access records corroborate Jamie's role establishing @NYCArtC and the shared identity workflow?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-SOCIAL-NYCAC-IDENTITY-STEWARDSHIP-2026"],
    sourceIds: [
      "SRC-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP-2026",
      "SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14",
    ],
    claimIds: [nycacIdentityClaimId],
    successCriteria: [
      "Recover a dated collaborator statement or inspectable account-establishment record.",
      "Separate account setup, identity design, access handoff, and post authorship.",
      "Secure permission before using any collaborator quotation publicly.",
    ],
    nextActions: [
      "Ask Olympia Kazi and another early collaborator for a bounded proof note.",
      "Review public-safe account-creation or access-handoff metadata if available.",
    ],
    publicNote:
      "Jamie's first-hand account is preserved, but the role claim remains held until independently corroborated.",
    owner: "Jamie Burkart",
    reviewedAt,
  },
  {
    id: "RT-SOCIAL-WOWLIST-HANDLE-LINEAGE",
    project: "wowlist",
    question:
      "Was @WOWListNYC an earlier handle for the currently visible @wowlist account, and when did the rename occur?",
    priority: "low",
    status: "open",
    captureIds: [
      "CAP-SOCIAL-PROJECT-ACCOUNT-INVENTORY-2026",
      "CAP-SOCIAL-WOWLIST-TIMELINE-INVENTORY-2026",
    ],
    sourceIds: ["SRC-SOCIAL-WOWLIST-PROFILE-2026-07-14"],
    claimIds: [],
    successCriteria: [
      "Recover an archived profile or account record that links both handles to one account identity.",
      "Record the rename date or retain the lineage as unresolved.",
    ],
    nextActions: [
      "Search Wayback captures and account-ID-preserving records for both handles.",
      "Do not present @WOWListNYC as a confirmed alias until continuity is established.",
    ],
    publicNote:
      "The portfolio links the currently visible @wowlist profile and keeps @WOWListNYC as an unresolved historical reference.",
    owner: "Portfolio research",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const socialMediaInquiries = [
  {
    id: "INQ-SOCIAL-PROJECT-ACCOUNT-INVENTORY-2026",
    project: "portfolio-system",
    question: "Which confirmed project Twitter accounts can be publicly inventoried?",
    methods: [
      "Opened each candidate profile in Jamie's authenticated in-app browser session.",
      "Compared public profile identity with project-site and repository references.",
      "Recorded profile counts as dated observations rather than durable scale claims.",
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "CallNYC uses @CallNYCApp.",
      "NYC Artist Coalition and its four named campaign lines use the shared @NYCArtC account.",
      "WOW List's currently visible historical account is @wowlist; @WOWListNYC remains an unresolved historical reference.",
      "No separate project Twitter account was confirmed for the other current portfolio projects in this pass.",
    ],
    limitations: [
      "Absence from the confirmed inventory is not proof that no account ever existed.",
      "Profile counts and account availability can change.",
    ],
    sourceIds: profileSources.map((source) => source.id),
    publicSummary:
      "Three project-level accounts were confirmed: @CallNYCApp, the shared @NYCArtC coalition account, and @wowlist.",
  },
  {
    id: "INQ-SOCIAL-CALLNYC-COUNCIL-ENGAGEMENT-2026",
    project: "callnyc",
    question: "How many NYC Council Member accounts visibly engaged with CallNYC?",
    methods: [
      "Ran authenticated Latest searches for incoming @CallNYCApp mentions, CallNYC references, and callnyc.org links while excluding posts from the project account.",
      "Counted only posts authored by historical Council Member accounts.",
      "Deduplicated by account and classified replies, reshares, independent shares, quoted figures, and acknowledgments.",
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "At least six distinct Council Member accounts were recovered: Margaret Chin, Ruben Wills, Steven Matteo, Peter Koo, Mathieu Eugene, and Helen Rosenthal.",
      "The strongest use case was Steven Matteo quoting CallNYC's district figures in a constituent-service post.",
      "Helen Rosenthal independently shared CallNYC as a pathway to Council offices.",
    ],
    limitations: [
      "Search cannot recover every deleted post, private interaction, native repost, or like.",
      "Tags without a response were excluded.",
      "The count is historical engagement, not endorsement, adoption, or impact.",
    ],
    sourceIds: callNycCouncilSourceIds,
    publicSummary:
      "At least six distinct historical Council Member accounts publicly replied to, shared, quoted, or acknowledged CallNYC between 2016 and 2018.",
  },
  {
    id: "INQ-SOCIAL-NYCAC-COUNCIL-ENGAGEMENT-2026",
    project: "fair-rent-nyc",
    question: "How did NYC Council Member accounts engage with @NYCArtC?",
    methods: [
      "Traversed the authenticated Latest search for @NYCArtC mentions from January 2017 through December 2020.",
      "Deduplicated 358 visible status URLs and grouped records by author handle.",
      "Separated mission-relevant engagement from incidental or logistical thread appearances.",
      "Retried post-2020 bounded searches and recorded the platform error rather than treating the period as empty.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Six Council Member accounts appeared as authors in the 2017-2020 result set.",
      "Four had clearly mission-relevant records: Rafael Espinal, Stephen Levin, Carlina Rivera, and Jimmy Van Bramer.",
      "Mission-relevant posts connected the account to Cabaret Law repeal, Office of Nightlife convening, Talks Not Raids, public testimony, co-sponsorship, cultural-space preservation, and arts-and-culture advocacy.",
      "Two additional Council Member author appearances were incidental or too context-limited to count as mission-relevant traction.",
    ],
    limitations: [
      "The complete post-2020 incoming-mention inventory was not recovered because X returned a persistent search error.",
      "Native reposts, deleted posts, likes, and private activity are not included.",
      "The account was shared; post authorship must remain at the visible account level.",
    ],
    sourceIds: [
      "SRC-SOCIAL-NYCARTC-PROFILE-2026-07-14",
      ...nycacCouncilSourceIds,
      ...nycacIncidentalCouncilSourceIds,
    ],
    publicSummary:
      "The recovered 2017-2020 corpus contains mission-relevant engagement from at least four Council Member accounts, with a later-period inventory still open.",
  },
  {
    id: "INQ-SOCIAL-WOWLIST-TIMELINE-2026",
    project: "wowlist",
    question: "What professional and mission-relevant work is visible in WOW List's project-account timeline?",
    methods: [
      "Traversed the authenticated @wowlist profile timeline to exhaustion.",
      "Recovered 37 unique status records from a profile reporting 38 posts.",
      "Separated 21 original account posts from 16 reposted records and close-read the original posts for product and coordination patterns.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The account documented the project's Sunday Dinner calendar lineage and named Jamie and Richard.",
      "The account functioned as public product support, onboarding, event distribution, and community documentation.",
      "The account later adapted the calendar model to rapid multi-city civic coordination and the popular.vote surface.",
    ],
    limitations: [
      "One of the profile's 38 posts did not materialize in the recovered timeline.",
      "The timeline is not a measure of total product adoption, event attendance, or civic impact.",
      "The exact @WOWListNYC to @wowlist handle lineage remains unresolved.",
    ],
    sourceIds: ["SRC-SOCIAL-WOWLIST-PROFILE-2026-07-14", ...wowListSocialSourceIds],
    publicSummary:
      "WOW List's recovered account history shows social media used as a product-support, community-publishing, and rapid civic-coordination surface.",
  },
] satisfies ResearchInquiry[];
