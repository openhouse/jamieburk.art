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
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition (@NYCArtC), authenticated X profile reviewed July 14, 2026.",
    publicNote: "The profile showed 5,124 posts, a January 2017 join date, and an umbrella identity naming #SaveNYCSpaces, #LetNYCDance, #TalksNotRaids, and #FairRentNYC.",
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
    publicNote: "The bounded review recovered 107 of 110 CallNYC profile-counted objects, 526 live-search results for @NYCArtC, 170 of 183 KC Town Hall statuses, 34 of 35 KC Spaces Fund statuses, and 37 of 38 WOW List statuses. Exact campaign-handle checks and thread-level false-positive review were recorded separately.",
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
