import { z } from "zod";

const workProofSlugSchema = z.enum([
  "196-sunday-dinner",
  "callnyc",
  "fair-rent-nyc",
  "harry-j-epstein",
  "kc-town-hall",
  "source-backed-team-memory",
  "wowlist"
]);

const sourceBasisSchema = z.enum([
  "approved resume",
  "public artifact",
  "public record",
  "aggregate archive analysis",
  "public-safe narrative review",
  "firsthand operational record"
]);

const defensibilitySchema = z.enum(["strong", "bounded", "contextual"]);

const proofClaimSchema = z
  .object({
    id: z.string(),
    workSlug: workProofSlugSchema.optional(),
    title: z.string(),
    claim: z.string(),
    detailedClaim: z.string(),
    sourceBasis: z.array(sourceBasisSchema).min(1),
    sourceNote: z.string(),
    publicBoundary: z.string(),
    defensibility: defensibilitySchema,
    surfaces: z.object({
      homepage: z.string().optional(),
      resume: z.string().optional(),
      workEvidence: z.string().optional(),
      technicalOperations: z.string().optional()
    }),
    caution: z.string().optional()
  })
  .refine((claim) => Object.values(claim.surfaces).some(Boolean), {
    message: "Every proof claim needs at least one approved website projection."
  });

type ProofClaimInput = z.input<typeof proofClaimSchema>;

