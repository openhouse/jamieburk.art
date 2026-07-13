import type { KnowledgeBank } from "./schema.ts";

type UrbanHermitPopulationBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

const selectedPosts = [
  {
    id: "SRC-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
    title: "Jamie Burkart river, handicraft, and software office-hours post",
    publishedAt: "2009-06-15",
    canonicalUrl: "https://x.com/urbanhermit/status/2179328286",
    publicCitation:
      "Jamie Burkart post inviting conversation about river projects, handicrafts, and software design, June 15, 2009.",
    supportsGenerally: [
      "an early public connection among participatory river work, making, and software design"
    ]
  },
  {
    id: "SRC-URBANHERMIT-HJE-WEB-PRACTICE-2010",
    title: "Jamie Burkart Harry J. Epstein Co. web-practice post",
    publishedAt: "2010-01-24",
    canonicalUrl: "https://x.com/urbanhermit/status/8154854842",
    publicCitation:
      "Jamie Burkart post describing work on a forward-looking Harry J. Epstein Co. hand-tool website, January 24, 2010.",
    supportsGenerally: [
      "Jamie's public description of his Harry J. Epstein Co. web practice in 2010"
    ]
  },
  {
    id: "SRC-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
    title: "Jamie Burkart Sunday Dinner video post",
    publishedAt: "2013-03-26",
    canonicalUrl: "https://x.com/urbanhermit/status/316641626258808832",
    publicCitation:
      "Jamie Burkart post publishing a Sunday Dinner video, March 26, 2013.",
    supportsGenerally: [
      "Jamie's public documentation of Sunday Dinner through video"
    ]
  },
  {
    id: "SRC-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
    title: "Jamie Burkart NYC Council public-engagement post",
    publishedAt: "2015-04-14",
    canonicalUrl: "https://x.com/urbanhermit/status/588028157510418432",
    publicCitation:
      "Jamie Burkart post routing people to an NYC Council public-hearing question pathway, April 14, 2015.",
    supportsGenerally: [
      "Jamie's public interest in making civic participation pathways usable"
    ]
  },
  {
    id: "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016",
    title: "Jamie Burkart Horse Lords video credit post",
    publishedAt: "2016-04-29",
    canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
    publicCitation:
      "Jamie Burkart post linking to NPR's feature on the Horse Lords 'Truthers' video and naming his collaboration with M.C. Schmidt, April 29, 2016.",
    supportsGenerally: [
      "Jamie's contemporaneous account of co-creating the Horse Lords video with M.C. Schmidt"
    ]
  },
  {
    id: "SRC-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
    title: "Jamie Burkart Let NYC Dance safety-framing post",
    publishedAt: "2017-03-21",
    canonicalUrl: "https://x.com/urbanhermit/status/844221071465373696",
    publicCitation:
      "Jamie Burkart post connecting the criminalization and closure of cultural spaces to unsafe underground conditions, March 21, 2017.",
    supportsGenerally: [
      "Jamie's public safety framing within Let NYC Dance advocacy"
    ]
  },
  {
    id: "SRC-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
    title: "Jamie Burkart media-archaeology workflow post",
    publishedAt: "2020-11-22",
    canonicalUrl: "https://x.com/urbanhermit/status/1330547315132731398",
    publicCitation:
      "Jamie Burkart post describing a dual-boot workflow for preserving access to older software used in media archaeology, November 22, 2020.",
    supportsGenerally: [
      "Jamie's practical attention to preserving access to older software and media workflows"
    ]
  }
] as const;

