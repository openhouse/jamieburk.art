export type ProofSupportLevel =
  | "public-source"
  | "jamie-approved"
  | "private-evidence-not-published"
  | "needs-review";

export type ProofClaim = {
  id: string;
  project: string;
  shortClaim: string;
  safestWording: string;
  supportLevel: ProofSupportLevel;
  allowedSurfaces: string[];
  boundaries: string[];
  avoid: string[];
};

export const proofClaims: ProofClaim[] = [
  {
    id: "operating-structure",
    project: "Cross-project role fit",
    shortClaim:
      "14+ years creating operating structure across civic, cultural, small-business, and technical environments",
    safestWording:
      "Jamie creates operating structure for complex public-facing teams, turning emerging or under-structured work into requirements, workflows, documentation, decision trails, launch support, onboarding materials, and durable handoffs.",
    supportLevel: "jamie-approved",
    allowedSurfaces: ["homepage", "resume", "technical-operations", "contact"],
    boundaries: [
      "Do not imply one continuous enterprise role or a scale not shown by the evidence."
    ],
    avoid: ["Only a documenter", "Only a tracker", "Generalist with no operating specialty"]
  },
  {
    id: "hje-revenue-growth",
    project: "Harry J. Epstein Company",
    shortClaim:
      "Contributed to 2x revenue growth while modernizing e-commerce and operations for a legacy industrial business",
    safestWording:
      "Contributed to 2x revenue growth while modernizing e-commerce, analytics, content, marketing, and operating workflows for an 80+ year-old legacy industrial business.",
    supportLevel: "private-evidence-not-published",
    allowedSurfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    boundaries: [
      "Use contribution language.",
      "Do not publish dashboards, revenue detail, customer data, vendor terms, credentials, or sensitive operations."
    ],
    avoid: ["Caused 2x revenue growth", "Single-handedly doubled revenue"]
  },
  {
    id: "fairrent-operating-memory",
    project: "FairRentNYC / Commercial Rent Stabilization",
    shortClaim:
      "Built shared civic operating memory: running minutes, source maps, action trackers, and review lanes across a commercial-rent campaign",
    safestWording:
      "Built and stewarded public-safe campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability work, including running minutes, source maps, action trackers, public-data framing, and policy-question lanes.",
    supportLevel: "private-evidence-not-published",
    allowedSurfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    boundaries: [
      "Use collective-work language.",
      "Do not imply Jamie led the whole movement, owned legislation, provided legal advice, or created official city policy."
    ],
    avoid: ["Led the movement", "Owned the bill", "Provided legal analysis"]
  },
  {
    id: "nac-campaign-infrastructure",
    project: "NYC Artist Coalition",
    shortClaim:
      "Co-founded NYC Artist Coalition; designed its visual identity and built public campaign websites for cultural-space advocacy",
    safestWording:
      "Co-founded NYC Artist Coalition; designed its visual identity and built public campaign websites for NYCArtC, Let NYC Dance, Save NYC Spaces, Talks Not Raids, and FairRentNYC, translating cultural-space advocacy into usable public calls to action.",
    supportLevel: "jamie-approved",
    allowedSurfaces: ["resume", "technical-operations", "work-card", "case-study", "contact"],
    boundaries: [
      "Website and identity authorship are Jamie's direct contributions.",
      "Campaign outcomes remain collective."
    ],
    avoid: ["Solely led NAC", "Owned coalition campaigns", "Single-handedly passed laws"]
  },
  {
    id: "callnyc-archived-prototype",
    project: "CallNYC.org",
    shortClaim:
      "Built CallNYC.org, an archived civic-data prototype for constituent-services issue pathways",
    safestWording:
      "Built CallNYC.org, an archived civic-data prototype that translated New York City Council constituent-services open data into resident-facing issue pathways and next-step guidance.",
    supportLevel: "public-source",
    allowedSurfaces: ["resume", "technical-operations", "work-card", "case-study"],
    boundaries: ["Keep archived and unofficial status visible."],
    avoid: ["Official City Council service", "Current civic service", "Legal or emergency guidance"]
  },
  {
    id: "wowlist-active-scenes",
    project: "WOWList.org",
    shortClaim:
      "Co-built a Django / Ember community calendar used across roughly 35 active city ecosystems",
    safestWording:
      "Co-built a Django / PostgreSQL / PostGIS and Ember community-calendar platform used by DIY arts and music organizers across roughly 35 active city ecosystems.",
    supportLevel: "private-evidence-not-published",
    allowedSurfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    boundaries: [
      "Keep roughly/active-scenes language unless exact adoption wording is separately approved.",
      "Do not publish user data, organizer contact lists, or private records."
    ],
    avoid: ["Official chapters", "Hundreds of cities", "Raw user records"]
  },
  {
    id: "sunday-dinner-196",
    project: "196 Artists Residency / Sunday Dinner",
    shortClaim:
      "Created repeatable hosting and continuity systems across 300+ gatherings and 20+ resident artists",
    safestWording:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    supportLevel: "private-evidence-not-published",
    allowedSurfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    boundaries: [
      "Do not publish guest lists, addresses, private stories, raw attendance records, or unreviewed photos."
    ],
    avoid: ["Guest lists", "Attendance records", "Addresses", "Unreviewed images"]
  },
  {
    id: "kc-town-hall-public-benefit",
    project: "KC Town Hall LLC",
    shortClaim:
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse, including a $490,539 public-funding recommendation",
    safestWording:
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant building at 36th Street and Indiana Avenue into four commercial spaces and three homes, advancing the project through municipal review and a $490,539 public-funding recommendation.",
    supportLevel: "public-source",
    allowedSurfaces: ["resume", "technical-operations", "work-card", "case-study"],
    boundaries: [
      "Use recommendation unless separately documenting executed funding, completion, or final redevelopment status."
    ],
    avoid: ["Received public funding", "Secured public funding", "Completed redevelopment"]
  },
  {
    id: "source-backed-team-memory",
    project: "Source-Backed Team Memory",
    shortClaim:
      "Designed a source-backed team-memory method for human-reviewed decision records, open questions, onboarding context, governance, and privacy-aware follow-up",
    safestWording:
      "Designed a source-backed team-memory method that turns selected meetings and documents into reviewable, source-linked Markdown/wiki pages for decisions, open questions, onboarding context, governance, and privacy-aware follow-up.",
    supportLevel: "jamie-approved",
    allowedSurfaces: ["technical-operations", "lab", "contact"],
    boundaries: [
      "Frame as method, prototype, proof-of-practice, or consulting practice unless production deployment claims are later approved."
    ],
    avoid: ["Production SaaS", "Automated trust", "AI-powered truth", "Private archive browser"]
  },
  {
    id: "ai-evals-course",
    project: "AI Evals for Engineers & PMs",
    shortClaim:
      "Completed AI Evals for Engineers & PMs, taught by Shreya Shankar and Hamel Husain",
    safestWording:
      "Completed AI Evals for Engineers & PMs, taught by Shreya Shankar and Hamel Husain through Maven.",
    supportLevel: "jamie-approved",
    allowedSurfaces: ["resume", "technical-operations", "contact"],
    boundaries: [
      "Do not imply certification beyond completion of the named course unless that credential language is explicitly supported."
    ],
    avoid: ["Substitute for production AI deployment experience"]
  }
];

export const homeProofItems = proofClaims
  .filter((claim) => claim.allowedSurfaces.includes("homepage"))
  .map((claim) => claim.shortClaim);

export const resumeHighlights = proofClaims
  .filter((claim) => claim.allowedSurfaces.includes("resume"))
  .map((claim) => claim.shortClaim);