const proofClaimsInput = [
  {
    id: "career-operating-structure-14-years",
    title: "14+ years of operating-structure work",
    claim:
      "Jamie has 14+ years of experience creating operating structure across civic, cultural, small-business, and technical environments.",
    detailedClaim:
      "Across selected work from WOWList, Harry J. Epstein Company, civic-data prototypes, cultural infrastructure, coalition documentation, and source-backed memory practice, Jamie repeatedly turned ambiguous work into workflows, documentation, public-facing tools, decision records, and durable handoffs.",
    sourceBasis: ["approved resume", "public-safe narrative review"],
    sourceNote:
      "Supported by the approved resume timeline and public-safe review of selected project records.",
    publicBoundary:
      "This does not claim one continuous formal title, employer, or uninterrupted full-time role across all 14+ years.",
    defensibility: "strong",
    surfaces: {
      homepage: "14+ years creating operating structure",
      resume:
        "14+ years creating operating structure across civic, cultural, small-business, and technical environments",
      technicalOperations:
        "14+ years creating operating structure across civic, cultural, small-business, and technical environments"
    }
  },
  {
    id: "hje-modernization-stewardship",
    workSlug: "harry-j-epstein",
    title: "HJE long-running modernization stewardship",
    claim:
      "Jamie led long-running web, e-commerce, marketing, analytics, content, and operational workflow improvements for Harry J. Epstein Company.",
    detailedClaim:
      "For an 80+ year-old industrial tool business, Jamie translated legacy operating knowledge, customer language, product information, public voice, and internal workflow needs into maintainable public-facing and operational web systems.",
    sourceBasis: [
      "approved resume",
      "public artifact",
      "public-safe narrative review",
      "firsthand operational record"
    ],
    sourceNote:
      "Supported by approved resume materials, the public HJE site, public-safe narrative review, and firsthand operational record.",
    publicBoundary:
      "Private dashboards, customer data, vendor terms, credentials, detailed revenue records, and internal operating practices are not published.",
    defensibility: "strong",
    surfaces: {
      workEvidence:
        "Led long-running web, e-commerce, marketing, analytics, content, and operational workflow improvements",
      technicalOperations:
        "HJE web, e-commerce, content, analytics, marketing, and operational workflow stewardship"
    }
  },
  {
    id: "hje-revenue-growth-contribution",
    workSlug: "harry-j-epstein",
    title: "HJE bounded revenue-growth contribution",
    claim:
      "Jamie contributed to a period of 2x revenue growth for Harry J. Epstein Company.",
    detailedClaim:
      "The public-safe claim is contribution language: Jamie's web, e-commerce, content, analytics, marketing, and operational workflow work contributed to a period of 2x revenue growth, without claiming sole causation.",
    sourceBasis: ["approved resume", "firsthand operational record"],
    sourceNote:
      "Supported by approved resume materials and private operational context reviewed for public-safe wording.",
    publicBoundary:
      "Do not publish revenue breakdowns, dashboards, customer data, or causation language stronger than contributed to.",
    defensibility: "bounded",
    surfaces: {
      homepage: "Contributed to 2x revenue growth for a legacy e-commerce business",
      resume:
        "Contributed to a period of 2x revenue growth for a legacy e-commerce business",
      workEvidence: "Contributed to a period of 2x revenue growth"
    },
    caution:
      "Keep the verb as contributed to unless Jamie approves more precise public attribution."
  },
  {
    id: "fairrent-campaign-memory-30-pages",
    workSlug: "fair-rent-nyc",
    title: "FairRentNYC campaign-memory infrastructure",
    claim:
      "Jamie built and stewarded 30+ pages of shared campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability advocacy.",
    detailedClaim:
      "Jamie created and maintained public-safe coordination structure across running minutes, action trackers, source maps, decision records, public-data asks, follow-up notes, and explanations that helped collaborators continue complex civic work.",
    sourceBasis: ["public-safe narrative review", "firsthand operational record"],
    sourceNote:
      "Supported by reviewed campaign-memory materials and public-safe summaries; sensitive working materials are withheld.",
    publicBoundary:
      "Do not publish sensitive strategy context, non-public communications, legal or policy review detail, named collaborator lists, or unapproved quotes.",
    defensibility: "strong",
    surfaces: {
      homepage: "30+ pages of civic campaign memory and source maps",
      resume: "Built 30+ pages of shared civic campaign memory and source maps",
      workEvidence:
        "30+ pages of shared civic campaign documentation, running minutes, action trackers, decision records, and source maps",
      technicalOperations:
        "FairRentNYC / Commercial Rent Stabilization campaign-memory infrastructure"
    }
  },
  {
    id: "fairrent-known-open-protected-method",
    workSlug: "fair-rent-nyc",
    title: "Known / Open / Protected civic documentation method",
    claim:
      "Jamie used Known / Open / Protected boundaries to separate public-safe material, unresolved questions, and protected civic coordination context.",
    detailedClaim:
      "The civic documentation work made it easier to distinguish what collaborators could share, what still needed review, and what should remain withheld because privacy, consent, strategy, law, or trust required it.",
    sourceBasis: ["public-safe narrative review", "firsthand operational record"],
    sourceNote:
      "Supported by reviewed documentation patterns and public-safe summaries.",
    publicBoundary:
      "Describe the method and boundary practice without publishing the protected context itself.",
    defensibility: "strong",
    surfaces: {
      workEvidence:
        "Known / Open / Protected source boundaries for public material, unresolved questions, and protected context",
      technicalOperations:
        "Known / Open / Protected documentation boundaries for civic coordination work"
    }
  },
  {
    id: "nycac-cofounding-cultural-space-fieldwork",
    workSlug: "fair-rent-nyc",
    title: "NYC Artist Coalition co-founding and cultural-space fieldwork",
    claim:
      "Jamie is a co-founding member of NYC Artist Coalition and supports cultural-space fieldwork, campaign memory, and coalition-operations structure.",
    detailedClaim:
      "Jamie's public-safe role is best framed as movement infrastructure: co-founding member, cultural-space fieldworker, documentation systems lead, and coalition-operations support for work that connects artists, venues, small businesses, legal/policy partners, and public-facing civic advocacy.",
    sourceBasis: ["public-safe narrative review", "firsthand operational record"],
    sourceNote:
      "Supported by Jamie-approved role framing, public-safe review of working materials, and firsthand operational record.",
    publicBoundary:
      "Do not imply Jamie is the sole leader, sole spokesperson, sole policy author, or sole cause of coalition outcomes.",
    defensibility: "strong",
    surfaces: {
      resume:
        "Co-founding NYC Artist Coalition member supporting cultural-space fieldwork and coalition operations",
      workEvidence:
        "Co-founding NYC Artist Coalition member supporting cultural-space fieldwork, campaign memory, and coalition-operations structure",
      technicalOperations:
        "NYC Artist Coalition cultural-space fieldwork and coalition-operations structure"
    }
  },
  {
    id: "nycac-public-advocacy-lineage",
    workSlug: "fair-rent-nyc",
    title: "NYC Artist Coalition public advocacy lineage",
    claim:
      "NYC Artist Coalition has participated in public advocacy around DIY and cultural-space safety, Cabaret Law repeal, Office of Nightlife public engagement, MARCH inspection transparency, COVID-era venue survival, and commercial rent stabilization.",
    detailedClaim:
      "This claim situates Jamie's current documentation and fieldwork inside NYC Artist Coalition's broader public advocacy history. It should be used as context for collective civic work, not as an individual claim that Jamie personally led every campaign or that the coalition alone caused each public outcome.",
    sourceBasis: ["public artifact", "public record", "public-safe narrative review"],
    sourceNote:
      "Supported by NYC Artist Coalition public materials, public summaries of coalition history, and public-safe narrative review.",
    publicBoundary:
      "Use collective-work language. Do not overclaim causation, authorship, or representational authority for Jamie or for NYC Artist Coalition.",
    defensibility: "bounded",
    surfaces: {
      workEvidence:
        "NYC Artist Coalition context: public advocacy around cultural-space safety, Cabaret Law repeal, Office of Nightlife engagement, MARCH transparency, COVID-era venue survival, and commercial rent stabilization",
      technicalOperations:
        "Civic operating context across NYC Artist Coalition public advocacy, nightlife enforcement, cultural-space survival, and commercial rent stabilization"
    }
  },
  {
    id: "callnyc-civic-data-prototype",
    workSlug: "callnyc",
    title: "CallNYC civic-data prototype",
    claim:
      "Jamie built CallNYC as an archived civic-data prototype after a New York City Council civic-data hackathon.",
    detailedClaim:
      "CallNYC translated CouncilStat / constituent-services open data into public issue pathways, district context, and resident-facing guidance patterns while keeping its archived, unofficial status visible.",
    sourceBasis: ["approved resume", "public-safe narrative review"],
    sourceNote:
      "Supported by approved resume materials and historical project review. Press citation and archive link still need approval before being added.",
    publicBoundary:
      "Do not present CallNYC as current, official, comprehensive, legal, emergency, or agency guidance.",
    defensibility: "bounded",
    surfaces: {
      workEvidence:
        "Archived civic-data prototype built after a New York City Council civic-data hackathon",
      technicalOperations:
        "CallNYC civic-data prototype translating open data into resident-facing guidance patterns"
    }
  },
  {
    id: "wowlist-platform-model",
    workSlug: "wowlist",
    title: "WOWList keyword-community platform model",
    claim:
      "Jamie co-built WOWList as a Python / Django + Ember.js community-calendar platform organized around followable keyword communities.",
    detailedClaim:
      "The platform connected community vocabulary, event workflows, saved events, email digests, calendar integrations, and organizer-facing publishing patterns into a public-facing system for local arts, music, and interest communities.",
    sourceBasis: ["public-safe narrative review", "aggregate archive analysis"],
    sourceNote:
      "Supported by historical project review and aggregate local-archive analysis.",
    publicBoundary:
      "Do not publish private user data, organizer contact information, or unapproved community records.",
    defensibility: "strong",
    surfaces: {
      workEvidence:
        "Python / Django + Ember.js platform with followable keyword communities, event workflows, email digests, and calendar integrations",
      technicalOperations:
        "WOWList community-calendar product model, event workflows, and public-facing platform implementation"
    }
  },
  {
    id: "wowlist-scale-aggregate",
    workSlug: "wowlist",
    title: "WOWList aggregate scale",
    claim:
      "Aggregate local-archive analysis supports WOWList usage across 35+ city scenes, with 1,800+ users and 16,000+ posts/events.",
    detailedClaim:
      "The strongest public-safe scale claim is aggregate: the historical archive supports 35+ active city scenes, 1,800+ users, and 16,000+ posts/events, without exposing user-level or organizer-level records.",
    sourceBasis: ["aggregate archive analysis"],
    sourceNote:
      "Supported by aggregate analysis of the historical WOWList archive.",
    publicBoundary:
      "Keep the numbers aggregate. Do not publish individual users, organizer lists, private event records, or raw archive exports.",
    defensibility: "strong",
    surfaces: {
      homepage: "WOWList used across 35+ city scenes",
      resume:
        "Co-built WOWList for 35+ city scenes, with 1,800+ users and 16,000+ posts/events in local archive analysis",
      workEvidence:
        "Aggregate local-archive analysis supports 35+ city scenes, 1,800+ users, and 16,000+ posts/events"
    }
  },
  {
    id: "sunday-dinner-participation-infrastructure",
    workSlug: "196-sunday-dinner",
    title: "196 / Sunday Dinner participation infrastructure",
    claim:
      "Jamie created participation infrastructure for 196 Artists Residency / Sunday Dinner, documenting 300+ gatherings and supporting 20+ resident artists.",
    detailedClaim:
      "The public-safe claim covers repeatable hosting, onboarding, facilitation, documentation, and continuity systems for long-running gatherings and resident-artist support.",
    sourceBasis: ["approved resume", "public-safe narrative review"],
    sourceNote:
      "Supported by approved resume materials and aggregate public-safe review of private community records.",
    publicBoundary:
      "Do not publish guest lists, attendance records, addresses, private stories, or unapproved images.",
    defensibility: "strong",
    surfaces: {
      homepage: "300+ gatherings documented; 20+ resident artists supported",
      resume:
        "Documented 300+ gatherings and supported 20+ resident artists through repeatable hosting and continuity systems",
      workEvidence:
        "300+ documented gatherings and 20+ resident artists supported through repeatable hosting, onboarding, facilitation, and continuity systems",
      technicalOperations:
        "196 / Sunday Dinner onboarding, facilitation, documentation, and continuity systems"
    }
  },
  {
    id: "kc-town-hall-public-funding",
    workSlug: "kc-town-hall",
    title: "KC Town Hall public-funding recommendation",
    claim:
      "Jamie co-led redevelopment planning and public-benefit documentation for KC Town Hall LLC, including work tied to a $490,539 public funding recommendation.",
    detailedClaim:
      "The public-safe claim is that Jamie served as co-founder and project manager, co-led planning and documentation for adaptive reuse of a long-vacant historic building, and that the effort secured a $490,539 public funding recommendation.",
    sourceBasis: ["approved resume", "public-safe narrative review"],
    sourceNote:
      "Supported by approved resume materials and public-safe review of project context.",
    publicBoundary:
      "Do not publish private financial, legal, property, banking, or stakeholder details.",
    defensibility: "strong",
    surfaces: {
      workEvidence:
        "$490,539 public funding recommendation documented in approved resume materials",
      technicalOperations:
        "KC Town Hall public-benefit documentation and adaptive reuse planning support"
    }
  },
  {
    id: "source-backed-team-memory-method",
    workSlug: "source-backed-team-memory",
    title: "Source-Backed Team Memory method",
    claim:
      "Jamie designs source-backed documentation practices for knowledge-heavy teams: decision lineage, onboarding context, meeting synthesis, and human-correctable AI workflows.",
    detailedClaim:
      "The method uses source-linked drafts, human review, inspectable decisions, open questions, and protected context to help teams preserve operating memory without turning private archives into unsafe browsing surfaces.",
    sourceBasis: ["public-safe narrative review", "firsthand operational record"],
    sourceNote:
      "Supported by public-safe lab materials, consulting proposals, and reviewed working method descriptions.",
    publicBoundary:
      "Present as an early method and consulting practice, not as a finished production SaaS or automated replacement for judgment.",
    defensibility: "strong",
    surfaces: {
      technicalOperations:
        "Source-backed documentation practice for decision lineage, onboarding context, meeting synthesis, and human-correctable AI workflows"
    }
  }
] satisfies ProofClaimInput[];

