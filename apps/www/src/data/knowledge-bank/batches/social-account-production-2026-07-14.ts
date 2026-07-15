import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = ["Jamie Burkart", "Codex authenticated social-media archival review"];

const councilPost = (
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
  organization: "New York City Council member account",
  author,
  kind: "government-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote:
    "The post is treated as a dated public interaction by the historically attributable account, not as a current-office claim or endorsement of every project claim.",
  supportsGenerally,
  doesNotEstablish: [
    "a complete interaction history",
    "a current officeholder relationship",
    "an endorsement of every project claim",
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
  accessedAt: "2026-07-14",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  supportsGenerally,
  doesNotEstablish
});

export const socialAccountProductionBatch20260714: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-SOCIAL-PROJECT-ACCOUNT-INVENTORY-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-14",
      capturedFrom: "Authenticated X archival-production pass",
      publicSafeSummary:
        "Inventory five recovered project accounts and identify bounded evidence of public use, official engagement, documentation, and cross-project continuity.",
      projects: ["portfolio-archive"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-WOWLIST-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-KCTOWNHALL-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-KCSPACES-AUTH-OBSERVATION-2026"
      ],
      claimIds: [
        "CLM-SOCIAL-PROJECT-IDENTITY-SYSTEM",
        "CLM-CALLNYC-COUNCIL-ENGAGEMENT",
        "CLM-NAC-SOCIAL-COUNCIL-ENGAGEMENT",
        "CLM-NAC-SOCIAL-COLLABORATOR-ADOPTION",
        "CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE",
        "CLM-KCTOWNHALL-SOCIAL-DOCUMENTATION",
        "CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION"
      ],
      researchTaskIds: ["TASK-SOCIAL-ACCOUNT-AUTHORSHIP", "TASK-WOWLIST-HANDLE-HISTORY"],
      notes: [
        "Current profile counts are dated observation metadata, not durable accomplishment claims.",
        "No private messages, account settings, follower lists, or non-public account data were inspected or ingested."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "INT-SOCIAL-ACCOUNT-ESTABLISHMENT-RECOLLECTION",
      kind: "recollection",
      capturedAt: "2026-07-14",
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Jamie recalls establishing the project accounts and identity system later used by multiple teammates, including Olympia Kazi.",
      projects: ["portfolio-archive"],
      status: "decomposed",
      disposition: "research-queued",
      sourceIds: ["SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026"],
      claimIds: ["CLM-SOCIAL-PROJECT-IDENTITY-SYSTEM"],
      researchTaskIds: ["TASK-SOCIAL-ACCOUNT-AUTHORSHIP"],
      notes: [
        "The recollection is a meaningful lead. Public account chronology and repository evidence align with infrastructure stewardship, but do not independently prove account creation or authorship of later posts."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-SOCIAL-CALLNYC-AUTH-OBSERVATION-2026",
      title: "Authenticated CallNYC account and interaction observation",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://x.com/CallNYCapp",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Authenticated review of the public @CallNYCapp profile, rendered timeline, and direct-mention search on July 14, 2026.",
      publicNote:
        "The profile reported 110 posts; 106 unique status URLs rendered during the sweep. The Council count is a lower bound over visible public posts, not a complete platform export.",
      supportsGenerally: [
        "the @CallNYCapp project identity",
        "account activity beginning in 2016",
        "eight visible interactions authored by sitting Council member accounts between April 2016 and July 2017"
      ],
      doesNotEstablish: [
        "complete engagement totals",
        "likes, follows, private interactions, deleted posts, or hidden replies",
        "current Council relationships",
        "official City sponsorship"
      ]
    },
    {
      id: "SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026",
      title: "Authenticated NYC Artist Coalition account and mention observation",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://x.com/NYCArtC",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Authenticated review of the public @NYCArtC profile and historical mention searches on July 14, 2026.",
      publicNote:
        "The account reported 5,124 posts and a January 2017 join date. A capped search observation recovered 260 external posts from March 2020-March 2025, plus earlier Council-account results from roster-based searches. Neither set is a complete export.",
      supportsGenerally: [
        "a durable umbrella identity for Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC",
        "visible use by collaborators, partner organizations, and public officials over multiple years",
        "at least four sitting Council member accounts with visible direct engagement from March 2018-October 2020"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the account's posts",
        "a complete engagement corpus",
        "exclusive ownership of the identity",
        "causation of legislation or agency decisions"
      ]
    },
    {
      id: "SRC-SOCIAL-WOWLIST-AUTH-OBSERVATION-2026",
      title: "Authenticated WOW List account observation",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://x.com/wowlist",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Authenticated review of the public @wowlist profile and rendered timeline on July 14, 2026.",
      publicNote:
        "The profile reported 38 posts; 37 unique status URLs rendered. Historical public code and a 2015 post use @wowlistnyc, but a same-account handle migration was not established.",
      supportsGenerally: [
        "the @wowlist project identity",
        "an explicit public lineage from Sunday Dinner calendars to WOW List",
        "organizer use and public support interactions"
      ],
      doesNotEstablish: [
        "complete platform adoption",
        "a proven migration from @wowlistnyc to @wowlist",
        "Jamie's sole authorship of the product or account"
      ]
    },
    {
      id: "SRC-SOCIAL-KCTOWNHALL-AUTH-OBSERVATION-2026",
      title: "Authenticated KC Town Hall account observation",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://x.com/KCTownHall",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Authenticated review of the public @KCTownHall profile and rendered timeline on July 14, 2026.",
      publicNote:
        "The profile reported 183 posts; 170 unique status URLs rendered. Findings describe visible public documentation and dialogue, not a complete record of the project or its outcomes.",
      supportsGenerally: [
        "a stated neighborhood resource and cultural-center purpose",
        "public survey and neighborhood-listening invitations",
        "visible dialogue with Kansas City civic leaders"
      ],
      doesNotEstablish: [
        "a complete stakeholder process",
        "causation of City decisions",
        "project completion or current property status"
      ]
    },
    {
      id: "SRC-SOCIAL-KCSPACES-AUTH-OBSERVATION-2026",
      title: "Authenticated KC Spaces Fund account observation",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://x.com/KCSpacesFund",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Authenticated review of the public @KCSpacesFund profile and rendered timeline on July 14, 2026.",
      publicNote:
        "The profile reported 35 posts; 34 unique status URLs rendered. Eleven visible project-authored posts named funded-space or grantee highlights. This is a lower bound, not a complete grant ledger.",
      supportsGenerally: [
        "public application and fundraising communication",
        "at least eleven visible named grantee or funded-space highlights",
        "public recipient acknowledgments"
      ],
      doesNotEstablish: [
        "that Jamie selected grantees or administered funds",
        "the complete grantee count",
        "Jamie's authorship of campaign posts",
        "permission to publish private applicant or donor records"
      ]
    },
    councilPost(
      "SRC-CALLNYC-COUNCIL-CHIN-2017",
      "Margaret Chin thanks CallNYC",
      "Margaret Chin (@CM_MargaretChin)",
      "2017-07-11",
      "https://x.com/CM_MargaretChin/status/884863588317442049",
      "Council Member Margaret Chin publicly thanked @CallNYCapp for recognizing her constituent-services work on July 11, 2017.",
      ["a direct CallNYC mention", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-CALLNYC-COUNCIL-WILLS-2016",
      "Ruben Wills replies to CallNYC",
      "Ruben Wills (@CM_RubenWills)",
      "2016-05-17",
      "https://x.com/CM_RubenWills/status/732717792097603584",
      "Council Member Ruben Wills publicly replied to @CallNYCapp and @NYCCouncil on May 17, 2016.",
      ["a direct CallNYC reply", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-CALLNYC-COUNCIL-MATTEO-2016",
      "Steven Matteo replies to CallNYC",
      "Steven Matteo (@StevenMatteo)",
      "2016-05-03",
      "https://x.com/StevenMatteo/status/727621921341358081",
      "Council Member Steven Matteo publicly replied to @CallNYCapp about pothole complaints on May 3, 2016.",
      ["a direct CallNYC reply", "a constituent-services topic", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-CALLNYC-COUNCIL-KOO-2016",
      "Peter Koo retransmits CallNYC recognition",
      "Peter Koo (@CMPeterKoo)",
      "2016-04-27",
      "https://x.com/CMPeterKoo/status/725422741160079360",
      "Council Member Peter Koo publicly retransmitted a CallNYC recognition post on April 27, 2016.",
      ["a CallNYC retransmission", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-CALLNYC-COUNCIL-EUGENE-2016",
      "Mathieu Eugene quote-posts CallNYC recognition",
      "Mathieu Eugene (@CMMathieuEugene)",
      "2016-10-04",
      "https://x.com/CMMathieuEugene/status/783305320508514304",
      "Council Member Mathieu Eugene publicly quote-posted a CallNYC recognition and described housing work on October 4, 2016.",
      ["a CallNYC quote post", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-CALLNYC-COUNCIL-ROSENTHAL-2016",
      "Helen Rosenthal links residents to CallNYC",
      "Helen Rosenthal (@HelenRosenthal)",
      "2016-09-27",
      "https://x.com/HelenRosenthal/status/780797474277511170",
      "Council Member Helen Rosenthal publicly linked to CallNYC.org and described Council offices as resident-help resources on September 27, 2016.",
      ["a direct CallNYC link", "resident-facing constituent-services framing", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-CALLNYC-COUNCIL-MENDEZ-2016",
      "Rosie Mendez quote-posts CallNYC recognition",
      "Rosie Mendez (@RosieMendez)",
      "2016-05-19",
      "https://x.com/RosieMendez/status/733410096915550208",
      "Council Member Rosie Mendez publicly quote-posted a CallNYC recognition on May 19, 2016.",
      ["a CallNYC quote post", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-CALLNYC-COUNCIL-RODRIGUEZ-2016",
      "Ydanis Rodriguez quote-posts CallNYC recognition",
      "Ydanis Rodriguez (@ydanis)",
      "2016-05-18",
      "https://x.com/ydanis/status/733089563334299648",
      "Council Member Ydanis Rodriguez publicly quote-posted a CallNYC recognition on May 18, 2016.",
      ["a CallNYC quote post", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-NAC-COUNCIL-ESPINAL-TOWN-HALL-2018",
      "Rafael Espinal describes NYC Artist Coalition nightlife town hall",
      "Rafael Espinal (@RLEspinal)",
      "2018-03-27",
      "https://x.com/RLEspinal/status/978604809493336065",
      "Council Member Rafael Espinal publicly described welcoming the Nightlife Mayor with @NYCArtC after a Bushwick venue tour and panel on March 27, 2018.",
      ["direct work with NYC Artist Coalition", "nightlife town-hall context", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-NAC-COUNCIL-ESPINAL-TNR-2019",
      "Rafael Espinal thanks NYC Artist Coalition",
      "Rafael Espinal (@RLEspinal)",
      "2019-02-21",
      "https://x.com/RLEspinal/status/1098626837821997056",
      "Council Member Rafael Espinal publicly thanked @NYCArtC and said he was proud to work with the coalition on Save NYC Spaces and Talks Not Raids on February 21, 2019.",
      ["direct coalition credit", "Save NYC Spaces", "Talks Not Raids", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-NAC-COUNCIL-LEVIN-HEARING-2019",
      "Stephen Levin amplifies Talks Not Raids hearing",
      "Stephen Levin (@StephenLevin33)",
      "2019-02-06",
      "https://x.com/StephenLevin33/status/1093220593317629952",
      "Council Member Stephen Levin publicly quote-posted @NYCArtC's call for a Council hearing on MARCH accountability on February 6, 2019.",
      ["direct campaign amplification", "Talks Not Raids", "Council-hearing context", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-NAC-COUNCIL-LEVIN-TESTIMONY-2019",
      "Stephen Levin thanks NYC Artist Coalition after MARCH testimony",
      "Stephen Levin (@StephenLevin33)",
      "2019-02-11",
      "https://x.com/StephenLevin33/status/1095020293112979457",
      "Council Member Stephen Levin publicly thanked @NYCArtC and participating venues for MARCH testimony on February 11, 2019.",
      ["direct coalition credit", "venue testimony", "Talks Not Raids", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-NAC-COUNCIL-LEVIN-FAIRRENT-2020",
      "Stephen Levin invites the public to NYC Artist Coalition commercial-rent event",
      "Stephen Levin (@StephenLevin33)",
      "2020-12-09",
      "https://x.com/StephenLevin33/status/1336765371773173761",
      "Council Member Stephen Levin publicly invited residents to an @NYCArtC event on saving small businesses and commercial rent stabilization on December 9, 2020.",
      ["direct event amplification", "commercial-rent advocacy", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-NAC-COUNCIL-VANBRAMER-2020",
      "Jimmy Van Bramer includes NYC Artist Coalition in arts advocacy",
      "Jimmy Van Bramer (@JimmyVanBramer)",
      "2020-10-26",
      "https://x.com/JimmyVanBramer/status/1320792543773282304",
      "Council Member Jimmy Van Bramer publicly included @NYCArtC in a call to prioritize performing artists and culture on October 26, 2020.",
      ["direct coalition mention", "arts and culture advocacy", "historically attributable Council-member engagement"]
    ),
    councilPost(
      "SRC-NAC-COUNCIL-LEVINE-2020",
      "Mark Levine replies to NYC Artist Coalition",
      "Mark Levine (@MarkLevineNYC)",
      "2020-03-20",
      "https://x.com/MarkLevineNYC/status/1241027587947876352",
      "Council Member Mark Levine publicly replied to @NYCArtC on March 20, 2020.",
      ["a direct NYC Artist Coalition reply", "historically attributable Council-member engagement"]
    ),
    institutionalPost(
      "SRC-NAC-OLYMPIA-KAZI-RELIEF-2020",
      "Olympia Kazi describes NYC Artist Coalition relief advocacy",
      "Olympia Kazi (@olympiakazi)",
      "2020-03-26",
      "https://x.com/olympiakazi/status/1243375751149346819",
      "Olympia Kazi publicly described NYC Artist Coalition sending a COVID relief request on behalf of musicians, DJs, and grassroots venues on March 26, 2020.",
      ["collaborator use of the NYC Artist Coalition identity", "COVID relief advocacy", "constituency framing"],
      ["Jamie's authorship of the post", "sole authorship of the relief request", "government adoption"]
    ),
    institutionalPost(
      "SRC-NAC-WONDERVILLE-2020",
      "Wonderville amplifies NYC Artist Coalition tenant Q&A",
      "Wonderville (@wondervillenyc)",
      "2020-03-29",
      "https://x.com/wondervillenyc/status/1244306887845335041",
      "Wonderville publicly called NYC Artist Coalition good friends and amplified a tenant question-and-answer event on March 29, 2020.",
      ["partner adoption of the NYC Artist Coalition identity", "event amplification"],
      ["Jamie's authorship of the event", "a complete partner roster"]
    ),
    institutionalPost(
      "SRC-NAC-BUILD-UP-JUSTICE-2020",
      "Build Up Justice thanks attorneys for NYC Artist Coalition session",
      "Build Up Justice (@BUJ_NYC)",
      "2020-03-30",
      "https://x.com/BUJ_NYC/status/1244724746178179073",
      "Build Up Justice publicly thanked attorneys for speaking with NYC Artist Coalition on March 30, 2020.",
      ["partner use of the NYC Artist Coalition identity", "professional resource coordination"],
      ["Jamie's authorship of the session", "a complete partner roster"]
    ),
    institutionalPost(
      "SRC-WOWLIST-ORIGIN-2014",
      "WOW List account names Sunday Dinner calendar origin",
      "WOW List (@wowlist)",
      "2014-02-12",
      "https://x.com/wowlist/status/433671630837919744",
      "The earliest visible @wowlist post says Richard and Jamie were building a project based on calendars made at Sunday Dinner.",
      ["a public Sunday Dinner-to-WOW List lineage", "Jamie and Richard as builders"],
      ["sole authorship", "the complete product history"]
    ),
    institutionalPost(
      "SRC-WOWLIST-NYCDIY-LINEAGE-2016",
      "WOW List describes NYCdiy and Sunday Dinner lineage",
      "WOW List (@wowlist)",
      "2016-09-01",
      "https://x.com/wowlist/status/771457416298921985",
      "WOW List publicly described NYCdiy as running on WOW List, a DIY community-calendar project from the Sunday Dinner potluck.",
      ["the Sunday Dinner lineage", "a public organizer-facing deployment"],
      ["complete adoption across all communities", "sole authorship"]
    ),
    institutionalPost(
      "SRC-WOWLIST-ORGANIZER-USE-2015",
      "Organizer publicly reports adding shows to WOW List",
      "Punks Criminals (@punkscriminals)",
      "2015-05-29",
      "https://x.com/punkscriminals/status/604360847012413440",
      "A public organizer account reported adding shows to @wowlistnyc and linked to a WOW List page on May 29, 2015.",
      ["public organizer use", "historical @wowlistnyc labeling"],
      ["a proven handle migration", "the complete organizer population"]
    ),
    institutionalPost(
      "SRC-KCTOWNHALL-MISSION-2018",
      "KC Town Hall account states neighborhood resource mission",
      "KC Town Hall (@KCTownHall)",
      "2018-07-03",
      "https://x.com/KCTownHall/status/1013893135695601665",
      "KC Town Hall publicly described an effort to restore a permanent neighborhood resource and cultural center on July 3, 2018.",
      ["public project purpose", "neighborhood-resource framing"],
      ["project completion", "current property status", "sole authorship"]
    ),
    institutionalPost(
      "SRC-KCTOWNHALL-SURVEY-2018",
      "KC Town Hall invites neighborhood survey participation",
      "KC Town Hall (@KCTownHall)",
      "2018-07-03",
      "https://x.com/KCTownHall/status/1013903289392517120",
      "KC Town Hall publicly invited neighborhood participation through a survey on July 3, 2018.",
      ["a public listening invitation", "resident-facing participation infrastructure"],
      ["survey response count", "representativeness", "policy outcome"]
    ),
    institutionalPost(
      "SRC-KCSPACES-APPLICATION-2020",
      "KC Spaces Fund announces rolling relief applications",
      "KC Spaces Fund (@KCSpacesFund)",
      "2020-04-14",
      "https://x.com/KCSpacesFund/status/1250217081552986112",
      "KC Spaces Fund publicly promoted rolling emergency-relief applications for grants up to $500 on April 14, 2020.",
      ["public application communication", "grant ceiling", "rolling distribution framing"],
      ["Jamie's role in grant decisions", "complete award outcomes"]
    ),
    institutionalPost(
      "SRC-KCSPACES-RECIPIENT-THANKS-2020",
      "AY Young publicly thanks KC Spaces Fund",
      "AY Young (@aymusik)",
      "2020-04-20",
      "https://x.com/aymusik/status/1252310163119276033",
      "AY Young publicly thanked KC Spaces Fund for support on April 20, 2020.",
      ["a public recipient acknowledgment", "campaign reach"],
      ["the complete recipient roster", "Jamie's role in selection or disbursement"]
    )
  ],
  sourceAssertions: [
    {
      id: "AST-CALLNYC-EIGHT-COUNCIL-ACCOUNTS",
      sourceId: "SRC-SOCIAL-CALLNYC-AUTH-OBSERVATION-2026",
      project: "callnyc",
      assertion:
        "A defined authenticated observation recovered visible direct engagement by at least eight historically attributable sitting Council member accounts between April 2016 and July 2017.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-CALLNYC-LOWER-BOUND",
      sourceId: "SRC-SOCIAL-CALLNYC-AUTH-OBSERVATION-2026",
      project: "callnyc",
      assertion:
        "The eight-account result excludes likes, follows, private interactions, hidden replies, deleted posts, and later officeholders who were not Council members at interaction time.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    ...[
      ["CHIN", "SRC-CALLNYC-COUNCIL-CHIN-2017", "Margaret Chin publicly thanked CallNYC for recognizing her constituent-services work."],
      ["WILLS", "SRC-CALLNYC-COUNCIL-WILLS-2016", "Ruben Wills publicly replied to CallNYC and the New York City Council."],
      ["MATTEO", "SRC-CALLNYC-COUNCIL-MATTEO-2016", "Steven Matteo publicly replied to CallNYC about a constituent-services topic."],
      ["KOO", "SRC-CALLNYC-COUNCIL-KOO-2016", "Peter Koo publicly retransmitted CallNYC recognition."],
      ["EUGENE", "SRC-CALLNYC-COUNCIL-EUGENE-2016", "Mathieu Eugene publicly quote-posted CallNYC recognition and described housing work."],
      ["ROSENTHAL", "SRC-CALLNYC-COUNCIL-ROSENTHAL-2016", "Helen Rosenthal publicly linked residents to CallNYC.org and Council offices."],
      ["MENDEZ", "SRC-CALLNYC-COUNCIL-MENDEZ-2016", "Rosie Mendez publicly quote-posted CallNYC recognition."],
      ["RODRIGUEZ", "SRC-CALLNYC-COUNCIL-RODRIGUEZ-2016", "Ydanis Rodriguez publicly quote-posted CallNYC recognition."]
    ].map(([suffix, sourceId, assertion]) => ({
      id: `AST-CALLNYC-COUNCIL-${suffix}`,
      sourceId,
      project: "callnyc",
      assertion,
      relationship: "supports" as const,
      confidence: "high" as const,
      candidateClaimIds: ["CLM-CALLNYC-COUNCIL-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    })),
    {
      id: "AST-NAC-FOUR-COUNCIL-ACCOUNTS",
      sourceId: "SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026",
      project: "nyc-artist-coalition",
      assertion:
        "Roster-based authenticated searches recovered visible direct engagement by at least four sitting Council member accounts from March 2018 through October 2020.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-SOCIAL-COUNCIL-ENGAGEMENT"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-NAC-COLLABORATOR-ADOPTION",
      sourceId: "SRC-NAC-OLYMPIA-KAZI-RELIEF-2020",
      project: "nyc-artist-coalition",
      assertion:
        "Olympia Kazi publicly used the NYC Artist Coalition identity to frame relief advocacy for musicians, DJs, and grassroots venues.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-NAC-SOCIAL-COLLABORATOR-ADOPTION"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-SOCIAL-ACCOUNT-AUTHORSHIP-BOUNDARY",
      sourceId: "SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026",
      project: "portfolio-archive",
      assertion:
        "Public account chronology and project repositories do not identify the creator or author of each post; Jamie's establishment recollection requires corroboration before public projection.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-SOCIAL-PROJECT-IDENTITY-SYSTEM"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-SUNDAY-DINNER-LINEAGE",
      sourceId: "SRC-WOWLIST-ORIGIN-2014",
      project: "wowlist",
      assertion:
        "A contemporaneous project post explicitly describes WOW List as growing from calendars made at Sunday Dinner and names Jamie and Richard as builders.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-ACCOUNT-OBSERVATION",
      sourceId: "SRC-SOCIAL-WOWLIST-AUTH-OBSERVATION-2026",
      project: "wowlist",
      assertion:
        "The authenticated account observation recovered 37 of 38 profile-reported posts and preserved the unresolved historical @wowlistnyc label as a research question.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-KCTOWNHALL-SOCIAL-DOCUMENTATION",
      sourceId: "SRC-KCTOWNHALL-SURVEY-2018",
      project: "kc-town-hall",
      assertion:
        "The project account functioned as a public participation surface by inviting neighborhood survey responses alongside mission and process documentation.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTOWNHALL-SOCIAL-DOCUMENTATION"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-KCTOWNHALL-ACCOUNT-OBSERVATION",
      sourceId: "SRC-SOCIAL-KCTOWNHALL-AUTH-OBSERVATION-2026",
      project: "kc-town-hall",
      assertion:
        "The authenticated account observation recovered 170 of 183 profile-reported posts and bounds the inventory as incomplete public documentation rather than a complete project record.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTOWNHALL-SOCIAL-DOCUMENTATION"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "AST-KCSPACES-ELEVEN-HIGHLIGHTS",
      sourceId: "SRC-SOCIAL-KCSPACES-AUTH-OBSERVATION-2026",
      project: "kc-spaces-fund",
      assertion:
        "The rendered timeline contains at least eleven visible project-authored posts naming grantee or funded-space highlights.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-NAC-SOCIAL-COUNCIL-ENGAGEMENT",
      project: "nyc-artist-coalition",
      internalClaim:
        "Authenticated roster-based searches recovered visible direct engagement with @NYCArtC by at least four sitting NYC Council member accounts between March 2018 and October 2020: Rafael Espinal, Stephen Levin, Mark Levine, and Jimmy Van Bramer.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "The coalition identity became usable civic infrastructure: at least four sitting NYC Council member accounts visibly engaged with @NYCArtC from 2018 through 2020, including posts about the nightlife town hall, Talks Not Raids testimony, arts advocacy, and commercial-rent work.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        { sourceId: "SRC-NAC-COUNCIL-ESPINAL-TOWN-HALL-2018", relationship: "direct-support", supports: ["Rafael Espinal engagement", "nightlife town hall"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NAC-COUNCIL-LEVIN-HEARING-2019", relationship: "direct-support", supports: ["Stephen Levin engagement", "Talks Not Raids hearing"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NAC-COUNCIL-LEVINE-2020", relationship: "direct-support", supports: ["Mark Levine engagement"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NAC-COUNCIL-VANBRAMER-2020", relationship: "direct-support", supports: ["Jimmy Van Bramer engagement", "arts advocacy"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026", relationship: "supports-boundary", supports: ["search method", "lower-bound limits"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "This is a lower bound over visible posts, not a complete engagement total.",
        "Credit belongs to the coalition and account contributors; the result does not identify Jamie as author of the account's posts."
      ],
      antiClaims: [
        "Jamie personally authored every NYC Artist Coalition post",
        "Four is the complete number of Council members who engaged",
        "Social engagement proves policy causation"
      ],
      researchInquiryIds: ["INQ-SOCIAL-PROJECT-ACCOUNT-PRODUCTION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-NAC-SOCIAL-COLLABORATOR-ADOPTION",
      project: "nyc-artist-coalition",
      internalClaim:
        "Public posts show Olympia Kazi and partner organizations using the NYC Artist Coalition identity for relief advocacy, public events, and professional-resource coordination in 2020.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The public identity remained useful in collaborators' hands: Olympia Kazi and partner organizations used @NYCArtC to coordinate relief advocacy, public events, and professional resources.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
        }
      ],
      evidence: [
        { sourceId: "SRC-NAC-OLYMPIA-KAZI-RELIEF-2020", relationship: "direct-support", supports: ["Olympia Kazi's public use", "relief advocacy"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NAC-WONDERVILLE-2020", relationship: "corroborating", supports: ["partner event amplification"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NAC-BUILD-UP-JUSTICE-2020", relationship: "corroborating", supports: ["professional resource coordination"], confidence: "high", renderCitation: true }
      ],
      boundaries: [
        "The posts establish public adoption and use, not who created the account, authored every campaign artifact, or controlled account access."
      ],
      antiClaims: ["Jamie authored Olympia Kazi's posts", "The identity belonged to Jamie alone"],
      researchInquiryIds: ["INQ-SOCIAL-PROJECT-ACCOUNT-PRODUCTION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-SOCIAL-PROJECT-IDENTITY-SYSTEM",
      project: "portfolio-archive",
      internalClaim:
        "Jamie recalls establishing project social accounts and a public identity system that teammates later used over multiple years; public chronology supports durable shared use, while account-creation and administrator evidence remains unrecovered.",
      status: "use-with-care",
      maturity: "partially-supported",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Research lead: Jamie recalls establishing project accounts and an identity system designed for shared stewardship; public traces confirm durable shared use, while creation and administrator records remain to be corroborated.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        { sourceId: "SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026", relationship: "context", supports: ["long-lived shared public identity"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-NAC-OLYMPIA-KAZI-RELIEF-2020", relationship: "corroborating", supports: ["collaborator use of the identity"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "Treat Jamie's account-establishment statement as a first-person recollection until creation records or collaborator corroboration are recovered.",
        "Do not attribute the accounts' complete posting history to Jamie."
      ],
      antiClaims: ["Jamie authored every project-account post", "Jamie exclusively controlled the coalition identity"],
      researchInquiryIds: ["INQ-SOCIAL-PROJECT-ACCOUNT-PRODUCTION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE",
      project: "wowlist",
      internalClaim:
        "Contemporaneous posts identify WOW List as a project built by Jamie and Richard from calendars made at Sunday Dinner and document public organizer use.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "WOW List grew from calendars made at Sunday Dinner. Contemporaneous posts name Jamie and Richard as builders, connect the platform to the potluck's community practice, and show organizers using it to publish events.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist", "/work/196-sunday-dinner"]
        }
      ],
      evidence: [
        { sourceId: "SRC-WOWLIST-ORIGIN-2014", relationship: "direct-support", supports: ["Sunday Dinner origin", "Jamie and Richard as builders"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-WOWLIST-NYCDIY-LINEAGE-2016", relationship: "corroborating", supports: ["Sunday Dinner lineage", "NYCdiy deployment"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-WOWLIST-ORGANIZER-USE-2015", relationship: "corroborating", supports: ["public organizer use"], confidence: "high", renderCitation: true }
      ],
      boundaries: [
        "Credit Richard and other WOW List collaborators; the posts do not establish complete authorship or adoption totals.",
        "Treat @wowlistnyc as a historical label until a handle-migration bridge is recovered."
      ],
      antiClaims: ["Jamie built WOW List alone", "Every Sunday Dinner participant used WOW List", "@wowlistnyc is proven to be the same account as @wowlist"],
      researchInquiryIds: ["INQ-SOCIAL-PROJECT-ACCOUNT-PRODUCTION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-KCTOWNHALL-SOCIAL-DOCUMENTATION",
      project: "kc-town-hall",
      internalClaim:
        "The KC Town Hall account documented the project's neighborhood-resource purpose and invited public participation through a survey and civic dialogue.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "KC Town Hall used its public account as a documentation and listening surface, stating the neighborhood-resource purpose and inviting survey participation.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/social-account-inventory"]
        }
      ],
      evidence: [
        { sourceId: "SRC-KCTOWNHALL-MISSION-2018", relationship: "direct-support", supports: ["public project purpose"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KCTOWNHALL-SURVEY-2018", relationship: "direct-support", supports: ["public participation invitation"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-SOCIAL-KCTOWNHALL-AUTH-OBSERVATION-2026", relationship: "supports-boundary", supports: ["observation scope and missingness"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Do not infer survey participation totals, representativeness, policy causation, project completion, or current property status."],
      antiClaims: ["Every stakeholder participated", "The account proves a completed redevelopment"],
      researchInquiryIds: ["INQ-SOCIAL-PROJECT-ACCOUNT-PRODUCTION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    },
    {
      id: "CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION",
      project: "kc-spaces-fund",
      internalClaim:
        "The visible KC Spaces Fund timeline contains at least eleven project-authored posts naming grantee or funded-space highlights and public recipient acknowledgments.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The KC Spaces Fund account publicly documented applications, recipient acknowledgments, and at least eleven visible named grantee or funded-space highlights.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/social-account-inventory"]
        }
      ],
      evidence: [
        { sourceId: "SRC-SOCIAL-KCSPACES-AUTH-OBSERVATION-2026", relationship: "direct-support", supports: ["eleven visible highlights", "observation limits"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KCSPACES-APPLICATION-2020", relationship: "corroborating", supports: ["public applications", "grant ceiling", "rolling distribution"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KCSPACES-RECIPIENT-THANKS-2020", relationship: "corroborating", supports: ["public recipient acknowledgment"], confidence: "high", renderCitation: true }
      ],
      boundaries: [
        "This is a lower bound over visible posts, not a grant ledger.",
        "The evidence does not establish that Jamie selected grantees, administered funds, or authored campaign posts; public organizer credit remains with the campaign's named organizers."
      ],
      antiClaims: ["Jamie selected the grantees", "Eleven was the complete grantee count", "Jamie authored every post"],
      researchInquiryIds: ["INQ-SOCIAL-PROJECT-ACCOUNT-PRODUCTION-2026"],
      reviewedAt: "2026-07-14",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-SOCIAL-ACCOUNT-AUTHORSHIP",
      project: "portfolio-archive",
      question:
        "What creation, administrator, collaborator, or contemporaneous project records can corroborate Jamie's role establishing and stewarding the project accounts without attributing collective posting to him?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Review public repository setup records and historically safe account metadata",
        "Request bounded collaborator corroboration",
        "Separate account creation, identity design, administrator access, strategy, and individual post authorship"
      ],
      successCriteria: [
        "Corroborate or narrow the establishment role",
        "Preserve shared authorship and collaborator credit",
        "Keep account-access and private message data outside the public repository"
      ],
      sourceIds: ["SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026"],
      claimIds: ["CLM-SOCIAL-PROJECT-IDENTITY-SYSTEM"],
      publicSummary:
        "Corroborate Jamie's remembered account-establishment role while keeping later posting and coalition identity collective.",
      reviewedAt: "2026-07-14"
    },
    {
      id: "TASK-WOWLIST-HANDLE-HISTORY",
      project: "wowlist",
      question:
        "Was @wowlistnyc a prior handle for @wowlist, a separate account, or only a historical label used by project surfaces?",
      priority: "low",
      status: "queued",
      methodsPlanned: ["Search archived profile captures", "Review public repository configuration history", "Look for a dated public redirect or handle-change announcement"],
      successCriteria: ["Recover a public bridge or preserve the handles as unresolved", "Do not infer identity from matching project language alone"],
      sourceIds: ["SRC-SOCIAL-WOWLIST-AUTH-OBSERVATION-2026", "SRC-WOWLIST-ORGANIZER-USE-2015"],
      claimIds: ["CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE"],
      publicSummary: "Resolve or preserve uncertainty around the historical @wowlistnyc label.",
      reviewedAt: "2026-07-14"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-SOCIAL-PROJECT-ACCOUNT-PRODUCTION-2026",
      project: "portfolio-archive",
      question:
        "What public-safe evidence of project identity, public use, official engagement, collaborator adoption, and mission-relevant traction can authenticated project-account timelines establish?",
      methods: [
        "Used an authenticated in-app browser session and verified the signed-in account before observation.",
        "Inventoried recovered project profiles and scrolled rendered timelines while deduplicating canonical status URLs.",
        "Searched direct mentions and a dated NYC Council handle roster, then inspected each counted interaction.",
        "Separated current profile metadata, visible post-level evidence, lower-bound findings, and unresolved authorship questions."
      ],
      runAt: "2026-07-14",
      resultStatus: "partially-recovered",
      findings: [
        "Five dedicated project accounts were recovered: @CallNYCapp, @NYCArtC, @wowlist, @KCTownHall, and @KCSpacesFund.",
        "At least eight sitting NYC Council member accounts visibly engaged with @CallNYCapp from April 2016-July 2017 under the defined direct-interaction rule.",
        "At least four sitting NYC Council member accounts visibly engaged with @NYCArtC from March 2018-October 2020; several posts directly connected the identity to a nightlife town hall, Talks Not Raids, arts advocacy, and commercial-rent work.",
        "Olympia Kazi and partner organizations publicly used the NYC Artist Coalition identity for relief advocacy, events, and professional resources.",
        "WOW List posts explicitly connect the product to Sunday Dinner calendars and show organizer use.",
        "KC Town Hall used its account as a public mission, listening, and documentation surface; KC Spaces Fund visibly documented applications, recipient thanks, and at least eleven named grantee or funded-space highlights."
      ],
      limitations: [
        "X search and rendered timelines are capped and omit deleted, hidden, private, or otherwise unavailable material.",
        "Likes, follows, private messages, account analytics, and private account settings were not inspected or counted.",
        "Current profile counts are unstable snapshots and should not be used as durable accomplishment claims.",
        "Visible account output does not identify Jamie or any one teammate as author of each post.",
        "No dedicated Harry J. Epstein or 196/Sunday Dinner account was recovered in this pass; not recovered is not proof that none existed."
      ],
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-NYCARTC-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-WOWLIST-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-KCTOWNHALL-AUTH-OBSERVATION-2026",
        "SRC-SOCIAL-KCSPACES-AUTH-OBSERVATION-2026"
      ],
      publicSummary:
        "An authenticated July 2026 observation recovered five project accounts and bounded evidence of Council engagement, collaborator adoption, organizer use, public listening, and campaign outcome documentation while preserving platform missingness and shared authorship."
    }
  ],
  pages: [
    {
      id: "wowlist",
      surface: "/work/wowlist",
      sourceOrder: ["SRC-WOWLIST-ORIGIN-2014", "SRC-WOWLIST-NYCDIY-LINEAGE-2016", "SRC-WOWLIST-ORGANIZER-USE-2015"],
      occurrences: [
        {
          id: "sunday-dinner-lineage",
          claimId: "CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE",
          projection: "case-study",
          sourceIds: ["SRC-WOWLIST-ORIGIN-2014", "SRC-WOWLIST-NYCDIY-LINEAGE-2016", "SRC-WOWLIST-ORGANIZER-USE-2015"]
        }
      ]
    },
    {
      id: "196-sunday-dinner",
      surface: "/work/196-sunday-dinner",
      sourceOrder: ["SRC-WOWLIST-ORIGIN-2014", "SRC-WOWLIST-NYCDIY-LINEAGE-2016"],
      occurrences: [
        {
          id: "wowlist-lineage",
          claimId: "CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE",
          projection: "case-study",
          sourceIds: ["SRC-WOWLIST-ORIGIN-2014", "SRC-WOWLIST-NYCDIY-LINEAGE-2016"]
        }
      ]
    }
  ]
};
