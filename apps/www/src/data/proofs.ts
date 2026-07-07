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
  "needs-citation-confirmation"
]);

const proofSchema = z.object({
  id: z.string(),
  title: z.string(),
  projectSlug: z.string().optional(),
  category: z.string(),
  claim: z.string(),
  homepageClaim: z.string().optional(),
  resumeClaim: z.string().optional(),
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
    category: "Cross-project role proof",
    claim:
      "Jamie has 14+ years building operating structure between stakeholders, product, documentation, implementation, and public-facing systems.",
    homepageClaim: "14+ years building operating structure",
    resumeClaim:
      "14+ years building the operating layer between stakeholders, product, documentation, implementation, and public-facing systems.",
    status: "resume-approved",
    evidenceBasis: [
      "Approved public resume PDF dated 2026-06-11.",
      "Current portfolio work set across small-business, civic, community, and knowledge-system projects."
    ],
    projectionSurfaces: ["homepage-proof-strip", "resume-page"],
    constraints: [
      "Keep the claim focused on operating structure and implementation, not broad executive ownership.",
      "Do not imply formal public-sector employment where the work was coalition, consulting, or independent practice."
    ],
    tags: ["technical project management", "product operations", "implementation"],
    priority: 10
  },
  {
    id: "hje-ecommerce-growth",
    title: "Harry J. Epstein E-commerce Modernization",
    projectSlug: "harry-j-epstein",
    category: "Small-business systems proof",
    claim:
      "Jamie led web, e-commerce, marketing, analytics, and operations improvements for Harry J. Epstein Company, contributing to 2x revenue growth while helping an 80+ year-old legacy industrial business adapt to e-commerce.",
    homepageClaim: "Contributed to online growth for a legacy e-commerce business",
    resumeClaim:
      "Led web, e-commerce, marketing, analytics, and operations improvements for Harry J. Epstein Company, contributing to 2x revenue growth.",
    status: "resume-approved",
    evidenceBasis: [
      "Approved public resume PDF dated 2026-06-11.",
      "Portfolio-safe HJE narrative materials and public-source review support the e-commerce, catalog, marketing, analytics, and workflow scope."
    ],
    projectionSurfaces: [
      "homepage-proof-strip",
      "resume-page",
      "technical-operations-page",
      "work-case-study"
    ],
    constraints: [
      "Use contribution language on broad public pages unless Jamie approves a stronger case-study treatment.",
      "Do not publish dashboards, revenue breakdowns, customer data, vendor terms, or internal operating details."
    ],
    tags: ["e-commerce", "analytics", "workflow mapping", "legacy systems"],
    priority: 20
  },
  {
    id: "fairrent-campaign-memory",
    title: "FairRentNYC Campaign Memory Infrastructure",
    projectSlug: "fair-rent-nyc",
    category: "Civic documentation proof",
    claim:
      "Jamie built and stewarded public-safe campaign-memory infrastructure for Commercial Rent Stabilization work: running minutes, decision records, action trackers, source maps, legal and policy question logs, consent-aware follow-up protocols, and public/internal boundaries.",
    homepageClaim: "Built and stewarded civic campaign-memory infrastructure",
    resumeClaim:
      "Built and stewarded civic campaign-memory infrastructure across source maps, decision records, action items, policy questions, stakeholder follow-up, and public/internal boundaries.",
    status: "public-safe",
    evidenceBasis: [
      "Public-safe running minutes and policy/data briefs reviewed for claim scope.",
      "Current case-study copy uses collective-work language and omits raw notes, private strategy, and unapproved quotes."
    ],
    projectionSurfaces: [
      "homepage-proof-strip",
      "resume-page",
      "technical-operations-page",
      "work-case-study"
    ],
    constraints: [
      "Use collective-work language: helped structure, built and stewarded, supported, translated.",
      "Do not publish raw coalition notes, legal-review materials, stakeholder lists, private emails, or unapproved quotes."
    ],
    tags: ["civic technology", "source maps", "decision records", "coalition operations"],
    priority: 30
  },
  {
    id: "nyc-artist-coalition-civic-systems-role",
    title: "NYC Artist Coalition Civic Systems Role",
    projectSlug: "fair-rent-nyc",
    category: "Civic role proof",
    claim:
      "Jamie is a co-founder of NYC Artist Coalition and works as a civic systems, coalition operations, and policy communications lead, helping turn cultural-space advocacy into documentation, public guidance, source-backed campaign memory, and follow-through systems.",
    resumeClaim:
      "Co-founder of NYC Artist Coalition; civic systems, coalition operations, and policy communications lead for cultural-space advocacy, public guidance, campaign memory, and follow-through systems.",
    status: "resume-approved",
    evidenceBasis: [
      "Approved public resume PDF dated 2026-06-11.",
      "Public NYC Artist Coalition and FairRentNYC campaign surfaces support the coalition and issue-area context.",
      "Public-safe portfolio materials support the civic systems, documentation, and policy communications framing."
    ],
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }
    ],
    projectionSurfaces: ["resume-page", "technical-operations-page", "work-case-study"],
    constraints: [
      "Do not frame Jamie as the sole leader of NYC Artist Coalition or owner of collective coalition outcomes.",
      "Do not imply legal counsel, official agency role, or sole authorship of legislation.",
      "Use operating, documentation, civic systems, campaign memory, and policy communications language."
    ],
    tags: ["NYC Artist Coalition", "coalition operations", "policy communications", "civic systems"],
    priority: 31
  },
  {
    id: "nyc-artist-coalition-public-record",
    title: "NYC Artist Coalition Public Civic Record",
    projectSlug: "fair-rent-nyc",
    category: "Coalition accomplishment proof",
    claim:
      "NYC Artist Coalition has participated in public coalition work around informal and affordable community spaces, Cabaret Law repeal and Let NYC Dance, nightlife enforcement transparency and Talks Not Raids, COVID-era relief coordination, commercial lease protections, and FairRentNYC / Commercial Rent Stabilization.",
    status: "public-safe",
    evidenceBasis: [
      "NYC Artist Coalition public site and campaign pages document community-space, commercial rent, MARCH, COVID relief, and lease-protection advocacy.",
      "Let NYC Dance, Talks Not Raids, and FairRentNYC public campaign sites provide public-safe source anchors.",
      "This claim describes collective civic participation and public advocacy surfaces, not sole causation."
    ],
    publicSources: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }
    ],
    projectionSurfaces: ["work-case-study"],
    constraints: [
      "Use collective-work language: participated in, contributed to, supported, helped build public advocacy infrastructure.",
      "Do not claim NYC Artist Coalition alone repealed the Cabaret Law, created the Office of Nightlife, passed a bill, or secured enforcement changes unless a public source supports that exact claim.",
      "Do not publish private coalition notes, private stakeholder names, private emails, raw testimony prep, or unapproved quotes."
    ],
    tags: ["NYC Artist Coalition", "public advocacy", "cultural spaces", "commercial rent"],
    priority: 32
  },
  {
    id: "fairrent-current-work",
    title: "FairRentNYC Current Work",
    projectSlug: "fair-rent-nyc",
    category: "Current work proof",
    claim:
      "The current public-safe work centers on FairRentNYC / Commercial Rent Stabilization, a policy-neutral public-data baseline for commercial rent and vacancy questions, public reference materials, and coalition-memory systems that separate known public material, open questions, and protected context.",
    status: "public-safe",
    evidenceBasis: [
      "FairRentNYC public reference library and campaign pages support the Commercial Rent Stabilization framing.",
      "Public-safe policy/data briefs and running-minutes summaries reviewed for source-backed memory, public-data framing, and protected-context boundaries.",
      "Current website copy treats this as active coalition-support infrastructure, not a published archive of private materials."
    ],
    publicSources: [{ label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" }],
    projectionSurfaces: ["technical-operations-page", "work-case-study"],
    constraints: [
      "Do not imply that any agency has adopted the data proposal unless separately confirmed.",
      "Do not present legal or policy analysis as legal advice.",
      "Keep live strategy, private records, raw notes, and unreviewed stakeholder materials out of public pages."
    ],
    tags: ["FairRentNYC", "Commercial Rent Stabilization", "public data", "source-backed memory"],
    priority: 33
  },
  {
    id: "fairrent-policy-neutral-data",
    title: "Commercial Rent Public-Data Framing",
    projectSlug: "fair-rent-nyc",
    category: "Open-data proof",
    claim:
      "Jamie scoped policy-neutral public-data framing for commercial rent, vacancy, lease-cost indicators, and a future Commercial Rent Guidelines Board evidence base.",
    resumeClaim:
      "Scoped open-data and policy-neutral evidence framing for commercial rent, vacancy, lease-cost indicators, and a future Commercial Rent Guidelines Board baseline.",
    status: "public-safe",
    evidenceBasis: [
      "Comptroller-facing and Open Data Week policy/data briefs reviewed for public-safe scope.",
      "Claims describe data framing and scoping, not official agency adoption."
    ],
    projectionSurfaces: ["resume-page", "work-case-study", "technical-operations-page"],
    constraints: [
      "Do not imply the Comptroller, Council, or any agency adopted the proposal unless separately confirmed.",
      "Do not present policy analysis as legal advice."
    ],
    tags: ["open data", "policy framing", "public evidence", "commercial rent"],
    priority: 40
  },
  {
    id: "wowlist-community-platform",
    title: "WOWList Community Platform",
    projectSlug: "wowlist",
    category: "Community platform proof",
    claim:
      "Jamie co-built WOWList.org with Richard Caceres, a Python / Django and Ember.js community-calendar platform used by DIY arts and music organizers across roughly 35 city ecosystems.",
    homepageClaim: "Co-built community web systems across multiple city ecosystems",
    resumeClaim:
      "Co-built WOWList.org with Richard Caceres, a Python / Django and Ember.js community-calendar platform used across roughly 35 city ecosystems.",
    status: "aggregate-supported",
    evidenceBasis: [
      "WOWList archive report supports aggregate scale, platform architecture, and product features.",
      "Public-safe transcript and OCR review support community-calendar, interest-following, email digest, Chicago, Seattle, and organizer-use claims."
    ],
    projectionSurfaces: ["homepage-proof-strip", "resume-page", "work-case-study"],
    constraints: [
      "Use aggregate adoption claims only; do not publish user records, organizer lists, private community records, or full archive extracts.",
      "Avoid claiming official city chapters; use city ecosystems or city scenes."
    ],
    tags: ["Django", "Ember.js", "community platform", "event workflows"],
    priority: 50
  },
  {
    id: "callnyc-open-data-guidance",
    title: "CallNYC Civic Data Prototype",
    projectSlug: "callnyc",
    category: "Civic technology proof",
    claim:
      "Jamie built CallNYC.org after a New York City Council civic-data hackathon, translating constituent-services open data into resident-facing find help / next steps guidance.",
    resumeClaim:
      "Built CallNYC.org after a New York City Council civic-data hackathon, translating constituent-services open data into resident-facing find help / next steps guidance.",
    status: "needs-citation-confirmation",
    evidenceBasis: [
      "Approved public resume PDF dated 2026-06-11.",
      "Current case-study copy treats the project as an archived prototype and omits the press link until the exact citation is confirmed."
    ],
    projectionSurfaces: ["resume-page", "technical-operations-page", "work-case-study"],
    constraints: [
      "Keep archived, unofficial, non-current-service status visible.",
      "Do not publish the Politico New York citation until the exact link is confirmed."
    ],
    tags: ["civic technology", "open data", "resident guidance", "prototype"],
    priority: 60
  },
  {
    id: "sunday-dinner-participation-infrastructure",
    title: "Sunday Dinner / 196 Participation Infrastructure",
    projectSlug: "196-sunday-dinner",
    category: "Community operations proof",
    claim:
      "Jamie created Sunday Dinner / 196 Artists Residency as human-scale participation infrastructure, documenting 300+ gatherings and supporting 20+ resident artists through invitation, hosting, onboarding, documentation, and follow-through systems.",
    homepageClaim: "Created repeatable hosting and continuity systems for gatherings and artists",
    resumeClaim:
      "Created Sunday Dinner / 196 Artists Residency as participation infrastructure, documenting 300+ gatherings and supporting 20+ resident artists.",
    status: "resume-approved",
    evidenceBasis: [
      "Approved public resume PDF dated 2026-06-11.",
      "Aggregate workbook structure was reviewed without exposing names, addresses, attendance records, or private community details."
    ],
    projectionSurfaces: ["homepage-proof-strip", "resume-page", "work-case-study"],
    constraints: [
      "Publish aggregate scale only; do not publish names, attendance records, addresses, raw guest data, or unapproved images.",
      "Keep the public page summary-only unless Jamie approves specific artifacts."
    ],
    tags: ["community operations", "onboarding", "hospitality", "continuity"],
    priority: 70
  },
  {
    id: "kc-town-hall-public-benefit",
    title: "KC Town Hall Adaptive Reuse Planning",
    projectSlug: "kc-town-hall",
    category: "Built-environment project proof",
    claim:
      "Jamie co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant approximately 6,500 sq. ft. historic building into four commercial spaces and three homes, securing a $490,539 public funding recommendation.",
    resumeClaim:
      "Co-led adaptive reuse planning and public-benefit documentation for a long-vacant historic building, including a $490,539 public funding recommendation.",
    status: "resume-approved",
    evidenceBasis: [
      "Approved public resume PDF dated 2026-06-11.",
      "Public-benefit and support-letter materials reviewed for public-safe aggregate scope."
    ],
    projectionSurfaces: ["resume-page", "work-case-study"],
    constraints: [
      "Do not publish private financing, banking, property, legal, or stakeholder details.",
      "Keep project status current only when separately confirmed."
    ],
    tags: ["adaptive reuse", "public benefit", "stakeholder documentation", "funding support"],
    priority: 80
  },
  {
    id: "source-backed-team-memory-method",
    title: "Source-Backed Team Memory Method",
    category: "Knowledge-system method proof",
    claim:
      "Jamie has developed a source-backed team-memory method for preserving ideas, decisions, open questions, onboarding context, source material, and human-reviewed AI-assisted documentation without asking AI to become the authority.",
    resumeClaim:
      "Developed a source-backed team-memory method for decision lineage, onboarding context, source material, review workflows, and human-correctable AI-assisted documentation.",
    status: "public-safe",
    evidenceBasis: [
      "Source-Backed Team Memory proposal and sprint materials reviewed for public-safe method language.",
      "FairRentNYC / Commercial Rent Stabilization memory work provides the clearest current proof-of-practice."
    ],
    projectionSurfaces: ["resume-page", "technical-operations-page", "lab-page", "contact-page"],
    constraints: [
      "Frame as method, consulting practice, lab, or proof-of-practice; do not imply finished production SaaS.",
      "Do not imply access to any company systems or materials."
    ],
    tags: ["source-backed memory", "AI-assisted documentation", "human review", "onboarding"],
    priority: 90
  },
  {
    id: "ai-evals-professional-development",
    title: "AI Evals for Engineers & PMs",
    category: "Professional development proof",
    claim:
      "Jamie completed AI Evals for Engineers & PMs through Maven in 2026, covering application-centric evaluations, error analysis, annotation workflows, traces, large-language-model failure modes, retrieval quality, and human-in-the-loop evaluation practice.",
    resumeClaim:
      "Completed AI Evals for Engineers & PMs, with practice in annotation workflows, traces, retrieval quality, and human review.",
    status: "resume-approved",
    evidenceBasis: [
      "Approved public resume PDF dated 2026-06-11.",
      "Certificate image supplied for portfolio context."
    ],
    projectionSurfaces: ["resume-page", "lab-page"],
    constraints: [
      "Use this as training and method support; do not imply employment, certification authority beyond completion, or production AI safety ownership.",
      "Spell out large language model if the acronym would make the copy less legible."
    ],
    tags: ["AI evaluation", "error analysis", "human review", "retrieval quality"],
    priority: 100
  }
] satisfies z.input<typeof proofSchema>[];

export const proofBank = proofSchema.array().parse(proofBankInput).sort((a, b) => {
  return a.priority - b.priority;
});

export type ProofClaim = (typeof proofBank)[number];
export type ProofSurface = z.infer<typeof proofSurfaceSchema>;

export function getProofsForSurface(surface: ProofSurface) {
  return proofBank.filter((proof) => proof.projectionSurfaces.includes(surface));
}

export function getProofById(id: string) {
  return proofBank.find((proof) => proof.id === id);
}

export const homepageProofs = getProofsForSurface("homepage-proof-strip");
export const resumePageProofs = getProofsForSurface("resume-page");
