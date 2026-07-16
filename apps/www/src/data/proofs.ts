export type ProofStatus = "ready" | "careful" | "pending" | "private";

export type SupportLevel = "strong" | "moderate" | "careful" | "pending";

export type EvidenceClass =
  | "approved-resume"
  | "independent-press"
  | "public-source"
  | "public-safe-archive-summary"
  | "ai-assisted-archive-review"
  | "firsthand-collaborator-context"
  | "jamie-review-confirmation"
  | "collaborator-approval-pending";

const evidenceClassLabels: Record<EvidenceClass, string> = {
  "approved-resume": "approved resume",
  "independent-press": "independent press",
  "public-source": "public sources",
  "public-safe-archive-summary": "public-safe archive",
  "ai-assisted-archive-review": "AI-assisted archive review",
  "firsthand-collaborator-context": "firsthand context",
  "jamie-review-confirmation": "Jamie-confirmed",
  "collaborator-approval-pending": "collaborator approval pending"
};

export type ProofSurface =
  | "homepage"
  | "resume"
  | "technical-operations"
  | "work-card"
  | "case-study"
  | "lab"
  | "about"
  | "resume-pdf"
  | "internal-only";

export type ProofClaim = {
  id: string;
  status: ProofStatus;
  supportLevel: SupportLevel;
  evidenceClass: EvidenceClass[];
  publicWording: string;
  shortWording?: string;
  detailedPublicWording?: string;
  sourceBasis: string;
  sourceNote?: string;
  whyItMatters?: string;
  guardrail: string;
  doNotSay: string[];
  protectedBoundaries: string[];
  surfaces: ProofSurface[];
  relatedProjects: string[];
  relatedCapabilities: string[];
  evidenceCanonicalClaimIds?: string[];
  canonicalClaimIds?: string[];
  requiredCanonicalClaimIds?: string[];
  lastReviewed: string;
};

