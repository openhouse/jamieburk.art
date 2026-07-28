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
      "Led long-running web, e-commerce, analytics, marketing, content, and operational workflow improvements that helped an 80+ year-old industrial business adapt online.",
    shortWording:
      "Jamie led long-running e-commerce and operations improvements for a legacy industrial business",
    detailedPublicWording:
      "Jamie maintained and improved the company's web and e-commerce presence, coordinated incremental releases, and translated legacy operating knowledge into searchable content, analytics, marketing, and operational workflows while preserving its public voice.",
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
    shortWording:
      "Jamie's e-commerce and operations improvements contributed to 2x revenue growth",
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
    shortWording:
      "Jamie built an independent CouncilStat follow-on translating civic data into resident guidance",
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
    surfaces: ["technical-operations", "work-card", "case-study"],
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
    shortWording:
      "Jamie built and stewarded 30+ pages of campaign memory for shared decisions and next steps",
    detailedPublicWording:
      "Jamie synthesized meetings, decision records, action items, legal/policy questions, media assets, stakeholder next steps, and city/state strategy lanes into shared memory and actionable workstreams.",
    sourceBasis: "Approved resume language and public-safe collaboration summary.",
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
    lastReviewed: "2026-07-07"
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
    shortWording:
      "Jamie mapped legislative source lineage so collaborators could review bill changes",
    detailedPublicWording:
      "Jamie organized source lineage, public-data framing, policy questions, and review lanes so collaborators could see what was known, what needed review, and what remained protected.",
    sourceBasis: "Approved resume language and public-safe source-map summary.",
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
    lastReviewed: "2026-07-07"
  },
  {
    id: "nyc-artist-coalition-public-web-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "jamie-review-confirmation"],
    publicWording:
      "Served as a founding member and organizer of NYC Artist Coalition and directly implemented and maintained campaign websites including FairRentNYC, Talks Not Raids, Let NYC Dance, and the coalition site's Ghost deployment.",
    shortWording:
      "Jamie was a founding member and organizer who implemented and maintained campaign websites",
    detailedPublicWording:
      "Jamie helped give NYC Artist Coalition a public-facing civic systems layer: campaign websites, issue explanations, calls to action, public resources, and support paths for cultural-space advocacy. A capture-date census preserves 445 distinct Facebook posts from 2017 through 2021 and 67 cleaned off-Facebook routes as evidence of the coalition's sustained public communications surface.",
    sourceBasis: "Contemporary reporting, Jamie confirmation, retained Git histories, the public FairRentNYC repository, and a public-safe census of every distinct post exposed by the authenticated NYC Artist Coalition Facebook Page feed on July 15, 2026.",
    whyItMatters:
      "Makes Jamie's founding-member, organizer, and direct implementation role visible without overstating collective campaign accomplishments.",
    guardrail:
      "Founding-member language follows contemporary reporting; repository history supports implementation and maintenance, while policy, copy, data, design, campaign accomplishments, and the shared Page's post-level authorship remain collective or unresolved. The 445-post census is complete only for the capture-date feed Facebook exposed, not the Page's lifetime history.",
    doNotSay: [
      "Jamie solely led NYC Artist Coalition",
      "Jamie owned every campaign",
      "Jamie authored every policy position",
      "Jamie authored every NYC Artist Coalition Facebook post",
      "Jamie controlled partner decisions",
      "Jamie single-handedly caused policy outcomes"
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "CMS/admin details",
      "Strategy records",
      "Contact lists",
      "Private correspondence",
      "Unapproved collaborator details",
      "Raw Facebook post bodies, comments, reaction or follower identities, authenticated URLs, session data, and sensitive meeting or working-document links"
    ],
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["campaign-websites", "public-guidance", "information-architecture"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-civic-systems",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Built and stewarded civic systems, coalition operations, and policy-communications infrastructure for NYC Artist Coalition cultural-space advocacy from 2017 onward.",
    shortWording:
      "Jamie built civic systems and coalition operations for NYC Artist Coalition",
    detailedPublicWording:
      "Jamie helped turn listening into coordinated public action: recurring meetings and priority ballots became testimony plans, run-of-show documents, call scripts, public forums, websites, and sustained follow-through across Cabaret Law repeal, Office of Nightlife, nightlife enforcement reporting, Commercial Rent Stabilization, and storefront stability.",
    sourceBasis:
      "Approved resume language, public campaign surfaces, public reporting, retained Git histories, and a public-safe aggregate of the complete accessible NYC Artist Coalition shared-folder census and a 63-document priority close reading.",
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
      "Legal-review materials",
      "Raw shared-folder records, exact private locators, participant data, and unapproved quotations"
    ],
    surfaces: ["resume", "technical-operations", "work-card", "case-study", "about"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "coalition-operations",
      "policy-communications",
      "public-data-framing",
      "civic-systems"
    ],
    lastReviewed: "2026-07-19"
  },
  {
    id: "nyc-artist-coalition-participation-system",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["public-source", "public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Helped establish and produce NYC Artist Coalition's recurring participation system across cultural-space meetings, practical safety and legal sessions, town halls, hearings, campaign actions, and relief convenings.",
    shortWording:
      "Jamie helped establish NYC Artist Coalition's recurring participation system",
    detailedPublicWording:
      "Beginning in 2017, Jamie helped connect recurring meetings in small cultural spaces with public event pages, safety and legal support, City Hall hearings, nightlife town halls, campaign actions, and relief convenings. The surviving Facebook event census preserves 33 public event records and a rotating ten-space meeting pattern while keeping collective credit and attendance boundaries explicit.",
    sourceBasis:
      "Jamie's first-hand account, the public-safe 33-event Facebook census, contemporaneous reporting of his fire-code and City Hall advocacy, and a community profile connecting him to coalition work.",
    whyItMatters:
      "Makes Jamie's relational civic-production work legible as program design and coalition operations, not only as websites or policy documents.",
    guardrail:
      "Use helped establish and produce. Do not assign Jamie sole authorship of every event, convert Facebook responses into attendance, or claim that an event caused a policy outcome.",
    doNotSay: [
      "Jamie solely produced every NYC Artist Coalition event",
      "9,989 people attended",
      "Facebook responses equal physical attendance",
      "The event program alone repealed the Cabaret Law",
      "Every coalition meeting used a different venue"
    ],
    protectedBoundaries: [
      "Raw event descriptions",
      "Attendee and guest identities",
      "Comments and reactions",
      "Meeting credentials",
      "Private working links",
      "Authenticated-session data"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc", "wowlist"],
    relatedCapabilities: [
      "participation-systems",
      "coalition-operations",
      "event-production",
      "civic-engagement",
      "public-communications"
    ],
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
      "Co-built and operated WOWList.org, a community-calendar platform for DIY arts and music organizers. A July 2017 production snapshot records 1,846 users, 16,142 posts/events, and 35 city-region keys with at least 50 posts.",
    shortWording:
      "Jamie co-built and operated WOWList for DIY arts and music organizers",
    detailedPublicWording:
      "WOWList supported 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers.",
    sourceBasis:
      "Approved resume language, public-safe aggregate historical summary, complete recovered public-account census, and a public 2016 Sunday Dinner event linking directly into WOW List.",
    guardrail:
      "Use approximate adoption language, do not describe city activity as official chapters, and treat the Sunday Dinner link as one concrete route rather than a complete adoption or traffic census.",
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
    shortWording:
      "Jamie created participation systems supporting 300+ gatherings and 20+ resident artists",
    detailedPublicWording:
      "Jamie made recurring cultural work easier to continue through practical invitation, hosting, onboarding, facilitation, documentation, and follow-through systems.",
    sourceBasis:
      "Approved resume language, public-safe aggregate project history, and public Facebook event pages preserving 100th and 200th Sunday Dinner milestones.",
    guardrail:
      "Keep the page summary-only, avoid turning community trust work into spectacle, and treat numbered Facebook event titles as contemporaneous milestones rather than an independent audit of the 300-plus aggregate.",
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
    lastReviewed: "2026-07-09"
  },
  {
    id: "kc-town-hall-public-benefit-documentation",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Secured a $490,539 public funding award for KC Town Hall by co-developing the successful CCED proposal and serving as the City's named developer/presenter for the exact request, then transitioned the project to a mission-aligned organization.",
    shortWording:
      "Secured a $490,539 public funding award through a successful CCED proposal and presentation, then transitioned the project to a mission-aligned organization",
    detailedPublicWording:
      "Jamie co-founded KC Town Hall LLC, served as project manager, co-developed its CCED proposal, and was the City's named developer/presenter for the $490,539 request. Official records trace the successful request through unanimous Board recommendation, Council acceptance, and appropriation. A 2021 Kansas City Star investigation independently documented repeated City Hall roadblocks; City-posted reports then name Jamie as a developer point of contact in 2022 and 2023 and document progress on M/WBE and CREO requirements. Jamie later transitioned the project to a mission-aligned organization.",
    sourceBasis:
      "Kansas City's June 2019 CCED hearing record identifies Jamie as KC Town Hall's developer/presenter for the exact $490,539 request, and the July minutes record the unanimous recommendation. A protected 2019 proposal bundle supports shared founder/project-manager attribution and the matching Phase Two request; it does not establish sole authorship. Resolution 190649, Ordinance 190642, the Kansas City Star's December 2021 investigation, the May 17, 2022 and December 2022 CCED materials, later pre-initial reporting, Ordinance 230316, the December 12, 2023 status report, and Ordinance 240317 establish the award, institutional actions, administrative burden and timeline, non-disbursement, withdrawal, and return of the unused amount. The article's elevated lead photograph is credited to Tammy Ljungblad and is not cleared for portfolio republication.",
    guardrail:
      "Jamie may be credited with securing the award through documented proposal-and-presentation work. Keep shared proposal credit and the Board's and Council's institutional authority explicit. Do not say received, disbursed, spent, or completed. The full municipal lifecycle remains preserved in the Knowledge Wiki rather than burdening hiring-facing copy. The transition is an authorized first-party account; do not identify the receiving organization or infer legal mechanics. Do not promote general-contractor, completion, daily field-coordination, final-withdrawal, or component-authorship propositions without independent public corroboration.",
    doNotSay: [
      "KC Town Hall received or spent $490,539",
      "A funding agreement was executed",
      "The City funded construction or project completion",
      "Jamie alone wrote the proposal",
      "Jamie controlled or solely caused the Board recommendation or Council appropriation",
      "Jamie personally received or spent the award",
      "The public record establishes why the project withdrew",
      "Current property status",
      "Private financial details",
      "Official municipal endorsement beyond the recorded recommendation, acceptance, and appropriation"
    ],
    protectedBoundaries: [
      "Private personal circumstances",
      "Private correspondence",
      "Private financial details",
      "Legal details",
      "Property details",
      "Banking details",
      "Stakeholder details",
      "Resident survey and contact records",
      "Raw proposal and web archives"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["project-planning", "public-benefit-documentation", "stakeholder-context", "construction-coordination", "participatory-design"],
    lastReviewed: "2026-07-26"
  },
  {
    id: "kc-town-hall-public-service-interface",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source", "ai-assisted-archive-review"],
    publicWording:
      "KC Town Hall used its shared public account as a recurring resident-service surface: 100 of 183 surviving records concern resident tire reports, pickup coordination, result reporting, and program continuity from 2019 through 2022.",
    shortWording: "Built a recurring public intake and follow-through surface",
    detailedPublicWording:
      "A complete 183-record public-account ledger documents a recurring operating interface and bounded civic traction: seven current public-repost-list appearances by three then-sitting Council-member accounts and two direct responses authored by sitting members.",
    sourceBasis:
      "Authenticated full-population review of the public KC Town Hall Posts, Replies, and repost-list surfaces; a 183-record public-safe ledger; two public official responses; and official Council-role records.",
    sourceNote:
      "The complete surviving profile population is not a platform export or proof that no earlier post was deleted.",
    whyItMatters:
      "Shows public communication functioning as operating infrastructure for resident intake, service coordination, accountable follow-through, and civic response.",
    guardrail:
      "Treat the account as collective, the 100 records as workflow evidence rather than completed-service units, and Council interaction as a dated lower bound rather than endorsement, partnership, or impact.",
    doNotSay: [
      "Jamie authored every KC Town Hall post",
      "Jamie alone performed every pickup",
      "One hundred records equal one hundred completed pickups or households",
      "Three Council members endorsed KC Town Hall",
      "The social record proves funding receipt, project completion, or causal impact"
    ],
    protectedBoundaries: [
      "Resident addresses",
      "Phone numbers",
      "Direct messages",
      "Private service records",
      "Account credentials and analytics"
    ],
    surfaces: ["work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["resident-intake", "service-coordination", "public-reporting", "implementation"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "source-backed-team-memory-method",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-safe-archive-summary"],
    publicWording:
      "Developing a bounded lab method for source-backed team memory: reviewable, human-correctable, source-linked operating memory for knowledge-heavy teams.",
    shortWording:
      "Jamie is developing a bounded method for source-backed team memory",
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
    lastReviewed: "2026-07-07"
  },
  {
    id: "technical-operations-operating-backbone",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Jamie builds the operating backbone teams need to move public-facing technical work from ambiguity to launch.",
    shortWording:
      "Jamie coordinates public-facing technical work from ambiguity to launch",
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
    shortWording: "Jamie completed AI Evals for Engineers & PMs in 2026",
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
    lastReviewed: "2026-07-07"
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
  "kc-town-hall-public-benefit-documentation",
  "ai-evals-professional-development"
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
