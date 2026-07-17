import type { KnowledgeBank } from "./schema.ts";

type SourceRecord = KnowledgeBank["sources"][number];

type SocialPostSeed = {
  id: string;
  title: string;
  organization: string;
  kind: "government-social-post" | "institutional-social-post";
  handle: string;
  statusId: string;
  publishedAt: string;
  publicCitation: string;
  publicNote: string;
  supportsGenerally: string[];
  doesNotEstablish: string[];
};

const socialProfileSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-CALLNYC-X-PROFILE-2026-07-14",
    title: "Call NYC X profile",
    organization: "Call NYC",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/CallNYCapp",
    preferredPublicUrl: "canonical",
    publicCitation: "Call NYC (@CallNYCapp), authenticated X profile reviewed July 14, 2026.",
    publicNote: "The profile showed 110 posts, a March 2016 join date, and a bio describing resident-facing use of New York City Council constituent-services data.",
    supportsGenerally: ["the @CallNYCapp project identity", "110-post profile count at access time", "March 2016 account chronology", "constituent-services mission framing"],
    doesNotEstablish: ["a complete recoverable timeline", "the identity of every post author", "current service guidance", "Council ownership or endorsement", "lifetime reach from access-time follower counts"]
  },
  {
    id: "SRC-NYCA-X-PROFILE-2026-07-14",
    title: "NYC Artist Coalition X profile",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition (@NYCArtC), authenticated X profile reviewed July 15, 2026.",
    publicNote: "The profile showed 5,124 posts, a January 2017 join date, and an umbrella identity naming #SaveNYCSpaces, #LetNYCDance, #TalksNotRaids, and #FairRentNYC. The profile counter was unchanged when rechecked for the dedicated population review.",
    supportsGenerally: ["the @NYCArtC coalition identity", "5,124-post profile count at access time", "January 2017 account chronology", "four campaign identities carried by the umbrella account"],
    doesNotEstablish: ["the identity of every post author", "Jamie's authorship of every post", "a complete engagement graph", "coalition causality for policy outcomes", "lifetime reach from access-time follower counts"]
  },
  {
    id: "SRC-WOWLIST-X-PROFILE-2026-07-14",
    title: "WOW List X profile",
    organization: "WOW List",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation: "WOW List (@wowlist), authenticated X profile reviewed July 14, 2026.",
    publicNote: "The profile showed 38 posts, a February 2014 join date, and the public description 'being there changes everything.'",
    supportsGenerally: ["the @wowlist project identity", "38-post profile count at access time", "February 2014 account chronology"],
    doesNotEstablish: ["the identity of every post author", "complete organizer adoption", "current platform activity", "lifetime reach from access-time follower counts"]
  },
  {
    id: "SRC-SUNDAY-DINNER-X-PROFILE-2026-07-14",
    title: "Sunday Dinner X profile shell",
    organization: "Sunday Dinner",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/sundaydinnernyc",
    preferredPublicUrl: "canonical",
    publicCitation: "Sunday Dinner (@sundaydinnernyc), authenticated X profile reviewed July 14, 2026.",
    publicNote: "The profile showed a bare October 2013 account shell with zero posts and no public project description.",
    supportsGenerally: ["a live @sundaydinnernyc account shell", "October 2013 join date", "zero-post profile count at access time"],
    doesNotEstablish: ["that the account was actively used", "that Jamie controlled the account", "Sunday Dinner history or reach", "that no deleted or unavailable posts ever existed"]
  },
  {
    id: "SRC-KC-TOWN-HALL-X-PROFILE-2026-07-14",
    title: "KC Town Hall X profile",
    organization: "KC Town Hall",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/KCTownHall",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall (@KCTownHall), authenticated X profile reviewed July 14, 2026.",
    publicNote: "The profile showed 183 posts, a March 2018 join date, and a mission of restoring a historic Kansas City neighborhood resource.",
    supportsGenerally: ["the @KCTownHall project identity", "183-post profile count at access time", "March 2018 account chronology", "public neighborhood-resource framing"],
    doesNotEstablish: ["the identity of every post author", "Jamie's authorship of every post", "the legal details of stewardship transfer", "project completion", "lifetime reach from access-time follower counts"]
  },
  {
    id: "SRC-KC-SPACES-FUND-X-PROFILE-2026-07-14",
    title: "KC Spaces Fund X profile",
    organization: "KC Spaces Fund",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/KCSpacesFund",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Spaces Fund (@KCSpacesFund), authenticated X profile reviewed July 14, 2026.",
    publicNote: "The profile showed 35 posts, an April 2020 join date, and a COVID-19 emergency-fund description for grassroots arts and culture spaces in Kansas City.",
    supportsGenerally: ["the @KCSpacesFund project identity", "35-post profile count at access time", "April 2020 account chronology", "grassroots arts and culture emergency-fund purpose"],
    doesNotEstablish: ["the identity of every post author", "Jamie's authorship of every post", "Jamie's role in organizing or deciding grants", "the complete recipient set", "lifetime reach from access-time follower counts"]
  }
];

const researchSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14",
    title: "Authenticated X project-account archival census",
    author: "Codex archival review",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-14",
    publicCitation: "Authenticated X project-account archival census conducted July 14, 2026.",
    publicNote: "This July 14 cross-project snapshot recovered 107 of 110 CallNYC profile-counted objects, 526 live-search results for @NYCArtC, 170 of 183 KC Town Hall statuses, 34 of 35 KC Spaces Fund statuses, and 37 of 38 WOW List statuses. Dedicated July 15 passes later superseded the NYC Artist Coalition, KC Town Hall, and WOW List recovery floors with profile-population dispositions.",
    protectedLocatorId: "RESEARCH-PROJECT-SOCIAL-X-CENSUS-2026-07-14",
    supportsGenerally: ["bounded profile and search counts", "status-author classification", "Council-handle matching", "direct-mention versus thread-match separation", "current exact-handle lookup results"],
    doesNotEstablish: ["a platform export", "a complete deleted-post corpus", "the identity of every shared-account author", "follower identity or lifetime reach", "policy causality", "endorsement from a like, repost, or mention"]
  },
  {
    id: "SRC-NYCA-HISTORICAL-COUNCIL-HANDLE-ROSTERS",
    title: "NYC Council handle rosters preserved with Talks Not Raids",
    organization: "Talks Not Raids project archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-14",
    publicCitation: "Protected public-safe summary of historical NYC Council name-and-handle rosters preserved with the Talks Not Raids project.",
    publicNote: "The project archive includes 2017-era and 2019 Council datasets used to match historical member names with the handles recovered in authenticated X searches.",
    protectedLocatorId: "LOC-NYCA-COUNCIL-HANDLE-ROSTERS",
    supportsGenerally: ["historical Council name-to-handle matching", "2017-era and 2019 roster snapshots"],
    doesNotEstablish: ["an official authoritative roster", "account control for every date", "complete term dates", "the meaning of every social interaction"]
  }
];

const callNycFullPopulationCensusSource: SourceRecord = {
  id: "SRC-CALLNYC-X-FULL-POPULATION-CENSUS-2026-07-15",
  title: "CallNYC X full-population census",
  author: "Codex archival review",
  organization: "Call NYC",
  kind: "research-run",
  visibility: "public",
  preservationStatus: "live",
  accessedAt: "2026-07-15",
  assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/research/data/callnyc-x-full-population-census-2026-07-15.csv",
  preferredPublicUrl: "asset",
  publicCitation: "Full-population archival census of the 110 objects counted by the @CallNYCapp profile, reviewed July 15, 2026.",
  publicNote: "The census gives all 110 profile-counted slots a disposition: 107 recoverable timeline objects and three unrecovered remainders. The recovered set contains 92 CallNYC-authored posts or replies and 15 reposts; 71 issue-recognition posts link to 61 distinct CallNYC issue pages and name 26 Council-member accounts.",
  supportsGenerally: ["110-slot population disposition", "107 recovered timeline objects", "three unrecovered profile-counted objects", "92 CallNYC-authored posts or replies", "15 reposts", "71 issue-recognition posts", "61 distinct CallNYC issue pages", "26 named Council-member accounts", "posted-URL inventory", "access-time interaction labels"],
  doesNotEstablish: ["a platform account-data export", "the contents of the three unrecovered objects", "a complete deleted-post history", "the historical identity of every liker or reposter", "formal endorsement", "product adoption", "constituent outcomes", "current Council performance"]
};

