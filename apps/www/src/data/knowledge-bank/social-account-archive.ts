import type { KnowledgeBank } from "./schema.ts";

export const socialAccountArchiveIntakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-2026-07-15-PROJECT-X-ACCOUNT-INVENTORY",
    receivedAt: "2026-07-15",
    inputKind: "metric",
    summary: "Authenticated X profile review of five verified project accounts, the NYC Artist Coalition campaign identity system, one dormant related handle, and three unrecovered standalone campaign handles.",
    projectIds: [
      "callnyc",
      "nyc-artist-coalition",
      "wowlist",
      "kc-town-hall",
      "kc-spaces-fund"
    ],
    researchStatus: "researched",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
      "SRC-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT-2026-07-15"
    ],
    observationIds: [
      "OBS-PROJECT-X-VERIFIED-ACCOUNT-REGISTRY",
      "OBS-NYCA-X-CAMPAIGN-IDENTITY-SYSTEM",
      "OBS-FAIRRENTNYC-X-DORMANT-UNATTRIBUTED",
      "OBS-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT",
      "OBS-KC-TOWN-HALL-X-PUBLIC-DOCUMENTATION",
      "OBS-KC-SPACES-FUND-X-PUBLIC-ACCOUNTABILITY",
      "OBS-WOWLIST-X-PUBLIC-MOBILIZATION"
    ],
    claimIds: [
      "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
      "CLM-KC-TOWN-HALL-X-PUBLIC-DOCUMENTATION",
      "CLM-KC-SPACES-FUND-X-PUBLIC-ACCOUNTABILITY",
      "CLM-WOWLIST-X-PUBLIC-MOBILIZATION"
    ],
    researchInquiryIds: [
      "INQ-PROJECT-SOCIAL-ACCOUNT-CUSTODY-2026"
    ],
    nextActions: [
      "Seek account-creation notices, administrator records, collaborator confirmation, and exports that can independently corroborate Jamie's account-establishment role without publishing credentials.",
      "Inventory project Facebook and Instagram surfaces as separate authenticated research runs.",
      "Preserve profile-count metrics as dated observations because platform totals change."
    ]
  },
  {
    id: "INTAKE-2026-07-15-NYCA-X-ENGAGEMENT-CORPUS",
    receivedAt: "2026-07-15",
    inputKind: "metric",
    summary: "Authenticated recovery and classification of 527 posts mentioning NYC Artist Coalition, including Council-member participation, city-agency exchanges, collaborator use, and mission-pattern counts.",
    projectIds: ["nyc-artist-coalition", "fair-rent-nyc"],
    researchStatus: "researched",
    publicationStatus: "knowledge-bank-only",
    sourceIds: [
      "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
      "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2020-01-03",
      "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2021-04-14",
      "SRC-NYCA-X-NYCULTURE-CREATENYC-2017-03-03",
      "SRC-NYCA-X-NYCULTURE-CROWD-2017-03-30",
      "SRC-NYCA-X-MADEINNY-TOWN-HALL-2017-10-11",
      "SRC-NYCA-X-ESPINAL-CABARET-2017-10-30",
      "SRC-NYCA-DOCUMENT-JOURNAL-2018-02-27"
    ],
    observationIds: [
      "OBS-NYCA-X-MENTION-CORPUS",
      "OBS-NYCA-X-COUNCIL-MEMBER-ENGAGEMENT",
      "OBS-NYCA-X-OLYMPIA-KAZI-PARTICIPATION",
      "OBS-NYCA-X-MISSION-PATTERNS",
      "OBS-NYCA-X-NYCULTURE-CREATENYC-EXCHANGE",
      "OBS-NYCA-X-NYCULTURE-CROWD",
      "OBS-NYCA-X-MADEINNY-FIRST-TOWN-HALL",
      "OBS-NYCA-X-ESPINAL-CABARET-CREDIT",
      "OBS-NYCA-DOCUMENT-JOURNAL-COLLECTIVE-CREDITS"
    ],
    claimIds: [
      "CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY",
      "CLM-NYCA-X-COUNCIL-ENGAGEMENT",
      "CLM-NYCA-X-CITY-AGENCY-ENGAGEMENT"
    ],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    nextActions: [
      "Request a complete account export if exact authored-post, repost, quote, reply, and follower-history counts become necessary.",
      "Keep public-account participation distinct from account credential access and from authorship of any individual coalition post.",
      "Use the mission-pattern counts as discovery aids, not mutually exclusive content categories."
    ]
  }
];

