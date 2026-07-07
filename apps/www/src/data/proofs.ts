export type ProofSupportLevel =
  | "public-safe"
  | "jamie-approved"
  | "private-evidence-not-published"
  | "needs-approval";

export type Proof = {
  id: string;
  shortClaim: string;
  safestWording: string;
  supportLevel: ProofSupportLevel;
  allowedSurfaces: string[];
  boundaries: string[];
  avoid: string[];
};

export const proofs: Proof[] = [
  {
    id: "operating-structure",
    shortClaim:
      "14+ years creating operating structure across civic, cultural, small-business, and technical environments",
    safestWording:
      "Jamie creates operating structure for complex public-facing teams, turning ambiguous work into requirements, workflows, documentation, decision trails, launch support, onboarding materials, and durable handoffs.",
    supportLevel: "jamie-approved",
    allowedSurfaces: ["homepage", "resume", "technical-operations", "contact"],
    boundaries: [
      "Do not imply one continuous formal enterprise role or a scale not shown by the evidence."
    ],
    avoid: ["Only a documenter", "Only a tracker", "Generalist with no operating specialty"]
  },
  {
    id: "hje-revenue-growth",
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
    shortClaim:
      "Co-founded NYC Artist Coalition; designed its visual identity and built public campaign websites for cultural-space advocacy",
    safestWording:
      "Co-founded NYC Artist Coalition; designed its visual identity and built public campaign websites for NYCArtC, Let NYC Dance, Save NYC Spaces, Talks Not Raids, and FairRentNYC, translating cultural-space advocacy into usable public calls to action.",
    supportLevel: "jamie-approved",
    allowedSurfaces: ["resume", "technical-operations", "work-card", "case-study", "contact"],
    boundaries: [
      "Website authorship is Jamie's direct contribution.",
      "Campaign outcomes remain collective."
    ],
    avoid: ["Solely led NAC", "Owned coalition campaigns", "Single-handedly passed laws"]
  },
  {
    id: "wowlist-active-scenes",
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
    shortClaim:
      "Created repeatable hosting and continuity systems across 300+ gatherings and 20+ resident artists",
    safestWording:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    supportLevel: "private-evidence-not-published",
    allowedSurfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    boundaries: [
      "Do not publish guest lists, addresses, private stories, raw attendance records, or unapproved photos."
    ],
    avoid: ["Guest lists", "Attendance records", "Addresses", "Unapproved images"]
  },
  {
    id: "callnyc-archived-prototype",
    shortClaim:
      "Built CallNYC.org, an archived civic-data prototype for constituent-services issue pathways",
    safestWording:
      "Built CallNYC.org, an archived civic-data prototype that translated New York City Council constituent-services open data into resident-facing issue pathways and next-step guidance.",
    supportLevel: "public-safe",
    allowedSurfaces: ["resume", "technical-operations", "work-card", "case-study"],
    boundaries: ["Keep archived and unofficial status visible."],
    avoid: ["Official City Council service", "Current civic service", "Legal or emergency guidance"]
  },
  {
    id: "ai-evals-course",
    shortClaim:
      "Completed AI Evals for Engineers & PMs, taught by Shreya Shankar and Hamel Husain",
    safestWording:
      "Completed AI Evals for Engineers & PMs, taught by Shreya Shankar and Hamel Husain through Maven.",
    supportLevel: "jamie-approved",
    allowedSurfaces: ["resume", "technical-operations", "contact"],
    boundaries: [
      "Do not imply certification beyond completion of the named course unless that language is explicitly supported."
    ],
    avoid: ["Substitute for production AI deployment experience"]
  }
];

export const homeProofItems = proofs
  .filter((proof) => proof.allowedSurfaces.includes("homepage"))
  .map((proof) => proof.shortClaim);

export const resumeHighlights = homeProofItems;