const wowListFullPopulationCensusSource: SourceRecord = {
  id: "SRC-WOWLIST-X-FULL-POPULATION-CENSUS-2026-07-15",
  title: "WOW List X full-population census",
  author: "Codex archival review",
  organization: "WOW List",
  kind: "research-run",
  visibility: "public",
  preservationStatus: "live",
  accessedAt: "2026-07-15",
  assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/research/data/wowlist-x-full-population-census-2026-07-15.csv",
  preferredPublicUrl: "asset",
  publicCitation: "Full-population archival census of the 38 objects counted by the @wowlist profile, reviewed July 15, 2026.",
  publicNote: "The census reconciles all 38 profile-counted objects: 16 WOW List-authored posts, six WOW List-authored replies, and 16 reposted external statuses. It also inventories 35 posted short URLs and preserves access-time interaction labels without assigning shared-account authorship.",
  supportsGenerally: ["38-of-38 profile-population reconciliation", "16 project-authored posts", "six project-authored replies", "16 reposted external statuses", "13 distinct repost-source accounts", "35 posted short URLs", "public onboarding exchanges", "mission-theme classification", "stakeholder-group classification", "access-time interaction labels"],
  doesNotEstablish: ["a platform account-data export", "a complete deleted-post history", "the human author of shared-account statuses", "endorsement or partnership from a repost", "broad adoption", "lifetime reach", "audience identity", "project causality for linked events or campaigns"]
};

const kcTownHallFullPopulationCensusSource: SourceRecord = {
  id: "SRC-KC-TOWN-HALL-X-FULL-POPULATION-CENSUS-2026-07-15",
  title: "KC Town Hall X full-population census",
  author: "Codex archival review",
  organization: "KC Town Hall",
  kind: "research-run",
  visibility: "public",
  preservationStatus: "live",
  accessedAt: "2026-07-15",
  assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/research/data/kctownhall-x-full-population-census-2026-07-15.csv",
  preferredPublicUrl: "asset",
  publicCitation: "Full-population archival census of the 183 objects counted by the @KCTownHall profile, reviewed July 15, 2026.",
  publicNote: "The authenticated Posts and Replies review reconciles all 183 profile-counted objects: 142 project-account posts, 13 project-account replies, and 28 reposted external statuses. It inventories 31 distinct posted short URLs, classifies 100 tire-related records and 12 survey-linked records, and preserves three direct then-serving Council-member account responses with explicit authorship and engagement boundaries.",
  supportsGenerally: ["183-of-183 profile-population reconciliation", "142 project-account posts", "13 project-account replies", "28 reposted external statuses", "31 distinct posted short URLs", "100 tire-related records", "12 survey-linked records", "three direct then-serving Council-member account responses", "public operating-surface patterns", "access-time interaction labels"],
  doesNotEstablish: ["a platform account-data export", "a complete deleted-post history", "the human author of shared-account statuses", "independent verification of first-party program quantities", "formal endorsement or partnership", "unique audience reach", "Jamie as operator of post-transition activity", "funding receipt, spending, redevelopment completion, or policy causality"]
};

const nycaProfilePopulationCensusSource: SourceRecord = {
  id: "SRC-NYCA-X-PROFILE-POPULATION-CENSUS-2026-07-15",
  title: "NYC Artist Coalition X profile-population census",
  author: "Codex archival review",
  organization: "NYC Artist Coalition",
  kind: "research-run",
  visibility: "public",
  preservationStatus: "live",
  accessedAt: "2026-07-15",
  assetUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/research/data/nycartc-x-profile-population-census-2026-07-15.csv",
  preferredPublicUrl: "asset",
  publicCitation: "Profile-population archival census of the 5,124 objects reported by the @NYCArtC profile, reviewed July 15, 2026.",
  publicNote: "The census gives all 5,124 profile-counted slots a disposition: 3,123 records recovered through authenticated public interfaces and 2,001 slots not materialized there. The recovered set contains 608 coalition-account originals, 77 coalition-account replies, and 2,438 external source statuses surfaced through native reposts.",
  supportsGenerally: ["5,124-slot population disposition", "3,123 recovered public-interface records", "2,001 not-materialized public-interface slots", "608 coalition-account originals", "77 coalition-account replies", "2,438 external source statuses surfaced through native reposts", "1,161 distinct posted short URLs", "four named campaign identities", "strict five-account and 15-interaction Council-member minimum", "bounded stakeholder and source-network patterns", "dated access-time interaction labels"],
  doesNotEstablish: ["literal recovery of all 5,124 source records", "the contents or status of the 2,001 unmaterialized slots", "a complete deleted-post history", "the human author of every shared-account status", "Jamie as author of every status", "reciprocal engagement from native-repost source accounts", "endorsement", "unique audience reach", "policy causality", "current project status"]
};

const nycaPlatformBoundarySources: SourceRecord[] = [
  {
    id: "SRC-X-HELP-PUBLIC-TIMELINE-LIMITS-2026",
    title: "Help with missing posts",
    organization: "X",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://help.x.com/en/using-x/missing-posts",
    preferredPublicUrl: "canonical",
    publicCitation: "X Help, 'Help with missing posts,' reviewed July 15, 2026.",
    publicNote: "X documents display limits of 800 posts for the Posts tab and 3,200 posts for Posts and replies, and notes that older posts may not always appear because of indexing capacity.",
    supportsGenerally: ["public-interface display limits", "older-post indexing limitation", "the need to distinguish recovery from profile-counter disposition"],
    doesNotEstablish: ["which @NYCArtC slots are unavailable", "that an unmaterialized slot was deleted", "the contents of the 2,001 unmaterialized slots"]
  },
  {
    id: "SRC-X-HELP-OWNER-ARCHIVE-2026",
    title: "New user FAQ: X Archive",
    organization: "X",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://help.x.com/en/resources/new-user-faq",
    preferredPublicUrl: "canonical",
    publicCitation: "X Help, 'New user FAQ,' X Archive guidance reviewed July 15, 2026.",
    publicNote: "X directs account owners to download their X Archive to browse their account history beginning with the first post.",
    supportsGenerally: ["owner-archive recovery path", "first-post account-history access"],
    doesNotEstablish: ["that Jamie has downloaded the archive", "the archive's contents", "recovery of deleted or withheld content"]
  }
];