export const urbanhermitPopulationBatchRecords: UrbanHermitPopulationBatch = {
  sources: [
    {
      id: "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
      title: "Jamie Burkart live X profile",
      author: "Jamie Burkart",
      kind: "personal-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://x.com/urbanhermit",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Jamie Burkart's public @urbanhermit X profile, accessed July 13, 2026.",
      publicNote:
        "The live profile displayed 434 posts and an October 2008 join date.",
      supportsGenerally: [
        "the account identity @urbanhermit",
        "a displayed control total of 434 posts",
        "an October 2008 join date"
      ],
      doesNotEstablish: [
        "records deleted before capture",
        "that reposted statements were authored by Jamie",
        "that thematic record counts measure work effort, outcomes, or audience reach"
      ]
    },
    {
      id: "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026",
      title: "Jamie Burkart personal-account full-population accounting run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level accounting of the surviving @urbanhermit profile population.",
      publicNote:
        "The public repository retains a redacted 434-row accounting ledger and aggregate findings. Full text, status identifiers, URLs, exact dates, and protected research artifacts remain outside the repository.",
      protectedLocatorId: "RESEARCH-URBANHERMIT-FULL-POPULATION-2026-001",
      supportsGenerally: [
        "all 434 live-profile records recovered and deduplicated",
        "421 unique records recovered from Posts plus 13 additional Jamie-authored replies",
        "338 authored standalone posts, 15 authored replies, and 81 reposts",
        "a surviving record from October 4, 2008, through April 17, 2023",
        "a record-level public-safety disposition for every recovered item"
      ],
      doesNotEstablish: [
        "the content or count of records deleted before capture",
        "authorship of reposted material",
        "audience reach, impressions, or professional outcomes",
        "that heuristic themes measure time, importance, or effort"
      ]
    },
    ...selectedPosts.map((source) => ({
      ...source,
      author: "Jamie Burkart",
      kind: "personal-social-post" as const,
      visibility: "public" as const,
      preservationStatus: "live" as const,
      accessedAt: "2026-07-13" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [
        "independent verification of every statement in the post",
        "project outcome, audience reach, or sole authorship unless separately corroborated"
      ]
    })),
    {
      id: "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
      title: "Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle",
      organization: "NPR Music",
      author: "Lars Gotrich",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-04-29",
      accessedAt: "2026-07-13",
      canonicalUrl:
        "https://www.npr.org/2016/04/29/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Lars Gotrich, \"Video: Horse Lords' Hypnotic 'Truthers' Will Blast Your Noodle,\" NPR Music, April 29, 2016.",
      publicNote:
        "NPR identifies M.C. Schmidt and Jamie Burkart as the video's makers and quotes Horse Lords saxophonist Andrew Bernstein on how the visual construction mirrors the band's music.",
      supportsGenerally: [
        "Jamie Burkart and M.C. Schmidt made the official Horse Lords 'Truthers' video",
        "the video used simple visual materials, repetition, variation, text, and color to translate the music's structure",
        "the video was published by NPR Music"
      ],
      doesNotEstablish: [
        "Jamie's sole authorship",
        "the division of labor between Jamie and M.C. Schmidt",
        "commercial performance, audience reach, or later use"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-URBANHERMIT-POPULATION-ACCOUNTING",
      project: "professional-archive",
      internalClaim:
        "The July 2026 @urbanhermit census recovered and accounted for all 434 records displayed by the live profile.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "All 434 records in the live @urbanhermit profile control were recovered: 338 authored posts, 15 authored replies, and 81 reposts.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/urbanhermit-population-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the 434-post live-profile control"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record recovery, reconciliation, type accounting, and redaction"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete recovery means the union closes against the current live-profile count; it cannot reveal records deleted before capture.",
        "The account includes authored posts, replies, and reposts; reposted text is not Jamie's authorship.",
        "Thematic classifications are interpretive record labels, not measures of effort, impact, or professional priority."
      ],
      antiClaims: [
        "Every record Jamie ever posted was recovered",
        "Jamie authored all 434 records",
        "The public census reproduces Jamie's personal timeline"
      ],
      researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016",
      project: "creative-technology",
      internalClaim:
        "Jamie Burkart and M.C. Schmidt made the official 2016 Horse Lords 'Truthers' video featured by NPR Music.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie Burkart and M.C. Schmidt made Horse Lords' official 2016 'Truthers' video, which NPR Music featured and described through the band's account of its visual construction.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/urbanhermit-population-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-HORSE-LORDS-TRUTHERS-NPR-2016",
          relationship: "direct-support",
          supports: [
            "named co-creator credit",
            "official video context",
            "the band's description of the video's visual method"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016",
          relationship: "corroborating",
          supports: ["Jamie's contemporaneous public account of the collaboration"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Credit Jamie and M.C. Schmidt together.",
        "The sources do not establish their division of labor, commercial results, or audience reach.",
        "Retain this in the knowledge bank until a future public composition needs the creative-technology range."
      ],
      antiClaims: [
        "Jamie alone made the Horse Lords video",
        "NPR commissioned the video",
        "The feature proves commercial success"
      ],
      researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-URBANHERMIT-PRACTICE-THREADS",
      project: "professional-archive",
      internalClaim:
        "Selected public-safe records from Jamie's personal account document recurring threads across participatory place work, software and web practice, community documentation, civic participation, cultural advocacy, and media preservation.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text:
            "Selected records document recurring threads across participatory place work, software and web practice, community documentation, civic participation, cultural advocacy, and media preservation.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/urbanhermit-population-2026-07-13"]
        }
      ],
      evidence: selectedPosts
        .filter((source) => source.id !== "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016")
        .map((source) => ({
          sourceId: source.id,
          relationship: "direct-support" as const,
          supports: ["one dated, public-safe instance of a recurring practice thread"],
          confidence: "high" as const,
          renderCitation: false
        })),
      boundaries: [
        "This is a description of selected public records, not independent proof of every project outcome.",
        "The selection is editorial and does not make the account a resume or comprehensive career chronology.",
        "Ordinary-life and relational records remain intentionally outside professional projection."
      ],
      antiClaims: [
        "Every personal post is professional evidence",
        "Theme frequency measures Jamie's professional priorities",
        "The selected records independently establish project outcomes"
      ],
      researchInquiryIds: ["INQ-URBANHERMIT-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-URBANHERMIT-FULL-POPULATION-2026",
      project: "professional-archive",
      question:
        "Can 100 percent of the surviving @urbanhermit profile population be recovered, classified, and integrated without turning a personal timeline into a public dossier?",
      methods: [
        "Used the authenticated live profile's displayed 434-post count as the control total.",
        "Harvested the Posts timeline to its October 2008 endpoint, recovering 421 unique visible records.",
        "Harvested the Replies surface, filtered context records to Jamie-authored items, and recovered 13 additional replies absent from Posts.",
        "Deduplicated the union by status ID, yielding exactly 434 surviving records.",
        "Classified every record by year, record type, and one primary interpretive theme; records without readable prose received a media-only or text-unavailable label.",
        "Separated authored records from reposts before interpreting account activity.",
        "Close-read professional candidates and independently corroborated the strongest new credit through NPR Music.",
        "Generated an aggregate-only 434-row public ledger while keeping full text, exact dates, handles, status IDs, URLs, and protected research artifacts outside the repository."
      ],
      runAt: "2026-07-13",
      resultStatus: "recovered",
      findings: [
        "The Posts and Replies union closes exactly against the 434-post live-profile control.",
        "The surviving population contains 338 authored standalone posts, 15 authored replies, and 81 reposts.",
        "The surviving record spans October 4, 2008, through April 17, 2023.",
        "Authored records include recurring public traces of participatory place work, software and web practice, community documentation, civic participation, cultural advocacy, and media preservation.",
        "NPR Music independently identifies Jamie Burkart and M.C. Schmidt as makers of Horse Lords' official 2016 'Truthers' video.",
        "Historic personal records contain contact, location, health, relationship, and ordinary-life material that should not be republished as a professional archive."
      ],
      limitations: [
        "The current profile count cannot reveal records deleted before capture.",
        "X's Posts and Replies surfaces are interface views rather than an official account export.",
        "Quoted and reposted material remains attributable to its displayed source account, not Jamie.",
        "Theme labels are deterministic research aids but remain interpretive and do not measure time, importance, effort, reach, or impact.",
        "Media-only records may contain visual or audio evidence not recoverable from timeline text alone."
      ],
      sourceIds: [
        "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
        "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026",
        ...selectedPosts.map((source) => source.id),
        "SRC-HORSE-LORDS-TRUTHERS-NPR-2016"
      ],
      publicSummary:
        "All 434 records displayed by the live profile were recovered and accounted for. The public repository preserves aggregate accounting and selected professional evidence while withholding the raw personal timeline.",
      protectedLocatorId: "RESEARCH-URBANHERMIT-FULL-POPULATION-2026-001"
    }
  ]
};
