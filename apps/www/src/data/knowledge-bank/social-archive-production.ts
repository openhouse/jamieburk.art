import type {
  ClaimRecord,
  IntakeItem,
  ProjectRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const socialArchiveProjects = [
  {
    id: "wowlist",
    title: "WOW List",
    summary: "A community-authored calendar and public identity system for discovering independent cultural activity across local scenes.",
    status: "historical",
    period: { start: "2014", end: "2017" },
    entityIds: [],
    publicSurfaceCandidates: ["/work/wowlist"],
    photoResearchPrompts: [
      "Member meetings, calendar interfaces, contributor workflows, and public posts that demonstrate community authorship without treating followers or reposts as impact by themselves."
    ]
  },
  {
    id: "196-sunday-dinner",
    title: "196 Artists Residency and Sunday Dinner",
    summary: "Long-running hospitality, residency, gathering, and artist-support practices with substantial private operational and audiovisual archives.",
    status: "ongoing",
    period: { start: "2009" },
    entityIds: [],
    publicSurfaceCandidates: ["/work/196-sunday-dinner"],
    photoResearchPrompts: [
      "Rights-reviewed gathering, residency, onboarding, installation, and shared-meal records that show the operating practice without exposing access instructions or unapproved participants."
    ]
  },
  {
    id: "personal-public-record",
    title: "Jamie Burkart Public Project Record",
    summary: "Jamie's personal public social-media record as a discovery surface for project chronology, source leads, and cross-project lineages.",
    status: "research",
    period: { start: "2006", end: "2023" },
    entityIds: [],
    publicSurfaceCandidates: [],
    photoResearchPrompts: [
      "Use linked project posts only as research leads; inspect original artifacts and collaborator rights before selecting media or composing public claims."
    ]
  }
] satisfies ProjectRecord[];

export const socialArchiveIntakes = [
  {
    id: "INT-2026-07-14-X-URBANHERMIT-POPULATION",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "A reconciled research corpus of the 434 records currently counted on Jamie's public X profile, retained outside the repository.",
    projectIds: ["personal-public-record"],
    entityIds: [],
    dateHints: ["2008-10-04", "2023-04-17"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: [
      "SRC-X-URBANHERMIT-PROFILE-2026",
      "SRC-X-URBANHERMIT-CORPUS-2026",
      "SRC-X-URBANHERMIT-DIY-SAFETY-2016",
      "SRC-X-URBANHERMIT-HORSE-LORDS-2016",
      "SRC-X-URBANHERMIT-CABARET-REPEAL-2017",
      "SRC-X-URBANHERMIT-LET-NYC-DANCE-2017",
      "SRC-X-URBANHERMIT-SAVE-NYC-SPACES-2017",
      "SRC-X-URBANHERMIT-TALKS-NOT-RAIDS-2019",
      "SRC-X-URBANHERMIT-WOWLIST-KC-2015",
      "SRC-X-URBANHERMIT-SUNDAY-DINNER-2015",
      "SRC-X-URBANHERMIT-GREAT-ACCOMMODATIONS",
      "SRC-X-URBANHERMIT-MUSIC-HACKATHON-2012"
    ],
    claimIds: ["CLM-X-URBANHERMIT-CURRENT-POPULATION", "CLM-X-URBANHERMIT-PROJECT-LINEAGES"],
    inquiryIds: [],
    protectedLocatorId: "SOCIAL-X-URBANHERMIT-CORPUS-2026-001"
  },
  {
    id: "INT-2026-07-14-X-WOWLIST-POPULATION",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "A reconciled research corpus of all 38 records currently counted on the public WOW List X profile, retained outside the repository.",
    projectIds: ["wowlist"],
    entityIds: [],
    dateHints: ["2014-02-12", "2017-01-12"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-X-WOWLIST-PROFILE-2026", "SRC-X-WOWLIST-CORPUS-2026"],
    claimIds: ["CLM-X-WOWLIST-CURRENT-POPULATION"],
    inquiryIds: [],
    protectedLocatorId: "SOCIAL-X-WOWLIST-CORPUS-2026-001"
  },
  {
    id: "INT-2026-07-14-X-CALLNYC-POPULATION",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "A research corpus containing 107 retrievable records from the 110 currently counted on the public CallNYC X profile.",
    projectIds: ["callnyc"],
    entityIds: [],
    dateHints: ["2016-03-05", "2016-11-14"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-X-CALLNYC-PROFILE-2026", "SRC-X-CALLNYC-CORPUS-2026"],
    claimIds: [],
    inquiryIds: ["INQ-X-CALLNYC-POPULATION-GAP"],
    protectedLocatorId: "SOCIAL-X-CALLNYC-CORPUS-2026-001"
  },
  {
    id: "INT-2026-07-14-X-CALLNYC-COUNCIL-AMPLIFICATION",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "Four 2016 posts in which then-serving New York City Council members publicly quote-posted a CallNYC result or shared CallNYC.org.",
    submittedUrl: "https://x.com/CMMathieuEugene/status/783305320508514304",
    projectIds: ["callnyc"],
    entityIds: [],
    dateHints: ["2016-05-18", "2016-05-19", "2016-09-27", "2016-10-04"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: [
      "SRC-X-CALLNYC-CMMATHIEU-QUOTE-2016",
      "SRC-X-CALLNYC-HELEN-ROSENTHAL-SHARE-2016",
      "SRC-X-CALLNYC-ROSIE-MENDEZ-QUOTE-2016",
      "SRC-X-CALLNYC-YDANIS-QUOTE-2016",
      "SRC-NYC-COUNCIL-MATHIEU-EUGENE-PERSON",
      "SRC-NYC-COUNCIL-HELEN-ROSENTHAL-PERSON",
      "SRC-NYC-COUNCIL-ROSIE-MENDEZ-PERSON",
      "SRC-NYC-COUNCIL-YDANIS-RODRIGUEZ-PERSON"
    ],
    claimIds: ["CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-X-KC-TOWN-HALL-POPULATION",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "A reconciled research corpus of all 183 records currently counted on the public KC Town Hall X profile, retained outside the repository.",
    projectIds: ["kc-town-hall", "tired-of-tires"],
    entityIds: [],
    dateHints: ["2018-07-02", "2022-09-24"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-X-KC-TOWN-HALL-PROFILE-2026", "SRC-X-KC-TOWN-HALL-CORPUS-2026"],
    claimIds: ["CLM-X-KC-TOWN-HALL-OPERATING-COMMUNICATION"],
    inquiryIds: [],
    protectedLocatorId: "SOCIAL-X-KC-TOWN-HALL-CORPUS-2026-001"
  },
  {
    id: "INT-2026-07-14-X-KC-TOWN-HALL-OFFICIAL-RESPONSE",
    kind: "url",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "Public responses by Kansas City Council members to KC Town Hall's April 2019 Leon's Thriftway alert.",
    submittedUrl: "https://x.com/QuintonLucasKC/status/1122866432130334720",
    projectIds: ["kc-town-hall"],
    entityIds: [],
    dateHints: ["2019-04-29"],
    sensitivity: "public-safe",
    availability: "live",
    status: "promoted",
    sourceIds: ["SRC-X-KC-TOWN-HALL-QUINTON-LUCAS-QUOTE-2019", "SRC-X-KC-TOWN-HALL-JOLIE-JUSTUS-REPLY-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-ELECTED-OFFICIAL-RESPONSE"],
    inquiryIds: []
  },
  {
    id: "INT-2026-07-14-X-NYCARTC-POPULATION",
    kind: "artifact",
    capturedAt: "2026-07-14",
    submittedBy: "Codex authenticated archival production",
    publicSafeDescription: "A partial 748-record research corpus from the 5,124 records currently counted on the public NYC Artist Coalition X profile.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017-02", "2026-05"],
    sensitivity: "private-reference",
    availability: "local-private",
    status: "promoted",
    sourceIds: ["SRC-X-NYCARTC-PROFILE-2026", "SRC-X-NYCARTC-PARTIAL-CORPUS-2026"],
    claimIds: ["CLM-X-NYCARTC-CAMPAIGN-IDENTITY", "CLM-X-NYCARTC-POPULATION-NOT-RECOVERED"],
    inquiryIds: ["INQ-X-NYCARTC-FULL-POPULATION"],
    protectedLocatorId: "SOCIAL-X-NYCARTC-PARTIAL-CORPUS-2026-001"
  },
  {
    id: "INT-2026-07-14-X-NYCARTC-ACCOUNT-ESTABLISHMENT-MEMORY",
    kind: "memory",
    capturedAt: "2026-07-14",
    submittedBy: "Jamie Burkart",
    publicSafeDescription: "Jamie's memory that he established the NYC Artist Coalition account and project identity, which later supported excellent multi-author publishing by collaborators including Olympia Kazi.",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["nyc-artist-coalition"],
    dateHints: ["2017 onward"],
    sensitivity: "public-safe",
    availability: "unknown",
    status: "deferred",
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-X-NYCARTC-ACCOUNT-ESTABLISHMENT"],
    dispositionReason: "Retained as a research lead until account-administration records or collaborator confirmation can support role and multi-author boundaries."
  }
] satisfies IntakeItem[];

const publicProfileSources = [
  {
    id: "SRC-X-URBANHERMIT-PROFILE-2026",
    title: "Jamie Burkart (@urbanhermit) public X profile",
    organization: "X",
    kind: "project-archive",
    canonicalUrl: "https://x.com/urbanhermit",
    projectIds: ["personal-public-record"],
    intakeIds: ["INT-2026-07-14-X-URBANHERMIT-POPULATION"],
    publicNote: "Profile counted 434 posts at the July 14, 2026 capture.",
    supportsGenerally: ["current profile identity", "current displayed post count", "current public project links"],
    doesNotEstablish: ["the number of posts removed before capture", "the truth of every historical post", "sole authorship of linked collective projects"]
  },
  {
    id: "SRC-X-WOWLIST-PROFILE-2026",
    title: "WOW List (@wowlist) public X profile",
    organization: "WOW List",
    kind: "institutional-social-post",
    canonicalUrl: "https://x.com/wowlist",
    projectIds: ["wowlist"],
    intakeIds: ["INT-2026-07-14-X-WOWLIST-POPULATION"],
    publicNote: "Profile counted 38 posts at the July 14, 2026 capture.",
    supportsGenerally: ["project account identity", "current displayed post count", "public project description"],
    doesNotEstablish: ["historic follower counts", "event attendance or product reach", "authorship of every account post"]
  },
  {
    id: "SRC-X-CALLNYC-PROFILE-2026",
    title: "Call NYC (@CallNYCapp) public X profile",
    organization: "CallNYC",
    kind: "institutional-social-post",
    canonicalUrl: "https://x.com/CallNYCapp",
    projectIds: ["callnyc"],
    intakeIds: ["INT-2026-07-14-X-CALLNYC-POPULATION"],
    publicNote: "Profile counted 110 posts and described CallNYC as a constituent-services open-data project at the July 14, 2026 capture.",
    supportsGenerally: ["project account identity", "current displayed post count", "public project description"],
    doesNotEstablish: ["availability of three unretrieved posts", "official Council ownership", "accuracy of every ranking"]
  },
  {
    id: "SRC-X-KC-TOWN-HALL-PROFILE-2026",
    title: "KC Town Hall (@KCTownHall) public X profile",
    organization: "KC Town Hall",
    kind: "institutional-social-post",
    canonicalUrl: "https://x.com/KCTownHall",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-X-KC-TOWN-HALL-POPULATION"],
    publicNote: "Profile counted 183 posts at the July 14, 2026 capture.",
    supportsGenerally: ["project account identity", "current displayed post count", "public neighborhood-resource framing"],
    doesNotEstablish: ["independent verification of account-reported tire or fee totals", "sole authorship of posts", "final project disposition"]
  },
  {
    id: "SRC-X-NYCARTC-PROFILE-2026",
    title: "NYC Artist Coalition (@NYCArtC) public X profile",
    organization: "NYC Artist Coalition",
    kind: "institutional-social-post",
    canonicalUrl: "https://x.com/NYCArtC",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-X-NYCARTC-POPULATION"],
    publicNote: "Profile counted 5,124 posts and named Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC in its public identity at the July 14, 2026 capture.",
    supportsGenerally: ["coalition account identity", "current displayed post count", "four named campaign identities"],
    doesNotEstablish: ["Jamie's account-administration role", "authorship of individual posts", "a complete historical account corpus"]
  }
] as const;

export const socialArchiveSources = [
  ...publicProfileSources.map((source) => ({
    ...source,
    projectIds: [...source.projectIds],
    intakeIds: [...source.intakeIds],
    supportsGenerally: [...source.supportsGenerally],
    doesNotEstablish: [...source.doesNotEstablish],
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14",
    preferredPublicUrl: "canonical" as const,
    publicCitation: `${source.title}, accessed July 14, 2026.`,
    locator: "Profile header, bio, post count, and account timeline.",
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  })),
  {
    id: "SRC-X-URBANHERMIT-CORPUS-2026",
    title: "Authenticated @urbanhermit full current-population research corpus",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Authenticated archival review of Jamie Burkart's currently displayed X population, July 14, 2026.",
    publicNote: "Reconciled 434 of 434 currently counted records: 353 authored posts and 81 reposts, spanning October 2008 through April 2023.",
    locator: "Authenticated Posts and Replies views, deduplicated by status URL and reconciled to the displayed profile count.",
    projectIds: ["personal-public-record"],
    intakeIds: ["INT-2026-07-14-X-URBANHERMIT-POPULATION"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["current population reconciliation", "authored-versus-reposted counts", "mission-relevant source and project-lineage discovery"],
    doesNotEstablish: ["posts removed before capture", "independent corroboration of self-published claims", "permission to publish unrelated personal material"],
    protectedLocatorId: "SOCIAL-X-URBANHERMIT-CORPUS-2026-001"
  },
  {
    id: "SRC-X-WOWLIST-CORPUS-2026",
    title: "Authenticated @wowlist full current-population research corpus",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Authenticated archival review of WOW List's currently displayed X population, July 14, 2026.",
    publicNote: "Reconciled all 38 currently counted records: 22 authored posts and 16 reposts, spanning February 2014 through January 2017.",
    locator: "Authenticated Posts and Replies views, deduplicated by status URL and reconciled to the displayed profile count.",
    projectIds: ["wowlist"],
    intakeIds: ["INT-2026-07-14-X-WOWLIST-POPULATION"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["current population reconciliation", "authored-versus-reposted counts", "seventeen direct links to wowlist.org in the current corpus"],
    doesNotEstablish: ["historic audience size", "site-wide event or member totals", "authorship of reposted material"],
    protectedLocatorId: "SOCIAL-X-WOWLIST-CORPUS-2026-001"
  },
  {
    id: "SRC-X-CALLNYC-CORPUS-2026",
    title: "Authenticated @CallNYCApp partial current-population research corpus",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Authenticated archival review of the currently retrievable CallNYC X population, July 14, 2026.",
    publicNote: "Recovered 107 of 110 currently counted records: 92 authored posts and 15 reposts; three profile-counted records remain unavailable.",
    locator: "Authenticated Posts, Replies, and live from-account search views, deduplicated by status URL.",
    projectIds: ["callnyc"],
    intakeIds: ["INT-2026-07-14-X-CALLNYC-POPULATION"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["107-record retrievable corpus", "authored-versus-reposted counts", "source-link and stakeholder-response discovery"],
    doesNotEstablish: ["the contents or status of three unavailable posts", "complete historic engagement identities", "official Council ownership"],
    protectedLocatorId: "SOCIAL-X-CALLNYC-CORPUS-2026-001"
  },
  {
    id: "SRC-X-KC-TOWN-HALL-CORPUS-2026",
    title: "Authenticated @KCTownHall full current-population research corpus",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Authenticated archival review of KC Town Hall's currently displayed X population, July 14, 2026.",
    publicNote: "Reconciled all 183 currently counted records: 142 authored posts, 13 replies, and 28 reposts, spanning July 2018 through September 2022.",
    locator: "Authenticated Posts and Replies views, deduplicated by status URL and reconciled to the displayed profile count.",
    projectIds: ["kc-town-hall", "tired-of-tires"],
    intakeIds: ["INT-2026-07-14-X-KC-TOWN-HALL-POPULATION"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["current population reconciliation", "authored, reply, and repost counts", "107 records containing the TiredOfTires hashtag"],
    doesNotEstablish: ["independent verification of account-reported program metrics", "that mentions were replies or endorsements", "sole authorship of a multi-author account"],
    protectedLocatorId: "SOCIAL-X-KC-TOWN-HALL-CORPUS-2026-001"
  },
  {
    id: "SRC-X-NYCARTC-PARTIAL-CORPUS-2026",
    title: "Authenticated @NYCArtC partial-population research corpus",
    organization: "Codex archival production",
    kind: "research-run",
    visibility: "private",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    publicCitation: "Authenticated partial archival review of NYC Artist Coalition's X record, July 14, 2026.",
    publicNote: "Recovered 748 unique records from the 5,124 currently counted on the profile; the result is explicitly incomplete.",
    locator: "Authenticated profile timeline plus month-bounded live searches; deduplicated by status URL.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-14-X-NYCARTC-POPULATION"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["partial 748-record recovery", "profile-cursor and rate-limit boundaries", "source and campaign-identity discovery within the recovered subset"],
    doesNotEstablish: ["full-population findings", "historic engagement totals", "Jamie's authorship or administration of every post"],
    protectedLocatorId: "SOCIAL-X-NYCARTC-PARTIAL-CORPUS-2026-001"
  },
  ...[
    {
      id: "SRC-X-URBANHERMIT-DIY-SAFETY-2016",
      title: "Jamie Burkart post sharing a DIY-space safety call and script",
      canonicalUrl: "https://x.com/urbanhermit/status/807395049814290433",
      publishedAt: "2016-12-10",
      projectIds: ["nyc-artist-coalition"],
      publicNote: "Jamie shared a public call and script for DIY-space safety organizing after the Ghost Ship fire."
    },
    {
      id: "SRC-X-URBANHERMIT-HORSE-LORDS-2016",
      title: "Jamie Burkart post sharing the Horse Lords Truthers video and NPR coverage",
      canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
      publishedAt: "2016-04-29",
      projectIds: ["creative-technical-systems"],
      publicNote: "Jamie linked the Horse Lords 'Truthers' video and contemporaneous NPR publication."
    },
    {
      id: "SRC-X-URBANHERMIT-CABARET-REPEAL-2017",
      title: "Jamie Burkart post marking repeal of the New York City Cabaret Law",
      canonicalUrl: "https://x.com/urbanhermit/status/936792273349591040",
      publishedAt: "2017-12-02",
      projectIds: ["nyc-artist-coalition"],
      publicNote: "Jamie publicly marked the 2017 Cabaret Law repeal in the context of coalition advocacy."
    },
    {
      id: "SRC-X-URBANHERMIT-LET-NYC-DANCE-2017",
      title: "Jamie Burkart post linking Let NYC Dance",
      canonicalUrl: "https://x.com/urbanhermit/status/883158445507174401",
      publishedAt: "2017-07-07",
      projectIds: ["nyc-artist-coalition"],
      publicNote: "Jamie linked the Let NYC Dance campaign during its public Cabaret Law repeal work."
    },
    {
      id: "SRC-X-URBANHERMIT-SAVE-NYC-SPACES-2017",
      title: "Jamie Burkart post sharing Save NYC Spaces media",
      canonicalUrl: "https://x.com/urbanhermit/status/935949284205359105",
      publishedAt: "2017-11-29",
      projectIds: ["nyc-artist-coalition"],
      publicNote: "Jamie shared a Save NYC Spaces campaign video through his personal account."
    },
    {
      id: "SRC-X-URBANHERMIT-TALKS-NOT-RAIDS-2019",
      title: "Jamie Burkart post linking Talks Not Raids",
      canonicalUrl: "https://x.com/urbanhermit/status/1098259100255825920",
      publishedAt: "2019-02-20",
      projectIds: ["nyc-artist-coalition"],
      publicNote: "Jamie linked the public Talks Not Raids campaign site during its transparency and notice work."
    },
    {
      id: "SRC-X-URBANHERMIT-WOWLIST-KC-2015",
      title: "Jamie Burkart post linking a WOW List Kansas City listing",
      canonicalUrl: "https://x.com/urbanhermit/status/591944013768499200",
      publishedAt: "2015-04-25",
      projectIds: ["wowlist"],
      publicNote: "Jamie shared a Kansas City cultural listing through WOW List's public project surface."
    },
    {
      id: "SRC-X-URBANHERMIT-SUNDAY-DINNER-2015",
      title: "Jamie Burkart post linking a Sunday Dinner listing on WOW List",
      canonicalUrl: "https://x.com/urbanhermit/status/592718356018556928",
      publishedAt: "2015-04-27",
      projectIds: ["196-sunday-dinner", "wowlist"],
      publicNote: "Jamie shared a Sunday Dinner listing through WOW List, preserving a connection between the gathering and calendar practices."
    },
    {
      id: "SRC-X-URBANHERMIT-GREAT-ACCOMMODATIONS",
      title: "Jamie Burkart post linking Great Accommodations",
      canonicalUrl: "https://x.com/urbanhermit/status/4038299524",
      projectIds: ["water-publics"],
      publicNote: "An early personal-account post links the Great Accommodations river-city program."
    },
    {
      id: "SRC-X-URBANHERMIT-MUSIC-HACKATHON-2012",
      title: "Jamie Burkart post about the Monthly Music Hackathon",
      canonicalUrl: "https://x.com/urbanhermit/status/281440649285361664",
      publishedAt: "2012-12-19",
      projectIds: ["creative-technical-systems"],
      publicNote: "Jamie posted about the Monthly Music Hackathon before the February 2013 audio-sorting prototype record."
    }
  ].map((source) => ({
    ...source,
    organization: "Jamie Burkart",
    kind: "project-archive" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14",
    preferredPublicUrl: "canonical" as const,
    publicCitation: `${source.title}${source.publishedAt ? `, ${source.publishedAt}` : ""}.`,
    locator: "Post text and linked public project or publication.",
    intakeIds: ["INT-2026-07-14-X-URBANHERMIT-POPULATION"],
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["personal-account project chronology", "discovery of a linked public source or project surface"],
    doesNotEstablish: ["independent verification of the linked project's outcomes", "sole authorship of collective work", "complete engagement or audience reach"]
  })),
  ...[
    {
      id: "SRC-X-CALLNYC-CMMATHIEU-QUOTE-2016",
      title: "Mathieu Eugene quote-post of CallNYC housing-lottery result",
      canonicalUrl: "https://x.com/CMMathieuEugene/status/783305320508514304",
      publishedAt: "2016-10-04",
      publicNote: "Dr. Mathieu Eugene quote-posted CallNYC's HPD Housing Lottery result and framed it as constituent opportunity work."
    },
    {
      id: "SRC-X-CALLNYC-HELEN-ROSENTHAL-SHARE-2016",
      title: "Helen Rosenthal post sharing CallNYC.org",
      canonicalUrl: "https://x.com/HelenRosenthal/status/780797474277511170",
      publishedAt: "2016-09-27",
      publicNote: "Helen Rosenthal directly shared CallNYC.org while describing Council offices as a source of help."
    },
    {
      id: "SRC-X-CALLNYC-ROSIE-MENDEZ-QUOTE-2016",
      title: "Rosie Mendez quote-post of CallNYC emergency-repairs result",
      canonicalUrl: "https://x.com/RosieMendez/status/733410096915550208",
      publishedAt: "2016-05-19",
      publicNote: "Rosie Mendez quote-posted CallNYC's Emergency Repairs result and thanked her team."
    },
    {
      id: "SRC-X-CALLNYC-YDANIS-QUOTE-2016",
      title: "Ydanis Rodriguez quote-post of CallNYC rent-overcharges result",
      canonicalUrl: "https://x.com/ydanis/status/733089563334299648",
      publishedAt: "2016-05-18",
      publicNote: "Ydanis Rodriguez quote-posted CallNYC's Rent Overcharges result and described tenant-rights service."
    }
  ].map((source) => ({
    ...source,
    organization: "X",
    kind: "institutional-social-post" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14",
    preferredPublicUrl: "canonical" as const,
    publicCitation: `${source.title}, ${source.publishedAt}.`,
    locator: "Post text and quoted CallNYC card, where present.",
    projectIds: ["callnyc"],
    intakeIds: ["INT-2026-07-14-X-CALLNYC-COUNCIL-AMPLIFICATION"],
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["public amplification of a specific CallNYC result or CallNYC.org"],
    doesNotEstablish: ["offline use", "constituent outcomes", "endorsement of every CallNYC ranking"]
  })),
  ...[
    {
      id: "SRC-NYC-COUNCIL-MATHIEU-EUGENE-PERSON",
      title: "New York City Council person record for Mathieu Eugene",
      canonicalUrl: "https://legistar.council.nyc.gov/PersonDetail.aspx?GUID=85547957-036D-4800-99E4-6A86D110734E&ID=34620",
      publicNote: "Official Council record identifies Mathieu Eugene as the District 40 Council Member."
    },
    {
      id: "SRC-NYC-COUNCIL-HELEN-ROSENTHAL-PERSON",
      title: "New York City Council person record for Helen Rosenthal",
      canonicalUrl: "https://nyc.int.legistar.com/PersonDetail.aspx?GUID=741DC867-90F7-4F16-917E-1169F5BC75A7&ID=3443",
      publicNote: "Official Council record identifies Helen Rosenthal as the District 6 Council Member elected in 2013."
    },
    {
      id: "SRC-NYC-COUNCIL-ROSIE-MENDEZ-PERSON",
      title: "New York City Council person record for Rosie Mendez",
      canonicalUrl: "https://legistar.council.nyc.gov/PersonDetail.aspx?GUID=81BEA02C-AEC7-4B4B-AAED-E765FE87BF40&ID=34492",
      publicNote: "Official Council record identifies Rosie Mendez as District 2 Council Member from 2006 through 2017."
    },
    {
      id: "SRC-NYC-COUNCIL-YDANIS-RODRIGUEZ-PERSON",
      title: "New York City Council person record for Ydanis Rodriguez",
      canonicalUrl: "https://legistar.council.nyc.gov/PersonDetail.aspx?GUID=2357CC08-0EE6-4325-90B0-4F8CD700BC96&ID=38927",
      publicNote: "Official Council record identifies Ydanis Rodriguez as the District 10 Council Member."
    }
  ].map((source) => ({
    ...source,
    organization: "New York City Council",
    kind: "government-record" as const,
    visibility: "public" as const,
    preservationStatus: "live" as const,
    accessedAt: "2026-07-14",
    preferredPublicUrl: "canonical" as const,
    publicCitation: `${source.title}, accessed July 14, 2026.`,
    locator: "Person details and Council-member description.",
    projectIds: ["callnyc"],
    intakeIds: ["INT-2026-07-14-X-CALLNYC-COUNCIL-AMPLIFICATION"],
    reviewStatus: "reviewed" as const,
    reviewDepth: "close-reading" as const,
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex public-record review"],
    supportsGenerally: ["Council-member identity and tenure context for the 2016 social post"],
    doesNotEstablish: ["engagement with CallNYC by itself"]
  })),
  {
    id: "SRC-X-KC-TOWN-HALL-QUINTON-LUCAS-QUOTE-2019",
    title: "Quinton Lucas quote-post responding to KC Town Hall's Leon's Thriftway alert",
    organization: "X",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-04-29",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/QuintonLucasKC/status/1122866432130334720",
    preferredPublicUrl: "canonical",
    publicCitation: "Quinton Lucas, quote-post responding to KC Town Hall, April 29, 2019.",
    publicNote: "Lucas quote-posted KC Town Hall's alert, reported speaking with ownership, and described the store as important to community food access.",
    locator: "Post text and quoted KC Town Hall card.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-X-KC-TOWN-HALL-OFFICIAL-RESPONSE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["public elected-official response to the KC Town Hall alert"],
    doesNotEstablish: ["that the store remained open", "a formal City commitment", "causality beyond the public exchange"]
  },
  {
    id: "SRC-X-KC-TOWN-HALL-JOLIE-JUSTUS-REPLY-2019",
    title: "Jolie Justus reply in KC Town Hall's Leon's Thriftway thread",
    organization: "X",
    kind: "institutional-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-04-29",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/joliejustus/status/1122883010582466560",
    preferredPublicUrl: "canonical",
    publicCitation: "Jolie Justus, reply to KC Town Hall, April 29, 2019.",
    publicNote: "Justus replied to KC Town Hall and others that work with the Economic Development Corporation on possible solutions was underway.",
    locator: "Reply context and post text.",
    projectIds: ["kc-town-hall"],
    intakeIds: ["INT-2026-07-14-X-KC-TOWN-HALL-OFFICIAL-RESPONSE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"],
    supportsGenerally: ["public elected-official response in the KC Town Hall thread"],
    doesNotEstablish: ["that the store remained open", "a formal City commitment", "causality beyond the public exchange"]
  }
] satisfies SourceRecord[];

export const socialArchiveClaims = [
  {
    id: "CLM-X-URBANHERMIT-CURRENT-POPULATION",
    project: "personal-public-record",
    claimType: "metric",
    internalClaim: "The complete population currently counted on @urbanhermit reconciled to 434 records: 353 authored posts and 81 reposts.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      { sourceId: "SRC-X-URBANHERMIT-PROFILE-2026", relationship: "direct-support", supports: ["displayed 434-post population"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-URBANHERMIT-CORPUS-2026", relationship: "private-support", supports: ["434-record reconciliation", "353 authored posts", "81 reposts"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Current-profile completeness does not recover posts removed before capture and is not a public impact metric."],
    antiClaims: ["Jamie published only 434 posts since joining X or every post is professional evidence."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-X-URBANHERMIT-PROJECT-LINEAGES",
    project: "personal-public-record",
    claimType: "activity",
    internalClaim: "The current @urbanhermit corpus preserves public leads across Jamie's river practice, Sunday Dinner, WOW List, creative-technical work, NYC Artist Coalition campaigns, CallNYC, and KC Town Hall.",
    status: "use-with-care",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [{ sourceId: "SRC-X-URBANHERMIT-CORPUS-2026", relationship: "private-support", supports: ["cross-project chronology", "posted URLs", "source-discovery leads"], confidence: "high", renderCitation: false }],
    boundaries: ["Personal posts are discovery leads; stronger project claims require the linked original or independent record."],
    antiClaims: ["Jamie's personal X corpus independently proves every project outcome or collaborator role."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-X-WOWLIST-CURRENT-POPULATION",
    project: "wowlist",
    claimType: "metric",
    internalClaim: "The complete population currently counted on @wowlist reconciled to 38 records: 22 authored posts and 16 reposts; 17 records directly link to wowlist.org.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      { sourceId: "SRC-X-WOWLIST-PROFILE-2026", relationship: "direct-support", supports: ["displayed 38-post population"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-WOWLIST-CORPUS-2026", relationship: "private-support", supports: ["population reconciliation", "authored and repost counts", "direct project-domain links"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["This is a current-account inventory, not a measure of WOW List's users, scenes, events, or site reach."],
    antiClaims: ["The X account reached only 38 people or documents the full WOW List product population."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
    project: "callnyc",
    claimType: "outcome",
    internalClaim: "At least four then-serving New York City Council member accounts publicly amplified CallNYC in 2016: Mathieu Eugene, Helen Rosenthal, Rosie Mendez, and Ydanis Rodriguez.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "candidate",
    projections: [{ key: "archive-note", text: "At least four then-serving Council member accounts publicly amplified CallNYC in 2016 by quote-posting a project result or directly sharing CallNYC.org.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: [
      { sourceId: "SRC-X-CALLNYC-CMMATHIEU-QUOTE-2016", relationship: "direct-support", supports: ["Mathieu Eugene quote-post"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-HELEN-ROSENTHAL-SHARE-2016", relationship: "direct-support", supports: ["Helen Rosenthal direct share"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-ROSIE-MENDEZ-QUOTE-2016", relationship: "direct-support", supports: ["Rosie Mendez quote-post"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-CALLNYC-YDANIS-QUOTE-2016", relationship: "direct-support", supports: ["Ydanis Rodriguez quote-post"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-COUNCIL-MATHIEU-EUGENE-PERSON", relationship: "corroborating", supports: ["Council-member identity"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-COUNCIL-HELEN-ROSENTHAL-PERSON", relationship: "corroborating", supports: ["Council-member identity"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-COUNCIL-ROSIE-MENDEZ-PERSON", relationship: "corroborating", supports: ["Council-member identity and 2016 tenure"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-NYC-COUNCIL-YDANIS-RODRIGUEZ-PERSON", relationship: "corroborating", supports: ["Council-member identity"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The count covers recovered public quote-posts and direct shares, not likes, private analytics, offline use, or a complete engagement roster."],
    antiClaims: ["Four Council members formally endorsed every CallNYC ranking or the Council adopted CallNYC as an official product."],
    researchInquiryIds: ["INQ-X-CALLNYC-POPULATION-GAP"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-X-KC-TOWN-HALL-OPERATING-COMMUNICATION",
    project: "kc-town-hall",
    claimType: "activity",
    internalClaim: "The complete current @KCTownHall corpus contains 183 records from 2018-2022, including 107 using #TiredOfTires as a recurring public service and operations channel.",
    status: "confirmed-with-boundary",
    publicationStatus: "internal-only",
    editorialStatus: "candidate",
    projections: [],
    evidence: [
      { sourceId: "SRC-X-KC-TOWN-HALL-PROFILE-2026", relationship: "direct-support", supports: ["displayed 183-post population"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KC-TOWN-HALL-CORPUS-2026", relationship: "private-support", supports: ["183-record reconciliation", "2018-2022 chronology", "107 TiredOfTires-tagged records"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The recurring communication pattern is confirmed; account-reported tire and fee totals still require operational or independent corroboration."],
    antiClaims: ["Every TiredOfTires post represents a separate pickup or independently verified outcome."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-ELECTED-OFFICIAL-RESPONSE",
    project: "kc-town-hall",
    claimType: "outcome",
    internalClaim: "KC Town Hall's April 2019 Leon's Thriftway alert received public responses from Council members Quinton Lucas and Jolie Justus about ownership contact, food access, and possible economic-development solutions.",
    status: "confirmed-with-boundary",
    publicationStatus: "qualified",
    editorialStatus: "unused",
    projections: [{ key: "archive-note", text: "An April 2019 KC Town Hall alert about Leon's Thriftway drew public responses from Council members Quinton Lucas and Jolie Justus about ownership contact, food access, and possible economic-development solutions.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: [
      { sourceId: "SRC-X-KC-TOWN-HALL-QUINTON-LUCAS-QUOTE-2019", relationship: "direct-support", supports: ["quote-post response", "ownership-contact statement", "food-access framing"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-KC-TOWN-HALL-JOLIE-JUSTUS-REPLY-2019", relationship: "direct-support", supports: ["thread reply", "possible-solutions statement", "Economic Development Corporation reference"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The exchange demonstrates public response, not a formal commitment, preservation outcome, or causality beyond the thread."],
    antiClaims: ["KC Town Hall's alert kept Leon's Thriftway open or secured City funding."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-X-NYCARTC-CAMPAIGN-IDENTITY",
    project: "nyc-artist-coalition",
    claimType: "activity",
    internalClaim: "The NYC Artist Coalition X profile presents Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC as related campaign identities under the coalition's public voice.",
    status: "confirmed-with-boundary",
    publicationStatus: "public",
    editorialStatus: "unused",
    projections: [{ key: "archive-note", text: "NYC Artist Coalition's public account connects Save NYC Spaces, Let NYC Dance, Talks Not Raids, and Fair Rent NYC under one coalition identity.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: [{ sourceId: "SRC-X-NYCARTC-PROFILE-2026", relationship: "direct-support", supports: ["profile identity", "four named campaign hashtags"], confidence: "high", renderCitation: false }],
    boundaries: ["The profile supports a collective campaign identity, not individual authorship or administration of every account post."],
    antiClaims: ["Jamie alone authored the account or every campaign represented by it."],
    researchInquiryIds: ["INQ-X-NYCARTC-ACCOUNT-ESTABLISHMENT"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  },
  {
    id: "CLM-X-NYCARTC-POPULATION-NOT-RECOVERED",
    project: "nyc-artist-coalition",
    claimType: "negative-research-finding",
    internalClaim: "A complete current-population corpus for @NYCArtC was not recovered: 748 of 5,124 profile-counted records were captured before timeline and rate-limit boundaries intervened.",
    status: "not-recovered",
    publicationStatus: "internal-only",
    editorialStatus: "unused",
    projections: [],
    evidence: [
      { sourceId: "SRC-X-NYCARTC-PROFILE-2026", relationship: "direct-support", supports: ["displayed 5,124-post population"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-X-NYCARTC-PARTIAL-CORPUS-2026", relationship: "private-support", supports: ["748-record recovery", "cursor and rate-limit boundary"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["The negative finding concerns this retrieval method, not whether the unrecovered posts still exist."],
    antiClaims: ["The 748-record subset is the full @NYCArtC population or supports population-wide engagement statistics."],
    researchInquiryIds: ["INQ-X-NYCARTC-FULL-POPULATION"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex authenticated archival review"]
  }
] satisfies ClaimRecord[];

export const socialArchiveResearchInquiries = [
  {
    id: "INQ-X-CALLNYC-POPULATION-GAP",
    project: "callnyc",
    intakeIds: ["INT-2026-07-14-X-CALLNYC-POPULATION"],
    question: "Can the three records counted by the @CallNYCApp profile but unavailable in Posts, Replies, and live search be recovered?",
    methods: ["Crawled authenticated Posts and Replies views with small incremental scrolls.", "Ran an authenticated live from-account search.", "Deduplicated by status URL and checked recovered Wayback status URLs against the corpus."],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: ["Recovered 107 unique records from the profile's displayed 110-post population.", "The recovered corpus includes 92 authored posts and 15 reposts.", "All three status IDs found in the bounded Wayback CDX search were already present in the recovered corpus."],
    limitations: ["Three profile-counted records remain unavailable and may be deleted, withheld, or count drift.", "Public timeline views do not expose complete liker and private-analytics identities.", "The gap prevents a literal 100-percent historical-population claim."],
    sourceIds: ["SRC-X-CALLNYC-PROFILE-2026", "SRC-X-CALLNYC-CORPUS-2026"],
    publicSummary: "Recovered 107 of 110 currently counted CallNYC records; three remain unavailable.",
    protectedLocatorId: "SOCIAL-X-CALLNYC-CORPUS-2026-001"
  },
  {
    id: "INQ-X-NYCARTC-FULL-POPULATION",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-14-X-NYCARTC-POPULATION"],
    question: "Can all 5,124 records currently counted on @NYCArtC be recovered and reconciled?",
    methods: ["Crawled the authenticated profile timeline until its cursor ended in February 2023.", "Ran month-bounded authenticated live searches for older periods.", "Deduplicated all recovered records by status URL and excluded population-wide inferences."],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: ["Recovered 748 unique records.", "The profile timeline yielded 470 records before ending in February 2023.", "Month-bounded searches yielded 278 additional older records before X returned rate-limit errors."],
    limitations: ["4,376 profile-counted records remain unreconciled.", "An official account archive or authenticated API export is required for a defensible full-population pass.", "No population-wide engagement rate or complete stakeholder roster should be published from the subset."],
    sourceIds: ["SRC-X-NYCARTC-PROFILE-2026", "SRC-X-NYCARTC-PARTIAL-CORPUS-2026"],
    publicSummary: "A partial 748-record recovery is available; a complete 5,124-record corpus has not been recovered.",
    protectedLocatorId: "SOCIAL-X-NYCARTC-PARTIAL-CORPUS-2026-001"
  },
  {
    id: "INQ-X-NYCARTC-ACCOUNT-ESTABLISHMENT",
    project: "nyc-artist-coalition",
    intakeIds: ["INT-2026-07-14-X-NYCARTC-ACCOUNT-ESTABLISHMENT-MEMORY"],
    question: "Which records or collaborator confirmations can support Jamie's account-establishment and public-identity-system role while preserving multi-author credit?",
    methods: ["Recorded Jamie's memory as a research lead rather than a public claim.", "Reviewed the current collective profile identity and partial account corpus.", "Separated account establishment from authorship of individual posts."],
    runAt: "2026-07-14",
    resultStatus: "inconclusive",
    findings: ["The public account demonstrates a durable coalition identity spanning four named campaigns.", "The current evidence does not allocate account setup, administration, or individual-post authorship."],
    limitations: ["Account-administration records were not recovered.", "Collaborator confirmation, including from colleagues who used the identity over time, would strengthen the role claim.", "The public claim must not erase Olympia Kazi or other account contributors."],
    sourceIds: ["SRC-X-NYCARTC-PROFILE-2026", "SRC-X-NYCARTC-PARTIAL-CORPUS-2026"],
    publicSummary: "The coalition identity is public; Jamie's account-establishment role remains a documented memory awaiting corroboration.",
    protectedLocatorId: "SOCIAL-X-NYCARTC-ACCOUNT-ROLE-2026-001"
  }
] satisfies ResearchInquiry[];