const nycaSourceTrailSources: SourceRecord[] = [
  {
    id: "SRC-NYCA-X-SOURCE-GOTHAMIST-CABARET-REPEAL-2017",
    title: "City Council Set To Repeal Cabaret Law, Finally Legalize Dancing",
    author: "Jake Offenhartz",
    organization: "Gothamist",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-30",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://gothamist.com/arts-entertainment/city-council-set-to-repeal-cabaret-law-finally-legalize-dancing",
    preferredPublicUrl: "canonical",
    publicCitation: "Jake Offenhartz, 'City Council Set To Repeal Cabaret Law, Finally Legalize Dancing,' Gothamist, October 30, 2017.",
    publicNote: "The article documents the pending Council repeal vote and quotes Olympia Kazi as a NYC Artist Coalition member on discriminatory enforcement; @NYCArtC shared the reporting.",
    supportsGenerally: ["Cabaret Law repeal reporting", "Olympia Kazi's public NYC Artist Coalition identification", "discriminatory-enforcement advocacy context", "a mission-relevant link in the account source trail"],
    doesNotEstablish: ["Jamie as the quoted speaker", "Jamie as the account-post author", "sole coalition causality for repeal", "authorship of the repeal legislation"]
  },
  {
    id: "SRC-NYCA-X-SOURCE-MOME-MARCH-REPORTS",
    title: "Multi-Agency Response to Community Hotspots reports",
    organization: "NYC Mayor's Office of Media and Entertainment",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.nyc.gov/site/mome/nightlife/march-report.page",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Mayor's Office of Media and Entertainment, Multi-Agency Response to Community Hotspots reporting page, reviewed July 15, 2026.",
    publicNote: "The official page preserves MARCH reporting required under Local Law 220; @NYCArtC linked the reporting in its nightlife-accountability source trail.",
    supportsGenerally: ["official MARCH reporting surface", "nightlife-enforcement accountability context", "a mission-relevant link in the account source trail"],
    doesNotEstablish: ["Jamie's authorship of the reports", "Jamie as the account-post author", "coalition causality for every reporting requirement", "the accuracy of every agency field"]
  },
  {
    id: "SRC-NYCA-X-SOURCE-GOTHAMIST-COMMERCIAL-RENTS-2021",
    title: "In Pandemic's Aftermath, Calls Grow For NYC To Regulate Commercial Rents",
    author: "Beth Fertig",
    organization: "Gothamist / WNYC",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-09-16",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://gothamist.com/news/in-pandemics-aftermath-calls-grow-for-nyc-to-regulate-commercial-rents",
    preferredPublicUrl: "canonical",
    publicCitation: "Beth Fertig, 'In Pandemic's Aftermath, Calls Grow For NYC To Regulate Commercial Rents,' Gothamist, September 16, 2021.",
    publicNote: "The article reports on a Council proposal for Commercial Rent Stabilization and the public policy debate around storefront rents; the recovered @NYCArtC corpus carried the article through a WNYC source status.",
    supportsGenerally: ["Commercial Rent Stabilization policy context", "Council hearing and sponsor context", "a mission-relevant link surfaced through account curation"],
    doesNotEstablish: ["Jamie as article author", "Jamie as the source-status author", "coalition endorsement by WNYC", "policy passage or coalition causality"]
  },
  {
    id: "SRC-NYCA-X-SOURCE-NATION-MUSICIAN-RELIEF-2022",
    title: "Covid and Canceled Gigs Have Left Musicians High and Dry",
    author: "Marc Ribot",
    organization: "The Nation",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2022-03-10",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.thenation.com/article/culture/covid-touring-musicians-aid/",
    preferredPublicUrl: "canonical",
    publicCitation: "Marc Ribot, 'Covid and Canceled Gigs Have Left Musicians High and Dry,' The Nation, March 10, 2022.",
    publicNote: "The article concerns pandemic relief and labor conditions for working musicians; the recovered @NYCArtC corpus surfaced it through a Music Workers Alliance source status.",
    supportsGenerally: ["music-worker relief context", "artist-labor source curation"],
    doesNotEstablish: ["Jamie as article or source-status author", "reciprocal engagement by the article or source account", "coalition causality for relief policy"]
  },
  {
    id: "SRC-NYCA-X-SOURCE-GOTHAMIST-MUSICIAN-RALLY-2022",
    title: "New York City musicians, lawmakers rally for extended pandemic relief aid",
    author: "Steve Smith",
    organization: "Gothamist",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2022-03-11",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://gothamist.com/arts-entertainment/musicians-rally-for-pandemic-relief",
    preferredPublicUrl: "canonical",
    publicCitation: "Steve Smith, 'New York City musicians, lawmakers rally for extended pandemic relief aid,' Gothamist, March 11, 2022.",
    publicNote: "The article documents public advocacy for working-musician pandemic relief; the recovered @NYCArtC corpus surfaced it through a Music Workers Alliance source status.",
    supportsGenerally: ["music-worker relief advocacy", "artist-labor source curation"],
    doesNotEstablish: ["Jamie as article or source-status author", "reciprocal engagement by Gothamist or the source account", "coalition causality for relief policy"]
  },
  {
    id: "SRC-NYCA-X-SOURCE-FUTURE-MUSIC-HOLDBACKS-2023",
    title: "What are holdbacks in concert ticketing?",
    author: "Kevin Erickson",
    organization: "Future of Music Coalition",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2023-03-15",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.futureofmusic.org/news/2023/3/15/ticketing-basics-holdbacks",
    preferredPublicUrl: "canonical",
    publicCitation: "Kevin Erickson, 'What are holdbacks in concert ticketing?' Future of Music Coalition, March 15, 2023.",
    publicNote: "The explainer documents a music-industry policy issue circulated through a Future of Music Coalition source status in the recovered @NYCArtC corpus.",
    supportsGenerally: ["music-industry policy source curation", "ticketing-policy context"],
    doesNotEstablish: ["Jamie as article or source-status author", "reciprocal engagement by Future of Music Coalition", "coalition adoption of every position in the article"]
  }
];

const wowListContextSources: SourceRecord[] = [
  {
    id: "SRC-WOWLIST-YOUTUBE-SHELBY-TUTORIAL-2015",
    title: "Shelby's WOWList tutorial",
    author: "Shelby Turner",
    organization: "YouTube",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.youtube.com/watch?v=nQg47LtixPI",
    preferredPublicUrl: "canonical",
    publicCitation: "Shelby Turner, 'SHELBY'S WOWLIST TUTORIAL ~ for my new fave events website,' YouTube, reviewed July 15, 2026.",
    publicNote: "YouTube's live oEmbed record preserves the participant-created tutorial title, creator name, and video identifier; the @wowlist account linked the tutorial alongside its join page in August 2015.",
    supportsGenerally: ["an external participant-created WOW List tutorial", "public product-onboarding use", "a public join-page association"],
    doesNotEstablish: ["broad organizer adoption", "the tutorial's audience size", "the identity of the account post author", "a formal partnership"]
  },
  {
    id: "SRC-GRASSTRONAUT-HOMEWORK-EVERY-TOWN-2015-01-29",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    author: "Elise Granata",
    organization: "Grasstronaut",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-01-29",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl: "https://web.archive.org/web/20150201081214/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' Grasstronaut, January 29, 2015; archived February 1, 2015.",
    publicNote: "The article reviews an all-ages venue manual covering organizational structure, promotion, production, space, fundraising, community-building, conflict resolution, and the value of documenting defunct spaces. @wowlist linked it as a DIY guide to DIY guides.",
    supportsGenerally: ["the account's public source trail around DIY operational knowledge", "peer-learning context", "documentation of cultural-space practice"],
    doesNotEstablish: ["Jamie as article author", "WOW List adoption", "the success of any venue", "a direct project outcome"]
  },
  {
    id: "SRC-GOOD-TIMES-ZINES-TWO-POINT-ZERO-2015-05-06",
    title: "Zines 2.0",
    author: "Elise Granata",
    organization: "Good Times",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2015-05-06",
    accessedAt: "2026-07-15",
    canonicalUrl: "http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    preferredPublicUrl: "archive",
    publicCitation: "Elise Granata, 'Zines 2.0,' Good Times, May 6, 2015; archived September 7, 2015.",
    publicNote: "The article argues that underground cultural movements need self-authored records and cross-scene connections, describing Grasstronaut as a community-distributed archive for grassroots arts projects. @wowlist linked the article as writing about documenting and connecting DIY culture.",
    supportsGenerally: ["the account's public source trail around DIY archives", "cross-scene knowledge exchange", "community-authored documentation context"],
    doesNotEstablish: ["Jamie as article author", "WOW List adoption", "the completeness of any DIY archive", "a direct project outcome"]
  },
  {
    id: "SRC-KQED-GHOST-SHIP-VIGIL-2016-12-06",
    title: "VIDEO: Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire",
    author: "Brittany Hosea-Small and Adam Grossberg",
    organization: "KQED",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-12-06",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire",
    preferredPublicUrl: "canonical",
    publicCitation: "Brittany Hosea-Small and Adam Grossberg, 'VIDEO: Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire,' KQED, December 6, 2016.",
    publicNote: "KQED documented the Lake Merritt candlelight vigil for the 36 people killed in the Ghost Ship fire. @wowlist linked the report after circulating the vigil and mutual-aid resources.",
    supportsGenerally: ["the public documentation linked by @wowlist", "Ghost Ship vigil context", "a care-and-solidarity pattern in the account record"],
    doesNotEstablish: ["WOW List as vigil organizer", "Jamie as account post author", "event attendance caused by the post", "policy influence"]
  },
  {
    id: "SRC-MEOW-WOLF-DIY-FUND-2017",
    title: "Meow Wolf DIY Fund",
    organization: "Meow Wolf",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2017-03-12",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://meowwolf.com/diy",
    archiveUrl: "https://web.archive.org/web/20170312084829/https://meowwolf.com/DIY/",
    preferredPublicUrl: "archive",
    publicCitation: "Meow Wolf, 'Meow Wolf DIY Fund,' archived March 12, 2017.",
    publicNote: "The archived page documents a $100,000 annual fund for DIY art and music spaces, including infrastructure improvements, rent, materials, equipment, and legal, building-code, and organizational consulting. @wowlist reposted the fund announcement.",
    supportsGenerally: ["the cultural-space support context curated by @wowlist", "the stated $100,000 annual fund", "infrastructure and operational support categories"],
    doesNotEstablish: ["WOW List as fund organizer", "Jamie as account post author", "reciprocal engagement by Meow Wolf", "any funding outcome for a WOW List organizer"]
  }
];

