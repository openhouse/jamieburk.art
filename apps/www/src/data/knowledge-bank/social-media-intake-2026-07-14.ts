import type {
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SocialAccountRecord,
  SourceRecord
} from "./schema.ts";

const reviewedAt = "2026-07-14";

function socialPost(
  id: string,
  title: string,
  organization: string,
  canonicalUrl: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord {
  return {
    id,
    title,
    organization,
    kind: organization === "New York City Council" ? "government-social-post" : "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt,
    accessedAt: reviewedAt,
    canonicalUrl,
    preferredPublicUrl: "canonical",
    publicCitation,
    publicNote,
    supportsGenerally,
    doesNotEstablish
  };
}

export const socialMediaSourceRecords20260714 = [
  {
    id: "SRC-X-CALLNYC-PROFILE-AUDIT-2026",
    title: "Authenticated CallNYC public-account inventory",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/CallNYCapp",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated read-only review of the public @CallNYCApp account, July 14, 2026.",
    publicNote: "The profile displayed 110 posts. Cross-tab recovery found 107 unique public records and left three profile-count slots unresolved.",
    supportsGenerally: [
      "the dedicated CallNYC account and its March 2016 join date",
      "107 item-level public recoveries against a 110-post profile control",
      "public issue-recognition, resident-guidance, press, and Council-office interaction patterns"
    ],
    doesNotEstablish: [
      "a platform export or deletion history",
      "authorship of every post",
      "identity-level attribution for every like or repost",
      "Council endorsement, adoption, or policy causality"
    ]
  },
  {
    id: "SRC-X-NYCARTC-PROFILE-AUDIT-2026",
    title: "Authenticated NYC Artist Coalition public-account inventory",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated read-only review of the public @NYCArtC profile, timeline recoveries, and inbound public interactions, July 14, 2026.",
    publicNote: "The profile names #SaveNYCSpaces, #LetNYCDance, #TalksNotRaids, and #FairRentNYC. A cross-surface archival pass dispositioned the 5,124-post profile control as 3,367 item-level recoveries and 1,757 unresolved historical slots.",
    supportsGenerally: [
      "the shared coalition handle and four-campaign identity",
      "public use from 2017 through 2026",
      "3,367 item-level recoveries and 1,757 explicit unresolved slots",
      "an inbound recovery floor of 24 Council-member-account records across at least seven contemporaneous members"
    ],
    doesNotEstablish: [
      "a complete platform export or deletion history",
      "the contents of unresolved slots",
      "Jamie's authorship of team posts",
      "official Council endorsement, reach, or policy causality"
    ]
  },
  {
    id: "SRC-X-WOWLIST-PROFILE-AUDIT-2026",
    title: "Authenticated WOW List public-account inventory",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated read-only review of the public @wowlist profile and timeline, July 14, 2026.",
    publicNote: "All 38 records in the current profile control were recovered, including public posts, replies, and reposts.",
    supportsGenerally: [
      "the dedicated WOW List account and its February 2014 join date",
      "38 item-level recoveries against the 38-post current profile control",
      "public product-support, event-distribution, community-documentation, and civic-care patterns"
    ],
    doesNotEstablish: [
      "that no post was deleted before the review",
      "authorship of every post",
      "broad adoption, reach, or downstream impact"
    ]
  },
  {
    id: "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026",
    title: "Authenticated KC Town Hall public-account inventory",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl: "https://x.com/KCTownHall",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated read-only review of the public @KCTownHall profile and timeline, July 14, 2026.",
    publicNote: "The current profile displayed 183 posts, and the dated recovery retained 183 unique public status records spanning July 2018 through September 2022.",
    supportsGenerally: [
      "the dedicated KC Town Hall account and its March 2018 join date",
      "183 unique public status recoveries against the current 183-post profile control",
      "restoration, resident-input, neighborhood-operations, civic-information, and Tired of Tires patterns"
    ],
    doesNotEstablish: [
      "that no post was deleted before the review",
      "Jamie's authorship of every post",
      "Jamie's operation of later programs",
      "endorsement, funding, or Council-allocation causality"
    ]
  },
  {
    id: "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
    title: "Jamie Burkart firsthand project-account establishment confirmation",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation: "Jamie Burkart firsthand confirmation, July 14, 2026.",
    publicNote: "Jamie confirms establishing the CallNYC, NYC Artist Coalition, WOW List, and KC Town Hall accounts as public-facing project identity infrastructure.",
    supportsGenerally: [
      "Jamie's account-establishment role",
      "the intended shared identity and collaborator-handoff function"
    ],
    doesNotEstablish: [
      "authorship of every post",
      "sole ownership of team communications",
      "sole credit for campaign outcomes"
    ],
    protectedLocatorId: "MEMORY-SOCIAL-ACCOUNT-ESTABLISHMENT-2026"
  },
  socialPost(
    "SRC-X-CALLNYC-MATTEO-REPLY-2016",
    "Steven Matteo reply to CallNYC pothole recognition",
    "Steven Matteo",
    "https://x.com/StevenMatteo/status/727621921341358081",
    "2016-05-03",
    "Steven Matteo, public reply to @CallNYCApp about potholes, May 3, 2016.",
    "The rendered thread preserves Matteo's reply and CallNYC's public response the next day.",
    ["direct member-account reply to CallNYC", "reciprocal public exchange"],
    ["formal endorsement", "Council adoption", "the identity of every reacting account"]
  ),
  socialPost(
    "SRC-X-CALLNYC-RODRIGUEZ-QUOTE-2016",
    "Ydanis Rodriguez quote post of CallNYC recognition",
    "Ydanis Rodriguez",
    "https://x.com/ydanis/status/733089563334299648",
    "2016-05-18",
    "Ydanis Rodriguez, quote post of a CallNYC rent-overcharge recognition, May 18, 2016.",
    "Rodriguez connected the project recognition to protecting tenant rights in northern Manhattan and citywide.",
    ["member-authored quote amplification of CallNYC", "tenant-rights framing"],
    ["formal endorsement", "Council adoption", "policy causality"]
  ),
  socialPost(
    "SRC-X-CALLNYC-MENDEZ-QUOTE-2016",
    "Rosie Mendez quote post of CallNYC recognition",
    "Rosie Mendez",
    "https://x.com/RosieMendez/status/733410096915550208",
    "2016-05-19",
    "Rosie Mendez, quote post of a CallNYC emergency-repairs recognition, May 19, 2016.",
    "Mendez thanked her staff while quote-amplifying CallNYC's recognition of the office's constituent-service activity.",
    ["member-authored quote amplification of CallNYC", "public staff credit"],
    ["formal endorsement", "Council adoption", "policy causality"]
  ),
  socialPost(
    "SRC-X-CALLNYC-ROSENTHAL-PROMOTION-2016",
    "Helen Rosenthal public CallNYC promotion",
    "Helen Rosenthal",
    "https://x.com/HelenRosenthal/status/780797474277511170",
    "2016-09-27",
    "Helen Rosenthal, public post directing residents to callnyc.org, September 27, 2016.",
    "Rosenthal told readers Council offices were available to help and directed them to the CallNYC tool.",
    ["member-authored promotion of CallNYC", "resident-service routing"],
    ["formal endorsement", "Council adoption", "continued currency of the archived tool"]
  ),
  socialPost(
    "SRC-X-CALLNYC-EUGENE-QUOTE-2016",
    "Mathieu Eugene quote post of CallNYC recognition",
    "Mathieu Eugene",
    "https://x.com/CMMathieuEugene/status/783305320508514304",
    "2016-10-04",
    "Mathieu Eugene, quote post of a CallNYC housing-lottery recognition, October 4, 2016.",
    "Eugene connected the recognition to helping constituents improve their housing options.",
    ["member-authored quote amplification of CallNYC", "housing-service framing"],
    ["formal endorsement", "Council adoption", "policy causality"]
  ),
  socialPost(
    "SRC-X-NYCARTC-ESPINAL-2017",
    "Rafael Espinal NYC Artist Coalition Cabaret Law post",
    "Rafael Espinal",
    "https://x.com/RLEspinal/status/924972124628049920",
    "2017-10-30",
    "Rafael Espinal, public post naming NYC Artist Coalition and Dance Liberation Network in the Cabaret Law repeal effort, October 30, 2017.",
    "A contemporaneous Council-member account publicly identified the coalition within the collective repeal effort.",
    ["direct Council-member engagement with @NYCArtC", "coalition participation in repeal advocacy"],
    ["Jamie's authorship", "sole coalition causality", "Council endorsement of every coalition campaign"]
  ),
  socialPost(
    "SRC-X-NYCARTC-LEVIN-2019",
    "Stephen Levin Talks Not Raids testimony post",
    "Stephen Levin",
    "https://x.com/StephenLevin33/status/1095020293112979457",
    "2019-02-11",
    "Stephen Levin, public post thanking NYC Artist Coalition and venues after testimony about MARCH raids, February 11, 2019.",
    "A contemporaneous member account credited coalition and venue participation after a public hearing.",
    ["direct Council-member engagement with @NYCArtC", "Talks Not Raids hearing participation"],
    ["Jamie's individual attendance", "a completed enforcement outcome", "official endorsement"]
  ),
  socialPost(
    "SRC-X-NYCARTC-RIVERA-2021",
    "Carlina Rivera FairRentNYC quote post",
    "Carlina Rivera",
    "https://x.com/CarlinaRivera/status/1438843816732151813",
    "2021-09-17",
    "Carlina Rivera, public quote post amplifying an @NYCArtC FairRentNYC message, September 17, 2021.",
    "Rivera quote-amplified the coalition's commercial-rent campaign message.",
    ["direct Council-member engagement with @NYCArtC", "FairRentNYC message amplification"],
    ["bill passage", "official Council endorsement", "Jamie's authorship"]
  ),
  socialPost(
    "SRC-X-NYCARTC-BRANNAN-2019",
    "Justin Brannan Talks Not Raids quote post",
    "Justin Brannan",
    "https://x.com/JustinBrannan/status/1140698679394938883",
    "2019-06-17",
    "Justin Brannan, public quote post amplifying an @NYCArtC Talks Not Raids message, June 17, 2019.",
    "Brannan argued that MARCH operations required precision and oversight and should not target community and cultural spaces.",
    ["direct Council-member engagement with @NYCArtC", "Talks Not Raids message amplification"],
    ["a completed enforcement outcome", "official endorsement", "Jamie's authorship"]
  ),
  socialPost(
    "SRC-X-NYCARTC-VAN-BRAMER-2020",
    "Jimmy Van Bramer cultural-support post naming NYC Artist Coalition",
    "Jimmy Van Bramer",
    "https://x.com/JimmyVanBramer/status/1320792543773282304",
    "2020-10-26",
    "Jimmy Van Bramer, public arts-and-culture support post naming NYC Artist Coalition, October 26, 2020.",
    "A contemporaneous member account directly mentioned the coalition in a mission-relevant public post.",
    ["direct Council-member engagement with @NYCArtC", "arts-and-culture support context"],
    ["official endorsement", "a specific policy outcome", "Jamie's authorship"]
  ),
  socialPost(
    "SRC-X-NYCARTC-LEVINE-REPLY-2020",
    "Mark Levine public reply in an NYC Artist Coalition thread",
    "Mark Levine",
    "https://x.com/MarkLevineNYC/status/1241027587947876352",
    "2020-03-20",
    "Mark Levine, public reply to an @NYCArtC question about the effective date of pandemic restrictions, March 20, 2020.",
    "The thread establishes direct account-level exchange while remaining outside the selected campaign-outcome claims.",
    ["direct Council-member account interaction with @NYCArtC"],
    ["mission-specific endorsement", "policy outcome", "Jamie's authorship"]
  ),
  socialPost(
    "SRC-X-NYCARTC-LANDER-REPLY-2021",
    "Brad Lander commercial-rent reply in an NYC Artist Coalition thread",
    "Brad Lander",
    "https://x.com/bradlander/status/1354840336330330116",
    "2021-01-28",
    "Brad Lander, public reply in a thread naming @NYCArtC and FairRentNYC, January 28, 2021.",
    "Lander stated that he had spoken in committee about moving forward with Commercial Rent Stabilization.",
    ["direct Council-member account interaction with @NYCArtC", "commercial-rent hearing context"],
    ["bill passage", "official Council endorsement", "Jamie's authorship"]
  ),
  socialPost(
    "SRC-X-NYCARTC-MADEINNY-TOWN-HALL-2017",
    "Made in NY first Nightlife Town Hall post",
    "NYC Mayor's Office of Media and Entertainment",
    "https://x.com/MadeinNY/status/918266538616082432",
    "2017-10-11",
    "Made in NY, public post connecting NYC Artist Coalition with the first Nightlife Town Hall, October 11, 2017.",
    "An institutional account publicly connected the coalition with a town hall for the new Office of Nightlife.",
    ["coalition public identity", "Nightlife Town Hall participation", "institutional engagement"],
    ["Jamie's production role", "sole event ownership", "attendance totals"]
  ),
  {
    id: "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
    title: "Taking back New York City's nightlife",
    organization: "Document Journal",
    author: "Daisy Prince",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-02-27",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.documentjournal.com/2018/02/taking-back-new-york-citys-nightlife/",
    preferredPublicUrl: "canonical",
    publicCitation: "Daisy Prince, 'Taking back New York City's nightlife,' Document Journal, February 27, 2018.",
    publicNote: "The article names and pictures Jamie with NYC Artist Coalition, names Olympia Kazi with NYC Artist Coalition and Let NYC Dance, and describes the broader collective nightlife-policy movement.",
    supportsGenerally: [
      "Jamie and Olympia Kazi's publicly reported coalition affiliation",
      "Let NYC Dance movement context",
      "collective nightlife advocacy"
    ],
    doesNotEstablish: [
      "Jamie's social-account establishment role",
      "sole causality for Cabaret Law repeal or the Office of Nightlife",
      "post-level authorship"
    ]
  },
  {
    id: "SRC-NYC-NIGHTLIFE-ADVISORY-REPORT-2021",
    title: "Nightlife Advisory Board Report - Summer 2021",
    organization: "City of New York",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-07-20",
    accessedAt: reviewedAt,
    canonicalUrl: "https://a860-gpp.nyc.gov/concern/file_sets/0z708z64c?locale=en",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Nightlife Advisory Board, Nightlife Advisory Board Report - Summer 2021.",
    publicNote: "The government portal preserves the public report; claim-level review of recommendations and acknowledgments remains open.",
    supportsGenerally: ["the report's public existence, date, format, and government preservation"],
    doesNotEstablish: [
      "Jamie's individual authorship",
      "the coalition's authorship of every recommendation",
      "implementation of every recommendation"
    ]
  },
  socialPost(
    "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
    "WOW List public Sunday Dinner origin post",
    "WOW List",
    "https://x.com/wowlist/status/433671630837919744",
    "2014-02-12",
    "WOW List, public post naming Richard and Jamie and describing the project as based on calendars made at Sunday Dinner, February 12, 2014.",
    "The account's contemporaneous description connects Jamie, a collaborator named Richard, WOW List, and Sunday Dinner.",
    ["Jamie was publicly named in the project", "WOW List grew from Sunday Dinner calendar practice"],
    ["complete product authorship", "the collaborator's full identity", "later adoption scale"]
  ),
  socialPost(
    "SRC-X-WOWLIST-USER-TUTORIAL-2015",
    "WOW List community-created tutorial post",
    "WOW List",
    "https://x.com/wowlist/status/632168285291835392",
    "2015-08-14",
    "WOW List, public post thanking a community member for creating a tutorial about using the platform, August 14, 2015.",
    "The post directly documents someone outside the account team creating an instructional artifact for other users.",
    ["community-created product instruction", "public evidence of platform use"],
    ["broad adoption", "the tutorial's current availability", "representative user sentiment"]
  ),
  socialPost(
    "SRC-X-KCTOWNHALL-LAUNCH-2018",
    "KC Town Hall public account launch post",
    "KC Town Hall",
    "https://x.com/KCTownHall/status/1013893135695601665",
    "2018-07-02",
    "KC Town Hall, public account launch post inviting people to follow and help build a neighborhood resource and cultural center, July 2, 2018.",
    "The post documents the account's public project identity, participatory invitation, and launch framing.",
    ["public project identity", "participatory launch framing", "neighborhood-resource purpose"],
    ["completed redevelopment", "funding receipt", "authorship of later posts"]
  )
] satisfies SourceRecord[];

const callNYCMemberSourceIds = [
  "SRC-X-CALLNYC-MATTEO-REPLY-2016",
  "SRC-X-CALLNYC-RODRIGUEZ-QUOTE-2016",
  "SRC-X-CALLNYC-MENDEZ-QUOTE-2016",
  "SRC-X-CALLNYC-ROSENTHAL-PROMOTION-2016",
  "SRC-X-CALLNYC-EUGENE-QUOTE-2016"
] as const;

const nycArtCCouncilSourceIds = [
  "SRC-X-NYCARTC-ESPINAL-2017",
  "SRC-X-NYCARTC-LEVIN-2019",
  "SRC-X-NYCARTC-RIVERA-2021",
  "SRC-X-NYCARTC-BRANNAN-2019",
  "SRC-X-NYCARTC-VAN-BRAMER-2020",
  "SRC-X-NYCARTC-LEVINE-REPLY-2020",
  "SRC-X-NYCARTC-LANDER-REPLY-2021"
] as const;

export const socialMediaClaimRecords20260714 = [
  {
    id: "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
    project: "career-proof-system",
    internalClaim: "Jamie established public-facing account identities for CallNYC, WOW List, NYC Artist Coalition, and KC Town Hall; the accounts then operated as shared project surfaces with collective post authorship and changing stewardship.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "technical-operations",
        text: "Established durable public-facing identities for CallNYC, WOW List, NYC Artist Coalition, and KC Town Hall, including a shared coalition identity that collaborators carried across campaigns and years.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
        relationship: "private-support",
        supports: ["Jamie's establishment of the four project accounts"],
        locator: "Jamie public-use confirmation, July 14, 2026",
        confidence: "high",
        renderCitation: false
      },
      ...[
        "SRC-X-CALLNYC-PROFILE-AUDIT-2026",
        "SRC-X-NYCARTC-PROFILE-AUDIT-2026",
        "SRC-X-WOWLIST-PROFILE-AUDIT-2026",
        "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026"
      ].map((sourceId) => ({
        sourceId,
        relationship: "corroborating" as const,
        supports: ["public account existence, mission, use, and continuity"],
        locator: "dated profile summary and account-reconciliation fields",
        confidence: "high" as const,
        renderCitation: false
      }))
    ],
    boundaries: [
      "Account establishment is distinct from authorship of every post.",
      "NYC Artist Coalition and later KC Town Hall activity had shared or changing stewardship.",
      "Project and policy outcomes remain collective."
    ],
    antiClaims: [
      "Jamie wrote every post",
      "Jamie controlled every campaign message",
      "Account activity proves sole leadership or policy causality"
    ],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-POST-AUTHORSHIP-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT-2016",
    project: "callnyc",
    internalClaim: "Five sitting New York City Council members are directly documented in reciprocal or member-authored public interaction with CallNYC in 2016: Helen Rosenthal, Mathieu Eugene, Rosie Mendez, Ydanis Rodriguez, and Steven Matteo.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Surviving account evidence documents direct public interaction from five sitting Council members in 2016: Helen Rosenthal promoted the tool; Mathieu Eugene, Rosie Mendez, and Ydanis Rodriguez quote-posted project recognitions; Steven Matteo replied and received a project response.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"]
      }
    ],
    evidence: callNYCMemberSourceIds.map((sourceId) => ({
      sourceId,
      relationship: "direct-support" as const,
      supports: ["member-authored promotion, quote amplification, or direct reply involving CallNYC"],
      locator: "visible member-authored status text and thread context",
      confidence: "high" as const,
      renderCitation: true
    })),
    boundaries: [
      "Five is a verified recovery floor, not a complete historical engagement census.",
      "Member-authored interaction is stronger than a one-way tag and narrower than formal endorsement or adoption.",
      "Current visible reaction counts are mutable and are not used as 2016 reach measures."
    ],
    antiClaims: [
      "The New York City Council endorsed or adopted CallNYC",
      "Every reaction to a member-tagged post came from that member",
      "All Council members engaged with CallNYC",
      "Social interaction caused an institutional outcome"
    ],
    researchInquiryIds: ["INQ-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-SHARED-CAMPAIGN-IDENTITY",
    project: "nyc-artist-coalition",
    internalClaim: "NYC Artist Coalition used @NYCArtC as a shared public identity for the coalition and the Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC campaigns.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "The coalition used one public account identity across Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC, giving collaborators a durable surface they could steward across campaigns and years.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-PROFILE-AUDIT-2026",
        relationship: "direct-support",
        supports: ["the shared handle", "the four named campaign hashtags", "multiyear continuity"],
        locator: "profile bio, dated profile control, and campaign-site social links",
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
        relationship: "corroborating",
        supports: ["Jamie and Olympia Kazi's public coalition affiliations", "Let NYC Dance context"],
        locator: "article passage naming coalition affiliations and Let NYC Dance context",
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The shared identity had collective post authorship and stewardship.",
      "Continuity does not establish Jamie's authorship of Olympia Kazi's or another teammate's posts."
    ],
    antiClaims: [
      "Jamie wrote every @NYCArtC post",
      "The account belonged to Jamie alone",
      "A shared identity proves sole leadership of the campaigns"
    ],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-POST-AUTHORSHIP-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT",
    project: "nyc-artist-coalition",
    internalClaim: "Authenticated recovery classified 24 public interaction records from at least seven contemporaneous New York City Council-member accounts involving @NYCArtC; seven representative status pages were independently re-opened in the authenticated review.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "Authenticated archival review recovered 24 public interaction records from at least seven contemporaneous Council-member accounts across Cabaret Law repeal, MARCH transparency, arts-and-culture support, and FairRentNYC.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-NYCARTC-PROFILE-AUDIT-2026",
        relationship: "direct-support",
        supports: ["the 24-record recovery floor", "the seven-account floor", "bounded authenticated method"],
        locator: "profile audit summary and bounded Council-account recovery table",
        confidence: "high",
        renderCitation: true
      },
      ...nycArtCCouncilSourceIds.map((sourceId) => ({
        sourceId,
        relationship: "corroborating" as const,
        supports: ["representative member-authored public interaction involving @NYCArtC"],
        locator: "visible member-authored status text and thread context",
        confidence: "high" as const,
        renderCitation: true
      }))
    ],
    boundaries: [
      "Twenty-four records across at least seven accounts is a recovery floor, not a complete historical census.",
      "Some direct exchanges are preserved through reply or thread context rather than an explicit handle in the reply text.",
      "Individual-account activity is not official Council endorsement, reach, policy causality, or Jamie-only authorship."
    ],
    antiClaims: [
      "Only seven Council members ever engaged",
      "The New York City Council endorsed NYC Artist Coalition",
      "Every tagged official engaged",
      "Jamie authored every coalition post",
      "Social engagement caused policy outcomes"
    ],
    researchInquiryIds: ["INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE",
    project: "wowlist",
    internalClaim: "Deprecated omnibus assertion formerly combining WOW List's Sunday Dinner lineage, named participants, and community-created product instruction.",
    status: "disallowed",
    projections: [
      {
        key: "case-study",
        text: "Contemporaneous account evidence connects WOW List to calendars made at Sunday Dinner and documents a community member creating a public tutorial for other users.",
        status: "deprecated",
        citationRequired: false,
        surfaces: []
      }
    ],
    evidence: [],
    boundaries: [
      "Superseded by CLM-WOWLIST-SUNDAY-DINNER-LINEAGE and CLM-WOWLIST-SOCIAL-PRODUCT-SUPPORT so each proposition retains its own evidence and boundary."
    ],
    antiClaims: [
      "Combine lineage, participant attribution, product instruction, and adoption into one public assertion"
    ],
    researchInquiryIds: ["INQ-WOWLIST-SOCIAL-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-KCTOWNHALL-DURABLE-PUBLIC-IDENTITY",
    project: "kc-town-hall",
    internalClaim: "The KC Town Hall account preserved a public project identity and a 2018-2022 record of restoration, resident-input, neighborhood-operations, civic-information, and later Tired of Tires activity under changing stewardship.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "The account preserved a public project identity and a 2018-2022 record of restoration, resident-input, neighborhood-operations, civic-information, and later activity under changing stewardship.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/research/2026-07-14-project-social-media-archive-production"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026",
        relationship: "direct-support",
        supports: ["account population", "date range", "mission-relevant activity patterns"],
        locator: "dated profile summary and account-reconciliation fields",
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-KCTOWNHALL-LAUNCH-2018",
        relationship: "direct-support",
        supports: ["public project identity", "participatory launch framing"],
        locator: "visible launch-post text and status metadata",
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Jamie confirms establishing the account, but the account does not identify the author of every post.",
      "Later Tired of Tires activity must not be assigned to Jamie without post-level authorship or role evidence.",
      "Social interaction does not prove municipal endorsement, funding, or project completion."
    ],
    antiClaims: [
      "Jamie authored every KC Town Hall post",
      "Jamie operated every later account program",
      "Account engagement caused the Council allocation"
    ],
    researchInquiryIds: ["INQ-KCTOWNHALL-SOCIAL-ARCHIVE-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const socialMediaResearchInquiries20260714 = [
  {
    id: "INQ-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026",
    project: "career-proof-system",
    question: "Which public project X accounts are verified, which projects share an identity, and what portion of each current profile control was recovered?",
    methods: [
      "Used an authenticated read-only X session and confirmed the session belonged to Jamie's @urbanhermit account.",
      "Opened the four public project profiles and recorded visible handles, join dates, profile counts, and mission descriptions.",
      "Reviewed the public campaign sites and confirmed that Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC route their Twitter identity through @NYCArtC.",
      "Reconciled dated item-level recoveries with each live profile control and retained unresolved slots explicitly."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "Four verified project accounts were recovered: @CallNYCApp, @NYCArtC, @wowlist, and @KCTownHall.",
      "The four NYC Artist Coalition campaign sites use @NYCArtC as a shared coalition identity.",
      "CallNYC recovered 107 of 110 current profile-count slots; NYCArtC recovered 3,367 of 5,124; WOW List recovered 38 of 38; KC Town Hall recovered 183 of 183."
    ],
    limitations: [
      "Current profile controls are not platform exports or deletion histories.",
      "No verified dedicated account was recovered for Sunday Dinner / 196, Harry J. Epstein Company, KC Spaces Fund, or Source-Backed Team Memory; this does not prove none existed.",
      "Authenticated access does not grant permission to publish private messages, analytics, credentials, or session material."
    ],
    sourceIds: [
      "SRC-X-CALLNYC-PROFILE-AUDIT-2026",
      "SRC-X-NYCARTC-PROFILE-AUDIT-2026",
      "SRC-X-WOWLIST-PROFILE-AUDIT-2026",
      "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026"
    ],
    publicSummary: "Authenticated review recovered four project accounts and established that four NYC Artist Coalition campaigns share @NYCArtC; item-level completeness remains account-specific."
  },
  {
    id: "INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026",
    project: "nyc-artist-coalition",
    question: "How many contemporaneous NYC Council-member accounts publicly interacted with @NYCArtC, and which mission-relevant patterns are supported?",
    methods: [
      "Reconciled authenticated profile, inbound-search, and thread-context recoveries.",
      "Separated explicit mentions and quote posts from reply-thread context and from one-way tags by @NYCArtC.",
      "Checked representative member-authored status pages and contemporaneous officeholding.",
      "Retained account-level activity separately from endorsement, reach, post authorship, and policy causality."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The bounded recovery classified 24 public interaction records from at least seven contemporaneous Council-member accounts.",
      "Representative mission-specific interactions were independently re-opened for Rafael Espinal, Stephen Levin, Carlina Rivera, Justin Brannan, Jimmy Van Bramer, and Brad Lander; Mark Levine's recovered reply establishes account exchange only.",
      "The mission pattern spans Cabaret Law repeal, MARCH transparency, arts-and-culture support, and FairRentNYC."
    ],
    limitations: [
      "The 24 records and seven accounts are recovery floors, not complete historical censuses.",
      "Some exchanges survive through reply or search-thread context rather than an explicit handle in the reply text.",
      "The finding does not establish official Council endorsement, reach, causality, or Jamie's authorship of team posts."
    ],
    sourceIds: ["SRC-X-NYCARTC-PROFILE-AUDIT-2026", ...nycArtCCouncilSourceIds],
    publicSummary: "Authenticated recovery found 24 public interaction records across at least seven contemporaneous Council-member accounts; the result is a bounded floor, not an endorsement claim."
  },
  {
    id: "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP-2026",
    project: "career-proof-system",
    question: "Which individual teammate authored each post on shared project accounts?",
    methods: [
      "Treat Jamie's account-establishment confirmation separately from post authorship.",
      "Review only public signing, dated drafts, explicit collaborator confirmation, or other post-level authorship evidence when available.",
      "Do not infer authorship from account custody, project leadership, writing style, or later stewardship."
    ],
    runAt: reviewedAt,
    resultStatus: "inconclusive",
    findings: [
      "The public accounts establish mission, continuity, and account-level activity but generally do not identify the teammate who composed each post.",
      "Olympia Kazi's public activity provides positive evidence of shared stewardship of the NYC Artist Coalition identity."
    ],
    limitations: [
      "No first-party export with reliable composer attribution was reviewed.",
      "Shared credentials and publication workflows may not preserve individual authorship."
    ],
    sourceIds: [
      "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
      "SRC-X-NYCARTC-PROFILE-AUDIT-2026",
      "SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026"
    ],
    publicSummary: "Jamie established the accounts; post-level authorship remains collective or unattributed unless separate evidence identifies a composer."
  },
  {
    id: "INQ-WOWLIST-SOCIAL-ARCHIVE-2026",
    project: "wowlist",
    question: "What mission-relevant product and community-use evidence survives in the current @wowlist account population?",
    methods: [
      "Recovered all 38 current profile-control records through authenticated Posts and Replies views.",
      "Separated account posts, replies, and reposts and close-read the origin and tutorial status pages.",
      "Treated amplified resources as source leads rather than WOW List-authored outcomes."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "The complete current profile control contains product support, event distribution, scene-knowledge routing, civic-care resources, and external-account amplification.",
      "A 2014 post connects the project to Sunday Dinner calendars and publicly names Jamie and a collaborator.",
      "A 2015 post documents a community member creating a tutorial for other users."
    ],
    limitations: [
      "A complete current profile control does not prove no records were deleted earlier.",
      "One tutorial does not establish broad adoption or representative user sentiment.",
      "Reposts do not make WOW List the author or organizer of the amplified work."
    ],
    sourceIds: [
      "SRC-X-WOWLIST-PROFILE-AUDIT-2026",
      "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
      "SRC-X-WOWLIST-USER-TUTORIAL-2015"
    ],
    publicSummary: "The complete current @wowlist profile control preserves product support, event distribution, community documentation, and civic-care patterns."
  },
  {
    id: "INQ-KCTOWNHALL-SOCIAL-ARCHIVE-2026",
    project: "kc-town-hall",
    question: "What public project and neighborhood-operations evidence survives in the current @KCTownHall account population?",
    methods: [
      "Recovered 183 unique public status records against the live 183-post profile control.",
      "Separated account-authored posts from reposts and reviewed date range, recurring themes, mentions, and representative threads.",
      "Kept later stewardship, authorship, municipal endorsement, and funding claims separate from account activity."
    ],
    runAt: reviewedAt,
    resultStatus: "recovered",
    findings: [
      "The recovered current profile spans July 2018 through September 2022.",
      "The record carries restoration, resident-input, neighborhood-operations, civic-information, and recurring Tired of Tires activity.",
      "The account opened with a participatory invitation to build a neighborhood resource and cultural center."
    ],
    limitations: [
      "A complete current profile control does not prove no records were deleted earlier.",
      "The account does not identify the composer of every post or establish Jamie's role in later programs.",
      "Public exchange does not prove endorsement, funding, Council-allocation causality, or project completion."
    ],
    sourceIds: ["SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026", "SRC-X-KCTOWNHALL-LAUNCH-2018"],
    publicSummary: "The current @KCTownHall profile preserves a 2018-2022 public record of restoration, participation, neighborhood operations, and later activity under changing stewardship."
  }
] satisfies ResearchInquiry[];

const decomposedSocialSourceIds = [
  ...new Set(
    socialMediaClaimRecords20260714.flatMap((claim) =>
      claim.evidence.map(({ sourceId }) => sourceId)
    )
  )
];

const metadataOnlySocialSourceIds = socialMediaSourceRecords20260714
  .map(({ id }) => id)
  .filter((sourceId) => !decomposedSocialSourceIds.includes(sourceId));

export const socialMediaIntakeRecords20260714 = [
  {
    id: "INTAKE-PROJECT-SOCIAL-ACCOUNT-ARCHIVE-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "engagement-lead",
    title: "Project social-account archival production",
    publicSafeSummary: "Authenticated, read-only inventory of four public project accounts, their shared or dedicated identities, bounded population recoveries, significant posts, linked sources, and mission-relevant engagement patterns.",
    whyItMatters: "Documents durable public identity infrastructure and public exchange while keeping account establishment, collective authorship, engagement, endorsement, reach, and policy outcomes distinct.",
    projectHints: [
      "callnyc",
      "nyc-artist-coalition",
      "wowlist",
      "kc-town-hall",
      "career-proof-system"
    ],
    maturity: "decomposed",
    publicUse: "public-linkable",
    editorialState: "selected",
    disposition: "claim-candidate-created",
    sourceIds: decomposedSocialSourceIds,
    claimIds: socialMediaClaimRecords20260714.map(({ id }) => id),
    inquiryIds: socialMediaResearchInquiries20260714.map(({ id }) => id),
    limitations: [
      "No private messages, analytics, credentials, session material, or account-recovery data were collected.",
      "Profile counts and recoveries are dated controls, not platform exports or deletion histories.",
      "Team accounts do not identify the author of every post."
    ],
    nextActions: [
      "Seek privacy-preserving first-party exports only when they can narrow unresolved slots without exposing nonpublic account data.",
      "Attribute individual posts only from post-level evidence or collaborator confirmation.",
      "Close-read linked articles and reports selectively before promoting additional claims."
    ]
  },
  {
    id: "INTAKE-PROJECT-SOCIAL-SOURCE-LEADS-2026",
    capturedAt: reviewedAt,
    capturedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "research-lead",
    title: "Project social-account source leads awaiting claim-level review",
    publicSafeSummary: "Public reports, articles, and linked destinations recovered during social-account research that have not yet been promoted into atomic claim evidence.",
    whyItMatters: "Keeps mission-relevant source leads available for later close reading without inflating metadata recovery into claim-level support.",
    projectHints: ["career-proof-system", "callnyc", "nyc-artist-coalition", "wowlist", "kc-town-hall"],
    maturity: "metadata-reviewed",
    publicUse: "cite-with-care",
    editorialState: "candidate",
    disposition: "source-created",
    sourceIds: metadataOnlySocialSourceIds,
    claimIds: [],
    inquiryIds: [],
    limitations: [
      "Metadata recovery does not establish the article or report's substantive claims.",
      "Each source requires claim-level close reading before public projection."
    ],
    nextActions: [
      "Close-read a source only when it can support an atomic professional claim or boundary.",
      "Keep unreviewed source leads off public portfolio surfaces."
    ]
  }
] satisfies IntakeRecord[];

export const socialAccountRecords20260714 = [
  {
    id: "SOCIAL-CALLNYC-X",
    handle: "@CallNYCApp",
    canonicalUrl: "https://x.com/CallNYCapp",
    projectIds: ["callnyc"],
    accountRelationship: "dedicated-project",
    joined: "March 2016",
    observedAt: reviewedAt,
    profilePostsObserved: 110,
    recoveredItems: 107,
    unresolvedItems: 3,
    recoveryStatus: "near-complete-current-profile",
    sourceIds: ["SRC-X-CALLNYC-PROFILE-AUDIT-2026", ...callNYCMemberSourceIds],
    claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS", "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT-2016"],
    inquiryIds: ["INQ-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT-2026", "INQ-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026"],
    authorshipBoundary: "Jamie confirms establishing the account; the public timeline does not independently identify the author of every post.",
    limitations: ["Three current profile-count slots remain unresolved.", "Interaction evidence is not Council endorsement or adoption."]
  },
  {
    id: "SOCIAL-NYCARTC-X",
    handle: "@NYCArtC",
    canonicalUrl: "https://x.com/NYCArtC",
    projectIds: ["nyc-artist-coalition", "let-nyc-dance", "talks-not-raids", "save-nyc-spaces", "fair-rent-nyc"],
    accountRelationship: "shared-coalition",
    joined: "January 2017",
    observedAt: reviewedAt,
    profilePostsObserved: 5124,
    recoveredItems: 3367,
    unresolvedItems: 1757,
    recoveryStatus: "partial-with-all-slots-dispositioned",
    sourceIds: ["SRC-X-NYCARTC-PROFILE-AUDIT-2026", ...nycArtCCouncilSourceIds],
    claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS", "CLM-NYCARTC-SHARED-CAMPAIGN-IDENTITY", "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT"],
    inquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026", "INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026", "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP-2026"],
    authorshipBoundary: "Jamie confirms establishing the account; teammates, including Olympia Kazi, used and stewarded the shared identity, so post-level authorship remains collective or unattributed without separate evidence.",
    limitations: ["1,757 historical profile-count slots remain unresolved.", "The 24 Council-member interaction records are a recovery floor, not an endorsement or complete census."]
  },
  {
    id: "SOCIAL-WOWLIST-X",
    handle: "@wowlist",
    canonicalUrl: "https://x.com/wowlist",
    projectIds: ["wowlist"],
    accountRelationship: "dedicated-project",
    joined: "February 2014",
    observedAt: reviewedAt,
    profilePostsObserved: 38,
    recoveredItems: 38,
    unresolvedItems: 0,
    recoveryStatus: "current-profile-control-recovered",
    sourceIds: [
      "SRC-X-WOWLIST-PROFILE-AUDIT-2026",
      "SRC-X-WOWLIST-FULL-POPULATION-2026",
      "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
      "SRC-X-WOWLIST-USER-TUTORIAL-2015",
      "SRC-X-WOWLIST-NYCDIY-2016",
      "SRC-X-WOWLIST-PRODUCT-SUPPORT-2015",
      "SRC-X-WOWLIST-NATIONAL-MARCHES-2016",
      "SRC-X-WOWLIST-POPULAR-VOTE-2016",
      "SRC-X-WOWLIST-PUNKS-USE-2015",
      "SRC-X-WOWLIST-MUSIC-HACKATHON-ATTRIBUTION-2015",
      "SRC-X-WOWLIST-ALL-AGES-RESPONSE-2015",
      "SRC-WOWLIST-ARCHIVED-HOME-2017",
      "SRC-WOWLIST-PUBLIC-SAFE-AGGREGATE-2026"
    ],
    claimIds: [
      "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
      "CLM-WOWLIST-FULL-POPULATION-PRACTICE",
      "CLM-WOWLIST-SOCIAL-PRODUCT-SUPPORT",
      "CLM-WOWLIST-SUNDAY-DINNER-LINEAGE",
      "CLM-WOWLIST-CIVIC-DISTRIBUTION-ADAPTATION",
      "CLM-WOWLIST-ORGANIZER-PRODUCT-USE",
      "CLM-WOWLIST-JAMIE-PEER-ATTRIBUTION",
      "CLM-WOWLIST-CALENDAR-COMMUNITY-DIALOGUE",
      "CLM-WOWLIST-ARCHIVED-HOME-POSITIONING",
      "CLM-WOWLIST-HISTORICAL-SCALE-SNAPSHOT",
      "CLM-WOWLIST-SOURCE-CURATION-PRACTICE"
    ],
    inquiryIds: [
      "INQ-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026",
      "INQ-WOWLIST-SOCIAL-ARCHIVE-2026",
      "INQ-WOWLIST-FULL-POPULATION-2026"
    ],
    authorshipBoundary: "Jamie confirms establishing the account; the public timeline does not identify the composer of every account post or reply.",
    limitations: [
      "Complete current-profile recovery does not prove that no older record was deleted.",
      "The 16-record incoming search is bounded and does not establish a complete reception census.",
      "Visible interactions and independently posted URLs do not establish reach, endorsement, adoption, attendance, or impact."
    ]
  },
  {
    id: "SOCIAL-KCTOWNHALL-X",
    handle: "@KCTownHall",
    canonicalUrl: "https://x.com/KCTownHall",
    projectIds: ["kc-town-hall"],
    accountRelationship: "dedicated-project",
    joined: "March 2018",
    observedAt: reviewedAt,
    profilePostsObserved: 183,
    recoveredItems: 183,
    unresolvedItems: 0,
    recoveryStatus: "current-profile-control-recovered",
    sourceIds: ["SRC-X-KCTOWNHALL-PROFILE-AUDIT-2026", "SRC-X-KCTOWNHALL-LAUNCH-2018"],
    claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS", "CLM-KCTOWNHALL-DURABLE-PUBLIC-IDENTITY"],
    inquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026", "INQ-KCTOWNHALL-SOCIAL-ARCHIVE-2026", "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP-2026"],
    authorshipBoundary: "Jamie confirms establishing the account; shared and later stewardship is retained separately, and later activity is not assigned to Jamie without post-level evidence.",
    limitations: ["Complete current-profile recovery does not prove that no older record was deleted.", "Account activity does not establish endorsement, funding, or Council-allocation causality."]
  }
] satisfies SocialAccountRecord[];
