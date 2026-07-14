const reviewedAt = "2026-07-14";

const callnycCouncilPostIds = [
  "SRC-X-CALLNYC-PETER-KOO-2016-04-27",
  "SRC-X-CALLNYC-STEVEN-MATTEO-2016-05-03",
  "SRC-X-CALLNYC-RUBEN-WILLS-2016-05-17",
  "SRC-X-CALLNYC-YDANIS-RODRIGUEZ-2016-05-18",
  "SRC-X-CALLNYC-ROSIE-MENDEZ-2016-05-19",
  "SRC-X-CALLNYC-HELEN-ROSENTHAL-2016-09-27",
  "SRC-X-CALLNYC-MATHIEU-EUGENE-2016-10-04",
  "SRC-X-CALLNYC-MARGARET-CHIN-2017-07-11"
];

const nycacCouncilPostIds = [
  "SRC-X-NYCAC-RAFAEL-ESPINAL-2019-02-21",
  "SRC-X-NYCAC-STEPHEN-LEVIN-2019-02-11",
  "SRC-X-NYCAC-JUSTIN-BRANNAN-2019-08-30",
  "SRC-X-NYCAC-JIMMY-VAN-BRAMER-2020-10-26",
  "SRC-X-NYCAC-BRAD-LANDER-2021-01-28"
];

