export type ProofStrength = "strong-public-safe" | "approval-gated";

export type ProofCategory =
  | "role-positioning"
  | "technical-operations"
  | "coalition-public-web"
  | "civic-documentation"
  | "community-platform"
  | "participation-infrastructure"
  | "civic-prototype"
  | "redevelopment-documentation";

export type ProofBankEntry = {
  id: string;
  title: string;
  category: ProofCategory;
  shortClaim: string;
  canonicalClaim: string;
  strength: ProofStrength;
  basis: string;
  websiteUse: string;
  boundaries: string[];
  projectSlugs?: string[];
  featuredOrder?: number;
};

export const proofBankPrinciples = [
  "Use the strongest public-safe wording the record supports.",
  "Name Jamie's role without overstating sole ownership or causality.",
  "Keep private source material, raw records, and unapproved artifacts out of the repo and site."
] as const;

export const proofsBank = [
  {
    id: "overall-operating-structure",
    title: "Operating structure across public-facing environments",
    category: "role-positioning",
    shortClaim: "14+ years building operating structure",
    canonicalClaim:
      "14+ years building operating structure across civic, cultural, small-business, and technical environments.",
    strength: "strong-public-safe",
    basis:
      "Resume chronology, project history, and public-safe portfolio work samples.",
    websiteUse: "Homepage proof strip, resume page, role-fit positioning.",
    boundaries: [
      "Do not imply all years were one continuous formal employment role.",
      "Do not publish private client, community, or collaborator records."
    ],
    featuredOrder: 1
  },
  {
    id: "hje-ecommerce-growth",
    title: "Legacy e-commerce and operations modernization",
    category: "technical-operations",
    shortClaim: "Contributed to 2x revenue growth for a legacy e-commerce business",
    canonicalClaim:
      "Helped translate an 80+ year-old industrial supply business into searchable e-commerce, dealer-aware checkout, content, analytics, marketing, and operational workflows, contributing to 2x revenue growth.",
    strength: "strong-public-safe",
    basis:
      "Resume-backed impact claim, public website context, and public-safe business summary.",
    websiteUse: "Homepage proof strip, HJE case study, resume page.",
    boundaries: [
      "Use contribution language, not sole-causality language.",
      "Do not publish private dashboards, customer data, detailed revenue breakdowns, vendor terms, or credentials."
    ],
    projectSlugs: ["harry-j-epstein"],
    featuredOrder: 2
  },
  {
    id: "nac-public-web-infrastructure",
    title: "NYC Artist Coalition public web infrastructure",
    category: "coalition-public-web",
    shortClaim: "Built public campaign websites for NYC Artist Coalition advocacy",
    canonicalClaim:
      "Built public campaign websites for NYC Artist Coalition advocacy, including the coalition site, FairRentNYC, Talks Not Raids, and Let NYC Dance public web surfaces.",
    strength: "strong-public-safe",
    basis:
      "Jamie-authored public campaign websites and public-safe coalition project history.",
    websiteUse: "FairRentNYC / CRS case study and Technical Operations proof map.",
    boundaries: [
      "Website authorship is Jamie's direct contribution; campaign accomplishments remain collective.",
      "Do not imply Jamie solely led NAC, owned the campaigns, authored every policy position, or controlled partner decisions."
    ],
    projectSlugs: ["fair-rent-nyc"]
  },
  {
    id: "crs-campaign-memory",
    title: "Commercial Rent Stabilization campaign-memory infrastructure",
    category: "civic-documentation",
    shortClaim: "Built public campaign websites + 30+ pages of civic campaign memory",
    canonicalClaim:
      "Helped structure and steward 30+ pages of shared Commercial Rent Stabilization campaign-memory infrastructure, including running minutes, decision records, action trackers, source maps, and policy question logs.",
    strength: "strong-public-safe",
    basis:
      "Public-safe running-minutes summary, collaboration records, and approved collective-work framing.",
    websiteUse: "Homepage proof strip, CRS case study, Technical Operations proof map.",
    boundaries: [
      "Use collective-work and stewardship language.",
      "Do not publish private coalition notes, legal-review materials, stakeholder lists, private emails, raw strategy context, or unapproved quotes."
    ],
    projectSlugs: ["fair-rent-nyc"],
    featuredOrder: 3
  },
  {
    id: "wowlist-platform-scale",
    title: "WOWList community platform scale",
    category: "community-platform",
    shortClaim: "35+ active city scenes reached through WOWList.org",
    canonicalClaim:
      "Co-built a Python/Django, PostgreSQL/PostGIS, and Ember community event-calendar platform that grew to 1,800+ users, 16,000+ posts/events, and 35+ active city scenes.",
    strength: "strong-public-safe",
    basis:
      "Archived production data summarized only in aggregate, rounded public-safe counts, and historical project context.",
    websiteUse: "Homepage proof strip, WOWList proof page, resume page.",
    boundaries: [
      "Do not describe city activity as official chapters.",
      "Do not publish private user data, organizer contact lists, raw records, IP/geolocation fields, or unapproved community artifacts."
    ],
    projectSlugs: ["wowlist"],
    featuredOrder: 4
  },
  {
    id: "sunday-dinner-participation",
    title: "Recurring cultural participation infrastructure",
    category: "participation-infrastructure",
    shortClaim: "300+ hosted gatherings / 20+ resident artists supported",
    canonicalClaim:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    strength: "strong-public-safe",
    basis:
      "Public-safe aggregate counts and project history; private guest and community records omitted.",
    websiteUse: "Homepage proof strip, Sunday Dinner proof page, resume page.",
    boundaries: [
      "Do not publish guest lists, attendance records, private addresses, private messages, or unapproved photos.",
      "Do not turn community trust work into spectacle or imply institutional ownership of participants' work."
    ],
    projectSlugs: ["196-sunday-dinner"],
    featuredOrder: 5
  },
  {
    id: "callnyc-open-data-prototype",
    title: "CallNYC civic-data prototype",
    category: "civic-prototype",
    shortClaim: "Translated civic open data into resident-facing guidance",
    canonicalClaim:
      "Built an archived civic-data prototype that translated CouncilStat / constituent-services open data into issue pathways, district context, and resident-facing next-step guidance.",
    strength: "strong-public-safe",
    basis:
      "Archived prototype context, public open-data source context, and public-safe project summary.",
    websiteUse: "CallNYC case study and Technical Operations proof map.",
    boundaries: [
      "Always identify the work as archived and unofficial.",
      "Do not imply current city-service status, legal guidance, emergency guidance, or official affiliation."
    ],
    projectSlugs: ["callnyc"]
  },
  {
    id: "kc-town-hall-documentation",
    title: "Adaptive reuse planning and public-benefit documentation",
    category: "redevelopment-documentation",
    shortClaim: "Supported adaptive reuse planning and public-benefit documentation",
    canonicalClaim:
      "Supported redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant historic building.",
    strength: "strong-public-safe",
    basis:
      "Public-safe project records and approved summary language; precise public-funding wording remains approval-gated.",
    websiteUse: "KC Town Hall proof page and Technical Operations proof map.",
    boundaries: [
      "Do not publish private financial, legal, property, banking, or stakeholder details.",
      "Keep exact public-funding numbers and named partner claims approval-gated until Jamie approves the public source package."
    ],
    projectSlugs: ["kc-town-hall"]
  }
] satisfies ProofBankEntry[];

export const homepageProofs = proofsBank
  .filter((proof) => {
    return proof.featuredOrder !== undefined;
  })
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
