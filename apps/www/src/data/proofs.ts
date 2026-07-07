import { z } from "zod";

// Internal public-safe knowledge graph. Pages may import composed projections
// from this file, but the graph itself is not a public route or archive index.
const workSlugSchema = z.enum([
  "196-sunday-dinner",
  "callnyc",
  "fair-rent-nyc",
  "harry-j-epstein",
  "kc-town-hall",
  "wowlist"
]);

const proofDomainSchema = z.enum([
  "career-pattern",
  "nyc-artist-coalition",
  "fairrentnyc",
  "harry-j-epstein",
  "wowlist",
  "community-infrastructure",
  "built-environment",
  "civic-technology"
]);

const proofVisibilitySchema = z.enum([
  "publishable",
  "summary-only",
  "approval-required"
]);

const proofConfidenceSchema = z.enum(["high", "medium", "approval-required"]);

const sourceTypeSchema = z.enum([
  "public-url",
  "published-resume",
  "public-campaign-page",
  "local-archive-analysis",
  "source-held-offline"
]);

const proofSchema = z.object({
  id: z.string(),
  headline: z.string(),
  domain: proofDomainSchema,
  workSlug: workSlugSchema.optional(),
  claim: z.string(),
  projection: z.object({
    card: z.string(),
    homepage: z.string().optional(),
    resume: z.string().optional(),
    technicalOperations: z.string().optional()
  }),
  roleFit: z.array(z.string()),
  sourceBasis: z.array(
    z.object({
      label: z.string(),
      type: sourceTypeSchema,
      url: z.string().optional()
    })
  ),
  confidence: proofConfidenceSchema,
  visibility: proofVisibilitySchema,
  publicUse: z.string(),
  guardrails: z.array(z.string())
});

