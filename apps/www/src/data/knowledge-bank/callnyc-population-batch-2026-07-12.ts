import type { KnowledgeBank } from "./schema.ts";

type CallNYCPopulationBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const callnycPopulationBatchRecords: CallNYCPopulationBatch = {
  sources: [
    {
      id: "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
      title: "CallNYC live X profile",
      organization: "CallNYC",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://x.com/CallNYCapp",
      preferredPublicUrl: "canonical",
      publicCitation: "CallNYC public X profile, accessed July 12, 2026.",
      publicNote:
        "The live profile displayed a 110-post account-level control total. That counter does not expose the identity or availability of every underlying record.",
      supportsGenerally: [
        "the account identity @CallNYCapp",
        "a displayed control total of 110 posts",
        "an account join date of March 2016"
      ],
      doesNotEstablish: [
        "that all 110 records remain renderable",
        "the status IDs of unavailable records",
        "an official export",
        "a complete interaction graph"
      ]
    },
    {
      id: "SRC-CALLNYC-FULL-POPULATION-RUN-2026",
      title: "CallNYC full-population reconciliation run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-12",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level reconciliation of the complete live @CallNYCapp profile timeline.",
      publicNote:
        "The run used small-step authenticated harvesting of both Posts and Replies, date-bounded X search, Wayback CDX, local public captures, and status-ID deduplication. A public-safe 110-slot census records every recovered status and the unresolved control gap without reproducing full post text.",
      protectedLocatorId: "RESEARCH-CALLNYC-FULL-POPULATION-2026-001",
      supportsGenerally: [
        "107 distinct surviving timeline records reconciled against the live 110-post profile counter",
        "92 CallNYC-authored records: 86 standalone posts and six replies",
        "15 reposted records from 14 other public accounts",
        "72 service-recognition posts among the 92 authored records",
        "26 distinct then-sitting Council member handles named in those recognition posts",
        "66 distinct service-issue hashtag labels across the recognition posts",
        "authored activity from March 5 through October 4, 2016, with repost activity through November 14, 2016"
      ],
      doesNotEstablish: [
        "the status IDs, dates, authorship, or content of the three unresolved records",
        "that the three-record gap represents deleted posts rather than another platform state",
        "that outbound Council-member mentions equal direct Council-member engagement",
        "independent validation of every service-recognition calculation",
        "impressions or a complete historical reaction graph"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-CALLNYC-SURVIVING-POPULATION",
      project: "callnyc",
      internalClaim:
        "A fine-grained authenticated reconciliation recovered 107 distinct surviving timeline records against the live @CallNYCapp profile's 110-post control total: 92 CallNYC-authored records and 15 reposted records.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "The recovered CallNYC account record contains 107 distinct surviving timeline items: 92 authored by CallNYC and 15 reposted from other public accounts. X displays 110 posts, leaving three records unresolved without an official export.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/callnyc-population-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
          relationship: "direct-support",
          supports: ["the displayed 110-post profile control total"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CALLNYC-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["record-level status-ID reconciliation and type counts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe 107 as the complete recovered surviving timeline, not as all 110 profile-counted records.",
        "Keep the three-record difference unresolved until an official account export or equivalent source supplies record-level metadata.",
        "Do not infer that unresolved records were deleted."
      ],
      antiClaims: [
        "One hundred percent of all 110 post contents were recovered",
        "The three missing records were deleted",
        "The live profile counter is an official archival export"
      ],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-CALLNYC-SERVICE-RECOGNITION-PATTERN",
      project: "callnyc",
      internalClaim:
        "Within 92 recovered CallNYC-authored records, 72 posts translated constituent-service data into public service-recognition messages naming 26 distinct then-sitting Council members across 66 service-issue hashtag labels.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Seventy-two of 92 recovered CallNYC-authored records used constituent-service data to recognize 26 then-sitting Council members across 66 issue labels, linking each recognition to a resident-facing service pathway.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/callnyc-population-2026-07-12"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CALLNYC-FULL-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: [
            "record-level classification",
            "service-recognition count",
            "Council-member handle count",
            "issue-label count"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Outbound recognition of a Council member is project authorship, not proof that the member engaged with CallNYC.",
        "Sixty-six counts distinct hashtag labels; some posts carry more than one issue label and some issue labels recur.",
        "The posts communicate CallNYC's interpretation of constituent-service data and are not an independent audit of Council performance."
      ],
      antiClaims: [
        "Twenty-six Council members directly engaged with CallNYC",
        "CallNYC independently audited every Council office",
        "Social recognition caused service improvements"
      ],
      researchInquiryIds: ["INQ-CALLNYC-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-CALLNYC-FULL-POPULATION-2026",
      project: "callnyc",
      question:
        "Can the full population of @CallNYCapp posts be accounted for and classified at record level?",
      methods: [
        "Used the live profile's displayed 110-post count as the account-level control total.",
        "Harvested Posts and Replies with 650-pixel scroll increments, deduplicating every rendered status ID.",
        "Reconciled the timeline against authenticated from-account searches and month-bounded searches.",
        "Queried Wayback CDX for desktop, mobile, and x.com status URLs.",
        "Checked local public profile captures and generated a 110-slot public-safe census without full post text.",
        "Classified every recovered record by authorship type, primary theme, mentions, hashtags, and service-recognition status."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "The live profile displayed 110 posts.",
        "Fine-grained Posts and Replies harvesting recovered 107 unique surviving timeline records.",
        "The recovered record contains 86 authored standalone posts, six authored replies, and 15 reposts.",
        "Seventy-two of the 92 authored records are service-recognition posts.",
        "The recognition posts name 26 distinct then-sitting Council member handles across 66 service-issue hashtag labels.",
        "The 110-slot ledger accounts for 107 recovered records and three unresolved control-gap slots."
      ],
      limitations: [
        "The three-record difference cannot be resolved to status IDs, dates, authorship, or content from the live interface, X search, Wayback, or recovered local captures.",
        "The live profile counter is a control total, not an official export schema.",
        "Reaction counts and impressions were not used because the live interface does not provide a stable historical measurement surface.",
        "An official account export or equivalent record-level source is required for content recovery across all 110 profile-counted records."
      ],
      sourceIds: [
        "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
        "SRC-CALLNYC-FULL-POPULATION-RUN-2026"
      ],
      publicSummary:
        "A record-level pass accounted for the entire 110-slot profile control: 107 surviving records were recovered and classified, while three remain explicitly unresolved pending an official export.",
      protectedLocatorId: "RESEARCH-CALLNYC-FULL-POPULATION-2026-001"
    }
  ]
};