export const socialMediaArchiveProduction = {
  inventory: {
    performedAt: reviewedAt,
    authenticatedSurface: "X web interface in Jamie Burkart's authenticated in-app browser session",
    accounts: [
      { project: "callnyc", handle: "@CallNYCapp", profilePosts: 110, recoveredStatuses: 107, recoveredAuthoredPosts: 92 },
      { project: "nyc-artist-coalition", handle: "@NYCArtC", profilePosts: 5124, recoveredStatuses: 1026, recoveredAuthoredPosts: 342, unresolvedPopulationSlots: 4098 },
      { project: "wowlist", handle: "@wowlist", profilePosts: 38, recoveredStatuses: 38, recoveredAuthoredPosts: 22 },
      { project: "kc-spaces-fund", handle: "@KCSpacesFund", profilePosts: 35, recoveredStatuses: 34, recoveredAuthoredPosts: 27 },
      { project: "kc-town-hall", handle: "@KCTownHall", profilePosts: 183, recoveredStatuses: 183, recoveredAuthoredPosts: 155 }
    ],
    callnycCouncilMemberCount: 8,
    nycacCouncilMemberFloor: 5,
    callnycCouncilPostIds,
    nycacCouncilPostIds,
    excludedHandles: ["@fairrentnyc", "@sundaydinnernyc"],
    selectedPublicClaimIds: [
      "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT",
      "CLM-KCTH-SOCIAL-SERVICE-REPORTING"
    ]
  },

  intakeItems: [
    {
      id: "INTAKE-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026-07-14",
      kind: "public-artifact",
      title: "Authenticated project-account inventory on X",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated-browser review",
      projectIds: ["callnyc", "nyc-artist-coalition", "wowlist", "kc-spaces-fund", "kc-town-hall"],
      reason: "Preserve social accounts as public project-identity, engagement, documentation, and service-routing surfaces.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-X-PROFILE-CALLNYCAPP",
        "SRC-X-PROFILE-NYCARTC",
        "SRC-X-PROFILE-WOWLIST",
        "SRC-X-PROFILE-KCSPACESFUND",
        "SRC-X-PROFILE-KCTOWNHALL",
        "SRC-X-AUDIT-PROJECT-ACCOUNTS-2026-07-14"
      ],
      observationIds: [
        "OBS-X-PROFILE-CALLNYCAPP",
        "OBS-X-PROFILE-NYCARTC",
        "OBS-X-PROFILE-WOWLIST",
        "OBS-X-PROFILE-KCSPACESFUND",
        "OBS-X-PROFILE-KCTOWNHALL",
        "OBS-X-NYCAC-SHARED-CAMPAIGN-IDENTITY"
      ],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      boundaries: [
        "Profile post totals and follower counts are accessed-at snapshots, not stable lifetime metrics.",
        "The authenticated timeline pass is non-exhaustive and cannot recover deleted, private, search-suppressed, or otherwise unavailable activity.",
        "An account's public output is collective unless individual post authorship is independently established."
      ]
    },
    {
      id: "INTAKE-NYCAC-X-ENGAGEMENT-AUDIT-2026-07-14",
      kind: "public-artifact",
      title: "NYC Artist Coalition Council-account engagement audit",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated-browser review",
      projectIds: ["nyc-artist-coalition", "talks-not-raids", "fair-rent-nyc"],
      reason: "Test whether the coalition's public identity produced recoverable mission-relevant engagement by sitting Council members.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-X-AUDIT-NYCAC-ENGAGEMENT-2026-07-14",
        "SRC-NYC-OPEN-DATA-COUNCIL-MEMBERS-1999-2025",
        ...nycacCouncilPostIds
      ],
      observationIds: [
        "OBS-X-NYCAC-COUNCIL-ENGAGEMENT-FLOOR",
        "OBS-X-NYCAC-OLYMPIA-COLLABORATION"
      ],
      researchInquiryIds: [
        "INQ-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT",
        "INQ-PROJECT-SOCIAL-ACCOUNT-AUTHORSHIP"
      ],
      boundaries: [
        "The result is a floor from recovered authored posts, not a total lifetime engagement count.",
        "Project tagging of an elected official is not counted as engagement by that official.",
        "Posts authored before election or after leaving office are excluded from the sitting-member count.",
        "The archive does not identify which teammate authored an individual @NYCArtC post."
      ]
    },
    {
      id: "INTAKE-WOWLIST-X-ARCHIVE-2026-07-14",
      kind: "public-artifact",
      title: "WOW List public timeline inventory",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated-browser review",
      projectIds: ["wowlist", "sunday-dinner"],
      reason: "Recover public evidence connecting the account to project origin, event distribution, and community-calendar practice.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-X-PROFILE-WOWLIST", "SRC-X-WOWLIST-PROJECT-ORIGIN-2014-02-12", "SRC-X-WOWLIST-ALLIED-MEDIA-2015-04-22"],
      observationIds: ["OBS-X-WOWLIST-PROJECT-ORIGIN", "OBS-X-WOWLIST-PUBLIC-DISTRIBUTION"],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      boundaries: [
        "The posts document public language and distribution activity, not complete product adoption or audience scale.",
        "Richard, Sunday Dinner participants, calendar members, and other collaborators retain collective credit."
      ]
    },
    {
      id: "INTAKE-KCSPACES-X-ARCHIVE-2026-07-14",
      kind: "public-artifact",
      title: "KC Spaces Fund public timeline inventory",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated-browser review",
      projectIds: ["kc-spaces-fund"],
      reason: "Preserve the campaign account's public application routing, named grantee reporting, partner amplification, and recipient response.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-X-PROFILE-KCSPACESFUND", "SRC-X-KCSPACES-FIRST-ROUND-2020-04-18", "SRC-X-KCSPACES-LATINO-ARTS-THANKS-2020-04-18", "SRC-X-KCSPACES-DOGOOD-2020-04-21"],
      observationIds: ["OBS-X-KCSPACES-PUBLIC-GRANTEE-REPORTING"],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      boundaries: [
        "Project-account grant announcements are public self-reporting, not an independent payment ledger.",
        "Do not expose applicant, grantee, donor, subscriber, payment, credential, or private correspondence records.",
        "Jamie's documented role remains behind-the-scenes digital infrastructure, not public organizer or grant decision-maker."
      ]
    },
    {
      id: "INTAKE-KCTH-X-ARCHIVE-2026-07-14",
      kind: "public-artifact",
      title: "KC Town Hall public timeline inventory",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated-browser review",
      projectIds: ["kc-town-hall"],
      reason: "Preserve the account's request-to-action loops, neighborhood reporting, public programs, and self-reported service metrics.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-X-PROFILE-KCTOWNHALL", "SRC-X-KCTH-TIRES-2019-YEAR-END", "SRC-X-KCTH-TIRES-2021-YEAR-END", "SRC-X-KCTH-TIRES-2022-MAY"],
      observationIds: ["OBS-X-KCTH-REQUEST-ACTION-REPORTING-LOOP"],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      boundaries: [
        "The account's tire and fee figures are project self-reporting and should remain qualified until independently reconciled.",
        "Do not expose phone numbers, resident addresses, direct messages, participant identities, or private service records.",
        "Neighborhood and City contributions remain collective."
      ]
    },
    {
      id: "INTAKE-PROJECT-ACCOUNT-ESTABLISHMENT-MEMORY-2026-07-14",
      kind: "memory-lead",
      title: "Jamie's establishment of shared project-account identities",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["callnyc", "nyc-artist-coalition", "wowlist", "kc-spaces-fund", "kc-town-hall"],
      reason: "Retain Jamie's account of establishing these public identities while separating account creation from the collective authorship that followed.",
      visibility: "public-safe",
      disposition: "researching",
      sourceIds: [],
      observationIds: ["OBS-PROJECT-ACCOUNT-ESTABLISHMENT-MEMORY"],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-AUTHORSHIP"],
      boundaries: [
        "Jamie confirms establishing the accounts, but public profile pages do not expose creator or administrator history.",
        "Do not attribute every post, campaign message, or later period of account stewardship to Jamie.",
        "Seek collaborator notes or a public-safe administrative export before promoting individual account-creation attribution."
      ]
    }
  ],

  observations: [
    { id: "OBS-X-PROFILE-CALLNYCAPP", intakeId: "INTAKE-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026-07-14", sourceId: "SRC-X-PROFILE-CALLNYCAPP", project: "callnyc", kind: "source-fact", text: "The authenticated @CallNYCapp profile reported 110 posts, 69 followers, 194 following, and a March 2016 join date on July 14, 2026.", locator: "Profile header and about metadata", status: "verified", publicSafe: true, claimIds: ["CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"], limitations: ["Fresh Posts and Replies passes recovered 107 unique public items; three profile-count slots remain explicitly not recovered."] },
    { id: "OBS-X-PROFILE-NYCARTC", intakeId: "INTAKE-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026-07-14", sourceId: "SRC-X-PROFILE-NYCARTC", project: "nyc-artist-coalition", kind: "source-fact", text: "The authenticated @NYCArtC profile reported 5,124 posts, 1,339 followers, 569 following, and a January 2017 join date on July 14, 2026.", locator: "Profile header and about metadata", status: "verified", publicSafe: true, claimIds: ["CLM-NYCAC-SHARED-SOCIAL-IDENTITY"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14", "INQ-NYCAC-FULL-POPULATION-2026"], limitations: ["A population-reconciliation pass recovered 1,026 item-level records and explicitly retained 4,098 unresolved slots; profile totals do not establish authorship or impact."] },
    { id: "OBS-X-PROFILE-WOWLIST", intakeId: "INTAKE-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026-07-14", sourceId: "SRC-X-PROFILE-WOWLIST", project: "wowlist", kind: "source-fact", text: "The authenticated @wowlist profile reported 38 posts, 47 followers, 57 following, and a February 2014 join date on July 14, 2026.", locator: "Profile header and about metadata", status: "verified", publicSafe: true, claimIds: ["CLM-WOWLIST-SOCIAL-PROJECT-ORIGIN"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"], limitations: ["The full-population pass recovered all 38 surviving profile-counted records; this is not a platform export or proof that no older record was deleted."] },
    { id: "OBS-X-PROFILE-KCSPACESFUND", intakeId: "INTAKE-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026-07-14", sourceId: "SRC-X-PROFILE-KCSPACESFUND", project: "kc-spaces-fund", kind: "source-fact", text: "The authenticated @KCSpacesFund profile reported 35 posts, 21 followers, 76 following, and an April 2020 join date on July 14, 2026.", locator: "Profile header and about metadata", status: "verified", publicSafe: true, claimIds: ["CLM-KCSPACES-SOCIAL-GRANTEE-REPORTING"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"], limitations: ["The pass recovered 34 unique visible status records and should not be described as a complete export."] },
    { id: "OBS-X-PROFILE-KCTOWNHALL", intakeId: "INTAKE-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026-07-14", sourceId: "SRC-X-PROFILE-KCTOWNHALL", project: "kc-town-hall", kind: "source-fact", text: "The authenticated @KCTownHall profile reported 183 posts, 132 followers, 225 following, and a March 2018 join date on July 14, 2026.", locator: "Profile header and about metadata", status: "verified", publicSafe: true, claimIds: ["CLM-KCTH-SOCIAL-SERVICE-REPORTING"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14", "INQ-KCTH-FULL-POPULATION-2026"], limitations: ["A full-population pass recovered all 183 surviving profile-counted items; this is not a platform export or proof that no older record was deleted."] },
    { id: "OBS-X-NYCAC-SHARED-CAMPAIGN-IDENTITY", intakeId: "INTAKE-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026-07-14", sourceId: "SRC-X-PROFILE-NYCARTC", project: "nyc-artist-coalition", kind: "source-fact", text: "The @NYCArtC profile bio explicitly carries #SaveNYCSpaces, #LetNYCDance, #TalksNotRaids, and #FairRentNYC as one shared coalition identity.", locator: "Profile bio", status: "verified", publicSafe: true, claimIds: ["CLM-NYCAC-SHARED-SOCIAL-IDENTITY"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"], limitations: ["No separate surviving project accounts were recovered, but that does not prove none ever existed; the current @fairrentnyc and @sundaydinnernyc profiles are not attributed to Jamie's projects."] },
    { id: "OBS-X-NYCAC-COUNCIL-ENGAGEMENT-FLOOR", intakeId: "INTAKE-NYCAC-X-ENGAGEMENT-AUDIT-2026-07-14", sourceId: "SRC-X-AUDIT-NYCAC-ENGAGEMENT-2026-07-14", project: "nyc-artist-coalition", kind: "source-fact", text: "The authenticated search recovered authored public posts by at least five sitting Council members engaging with @NYCArtC between 2018 and 2021: Rafael Espinal, Stephen Levin, Justin Brannan, Jimmy Van Bramer, and Brad Lander.", locator: "Deduplicated authored-status set cross-checked against NYC Open Data term dates", status: "verified", publicSafe: true, claimIds: ["CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT"], researchInquiryIds: ["INQ-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT"], limitations: ["This is a recoverable floor, not a lifetime total; the Justin Brannan post is a direct reply but not mission-relevant policy evidence."] },
    { id: "OBS-X-NYCAC-OLYMPIA-COLLABORATION", intakeId: "INTAKE-NYCAC-X-ENGAGEMENT-AUDIT-2026-07-14", sourceId: "SRC-X-AUDIT-NYCAC-ENGAGEMENT-2026-07-14", project: "nyc-artist-coalition", kind: "context", text: "Olympia Kazi's account authored 65 of the 260 unique visible posts in the recovered March 2020-March 2025 @NYCArtC mention set, documenting sustained public collaboration around the coalition identity.", locator: "Authenticated latest-results mention pass; deduplicated by status URL", status: "corroborated", publicSafe: true, claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-AUTHORSHIP"], limitations: ["External mentions do not establish who authored posts from @NYCArtC or who held account access in any period."] },
    { id: "OBS-PROJECT-ACCOUNT-ESTABLISHMENT-MEMORY", intakeId: "INTAKE-PROJECT-ACCOUNT-ESTABLISHMENT-MEMORY-2026-07-14", project: "nyc-artist-coalition", kind: "participant-memory", text: "Jamie states that he established the project Twitter accounts and is proud that collaborators, including Olympia Kazi, could use the shared public identities over years.", locator: "Jamie statement to Codex, July 14, 2026", status: "captured", publicSafe: true, claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-AUTHORSHIP"], limitations: ["Public profile metadata does not expose account-creator or administrator history; individual post authorship remains unresolved."] },
    { id: "OBS-X-WOWLIST-PROJECT-ORIGIN", intakeId: "INTAKE-WOWLIST-X-ARCHIVE-2026-07-14", sourceId: "SRC-X-WOWLIST-PROJECT-ORIGIN-2014-02-12", project: "wowlist", kind: "source-fact", text: "The earliest recovered @wowlist post names Richard and Jamie and describes the project as growing from calendars made at Sunday Dinner.", locator: "Post text", status: "verified", publicSafe: true, claimIds: ["CLM-WOWLIST-SOCIAL-PROJECT-ORIGIN"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"], limitations: ["The post does not establish complete founder roles, product chronology, or every contributor."] },
    { id: "OBS-X-WOWLIST-PUBLIC-DISTRIBUTION", intakeId: "INTAKE-WOWLIST-X-ARCHIVE-2026-07-14", sourceId: "SRC-X-WOWLIST-ALLIED-MEDIA-2015-04-22", project: "wowlist", kind: "source-fact", text: "The recovered WOW List timeline documents public event distribution and announces participation in the 2015 Allied Media Conference.", locator: "April 22, 2015 post and surrounding authored timeline", status: "verified", publicSafe: true, claimIds: ["CLM-WOWLIST-SOCIAL-PROJECT-ORIGIN"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"], limitations: ["The timeline does not establish conference attendance outcomes, audience reach, or complete city adoption."] },
    { id: "OBS-X-KCSPACES-PUBLIC-GRANTEE-REPORTING", intakeId: "INTAKE-KCSPACES-X-ARCHIVE-2026-07-14", sourceId: "SRC-X-AUDIT-PROJECT-ACCOUNTS-2026-07-14", project: "kc-spaces-fund", kind: "source-fact", text: "The recovered @KCSpacesFund timeline publicly reported at least 11 named recipient or grantee highlights, routed spaces to applications for grants up to $500, amplified fundraising partners, and preserved recipient and press responses.", locator: "34-status recovered set, April 7-July 9, 2020", status: "corroborated", publicSafe: true, claimIds: ["CLM-KCSPACES-SOCIAL-GRANTEE-REPORTING"], researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"], limitations: ["This is project self-reporting and not an independent payment ledger; the named-public count excludes protected applicant and payment records."] },
    { id: "OBS-X-KCTH-REQUEST-ACTION-REPORTING-LOOP", intakeId: "INTAKE-KCTH-X-ARCHIVE-2026-07-14", sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026", project: "kc-town-hall", kind: "source-fact", text: "The complete surviving @KCTownHall timeline documents a recurring request-to-action loop: solicit tire locations and neighborhood priorities, perform pickups or public programs, then report results back through the same public identity from 2018 through 2022.", locator: "183-status recovered set, July 2, 2018-September 24, 2022", status: "verified", publicSafe: true, claimIds: ["CLM-KCTH-SOCIAL-SERVICE-REPORTING"], researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026"], limitations: ["Project posts self-report 599 tires and $13,235 in avoided fees for 2019, more than $32,000 by November 2021, and 139 tires in May 2022; these figures need independent reconciliation before stronger public use."] }
  ],

  sources: [
    { id: "SRC-X-PROFILE-CALLNYCAPP", title: "Call NYC X profile", organization: "CallNYC", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://x.com/CallNYCapp", preferredPublicUrl: "canonical", publicCitation: "Call NYC (@CallNYCapp) profile, accessed July 14, 2026.", publicNote: "Profile snapshot for the archived independent CallNYC project account.", supportsGenerally: ["project account identity", "March 2016 join date", "110-post profile snapshot", "public project description"], doesNotEstablish: ["complete timeline recovery", "individual post authorship", "formal Council ownership", "current-service status"] },
    { id: "SRC-X-PROFILE-NYCARTC", title: "NYC Artist Coalition X profile", organization: "NYC Artist Coalition", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://x.com/NYCArtC", preferredPublicUrl: "canonical", publicCitation: "NYC Artist Coalition (@NYCArtC) profile, accessed July 14, 2026.", publicNote: "Shared coalition profile carrying the SaveNYCSpaces, LetNYCDance, TalksNotRaids, and FairRentNYC campaign identities.", supportsGenerally: ["shared coalition account", "four named campaign hashtags", "January 2017 join date", "5,124-post profile snapshot"], doesNotEstablish: ["who created the account", "who authored any individual post", "complete timeline recovery", "sole ownership of collective campaigns"] },
    { id: "SRC-X-PROFILE-WOWLIST", title: "WOW List X profile", organization: "WOW List", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://x.com/wowlist", preferredPublicUrl: "canonical", publicCitation: "WOW List (@wowlist) profile, accessed July 14, 2026.", publicNote: "Public account for WOW List's event-sharing and community-calendar practice.", supportsGenerally: ["project account identity", "February 2014 join date", "38-post profile snapshot"], doesNotEstablish: ["complete product adoption", "audience scale", "individual post authorship", "current service status"] },
    { id: "SRC-X-PROFILE-KCSPACESFUND", title: "KC Spaces Fund X profile", organization: "KC Spaces Fund", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://x.com/KCSpacesFund", preferredPublicUrl: "canonical", publicCitation: "KC Spaces Fund (@KCSpacesFund) profile, accessed July 14, 2026.", publicNote: "Public campaign account for COVID-era emergency support to Kansas City-area grassroots arts and culture spaces.", supportsGenerally: ["project account identity", "April 2020 join date", "35-post profile snapshot", "public campaign description"], doesNotEstablish: ["Jamie's organizer status", "grant decision-making", "complete disbursement history", "individual post authorship"] },
    { id: "SRC-X-PROFILE-KCTOWNHALL", title: "KC Town Hall X profile", organization: "KC Town Hall", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://x.com/KCTownHall", preferredPublicUrl: "canonical", publicCitation: "KC Town Hall (@KCTownHall) profile, accessed July 14, 2026.", publicNote: "Public project account linking neighborhood restoration, survey, program, Instagram, and Facebook surfaces.", supportsGenerally: ["project account identity", "March 2018 join date", "183-post profile snapshot", "cross-platform public identity"], doesNotEstablish: ["complete project chronology", "individual post authorship", "independent verification of self-reported program metrics", "sole credit"] },
    { id: "SRC-X-AUDIT-PROJECT-ACCOUNTS-2026-07-14", title: "Authenticated project-account archive production audit", kind: "research-run", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md", preferredPublicUrl: "canonical", publicCitation: "Authenticated X project-account archive production audit, July 14, 2026.", publicNote: "Profile snapshots and bounded timeline passes recovered 107 of 110 CallNYC profile-count slots at item level, all 38 surviving WOW List statuses, 34 of 35 KC Spaces Fund statuses, all 183 surviving KC Town Hall statuses, and 1,026 of 5,124 NYC Artist Coalition profile-count slots. The remaining 4,098 NYC Artist Coalition slots are explicitly unresolved rather than treated as recovered.", supportsGenerally: ["five verified project accounts", "bounded recovered-status counts", "public timeline themes", "explicit completeness limitations"], doesNotEstablish: ["deleted or private activity", "a complete NYC Artist Coalition export or item-level recovery", "individual post authorship", "stable follower or post totals", "independent verification of project self-reporting"] },
    { id: "SRC-X-AUDIT-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-14", title: "Authenticated CallNYC Council-account engagement audit", kind: "research-run", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md#callnyc-council-account-engagement", preferredPublicUrl: "canonical", publicCitation: "Authenticated review of public Council-member engagement with @CallNYCapp, July 14, 2026.", publicNote: "The audit links all eight underlying public statuses, separates CallNYC outreach from member-authored response, and cross-checks dates against official Council terms. Eight sitting members were recovered: Peter Koo, Steven Matteo, Ruben Wills, Ydanis Rodriguez, Rosie Mendez, Helen Rosenthal, Mathieu Eugene, and Margaret Chin.", supportsGenerally: ["eight unique sitting Council-member accounts", "reply, quote-post, repost, and independent-link interaction types", "deduplicated public status set", "Carlina Rivera exclusion before Council service"], doesNotEstablish: ["all historical engagement", "deleted, private, or search-suppressed posts", "identities behind likes or repost counts", "formal adoption or endorsement", "use by every Council office"] },
    { id: "SRC-X-AUDIT-NYCAC-ENGAGEMENT-2026-07-14", title: "Authenticated NYC Artist Coalition engagement audit", kind: "research-run", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md#nyc-artist-coalition-council-account-engagement", preferredPublicUrl: "canonical", publicCitation: "Authenticated review of public engagement with @NYCArtC, July 14, 2026.", publicNote: "The linked public ledger includes the five underlying status URLs. A bounded mention search recovered 260 unique visible statuses from March 2020-March 2025 and 60 from a 2018-2019 dated pass. At least five sitting members authored recoverable posts mentioning or replying to @NYCArtC: Rafael Espinal, Stephen Levin, Justin Brannan, Jimmy Van Bramer, and Brad Lander.", supportsGenerally: ["at least five sitting Council-member accounts", "bounded mention-search corpus", "sustained collaborator engagement", "collective public identity"], doesNotEstablish: ["complete lifetime engagement", "every pre-November 2018 result", "individual authorship of @NYCArtC posts", "formal Council adoption", "that every recovered reply was policy-significant"] },
    { id: "SRC-NYC-OPEN-DATA-COUNCIL-MEMBERS-1999-2025", title: "City Council Members (1999 to 2025)", organization: "New York City Council / NYC Open Data", kind: "government-record", visibility: "public", preservationStatus: "live", accessedAt: reviewedAt, canonicalUrl: "https://data.cityofnewyork.us/City-Government/City-Council-Members-1999-to-Present-/uvw5-9znb/about_data", preferredPublicUrl: "canonical", publicCitation: "New York City Council and NYC Open Data, 'City Council Members (1999 to 2025),' accessed July 14, 2026.", publicNote: "Official term records used to determine whether the author of a recovered social post was serving on the Council on the post date.", supportsGenerally: ["Council member names", "term start and end dates", "districts", "member-at-date cross-check"], doesNotEstablish: ["control of a social account", "authorship of a particular post", "engagement with a project", "endorsement or adoption"] },

    { id: "SRC-X-CALLNYC-PETER-KOO-2016-04-27", title: "Peter Koo repost of CallNYC Lifeline recognition", author: "Peter Koo", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2016-04-27", accessedAt: reviewedAt, canonicalUrl: "https://x.com/CMPeterKoo/status/725422741160079360", preferredPublicUrl: "canonical", publicCitation: "Council Member Peter Koo repost of @CallNYCapp, April 27, 2016.", publicNote: "Facebook-syndicated post explicitly identifies the included item as a repost of CallNYC's public recognition of Lifeline-related constituent help.", supportsGenerally: ["public repost by Peter Koo", "CallNYC mention", "constituent-services context"], doesNotEstablish: ["formal adoption", "product use", "endorsement of every CallNYC claim"] },
    { id: "SRC-X-CALLNYC-STEVEN-MATTEO-2016-05-03", title: "Steven Matteo reply to CallNYC", author: "Steven Matteo", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2016-05-03", accessedAt: reviewedAt, canonicalUrl: "https://x.com/StevenMatteo/status/727621921341358081", preferredPublicUrl: "canonical", publicCitation: "Council Member Steven Matteo reply to @CallNYCapp, May 3, 2016.", publicNote: "Replies to CallNYC and the Council with a constituent-service issue category: potholes.", supportsGenerally: ["public reply", "CallNYC mention", "constituent-service issue response"], doesNotEstablish: ["formal adoption", "product use", "complete office engagement"] },
    { id: "SRC-X-CALLNYC-RUBEN-WILLS-2016-05-17", title: "Ruben Wills reply to CallNYC", author: "Ruben Wills", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2016-05-17", accessedAt: reviewedAt, canonicalUrl: "https://x.com/CM_RubenWills/status/732717792097603584", preferredPublicUrl: "canonical", publicCitation: "Council Member Ruben Wills reply to @CallNYCapp, May 17, 2016.", publicNote: "Public reply addressed to CallNYC and the Council that copied the Queens Chronicle.", supportsGenerally: ["public reply", "CallNYC mention", "public amplification context"], doesNotEstablish: ["formal adoption", "endorsement", "complete office engagement"] },
    { id: "SRC-X-CALLNYC-YDANIS-RODRIGUEZ-2016-05-18", title: "Ydanis Rodriguez quote-post of CallNYC recognition", author: "Ydanis Rodriguez", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2016-05-18", accessedAt: reviewedAt, canonicalUrl: "https://x.com/ydanis/status/733089563334299648", preferredPublicUrl: "canonical", publicCitation: "Council Member Ydanis Rodriguez quote-post of @CallNYCapp, May 18, 2016.", publicNote: "Connects CallNYC's rent-overcharge recognition to a public statement about protecting tenant rights in Northern Manhattan and citywide.", supportsGenerally: ["public quote-post", "CallNYC recognition", "tenant-rights constituent-service context"], doesNotEstablish: ["formal adoption", "independent verification of the underlying metric", "Council-wide endorsement"] },
    { id: "SRC-X-CALLNYC-ROSIE-MENDEZ-2016-05-19", title: "Rosie Mendez quote-post of CallNYC recognition", author: "Rosie Mendez", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2016-05-19", accessedAt: reviewedAt, canonicalUrl: "https://x.com/RosieMendez/status/733410096915550208", preferredPublicUrl: "canonical", publicCitation: "Council Member Rosie Mendez quote-post of @CallNYCapp, May 19, 2016.", publicNote: "Thanks Team Rosie while quote-posting CallNYC's recognition of tenant-help records.", supportsGenerally: ["public quote-post", "CallNYC recognition", "constituent-service team context"], doesNotEstablish: ["formal adoption", "independent verification of the underlying metric", "sole staff credit"] },
    { id: "SRC-X-CALLNYC-HELEN-ROSENTHAL-2016-09-27", title: "Helen Rosenthal post linking CallNYC", author: "Helen Rosenthal", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2016-09-27", accessedAt: reviewedAt, canonicalUrl: "https://x.com/HelenRosenthal/status/780797474277511170", preferredPublicUrl: "canonical", publicCitation: "Council Member Helen Rosenthal post linking CallNYC.org, September 27, 2016.", publicNote: "Independently links CallNYC.org while telling residents that Council offices are available to help.", supportsGenerally: ["independent CallNYC link", "resident-routing language", "Council-office context"], doesNotEstablish: ["formal adoption", "Council-wide endorsement", "current guidance"] },
    { id: "SRC-X-CALLNYC-MATHIEU-EUGENE-2016-10-04", title: "Mathieu Eugene quote-post of CallNYC recognition", author: "Mathieu Eugene", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2016-10-04", accessedAt: reviewedAt, canonicalUrl: "https://x.com/CMMathieuEugene/status/783305320508514304", preferredPublicUrl: "canonical", publicCitation: "Council Member Mathieu Eugene quote-post of @CallNYCapp, October 4, 2016.", publicNote: "Responds to CallNYC's housing-lottery recognition with a statement about helping constituents improve housing options.", supportsGenerally: ["public quote-post", "CallNYC recognition", "housing constituent-services context"], doesNotEstablish: ["formal adoption", "independent verification of the underlying metric", "product use"] },
    { id: "SRC-X-CALLNYC-MARGARET-CHIN-2017-07-11", title: "Margaret Chin response to CallNYC recognition", author: "Margaret Chin", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2017-07-11", accessedAt: reviewedAt, canonicalUrl: "https://x.com/CM_MargaretChin/status/884863588317442049", preferredPublicUrl: "canonical", publicCitation: "Council Member Margaret Chin response to @CallNYCapp, July 11, 2017.", publicNote: "Thanks CallNYC for recognition of the office's prior-year work and says the team is ready to improve the numbers.", supportsGenerally: ["public response", "CallNYC mention", "office performance context"], doesNotEstablish: ["formal adoption", "independent verification of every underlying metric", "Council-wide use"] },

    { id: "SRC-X-NYCAC-RAFAEL-ESPINAL-2019-02-21", title: "Rafael Espinal post thanking NYC Artist Coalition", author: "Rafael Espinal", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2019-02-21", accessedAt: reviewedAt, canonicalUrl: "https://x.com/RLEspinal/status/1098626837821997056", preferredPublicUrl: "canonical", publicCitation: "Council Member Rafael Espinal post thanking @NYCArtC, February 21, 2019.", publicNote: "Says the city needs to Save NYC Spaces and names Talks Not Raids among the public campaign context.", supportsGenerally: ["public coalition engagement", "SaveNYCSpaces", "TalksNotRaids", "collaborative language"], doesNotEstablish: ["Jamie's sole role", "sole coalition causation", "completion of every named policy goal"] },
    { id: "SRC-X-NYCAC-STEPHEN-LEVIN-2019-02-11", title: "Stephen Levin post thanking MARCH hearing participants", author: "Stephen Levin", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2019-02-11", accessedAt: reviewedAt, canonicalUrl: "https://x.com/StephenLevin33/status/1095020293112979457", preferredPublicUrl: "canonical", publicCitation: "Council Member Stephen Levin post thanking @NYCArtC and venue participants, February 11, 2019.", publicNote: "Credits small-business and nightlife participants for testimony about MARCH raids and for making the issue visible.", supportsGenerally: ["public coalition engagement", "MARCH hearing testimony", "participant credit", "TalksNotRaids context"], doesNotEstablish: ["Jamie's sole role", "that testimony alone ended MARCH", "complete participant roster"] },
    { id: "SRC-X-NYCAC-JUSTIN-BRANNAN-2019-08-30", title: "Justin Brannan reply to NYC Artist Coalition", author: "Justin Brannan", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2019-08-30", accessedAt: reviewedAt, canonicalUrl: "https://x.com/JustinBrannan/status/1167536258438115333", preferredPublicUrl: "canonical", publicCitation: "Council Member Justin Brannan reply to @NYCArtC, August 30, 2019.", publicNote: "Direct public reply to the coalition account; retained for engagement counting but not treated as policy evidence.", supportsGenerally: ["direct public reply", "NYC Artist Coalition mention"], doesNotEstablish: ["policy support", "formal partnership", "campaign adoption", "Jamie's role"] },
    { id: "SRC-X-NYCAC-JIMMY-VAN-BRAMER-2020-10-26", title: "Jimmy Van Bramer post including NYC Artist Coalition", author: "Jimmy Van Bramer", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2020-10-26", accessedAt: reviewedAt, canonicalUrl: "https://x.com/JimmyVanBramer/status/1320792543773282304", preferredPublicUrl: "canonical", publicCitation: "Council Member Jimmy Van Bramer post including @NYCArtC, October 26, 2020.", publicNote: "Names the coalition in a public post arguing that performing artists and culture should be prioritized in City and federal policy.", supportsGenerally: ["public coalition mention", "arts and culture policy context", "performing-artist support"], doesNotEstablish: ["formal partnership", "specific coalition authorship", "Jamie's sole role"] },
    { id: "SRC-X-NYCAC-BRAD-LANDER-2021-01-28", title: "Brad Lander reply on commercial rent stabilization", author: "Brad Lander", kind: "government-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2021-01-28", accessedAt: reviewedAt, canonicalUrl: "https://x.com/bradlander/status/1354840336330330116", preferredPublicUrl: "canonical", publicCitation: "Council Member Brad Lander reply on commercial rent stabilization, January 28, 2021.", publicNote: "Says he spoke about moving commercial rent stabilization forward; the authenticated @NYCArtC mention search recovered the post in a thread with Olympia Kazi, Stephen Levin, and others.", supportsGenerally: ["public commercial-rent-stabilization engagement", "thread association with NYC Artist Coalition", "Council committee-vote context"], doesNotEstablish: ["formal coalition membership", "sole causation", "passage of commercial rent stabilization", "individual @NYCArtC post authorship"] },

    { id: "SRC-X-WOWLIST-PROJECT-ORIGIN-2014-02-12", title: "WOW List post connecting the project to Sunday Dinner calendars", organization: "WOW List", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2014-02-12", accessedAt: reviewedAt, canonicalUrl: "https://x.com/wowlist/status/433671630837919744", preferredPublicUrl: "canonical", publicCitation: "WOW List post naming Richard and Jamie and Sunday Dinner calendars, February 12, 2014.", publicNote: "Earliest recovered authored post in the bounded timeline pass.", supportsGenerally: ["Richard and Jamie project context", "Sunday Dinner calendar origin", "public project launch context"], doesNotEstablish: ["complete founder roles", "sole authorship", "complete project chronology", "product adoption"] },
    { id: "SRC-X-WOWLIST-ALLIED-MEDIA-2015-04-22", title: "WOW List Allied Media Conference announcement", organization: "WOW List", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2015-04-22", accessedAt: reviewedAt, canonicalUrl: "https://x.com/wowlist/status/590942060829663232", preferredPublicUrl: "canonical", publicCitation: "WOW List post announcing Allied Media Conference participation, April 22, 2015.", publicNote: "Public project post linking WOW List and the 2015 Allied Media Conference.", supportsGenerally: ["public event-distribution practice", "Allied Media Conference announcement", "WOW List project identity"], doesNotEstablish: ["attendance outcomes", "audience scale", "complete conference role"] },
    { id: "SRC-X-KCSPACES-FIRST-ROUND-2020-04-18", title: "KC Spaces Fund first-round grant announcement", organization: "KC Spaces Fund", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2020-04-18", accessedAt: reviewedAt, canonicalUrl: "https://x.com/KCSpacesFund/status/1251553551454797830", preferredPublicUrl: "canonical", publicCitation: "KC Spaces Fund first-round public grant announcement, April 18, 2020.", publicNote: "Publicly names the Latino Arts Foundation and describes $500-at-a-time emergency relief reporting.", supportsGenerally: ["first-round public reporting", "named recipient", "public fundraising pathway"], doesNotEstablish: ["complete disbursement ledger", "grant decision-maker identities", "Jamie's organizer role"] },
    { id: "SRC-X-KCSPACES-LATINO-ARTS-THANKS-2020-04-18", title: "Latino Arts Foundation recipient response", author: "Deanna Munoz", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2020-04-18", accessedAt: reviewedAt, canonicalUrl: "https://x.com/mmunzmarie/status/1251584787267178499", preferredPublicUrl: "canonical", publicCitation: "Public recipient response to KC Spaces Fund, April 18, 2020.", publicNote: "Thanks KC Spaces Fund and describes support for mentors, mentees, supplies, and virtual mentorship.", supportsGenerally: ["public recipient response", "Latino Arts Foundation context", "reported use context"], doesNotEstablish: ["complete payment record", "all recipients", "Jamie's role", "independent financial audit"] },
    { id: "SRC-X-KCSPACES-DOGOOD-2020-04-21", title: "Do816 Daily DoGood post about KC Spaces Fund", organization: "Do816", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2020-04-21", accessedAt: reviewedAt, canonicalUrl: "https://x.com/Do816/status/1252677916217036805", preferredPublicUrl: "canonical", publicCitation: "Do816 Daily DoGood post about KC Spaces Fund, April 21, 2020.", publicNote: "External public account describes the fund as responding to the risk of community arts-space closures.", supportsGenerally: ["external public awareness", "campaign purpose", "KC Spaces Fund mention"], doesNotEstablish: ["complete fundraising results", "Jamie's role", "formal nonprofit status"] },
    { id: "SRC-X-KCTH-TIRES-2019-YEAR-END", title: "KC Town Hall 2019 Tired of Tires report", organization: "KC Town Hall", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2019-11-03", accessedAt: reviewedAt, canonicalUrl: "https://x.com/KCTownHall/status/1190995865814667266", preferredPublicUrl: "canonical", publicCitation: "KC Town Hall 2019 Tired of Tires year-end report, November 3, 2019.", publicNote: "Project self-report of 599 tires and $13,235 in avoided disposal fees during 2019.", supportsGenerally: ["2019 project self-report", "599-tire figure", "$13,235 avoided-fee figure", "recurring program language"], doesNotEstablish: ["independent financial reconciliation", "complete participant roster", "sole credit", "resident address history"] },
    { id: "SRC-X-KCTH-TIRES-2021-YEAR-END", title: "KC Town Hall 2021 Tired of Tires report", organization: "KC Town Hall", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2021-11-07", accessedAt: reviewedAt, canonicalUrl: "https://x.com/KCTownHall/status/1457371688300056580", preferredPublicUrl: "canonical", publicCitation: "KC Town Hall 2021 Tired of Tires year-end report, November 7, 2021.", publicNote: "Project self-report of 112 tires that month, zero curbside tires in the stated area, and more than $32,000 in avoided fees to date.", supportsGenerally: ["2021 program continuity", "112-tire monthly figure", "$32,000 cumulative self-report", "defined service area"], doesNotEstablish: ["independent financial reconciliation", "per-household outcomes", "sole credit", "complete service record"] },
    { id: "SRC-X-KCTH-TIRES-2022-MAY", title: "KC Town Hall May 2022 Tired of Tires report", organization: "KC Town Hall", kind: "institutional-social-post", visibility: "public", preservationStatus: "live", publishedAt: "2022-05-13", accessedAt: reviewedAt, canonicalUrl: "https://x.com/KCTownHall/status/1525157225542651910", preferredPublicUrl: "canonical", publicCitation: "KC Town Hall May 2022 Tired of Tires report, May 13, 2022.", publicNote: "Project self-report of 139 tires collected in May and a zero-curbside-tire result in the stated area.", supportsGenerally: ["2022 program continuity", "139-tire monthly figure", "request-to-action reporting loop"], doesNotEstablish: ["independent reconciliation", "complete service record", "sole credit", "resident identities"] }
  ],

  claims: [
    {
      id: "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT",
      project: "callnyc",
      internalClaim: "A bounded authenticated audit recovered authored public engagement with CallNYC from eight people who were sitting New York City Council members on the post dates.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "The independent CallNYC prototype Jamie built drew public engagement from eight sitting New York City Council members through replies, quote-posts, reposts, and direct links.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-X-AUDIT-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-14", relationship: "direct-support", supports: ["deduplicated eight-member count", "interaction types", "collection method", "exclusions and limitations"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYC-OPEN-DATA-COUNCIL-MEMBERS-1999-2025", relationship: "corroborating", supports: ["member-at-post-date term verification"], confidence: "high", renderCitation: true },
        ...callnycCouncilPostIds.map((sourceId) => ({ sourceId, relationship: "direct-support", supports: ["one recovered Council-member-authored public interaction"], confidence: "high", renderCitation: false }))
      ],
      boundaries: ["Say eight recovered sitting-member accounts, not eight endorsements, adopters, offices using the product, or all lifetime engagement.", "Count only posts authored by the member account; project outreach tagging a member is not member engagement.", "Carlina Rivera's 2016 post is retained as public engagement but excluded because it predates her Council service."],
      antiClaims: ["Eight Council members adopted CallNYC.", "The Council endorsed CallNYC.", "Every Council-member interaction was recovered.", "Likes or repost totals identify specific members."],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT", "INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT",
      project: "nyc-artist-coalition",
      internalClaim: "A bounded authenticated audit recovered authored public engagement with @NYCArtC from at least five people who were sitting New York City Council members on the post dates.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Recovered authored posts show at least five sitting Council members publicly engaging with @NYCArtC between 2018 and 2021, including exchanges around Talks Not Raids, commercial rent stabilization, and support for artists.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-AUDIT-NYCAC-ENGAGEMENT-2026-07-14", relationship: "direct-support", supports: ["five-member recovered floor", "bounded search method", "dates and limitations"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NYC-OPEN-DATA-COUNCIL-MEMBERS-1999-2025", relationship: "corroborating", supports: ["member-at-post-date term verification"], confidence: "high", renderCitation: true },
        ...nycacCouncilPostIds.map((sourceId) => ({ sourceId, relationship: "direct-support", supports: ["one recovered sitting-member-authored public interaction"], confidence: "high", renderCitation: false }))
      ],
      boundaries: ["Use at least five because pre-November 2018 search coverage and the full 5,124-post account remain incomplete.", "Do not count candidate-era or former-member posts as sitting-member engagement.", "Do not imply Jamie authored the coalition posts or solely produced the public response."],
      antiClaims: ["Five Council members adopted every coalition position.", "The audit is a complete lifetime engagement count.", "Jamie authored all @NYCArtC posts.", "The public replies prove sole coalition causation."],
      researchInquiryIds: ["INQ-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT", "INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-NYCAC-SHARED-SOCIAL-IDENTITY",
      project: "nyc-artist-coalition",
      internalClaim: "The @NYCArtC account functions as a shared public identity spanning Save NYC Spaces, Let NYC Dance, Talks Not Raids, and FairRentNYC, with 5,124 profile posts reported in July 2026.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "NYC Artist Coalition sustained one shared social identity across four campaign lines and more than 5,000 public posts by July 2026.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-PROFILE-NYCARTC", relationship: "direct-support", supports: ["four campaign hashtags", "shared account identity", "5,124-post accessed-at snapshot"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-NYCAC-POPULATION-AUDIT-2026-07-14", relationship: "corroborating", supports: ["item-level signals for all four campaigns", "1,026 recovered records and 4,098 explicit unresolved slots"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Profile totals are volatile snapshots.", "Only 1,026 of 5,124 profile-count slots are recovered at item level; do not call the corpus complete.", "Keep account output collective unless post-level authorship is established.", "Do not attribute the present @fairrentnyc account to the campaign."],
      antiClaims: ["Jamie authored all 5,124 posts.", "Each campaign had a separate verified account.", "Post volume alone proves policy impact."],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-AUTHORSHIP"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT",
      project: "nyc-artist-coalition",
      internalClaim: "Jamie states that he established the project accounts as public-facing identity systems that teammates could steward over time.",
      status: "use-with-care",
      projections: [{ key: "archive-note", text: "Established shared public project identities that collaborators could sustain and use over time.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [],
      boundaries: ["Retain as participant memory until account-administrator history or collaborator notes corroborate creation and handoff.", "Never turn account creation into individual authorship of collective posts.", "Olympia Kazi's substantial external mention record supports sustained collaboration, not account access or post authorship."],
      antiClaims: ["Jamie wrote every project post.", "Jamie alone controlled the accounts throughout their histories.", "Olympia Kazi authored specific @NYCArtC posts without corroboration."],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ACCOUNT-AUTHORSHIP"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-WOWLIST-SOCIAL-PROJECT-ORIGIN",
      project: "wowlist",
      internalClaim: "The earliest recovered @wowlist post names Richard and Jamie and connects the project to community calendars made at Sunday Dinner; later posts document event distribution and Allied Media Conference participation.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "A recovered 2014 project post connects WOW List's development by Richard and Jamie to community calendars made at Sunday Dinner.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-WOWLIST-PROJECT-ORIGIN-2014-02-12", relationship: "direct-support", supports: ["Richard and Jamie", "Sunday Dinner calendars", "project-development language"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-WOWLIST-ALLIED-MEDIA-2015-04-22", relationship: "corroborating", supports: ["public event-distribution practice", "Allied Media Conference announcement"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Keep Richard and Sunday Dinner participants in the credit frame.", "Do not infer complete product adoption or every founder role from two posts."],
      antiClaims: ["Jamie solely founded WOW List.", "The timeline is a complete product history.", "Conference participation proves adoption."],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-KCSPACES-SOCIAL-GRANTEE-REPORTING",
      project: "kc-spaces-fund",
      internalClaim: "The recovered KC Spaces Fund account publicly routed applications and donations and reported at least 11 named recipient or grantee highlights between April and July 2020.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The KC Spaces Fund account publicly routed grant applications and donations and reported at least 11 named recipient or grantee highlights in 2020.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-X-AUDIT-PROJECT-ACCOUNTS-2026-07-14", relationship: "direct-support", supports: ["34-status recovered set", "11 named public highlights", "application and donation routing"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-KCSPACES-FIRST-ROUND-2020-04-18", relationship: "corroborating", supports: ["first-round public grant reporting", "named recipient"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-KCSPACES-LATINO-ARTS-THANKS-2020-04-18", relationship: "corroborating", supports: ["public recipient response"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-X-KCSPACES-DOGOOD-2020-04-21", relationship: "context", supports: ["external campaign awareness"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["Describe the count as project public reporting, not an audited payment ledger.", "Keep Jamie's role to technical and operational support unless collaborator proof expands it.", "Protected applicant and payment records remain outside the repo."],
      antiClaims: ["Jamie selected the grantees.", "Jamie ran the fundraiser.", "Every public highlight independently proves payment."],
      researchInquiryIds: ["INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    },
    {
      id: "CLM-KCTH-SOCIAL-SERVICE-REPORTING",
      project: "kc-town-hall",
      internalClaim: "The complete surviving KC Town Hall timeline documents a recurring public request-to-action-and-reporting loop; 100 of 183 records concern resident tire intake, pickup operations, or result reporting.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "KC Town Hall also used its shared public account as an operating surface: 100 of 183 surviving records concern resident tire reports, pickups, and result reporting from 2019 through 2022.", status: "active", citationRequired: true, surfaces: ["/work/kc-town-hall"] }],
      evidence: [
        { sourceId: "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026", relationship: "direct-support", supports: ["183-record complete surviving population", "100 tire-workflow records", "request-to-action reporting pattern", "2018-2022 continuity"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-X-KCTH-TIRES-LAUNCH-2019-05-03", relationship: "direct-support", supports: ["resident-intake and pickup workflow launch"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-X-KCTH-TIRES-2019-YEAR-END", relationship: "corroborating", supports: ["2019 year-end reporting"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-X-KCTH-TIRES-2021-YEAR-END", relationship: "corroborating", supports: ["2021 year-end continuity"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-X-KCTH-TIRES-2022-MAY", relationship: "corroborating", supports: ["2022 recurring service continuity"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Treat the account as a shared project identity rather than proof that Jamie authored every record.", "Keep metric figures explicitly identified as project self-reporting until independently reconciled.", "Do not expose resident addresses, phone numbers, direct messages, or private service records.", "Credit residents, neighborhood partners, volunteers, and City collaborators collectively."],
      antiClaims: ["Jamie alone authored the account or delivered every pickup.", "The social timeline is an audited service ledger.", "One hundred records equal one hundred completed pickups or households.", "Public posts authorize release of private resident records."],
      researchInquiryIds: ["INQ-KCTH-FULL-POPULATION-2026", "INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES", "INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated-browser archival review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14",
      project: "nyc-artist-coalition",
      question: "What public-safe project identities, traction, sources, service patterns, and engagement survive across Jamie's project X accounts?",
      methods: [
        "Used Jamie's authenticated X session and inspected profile headers, bios, links, timelines, replies, media context, and search results.",
        "Deduplicated visible status records by canonical status URL and separated project-authored posts, reposted external posts, and externally authored mentions.",
        "Ran full or near-full bounded scroll passes for four smaller accounts and targeted campaign, mention, and date searches for the 5,124-post @NYCArtC account.",
        "Retained only public-safe aggregate observations and selected public status URLs; no cookies, private messages, account settings, address submissions, or private analytics were inspected."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Five project accounts were verified: @CallNYCapp, @NYCArtC, @wowlist, @KCSpacesFund, and @KCTownHall.",
        "The @NYCArtC bio carries SaveNYCSpaces, LetNYCDance, TalksNotRaids, and FairRentNYC as one shared campaign identity.",
        "Near-full visible timeline sets were recovered for CallNYC, WOW List, KC Spaces Fund, and KC Town Hall; NYC Artist Coalition required targeted sampling.",
        "The accounts served as more than announcements: they routed residents, applicants, donors, event participants, press, and public officials into project workflows and reported results back.",
        "The current @fairrentnyc and @sundaydinnernyc profiles were not attributed to Jamie's projects because their dates and content did not corroborate the connection."
      ],
      limitations: [
        "X search, pagination, virtualization, and availability can omit posts; recovered counts are floors, not complete exports.",
        "Deleted, private, search-suppressed, or unavailable posts cannot be treated as never having existed.",
        "Profile post and follower totals can change after the accessed-at date.",
        "Public timelines do not identify the human author of a shared account post.",
        "The audit did not inspect direct messages, account-administration history, private analytics, address submissions, cookies, or private account data."
      ],
      sourceIds: [
        "SRC-X-AUDIT-PROJECT-ACCOUNTS-2026-07-14",
        "SRC-X-PROFILE-CALLNYCAPP",
        "SRC-X-PROFILE-NYCARTC",
        "SRC-X-PROFILE-WOWLIST",
        "SRC-X-PROFILE-KCSPACESFUND",
        "SRC-X-PROFILE-KCTOWNHALL"
      ],
      publicSummary: "A July 2026 authenticated audit verified five project accounts and recovered bounded evidence of shared public identity, service routing, public-official engagement, and longitudinal project documentation while preserving explicit completeness and authorship limits."
    },
    {
      id: "INQ-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT",
      project: "nyc-artist-coalition",
      question: "Which sitting New York City Council members authored recoverable public posts engaging with @NYCArtC, and what may those posts support?",
      methods: [
        "Searched authenticated X results for @NYCArtC mentions excluding posts authored by @NYCArtC.",
        "Deduplicated status URLs across broad latest, top, and dated searches and reviewed the author and visible post text.",
        "Cross-checked each author's post date against official NYC Open Data Council term dates.",
        "Excluded coalition outreach alone, candidate-era posts, former-member posts, hidden liker identities, and posts that did not survive as authored public records."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "At least five sitting members authored recovered posts engaging with @NYCArtC: Rafael Espinal, Stephen Levin, Justin Brannan, Jimmy Van Bramer, and Brad Lander.",
        "The strongest mission-relevant posts connect the coalition to Talks Not Raids hearing testimony, Save NYC Spaces, commercial rent stabilization, and support for performing artists.",
        "Justin Brannan's direct reply counts as engagement but is not used as policy-support evidence.",
        "Former-member and candidate-era posts remain useful context but are excluded from the sitting-member floor."
      ],
      limitations: [
        "The 5,124-post coalition account was not fully exported.",
        "The pre-November 2018 dated search encountered X retrieval errors and is incomplete.",
        "Search results do not reveal deleted, private, suppressed, or otherwise unavailable engagement.",
        "A public reply or mention does not by itself establish formal endorsement, adoption, or policy causation."
      ],
      sourceIds: ["SRC-X-AUDIT-NYCAC-ENGAGEMENT-2026-07-14", "SRC-NYC-OPEN-DATA-COUNCIL-MEMBERS-1999-2025", ...nycacCouncilPostIds],
      publicSummary: "The bounded authenticated search recovered authored engagement from at least five sitting Council members; this is a floor, not a complete lifetime count or a claim of adoption."
    },
    {
      id: "INQ-PROJECT-SOCIAL-ACCOUNT-AUTHORSHIP",
      project: "nyc-artist-coalition",
      question: "What public-safe evidence can corroborate Jamie's establishment of the project accounts and the later collaborator stewardship of their shared identities?",
      methods: [
        "Captured Jamie's participant-memory statement separately from public profile facts.",
        "Reviewed public account join dates, campaign bios, cross-platform links, and sustained collaborator mentions without inferring administrator history.",
        "Flagged collaborator notes or a public-safe administrative export as the appropriate next evidence layer."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: [
        "Jamie states that he established the project accounts as identity systems for shared use.",
        "The public record supports durable shared identity and sustained collaborator participation.",
        "The public record does not expose creator, administrator, access, handoff, or individual-post authorship history."
      ],
      limitations: [
        "Participant memory is not a platform-administration record.",
        "External collaborator mentions do not prove access to or authorship from a shared account.",
        "Any administrative export must be minimized so private account, security, and personal data remain outside the public repository."
      ],
      sourceIds: ["SRC-X-PROFILE-NYCARTC", "SRC-X-AUDIT-NYCAC-ENGAGEMENT-2026-07-14"],
      publicSummary: "Jamie confirms establishing the project accounts, while shared-account authorship and handoff remain held until collaborator or minimized administrative evidence is available."
    }
  ]
};