export const socialAccountArchiveSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
    title: "Authenticated project X profile inventory",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Authenticated in-app browser review completed July 15, 2026",
    accessedAt: "2026-07-15",
    publicCitation: "Codex authenticated review of public X profiles for CallNYC, NYC Artist Coalition, WOW List, KC Town Hall, and KC Spaces Fund, July 15, 2026.",
    publicNote: "The review recorded public handles, profile descriptions, join dates, visible post and follower totals, campaign hashtags, and selected dated posts without collecting credentials or private messages.",
    supportsGenerally: [
      "the public existence and dated profile state of @CallNYCapp, @NYCArtC, @wowlist, @KCTownHall, and @KCSpacesFund",
      "the four campaign hashtags listed by @NYCArtC",
      "selected public project documentation and campaign-account continuity"
    ],
    doesNotEstablish: [
      "who authored every post",
      "who currently controls each account",
      "complete or immutable platform metrics",
      "endorsement by every follower or interacting account",
      "Jamie's creation of any account without additional evidence"
    ]
  },
  {
    id: "SRC-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT-2026-07-15",
    title: "Jamie Burkart account of establishing project social identities",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Received July 15, 2026",
    publicCitation: "Jamie Burkart, first-person clarification to the portfolio archive, July 15, 2026.",
    publicNote: "Jamie reports that he established the project accounts and identity systems; multiple teammates contributed public content over time.",
    protectedLocatorId: "LOC-CONVERSATION-PROJECT-SOCIAL-IDENTITIES-2026-07-15",
    supportsGenerally: [
      "Jamie's first-person account-establishment claim",
      "collective posting and stewardship over time",
      "the intended value of a durable public identity that collaborators could use"
    ],
    doesNotEstablish: [
      "independent corroboration of account creation",
      "Jamie's authorship of every post",
      "sole ownership of campaign identity or outcomes",
      "current custody of credentials"
    ]
  },
  {
    id: "SRC-CALLNYC-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
    title: "Authenticated X Latest search for @CallNYCapp",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Authenticated search completed July 15, 2026",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/search?q=%40CallNYCapp&src=typed_query&f=live",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated X Latest search for posts mentioning @CallNYCapp, reviewed July 15, 2026.",
    publicNote: "The search returned 11 distinct visible posts. Four were authored by then-Council-member accounts; a separate preserved timeline capture supplies two additional Council-member examples omitted by direct mention search.",
    supportsGenerally: [
      "an 11-post direct-mention corpus recoverable on July 15, 2026",
      "dated posts by Margaret Chin, Ruben Wills, Steven Matteo, and Peter Koo",
      "a combined lower bound of six Council-member accounts when joined with the preserved timeline capture"
    ],
    doesNotEstablish: [
      "a complete account export",
      "quote posts or URL-only references omitted by direct mention search",
      "likes, deleted posts, inaccessible repost history, or renamed accounts",
      "Council endorsement, adoption, commissioning, or official project status"
    ]
  },
  {
    id: "SRC-CALLNYC-X-MARGARET-CHIN-2017-07-11",
    title: "Margaret Chin thanks CallNYC for recognition",
    organization: "Office of Council Member Margaret S. Chin",
    author: "Margaret S. Chin",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-07-11",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CM_MargaretChin/status/884863588317442049",
    preferredPublicUrl: "canonical",
    publicCitation: "Margaret S. Chin, X post thanking @CallNYCapp for recognition, July 11, 2017.",
    supportsGenerally: ["a direct public mention of @CallNYCapp", "recognition of CallNYC's issue-count reporting"],
    doesNotEstablish: ["project adoption", "official endorsement", "use of CallNYC as an official Council service"]
  },
  {
    id: "SRC-CALLNYC-X-RUBEN-WILLS-2016-05-17",
    title: "Ruben Wills replies to CallNYC",
    organization: "Office of Council Member Ruben Wills",
    author: "Ruben Wills",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-05-17",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CM_RubenWills/status/732717792097603584",
    preferredPublicUrl: "canonical",
    publicCitation: "Ruben Wills, X reply to @CallNYCapp and @NYCCouncil, May 17, 2016.",
    supportsGenerally: ["a direct public reply to @CallNYCapp"],
    doesNotEstablish: ["project adoption", "official endorsement", "the content of any inaccessible preceding post"]
  },
  {
    id: "SRC-CALLNYC-X-STEVEN-MATTEO-2016-05-03",
    title: "Steven Matteo replies to CallNYC",
    organization: "Office of Council Member Steven Matteo",
    author: "Steven Matteo",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-05-03",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/StevenMatteo/status/727621921341358081",
    preferredPublicUrl: "canonical",
    publicCitation: "Steven Matteo, X reply to @CallNYCapp and @NYCCouncil, May 3, 2016.",
    supportsGenerally: ["a direct public reply to @CallNYCapp concerning potholes"],
    doesNotEstablish: ["project adoption", "official endorsement", "the content of any inaccessible preceding post"]
  },
  {
    id: "SRC-CALLNYC-X-PETER-KOO-2016-04-27",
    title: "Peter Koo amplifies CallNYC Lifeline recognition",
    organization: "Office of Council Member Peter Koo",
    author: "Peter Koo",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-27",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/CMPeterKoo/status/725422741160079360",
    preferredPublicUrl: "canonical",
    publicCitation: "Peter Koo, cross-post amplifying CallNYC's Lifeline recognition, April 27, 2016.",
    supportsGenerally: ["public amplification of @CallNYCapp", "CallNYC's Lifeline issue framing"],
    doesNotEstablish: ["project adoption", "official endorsement", "a complete repost history"]
  },
  {
    id: "SRC-NYC-COUNCIL-STATED-MEETING-2016-11-16",
    title: "Minutes of the Stated Meeting, November 16, 2016",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-11-16",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=bf984b80-ed07-45ba-8f66-feb05ab509a3&ID=39395&M=AO&N=TWludXRlcyBvZiB0aGUgU3RhdGVkIE1lZXRpbmc%3D",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, minutes of the Stated Meeting, November 16, 2016.",
    publicNote: "The official membership list includes Margaret Chin, Mathieu Eugene, Peter Koo, Steven Matteo, Helen Rosenthal, and Ruben Wills.",
    supportsGenerally: ["Council-member status in the relevant 2016 term for six recovered CallNYC-engagement accounts"],
    doesNotEstablish: ["social-account control", "CallNYC engagement", "project endorsement"]
  },
  {
    id: "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
    title: "Authenticated X Latest search for @NYCArtC",
    organization: "Codex archival review",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "Authenticated search completed July 15, 2026",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/search?q=%40NYCArtC&src=typed_query&f=live",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated X Latest search for posts mentioning @NYCArtC, reviewed July 15, 2026.",
    publicNote: "The bounded corpus contains 527 distinct posts by 180 visible author identities from February 2017 through March 2025; 504 posts came from 179 identities other than @NYCArtC.",
    supportsGenerally: [
      "the recoverable @NYCArtC mention corpus and date range",
      "seven Council-member accounts and 21 in-office posts within the corpus",
      "Olympia Kazi's 89 recovered mention posts",
      "mission-related keyword patterns and city-agency participation"
    ],
    doesNotEstablish: [
      "a complete account export or complete public conversation",
      "credential access or authorship of @NYCArtC posts by any external author",
      "likes, quote posts, URL-only references, deleted posts, or inaccessible repost history",
      "endorsement, sole causality, or policy adoption",
      "mutually exclusive or exhaustive mission categories"
    ]
  },
  {
    id: "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2020-01-03",
    title: "New York City Council member and social-handle dataset",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2020-01-03",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://github.com/NewYorkCityCouncil/districts/blob/0a002aafa045d960c1bf328e31290c1da3bcba4f/district_data/council_members/members.json",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, official member and social-handle dataset snapshot, January 3, 2020.",
    publicNote: "The official repository pairs Council-member names and districts with public Twitter handles.",
    supportsGenerally: ["historical Council-member identity and handle matching for the @NYCArtC corpus"],
    doesNotEstablish: ["who personally authored each office-account post", "account engagement", "project endorsement"]
  },
  {
    id: "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2021-04-14",
    title: "New York City Council member and social-handle dataset, 2021 repository snapshot",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-04-14",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://github.com/NewYorkCityCouncil/districts/blob/73412da6549e8475c6400f23f72a7c04d666e05a/district_data/council_members/members.json",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, official member and social-handle dataset repository snapshot, April 14, 2021.",
    publicNote: "The snapshot supports in-office handle matching for posts recovered from the 2021 portion of the corpus.",
    supportsGenerally: ["2021 Council-member identity and handle matching for the @NYCArtC corpus"],
    doesNotEstablish: ["who personally authored each office-account post", "account engagement", "project endorsement"]
  },
  {
    id: "SRC-NYCA-X-NYCULTURE-CREATENYC-2017-03-03",
    title: "NYC Cultural Affairs acknowledges NYC Artist Coalition input",
    organization: "NYC Department of Cultural Affairs",
    author: "NYC Cultural Affairs",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-03",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/NYCulture/status/837719061609971712",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Cultural Affairs, X reply to @NYCArtC stating that community-driven-spaces input would be included in CreateNYC, March 3, 2017.",
    publicNote: "This post sits within a 13-post agency exchange recovered from the authenticated mention corpus.",
    supportsGenerally: ["direct city-agency dialogue with @NYCArtC", "acknowledgement that coalition input would be included in CreateNYC"],
    doesNotEstablish: ["which recommendations appeared in the final plan", "Jamie's authorship of the coalition posts", "formal adoption of every coalition position"]
  },
  {
    id: "SRC-NYCA-X-NYCULTURE-CROWD-2017-03-30",
    title: "NYC Cultural Affairs documents coalition-gathered DIY-spaces crowd",
    organization: "NYC Department of Cultural Affairs",
    author: "NYC Cultural Affairs",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-30",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/NYCulture/status/847587814862729216",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Cultural Affairs, X post describing a huge crowd gathered by @NYCArtC to discuss DIY spaces, March 30, 2017.",
    supportsGenerally: ["NYC Artist Coalition's convening role", "city cultural-affairs participation in a DIY-spaces discussion"],
    doesNotEstablish: ["an exact attendance count", "Jamie's complete individual role", "the complete event program"]
  },
  {
    id: "SRC-NYCA-X-MADEINNY-TOWN-HALL-2017-10-11",
    title: "Mayor's Office of Media and Entertainment joins first Nightlife Town Hall",
    organization: "NYC Mayor's Office of Media and Entertainment",
    author: "Made in NY",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-11",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/MadeinNY/status/918266538616082432",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Mayor's Office of Media and Entertainment, X post stating that Commissioner Julie Menin joined @NYCArtC at the first Nightlife Town Hall, October 11, 2017.",
    supportsGenerally: ["city participation", "NYC Artist Coalition's relationship to the first Nightlife Town Hall"],
    doesNotEstablish: ["Jamie's complete production role", "sole event ownership", "the complete attendee or organizer roster"]
  },
  {
    id: "SRC-NYCA-X-ESPINAL-CABARET-2017-10-30",
    title: "Rafael Espinal credits coalition partners in Cabaret Law repeal effort",
    organization: "Office of Council Member Rafael Espinal",
    author: "Rafael Espinal",
    kind: "government-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-30",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://x.com/RLEspinal/status/924972124628049920",
    preferredPublicUrl: "canonical",
    publicCitation: "Rafael Espinal, X post crediting Dance Liberation Network and NYC Artist Coalition in the Cabaret Law repeal effort, October 30, 2017.",
    supportsGenerally: ["direct Council-member credit to NYC Artist Coalition", "collective Cabaret Law repeal advocacy"],
    doesNotEstablish: ["sole causality", "Jamie's individual authorship of the repeal", "a complete movement roster"]
  },
  {
    id: "SRC-NYCA-DOCUMENT-JOURNAL-2018-02-27",
    title: "Taking back New York City's nightlife",
    organization: "Document Journal",
    author: "Daisy Prince",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-02-27",
    accessedAt: "2026-07-15",
    canonicalUrl: "https://www.documentjournal.com/2018/02/taking-back-new-york-citys-nightlife/",
    preferredPublicUrl: "canonical",
    publicCitation: "Daisy Prince, 'Taking back New York City's nightlife,' Document Journal, February 27, 2018.",
    publicNote: "The article identifies and photographs Jamie with NYC Artist Coalition, identifies Olympia Kazi with the coalition and Let NYC Dance, and documents the broader collective repeal effort. It misspells Jamie's surname as Burkhart.",
    supportsGenerally: ["Jamie's public identification with NYC Artist Coalition", "Olympia Kazi's coalition and Let NYC Dance participation", "collective nightlife advocacy context"],
    doesNotEstablish: ["Jamie's exact title or complete responsibilities", "Jamie's sole leadership", "account creation or credential custody", "sole causality for legislative outcomes"]
  }
];

