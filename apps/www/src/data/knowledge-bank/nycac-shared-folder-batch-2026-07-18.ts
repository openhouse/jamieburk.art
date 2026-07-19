import type { KnowledgeBank } from "./schema.ts";

type NycacSharedFolderBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const nycacSharedFolderBatchRecords: NycacSharedFolderBatch = {
  sources: [
    {
      id: "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
      title: "NYC Artist Coalition Shared Folder archival-production census",
      organization: "NYC Artist Coalition collaborators",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-18",
      publicCitation:
        "Public-safe metadata for one internally closed July 2026 inventory and disposition capture of the accessible NYC Artist Coalition Shared Folder.",
      publicNote:
        "The public record contains aggregate coverage and boundaries only; exact titles, paths, identifiers, file bodies, and private records remain outside git.",
      protectedLocatorId: "RESEARCH-NYCAC-SHARED-FOLDER-CENSUS-2026-001",
      supportsGenerally: [
        "one July 18 capture recorded 2,365 accessible descendants under its declared descendant-counting method",
        "the accessible population contained 258 folders and 2,107 files",
        "16 selected documents were close-read",
        "seven items exposed limited-access signals and zero traversal errors remained after retry",
        "zero media items were rights-cleared in this pass"
      ],
      doesNotEstablish: [
        "that every file was opened or interpreted",
        "that Jamie created or authored every accessible item",
        "that shared access grants publication rights",
        "that candidate public sources or media are approved for publication",
        "that the folder is a complete history of NYC Artist Coalition",
        "that 2,365 is the canonical population across captures or counting methods"
      ]
    },
    {
      id: "SRC-NYCAC-ARCHIVE-FAIRRENT-WEB-IMPLEMENTATION-2019",
      title: "FairRentNYC web and data implementation record",
      organization: "NYC Artist Coalition / FairRentNYC",
      author: "Jamie Burkart and collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-18",
      publicCitation:
        "Public-safe metadata for a FairRentNYC implementation checklist assigning a concrete web and data workstream to Jamie Burkart.",
      publicNote:
        "The underlying collaborative record remains private; only Jamie's documented implementation domains and the limits of the record are summarized.",
      protectedLocatorId: "ARCHIVE-NYCAC-FAIRRENT-WEB-IMPLEMENTATION-2019-001",
      supportsGenerally: [
        "the record assigns FairRentNYC web implementation work to Jamie",
        "the workstream spans responsive presentation, mapped location data, geocoding and verification, forms, campaign calls to action, sponsor sequencing, press, partner, and social modules",
        "the record connects web delivery to campaign outreach and information-quality needs"
      ],
      doesNotEstablish: [
        "that Jamie authored every policy position or line of campaign copy",
        "that every listed item shipped exactly as proposed",
        "solo ownership of FairRentNYC or NYC Artist Coalition",
        "sole causality for legislation, sponsorship, press, or campaign outcomes"
      ]
    },
    {
      id: "SRC-NYCAC-ARCHIVE-FAIRRENT-CAMPAIGN-ARCHITECTURE-2019",
      title: "FairRentNYC campaign information-architecture note",
      organization: "NYC Artist Coalition / FairRentNYC",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-18",
      publicCitation:
        "Public-safe metadata for Jamie Burkart's FairRentNYC campaign information-architecture note.",
      publicNote:
        "The note documents product and campaign-architecture intent; it is not treated as proof that every proposed feature was delivered.",
      protectedLocatorId: "ARCHIVE-NYCAC-FAIRRENT-CAMPAIGN-ARCHITECTURE-2019-001",
      supportsGenerally: [
        "Jamie designed a multi-issue campaign surface with prioritized next actions",
        "the design connected bill sponsorship progress, map-based presentation, and campaign-leadership information needs",
        "the note distinguishes primary actions from secondary information"
      ],
      doesNotEstablish: [
        "delivery of every proposed feature",
        "campaign adoption of every recommendation",
        "authorship of the underlying policy proposals",
        "solo campaign leadership"
      ]
    },
    {
      id: "SRC-NYCAC-ARCHIVE-SMALL-BUSINESS-TESTIMONY-2019",
      title: "Cultural-space regulation and public-data testimony draft",
      organization: "NYC Artist Coalition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-18",
      publicCitation:
        "Public-safe metadata for Jamie Burkart's 2019 draft testimony translating cultural-space regulatory experience into public-data and service-design proposals.",
      publicNote:
        "The draft supports authorship of the proposal language, not delivery at a hearing or agency adoption.",
      protectedLocatorId: "ARCHIVE-NYCAC-SMALL-BUSINESS-TESTIMONY-2019-001",
      supportsGenerally: [
        "Jamie proposed machine-readable city regulatory datasets",
        "Jamie proposed resident- and operator-facing tools mapping licensing, permitting, and inspection paths to compliance",
        "the proposal grew from recurring contact with cultural-space operators and public-service staff"
      ],
      doesNotEstablish: [
        "that the draft was delivered verbatim in a public hearing",
        "that the City adopted the proposal",
        "official legal or regulatory authority",
        "that Jamie spoke for every cultural-space operator"
      ]
    },
    {
      id: "SRC-NYCAC-ARCHIVE-LETNYCDANCE-DIGITAL-GUIDE-2017",
      title: "Let NYC Dance digital action guide",
      organization: "NYC Artist Coalition and campaign collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-18",
      publicCitation:
        "Public-safe metadata for a coordinated digital action guide supporting the collective Let NYC Dance campaign.",
      publicNote:
        "The guide is collective campaign evidence. This record does not assign Jamie sole authorship of the guide, its language, or the campaign.",
      protectedLocatorId: "ARCHIVE-NYCAC-LETNYCDANCE-DIGITAL-GUIDE-2017-001",
      supportsGenerally: [
        "a coordinated action system connected Council calls, campaign language, social templates, public handles, and a campaign website",
        "the guide translated a policy campaign into specific participant actions and reusable communications"
      ],
      doesNotEstablish: [
        "Jamie's sole authorship of the guide",
        "Jamie's sole leadership of the campaign",
        "that every listed participant took every action",
        "sole causality for Cabaret Law repeal"
      ]
    },
    {
      id: "SRC-NYCAC-ARCHIVE-SHARED-FOLDER-FAQ-2017",
      title: "NYC Artist Coalition shared-resource orientation",
      organization: "NYC Artist Coalition collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-18",
      publicCitation:
        "Public-safe metadata for the coalition's collaborative shared-resource orientation.",
      publicNote:
        "The record describes a mutual-support purpose and shared contribution model; it does not establish individual ownership or authorship of the folder.",
      protectedLocatorId: "ARCHIVE-NYCAC-SHARED-RESOURCE-ORIENTATION-2017-001",
      supportsGenerally: [
        "the folder was framed as a collaborative and evolving mutual-support resource",
        "members were invited to contribute and improve shared materials",
        "the archive's stated purpose depended on assembling distributed pieces of knowledge"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the orientation",
        "Jamie's ownership of the shared folder",
        "completeness of the resulting archive",
        "publication permission for contributed materials"
      ]
    },
    {
      id: "SRC-NYCAC-ARCHIVE-PARTICIPATION-TEMPLATES-2017",
      title: "NYC Artist Coalition participation-template set",
      organization: "NYC Artist Coalition collaborators",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      accessedAt: "2026-07-18",
      publicCitation:
        "Public-safe metadata for a set of reusable participation, meeting-hosting, sign-in, sign-up, and coalition-communication templates.",
      publicNote:
        "Exact files and visual assets remain outside git pending authorship, rights, consent, and editorial review.",
      protectedLocatorId: "ARCHIVE-NYCAC-PARTICIPATION-TEMPLATES-2017-001",
      supportsGenerally: [
        "the archive contains reusable templates for hosting meetings, welcoming groups, sign-in, sign-up, practical training, and coalition communication",
        "the template set supports a repeatable participation-system interpretation"
      ],
      doesNotEstablish: [
        "Jamie's authorship of every template",
        "public-display rights for the visual assets",
        "attendance, adoption, or impact",
        "that every template was used at every event"
      ],
      media: {
        mediaKind: "document",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "metadata-only"
      }
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-SHARED-FOLDER-POPULATION-2026",
      project: "nyc-artist-coalition",
      internalClaim:
        "One July 18, 2026 authenticated capture accounted for 2,365 accessible descendants under its declared descendant-counting method by inventorying, broadly classifying, and dispositioning each returned item; cross-capture comparison does not establish 2,365 as the canonical folder population.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "One July 18 capture inventoried, broadly classified, and dispositioned 2,365 accessible descendants under its declared counting method; this total is not canonical across captures.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
          relationship: "direct-support",
          supports: [
            "accessible population count",
            "inventory, classification, and disposition coverage",
            "selected close-reading count",
            "rights-review boundary"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete accounting is not complete interpretation, rights review, authorship review, or publication approval.",
        "The count is limited to the population accessible to Jamie's authenticated account during the review window.",
        "Exact titles, paths, identifiers, and file bodies remain outside the public repository.",
        "Five frozen branch captures report different totals; the canonical cross-capture population remains held pending protected manifest reconciliation."
      ],
      antiClaims: [
        "Every file was read",
        "Jamie authored all 2,365 items",
        "All accessible items are public-safe",
        "The folder is a complete history of NYC Artist Coalition",
        "The census grants publication rights",
        "2,365 is the settled population across captures"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026"],
      reviewedAt: "2026-07-19",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-NYCAC-FAIRRENT-WEB-DATA-IMPLEMENTATION",
      project: "nyc-artist-coalition",
      internalClaim:
        "Protected implementation records attribute to Jamie a concrete FairRentNYC web and data workstream spanning responsive campaign presentation, mapped and verified location data, reusable forms, sponsor sequencing, press and partner modules, social presentation, and campaign calls to action.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "For FairRentNYC, Jamie translated campaign needs into a concrete web and data system: responsive public presentation, mapped and verified location data, reusable forms, sponsor sequencing, press and partner modules, and clear calls to action.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        },
        {
          key: "technical-operations",
          text:
            "Translated FairRentNYC campaign needs into a web and data implementation system spanning responsive presentation, mapped location data, forms, sponsor sequencing, partner and press modules, and calls to action.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/technical-operations"]
        },
        {
          key: "resume-html",
          text:
            "Built FairRentNYC web and data infrastructure for campaign action, mapped location data, sponsor sequencing, forms, partner and press modules, and responsive public presentation.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-ARCHIVE-FAIRRENT-WEB-IMPLEMENTATION-2019",
          relationship: "private-support",
          supports: [
            "Jamie's assigned implementation role",
            "documented web and data workstream",
            "campaign-oriented delivery domains"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-NYCAC-ARCHIVE-FAIRRENT-CAMPAIGN-ARCHITECTURE-2019",
          relationship: "private-support",
          supports: [
            "Jamie's campaign and information-architecture judgment",
            "prioritized actions and sponsorship-progress design"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY",
          relationship: "corroborating",
          supports: ["the surviving public FairRentNYC campaign surface"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The implementation record supports Jamie's documented workstream; the companion architecture note does not prove that every proposed feature shipped.",
        "Credit campaign strategy, policy positions, copy, and outcomes collectively unless separately attributed.",
        "Do not expose the underlying checklist, collaborator context, administrative details, or private working links."
      ],
      antiClaims: [
        "Jamie solely owned or led FairRentNYC",
        "Jamie authored every policy position or line of copy",
        "Every proposed feature shipped exactly as designed",
        "Jamie's web work alone caused legislative sponsorship or policy outcomes"
      ],
      researchInquiryIds: ["INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026"],
      reviewedAt: "2026-07-18",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-SHARED-FOLDER-ARCHIVAL-PRODUCTION-2026",
      project: "nyc-artist-coalition",
      question:
        "What public-safe, factually bounded knowledge can be developed from a complete accounting and prioritized close reading of the accessible NYC Artist Coalition Shared Folder?",
      methods: [
        "Traversed every accessible folder through the authenticated Drive interface and unioned virtualized listings until no new items appeared.",
        "Recorded an exact protected manifest outside git and assigned each accessible descendant one broad type and one disposition.",
        "Close-read 16 priority documents selected for role clarity, public value, corroboration potential, and privacy risk.",
        "Decomposed selected readings into assertions, limitations, candidate claims, anti-claims, promotion decisions, and purpose-built editorial projections.",
        "Kept exact identifiers, paths, private titles, document bodies, and unresolved media outside the public repository."
      ],
      runAt: "2026-07-18",
      resultStatus: "partially-recovered",
      findings: [
        "One July 18 capture returned 2,365 accessible descendants, all of which were inventoried, broadly classified, and dispositioned with zero unresolved traversal errors under that method.",
        "The collection contains 258 folders and 2,107 files across visual, document, data, audio, video, and design formats.",
        "A protected implementation checklist and companion architecture note make Jamie's FairRentNYC web, data, product, and information-architecture role substantially more concrete.",
        "Selected testimony drafts show Jamie translating operators' experience into open-data and service-design proposals, but draft status requires official corroboration before a delivered-testimony claim is strengthened.",
        "Selected campaign resources support a collective participation-system and shared-knowledge interpretation without assigning Jamie sole authorship.",
        "No media item was rights-cleared by this pass."
      ],
      limitations: [
        "Complete population accounting is not a claim that every file was opened or interpreted.",
        "Shared access does not establish authorship, ownership, consent, or publication permission.",
        "Seven items exposed limited-access signals and five files used unsupported formats.",
        "The close-reading set was deliberately prioritized rather than exhaustive across 2,107 files.",
        "The accessible population may not include deleted, inaccessible, externally held, or never-filed coalition history."
      ],
      sourceIds: [
        "SRC-NYCAC-SHARED-FOLDER-CENSUS-2026",
        "SRC-NYCAC-ARCHIVE-FAIRRENT-WEB-IMPLEMENTATION-2019",
        "SRC-NYCAC-ARCHIVE-FAIRRENT-CAMPAIGN-ARCHITECTURE-2019",
        "SRC-NYCAC-ARCHIVE-SMALL-BUSINESS-TESTIMONY-2019",
        "SRC-NYCAC-ARCHIVE-LETNYCDANCE-DIGITAL-GUIDE-2017",
        "SRC-NYCAC-ARCHIVE-SHARED-FOLDER-FAQ-2017",
        "SRC-NYCAC-ARCHIVE-PARTICIPATION-TEMPLATES-2017"
      ],
      publicSummary:
        "One internally closed July 18 capture, paired with 16 priority close readings, strengthened a bounded FairRentNYC implementation claim while preserving cross-capture reconciliation, item-level rights, credit, consent, and publication gates.",
      protectedLocatorId: "RESEARCH-NYCAC-SHARED-FOLDER-CENSUS-2026-001"
    }
  ]
};
