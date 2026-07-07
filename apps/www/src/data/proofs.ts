export type ProofSupportLevel =
  | "defensible"
  | "use-with-care"
  | "open"
  | "protected";

export type ProofApprovalStatus =
  | "approved"
  | "needs-jamie-review"
  | "needs-collaborator-review"
  | "protected";

export type ProofSurface =
  | "homepage"
  | "resume-page"
  | "technical-operations"
  | "work-card"
  | "case-study"
  | "lab"
  | "contact"
  | "do-not-publish";

export type ProofClaim = {
  id: string;
  projectSlug?: string;
  title: string;
  chadLensClaim: string;
  publicSafeWording: string;
  supportLevel: ProofSupportLevel;
  approvalStatus: ProofApprovalStatus;
  allowedSurfaces: ProofSurface[];
  roleFit: string[];
  sourceClass: string;
  publicUsePurpose: string;
  boundaries: string;
  notToClaim?: string[];
};

export const proofClaims: ProofClaim[] = [
  {
    id: "CORE-001",
    title: "Cross-project operating structure",
    chadLensClaim:
      "Jamie turns work where requirements, workflows, ownership, documentation, and handoffs are not yet clear into usable systems for public-facing teams.",
    publicSafeWording:
      "I turn under-structured work into usable systems for complex public-facing teams.",
    supportLevel: "defensible",
    approvalStatus: "approved",
    allowedSurfaces: ["homepage", "resume-page", "technical-operations", "contact"],
    roleFit: [
      "Technical Project Management",
      "Product Operations",
      "Implementation",
      "Delivery Coordination"
    ],
    sourceClass: "approved resume plus public-safe work chronology",
    publicUsePurpose:
      "Primary positioning line for hiring, referral, and role-fit readers.",
    boundaries:
      "Use as a throughline, not as a substitute for concrete project proof."
  },
  {
    id: "HJE-001",
    projectSlug: "harry-j-epstein",
    title: "Harry J. Epstein Company modernization",
    chadLensClaim:
      "Jamie helped an 80+ year-old legacy industrial business adapt to e-commerce by improving web, analytics, marketing, content, and operational workflows.",
    publicSafeWording:
      "Helped modernize e-commerce, analytics, content, marketing, and operational workflows for a legacy industrial business.",
    supportLevel: "defensible",
    approvalStatus: "approved",
    allowedSurfaces: ["homepage", "resume-page", "technical-operations", "work-card", "case-study"],
    roleFit: [
      "Implementation",
      "Web Systems",
      "Operations Documentation",
      "Analytics Translation"
    ],
    sourceClass: "approved resume, public website, public-safe summary",
    publicUsePurpose:
      "Shows long-running implementation work across technical and nontechnical business operations.",
    boundaries:
      "Do not publish dashboards, customer data, vendor terms, credentials, detailed revenue breakdowns, or internal operating practices.",
    notToClaim: [
      "Do not claim Jamie solely caused business growth.",
      "Do not publish internal financial detail."
    ]
  },
  {
    id: "HJE-002",
    projectSlug: "harry-j-epstein",
    title: "Harry J. Epstein revenue contribution",
    chadLensClaim:
      "Jamie contributed to a period of 2x revenue growth while supporting e-commerce, marketing, analytics, content, and operations improvements.",
    publicSafeWording:
      "Contributed to 2x revenue growth while supporting a legacy e-commerce business.",
    supportLevel: "use-with-care",
    approvalStatus: "needs-jamie-review",
    allowedSurfaces: ["resume-page", "case-study"],
    roleFit: ["Implementation", "Business Operations", "Analytics Translation"],
    sourceClass: "approved resume with private business context held outside repo",
    publicUsePurpose:
      "Use only where contribution language and boundaries can remain visible.",
    boundaries:
      "Use contribution language only. Do not publish revenue dashboards, exact revenue figures, attribution analysis, or private financial context.",
    notToClaim: [
      "Do not say Jamie caused, owned, or solely produced the revenue outcome."
    ]
  },
  {
    id: "NAC-001",
    projectSlug: "fair-rent-nyc",
    title: "NYC Artist Coalition role",
    chadLensClaim:
      "Jamie is a co-founding member of NYC Artist Coalition whose current lane connects cultural-space fieldwork, Commercial Rent Stabilization coordination, public-data framing, and consent-aware follow-up.",
    publicSafeWording:
      "Co-founding member of NYC Artist Coalition; supports cultural-space fieldwork, Commercial Rent Stabilization coordination, public-data framing, and consent-aware follow-up.",
    supportLevel: "use-with-care",
    approvalStatus: "needs-collaborator-review",
    allowedSurfaces: ["case-study", "technical-operations"],
    roleFit: ["Civic Operations", "Documentation Systems", "Stakeholder Follow-Through"],
    sourceClass: "public-safe coalition summary with private materials omitted",
    publicUsePurpose:
      "Clarifies Jamie's role without implying sole leadership of collective civic work.",
    boundaries:
      "Do not publish private venue details, landlord or lease details, signup lists, phone numbers, emails, raw notes, or unapproved collaborator names.",
    notToClaim: [
      "Do not claim Jamie single-handedly led the coalition or movement.",
      "Do not claim ownership of legislation unless separately approved."
    ]
  },
  {
    id: "CRS-001",
    projectSlug: "fair-rent-nyc",
    title: "Commercial Rent Stabilization campaign memory",
    chadLensClaim:
      "Jamie helped structure shared campaign memory, source maps, decision and action records, policy questions, public-data framing, and follow-up systems for Commercial Rent Stabilization collaboration.",
    publicSafeWording:
      "Structured shared campaign-memory, source maps, action records, open questions, and public-data framing for Commercial Rent Stabilization collaboration.",
    supportLevel: "use-with-care",
    approvalStatus: "needs-collaborator-review",
    allowedSurfaces: ["technical-operations", "work-card", "case-study"],
    roleFit: [
      "Meeting Synthesis",
      "Action Tracking",
      "Source Mapping",
      "Civic Documentation"
    ],
    sourceClass: "public-safe summary with private coalition context outside repo",
    publicUsePurpose:
      "Shows documentation architecture for complex, sensitive, public-facing collaboration.",
    boundaries:
      "Do not publish private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private correspondence, or unapproved quotes.",
    notToClaim: [
      "Do not describe the work as legal advice.",
      "Do not claim Jamie authored or owned legislation."
    ]
  },
  {
    id: "CALL-001",
    projectSlug: "callnyc",
    title: "CallNYC civic-data prototype",
    chadLensClaim:
      "Jamie built an archived civic-data prototype that translated constituent-services open data into resident-facing issue pathways and next-step guidance.",
    publicSafeWording:
      "Built an archived civic-data prototype translating constituent-services open data into resident-facing issue pathways.",
    supportLevel: "defensible",
    approvalStatus: "approved",
    allowedSurfaces: ["technical-operations", "work-card", "case-study"],
    roleFit: ["Civic Technology", "Open Data", "Information Architecture"],
    sourceClass: "public-safe project summary and public/archival context",
    publicUsePurpose:
      "Shows translation of open data into a public-facing guidance prototype.",
    boundaries:
      "Make the archived and unofficial status visible. Do not present CallNYC as current, comprehensive, official, legal, emergency, or City-run guidance.",
    notToClaim: ["Do not claim CallNYC is an official or current City service."]
  },
  {
    id: "WOW-001",
    projectSlug: "wowlist",
    title: "WOWList community platform",
    chadLensClaim:
      "Jamie co-built a Python / Django and Ember.js community-calendar platform organized around followable keyword communities for arts and DIY organizers.",
    publicSafeWording:
      "Co-built a Django and Ember community-calendar platform adopted across roughly 35 city ecosystems.",
    supportLevel: "use-with-care",
    approvalStatus: "needs-jamie-review",
    allowedSurfaces: ["homepage", "resume-page", "technical-operations", "work-card", "case-study"],
    roleFit: ["Product Operations", "Community Platforms", "Public-Facing Web Systems"],
    sourceClass: "public-safe archive summary with private records omitted",
    publicUsePurpose:
      "Shows product and implementation work for a real public community platform.",
    boundaries:
      "Use approximate adoption language. Do not publish user records, organizer contacts, raw database exports, private media, or active-today claims.",
    notToClaim: [
      "Do not say official chapters.",
      "Do not say millions of users.",
      "Do not imply the platform is active today."
    ]
  },
  {
    id: "SD-001",
    projectSlug: "196-sunday-dinner",
    title: "196 / Sunday Dinner participation infrastructure",
    chadLensClaim:
      "Jamie created repeatable invitation, hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    publicSafeWording:
      "Created repeatable hosting, onboarding, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    supportLevel: "use-with-care",
    approvalStatus: "needs-jamie-review",
    allowedSurfaces: ["homepage", "resume-page", "technical-operations", "work-card", "case-study"],
    roleFit: ["Community Operations", "Onboarding", "Facilitation", "Continuity Systems"],
    sourceClass: "public-safe aggregate summary with private records omitted",
    publicUsePurpose:
      "Shows operations for high-trust cultural and community systems without exposing participants.",
    boundaries:
      "Do not publish attendee names, resident names, addresses, guest records, contact data, private logistics, or photos without consent."
  },
  {
    id: "KCTH-001",
    projectSlug: "kc-town-hall",
    title: "KC Town Hall adaptive reuse documentation",
    chadLensClaim:
      "Jamie supported adaptive-reuse planning and public-benefit documentation for a long-vacant historic building, including public-funding and stakeholder documentation.",
    publicSafeWording:
      "Supported adaptive-reuse planning and public-benefit documentation for a long-vacant historic building.",
    supportLevel: "defensible",
    approvalStatus: "needs-jamie-review",
    allowedSurfaces: ["technical-operations", "case-study"],
    roleFit: ["Long-Horizon Project Planning", "Stakeholder Documentation", "Funding Support"],
    sourceClass: "public-safe summary and public record context",
    publicUsePurpose:
      "Shows careful documentation and implementation support around public-benefit planning.",
    boundaries:
      "Do not publish banking, legal, property, partner-sensitive, finance-sensitive, or private stakeholder records.",
    notToClaim: [
      "Do not say Jamie solely secured public funding.",
      "Do not imply completed redevelopment without approval."
    ]
  },
  {
    id: "SBTM-001",
    projectSlug: "source-backed-team-memory",
    title: "Source-Backed Team Memory",
    chadLensClaim:
      "Jamie developed a bounded source-backed team-memory method for turning selected meetings, documents, and product conversations into human-reviewed decision records, onboarding context, open questions, governance notes, and next steps.",
    publicSafeWording:
      "A practical source-backed memory sprint for teams whose decisions, documents, and onboarding context are moving faster than their documentation habits.",
    supportLevel: "defensible",
    approvalStatus: "approved",
    allowedSurfaces: ["technical-operations", "lab", "contact"],
    roleFit: [
      "Documentation Architecture",
      "AI Evaluation Discipline",
      "Onboarding Context",
      "Decision Records"
    ],
    sourceClass: "public-safe lab framing and approved method summary",
    publicUsePurpose:
      "Frames a bounded method/bridge-work offer without turning it into the site's main identity.",
    boundaries:
      "Lab and method only. Not production SaaS, not an autonomous AI system, not a private archive browser, and not a replacement for judgment or consent.",
    notToClaim: [
      "Do not say AI replaces review, facilitation, consent, or direct communication."
    ]
  },
  {
    id: "AI-001",
    title: "AI Evals for Engineers & PMs",
    chadLensClaim:
      "Jamie completed AI Evals for Engineers & PMs with Hamel Husain and Shreya Shankar through Maven in 2026.",
    publicSafeWording:
      "Completed AI Evals for Engineers & PMs, supporting practical judgment around evals, traces, annotation, retrieval quality, and human review.",
    supportLevel: "defensible",
    approvalStatus: "approved",
    allowedSurfaces: ["resume-page", "technical-operations", "lab"],
    roleFit: ["AI Evals", "Human Review", "Product Operations", "Quality Loops"],
    sourceClass: "provided completion certificate",
    publicUsePurpose:
      "Supports the lab's emphasis on reviewable evidence, error analysis, corrections, and human judgment.",
    boundaries:
      "Training proof only. Do not present it as shipped production AI system ownership."
  }
];

export const homepageProofClaims = proofClaims
  .filter((claim) => claim.allowedSurfaces.includes("homepage"))
  .map((claim) => claim.publicSafeWording);

export const resumeProofHighlights = proofClaims
  .filter((claim) => claim.allowedSurfaces.includes("resume-page"))
  .map((claim) => claim.publicSafeWording);

export type TechnicalOperationsProof = {
  id: string;
  title: string;
  publicSafeWording: string;
  roleFit: string[];
  publicUsePurpose: string;
  boundaries: string;
};

export const technicalOperationsProofs: TechnicalOperationsProof[] = proofClaims
  .filter((claim) => claim.allowedSurfaces.includes("technical-operations"))
  .map((claim) => ({
    id: claim.id,
    title: claim.title,
    publicSafeWording: claim.publicSafeWording,
    roleFit: claim.roleFit,
    publicUsePurpose: claim.publicUsePurpose,
    boundaries: claim.boundaries
  }));