export const socialAccountArchiveObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-PROJECT-X-VERIFIED-ACCOUNT-REGISTRY",
    sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
    project: "collaborative-operations",
    text: "Authenticated review verified five public project accounts: CallNYC @CallNYCapp, NYC Artist Coalition @NYCArtC, WOW List @wowlist, KC Town Hall @KCTownHall, and KC Spaces Fund @KCSpacesFund.",
    locator: "Live X profile headings, handles, biographies, join dates, and visible timelines",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS"],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-CUSTODY-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-NYCA-X-CAMPAIGN-IDENTITY-SYSTEM",
    sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
    project: "nyc-artist-coalition",
    text: "The @NYCArtC profile, joined January 2017, displayed 5,124 posts and 1,339 followers and explicitly carried #SaveNYCSpaces, #LetNYCDance, #TalksNotRaids, and #FairRentNYC. No current standalone @LetNYCDance, @TalksNotRaids, or @SaveNYCSpaces profile was recovered; current absence is not evidence that none ever existed.",
    locator: "@NYCArtC profile header and authenticated checks of three candidate standalone handles",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY", "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS"],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-CUSTODY-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-FAIRRENTNYC-X-DORMANT-UNATTRIBUTED",
    sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
    project: "fair-rent-nyc",
    text: "A live @fairrentnyc profile joined in January 2023 and displayed zero posts and zero followers. No reviewed evidence connects its creation or control to Jamie, so it is recorded as a dormant related handle rather than a verified Jamie-established campaign account.",
    locator: "@fairrentnyc profile header",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS"],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-CUSTODY-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT",
    sourceId: "SRC-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT-2026-07-15",
    project: "collaborative-operations",
    text: "Jamie reports that he established the project accounts and public-facing identity systems while multiple teammates contributed posts and public communication over time.",
    locator: "First-person portfolio-archive clarification, July 15, 2026",
    status: "provisional",
    confidence: "moderate",
    claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS"],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-CUSTODY-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex intake review"]
  },
  {
    id: "OBS-KC-TOWN-HALL-X-PUBLIC-DOCUMENTATION",
    sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
    project: "kc-town-hall",
    text: "The @KCTownHall profile, joined March 2018, displayed 183 posts and 132 followers. Its public record includes restoration framing and dated TiredOfTires service logistics, including an August 2022 pickup notice and a September 2022 corridor result reporting zero tires on the curb.",
    locator: "@KCTownHall profile and statuses 1013893135695601665, 1555940701338206208, and 1566197849297195009",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-KC-TOWN-HALL-X-PUBLIC-DOCUMENTATION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-KC-SPACES-FUND-X-PUBLIC-ACCOUNTABILITY",
    sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
    project: "kc-spaces-fund",
    text: "The @KCSpacesFund profile, joined April 2020, displayed 35 posts and 21 followers. Its timeline repeatedly published #FUNDED updates naming recipient spaces and describing their work, including Vulpes Bastille, SWAN, Kansas City Textile Arts Center, and Parker 2.",
    locator: "@KCSpacesFund profile and statuses 1281300779266125826, 1278061185871552512, 1272260009695551489, and 1271219713188810753",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-KC-SPACES-FUND-X-PUBLIC-ACCOUNTABILITY"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-WOWLIST-X-PUBLIC-MOBILIZATION",
    sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
    project: "wowlist",
    text: "The @wowlist profile, joined February 2014, displayed 38 posts and 47 followers. Recovered posts connected event listings to public mobilization, a Ghost Ship memorial, and DIY-venue support, while the CallNYC timeline also preserved WOW List reposts as a cross-project connection.",
    locator: "@wowlist profile and statuses 798274424763981824, 796473557387575297, and 806517013472485376",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-WOWLIST-X-PUBLIC-MOBILIZATION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-CALLNYC-X-MARGARET-CHIN",
    sourceId: "SRC-CALLNYC-X-MARGARET-CHIN-2017-07-11",
    project: "callnyc",
    text: "Margaret Chin publicly thanked @CallNYCapp for recognizing her office's issue counts and said the office was ready to improve them.",
    locator: "Status 884863588317442049",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
    researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-CALLNYC-X-RUBEN-WILLS",
    sourceId: "SRC-CALLNYC-X-RUBEN-WILLS-2016-05-17",
    project: "callnyc",
    text: "Ruben Wills publicly replied to @CallNYCapp and @NYCCouncil and copied the Queens Chronicle.",
    locator: "Status 732717792097603584",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
    researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-CALLNYC-X-STEVEN-MATTEO",
    sourceId: "SRC-CALLNYC-X-STEVEN-MATTEO-2016-05-03",
    project: "callnyc",
    text: "Steven Matteo publicly replied to @CallNYCapp and @NYCCouncil concerning potholes.",
    locator: "Status 727621921341358081",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
    researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-CALLNYC-X-PETER-KOO",
    sourceId: "SRC-CALLNYC-X-PETER-KOO-2016-04-27",
    project: "callnyc",
    text: "Peter Koo publicly amplified CallNYC's recognition of his office's Lifeline issue record.",
    locator: "Status 725422741160079360",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS"],
    researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-NYCA-X-MENTION-CORPUS",
    sourceId: "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
    project: "nyc-artist-coalition",
    text: "Authenticated Latest search recovered 527 distinct posts by 180 visible author identities from February 7, 2017, through March 11, 2025; 504 posts came from 179 identities other than @NYCArtC.",
    locator: "Complete recoverable Latest-search scroll, deduplicated by status URL",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY"],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review and structured count"]
  },
  {
    id: "OBS-NYCA-X-COUNCIL-MEMBER-ENGAGEMENT",
    sourceId: "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
    project: "nyc-artist-coalition",
    text: "Seven distinct Council-member accounts authored 21 recovered posts mentioning @NYCArtC while their officeholders were serving on the Council: Rafael Espinal, Stephen Levin, Justin Brannan, Brad Lander, Jimmy Van Bramer, Mark Levine, and Carlina Rivera.",
    locator: "Mention-corpus author join to dated official Council handle rosters, with in-office date filtering",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-COUNCIL-ENGAGEMENT"],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review and roster join"]
  },
  {
    id: "OBS-NYCA-X-OLYMPIA-KAZI-PARTICIPATION",
    sourceId: "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
    project: "nyc-artist-coalition",
    text: "Olympia Kazi authored 89 recovered posts mentioning @NYCArtC from November 2019 through June 2022, the largest author count in the bounded corpus. Twenty-eight matched the FairRentNYC or commercial-rent pattern.",
    locator: "Author count and dated status URLs within the 527-post mention corpus",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY"],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review and structured count"]
  },
  {
    id: "OBS-NYCA-X-MISSION-PATTERNS",
    sourceId: "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
    project: "nyc-artist-coalition",
    text: "Among 504 externally authored mention posts, reproducible overlapping keyword patterns recovered 76 FairRentNYC/commercial-rent posts by 24 authors, 31 Cabaret Law/dance posts by 18 authors, 19 Talks Not Raids/MARCH posts by 12 authors, 34 Save NYC Spaces/cultural-space posts by 22 authors, and 24 Office of Nightlife/town-hall posts by 14 authors.",
    locator: "Case-insensitive keyword classification of normalized visible post text",
    status: "verified",
    confidence: "moderate",
    claimIds: ["CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY"],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex structured text classification"]
  },
  {
    id: "OBS-NYCA-X-NYCULTURE-CREATENYC-EXCHANGE",
    sourceId: "SRC-NYCA-X-NYCULTURE-CREATENYC-2017-03-03",
    project: "nyc-artist-coalition",
    text: "Authenticated search recovered a 13-post March 3, 2017, NYC Cultural Affairs exchange with @NYCArtC about community-driven spaces, interagency relationships, the Cabaret Law, MARCH, professional guidance, accessibility, and CreateNYC; one agency reply said coalition input would be included in CreateNYC.",
    locator: "Status 837719061609971712 and 12 adjacent @NYCulture posts in the authenticated mention corpus",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-CITY-AGENCY-ENGAGEMENT"],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-NYCA-X-NYCULTURE-CROWD",
    sourceId: "SRC-NYCA-X-NYCULTURE-CROWD-2017-03-30",
    project: "nyc-artist-coalition",
    text: "NYC Cultural Affairs publicly described a huge crowd gathered by @NYCArtC to discuss DIY spaces with Cultural Affairs Commissioner Tom Finkelpearl.",
    locator: "Status 847587814862729216",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-CITY-AGENCY-ENGAGEMENT"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-NYCA-X-MADEINNY-FIRST-TOWN-HALL",
    sourceId: "SRC-NYCA-X-MADEINNY-TOWN-HALL-2017-10-11",
    project: "nyc-artist-coalition",
    text: "The Mayor's Office of Media and Entertainment stated that Commissioner Julie Menin joined @NYCArtC at the first Nightlife Town Hall.",
    locator: "Status 918266538616082432",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-CITY-AGENCY-ENGAGEMENT"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-NYCA-X-ESPINAL-CABARET-CREDIT",
    sourceId: "SRC-NYCA-X-ESPINAL-CABARET-2017-10-30",
    project: "nyc-artist-coalition",
    text: "Rafael Espinal publicly described the Cabaret Law repeal as a historic effort led with Dance Liberation Network and NYC Artist Coalition.",
    locator: "Status 924972124628049920",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-COUNCIL-ENGAGEMENT", "CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated browser review"]
  },
  {
    id: "OBS-NYCA-DOCUMENT-JOURNAL-COLLECTIVE-CREDITS",
    sourceId: "SRC-NYCA-DOCUMENT-JOURNAL-2018-02-27",
    project: "nyc-artist-coalition",
    text: "Document Journal identified and photographed Jamie with NYC Artist Coalition, identified Olympia Kazi with the coalition and Let NYC Dance, and situated both within the broader collective effort to repeal the Cabaret Law.",
    locator: "Article body and photo captions; Jamie's surname is misspelled in the source",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY", "CLM-NYCA-CABARET-LAW-CONTRIBUTION"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex published-source review"]
  }
];