const kcTownHallContextSources: SourceRecord[] = [
  {
    id: "SRC-KC-TOWN-HALL-KC-STAR-LEONS-THRIFTWAY",
    title: "Leon's Thriftway may be the oldest black-owned grocery store in the country",
    organization: "The Kansas City Star",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.kansascity.com/news/business/article87241897.html",
    preferredPublicUrl: "canonical",
    publicCitation: "The Kansas City Star, 'Leon's Thriftway may be the oldest black-owned grocery store in the country,' reviewed July 15, 2026.",
    publicNote: "KC Town Hall circulated the article in an April 2019 neighborhood food-access thread that received direct responses from Council members Quinton Lucas and Jolie Justus.",
    supportsGenerally: ["Leon's Thriftway neighborhood food-access context", "a mission-relevant source circulated by the project account"],
    doesNotEstablish: ["coverage of KC Town Hall", "Jamie as article author", "project causality for official response", "a completed grocery-store outcome"]
  },
  {
    id: "SRC-KC-TOWN-HALL-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
    title: "Affordable Housing Policy hits the docket in KCMO",
    organization: "Northeast News",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2018-09-19",
    accessedAt: "2026-07-15",
    archiveUrl: "https://web.archive.org/web/20180920120704/http://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    preferredPublicUrl: "archive",
    publicCitation: "Northeast News, 'Affordable Housing Policy hits the docket in KCMO,' September 19, 2018; archived September 20, 2018.",
    publicNote: "The @KCTownHall account circulated this local affordable-housing policy article in September 2018.",
    supportsGenerally: ["local affordable-housing policy context", "a mission-relevant source circulated by the project account"],
    doesNotEstablish: ["coverage of KC Town Hall", "Jamie as article author", "the account's influence on housing policy"]
  },
  {
    id: "SRC-KC-TOWN-HALL-CURBED-RENTER-TAX-CREDIT-2018",
    title: "Tax credit for renters proposed by U.S. Senator Kamala Harris",
    author: "Alissa Walker",
    organization: "Curbed",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    publishedAt: "2018-07-20",
    accessedAt: "2026-07-15",
    archiveUrl: "https://web.archive.org/web/20180720221744/https://www.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
    preferredPublicUrl: "archive",
    publicCitation: "Alissa Walker, 'Tax credit for renters proposed by U.S. Senator Kamala Harris,' Curbed, July 20, 2018; archived July 20, 2018.",
    publicNote: "The @KCTownHall corpus preserves this national renter-policy article through a reposted public source status.",
    supportsGenerally: ["renter-policy source context", "housing-information circulation in the project-account record"],
    doesNotEstablish: ["coverage of KC Town Hall", "Jamie as article author", "formal alignment with the article's publisher or subject"]
  },
  {
    id: "SRC-KC-TOWN-HALL-RIDEKC-NEXT-SYSTEM-REDESIGN",
    title: "RideKC Next System Redesign",
    organization: "Kansas City Area Transportation Authority",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: "2026-07-15",
    archiveUrl: "https://web.archive.org/web/20190821135819/https://ridekc.org/planning/ridekc-next",
    preferredPublicUrl: "archive",
    publicCitation: "Kansas City Area Transportation Authority, 'RideKC Next System Redesign,' archived August 21, 2019.",
    publicNote: "The @KCTownHall record carried this regional transit-planning and public-input source.",
    supportsGenerally: ["transit-planning context", "public-input resource circulation"],
    doesNotEstablish: ["KC Town Hall authorship of the transit plan", "formal partnership", "influence on the redesign"]
  },
  {
    id: "SRC-KC-TOWN-HALL-KCUR-MISSOURI-PRIMARY-CHEAT-SHEET-2018",
    title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
    author: "Erica Hunzinger",
    organization: "KCUR",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-08-05",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
    preferredPublicUrl: "canonical",
    publicCitation: "Erica Hunzinger, 'A Cheat Sheet For Tuesday's Primary Election In Missouri,' KCUR, August 5, 2018.",
    publicNote: "KC Town Hall circulated the article with an official Missouri voter-information link in August 2018.",
    supportsGenerally: ["election-information source context", "voter-resource circulation"],
    doesNotEstablish: ["coverage of KC Town Hall", "Jamie as article author", "voter participation or outcome"]
  },
  {
    id: "SRC-KC-TOWN-HALL-MISSOURI-VOTER-OUTREACH",
    title: "Missouri voter outreach search",
    organization: "Missouri Secretary of State",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://voteroutreach.sos.mo.gov/PRD/VoterOutreach/VOSearch.aspx",
    preferredPublicUrl: "canonical",
    publicCitation: "Missouri Secretary of State voter outreach search, reviewed July 15, 2026.",
    publicNote: "KC Town Hall circulated the official voter-information pathway alongside election reporting.",
    supportsGenerally: ["official voter-information resource", "civic-resource circulation"],
    doesNotEstablish: ["voter participation or outcome", "project ownership of the government resource"]
  },
  {
    id: "SRC-KC-TOWN-HALL-YOUTUBE-COVID-RELIEF-QA-2020",
    title: "COVID-19 relief resource Q&A",
    organization: "KC Town Hall",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-04-20",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://youtu.be/onCKU-TuPhc",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall, COVID-19 relief resource Q&A video, April 20, 2020.",
    publicNote: "The project account circulated this public Q&A as a pandemic-resource pathway.",
    supportsGenerally: ["project-authored public resource", "pandemic information circulation"],
    doesNotEstablish: ["current public-benefit eligibility", "legal or financial advice", "Jamie as sole author", "resource uptake"]
  },
  {
    id: "SRC-KC-TOWN-HALL-YOUTUBE-PAINT-CLEANUP-2018",
    title: "Bad latex paint cleanup video and tool list",
    organization: "KC Town Hall",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-08-30",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://youtu.be/PmLjLyOpS9I",
    preferredPublicUrl: "canonical",
    publicCitation: "KC Town Hall, bad latex paint cleanup video and tool list, August 30, 2018.",
    publicNote: "The project account circulated this project-authored cleanup documentation and tool list.",
    supportsGenerally: ["public cleanup documentation", "practical tool-list circulation"],
    doesNotEstablish: ["Jamie as sole author", "complete remediation", "professional environmental guidance"]
  },
  {
    id: "SRC-KC-STAR-LUCAS-JUSTUS-COUNCIL-2019-04-03",
    title: "Council members Justus, Lucas win Kansas City mayoral primary",
    organization: "The Kansas City Star",
    author: "Allison Kite, Steve Vockrodt, and Andy Marso",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-04-03",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.kansascity.com/news/politics-government/election/article228683379.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Allison Kite, Steve Vockrodt, and Andy Marso, 'Council members Justus, Lucas win Kansas City mayoral primary,' The Kansas City Star, April 3, 2019.",
    publicNote: "Contemporaneous reporting identifies Jolie Justus and Quinton Lucas as sitting Kansas City Council members shortly before their April 29 responses to KC Town Hall.",
    supportsGenerally: ["Jolie Justus Council service in April 2019", "Quinton Lucas Council service in April 2019"],
    doesNotEstablish: ["official endorsement of KC Town Hall", "project causality", "a complete Council roster"]
  },
  {
    id: "SRC-KCMO-CLERK-MELISSA-ROBINSON-SERVICE",
    title: "Melissa Robinson service record",
    organization: "Kansas City Clerk",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://clerk.kcmo.gov/PersonDetail.aspx?GUID=1696D403-A114-4AB0-B632-A303AF8E3B3C&ID=240616",
    preferredPublicUrl: "canonical",
    publicCitation: "Kansas City Clerk service record for Melissa Robinson, reviewed July 15, 2026.",
    publicNote: "The official person record dates Robinson's Council service from July 19, 2019, establishing that her August 2020 response to KC Town Hall came from a then-serving Council member account.",
    supportsGenerally: ["Melissa Robinson Council service beginning July 19, 2019", "service-date context for the August 2020 response"],
    doesNotEstablish: ["formal endorsement", "project partnership", "policy causality"]
  }
];

