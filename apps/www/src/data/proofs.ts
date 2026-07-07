export type ProofStatus = "ready" | "bounded" | "approval-needed" | "do-not-use";

export type ProofSurface =
  | "home"
  | "resume"
  | "technical-operations"
  | "work-card"
  | "case-study"
  | "about"
  | "lab";

export type ProofClaim = {
  id: string;
  claim: string;
  detailedClaim?: string;
  sourceBasis: string;
  sourceNote?: string;
  publicBoundary: string;
  status: ProofStatus;
  defensibility: "strong" | "bounded" | "contextual";
  surfaces: ProofSurface[];
};

export const proofClaims: ProofClaim[] = [
  {
    id: "core-operating-structure",
    claim: "14+ years creating operating structure",
    detailedClaim:
      "Jamie has built operating structure across civic, cultural, small-business, technical, and public-facing environments.",
    sourceBasis: "approved public resume PDF / public-safe portfolio brief",
    publicBoundary:
      "Confirm exact start-date math before production indexing. Do not imply formal certification not listed in the resume.",
    status: "bounded",
    defensibility: "bounded",
    surfaces: ["home", "resume", "technical-operations", "about"]
  },
  {
    id: "hje-revenue-contribution",
    claim: "Contributed to a period of 2x revenue growth for a legacy e-commerce business",
    detailedClaim:
      "Jamie contributed to a period of 2x revenue growth through e-commerce, analytics, marketing, catalog, content, and operational improvements.",
    sourceBasis: "Jamie review confirmation / aggregate review without private rows",
    publicBoundary:
      "Use contribution language only. Do not expose revenue records, dashboards, customers, vendors, or internal business detail.",
    status: "bounded",
    defensibility: "bounded",
    surfaces: ["home", "resume", "work-card", "case-study"]
  },
  {
    id: "commercial-rent-stabilization-memory",
    claim: "30+ pages of civic campaign-memory infrastructure",
    detailedClaim:
      "Jamie helped structure Commercial Rent Stabilization running minutes, source maps, open questions, public-data framing, and consent-aware follow-up.",
    sourceBasis: "public project artifact / public-safe portfolio brief",
    publicBoundary:
      "Use collective-work language. Do not publish private strategy, legal review, stakeholder lists, private correspondence, or raw coalition records.",
    status: "ready",
    defensibility: "strong",
    surfaces: ["home", "resume", "technical-operations", "work-card", "case-study"]
  },
  {
    id: "wowlist-city-ecosystems",
    claim: "Roughly 35 city ecosystems reached through WOWList.org",
    detailedClaim:
      "Jamie co-built WOWList with Richard Caceres as a Django / Ember community-calendar platform organized around followable keyword communities.",
    sourceBasis: "public-safe portfolio brief / collaborator approval pending",
    publicBoundary:
      "Credit Richard Caceres. Use roughly. Do not imply current operation, official chapters, complete coverage, or expose user/event records.",
    status: "bounded",
    defensibility: "bounded",
    surfaces: ["home", "resume", "work-card", "case-study"]
  },
  {
    id: "sunday-dinner-hosting",
    claim: "Hosted Sunday Dinner / 300+ documented gatherings",
    detailedClaim:
      "Jamie hosted Sunday Dinner and created repeatable onboarding, facilitation, documentation, and continuity systems across recurring gatherings and resident-artist contexts.",
    sourceBasis: "Jamie review confirmation / aggregate review without private rows",
    publicBoundary:
      "Do not expose addresses, guest lists, attendance rows, raw RSVP data, private stories, or unapproved photos.",
    status: "bounded",
    defensibility: "bounded",
    surfaces: ["home", "resume", "work-card", "case-study"]
  },
  {
    id: "kc-town-hall-public-benefit",
    claim: "$490,539 public-funding recommendation documented for KC Town Hall",
    detailedClaim:
      "Jamie supported adaptive reuse planning and public-benefit documentation for a long-vacant historic building; public records show a $490,539 funding recommendation.",
    sourceBasis: "public reporting / public-source note",
    publicBoundary:
      "Use recommendation language unless executed funding, completion, and current project status are separately documented and approved.",
    status: "bounded",
    defensibility: "contextual",
    surfaces: ["technical-operations", "work-card", "case-study"]
  },
  {
    id: "source-backed-team-memory",
    claim: "AI drafts. Humans review.",
    detailedClaim:
      "Jamie designs bounded source-backed team-memory methods that turn selected sources into human-reviewed decision records, open questions, onboarding context, governance notes, and next steps.",
    sourceBasis: "public-safe portfolio brief",
    publicBoundary:
      "Present as lab / method / proof-of-practice, not finished SaaS, chatbot, surveillance system, broad ingestion product, or replacement for human judgment.",
    status: "ready",
    defensibility: "strong",
    surfaces: ["technical-operations", "lab", "case-study"]
  }
];

export const proofStripItems = [
  proofClaims[0].claim,
  proofClaims[1].claim,
  proofClaims[2].claim,
  proofClaims[3].claim,
  proofClaims[4].claim
] as const;

export const selectedProofGroups = [
  {
    area: "Operating implementation",
    signal: "Legacy operations became working digital systems.",
    claims: [
      "Helped an 80+ year-old industrial tool business translate paper-and-phone operations into searchable e-commerce, dealer-aware catalog logic, analytics, content, and workflows.",
      proofClaims[1].claim,
      "Used OSHA / NAICS open-data methods to make U.S. tool manufacturing context more findable."
    ]
  },
  {
    area: "Civic and public-facing systems",
    signal: "Complex public work became shared records and guidance.",
    claims: [
      "Built CallNYC.org after a New York City Council civic-data hackathon, translating constituent-services open data into resident-facing next-step guidance.",
      "As a co-founding member of NYC Artist Coalition, supports cultural-space fieldwork, FairRentNYC / CRS campaign infrastructure, and consent-aware follow-up.",
      "Built and stewarded 30+ pages of Commercial Rent Stabilization campaign-memory infrastructure, including a 34-page running-minutes record."
    ]
  },
  {
    area: "Community infrastructure",
    signal: "Social practices became repeatable participation systems.",
    claims: [
      "Co-built WOWList.org with Richard Caceres, a Python / Django + Ember.js community-calendar platform organized around followable keyword communities.",
      "Supported adoption by DIY arts and music organizers across roughly 35 city ecosystems.",
      "Hosted Sunday Dinner and created repeatable onboarding, facilitation, documentation, and continuity systems while documenting 300+ gatherings."
    ]
  },
  {
    area: "Source-backed knowledge",
    signal: "Team memory stayed bounded, reviewable, and correctable.",
    claims: [
      "Designed source-backed team-memory practices for selected meetings, documents, decision records, open questions, onboarding context, governance notes, and eval checks.",
      "Uses Known / Open / Protected boundaries to separate public-safe claims, review needs, and protected context.",
      "Completed AI Evals for Engineers & PMs with Shreya Shankar and Hamel Husain / Maven in 2026."
    ]
  }
] as const;
