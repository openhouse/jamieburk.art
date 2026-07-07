export type ProofStatus = "use-now" | "qualified" | "hold";

export type Proof = {
  id: string;
  area: string;
  claim: string;
  status: ProofStatus;
  publicWording: string;
  boundary: string;
};

export const proofBank: Proof[] = [
  {
    id: "career-14-years",
    area: "Career span",
    claim:
      "Jamie has 14+ years creating operating structure across civic, cultural, small-business, and public-facing technical environments.",
    status: "use-now",
    publicWording:
      "14+ years creating operating structure for complex public-facing work.",
    boundary:
      "Use as a career-span summary; do not turn it into a claim of uninterrupted employment in one role."
  },
  {
    id: "commercial-rent-memory",
    area: "Commercial Rent Stabilization",
    claim:
      "Jamie built and stewarded a 34-page civic campaign-memory system with action tracking, open questions, source context, and public/private boundaries.",
    status: "use-now",
    publicWording:
      "34-page civic campaign-memory system with action tracking, source context, and public/private boundaries.",
    boundary:
      "Use collective-work language and omit private coalition notes, legal-review materials, stakeholder lists, and unapproved quotes."
  },
  {
    id: "nyc-artist-coalition-role",
    area: "NYC Artist Coalition",
    claim:
      "Jamie is a co-founding member of NYC Artist Coalition whose current lane connects cultural-space fieldwork, Commercial Rent Stabilization coordination, public-data framing, and consent-aware follow-up.",
    status: "use-now",
    publicWording:
      "Co-founding member of NYC Artist Coalition; supports cultural-space fieldwork, CRS coalition memory, public-data framing, and consent-aware follow-up.",
    boundary:
      "Use role and fieldwork language; do not imply sole leadership or publish private venue, lease, landlord, signup, or contact details."
  },
  {
    id: "nyc-artist-coalition-policy-arc",
    area: "NYC Artist Coalition",
    claim:
      "NYC Artist Coalition was part of broader coalitions around cultural-space anti-criminalization, Cabaret Law repeal, nightlife support, anti-MARCH enforcement reform, and commercial-affordability advocacy.",
    status: "qualified",
    publicWording:
      "NYC Artist Coalition helped move cultural-space advocacy from enforcement crisis toward nightlife support, anti-displacement, and fair-rent policy.",
    boundary:
      "Use collective-work language and approved public citations before naming exact legal wins in public case-study copy."
  },
  {
    id: "wowlist-aggregate-adoption",
    area: "WOWList.org",
    claim:
      "WOWList was a co-built Django/PostgreSQL/PostGIS + Ember community-calendar platform with 1,800+ users, 16,000+ event posts, and 35+ active city/region scenes by 2017.",
    status: "use-now",
    publicWording:
      "Co-built a community event platform with 1,800+ users, 16,000+ event posts, and 35+ active city/region scenes by 2017.",
    boundary:
      "Use aggregate adoption only; do not publish user records, organizer contact details, private media, or raw archive exports."
  },
  {
    id: "hje-2x-revenue",
    area: "Harry J. Epstein Company",
    claim:
      "Jamie contributed to 2x revenue growth while supporting e-commerce, web, analytics, marketing, content, and operations improvements.",
    status: "qualified",
    publicWording:
      "Contributed to 2x revenue growth for a legacy e-commerce business.",
    boundary:
      "Use contribution language unless more precise public wording is approved; do not publish revenue dashboards or internal financial detail."
  },
  {
    id: "sunday-dinner-196",
    area: "Sunday Dinner / 196 Artists Residency",
    claim:
      "Jamie created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    status: "qualified",
    publicWording:
      "300+ gatherings and 20+ resident artists supported through repeatable participation infrastructure.",
    boundary:
      "Use as resume-backed and records-supported; keep guest lists, contact records, addresses, and unapproved photos offline."
  },
  {
    id: "source-backed-memory",
    area: "Source-Backed Team Memory",
    claim:
      "Jamie developed a lab/proof-of-practice for source-linked, human-reviewed team memory and AI-assisted documentation.",
    status: "use-now",
    publicWording:
      "Source-backed team-memory lab with human review, governance, evals, and privacy boundaries.",
    boundary:
      "Describe as lab/proof-of-practice, not as finished production SaaS or a replacement for judgment."
  }
];

export const homepageProofItems = [
  proofBank.find((proof) => proof.id === "career-14-years")?.publicWording,
  proofBank.find((proof) => proof.id === "commercial-rent-memory")?.publicWording,
  proofBank.find((proof) => proof.id === "wowlist-aggregate-adoption")?.publicWording,
  proofBank.find((proof) => proof.id === "hje-2x-revenue")?.publicWording,
  proofBank.find((proof) => proof.id === "sunday-dinner-196")?.publicWording
].filter((item): item is string => Boolean(item));

export const operationsProofs = proofBank.filter((proof) => {
  return [
    "commercial-rent-memory",
    "nyc-artist-coalition-role",
    "wowlist-aggregate-adoption",
    "hje-2x-revenue",
    "sunday-dinner-196",
    "source-backed-memory"
  ].includes(proof.id);
});