const kcTownHallCouncilResponseSeeds: SocialPostSeed[] = [
  {
    id: "SRC-KC-TOWN-HALL-X-QUINTON-LUCAS-RESPONSE-1122866432130334720",
    title: "Quinton Lucas responds to KC Town Hall's Leon's alert",
    organization: "Quinton Lucas",
    kind: "government-social-post",
    handle: "QuintonLucasKC",
    statusId: "1122866432130334720",
    publishedAt: "2019-04-29",
    publicCitation: "Quinton Lucas public quote-response to KC Town Hall's Leon's Thriftway alert, April 29, 2019.",
    publicNote: "The then-serving Council member quote-responded to KC Town Hall's alert and described contacting ownership and working to keep the neighborhood grocery open.",
    supportsGenerally: ["direct Council-member account response", "neighborhood food-access dialogue", "official-response context"],
    doesNotEstablish: ["formal endorsement", "partnership", "project causality", "a completed grocery-store outcome"]
  },
  {
    id: "SRC-KC-TOWN-HALL-X-JOLIE-JUSTUS-RESPONSE-1122883010582466560",
    title: "Jolie Justus replies to KC Town Hall about Leon's",
    organization: "Jolie Justus",
    kind: "government-social-post",
    handle: "joliejustus",
    statusId: "1122883010582466560",
    publishedAt: "2019-04-29",
    publicCitation: "Jolie Justus public reply to KC Town Hall about Leon's Thriftway, April 29, 2019.",
    publicNote: "The then-serving Council member replied directly, describing work with the Economic Development Corporation and a visit to the store.",
    supportsGenerally: ["direct Council-member account response", "neighborhood food-access dialogue", "economic-development context"],
    doesNotEstablish: ["formal endorsement", "partnership", "project causality", "a completed grocery-store outcome"]
  },
  {
    id: "SRC-KC-TOWN-HALL-X-MELISSA-ROBINSON-RESPONSE-1289714535251742726",
    title: "Melissa Robinson thanks KC Town Hall for community work",
    organization: "Melissa Robinson",
    kind: "government-social-post",
    handle: "Robinson4kc",
    statusId: "1289714535251742726",
    publishedAt: "2020-08-02",
    publicCitation: "Melissa Robinson public reply thanking KC Town Hall for work to improve community conditions, August 2, 2020.",
    publicNote: "The then-serving Council member directly thanked KC Town Hall for doing heavy work to improve community conditions.",
    supportsGenerally: ["direct Council-member account response", "recognition of neighborhood work"],
    doesNotEstablish: ["formal endorsement", "partnership", "a quantified program outcome", "Jamie's authorship of the triggering shared-account post"]
  }
];

const callNycProjectPostSeeds: SocialPostSeed[] = [
  {
    id: "SRC-CALLNYC-X-LAUNCH-706208629360304128",
    title: "CallNYC public launch post",
    organization: "Call NYC",
    kind: "institutional-social-post",
    handle: "CallNYCapp",
    statusId: "706208629360304128",
    publishedAt: "2016-03-05",
    publicCitation: "CallNYC public launch post, March 5, 2016.",
    publicNote: "The pinned account post announced CallNYC.org and connected it to New York City Council constituent-services data during Open Data Day.",
    supportsGenerally: ["public launch date", "project URL", "Council constituent-services data context", "Open Data Day context"],
    doesNotEstablish: ["the post's self-described first-project superlative", "official Council ownership", "formal hackathon submission", "current service status"]
  },
  {
    id: "SRC-CALLNYC-X-JAMIE-MAKER-710150246781882369",
    title: "Jamie Burkart identifies CallNYC as his civic-technology project",
    organization: "Call NYC",
    kind: "institutional-social-post",
    handle: "CallNYCapp",
    statusId: "710150246781882369",
    publishedAt: "2016-03-16",
    publicCitation: "CallNYC account reply identifying Jamie Burkart and his relationship to the project, March 16, 2016.",
    publicNote: "The first-person reply identifies Jamie by name and describes CallNYC as his first civic-technology project while also naming WOW List.",
    supportsGenerally: ["Jamie's public first-person relationship to CallNYC", "Jamie's self-description of CallNYC as his first civic-technology project", "contemporaneous CallNYC and WOW List connection"],
    doesNotEstablish: ["independent third-party verification", "sole authorship of every artifact", "official Council ownership", "formal endorsement"]
  },
  {
    id: "SRC-CALLNYC-X-DISTRICT-PROFILE-API-713537148000018432",
    title: "CallNYC district-profile API announcement",
    organization: "Call NYC",
    kind: "institutional-social-post",
    handle: "CallNYCapp",
    statusId: "713537148000018432",
    publishedAt: "2016-03-25",
    publicCitation: "CallNYC district-profile API announcement, March 25, 2016.",
    publicNote: "The post announced an API exposing Council district profile fields including name, phone, email, Twitter, and services.",
    supportsGenerally: ["public API announcement", "district-profile field scope", "open-data implementation context"],
    doesNotEstablish: ["current endpoint availability", "current contact accuracy", "external adoption", "official Council ownership"]
  },
  {
    id: "SRC-CALLNYC-X-COUNCIL-HANDLE-JSON-API-722837286476390401",
    title: "CallNYC Council-handle JSON API reply",
    organization: "Call NYC",
    kind: "institutional-social-post",
    handle: "CallNYCapp",
    statusId: "722837286476390401",
    publishedAt: "2016-04-20",
    publicCitation: "CallNYC reply documenting a JSON API for Council-member Twitter usernames, April 20, 2016.",
    publicNote: "The reply says Jamie made a JSON API so civic-technology collaborators could retrieve Council-member Twitter usernames.",
    supportsGenerally: ["Jamie-attributed JSON API work", "Council-member handle endpoint purpose", "civic-technology collaborator context"],
    doesNotEstablish: ["current endpoint availability", "current handle accuracy", "external production adoption", "official Council ownership"]
  }
];

const callNycCouncilPostSeeds: SocialPostSeed[] = [
  {
    id: "SRC-CALLNYC-X-MARGARET-CHIN-884863588317442049",
    title: "Margaret Chin response to CallNYC recognition",
    organization: "Office of Council Member Margaret Chin",
    kind: "government-social-post",
    handle: "CM_MargaretChin",
    statusId: "884863588317442049",
    publishedAt: "2017-07-11",
    publicCitation: "Margaret Chin response mentioning @CallNYCapp, July 11, 2017.",
    publicNote: "The post directly thanked CallNYC for recognizing the office's prior-year work and expressed an intention to improve the numbers.",
    supportsGenerally: ["direct Council-member-account mention of @CallNYCapp", "recognition-response interaction"],
    doesNotEstablish: ["formal endorsement", "product adoption", "a complete engagement count", "causality for office performance"]
  },
  {
    id: "SRC-CALLNYC-X-MATHIEU-EUGENE-783305320508514304",
    title: "Mathieu Eugene response to CallNYC housing recognition",
    organization: "Office of Council Member Mathieu Eugene",
    kind: "government-social-post",
    handle: "CMMathieuEugene",
    statusId: "783305320508514304",
    publishedAt: "2016-10-04",
    publicCitation: "Mathieu Eugene response carrying a CallNYC housing-recognition post, October 4, 2016.",
    publicNote: "The post added a constituent-housing message while carrying CallNYC's recognition and project link.",
    supportsGenerally: ["Council-member-account amplification of CallNYC", "housing issue-pathway context"],
    doesNotEstablish: ["formal endorsement", "product adoption", "complete office performance", "causality for constituent outcomes"]
  },
  {
    id: "SRC-CALLNYC-X-HELEN-ROSENTHAL-780797474277511170",
    title: "Helen Rosenthal shares CallNYC",
    organization: "Office of Council Member Helen Rosenthal",
    kind: "government-social-post",
    handle: "HelenRosenthal",
    statusId: "780797474277511170",
    publishedAt: "2016-09-27",
    publicCitation: "Helen Rosenthal post sharing CallNYC.org, September 27, 2016.",
    publicNote: "The post told residents that Council offices could help and shared CallNYC.org alongside legal and housing organizations.",
    supportsGenerally: ["Council-member-account link sharing", "resident-help framing"],
    doesNotEstablish: ["formal endorsement", "official Council ownership", "resident usage", "service outcomes"]
  },
  {
    id: "SRC-CALLNYC-X-ROSIE-MENDEZ-733410096915550208",
    title: "Rosie Mendez response carrying CallNYC recognition",
    organization: "Office of Council Member Rosie Mendez",
    kind: "government-social-post",
    handle: "RosieMendez",
    statusId: "733410096915550208",
    publishedAt: "2016-05-19",
    publicCitation: "Rosie Mendez response carrying a CallNYC emergency-repairs recognition, May 19, 2016.",
    publicNote: "The post thanked the office team while carrying CallNYC's recognition and issue-page link.",
    supportsGenerally: ["Council-member-account amplification of CallNYC", "emergency-repairs issue-pathway context"],
    doesNotEstablish: ["formal endorsement", "product adoption", "complete office performance", "causality for repair outcomes"]
  },
  {
    id: "SRC-CALLNYC-X-YDANIS-RODRIGUEZ-733089563334299648",
    title: "Ydanis Rodriguez response carrying CallNYC recognition",
    organization: "Office of Council Member Ydanis Rodriguez",
    kind: "government-social-post",
    handle: "ydanis",
    statusId: "733089563334299648",
    publishedAt: "2016-05-19",
    publicCitation: "Ydanis Rodriguez response carrying a CallNYC rent-overcharge recognition, May 19, 2016.",
    publicNote: "The post described tenant-rights service while carrying CallNYC's recognition and issue-page link.",
    supportsGenerally: ["Council-member-account amplification of CallNYC", "rent-overcharge issue-pathway context"],
    doesNotEstablish: ["formal endorsement", "product adoption", "complete office performance", "causality for tenant outcomes"]
  },
  {
    id: "SRC-CALLNYC-X-PETER-KOO-725422741160079360",
    title: "Peter Koo reposts CallNYC recognition",
    organization: "Office of Council Member Peter Koo",
    kind: "government-social-post",
    handle: "CMPeterKoo",
    statusId: "725422741160079360",
    publishedAt: "2016-04-27",
    publicCitation: "Peter Koo post explicitly identifying a repost from @CallNYCapp, April 27, 2016.",
    publicNote: "The post preserved CallNYC's Lifeline-recognition language and identified the source as Call NYC.",
    supportsGenerally: ["Council-member-account repost of CallNYC", "Lifeline issue-pathway context"],
    doesNotEstablish: ["formal endorsement", "product adoption", "complete office performance", "causality for service outcomes"]
  },
  {
    id: "SRC-CALLNYC-X-RUBEN-WILLS-732717792097603584",
    title: "Ruben Wills replies to a CallNYC recognition",
    organization: "Office of Council Member Ruben Wills",
    kind: "government-social-post",
    handle: "CM_RubenWills",
    statusId: "732717792097603584",
    publishedAt: "2016-05-17",
    publicCitation: "Ruben Wills reply in a CallNYC recognition thread, May 17, 2016.",
    publicNote: "The authenticated conversation view shows the reply under CallNYC's Buildings Violation recognition, copying the Queens Chronicle.",
    supportsGenerally: ["Council-member-account reply to CallNYC", "press-copying interaction"],
    doesNotEstablish: ["formal endorsement", "article publication", "product adoption", "complete office performance"]
  },
  {
    id: "SRC-CALLNYC-X-STEVEN-MATTEO-727621921341358081",
    title: "Steven Matteo replies to CallNYC",
    organization: "Office of Council Member Steven Matteo",
    kind: "government-social-post",
    handle: "StevenMatteo",
    statusId: "727621921341358081",
    publishedAt: "2016-05-03",
    publicCitation: "Steven Matteo reply mentioning @CallNYCapp, May 3, 2016.",
    publicNote: "The post replied to CallNYC and the Council account with a concise constituent-service issue description about potholes.",
    supportsGenerally: ["Council-member-account reply to CallNYC", "constituent-service issue interaction"],
    doesNotEstablish: ["formal endorsement", "product adoption", "issue resolution", "complete office performance"]
  }
];

