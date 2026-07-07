import { z } from "zod";

const proofSurfaceSchema = z.enum([
  "homepage-proof-strip",
  "resume-page",
  "technical-operations-page",
  "work-case-study",
  "lab-page",
  "contact-page",
  "not-projected"
]);

const proofStatusSchema = z.enum([
  "public-safe",
  "resume-approved",
  "aggregate-supported",
  "needs-citation-confirmation",
  "approval-required"
]);

const proofSchema = z.object({
  id: z.string(),
  title: z.string(),
  projectSlug: z.string().optional(),
  category: z.string(),
  claim: z.string(),
  homepageClaim: z.string().optional(),
  resumeClaim: z.string().optional(),
  technicalOperationsClaim: z.string().optional(),
  status: proofStatusSchema,
  evidenceBasis: z.array(z.string()),
  publicSources: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  projectionSurfaces: z.array(proofSurfaceSchema),
  constraints: z.array(z.string()),
  tags: z.array(z.string()),
  priority: z.number()
});

const proofBankInput = [
  {
    id: "cross-project-operating-structure",
    title: "Operating Structure Across Public-Facing Work",
    category: "Role Fit",
    claim:
      "Jamie has 14+ years creating operating structure between stakeholders, product, documentation, implementation, and public-facing systems.",
    homepageClaim: "14+ years creating operating structure across public-facing work.",
    resumeClaim:
      "14+ years creating operating structure across civic, cultural, small-business, and technical environments.",
    technicalOperationsClaim:
      "Turns ambiguous work into requirements, workflows, decision trails, onboarding materials, launch support, and durable handoffs.",
    status: "public-safe",
    evidenceBasis: [
      "Approved resume chronology",
      "Public-safe portfolio project history",
      "Cross-project role pattern across HJE, FairRentNYC, CallNYC, WOWList, 196 / Sunday Dinner, KC Town Hall, and Source-Backed Team Memory"
    ],
    projectionSurfaces: [
      "homepage-proof-strip",
      "resume-page",
      "technical-operations-page"
    ],
    constraints: [
      "Do not imply one continuous formal employment role across every year.",
      "Do not publish private client, community, coalition, or collaborator records."
    ],
    tags: ["technical-operations", "product-operations", "implementation"],
    priority: 10
  },
  {
    id: "hje-ecommerce-stewardship",
    title: "Harry J. Epstein E-commerce Stewardship",
    projectSlug: "harry-j-epstein",
    category: "Operating Systems",
    claim:
      "Jamie helped an 80+ year-old legacy industrial business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    homepageClaim: "Long-running web and operations stewardship for a legacy e-commerce business.",
    resumeClaim:
      "Helped an 80+ year-old industrial business adapt to e-commerce through web, analytics, marketing, content, and operations improvements.",
    technicalOperationsClaim:
      "Translated legacy operating knowledge into maintainable public-facing web, content, analytics, and workflow systems.",
    status: "public-safe",
    evidenceBasis: [
      "Public website context",
      "Approved resume framing",
      "Public-safe business summary; private business records intentionally omitted"
    ],
    publicSources: [{ label: "Harry J. Epstein Company", url: "https://www.harryepstein.com/" }],
    projectionSurfaces: [
      "homepage-proof-strip",
      "resume-page",
      "technical-operations-page",
      "work-case-study"
    ],
    constraints: [
      "Use contribution language; do not imply sole causation.",
      "Do not publish private dashboards, customer data, vendor terms, credentials, revenue breakdowns, or sensitive operating practices."
    ],
    tags: ["web-systems", "analytics", "small-business", "implementation"],
    priority: 20
  },
  {
    id: "hje-revenue-growth-contribution",
    title: "HJE Revenue Growth Contribution",
    projectSlug: "harry-j-epstein",
    category: "Impact",
    claim:
      "Jamie contributed to 2x revenue growth while supporting e-commerce, marketing, analytics, content, and operations improvements.",
    resumeClaim:
      "Contributed to 2x revenue growth through e-commerce, marketing, analytics, content, and operations improvements.",
    status: "resume-approved",
    evidenceBasis: [
      "Resume-backed impact claim",
      "Private business materials omitted from the public repo"
    ],
    projectionSurfaces: ["resume-page", "work-case-study"],
    constraints: [
      "Use contribution language.",
      "Do not publish internal dashboards, revenue breakdowns, customer data, vendor terms, or business rules.",
      "Do not imply sole causality."
    ],
    tags: ["impact", "ecommerce", "operations"],
    priority: 30
  },
  {
    id: "fairrent-campaign-memory",
    title: "FairRentNYC / CRS Campaign Memory Infrastructure",
    projectSlug: "fair-rent-nyc",
    category: "Civic Documentation",
    claim:
      "Jamie built and stewarded public-safe campaign-memory infrastructure for Commercial Rent Stabilization work: running minutes, decision records, action trackers, source maps, legal and policy question logs, and public/internal boundaries.",
    homepageClaim: "Civic campaign-memory infrastructure for Commercial Rent Stabilization work.",
    resumeClaim:
      "Built and stewarded campaign-memory infrastructure for Commercial Rent Stabilization work, including decision records, action trackers, source maps, and public-safe boundaries.",
    technicalOperationsClaim:
      "Structured public/private civic documentation into usable records, open questions, source maps, and next-step systems.",
    status: "public-safe",
    evidenceBasis: [
      "Public-safe running-minutes summaries",
      "Public campaign context",
      "Private coalition records intentionally omitted"
    ],
    publicSources: [{ label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }],
    projectionSurfaces: [
      "homepage-proof-strip",
      "resume-page",
      "technical-operations-page",
      "work-case-study",
      "lab-page"
    ],
    constraints: [
      "Use collective-work language: helped structure, built and stewarded, supported, translated.",
      "Do not publish raw coalition notes, legal-review materials, stakeholder lists, private emails, raw strategy context, or unapproved quotes.",
      "Do not present policy analysis as legal advice."
    ],
    tags: ["civic-technology", "documentation-systems", "source-backed-memory"],
    priority: 40
  },
  {
    id: "callnyc-civic-data-prototype",
    title: "CallNYC Civic Data Prototype",
    projectSlug: "callnyc",
    category: "Civic Prototype",
    claim:
      "Jamie built CallNYC.org after a New York City Council civic-data hackathon, translating constituent-services open data into resident-facing find help / next steps guidance.",
    resumeClaim: "Built an archived civic-data prototype that translated open data into resident-facing guidance.",
    technicalOperationsClaim:
      "Translated civic open data and service categories into a usable resident-facing prototype.",
    status: "public-safe",
    evidenceBasis: [
      "Approved resume framing",
      "Archived project context",
      "Public open-data context"
    ],
    projectionSurfaces: ["resume-page", "technical-operations-page", "work-case-study"],
    constraints: [
      "Always identify the work as archived and unofficial.",
      "Do not imply current city-service status, legal guidance, emergency guidance, or official City Council affiliation."
    ],
    tags: ["civic-technology", "open-data", "prototype"],
    priority: 50
  },
  {
    id: "nyc-artist-coalition-role",
    title: "NYC Artist Coalition Role",
    projectSlug: "fair-rent-nyc",
    category: "Coalition Operations",
    claim:
      "Jamie is a co-founding member of NYC Artist Coalition and supports cultural-space fieldwork, campaign memory, policy communications, and coalition-operations structure.",
    resumeClaim:
      "Co-founding NYC Artist Coalition member supporting cultural-space fieldwork, campaign memory, policy communications, and coalition-operations structure.",
    technicalOperationsClaim:
      "Supports civic coalition work by turning fieldwork, public materials, open questions, and follow-up needs into shared operating structure.",
    status: "public-safe",
    evidenceBasis: [
      "Public-safe role framing",
      "NYC Artist Coalition public context",
      "FairRentNYC public campaign context"
    ],
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }
    ],
    projectionSurfaces: ["resume-page", "technical-operations-page", "work-case-study"],
    constraints: [
      "Use collective-work language.",
      "Do not frame Jamie as the sole leader of NYC Artist Coalition or owner of collective coalition outcomes.",
      "Do not imply legal counsel, official agency role, or sole authorship of legislation.",
      "Do not publish private venue, lease, landlord, signup, fieldwork, or contact details."
    ],
    tags: ["coalition-operations", "civic-technology", "documentation-systems"],
    priority: 55
  },
  {
    id: "wowlist-community-platform",
    title: "WOWList Community Platform",
    projectSlug: "wowlist",
    category: "Community Systems",
    claim:
      "Jamie co-built WOWList.org, a Python / Django and Ember.js community-calendar platform used by DIY arts and music organizers across multiple city ecosystems.",
    homepageClaim: "Community web systems used across multiple DIY arts and music city ecosystems.",
    resumeClaim:
      "Co-built a community-calendar platform used by DIY arts and music organizers across multiple city ecosystems.",
    status: "aggregate-supported",
    evidenceBasis: [
      "Public-safe aggregate archive summaries",
      "Historical project context",
      "Raw user and organizer records intentionally omitted"
    ],
    projectionSurfaces: ["homepage-proof-strip", "resume-page", "work-case-study"],
    constraints: [
      "Use aggregate adoption claims only.",
      "Avoid claiming official city chapters; use city ecosystems or city scenes.",
      "Do not publish user records, organizer contact lists, private community records, raw archive exports, IP/geolocation fields, or unapproved artifacts."
    ],
    tags: ["community-systems", "web-systems", "implementation"],
    priority: 60
  },
  {
    id: "sunday-dinner-participation-infrastructure",
    title: "Sunday Dinner / 196 Participation Infrastructure",
    projectSlug: "196-sunday-dinner",
    category: "Community Systems",
    claim:
      "Jamie created Sunday Dinner / 196 Artists Residency as human-scale participation infrastructure through invitation, hosting, onboarding, documentation, and follow-through systems.",
    homepageClaim: "Repeatable hosting and continuity systems for gatherings and resident artists.",
    resumeClaim:
      "Created repeatable hosting, onboarding, documentation, and continuity systems for gatherings and resident artists.",
    status: "aggregate-supported",
    evidenceBasis: [
      "Approved resume framing",
      "Aggregate workbook review",
      "Private community records intentionally omitted"
    ],
    projectionSurfaces: ["homepage-proof-strip", "resume-page", "work-case-study"],
    constraints: [
      "Publish aggregate scale only when approved for the context.",
      "Do not publish names, attendance records, addresses, raw guest data, private messages, or unapproved images.",
      "Do not turn trust-building community work into spectacle."
    ],
    tags: ["community-systems", "documentation", "operations"],
    priority: 70
  },
  {
    id: "kc-town-hall-public-benefit",
    title: "KC Town Hall Public-Benefit Documentation",
    projectSlug: "kc-town-hall",
    category: "Public-Benefit Planning",
    claim:
      "Jamie co-led adaptive reuse planning and public-benefit documentation for a long-vacant historic building, supporting funding-process and stakeholder documentation.",
    resumeClaim:
      "Supported adaptive reuse planning and public-benefit documentation for a long-vacant historic building.",
    status: "needs-citation-confirmation",
    evidenceBasis: [
      "Approved resume framing",
      "Public-benefit materials and public-safe project summaries",
      "Private property, finance, and legal records intentionally omitted"
    ],
    projectionSurfaces: ["resume-page", "work-case-study"],
    constraints: [
      "Do not publish private financing, banking, legal, property, or stakeholder details.",
      "Do not imply funds were disbursed or redevelopment completed unless separately verified and approved.",
      "Keep exact funding and square-footage claims approval-gated on broad public surfaces."
    ],
    tags: ["documentation", "public-benefit", "implementation"],
    priority: 80
  },
  {
    id: "source-backed-team-memory-method",
    title: "Source-Backed Team Memory Method",
    category: "Lab / Method",
    claim:
      "Jamie has developed a source-backed team-memory method for preserving useful ideas, decisions, open questions, onboarding context, source-linked notes, owners, next steps, current status, and human-reviewed AI-assisted documentation without asking AI to become the authority.",
    resumeClaim:
      "Developed source-backed team-memory methods for decisions, open questions, onboarding context, source-linked notes, owners, and next steps.",
    technicalOperationsClaim:
      "Builds human-reviewed documentation workflows where AI can draft, but source grounding and human judgment remain authoritative.",
    status: "public-safe",
    evidenceBasis: [
      "Source-Backed Team Memory proposal",
      "Noting.us system spec",
      "FairRentNYC proof-of-practice",
      "Private source text intentionally omitted"
    ],
    projectionSurfaces: [
      "resume-page",
      "technical-operations-page",
      "lab-page",
      "contact-page"
    ],
    constraints: [
      "Frame as early method, consulting practice, lab, or proof-of-practice.",
      "Do not imply finished production SaaS, client deployment, production security review, broad connector integration, or an AI replacement for judgment.",
      "Do not turn private archives into a browsing surface."
    ],
    tags: ["source-backed-memory", "ai-governance", "documentation-systems"],
    priority: 90
  },
  {
    id: "ai-evals-professional-development",
    title: "AI Evals Professional Development",
    category: "Professional Development",
    claim:
      "Jamie completed AI Evals for Engineers & PMs through Maven in 2026, with practice in application-centric evaluations, error analysis, annotation workflows, traces, retrieval quality, and human-in-the-loop evaluation.",
    resumeClaim:
      "Completed AI evals training with practice in error analysis, retrieval quality, traces, annotation workflows, and human review.",
    status: "public-safe",
    evidenceBasis: [
      "Certificate image supplied by Jamie",
      "Professional-development record"
    ],
    projectionSurfaces: ["resume-page", "lab-page"],
    constraints: [
      "Use as professional development and method support.",
      "Do not imply employment, certification authority beyond completion, or production AI safety ownership."
    ],
    tags: ["ai-evals", "professional-development", "source-backed-memory"],
    priority: 100
  }
] satisfies z.input<typeof proofSchema>[];

export const proofBank = proofSchema.array().parse(proofBankInput).sort((a, b) => {
  return a.priority - b.priority;
});

export type ProofSurface = z.infer<typeof proofSurfaceSchema>;
export type ProofStatus = z.infer<typeof proofStatusSchema>;
export type ProofClaim = z.infer<typeof proofSchema>;

export function getProofsForSurface(surface: ProofSurface) {
  return proofBank.filter((proof) => proof.projectionSurfaces.includes(surface));
}

export function getProofById(id: string) {
  return proofBank.find((proof) => proof.id === id);
}

export function getProofsForProject(projectSlug: string) {
  return proofBank.filter((proof) => proof.projectSlug === projectSlug);
}

export const homepageProofs = getProofsForSurface("homepage-proof-strip");
export const resumePageProofs = getProofsForSurface("resume-page");
export const technicalOperationsProofs = getProofsForSurface("technical-operations-page");
export const labPageProofs = getProofsForSurface("lab-page");
