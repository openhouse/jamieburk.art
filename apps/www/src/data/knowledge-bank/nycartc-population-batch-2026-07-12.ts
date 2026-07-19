import type { KnowledgeBank } from "./schema.ts";

type NYCArtCPopulationBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

const publicPosts = [
  {
    id: "SRC-NYCAC-SOCIAL-FAIR-RENT-2026",
    title: "NYC Artist Coalition Fair Rent advocacy post",
    publishedAt: "2026-05-14",
    canonicalUrl: "https://x.com/NYCArtC/status/2054892314493911211",
    publicCitation:
      "NYC Artist Coalition post continuing Fair Rent NYC advocacy, May 14, 2026.",
    supportsGenerally: [
      "continued Fair Rent NYC advocacy in 2026",
      "the shared identity's current public use"
    ]
  },
  {
    id: "SRC-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
    title: "NYC Artist Coalition Create in Place resource post",
    publishedAt: "2026-03-13",
    canonicalUrl: "https://x.com/NYCArtC/status/2032442113439256843",
    publicCitation:
      "NYC Artist Coalition post routing creative small businesses and nonprofit arts organizations to a City capacity-building webinar series, March 13, 2026.",
    supportsGenerally: [
      "artist and creative-organization resource routing",
      "continued use of the shared identity as a public information surface"
    ]
  },
  {
    id: "SRC-NYCAC-SOCIAL-ARTIST-LABOR-2026",
    title: "NYC Artist Coalition artist-labor action post",
    publishedAt: "2026-03-11",
    canonicalUrl: "https://x.com/NYCArtC/status/2031705790210269485",
    publicCitation:
      "NYC Artist Coalition post distributing an artist-labor rally for AI protections and fair pay, March 11, 2026.",
    supportsGenerally: [
      "artist-labor action distribution",
      "continued use of the shared identity across adjacent cultural-work issues"
    ]
  },
  {
    id: "SRC-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025",
    title: "NYC Artist Coalition Talks Not Raids accountability post",
    publishedAt: "2025-10-03",
    canonicalUrl: "https://x.com/NYCArtC/status/1974171303675637872",
    publicCitation:
      "NYC Artist Coalition post connecting current nightlife enforcement concerns to Talks Not Raids, October 3, 2025.",
    supportsGenerally: [
      "continued Talks Not Raids accountability work",
      "cross-year continuity of the coalition identity"
    ]
  }
] as const;

