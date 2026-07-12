import type { KnowledgeBank } from "./schema.ts";

type ArchivalProductionBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const archivalProductionBatchRecords: ArchivalProductionBatch = {
  sources: [
    {
      id: "SRC-RAFT-SOUNDINGS-2007",
      title: "Rollin' on the river ... again",
      organization: "Soundings",
      author: "Soundings Editors",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://soundingsonline.com/news/rollin-on-the-river-again/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Soundings Editors, 'Rollin' on the river ... again,' Soundings, accessed July 12, 2026.",
      publicNote:
        "The report identifies Jamie, Libby Hendon, and Laura Mattingly as the traveling trio and documents a collaborative, human-powered expedition that began in Kansas City.",
      supportsGenerally: [
        "the expedition began on the Missouri River in Kansas City",
        "the group had traveled approximately 1,100 miles before resuming from Vicksburg",
        "Jamie and collaborators built a bicycle-powered raft from reclaimed materials",
        "the group invited people encountered along the route to participate"
      ],
      doesNotEstablish: [
        "an exact final landing point",
        "completion of every planned route segment",
        "solo execution by Jamie",
        "a complete participant roster"
      ]
    },
    {
      id: "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
      title: "A Sorted Audio File",
      organization: "Monthly Music Hackathon NYC / Music Community Lab",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2013-02-27",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Monthly Music Hackathon NYC, 'A Sorted Audio File,' February 27, 2013.",
      publicNote:
        "The project page documents a small working program Jamie made during a public music-technology event.",
      supportsGenerally: [
        "Jamie built a Max/MSP audio-processing program in 2013",
        "the program segmented audio and sorted clips by a selected feature",
        "Jamie presented the experiment through Monthly Music Hackathon NYC"
      ],
      doesNotEstablish: [
        "production deployment",
        "commercial adoption",
        "sole organization of the hackathon",
        "current maintenance of the program"
      ]
    },
    {
      id: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
      title:
        "Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC",
      organization: "Jamie Burkart / NYC Artist Coalition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-03-27",
      accessedAt: "2026-07-12",
      canonicalUrl:
        "https://jamieburk.art/artifacts/toward-a-fuller-public-baseline-commercial-vacancy-lease-cost-nyc.pdf",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Jamie Burkart, 'Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC,' March 27, 2026.",
      publicNote:
        "The two-page public brief specifies a deliberately small, privacy-preserving pilot rather than requesting confidential filing or tenant-level data.",
      supportsGenerally: [
        "Jamie authored a privacy-preserving commercial vacancy and lease-cost data proposal",
        "the proposal defines a minimum viable indicator table, coverage and suppression table, and methods note",
        "the proposed release uses geography-aggregated RPIE-derived indicators alongside existing storefront reporting",
        "the brief distinguishes a public indicator layer from confidential source records"
      ],
      doesNotEstablish: [
        "agency adoption of the proposal",
        "implementation of the proposed dataset",
        "access to confidential RPIE filings",
        "official legal or statistical authority"
      ],
      media: {
        mediaKind: "document",
        rightsHolder: "Jamie Burkart",
        rightsStatus: "cleared",
        consentStatus: "not-applicable",
        publicDisplayStatus: "cleared",
        visibleText: [
          "Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC",
          "Not instead of storefront data - alongside it"
        ]
      }
    },
    {
      id: "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
      title: "Commercial Rent Stabilization legislative provenance redline, 2019-2025",
      organization: "Jamie Burkart / NYC Artist Coalition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-05-16",
      publicCitation:
        "Jamie Burkart, public-safe metadata for a Commercial Rent Stabilization legislative provenance redline, updated May 16, 2026.",
      publicNote:
        "The underlying working document remains outside the public repository because it includes legal and policy review context.",
      protectedLocatorId: "ARCHIVE-CRS-PROVENANCE-REDLINE-2026-001",
      supportsGenerally: [
        "Jamie created a tracked source-lineage comparison across public legislative texts",
        "the document distinguishes source layers from individual drafting authorship",
        "the work traces NYC and Albany policy lineages for collaborator review"
      ],
      doesNotEstablish: [
        "legal advice",
        "Jamie's authorship of the legislation",
        "official legislative history",
        "public clearance of the underlying working document"
      ]
    },
    {
      id: "SRC-CRS-OPEN-DATA-FOUNDATION-2025",
      title: "Open Data Foundation for a Future Commercial Rent Guidelines Board",
      organization: "NYC Artist Coalition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2025-11-26",
      publicCitation:
        "NYC Artist Coalition, public-safe metadata for 'Open Data Foundation for a Future Commercial Rent Guidelines Board,' November 26, 2025.",
      publicNote:
        "The source is retained as evidence of policy-to-data implementation work; the outgoing correspondence and distribution context remain outside the public repository.",
      protectedLocatorId: "ARCHIVE-CRS-OPEN-DATA-FOUNDATION-2025-001",
      supportsGenerally: [
        "Jamie drafted a bounded request for public aggregate commercial real-estate indicators",
        "the proposal connected published City reports, storefront data, and reusable methods documentation",
        "the request explicitly excluded confidential and proprietary microdata"
      ],
      doesNotEstablish: [
        "recipient endorsement",
        "agency adoption",
        "implementation of a Commercial Rent Guidelines Board",
        "public clearance of the correspondence"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT",
      project: "fair-rent-nyc",
      internalClaim:
        "Jamie translated a commercial-vacancy data opportunity into an implementation-ready, privacy-preserving pilot specification.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie translated a public-data opportunity into a smallest-serious-pilot brief: geography-aggregated commercial vacancy and lease-cost indicators, a coverage and suppression table, and a plain-language methods note, designed to complement existing storefront reporting without exposing confidential filings or tenant-level records.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
          relationship: "direct-support",
          supports: [
            "the privacy-preserving pilot brief",
            "the three-part minimum release",
            "the boundary against confidential filings and tenant-level records"
          ],
          locator: "Pages 1-2",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-CRS-OPEN-DATA-FOUNDATION-2025",
          relationship: "context",
          supports: ["the preceding policy-to-data implementation lane"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe the brief as a proposal and implementation specification, not an adopted City program.",
        "Do not imply access to confidential RPIE records or official statistical authority."
      ],
      antiClaims: [
        "New York City adopted Jamie's proposal",
        "Jamie built or operated the proposed City dataset",
        "Jamie had access to confidential tax filings"
      ],
      researchInquiryIds: ["INQ-TEAMS-ARCHIVAL-PRODUCTION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-TEAMS-ARCHIVAL-PRODUCTION-2026",
      project: "knowledge-bank",
      question:
        "Which public-safe sources and defensible claims in Jamie Projects History, CRS, and job-hunt materially strengthen Jamie's hiring narrative?",
      methods: [
        "Used archive overviews and curated project directories as routing layers instead of treating every file as equally probative.",
        "Closely read public project captures, authored CRS briefs, a legislative source-lineage artifact, the current resume, and the job-hunt context outline.",
        "Separated independent public evidence, Jamie-authored public artifacts, protected working records, and editorial synthesis before claim promotion.",
        "Recorded iCloud hydration as a collection limitation and treated not-materialized files as unavailable, not nonexistent."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "Jamie Projects History supplied additional public evidence for the scale and participatory design of the river expedition and for a 2013 audio-software experiment.",
        "CRS supplied a public-safe, implementation-ready open-data pilot brief plus protected evidence of legislative provenance and policy-to-data work.",
        "The job-hunt archive confirmed that technical project management, product operations, civic implementation, and source-backed knowledge systems are the highest-value composition frame; it was used as editorial routing rather than independent proof."
      ],
      limitations: [
        "The review was selective rather than exhaustive.",
        "Some iCloud records were not fully materialized during the review window.",
        "Private correspondence, stakeholder records, legal-review context, and unpublished meeting-source files were excluded from the public repository.",
        "An unavailable or unread file was not treated as evidence that a record never existed."
      ],
      sourceIds: [
        "SRC-RAFT-SOUNDINGS-2007",
        "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
        "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
        "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
        "SRC-CRS-OPEN-DATA-FOUNDATION-2025"
      ],
      publicSummary:
        "A selective review of three working archives promoted one public CRS implementation claim, strengthened the participatory-systems record, retained two future-use candidates, and preserved explicit privacy and iCloud-availability limits.",
      protectedLocatorId: "RESEARCH-TEAMS-ARCHIVAL-PRODUCTION-2026-001"
    }
  ]
};
