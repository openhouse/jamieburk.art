import { z } from "zod";

const proofStatusSchema = z.enum(["known", "use-with-care"]);

const proofCategorySchema = z.enum([
  "Career shape",
  "Operating systems",
  "Civic systems",
  "Community infrastructure",
  "Professional development"
]);

const proofClaimSchema = z.object({
  id: z.string(),
  category: proofCategorySchema,
  status: proofStatusSchema,
  short: z.string(),
  claim: z.string(),
  useFor: z.array(z.string()),
  evidenceBasis: z.array(z.string()),
  limit: z.string(),
  href: z.string().optional(),
  homepage: z.boolean().default(false),
  priority: z.number()
});

const proofClaimsInput = [
  {
    id: "career-operating-structure",
    category: "Career shape",
    status: "known",
    short: "14+ years creating operating structure",
    claim:
      "Jamie has 14+ years creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
    useFor: ["Portfolio positioning", "resume summary", "reviewer orientation"],
    evidenceBasis: ["Current public resume", "selected work history"],
    limit: "Use as professional positioning, not as a credentialed certification.",
    href: "/about",
    homepage: true,
    priority: 1
  },
  {
    id: "hje-revenue-growth",
    category: "Operating systems",
    status: "known",
    short: "HJE e-commerce work contributed to 2x revenue growth",
    claim:
      "Jamie led web, e-commerce, marketing, analytics, and operations improvements for an 80+ year-old legacy industrial business, contributing to 2x revenue growth.",
    useFor: ["Operating-systems proof", "implementation work", "small-business systems"],
    evidenceBasis: ["Current public resume", "HJE narrative briefs", "public HJE context"],
    limit:
      "Say contributing to, not caused alone. Do not publish dashboards, revenue breakdowns, customer data, vendor terms, or internal operations.",
    href: "/work/harry-j-epstein",
    homepage: true,
    priority: 2
  },
  {
    id: "nac-role",
    category: "Civic systems",
    status: "use-with-care",
    short: "Co-founded NYC Artist Coalition and leads civic systems work",
    claim:
      "Jamie co-founded NYC Artist Coalition and works through NYC Artist Coalition / FairRentNYC as a civic systems, coalition operations, and policy communications lead.",
    useFor: ["About page", "CRS case study", "coalition-operations positioning"],
    evidenceBasis: ["Current public resume", "NAC / FairRentNYC working records", "public campaign context"],
    limit:
      "Use collective-work language. Do not imply sole leadership, legal authority, or ownership of collective advocacy.",
    href: "/work/fair-rent-nyc",
    priority: 3
  },
  {
    id: "crs-campaign-memory",
    category: "Civic systems",
    status: "known",
    short: "30+ pages of civic campaign-memory infrastructure",
    claim:
      "Jamie built and stewarded 30+ pages of shared campaign-memory and coordination infrastructure for a 2026 Commercial Rent Stabilization collaboration across Action Lab / Small Business United, Fair Rent NYC, NYC Artist Coalition, and partner networks.",
    useFor: ["Homepage proof", "technical-operations page", "CRS case study"],
    evidenceBasis: ["Current public resume", "running-minutes archive", "CRS working records"],
    limit:
      "Public-safe summary only. Do not publish private coalition notes, stakeholder lists, legal-review materials, private emails, or raw transcripts.",
    href: "/work/fair-rent-nyc",
    homepage: true,
    priority: 4
  },
  {
    id: "crs-source-map",
    category: "Civic systems",
    status: "known",
    short: "CRS legislative source map and provenance redline",
    claim:
      "Jamie created a legislative source map and provenance redline tracing Commercial Rent Stabilization bill language from NYC Council Intro 93 through Fair Rent NYC recommendations, SBJSA-derived provisions, and Albany S8319 revisions.",
    useFor: ["CRS case study", "source-backed memory proof", "technical operations"],
    evidenceBasis: ["Current public resume", "legislative provenance redline"],
    limit: "Describe as source mapping and provenance work for discussion/review, not legal analysis.",
    href: "/work/fair-rent-nyc",
    priority: 5
  },
  {
    id: "nac-public-campaigns",
    category: "Civic systems",
    status: "use-with-care",
    short: "NAC public advocacy across cultural-space campaigns",
    claim:
      "NYC Artist Coalition publicly appears in the ecosystem around Let NYC Dance, Save NYC Spaces, Talks Not Raids, and Fair Rent NYC.",
    useFor: ["NAC context", "civic advocacy history", "public campaign orientation"],
    evidenceBasis: [
      "nycartc.com",
      "letnycdance.nycartc.com",
      "savenycspaces.nycartc.com",
      "talksnotraids.com",
      "fairrentnyc.nycartc.com"
    ],
    limit:
      "This is a collective public-history claim. Do not turn it into a solo Jamie accomplishment.",
    href: "/work/fair-rent-nyc",
    priority: 6
  },
  {
    id: "wowlist",
    category: "Community infrastructure",
    status: "known",
    short: "WOWList adopted across roughly 35 city ecosystems",
    claim:
      "Jamie co-built WOWList with Richard Caceres, a Python / Django + Ember.js community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
    useFor: ["Community platform proof", "product operations", "web systems"],
    evidenceBasis: ["Current public resume", "WOWList context report", "repaired transcript and OCR notes"],
    limit: "Use roughly. Do not publish private user data, organizer contact lists, or raw community records.",
    href: "/work/wowlist",
    homepage: true,
    priority: 7
  },
  {
    id: "sunday-dinner",
    category: "Community infrastructure",
    status: "known",
    short: "300+ gatherings documented / 20+ resident artists supported",
    claim:
      "Jamie created Sunday Dinner / 196 Artists Residency as repeatable trust-building and participation infrastructure, documenting 300+ gatherings and supporting 20+ resident artists.",
    useFor: ["Community operations proof", "participation systems", "continuity work"],
    evidenceBasis: ["Current public resume", "Sunday Dinner records"],
    limit:
      "Summary-only. Do not publish guest names, attendance records, addresses, contact info, private stories, or unapproved photos.",
    href: "/work/196-sunday-dinner",
    homepage: true,
    priority: 8
  },
  {
    id: "kc-town-hall",
    category: "Operating systems",
    status: "known",
    short: "KC Town Hall public-benefit redevelopment documentation",
    claim:
      "Jamie co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant approximately 6,500 sq. ft. historic building into four commercial spaces and three homes, including a $490,539 public funding recommendation.",
    useFor: ["Long-horizon project management", "public-benefit documentation", "implementation support"],
    evidenceBasis: ["Current public resume", "user-approved public-record claim surface"],
    limit:
      "Keep to approved public-record scale/funding facts. Do not publish private financial, legal, banking, property, or stakeholder details.",
    href: "/work/kc-town-hall",
    priority: 9
  },
  {
    id: "source-backed-memory",
    category: "Operating systems",
    status: "known",
    short: "Source-backed team memory method",
    claim:
      "Jamie has a bounded method for turning selected meetings, documents, decisions, open questions, and source material into human-reviewed team memory.",
    useFor: ["Lab page", "AI-readiness", "documentation systems"],
    evidenceBasis: ["Jonathan proposal", "sprint memo", "product spec"],
    limit:
      "Present as an early method / consulting practice, not a production SaaS, AI authority, or private archive browser.",
    href: "/lab/source-backed-team-memory",
    priority: 10
  },
  {
    id: "ai-evals",
    category: "Professional development",
    status: "known",
    short: "Completed AI Evals for Engineers & PMs",
    claim:
      "Jamie completed AI Evals for Engineers & PMs with Shreya Shankar and Hamel Husain / Maven in 2026.",
    useFor: ["Professional development", "AI evaluation literacy", "resume support"],
    evidenceBasis: ["Certificate image", "current public resume"],
    limit: "Certificate completion only; not a degree or formal credential beyond completion.",
    priority: 11
  }
] satisfies z.input<typeof proofClaimSchema>[];

export const proofClaims = proofClaimSchema
  .array()
  .parse(proofClaimsInput)
  .sort((a, b) => a.priority - b.priority);

export const homepageProofClaims = proofClaims.filter((claim) => claim.homepage);

export const proofCategories = [
  "Career shape",
  "Operating systems",
  "Civic systems",
  "Community infrastructure",
  "Professional development"
] as const;

export const proofPrinciples = [
  "Known claims are public-safe and evidence-backed enough to say.",
  "Use-with-care claims need collective language, context, and visible limits.",
  "Open or protected source material stays out of the public site.",
  "The website projects selected proof; it does not expose the archive."
] as const;

export type ProofClaim = z.infer<typeof proofClaimSchema>;