export const nycartcPopulationBatchRecords: NYCArtCPopulationBatch = {
  sources: [
    {
      id: "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
      title: "NYC Artist Coalition live X profile",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/NYCArtC",
      preferredPublicUrl: "canonical",
      publicCitation:
        "NYC Artist Coalition public X profile, accessed July 12, 2026.",
      publicNote:
        "The live profile displayed 5,124 posts, a January 2017 join date, and the shared coalition identity @NYCArtC.",
      supportsGenerally: [
        "the account identity @NYCArtC",
        "a displayed control total of 5,124 posts",
        "a January 2017 join date",
        "continued public activity in 2026"
      ],
      doesNotEstablish: [
        "individual authorship of shared-account records",
        "a complete downloadable account export",
        "that every historical record remains accessible",
        "policy causality or audience reach"
      ]
    },
    {
      id: "SRC-NYCAC-FULL-POPULATION-RUN-2026",
      title: "NYC Artist Coalition full-population accounting run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level accounting of the @NYCArtC profile population.",
      publicNote:
        "The 5,124-row public census records 892 recovered public records and 4,232 unresolved profile-counted slots. Full post text and protected research artifacts remain outside the public repository.",
      protectedLocatorId: "RESEARCH-NYCAC-FULL-POPULATION-2026-001",
      supportsGenerally: [
        "all 5,124 profile-counted slots accounted for",
        "892 surviving public records recovered and deduplicated",
        "4,232 slots retained as unresolved rather than inferred",
        "541 recovered reposts, 103 authored standalone posts, 12 authored replies, and 236 archived account-authored records whose post-versus-reply type remains unresolved",
        "a recovered public record from March 31, 2017, through May 18, 2026"
      ],
      doesNotEstablish: [
        "complete record recovery",
        "the content, date, or authorship type of unresolved slots",
        "individual authorship of account records",
        "population-wide thematic proportions",
        "policy causality, impressions, or audience reach"
      ]
    },
    ...publicPosts.map((source) => ({
      ...source,
      organization: "NYC Artist Coalition",
      author: "NYC Artist Coalition account",
      kind: "institutional-social-post" as const,
      visibility: "public" as const,
      preservationStatus: "live" as const,
      accessedAt: "2026-07-12" as const,
      preferredPublicUrl: "canonical" as const,
      supportsGenerally: [...source.supportsGenerally],
      doesNotEstablish: [
        "the individual teammate who authored the post",
        "Jamie's uninterrupted operation of the shared account",
        "policy causality or audience reach"
      ]
    }))
  ],
  claims: [
    {
      id: "CLM-NYCAC-POPULATION-ACCOUNTING",
      project: "nyc-artist-coalition",
      internalClaim:
        "The July 2026 @NYCArtC census accounts for all 5,124 live-profile slots: 892 surviving public records recovered and 4,232 explicitly unresolved.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "All 5,124 profile-counted @NYCArtC slots are represented in the ledger: 892 recovered public records and 4,232 unresolved slots.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nycartc-population-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the 5,124-post live-profile control"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level recovery, deduplication, and unresolved-slot accounting"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is complete accounting, not complete recovery: 82.6 percent of profile-counted slots remain unresolved.",
        "Recovered-record theme counts describe only the recovered 17.4 percent.",
        "The current control does not establish that no older record was deleted before capture."
      ],
      antiClaims: [
        "All 5,124 records were recovered",
        "The recovered sample represents the full account proportionally",
        "Jamie authored or operated all account records"
      ],
      researchInquiryIds: ["INQ-NYCAC-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
      project: "nyc-artist-coalition",
      internalClaim:
        "The shared @NYCArtC identity remained active through 2026 as a collective surface for campaign advocacy, artist-resource routing, labor action, and nightlife accountability.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "The shared identity remained active through 2026, carrying Fair Rent advocacy, artist-resource pathways, labor actions, and nightlife accountability across one collective public surface.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "archive-note",
          text:
            "Recovered records show the shared account continuing to connect coalition campaigns, artist opportunities, labor action, and civic accountability through 2026.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/nycartc-population-2026-07-12"]
        }
      ],
      evidence: publicPosts.map((source) => ({
        sourceId: source.id,
        relationship: "direct-support" as const,
        supports: ["one documented mode of continued shared-account use"],
        confidence: "high" as const,
        renderCitation: true
      })),
      boundaries: [
        "The account is a shared coalition surface; do not infer the individual author of a post.",
        "Continuity of the identity does not establish Jamie's uninterrupted account operation.",
        "Distribution and advocacy records do not by themselves establish adoption, outcomes, or audience reach."
      ],
      antiClaims: [
        "Jamie authored every @NYCArtC post",
        "Jamie personally operated the account through 2026",
        "The account alone caused campaign or policy outcomes"
      ],
      researchInquiryIds: ["INQ-NYCAC-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-FULL-POPULATION-2026",
      project: "nyc-artist-coalition",
      question:
        "Can 100 percent of the @NYCArtC profile population be recovered, classified, and integrated with honest collective-work boundaries?",
      methods: [
        "Used the authenticated live profile's displayed 5,124-post count as the control total.",
        "Harvested 607 unique records from the live Posts timeline before X stopped pagination and recovered 49 additional 2022 authored records through bounded authenticated search.",
        "Reconciled those records with 279 readable archived status records recovered through Wayback CDX and X oEmbed.",
        "Deduplicated all recovered records by status ID, yielding 892 surviving public records.",
        "Tested current and historical public guest API paths without using browser cookies; profile metadata resolved, but public timeline pagination terminated without records.",
        "Classified recovered records by type, year, primary theme, handles, and hashtags.",
        "Generated one ledger row for every profile-counted slot and retained 4,232 slots as unresolved.",
        "Excluded full post text and protected research artifacts from the public repository."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "All 5,124 profile-counted slots are accounted for, but only 892 records were recovered.",
        "Recovered types are 541 reposts, 103 authored standalone posts, 12 authored replies, and 236 archived account-authored records whose post-versus-reply type remains unresolved.",
        "The recovered public record spans March 31, 2017, through May 18, 2026.",
        "Recovered records document Fair Rent and cultural-space advocacy, artist resources, labor action, public process, mutual aid, housing, and coalition amplification.",
        "The recovered corpus is not a statistically representative sample of the unresolved population."
      ],
      limitations: [
        "X stopped profile pagination after 607 unique live-timeline records during this run.",
        "Authenticated search and Wayback coverage are indexed and selective rather than official exports.",
        "The 4,232 unresolved slots have no inferred IDs, dates, record types, text, themes, or authors.",
        "A shared account does not identify the individual teammate who authored each record.",
        "The profile count cannot reveal records deleted before capture."
      ],
      sourceIds: [
        "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
        "SRC-NYCAC-FULL-POPULATION-RUN-2026",
        ...publicPosts.map((source) => source.id)
      ],
      publicSummary:
        "The 5,124-slot ledger recovers 892 surviving public records and keeps 4,232 unresolved slots visible. The recovered record supports continuity and public-use claims, not population-wide proportions or individual post authorship.",
      protectedLocatorId: "RESEARCH-NYCAC-FULL-POPULATION-2026-001"
    }
  ]
};