export const socialAccountArchiveClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
    project: "collaborative-operations",
    internalClaim: "Jamie reports establishing durable project social accounts and identity systems that multiple collaborators used over time; five project accounts are publicly verified, while individual post authorship and current credential custody remain separate questions.",
    status: "use-with-care",
    projections: [{
      key: "archive-note",
      text: "Jamie reports establishing durable public project identities for CallNYC, NYC Artist Coalition, WOW List, KC Town Hall, and KC Spaces Fund. Multiple collaborators contributed public communication over time; the claim does not assign every post or collective outcome to Jamie.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/intake/2026-07-15-project-social-account-archive"]
    }],
    evidence: [
      {
        sourceId: "SRC-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT-2026-07-15",
        relationship: "private-support",
        supports: ["Jamie's first-person account-establishment claim", "collective posting boundary"],
        confidence: "moderate",
        renderCitation: false
      },
      {
        sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
        relationship: "corroborating",
        supports: ["five durable public project identities", "multi-year public continuity", "campaign identity relationships"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Phrase account establishment as Jamie's first-person account until independent creation or administrator records are recovered.",
      "Keep account establishment, identity design, individual post authorship, campaign leadership, and collective outcomes separate."
    ],
    antiClaims: [
      "Jamie authored every project post.",
      "Jamie solely owned the campaigns' public identities.",
      "Every post or outcome belongs to Jamie.",
      "Jamie currently controls every account."
    ],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-CUSTODY-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY",
    project: "nyc-artist-coalition",
    internalClaim: "NYC Artist Coalition sustained a durable public identity across four named campaigns and a bounded external mention corpus of 504 posts by 179 identities; Olympia Kazi authored 89 recovered mentions, demonstrating substantial collaborator use without establishing account credential access.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "A bounded authenticated review recovered 504 externally authored posts mentioning @NYCArtC from 179 identities. Olympia Kazi authored 89, the largest recovered author count, showing sustained collaborator use of the coalition's public identity across multiple campaigns.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [
      {
        sourceId: "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
        relationship: "direct-support",
        supports: ["527-post corpus", "504 external mentions", "179 external author identities", "Olympia Kazi's 89 recovered posts", "mission-pattern counts"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
        relationship: "corroborating",
        supports: ["account continuity", "four campaign hashtags", "dated profile totals"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYCA-DOCUMENT-JOURNAL-2018-02-27",
        relationship: "corroborating",
        supports: ["Jamie and Olympia's public coalition identification", "collective nightlife advocacy context"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The corpus is what authenticated Latest search returned on July 15, 2026, not a complete platform export.",
      "External mentions demonstrate public use of the coalition identity, not access to @NYCArtC credentials or authorship of @NYCArtC posts.",
      "Profile totals are dated observations and may change."
    ],
    antiClaims: [
      "Olympia Kazi authored 89 posts from the @NYCArtC account.",
      "The 527-post corpus is complete.",
      "Every mention was supportive.",
      "Jamie authored or directed every post."
    ],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-NYCA-X-COUNCIL-ENGAGEMENT",
    project: "nyc-artist-coalition",
    internalClaim: "At least seven distinct Council-member accounts authored 21 recovered posts mentioning @NYCArtC while their officeholders served on the Council, including legislative credit, event coordination, constituent replies, and policy discussion.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "A bounded authenticated corpus contains 21 in-office posts from at least seven distinct Council-member accounts mentioning @NYCArtC. The interactions include legislative credit, public-meeting coordination, replies, amplification, and policy discussion; they are not a blanket endorsement metric.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [
      {
        sourceId: "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
        relationship: "direct-support",
        supports: ["seven distinct Council-account authors", "21 in-office posts", "interaction dates and text"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2020-01-03",
        relationship: "supports-boundary",
        supports: ["official Council-member and handle matching"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2021-04-14",
        relationship: "supports-boundary",
        supports: ["2021 in-office handle matching"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCA-X-ESPINAL-CABARET-2017-10-30",
        relationship: "direct-support",
        supports: ["direct Council-member credit for collective Cabaret Law repeal work"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Use at least seven and 21 recovered in-office posts; do not describe either count as comprehensive.",
      "Classify the interaction types rather than treating every mention as endorsement.",
      "Do not combine office-account authorship with the identity of a staff member who wrote a post."
    ],
    antiClaims: [
      "Seven Council members endorsed every NYC Artist Coalition campaign.",
      "The Council adopted the coalition's full agenda.",
      "Only seven Council members engaged.",
      "Social engagement proves sole policy causality."
    ],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-NYCA-X-CITY-AGENCY-ENGAGEMENT",
    project: "nyc-artist-coalition",
    internalClaim: "NYC Cultural Affairs and the Mayor's Office of Media and Entertainment publicly engaged NYC Artist Coalition around CreateNYC, DIY spaces, and the first Nightlife Town Hall.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "City agencies publicly engaged NYC Artist Coalition as a civic-participation surface: Cultural Affairs held a 13-post CreateNYC exchange and later credited the coalition with gathering a large DIY-spaces crowd; the Mayor's Office of Media and Entertainment documented the first Nightlife Town Hall.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [
      {
        sourceId: "SRC-NYCA-X-NYCULTURE-CREATENYC-2017-03-03",
        relationship: "direct-support",
        supports: ["CreateNYC dialogue", "acknowledged coalition input"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCA-X-NYCULTURE-CROWD-2017-03-30",
        relationship: "direct-support",
        supports: ["coalition-gathered DIY-spaces crowd", "Cultural Affairs participation"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-NYCA-X-MADEINNY-TOWN-HALL-2017-10-11",
        relationship: "direct-support",
        supports: ["first Nightlife Town Hall", "commissioner participation", "coalition relationship"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "Agency dialogue does not establish adoption of every coalition recommendation.",
      "Group-level event and participation evidence does not establish Jamie's complete individual role."
    ],
    antiClaims: [
      "CreateNYC adopted every NYC Artist Coalition recommendation.",
      "Jamie solely produced the first Nightlife Town Hall.",
      "Agency engagement proves formal partnership or endorsement."
    ],
    researchInquiryIds: ["INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026"],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-X-PUBLIC-DOCUMENTATION",
    project: "kc-town-hall",
    internalClaim: "The KC Town Hall X account served as a public documentation and service-coordination surface for restoration and TiredOfTires work.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "KC Town Hall's public account documented restoration, neighborhood-service logistics, and TiredOfTires outcomes over time.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/intake/2026-07-15-project-social-account-archive"]
    }],
    evidence: [{
      sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
      relationship: "direct-support",
      supports: ["public profile continuity", "restoration framing", "pickup logistics", "bounded corridor result"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["Do not infer Jamie's authorship of every post from the account's project identity."],
    antiClaims: ["Jamie authored every KC Town Hall post.", "Every published outcome was independently audited."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-KC-SPACES-FUND-X-PUBLIC-ACCOUNTABILITY",
    project: "kc-spaces-fund",
    internalClaim: "The KC Spaces Fund X account provided a public accountability layer by publishing repeated funded-recipient updates and descriptions.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "KC Spaces Fund used its public account to document funded recipients and describe the grassroots cultural spaces supported by the campaign.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/intake/2026-07-15-project-social-account-archive"]
    }],
    evidence: [{
      sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
      relationship: "direct-support",
      supports: ["repeated #FUNDED updates", "recipient names", "public descriptions"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["Public recipient documentation does not establish Jamie's role in grant decisions or authorship of each post."],
    antiClaims: ["Jamie selected the grantees.", "Jamie authored every KC Spaces Fund post.", "The social timeline is a complete financial audit."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  },
  {
    id: "CLM-WOWLIST-X-PUBLIC-MOBILIZATION",
    project: "wowlist",
    internalClaim: "WOW List's public account connected event discovery with public mobilization, memorial, and DIY-space support, and crossed into the CallNYC project timeline.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "WOW List's public account extended event discovery into mobilization, memorial, and DIY-space support, with cross-project circulation through CallNYC.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/intake/2026-07-15-project-social-account-archive"]
    }],
    evidence: [{
      sourceId: "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
      relationship: "direct-support",
      supports: ["event-listing posts", "mobilization posts", "Ghost Ship memorial post", "CallNYC repost context"],
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["Selected visible posts do not constitute a complete account export or prove Jamie authored every post."],
    antiClaims: ["Jamie authored every WOW List post.", "Social posts establish the complete WOW List product history."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-15",
    reviewedBy: ["Codex authenticated research review"]
  }
];

export const socialAccountArchiveResearchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: "INQ-PROJECT-SOCIAL-ACCOUNT-CUSTODY-2026",
    project: "collaborative-operations",
    question: "Which project social accounts did Jamie establish, how did collaborators share stewardship, and which public-safe records can independently verify creation and handoff without exposing credentials?",
    methods: [
      "Review public profiles and project-site links.",
      "Seek account-creation notices, administrator records, collaborator confirmation, and approved exports.",
      "Keep credential custody, identity design, post authorship, and campaign leadership as separate fields.",
      "Do not publish credentials, private messages, private account data, or unnecessary collaborator metadata."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "Five project accounts were verified as live public identities.",
      "The @NYCArtC profile explicitly carries four campaign hashtags rather than relying on currently recoverable standalone campaign profiles.",
      "Jamie states that he established the accounts and identity systems while multiple teammates contributed posts over time.",
      "No independent account-creation or administrator record was reviewed in this pass."
    ],
    limitations: [
      "Public profiles do not identify account creators or every historical administrator.",
      "Current handle absence does not prove a standalone account never existed.",
      "No credentials, private messages, or private account settings were inspected."
    ],
    sourceIds: [
      "SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15",
      "SRC-JAMIE-PROJECT-X-ACCOUNT-ESTABLISHMENT-2026-07-15"
    ],
    publicSummary: "Five durable project identities are publicly verified; Jamie's account-establishment role is preserved as a first-person claim pending independent corroboration, with collective posting explicitly protected."
  },
  {
    id: "INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026",
    project: "nyc-artist-coalition",
    question: "What mission-relevant participation and institutional engagement is recoverable around @NYCArtC, and what remains outside X Latest search?",
    methods: [
      "Scroll authenticated Latest search to stable exhaustion and deduplicate by status URL.",
      "Count author identities and classify external versus self-authored posts.",
      "Join author handles to dated official Council rosters and retain only in-office posts.",
      "Apply overlapping, documented mission-keyword patterns to normalized visible text.",
      "Inspect high-value city-agency and Council posts directly."
    ],
    runAt: "2026-07-15",
    resultStatus: "partially-recovered",
    findings: [
      "The recoverable corpus contains 527 posts from 180 author identities between February 2017 and March 2025.",
      "504 posts came from 179 identities other than @NYCArtC.",
      "Seven Council-member accounts authored 21 recovered in-office posts mentioning @NYCArtC.",
      "Olympia Kazi authored 89 recovered mentions, the highest author count in the corpus.",
      "NYC Cultural Affairs authored 15 recovered posts, including a 13-post CreateNYC exchange, and the Mayor's Office of Media and Entertainment documented the first Nightlife Town Hall.",
      "The mission-pattern inventory recovers sustained discourse across commercial rent, Cabaret Law repeal, MARCH transparency, cultural-space preservation, and nightlife governance."
    ],
    limitations: [
      "Latest search is not a complete export and may omit quotes, URL-only references, likes, repost history, deleted posts, renamed accounts, or inaccessible content.",
      "Keyword categories overlap and are discovery aids rather than exhaustive semantic labels.",
      "Public mentions do not establish endorsement, credential access, individual authorship of coalition posts, or sole causality."
    ],
    sourceIds: [
      "SRC-NYCA-X-AUTHENTICATED-MENTION-SEARCH-2026-07-15",
      "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2020-01-03",
      "SRC-NYC-COUNCIL-OFFICIAL-HANDLE-ROSTER-2021-04-14",
      "SRC-NYCA-X-NYCULTURE-CREATENYC-2017-03-03",
      "SRC-NYCA-X-NYCULTURE-CROWD-2017-03-30",
      "SRC-NYCA-X-MADEINNY-TOWN-HALL-2017-10-11",
      "SRC-NYCA-X-ESPINAL-CABARET-2017-10-30"
    ],
    publicSummary: "A bounded authenticated corpus documents broad collaborator use, at least seven Council-member accounts, and direct city-agency participation around NYC Artist Coalition; exact platform-wide totals remain open."
  }
];