const nycaCouncilPostSeeds: SocialPostSeed[] = [
  {
    id: "SRC-NYCA-X-RAFAEL-ESPINAL-847594658557566976",
    title: "Rafael Espinal at a Cabaret Law listening event with NYC Artist Coalition",
    organization: "Office of Council Member Rafael Espinal",
    kind: "government-social-post",
    handle: "RLEspinal",
    statusId: "847594658557566976",
    publishedAt: "2017-03-30",
    publicCitation: "Rafael Espinal post describing Cabaret Law listening with @NYCArtC, March 30, 2017.",
    publicNote: "The post places the Council member with NYC Artist Coalition at a public listening event about Cabaret Law repeal.",
    supportsGenerally: ["public Council-member collaboration with NYC Artist Coalition", "Cabaret Law listening context"],
    doesNotEstablish: ["Jamie's authorship of the post", "sole coalition causality", "legislative authorship by the coalition"]
  },
  {
    id: "SRC-NYCA-X-RAFAEL-ESPINAL-910610976109719553",
    title: "Rafael Espinal credits coalition context at Office of Nightlife bill signing",
    organization: "Office of Council Member Rafael Espinal",
    kind: "government-social-post",
    handle: "RLEspinal",
    statusId: "910610976109719553",
    publishedAt: "2017-09-20",
    publicCitation: "Rafael Espinal post naming @NYCArtC at the Office of Nightlife bill signing, September 20, 2017.",
    publicNote: "The post thanked the mayor for signing the Office of Nightlife bill and named NYC Artist Coalition among several public collaborators and advocates.",
    supportsGenerally: ["public coalition recognition", "Office of Nightlife bill-signing context", "multi-actor campaign context"],
    doesNotEstablish: ["Jamie or NYC Artist Coalition as sole creator of the office", "sole policy causality", "authorship of the legislation"]
  },
  {
    id: "SRC-NYCA-X-RAFAEL-ESPINAL-924972124628049920",
    title: "Rafael Espinal names NYC Artist Coalition in Cabaret Law repeal effort",
    organization: "Office of Council Member Rafael Espinal",
    kind: "government-social-post",
    handle: "RLEspinal",
    statusId: "924972124628049920",
    publishedAt: "2017-10-30",
    publicCitation: "Rafael Espinal post naming @NYCArtC in the Cabaret Law repeal effort, October 30, 2017.",
    publicNote: "The post linked New York Times repeal coverage and described the effort as shared with Dance Liberation Network and NYC Artist Coalition.",
    supportsGenerally: ["public coalition credit", "Cabaret Law repeal campaign context", "shared advocacy framing"],
    doesNotEstablish: ["Jamie or NYC Artist Coalition as sole cause of repeal", "sole campaign leadership", "authorship of the legislation"]
  },
  {
    id: "SRC-NYCA-X-RAFAEL-ESPINAL-978604809493336065",
    title: "Rafael Espinal describes NYC Artist Coalition nightlife town hall",
    organization: "Office of Council Member Rafael Espinal",
    kind: "government-social-post",
    handle: "RLEspinal",
    statusId: "978604809493336065",
    publishedAt: "2018-03-27",
    publicCitation: "Rafael Espinal post describing a nightlife town hall with @NYCArtC, March 27, 2018.",
    publicNote: "The post says the Council member and NYC Artist Coalition welcomed the Nightlife Mayor to hear issues facing art and music venues.",
    supportsGenerally: ["joint public town-hall context", "listening to art and music venues", "Office of Nightlife relationship"],
    doesNotEstablish: ["Jamie's sole production role", "a complete event account", "policy adoption caused by the town hall"]
  },
  {
    id: "SRC-NYCA-X-RAFAEL-ESPINAL-1098626837821997056",
    title: "Rafael Espinal describes working with NYC Artist Coalition to Save NYC Spaces",
    organization: "Office of Council Member Rafael Espinal",
    kind: "government-social-post",
    handle: "RLEspinal",
    statusId: "1098626837821997056",
    publishedAt: "2019-02-21",
    publicCitation: "Rafael Espinal post describing work with @NYCArtC on #SaveNYCSpaces, February 21, 2019.",
    publicNote: "The post directly thanked NYC Artist Coalition and described preserving local culture as shared work.",
    supportsGenerally: ["public Council-member collaboration", "Save NYC Spaces campaign context", "cultural-space preservation framing"],
    doesNotEstablish: ["sole coalition leadership", "policy causality", "Jamie's authorship of the post"]
  },
  {
    id: "SRC-NYCA-X-STEPHEN-LEVIN-1093220593317629952",
    title: "Stephen Levin promotes MARCH hearing with NYC Artist Coalition",
    organization: "Office of Council Member Stephen Levin",
    kind: "government-social-post",
    handle: "StephenLevin33",
    statusId: "1093220593317629952",
    publishedAt: "2019-02-06",
    publicCitation: "Stephen Levin post promoting a MARCH hearing with @NYCArtC, February 6, 2019.",
    publicNote: "The post invited small businesses and nightlife venues to a Council hearing on MARCH raids and linked the Talks Not Raids public surface.",
    supportsGenerally: ["Council hearing mobilization", "NYC Artist Coalition participation", "Talks Not Raids public identity"],
    doesNotEstablish: ["Jamie's sole production role", "a complete hearing record", "policy outcome caused by the campaign"]
  },
  {
    id: "SRC-NYCA-X-STEPHEN-LEVIN-1095020293112979457",
    title: "Stephen Levin thanks NYC Artist Coalition after MARCH testimony",
    organization: "Office of Council Member Stephen Levin",
    kind: "government-social-post",
    handle: "StephenLevin33",
    statusId: "1095020293112979457",
    publishedAt: "2019-02-11",
    publicCitation: "Stephen Levin post thanking @NYCArtC after MARCH testimony, February 11, 2019.",
    publicNote: "The post described testimony from venue operators and thanked NYC Artist Coalition with several named spaces for making the issue visible.",
    supportsGenerally: ["public testimony context", "Council-member recognition of coalition work", "Talks Not Raids campaign context"],
    doesNotEstablish: ["Jamie's sole role", "the complete witness roster", "policy outcome caused by the testimony"]
  },
  {
    id: "SRC-NYCA-X-STEPHEN-LEVIN-1336765371773173761",
    title: "Stephen Levin promotes small-business event with NYC Artist Coalition",
    organization: "Office of Council Member Stephen Levin",
    kind: "government-social-post",
    handle: "StephenLevin33",
    statusId: "1336765371773173761",
    publishedAt: "2020-12-09",
    publicCitation: "Stephen Levin post promoting a small-business event with @NYCArtC, December 9, 2020.",
    publicNote: "The post named NYC Artist Coalition and partner advocates in a discussion about saving small businesses and Commercial Rent Stabilization.",
    supportsGenerally: ["Council-member event participation", "Commercial Rent Stabilization context", "multi-organization campaign network"],
    doesNotEstablish: ["policy adoption", "sole coalition leadership", "Jamie's authorship of the post"]
  },
  {
    id: "SRC-NYCA-X-JIMMY-VAN-BRAMER-1320792543773282304",
    title: "Jimmy Van Bramer names NYC Artist Coalition in arts-support message",
    organization: "Office of Council Member Jimmy Van Bramer",
    kind: "government-social-post",
    handle: "JimmyVanBramer",
    statusId: "1320792543773282304",
    publishedAt: "2020-10-26",
    publicCitation: "Jimmy Van Bramer post naming @NYCArtC in an arts-support message, October 26, 2020.",
    publicNote: "The post named NYC Artist Coalition among cultural organizations while arguing for stronger arts and culture support.",
    supportsGenerally: ["Council-member-account mention of NYC Artist Coalition", "arts-support policy context"],
    doesNotEstablish: ["formal endorsement of every coalition position", "policy adoption", "Jamie's authorship of the post"]
  },
  {
    id: "SRC-NYCA-X-MARK-LEVINE-1241027587947876352",
    title: "Mark Levine replies to NYC Artist Coalition",
    organization: "Office of Council Member Mark Levine",
    kind: "government-social-post",
    handle: "MarkLevineNYC",
    statusId: "1241027587947876352",
    publishedAt: "2020-03-20",
    publicCitation: "Mark Levine reply to @NYCArtC in a public-information thread, March 20, 2020.",
    publicNote: "The authenticated conversation view shows NYC Artist Coalition asking when a pandemic restriction would take effect and the Council member replying directly.",
    supportsGenerally: ["direct Council-member-account reply to @NYCArtC", "public-information exchange"],
    doesNotEstablish: ["formal endorsement", "coalition policy influence", "authorship of the parent post by Jamie"]
  },
  {
    id: "SRC-NYCA-X-JUSTIN-BRANNAN-1167536258438115333",
    title: "Justin Brannan replies to NYC Artist Coalition",
    organization: "Office of Council Member Justin Brannan",
    kind: "government-social-post",
    handle: "JustinBrannan",
    statusId: "1167536258438115333",
    publishedAt: "2019-08-30",
    publicCitation: "Justin Brannan reply to @NYCArtC in an MTA accessibility thread, August 30, 2019.",
    publicNote: "The authenticated conversation view shows NYC Artist Coalition responding to the Council member's digital-divide and bus-information post, followed by a direct reply from the member.",
    supportsGenerally: ["direct Council-member-account reply to @NYCArtC", "public dialogue around accessible transit information"],
    doesNotEstablish: ["formal endorsement", "campaign policy adoption", "authorship of the coalition reply by Jamie"]
  },
  {
    id: "SRC-NYCA-X-OLYMPIA-KAZI-1354833789709643781",
    title: "Olympia Kazi uses NYC Artist Coalition identity in FairRentNYC advocacy",
    organization: "Olympia Kazi",
    kind: "institutional-social-post",
    handle: "olympiakazi",
    statusId: "1354833789709643781",
    publishedAt: "2021-01-28",
    publicCitation: "Olympia Kazi post naming @NYCArtC in #FairRentNYC advocacy, January 28, 2021.",
    publicNote: "The post used the coalition identity while urging Council action on Commercial Rent Stabilization. The authenticated mention census recovered 89 posts by Olympia Kazi mentioning @NYCArtC, the largest external-author count in that bounded result set.",
    supportsGenerally: ["Olympia Kazi's public use of the coalition identity", "FairRentNYC advocacy context", "sustained external stewardship signal in the bounded corpus"],
    doesNotEstablish: ["authorship of posts published from @NYCArtC", "sole campaign leadership", "a complete corpus of Olympia Kazi's coalition work", "policy causality"]
  }
];