export const proofClaims: ProofClaim[] = [
  {
    id: "career-operating-structure-14-years",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "14+ years creating operating structure across civic, cultural, small-business, and technical environments.",
    shortWording: "14+ years turning unclear work into plans, workflows, and handoffs",
    detailedPublicWording:
      "Jamie turns emerging work into clear plans, shared decisions, coordinated implementation, and durable handoffs when requirements, ownership, documentation, and next steps are still forming.",
    sourceBasis: "Approved resume language and public-safe portfolio briefs.",
    whyItMatters:
      "Establishes the throughline across projects without forcing one job title onto every period of work.",
    guardrail:
      "Does not imply one continuous formal employment role, PMP certification, or government employment.",
    doNotSay: ["14+ years as a formal technical project manager in one organization"],
    protectedBoundaries: [
      "Private clients",
      "Collaborator records",
      "Raw community materials",
      "Internal operating details"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: ["technical-project-management", "product-operations", "implementation"],
    lastReviewed: "2026-07-07"
  },
  {
    id: "hje-modernization-stewardship",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Jamie helped an 80+ year-old industrial supply business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    shortWording: "Jamie helped move legacy product knowledge into maintainable e-commerce workflows",
    detailedPublicWording:
      "Jamie helped translate legacy operating knowledge into searchable e-commerce, content, analytics, marketing, and operational workflows while preserving the company's public voice.",
    sourceBasis: "Approved resume language, public website context, and public-safe business summary.",
    guardrail: "Use stewardship and contribution language.",
    doNotSay: [
      "Jamie fully owned the business",
      "Jamie owned all growth",
      "Jamie replaced the company's institutional knowledge"
    ],
    protectedBoundaries: [
      "Private dashboards",
      "Credentials",
      "Customer data",
      "Revenue detail",
      "Vendor terms",
      "Sensitive operating practices"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["harry-j-epstein"],
    relatedCapabilities: ["e-commerce", "analytics", "workflow-mapping", "handoffs"],
    lastReviewed: "2026-07-07"
  },
  {
    id: "hje-revenue-growth-contribution",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "firsthand-collaborator-context"],
    publicWording:
      "Jamie reports that his web, e-commerce, analytics, marketing, content, and operational workflow improvements contributed during a period of 2x revenue growth.",
    shortWording:
      "Jamie reports that his web, e-commerce, analytics, marketing, content, and operational workflow improvements contributed during a period of 2x revenue growth",
    detailedPublicWording:
      "Jamie reports that his web, e-commerce, analytics, marketing, content, and operational workflow improvements contributed during a period of 2x revenue growth. This is an approved first-person contribution claim, not an independently audited metric or a claim of sole causation.",
    sourceBasis: "Approved resume language and public-safe firsthand operational context.",
    sourceNote: "Keep the first-person evidence label, causal boundary, and aggregate framing visible.",
    whyItMatters:
      "Provides a concise business-impact proof point while retaining careful causality.",
    guardrail: "Must stay explicitly self-reported and use contribution language.",
    doNotSay: [
      "Caused 2x revenue growth",
      "Single-handedly doubled revenue",
      "Fully owned all business growth"
    ],
    protectedBoundaries: [
      "Private revenue figures",
      "Dashboards",
      "Customer data",
      "Vendor terms",
      "Internal analytics"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["harry-j-epstein"],
    relatedCapabilities: ["e-commerce", "analytics", "implementation"],
    canonicalClaimIds: ["CLM-HJE-REVENUE-GROWTH-CONTRIBUTION"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "callnyc-civic-data-guidance",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-source"],
    publicWording:
      "Built CallNYC.org as an archived, unofficial independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.",
    shortWording: "Built an archived, unofficial CouncilStat follow-on translating civic data into resident-facing guidance",
    detailedPublicWording:
      "CallNYC turned open constituent-services data into issue pathways, district context, and archived resident-facing guidance while making its unofficial status clear; Politico New York covered the project in 2016.",
    sourceBasis:
      "Approved resume language, archived prototype context, public open-data context, public GitHub repository, and verified Politico New York coverage.",
    guardrail: "Always describe it as archived and unofficial.",
    doNotSay: [
      "Broader historical hackathon superlatives",
      "Official hackathon submission or winner",
      "Current city service",
      "Official city guidance",
      "Emergency guidance",
      "Legal guidance"
    ],
    protectedBoundaries: ["Current-service claims", "Private user data", "Unverified guidance"],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["callnyc"],
    relatedCapabilities: ["open-data", "resident-guidance", "information-architecture"],
    lastReviewed: "2026-07-11"
  },
  {
    id: "fair-rent-campaign-memory",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "firsthand-collaborator-context"
    ],
    publicWording:
      "Built and stewarded 30+ pages of shared Commercial Rent Stabilization campaign-memory and coordination infrastructure.",
    shortWording: "Jamie built and stewarded 30+ shared pages for coalition decisions and next steps",
    detailedPublicWording:
      "Jamie helped collaborators turn meetings, decision records, action items, legal/policy questions, sources, and stakeholder next steps into 30+ shared pages they could use to orient, coordinate, and continue the work.",
    sourceBasis:
      "Approved resume language plus protected 2026 operating-plan and running-minutes artifacts, summarized publicly without private coalition context.",
    sourceNote: "Use collective-work language and omit private coalition context.",
    whyItMatters:
      "Shows documentation as operating infrastructure for sensitive, collective civic work.",
    guardrail:
      "Use collective-work language and do not publish raw or private coalition context.",
    doNotSay: [
      "Jamie led the movement",
      "Jamie owned the campaign",
      "Jamie provided official legal analysis",
      "Jamie single-handedly created the policy work"
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "Legal-review materials",
      "Stakeholder lists",
      "Private emails",
      "Raw strategy context",
      "Unapproved quotes"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["meeting-synthesis", "decision-records", "source-mapping"],
    evidenceCanonicalClaimIds: ["CLM-CRS-SHARED-PUBLIC-GOODS-OPERATING-PLAN-2026"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "fair-rent-source-map",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "firsthand-collaborator-context"
    ],
    publicWording:
      "Created a legislative source map and provenance redline tracing Commercial Rent Stabilization bill language across public policy lineages and revision paths.",
    shortWording: "Created a legislative source map and provenance redline",
    detailedPublicWording:
      "Jamie organized source lineage, public-data framing, policy questions, and review lanes so collaborators could see what was known, what needed review, and what remained protected.",
    sourceBasis:
      "Approved resume language plus a protected, close-read legislative provenance redline with explicit unofficial and non-legal boundaries. A separate protected commercial-vacancy proposal supports Jamie's privacy-preserving public-data framing and minimum-release design, not agency adoption or implementation.",
    guardrail: "Do not imply legal authority or official bill ownership.",
    doNotSay: [
      "Jamie authored the legislation",
      "Jamie provided legal advice",
      "The redline is official legal analysis"
    ],
    protectedBoundaries: [
      "Legal-review context",
      "Private strategy",
      "Private correspondence",
      "Unapproved collaborator notes"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["source-mapping", "public-data-framing", "policy-translation"],
    evidenceCanonicalClaimIds: ["CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026", "CLM-COMMERCIAL-VACANCY-RPIE-PILOT-DESIGN-2026"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-public-web-infrastructure",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "independent-press", "public-source", "jamie-review-confirmation"],
    publicWording:
      "Co-founded NYC Artist Coalition and built public campaign websites for cultural-space advocacy, including the coalition site, FairRentNYC, Talks Not Raids, and Let NYC Dance public web surfaces.",
    shortWording: "Co-founded NYC Artist Coalition and built public campaign websites",
    detailedPublicWording:
      "Jamie helped give NYC Artist Coalition a public-facing civic systems layer: campaign websites, issue explanations, calls to action, public resources, and support paths for cultural-space advocacy.",
    sourceBasis: "Independent NPR reporting identifies Jamie as a founding member; approved resume language, Jamie confirmation, and the public campaign sites support his web-infrastructure role.",
    whyItMatters:
      "Makes Jamie's co-founder, civic-systems, and direct web authorship visible without overstating collective campaign accomplishments.",
    guardrail:
      "Co-founder and website authorship are Jamie's direct contributions; campaign accomplishments remain collective.",
    doNotSay: [
      "Jamie solely led NYC Artist Coalition",
      "Jamie owned every campaign",
      "Jamie authored every policy position",
      "Jamie controlled partner decisions",
      "Jamie single-handedly caused policy outcomes"
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "CMS/admin details",
      "Strategy records",
      "Contact lists",
      "Private correspondence",
      "Unapproved collaborator details"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["campaign-websites", "public-guidance", "information-architecture"],
    canonicalClaimIds: ["CLM-NYCA-CABARET-REPEAL-ADVOCACY-2017"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "nyc-artist-coalition-civic-systems",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Built and stewarded civic systems, coalition operations, and policy-communications infrastructure for NYC Artist Coalition cultural-space advocacy from 2017 onward.",
    shortWording: "Civic systems and coalition operations for NYC Artist Coalition",
    detailedPublicWording:
      "Jamie translated policy, public-data, and coalition needs into practical materials for campaigns around Cabaret Law repeal, Office of Nightlife creation, nightlife enforcement reporting, Commercial Rent Stabilization, and storefront stability.",
    sourceBasis:
      "Approved resume language, public campaign surfaces, and public-safe NYC Artist Coalition project history.",
    whyItMatters:
      "Names Jamie's operating role in NYC Artist Coalition without turning collective advocacy outcomes into solo accomplishments.",
    guardrail:
      "Use campaign-support and systems language. Do not claim solo leadership, legal authority, or sole causality for public policy outcomes.",
    doNotSay: [
      "Jamie alone repealed the Cabaret Law",
      "Jamie alone created the Office of Nightlife",
      "Jamie alone passed nightlife enforcement reporting legislation",
      "Jamie speaks for every NYC Artist Coalition collaborator"
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "Internal disputes",
      "Private correspondence",
      "Membership records",
      "Unapproved collaborator names",
      "Legal-review materials"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study", "about"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "coalition-operations",
      "policy-communications",
      "public-data-framing",
      "civic-systems"
    ],
    lastReviewed: "2026-07-09"
  },
  {
    id: "nyc-artist-coalition-participation-system",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "public-source",
      "public-safe-archive-summary",
      "jamie-review-confirmation"
    ],
    publicWording:
      "Beginning in 2017, helped establish and produce NYC Artist Coalition's recurring participation system, moving emerging work from public invitation and listening through collaborative drafting, collective naming, follow-up meetings, and sustained civic action.",
    shortWording:
      "Helped establish NYC Artist Coalition's recurring participation system",
    detailedPublicWording:
      "Jamie connected lessons from WOW List with coalition advocacy through Call Script and public event pages. The early record shows the participation system changing through use: an event surface gathered issues before a DCLA meeting; the public discussion supported a shared letter draft and naming poll; and the record routed people into a follow-up general meeting before the system expanded across small cultural spaces, practical sessions, town halls, hearings, campaign actions, and relief convenings. Jamie helped shape those next steps around what participants contributed.",
    sourceBasis:
      "Jamie's first-hand role account; the archived popular.vote surface; the surviving Call Script page; the complete public discussion for a Call Script-cohosted January 2017 DCLA meeting; a protected WOW List production snapshot corroborating the event sequence; a public-safe census of 33 recovered coalition event records; contemporaneous Gothamist reporting; a community profile connecting Jamie to coalition work; and close-read official DCLA and Council records documenting recommendations, institutional listening, coalition testimony, Espinal's public credit, and the Intro 1652 legislative sequence.",
    whyItMatters:
      "Shows why iterative participation infrastructure mattered institutionally: public contributions informed shared artifacts and follow-up convening, then helped make emerging cultural-space knowledge legible and actionable to agency and legislative processes while preserving the coalition, hosts, partners, and participants as co-authors of the work.",
    sourceNote:
      "The sequence supports evolving shared artifacts and convening, not sole authorship, verified attendance, a complete founding history, or proof that one event caused coalition formation or a policy outcome.",
    guardrail:
      "Use helped establish, produce, build, and steward. Do not assign Jamie sole authorship of every event, recommendation, testimony, or page post; treat Facebook response labels as attendance; turn the naming poll's displayed 57% into a vote total or mandate; say DCLA created the coalition; imply Finkelpearl used the formal name in every relevant hearing; or claim that one tool, person, or event system alone caused coalition formation or a policy outcome.",
    doNotSay: [
      "Jamie solely produced every NYC Artist Coalition event",
      "9,989 people attended",
      "Facebook responses equal attendance or unique reach",
      "The naming poll proves a vote total, representative mandate, or complete founding roster",
      "Call Script or popular.vote alone created NYC Artist Coalition",
      "DCLA created or controlled NYC Artist Coalition",
      "Finkelpearl named NYC Artist Coalition in every relevant hearing",
      "The Council needed Jamie personally",
      "Espinal could not have advanced Intro 1652 without Jamie",
      "Every event used a different venue",
      "The event program alone repealed the Cabaret Law"
    ],
    protectedBoundaries: [
      "Raw event descriptions",
      "Attendee identities",
      "Comments and reactions",
      "Contact details",
      "Meeting credentials",
      "Private working links",
      "Authenticated-session data",
      "Raw WOW List database records"
    ],
    surfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "participation-systems",
      "coalition-operations",
      "event-production",
      "civic-engagement",
      "public-communications"
    ],
    canonicalClaimIds: [
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017"
    ],
    lastReviewed: "2026-07-16"
  },
  {
    id: "wowlist-community-platform",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "firsthand-collaborator-context"
    ],
    publicWording:
      "Co-built WOWList.org, a Django, PostgreSQL/PostGIS, and Ember community-calendar platform historically used by DIY arts and music organizers across 35+ city scenes, each with at least 50 geocoded posts/events.",
    shortWording: "Jamie co-built WOWList; historical records show use across 35+ city scenes, each with 50+ geocoded posts/events",
    detailedPublicWording:
      "WOWList supported 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers.",
    sourceBasis:
      "Approved resume language, a protected production-database analysis with public-safe aggregate findings, and a public 2016 Sunday Dinner event page that links directly to its WOW List event route.",
    guardrail:
      "Use rounded historical aggregates; define the 35+ city-scene figure by the documented threshold of at least 50 geocoded posts/events; treat the Sunday Dinner link as one concrete route, not an adoption or traffic census; and do not describe scenes as official chapters or current service.",
    doNotSay: [
      "Official chapters in 35 cities",
      "Full ownership of all organizer adoption",
      "Current active platform unless confirmed"
    ],
    protectedBoundaries: [
      "Private user data",
      "Organizer contact lists",
      "Raw records",
      "Geolocation rows",
      "Unapproved community artifacts"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    canonicalClaimIds: [
      "CLM-WOWLIST-HISTORICAL-SCALE",
      "CLM-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT",
      "CLM-FACEBOOK-WOWLIST-IN-PRACTICE"
    ],
    requiredCanonicalClaimIds: ["CLM-WOWLIST-HISTORICAL-SCALE"],
    relatedProjects: ["wowlist"],
    relatedCapabilities: ["django", "postgresql", "postgis", "ember", "community-platforms"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "sunday-dinner-196-participation-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "jamie-review-confirmation"
    ],
    publicWording:
      "Jamie co-hosted Sunday Dinner with Julia Fredenberg; his approved resume reports 300+ gatherings. Jamie founded 196 Artists Residency; Jamie reports supporting 20+ resident artists through repeatable participation systems.",
    shortWording:
      "Co-hosted Sunday Dinner with Julia Fredenberg (Jamie reports 300+ gatherings); founded 196 Artists Residency and reports supporting 20+ resident artists",
    detailedPublicWording:
      "For Sunday Dinner, Jamie worked with Julia Fredenberg on invitation, hosting, documentation, and continuity; his approved resume reports 300+ gatherings. For 196 Artists Residency, Jamie reports supporting 20+ resident artists through intake, onboarding, scheduling, hospitality, facilitation, and artist-support practices.",
    sourceBasis:
      "Approved resume language supplies the public scale wording; a protected working ledger preserves numbered Sunday Dinner records through 345 and a contemporaneous 300th record without establishing attendance or unique participants. A Greene Hill Food Co-op Q&A and the surviving public project archive separately support weekly open co-hosting and participatory documentation. Public Facebook event pages preserve 100th and 200th milestone titles. A protected 2023 acceptance record supports the residency's operating methods, not the 20+ aggregate.",
    guardrail:
      "Keep the page summary-only; credit Julia Fredenberg wherever Sunday Dinner hosting is named; treat numbered Facebook titles as contemporaneous milestones and the protected ledger as project-history support rather than attendance or unique-participant evidence; keep the ledger out of public citations and detail; attribute both aggregates to Jamie's approved resume and use 'Jamie reports' for the 20+ residency scale; keep the two role and date ranges distinct.",
    doNotSay: [
      "Jamie was Sunday Dinner's sole host or sole creator",
      "Institutional ownership of participants' work",
      "Comprehensive public archive",
      "Attendance database"
    ],
    protectedBoundaries: [
      "Guest lists",
      "Attendance records",
      "Workbook rows and response markers",
      "Addresses",
      "Private messages",
      "Raw community records",
      "Unapproved photos"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "work-card", "case-study"],
    canonicalClaimIds: [
      "CLM-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING-2017",
      "CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE",
      "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES"
    ],
    relatedProjects: ["196-sunday-dinner"],
    relatedCapabilities: ["onboarding", "facilitation", "documentation", "handoffs"],
    lastReviewed: "2026-07-16"
  },
  {
    id: "kc-spaces-fund-digital-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["public-source", "public-safe-archive-summary", "ai-assisted-archive-review"],
    publicWording:
      "Supported KC Spaces Fund, a 2020 Kansas City mutual-aid campaign for grassroots arts and culture spaces, as behind-the-scenes digital infrastructure.",
    shortWording: "Behind-the-scenes digital infrastructure for KC Spaces Fund",
    detailedPublicWording:
      "Jamie built and maintained the campaign's Ghost-based web stack, customized a reusable campaign theme, and supported donation, application, sign-up, and fundraising-display affordances while public organizer credit remains with the campaign's named organizers.",
    sourceBasis:
      "Public GoFundMe page, public campaign domain, and AI-assisted archival review of Jamie-provided project records summarized without exposing private source material.",
    sourceNote:
      "Use as an evidence-based archival proof note, not a human collaborator testimonial.",
    whyItMatters:
      "Shows rapid public-facing implementation, technical operations, and campaign infrastructure support for a collective mutual-aid effort.",
    guardrail:
      "Behind-the-scenes technical and operational support only. Do not frame Jamie as the public organizer, grant decision-maker, fiscal sponsor, or sole campaign owner.",
    doNotSay: [
      "Jamie organized KC Spaces Fund",
      "Jamie ran the fundraiser",
      "Jamie made grant decisions",
      "Jamie was the fiscal sponsor",
      "A human collaborator provided this testimonial"
    ],
    protectedBoundaries: [
      "Applicant or grantee materials",
      "Donor and list exports",
      "Subscriber data",
      "Payment-request files",
      "Credentials or login sheets",
      "Billing and payment details",
      "Raw email archives",
      "Raw text-message archives",
      "Private Drive documents",
      "Sensitive strategy, legal, financial, or personal information"
    ],
    surfaces: ["technical-operations"],
    relatedProjects: ["kc-spaces-fund"],
    canonicalClaimIds: ["CLM-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY"],
    requiredCanonicalClaimIds: ["CLM-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY"],
    relatedCapabilities: [
      "public-facing-web-systems",
      "campaign-infrastructure",
      "implementation",
      "technical-operations"
    ],
    lastReviewed: "2026-07-16"
  },
  {
    id: "kc-town-hall-public-benefit-documentation",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant historic building, carrying a $490,539 proposal through Board recommendation and City Council appropriation. The agreement was not completed, no funds were disbursed, and the unused award was later reappropriated.",
    shortWording: "Supported adaptive reuse planning and public-benefit documentation",
    detailedPublicWording:
      "Jamie helped shape planning, public-benefit documentation, stakeholder context, and municipal-review support for an adaptive reuse effort. Public records identify him as the proposal's presenter; the Council accepted the Board recommendation and appropriated $490,539 to the project account in 2019. A 2022 update listed no funds disbursed, and a 2024 ordinance reappropriated the unused award.",
    sourceBasis:
      "Approved resume language, public-safe project context, CCED Board minutes naming Jamie as presenter, 2019 Council appropriation and resolution records, the 2022 project-status table, and the 2024 reappropriation ordinance.",
    sourceNote:
      "When the funding lifecycle appears in the downloadable resume, include a compact public-record note and path to the case-study source links.",
    guardrail:
      "Appropriation must never be compressed into receipt: keep the no-disbursement and reappropriation endpoint attached to any public funding language, and retain the public-record source path in the downloadable resume.",
    doNotSay: [
      "KC Town Hall received or spent $490,539",
      "The project was completed",
      "Withdrawal from the funding process means Jamie abandoned the project",
      "Why the project's stewardship changed",
      "Private financial details",
      "Official municipal endorsement beyond the recorded Council actions"
    ],
    protectedBoundaries: [
      "Private financial details",
      "Legal details",
      "Property details",
      "Banking details",
      "Stakeholder details",
      "Private personal circumstances"
    ],
    surfaces: ["resume-pdf", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["project-planning", "public-benefit-documentation", "stakeholder-context"],
    canonicalClaimIds: ["CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019", "CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION-2026"],
    requiredCanonicalClaimIds: ["CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019"],
    lastReviewed: "2026-07-16"
  },
  {
    id: "source-backed-team-memory-method",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "Developing a bounded lab method for source-backed team memory: reviewable, human-correctable, source-linked operating memory for knowledge-heavy teams.",
    shortWording: "Bounded method for source-backed team memory",
    detailedPublicWording:
      "While developing this portfolio, an early pass treated a participant photograph's approximate 2:10 p.m. timestamp as an event time. Review found a direct Civic Hall announcement stating 1-3 p.m.; the public claim was corrected, the earlier inference remained in the correction trail, and the photograph stayed held pending rights and consent review.",
    sourceBasis:
      "Public-safe lab materials, the CallNYC event-time correction record and direct archived Civic Hall announcement, held photograph metadata, and a protected, close-read 2026 sprint proposal that establishes offer and method design, not client delivery.",
    sourceNote:
      "The event-time example documents this portfolio's own human-reviewed claim lifecycle, not external client adoption or impact.",
    whyItMatters:
      "This is the method in use: stronger evidence changed the public account while provenance, uncertainty, rights, and consent remained visible.",
    guardrail:
      "Not finished SaaS. Not a chatbot. Not a private archive browser. Not a replacement for human judgment.",
    doNotSay: [
      "Built a production AI memory platform for a client",
      "Automated trust",
      "Replaces human review"
    ],
    protectedBoundaries: [
      "Private collaborator names",
      "Pricing",
      "Private transcript excerpts",
      "Private company context"
    ],
    surfaces: ["technical-operations", "lab"],
    relatedProjects: ["source-backed-team-memory"],
    relatedCapabilities: ["source-backed-memory", "documentation-architecture", "human-review"],
    evidenceCanonicalClaimIds: [
      "CLM-SOURCE-BACKED-TEAM-MEMORY-SPRINT-DESIGN-2026"
    ],
    lastReviewed: "2026-07-16"
  },
  {
    id: "technical-operations-operating-backbone",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Jamie builds the operating backbone teams need to move public-facing technical work from ambiguity to launch.",
    shortWording: "Operating backbone for public-facing technical work",
    detailedPublicWording:
      "Jamie clarifies requirements, maps workflows, coordinates delivery, surfaces risk, maintains decision records, prepares onboarding and handoff materials, and improves working systems over time.",
    sourceBasis: "Approved resume language and public-safe portfolio briefs.",
    whyItMatters:
      "Names the role fit across product operations, implementation, technical project management, and public-facing delivery.",
    guardrail:
      "Keep it generally framed; do not make the site only an OTI application page.",
    doNotSay: [
      "Jamie is a certified PMP unless separately approved",
      "Jamie replaces product, engineering, legal, or executive judgment"
    ],
    protectedBoundaries: [
      "Private client materials",
      "Internal health metrics",
      "HR context",
      "Confidential team information"
    ],
    surfaces: ["homepage", "resume", "resume-pdf", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: ["delivery-coordination", "risk-surfacing", "handoffs"],
    lastReviewed: "2026-07-07"
  },
  {
    id: "ai-evals-professional-development",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-source"],
    publicWording:
      "Completed AI Evals for Engineers & PMs with Shreya Shankar and Hamel Husain / Maven in 2026.",
    shortWording: "Completed AI Evals for Engineers & PMs in 2026",
    detailedPublicWording:
      "Coursework covered application-centric evals, error analysis, annotation workflows, traces, LLM failure modes, retrieval quality, and human-in-the-loop evaluation practice.",
    sourceBasis: "Public-safe completion certificate, approved resume language, and Maven's public course page.",
    guardrail:
      "Treat as professional development, not instructor affiliation or certification authority beyond completion.",
    doNotSay: [
      "Jamie teaches the course",
      "Jamie is certified by Maven as an AI evaluator unless the credential wording is separately approved"
    ],
    protectedBoundaries: [
      "Private coursework",
      "Private cohort materials",
      "Unapproved evaluations"
    ],
    surfaces: ["resume", "resume-pdf", "lab", "about"],
    relatedProjects: ["source-backed-team-memory", "ai-evals-professional-development"],
    relatedCapabilities: ["ai-evals", "human-review", "evaluation"],
    evidenceCanonicalClaimIds: ["CLM-AI-EVALS-COMPLETION-2026"],
    lastReviewed: "2026-07-16"
  }
];

const publicProofStatuses = new Set<ProofStatus>(["ready", "careful"]);

export function getProofById(id: string): ProofClaim | undefined {
  return proofClaims.find((proof) => proof.id === id);
}

export function getProofsForSurface(surface: ProofSurface): ProofClaim[] {
  return proofClaims.filter((proof) => {
    return publicProofStatuses.has(proof.status) && proof.surfaces.includes(surface);
  });
}

export function formatEvidenceBasis(proof: Pick<ProofClaim, "evidenceClass">): string {
  return proof.evidenceClass.map((evidenceClass) => evidenceClassLabels[evidenceClass]).join(" + ");
}

export function requireReadyOrCarefulProof(id: string): ProofClaim {
  const proof = getProofById(id);

  if (!proof || !publicProofStatuses.has(proof.status)) {
    throw new Error(`Proof claim is not public-ready: ${id}`);
  }

  return proof;
}

export function selectProofs(surface: ProofSurface): ProofClaim[] {
  return getProofsForSurface(surface);
}

export const homepageProofs = [
  "career-operating-structure-14-years",
  "hje-revenue-growth-contribution",
  "fair-rent-campaign-memory",
  "wowlist-community-platform",
  "sunday-dinner-196-participation-infrastructure"
].map(requireReadyOrCarefulProof);

export const resumeProofHighlights = [
  "career-operating-structure-14-years",
  "hje-modernization-stewardship",
  "hje-revenue-growth-contribution",
  "fair-rent-campaign-memory",
  "fair-rent-source-map",
  "callnyc-civic-data-guidance",
  "nyc-artist-coalition-public-web-infrastructure",
  "nyc-artist-coalition-civic-systems",
  "wowlist-community-platform",
  "sunday-dinner-196-participation-infrastructure",
  "ai-evals-professional-development"
].map(requireReadyOrCarefulProof);

export const resumePdfProofs = [
  ...resumeProofHighlights,
  requireReadyOrCarefulProof("technical-operations-operating-backbone"),
  requireReadyOrCarefulProof("kc-town-hall-public-benefit-documentation")
];

export const aboutProofs = [
  "career-operating-structure-14-years",
  "nyc-artist-coalition-civic-systems",
  "technical-operations-operating-backbone",
  "ai-evals-professional-development"
].map(requireReadyOrCarefulProof);

export const labProofs = [
  "source-backed-team-memory-method"
].map(requireReadyOrCarefulProof);

export const technicalOperationsProofRows = [
  {
    capability: "Delivery coordination",
    toward: "Turning unclear public-facing work into launchable plans, releases, and handoffs.",
    proofIds: [
      "technical-operations-operating-backbone",
      "hje-modernization-stewardship",
      "callnyc-civic-data-guidance",
      "wowlist-community-platform"
    ]
  },
  {
    capability: "Risk surfacing and decision clarity",
    toward: "Making open questions, public/private boundaries, and stakeholder next steps visible.",
    proofIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "kc-town-hall-public-benefit-documentation"
    ]
  },
  {
    capability: "Operating documentation people use",
    toward: "Converting meetings, source trails, and recurring practices into reusable working memory.",
    proofIds: [
      "fair-rent-campaign-memory",
      "sunday-dinner-196-participation-infrastructure",
      "source-backed-team-memory-method"
    ]
  },
  {
    capability: "Public-facing launch and adoption",
    toward: "Shaping websites, prototypes, and community platforms so real audiences can act.",
    proofIds: [
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
      "kc-spaces-fund-digital-infrastructure",
      "callnyc-civic-data-guidance",
      "wowlist-community-platform",
      "hje-revenue-growth-contribution"
    ]
  }
].map((row) => ({
  ...row,
  proofs: row.proofIds.map(requireReadyOrCarefulProof)
}));
