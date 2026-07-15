export type ProofStatus = "ready" | "careful" | "pending" | "private";

export type SupportLevel = "strong" | "moderate" | "careful" | "pending";

export type EvidenceClass =
  | "approved-resume"
  | "public-source"
  | "public-safe-archive-summary"
  | "ai-assisted-archive-review"
  | "firsthand-collaborator-context"
  | "jamie-review-confirmation"
  | "collaborator-approval-pending";

export type ProofSurface =
  | "homepage"
  | "resume"
  | "technical-operations"
  | "work-card"
  | "case-study"
  | "lab"
  | "about"
  | "internal-only";

export type ProofClaim = {
  id: string;
  status: ProofStatus;
  supportLevel: SupportLevel;
  evidenceClass: EvidenceClass[];
  publicWording: string;
  shortWording?: string;
  homepageWording?: string;
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
    shortWording: "14+ years creating operating structure",
    homepageWording:
      "I bring 14+ years of experience creating operating structure across civic, cultural, small-business, and technical work.",
    detailedPublicWording:
      "Jamie creates operating structure where the need is real but requirements, workflows, ownership, documentation, and handoffs are not yet clear.",
    sourceBasis: "Approved resume language and public-safe portfolio briefs.",
    whyItMatters:
      "Establishes the throughline across projects without forcing one job title onto every period of work.",
    guardrail:
      "Does not imply one continuous formal employment role, PMP certification, or government employment.",
    doNotSay: [
      "14+ years as a formal technical project manager in one organization",
    ],
    protectedBoundaries: [
      "Private clients",
      "Collaborator records",
      "Raw community materials",
      "Internal operating details",
    ],
    surfaces: ["homepage", "resume", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: [
      "technical-project-management",
      "product-operations",
      "implementation",
    ],
    lastReviewed: "2026-07-07",
  },
  {
    id: "hje-modernization-stewardship",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: [
      "approved-resume",
      "public-source",
      "public-safe-archive-summary",
    ],
    publicWording:
      "Helped an 80+ year-old industrial supply business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    shortWording: "Modernized legacy e-commerce and operations workflows",
    detailedPublicWording:
      "Jamie helped translate legacy operating knowledge into searchable e-commerce, content, analytics, marketing, and operational workflows while preserving the company's public voice.",
    sourceBasis:
      "Approved resume language, public website context, and public-safe business summary.",
    guardrail: "Use stewardship and contribution language.",
    doNotSay: [
      "Jamie fully owned the business",
      "Jamie owned all growth",
      "Jamie replaced the company's institutional knowledge",
    ],
    protectedBoundaries: [
      "Private dashboards",
      "Credentials",
      "Customer data",
      "Revenue detail",
      "Vendor terms",
      "Sensitive operating practices",
    ],
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["harry-j-epstein"],
    relatedCapabilities: [
      "e-commerce",
      "analytics",
      "workflow-mapping",
      "handoffs",
    ],
    lastReviewed: "2026-07-07",
  },
  {
    id: "hje-revenue-growth-contribution",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "firsthand-collaborator-context"],
    publicWording:
      "Contributed to a period of 2x revenue growth for a legacy e-commerce business.",
    shortWording:
      "Contributed to 2x revenue growth for a legacy e-commerce business",
    homepageWording:
      "I helped modernize a legacy e-commerce operation, contributing to a period of 2x revenue growth.",
    detailedPublicWording:
      "Jamie's web, e-commerce, analytics, marketing, content, and operational workflow improvements contributed to a period of 2x revenue growth.",
    sourceBasis:
      "Approved resume language and public-safe firsthand operational context.",
    sourceNote: "Keep causal language careful and aggregate.",
    whyItMatters:
      "Provides a concise business-impact proof point while retaining careful causality.",
    guardrail: "Must stay as contribution language.",
    doNotSay: [
      "Caused 2x revenue growth",
      "Single-handedly doubled revenue",
      "Fully owned all business growth",
    ],
    protectedBoundaries: [
      "Private revenue figures",
      "Dashboards",
      "Customer data",
      "Vendor terms",
      "Internal analytics",
    ],
    surfaces: ["homepage", "resume", "technical-operations", "case-study"],
    relatedProjects: ["harry-j-epstein"],
    relatedCapabilities: ["e-commerce", "analytics", "implementation"],
    lastReviewed: "2026-07-07",
  },
  {
    id: "callnyc-civic-data-guidance",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-source"],
    publicWording:
      "Built CallNYC.org as an independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.",
    shortWording:
      "Built an independent CouncilStat follow-on translating civic data into resident-facing guidance",
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
      "Legal guidance",
    ],
    protectedBoundaries: [
      "Current-service claims",
      "Private user data",
      "Unverified guidance",
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["callnyc"],
    relatedCapabilities: [
      "open-data",
      "resident-guidance",
      "information-architecture",
    ],
    lastReviewed: "2026-07-11",
  },
  {
    id: "fair-rent-campaign-memory",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "firsthand-collaborator-context",
    ],
    publicWording:
      "Built and stewarded 30+ pages of shared Commercial Rent Stabilization campaign-memory and coordination infrastructure.",
    shortWording: "30+ pages of civic campaign-memory infrastructure",
    homepageWording:
      "I built and stewarded 30+ pages of shared civic campaign memory so collaborators could preserve decisions and coordinate follow-up.",
    detailedPublicWording:
      "Jamie synthesized meetings, decision records, action items, legal/policy questions, media assets, stakeholder next steps, and city/state strategy lanes into shared memory and actionable workstreams.",
    sourceBasis:
      "Approved resume language, a six-part operating plan, and consent-aware running minutes represented through protected source metadata.",
    sourceNote:
      "Use collective-work language and omit private coalition context.",
    whyItMatters:
      "Shows documentation as operating infrastructure for sensitive, collective civic work.",
    guardrail:
      "Jamie directly designed and maintained the operating structure; underlying campaign actions remain collective. Do not publish raw or private coalition context or imply that every planned component was completed.",
    doNotSay: [
      "Jamie led the movement",
      "Jamie owned the campaign",
      "Jamie provided official legal analysis",
      "Jamie single-handedly created the policy work",
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "Legal-review materials",
      "Stakeholder lists",
      "Private emails",
      "Raw strategy context",
      "Unapproved quotes",
    ],
    surfaces: [
      "homepage",
      "resume",
      "technical-operations",
      "work-card",
      "case-study",
    ],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "meeting-synthesis",
      "decision-records",
      "source-mapping",
    ],
    lastReviewed: "2026-07-07",
  },
  {
    id: "fair-rent-source-map",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "firsthand-collaborator-context",
    ],
    publicWording:
      "Created a legislative source map and provenance redline tracing Commercial Rent Stabilization bill language across public policy lineages and revision paths.",
    shortWording: "Created a legislative source map and provenance redline",
    detailedPublicWording:
      "Jamie organized source lineage, public-data framing, policy questions, and review lanes so collaborators could see what was known, what needed review, and what remained protected.",
    sourceBasis:
      "Approved resume language, the legislative provenance redline, and privacy-preserving public-data implementation documents represented through protected source metadata.",
    guardrail: "Do not imply legal authority or official bill ownership.",
    doNotSay: [
      "Jamie authored the legislation",
      "Jamie provided legal advice",
      "The redline is official legal analysis",
    ],
    protectedBoundaries: [
      "Legal-review context",
      "Private strategy",
      "Private correspondence",
      "Unapproved collaborator notes",
    ],
    surfaces: ["resume", "technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "source-mapping",
      "public-data-framing",
      "policy-translation",
    ],
    lastReviewed: "2026-07-07",
  },
  {
    id: "nyc-artist-coalition-public-web-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-source",
      "jamie-review-confirmation",
    ],
    publicWording:
      "Co-founded NYC Artist Coalition and built public campaign websites for cultural-space advocacy, including the coalition site, FairRentNYC, Talks Not Raids, and Let NYC Dance public web surfaces.",
    shortWording:
      "Co-founded NYC Artist Coalition and built public campaign websites",
    detailedPublicWording:
      "Jamie helped give NYC Artist Coalition a public-facing civic systems layer: campaign websites, issue explanations, calls to action, public resources, and support paths for cultural-space advocacy.",
    sourceBasis:
      "Approved resume language, Jamie confirmation, public campaign websites, and contemporaneous NPR reporting identifying Jamie as a founding member.",
    whyItMatters:
      "Makes Jamie's co-founder, civic-systems, and direct web authorship visible without overstating collective campaign accomplishments.",
    guardrail:
      "Co-founder and website authorship are Jamie's direct contributions; campaign accomplishments remain collective.",
    doNotSay: [
      "Jamie solely led NYC Artist Coalition",
      "Jamie owned every campaign",
      "Jamie authored every policy position",
      "Jamie controlled partner decisions",
      "Jamie single-handedly caused policy outcomes",
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "CMS/admin details",
      "Strategy records",
      "Contact lists",
      "Private correspondence",
      "Unapproved collaborator details",
    ],
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "campaign-websites",
      "public-guidance",
      "information-architecture",
    ],
    lastReviewed: "2026-07-14",
  },
  {
    id: "nyc-artist-coalition-civic-systems",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-source",
      "public-safe-archive-summary",
    ],
    publicWording:
      "Built and stewarded civic systems, coalition operations, and policy-communications infrastructure for NYC Artist Coalition cultural-space advocacy from 2017 onward.",
    shortWording:
      "Civic systems and coalition operations for NYC Artist Coalition",
    detailedPublicWording:
      "Jamie translated policy, public-data, and coalition needs into practical materials for Cabaret Law repeal advocacy, Office of Nightlife agenda-setting and accountability, MARCH transparency, Commercial Rent Stabilization, and storefront stability. A revision-attributed 2025 draft also shows him turning three concurrent civic lanes into concrete audience actions; he testified publicly for Talks Not Raids.",
    sourceBasis:
      "Approved resume language, public campaign surfaces, independent reporting, a City-hosted policy appendix, Jamie's 2019 Council testimony, the Local Law 220 legislative record, and a public-safe revision-history summary.",
    whyItMatters:
      "Names Jamie's operating role in NYC Artist Coalition without turning collective advocacy outcomes into solo accomplishments.",
    guardrail:
      "Use campaign-support and systems language. Do not claim solo leadership, legal authority, or sole causality for public policy outcomes.",
    doNotSay: [
      "Jamie alone repealed the Cabaret Law",
      "Jamie alone created the Office of Nightlife",
      "Jamie alone passed nightlife enforcement reporting legislation",
      "Jamie speaks for every NYC Artist Coalition collaborator",
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "Internal disputes",
      "Private correspondence",
      "Membership records",
      "Unapproved collaborator names",
      "Legal-review materials",
    ],
    surfaces: [
      "resume",
      "technical-operations",
      "work-card",
      "case-study",
      "about",
    ],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "coalition-operations",
      "policy-communications",
      "public-data-framing",
      "civic-systems",
    ],
    lastReviewed: "2026-07-14",
  },
  {
    id: "google-shared-drive-handoff-practice",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: [
      "public-safe-archive-summary",
      "jamie-review-confirmation",
    ],
    publicWording:
      "Maintains project-specific Shared Drives as portable handoff surfaces across devices and collaborators, using structured templates, running memory, public guidance, and privacy-aware archive tooling.",
    shortWording: "Portable Shared Drive handoffs across projects",
    detailedPublicWording:
      "A bounded review found concrete handoff patterns across civic, cultural, and public-data work: residency onboarding, source-backed running memory, action-oriented guidance, and mixed-format archive overview tooling with explicit information boundaries.",
    sourceBasis:
      "Jamie confirmation plus public-safe summaries of a bounded Shared Drive inventory, close-read artifacts, and revision histories.",
    whyItMatters:
      "Shows durable handoff practice as inspectable operational work rather than a generic documentation claim.",
    guardrail:
      "The review sampled 14 of 110 accessible drives. Access does not imply authorship, collaborator adoption, public status, or permission to publish.",
    doNotSay: [
      "Jamie authored every file in every Shared Drive",
      "All Shared Drives were reviewed",
      "Every collaborator used every handoff system",
    ],
    protectedBoundaries: [
      "Drive IDs and URLs",
      "Membership and permissions",
      "Private excerpts",
      "Participant identities",
      "Personal, legal, family, and unrelated collaborator material",
    ],
    surfaces: ["technical-operations"],
    relatedProjects: ["fair-rent-nyc", "196-sunday-dinner"],
    relatedCapabilities: [
      "handoffs",
      "shared-workspaces",
      "documentation",
      "archive-tooling",
    ],
    lastReviewed: "2026-07-14",
  },
  {
    id: "wowlist-community-platform",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "firsthand-collaborator-context",
    ],
    publicWording:
      "Co-built WOWList.org, a Django, PostgreSQL/PostGIS, and Ember community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
    shortWording: "WOWList reached roughly 35 city ecosystems",
    homepageWording:
      "I co-built WOWList, giving DIY arts organizers a shared calendar platform adopted across roughly 35 city ecosystems.",
    detailedPublicWording:
      "WOWList supported 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers.",
    sourceBasis:
      "Approved resume language and public-safe aggregate historical summary.",
    guardrail:
      "Use approximate adoption language and do not describe city activity as official chapters.",
    doNotSay: [
      "Official chapters in 35 cities",
      "Full ownership of all organizer adoption",
      "Current active platform unless confirmed",
    ],
    protectedBoundaries: [
      "Private user data",
      "Organizer contact lists",
      "Raw records",
      "Geolocation rows",
      "Unapproved community artifacts",
    ],
    surfaces: [
      "homepage",
      "resume",
      "technical-operations",
      "work-card",
      "case-study",
    ],
    relatedProjects: ["wowlist"],
    relatedCapabilities: [
      "django",
      "postgresql",
      "postgis",
      "ember",
      "community-platforms",
    ],
    lastReviewed: "2026-07-07",
  },
  {
    id: "sunday-dinner-196-participation-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "jamie-review-confirmation",
    ],
    publicWording:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    shortWording: "300+ gatherings and 20+ resident artists supported",
    homepageWording:
      "I created repeatable hosting and continuity systems that supported 300+ gatherings and 20+ resident artists.",
    detailedPublicWording:
      "Jamie made recurring cultural work easier to continue through practical invitation, hosting, onboarding, facilitation, documentation, and follow-through systems. A 2023 template shows a concrete residency handoff covering schedule, pre-arrival orientation, space configuration, and independent collaborator access.",
    sourceBasis:
      "The 300-plus-gathering and 20-plus-resident scale comes from approved resume language and public-safe aggregate project history. A separate revision-attributed private onboarding template, represented through protected metadata, establishes one concrete handoff workflow but does not prove that scale.",
    guardrail:
      "Keep the page summary-only, keep the scale claim and one-template workflow on separate evidence paths, and avoid turning community trust work into spectacle.",
    doNotSay: [
      "Institutional ownership of participants' work",
      "Comprehensive public archive",
      "Attendance database",
      "The 2023 template proves 20-plus residencies or use by every resident",
    ],
    protectedBoundaries: [
      "Guest lists",
      "Attendance records",
      "Addresses",
      "Private messages",
      "Raw community records",
      "Unapproved photos",
    ],
    surfaces: [
      "homepage",
      "resume",
      "technical-operations",
      "work-card",
      "case-study",
    ],
    relatedProjects: ["196-sunday-dinner"],
    relatedCapabilities: [
      "onboarding",
      "facilitation",
      "documentation",
      "handoffs",
    ],
    lastReviewed: "2026-07-14",
  },
  {
    id: "kc-spaces-fund-digital-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "public-source",
      "public-safe-archive-summary",
      "ai-assisted-archive-review",
    ],
    publicWording:
      "Supported KC Spaces Fund, a 2020 Kansas City mutual-aid campaign for grassroots arts and culture spaces, as behind-the-scenes digital infrastructure.",
    shortWording: "Behind-the-scenes digital infrastructure for KC Spaces Fund",
    detailedPublicWording:
      "Jamie built and maintained the campaign's Ghost-based web stack, customized a reusable campaign theme, supported deployment, and implemented donation, application, sign-up, and GoFundMe display affordances while public organizer credit remains with the campaign's named organizers.",
    sourceBasis:
      "Public GoFundMe page, public campaign domain, and AI-assisted archival review of Jamie-provided project records summarized without exposing private source material.",
    sourceNote:
      "Use as an evidence-based archival proof note, not a human collaborator testimonial.",
    whyItMatters:
      "Shows rapid public-facing implementation, technical operations, and campaign infrastructure support for a collective mutual-aid effort.",
    guardrail:
      "Behind-the-scenes technical and operational support only. Do not frame Jamie as the Facebook publisher or account owner, public organizer, grant decision-maker, fiscal sponsor, fundraiser owner, or sole campaign owner.",
    doNotSay: [
      "Jamie organized KC Spaces Fund",
      "Jamie ran the fundraiser",
      "Jamie made grant decisions",
      "Jamie was the fiscal sponsor",
      "Jamie posted to or owned the KC Spaces Fund Facebook Page",
      "A human collaborator provided this testimonial",
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
      "Sensitive strategy, legal, financial, or personal information",
    ],
    surfaces: ["technical-operations"],
    relatedProjects: [],
    relatedCapabilities: [
      "public-facing-web-systems",
      "campaign-infrastructure",
      "implementation",
      "technical-operations",
    ],
    lastReviewed: "2026-07-15",
  },
  {
    id: "kc-town-hall-public-benefit-documentation",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-source",
      "public-safe-archive-summary",
      "jamie-review-confirmation",
    ],
    publicWording:
      "KC Town Hall completed a $189,629 Phase One cold-shell restoration in 2019. The 2019 packet identifies Jamie and Julia Fredenburg as founders/project managers; Jamie states that he also served as Phase One general contractor and daily site coordinator. He designed a resident survey system and coordinated recurring neighborhood service operations. For a later, separate Phase Two proposal, the CCED Board recommended $490,539 and the Council accepted and appropriated the amount in 2019. Jamie states that he transitioned the project to a mission-aligned organization. Separately, the City's 2024 record says KC Town Hall withdrew and the unused appropriation was reappropriated.",
    shortWording:
      "Coordinated a completed $189,629 historic-building cold-shell phase and participatory neighborhood systems",
    detailedPublicWording:
      "Jamie states that he served as Phase One general contractor and daily site coordinator, coordinating architecture, preservation, roofing, masonry, framing, water, safety, access, and site workflows. The packet independently identifies him as founder/project manager, names the team, and documents the completed scope. He designed a 4-by-6-inch resident survey handbill and backing data system; the packet says input directly shaped the proposal. Public records corroborate his direct operations in Oak Park Neighborhood Association's recurring TiredOfTires workflow. The later Phase Two municipal funding chronology remains separate.",
    sourceBasis:
      "Public-safe archival review of the 2019 CCED packet, official CCED and Council records, public project/participant/collaborator social records, a protected multi-year tire-pickup calculator, approved resume context, and Jamie's bounded first-hand role and transition clarifications.",
    guardrail:
      "Separate completed Phase One from the uncompleted Phase Two proposal and unused City appropriation. Attribute the general-contractor title, TiredOfTires design/coordination, and transition to Jamie pending independent role-bearing records. Credit Julia Fredenburg and the architecture, preservation, trade, neighborhood, and City collaborators. Keep exact tire/savings and survey-response totals held.",
    doNotSay: [
      "KC Town Hall received or spent $490,539",
      "A final funding agreement was executed",
      "Jamie caused or secured the government decisions",
      "Jamie solely authored or owned the proposal",
      "The project was completed with City funds",
      "The completed Phase One was paid for by the later $490,539 City appropriation",
      "The CCED packet formally titles Jamie general contractor",
      "Jamie personally performed licensed trade work",
      "Jamie alone ran TiredOfTires or the neighborhood process",
      "Exact tire, resident-savings, or survey-response totals are independently verified",
      "Current property status",
      "Private financial details",
      "Official municipal endorsement beyond the cited public record",
      "The official Council records document the mission-aligned transition",
      "The receiving organization received the City appropriation or assumed the property, LLC, funding agreement, or every project obligation",
      "The transition and the City's later withdrawal are the same documented event",
    ],
    protectedBoundaries: [
      "Private reasons and personal circumstances",
      "Private financial details",
      "Legal details",
      "Property details",
      "Banking details",
      "Stakeholder details",
      "Raw survey responses and contact fields",
      "Household pickup routes and intake records",
      "Private contracts, invoices, and permits pending review",
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: [
      "project-planning",
      "public-benefit-documentation",
      "stakeholder-context",
    ],
    lastReviewed: "2026-07-15",
  },
  {
    id: "source-backed-team-memory-method",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-safe-archive-summary"],
    publicWording:
      "Developing a bounded lab method for source-backed team memory: reviewable, human-correctable, source-linked operating memory for knowledge-heavy teams.",
    shortWording: "Bounded method for source-backed team memory",
    detailedPublicWording:
      "The method separates Known, Open, and Protected material so teams can preserve decision lineage, onboarding context, and reviewable source links without turning private archives into unsafe browsing surfaces.",
    sourceBasis:
      "Public-safe lab materials and proposal-derived method summary.",
    guardrail:
      "Not finished SaaS. Not a chatbot. Not a private archive browser. Not a replacement for human judgment.",
    doNotSay: [
      "Built a production AI memory platform for a client",
      "Automated trust",
      "Replaces human review",
    ],
    protectedBoundaries: [
      "Private collaborator names",
      "Pricing",
      "Private transcript excerpts",
      "Private company context",
    ],
    surfaces: ["technical-operations", "lab"],
    relatedProjects: ["source-backed-team-memory"],
    relatedCapabilities: [
      "source-backed-memory",
      "documentation-architecture",
      "human-review",
    ],
    lastReviewed: "2026-07-07",
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
      "Jamie replaces product, engineering, legal, or executive judgment",
    ],
    protectedBoundaries: [
      "Private client materials",
      "Internal health metrics",
      "HR context",
      "Confidential team information",
    ],
    surfaces: ["homepage", "resume", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: [
      "delivery-coordination",
      "risk-surfacing",
      "handoffs",
    ],
    lastReviewed: "2026-07-07",
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
    sourceBasis: "Approved resume language and public-safe certificate.",
    guardrail:
      "Treat as professional development, not instructor affiliation or certification authority beyond completion.",
    doNotSay: [
      "Jamie teaches the course",
      "Jamie is certified by Maven as an AI evaluator unless the credential wording is separately approved",
    ],
    protectedBoundaries: [
      "Private coursework",
      "Private cohort materials",
      "Unapproved evaluations",
    ],
    surfaces: ["resume", "lab", "about"],
    relatedProjects: ["source-backed-team-memory"],
    relatedCapabilities: ["ai-evals", "human-review", "evaluation"],
    lastReviewed: "2026-07-07",
  },
];

