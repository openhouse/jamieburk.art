import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

const xPost = (
  id: string,
  title: string,
  author: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  publicNote: string,
  supportsGenerally: string[],
  doesNotEstablish: string[]
): SourceRecord => ({
  id,
  title,
  author,
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-15",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote,
  supportsGenerally,
  doesNotEstablish
});

export const urbanhermitXFullPopulationBatch20260715: {
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
      id: "INT-URBANHERM-X-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-15",
      capturedFrom: "Authenticated Posts and Replies review of @urbanhermit",
      publicSafeSummary:
        "A public-safe metadata inventory accounting for every record represented by the live @urbanhermit profile counter, with authored posts, external-source reposts, posted URLs, mission signals, incoming public responses, and volatile counters kept separate.",
      projects: ["urbanhermit-public-record"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-URBANHERM-X-CORPUS-2026-07-15",
        "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15"
      ],
      claimIds: [
        "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
        "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
        "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT"
      ],
      researchTaskIds: [
        "TASK-URBANHERM-X-OWNER-ARCHIVE",
        "TASK-URBANHERM-X-POSTED-SOURCE-MATURATION"
      ],
      notes: [
        "The live profile reported 434 posts and the governed union contains 434 unique status records.",
        "Raw post text, historical personal context, private analytics, and authenticated-session state remain outside the public repository.",
        "The 100% result applies to the live profile-counted population, not all content ever created on the account."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "INT-URBANHERM-X-MISSION-SOURCES-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-15",
      capturedFrom:
        "Mission-relevant records and posted destinations surfaced by the full-population review",
      publicSafeSummary:
        "Close reading of public records concerning WOW List, the Horse Lords Truthers video, the 8th Street Tunnel program, NYC Artist Coalition advocacy, Tired of Tires participation, and cross-community introductions.",
      projects: [
        "urbanhermit-public-record",
        "wowlist",
        "participatory-programs",
        "nyc-artist-coalition",
        "kc-town-hall"
      ],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
        "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
        "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
        "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
        "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
        "SRC-URBANHERM-X-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
        "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
        "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
        "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
        "SRC-URBANHERM-X-KCTH-TIRES-2019",
        "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023"
      ],
      claimIds: [
        "CLM-URBANHERM-WOWLIST-PEER-ATTRIBUTION",
        "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
        "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
        "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
        "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"
      ],
      researchTaskIds: [
        "TASK-URBANHERM-X-POSTED-SOURCE-MATURATION",
        "TASK-URBANHERM-X-CREATIVE-ASSET-REVIEW"
      ],
      notes: [
        "Public posting or reposting establishes circulation, not endorsement, authorship, partnership, reach, or impact.",
        "Collaborator, project-account, participant, and publication authorship remains attached to each source."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-URBANHERM-X-CORPUS-2026-07-15",
      title: "Urbanhermit X full live-profile population inventory",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://x.com/urbanhermit/with_replies",
      assetUrl:
        "https://github.com/openhouse/jamieburk.art/blob/db1f83095fa3b69d1a82d0bf67f5ee9a57bf768c/docs/knowledge-bank/corpora/urbanhermit-x-full-population-2026-07-15.json",
      preferredPublicUrl: "asset",
      publicCitation:
        "Public-safe metadata inventory of all 434 records counted by the live @urbanhermit profile on July 15, 2026.",
      publicNote:
        "The immutable corpus preserves status identities, dates, source authorship, record types, retrieval provenance, public links, classification evidence, bounded mission-relevant incoming records, and dated visible counters while excluding raw post text and unnecessary personal context.",
      supportsGenerally: [
        "434 of 434 live profile-counted records reviewed",
        "340 originals, 13 replies, and 81 external-source native reposts",
        "349 external-link occurrences representing 321 distinct short URLs",
        "six overlapping mission-signal families",
        "15 mission-relevant incoming records from nine accounts"
      ],
      doesNotEstablish: [
        "that no older record was deleted or absent before capture",
        "a complete account-owner archive",
        "Jamie's authorship of external-source reposts",
        "the truth of every historical statement or linked destination",
        "reach, endorsement, conversion, participation, or impact"
      ]
    },
    {
      id: "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15",
      title: "Authenticated Urbanhermit archival-production research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt:
        "Authenticated Posts, Replies, source-page, and year-bounded incoming-search review completed July 15, 2026",
      publicCitation:
        "Authenticated July 15, 2026 archival-production run over @urbanhermit Posts, Replies, posted sources, and year-bounded incoming mentions.",
      publicNote:
        "The protected capture permits future audit and reclassification without publishing raw post text, historical personal context, private analytics, or authenticated-session data.",
      protectedLocatorId: "PTR-URBANHERM-X-AUTHENTICATED-CAPTURE-2026",
      supportsGenerally: [
        "authenticated traversal and repeated no-growth stopping rule",
        "private source-body close reading",
        "classification-input provenance",
        "year-bounded incoming-search method"
      ],
      doesNotEstablish: [
        "a complete account-owner archive",
        "deleted or unindexed records",
        "private or nonpublic engagement",
        "permission to publish raw historical post text"
      ]
    },
    xPost(
      "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
      "Music Hackathon identifies Jamie and WOW List",
      "Music Hackathon / Music Community Lab (@musichackathon)",
      "2015-03-20",
      "https://x.com/musichackathon/status/579088937022406657",
      "Music Hackathon / Music Community Lab, public post identifying Jamie Burkart as a co-organizer and WOW List as an event-sharing service he made, March 20, 2015.",
      "The account publicly described @urbanhermit as a co-organizer and linked a WOW List calendar for the community.",
      [
        "Jamie's co-organizer relationship with Music Hackathon",
        "external attribution of Jamie's role making WOW List",
        "WOW List as an event-sharing service"
      ],
      [
        "Jamie's sole authorship of WOW List",
        "the product's complete technical architecture",
        "adoption, audience size, or measured outcomes"
      ]
    ),
    xPost(
      "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
      "Jamie links the Horse Lords Truthers video",
      "Jamie Burkart (@urbanhermit)",
      "2016-04-29",
      "https://x.com/urbanhermit/status/726144972802691073",
      "Jamie Burkart, public post naming M.C. Schmidt as his collaborator on the Horse Lords 'Truthers' video, April 29, 2016.",
      "Jamie's contemporaneous first-person post names M.C. Schmidt by handle and links the NPR publication.",
      ["Jamie's contemporaneous co-creation claim", "the Horse Lords project and NPR destination"],
      ["sole authorship", "the collaborators' precise division of labor", "commission terms", "audience reach"]
    ),
    xPost(
      "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
      "Drew Daniel credits the Horse Lords video collaboration",
      "Drew Daniel (@DDDrewDaniel)",
      "2016-04-29",
      "https://x.com/DDDrewDaniel/status/726096416070836224",
      "Drew Daniel, public post crediting M.C. Schmidt and Jamie Burkart's Horse Lords video, April 29, 2016.",
      "A public collaborator-network post independently names both video collaborators and the NPR destination.",
      ["independent public attribution to Jamie and M.C. Schmidt", "NPR publication of the video"],
      ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
    ),
    xPost(
      "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
      "Julia Fredenburg credits the Horse Lords video collaboration",
      "Julia Fredenburg (@juliafredenburg)",
      "2016-04-29",
      "https://x.com/juliafredenburg/status/726238278433804288",
      "Julia Fredenburg, public post crediting Jamie Burkart and M.C. Schmidt's Horse Lords video, April 29, 2016.",
      "A second public collaborator-network post names both collaborators and describes the work as analog video.",
      ["a second public attribution to both video collaborators", "the analog-media context"],
      ["the collaborators' precise division of labor", "commission terms", "rights clearance", "audience reach"]
    ),
    {
      id: "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
      title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
      organization: "NPR",
      author: "Lars Gotrich",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2016-04-29",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "http://www.npr.org/event/music/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
      archiveUrl:
        "https://web.archive.org/web/20160502131405/http://www.npr.org/event/music/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
      preferredPublicUrl: "archive",
      publicCitation:
        "Lars Gotrich, 'Video: Horse Lords' Hypnotic \"Truthers\" Will Blast Your Noodle,' NPR, April 29, 2016, archived May 2, 2016.",
      publicNote:
        "NPR directly credits M.C. Schmidt and Jamie Burkart and attributes to Horse Lords member Andrew Bernstein an explanation of how the video's material, repetition, variation, color, and text relate to the music.",
      supportsGenerally: [
        "M.C. Schmidt and Jamie Burkart as the video's co-creators",
        "NPR publication of the video",
        "the video's formal relationship to the music"
      ],
      doesNotEstablish: [
        "the collaborators' precise division of labor",
        "sole authorship by Jamie",
        "commission terms or rights clearance",
        "audience impact"
      ]
    },
    xPost(
      "SRC-URBANHERM-X-EIGHTH-STREET-TUNNEL-2016",
      "Jamie circulates the 8th Street Tunnel interview",
      "Jamie Burkart (@urbanhermit)",
      "2016-09-13",
      "https://x.com/urbanhermit/status/775817552299593728",
      "Jamie Burkart, public post linking his KCUR interview about Kansas City's 8th Street Tunnel, September 13, 2016.",
      "The post links the independently published KCUR account and labels the work immersive cinema and the 8th Street Tunnel.",
      ["contemporaneous circulation of Jamie's KCUR interview", "the 8th Street Tunnel program connection"],
      ["complete event details by itself", "formal access rights", "attendance", "measured public impact"]
    ),
    xPost(
      "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
      "Julia Fredenburg shares Jamie's 8th Street Tunnel interview",
      "Julia Fredenburg (@juliafredenburg)",
      "2016-09-13",
      "https://x.com/juliafredenburg/status/775795144553398272",
      "Julia Fredenburg, public post sharing Jamie Burkart's KCUR interview about the 8th Street Tunnel, September 13, 2016.",
      "The collaborator post attributes the historical interpretation to Jamie and links the KCUR publication.",
      ["public collaborator attribution", "the connection between Jamie and the KCUR article"],
      ["complete 2006 event details", "formal access rights", "attendance", "measured public impact"]
    ),
    {
      id: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
      title:
        "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
      organization: "KCUR",
      author: "Cody Newill",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-15",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
      publicNote:
        "KCUR identifies Jamie as an artist and filmmaker and documents the participatory screening he hosted inside the historic tunnel in 2006.",
      supportsGenerally: [
        "Jamie's 2006 downtown scavenger-hunt and tunnel-screening program",
        "the three-film program combining artist, popular, and archival media",
        "Jamie's public-history and public-access rationale"
      ],
      doesNotEstablish: [
        "formal ownership or control of the tunnel",
        "that Jamie restored or opened the tunnel",
        "authorization terms for the event",
        "attendance or measured educational impact"
      ]
    },
    xPost(
      "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
      "Aliza Aufrichtig recognizes Jamie and Julia's Cabaret Law work",
      "Aliza Aufrichtig (@alizauf)",
      "2017-10-30",
      "https://x.com/alizauf/status/925021115080232960",
      "Aliza Aufrichtig, public post recognizing Jamie Burkart and Julia Fredenburg's work on the Cabaret Law repeal effort, October 30, 2017.",
      "The peer attribution links contemporaneous New York Times repeal reporting and names Jamie and Julia together.",
      ["a public peer attribution of work on the repeal effort", "shared credit to Jamie and Julia"],
      ["a precise role", "legislative authorship", "sole or decisive causation", "the complete coalition roster"]
    ),
    xPost(
      "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
      "NYC Artist Coalition attributes a cultural-space statement to Jamie",
      "NYC Artist Coalition (@NYCArtC)",
      "2017-10-26",
      "https://x.com/NYCArtC/status/923573066252382209",
      "NYC Artist Coalition, public post attributing a Save NYC Spaces statement about cultural traditions and small diverse spaces to Jamie Burkart, October 26, 2017.",
      "The shared coalition account publicly attributes the statement to @urbanhermit and links Save NYC Spaces.",
      ["Jamie's visible public-speaking contribution", "Save NYC Spaces framing around small diverse cultural spaces"],
      ["sole authorship of coalition strategy", "the individual author of the account post", "policy causation", "audience reach"]
    ),
    xPost(
      "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
      "NYC Artist Coalition attributes a Cabaret Law statement to Jamie",
      "NYC Artist Coalition (@NYCArtC)",
      "2017-11-01",
      "https://x.com/NYCArtC/status/925875113555357707",
      "NYC Artist Coalition, public post attributing a statement about Cabaret Law repeal, trust, and safety resources to Jamie Burkart, November 1, 2017.",
      "The shared coalition account publicly attributes the statement to @urbanhermit and links Let NYC Dance.",
      ["Jamie's visible public-speaking contribution", "the coalition's trust-and-safety framing for repeal"],
      ["legislative authorship", "sole coalition causation", "the individual author of the account post", "measured policy impact"]
    ),
    {
      id: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      title: "NYC's Office of Nightlife expected to be here by 2018",
      organization: "Brooklyn Daily Eagle",
      author: "Scott Enman",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-08-04",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Scott Enman, 'NYC's Office of Nightlife expected to be here by 2018,' Brooklyn Daily Eagle, August 4, 2017.",
      publicNote:
        "The article documents the Council committee and public-feedback sequence around the proposed Office of Nightlife and directly quotes NYC Artist Coalition's cultural-space and Cabaret Law statement.",
      supportsGenerally: [
        "direct NYC Artist Coalition quotation",
        "the reported Council committee and public-feedback sequence",
        "the proposed office's outreach, liaison, and public-hearing functions"
      ],
      doesNotEstablish: [
        "Jamie's individual authorship or role",
        "sole coalition causation",
        "that the article's expected timeline was the final legal record",
        "implementation quality or measured policy impact"
      ]
    },
    xPost(
      "SRC-URBANHERM-X-KCTH-TIRES-2019",
      "KC Town Hall names Jamie in a Tired of Tires operating update",
      "KC Town Hall (@KCTownHall)",
      "2019-06-02",
      "https://x.com/KCTownHall/status/1135246124883861504",
      "KC Town Hall, public Tired of Tires operating update naming Jamie Burkart among participants, June 2, 2019.",
      "The project account names Jamie among several thanked participants in a recurring pickup and free-disposal workflow. Its tire and savings figures remain first-party project claims.",
      ["Jamie's named participation", "recurring public intake and disposal coordination"],
      ["Jamie's sole operation or design of the program", "every participant's task", "independently audited outcomes"]
    ),
    xPost(
      "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      "Jimmy Fitzner describes a tire-pickup shift with Jamie",
      "Jimmy Fitzner (@JimmyFitzner)",
      "2022-04-01",
      "https://x.com/JimmyFitzner/status/1510067983456026629",
      "Jimmy Fitzner, first-hand public account of driving a dump truck with Jamie Burkart to pick up tires in Northeast Kansas City, April 1, 2022.",
      "The participant account directly describes a shared pickup shift and its service geography.",
      ["Jamie's direct participation in a tire-pickup shift", "use of a dump truck", "Northeast Kansas City as the described area"],
      ["Jamie's sole operation or design of the program", "a complete operating period", "every shift", "audited totals"]
    ),
    xPost(
      "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023",
      "Dawnia Darkstone thanks Jamie for artist introductions",
      "Dawnia Darkstone (@letsglitchit)",
      "2023-04-17",
      "https://x.com/letsglitchit/status/1648007189049516032",
      "Dawnia Darkstone, public post thanking Jamie Burkart for introductions among artist peers, April 17, 2023.",
      "The post attributes a valued relational outcome to Jamie without specifying a formal program or event.",
      ["a public peer attribution for making artist introductions", "a cross-community relational contribution"],
      ["a formal convening role", "the complete group or context", "long-term outcomes", "a scalable program"]
    )
  ],
  sourceAssertions: [
    {
      id: "AST-URBANHERM-X-AUTHENTICATED-METHOD-2026",
      sourceId: "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15",
      project: "urbanhermit-public-record",
      assertion:
        "The protected research run records authenticated Posts and Replies traversal, repeated no-growth passes, source-page review, and year-bounded incoming search without publishing raw personal content.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-POPULATION-2026",
      sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
      project: "urbanhermit-public-record",
      assertion:
        "The live profile reported 434 posts and the governed union contains 434 unique records: 340 originals, 13 replies, and 81 external-source native reposts.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-PUBLISHING-PATTERN-2026",
      sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
      project: "urbanhermit-public-record",
      assertion:
        "The population contains 353 account-authored originals or replies and 81 redistributed external-source records; 277 records contain 349 external-link occurrences representing 321 distinct short URLs.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-MISSION-SIGNALS-2026",
      sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
      project: "urbanhermit-public-record",
      assertion:
        "Strict overlapping rules recover recurring source-record signals in community platforms and gatherings, civic participation and service, cultural-space advocacy, public history and waterways, creative technology and media, and neighborhood mutual aid.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-BOUNDED-INCOMING-2026",
      sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
      project: "urbanhermit-public-record",
      assertion:
        "A year-bounded public-index search recovered 15 mission-relevant third-party records from nine accounts and two mission-relevant conversation-context records; nine non-mission personal or network records remain identity-free dispositions.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-VISIBLE-COUNTERS-2026",
      sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
      project: "urbanhermit-public-record",
      assertion:
        "On July 15, 2026, 85 of 353 account-authored records displayed at least one interaction; the visible labels totaled 175 likes, eight replies, and 60 reposts, with source-post counters on external reposts excluded.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-WOWLIST-PEER-ATTRIBUTION-2015",
      sourceId: "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
      project: "wowlist",
      assertion:
        "Music Hackathon / Music Community Lab publicly identified Jamie as a co-organizer and described WOW List as a new event-sharing service he made.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: [
        "CLM-URBANHERM-WOWLIST-PEER-ATTRIBUTION",
        "CLM-WOWLIST-PUBLIC-PRODUCT-SUPPORT"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-HORSE-LORDS-SELF-2016",
      sourceId: "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
      project: "participatory-programs",
      assertion:
        "Jamie contemporaneously described making the Horse Lords video with M.C. Schmidt and linked the NPR publication.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-NPR-HORSE-LORDS-CREDIT-2016",
      sourceId: "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
      project: "participatory-programs",
      assertion:
        "NPR directly credits M.C. Schmidt and Jamie Burkart as the video's co-creators and attributes a description of its formal relationship to the music to Horse Lords member Andrew Bernstein.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-HORSE-LORDS-PEER-CREDIT-2016",
      sourceId: "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
      project: "participatory-programs",
      assertion:
        "Drew Daniel publicly credited M.C. Schmidt and Jamie for the Horse Lords video and linked the NPR publication.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-JULIA-HORSE-LORDS-CREDIT-2016",
      sourceId: "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
      project: "participatory-programs",
      assertion:
        "Julia Fredenburg publicly credited Jamie Burkart and M.C. Schmidt for the analog Horse Lords video and linked the NPR publication.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-TUNNEL-SOURCE-CIRCULATION-2016",
      sourceId: "SRC-URBANHERM-X-EIGHTH-STREET-TUNNEL-2016",
      project: "participatory-programs",
      assertion:
        "Jamie publicly linked his KCUR interview about immersive cinema and Kansas City's 8th Street Tunnel, connecting the account record to the independent article.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-KCUR-TUNNEL-PROGRAM-2016",
      sourceId: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
      project: "participatory-programs",
      assertion:
        "KCUR documents Jamie's 2006 scavenger-hunt and three-film screening inside Kansas City's 8th Street Tunnel and quotes his public-history and public-access rationale.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-JULIA-TUNNEL-ATTRIBUTION-2016",
      sourceId: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
      project: "participatory-programs",
      assertion:
        "Julia Fredenburg publicly attributed the 8th Street Tunnel historical interpretation to Jamie and shared the KCUR source.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-NYCAC-PEER-RECOGNITION-2017",
      sourceId: "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
      project: "nyc-artist-coalition",
      assertion:
        "Aliza Aufrichtig publicly recognized Jamie and Julia's work on the Cabaret Law repeal effort while linking contemporaneous repeal reporting.",
      relationship: "corroborates",
      confidence: "moderate",
      candidateClaimIds: [
        "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
        "CLM-NAC-REPEAL-MOBILIZATION"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-NYCAC-SPEAKER-ATTRIBUTION-2017",
      sourceId: "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The NYC Artist Coalition account publicly attributed to Jamie a Save NYC Spaces statement about cultural traditions being born in small diverse spaces.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-NYCAC-TRUST-SAFETY-ATTRIBUTION-2017",
      sourceId: "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The NYC Artist Coalition account publicly attributed to Jamie a statement framing Cabaret Law repeal as supporting trust between cultural spaces and the City and access to safety resources.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      sourceId: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      project: "nyc-artist-coalition",
      assertion:
        "The Brooklyn Daily Eagle documents the Council committee and public-feedback sequence around the proposed Office of Nightlife and directly quotes NYC Artist Coalition's cultural-space statement.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [
        "CLM-NAC-OFFICE-NIGHTLIFE-ROLE",
        "CLM-NAC-NIGHTLIFE-TOWN-HALL"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-KCTH-TIRES-PARTICIPATION-2019",
      sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019",
      project: "kc-town-hall",
      assertion:
        "A KC Town Hall operating update names Jamie among participants thanked for a recurring free tire-disposal and curbside-pickup workflow.",
      relationship: "corroborates",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-JIMMY-TIRES-PARTICIPATION-2022",
      sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      project: "kc-town-hall",
      assertion:
        "Jimmy Fitzner gave a first-hand public account of riding with Jamie in a dump truck to pick up tires around Northeast Kansas City.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-URBANHERM-X-ARTIST-INTRODUCTIONS-2023",
      sourceId: "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023",
      project: "urbanhermit-public-record",
      assertion:
        "Dawnia Darkstone publicly thanked Jamie for introductions among artist peers she had admired, providing a narrow relational-work attribution.",
      relationship: "supports",
      confidence: "moderate",
      candidateClaimIds: ["CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
      project: "urbanhermit-public-record",
      internalClaim:
        "From 2008 through 2023, Jamie's personal @urbanhermit account functioned as a cross-project public working surface spanning community platforms and gatherings, civic participation, cultural-space advocacy, public history and waterways, creative technology and media, and neighborhood work.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [
        {
          key: "archive-note",
          text:
            "The personal account preserves a complete public-safe metadata record of its 434 live profile-counted posts and reposts across multiple project lineages.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "434-of-434 live-profile reconciliation",
            "record-type and source-authorship separation",
            "posted-link and mission-signal inventories"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15",
          relationship: "private-support",
          supports: [
            "authenticated traversal provenance",
            "source-body close reading without public raw text"
          ],
          publicNote:
            "Protected raw capture; the public corpus preserves public-safe metadata and hashes only.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The pass is complete for the 434 records represented by the live profile counter on July 15, 2026, not all content ever created on the account.",
        "The 81 native reposts retain external source authorship and are not words authored by Jamie.",
        "Mission-signal counts overlap and are retrieval aids, not measures of labor, priority, agreement, audience, or impact.",
        "The full posted-link inventory is not a claim that all 321 destinations were resolved or close-read."
      ],
      antiClaims: [
        "Every record was authored by Jamie.",
        "The live profile proves no older record was deleted or withheld.",
        "Posting a source proves endorsement, partnership, reach, or impact.",
        "The mission-signal distribution measures Jamie's professional priorities."
      ],
      researchInquiryIds: [
        "INQ-URBANHERM-X-FULL-POPULATION-2026",
        "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
      project: "urbanhermit-public-record",
      internalClaim:
        "A year-bounded public-index search recovered mission-relevant incoming records from creative-technology and media peers, civic-design peers, coalition and neighborhood project accounts, a neighborhood collaborator, a public-history collaborator, and a creative-community peer.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [
        {
          key: "archive-note",
          text:
            "A bounded public search recovered 15 mission-relevant third-party responses from nine accounts across several project lineages.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "15 mission-relevant third-party records",
            "nine source accounts",
            "stakeholder-group classification",
            "identity-free handling of non-mission personal context"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023",
          relationship: "corroborating",
          supports: ["a specific public peer attribution for artist introductions"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is a bounded year-by-year public-index search, not a complete historical engagement archive.",
        "The method excludes likes, private activity, deleted or unindexed records, direct messages, and engagement that omits the handle.",
        "Stakeholder categories describe recovered public contexts, not endorsement or institutional affiliation."
      ],
      antiClaims: [
        "All historical engagement was recovered.",
        "Nine accounts endorsed Jamie's work.",
        "Public response proves reach, conversion, or professional impact."
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT",
      project: "urbanhermit-public-record",
      internalClaim:
        "At the July 15, 2026 access snapshot, 85 of 353 account-authored records displayed at least one interaction; visible labels totaled 175 likes, eight replies, and 60 reposts.",
      status: "use-with-care",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: false,
      projections: [
        {
          key: "archive-note",
          text:
            "A dated interface snapshot preserves visible account-authored interaction labels for research, not accomplishment messaging.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "dated visible interaction labels",
            "account-authored denominator",
            "exclusion of source-post counters on native reposts"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The figures are 243 displayed interaction units, not 243 people.",
        "The labels are volatile, incomplete, and observed on one date.",
        "Source-post counters on the 81 external native reposts are excluded because they do not measure Jamie's repost action."
      ],
      antiClaims: [
        "The account reached 243 people.",
        "The counters measure endorsement, conversion, attendance, or impact.",
        "The snapshot is a complete historical engagement total."
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-URBANHERM-WOWLIST-PEER-ATTRIBUTION",
      project: "wowlist",
      internalClaim:
        "In 2015, Music Hackathon / Music Community Lab publicly identified Jamie as a co-organizer and described WOW List as a new event-sharing service he made.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A 2015 peer account identified Jamie as a Music Hackathon co-organizer and credited him with making WOW List as an event-sharing service.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
          relationship: "direct-support",
          supports: [
            "co-organizer attribution",
            "WOW List event-sharing-service description",
            "external attribution of Jamie's making role"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-ORIGIN-2014",
          relationship: "supports-boundary",
          supports: ["Sunday Dinner lineage", "Jamie as one of multiple builders"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "WOW List was collective work built with Richard Kim and other collaborators and community organizers.",
        "The post does not document the full technical architecture, ownership structure, or division of labor.",
        "This peer attribution complements, rather than replaces, the collective project record."
      ],
      antiClaims: [
        "Jamie alone created WOW List.",
        "The Music Hackathon post establishes the complete product architecture.",
        "The post proves platform adoption or impact."
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
      project: "participatory-programs",
      internalClaim:
        "Jamie Burkart and M.C. Schmidt co-created the official video for Horse Lords' 'Truthers'; NPR published the video in April 2016 and described its formal relationship to the music.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Co-created Horse Lords' 'Truthers' video with M.C. Schmidt; NPR published the work in April 2016.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
          relationship: "direct-support",
          supports: [
            "shared credit to M.C. Schmidt and Jamie Burkart",
            "NPR publication",
            "attributed formal description"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
          relationship: "corroborating",
          supports: ["Jamie's contemporaneous shared-credit statement"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
          relationship: "corroborating",
          supports: ["independent public attribution to both collaborators"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit remains shared with M.C. Schmidt; Horse Lords created the music.",
        "The sources do not establish the collaborators' precise division of labor, commission terms, or rights arrangement.",
        "NPR publication does not establish measured audience impact."
      ],
      antiClaims: [
        "Jamie alone created the video.",
        "Jamie created the music.",
        "NPR publication proves a quantified audience outcome."
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
      project: "participatory-programs",
      internalClaim:
        "In 2006, Jamie led participants through downtown Kansas City on a scavenger-hunt-like route and hosted a three-film screening inside the historic 8th Street Tunnel, using artist, popular, and archival media to engage public history and future public access.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Led a participatory downtown route and hosted a three-film screening inside Kansas City's historic 8th Street Tunnel in 2006.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
          relationship: "direct-support",
          supports: [
            "Jamie's host role",
            "the participatory route",
            "the three-film program",
            "the public-history and access rationale"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
          relationship: "corroborating",
          supports: ["public collaborator attribution of the historical interpretation"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The program depended on participants and on films made by other artists and rights holders, whose authorship remains intact.",
        "The sources do not establish formal ownership, control, restoration, or opening of the tunnel by Jamie.",
        "Authorization terms, attendance, and measured educational impact are not recovered."
      ],
      antiClaims: [
        "Jamie opened or restored the 8th Street Tunnel.",
        "Jamie created all three screened films.",
        "The source establishes attendance or measured public impact."
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
      project: "nyc-artist-coalition",
      internalClaim:
        "NYC Artist Coalition's public account attributed to Jamie statements connecting small diverse cultural spaces to New York's cultural traditions and framing Cabaret Law repeal as a path toward trust and safety resources; a civic-design peer separately recognized Jamie and Julia's work on the repeal effort.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Coalition records publicly attribute to Jamie cultural-space and trust-and-safety arguments used in Save NYC Spaces and Let NYC Dance advocacy.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
          relationship: "direct-support",
          supports: ["public attribution of Jamie's cultural-space statement"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
          relationship: "direct-support",
          supports: ["public attribution of Jamie's trust-and-safety statement"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
          relationship: "corroborating",
          supports: ["public peer recognition of Jamie and Julia's work on the repeal effort"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is public-speaking and peer-attribution evidence within collective NYC Artist Coalition work.",
        "Credit remains shared with Julia Fredenburg, coalition collaborators, partner organizations, artists, venue workers, Councilmember Rafael Espinal, Council colleagues, and other participants in the repeal effort.",
        "The sources do not establish legislative authorship, a complete role description, or sole or decisive policy causation."
      ],
      antiClaims: [
        "Jamie alone repealed the Cabaret Law.",
        "Jamie authored the legislation.",
        "Jamie alone created the coalition's arguments or strategy.",
        "The peer post proves the precise causal weight of Jamie's work."
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
      project: "kc-town-hall",
      internalClaim:
        "Public records confirm Jamie's direct participation in the shared Tired of Tires workflow: a KC Town Hall operating update names him among participants, and Jimmy Fitzner describes a dump-truck pickup shift with Jamie in Northeast Kansas City.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "Public project and participant records confirm Jamie's direct participation in recurring neighborhood tire pickup, including a dump-truck shift in Northeast Kansas City.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019",
          relationship: "corroborating",
          supports: ["Jamie's named participation in the shared program workflow"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
          relationship: "direct-support",
          supports: ["a first-hand shared pickup shift", "dump-truck use", "Northeast Kansas City geography"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-WAYBACK-TIRES-2020",
          relationship: "context",
          supports: ["Julia and Jamie byline", "KC Town Hall and Oak Park partnership", "recurring pickup workflow"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Tired of Tires was shared neighborhood work involving KC Town Hall, Oak Park Neighborhood Association, Julia Fredenburg, Pat Clarke, Forest Tyson Jr., Jimmy Fitzner, neighbors, and City staff.",
        "The new evidence confirms direct participation, not Jamie's full recollection of sole design, sole coordination, every monthly shift, or the Indian Mound expansion.",
        "Project-account tire and savings figures remain self-reported rather than independently audited outcomes."
      ],
      antiClaims: [
        "Jamie alone created or operated Tired of Tires.",
        "Jamie personally performed every pickup.",
        "The sources independently verify tire or savings totals.",
        "The sources establish the complete service geography or operating period."
      ],
      researchInquiryIds: [
        "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026",
        "INQ-KCTH-PHASE-ONE-ARCHIVE-PASS-2026"
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-URBANHERM-X-OWNER-ARCHIVE",
      project: "urbanhermit-public-record",
      question:
        "Can Jamie's account-owner X Archive reconcile deleted, withheld, or otherwise absent historical records with the 434 live-profile population?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Request or locate the account-owner archive through X's data-export process",
        "Compare stable status IDs and timestamps without publishing raw personal content",
        "Record deleted or absent records as protected dispositions unless independently public-safe"
      ],
      successCriteria: [
        "Reconcile live-profile and owner-archive denominators",
        "Preserve absence, deletion, and non-recovery as distinct states",
        "Keep raw personal content and private account data outside the public repository"
      ],
      sourceIds: [
        "SRC-URBANHERM-X-CORPUS-2026-07-15",
        "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15"
      ],
      claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      publicSummary:
        "Reconcile the complete live-profile pass against a lawful account-owner archive if one becomes available.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-URBANHERM-X-POSTED-SOURCE-MATURATION",
      project: "urbanhermit-public-record",
      question:
        "Which of the 321 distinct posted short URLs contain public-safe evidence that should mature into sources, atomic assertions, or bounded claims?",
      priority: "medium",
      status: "in-progress",
      methodsPlanned: [
        "Resolve destinations in evidence-priority order",
        "Close-read recoverable article and institutional records",
        "Keep posting, source contents, and Jamie's role as separate propositions",
        "Preserve dead, blocked, and not-recovered destinations without inventing contents"
      ],
      successCriteria: [
        "Every prioritized destination has a recovered, held, dead, or not-recovered disposition",
        "Promoted claims have direct source support and anti-claims",
        "Collaborator and third-party authorship remains intact"
      ],
      sourceIds: [
        "SRC-URBANHERM-X-CORPUS-2026-07-15",
        "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
        "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"
      ],
      claimIds: [
        "CLM-URBANHERM-WOWLIST-PEER-ATTRIBUTION",
        "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
        "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
        "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
        "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"
      ],
      publicSummary:
        "Continue maturing posted sources by evidentiary value without treating circulation as endorsement or accomplishment.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-URBANHERM-X-CREATIVE-ASSET-REVIEW",
      project: "participatory-programs",
      question:
        "Which creative-media and participatory-program assets have clear role, rights, caption, collaborator-credit, and public-display status?",
      priority: "low",
      status: "queued",
      methodsPlanned: [
        "Locate original media and project documentation",
        "Record creator, collaborator, participant, and rights-holder credit",
        "Prepare public-safe caption and rights decisions separately from claim confirmation"
      ],
      successCriteria: [
        "Selected assets have role and rights metadata",
        "Collaborator and participant credit is explicit",
        "No asset reaches the site without a public-display decision"
      ],
      sourceIds: [
        "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
        "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016"
      ],
      claimIds: [
        "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
        "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM"
      ],
      publicSummary:
        "Resolve rights, role, caption, and collaborator-credit metadata before visual projection.",
      reviewedAt: "2026-07-15"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-URBANHERM-X-FULL-POPULATION-2026",
      project: "urbanhermit-public-record",
      question:
        "What does the full live profile-counted @urbanhermit population establish about public documentation, posted URLs, mission patterns, incoming stakeholder response, and visible traction?",
      methods: [
        "Verified the signed-in @urbanhermit identity and the 434-post profile counter.",
        "Traversed Posts for 137 passes and Replies for 141 passes, continuing through repeated no-growth passes.",
        "Deduplicated stable status URLs and separated 434 primary profile records from two conversation-parent cards authored by another account.",
        "Classified originals, replies, and native reposts while retaining source authorship for external records.",
        "Inventoried posted links and applied a checked-in overlapping mission-signal manifest.",
        "Ran year-bounded authenticated incoming searches from 2008 through 2026.",
        "Replaced nine non-mission personal or network-context results with identity-free public dispositions.",
        "Excluded raw post text, private account surfaces, and authenticated-session state from the public corpus."
      ],
      runAt: "2026-07-15",
      resultStatus: "recovered",
      findings: [
        "The 434-record union reconciles exactly to the live profile counter: 340 originals, 13 replies, and 81 external-source native reposts.",
        "The recovered range is October 4, 2008 through April 17, 2023.",
        "The population contains 349 external-link occurrences representing 321 distinct short URLs across 277 records.",
        "Strict overlapping rules identify recurring source-record signals across six mission-relevant families.",
        "A bounded incoming search recovered 15 mission-relevant third-party records from nine accounts and two mission-relevant conversation contexts.",
        "On the capture date, 85 account-authored records displayed 175 likes, eight replies, and 60 reposts; the figures remain held from accomplishment messaging."
      ],
      limitations: [
        "The result is complete for the live profile-counted population, not an account-owner export or deletion history.",
        "Not all 321 posted destinations were resolved and close-read.",
        "Mission categories overlap and do not measure labor, priority, audience, agreement, or outcome.",
        "Incoming search excludes likes, private activity, deleted or unindexed records, direct messages, and responses that omit the handle.",
        "Visible counters are volatile interface observations, not unique people, reach, endorsement, conversion, attendance, or impact."
      ],
      sourceIds: [
        "SRC-URBANHERM-X-CORPUS-2026-07-15",
        "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15"
      ],
      publicSummary:
        "An authenticated pass accounts for all 434 records represented by the live @urbanhermit profile counter while preserving authorship, privacy, and missing-history boundaries."
    },
    {
      id: "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026",
      project: "urbanhermit-public-record",
      question:
        "Which mission-relevant records and posted destinations support defensible professional claims without turning social circulation into authorship or causation?",
      methods: [
        "Prioritized mission-signaled records and independently authored incoming attributions.",
        "Opened source posts in the authenticated browser and kept source authorship attached.",
        "Close-read NPR, KCUR, and Brooklyn Daily Eagle records.",
        "Separated individual role, collective outcome, source circulation, and volatile engagement propositions.",
        "Added claim boundaries, anti-claims, research tasks, and held projection decisions."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "Music Hackathon / Music Community Lab identified Jamie as a co-organizer and credited him with making WOW List as an event-sharing service.",
        "NPR and two collaborator-network posts credit Jamie and M.C. Schmidt for the Horse Lords 'Truthers' video.",
        "KCUR documents Jamie's participatory 8th Street Tunnel route and screening; Julia Fredenburg publicly attributed the historical interpretation to him.",
        "Coalition-account posts publicly attribute cultural-space and trust-and-safety statements to Jamie, while a civic-design peer recognized Jamie and Julia's work on the repeal effort.",
        "A project-account update and Jimmy Fitzner's first-hand account confirm Jamie's direct participation in tire pickup without proving sole design or operation.",
        "A Brooklyn Daily Eagle article directly quotes NYC Artist Coalition and records the public-feedback sequence around the proposed Office of Nightlife without naming Jamie individually."
      ],
      limitations: [
        "Most of the 321 distinct posted short URLs remain unprioritized or not close-read at article level.",
        "A source posted or reposted by Jamie is not automatically coverage, endorsement, partnership, or evidence of Jamie's role.",
        "Creative-media rights and role granularity require separate asset review.",
        "The new claims remain knowledge-bank depth until an audience-specific projection decision is made."
      ],
      sourceIds: [
        "SRC-URBANHERM-X-CORPUS-2026-07-15",
        "SRC-URBANHERM-X-MUSIC-HACKATHON-WOWLIST-2015",
        "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
        "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
        "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
        "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
        "SRC-URBANHERM-X-KCTH-TIRES-2019",
        "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023"
      ],
      publicSummary:
        "The first maturation pass produced five bounded role or program claims and retained the remaining posted-source population as an explicit research queue."
    }
  ],
  pages: []
};
