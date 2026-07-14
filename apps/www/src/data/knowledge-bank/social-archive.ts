import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const socialArchiveAccountMap = [
  {
    projects: ["CallNYC"],
    handle: "@CallNYCApp",
    url: "https://x.com/CallNYCapp",
    joined: "March 2016",
    profilePostsObserved: 110,
    followingObserved: 194,
    followersObserved: 69,
    timelineItemsRecovered: 106,
    recoveryNote: "91 account-authored posts and 15 reposts were recovered from the visible March-November 2016 profile timeline."
  },
  {
    projects: ["NYC Artist Coalition", "Let NYC Dance", "Talks Not Raids", "Save NYC Spaces", "FairRentNYC"],
    handle: "@NYCArtC",
    url: "https://x.com/NYCArtC",
    joined: "January 2017",
    profilePostsObserved: 5124,
    followingObserved: 568,
    followersObserved: 1338,
    timelineItemsRecovered: null,
    recoveryNote: "The active account was sampled through campaign and actor queries; no complete profile export was attempted."
  },
  {
    projects: ["WOW List"],
    handle: "@wowlist",
    url: "https://x.com/wowlist",
    joined: "February 2014",
    profilePostsObserved: 38,
    followingObserved: 57,
    followersObserved: 47,
    timelineItemsRecovered: 37,
    recoveryNote: "A near-complete visible historical profile recovery; one of the 38 profile-count items was not recovered."
  }
] as const;

export const socialArchiveIntake = [
  {
    id: "LEAD-PROJECT-SOCIAL-ARCHIVE-PASS-2026",
    receivedAt: "2026-07-13",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Project social-account archival production",
    summary: "Inventory the verified project accounts, recover mission-relevant public engagement and linked sources, and separate Jamie's identity-system contribution from collective post authorship.",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "inquiry-created", "project-linked", "protected-from-publication"],
    projectIds: ["callnyc", "nyc-artist-coalition", "wowlist", "career-proof-system"],
    sourceIds: [
      "SRC-X-CALLNYC-PROFILE-INVENTORY-2026",
      "SRC-X-NYCARTC-PROFILE-INVENTORY-2026",
      "SRC-X-WOWLIST-PROFILE-INVENTORY-2026",
      "SRC-JAMIE-SOCIAL-IDENTITY-ESTABLISHMENT-2026",
      "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
      "SRC-X-WOWLIST-USER-TUTORIAL-2015",
      "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
      "SRC-NYC-NIGHTLIFE-ADVISORY-REPORT-2021"
    ],
    claimIds: [
      "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
      "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
      "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE"
    ],
    inquiryIds: [
      "INQ-X-PROJECT-ACCOUNT-INVENTORY-2026",
      "INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026",
      "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP"
    ],
    notes: [
      "Authenticated read-only recovery was necessary to see historical timelines, but no session, credential, cookie, account-recovery, or private-message data entered the repository.",
      "Recovered counts are documented floors, not claims of platform-export completeness.",
      "Jamie confirms establishing the accounts; public timelines do not identify who authored every team post."
    ]
  }
] satisfies IntakeRecord[];