export const proofClaims = proofClaimSchema.array().parse(proofClaimsInput);

export type ProofClaim = (typeof proofClaims)[number];
export type ProofClaimId = (typeof proofClaimsInput)[number]["id"];
export type WorkProofSlug = z.infer<typeof workProofSlugSchema>;

const proofClaimMap = new Map(proofClaims.map((claim) => [claim.id, claim]));

function requireProofClaim(id: ProofClaimId) {
  const claim = proofClaimMap.get(id);

  if (!claim) {
    throw new Error(`Unknown proof claim: ${id}`);
  }

  return claim;
}

type ProjectionSurface = keyof ProofClaim["surfaces"];

function proofTextFor(id: ProofClaimId, surface: ProjectionSurface) {
  const claim = requireProofClaim(id);
  return claim.surfaces[surface] ?? claim.claim;
}

const homepageProofClaimIds = [
  "career-operating-structure-14-years",
  "hje-revenue-growth-contribution",
  "fairrent-campaign-memory-30-pages",
  "wowlist-scale-aggregate",
  "sunday-dinner-participation-infrastructure"
] satisfies ProofClaimId[];

const resumeProofClaimIds = [
  "career-operating-structure-14-years",
  "hje-revenue-growth-contribution",
  "nycac-cofounding-cultural-space-fieldwork",
  "fairrent-campaign-memory-30-pages",
  "wowlist-scale-aggregate",
  "sunday-dinner-participation-infrastructure"
] satisfies ProofClaimId[];

