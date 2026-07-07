import { z } from "zod";

const proofApprovalStatusSchema = z.enum([
  "approved-public",
  "public-safe-summary",
  "softened-for-v1",
  "approval-required",
  "private-do-not-publish"
]);

const proofSupportLevelSchema = z.enum([
  "direct-public-artifact",
  "public-safe-summary",
  "private-source-omitted",
  "self-attested",
  "needs-review"
]);

const roleFitSchema = z.enum([
  "technical-operations",
  "product-operations",
  "implementation",
  "documentation-systems",
  "civic-technology",
  "source-backed-memory",
  "web-systems",
  "community-systems"
]);

const proofSurfaceSchema = z.enum([
  "homepage-proof-strip",
  "resume-page",
  "technical-operations-page",
  "work-case-study",
  "lab-page",
  "contact-page",
  "not-projected"
]);

const proofSchema = z.object({
  id: z.string(),
  title: z.string(),
  projectSlug: z.string().optional(),
  publicClaim: z.string(),
  safeShortWording: z.string(),
  exactMetric: z.string().optional(),
  approvalStatus: proofApprovalStatusSchema,
  supportLevel: proofSupportLevelSchema,
  sourceClass: z.string(),
  projectedOn: z.array(proofSurfaceSchema),
  roleFit: z.array(roleFitSchema),
  protectedBoundaries: z.array(z.string()),
  notes: z.string().optional(),
  publicSources: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  priority: z.number()
});