const xSource = (
  id: string,
  title: string,
  url: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord => ({
  id,
  title,
  organization: "X (formerly Twitter)",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-13",
  canonicalUrl: url,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish
});

export const socialArchiveSources = [
  {
    id: "SRC-X-CALLNYC-PROFILE-INVENTORY-2026",
    title: "Authenticated CallNYC public-profile inventory",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://x.com/CallNYCapp",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated read-only review of the public @CallNYCApp profile and timeline, July 13, 2026.",
    publicNote: "The profile showed 110 posts. Scrolling recovered 106 visible timeline items: 91 account-authored posts and 15 reposts, spanning March-November 2016.",
    supportsGenerally: ["the verified CallNYC handle", "near-complete visible timeline recovery", "historical project outreach and repost patterns"],
    doesNotEstablish: ["a complete platform export", "authorship of every post", "private engagement data", "institutional endorsement"]
  },
  {
    id: "SRC-X-NYCARTC-PROFILE-INVENTORY-2026",
    title: "Authenticated NYC Artist Coalition public-profile inventory",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://x.com/NYCArtC",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated read-only review of the public @NYCArtC profile, campaign queries, and Council-member interactions, July 13, 2026.",
    publicNote: "The active profile named #SaveNYCSpaces, #LetNYCDance, #TalksNotRaids, and #FairRentNYC. Authenticated query recovery found direct mentions, replies, or quote amplification from at least six contemporaneous Council-member accounts: Rafael Espinal, Stephen Levin, Carlina Rivera, Justin Brannan, Jimmy Van Bramer, and Mark Levine.",
    supportsGenerally: ["the verified coalition handle", "a shared four-campaign identity", "long-running public use", "a bounded engagement-recovery floor"],
    doesNotEstablish: ["a complete account export", "authorship of every post", "sole credit for campaigns or outcomes", "official Council endorsement"]
  },
  {
    id: "SRC-X-WOWLIST-PROFILE-INVENTORY-2026",
    title: "Authenticated WOW List public-profile inventory",
    organization: "X (formerly Twitter)",
    kind: "research-run",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: "2026-07-13",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://x.com/wowlist",
    preferredPublicUrl: "canonical",
    publicCitation: "Authenticated read-only review of the public @wowlist profile and timeline, July 13, 2026.",
    publicNote: "The profile showed 38 posts; scrolling recovered 37 visible timeline items, including the public Sunday Dinner origin statement and a community-created tutorial.",
    supportsGenerally: ["the verified WOW List handle", "near-complete visible timeline recovery", "Sunday Dinner origin context", "community-created tutorial evidence"],
    doesNotEstablish: ["a complete platform export", "broad adoption by itself", "authorship of every post", "current platform activity"]
  },
  {
    id: "SRC-JAMIE-SOCIAL-IDENTITY-ESTABLISHMENT-2026",
    title: "Jamie Burkart firsthand account-establishment confirmation",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-13",
    publicCitation: "Jamie Burkart firsthand confirmation, July 13, 2026.",
    publicNote: "Jamie confirms that he established the CallNYC, NYC Artist Coalition, and WOW List project accounts as public-facing identity infrastructure.",
    supportsGenerally: ["Jamie's account-establishment role", "the intended shared identity and handoff function"],
    doesNotEstablish: ["authorship of every post", "sole ownership of team communications", "sole causality for public outcomes"],
    protectedLocatorId: "MEMORY-SOCIAL-IDENTITY-ESTABLISHMENT-2026-001"
  },
  xSource(
    "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014",
    "WOW List public Sunday Dinner origin post",
    "https://x.com/wowlist/status/433671630837919744",
    "2014-02-12",
    "WOW List public post naming Richard and Jamie and describing the project as based on calendars made at Sunday Dinner, February 12, 2014.",
    "The account's own contemporaneous description publicly connects Jamie, a collaborator named Richard, WOW List, and Sunday Dinner.",
    ["Jamie was publicly named in the project", "WOW List grew from Sunday Dinner calendar practice"],
    ["complete product authorship", "the collaborator's full identity", "later adoption scale"]
  ),
  xSource(
    "SRC-X-WOWLIST-USER-TUTORIAL-2015",
    "WOW List community-created tutorial post",
    "https://x.com/wowlist/status/632168285291835392",
    "2015-08-14",
    "WOW List public post thanking a community member for creating a tutorial about using the platform, August 14, 2015.",
    "This is direct public evidence that someone outside the account team created an instructional artifact for other users.",
    ["community-created product instruction", "public evidence of platform use"],
    ["broad adoption", "the tutorial's current availability", "the creator's motivation or representative status"]
  ),
  xSource(
    "SRC-X-NYCARTC-ESPINAL-CABARET-2017",
    "Rafael Espinal public NYC Artist Coalition Cabaret Law post",
    "https://x.com/RLEspinal/status/924972124628049920",
    "2017-10-30",
    "Rafael Espinal public post crediting NYC Artist Coalition and Dance Liberation Network in the Cabaret Law repeal effort, October 30, 2017.",
    "A contemporaneous Council-member account publicly identified the coalition within the repeal effort.",
    ["direct Council-member engagement with @NYCArtC", "coalition participation in Cabaret Law advocacy"],
    ["Jamie's authorship of the post", "sole coalition causality", "official Council endorsement of every coalition campaign"]
  ),
  xSource(
    "SRC-X-NYCARTC-LEVIN-MARCH-2019",
    "Stephen Levin public NYC Artist Coalition MARCH hearing post",
    "https://x.com/StephenLevin33/status/1095020293112979457",
    "2019-02-11",
    "Stephen Levin public post thanking NYC Artist Coalition and venues for testimony about MARCH raids, February 11, 2019.",
    "A contemporaneous Council-member account credited coalition and venue participation after a public hearing.",
    ["direct Council-member engagement with @NYCArtC", "public-hearing participation and testimony"],
    ["Jamie's individual authorship or attendance", "a completed enforcement outcome", "official endorsement"]
  ),
  xSource(
    "SRC-X-NYCARTC-RIVERA-FAIR-RENT-2021",
    "Carlina Rivera public FairRentNYC quote post",
    "https://x.com/CarlinaRivera/status/1438843816732151813",
    "2021-09-17",
    "Carlina Rivera public quote post amplifying an @NYCArtC FairRentNYC message, September 17, 2021.",
    "A contemporaneous Council-member account quote-amplified the coalition's commercial-rent campaign message.",
    ["direct Council-member engagement with @NYCArtC", "FairRentNYC message amplification"],
    ["bill passage", "institutional Council endorsement", "Jamie's authorship of either post"]
  ),
  xSource(
    "SRC-X-NYCARTC-BRANNAN-MARCH-2019",
    "Justin Brannan public Talks Not Raids quote post",
    "https://x.com/JustinBrannan/status/1140698679394938883",
    "2019-06-17",
    "Justin Brannan public quote post amplifying an @NYCArtC Talks Not Raids message, June 17, 2019.",
    "A contemporaneous Council-member account amplified a coalition campaign message about MARCH raids.",
    ["direct Council-member engagement with @NYCArtC", "Talks Not Raids message amplification"],
    ["a completed enforcement outcome", "institutional Council endorsement", "Jamie's authorship"]
  ),
  xSource(
    "SRC-X-NYCARTC-VAN-BRAMER-CULTURE-2020",
    "Jimmy Van Bramer public NYC Artist Coalition cultural-support post",
    "https://x.com/JimmyVanBramer/status/1320792543773282304",
    "2020-10-26",
    "Jimmy Van Bramer public post mentioning NYC Artist Coalition in arts-and-culture support context, October 26, 2020.",
    "A contemporaneous Council-member account directly mentioned the coalition in a mission-relevant public post.",
    ["direct Council-member engagement with @NYCArtC", "arts-and-culture support context"],
    ["institutional Council endorsement", "a specific policy outcome", "Jamie's authorship"]
  ),
  xSource(
    "SRC-X-NYCARTC-MARK-LEVINE-REPLY-2020",
    "Mark Levine public reply to NYC Artist Coalition",
    "https://x.com/MarkLevineNYC/status/1241027587947876352",
    "2020-03-20",
    "Mark Levine public reply to @NYCArtC, March 20, 2020.",
    "This direct reply establishes account-level interaction but is not used as evidence of campaign endorsement or policy traction.",
    ["direct Council-member account interaction with @NYCArtC"],
    ["mission-specific support", "institutional endorsement", "policy outcome", "Jamie's authorship"]
  ),
  xSource(
    "SRC-X-NYCARTC-MADE-IN-NY-TOWN-HALL-2017",
    "Made in NY first Nightlife Town Hall post",
    "https://x.com/MadeinNY/status/918266538616082432",
    "2017-10-11",
    "Made in NY public post stating that the commissioner joined NYC Artist Coalition at the first Nightlife Town Hall, October 11, 2017.",
    "An institutional account publicly connected the coalition with a town hall for the new Office of Nightlife.",
    ["coalition public identity", "Nightlife Town Hall participation", "institutional engagement"],
    ["Jamie's production role", "sole ownership of the event", "attendance totals"]
  ),
  xSource(
    "SRC-X-NYCARTC-OLYMPIA-CONTINUITY-2022",
    "Olympia Kazi public NYC Artist Coalition campaign-continuity post",
    "https://x.com/olympiakazi/status/1516092153893691392",
    "2022-04-18",
    "Olympia Kazi public post connecting NYC Artist Coalition campaign work with the Office of Nightlife report, April 18, 2022.",
    "A publicly identified coalition collaborator continued to use the shared account identity and campaign vocabulary after the account's establishment.",
    ["collaborator stewardship of the coalition identity", "campaign continuity"],
    ["authorship of other account posts", "Jamie's sole ownership", "independent proof of every outcome described"]
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
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.documentjournal.com/2018/02/taking-back-new-york-citys-nightlife/",
    preferredPublicUrl: "canonical",
    publicCitation: "Daisy Prince, 'Taking back New York City's nightlife,' Document Journal, February 27, 2018.",
    publicNote: "The article names and pictures Jamie with NYC Artist Coalition, names Olympia Kazi with NYC Artist Coalition and Let NYC Dance, and describes the broader Cabaret Law repeal and Office of Nightlife movement.",
    supportsGenerally: ["Jamie and Olympia's publicly reported coalition affiliation", "Let NYC Dance movement context", "collective nightlife advocacy"],
    doesNotEstablish: ["Jamie's social-account establishment role", "sole causality for repeal or the Office of Nightlife", "post-level authorship"]
  },
  {
    id: "SRC-NYC-NIGHTLIFE-ADVISORY-REPORT-2021",
    title: "Nightlife Advisory Board Report - Summer 2021",
    organization: "City of New York",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2021-07-20",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://a860-gpp.nyc.gov/concern/file_sets/0z708z64c?locale=en",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Nightlife Advisory Board, Nightlife Advisory Board Report - Summer 2021, preserved by the Government Publications Portal.",
    publicNote: "The government portal preserves the 13-page public report. Claim-level review of its recommendations and acknowledgments remains open.",
    supportsGenerally: ["the report's public existence, date, format, and government preservation"],
    doesNotEstablish: ["Jamie's individual authorship", "the coalition's authorship of every recommendation", "implementation of every recommendation", "post-level social authorship"]
  }
] satisfies SourceRecord[];

export const socialArchiveClaims = [
  {
    id: "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
    project: "career-proof-system",
    internalClaim: "Jamie established public-facing account identities for CallNYC, WOW List, and NYC Artist Coalition; the coalition identity became a durable shared campaign surface used by collaborators over years.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "technical-operations",
        text: "I established public-facing identities for CallNYC, WOW List, and NYC Artist Coalition, including a shared coalition account collaborators used across four campaigns over years.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      },
      {
        key: "archive-note",
        text: "Jamie established the project accounts; account-level and campaign outcomes remain collective, and post-by-post authorship is generally not recoverable.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/intake/2026-07-13-project-social-account-archive-pass"]
      }
    ],
    evidence: [
      { sourceId: "SRC-JAMIE-SOCIAL-IDENTITY-ESTABLISHMENT-2026", relationship: "private-support", supports: ["Jamie's account-establishment role", "shared identity-system intent"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-PROFILE-INVENTORY-2026", relationship: "corroborating", supports: ["CallNYC account existence and historical public use"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-X-NYCARTC-PROFILE-INVENTORY-2026", relationship: "corroborating", supports: ["shared four-campaign identity and long-running public use"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-X-WOWLIST-PROFILE-INVENTORY-2026", relationship: "corroborating", supports: ["WOW List account existence and historical public use"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-X-NYCARTC-OLYMPIA-CONTINUITY-2022", relationship: "corroborating", supports: ["collaborator stewardship and campaign continuity"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Jamie confirms establishing the accounts; public profile evidence corroborates their existence and continuity but not the initial setup action by itself.", "Multiple teammates posted. Do not assign Jamie authorship of an individual team post without post-level evidence.", "Campaign and policy outcomes remain collective."],
    antiClaims: ["Jamie authored every @NYCArtC post", "Jamie solely owned the coalition voice", "Account establishment proves sole credit for campaign outcomes"],
    researchInquiryIds: ["INQ-PROJECT-SOCIAL-POST-AUTHORSHIP"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
    project: "nyc-artist-coalition",
    internalClaim: "Authenticated recovery found direct public interactions from at least six contemporaneous NYC Council-member accounts with @NYCArtC across Cabaret Law repeal, MARCH transparency, arts-and-culture support, and FairRentNYC.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "Authenticated archival review recovered direct public interactions from at least six contemporaneous NYC Council-member accounts with @NYCArtC across Cabaret Law repeal, MARCH transparency, arts-and-culture support, and FairRentNYC.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "technical-operations",
        text: "The shared coalition identity earned direct public interaction from at least six contemporaneous NYC Council-member accounts across multiple campaigns.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [
      { sourceId: "SRC-X-NYCARTC-PROFILE-INVENTORY-2026", relationship: "context", supports: ["authenticated query method", "six-account recovery floor", "four-campaign account identity"], confidence: "moderate", renderCitation: true },
      { sourceId: "SRC-X-NYCARTC-ESPINAL-CABARET-2017", relationship: "direct-support", supports: ["Rafael Espinal interaction"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-LEVIN-MARCH-2019", relationship: "direct-support", supports: ["Stephen Levin interaction"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-RIVERA-FAIR-RENT-2021", relationship: "direct-support", supports: ["Carlina Rivera interaction"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-BRANNAN-MARCH-2019", relationship: "direct-support", supports: ["Justin Brannan interaction"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-VAN-BRAMER-CULTURE-2020", relationship: "direct-support", supports: ["Jimmy Van Bramer interaction"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-MARK-LEVINE-REPLY-2020", relationship: "direct-support", supports: ["Mark Levine account interaction"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["At least six is a recovered minimum, not a complete historical census.", "The count includes direct mentions, replies, or quote amplification; it does not treat tags by @NYCArtC as reciprocal engagement.", "Mark Levine's reply supports account interaction only, not mission-specific endorsement.", "Brad Lander's documented FairRentNYC campaign engagement is retained outside the direct-@NYCArtC count because the recovered wrapper did not itself mention the handle.", "This is individual-account activity, not an official NYC Council endorsement, policy outcome, or proof that Jamie authored the underlying posts."],
    antiClaims: ["Only six Council members engaged", "The NYC Council endorsed NYC Artist Coalition", "Every tagged official engaged", "Jamie authored every coalition post", "Social engagement caused the policy outcomes"],
    researchInquiryIds: ["INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE",
    project: "wowlist",
    internalClaim: "A 2014 WOW List post named Richard and Jamie and described the project as based on Sunday Dinner calendars; a 2015 post thanked a community member for creating a public tutorial about using the platform.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "The project's public timeline named Richard and Jamie and described WOW List as growing from calendars made at Sunday Dinner; a later post thanked a community member for creating a public tutorial showing others how to use the platform.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"]
      }
    ],
    evidence: [
      { sourceId: "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014", relationship: "direct-support", supports: ["publicly named project participants", "Sunday Dinner origin context"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-X-WOWLIST-USER-TUTORIAL-2015", relationship: "direct-support", supports: ["community-created instructional artifact", "public evidence of use"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["The origin post names the collaborator only as Richard; do not infer a surname from this source.", "One community-created tutorial is evidence of use, not proof of broad adoption or satisfaction."],
    antiClaims: ["The social posts prove 35 active city chapters", "Every WOW List user created public documentation", "The tutorial remains available today"],
    researchInquiryIds: ["INQ-X-PROJECT-ACCOUNT-INVENTORY-2026"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const socialArchiveInquiries = [
  {
    id: "INQ-X-PROJECT-ACCOUNT-INVENTORY-2026",
    project: "career-proof-system",
    question: "What public project-account material can be recovered without mistaking an authenticated visible timeline for a complete platform export?",
    methods: ["Used an authenticated read-only browser session to inspect public profiles, visible timelines, live search, and status pages.", "Recovered 106 of 110 visible-profile items for @CallNYCApp and 37 of 38 for @wowlist.", "Sampled @NYCArtC through campaign and public-actor queries because its 5,124-post active profile was not practical to treat as a scrolling export."],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: ["Verified @CallNYCApp, @NYCArtC, and @wowlist as public project accounts.", "Verified that Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC used the shared @NYCArtC identity.", "Recovered 53 #LetNYCDance, 40 #SaveNYCSpaces, 34 #TalksNotRaids, and 27 #FairRentNYC account-authored search results as non-exhaustive floors.", "No verified dedicated account was recovered for the other portfolio projects reviewed in this pass."],
    limitations: ["X search and scrolling are incomplete and can change over time.", "Profile post totals can include items not returned by visible scrolling.", "No account export, analytics dashboard, private messages, or nonpublic engagement data was accessed.", "Reposts by a project account do not establish that the original author endorsed the project."],
    sourceIds: ["SRC-X-CALLNYC-PROFILE-INVENTORY-2026", "SRC-X-NYCARTC-PROFILE-INVENTORY-2026", "SRC-X-WOWLIST-PROFILE-INVENTORY-2026"],
    publicSummary: "An authenticated read-only pass verified three project accounts and recovered bounded public timeline evidence; all counts are documented floors rather than claims of completeness."
  },
  {
    id: "INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026",
    project: "nyc-artist-coalition",
    question: "How many NYC Council-member accounts directly interacted with @NYCArtC, and what mission-relevant patterns are supported by the recovered posts?",
    methods: ["Queried contemporaneous Council-member handles against @NYCArtC in an authenticated live-search session.", "Opened representative status pages and separated direct mention, reply, and quote amplification from one-way tags by the coalition account.", "Checked campaign, date, and officeholding context against public Council and project records."],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: ["Recovered direct interactions from at least six contemporaneous Council-member accounts: Rafael Espinal, Stephen Levin, Carlina Rivera, Justin Brannan, Jimmy Van Bramer, and Mark Levine.", "Five of the six representative interactions are mission-specific; Mark Levine's recovered reply establishes account interaction only.", "The mission-specific pattern spans Cabaret Law repeal, nightlife town halls, MARCH transparency, arts-and-culture support, and FairRentNYC.", "Brad Lander supplied additional FairRentNYC campaign-level engagement but remains outside the direct-handle count under the chosen definition."],
    limitations: ["The six-account count is a recovery floor, not a complete historical census.", "Likes and impressions were not counted because the current public interface does not provide a reliable historical actor-level export.", "Individual-account engagement is not an official Council endorsement or proof of policy causality.", "Team-post authorship generally cannot be attributed from the public interface."],
    sourceIds: ["SRC-X-NYCARTC-PROFILE-INVENTORY-2026", "SRC-X-NYCARTC-ESPINAL-CABARET-2017", "SRC-X-NYCARTC-LEVIN-MARCH-2019", "SRC-X-NYCARTC-RIVERA-FAIR-RENT-2021", "SRC-X-NYCARTC-BRANNAN-MARCH-2019", "SRC-X-NYCARTC-VAN-BRAMER-CULTURE-2020", "SRC-X-NYCARTC-MARK-LEVINE-REPLY-2020"],
    publicSummary: "Authenticated recovery found direct public interactions from at least six contemporaneous NYC Council-member accounts with @NYCArtC; the result is a bounded floor, not an endorsement claim or complete census."
  },
  {
    id: "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP",
    project: "career-proof-system",
    question: "Which project-account posts can be attributed to Jamie or another collaborator rather than to the shared team identity?",
    methods: ["Seek contemporaneous drafts, platform exports, repository links, collaborator confirmation, or explicit signed posts before assigning individual authorship."],
    resultStatus: "open",
    findings: [],
    limitations: ["Public account timelines generally identify the shared account, not the person who composed or published a post.", "Account establishment and system stewardship do not imply post-by-post authorship."],
    sourceIds: []
  }
] satisfies ResearchInquiry[];

export const socialArchivePublicationDecisions = [
  {
    id: "PUB-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
    claimId: "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
    decision: "selected",
    audiences: ["hiring managers", "public-interest technology peers", "future editors"],
    surfaces: ["/work/technical-operations", "docs/knowledge-bank/intake/2026-07-13-project-social-account-archive-pass"],
    rationale: "Makes Jamie's durable public-identity and handoff capability legible while preserving team authorship boundaries.",
    decidedAt: "2026-07-13"
  },
  {
    id: "PUB-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
    claimId: "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
    decision: "selected",
    audiences: ["hiring managers", "public-interest technology peers", "future editors"],
    surfaces: ["/work/fair-rent-nyc", "/work/technical-operations"],
    rationale: "Adds a concrete recovered traction floor across multiple coalition campaigns without converting public interaction into endorsement or causality.",
    decidedAt: "2026-07-13"
  },
  {
    id: "PUB-WOWLIST-PUBLIC-ORIGIN-AND-USE",
    claimId: "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE",
    decision: "selected",
    audiences: ["hiring managers", "public-interest technology peers", "future editors"],
    surfaces: ["/work/wowlist"],
    rationale: "Connects the product to its participatory origin and a concrete community-created instructional artifact without overstating adoption.",
    decidedAt: "2026-07-13"
  }
] satisfies PublicationDecision[];

export const socialArchiveProofCoverage = [
  {
    proofId: "project-social-identity-systems",
    status: "partially-backed",
    sourceIds: ["SRC-X-CALLNYC-PROFILE-INVENTORY-2026", "SRC-X-NYCARTC-PROFILE-INVENTORY-2026", "SRC-X-WOWLIST-PROFILE-INVENTORY-2026", "SRC-X-NYCARTC-OLYMPIA-CONTINUITY-2022"],
    inquiryIds: ["INQ-PROJECT-SOCIAL-POST-AUTHORSHIP"],
    note: "Public profiles establish the identities and continuity; Jamie's protected firsthand confirmation supports establishment, while post-level authorship remains open.",
    reviewedAt: "2026-07-13"
  },
  {
    proofId: "nyc-artist-coalition-social-engagement",
    status: "source-backed",
    sourceIds: ["SRC-X-NYCARTC-PROFILE-INVENTORY-2026", "SRC-X-NYCARTC-ESPINAL-CABARET-2017", "SRC-X-NYCARTC-LEVIN-MARCH-2019", "SRC-X-NYCARTC-RIVERA-FAIR-RENT-2021", "SRC-X-NYCARTC-BRANNAN-MARCH-2019", "SRC-X-NYCARTC-VAN-BRAMER-CULTURE-2020", "SRC-X-NYCARTC-MARK-LEVINE-REPLY-2020"],
    inquiryIds: ["INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026"],
    note: "Six direct public account interactions support a bounded minimum; a continuing inquiry protects against completeness and endorsement inflation.",
    reviewedAt: "2026-07-13"
  }
] satisfies ProofCoverage[];