const technicalOperationsProofClaimIds = [
  "career-operating-structure-14-years",
  "hje-modernization-stewardship",
  "fairrent-campaign-memory-30-pages",
  "nycac-cofounding-cultural-space-fieldwork",
  "wowlist-platform-model",
  "sunday-dinner-participation-infrastructure",
  "kc-town-hall-public-funding",
  "source-backed-team-memory-method"
] satisfies ProofClaimId[];

const workEvidenceClaimIds: Partial<Record<WorkProofSlug, ProofClaimId[]>> = {
  "196-sunday-dinner": ["sunday-dinner-participation-infrastructure"],
  callnyc: ["callnyc-civic-data-prototype"],
  "fair-rent-nyc": [
    "fairrent-campaign-memory-30-pages",
    "fairrent-known-open-protected-method",
    "nycac-cofounding-cultural-space-fieldwork",
    "nycac-public-advocacy-lineage"
  ],
  "harry-j-epstein": [
    "hje-modernization-stewardship",
    "hje-revenue-growth-contribution"
  ],
  "kc-town-hall": ["kc-town-hall-public-funding"],
  wowlist: ["wowlist-platform-model", "wowlist-scale-aggregate"]
};

export const homepageProofItems = homepageProofClaimIds.map((id) => {
  return proofTextFor(id, "homepage");
});

export const resumeHighlights = resumeProofClaimIds.map((id) => {
  return proofTextFor(id, "resume");
});

export const technicalOperationsProofItems = technicalOperationsProofClaimIds.map((id) => {
  return proofTextFor(id, "technicalOperations");
});

export function workEvidenceFor(slug: WorkProofSlug) {
  return (workEvidenceClaimIds[slug] ?? []).map((id) => {
    return proofTextFor(id, "workEvidence");
  });
}