const otherProjectPostSeeds: SocialPostSeed[] = [
  {
    id: "SRC-WOWLIST-X-SUNDAY-DINNER-771457416298921985",
    title: "WOW List describes its Sunday Dinner origin",
    organization: "WOW List",
    kind: "institutional-social-post",
    handle: "wowlist",
    statusId: "771457416298921985",
    publishedAt: "2016-09-01",
    publicCitation: "WOW List post describing the calendar as a Sunday Dinner project, September 1, 2016.",
    publicNote: "The post described WOW List as a DIY community calendar project originating from the Sunday Dinner potluck and linked a Sunday Dinner event page.",
    supportsGenerally: ["WOW List and Sunday Dinner project relationship", "DIY community-calendar framing", "public event-page use"],
    doesNotEstablish: ["sole authorship by Jamie", "complete platform adoption", "the total number of gatherings or organizers"]
  },
  {
    id: "SRC-WOWLIST-X-EVENT-SHARE-845116237591920640",
    title: "Public event organizer shares a WOW List event page",
    organization: "Jack T.",
    kind: "institutional-social-post",
    handle: "jackascak",
    statusId: "845116237591920640",
    publishedAt: "2017-03-23",
    publicCitation: "Public post sharing a WOW List event page for a Silent Barn benefit, March 23, 2017.",
    publicNote: "The post used a WOW List event URL to circulate event details for a benefit at Silent Barn.",
    supportsGenerally: ["external sharing of a WOW List event page", "community-calendar use in event promotion"],
    doesNotEstablish: ["broad adoption", "the organizer's account relationship to WOW List", "event attendance or outcome"]
  },
  {
    id: "SRC-WOWLIST-X-PUNKS-CRIMINALS-604360847012413440",
    title: "Organizer reports adding shows to WOW List",
    organization: "Punks & Criminals",
    kind: "institutional-social-post",
    handle: "punkscriminals",
    statusId: "604360847012413440",
    publishedAt: "2015-05-29",
    publicCitation: "Punks & Criminals post reporting active show entry on WOW List, May 29, 2015.",
    publicNote: "The public post says the organizer was putting shows on WOW List and links the organizer's public WOW List page.",
    supportsGenerally: ["a concrete external organizer-use specimen", "event-entry use", "a public organizer page"],
    doesNotEstablish: ["broad adoption", "the number of events entered", "event attendance or outcome", "a formal partnership"]
  },
  {
    id: "SRC-KC-TOWN-HALL-X-LAUNCH-1013893135695601665",
    title: "KC Town Hall account launch statement",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    handle: "KCTownHall",
    statusId: "1013893135695601665",
    publishedAt: "2018-07-02",
    publicCitation: "KC Town Hall account launch statement, July 2, 2018.",
    publicNote: "The pinned post invited people to follow and participate in building a permanent neighborhood resource and cultural center on Indiana Avenue.",
    supportsGenerally: ["public project launch framing", "neighborhood resource and cultural-center purpose", "participation invitation"],
    doesNotEstablish: ["project completion", "Jamie's sole authorship", "current property status", "funding receipt or expenditure"]
  },
  {
    id: "SRC-KC-TOWN-HALL-X-CONTINUITY-1457371688300056580",
    title: "KC Town Hall account documents 2021 neighborhood program activity",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    handle: "KCTownHall",
    statusId: "1457371688300056580",
    publishedAt: "2021-11-07",
    publicCitation: "KC Town Hall account post documenting 2021 neighborhood program activity, November 7, 2021.",
    publicNote: "The post reported a monthly tire-removal result and announced continuation of the neighborhood program in 2022.",
    supportsGenerally: ["public account continuity through 2021", "post-transition neighborhood program activity"],
    doesNotEstablish: ["Jamie as post author or program operator", "independent verification of the reported savings", "the identity of the successor steward", "the legal details of project transition"]
  }
];

