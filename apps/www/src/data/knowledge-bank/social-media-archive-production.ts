import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated public social-media archival review"
];

export const projectSocialAccounts = [
  { projectId: "callnyc", projectLabel: "CallNYC", handle: "@CallNYCapp", accountUrl: "https://x.com/CallNYCapp", relationship: "dedicated", status: "recovered", snapshot: { posts: 110, followers: 69, following: 194 } },
  { projectId: "nyc-artist-coalition", projectLabel: "NYC Artist Coalition", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-coalition", status: "recovered", snapshot: { posts: 5124, followers: 1339, following: 569 } },
  { projectId: "fair-rent-nyc", projectLabel: "Fair Rent NYC", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "talks-not-raids", projectLabel: "Talks Not Raids", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "let-nyc-dance", projectLabel: "Let NYC Dance", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "save-nyc-spaces", projectLabel: "Save NYC Spaces", handle: "@NYCArtC", accountUrl: "https://x.com/NYCArtC", relationship: "shared-campaign", status: "recovered" },
  { projectId: "wowlist", projectLabel: "WOW List", handle: "@wowlist", accountUrl: "https://x.com/wowlist", relationship: "dedicated", status: "recovered", snapshot: { posts: 38, followers: 47, following: 57 } },
  { projectId: "sunday-dinner", projectLabel: "Sunday Dinner / 196", relationship: "adjacent", status: "not-recovered", adjacentAccount: "@wowlist" },
  { projectId: "kc-town-hall", projectLabel: "KC Town Hall", handle: "@KCTownHall", accountUrl: "https://x.com/KCTownHall", relationship: "dedicated", status: "recovered", snapshot: { posts: 183, followers: 132, following: 225 } },
  { projectId: "kc-spaces-fund", projectLabel: "KC Spaces Fund", handle: "@KCSpacesFund", accountUrl: "https://x.com/KCSpacesFund", relationship: "dedicated", status: "recovered", snapshot: { posts: 35, followers: 21, following: 76 } },
  { projectId: "harry-j-epstein", projectLabel: "Harry J. Epstein Company", relationship: "not-recovered", status: "open-inquiry" },
  { projectId: "nter-chng", projectLabel: "NTER CHNG", relationship: "not-recovered", status: "open-inquiry" },
  { projectId: "source-backed-team-memory", projectLabel: "Source-Backed Team Memory", relationship: "not-recovered", status: "open-inquiry" }
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
  { key: "ANTONIO-REYNOSO", name: "Antonio Reynoso", handle: "@ReynosoBrooklyn", statusId: "753631998221033472" },
  { key: "RITCHIE-TORRES", name: "Ritchie Torres", handle: "@RitchieTorres", statusId: "724986599419875333" },
  { key: "ROSIE-MENDEZ", name: "Rosie Mendez", handle: "@RosieMendez", statusId: "733027856025047041" },
  { key: "STEVEN-MATTEO", name: "Steven Matteo", handle: "@StevenMatteo", statusId: "748532929802997760" },
  { key: "BEN-KALLOS", name: "Ben Kallos", handle: "@BenKallos", statusId: "724723473852059649" },
  { key: "HELEN-ROSENTHAL", name: "Helen Rosenthal", handle: "@HelenRosenthal", statusId: "723153082096345092" }
] as const;

export const callNycMemberAuthoredInteractions = [
  { key: "PETER-KOO", name: "Peter Koo", handle: "@CMPeterKoo", interaction: "wrapper post", statusId: "725422741160079360", publishedAt: "2016-04-27" },
  { key: "STEVEN-MATTEO", name: "Steven Matteo", handle: "@StevenMatteo", interaction: "reply", statusId: "727621921341358081", publishedAt: "2016-05-03" },
  { key: "RUBEN-WILLS", name: "Ruben Wills", handle: "@CM_RubenWills", interaction: "reply", statusId: "732717792097603584", publishedAt: "2016-05-17" },
  { key: "YDANIS-RODRIGUEZ", name: "Ydanis Rodriguez", handle: "@ydanis", interaction: "quote post", statusId: "733089563334299648", publishedAt: "2016-05-18" },
  { key: "ROSIE-MENDEZ", name: "Rosie Mendez", handle: "@RosieMendez", interaction: "quote post", statusId: "733410096915550208", publishedAt: "2016-05-18" },
  { key: "HELEN-ROSENTHAL", name: "Helen Rosenthal", handle: "@HelenRosenthal", interaction: "authored post", statusId: "780797474277511170", publishedAt: "2016-09-27" },
  { key: "MATHIEU-EUGENE", name: "Mathieu Eugene", handle: "@CMMathieuEugene", interaction: "quote post", statusId: "783305320508514304", publishedAt: "2016-10-04" },
  { key: "MARGARET-CHIN", name: "Margaret Chin", handle: "@CM_MargaretChin", interaction: "authored thanks", statusId: "884863588317442049", publishedAt: "2017-07-11" }
] as const;

export const nycArtistCoalitionCouncilInteractions = [
  { key: "ESPINAL-TOWN-HALL", name: "Rafael Espinal", handle: "@RLEspinal", statusId: "978604809493336065", publishedAt: "2018-03-27", missionRelevant: true, summary: "described welcoming the Nightlife Mayor with NYC Artist Coalition after a venue tour" },
  { key: "ESPINAL-CAMPAIGNS", name: "Rafael Espinal", handle: "@RLEspinal", statusId: "1098626837821997056", publishedAt: "2019-02-21", missionRelevant: true, summary: "credited the coalition while discussing Save NYC Spaces and Talks Not Raids" },
  { key: "LEVIN-HEARING", name: "Stephen Levin", handle: "@StephenLevin33", statusId: "1093220593317629952", publishedAt: "2019-02-06", missionRelevant: true, summary: "amplified a Council hearing on M.A.R.C.H. accountability" },
  { key: "LEVIN-TESTIMONY", name: "Stephen Levin", handle: "@StephenLevin33", statusId: "1095020293112979457", publishedAt: "2019-02-11", missionRelevant: true, summary: "thanked the coalition and venues after public testimony" },
  { key: "LEVIN-FAIR-RENT", name: "Stephen Levin", handle: "@StephenLevin33", statusId: "1336765371773173761", publishedAt: "2020-12-09", missionRelevant: true, summary: "invited the public to a coalition commercial-rent event" },
  { key: "MARK-LEVINE-REPLY", name: "Mark Levine", handle: "@MarkLevineNYC", statusId: "1241027587947876352", publishedAt: "2020-03-20", missionRelevant: true, summary: "answered the coalition account's question about emergency operating rules" },
  { key: "VAN-BRAMER-ARTS", name: "Jimmy Van Bramer", handle: "@JimmyVanBramer", statusId: "1320792543773282304", publishedAt: "2020-10-26", missionRelevant: true, summary: "included the coalition in public arts-and-culture advocacy" },
  { key: "BRANNAN-REPLY", name: "Justin Brannan", handle: "@JustinBrannan", statusId: "1167536258438115333", publishedAt: "2019-08-30", missionRelevant: false, summary: "replied directly to the coalition account in an unrelated transit thread" }
] as const;

export const olympiaKaziCoalitionIdentityPosts = [
  { key: "RELIEF-2020", statusId: "1243375751149346819", publishedAt: "2020-03-27", summary: "described a coalition COVID relief request for musicians, DJs, and grassroots cultural venues" },
  { key: "FAIR-RENT-2021", statusId: "1436442036249497600", publishedAt: "2021-09-10", summary: "mobilized participation in the Commercial Rent Stabilization hearing" },
  { key: "NIGHTLIFE-2022", statusId: "1516092153893691392", publishedAt: "2022-04-18", summary: "connected coalition work to a Council nightlife oversight hearing" }
] as const;

export const kcSpacesFundHighlights = [
  ["LATINO-ARTS", "Latino Arts Foundation", "1251553551454797830", "2020-04-18"],
  ["UNTUCK", "UN/TUCK Queer and Trans Collective", "1253445776224722945", "2020-04-23"],
  ["GETWOKE", "GetWoke", "1260590429730414592", "2020-05-13"],
  ["TWOCC", "Trans Women of Color Collective", "1262524545275244545", "2020-05-18"],
  ["BLACKBOX", "Blackbox on Troost", "1263599910781440000", "2020-05-21"],
  ["ONE-MIC", "One Mic Stand", "1263927272802746368", "2020-05-22"],
  ["FAREWELL", "Farewell Transmission", "1270549089076359174", "2020-06-10"],
  ["PARKER-2", "Parker 2", "1271219713188810753", "2020-06-11"],
  ["TEXTILE-ARTS", "Kansas City Textile Arts Center", "1272260009695551489", "2020-06-14"],
  ["SWAN", "SWAN", "1278061185871552512", "2020-06-30"],
  ["VULPES", "Vulpes Bastille", "1281300779266125826", "2020-07-09"]
] as const;

const profileSource = (
  id: string,
  title: string,
  organization: string,
  canonicalUrl: string,
  publicNote: string,
  supportsGenerally: string[]
): SourceRecord => ({
  id,
  title,
  organization,
  kind: "institutional-web-page",
  visibility: "public",
  preservationStatus: "live",
  accessedAt: reviewedAt,
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation: `${title}, authenticated public profile review, July 15, 2026.`,
  publicNote,
  supportsGenerally,
  doesNotEstablish: [
    "individual authorship of every post",
    "stable follower or post metrics",
    "complete lifetime engagement",
    "formal institutional endorsement"
  ]
});

const governmentPost = (
  id: string,
  title: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  supportsGenerally: string[]
): SourceRecord => ({
  id,
  title,
  organization: "Public official account",
  author,
  kind: "government-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: reviewedAt,
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote: "Counted as a dated public interaction by the historically attributable account, not as present-day office status or universal endorsement.",
  supportsGenerally,
  doesNotEstablish: [
    "formal adoption or endorsement",
    "a complete interaction history",
    "current officeholder status",
    "Jamie's authorship of the project account"
  ]
});

const institutionalPost = (
  id: string,
  title: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  supportsGenerally: string[],
  doesNotEstablish: string[] = []
): SourceRecord => ({
  id,
  title,
  author,
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: reviewedAt,
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote: "A public post establishes what the named account published; shared-account posts remain collectively authored unless separately attributed.",
  supportsGenerally,
  doesNotEstablish
});

const callNycRepostSources = callNycCouncilReposts.map<SourceRecord>((event) => ({
  id: `SRC-CALLNYC-REPOST-${event.key}`,
  title: `${event.name} in a public CallNYC repost list`,
  organization: "CallNYC / X public post activity",
  author: `${event.name} (${event.handle})`,
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  accessedAt: reviewedAt,
  canonicalUrl: `https://x.com/CallNYCapp/status/${event.statusId}/retweets`,
  preferredPublicUrl: "canonical",
  publicCitation: `${event.name}'s public account in the repost list for a CallNYC post, authenticated review on July 15, 2026.`,
  publicNote: "The public activity list visibly identified the account. Current handles can differ from the handle used when the interaction occurred.",
  supportsGenerally: ["one attributable public CallNYC repost", "historical Council-member-account engagement"],
  doesNotEstablish: ["formal endorsement", "current officeholder status", "the original interaction-time handle", "a complete lifetime engagement census"]
}));

const callNycAuthoredSources = callNycMemberAuthoredInteractions.map((event) =>
  governmentPost(
    `SRC-CALLNYC-AUTHORED-${event.key}`,
    `${event.name} ${event.interaction} involving CallNYC`,
    `${event.name} (${event.handle})`,
    event.publishedAt,
    `https://x.com/${event.handle.slice(1)}/status/${event.statusId}`,
    `${event.name}, public ${event.interaction} involving CallNYC, ${event.publishedAt}.`,
    ["an explicit Council-member-authored CallNYC interaction", event.interaction]
  )
);

const nycArtistCoalitionCouncilSources = nycArtistCoalitionCouncilInteractions.map((event) =>
  governmentPost(
    `SRC-NYCAC-COUNCIL-${event.key}`,
    `${event.name} interaction with NYC Artist Coalition`,
    `${event.name} (${event.handle})`,
    event.publishedAt,
    `https://x.com/${event.handle.slice(1)}/status/${event.statusId}`,
    `${event.name}, public interaction with NYC Artist Coalition, ${event.publishedAt}.`,
    ["direct account engagement", event.summary, event.missionRelevant ? "mission-relevant civic exchange" : "non-mission account exchange"]
  )
);

const olympiaKaziSources = olympiaKaziCoalitionIdentityPosts.map((event) =>
  institutionalPost(
    `SRC-NYCAC-OLYMPIA-${event.key}`,
    `Olympia Kazi uses the NYC Artist Coalition identity: ${event.key.toLowerCase().replaceAll("-", " ")}`,
    "Olympia Kazi (@olympiakazi)",
    event.publishedAt,
    `https://x.com/olympiakazi/status/${event.statusId}`,
    `Olympia Kazi, public post using @NYCArtC, ${event.publishedAt}.`,
    ["collaborator use of the shared coalition identity", event.summary],
    ["Jamie's authorship of the post", "Olympia Kazi's authorship of every coalition post", "sole campaign ownership"]
  )
);

const kcSpacesFundHighlightSources = kcSpacesFundHighlights.map(([key, name, statusId, publishedAt]) =>
  institutionalPost(
    `SRC-KCSPACES-HIGHLIGHT-${key}`,
    `KC Spaces Fund public funded-space highlight: ${name}`,
    "KC Spaces Fund (@KCSpacesFund)",
    publishedAt,
    `https://x.com/KCSpacesFund/status/${statusId}`,
    `KC Spaces Fund public #FUNDED highlight naming ${name}, ${publishedAt}.`,
    [`one public funded-space highlight naming ${name}`, "campaign outcome communication"],
    ["the complete grantee list", "the grant-selection process", "Jamie's authorship of the post", "Jamie's role in grant decisions"]
  )
);

export const socialMediaArchiveSources: SourceRecord[] = [
  {
    id: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026",
    title: "Project social-media archival production inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/social-media-archive-production.md",
    preferredPublicUrl: "canonical",
    publicCitation: "Project social-media archival production inventory, July 15, 2026.",
    publicNote: "A public-safe account registry and interaction ledger produced through Jamie's authenticated X session; it preserves public URLs, bounded findings, corrections, and stopping conditions without session or private-account data.",
    supportsGenerally: ["account registry", "authenticated review method", "bounded engagement ledgers", "collective-authorship boundaries"],
    doesNotEstablish: ["a complete platform export", "private interactions", "individual authorship of shared-account posts", "endorsement from every interaction"]
  },
  {
    id: "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
    title: "Jamie Burkart first-person project-account establishment statement",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/social-media-archive-production.md#account-establishment-and-shared-authorship",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart, first-person statement on establishing project accounts and identity systems, July 15, 2026.",
    publicNote: "Jamie states that he established the recovered project accounts. Public account chronology corroborates durable project identities and shared use, while platform administrator history was not exposed by the public interface.",
    supportsGenerally: ["Jamie's first-person account-establishment claim", "intentional project-identity work"],
    doesNotEstablish: ["individual authorship of every post", "sole control over time", "a platform-verified administrator history"]
  },
  profileSource("SRC-CALLNYC-X-PROFILE-2026", "CallNYC (@CallNYCapp)", "CallNYC", "https://x.com/CallNYCapp", "The profile reported 110 posts, 69 followers, and 194 following. These are dated discovery metadata, not durable impact measures.", ["dedicated project identity", "joined March 2016", "resident-help and open-data framing"]),
  profileSource("SRC-NYCAC-X-PROFILE-2026", "NYC Artist Coalition (@NYCArtC)", "NYC Artist Coalition", "https://x.com/NYCArtC", "The profile reported 5,124 posts, 1,339 followers, and 569 following. It names Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC.", ["shared coalition identity", "four named campaign systems", "joined January 2017"]),
  profileSource("SRC-WOWLIST-X-PROFILE-2026", "WOW List (@wowlist)", "WOW List", "https://x.com/wowlist", "The profile reported 38 posts, 47 followers, and 57 following. A replies-inclusive review recovered all 38 profile-reported items.", ["dedicated project identity", "joined February 2014", "complete profile-reported population on the capture date"]),
  profileSource("SRC-KCTH-X-PROFILE-2026", "KC Town Hall (@KCTownHall)", "KC Town Hall", "https://x.com/KCTownHall", "The profile reported 183 posts, 132 followers, and 225 following. A later population-accounted pass recovered 181 items and retained a two-item gap.", ["dedicated project identity", "joined March 2018", "multi-year public project communication"]),
  profileSource("SRC-KCSPACES-X-PROFILE-2026", "KC Spaces Fund (@KCSpacesFund)", "KC Spaces Fund", "https://x.com/KCSpacesFund", "The profile reported 35 posts, 21 followers, and 76 following. Thirty-four unique status URLs rendered.", ["dedicated campaign identity", "joined April 2020", "emergency-fund framing"]),
  {
    id: "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28",
    title: "Minutes of the New York City Council stated meeting, September 28, 2016",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-28",
    accessedAt: reviewedAt,
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=5b6f62c6-7eae-4d9e-9aec-c8b8fc36438c&ID=38126&M=AO&N=TWludXRlcyBvZiB0aGUgU3RhdGVkIE1lZXRpbmc%3D",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, minutes of the stated meeting, September 28, 2016.",
    publicNote: "The official roster corroborates Council service for the named CallNYC account holders during the interaction period.",
    supportsGenerally: ["2016 Council roster", "historical public-office status"],
    doesNotEstablish: ["control of social accounts", "every interaction date by itself", "endorsement of CallNYC"]
  },
  ...callNycRepostSources,
  ...callNycAuthoredSources,
  ...nycArtistCoalitionCouncilSources,
  ...olympiaKaziSources,
  institutionalPost("SRC-WOWLIST-ORIGIN-2014", "WOW List account names the Sunday Dinner calendar origin", "WOW List (@wowlist)", "2014-02-12", "https://x.com/wowlist/status/433671630837919744", "WOW List public origin post, February 12, 2014.", ["Richard and Jamie attribution", "Sunday Dinner calendar provenance"], ["sole authorship", "complete collaborator history"]),
  institutionalPost("SRC-WOWLIST-SUPPORT-2016", "WOW List describes the Sunday Dinner lineage and organizer workflow", "WOW List (@wowlist)", "2016-09-01", "https://x.com/wowlist/status/771457416298921985", "WOW List public product-support thread, September 1, 2016.", ["DIY community-calendar framing", "Sunday Dinner lineage", "organizer-facing workflow"], ["current service availability", "complete adoption"]),
  institutionalPost("SRC-WOWLIST-LOCATION-SUPPORT-2015", "WOW List answers a location-scope question", "WOW List (@wowlist)", "2015-04-24", "https://x.com/wowlist/status/591664757473673216", "WOW List public product-support reply, April 24, 2015.", ["public product support", "location-scope behavior"], ["that the proposed interface change shipped", "representative usability research"]),
  institutionalPost("SRC-WOWLIST-LISTS-SUPPORT-2015", "WOW List answers a list-discovery question", "WOW List (@wowlist)", "2015-04-24", "https://x.com/wowlist/status/591666366215811073", "WOW List public product-support reply, April 24, 2015.", ["public product support", "profile and list-discovery behavior"], ["representative usability research"]),
  institutionalPost("SRC-WOWLIST-EVENT-SUPPORT-2015", "WOW List answers an event-entry workflow complaint", "WOW List (@wowlist)", "2015-04-24", "https://x.com/wowlist/status/591668857670148096", "WOW List public product-support reply, April 24, 2015.", ["public workflow feedback", "event-entry support"], ["that the workflow was subsequently changed", "representative usability research"]),
  institutionalPost("SRC-KCTH-MISSION-2018", "KC Town Hall states its neighborhood-resource mission", "KC Town Hall (@KCTownHall)", "2018-07-02", "https://x.com/KCTownHall/status/1013893135695601665", "KC Town Hall public project-purpose post, July 2, 2018.", ["neighborhood-resource purpose", "cultural-center framing"], ["project completion", "current property status"]),
  institutionalPost("SRC-KCTH-SURVEY-2018", "KC Town Hall invites neighborhood survey participation", "KC Town Hall (@KCTownHall)", "2018-07-02", "https://x.com/KCTownHall/status/1013903289392517120", "KC Town Hall public survey invitation, July 2, 2018.", ["resident listening invitation", "participatory planning surface"], ["survey response count", "representativeness"]),
  institutionalPost("SRC-KCTH-TIRES-LAUNCH-2019", "KC Town Hall announces Tired of Tires pickup", "KC Town Hall (@KCTownHall)", "2019-05-03", "https://x.com/KCTownHall/status/1124416898064580608", "KC Town Hall public Tired of Tires launch post, May 3, 2019.", ["recurring neighborhood service communication", "Oak Park partnership"], ["Jamie's sole operation", "verified pickup totals" ]),
  governmentPost("SRC-KCTH-ROBINSON-REPLY-2020", "Melissa Robinson replies to KC Town Hall", "Melissa Robinson (@Robinson4kc)", "2020-08-01", "https://x.com/Robinson4kc/status/1289714535251742726", "Councilmember Melissa Robinson public reply to KC Town Hall, August 1, 2020.", ["incoming Council-member engagement", "recognition of community-condition work"]),
  governmentPost("SRC-KCTH-JUSTUS-REPLY-2019", "Jolie Justus replies in a KC Town Hall grocery-access thread", "Jolie Justus (@joliejustus)", "2019-04-29", "https://x.com/joliejustus/status/1122883010582466560", "Councilmember Jolie Justus public reply in a KC Town Hall thread, April 29, 2019.", ["incoming Council-member engagement", "public grocery-access dialogue"]),
  governmentPost("SRC-KCTH-LUCAS-QUOTE-2019", "Quinton Lucas quote-posts KC Town Hall grocery-access context", "Quinton Lucas (@QuintonLucasKC)", "2019-04-29", "https://x.com/QuintonLucasKC/status/1122866432130334720", "Councilmember Quinton Lucas public quote post involving KC Town Hall, April 29, 2019.", ["incoming Council-member engagement", "public grocery-access dialogue"]),
  governmentPost("SRC-KCTH-KCMO311-REPLY-2018", "KCMO 311 replies in a KC Town Hall service thread", "KCMO 311 (@KCMO311)", "2018-08-27", "https://x.com/KCMO311/status/1034093516073459712", "KCMO 311 public reply in a KC Town Hall service thread, August 27, 2018.", ["incoming city-service-account engagement", "public service follow-up"]),
  institutionalPost("SRC-KCSPACES-APPLICATION-2020", "KC Spaces Fund announces rolling emergency-relief applications", "KC Spaces Fund (@KCSpacesFund)", "2020-04-15", "https://x.com/KCSpacesFund/status/1250217081552986112", "KC Spaces Fund public rolling-application announcement, April 15, 2020.", ["public application communication", "rolling relief framing"], ["Jamie's role in grant decisions", "complete campaign outcomes"]),
  ...kcSpacesFundHighlightSources
];

const callNycSourceIds = [
  ...callNycRepostSources.map((source) => source.id),
  ...callNycAuthoredSources.map((source) => source.id)
];
const nycArtistCoalitionCouncilSourceIds = nycArtistCoalitionCouncilSources.map((source) => source.id);
const olympiaKaziSourceIds = olympiaKaziSources.map((source) => source.id);
const kcSpacesFundHighlightSourceIds = kcSpacesFundHighlightSources.map((source) => source.id);

export const socialMediaArchiveClaims: ClaimRecord[] = [
  {
    id: "CLM-CALLNYC-SOCIAL-PUBLIC-FEEDBACK-LOOP",
    project: "callnyc",
    internalClaim: "The complete recoverable @CallNYCapp corpus contains 71 service-recognition posts naming 26 Council members and links to 61 normalized issue pages. A separate authenticated response audit reproduced public interactions from at least 20 distinct accounts belonging to serving New York City Council members: 19 public repost-list identities plus Ydanis Rodriguez's separate quote post; eight members authored posts or replies explicitly involving CallNYC.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "CallNYC paired 61 resident-facing issue pages with recognition posts directed to 26 Council accounts. A fresh authenticated audit recovered attributable interactions from at least 20 serving Council member accounts, including eight member-authored posts or replies.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"], rationale: "Use the lower-bound count and communication-system pattern to show attributable public response while keeping the full account ledger and platform limitations in the knowledge bank." }],
    evidence: [
      { sourceId: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026", relationship: "direct-support", supports: ["account-level audit method", "19 repost-list identities", "20-person unique lower bound", "eight member-authored interactions", "61 issue pages and 26 addressed Council accounts"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28", relationship: "corroborating", supports: ["historical Council service for the named account holders"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-CALLNYC-X-CORPUS-2026-07-14", relationship: "direct-support", supports: ["107-item recoverable population", "71 recognition posts", "26 named Council members", "61 normalized issue pages"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-CALLNYC-X-PROFILE-2026", relationship: "context", supports: ["dedicated public project identity", "dated profile discovery metadata"], confidence: "high", renderCitation: false },
      ...callNycSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["one attributable public Council-account interaction"], confidence: "high" as const, renderCitation: false }))
    ],
    boundaries: ["The profile reported 110 posts; the corpus includes every one of the 107 distinct items the authenticated timeline rendered and retains the three-count difference as unresolved.", "Twenty-six describes Council members named by CallNYC output; at least 20 describes separately verified incoming engagement.", "Present 20 as a recovered lower bound, not a complete lifetime count.", "Likes, follows, private interactions, deleted posts, and hidden replies are excluded.", "Interaction does not establish endorsement, adoption, or official City status."],
    antiClaims: ["all 110 profile-reported posts were individually recovered", "26 Council members engaged back", "exactly 20 Council members ever engaged", "20 Council members endorsed CallNYC", "the Council adopted CallNYC", "CallNYC was an official City service", "Jamie authored every account post"],
    researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT", "INQ-CALLNYC-X-FULL-POPULATION-2026"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-NYCAC-SOCIAL-COUNCIL-ENGAGEMENT",
    project: "nyc-artist-coalition",
    internalClaim: "A strict authenticated review recovered direct interaction with @NYCArtC by at least five accounts belonging to serving Council members: Rafael Espinal, Stephen Levin, Mark Levine, Jimmy Van Bramer, and Justin Brannan. Four of the five exchanges concerned coalition missions or civic operating context; Brannan's direct reply was unrelated to those missions.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "The shared coalition identity became a usable civic interface: a strict authenticated review recovered direct @NYCArtC interactions from at least five serving Council member accounts, including public exchanges about cultural-space preservation, nightlife enforcement accountability, commercial-rent advocacy, and emergency operating guidance.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"], rationale: "Select the strict direct-interaction lower bound and mission pattern; keep the off-topic fifth edge, thread-context exclusions, and complete ledger in the bank." }],
    evidence: [
      { sourceId: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026", relationship: "direct-support", supports: ["strict direct-interaction taxonomy", "five-member lower bound", "mission-relevance classification", "thread-context corrections"], confidence: "high", renderCitation: true },
      ...nycArtistCoalitionCouncilSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["one direct Council-account interaction or corroborating interaction in the named account set"], confidence: "high" as const, renderCitation: false }))
    ],
    boundaries: ["The result is a lower bound from recovered public posts, not a complete repost, reply, quote, or like census.", "Carlina Rivera and Brad Lander thread-context records are not counted as direct @NYCArtC engagement.", "Justin Brannan's direct reply is retained in the inventory but not represented as mission-relevant coalition traction."],
    antiClaims: ["exactly five Council members ever engaged", "every Council interaction endorsed every coalition position", "Carlina Rivera's 2018 SBJSA reply directly engaged @NYCArtC", "Brad Lander's 2021 reply to Olympia Kazi directly engaged @NYCArtC", "Jamie authored every coalition post"],
    researchInquiryIds: ["INQ-NYCAC-SOCIAL-ENGAGEMENT"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT",
    project: "portfolio-social-archive",
    internalClaim: "Jamie states that he established the recovered project accounts and their public-facing identity systems. Public chronology corroborates durable project identities and shared use, while the public interface does not expose administrator history or identify the author of each shared-account post.",
    status: "confirmed-with-boundary",
    projections: [
      { key: "archive-note", text: "Jamie established the recovered project accounts and public-facing identity systems; account output remains attributed to its public author or treated as collective where authorship is not disclosed.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/social-media-archive-production"], rationale: "Preserve Jamie's direct identity-system contribution in the public-safe bank while making the first-person source basis and shared-authorship limit explicit." },
      { key: "case-study", text: "Jamie established the coalition's shared public identity system. Collaborators could then use it without collapsing into Jamie's voice: Olympia Kazi's public posts used @NYCArtC across 2020-2022 for relief advocacy, a Commercial Rent Stabilization hearing, and nightlife oversight.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"], rationale: "Show the durable operating value of Jamie's identity-system work through attributable collaborator use while preserving post-level authorship." }
    ],
    evidence: [
      { sourceId: "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026", relationship: "direct-support", supports: ["Jamie's first-person account-establishment statement"], confidence: "moderate", renderCitation: true },
      { sourceId: "SRC-NYCAC-X-PROFILE-2026", relationship: "corroborating", supports: ["durable shared coalition identity", "four named campaigns"], confidence: "high", renderCitation: true },
      ...olympiaKaziSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["attributable collaborator use of the coalition identity"], confidence: "high" as const, renderCitation: true }))
    ],
    boundaries: ["The establishment statement is Jamie's first-person account, not a platform administrator export.", "Do not assign Jamie authorship of Olympia Kazi's posts or undifferentiated authorship of the shared account.", "Identity design, account creation, campaign strategy, and post authorship are separate contribution types."],
    antiClaims: ["Jamie authored every project-account post", "Olympia Kazi authored every @NYCArtC post", "Jamie solely controlled the accounts over time", "durable identity proves sole campaign ownership"],
    researchInquiryIds: ["INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-WOWLIST-SOCIAL-PROVENANCE-SUPPORT",
    project: "wowlist",
    internalClaim: "The complete recovered @wowlist profile population preserves shared project provenance from Sunday Dinner and public product-support exchanges about location scope, list discovery, and event entry.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "WOW List's complete recovered public-account population preserves both origin and operating texture: the first post credits Richard and Jamie and connects the platform to Sunday Dinner calendars, while public support exchanges address location scope, list discovery, and event entry.", status: "active", citationRequired: true, surfaces: ["/work/wowlist"], rationale: "Use direct social evidence to make shared provenance and real organizer support concrete without overloading the page with the full 38-item archive." }],
    evidence: [
      { sourceId: "SRC-WOWLIST-X-PROFILE-2026", relationship: "context", supports: ["complete 38-item profile-reported population on the capture date"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-ORIGIN-2014", relationship: "direct-support", supports: ["Richard and Jamie attribution", "Sunday Dinner origin"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SUPPORT-2016", relationship: "direct-support", supports: ["DIY calendar framing", "Sunday Dinner lineage"], confidence: "high", renderCitation: true },
      ...["SRC-WOWLIST-LOCATION-SUPPORT-2015", "SRC-WOWLIST-LISTS-SUPPORT-2015", "SRC-WOWLIST-EVENT-SUPPORT-2015"].map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["one public product-support exchange"], confidence: "high" as const, renderCitation: false }))
    ],
    boundaries: ["Keep credit shared with Richard, Sunday Dinner participants, organizers, and other collaborators.", "Describe historical workflows rather than current service availability.", "The profile population is not a complete product or adoption archive."],
    antiClaims: ["Jamie alone created WOW List", "Jamie authored every @wowlist post", "the platform is currently operating", "38 posts are the complete product history"],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-ARCHIVE", "INQ-WOWLIST-HANDLE-HISTORY"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS",
    project: "kc-town-hall",
    internalClaim: "KC Town Hall's public account documented neighborhood listening, adaptive-reuse purpose, and recurring Tired of Tires service communication; preserved conversations show direct public engagement from at least three then-sitting Council-member accounts and KCMO 311.",
    status: "confirmed-with-boundary",
    projections: [{ key: "case-study", text: "The public account made the neighborhood process operational: it invited resident input, documented recurring Tired of Tires service, and carried two-way civic dialogue with at least three then-sitting Council member accounts and KCMO 311.", status: "active", citationRequired: true, surfaces: ["/work/kc-town-hall"], rationale: "Use the public listening and civic-dialogue pattern to make Jamie's broader project operations legible while keeping account authorship and later project stewardship collective." }],
    evidence: [
      { sourceId: "SRC-SOCIAL-ARCHIVE-INVENTORY-2026", relationship: "direct-support", supports: ["population-accounting summary", "strict incoming-interaction rule", "public-safety method"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KCTH-MISSION-2018", relationship: "direct-support", supports: ["neighborhood resource and cultural-center purpose"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KCTH-SURVEY-2018", relationship: "direct-support", supports: ["public resident-input invitation"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KCTH-TIRES-LAUNCH-2019", relationship: "direct-support", supports: ["recurring neighborhood service communication"], confidence: "high", renderCitation: false },
      ...["SRC-KCTH-ROBINSON-REPLY-2020", "SRC-KCTH-JUSTUS-REPLY-2019", "SRC-KCTH-LUCAS-QUOTE-2019", "SRC-KCTH-KCMO311-REPLY-2018"].map((sourceId) => ({ sourceId, relationship: "corroborating" as const, supports: ["one visible incoming public interaction"], confidence: "high" as const, renderCitation: false }))
    ],
    boundaries: ["Do not publish historical phone numbers or addresses from posts.", "Do not assign every account post or later operation to Jamie.", "Public dialogue does not establish project completion, policy causation, or independent verification of service totals."],
    antiClaims: ["Jamie authored every @KCTownHall post", "every tagged official engaged", "Council interaction proves endorsement", "the social archive proves the redevelopment was completed"],
    researchInquiryIds: ["INQ-KCTH-SOCIAL-ARCHIVE"],
    reviewedAt,
    reviewedBy
  },
  {
    id: "CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION",
    project: "kc-spaces-fund",
    internalClaim: "The recovered KC Spaces Fund account population includes at least eleven distinct public #FUNDED grantee or funded-space highlights between April and July 2020.",
    status: "confirmed-with-boundary",
    projections: [{ key: "archive-note", text: "KC Spaces Fund's recovered public timeline includes at least eleven named #FUNDED grantee or funded-space highlights from April through July 2020.", status: "hold", citationRequired: true, surfaces: [], rationale: "Retain as campaign context in the bank; the current site has no KC Spaces Fund case study and Jamie's documented role is digital infrastructure, not grant selection or public organizing." }],
    evidence: kcSpacesFundHighlightSourceIds.map((sourceId) => ({ sourceId, relationship: "direct-support" as const, supports: ["one named public funded-space highlight"], confidence: "high" as const, renderCitation: false })),
    boundaries: ["Present eleven as a lower bound, not a complete audited grantee list.", "Keep organizer credit with the campaign's named organizers.", "Do not infer grant selection, disbursement, or account authorship roles for Jamie."],
    antiClaims: ["exactly eleven grantees received support", "Jamie selected the grantees", "Jamie authored every post", "Jamie ran the fundraiser", "the social timeline is a complete grant ledger"],
    researchInquiryIds: ["INQ-KCSPACES-SOCIAL-ARCHIVE", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"],
    reviewedAt,
    reviewedBy
  }
];

export const socialMediaArchiveInquiries: ResearchInquiry[] = [
  {
    id: "INQ-NYCAC-SOCIAL-ENGAGEMENT",
    project: "nyc-artist-coalition",
    question: "What attributable public engagement with @NYCArtC can be recovered without turning thread context or outbound mentions into incoming engagement?",
    methods: ["Reviewed direct status pages in Jamie's authenticated X session.", "Counted direct mentions, replies, quote posts, and reposts separately from thread context.", "Cross-checked interaction dates against public Council service records."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["At least five serving Council-member accounts directly engaged @NYCArtC in the recovered record.", "Four of the five exchanges concerned coalition missions or civic operating context.", "Carlina Rivera and Brad Lander records previously treated as direct edges were thread context and are excluded from the strict count."],
    limitations: ["Search ranking, deleted posts, private accounts, suspensions, and handle changes prevent a complete lifetime census.", "Interaction does not establish endorsement, policy causation, or shared-account authorship."],
    sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026", ...nycArtistCoalitionCouncilSourceIds],
    publicSummary: "A strict authenticated review recovered at least five direct serving-Council-member account interactions with @NYCArtC and corrected two earlier thread-context false positives."
  },
  {
    id: "INQ-SOCIAL-ACCOUNT-AUTHORSHIP",
    project: "portfolio-social-archive",
    question: "Who established, administered, and authored posts for each shared project account over time?",
    methods: ["Preserved Jamie's first-person account-establishment statement.", "Compared public profile chronology and attributable collaborator posts.", "Kept identity design, account creation, administrator access, campaign strategy, and post authorship as separate contribution types."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["Jamie states that he established the recovered project accounts and identity systems.", "Public profiles demonstrate durable project identities and shared use.", "Olympia Kazi's attributable posts show sustained use of @NYCArtC across 2020-2022."],
    limitations: ["The public interface does not expose historical administrator records.", "No writing-style inference is used to assign post authorship.", "Shared-account posts remain collectively authored unless a post or record identifies the author."],
    sourceIds: ["SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026", "SRC-NYCAC-X-PROFILE-2026", ...olympiaKaziSourceIds],
    publicSummary: "Jamie's first-person account supports project-account establishment; public chronology supports durable collective use, while post-level authorship remains separate."
  },
  {
    id: "INQ-WOWLIST-SOCIAL-ARCHIVE",
    project: "wowlist",
    question: "What does the surviving @wowlist population establish about provenance, public product support, and organizer use?",
    methods: ["Reconciled the authenticated Posts and Replies views into a 38-status population.", "Separated authored posts, reposts, support replies, and posted sources.", "Kept historical workflow evidence distinct from current product availability."],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: ["All 38 profile-reported items were recovered on the capture date.", "The first post credits Richard and Jamie and connects the project to Sunday Dinner calendars.", "Public threads document location, list-discovery, and event-entry support."],
    limitations: ["The profile population is not a complete product or adoption history.", "The account does not identify the author of every post."],
    sourceIds: ["SRC-WOWLIST-X-PROFILE-2026", "SRC-WOWLIST-ORIGIN-2014", "SRC-WOWLIST-SUPPORT-2016", "SRC-WOWLIST-LOCATION-SUPPORT-2015", "SRC-WOWLIST-LISTS-SUPPORT-2015", "SRC-WOWLIST-EVENT-SUPPORT-2015"],
    publicSummary: "The complete recovered @wowlist profile population preserves shared Sunday Dinner provenance and public organizer-facing product support."
  },
  {
    id: "INQ-WOWLIST-HANDLE-HISTORY",
    project: "wowlist",
    question: "What is the relationship between historical @wowlistnyc references and the recovered @wowlist account?",
    methods: ["Compared historical code and public organizer posts with the current profile.", "Searched for a dated public handle-migration bridge."],
    runAt: reviewedAt,
    resultStatus: "not-recovered",
    findings: ["Historical public records use @wowlistnyc.", "The current recovered project account is @wowlist.", "No public migration bridge was recovered."],
    limitations: ["Not recovered is not evidence that the handles were unrelated.", "Handle history may require a lawful account export or contemporaneous administrator record."],
    sourceIds: ["SRC-WOWLIST-X-PROFILE-2026"],
    publicSummary: "The @wowlistnyc-to-@wowlist relationship remains unresolved and is not assumed."
  },
  {
    id: "INQ-KCTH-SOCIAL-ARCHIVE",
    project: "kc-town-hall",
    question: "What public project operations and civic dialogue are recoverable from @KCTownHall without exposing contact data or overstating completion?",
    methods: ["Reviewed the authenticated profile and replies-inclusive population accounting.", "Counted only visible replies and quote posts as incoming engagement.", "Excluded historical phone numbers, addresses, private account surfaces, and volatile metrics from accomplishment messaging."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["The profile reported 183 posts; 181 items were recovered and two remain not recovered.", "The account documents resident listening and recurring Tired of Tires communication.", "At least three then-sitting Council-member accounts and KCMO 311 visibly engaged in public threads."],
    limitations: ["The shared account does not identify the author of every post.", "Public dialogue does not prove service resolution, project completion, or policy causation."],
    sourceIds: ["SRC-KCTH-X-PROFILE-2026", "SRC-KCTH-MISSION-2018", "SRC-KCTH-SURVEY-2018", "SRC-KCTH-TIRES-LAUNCH-2019", "SRC-KCTH-ROBINSON-REPLY-2020", "SRC-KCTH-JUSTUS-REPLY-2019", "SRC-KCTH-LUCAS-QUOTE-2019", "SRC-KCTH-KCMO311-REPLY-2018"],
    publicSummary: "The account preserves public listening, recurring service communication, and direct civic dialogue while leaving two profile-counted items and post-level authorship unresolved."
  },
  {
    id: "INQ-KCSPACES-SOCIAL-ARCHIVE",
    project: "kc-spaces-fund",
    question: "What campaign operations and outcomes are publicly recoverable from @KCSpacesFund while preserving organizer credit and applicant privacy?",
    methods: ["Reviewed the authenticated profile chronologically.", "Counted distinct named #FUNDED highlights without inferring a complete grant ledger.", "Excluded applicant, donor, subscriber, payment, and selection-process materials."],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: ["Thirty-four of 35 profile-reported posts rendered.", "At least eleven distinct named funded-space highlights were published from April through July 2020.", "The account documented rolling relief applications and public outcome communication."],
    limitations: ["The timeline does not establish the complete grantee count or selection process.", "Individual account authorship and Jamie's role in grant decisions are not established."],
    sourceIds: ["SRC-KCSPACES-X-PROFILE-2026", "SRC-KCSPACES-APPLICATION-2020", ...kcSpacesFundHighlightSourceIds],
    publicSummary: "The recovered public timeline preserves rolling application communication and at least eleven named funded-space highlights while leaving selection and authorship unassigned."
  },
  {
    id: "INQ-SOCIAL-NOT-RECOVERED-ACCOUNTS",
    project: "portfolio-social-archive",
    question: "Did Harry J. Epstein Company, NTER CHNG, 196, Sunday Dinner, or Source-Backed Team Memory use dedicated historical project handles?",
    methods: ["Compared recovered profile identities, project sites, and current knowledge-bank records.", "Recorded adjacent accounts separately from dedicated accounts."],
    runAt: reviewedAt,
    resultStatus: "not-recovered",
    findings: ["No dedicated handle was recovered for the listed projects in this pass.", "@wowlist contains adjacent Sunday Dinner and 196 lineage evidence but is not labeled as a dedicated Sunday Dinner or 196 account."],
    limitations: ["Not recovered does not mean no account existed.", "Historical handles may have changed, been deleted, or lived on another platform."],
    sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026", "SRC-WOWLIST-X-PROFILE-2026"],
    publicSummary: "No dedicated handles were recovered for these projects; adjacent evidence remains separately labeled."
  }
];

export const socialMediaArchiveIntake = [
  { id: "INT-SOCIAL-ACCOUNT-REGISTRY-2026", receivedAt: reviewedAt, kind: "public-artifact", visibility: "public-safe", title: "Project social-account registry", description: "Authenticated profile review recovered five project accounts and one shared coalition identity serving four campaign systems.", whyItMatters: "Establishes the public identity map before engagement, authorship, or impact claims are made.", projectIds: ["portfolio-social-archive"], status: "matured", disposition: "claim-created", dispositionNote: "Integrated as a governed social-identity and authorship claim with dedicated project inquiries.", sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026", "SRC-CALLNYC-X-PROFILE-2026", "SRC-NYCAC-X-PROFILE-2026", "SRC-WOWLIST-X-PROFILE-2026", "SRC-KCTH-X-PROFILE-2026", "SRC-KCSPACES-X-PROFILE-2026"], claimIds: ["CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT"], inquiryIds: ["INQ-SOCIAL-ACCOUNT-AUTHORSHIP", "INQ-SOCIAL-NOT-RECOVERED-ACCOUNTS"], boundaries: ["Profile metrics are dated discovery metadata.", "Not recovered is not evidence of nonexistence."] },
  { id: "INT-CALLNYC-COUNCIL-SOCIAL-2026", receivedAt: reviewedAt, kind: "public-artifact", visibility: "public-safe", title: "CallNYC Council-account engagement census", description: "Fresh authenticated review reproduced 19 public Council-member repost-list identities and eight member-authored CallNYC interactions, yielding a 20-person unique lower bound.", whyItMatters: "Demonstrates that the resident-facing open-data prototype created a real public feedback loop with the offices represented in the source data.", projectIds: ["callnyc"], status: "matured", disposition: "claim-created", dispositionNote: "Promoted as a lower-bound case-study claim with official-roster corroboration and explicit exclusions.", sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026", "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28", ...callNycSourceIds], claimIds: ["CLM-CALLNYC-SOCIAL-PUBLIC-FEEDBACK-LOOP"], inquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT"], boundaries: ["Twenty is a lower bound, not a lifetime total.", "Interaction is not formal endorsement or adoption."] },
  { id: "INT-NYCAC-SOCIAL-IDENTITY-2026", receivedAt: reviewedAt, kind: "public-safe-memory", visibility: "public-safe", title: "NYC Artist Coalition identity system and collaborator use", description: "Jamie reports establishing the account and identity system; public records show direct Council engagement and Olympia Kazi using the identity across multiple years.", whyItMatters: "Makes Jamie's identity-system contribution and its collaborative durability visible without assigning shared account speech to him.", projectIds: ["nyc-artist-coalition", "fair-rent-nyc", "talks-not-raids", "let-nyc-dance", "save-nyc-spaces"], status: "matured", disposition: "claim-created", dispositionNote: "Separated account establishment, direct public engagement, and attributable collaborator use into bounded claims.", sourceIds: ["SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026", "SRC-NYCAC-X-PROFILE-2026", ...nycArtistCoalitionCouncilSourceIds, ...olympiaKaziSourceIds], claimIds: ["CLM-NYCAC-SOCIAL-COUNCIL-ENGAGEMENT", "CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT"], inquiryIds: ["INQ-NYCAC-SOCIAL-ENGAGEMENT", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"], boundaries: ["Post-level authorship remains attributed to the public author or collective account.", "Council engagement is not policy causation."] },
  { id: "INT-WOWLIST-SOCIAL-ARCHIVE-2026", receivedAt: reviewedAt, kind: "public-artifact", visibility: "public-safe", title: "WOW List social provenance and product support", description: "Complete profile-reported population review recovered origin, Sunday Dinner lineage, and public product-support exchanges.", whyItMatters: "Adds direct evidence of shared product provenance and real organizer-facing operations.", projectIds: ["wowlist", "sunday-dinner"], status: "matured", disposition: "claim-created", dispositionNote: "Promoted as a cited WOW List case-study claim while retaining handle-history uncertainty.", sourceIds: ["SRC-WOWLIST-X-PROFILE-2026", "SRC-WOWLIST-ORIGIN-2014", "SRC-WOWLIST-SUPPORT-2016", "SRC-WOWLIST-LOCATION-SUPPORT-2015", "SRC-WOWLIST-LISTS-SUPPORT-2015", "SRC-WOWLIST-EVENT-SUPPORT-2015"], claimIds: ["CLM-WOWLIST-SOCIAL-PROVENANCE-SUPPORT"], inquiryIds: ["INQ-WOWLIST-SOCIAL-ARCHIVE", "INQ-WOWLIST-HANDLE-HISTORY"], boundaries: ["Keep credit shared.", "Historical workflow evidence does not establish current availability."] },
  { id: "INT-KCTH-SOCIAL-ARCHIVE-2026", receivedAt: reviewedAt, kind: "public-artifact", visibility: "public-safe", title: "KC Town Hall public-operations archive", description: "Population-accounted profile review preserves neighborhood listening, recurring service communication, and direct civic dialogue.", whyItMatters: "Shows that the project account functioned as operational infrastructure for resident participation and public-service coordination.", projectIds: ["kc-town-hall"], status: "matured", disposition: "claim-created", dispositionNote: "Promoted as a bounded case-study claim with phone, address, authorship, completion, and outcome exclusions.", sourceIds: ["SRC-KCTH-X-PROFILE-2026", "SRC-KCTH-MISSION-2018", "SRC-KCTH-SURVEY-2018", "SRC-KCTH-TIRES-LAUNCH-2019", "SRC-KCTH-ROBINSON-REPLY-2020", "SRC-KCTH-JUSTUS-REPLY-2019", "SRC-KCTH-LUCAS-QUOTE-2019", "SRC-KCTH-KCMO311-REPLY-2018"], claimIds: ["CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS"], inquiryIds: ["INQ-KCTH-SOCIAL-ARCHIVE"], boundaries: ["Do not publish historical contact details.", "Do not infer completion or sole authorship."] },
  { id: "INT-KCSPACES-SOCIAL-ARCHIVE-2026", receivedAt: reviewedAt, kind: "public-artifact", visibility: "public-safe", title: "KC Spaces Fund public campaign archive", description: "Authenticated profile review recovered rolling application communication and eleven distinct named funded-space highlights.", whyItMatters: "Preserves public campaign operations and outcomes while keeping Jamie's separate digital-infrastructure role and organizer credit intact.", projectIds: ["kc-spaces-fund"], status: "matured", disposition: "claim-created", dispositionNote: "Integrated as a held archive claim, not projected to the current site.", sourceIds: ["SRC-KCSPACES-X-PROFILE-2026", "SRC-KCSPACES-APPLICATION-2020", ...kcSpacesFundHighlightSourceIds], claimIds: ["CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION"], inquiryIds: ["INQ-KCSPACES-SOCIAL-ARCHIVE", "INQ-SOCIAL-ACCOUNT-AUTHORSHIP"], boundaries: ["Eleven is a lower bound.", "Do not infer Jamie's role in organizing, selection, disbursement, or post authorship."] }
] satisfies IntakeRecordInput[];
