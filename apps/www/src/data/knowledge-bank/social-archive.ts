import type { ClaimRecord, ResearchInquiry, SourceRecord } from "./schema.ts";

export const socialArchiveReviewedAt = "2026-07-15";

export const projectSocialAccounts = [
  { projectId: "callnyc", projectLabel: "CallNYC", handle: "@CallNYCapp", accountUrl: "https://x.com/CallNYCapp", relationship: "dedicated", status: "recovered", snapshot: { posts: 110, followers: 69, following: 194 } },
  { projectId: "nyc-artist-coalition", projectLabel: "NYC Artist Coalition", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-coalition", status: "recovered", snapshot: { posts: 5124, followers: 1339, following: 569 } },
  { projectId: "fair-rent-nyc", projectLabel: "FairRentNYC", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "talks-not-raids", projectLabel: "Talks Not Raids", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "let-nyc-dance", projectLabel: "Let NYC Dance", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "save-nyc-spaces", projectLabel: "Save NYC Spaces", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "wowlist", projectLabel: "WOW List", handle: "@wowlist", accountUrl: "https://x.com/wowlist", relationship: "dedicated", status: "recovered", snapshot: { posts: 38, followers: 47, following: 57 } },
  { projectId: "kc-town-hall", projectLabel: "KC Town Hall", handle: "@KCTownHall", accountUrl: "https://x.com/KCTownHall", relationship: "dedicated", status: "recovered", snapshot: { posts: 183, followers: 132, following: 225 } },
  { projectId: "kc-spaces-fund", projectLabel: "KC Spaces Fund", handle: "@KCSpacesFund", accountUrl: "https://x.com/KCSpacesFund", relationship: "dedicated", status: "recovered", snapshot: { posts: 35, followers: 21, following: 76 } },
  { projectId: "harry-j-epstein", projectLabel: "Harry J. Epstein Company", relationship: "not-recovered", status: "open-inquiry" },
  { projectId: "sunday-dinner", projectLabel: "Sunday Dinner", relationship: "not-recovered", status: "open-inquiry", adjacentAccount: "@wowlist" },
  { projectId: "196", projectLabel: "196", relationship: "not-recovered", status: "open-inquiry" },
  { projectId: "source-backed-team-memory", projectLabel: "Source-Backed Team Memory", relationship: "not-recovered", status: "open-inquiry" },
  { projectId: "nter-chng", projectLabel: "NTER CHNG", relationship: "not-recovered", status: "open-inquiry" }
] as const;

export const callNycCouncilReposts = [
  { key: "VANESSA-GIBSON", name: "Vanessa Gibson", handle: "@BPGibson2025", statusId: "725334082364821504" },
  { key: "MATHIEU-EUGENE", name: "Mathieu Eugene", handle: "@CMMathieuEugene", statusId: "726080902024040448" },
  { key: "PETER-KOO", name: "Peter Koo", handle: "@CMPeterKoo", statusId: "725403215282487296" },
  { key: "MARGARET-CHIN", name: "Margaret Chin", handle: "@CM_MargaretChin", statusId: "731212042863005697" },
  { key: "RUBEN-WILLS", name: "Ruben Wills", handle: "@CM_RubenWills", statusId: "731873940923109376" },
  { key: "CHAIM-DEUTSCH", name: "Chaim Deutsch", handle: "@ChaimDeutsch", statusId: "738140834973900800" },
  { key: "ELIZABETH-CROWLEY", name: "Elizabeth Crowley", handle: "@ElizCrowleyNYC", statusId: "732752376709447680" },
  { key: "FERNANDO-CABRERA", name: "Fernando Cabrera", handle: "@FCabreraNY", statusId: "726900698827358208" },
  { key: "DANEEK-MILLER", name: "I. Daneek Miller", handle: "@IDaneekMiller", statusId: "727528637340241920" },
  { key: "JIMMY-VAN-BRAMER", name: "Jimmy Van Bramer", handle: "@JimmyVanBramer", statusId: "775370427644411904" },
  { key: "MARK-TREYGER", name: "Mark Treyger", handle: "@MarkTreyger718", statusId: "727689676115611650" },
  { key: "DAVID-GREENFIELD", name: "David Greenfield", handle: "@NYCGreenfield", statusId: "730856560071741440" },
  { key: "RAFAEL-ESPINAL", name: "Rafael Espinal", handle: "@RLEspinal", statusId: "734492930262585344" },
  { key: "ANTONIO-REYNOSO", name: "Antonio Reynoso", handle: "@ReynosoBrooklyn", atInteractionHandle: "@CMReynoso34", statusId: "753631998221033472" },
  { key: "RITCHIE-TORRES", name: "Ritchie Torres", handle: "@RitchieTorres", statusId: "724986599419875333" },
  { key: "ROSIE-MENDEZ", name: "Rosie Mendez", handle: "@RosieMendez", statusId: "733027856025047041" },
  { key: "STEVEN-MATTEO", name: "Steven Matteo", handle: "@StevenMatteo", statusId: "748532929802997760" },
  { key: "BEN-KALLOS", name: "Ben Kallos", handle: "@BenKallos", statusId: "724723473852059649" },
  { key: "HELEN-ROSENTHAL", name: "Helen Rosenthal", handle: "@HelenRosenthal", statusId: "723153082096345092" }
] as const;

export const callNycMemberAuthoredInteractions = [
  { key: "PETER-KOO-WRAPPER", name: "Peter Koo", handle: "@CMPeterKoo", interaction: "authored wrapper post", statusId: "725422741160079360", publishedAt: "2016-04-27" },
  { key: "STEVEN-MATTEO-REPLY", name: "Steven Matteo", handle: "@StevenMatteo", interaction: "reply", statusId: "727621921341358081", publishedAt: "2016-05-03" },
  { key: "RUBEN-WILLS-REPLY", name: "Ruben Wills", handle: "@CM_RubenWills", interaction: "reply", statusId: "732717792097603584", publishedAt: "2016-05-17" },
  { key: "HELEN-ROSENTHAL-POST", name: "Helen Rosenthal", handle: "@HelenRosenthal", interaction: "authored post", statusId: "780797474277511170", publishedAt: "2016-09-27" },
  { key: "MATHIEU-EUGENE-QUOTE", name: "Mathieu Eugene", handle: "@CMMathieuEugene", interaction: "quote post", statusId: "783305320508514304", publishedAt: "2016-10-04" },
  { key: "MARGARET-CHIN-REPLY", name: "Margaret Chin", handle: "@CM_MargaretChin", interaction: "authored reply", statusId: "884863588317442049", publishedAt: "2017-07-11" }
] as const;

export const nycacCouncilMentions = [
  { key: "RAFAEL-ESPINAL-2019", name: "Rafael Espinal", handle: "@RLEspinal", statusId: "1098626837821997056", publishedAt: "2019-02-21", topic: "Save NYC Spaces, Talks Not Raids, and small-business advocacy" },
  { key: "STEPHEN-LEVIN-2019", name: "Stephen Levin", handle: "@StephenLevin33", statusId: "1095020293112979457", publishedAt: "2019-02-11", topic: "venue testimony and MARCH transparency" },
  { key: "CARLINA-RIVERA-2018", name: "Carlina Rivera", handle: "@CarlinaRivera", statusId: "1053849469853274112", publishedAt: "2018-10-20", topic: "small-business legislation and public testimony" },
  { key: "JUSTIN-BRANNAN-2019", name: "Justin Brannan", handle: "@JustinBrannan", statusId: "1167536258438115333", publishedAt: "2019-08-30", topic: "public reply to the coalition account" },
  { key: "BRAD-LANDER-2021", name: "Brad Lander", handle: "@bradlander", statusId: "1354840336330330116", publishedAt: "2021-01-28", topic: "Commercial Rent Stabilization" },
  { key: "JIMMY-VAN-BRAMER-2020", name: "Jimmy Van Bramer", handle: "@JimmyVanBramer", statusId: "1320792543773282304", publishedAt: "2020-10-26", topic: "arts-worker and cultural-policy advocacy" }
] as const;

export const kcTownHallExternalEngagement = [
  { key: "MELISSA-ROBINSON-2020", name: "Melissa Robinson", handle: "@Robinson4kc", statusId: "1289714535251742726", publishedAt: "2020-08-01", interaction: "reply", topic: "neighborhood conditions" },
  { key: "COMMUNITY-PARTNER-2019", name: "Bridging The Gap partner account", handle: "@trutheresme", statusId: "1148277187583389703", publishedAt: "2019-07-08", interaction: "authored mention", topic: "tire collection and environmental stewardship" },
  { key: "JOLIE-JUSTUS-2019", name: "Jolie Justus", handle: "@joliejustus", statusId: "1122883010582466560", publishedAt: "2019-04-29", interaction: "reply", topic: "redevelopment progress and community participation" }
] as const;

export const kcSpacesFundHighlights = [
  { key: "LATINO-ARTS-FOUNDATION", name: "Latino Arts Foundation", statusId: "1251553551454797830", publishedAt: "2020-04-18" },
  { key: "UNTUCK", name: "UN/TUCK Queer & Trans Collective", statusId: "1253445776224722945", publishedAt: "2020-04-23" },
  { key: "GETWOKE", name: "GetWoke / Merrique Jenson", statusId: "1260590429730414592", publishedAt: "2020-05-13" },
  { key: "TWOCC", name: "Trans Women of Color Collective", statusId: "1262524545275244545", publishedAt: "2020-05-18" },
  { key: "BLACKBOX-ON-TROOST", name: "Blackbox on Troost", statusId: "1263599910781440000", publishedAt: "2020-05-21" },
  { key: "ONE-MIC-STAND", name: "One Mic Stand KC", statusId: "1263927272802746368", publishedAt: "2020-05-22" },
  { key: "FAREWELL-TRANSMISSION", name: "Farewell Transmission", statusId: "1270549089076359174", publishedAt: "2020-06-09" },
  { key: "PARKER-2", name: "Parker 2", statusId: "1271219713188810753", publishedAt: "2020-06-11" },
  { key: "KC-TEXTILE-ARTS-CENTER", name: "Kansas City Textile Arts Center", statusId: "1272260009695551489", publishedAt: "2020-06-14" },
  { key: "SWAN", name: "SWAN", statusId: "1278061185871552512", publishedAt: "2020-06-30" },
  { key: "VULPES-BASTILLE", name: "Vulpes Bastille", statusId: "1281300779266125826", publishedAt: "2020-07-09" }
] as const;

export const callNycRepostSourceIds = callNycCouncilReposts.map(({ key }) => `SRC-CALLNYC-REPOST-${key}`);
export const callNycAuthoredSourceIds = callNycMemberAuthoredInteractions.map(({ key }) => `SRC-CALLNYC-${key}`);
export const nycacMentionSourceIds = nycacCouncilMentions.map(({ key }) => `SRC-NYCAC-COUNCIL-MENTION-${key}`);
export const kcTownHallEngagementSourceIds = kcTownHallExternalEngagement.map(({ key }) => `SRC-KCTH-SOCIAL-${key}`);
export const kcSpacesHighlightSourceIds = kcSpacesFundHighlights.map(({ key }) => `SRC-KCSF-HIGHLIGHT-${key}`);

export const wowListArchiveSummary = {
  profileReported: 38,
  recovered: 38,
  authoredPosts: 16,
  replies: 6,
  repostedExternalPosts: 16,
  accountAuthoredRecords: 22,
  recordsWithPostedUrls: 31,
  postedUrlOccurrences: 35,
  distinctShortUrls: 35,
  accountAuthoredRecordsWithPublicInteraction: 12,
  displayedReplies: 2,
  displayedReposts: 20,
  displayedLikes: 21,
  missionRelevantThirdPartyAccounts: 10,
  thirdPartyAccountsPostingWowListUrls: 9
} as const;

export const wowListStakeholderSignals = [
  { key: "GOOD-NEIGHBR", name: "good neighbr", handle: "@goodneighbr", statusId: "983076265187074048", publishedAt: "2018-04-08", group: "DIY arts and music", signal: "shared a WOW List event URL" },
  { key: "JACK-ASCAK", name: "Jack Ascak", handle: "@jackascak", statusId: "845116237591920640", publishedAt: "2017-03-23", group: "DIY arts and music", signal: "shared a WOW List benefit-event URL" },
  { key: "SIGE-RECORDS", name: "SIGE Records", handle: "@SigeRecords", statusId: "826878408005029889", publishedAt: "2017-02-01", group: "DIY arts and music", signal: "shared a WOW List event URL" },
  { key: "JULIA-FREDENBURG", name: "Julia Fredenburg", handle: "@juliafredenburg", statusId: "729327970435862528", publishedAt: "2016-05-08", group: "neighborhood civic", signal: "shared a WOW List public-forum URL" },
  { key: "REVEREND-WEB", name: "Rev. Web", handle: "@ReverendWEB", statusId: "711556107928412160", publishedAt: "2016-03-20", group: "DIY arts and music", signal: "shared a WOW List exhibition URL" },
  { key: "ALL-AGES", name: "All Ages", handle: "@all_ages", statusId: "665737833219538946", publishedAt: "2015-11-14", group: "calendar community", signal: "publicly answered a WOW List members-meeting invitation" },
  { key: "COTFG", name: "COTFG", handle: "@cotfg", statusId: "663732869357965313", publishedAt: "2015-11-09", group: "DIY arts and music", signal: "shared a WOW List performance URL" },
  { key: "DREAM-VERSION", name: "Dream Version", handle: "@Dream_Version", statusId: "661635999714316288", publishedAt: "2015-11-03", group: "DIY arts and music", signal: "shared a WOW List event URL" },
  { key: "PUNKS-CRIMINALS", name: "Punks & Criminals", handle: "@punkscriminals", statusId: "604360847012413440", publishedAt: "2015-05-29", group: "DIY arts and music", signal: "said it was adding shows to WOW List and shared its list URL" },
  { key: "MUSIC-HACKATHON", name: "Music Hackathon", handle: "@musichackathon", statusId: "579088937022406657", publishedAt: "2015-03-20", group: "creative technology peer", signal: "described WOW List as an event-sharing service made by co-organizer Jamie Burkart" }
] as const;

export const wowListStakeholderSourceIds = wowListStakeholderSignals.map(({ key }) => `SRC-WOWLIST-STAKEHOLDER-${key}`);

const sourceDefaults = {
  visibility: "public" as const,
  preservationStatus: "live" as const,
  accessedAt: socialArchiveReviewedAt,
  metadataVerifiedAt: socialArchiveReviewedAt,
  metadataVerifiedBy: "Codex authenticated public-web review"
};

export const socialArchiveSources: SourceRecord[] = [
  {
    id: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15",
    title: "Portfolio social-media archival production inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    ...sourceDefaults,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/feature/evals-K/docs/knowledge-bank/research/2026-07-15-project-social-media-archive-production.md",
    preferredPublicUrl: "canonical",
    publicCitation: "Portfolio social-media archival production inventory, July 15, 2026.",
    publicNote: "A bounded inventory of recovered public profiles, posts, repost lists, interaction edges, source articles, and explicit stopping conditions.",
    supportsGenerally: ["account registry", "bounded recovery methods", "named public interaction ledgers", "lower-bound counts", "collective authorship boundaries"],
    doesNotEstablish: ["a complete lifetime archive", "individual authorship of shared-account posts", "unobserved likes", "endorsement from every interaction", "that an unrecovered account never existed"]
  },
  {
    id: "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28",
    title: "Minutes of the New York City Council stated meeting, September 28, 2016",
    organization: "New York City Council",
    kind: "government-record",
    ...sourceDefaults,
    publishedAt: "2016-09-28",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=5b6f62c6-7eae-4d9e-9aec-c8b8fc36438c&ID=38126&M=AO&N=TWludXRlcyBvZiB0aGUgU3RhdGVkIE1lZXRpbmc%3D",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, minutes of the stated meeting, September 28, 2016.",
    publicNote: "The official roster corroborates that the 19 named people in the CallNYC ledger were serving Council members in 2016.",
    supportsGenerally: ["2016 Council roster", "public-office status of named CallNYC engagement accounts"],
    doesNotEstablish: ["control of social accounts", "authorship of every post", "endorsement of CallNYC", "a complete engagement census"]
  },
  {
    id: "SRC-NYC-COUNCIL-MEMBERS-LEGISLATIVE-RECORD-2019",
    title: "New York City Council legislative membership record, 2019",
    organization: "New York City Council",
    kind: "government-record",
    ...sourceDefaults,
    publishedAt: "2019-07-14",
    canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=D561A4D3-E518-49A9-8D97-D106A9178639&ID=3458224",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Local Law 128 of 2019 legislative record.",
    publicNote: "The sponsor list corroborates Council-member status for accounts in the bounded NYC Artist Coalition ledger.",
    supportsGenerally: ["Council-member status during the relevant legislative term"],
    doesNotEstablish: ["control of social accounts", "complete social engagement", "coalition authorship", "causal credit for campaign outcomes"]
  },
  ...[
    { id: "SRC-CALLNYC-X-PROFILE", title: "CallNYC public X profile", organization: "CallNYC", handle: "CallNYCapp", note: "Profile metrics are a dated snapshot and should not be treated as stable impact measures.", supports: ["dedicated account identity", "profile description", "110-post snapshot"], limits: ["individual post authorship", "complete post recovery", "current civic-service status", "endorsement by followers"] },
    { id: "SRC-NYCAC-X-PROFILE", title: "NYC Artist Coalition public X profile", organization: "NYC Artist Coalition", handle: "NYCArtC", note: "The profile explicitly names Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC.", supports: ["shared coalition account", "four named campaigns", "account continuity", "5,124-post snapshot"], limits: ["individual post authorship", "Jamie's sole control", "Olympia Kazi's authorship", "sole causation of campaign outcomes"] },
    { id: "SRC-WOWLIST-X-PROFILE", title: "WOW List public X profile", organization: "WOW List", handle: "wowlist", note: "Reconciled Posts and Replies crawls recovered all 38 profile-displayed posts at review time.", supports: ["dedicated account identity", "38-post profile population", "historical project description"], limits: ["complete product history", "individual authorship of every post", "current product availability"] },
    { id: "SRC-KCTH-X-PROFILE", title: "KC Town Hall public X profile", organization: "KC Town Hall", handle: "KCTownHall", note: "The account documents redevelopment communication and neighborhood-stewardship activity.", supports: ["dedicated account identity", "183-post profile population", "multi-year public communication"], limits: ["individual post authorship", "receipt of Council-appropriated funds", "project completion", "sole individual credit"] },
    { id: "SRC-KCSF-X-PROFILE", title: "KC Spaces Fund public X profile", organization: "KC Spaces Fund", handle: "KCSpacesFund", note: "The bounded review recovered 34 of the profile's 35 displayed posts.", supports: ["dedicated account identity", "35-post profile snapshot", "COVID-era emergency-fund description"], limits: ["individual post authorship", "grant-selection responsibility", "complete grantee list", "Jamie's role as public organizer"] }
  ].map((profile): SourceRecord => ({
    id: profile.id,
    title: profile.title,
    organization: profile.organization,
    kind: "institutional-web-page",
    ...sourceDefaults,
    canonicalUrl: `https://x.com/${profile.handle}`,
    preferredPublicUrl: "canonical",
    publicCitation: `${profile.organization} (@${profile.handle}), public X profile, accessed July 15, 2026.`,
    publicNote: profile.note,
    supportsGenerally: profile.supports,
    doesNotEstablish: profile.limits
  })),
  ...callNycCouncilReposts.map((event): SourceRecord => ({
    id: `SRC-CALLNYC-REPOST-${event.key}`,
    title: `CallNYC post public repost list including ${event.name}`,
    organization: "CallNYC / X",
    kind: "institutional-social-post",
    ...sourceDefaults,
    canonicalUrl: `https://x.com/CallNYCapp/status/${event.statusId}/retweets`,
    preferredPublicUrl: "canonical",
    publicCitation: `Public repost list for CallNYC post ${event.statusId}, including ${event.name}, accessed July 15, 2026.`,
    publicNote: `The profile displayed ${event.handle} at review time; handle text may differ after account renames.`,
    supportsGenerally: [`${event.name}'s account appeared in the post's public repost list at review time`],
    doesNotEstablish: ["a permanent repost", "the account operator's motive", "endorsement of every CallNYC claim", "complete interaction history"]
  })),
  ...callNycMemberAuthoredInteractions.map((event): SourceRecord => ({
    id: `SRC-CALLNYC-${event.key}`,
    title: `${event.name} public ${event.interaction} involving CallNYC`,
    organization: "New York City Council member public account",
    kind: "government-social-post",
    ...sourceDefaults,
    publishedAt: event.publishedAt,
    canonicalUrl: `https://x.com/${event.handle.slice(1)}/status/${event.statusId}`,
    preferredPublicUrl: "canonical",
    publicCitation: `${event.name}, public ${event.interaction} involving CallNYC, ${event.publishedAt}.`,
    publicNote: "This supplies an attributable authored interaction distinct from the public repost-list audit.",
    supportsGenerally: [`${event.name} authored a public ${event.interaction} involving CallNYC`],
    doesNotEstablish: ["endorsement of every CallNYC claim", "complete Council engagement", "formal Council adoption of CallNYC"]
  })),
  ...nycacCouncilMentions.map((event): SourceRecord => ({
    id: `SRC-NYCAC-COUNCIL-MENTION-${event.key}`,
    title: `${event.name} public post mentioning NYC Artist Coalition`,
    organization: "New York City Council member public account",
    kind: "government-social-post",
    ...sourceDefaults,
    publishedAt: event.publishedAt,
    canonicalUrl: `https://x.com/${event.handle.slice(1)}/status/${event.statusId}`,
    preferredPublicUrl: "canonical",
    publicCitation: `${event.name}, public post mentioning @NYCArtC, ${event.publishedAt}.`,
    publicNote: `The post concerns ${event.topic}.`,
    supportsGenerally: [`${event.name} authored a public post mentioning @NYCArtC`, event.topic],
    doesNotEstablish: ["a complete engagement census", "individual authorship of coalition posts", "sole coalition causation", "endorsement of every coalition position"]
  })),
  {
    id: "SRC-WOWLIST-FULL-POPULATION-2026-07-15",
    title: "Authenticated WOW List X full-population archival review",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    ...sourceDefaults,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/feature/evals-K/docs/knowledge-bank/research/2026-07-15-project-social-media-archive-production.md",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated full-population review of @wowlist, July 15, 2026.",
    publicNote: "All 38 profile-counted records were recovered; the minimized fixture reproduces record type and posted-link counts while significant sources and bounded external-use signals remain separately citable.",
    supportsGenerally: ["38-of-38 population recovery", "16 original posts, six replies, and 16 reposted external posts", "35 posted-link occurrences", "dated public-interaction snapshot", "bounded 10-account stakeholder sample"],
    doesNotEstablish: ["deleted or unindexed activity outside the displayed population", "individual authorship of every account post", "current product availability", "complete adoption", "attendance or endorsement"]
  },
  {
    id: "SRC-WOWLIST-PRODUCTION-ARCHIVE-ANALYSIS-2026-07-15",
    title: "WOW List production archive and database analysis",
    organization: "Jamie Burkart portfolio archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: socialArchiveReviewedAt,
    reviewStatus: "close-read",
    contentReviewedAt: socialArchiveReviewedAt,
    contentReviewedBy: "Codex protected-archive review",
    publicCitation: "Public-safe analysis of archived WOW List production database snapshots, reviewed July 2026.",
    publicNote: "The archived production database contains 1,846 users and 16,142 posts/events. Thirty-five city/region entries had at least 50 geocoded posts/events, the documented conservative threshold for an active city scene.",
    protectedLocatorId: "ARCHIVE-WOWLIST-PRODUCTION-DATABASE-ANALYSIS-2026-001",
    supportsGenerally: ["1,846 historical user rows", "16,142 historical posts/events", "35 city/region entries with at least 50 geocoded posts/events", "followable keyword-community and event-distribution workflows"],
    doesNotEstablish: ["current product availability", "35 official chapters", "35 currently active communities", "unique human adoption in every city", "Jamie's sole ownership of growth or adoption", "permission to publish raw user, contact, geolocation, or community records"]
  },
  {
    id: "SRC-WOWLIST-PRODUCTION-ARCHIVE-PUBLIC-SUMMARY-2026-07-15",
    title: "WOW List public-safe production archive summary",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: socialArchiveReviewedAt,
    reviewStatus: "close-read",
    contentReviewedAt: socialArchiveReviewedAt,
    contentReviewedBy: "Codex public-safety review",
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/feature/evals-K/docs/knowledge-bank/research/2026-07-15-project-social-media-archive-production.md",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List public-safe production archive summary, July 15, 2026.",
    publicNote: "The summary publishes only rounded historical aggregates and the conservative active-scene threshold; underlying production records remain protected.",
    supportsGenerally: ["rounded 1,800+ historical user aggregate", "rounded 16,000+ historical posts/events aggregate", "35+ city scenes that each met a historical threshold of at least 50 geocoded posts/events"],
    doesNotEstablish: ["current product availability", "official city chapters", "current activity", "unique active people", "Jamie's sole causation of adoption", "permission to publish raw records"]
  },
  ...wowListStakeholderSignals.map((signal): SourceRecord => ({
    id: `SRC-WOWLIST-STAKEHOLDER-${signal.key}`,
    title: `${signal.name} public WOW List record`,
    organization: signal.name,
    kind: "institutional-social-post",
    ...sourceDefaults,
    publishedAt: signal.publishedAt,
    canonicalUrl: `https://x.com/${signal.handle.slice(1)}/status/${signal.statusId}`,
    preferredPublicUrl: "canonical",
    publicCitation: `${signal.name}, public WOW List record, ${signal.publishedAt}.`,
    publicNote: `${signal.group} signal: ${signal.signal}.`,
    supportsGenerally: [signal.signal, `${signal.group} public-use context`],
    doesNotEstablish: ["event attendance", "formal partnership", "platform-wide adoption", "current product availability", "Jamie's authorship of the external post"]
  })),
  {
    id: "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
    title: "Zines 2.0",
    organization: "Good Times",
    author: "Elise Granata",
    kind: "published-article",
    ...sourceDefaults,
    preservationStatus: "archived",
    publishedAt: "2015-05-06",
    archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015.",
    publicNote: "WOW List circulated this account of DIY documentation and connection across geographically dispersed grassroots scenes.",
    supportsGenerally: ["DIY cultural documentation", "cross-place grassroots arts connection", "mission-relevant source curation"],
    doesNotEstablish: ["coverage of WOW List", "platform adoption", "Jamie's authorship of the article"]
  },
  {
    id: "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    organization: "Grasstronaut",
    author: "Elise Granata",
    kind: "published-article",
    ...sourceDefaults,
    preservationStatus: "archived",
    publishedAt: "2015-01-29",
    archiveUrl: "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' Grasstronaut, January 29, 2015.",
    publicNote: "WOW List circulated this practical all-ages organizing resource.",
    supportsGenerally: ["DIY organizing knowledge", "all-ages cultural infrastructure", "mission-relevant source curation"],
    doesNotEstablish: ["coverage of WOW List", "formal partnership", "platform adoption"]
  },
  {
    id: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017",
    title: "Meow Wolf Creates $100,000 Annual Fund To Support DIY Spaces",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    ...sourceDefaults,
    preservationStatus: "archived",
    publishedAt: "2017-01-01",
    archiveUrl: "https://web.archive.org/web/20170312084829/https://meowwolf.com/DIY/",
    preferredPublicUrl: "archive",
    publicCitation: "Meow Wolf, '$100,000 Annual Fund To Support DIY Spaces,' 2017.",
    publicNote: "WOW List reposted the fund announcement as cultural-space infrastructure news.",
    supportsGenerally: ["DIY-space funding context", "cultural-space infrastructure", "mission-relevant source curation"],
    doesNotEstablish: ["WOW List involvement in the fund", "formal partnership", "funding causation"]
  },
  {
    id: "SRC-WOWLIST-KQED-GHOST-SHIP-2016",
    title: "Hundreds Mourn the Victims of the Ghost Ship Fire in Oakland",
    organization: "KQED",
    kind: "institutional-web-page",
    ...sourceDefaults,
    publishedAt: "2016-12-05",
    canonicalUrl: "https://www.youtube.com/watch?v=g7zIdDeRVjU",
    preferredPublicUrl: "canonical",
    publicCitation: "KQED, 'Hundreds Mourn the Victims of the Ghost Ship Fire in Oakland,' December 2016.",
    publicNote: "WOW List circulated the public-mourning record alongside event, mutual-aid, and cultural-space safety information.",
    supportsGenerally: ["community mourning", "cultural-space safety context", "mission-relevant source curation"],
    doesNotEstablish: ["WOW List event ownership", "attendance", "causal impact"]
  },
  {
    id: "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015",
    title: "Allied Media Conference",
    organization: "Allied Media Projects",
    kind: "archived-web-capture",
    ...sourceDefaults,
    preservationStatus: "archived",
    capturedAt: "2015-04-25",
    archiveUrl: "https://web.archive.org/web/20150425020557/https://www.alliedmedia.org/amc",
    preferredPublicUrl: "archive",
    publicCitation: "Allied Media Projects, Allied Media Conference archive, 2015.",
    publicNote: "WOW List publicly announced its planned presence at the participatory-media gathering.",
    supportsGenerally: ["participatory-media peer context", "public project convening", "mission-relevant source curation"],
    doesNotEstablish: ["conference presentation", "formal partnership", "attendance outcome"]
  },
  {
    id: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
    title: "popular.vote WOW List event-sharing surface",
    organization: "WOW List",
    kind: "archived-web-capture",
    ...sourceDefaults,
    preservationStatus: "archived",
    capturedAt: "2016-12-11",
    archiveUrl: "https://web.archive.org/web/20161211233030/http://popular.vote/",
    preferredPublicUrl: "archive",
    publicCitation: "popular.vote archived project surface, December 11, 2016.",
    publicNote: "The capture identifies a WOW List event-sharing adaptation for marches, meetings, and in-person connection.",
    supportsGenerally: ["rapid civic coordination surface", "WOW List product continuity", "event contribution and updates"],
    doesNotEstablish: ["participation totals", "complete team ownership", "event attendance", "causal impact"]
  },
  {
    id: "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
    title: "WOW List first recovered authored post",
    organization: "WOW List",
    kind: "institutional-social-post",
    ...sourceDefaults,
    publishedAt: "2014-02-12",
    canonicalUrl: "https://x.com/wowlist/status/433671630837919744",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List, first recovered authored post, February 12, 2014.",
    publicNote: "The post credits Richard and Jamie and connects the project to calendars made at Sunday Dinner.",
    supportsGenerally: ["public Jamie attribution", "shared credit with Richard", "Sunday Dinner provenance", "WOW List project continuity"],
    doesNotEstablish: ["sole authorship", "complete collaborator roster", "platform scale", "current availability"]
  },
  {
    id: "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
    title: "WOW List public product-support thread",
    organization: "WOW List",
    kind: "institutional-social-post",
    ...sourceDefaults,
    publishedAt: "2016-09-01",
    canonicalUrl: "https://x.com/wowlist/status/771457416298921985",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List public product-support thread, September 1, 2016.",
    publicNote: "The thread describes the project as growing from Sunday Dinner and explains historical user workflows.",
    supportsGenerally: ["Sunday Dinner provenance", "DIY community-calendar framing", "join flow", "event publishing", "profiles and followed calendars"],
    doesNotEstablish: ["current service availability", "complete feature history", "individual authorship of every platform component"]
  },
  {
    id: "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
    title: "SHELBY'S WOWLIST TUTORIAL - for my new fave events website",
    organization: "Shelby Turner / YouTube",
    author: "Shelby Turner",
    kind: "institutional-web-page",
    ...sourceDefaults,
    publishedAt: "2015-08-14",
    canonicalUrl: "https://www.youtube.com/watch?v=nQg47LtixPI",
    preferredPublicUrl: "canonical",
    publicCitation: "Shelby Turner, 'SHELBY'S WOWLIST TUTORIAL - for my new fave events website,' YouTube, 2015.",
    publicNote: "Public video metadata and the account post identify an independently published WOW List tutorial.",
    supportsGenerally: ["independent public tutorial", "organizer-facing onboarding", "historical product use"],
    doesNotEstablish: ["complete tutorial contents without transcript review", "platform-wide adoption", "formal partnership", "Jamie's authorship", "current product availability"]
  },
  {
    id: "SRC-WOWLIST-SBDIY-ADOPTION",
    title: "Santa Barbara DIY resource page",
    organization: "Santa Barbara DIY",
    kind: "institutional-web-page",
    ...sourceDefaults,
    canonicalUrl: "https://www.sbdiy.org/",
    preferredPublicUrl: "canonical",
    publicCitation: "Santa Barbara DIY resource page, accessed July 15, 2026.",
    publicNote: "The page directs visitors to add events to its WOW List calendar and links the corresponding WOW List community.",
    supportsGenerally: ["external organizer adoption", "local calendar publishing", "public link to a WOW List community"],
    doesNotEstablish: ["current WOW List availability", "usage volume", "formal partnership", "Jamie's individual role", "city-ecosystem scale"]
  },
  {
    id: "SRC-KCTH-PINNED-2018",
    title: "KC Town Hall pinned project-framing post",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    ...sourceDefaults,
    publishedAt: "2018-07-02",
    canonicalUrl: "https://x.com/KCTownHall/status/1013796430103785472",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall pinned project-framing post, July 2, 2018.",
    publicNote: "The post frames the project as participatory restoration of a neighborhood resource and cultural center.",
    supportsGenerally: ["public project framing", "participatory restoration intent", "neighborhood cultural-center intent"],
    doesNotEstablish: ["project completion", "funding receipt", "individual authorship", "sole credit"]
  },
  ...kcTownHallExternalEngagement.map((event): SourceRecord => ({
    id: `SRC-KCTH-SOCIAL-${event.key}`,
    title: `${event.name} public ${event.interaction} involving KC Town Hall`,
    organization: event.key === "COMMUNITY-PARTNER-2019" ? "Community partner public account" : "Public-official account",
    kind: event.key === "COMMUNITY-PARTNER-2019" ? "institutional-social-post" : "government-social-post",
    ...sourceDefaults,
    publishedAt: event.publishedAt,
    canonicalUrl: `https://x.com/${event.handle.slice(1)}/status/${event.statusId}`,
    preferredPublicUrl: "canonical",
    publicCitation: `${event.name}, public ${event.interaction} involving KC Town Hall, ${event.publishedAt}.`,
    publicNote: `The post concerns ${event.topic}.`,
    supportsGenerally: [`public acknowledgment of ${event.topic}`, "KC Town Hall account engagement"],
    doesNotEstablish: ["individual authorship of KC Town Hall posts", "project completion", "receipt of appropriated funds", "sole individual credit"]
  })),
  ...kcSpacesFundHighlights.map((event): SourceRecord => ({
    id: `SRC-KCSF-HIGHLIGHT-${event.key}`,
    title: `KC Spaces Fund public grantee highlight: ${event.name}`,
    organization: "KC Spaces Fund",
    kind: "institutional-social-post",
    ...sourceDefaults,
    publishedAt: event.publishedAt,
    canonicalUrl: `https://x.com/KCSpacesFund/status/${event.statusId}`,
    preferredPublicUrl: "canonical",
    publicCitation: `KC Spaces Fund public #FUNDED highlight for ${event.name}, ${event.publishedAt}.`,
    publicNote: "The post is retained as a public campaign-outcome record without exposing applicant materials.",
    supportsGenerally: [`public #FUNDED highlight naming ${event.name}`, "campaign outcome communication"],
    doesNotEstablish: ["complete grantee list", "grant-selection process", "individual post authorship", "Jamie's role as organizer or decision-maker"]
  })),
  {
    id: "SRC-NYCAC-DOCUMENT-JOURNAL-2018",
    title: "Taking back New York City's nightlife",
    organization: "Document Journal",
    author: "Daisy Prince",
    kind: "published-article",
    ...sourceDefaults,
    publishedAt: "2018-02-27",
    canonicalUrl: "https://www.documentjournal.com/2018/02/taking-back-new-york-citys-nightlife/",
    preferredPublicUrl: "canonical",
    publicCitation: "Daisy Prince, 'Taking back New York City's nightlife,' Document Journal, February 27, 2018.",
    publicNote: "The article identifies Jamie and Olympia Kazi with NYC Artist Coalition and misspells Jamie's surname as Burkhart.",
    supportsGenerally: ["Jamie identification with NYC Artist Coalition", "Olympia Kazi identification and direct quotation", "Let NYC Dance public context", "collective nightlife advocacy"],
    doesNotEstablish: ["individual authorship of @NYCArtC posts", "Jamie's sole founding role", "Olympia Kazi's sole control of the account", "sole causation of policy outcomes"]
  }
];

export const socialArchiveClaims: ClaimRecord[] = [
  {
    id: "CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT",
    project: "callnyc",
    internalClaim: "A full-population disposition pass recovered attributable public engagement with CallNYC by at least 19 distinct accounts belonging to serving 2016 New York City Council members; 71 recognition posts connected 26 Council handles to 61 issue pages.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "Public records show CallNYC was reposted or directly discussed by at least 19 serving Council member accounts, including six member-authored posts or replies. This is a recovered lower bound, not an endorsement or complete lifetime count.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
    evidence: [
      { sourceId: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", relationship: "direct-support", supports: ["full-population disposition method", "71 recognition posts", "26 Council handles", "61 issue pages", "19 distinct member reposters", "six member-authored interactions"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28", relationship: "corroborating", supports: ["2016 service status of the 19 named Council members"], confidence: "high", renderCitation: true },
      ...callNycRepostSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["one named Council-member account in a public CallNYC repost list"], confidence: "high" as const, renderCitation: false })),
      ...callNycAuthoredSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["one Council-member-authored CallNYC interaction"], confidence: "high" as const, renderCitation: false }))
    ],
    boundaries: ["Present 19 as a recovered lower bound, not a complete lifetime count.", "Exclude likes and original-author metrics on external reposts; do not treat interaction as endorsement.", "Keep CallNYC archived, unofficial, and independent."],
    antiClaims: ["Exactly 19 Council members ever engaged", "Nineteen Council members formally endorsed CallNYC", "The Council adopted CallNYC", "Likes were audited", "CallNYC was an official City service"],
    researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT"],
    reviewedAt: socialArchiveReviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
  },
  {
    id: "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY",
    project: "nyc-artist-coalition",
    internalClaim: "The shared @NYCArtC identity sustained public communication across Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC; a bounded review recovered authored mentions by at least six serving Council member accounts.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "The shared @NYCArtC identity carried Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC across multiple policy cycles. At least six serving Council member accounts authored posts mentioning it; individual coalition-post authorship remains unattributed.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
    evidence: [
      { sourceId: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", relationship: "direct-support", supports: ["shared campaign identity", "bounded search method", "six-member lower bound", "collective authorship boundary"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYCAC-X-PROFILE", relationship: "direct-support", supports: ["four campaigns named in the profile", "account continuity"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-MEMBERS-LEGISLATIVE-RECORD-2019", relationship: "corroborating", supports: ["Council service status within the relevant term"], confidence: "high", renderCitation: false },
      ...nycacMentionSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["one serving Council-member account authored a public @NYCArtC mention"], confidence: "high" as const, renderCitation: false })),
      { sourceId: "SRC-NYCAC-DOCUMENT-JOURNAL-2018", relationship: "context", supports: ["Jamie and Olympia Kazi identified separately with the coalition", "collective movement context"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Do not assign individual authorship of coalition-account posts without post-level evidence.", "Present six as a lower bound from bounded searches.", "Keep campaign and policy outcomes collective."],
    antiClaims: ["Jamie authored every @NYCArtC post", "Olympia Kazi authored every @NYCArtC post", "Exactly six Council members ever engaged", "Council interaction proves endorsement of every coalition position"],
    researchInquiryIds: ["INQ-SOCIAL-NYCAC-ENGAGEMENT", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
    reviewedAt: socialArchiveReviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
  },
  {
    id: "CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie states that he established the project accounts as durable public identities that teammates could steward over time.",
    status: "use-with-care",
    projections: [{ key: "archive-note", text: "Jamie reports establishing shared public project identities that collaborators could sustain and use over time.", status: "hold", citationRequired: false, surfaces: [] }],
    evidence: [{ sourceId: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", relationship: "direct-support", supports: ["Jamie's first-person account-establishment statement", "collective authorship boundary"], confidence: "moderate", renderCitation: false }, { sourceId: "SRC-NYCAC-DOCUMENT-JOURNAL-2018", relationship: "context", supports: ["Jamie and Olympia Kazi identified separately with the coalition"], confidence: "high", renderCitation: false }],
    boundaries: ["Retain as first-person project history until setup records, administrator history, or collaborator confirmation adds corroboration.", "Never turn account creation into individual authorship of collective posts."],
    antiClaims: ["Jamie wrote every project post", "Jamie alone controlled the accounts throughout their histories", "Olympia Kazi authored specific @NYCArtC posts without corroboration"],
    researchInquiryIds: ["INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
    reviewedAt: socialArchiveReviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-WOWLIST-HISTORICAL-SCALE",
    project: "wowlist",
    internalClaim: "A close read of archived WOW List production database snapshots found 1,846 users, 16,142 posts/events, and 35 city/region entries meeting the conservative threshold of at least 50 geocoded posts/events.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "case-study", text: "Archived production records support 1,800+ users, 16,000+ posts/events, and 35+ city scenes that each met a historical threshold of at least 50 geocoded posts/events. These are historical aggregate records, not official chapters, current activity, or a complete adoption census.", status: "active", citationRequired: true, surfaces: ["/work/wowlist"] },
      { key: "homepage", text: "WOWList supported 1,800+ historical users, 16,000+ historical posts/events, and use across 35+ city scenes that each met a historical threshold of at least 50 geocoded posts/events.", status: "active", citationRequired: false, surfaces: ["/"] },
      { key: "resume-html", text: "WOWList supported 1,800+ historical users, 16,000+ historical posts/events, and use across 35+ city scenes that each met a historical threshold of at least 50 geocoded posts/events.", status: "active", citationRequired: false, surfaces: ["/resume"] },
      { key: "resume-pdf", text: "Jamie co-built WOWList with Richard Caceres; historical production records show use across 35+ city scenes, each with at least 50 geocoded posts/events.", status: "active", citationRequired: false, surfaces: ["/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"] },
      { key: "technical-operations", text: "WOWList supported 1,800+ historical users, 16,000+ historical posts/events, and use across 35+ city scenes that each met a historical threshold of at least 50 geocoded posts/events.", status: "active", citationRequired: false, surfaces: ["/work/technical-operations"] },
      { key: "work-card", text: "Historical records show WOWList use across 35+ city scenes, each with 50+ geocoded posts/events.", status: "active", citationRequired: false, surfaces: ["/work"] }
    ],
    evidence: [
      { sourceId: "SRC-WOWLIST-PRODUCTION-ARCHIVE-ANALYSIS-2026-07-15", relationship: "direct-support", supports: ["1,846 users", "16,142 posts/events", "35 city/region entries with at least 50 geocoded posts/events", "conservative active-scene threshold"], locator: "Executive summary, archive metrics, city-activity threshold, and claim guidance sections", confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-PRODUCTION-ARCHIVE-PUBLIC-SUMMARY-2026-07-15", relationship: "corroborating", supports: ["rounded public aggregates", "public threshold definition", "public-use boundaries"], locator: "Protected historical scale section", confidence: "high", renderCitation: true }
    ],
    boundaries: ["Treat the figures as historical aggregate database records.", "Define the 35+ city-scene figure by the documented threshold of at least 50 geocoded posts/events.", "Keep raw user, contact, geolocation, and community records protected.", "Credit the platform and adoption as collective work."],
    antiClaims: ["35 official city chapters", "35 communities are currently active", "Every database user was a unique active person", "Jamie alone caused adoption", "The archived database proves current availability"],
    researchInquiryIds: ["INQ-WOWLIST-PRODUCTION-ARCHIVE-SCALE"],
    reviewedAt: socialArchiveReviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archived production-database review"]
  },
  {
    id: "CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT",
    project: "wowlist",
    internalClaim: "A full pass over all 38 profile-counted @wowlist records shows social media functioning as part of the product and community practice: shared origin, direct support, community-created onboarding, event distribution, mission-relevant source curation, rapid civic coordination, and bounded third-party use.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "The shared project's 38 records displayed by @wowlist at review time preserve its origin and show the account providing user support, onboarding, event distribution, and rapid civic coordination. A bounded incoming review found 10 mission-relevant outside accounts; nine independently shared a WOW List URL. That is evidence of public use and distribution, not total adoption, attendance, or impact.", status: "active", citationRequired: true, surfaces: ["/work/wowlist"] }],
    evidence: [
      { sourceId: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", relationship: "direct-support", supports: ["authenticated collection method", "complete displayed-population reconciliation", "bounded public stakeholder review", "explicit stopping conditions and limitations"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-FULL-POPULATION-2026-07-15", relationship: "direct-support", supports: ["38-of-38 population recovery", "record-type and posted-link inventory", "bounded stakeholder sample", "dated interaction snapshot"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SUNDAY-DINNER-POST-2014", relationship: "direct-support", supports: ["Richard and Jamie attribution", "Sunday Dinner calendar provenance"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016", relationship: "direct-support", supports: ["DIY community-calendar framing", "historical organizer workflows"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SHELBY-TUTORIAL-2015", relationship: "direct-support", supports: ["independent organizer-facing tutorial"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SBDIY-ADOPTION", relationship: "direct-support", supports: ["external local-calendar use"], confidence: "high", renderCitation: true },
      ...wowListStakeholderSourceIds.map((sourceId) => ({ sourceId, relationship: "corroborating" as const, supports: ["one bounded public-use, distribution, response, or peer-attribution signal"], confidence: "high" as const, renderCitation: false })),
      { sourceId: "SRC-WOWLIST-GOOD-TIMES-ZINES-2015", relationship: "context", supports: ["DIY documentation and cross-place connection context"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015", relationship: "context", supports: ["all-ages organizing knowledge context"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017", relationship: "context", supports: ["DIY cultural-space infrastructure context"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-KQED-GHOST-SHIP-2016", relationship: "context", supports: ["cultural-space safety and public mourning context"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015", relationship: "context", supports: ["participatory-media peer context"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016", relationship: "direct-support", supports: ["rapid civic-coordination adaptation", "WOW List product continuity"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Keep credit shared with Richard, Sunday Dinner participants, organizers, and other collaborators.", "Describe historical workflows rather than current service availability.", "Treat 10 third-party accounts as a bounded reception sample, not a complete adoption census.", "Treat 12 records with displayed interactions and the 2 reply, 20 repost, and 21 like snapshot as mutable interface observations, not unique people, reach, conversion, attendance, endorsement, or impact."],
    antiClaims: ["Jamie alone created WOW List", "Jamie authored every @wowlist post", "The account is a complete product archive", "The platform is currently operating", "Exactly 10 external accounts used WOW List", "Follower or interaction counts measure adoption or impact"],
    researchInquiryIds: ["INQ-SOCIAL-WOWLIST-ARCHIVE"],
    reviewedAt: socialArchiveReviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
  },
  {
    id: "CLM-KCTH-SOCIAL-SERVICE-REPORTING",
    project: "kc-town-hall",
    internalClaim: "The complete surviving KC Town Hall profile population documents a shared public resident-reporting and collaborator-coordination channel: 100 of 183 records concern resident tire intake, pickup coordination, result reporting, or program continuity. A bounded incoming review separately recovers direct public responses from three then-sitting Kansas City Council member accounts.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "The shared KC Town Hall account gave residents a public channel for reporting discarded tires and gave project collaborators a place to coordinate pickups, report results, and continue the program. In the complete surviving profile population, 100 of 183 records document that workflow from 2019 through 2022. A bounded incoming review also recovered direct public responses from three then-sitting Council member accounts. These records establish shared project operations and public dialogue, not individual authorship or field work by Jamie, an audited service total, endorsement, or impact.", status: "active", citationRequired: true, surfaces: ["/work/kc-town-hall"] }],
    evidence: [
      { sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["all 183 surviving profile records", "100 tire-workflow records", "request-to-action reporting pattern", "dated public-reposter audit"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29", relationship: "direct-support", supports: ["direct quote-post response to @KCTownHall"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29", relationship: "direct-support", supports: ["direct public reply to @KCTownHall"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KCTH-SOCIAL-MELISSA-ROBINSON-2020", relationship: "direct-support", supports: ["direct public reply recognizing neighborhood work"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KCMO-COUNCIL-ROSTER-2018", relationship: "corroborating", supports: ["Quinton Lucas and Jolie Justus serving as Council members in the applicable term"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS", relationship: "corroborating", supports: ["Melissa Robinson's Council service in August 2020"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Treat the account as a shared project identity rather than proof that Jamie authored every record.", "One hundred records describe a recurring public workflow, not one hundred completed pickups, households, or audited service units.", "Keep outbound mentions, project-selected reposts, public-reposter appearances, direct outside-authored responses, and mutable reaction counters as separate relationship classes.", "Direct responses establish public interaction, not endorsement, partnership, adoption, or resulting action.", "Do not expose resident addresses, phone numbers, direct messages, private analytics, or private service records."],
    antiClaims: ["Jamie alone authored the account or delivered every pickup", "The social timeline is an audited service ledger", "One hundred records equal one hundred completed pickups or households", "Three Council members endorsed KC Town Hall", "Seven Council-member account appearances prove partnership or adoption", "Social activity proves project completion or funding receipt"],
    researchInquiryIds: ["INQ-SOCIAL-KCTH-ARCHIVE", "INQ-KCTH-FULL-POPULATION-2026", "INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES", "INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
    reviewedAt: socialArchiveReviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
  },
  {
    id: "CLM-KCSF-SOCIAL-GRANTEE-HIGHLIGHTS",
    project: "kc-spaces-fund",
    internalClaim: "The recovered KC Spaces Fund timeline contains at least 11 distinct public #FUNDED grantee highlights between April and July 2020.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "KC Spaces Fund's recovered public timeline includes at least 11 distinct #FUNDED grantee highlights from April through July 2020.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: kcSpacesHighlightSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support", supports: ["one distinct named public #FUNDED grantee highlight"], confidence: "high", renderCitation: false })),
    boundaries: ["Present 11 as a lower bound, not a complete audited grantee count.", "Keep public organizer credit with the campaign's named organizers.", "Do not infer selection, disbursement, account authorship, or a public-organizer role for Jamie."],
    antiClaims: ["Exactly 11 grantees received support", "Jamie selected the grantees", "Jamie authored every post", "Jamie ran the fundraiser", "The social timeline is a complete grant ledger"],
    researchInquiryIds: ["INQ-SOCIAL-KCSF-ARCHIVE", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
    reviewedAt: socialArchiveReviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
  }
];

export const socialArchiveResearchInquiries: ResearchInquiry[] = [
  {
    id: "INQ-CALLNYC-COUNCIL-ENGAGEMENT",
    project: "callnyc",
    question: "Which verified NYC Council-member accounts engaged with CallNYC, through which interaction types, and with what reproducible count?",
    methods: ["Reconciled authenticated Posts and Replies views and bounded searches against the 110-post profile counter.", "Opened public repost lists for all CallNYC-authored or reply posts with displayed reposts and deduplicated account identities.", "Cross-checked named people against an official 2016 Council roster and separated reposts from member-authored posts and replies.", "Excluded likes and metrics on external posts reposted by CallNYC."],
    runAt: socialArchiveReviewedAt,
    resultStatus: "partially-recovered",
    findings: ["The 110 profile-counted slots resolve to 107 recovered content objects and three explicit not-recovered dispositions.", "Nineteen distinct serving Council-member accounts appeared in current public CallNYC repost lists.", "Six Council-member-authored posts or replies explicitly involved CallNYC.", "Seventy-one recognition posts connected 26 Council handles to 61 distinct CallNYC issue pages."],
    limitations: ["One hundred percent population disposition coverage is not one hundred percent content recovery.", "Deleted, private, suspended, hidden, or renamed accounts and changing public repost lists prevent a complete lifetime census.", "Interaction does not establish endorsement, formal Council adoption, official-service status, or individual post authorship."],
    sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28", ...callNycRepostSourceIds, ...callNycAuthoredSourceIds],
    publicSummary: "A full-population disposition pass recovered attributable CallNYC interactions from at least 19 serving 2016 Council member accounts; 107 of 110 profile-counted content objects were recovered, while three remain unresolved."
  },
  {
    id: "INQ-SOCIAL-NYCAC-ENGAGEMENT",
    project: "nyc-artist-coalition",
    question: "What attributable engagement with @NYCArtC can be recovered without converting bounded searches into a false complete census?",
    methods: ["Preserved named authored mentions, replies, and public post URLs with dates.", "Cross-checked public-office status at the interaction date.", "Separated campaign-tagged publication patterns from incoming engagement and individual post authorship."],
    runAt: socialArchiveReviewedAt,
    resultStatus: "partially-recovered",
    findings: ["At least six serving Council member accounts authored public posts mentioning @NYCArtC.", "Two bounded campaign-tag searches recovered 295 posts, while external-mention searches recovered 202 posts from 2017-2019 and 212 from 2020-2025.", "The shared account sustained public communication across four named campaigns."],
    limitations: ["Search caps, ranking, deleted posts, private accounts, suspensions, and renames prevent a complete lifetime census.", "Public interaction does not prove endorsement or post authorship."],
    sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", "SRC-NYCAC-X-PROFILE", ...nycacMentionSourceIds],
    publicSummary: "A bounded review recovered authored @NYCArtC mentions by at least six serving Council member accounts; the complete interaction census remains open."
  },
  {
    id: "INQ-WOWLIST-PRODUCTION-ARCHIVE-SCALE",
    project: "wowlist",
    question: "What historical product scale can the archived WOW List production database support without exposing private rows or turning geocoded coverage into official chapters?",
    methods: ["Close-read the public-safe archive analysis and its database-derived metrics.", "Separated exact database counts from rounded public wording.", "Defined the active-city threshold before selecting the conservative public figure.", "Excluded raw users, contacts, geolocation rows, organizer lists, and uploaded media."],
    runAt: socialArchiveReviewedAt,
    resultStatus: "recovered",
    findings: ["The latest analyzed snapshot contains 1,846 users and 16,142 posts/events.", "Thirty-five city/region entries contained at least 50 geocoded posts/events, the selected conservative active-scene threshold.", "Broader geographic coverage exists but is deliberately excluded from the public scale claim."],
    limitations: ["The analysis does not establish current availability, official chapters, unique active humans, or Jamie's sole causation of adoption.", "The underlying database contains protected user, contact, geolocation, and community records that must not enter the public repository."],
    sourceIds: ["SRC-WOWLIST-PRODUCTION-ARCHIVE-ANALYSIS-2026-07-15"],
    publicSummary: "A protected production-database analysis supports a bounded historical scale claim: 1,800+ historical users, 16,000+ historical posts/events, and 35+ city scenes that each met a documented historical threshold of at least 50 geocoded posts/events."
  },
  {
    id: "INQ-SOCIAL-WOWLIST-ARCHIVE",
    project: "wowlist",
    question: "What does a full-population pass over @wowlist establish about provenance, product use, posted sources, organizer support, public distribution, and bounded stakeholder response?",
    methods: ["Reconciled authenticated Posts and Replies views into a 38-object status census and stopped after repeated no-growth passes.", "Separated 16 original posts, six replies, and 16 reposted external posts.", "Inventoried posted URLs across every record and retained a minimized per-record posted-link count.", "Classified mission-relevant source articles and product adaptations without converting circulated sources into coverage of WOW List.", "Ran bounded searches for @wowlist, @WOWListNYC, and wowlist.org references, excluding self-documentation from the 10-account third-party sample.", "Recorded only public interface counters for the 22 account-authored records and kept them out of impact claims."],
    runAt: socialArchiveReviewedAt,
    resultStatus: "recovered",
    findings: ["All 38 profile-counted records were recovered from authenticated Posts and Replies surfaces: 16 original posts, six replies, and 16 reposted external posts.", "Thirty-one records contain 35 posted-link occurrences, all retained as numeric row-level dispositions; significant sources include DIY documentation, all-ages organizing, cultural-space funding and safety, participatory media, and the popular.vote civic adaptation.", "The first recovered authored post credits Richard and Jamie and connects the project to Sunday Dinner calendars.", "The account documents historical join, event-publishing, profile, followed-calendar, weekly-email, and public-onboarding workflows.", "A bounded incoming review recovered 10 mission-relevant third-party accounts: seven DIY arts and music, one calendar-community, one neighborhood-civic, and one creative-technology peer; nine independently posted a WOW List URL.", "Twelve of 22 account-authored records displayed at least one public interaction on July 15, 2026; the snapshot totaled two replies, 20 reposts, and 21 likes."],
    limitations: ["Complete recovery of the profile-counted population does not recover deleted, private, unindexed, or otherwise absent activity outside the displayed count.", "Reposts document distribution context but not Jamie's authorship or endorsement of every source.", "Bounded search results are not a complete stakeholder or adoption census.", "Displayed counters are mutable events, not unique people, reach, conversion, attendance, endorsement, or impact."],
    sourceIds: ["SRC-WOWLIST-FULL-POPULATION-2026-07-15", "SRC-WOWLIST-X-PROFILE", "SRC-WOWLIST-SUNDAY-DINNER-POST-2014", "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016", "SRC-WOWLIST-SHELBY-TUTORIAL-2015", "SRC-WOWLIST-SBDIY-ADOPTION", ...wowListStakeholderSourceIds, "SRC-WOWLIST-GOOD-TIMES-ZINES-2015", "SRC-WOWLIST-GRASSTRONAUT-HOMEWORK-2015", "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2017", "SRC-WOWLIST-KQED-GHOST-SHIP-2016", "SRC-WOWLIST-ALLIED-MEDIA-CONFERENCE-2015", "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016"],
    publicSummary: "All 38 profile-counted @wowlist records were recovered and close-read; the corpus preserves shared provenance, product support, 35 posted-link occurrences, mission-relevant source curation, and a bounded 10-account external-use sample."
  },
  {
    id: "INQ-SOCIAL-KCTH-ARCHIVE",
    project: "kc-town-hall",
    question: "What public operating, civic-information, source-distribution, and stakeholder-dialogue patterns are recoverable from the complete surviving @KCTownHall population without exposing contact data or overstating authorship, service outcomes, or impact?",
    methods: ["Used the authenticated profile's displayed 183-post count as the population control.", "Reconciled the Posts and Replies surfaces by canonical status ID, recovering 142 account posts, 13 account replies, and 28 reposts with no unresolved slots.", "Classified all records by relationship, primary theme, public mentions, hashtags, posted destinations, media signals, and metric ownership.", "Resolved 31 unique short URLs to 20 public destinations and close-read the highest-signal mission sources.", "Audited all 40 account-authored statuses displaying reposts and kept public-reposter appearances separate from direct responses, outbound mentions, and source-post metrics.", "Excluded raw post text, phone numbers, addresses, private messages, credentials, session data, and private analytics."],
    runAt: socialArchiveReviewedAt,
    resultStatus: "recovered",
    findings: ["All 183 items in the surviving July 2026 profile population were recovered: 142 account posts, 13 account replies, and 28 reposts from 16 public source accounts.", "One hundred records concern resident tire intake, pickup coordination, result reporting, or program continuity.", "The remaining 83 records comprise 27 neighborhood-culture and community records, 26 civic-information and service-routing records, 16 Town Hall development and participation records, 12 racial-justice documentation records, and two pandemic-resource records.", "The corpus contains 133 posted short-link occurrences, 31 unique short URLs, and 20 resolved destinations, including voting, housing, transit, neighborhood-business, participation, and pandemic resources.", "A bounded incoming review recovered direct public responses from three then-sitting Council member accounts; the corpus's narrower April 2019 exchange contains two such responses.", "At the July 2026 snapshot, 77 of 155 account-authored statuses displayed at least one reaction, totaling 22 replies, 70 reposts, and 174 likes; source-post metrics on the 28 reposts are excluded."],
    limitations: ["Complete recovery of the surviving profile population is not a platform export, deletion history, or proof that no earlier item was deleted.", "The shared account does not establish individual post authorship or assign every field action to Jamie.", "The public timeline is not an independently audited service ledger, historical analytics export, funding record, or proof of project completion.", "Current reaction counters are mutable interface observations, not unique people, reach, endorsement, adoption, conversion, causality, or impact.", "Historical contact details and private service records are deliberately omitted."],
    sourceIds: ["SRC-X-KCTH-FULL-POPULATION-AUDIT-2026", "SRC-KCTH-PINNED-2018", "SRC-X-KCTH-TIRES-LAUNCH-2019-05-03", "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29", "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29", "SRC-KCTH-SOCIAL-MELISSA-ROBINSON-2020", "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018", "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", "SRC-KANSAS-CITY-STAR-LEONS-THRIFTWAY", "SRC-CURBED-RENT-RELIEF-ACT-2018"],
    publicSummary: "All 183 surviving KC Town Hall records were recovered and classified, showing a shared public identity used for recurring neighborhood service, civic information, participation, culture, care, and bounded dialogue with public officials."
  },
  {
    id: "INQ-SOCIAL-KCSF-ARCHIVE",
    project: "kc-spaces-fund",
    question: "What campaign operations and outcomes are publicly recoverable from @KCSpacesFund while preserving organizer credit and applicant privacy?",
    methods: ["Reviewed the recoverable profile timeline chronologically.", "Counted distinct named #FUNDED highlights without inferring a complete grantee ledger.", "Excluded private application, donor, subscriber, payment, and selection-process materials."],
    runAt: socialArchiveReviewedAt,
    resultStatus: "partially-recovered",
    findings: ["Thirty-four of 35 displayed profile posts were recovered.", "At least 11 distinct named #FUNDED grantee highlights were published between April and July 2020.", "The account also documented application timing, rolling $500 grant framing, geographic expansion, and a print fundraiser."],
    limitations: ["The timeline does not establish the complete grantee count or grant-selection process.", "Individual account authorship and Jamie's role in fundraising or decisions are not established."],
    sourceIds: ["SRC-KCSF-X-PROFILE", ...kcSpacesHighlightSourceIds],
    publicSummary: "The recovered public timeline preserves at least 11 named grantee highlights while leaving selection and authorship explicitly unassigned."
  },
  {
    id: "INQ-SOCIAL-ACCOUNT-AUTHORSHIP",
    project: "portfolio-social-archive",
    question: "What public-safe evidence can corroborate Jamie's establishment of project accounts and the later collaborator stewardship of shared identities?",
    methods: ["Captured Jamie's first-person statement separately from public profile facts.", "Reviewed public account dates, campaign bios, cross-platform links, and sustained collaborator participation without inferring administrator history.", "Identified setup records, minimized account-history exports, or collaborator confirmation as the next evidence layer."],
    runAt: socialArchiveReviewedAt,
    resultStatus: "inconclusive",
    findings: ["Jamie states that he established the project accounts as identity systems for shared use.", "The public record supports durable shared identity and sustained collaborator participation.", "The public record does not expose creator, administrator, access, handoff, or individual-post authorship history."],
    limitations: ["Participant memory is not a platform-administration record.", "External collaborator mentions do not prove access to or authorship from a shared account.", "Any administrative export must be minimized so private security and personal data remain outside the repository."],
    sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", "SRC-NYCAC-X-PROFILE", "SRC-NYCAC-DOCUMENT-JOURNAL-2018"],
    publicSummary: "Jamie confirms establishing the project accounts, while shared-account authorship and handoff remain held pending corroboration."
  }
];