const kcSpacesRecipientSeeds: SocialPostSeed[] = [
  ["LATINO-ARTS-FOUNDATION", "Latino Arts Foundation", "KCSpacesFund", "1251553551454797830", "2020-04-18"],
  ["UN-TUCK", "UN/TUCK Queer & Trans Collective", "KCSpacesFund", "1253445776224722945", "2020-04-23"],
  ["GET-WOKE", "GetWoke", "KCSpacesFund", "1260590429730414592", "2020-05-13"],
  ["TWOCC", "Trans Women of Color Collective", "KCSpacesFund", "1262524545275244545", "2020-05-18"],
  ["BLACKBOX-ON-TROOST", "Blackbox on Troost", "KCSpacesFund", "1263599910781440000", "2020-05-21"],
  ["ONE-MIC-STAND", "One Mic Stand KC", "KCSpacesFund", "1263927272802746368", "2020-05-22"],
  ["FAREWELL-TRANSMISSION", "Farewell Transmission", "KCSpacesFund", "1270549089076359174", "2020-06-10"],
  ["PARKER-2", "Parker 2", "KCSpacesFund", "1271219713188810753", "2020-06-11"],
  ["KANSAS-CITY-TEXTILE-ARTS-CENTER", "Kansas City Textile Arts Center", "KCSpacesFund", "1272260009695551489", "2020-06-14"],
  ["SWAN", "SWAN", "KCSpacesFund", "1278061185871552512", "2020-06-30"],
  ["VULPES-BASTILLE", "Vulpes Bastille", "KCSpacesFund", "1281300779266125826", "2020-07-09"]
].map(([slug, recipient, handle, statusId, publishedAt]) => ({
  id: `SRC-KC-SPACES-FUND-X-GRANTEE-${slug}-${statusId}`,
  title: `KC Spaces Fund highlight for ${recipient}`,
  organization: "KC Spaces Fund",
  kind: "institutional-social-post" as const,
  handle,
  statusId,
  publishedAt,
  publicCitation: `KC Spaces Fund public grantee highlight naming ${recipient}, ${publishedAt}.`,
  publicNote: `The campaign account publicly identified ${recipient} as funded in its rolling emergency-relief sequence.`,
  supportsGenerally: [`public campaign highlight naming ${recipient}`, "rolling emergency-relief campaign chronology"],
  doesNotEstablish: ["Jamie's authorship of the post", "Jamie's participation in grant decisions", "the complete recipient set", "the final amount received or spent by the named recipient"]
}));

const kcSpacesExternalPostSeeds: SocialPostSeed[] = [
  {
    id: "SRC-KC-SPACES-FUND-X-LATINO-ARTS-THANKS-1251584787267178499",
    title: "Latino Arts Foundation thanks KC Spaces Fund",
    organization: "Latino Arts Foundation",
    kind: "institutional-social-post",
    handle: "mmunzmarie",
    statusId: "1251584787267178499",
    publishedAt: "2020-04-18",
    publicCitation: "Latino Arts Foundation public response thanking @KCSpacesFund, April 18, 2020.",
    publicNote: "The recipient response said the support would help mentors and mentees continue creative work through art supplies and virtual mentorship.",
    supportsGenerally: ["recipient acknowledgement", "stated intended use for creative support"],
    doesNotEstablish: ["the exact transfer amount", "complete expenditure records", "Jamie's role in grant decisions", "long-term outcome"]
  },
  {
    id: "SRC-KC-SPACES-FUND-X-BATTERY-TOUR-THANKS-1252310163119276033",
    title: "Battery Tour thanks KC Spaces Fund",
    organization: "Battery Tour",
    kind: "institutional-social-post",
    handle: "aymusik",
    statusId: "1252310163119276033",
    publishedAt: "2020-04-20",
    publicCitation: "Battery Tour public response thanking @KCSpacesFund, April 20, 2020.",
    publicNote: "The recipient response thanked KC Spaces Fund for helping keep the startup operating during the COVID-19 pandemic.",
    supportsGenerally: ["recipient acknowledgement", "pandemic-support context"],
    doesNotEstablish: ["the exact transfer amount", "complete expenditure records", "Jamie's role in grant decisions", "long-term outcome"]
  }
];

const do816Source: SourceRecord = {
  id: "SRC-KC-SPACES-FUND-DO816-DAILY-DOGOOD-2020-04-21",
  title: "The Daily DoGood: Kansas City",
  organization: "Do816",
  kind: "published-article",
  visibility: "public",
  preservationStatus: "live",
  publishedAt: "2020-04-21",
  accessedAt: "2026-07-14",
  canonicalUrl: "https://do816.com/p/the-daily-dogood-kansas-city",
  preferredPublicUrl: "canonical",
  publicCitation: "Do816, 'The Daily DoGood: Kansas City,' KC Spaces Fund entry dated April 21, 2020.",
  publicNote: "The local culture guide described KC Spaces Fund as collecting donations and giving grants to local art spaces and music venues affected by pandemic shutdowns.",
  supportsGenerally: ["contemporaneous local coverage", "fundraising and emergency-grant purpose", "art-space and music-venue beneficiary context"],
  doesNotEstablish: ["Jamie's individual role", "the complete organizer roster", "the total raised or distributed", "the complete recipient set"]
};

const toSource = (seed: SocialPostSeed): SourceRecord => ({
  id: seed.id,
  title: seed.title,
  organization: seed.organization,
  kind: seed.kind,
  visibility: "public",
  preservationStatus: "live",
  publishedAt: seed.publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl: `https://x.com/${seed.handle}/status/${seed.statusId}`,
  preferredPublicUrl: "canonical",
  publicCitation: seed.publicCitation,
  publicNote: seed.publicNote,
  supportsGenerally: seed.supportsGenerally,
  doesNotEstablish: seed.doesNotEstablish
});

export const callNycCouncilSocialSourceIds = callNycCouncilPostSeeds.map(
  (seed) => seed.id
);

export const callNycFullPopulationCensusSourceId =
  callNycFullPopulationCensusSource.id;

export const wowListFullPopulationCensusSourceId =
  wowListFullPopulationCensusSource.id;

export const kcTownHallFullPopulationCensusSourceId =
  kcTownHallFullPopulationCensusSource.id;

export const nycaProfilePopulationCensusSourceId =
  nycaProfilePopulationCensusSource.id;

export const nycaSourceTrailSourceIds = nycaSourceTrailSources.map(
  (source) => source.id
);

export const kcTownHallCouncilResponseSourceIds =
  kcTownHallCouncilResponseSeeds.map((seed) => seed.id);

export const callNycProjectSocialSourceIds = callNycProjectPostSeeds.map(
  (seed) => seed.id
);

export const nycaCouncilSocialSourceIds = nycaCouncilPostSeeds
  .filter((seed) => seed.kind === "government-social-post")
  .map((seed) => seed.id);

export const nycaOlympiaSocialSourceId =
  "SRC-NYCA-X-OLYMPIA-KAZI-1354833789709643781";

export const kcSpacesRecipientSocialSourceIds = kcSpacesRecipientSeeds.map(
  (seed) => seed.id
);

export const projectSocialSources: KnowledgeBank["sources"] = [
  ...socialProfileSources,
  ...researchSources,
  callNycFullPopulationCensusSource,
  wowListFullPopulationCensusSource,
  kcTownHallFullPopulationCensusSource,
  nycaProfilePopulationCensusSource,
  ...nycaPlatformBoundarySources,
  ...nycaSourceTrailSources,
  ...wowListContextSources,
  ...kcTownHallContextSources,
  ...kcTownHallCouncilResponseSeeds.map(toSource),
  ...callNycProjectPostSeeds.map(toSource),
  ...callNycCouncilPostSeeds.map(toSource),
  ...nycaCouncilPostSeeds.map(toSource),
  ...otherProjectPostSeeds.map(toSource),
  ...kcSpacesRecipientSeeds.map(toSource),
  ...kcSpacesExternalPostSeeds.map(toSource),
  do816Source
];

export const projectSocialSourceIds = projectSocialSources.map(
  (source) => source.id
);
