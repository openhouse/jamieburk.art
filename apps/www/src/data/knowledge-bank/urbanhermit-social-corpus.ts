import type {
  ClaimRecord,
  IntakeRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

const personalPost = (
  id: string,
  title: string,
  canonicalUrl: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[]
): SourceRecord => ({
  id,
  title,
  author: "Jamie Burkart",
  kind: "personal-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish: [
    "independent verification of every statement in the post",
    "audience reach, policy causality, project outcome, or sole authorship unless separately corroborated"
  ]
});

const socialPost = (
  id: string,
  title: string,
  organization: string,
  canonicalUrl: string,
  publishedAt: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord => ({
  id,
  title,
  organization,
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-14",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish
});

export const urbanHermitSocialCorpusIntake = [
  {
    id: "LEAD-URBANHERMIT-FULL-POPULATION-CORPUS-2026",
    receivedAt: "2026-07-14",
    suppliedBy: "Jamie Burkart and Codex authenticated archival review",
    kind: "website",
    title: "Full-population archival production for @urbanhermit",
    summary:
      "Recover and disposition the complete current personal-account population, identify mission-relevant sources and public engagement, and integrate bounded professional evidence without turning a personal timeline into a public dossier.",
    sourceUrl: "https://x.com/urbanhermit",
    status: "integrated",
    dispositions: [
      "source-created",
      "claim-created",
      "inquiry-created",
      "project-linked",
      "protected-from-publication"
    ],
    projectIds: ["career-proof-system", "participatory-public-practice", "wowlist"],
    sourceIds: [
      "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
      "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026",
      "SRC-X-URBANHERMIT-INBOUND-ENGAGEMENT-AUDIT-2026",
      "SRC-X-URBANHERMIT-HJE-WEB-PRACTICE-2010",
      "SRC-X-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
      "SRC-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
      "SRC-X-URBANHERMIT-HORSE-LORDS-NPR-2016",
      "SRC-X-URBANHERMIT-DIY-SAFETY-SCRIPT-2016",
      "SRC-X-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
      "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
      "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015",
      "SRC-X-JULIA-URBANHERMIT-KCUR-TUNNEL-2016",
      "SRC-X-ALIZA-URBANHERMIT-CABARET-2017",
      "SRC-KCUR-8TH-STREET-TUNNEL-2016",
      "SRC-NPR-HORSE-LORDS-TRUTHERS-2016"
    ],
    claimIds: [
      "CLM-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING",
      "CLM-URBANHERMIT-SOURCE-ROUTING",
      "CLM-URBANHERMIT-PRACTICE-THREADS",
      "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
      "CLM-MUSIC-HACKATHON-WOWLIST-ROLE"
    ],
    inquiryIds: [
      "INQ-URBANHERMIT-FULL-POPULATION-2026",
      "INQ-URBANHERMIT-LINK-RESOLUTION-2026"
    ],
    notes: [
      "The live profile displayed 434 posts on July 14, 2026. A complete Posts and Replies crosscheck recovered all 434 current records: 338 authored standalone posts, 15 authored replies, and 81 reposts.",
      "The public account ledger is aggregate-only. Full text, exact dates, handles, status IDs, status URLs, media, personal relationship details, historical contact or location details, and raw interaction metrics remain outside the repository.",
      "The public inbound-search floor contains 26 rendered records from 17 accounts. Eleven are classified as role or project attribution, seven as mission-related thread context, and eight as general public conversation.",
      "The recovered population contains 345 external-link occurrences across 321 unique short URLs. Sixty-one resolved to live destinations during this pass; 260 remain explicit source-resolution debt rather than being described as dead or nonexistent.",
      "Selected records independently strengthen the Horse Lords video credit and the Music Hackathon / WOW List role record; the wider personal-account corpus remains reserve or research material."
    ]
  }
] satisfies IntakeRecord[];

export const urbanHermitSocialCorpusSources = [
  {
    id: "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
    title: "Jamie Burkart public @urbanhermit profile",
    author: "Jamie Burkart",
    kind: "personal-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/urbanhermit",
    preferredPublicUrl: "canonical",
    publicCitation: "Jamie Burkart's public @urbanhermit X profile, accessed July 14, 2026.",
    publicNote:
      "The authenticated live profile displayed 434 posts, 400 following, 216 followers, and an October 2008 join date. Follower and following counts are mutable snapshots and are not used as professional impact claims.",
    supportsGenerally: [
      "the @urbanhermit account identity",
      "the current 434-post population control",
      "an October 2008 join date"
    ],
    doesNotEstablish: [
      "records deleted before capture",
      "that Jamie authored reposted statements",
      "professional impact, audience reach, or endorsement"
    ]
  },
  {
    id: "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026",
    title: "Protected @urbanhermit full-population accounting run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for an authenticated July 2026 record-level accounting of the surviving @urbanhermit profile population.",
    publicNote:
      "The public repository retains an aggregate-only 434-row ledger. The protected working layer contains the material required to reconcile Posts, Replies, reposts, links, and current visible reactions without republishing the personal timeline.",
    protectedLocatorId: "RESEARCH-URBANHERMIT-FULL-POPULATION-2026-001",
    supportsGenerally: [
      "421 unique Posts-surface records plus 13 additional Jamie-authored replies",
      "338 authored standalone posts, 15 authored replies, and 81 reposts",
      "a current surviving record spanning October 2008 through April 2023",
      "345 external-link occurrences across 321 unique short URLs"
    ],
    doesNotEstablish: [
      "the count or content of records deleted before capture",
      "that repost engagement belongs to Jamie",
      "that themes or posting frequency measure effort, importance, reach, causality, or impact"
    ]
  },
  {
    id: "SRC-X-URBANHERMIT-INBOUND-ENGAGEMENT-AUDIT-2026",
    title: "Protected @urbanhermit inbound-search accounting run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "2026-07-14",
    accessedAt: "2026-07-14",
    publicCitation:
      "Public-safe metadata for an authenticated July 2026 review of the recoverable public inbound-search floor around @urbanhermit.",
    publicNote:
      "The public repository retains an aggregate-only 26-row engagement ledger spanning 17 accounts. Individually selected professional records are modeled separately; personal and relational material is not republished.",
    protectedLocatorId: "RESEARCH-URBANHERMIT-INBOUND-2026-001",
    supportsGenerally: [
      "26 recoverable public inbound-search records from 17 accounts",
      "six project-account records, seven cultural or technical collaborator records, five journalist, designer, or civic-peer records, one professional-institution record, and seven community or personal-context records",
      "eleven role or project attributions, seven mission-related thread records, and eight general public-conversation records"
    ],
    doesNotEstablish: [
      "a complete historical mention or reply export",
      "audience reach, endorsement, policy causality, or independently audited impact",
      "that ordinary public conversation is professional evidence"
    ]
  },
  personalPost(
    "SRC-X-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    "Jamie Burkart Harry J. Epstein Co. web-practice post",
    "https://x.com/urbanhermit/status/8154854842",
    "2010-01-24",
    "Jamie Burkart public post describing work on a forward-looking Harry J. Epstein Co. hand-tool website, January 24, 2010.",
    "A contemporaneous personal trace of Jamie's early e-commerce and web practice at the company.",
    ["Jamie's public description of his Harry J. Epstein Co. web work in 2010"]
  ),
  personalPost(
    "SRC-X-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
    "Jamie Burkart Sunday Dinner video post",
    "https://x.com/urbanhermit/status/316641626258808832",
    "2013-03-26",
    "Jamie Burkart public post sharing a Sunday Dinner Presents video, March 26, 2013.",
    "A contemporaneous trace of community-program documentation through video.",
    ["Jamie's public documentation of Sunday Dinner through video"]
  ),
  personalPost(
    "SRC-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
    "Jamie Burkart NYC Council public-engagement post",
    "https://x.com/urbanhermit/status/588028157510418432",
    "2015-04-14",
    "Jamie Burkart public post routing residents to an NYC Council public-hearing question pathway, April 14, 2015.",
    "A contemporaneous trace of Jamie translating a civic participation feature into a resident action path.",
    ["Jamie's public interest in making civic participation pathways usable"]
  ),
  personalPost(
    "SRC-X-URBANHERMIT-HORSE-LORDS-NPR-2016",
    "Jamie Burkart Horse Lords video credit post",
    "https://x.com/urbanhermit/status/726144972802691073",
    "2016-04-29",
    "Jamie Burkart public post naming his collaboration with M.C. Schmidt on the Horse Lords 'Truthers' video and linking NPR Music, April 29, 2016.",
    "Jamie's contemporaneous account is independently corroborated by NPR Music's maker credit.",
    ["Jamie's contemporaneous account of co-creating the Horse Lords video with M.C. Schmidt"]
  ),
  personalPost(
    "SRC-X-URBANHERMIT-DIY-SAFETY-SCRIPT-2016",
    "Jamie Burkart DIY-space safety action-script post",
    "https://x.com/urbanhermit/status/807395049814290433",
    "2016-12-09",
    "Jamie Burkart public post sharing a call-your-mayor action script for safer conditions for artists and cultural spaces after the Ghost Ship fire, December 9, 2016.",
    "The post connects grief and safety concern to a concrete civic action pathway; it does not establish authorship of every linked resource.",
    ["public translation of DIY-space safety concern into a civic action path"]
  ),
  personalPost(
    "SRC-X-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    "Jamie Burkart Let NYC Dance safety-framing post",
    "https://x.com/urbanhermit/status/844221071465373696",
    "2017-03-21",
    "Jamie Burkart public post connecting the criminalization and closure of cultural spaces with unsafe underground conditions, March 21, 2017.",
    "A contemporaneous statement of the public-safety frame Jamie brought to Let NYC Dance advocacy.",
    ["Jamie's public-safety framing within Let NYC Dance advocacy"]
  ),
  personalPost(
    "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    "Jamie Burkart media-archaeology workflow post",
    "https://x.com/urbanhermit/status/1330547315132731398",
    "2020-11-22",
    "Jamie Burkart public post describing a dual-boot workflow for preserving access to older software used in media archaeology, November 22, 2020.",
    "A concrete trace of practical technical care for legacy media and software access.",
    ["Jamie's practical attention to older software and media-preservation workflows"]
  ),
  socialPost(
    "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015",
    "Music Hackathon post identifying Jamie and WOW List",
    "Music Hackathon / Music Community Lab",
    "https://x.com/musichackathon/status/579088937022406657",
    "2015-03-20",
    "Music Hackathon public post identifying @urbanhermit as a co-organizer and describing WOW List as a new event-sharing service, March 20, 2015.",
    "This is a direct institutional role and product-description record.",
    ["Jamie as a Music Hackathon co-organizer", "WOW List described as an event-sharing service"],
    ["WOW List's complete technical architecture", "the platform's user, event, or city counts", "Jamie's sole authorship"]
  ),
  {
    id: "SRC-X-JULIA-URBANHERMIT-KCUR-TUNNEL-2016",
    title: "Julia Fredenburg post linking Jamie's 8th Street Tunnel interview",
    author: "Julia Fredenburg",
    kind: "personal-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-13",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/juliafredenburg/status/775795144553398272",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Julia Fredenburg public post linking KCUR's report on Jamie Burkart and the 8th Street Tunnel, September 13, 2016.",
    publicNote:
      "The post is a source-discovery and collaborator-amplification record; KCUR supplies the independent project reporting.",
    supportsGenerally: ["public routing of KCUR's 8th Street Tunnel reporting"],
    doesNotEstablish: ["project outcome", "Jamie's sole authorship", "current tunnel access or status"]
  },
  {
    id: "SRC-X-ALIZA-URBANHERMIT-CABARET-2017",
    title: "Aliza Aufrichtig post crediting Jamie and Julia's Cabaret Law work",
    author: "Aliza Aufrichtig",
    kind: "personal-social-post",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-30",
    accessedAt: "2026-07-14",
    canonicalUrl: "https://x.com/alizauf/status/925021115080232960",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Aliza Aufrichtig public post expressing pride in Jamie Burkart and Julia Fredenburg's work on the Cabaret Law repeal effort, October 30, 2017.",
    publicNote:
      "This is collaborator attribution of work on the collective effort, not proof of sole causality for repeal.",
    supportsGenerally: ["collaborator recognition of Jamie and Julia's work on the Cabaret Law effort"],
    doesNotEstablish: ["sole causality for repeal", "legislative authorship", "exclusive leadership"]
  },
  {
    id: "SRC-KCUR-8TH-STREET-TUNNEL-2016",
    title: "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
    organization: "KCUR",
    author: "Cody Newill",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-15",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
    publicNote:
      "KCUR identifies Jamie as an artist and filmmaker, reports that he led participants through downtown Kansas City before a 2006 film screening in the tunnel, and quotes his public-heritage rationale.",
    supportsGenerally: [
      "Jamie led a participatory route through downtown Kansas City before a film screening in the 8th Street Tunnel",
      "the program connected a historic transportation site with public imagination and access"
    ],
    doesNotEstablish: [
      "current tunnel access or safety",
      "Jamie's sole authorship of every film or historical account",
      "formal City sponsorship or adoption of Jamie's access proposal"
    ]
  },
  {
    id: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
    title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
    organization: "NPR Music",
    author: "Lars Gotrich",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-04-29",
    accessedAt: "2026-07-14",
    canonicalUrl:
      "https://www.npr.org/2016/04/29/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Lars Gotrich, 'Video: Horse Lords' Hypnotic Truthers Will Blast Your Noodle,' NPR Music, April 29, 2016.",
    publicNote:
      "NPR identifies M.C. Schmidt and Jamie Burkart as the video's makers and quotes Horse Lords saxophonist Andrew Bernstein on how its simple materials, repetition, variation, text, black and white, and color mirror the band's music.",
    supportsGenerally: [
      "Jamie Burkart and M.C. Schmidt made the official Horse Lords 'Truthers' video",
      "the visual construction translated structural qualities of the music",
      "NPR Music published the video"
    ],
    doesNotEstablish: [
      "Jamie's sole authorship",
      "the collaborators' division of labor",
      "an NPR commission",
      "commercial performance or audience reach"
    ]
  }
] satisfies SourceRecord[];

export const urbanHermitSocialCorpusClaims = [
  {
    id: "CLM-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING",
    project: "career-proof-system",
    internalClaim:
      "The July 2026 authenticated Posts and Replies union recovered all 434 records displayed in the current @urbanhermit live-profile control.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "All 434 records in the current live-profile control were recovered: 338 authored standalone posts, 15 authored replies, and 81 reposts.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
        relationship: "direct-support",
        supports: ["the 434-post current-profile control"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026",
        relationship: "private-support",
        supports: ["record recovery, reconciliation, type accounting, link accounting, and privacy transformation"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Complete means the current Posts and Replies union closes exactly against the current 434-record profile control.",
      "The profile counter cannot reveal records deleted before capture, so this is not every post Jamie ever made or a platform export.",
      "Jamie authored 353 recovered records; 81 are reposts carrying another account's displayed authorship."
    ],
    antiClaims: [
      "Every post Jamie ever made was recovered",
      "Jamie authored all 434 records",
      "The public ledger reconstructs Jamie's personal timeline"
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-URBANHERMIT-SOURCE-ROUTING",
    project: "career-proof-system",
    internalClaim:
      "The recovered current population contains 345 external-link occurrences across 321 unique short URLs and preserves source trails across Jamie's civic, cultural, technical, community, and public-history practices.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "The current surviving population contains 345 external-link occurrences across 321 unique short URLs; 61 resolved to live destinations in this pass and 260 remain explicit source-resolution debt.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026",
        relationship: "private-support",
        supports: ["link occurrence, unique short URL, and live-resolution counts"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
        relationship: "context",
        supports: ["creative-technology source routing"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-KCUR-8TH-STREET-TUNNEL-2016",
        relationship: "context",
        supports: ["participatory public-history source routing"],
        confidence: "high",
        renderCitation: false
      },
      {
        sourceId: "SRC-X-ALIZA-URBANHERMIT-CABARET-2017",
        relationship: "context",
        supports: ["bounded collaborator attribution for Cabaret Law work"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "A posted or reposted URL is a source lead and routing record, not automatic corroboration, authorship, endorsement, readership, conversion, or impact.",
      "Only individually reviewed professional sources are exposed; the public ledger does not reproduce the full personal link graph.",
      "Failure to resolve a short link in this pass does not prove that its destination never existed."
    ],
    antiClaims: [
      "All 321 short URLs were resolved",
      "Every posted URL corroborates a portfolio claim",
      "Link counts prove audience reach or professional impact"
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-LINK-RESOLUTION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
  },
  {
    id: "CLM-URBANHERMIT-PRACTICE-THREADS",
    project: "participatory-public-practice",
    internalClaim:
      "Selected public-safe records document recurring traces of participatory place work, software and web practice, community documentation, civic participation, cultural advocacy, and media preservation across the surviving personal-account record.",
    status: "use-with-care",
    publicSafety: "public-with-boundary",
    editorialStatus: "hold",
    projections: [
      {
        key: "archive-note",
        text: "Selected records trace recurring attention to participatory place work, public interfaces, community documentation, cultural safety, and preservation-oriented technical practice.",
        status: "hold",
        citationRequired: true,
        surfaces: []
      }
    ],
    evidence: [
      "SRC-X-URBANHERMIT-HJE-WEB-PRACTICE-2010",
      "SRC-X-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
      "SRC-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
      "SRC-X-URBANHERMIT-DIY-SAFETY-SCRIPT-2016",
      "SRC-X-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
      "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020"
    ].map((sourceId) => ({
      sourceId,
      relationship: "context" as const,
      supports: ["one dated public-safe instance of a recurring practice thread"],
      confidence: "moderate" as const,
      renderCitation: false
    })),
    boundaries: [
      "This is a description of selected public records, not independent proof of every project outcome or one totalizing account of Jamie's life.",
      "Thematic frequencies describe records, not labor, professional priority, personality, reach, causality, or impact.",
      "Ordinary-life, relationship, health, family, and location material remains outside professional projection."
    ],
    antiClaims: [
      "Every personal post is professional evidence",
      "Theme frequency measures Jamie's professional priorities",
      "The personal timeline should become a public portfolio route"
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
    project: "career-proof-system",
    internalClaim:
      "Jamie Burkart and M.C. Schmidt made the official 2016 Horse Lords 'Truthers' video featured by NPR Music.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "Jamie Burkart and M.C. Schmidt made Horse Lords' official 2016 'Truthers' video, which NPR Music featured with the band's description of its visual construction.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
        relationship: "direct-support",
        supports: ["joint maker credit", "official video context", "the band's description of the visual method"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-X-URBANHERMIT-HORSE-LORDS-NPR-2016",
        relationship: "corroborating",
        supports: ["Jamie's contemporaneous public account of the collaboration"],
        confidence: "high",
        renderCitation: false
      }
    ],
    boundaries: [
      "Credit Jamie and M.C. Schmidt together.",
      "The sources do not establish their division of labor, an NPR commission, commercial results, or audience reach.",
      "Keep the claim in reserve unless a future creative-technology or media role benefits from it."
    ],
    antiClaims: [
      "Jamie alone made the Horse Lords video",
      "NPR commissioned the video",
      "The feature proves commercial success or audience scale"
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-MUSIC-HACKATHON-WOWLIST-ROLE",
    project: "wowlist",
    internalClaim:
      "The Music Hackathon public account identified Jamie as a co-organizer in 2015 and described WOW List as a new event-sharing service.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [
      {
        key: "archive-note",
        text: "In 2015, Music Hackathon publicly identified Jamie as a co-organizer and described WOW List as a new event-sharing service.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"]
      }
    ],
    evidence: [
      {
        sourceId: "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015",
        relationship: "direct-support",
        supports: ["Jamie as co-organizer", "WOW List described as an event-sharing service"],
        confidence: "high",
        renderCitation: true
      }
    ],
    boundaries: [
      "The post does not establish WOW List's architecture, aggregate user or event counts, geographic reach, or Jamie's sole authorship.",
      "Use it as a bounded external role and product-description proof."
    ],
    antiClaims: [
      "Jamie solely founded Music Hackathon",
      "The post verifies all WOW List scale claims",
      "Jamie alone built WOW List"
    ],
    researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  }
] satisfies ClaimRecord[];

export const urbanHermitSocialCorpusInquiries = [
  {
    id: "INQ-URBANHERMIT-FULL-POPULATION-2026",
    project: "career-proof-system",
    question:
      "Can 100 percent of the current surviving @urbanhermit profile population be recovered, classified, and integrated without turning a personal timeline into a public dossier?",
    methods: [
      "Used the authenticated live profile's displayed 434-post count as the population control.",
      "Scrolled the Posts surface to its October 2008 endpoint and recovered 421 unique records.",
      "Independently scrolled the Replies surface, excluded two third-party context records, and recovered 13 additional Jamie-authored replies absent from Posts.",
      "Reconciled the union by status ID to exactly 434 current records and retained authored posts, authored replies, and reposts as separate relationships.",
      "Classified every current record by year, relationship, one interpretive theme, and aggregate link presence while withholding the raw personal timeline.",
      "Reviewed the full recoverable inbound-search floor and modeled selected professional role attributions separately from general conversation."
    ],
    runAt: "2026-07-14",
    resultStatus: "recovered",
    findings: [
      "The Posts and Replies union closes exactly against the 434-post live-profile control.",
      "The current population contains 338 authored standalone posts, 15 authored replies, and 81 reposts.",
      "The surviving record spans October 2008 through April 2023.",
      "The inbound-search floor contains 26 rendered records from 17 accounts, with 11 role or project attributions, seven mission-related thread records, and eight general public-conversation records.",
      "Selected sources independently corroborate the Horse Lords video credit, the Music Hackathon co-organizer role, and Jamie's 8th Street Tunnel public-history program."
    ],
    limitations: [
      "The current profile count cannot reveal records deleted before capture.",
      "X's Posts, Replies, and search interfaces are interface views rather than a first-party export or deletion history.",
      "Visible reactions are mutable snapshots; repost reactions belong to original source posts and are not Jamie's authored-post traction.",
      "Theme and stakeholder labels are deterministic research aids, not objective identities or measures of effort, value, reach, causality, or impact.",
      "No private messages, account analytics, cookies, credentials, session stores, or nonpublic account data were inspected or published."
    ],
    sourceIds: [
      "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026",
      "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026",
      "SRC-X-URBANHERMIT-INBOUND-ENGAGEMENT-AUDIT-2026",
      "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
      "SRC-KCUR-8TH-STREET-TUNNEL-2016",
      "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015"
    ],
    publicSummary:
      "All 434 records displayed by the current live profile were recovered and accounted for. The public repository preserves aggregate accounting and selected professional evidence while withholding the raw personal timeline.",
    protectedLocatorId: "RESEARCH-URBANHERMIT-FULL-POPULATION-2026-001"
  },
  {
    id: "INQ-URBANHERMIT-LINK-RESOLUTION-2026",
    project: "career-proof-system",
    question:
      "Which of the 260 short URLs not resolved in this pass can be safely recovered through public archives and close-read for professional evidence?",
    methods: [
      "Retain all 321 unique short URLs in the protected working layer and preserve each public ledger row's aggregate link count.",
      "Resolve links only through public destinations and archival services; do not publish a complete personal link graph.",
      "Promote a destination only after source close reading, relevance review, privacy review, and claim-boundary analysis."
    ],
    runAt: "2026-07-14",
    resultStatus: "partially-recovered",
    findings: [
      "The current population contains 345 external-link occurrences across 321 unique short URLs.",
      "Sixty-one short URLs resolved to live destinations in this pass.",
      "Selected live destinations include NPR Music, KCUR-linked context, the New York Times Cabaret Law report, WNYC Cabaret Law coverage, NYC Artist Coalition campaign sites, CallNYC, and cultural or community resources.",
      "Another 260 short URLs remain explicit source-resolution debt."
    ],
    limitations: [
      "Shortener failures can reflect rate limiting, network behavior, dead destinations, or changed redirects and do not prove that a source never existed.",
      "Many historic destinations include ordinary-life or relationship context with no professional use.",
      "A resolved link is a research lead, not automatic support for a claim."
    ],
    sourceIds: ["SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026"],
    publicSummary:
      "Sixty-one of 321 unique short URLs resolved to live destinations; 260 remain bounded research debt rather than inferred dead links.",
    protectedLocatorId: "RESEARCH-URBANHERMIT-LINK-RESOLUTION-2026-001"
  }
] satisfies ResearchInquiry[];

export const urbanHermitSocialCorpusPublicationDecisions = [
  {
    id: "PUB-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING",
    claimId: "CLM-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING",
    decision: "reserve",
    audiences: ["future editors", "archival researchers"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"],
    rationale:
      "The complete current-population accounting is important provenance, but the hiring site should lead with usable professional evidence rather than personal-account census mechanics.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-URBANHERMIT-SOURCE-ROUTING",
    claimId: "CLM-URBANHERMIT-SOURCE-ROUTING",
    decision: "reserve",
    audiences: ["future editors", "archival researchers", "photo editors"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"],
    rationale:
      "The link corpus is valuable for discovery and future briefs, but link volume is not a reader-facing impact claim.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-URBANHERMIT-PRACTICE-THREADS",
    claimId: "CLM-URBANHERMIT-PRACTICE-THREADS",
    decision: "hold",
    audiences: ["future editors", "researchers"],
    surfaces: [],
    rationale:
      "The throughline is promising but should remain a research frame until broader independent cross-project corroboration and editorial need justify public composition.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-HORSE-LORDS-TRUTHERS-VIDEO",
    claimId: "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
    decision: "reserve",
    audiences: ["creative-technology employers", "media collaborators", "future editors"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"],
    rationale:
      "The claim is independently corroborated and useful range evidence, but it does not improve the current technical-operations hiring argument enough to add another visible proof.",
    decidedAt: "2026-07-14"
  },
  {
    id: "PUB-MUSIC-HACKATHON-WOWLIST-ROLE",
    claimId: "CLM-MUSIC-HACKATHON-WOWLIST-ROLE",
    decision: "reserve",
    audiences: ["product operations employers", "community-technology collaborators", "future editors"],
    surfaces: ["docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus"],
    rationale:
      "The external role attribution strengthens WOW List provenance and proof coverage without requiring additional visible site copy.",
    decidedAt: "2026-07-14"
  }
] satisfies PublicationDecision[];

export const urbanHermitSocialCorpusProofCoverage = [] satisfies ProofCoverage[];