const publicProofStatuses = new Set<ProofStatus>(["ready", "careful"]);

export function getProofById(id: string): ProofClaim | undefined {
  return proofClaims.find((proof) => proof.id === id);
}

export function getProofsForSurface(surface: ProofSurface): ProofClaim[] {
  return proofClaims.filter((proof) => {
    return (
      publicProofStatuses.has(proof.status) && proof.surfaces.includes(surface)
    );
  });
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
  "sunday-dinner-196-participation-infrastructure",
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
  "ai-evals-professional-development",
].map(requireReadyOrCarefulProof);

export const technicalOperationsProofRows = [
  {
    capability: "Delivery coordination",
    toward:
      "Turning unclear public-facing work into launchable plans, releases, and handoffs.",
    proofIds: [
      "technical-operations-operating-backbone",
      "hje-modernization-stewardship",
      "callnyc-civic-data-guidance",
      "wowlist-community-platform",
    ],
  },
  {
    capability: "Risk surfacing and decision clarity",
    toward:
      "Making open questions, public/private boundaries, and stakeholder next steps visible.",
    proofIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "kc-town-hall-public-benefit-documentation",
    ],
  },
  {
    capability: "Operating documentation people use",
    toward:
      "Converting meetings, source trails, and recurring practices into reusable working memory.",
    proofIds: [
      "fair-rent-campaign-memory",
      "sunday-dinner-196-participation-infrastructure",
      "source-backed-team-memory-method",
    ],
  },
  {
    capability: "Public-facing launch and adoption",
    toward:
      "Shaping websites, prototypes, and community platforms so real audiences can act.",
    proofIds: [
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
      "kc-spaces-fund-digital-infrastructure",
      "callnyc-civic-data-guidance",
      "wowlist-community-platform",
      "hje-revenue-growth-contribution",
    ],
  },
].map((row) => ({
  ...row,
  proofs: row.proofIds.map(requireReadyOrCarefulProof),
}));