const proofBankInput = [
  {
    id: "technical-operations-role-fit-pattern",
    title: "Technical Operations Role-Fit Pattern",
    publicClaim:
      "Jamie builds operating structure for ambiguous public-facing technical work: planning rhythms, decision records, action trackers, onboarding materials, stakeholder updates, documentation systems, launch support, and durable handoffs.",
    safeShortWording: "Builds operating structure for ambiguous public-facing technical work.",
    approvalStatus: "approved-public",
    supportLevel: "public-safe-summary",
    sourceClass:
      "Portfolio pattern across HJE, FairRentNYC, CallNYC, WOWList, 196 / Sunday Dinner, KC Town Hall, and source-backed memory work.",
    projectedOn: ["homepage-proof-strip", "resume-page", "technical-operations-page"],
    roleFit: ["technical-operations", "product-operations", "implementation", "documentation-systems"],
    protectedBoundaries: [
      "Do not imply one continuous formal employment role across all years.",
      "Do not publish private client, community, coalition, or collaborator records."
    ],
    priority: 10
  },
  {
    id: "cross-project-operating-structure",
    title: "Operating Structure Across Public-Facing Work",
    publicClaim:
      "Jamie has 14+ years creating operating structure between stakeholders, product, documentation, implementation, and public-facing systems.",
    safeShortWording: "14+ years creating operating structure.",
    exactMetric: "14+ years",
    approvalStatus: "approved-public",
    supportLevel: "public-safe-summary",
    sourceClass: "Approved resume chronology and public-safe portfolio project history.",
    projectedOn: ["homepage-proof-strip", "resume-page"],
    roleFit: ["technical-operations", "product-operations", "implementation", "documentation-systems"],
    protectedBoundaries: [
      "Keep the claim focused on operating structure and implementation.",
      "Do not imply formal public-sector employment where the work was coalition, consulting, or independent practice."
    ],
    priority: 20
  },
  {
    id: "hje-ecommerce-modernization",
    title: "Harry J. Epstein E-commerce Modernization",
    projectSlug: "harry-j-epstein",
    publicClaim:
      "Jamie led web, e-commerce, marketing, analytics, and operations improvements for Harry J. Epstein Company, contributing to online growth while helping an 80+ year-old legacy industrial business adapt to e-commerce.",
    safeShortWording: "Contributed to online growth for a legacy e-commerce business.",
    approvalStatus: "softened-for-v1",
    supportLevel: "private-source-omitted",
    sourceClass:
      "Approved resume, public website context, public reporting/source notes, and private business materials intentionally omitted.",
    publicSources: [
      { label: "Harry J. Epstein Company", url: "https://www.harryepstein.com/" }
    ],
    projectedOn: [
      "homepage-proof-strip",
      "resume-page",
      "technical-operations-page",
      "work-case-study"
    ],
    roleFit: ["technical-operations", "product-operations", "implementation", "web-systems"],
    protectedBoundaries: [
      "Use contribution language, not sole-causality language.",
      "Do not publish private dashboards, customer data, revenue breakdowns, vendor terms, credentials, or internal business rules.",
      "Exact revenue wording requires Jamie approval for each prominent public context."
    ],
    priority: 30
  },
  {
    id: "fairrent-campaign-memory",
    title: "FairRentNYC Campaign Memory Infrastructure",
    projectSlug: "fair-rent-nyc",
    publicClaim:
      "Jamie built and stewarded public-safe campaign-memory infrastructure for Commercial Rent Stabilization work: running minutes, decision records, action trackers, source maps, legal and policy question logs, consent-aware follow-up protocols, and public/internal boundaries.",
    safeShortWording: "Built and stewarded civic campaign-memory infrastructure.",
    approvalStatus: "softened-for-v1",
    supportLevel: "private-source-omitted",
    sourceClass:
      "Public-safe summaries of running minutes, policy/data briefs, public campaign context, and private coalition records intentionally omitted.",
    publicSources: [{ label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }],
    projectedOn: [
      "homepage-proof-strip",
      "resume-page",
      "technical-operations-page",
      "work-case-study",
      "lab-page"
    ],
    roleFit: ["technical-operations", "product-operations", "documentation-systems", "civic-technology", "source-backed-memory"],
    protectedBoundaries: [
      "Use collective-work language: helped structure, built and stewarded, supported, translated.",
      "Do not publish raw coalition notes, legal-review materials, stakeholder lists, private emails, raw strategy context, or unapproved quotes.",
      "Do not present policy analysis as legal advice."
    ],
    priority: 40
  },
  {
    id: "nyc-artist-coalition-civic-systems-role",
    title: "NYC Artist Coalition Civic Systems Role",
    projectSlug: "fair-rent-nyc",
    publicClaim:
      "Jamie is a co-founder of NYC Artist Coalition and works as a civic systems, coalition operations, and policy communications lead, helping turn cultural-space advocacy into documentation, public guidance, source-backed campaign memory, and follow-through systems.",
    safeShortWording: "Co-founder; civic systems, coalition operations, and policy communications lead.",
    approvalStatus: "approved-public",
    supportLevel: "public-safe-summary",
    sourceClass:
      "Approved resume, Jamie-confirmed role framing, NYC Artist Coalition public site, and FairRentNYC public campaign surfaces.",
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }
    ],
    projectedOn: ["resume-page", "technical-operations-page", "work-case-study"],
    roleFit: ["technical-operations", "product-operations", "documentation-systems", "civic-technology", "source-backed-memory"],
    protectedBoundaries: [
      "Do not frame Jamie as the sole leader of NYC Artist Coalition or owner of collective coalition outcomes.",
      "Do not imply legal counsel, official agency role, or sole authorship of legislation.",
      "Do not publish private venue, lease, landlord, signup, fieldwork, or contact details."
    ],
    priority: 50
  },
  {
    id: "nyc-artist-coalition-public-record",
    title: "NYC Artist Coalition Public Civic Record",
    projectSlug: "fair-rent-nyc",
    publicClaim:
      "NYC Artist Coalition has participated in public coalition work around informal and affordable community spaces, Cabaret Law repeal and Let NYC Dance, nightlife enforcement transparency and Talks Not Raids, COVID-era relief coordination, commercial lease protections, and FairRentNYC / Commercial Rent Stabilization.",
    safeShortWording: "Helped build public advocacy infrastructure for cultural-space stability.",
    approvalStatus: "public-safe-summary",
    supportLevel: "direct-public-artifact",
    sourceClass:
      "NYC Artist Coalition, Let NYC Dance, Talks Not Raids, FairRentNYC, and related public campaign pages.",
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }
    ],
    projectedOn: ["work-case-study"],
    roleFit: ["civic-technology", "documentation-systems", "community-systems"],
    protectedBoundaries: [
      "Use collective-work language: participated in, contributed to, supported, helped build public advocacy infrastructure.",
      "Do not claim NYC Artist Coalition alone repealed the Cabaret Law, created the Office of Nightlife, passed a bill, or secured enforcement changes.",
      "Do not publish private coalition notes, private stakeholder names, private emails, testimony prep, or unapproved quotes."
    ],
    priority: 60
  },
  {
    id: "fairrent-current-work",
    title: "FairRentNYC Current Work",
    projectSlug: "fair-rent-nyc",
    publicClaim:
      "Current public-safe work centers on FairRentNYC / Commercial Rent Stabilization, policy-neutral public-data framing for commercial rent and vacancy questions, public reference materials, and coalition-memory systems that separate known public material, open questions, and protected context.",
    safeShortWording: "Current work: Commercial Rent Stabilization, public-data framing, and coalition memory.",
    approvalStatus: "public-safe-summary",
    supportLevel: "private-source-omitted",
    sourceClass:
      "FairRentNYC public reference materials plus public-safe policy/data and campaign-memory summaries.",
    publicSources: [{ label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }],
    projectedOn: ["technical-operations-page", "work-case-study"],
    roleFit: ["technical-operations", "product-operations", "documentation-systems", "civic-technology", "source-backed-memory"],
    protectedBoundaries: [
      "Do not imply agency adoption of a data proposal unless separately confirmed.",
      "Do not publish live strategy, private records, raw notes, unreviewed stakeholder materials, or legal-review material.",
      "Review date-specific bill-status language before publication."
    ],
    priority: 70
  },
  {
    id: "callnyc-open-data-guidance",
    title: "CallNYC Civic Data Prototype",
    projectSlug: "callnyc",
    publicClaim:
      "Jamie built CallNYC.org after a New York City Council civic-data hackathon, translating constituent-services open data into resident-facing find help / next steps guidance.",
    safeShortWording: "Translated civic open data into resident-facing guidance.",
    approvalStatus: "approved-public",
    supportLevel: "public-safe-summary",
    sourceClass: "Approved resume, archived project context, and public open-data context.",
    projectedOn: ["resume-page", "technical-operations-page", "work-case-study"],
    roleFit: ["technical-operations", "implementation", "civic-technology", "web-systems"],
    protectedBoundaries: [
      "Always identify the work as archived and unofficial.",
      "Do not imply current city-service status, legal guidance, emergency guidance, or official City Council affiliation.",
      "Do not publish the Politico citation unless the exact link is approved for the page."
    ],
    priority: 80
  },
  {
    id: "wowlist-community-platform",
    title: "WOWList Community Platform",
    projectSlug: "wowlist",
    publicClaim:
      "Jamie co-built WOWList.org with Richard Caceres, a Python / Django and Ember.js community-calendar platform used by DIY arts and music organizers across multiple city ecosystems.",
    safeShortWording: "Co-built community web systems across multiple city ecosystems.",
    approvalStatus: "softened-for-v1",
    supportLevel: "private-source-omitted",
    sourceClass: "Public-safe aggregate archive summaries and historical project context.",
    projectedOn: ["homepage-proof-strip", "resume-page", "work-case-study"],
    roleFit: ["product-operations", "implementation", "web-systems", "community-systems"],
    protectedBoundaries: [
      "Use aggregate adoption claims only.",
      "Avoid claiming official city chapters; use city ecosystems or city scenes.",
      "Do not publish user records, organizer contact lists, private community records, raw archive exports, IP/geolocation fields, or unapproved artifacts."
    ],
    priority: 90
  },
  {
    id: "sunday-dinner-participation-infrastructure",
    title: "Sunday Dinner / 196 Participation Infrastructure",
    projectSlug: "196-sunday-dinner",
    publicClaim:
      "Jamie created Sunday Dinner / 196 Artists Residency as human-scale participation infrastructure through invitation, hosting, onboarding, documentation, and follow-through systems.",
    safeShortWording: "Created repeatable hosting and continuity systems for gatherings and artists.",
    approvalStatus: "softened-for-v1",
    supportLevel: "private-source-omitted",
    sourceClass: "Approved resume, aggregate workbook review, and private community records intentionally omitted.",
    projectedOn: ["homepage-proof-strip", "resume-page", "work-case-study"],
    roleFit: ["technical-operations", "documentation-systems", "implementation", "community-systems"],
    protectedBoundaries: [
      "Publish aggregate scale only when approved for the context.",
      "Do not publish names, attendance records, addresses, raw guest data, private messages, or unapproved images.",
      "Do not turn trust-building community work into spectacle."
    ],
    priority: 100
  },
  {
    id: "kc-town-hall-public-benefit",
    title: "KC Town Hall Adaptive Reuse Planning",
    projectSlug: "kc-town-hall",
    publicClaim:
      "Jamie co-led adaptive reuse planning and public-benefit documentation for a long-vacant historic building, supporting funding-process and stakeholder documentation.",
    safeShortWording: "Supported adaptive reuse planning and public-benefit documentation.",
    approvalStatus: "softened-for-v1",
    supportLevel: "private-source-omitted",
    sourceClass: "Approved resume, public-benefit materials, and public-safe project summaries.",
    projectedOn: ["resume-page", "work-case-study"],
    roleFit: ["technical-operations", "implementation", "documentation-systems"],
    protectedBoundaries: [
      "Do not publish private financing, banking, legal, property, or stakeholder details.",
      "Do not imply funds were disbursed or redevelopment completed unless separately verified and approved.",
      "Keep exact funding and square-footage claims approval-gated on broad public surfaces."
    ],
    priority: 110
  },
  {
    id: "source-backed-team-memory-method",
    title: "Source-Backed Team Memory Method",
    publicClaim:
      "Jamie has developed a source-backed team-memory method for preserving useful ideas, decisions, open questions, onboarding context, source-linked notes, owners, next steps, current status, and human-reviewed AI-assisted documentation without asking AI to become the authority.",
    safeShortWording: "Source-backed team memory with human review, governance, and privacy boundaries.",
    approvalStatus: "public-safe-summary",
    supportLevel: "private-source-omitted",
    sourceClass:
      "Source-Backed Team Memory proposal, Noting.us system spec, sprint materials, and FairRentNYC proof-of-practice, summarized without private source text.",
    projectedOn: ["resume-page", "technical-operations-page", "lab-page", "contact-page"],
    roleFit: ["technical-operations", "product-operations", "documentation-systems", "source-backed-memory"],
    protectedBoundaries: [
      "Frame as early method, consulting practice, lab, or proof-of-practice.",
      "Do not imply finished production SaaS, client deployment, production security review, broad connector integration, or an AI replacement for judgment.",
      "Do not turn private archives into a browsing surface."
    ],
    priority: 120
  },
  {
    id: "ai-evals-professional-development",
    title: "AI Evals for Engineers & PMs",
    publicClaim:
      "Jamie completed AI Evals for Engineers & PMs through Maven in 2026, with practice in application-centric evaluations, error analysis, annotation workflows, traces, retrieval quality, and human-in-the-loop evaluation.",
    safeShortWording: "Completed AI evals training with practice in error analysis and human review.",
    approvalStatus: "approved-public",
    supportLevel: "direct-public-artifact",
    sourceClass: "Certificate image supplied by Jamie and approved resume.",
    projectedOn: ["resume-page", "lab-page"],
    roleFit: ["source-backed-memory", "technical-operations", "documentation-systems"],
    protectedBoundaries: [
      "Use this as professional development and method support.",
      "Do not imply employment, certification authority beyond completion, or production AI safety ownership."
    ],
    priority: 130
  },
  {
    id: "hje-2x-revenue-growth-approval-gate",
    title: "HJE Exact Revenue Metric Approval Gate",
    projectSlug: "harry-j-epstein",
    publicClaim:
      "Candidate exact metric: Jamie contributed to 2x revenue growth while supporting e-commerce, marketing, analytics, content, and operations improvements.",
    safeShortWording: "Exact revenue metric requires Jamie approval before public projection.",
    exactMetric: "2x revenue growth",
    approvalStatus: "approval-required",
    supportLevel: "private-source-omitted",
    sourceClass: "Approved resume wording and private business materials omitted from the public repo.",
    projectedOn: ["not-projected"],
    roleFit: ["technical-operations", "product-operations", "implementation", "web-systems"],
    protectedBoundaries: [
      "Do not publish internal dashboards, revenue breakdowns, customer data, vendor terms, or business rules.",
      "Do not imply sole causality."
    ],
    priority: 210
  },
  {
    id: "hje-institutional-voice-web-translation",
    title: "HJE Institutional Voice And Web Translation",
    projectSlug: "harry-j-epstein",
    publicClaim:
      "Jamie translated in-store inventory knowledge, customer language, dealer-aware practices, and the company's distinctive public voice into maintainable web and e-commerce workflows.",
    safeShortWording: "Translated legacy operating knowledge into maintainable public-facing web workflows.",
    approvalStatus: "public-safe-summary",
    supportLevel: "private-source-omitted",
    sourceClass: "Public website context and private business practice summarized without sensitive details.",
    projectedOn: ["work-case-study", "technical-operations-page"],
    roleFit: ["technical-operations", "product-operations", "implementation", "web-systems"],
    protectedBoundaries: [
      "Do not publish internal pricing rules, vendor terms, customer data, or private operational procedures.",
      "Keep the claim about translation and workflows, not proprietary business logic."
    ],
    priority: 215
  },
  {
    id: "fairrent-page-count-approval-gate",
    title: "FairRentNYC Exact Page Count Approval Gate",
    projectSlug: "fair-rent-nyc",
    publicClaim:
      "Candidate exact metric: campaign-memory materials include 30+ pages and a 34-page running-minutes record.",
    safeShortWording: "Exact campaign-memory page counts require approval before public projection.",
    exactMetric: "30+ pages; 34-page running-minutes record",
    approvalStatus: "approval-required",
    supportLevel: "private-source-omitted",
    sourceClass: "Public-safe running-minutes summary; raw coalition documents omitted.",
    projectedOn: ["not-projected"],
    roleFit: ["technical-operations", "documentation-systems", "civic-technology", "source-backed-memory"],
    protectedBoundaries: [
      "Do not publish raw meeting materials, legal-review notes, stakeholder lists, or private strategy context."
    ],
    priority: 220
  },
  {
    id: "nyc-artist-coalition-public-campaign-web",
    title: "NYC Artist Coalition Public Campaign Web Infrastructure",
    projectSlug: "fair-rent-nyc",
    publicClaim:
      "Jamie built public web surfaces for NYC Artist Coalition and related campaigns, including coalition, FairRentNYC, Talks Not Raids, and Let NYC Dance public-facing materials.",
    safeShortWording: "Built public campaign web surfaces for NYC Artist Coalition advocacy.",
    approvalStatus: "public-safe-summary",
    supportLevel: "direct-public-artifact",
    sourceClass: "Public campaign websites and Jamie-confirmed authorship context.",
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" }
    ],
    projectedOn: ["work-case-study", "technical-operations-page"],
    roleFit: ["technical-operations", "implementation", "documentation-systems", "civic-technology", "web-systems"],
    protectedBoundaries: [
      "Website authorship is Jamie's direct contribution; campaign outcomes remain collective.",
      "Do not publish CMS/admin details, private strategy, private contacts, or partner decision context."
    ],
    priority: 225
  },
  {
    id: "wowlist-aggregate-scale-approval-gate",
    title: "WOWList Aggregate Scale Approval Gate",
    projectSlug: "wowlist",
    publicClaim:
      "Candidate exact aggregate metric: public-safe archive summaries support roughly 35 city ecosystems and larger rounded aggregate counts.",
    safeShortWording: "WOWList exact aggregate scale requires approval before public projection.",
    exactMetric: "roughly 35 city ecosystems; archive summaries include larger aggregate counts",
    approvalStatus: "approval-required",
    supportLevel: "private-source-omitted",
    sourceClass: "Public-safe aggregate archive report; raw user and organizer records omitted.",
    projectedOn: ["not-projected"],
    roleFit: ["product-operations", "implementation", "web-systems", "community-systems"],
    protectedBoundaries: [
      "Do not publish user records, organizer contact lists, raw archive exports, or official chapter claims."
    ],
    priority: 230
  },
  {
    id: "sunday-dinner-exact-counts-approval-gate",
    title: "Sunday Dinner / 196 Exact Counts Approval Gate",
    projectSlug: "196-sunday-dinner",
    publicClaim:
      "Candidate exact aggregate metric: Sunday Dinner / 196 records support 300+ documented gatherings and 20+ resident artists.",
    safeShortWording: "Exact gathering and resident-artist counts require approval before public projection.",
    exactMetric: "300+ documented gatherings; 20+ resident artists",
    approvalStatus: "approval-required",
    supportLevel: "private-source-omitted",
    sourceClass: "Approved resume and aggregate workbook review; private community records omitted.",
    projectedOn: ["not-projected"],
    roleFit: ["technical-operations", "documentation-systems", "implementation", "community-systems"],
    protectedBoundaries: [
      "Do not publish guest lists, addresses, attendance records, private messages, named participants, or unapproved images."
    ],
    priority: 240
  },
  {
    id: "kc-town-hall-exact-metrics-approval-gate",
    title: "KC Town Hall Exact Metrics Approval Gate",
    projectSlug: "kc-town-hall",
    publicClaim:
      "Candidate exact metric: KC Town Hall work involved an approximately 6,500 sq. ft. building, four commercial spaces, three homes, and a $490,539 public funding recommendation.",
    safeShortWording: "Exact KC Town Hall metrics require approval before public projection.",
    exactMetric:
      "approximately 6,500 sq. ft.; four commercial spaces and three homes; $490,539 public funding recommendation",
    approvalStatus: "approval-required",
    supportLevel: "private-source-omitted",
    sourceClass: "Approved resume and public-safe project packet; private property, finance, and legal records omitted.",
    projectedOn: ["not-projected"],
    roleFit: ["technical-operations", "implementation", "documentation-systems"],
    protectedBoundaries: [
      "Do not publish private financing, legal, property, banking, or stakeholder details.",
      "Do not imply funds were disbursed or redevelopment completed unless separately verified."
    ],
    priority: 250
  },
  {
    id: "source-backed-memory-eval-governance",
    title: "Source-Backed Memory Evaluation And Governance Frame",
    publicClaim:
      "Jamie's source-backed memory method includes checks for source grounding, source coverage, attribution, decision versus discussion, open-question preservation, false-consensus risk, privacy scope, and onboarding usefulness.",
    safeShortWording: "Human-reviewed memory workflows with source-grounding, attribution, privacy, and decision checks.",
    approvalStatus: "public-safe-summary",
    supportLevel: "private-source-omitted",
    sourceClass: "AI evals professional development and source-backed memory method materials summarized without private source text.",
    projectedOn: ["technical-operations-page", "lab-page"],
    roleFit: ["technical-operations", "product-operations", "documentation-systems", "source-backed-memory"],
    protectedBoundaries: [
      "Do not imply automated trust, legal compliance status, production security review, or autonomous AI authority.",
      "Do not publish private source bundles or bot outputs that could be mistaken for human statements."
    ],
    priority: 260
  }
] satisfies z.input<typeof proofSchema>[];

export const proofBank = proofSchema.array().parse(proofBankInput).sort((a, b) => {
  return a.priority - b.priority;
});

export type Proof = (typeof proofBank)[number];
export type ProofSurface = z.infer<typeof proofSurfaceSchema>;
export type RoleFit = z.infer<typeof roleFitSchema>;
export type ProofApprovalStatus = z.infer<typeof proofApprovalStatusSchema>;
export type ProofSupportLevel = z.infer<typeof proofSupportLevelSchema>;

export function getProofById(id: string) {
  return proofBank.find((proof) => proof.id === id);
}

export function getProofsForSurface(surface: ProofSurface) {
  return proofBank.filter((proof) => proof.projectedOn.includes(surface));
}

export function getProofsForRoleFit(roleFit: RoleFit) {
  return proofBank.filter((proof) => proof.roleFit.includes(roleFit));
}

export const homepageProofs = getProofsForSurface("homepage-proof-strip");
export const resumePageProofs = getProofsForSurface("resume-page");
export const technicalOperationsProofs = getProofsForSurface("technical-operations-page");
export const labPageProofs = getProofsForSurface("lab-page");
