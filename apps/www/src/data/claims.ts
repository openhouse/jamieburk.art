import { z } from "zod";

const claimStatusSchema = z.enum([
  "approved",
  "use-with-care",
  "softened-for-production",
  "pending-approval",
  "protected"
]);

const claimCategorySchema = z.enum([
  "Career shape",
  "Operating systems",
  "Civic systems",
  "Community infrastructure",
  "Professional development"
]);

const claimSurfaceSchema = z.enum([
  "homepage-proof-strip",
  "homepage-copy",
  "work-card",
  "case-study",
  "resume-page",
  "about-page",
  "lab-page",
  "internal-docs"
]);

const claimSchema = z.object({
  id: z.string(),
  category: claimCategorySchema,
  status: claimStatusSchema,
  recommendedPublicWording: z.string(),
  strongerWordingIfApproved: z.string().optional(),
  evidenceBasis: z.array(z.string()),
  guardrail: z.string(),
  href: z.string().optional(),
  allowedSurfaces: z.array(claimSurfaceSchema),
  priority: z.number()
});

const claimsInput = [
  {
    id: "career-operating-structure",
    category: "Career shape",
    status: "approved",
    recommendedPublicWording: "14+ years building operating structure",
    evidenceBasis: ["Approved public resume", "selected work chronology"],
    guardrail: "Use as professional positioning, not as a credential or certification.",
    href: "/about",
    allowedSurfaces: [
      "homepage-proof-strip",
      "homepage-copy",
      "resume-page",
      "about-page",
      "case-study",
      "internal-docs"
    ],
    priority: 1
  },
  {
    id: "hje-growth-supported",
    category: "Operating systems",
    status: "softened-for-production",
    recommendedPublicWording: "Supported growth for a legacy e-commerce business",
    strongerWordingIfApproved:
      "Led Harry J. Epstein web, e-commerce, marketing, analytics, and operations improvements contributing to 2x revenue growth.",
    evidenceBasis: ["Approved public resume", "Harry J. Epstein public-safe source package"],
    guardrail:
      "Use contribution language. Do not publish private dashboards, revenue breakdowns, customer data, vendor terms, credentials, or internal operations.",
    href: "/work/harry-j-epstein",
    allowedSurfaces: [
      "homepage-proof-strip",
      "work-card",
      "case-study",
      "resume-page",
      "internal-docs"
    ],
    priority: 2
  },
  {
    id: "nac-role",
    category: "Civic systems",
    status: "use-with-care",
    recommendedPublicWording:
      "Co-founded NYC Artist Coalition and helps make NYC Artist Coalition / FairRentNYC work usable through civic systems, coalition operations, documentation, source maps, and policy communications.",
    evidenceBasis: [
      "Approved public resume",
      "public NYC Artist Coalition context",
      "public-safe Commercial Rent Stabilization source summaries"
    ],
    guardrail:
      "Use collective-work language. Do not imply sole leadership, legal authority, or ownership of coalition advocacy.",
    href: "/work/fair-rent-nyc",
    allowedSurfaces: ["work-card", "case-study", "about-page", "internal-docs"],
    priority: 3
  },
  {
    id: "crs-campaign-memory",
    category: "Civic systems",
    status: "softened-for-production",
    recommendedPublicWording: "Shared civic campaign-memory infrastructure",
    strongerWordingIfApproved:
      "Built and stewarded 30+ pages of shared Commercial Rent Stabilization campaign-memory and coordination infrastructure.",
    evidenceBasis: [
      "Approved public resume",
      "Commercial Rent Stabilization running-minutes summary",
      "public-safe CRS working-record summaries"
    ],
    guardrail:
      "Public-safe summary only. Do not publish private coalition notes, stakeholder lists, legal-review material, private emails, raw transcripts, or unapproved quotes.",
    href: "/work/fair-rent-nyc",
    allowedSurfaces: [
      "homepage-proof-strip",
      "work-card",
      "case-study",
      "resume-page",
      "internal-docs"
    ],
    priority: 4
  },
  {
    id: "callnyc",
    category: "Civic systems",
    status: "approved",
    recommendedPublicWording:
      "Built CallNYC.org after a New York City Council civic-data hackathon, translating constituent-services open data into resident-facing find help / next steps guidance.",
    evidenceBasis: [
      "Approved public resume",
      "CallNYC project records",
      "Politico New York article archive"
    ],
    guardrail:
      "Keep archived-prototype and unofficial status visible. Do not imply CallNYC was an official city service.",
    href: "/work/callnyc",
    allowedSurfaces: ["work-card", "case-study", "resume-page", "internal-docs"],
    priority: 4.5
  },
  {
    id: "callnyc-politico",
    category: "Civic systems",
    status: "approved",
    recommendedPublicWording:
      "CallNYC was covered by Politico New York in Miranda Neubauer's March 14, 2016 article, \"Website provides new information about council members' focus.\"",
    evidenceBasis: ["Verified public PDF archive of the Politico New York article"],
    guardrail:
      "Use as historical press coverage. Keep the project framed as an archived civic-tech prototype, not an official or current service.",
    href: "/work/callnyc",
    allowedSurfaces: ["case-study", "resume-page", "internal-docs"],
    priority: 4.6
  },
  {
    id: "wowlist-multicity",
    category: "Community infrastructure",
    status: "softened-for-production",
    recommendedPublicWording: "Multi-city community web systems",
    strongerWordingIfApproved:
      "Co-built WOWList, a Python / Django + Ember.js community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
    evidenceBasis: [
      "Approved public resume",
      "WOWList portfolio context report",
      "public-safe WOWList OCR and transcript summaries"
    ],
    guardrail:
      "Use rough aggregate adoption wording. Do not publish private user data, organizer contact lists, account records, raw database records, or unapproved community materials.",
    href: "/work/wowlist",
    allowedSurfaces: [
      "homepage-proof-strip",
      "work-card",
      "case-study",
      "resume-page",
      "internal-docs"
    ],
    priority: 5
  },
  {
    id: "sunday-dinner-participation",
    category: "Community infrastructure",
    status: "softened-for-production",
    recommendedPublicWording: "Long-running gatherings and resident-artist support",
    strongerWordingIfApproved:
      "Documented 300+ gatherings and supported 20+ resident artists through Sunday Dinner / 196 systems.",
    evidenceBasis: ["Approved public resume", "Sunday Dinner workbook summary"],
    guardrail:
      "Summary-only. Do not publish guest names, attendance records, addresses, phone numbers, emails, private stories, private interiors, or unapproved images.",
    href: "/work/196-sunday-dinner",
    allowedSurfaces: [
      "homepage-proof-strip",
      "work-card",
      "case-study",
      "resume-page",
      "internal-docs"
    ],
    priority: 6
  },
  {
    id: "kc-town-hall-public-benefit",
    category: "Operating systems",
    status: "use-with-care",
    recommendedPublicWording:
      "Supported adaptive-reuse planning and public-benefit documentation for a long-vacant historic Kansas City building project.",
    strongerWordingIfApproved:
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant approximately 6,500 square foot historic building into four commercial spaces and three homes, including a $490,539 public funding recommendation.",
    evidenceBasis: ["Approved public resume", "KC Town Hall public-funding packet summary"],
    guardrail:
      "Use public-record scale and recommendation language. Do not publish private financial, legal, banking, property, or stakeholder details.",
    href: "/work/kc-town-hall",
    allowedSurfaces: ["work-card", "case-study", "resume-page", "internal-docs"],
    priority: 7
  },
  {
    id: "source-backed-team-memory",
    category: "Operating systems",
    status: "approved",
    recommendedPublicWording:
      "Bounded source-backed team-memory method for selected meetings, decisions, open questions, source material, and human review.",
    evidenceBasis: [
      "Source-Backed Team Memory proposal summary",
      "sprint memo summary",
      "product brief summary"
    ],
    guardrail:
      "Present as a lab, method, or consulting practice. Do not describe it as production SaaS, autonomous publication, AI authority, or a private archive browser.",
    href: "/lab/source-backed-team-memory",
    allowedSurfaces: ["lab-page", "case-study", "internal-docs"],
    priority: 8
  },
  {
    id: "ai-evals-completion",
    category: "Professional development",
    status: "approved",
    recommendedPublicWording:
      "Completed AI Evals for Engineers & PMs with Hamel Husain and Shreya Shankar / Maven in 2026.",
    evidenceBasis: ["AI Evals certificate image", "approved public resume"],
    guardrail:
      "Certificate completion only. Do not describe as a degree or formal credential beyond course completion.",
    allowedSurfaces: ["resume-page", "about-page", "internal-docs"],
    priority: 9
  }
] satisfies z.input<typeof claimSchema>[];

export const claims = claimSchema
  .array()
  .parse(claimsInput)
  .sort((a, b) => a.priority - b.priority);

export const homepageProofClaims = claims.filter((claim) =>
  claim.allowedSurfaces.includes("homepage-proof-strip")
);

export type Claim = z.infer<typeof claimSchema>;
