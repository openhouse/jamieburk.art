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
  canonicalClaimIds?: string[];
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
    detailedPublicWording:
      "Jamie creates operating structure where the need is real but requirements, workflows, ownership, documentation, and handoffs are not yet clear.",
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
    surfaces: ["homepage", "resume", "technical-operations", "about"],
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
      "Helped an 80+ year-old industrial supply business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    shortWording: "Jamie helped modernize legacy e-commerce and operations workflows",
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
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
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
      "Contributed to a period of 2x revenue growth for a legacy e-commerce business.",
    shortWording: "Contributed to 2x revenue growth for a legacy e-commerce business",
    detailedPublicWording:
      "Jamie's web, e-commerce, analytics, marketing, content, and operational workflow improvements contributed to a period of 2x revenue growth.",
    sourceBasis: "Approved resume language and public-safe firsthand operational context.",
    sourceNote: "Keep causal language careful and aggregate.",
    whyItMatters:
      "Provides a concise business-impact proof point while retaining careful causality.",
    guardrail: "Must stay as contribution language.",
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
    surfaces: ["homepage", "resume", "technical-operations", "case-study"],
    relatedProjects: ["harry-j-epstein"],
    relatedCapabilities: ["e-commerce", "analytics", "implementation"],
    lastReviewed: "2026-07-07"
  },
  {
    id: "callnyc-civic-data-guidance",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-source"],
    publicWording:
      "Built CallNYC.org as an independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.",
    shortWording: "Built an independent CouncilStat follow-on translating civic data into resident-facing guidance",
    detailedPublicWording:
      "CallNYC turned open constituent-services data into 61 issue pathways with district context and resident-facing guidance. The social layer directed 71 recognition posts to 26 Council accounts; an authenticated audit recovered attributable public interactions from at least 20 serving Council-member accounts, including eight member-authored posts or replies. This portfolio presents the project as historical evidence, and Politico New York covered it in 2016.",
    sourceBasis:
      "Approved resume language, historical prototype context, public open-data context, public GitHub repository, verified Politico New York coverage, and a reproducible 107-item authenticated social corpus with a separately verified Council-member response ledger.",
    guardrail: "Describe it as historical and independently developed; do not imply official city affiliation or current guidance.",
    doNotSay: [
      "Broader historical hackathon superlatives",
      "Official hackathon submission or winner",
      "Current city service",
      "Official city guidance",
      "Emergency guidance",
      "Legal guidance"
    ],
    protectedBoundaries: ["Current-service claims", "Private user data", "Unverified guidance"],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["callnyc"],
    relatedCapabilities: ["open-data", "resident-guidance", "information-architecture"],
    canonicalClaimIds: [
      "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      "CLM-CALLNYC-SOCIAL-PUBLIC-FEEDBACK-LOOP",
      "CLM-CALLNYC-PRODUCT-ITERATION-DECISIONS"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "fair-rent-campaign-memory",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-source",
      "public-safe-archive-summary",
      "firsthand-collaborator-context"
    ],
    publicWording:
      "Built and stewarded 30+ pages of shared Commercial Rent Stabilization campaign memory, including decision records, source maps, stakeholder power mapping, action trackers, and public/private boundary management.",
    shortWording: "Jamie built and stewarded 30+ pages of civic campaign memory",
    detailedPublicWording:
      "Jamie synthesized meetings, decision records, action items, legal/policy questions, stakeholder power mapping, audience-specific messaging, testimony safety, city/state strategy lanes, and public/private boundaries into shared memory and actionable workstreams.",
    sourceBasis:
      "Approved resume language and protected review of Jamie-authored campaign-memory, operating-plan, and stakeholder-map artifacts.",
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
    surfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["meeting-synthesis", "decision-records", "source-mapping"],
    canonicalClaimIds: ["CLM-CRS-CAMPAIGN-MEMORY-INFRASTRUCTURE"],
    lastReviewed: "2026-07-16"
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
      "Jamie organized source lineage, public-data framing, policy questions, and review lanes so collaborators could see what was known, what needed review, and what remained protected. A 2026 brief also defined a smallest publishable pilot for geography-aggregated commercial vacancy and lease-cost indicators with coverage, suppression, methods, and privacy requirements.",
    sourceBasis:
      "Approved resume language, public-safe source-map summary, and protected review of Jamie's commercial-vacancy public-data brief.",
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
    surfaces: ["resume", "technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["source-mapping", "public-data-framing", "policy-translation"],
    canonicalClaimIds: [
      "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
      "CLM-COMMERCIAL-VACANCY-PILOT-BRIEF-2026"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-public-web-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "jamie-review-confirmation"],
    publicWording:
      "Co-founded NYC Artist Coalition and built public campaign websites for cultural-space advocacy, including the coalition site, FairRentNYC, Talks Not Raids, and Let NYC Dance public web surfaces.",
    shortWording: "Co-founded NYC Artist Coalition and built public campaign websites",
    detailedPublicWording:
      "Jamie helped give NYC Artist Coalition a public-facing civic systems layer: a shared identity system, campaign websites, issue explanations, calls to action, public resources, and support paths for cultural-space advocacy. Olympia Kazi's attributable posts show the shared identity being used across 2020-2022 without assigning those posts or the whole account to Jamie. A co-edited 2023 Fair Rent NYC record directly documents one concrete launch and operations cycle.",
    sourceBasis:
      "Approved resume language, Jamie confirmation, public campaign websites, and protected review of a Fair Rent NYC web operations record.",
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
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["campaign-websites", "public-guidance", "information-architecture"],
    canonicalClaimIds: [
      "CLM-FAIR-RENT-WEB-OPERATIONS-2023",
      "CLM-SOCIAL-PROJECT-IDENTITY-ESTABLISHMENT"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-civic-systems",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Built and stewarded civic systems, coalition operations, and policy-communications infrastructure for NYC Artist Coalition cultural-space advocacy from 2017 onward.",
    shortWording: "Jamie built and stewarded NYC Artist Coalition civic systems from 2017 onward",
    detailedPublicWording:
      "Jamie translated policy, public-data, and coalition needs into practical materials for campaigns around Cabaret Law repeal, Office of Nightlife creation, nightlife enforcement reporting, Commercial Rent Stabilization, and storefront stability.",
    sourceBasis:
      "Approved resume language, public campaign surfaces, public-safe NYC Artist Coalition project history, and an authenticated audit of direct public account interactions.",
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
    surfaces: ["resume", "technical-operations", "work-card", "case-study", "about"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "coalition-operations",
      "policy-communications",
      "public-data-framing",
      "civic-systems"
    ],
    canonicalClaimIds: ["CLM-NYCAC-SOCIAL-COUNCIL-ENGAGEMENT"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-participation-system",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: [
      "public-source",
      "public-safe-archive-summary",
      "jamie-review-confirmation"
    ],
    publicWording:
      "Jamie reports that he helped establish and produce NYC Artist Coalition's recurring participation system across rotating cultural-space meetings, practical support sessions, public actions, hearings, and relief convenings.",
    shortWording:
      "Jamie reports helping establish and produce NYC Artist Coalition's recurring participation system",
    detailedPublicWording:
      "The recovered event record spans 33 public event identities from 2017 through 2021, including 12 recurring meetings, ten named physical cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and relief coordination. Jamie's broader production role remains explicitly first-person; public reporting separately corroborates his founding coalition role, fire-code study groups, and City Hall advocacy.",
    sourceBasis:
      "Jamie's first-person account, a public-safe authenticated Facebook event census, and public reporting that documents specific coalition, safety-study, and City Hall advocacy roles.",
    sourceNote:
      "The event pages establish the collective system. They do not identify the individual author or producer of every event.",
    whyItMatters:
      "Shows Jamie designing recurring participation infrastructure that connected cultural-space listening, practical support, public communication, and civic action.",
    guardrail:
      "Keep Jamie's broad production role attributed; preserve collective authorship and never convert Facebook response labels into attendance or impact.",
    doNotSay: [
      "Jamie solely produced every NYC Artist Coalition event",
      "Jamie alone caused a policy outcome",
      "Facebook responses equal attendance or unique reach",
      "All 34 historical event pages were recovered"
    ],
    protectedBoundaries: [
      "Raw event descriptions",
      "Attendee and guest identities",
      "Comments and reactions",
      "Contact details",
      "Meeting credentials",
      "Private working documents",
      "Page-administration history",
      "Authenticated-session state"
    ],
    surfaces: ["case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "participation-infrastructure",
      "coalition-operations",
      "facilitation",
      "public-programming",
      "civic-systems"
    ],
    canonicalClaimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
    lastReviewed: "2026-07-15"
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
      "Co-built WOWList.org, a Django, PostgreSQL/PostGIS, and Ember community-calendar platform used by DIY arts and music organizers, with recorded activity across roughly 35 city ecosystems.",
    shortWording: "Jamie co-built WOWList across roughly 35 city ecosystems",
    detailedPublicWording:
      "WOWList supported 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers.",
    sourceBasis:
      "Approved resume language, public-safe aggregate historical summary, public organizer integrations, and a deterministic 38-of-38 project-account corpus preserving product-support and civic-care patterns.",
    guardrail:
      "Use approximate adoption language and do not describe city activity as official chapters.",
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
    surfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["wowlist"],
    relatedCapabilities: ["django", "postgresql", "postgis", "ember", "community-platforms"],
    canonicalClaimIds: [
      "CLM-WOWLIST-ARCHIVE-SCALE",
      "CLM-WOWLIST-TECHNICAL-CONTRIBUTION",
      "CLM-WOWLIST-PUBLIC-COMMUNITY-USE",
      "CLM-WOWLIST-SOCIAL-PROVENANCE-SUPPORT",
      "CLM-WOWLIST-PRODUCT-SUPPORT-LOOP",
      "CLM-WOWLIST-CIVIC-CARE-USE"
    ],
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
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    shortWording: "Jamie created repeatable systems across 300+ gatherings and 20+ resident artists",
    detailedPublicWording:
      "Jamie made recurring cultural work easier to continue through practical invitation, hosting, onboarding, facilitation, documentation, and follow-through systems. A protected ledger records 345 numbered events, and a 2023 acceptance template preserves a concrete residency onboarding sequence.",
    sourceBasis:
      "Approved resume language, public-safe aggregate project history, protected structural review of a 345-event ledger, and a Jamie-authored residency onboarding template. The reviewed Shared Drive records do not independently establish the 20+ resident-artist aggregate.",
    guardrail:
      "Keep the page summary-only and avoid turning community trust work into spectacle.",
    doNotSay: [
      "Institutional ownership of participants' work",
      "Comprehensive public archive",
      "Attendance database"
    ],
    protectedBoundaries: [
      "Guest lists",
      "Attendance records",
      "Addresses",
      "Private messages",
      "Raw community records",
      "Unapproved photos"
    ],
    surfaces: ["homepage", "resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["196-sunday-dinner"],
    relatedCapabilities: ["onboarding", "facilitation", "documentation", "handoffs"],
    canonicalClaimIds: ["CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "kc-spaces-fund-digital-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["public-source", "public-safe-archive-summary", "ai-assisted-archive-review"],
    publicWording:
      "Supported KC Spaces Fund, a 2020 Kansas City mutual-aid campaign for grassroots arts and culture spaces, through campaign web infrastructure and an available cross-channel project identity.",
    shortWording:
      "Cross-channel identity and web infrastructure for KC Spaces Fund",
    detailedPublicWording:
      "Jamie built and maintained the campaign's Ghost-based web stack, customized a reusable campaign theme, implemented donation, application, sign-up, and fundraising-display affordances, and supported the choice of a project name available across domain and social channels. The collaborator-led Facebook Page used that identity to route applications, donations, resources, and funded-space updates, while public organizer credit remains with the campaign's named organizers.",
    sourceBasis:
      "Public campaign site, GoFundMe, full-population Facebook Page census, independent contemporary Kansas City Star listing, and AI-assisted archival review of Jamie-provided project records summarized without exposing private source material.",
    sourceNote:
      "Use as an evidence-based archival proof note, not a human collaborator testimonial.",
    whyItMatters:
      "Shows rapid public-facing implementation, technical operations, and campaign infrastructure support for a collective mutual-aid effort.",
    guardrail:
      "Behind-the-scenes technical, identity, and operational support only. Do not frame Jamie as the Page publisher, public organizer, grant decision-maker, fiscal sponsor, sole naming author, or sole campaign owner.",
    doNotSay: [
      "Jamie organized KC Spaces Fund",
      "Jamie managed or posted from the KC Spaces Fund Facebook Page",
      "Jamie alone named KC Spaces Fund",
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
    relatedProjects: [],
    relatedCapabilities: [
      "public-facing-web-systems",
      "campaign-infrastructure",
      "implementation",
      "technical-operations"
    ],
    canonicalClaimIds: [
      "CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION",
      "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT"
    ],
    lastReviewed: "2026-07-16"
  },
  {
    id: "kc-town-hall-public-benefit-documentation",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Co-led redevelopment planning and public-benefit documentation for a project whose 2019 municipal packet labels a $189,629 Phase One cold-shell scope completed and says a collaborative neighborhood survey shaped the proposal. The project later advanced from a unanimous CCED Board recommendation to City Council approval and appropriation of $490,539, then withdrew before disbursement.",
    shortWording:
      "Co-led planning for a project with Phase One work labeled completed and a later $490,539 city appropriation that was not disbursed",
    detailedPublicWording:
      "Jamie co-led planning, public-benefit documentation, stakeholder context, and municipal-review support for an adaptive reuse effort. KCMO records identify him as the presenter, label a $189,629 Phase One cold-shell scope completed in 2019, and document a collaborative neighborhood survey whose results directly shaped the proposal. They also trace a unanimous Board recommendation, Council adoption and appropriation, and later withdrawal without disbursement. A complete profile-reported 183-record public-account archive separately documents recurring resident-input, household tire-pickup, civic-information, and stakeholder-dialogue operations.",
    sourceBasis:
      "Approved resume language; official KCMO Phase One, survey, proposal, Council, appropriation, and project-status records; and the public-safe 183-record KC Town Hall account corpus.",
    guardrail:
      "Distinguish the unanimous CCED Board recommendation, Council adoption and appropriation, and the later withdrawal. Treat the institutional account as project context rather than proof Jamie authored every post. Never imply a unanimous Council vote, an executed funding agreement, receipt, disbursement, independently audited service totals, endorsement, causal government impact, or completed redevelopment.",
    doNotSay: [
      "The City Council vote was unanimous",
      "KC Town Hall received or spent $490,539",
      "The funded redevelopment was completed",
      "Phase One completion means the full redevelopment was completed",
      "Current property status",
      "Private financial details",
      "Official municipal endorsement beyond the public record",
      "Jamie authored every KC Town Hall post",
      "The account's tire, savings, participation, or engagement totals are independently audited"
    ],
    protectedBoundaries: [
      "Private financial details",
      "Legal details",
      "Property details",
      "Banking details",
      "Stakeholder details"
    ],
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["project-planning", "public-benefit-documentation", "stakeholder-context"],
    canonicalClaimIds: [
      "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS",
      "CLM-KC-TOWN-HALL-PHASE-ONE-RESTORATION",
      "CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY",
      "CLM-KCTH-SOCIAL-PUBLIC-OPERATIONS"
    ],
    lastReviewed: "2026-07-15"
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
    sourceBasis: "Public-safe lab materials and proposal-derived method summary.",
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
    canonicalClaimIds: ["CLM-SOURCE-BACKED-TEAM-MEMORY-METHOD"],
    lastReviewed: "2026-07-15"
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
    surfaces: ["homepage", "resume", "technical-operations", "about"],
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
    sourceBasis: "Approved resume language and public-safe certificate.",
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
    surfaces: ["resume", "lab", "about"],
    relatedProjects: ["source-backed-team-memory"],
    relatedCapabilities: ["ai-evals", "human-review", "evaluation"],
    canonicalClaimIds: ["CLM-AI-EVALS-PROFESSIONAL-DEVELOPMENT"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "waterways-participatory-practice",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Conceived and organized a collaborative raft expedition whose crew reached the Gulf of Mexico four months after leaving Kansas City, then developed participatory public programs around how waterways connect cities, stories, and people.",
    shortWording: "Built participatory public work around connected waterways",
    detailedPublicWording:
      "Jamie conceived and organized a collaborative bicycle-powered raft expedition from Kansas City down the Missouri and Mississippi rivers; a later independent report says the crew reached the Gulf of Mexico four months after leaving Kansas City. He later spearheaded Great Accommodations, a participatory exhibition and public-program system treating connected rivers as a social network.",
    sourceBasis:
      "Contemporaneous and follow-up reporting in The Pitch and a Charlotte Street institutional program page.",
    whyItMatters:
      "Recovers a long-running participatory practice that connects expedition design, public programming, infrastructure, and civic imagination.",
    guardrail:
      "Describe both projects as collaborative; the follow-up reporting supports the Gulf terminus and four-month duration, not every stop or participant.",
    doNotSay: [
      "Jamie completed the raft expedition alone",
      "The reviewed sources establish every participant or stop",
      "Jamie created every Great Accommodations component alone"
    ],
    protectedBoundaries: [
      "Unreviewed participant identities",
      "Private correspondence",
      "Unreviewed archive images"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["waterways-participatory-practice"],
    relatedCapabilities: ["participatory-design", "public-programming", "project-initiation"],
    canonicalClaimIds: [
      "CLM-WATERWAYS-RAFT-EXPEDITION",
      "CLM-WATERWAYS-GREAT-ACCOMMODATIONS"
    ],
    lastReviewed: "2026-07-12"
  },
  {
    id: "open-house-participatory-practice",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Initiated and tended Open House, a 10-day public experiment at UC Santa Cruz combining communal living, participatory art, collective decision-making, and distributed documentation.",
    shortWording: "Initiated a 10-day communal participatory-art environment",
    detailedPublicWording:
      "Jamie initiated and tended a public environment in which participants shared responsibility for programming, decisions, installations, performances, daily life, and documentation.",
    sourceBasis: "Contemporaneous reporting in Good Times / Metro Santa Cruz.",
    whyItMatters:
      "Shows an early, concrete example of Jamie designing conditions in which people could make and govern a public program together.",
    guardrail: "Collective decisions and participant work remain collectively credited.",
    doNotSay: [
      "Jamie was the sole author of participant activity",
      "Every participant consented to future republication"
    ],
    protectedBoundaries: [
      "Unreviewed participant identities",
      "Participant images without consent review",
      "Private project records"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["open-house-participatory-practice"],
    relatedCapabilities: ["participatory-design", "facilitation", "documentation-systems"],
    canonicalClaimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PRACTICE"],
    lastReviewed: "2026-07-12"
  },
  {
    id: "nyc-artist-coalition-cabaret-advocacy",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "As a founding member of NYC Artist Coalition, organized fire-code study groups, rallied at City Hall, and spoke publicly for Cabaret Law repeal inside the broader Let NYC Dance coalition.",
    shortWording: "Organized safety study groups and public advocacy for Cabaret Law repeal",
    detailedPublicWording:
      "Jamie's documented work joined practical venue-safety education with public advocacy, helping cultural spaces build knowledge while a broad, decades-deep coalition won repeal of New York City's Cabaret Law.",
    sourceBasis:
      "Contemporaneous Gothamist and NPR reporting plus the public Let NYC Dance campaign record.",
    whyItMatters:
      "Makes Jamie's specific coalition labor visible while preserving the scale and history of the collective victory.",
    guardrail:
      "Always credit repeal as a collective accomplishment with decades of prior advocacy.",
    doNotSay: [
      "Jamie alone repealed the Cabaret Law",
      "NYC Artist Coalition was the only repeal organization",
      "Jamie drafted the repeal legislation"
    ],
    protectedBoundaries: ["Private coalition notes", "Private correspondence", "Unapproved names"],
    surfaces: ["internal-only"],
    relatedProjects: ["nyc-artist-coalition"],
    relatedCapabilities: ["coalition-operations", "public-advocacy", "safety-education"],
    canonicalClaimIds: ["CLM-NYCAC-CABARET-ADVOCACY"],
    lastReviewed: "2026-07-12"
  },
  {
    id: "nyc-artist-coalition-office-nightlife-town-hall",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source"],
    publicWording:
      "Worked as a founding NYC Artist Coalition member while the coalition advocated for the Office of Nightlife and spearheaded a public town hall centered on small, diverse cultural spaces.",
    shortWording: "Advanced Office of Nightlife accountability as a founding NYC Artist Coalition member",
    detailedPublicWording:
      "Contemporaneous reporting described NYC Artist Coalition as instrumental in Office of Nightlife advocacy and as spearheading a town hall where small, diverse cultural-space stakeholders addressed elected officials; Jamie participated as a founding coalition member.",
    sourceBasis: "Contemporaneous Bedford + Bowery and NPR reporting.",
    whyItMatters:
      "Connects coalition formation to a concrete public institution and an accountable forum for people most affected by nightlife policy.",
    guardrail:
      "The reporting supports the coalition's role more strongly than Jamie's exact individual production credit.",
    doNotSay: [
      "Jamie alone created the Office of Nightlife",
      "Jamie was the sole town-hall producer"
    ],
    protectedBoundaries: ["Private production records", "Private coalition correspondence"],
    surfaces: ["internal-only"],
    relatedProjects: ["nyc-artist-coalition"],
    relatedCapabilities: ["coalition-operations", "public-forums", "institution-building"],
    canonicalClaimIds: ["CLM-NYCAC-OFFICE-NIGHTLIFE-TOWN-HALL"],
    lastReviewed: "2026-07-12"
  },
  {
    id: "talks-not-raids-advocacy",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Testified before the New York City Council for Talks Not Raids, describing NYC Artist Coalition's safety work and calling for transparency and engagement around M.A.R.C.H. operations.",
    shortWording: "Turned nightlife-enforcement concerns into testimony and public action",
    detailedPublicWording:
      "Jamie testified on behalf of NYC Artist Coalition, connected practical fire-safety education to enforcement reform, and supported a public Council action campaign for Intro 1156, which became law.",
    sourceBasis:
      "New York City Council hearing transcript, public Talks Not Raids campaign materials, and the Council legislative record for Intro 1156.",
    whyItMatters:
      "Shows Jamie translating community experience into public testimony, a legible campaign, and an actionable policy pathway.",
    guardrail:
      "The transcript establishes Jamie's testimony; elected sponsors and collective advocates retain credit for the legislation.",
    doNotSay: ["Jamie authored Intro 1156", "Jamie enacted the law alone"],
    protectedBoundaries: ["Private coalition strategy", "Private affected-venue records"],
    surfaces: ["internal-only"],
    relatedProjects: ["talks-not-raids"],
    relatedCapabilities: ["public-testimony", "policy-communications", "campaign-systems"],
    canonicalClaimIds: ["CLM-TALKS-NOT-RAIDS-ADVOCACY"],
    lastReviewed: "2026-07-12"
  },
  {
    id: "march-transparency-to-cure",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source"],
    publicWording:
      "Advocated M.A.R.C.H. transparency through Talks Not Raids within a multi-year public sequence that later included enacted reporting requirements and New York City's replacement of M.A.R.C.H. with an engagement-first process.",
    shortWording: "Advocated M.A.R.C.H. transparency within the later public sequence to CURE",
    detailedPublicWording:
      "Jamie testified for Talks Not Raids and M.A.R.C.H. transparency. Intro 1156 later became Local Law 220 of 2019; in 2023 New York City replaced M.A.R.C.H. with CURE after years of collective effort. The sequence does not establish that Jamie or one campaign caused the later replacement.",
    sourceBasis:
      "Public Talks Not Raids materials, the New York City Council legislative record, and the city's 2023 CURE announcement.",
    whyItMatters:
      "Preserves the long policy sequence without collapsing collective advocacy and government action into a solo causal claim.",
    guardrail: "Present this as a documented sequence and collective contribution, not sole causality.",
    doNotSay: [
      "Jamie alone disbanded M.A.R.C.H.",
      "Intro 1156 automatically ended M.A.R.C.H.",
      "CURE eliminated all enforcement"
    ],
    protectedBoundaries: ["Private coalition strategy", "Private enforcement records"],
    surfaces: ["internal-only"],
    relatedProjects: ["talks-not-raids"],
    relatedCapabilities: ["policy-communications", "public-accountability", "long-horizon-advocacy"],
    canonicalClaimIds: ["CLM-MARCH-TRANSPARENCY-TO-CURE"],
    lastReviewed: "2026-07-12"
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

export const technicalOperationsProofRows = [
  {
    capability: "Delivery coordination",
    toward: "Turning unclear public-facing work into launchable plans, releases, and handoffs.",
    destinations: [
      { href: "/work/harry-j-epstein", label: "Harry J. Epstein" },
      { href: "/work/callnyc", label: "CallNYC" },
      { href: "/work/wowlist", label: "WOWList" }
    ],
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
    destinations: [
      { href: "/work/fair-rent-nyc", label: "FairRentNYC" },
      { href: "/work/kc-town-hall", label: "KC Town Hall" }
    ],
    proofIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "kc-town-hall-public-benefit-documentation"
    ]
  },
  {
    capability: "Operating documentation people use",
    toward: "Converting meetings, source trails, and recurring practices into reusable working memory.",
    destinations: [
      { href: "/work/fair-rent-nyc", label: "FairRentNYC" },
      { href: "/work/196-sunday-dinner", label: "Sunday Dinner / 196" },
      {
        href: "/lab/source-backed-team-memory",
        label: "Source-Backed Team Memory"
      }
    ],
    proofIds: [
      "fair-rent-campaign-memory",
      "sunday-dinner-196-participation-infrastructure",
      "source-backed-team-memory-method"
    ]
  },
  {
    capability: "Public-facing launch and adoption",
    toward: "Shaping websites, prototypes, and community platforms so real audiences can act.",
    destinations: [
      { href: "/work/fair-rent-nyc", label: "NYC Artist Coalition / FairRentNYC" },
      { href: "/work/callnyc", label: "CallNYC" },
      { href: "/work/wowlist", label: "WOWList" },
      { href: "/work/harry-j-epstein", label: "Harry J. Epstein" }
    ],
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