const proofBankInput = [
  {
    id: "career-operating-structure-14-years",
    headline: "14+ years building operating structure",
    domain: "career-pattern",
    claim:
      "Jamie has 14+ years of recurring work turning ambiguous public-facing, civic, cultural, small-business, and technical contexts into usable operating structure.",
    projection: {
      card:
        "Across 14+ years, Jamie's recurring pattern is to clarify ambiguous work, build usable systems, document decisions, and leave behind handoffs people can maintain.",
      homepage: "14+ years building operating structure",
      resume:
        "14+ years building operating structure across civic, cultural, small-business, and technical environments",
      technicalOperations:
        "Long-running work across HJE, NYC Artist Coalition, WOWList, Sunday Dinner / 196, CallNYC, and KC Town Hall shows repeated implementation, maintenance, adoption support, and practical judgment."
    },
    roleFit: ["technical operations", "implementation", "product operations"],
    sourceBasis: [
      {
        label: "Published resume and selected public-safe portfolio claims",
        type: "published-resume"
      }
    ],
    confidence: "high",
    visibility: "publishable",
    publicUse:
      "Use as a career-pattern claim, supported by project dates and public-safe case summaries.",
    guardrails: [
      "Do not imply one continuous full-time role.",
      "Tie the claim to selected work examples when space allows."
    ]
  },
  {
    id: "nac-role-civic-systems-lead",
    headline: "NYC Artist Coalition role",
    domain: "nyc-artist-coalition",
    workSlug: "fair-rent-nyc",
    claim:
      "Jamie's public-safe role is co-founder and civic-systems, documentation, and policy-communications lead for NYC Artist Coalition / FairRentNYC work.",
    projection: {
      card:
        "For NYC Artist Coalition / FairRentNYC, Jamie's strongest public-safe role is co-founder and civic-systems, documentation, and policy-communications lead.",
      technicalOperations:
        "NYC Artist Coalition / FairRentNYC shows Jamie turning advocacy context into operating infrastructure: campaign pages, explainers, source maps, running minutes, action tracking, and policy-data materials."
    },
    roleFit: ["civic systems", "documentation", "policy communications"],
    sourceBasis: [
      {
        label: "Published resume role language",
        type: "published-resume"
      },
      {
        label: "NYC Artist Coalition public description",
        type: "public-url",
        url: "https://nycartc.com/contact/"
      },
      {
        label: "Fair Rent NYC public campaign archive",
        type: "public-campaign-page",
        url: "https://fairrentnyc.nycartc.com/"
      }
    ],
    confidence: "high",
    visibility: "publishable",
    publicUse:
      "Use with collective-work language and make Jamie's operating role visible.",
    guardrails: [
      "Do not call Jamie the sole leader of NYC Artist Coalition.",
      "Do not present policy analysis as legal advice.",
      "Do not publish protected collaborator context or unapproved quotes."
    ]
  },
  {
    id: "nac-public-campaign-infrastructure",
    headline: "Cultural-space advocacy became campaign infrastructure",
    domain: "nyc-artist-coalition",
    workSlug: "fair-rent-nyc",
    claim:
      "NYC Artist Coalition built public campaign infrastructure around cultural-space survival, nightlife policy, M.A.R.C.H. transparency, and commercial rent stabilization.",
    projection: {
      card:
        "NYC Artist Coalition's public work connected cultural-space survival to concrete campaign infrastructure: Let NYC Dance, Save NYC Spaces, Talks Not Raids, and FairRentNYC.",
      technicalOperations:
        "The NAC work shows how public advocacy can become usable systems: calls to action, coalition pages, source libraries, public explainers, progress tracking, and handoff materials."
    },
    roleFit: ["public-facing systems", "campaign operations", "coalition support"],
    sourceBasis: [
      {
        label: "NYC Artist Coalition public site",
        type: "public-url",
        url: "https://nycartc.com/"
      },
      {
        label: "Let NYC Dance public campaign page",
        type: "public-campaign-page",
        url: "https://letnycdance.nycartc.com/"
      },
      {
        label: "Save NYC Spaces public campaign page",
        type: "public-campaign-page",
        url: "https://savenycspaces.nycartc.com/"
      },
      {
        label: "Talks Not Raids public campaign page",
        type: "public-campaign-page",
        url: "https://talksnotraids.com/"
      },
      {
        label: "Fair Rent NYC public campaign archive",
        type: "public-campaign-page",
        url: "https://fairrentnyc.nycartc.com/"
      }
    ],
    confidence: "high",
    visibility: "publishable",
    publicUse:
      "Use as a coalition accomplishment claim; pair with Jamie-specific operating-role language.",
    guardrails: [
      "Credit the coalition and partners.",
      "Avoid claiming that any one person or group alone passed legislation.",
      "Use campaign names only where public pages support them."
    ]
  },
  {
    id: "fairrent-campaign-memory",
    headline: "30+ pages of Commercial Rent Stabilization campaign memory",
    domain: "fairrentnyc",
    workSlug: "fair-rent-nyc",
    claim:
      "Jamie helped structure and steward 30+ pages of shared Commercial Rent Stabilization campaign memory, including running minutes, source maps, action trackers, decision records, and open questions.",
    projection: {
      card:
        "Jamie helped turn Commercial Rent Stabilization collaboration into 30+ pages of campaign memory: running minutes, action trackers, source maps, decision records, and public-safe next-step context.",
      homepage: "30+ pages of CRS campaign memory plus legislative and data materials",
      resume:
        "Built 30+ pages of CRS campaign memory plus legislative provenance and public-data materials",
      technicalOperations:
        "Commercial Rent Stabilization work shows meeting synthesis, decision trails, source maps, action tracking, and review boundaries for active civic collaboration."
    },
    roleFit: ["meeting synthesis", "source mapping", "action tracking"],
    sourceBasis: [
      {
        label: "Commercial Rent Stabilization running minutes summary held offline",
        type: "source-held-offline"
      },
      {
        label: "Fair Rent NYC public campaign archive",
        type: "public-campaign-page",
        url: "https://fairrentnyc.nycartc.com/"
      }
    ],
    confidence: "high",
    visibility: "summary-only",
    publicUse:
      "Use the aggregate documentation claim; do not publish the underlying working record.",
    guardrails: [
      "Keep active strategy context out of public pages.",
      "Do not publish collaborator rosters or unapproved meeting language.",
      "Describe legal and policy questions as questions unless reviewed."
    ]
  },
  {
    id: "fairrent-legislative-data-materials",
    headline: "Legislative provenance and public-data materials",
    domain: "fairrentnyc",
    workSlug: "fair-rent-nyc",
    claim:
      "Jamie produced public-safe legislative provenance and policy-neutral data materials for Commercial Rent Stabilization, including bill-lineage context and privacy-preserving vacancy, occupancy, and lease-cost indicator framing.",
    projection: {
      card:
        "Jamie produced legislative provenance and policy-neutral open-data materials that helped separate bill lineage, public evidence, unresolved questions, and privacy-preserving data ideas.",
      technicalOperations:
        "The CRS data-policy work shows business analysis and implementation judgment: defining what indicators could be public, what source systems matter, and what must stay protected."
    },
    roleFit: ["business analysis", "public data", "policy communications"],
    sourceBasis: [
      {
        label: "Legislative provenance redline summary held offline",
        type: "source-held-offline"
      },
      {
        label: "Open-data and policy-neutral Comptroller materials held offline",
        type: "source-held-offline"
      },
      {
        label: "Fair Rent NYC reference library",
        type: "public-campaign-page",
        url: "https://fairrentnyc.nycartc.com/"
      }
    ],
    confidence: "high",
    visibility: "summary-only",
    publicUse:
      "Use as a high-level public-safe description of work product and method.",
    guardrails: [
      "Do not publish source files without approval.",
      "Do not imply official agency adoption.",
      "Do not identify nonpublic stakeholders or review comments."
    ]
  },
  {
    id: "hje-ecommerce-modernization",
    headline: "Legacy e-commerce and operations modernization",
    domain: "harry-j-epstein",
    workSlug: "harry-j-epstein",
    claim:
      "Jamie helped an 80+ year-old Kansas City industrial supply business translate paper, phone, catalog, dealer-pricing, and warehouse practices into searchable e-commerce, content, analytics, and operational workflows.",
    projection: {
      card:
        "At Harry J. Epstein Company, Jamie helped translate legacy catalog, phone, dealer-pricing, and warehouse practices into searchable e-commerce, content, analytics, and operational workflows.",
      homepage: "Legacy e-commerce transformation and online-growth contribution",
      resume:
        "Led legacy e-commerce, marketing, analytics, and operations improvements tied to online growth",
      technicalOperations:
        "HJE shows pragmatic product operations: legacy workflows, catalog knowledge, dealer-pricing practices, marketing, analytics, and customer-facing web systems had to work together."
    },
    roleFit: ["e-commerce", "workflow mapping", "technical project management"],
    sourceBasis: [
      {
        label: "Published resume and public-safe HJE case summary",
        type: "published-resume"
      },
      {
        label: "Harry J. Epstein public website",
        type: "public-url",
        url: "https://www.harryepstein.com/"
      }
    ],
    confidence: "high",
    visibility: "publishable",
    publicUse:
      "Use contribution language for online growth unless more precise metrics are approved.",
    guardrails: [
      "Do not publish dashboards, revenue breakdowns, customer records, or vendor terms.",
      "Keep online-growth language as contribution language."
    ]
  },
  {
    id: "wowlist-archive-scale",
    headline: "WOWList production-use archive evidence",
    domain: "wowlist",
    workSlug: "wowlist",
    claim:
      "Local archive analysis supports public-safe WOWList aggregate claims: 1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, 20,927 saved/starred events, and 35+ active city scenes by July 2017.",
    projection: {
      card:
        "WOWList's local archive supports aggregate production-use claims: 1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 follows, 20,927 saves/stars, and 35+ active city scenes by July 2017.",
      homepage: "WOWList archive: 1,800+ users, 16,000+ events, 35+ active city scenes",
      resume:
        "Co-built WOWList across 35+ active city scenes with 1,800+ users and 16,000+ events/posts in local archive analysis",
      technicalOperations:
        "WOWList shows product operations in a real public platform: event workflows, community vocabulary, follows, saves, email digests, Google Calendar sync, and low-cost deployment."
    },
    roleFit: ["community platform", "product operations", "public web systems"],
    sourceBasis: [
      {
        label: "Local WOWList archive aggregate analysis held offline",
        type: "local-archive-analysis"
      }
    ],
    confidence: "high",
    visibility: "summary-only",
    publicUse:
      "Use aggregate counts only; do not publish records, restored databases, or identifying user material.",
    guardrails: [
      "Do not publish user records, organizer contact rosters, or unapproved community media.",
      "Describe archive findings as local archive analysis."
    ]
  },
  {
    id: "sunday-dinner-196-repeatable-participation",
    headline: "300+ gatherings and 20+ resident artists",
    domain: "community-infrastructure",
    workSlug: "196-sunday-dinner",
    claim:
      "Jamie created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ Sunday Dinner gatherings and 20+ resident artists.",
    projection: {
      card:
        "Sunday Dinner / 196 shows repeatable participation infrastructure: 300+ documented gatherings, 20+ resident artists, onboarding routines, facilitation, and continuity systems.",
      homepage: "Sunday Dinner / 196: 300+ gatherings and 20+ resident artists",
      resume:
        "Created repeatable hosting, onboarding, and continuity systems across 300+ gatherings and 20+ resident artists",
      technicalOperations:
        "Sunday Dinner / 196 shows operations for high-trust human systems: onboarding, facilitation, scheduling, hosting, documentation, and continuity without overexposing the community."
    },
    roleFit: ["onboarding", "facilitation", "community operations"],
    sourceBasis: [
      {
        label: "Public-safe Sunday Dinner / 196 aggregate records held offline",
        type: "source-held-offline"
      }
    ],
    confidence: "high",
    visibility: "summary-only",
    publicUse:
      "Use aggregate scale and operating-pattern claims only.",
    guardrails: [
      "Do not publish identifying participant records, addresses, or unapproved photos.",
      "Use consent-bound language for any named participants."
    ]
  },
  {
    id: "kc-town-hall-public-benefit-documentation",
    headline: "KC Town Hall adaptive reuse documentation",
    domain: "built-environment",
    workSlug: "kc-town-hall",
    claim:
      "Jamie co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant approximately 6,500 sq. ft. historic building into four commercial spaces and three homes, tied to a $490,539 public funding recommendation.",
    projection: {
      card:
        "KC Town Hall shows long-horizon project management: adaptive reuse planning for an approximately 6,500 sq. ft. historic building, public-benefit documentation, and a $490,539 public funding recommendation.",
      resume:
        "Co-led KC adaptive-reuse planning tied to a $490,539 public funding recommendation",
      technicalOperations:
        "KC Town Hall shows long-horizon implementation work where public benefit, preservation, funding context, stakeholder communication, and protected deal details had to be kept distinct."
    },
    roleFit: ["project management", "public-benefit documentation", "stakeholder context"],
    sourceBasis: [
      {
        label: "KC Town Hall public-safe project materials held offline",
        type: "source-held-offline"
      }
    ],
    confidence: "high",
    visibility: "summary-only",
    publicUse:
      "Use the aggregate public-benefit and funding-recommendation claim; keep deal specifics bounded.",
    guardrails: [
      "Do not publish banking, legal, property, partner-sensitive, or finance-sensitive source files.",
      "Do not imply completed redevelopment unless separately approved."
    ]
  },
  {
    id: "callnyc-open-data-prototype",
    headline: "Civic open-data prototype",
    domain: "civic-technology",
    workSlug: "callnyc",
    claim:
      "Jamie built CallNYC as an archived civic-data prototype that translated constituent-services open data into resident-facing issue pathways, district context, and possible next steps.",
    projection: {
      card:
        "CallNYC shows civic-product translation: open constituent-services data became an archived resident-facing prototype for issue pathways, district context, and possible next steps.",
      technicalOperations:
        "CallNYC shows a small complete implementation path: data source, information architecture, interface, public-safe guidance, and clear archived-status boundaries."
    },
    roleFit: ["civic technology", "open data", "information architecture"],
    sourceBasis: [
      {
        label: "Archived CallNYC project context and public-safe case summary",
        type: "source-held-offline"
      }
    ],
    confidence: "medium",
    visibility: "summary-only",
    publicUse:
      "Use as an archived prototype claim until the correct public archive and press citation are approved.",
    guardrails: [
      "Always state that CallNYC is archived and unofficial.",
      "Do not present the prototype as current civic guidance."
    ]
  }
] satisfies z.input<typeof proofSchema>[];

export const proofBank = proofSchema.array().parse(proofBankInput);

export type ProofClaim = (typeof proofBank)[number];

const hasText = (value: string | undefined): value is string => Boolean(value);

export const homepageProofs = proofBank
  .map((proof) => proof.projection.homepage)
  .filter(hasText);

export const resumeProofHighlights = proofBank
  .map((proof) => proof.projection.resume)
  .filter(hasText);

export const technicalOperationsProofRows = proofBank
  .map((proof) => {
    if (!proof.projection.technicalOperations) return null;

    return {
      need: proof.headline,
      proof: proof.projection.technicalOperations
    };
  })
  .filter((row): row is { need: string; proof: string } => Boolean(row));
